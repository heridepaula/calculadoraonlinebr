/**
 * Carga inicial do histórico de uma loteria a partir da loterias-api (uma chamada traz todos os
 * concursos, com premiação). Idempotente: bulkWrite + updateOne(upsert) por `concurso`.
 *
 * Uso:
 *   npx tsx scripts/seedLottery.ts <lotofacil|megasena> [--dry-run]
 *
 * Env (.env / .env.local): MONGODB_URI (obrigatória), MONGODB_DB (opcional).
 * Depois, rode `scripts/backfillLottery.ts` para completar concursos que faltarem.
 */
import { config } from "dotenv";
import type { AnyBulkWriteOperation } from "mongodb";

config({ path: ".env.local" });
config();

const CHUNK_SIZE = 500;

async function main() {
  // imports dinâmicos: o env precisa estar carregado antes de mongodb.server ler MONGODB_URI
  const { LOTTERIES, isLotteryId } = await import("../app/lib/lottery/definitions");
  const { fetchAllFromLoteriasApi, fromLoteriasApi } = await import("../app/services/lottery/scrapers.server");
  const { getDb } = await import("../app/lib/mongodb.server");
  type LotteryResult = import("../app/types/lottery").LotteryResult;

  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith("--"));
  if (!isLotteryId(id)) throw new Error("uso: seedLottery.ts <lotofacil|megasena> [--dry-run]");
  const def = LOTTERIES[id];
  const dryRun = args.includes("--dry-run");

  console.log(`[seed:${id}] baixando histórico da loterias-api…`);
  const raw = await fetchAllFromLoteriasApi(def);
  const latestNumber = Math.max(...raw.map((r) => Number(r.concurso) || 0));

  const byConcurso = new Map<number, LotteryResult>();
  let invalid = 0;
  raw.forEach((item, i) => {
    try {
      // `proximo` só faz sentido no concurso mais recente
      const r = fromLoteriasApi(def, item, Number(item.concurso) === latestNumber);
      byConcurso.set(r.concurso, r);
    } catch (e) {
      invalid++;
      console.error(`[seed:${id}] registro #${i} ignorado: ${(e as Error).message}`);
    }
  });
  const docs = [...byConcurso.values()].sort((a, b) => a.concurso - b.concurso);
  const semPremiacao = docs.filter((d) => !d.premiacoes).length;
  console.log(`[seed:${id}] ${raw.length} lidos, ${docs.length} válidos únicos, ${invalid} ignorados, ${semPremiacao} sem premiação`);
  if (docs.length === 0) throw new Error("nenhum registro válido");
  if (dryRun) {
    console.log(`[seed:${id}] --dry-run: exemplo ->`, JSON.stringify(docs[docs.length - 1]));
    return;
  }

  const col = (await getDb()).collection<LotteryResult>(def.collection);
  await col.createIndex({ concurso: 1 }, { unique: true });
  let inserted = 0, updated = 0, failedBatches = 0;
  const totalBatches = Math.ceil(docs.length / CHUNK_SIZE);
  for (let i = 0; i < docs.length; i += CHUNK_SIZE) {
    const batch = docs.slice(i, i + CHUNK_SIZE);
    const n = i / CHUNK_SIZE + 1;
    const ops: AnyBulkWriteOperation<LotteryResult>[] = batch.map((d) => {
      // não grava campos ausentes (evita apagar premiação existente com undefined)
      const set = Object.fromEntries(Object.entries(d).filter(([, v]) => v !== undefined));
      return { updateOne: { filter: { concurso: d.concurso }, update: { $set: set }, upsert: true } };
    });
    try {
      const res = await col.bulkWrite(ops, { ordered: false });
      inserted += res.upsertedCount;
      updated += res.modifiedCount;
      console.log(`[seed:${id}] lote ${n}/${totalBatches} OK (${batch[0].concurso}-${batch[batch.length - 1].concurso}): +${res.upsertedCount} novos, ${res.modifiedCount} atualizados`);
    } catch (e) {
      failedBatches++;
      console.error(`[seed:${id}] lote ${n}/${totalBatches} FALHOU: ${(e as Error).message}`);
    }
  }
  console.log(`[seed:${id}] fim: ${inserted} inseridos, ${updated} atualizados, ${failedBatches} lotes com falha`);
  console.log(`[seed:${id}] total na coleção ${def.collection}: ${await col.countDocuments()}`);
  if (failedBatches > 0) process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error("[seed] erro fatal:", e);
    process.exitCode = 1;
  })
  .finally(() => process.exit());
