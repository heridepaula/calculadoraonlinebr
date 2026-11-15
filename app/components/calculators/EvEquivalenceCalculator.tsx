import { useMemo, useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldFeedback,
  MoneyInput,
  OddsInput,
} from "~/components/ui";
import {
  DEFAULT_REFERENCE_KM_PER_LITER,
  MAX_KM_PER_KWH,
  MIN_KM_PER_KWH,
  calculateEVEquivalence,
  normalizeToKmPerKwh,
  type EfficiencyUnit,
  type EquivalenceCalculationResult,
  type EquivalenceInputParams,
} from "~/lib/ev-equivalence";
import { parseMaskedNumber } from "~/lib/utils";
import {
  CalculatorActions,
  MetricBox,
  OptionCards,
  currencyFormatter,
  decimalFormatter,
  useCalculatorScroll,
} from "./betting-shared";

// ---------------------------------------------------------------------------
// Tipos e constantes
// ---------------------------------------------------------------------------

type FieldName = "evEfficiency" | "energyCost" | "fuelPrice" | "referenceKmPerLiter";

interface FormState {
  unitMode: EfficiencyUnit;
  evEfficiency: string;
  energyCost: string;
  fuelPrice: string;
  referenceKmPerLiter: string;
}

type FieldErrors = Partial<Record<FieldName, string>>;

const INITIAL_STATE: FormState = {
  unitMode: "km/kWh",
  evEfficiency: "5,50",
  energyCost: "0,90",
  fuelPrice: "6,00",
  referenceKmPerLiter: "12,00",
};

const UNIT_OPTIONS = [
  { value: "km/kWh", label: "km/kWh", description: "quanto anda por kWh" },
  { value: "kWh/100km", label: "kWh/100 km", description: "quanto gasta em 100 km" },
] as const;

/** Faixa aceita em cada unidade, derivada do limite de 1 a 20 km/kWh */
const RANGE_BY_UNIT: Record<EfficiencyUnit, { min: number; max: number }> = {
  "km/kWh": { min: MIN_KM_PER_KWH, max: MAX_KM_PER_KWH },
  "kWh/100km": { min: 100 / MAX_KM_PER_KWH, max: 100 / MIN_KM_PER_KWH },
};

const MAX_REFERENCE_KM_PER_LITER = 100;

const brNumber = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------------------------------------------------------------------------
// Validação
// ---------------------------------------------------------------------------

/**
 * Valida os campos brutos. `values` só vem preenchido quando tudo é válido.
 * Com `requireAll`, campos obrigatórios vazios também geram erro (após clicar em "Calcular").
 */
function validateEquivalenceForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: FieldErrors; values: EquivalenceInputParams | null } {
  const evEfficiency = parseMaskedNumber(state.evEfficiency);
  const energyCost = parseMaskedNumber(state.energyCost);
  const fuelPrice = parseMaskedNumber(state.fuelPrice);
  const reference = parseMaskedNumber(state.referenceKmPerLiter);
  const errors: FieldErrors = {};

  if (requireAll) {
    if (!Number.isFinite(evEfficiency)) errors.evEfficiency = "Informe o consumo do elétrico.";
    if (!Number.isFinite(energyCost)) errors.energyCost = "Informe a tarifa de energia.";
    if (!Number.isFinite(fuelPrice)) errors.fuelPrice = "Informe o preço do combustível.";
  }

  if (Number.isFinite(evEfficiency)) {
    const { min, max } = RANGE_BY_UNIT[state.unitMode];
    if (evEfficiency < min || evEfficiency > max) {
      errors.evEfficiency = `Informe um valor entre ${brNumber(min)} e ${brNumber(max)} ${state.unitMode}.`;
    }
  }

  if (Number.isFinite(reference) && reference > MAX_REFERENCE_KM_PER_LITER) {
    errors.referenceKmPerLiter = `Informe um valor até ${MAX_REFERENCE_KM_PER_LITER} km/L.`;
  }

  const hasErrors = Object.keys(errors).length > 0;
  const requiredFilled =
    Number.isFinite(evEfficiency) && Number.isFinite(energyCost) && Number.isFinite(fuelPrice);

  return {
    errors,
    values:
      requiredFilled && !hasErrors
        ? {
            unitMode: state.unitMode,
            evEfficiency,
            energyCost,
            fuelPrice,
            // Campo opcional: vazio usa o padrão de 12 km/L
            referenceKmPerLiter: Number.isFinite(reference)
              ? reference
              : DEFAULT_REFERENCE_KM_PER_LITER,
          }
        : null,
  };
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

function CopySummary({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <div className="rounded-lg border border-primary-blue/30 bg-gray-900 p-4">
      <p className="text-sm text-text-primary">{text}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="min-h-[44px] rounded-lg bg-primary-blue px-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary-blue-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue-dark"
        >
          Copiar resumo
        </button>
        <span role="status" className="text-sm text-text-secondary">
          {status === "copied" && "✅ Resumo copiado!"}
          {status === "failed" && "Não foi possível copiar. Selecione o texto manualmente."}
        </span>
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: EquivalenceCalculationResult }) {
  const cheaper = result.savingsPercentage >= 0;
  const savingsLabel = `${decimalFormatter.format(Math.abs(result.savingsPercentage))}%`;
  const refLabel = `${decimalFormatter.format(result.referenceKmPerLiter)} km/L`;

  return (
    <Card className="border-2 border-growth-green bg-growth-green-soft">
      <CardHeader>
        <CardTitle as="h3" className="text-growth-green">
          ⚡ Rendimento Equivalente em km/L
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-lg bg-gray-900 p-6 text-center">
          <div className="mb-2 text-sm text-text-secondary">Seu elétrico equivale a</div>
          <div className="text-4xl font-extrabold text-growth-green sm:text-5xl">
            {decimalFormatter.format(result.equivalentKmPerLiter)} km/L
          </div>
          <div className="mt-2 text-sm text-text-secondary">
            Um carro a combustão precisaria fazer isso para gastar o mesmo por km
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricBox
            label="Custo por km (EV)"
            value={currencyFormatter.format(result.costPerKmEV)}
            note={`${decimalFormatter.format(result.kmPerKwhNormalized)} km/kWh`}
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Custo para rodar 100 km (EV)"
            value={currencyFormatter.format(result.costPer100KmEV)}
            valueClassName="text-growth-green"
          />
          <MetricBox
            label={`Custo em 100 km (combustão ${refLabel})`}
            value={currencyFormatter.format(result.costPer100KmRef)}
            valueClassName="text-system-warning"
          />
        </div>

        <div
          className={`mt-6 rounded-lg border p-4 text-center ${
            cheaper
              ? "border-growth-green/40 bg-gray-900"
              : "border-system-warning/40 bg-system-warning/10"
          }`}
        >
          <p className="text-text-primary">
            {cheaper ? (
              <>
                Economia de <strong className="text-growth-green">{savingsLabel}</strong> a cada
                trajeto em relação ao carro a combustão de {refLabel}.
              </>
            ) : (
              <>
                Neste cenário o elétrico custa{" "}
                <strong className="text-system-warning">{savingsLabel} a mais</strong> que o carro a
                combustão de {refLabel}: a tarifa está alta para o consumo informado.
              </>
            )}
          </p>
        </div>

        <div className="mt-6">
          <CopySummary text={result.summaryText} />
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function EvEquivalenceCalculator({ className = "" }: { className?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [result, setResult] = useState<EquivalenceCalculationResult | null>(null);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();

  const { errors } = useMemo(
    () => validateEquivalenceForm(form, { requireAll }),
    [form, requireAll]
  );

  // Qualquer alteração descarta o resultado anterior, que deixaria de corresponder aos campos
  const changeForm = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setResult(null);
  };

  const updateField = (field: FieldName) => (value: string) => changeForm({ [field]: value });

  // Ao trocar a unidade, converte o valor digitado para manter o mesmo consumo
  const changeUnit = (unitMode: EfficiencyUnit) => {
    if (unitMode === form.unitMode) return;
    const current = parseMaskedNumber(form.evEfficiency);
    const { min, max } = RANGE_BY_UNIT[form.unitMode];
    const convertible = Number.isFinite(current) && current >= min && current <= max;
    const converted = convertible ? 100 / normalizeToKmPerKwh(form.unitMode, current) : null;
    changeForm({
      unitMode,
      evEfficiency: converted === null ? "" : brNumber(Math.round(converted * 100) / 100),
    });
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validateEquivalenceForm(form, { requireAll: true });
    if (!values) {
      setResult(null);
      scrollTo(inputsRef);
      return;
    }
    setResult(calculateEVEquivalence(values));
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setRequireAll(false);
    setResult(null);
    scrollTo(inputsRef);
  };

  const isKmPerKwh = form.unitMode === "km/kWh";

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">🔌 Dados do Carro Elétrico e dos Preços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">
                Converta o consumo do elétrico em km/L equivalentes:
              </p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-xl font-bold text-primary-blue-dark">
                  km/L = preço do litro ÷ (tarifa ÷ km/kWh)
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Confira os valores e clique em Calcular para ver o resultado
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados para equivalência km/kWh em km/L"
            >
              <OptionCards
                legend="Unidade de consumo do elétrico"
                options={UNIT_OPTIONS}
                value={form.unitMode}
                onChange={changeUnit}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <OddsInput
                    label={`Consumo do elétrico (${form.unitMode})`}
                    placeholder={isKmPerKwh ? "5,50" : "18,18"}
                    value={form.evEfficiency}
                    onChange={updateField("evEfficiency")}
                  />
                  <FieldFeedback
                    error={errors.evEfficiency}
                    hint={
                      isKmPerKwh
                        ? "Está no manual ou no painel do carro. Ex.: 5,50 km por kWh"
                        : "Ex.: 18,18 kWh gastos a cada 100 km"
                    }
                  />
                </div>
                <div>
                  <MoneyInput
                    label="Tarifa de energia (R$/kWh)"
                    placeholder="0,90"
                    value={form.energyCost}
                    onChange={updateField("energyCost")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.energyCost}
                    hint="Na conta de luz (com impostos) ou no preço do kWh no eletroposto"
                  />
                </div>
                <div>
                  <MoneyInput
                    label="Preço do combustível (R$/L)"
                    placeholder="6,00"
                    value={form.fuelPrice}
                    onChange={updateField("fuelPrice")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.fuelPrice}
                    hint="Preço do litro de gasolina ou etanol no seu posto"
                  />
                </div>
                <div>
                  <OddsInput
                    label="Consumo do carro a combustão (km/L) – opcional"
                    placeholder="12,00"
                    value={form.referenceKmPerLiter}
                    onChange={updateField("referenceKmPerLiter")}
                  />
                  <FieldFeedback
                    error={errors.referenceKmPerLiter}
                    hint="Usado no comparativo. Se vazio, consideramos 12 km/L"
                  />
                </div>
              </div>

              <CalculatorActions onReset={handleReset} />
            </form>
          </CardContent>
        </Card>
      </div>

      <div ref={resultRef} aria-live="polite" aria-atomic="true" className="scroll-mt-4">
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
