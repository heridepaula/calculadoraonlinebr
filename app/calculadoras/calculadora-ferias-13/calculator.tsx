'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, FormControlLabel, Checkbox, Box, Typography, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CalculatorResult from '@/components/ui/CalculatorResult';
import CurrencyInput from '@/components/CurrencyInput';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface VacationAndThirteenthState {
  salary: string;
  workStartDate: string;
  vacationStartDate: string;
  workedMonths: string;
  hasVacationBonus: boolean;
  vacationBonusDays: string;
  hasThirteenthAdvance: boolean;
  thirteenthAdvanceValue: string;
  isThirteenthCalculation: boolean;
}

interface VacationAndThirteenthResult extends CalculatorResultType {
  breakdown: {
    vacationValue: number;
    vacationBonus: number;
    vacationOneThird: number;
    thirteenthSalary: number;
    inss: number;
    irrf: number;
    totalGross: number;
    totalDeductions: number;
    totalNet: number;
  };
}

// Calculate months worked with proportional days
const calculateMonthsWorked = (startDate: Date, endDate: Date) => {
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months += endDate.getMonth() - startDate.getMonth();
  
  // Add proportion of days
  if (endDate.getDate() >= startDate.getDate()) {
    months += (endDate.getDate() - startDate.getDate()) / 30;
  } else {
    months -= 1;
    const daysInPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    months += (daysInPrevMonth - startDate.getDate() + endDate.getDate()) / 30;
  }
  
  return Math.max(0, Math.min(12, months));
};

// INSS calculation for 2025
const calculateINSS = (baseValue: number) => {
  if (baseValue <= 1518.00) return baseValue * 0.075;
  if (baseValue <= 2862.40) return baseValue * 0.09 - 22.77;
  if (baseValue <= 4296.00) return baseValue * 0.12 - 108.57;
  if (baseValue <= 8349.60) return baseValue * 0.14 - 194.49;
  return 945.94; // INSS ceiling for 2025
};

// Income Tax calculation for 2025
const calculateIRRF = (baseValue: number) => {
  if (baseValue <= 2259.20) return 0;
  if (baseValue <= 2826.65) return baseValue * 0.075 - 169.44;
  if (baseValue <= 3751.05) return baseValue * 0.15 - 381.44;
  if (baseValue <= 4664.68) return baseValue * 0.225 - 662.77;
  return baseValue * 0.275 - 896.00;
};

