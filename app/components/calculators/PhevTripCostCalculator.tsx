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
  PHEV_LIMITS,
  calculatePhevTripCost,
  type PhevCalculationResult,
  type PhevInputParams,
} from "~/lib/phev-trip-cost";
import { parseMaskedNumber } from "~/lib/utils";
import {
  CalculatorActions,
  MetricBox,
  currencyFormatter,
  decimalFormatter,
  useCalculatorScroll,
} from "./betting-shared";
import { CopySummary } from "./CopySummary";

type FieldName =
  | "totalDistanceKm"
  | "evBatteryRangeKm"
  | "evEfficiencyKmPerKwh"
  | "hybridEfficiencyKmPerLiter"
  | "energyCostPerKwh"
  | "fuelPricePerLiter";

type FormState = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

const INITIAL_STATE: FormState = {
  totalDistanceKm: "120,00",
  evBatteryRangeKm: "50,00",
  evEfficiencyKmPerKwh: "5,00",
  hybridEfficiencyKmPerLiter: "16,00",
  energyCostPerKwh: "0,90",
  fuelPricePerLiter: "6,00",
};

const brNumber = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const kmFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

/**
 * Valida os campos brutos. `values` só vem preenchido quando tudo é válido.
 * A autonomia elétrica aceita 0 (bateria vazia): campo vazio equivale a 0 km.
 */
function validatePhevForm(
  state: FormState,
  { requireAll = false }: { requireAll?: boolean } = {}
): { errors: FieldErrors; values: PhevInputParams | null } {
  const n = (field: FieldName) => parseMaskedNumber(state[field]);
  const totalDistanceKm = n("totalDistanceKm");
  const evBatteryRangeKm = n("evBatteryRangeKm");
  const evEfficiencyKmPerKwh = n("evEfficiencyKmPerKwh");
  const hybridEfficiencyKmPerLiter = n("hybridEfficiencyKmPerLiter");
  const energyCostPerKwh = n("energyCostPerKwh");
  const fuelPricePerLiter = n("fuelPricePerLiter");
  const errors: FieldErrors = {};

  if (requireAll) {
    if (!Number.isFinite(totalDistanceKm)) {
      errors.totalDistanceKm = "Informe a distância do trajeto.";
    }
    if (!Number.isFinite(evEfficiencyKmPerKwh)) {
      errors.evEfficiencyKmPerKwh = "Informe o consumo no modo elétrico.";
    }
    if (!Number.isFinite(hybridEfficiencyKmPerLiter)) {
      errors.hybridEfficiencyKmPerLiter = "Informe o consumo no modo híbrido.";
    }
    if (!Number.isFinite(energyCostPerKwh)) {
      errors.energyCostPerKwh = "Informe a tarifa de energia.";
    }
    if (!Number.isFinite(fuelPricePerLiter)) {
      errors.fuelPricePerLiter = "Informe o preço do combustível.";
    }
  }

  const checkRange = (
    field: FieldName,
    value: number,
    { min, max }: { min: number; max: number },
    unit: string
  ) => {
    if (Number.isFinite(value) && (value < min || value > max)) {
      errors[field] = `Informe um valor entre ${brNumber(min)} e ${brNumber(max)} ${unit}.`;
    }
  };
  checkRange("totalDistanceKm", totalDistanceKm, PHEV_LIMITS.totalDistanceKm, "km");
  checkRange("evBatteryRangeKm", evBatteryRangeKm, PHEV_LIMITS.evBatteryRangeKm, "km");
  checkRange(
    "evEfficiencyKmPerKwh",
    evEfficiencyKmPerKwh,
    PHEV_LIMITS.evEfficiencyKmPerKwh,
    "km/kWh"
  );
  checkRange(
    "hybridEfficiencyKmPerLiter",
    hybridEfficiencyKmPerLiter,
    PHEV_LIMITS.hybridEfficiencyKmPerLiter,
    "km/L"
  );

  const requiredFilled = [
    totalDistanceKm,
    evEfficiencyKmPerKwh,
    hybridEfficiencyKmPerLiter,
    energyCostPerKwh,
    fuelPricePerLiter,
  ].every(Number.isFinite);

  return {
    errors,
    values:
      requiredFilled && Object.keys(errors).length === 0
        ? {
            totalDistanceKm,
            // Vazio ou "0,00" (parseMaskedNumber devolve NaN para zero) = bateria vazia
            evBatteryRangeKm: Number.isFinite(evBatteryRangeKm) ? evBatteryRangeKm : 0,
            evEfficiencyKmPerKwh,
            hybridEfficiencyKmPerLiter,
            energyCostPerKwh,
            fuelPricePerLiter,
          }
        : null,
  };
}

