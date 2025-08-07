'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, FormControlLabel, Switch, Box, Typography, Paper, Alert, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface FertilityState {
  lastPeriodDate: string;
  cycleLength: string;
  age: string;
  mode: 'conception' | 'prevention';
  cycleRegularity: 'regular' | 'irregular';
}

interface FertilityResult extends CalculatorResultType {
  breakdown: {
    ovulationDate: string;
    fertileWindowStart: string;
    fertileWindowEnd: string;
    nextPeriodDate: string;
    lutealPhaseStart: string;
    implantationWindow: string;
    currentCycleDay: number;
    fertilityStatus: string;
    pregnancyProbability: number;
  };
}

const calculateFertility = (state: FertilityState): FertilityResult | null => {
  const lastPeriod = new Date(state.lastPeriodDate);
  const cycleLength = parseInt(state.cycleLength);
  const age = parseInt(state.age);
  
  if (!lastPeriod || isNaN(cycleLength) || isNaN(age)) return null;

  const today = new Date();
  const timeDiff = today.getTime() - lastPeriod.getTime();
  const currentCycleDay = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  
  const ovulationDay = cycleLength - 14;
  const ovulationDate = new Date(lastPeriod);
  ovulationDate.setDate(lastPeriod.getDate() + ovulationDay - 1);
  
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(ovulationDate.getDate() - 5);
  
  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(ovulationDate.getDate() + 1);
  
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
  
  const lutealStart = new Date(ovulationDate);
  lutealStart.setDate(ovulationDate.getDate() + 1);
  
  const implantationStart = new Date(ovulationDate);
  implantationStart.setDate(ovulationDate.getDate() + 6);
  const implantationEnd = new Date(ovulationDate);
  implantationEnd.setDate(ovulationDate.getDate() + 12);
  
  let fertilityStatus = 'Baixa';
  let pregnancyProbability = 5;
  
  if (currentCycleDay >= fertileStart.getDate() && currentCycleDay <= fertileEnd.getDate()) {
    fertilityStatus = 'Alta';
    pregnancyProbability = age < 30 ? 25 : age < 35 ? 20 : age < 40 ? 15 : 10;
  } else if (Math.abs(currentCycleDay - ovulationDay) <= 2) {
    fertilityStatus = 'Moderada';
    pregnancyProbability = age < 30 ? 15 : age < 35 ? 12 : age < 40 ? 8 : 5;
  }

  const breakdown = {
    ovulationDate: ovulationDate.toLocaleDateString('pt-BR'),
    fertileWindowStart: fertileStart.toLocaleDateString('pt-BR'),
    fertileWindowEnd: fertileEnd.toLocaleDateString('pt-BR'),
    nextPeriodDate: nextPeriod.toLocaleDateString('pt-BR'),
    lutealPhaseStart: lutealStart.toLocaleDateString('pt-BR'),
    implantationWindow: `${implantationStart.toLocaleDateString('pt-BR')} - ${implantationEnd.toLocaleDateString('pt-BR')}`,
    currentCycleDay,
    fertilityStatus,
    pregnancyProbability
  };

  return {
    value: pregnancyProbability,
    isValid: true,
    message: `Seu período fértil: ${breakdown.fertileWindowStart} - ${breakdown.fertileWindowEnd}`,
    breakdown,
    additionalInfo: {
      'Ovulação Prevista': breakdown.ovulationDate,
      'Início do Período Fértil': breakdown.fertileWindowStart,
      'Fim do Período Fértil': breakdown.fertileWindowEnd,
      'Próxima Menstruação': breakdown.nextPeriodDate,
      'Dia do Ciclo Atual': `${breakdown.currentCycleDay}º dia`,
      'Status de Fertilidade': breakdown.fertilityStatus,
      'Probabilidade de Gravidez': `${breakdown.pregnancyProbability}%`,
    },
  };
};

