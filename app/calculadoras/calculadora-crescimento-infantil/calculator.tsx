'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, Box, Typography, Paper, Alert, Chip, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface GrowthState {
  childAge: string;
  childWeight: string;
  childHeight: string;
  childGender: 'boy' | 'girl';
  birthWeight: string;
  birthHeight: string;
  motherHeight: string;
  fatherHeight: string;
}

interface GrowthResult extends CalculatorResultType {
  breakdown: {
    weightPercentile: number;
    heightPercentile: number;
    bmiPercentile: number;
    bmi: number;
    predictedAdultHeight: number;
    nutritionalStatus: string;
    growthVelocity: string;
    developmentMilestones: string[];
  };
}

const calculatePercentile = (value: number, mean: number, sd: number): number => {
  const zScore = (value - mean) / sd;
  return Math.round(normCdf(zScore) * 100);
};

const normCdf = (z: number): number => {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
};

const erf = (x: number): number => {
  const a = 0.3275911;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  
  const t = 1.0 / (1.0 + a * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
};

const getWeightReference = (ageMonths: number, gender: 'boy' | 'girl') => {
  const references = {
    boy: {
      0: { mean: 3.3, sd: 0.44 }, 1: { mean: 4.5, sd: 0.55 }, 2: { mean: 5.6, sd: 0.67 },
      3: { mean: 6.4, sd: 0.72 }, 6: { mean: 7.9, sd: 0.78 }, 12: { mean: 9.6, sd: 0.97 },
      18: { mean: 11.0, sd: 1.16 }, 24: { mean: 12.2, sd: 1.24 }, 36: { mean: 14.3, sd: 1.43 },
      48: { mean: 16.3, sd: 1.94 }, 60: { mean: 18.3, sd: 2.45 }
    },
    girl: {
      0: { mean: 3.2, sd: 0.43 }, 1: { mean: 4.2, sd: 0.52 }, 2: { mean: 5.1, sd: 0.63 },
      3: { mean: 5.8, sd: 0.69 }, 6: { mean: 7.3, sd: 0.75 }, 12: { mean: 9.0, sd: 0.95 },
      18: { mean: 10.2, sd: 1.14 }, 24: { mean: 11.5, sd: 1.21 }, 36: { mean: 13.4, sd: 1.40 },
      48: { mean: 15.2, sd: 1.89 }, 60: { mean: 17.0, sd: 2.38 }
    }
  };
  
  const ageKeys = Object.keys(references[gender]).map(Number).sort((a, b) => a - b);
  const closestAge = ageKeys.reduce((prev, curr) => 
    Math.abs(curr - ageMonths) < Math.abs(prev - ageMonths) ? curr : prev
  );
  
  return references[gender][closestAge as keyof typeof references[typeof gender]];
};

const getHeightReference = (ageMonths: number, gender: 'boy' | 'girl') => {
  const references = {
    boy: {
      0: { mean: 49.9, sd: 1.89 }, 1: { mean: 54.7, sd: 2.09 }, 2: { mean: 58.4, sd: 2.25 },
      3: { mean: 61.4, sd: 2.36 }, 6: { mean: 67.6, sd: 2.44 }, 12: { mean: 75.7, sd: 2.72 },
      18: { mean: 82.3, sd: 2.98 }, 24: { mean: 87.1, sd: 3.18 }, 36: { mean: 96.1, sd: 3.73 },
      48: { mean: 103.3, sd: 4.19 }, 60: { mean: 109.9, sd: 4.60 }
    },
    girl: {
      0: { mean: 49.1, sd: 1.86 }, 1: { mean: 53.7, sd: 2.07 }, 2: { mean: 57.1, sd: 2.24 },
      3: { mean: 59.8, sd: 2.33 }, 6: { mean: 65.7, sd: 2.42 }, 12: { mean: 74.0, sd: 2.71 },
      18: { mean: 80.7, sd: 2.97 }, 24: { mean: 85.5, sd: 3.16 }, 36: { mean: 94.1, sd: 3.71 },
      48: { mean: 101.0, sd: 4.17 }, 60: { mean: 107.4, sd: 4.57 }
    }
  };
  
  const ageKeys = Object.keys(references[gender]).map(Number).sort((a, b) => a - b);
  const closestAge = ageKeys.reduce((prev, curr) => 
    Math.abs(curr - ageMonths) < Math.abs(prev - ageMonths) ? curr : prev
  );
  
  return references[gender][closestAge as keyof typeof references[typeof gender]];
};

const calculateGrowth = (state: GrowthState): GrowthResult | null => {
  const childAge = parseFloat(state.childAge);
  const childWeight = parseFloat(state.childWeight);
  const childHeight = parseFloat(state.childHeight);
  const motherHeight = parseFloat(state.motherHeight);
  const fatherHeight = parseFloat(state.fatherHeight);
  
  if (isNaN(childAge) || isNaN(childWeight) || isNaN(childHeight)) return null;

  const ageMonths = childAge;
  
  const weightRef = getWeightReference(ageMonths, state.childGender);
  const heightRef = getHeightReference(ageMonths, state.childGender);
  
  const weightPercentile = calculatePercentile(childWeight, weightRef.mean, weightRef.sd);
  const heightPercentile = calculatePercentile(childHeight, heightRef.mean, heightRef.sd);
  
  const bmi = childWeight / Math.pow(childHeight / 100, 2);
  const bmiPercentile = calculatePercentile(bmi, 16, 2);
  
  let predictedAdultHeight = 0;
  if (!isNaN(motherHeight) && !isNaN(fatherHeight)) {
    if (state.childGender === 'boy') {
      predictedAdultHeight = ((motherHeight + 13) + fatherHeight) / 2;
    } else {
      predictedAdultHeight = (motherHeight + (fatherHeight - 13)) / 2;
    }
  }
  
  let nutritionalStatus = 'Normal';
  if (weightPercentile < 3) nutritionalStatus = 'Baixo peso severo';
  else if (weightPercentile < 10) nutritionalStatus = 'Baixo peso';
  else if (weightPercentile > 97) nutritionalStatus = 'Obesidade';
  else if (weightPercentile > 85) nutritionalStatus = 'Sobrepeso';
  
  let growthVelocity = 'Adequada';
  if (heightPercentile < 3) growthVelocity = 'Baixa estatura';
  else if (heightPercentile > 97) growthVelocity = 'Alta estatura';
  
  const developmentMilestones: string[] = [];
  if (ageMonths >= 2) developmentMilestones.push('Sustenta a cabeça');
  if (ageMonths >= 4) developmentMilestones.push('Rola');
  if (ageMonths >= 6) developmentMilestones.push('Senta com apoio');
  if (ageMonths >= 8) developmentMilestones.push('Senta sem apoio');
  if (ageMonths >= 10) developmentMilestones.push('Engatinha');
  if (ageMonths >= 12) developmentMilestones.push('Anda com apoio');
  if (ageMonths >= 15) developmentMilestones.push('Anda sem apoio');
  if (ageMonths >= 18) developmentMilestones.push('Corre');
  if (ageMonths >= 24) developmentMilestones.push('Sobe escadas');
  if (ageMonths >= 36) developmentMilestones.push('Pedala triciclo');

  const breakdown = {
    weightPercentile,
    heightPercentile,
    bmiPercentile,
    bmi,
    predictedAdultHeight,
    nutritionalStatus,
    growthVelocity,
    developmentMilestones
  };

  return {
    value: heightPercentile,
    isValid: true,
    message: `Criança no percentil ${heightPercentile} para altura`,
    breakdown,
    additionalInfo: {
      'Percentil de Peso': `${breakdown.weightPercentile}º percentil`,
      'Percentil de Altura': `${breakdown.heightPercentile}º percentil`,
      'IMC': `${breakdown.bmi.toFixed(1)} kg/m²`,
      'Status Nutricional': breakdown.nutritionalStatus,
      'Crescimento': breakdown.growthVelocity,
      'Altura Adulta Prevista': predictedAdultHeight > 0 ? `${breakdown.predictedAdultHeight.toFixed(0)}cm` : 'Não calculado',
    },
  };
};

const GrowthResultDisplay: React.FC<{ result: GrowthResult }> = ({ result }) => {
  const theme = useTheme();
  
  const getPercentileColor = (percentile: number) => {
    if (percentile < 3) return theme.palette.error.main;
    if (percentile < 10) return theme.palette.warning.main;
    if (percentile > 97) return theme.palette.error.main;
    if (percentile > 90) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getStatusColor = (status: string) => {
    if (status.includes('severo') || status.includes('Obesidade')) return 'error';
    if (status.includes('Baixo') || status.includes('Sobrepeso') || status.includes('Baixa') || status.includes('Alta')) return 'warning';
    return 'success';
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        📈 Avaliação do Crescimento Infantil
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ 
            backgroundColor: '#fff3e0', 
            p: 2, 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              📏 Altura
            </Typography>
            <Typography variant="h4" sx={{ color: getPercentileColor(result.breakdown.heightPercentile) }}>
              {result.breakdown.heightPercentile}º
            </Typography>
            <Typography variant="body2">percentil</Typography>
          </Box>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ 
            backgroundColor: '#e8f5e8', 
            p: 2, 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              ⚖️ Peso
            </Typography>
            <Typography variant="h4" sx={{ color: getPercentileColor(result.breakdown.weightPercentile) }}>
              {result.breakdown.weightPercentile}º
            </Typography>
            <Typography variant="body2">percentil</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ 
            backgroundColor: '#f3e5f5', 
            p: 2, 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              📊 IMC
            </Typography>
            <Typography variant="h4" color={theme.palette.secondary.dark}>
              {result.breakdown.bmi.toFixed(1)}
            </Typography>
            <Typography variant="body2">kg/m²</Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📋 Avaliação do Estado Nutricional
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={result.breakdown.nutritionalStatus}
            color={getStatusColor(result.breakdown.nutritionalStatus) as any}
            sx={{ fontSize: '1rem', py: 2 }}
          />
          <Chip 
            label={result.breakdown.growthVelocity}
            color={getStatusColor(result.breakdown.growthVelocity) as any}
            sx={{ fontSize: '1rem', py: 2 }}
          />
        </Box>

        <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            📏 Interpretação dos Percentis:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Percentil 50:</strong> Média da população (50% das crianças estão acima e 50% abaixo)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Percentil 3-97:</strong> Faixa de normalidade (94% das crianças saudáveis)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Abaixo do percentil 3:</strong> Pode indicar baixo peso/altura, requer avaliação médica
          </Typography>
          <Typography variant="body2">
            • <strong>Acima do percentil 97:</strong> Pode indicar sobrepeso/obesidade ou crescimento acelerado
          </Typography>
        </Box>

        {result.breakdown.predictedAdultHeight > 0 && (
          <Box sx={{ 
            backgroundColor: theme.palette.info.light, 
            p: 2, 
            borderRadius: 2,
            mb: 2
          }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🔮 Altura Adulta Prevista
            </Typography>
            <Typography variant="h4" color={theme.palette.info.dark}>
              {result.breakdown.predictedAdultHeight.toFixed(0)} cm
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
              Baseado na altura dos pais (fórmula de Tanner). Variação normal: ±8,5cm
            </Typography>
          </Box>
        )}

        {result.breakdown.developmentMilestones.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🎯 Marcos de Desenvolvimento Esperados
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {result.breakdown.developmentMilestones.map((milestone, index) => (
                <Chip 
                  key={index}
                  label={milestone}
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>💡 Importante:</strong> Esta calculadora utiliza as curvas de crescimento da OMS. 
          Os resultados são apenas orientativos. Consulte sempre um pediatra para avaliação completa 
          do crescimento e desenvolvimento da criança.
        </Typography>
      </Alert>
    </Paper>
  );
};

const GrowthCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: GrowthState = {
    childAge: '',
    childWeight: '',
    childHeight: '',
    childGender: 'boy',
    birthWeight: '',
    birthHeight: '',
    motherHeight: '',
    fatherHeight: '',
  };

  const validate = (state: GrowthState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.childAge) {
      return { valid: false, error: 'Informe a idade da criança' };
    }
    if (!state.childWeight) {
      return { valid: false, error: 'Informe o peso da criança' };
    }
    if (!state.childHeight) {
      return { valid: false, error: 'Informe a altura da criança' };
    }

    const ageValid = validateNumberInput(state.childAge, 0, 60);
    if (!ageValid.valid) {
      return { valid: false, error: ageValid.error };
    }

    const weightValid = validateNumberInput(state.childWeight, 0.5, 50);
    if (!weightValid.valid) {
      return { valid: false, error: weightValid.error };
    }

    const heightValid = validateNumberInput(state.childHeight, 30, 150);
    if (!heightValid.valid) {
      return { valid: false, error: heightValid.error };
    }

    return { valid: true };
  };

  const calculate = (state: GrowthState): GrowthResult | null => {
    return calculateGrowth(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof GrowthState, value: string | boolean) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    updateField(field, value);
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Crescimento e Desenvolvimento Infantil"
        description="Avalie o crescimento da criança usando as curvas da OMS. Calcule percentis de peso e altura, previsão de altura adulta e marcos de desenvolvimento."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Idade da Criança (meses)"
            value={state.childAge}
            onChange={(value) => handleFieldUpdate('childAge', value)}
            type="number"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Idade em meses (0-60)'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Sexo da Criança"
            value={state.childGender}
            onChange={(e) => handleFieldUpdate('childGender', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione o sexo da criança"
          >
            <MenuItem value="boy">Menino</MenuItem>
            <MenuItem value="girl">Menina</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Peso Atual (kg)"
            value={state.childWeight}
            onChange={(value) => handleFieldUpdate('childWeight', value)}
            type="number"
            helperText="Peso atual da criança em quilogramas"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Altura Atual (cm)"
            value={state.childHeight}
            onChange={(value) => handleFieldUpdate('childHeight', value)}
            type="number"
            helperText="Altura atual da criança em centímetros"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, color: theme.palette.primary.dark }}>
            📊 Dados Opcionais para Previsão de Altura Adulta
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Altura da Mãe (cm)"
            value={state.motherHeight}
            onChange={(value) => handleFieldUpdate('motherHeight', value)}
            type="number"
            helperText="Altura da mãe (opcional)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Altura do Pai (cm)"
            value={state.fatherHeight}
            onChange={(value) => handleFieldUpdate('fatherHeight', value)}
            type="number"
            helperText="Altura do pai (opcional)"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <GrowthResultDisplay result={result as GrowthResult} />
          </Grid>
        )}

        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CalculatorActions
            onClear={handleClearWithReset}
            layout="clear-only"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GrowthCalculator;