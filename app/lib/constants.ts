export const APP_NAME = "CalculadoraOnlineBR";
export const APP_DESCRIPTION = "Calculadoras online gratuitas para facilitar seu dia a dia";
export const APP_URL = "https://www.calculadoraonlinebr.com.br";
export const APP_AUTHOR = "CalculadoraOnlineBR";

export const CATEGORIES = [
  {
    id: "saude",
    name: "Saúde",
    description: "Calculadoras para cuidar da sua saúde e bem-estar",
    icon: "🏥",
    path: "/calculadoras/saude",
  },
  {
    id: "financas",
    name: "Finanças",
    description: "Calculadoras para planejamento financeiro e investimentos",
    icon: "💰",
    path: "/calculadoras/financas",
  },
  {
    id: "matematica",
    name: "Matemática",
    description: "Calculadoras para operações matemáticas do dia a dia",
    icon: "🔢",
    path: "/calculadoras/matematica",
  },
  {
    id: "trabalhista",
    name: "Trabalhista",
    description: "Calculadoras para direitos trabalhistas, aposentadoria e previdência",
    icon: "⚖️",
    path: "/calculadoras/trabalhista",
  },
];

export const CALCULATORS = [
  {
    id: "imc",
    name: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal",
    category: "saude",
    path: "/calculadoras/saude/imc",
  },
  {
    id: "gordura-corporal",
    name: "Calculadora de Gordura Corporal",
    description: "Calcule seu percentual de gordura corporal com métodos científicos",
    category: "saude",
    path: "/calculadoras/saude/gordura-corporal",
  },
  {
    id: "ciclo-menstrual",
    name: "Calculadora de Ciclo Menstrual",
    description: "Calcule seu período fértil e acompanhe seu ciclo",
    category: "saude",
    path: "/calculadoras/saude/ciclo-menstrual",
  },
  {
    id: "desenvolvimento-infantil",
    name: "Calculadora de Desenvolvimento Infantil",
    description: "Acompanhe o desenvolvimento do seu bebê com marcos personalizados",
    category: "saude",
    path: "/calculadoras/saude/desenvolvimento-infantil",
  },
  {
    id: "hidratacao",
    name: "Calculadora de Hidratação e Balanço Hídrico",
    description:
      "Calcule sua necessidade diária de água personalizada com base em atividade física, clima e características individuais",
    category: "saude",
    path: "/calculadoras/saude/hidratacao",
  },
  {
    id: "primeiro-milhao",
    name: "Calculadora do Primeiro Milhão",
    description: "Descubra quanto tempo para chegar ao seu primeiro milhão",
    category: "financas",
    path: "/calculadoras/financas/primeiro-milhao",
  },
  {
    id: "juros-compostos",
    name: "Calculadora de Juros Compostos",
    description: "Simule investimentos com aportes mensais e visualizações",
    category: "financas",
    path: "/calculadoras/financas/juros-compostos",
  },
  {
    id: "juros-simples",
    name: "Calculadora de Juros Simples",
    description:
      "Calcule juros simples com 4 modos diferentes - ideal para empréstimos de curto prazo",
    category: "financas",
    path: "/calculadoras/financas/juros-simples",
  },
  {
    id: "lci-lca",
    name: "Calculadora LCI e LCA",
    description:
      "Simule investimentos em LCI e LCA com vantagens fiscais - compare com CDB e Poupança",
    category: "financas",
    path: "/calculadoras/financas/lci-lca",
  },
  {
    id: "preco-medio",
    name: "Calculadora de Preço Médio",
    description:
      "Calcule o preço médio de ações e investimentos - controle ganhos/perdas com múltiplos métodos",
    category: "financas",
    path: "/calculadoras/financas/preco-medio",
  },
  {
    id: "cdb",
    name: "Calculadora de CDB",
    description:
      "Simule investimentos em CDB com tributação precisa - compare com LCI/LCA e Poupança",
    category: "financas",
    path: "/calculadoras/financas/cdb",
  },
  {
    id: "financiamento-imobiliario",
    name: "Calculadora de Financiamento Imobiliário",
    description:
      "Simule financiamentos imobiliários com sistemas SAC e PRICE - análise completa de affordability e amortização",
    category: "financas",
    path: "/calculadoras/financas/financiamento-imobiliario",
  },
  {
    id: "emprestimo-consignado",
    name: "Calculadora de Empréstimo Consignado",
    description:
      "Simule empréstimos consignados com análise de margem e comparação com outras modalidades - para CLT, servidores e aposentados",
    category: "financas",
    path: "/calculadoras/financas/emprestimo-consignado",
  },
  {
    id: "consorcio",
    name: "Calculadora de Consórcio",
    description:
      "Simule consórcios de veículos, imóveis e motos. Compare com financiamento, calcule taxas e veja todas as vantagens com guia completo 2025",
    category: "financas",
    path: "/calculadoras/financas/consorcio",
  },
  {
    id: "renda-fixa-comparativa",
    name: "Calculadora Comparativa de Renda Fixa",
    description:
      "Compare CDB, LCI, LCA, Tesouro Direto e Poupança lado a lado. Ranking automático, taxas reais 2025 e análise completa de rendimentos",
    category: "financas",
    path: "/calculadoras/financas/renda-fixa-comparativa",
  },
  {
    id: "porcentagem",
    name: "Calculadora de Porcentagem",
    description: "Calcule porcentagens de forma rápida",
    category: "matematica",
    path: "/calculadoras/matematica/porcentagem",
  },
  {
    id: "regra-de-tres",
    name: "Calculadora de Regra de Três",
    description:
      "Resolva regra de três simples e inversa com explicações passo a passo - para estudos e aplicações práticas do dia a dia",
    category: "matematica",
    path: "/calculadoras/matematica/regra-de-tres",
  },
  {
    id: "equacao-segundo-grau",
    name: "Calculadora de Equação do 2º Grau (Bhaskara)",
    description:
      "Resolva equações quadráticas usando a fórmula de Bhaskara com resolução passo a passo, análise do discriminante e propriedades da parábola",
    category: "matematica",
    path: "/calculadoras/matematica/equacao-segundo-grau",
  },
  {
    id: "mmc-mdc",
    name: "Calculadora de MMC e MDC",
    description:
      "Calcule o Mínimo Múltiplo Comum e Máximo Divisor Comum com decomposição em fatores primos, métodos passo a passo e aplicações práticas",
    category: "matematica",
    path: "/calculadoras/matematica/mmc-mdc",
  },
  {
    id: "area-perimetro",
    name: "Calculadora de Área e Perímetro",
    description:
      "Calcule área e perímetro de formas geométricas com explicações passo a passo, fórmulas detalhadas e aplicações práticas para arquitetura, engenharia e construção",
    category: "matematica",
    path: "/calculadoras/matematica/area-perimetro",
  },
  {
    id: "volume",
    name: "Calculadora de Volume",
    description:
      "Calcule volume e área superficial de sólidos 3D como cubo, esfera, cilindro, cone e pirâmide com fórmulas passo a passo e aplicações práticas para engenharia e arquitetura",
    category: "matematica",
    path: "/calculadoras/matematica/volume",
  },
  {
    id: "teorema-pitagoras",
    name: "Calculadora do Teorema de Pitágoras",
    description:
      "Calcule hipotenusa, catetos e ângulos em triângulos retângulos com o Teorema de Pitágoras. Verificação de triângulos, trigonometria e triângulos famosos com explicações passo a passo",
    category: "matematica",
    path: "/calculadoras/matematica/teorema-pitagoras",
  },
  {
    id: "fracoes",
    name: "Calculadora de Frações",
    description:
      "Some, subtraia, multiplique e divida frações com explicações passo a passo. Converta decimais em frações, simplifique automaticamente e aprenda com métodos educativos detalhados",
    category: "matematica",
    path: "/calculadoras/matematica/fracoes",
  },
  {
    id: "tesouro-direto",
    name: "Calculadora do Tesouro Direto",
    description:
      "Simule investimentos em títulos públicos com cálculo completo de cupons semestrais, impostos e indexadores. Tesouro Selic, Prefixado, IPCA+ com aportes mensais e comparações detalhadas",
    category: "financas",
    path: "/calculadoras/financas/tesouro-direto",
  },
  {
    id: "rescisao-trabalhista",
    name: "Calculadora de Rescisão Trabalhista",
    description:
      "Calcule todos os valores de uma rescisão trabalhista com precisão. Simule demissão sem justa causa, com justa causa, pedido de demissão e acordo mútuo. Inclui FGTS, seguro desemprego e todos os direitos trabalhistas",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/rescisao",
  },
  {
    id: "aposentadoria",
    name: "Calculadora de Aposentadoria",
    description:
      "Planeje sua aposentadoria com simulações completas do INSS e previdência privada. Calcule benefícios, contribuições, tempo para aposentar e estratégias de acumulação com cenários personalizados",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/aposentadoria",
  },
  {
    id: "auxilio-doenca",
    name: "Calculadora de Auxílio-Doença",
    description:
      "Calcule o valor do auxílio-doença INSS com precisão. Verifica carência automaticamente, aplica isenções para doenças graves e acidentes, e calcula o benefício conforme a legislação 2025",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/auxilio-doenca",
  },
  {
    id: "salario-liquido",
    name: "Calculadora de Salário Líquido",
    description:
      "Calcule seu salário líquido com precisão usando as tabelas de INSS e IRRF 2025. Suporte a CLT, PJ, dependentes e horas extras com cálculo em tempo real",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/salario-liquido",
  },
  {
    id: "ferias-decimo-terceiro",
    name: "Calculadora de Férias e 13º Salário",
    description:
      "Calcule férias e décimo terceiro salário com tabelas oficiais 2025. Inclui INSS, IRRF, abono pecuniário, adiantamentos e todas as regras da CLT",
    category: "trabalhista",
    path: "/calculadoras/trabalhista/ferias-decimo-terceiro",
  },
];

export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;
