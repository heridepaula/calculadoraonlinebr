import {
  SGS_SERIES,
  accumulate,
  clampToToday,
  dailyToAnnual,
  inBounds,
  parseSgsResponse,
  round2,
  type IndicatorId,
  type IndicatorValue,
  type SgsPoint,
} from "~/lib/market/indicators";
import { parseTreasuryPackage } from "~/lib/market/treasury";

const SGS = (n: number, last: number) =>
  `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${n}/dados/ultimos/${last}?formato=json`;
const CATALOG_URL =
  "https://www.tesourotransparente.gov.br/ckan/api/3/action/package_show?id=df56aa42-484a-4a59-8184-7676580c81e3";

async function fetchSgs(series: number, last: number, attempt = 1): Promise<SgsPoint[]> {
  try {
    return await fetchSgsOnce(series, last);
  } catch (err) {
    if (attempt >= 3) throw err;
    await new Promise((r) => setTimeout(r, 1000 * attempt));
    return fetchSgs(series, last, attempt + 1);
  }
}

async function fetchSgsOnce(series: number, last: number): Promise<SgsPoint[]> {
  const res = await fetch(SGS(series, last), {
    headers: { Accept: "application/json", "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`SGS ${series} respondeu ${res.status}`);
  // Algumas séries respondem 200 com corpo vazio ou 304; tratamos como falha para cair no fallback.
  const text = await res.text();
  if (!text) throw new Error(`SGS ${series} sem corpo`);
  const points = parseSgsResponse(JSON.parse(text));
  if (points.length === 0) throw new Error(`SGS ${series} sem pontos válidos`);
  return points;
}

const SOURCE = "BCB/SGS";

async function fetchOne(id: IndicatorId): Promise<IndicatorValue> {
  const candidates = SGS_SERIES[id];
  let lastError: unknown;
  for (const series of candidates) {
    try {
      let rate: number;
      let referenceDate: string;
      if (id === "INPC") {
        const pts = await fetchSgs(series, 12);
        if (pts.length < 12) throw new Error(`INPC com ${pts.length} meses (esperado 12)`);
        rate = accumulate(pts.map((p) => p.value));
        referenceDate = pts[pts.length - 1].date;
      } else if (id === "CDI" && series === 12) {
        const [p] = (await fetchSgs(series, 1)).slice(-1);
        rate = dailyToAnnual(p.value);
        referenceDate = p.date;
      } else {
        const [p] = (await fetchSgs(series, 1)).slice(-1);
        rate = p.value;
        referenceDate = p.date;
      }
      rate = round2(rate);
      if (!inBounds(id, rate)) throw new Error(`${id}=${rate} fora da faixa aceitável`);
      return { rate, referenceDate: clampToToday(referenceDate, new Date()), source: SOURCE };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

/** Busca todos os indicadores; cada um falha de forma independente. */
export async function fetchIndicators(): Promise<{
  values: Partial<Record<IndicatorId, IndicatorValue>>;
  errors: Partial<Record<IndicatorId, string>>;
}> {
  const ids = Object.keys(SGS_SERIES) as IndicatorId[];
  const settled = await Promise.allSettled(ids.map(fetchOne));
  const values: Partial<Record<IndicatorId, IndicatorValue>> = {};
  const errors: Partial<Record<IndicatorId, string>> = {};
  settled.forEach((r, i) => {
    if (r.status === "fulfilled") values[ids[i]] = r.value;
    else errors[ids[i]] = r.reason instanceof Error ? r.reason.message : String(r.reason);
  });
  return { values, errors };
}

export async function fetchTreasuryCatalog() {
  const res = await fetch(CATALOG_URL, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
    redirect: "error",
  });
  if (!res.ok) throw new Error(`Catálogo do Tesouro respondeu ${res.status}`);
  return parseTreasuryPackage(await res.json());
}

export type TreasuryCsv = { status: "not-modified" } | { status: "ok"; text: string; etag: string | null };

export async function fetchTreasuryCsv(url: string, etag: string | null): Promise<TreasuryCsv> {
  const res = await fetch(url, {
    headers: etag ? { "If-None-Match": etag } : {},
    signal: AbortSignal.timeout(60_000),
    redirect: "error",
  });
  if (res.status === 304) return { status: "not-modified" };
  if (!res.ok) throw new Error(`CSV do Tesouro respondeu ${res.status}`);
  return { status: "ok", text: await res.text(), etag: res.headers.get("etag") };
}
