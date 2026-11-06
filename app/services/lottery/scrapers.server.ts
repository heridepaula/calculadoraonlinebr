import * as cheerio from "cheerio";
import type { LotteryDef } from "~/lib/lottery/definitions";
import type { LotteryPremiacao, LotteryProximo, LotteryResult } from "~/types/lottery";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export const GIGA_SENA_TIMEOUT_MS = 7000;
export const CAIXA_TIMEOUT_MS = 8000;

// URLs sobrescrevíveis por env (ex.: GIGA_SENA_LOTOFACIL_URL, CAIXA_MEGASENA_URL): ajuste sem
// redeploy de código se algum site mudar o path.
const env = (name: string, def: LotteryDef) => process.env[`${name}_${def.id.toUpperCase()}_URL`];
const gigaSenaUrl = (def: LotteryDef) => env("GIGA_SENA", def) ?? `https://www.gigasena.com.br/${def.sources.gigaSena}`;
const caixaUrl = (def: LotteryDef) =>
  env("CAIXA", def) ?? `https://servicebus2.caixa.gov.br/portaldeloterias/api/${def.sources.caixa}`;
const loteriasApiUrl = (def: LotteryDef) =>
  env("LOTERIAS_API", def) ?? `https://loteriascaixa-api.herokuapp.com/api/${def.sources.loteriasApi}`;

/** DOM mudou / nenhum dado extraído: sinaliza que o fluxo deve ir para o fallback. */
export class ScraperParseError extends Error {
  constructor(
    public readonly provider: string,
    message: string
  ) {
    super(`[${provider}] ${message}`);
    this.name = "ScraperParseError";
  }
}

export class ScraperHttpError extends Error {
  constructor(
    public readonly provider: string,
    public readonly status: number
  ) {
    super(`[${provider}] HTTP ${status}`);
    this.name = "ScraperHttpError";
  }
}

async function fetchText(provider: string, url: string, timeoutMs: number, accept: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: accept, "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.5" },
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "follow",
  });
  if (!res.ok) throw new ScraperHttpError(provider, res.status);
  return res.text();
}

async function fetchJson<T>(provider: string, url: string, timeoutMs: number): Promise<T> {
  const text = await fetchText(provider, url, timeoutMs, "application/json");
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ScraperParseError(provider, "resposta não é JSON válido");
  }
}

const parseBrDate = (s: string | undefined): Date | null => {
  const m = s?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1]))) : null;
};

function validate(def: LotteryDef, provider: string, r: LotteryResult): LotteryResult {
  const dezenas = [...new Set(r.dezenas)].sort((a, b) => a - b);
  if (dezenas.length !== def.gameSize || dezenas.some((n) => !Number.isInteger(n) || n < 1 || n > def.universe)) {
    throw new ScraperParseError(provider, `dezenas inválidas: ${r.dezenas.join(",")}`);
  }
  if (!Number.isInteger(r.concurso) || r.concurso <= 0 || Number.isNaN(r.data_sorteio.getTime())) {
    throw new ScraperParseError(provider, "concurso/data inválidos");
  }
  return { ...r, dezenas };
}

// --------------------------------------------------------------------------- //
// Giga Sena (HTML): só dezenas, concurso e data
// --------------------------------------------------------------------------- //
interface ParseConfig {
  provider: string;
  /** Seletores (em ordem de preferência) que contêm cada dezena. */
  ballSelectors: string[];
  /** Seletores opcionais para localizar o cabeçalho com concurso/data. */
  headerSelectors: string[];
  /** Seletores diretos (opcionais) para concurso e data, quando o site os expõe isolados. */
  concursoSelector?: string;
  dateSelector?: string;
}

export function parseResultHtml(def: LotteryDef, html: string, cfg: ParseConfig): LotteryResult {
  const $ = cheerio.load(html);

  let dezenas: number[] = [];
  for (const sel of cfg.ballSelectors) {
    const nums = $(sel)
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((t) => /^\d{1,2}$/.test(t))
      .map(Number);
    // Pega o primeiro bloco de dezenas (resultado mais recente na página).
    if (nums.length >= def.gameSize) {
      dezenas = nums.slice(0, def.gameSize);
      break;
    }
  }
  if (dezenas.length === 0) {
    throw new ScraperParseError(cfg.provider, "nenhuma dezena encontrada (DOM alterado?)");
  }

  const headerText =
    cfg.headerSelectors
      .map((s) => $(s).first().text())
      .find((t) => /concurso/i.test(t)) ?? $("body").text();

  const concursoText = cfg.concursoSelector ? $(cfg.concursoSelector).first().text().trim() : "";
  const dateText = cfg.dateSelector ? $(cfg.dateSelector).first().text().trim() : "";
  const concursoMatch =
    concursoText.match(/^(\d{3,5})$/) ?? headerText.match(/concurso\s*(?:n[º°o.]*\s*)?(\d{3,5})/i);
  const dateMatch =
    dateText.match(/(\d{2})\/(\d{2})\/(\d{4})/) ?? headerText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!concursoMatch || !dateMatch) {
    throw new ScraperParseError(cfg.provider, "concurso ou data não encontrados");
  }

  const [, dd, mm, yyyy] = dateMatch;
  return validate(def, cfg.provider, {
    concurso: Number(concursoMatch[1]),
    data_sorteio: new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd))),
    dezenas,
  });
}

/** Primary: Giga Sena. */
export async function scrapeGigaSena(def: LotteryDef): Promise<LotteryResult> {
  const html = await fetchText("giga-sena", gigaSenaUrl(def), GIGA_SENA_TIMEOUT_MS, "text/html,application/xhtml+xml");
  return parseResultHtml(def, html, {
    provider: "giga-sena",
    ballSelectors: ["#gs-game_nav li.gs-game_ball", "li.gs-game_ball", ".gs-game_numbers li"],
    headerSelectors: ["h1", "h2"],
    concursoSelector: "#gs-game_s",
    dateSelector: "#gs-game_d",
  });
}

