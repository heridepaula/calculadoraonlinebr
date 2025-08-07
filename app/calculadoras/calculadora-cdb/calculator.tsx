'use client';

import React, { useState, useCallback } from 'react';
import { MenuItem, TextField, FormControlLabel, Checkbox, Box, Typography, Paper, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CalculatorResult from '@/components/ui/CalculatorResult';
import CurrencyInput from '@/components/CurrencyInput';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface CdbState {
  initialValue: string;
  investmentPeriod: string;
  annualRate: string;
  indexationType: 'pre' | 'pos' | 'ipca';
  cdiRate: string;
  ipcaRate: string;
  hasLiquidityGrace: boolean;
  liquidityGracePeriod: string;
  taxRegime: 'normal' | 'exempt';
}

interface CdbResult extends CalculatorResultType {
  breakdown: {
    initialValue: number;
    grossReturn: number;
    netReturn: number;
    totalGross: number;
    totalNet: number;
    incomeTax: number;
    iofTax: number;
    effectiveRate: number;
    realReturn: number;
    monthlyYield: number;
    annualYield: number;
  };
}

// Tax rates for CDB based on investment period (in days)
const getIncomeTaxRate = (days: number): number => {
  if (days <= 180) return 0.225; // 22.5%
  if (days <= 360) return 0.20;  // 20%
  if (days <= 720) return 0.175; // 17.5%
  return 0.15; // 15%
};

// IOF rates for investments less than 30 days
const getIofRate = (days: number): number => {
  if (days >= 30) return 0;
  
  const iofTable = [
    96, 93, 90, 86, 83, 80, 76, 73, 70, 66, 63, 60, 56, 53, 50, 
    46, 43, 40, 36, 33, 30, 26, 23, 20, 16, 13, 10, 6, 3, 0
  ];
  
  const index = Math.min(days, iofTable.length - 1);
  return iofTable[index] / 100 / 100; // Convert to decimal
};

const calculateCdb = (state: CdbState, theme: any): CdbResult | null => {
  const initialValue = parseBRLNumber(state.initialValue);
  const investmentPeriod = parseInt(state.investmentPeriod) || 0;
  const annualRate = parseFloat(state.annualRate.replace(',', '.')) || 0;
  const cdiRate = parseFloat(state.cdiRate.replace(',', '.')) || 13.65; // Default CDI rate
  const ipcaRate = parseFloat(state.ipcaRate.replace(',', '.')) || 4.5; // Default IPCA rate

  if (isNaN(initialValue) || investmentPeriod <= 0 || annualRate <= 0) return null;

  // Calculate effective annual rate based on indexation type
  let effectiveAnnualRate = annualRate / 100;
  
  if (state.indexationType === 'pos') {
    // Post-fixed: CDI percentage
    effectiveAnnualRate = (cdiRate / 100) * (annualRate / 100);
  } else if (state.indexationType === 'ipca') {
    // IPCA+: IPCA + fixed rate
    effectiveAnnualRate = (ipcaRate / 100) + (annualRate / 100);
  }

  // Convert annual rate to daily rate
  const dailyRate = Math.pow(1 + effectiveAnnualRate, 1/365) - 1;
  
  // Calculate gross return
  const grossMultiplier = Math.pow(1 + dailyRate, investmentPeriod);
  const totalGross = initialValue * grossMultiplier;
  const grossReturn = totalGross - initialValue;

  // Calculate taxes only if not exempt
  let incomeTax = 0;
  let iofTax = 0;
  
  if (state.taxRegime === 'normal') {
    // Income Tax on returns
    const incomeTaxRate = getIncomeTaxRate(investmentPeriod);
    incomeTax = grossReturn * incomeTaxRate;
    
    // IOF tax (only for investments less than 30 days)
    const iofRate = getIofRate(investmentPeriod);
    iofTax = grossReturn * iofRate;
  }

  const totalTaxes = incomeTax + iofTax;
  const netReturn = grossReturn - totalTaxes;
  const totalNet = initialValue + netReturn;

  // Calculate yields
  const totalNetYield = (totalNet / initialValue - 1) * 100;
  const annualNetYield = (Math.pow(totalNet / initialValue, 365 / investmentPeriod) - 1) * 100;
  const monthlyNetYield = (Math.pow(totalNet / initialValue, 30 / investmentPeriod) - 1) * 100;

  // Real return (considering IPCA)
  const realReturnRate = ((1 + (totalNetYield / 100)) / (1 + (ipcaRate / 100) * (investmentPeriod / 365)) - 1) * 100;

  const breakdown = {
    initialValue,
    grossReturn,
    netReturn,
    totalGross,
    totalNet,
    incomeTax,
    iofTax,
    effectiveRate: effectiveAnnualRate * 100,
    realReturn: realReturnRate,
    monthlyYield: monthlyNetYield,
    annualYield: annualNetYield,
  };

  return {
    value: totalNet,
    isValid: true,
    message: `Valor líquido após ${investmentPeriod} dias: ${totalNet.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
    additionalInfo: {
      'Valor Aplicado': `${breakdown.initialValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Rendimento Bruto': `${breakdown.grossReturn.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Rendimento Líquido': `${breakdown.netReturn.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Imposto de Renda': `${breakdown.incomeTax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'IOF': `${breakdown.iofTax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Bruto': `${breakdown.totalGross.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Líquido': `${breakdown.totalNet.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Rentabilidade Anual': `${breakdown.annualYield.toFixed(2)}%`,
      'Rentabilidade Mensal': `${breakdown.monthlyYield.toFixed(2)}%`,
      'Rentabilidade Real': `${breakdown.realReturn.toFixed(2)}%`,
    },
  };
};

// Custom component to display CDB results
const CdbResultDisplay: React.FC<{ result: CdbResult }> = ({ result }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercentage = (value: number) => 
    `${value.toFixed(2)}%`;

  const ResultSection = ({ title, items, color = theme.palette.text.primary }: { 
    title: string; 
    items: { label: string; value: number; isPercentage?: boolean; isNegative?: boolean }[]; 
    color?: string;
  }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ color, fontWeight: 'bold', mb: 1 }}>
        {title}
      </Typography>
      {items.map((item, index) => (
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
              color: item.isNegative ? theme.palette.error.main : theme.palette.text.primary
            }}
          >
            {item.isPercentage ? formatPercentage(item.value) : formatCurrency(item.value)}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado do Investimento em CDB
      </Typography>

      {/* Investment Summary */}
      <ResultSection
        title="💰 Resumo do Investimento"
        color={theme.palette.primary.dark}
        items={[
          { label: 'Valor Aplicado', value: result.breakdown.initialValue },
          { label: 'Rendimento Bruto', value: result.breakdown.grossReturn },
          { label: 'Rendimento Líquido', value: result.breakdown.netReturn },
        ]}
      />

      <Divider sx={{ my: 2 }} />

      {/* Taxes */}
      {(result.breakdown.incomeTax > 0 || result.breakdown.iofTax > 0) && (
        <>
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
              📊 Tributos
            </Typography>
            {[
              { label: 'Imposto de Renda', value: result.breakdown.incomeTax },
              { label: 'IOF', value: result.breakdown.iofTax },
            ].map((item, index) => (
              item.value > 0 && (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  py: 1,
                  borderBottom: index === 0 && result.breakdown.iofTax > 0 ? `1px solid ${theme.palette.error.light}` : 'none'
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
                    {formatCurrency(item.value)}
                  </Typography>
                </Box>
              )
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Returns */}
      <ResultSection
        title="📈 Rentabilidade"
        color={theme.palette.success.dark}
        items={[
          { label: 'Rentabilidade Mensal', value: result.breakdown.monthlyYield, isPercentage: true },
          { label: 'Rentabilidade Anual', value: result.breakdown.annualYield, isPercentage: true },
          { label: 'Rentabilidade Real (descontada inflação)', value: result.breakdown.realReturn, isPercentage: true },
        ]}
      />

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
            Total Líquido:
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

      <Divider sx={{ my: 2 }} />

      {/* Performance Summary */}
      <Box sx={{ 
        backgroundColor: theme.palette.info.light, 
        p: 2, 
        borderRadius: 2,
        mt: 2
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, textAlign: 'center' }}>
          💡 Resumo de Performance
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
          Ganho total: <strong>{formatCurrency(result.breakdown.netReturn)}</strong>
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8 }}>
          Rentabilidade acumulada no período: <strong>{formatPercentage((result.breakdown.totalNet / result.breakdown.initialValue - 1) * 100)}</strong>
        </Typography>
      </Box>
    </Paper>
  );
};

const CdbCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: CdbState = {
    initialValue: '',
    investmentPeriod: '',
    annualRate: '',
    indexationType: 'pre',
    cdiRate: '13,65',
    ipcaRate: '4,50',
    hasLiquidityGrace: false,
    liquidityGracePeriod: '90',
    taxRegime: 'normal',
  };

  const validate = (state: CdbState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.initialValue) {
      return { valid: false, error: 'Informe o valor inicial do investimento' };
    }
    if (!state.investmentPeriod) {
      return { valid: false, error: 'Informe o período de investimento' };
    }
    if (!state.annualRate) {
      return { valid: false, error: 'Informe a taxa anual' };
    }

    const initialValueValid = validateNumberInput(state.initialValue, 1, 100000000);
    if (!initialValueValid.valid) {
      return { valid: false, error: initialValueValid.error };
    }

    const period = parseInt(state.investmentPeriod);
    if (isNaN(period) || period <= 0 || period > 3650) {
      return { valid: false, error: 'Período deve ser entre 1 e 3650 dias (10 anos)' };
    }

    const rate = parseFloat(state.annualRate.replace(',', '.'));
    if (isNaN(rate) || rate <= 0 || rate > 100) {
      return { valid: false, error: 'Taxa deve ser entre 0,01% e 100%' };
    }

    return { valid: true };
  };

  const calculate = (state: CdbState): CdbResult | null => {
    return calculateCdb(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof CdbState, value: string | boolean) => {
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
        title="Calculadora de CDB"
        description="Calcule a rentabilidade do seu investimento em Certificado de Depósito Bancário (CDB), incluindo impostos, IOF e rentabilidade real."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.initialValue}
            handleChange={(value) => handleFieldUpdate('initialValue', value)}
            label="Valor do Investimento (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Valor que será investido no CDB'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Período de Investimento (dias)"
            value={state.investmentPeriod}
            onChange={(value) => handleFieldUpdate('investmentPeriod', value)}
            type="number"
            helperText="Quantidade de dias do investimento"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Tipo de Indexação"
            value={state.indexationType}
            onChange={(e) => handleFieldUpdate('indexationType', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Tipo de rentabilidade do CDB"
          >
            <MenuItem value="pre">Pré-fixado</MenuItem>
            <MenuItem value="pos">Pós-fixado (% do CDI)</MenuItem>
            <MenuItem value="ipca">IPCA+ (IPCA + taxa fixa)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label={
              state.indexationType === 'pre' ? 'Taxa Anual (%)' :
              state.indexationType === 'pos' ? '% do CDI' :
              'Taxa Fixa (% a.a.)'
            }
            value={state.annualRate}
            onChange={(value) => handleFieldUpdate('annualRate', value)}
            type="number"
            helperText={
              state.indexationType === 'pre' ? 'Taxa anual pré-fixada' :
              state.indexationType === 'pos' ? 'Percentual do CDI (ex: 110 para 110% do CDI)' :
              'Taxa fixa anual adicional ao IPCA'
            }
          />
        </Grid>

        {state.indexationType === 'pos' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Taxa CDI Atual (%)"
              value={state.cdiRate}
              onChange={(value) => handleFieldUpdate('cdiRate', value)}
              type="number"
              helperText="Taxa CDI atual para cálculo (use vírgula para decimais)"
            />
          </Grid>
        )}

        {state.indexationType === 'ipca' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Taxa IPCA Estimada (%)"
              value={state.ipcaRate}
              onChange={(value) => handleFieldUpdate('ipcaRate', value)}
              type="number"
              helperText="Taxa IPCA estimada para o período (use vírgula para decimais)"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Regime de Tributação"
            value={state.taxRegime}
            onChange={(e) => handleFieldUpdate('taxRegime', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Incidência de impostos sobre o investimento"
          >
            <MenuItem value="normal">Tributação Normal (IR + IOF)</MenuItem>
            <MenuItem value="exempt">Isento de Tributação</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasLiquidityGrace}
                onChange={(e) => handleFieldUpdate('hasLiquidityGrace', e.target.checked)}
              />
            }
            label="Possui carência para resgate"
          />
        </Grid>

        {state.hasLiquidityGrace && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Período de Carência (dias)"
              value={state.liquidityGracePeriod}
              onChange={(value) => handleFieldUpdate('liquidityGracePeriod', value)}
              type="number"
              helperText="Período mínimo para resgate sem penalidade"
            />
          </Grid>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <CdbResultDisplay result={result as CdbResult} />
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

export default CdbCalculator;