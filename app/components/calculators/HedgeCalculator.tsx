import { useMemo, useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  HelpTooltip,
  MoneyInput,
  OddsInput,
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";
import {
  BettingDisclaimer,
  CalculatorActions,
  MetricBox,
  OptionCards,
  currencyFormatter,
  decimalFormatter,
  formatSignedCurrency,
  useCalculatorScroll,
} from "./betting-shared";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type HedgeMode = "igual" | "recuperar";

export interface HedgeInput {
  /** Valor da aposta original em R$ (> 0) */
  stake: number;
  /** Odd da aposta original (> 1.00) */
  originalOdds: number;
  /** Odd atual do resultado contrário (> 1.00) */
  hedgeOdds: number;
  mode: HedgeMode;
  /** Valor de cash out oferecido pela casa, se informado */
  cashOut?: number;
}

export interface HedgeResult {
  /** Valor a apostar no resultado contrário */
  hedgeStake: number;
  /** Lucro total se a aposta original vencer */
  profitIfOriginalWins: number;
  /** Lucro total se a aposta de proteção vencer */
  profitIfHedgeWins: number;
  /** Sem hedge: lucro se a original vencer */
  noHedgeWin: number;
  /** Sem hedge: prejuízo se a original perder */
  noHedgeLoss: number;
  /** Menor lucro garantido entre os dois cenários */
  guaranteedProfit: number;
  /** Lucro do cash out (valor oferecido − aposta), se informado */
  cashOutProfit?: number;
}

export interface HedgeFieldErrors {
  stake?: string;
  originalOdds?: string;
  hedgeOdds?: string;
  cashOut?: string;
}

export interface HedgeCalculatorProps {
  className?: string;
}

interface FormState {
  stake: string;
  originalOdds: string;
  hedgeOdds: string;
  mode: HedgeMode;
  cashOut: string;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const MODE_OPTIONS: ReadonlyArray<{ value: HedgeMode; label: string; description: string }> =
  [
    { value: "igual", label: "Lucro igual", description: "Mesmo lucro nos dois cenários" },
    {
      value: "recuperar",
      label: "Recuperar a aposta",
      description: "Zera a perda se a original perder",
    },
  ];

/**
 * Calcula a aposta de proteção (hedge) contra uma aposta já feita.
 *
 * - Lucro igual: stake_h = stake × odd_original ÷ odd_hedge (retornos iguais).
 * - Recuperar a aposta: stake_h = stake ÷ (odd_hedge − 1), o que zera o resultado se a
 *   aposta original perder e mantém o restante do lucro se ela vencer.
 */
export function calculateHedge({
  stake,
  originalOdds,
  hedgeOdds,
  mode,
  cashOut,
}: HedgeInput): HedgeResult {
  const originalReturn = stake * originalOdds;
  const hedgeStake = mode === "igual" ? originalReturn / hedgeOdds : stake / (hedgeOdds - 1);
  const profitIfOriginalWins = originalReturn - stake - hedgeStake;
  const profitIfHedgeWins = hedgeStake * hedgeOdds - stake - hedgeStake;

  return {
    hedgeStake,
    profitIfOriginalWins,
    profitIfHedgeWins,
    noHedgeWin: originalReturn - stake,
    noHedgeLoss: -stake,
    guaranteedProfit: Math.min(profitIfOriginalWins, profitIfHedgeWins),
    cashOutProfit: cashOut === undefined ? undefined : cashOut - stake,
  };
}

/**
 * Valida os campos brutos. Valores fora da faixa sempre geram erro; vazios só com
 * `requireAll` (clique em "Calcular"). O cash out é opcional.
 */
export function validateHedgeForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: HedgeFieldErrors; values: HedgeInput | null } {
  const stake = parseMaskedNumber(state.stake);
  const originalOdds = parseMaskedNumber(state.originalOdds);
  const hedgeOdds = parseMaskedNumber(state.hedgeOdds);
  const cashOut = parseMaskedNumber(state.cashOut);
  const errors: HedgeFieldErrors = {};

  if (!Number.isFinite(stake)) {
    if (requireAll) errors.stake = "Informe o valor da aposta original.";
  } else if (!(stake > 0)) {
    errors.stake = "O valor deve ser maior que R$ 0,00.";
  }
  for (const [field, value, label] of [
    ["originalOdds", originalOdds, "a odd da aposta original"],
    ["hedgeOdds", hedgeOdds, "a odd atual do resultado contrário"],
  ] as const) {
    if (!Number.isFinite(value)) {
      if (requireAll) errors[field] = `Informe ${label}.`;
    } else if (!(value > 1)) {
      errors[field] = "A odd decimal deve ser maior que 1,00.";
    }
  }
  if (Number.isFinite(cashOut) && !(cashOut > 0)) {
    errors.cashOut = "O cash out deve ser maior que R$ 0,00.";
  }

  const ready =
    Number.isFinite(stake) &&
    Number.isFinite(originalOdds) &&
    Number.isFinite(hedgeOdds) &&
    Object.keys(errors).length === 0;

  return {
    errors,
    values: ready
      ? {
          stake,
          originalOdds,
          hedgeOdds,
          mode: state.mode,
          cashOut: Number.isFinite(cashOut) ? cashOut : undefined,
        }
      : null,
  };
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

const profitColor = (value: number) =>
  value > 0.004 ? "text-growth-green" : value < -0.004 ? "text-system-error" : "text-text-primary";

function ResultCard({ result, input }: { result: HedgeResult; input: HedgeInput }) {
  const locked = result.guaranteedProfit > 0.004;
  const equalMode = input.mode === "igual";
  // Modo "lucro igual": positivo se há lucro garantido; modo "recuperar": se sobra lucro ao vencer
  const positive = equalMode ? locked : result.profitIfOriginalWins > 0.004;

  const title = equalMode
    ? locked
      ? `✅ Lucro garantido de ${currencyFormatter.format(result.guaranteedProfit)}`
      : Math.abs(result.guaranteedProfit) < 0.005
        ? "⚖️ O hedge garante empate (sem lucro nem prejuízo)"
        : "⚠️ O hedge trava um prejuízo"
    : result.profitIfOriginalWins > 0.004
      ? "✅ Aposta recuperada, com lucro se a original vencer"
      : "⚠️ Recuperar a aposta elimina o lucro";

  return (
    <Card
      className={
        positive
          ? "border-2 border-growth-green bg-growth-green-soft"
          : "border-2 border-system-warning bg-system-warning/10"
      }
    >
      <CardHeader>
        <CardTitle as="h3" className={positive ? "text-growth-green" : "text-system-warning"}>
          {title}
        </CardTitle>
        <p className="mt-2 text-text-primary">
          Aposte <strong>{currencyFormatter.format(result.hedgeStake)}</strong> no resultado
          contrário, na odd {decimalFormatter.format(input.hedgeOdds)}.
          {!locked &&
            equalMode &&
            " Com essa odd contrária não há lucro garantido; o hedge apenas limita o resultado."}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricBox
            label="Aposta de proteção"
            value={currencyFormatter.format(result.hedgeStake)}
            note="No resultado contrário"
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Se a original vencer"
            value={formatSignedCurrency(result.profitIfOriginalWins)}
            note="Lucro total das duas apostas"
            valueClassName={profitColor(result.profitIfOriginalWins)}
          />
          <MetricBox
            label="Se a proteção vencer"
            value={formatSignedCurrency(result.profitIfHedgeWins)}
            note="Lucro total das duas apostas"
            valueClassName={profitColor(result.profitIfHedgeWins)}
          />
        </div>

        <div className="rounded-lg bg-gray-900 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <h4 className="font-semibold text-text-primary">Com e sem hedge</h4>
            <HelpTooltip term="hedge">
              O hedge troca parte do lucro possível por segurança: você ganha menos se a aposta
              original vencer, mas não perde tudo se ela falhar.
            </HelpTooltip>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <caption className="sr-only">
                Lucro em cada cenário com e sem a aposta de proteção
              </caption>
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th scope="col" className="p-3 text-left font-semibold">
                    Cenário
                  </th>
                  <th scope="col" className="p-3 text-center font-semibold text-system-warning">
                    Sem hedge
                  </th>
                  <th scope="col" className="p-3 text-center font-semibold text-growth-green">
                    Com hedge
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-surface-variant">
                  <th scope="row" className="p-3 text-left font-medium text-text-primary">
                    Aposta original vence
                  </th>
                  <td className={`p-3 text-center ${profitColor(result.noHedgeWin)}`}>
                    {formatSignedCurrency(result.noHedgeWin)}
                  </td>
                  <td
                    className={`p-3 text-center font-semibold ${profitColor(result.profitIfOriginalWins)}`}
                  >
                    {formatSignedCurrency(result.profitIfOriginalWins)}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 text-left font-medium text-text-primary">
                    Aposta original perde
                  </th>
                  <td className={`p-3 text-center ${profitColor(result.noHedgeLoss)}`}>
                    {formatSignedCurrency(result.noHedgeLoss)}
                  </td>
                  <td
                    className={`p-3 text-center font-semibold ${profitColor(result.profitIfHedgeWins)}`}
                  >
                    {formatSignedCurrency(result.profitIfHedgeWins)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {result.cashOutProfit !== undefined && (
            <div className="mt-4 rounded-lg border border-system-info/30 bg-system-info/10 p-4 text-sm">
              <p className="font-semibold text-system-info">💰 Cash out x hedge</p>
              <p className="mt-1 text-text-secondary">
                O cash out oferecido garante{" "}
                <strong className={profitColor(result.cashOutProfit)}>
                  {formatSignedCurrency(result.cashOutProfit)}
                </strong>
                ; o hedge garante pelo menos{" "}
                <strong className={profitColor(result.guaranteedProfit)}>
                  {formatSignedCurrency(result.guaranteedProfit)}
                </strong>
                .{" "}
                {Math.abs(result.cashOutProfit - result.guaranteedProfit) < 0.01
                  ? "Os dois pagam o mesmo."
                  : result.cashOutProfit > result.guaranteedProfit
                    ? "Neste caso, o cash out paga mais que o lucro mínimo do hedge."
                    : "Neste caso, o hedge paga mais que o cash out da casa."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

const INITIAL_STATE: FormState = {
  stake: "",
  originalOdds: "",
  hedgeOdds: "",
  mode: "igual",
  cashOut: "",
};

export function HedgeCalculator({ className = "" }: HedgeCalculatorProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [requireAll, setRequireAll] = useState(false);
  const [calculated, setCalculated] = useState<{ result: HedgeResult; input: HedgeInput } | null>(
    null
  );
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();

  const { errors } = useMemo(() => validateHedgeForm(form, { requireAll }), [form, requireAll]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validateHedgeForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateHedge(values), input: values });
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setRequireAll(false);
    setCalculated(null);
    scrollTo(inputsRef);
  };

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">🛡️ Dados do Hedge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">Proteja uma aposta já feita:</p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  proteção = aposta × odd original ÷ odd contrária
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver quanto apostar no resultado
                  contrário
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados do hedge"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <MoneyInput
                    label="Valor da aposta original"
                    placeholder="100,00"
                    value={form.stake}
                    onChange={(stake) => changeForm({ stake })}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback error={errors.stake} hint="Quanto você já apostou" />
                </div>
                <div>
                  <OddsInput
                    label="Odd da aposta original"
                    placeholder="3,00"
                    value={form.originalOdds}
                    onChange={(originalOdds) => changeForm({ originalOdds })}
                  />
                  <FieldFeedback error={errors.originalOdds} hint="A odd em que você apostou" />
                </div>
                <div>
                  <OddsInput
                    label="Odd atual do resultado contrário"
                    placeholder="1,80"
                    value={form.hedgeOdds}
                    onChange={(hedgeOdds) => changeForm({ hedgeOdds })}
                  />
                  <FieldFeedback
                    error={errors.hedgeOdds}
                    hint="No futebol, use a dupla chance que cobre os outros resultados"
                  />
                </div>
              </div>

              <OptionCards
                legend="Objetivo do hedge"
                options={MODE_OPTIONS}
                value={form.mode}
                onChange={(mode) => changeForm({ mode })}
              />

              <div className="md:max-w-sm">
                <MoneyInput
                  label="Cash out oferecido (opcional)"
                  placeholder="150,00"
                  value={form.cashOut}
                  onChange={(cashOut) => changeForm({ cashOut })}
                  fullWidth
                  className="h-12 text-lg"
                />
                <FieldFeedback
                  error={errors.cashOut}
                  hint="Informe para comparar o cash out da casa com o hedge"
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

      <BettingDisclaimer extra="odds mudam rapidamente durante o jogo e o hedge só funciona se as duas apostas forem aceitas" />
    </div>
  );
}

export default HedgeCalculator;
