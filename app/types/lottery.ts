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

/** Jogo gerado por um visitante (coleção `lottery_generated_games`). */
export interface GeneratedGame {
  lotteryType: LotteryId;
  /** Dezenas distintas, em ordem crescente. */
  numbers: number[];
  /** Resumo legível da estratégia (ex.: "Surpresinha · Quentes · Soma ideal · Primos"). */
  strategy: string;
  /** Ids dos badges de estratégia (ex.: ["mix-quentes", "sum-ideal", "primes"]). */
  badges: string[];
  /** Concurso para o qual o jogo foi gerado (o próximo sorteio no momento da geração). */
  concursoTarget: number;
  generatedAt: Date;
  /** Acertos: preenchido pela auditoria após o sorteio. */
  hits: number | null;
  /** Melhor jogo do concurso (o único que sobra depois da limpeza). */
  isBestGame: boolean;
  /** Quantos jogos concorreram no concurso: preenchido só no melhor jogo. */
  totalGamesCompeted: number | null;
  /** "Cidade, UF", "UF", "Brasil" ou "Exterior". Nunca o IP. */
  location: string;
  /** Dezenas sorteadas no concurso: gravadas só no melhor jogo, para exibir sem outra consulta. */
  drawnNumbers?: number[];
}

/** Jogo como sai para o navegador e para o Pusher. */
export interface PublicGeneratedGame {
  id: string;
  lotteryType: LotteryId;
  numbers: number[];
  strategy: string;
  badges: string[];
  concursoTarget: number;
  generatedAt: string;
  location: string;
}

/** Melhor jogo de um concurso já auditado. */
export interface PublicBestGame extends PublicGeneratedGame {
  hits: number;
  totalGamesCompeted: number;
  drawnNumbers: number[];
  /**
   * Prêmio por ganhador da faixa acertada, pela premiação oficial do concurso (R$).
   * `null` = faixa sem prêmio; `0` = faixa sem ganhadores (acumulou); ausente = premiação indisponível.
   */
  prize?: number | null;
}

/** Resultado da auditoria de um concurso (resposta do cron). */
export interface GamesAuditOutcome {
  concurso: number;
  status: "audited" | "already-audited" | "no-games";
  totalGames: number;
  bestHits: number | null;
  deleted: number;
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
