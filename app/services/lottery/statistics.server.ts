import type { LotteryDef, LotteryId } from "~/lib/lottery/definitions";
import { computeStats, FALLBACK_STATS, type LotteryStats } from "~/lib/lottery/stats";
import { getAllDrawsForStats, getLatestConcurso, getLatestResult } from "~/repositories/lottery.repository.server";
import type { LotteryLatest, LotteryResult } from "~/types/lottery";

// Cache em memória por instância e por loteria: só recalcula quando o último concurso do banco
// muda (ou seja, depois que o cron grava um sorteio novo). A checagem custa 1 consulta indexada.
const cache = new Map<LotteryId, { latest: number; stats: LotteryStats }>();

const iso = (d: Date) => d.toISOString().slice(0, 10);

function toLatest(r: LotteryResult): LotteryLatest {
  return {
    concurso: r.concurso,
    data: iso(new Date(r.data_sorteio)),
    dezenas: r.dezenas,
    acumulou: r.acumulou,
    premiacoes: r.premiacoes,
    proximo: r.proximo && { concurso: r.proximo.concurso, data: iso(new Date(r.proximo.data)), estimativa: r.proximo.estimativa },
  };
}

export async function getStats(def: LotteryDef): Promise<LotteryStats> {
  try {
    const latest = await getLatestConcurso(def);
    if (latest === null) return FALLBACK_STATS[def.id];
    const hit = cache.get(def.id);
    if (hit?.latest === latest) return hit.stats;

    const [draws, last] = await Promise.all([getAllDrawsForStats(def), getLatestResult(def)]);
    const stats = computeStats(def, draws);
    if (last) stats.latest = toLatest(last);
    cache.set(def.id, { latest, stats });
    return stats;
  } catch (err) {
    console.error(`[${def.id}] estatísticas: banco indisponível, usando snapshot:`, err);
    return cache.get(def.id)?.stats ?? FALLBACK_STATS[def.id];
  }
}