// --------------------------------------------------------------------------- //
// APIs JSON (com premiação)
// --------------------------------------------------------------------------- //
/** Faixas no formato Caixa: faixa 1 = maior prêmio. Faixa ausente: não grava premiação parcial. */
function mapPremiacoes(
  def: LotteryDef,
  lista: Array<{ faixa: number; ganhadores: number; valor: number }> | undefined
): LotteryPremiacao[] | undefined {
  if (!Array.isArray(lista)) return undefined;
  const out: LotteryPremiacao[] = [];
  for (const [i, acertos] of def.prizeTiers.entries()) {
    const f = lista.find((x) => x.faixa === i + 1);
    if (!f) return undefined;
    out.push({ acertos, ganhadores: Number(f.ganhadores), rateio: Number(f.valor) });
  }
  return out;
}

function mapProximo(concurso: unknown, data: unknown, estimativa: unknown): LotteryProximo | undefined {
  const d = parseBrDate(typeof data === "string" ? data : undefined);
  const c = Number(concurso);
  const e = Number(estimativa);
  return d && Number.isInteger(c) && c > 0 && Number.isFinite(e) && e >= 0 ? { concurso: c, data: d, estimativa: e } : undefined;
}

interface CaixaPayload {
  numero?: number;
  dataApuracao?: string; // dd/MM/yyyy
  listaDezenas?: string[];
  acumulado?: boolean;
  listaRateioPremio?: Array<{ faixa: number; numeroDeGanhadores: number; valorPremio: number }>;
  numeroConcursoProximo?: number;
  dataProximoConcurso?: string;
  valorEstimadoProximoConcurso?: number;
}

/**
 * API pública JSON da Caixa (fonte oficial, com premiação). Sem argumento = último concurso.
 * A partir da Vercel costuma responder 403; o fluxo cai para a loterias-api.
 */
export async function scrapeCaixa(def: LotteryDef, concurso?: number): Promise<LotteryResult> {
  const provider = "caixa";
  const base = caixaUrl(def);
  const json = await fetchJson<CaixaPayload>(provider, concurso ? `${base}/${concurso}` : base, CAIXA_TIMEOUT_MS);
  const data = parseBrDate(json.dataApuracao);
  if (!json.numero || !data || !Array.isArray(json.listaDezenas) || json.listaDezenas.length === 0) {
    throw new ScraperParseError(provider, "payload sem numero/dataApuracao/listaDezenas");
  }
  return validate(def, provider, {
    concurso: Number(json.numero),
    data_sorteio: data,
    dezenas: json.listaDezenas.map(Number),
    acumulou: typeof json.acumulado === "boolean" ? json.acumulado : undefined,
    premiacoes: mapPremiacoes(
      def,
      json.listaRateioPremio?.map((p) => ({ faixa: p.faixa, ganhadores: p.numeroDeGanhadores, valor: p.valorPremio }))
    ),
    proximo: mapProximo(json.numeroConcursoProximo, json.dataProximoConcurso, json.valorEstimadoProximoConcurso),
  });
}

export interface LoteriasApiPayload {
  concurso?: number;
  data?: string; // dd/MM/yyyy
  dezenas?: string[];
  acumulou?: boolean;
  premiacoes?: Array<{ faixa: number; ganhadores: number; valorPremio: number }>;
  proximoConcurso?: number;
  dataProximoConcurso?: string;
  valorEstimadoProximoConcurso?: number;
}

/** Converte um item da loterias-api (usado também pelo seed, que baixa o histórico inteiro). */
export function fromLoteriasApi(def: LotteryDef, json: LoteriasApiPayload, withProximo = true): LotteryResult {
  const provider = "loterias-api";
  const data = parseBrDate(json.data);
  if (!json.concurso || !data || !Array.isArray(json.dezenas) || json.dezenas.length === 0) {
    throw new ScraperParseError(provider, "payload sem concurso/data/dezenas");
  }
  return validate(def, provider, {
    concurso: Number(json.concurso),
    data_sorteio: data,
    dezenas: json.dezenas.map(Number),
    acumulou: typeof json.acumulou === "boolean" ? json.acumulou : undefined,
    premiacoes: mapPremiacoes(
      def,
      json.premiacoes?.map((p) => ({ faixa: p.faixa, ganhadores: p.ganhadores, valor: p.valorPremio }))
    ),
    proximo: withProximo ? mapProximo(json.proximoConcurso, json.dataProximoConcurso, json.valorEstimadoProximoConcurso) : undefined,
  });
}

/**
 * Alternativa à Caixa: API da comunidade (github.com/guto-alves/loterias-api), que espelha os
 * dados oficiais com premiação. Serviço gratuito mantido por terceiros: usar só como contingência.
 */
export async function scrapeLoteriasApi(def: LotteryDef, concurso?: number): Promise<LotteryResult> {
  const json = await fetchJson<LoteriasApiPayload>("loterias-api", `${loteriasApiUrl(def)}/${concurso ?? "latest"}`, CAIXA_TIMEOUT_MS);
  return fromLoteriasApi(def, json);
}

/** Histórico completo da loterias-api numa só chamada (seed). */
export async function fetchAllFromLoteriasApi(def: LotteryDef): Promise<LoteriasApiPayload[]> {
  const json = await fetchJson<LoteriasApiPayload[]>("loterias-api", loteriasApiUrl(def), 60_000);
  if (!Array.isArray(json)) throw new ScraperParseError("loterias-api", "histórico não é uma lista");
  return json;
}
