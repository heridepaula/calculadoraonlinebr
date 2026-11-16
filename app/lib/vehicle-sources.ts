// Fontes das calculadoras de carro elétrico e híbrido plug-in.
// O preço dos combustíveis NÃO fica aqui: vem da ANP pelo cron (lib/market/fuel.ts).

/** Data da última revisão das fontes e do texto das páginas (AAAA-MM-DD). */
export const VEHICLE_SOURCES_REVIEWED_AT = "2026-11-15";

export const VEHICLE_SOURCES = [
  {
    label: "Inmetro: tabelas do PBE Veicular (consumo e autonomia de elétricos e híbridos plug-in)",
    href: "https://www.gov.br/inmetro/pt-br/assuntos/avaliacao-da-conformidade/programa-brasileiro-de-etiquetagem/tabelas-de-eficiencia-energetica/veiculos-automotivos-pbe-veicular",
  },
  {
    label: "ANP: Levantamento de Preços de Combustíveis (preços médios semanais)",
    href: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas",
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
