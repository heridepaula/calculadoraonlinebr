import { useEffect, useMemo, useRef, useState, type FormEvent, type RefObject } from "react";
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

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/** Uma seleção da lista dinâmica; `odd` guarda o texto pt-BR do campo com máscara ("2,10") */
export interface DutchingSelection {
  id: string;
  odd: string;
}

export interface DutchingInput {
  /** Valor total a distribuir entre as seleções, em R$ (> 0) */
  investment: number;
  /** Odds decimais válidas (> 1.00), na ordem da lista */
  odds: number[];
}

export interface DutchingLeg {
  odds: number;
  /** Probabilidade implícita: 1 / odd */
  impliedProbability: number;
  /** Stake exata desta seleção */
  stake: number;
  /** Stake arredondada ao centavo, como as casas aceitam */
  stakeRounded: number;
  /** Lucro líquido se esta seleção vencer (igual para todas) */
  profitIfWins: number;
}

export interface DutchingResult {
  /** Soma das probabilidades implícitas das seleções */
  totalProbability: number;
  /** true quando a soma é menor que 1: vencer qualquer seleção dá lucro */
  isProfitable: boolean;
  /** Retorno se qualquer seleção vencer: investimento ÷ probabilidade total */
  totalReturn: number;
  /** Lucro (ou prejuízo, se negativo) quando uma das seleções vence */
  profit: number;
  /** Lucro em % do investimento */
  roi: number;
  /** Odd única que pagaria o mesmo: 1 ÷ probabilidade total */
  equivalentOdds: number;
  legs: DutchingLeg[];
}

export interface DutchingFieldErrors {
  investment?: string;
  /** Erro de cada seleção, pelo id */
  odds: Record<string, string>;
  /** Erro da lista como um todo (ex.: menos de 2 odds válidas) */
  list?: string;
}

export interface DutchingCalculatorProps {
  /** Valor inicial do investimento em R$ (padrão: 100) */
  defaultInvestment?: number;
  className?: string;
}

interface FormState {
  investment: string;
  selections: DutchingSelection[];
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export const MIN_SELECTIONS = 2;
export const MAX_SELECTIONS = 10;

/** Tolerância para ruído de ponto flutuante ao comparar a probabilidade total com 1 */
const EPSILON = 1e-12;

const roundToCents = (value: number) => Math.round(value * 100) / 100;

/**
 * Calcula a distribuição do dutching.
 *
 * retorno = investimento ÷ Σ(1/odd); stake_i = (1/odd_i) × retorno. Assim, qualquer seleção
 * vencedora devolve o mesmo retorno. Pressupõe odds > 1 (garantido por validateDutchingForm).
 */
export function calculateDutching({ investment, odds }: DutchingInput): DutchingResult {
  const probabilities = odds.map((odd) => 1 / odd);
  const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);
  const totalReturn = investment / totalProbability;
  const profit = totalReturn - investment;

  return {
    totalProbability,
    isProfitable: totalProbability < 1 - EPSILON,
    totalReturn,
    profit,
    roi: (profit / investment) * 100,
    equivalentOdds: 1 / totalProbability,
    legs: odds.map((odd, i) => {
      const stake = probabilities[i] * totalReturn;
      return {
        odds: odd,
        impliedProbability: probabilities[i],
        stake,
        stakeRounded: roundToCents(stake),
        profitIfWins: stake * odd - investment,
      };
    }),
  };
}

/**
 * Valida os campos brutos. Odds vazias são ignoradas (a lista pode ter campos ainda não
 * preenchidos); odds inválidas (≤ 1,00) geram erro. São necessárias ao menos 2 odds válidas.
 * Com `requireAll` (clique em "Calcular"), investimento vazio e falta de odds também geram erro.
 */
export function validateDutchingForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: DutchingFieldErrors; values: DutchingInput | null } {
  const investment = parseMaskedNumber(state.investment);
  const errors: DutchingFieldErrors = { odds: {} };

  if (!Number.isFinite(investment)) {
    if (requireAll) errors.investment = "Informe o valor total do investimento.";
  } else if (!(investment > 0)) {
    errors.investment = "O investimento deve ser maior que R$ 0,00.";
  }

  const odds: number[] = [];
  for (const selection of state.selections) {
    const odd = parseMaskedNumber(selection.odd);
    if (!Number.isFinite(odd)) continue; // campo vazio: ignorado
    if (odd > 1) odds.push(odd);
    else errors.odds[selection.id] = "A odd decimal deve ser maior que 1,00.";
  }

  if (requireAll && odds.length < MIN_SELECTIONS) {
    errors.list = `Informe pelo menos ${MIN_SELECTIONS} odds para distribuir o investimento.`;
  }

  const hasErrors =
    Boolean(errors.investment) || Boolean(errors.list) || Object.keys(errors.odds).length > 0;
  const ready = Number.isFinite(investment) && odds.length >= MIN_SELECTIONS && !hasErrors;

  return { errors, values: ready ? { investment, odds } : null };
}

