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

interface SalaryState {
  workRegime: 'clt' | 'pj' | 'mei';
  grossSalary: string;
  dependents: string;
  transportVoucher: boolean;
  transportVoucherValue: string;
  mealVoucher: boolean;
  mealVoucherValue: string;
  healthPlan: boolean;
  healthPlanValue: string;
  dentalPlan: boolean;
  dentalPlanValue: string;
  privateInsurance: string;
  childSupport: string;
  extraHours: string;
  nightShift: string;
  compareRegimes: boolean;
  pjAnnex: 'anexo3' | 'anexo5';
  proLaborePercentage: string;
}

interface SalaryResult extends CalculatorResultType {
  breakdown: {
    grossSalary: number;
    inssDiscount: number;
    irpfDiscount: number;
    totalBenefits: number;
    totalDiscounts: number;
    netSalary: number;
    effectiveDiscountRate: number;
    annualNetSalary: number;
    comparison?: {
      clt: {
        netSalary: number;
        totalDiscounts: number;
        benefits: number;
      };
      pj: {
        netSalary: number;
        totalTaxes: number;
        costs: number;
      };
      mei: {
        netSalary: number;
        totalTaxes: number;
        costs: number;
      };
    };
  };
}

// Tabelas de 2025
const INSS_TABLE_2025 = [
  { min: 0, max: 1518.00, rate: 0.075 },
  { min: 1518.01, max: 2571.29, rate: 0.09 },
  { min: 2571.30, max: 4285.03, rate: 0.12 },
  { min: 4285.04, max: 8569.90, rate: 0.14 },
];

