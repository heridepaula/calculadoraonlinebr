// Preços médios de combustíveis da ANP (gasolina comum e etanol hidratado, média Brasil).
// Funções puras, sem rede nem banco: o I/O fica em services/market/fuel.server.ts.
// Fonte: planilha semanal "resumo_semanal_lpc" do Levantamento de Preços da ANP (aba BRASIL).

import { strFromU8, unzipSync } from "fflate";
import { daysSince, formatIsoDate, round2 } from "~/lib/market/indicators";

export interface FuelPrices {
  /** Gasolina comum, R$/L (média de revenda no Brasil). */
  gasoline: number;
  /** Etanol hidratado, R$/L (média de revenda no Brasil). */
  ethanol: number;
  /** aaaa-mm-dd do domingo em que a semana começa. */
  weekStart: string;
  /** aaaa-mm-dd do sábado em que a semana termina. */
  weekEnd: string;
  /** Verdadeiro quando o valor é o fallback do código ou tem mais de FUEL_STALE_AFTER_DAYS. */
  stale: boolean;
}

/** Última semana lida na fonte quando o código foi revisado; só vale sem banco ou fonte. */
export const FALLBACK_FUEL_PRICES: FuelPrices = {
  gasoline: 6.48,
  ethanol: 4.25,
  weekStart: "2026-11-08",
  weekEnd: "2026-11-14",
  stale: true,
};

/** Idade máxima (dias) do fim da semana antes de o preço ser sinalizado como desatualizado. */
export const FUEL_STALE_AFTER_DAYS = 21;

/** Faixas aceitáveis (R$/L); valores fora delas são descartados como erro da fonte. */
export const FUEL_BOUNDS = { gasoline: [2, 15], ethanol: [1.5, 12] } as const;
export const MIN_STATIONS = 100;

export const ANP_LISTING_URL =
  "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas";
export const ANP_FILES_ROOT =
  "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arquivos-lpc/";

/** Limites de segurança ao ler a planilha (ela tem ~300 KB). */
export const MAX_XLSX_BYTES = 5 * 1024 * 1024;
const MAX_ENTRY_BYTES = 10 * 1024 * 1024;

const DAY_MS = 86_400_000;
const isoOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const utcMs = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const underscored = (iso: string) => iso.replaceAll("-", "_");

export function isFuelStale(prices: Pick<FuelPrices, "weekEnd" | "stale">, now: Date): boolean {
  if (prices.stale) return true;
  const age = daysSince(prices.weekEnd, now);
  return !Number.isFinite(age) || age > FUEL_STALE_AFTER_DAYS;
}

/** "08/11/2026 a 14/11/2026" */
export function formatWeekRange(prices: Pick<FuelPrices, "weekStart" | "weekEnd">): string {
  return `${formatIsoDate(prices.weekStart)} a ${formatIsoDate(prices.weekEnd)}`;
}

// ---------------------------------------------------------------------------
// Semanas (domingo a sábado) e nome do arquivo
// ---------------------------------------------------------------------------

/** Domingo (aaaa-mm-dd, UTC) da última semana já encerrada em `now`; a semana atual não conta. */
export function lastCompletedWeekStart(now: Date): string {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const dow = new Date(today).getUTCDay(); // 0 = domingo
  const daysSinceSaturday = (dow + 1) % 7 || 7; // hoje sendo sábado, a semana vigente ainda não fechou
  return isoOf(today - daysSinceSaturday * DAY_MS - 6 * DAY_MS);
}

export function addDays(iso: string, days: number): string {
  return isoOf(utcMs(iso) + days * DAY_MS);
}

export function weekEndOf(weekStart: string): string {
  return addDays(weekStart, 6);
}

export function weekFileName(weekStart: string): string {
  return `resumo_semanal_lpc_${underscored(weekStart)}-${underscored(weekEndOf(weekStart))}.xlsx`;
}

/** A pasta do arquivo é o ano do domingo que abre a semana. */
export function weekFileUrl(weekStart: string): string {
  return `${ANP_FILES_ROOT}${weekStart.slice(0, 4)}/${weekFileName(weekStart)}`;
}

