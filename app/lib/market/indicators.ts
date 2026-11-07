// Indicadores de mercado: tipos, valores de fallback e conversões puras (sem I/O).
// Fonte: API SGS do Banco Central. Os valores abaixo só são usados se o banco de dados
// e a fonte estiverem indisponíveis; a página sinaliza `stale` nesse caso.

export type IndicatorId =
  | "SELIC"
  | "CDI"
  | "IPCA"
  | "INPC"
  | "TR_MES"
  | "POUPANCA_MES";

export interface IndicatorValue {
  /** Em %, na unidade do indicador (a.a. para SELIC/CDI, 12 meses para IPCA/INPC, a.m. para TR/poupança). */
  rate: number;
  /** aaaa-mm-dd da referência na fonte. */
  referenceDate: string;
  source: string;
  /** Verdadeiro quando o valor é o fallback do código ou tem mais de STALE_AFTER_DAYS. */
  stale?: boolean;
}

export type MarketIndicators = Record<IndicatorId, IndicatorValue>;

/** Idade máxima (dias) da referência antes de o indicador ser sinalizado como desatualizado.
 * IPCA/INPC são mensais e a data é o 1º dia do mês de referência (divulgado ~10 dias após o fim do mês). */
export const STALE_AFTER_DAYS: Record<IndicatorId, number> = {
  SELIC: 60,
  CDI: 10,
  IPCA: 75,
  INPC: 75,
  TR_MES: 15,
  POUPANCA_MES: 15,
};

/** Séries SGS usadas por cada indicador (a primeira que responder vence). */
export const SGS_SERIES = {
  SELIC: [432], // meta Selic, % a.a.
  CDI: [4389, 12], // 4389: CDI anualizado base 252; 12: CDI diário (%)
  IPCA: [13522], // IPCA acumulado 12 meses
  INPC: [188], // INPC mensal (acumulamos 12 meses)
  TR_MES: [226], // TR, % a.m.
  POUPANCA_MES: [195], // Poupança, % a.m.
} as const;

export const FALLBACK_INDICATORS: MarketIndicators = {
  SELIC: { rate: 13.75, referenceDate: "2026-11-06", source: "fallback", stale: true },
  CDI: { rate: 13.65, referenceDate: "2026-11-06", source: "fallback", stale: true },
  IPCA: { rate: 4.58, referenceDate: "2026-09-01", source: "fallback", stale: true },
  INPC: { rate: 4.4, referenceDate: "2026-09-01", source: "fallback", stale: true },
  TR_MES: { rate: 0.17, referenceDate: "2026-11-05", source: "fallback", stale: true },
  POUPANCA_MES: { rate: 0.67, referenceDate: "2026-11-05", source: "fallback", stale: true },
};

/** Faixa aceitável por indicador; valores fora dela são descartados como erro da fonte. */
export const RATE_BOUNDS: Record<IndicatorId, [number, number]> = {
  SELIC: [0, 50],
  CDI: [0, 50],
  IPCA: [-5, 40],
  INPC: [-5, 40],
  TR_MES: [-1, 5],
  POUPANCA_MES: [-1, 5],
};

export interface SgsPoint {
  /** aaaa-mm-dd (início do período) */
  date: string;
  value: number;
}

/** "13.75" ou "13,75" → 13.75; null se inválido. */
export function parseSgsNumber(text: unknown): number | null {
  if (typeof text !== "string" && typeof text !== "number") return null;
  const n = Number(String(text).trim().replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** Interpreta a resposta do SGS (`[{data:"dd/mm/aaaa", valor:"13.75"}]`) em pontos ordenados. */
export function parseSgsResponse(payload: unknown): SgsPoint[] {
  if (!Array.isArray(payload)) return [];
  const points: SgsPoint[] = [];
  for (const item of payload as { data?: unknown; valor?: unknown }[]) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(item?.data ?? ""));
    const value = parseSgsNumber(item?.valor);
    if (!m || value === null) continue;
    points.push({ date: `${m[3]}-${m[2]}-${m[1]}`, value });
  }
  return points.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

/** CDI diário (% ao dia útil) → % ao ano, base 252. */
export function dailyToAnnual(dailyPercent: number): number {
  return (Math.pow(1 + dailyPercent / 100, 252) - 1) * 100;
}

/** Variações mensais (%) → acumulado em % (juros compostos). */
export function accumulate(monthlyPercents: readonly number[]): number {
  return (monthlyPercents.reduce((acc, p) => acc * (1 + p / 100), 1) - 1) * 100;
}

export const round2 = (n: number) => Math.round(n * 100) / 100;

export function inBounds(id: IndicatorId, rate: number): boolean {
  const [min, max] = RATE_BOUNDS[id];
  return rate >= min && rate <= max;
}

export function daysSince(isoDate: string, now: Date): number {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((today - Date.parse(`${isoDate}T00:00:00Z`)) / 86_400_000);
}

export function isStale(id: IndicatorId, value: IndicatorValue, now: Date): boolean {
  if (value.stale) return true;
  const age = daysSince(value.referenceDate, now);
  return !Number.isFinite(age) || age > STALE_AFTER_DAYS[id];
}

/** A SELIC meta (SGS 432) vem datada na próxima decisão do Copom: a referência nunca passa de hoje. */
export function clampToToday(isoDate: string, now: Date): string {
  const today = now.toISOString().slice(0, 10);
  return isoDate > today ? today : isoDate;
}

/** Formata taxa em pt-BR: 13.75 → "13,75". */
export function formatRate(rate: number, digits = 2): string {
  return rate.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** "2026-11-06" → "06/11/2026" (sem depender de fuso). */
export function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
