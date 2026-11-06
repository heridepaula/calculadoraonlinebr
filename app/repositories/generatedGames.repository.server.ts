import type { Collection, ObjectId, WithId } from "mongodb";
import { getDb } from "~/lib/mongodb.server";
import type { LotteryId } from "~/lib/lottery/definitions";
import type {
  GamesAuditOutcome,
  GeneratedGame,
  PublicBestGame,
  PublicGeneratedGame,
} from "~/types/lottery";

export const GENERATED_GAMES_COLLECTION = "lottery_generated_games";

// Índices criados uma vez por processo (createIndex é idempotente).
const globalForGames = globalThis as unknown as { _generatedGamesIndexes?: Promise<unknown> };

async function collection(): Promise<Collection<GeneratedGame>> {
  const col = (await getDb()).collection<GeneratedGame>(GENERATED_GAMES_COLLECTION);
  globalForGames._generatedGamesIndexes ??= col
    .createIndexes([
      // Auditoria/limpeza do cron: todos os jogos de um concurso, desempate pelo mais antigo.
      {
        key: { lotteryType: 1, concursoTarget: 1, generatedAt: 1 },
        name: "lottery_concurso_generatedAt",
      },
      // Feed ao vivo: últimos jogos de uma loteria.
      { key: { lotteryType: 1, generatedAt: -1 }, name: "lottery_generatedAt" },
      // "Melhor jogo": só os vencedores entram no índice (um por concurso).
      {
        key: { lotteryType: 1, concursoTarget: -1 },
        name: "best_games",
        partialFilterExpression: { isBestGame: true },
      },
    ])
    .catch((err) => {
      globalForGames._generatedGamesIndexes = undefined; // tenta de novo na próxima chamada
      console.error("[generated-games] falha ao criar índices:", err);
    });
  await globalForGames._generatedGamesIndexes;
  return col;
}

export function toPublicGame(doc: WithId<GeneratedGame>): PublicGeneratedGame {
  return {
    id: doc._id.toHexString(),
    lotteryType: doc.lotteryType,
    numbers: doc.numbers,
    strategy: doc.strategy,
    badges: doc.badges,
    concursoTarget: doc.concursoTarget,
    generatedAt: doc.generatedAt.toISOString(),
    location: doc.location,
  };
}

export async function insertGeneratedGame(
  game: Pick<
    GeneratedGame,
    "lotteryType" | "numbers" | "strategy" | "badges" | "concursoTarget" | "location"
  >
): Promise<WithId<GeneratedGame>> {
  const col = await collection();
  const doc: GeneratedGame = {
    ...game,
    generatedAt: new Date(),
    hits: null,
    isBestGame: false,
    totalGamesCompeted: null,
  };
  const { insertedId } = await col.insertOne(doc);
  return { ...doc, _id: insertedId as ObjectId };
}

/** Últimos jogos gerados de uma loteria (carga inicial do feed ao vivo). */
export async function getRecentGeneratedGames(
  lottery: LotteryId,
  limit = 5
): Promise<PublicGeneratedGame[]> {
  const col = await collection();
  const docs = await col
    .find({ lotteryType: lottery, isBestGame: false })
    .sort({ generatedAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toPublicGame);
}

/** Melhor jogo do concurso auditado mais recente. */
export async function getLatestBestGame(lottery: LotteryId): Promise<PublicBestGame | null> {
  const col = await collection();
  const doc = await col.findOne(
    { lotteryType: lottery, isBestGame: true },
    { sort: { concursoTarget: -1 } }
  );
  if (!doc || doc.hits === null || doc.totalGamesCompeted === null) return null;
  return {
    ...toPublicGame(doc),
    hits: doc.hits,
    totalGamesCompeted: doc.totalGamesCompeted,
    drawnNumbers: doc.drawnNumbers ?? [],
  };
}

/** Concursos até `upTo` que ainda têm jogos sem auditoria (cobre dias em que o cron falhou). */
export async function getPendingAuditConcursos(
  lottery: LotteryId,
  upTo: number
): Promise<number[]> {
  const col = await collection();
  const list = await col.distinct("concursoTarget", {
    lotteryType: lottery,
    isBestGame: false,
    concursoTarget: { $lte: upTo },
  });
  return list.sort((a, b) => a - b);
}

/**
 * Auditoria pós-sorteio de um concurso: conta os jogos, marca o de mais acertos como melhor jogo
 * (desempate: o gerado primeiro) e apaga todos os outros. Idempotente: se o concurso já tem
 * melhor jogo, só remove jogos que tenham chegado depois, sem mexer no vencedor.
 */
export async function evaluateAndCleanGames(
  lotteryType: LotteryId,
  concursoId: number,
  drawnNumbers: number[]
): Promise<GamesAuditOutcome> {
  const col = await collection();
  const filter = { lotteryType, concursoTarget: concursoId };

  const existing = await col.findOne({ ...filter, isBestGame: true }, { projection: { hits: 1 } });
  if (existing) {
    const { deletedCount } = await col.deleteMany({ ...filter, _id: { $ne: existing._id } });
    return {
      concurso: concursoId,
      status: "already-audited",
      totalGames: 0,
      bestHits: existing.hits,
      deleted: deletedCount,
    };
  }

  const totalJogos = await col.countDocuments(filter);
  if (totalJogos === 0)
    return { concurso: concursoId, status: "no-games", totalGames: 0, bestHits: null, deleted: 0 };

  const [winner] = await col
    .aggregate<{
      _id: ObjectId;
      hits: number;
    }>([{ $match: filter }, { $project: { generatedAt: 1, hits: { $size: { $setIntersection: ["$numbers", drawnNumbers] } } } }, { $sort: { hits: -1, generatedAt: 1, _id: 1 } }, { $limit: 1 }])
    .toArray();

  await col.updateOne(
    { _id: winner._id },
    { $set: { isBestGame: true, hits: winner.hits, totalGamesCompeted: totalJogos, drawnNumbers } }
  );
  const { deletedCount } = await col.deleteMany({ ...filter, _id: { $ne: winner._id } });
  return {
    concurso: concursoId,
    status: "audited",
    totalGames: totalJogos,
    bestHits: winner.hits,
    deleted: deletedCount,
  };
}