/** Início da semana (aaaa-mm-dd) a partir do nome do arquivo, ou null. */
export function weekStartFromFileName(name: string): string | null {
  const m = /resumo_semanal_lpc_(\d{4})_(\d{2})_(\d{2})-(\d{4})_(\d{2})_(\d{2})\.xlsx/.exec(name);
  if (!m) return null;
  const start = `${m[1]}-${m[2]}-${m[3]}`;
  const end = `${m[4]}-${m[5]}-${m[6]}`;
  return Number.isFinite(utcMs(start)) && weekEndOf(start) === end ? start : null;
}

/** URLs das planilhas semanais citadas na página de listagem da ANP, da mais nova para a mais antiga. */
export function parseListingLinks(html: string): { weekStart: string; url: string }[] {
  const found = new Map<string, string>();
  for (const m of html.matchAll(/href="([^"]*arquivos-lpc\/[^"]*?(resumo_semanal_lpc_[^"/]+\.xlsx))"/g)) {
    const weekStart = weekStartFromFileName(m[2]);
    if (!weekStart) continue;
    const url = new URL(m[1], ANP_LISTING_URL).toString();
    if (!found.has(weekStart)) found.set(weekStart, url);
  }
  return [...found.entries()]
    .sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0))
    .map(([weekStart, url]) => ({ weekStart, url }));
}

// ---------------------------------------------------------------------------
// Leitura do XLSX (ZIP + XML mínimo)
// ---------------------------------------------------------------------------

export interface AnpWeeklyPrices {
  weekStart: string;
  weekEnd: string;
  gasoline: number;
  ethanol: number;
  gasolineStations: number;
  ethanolStations: number;
}

const XML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
};
const decodeXml = (s: string) => s.replace(/&(?:amp|lt|gt|quot|apos);/g, (e) => XML_ENTITIES[e]);
const normalizeLabel = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toUpperCase();

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([\w:.-]+)="([^"]*)"/g)) out[m[1]] = decodeXml(m[2]);
  return out;
}

function readEntries(data: Uint8Array, wanted: (name: string) => boolean): Record<string, Uint8Array> {
  return unzipSync(data, {
    filter: (file) => wanted(file.name) && file.originalSize <= MAX_ENTRY_BYTES,
  });
}

