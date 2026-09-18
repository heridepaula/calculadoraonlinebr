import { useId, useMemo, useRef, useState, type FormEvent, type RefObject } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  MoneyInput,
  OddsInput,
  RateInput,
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type KellyFraction = 1 | 0.5 | 0.25;

export interface KellyInput {
  /** Banca atual em R$ (> 0) */
  bankroll: number;
  /** Odd decimal oferecida (> 1.00) */
  odds: number;
  /** Probabilidade estimada em % (0.01 a 99.99) */
  probabilityPercent: number;
  /** Fração de Kelly aplicada como ajuste de risco */
  fraction: KellyFraction;
}

export interface KellyResult {
  /** f* original (Kelly Full), pode ser negativo */
  fullKelly: number;
  /** f* multiplicado pela fração, antes do limite de segurança */
  adjustedKelly: number;
  /** Fração final sugerida da banca (0 a MAX_STAKE_FRACTION) */
  suggestedFraction: number;
  /** Valor da aposta em R$ */
  stake: number;
  /** true quando a aposta tem valor esperado positivo */
  isPositiveEV: boolean;
  /** true quando a sugestão foi limitada pelo teto de segurança */
  isCapped: boolean;
  /** Valor esperado por R$ 1 apostado (p * odd - 1) */
  expectedValuePerUnit: number;
  /** Probabilidade implícita da odd (1 / odd) */
  impliedProbability: number;
}

export type KellyFieldErrors = Partial<Record<"bankroll" | "odds" | "probabilityPercent", string>>;

export interface KellyCriterionCalculatorProps {
  /** Fração inicial selecionada (padrão: Half Kelly) */
  defaultFraction?: KellyFraction;
  className?: string;
}

interface KellyFormState {
  bankroll: string;
  odds: string;
  probabilityPercent: string;
  fraction: KellyFraction;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const MAX_STAKE_FRACTION = 0.1;
export const MIN_PROBABILITY_PERCENT = 0.01;
export const MAX_PROBABILITY_PERCENT = 99.99;

/** Tolerância para ruído de ponto flutuante ao comparar f* com zero */
const EPSILON = 1e-12;

export const KELLY_FRACTION_OPTIONS: ReadonlyArray<{
  value: KellyFraction;
  label: string;
  description: string;
}> = [
  { value: 1, label: "Kelly Full", description: "100% · agressivo" },
  { value: 0.5, label: "Half Kelly", description: "50% · recomendado" },
  { value: 0.25, label: "Quarter Kelly", description: "25% · conservador" },
];

/**
 * Calcula a stake sugerida pelo Critério de Kelly.
 *
 * f* = ((b * p) - q) / b, onde b = odd - 1, p = prob / 100 e q = 1 - p.
 * O resultado é multiplicado pela fração escolhida, zerado quando EV <= 0
 * e limitado a MAX_STAKE_FRACTION da banca por segurança.
 */
export function calculateKelly({
  bankroll,
  odds,
  probabilityPercent,
  fraction,
}: KellyInput): KellyResult {
  const p = probabilityPercent / 100;
  const q = 1 - p;
  const b = odds - 1;

  const fullKelly = (b * p - q) / b;
  const adjustedKelly = fullKelly * fraction;
  const isPositiveEV = adjustedKelly > EPSILON;
  const isCapped = isPositiveEV && adjustedKelly > MAX_STAKE_FRACTION;

  const suggestedFraction = !isPositiveEV ? 0 : isCapped ? MAX_STAKE_FRACTION : adjustedKelly;

  return {
    fullKelly,
    adjustedKelly,
    suggestedFraction,
    stake: suggestedFraction * bankroll,
    isPositiveEV,
    isCapped,
    expectedValuePerUnit: p * odds - 1,
    impliedProbability: 1 / odds,
  };
}

/**
 * Valida os campos brutos do formulário. Retorna os números quando válidos.
 * Com `requireAll`, campos vazios também geram erro (usado ao clicar em "Calcular").
 */
export function validateKellyForm(
  state: {
    bankroll: string;
    odds: string;
    probabilityPercent: string;
  },
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: KellyFieldErrors; values: Omit<KellyInput, "fraction"> | null } {
  const bankroll = parseMaskedNumber(state.bankroll);
  const odds = parseMaskedNumber(state.odds);
  const probabilityPercent = parseMaskedNumber(state.probabilityPercent);
  const errors: KellyFieldErrors = {};

  if (requireAll) {
    if (!Number.isFinite(bankroll)) errors.bankroll = "Informe o valor da sua banca.";
    if (!Number.isFinite(odds)) errors.odds = "Informe a odd oferecida.";
    if (!Number.isFinite(probabilityPercent)) {
      errors.probabilityPercent = "Informe a probabilidade estimada.";
    }
  }

  if (Number.isFinite(bankroll) && !(bankroll > 0)) {
    errors.bankroll = "A banca deve ser maior que R$ 0,00.";
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
    Number.isFinite(bankroll) && Number.isFinite(odds) && Number.isFinite(probabilityPercent);
  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    values: allFilled && !hasErrors ? { bankroll, odds, probabilityPercent } : null,
  };
}

// ---------------------------------------------------------------------------
// Formatação
// ---------------------------------------------------------------------------

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const signedPercentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: "exceptZero",
});

