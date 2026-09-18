import { useId, useMemo, useState, type FormEvent } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  HelpTooltip,
  Input,
  MoneyInput,
  RateInput,
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";
import {
  BettingDisclaimer,
  CalculatorActions,
  MetricBox,
  OptionCards,
  currencyFormatter,
  decimalFormatter,
  percentFormatter,
  useCalculatorScroll,
} from "./betting-shared";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type RiskProfile = "conservador" | "moderado" | "agressivo" | "personalizado";

export interface BankrollInput {
  /** Banca total em R$ (> 0) */
  bankroll: number;
  /** Tamanho da unidade em % da banca (0,1 a 20) */
  unitPercent: number;
  /** Derrotas seguidas a simular (1 a 100) */
  losingStreak: number;
}

export interface BankrollPathPoint {
  losses: number;
  /** Banca com stake fixa (sempre 1 unidade inicial) */
  fixed: number;
  /** Banca com stake percentual (1 unidade da banca atual) */
  percentage: number;
}

export interface BankrollResult {
  /** Valor de 1 unidade: banca × % */
  unit: number;
  /** Stakes de 1, 2 e 3 unidades (apostas de confiança baixa, média e alta) */
  stakesByConfidence: number[];
  /** Derrotas seguidas até zerar a banca com stake fixa */
  lossesToRuinFixed: number;
  fixedFinal: number;
  percentageFinal: number;
  path: BankrollPathPoint[];
}

export interface BankrollFieldErrors {
  bankroll?: string;
  unitPercent?: string;
  losingStreak?: string;
}

export interface GestaoBancaCalculatorProps {
  /** Banca inicial em R$ (padrão: 1000) */
  defaultBankroll?: number;
  className?: string;
}

interface FormState {
  bankroll: string;
  profile: RiskProfile;
  customPercent: string;
  losingStreak: string;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const PROFILE_OPTIONS: ReadonlyArray<{
  value: RiskProfile;
  label: string;
  description: string;
  percent?: number;
}> = [
  { value: "conservador", label: "Conservador", description: "1% da banca", percent: 1 },
  { value: "moderado", label: "Moderado", description: "2% da banca", percent: 2 },
  { value: "agressivo", label: "Agressivo", description: "5% da banca", percent: 5 },
  { value: "personalizado", label: "Personalizado", description: "Defina o %" },
];

export const MIN_UNIT_PERCENT = 0.1;
export const MAX_UNIT_PERCENT = 20;
export const MAX_LOSING_STREAK = 100;

/**
 * Calcula o valor da unidade e simula uma sequência de derrotas com dois métodos:
 * stake fixa (a mesma unidade sempre) e stake percentual (a unidade é recalculada sobre a
 * banca atual, então nunca zera).
 */
export function calculateBankroll({
  bankroll,
  unitPercent,
  losingStreak,
}: BankrollInput): BankrollResult {
  const p = unitPercent / 100;
  const unit = bankroll * p;

  const path: BankrollPathPoint[] = [];
  for (let losses = 0; losses <= losingStreak; losses++) {
    path.push({
      losses,
      fixed: Math.max(0, bankroll - unit * losses),
      percentage: bankroll * (1 - p) ** losses,
    });
  }
  const last = path[path.length - 1];

  return {
    unit,
    stakesByConfidence: [1, 2, 3].map((units) => unit * units),
    lossesToRuinFixed: Math.ceil(1 / p - 1e-9),
    fixedFinal: last.fixed,
    percentageFinal: last.percentage,
    path,
  };
}

export function resolveUnitPercent(profile: RiskProfile, customPercent: string): number {
  const preset = PROFILE_OPTIONS.find((option) => option.value === profile)?.percent;
  return preset ?? parseMaskedNumber(customPercent);
}

/**
 * Valida os campos brutos. Valores fora da faixa sempre geram erro; vazios só com `requireAll`
 * (clique em "Calcular").
 */
export function validateBankrollForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: BankrollFieldErrors; values: BankrollInput | null } {
  const bankroll = parseMaskedNumber(state.bankroll);
  const unitPercent = resolveUnitPercent(state.profile, state.customPercent);
  const losingStreak = state.losingStreak.trim() === "" ? Number.NaN : Number(state.losingStreak);
  const errors: BankrollFieldErrors = {};

  if (!Number.isFinite(bankroll)) {
    if (requireAll) errors.bankroll = "Informe o valor da banca.";
  } else if (!(bankroll > 0)) {
    errors.bankroll = "A banca deve ser maior que R$ 0,00.";
  }

  if (!Number.isFinite(unitPercent)) {
    if (requireAll) errors.unitPercent = "Informe o percentual da unidade.";
  } else if (unitPercent < MIN_UNIT_PERCENT || unitPercent > MAX_UNIT_PERCENT) {
    errors.unitPercent = "Use um valor entre 0,10% e 20,00% da banca.";
  }

  if (!Number.isFinite(losingStreak)) {
    if (requireAll) errors.losingStreak = "Informe quantas derrotas simular.";
  } else if (
    !Number.isInteger(losingStreak) ||
    losingStreak < 1 ||
    losingStreak > MAX_LOSING_STREAK
  ) {
    errors.losingStreak = `Use um número inteiro entre 1 e ${MAX_LOSING_STREAK}.`;
  }

  const ready =
    Number.isFinite(bankroll) &&
    Number.isFinite(unitPercent) &&
    Number.isFinite(losingStreak) &&
    Object.keys(errors).length === 0;

  return { errors, values: ready ? { bankroll, unitPercent, losingStreak } : null };
}

