import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Checkbox } from "~/components/ui";
import { useCalculatorScroll } from "~/components/calculators/betting-shared";
import type { LotofacilStats } from "~/lib/lotofacil-stats";
import {
  MAX_FIXED,
  MIX_PRESETS,
  NUMBERS,
  checkGame,
  defaultConfig,
  describeConfig,
  estimateAcceptance,
  findConflicts,
  gameKey,
  gameStatistics,
  generateGame,
  normalizedMix,
  pureRandomConfig,
  randomStrategyConfig,
  strategyBadges,
  sumRangeFor,
  type GameCheck,
  type GameStatistics,
  type GeneratorConfig,
  type MixKey,
  type RangeFilter,
  type StrategyBadge,
  type SumMode,
} from "~/lib/lotofacil-generator";

const HISTORY_KEY = "lotofacil-history";
const HISTORY_LIMIT = 50;

interface SavedGame {
  id: string;
  numbers: number[];
  fixed?: number[];
  strategy: string;
  /** Um badge por regra usada (jogos antigos não têm). */
  badges?: StrategyBadge[];
  /** Maior nº de dezenas em comum com um jogo anterior do histórico. */
  overlap?: number;
  date: string;
  /** Jogos antigos do histórico têm só parte destes campos. */
  statistics: Partial<GameStatistics> & { pairs: number; odds: number; sum: number };
  checks?: GameCheck[];
}

type Result = { kind: "game"; game: SavedGame } | { kind: "error"; message: string } | null;

const pad = (n: number) => n.toString().padStart(2, "0");

function readHistory(): SavedGame[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(games: SavedGame[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(games));
  } catch {
    /* armazenamento indisponível (aba anônima, cota): o histórico vale só nesta visita */
  }
}

// --------------------------------------------------------------------------- //
// Peças da interface
// --------------------------------------------------------------------------- //
function Chip({ active, onClick, children, label, compact }: { compact?: boolean; active: boolean; onClick: () => void; children: React.ReactNode; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`flex min-h-[44px] items-center gap-1 rounded-lg border ${compact ? "px-2 text-xs" : "px-2.5 text-sm"} py-1.5 font-medium transition-colors ${
        active
          ? "border-pink-400 bg-pink-500/20 text-pink-100 ring-1 ring-pink-400/60"
          : "border-neutral-surface-variant bg-background-primary text-text-primary hover:border-pink-400"
      }`}
    >
      {children}
    </button>
  );
}

