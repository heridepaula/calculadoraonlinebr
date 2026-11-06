import * as cheerio from "cheerio";
import type { LotofacilPremiacao, LotofacilResult } from "~/types/lotofacil";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// URLs sobrescrevíveis por env: ajuste sem redeploy de código se o site mudar o path.
const GIGA_SENA_URL =
  process.env.GIGA_SENA_LOTOFACIL_URL ?? "https://www.gigasena.com.br/lotofacil";
const CAIXA_URL =
  process.env.CAIXA_LOTOFACIL_URL ??
  "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil";

export const GIGA_SENA_TIMEOUT_MS = 7000;
export const CAIXA_TIMEOUT_MS = 8000;

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

async function fetchHtml(provider: string, url: string, timeoutMs: number) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.5",
    },
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "follow",
  });
  if (!res.ok) throw new ScraperHttpError(provider, res.status);
  return res.text();
}

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

export function parseLotofacilHtml(html: string, cfg: ParseConfig): LotofacilResult {
  const $ = cheerio.load(html);

  let dezenas: number[] = [];
  for (const sel of cfg.ballSelectors) {
    const nums = $(sel)
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((t) => /^\d{1,2}$/.test(t))
      .map(Number);
    // Pega o primeiro bloco de 15 dezenas (resultado mais recente na página).
    if (nums.length >= 15) {
      dezenas = nums.slice(0, 15);
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
  const data = new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)));

  return validate(cfg.provider, {
    concurso: Number(concursoMatch[1]),
    data_sorteio: data,
    dezenas,
  });
}

function validate(provider: string, r: LotofacilResult): LotofacilResult {
  const dezenas = [...new Set(r.dezenas)].sort((a, b) => a - b);
  if (dezenas.length !== 15 || dezenas.some((n) => n < 1 || n > 25)) {
    throw new ScraperParseError(provider, `dezenas inválidas: ${r.dezenas.join(",")}`);
  }
  if (!Number.isInteger(r.concurso) || r.concurso <= 0 || Number.isNaN(r.data_sorteio.getTime())) {
    throw new ScraperParseError(provider, "concurso/data inválidos");
  }
  return { ...r, dezenas };
}

/** Primary: Giga Sena. */
export async function scrapeGigaSena(): Promise<LotofacilResult> {
  const html = await fetchHtml("giga-sena", GIGA_SENA_URL, GIGA_SENA_TIMEOUT_MS);
  return parseLotofacilHtml(html, {
    provider: "giga-sena",
    ballSelectors: ["#gs-game_nav li.gs-game_ball", "li.gs-game_ball", ".gs-game_numbers li"],
    headerSelectors: ["h1", "h2"],
    concursoSelector: "#gs-game_s",
    dateSelector: "#gs-game_d",
  });
}

interface CaixaPayload {
  numero?: number;
  dataApuracao?: string; // dd/MM/yyyy
  listaDezenas?: string[];
  acumulado?: boolean;
  listaRateioPremio?: Array<{ faixa: number; numeroDeGanhadores: number; valorPremio: number }>;
}

/** Faixas da Caixa: 1 = 15 acertos ... 5 = 11 acertos. */
function mapPremiacoes(lista: CaixaPayload["listaRateioPremio"]): LotofacilPremiacao[] | undefined {
  if (!Array.isArray(lista)) return undefined;
  const out: LotofacilPremiacao[] = [];
  for (const acertos of [15, 14, 13, 12, 11] as const) {
    const f = lista.find((x) => x.faixa === 16 - acertos);
    if (!f) return undefined; // faixa ausente: melhor não gravar premiação parcial
    out.push({ acertos, ganhadores: Number(f.numeroDeGanhadores), rateio: Number(f.valorPremio) });
  }
  return out;
}

/**
 * API pública JSON da Caixa (fonte oficial, com premiação). Sem argumento = último concurso.
 * Usada como fallback das dezenas e como fonte de `acumulou`/`premiacoes` para o cron.
 */
export async function scrapeCaixa(concurso?: number): Promise<LotofacilResult> {
  const provider = "caixa";
  const res = await fetch(concurso ? `${CAIXA_URL}/${concurso}` : CAIXA_URL, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    signal: AbortSignal.timeout(CAIXA_TIMEOUT_MS),
  });
  if (!res.ok) throw new ScraperHttpError(provider, res.status);

  let json: CaixaPayload;
  try {
    json = (await res.json()) as CaixaPayload;
  } catch {
    throw new ScraperParseError(provider, "resposta não é JSON válido");
  }

  const m = json.dataApuracao?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!json.numero || !m || !Array.isArray(json.listaDezenas) || json.listaDezenas.length === 0) {
    throw new ScraperParseError(provider, "payload sem numero/dataApuracao/listaDezenas");
  }
  return validate(provider, {
    concurso: Number(json.numero),
    data_sorteio: new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1]))),
    dezenas: json.listaDezenas.map(Number),
    acumulou: typeof json.acumulado === "boolean" ? json.acumulado : undefined,
    premiacoes: mapPremiacoes(json.listaRateioPremio),
  });
}
