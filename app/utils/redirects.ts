// Utility para lidar com redirects de URLs antigas
// Preserva o SEO e evita quebrar links externos

export const LEGACY_REDIRECTS: Record<string, string> = {
  // Calculadoras de Finanças
  "/calculadoras/calculadora-juros-compostos": "/calculadoras/financas/juros-compostos",
  "/calculadoras/calculadora-lci-lca": "/calculadoras/financas/lci-lca",
  "/calculadoras/calculadora-primeiro-milhao": "/calculadoras/financas/primeiro-milhao",
  "/calculadoras/calculadora-preco-medio": "/calculadoras/financas/preco-medio",
  "/calculadoras/calculadora-cdb": "/calculadoras/financas/cdb",
  "/calculadoras/calculadora-tesouro-direto": "/calculadoras/financas/tesouro-direto",
  "/calculadoras/calculadora-financiamento-imobiliario":
    "/calculadoras/financas/financiamento-imobiliario",
  "/calculadoras/calculadora-emprestimo-consignado": "/calculadoras/financas/emprestimo-consignado",
  "/calculadoras/comparador-renda-fixa": "/calculadoras/financas/renda-fixa-comparativa",
  "/calculadoras/calculadora-consorcio": "/calculadoras/financas/consorcio",
  "/calculadoras/calculadora-juros-simples": "/calculadoras/financas/juros-simples",

  // Calculadoras de Saúde
  "/calculadoras/calculadora-imc": "/calculadoras/saude/imc",
  "/calculadoras/calculadora-gordura-corporal": "/calculadoras/saude/gordura-corporal",
  "/calculadoras/calculadora-ciclo-menstrual": "/calculadoras/saude/ciclo-menstrual",
  "/calculadoras/calculadora-desenvolvimento-infantil":
    "/calculadoras/saude/desenvolvimento-infantil",
  "/calculadoras/calculadora-hidratacao": "/calculadoras/saude/hidratacao",

  // Calculadoras de Matemática
  "/calculadoras/regra-de-tres-simples": "/calculadoras/matematica/regra-de-tres",
  "/calculadoras/calculadora-bhaskara": "/calculadoras/matematica/equacao-segundo-grau",
  "/calculadoras/calculadora-mmc-mdc": "/calculadoras/matematica/mmc-mdc",
  "/calculadoras/calculadora-area-perimetro": "/calculadoras/matematica/area-perimetro",
  "/calculadoras/calculadora-volume": "/calculadoras/matematica/volume",
  "/calculadoras/calculadora-pitagora": "/calculadoras/matematica/teorema-pitagoras",
  "/calculadoras/calculadora-porcentagem": "/calculadoras/matematica/porcentagem",
  "/calculadoras/calculadora-fracoes": "/calculadoras/matematica/fracoes",

  // Calculadoras Trabalhistas
  "/calculadoras/calculadora-rescisao": "/calculadoras/trabalhista/rescisao",
  "/calculadoras/calculadora-aposentadoria": "/calculadoras/trabalhista/aposentadoria",
  "/calculadoras/calculadora-auxilio-doenca": "/calculadoras/trabalhista/auxilio-doenca",
  "/calculadoras/calculadora-salario-liquido": "/calculadoras/trabalhista/salario-liquido",
  "/calculadoras/calculadora-ferias-decimo-terceiro":
    "/calculadoras/trabalhista/ferias-decimo-terceiro",
};

// Função para verificar se uma URL precisa de redirect
export function getRedirectUrl(pathname: string): string | null {
  // Remove trailing slash para comparação consistente
  const cleanPath =
    pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  return LEGACY_REDIRECTS[cleanPath] || null;
}

// Função para gerar dados estruturados de redirecionamento
export function generateRedirectStructuredData(oldUrl: string, newUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: newUrl,
    mainEntity: {
      "@type": "Thing",
      sameAs: oldUrl,
    },
    potentialAction: {
      "@type": "RedirectAction",
      target: newUrl,
      object: oldUrl,
    },
  };
}
