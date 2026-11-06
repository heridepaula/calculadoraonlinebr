/**
 * Estatísticas de uma loteria a partir do histórico de concursos (puro; roda no servidor).
 * Faixas "comuns" = menor intervalo que cobre >= 75% dos concursos.
 */
import type { LotteryLatest } from "~/types/lottery";
import { LOTTERIES, fibonacciUpTo, primesUpTo, rowOf, type LotteryDef, type LotteryId } from "./definitions";

const RANGE_COVERAGE = 0.75;

export interface DrawInput {
  concurso: number;
  data_sorteio: Date | string;
  dezenas: number[];
}

export interface CoveredRange {
  min: number;
  max: number;
  /** % dos concursos cujo valor cai na faixa. */
  coverage: number;
}

export interface LotteryStats {
  lottery: LotteryId;
  /** "database" = calculado do MongoDB; "fallback" = snapshot embutido (banco indisponível). */
  source: "database" | "fallback";
  totalConcursos: number;
  ultimoConcurso: number | null;
  /** ISO yyyy-mm-dd do último concurso. */
  ultimaData: string | null;
  /** Frequência de cada dezena. Vazio no fallback. */
  frequency: Array<{ numero: number; count: number; pct: number }>;
  hot: number[];
  warm: number[];
  cold: number[];
  /** Dezenas atrasadas (sem sair nos últimos sorteios), da mais atrasada para a menos. */
  overdue: number[];
  /** Atraso atual (sorteios seguidos sem sair) e maior atraso histórico de cada dezena. Vazio no fallback. */
  delays: Array<{ numero: number; atraso: number; maxAtraso: number }>;
  primes: number[];
  fibonacci: number[];
  patterns: {
    pairs: CoveredRange;
    pairsMode: number;
    primes: CoveredRange;
    primesMode: number;
    fibonacci: CoveredRange;
    /** Maior sequência de números seguidos (ex.: 7-8-9 = 3) tolerada e % dos concursos que a respeitam. */
    maxConsecutive: { limit: number; coverage: number };
    /** Maior quantidade de dezenas numa mesma linha do volante tolerada e % dos concursos que a respeitam. */
    rows: { limit: number; coverage: number };
    sum: {
      mean: number;
      /** p25–p75 (50% centrais). */
      ideal: [number, number];
      /** p10–p90 (80% centrais). */
      common: [number, number];
      /** p5–p95 (90% centrais). */
      wide: [number, number];
    };
    /** Média de dezenas repetidas do concurso anterior. */
    repeatedFromPrevious: number;
  };
  /** Último concurso com premiação e próximo concurso (quando disponíveis). */
  latest?: LotteryLatest;
}

/** Compatibilidade com o código da Lotofácil. */
export type LotofacilStats = LotteryStats;

// --------------------------------------------------------------------------- //
const sortedAsc = (a: number[]) => [...a].sort((x, y) => x - y);
const round1 = (n: number) => Math.round(n * 10) / 10;
const modeOf = (counts: number[]) => counts.indexOf(Math.max(...counts));

/** Menor intervalo contíguo de valores que cobre >= RANGE_COVERAGE dos concursos. */
function coveringRange(counts: number[], total: number): CoveredRange {
  let best: CoveredRange | null = null;
  for (let lo = 0; lo < counts.length; lo++) {
    let acc = 0;
    for (let hi = lo; hi < counts.length; hi++) {
      acc += counts[hi];
      if (acc / total >= RANGE_COVERAGE) {
        const cand = { min: lo, max: hi, coverage: round1((acc / total) * 100) };
        if (
          !best ||
          cand.max - cand.min < best.max - best.min ||
          (cand.max - cand.min === best.max - best.min && cand.coverage > best.coverage)
        )
          best = cand;
        break;
      }
    }
  }
  return best ?? { min: 0, max: counts.length - 1, coverage: 100 };
}

/** Menor limite superior (a partir de 1) que cobre >= RANGE_COVERAGE dos concursos. */
function upperLimit(counts: number[], total: number): { limit: number; coverage: number } {
  let acc = counts[0] ?? 0;
  for (let k = 1; k < counts.length; k++) {
    acc += counts[k];
    if (acc / total >= RANGE_COVERAGE) return { limit: k, coverage: round1((acc / total) * 100) };
  }
  return { limit: counts.length - 1, coverage: 100 };
}