const calculateVacationAndThirteenth = (state: VacationAndThirteenthState, theme: any): VacationAndThirteenthResult | null => {
  const salary = parseBRLNumber(state.salary);
  const vacationBonusDays = parseInt(state.vacationBonusDays) || 0;
  const thirteenthAdvanceValue = parseBRLNumber(state.thirteenthAdvanceValue);
  
  if (isNaN(salary)) return null;

  let monthsWorked = 0;
  
  if (state.workStartDate && state.vacationStartDate) {
    const startDate = new Date(state.workStartDate);
    const vacationDate = new Date(state.vacationStartDate);
    monthsWorked = calculateMonthsWorked(startDate, vacationDate);
  } else if (state.workedMonths) {
    monthsWorked = parseFloat(state.workedMonths) || 0;
  }

  // Vacation calculations
  let vacationValue = 0;
  let vacationOneThird = 0;
  let vacationBonus = 0;

  if (!state.isThirteenthCalculation) {
    // Full vacation (30 days) or proportional
    if (monthsWorked >= 12) {
      vacationValue = salary; // Full vacation
    } else {
      vacationValue = (salary / 12) * monthsWorked; // Proportional vacation
    }
    
    // 1/3 constitutional bonus
    vacationOneThird = vacationValue / 3;
    
    // Vacation bonus (selling days)
    if (state.hasVacationBonus && vacationBonusDays > 0) {
      const dailyRate = salary / 30;
      vacationBonus = dailyRate * vacationBonusDays;
      vacationBonus += vacationBonus / 3; // Add 1/3 to bonus
    }
  }

  // 13th salary calculation
  let thirteenthSalary = 0;
  if (state.isThirteenthCalculation || monthsWorked > 0) {
    thirteenthSalary = (salary / 12) * monthsWorked;
    
    // Subtract advance if provided
    if (state.hasThirteenthAdvance && !isNaN(thirteenthAdvanceValue)) {
      thirteenthSalary = Math.max(0, thirteenthSalary - thirteenthAdvanceValue);
    }
  }

  // Total gross
  const totalGross = vacationValue + vacationOneThird + vacationBonus + thirteenthSalary;

  // Calculate deductions
  const inss = calculateINSS(totalGross);
  const irrf = Math.max(0, calculateIRRF(totalGross - inss));
  
  const totalDeductions = inss + irrf;
  const totalNet = totalGross - totalDeductions;

  const breakdown = {
    vacationValue,
    vacationBonus,
    vacationOneThird,
    thirteenthSalary,
    inss,
    irrf,
    totalGross,
    totalDeductions,
    totalNet
  };

  return {
    value: totalNet,
    isValid: true,
    message: `Valor líquido: ${totalNet.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
    additionalInfo: {
      'Férias': `${breakdown.vacationValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      '1/3 das Férias': `${breakdown.vacationOneThird.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Abono Pecuniário (Venda)': `${breakdown.vacationBonus.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      '13º Salário': `${breakdown.thirteenthSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Bruto': `${breakdown.totalGross.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'INSS': `- ${breakdown.inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'IRRF': `- ${breakdown.irrf.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Descontos': `- ${breakdown.totalDeductions.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    },
  };
};

// Custom result display component
const VacationAndThirteenthResultDisplay: React.FC<{ result: VacationAndThirteenthResult }> = ({ result }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatCurrencyPositive = (value: number) => 
    `+ ${formatCurrency(value)}`;

  const formatCurrencyNegative = (value: number) => 
    `- ${formatCurrency(value)}`;

  const ResultSection = ({ title, items, color = theme.palette.text.primary }: { 
    title: string; 
    items: { label: string; value: number; isDiscount?: boolean }[]; 
    color?: string;
  }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ color, fontWeight: 'bold', mb: 1 }}>
        {title}
      </Typography>
      {items.map((item, index) => (
        item.value > 0 && (
          <Box key={index} sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            py: 0.5,
            borderBottom: index < items.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
          }}>
            <Typography variant="body2">{item.label}</Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'medium',
                color: item.isDiscount ? theme.palette.error.main : theme.palette.text.primary
              }}
            >
              {item.isDiscount ? formatCurrencyNegative(item.value) : formatCurrencyPositive(item.value)}
            </Typography>
          </Box>
        )
      ))}
    </Box>
  );

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado do Cálculo de Férias e 13º Salário
      </Typography>

      {/* Vacation Benefits */}
      <ResultSection
        title="🏖️ Férias e Benefícios"
        color={theme.palette.success.dark}
        items={[
          { label: 'Valor das Férias', value: result.breakdown.vacationValue },
          { label: '1/3 Constitucional', value: result.breakdown.vacationOneThird },
          { label: 'Abono Pecuniário (Venda)', value: result.breakdown.vacationBonus },
        ]}
      />

      <Divider sx={{ my: 2 }} />

      {/* 13th Salary */}
      <ResultSection
        title="🎁 13º Salário"
        color={theme.palette.info.dark}
        items={[
          { label: '13º Salário', value: result.breakdown.thirteenthSalary },
        ]}
      />

      <Divider sx={{ my: 2 }} />

      {/* Deductions */}
      <Box sx={{ 
        backgroundColor: '#ffebee', 
        p: 2, 
        borderRadius: 2,
        border: `2px solid ${theme.palette.error.main}`
      }}>
        <Typography variant="h6" sx={{ 
          color: theme.palette.error.dark, 
          fontWeight: 'bold', 
          mb: 2,
          fontSize: '1.1rem'
        }}>
          ❌ Descontos
        </Typography>
        {[
          { label: 'INSS', value: result.breakdown.inss },
          { label: 'IRRF', value: result.breakdown.irrf },
        ].map((item, index) => (
          item.value > 0 && (
            <Box key={index} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              py: 1,
              borderBottom: index === 0 ? `1px solid ${theme.palette.error.light}` : 'none'
            }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#000' }}>
                {item.label}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.error.dark,
                  fontSize: '1rem'
                }}
              >
                {formatCurrencyNegative(item.value)}
              </Typography>
            </Box>
          )
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Totals */}
      <Box sx={{ 
        mt: 3,
        backgroundColor: '#f5f5f5',
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.grey[400]}`
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.grey[300]}`
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', fontSize: '1.1rem' }}>
            Total Bruto:
          </Typography>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.success.dark,
            fontSize: '1.1rem'
          }}>
            {formatCurrency(result.breakdown.totalGross)}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.grey[300]}`
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', fontSize: '1.1rem' }}>
            Total Descontos:
          </Typography>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.error.dark,
            fontSize: '1.1rem'
          }}>
            {formatCurrencyNegative(result.breakdown.totalDeductions)}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          py: 2,
          backgroundColor: theme.palette.primary.light,
          borderRadius: 1,
          mt: 1,
          px: 2
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: '#000',
            fontSize: '1.3rem'
          }}>
            Valor Líquido a Receber:
          </Typography>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.primary.dark,
            fontSize: '1.3rem'
          }}>
            {formatCurrency(result.breakdown.totalNet)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const VacationAndThirteenthCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: VacationAndThirteenthState = {
    salary: '',
    workStartDate: '',
    vacationStartDate: '',
    workedMonths: '',
    hasVacationBonus: false,
    vacationBonusDays: '0',
    hasThirteenthAdvance: false,
    thirteenthAdvanceValue: '',
    isThirteenthCalculation: false,
  };

  const validate = (state: VacationAndThirteenthState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.salary) {
      return { valid: false, error: 'Informe o salário' };
    }

    const salaryValid = validateNumberInput(state.salary, 1, 1000000);
    if (!salaryValid.valid) {
      return { valid: false, error: salaryValid.error };
    }

    if (!state.workStartDate && !state.workedMonths) {
      return { valid: false, error: 'Informe a data de início do trabalho ou o número de meses trabalhados' };
    }

    if (state.workStartDate && state.vacationStartDate) {
      const startDate = new Date(state.workStartDate);
      const vacationDate = new Date(state.vacationStartDate);
      
      if (vacationDate <= startDate) {
        return { valid: false, error: 'A data de início das férias deve ser posterior à data de início do trabalho' };
      }
    }

    return { valid: true };
  };

  const calculate = (state: VacationAndThirteenthState): VacationAndThirteenthResult | null => {
    return calculateVacationAndThirteenth(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof VacationAndThirteenthState, value: string | boolean) => {
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
        title="Calculadora de Férias e 13º Salário"
        description="Calcule férias proporcionais, integrais, abono pecuniário e 13º salário de acordo com a legislação trabalhista brasileira."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.salary}
            handleChange={(value) => handleFieldUpdate('salary', value)}
            label="Salário (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Informe o salário base'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isThirteenthCalculation}
                onChange={(e) => handleFieldUpdate('isThirteenthCalculation', e.target.checked)}
              />
            }
            label="Calcular apenas 13º salário"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Data de Início do Trabalho"
            value={state.workStartDate}
            onChange={(e) => handleFieldUpdate('workStartDate', e.target.value)}
            type="date"
            fullWidth
            variant="standard"
            helperText="Data de início do período aquisitivo"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Grid>

        {!state.isThirteenthCalculation && (
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Data de Início das Férias"
              value={state.vacationStartDate}
              onChange={(e) => handleFieldUpdate('vacationStartDate', e.target.value)}
              type="date"
              fullWidth
              variant="standard"
              helperText="Data em que as férias serão iniciadas"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Meses Trabalhados (alternativo)"
            value={state.workedMonths}
            onChange={(value) => handleFieldUpdate('workedMonths', value)}
            type="number"
            helperText="Caso não tenha as datas, informe quantos meses foram trabalhados"
          />
        </Grid>

        {!state.isThirteenthCalculation && (
          <>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.hasVacationBonus}
                    onChange={(e) => handleFieldUpdate('hasVacationBonus', e.target.checked)}
                  />
                }
                label="Vender parte das férias (abono pecuniário)"
              />
            </Grid>

            {state.hasVacationBonus && (
              <Grid size={{ xs: 12, md: 6 }}>
                <CalculatorInput
                  label="Dias de Férias a Vender"
                  value={state.vacationBonusDays}
                  onChange={(value) => handleFieldUpdate('vacationBonusDays', value)}
                  type="number"
                  helperText="Máximo de 10 dias podem ser vendidos"
                />
              </Grid>
            )}
          </>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasThirteenthAdvance}
                onChange={(e) => handleFieldUpdate('hasThirteenthAdvance', e.target.checked)}
              />
            }
            label="Recebeu antecipação do 13º salário"
          />
        </Grid>

        {state.hasThirteenthAdvance && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.thirteenthAdvanceValue}
              handleChange={(value) => handleFieldUpdate('thirteenthAdvanceValue', value)}
              label="Valor da Antecipação (R$)"
              helperText="Valor já recebido da primeira parcela do 13º"
            />
          </Grid>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <VacationAndThirteenthResultDisplay result={result as VacationAndThirteenthResult} />
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

export default VacationAndThirteenthCalculator;