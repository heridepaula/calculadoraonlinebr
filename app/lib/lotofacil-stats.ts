/**
 * Estatísticas da Lotofácil derivadas do histórico de concursos (MongoDB).
 * Módulo puro (sem I/O): usado no servidor (loader) e pela página do gerador.
 */

export const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23];
export const FIBONACCI = [1, 2, 3, 5, 8, 13, 21];

const HOT_SIZE = 12;
const COLD_SIZE = 5;
/** Cobertura mínima (% dos concursos) usada para definir as faixas "típicas". */
const RANGE_COVERAGE = 0.75;
/** Atraso mínimo (sorteios seguidos sem sair) para uma dezena ser considerada atrasada. */
const OVERDUE_MIN = 2;
const OVERDUE_MIN_COUNT = 5;

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

export interface LotofacilStats {
  /** "database" = calculado do MongoDB; "fallback" = snapshot embutido (banco indisponível). */
  source: "database" | "fallback";
  totalConcursos: number;
  ultimoConcurso: number | null;
  /** ISO yyyy-mm-dd do último concurso. */
  ultimaData: string | null;
  /** Frequência de cada dezena (1..25). Vazio no fallback. */
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
}

// --------------------------------------------------------------------------- //
function sortedAsc(a: number[]) {
  return [...a].sort((x, y) => x - y);
}

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

const round1 = (n: number) => Math.round(n * 10) / 10;
const modeOf = (counts: number[]) => counts.indexOf(Math.max(...counts));

function maxRun(sorted: number[]): number {
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    run = sorted[i] === sorted[i - 1] + 1 ? run + 1 : 1;
    if (run > best) best = run;
  }
  return best;
}

