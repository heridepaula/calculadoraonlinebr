'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, Box, Typography, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CurrencyInput from '@/components/CurrencyInput';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface FixedIncomeState {
  initialAmount: string;
  investmentPeriod: string;
  periodType: 'months' | 'years';
  cdbPercentage: string;
  lciLcaPercentage: string;
}

interface FixedIncomeResult extends CalculatorResultType {
  breakdown: {
    cdb: {
      grossValue: number;
      taxAmount: number;
      netValue: number;
      grossReturn: number;
      netReturn: number;
      taxRate: number;
    };
    lciLca: {
      grossValue: number;
      taxAmount: number;
      netValue: number;
      grossReturn: number;
      netReturn: number;
      taxRate: number;
    };
    tesouroSelic: {
      grossValue: number;
      taxAmount: number;
      netValue: number;
      grossReturn: number;
      netReturn: number;
      taxRate: number;
    };
    poupanca: {
      grossValue: number;
      taxAmount: number;
      netValue: number;
      grossReturn: number;
      netReturn: number;
      taxRate: number;
    };
    chartData: Array<{
      period: string;
      CDB: number;
      'LCI/LCA': number;
      'Tesouro SELIC': number;
      'Poupança': number;
    }>;
  };
}

const CURRENT_SELIC = 15.0; // 15% current SELIC rate
const POUPANCA_RATE = 6.17; // 6.17% annual poupança rate
const IOF_EXEMPTION_DAYS = 30;

const calculateIRRate = (periodInDays: number): number => {
  if (periodInDays <= 180) return 22.5;
  if (periodInDays <= 360) return 20.0;
  if (periodInDays <= 720) return 17.5;
  return 15.0;
};

const calculateIOF = (periodInDays: number, returnAmount: number): number => {
  if (periodInDays >= IOF_EXEMPTION_DAYS) return 0;
  const iofRate = Math.max(0, (30 - periodInDays) / 30) * 0.01;
  return returnAmount * iofRate;
};

const calculateCompoundInterest = (principal: number, rate: number, periods: number): number => {
  return principal * Math.pow(1 + rate / 100 / 12, periods);
};

