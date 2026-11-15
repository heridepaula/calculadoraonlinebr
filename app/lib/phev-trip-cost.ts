// Custo de um trajeto com híbrido plug-in (PHEV): bateria primeiro, combustão no restante.
// Funções puras, sem dependências do app.

export interface PhevInputParams {
  totalDistanceKm: number;
  /** Autonomia elétrica disponível no início do trajeto, em km (0 = bateria vazia) */
  evBatteryRangeKm: number;
  evEfficiencyKmPerKwh: number;
  hybridEfficiencyKmPerLiter: number;
  energyCostPerKwh: number;
  fuelPricePerLiter: number;
}

export interface PhevCalculationResult {
  evDistanceKm: number;
  hybridDistanceKm: number;
  kwhConsumed: number;
  litersConsumed: number;
  costEV: number;
  costFuel: number;
  totalCost: number;
  costPerKm: number;
  /** km/L que o carro precisaria fazer só com combustível para gastar o mesmo no trajeto */
  equivalentKmPerLiter: number;
  evCostPercentage: number;
  fuelCostPercentage: number;
  /** Parcela do trajeto feita no modo elétrico, em % da distância */
  evDistancePercentage: number;
  summaryText: string;
}

/** Limites de plausibilidade usados na validação do formulário */
export const PHEV_LIMITS = {
  totalDistanceKm: { min: 1, max: 5000 },
  evBatteryRangeKm: { min: 0, max: 1000 },
  evEfficiencyKmPerKwh: { min: 1, max: 20 },
  hybridEfficiencyKmPerLiter: { min: 3, max: 50 },
} as const;

const km = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const km1 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const money = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function calculatePhevTripCost(params: PhevInputParams): PhevCalculationResult {
  const {
    totalDistanceKm,
    evBatteryRangeKm,
    evEfficiencyKmPerKwh,
    hybridEfficiencyKmPerLiter,
    energyCostPerKwh,
    fuelPricePerLiter,
  } = params;

  const positives = [
    totalDistanceKm,
    evEfficiencyKmPerKwh,
    hybridEfficiencyKmPerLiter,
    energyCostPerKwh,
    fuelPricePerLiter,
  ];
  if (!positives.every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error(
      "Todos os parâmetros de consumo, preços e distância total devem ser maiores que zero."
    );
  }
  if (!Number.isFinite(evBatteryRangeKm)) {
    throw new Error("A autonomia elétrica deve ser um número válido.");
  }

  const evDistanceKm = Math.min(totalDistanceKm, Math.max(0, evBatteryRangeKm));
  const hybridDistanceKm = Math.max(0, totalDistanceKm - evDistanceKm);

  const kwhConsumed = evDistanceKm / evEfficiencyKmPerKwh;
  const litersConsumed = hybridDistanceKm / hybridEfficiencyKmPerLiter;

  const costEV = kwhConsumed * energyCostPerKwh;
  const costFuel = litersConsumed * fuelPricePerLiter;
  const totalCost = costEV + costFuel;

  const costPerKm = totalCost / totalDistanceKm;
  const equivalentKmPerLiter = fuelPricePerLiter / costPerKm;

  const evCostPercentage = (costEV / totalCost) * 100;
  const fuelCostPercentage = (costFuel / totalCost) * 100;
  const evDistancePercentage = (evDistanceKm / totalDistanceKm) * 100;

  const summaryText =
    `Em um trajeto de ${km1.format(totalDistanceKm)} km, você percorrerá ` +
    `${km.format(evDistanceKm)} km no modo 100% elétrico e ${km.format(hybridDistanceKm)} km ` +
    `no modo híbrido. O custo total será de R$ ${money.format(totalCost)} ` +
    `(R$ ${money.format(costEV)} na tomada e R$ ${money.format(costFuel)} no posto), ` +
    `gerando um rendimento equivalente de ${km1.format(equivalentKmPerLiter)} km/L.`;

  return {
    evDistanceKm,
    hybridDistanceKm,
    kwhConsumed,
    litersConsumed,
    costEV,
    costFuel,
    totalCost,
    costPerKm,
    equivalentKmPerLiter,
    evCostPercentage,
    fuelCostPercentage,
    evDistancePercentage,
    summaryText,
  };
}
