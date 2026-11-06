/**
 * Motor do gerador de jogos (Lotofácil, Mega-Sena…), puro, sem React/I/O.
 * A loteria vem de `stats.lottery` (universo, tamanho do jogo, filtros disponíveis).
 *
 * Modelo de estratégia em grupos que não se sobrepõem:
 * - Origem dos números: mistura com pesos (quentes / frios / atrasados / aleatório).
 * - Faixa de soma: exclusiva (baixa, ideal, alta ou livre).
 * - Filtros extras: pares, primos, Fibonacci, sequência máxima e linhas do volante, combináveis
 *   (cada loteria oferece um subconjunto).
 * - Números fixos: marcados pelo usuário na cartela e sempre incluídos.
 *
 * Nunca devolve jogo que viole os filtros: se não encontrar um, devolve erro com o filtro culpado.
 */
import { LOTTERIES, type FilterKey, type LotteryDef } from "./definitions";
import { maxPerRow, maxRun, type LotteryStats } from "./stats";

export type { FilterKey } from "./definitions";

/** Definição da loteria das estatísticas e lista 1..universo. */
export const lotteryOf = (stats: LotteryStats): LotteryDef => LOTTERIES[stats.lottery];
export const numbersOf = (stats: LotteryStats) => Array.from({ length: lotteryOf(stats).universe }, (_, i) => i + 1);

export type Rng = () => number;
export type SumMode = "low" | "ideal" | "high" | "free";
export type MixKey = "hot" | "cold" | "overdue" | "random";

export interface RangeFilter {
  enabled: boolean;
  min: number;
  max: number;
}

export interface GeneratorConfig {
  /** Pesos relativos (0–100) de cada origem; normalizados na hora de sortear. */
  weights: Record<MixKey, number>;
  sumMode: SumMode;
  parity: RangeFilter;
  primes: RangeFilter;
  fibonacci: RangeFilter;
  /** Maior sequência de números seguidos permitida (ex.: 7-8-9 = 3). */
  consecutive: { enabled: boolean; max: number };
  /** Máximo de dezenas numa mesma linha do volante. */
  rows: { enabled: boolean; max: number };
  /** Números fixos (marcados na cartela). */
  fixed: number[];
}

export interface GameCheck {
  key: FilterKey | "sum";
  label: string;
  value: string;
  rule: string;
  ok: boolean;
}

export interface GameStatistics {
  pairs: number;
  odds: number;
  sum: number;
  primes: number;
  fibonacci: number;
  maxRun: number;
  /** Maior quantidade de dezenas numa mesma linha do volante. */
  maxRow: number;
  hotNumbers: number;
  coldNumbers: number;
  overdueNumbers: number;
}

export type GenerateResult =
  | { ok: true; numbers: number[]; attempts: number; /** Maior nº de dezenas em comum com um jogo do histórico. */ maxOverlap: number }
  | { ok: false; error: string; blocking?: FilterKey | "sum" | "fixed" };

// --------------------------------------------------------------------------- //
// Aleatoriedade
// --------------------------------------------------------------------------- //
/** RNG criptográfico (navegador e Node 19+); cai para Math.random se indisponível. */
export const cryptoRng: Rng = () => {
  const c = globalThis.crypto;
  if (c?.getRandomValues) return c.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  return Math.random();
};

/** RNG determinístico (mulberry32): usado na estimativa de viabilidade para SSR e cliente baterem. */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --------------------------------------------------------------------------- //
// Configurações
// --------------------------------------------------------------------------- //
export const MIX_PRESETS: Array<{ id: string; icon: string; label: string; weights: Record<MixKey, number> }> = [
  { id: "equilibrado", icon: "🍀", label: "Equilibrado", weights: { hot: 30, cold: 20, overdue: 20, random: 30 } },
  { id: "quentes", icon: "🔥", label: "Quentes", weights: { hot: 70, cold: 0, overdue: 0, random: 30 } },
  { id: "frios", icon: "🧊", label: "Frios", weights: { hot: 0, cold: 70, overdue: 0, random: 30 } },
  { id: "atrasados", icon: "⏳", label: "Atrasados", weights: { hot: 0, cold: 0, overdue: 70, random: 30 } },
  { id: "aleatorio", icon: "🎲", label: "Aleatório", weights: { hot: 0, cold: 0, overdue: 0, random: 100 } },
];

