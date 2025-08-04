'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, FormControlLabel, Checkbox, Box, Typography, Paper, Divider, Tabs, Tab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CurrencyInput from '@/components/CurrencyInput';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface RetirementState {
  birthDate: string;
  gender: 'male' | 'female';
  currentAge: number;
  contributionStartDate: string;
  contributionYears: string;
  currentSalary: string;
  retirementRule: 'general' | 'points' | 'age_progressive' | 'transition_50' | 'transition_100';
  hasPrivatePension: boolean;
  privatePensionType: 'PGBL' | 'VGBL';
  privatePensionBalance: string;
  privatePensionMonthly: string;
  privatePensionYield: string;
  expectedInflation: string;
  lifeExpectancy: string;
}

interface RetirementResult extends CalculatorResultType {
  breakdown: {
    currentAge: number;
    retirementAge: number;
    yearsToRetirement: number;
    totalContributionYears: number;
    inssMonthlyBenefit: number;
    privatePensionMonthlyBenefit: number;
    totalMonthlyBenefit: number;
    inssTotalReceived: number;
    privatePensionTotalReceived: number;
    totalReceived: number;
    inssReplacement: number;
    totalReplacement: number;
    requiredPoints: number;
    currentPoints: number;
    privatePensionBalance: number;
    scenario: string;
  };
}

const INSS_CEILING_2025 = 8157.41;
const INSS_FLOOR_2025 = 1518.00;
const INSS_TAX_BRACKETS = [
  { min: 0, max: 1518.00, rate: 0.075 },
  { min: 1518.01, max: 2571.29, rate: 0.09 },
  { min: 2571.30, max: 4190.84, rate: 0.12 },
  { min: 4190.85, max: 8157.41, rate: 0.14 }
];

const calculateInssContribution = (salary: number) => {
  let contribution = 0;
  let remainingSalary = Math.min(salary, INSS_CEILING_2025);
  
  for (const bracket of INSS_TAX_BRACKETS) {
    if (remainingSalary <= 0) break;
    
    const taxableAmount = Math.min(remainingSalary, bracket.max - bracket.min + 0.01);
    contribution += taxableAmount * bracket.rate;
    remainingSalary -= taxableAmount;
  }
  
  return contribution;
};

const calculateInssBenefit = (averageSalary: number, contributionYears: number, gender: string) => {
  const limitedSalary = Math.min(averageSalary, INSS_CEILING_2025);
  const minYears = gender === 'female' ? 15 : 20;
  const basePercentage = 0.6;
  
  if (contributionYears < minYears) {
    return 0;
  }
  
  const additionalPercentage = Math.max(0, contributionYears - minYears) * 0.02;
  const totalPercentage = Math.min(1, basePercentage + additionalPercentage);
  
  return Math.max(INSS_FLOOR_2025, limitedSalary * totalPercentage);
};

const getRetirementRequirements = (rule: string, gender: string, currentYear: number = 2025) => {
  const yearsSinceReform = Math.max(0, currentYear - 2019);
  
  switch (rule) {
    case 'general':
      return {
        minAge: gender === 'female' ? 62 : 65,
        minContribution: gender === 'female' ? 15 : 20,
        points: null
      };
      
    case 'points':
      const femalePoints = Math.min(100, 88 + yearsSinceReform);
      const malePoints = Math.min(105, 98 + yearsSinceReform);
      return {
        minAge: null,
        minContribution: gender === 'female' ? 30 : 35,
        points: gender === 'female' ? femalePoints : malePoints
      };
      
    case 'age_progressive':
      const femaleMinAge = Math.min(62, 56 + Math.floor(yearsSinceReform * 0.5));
      const maleMinAge = Math.min(65, 61 + Math.floor(yearsSinceReform * 0.5));
      return {
        minAge: gender === 'female' ? femaleMinAge : maleMinAge,
        minContribution: gender === 'female' ? 30 : 35,
        points: null
      };
      
    case 'transition_50':
      return {
        minAge: null,
        minContribution: gender === 'female' ? 28 : 33,
        points: null,
        additionalTime: '50% do tempo que faltava em 2019'
      };
      
    case 'transition_100':
      return {
        minAge: gender === 'female' ? 57 : 60,
        minContribution: gender === 'female' ? 28 : 33,
        points: null,
        additionalTime: '100% do tempo que faltava em 2019'
      };
      
    default:
      return { minAge: 65, minContribution: 20, points: null };
  }
};