const IRPF_TABLE_2025 = [
  { min: 0, max: 2259.20, rate: 0, deduction: 0 },
  { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
  { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
  { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
  { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.00 },
];

const DEPENDENT_DEDUCTION_2025 = 189.59;
const MINIMUM_WAGE_2025 = 1518.00;

// Tabelas Simples Nacional 2025
const SIMPLES_ANEXO3_2025 = [
  { min: 0, max: 180000, rate: 0.06 },
  { min: 180000.01, max: 360000, rate: 0.112 },
  { min: 360000.01, max: 720000, rate: 0.135 },
  { min: 720000.01, max: 1800000, rate: 0.16 },
  { min: 1800000.01, max: 3600000, rate: 0.21 },
  { min: 3600000.01, max: 4800000, rate: 0.33 },
];

const SIMPLES_ANEXO5_2025 = [
  { min: 0, max: 180000, rate: 0.155 },
  { min: 180000.01, max: 360000, rate: 0.18 },
  { min: 360000.01, max: 720000, rate: 0.195 },
  { min: 720000.01, max: 1800000, rate: 0.205 },
  { min: 1800000.01, max: 3600000, rate: 0.23 },
  { min: 3600000.01, max: 4800000, rate: 0.305 },
];

const calculateINSS = (grossSalary: number): number => {
  if (grossSalary <= 0) return 0;
  
  let totalINSS = 0;
  let previousMax = 0;

  for (const bracket of INSS_TABLE_2025) {
    if (grossSalary <= previousMax) break;
    
    const taxableAmount = Math.min(grossSalary, bracket.max) - previousMax;
    if (taxableAmount > 0) {
      totalINSS += taxableAmount * bracket.rate;
    }
    previousMax = bracket.max;
  }

  return Math.min(totalINSS, 8569.90 * 0.14); // Teto do INSS
};

const calculateIRPF = (baseValue: number, dependents: number): number => {
  if (isNaN(baseValue) || baseValue <= 0) return 0;
  
  const dependentDeduction = (dependents || 0) * DEPENDENT_DEDUCTION_2025;
  const taxableIncome = Math.max(0, baseValue - dependentDeduction);

  for (const bracket of IRPF_TABLE_2025) {
    if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
      return Math.max(0, (taxableIncome * bracket.rate) - bracket.deduction);
    }
  }

  return 0;
};

const calculateSimplesTax = (annualRevenue: number, annex: 'anexo3' | 'anexo5'): number => {
  if (isNaN(annualRevenue) || annualRevenue <= 0) return 0;
  
  const table = annex === 'anexo3' ? SIMPLES_ANEXO3_2025 : SIMPLES_ANEXO5_2025;
  
  for (const bracket of table) {
    if (annualRevenue >= bracket.min && annualRevenue <= bracket.max) {
      return annualRevenue * bracket.rate;
    }
  }
  
  return 0;
};

const calculateMEITax = (): number => {
  // MEI paga valor fixo mensal em 2025
  return 70.00; // Aproximadamente R$ 70 por mês
};

const calculateSalary = (state: SalaryState, theme: any): SalaryResult | null => {
  const grossSalary = parseBRLNumber(state.grossSalary) || 0;
  const dependents = parseInt(state.dependents) || 0;
  const transportVoucherValue = parseBRLNumber(state.transportVoucherValue) || 0;
  const mealVoucherValue = parseBRLNumber(state.mealVoucherValue) || 0;
  const healthPlanValue = parseBRLNumber(state.healthPlanValue) || 0;
  const dentalPlanValue = parseBRLNumber(state.dentalPlanValue) || 0;
  const privateInsurance = parseBRLNumber(state.privateInsurance) || 0;
  const childSupport = parseBRLNumber(state.childSupport) || 0;
  const extraHours = parseBRLNumber(state.extraHours) || 0;
  const nightShift = parseBRLNumber(state.nightShift) || 0;

  if (isNaN(grossSalary) || grossSalary <= 0) return null;

  // Calcular salário base com adicionais
  const totalGrossSalary = grossSalary + extraHours + nightShift;

  let inssDiscount = 0;
  let irpfDiscount = 0;
  let totalBenefits = 0;
  let totalDiscounts = 0;
  let netSalary = 0;

  // Benefícios
  if (state.transportVoucher) totalBenefits += transportVoucherValue;
  if (state.mealVoucher) totalBenefits += mealVoucherValue;

  // Descontos de benefícios (máximo 6% para VT, 20% para VR)
  let transportDiscount = 0;
  let mealDiscount = 0;
  
  if (state.transportVoucher && transportVoucherValue > 0) {
    transportDiscount = Math.min(transportVoucherValue, totalGrossSalary * 0.06);
  }
  
  if (state.mealVoucher && mealVoucherValue > 0) {
    mealDiscount = Math.min(mealVoucherValue * 0.20, totalGrossSalary * 0.20);
  }

  switch (state.workRegime) {
    case 'clt':
      // INSS
      inssDiscount = calculateINSS(totalGrossSalary);
      
      // Base para IR (salário - INSS - previdência privada - pensão)
      const baseForIR = totalGrossSalary - inssDiscount - privateInsurance - childSupport;
      irpfDiscount = calculateIRPF(baseForIR, dependents);
      
      // Descontos totais
      totalDiscounts = inssDiscount + irpfDiscount + transportDiscount + mealDiscount + 
                      (state.healthPlan ? healthPlanValue : 0) + 
                      (state.dentalPlan ? dentalPlanValue : 0) + 
                      privateInsurance + childSupport;
      
      netSalary = totalGrossSalary - totalDiscounts + totalBenefits;
      break;

    case 'pj':
      const proLaborePercentage = parseFloat(state.proLaborePercentage.replace(',', '.')) || 28;
      const proLabore = totalGrossSalary * (proLaborePercentage / 100);
      const annualRevenue = totalGrossSalary * 12;
      
      // Impostos PJ (Simples Nacional)
      const simplesTax = calculateSimplesTax(annualRevenue, state.pjAnnex) / 12;
      
      // INSS sobre pró-labore
      const pjINSS = calculateINSS(proLabore);
      
      totalDiscounts = simplesTax + pjINSS + 
                      (state.healthPlan ? healthPlanValue : 0) + 
                      (state.dentalPlan ? dentalPlanValue : 0) +
                      200; // Custos contabilidade
      
      netSalary = totalGrossSalary - totalDiscounts;
      break;

    case 'mei':
      const meiTax = calculateMEITax();
      
      totalDiscounts = meiTax + 
                      (state.healthPlan ? healthPlanValue : 0) + 
                      (state.dentalPlan ? dentalPlanValue : 0);
      
      netSalary = Math.min(totalGrossSalary, 6750) - totalDiscounts; // MEI limitado a R$ 6.750
      break;
  }

  const effectiveDiscountRate = (totalDiscounts / totalGrossSalary) * 100;
  const annualNetSalary = netSalary * 12;

  // Comparação entre regimes (se solicitada)
  let comparison;
  if (state.compareRegimes) {
    // CLT
    const cltINSS = calculateINSS(totalGrossSalary);
    const cltBaseIR = totalGrossSalary - cltINSS - privateInsurance - childSupport;
    const cltIRPF = calculateIRPF(cltBaseIR, dependents);
    const cltTotalDiscounts = cltINSS + cltIRPF + transportDiscount + mealDiscount + 
                             (state.healthPlan ? healthPlanValue : 0) + 
                             (state.dentalPlan ? dentalPlanValue : 0);
    const cltNetSalary = totalGrossSalary - cltTotalDiscounts + totalBenefits;

    // PJ
    const pjProLabore = totalGrossSalary * 0.28;
    const pjSimples = calculateSimplesTax(totalGrossSalary * 12, 'anexo3') / 12;
    const pjINSSCalc = calculateINSS(pjProLabore);
    const pjTotalCosts = pjSimples + pjINSSCalc + 
                        (state.healthPlan ? healthPlanValue : 0) + 200;
    const pjNetSalary = totalGrossSalary - pjTotalCosts;

    // MEI
    const meiTaxCalc = calculateMEITax();
    const meiNetSalary = Math.min(totalGrossSalary, 6750) - meiTaxCalc - 
                        (state.healthPlan ? healthPlanValue : 0);

    comparison = {
      clt: {
        netSalary: cltNetSalary,
        totalDiscounts: cltTotalDiscounts,
        benefits: totalBenefits,
      },
      pj: {
        netSalary: pjNetSalary,
        totalTaxes: pjTotalCosts,
        costs: 200,
      },
      mei: {
        netSalary: meiNetSalary,
        totalTaxes: meiTaxCalc,
        costs: 0,
      },
    };
  }

  const breakdown = {
    grossSalary: totalGrossSalary,
    inssDiscount,
    irpfDiscount,
    totalBenefits,
    totalDiscounts,
    netSalary,
    effectiveDiscountRate,
    annualNetSalary,
    comparison,
  };

  const message = `Salário líquido: ${netSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

  return {
    value: netSalary,
    isValid: true,
    message,
    breakdown,
    additionalInfo: {
      'Salário Bruto': `${breakdown.grossSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'INSS': `${breakdown.inssDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'IRPF': `${breakdown.irpfDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Descontos': `${breakdown.totalDiscounts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Salário Líquido': `${breakdown.netSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Taxa Efetiva': `${breakdown.effectiveDiscountRate.toFixed(2)}%`,
    },
  };
};

// Componente para exibição detalhada dos resultados
const SalaryResultDisplay: React.FC<{ result: SalaryResult; workRegime: string }> = ({ result, workRegime }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  const getRegimeLabel = (regime: string) => {
    switch (regime) {
      case 'clt': return 'CLT (Carteira Assinada)';
      case 'pj': return 'PJ (Pessoa Jurídica)';
      case 'mei': return 'MEI (Microempreendedor Individual)';
      default: return regime;
    }
  };

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case 'clt': return theme.palette.success.main;
      case 'pj': return theme.palette.info.main;
      case 'mei': return theme.palette.warning.main;
      default: return theme.palette.text.primary;
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Cálculo de Salário - {getRegimeLabel(workRegime)}
      </Typography>

      {/* Resumo principal */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: getRegimeColor(workRegime) + '20', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
          💰 Resumo do Salário
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" fontWeight="bold">Salário Bruto</Typography>
            <Typography variant="h6" color={theme.palette.text.primary}>
              {formatCurrency(result.breakdown.grossSalary)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" fontWeight="bold">Total Descontos</Typography>
            <Typography variant="h6" color={theme.palette.error.main}>
              -{formatCurrency(result.breakdown.totalDiscounts)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" fontWeight="bold">Salário Líquido</Typography>
            <Typography variant="h6" color={theme.palette.success.dark} fontWeight="bold">
              {formatCurrency(result.breakdown.netSalary)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Detalhamento dos descontos */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 'bold' }}>
          📋 Detalhamento dos Descontos
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {workRegime === 'clt' && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                <Typography>INSS:</Typography>
                <Typography fontWeight="bold" color={theme.palette.error.dark}>
                  -{formatCurrency(result.breakdown.inssDiscount)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                <Typography>IRPF:</Typography>
                <Typography fontWeight="bold" color={theme.palette.error.dark}>
                  -{formatCurrency(result.breakdown.irpfDiscount)}
                </Typography>
              </Box>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '2px solid #333' }}>
            <Typography fontWeight="bold">Total de Descontos:</Typography>
            <Typography fontWeight="bold" fontSize="1.1rem" color={theme.palette.error.main}>
              -{formatCurrency(result.breakdown.totalDiscounts)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Taxa efetiva */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">📊 Taxa Efetiva de Desconto</Typography>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.warning.dark}>
          {formatPercent(result.breakdown.effectiveDiscountRate)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          Percentual total descontado do salário bruto
        </Typography>
      </Box>

      {/* Projeção anual */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.secondary.dark, fontWeight: 'bold' }}>
          📅 Projeção Anual
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.success.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Salário Líquido Anual</Typography>
            <Typography variant="h6" color={theme.palette.success.dark}>
              {formatCurrency(result.breakdown.annualNetSalary)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.info.light }}>
            <Typography variant="subtitle2" fontWeight="bold">13º Salário (estimado)</Typography>
            <Typography variant="h6" color={theme.palette.info.dark}>
              {workRegime === 'clt' ? formatCurrency(result.breakdown.netSalary) : 'Não aplicável'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Comparação entre regimes */}
      {result.breakdown.comparison && (
        <>
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.dark, fontWeight: 'bold' }}>
              🔄 Comparação entre Regimes
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <Paper sx={{ p: 2, backgroundColor: '#e8f5e8', border: '2px solid #4caf50' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#2e7d32">CLT</Typography>
                <Typography variant="body2">Líquido: {formatCurrency(result.breakdown.comparison.clt.netSalary)}</Typography>
                <Typography variant="body2">Descontos: {formatCurrency(result.breakdown.comparison.clt.totalDiscounts)}</Typography>
                <Typography variant="body2">Benefícios: {formatCurrency(result.breakdown.comparison.clt.benefits)}</Typography>
              </Paper>
              
              <Paper sx={{ p: 2, backgroundColor: '#e3f2fd', border: '2px solid #2196f3' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#1565c0">PJ</Typography>
                <Typography variant="body2">Líquido: {formatCurrency(result.breakdown.comparison.pj.netSalary)}</Typography>
                <Typography variant="body2">Impostos: {formatCurrency(result.breakdown.comparison.pj.totalTaxes)}</Typography>
                <Typography variant="body2">Custos: {formatCurrency(result.breakdown.comparison.pj.costs)}</Typography>
              </Paper>
              
              <Paper sx={{ p: 2, backgroundColor: '#fff3e0', border: '2px solid #ffa726' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#f57c00">MEI</Typography>
                <Typography variant="body2">Líquido: {formatCurrency(result.breakdown.comparison.mei.netSalary)}</Typography>
                <Typography variant="body2">Impostos: {formatCurrency(result.breakdown.comparison.mei.totalTaxes)}</Typography>
                <Typography variant="body2">Limite: R$ 6.750/mês</Typography>
              </Paper>
            </Box>
          </Box>
        </>
      )}

      {/* Dicas importantes */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          💡 Dicas Importantes
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2, lineHeight: 1.8 }}>
          <li>CLT oferece estabilidade e benefícios trabalhistas</li>
          <li>PJ pode ser mais vantajoso para salários altos, mas sem benefícios CLT</li>
          <li>MEI é limitado a R$ 6.750/mês e R$ 81.000/ano</li>
          <li>Considere custos com plano de saúde, férias e aposentadoria no PJ/MEI</li>
          <li>Vale-transporte é limitado a 6% do salário bruto</li>
          <li>Dependentes reduzem o IRPF em R$ 189,59 cada</li>
        </Typography>
      </Box>
    </Paper>
  );
};

const SalaryCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: SalaryState = {
    workRegime: 'clt',
    grossSalary: '',
    dependents: '0',
    transportVoucher: false,
    transportVoucherValue: '',
    mealVoucher: false,
    mealVoucherValue: '',
    healthPlan: false,
    healthPlanValue: '',
    dentalPlan: false,
    dentalPlanValue: '',
    privateInsurance: '',
    childSupport: '',
    extraHours: '',
    nightShift: '',
    compareRegimes: false,
    pjAnnex: 'anexo3',
    proLaborePercentage: '28',
  };

  const validate = (state: SalaryState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.grossSalary) {
      return { valid: false, error: 'Informe o salário bruto' };
    }

    const salaryValid = validateNumberInput(state.grossSalary, 1, 100000000);
    if (!salaryValid.valid) {
      return { valid: false, error: salaryValid.error };
    }

    const dependents = parseInt(state.dependents);
    if (isNaN(dependents) || dependents < 0 || dependents > 20) {
      return { valid: false, error: 'Número de dependentes deve estar entre 0 e 20' };
    }

    if (state.workRegime === 'mei') {
      const grossSalary = parseBRLNumber(state.grossSalary);
      if (grossSalary > 6750) {
        return { valid: false, error: 'MEI é limitado a R$ 6.750 por mês' };
      }
    }

    return { valid: true };
  };

  const calculate = (state: SalaryState): SalaryResult | null => {
    return calculateSalary(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof SalaryState, value: string | boolean) => {
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
        title="Calculadora de Salário Líquido"
        description="Calcule seu salário líquido para CLT, PJ e MEI. Compare regimes de trabalho e analise descontos, benefícios e impostos 2025."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Regime de Trabalho"
            value={state.workRegime}
            onChange={(e) => handleFieldUpdate('workRegime', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione seu regime de trabalho"
          >
            <MenuItem value="clt">CLT (Carteira Assinada)</MenuItem>
            <MenuItem value="pj">PJ (Pessoa Jurídica)</MenuItem>
            <MenuItem value="mei">MEI (Microempreendedor)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.grossSalary}
            handleChange={(value) => handleFieldUpdate('grossSalary', value)}
            label="Salário Bruto (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Salário antes dos descontos'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Número de Dependentes"
            value={state.dependents}
            onChange={(value) => handleFieldUpdate('dependents', value)}
            type="number"
            helperText="Filhos menores de 21 anos ou outros dependentes"
          />
        </Grid>

        {state.workRegime === 'pj' && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Anexo do Simples Nacional"
                value={state.pjAnnex}
                onChange={(e) => handleFieldUpdate('pjAnnex', e.target.value)}
                select
                fullWidth
                variant="standard"
                helperText="Anexo para tributação PJ"
              >
                <MenuItem value="anexo3">Anexo III (Serviços)</MenuItem>
                <MenuItem value="anexo5">Anexo V (Serviços específicos)</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CalculatorInput
                label="Pró-labore (%)"
                value={state.proLaborePercentage}
                onChange={(value) => handleFieldUpdate('proLaborePercentage', value)}
                type="text"
                helperText="Percentual do faturamento para pró-labore"
              />
            </Grid>
          </>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.extraHours}
            handleChange={(value) => handleFieldUpdate('extraHours', value)}
            label="Horas Extras (R$)"
            helperText="Valor mensal de horas extras"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.nightShift}
            handleChange={(value) => handleFieldUpdate('nightShift', value)}
            label="Adicional Noturno (R$)"
            helperText="Valor mensal do adicional noturno"
          />
        </Grid>

        {/* Benefícios */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
            🎁 Benefícios
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.transportVoucher}
                onChange={(e) => handleFieldUpdate('transportVoucher', e.target.checked)}
              />
            }
            label="Vale-transporte"
          />
        </Grid>

        {state.transportVoucher && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.transportVoucherValue}
              handleChange={(value) => handleFieldUpdate('transportVoucherValue', value)}
              label="Valor Vale-transporte (R$)"
              helperText="Valor mensal do vale-transporte"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.mealVoucher}
                onChange={(e) => handleFieldUpdate('mealVoucher', e.target.checked)}
              />
            }
            label="Vale-refeição/alimentação"
          />
        </Grid>

        {state.mealVoucher && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.mealVoucherValue}
              handleChange={(value) => handleFieldUpdate('mealVoucherValue', value)}
              label="Valor Vale-refeição (R$)"
              helperText="Valor mensal do vale-refeição"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.healthPlan}
                onChange={(e) => handleFieldUpdate('healthPlan', e.target.checked)}
              />
            }
            label="Plano de saúde"
          />
        </Grid>

        {state.healthPlan && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.healthPlanValue}
              handleChange={(value) => handleFieldUpdate('healthPlanValue', value)}
              label="Valor Plano de Saúde (R$)"
              helperText="Desconto mensal do plano de saúde"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.dentalPlan}
                onChange={(e) => handleFieldUpdate('dentalPlan', e.target.checked)}
              />
            }
            label="Plano odontológico"
          />
        </Grid>

        {state.dentalPlan && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.dentalPlanValue}
              handleChange={(value) => handleFieldUpdate('dentalPlanValue', value)}
              label="Valor Plano Odontológico (R$)"
              helperText="Desconto mensal do plano odontológico"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.privateInsurance}
            handleChange={(value) => handleFieldUpdate('privateInsurance', value)}
            label="Previdência Privada (R$)"
            helperText="Contribuição mensal previdência privada"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.childSupport}
            handleChange={(value) => handleFieldUpdate('childSupport', value)}
            label="Pensão Alimentícia (R$)"
            helperText="Valor mensal de pensão alimentícia"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.compareRegimes}
                onChange={(e) => handleFieldUpdate('compareRegimes', e.target.checked)}
              />
            }
            label="Comparar CLT x PJ x MEI"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <SalaryResultDisplay 
              result={result as SalaryResult} 
              workRegime={state.workRegime}
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

export default SalaryCalculator;