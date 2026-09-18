import { useId, useMemo, useRef, useState, type FormEvent, type RefObject } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  HelpTooltip,
  MoneyInput,
  OddsInput,
  RateInput,
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface ExpectedValueInput {
  /** Valor apostado em R$ (> 0) */
  stake: number;
  /** Odd decimal oferecida (> 1.00) */
  odds: number;
  /** Probabilidade estimada de vitória em % (0.01 a 99.99) */
  probabilityPercent: number;
}

export interface ExpectedValueResult {
  /** Probabilidade de vitória em decimal */
  pWin: number;
  /** Probabilidade de derrota em decimal (1 - pWin) */
  pLoss: number;
  /** Lucro líquido se a aposta vencer: stake × (odd − 1) */
  potentialProfit: number;
  /** Peso da vitória: pWin × lucro */
  weightedProfit: number;
  /** Peso da derrota: pLoss × stake */
  weightedRisk: number;
  /** EV em R$ por aposta */
  evMoney: number;
  /** EV em % do valor apostado */
  evPercent: number;
  /** true quando EV > 0 */
  isPositiveEV: boolean;
  /** Probabilidade implícita da odd (1 / odd) */
  impliedProbability: number;
  /** Odd mínima para a aposta ter EV zero com a sua probabilidade (1 / pWin) */
  fairOdds: number;
}

export interface ProjectionPoint {
  bets: number;
  balance: number;
}

export type ExpectedValueFieldErrors = Partial<Record<keyof ExpectedValueInput, string>>;

export interface ExpectedValueCalculatorProps {
  /** Valor inicial da aposta em R$ (padrão: 100) */
  defaultStake?: number;
  className?: string;
}

interface FormState {
  stake: string;
  odds: string;
  probabilityPercent: string;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const MIN_PROBABILITY_PERCENT = 0.01;
export const MAX_PROBABILITY_PERCENT = 99.99;

/** Número de apostas usado nos pontos do gráfico de projeção */
export const PROJECTION_STEPS = [0, 10, 25, 50, 75, 100] as const;

/** Tolerância para ruído de ponto flutuante ao comparar o EV percentual com zero */
const EPSILON = 1e-9;

/**
 * Calcula o valor esperado de uma aposta.
 *
 * EV = (pWin × lucro) − (pLoss × stake), onde lucro = stake × (odd − 1).
 */
export function calculateExpectedValue({
  stake,
  odds,
  probabilityPercent,
}: ExpectedValueInput): ExpectedValueResult {
  const pWin = probabilityPercent / 100;
  const pLoss = 1 - pWin;
  const potentialProfit = stake * (odds - 1);
  const weightedProfit = pWin * potentialProfit;
  const weightedRisk = pLoss * stake;
  const evMoney = weightedProfit - weightedRisk;
  const evPercent = (evMoney / stake) * 100;

  return {
    pWin,
    pLoss,
    potentialProfit,
    weightedProfit,
    weightedRisk,
    evMoney,
    evPercent,
    isPositiveEV: evPercent > EPSILON,
    impliedProbability: 1 / odds,
    fairOdds: 1 / pWin,
  };
}

/** Projeta o saldo acumulado esperado (EV × número de apostas) para cada ponto do gráfico. */
export function projectBalance(
  evMoney: number,
  steps: readonly number[] = PROJECTION_STEPS
): ProjectionPoint[] {
  return steps.map((bets) => ({ bets, balance: evMoney * bets }));
}

/**
 * Valida os campos brutos (strings pt-BR dos campos com máscara). Valores fora da faixa sempre
 * geram erro; campos vazios só geram erro com `requireAll` (usado ao clicar em "Calcular").
 */
export function validateExpectedValueForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): {
  errors: ExpectedValueFieldErrors;
  values: ExpectedValueInput | null;
} {
  const stake = parseMaskedNumber(state.stake);
  const odds = parseMaskedNumber(state.odds);
  const probabilityPercent = parseMaskedNumber(state.probabilityPercent);
  const errors: ExpectedValueFieldErrors = {};

  if (requireAll) {
    if (!Number.isFinite(stake)) errors.stake = "Informe o valor da aposta.";
    if (!Number.isFinite(odds)) errors.odds = "Informe a odd oferecida.";
    if (!Number.isFinite(probabilityPercent)) {
      errors.probabilityPercent = "Informe a probabilidade estimada.";
    }
  }

  if (Number.isFinite(stake) && !(stake > 0)) {
    errors.stake = "O valor da aposta deve ser maior que R$ 0,00.";
  }
  if (Number.isFinite(odds) && !(odds > 1)) {
    errors.odds = "A odd decimal deve ser maior que 1,00.";
  }
  if (
    Number.isFinite(probabilityPercent) &&
    !(
      probabilityPercent >= MIN_PROBABILITY_PERCENT && probabilityPercent <= MAX_PROBABILITY_PERCENT
    )
  ) {
    errors.probabilityPercent =
      probabilityPercent >= 100
        ? "100% não é permitido: nenhum evento é garantido."
        : "Informe um valor entre 0,01% e 99,99%.";
  }

  const allFilled =
    Number.isFinite(stake) && Number.isFinite(odds) && Number.isFinite(probabilityPercent);

  return {
    errors,
    values:
      allFilled && Object.keys(errors).length === 0 ? { stake, odds, probabilityPercent } : null,
  };
}

