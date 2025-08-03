'use client';

import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CalculatorResult from '@/components/ui/CalculatorResult';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';
import { useAnalytics } from '@/hooks/useAnalytics';

interface IMCState {
  weight: string;
  height: string;
}

interface BMIResult extends CalculatorResultType {
  category: string;
  color: string;
  idealRange: [number, number];
}

const getBMIClassification = (imc: number, theme: any): BMIResult => {
  const baseResult = {
    value: imc,
    isValid: true,
    idealRange: [0, 0] as [number, number],
  };

  if (imc < 16) {
    return {
      ...baseResult,
      category: 'Magreza Severa',
      message: 'Peso muito abaixo do ideal. Consulte um nutricionista.',
      color: theme.palette.error.dark,
    };
  }
  if (imc < 17) {
    return {
      ...baseResult,
      category: 'Magreza Moderada', 
      message: 'Peso abaixo do saudável. Acompanhe sua evolução.',
      color: theme.palette.warning.dark,
    };
  }
  if (imc < 18.5) {
    return {
      ...baseResult,
      category: 'Magreza Leve',
      message: 'Peso um pouco abaixo do saudável.',
      color: theme.palette.warning.main,
    };
  }
  if (imc < 25) {
    return {
      ...baseResult,
      category: 'Peso Saudável',
      message: 'Parabéns! Seu peso está na faixa ideal.',
      color: theme.palette.success.dark,
    };
  }
  if (imc < 30) {
    return {
      ...baseResult,
      category: 'Sobrepeso',
      message: 'Peso acima do considerado saudável. Cuidado com a dieta.',
      color: theme.palette.warning.main,
    };
  }
  if (imc < 35) {
    return {
      ...baseResult,
      category: 'Obesidade Grau I',
      message: 'Risco moderado. Recomendamos acompanhamento médico.',
      color: theme.palette.error.main,
    };
  }
  if (imc < 40) {
    return {
      ...baseResult,
      category: 'Obesidade Grau II',
      message: 'Risco significativo. Procure orientação profissional.',
      color: theme.palette.error.dark,
    };
  }
  
  return {
    ...baseResult,
    category: 'Obesidade Grau III',
    message: 'Risco muito elevado. Necessário intervenção médica.',
    color: theme.palette.error.dark,
  };
};

const IMCCalculator: React.FC = () => {
  const theme = useTheme();
  const analytics = useAnalytics();

  const initialState: IMCState = {
    weight: '',
    height: '',
  };

  const validate = (state: IMCState): ValidationResult => {
    const weightValid = validateNumberInput(state.weight, 1, 600);
    const heightValid = validateNumberInput(state.height, 0.5, 3);

    if (!weightValid.valid) {
      return { valid: false, error: weightValid.error };
    }
    if (!heightValid.valid) {
      return { valid: false, error: heightValid.error };
    }
    if (!state.weight || !state.height) {
      return { valid: false, error: 'Preencha ambos os campos' };
    }

    return { valid: true };
  };

  const calculate = (state: IMCState): BMIResult | null => {
    const startTime = performance.now();
    const weightNum = parseBRLNumber(state.weight);
    const heightNum = parseBRLNumber(state.height);
    
    if (isNaN(weightNum) || isNaN(heightNum)) return null;

    const imcValue = weightNum / (heightNum ** 2);
    const classification = getBMIClassification(imcValue, theme);
    
    const idealMin = +(18.5 * heightNum ** 2).toFixed(1);
    const idealMax = +(24.9 * heightNum ** 2).toFixed(1);

    // Track successful calculation
    const endTime = performance.now();
    analytics.trackCalculation("imc", {
      peso: weightNum,
      altura: heightNum,
      imc_value: Number(imcValue.toFixed(1)),
      categoria: classification.category,
      peso_ideal_min: idealMin,
      peso_ideal_max: idealMax
    });
    analytics.trackPerformance("imc", endTime - startTime);

    return {
      ...classification,
      value: Number(imcValue.toFixed(1)),
      idealRange: [idealMin, idealMax],
      additionalInfo: {
        'Peso ideal': `${idealMin}kg - ${idealMax}kg`,
      },
    };
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  // Enhanced clear function with analytics
  const handleClearWithAnalytics = () => {
    handleClear();
    analytics.trackClear("imc");
  };

  // Track quando resultado é visualizado
  useEffect(() => {
    if (result) {
      analytics.trackResultView("imc");
    }
  }, [result, analytics]);

  return (
    <>
      <CalculatorHeader
        title="Calculadora de IMC"
        description="Informe seu peso e altura para calcular o Índice de Massa Corporal (IMC)."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Peso (kg)"
            value={state.weight}
            onChange={(value) => updateField('weight', value)}
            type="number"
            error={!!validation.error}
            helperText={validation.error || 'Exemplo: 75,5'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Altura (metros)"
            value={state.height}
            onChange={(value) => updateField('height', value)}
            type="number"
            helperText="Exemplo: 1,75"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <CalculatorResult
              result={result}
              title="Seu IMC"
              variant="detailed"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <CalculatorActions
            onClear={handleClearWithAnalytics}
            layout="clear-only"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default IMCCalculator;