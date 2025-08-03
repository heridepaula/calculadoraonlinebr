'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Box, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CalculatorResult from '@/components/ui/CalculatorResult';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BodyFatState {
  age: string;
  gender: 'male' | 'female' | '';
  waist: string;
  neck: string;
  hip: string;
}

interface BodyFatResult extends CalculatorResultType {
  category: string;
  color: string;
  healthyRange: [number, number];
}

const getBodyFatClassification = (bodyFat: number, gender: string, age: number, theme: any): BodyFatResult => {
  const baseResult = {
    value: bodyFat,
    isValid: true,
    healthyRange: [0, 0] as [number, number],
  };

  if (gender === 'male') {
    if (age <= 39) {
      if (bodyFat < 8) {
        return {
          ...baseResult,
          category: 'Extremamente baixo',
          message: 'Percentual de gordura muito baixo. Pode ser prejudicial à saúde.',
          color: theme.palette.error.dark,
          healthyRange: [8, 19],
        };
      }
      if (bodyFat <= 19) {
        return {
          ...baseResult,
          category: 'Ideal/Atlético',
          message: 'Excelente! Percentual de gordura na faixa ideal.',
          color: theme.palette.success.dark,
          healthyRange: [8, 19],
        };
      }
      if (bodyFat <= 24) {
        return {
          ...baseResult,
          category: 'Bom',
          message: 'Bom percentual de gordura corporal.',
          color: theme.palette.success.main,
          healthyRange: [8, 19],
        };
      }
      if (bodyFat <= 29) {
        return {
          ...baseResult,
          category: 'Acima do ideal',
          message: 'Percentual ligeiramente acima do recomendado.',
          color: theme.palette.warning.main,
          healthyRange: [8, 19],
        };
      }
    } else {
      if (bodyFat < 10) {
        return {
          ...baseResult,
          category: 'Extremamente baixo',
          message: 'Percentual de gordura muito baixo para a idade.',
          color: theme.palette.error.dark,
          healthyRange: [10, 21],
        };
      }
      if (bodyFat <= 21) {
        return {
          ...baseResult,
          category: 'Ideal/Atlético',
          message: 'Excelente! Percentual de gordura na faixa ideal para a idade.',
          color: theme.palette.success.dark,
          healthyRange: [10, 21],
        };
      }
      if (bodyFat <= 26) {
        return {
          ...baseResult,
          category: 'Bom',
          message: 'Bom percentual de gordura corporal para a idade.',
          color: theme.palette.success.main,
          healthyRange: [10, 21],
        };
      }
      if (bodyFat <= 31) {
        return {
          ...baseResult,
          category: 'Acima do ideal',
          message: 'Percentual ligeiramente acima do recomendado.',
          color: theme.palette.warning.main,
          healthyRange: [10, 21],
        };
      }
    }
    
    return {
      ...baseResult,
      category: 'Muito alto',
      message: 'Percentual de gordura muito elevado. Recomendamos orientação profissional.',
      color: theme.palette.error.dark,
      healthyRange: age <= 39 ? [8, 19] : [10, 21],
    };
  } else {
    if (age <= 39) {
      if (bodyFat < 16) {
        return {
          ...baseResult,
          category: 'Extremamente baixo',
          message: 'Percentual de gordura muito baixo. Pode ser prejudicial à saúde.',
          color: theme.palette.error.dark,
          healthyRange: [16, 30],
        };
      }
      if (bodyFat <= 30) {
        return {
          ...baseResult,
          category: 'Ideal/Atlético',
          message: 'Excelente! Percentual de gordura na faixa ideal.',
          color: theme.palette.success.dark,
          healthyRange: [16, 30],
        };
      }
      if (bodyFat <= 34) {
        return {
          ...baseResult,
          category: 'Bom',
          message: 'Bom percentual de gordura corporal.',
          color: theme.palette.success.main,
          healthyRange: [16, 30],
        };
      }
      if (bodyFat <= 39) {
        return {
          ...baseResult,
          category: 'Acima do ideal',
          message: 'Percentual ligeiramente acima do recomendado.',
          color: theme.palette.warning.main,
          healthyRange: [16, 30],
        };
      }
    } else {
      if (bodyFat < 18) {
        return {
          ...baseResult,
          category: 'Extremamente baixo',
          message: 'Percentual de gordura muito baixo para a idade.',
          color: theme.palette.error.dark,
          healthyRange: [18, 32],
        };
      }
      if (bodyFat <= 32) {
        return {
          ...baseResult,
          category: 'Ideal/Atlético',
          message: 'Excelente! Percentual de gordura na faixa ideal para a idade.',
          color: theme.palette.success.dark,
          healthyRange: [18, 32],
        };
      }
      if (bodyFat <= 36) {
        return {
          ...baseResult,
          category: 'Bom',
          message: 'Bom percentual de gordura corporal para a idade.',
          color: theme.palette.success.main,
          healthyRange: [18, 32],
        };
      }
      if (bodyFat <= 41) {
        return {
          ...baseResult,
          category: 'Acima do ideal',
          message: 'Percentual ligeiramente acima do recomendado.',
          color: theme.palette.warning.main,
          healthyRange: [18, 32],
        };
      }
    }
    
    return {
      ...baseResult,
      category: 'Muito alto',
      message: 'Percentual de gordura muito elevado. Recomendamos orientação profissional.',
      color: theme.palette.error.dark,
      healthyRange: age <= 39 ? [16, 30] : [18, 32],
    };
  }
};

