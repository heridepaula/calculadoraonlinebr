// Fontes e preços de referência das calculadoras de carro elétrico e híbrido plug-in.
// Atualize este arquivo quando revisar as páginas: a data e o preço aparecem no texto delas.

/** Data da última conferência das fontes abaixo (AAAA-MM-DD). */
export const VEHICLE_SOURCES_REVIEWED_AT = "2026-11-15";

/**
 * Preço médio de revenda no Brasil, da Síntese Semanal de Preços da ANP (edição 45/2026).
 * Muda toda semana: os exemplos das páginas continuam ilustrativos.
 */
export const FUEL_REFERENCE = {
  week: "01/11/2026 a 07/11/2026",
  gasoline: 6.47,
  ethanol: 4.15,
} as const;

export const VEHICLE_SOURCES = [
  {
    label: "Inmetro: tabelas do PBE Veicular (consumo e autonomia de elétricos e híbridos plug-in)",
    href: "https://www.gov.br/inmetro/pt-br/assuntos/avaliacao-da-conformidade/programa-brasileiro-de-etiquetagem/tabelas-de-eficiencia-energetica/veiculos-automotivos-pbe-veicular",
  },
  {
    label: "ANP: Síntese Semanal de Preços dos Combustíveis, edição 45/2026",
    href: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/arq-sintese-semanal/2026/sintese-precos-45.pdf",
  },
  {
    label: "ANEEL: tarifas de energia elétrica",
    href: "https://www.gov.br/aneel/pt-br/assuntos/tarifas",
  },
  {
    label: "ANEEL: bandeiras tarifárias",
    href: "https://www.gov.br/aneel/pt-br/assuntos/tarifas/bandeiras-tarifarias",
  },
] as const;
