import { APP_URL, CALCULATORS, CATEGORIES } from "~/lib/constants";
import type { MetaFunction } from "@remix-run/node";
import { generateStructuredData } from "~/utils/seo";

export interface CalculatorSEOData {
  id: string;
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
    title: "Calculadora de IMC 2025 - Índice de Massa Corporal - CalculadoraOnlineBR",
    description:
      "★ Calculadora IMC GRATUITA e atualizada! Calcule seu Índice de Massa Corporal, veja classificações da OMS e receba dicas personalizadas para uma vida mais saudável.",
    keywords:
      "calculadora imc, indice massa corporal, calcular imc, peso ideal, obesidade, sobrepeso, imc adulto, imc infantil, tabela imc oms, saude peso",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "gordura-corporal": {
    id: "gordura-corporal",
    title: "Calculadora de Gordura Corporal 2025 - Métodos Científicos - CalculadoraOnlineBR",
    description:
      "★ Calculadora de gordura corporal com métodos científicos validados! Use fórmulas de Jackson-Pollock, Navy, YMCA e bioimpedância para análise completa da composição corporal.",
    keywords:
      "calculadora gordura corporal, percentual gordura, bioimpedancia, dobras cutaneas, composicao corporal, massa magra, jackson pollock, navy formula, ymca",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/gordura-corporal",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "ciclo-menstrual": {
    id: "ciclo-menstrual",
    title: "Calculadora de Ciclo Menstrual 2025 - Período Fértil e Ovulação - CalculadoraOnlineBR",
    description:
      "★ Calculadora de ciclo menstrual GRATUITA! Calcule período fértil, ovulação, próxima menstruação e janela de fertilidade. Acompanhe sua saúde reprodutiva facilmente.",
    keywords:
      "calculadora ciclo menstrual, periodo fertil, ovulacao, proxima menstruacao, fertilidade, tabelinha, calendario menstrual, saude feminina, engravidar",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/ciclo-menstrual",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "desenvolvimento-infantil": {
    id: "desenvolvimento-infantil",
    title: "Calculadora de Desenvolvimento Infantil 2025 - Marcos do Bebê - CalculadoraOnlineBR",
    description:
      "★ Acompanhe o desenvolvimento do seu bebê com marcos personalizados! Calculadora baseada em diretrizes pediátricas para motor, cognitivo, social e linguagem.",
    keywords:
      "desenvolvimento infantil, marcos do bebe, crescimento infantil, pediatria, desenvolvimento motor, cognitivo, social, linguagem, primeiros passos, primeiras palavras",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
    priority: 0.8,
    changeFreq: "monthly",
  },
  hidratacao: {
    id: "hidratacao",
    title: "Calculadora de Hidratação 2025 - Necessidade Diária de Água - CalculadoraOnlineBR",
    description:
      "★ Calcule sua necessidade diária de água personalizada! Considera atividade física, clima, peso, idade e condições especiais. Mantenha-se hidratado adequadamente.",
    keywords:
      "calculadora hidratacao, necessidade agua, quantos litros agua beber, desidratacao, balance hidrico, agua diaria, sede, hidratacao exercicio, clima quente",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "peso-gravidez": {
    id: "peso-gravidez",
    title:
      "Calculadora de Peso na Gravidez 2025 - Ganho Gestacional pela OMS - CalculadoraOnlineBR",
    description:
      "★ Calculadora de peso na gravidez GRATUITA! Monitore o ganho de peso gestacional com base nas diretrizes da OMS, análise trimestral personalizada e faixas saudáveis por IMC pré-gestacional.",
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
      "Calculadora de Juros Compostos 2025 - Simulador Completo com Aportes - CalculadoraOnlineBR",
    description:
      "★ Calculadora de juros compostos GRATUITA com aportes mensais e gráficos detalhados. Simule investimentos, entenda o poder dos juros sobre juros e descubra como multiplicar seu dinheiro.",
    keywords:
      "calculadora juros compostos, juros sobre juros, aportes mensais, investimento longo prazo, simulador financeiro, crescimento exponencial, planejamento aposentadoria, como calcular juros compostos, fórmula juros compostos, CDI, tesouro direto, fundos investimento",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "primeiro-milhao": {
    id: "primeiro-milhao",
    title: "Calculadora do Primeiro Milhão 2025 - Como Ficar Milionário - CalculadoraOnlineBR",
    description:
      "★ Calculadora do Primeiro Milhão GRATUITA! Descubra em quanto tempo você pode se tornar milionário ou quanto investir mensalmente. Simulações realistas com juros compostos e estratégias comprovadas.",
    keywords:
      "calculadora primeiro milhão, como ficar milionário, quanto tempo para ser milionário, investir para ser milionário, planejamento financeiro milionário, simulação primeiro milhão, independência financeira, juros compostos primeiro milhão",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/primeiro-milhao",
    priority: 0.9,
    changeFreq: "monthly",
  },
  cdb: {
    id: "cdb",
    title: "Calculadora CDB 2025 - Simulador Completo com Tributação - CalculadoraOnlineBR",
    description:
      "★ Calculadora CDB GRATUITA com simulação completa de tributação. Calcule rendimentos, imposto de renda, IOF e compare com LCI/LCA e Poupança. Ferramenta completa para investimentos em renda fixa.",
    keywords:
      "calculadora cdb, certificado depósito bancário, cdb tributação, imposto renda cdb, cdb vs lci lca, cdb aportes mensais, rendimento cdb, taxa cdb, cdb pré fixado, cdb pós fixado, cdb ipca",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/cdb",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "tesouro-direto": {
    id: "tesouro-direto",
    title: "Calculadora Tesouro Direto 2025 - Simulador Completo com Cupons - CalculadoraOnlineBR",
    description:
      "★ Calculadora Tesouro Direto GRATUITA com simulação completa! Calcule rendimentos, cupons semestrais, impostos e compare todos os títulos: Selic, Prefixado, IPCA+. Indexadores reais atualizados.",
    keywords:
      "calculadora tesouro direto, tesouro selic, tesouro prefixado, tesouro ipca, cupons semestrais, simulador títulos públicos, rendimento tesouro direto, imposto renda tesouro, taxa selic atual, ipca atual",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "antecipacao-parcelas-nubank": {
    id: "antecipacao-parcelas-nubank",
    title:
      "Calculadora Antecipação Nubank 2025 - Descontos e Economia de Parcelas - CalculadoraOnlineBR",
    description:
      "★ Calculadora de antecipação Nubank GRATUITA! Calcule quanto você economiza antecipando parcelas. Veja descontos por número de parcelas, análise completa e tome a melhor decisão financeira.",
    keywords:
      "calculadora antecipacao nubank, antecipar parcelas nubank, desconto antecipacao, quitar emprestimo nubank, economia antecipacao, simulador nubank, parcelas nubank, calculadora nubank",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "lci-lca": {
    id: "lci-lca",
    title: "Calculadora LCI e LCA 2025 - Simulador Completo de Investimentos - CalculadoraOnlineBR",
    description:
      "★ Calculadora LCI e LCA GRATUITA com simulações completas. Compare rendimentos, veja vantagens fiscais, calcule carência e descubra se vale mais que CDB e Poupança.",
    keywords:
      "calculadora LCI, calculadora LCA, letra de crédito imobiliário, letra de crédito agronegócio, investimento LCI LCA, rendimento LCI LCA, carência LCI LCA, isenção imposto renda, CDI LCI LCA",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "emprestimo-consignado": {
    id: "emprestimo-consignado",
    title:
      "Calculadora Empréstimo Consignado 2025 - Simulador CLT, Servidor e Aposentado - CalculadoraOnlineBR",
    description:
      "★ Calculadora de empréstimo consignado COMPLETA e GRATUITA para CLT, servidores públicos e aposentados. Simule parcelas, analise margem consignável, compare taxas e descubra o melhor consignado.",
    keywords:
      "calculadora empréstimo consignado, consignado CLT, consignado servidor público, consignado aposentado, margem consignável, simulador consignado, taxa empréstimo consignado, parcela consignado",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/emprestimo-consignado",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "financiamento-imobiliario": {
    id: "financiamento-imobiliario",
    title:
      "Calculadora de Financiamento Imobiliário 2025 - SAC e PRICE - Simulação Completa - CalculadoraOnlineBR",
    description:
      "★ Simulador de financiamento imobiliário COMPLETO e GRATUITO com sistemas SAC e PRICE. Calcule prestações, juros, amortização e análise de affordability. Compare cenários e simule antecipações.",
    keywords:
      "calculadora financiamento imobiliário, simulador financiamento casa, SAC vs PRICE, tabela price, sistema SAC, prestação financiamento, juros financiamento imóvel, amortização constante, affordability imóvel",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/financas/financiamento-imobiliario",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "juros-simples": {
    id: "juros-simples",
    title: "Calculadora de Juros Simples 2025 - Fácil e Rápida - CalculadoraOnlineBR",
    description:
      "★ Calculadora de Juros Simples GRATUITA e fácil de usar. Calcule juros, capital, taxa ou tempo com fórmulas detalhadas. Ideal para empréstimos, financiamentos e aplicações de curto prazo.",
    keywords:
      "calculadora juros simples, como calcular juros simples, fórmula juros simples, juros lineares, empréstimo curto prazo, desconto duplicata, calculadora financeira, matemática financeira",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-simples",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "preco-medio": {
    id: "preco-medio",
    title: "Calculadora de Preço Médio 2025 - Ações e Investimentos - CalculadoraOnlineBR",
    description:
      "★ Calculadora de preço médio GRATUITA para ações e investimentos. Controle ganhos/perdas com múltiplos métodos, acompanhe dividend yield e otimize sua carteira de investimentos.",
    keywords:
      "calculadora preço médio, preço médio ações, investimento ações, bolsa valores, dividend yield, carteira investimentos, ganhos perdas ações, estrategia investimento, buy and hold",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
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
  "renda-fixa-comparativa": {
    id: "renda-fixa-comparativa",
    title:
      "Calculadora Comparativa de Renda Fixa 2025 - CDB, LCI, LCA, Tesouro e Poupança - CalculadoraOnlineBR",
    description:
      "★ Compare CDB, LCI, LCA, Tesouro Direto e Poupança GRATUITAMENTE lado a lado! Ranking automático com taxas reais 2025, descontos de IR e IOF, e análise completa de rendimentos líquidos.",
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
    title: "Calculadora de Porcentagem 2025 - Rápida e Fácil - CalculadoraOnlineBR",
    description:
      "★ Calculadora de porcentagem GRATUITA e fácil! Calcule porcentagens, aumentos, descontos, diferença percentual e muito mais. Ideal para compras, negócios e estudos.",
    keywords:
      "calculadora porcentagem, calcular porcentagem, aumento percentual, desconto percentual, diferença percentual, regra de três, matemática básica, porcentagem simples",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "regra-de-tres": {
    id: "regra-de-tres",
    title: "Calculadora de Regra de Três 2025 - Simples e Composta - CalculadoraOnlineBR",
    description:
      "★ Calculadora de regra de três GRATUITA! Resolva regra de três simples e inversa com explicações passo a passo. Para estudos e aplicações práticas do dia a dia.",
    keywords:
      "calculadora regra de três, regra de três simples, regra de três inversa, proporção, matemática básica, regra de três composta, exercicios regra três, como fazer regra três",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "equacao-segundo-grau": {
    id: "equacao-segundo-grau",
    title: "Calculadora de Equação do 2º Grau 2025 - Fórmula de Bhaskara - CalculadoraOnlineBR",
    description:
      "★ Resolva equações quadráticas usando a fórmula de Bhaskara com resolução passo a passo, análise do discriminante e propriedades da parábola. Ideal para estudos de matemática.",
    keywords:
      "calculadora equacao segundo grau, formula bhaskara, equacao quadratica, discriminante, parabola, raizes equacao, delta bhaskara, matematica ensino medio, algebra",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "mmc-mdc": {
    id: "mmc-mdc",
    title:
      "Calculadora de MMC e MDC 2025 - Mínimo Múltiplo Comum e Máximo Divisor - CalculadoraOnlineBR",
    description:
      "★ Calcule MMC e MDC com decomposição em fatores primos, métodos passo a passo e aplicações práticas. Ideal para estudos de matemática básica e frações.",
    keywords:
      "calculadora mmc mdc, minimo multiplo comum, maximo divisor comum, fatores primos, decomposicao fatores, matematica basica, fracao, divisibilidade, algoritmo euclides",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "area-perimetro": {
    id: "area-perimetro",
    title: "Calculadora de Área e Perímetro 2025 - Formas Geométricas - CalculadoraOnlineBR",
    description:
      "★ Calcule área e perímetro de formas geométricas com explicações passo a passo, fórmulas detalhadas e aplicações práticas para arquitetura, engenharia e construção.",
    keywords:
      "calculadora area perimetro, geometria, formas geometricas, triangulo, quadrado, retangulo, circulo, losango, trapezio, matematica geometria, arquitetura, engenharia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
    priority: 0.7,
    changeFreq: "monthly",
  },
  volume: {
    id: "volume",
    title: "Calculadora de Volume 2025 - Sólidos Geométricos 3D - CalculadoraOnlineBR",
    description:
      "★ Calcule volume e área superficial de sólidos 3D como cubo, esfera, cilindro, cone e pirâmide com fórmulas passo a passo e aplicações práticas para engenharia e arquitetura.",
    keywords:
      "calculadora volume, solidos geometricos, geometria espacial, cubo, esfera, cilindro, cone, piramide, prisma, area superficial, matematica 3d, engenharia, arquitetura",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/volume",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "teorema-pitagoras": {
    id: "teorema-pitagoras",
    title: "Calculadora do Teorema de Pitágoras 2025 - Triângulos Retângulos - CalculadoraOnlineBR",
    description:
      "★ Calcule hipotenusa, catetos e ângulos em triângulos retângulos com o Teorema de Pitágoras. Verificação de triângulos, trigonometria e triângulos famosos com explicações passo a passo.",
    keywords:
      "calculadora teorema pitagoras, triangulo retangulo, hipotenusa, catetos, pitagoras, trigonometria, matematica geometria, triangulo 3 4 5, angulos triangulo",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/teorema-pitagoras",
    priority: 0.7,
    changeFreq: "monthly",
  },
  fracoes: {
    id: "fracoes",
    title:
      "Calculadora de Frações 2025 - Somar, Subtrair, Multiplicar e Dividir Frações - CalculadoraOnlineBR",
    description:
      "★ Calculadora de frações GRATUITA e completa! Some, subtraia, multiplique e divida frações com explicações passo a passo. Converta entre frações, decimais e números mistos. Simplifique frações automaticamente com métodos educativos.",
    keywords:
      "calculadora frações, somar frações, subtrair frações, multiplicar frações, dividir frações, simplificar frações, converter decimal fração, números mistos, matemática frações, educação matemática, frações equivalentes, denominador comum, numerador",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
    priority: 0.8,
    changeFreq: "monthly",
  },
  moda: {
    id: "moda",
    title: "Calculadora de Moda 2025 - Cálculo Estatístico com Frequência - CalculadoraOnlineBR",
    description:
      "★ Calculadora de moda estatística GRATUITA! Calcule amodal, bimodal, multimodal com tabela de frequências. Análise completa de tendência central com explicações passo a passo.",
    keywords:
      "calculadora moda, moda estatística, calcular moda, amodal bimodal multimodal, frequência dados, tendência central, estatística básica, medidas posição, análise dados",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
    priority: 0.7,
    changeFreq: "monthly",
  },
  media: {
    id: "media",
    title:
      "Calculadora de Média Estatística 2025 - Aritmética, Geométrica e Harmônica - CalculadoraOnlineBR",
    description:
      "★ Calculadora de média estatística GRATUITA! Calcule média aritmética, geométrica e harmônica com análise completa. Desvio padrão, variância e medidas de tendência central com explicações detalhadas.",
    keywords:
      "calculadora média, média aritmética, média geométrica, média harmônica, tendência central, desvio padrão, variância, estatística descritiva, análise dados, estatística básica, matemática estatística",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "desvio-padrao": {
    id: "desvio-padrao",
    title:
      "Calculadora de Desvio Padrão 2025 - Populacional e Amostral com Variância - CalculadoraOnlineBR",
    description:
      "★ Calculadora de desvio padrão GRATUITA! Calcule desvio padrão populacional e amostral com variância. Análise de dispersão estatística completa com explicações passo a passo e interpretação dos resultados.",
    keywords:
      "calculadora desvio padrão, desvio padrão populacional, desvio padrão amostral, variância, dispersão estatística, medidas variabilidade, correção Bessel, análise dados, estatística descritiva, sigma, estatística matemática, distribuição normal",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
    priority: 0.8,
    changeFreq: "monthly",
  },
  fibonacci: {
    id: "fibonacci",
    title: "Calculadora de Fibonacci 2025 - Sequência Dourada e Proporção Áurea - CalculadoraOnlineBR",
    description:
      "★ Calculadora de Fibonacci GRATUITA! Explore a famosa sequência matemática, calcule termos específicos, visualize propriedades da proporção áurea e descubra a matemática presente na natureza.",
    keywords:
      "calculadora fibonacci, sequencia fibonacci, proporção aurea, razao aurea, fibonacci natureza, matematica fibonacci, sequencia dourada, espiral dourada, phi fibonacci, numeros fibonacci, leonardo fibonacci, matematica na natureza",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "calculadora-cientifica": {
    id: "calculadora-cientifica",
    title:
      "Calculadora Científica Online 2025 - Funções Avançadas e Trigonometria - CalculadoraOnlineBR",
    description:
      "★ Calculadora científica online GRATUITA! Funções trigonométricas (sin, cos, tan), logaritmos, exponenciais, raízes, fatorial, constantes (π, e) e operações com graus/radianos. Ideal para ENEM, vestibular e engenharia.",
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
      "Calculadora de Sistemas de Equações Lineares 2025 - Método de Gauss e Cramer - CalculadoraOnlineBR",
    description:
      "★ Resolva sistemas de equações lineares GRATUITAMENTE! Métodos de Gauss, Cramer e substituição com passo a passo. Sistemas 2x2, 3x3 e n x n com matriz aumentada e interpretação geométrica.",
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
      "Calculadora de Inequações 2025 - 1º e 2º Grau com Resolução Passo a Passo - CalculadoraOnlineBR",
    description:
      "★ Resolva inequações de 1º e 2º grau GRATUITAMENTE! Estudo do sinal, intervalo solução, representação na reta numérica e em notação de conjunto. Ideal para ENEM e vestibulares.",
    keywords:
      "calculadora inequações, inequação primeiro grau, inequação segundo grau, estudo do sinal, intervalo solução, reta numérica, notação de conjunto, matemática ENEM, álgebra inequações, desigualdade",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "simplificador-funcoes-algebricas": {
    id: "simplificador-funcoes-algebricas",
    title:
      "Simplificador de Funções Algébricas 2025 - Polinômios e Expressões - CalculadoraOnlineBR",
    description:
      "★ Simplificador de expressões algébricas GRATUITO! Fatore, expanda e simplifique polinômios, frações algébricas e expressões com variáveis. Mostra passo a passo educativo.",
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
    title: "Calculadora de Ascendente Astrológico 2025 - Mapa Astral - CalculadoraOnlineBR",
    description:
      "★ Descubra seu signo ascendente GRATUITAMENTE! Calcule seu ascendente astrológico usando data, hora e local de nascimento. Entenda como você se apresenta ao mundo na astrologia natal.",
    keywords:
      "calculadora ascendente, ascendente astrológico, signo ascendente, mapa astral, astrologia natal, ascendente capricórnio, ascendente leão, calcular ascendente, hora nascimento, astrologia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/ascendente",
    priority: 0.7,
    changeFreq: "monthly",
  },
  signo: {
    id: "signo",
    title: "Descubra Seu Signo 2025 - Signo do Zodíaco por Data de Nascimento - CalculadoraOnlineBR",
    description:
      "★ Descubra seu signo zodiacal GRATUITAMENTE! Identifique seu signo solar pela data de nascimento e conheça características, elementos e personalidade na astrologia.",
    keywords:
      "calculadora signo, descobrir signo, signo do zodíaco, signo data nascimento, áries, touro, gêmeos, câncer, leão, virgem, libra, escorpião, sagitário, capricórnio, aquário, peixes, signo solar",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "compatibilidade-signos": {
    id: "compatibilidade-signos",
    title: "Compatibilidade de Signos 2025 - Teste Astrológico para Amor - CalculadoraOnlineBR",
    description:
      "★ Teste a compatibilidade entre signos GRATUITAMENTE! Análise astrológica completa para amor, amizade e trabalho. Descubra a química entre você e seu par com dicas personalizadas.",
    keywords:
      "compatibilidade signos, teste compatibilidade amor, sinastria, signos compatíveis, sinastria amorosa, compatibilidade astrológica, par perfeito, química signos, relacionamento astrologia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    priority: 0.7,
    changeFreq: "monthly",
  },
  numerologia: {
    id: "numerologia",
    title: "Calculadora de Numerologia 2025 - Número da Vida e Destino - CalculadoraOnlineBR",
    description:
      "★ Calculadora de numerologia GRATUITA! Descubra seus números da vida, personalidade, destino e alma com interpretações detalhadas baseadas em nome completo e data de nascimento.",
    keywords:
      "calculadora numerologia, numero da vida, numero destino, numerologia cabalística, numerologia nome, numerologia data nascimento, numero pessoal, numero alma, mapa numerológico",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // Date Calculators
  "diferenca-entre-datas": {
    id: "diferenca-entre-datas",
    title: "Calculadora de Diferença entre Datas 2025 - Idade e Dias Úteis - CalculadoraOnlineBR",
    description:
      "★ Calculadora de diferença entre datas GRATUITA! Calcule diferença em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e cálculo de idade.",
    keywords:
      "calculadora diferença datas, diferença entre datas, calcular idade, dias entre datas, contagem dias, dias úteis, feriados, tempo decorrido, intervalo tempo, idade",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/datas/diferenca-entre-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "contagem-regressiva": {
    id: "contagem-regressiva",
    title: "Calculadora de Contagem Regressiva 2025 - Contador Personalizado - CalculadoraOnlineBR",
    description:
      "★ Contagem regressiva GRATUITA para eventos especiais! Contador personalizado em anos, meses, dias, horas, minutos e segundos. Para aniversários, casamentos, viagens e mais.",
    keywords:
      "contagem regressiva, contador regressivo, contador eventos, contagem dias, contador aniversário, contador casamento, tempo até evento, calculadora dias, countdown timer",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "operacao-datas": {
    id: "operacao-datas",
    title: "Calculadora de Operações entre Datas 2025 - Somar e Subtrair Datas - CalculadoraOnlineBR",
    description:
      "★ Some ou subtraia anos, meses e dias de qualquer data GRATUITAMENTE! Descubra datas futuras e passadas com precisão. Útil para prazos, vencimentos e planejamento.",
    keywords:
      "calculadora operação datas, somar datas, subtrair datas, adicionar dias, calcular data futura, data passada, prazos, vencimento data, planejamento datas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/operacao-datas",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "idade-exata": {
    id: "idade-exata",
    title: "Calculadora de Idade Exata 2025 - Anos, Meses, Dias e Tempo Real - CalculadoraOnlineBR",
    description:
      "★ Calculadora de idade exata GRATUITA! Calcule sua idade em anos, meses, dias com contador em tempo real. Descubra quantos dias você viveu e quando será seu próximo aniversário.",
    keywords:
      "calculadora idade, idade exata, calcular idade, idade em dias, idade em meses, próximo aniversário, contador idade, idade tempo real, anos meses dias",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/idade-exata",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "dias-uteis": {
    id: "dias-uteis",
    title: "Calculadora de Dias Úteis 2025 - Feriados Nacionais Incluídos - CalculadoraOnlineBR",
    description:
      "★ Calculadora de dias úteis GRATUITA! Conte dias úteis entre datas considerando feriados nacionais brasileiros, Carnaval, Páscoa e emendas. Calendário 2025 atualizado.",
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
      "Gerador de CPF 2025 - Válido com/sem Pontuação + Cópia Automática - CalculadoraOnlineBR",
    description:
      "★ Gerador de CPF GRATUITO e válido para testes e desenvolvimento! Gere CPFs com ou sem pontuação, cópia automática para área de transferência. Algoritmo da Receita Federal com validação matemática completa.",
    keywords:
      "gerador CPF, CPF válido, CPF teste, CPF desenvolvimento, CPF sem pontuação, CPF formatado, validador CPF, algoritmo CPF, dígitos verificadores, CPF falso, teste sistema, Receita Federal, CPF brasileiro, ferramenta CPF",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cpf",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "gerador-cnpj": {
    id: "gerador-cnpj",
    title:
      "Gerador de CNPJ 2025 - Válido com/sem Pontuação + Cópia Automática - CalculadoraOnlineBR",
    description:
      "★ Gerador de CNPJ GRATUITO e válido para testes! Gere CNPJs com ou sem máscara, dígitos verificadores corretos pelo algoritmo da Receita Federal. Ideal para QA, desenvolvimento e homologação.",
    keywords:
      "gerador CNPJ, CNPJ válido, CNPJ teste, CNPJ desenvolvimento, CNPJ sem pontuação, CNPJ formatado, validador CNPJ, algoritmo CNPJ, dígitos verificadores CNPJ, CNPJ falso, teste sistema, Receita Federal, CNPJ brasileiro, ferramenta CNPJ",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "validar-cpf": {
    id: "validar-cpf",
    title: "Validador de CPF 2025 - Verificação Online Instantânea - CalculadoraOnlineBR",
    description:
      "★ Validador de CPF GRATUITO e instantâneo! Verifique se um CPF é matematicamente válido com base nos dígitos verificadores da Receita Federal. Identifica CPFs inválidos e sequências repetidas.",
    keywords:
      "validador CPF, validar CPF, verificar CPF, CPF válido, CPF inválido, dígito verificador CPF, algoritmo CPF, conferir CPF, checar CPF, Receita Federal, autenticidade CPF, ferramenta validação",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cpf",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "validar-cnpj": {
    id: "validar-cnpj",
    title: "Validador de CNPJ 2025 - Verificação Online Instantânea - CalculadoraOnlineBR",
    description:
      "★ Validador de CNPJ GRATUITO e instantâneo! Verifique se um CNPJ é matematicamente válido pelos dígitos verificadores da Receita Federal. Detecta CNPJs inválidos e sequências repetidas.",
    keywords:
      "validador CNPJ, validar CNPJ, verificar CNPJ, CNPJ válido, CNPJ inválido, dígito verificador CNPJ, algoritmo CNPJ, conferir CNPJ, checar CNPJ, Receita Federal, autenticidade CNPJ, ferramenta validação",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cnpj",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "contador-caracteres": {
    id: "contador-caracteres",
    title:
      "Contador de Caracteres, Palavras e Linhas 2025 - Online Gratuito - CalculadoraOnlineBR",
    description:
      "★ Contador de caracteres GRATUITO e em tempo real! Conte caracteres com e sem espaços, palavras, frases, linhas e parágrafos. Ideal para Twitter, redações, SEO, meta descriptions e textos acadêmicos.",
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
      "Gerador de Cartão de Crédito Válido 2025 - Visa, Master, Amex (Teste) - CalculadoraOnlineBR",
    description:
      "★ Gerador de números de cartão de crédito GRATUITO para testes! Visa, MasterCard, Amex, Elo, Hipercard. Números válidos pelo algoritmo de Luhn — apenas para QA, desenvolvimento e homologação.",
    keywords:
      "gerador cartão crédito, número cartão válido, cartão teste, cartão desenvolvimento, algoritmo Luhn, visa teste, mastercard teste, amex teste, elo teste, hipercard teste, BIN cartão, número falso cartão, QA pagamento",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "gerador-uuid-guid": {
    id: "gerador-uuid-guid",
    title: "Gerador de UUID / GUID v4 2025 - Identificadores Únicos - CalculadoraOnlineBR",
    description:
      "★ Gerador de UUID/GUID GRATUITO! Crie identificadores únicos universais v4 (RFC 4122) em lote, com ou sem hífens. Ideal para chaves primárias, tokens, banco de dados e integrações.",
    keywords:
      "gerador UUID, gerador GUID, UUID v4, GUID v4, identificador único, RFC 4122, UUID online, GUID online, chave primária, token único, hash aleatório, UUID lote, GUID lote",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-uuid-guid",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "sorteador-online": {
    id: "sorteador-online",
    title:
      "Sorteador Online Grátis 2025 - Números, Nomes, Listas e Times - CalculadoraOnlineBR",
    description:
      "★ Sorteador online GRATUITO e imparcial! Sorteie números aleatórios, nomes, listas e times. Ideal para rifas, brincadeiras, lives, sorteios no Instagram e divisão de equipes.",
    keywords:
      "sorteador online, sorteio números, sorteio nomes, sorteio listas, sorteador times, sorteador grátis, sorteio aleatório, rifa online, sorteio instagram, sorteio live, gerador números aleatórios",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/sorteador-online",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "gerador-senha-segura": {
    id: "gerador-senha-segura",
    title:
      "Gerador de Senha Segura 2025 - Criação de Senhas Fortes Online - CalculadoraOnlineBR",
    description:
      "★ Gerador de senhas fortes GRATUITO! Crie senhas seguras com letras, números, símbolos e tamanho personalizável. Avalia entropia, força e exibe medidor visual em tempo real.",
    keywords:
      "gerador senha, senha segura, senha forte, gerador senha aleatória, criar senha, senha online, força senha, entropia senha, senha caracteres especiais, password generator, segurança digital, senha banco",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "clicks-por-segundo": {
    id: "clicks-por-segundo",
    title: "Teste de Clicks por Segundo (CPS) 2025 - Velocidade do Mouse - CalculadoraOnlineBR",
    description:
      "★ Teste de Clicks por Segundo (CPS) GRATUITO! Meça quantos clicks você faz em 1, 5, 10, 30 e 60 segundos. Ideal para gamers, Minecraft PvP, Fortnite e treinos de velocidade.",
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
      "Carro Elétrico vs Combustão 2025 - Comparativo Econômico Anual - CalculadoraOnlineBR",
    description:
      "★ Calculadora carro elétrico vs combustão GRATUITA! Compare custo por km, manutenção, IPVA e consumo anual entre veículos elétricos, híbridos, gasolina e etanol. Descubra qual vale mais a pena.",
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
      "Calculadora de Economia de Energia Elétrica 2025 - Reduza sua Conta - CalculadoraOnlineBR",
    description:
      "★ Calculadora de economia de energia elétrica GRATUITA! Simule trocas de aparelhos por modelos mais eficientes (LED, inverter, A++) e descubra quanto pode economizar por mês e por ano na conta de luz.",
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
      "Calculadora de Consumo de Energia Elétrica 2025 - kWh, Watts e Conta de Luz - CalculadoraOnlineBR",
    description:
      "★ Calculadora de consumo de energia elétrica GRATUITA! Calcule kWh consumidos por aparelho, custo mensal na conta de luz e estime sua conta com base na tarifa local (ANEEL).",
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
      "Conversor de Unidades 2025 - Comprimento, Peso, Volume, Temperatura - CalculadoraOnlineBR",
    description:
      "★ Conversor de unidades GRATUITO e completo! Converta comprimento, peso, volume, temperatura, área, velocidade e mais. Sistema métrico e imperial, com precisão decimal personalizável.",
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
      "Gerador de Mega-Sena 2025 - Jogos Aleatórios com Estatísticas - CalculadoraOnlineBR",
    description:
      "★ Gerador de Mega-Sena GRATUITO! Gere jogos aleatórios de 6 a 15 dezenas com análise estatística, números mais e menos sorteados, ímpares/pares e probabilidade de acerto.",
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
      "Gerador de Lotofácil 2025 - Jogos Inteligentes com Estatísticas - CalculadoraOnlineBR",
    description:
      "★ Gerador de Lotofácil GRATUITO! Crie jogos de 15 a 20 dezenas com estatísticas, números repetidos do concurso anterior, ímpares/pares e moldura/miolo para aumentar suas chances.",
    keywords:
      "gerador lotofácil, jogos lotofácil, números aleatórios lotofácil, dezenas lotofácil, gerador loteria, surpresinha lotofácil, probabilidade lotofácil, moldura miolo lotofácil, números quentes lotofácil, Caixa loterias",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    priority: 0.8,
    changeFreq: "weekly",
  },
  "gerador-quina": {
    id: "gerador-quina",
    title: "Gerador de Quina 2025 - Jogos Aleatórios com Estatísticas - CalculadoraOnlineBR",
    description:
      "★ Gerador de Quina GRATUITO! Gere jogos de 5 a 15 dezenas com análise estatística de números quentes e frios, ímpares/pares e probabilidade de acerto na Quina da Caixa.",
    keywords:
      "gerador quina, jogos quina, números aleatórios quina, dezenas quina, gerador loteria, surpresinha quina, probabilidade quina, números quentes quina, números frios quina, Caixa loterias",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina",
    priority: 0.8,
    changeFreq: "weekly",
  },

  // Betting Calculators
  "criterio-de-kelly": {
    id: "criterio-de-kelly",
    title: "Calculadora de Gestão de Banca (Critério de Kelly) – Grátis 2026 | CalculadoraOnlineBR",
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
    title: "Calculadora de Valor Esperado (EV+) – Odds de Valor Grátis 2026 | CalculadoraOnlineBR",
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
    title: "Calculadora de Surebet (Arbitragem) – Apostas Seguras 2 e 3 Vias 2026 | CalculadoraOnlineBR",
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
    title: "Calculadora de Dutching – Lucro Igual em Várias Seleções Grátis 2026 | CalculadoraOnlineBR",
    description:
      "Calcule o dutching: quanto apostar em cada seleção para ter o mesmo lucro qualquer que seja a vencedora. Até 10 seleções, ROI, cobertura e alerta de prejuízo. Grátis.",
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
      "Calculadora de Rescisão Trabalhista 2025 - Direitos Trabalhistas Completos - CalculadoraOnlineBR",
    description:
      "★ Calculadora de rescisão trabalhista GRATUITA e completa! Calcule valores de demissão sem justa causa, com justa causa, pedido de demissão e acordo mútuo. Inclui FGTS, seguro desemprego, férias, 13º e todos os direitos trabalhistas.",
    keywords:
      "calculadora rescisão trabalhista, demissão sem justa causa, demissão com justa causa, acordo mútuo, pedido demissão, direitos trabalhistas, FGTS multa 40%, seguro desemprego, aviso prévio, férias proporcionais, 13º salário proporcional, cálculo rescisão, trabalhista CLT",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/rescisao",
    priority: 0.9,
    changeFreq: "monthly",
  },
  aposentadoria: {
    id: "aposentadoria",
    title: "Calculadora de Aposentadoria 2025 - INSS + Previdência Privada - CalculadoraOnlineBR",
    description:
      "★ Simulador de aposentadoria GRATUITO e completo! Planeje INSS + previdência privada, calcule tempo para aposentar, valores de benefício e estratégias otimizadas. Ferramenta essencial para seu planejamento previdenciário com cenários personalizados.",
    keywords:
      "calculadora aposentadoria, simulador aposentadoria inss, previdencia privada, tempo para aposentar, beneficio inss, planejamento previdenciario, aposentadoria idade, aposentadoria tempo contribuicao, factor previdenciario, regras transicao, PGBL, VGBL, reforma previdencia",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "auxilio-doenca": {
    id: "auxilio-doenca",
    title:
      "Calculadora de Auxílio-Doença INSS 2025 - Valor do Benefício e Carência - CalculadoraOnlineBR",
    description:
      "★ Calculadora de auxílio-doença INSS GRATUITA! Calcule o valor do benefício, verifique carência automaticamente, aplica isenções para doenças graves e acidentes conforme legislação 2025.",
    keywords:
      "calculadora auxilio doenca, auxilio doenca inss, valor auxilio doenca, carencia auxilio doenca, beneficio inss doenca, afastamento trabalho, incapacidade temporaria, doenças graves isenção, acidente trabalho, legislação 2025 inss, pericia medica, auxilio incapacidade",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "salario-liquido": {
    id: "salario-liquido",
    title:
      "Calculadora de Salário Líquido 2025 - INSS, IRRF, CLT e PJ - CalculadoraOnlineBR",
    description:
      "★ Calculadora de salário líquido 2025 GRATUITA! Use tabelas oficiais de INSS e IRRF, suporta CLT, PJ, dependentes, horas extras e descontos personalizados. Cálculo em tempo real.",
    keywords:
      "calculadora salário líquido, salário líquido 2025, INSS 2025, IRRF 2025, tabela INSS, tabela IRRF, salário CLT, salário PJ, dependentes IR, desconto INSS, simulador salário, contracheque, holerite",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "ferias-decimo-terceiro": {
    id: "ferias-decimo-terceiro",
    title:
      "Calculadora de Férias e 13º Salário 2025 - INSS, IRRF e Abono - CalculadoraOnlineBR",
    description:
      "★ Calculadora de férias e décimo terceiro salário GRATUITA com tabelas oficiais 2025! Inclui INSS, IRRF, abono pecuniário (1/3), adiantamento e regras da CLT.",
    keywords:
      "calculadora férias, calculadora décimo terceiro, 13º salário 2025, férias proporcionais, abono pecuniário, terço constitucional férias, adiantamento 13, primeira parcela 13, segunda parcela 13, INSS férias, IRRF férias, CLT férias",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
    priority: 0.9,
    changeFreq: "monthly",
  },
  "horas-extras": {
    id: "horas-extras",
    title:
      "Calculadora de Horas Extras CLT 2025 - 50%, 100% e Adicional Noturno - CalculadoraOnlineBR",
    description:
      "★ Calculadora de horas extras CLT GRATUITA! Calcule adicional de 50% (dia útil), 100% (domingo/feriado) e 20% noturno conforme CLT Art. 59. Reflexos em DSR, férias e 13º.",
    keywords:
      "calculadora horas extras, horas extras CLT, adicional 50%, adicional 100%, adicional noturno 20%, CLT Art 59, hora extra domingo, hora extra feriado, DSR sobre hora extra, jornada trabalho, banco de horas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/horas-extras",
    priority: 0.9,
    changeFreq: "monthly",
  },
  multipla: {
    id: "multipla",
    title: "Calculadora de Apostas Múltiplas (Acumulada) – Odd Combinada Grátis 2026 | CalculadoraOnlineBR",
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
    title: "Calculadora de Gestão de Banca por Unidades – Stake Fixa e Percentual 2026 | CalculadoraOnlineBR",
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
    title: "Conversor de Odds – Decimal, Fracionária, Americana e Probabilidade Grátis 2026 | CalculadoraOnlineBR",
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
    title: "Calculadora de Hedge e Cash Out – Proteja sua Aposta Grátis 2026 | CalculadoraOnlineBR",
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
    title: "Calculadora de Poisson para Futebol – Probabilidade de Placar Grátis 2026 | CalculadoraOnlineBR",
    description:
      "Calcule a probabilidade de cada placar, do 1X2, de mais/menos gols e de ambos marcam com a distribuição de Poisson, e veja as odds justas para comparar com o mercado. Grátis.",
    keywords:
      "calculadora poisson, poisson futebol, distribuição de poisson futebol, probabilidade de placar, calculadora placar exato, odd justa, probabilidade 1x2, over 2.5 probabilidade, ambos marcam probabilidade, modelo de poisson apostas",
    canonicalUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/apostas/poisson",
    priority: 0.8,
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