export function sumRangeFor(mode: SumMode, stats: LotteryStats): [number, number] | null {
  const s = stats.patterns.sum;
  if (mode === "low") return [s.wide[0], s.ideal[0] - 1];
  if (mode === "ideal") return [s.ideal[0], s.ideal[1]];
  if (mode === "high") return [s.ideal[1] + 1, s.wide[1]];
  return null;
}

/** Padrão: mistura equilibrada, soma ideal e as faixas mais comuns do histórico. */
export function defaultConfig(stats: LotteryStats): GeneratorConfig {
  const p = stats.patterns;
  const on = (k: FilterKey) => lotteryOf(stats).defaultFilters.includes(k);
  return {
    weights: { ...MIX_PRESETS[0].weights },
    sumMode: "ideal",
    parity: { enabled: on("parity"), min: p.pairs.min, max: p.pairs.max },
    primes: { enabled: on("primes"), min: p.primes.min, max: p.primes.max },
    fibonacci: { enabled: on("fibonacci"), min: p.fibonacci.min, max: p.fibonacci.max },
    consecutive: { enabled: on("consecutive"), max: p.maxConsecutive.limit },
    rows: { enabled: on("rows"), max: p.rows.limit },
    fixed: [],
  };
}

/** Sem nenhum filtro: dezenas totalmente aleatórias. */
export function pureRandomConfig(stats: LotteryStats, fixed: number[] = []): GeneratorConfig {
  const d = defaultConfig(stats);
  return {
    ...d,
    weights: { hot: 0, cold: 0, overdue: 0, random: 100 },
    sumMode: "free",
    parity: { ...d.parity, enabled: false },
    primes: { ...d.primes, enabled: false },
    fibonacci: { ...d.fibonacci, enabled: false },
    consecutive: { ...d.consecutive, enabled: false },
    rows: { ...d.rows, enabled: false },
    fixed,
  };
}

/** Pesos normalizados em % (somam 100). Lista vazia (ex.: sem atrasados) não recebe peso. */
export function normalizedMix(weights: Record<MixKey, number>, stats: LotteryStats): Record<MixKey, number> {
  const usable: Record<MixKey, number> = {
    hot: stats.hot.length ? weights.hot : 0,
    cold: stats.cold.length ? weights.cold : 0,
    overdue: stats.overdue.length ? weights.overdue : 0,
    random: weights.random,
  };
  const total = usable.hot + usable.cold + usable.overdue + usable.random;
  if (total <= 0) return { hot: 0, cold: 0, overdue: 0, random: 100 };
  const pct = (v: number) => Math.round((v / total) * 100);
  return { hot: pct(usable.hot), cold: pct(usable.cold), overdue: pct(usable.overdue), random: pct(usable.random) };
}

// --------------------------------------------------------------------------- //
// Métricas
// --------------------------------------------------------------------------- //
export function gameStatistics(numbers: number[], stats: LotteryStats): GameStatistics {
  const sorted = [...numbers].sort((a, b) => a - b);
  const pairs = sorted.filter((n) => n % 2 === 0).length;
  return {
    pairs,
    odds: sorted.length - pairs,
    sum: sorted.reduce((a, b) => a + b, 0),
    primes: sorted.filter((n) => stats.primes.includes(n)).length,
    fibonacci: sorted.filter((n) => stats.fibonacci.includes(n)).length,
    maxRun: maxRun(sorted),
    maxRow: maxPerRow(sorted, lotteryOf(stats).columns),
    hotNumbers: sorted.filter((n) => stats.hot.includes(n)).length,
    coldNumbers: sorted.filter((n) => stats.cold.includes(n)).length,
    overdueNumbers: sorted.filter((n) => stats.overdue.includes(n)).length,
  };
}

const rangeText = (min: number, max: number) => (min === max ? `${min}` : `${min}–${max}`);