function DistanceBar({ result }: { result: PhevCalculationResult }) {
  const ev = result.evDistancePercentage;
  const hybrid = 100 - ev;
  const label = `Trajeto: ${kmFormatter.format(result.evDistanceKm)} km no modo elétrico (${decimalFormatter.format(ev)}%) e ${kmFormatter.format(result.hybridDistanceKm)} km no modo híbrido (${decimalFormatter.format(hybrid)}%)`;

  return (
    <div>
      <div className="mb-2 text-sm font-medium text-text-primary">Divisão do trajeto</div>
      <div
        role="img"
        aria-label={label}
        className="flex h-9 w-full overflow-hidden rounded-lg bg-gray-900 text-xs font-semibold text-gray-900"
      >
        {ev > 0 && (
          <div
            className="flex items-center justify-center bg-growth-green"
            style={{ width: `${ev}%` }}
          >
            {ev >= 18 && `EV ${decimalFormatter.format(ev)}%`}
          </div>
        )}
        {hybrid > 0 && (
          <div
            className="flex items-center justify-center bg-system-warning"
            style={{ width: `${hybrid}%` }}
          >
            {hybrid >= 18 && `Híbrido ${decimalFormatter.format(hybrid)}%`}
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-between text-xs text-text-secondary">
        <span>🔌 {kmFormatter.format(result.evDistanceKm)} km elétrico</span>
        <span>⛽ {kmFormatter.format(result.hybridDistanceKm)} km híbrido</span>
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: PhevCalculationResult }) {
  return (
    <Card className="border-2 border-growth-green bg-growth-green-soft">
      <CardHeader>
        <CardTitle as="h3" className="text-growth-green">
          🔋 Custo do Trajeto Híbrido Plug-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-lg bg-gray-900 p-6 text-center">
          <div className="mb-2 text-sm text-text-secondary">Custo total da viagem</div>
          <div className="text-4xl font-extrabold text-growth-green sm:text-5xl">
            {currencyFormatter.format(result.totalCost)}
          </div>
          <div className="mt-2 text-sm text-text-secondary">
            Custo médio de{" "}
            <strong className="text-text-primary">
              {currencyFormatter.format(result.costPerKm)}
            </strong>{" "}
            por km
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricBox
            label="Rendimento equivalente ponderado"
            value={`${decimalFormatter.format(result.equivalentKmPerLiter)} km/L`}
            note="km/L que o carro faria só com combustível para gastar o mesmo"
            valueClassName="text-primary-blue-dark"
          />
          <MetricBox
            label="Na tomada"
            value={currencyFormatter.format(result.costEV)}
            note={`${decimalFormatter.format(result.kwhConsumed)} kWh · ${decimalFormatter.format(result.evCostPercentage)}% do gasto`}
            valueClassName="text-growth-green"
          />
          <MetricBox
            label="No posto"
            value={currencyFormatter.format(result.costFuel)}
            note={`${decimalFormatter.format(result.litersConsumed)} L · ${decimalFormatter.format(result.fuelCostPercentage)}% do gasto`}
            valueClassName="text-system-warning"
          />
        </div>

        <div className="mt-6">
          <DistanceBar result={result} />
        </div>

        <div className="mt-6">
          <CopySummary text={result.summaryText} />
        </div>
      </CardContent>
    </Card>
  );
}

export function PhevTripCostCalculator({ className = "" }: { className?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [requireAll, setRequireAll] = useState(false);
  // Resultado do último clique em "Calcular"; não acompanha a digitação
  const [result, setResult] = useState<PhevCalculationResult | null>(null);
  const { inputsRef, resultRef, scrollTo } = useCalculatorScroll();

  const { errors } = useMemo(() => validatePhevForm(form, { requireAll }), [form, requireAll]);

  const updateField = (field: FieldName) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequireAll(true);
    const { values } = validatePhevForm(form, { requireAll: true });
    if (!values) {
      setResult(null);
      scrollTo(inputsRef);
      return;
    }
    setResult(calculatePhevTripCost(values));
    scrollTo(resultRef);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setRequireAll(false);
    setResult(null);
    scrollTo(inputsRef);
  };

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      <div ref={inputsRef} className="scroll-mt-4">
        <Card>
          <CardHeader>
            <CardTitle as="h2">🔌 Dados do Trajeto e do Híbrido Plug-in</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">
                A bateria é usada primeiro; o motor a combustão cobre o restante:
              </p>
              <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
                <span className="font-mono text-xl font-bold text-primary-blue-dark">
                  custo = (km EV ÷ km/kWh × tarifa) + (km híbrido ÷ km/L × preço)
                </span>
                <p className="mt-1 text-sm text-primary-blue-dark">
                  Confira os valores e clique em Calcular para ver o custo da viagem
                </p>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleCalculate}
              className="space-y-6"
              aria-label="Dados para o custo do trajeto de um híbrido plug-in"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <MoneyInput
                    label="Distância total do trajeto (km)"
                    placeholder="120,00"
                    value={form.totalDistanceKm}
                    onChange={updateField("totalDistanceKm")}
                    prefix=""
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.totalDistanceKm}
                    hint="Ida, ou ida e volta se for recarregar só no fim"
                  />
                </div>
                <div>
                  <MoneyInput
                    label="Autonomia elétrica atual (km)"
                    placeholder="50,00"
                    value={form.evBatteryRangeKm}
                    onChange={updateField("evBatteryRangeKm")}
                    prefix=""
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.evBatteryRangeKm}
                    hint="Quanto a bateria cobre agora. Bateria vazia: 0"
                  />
                </div>
                <div>
                  <OddsInput
                    label="Consumo no modo elétrico (km/kWh)"
                    placeholder="5,00"
                    value={form.evEfficiencyKmPerKwh}
                    onChange={updateField("evEfficiencyKmPerKwh")}
                  />
                  <FieldFeedback
                    error={errors.evEfficiencyKmPerKwh}
                    hint="Média do painel rodando só na bateria"
                  />
                </div>
                <div>
                  <OddsInput
                    label="Consumo no modo híbrido (km/L)"
                    placeholder="16,00"
                    value={form.hybridEfficiencyKmPerLiter}
                    onChange={updateField("hybridEfficiencyKmPerLiter")}
                  />
                  <FieldFeedback
                    error={errors.hybridEfficiencyKmPerLiter}
                    hint="Média com a bateria descarregada (motor a combustão)"
                  />
                </div>
                <div>
                  <MoneyInput
                    label="Tarifa de energia na tomada (R$/kWh)"
                    placeholder="0,90"
                    value={form.energyCostPerKwh}
                    onChange={updateField("energyCostPerKwh")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.energyCostPerKwh}
                    hint="Valor do kWh na conta de luz ou no eletroposto"
                  />
                </div>
                <div>
                  <MoneyInput
                    label="Preço do combustível (R$/L)"
                    placeholder="6,00"
                    value={form.fuelPricePerLiter}
                    onChange={updateField("fuelPricePerLiter")}
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <FieldFeedback
                    error={errors.fuelPricePerLiter}
                    hint="Preço do litro de gasolina ou etanol no seu posto"
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
