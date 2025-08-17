// Dados econômicos atualizados - Janeiro 2025
// Estes valores devem ser atualizados periodicamente conforme dados oficiais

export const ECONOMIC_INDICATORS = {
  // Taxa CDI - Certificado de Depósito Interbancário
  CDI: {
    rate: 12.25, // % ao ano
    lastUpdate: "2025-01-08", // Data da última atualização
    source: "CETIP/B3",
    description: "Taxa DI Over - Taxa referencial do mercado interbancário",
  },

  // IPCA - Índice Nacional de Preços ao Consumidor Amplo
  IPCA: {
    rate: 4.87, // % ao ano (projeção 12 meses)
    lastUpdate: "2025-01-08",
    source: "IBGE/BCB",
    description: "Inflação oficial medida pelo IBGE - projeção 12 meses",
  },

  // Taxa Selic - Taxa básica de juros da economia
  SELIC: {
    rate: 12.25, // % ao ano
    lastUpdate: "2025-01-08",
    source: "BCB - Banco Central do Brasil",
    description: "Taxa básica de juros da economia brasileira",
  },

  // Poupança - Rendimento da caderneta de poupança
  POUPANCA: {
    rate: 8.59, // % ao ano (aproximadamente 70% do CDI)
    lastUpdate: "2025-01-08",
    source: "Calculado com base no CDI",
    description: "Rendimento da poupança (70% do CDI quando CDI > 8,5%)",
  },
};

// Função para calcular rendimento da poupança baseado no CDI
export function calculateSavingsRate(cdiRate: number): number {
  if (cdiRate > 8.5) {
    return cdiRate * 0.7; // 70% do CDI
  } else {
    return 6.17; // TR + 0,5% ao mês (aproximadamente 6,17% ao ano)
  }
}

// Função para obter valor padrão com fallback
export function getDefaultRate(indicator: keyof typeof ECONOMIC_INDICATORS): number {
  return ECONOMIC_INDICATORS[indicator]?.rate || 0;
}

// Função para obter informações completas do indicador
export function getIndicatorInfo(indicator: keyof typeof ECONOMIC_INDICATORS) {
  return ECONOMIC_INDICATORS[indicator];
}

// Função para verificar se os dados estão atualizados (últimos 30 dias)
export function isDataRecent(indicator: keyof typeof ECONOMIC_INDICATORS): boolean {
  const lastUpdate = new Date(ECONOMIC_INDICATORS[indicator].lastUpdate);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return lastUpdate >= thirtyDaysAgo;
}

// Função para obter a cor do indicador baseado na idade dos dados
export function getDataFreshnessColor(indicator: keyof typeof ECONOMIC_INDICATORS): string {
  const isRecent = isDataRecent(indicator);
  return isRecent ? "text-system-success" : "text-system-warning";
}

// Valores típicos de mercado para referência
export const MARKET_RANGES = {
  CDI_TYPICAL_RANGE: { min: 8, max: 15 },
  IPCA_TARGET: 3.0, // Meta do BC
  IPCA_TOLERANCE: 1.5, // Tolerância da meta
  LCI_LCA_TYPICAL_PERCENTAGE: { min: 85, max: 120 }, // % do CDI
  CDB_TYPICAL_PERCENTAGE: { min: 95, max: 130 }, // % do CDI
};

// Hook personalizado para usar dados econômicos (para uso futuro)
export function useEconomicData() {
  return {
    indicators: ECONOMIC_INDICATORS,
    getDefaultRate,
    getIndicatorInfo,
    isDataRecent,
    calculateSavingsRate,
    marketRanges: MARKET_RANGES,
  };
}
