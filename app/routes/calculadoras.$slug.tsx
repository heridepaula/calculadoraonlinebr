import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

// Mapeamento de redirects 301 para preservar SEO
const ROUTE_REDIRECTS: Record<string, string> = {
  // Calculadoras de Finanças
  "calculadora-juros-compostos": "/calculadoras/financas/juros-compostos",
  "calculadora-lci-lca": "/calculadoras/financas/lci-lca",
  "calculadora-primeiro-milhao": "/calculadoras/financas/primeiro-milhao",
  "calculadora-preco-medio": "/calculadoras/financas/preco-medio",
  "calculadora-cdb": "/calculadoras/financas/cdb",
  "calculadora-tesouro-direto": "/calculadoras/financas/tesouro-direto",
  "calculadora-financiamento-imobiliario": "/calculadoras/financas/financiamento-imobiliario",
  "calculadora-emprestimo-consignado": "/calculadoras/financas/emprestimo-consignado",
  "comparador-renda-fixa": "/calculadoras/financas/renda-fixa-comparativa",
  "calculadora-consorcio": "/calculadoras/financas/consorcio",
  "calculadora-juros-simples": "/calculadoras/financas/juros-simples",

  // Calculadoras de Saúde
  "calculadora-imc": "/calculadoras/saude/imc",
  "calculadora-gordura-corporal": "/calculadoras/saude/gordura-corporal",
  "calculadora-ciclo-menstrual": "/calculadoras/saude/ciclo-menstrual",
  "calculadora-desenvolvimento-infantil": "/calculadoras/saude/desenvolvimento-infantil",
  "calculadora-hidratacao": "/calculadoras/saude/hidratacao",

  // Calculadoras de Matemática
  "regra-de-tres-simples": "/calculadoras/matematica/regra-de-tres",
  "calculadora-bhaskara": "/calculadoras/matematica/equacao-segundo-grau",
  "calculadora-mmc-mdc": "/calculadoras/matematica/mmc-mdc",
  "calculadora-area-perimetro": "/calculadoras/matematica/area-perimetro",
  "calculadora-volume": "/calculadoras/matematica/volume",
  "calculadora-pitagora": "/calculadoras/matematica/teorema-pitagoras",
  "calculadora-porcentagem": "/calculadoras/matematica/porcentagem",
  "calculadora-fracoes": "/calculadoras/matematica/fracoes",

  // Calculadoras Trabalhistas
  "calculadora-rescisao": "/calculadoras/trabalhista/rescisao",
  "calculadora-aposentadoria": "/calculadoras/trabalhista/aposentadoria",
  "calculadora-auxilio-doenca": "/calculadoras/trabalhista/auxilio-doenca",
  "calculadora-salario-liquido": "/calculadoras/trabalhista/salario-liquido",
  "calculadora-ferias-decimo-terceiro": "/calculadoras/trabalhista/ferias-decimo-terceiro",
  "calculadora-ferias-13": "/calculadoras/trabalhista/ferias-decimo-terceiro",
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  // Verifica se existe um redirect configurado
  const redirectTo = ROUTE_REDIRECTS[slug];

  if (redirectTo) {
    // Redirect 301 (Moved Permanently) para preservar SEO
    return redirect(redirectTo, { status: 301 });
  }

  // Se não encontrar redirect, retorna 404
  throw new Response("Not Found", { status: 404 });
};

// Esta rota não renderiza nada, apenas faz redirects
export default function RedirectRoute() {
  return null;
}