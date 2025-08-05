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

interface ConsignadoState {
  borrowerType: 'inss' | 'servidor_publico' | 'clt_privado';
  salary: string;
  existingLoanAmount: string;
  existingInstallment: string;
  requestedAmount: string;
  interestRate: string;
  termMonths: string;
  hasExistingLoan: boolean;
}

interface ConsignadoResult extends CalculatorResultType {
  breakdown: {
    availableMargin: number;
    usedMargin: number;
    remainingMargin: number;
    monthlyInstallment: number;
    totalInterest: number;
    totalAmount: number;
    marginPercentage: number;
    effectiveRate: number;
    commitmentLevel: number;
  };
}

// Constantes de margem consignável por tipo
const MARGIN_LIMITS = {
  inss: 0.45, // 45% para INSS (35% empréstimo + 5% cartão + 5% benefício)
  servidor_publico: 0.35, // 35% para servidores públicos
  clt_privado: 0.35, // 35% para CLT privado (novo consignado privado 2025)
};

// Taxas de juros médias por modalidade (para referência)
const AVERAGE_RATES = {
  inss: 1.66, // Taxa atual INSS 2025
  servidor_publico: 1.2, // Taxa média servidores
  clt_privado: 1.8, // Taxa média CLT privado
};

const calculateConsignado = (state: ConsignadoState, theme: any): ConsignadoResult | null => {
  const salary = parseBRLNumber(state.salary);
  const existingLoanAmount = parseBRLNumber(state.existingLoanAmount);
  const existingInstallment = parseBRLNumber(state.existingInstallment);
  const requestedAmount = parseBRLNumber(state.requestedAmount);
  const interestRate = parseFloat(state.interestRate.replace(',', '.')) || 0;
  const termMonths = parseInt(state.termMonths) || 0;

  if (isNaN(salary) || salary <= 0) return null;

  // Margem consignável disponível
  const marginLimit = MARGIN_LIMITS[state.borrowerType];
  const availableMargin = salary * marginLimit;

  // Margem já utilizada
  const usedMargin = state.hasExistingLoan ? existingInstallment : 0;
  const remainingMargin = Math.max(0, availableMargin - usedMargin);

  // Calcular prestação usando Price (parcela fixa)
  let monthlyInstallment = 0;
  let totalAmount = 0;
  let totalInterest = 0;
  let effectiveRate = 0;

  if (requestedAmount > 0 && interestRate > 0 && termMonths > 0) {
    const monthlyRate = interestRate / 100;
    
    // Fórmula Price: PMT = PV * [(1+i)^n * i] / [(1+i)^n - 1]
    const numerator = Math.pow(1 + monthlyRate, termMonths) * monthlyRate;
    const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
    monthlyInstallment = requestedAmount * (numerator / denominator);
    
    totalAmount = monthlyInstallment * termMonths;
    totalInterest = totalAmount - requestedAmount;
    effectiveRate = Math.pow(1 + monthlyRate, 12) - 1; // Taxa efetiva anual
  }

  // Percentual de comprometimento da margem
  const marginPercentage = (usedMargin / availableMargin) * 100;
  
  // Nível de comprometimento considerando nova prestação
  const newCommitment = usedMargin + monthlyInstallment;
  const commitmentLevel = (newCommitment / availableMargin) * 100;

  const breakdown = {
    availableMargin,
    usedMargin,
    remainingMargin,
    monthlyInstallment,
    totalInterest,
    totalAmount,
    marginPercentage,
    effectiveRate: effectiveRate * 100,
    commitmentLevel,
  };

  // Determinar se o empréstimo é viável
  const isViable = monthlyInstallment <= remainingMargin;
  const message = isViable
    ? `Empréstimo viável! Prestação de ${monthlyInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    : `Valor solicitado excede a margem disponível. Máximo: ${remainingMargin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

  return {
    value: monthlyInstallment,
    isValid: true,
    message,
    breakdown,
    additionalInfo: {
      'Margem Disponível': `${breakdown.availableMargin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Margem Utilizada': `${breakdown.usedMargin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Margem Restante': `${breakdown.remainingMargin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Prestação Mensal': `${breakdown.monthlyInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Valor Total': `${breakdown.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total de Juros': `${breakdown.totalInterest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Taxa Efetiva Anual': `${breakdown.effectiveRate.toFixed(2)}%`,
      'Comprometimento': `${breakdown.commitmentLevel.toFixed(1)}%`,
    },
  };
};

// Componente para exibição detalhada dos resultados
const ConsignadoResultDisplay: React.FC<{ result: ConsignadoResult; borrowerType: string }> = ({ result, borrowerType }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  const getMarginStatus = (percentage: number) => {
    if (percentage <= 50) return { color: theme.palette.success.main, text: 'Baixo' };
    if (percentage <= 80) return { color: theme.palette.warning.main, text: 'Moderado' };
    return { color: theme.palette.error.main, text: 'Alto' };
  };

  const marginStatus = getMarginStatus(result.breakdown.commitmentLevel);
  const isViable = result.breakdown.monthlyInstallment <= result.breakdown.remainingMargin;

  const getBorrowerTypeLabel = (type: string) => {
    switch (type) {
      case 'inss': return 'INSS (Aposentados/Pensionistas)';
      case 'servidor_publico': return 'Servidor Público';
      case 'clt_privado': return 'CLT Setor Privado';
      default: return type;
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Simulação de Empréstimo Consignado
      </Typography>

      {/* Status da simulação */}
      <Alert 
        severity={isViable ? "success" : "error"} 
        sx={{ mb: 3 }}
      >
        {isViable 
          ? "✅ Empréstimo APROVADO na simulação - Valores dentro da margem consignável"
          : "❌ Empréstimo NÃO APROVADO - Prestação excede a margem disponível"
        }
      </Alert>

      {/* Informações do solicitante */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          👤 Perfil do Solicitante
        </Typography>
        <Typography variant="body2">
          <strong>Categoria:</strong> {getBorrowerTypeLabel(borrowerType)}
        </Typography>
        <Typography variant="body2">
          <strong>Margem Permitida:</strong> {(MARGIN_LIMITS[borrowerType as keyof typeof MARGIN_LIMITS] * 100).toFixed(0)}%
        </Typography>
      </Box>

      {/* Análise da Margem */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 'bold' }}>
          📊 Análise da Margem Consignável
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.success.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Margem Total</Typography>
            <Typography variant="h6" color={theme.palette.success.dark}>
              {formatCurrency(result.breakdown.availableMargin)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.warning.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Margem Utilizada</Typography>
            <Typography variant="h6" color={theme.palette.warning.dark}>
              {formatCurrency(result.breakdown.usedMargin)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.info.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Margem Disponível</Typography>
            <Typography variant="h6" color={theme.palette.info.dark}>
              {formatCurrency(result.breakdown.remainingMargin)}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Detalhes do Empréstimo */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 'bold' }}>
          💰 Detalhes do Empréstimo
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Prestação Mensal:</Typography>
            <Typography fontWeight="bold" color={isViable ? theme.palette.success.dark : theme.palette.error.dark}>
              {formatCurrency(result.breakdown.monthlyInstallment)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Valor Total a Pagar:</Typography>
            <Typography fontWeight="bold">
              {formatCurrency(result.breakdown.totalAmount)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Total de Juros:</Typography>
            <Typography fontWeight="bold" color={theme.palette.error.main}>
              {formatCurrency(result.breakdown.totalInterest)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Taxa Efetiva Anual:</Typography>
            <Typography fontWeight="bold">
              {formatPercent(result.breakdown.effectiveRate)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Nível de Comprometimento */}
      <Box sx={{ 
        p: 2, 
        backgroundColor: marginStatus.color + '20', 
        borderRadius: 2,
        border: `2px solid ${marginStatus.color}`
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, textAlign: 'center' }}>
          📈 Nível de Comprometimento
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" fontWeight="bold" color={marginStatus.color}>
            {formatPercent(result.breakdown.commitmentLevel)}
          </Typography>
          <Typography variant="subtitle1" color={marginStatus.color} fontWeight="bold">
            {marginStatus.text}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, opacity: 0.8 }}>
          Percentual da margem consignável que será comprometida
        </Typography>
      </Box>

      {/* Dicas e Alertas */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          💡 Dicas Importantes
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2, lineHeight: 1.8 }}>
          <li>Mantenha sempre uma margem de segurança para emergências</li>
          <li>Compare taxas entre diferentes instituições financeiras</li>
          <li>Considere o prazo total e o impacto dos juros no orçamento</li>
          <li>Lembre-se: quanto maior o prazo, maior o valor total dos juros</li>
          {borrowerType === 'inss' && (
            <li>Para INSS: você pode usar até 45% da margem (35% empréstimo + 10% cartões)</li>
          )}
          {borrowerType === 'servidor_publico' && (
            <li>Servidores podem ter condições especiais através de convênios</li>
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

const ConsignadoCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: ConsignadoState = {
    borrowerType: 'inss',
    salary: '',
    existingLoanAmount: '',
    existingInstallment: '',
    requestedAmount: '',
    interestRate: '1,66',
    termMonths: '60',
    hasExistingLoan: false,
  };

  const validate = (state: ConsignadoState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.salary) {
      return { valid: false, error: 'Informe a renda mensal' };
    }

    if (!state.requestedAmount) {
      return { valid: false, error: 'Informe o valor solicitado' };
    }

    if (!state.interestRate) {
      return { valid: false, error: 'Informe a taxa de juros' };
    }

    if (!state.termMonths) {
      return { valid: false, error: 'Informe o prazo em meses' };
    }

    const salaryValid = validateNumberInput(state.salary, 1, 100000000);
    if (!salaryValid.valid) {
      return { valid: false, error: salaryValid.error };
    }

    const amountValid = validateNumberInput(state.requestedAmount, 1, 100000000);
    if (!amountValid.valid) {
      return { valid: false, error: amountValid.error };
    }

    const rate = parseFloat(state.interestRate.replace(',', '.'));
    if (isNaN(rate) || rate <= 0 || rate > 10) {
      return { valid: false, error: 'Taxa de juros deve estar entre 0,1% e 10%' };
    }

    const months = parseInt(state.termMonths);
    if (isNaN(months) || months < 1 || months > 96) {
      return { valid: false, error: 'Prazo deve estar entre 1 e 96 meses' };
    }

    if (state.hasExistingLoan && !state.existingInstallment) {
      return { valid: false, error: 'Informe o valor da prestação atual' };
    }

    return { valid: true };
  };

  const calculate = (state: ConsignadoState): ConsignadoResult | null => {
    return calculateConsignado(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof ConsignadoState, value: string | boolean) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    updateField(field, value);
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  // Atualizar taxa padrão quando muda o tipo de tomador
  const handleBorrowerTypeChange = useCallback((value: string) => {
    handleFieldUpdate('borrowerType', value);
    const defaultRate = AVERAGE_RATES[value as keyof typeof AVERAGE_RATES];
    handleFieldUpdate('interestRate', defaultRate.toString().replace('.', ','));
  }, [handleFieldUpdate]);

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Empréstimo Consignado"
        description="Simule seu empréstimo consignado para INSS, servidores públicos e CLT. Calcule a margem disponível, prestações e analise se o empréstimo cabe no seu orçamento."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Tipo de Tomador"
            value={state.borrowerType}
            onChange={(e) => handleBorrowerTypeChange(e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione sua categoria profissional"
          >
            <MenuItem value="inss">INSS (Aposentados/Pensionistas)</MenuItem>
            <MenuItem value="servidor_publico">Servidor Público</MenuItem>
            <MenuItem value="clt_privado">CLT Setor Privado</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.salary}
            handleChange={(value) => handleFieldUpdate('salary', value)}
            label="Renda Mensal (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Salário/benefício mensal líquido'}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasExistingLoan}
                onChange={(e) => handleFieldUpdate('hasExistingLoan', e.target.checked)}
              />
            }
            label="Já possui empréstimo consignado ativo"
          />
        </Grid>

        {state.hasExistingLoan && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                initialValue={state.existingInstallment}
                handleChange={(value) => handleFieldUpdate('existingInstallment', value)}
                label="Prestação Atual (R$)"
                helperText="Valor da prestação mensal do empréstimo atual"
              />
            </Grid>
          </>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.requestedAmount}
            handleChange={(value) => handleFieldUpdate('requestedAmount', value)}
            label="Valor Solicitado (R$)"
            helperText="Quanto você deseja solicitar de empréstimo"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Taxa de Juros (% ao mês)"
            value={state.interestRate}
            onChange={(value) => handleFieldUpdate('interestRate', value)}
            type="text"
            helperText="Taxa de juros mensal oferecida pela instituição"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Prazo (meses)"
            value={state.termMonths}
            onChange={(e) => handleFieldUpdate('termMonths', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Prazo para pagamento do empréstimo"
          >
            <MenuItem value="12">12 meses (1 ano)</MenuItem>
            <MenuItem value="24">24 meses (2 anos)</MenuItem>
            <MenuItem value="36">36 meses (3 anos)</MenuItem>
            <MenuItem value="48">48 meses (4 anos)</MenuItem>
            <MenuItem value="60">60 meses (5 anos)</MenuItem>
            <MenuItem value="72">72 meses (6 anos)</MenuItem>
            <MenuItem value="84">84 meses (7 anos)</MenuItem>
            <MenuItem value="96">96 meses (8 anos)</MenuItem>
          </TextField>
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <ConsignadoResultDisplay 
              result={result as ConsignadoResult} 
              borrowerType={state.borrowerType}
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

export default ConsignadoCalculator;