// Equivalência financeira de um carro elétrico em km/L (funções puras, sem dependências do app)

export type EfficiencyUnit = "km/kWh" | "kWh/100km";

export interface EquivalenceInputParams {
  unitMode: EfficiencyUnit;
  /** Consumo do EV, na unidade de `unitMode` */
  evEfficiency: number;
  /** Tarifa de energia em R$/kWh */
  energyCost: number;
  /** Preço do combustível em R$/L */
  fuelPrice: number;
  /** Rendimento do carro a combustão de referência em km/L (padrão: 12) */
  referenceKmPerLiter?: number;
}

export interface EquivalenceCalculationResult {
  kmPerKwhNormalized: number;
  costPerKmEV: number;
  equivalentKmPerLiter: number;
  costPer100KmEV: number;
  costPer100KmRef: number;
  /** Positivo = o elétrico custa menos; negativo = custa mais que a combustão de referência */
  savingsPercentage: number;
  referenceKmPerLiter: number;
  summaryText: string;
}

export const DEFAULT_REFERENCE_KM_PER_LITER = 12;

/** Limites de plausibilidade do consumo (km/kWh); a PRD define o máximo em 20 */
export const MIN_KM_PER_KWH = 1;
export const MAX_KM_PER_KWH = 20;

const numberFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Converte kWh/100 km em km/kWh (e devolve km/kWh sem alteração). */
export function normalizeToKmPerKwh(unitMode: EfficiencyUnit, evEfficiency: number): number {
  return unitMode === "kWh/100km" ? 100 / evEfficiency : evEfficiency;
}

/**
 * Rendimento equivalente: quantos km/L um carro a combustão precisaria fazer para ter o mesmo
 * custo por km do elétrico.
 *
 * custo EV (R$/km) = tarifa ÷ km/kWh;  km/L equivalente = preço do combustível ÷ custo EV.
 */
export function calculateEVEquivalence(
  params: EquivalenceInputParams
): EquivalenceCalculationResult {
  const {
    unitMode,
    evEfficiency,
    energyCost,
    fuelPrice,
    referenceKmPerLiter = DEFAULT_REFERENCE_KM_PER_LITER,
  } = params;

  const inputs = [evEfficiency, energyCost, fuelPrice, referenceKmPerLiter];
  if (!inputs.every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error("Todos os parâmetros de entrada devem ser maiores que zero.");
  }

  const kmPerKwhNormalized = normalizeToKmPerKwh(unitMode, evEfficiency);
  const costPerKmEV = energyCost / kmPerKwhNormalized;
  const equivalentKmPerLiter = fuelPrice / costPerKmEV;

  const costPer100KmEV = costPerKmEV * 100;
  const costPer100KmRef = (100 / referenceKmPerLiter) * fuelPrice;
  const savingsPercentage = ((costPer100KmRef - costPer100KmEV) / costPer100KmRef) * 100;

  const summaryText =
    `Rodar a ${numberFormatter.format(kmPerKwhNormalized)} km/kWh com energia a ` +
    `R$ ${moneyFormatter.format(energyCost)}/kWh equivale financeiramente a fazer ` +
    `${numberFormatter.format(equivalentKmPerLiter)} km/L de combustível a ` +
    `R$ ${moneyFormatter.format(fuelPrice)}/L.`;

  return {
    kmPerKwhNormalized,
    costPerKmEV,
    equivalentKmPerLiter,
    costPer100KmEV,
    costPer100KmRef,
    savingsPercentage,
    referenceKmPerLiter,
    summaryText,
  };
}
