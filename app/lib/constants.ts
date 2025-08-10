export const APP_NAME = "Calculadora Online BR";
export const APP_DESCRIPTION = "Calculadoras online gratuitas para facilitar seu dia a dia";
export const APP_URL = "https://calculadora-online-br.com";
export const APP_AUTHOR = "Calculadora Online BR";

export const CATEGORIES = [
  {
    id: "saude",
    name: "Saúde",
    description: "Calculadoras para cuidar da sua saúde e bem-estar",
    icon: "🏥",
    path: "/calculadora/saude",
  },
  {
    id: "financas",
    name: "Finanças",
    description: "Calculadoras para planejamento financeiro e investimentos",
    icon: "💰",
    path: "/calculadora/financas",
  },
  {
    id: "matematica",
    name: "Matemática",
    description: "Calculadoras para operações matemáticas do dia a dia",
    icon: "🔢",
    path: "/calculadora/matematica",
  },
];

export const CALCULATORS = [
  {
    id: "imc",
    name: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal",
    category: "saude",
    path: "/calculadora/saude/imc",
  },
  {
    id: "gordura-corporal",
    name: "Calculadora de Gordura Corporal",
    description: "Calcule seu percentual de gordura corporal com métodos científicos",
    category: "saude",
    path: "/calculadora/saude/gordura-corporal",
  },
  {
    id: "ciclo-menstrual",
    name: "Calculadora de Ciclo Menstrual",
    description: "Calcule seu período fértil e acompanhe seu ciclo",
    category: "saude",
    path: "/calculadora/saude/ciclo-menstrual",
  },
  {
    id: "desenvolvimento-infantil",
    name: "Calculadora de Desenvolvimento Infantil",
    description: "Acompanhe o desenvolvimento do seu bebê com marcos personalizados",
    category: "saude",
    path: "/calculadora/saude/desenvolvimento-infantil",
  },
  {
    id: "primeiro-milhao",
    name: "Calculadora do Primeiro Milhão",
    description: "Descubra quanto tempo para chegar ao seu primeiro milhão",
    category: "financas",
    path: "/calculadora/financas/primeiro-milhao",
  },
  {
    id: "juros",
    name: "Calculadora de Juros",
    description: "Calcule juros simples e compostos",
    category: "financas",
    path: "/calculadora/financas/juros",
  },
  {
    id: "juros-compostos",
    name: "Calculadora de Juros Compostos Avançada",
    description: "Simule investimentos com aportes mensais e visualizações",
    category: "financas",
    path: "/calculadora/financas/juros-compostos",
  },
  {
    id: "juros-simples",
    name: "Calculadora de Juros Simples",
    description: "Calcule juros simples com 4 modos diferentes - ideal para empréstimos de curto prazo",
    category: "financas",
    path: "/calculadora/financas/juros-simples",
  },
  {
    id: "lci-lca",
    name: "Calculadora LCI e LCA",
    description: "Simule investimentos em LCI e LCA com vantagens fiscais - compare com CDB e Poupança",
    category: "financas",
    path: "/calculadora/financas/lci-lca",
  },
  {
    id: "preco-medio",
    name: "Calculadora de Preço Médio",
    description: "Calcule o preço médio de ações e investimentos - controle ganhos/perdas com múltiplos métodos",
    category: "financas",
    path: "/calculadora/financas/preco-medio",
  },
  {
    id: "cdb",
    name: "Calculadora de CDB",
    description: "Simule investimentos em CDB com tributação precisa - compare com LCI/LCA e Poupança",
    category: "financas",
    path: "/calculadora/financas/cdb",
  },
  {
    id: "porcentagem",
    name: "Calculadora de Porcentagem",
    description: "Calcule porcentagens de forma rápida",
    category: "matematica",
    path: "/calculadora/matematica/porcentagem",
  },
];