/** Resultado de cada filtro ativo para o jogo (✓/✗). */
export function checkGame(numbers: number[], config: GeneratorConfig, stats: LotteryStats): GameCheck[] {
  const g = gameStatistics(numbers, stats);
  const checks: GameCheck[] = [];
  const sum = sumRangeFor(config.sumMode, stats);
  if (sum)
    checks.push({ key: "sum", label: "Soma", value: String(g.sum), rule: rangeText(sum[0], sum[1]), ok: g.sum >= sum[0] && g.sum <= sum[1] });
  if (config.parity.enabled)
    checks.push({ key: "parity", label: "Pares", value: String(g.pairs), rule: rangeText(config.parity.min, config.parity.max), ok: g.pairs >= config.parity.min && g.pairs <= config.parity.max });
  if (config.primes.enabled)
    checks.push({ key: "primes", label: "Primos", value: String(g.primes), rule: rangeText(config.primes.min, config.primes.max), ok: g.primes >= config.primes.min && g.primes <= config.primes.max });
  if (config.fibonacci.enabled)
    checks.push({ key: "fibonacci", label: "Fibonacci", value: String(g.fibonacci), rule: rangeText(config.fibonacci.min, config.fibonacci.max), ok: g.fibonacci >= config.fibonacci.min && g.fibonacci <= config.fibonacci.max });
  if (config.consecutive.enabled)
    checks.push({ key: "consecutive", label: "Seguidos", value: String(g.maxRun), rule: `≤${config.consecutive.max}`, ok: g.maxRun <= config.consecutive.max });
  if (config.rows.enabled)
    checks.push({ key: "rows", label: "Mesma linha", value: String(g.maxRow), rule: `≤${config.rows.max}`, ok: g.maxRow <= config.rows.max });
  return checks;
}

const FILTER_LABEL: Record<FilterKey | "sum", string> = {
  sum: "faixa de soma",
  parity: "quantidade de pares",
  primes: "quantidade de primos",
  fibonacci: "quantidade de Fibonacci",
  consecutive: "sequência máxima",
  rows: "quantidade por linha do volante",
};

// --------------------------------------------------------------------------- //
// Conflitos que tornam a configuração impossível (bloqueiam a geração)
// --------------------------------------------------------------------------- //
export function findConflicts(config: GeneratorConfig, stats: LotteryStats): Array<{ key: FilterKey | "sum" | "fixed"; message: string }> {
  const out: Array<{ key: FilterKey | "sum" | "fixed"; message: string }> = [];
  const fixed = [...new Set(config.fixed)].sort((a, b) => a - b);
  const def = lotteryOf(stats);
  const free = numbersOf(stats).filter((n) => !fixed.includes(n));
  const toPick = def.gameSize - fixed.length;

  if (fixed.length > def.maxFixed) out.push({ key: "fixed", message: `Marque no máximo ${def.maxFixed} números fixos.` });

  // Para contagens (pares/primos/Fibonacci): o que os fixos já têm e o máximo que ainda cabe.
  const countFilter = (key: "parity" | "primes" | "fibonacci", f: RangeFilter, member: (n: number) => boolean, label: string) => {
    if (!f.enabled) return;
    if (f.min > f.max) {
      out.push({ key, message: `${label}: mínimo maior que o máximo.` });
      return;
    }
    const have = fixed.filter(member).length;
    const canAdd = Math.min(toPick, free.filter(member).length);
    const mustNonMember = toPick - Math.min(toPick, free.filter((n) => !member(n)).length);
    if (have > f.max) out.push({ key, message: `${label}: os números fixos já têm ${have} (máximo ${f.max}).` });
    else if (have + canAdd < f.min) out.push({ key, message: `${label}: impossível chegar a ${f.min} com os números fixos.` });
    else if (have + mustNonMember > f.max) out.push({ key, message: `${label}: impossível ficar em até ${f.max} com os números fixos.` });
  };
  countFilter("parity", config.parity, (n) => n % 2 === 0, "Pares");
  countFilter("primes", config.primes, (n) => stats.primes.includes(n), "Primos");
  countFilter("fibonacci", config.fibonacci, (n) => stats.fibonacci.includes(n), "Fibonacci");

  const sum = sumRangeFor(config.sumMode, stats);
  if (sum) {
    const base = fixed.reduce((a, b) => a + b, 0);
    const minSum = base + free.slice(0, toPick).reduce((a, b) => a + b, 0);
    const maxSum = base + free.slice(free.length - toPick).reduce((a, b) => a + b, 0);
    if (minSum > sum[1] || maxSum < sum[0])
      out.push({ key: "sum", message: `Soma ${rangeText(sum[0], sum[1])}: impossível com os números fixos (fica entre ${minSum} e ${maxSum}).` });
  }

  if (config.consecutive.enabled && fixed.length > 0 && maxRun(fixed) > config.consecutive.max)
    out.push({ key: "consecutive", message: `Sequência máxima ${config.consecutive.max}: os números fixos já têm ${maxRun(fixed)} seguidos.` });

  if (config.rows.enabled && fixed.length > 0 && maxPerRow(fixed, def.columns) > config.rows.max)
    out.push({ key: "rows", message: `Máximo ${config.rows.max} por linha: os números fixos já têm ${maxPerRow(fixed, def.columns)} na mesma linha.` });

  return out;
}

