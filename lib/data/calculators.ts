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
    title: 'Calculadora de Juros Compostos Online Grátis e Fácil de Usar',
    description: 'Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo com gráficos interativos. Simule agora!',
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
    title: 'Calculadora de IMC Online Grátis e Fácil de Usar',
    description: 'Calcule seu Índice de Massa Corporal (IMC) online de forma rápida e fácil! Descubra em qual faixa de peso você se encontra com nossa calculadora gratuita.',
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
    title: 'Calculadora de Regra de Três Simples Online Grátis e Fácil de Usar',
    description: 'Resolva problemas de regra de três online de forma rápida e fácil! Nossa calculadora gratuita ajuda você a encontrar o valor desconhecido em proporções.',
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
];

export const getCalculatorById = (id: string): CalculatorConfig | undefined => {
  return CALCULATORS.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (category: keyof typeof CALCULATOR_CATEGORIES): CalculatorConfig[] => {
  return CALCULATORS.filter(calc => calc.category === category);
};