// ---------------------------------------------------------------------------
// Subcomponentes
// ---------------------------------------------------------------------------

interface FractionSelectorProps {
  value: KellyFraction;
  onChange: (value: KellyFraction) => void;
}

function FractionSelector({ value, onChange }: FractionSelectorProps) {
  const name = useId();

  return (
    <fieldset>
      <legend className="mb-1 block text-base font-medium text-text-primary-dark md:text-sm">
        Ajuste de risco (fração de Kelly)
      </legend>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {KELLY_FRACTION_OPTIONS.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={`relative flex min-h-[56px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 px-2 py-2 text-center transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-blue-dark ${
                checked
                  ? "border-primary-blue-dark bg-primary-blue-light text-text-primary"
                  : "border-neutral-surface-variant bg-background-dark-secondary text-text-secondary hover:border-primary-blue/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                // Não usar sr-only: globals.css torna .sr-only:focus visível (padrão de skip link),
                // o que faria o círculo do radio aparecer ao clicar
                className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
              />
              <span className="text-sm font-semibold leading-tight sm:text-base">
                {option.label}
              </span>
              <span
                className={`mt-0.5 text-[11px] leading-tight sm:text-xs ${
                  checked ? "text-primary-blue-dark" : "text-text-secondary"
                }`}
              >
                {option.description}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

interface MetricBoxProps {
  label: string;
  value: string;
  note: string;
  valueClassName: string;
}

function MetricBox({ label, value, note, valueClassName }: MetricBoxProps) {
  return (
    <div className="rounded-lg bg-gray-900 p-6 text-center">
      <div className={`text-3xl font-bold ${valueClassName}`}>{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
      <div className="mt-2 text-xs text-gray-400">{note}</div>
    </div>
  );
}

interface ResultCardProps {
  result: KellyResult;
  bankroll: number;
  probabilityPercent: number;
}

function ResultCard({ result, bankroll, probabilityPercent }: ResultCardProps) {
  const impliedBox = (
    <MetricBox
      label="Probabilidade implícita da odd"
      value={percentFormatter.format(result.impliedProbability)}
      note={`Sua estimativa: ${percentFormatter.format(probabilityPercent / 100)}`}
      valueClassName="text-text-primary"
    />
  );

  if (!result.isPositiveEV) {
    return (
      <Card className="border-2 border-system-error bg-health-red-light">
        <CardHeader>
          <CardTitle as="h3" className="text-system-error">
            ⛔ NÃO APOSTE! Aposta sem valor (EV-)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-text-primary">
            Pela sua estimativa, essa odd paga menos do que o risco justifica. Para ter valor, a sua
            probabilidade precisaria ser maior que{" "}
            <strong>{percentFormatter.format(result.impliedProbability)}</strong>.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MetricBox
              label="Valor esperado"
              value={signedPercentFormatter.format(result.expectedValuePerUnit)}
              note="Retorno médio por R$ 1 apostado no longo prazo"
              valueClassName="text-system-error"
            />
            {impliedBox}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-growth-green bg-growth-green-soft">
      <CardHeader>
        <CardTitle as="h3" className="text-growth-green">
          ✅ Aposta de Valor (EV+)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-lg bg-gray-900 p-6 text-center">
          <div className="mb-2 text-sm text-text-secondary">Valor da aposta (stake)</div>
          <div className="text-4xl font-extrabold text-growth-green sm:text-5xl">
            {currencyFormatter.format(result.stake)}
          </div>
          <div className="mt-2 text-sm text-text-secondary">
            <strong className="text-text-primary">
              {percentFormatter.format(result.suggestedFraction)}
            </strong>{" "}
            da banca de {currencyFormatter.format(bankroll)}
          </div>
        </div>

        {result.isCapped && (
          <div className="mb-6 rounded-lg border border-system-warning/40 bg-system-warning/10 p-4 text-sm text-system-warning">
            ⚠️ <strong>Limitado a 10% por segurança.</strong> O Kelly ajustado sugeria{" "}
            {percentFormatter.format(result.adjustedKelly)} da banca.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MetricBox
            label="Porcentagem sugerida"
            value={percentFormatter.format(result.suggestedFraction)}
            note="Fração final da banca, já com ajuste de risco"
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Kelly Full (f*)"
            value={percentFormatter.format(result.fullKelly)}
            note="Resultado da fórmula antes do ajuste de risco"
            valueClassName="text-system-warning"
          />
          <MetricBox
            label="Valor esperado"
            value={signedPercentFormatter.format(result.expectedValuePerUnit)}
            note="Retorno médio por R$ 1 apostado no longo prazo"
            valueClassName="text-growth-green"
          />
          {impliedBox}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function KellyCriterionCalculator({
  defaultFraction = 0.5,
  className = "",
}: KellyCriterionCalculatorProps) {
  const initialState: KellyFormState = {
    bankroll: "",
    odds: "",
    probabilityPercent: "",
    fraction: defaultFraction,
  };
  const [form, setForm] = useState<KellyFormState>(initialState);
  // Após clicar em "Calcular", campos vazios passam a exibir erro até o próximo "Limpar"
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [calculated, setCalculated] = useState<ResultCardProps | null>(null);
  const inputsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Valores inválidos (ex.: odd 0,50) são sinalizados durante a digitação
  const { errors } = useMemo(() => validateKellyForm(form, { requireAll }), [form, requireAll]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<KellyFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const updateField = (field: keyof Omit<KellyFormState, "fraction">) => (value: string) =>
    changeForm({ [field]: value });

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
    const { values } = validateKellyForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({
      result: calculateKelly({ ...values, fraction: form.fraction }),
      bankroll: values.bankroll,
      probabilityPercent: values.probabilityPercent,
    });
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
              <p className="text-lg text-text-secondary">
                Calcule quanto apostar pelo Critério de Kelly:
              </p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-xl font-bold text-primary-blue-dark">
                  f* = (b × p − q) ÷ b
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver a stake ideal
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
                  <MoneyInput
                    label="Banca atual"
                    placeholder="1.000,00"
                    value={form.bankroll}
                    onChange={updateField("bankroll")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.bankroll}
                    hint="Total separado exclusivamente para apostas"
                  />
                </div>
                <div>
                  <OddsInput
                    label="Odd oferecida (decimal)"
                    placeholder="2,10"
                    value={form.odds}
                    onChange={updateField("odds")}
                  />
                  <FieldFeedback error={errors.odds} hint="Ex.: 2,10 paga R$ 2,10 por R$ 1" />
                </div>
                <div>
                  <RateInput
                    label="Probabilidade estimada"
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

              <FractionSelector
                value={form.fraction}
                onChange={(fraction) => changeForm({ fraction })}
              />

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

      <div ref={resultRef} aria-live="polite" aria-atomic="true" className="scroll-mt-4">
        {calculated && <ResultCard {...calculated} />}
      </div>

      <p className="text-center text-xs leading-relaxed text-text-secondary">
        Apostas envolvem risco financeiro. Esta calculadora é uma ferramenta matemática e não
        garante lucros. Jogue com responsabilidade. (18+)
      </p>
    </div>
  );
}

export default KellyCriterionCalculator;
