export const SITE_CONFIG = {
  name: 'Calculadora Online BR',
  description: 'Ferramentas gratuitas de cálculo online para suas necessidades matemáticas, financeiras e de saúde.',
  url: 'https://calculadoraonlinebr.com.br',
  locale: 'pt-BR',
  currency: 'BRL',
  author: 'Calculadora Online BR',
  social: {
    twitter: '@calculadoraonlinebr',
  },
} as const;

export const VALIDATION_LIMITS = {
  weight: { min: 1, max: 600 },
  height: { min: 0.5, max: 3 },
  age: { min: 1, max: 120 },
  period: { min: 1, max: 1200 },
  percentage: { min: 0, max: 100 },
  currency: { min: 0, max: 999999999 },
} as const;

export const CALCULATOR_CATEGORIES = {
  financial: {
    name: 'Financeira',
    color: '#4caf50',
    icon: 'MonetizationOn',
  },
  math: {
    name: 'Matemática',
    color: '#3f51b5',
    icon: 'Functions',
  },
  health: {
    name: 'Saúde',
    color: '#f44336',
    icon: 'Favorite',
  },
} as const;

export const BMI_CLASSIFICATIONS = [
  { range: [0, 16], name: 'Magreza Severa', risk: 'high' },
  { range: [16, 17], name: 'Magreza Moderada', risk: 'medium' },
  { range: [17, 18.5], name: 'Magreza Leve', risk: 'low' },
  { range: [18.5, 25], name: 'Peso Saudável', risk: 'none' },
  { range: [25, 30], name: 'Sobrepeso', risk: 'low' },
  { range: [30, 35], name: 'Obesidade Grau I', risk: 'medium' },
  { range: [35, 40], name: 'Obesidade Grau II', risk: 'high' },
  { range: [40, Infinity], name: 'Obesidade Grau III', risk: 'very-high' },
] as const;