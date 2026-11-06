/**
 * Preenche no MongoDB os concursos que faltam (1..último) de uma loteria, com premiação.
 * Fonte: API da Caixa (oficial); se ela falhar para um concurso, tenta a loterias-api.
 *
 * Uso: npx tsx scripts/backfillLottery.ts <lotofacil|megasena> [--check]
 *   --check  só informa quantos concursos faltam (não grava).
 * Env: MONGODB_URI, MONGODB_DB.
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const { LOTTERIES, isLotteryId } = await import("../app/lib/lottery/definitions");
  const { scrapeCaixa, scrapeLoteriasApi } = await import("../app/services/lottery/scrapers.server");
  const { getSavedConcursos, saveResult } = await import("../app/repositories/lottery.repository.server");

  const args = process.argv.slice(2);
  const id = args.find((a) => !a.startsWith("--"));
  if (!isLotteryId(id)) throw new Error("uso: backfillLottery.ts <lotofacil|megasena> [--check]");
  const def = LOTTERIES[id];

  const have = await getSavedConcursos(def);
  const latest = await scrapeCaixa(def)
    .catch(() => scrapeLoteriasApi(def))
    .then((r) => r.concurso);
  const missing = Array.from({ length: latest }, (_, i) => i + 1).filter((n) => !have.has(n));
  console.log(`[backfill:${id}] último=${latest}, no banco=${have.size}, faltando=${missing.length}`);
  if (args.includes("--check") || missing.length === 0) return;

  let ok = 0, fail = 0;
  for (const n of missing) {
    try {
      const r = await scrapeCaixa(def, n).catch(() => scrapeLoteriasApi(def, n));
      await saveResult(def, r);
      ok++;
    } catch (e) {
      fail++;
      console.error(`[backfill:${id}] concurso ${n} falhou: ${(e as Error).message}`);
    }
    await sleep(300); // não sobrecarregar as APIs
  }
  console.log(`[backfill:${id}] fim: ${ok} gravados, ${fail} falhas`);
  if (fail > 0) process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error("[backfill] erro fatal:", e);
    process.exitCode = 1;
  })
  .finally(() => process.exit());
