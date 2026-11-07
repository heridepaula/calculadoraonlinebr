// Taxas dos títulos do Tesouro Direto (dataset aberto do Tesouro Transparente). Código puro.
// Adaptado do projeto koinos (parser com validação estrita), generalizado para todos os títulos
// ofertados ao público (exceto Educa+, Renda+ e IGPM+).

export type BondType =
  | "tesouro_selic"
  | "tesouro_prefixado"
  | "tesouro_ipca"
  | "tesouro_prefixado_juros"
  | "tesouro_ipca_juros";

export const KIND_TO_TYPE: Readonly<Record<string, BondType>> = {
  "Tesouro Selic": "tesouro_selic",
  "Tesouro Prefixado": "tesouro_prefixado",
  "Tesouro Prefixado com Juros Semestrais": "tesouro_prefixado_juros",
  "Tesouro IPCA+": "tesouro_ipca",
  "Tesouro IPCA+ com Juros Semestrais": "tesouro_ipca_juros",
};

/** Dias de histórico mantidos no banco. */
export const HISTORY_DAYS = 365;
/** Acima desta fração de linhas inválidas entre as acompanhadas, o arquivo inteiro é recusado. */
export const MAX_INVALID_SHARE = 0.01;
export const RATE_LIMITS = { min: -10, max: 30 } as const;
/** Taxa é velha quando a última data-base tem mais dias que isso. */
export const TREASURY_STALE_AFTER_DAYS = 10;

export const TREASURY_COLUMNS = [
  "Tipo Titulo",
  "Data Vencimento",
  "Data Base",
  "Taxa Compra Manha",
  "Taxa Venda Manha",
  "PU Compra Manha",
  "PU Venda Manha",
  "PU Base Manha",
] as const;

export interface TreasuryRow {
  kind: string;
  type: BondType;
  /** aaaa-mm-dd */
  maturity: string;
  /** aaaa-mm-dd */
  baseDate: string;
  buyRate: number;
  sellRate: number;
  buyPrice: number;
  sellPrice: number;
}

export type ParsedTreasury =
  | { ok: true; rows: TreasuryRow[]; invalid: number; latestBaseDate: string }
  | { ok: false; reason: string };

/** Formato consumido pelas calculadoras (mesma forma do antigo ProcessedBond, sem rawData). */
export interface ProcessedBond {
  code: string;
  name: string;
  type: BondType;
  /** Taxa de compra (% a.a.). Tesouro Selic: spread sobre a Selic. IPCA+: taxa real. */
  rate: number;
  price: number;
  minInvestment: number;
  maturityDate: string;
  baseDate: string;
}

const NUMBER = /^-?\d+(,\d+)?$/;
const DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

function parseNumber(text: string): number | null {
  if (!NUMBER.test(text)) return null;
  return Number(text.replace(",", ".")) + 0;
}

const inRange = (rate: number) => rate >= RATE_LIMITS.min && rate <= RATE_LIMITS.max;

/** "30/10/2026" → "2026-10-30"; null se não for data real. */
export function parseBrDate(text: string): string | null {
  const m = DATE.exec(text);
  if (!m) return null;
  const iso = `${m[3]}-${m[2]}-${m[1]}`;
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== iso ? null : iso;
}

/**
 * Lê o CSV e devolve as linhas dos títulos suportados com data-base >= `minBaseDate`.
 * Recusa o arquivo inteiro se o cabeçalho mudou, se alguma linha não tem 8 colunas, se nenhum
 * título aparece ou se mais de 1% das linhas relevantes é inválida.
 */
