import { CALCULATORS, CATEGORIES } from "~/lib/constants";
import type { MetaFunction } from "@remix-run/node";
import { generateStructuredData } from "~/utils/seo";

export interface CalculatorSEOData {
  id: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl: string;
  priority: number;
  changeFreq: string;
}

export const CALCULATOR_SEO_DATA: Record<string, CalculatorSEOData> = {
  // Health Calculators
  imc: {
    id: "imc",
    title: "Calculadora de IMC 2025 - Índice de Massa Corporal - Calculadora Online BR",
    description:
      "★ Calculadora IMC GRATUITA e atualizada! Calcule seu Índice de Massa Corporal com precisão, veja classificações da OMS e receba dicas personalizadas para uma vida mais saudável.",
    keywords:
      "calculadora imc, indice massa corporal, calcular imc, peso ideal, obesidade, sobrepeso, imc adulto, imc infantil, tabela imc oms, saude peso",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/saude/imc",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "gordura-corporal": {
    id: "gordura-corporal",
    title: "Calculadora de Gordura Corporal 2025 - Métodos Científicos - Calculadora Online BR",
    description:
      "★ Calculadora de gordura corporal com métodos científicos validados! Use fórmulas de Jackson-Pollock, Navy, YMCA e bioimpedância para análise completa da composição corporal.",
    keywords:
      "calculadora gordura corporal, percentual gordura, bioimpedancia, dobras cutaneas, composicao corporal, massa magra, jackson pollock, navy formula, ymca",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/saude/gordura-corporal",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "ciclo-menstrual": {
    id: "ciclo-menstrual",
    title:
      "Calculadora de Ciclo Menstrual 2025 - Período Fértil e Ovulação - Calculadora Online BR",
    description:
      "★ Calculadora de ciclo menstrual GRATUITA! Calcule período fértil, ovulação, próxima menstruação e janela de fertilidade. Acompanhe sua saúde reprodutiva com precisão.",
    keywords:
      "calculadora ciclo menstrual, periodo fertil, ovulacao, proxima menstruacao, fertilidade, tabelinha, calendario menstrual, saude feminina, engravidar",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/saude/ciclo-menstrual",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "desenvolvimento-infantil": {
    id: "desenvolvimento-infantil",
    title: "Calculadora de Desenvolvimento Infantil 2025 - Marcos do Bebê - Calculadora Online BR",
    description:
      "★ Acompanhe o desenvolvimento do seu bebê com marcos personalizados! Calculadora baseada em diretrizes pediátricas para motor, cognitivo, social e linguagem.",
    keywords:
      "desenvolvimento infantil, marcos do bebe, crescimento infantil, pediatria, desenvolvimento motor, cognitivo, social, linguagem, primeiros passos, primeiras palavras",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/saude/desenvolvimento-infantil",
    priority: 0.8,
    changeFreq: "monthly",
  },
  hidratacao: {
    id: "hidratacao",
    title: "Calculadora de Hidratação 2025 - Necessidade Diária de Água - Calculadora Online BR",
    description:
      "★ Calcule sua necessidade diária de água personalizada! Considera atividade física, clima, peso, idade e condições especiais. Mantenha-se hidratado com precisão.",
    keywords:
      "calculadora hidratacao, necessidade agua, quantos litros agua beber, desidratacao, balance hidrico, agua diaria, sede, hidratacao exercicio, clima quente",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/saude/hidratacao",
    priority: 0.8,
    changeFreq: "monthly",
  },

  // Financial Calculators
  "juros-compostos": {
    id: "juros-compostos",
    title:
      "Calculadora de Juros Compostos 2025 - Simulador Completo com Aportes - Calculadora Online BR",
    description:
      "★ Calculadora de juros compostos GRATUITA com aportes mensais e gráficos detalhados. Simule investimentos, entenda o poder dos juros sobre juros e descubra como multiplicar seu dinheiro.",
    keywords:
      "calculadora juros compostos, juros sobre juros, aportes mensais, investimento longo prazo, simulador financeiro, crescimento exponencial, planejamento aposentadoria, como calcular juros compostos, fórmula juros compostos, CDI, tesouro direto, fundos investimento",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/juros-compostos",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "primeiro-milhao": {
    id: "primeiro-milhao",
    title: "Calculadora do Primeiro Milhão 2025 - Como Ficar Milionário - Calculadora Online BR",
    description:
      "★ Calculadora do Primeiro Milhão GRATUITA! Descubra em quanto tempo você pode se tornar milionário ou quanto investir mensalmente. Simulações realistas com juros compostos e estratégias comprovadas.",
    keywords:
      "calculadora primeiro milhão, como ficar milionário, quanto tempo para ser milionário, investir para ser milionário, planejamento financeiro milionário, simulação primeiro milhão, independência financeira, juros compostos primeiro milhão",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/primeiro-milhao",
    priority: 0.9,
    changeFreq: "monthly",
  },
  cdb: {
    id: "cdb",
    title: "Calculadora CDB 2025 - Simulador Completo com Tributação - Calculadora Online BR",
    description:
      "★ Calculadora CDB GRATUITA com simulação completa de tributação. Calcule rendimentos, imposto de renda, IOF e compare com LCI/LCA e Poupança. Ferramenta completa para investimentos em renda fixa.",
    keywords:
      "calculadora cdb, certificado depósito bancário, cdb tributação, imposto renda cdb, cdb vs lci lca, cdb aportes mensais, rendimento cdb, taxa cdb, cdb pré fixado, cdb pós fixado, cdb ipca",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/cdb",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "tesouro-direto": {
    id: "tesouro-direto",
    title:
      "Calculadora Tesouro Direto 2025 - Simulador Completo com Cupons - Calculadora Online BR",
    description:
      "★ Calculadora Tesouro Direto GRATUITA com simulação completa! Calcule rendimentos, cupons semestrais, impostos e compare todos os títulos: Selic, Prefixado, IPCA+. Indexadores reais atualizados.",
    keywords:
      "calculadora tesouro direto, tesouro selic, tesouro prefixado, tesouro ipca, cupons semestrais, simulador títulos públicos, rendimento tesouro direto, imposto renda tesouro, taxa selic atual, ipca atual",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/tesouro-direto",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "antecipacao-parcelas-nubank": {
    id: "antecipacao-parcelas-nubank",
    title:
      "Calculadora Antecipação Nubank 2025 - Descontos e Economia de Parcelas - Calculadora Online BR",
    description:
      "★ Calculadora de antecipação Nubank GRATUITA! Calcule exatamente quanto você economiza antecipando parcelas. Veja descontos por número de parcelas, análise completa e tome a melhor decisão financeira.",
    keywords:
      "calculadora antecipacao nubank, antecipar parcelas nubank, desconto antecipacao, quitar emprestimo nubank, economia antecipacao, simulador nubank, parcelas nubank, calculadora nubank",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "lci-lca": {
    id: "lci-lca",
    title:
      "Calculadora LCI e LCA 2025 - Simulador Completo de Investimentos - Calculadora Online BR",
    description:
      "★ Calculadora LCI e LCA GRATUITA com simulações completas. Compare rendimentos, veja vantagens fiscais, calcule carência e descubra se vale mais que CDB e Poupança.",
    keywords:
      "calculadora LCI, calculadora LCA, letra de crédito imobiliário, letra de crédito agronegócio, investimento LCI LCA, rendimento LCI LCA, carência LCI LCA, isenção imposto renda, CDI LCI LCA",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/lci-lca",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "emprestimo-consignado": {
    id: "emprestimo-consignado",
    title:
      "Calculadora Empréstimo Consignado 2025 - Simulador CLT, Servidor e Aposentado - Calculadora Online BR",
    description:
      "★ Calculadora de empréstimo consignado COMPLETA e GRATUITA para CLT, servidores públicos e aposentados. Simule parcelas, analise margem consignável, compare taxas e descubra o melhor consignado.",
    keywords:
      "calculadora empréstimo consignado, consignado CLT, consignado servidor público, consignado aposentado, margem consignável, simulador consignado, taxa empréstimo consignado, parcela consignado",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/emprestimo-consignado",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "financiamento-imobiliario": {
    id: "financiamento-imobiliario",
    title:
      "Calculadora de Financiamento Imobiliário 2025 - SAC e PRICE - Simulação Completa - Calculadora Online BR",
    description:
      "★ Simulador de financiamento imobiliário COMPLETO e GRATUITO com sistemas SAC e PRICE. Calcule prestações, juros, amortização e análise de affordability. Compare cenários e simule antecipações.",
    keywords:
      "calculadora financiamento imobiliário, simulador financiamento casa, SAC vs PRICE, tabela price, sistema SAC, prestação financiamento, juros financiamento imóvel, amortização constante, affordability imóvel",
    canonicalUrl:
      "https://calculadoraonline.com.br/calculadoras/financas/financiamento-imobiliario",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "juros-simples": {
    id: "juros-simples",
    title: "Calculadora de Juros Simples 2025 - Fácil e Precisa - Calculadora Online BR",
    description:
      "★ Calculadora de Juros Simples GRATUITA e fácil de usar. Calcule juros, capital, taxa ou tempo com fórmulas detalhadas. Ideal para empréstimos, financiamentos e aplicações de curto prazo.",
    keywords:
      "calculadora juros simples, como calcular juros simples, fórmula juros simples, juros lineares, empréstimo curto prazo, desconto duplicata, calculadora financeira, matemática financeira",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/juros-simples",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "preco-medio": {
    id: "preco-medio",
    title: "Calculadora de Preço Médio 2025 - Ações e Investimentos - Calculadora Online BR",
    description:
      "★ Calculadora de preço médio GRATUITA para ações e investimentos. Controle ganhos/perdas com múltiplos métodos, acompanhe dividend yield e otimize sua carteira de investimentos.",
    keywords:
      "calculadora preço médio, preço médio ações, investimento ações, bolsa valores, dividend yield, carteira investimentos, ganhos perdas ações, estrategia investimento, buy and hold",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/financas/preco-medio",
    priority: 0.7,
    changeFreq: "monthly",
  },
  consorcio: {
    id: "consorcio",
    title: "Calculadora Consórcio 2025 – Simule Parcelas e Contemplação | CalculadoraOnlineBR",
    description:
      "★ Calculadora de consórcio GRATUITA e completa! Simule parcelas de consórcio de imóveis, veículos e motos. Calcule taxa de administração, contemplação e compare grupos. Ferramenta essencial para decidir seu consórcio.",
    keywords:
      "calculadora consórcio, simulador consórcio, consórcio imóvel, consórcio veículo, consórcio moto, parcelas consórcio, contemplação consórcio, taxa administração, grupos consórcio, lance consórcio, sorteio consórcio",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
    priority: 0.8,
    changeFreq: "monthly",
  },

  // Mathematical Calculators
  porcentagem: {
    id: "porcentagem",
    title: "Calculadora de Porcentagem 2025 - Rápida e Precisa - Calculadora Online BR",
    description:
      "★ Calculadora de porcentagem GRATUITA e fácil! Calcule porcentagens, aumentos, descontos, diferença percentual e muito mais. Ideal para compras, negócios e estudos.",
    keywords:
      "calculadora porcentagem, calcular porcentagem, aumento percentual, desconto percentual, diferença percentual, regra de três, matemática básica, porcentagem simples",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/porcentagem",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "regra-de-tres": {
    id: "regra-de-tres",
    title: "Calculadora de Regra de Três 2025 - Simples e Composta - Calculadora Online BR",
    description:
      "★ Calculadora de regra de três GRATUITA! Resolva regra de três simples e inversa com explicações passo a passo. Para estudos e aplicações práticas do dia a dia.",
    keywords:
      "calculadora regra de três, regra de três simples, regra de três inversa, proporção, matemática básica, regra de três composta, exercicios regra três, como fazer regra três",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/regra-de-tres",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "equacao-segundo-grau": {
    id: "equacao-segundo-grau",
    title: "Calculadora de Equação do 2º Grau 2025 - Fórmula de Bhaskara - Calculadora Online BR",
    description:
      "★ Resolva equações quadráticas usando a fórmula de Bhaskara com resolução passo a passo, análise do discriminante e propriedades da parábola. Ideal para estudos de matemática.",
    keywords:
      "calculadora equacao segundo grau, formula bhaskara, equacao quadratica, discriminante, parabola, raizes equacao, delta bhaskara, matematica ensino medio, algebra",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/equacao-segundo-grau",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "mmc-mdc": {
    id: "mmc-mdc",
    title:
      "Calculadora de MMC e MDC 2025 - Mínimo Múltiplo Comum e Máximo Divisor - Calculadora Online BR",
    description:
      "★ Calcule MMC e MDC com decomposição em fatores primos, métodos passo a passo e aplicações práticas. Ideal para estudos de matemática básica e frações.",
    keywords:
      "calculadora mmc mdc, minimo multiplo comum, maximo divisor comum, fatores primos, decomposicao fatores, matematica basica, fracao, divisibilidade, algoritmo euclides",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/mmc-mdc",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "area-perimetro": {
    id: "area-perimetro",
    title: "Calculadora de Área e Perímetro 2025 - Formas Geométricas - Calculadora Online BR",
    description:
      "★ Calcule área e perímetro de formas geométricas com explicações passo a passo, fórmulas detalhadas e aplicações práticas para arquitetura, engenharia e construção.",
    keywords:
      "calculadora area perimetro, geometria, formas geometricas, triangulo, quadrado, retangulo, circulo, losango, trapezio, matematica geometria, arquitetura, engenharia",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/area-perimetro",
    priority: 0.7,
    changeFreq: "monthly",
  },
  volume: {
    id: "volume",
    title: "Calculadora de Volume 2025 - Sólidos Geométricos 3D - Calculadora Online BR",
    description:
      "★ Calcule volume e área superficial de sólidos 3D como cubo, esfera, cilindro, cone e pirâmide com fórmulas passo a passo e aplicações práticas para engenharia e arquitetura.",
    keywords:
      "calculadora volume, solidos geometricos, geometria espacial, cubo, esfera, cilindro, cone, piramide, prisma, area superficial, matematica 3d, engenharia, arquitetura",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/volume",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "teorema-pitagoras": {
    id: "teorema-pitagoras",
    title:
      "Calculadora do Teorema de Pitágoras 2025 - Triângulos Retângulos - Calculadora Online BR",
    description:
      "★ Calcule hipotenusa, catetos e ângulos em triângulos retângulos com o Teorema de Pitágoras. Verificação de triângulos, trigonometria e triângulos famosos com explicações passo a passo.",
    keywords:
      "calculadora teorema pitagoras, triangulo retangulo, hipotenusa, catetos, pitagoras, trigonometria, matematica geometria, triangulo 3 4 5, angulos triangulo",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/teorema-pitagoras",
    priority: 0.7,
    changeFreq: "monthly",
  },
  fracoes: {
    id: "fracoes",
    title:
      "Calculadora de Frações 2025 - Somar, Subtrair, Multiplicar e Dividir Frações - Calculadora Online BR",
    description:
      "★ Calculadora de frações GRATUITA e completa! Some, subtraia, multiplique e divida frações com explicações passo a passo. Converta entre frações, decimais e números mistos. Simplifique frações automaticamente com métodos educativos.",
    keywords:
      "calculadora frações, somar frações, subtrair frações, multiplicar frações, dividir frações, simplificar frações, converter decimal fração, números mistos, matemática frações, educação matemática, frações equivalentes, denominador comum, numerador",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/matematica/fracoes",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "rescisao-trabalhista": {
    id: "rescisao-trabalhista",
    title:
      "Calculadora de Rescisão Trabalhista 2025 - Direitos Trabalhistas Completos - Calculadora Online BR",
    description:
      "★ Calculadora de rescisão trabalhista GRATUITA e completa! Calcule valores de demissão sem justa causa, com justa causa, pedido de demissão e acordo mútuo. Inclui FGTS, seguro desemprego, férias, 13º e todos os direitos trabalhistas com precisão.",
    keywords:
      "calculadora rescisão trabalhista, demissão sem justa causa, demissão com justa causa, acordo mútuo, pedido demissão, direitos trabalhistas, FGTS multa 40%, seguro desemprego, aviso prévio, férias proporcionais, 13º salário proporcional, cálculo rescisão, trabalhista CLT",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/trabalhista/rescisao",
    priority: 0.9,
    changeFreq: "monthly",
  },
  aposentadoria: {
    id: "aposentadoria",
    title: "Calculadora de Aposentadoria 2025 - INSS + Previdência Privada - Calculadora Online BR",
    description:
      "★ Simulador de aposentadoria GRATUITO e completo! Planeje INSS + previdência privada, calcule tempo para aposentar, valores de benefício e estratégias otimizadas. Ferramenta essencial para seu planejamento previdenciário com cenários personalizados.",
    keywords:
      "calculadora aposentadoria, simulador aposentadoria inss, previdencia privada, tempo para aposentar, beneficio inss, planejamento previdenciario, aposentadoria idade, aposentadoria tempo contribuicao, factor previdenciario, regras transicao, PGBL, VGBL, reforma previdencia",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/trabalhista/aposentadoria",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "auxilio-doenca": {
    id: "auxilio-doenca",
    title:
      "Calculadora de Auxílio-Doença INSS 2025 - Valor do Benefício e Carência - Calculadora Online BR",
    description:
      "★ Calculadora de auxílio-doença INSS GRATUITA! Calcule o valor do benefício com precisão, verifique carência automaticamente, aplica isenções para doenças graves e acidentes conforme legislação 2025.",
    keywords:
      "calculadora auxilio doenca, auxilio doenca inss, valor auxilio doenca, carencia auxilio doenca, beneficio inss doenca, afastamento trabalho, incapacidade temporaria, doenças graves isenção, acidente trabalho, legislação 2025 inss, pericia medica, auxilio incapacidade",
    canonicalUrl: "https://calculadoraonline.com.br/calculadoras/trabalhista/auxilio-doenca",
    priority: 0.9,
    changeFreq: "monthly",
  },
};

export function getCalculatorSEO(calculatorId: string): CalculatorSEOData | null {
  return CALCULATOR_SEO_DATA[calculatorId] || null;
}

export function generateCalculatorMeta(calculatorId: string): ReturnType<MetaFunction> {
  const seoData = getCalculatorSEO(calculatorId);
  if (!seoData) return [];

  const structuredData = generateStructuredData("calculator", { calculatorId });

  return [
    { title: seoData.title },
    { name: "description", content: seoData.description },
    { name: "keywords", content: seoData.keywords },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },

    // Open Graph tags
    { property: "og:title", content: seoData.ogTitle || seoData.title },
    { property: "og:description", content: seoData.ogDescription || seoData.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: seoData.canonicalUrl },
    { property: "og:site_name", content: "Calculadora Online BR" },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: seoData.ogTitle || seoData.title },
    { name: "twitter:description", content: seoData.ogDescription || seoData.description },

    // Additional SEO tags
    { name: "application-name", content: "Calculadora Online BR" },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "theme-color", content: "#1e40af" },
    { name: "format-detection", content: "telephone=no" },
    { rel: "canonical", href: seoData.canonicalUrl },

    // Structured Data
    ...(structuredData
      ? [
          {
            "script:ld+json": structuredData,
          },
        ]
      : []),
  ];
}

export function getAllCalculatorUrls(): Array<{
  id: string;
  url: string;
  priority: number;
  changeFreq: string;
}> {
  return Object.values(CALCULATOR_SEO_DATA).map((seo) => ({
    id: seo.id,
    url: seo.canonicalUrl,
    priority: seo.priority,
    changeFreq: seo.changeFreq,
  }));
}

export function getCategorySEO(categoryId: string) {
  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  if (!category) return null;

  const categoryCalculators = CALCULATORS.filter((calc) => calc.category === categoryId);

  return {
    title: `Calculadoras de ${category.name} 2025 - ${categoryCalculators.length} Ferramentas Gratuitas - Calculadora Online BR`,
    description: `★ ${categoryCalculators.length} calculadoras de ${category.name.toLowerCase()} GRATUITAS! ${category.description} Ferramentas precisas, fáceis de usar e sem cadastro.`,
    keywords:
      categoryCalculators.map((calc) => calc.name.toLowerCase()).join(", ") +
      ", " +
      category.name.toLowerCase(),
    canonicalUrl: `https://calculadoraonline.com.br${category.path}`,
    structuredData: generateStructuredData("category", { categoryId }),
  };
}
