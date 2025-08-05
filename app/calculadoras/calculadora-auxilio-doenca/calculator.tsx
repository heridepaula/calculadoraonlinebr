'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, FormControlLabel, Checkbox, Box, Typography, Paper, Divider, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CalculatorResult from '@/components/ui/CalculatorResult';
import CurrencyInput from '@/components/CurrencyInput';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface SickBenefitState {
  benefitType: 'auxilio_doenca' | 'pensao_morte' | 'auxilio_acidente';
  avgSalaryLast12Months: string;
  contributionMonths: string;
  hasGraveDisease: boolean;
  dependentsCount: string;
  isWorkAccident: boolean;
  deceasedBenefitValue: string;
}

interface SickBenefitResult extends CalculatorResultType {
  breakdown: {
    salaryBenefit: number;
    benefitValue: number;
    minimumValue: number;
    maximumValue: number;
    carencyRequired: number;
    carencyMet: boolean;
    benefitPercentage: number;
    totalDependents: number;
  };
}

// Constantes de 2025
const MINIMUM_WAGE_2025 = 1518.00;
const MAXIMUM_BENEFIT_2025 = 8157.41;
const REQUIRED_CARENCY = 12;

// Doenças que dispensam carência
const GRAVE_DISEASES = [
  'Tuberculose ativa',
  'Hanseníase',
  'Alienação mental',
  'Esclerose múltipla',
  'Hepatopatia grave',
  'Neoplasia maligna',
  'Cegueira',
  'Paralisia irreversível',
  'Cardiopatia grave',
  'Doença de Parkinson',
  'Espondiloartrose anquilosante',
  'Nefropatia grave',
  'Estado avançado da doença de Paget',
  'Síndrome da deficiência imunológica adquirida',
  'Contaminação por radiação'
];

