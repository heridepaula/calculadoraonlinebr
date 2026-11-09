import { APP_URL, CALCULATORS, CATEGORIES, SEO_YEAR } from "~/lib/constants";
import type { MetaFunction } from "@remix-run/node";
import { generateStructuredData } from "~/utils/seo";

export interface CalculatorSEOData {
  id: string;
  /** Título sem a marca; buildCalculatorMeta anexa " | CalculadoraOnlineBR" quando cabe em 60 caracteres. */
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl: string;
  priority: number;
  changeFreq: string;
}

export const CALCULATOR_SEO_DATA: Record<string, CalculatorSEOData> = {
  // Health Calculators
  imc: {
    id: "imc",
    title: `Calculadora de IMC ${SEO_YEAR}`,
    description:
      "Calculadora IMC grátis com taxa metabólica e percentual gordura. Classificação por idade, sexo e análise corporal completa OMS.",
    keywords:
      "calculadora imc, indice massa corporal, calcular imc, peso ideal, obesidade, sobrepeso, imc adulto, imc infantil, tabela imc oms, saude peso",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "gordura-corporal": {
    id: "gordura-corporal",
    title: `Calculadora de Gordura Corporal ${SEO_YEAR} CalculadoraOnlineBR`,
    description:
      "Calculadora gordura corporal grátis. Calcule percentual de gordura, massa magra e análise corporal completa. Método científico com fórmulas.",
    keywords:
      "calculadora gordura corporal, percentual gordura, bioimpedancia, dobras cutaneas, composicao corporal, massa magra, jackson pollock, navy formula, ymca",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/gordura-corporal",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "ciclo-menstrual": {
    id: "ciclo-menstrual",
    title: `Calculadora Ciclo Menstrual ${SEO_YEAR}`,
    description:
      "Calcule ciclo menstrual, período fértil e ovulação. Calendário visual com previsões confiáveis. Ferramenta grátis para saúde feminina.",
    keywords:
      "calculadora ciclo menstrual, periodo fertil, ovulacao, proxima menstruacao, fertilidade, tabelinha, calendario menstrual, saude feminina, engravidar",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "desenvolvimento-infantil": {
    id: "desenvolvimento-infantil",
    title: `Calculadora de Desenvolvimento Infantil ${SEO_YEAR}`,
    description:
      "Acompanhe desenvolvimento infantil com gráficos OMS. Calcule percentis de altura e peso, marcos do crescimento. Ferramenta grátis para pais.",
    keywords:
      "desenvolvimento infantil, marcos do bebe, crescimento infantil, pediatria, desenvolvimento motor, cognitivo, social, linguagem, primeiros passos, primeiras palavras",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
    priority: 0.8,
    changeFreq: "monthly",
  },
  hidratacao: {
    id: "hidratacao",
    title: `Calculadora de Hidratação Diária ${SEO_YEAR}`,
    description:
      "Calculadora hidratação diária grátis. Calcule quantidade ideal de água, necessidades hídricas personalizadas. Método científico.",
    keywords:
      "calculadora hidratacao, necessidade agua, quantos litros agua beber, desidratacao, balance hidrico, agua diaria, sede, hidratacao exercicio, clima quente",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "peso-gravidez": {
    id: "peso-gravidez",
    title:
      `Peso na Gravidez ${SEO_YEAR}`,
    description:
      "Calculadora peso gravidez grátis segundo OMS. Monitore ganho gestacional por trimestre com análise completa e diretrizes médicas atualizadas.",
    keywords:
      "calculadora peso gravidez, ganho peso gestacional, peso gestante, OMS gravidez, peso ideal gestante, IMC pré gestacional, peso trimestre, ganho peso saudável, monitoramento peso gravidez, pré-natal peso",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
    priority: 0.8,
    changeFreq: "monthly",
  },

  // Financial Calculators
  "juros-compostos": {
    id: "juros-compostos",
    title:
      "Calculadora de Juros Compostos",
    description:
      "Calcule juros compostos e potencialize seus investimentos. Simule aportes mensais, tempo e rentabilidade com gráficos interativos educativos.",
    keywords:
      "calculadora juros compostos, juros sobre juros, aportes mensais, investimento longo prazo, simulador financeiro, crescimento exponencial, planejamento aposentadoria, como calcular juros compostos, fórmula juros compostos, CDI, tesouro direto, fundos investimento",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "primeiro-milhao": {
    id: "primeiro-milhao",
    title: "Calculadora Primeiro Milhão",
    description:
      "Descubra quanto investir para ter 1 milhão. Simule aportes mensais, rentabilidade e prazo necessário para alcançar independência financeira.",
    keywords:
      "calculadora primeiro milhão, como ficar milionário, quanto tempo para ser milionário, investir para ser milionário, planejamento financeiro milionário, simulação primeiro milhão, independência financeira, juros compostos primeiro milhão",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
    priority: 0.9,
    changeFreq: "monthly",
  },
  cdb: {
    id: "cdb",
    title: "Calculadora de CDB",
    description:
      "Calcule rendimento CDB pré e pós-fixado. Compare taxas, simule investimentos com diferentes prazos e descubra a melhor opção para seu perfil.",
    keywords:
      "calculadora cdb, certificado depósito bancário, cdb tributação, imposto renda cdb, cdb vs lci lca, cdb aportes mensais, rendimento cdb, taxa cdb, cdb pré fixado, cdb pós fixado, cdb ipca",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/cdb",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "tesouro-direto": {
    id: "tesouro-direto",
    title: `Calculadora de Tesouro Direto ${SEO_YEAR}`,
    description:
      "Simule Tesouro Direto com dados reais. Compare Selic, IPCA+ e Prefixado. Calcule rentabilidade, imposto de renda e taxa de custódia.",
    keywords:
      "calculadora tesouro direto, tesouro selic, tesouro prefixado, tesouro ipca, cupons semestrais, simulador títulos públicos, rendimento tesouro direto, imposto renda tesouro, taxa selic atual, ipca atual",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "antecipacao-parcelas-nubank": {
    id: "antecipacao-parcelas-nubank",
    title:
      "Calculadora de Antecipação Parcelas Nubank",
    description:
      "Simule antecipação de parcelas do cartão Nubank. Calcule desconto, juros e economia ao antecipar faturas parceladas com análise detalhada.",
    keywords:
      "calculadora antecipacao nubank, antecipar parcelas nubank, desconto antecipacao, quitar emprestimo nubank, economia antecipacao, simulador nubank, parcelas nubank, calculadora nubank",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "lci-lca": {
    id: "lci-lca",
    title: `Calculadora de LCI e LCA ${SEO_YEAR}`,
    description:
      "Calcule rendimentos LCI e LCA isentos de IR. Simule investimentos baseados no CDI e compare rentabilidade. Grátis e atualizada.",
    keywords:
      "calculadora LCI, calculadora LCA, letra de crédito imobiliário, letra de crédito agronegócio, investimento LCI LCA, rendimento LCI LCA, carência LCI LCA, isenção imposto renda, CDI LCI LCA",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "emprestimo-consignado": {
    id: "emprestimo-consignado",
    title:
      `Calculadora de Empréstimo Consignado ${SEO_YEAR}`,
    description:
      "Simule empréstimo consignado: calcule parcelas, CET e IOF. Descubra valor líquido e total de juros para aposentados e servidores.",
    keywords:
      "calculadora empréstimo consignado, consignado CLT, consignado servidor público, consignado aposentado, margem consignável, simulador consignado, taxa empréstimo consignado, parcela consignado",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "financiamento-imobiliario": {
    id: "financiamento-imobiliario",
    title:
      `Calculadora de Financiamento Imobiliário ${SEO_YEAR}`,
    description:
      "Simule financiamento imobiliário SAC e PRICE. Calcule parcelas, amortização e juros totais para compra da casa própria.",
    keywords:
      "calculadora financiamento imobiliário, simulador financiamento casa, SAC vs PRICE, tabela price, sistema SAC, prestação financiamento, juros financiamento imóvel, amortização constante, affordability imóvel",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "juros-simples": {
    id: "juros-simples",
    title: `Calculadora de Juros Simples ${SEO_YEAR}`,
    description:
      "Calcule juros simples online grátis. Simule crescimento linear do capital com gráficos interativos. Fórmula: M = C + (C × i × t).",
    keywords:
      "calculadora juros simples, como calcular juros simples, fórmula juros simples, juros lineares, empréstimo curto prazo, desconto duplicata, calculadora financeira, matemática financeira",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-simples",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "preco-medio": {
    id: "preco-medio",
    title: `Calculadora de Preço Médio Ações ${SEO_YEAR}`,
    description:
      "Calcule preço médio ponderado de ações grátis. Adicione compras/vendas, veja lucro/prejuízo em tempo real. Ferramenta completa para investidores.",
    keywords:
      "calculadora preço médio, preço médio ações, investimento ações, bolsa valores, dividend yield, carteira investimentos, ganhos perdas ações, estrategia investimento, buy and hold",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
    priority: 0.7,
    changeFreq: "monthly",
  },
  consorcio: {
    id: "consorcio",
    title: `Calculadora de Consórcio ${SEO_YEAR}`,
    description:
      "Calcule parcelas de consórcio de imóveis e carros. Simule taxa de administração, contemplação e lance para escolher o melhor grupo.",
    keywords:
      "calculadora consórcio, simulador consórcio, consórcio imóvel, consórcio veículo, consórcio moto, parcelas consórcio, contemplação consórcio, taxa administração, grupos consórcio, lance consórcio, sorteio consórcio",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/consorcio",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "renda-fixa-comparativa": {
    id: "renda-fixa-comparativa",
    title:
      `Comparador Renda Fixa ${SEO_YEAR}`,
    description:
      `Compare renda fixa ${SEO_YEAR}: CDB vs LCI/LCA vs Tesouro vs Poupança. Compare rentabilidade líquida com IR e descubra o melhor investimento.`,
    keywords:
      "renda fixa comparativa, comparar investimentos, CDB vs LCI, CDB vs poupança, tesouro direto vs CDB, simulador renda fixa, ranking renda fixa, melhor investimento renda fixa, IR renda fixa, IOF renda fixa, rendimento líquido, taxa CDI",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
    priority: 0.9,
    changeFreq: "monthly",
  },

  // Mathematical Calculators
  porcentagem: {
    id: "porcentagem",
    title: `Calculadora de Porcentagem ${SEO_YEAR}`,
    description:
      "Calcule porcentagem online: aumentos, descontos e diferenças percentuais. Grátis, confiável e com explicação passo a passo.",
    keywords:
      "calculadora porcentagem, calcular porcentagem, aumento percentual, desconto percentual, diferença percentual, regra de três, matemática básica, porcentagem simples",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "regra-de-tres": {
    id: "regra-de-tres",
    title: `Calculadora de Regra de Três ${SEO_YEAR}`,
    description:
      "Calculadora regra de três simples e composta grátis. Resolva proporções com explicação passo a passo. Resultados confiáveis.",
    keywords:
      "calculadora regra de três, regra de três simples, regra de três inversa, proporção, matemática básica, regra de três composta, exercicios regra três, como fazer regra três",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "equacao-segundo-grau": {
    id: "equacao-segundo-grau",
    title: `Calculadora de Equação 2º Grau ${SEO_YEAR}`,
    description:
      "Resolva equações 2º grau com Bhaskara. Calcule delta, raízes reais e complexas grátis. Ferramenta ideal para estudantes.",
    keywords:
      "calculadora equacao segundo grau, formula bhaskara, equacao quadratica, discriminante, parabola, raizes equacao, delta bhaskara, matematica ensino medio, algebra",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "mmc-mdc": {
    id: "mmc-mdc",
    title:
      `Calculadora de MMC e MDC ${SEO_YEAR}`,
    description:
      "Calcule MMC e MDC rápido e confiável. Fatoração completa com explicação passo a passo. Mínimo Múltiplo Comum e Máximo Divisor Comum grátis.",
    keywords:
      "calculadora mmc mdc, minimo multiplo comum, maximo divisor comum, fatores primos, decomposicao fatores, matematica basica, fracao, divisibilidade, algoritmo euclides",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "area-perimetro": {
    id: "area-perimetro",
    title: `Calculadora de Área e Perímetro ${SEO_YEAR}`,
    description:
      "Calcule área e perímetro de formas geométricas: retângulo, círculo, triângulo, quadrado. Fórmulas confiáveis para estudos e trabalhos.",
    keywords:
      "calculadora area perimetro, geometria, formas geometricas, triangulo, quadrado, retangulo, circulo, losango, trapezio, matematica geometria, arquitetura, engenharia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
    priority: 0.7,
    changeFreq: "monthly",
  },
  volume: {
    id: "volume",
    title: `Calculadora de Volume ${SEO_YEAR}`,
    description:
      "Calcule volume de formas geométricas: cubo, esfera, cilindro, cone. Fórmulas confiáveis 3D para estudos matemáticos e trabalhos.",
    keywords:
      "calculadora volume, solidos geometricos, geometria espacial, cubo, esfera, cilindro, cone, piramide, prisma, area superficial, matematica 3d, engenharia, arquitetura",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/volume",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "teorema-pitagoras": {
    id: "teorema-pitagoras",
    title: `Calculadora Teorema Pitágoras ${SEO_YEAR} CalculadoraOnlineBR`,
    description:
      "Calcule hipotenusa e catetos de triângulos retângulos com Teorema Pitágoras. Fórmulas confiáveis e resultados instantâneos para estudos.",
    keywords:
      "calculadora teorema pitagoras, triangulo retangulo, hipotenusa, catetos, pitagoras, trigonometria, matematica geometria, triangulo 3 4 5, angulos triangulo",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/teorema-pitagoras",
    priority: 0.7,
    changeFreq: "monthly",
  },
  fracoes: {
    id: "fracoes",
    title:
      `Calculadora de Frações ${SEO_YEAR}`,
    description:
      "Calculadora frações grátis: soma, subtração, multiplicação e divisão. Simplificação automática com resultados instantâneos.",
    keywords:
      "calculadora frações, somar frações, subtrair frações, multiplicar frações, dividir frações, simplificar frações, converter decimal fração, números mistos, matemática frações, educação matemática, frações equivalentes, denominador comum, numerador",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
    priority: 0.8,
    changeFreq: "monthly",
  },
  moda: {
    id: "moda",
    title: `Calculadora de Moda Estatística ${SEO_YEAR}`,
    description:
      "Calculadora moda estatística grátis. Calcule moda de números, identifique amodal, bimodal e multimodal com explicações passo a passo.",
    keywords:
      "calculadora moda, moda estatística, calcular moda, amodal bimodal multimodal, frequência dados, tendência central, estatística básica, medidas posição, análise dados",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
    priority: 0.7,
    changeFreq: "monthly",
  },
  media: {
    id: "media",
    title:
      `Calculadora de Média Estatística ${SEO_YEAR}`,
    description:
      "Calcule média aritmética, geométrica e harmônica com análise completa. Identifique tendência central e desvio padrão com explicações passo a passo.",
    keywords:
      "calculadora média, média aritmética, média geométrica, média harmônica, tendência central, desvio padrão, variância, estatística descritiva, análise dados, estatística básica, matemática estatística",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "desvio-padrao": {
    id: "desvio-padrao",
    title:
      `Calculadora de Desvio Padrão ${SEO_YEAR}`,
    description:
      "Calcule desvio padrão e variância grátis. Medidas de dispersão estatística com explicações passo a passo e fórmulas detalhadas.",
    keywords:
      "calculadora desvio padrão, desvio padrão populacional, desvio padrão amostral, variância, dispersão estatística, medidas variabilidade, correção Bessel, análise dados, estatística descritiva, sigma, estatística matemática, distribuição normal",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
    priority: 0.8,
    changeFreq: "monthly",
  },
  fibonacci: {
    id: "fibonacci",
    title: `Calculadora de Fibonacci ${SEO_YEAR} - Sequência Dourada`,
    description:
      "Calculadora de Fibonacci grátis: gere a sequência, calcule qualquer termo e veja a proporção áurea na natureza, com explicação passo a passo.",
    keywords:
      "calculadora fibonacci, sequencia fibonacci, proporção aurea, razao aurea, fibonacci natureza, matematica fibonacci, sequencia dourada, espiral dourada, phi fibonacci, numeros fibonacci, leonardo fibonacci, matematica na natureza",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "calculadora-cientifica": {
    id: "calculadora-cientifica",
    title:
      `Calculadora Científica Online ${SEO_YEAR}`,
    description:
      "Calculadora científica online grátis com trigonometria, logaritmos, exponenciais, raízes e fatorial. Prática para estudantes e engenheiros.",
    keywords:
      "calculadora científica, calculadora científica online, trigonometria, seno cosseno tangente, logaritmo, exponencial, fatorial, raiz quadrada, calculadora ENEM, calculadora vestibular, pi, número de euler, radianos graus",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "sistemas-equacoes-lineares": {
    id: "sistemas-equacoes-lineares",
    title:
      `Calculadora de Sistemas de Equações Lineares ${SEO_YEAR}`,
    description:
      "Resolva sistemas de equações lineares 2x2 e 3x3 grátis pelos métodos de Gauss, Cramer e matriz inversa, com a solução passo a passo.",
    keywords:
      "sistema equações lineares, sistemas lineares, método Gauss, regra de Cramer, matriz aumentada, álgebra linear, sistema 2x2, sistema 3x3, substituição, escalonamento matrizes, determinante, ensino médio matemática",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/sistemas-equacoes-lineares",
    priority: 0.7,
    changeFreq: "monthly",
  },
  inequacoes: {
    id: "inequacoes",
    title:
      `Calculadora de Inequações 1º e 2º Grau ${SEO_YEAR}`,
    description:
      "✅ Resolva inequações de 1º e 2º grau GRÁTIS! Encontre intervalos e soluções com explicação passo a passo profissional.",
    keywords:
      "calculadora inequações, inequação primeiro grau, inequação segundo grau, estudo do sinal, intervalo solução, reta numérica, notação de conjunto, matemática ENEM, álgebra inequações, desigualdade",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "simplificador-funcoes-algebricas": {
    id: "simplificador-funcoes-algebricas",
    title:
      `Simplificador de Expressões Algébricas e Fatoração ${SEO_YEAR}`,
    description:
      "✅ Simplifique expressões algébricas GRÁTIS! Fatoração automática, termos semelhantes e explicação passo a passo. Teste agora!",
    keywords:
      "simplificador algébrico, simplificar expressões, fatoração polinômios, expansão polinomial, fração algébrica, polinômios, álgebra, simplificar variáveis, matemática ENEM, expressão literal",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/simplificador-funcoes-algebricas",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // Astrology Calculators
  "ascendente-astrologico": {
    id: "ascendente-astrologico",
    title: "Calcular Ascendente Grátis: Hora Nascimento + Mapa Astral",
    description:
      "Calcule seu ascendente grátis com data, hora exata e local de nascimento. Descubra seu signo ascendente e o que ele revela no seu mapa astral.",
    keywords:
      "calculadora ascendente, ascendente astrológico, signo ascendente, mapa astral, astrologia natal, ascendente capricórnio, ascendente leão, calcular ascendente, hora nascimento, astrologia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/ascendente",
    priority: 0.7,
    changeFreq: "monthly",
  },
  signo: {
    id: "signo",
    title: `Descobrir Meu Signo Grátis: Qual Signo Zodiacal ${SEO_YEAR}`,
    description:
      "🌟 Descubra seu Signo Solar GRÁTIS! Qual meu signo do zodíaco? Análise completa de personalidade, amor, carreira e compatibilidade - só com data nascimento.",
    keywords:
      "calculadora signo, descobrir signo, signo do zodíaco, signo data nascimento, áries, touro, gêmeos, câncer, leão, virgem, libra, escorpião, sagitário, capricórnio, aquário, peixes, signo solar",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "compatibilidade-signos": {
    id: "compatibilidade-signos",
    title: `Compatibilidade Signos Amor: Teste Grátis Sinastria ${SEO_YEAR}`,
    description:
      `🔮 Teste Compatibilidade Signos GRÁTIS! Descubra sinastria amorosa, signos que combinam no amor e amizade. Análise percentual completa - Brasil ${SEO_YEAR}.`,
    keywords:
      "compatibilidade signos, teste compatibilidade amor, sinastria, signos compatíveis, sinastria amorosa, compatibilidade astrológica, par perfeito, química signos, relacionamento astrologia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    priority: 0.7,
    changeFreq: "monthly",
  },
  numerologia: {
    id: "numerologia",
    title: "Numerologia Online Grátis",
    description:
      "Calculadora de numerologia pitagórica grátis: descubra seus números da vida, destino, personalidade e alma pelo nome e pela data de nascimento.",
    keywords:
      "calculadora numerologia, numero da vida, numero destino, numerologia cabalística, numerologia nome, numerologia data nascimento, numero pessoal, numero alma, mapa numerológico",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // Date Calculators
  "diferenca-entre-datas": {
    id: "diferenca-entre-datas",
    title: "Calculadora de Diferença entre Datas",
    description:
      "Calcule diferenças entre datas em anos, meses e dias. Descubra sua idade exata, dias úteis e intervalos temporais com nossa calculadora grátis.",
    keywords:
      "calculadora diferença datas, diferença entre datas, calcular idade, dias entre datas, contagem dias, dias úteis, feriados, tempo decorrido, intervalo tempo, idade",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "contagem-regressiva": {
    id: "contagem-regressiva",
    title: "Contagem Regressiva Online Grátis",
    description:
      "Contador regressivo online grátis para eventos: anos, meses, dias, horas, minutos e segundos em tempo real. Crie sua contagem regressiva agora.",
    keywords:
      "contagem regressiva, contador regressivo, contador eventos, contagem dias, contador aniversário, contador casamento, tempo até evento, calculadora dias, countdown timer",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "operacao-datas": {
    id: "operacao-datas",
    title: "Somar dias em datas",
    description:
      "➕➖ Some ou subtraia anos, meses e dias de qualquer data! Calcule datas futuras e passadas com precisão. Ferramenta gratuita e fácil de usar.",
    keywords:
      "calculadora operação datas, somar datas, subtrair datas, adicionar dias, calcular data futura, data passada, prazos, vencimento data, planejamento datas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "idade-exata": {
    id: "idade-exata",
    title: "Calculadora de Idade Online",
    description:
      "🎂 Calcule sua idade exata em anos, meses e dias! Com contador em tempo real de horas, minutos e segundos. Calculadora de idade gratuita e precisa.",
    keywords:
      "calculadora idade, idade exata, calcular idade, idade em dias, idade em meses, próximo aniversário, contador idade, idade tempo real, anos meses dias",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/idade-exata",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "dias-uteis": {
    id: "dias-uteis",
    title: `Calculadora de Dias Úteis ${SEO_YEAR}`,
    description:
      `Calcule dias úteis entre datas com feriados nacionais brasileiros! Inclui Carnaval, Páscoa, emendas e pontes. Algoritmo Gauss preciso ${SEO_YEAR}.`,
    keywords:
      "calculadora dias úteis, dias úteis entre datas, feriados nacionais 2025, contar dias úteis, calendário trabalhista, carnaval feriado, páscoa feriado, dias úteis prazo",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/dias-uteis",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // Tool Calculators
  "gerador-cpf": {
    id: "gerador-cpf",
    title:
      "Gerador de CPF Online",
    description:
      "Gere CPF válido grátis com ou sem pontuação. Ferramenta para testes e desenvolvimento com cópia automática. Geração instantânea e confiável.",
    keywords:
      "gerador CPF, CPF válido, CPF teste, CPF desenvolvimento, CPF sem pontuação, CPF formatado, validador CPF, algoritmo CPF, dígitos verificadores, CPF falso, teste sistema, Receita Federal, CPF brasileiro, ferramenta CPF",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cpf",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "gerador-cnpj": {
    id: "gerador-cnpj",
    title:
      "Gerador de CNPJ Online",
    description:
      "Gere CNPJ válido grátis com ou sem pontuação. Ferramenta para testes e desenvolvimento com cópia automática. Geração instantânea e confiável.",
    keywords:
      "gerador CNPJ, CNPJ válido, CNPJ teste, CNPJ desenvolvimento, CNPJ sem pontuação, CNPJ formatado, validador CNPJ, algoritmo CNPJ, dígitos verificadores CNPJ, CNPJ falso, teste sistema, Receita Federal, CNPJ brasileiro, ferramenta CNPJ",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "validar-cpf": {
    id: "validar-cpf",
    title: "Validar CPF Online",
    description:
      "Valide CPF grátis com ou sem pontuação. Ferramenta para verificar se CPF é válido com algoritmo da Receita Federal. Validação instantânea e confiável.",
    keywords:
      "validador CPF, validar CPF, verificar CPF, CPF válido, CPF inválido, dígito verificador CPF, algoritmo CPF, conferir CPF, checar CPF, Receita Federal, autenticidade CPF, ferramenta validação",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cpf",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "validar-cnpj": {
    id: "validar-cnpj",
    title: "Validar CNPJ Online",
    description:
      "Valide CNPJ grátis com ou sem pontuação. Ferramenta para verificar se CNPJ é válido com algoritmo da Receita Federal. Validação instantânea e confiável.",
    keywords:
      "validador CNPJ, validar CNPJ, verificar CNPJ, CNPJ válido, CNPJ inválido, dígito verificador CNPJ, algoritmo CNPJ, conferir CNPJ, checar CNPJ, Receita Federal, autenticidade CNPJ, ferramenta validação",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cnpj",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "contador-caracteres": {
    id: "contador-caracteres",
    title:
      "Contador de Caracteres Online",
    description:
      "Contador de caracteres gratuito com análise detalhada. Conte letras, palavras, frases e veja estatísticas avançadas. Opções para ignorar espaços e pontuação.",
    keywords:
      "contador caracteres, contar caracteres, contar palavras, contador palavras, contador linhas, contador frases, contador parágrafos, caracteres twitter, redação enem, meta description, SEO texto, contador online",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-cartao-credito": {
    id: "gerador-cartao-credito",
    title:
      "Gerador Cartão de Crédito Online",
    description:
      "Gere números de cartão de crédito válidos para testes de software: Visa, Mastercard, American Express e outras bandeiras. Uso só educacional.",
    keywords:
      "gerador cartão crédito, número cartão válido, cartão teste, cartão desenvolvimento, algoritmo Luhn, visa teste, mastercard teste, amex teste, elo teste, hipercard teste, BIN cartão, número falso cartão, QA pagamento",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-uuid-guid": {
    id: "gerador-uuid-guid",
    title: "Gerador de UUID GUID Online",
    description:
      "Gerador de UUID/GUID grátis: versões v1, v4 e v5, lotes de até 1000 e saída em JS, SQL, MongoDB, Python e Base64, com cópia em um clique.",
    keywords:
      "gerador UUID, gerador GUID, UUID v4, GUID v4, identificador único, RFC 4122, UUID online, GUID online, chave primária, token único, hash aleatório, UUID lote, GUID lote",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-uuid-guid",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "sorteador-online": {
    id: "sorteador-online",
    title:
      "Sorteador Online Profissional | Múltiplos Resultados",
    description:
      "Sorteador online com algoritmo aleatório garantido. Sorteie múltiplos resultados, nomes, objetos e listas com animação profissional. 100% gratuito e confiável.",
    keywords:
      "sorteador online, sorteio números, sorteio nomes, sorteio listas, sorteador times, sorteador grátis, sorteio aleatório, rifa online, sorteio instagram, sorteio live, gerador números aleatórios",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/sorteador-online",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "gerador-senha-segura": {
    id: "gerador-senha-segura",
    title:
      `Gerador de Senhas Seguras ${SEO_YEAR}`,
    description:
      "🔐 Gerador de senhas seguras GRATUITO! Crie senhas personalizáveis com análise de força, cópia automática e controle total de caracteres. Teste agora!",
    keywords:
      "gerador senha, senha segura, senha forte, gerador senha aleatória, criar senha, senha online, força senha, entropia senha, senha caracteres especiais, password generator, segurança digital, senha banco",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "clicks-por-segundo": {
    id: "clicks-por-segundo",
    title: `Teste CPS ${SEO_YEAR}: Clicks Por Segundo Grátis`,
    description:
      `Teste sua velocidade de clique com CPS (Clicks Por Segundo) ${SEO_YEAR}. Análise avançada, rankings dinâmicos e métricas detalhadas. Teste grátis agora!`,
    keywords:
      "clicks por segundo, CPS test, teste cps, velocidade mouse, click test, jitter click, butterfly click, drag click, cps minecraft, gamer cps, contador clicks, teste velocidade clique",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/clicks-por-segundo",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "carro-eletrico-combustao": {
    id: "carro-eletrico-combustao",
    title:
      `Calculadora: Carro Elétrico vs Combustão ${SEO_YEAR}`,
    description:
      "Compare o custo de um carro elétrico com um a combustão: payback, economia por perfil de uso, equivalência em litros e impacto ambiental.",
    keywords:
      "carro elétrico vs combustão, comparativo carro elétrico, custo carro elétrico, economia carro elétrico, gasolina vs elétrico, consumo veículo, custo por km, manutenção carro, IPVA elétrico, mobilidade sustentável",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/carro-eletrico-combustao",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "economia-energia-eletrica": {
    id: "economia-energia-eletrica",
    title:
      `Calculadora de Economia de Energia Elétrica ${SEO_YEAR}`,
    description:
      "Calcule quanto dá para economizar na conta de luz: consumo por aparelho, troca para LED, bandeiras tarifárias e energia solar. Simulação grátis.",
    keywords:
      "economia energia elétrica, reduzir conta luz, aparelho eficiente, lâmpada LED economia, geladeira inverter, ar condicionado A++, simulador economia energia, eficiência energética, ANEEL, kWh economia",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "consumo-energia-eletrica": {
    id: "consumo-energia-eletrica",
    title:
      `Calculadora de Consumo de Energia Elétrica ${SEO_YEAR}`,
    description:
      "Calcule o consumo de cada aparelho em kWh/mês e quanto ele pesa na conta de luz, com simulação de standby e mais de 50 aparelhos cadastrados.",
    keywords:
      "calculadora consumo energia, kwh aparelho, consumo elétrico, conta de luz, watts hora, tarifa ANEEL, custo eletrodoméstico, geladeira consumo, chuveiro consumo, ar condicionado consumo, conta luz mensal",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "conversor-unidades": {
    id: "conversor-unidades",
    title:
      "Conversor de Unidades Online",
    description:
      "Conversor de unidades com 17 categorias: comprimento, massa, volume, área, temperatura, velocidade, dados, energia, pressão e mais. Na hora.",
    keywords:
      "conversor unidades, conversão medidas, metro pés, kg lb, litros galões, celsius fahrenheit, km milha, m2 ft2, conversor temperatura, conversor peso, conversor volume, sistema métrico, sistema imperial",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // Lottery Calculators
  "gerador-mega-sena": {
    id: "gerador-mega-sena",
    title:
      "Gerador de Mega-Sena Grátis com Estratégias",
    description:
      "Gerador de jogos da Mega-Sena grátis com estratégias de frequência, paridade, soma e consecutivos. Gere jogos equilibrados e salve no histórico.",
    keywords:
      "gerador mega sena, jogos mega sena, números aleatórios mega sena, dezenas mega sena, gerador loteria, surpresinha, probabilidade mega sena, números quentes mega sena, números frios mega sena, Caixa loterias",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
    priority: 0.8,
    changeFreq: "weekly",
  },
  "gerador-lotofacil": {
    id: "gerador-lotofacil",
    title:
      "Gerador de Lotofácil Grátis com Estratégias",
    description:
      "Gerador de jogos da Lotofácil grátis com estratégias de frequência, paridade e filtros estatísticos. Gere 15 números equilibrados em um clique.",
    keywords:
      "gerador lotofácil, jogos lotofácil, números aleatórios lotofácil, dezenas lotofácil, gerador loteria, surpresinha lotofácil, probabilidade lotofácil, moldura miolo lotofácil, números quentes lotofácil, Caixa loterias",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    priority: 0.8,
    changeFreq: "weekly",
  },
  "gerador-quina": {
    id: "gerador-quina",
    title: "Gerador de Quina Grátis com Estratégias",
    description:
      "Gerador de jogos da Quina grátis com estratégias de frequência, paridade e filtros matemáticos. Gere 5 números equilibrados e salve no histórico.",
    keywords:
      "gerador quina, jogos quina, números aleatórios quina, dezenas quina, gerador loteria, surpresinha quina, probabilidade quina, números quentes quina, números frios quina, Caixa loterias",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina",
    priority: 0.8,
    changeFreq: "weekly",
  },

  // Betting Calculators
  "criterio-de-kelly": {
    id: "criterio-de-kelly",
    title: `Calculadora do Critério de Kelly para Apostas ${SEO_YEAR}`,
    description:
      "Descubra quanto apostar com a calculadora de Kelly: stake ideal, Half e Quarter Kelly, valor esperado (EV+) e limite de segurança. Grátis e sem cadastro.",
    keywords:
      "calculadora critério de kelly, gestão de banca, calculadora gestão de banca, fórmula de kelly, quanto apostar, stake apostas, half kelly, kelly fracionado, valor esperado apostas, aposta de valor, probabilidade implícita",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/criterio-de-kelly",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "valor-esperado": {
    id: "valor-esperado",
    title: `Calculadora de Valor Esperado (EV+) para Apostas ${SEO_YEAR}`,
    description:
      "Calcule o valor esperado (EV) da sua aposta em reais e em %, descubra a odd justa e veja a projeção da banca em 100 apostas. Grátis e sem cadastro.",
    keywords:
      "calculadora valor esperado, calculadora ev apostas, ev+ apostas, valor esperado apostas, odd de valor, calculadora de valor apostas, aposta de valor, odd justa, probabilidade implícita, expected value",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/valor-esperado",
    priority: 0.8,
    changeFreq: "monthly",
  },
  surebet: {
    id: "surebet",
    title: `Calculadora de Surebet (Arbitragem) 2 e 3 Vias ${SEO_YEAR}`,
    description:
      "Calcule surebets de 2 e 3 resultados: margem de arbitragem, lucro garantido, ROI e quanto apostar em cada casa. Com dica de stakes arredondadas. Grátis.",
    keywords:
      "calculadora surebet, calculadora de arbitragem, aposta segura, calculadora aposta segura, surebet 2 vias, surebet 3 vias, arbitragem apostas esportivas, como calcular surebet, lucro garantido apostas, margem de arbitragem",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/surebet",
    priority: 0.8,
    changeFreq: "monthly",
  },
  dutching: {
    id: "dutching",
    title: `Calculadora de Dutching ${SEO_YEAR}: Lucro Igual em Várias Seleções`,
    description:
      "Calcule quanto apostar em cada seleção no dutching para ter o mesmo lucro, seja qual for a vencedora. Até 10 seleções, com ROI e alerta de prejuízo.",
    keywords:
      "calculadora dutching, dutching apostas, como fazer dutching, calculadora de dutching, dutching placar exato, retornos iguais apostas, dividir aposta em várias seleções, odd equivalente, dutching calculator",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/dutching",
    priority: 0.8,
    changeFreq: "monthly",
  },

  // Labor Calculators
  "rescisao-trabalhista": {
    id: "rescisao-trabalhista",
    title:
      `Calculadora de Rescisão Trabalhista ${SEO_YEAR}`,
    description:
      `Calcule rescisão trabalhista ${SEO_YEAR}: demissão, acordo mútuo, FGTS, seguro desemprego e direitos CLT. Valores atualizados.`,
    keywords:
      "calculadora rescisão trabalhista, demissão sem justa causa, demissão com justa causa, acordo mútuo, pedido demissão, direitos trabalhistas, FGTS multa 40%, seguro desemprego, aviso prévio, férias proporcionais, 13º salário proporcional, cálculo rescisão, trabalhista CLT",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/rescisao",
    priority: 0.9,
    changeFreq: "monthly",
  },
  aposentadoria: {
    id: "aposentadoria",
    title: `Calculadora de Aposentadoria INSS ${SEO_YEAR}`,
    description:
      `Simule aposentadoria INSS ${SEO_YEAR}: idade, pontos, pedágio 50% e 100%. Compare modalidades e descubra a melhor opção de aposentadoria.`,
    keywords:
      "calculadora aposentadoria, simulador aposentadoria inss, previdencia privada, tempo para aposentar, beneficio inss, planejamento previdenciario, aposentadoria idade, aposentadoria tempo contribuicao, factor previdenciario, regras transicao, PGBL, VGBL, reforma previdencia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "auxilio-doenca": {
    id: "auxilio-doenca",
    title:
      `Calculadora de Auxílio-Doença INSS ${SEO_YEAR}`,
    description:
      `Calcule auxílio-doença INSS ${SEO_YEAR}: valor do benefício, verificação carência e isenções. Regras atualizadas e resultado instantâneo.`,
    keywords:
      "calculadora auxilio doenca, auxilio doenca inss, valor auxilio doenca, carencia auxilio doenca, beneficio inss doenca, afastamento trabalho, incapacidade temporaria, doenças graves isenção, acidente trabalho, legislação 2025 inss, pericia medica, auxilio incapacidade",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "salario-liquido": {
    id: "salario-liquido",
    title:
      `Calculadora de Salário Líquido ${SEO_YEAR}`,
    description:
      `Calcule salário líquido ${SEO_YEAR}: descontos INSS e IRRF atualizados. Inclui dependentes, CLT e PJ. Resultado instantâneo.`,
    keywords:
      "calculadora salário líquido, salário líquido 2025, INSS 2025, IRRF 2025, tabela INSS, tabela IRRF, salário CLT, salário PJ, dependentes IR, desconto INSS, simulador salário, contracheque, holerite",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "ferias-decimo-terceiro": {
    id: "ferias-decimo-terceiro",
    title:
      `Calculadora de Férias e 13º Salário ${SEO_YEAR}`,
    description:
      `Calcule férias e 13º salário ${SEO_YEAR}: valores líquidos, INSS, IRRF e abono pecuniário. Calculadora atualizada conforme CLT brasileira.`,
    keywords:
      "calculadora férias, calculadora décimo terceiro, 13º salário 2025, férias proporcionais, abono pecuniário, terço constitucional férias, adiantamento 13, primeira parcela 13, segunda parcela 13, INSS férias, IRRF férias, CLT férias",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "decimo-terceiro": {
    id: "decimo-terceiro",
    title: `Calculadora de 13º Salário ${SEO_YEAR}: Líquido e Parcelas`,
    description: `Calcule o 13º salário ${SEO_YEAR} líquido: 1ª parcela até 30/11, 2ª até 20/12, proporcional aos meses, com INSS, IRRF e isenção de IR até R$ 5 mil.`,
    keywords:
      "calculadora 13º salário, décimo terceiro, 13º proporcional, primeira parcela 13º, segunda parcela 13º, desconto INSS 13º, IR 13º salário",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/decimo-terceiro",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "horas-extras": {
    id: "horas-extras",
    title:
      `Calculadora de Horas Extras CLT ${SEO_YEAR}`,
    description:
      `Calcule horas extras CLT ${SEO_YEAR}: adicional 50% dias úteis, 100% domingos/feriados, 20% noturno. Resultado instantâneo e educativo.`,
    keywords:
      "calculadora horas extras, horas extras CLT, adicional 50%, adicional 100%, adicional noturno 20%, CLT Art 59, hora extra domingo, hora extra feriado, DSR sobre hora extra, jornada trabalho, banco de horas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
    priority: 0.9,
    changeFreq: "monthly",
  },
  multipla: {
    id: "multipla",
    title: `Calculadora de Apostas Múltiplas (Acumulada) ${SEO_YEAR}`,
    description:
      "Calcule a odd combinada, o retorno e a chance de acertar sua aposta múltipla de até 20 seleções. Veja como a margem da casa se acumula. Grátis e sem cadastro.",
    keywords:
      "calculadora de múltipla, calculadora aposta múltipla, calculadora acumulada, odd combinada, calcular múltipla, aposta acumulada, parlay calculadora, retorno aposta múltipla, combinada apostas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/multipla",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "gestao-de-banca": {
    id: "gestao-de-banca",
    title: `Gestão de Banca para Apostas: Stake Fixa e Percentual ${SEO_YEAR}`,
    description:
      "Calcule o valor da unidade e quanto apostar por jogo conforme seu perfil de risco. Simule sequências de derrotas e compare stake fixa e percentual. Grátis.",
    keywords:
      "gestão de banca, calculadora gestão de banca, unidade apostas, stake fixa, stake percentual, quanto apostar por jogo, porcentagem da banca, gestão de banca apostas esportivas, planilha gestão de banca",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/gestao-de-banca",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "conversor-de-odds": {
    id: "conversor-de-odds",
    title: `Conversor de Odds: Decimal, Fracionária e Americana ${SEO_YEAR}`,
    description:
      "Converta odds decimais, fracionárias e americanas e descubra a probabilidade implícita. Inclui tabela de conversão das odds mais comuns. Grátis e sem cadastro.",
    keywords:
      "conversor de odds, converter odds, odd decimal, odd fracionária, odd americana, odds em probabilidade, probabilidade implícita, tabela de odds, como converter odds, calculadora de odds",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/conversor-de-odds",
    priority: 0.8,
    changeFreq: "monthly",
  },
  hedge: {
    id: "hedge",
    title: `Calculadora de Hedge e Cash Out para Apostas ${SEO_YEAR}`,
    description:
      "Calcule quanto apostar no resultado contrário para garantir lucro ou recuperar sua aposta, e compare o hedge com o cash out oferecido pela casa. Grátis.",
    keywords:
      "calculadora hedge, hedge apostas, calculadora cash out, cash out apostas, proteger aposta, aposta de proteção, cobrir aposta, hedge múltipla, garantir lucro aposta",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/hedge",
    priority: 0.8,
    changeFreq: "monthly",
  },
  poisson: {
    id: "poisson",
    title: `Calculadora de Poisson para Futebol: Placar Exato ${SEO_YEAR}`,
    description:
      "Calcule pela distribuição de Poisson a probabilidade de cada placar, do 1X2, de mais/menos gols e de ambos marcam, com a odd justa de cada mercado.",
    keywords:
      "calculadora poisson, poisson futebol, distribuição de poisson futebol, probabilidade de placar, calculadora placar exato, odd justa, probabilidade 1x2, over 2.5 probabilidade, ambos marcam probabilidade, modelo de poisson apostas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/poisson",
    priority: 0.8,
    changeFreq: "monthly",
  },
};

/** Título (sem a marca) e descrição das páginas de categoria, usados por buildCategoryMeta. */
export const CATEGORY_SEO_DATA: Record<string, { title: string; description: string }> = {
  ferramentas: {
    title: "Ferramentas Online Grátis: CPF, CNPJ, UUID e Conversores",
    description:
      "Ferramentas práticas gratuitas para desenvolvedores e uso diário. Gere CPF, CNPJ, UUID/GUID, validadores, contador de caracteres e cálculos de datas.",
  },
  trabalhista: {
    title: `Calculadoras Trabalhistas ${SEO_YEAR}`,
    description:
      `Calculadoras trabalhistas grátis: rescisão, férias, 13º salário, auxílio-doença e aposentadoria. Ferramentas baseadas na CLT atualizada ${SEO_YEAR}.`,
  },
  astrologia: {
    title: `Calculadora Astrológica Grátis ${SEO_YEAR} - Mapa Astral Online`,
    description:
      "Calculadoras astrológicas grátis: mapa astral, ascendente, compatibilidade de signos e numerologia, com análise detalhada para o autoconhecimento.",
  },
  matematica: {
    title: `Calculadoras Matemáticas ${SEO_YEAR}`,
    description:
      "Calculadoras matemáticas grátis: porcentagem, regra de três, frações, área e muito mais. Resolva cálculos rápido e fácil com explicações.",
  },
  financas: {
    title: `Calculadoras Financeiras ${SEO_YEAR}`,
    description:
      "Calculadoras financeiras grátis para investimentos e planejamento. Juros compostos, simples, primeiro milhão, CDB e Tesouro Direto em um só lugar.",
  },
  loterias: {
    title: `Geradores de Jogos de Loterias Grátis ${SEO_YEAR}`,
    description:
      "Gere números da sorte para Mega-Sena, Lotofácil, Quina e outras loterias grátis. Estratégias inteligentes e análises estatísticas para aumentar suas chances.",
  },
  apostas: {
    title: "Calculadoras de Apostas Esportivas: Gestão de Banca e Stake",
    description:
      "Calculadoras grátis para apostas esportivas: gestão de banca, critério de Kelly, valor esperado (EV+), surebet e dutching. Aposte com responsabilidade.",
  },
  datas: {
    title: `Calculadoras de Datas ${SEO_YEAR}: Diferença, Idade e Dias Úteis`,
    description:
      "Calcule diferenças entre datas, idade exata e intervalos temporais grátis. Ferramentas para planejamento com dias úteis e cálculos de tempo.",
  },
  saude: {
    title: `Calculadoras de Saúde ${SEO_YEAR}`,
    description:
      "Calculadoras saúde grátis: IMC, peso ideal, ciclo menstrual e mais. Ferramentas confiáveis baseadas em padrões médicos reconhecidos pela OMS.",
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
    { name: "author", content: "CalculadoraOnlineBR" },
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
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    {
      property: "og:image",
      content: seoData.ogImage || `${APP_URL}/og-image-1200x630.webp`,
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content: `${seoData.ogTitle || seoData.title} - CalculadoraOnlineBR`,
    },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: seoData.ogTitle || seoData.title },
    { name: "twitter:description", content: seoData.ogDescription || seoData.description },
    {
      name: "twitter:image",
      content: seoData.ogImage || `${APP_URL}/og-image-1200x630.webp`,
    },

    // Additional SEO tags
    { name: "application-name", content: "CalculadoraOnlineBR" },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "theme-color", content: "#1e40af" },
    { name: "format-detection", content: "telephone=no" },
    { tagName: "link", rel: "canonical", href: seoData.canonicalUrl },

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
    title: `Calculadoras de ${category.name} 2025 - ${categoryCalculators.length} Ferramentas Gratuitas - CalculadoraOnlineBR`,
    description: `★ ${categoryCalculators.length} calculadoras de ${category.name.toLowerCase()} GRATUITAS! ${category.description} Ferramentas confiáveis, fáceis de usar e sem cadastro.`,
    keywords:
      categoryCalculators.map((calc) => calc.name.toLowerCase()).join(", ") +
      ", " +
      category.name.toLowerCase(),
    canonicalUrl: `https://www.calculadoraonlinebr.com.br${category.path}`,
    structuredData: generateStructuredData("category", { categoryId }),
  };
}
