'use client';

import { useState, useCallback, useMemo } from 'react';
import { CalculatorResult, ValidationResult } from '@/lib/types/calculator';

interface UseCalculatorOptions<T> {
  initialState: T;
  validate?: (state: T) => ValidationResult;
  calculate?: (state: T) => CalculatorResult | null;
  onCalculate?: (result: CalculatorResult | null) => void;
  onClear?: () => void;
}

export function useCalculator<T extends Record<string, any>>({
  initialState,
  validate,
  calculate,
  onCalculate,
  onClear,
}: UseCalculatorOptions<T>) {
  const [state, setState] = useState<T>(initialState);
  const [touched, setTouched] = useState(false);

  const validation = useMemo(() => {
    if (!validate) return { valid: true };
    return validate(state);
  }, [state, validate]);

  const result = useMemo(() => {
    if (!calculate || !validation.valid) return null;
    return calculate(state);
  }, [state, validation.valid, calculate]);

  const updateField = useCallback((field: keyof T, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleCalculate = useCallback(() => {
    setTouched(true);
    if (result && onCalculate) {
      onCalculate(result);
    }
  }, [result, onCalculate]);

  const handleClear = useCallback(() => {
    setState(initialState);
    setTouched(false);
    if (onClear) {
      onClear();
    }
  }, [initialState, onClear]);

  return {
    state,
    setState,
    updateField,
    validation,
    result,
    touched,
    handleCalculate,
    handleClear,
  };
}