const calculateSickBenefit = (state: SickBenefitState, theme: any): SickBenefitResult | null => {
  const avgSalary = parseBRLNumber(state.avgSalaryLast12Months);
  const contributionMonths = parseInt(state.contributionMonths) || 0;
  const dependentsCount = parseInt(state.dependentsCount) || 0;
  const deceasedBenefitValue = parseBRLNumber(state.deceasedBenefitValue);

  if (isNaN(avgSalary) || avgSalary <= 0) return null;

  // Verificar carência
  const carencyRequired = (state.hasGraveDisease || state.isWorkAccident) ? 0 : REQUIRED_CARENCY;
  const carencyMet = contributionMonths >= carencyRequired;

  // Cálculo do salário-de-benefício
  const salaryBenefit = Math.min(avgSalary, MAXIMUM_BENEFIT_2025);

  let benefitValue = 0;
  let benefitPercentage = 0;

  switch (state.benefitType) {
    case 'auxilio_doenca':
      // Auxílio-doença = 91% do salário-de-benefício
      benefitPercentage = 91;
      benefitValue = salaryBenefit * 0.91;
      break;
      
    case 'auxilio_acidente':
      // Auxílio-acidente = 50% do salário-de-benefício
      benefitPercentage = 50;
      benefitValue = salaryBenefit * 0.50;
      break;
      
    case 'pensao_morte':
      // Pensão por morte = 50% + 10% por dependente (até 100%)
      if (deceasedBenefitValue > 0) {
        const basePercentage = 50;
        const dependentPercentage = Math.min(dependentsCount * 10, 50);
        benefitPercentage = basePercentage + dependentPercentage;
        benefitValue = deceasedBenefitValue * (benefitPercentage / 100);
      }
      break;
  }

  // Aplicar valores mínimo e máximo
  benefitValue = Math.max(benefitValue, MINIMUM_WAGE_2025);
  benefitValue = Math.min(benefitValue, MAXIMUM_BENEFIT_2025);

  const breakdown = {
    salaryBenefit,
    benefitValue,
    minimumValue: MINIMUM_WAGE_2025,
    maximumValue: MAXIMUM_BENEFIT_2025,
    carencyRequired,
    carencyMet,
    benefitPercentage,
    totalDependents: dependentsCount,
  };

  const message = carencyMet 
    ? `Valor do benefício: ${benefitValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    : `Carência não atendida. Necessário: ${carencyRequired} contribuições`;

  return {
    value: benefitValue,
    isValid: carencyMet,
    message,
    breakdown,
    additionalInfo: {
      'Salário-de-Benefício': `${breakdown.salaryBenefit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Percentual Aplicado': `${breakdown.benefitPercentage}%`,
      'Valor do Benefício': `${breakdown.benefitValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Carência Exigida': `${breakdown.carencyRequired} contribuições`,
      'Carência Cumprida': carencyMet ? 'Sim' : 'Não',
      'Valor Mínimo': `${breakdown.minimumValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Valor Máximo': `${breakdown.maximumValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    },
  };
};

// Componente para exibição detalhada dos resultados
const SickBenefitResultDisplay: React.FC<{ result: SickBenefitResult; benefitType: string }> = ({ result, benefitType }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const getBenefitTypeLabel = (type: string) => {
    switch (type) {
      case 'auxilio_doenca': return 'Auxílio-Doença';
      case 'auxilio_acidente': return 'Auxílio-Acidente';
      case 'pensao_morte': return 'Pensão por Morte';
      default: return type;
    }
  };

  const getBenefitDescription = (type: string) => {
    switch (type) {
      case 'auxilio_doenca': 
        return 'Benefício temporário para segurados incapacitados para o trabalho por doença';
      case 'auxilio_acidente': 
        return 'Benefício complementar para segurados com sequelas permanentes';
      case 'pensao_morte': 
        return 'Benefício para dependentes de segurado falecido';
      default: return '';
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Cálculo de {getBenefitTypeLabel(benefitType)} - INSS 2025
      </Typography>

      {/* Status do benefício */}
      <Alert 
        severity={result.breakdown.carencyMet ? "success" : "warning"} 
        sx={{ mb: 3 }}
      >
        {result.breakdown.carencyMet 
          ? "✅ Requisitos atendidos - Benefício pode ser concedido"
          : "⚠️ Carência insuficiente - Necessário mais tempo de contribuição"
        }
      </Alert>

      {/* Informações do benefício */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          📋 {getBenefitTypeLabel(benefitType)}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {getBenefitDescription(benefitType)}
        </Typography>
        <Typography variant="body2">
          <strong>Percentual aplicado:</strong> {result.breakdown.benefitPercentage}% do salário-de-benefício
        </Typography>
      </Box>

      {/* Cálculo detalhado */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 'bold' }}>
          💰 Detalhamento do Cálculo
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Salário-de-Benefício:</Typography>
            <Typography fontWeight="bold">
              {formatCurrency(result.breakdown.salaryBenefit)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Percentual Aplicado:</Typography>
            <Typography fontWeight="bold">
              {result.breakdown.benefitPercentage}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Valor Calculado:</Typography>
            <Typography fontWeight="bold" color={theme.palette.success.dark}>
              {formatCurrency(result.breakdown.benefitValue)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Informações sobre carência */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.info.dark, fontWeight: 'bold' }}>
          📅 Requisitos de Carência
        </Typography>
        
        <Box sx={{ 
          p: 2, 
          backgroundColor: result.breakdown.carencyMet ? '#e8f5e8' : '#fff3cd',
          borderRadius: 2,
          border: `2px solid ${result.breakdown.carencyMet ? theme.palette.success.main : theme.palette.warning.main}`
        }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Carência Exigida:</strong> {result.breakdown.carencyRequired} contribuições mensais
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Status:</strong> {result.breakdown.carencyMet ? 'Atendida ✅' : 'Não atendida ❌'}
          </Typography>
          {result.breakdown.carencyRequired === 0 && (
            <Typography variant="body2" color={theme.palette.success.dark}>
              💡 Carência dispensada por doença grave ou acidente de trabalho
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Valores de referência */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.secondary.dark, fontWeight: 'bold' }}>
          📊 Valores de Referência 2025
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.info.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Valor Mínimo</Typography>
            <Typography variant="h6" color={theme.palette.info.dark}>
              {formatCurrency(result.breakdown.minimumValue)}
            </Typography>
            <Typography variant="caption">Salário mínimo 2025</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.warning.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Valor Máximo</Typography>
            <Typography variant="h6" color={theme.palette.warning.dark}>
              {formatCurrency(result.breakdown.maximumValue)}
            </Typography>
            <Typography variant="caption">Teto do INSS 2025</Typography>
          </Paper>
        </Box>
      </Box>

      {/* Valor final */}
      <Box sx={{ 
        p: 3, 
        backgroundColor: theme.palette.primary.light, 
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          💼 Valor Final do Benefício
        </Typography>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.dark}>
          {formatCurrency(result.breakdown.benefitValue)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          {result.breakdown.carencyMet 
            ? 'Valor mensal a ser recebido pelo INSS'
            : 'Valor estimado (sujeito ao cumprimento da carência)'
          }
        </Typography>
      </Box>

      {/* Dicas importantes */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          💡 Informações Importantes
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2, lineHeight: 1.8 }}>
          <li>Os valores são estimativas baseadas nas regras atuais do INSS</li>
          <li>O cálculo considera a média dos últimos 12 salários de contribuição</li>
          <li>Doenças graves dispensam o período de carência de 12 meses</li>
          <li>Acidentes de trabalho também dispensam carência</li>
          <li>Para solicitação oficial, acesse o Meu INSS ou compareça a uma agência</li>
          <li>É necessário passar por perícia médica para comprovação da incapacidade</li>
        </Typography>
      </Box>
    </Paper>
  );
};

const SickBenefitCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: SickBenefitState = {
    benefitType: 'auxilio_doenca',
    avgSalaryLast12Months: '',
    contributionMonths: '',
    hasGraveDisease: false,
    dependentsCount: '0',
    isWorkAccident: false,
    deceasedBenefitValue: '',
  };

  const validate = (state: SickBenefitState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.avgSalaryLast12Months) {
      return { valid: false, error: 'Informe a média salarial dos últimos 12 meses' };
    }

    if (!state.contributionMonths) {
      return { valid: false, error: 'Informe o tempo de contribuição em meses' };
    }

    if (state.benefitType === 'pensao_morte' && !state.deceasedBenefitValue) {
      return { valid: false, error: 'Informe o valor do benefício que o falecido recebia ou teria direito' };
    }

    const salaryValid = validateNumberInput(state.avgSalaryLast12Months, 1, 100000000);
    if (!salaryValid.valid) {
      return { valid: false, error: salaryValid.error };
    }

    const contributionMonths = parseInt(state.contributionMonths);
    if (isNaN(contributionMonths) || contributionMonths < 0 || contributionMonths > 600) {
      return { valid: false, error: 'Tempo de contribuição deve estar entre 0 e 600 meses' };
    }

    const dependents = parseInt(state.dependentsCount);
    if (isNaN(dependents) || dependents < 0 || dependents > 20) {
      return { valid: false, error: 'Número de dependentes deve estar entre 0 e 20' };
    }

    return { valid: true };
  };

  const calculate = (state: SickBenefitState): SickBenefitResult | null => {
    return calculateSickBenefit(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof SickBenefitState, value: string | boolean) => {
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
        title="Calculadora de Auxílio-Doença e Benefícios INSS"
        description="Calcule o valor do auxílio-doença, auxílio-acidente e pensão por morte do INSS. Simule seu benefício considerando salário-de-benefício, carência e regras 2025."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Tipo de Benefício"
            value={state.benefitType}
            onChange={(e) => handleFieldUpdate('benefitType', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione o tipo de benefício do INSS"
          >
            <MenuItem value="auxilio_doenca">Auxílio-Doença</MenuItem>
            <MenuItem value="auxilio_acidente">Auxílio-Acidente</MenuItem>
            <MenuItem value="pensao_morte">Pensão por Morte</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.avgSalaryLast12Months}
            handleChange={(value) => handleFieldUpdate('avgSalaryLast12Months', value)}
            label="Média Salarial Últimos 12 Meses (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Média dos últimos 12 salários de contribuição'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Tempo de Contribuição (meses)"
            value={state.contributionMonths}
            onChange={(value) => handleFieldUpdate('contributionMonths', value)}
            type="number"
            helperText="Total de meses de contribuição ao INSS"
          />
        </Grid>

        {state.benefitType === 'pensao_morte' && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                initialValue={state.deceasedBenefitValue}
                handleChange={(value) => handleFieldUpdate('deceasedBenefitValue', value)}
                label="Valor do Benefício do Falecido (R$)"
                helperText="Aposentadoria que recebia ou teria direito"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CalculatorInput
                label="Número de Dependentes"
                value={state.dependentsCount}
                onChange={(value) => handleFieldUpdate('dependentsCount', value)}
                type="number"
                helperText="Cônjuge, filhos e outros dependentes"
              />
            </Grid>
          </>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasGraveDisease}
                onChange={(e) => handleFieldUpdate('hasGraveDisease', e.target.checked)}
              />
            }
            label="Possui doença grave (dispensa carência)"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isWorkAccident}
                onChange={(e) => handleFieldUpdate('isWorkAccident', e.target.checked)}
              />
            }
            label="Acidente de trabalho ou doença ocupacional"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <SickBenefitResultDisplay 
              result={result as SickBenefitResult} 
              benefitType={state.benefitType}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <CalculatorActions
            onClear={handleClearWithReset}
            layout="clear-only"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SickBenefitCalculator;