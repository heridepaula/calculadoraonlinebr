import type { LotofacilFetchOutcome } from "~/types/lotofacil";
import { scrapeCaixa, scrapeGigaSena } from "./scrapers.server";

/**
 * Giga Sena (primary, timeout 7s) → API da Caixa (fallback, timeout 8s).
 * A premiação (`acumulou` + `premiacoes`) só vem da Caixa: quando o primary é quem entrega as dezenas,
 * tentamos enriquecer com a Caixa; se ela falhar ou devolver outro concurso, salvamos sem premiação.
 */
export async function fetchLatestLotofacil(): Promise<LotofacilFetchOutcome> {
  try {
    const result = await scrapeGigaSena();
    try {
      const caixa = await scrapeCaixa(result.concurso);
      if (caixa.concurso === result.concurso && caixa.premiacoes) {
        result.acumulou = caixa.acumulou;
        result.premiacoes = caixa.premiacoes;
      }
    } catch (err) {
      console.error("[lotofacil] premiação (Caixa) indisponível, salvando só dezenas:", err);
    }
    return { result, source: "primary", provider: "giga-sena" };
  } catch (err) {
    console.error("[lotofacil] Primary (Giga Sena) falhou, acionando fallback:", err);
  }

  // Se o fallback também falhar, o erro propaga para a rota (500).
  const result = await scrapeCaixa();
  return { result, source: "fallback", provider: "caixa" };
}
