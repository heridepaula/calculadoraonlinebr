import { CalculatorMetadata } from '@/lib/types/calculator';
import { CALCULATOR_CATEGORIES } from '@/lib/config/constants';

export interface CalculatorConfig extends CalculatorMetadata {
  id: string;
  category: keyof typeof CALCULATOR_CATEGORIES;
  path: string;
}

export const CALCULATORS: CalculatorConfig[] = [
  {
    id: 'compound-interest',
    title: 'Calculadora de Juros Compostos',
    description: 'Simule o crescimento do seu investimento com juros compostos e visualize gráficos de evolução patrimonial.',
    keywords: [
      'calculadora juros compostos',
      'calculadora de juros compostos',
      'juros compostos online',
      'calcular juros compostos online',
      'calculadora juros compostos grátis',
      'simulador de juros compostos',
      'calculadora de investimento',
      'rendimento composto',
      'juros sobre juros',
      'investimento fácil',
      'calculadora financeira',
      'gráfico juros compostos',
      'evolução patrimonial',
    ],
    image: '/images/cards/juros-compostos.webp',
    url: '/calculadoras/calculadora-juros-compostos',
    structuredDataType: 'calculator',
    category: 'financial',
    path: '/calculadoras/calculadora-juros-compostos',
  },
  {
    id: 'bmi',
    title: 'Calculadora de IMC',
    description: 'Calcule seu Índice de Massa Corporal e descubra sua faixa de peso ideal para a saúde.',
    keywords: [
      'calculadora imc',
      'imc',
      'calcular imc',
      'imc online',
      'índice de massa corporal',
      'faixa de peso',
      'peso ideal',
      'saúde',
      'bem-estar',
      'ferramenta de saúde',
      'medida corporal',
    ],
    image: '/images/cards/imc.webp',
    url: '/calculadoras/calculadora-imc',
    structuredDataType: 'calculator',
    category: 'health',
    path: '/calculadoras/calculadora-imc',
  },
  {
    id: 'rule-of-three',
    title: 'Calculadora de Regra de Três',
    description: 'Resolva proporções e problemas matemáticos com regra de três simples de forma rápida.',
    keywords: [
      'calculadora regra de três',
      'regra de três',
      'calcular regra de três',
      'regra de três online',
      'calculadora de proporção',
      'problemas de regra de três',
      'matemática básica',
      'cálculo fácil',
      'ferramenta matemática',
      'proporcionalidade',
    ],
    image: '/images/cards/regra-de-tres.webp',
    url: '/calculadoras/regra-de-tres-simples',
    structuredDataType: 'calculator',
    category: 'math',
    path: '/calculadoras/regra-de-tres-simples',
  },
  {
    id: 'labor-termination',
    title: 'Calculadora de Rescisão Trabalhista',
    description: 'Calcule verbas rescisórias conforme CLT: salário, férias, 13º, FGTS e demais direitos trabalhistas.',
    keywords: [
      'calculadora rescisão trabalhista',
      'rescisão CLT',
      'cálculo rescisão',
      'verbas rescisórias',
      'demissão sem justa causa',
      'demissão com justa causa',
      'acordo mútuo',
      'aviso prévio',
      'FGTS',
      'multa FGTS',
      'férias proporcionais',
      '13º salário',
      'saldo de salário',
      'salário família',
      'direitos trabalhistas',
      'CLT 2024',
      'rescisão online',
      'calculadora trabalhista',
      'término contrato trabalho',
    ],
    image: '/images/cards/rescisao-trabalhista.webp',
    url: '/calculadoras/calculadora-rescisao',
    structuredDataType: 'calculator',
    category: 'labor',
    path: '/calculadoras/calculadora-rescisao',
  },
];

export const getCalculatorById = (id: string): CalculatorConfig | undefined => {
  return CALCULATORS.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (category: keyof typeof CALCULATOR_CATEGORIES): CalculatorConfig[] => {
  return CALCULATORS.filter(calc => calc.category === category);
};