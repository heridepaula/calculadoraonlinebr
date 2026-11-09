import { useMemo, useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  MoneyInput,
  Select,
} from "~/components/ui";
import { parseMaskedNumber } from "~/lib/utils";
import {
  IRRF_DEPENDENT_DEDUCTION,
  IRRF_SIMPLIFIED_DISCOUNT,
  LABOR_TAX_YEAR,
  calculateInss,
  calculateIrrf,
  roundCents,
  type InssResult,
  type IrrfResult,
} from "~/lib/labor/tax-tables";
import {
  CalculatorActions,
  MetricBox,
  OptionCards,
  currencyFormatter,
  percentFormatter,
  useCalculatorScroll,
} from "./betting-shared";

// ---------------------------------------------------------------------------
// Regras de negócio (funções puras)
// ---------------------------------------------------------------------------

export interface DecimoTerceiroInput {
  /** Salário bruto mensal em R$ (> 0) */
  salary: number;
  /** Média mensal de horas extras, comissões e adicionais em R$ (>= 0) */
  variableAverage: number;
  /** Meses trabalhados no ano (1 a 12); fração de 15 dias ou mais conta como mês */
  months: number;
  /** Dependentes para o Imposto de Renda */
  dependents: number;
}

export interface DecimoTerceiroResult {
  /** Remuneração mensal considerada (salário + média de variáveis) */
  monthlyBase: number;
  /** 13º bruto proporcional aos meses */
  gross: number;
  /** 1ª parcela: metade do bruto, sem descontos */
  firstInstallment: number;
  /** 2ª parcela: restante do bruto menos INSS e IRRF */
  secondInstallment: number;
  inss: InssResult;
  irrf: IrrfResult;
  /** Total líquido (1ª + 2ª parcela) */
  net: number;
  /** FGTS de 8% depositado pela empresa (não é descontado do trabalhador) */
  fgts: number;
}

export const FGTS_RATE = 0.08;

/**
 * 13º salário (Lei 4.090/1962 e Lei 4.749/1965): 1/12 da remuneração por mês trabalhado.
 * A 1ª parcela é metade do valor, sem descontos. INSS e IRRF incidem sobre o 13º inteiro,
 * separados do salário do mês, e são descontados na 2ª parcela.
 */
export function calculateDecimoTerceiro({
  salary,
  variableAverage,
  months,
  dependents,
}: DecimoTerceiroInput): DecimoTerceiroResult {
  const monthlyBase = roundCents(salary + variableAverage);
  const gross = roundCents((monthlyBase * months) / 12);
  const firstInstallment = roundCents(gross / 2);
  const inss = calculateInss(gross);
  const irrf = calculateIrrf({ taxableIncome: gross, inss: inss.contribution, dependents });
  const secondInstallment = roundCents(gross - firstInstallment - inss.contribution - irrf.tax);

  return {
    monthlyBase,
    gross,
    firstInstallment,
    secondInstallment,
    inss,
    irrf,
    net: roundCents(firstInstallment + secondInstallment),
    fgts: roundCents(gross * FGTS_RATE),
  };
}

type FieldErrors = Partial<Record<"salary" | "variableAverage", string>>;

interface FormState {
  salary: string;
  variableAverage: string;
  months: number;
  dependents: string;
}

/** Valida o formulário; com `requireAll`, o salário vazio também gera erro. */
export function validateDecimoTerceiroForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: FieldErrors; values: DecimoTerceiroInput | null } {
  const salary = parseMaskedNumber(state.salary);
  const variable = parseMaskedNumber(state.variableAverage);
  const errors: FieldErrors = {};

  if (requireAll && !Number.isFinite(salary)) errors.salary = "Informe o seu salário bruto.";
  if (Number.isFinite(salary) && !(salary > 0)) {
    errors.salary = "O salário deve ser maior que R$ 0,00.";
  }
  if (Number.isFinite(variable) && variable < 0) {
    errors.variableAverage = "A média não pode ser negativa.";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    errors,
    values:
      Number.isFinite(salary) && !hasErrors
        ? {
            salary,
            // parseMaskedNumber devolve NaN para campo vazio ou "0,00": sem variáveis
            variableAverage: Number.isFinite(variable) ? variable : 0,
            months: state.months,
            dependents: Number(state.dependents),
          }
        : null,
  };
}

// ---------------------------------------------------------------------------
// Opções do formulário
// ---------------------------------------------------------------------------

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1),
  description: i === 0 ? "mês" : "meses",
}));

const DEPENDENT_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  value: String(i),
  label: i === 0 ? "Nenhum" : i === 1 ? "1 dependente" : `${i} dependentes`,
}));

const INITIAL_STATE: FormState = {
  salary: "",
  variableAverage: "",
  months: 12,
  dependents: "0",
};

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