// ---------------------------------------------------------------------------
// Formatação
// ---------------------------------------------------------------------------

const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** "+ R$ 5,50" / "- R$ 2,30" */
function formatSignedCurrency(value: number): string {
  const rounded = roundToCents(value);
  const sign = rounded > 0 ? "+ " : rounded < 0 ? "- " : "";
  return `${sign}${currencyFormatter.format(Math.abs(rounded))}`;
}

/** "+5,50%" / "-2,30%" (recebe o valor já em pontos percentuais) */
function formatSignedPercent(value: number): string {
  const sign = value > 0.005 ? "+" : value < -0.005 ? "-" : "";
  return `${sign}${decimalFormatter.format(Math.abs(value))}%`;
}

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
  selection: DutchingSelection;
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

function ResultCard({ result, investment }: { result: DutchingResult; investment: number }) {
  const profitable = result.isProfitable;
  const profitColor = profitable ? "text-growth-green" : "text-system-error";
  const coverage = percentFormatter.format(result.totalProbability);

  return (
    <div className="space-y-6">
      {!profitable && (
        <div
          role="alert"
          className="rounded-lg border-2 border-system-warning bg-system-warning/10 p-4 text-system-warning"
        >
          <strong>⚠️ Atenção:</strong> A combinação dessas odds resulta em retorno menor que o
          investimento. Você perderá dinheiro mesmo se ganhar.
        </div>
      )}

      <Card
        className={
          profitable
            ? "border-2 border-growth-green bg-growth-green-soft"
            : "border-2 border-system-error bg-health-red-light"
        }
      >
        <CardHeader>
          <CardTitle as="h3" className={profitColor}>
            {profitable ? "✅ Lucro igual em qualquer seleção" : "⛔ Prejuízo mesmo vencendo"}
          </CardTitle>
          <p className="mt-2 text-text-primary">
            {profitable
              ? `Se qualquer uma das ${result.legs.length} seleções vencer, o lucro é o mesmo.`
              : "As odds pagam menos do que o investimento total, mesmo quando uma seleção vence."}{" "}
            Se nenhuma vencer, você perde o investimento de {currencyFormatter.format(investment)}.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricBox
              label="Investimento total"
              value={currencyFormatter.format(investment)}
              note="Soma das apostas"
              valueClassName="text-text-primary"
            />
            <MetricBox
              label="Retorno se vencer"
              value={currencyFormatter.format(result.totalReturn)}
              note="Igual para qualquer seleção"
              valueClassName="text-primary-blue-dark"
            />
            <MetricBox
              label="Lucro líquido"
              value={formatSignedCurrency(result.profit)}
              note={`ROI de ${formatSignedPercent(result.roi)}`}
              valueClassName={profitColor}
            />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-900 p-4 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <span>Cobertura (probabilidade total)</span>
                <HelpTooltip term="cobertura">
                  Soma das probabilidades implícitas das odds escolhidas. Abaixo de 100% o dutching
                  dá lucro quando uma seleção vence; acima, dá prejuízo mesmo vencendo.
                </HelpTooltip>
              </div>
              <div className="mt-1 text-xl font-bold text-text-primary">{coverage}</div>
            </div>
            <div className="rounded-lg bg-gray-900 p-4 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <span>Odd equivalente</span>
                <HelpTooltip term="odd equivalente">
                  O dutching se comporta como uma única aposta com esta odd: é o retorno total
                  dividido pelo investimento.
                </HelpTooltip>
              </div>
              <div className="mt-1 text-xl font-bold text-text-primary">
                {decimalFormatter.format(result.equivalentOdds)}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-900 p-4 sm:p-6">
            <h4 className="mb-4 font-semibold text-text-primary">Distribuição das apostas</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[360px] border-collapse text-sm">
                <caption className="sr-only">
                  Valor a apostar em cada seleção e lucro se ela vencer
                </caption>
                <thead>
                  <tr className="border-b-2 border-neutral-surface-variant">
                    <th scope="col" className="p-3 text-left font-semibold">
                      Seleção
                    </th>
                    <th
                      scope="col"
                      className="p-3 text-center font-semibold text-primary-blue-dark"
                    >
                      Odd
                    </th>
                    <th scope="col" className="p-3 text-center font-semibold text-growth-green">
                      Valor a apostar
                    </th>
                    <th scope="col" className="p-3 text-center font-semibold text-system-warning">
                      Lucro se vencer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.legs.map((leg, i) => (
                    <tr key={i} className="border-b border-neutral-surface-variant">
                      <th scope="row" className="p-3 text-left font-medium text-text-primary">
                        {i + 1}
                        <span className="block text-xs font-normal text-gray-400">
                          {percentFormatter.format(leg.impliedProbability)} de chance implícita
                        </span>
                      </th>
                      <td className="p-3 text-center text-primary-blue-dark">
                        {decimalFormatter.format(leg.odds)}
                      </td>
                      <td className="p-3 text-center text-lg font-bold text-growth-green">
                        {currencyFormatter.format(leg.stakeRounded)}
                      </td>
                      <td className={`p-3 text-center font-semibold ${profitColor}`}>
                        {formatSignedCurrency(leg.profitIfWins)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              O lucro é o mesmo qualquer que seja a seleção vencedora. Valores arredondados ao
              centavo podem variar em até R$ 0,01.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

/** Ids determinísticos: iguais no servidor e no cliente, sem conflito de hidratação */
const initialSelections = (): DutchingSelection[] => [
  { id: "dutching-odd-1", odd: "" },
  { id: "dutching-odd-2", odd: "" },
];

export function DutchingCalculator({
  defaultInvestment = 100,
  className = "",
}: DutchingCalculatorProps) {
  const initialState: FormState = {
    investment: decimalFormatter.format(defaultInvestment),
    selections: initialSelections(),
  };
  const [form, setForm] = useState<FormState>(initialState);
  // Após clicar em "Calcular", campos vazios passam a exibir erro até o próximo "Limpar"
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [calculated, setCalculated] = useState<{
    result: DutchingResult;
    investment: number;
  } | null>(null);
  // Id da seleção que deve receber foco após adicionar/remover
  const [focusId, setFocusId] = useState<string | null>(null);
  const nextId = useRef(3);
  const inputsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Odds inválidas (≤ 1,00) são sinalizadas durante a digitação; vazias são ignoradas
  const { errors } = useMemo(() => validateDutchingForm(form, { requireAll }), [form, requireAll]);

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
    const id = `dutching-odd-${nextId.current++}`;
    changeForm((prev) => ({ ...prev, selections: [...prev.selections, { id, odd: "" }] }));
    setFocusId(id);
  };

  const removeSelection = (index: number) => {
    const previous = form.selections[index - 1];
    changeForm((prev) => ({
      ...prev,
      selections: prev.selections.filter((_, i) => i !== index),
    }));
    // Mantém o foco no fluxo do formulário: vai para a seleção anterior
    setFocusId(previous?.id ?? null);
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
    const { values } = validateDutchingForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateDutching(values), investment: values.investment });
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
            <CardTitle as="h2">⚽ Dados do Dutching</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">
                Distribua o investimento entre várias seleções:
              </p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  stake = (1/odd) × investimento ÷ Σ(1/odd)
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver quanto apostar em cada seleção
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados do dutching"
            >
              <div className="md:max-w-sm">
                <MoneyInput
                  label="Valor total do investimento"
                  placeholder="100,00"
                  value={form.investment}
                  onChange={(investment) => changeForm((prev) => ({ ...prev, investment }))}
                  fullWidth
                  className="h-12 text-lg"
                />
                <FieldFeedback
                  error={errors.investment}
                  hint="Montante a distribuir entre todas as seleções"
                />
              </div>

              <fieldset>
                <legend className="mb-2 flex items-center gap-2 text-base font-medium text-text-primary-dark md:text-sm">
                  Seleções ({form.selections.length}/{MAX_SELECTIONS})
                  <HelpTooltip term="seleção">
                    Cada seleção é um resultado em que você quer apostar, como vários placares
                    exatos ou vários cavalos. Campos vazios são ignorados no cálculo.
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

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4">
        {calculated && <ResultCard result={calculated.result} investment={calculated.investment} />}
      </div>

      <p className="text-center text-xs leading-relaxed text-text-secondary">
        Apostas envolvem risco financeiro. Esta calculadora é uma ferramenta matemática e não
        garante lucros: se nenhuma seleção vencer, todo o investimento é perdido. Jogue com
        responsabilidade. (18+)
      </p>
    </div>
  );
}

export default DutchingCalculator;
