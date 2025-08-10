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
