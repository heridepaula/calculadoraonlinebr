'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, FormControlLabel, Checkbox, Box, Typography, Paper, Alert, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';
import { WaterDrop, LocalHospital } from '@mui/icons-material';

interface HydrationState {
  weight: string;
  age: string;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  climate: 'cold' | 'temperate' | 'hot';
  mode: 'public' | 'professional';
  currentIntake: string;
  hasKidneyProblems: boolean;
  hasHeartProblems: boolean;
  isPregnant: boolean;
  isBreastfeeding: boolean;
}

interface HydrationResult extends CalculatorResultType {
  breakdown: {
    baseWater: number;
    activityBonus: number;
    climateBonus: number;
    genderAdjustment: number;
    pregnancyBonus: number;
    breastfeedingBonus: number;
    totalDaily: number;
    perHour: number;
    dailyGlasses: number;
    waterFromFood: number;
    waterToDrink: number;
    hydrationStatus: string;
  };
}

const calculateHydration = (state: HydrationState): HydrationResult | null => {
  const weight = parseFloat(state.weight);
  const age = parseInt(state.age);
  
  if (isNaN(weight) || isNaN(age)) return null;

  let mlPerKg = 35;
  if (age <= 17) {
    mlPerKg = 40;
  } else if (age >= 18 && age <= 55) {
    mlPerKg = 35;
  } else if (age >= 56 && age <= 65) {
    mlPerKg = 30;
  } else if (age >= 66) {
    mlPerKg = 25;
  }

  const baseWater = (weight * mlPerKg) / 1000;

  let genderAdjustment = 0;
  if (state.gender === 'female') {
    genderAdjustment = baseWater * -0.05;
  }

  let activityBonus = 0;
  switch (state.activityLevel) {
    case 'light':
      activityBonus = baseWater * 0.2;
      break;
    case 'moderate':
      activityBonus = baseWater * 0.5;
      break;
    case 'intense':
      activityBonus = baseWater * 0.8;
      break;
  }

  let climateBonus = 0;
  switch (state.climate) {
    case 'hot':
      climateBonus = baseWater * 0.3;
      break;
    case 'cold':
      climateBonus = baseWater * -0.1;
      break;
  }

  let pregnancyBonus = 0;
  if (state.isPregnant) {
    pregnancyBonus = 0.3;
  }

  let breastfeedingBonus = 0;
  if (state.isBreastfeeding) {
    breastfeedingBonus = 0.7;
  }

  const totalDaily = Math.max(1.0, baseWater + genderAdjustment + activityBonus + climateBonus + pregnancyBonus + breastfeedingBonus);
  const waterFromFood = totalDaily * 0.2;
  const waterToDrink = totalDaily - waterFromFood;
  const perHour = waterToDrink / 16;
  const dailyGlasses = Math.ceil(waterToDrink / 0.25);

  let hydrationStatus = 'Adequada';
  if (state.mode === 'professional' && state.currentIntake) {
    const currentL = parseFloat(state.currentIntake);
    const adequacyRatio = currentL / totalDaily;
    
    if (adequacyRatio < 0.7) {
      hydrationStatus = 'Desidratação Severa';
    } else if (adequacyRatio < 0.85) {
      hydrationStatus = 'Desidratação Leve';
    } else if (adequacyRatio > 1.5) {
      hydrationStatus = 'Hiper-hidratação';
    } else {
      hydrationStatus = 'Adequada';
    }
  }

  const breakdown = {
    baseWater,
    activityBonus,
    climateBonus,
    genderAdjustment,
    pregnancyBonus,
    breastfeedingBonus,
    totalDaily,
    perHour,
    dailyGlasses,
    waterFromFood,
    waterToDrink,
    hydrationStatus
  };

  return {
    value: totalDaily,
    isValid: true,
    message: `Você deve beber ${totalDaily.toFixed(1)}L de água por dia`,
    breakdown,
    additionalInfo: {
      'Necessidade Total': `${breakdown.totalDaily.toFixed(1)}L`,
      'Água para Beber': `${breakdown.waterToDrink.toFixed(1)}L`,
      'Água dos Alimentos': `${breakdown.waterFromFood.toFixed(1)}L`,
      'Por Hora': `${(breakdown.perHour * 1000).toFixed(0)}ml`,
      'Copos de 250ml': `${breakdown.dailyGlasses} copos`,
      'Status de Hidratação': breakdown.hydrationStatus,
    },
  };
};

const HydrationCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mode, setMode] = useState<'public' | 'professional'>('public');

  const initialState: HydrationState = {
    weight: '',
    age: '',
    gender: 'male',
    activityLevel: 'sedentary',
    climate: 'temperate',
    mode: 'public',
    currentIntake: '',
    hasKidneyProblems: false,
    hasHeartProblems: false,
    isPregnant: false,
    isBreastfeeding: false,
  };

  const validate = (state: HydrationState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.weight) {
      return { valid: false, error: 'Informe seu peso' };
    }
    if (!state.age) {
      return { valid: false, error: 'Informe sua idade' };
    }

    const weightValid = validateNumberInput(state.weight, 1, 300);
    if (!weightValid.valid) {
      return { valid: false, error: 'Peso deve estar entre 1 e 300kg' };
    }

    const ageValid = validateNumberInput(state.age, 1, 120);
    if (!ageValid.valid) {
      return { valid: false, error: 'Idade deve estar entre 1 e 120 anos' };
    }

    return { valid: true };
  };

  const calculate = (state: HydrationState): HydrationResult | null => {
    return calculateHydration(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof HydrationState, value: string | boolean) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    updateField(field, value);
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  const handleModeChange = (newMode: 'public' | 'professional') => {
    setMode(newMode);
    updateField('mode', newMode);
  };

  return (
    <Box>
      <CalculatorHeader
        title="Calculadora de Hidratação e Balanço Hídrico"
        description="Calcule suas necessidades diárias de água baseado em peso, idade, atividade física e condições ambientais."
      />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Modo de Cálculo
        </Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, newMode) => newMode && handleModeChange(newMode)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="public">
            <WaterDrop sx={{ mr: 1 }} />
            Público
          </ToggleButton>
          <ToggleButton value="professional">
            <LocalHospital sx={{ mr: 1 }} />
            Profissional
          </ToggleButton>
        </ToggleButtonGroup>
        
        {mode === 'professional' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Modo profissional: Cálculos detalhados para uso clínico e nutricional
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Peso (kg)"
            value={state.weight}
            onChange={(value) => handleFieldUpdate('weight', value)}
            type="number"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Seu peso atual'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Idade (anos)"
            value={state.age}
            onChange={(value) => handleFieldUpdate('age', value)}
            type="number"
            helperText="Sua idade atual"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Sexo"
            value={state.gender}
            onChange={(e) => handleFieldUpdate('gender', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione seu sexo"
          >
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="female">Feminino</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Nível de Atividade Física"
            value={state.activityLevel}
            onChange={(e) => handleFieldUpdate('activityLevel', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Seu nível de atividade física"
          >
            <MenuItem value="sedentary">Sedentário (pouca atividade)</MenuItem>
            <MenuItem value="light">Leve (1-3x por semana)</MenuItem>
            <MenuItem value="moderate">Moderado (3-5x por semana)</MenuItem>
            <MenuItem value="intense">Intenso (6-7x por semana)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Clima da Região"
            value={state.climate}
            onChange={(e) => handleFieldUpdate('climate', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Clima predominante onde você vive"
          >
            <MenuItem value="cold">Frio (&lt; 15°C)</MenuItem>
            <MenuItem value="temperate">Temperado (15-30°C)</MenuItem>
            <MenuItem value="hot">Quente (&gt; 30°C)</MenuItem>
          </TextField>
        </Grid>

        {mode === 'professional' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Ingestão Atual de Líquidos (L/dia)"
              value={state.currentIntake}
              onChange={(value) => handleFieldUpdate('currentIntake', value)}
              type="number"
              helperText="Quantidade atual de líquidos consumidos"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Condições Especiais
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.isPregnant}
                  onChange={(e) => handleFieldUpdate('isPregnant', e.target.checked)}
                />
              }
              label="Estou grávida"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.isBreastfeeding}
                  onChange={(e) => handleFieldUpdate('isBreastfeeding', e.target.checked)}
                />
              }
              label="Estou amamentando"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.hasKidneyProblems}
                  onChange={(e) => handleFieldUpdate('hasKidneyProblems', e.target.checked)}
                />
              }
              label="Tenho problemas renais"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.hasHeartProblems}
                  onChange={(e) => handleFieldUpdate('hasHeartProblems', e.target.checked)}
                />
              }
              label="Tenho problemas cardíacos"
            />
          </Box>
        </Grid>

        {(state.hasKidneyProblems || state.hasHeartProblems) && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="warning">
              ⚠️ <strong>Atenção:</strong> Por ter problemas de saúde, consulte seu médico antes de seguir qualquer recomendação de hidratação. O consumo excessivo de água pode ser perigoso para pessoas com problemas renais ou cardíacos.
            </Alert>
          </Grid>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
              <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                💧 Resultado da Calculadora de Hidratação
              </Typography>

              <Box sx={{ 
                backgroundColor: theme.palette.primary.light, 
                p: 3, 
                borderRadius: 2,
                textAlign: 'center',
                mb: 3
              }}>
                <Typography variant="h6" gutterBottom>
                  Necessidade Total Diária
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={theme.palette.primary.dark}>
                  {(result as HydrationResult).breakdown.totalDaily.toFixed(1)}L
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ 
                    backgroundColor: '#e3f2fd', 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h6" fontWeight="bold">
                      🥤 Para Beber
                    </Typography>
                    <Typography variant="h4" color={theme.palette.info.dark}>
                      {(result as HydrationResult).breakdown.waterToDrink.toFixed(1)}L
                    </Typography>
                    <Typography variant="caption">Água e bebidas</Typography>
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
                      🍎 Dos Alimentos
                    </Typography>
                    <Typography variant="h4" color={theme.palette.secondary.dark}>
                      {(result as HydrationResult).breakdown.waterFromFood.toFixed(1)}L
                    </Typography>
                    <Typography variant="caption">Frutas e verduras</Typography>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ 
                    backgroundColor: '#fff3e0', 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h6" fontWeight="bold">
                      ⏰ Por Hora
                    </Typography>
                    <Typography variant="h4" color={theme.palette.warning.dark}>
                      {((result as HydrationResult).breakdown.perHour * 1000).toFixed(0)}ml
                    </Typography>
                    <Typography variant="caption">16h acordado</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  📊 Distribuição Recomendada
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  <strong>{(result as HydrationResult).breakdown.dailyGlasses} copos</strong> de 250ml por dia
                </Typography>
              </Box>

              {mode === 'professional' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Status Profissional de Hidratação
                  </Typography>
                  <Chip 
                    label={(result as HydrationResult).breakdown.hydrationStatus}
                    color="success"
                    sx={{ fontSize: '1rem', py: 2 }}
                  />
                </Box>
              )}

              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>💡 Dicas importantes:</strong><br />
                  • Beba pequenas quantidades ao longo do dia<br />
                  • Monitore a cor da urina (deve ser clara)<br />
                  • Aumente o consumo durante exercícios e calor<br />
                  • Inclua alimentos ricos em água (frutas e verduras)
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        )}

        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CalculatorActions
            onClear={handleClearWithReset}
            layout="clear-only"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HydrationCalculator;