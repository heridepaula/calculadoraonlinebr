import { getDb } from "~/lib/mongodb.server";
import type { LotofacilResult } from "~/types/lotofacil";

const COLLECTION = "lotofacil_resultados";
let indexReady = false;

async function collection() {
  const col = (await getDb()).collection<LotofacilResult>(COLLECTION);
  if (!indexReady) {
    await col.createIndex({ concurso: 1 }, { unique: true });
    indexReady = true;
  }
  return col;
}

/** Idempotente: upsert por número do concurso. Retorna `created` se inseriu novo documento. */
export async function saveLotofacilResult(r: LotofacilResult): Promise<{ created: boolean }> {
  const col = await collection();
  const res = await col.updateOne(
    { concurso: r.concurso },
    {
      $set: {
        data_sorteio: r.data_sorteio,
        dezenas: r.dezenas,
        // só sobrescreve premiação quando ela veio na coleta (não apaga dados do seed)
        ...(r.acumulou !== undefined && { acumulou: r.acumulou }),
        ...(r.premiacoes && { premiacoes: r.premiacoes }),
      },
    },
    { upsert: true }
  );
  return { created: res.upsertedCount > 0 };
}

/** Maior número de concurso salvo (consulta barata, usa o índice único). */
export async function getLatestConcurso(): Promise<number | null> {
  const col = await collection();
  const doc = await col.find({}, { projection: { _id: 0, concurso: 1 } }).sort({ concurso: -1 }).limit(1).next();
  return doc?.concurso ?? null;
}

/** Histórico completo (só campos necessários) para cálculo de estatísticas. */
export async function getAllDrawsForStats(): Promise<Pick<LotofacilResult, "concurso" | "data_sorteio" | "dezenas">[]> {
  const col = await collection();
  return col
    .find({}, { projection: { _id: 0, concurso: 1, data_sorteio: 1, dezenas: 1 } })
    .sort({ concurso: 1 })
    .toArray();
}