// ---------------------------------------------------------------------------
// Formatação
// ---------------------------------------------------------------------------

const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const compactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** "+ R$ 5,50" / "- R$ 2,30" */
export function formatSignedCurrency(value: number): string {
  const sign = value > 0 ? "+ " : value < 0 ? "- " : "";
  return `${sign}${currencyFormatter.format(Math.abs(value))}`;
}

/** "+5,50%" / "-2,30%" (recebe o valor já em pontos percentuais) */
export function formatSignedPercent(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${decimalFormatter.format(Math.abs(value))}%`;
}

// ---------------------------------------------------------------------------
// Gráficos
// ---------------------------------------------------------------------------

const COLORS = {
  green: "#66BB6A",
  greenFill: "rgba(102, 187, 106, 0.15)",
  red: "#EF5350",
  redFill: "rgba(239, 83, 80, 0.15)",
  tick: "#A1A1A1",
  grid: "#333333",
};

const baseScales = {
  x: { ticks: { color: COLORS.tick }, grid: { color: COLORS.grid } },
  y: {
    ticks: {
      color: COLORS.tick,
      callback: (value: string | number) => compactCurrencyFormatter.format(Number(value)),
    },
    grid: { color: COLORS.grid },
  },
};

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  // Transição curta para os gráficos acompanharem a digitação sem "pular"
  animation: { duration: 400 },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: (ctx) => ` ${currencyFormatter.format(Number(ctx.parsed.y))}` },
    },
  },
  scales: { ...baseScales, y: { ...baseScales.y, beginAtZero: true } },
};

function lineOptions(): ChartOptions<"line"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => `Após ${items[0]?.label} apostas`,
          label: (ctx) => ` Saldo esperado: ${formatSignedCurrency(Number(ctx.parsed.y))}`,
        },
      },
    },
    scales: {
      x: {
        ...baseScales.x,
        title: { display: true, text: "Número de apostas", color: COLORS.tick },
      },
      y: baseScales.y,
    },
  };
}

function WeightedBarChart({ result }: { result: ExpectedValueResult }) {
  const data = {
    labels: ["Lucro ponderado", "Risco ponderado"],
    datasets: [
      {
        data: [result.weightedProfit, result.weightedRisk],
        backgroundColor: [COLORS.green, COLORS.red],
        borderRadius: 6,
        maxBarThickness: 80,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar
        data={data}
        options={barOptions}
        role="img"
        aria-label={`Gráfico de barras: lucro ponderado de ${currencyFormatter.format(
          result.weightedProfit
        )} contra risco ponderado de ${currencyFormatter.format(result.weightedRisk)}.`}
      />
    </div>
  );
}

function ProjectionLineChart({ result }: { result: ExpectedValueResult }) {
  const points = projectBalance(result.evMoney);
  const color = result.isPositiveEV ? COLORS.green : COLORS.red;
  const last = points[points.length - 1];
  const options = useMemo(lineOptions, []);

  const data = {
    labels: points.map((p) => String(p.bets)),
    datasets: [
      {
        data: points.map((p) => p.balance),
        borderColor: color,
        backgroundColor: result.isPositiveEV ? COLORS.greenFill : COLORS.redFill,
        pointBackgroundColor: color,
        borderWidth: 3,
        pointRadius: 4,
        fill: "origin" as const,
        tension: 0,
      },
    ],
  };

  return (
    <div className="h-64">
      <Line
        data={data}
        options={options}
        role="img"
        aria-label={`Gráfico de linha: saldo esperado de ${formatSignedCurrency(
          last.balance
        )} após ${last.bets} apostas.`}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subcomponentes
// ---------------------------------------------------------------------------

function LabelWithHelp({
  htmlFor,
  label,
  term,
  help,
}: {
  htmlFor: string;
  label: string;
  term: string;
  help: string;
}) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <HelpTooltip term={term}>{help}</HelpTooltip>
    </div>
  );
}

function MetricBox({
  label,
  value,
  note,
  valueClassName,
}: {
  label: string;
  value: string;
  note: string;
  valueClassName: string;
}) {
  return (
    <div className="rounded-lg bg-gray-900 p-5 text-center">
      <div className={`text-2xl font-bold sm:text-3xl ${valueClassName}`}>{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
      <div className="mt-2 text-xs text-gray-400">{note}</div>
    </div>
  );
}

function ResultCard({ result, stake }: { result: ExpectedValueResult; stake: number }) {
  const positive = result.isPositiveEV;
  const accent = positive ? "text-growth-green" : "text-system-error";

  return (
    <Card
      className={
        positive
          ? "border-2 border-growth-green bg-growth-green-soft"
          : "border-2 border-system-error bg-health-red-light"
      }
    >
      <CardHeader>
        <CardTitle as="h3" className={accent}>
          {positive ? "✅ Aposta de Valor (EV+)" : "⛔ EV Negativo (EV-)"}
        </CardTitle>
        <p className="mt-2 text-text-primary">
          {positive
            ? "A longo prazo, esta aposta é lucrativa."
            : "A longo prazo, esta aposta dará prejuízo. Evite."}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-lg bg-gray-900 p-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-sm text-text-secondary">
            <span>Valor Esperado (EV) por aposta</span>
            <HelpTooltip term="Valor Esperado (EV)">
              É o lucro ou prejuízo médio de uma aposta se ela fosse repetida muitas vezes. EV
              positivo indica que, no longo prazo, a aposta tende a dar lucro.
            </HelpTooltip>
          </div>
          <div className={`text-4xl font-extrabold sm:text-5xl ${accent}`}>
            {formatSignedPercent(result.evPercent)}
          </div>
          <div className={`mt-2 text-xl font-semibold ${accent}`}>
            {formatSignedCurrency(result.evMoney)}
          </div>
          <div className="mt-1 text-xs text-gray-400">
            em uma aposta de {currencyFormatter.format(stake)}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricBox
            label="Lucro se vencer"
            value={currencyFormatter.format(result.potentialProfit)}
            note="Stake × (odd − 1)"
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Probabilidade implícita"
            value={percentFormatter.format(result.impliedProbability)}
            note={`Sua estimativa: ${percentFormatter.format(result.pWin)}`}
            valueClassName="text-text-primary"
          />
          <MetricBox
            label="Odd justa"
            value={decimalFormatter.format(result.fairOdds)}
            note="Odd mínima para a aposta ter valor"
            valueClassName="text-system-warning"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ChartsCard({ result }: { result: ExpectedValueResult }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h3">📊 Visualização do Valor Esperado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <figure className="rounded-lg bg-gray-900 p-4">
            <figcaption className="mb-3">
              <span className="block font-semibold text-text-primary">
                Risco vs retorno ponderado
              </span>
              <span className="text-xs text-text-secondary">
                Peso da vitória (probabilidade × lucro) contra o peso da derrota (probabilidade ×
                valor apostado). Se a barra verde for maior, a aposta é EV+.
              </span>
            </figcaption>
            <WeightedBarChart result={result} />
          </figure>
          <figure className="rounded-lg bg-gray-900 p-4">
            <figcaption className="mb-3">
              <span className="block font-semibold text-text-primary">Projeção de longo prazo</span>
              <span className="text-xs text-text-secondary">
                Saldo acumulado esperado repetindo esta mesma aposta. Resultados reais oscilam em
                torno desta linha.
              </span>
            </figcaption>
            <ProjectionLineChart result={result} />
          </figure>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function ExpectedValueCalculator({
  defaultStake = 100,
  className = "",
}: ExpectedValueCalculatorProps) {
  const initialState: FormState = {
    stake: decimalFormatter.format(defaultStake),
    odds: "",
    probabilityPercent: "",
  };
  const [form, setForm] = useState<FormState>(initialState);
  // Após clicar em "Calcular", campos vazios passam a exibir erro até o próximo "Limpar"
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [calculated, setCalculated] = useState<{
    result: ExpectedValueResult;
    stake: number;
  } | null>(null);
  const inputsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const stakeId = useId();
  const oddsId = useId();
  const probabilityId = useId();

  // Valores inválidos (ex.: odd 0,50) são sinalizados durante a digitação
  const { errors } = useMemo(
    () => validateExpectedValueForm(form, { requireAll }),
    [form, requireAll]
  );

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const updateField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setCalculated(null);
  };

  const scrollTo = (ref: RefObject<HTMLDivElement>) => {
    // Aguarda o React renderizar o resultado/erros antes de rolar
    setTimeout(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 50);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validateExpectedValueForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateExpectedValue(values), stake: values.stake });
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(initialState);
    setRequireAll(false);
    setCalculated(null);
    scrollTo(inputsRef);
  };

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">⚽ Dados da Aposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">Calcule o valor esperado da sua aposta:</p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  EV = (P × lucro) − (1 − P) × stake
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver o EV e os gráficos
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados da aposta"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <LabelWithHelp
                    htmlFor={stakeId}
                    label="Valor da aposta (stake)"
                    term="stake"
                    help="Quanto você vai apostar neste palpite, em reais. O EV é proporcional a esse valor."
                  />
                  <MoneyInput
                    id={stakeId}
                    placeholder="100,00"
                    value={form.stake}
                    onChange={updateField("stake")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback error={errors.stake} hint="Valor apostado neste palpite" />
                </div>
                <div>
                  <LabelWithHelp
                    htmlFor={oddsId}
                    label="Odd oferecida (decimal)"
                    term="odd decimal"
                    help="O multiplicador pago pela casa. Uma odd de 2,10 devolve R$ 2,10 para cada R$ 1 apostado (lucro de R$ 1,10)."
                  />
                  <OddsInput
                    id={oddsId}
                    placeholder="2,10"
                    value={form.odds}
                    onChange={updateField("odds")}
                  />
                  <FieldFeedback error={errors.odds} hint="Ex.: 2,10 paga R$ 2,10 por R$ 1" />
                </div>
                <div>
                  <LabelWithHelp
                    htmlFor={probabilityId}
                    label="Probabilidade estimada de vitória"
                    term="Probabilidade Estimada"
                    help="A chance real de acerto na sua análise, e não a da casa. Se ela for maior que a probabilidade implícita da odd (1 ÷ odd), a aposta tem valor."
                  />
                  <RateInput
                    id={probabilityId}
                    placeholder="55,00%"
                    value={form.probabilityPercent}
                    onChange={updateField("probabilityPercent")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.probabilityPercent}
                    hint="Sua chance real de acerto (0,01% a 99,99%)"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button type="submit" className="px-8">
                  Calcular
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                >
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4 space-y-8">
        {calculated && (
          <>
            <ResultCard result={calculated.result} stake={calculated.stake} />
            <ChartsCard result={calculated.result} />
          </>
        )}
      </div>

      <p className="text-center text-xs leading-relaxed text-text-secondary">
        Apostas envolvem risco financeiro. Esta calculadora é uma ferramenta matemática e não
        garante lucros. Jogue com responsabilidade. (18+)
      </p>
    </div>
  );
}

export default ExpectedValueCalculator;
