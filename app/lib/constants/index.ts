export const APP_NAME = "Calculadora Online BR";
export const APP_DESCRIPTION = "Calculadoras online gratuitas para facilitar seu dia a dia";

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
    description: "Calcule seu percentual de gordura corporal",
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
    id: "juros",
    name: "Calculadora de Juros",
    description: "Calcule juros simples e compostos",
    category: "financas",
    path: "/calculadora/financas/juros",
  },
  {
    id: "porcentagem",
    name: "Calculadora de Porcentagem",
    description: "Calcule porcentagens de forma rápida",
    category: "matematica",
    path: "/calculadora/matematica/porcentagem",
  },
];

export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;
