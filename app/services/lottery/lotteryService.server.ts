import type { LotteryDef } from "~/lib/lottery/definitions";
import type { LotteryFetchOutcome, LotteryProvider, LotteryResult } from "~/types/lottery";
import { scrapeCaixa, scrapeGigaSena, scrapeLoteriasApi } from "./scrapers.server";

/** Fontes com premiação, em ordem de preferência: Caixa (oficial) → API da comunidade. */
const PRIZE_SOURCES: Array<{ name: LotteryProvider; fetch: (def: LotteryDef, c?: number) => Promise<LotteryResult> }> = [
  { name: "caixa", fetch: scrapeCaixa },
  { name: "loterias-api", fetch: scrapeLoteriasApi },
];

/**
 * Giga Sena (primary, timeout 7s) → Caixa → API da comunidade.
 * A premiação (`acumulou` + `premiacoes` + `proximo`) não vem do Giga Sena: quando ele entrega as
 * dezenas, enriquecemos com a primeira fonte com premiação que responder; se todas falharem,
 * salvamos só as dezenas.
 */
export async function fetchLatest(
  def: LotteryDef,
  /** Último concurso já gravado com premiação: se a fonte principal não trouxer nada mais novo, pula o enriquecimento. */
  saved?: Promise<{ concurso: number; completo: boolean } | undefined>
): Promise<LotteryFetchOutcome> {
  const avisos: string[] = [];
  const tag = `[${def.id}]`;

  try {
    const result = await scrapeGigaSena(def);
    const known = await saved;
    if (known?.completo && result.concurso <= known.concurso) {
      return { lottery: def.id, result, source: "primary", provider: "giga-sena", avisos };
    }
    for (const src of PRIZE_SOURCES) {
      try {
        const p = await src.fetch(def, result.concurso);
        if (p.concurso === result.concurso && p.premiacoes) {
          result.acumulou = p.acumulou;
          result.premiacoes = p.premiacoes;
          result.proximo = p.proximo;
          break;
        }
        avisos.push(`premiacao(${src.name}): sem premiação para o concurso ${result.concurso}`);
      } catch (err) {
        console.error(`${tag} premiação via ${src.name} indisponível:`, err);
        avisos.push(`premiacao(${src.name}): ${describe(err)}`);
      }
    }
    return { lottery: def.id, result, source: "primary", provider: "giga-sena", avisos };
  } catch (err) {
    console.error(`${tag} Primary (Giga Sena) falhou, acionando fallback:`, err);
    avisos.push(`primary: ${describe(err)}`);
  }

  // Fallback completo (dezenas + premiação). Se todos falharem, o erro propaga para a rota (500).
  let last: unknown;
  for (const src of PRIZE_SOURCES) {
    try {
      return { lottery: def.id, result: await src.fetch(def), source: "fallback", provider: src.name, avisos };
    } catch (err) {
      console.error(`${tag} fallback ${src.name} falhou:`, err);
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