const FertilityResultDisplay: React.FC<{ result: FertilityResult; mode: string }> = ({ result, mode }) => {
  const theme = useTheme();
  
  const getFertilityColor = (status: string) => {
    switch (status) {
      case 'Alta': return theme.palette.error.main;
      case 'Moderada': return theme.palette.warning.main;
      default: return theme.palette.success.main;
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        🌸 Resultado da Calculadora de Fertilidade
      </Typography>

      <Box sx={{ 
        backgroundColor: theme.palette.primary.light, 
        p: 3, 
        borderRadius: 2,
        textAlign: 'center',
        mb: 3
      }}>
        <Typography variant="h6" gutterBottom>
          Período Fértil
        </Typography>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.dark}>
          {result.breakdown.fertileWindowStart} - {result.breakdown.fertileWindowEnd}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ 
            backgroundColor: '#fff3e0', 
            p: 2, 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              🗓️ Ovulação
            </Typography>
            <Typography variant="h5" color={theme.palette.warning.dark}>
              {result.breakdown.ovulationDate}
            </Typography>
            <Typography variant="caption">Data prevista</Typography>
          </Box>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ 
            backgroundColor: '#f3e5f5', 
            p: 2, 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold">
              📅 Próxima Menstruação
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary.dark}>
              {result.breakdown.nextPeriodDate}
            </Typography>
            <Typography variant="caption">Data prevista</Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Status Atual de Fertilidade
        </Typography>
        <Chip 
          label={result.breakdown.fertilityStatus}
          sx={{ 
            fontSize: '1.1rem', 
            py: 2, 
            px: 3,
            backgroundColor: getFertilityColor(result.breakdown.fertilityStatus),
            color: 'white',
            fontWeight: 'bold'
          }}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Você está no <strong>{result.breakdown.currentCycleDay}º dia</strong> do seu ciclo
        </Typography>
      </Box>

      <Box sx={{ mt: 3, backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📊 Informações Detalhadas
        </Typography>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2"><strong>Janela de Implantação:</strong></Typography>
            <Typography variant="body1" color={theme.palette.info.dark}>
              {result.breakdown.implantationWindow}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2"><strong>Probabilidade de Gravidez:</strong></Typography>
            <Typography variant="body1" color={theme.palette.success.dark}>
              {result.breakdown.pregnancyProbability}% (este ciclo)
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {mode === 'conception' ? (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>💡 Dicas para Concepção:</strong><br />
            • Tenha relações nos dias mais férteis: {result.breakdown.fertileWindowStart} - {result.breakdown.fertileWindowEnd}<br />
            • Monitore sinais de ovulação: muco cervical e temperatura basal<br />
            • Mantenha estilo de vida saudável: alimentação equilibrada e exercícios<br />
            • Considere suplementação com ácido fólico
          </Typography>
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>⚠️ Prevenção Natural:</strong><br />
            • Período de maior risco: {result.breakdown.fertileWindowStart} - {result.breakdown.fertileWindowEnd}<br />
            • Use métodos contraceptivos adicionais durante todo o ciclo<br />
            • O método do calendário não é 100% eficaz<br />
            • Consulte um ginecologista para métodos mais seguros
          </Typography>
        </Alert>
      )}

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Importante:</strong> Esta calculadora é baseada em ciclos regulares e fornece estimativas. 
          Para maior precisão, consulte um ginecologista e considere métodos como teste de ovulação 
          ou acompanhamento da temperatura basal.
        </Typography>
      </Alert>
    </Paper>
  );
};

const FertilityCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: FertilityState = {
    lastPeriodDate: '',
    cycleLength: '28',
    age: '',
    mode: 'conception',
    cycleRegularity: 'regular',
  };

  const validate = (state: FertilityState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.lastPeriodDate) {
      return { valid: false, error: 'Informe a data da última menstruação' };
    }
    if (!state.cycleLength) {
      return { valid: false, error: 'Informe a duração do ciclo' };
    }
    if (!state.age) {
      return { valid: false, error: 'Informe sua idade' };
    }

    const cycleLengthValid = validateNumberInput(state.cycleLength, 21, 45);
    if (!cycleLengthValid.valid) {
      return { valid: false, error: 'Duração do ciclo deve estar entre 21 e 45 dias' };
    }

    const ageValid = validateNumberInput(state.age, 15, 50);
    if (!ageValid.valid) {
      return { valid: false, error: 'Idade deve estar entre 15 e 50 anos' };
    }

    return { valid: true };
  };

  const calculate = (state: FertilityState): FertilityResult | null => {
    return calculateFertility(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof FertilityState, value: string | boolean) => {
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
        title="Calculadora de Fertilidade e Ciclo Menstrual"
        description="Calcule seu período fértil, data de ovulação e melhores dias para concepção ou prevenção natural baseado no seu ciclo menstrual."
      />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Objetivo do Cálculo
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={state.mode === 'conception'}
              onChange={(e) => handleFieldUpdate('mode', e.target.checked ? 'conception' : 'prevention')}
            />
          }
          label={state.mode === 'conception' ? '💕 Engravidar' : '🛡️ Prevenir Gravidez'}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Data da Última Menstruação"
            type="date"
            value={state.lastPeriodDate}
            onChange={(e) => handleFieldUpdate('lastPeriodDate', e.target.value)}
            fullWidth
            variant="standard"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Primeiro dia da última menstruação'}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Duração do Ciclo (dias)"
            value={state.cycleLength}
            onChange={(value) => handleFieldUpdate('cycleLength', value)}
            type="number"
            helperText="Número de dias entre menstruações (21-45 dias)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Sua Idade (anos)"
            value={state.age}
            onChange={(value) => handleFieldUpdate('age', value)}
            type="number"
            helperText="Idade influencia na probabilidade de gravidez"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Regularidade do Ciclo"
            value={state.cycleRegularity}
            onChange={(e) => handleFieldUpdate('cycleRegularity', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Seus ciclos são regulares?"
          >
            <MenuItem value="regular">Regular (variação ≤ 3 dias)</MenuItem>
            <MenuItem value="irregular">Irregular (variação &gt; 3 dias)</MenuItem>
          </TextField>
        </Grid>

        {state.cycleRegularity === 'irregular' && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="warning">
              ⚠️ <strong>Atenção:</strong> Para ciclos irregulares, esta calculadora pode ter menor precisão. 
              Recomendamos consultar um ginecologista e considerar outros métodos de acompanhamento 
              como temperatura basal ou testes de ovulação.
            </Alert>
          </Grid>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <FertilityResultDisplay result={result as FertilityResult} mode={state.mode} />
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

export default FertilityCalculator;