const calculatePrivatePension = (
  currentBalance: number,
  monthlyContribution: number,
  yearsToRetirement: number,
  annualYield: number
) => {
  const monthlyYield = annualYield / 12 / 100;
  const totalMonths = yearsToRetirement * 12;
  
  const futureValueBalance = currentBalance * Math.pow(1 + monthlyYield, totalMonths);
  
  const futureValueContributions = monthlyContribution * 
    ((Math.pow(1 + monthlyYield, totalMonths) - 1) / monthlyYield);
  
  return futureValueBalance + futureValueContributions;
};

const calculateRetirement = (state: RetirementState): RetirementResult | null => {
  const currentSalary = parseBRLNumber(state.currentSalary);
  const contributionYears = parseFloat(state.contributionYears) || 0;
  const privatePensionBalance = parseBRLNumber(state.privatePensionBalance) || 0;
  const privatePensionMonthly = parseBRLNumber(state.privatePensionMonthly) || 0;
  const privatePensionYield = parseFloat(state.privatePensionYield) || 6;
  const expectedInflation = parseFloat(state.expectedInflation) || 4;
  const lifeExpectancy = parseInt(state.lifeExpectancy) || 80;
  
  if (isNaN(currentSalary) || currentSalary <= 0) return null;
  
  const currentYear = new Date().getFullYear();
  const requirements = getRetirementRequirements(state.retirementRule, state.gender, currentYear);
  
  let retirementAge = requirements.minAge || 65;
  let requiredContribution = requirements.minContribution || 20;
  let requiredPoints = requirements.points || 0;
  
  if (state.retirementRule === 'points' && requirements.points) {
    const currentPoints = state.currentAge + contributionYears;
    requiredPoints = requirements.points;
    
    if (currentPoints < requiredPoints) {
      const pointsNeeded = requiredPoints - currentPoints;
      retirementAge = Math.max(state.currentAge + Math.ceil(pointsNeeded / 2), requirements.minAge || 60);
    } else {
      retirementAge = state.currentAge;
    }
  }
  
  const yearsToRetirement = Math.max(0, retirementAge - state.currentAge);
  const totalContributionYears = contributionYears + yearsToRetirement;
  
  const averageSalary = currentSalary * Math.pow(1 + expectedInflation / 100, yearsToRetirement / 2);
  const inssMonthlyBenefit = calculateInssBenefit(averageSalary, totalContributionYears, state.gender);
  
  let privatePensionMonthlyBenefit = 0;
  let privatePensionFinalBalance = 0;
  
  if (state.hasPrivatePension) {
    privatePensionFinalBalance = calculatePrivatePension(
      privatePensionBalance,
      privatePensionMonthly,
      yearsToRetirement,
      privatePensionYield
    );
    
    const retirementYears = lifeExpectancy - retirementAge;
    privatePensionMonthlyBenefit = privatePensionFinalBalance / (retirementYears * 12);
  }
  
  const totalMonthlyBenefit = inssMonthlyBenefit + privatePensionMonthlyBenefit;
  const retirementYears = lifeExpectancy - retirementAge;
  const inssTotalReceived = inssMonthlyBenefit * retirementYears * 12;
  const privatePensionTotalReceived = privatePensionMonthlyBenefit * retirementYears * 12;
  const totalReceived = inssTotalReceived + privatePensionTotalReceived;
  
  const futureCurrentSalary = currentSalary * Math.pow(1 + expectedInflation / 100, yearsToRetirement);
  const inssReplacement = (inssMonthlyBenefit / futureCurrentSalary) * 100;
  const totalReplacement = (totalMonthlyBenefit / futureCurrentSalary) * 100;
  
  const currentPoints = state.currentAge + contributionYears;
  
  let scenario = 'Aposentadoria pela regra geral';
  switch (state.retirementRule) {
    case 'points':
      scenario = 'Aposentadoria por pontos';
      break;
    case 'age_progressive':
      scenario = 'Aposentadoria por idade progressiva';
      break;
    case 'transition_50':
      scenario = 'Regra de transição 50%';
      break;
    case 'transition_100':
      scenario = 'Regra de transição 100%';
      break;
  }
  
  const breakdown = {
    currentAge: state.currentAge,
    retirementAge,
    yearsToRetirement,
    totalContributionYears,
    inssMonthlyBenefit,
    privatePensionMonthlyBenefit,
    totalMonthlyBenefit,
    inssTotalReceived,
    privatePensionTotalReceived,
    totalReceived,
    inssReplacement,
    totalReplacement,
    requiredPoints,
    currentPoints,
    privatePensionBalance: privatePensionFinalBalance,
    scenario,
  };
  
  return {
    value: totalMonthlyBenefit,
    isValid: true,
    message: `Benefício mensal total: ${totalMonthlyBenefit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
    additionalInfo: {
      'Idade para aposentar': `${retirementAge} anos`,
      'Anos até aposentadoria': `${yearsToRetirement} anos`,
      'Benefício INSS': `${inssMonthlyBenefit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Benefício Previdência Privada': `${privatePensionMonthlyBenefit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Mensal': `${totalMonthlyBenefit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Taxa de Reposição INSS': `${inssReplacement.toFixed(1)}%`,
      'Taxa de Reposição Total': `${totalReplacement.toFixed(1)}%`,
      'Cenário': scenario,
    },
  };
};

const RetirementResultDisplay: React.FC<{ result: RetirementResult; state: RetirementState }> = ({ result, state }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
  
  const getReplacementColor = (percentage: number) => {
    if (percentage >= 70) return theme.palette.success.main;
    if (percentage >= 50) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Simulação de Aposentadoria
      </Typography>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} centered>
        <Tab label="Resumo" />
        <Tab label="Projeções" />
        <Tab label="Comparativo" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: theme.palette.primary.dark, fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
              🎯 {result.breakdown.scenario}
            </Typography>
            
            <Box sx={{ 
              backgroundColor: theme.palette.primary.light, 
              p: 3, 
              borderRadius: 2,
              mb: 3
            }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body1">Idade atual:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {result.breakdown.currentAge} anos
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body1">Idade para aposentar:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {result.breakdown.retirementAge} anos
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body1">Tempo até aposentadoria:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {result.breakdown.yearsToRetirement} anos
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body1">Contribuição atual:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {parseFloat(state.contributionYears)} anos
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body1">Contribuição total:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {result.breakdown.totalContributionYears.toFixed(1)} anos
                    </Typography>
                  </Box>
                  {state.retirementRule === 'points' && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body1">Pontos atual/necessário:</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {result.breakdown.currentPoints}/{result.breakdown.requiredPoints}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ 
              backgroundColor: '#e8f5e8', 
              p: 3, 
              borderRadius: 2,
              border: `2px solid ${theme.palette.success.main}`,
              mb: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                💰 Benefícios Mensais
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body1">INSS:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formatCurrency(result.breakdown.inssMonthlyBenefit)}
                </Typography>
              </Box>
              
              {state.hasPrivatePension && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="body1">Previdência Privada:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(result.breakdown.privatePensionMonthlyBenefit)}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2, mt: 1 }}>
                <Typography variant="h6" fontWeight="bold">Total Mensal:</Typography>
                <Typography variant="h6" fontWeight="bold" color={theme.palette.success.dark}>
                  {formatCurrency(result.breakdown.totalMonthlyBenefit)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              backgroundColor: '#fff3e0', 
              p: 3, 
              borderRadius: 2,
              mb: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                📊 Taxa de Reposição
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body1">INSS:</Typography>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ color: getReplacementColor(result.breakdown.inssReplacement) }}
                >
                  {formatPercentage(result.breakdown.inssReplacement)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="h6" fontWeight="bold">Total:</Typography>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{ color: getReplacementColor(result.breakdown.totalReplacement) }}
                >
                  {formatPercentage(result.breakdown.totalReplacement)}
                </Typography>
              </Box>
              
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, opacity: 0.8 }}>
                {result.breakdown.totalReplacement >= 70 ? 
                  '✅ Taxa de reposição adequada (70%+)' :
                  result.breakdown.totalReplacement >= 50 ? 
                  '⚠️ Taxa de reposição moderada (50-70%)' :
                  '❌ Taxa de reposição baixa (menos de 50%)'
                }
              </Typography>
            </Box>
          </Box>
        </>
        )}

        {tabValue === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: 'center' }}>
              📈 Projeções de Longo Prazo
            </Typography>
            
            <Box sx={{ 
              backgroundColor: '#f9f9f9', 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.grey[300]}`
            }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                💰 Valores Acumulados no Período de Aposentadoria:
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2">Total INSS a receber:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {formatCurrency(result.breakdown.inssTotalReceived)}
                </Typography>
              </Box>
              
              {state.hasPrivatePension && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Total Previdência Privada:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(result.breakdown.privatePensionTotalReceived)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Saldo acumulado na aposentadoria:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(result.breakdown.privatePensionBalance)}
                    </Typography>
                  </Box>
                </>
              )}
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="h6" fontWeight="bold">Total Geral a Receber:</Typography>
                <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.dark}>
                  {formatCurrency(result.breakdown.totalReceived)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: 'center' }}>
              ⚖️ Comparativo de Cenários
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', opacity: 0.8 }}>
              Compare diferentes estratégias para sua aposentadoria
            </Typography>
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, backgroundColor: '#e8f5e8' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: 'center' }}>
                    🏛️ Apenas INSS
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Benefício mensal:</strong> {formatCurrency(result.breakdown.inssMonthlyBenefit)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Taxa de reposição:</strong> {formatPercentage(result.breakdown.inssReplacement)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total a receber:</strong> {formatCurrency(result.breakdown.inssTotalReceived)}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, backgroundColor: '#e3f2fd' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: 'center' }}>
                    🏛️ + 🏦 INSS + Privada
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Benefício mensal:</strong> {formatCurrency(result.breakdown.totalMonthlyBenefit)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Taxa de reposição:</strong> {formatPercentage(result.breakdown.totalReplacement)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total a receber:</strong> {formatCurrency(result.breakdown.totalReceived)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                💡 Diferença com Previdência Privada:
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'center', color: theme.palette.primary.dark, fontWeight: 'bold' }}>
                +{formatCurrency(result.breakdown.privatePensionMonthlyBenefit)} por mês
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                Total adicional: {formatCurrency(result.breakdown.privatePensionTotalReceived)}
              </Typography>
            </Box>
          </Box>
        )}
    </Paper>
  );
};

const RetirementCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: RetirementState = {
    birthDate: '',
    gender: 'female',
    currentAge: 30,
    contributionStartDate: '',
    contributionYears: '',
    currentSalary: '',
    retirementRule: 'general',
    hasPrivatePension: false,
    privatePensionType: 'PGBL',
    privatePensionBalance: '',
    privatePensionMonthly: '',
    privatePensionYield: '6',
    expectedInflation: '4',
    lifeExpectancy: '80',
  };

  const validate = (state: RetirementState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.currentSalary) {
      return { valid: false, error: 'Informe o salário atual' };
    }
    if (!state.contributionYears) {
      return { valid: false, error: 'Informe os anos de contribuição' };
    }
    if (state.currentAge < 16 || state.currentAge > 70) {
      return { valid: false, error: 'Idade deve estar entre 16 e 70 anos' };
    }

    const salary = parseBRLNumber(state.currentSalary);
    const salaryValid = validateNumberInput(state.currentSalary, 1320, 100000);
    if (!salaryValid.valid) {
      return { valid: false, error: salaryValid.error };
    }

    const contributionYears = parseFloat(state.contributionYears);
    if (isNaN(contributionYears) || contributionYears < 0 || contributionYears > 50) {
      return { valid: false, error: 'Anos de contribuição deve estar entre 0 e 50' };
    }

    return { valid: true };
  };

  const calculate = (state: RetirementState): RetirementResult | null => {
    return calculateRetirement(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof RetirementState, value: string | boolean | number) => {
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
        title="Calculadora de Aposentadoria INSS + Previdência Privada"
        description="Simule sua aposentadoria com as regras atuais do INSS e calcule o impacto da previdência privada complementar. Inclui todas as regras de transição da reforma da previdência."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            👤 Dados Pessoais
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Sexo"
            value={state.gender}
            onChange={(e) => handleFieldUpdate('gender', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Influencia nas regras de aposentadoria"
          >
            <MenuItem value="female">Feminino</MenuItem>
            <MenuItem value="male">Masculino</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Idade Atual"
            value={state.currentAge.toString()}
            onChange={(value) => handleFieldUpdate('currentAge', parseInt(value) || 30)}
            type="number"
            helperText="Sua idade atual em anos"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.currentSalary}
            handleChange={(value) => handleFieldUpdate('currentSalary', value)}
            label="Salário Atual (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Salário bruto mensal atual'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Anos de Contribuição"
            value={state.contributionYears}
            onChange={(value) => handleFieldUpdate('contributionYears', value)}
            type="number"
            helperText="Tempo já contribuído para o INSS"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
            🏛️ Regras de Aposentadoria
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            label="Regra de Aposentadoria"
            value={state.retirementRule}
            onChange={(e) => handleFieldUpdate('retirementRule', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Escolha a regra que melhor se adequa ao seu perfil"
          >
            <MenuItem value="general">Regra Geral (Pós-Reforma)</MenuItem>
            <MenuItem value="points">Aposentadoria por Pontos</MenuItem>
            <MenuItem value="age_progressive">Idade Progressiva</MenuItem>
            <MenuItem value="transition_50">Regra de Transição 50%</MenuItem>
            <MenuItem value="transition_100">Regra de Transição 100%</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
            🏦 Previdência Privada (Opcional)
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasPrivatePension}
                onChange={(e) => handleFieldUpdate('hasPrivatePension', e.target.checked)}
              />
            }
            label="Tenho ou pretendo ter previdência privada complementar"
          />
        </Grid>

        {state.hasPrivatePension && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Tipo de Plano"
                value={state.privatePensionType}
                onChange={(e) => handleFieldUpdate('privatePensionType', e.target.value)}
                select
                fullWidth
                variant="standard"
                helperText="PGBL para quem faz declaração completa"
              >
                <MenuItem value="PGBL">PGBL (Plano Gerador de Benefício Livre)</MenuItem>
                <MenuItem value="VGBL">VGBL (Vida Gerador de Benefício Livre)</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                initialValue={state.privatePensionBalance}
                handleChange={(value) => handleFieldUpdate('privatePensionBalance', value)}
                label="Saldo Atual (R$)"
                helperText="Valor já acumulado na previdência privada"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                initialValue={state.privatePensionMonthly}
                handleChange={(value) => handleFieldUpdate('privatePensionMonthly', value)}
                label="Contribuição Mensal (R$)"
                helperText="Valor que pretende contribuir mensalmente"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CalculatorInput
                label="Rentabilidade Esperada (% a.a.)"
                value={state.privatePensionYield}
                onChange={(value) => handleFieldUpdate('privatePensionYield', value)}
                type="number"
                helperText="Rentabilidade anual esperada (padrão: 6%)"
              />
            </Grid>
          </>
        )}

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
            📊 Parâmetros de Projeção
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CalculatorInput
            label="Inflação Esperada (% a.a.)"
            value={state.expectedInflation}
            onChange={(value) => handleFieldUpdate('expectedInflation', value)}
            type="number"
            helperText="Inflação média esperada (padrão: 4%)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CalculatorInput
            label="Expectativa de Vida"
            value={state.lifeExpectancy}
            onChange={(value) => handleFieldUpdate('lifeExpectancy', value)}
            type="number"
            helperText="Idade até quando espera viver (padrão: 80 anos)"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <RetirementResultDisplay result={result as RetirementResult} state={state} />
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

export default RetirementCalculator;