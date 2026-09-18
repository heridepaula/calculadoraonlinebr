import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
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
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";
import {
  BettingDisclaimer,
  CalculatorActions,
  MetricBox,
  currencyFormatter,
  decimalFormatter,
  formatSignedCurrency,
  percentFormatter,
  useCalculatorScroll,
} from "./betting-shared";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface MultiplaSelection {
  id: string;
  /** Texto pt-BR do campo com máscara ("2,10") */
  odd: string;
}

export interface MultiplaInput {
  /** Valor apostado em R$ (> 0) */
  stake: number;
  /** Odds decimais válidas (> 1.00), na ordem da lista */
  odds: number[];
}

export interface MultiplaStep {
  odds: number;
  /** Odd combinada até esta seleção */
  cumulativeOdds: number;
  /** Retorno se as seleções até aqui vencerem */
  cumulativeReturn: number;
}

export interface MultiplaResult {
  /** Produto de todas as odds */
  combinedOdds: number;
  /** Retorno se todas as seleções vencerem: stake × odd combinada */
  potentialReturn: number;
  /** Lucro líquido se todas vencerem */
  profit: number;
  /** Chance implícita de todas vencerem: 1 ÷ odd combinada */
  impliedProbability: number;
  steps: MultiplaStep[];
}

export interface MultiplaFieldErrors {
  stake?: string;
  odds: Record<string, string>;
  list?: string;
}

export interface MultiplaCalculatorProps {
  /** Valor inicial da aposta em R$ (padrão: 10) */
  defaultStake?: number;
  className?: string;
}

interface FormState {
  stake: string;
  selections: MultiplaSelection[];
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const MIN_SELECTIONS = 2;
export const MAX_SELECTIONS = 20;

/** Calcula a múltipla (acumulada): odd combinada = produto das odds. */
export function calculateMultipla({ stake, odds }: MultiplaInput): MultiplaResult {
  let cumulativeOdds = 1;
  const steps = odds.map((odd) => {
    cumulativeOdds *= odd;
    return { odds: odd, cumulativeOdds, cumulativeReturn: stake * cumulativeOdds };
  });
  const potentialReturn = stake * cumulativeOdds;

  return {
    combinedOdds: cumulativeOdds,
    potentialReturn,
    profit: potentialReturn - stake,
    impliedProbability: 1 / cumulativeOdds,
    steps,
  };
}

/**
 * Margem da casa acumulada numa múltipla de `selections` seleções, se cada uma tiver margem
 * `marginPerSelection` (ex.: 0,05 = 5%): 1 − 1 ÷ (1 + m)^n.
 */
export function accumulatedMargin(selections: number, marginPerSelection: number): number {
  return 1 - 1 / (1 + marginPerSelection) ** selections;
}

/**
 * Valida os campos brutos. Odds vazias são ignoradas; odds ≤ 1,00 geram erro. São necessárias
 * ao menos 2 odds válidas. Com `requireAll` (clique em "Calcular"), vazios também geram erro.
 */
export function validateMultiplaForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: MultiplaFieldErrors; values: MultiplaInput | null } {
  const stake = parseMaskedNumber(state.stake);
  const errors: MultiplaFieldErrors = { odds: {} };

  if (!Number.isFinite(stake)) {
    if (requireAll) errors.stake = "Informe o valor da aposta.";
  } else if (!(stake > 0)) {
    errors.stake = "O valor da aposta deve ser maior que R$ 0,00.";
  }

  const odds: number[] = [];
  for (const selection of state.selections) {
    const odd = parseMaskedNumber(selection.odd);
    if (!Number.isFinite(odd)) continue; // campo vazio: ignorado
    if (odd > 1) odds.push(odd);
    else errors.odds[selection.id] = "A odd decimal deve ser maior que 1,00.";
  }

  if (requireAll && odds.length < MIN_SELECTIONS) {
    errors.list = `Informe pelo menos ${MIN_SELECTIONS} odds para montar a múltipla.`;
  }

  const hasErrors =
    Boolean(errors.stake) || Boolean(errors.list) || Object.keys(errors.odds).length > 0;
  const ready = Number.isFinite(stake) && odds.length >= MIN_SELECTIONS && !hasErrors;

  return { errors, values: ready ? { stake, odds } : null };
}

const integerFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

// ---------------------------------------------------------------------------
// Subcomponentes
// ---------------------------------------------------------------------------

function SelectionField({
  selection,
  index,
  removable,
  error,
  onChange,
  onRemove,
}: {
  selection: MultiplaSelection;
  index: number;
  removable: boolean;
  error?: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  return (
    <li>
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <OddsInput
            id={selection.id}
            label={`Odd da seleção ${index + 1}`}
            placeholder="0,00"
            value={selection.odd}
            onChange={onChange}
          />
        </div>
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remover seleção ${index + 1}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-neutral-surface-variant text-xl text-text-secondary transition-colors hover:border-system-error hover:text-system-error focus:outline-none focus-visible:ring-2 focus-visible:ring-system-error"
          >
            <span aria-hidden="true">✕</span>
          </button>
        )}
      </div>
      {error && (
        <div role="alert" className="mt-1 text-sm text-system-error">
          {error}
        </div>
      )}
    </li>
  );
}

function ResultCard({ result, stake }: { result: MultiplaResult; stake: number }) {
  return (
    <Card className="border-2 border-primary-blue-dark bg-primary-blue-light">
      <CardHeader>
        <CardTitle as="h3" className="text-primary-blue-dark">
          🎟️ Resultado da Múltipla ({result.steps.length} seleções)
        </CardTitle>
        <p className="mt-2 text-text-primary">
          Todas as seleções precisam vencer. Se uma falhar, a aposta de{" "}
          {currencyFormatter.format(stake)} é perdida.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricBox
            label="Odd combinada"
            value={decimalFormatter.format(result.combinedOdds)}
            note="Produto de todas as odds"
            valueClassName="text-system-warning"
          />
          <MetricBox
            label="Retorno potencial"
            value={currencyFormatter.format(result.potentialReturn)}
            note="Se todas vencerem"
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Lucro se acertar"
            value={formatSignedCurrency(result.profit)}
            note="Retorno − valor apostado"
            valueClassName="text-growth-green"
          />
          <MetricBox
            label="Chance implícita"
            value={percentFormatter.format(result.impliedProbability)}
            note={`Cerca de 1 em ${integerFormatter.format(result.combinedOdds)}`}
            valueClassName="text-text-primary"
          />
        </div>

        <div className="rounded-lg bg-gray-900 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <h4 className="font-semibold text-text-primary">Como a odd se acumula</h4>
            <HelpTooltip term="odd acumulada">
              Cada seleção multiplica a odd anterior. O retorno só é pago se todas as seleções da
              lista vencerem.
            </HelpTooltip>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <caption className="sr-only">Odd e retorno acumulados a cada seleção</caption>
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th scope="col" className="p-3 text-left font-semibold">
                    Seleção
                  </th>
                  <th scope="col" className="p-3 text-center font-semibold text-primary-blue-dark">
                    Odd
                  </th>
                  <th scope="col" className="p-3 text-center font-semibold text-system-warning">
                    Odd acumulada
                  </th>
                  <th scope="col" className="p-3 text-center font-semibold text-growth-green">
                    Retorno acumulado
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.steps.map((step, i) => (
                  <tr key={i} className="border-b border-neutral-surface-variant">
                    <th scope="row" className="p-3 text-left font-medium text-text-primary">
                      {i + 1}
                    </th>
                    <td className="p-3 text-center text-primary-blue-dark">
                      {decimalFormatter.format(step.odds)}
                    </td>
                    <td className="p-3 text-center text-system-warning">
                      {decimalFormatter.format(step.cumulativeOdds)}
                    </td>
                    <td className="p-3 text-center font-semibold text-growth-green">
                      {currencyFormatter.format(step.cumulativeReturn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

/** Ids determinísticos: iguais no servidor e no cliente, sem conflito de hidratação */
const initialSelections = (): MultiplaSelection[] => [
  { id: "multipla-odd-1", odd: "" },
  { id: "multipla-odd-2", odd: "" },
];

export function MultiplaCalculator({ defaultStake = 10, className = "" }: MultiplaCalculatorProps) {
  const initialState: FormState = {
    stake: decimalFormatter.format(defaultStake),
    selections: initialSelections(),
  };
  const [form, setForm] = useState<FormState>(initialState);
  // Após clicar em "Calcular", campos vazios passam a exibir erro até o próximo "Limpar"
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [calculated, setCalculated] = useState<{ result: MultiplaResult; stake: number } | null>(
    null
  );
  const [focusId, setFocusId] = useState<string | null>(null);
  const nextId = useRef(3);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();

  const { errors } = useMemo(() => validateMultiplaForm(form, { requireAll }), [form, requireAll]);

  useEffect(() => {
    if (!focusId) return;
    document.getElementById(focusId)?.focus();
    setFocusId(null);
  }, [focusId]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (update: (prev: FormState) => FormState) => {
    setForm(update);
    setCalculated(null);
  };

  const updateSelection = (id: string) => (odd: string) =>
    changeForm((prev) => ({
      ...prev,
      selections: prev.selections.map((s) => (s.id === id ? { ...s, odd } : s)),
    }));

  const addSelection = () => {
    if (form.selections.length >= MAX_SELECTIONS) return;
    const id = `multipla-odd-${nextId.current++}`;
    changeForm((prev) => ({ ...prev, selections: [...prev.selections, { id, odd: "" }] }));
    setFocusId(id);
  };

  const removeSelection = (index: number) => {
    const previous = form.selections[index - 1];
    changeForm((prev) => ({ ...prev, selections: prev.selections.filter((_, i) => i !== index) }));
    setFocusId(previous?.id ?? null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validateMultiplaForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateMultipla(values), stake: values.stake });
    scrollTo(resultRef);
  };

  const handleReset = () => {
    nextId.current = 3;
    setForm(initialState);
    setRequireAll(false);
    setCalculated(null);
    scrollTo(inputsRef);
  };

  const atMax = form.selections.length >= MAX_SELECTIONS;

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">🎟️ Dados da Múltipla</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">Calcule o retorno da sua acumulada:</p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  retorno = valor × odd₁ × odd₂ × … × oddₙ
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver a odd combinada e o retorno
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados da múltipla"
            >
              <div className="md:max-w-sm">
                <MoneyInput
                  label="Valor da aposta"
                  placeholder="10,00"
                  value={form.stake}
                  onChange={(stake) => changeForm((prev) => ({ ...prev, stake }))}
                  fullWidth
                  className="h-12 text-lg"
                />
                <FieldFeedback error={errors.stake} hint="Quanto você vai apostar na múltipla" />
              </div>

              <fieldset>
                <legend className="mb-2 flex items-center gap-2 text-base font-medium text-text-primary-dark md:text-sm">
                  Seleções ({form.selections.length}/{MAX_SELECTIONS})
                  <HelpTooltip term="seleção">
                    Cada seleção é um palpite da múltipla (ex.: vitória do time A, mais de 2,5 gols
                    no jogo B). Campos vazios são ignorados no cálculo.
                  </HelpTooltip>
                </legend>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {form.selections.map((selection, index) => (
                    <SelectionField
                      key={selection.id}
                      selection={selection}
                      index={index}
                      removable={index >= MIN_SELECTIONS}
                      error={errors.odds[selection.id]}
                      onChange={updateSelection(selection.id)}
                      onRemove={() => removeSelection(index)}
                    />
                  ))}
                </ul>
                {errors.list && (
                  <div role="alert" className="mt-2 text-sm text-system-error">
                    {errors.list}
                  </div>
                )}
                <div className="mt-4 flex flex-col items-start gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSelection}
                    disabled={atMax}
                    className="w-full sm:w-auto"
                  >
                    + Adicionar Seleção
                  </Button>
                  {atMax && (
                    <span className="text-xs text-text-secondary">
                      Limite de {MAX_SELECTIONS} seleções atingido
                    </span>
                  )}
                </div>
              </fieldset>

              <CalculatorActions onReset={handleReset} />
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4">
        {calculated && <ResultCard result={calculated.result} stake={calculated.stake} />}
      </div>

      <BettingDisclaimer extra="se qualquer seleção da múltipla falhar, todo o valor apostado é perdido" />
    </div>
  );
}

export default MultiplaCalculator;
