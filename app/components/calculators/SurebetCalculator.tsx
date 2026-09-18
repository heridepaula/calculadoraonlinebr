import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
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

export type MarketType = 2 | 3;

export interface SurebetInput {
  /** Valor total a distribuir entre as apostas, em R$ (> 0) */
  investment: number;
  /** Odds decimais de cada resultado (2 ou 3 valores, todos > 1.00) */
  odds: number[];
}

export interface SurebetLeg {
  odds: number;
  /** Stake exata que iguala o retorno de todas as pernas */
  stake: number;
  /** Stake arredondada ao centavo, como as casas aceitam */
  stakeRounded: number;
  /** Retorno se esta perna vencer: stake × odd (igual ao retorno total) */
  potentialReturn: number;
}

export interface SurebetResult {
  /** Soma das probabilidades implícitas (1/odd); abaixo de 1 há surebet */
  margin: number;
  isSurebet: boolean;
  /** Retorno garantido, qualquer que seja o resultado: investimento ÷ margem */
  totalReturn: number;
  /** Lucro (ou prejuízo, se negativo) garantido: retorno − investimento */
  profit: number;
  /** Lucro em % do investimento */
  roi: number;
  legs: SurebetLeg[];
}

export interface IntegerStakesResult {
  stakes: number[];
  total: number;
  /** Menor lucro entre os resultados possíveis com as stakes inteiras */
  minProfit: number;
  /** Maior lucro entre os resultados possíveis com as stakes inteiras */
  maxProfit: number;
}

export type SurebetFieldErrors = Partial<
  Record<"investment" | "odds1" | "odds2" | "odds3", string>
>;

export interface SurebetCalculatorProps {
  /** Valor inicial do investimento em R$ (padrão: 1000) */
  defaultInvestment?: number;
  /** Tipo de mercado inicial (padrão: 2 resultados) */
  defaultMarket?: MarketType;
  className?: string;
}

interface FormState {
  investment: string;
  market: MarketType;
  odds1: string;
  odds2: string;
  odds3: string;
}

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

/** Tolerância para ruído de ponto flutuante ao comparar a margem com 1 */
const EPSILON = 1e-12;

export const MARKET_OPTIONS: ReadonlyArray<{
  value: MarketType;
  label: string;
  description: string;
}> = [
  { value: 2, label: "2 Resultados", description: "Tênis, Over/Under" },
  { value: 3, label: "3 Resultados", description: "Futebol 1X2" },
];

/** Nome de cada resultado por tipo de mercado, usado nos campos e na tabela */
export const OUTCOME_LABELS: Record<MarketType, string[]> = {
  2: ["Resultado A (ex.: jogador 1 / Over)", "Resultado B (ex.: jogador 2 / Under)"],
  3: ["Vitória do mandante (1)", "Empate (X)", "Vitória do visitante (2)"],
};

const roundToCents = (value: number) => Math.round(value * 100) / 100;

/** Margem de arbitragem: soma de 1/odd de todos os resultados. */
export function calculateMargin(odds: number[]): number {
  return odds.reduce((sum, odd) => sum + 1 / odd, 0);
}

/**
 * Calcula a distribuição de uma surebet.
 *
 * retorno = investimento ÷ margem; stake de cada perna = retorno ÷ odd, o que faz todas as
 * pernas devolverem o mesmo valor. Pressupõe odds > 1 (garantido por validateSurebetForm).
 */
export function calculateSurebet({ investment, odds }: SurebetInput): SurebetResult {
  const margin = calculateMargin(odds);
  const totalReturn = investment / margin;
  const profit = totalReturn - investment;

  return {
    margin,
    isSurebet: margin < 1 - EPSILON,
    totalReturn,
    profit,
    roi: (profit / investment) * 100,
    legs: odds.map((odd) => {
      const stake = totalReturn / odd;
      return { odds: odd, stake, stakeRounded: roundToCents(stake), potentialReturn: stake * odd };
    }),
  };
}

/**
 * Arredonda as stakes para reais inteiros (dica anti-limitação) e mostra o efeito no lucro:
 * como as pernas deixam de ter retorno idêntico, o lucro passa a variar por resultado.
 */
