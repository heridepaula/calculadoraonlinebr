import { CalculatorMetadata } from '@/lib/types/calculator';
import { Metadata } from 'next';

export const parseBRLNumber = (value: string): number => {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
};

export const formatBRLNumber = (value: number, decimals: number = 2): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatBRLCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const validateNumberInput = (
  value: string,
  min?: number,
  max?: number
): { valid: boolean; error?: string } => {
  const num = parseBRLNumber(value);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Valor inválido' };
  }
  
  if (min !== undefined && num < min) {
    return { valid: false, error: `Valor deve ser maior que ${min}` };
  }
  
  if (max !== undefined && num > max) {
    return { valid: false, error: `Valor deve ser menor que ${max}` };
  }
  
  return { valid: true };
};

export const createCalculatorMetadata = (
  config: CalculatorMetadata
): Metadata => {
  const baseUrl = 'https://calculadoraonlinebr.com.br';
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      type: 'website',
      title: config.title,
      description: config.description,
      url: `${baseUrl}${config.url}`,
      siteName: 'Calculadora Online BR',
      images: [
        {
          url: `${baseUrl}${config.image}`,
          width: 800,
          height: 600,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [`${baseUrl}${config.image}`],
    },
    alternates: {
      canonical: `${baseUrl}${config.url}`,
    },
  };
};

export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/[^0-9,]/g, '');
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};