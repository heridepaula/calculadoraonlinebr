export interface CalculatorMetadata {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
  structuredDataType: 'calculator' | 'tool' | 'website';
}

export interface CalculatorPageProps {
  metadata: CalculatorMetadata;
  children: React.ReactNode;
}

export interface BaseCalculatorProps {
  title: string;
  description: string;
  onCalculate?: () => void;
  onClear?: () => void;
}

export interface CalculatorResult {
  value: number | string;
  category?: string;
  message?: string;
  isValid: boolean;
  additionalInfo?: Record<string, any>;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

export interface CalculatorInput {
  value: string;
  label: string;
  type: 'number' | 'currency' | 'percentage' | 'text';
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
    pattern?: RegExp;
  };
  placeholder?: string;
  helperText?: string;
}