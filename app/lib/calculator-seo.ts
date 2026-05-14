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
  "diferenca-entre-datas": {
    id: "diferenca-entre-datas",
    title: "Calculadora de Diferença entre Datas 2025 - Idade e Dias Úteis - CalculadoraOnlineBR",
    description:
      "★ Calculadora de diferença entre datas GRATUITA! Calcule diferença em anos, meses, dias, horas e minutos. Inclui contagem de dias úteis, feriados e cálculo de idade.",
    keywords:
      "calculadora diferença datas, diferença entre datas, calcular idade, dias entre datas, contagem dias, dias úteis, feriados, tempo decorrido, intervalo tempo, idade",
    canonicalUrl:
      "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/diferenca-entre-datas",
    priority: 0.7,
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
      content: seoData.ogImage || `${APP_URL}/android-chrome-512x512.webp`,
    },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
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
      content: seoData.ogImage || `${APP_URL}/android-chrome-512x512.webp`,
    },

    // Additional SEO tags
    { name: "application-name", content: "CalculadoraOnlineBR" },
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
