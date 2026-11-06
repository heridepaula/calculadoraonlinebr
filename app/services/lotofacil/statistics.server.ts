import { getAllDrawsForStats, getLatestConcurso } from "~/repositories/lotofacil.repository.server";
import { computeLotofacilStats, FALLBACK_STATS, type LotofacilStats } from "~/lib/lotofacil-stats";

// Cache em memória por instância: só recalcula quando o último concurso do banco muda
// (ou seja, depois que o cron grava um sorteio novo). A checagem custa 1 consulta indexada.
let cache: { latest: number; stats: LotofacilStats } | null = null;

export async function getLotofacilStats(): Promise<LotofacilStats> {
  try {
    const latest = await getLatestConcurso();
    if (latest === null) return FALLBACK_STATS;
    if (cache?.latest === latest) return cache.stats;

    const stats = computeLotofacilStats(await getAllDrawsForStats());
    cache = { latest, stats };
    return stats;
  } catch (err) {
    console.error("[lotofacil] estatísticas: banco indisponível, usando snapshot:", err);
    return cache?.stats ?? FALLBACK_STATS;
  }
}