export function computeLotofacilStats(draws: DrawInput[]): LotofacilStats {
  const valid = draws.filter((d) => d.dezenas?.length === 15);
  if (valid.length === 0) return FALLBACK_STATS;
  const ordered = [...valid].sort((a, b) => a.concurso - b.concurso);
  const total = ordered.length;

  const freq = Array<number>(26).fill(0);
  const pairsCnt = Array<number>(16).fill(0);
  const primesCnt = Array<number>(16).fill(0);
  const fibCnt = Array<number>(16).fill(0);
  const runCnt = Array<number>(16).fill(0);
  const sums: number[] = [];
  let repeated = 0;
  const lastSeen = Array<number>(26).fill(-1);
  const maxGap = Array<number>(26).fill(0);

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
    sums.push(nums.reduce((a, b) => a + b, 0));
    if (i > 0) {
      const prev = ordered[i - 1].dezenas;
      repeated += nums.filter((n) => prev.includes(n)).length;
    }
  });

  const frequency = Array.from({ length: 25 }, (_, i) => ({
    numero: i + 1,
    count: freq[i + 1],
    pct: round1((freq[i + 1] / total) * 100),
  }));
  // Desempate por número para o resultado ser determinístico.
  const rank = [...frequency].sort((a, b) => b.count - a.count || a.numero - b.numero).map((f) => f.numero);
  const hot = sortedAsc(rank.slice(0, HOT_SIZE));
  const cold = sortedAsc(rank.slice(25 - COLD_SIZE));
  const warm = sortedAsc(rank.slice(HOT_SIZE, 25 - COLD_SIZE));

  const delays = Array.from({ length: 25 }, (_, i) => {
    const n = i + 1;
    const atraso = total - 1 - lastSeen[n];
    return { numero: n, atraso, maxAtraso: Math.max(maxGap[n], atraso) };
  });
  const byDelay = [...delays].sort((a, b) => b.atraso - a.atraso || a.numero - b.numero);
  let overdue = byDelay.filter((d) => d.atraso >= OVERDUE_MIN).map((d) => d.numero);
  if (overdue.length < OVERDUE_MIN_COUNT) overdue = byDelay.slice(0, OVERDUE_MIN_COUNT).map((d) => d.numero);

  // menor limite de sequência que cobre >= RANGE_COVERAGE dos concursos
  let acc = 0;
  let runLimit = 15;
  for (let k = 1; k <= 15; k++) {
    acc += runCnt[k];
    if (acc / total >= RANGE_COVERAGE) {
      runLimit = k;
      break;
    }
  }
  const runCoverage = round1((runCnt.slice(0, runLimit + 1).reduce((a, b) => a + b, 0) / total) * 100);

  const sortedSums = sortedAsc(sums);
  const q = (p: number) => sortedSums[Math.round(p * (total - 1))];
  const last = ordered[total - 1];
  const lastDate = last.data_sorteio instanceof Date ? last.data_sorteio : new Date(last.data_sorteio);

  return {
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
      maxConsecutive: { limit: runLimit, coverage: runCoverage },
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

/** Snapshot (concursos 1–3822) usado só se o banco estiver indisponível. */
export const FALLBACK_STATS: LotofacilStats = {
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
  primes: PRIMES,
  fibonacci: FIBONACCI,
  patterns: {
    pairs: { min: 6, max: 8, coverage: 77.3 },
    pairsMode: 7,
    primes: { min: 4, max: 6, coverage: 77.3 },
    primesMode: 5,
    fibonacci: { min: 3, max: 5, coverage: 81.9 },
    maxConsecutive: { limit: 6, coverage: 87.0 },
    sum: { mean: 195.1, ideal: [183, 208], common: [172, 218], wide: [166, 224] },
    repeatedFromPrevious: 9,
  },
};

// --------------------------------------------------------------------------- //
// Estratégias de geração (derivadas das estatísticas)
// --------------------------------------------------------------------------- //
export interface GenerationStrategy {
  useFrequency: boolean;
  frequencyType: "hot" | "balanced" | "cold";
  /** Inclui no jogo dezenas atrasadas (sem sair há mais sorteios), combinável com qualquer estratégia. */
  prioritizeOverdue: boolean;
  controlParity: boolean;
  minPairs: number;
  maxPairs: number;
  controlSum: boolean;
  minSum: number;
  maxSum: number;
  avoidConsecutive: boolean;
  maxConsecutive: number;
  includePrimes: boolean;
  minPrimes: number;
  maxPrimes: number;
  includeFibonacci: boolean;
  minFib: number;
  maxFib: number;
}

export interface StrategyPreset {
  name: string;
  icon: string;
  description: string;
  config: GenerationStrategy;
}

const pad = (n: number) => String(n).padStart(2, "0");
const list = (ns: number[]) => ns.map(pad).join(", ");

export function buildPresets(stats: LotofacilStats): StrategyPreset[] {
  const p = stats.patterns;
  const base: GenerationStrategy = {
    useFrequency: false,
    frequencyType: "balanced",
    prioritizeOverdue: false,
    controlParity: true,
    minPairs: p.pairs.min,
    maxPairs: p.pairs.max,
    controlSum: true,
    minSum: p.sum.ideal[0],
    maxSum: p.sum.ideal[1],
    avoidConsecutive: true,
    maxConsecutive: p.maxConsecutive.limit,
    includePrimes: false,
    minPrimes: 0,
    maxPrimes: 9,
    includeFibonacci: false,
    minFib: 0,
    maxFib: 7,
  };
  const mode = p.pairsMode;

  return [
    {
      name: "Equilibrado",
      icon: "🍀",
      description: "Mix de quentes e médios com filtros nas faixas mais comuns do histórico — recomendado",
      config: { ...base, useFrequency: true, includePrimes: true, minPrimes: p.primes.min, maxPrimes: p.primes.max },
    },
    {
      name: "Só Quentes",
      icon: "🔥",
      description: `Prioriza os mais sorteados: ${list(stats.hot)}`,
      config: { ...base, useFrequency: true, frequencyType: "hot", minSum: p.sum.common[0], maxSum: p.sum.common[1] },
    },
    {
      name: "Revanche",
      icon: "🧊",
      description: `Números menos sorteados (${list(stats.cold)}) — teoria da revanche estatística`,
      config: {
        ...base,
        useFrequency: true,
        frequencyType: "cold",
        controlParity: false,
        minPairs: 0,
        maxPairs: 15,
        controlSum: false,
        minSum: 120,
        maxSum: 250,
        avoidConsecutive: false,
        maxConsecutive: 15,
      },
    },
    ...(stats.overdue.length > 0
      ? [
          {
            name: "Atrasados",
            icon: "⏳",
            description: `Prioriza as dezenas que não saem há mais sorteios (${list(stats.overdue)})`,
            config: { ...base, useFrequency: true, prioritizeOverdue: true, minSum: p.sum.common[0], maxSum: p.sum.common[1] },
          },
        ]
      : []),
    {
      name: "Alta Soma",
      icon: "⬆️",
      description: `Concentra os 15 números na faixa alta (soma ${p.sum.ideal[1]}–${p.sum.wide[1]})`,
      config: { ...base, minSum: p.sum.ideal[1], maxSum: p.sum.wide[1] },
    },
    {
      name: "Baixa Soma",
      icon: "⬇️",
      description: `Concentra os 15 números na faixa baixa (soma ${p.sum.wide[0]}–${p.sum.ideal[0]})`,
      config: { ...base, minSum: p.sum.wide[0], maxSum: p.sum.ideal[0] },
    },
    {
      name: "Mais Ímpares",
      icon: "1️⃣",
      description: `Favorece ímpares no jogo (${Math.max(0, mode - 2)}–${mode} pares de 15 números)`,
      config: { ...base, useFrequency: true, minPairs: Math.max(0, mode - 2), maxPairs: mode, minSum: p.sum.common[0], maxSum: p.sum.common[1] },
    },
    {
      name: "Máx. Primos",
      icon: "🔢",
      description: `Maximiza primos (${list(stats.primes)}) — ${p.primesMode} a ${p.primesMode + 2} primos no jogo`,
      config: {
        ...base,
        useFrequency: true,
        controlParity: false,
        minPairs: 0,
        maxPairs: 15,
        minSum: p.sum.common[0],
        maxSum: p.sum.common[1],
        includePrimes: true,
        minPrimes: p.primesMode,
        maxPrimes: Math.min(9, p.primesMode + 2),
      },
    },
    {
      name: "Fibonacci",
      icon: "🌀",
      description: `Inclui ${p.fibonacci.min} a ${p.fibonacci.max} números da sequência de Fibonacci (${list(stats.fibonacci)})`,
      config: { ...base, minSum: p.sum.common[0], maxSum: p.sum.common[1], includeFibonacci: true, minFib: p.fibonacci.min, maxFib: p.fibonacci.max },
    },
    {
      name: "Puro Aleatório",
      icon: "🎲",
      description: "Sem filtros — seleção totalmente aleatória de 15 números entre 1 e 25",
      config: {
        ...base,
        controlParity: false,
        minPairs: 0,
        maxPairs: 15,
        controlSum: false,
        minSum: 120,
        maxSum: 250,
        avoidConsecutive: false,
        maxConsecutive: 15,
      },
    },
  ];
}

export function mergePresetsConfig(
  presetNames: string[],
  presets: StrategyPreset[],
  fallback: GenerationStrategy
): GenerationStrategy {
  const selected = presetNames
    .map((name) => presets.find((p) => p.name === name)?.config)
    .filter((c): c is GenerationStrategy => Boolean(c));
  if (selected.length === 0) return fallback;
  if (selected.length === 1) return selected[0];
  return {
    useFrequency: selected.some((c) => c.useFrequency),
    frequencyType:
      selected.find((c) => c.frequencyType === "hot")?.frequencyType ??
      selected.find((c) => c.frequencyType === "cold")?.frequencyType ??
      "balanced",
    prioritizeOverdue: selected.some((c) => c.prioritizeOverdue),
    controlParity: selected.some((c) => c.controlParity),
    minPairs: Math.max(...selected.map((c) => c.minPairs)),
    maxPairs: Math.min(...selected.map((c) => c.maxPairs)),
    controlSum: selected.some((c) => c.controlSum),
    minSum: Math.max(...selected.map((c) => c.minSum)),
    maxSum: Math.min(...selected.map((c) => c.maxSum)),
    avoidConsecutive: selected.some((c) => c.avoidConsecutive),
    maxConsecutive: Math.min(...selected.map((c) => c.maxConsecutive)),
    includePrimes: selected.some((c) => c.includePrimes),
    minPrimes: Math.max(...selected.map((c) => c.minPrimes)),
    maxPrimes: Math.min(...selected.map((c) => c.maxPrimes)),
    includeFibonacci: selected.some((c) => c.includeFibonacci),
    minFib: Math.max(...selected.map((c) => c.minFib)),
    maxFib: Math.min(...selected.map((c) => c.maxFib)),
  };
}

// --------------------------------------------------------------------------- //
// Textos (FAQ / JSON-LD) alimentados pelas estatísticas
// --------------------------------------------------------------------------- //
export function formatDateBR(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function buildStatsFaq(stats: LotofacilStats): Array<{ question: string; answer: string }> {
  const p = stats.patterns;
  const base = `${stats.totalConcursos.toLocaleString("pt-BR")} concursos`;
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
            question: "O que são números atrasados na Lotofácil?",
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
        `(${15 - p.pairs.max} a ${15 - p.pairs.min} ímpares). O gerador usa essa faixa por padrão.`,
    },
    {
      question: "Por que a soma dos números é importante?",
      answer:
        `A soma dos 15 números sorteados tem média ${p.sum.mean.toLocaleString("pt-BR")}; metade dos concursos ficou entre ${p.sum.ideal[0]} e ${p.sum.ideal[1]} ` +
        `e 90% entre ${p.sum.wide[0]} e ${p.sum.wide[1]}. Somas muito fora dessa faixa são raras, por isso o gerador as filtra.`,
    },
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
