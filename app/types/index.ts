export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
}

export interface IMCResult {
  imc: number;
  classification: string;
  healthy: boolean;
}

export interface PercentageCalculation {
  value: number;
  percentage: number;
  result: number;
}

export interface InterestCalculation {
  principal: number;
  rate: number;
  time: number;
  compound?: boolean;
  result: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

// Tipos para Astrologia - Ascendente
export interface AscendantDescription {
  signo_solar: string;
  ascendente: string;
  [key: string]: any; // Para campos dinâmicos como "sol_em_aries", "ascendente_em_aries", etc.
  personalidade_combinada: {
    descricao: string;
    caracteristicas_unicas: string[];
    principais_dificuldades: string[];
  };
  vida_amorosa: {
    estilo_romantico: string[];
    compatibilidades_ideais: string[];
    desafios_amorosos: string[];
  };
  vida_profissional: {
    ambiente_ideal: string[];
    profissoes_recomendadas: string[];
    caracteristicas_profissionais: string[];
  };
}