const calculateFixedIncome = (state: FixedIncomeState): FixedIncomeResult | null => {
  const initialAmount = parseBRLNumber(state.initialAmount);
  const period = parseInt(state.investmentPeriod) || 0;
  const cdbRate = parseFloat(state.cdbPercentage) || 0;
  const lciLcaRate = parseFloat(state.lciLcaPercentage) || 0;

  if (isNaN(initialAmount) || period <= 0) return null;

  const periodInMonths = state.periodType === 'years' ? period * 12 : period;
  const periodInDays = periodInMonths * 30;

  // CDB Calculation
  const cdbGrossValue = calculateCompoundInterest(initialAmount, cdbRate, periodInMonths);
  const cdbGrossReturn = cdbGrossValue - initialAmount;
  const cdbTaxRate = calculateIRRate(periodInDays);
  const cdbTaxAmount = cdbGrossReturn * (cdbTaxRate / 100);
  const cdbIOF = calculateIOF(periodInDays, cdbGrossReturn);
  const cdbNetValue = cdbGrossValue - cdbTaxAmount - cdbIOF;
  const cdbNetReturn = cdbNetValue - initialAmount;

  // LCI/LCA Calculation (tax-exempt)
  const lciLcaGrossValue = calculateCompoundInterest(initialAmount, lciLcaRate, periodInMonths);
  const lciLcaGrossReturn = lciLcaGrossValue - initialAmount;
  const lciLcaIOF = calculateIOF(periodInDays, lciLcaGrossReturn);
  const lciLcaNetValue = lciLcaGrossValue - lciLcaIOF;
  const lciLcaNetReturn = lciLcaNetValue - initialAmount;

  // Tesouro SELIC Calculation
  const tesouroGrossValue = calculateCompoundInterest(initialAmount, CURRENT_SELIC, periodInMonths);
  const tesouroGrossReturn = tesouroGrossValue - initialAmount;
  const tesouroTaxRate = calculateIRRate(periodInDays);
  const tesouroTaxAmount = tesouroGrossReturn * (tesouroTaxRate / 100);
  const tesouroIOF = calculateIOF(periodInDays, tesouroGrossReturn);
  const tesouroNetValue = tesouroGrossValue - tesouroTaxAmount - tesouroIOF;
  const tesouroNetReturn = tesouroNetValue - initialAmount;

  // Poupança Calculation (tax-exempt)
  const poupancaGrossValue = calculateCompoundInterest(initialAmount, POUPANCA_RATE, periodInMonths);
  const poupancaGrossReturn = poupancaGrossValue - initialAmount;
  const poupancaNetValue = poupancaGrossValue;
  const poupancaNetReturn = poupancaNetValue - initialAmount;

  // Generate chart data
  const chartData = [];
  for (let i = 1; i <= Math.min(periodInMonths, 60); i++) {
    const cdbValue = calculateCompoundInterest(initialAmount, cdbRate, i);
    const cdbGross = cdbValue - initialAmount;
    const cdbTax = cdbGross * (calculateIRRate(i * 30) / 100);
    const cdbNet = cdbValue - cdbTax;

    const lciValue = calculateCompoundInterest(initialAmount, lciLcaRate, i);
    const tesouroValue = calculateCompoundInterest(initialAmount, CURRENT_SELIC, i);
    const tesouroGross = tesouroValue - initialAmount;
    const tesouroTax = tesouroGross * (calculateIRRate(i * 30) / 100);
    const tesouroNet = tesouroValue - tesouroTax;

    const poupancaValue = calculateCompoundInterest(initialAmount, POUPANCA_RATE, i);

    chartData.push({
      period: `${i}m`,
      CDB: cdbNet,
      'LCI/LCA': lciValue,
      'Tesouro SELIC': tesouroNet,
      'Poupança': poupancaValue,
    });
  }

  const breakdown = {
    cdb: {
      grossValue: cdbGrossValue,
      taxAmount: cdbTaxAmount + cdbIOF,
      netValue: cdbNetValue,
      grossReturn: cdbGrossReturn,
      netReturn: cdbNetReturn,
      taxRate: cdbTaxRate,
    },
    lciLca: {
      grossValue: lciLcaGrossValue,
      taxAmount: lciLcaIOF,
      netValue: lciLcaNetValue,
      grossReturn: lciLcaGrossReturn,
      netReturn: lciLcaNetReturn,
      taxRate: 0,
    },
    tesouroSelic: {
      grossValue: tesouroGrossValue,
      taxAmount: tesouroTaxAmount + tesouroIOF,
      netValue: tesouroNetValue,
      grossReturn: tesouroGrossReturn,
      netReturn: tesouroNetReturn,
      taxRate: tesouroTaxRate,
    },
    poupanca: {
      grossValue: poupancaGrossValue,
      taxAmount: 0,
      netValue: poupancaNetValue,
      grossReturn: poupancaGrossReturn,
      netReturn: poupancaNetReturn,
      taxRate: 0,
    },
    chartData,
  };

  const bestOption = Math.max(
    breakdown.cdb.netValue,
    breakdown.lciLca.netValue,
    breakdown.tesouroSelic.netValue,
    breakdown.poupanca.netValue
  );

  let bestOptionName = '';
  if (bestOption === breakdown.cdb.netValue) bestOptionName = 'CDB';
  else if (bestOption === breakdown.lciLca.netValue) bestOptionName = 'LCI/LCA';
  else if (bestOption === breakdown.tesouroSelic.netValue) bestOptionName = 'Tesouro SELIC';
  else bestOptionName = 'Poupança';

  return {
    value: bestOption,
    isValid: true,
    message: `A melhor opção é ${bestOptionName} com ${bestOption.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
  };
};

const FixedIncomeResultDisplay: React.FC<{ result: FixedIncomeResult }> = ({ result }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercentage = (value: number) => 
    `${value.toFixed(2)}%`;

  const InvestmentCard = ({ 
    title, 
    data, 
    color, 
    isExempt = false 
  }: { 
    title: string; 
    data: any; 
    color: string;
    isExempt?: boolean;
  }) => (
    <Paper sx={{ 
      p: 2, 
      border: `2px solid ${color}`, 
      backgroundColor: '#fafafa',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" sx={{ 
        color, 
        fontWeight: 'bold', 
        mb: 2,
        fontSize: { xs: '1rem', sm: '1.1rem' }
      }}>
        {title}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 1,
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Valor Bruto:
        </Typography>
        <Typography 
          variant="body2" 
          fontWeight="medium"
          sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            textAlign: 'right',
            wordBreak: 'break-word'
          }}
        >
          {formatCurrency(data.grossValue)}
        </Typography>
      </Box>
      
      {data.taxAmount > 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 1,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography 
            variant="body2" 
            color="error"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            Impostos ({formatPercentage(data.taxRate)}):
          </Typography>
          <Typography 
            variant="body2" 
            color="error" 
            fontWeight="medium"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              textAlign: 'right',
              wordBreak: 'break-word'
            }}
          >
            -{formatCurrency(data.taxAmount)}
          </Typography>
        </Box>
      )}
      
      {isExempt && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 1,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.success.main,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Isento de IR:
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.success.main,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              textAlign: 'right'
            }} 
            fontWeight="medium"
          >
            R$ 0,00
          </Typography>
        </Box>
      )}
      
      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 1,
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography 
          variant="body1" 
          fontWeight="bold"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Valor Líquido:
        </Typography>
        <Typography 
          variant="body1" 
          fontWeight="bold" 
          sx={{ 
            color,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            textAlign: 'right',
            wordBreak: 'break-word'
          }}
        >
          {formatCurrency(data.netValue)}
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1,
        mt: 'auto'
      }}>
        <Typography 
          variant="body2"
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          Rendimento Líquido:
        </Typography>
        <Typography 
          variant="body2" 
          fontWeight="medium" 
          sx={{ 
            color,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            textAlign: 'right',
            wordBreak: 'break-word'
          }}
        >
          {formatCurrency(data.netReturn)}
        </Typography>
      </Box>
    </Paper>
  );

  const ComparisonChart = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Evolução dos Investimentos
      </Typography>
      <Box sx={{ 
        width: '100%', 
        height: { xs: 250, sm: 300 },
        overflow: 'hidden'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={result.breakdown.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="period" 
              fontSize={12}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              fontSize={12}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelStyle={{ fontSize: '12px' }}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line type="monotone" dataKey="CDB" stroke="#2196F3" strokeWidth={2} />
            <Line type="monotone" dataKey="LCI/LCA" stroke="#4CAF50" strokeWidth={2} />
            <Line type="monotone" dataKey="Tesouro SELIC" stroke="#FF9800" strokeWidth={2} />
            <Line type="monotone" dataKey="Poupança" stroke="#F44336" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );

  const FinalComparisonChart = () => {
    const comparisonData = [
      { name: 'CDB', value: result.breakdown.cdb.netValue, color: '#2196F3' },
      { name: 'LCI/LCA', value: result.breakdown.lciLca.netValue, color: '#4CAF50' },
      { name: 'Tesouro SELIC', value: result.breakdown.tesouroSelic.netValue, color: '#FF9800' },
      { name: 'Poupança', value: result.breakdown.poupanca.netValue, color: '#F44336' },
    ];

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
          Comparação Final - Valores Líquidos
        </Typography>
        <Box sx={{ 
          width: '100%', 
          height: { xs: 200, sm: 250 },
          overflow: 'hidden'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ fontSize: '12px' }}
                contentStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="value">
                {comparisonData.map((entry, index) => (
                  <Bar key={`cell-${index}`} dataKey="value" fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Comparador de Renda Fixa
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InvestmentCard
            title="CDB"
            data={result.breakdown.cdb}
            color="#2196F3"
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InvestmentCard
            title="LCI/LCA"
            data={result.breakdown.lciLca}
            color="#4CAF50"
            isExempt={true}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InvestmentCard
            title="Tesouro SELIC"
            data={result.breakdown.tesouroSelic}
            color="#FF9800"
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InvestmentCard
            title="Poupança"
            data={result.breakdown.poupanca}
            color="#F44336"
            isExempt={true}
          />
        </Grid>
      </Grid>

      <ComparisonChart />
      <FinalComparisonChart />

      <Box sx={{ 
        mt: 4,
        p: { xs: 2, sm: 3 },
        backgroundColor: theme.palette.info.light,
        borderRadius: 2,
        border: `2px solid ${theme.palette.info.main}`
      }}>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            mb: 2, 
            textAlign: 'center',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          🏆 Recomendação
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mb: 1
          }}
        >
          {result.message}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'center', 
            mt: 1, 
            opacity: 0.8,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          Considerando as taxas atuais: SELIC {CURRENT_SELIC}% | Poupança {POUPANCA_RATE}%
        </Typography>
      </Box>
    </Paper>
  );
};

const FixedIncomeCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: FixedIncomeState = {
    initialAmount: '',
    investmentPeriod: '',
    periodType: 'months',
    cdbPercentage: '100',
    lciLcaPercentage: '90',
  };

  const validate = (state: FixedIncomeState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.initialAmount) {
      return { valid: false, error: 'Informe o valor inicial' };
    }
    if (!state.investmentPeriod) {
      return { valid: false, error: 'Informe o prazo do investimento' };
    }

    const amountValid = validateNumberInput(state.initialAmount, 100, 10000000);
    if (!amountValid.valid) {
      return { valid: false, error: amountValid.error };
    }

    const period = parseInt(state.investmentPeriod);
    if (period <= 0 || period > 120) {
      return { valid: false, error: 'Prazo deve ser entre 1 e 120' };
    }

    return { valid: true };
  };

  const calculate = (state: FixedIncomeState): FixedIncomeResult | null => {
    return calculateFixedIncome(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof FixedIncomeState, value: string) => {
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
        title="Comparador de Renda Fixa"
        description="Compare os rendimentos entre CDB, LCI/LCA, Tesouro SELIC e Poupança. Veja qual investimento oferece o melhor retorno líquido."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.initialAmount}
            handleChange={(value) => handleFieldUpdate('initialAmount', value)}
            label="Valor Inicial (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Valor que deseja investir'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <CalculatorInput
              label="Prazo"
              value={state.investmentPeriod}
              onChange={(value) => handleFieldUpdate('investmentPeriod', value)}
              type="number"
              helperText="Período do investimento"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Período"
              value={state.periodType}
              onChange={(e) => handleFieldUpdate('periodType', e.target.value)}
              select
              variant="standard"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="months">Meses</MenuItem>
              <MenuItem value="years">Anos</MenuItem>
            </TextField>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="CDB (% do CDI)"
            value={state.cdbPercentage}
            onChange={(value) => handleFieldUpdate('cdbPercentage', value)}
            type="number"
            helperText="Percentual do CDI que o CDB oferece"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="LCI/LCA (% do CDI)"
            value={state.lciLcaPercentage}
            onChange={(value) => handleFieldUpdate('lciLcaPercentage', value)}
            type="number"
            helperText="Percentual do CDI que a LCI/LCA oferece"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <FixedIncomeResultDisplay result={result as FixedIncomeResult} />
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

export default FixedIncomeCalculator;