import {
  ANP_LISTING_URL,
  MAX_XLSX_BYTES,
  addDays,
  lastCompletedWeekStart,
  parseListingLinks,
  weekEndOf,
  weekFileUrl,
} from "~/lib/market/fuel";

const USER_AGENT = "calculadoraonlinebr-sync/1.0";
/** Semanas tentadas para trás a partir da última encerrada (a ANP pode atrasar a publicação). */
const MAX_WEEKS_BACK = 4;
const SPREADSHEET = /spreadsheetml|ms-excel|octet-stream/i;

export interface AnpFile {
  weekStart: string;
  url: string;
  data: Uint8Array;
}

/** Baixa a planilha; `null` quando não existe (404 ou uma página HTML no lugar do arquivo). */
async function fetchXlsx(url: string): Promise<Uint8Array | null> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
    signal: AbortSignal.timeout(20_000),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`ANP respondeu ${res.status} para ${url}`);
  if (!new URL(res.url).hostname.endsWith("gov.br")) {
    throw new Error(`ANP redirecionou para fora do gov.br: ${res.url}`);
  }
  if (!SPREADSHEET.test(res.headers.get("content-type") ?? "")) return null;
  const declared = Number(res.headers.get("content-length") ?? 0);
  if (declared > MAX_XLSX_BYTES) throw new Error(`Planilha da ANP grande demais (${declared} bytes)`);
  const data = new Uint8Array(await res.arrayBuffer());
  if (data.byteLength > MAX_XLSX_BYTES) throw new Error(`Planilha da ANP grande demais (${data.byteLength} bytes)`);
  return data;
}

/**
 * Procura a planilha da semana mais nova que a já gravada (`knownWeekEnd`). Primeiro pelo nome
 * calculado; se nenhum existir, pelos links da página de listagem da ANP (cobre mudança de pasta
 * na virada do ano). Devolve `null` quando não há semana nova: a ANP ainda não publicou.
 */
export async function fetchLatestAnpWeek(
  knownWeekEnd: string | null,
  now: Date,
): Promise<AnpFile | null> {
  const newest = lastCompletedWeekStart(now);
  for (let i = 0; i <= MAX_WEEKS_BACK; i++) {
    const weekStart = addDays(newest, -7 * i);
    if (knownWeekEnd && weekEndOf(weekStart) <= knownWeekEnd) return null;
    const url = weekFileUrl(weekStart);
    const data = await fetchXlsx(url);
    if (data) return { weekStart, url, data };
  }

  const res = await fetch(ANP_LISTING_URL, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`Página de listagem da ANP respondeu ${res.status}`);
  const html = (await res.text()).slice(0, 3 * 1024 * 1024);
  for (const link of parseListingLinks(html)) {
    if (knownWeekEnd && weekEndOf(link.weekStart) <= knownWeekEnd) return null;
    const data = await fetchXlsx(link.url);
    if (data) return { weekStart: link.weekStart, url: link.url, data };
  }
  return null;
}
