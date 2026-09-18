import { useId, useMemo, useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  HelpTooltip,
  OddsInput,
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";
import {
  BettingDisclaimer,
  CalculatorActions,
  MetricBox,
  decimalFormatter,
  percentFormatter,
  useCalculatorScroll,
} from "./betting-shared";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface PoissonInput {
  /** Gols esperados do mandante (λ) */
  homeGoals: number;
  /** Gols esperados do visitante (λ) */
  awayGoals: number;
}

export interface ScoreProbability {
  home: number;
  away: number;
  probability: number;
}

export interface PoissonResult {
  homeWin: number;
  draw: number;
  awayWin: number;
  /** Probabilidade de mais de N,5 gols no jogo, para N = 1, 2 e 3 */
  over: { line: number; probability: number }[];
  bothTeamsScore: number;
  /** Placares mais prováveis, em ordem decrescente */
  topScores: ScoreProbability[];
  /** Matriz de placares 0–5 × 0–5: matrix[golsMandante][golsVisitante] */
  matrix: number[][];
}

export interface PoissonFieldErrors {
  homeGoals?: string;
  awayGoals?: string;
}

export interface PoissonCalculatorProps {
  className?: string;
}

interface FormState {
  homeGoals: string;
  awayGoals: string;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const MIN_EXPECTED_GOALS = 0.1;
export const MAX_EXPECTED_GOALS = 5;
/** Placares exibidos na matriz (0 a 5 gols) */
export const MATRIX_SIZE = 6;
/** Limite de gols usado nas somas; acima disso a probabilidade é desprezível para λ ≤ 5 */
const MAX_GOALS = 15;

/** P(X = k) para uma distribuição de Poisson com média λ. */
export function poissonProbability(k: number, lambda: number): number {
  let factorial = 1;
  for (let i = 2; i <= k; i++) factorial *= i;
  return (Math.exp(-lambda) * lambda ** k) / factorial;
}

/**
 * Calcula as probabilidades de um jogo supondo que os gols de cada time seguem distribuições
 * de Poisson independentes, com médias iguais aos gols esperados.
 */
export function calculatePoisson({ homeGoals, awayGoals }: PoissonInput): PoissonResult {
  const home = Array.from({ length: MAX_GOALS + 1 }, (_, k) => poissonProbability(k, homeGoals));
  const away = Array.from({ length: MAX_GOALS + 1 }, (_, k) => poissonProbability(k, awayGoals));

  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let bothTeamsScore = 0;
  const totals = new Array(2 * MAX_GOALS + 1).fill(0);
  const scores: ScoreProbability[] = [];

  for (let h = 0; h <= MAX_GOALS; h++) {
    for (let a = 0; a <= MAX_GOALS; a++) {
      const p = home[h] * away[a];
      if (h > a) homeWin += p;
      else if (h === a) draw += p;
      else awayWin += p;
      if (h > 0 && a > 0) bothTeamsScore += p;
      totals[h + a] += p;
      scores.push({ home: h, away: a, probability: p });
    }
  }

  const over = [1, 2, 3].map((line) => ({
    line,
    probability: totals.slice(line + 1).reduce((sum, p) => sum + p, 0),
  }));

  return {
    homeWin,
    draw,
    awayWin,
    over,
    bothTeamsScore,
    topScores: [...scores].sort((x, y) => y.probability - x.probability).slice(0, 5),
    matrix: Array.from({ length: MATRIX_SIZE }, (_, h) =>
      Array.from({ length: MATRIX_SIZE }, (_, a) => home[h] * away[a])
    ),
  };
}

/** Odd justa (sem margem) para uma probabilidade: 1 ÷ p. */
export const fairOdds = (probability: number) => 1 / probability;

/**
 * Valida os gols esperados. Valores fora da faixa sempre geram erro; vazios só com
 * `requireAll` (clique em "Calcular").
 */
export function validatePoissonForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: PoissonFieldErrors; values: PoissonInput | null } {
  const errors: PoissonFieldErrors = {};
  const values = {
    homeGoals: parseMaskedNumber(state.homeGoals),
    awayGoals: parseMaskedNumber(state.awayGoals),
  };

  for (const [field, label] of [
    ["homeGoals", "do mandante"],
    ["awayGoals", "do visitante"],
  ] as const) {
    const value = values[field];
    if (!Number.isFinite(value)) {
      if (requireAll) errors[field] = `Informe os gols esperados ${label}.`;
    } else if (value < MIN_EXPECTED_GOALS || value > MAX_EXPECTED_GOALS) {
      errors[field] = "Use um valor entre 0,10 e 5,00 gols.";
    }
  }

  const ready =
    Number.isFinite(values.homeGoals) &&
    Number.isFinite(values.awayGoals) &&
    Object.keys(errors).length === 0;

  return { errors, values: ready ? values : null };
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

function ProbabilityBox({ label, probability }: { label: string; probability: number }) {
  return (
    <MetricBox
      label={label}
      value={percentFormatter.format(probability)}
      note={`Odd justa: ${decimalFormatter.format(fairOdds(probability))}`}
      valueClassName="text-growth-green"
    />
  );
}

function ScoreMatrix({ matrix }: { matrix: number[][] }) {
  const max = Math.max(...matrix.flat());

  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse text-center text-xs sm:text-sm">
        <caption className="mb-2 text-left text-xs text-text-secondary">
          Linhas: gols do mandante · Colunas: gols do visitante
        </caption>
        <thead>
          <tr>
            <th scope="col" className="p-2 text-gray-400">
              <span className="sr-only">Gols do mandante x gols do visitante</span>
            </th>
            {matrix[0].map((_, a) => (
              <th key={a} scope="col" className="p-2 font-semibold text-primary-blue-dark">
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, h) => (
            <tr key={h}>
              <th scope="row" className="p-2 font-semibold text-system-warning">
                {h}
              </th>
              {row.map((p, a) => (
                <td
                  key={a}
                  className="min-w-[3.25rem] border border-neutral-surface-variant p-2 text-text-primary"
                  // Intensidade proporcional à probabilidade, para destacar os placares prováveis
                  style={{ backgroundColor: `rgba(102, 187, 106, ${(0.55 * p) / max})` }}
                  aria-label={`${h} a ${a}: ${percentFormatter.format(p)}`}
                >
                  {percentFormatter.format(p).replace("%", "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultCard({ result, input }: { result: PoissonResult; input: PoissonInput }) {
  return (
    <Card className="border-2 border-primary-blue-dark bg-primary-blue-light">
      <CardHeader>
        <CardTitle as="h3" className="text-primary-blue-dark">
          ⚽ Probabilidades do jogo ({decimalFormatter.format(input.homeGoals)} x{" "}
          {decimalFormatter.format(input.awayGoals)} gols esperados)
        </CardTitle>
        <p className="mt-2 text-text-primary">
          Estimativas do modelo de Poisson. Compare as odds justas com as da casa: odd da casa acima
          da odd justa indica possível aposta de valor.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <section aria-label="Resultado final (1X2)">
          <h4 className="mb-3 font-semibold text-text-primary">Resultado final (1X2)</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ProbabilityBox label="Vitória do mandante (1)" probability={result.homeWin} />
            <ProbabilityBox label="Empate (X)" probability={result.draw} />
            <ProbabilityBox label="Vitória do visitante (2)" probability={result.awayWin} />
          </div>
        </section>

        <section aria-label="Gols no jogo">
          <h4 className="mb-3 font-semibold text-text-primary">Gols no jogo</h4>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {result.over.map(({ line, probability }) => (
              <ProbabilityBox
                key={line}
                label={`Mais de ${line},5 gols`}
                probability={probability}
              />
            ))}
            <ProbabilityBox label="Ambos marcam" probability={result.bothTeamsScore} />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section aria-label="Placares mais prováveis" className="rounded-lg bg-gray-900 p-4">
            <h4 className="mb-3 font-semibold text-text-primary">Placares mais prováveis</h4>
            <ol className="space-y-2">
              {result.topScores.map((score, i) => (
                <li
                  key={`${score.home}-${score.away}`}
                  className="flex items-center justify-between rounded-md bg-background-dark-secondary px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-text-primary">
                    {i + 1}º · {score.home} x {score.away}
                  </span>
                  <span className="text-growth-green">
                    {percentFormatter.format(score.probability)}{" "}
                    <span className="text-xs text-gray-400">
                      (odd justa {decimalFormatter.format(fairOdds(score.probability))})
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Matriz de placares" className="rounded-lg bg-gray-900 p-4">
            <div className="mb-3 flex items-center gap-2">
              <h4 className="font-semibold text-text-primary">Probabilidade de cada placar (%)</h4>
              <HelpTooltip term="matriz de placares">
                Cada célula é a chance daquele placar exato. Quanto mais verde, mais provável.
              </HelpTooltip>
            </div>
            <ScoreMatrix matrix={result.matrix} />
          </section>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

const INITIAL_STATE: FormState = { homeGoals: "", awayGoals: "" };

export function PoissonCalculator({ className = "" }: PoissonCalculatorProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [requireAll, setRequireAll] = useState(false);
  const [calculated, setCalculated] = useState<{
    result: PoissonResult;
    input: PoissonInput;
  } | null>(null);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();
  const homeId = useId();
  const awayId = useId();

  const { errors } = useMemo(() => validatePoissonForm(form, { requireAll }), [form, requireAll]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validatePoissonForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculatePoisson(values), input: values });
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setRequireAll(false);
    setCalculated(null);
    scrollTo(inputsRef);
  };

  const goalsHelp =
    "Média de gols que o time deve marcar neste jogo. Use o xG ou a média de gols marcados (em casa para o mandante, fora para o visitante), ajustada pela defesa do adversário.";

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">⚽ Gols Esperados do Jogo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">Estime a probabilidade de cada placar:</p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  P(k gols) = e^(−λ) × λ^k ÷ k!
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os gols esperados de cada time e clique em Calcular
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Gols esperados do jogo"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {(
                  [
                    ["homeGoals", homeId, "Gols esperados do mandante", "1,60"],
                    ["awayGoals", awayId, "Gols esperados do visitante", "1,10"],
                  ] as const
                ).map(([field, id, label, placeholder]) => (
                  <div key={field}>
                    <div className="mb-1 flex items-center gap-2">
                      <label htmlFor={id} className="text-sm font-medium text-text-primary">
                        {label}
                      </label>
                      <HelpTooltip term="gols esperados">{goalsHelp}</HelpTooltip>
                    </div>
                    <OddsInput
                      id={id}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={(value) => changeForm({ [field]: value })}
                    />
                    <FieldFeedback error={errors[field]} hint="Entre 0,10 e 5,00 gols" />
                  </div>
                ))}
              </div>

              <CalculatorActions onReset={handleReset} />
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4">
        {calculated && <ResultCard result={calculated.result} input={calculated.input} />}
      </div>

      <BettingDisclaimer extra="o modelo de Poisson é uma estimativa estatística e não prevê o resultado de um jogo" />
    </div>
  );
}

export default PoissonCalculator;
