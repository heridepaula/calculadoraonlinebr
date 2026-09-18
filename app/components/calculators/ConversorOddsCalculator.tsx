import { useId, useMemo, useState, type FormEvent, type WheelEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  HelpTooltip,
  Input,
  OddsInput,
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

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type OddsFormat = "decimal" | "fracionaria" | "americana" | "probabilidade";
export type AmericanSign = "+" | "-";

export interface OddsConversion {
  decimal: number;
  /** Fração aproximada (denominador até 100), ex.: { numerator: 3, denominator: 2 } */
  fractional: { numerator: number; denominator: number; exact: boolean };
  /** Odd americana arredondada, ex.: +150 ou -200 */
  american: number;
  /** Probabilidade implícita (0 a 1) */
  impliedProbability: number;
}

export interface OddsFieldErrors {
  value?: string;
}

export interface ConversorOddsCalculatorProps {
  className?: string;
}

interface FormState {
  format: OddsFormat;
  decimal: string;
  numerator: string;
  denominator: string;
  americanSign: AmericanSign;
  american: string;
  probability: string;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const FORMAT_OPTIONS: ReadonlyArray<{
  value: OddsFormat;
  label: string;
  description: string;
}> = [
  { value: "decimal", label: "Decimal", description: "Ex.: 2,50" },
  { value: "fracionaria", label: "Fracionária", description: "Ex.: 3/2" },
  { value: "americana", label: "Americana", description: "Ex.: +150" },
  { value: "probabilidade", label: "Probabilidade", description: "Ex.: 40%" },
];

const MAX_DENOMINATOR = 100;
const EPSILON = 1e-9;

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Aproxima um número positivo por uma fração com denominador até `maxDenominator`
 * (frações contínuas). Retorna a fração irredutível e se ela é exata.
 */
export function toFraction(value: number, maxDenominator = MAX_DENOMINATOR) {
  let [h0, h1, k0, k1] = [0, 1, 1, 0];
  let x = value;
  for (let i = 0; i < 64; i++) {
    const a = Math.floor(x);
    const [h2, k2] = [a * h1 + h0, a * k1 + k0];
    if (k2 > maxDenominator) break;
    [h0, h1, k0, k1] = [h1, h2, k1, k2];
    if (Math.abs(x - a) < EPSILON) break;
    x = 1 / (x - a);
  }
  const divisor = gcd(h1, k1) || 1;
  const numerator = h1 / divisor;
  const denominator = k1 / divisor;
  return { numerator, denominator, exact: Math.abs(numerator / denominator - value) < 1e-6 };
}

/** Converte uma odd decimal (> 1) em todos os formatos. */
export function convertFromDecimal(decimal: number): OddsConversion {
  const profit = decimal - 1;
  return {
    decimal,
    fractional: toFraction(profit),
    american: profit >= 1 ? Math.round(profit * 100) : -Math.round(100 / profit),
    impliedProbability: 1 / decimal,
  };
}

/** Converte a entrada do formato escolhido em odd decimal. */
export function toDecimal(
  format: OddsFormat,
  value: {
    decimal?: number;
    numerator?: number;
    denominator?: number;
    american?: number;
    probability?: number;
  }
): number {
  switch (format) {
    case "decimal":
      return value.decimal ?? Number.NaN;
    case "fracionaria":
      return 1 + (value.numerator ?? Number.NaN) / (value.denominator ?? Number.NaN);
    case "americana": {
      const american = value.american ?? Number.NaN;
      return american > 0 ? 1 + american / 100 : 1 + 100 / Math.abs(american);
    }
    case "probabilidade":
      return 100 / (value.probability ?? Number.NaN);
  }
}

const parseInteger = (raw: string) => (raw.trim() === "" ? Number.NaN : Number(raw));

/**
 * Valida a entrada do formato escolhido e devolve a odd decimal. Vazio só gera erro com
 * `requireAll` (clique em "Calcular").
 */
export function validateOddsForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: OddsFieldErrors; decimal: number | null } {
  const errors: OddsFieldErrors = {};
  const empty = "Informe a odd a converter.";

  switch (state.format) {
    case "decimal": {
      const decimal = parseMaskedNumber(state.decimal);
      if (!Number.isFinite(decimal)) {
        if (requireAll) errors.value = empty;
      } else if (!(decimal > 1)) {
        errors.value = "A odd decimal deve ser maior que 1,00.";
      }
      return { errors, decimal: errors.value || !Number.isFinite(decimal) ? null : decimal };
    }
    case "fracionaria": {
      const numerator = parseInteger(state.numerator);
      const denominator = parseInteger(state.denominator);
      const filled = Number.isFinite(numerator) && Number.isFinite(denominator);
      if (!filled) {
        if (requireAll) errors.value = "Informe o numerador e o denominador.";
      } else if (
        !Number.isInteger(numerator) ||
        !Number.isInteger(denominator) ||
        numerator < 1 ||
        denominator < 1
      ) {
        errors.value = "Use números inteiros maiores que zero (ex.: 3/2).";
      }
      return {
        errors,
        decimal:
          errors.value || !filled ? null : toDecimal("fracionaria", { numerator, denominator }),
      };
    }
    case "americana": {
      const magnitude = parseInteger(state.american);
      if (!Number.isFinite(magnitude)) {
        if (requireAll) errors.value = empty;
      } else if (magnitude < 100) {
        errors.value = "A odd americana deve ser 100 ou mais (ex.: +150 ou -200).";
      }
      const american = state.americanSign === "-" ? -magnitude : magnitude;
      return {
        errors,
        decimal:
          errors.value || !Number.isFinite(magnitude) ? null : toDecimal("americana", { american }),
      };
    }
    case "probabilidade": {
      const probability = parseMaskedNumber(state.probability);
      if (!Number.isFinite(probability)) {
        if (requireAll) errors.value = "Informe a probabilidade.";
      } else if (probability < 0.01 || probability > 99.99) {
        errors.value = "Informe um valor entre 0,01% e 99,99%.";
      }
      return {
        errors,
        decimal:
          errors.value || !Number.isFinite(probability)
            ? null
            : toDecimal("probabilidade", { probability }),
      };
    }
  }
}

/** "+150" / "-200" */
export function formatAmerican(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

const EXAMPLE_STAKE = 100;

function ResultCard({ conversion }: { conversion: OddsConversion }) {
  const { numerator, denominator, exact } = conversion.fractional;
  const profit = EXAMPLE_STAKE * (conversion.decimal - 1);

  return (
    <Card className="border-2 border-primary-blue-dark bg-primary-blue-light">
      <CardHeader>
        <CardTitle as="h3" className="text-primary-blue-dark">
          🔄 Odd convertida
        </CardTitle>
        <p className="mt-2 text-text-primary">
          Uma aposta de {currencyFormatter.format(EXAMPLE_STAKE)} nesta odd dá{" "}
          <strong>{currencyFormatter.format(profit)} de lucro</strong> se vencer (retorno de{" "}
          {currencyFormatter.format(EXAMPLE_STAKE + profit)}).
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricBox
            label="Decimal"
            value={decimalFormatter.format(conversion.decimal)}
            note="Padrão das casas no Brasil"
            valueClassName="text-growth-green"
          />
          <MetricBox
            label="Fracionária"
            value={`${exact ? "" : "≈ "}${numerator}/${denominator}`}
            note={exact ? "Lucro ÷ valor apostado" : "Aproximada (denominador até 100)"}
            valueClassName="text-system-warning"
          />
          <MetricBox
            label="Americana"
            value={formatAmerican(conversion.american)}
            note={
              conversion.american > 0 ? "Lucro em R$ 100 apostados" : "Aposta para lucrar R$ 100"
            }
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Probabilidade implícita"
            value={percentFormatter.format(conversion.impliedProbability)}
            note="1 ÷ odd decimal"
            valueClassName="text-text-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

const INITIAL_STATE: FormState = {
  format: "decimal",
  decimal: "",
  numerator: "",
  denominator: "",
  americanSign: "+",
  american: "",
  probability: "",
};

const integerInputProps = {
  type: "number",
  inputMode: "numeric" as const,
  min: 1,
  step: 1,
  fullWidth: true,
  className: "h-12 text-lg",
  onWheel: (e: WheelEvent<HTMLInputElement>) => e.currentTarget.blur(),
};

export function ConversorOddsCalculator({ className = "" }: ConversorOddsCalculatorProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [requireAll, setRequireAll] = useState(false);
  const [calculated, setCalculated] = useState<OddsConversion | null>(null);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();
  const numeratorId = useId();
  const denominatorId = useId();
  const americanId = useId();

  const { errors } = useMemo(() => validateOddsForm(form, { requireAll }), [form, requireAll]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { decimal } = validateOddsForm(form, { requireAll: true });
    if (decimal === null) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated(convertFromDecimal(decimal));
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
            <CardTitle as="h2">🔄 Odd a Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">Converta a odd para qualquer formato:</p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  decimal = 1 + fração = 1 ÷ probabilidade
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Escolha o formato, digite a odd e clique em Calcular
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Odd a converter"
            >
              <OptionCards
                legend="Formato da odd que você tem"
                options={FORMAT_OPTIONS}
                value={form.format}
                onChange={(format) => changeForm({ format })}
                columnsClassName="grid-cols-2 md:grid-cols-4"
              />

              <div className="md:max-w-md">
                {form.format === "decimal" && (
                  <OddsInput
                    label="Odd decimal"
                    placeholder="2,50"
                    value={form.decimal}
                    onChange={(decimal) => changeForm({ decimal })}
                  />
                )}

                {form.format === "fracionaria" && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        id={numeratorId}
                        label="Numerador"
                        placeholder="3"
                        value={form.numerator}
                        onChange={(e) => changeForm({ numerator: e.target.value })}
                        {...integerInputProps}
                      />
                    </div>
                    <span className="pb-3 text-2xl text-text-secondary" aria-hidden="true">
                      /
                    </span>
                    <div className="flex-1">
                      <Input
                        id={denominatorId}
                        label="Denominador"
                        placeholder="2"
                        value={form.denominator}
                        onChange={(e) => changeForm({ denominator: e.target.value })}
                        {...integerInputProps}
                      />
                    </div>
                  </div>
                )}

                {form.format === "americana" && (
                  <div className="space-y-4">
                    <OptionCards
                      legend="Sinal da odd americana"
                      options={[
                        { value: "+" as const, label: "+ (azarão)", description: "Ex.: +150" },
                        { value: "-" as const, label: "− (favorito)", description: "Ex.: -200" },
                      ]}
                      value={form.americanSign}
                      onChange={(americanSign) => changeForm({ americanSign })}
                    />
                    <Input
                      id={americanId}
                      label="Valor da odd americana (sem o sinal)"
                      placeholder="150"
                      value={form.american}
                      onChange={(e) => changeForm({ american: e.target.value })}
                      {...integerInputProps}
                      min={100}
                    />
                  </div>
                )}

                {form.format === "probabilidade" && (
                  <RateInput
                    label="Probabilidade"
                    placeholder="40,00%"
                    value={form.probability}
                    onChange={(probability) => changeForm({ probability })}
                    fullWidth
                    className="h-12 text-lg"
                  />
                )}

                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <FieldFeedback
                      error={errors.value}
                      hint={
                        form.format === "americana"
                          ? "Positiva: lucro em R$ 100. Negativa: quanto apostar para lucrar R$ 100."
                          : "Digite a odd como aparece na casa ou no site de referência"
                      }
                    />
                  </div>
                  <div className="mt-1">
                    <HelpTooltip term="formatos de odd">
                      Casas brasileiras usam odds decimais. Sites britânicos usam frações (lucro ÷
                      aposta) e americanos usam +/- em relação a R$ 100.
                    </HelpTooltip>
                  </div>
                </div>
              </div>

              <CalculatorActions onReset={handleReset} />
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4">
        {calculated && <ResultCard conversion={calculated} />}
      </div>

      <BettingDisclaimer />
    </div>
  );
}

export default ConversorOddsCalculator;
