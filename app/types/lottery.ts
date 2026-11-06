import type { LotteryId } from "~/lib/lottery/definitions";

export type LotterySource = "primary" | "fallback";
export type LotteryProvider = "giga-sena" | "caixa" | "loterias-api";

export interface LotteryPremiacao {
  /** Faixa de acertos (ex.: 15..11 na Lotofácil, 6..4 na Mega-Sena). */
  acertos: number;
  ganhadores: number;
  /** Valor do prêmio por ganhador (R$). */
  rateio: number;
}

export interface LotteryProximo {
  concurso: number;
  /** Data prevista (UTC, meia-noite). */
  data: Date;
  /** Estimativa de prêmio principal (R$). */
  estimativa: number;
}

/** Documento persistido na coleção da loteria (ex.: `lotofacil_resultados`, `megasena_resultados`). */
export interface LotteryResult {
  concurso: number;
  /** Data do sorteio (UTC, meia-noite). */
  data_sorteio: Date;
  /** Dezenas distintas, em ordem crescente. */
  dezenas: number[];
  /** Ausente em resultados vindos só do Giga Sena (sem premiação). */
  acumulou?: boolean;
  premiacoes?: LotteryPremiacao[];
  /** Próximo concurso (só no resultado mais recente, quando a fonte informa). */
  proximo?: LotteryProximo;
}

export interface LotteryFetchOutcome {
  lottery: LotteryId;
  result: LotteryResult;
  source: LotterySource;
  provider: LotteryProvider;
  /** Falhas não fatais (ex.: premiação indisponível). */
  avisos: string[];
}

/** Último concurso serializado para a página (datas em ISO yyyy-mm-dd). */
export interface LotteryLatest {
  concurso: number;
  data: string;
  dezenas: number[];
  acumulou?: boolean;
  premiacoes?: LotteryPremiacao[];
  proximo?: { concurso: number; data: string; estimativa: number };
}