// ---------------------------------------------------------------------------
// Gráfico
// ---------------------------------------------------------------------------

const compactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400 },
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: { labels: { color: "#E5E5E5" } },
    tooltip: {
      callbacks: {
        title: (items) => `Após ${items[0]?.label} derrotas`,
        label: (ctx) => ` ${ctx.dataset.label}: ${currencyFormatter.format(Number(ctx.parsed.y))}`,
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#A1A1A1" },
      grid: { color: "#333333" },
      title: { display: true, text: "Derrotas seguidas", color: "#A1A1A1" },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#A1A1A1",
        callback: (value) => compactCurrencyFormatter.format(Number(value)),
      },
      grid: { color: "#333333" },
    },
  },
};

function StreakChart({ result }: { result: BankrollResult }) {
  const data = {
    labels: result.path.map((point) => String(point.losses)),
    datasets: [
      {
        label: "Stake fixa",
        data: result.path.map((point) => point.fixed),
        borderColor: "#EF5350",
        backgroundColor: "#EF5350",
        borderWidth: 3,
        pointRadius: result.path.length > 30 ? 0 : 3,
      },
      {
        label: "Stake percentual",
        data: result.path.map((point) => point.percentage),
        borderColor: "#64B5F6",
        backgroundColor: "#64B5F6",
        borderWidth: 3,
        pointRadius: result.path.length > 30 ? 0 : 3,
      },
    ],
  };
  const last = result.path[result.path.length - 1];

  return (
    <div className="h-72">
      <Line
        data={data}
        options={chartOptions}
        role="img"
        aria-label={`Gráfico de linha: após ${last.losses} derrotas seguidas, a banca fica em ${currencyFormatter.format(
          last.fixed
        )} com stake fixa e ${currencyFormatter.format(last.percentage)} com stake percentual.`}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

function ResultCard({ result, input }: { result: BankrollResult; input: BankrollInput }) {
  const lossPct = (final: number) => percentFormatter.format(1 - final / input.bankroll);
  const brokeFixed = result.fixedFinal <= 0;

  return (
    <Card className="border-2 border-primary-blue-dark bg-primary-blue-light">
      <CardHeader>
        <CardTitle as="h3" className="text-primary-blue-dark">
          💼 Sua unidade: {currencyFormatter.format(result.unit)}
        </CardTitle>
        <p className="mt-2 text-text-primary">
          {decimalFormatter.format(input.unitPercent)}% de uma banca de{" "}
          {currencyFormatter.format(input.bankroll)}. Aposte em unidades conforme a sua confiança em
          cada palpite.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {["Confiança baixa", "Confiança média", "Confiança alta"].map((label, i) => (
            <MetricBox
              key={label}
              label={`${i + 1} unidade${i ? "s" : ""}`}
              value={currencyFormatter.format(result.stakesByConfidence[i])}
              note={label}
              valueClassName="text-growth-green"
            />
          ))}
        </div>

        <div className="rounded-lg bg-gray-900 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <h4 className="font-semibold text-text-primary">
              Simulação: {input.losingStreak} derrotas seguidas
            </h4>
            <HelpTooltip term="simulação de derrotas">
              Sequências longas de derrotas acontecem mesmo com bons palpites. A simulação mostra
              quanto sobra da banca em cada método depois de uma sequência ruim.
            </HelpTooltip>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-system-error/30 bg-system-error/10 p-4 text-center">
              <div className="text-sm text-text-secondary">
                Stake fixa ({currencyFormatter.format(result.unit)} sempre)
              </div>
              <div className="mt-1 text-2xl font-bold text-system-error">
                {currencyFormatter.format(result.fixedFinal)}
              </div>
              <div className="text-xs text-gray-400">
                {brokeFixed
                  ? `Banca zerada na ${result.lossesToRuinFixed}ª derrota`
                  : `Perda de ${lossPct(result.fixedFinal)} · zera em ${result.lossesToRuinFixed} derrotas`}
              </div>
            </div>
            <div className="rounded-lg border border-primary-blue/30 bg-primary-blue/10 p-4 text-center">
              <div className="text-sm text-text-secondary">
                Stake percentual ({decimalFormatter.format(input.unitPercent)}% da banca atual)
              </div>
              <div className="mt-1 text-2xl font-bold text-primary-blue-dark">
                {currencyFormatter.format(result.percentageFinal)}
              </div>
              <div className="text-xs text-gray-400">
                Perda de {lossPct(result.percentageFinal)} · nunca zera
              </div>
            </div>
          </div>

          <StreakChart result={result} />
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function GestaoBancaCalculator({
  defaultBankroll = 1000,
  className = "",
}: GestaoBancaCalculatorProps) {
  const initialState: FormState = {
    bankroll: decimalFormatter.format(defaultBankroll),
    profile: "moderado",
    customPercent: "",
    losingStreak: "10",
  };
  const [form, setForm] = useState<FormState>(initialState);
  const [requireAll, setRequireAll] = useState(false);
  const [calculated, setCalculated] = useState<{
    result: BankrollResult;
    input: BankrollInput;
  } | null>(null);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();
  const streakId = useId();

  const { errors } = useMemo(() => validateBankrollForm(form, { requireAll }), [form, requireAll]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validateBankrollForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateBankroll(values), input: values });
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
            <CardTitle as="h2">💼 Dados da Banca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">Defina o tamanho das suas apostas:</p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  unidade = banca × % por aposta
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver a unidade e a simulação
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados da banca"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <MoneyInput
                    label="Banca total"
                    placeholder="1.000,00"
                    value={form.bankroll}
                    onChange={(bankroll) => changeForm({ bankroll })}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.bankroll}
                    hint="Valor separado exclusivamente para apostas"
                  />
                </div>
                <div>
                  <Input
                    id={streakId}
                    label="Derrotas seguidas a simular"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_LOSING_STREAK}
                    step={1}
                    value={form.losingStreak}
                    onChange={(e) => changeForm({ losingStreak: e.target.value })}
                    onWheel={(e) => e.currentTarget.blur()}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.losingStreak}
                    hint="Uma sequência ruim para testar a banca (1 a 100)"
                  />
                </div>
              </div>

              <div>
                <OptionCards
                  legend="Perfil de risco (tamanho da unidade)"
                  options={PROFILE_OPTIONS}
                  value={form.profile}
                  onChange={(profile) => changeForm({ profile })}
                  columnsClassName="grid-cols-2 md:grid-cols-4"
                />
                {form.profile === "personalizado" && (
                  <div className="mt-4 md:max-w-sm">
                    <RateInput
                      label="Unidade em % da banca"
                      placeholder="2,00%"
                      value={form.customPercent}
                      onChange={(customPercent) => changeForm({ customPercent })}
                      fullWidth
                      className="h-12 text-lg"
                    />
                  </div>
                )}
                <FieldFeedback
                  error={errors.unitPercent}
                  hint="Iniciantes costumam usar entre 1% e 2% da banca por unidade"
                />
              </div>

              <CalculatorActions onReset={handleReset} />
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4">
        {calculated && <ResultCard result={calculated.result} input={calculated.input} />}
      </div>

      <BettingDisclaimer extra="uma boa gestão de banca reduz o risco, mas não elimina perdas" />
    </div>
  );
}

export default GestaoBancaCalculator;
