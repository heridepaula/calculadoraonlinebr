/**
 * Preenche no MongoDB os concursos que faltam (1..último) usando a API da Caixa, com premiação.
 * Uso: npx tsx scripts/backfillLotofacil.ts   (env: MONGODB_URI, MONGODB_DB)
 */
import { config } from "dotenv";
import { MongoClient } from "mongodb";
import { saveLotofacilResult } from "../app/repositories/lotofacil.repository.server";
import { scrapeCaixa } from "../app/services/lotofacil/scrapers.server";

config({ path: ".env.local" });
config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI não configurada");
  const client = await new MongoClient(uri).connect();
  const col = client.db(process.env.MONGODB_DB ?? "calculadoraonlinebr").collection("lotofacil_resultados");
  const have = new Set((await col.find({}, { projection: { concurso: 1 } }).toArray()).map((d) => d.concurso as number));
  await client.close();

  const latest = (await scrapeCaixa()).concurso;
  const missing = Array.from({ length: latest }, (_, i) => i + 1).filter((n) => !have.has(n));
  console.log(`[backfill] último=${latest}, no banco=${have.size}, faltando=${missing.length}`);

  for (const n of missing) {
    try {
      const r = await scrapeCaixa(n);
      const { created } = await saveLotofacilResult(r);
      console.log(`[backfill] ${n} OK (${created ? "novo" : "atualizado"}) acumulou=${r.acumulou} premiacoes=${r.premiacoes?.length ?? 0}`);
    } catch (e) {
      console.error(`[backfill] ${n} FALHOU: ${(e as Error).message}`);
      process.exitCode = 1;
    }
  }
  process.exit(process.exitCode ?? 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