function sheetPath(files: Record<string, Uint8Array>, sheetName: string): string {
  const workbook = files["xl/workbook.xml"];
  const rels = files["xl/_rels/workbook.xml.rels"];
  if (!workbook || !rels) throw new Error("Planilha da ANP sem workbook.xml ou relações");
  let relId: string | undefined;
  for (const m of strFromU8(workbook).matchAll(/<sheet\b[^>]*>/g)) {
    const a = attrs(m[0]);
    if (normalizeLabel(a.name ?? "") === sheetName) relId = a["r:id"];
  }
  if (!relId) throw new Error(`Aba ${sheetName} não encontrada na planilha da ANP`);
  for (const m of strFromU8(rels).matchAll(/<Relationship\b[^>]*>/g)) {
    const a = attrs(m[0]);
    if (a.Id === relId && a.Target) {
      const target = a.Target.replace(/^\//, "");
      return target.startsWith("xl/") ? target : `xl/${target}`;
    }
  }
  throw new Error(`Relação ${relId} da aba ${sheetName} não encontrada`);
}

function readSharedStrings(xml: string): string[] {
  const out: string[] = [];
  for (const si of xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
    let text = "";
    for (const t of si[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)) text += decodeXml(t[1]);
    out.push(text);
  }
  return out;
}

type Row = Record<string, string>;

function readRows(sheetXml: string, shared: string[]): Row[] {
  const rows: Row[] = [];
  for (const rowMatch of sheetXml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const row: Row = {};
    for (const c of rowMatch[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const a = attrs(c[1]);
      const col = (a.r ?? "").replace(/\d+/g, "");
      const body = c[2] ?? "";
      let value: string | undefined;
      if (a.t === "inlineStr") {
        value = [...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((t) => decodeXml(t[1])).join("");
      } else {
        const v = /<v>([\s\S]*?)<\/v>/.exec(body)?.[1];
        value = v === undefined ? undefined : a.t === "s" ? shared[Number(v)] : decodeXml(v);
      }
      if (col && value !== undefined) row[col] = value;
    }
    rows.push(row);
  }
  return rows;
}

/** Serial de data do Excel (dias desde 30/12/1899) → aaaa-mm-dd em UTC. */
export function excelSerialToIso(serial: number): string {
  if (!Number.isInteger(serial) || serial < 1) throw new Error(`Data inválida na planilha: ${serial}`);
  return isoOf(Date.UTC(1899, 11, 30) + serial * DAY_MS);
}

interface ProductRow {
  weekStart: string;
  weekEnd: string;
  price: number;
  stations: number;
}

function productRow(rows: Row[], product: string, bounds: readonly [number, number]): ProductRow {
  const row = rows.find(
    (r) => normalizeLabel(r.C ?? "") === "BRASIL" && normalizeLabel(r.D ?? "") === product,
  );
  if (!row) throw new Error(`Linha de ${product} (BRASIL) não encontrada`);
  if (normalizeLabel(row.F ?? "") !== "R$/L") {
    throw new Error(`${product}: unidade inesperada "${row.F}" (esperado R$/l)`);
  }
  const price = round2(Number(row.G));
  const stations = Number(row.E);
  if (!Number.isFinite(price) || price < bounds[0] || price > bounds[1]) {
    throw new Error(`${product}: preço ${row.G} fora da faixa aceitável`);
  }
  if (!Number.isFinite(stations) || stations < MIN_STATIONS) {
    throw new Error(`${product}: amostra de ${row.E} postos é pequena demais`);
  }
  const weekStart = excelSerialToIso(Number(row.A));
  const weekEnd = excelSerialToIso(Number(row.B));
  if (new Date(`${weekStart}T00:00:00Z`).getUTCDay() !== 0 || weekEndOf(weekStart) !== weekEnd) {
    throw new Error(`${product}: semana ${weekStart} a ${weekEnd} não é de domingo a sábado`);
  }
  return { weekStart, weekEnd, price, stations };
}

/**
 * Extrai gasolina comum e etanol hidratado (média Brasil) da planilha semanal da ANP.
 * Lança erro se qualquer verificação falhar: o arquivo é recusado inteiro.
 */
export function parseAnpWeeklyXlsx(data: Uint8Array): AnpWeeklyPrices {
  if (data.byteLength === 0 || data.byteLength > MAX_XLSX_BYTES) {
    throw new Error(`Planilha da ANP com tamanho inválido (${data.byteLength} bytes)`);
  }
  const base = readEntries(
    data,
    (n) =>
      n === "xl/workbook.xml" || n === "xl/_rels/workbook.xml.rels" || n === "xl/sharedStrings.xml",
  );
  const path = sheetPath(base, "BRASIL");
  const sheet = readEntries(data, (n) => n === path)[path];
  if (!sheet) throw new Error(`Aba BRASIL (${path}) ausente ou grande demais`);
  const shared = base["xl/sharedStrings.xml"] ? readSharedStrings(strFromU8(base["xl/sharedStrings.xml"])) : [];
  const rows = readRows(strFromU8(sheet), shared);

  const gasoline = productRow(rows, "GASOLINA COMUM", FUEL_BOUNDS.gasoline);
  const ethanol = productRow(rows, "ETANOL HIDRATADO", FUEL_BOUNDS.ethanol);
  if (gasoline.weekStart !== ethanol.weekStart || gasoline.weekEnd !== ethanol.weekEnd) {
    throw new Error("Gasolina e etanol de semanas diferentes na planilha da ANP");
  }
  return {
    weekStart: gasoline.weekStart,
    weekEnd: gasoline.weekEnd,
    gasoline: gasoline.price,
    ethanol: ethanol.price,
    gasolineStations: gasoline.stations,
    ethanolStations: ethanol.stations,
  };
}
