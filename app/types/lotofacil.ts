export type LotofacilSource = "primary" | "fallback";

export type FaixaAcertos = 11 | 12 | 13 | 14 | 15;

export interface LotofacilPremiacao {
  /** Faixa de acertos (11 a 15). */
  acertos: FaixaAcertos;
  ganhadores: number;
  /** Valor do prêmio por ganhador (R$). */
  rateio: number;
}

/** Documento persistido na coleção `lotofacil_resultados`. */
export interface LotofacilResult {
  concurso: number;
  /** Data do sorteio (UTC, meia-noite). */
  data_sorteio: Date;
  /** 15 dezenas distintas, 1–25, em ordem crescente. */
  dezenas: number[];
  /** Ausente em resultados vindos do cron (scrapers) até serem enriquecidos pelo seed. */
  acumulou?: boolean;
  premiacoes?: LotofacilPremiacao[];
}

export interface LotofacilFetchOutcome {
  result: LotofacilResult;
  source: LotofacilSource;
  provider: "giga-sena" | "caixa" | "loterias-api";
  /** Falhas não fatais (ex.: premiação indisponível). */
  avisos: string[];
}
