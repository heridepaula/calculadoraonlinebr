import type { LotofacilFetchOutcome, LotofacilResult } from "~/types/lotofacil";
import { scrapeCaixa, scrapeGigaSena, scrapeLoteriasApi } from "./scrapers.server";

type Provider = LotofacilFetchOutcome["provider"];

/** Fontes com premiação, em ordem de preferência: Caixa (oficial) → API da comunidade. */
const PRIZE_SOURCES: Array<{ name: Provider; fetch: (c?: number) => Promise<LotofacilResult> }> = [
  { name: "caixa", fetch: scrapeCaixa },
  { name: "loterias-api", fetch: scrapeLoteriasApi },
];

/**
 * Giga Sena (primary, timeout 7s) → Caixa → API da comunidade.
 * A premiação (`acumulou` + `premiacoes`) não vem do Giga Sena: quando ele entrega as dezenas,
 * enriquecemos com a primeira fonte com premiação que responder; se todas falharem, salvamos só as dezenas.
 */
export async function fetchLatestLotofacil(): Promise<LotofacilFetchOutcome> {
  const avisos: string[] = [];

  try {
    const result = await scrapeGigaSena();
    for (const src of PRIZE_SOURCES) {
      try {
        const p = await src.fetch(result.concurso);
        if (p.concurso === result.concurso && p.premiacoes) {
          result.acumulou = p.acumulou;
          result.premiacoes = p.premiacoes;
          break;
        }
        avisos.push(`premiacao(${src.name}): sem premiação para o concurso ${result.concurso}`);
      } catch (err) {
        console.error(`[lotofacil] premiação via ${src.name} indisponível:`, err);
        avisos.push(`premiacao(${src.name}): ${describe(err)}`);
      }
    }
    return { result, source: "primary", provider: "giga-sena", avisos };
  } catch (err) {
    console.error("[lotofacil] Primary (Giga Sena) falhou, acionando fallback:", err);
    avisos.push(`primary: ${describe(err)}`);
  }

  // Fallback completo (dezenas + premiação). Se todos falharem, o erro propaga para a rota (500).
  let last: unknown;
  for (const src of PRIZE_SOURCES) {
    try {
      return { result: await src.fetch(), source: "fallback", provider: src.name, avisos };
    } catch (err) {
      console.error(`[lotofacil] fallback ${src.name} falhou:`, err);
      avisos.push(`fallback(${src.name}): ${describe(err)}`);
      last = err;
    }
  }
  throw last;
}

function describe(err: unknown): string {
  const e = err as { name?: string; message?: string; cause?: { code?: string } };
  return [e?.name, e?.message, e?.cause?.code].filter(Boolean).join(" | ").slice(0, 200);
}
