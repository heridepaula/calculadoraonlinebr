import type { Collection } from "mongodb";
import { getDb } from "~/lib/mongodb.server";
import type { LotteryDef } from "~/lib/lottery/definitions";
import type { LotteryResult } from "~/types/lottery";

const indexReady = new Set<string>();

async function collection(def: LotteryDef): Promise<Collection<LotteryResult>> {
  const col = (await getDb()).collection<LotteryResult>(def.collection);
  if (!indexReady.has(def.collection)) {
    await col.createIndex({ concurso: 1 }, { unique: true });
    indexReady.add(def.collection);
  }
  return col;
}

/** Idempotente: upsert por número do concurso. Retorna `created` se inseriu novo documento. */
export async function saveResult(def: LotteryDef, r: LotteryResult): Promise<{ created: boolean }> {
  const col = await collection(def);
  const res = await col.updateOne(
    { concurso: r.concurso },
    {
      $set: {
        data_sorteio: r.data_sorteio,
        dezenas: r.dezenas,
        // só sobrescreve premiação quando ela veio na coleta (não apaga dados do seed)
        ...(r.acumulou !== undefined && { acumulou: r.acumulou }),
        ...(r.premiacoes && { premiacoes: r.premiacoes }),
        ...(r.proximo && { proximo: r.proximo }),
      },
    },
    { upsert: true }
  );
  return { created: res.upsertedCount > 0 };
}

/** Maior número de concurso salvo (consulta barata, usa o índice único). */
export async function getLatestConcurso(def: LotteryDef): Promise<number | null> {
  const col = await collection(def);
  const doc = await col.find({}, { projection: { _id: 0, concurso: 1 } }).sort({ concurso: -1 }).limit(1).next();
  return doc?.concurso ?? null;
}

/** Último concurso completo (com premiação e próximo concurso). */
export async function getLatestResult(def: LotteryDef): Promise<LotteryResult | null> {
  const col = await collection(def);
  return col.find({}, { projection: { _id: 0 } }).sort({ concurso: -1 }).limit(1).next();
}

/** Histórico completo (só campos necessários) para cálculo de estatísticas. */
export async function getAllDrawsForStats(def: LotteryDef): Promise<Pick<LotteryResult, "concurso" | "data_sorteio" | "dezenas">[]> {
  const col = await collection(def);
  return col
    .find({}, { projection: { _id: 0, concurso: 1, data_sorteio: 1, dezenas: 1 } })
    .sort({ concurso: 1 })
    .toArray();
}

/** Números de concurso já salvos (para backfill). */
export async function getSavedConcursos(def: LotteryDef): Promise<Set<number>> {
  const col = await collection(def);
  const docs = await col.find({}, { projection: { _id: 0, concurso: 1 } }).toArray();
  return new Set(docs.map((d) => d.concurso));
}