export function parseTreasuryCsv(text: string, minBaseDate: string): ParsedTreasury {
  const lines = text.replace(/^\uFEFF/, "").split("\n");
  const header = (lines[0] ?? "").replace(/\r$/, "").split(";");
  if (
    header.length !== TREASURY_COLUMNS.length ||
    header.some((name, i) => name !== TREASURY_COLUMNS[i])
  ) {
    return { ok: false, reason: "cabeçalho inesperado" };
  }

  const rows: TreasuryRow[] = [];
  let seen = 0;
  let invalid = 0;

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i].replace(/\r$/, "");
    if (raw === "") continue;
    const cells = raw.split(";");
    if (cells.length !== TREASURY_COLUMNS.length) {
      return { ok: false, reason: `linha ${i + 1} com ${cells.length} colunas` };
    }
    const type = KIND_TO_TYPE[cells[0]];
    if (!type) continue;
    const baseDate = parseBrDate(cells[2]);
    // Linhas antigas fora da janela não contam para a validação.
    if (baseDate !== null && baseDate < minBaseDate) continue;

    seen++;
    const maturity = parseBrDate(cells[1]);
    const buyRate = parseNumber(cells[3]);
    const sellRate = parseNumber(cells[4]);
    const buyPrice = parseNumber(cells[5]);
    const sellPrice = parseNumber(cells[6]);
    if (
      maturity === null ||
      baseDate === null ||
      buyRate === null ||
      sellRate === null ||
      buyPrice === null ||
      sellPrice === null ||
      buyPrice <= 0 ||
      !inRange(buyRate) ||
      !inRange(sellRate)
    ) {
      invalid++;
      continue;
    }
    rows.push({ kind: cells[0], type, maturity, baseDate, buyRate, sellRate, buyPrice, sellPrice });
  }

  if (seen === 0) return { ok: false, reason: "nenhum título no arquivo" };
  if (invalid / seen > MAX_INVALID_SHARE) {
    return { ok: false, reason: `${invalid} de ${seen} linhas inválidas` };
  }
  const latestBaseDate = rows.reduce((l, r) => (r.baseDate > l ? r.baseDate : l), "");
  if (!latestBaseDate) return { ok: false, reason: "nenhuma linha válida" };
  return { ok: true, rows, invalid, latestBaseDate };
}

export function treasuryRowId(r: Pick<TreasuryRow, "kind" | "maturity" | "baseDate">): string {
  return `${r.kind}|${r.maturity}|${r.baseDate}`;
}

/** Valor mínimo de investimento: 1% do PU, piso de R$ 30,00 (regra do Tesouro Direto). */
export function minInvestment(price: number): number {
  return Math.max(30, Math.round(price) / 100);
}

const CODE_PREFIX: Record<BondType, string> = {
  tesouro_selic: "LFT",
  tesouro_prefixado: "LTN",
  tesouro_prefixado_juros: "NTNF",
  tesouro_ipca: "NTNB_P",
  tesouro_ipca_juros: "NTNB",
};

function bondName(row: TreasuryRow): string {
  return `${row.kind} ${row.maturity.slice(0, 4)}`;
}

/** Linhas da data-base mais recente → títulos ofertados (vencimento posterior à data-base). */
export function toProcessedBonds(rows: readonly TreasuryRow[]): ProcessedBond[] {
  const latest = rows.reduce((l, r) => (r.baseDate > l ? r.baseDate : l), "");
  return rows
    .filter((r) => r.baseDate === latest && r.maturity > latest)
    .map((r) => ({
      code: `${CODE_PREFIX[r.type]}_${r.maturity.slice(0, 4)}`,
      name: bondName(r),
      type: r.type,
      rate: r.buyRate,
      price: r.buyPrice,
      minInvestment: minInvestment(r.buyPrice),
      maturityDate: r.maturity,
      baseDate: r.baseDate,
    }))
    .sort((a, b) => (a.maturityDate < b.maturityDate ? -1 : 1));
}

const CATALOG_HOST = "www.tesourotransparente.gov.br";

/** Do JSON `package_show` (CKAN): URL de download e `last_modified` do CSV. Só https no host oficial. */
export function parseTreasuryPackage(payload: unknown): { url: string; lastModified: string } {
  const resources = (payload as { result?: { resources?: unknown } } | null)?.result?.resources;
  if (!Array.isArray(resources)) throw new Error("Catálogo do Tesouro sem lista de recursos");
  const csv = (resources as Record<string, unknown>[]).find(
    (r) =>
      r &&
      String(r.format).toUpperCase() === "CSV" &&
      typeof r.last_modified === "string" &&
      r.last_modified !== "",
  );
  if (!csv) throw new Error("Catálogo do Tesouro sem recurso CSV com last_modified");
  const url = typeof csv.url === "string" ? csv.url : "";
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Recurso CSV do Tesouro com URL inválida");
  }
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== CATALOG_HOST ||
    parsed.username !== "" ||
    parsed.password !== "" ||
    parsed.port !== ""
  ) {
    throw new Error(`Recurso CSV fora do host esperado: ${parsed.hostname}`);
  }
  return { url, lastModified: csv.last_modified as string };
}
