/**
 * Definição de cada loteria suportada (seguro para o cliente: sem env nem I/O).
 * Tudo o que difere entre Lotofácil e Mega-Sena fica aqui; estatísticas, motor do gerador,
 * coleta, cron e componente são genéricos e recebem esta definição.
 */
export type LotteryId = "lotofacil" | "megasena";
export type FilterKey = "parity" | "primes" | "fibonacci" | "consecutive" | "rows";

export interface LotteryDef {
  id: LotteryId;
  /** Nome de exibição ("Lotofácil", "Mega-Sena"). */
  name: string;
  /** Dezenas de 1 a `universe`. */
  universe: number;
  /** Dezenas por jogo (aposta simples). */
  gameSize: number;
  /** Máximo de números que o usuário pode fixar na cartela. */
  maxFixed: number;
  /** Faixas de prêmio por acertos, da maior para a menor (faixa 1 da Caixa = primeira). */
  prizeTiers: number[];
  /** Colunas do volante (linhas = universe / columns). */
  columns: number;
  /** Coleção no MongoDB. */
  collection: string;
  /** Chave do histórico de jogos no localStorage. */
  historyKey: string;
  /** Slugs das fontes de dados (Giga Sena, API da Caixa, loterias-api). */
  sources: { gigaSena: string; caixa: string; loteriasApi: string };
  /** Tamanho das listas de quentes e frias. */
  hotSize: number;
  coldSize: number;
  /** Atrasadas: atraso mínimo; se poucas passarem, completa até `overdueMinCount`; limita a `overdueMax`. */
  overdueMinDelay: number;
  overdueMinCount: number;
  overdueMax: number;
  /** Filtros oferecidos no gerador e os que vêm ligados por padrão. */
  filters: FilterKey[];
  defaultFilters: FilterKey[];
  /** Classe de tema (cores `lot-*` definidas em CSS). */
  themeClass: string;
  /** Nome da cor clara que marca o jogo gerado na cartela. */
  lightColorLabel: string;
  emoji: string;
}

export const LOTOFACIL: LotteryDef = {
  id: "lotofacil",
  name: "Lotofácil",
  universe: 25,
  gameSize: 15,
  maxFixed: 15,
  prizeTiers: [15, 14, 13, 12, 11],
  columns: 5,
  collection: "lotofacil_resultados",
  historyKey: "lotofacil-history",
  sources: { gigaSena: "lotofacil", caixa: "lotofacil", loteriasApi: "lotofacil" },
  hotSize: 12,
  coldSize: 5,
  overdueMinDelay: 2,
  overdueMinCount: 5,
  overdueMax: 25,
  filters: ["parity", "primes", "fibonacci", "consecutive"],
  defaultFilters: ["parity", "primes", "consecutive"],
  themeClass: "theme-lotofacil",
  lightColorLabel: "Rosa claro",
  emoji: "🍀",
};

export const MEGASENA: LotteryDef = {
  id: "megasena",
  name: "Mega-Sena",
  universe: 60,
  gameSize: 6,
  maxFixed: 5,
  prizeTiers: [6, 5, 4],
  columns: 10,
  collection: "megasena_resultados",
  // mesma chave da página antiga: o histórico salvo pelos usuários continua aparecendo
  historyKey: "mega-sena-history",
  sources: { gigaSena: "mega-sena", caixa: "megasena", loteriasApi: "megasena" },
  hotSize: 15,
  coldSize: 10,
  // cada dezena sai em média a cada 10 concursos: atrasada = 2x isso
  overdueMinDelay: 20,
  overdueMinCount: 5,
  overdueMax: 10,
  filters: ["parity", "primes", "consecutive", "rows"],
  defaultFilters: ["parity", "consecutive", "rows"],
  themeClass: "theme-megasena",
  lightColorLabel: "Verde claro",
  emoji: "💰",
};

export const LOTTERIES: Record<LotteryId, LotteryDef> = { lotofacil: LOTOFACIL, megasena: MEGASENA };

export function isLotteryId(v: string | undefined): v is LotteryId {
  return v === "lotofacil" || v === "megasena";
}

const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

export const primesUpTo = (max: number) => Array.from({ length: max }, (_, i) => i + 1).filter(isPrime);

export function fibonacciUpTo(max: number): number[] {
  const out = [1, 2];
  while (out[out.length - 1] + out[out.length - 2] <= max) out.push(out[out.length - 1] + out[out.length - 2]);
  return out.filter((n) => n <= max);
}

/** Linha do volante (0-based) de uma dezena. */
export const rowOf = (n: number, columns: number) => Math.floor((n - 1) / columns);