export function roundStakesToInteger(legs: SurebetLeg[]): IntegerStakesResult {
  const stakes = legs.map((leg) => Math.round(leg.stake));
  const total = stakes.reduce((sum, stake) => sum + stake, 0);
  const profits = legs.map((leg, i) => stakes[i] * leg.odds - total);

  return { stakes, total, minProfit: Math.min(...profits), maxProfit: Math.max(...profits) };
}

/**
 * Valida os campos brutos (strings pt-BR dos campos com máscara). Valores fora da faixa sempre
 * geram erro; campos vazios só geram erro com `requireAll` (usado ao clicar em "Calcular").
 * A odd 3 só é considerada no mercado de 3 resultados.
 */
export function validateSurebetForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: SurebetFieldErrors; values: SurebetInput | null } {
  const investment = parseMaskedNumber(state.investment);
  const oddFields = (["odds1", "odds2", "odds3"] as const).slice(0, state.market);
  const odds = oddFields.map((field) => parseMaskedNumber(state[field]));
  const errors: SurebetFieldErrors = {};

  if (!Number.isFinite(investment)) {
    if (requireAll) errors.investment = "Informe o valor total do investimento.";
  } else if (!(investment > 0)) {
    errors.investment = "O investimento deve ser maior que R$ 0,00.";
  }

  oddFields.forEach((field, i) => {
    if (!Number.isFinite(odds[i])) {
      if (requireAll) errors[field] = `Informe a odd ${i + 1}.`;
    } else if (!(odds[i] > 1)) {
      errors[field] = "A odd decimal deve ser maior que 1,00.";
    }
  });

  const allFilled = Number.isFinite(investment) && odds.every(Number.isFinite);

  return {
    errors,
    values: allFilled && Object.keys(errors).length === 0 ? { investment, odds } : null,
  };
}

// ---------------------------------------------------------------------------
// Formatação
// ---------------------------------------------------------------------------

const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
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

interface MarketSelectorProps {
  value: MarketType;
  onChange: (value: MarketType) => void;
}