const brl = (value: number) => currencyFormatter.format(value);
// Mantém o sinal de menos junto do valor
const NBSP = String.fromCharCode(160);
// Alíquotas legais: "7,5%", "9%", "27,5%"
const rateFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 2,
});
const rate = (value: number) => (value === 0 ? "Isento" : rateFormatter.format(value));

function InstallmentBox({
  title,
  deadline,
  value,
  note,
  accent,
}: {
  title: string;
  deadline: string;
  value: number;
  note: string;
  accent: string;
}) {
  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-semibold text-text-primary">{title}</h4>
        <span className="rounded-full bg-background-dark-secondary px-3 py-1 text-xs font-medium text-text-secondary">
          {deadline}
        </span>
      </div>
      <div className={`mt-3 text-3xl font-bold ${accent}`}>{brl(value)}</div>
      <p className="mt-2 text-xs text-gray-400">{note}</p>
    </div>
  );
}

function ResultCard({
  result,
  input,
}: {
  result: DecimoTerceiroResult;
  input: DecimoTerceiroInput;
}) {
  const { inss, irrf } = result;
  const usedBrackets = inss.brackets.filter((b) => b.taxedAmount > 0);

  return (
    <Card className="border-2 border-growth-green bg-growth-green-soft">
      <CardHeader>
        <CardTitle as="h2" className="text-growth-green">
          ✅ Seu 13º Salário {LABOR_TAX_YEAR}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-lg bg-gray-900 p-6 text-center">
          <div className="mb-2 text-sm text-text-secondary">Total líquido a receber</div>
          <div className="text-4xl font-extrabold text-growth-green sm:text-5xl">
            {brl(result.net)}
          </div>
          <div className="mt-2 text-sm text-text-secondary">
            13º bruto de <strong className="text-text-primary">{brl(result.gross)}</strong> por{" "}
            {input.months} {input.months === 1 ? "mês trabalhado" : "meses trabalhados"}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <InstallmentBox
            title="1ª parcela"
            deadline="até 30 de novembro"
            value={result.firstInstallment}
            note="Metade do 13º bruto, sem desconto de INSS nem de Imposto de Renda."
            accent="text-primary-blue-dark"
          />
          <InstallmentBox
            title="2ª parcela"
            deadline="até 20 de dezembro"
            value={result.secondInstallment}
            note="A outra metade, já com o INSS e o IR calculados sobre o 13º inteiro."
            accent="text-growth-green"
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricBox
            label="13º bruto"
            value={brl(result.gross)}
            valueClassName="text-text-primary"
          />
          <MetricBox
            label="INSS"
            value={`−${NBSP}${brl(inss.contribution)}`}
            note={`${percentFormatter.format(inss.effectiveRate)} efetivo`}
            valueClassName="text-system-error"
          />
          <MetricBox
            label="Imposto de Renda"
            value={irrf.tax > 0 ? `−${NBSP}${brl(irrf.tax)}` : brl(0)}
            note={irrf.tax > 0 ? `alíquota de ${rate(irrf.rate)}` : "nada a pagar"}
            valueClassName={irrf.tax > 0 ? "text-system-warning" : "text-growth-green"}
          />
          <MetricBox
            label="FGTS (empresa)"
            value={brl(result.fgts)}
            note="depositado, não descontado"
            valueClassName="text-primary-blue-dark"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg bg-gray-900 p-5" aria-label="Cálculo do INSS">
            <h3 className="mb-3 font-semibold text-system-error">🏛️ INSS faixa a faixa</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-surface-variant text-left text-text-secondary">
                    <th className="py-2 pr-2 font-medium">Faixa</th>
                    <th className="py-2 pr-2 text-right font-medium">Alíquota</th>
                    <th className="py-2 text-right font-medium">Desconto</th>
                  </tr>
                </thead>
                <tbody>
                  {usedBrackets.map((b) => (
                    <tr key={b.upTo} className="border-b border-neutral-surface-variant/50">
                      <td className="py-2 pr-2 text-text-secondary">
                        {brl(b.taxedAmount)}
                        <span className="block text-xs text-gray-400">
                          de {brl(b.from)} a {brl(b.upTo)}
                        </span>
                      </td>
                      <td className="py-2 pr-2 text-right">{rate(b.rate)}</td>
                      <td className="py-2 text-right text-text-primary">{brl(b.contribution)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="pt-2 font-semibold text-text-primary">
                      Total do INSS
                    </td>
                    <td className="pt-2 text-right font-semibold text-system-error">
                      {brl(inss.contribution)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {inss.isCapped && (
              <p className="mt-3 text-xs text-system-warning">
                O 13º passou do teto do INSS: a contribuição para no valor máximo.
              </p>
            )}
          </section>

          <section className="rounded-lg bg-gray-900 p-5" aria-label="Cálculo do Imposto de Renda">
            <h3 className="mb-3 font-semibold text-system-warning">
              💰 Imposto de Renda passo a passo
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">13º bruto</dt>
                <dd className="text-text-primary">{brl(result.gross)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">
                  {irrf.deductionMethod === "simplified"
                    ? "Desconto simplificado"
                    : `Deduções (INSS${input.dependents > 0 ? " + dependentes" : ""})`}
                </dt>
                <dd className="text-text-primary">− {brl(irrf.deductions)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-neutral-surface-variant pt-2">
                <dt className="text-text-secondary">Base de cálculo</dt>
                <dd className="text-text-primary">{brl(irrf.base)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Imposto pela tabela ({rate(irrf.rate)})</dt>
                <dd className="text-text-primary">{brl(irrf.taxBeforeReduction)}</dd>
              </div>
              {irrf.reduction > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-text-secondary">Redução da Lei 15.270/2025</dt>
                  <dd className="text-growth-green">− {brl(irrf.reduction)}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 border-t border-neutral-surface-variant pt-2 font-semibold">
                <dt className="text-text-primary">IR retido na 2ª parcela</dt>
                <dd className="text-system-warning">{brl(irrf.tax)}</dd>
              </div>
            </dl>
            {irrf.reduction > 0 && irrf.tax === 0 && irrf.taxBeforeReduction > 0 && (
              <p className="mt-3 text-xs text-growth-green">
                Com 13º bruto de até R$ 5.000,00, a redução criada pela Lei 15.270/2025 zera o
                Imposto de Renda.
              </p>
            )}
            {irrf.deductionMethod === "simplified" && (
              <p className="mt-3 text-xs text-gray-400">
                O desconto simplificado de {brl(IRRF_SIMPLIFIED_DISCOUNT)} foi usado por ser maior
                que as deduções legais.
              </p>
            )}
          </section>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Simulação com as tabelas de {LABOR_TAX_YEAR}. O valor do holerite pode variar com faltas
          injustificadas, pensão alimentícia, adiantamento da 1ª parcela nas férias e outras verbas
          da empresa.
        </p>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function DecimoTerceiroCalculator() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [calculated, setCalculated] = useState<{
    result: DecimoTerceiroResult;
    input: DecimoTerceiroInput;
  } | null>(null);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();

  const { errors } = useMemo(
    () => validateDecimoTerceiroForm(form, { requireAll }),
    [form, requireAll]
  );

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setCalculated(null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validateDecimoTerceiroForm(form, { requireAll: true });
    if (!values) {
      setCalculated(null);
      scrollTo(inputsRef);
      return;
    }
    setCalculated({ result: calculateDecimoTerceiro(values), input: values });
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setRequireAll(false);
    setCalculated(null);
    scrollTo(inputsRef);
  };

  return (
    <div className="space-y-8">
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">💼 Dados do 13º Salário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <div className="rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-lg font-bold text-primary-blue-dark sm:text-xl">
                  13º = remuneração ÷ 12 × meses trabalhados
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Preencha os campos e clique em Calcular para ver as duas parcelas
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados do 13º salário"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <MoneyInput
                    label="Salário bruto mensal"
                    placeholder="3.000,00"
                    value={form.salary}
                    onChange={(salary) => changeForm({ salary })}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.salary}
                    hint="Salário de dezembro, como está na carteira, antes dos descontos"
                  />
                </div>
                <div>
                  <MoneyInput
                    label="Média de variáveis (opcional)"
                    placeholder="0,00"
                    value={form.variableAverage}
                    onChange={(variableAverage) => changeForm({ variableAverage })}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.variableAverage}
                    hint="Média mensal de horas extras, comissões e adicionais no ano"
                  />
                </div>
              </div>

              <div>
                <OptionCards
                  legend="Meses trabalhados no ano"
                  options={MONTH_OPTIONS}
                  value={form.months}
                  onChange={(months) => changeForm({ months })}
                  columnsClassName="grid-cols-4 sm:grid-cols-6"
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Conte o mês em que você trabalhou 15 dias ou mais
                </p>
              </div>

              <div className="max-w-xs">
                <Select
                  label="Dependentes no Imposto de Renda"
                  options={DEPENDENT_OPTIONS}
                  value={form.dependents}
                  onChange={(dependents) => changeForm({ dependents })}
                  fullWidth
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Cada dependente reduz a base do IR em {brl(IRRF_DEPENDENT_DEDUCTION)}
                </p>
              </div>

              <CalculatorActions onReset={handleReset} />
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" aria-atomic="true" className="scroll-mt-4">
        {calculated && <ResultCard {...calculated} />}
      </div>
    </div>
  );
}

export default DecimoTerceiroCalculator;
