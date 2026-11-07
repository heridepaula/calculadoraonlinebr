import { HISTORY_DAYS, parseTreasuryCsv } from "~/lib/market/treasury";
import {
  deleteTreasuryBefore,
  getTreasurySync,
  saveIndicators,
  setTreasurySync,
  upsertTreasuryRows,
} from "~/repositories/market.repository.server";
import { fetchIndicators, fetchTreasuryCatalog, fetchTreasuryCsv } from "./sources.server";
import { invalidateMarketCache } from "./marketData.server";

export async function syncIndicators() {
  const { values, errors } = await fetchIndicators();
  const saved = await saveIndicators(values);
  invalidateMarketCache();
  return { saved, errors };
}

export type TreasurySyncResult =
  | { status: "not-modified"; upserted: 0 }
  | { status: "updated"; upserted: number; baseDate: string };

const isoDaysAgo = (days: number, now: Date) =>
  new Date(now.getTime() - days * 86_400_000).toISOString().slice(0, 10);

/**
 * Atalho por `last_modified` e GET condicional por ETag; arquivo recusado ou mais velho que o
 * gravado lança erro sem alterar nada. Upsert idempotente por (título, vencimento, data-base).
 */
export async function syncTreasury(now = new Date()): Promise<TreasurySyncResult> {
  const state = await getTreasurySync();
  try {
    const catalog = await fetchTreasuryCatalog();
    if (state?.lastBaseDate && state.lastModified === catalog.lastModified) {
      await setTreasurySync({ checkedAt: now, lastError: null });
      return { status: "not-modified", upserted: 0 };
    }
    const file = await fetchTreasuryCsv(catalog.url, state?.lastBaseDate ? (state.etag ?? null) : null);
    if (file.status === "not-modified") {
      await setTreasurySync({ lastModified: catalog.lastModified, checkedAt: now, lastError: null });
      return { status: "not-modified", upserted: 0 };
    }
    // Primeira carga: janela inteira; depois, só do último dia gravado em diante.
    const minBase = state?.lastBaseDate ?? isoDaysAgo(HISTORY_DAYS, now);
    const parsed = parseTreasuryCsv(file.text, minBase);
    if (!parsed.ok) throw new Error(`Arquivo do Tesouro recusado: ${parsed.reason}`);
    if (state?.lastBaseDate && parsed.latestBaseDate < state.lastBaseDate) {
      throw new Error(
        `Arquivo do Tesouro mais velho que o gravado (${parsed.latestBaseDate} < ${state.lastBaseDate})`,
      );
    }
    const upserted = await upsertTreasuryRows(parsed.rows);
    await deleteTreasuryBefore(isoDaysAgo(HISTORY_DAYS, now));
    // O estado só avança depois das linhas: se a escrita falhar, a próxima execução tenta de novo.
    await setTreasurySync({
      lastModified: catalog.lastModified,
      etag: file.etag,
      lastBaseDate: parsed.latestBaseDate,
      checkedAt: now,
      lastError: null,
    });
    invalidateMarketCache();
    return { status: "updated", upserted, baseDate: parsed.latestBaseDate };
  } catch (err) {
    await setTreasurySync({
      checkedAt: now,
      lastError: err instanceof Error ? err.message : String(err),
    }).catch(() => undefined);
    throw err;
  }
}