function MarketSelector({ value, onChange }: MarketSelectorProps) {
  const name = useId();

  return (
    <fieldset>
      <legend className="mb-1 block text-base font-medium text-text-primary-dark md:text-sm">
        Tipo de mercado
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {MARKET_OPTIONS.map((option) => {
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
                // Não usar sr-only: globals.css torna .sr-only:focus visível (padrão de skip link)
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

/**
 * Anima a entrada e a saída da odd 3 (grid-template-rows 0fr ↔ 1fr). Fechado, o conteúdo fica
 * `inert` e oculto de leitores de tela, então não recebe foco nem é anunciado.
 */
function Collapsible({ open, children }: { open: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `inert` ainda não é tipado no React 18, por isso é aplicado direto no DOM
    ref.current?.toggleAttribute("inert", !open);
  }, [open]);

  return (
    <div
      ref={ref}
      aria-hidden={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      {/* O padding interno dá espaço para o anel de foco, que o overflow-hidden cortaria */}
      <div className="-m-1 min-h-0 overflow-hidden p-1">{children}</div>
    </div>
  );
}

function OddField({
  index,
  market,
  value,
  error,
  onChange,
}: {
  index: number;
  market: MarketType;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const labels = OUTCOME_LABELS[market];
  return (
    <div className="mb-4 md:mb-0">
      <OddsInput
        label={`Odd ${index + 1}`}
        placeholder={["2,10", "2,05", "3,40"][index]}
        value={value}
        onChange={onChange}
      />
      <FieldFeedback error={error} hint={labels[index] ?? OUTCOME_LABELS[3][index]} />
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

function DistributionTable({ result, market }: { result: SurebetResult; market: MarketType }) {
  const totalRounded = result.legs.reduce((sum, leg) => sum + leg.stakeRounded, 0);
  const integer = roundStakesToInteger(result.legs);

  return (
    <div className="rounded-lg bg-gray-900 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <h4 className="font-semibold text-text-primary">Distribuição das apostas</h4>
        <HelpTooltip term="arredondamento das stakes">
          Dica de especialista: Arredonde os valores das stakes para o número inteiro mais próximo
          (ex: de R$ 134,57 para R$ 135,00) para evitar chamar a atenção das casas de apostas
          (limitação de conta).
        </HelpTooltip>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <caption className="sr-only">
            Valor a apostar em cada resultado e retorno de cada aposta
          </caption>
          <thead>
            <tr className="border-b-2 border-neutral-surface-variant">
              <th scope="col" className="p-3 text-left font-semibold">
                Resultado
              </th>
              <th scope="col" className="p-3 text-center font-semibold text-primary-blue-dark">
                Odd
              </th>
              <th scope="col" className="p-3 text-center font-semibold text-growth-green">
                Valor a apostar
              </th>
              <th scope="col" className="p-3 text-center font-semibold text-system-warning">
                Retorno se vencer
              </th>
            </tr>
          </thead>
          <tbody>
            {result.legs.map((leg, i) => (
              <tr key={i} className="border-b border-neutral-surface-variant">
                <th scope="row" className="p-3 text-left font-medium text-text-primary">
                  {OUTCOME_LABELS[market][i]}
                </th>
                <td className="p-3 text-center text-primary-blue-dark">
                  {decimalFormatter.format(leg.odds)}
                </td>
                <td className="p-3 text-center text-lg font-bold text-growth-green">
                  {currencyFormatter.format(leg.stakeRounded)}
                </td>
                <td className="p-3 text-center text-system-warning">
                  {currencyFormatter.format(leg.potentialReturn)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="p-3 text-left font-semibold text-text-primary">
                Total
              </th>
              <td />
              <td className="p-3 text-center font-semibold text-text-primary">
                {currencyFormatter.format(totalRounded)}
              </td>
              <td className="p-3 text-center font-semibold text-text-primary">
                {formatSignedCurrency(result.profit)} de lucro
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        O retorno é igual em todos os resultados: o lucro é garantido qualquer que seja o placar.
        Valores arredondados ao centavo podem variar em até R$ 0,01.
      </p>

      <div className="mt-4 rounded-lg border border-system-info/30 bg-system-info/10 p-4 text-sm">
        <p className="font-semibold text-system-info">
          💡 Com stakes arredondadas para reais inteiros
        </p>
        <p className="mt-1 text-text-secondary">
          {integer.stakes.map((stake) => currencyFormatter.format(stake)).join(" + ")} ={" "}
          {currencyFormatter.format(integer.total)}.{" "}
          {integer.minProfit > 0 ? (
            <>
              Lucro entre{" "}
              <strong className="text-growth-green">
                {currencyFormatter.format(integer.minProfit)}
              </strong>{" "}
              e{" "}
              <strong className="text-growth-green">
                {currencyFormatter.format(integer.maxProfit)}
              </strong>
              , conforme o resultado.
            </>
          ) : (
            <strong className="text-system-warning">
              Arredondar elimina o lucro em algum resultado (pior caso:{" "}
              {formatSignedCurrency(integer.minProfit)}). Use os valores exatos da tabela.
            </strong>
          )}
        </p>
      </div>
    </div>
  );
}

function ResultCard({ result, market }: { result: SurebetResult; market: MarketType }) {
  const marginPercent = `${decimalFormatter.format(result.margin * 100)}%`;

  if (!result.isSurebet) {
    return (
      <Card className="border-2 border-system-warning bg-system-warning/10">
        <CardHeader>
          <CardTitle as="h3" className="text-system-warning">
            ⚠️ Sem oportunidade de Surebet
          </CardTitle>
          <p className="mt-2 text-text-primary">
            A soma das probabilidades implícitas é {marginPercent}. Para haver arbitragem, ela
            precisa ficar abaixo de 100%: com essas odds, cobrir todos os resultados dá prejuízo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MetricBox
              label="Margem de arbitragem"
              value={marginPercent}
              note="Precisa ser menor que 100%"
              valueClassName="text-system-warning"
            />
            <MetricBox
              label="Resultado ao cobrir tudo"
              value={formatSignedCurrency(result.profit)}
              note={`${formatSignedPercent(result.roi)} do investimento, em qualquer resultado`}
              valueClassName="text-system-error"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-growth-green bg-growth-green-soft">
      <CardHeader>
        <CardTitle as="h3" className="text-growth-green">
          ✅ Oportunidade de Surebet Encontrada!
        </CardTitle>
        <p className="mt-2 text-text-primary">
          Distribua o investimento conforme a tabela para lucrar o mesmo valor em qualquer
          resultado.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricBox
            label="Lucro garantido"
            value={formatSignedCurrency(result.profit)}
            note="Em qualquer resultado"
            valueClassName="text-growth-green"
          />
          <MetricBox
            label="ROI"
            value={formatSignedPercent(result.roi)}
            note="Lucro sobre o investimento"
            valueClassName="text-growth-green"
          />
          <MetricBox
            label="Margem de arbitragem"
            value={marginPercent}
            note="Abaixo de 100% = surebet"
            valueClassName="text-primary-blue-dark"
          />
        </div>

        <DistributionTable result={result} market={market} />
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function SurebetCalculator({
  defaultInvestment = 1000,
  defaultMarket = 2,
  className = "",
}: SurebetCalculatorProps) {
  const initialState: FormState = {
    investment: decimalFormatter.format(defaultInvestment),
    market: defaultMarket,
    odds1: "",
    odds2: "",
    odds3: "",
  };
  const [form, setForm] = useState<FormState>(initialState);
  // Após clicar em "Calcular", campos vazios passam a exibir erro até o próximo "Limpar"
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [calculated, setCalculated] = useState<{
    result: SurebetResult;
    market: MarketType;
  } | null>(null);
  const inputsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Valores inválidos (ex.: odd 0,90) são sinalizados durante a digitação; vazios só no clique
  const { errors } = useMemo(() => validateSurebetForm(form, { requireAll }), [form, requireAll]);

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const updateField = (field: "investment" | "odds1" | "odds2" | "odds3") => (value: string) =>
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
    const { values } = validateSurebetForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateSurebet(values), market: form.market });
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(initialState);
    setRequireAll(false);
    setCalculated(null);
    scrollTo(inputsRef);
  };

  const isThreeWay = form.market === 3;

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">⚽ Dados da Surebet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">
                Calcule quanto apostar em cada resultado:
              </p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-base font-bold text-primary-blue-dark sm:text-xl">
                  margem = 1/odd₁ + 1/odd₂{isThreeWay ? " + 1/odd₃" : ""}
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular: margem abaixo de 100% é surebet
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados da surebet"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <MoneyInput
                    label="Valor total do investimento"
                    placeholder="1.000,00"
                    value={form.investment}
                    onChange={updateField("investment")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.investment}
                    hint="Montante a distribuir entre todas as apostas"
                  />
                </div>
                <MarketSelector value={form.market} onChange={(market) => changeForm({ market })} />
              </div>

              {/* Sem gap vertical: o espaçamento fica dentro de cada campo, para a odd 3 recolher
                  sem deixar um espaço vazio */}
              <div
                className={`grid grid-cols-1 md:gap-x-4 ${
                  isThreeWay ? "md:grid-cols-3" : "md:grid-cols-2"
                }`}
              >
                <OddField
                  index={0}
                  market={form.market}
                  value={form.odds1}
                  error={errors.odds1}
                  onChange={updateField("odds1")}
                />
                <OddField
                  index={1}
                  market={form.market}
                  value={form.odds2}
                  error={errors.odds2}
                  onChange={updateField("odds2")}
                />
                <Collapsible open={isThreeWay}>
                  <OddField
                    index={2}
                    market={3}
                    value={form.odds3}
                    error={isThreeWay ? errors.odds3 : undefined}
                    onChange={updateField("odds3")}
                  />
                </Collapsible>
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

      <div ref={resultRef} aria-live="polite" className="scroll-mt-4">
        {calculated && <ResultCard result={calculated.result} market={calculated.market} />}
      </div>

      <p className="text-center text-xs leading-relaxed text-text-secondary">
        Apostas envolvem risco financeiro. Esta calculadora é uma ferramenta matemática e não
        garante lucros: odds podem mudar antes da confirmação e casas podem anular apostas ou
        limitar contas. Jogue com responsabilidade. (18+)
      </p>
    </div>
  );
}

export default SurebetCalculator;