// --------------------------------------------------------------------------- //
// Geração
// --------------------------------------------------------------------------- //
/** Sorteio sem reposição proporcional ao peso de cada número (weights indexado pelo número). */
function sampleWeighted(pool: number[], weights: Float64Array, count: number, rng: Rng): number[] {
  const items = [...pool];
  const w = items.map((n) => weights[n]);
  let total = w.reduce((a, b) => a + b, 0);
  const out: number[] = [];
  while (out.length < count && items.length > 0) {
    let idx: number;
    if (total <= 1e-12) {
      idx = Math.floor(rng() * items.length); // listas esgotadas: completa de forma uniforme
    } else {
      let r = rng() * total;
      idx = 0;
      while (idx < items.length - 1 && r >= w[idx]) r -= w[idx++];
    }
    total -= w[idx];
    out.push(items.splice(idx, 1)[0]);
    w.splice(idx, 1);
  }
  return out;
}

/** Peso de cada número: parte aleatória uniforme + fatia de cada lista (quentes/frios/atrasados) a que pertence. */
function weightTable(config: GeneratorConfig, stats: LotteryStats): Float64Array {
  const mix = normalizedMix(config.weights, stats);
  const NUMBERS = numbersOf(stats);
  const table = new Float64Array(NUMBERS.length + 1);
  const add = (list: number[], pct: number) => list.forEach((n) => (table[n] += pct / list.length));
  NUMBERS.forEach((n) => (table[n] = mix.random / NUMBERS.length));
  if (stats.hot.length) add(stats.hot, mix.hot);
  if (stats.cold.length) add(stats.cold, mix.cold);
  if (stats.overdue.length) add(stats.overdue, mix.overdue);
  return table;
}

export const gameKey = (numbers: number[]) => [...numbers].sort((a, b) => a - b).join("-");

export function generateGame(
  config: GeneratorConfig,
  stats: LotteryStats,
  opts: { rng?: Rng; avoid?: Set<string>; maxAttempts?: number; history?: number[][]; candidates?: number } = {}
): GenerateResult {
  const rng = opts.rng ?? cryptoRng;
  const maxAttempts = opts.maxAttempts ?? 5000;
  const conflicts = findConflicts(config, stats);
  if (conflicts.length) return { ok: false, error: conflicts[0].message, blocking: conflicts[0].key };

  const fixed = [...new Set(config.fixed)];
  const free = numbersOf(stats).filter((n) => !fixed.includes(n));
  const toPick = lotteryOf(stats).gameSize - fixed.length;
  const weights = weightTable(config, stats);
  const failures: Record<string, number> = {};
  let repeated = 0;

  // Junta vários jogos válidos e devolve o que menos repete dezenas dos jogos do histórico.
  const history = (opts.history ?? []).map((g) => new Set(g));
  const wanted = history.length ? (opts.candidates ?? 80) : 1;
  let best: { numbers: number[]; total: number; max: number } | null = null;
  let found = 0;
  let lastAttempt = 0;

  for (let attempt = 1; attempt <= maxAttempts && found < wanted; attempt++) {
    lastAttempt = attempt;
    const numbers = [...fixed, ...sampleWeighted(free, weights, toPick, rng)].sort((a, b) => a - b);
    const failed = checkGame(numbers, config, stats).filter((c) => !c.ok);
    if (failed.length === 0) {
      if (opts.avoid?.has(gameKey(numbers))) {
        repeated++;
        continue;
      }
      found++;
      let total = 0;
      let max = 0;
      for (const h of history) {
        const common = numbers.reduce((n, x) => n + (h.has(x) ? 1 : 0), 0);
        total += common;
        if (common > max) max = common;
      }
      if (!best || total < best.total || (total === best.total && max < best.max)) best = { numbers, total, max };
      continue;
    }
    failed.forEach((c) => (failures[c.key] = (failures[c.key] ?? 0) + 1));
  }
  if (best) return { ok: true, numbers: best.numbers, attempts: lastAttempt, maxOverlap: best.max };

  if (repeated > 0 && Object.keys(failures).length === 0)
    return { ok: false, error: "Todas as combinações possíveis já estão no seu histórico. Mude os filtros ou os números fixos." };
  const worst = (Object.entries(failures).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "sum") as FilterKey | "sum";
  return {
    ok: false,
    blocking: worst,
    error: `Nenhum jogo atende a todos os filtros ao mesmo tempo. O mais restritivo é a ${FILTER_LABEL[worst]}: afrouxe-o ou desative-o.`,
  };
}