export function maxRun(sorted: number[]): number {
  let best = sorted.length ? 1 : 0;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    run = sorted[i] === sorted[i - 1] + 1 ? run + 1 : 1;
    if (run > best) best = run;
  }
  return best;
}

/** Maior quantidade de dezenas numa mesma linha do volante. */
export function maxPerRow(numbers: number[], columns: number): number {
  const per = new Map<number, number>();
  let best = 0;
  for (const n of numbers) {
    const r = rowOf(n, columns);
    const c = (per.get(r) ?? 0) + 1;
    per.set(r, c);
    if (c > best) best = c;
  }
  return best;
}

export function computeStats(def: LotteryDef, draws: DrawInput[]): LotteryStats {
  const N = def.universe;
  const K = def.gameSize;
  const PRIMES = primesUpTo(N);
  const FIBONACCI = fibonacciUpTo(N);
  const valid = draws.filter((d) => d.dezenas?.length === K);
  if (valid.length === 0) return FALLBACK_STATS[def.id];
  const ordered = [...valid].sort((a, b) => a.concurso - b.concurso);
  const total = ordered.length;

  const freq = Array<number>(N + 1).fill(0);
  const pairsCnt = Array<number>(K + 1).fill(0);
  const primesCnt = Array<number>(K + 1).fill(0);
  const fibCnt = Array<number>(K + 1).fill(0);
  const runCnt = Array<number>(K + 1).fill(0);
  const rowCnt = Array<number>(K + 1).fill(0);
  const sums: number[] = [];
  let repeated = 0;
  const lastSeen = Array<number>(N + 1).fill(-1);
  const maxGap = Array<number>(N + 1).fill(0);

  ordered.forEach((d, i) => {
    const nums = sortedAsc(d.dezenas);
    nums.forEach((n) => {
      freq[n]++;
      maxGap[n] = Math.max(maxGap[n], i - lastSeen[n] - 1);
      lastSeen[n] = i;
    });
    pairsCnt[nums.filter((n) => n % 2 === 0).length]++;
    primesCnt[nums.filter((n) => PRIMES.includes(n)).length]++;
    fibCnt[nums.filter((n) => FIBONACCI.includes(n)).length]++;
    runCnt[maxRun(nums)]++;
    rowCnt[maxPerRow(nums, def.columns)]++;
    sums.push(nums.reduce((a, b) => a + b, 0));
    if (i > 0) {
      const prev = ordered[i - 1].dezenas;
      repeated += nums.filter((n) => prev.includes(n)).length;
    }
  });

  const frequency = Array.from({ length: N }, (_, i) => ({
    numero: i + 1,
    count: freq[i + 1],
    pct: round1((freq[i + 1] / total) * 100),
  }));
  // Desempate por número para o resultado ser determinístico.
  const rank = [...frequency].sort((a, b) => b.count - a.count || a.numero - b.numero).map((f) => f.numero);
  const hot = sortedAsc(rank.slice(0, def.hotSize));
  const cold = sortedAsc(rank.slice(N - def.coldSize));
  const warm = sortedAsc(rank.slice(def.hotSize, N - def.coldSize));

  const delays = Array.from({ length: N }, (_, i) => {
    const n = i + 1;
    const atraso = total - 1 - lastSeen[n];
    return { numero: n, atraso, maxAtraso: Math.max(maxGap[n], atraso) };
  });
  const byDelay = [...delays].sort((a, b) => b.atraso - a.atraso || a.numero - b.numero);
  let overdue = byDelay.filter((d) => d.atraso >= def.overdueMinDelay).map((d) => d.numero);
  if (overdue.length < def.overdueMinCount) overdue = byDelay.slice(0, def.overdueMinCount).map((d) => d.numero);
  overdue = overdue.slice(0, def.overdueMax);

  const sortedSums = sortedAsc(sums);
  const q = (p: number) => sortedSums[Math.round(p * (total - 1))];
  const last = ordered[total - 1];
  const lastDate = last.data_sorteio instanceof Date ? last.data_sorteio : new Date(last.data_sorteio);

  return {
    lottery: def.id,
    source: "database",
    totalConcursos: total,
    ultimoConcurso: last.concurso,
    ultimaData: Number.isNaN(lastDate.getTime()) ? null : lastDate.toISOString().slice(0, 10),
    frequency,
    hot,
    warm,
    cold,
    overdue,
    delays,
    primes: PRIMES,
    fibonacci: FIBONACCI,
    patterns: {
      pairs: coveringRange(pairsCnt, total),
      pairsMode: modeOf(pairsCnt),
      primes: coveringRange(primesCnt, total),
      primesMode: modeOf(primesCnt),
      fibonacci: coveringRange(fibCnt, total),
      maxConsecutive: upperLimit(runCnt, total),
      rows: upperLimit(rowCnt, total),
      sum: {
        mean: round1(sums.reduce((a, b) => a + b, 0) / total),
        ideal: [q(0.25), q(0.75)],
        common: [q(0.1), q(0.9)],
        wide: [q(0.05), q(0.95)],
      },
      repeatedFromPrevious: round1(repeated / Math.max(1, total - 1)),
    },
  };
}

