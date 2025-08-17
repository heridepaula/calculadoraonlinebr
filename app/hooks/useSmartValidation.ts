import { useState, useCallback } from "react";

export interface ValidationResult {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface ValidationConfig {
  required?: boolean;
  min?: number;
  max?: number;
  precision?: number;
  contextualHints?: boolean;
}

export function useSmartValidation() {
  const [validations, setValidations] = useState<Record<string, ValidationResult>>({});

  const validateInput = useCallback((
    field: string, 
    value: string, 
    shape: string, 
    config: ValidationConfig = {}
  ): ValidationResult => {
    const { 
      required = true, 
      min = 0, 
      max = 10000, 
      precision = 2,
      contextualHints = true 
    } = config;

    // Campo vazio
    if (!value || value.trim() === "") {
      if (required) {
        return { type: 'error', message: 'Campo obrigatório' };
      }
      return { type: 'info', message: 'Campo opcional' };
    }

    const numValue = parseFloat(value);

    // Validação de número
    if (isNaN(numValue)) {
      return { type: 'error', message: 'Digite um número válido' };
    }

    // Validação de valor positivo
    if (numValue <= min) {
      return { type: 'error', message: `Valor deve ser maior que ${min}` };
    }

    // Validação de valor máximo
    if (numValue > max) {
      return { type: 'warning', message: 'Valor muito alto - verifique a unidade' };
    }

    // Validações específicas por campo e forma
    const contextValidation = getContextualValidation(field, numValue, shape);
    if (contextValidation) {
      return contextValidation;
    }

    // Dicas contextuais
    if (contextualHints) {
      const hint = getContextualHint(field, numValue, shape);
      if (hint) {
        return { type: 'info', message: hint };
      }
    }

    return { type: 'success', message: '✓ Válido' };
  }, []);

  const updateValidation = useCallback((field: string, result: ValidationResult) => {
    setValidations(prev => ({ ...prev, [field]: result }));
  }, []);

  const clearValidation = useCallback((field: string) => {
    setValidations(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearAllValidations = useCallback(() => {
    setValidations({});
  }, []);

  const getValidation = useCallback((field: string): ValidationResult | undefined => {
    return validations[field];
  }, [validations]);

  const hasErrors = useCallback(() => {
    return Object.values(validations).some(v => v.type === 'error');
  }, [validations]);

  return {
    validateInput,
    updateValidation,
    clearValidation,
    clearAllValidations,
    getValidation,
    hasErrors,
    validations
  };
}

function getContextualValidation(field: string, value: number, shape: string): ValidationResult | null {
  // Validações específicas para diferentes formas e campos
  switch (shape) {
    case 'sphere':
      if ((field === 'radius' || field === 'diameter') && value > 100) {
        return { type: 'warning', message: 'Esfera muito grande - confirme a unidade' };
      }
      break;
    
    case 'cylinder':
      if (field === 'height' && value > 1000) {
        return { type: 'warning', message: 'Cilindro muito alto - confirme as proporções' };
      }
      break;
    
    case 'cube':
      if (field === 'side' && value < 0.1) {
        return { type: 'warning', message: 'Cubo muito pequeno - considere mudar a unidade' };
      }
      break;

    case 'rectangular_prism':
      if ((field === 'length' || field === 'width' || field === 'height') && value > 500) {
        return { type: 'warning', message: 'Dimensão muito grande - confirme a unidade' };
      }
      break;
  }

  // Validações gerais para campos comuns
  if (field === 'radius' && value < 0.01) {
    return { type: 'warning', message: 'Raio muito pequeno - considere mudança de unidade' };
  }

  if (field === 'height' && value < 0.01) {
    return { type: 'warning', message: 'Altura muito pequena - verifique a medida' };
  }

  return null;
}

function getContextualHint(field: string, value: number, shape: string): string | null {
  // Dicas úteis baseadas no contexto
  switch (field) {
    case 'radius':
      if (value >= 1 && value <= 10) {
        return '💡 Raio ideal para visualização';
      }
      break;
    
    case 'height':
      if (shape === 'cylinder' && value > 0) {
        const ratio = value / 5; // Assumindo raio médio de 5
        if (ratio > 3) {
          return '💡 Cilindro alto - consider proporções';
        }
        if (ratio < 0.5) {
          return '💡 Cilindro baixo - mais como disco';
        }
      }
      break;
    
    case 'side':
      if (shape === 'cube' && value > 0) {
        return `💡 Volume será ${(value ** 3).toFixed(1)} unidades cúbicas`;
      }
      break;
  }

  // Dicas numéricas úteis
  if (value === Math.floor(value) && value <= 20) {
    return '💡 Número inteiro - fácil para cálculos';
  }

  if (value > 0 && value < 1) {
    return '💡 Valor decimal - considere unidades menores';
  }

  return null;
}

// Hook auxiliar para validação em tempo real
export function useRealTimeValidation(
  field: string,
  value: string,
  shape: string,
  config?: ValidationConfig
) {
  const { validateInput, getValidation, updateValidation } = useSmartValidation();
  
  const validate = useCallback(() => {
    const result = validateInput(field, value, shape, config);
    updateValidation(field, result);
    return result;
  }, [field, value, shape, config, validateInput, updateValidation]);

  return {
    validation: getValidation(field),
    validate
  };
}