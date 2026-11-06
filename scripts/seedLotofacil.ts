/**
 * Seed (carga inicial) do histórico da Lotofácil no MongoDB.
 *
 * Uso:
 *   npx tsx scripts/seedLotofacil.ts [caminho-do-arquivo] [--dry-run]
 *
 * Padrão do arquivo: ./lotofacil_historico.json (array JSON **ou** JSONL, uma linha por concurso).
 * Env (.env / .env.local): MONGODB_URI (obrigatória), MONGODB_DB (opcional).
 * Idempotente: bulkWrite + updateOne(upsert) filtrando por `concurso`.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";
import { MongoClient, type AnyBulkWriteOperation } from "mongodb";
import type { FaixaAcertos, LotofacilPremiacao, LotofacilResult } from "../app/types/lotofacil";

config({ path: ".env.local" });
config(); // .env

const CHUNK_SIZE = 500;
const COLLECTION = "lotofacil_resultados";

// --------------------------------------------------------------------------- //
// ADAPTER — único ponto a editar se o JSON de origem tiver outras chaves.
// Formato atual: o cache do projeto D:\workspace\lottery (data/raw_draws.jsonl, fonte Caixa):
//   { contest_number, draw_date: "YYYY-MM-DD", numbers: [..15],
//     raw: { acumulado: bool, listaRateioPremio: [{ faixa:1..5, numeroDeGanhadores, valorPremio }] } }
// --------------------------------------------------------------------------- //
export function adapter(src: any): LotofacilResult {
  // >>> ALTERE AQUI as chaves de origem (ex.: src.Concurso, src.concurso, src.contest_number)
  const concurso = Number(src.contest_number);
  // >>> data: "YYYY-MM-DD". Se vier "dd/mm/yyyy", converta antes (ver parseDate).
  const data_sorteio = parseDate(src.draw_date);
  // >>> dezenas: array de números/strings. Se vier como Bola1..Bola15, monte o array aqui.
  const dezenas = (src.numbers as Array<number | string>).map(Number).sort((a, b) => a - b);
  // >>> acumulou: boolean (ex.: src.acumulou, src.Acumulado "SIM"/"NAO")
  const acumulou = Boolean(src.raw?.acumulado);

  // >>> premiacoes: mapeie cada faixa. Se o JSON tiver chaves planas
  // (ex.: 'Ganhadores_15_Acertos' / 'Rateio_15_Acertos' ou 'rateio_15'), use o fallback abaixo.
  const lista: any[] = src.raw?.listaRateioPremio ?? [];
  const premiacoes: LotofacilPremiacao[] = ([15, 14, 13, 12, 11] as FaixaAcertos[]).map((acertos) => {
    // Formato Caixa: faixa 1 = 15 acertos ... faixa 5 = 11 acertos
    const f = lista.find((x) => x.faixa === 16 - acertos);
    return {
      acertos,
      ganhadores: Number(f?.numeroDeGanhadores ?? src[`Ganhadores_${acertos}_Acertos`] ?? 0),
      rateio: Number(f?.valorPremio ?? src[`Rateio_${acertos}_Acertos`] ?? src[`rateio_${acertos}`] ?? 0),
    };
  });

  return validate({ concurso, data_sorteio, dezenas, acumulou, premiacoes });
}

function parseDate(v: unknown): Date {
  const s = String(v ?? "").trim();
  const br = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); // dd/mm/yyyy
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/); // yyyy-mm-dd
  const [y, m, d] = br ? [br[3], br[2], br[1]] : iso ? [iso[1], iso[2], iso[3]] : [];
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  if (!y || Number.isNaN(date.getTime())) throw new Error(`data inválida: "${s}"`);
  return date;
}

function validate(r: LotofacilResult): LotofacilResult {
  if (!Number.isInteger(r.concurso) || r.concurso < 1) throw new Error(`concurso inválido: ${r.concurso}`);
  if (r.dezenas.length !== 15 || new Set(r.dezenas).size !== 15 || r.dezenas.some((n) => !(n >= 1 && n <= 25)))
    throw new Error(`concurso ${r.concurso}: dezenas inválidas [${r.dezenas}]`);
  for (const p of r.premiacoes ?? [])
    if (!(p.ganhadores >= 0) || !(p.rateio >= 0)) throw new Error(`concurso ${r.concurso}: premiação inválida`);
  return r;
}

// --------------------------------------------------------------------------- //
function readSource(path: string): any[] {
  const text = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trim();
  if (text.startsWith("[")) return JSON.parse(text);
  return text.split(/\r?\n/).filter(Boolean).map((l) => JSON.parse(l)); // JSONL
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const file = resolve(args.find((a) => !a.startsWith("--")) ?? "lotofacil_historico.json");

  console.log(`[seed] lendo ${file}`);
  const source = readSource(file);

  const byConcurso = new Map<number, LotofacilResult>();
  let invalid = 0;
  source.forEach((item, i) => {
    try {
      const r = adapter(item);
      byConcurso.set(r.concurso, r); // dedup: último vence
    } catch (e) {
      invalid++;
      console.error(`[seed] registro #${i} ignorado: ${(e as Error).message}`);
    }
  });
  const docs = [...byConcurso.values()].sort((a, b) => a.concurso - b.concurso);
  console.log(`[seed] ${source.length} lidos, ${docs.length} válidos únicos, ${invalid} ignorados`);
  if (docs.length === 0) throw new Error("nenhum registro válido — revise o adapter()");
  if (dryRun) {
    console.log("[seed] --dry-run: exemplo ->", JSON.stringify(docs[docs.length - 1]));
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI não configurada");
  const client = await new MongoClient(uri).connect();
  let inserted = 0, updated = 0, failedBatches = 0;
  try {
    const col = client.db(process.env.MONGODB_DB ?? "calculadoraonlinebr").collection<LotofacilResult>(COLLECTION);
    await col.createIndex({ concurso: 1 }, { unique: true });

    const totalBatches = Math.ceil(docs.length / CHUNK_SIZE);
    for (let i = 0; i < docs.length; i += CHUNK_SIZE) {
      const batch = docs.slice(i, i + CHUNK_SIZE);
      const n = i / CHUNK_SIZE + 1;
      const ops: AnyBulkWriteOperation<LotofacilResult>[] = batch.map((d) => ({
        updateOne: { filter: { concurso: d.concurso }, update: { $set: d }, upsert: true },
      }));
      try {
        const res = await col.bulkWrite(ops, { ordered: false });
        inserted += res.upsertedCount;
        updated += res.modifiedCount;
        console.log(
          `[seed] lote ${n}/${totalBatches} OK (concursos ${batch[0].concurso}-${batch[batch.length - 1].concurso}): ` +
            `+${res.upsertedCount} novos, ${res.modifiedCount} atualizados`
        );
      } catch (e) {
        failedBatches++;
        console.error(`[seed] lote ${n}/${totalBatches} FALHOU: ${(e as Error).message}`);
      }
    }
    console.log(`[seed] fim: ${inserted} inseridos, ${updated} atualizados, ${failedBatches} lotes com falha`);
    console.log(`[seed] total na coleção: ${await col.countDocuments()}`);
  } finally {
    await client.close();
  }
  if (failedBatches > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("[seed] erro fatal:", e);
  process.exit(1);
});