/** Snapshots usados só se o banco estiver indisponível. */
export const FALLBACK_STATS: Record<LotteryId, LotteryStats> = {
  // concursos 1–3822
  lotofacil: {
    lottery: "lotofacil",
    source: "fallback",
    totalConcursos: 3822,
    ultimoConcurso: 3822,
    ultimaData: "2026-11-05",
    frequency: [],
    hot: [1, 3, 4, 5, 10, 11, 12, 13, 14, 20, 24, 25],
    warm: [2, 7, 9, 15, 18, 19, 21, 22],
    cold: [6, 8, 16, 17, 23],
    overdue: [],
    delays: [],
    primes: primesUpTo(25),
    fibonacci: fibonacciUpTo(25),
    patterns: {
      pairs: { min: 6, max: 8, coverage: 77.3 },
      pairsMode: 7,
      primes: { min: 4, max: 6, coverage: 77.3 },
      primesMode: 5,
      fibonacci: { min: 3, max: 5, coverage: 81.9 },
      maxConsecutive: { limit: 6, coverage: 87.0 },
      rows: { limit: 4, coverage: 90 },
      sum: { mean: 195.1, ideal: [183, 208], common: [172, 218], wide: [166, 224] },
      repeatedFromPrevious: 9,
    },
  },
  // concursos 1–3081
  megasena: {
    lottery: "megasena",
    source: "fallback",
    totalConcursos: 3081,
    ultimoConcurso: 3081,
    ultimaData: "2026-11-04",
    frequency: [],
    hot: [4, 5, 10, 11, 17, 27, 30, 32, 33, 35, 37, 38, 42, 43, 53],
    warm: [1, 2, 6, 8, 9, 13, 14, 16, 18, 19, 20, 23, 24, 25, 28, 29, 34, 36, 39, 40, 41, 44, 45, 46, 47, 49, 50, 51, 52, 54, 56, 57, 58, 59, 60],
    cold: [3, 7, 12, 15, 21, 22, 26, 31, 48, 55],
    overdue: [],
    delays: [],
    primes: primesUpTo(60),
    fibonacci: fibonacciUpTo(60),
    patterns: {
      pairs: { min: 2, max: 4, coverage: 79.2 },
      pairsMode: 3,
      primes: { min: 1, max: 3, coverage: 83.1 },
      primesMode: 2,
      fibonacci: { min: 0, max: 1, coverage: 79 },
      maxConsecutive: { limit: 2, coverage: 96.9 },
      rows: { limit: 3, coverage: 97 },
      sum: { mean: 183.1, ideal: [155, 211], common: [132, 234], wide: [118, 248] },
      repeatedFromPrevious: 0.6,
    },
  },
  // concursos 1–7160
  quina: {
    lottery: "quina",
    source: "fallback",
    totalConcursos: 7160,
    ultimoConcurso: 7160,
    ultimaData: "2026-11-05",
    frequency: [],
    hot: [4, 5, 9, 14, 15, 16, 18, 26, 29, 31, 33, 39, 42, 44, 49, 52, 53, 56, 61, 66],
    warm: [2, 6, 7, 8, 10, 11, 12, 13, 17, 19, 21, 22, 23, 24, 27, 28, 32, 34, 36, 37, 38, 40, 41, 43, 45, 46, 50, 51, 54, 55, 57, 59, 60, 62, 63, 64, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    cold: [1, 3, 20, 25, 30, 35, 47, 48, 58, 65, 67, 68],
    overdue: [],
    delays: [],
    primes: primesUpTo(80),
    fibonacci: fibonacciUpTo(80),
    patterns: {
      pairs: { min: 2, max: 4, coverage: 79.5 },
      pairsMode: 3,
      primes: { min: 0, max: 2, coverage: 87.6 },
      primesMode: 1,
      fibonacci: { min: 0, max: 1, coverage: 91.2 },
      maxConsecutive: { limit: 1, coverage: 76.7 },
      rows: { limit: 2, coverage: 90 },
      sum: { mean: 202, ideal: [167, 237], common: [138, 267], wide: [120, 284] },
      repeatedFromPrevious: 0.3,
    },
  },
};

// --------------------------------------------------------------------------- //
// Textos (FAQ / JSON-LD) alimentados pelas estatísticas
// --------------------------------------------------------------------------- //
const pad = (n: number) => String(n).padStart(2, "0");
const list = (ns: number[]) => ns.map(pad).join(", ");

export function formatDateBR(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function buildStatsFaq(stats: LotteryStats): Array<{ question: string; answer: string }> {
  const def = LOTTERIES[stats.lottery];
  const p = stats.patterns;
  const K = def.gameSize;
  const base = `${stats.totalConcursos.toLocaleString("pt-BR")} concursos`;
  const rowsFaq =
    def.filters.includes("rows")
      ? [
          {
            question: `O que é o filtro de linhas do volante da ${def.name}?`,
            answer:
              `O volante tem ${def.universe / def.columns} linhas de ${def.columns} dezenas (01–${pad(def.columns)}, ${def.columns + 1}–${def.columns * 2}, …). ` +
              `Em ${p.rows.coverage.toLocaleString("pt-BR")}% dos concursos nenhuma linha teve mais de ${p.rows.limit} dezenas sorteadas, por isso o gerador limita jogos concentrados numa mesma linha.`,
          },
        ]
      : [];
  return [
    {
      question: "Como funcionam as estratégias de números quentes e frios?",
      answer:
        `Números quentes são os mais sorteados em todo o histórico (${base}, até o concurso ${stats.ultimoConcurso}); ` +
        `frios são os menos sorteados. Hoje os quentes são ${list(stats.hot)} e os frios ${list(stats.cold)}. ` +
        "A diferença entre eles é pequena e cada concurso é independente: use como critério de variação, não como previsão.",
    },
    ...(stats.overdue.length > 0
      ? [
          {
            question: `O que são números atrasados na ${def.name}?`,
            answer:
              `Atrasado é o número que não sai há vários sorteios seguidos. Hoje os mais atrasados são ${stats.overdue
                .slice(0, 6)
                .map((n) => `${pad(n)} (${stats.delays.find((d) => d.numero === n)?.atraso} sorteios)`)
                .join(", ")}. ` +
              "Cada sorteio é independente: um número atrasado não tem mais chance de sair; use apenas como critério de variação.",
          },
        ]
      : []),
    {
      question: "O que significa controlar a paridade dos números?",
      answer:
        `Paridade é o equilíbrio entre pares e ímpares. Em ${p.pairs.coverage.toLocaleString("pt-BR")}% dos concursos o sorteio teve entre ${p.pairs.min} e ${p.pairs.max} números pares ` +
        `(${K - p.pairs.max} a ${K - p.pairs.min} ímpares). O gerador usa essa faixa por padrão.`,
    },
    {
      question: "Por que a soma dos números é importante?",
      answer:
        `A soma dos ${K} números sorteados tem média ${p.sum.mean.toLocaleString("pt-BR")}; metade dos concursos ficou entre ${p.sum.ideal[0]} e ${p.sum.ideal[1]} ` +
        `e 90% entre ${p.sum.wide[0]} e ${p.sum.wide[1]}. Somas muito fora dessa faixa são raras, por isso o gerador as filtra.`,
    },
    ...rowsFaq,
    {
      question: "O histórico de jogos fica salvo permanentemente?",
      answer:
        "O histórico fica salvo no seu navegador (localStorage) e permanece até você limpar os dados do navegador. Recomendamos anotar ou imprimir os jogos importantes, pois eles podem ser perdidos se os dados do navegador forem apagados.",
    },
    {
      question: "Essas estratégias garantem que vou ganhar?",
      answer:
        "Não! As loterias são jogos de sorte e nenhuma estratégia garante vitória. O gerador apenas aplica filtros baseados em padrões estatísticos históricos para criar jogos mais equilibrados, mas isso não aumenta a chance matemática de acerto.",
    },
  ];
}