/** % aproximado de jogos candidatos que passam nos filtros (indicador de viabilidade). */
export function estimateAcceptance(config: GeneratorConfig, stats: LotteryStats, samples = 1000): number {
  if (findConflicts(config, stats).length) return 0;
  const rng = seededRng(20031029);
  const fixed = [...new Set(config.fixed)];
  const free = numbersOf(stats).filter((n) => !fixed.includes(n));
  const toPick = lotteryOf(stats).gameSize - fixed.length;
  const weights = weightTable(config, stats);
  let ok = 0;
  for (let i = 0; i < samples; i++) {
    const numbers = [...fixed, ...sampleWeighted(free, weights, toPick, rng)].sort((a, b) => a - b);
    if (checkGame(numbers, config, stats).every((c) => c.ok)) ok++;
  }
  return (ok / samples) * 100;
}

/** Resumo legível da estratégia (rótulo do jogo no histórico). */
export function describeConfig(config: GeneratorConfig, stats: LotteryStats): string {
  const mixPreset = MIX_PRESETS.find((m) => (Object.keys(m.weights) as MixKey[]).every((k) => m.weights[k] === config.weights[k]));
  const mix = normalizedMix(config.weights, stats);
  const parts: string[] = [
    mixPreset
      ? mixPreset.label
      : (["hot", "cold", "overdue", "random"] as MixKey[])
          .filter((k) => mix[k] > 0)
          .map((k) => `${mix[k]}% ${{ hot: "quentes", cold: "frios", overdue: "atrasados", random: "aleatório" }[k]}`)
          .join(" + "),
  ];
  const sum = sumRangeFor(config.sumMode, stats);
  parts.push(sum ? `soma ${rangeText(sum[0], sum[1])}` : "soma livre");
  if (config.parity.enabled) parts.push(`pares ${rangeText(config.parity.min, config.parity.max)}`);
  if (config.primes.enabled) parts.push(`primos ${rangeText(config.primes.min, config.primes.max)}`);
  if (config.fibonacci.enabled) parts.push(`Fibonacci ${rangeText(config.fibonacci.min, config.fibonacci.max)}`);
  if (config.consecutive.enabled) parts.push(`seguidos ≤${config.consecutive.max}`);
  if (config.rows.enabled) parts.push(`≤${config.rows.max} por linha`);
  if (config.fixed.length) parts.push(`${config.fixed.length} fixo${config.fixed.length > 1 ? "s" : ""}`);
  return parts.join(" · ");
}

// --------------------------------------------------------------------------- //
// Badges de estratégia (histórico) e Surpresinha com estratégia sorteada
// --------------------------------------------------------------------------- //
export interface StrategyBadge {
  id: string;
  icon: string;
  /** Texto curto exibido no badge. */
  text: string;
  /** Nome completo, mostrado no hover/foco. */
  name: string;
}