const BodyFatCalculator: React.FC = () => {
  const theme = useTheme();
  const analytics = useAnalytics();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: BodyFatState = {
    age: '',
    gender: '',
    waist: '',
    neck: '',
    hip: '',
  };

  const validate = (state: BodyFatState): ValidationResult => {
    // Só valida se o usuário já interagiu
    if (!hasInteracted) {
      return { valid: true };
    }

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!state.gender || !state.age || !state.waist || !state.neck) {
      return { valid: false, error: 'Preencha todos os campos obrigatórios' };
    }

    // Para mulheres, o quadril é obrigatório
    if (state.gender === 'female' && !state.hip) {
      return { valid: false, error: 'Para mulheres, a medida do quadril é obrigatória' };
    }

    // Validar valores numéricos
    const ageValid = validateNumberInput(state.age, 18, 100);
    const waistValid = validateNumberInput(state.waist, 30, 200);
    const neckValid = validateNumberInput(state.neck, 20, 60);

    if (!ageValid.valid) {
      return { valid: false, error: ageValid.error };
    }
    if (!waistValid.valid) {
      return { valid: false, error: waistValid.error };
    }
    if (!neckValid.valid) {
      return { valid: false, error: neckValid.error };
    }

    if (state.gender === 'female') {
      const hipValid = validateNumberInput(state.hip, 50, 200);
      if (!hipValid.valid) {
        return { valid: false, error: hipValid.error };
      }
    }

    return { valid: true };
  };

  const calculate = (state: BodyFatState): BodyFatResult | null => {
    const startTime = performance.now();
    const ageNum = parseBRLNumber(state.age);
    const waistNum = parseBRLNumber(state.waist);
    const neckNum = parseBRLNumber(state.neck);
    const hipNum = state.hip ? parseBRLNumber(state.hip) : 0;
    
    if (isNaN(ageNum) || isNaN(waistNum) || isNaN(neckNum)) return null;
    if (state.gender === 'female' && isNaN(hipNum)) return null;

    let bodyFatPercentage: number;

    if (state.gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistNum - neckNum) + 0.15456 * Math.log10(175)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistNum + hipNum - neckNum) + 0.22100 * Math.log10(175)) - 450;
    }

    bodyFatPercentage = Math.max(0, Math.min(50, bodyFatPercentage));

    const classification = getBodyFatClassification(bodyFatPercentage, state.gender, ageNum, theme);
    
    const endTime = performance.now();
    analytics.trackCalculation("body-fat", {
      idade: ageNum,
      sexo: state.gender,
      cintura: waistNum,
      pescoco: neckNum,
      quadril: state.gender === 'female' ? hipNum : null,
      percentual_gordura: Number(bodyFatPercentage.toFixed(1)),
      categoria: classification.category
    });
    analytics.trackPerformance("body-fat", endTime - startTime);

    return {
      ...classification,
      value: `${bodyFatPercentage.toFixed(1)}%`,
      additionalInfo: {
        'Faixa saudável': `${classification.healthyRange[0]}% - ${classification.healthyRange[1]}%`,
      },
    };
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof BodyFatState, value: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    updateField(field, value);
  }, [hasInteracted, updateField]);

  const handleClearWithAnalytics = useCallback(() => {
    handleClear();
    setHasInteracted(false);
    analytics.trackClear("body-fat");
  }, [handleClear, analytics]);

  useEffect(() => {
    if (result) {
      analytics.trackResultView("body-fat");
    }
  }, [result, analytics]);

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Percentual de Gordura Corporal"
        description="Calcule seu percentual de gordura corporal usando o método da Marinha Americana (US Navy). Informe suas medidas corporais para obter uma estimativa precisa."
      />

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {/* Primeira linha - Informações básicas */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
              1. Informações Básicas
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Sexo</InputLabel>
              <Select
                value={state.gender}
                onChange={(e) => handleFieldUpdate('gender', e.target.value)}
                label="Sexo"
              >
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Feminino</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Idade (anos)"
              value={state.age}
              onChange={(value) => handleFieldUpdate('age', value)}
              type="number"
              helperText="Entre 18 e 100 anos"
              placeholder="Ex: 30"
            />
          </Grid>

          {/* Segunda linha - Medidas corporais */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
              2. Medidas Corporais (em centímetros)
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Circunferência da Cintura (cm)"
              value={state.waist}
              onChange={(value) => handleFieldUpdate('waist', value)}
              type="number"
              helperText="Meça na altura do umbigo"
              placeholder="Ex: 85"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Circunferência do Pescoço (cm)"
              value={state.neck}
              onChange={(value) => handleFieldUpdate('neck', value)}
              type="number"
              helperText={state.gender === 'male' ? "Abaixo do pomo de Adão" : "Base do pescoço"}
              placeholder="Ex: 38"
            />
          </Grid>

          {state.gender === 'female' && (
            <Grid size={{ xs: 12, md: 6 }}>
              <CalculatorInput
                label="Circunferência do Quadril (cm)"
                value={state.hip}
                onChange={(value) => handleFieldUpdate('hip', value)}
                type="number"
                helperText="Parte mais larga do quadril"
                placeholder="Ex: 95"
              />
            </Grid>
          )}

          {/* Instruções de medição */}
          {state.gender && (
            <Grid size={{ xs: 12 }}>
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(25, 118, 210, 0.08)', 
                  borderRadius: 2, 
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  mt: 1
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                  💡 Dicas para medição precisa:
                </Typography>
                <Typography variant="body2" component="ul" sx={{ m: 0, pl: 2 }}>
                  <li>Use uma fita métrica flexível</li>
                  <li>Mantenha a fita horizontal e firme (sem apertar)</li>
                  <li>Respire normalmente durante a medição</li>
                  <li>Meça sempre no mesmo horário do dia</li>
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Exibir erro de validação se houver */}
          {hasInteracted && !validation.valid && validation.error && (
            <Grid size={{ xs: 12 }}>
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(211, 47, 47, 0.08)', 
                  borderRadius: 2, 
                  border: '1px solid rgba(211, 47, 47, 0.2)',
                  color: 'error.main'
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ⚠️ {validation.error}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Resultado */}
          {result && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <CalculatorResult
                result={result}
                title="Seu Percentual de Gordura Corporal"
                variant="detailed"
              />
            </Grid>
          )}

          {/* Ações */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <CalculatorActions
              onClear={handleClearWithAnalytics}
              layout="clear-only"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BodyFatCalculator;