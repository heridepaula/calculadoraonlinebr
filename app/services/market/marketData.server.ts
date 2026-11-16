import {
  FALLBACK_INDICATORS,
  isStale,
  type IndicatorId,
  type MarketIndicators,
} from "~/lib/market/indicators";
import {
  TREASURY_STALE_AFTER_DAYS,
  toProcessedBonds,
  type ProcessedBond,
} from "~/lib/market/treasury";
import { daysSince } from "~/lib/market/indicators";
import { FALLBACK_FUEL_PRICES, isFuelStale, type FuelPrices } from "~/lib/market/fuel";
import {
  getFuelDoc,
  getIndicatorDocs,
  getLatestTreasuryRows,
} from "~/repositories/market.repository.server";

const TTL_MS = 60 * 60 * 1000;

interface Cache<T> {
  value: T;
  at: number;
}
const g = globalThis as unknown as {
  _marketInd?: Cache<MarketIndicators>;
  _marketBonds?: Cache<TreasuryData>;
  _marketFuel?: Cache<FuelPrices>;
};

export function invalidateMarketCache() {
  g._marketInd = undefined;
  g._marketBonds = undefined;
  g._marketFuel = undefined;
}

/** Indicadores do banco; o que faltar ou estiver velho vem marcado `stale` (fallback do código). */
export async function getMarketIndicators(now = new Date()): Promise<MarketIndicators> {
  if (g._marketInd && Date.now() - g._marketInd.at < TTL_MS) return g._marketInd.value;
  const result: MarketIndicators = structuredClone(FALLBACK_INDICATORS);
  let fromDb = false;
  try {
    for (const doc of await getIndicatorDocs()) {
      const id = doc._id as IndicatorId;
      if (!(id in result)) continue;
      const value = { rate: doc.rate, referenceDate: doc.referenceDate, source: doc.source };
      result[id] = { ...value, stale: isStale(id, value, now) };
      fromDb = true;
    }
  } catch (err) {
    console.error("[market] falha ao ler indicadores:", err);
  }
  // Se o banco falhou, não guardamos em cache por 1 h: tentamos de novo na próxima requisição.
  if (fromDb) g._marketInd = { value: result, at: Date.now() };
  return result;
}

export interface TreasuryData {
  bonds: ProcessedBond[];
  /** aaaa-mm-dd da data-base; null quando não há dados no banco. */
  baseDate: string | null;
  stale: boolean;
}

export async function getTreasuryBonds(now = new Date()): Promise<TreasuryData> {
  if (g._marketBonds && Date.now() - g._marketBonds.at < TTL_MS) return g._marketBonds.value;
  try {
    const bonds = toProcessedBonds(await getLatestTreasuryRows());
    const baseDate = bonds[0]?.baseDate ?? null;
    const data: TreasuryData = {
      bonds,
      baseDate,
      stale: !baseDate || daysSince(baseDate, now) > TREASURY_STALE_AFTER_DAYS,
    };
    if (bonds.length) g._marketBonds = { value: data, at: Date.now() };
    return data;
  } catch (err) {
    console.error("[market] falha ao ler títulos do Tesouro:", err);
    return { bonds: [], baseDate: null, stale: true };
  }
}

/** Preço médio da gasolina e do etanol (ANP); sem banco ou com dado velho, o fallback do código com `stale`. */
export async function getFuelPrices(now = new Date()): Promise<FuelPrices> {
  if (g._marketFuel && Date.now() - g._marketFuel.at < TTL_MS) return g._marketFuel.value;
  try {
    const doc = await getFuelDoc();
    if (doc) {
      const value: FuelPrices = {
        gasoline: doc.gasoline,
        ethanol: doc.ethanol,
        weekStart: doc.weekStart,
        weekEnd: doc.weekEnd,
        stale: false,
      };
      value.stale = isFuelStale(value, now);
      g._marketFuel = { value, at: Date.now() };
      return value;
    }
  } catch (err) {
    console.error("[market] falha ao ler preços de combustíveis:", err);
  }
  return structuredClone(FALLBACK_FUEL_PRICES);
}