/** Um badge por regra ativa na estratégia. `surpresinha` marca jogos de estratégia sorteada. */
export function strategyBadges(config: GeneratorConfig, stats: LotteryStats, opts: { surpresinha?: boolean } = {}): StrategyBadge[] {
  const out: StrategyBadge[] = [];
  if (opts.surpresinha) out.push({ id: "surpresinha", icon: "🎲", text: "Surpresinha", name: "Surpresinha: estratégia sorteada aleatoriamente" });

  const preset = MIX_PRESETS.find((m) => (Object.keys(m.weights) as MixKey[]).every((k) => m.weights[k] === config.weights[k]));
  const mix = normalizedMix(config.weights, stats);
  if (preset) out.push({ id: `mix-${preset.id}`, icon: preset.icon, text: preset.label, name: `Origem dos números: ${preset.label}` });
  else {
    const detail = (["hot", "cold", "overdue", "random"] as MixKey[])
      .filter((k) => mix[k] > 0)
      .map((k) => `${mix[k]}% ${{ hot: "quentes", cold: "frios", overdue: "atrasados", random: "aleatório" }[k]}`)
      .join(" + ");
    out.push({ id: "mix-custom", icon: "🎛️", text: "Mistura", name: `Mistura personalizada: ${detail}` });
  }

  const sum = sumRangeFor(config.sumMode, stats);
  if (sum) {
    const label = { low: "baixa", ideal: "ideal", high: "alta", free: "" }[config.sumMode];
    out.push({ id: `sum-${config.sumMode}`, icon: "Σ", text: `Soma ${label}`, name: `Soma ${label}: ${rangeText(sum[0], sum[1])}` });
  }
  if (config.parity.enabled)
    out.push({ id: "parity", icon: "⚖️", text: "Pares", name: `Pares ${rangeText(config.parity.min, config.parity.max)} (resto ímpares)` });
  if (config.primes.enabled)
    out.push({ id: "primes", icon: "🔢", text: "Primos", name: `Primos ${rangeText(config.primes.min, config.primes.max)}` });
  if (config.fibonacci.enabled)
    out.push({ id: "fibonacci", icon: "🐚", text: "Fibonacci", name: `Fibonacci ${rangeText(config.fibonacci.min, config.fibonacci.max)}` });
  if (config.consecutive.enabled)
    out.push({ id: "consecutive", icon: "🔗", text: "Seguidos", name: `Seguidos: no máximo ${config.consecutive.max} em sequência` });
  if (config.rows.enabled)
    out.push({ id: "rows", icon: "▤", text: "Linhas", name: `No máximo ${config.rows.max} dezenas na mesma linha do volante` });
  if (config.fixed.length)
    out.push({ id: "fixed", icon: "📌", text: `${config.fixed.length} fixo${config.fixed.length > 1 ? "s" : ""}`, name: `Números fixados: ${config.fixed.map((n) => String(n).padStart(2, "0")).join(", ")}` });
  return out;
}

/** Estratégia sorteada: origem, soma e filtros aleatórios (sempre viável; mantém os números fixos). */
export function randomStrategyConfig(stats: LotteryStats, fixed: number[] = [], rng: Rng = cryptoRng): GeneratorConfig {
  const pick = <T,>(list: T[]): T => list[Math.floor(rng() * list.length)];
  const base = defaultConfig(stats);
  const presets = MIX_PRESETS.filter((m) => m.id !== "atrasados" || stats.overdue.length > 0);
  const offered = lotteryOf(stats).filters;
  // só liga filtros que a loteria oferece; o rng é consumido sempre na mesma ordem
  const maybe = (k: FilterKey, p: number) => rng() < p && offered.includes(k);
  for (let i = 0; i < 30; i++) {
    const cfg: GeneratorConfig = {
      ...base,
      weights: { ...pick(presets).weights },
      sumMode: pick<SumMode>(["low", "ideal", "ideal", "high", "free"]),
      parity: { ...base.parity, enabled: maybe("parity", 0.5) },
      primes: { ...base.primes, enabled: maybe("primes", 0.5) },
      fibonacci: { ...base.fibonacci, enabled: maybe("fibonacci", 0.35) },
      consecutive: { ...base.consecutive, enabled: maybe("consecutive", 0.5) },
      rows: { ...base.rows, enabled: offered.includes("rows") && maybe("rows", 0.5) },
      fixed,
    };
    if (findConflicts(cfg, stats).length === 0 && estimateAcceptance(cfg, stats, 200) >= 2) return cfg;
  }
  return pureRandomConfig(stats, fixed);
}