function RangeSelect({
  id,
  value,
  min,
  max,
  onChange,
  label,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <select
      id={id}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className="min-h-[44px] rounded-lg border border-neutral-surface-variant bg-background-primary px-2 text-sm text-text-primary"
    >
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
}

function CountFilter({
  id,
  title,
  hint,
  filter,
  bounds,
  onChange,
}: {
  id: string;
  title: string;
  hint: string;
  filter: RangeFilter;
  bounds: [number, number];
  onChange: (f: RangeFilter) => void;
}) {
  return (
    <div className="flex min-h-[44px] flex-wrap items-center gap-x-2 gap-y-1">
      <Checkbox
        checked={filter.enabled}
        onChange={(e) => onChange({ ...filter, enabled: e.target.checked })}
        label={title}
        labelClassName="font-medium"
      />
      {filter.enabled && (
        <span className="flex items-center gap-1 text-sm text-text-secondary">
          <RangeSelect
            id={`${id}-min`}
            label={`${title}: mínimo`}
            value={filter.min}
            min={bounds[0]}
            max={bounds[1]}
            // mínimo acima do máximo arrasta o máximo junto: a faixa nunca fica invertida
            onChange={(v) => onChange({ ...filter, min: v, max: Math.max(v, filter.max) })}
          />
          <span>a</span>
          <RangeSelect
            id={`${id}-max`}
            label={`${title}: máximo`}
            value={filter.max}
            min={bounds[0]}
            max={bounds[1]}
            onChange={(v) => onChange({ ...filter, max: v, min: Math.min(v, filter.min) })}
          />
        </span>
      )}
      <span className="text-xs text-text-secondary">{hint}</span>
    </div>
  );
}

// --------------------------------------------------------------------------- //
export function LotofacilGenerator({ stats }: { stats: LotofacilStats }) {
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();
  const [config, setConfig] = useState<GeneratorConfig>(() => defaultConfig(stats));
  const [showMix, setShowMix] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [history, setHistory] = useState<SavedGame[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => setHistory(readHistory()), []);

  const p = stats.patterns;
  const filterChips = [
    { key: "parity", name: "Pares", on: config.parity.enabled, range: `${config.parity.min}–${config.parity.max}`, toggle: () => update({ parity: { ...config.parity, enabled: !config.parity.enabled } }) },
    { key: "primes", name: "Primos", on: config.primes.enabled, range: `${config.primes.min}–${config.primes.max}`, toggle: () => update({ primes: { ...config.primes, enabled: !config.primes.enabled } }) },
    { key: "fibonacci", name: "Fibonacci", on: config.fibonacci.enabled, range: `${config.fibonacci.min}–${config.fibonacci.max}`, toggle: () => update({ fibonacci: { ...config.fibonacci, enabled: !config.fibonacci.enabled } }) },
    { key: "consecutive", name: "Seguidos", on: config.consecutive.enabled, range: `≤${config.consecutive.max}`, toggle: () => update({ consecutive: { ...config.consecutive, enabled: !config.consecutive.enabled } }) },
  ];
  const conflicts = useMemo(() => findConflicts(config, stats), [config, stats]);
  const acceptance = useMemo(() => estimateAcceptance(config, stats), [config, stats]);
  const mix = normalizedMix(config.weights, stats);
  const activeMix = MIX_PRESETS.find((m) => (Object.keys(m.weights) as MixKey[]).every((k) => m.weights[k] === config.weights[k]));
  const mixPresets = MIX_PRESETS.filter((m) => m.id !== "atrasados" || stats.overdue.length > 0);
  const resultNumbers = result?.kind === "game" ? result.game.numbers : [];

  /** Qualquer mudança na estratégia descarta o jogo exibido (ele foi gerado com outras regras). */
  const update = (patch: Partial<GeneratorConfig>) => {
    setConfig((c) => ({ ...c, ...patch }));
    setResult(null);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(
      () => showToast("Copiado! ✓"),
      () => showToast("Não foi possível copiar")
    );
  };

  const toggleFixed = (n: number) => {
    const fixed = config.fixed.includes(n)
      ? config.fixed.filter((x) => x !== n)
      : config.fixed.length < MAX_FIXED
        ? [...config.fixed, n].sort((a, b) => a - b)
        : config.fixed;
    update({ fixed });
  };

  const saveGame = (game: SavedGame) =>
    setHistory((prev) => {
      const next = [game, ...prev].slice(0, HISTORY_LIMIT);
      writeHistory(next);
      return next;
    });

  /** Gera um jogo com a estratégia dada. `surprise`: estratégia sorteada pela Surpresinha. */
  const run = (cfg: GeneratorConfig, surprise: boolean) => {
    const avoid = new Set(history.map((g) => gameKey(g.numbers)));
    const r = generateGame(cfg, stats, { avoid, history: history.map((g) => g.numbers) });
    if (r.ok) {
      const game: SavedGame = {
        id: `${Date.now()}`,
        numbers: r.numbers,
        fixed: cfg.fixed,
        strategy: (surprise ? "Surpresinha: " : "") + describeConfig(cfg, stats),
        badges: strategyBadges(cfg, stats, { surpresinha: surprise }),
        overlap: history.length ? r.maxOverlap : undefined,
        date: new Date().toLocaleString("pt-BR"),
        statistics: gameStatistics(r.numbers, stats),
        checks: checkGame(r.numbers, cfg, stats),
      };
      setResult({ kind: "game", game });
      saveGame(game);
    } else {
      setResult({ kind: "error", message: r.error });
    }
    scrollTo(resultRef);
  };

  /** Gerar jogo: usa a estratégia escolhida acima. */
  const gerar = () => run(config, false);
  /** Surpresinha: sorteia a estratégia (mantém só os números fixos da cartela). */
  const surpresinha = () => run(randomStrategyConfig(stats, config.fixed), true);

  const limpar = () => {
    update({ fixed: [] });
    scrollTo(inputsRef);
  };

  const removeFromHistory = (id: string) =>
    setHistory((prev) => {
      const next = prev.filter((g) => g.id !== id);
      writeHistory(next);
      return next;
    });

  const clearHistory = () => {
    if (!window.confirm("Apagar todo o histórico? Esta ação não pode ser desfeita.")) return;
    setHistory([]);
    writeHistory([]);
  };

  const printGame = (game: SavedGame) => {
    const s = game.statistics;
    const text = `LOTOFÁCIL - NÚMEROS DA SORTE\nData: ${game.date}\n\nNúmeros: ${game.numbers.map(pad).join(", ")}\n\nPares: ${s.pairs} · Ímpares: ${s.odds} · Soma: ${s.sum}\nEstratégia: ${game.strategy}\n\nGerado por: CalculadoraOnlineBR.com.br`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<pre>${text}</pre>`);
    w.print();
    w.close();
  };

  const sumModes: Array<{ mode: SumMode; label: string }> = [
    { mode: "low", label: "Baixa" },
    { mode: "ideal", label: "Ideal" },
    { mode: "high", label: "Alta" },
    { mode: "free", label: "Livre" },
  ];
  const mixLabels: Record<MixKey, string> = { hot: "🔥 Quentes", cold: "🧊 Frios", overdue: "⏳ Atrasados", random: "🎲 Aleatório" };
  const blocked = conflicts.length > 0;

  return (
    <>
      <Card padding="none" className="-mx-2 max-w-5xl p-2 sm:mx-auto sm:p-4 lg:p-5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span aria-hidden>🎰</span>
            Gerador Inteligente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 lg:grid lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start lg:gap-6 lg:space-y-0">
          {/* ===== Estratégia (acima da cartela; ao lado dela no desktop) ===== */}
          <div ref={inputsRef} className="scroll-mt-4 space-y-3">
            {/* 1. Origem dos números */}
            <section aria-labelledby="mix-title">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <h3 id="mix-title" className="text-sm font-semibold">1. Origem dos números</h3>
                <button type="button" onClick={() => setShowMix((v) => !v)} className="text-xs text-primary-blue hover:underline" aria-expanded={showMix}>
                  {showMix ? "Ocultar %" : `Ajustar %${activeMix ? "" : " (personalizada)"}`}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mixPresets.map((m) => (
                  <Chip key={m.id} active={activeMix?.id === m.id} onClick={() => update({ weights: { ...m.weights } })}>
                    <span aria-hidden>{m.icon}</span> {m.label}
                  </Chip>
                ))}
              </div>
              {showMix && (
                <div className="mt-2 grid grid-cols-1 gap-2 rounded-lg border border-neutral-surface-variant p-3 sm:grid-cols-2">
                  {(Object.keys(mixLabels) as MixKey[])
                    .filter((k) => k !== "overdue" || stats.overdue.length > 0)
                    .map((k) => (
                      <div key={k} className="block text-sm">
                        <span className="flex justify-between">
                          <span id={`mix-${k}-label`}>{mixLabels[k]}</span>
                          <strong>{mix[k]}%</strong>
                        </span>
                        <input
                          type="range"
                          aria-labelledby={`mix-${k}-label`}
                          aria-valuetext={`${mix[k]}%`}
                          min={0}
                          max={100}
                          step={5}
                          value={config.weights[k]}
                          onChange={(e) => update({ weights: { ...config.weights, [k]: parseInt(e.target.value, 10) } })}
                          className="mt-1 w-full accent-pink-500"
                        />
                      </div>
                    ))}
                  <p className="text-xs text-text-secondary sm:col-span-2">
                    Pesos proporcionais: a porcentagem é a parte de cada origem no sorteio das dezenas.
                  </p>
                </div>
              )}
            </section>

            {/* 2. Faixa de soma (exclusiva) */}
            <section aria-labelledby="sum-title">
              <h3 id="sum-title" className="mb-1.5 text-sm font-semibold">
                2. Soma das 15 dezenas{" "}
                <span className="font-normal text-text-secondary">(média {p.sum.mean.toLocaleString("pt-BR")})</span>
              </h3>
              <div role="radiogroup" aria-labelledby="sum-title" className="grid grid-cols-4 !gap-1.5">
                {sumModes.map(({ mode, label }) => {
                  const range = sumRangeFor(mode, stats);
                  const active = config.sumMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => update({ sumMode: mode })}
                      className={`min-h-[44px] rounded-lg border px-1 py-1 text-sm leading-tight transition-colors ${
                        active
                          ? "border-pink-400 bg-pink-500/20 text-pink-100 ring-1 ring-pink-400/60"
                          : "border-neutral-surface-variant bg-background-primary text-text-primary hover:border-pink-400"
                      }`}
                    >
                      <span className="block font-semibold">{label}</span>
                      <span className="block text-[11px] opacity-80">{range ? `${range[0]}–${range[1]}` : "qualquer"}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. Filtros combináveis */}
            <section aria-labelledby="filters-title">
              <div className="flex items-center justify-between gap-2">
                <h3 id="filters-title" className="text-sm font-semibold">
                  3. Filtros
                </h3>
                <div className="flex gap-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowFilters((v) => !v)}
                    aria-expanded={showFilters}
                    aria-controls="filters-panel"
                    className="min-h-[44px] px-2 text-primary-blue hover:underline"
                  >
                    ⚙ Faixas {showFilters ? "▴" : "▾"}
                  </button>
                  <button
                    type="button"
                    onClick={() => update({ ...defaultConfig(stats), fixed: config.fixed })}
                    className="min-h-[44px] px-2 text-primary-blue hover:underline"
                  >
                    ↺ Padrão
                  </button>
                  <button
                    type="button"
                    onClick={() => update(pureRandomConfig(stats, config.fixed))}
                    className="min-h-[44px] px-2 text-primary-blue hover:underline"
                  >
                    Sem filtros
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap !gap-1.5" role="group" aria-labelledby="filters-title">
                {filterChips.map((c) => (
                  <Chip key={c.key} compact active={c.on} onClick={c.toggle} label={`${c.name}: ${c.on ? "ligado, " : "desligado, "}${c.range}`}>
                    <span aria-hidden>{c.on ? "✓" : "+"}</span> {c.name} <span className="font-normal opacity-80">{c.range}</span>
                  </Chip>
                ))}
              </div>
              {showFilters && (
                <div id="filters-panel" className="mt-1 grid grid-cols-1 !gap-x-4 !gap-y-0 rounded-lg border border-neutral-surface-variant px-3 py-1 sm:grid-cols-2">
                  <CountFilter
                    id="parity"
                    title="Pares"
                    filter={config.parity}
                    bounds={[2, 12]}
                    hint={`comum ${p.pairs.min}–${p.pairs.max}`}
                    onChange={(parity) => update({ parity })}
                  />
                  <CountFilter
                    id="primes"
                    title="Primos"
                    filter={config.primes}
                    bounds={[0, stats.primes.length]}
                    hint={`comum ${p.primes.min}–${p.primes.max}`}
                    onChange={(primes) => update({ primes })}
                  />
                  <CountFilter
                    id="fib"
                    title="Fibonacci"
                    filter={config.fibonacci}
                    bounds={[0, stats.fibonacci.length]}
                    hint={`comum ${p.fibonacci.min}–${p.fibonacci.max}`}
                    onChange={(fibonacci) => update({ fibonacci })}
                  />
                  <div className="flex min-h-[44px] flex-wrap items-center gap-x-2 gap-y-1">
                    <Checkbox
                      checked={config.consecutive.enabled}
                      onChange={(e) => update({ consecutive: { ...config.consecutive, enabled: e.target.checked } })}
                      label="Seguidos até"
                      labelClassName="font-medium"
                    />
                    {config.consecutive.enabled && (
                      <RangeSelect
                        id="consecutive-max"
                        label="Sequência máxima de números seguidos"
                        value={config.consecutive.max}
                        min={2}
                        max={15}
                        onChange={(max) => update({ consecutive: { ...config.consecutive, max } })}
                      />
                    )}
                    <span className="text-xs text-text-secondary">comum até {p.maxConsecutive.limit}</span>
                  </div>
                  <p className="!mb-0 pb-2 text-xs text-text-secondary sm:col-span-2">
                    Fibonacci: {stats.fibonacci.map(pad).join(", ")} · Seguidos: 07-08-09 = 3. &quot;Comum&quot; = faixa de pelo menos 75% dos concursos.
                  </p>
                </div>
              )}
            </section>

            {/* Resumo + viabilidade */}
            <div
              className={`rounded-lg border px-3 py-2 text-xs ${
                blocked ? "border-system-error bg-system-error/10" : "border-neutral-surface-variant bg-background-secondary"
              }`}
              aria-live="polite"
            >
              <p className="!mb-0 text-text-primary">
                <strong>Regras:</strong> {describeConfig(config, stats)}
              </p>
              {blocked ? (
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-system-error-dark">
                  {conflicts.map((c) => (
                    <li key={c.message}>{c.message}</li>
                  ))}
                </ul>
              ) : (
                <p className={`!mb-0 mt-1 text-xs ${acceptance < 1 ? "text-system-warning-dark" : "text-text-secondary"}`}>
                  {acceptance < 1
                    ? "⚠️ Filtros muito restritos: poucas combinações atendem a todos. Se o Gerar jogo não encontrar um jogo, afrouxe algum filtro."
                    : `≈ ${acceptance.toLocaleString("pt-BR", { maximumFractionDigits: acceptance < 10 ? 1 : 0 })}% das combinações sorteadas atendem a todas as regras.`}
                </p>
              )}
            </div>
          </div>

          {/* ===== Cartela ===== */}
          <div>
            <h3 className="text-center text-base font-semibold">🍀 Cartela da Lotofácil</h3>
            <p className="!mb-2 text-center text-xs text-text-secondary">
              Toque para <strong>fixar</strong> números (opcional).
            </p>
            <div className="mx-auto max-w-lg rounded-xl border-4 border-pink-600 bg-gradient-to-b from-white to-pink-50 p-2 shadow-2xl sm:p-4">
              <div className="mb-1.5 grid grid-cols-5 place-items-center !gap-1.5 rounded-lg bg-white p-2 shadow-inner sm:p-3">
                {NUMBERS.map((n) => {
                  const isFixed = config.fixed.includes(n);
                  const inGame = resultNumbers.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleFixed(n)}
                      aria-pressed={isFixed}
                      aria-label={`Número ${pad(n)}${isFixed ? ", fixo" : ""}${inGame ? ", no jogo gerado" : ""}`}
                      className={`relative h-11 w-full min-w-0 rounded-md border text-sm font-bold transition-colors sm:h-12 sm:w-12 sm:border-2 ${
                        isFixed
                          ? "border-pink-700 bg-pink-600 text-white shadow-md"
                          : inGame
                            ? "border-pink-500 bg-pink-100 text-pink-900"
                            : "border-gray-300 bg-white text-gray-800 hover:border-pink-400 hover:bg-pink-50"
                      }`}
                    >
                      {pad(n)}
                      {isFixed && <span className="absolute right-0.5 top-0 text-[10px]" aria-hidden>📌</span>}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-pink-800">
                <span>
                  Fixos: <strong>{config.fixed.length}</strong>/{MAX_FIXED}
                </span>
                {resultNumbers.length > 0 && <span>Rosa claro = jogo gerado</span>}
              </div>
            </div>

            <div className="mt-2 flex items-stretch gap-2">
              <button
                type="button"
                onClick={gerar}
                disabled={blocked}
                className="min-h-[52px] flex-[2] rounded-lg bg-pink-600 px-3 text-base font-bold text-white shadow-lg ring-2 ring-pink-300/40 transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✨ Gerar jogo
              </button>
              <button
                type="button"
                onClick={surpresinha}
                className="min-h-[52px] flex-1 rounded-lg border border-pink-500 px-2 text-sm font-semibold text-pink-300 transition-colors hover:bg-pink-600/20"
              >
                🎲 Surpresinha
              </button>
              <button
                type="button"
                onClick={limpar}
                className="min-h-[52px] rounded-lg border border-neutral-surface-variant px-3 text-sm font-semibold text-text-primary hover:bg-background-secondary"
              >
                Limpar
              </button>
            </div>
            {blocked && <p className="mt-2 text-center text-xs text-system-error-dark">Corrija as regras da estratégia para usar &quot;Gerar jogo&quot;. A Surpresinha continua disponível.</p>}
          </div>
        </CardContent>
      </Card>

      {/* ===== Resultado ===== */}
      <div ref={resultRef} className="mx-auto max-w-lg scroll-mt-4">
        {result?.kind === "error" && (
          <div role="alert" className="rounded-xl border border-system-error bg-system-error/10 p-4 text-sm text-text-primary">
            <p className="font-semibold text-system-error-dark">Não foi possível gerar o jogo</p>
            <p className="mt-1">{result.message}</p>
          </div>
        )}
        {result?.kind === "game" && <GameReceipt game={result.game} onCopy={copy} onPrint={printGame} onAgain={gerar} onSurprise={surpresinha} />}
      </div>

      {/* ===== Histórico ===== */}
      {history.length > 0 && (
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>💾 Histórico ({history.length})</CardTitle>
              <button type="button" onClick={clearHistory} className="min-h-[44px] rounded-md px-3 text-sm text-system-error-dark hover:underline">
                Apagar tudo
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-xs text-text-secondary">
              Salvo só neste navegador (até {HISTORY_LIMIT} jogos). Cada novo jogo é escolhido para repetir o mínimo possível de dezenas dos jogos daqui. Passe o mouse (ou toque) nos badges para ver a estratégia.
            </p>
            <ul className="space-y-3">
              {history.slice(0, 10).map((g) => (
                <li key={g.id} className="rounded-lg border border-neutral-surface-variant bg-background-primary p-3">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2 text-xs text-text-secondary">
                    {g.badges?.length ? <BadgeList badges={g.badges} /> : <span className="font-medium text-text-primary">{g.strategy}</span>}
                    <span>{g.date}</span>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {g.numbers.map((n) => (
                      <span key={n} className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-900">
                        {pad(n)}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        update({ fixed: [...g.numbers] });
                        scrollTo(inputsRef);
                      }}
                      className="min-h-[36px] rounded border border-neutral-surface-variant px-2 text-text-primary hover:border-pink-400"
                    >
                      📌 Fixar na cartela
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(`Lotofácil: ${g.numbers.map(pad).join(", ")} — ${g.strategy} — ${g.date}`)}
                      className="min-h-[36px] rounded border border-neutral-surface-variant px-2 text-text-primary hover:border-pink-400"
                    >
                      📋 Copiar
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromHistory(g.id)}
                      className="min-h-[36px] rounded border border-neutral-surface-variant px-2 text-system-error-dark hover:border-system-error"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {history.length > 10 && (
              <button
                type="button"
                onClick={() => copy(history.map((g, i) => `${i + 1}. ${g.numbers.map(pad).join(", ")} — ${g.strategy} — ${g.date}`).join("\n"))}
                className="mt-3 text-sm text-primary-blue hover:underline"
              >
                📋 Copiar todos os {history.length} jogos
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {toast && (
        <div role="status" className="fixed bottom-6 right-6 z-50 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          {toast}
        </div>
      )}
    </>
  );
}

// --------------------------------------------------------------------------- //
/** Badges de estratégia; o nome completo aparece no hover (title) e no foco/toque (tooltip). */
function BadgeList({ badges }: { badges: StrategyBadge[] }) {
  return (
    <ul className="flex flex-wrap gap-1" aria-label="Estratégias usadas no jogo">
      {badges.map((b) => (
        <li key={b.id} className="group relative">
          <button
            type="button"
            title={b.name}
            aria-label={b.name}
            className="inline-flex cursor-help items-center gap-1 rounded-full border border-pink-500/40 bg-pink-600/15 px-2 py-0.5 text-[11px] font-medium text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <span aria-hidden>{b.icon}</span>
            {b.text}
          </button>
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 hidden w-max max-w-[16rem] -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-center text-xs text-white shadow-lg group-focus-within:block group-hover:block"
          >
            {b.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

// --------------------------------------------------------------------------- //
function GameReceipt({
  game,
  onCopy,
  onPrint,
  onAgain,
  onSurprise,
}: {
  game: SavedGame;
  onCopy: (t: string) => void;
  onPrint: (g: SavedGame) => void;
  onAgain: () => void;
  onSurprise: () => void;
}) {
  const s = game.statistics;
  const items: Array<[string, number | undefined]> = [
    ["Pares", s.pairs],
    ["Ímpares", s.odds],
    ["Soma", s.sum],
    ["Primos", s.primes],
    ["Fibonacci", s.fibonacci],
    ["Seguidos", s.maxRun],
    ["🔥 Quentes", s.hotNumbers],
    ["🧊 Frios", s.coldNumbers],
    ["⏳ Atrasados", s.overdueNumbers],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-pink-500/30 bg-background-secondary shadow-xl">
      <div className="border-b border-pink-500/20 bg-pink-600/10 px-6 py-4 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-pink-300">🍀 Lotofácil — Seu jogo</div>
        <div className="mt-1 text-xs text-text-secondary">{game.date}</div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 px-4 py-4 sm:gap-2 sm:px-6 sm:py-5">
        {game.numbers.map((n) => (
          <div
            key={n}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg sm:h-11 sm:w-11 sm:text-base ${
              game.fixed?.includes(n) ? "bg-pink-800 ring-2 ring-pink-200" : "bg-pink-600"
            }`}
            title={game.fixed?.includes(n) ? "Número fixado por você" : undefined}
          >
            {pad(n)}
          </div>
        ))}
      </div>
      {!!game.fixed?.length && <p className="-mt-2 pb-3 text-center text-xs text-text-secondary">Contorno claro = número fixado por você</p>}

      <div className="grid grid-cols-3 gap-px border-t border-pink-500/20 bg-pink-500/10">
        {items
          .filter(([, v]) => v !== undefined)
          .map(([label, v]) => (
            <div key={label} className="flex flex-col items-center bg-background-secondary px-2 py-3">
              <span className="text-base font-bold text-text-primary sm:text-lg">{v}</span>
              <span className="text-[11px] text-text-secondary sm:text-xs">{label}</span>
            </div>
          ))}
      </div>

      {!!game.checks?.length && (
        <ul className="flex flex-wrap justify-center gap-2 border-t border-pink-500/20 px-4 py-3 text-xs" aria-label="Regras aplicadas">
          {game.checks.map((c) => (
            <li
              key={c.key}
              className={`rounded-full px-2 py-1 ${c.ok ? "bg-system-success/15 text-system-success-dark" : "bg-system-error/15 text-system-error-dark"}`}
            >
              {c.ok ? "✓" : "✗"} {c.label} {c.value} <span className="opacity-75">({c.rule})</span>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-pink-500/20 px-6 py-3 text-center text-xs text-text-secondary">
        {game.overlap !== undefined && (
          <p className="!mb-2">Máximo de <strong className="text-pink-300">{game.overlap}</strong> dezenas em comum com seus jogos anteriores.</p>
        )}
        <span>Estratégia: </span>
        {game.badges?.length ? (
          <div className="mt-1 flex justify-center"><BadgeList badges={game.badges} /></div>
        ) : (
          <span className="font-semibold text-pink-300">{game.strategy}</span>
        )}
        <div className="mt-1">Prêmios: 15, 14, 13, 12 e 11 acertos · <strong className="text-pink-300">Boa sorte! 🍀</strong></div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-pink-500/20 p-4">
        <button
          type="button"
          onClick={onAgain}
          className="min-h-[44px] flex-1 rounded-lg bg-pink-600 px-3 text-sm font-semibold text-white hover:bg-pink-700"
        >
          ✨ Outro jogo
        </button>
        <button
          type="button"
          onClick={onSurprise}
          className="min-h-[44px] flex-1 rounded-lg border border-pink-500 px-3 text-sm font-semibold text-pink-300 hover:bg-pink-600/20"
        >
          🎲 Surpresinha
        </button>
        <button
          type="button"
          onClick={() => onCopy(`Lotofácil: ${game.numbers.map(pad).join(", ")} — ${game.strategy}`)}
          className="min-h-[44px] rounded-lg border border-neutral-surface-variant px-4 text-sm font-semibold text-text-primary hover:bg-background-primary"
        >
          📋 Copiar
        </button>
        <button
          type="button"
          onClick={() => onPrint(game)}
          className="min-h-[44px] rounded-lg border border-neutral-surface-variant px-4 text-sm font-semibold text-text-primary hover:bg-background-primary"
        >
          🖨️ Imprimir
        </button>
      </div>
    </div>
  );
}
