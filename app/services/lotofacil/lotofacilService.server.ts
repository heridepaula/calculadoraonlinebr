import type { LotofacilFetchOutcome } from "~/types/lotofacil";
import { scrapeCaixa, scrapeGigaSena } from "./scrapers.server";

/**
 * Giga Sena (primary, timeout 7s) → API da Caixa (fallback, timeout 8s).
 * A premiação (`acumulou` + `premiacoes`) só vem da Caixa: quando o primary é quem entrega as dezenas,
 * tentamos enriquecer com a Caixa; se ela falhar ou devolver outro concurso, salvamos sem premiação.
 */
export async function fetchLatestLotofacil(): Promise<LotofacilFetchOutcome> {
  const avisos: string[] = [];
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
      avisos.push(`premiacao: ${describe(err)}`);
    }
    return { result, source: "primary", provider: "giga-sena", avisos };
  } catch (err) {
    console.error("[lotofacil] Primary (Giga Sena) falhou, acionando fallback:", err);
    avisos.push(`primary: ${describe(err)}`);
  }

  // Se o fallback também falhar, o erro propaga para a rota (500).
  const result = await scrapeCaixa();
  return { result, source: "fallback", provider: "caixa", avisos };
}

function describe(err: unknown): string {
  const e = err as { name?: string; message?: string; cause?: { code?: string } };
  return [e?.name, e?.message, e?.cause?.code].filter(Boolean).join(" | ").slice(0, 200);
}
