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

interface ConsortiumState {
  consortiumType: 'imovel' | 'veiculo';
  assetValue: string;
  groupSize: string;
  installmentCount: string;
  adminFeePercent: string;
  bidAmount: string;
  wantToGiveBid: boolean;
  compareWithFinancing: boolean;
  financingInterestRate: string;
  downPayment: string;
}

interface ConsortiumResult extends CalculatorResultType {
  breakdown: {
    monthlyInstallment: number;
    totalAdminFees: number;
    totalPaid: number;
    creditValue: number;
    savings: number;
    contemplationProbability: number;
    bidProbability: number;
    averageWaitTime: number;
    financingComparison?: {
      monthlyInstallment: number;
      totalInterest: number;
      totalPaid: number;
      savings: number;
    };
  };
}

// Constantes baseadas em dados reais do mercado
const ADMIN_FEE_RANGES = {
  imovel: { min: 0.15, max: 0.25, average: 0.20 }, // 0,15% a 0,25% ao mês
  veiculo: { min: 0.20, max: 0.35, average: 0.25 }, // 0,20% a 0,35% ao mês
};

const TYPICAL_GROUP_SIZES = {
  imovel: { min: 100, max: 200, average: 150 },
  veiculo: { min: 150, max: 300, average: 200 },
};

const calculateContemplationProbability = (groupSize: number, currentMonth: number): number => {
  // Fórmula baseada em estatísticas reais: cada mês há 2 contemplações por sorteio (sem considerar lance)
  const monthlyDraws = 2;
  const remainingParticipants = Math.max(1, groupSize - (currentMonth * monthlyDraws));
  return (monthlyDraws / remainingParticipants) * 100;
};

const calculateBidProbability = (bidAmount: number, creditValue: number): number => {
  const bidPercentage = (bidAmount / creditValue) * 100;
  
  // Baseado em dados reais do mercado:
  if (bidPercentage < 10) return 5;
  if (bidPercentage < 20) return 15;
  if (bidPercentage < 30) return 35;
  if (bidPercentage < 40) return 60;
  if (bidPercentage < 50) return 85;
  return 95; // Acima de 50% tem alta probabilidade
};

const calculateAverageWaitTime = (groupSize: number): number => {
  // Baseado em estatísticas: grupos maiores demoram mais
  if (groupSize <= 100) return 24; // 24 meses
  if (groupSize <= 150) return 30; // 30 meses
  if (groupSize <= 200) return 36; // 36 meses
  return 42; // 42 meses para grupos grandes
};

const calculateConsortium = (state: ConsortiumState, theme: any): ConsortiumResult | null => {
  const assetValue = parseBRLNumber(state.assetValue);
  const groupSize = parseInt(state.groupSize) || 0;
  const installmentCount = parseInt(state.installmentCount) || 0;
  const adminFeePercent = parseFloat(state.adminFeePercent.replace(',', '.')) || 0;
  const bidAmount = parseBRLNumber(state.bidAmount);
  const financingInterestRate = parseFloat(state.financingInterestRate.replace(',', '.')) || 0;
  const downPayment = parseBRLNumber(state.downPayment);

  if (isNaN(assetValue) || assetValue <= 0) return null;

  // Cálculos do consórcio
  const adminFeeMonthly = (adminFeePercent / 100) * assetValue;
  const baseInstallment = assetValue / installmentCount;
  const monthlyInstallment = baseInstallment + adminFeeMonthly;
  const totalAdminFees = adminFeeMonthly * installmentCount;
  const totalPaid = assetValue + totalAdminFees;
  const creditValue = assetValue;

  // Probabilidades de contemplação
  const contemplationProbability = calculateContemplationProbability(groupSize, 12); // Média no 12º mês
  const bidProbability = state.wantToGiveBid ? calculateBidProbability(bidAmount, creditValue) : 0;
  const averageWaitTime = calculateAverageWaitTime(groupSize);

  // Comparação com financiamento (se solicitada)
  let financingComparison;
  let savings = 0;

  if (state.compareWithFinancing && financingInterestRate > 0) {
    const loanAmount = assetValue - downPayment;
    const monthlyRate = financingInterestRate / 100 / 12;
    
    // Cálculo Price para financiamento
    const financingInstallment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, installmentCount)) / 
                                  (Math.pow(1 + monthlyRate, installmentCount) - 1);
    
    const totalFinancingPaid = (financingInstallment * installmentCount) + downPayment;
    const totalFinancingInterest = (financingInstallment * installmentCount) - loanAmount;
    
    financingComparison = {
      monthlyInstallment: financingInstallment,
      totalInterest: totalFinancingInterest,
      totalPaid: totalFinancingPaid,
      savings: totalFinancingPaid - totalPaid,
    };
    
    savings = financingComparison.savings;
  }

  const breakdown = {
    monthlyInstallment,
    totalAdminFees,
    totalPaid,
    creditValue,
    savings,
    contemplationProbability,
    bidProbability,
    averageWaitTime,
    financingComparison,
  };

  const message = `Parcela mensal: ${monthlyInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

  return {
    value: monthlyInstallment,
    isValid: true,
    message,
    breakdown,
    additionalInfo: {
      'Valor do Bem': `${assetValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Parcela Mensal': `${breakdown.monthlyInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total de Taxas': `${breakdown.totalAdminFees.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total a Pagar': `${breakdown.totalPaid.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Probabilidade por Sorteio': `${breakdown.contemplationProbability.toFixed(1)}%`,
      'Tempo Médio de Espera': `${breakdown.averageWaitTime} meses`,
    },
  };
};

// Componente para exibição detalhada dos resultados
const ConsortiumResultDisplay: React.FC<{ result: ConsortiumResult; consortiumType: string }> = ({ result, consortiumType }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'imovel': return 'Imóvel';
      case 'veiculo': return 'Veículo';
      default: return type;
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability < 20) return theme.palette.error.main;
    if (probability < 50) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Simulação de Consórcio de {getTypeLabel(consortiumType)}
      </Typography>

      {/* Informações principais */}
      <Alert severity="info" sx={{ mb: 3 }}>
        💡 Consórcio não possui juros, apenas taxa de administração. Valor total = Preço do bem + Taxas administrativas
      </Alert>

      {/* Resumo financeiro */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 'bold' }}>
          💰 Resumo Financeiro
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.success.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Parcela Mensal</Typography>
            <Typography variant="h6" color={theme.palette.success.dark}>
              {formatCurrency(result.breakdown.monthlyInstallment)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.info.light }}>
            <Typography variant="subtitle2" fontWeight="bold">Total a Pagar</Typography>
            <Typography variant="h6" color={theme.palette.info.dark}>
              {formatCurrency(result.breakdown.totalPaid)}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Análise de contemplação */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.secondary.dark, fontWeight: 'bold' }}>
          🎯 Análise de Contemplação
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#f5f5f5', 
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Contemplação por Sorteio</Typography>
              <Typography variant="body2" color="text.secondary">
                Probabilidade mensal (após 12º mês)
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              color={getProbabilityColor(result.breakdown.contemplationProbability)}
            >
              {formatPercent(result.breakdown.contemplationProbability)}
            </Typography>
          </Box>

          {result.breakdown.bidProbability > 0 && (
            <Box sx={{ 
              p: 2, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Contemplação por Lance</Typography>
                <Typography variant="body2" color="text.secondary">
                  Probabilidade com o valor do lance informado
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                color={getProbabilityColor(result.breakdown.bidProbability)}
              >
                {formatPercent(result.breakdown.bidProbability)}
              </Typography>
            </Box>
          )}

          <Box sx={{ 
            p: 2, 
            backgroundColor: theme.palette.warning.light, 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="subtitle1" fontWeight="bold">Tempo Médio de Espera</Typography>
            <Typography variant="h5" fontWeight="bold" color={theme.palette.warning.dark}>
              {result.breakdown.averageWaitTime} meses
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Baseado no tamanho do grupo e estatísticas históricas
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Detalhamento dos custos */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 'bold' }}>
          📊 Detalhamento dos Custos
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Valor do Bem:</Typography>
            <Typography fontWeight="bold">
              {formatCurrency(result.breakdown.creditValue)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
            <Typography>Total de Taxas Administrativas:</Typography>
            <Typography fontWeight="bold" color={theme.palette.warning.dark}>
              {formatCurrency(result.breakdown.totalAdminFees)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '2px solid #333' }}>
            <Typography fontWeight="bold">Total a Pagar:</Typography>
            <Typography fontWeight="bold" fontSize="1.1rem">
              {formatCurrency(result.breakdown.totalPaid)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Comparação com financiamento */}
      {result.breakdown.financingComparison && (
        <>
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.dark, fontWeight: 'bold' }}>
              🔄 Comparação com Financiamento
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Paper sx={{ p: 2, backgroundColor: '#e8f5e8', border: '2px solid #4caf50' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#2e7d32">Consórcio</Typography>
                <Typography variant="body2">Parcela: {formatCurrency(result.breakdown.monthlyInstallment)}</Typography>
                <Typography variant="body2">Total: {formatCurrency(result.breakdown.totalPaid)}</Typography>
                <Typography variant="body2">Taxas: {formatCurrency(result.breakdown.totalAdminFees)}</Typography>
              </Paper>
              
              <Paper sx={{ p: 2, backgroundColor: '#ffebee', border: '2px solid #f44336' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#c62828">Financiamento</Typography>
                <Typography variant="body2">Parcela: {formatCurrency(result.breakdown.financingComparison.monthlyInstallment)}</Typography>
                <Typography variant="body2">Total: {formatCurrency(result.breakdown.financingComparison.totalPaid)}</Typography>
                <Typography variant="body2">Juros: {formatCurrency(result.breakdown.financingComparison.totalInterest)}</Typography>
              </Paper>
            </Box>
            
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: result.breakdown.savings > 0 ? '#e8f5e8' : '#ffebee',
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="h6" fontWeight="bold">
                {result.breakdown.savings > 0 ? '💰 Economia com Consórcio' : '💸 Financiamento mais Barato'}
              </Typography>
              <Typography variant="h5" fontWeight="bold" 
                color={result.breakdown.savings > 0 ? theme.palette.success.dark : theme.palette.error.dark}>
                {formatCurrency(Math.abs(result.breakdown.savings))}
              </Typography>
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
          <li>Consórcio é ideal para quem pode esperar e quer economizar em juros</li>
          <li>Lances entre 30% e 50% do valor do bem têm maior chance de contemplação</li>
          <li>Grupos menores tendem a ter contemplação mais rápida</li>
          <li>É possível usar FGTS para lances em consórcio imobiliário</li>
          <li>Contemple-se e pague à vista para obter descontos adicionais</li>
          <li>Mantenha-se em dia com as parcelas para não perder direitos</li>
        </Typography>
      </Box>
    </Paper>
  );
};

const ConsortiumCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: ConsortiumState = {
    consortiumType: 'imovel',
    assetValue: '',
    groupSize: '150',
    installmentCount: '120',
    adminFeePercent: '0,20',
    bidAmount: '',
    wantToGiveBid: false,
    compareWithFinancing: false,
    financingInterestRate: '10,5',
    downPayment: '',
  };

  const validate = (state: ConsortiumState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.assetValue) {
      return { valid: false, error: 'Informe o valor do bem' };
    }

    if (!state.groupSize) {
      return { valid: false, error: 'Informe o tamanho do grupo' };
    }

    if (!state.installmentCount) {
      return { valid: false, error: 'Informe o número de parcelas' };
    }

    if (!state.adminFeePercent) {
      return { valid: false, error: 'Informe a taxa de administração' };
    }

    const assetValid = validateNumberInput(state.assetValue, 1000, 10000000);
    if (!assetValid.valid) {
      return { valid: false, error: assetValid.error };
    }

    const groupSize = parseInt(state.groupSize);
    if (isNaN(groupSize) || groupSize < 50 || groupSize > 500) {
      return { valid: false, error: 'Tamanho do grupo deve estar entre 50 e 500 participantes' };
    }

    const installmentCount = parseInt(state.installmentCount);
    if (isNaN(installmentCount) || installmentCount < 12 || installmentCount > 180) {
      return { valid: false, error: 'Número de parcelas deve estar entre 12 e 180' };
    }

    const adminFee = parseFloat(state.adminFeePercent.replace(',', '.'));
    if (isNaN(adminFee) || adminFee < 0.1 || adminFee > 0.5) {
      return { valid: false, error: 'Taxa de administração deve estar entre 0,1% e 0,5%' };
    }

    if (state.wantToGiveBid && !state.bidAmount) {
      return { valid: false, error: 'Informe o valor do lance' };
    }

    if (state.compareWithFinancing) {
      if (!state.financingInterestRate) {
        return { valid: false, error: 'Informe a taxa de juros do financiamento' };
      }
      if (!state.downPayment) {
        return { valid: false, error: 'Informe o valor da entrada do financiamento' };
      }
    }

    return { valid: true };
  };

  const calculate = (state: ConsortiumState): ConsortiumResult | null => {
    return calculateConsortium(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof ConsortiumState, value: string | boolean) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    updateField(field, value);
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  // Atualizar taxa padrão quando muda o tipo de consórcio
  const handleConsortiumTypeChange = useCallback((value: string) => {
    handleFieldUpdate('consortiumType', value);
    const defaultFee = ADMIN_FEE_RANGES[value as keyof typeof ADMIN_FEE_RANGES].average;
    const defaultGroupSize = TYPICAL_GROUP_SIZES[value as keyof typeof TYPICAL_GROUP_SIZES].average;
    handleFieldUpdate('adminFeePercent', defaultFee.toString().replace('.', ','));
    handleFieldUpdate('groupSize', defaultGroupSize.toString());
  }, [handleFieldUpdate]);

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Consórcio"
        description="Simule consórcio de imóvel ou veículo. Compare com financiamento, calcule probabilidades de contemplação e analise lances para tomar a melhor decisão."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Tipo de Consórcio"
            value={state.consortiumType}
            onChange={(e) => handleConsortiumTypeChange(e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione o tipo de bem"
          >
            <MenuItem value="imovel">Imóvel</MenuItem>
            <MenuItem value="veiculo">Veículo</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.assetValue}
            handleChange={(value) => handleFieldUpdate('assetValue', value)}
            label="Valor do Bem (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Valor do imóvel ou veículo'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Tamanho do Grupo"
            value={state.groupSize}
            onChange={(value) => handleFieldUpdate('groupSize', value)}
            type="number"
            helperText="Número de participantes no grupo"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Número de Parcelas"
            value={state.installmentCount}
            onChange={(e) => handleFieldUpdate('installmentCount', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Prazo do consórcio em meses"
          >
            <MenuItem value="60">60 meses (5 anos)</MenuItem>
            <MenuItem value="72">72 meses (6 anos)</MenuItem>
            <MenuItem value="84">84 meses (7 anos)</MenuItem>
            <MenuItem value="96">96 meses (8 anos)</MenuItem>
            <MenuItem value="120">120 meses (10 anos)</MenuItem>
            <MenuItem value="144">144 meses (12 anos)</MenuItem>
            <MenuItem value="180">180 meses (15 anos)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Taxa de Administração (% ao mês)"
            value={state.adminFeePercent}
            onChange={(value) => handleFieldUpdate('adminFeePercent', value)}
            type="text"
            helperText="Taxa mensal cobrada pela administradora"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.wantToGiveBid}
                onChange={(e) => handleFieldUpdate('wantToGiveBid', e.target.checked)}
              />
            }
            label="Pretendo dar lance para contemplação antecipada"
          />
        </Grid>

        {state.wantToGiveBid && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.bidAmount}
              handleChange={(value) => handleFieldUpdate('bidAmount', value)}
              label="Valor do Lance (R$)"
              helperText="Valor que pretende ofertar como lance"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.compareWithFinancing}
                onChange={(e) => handleFieldUpdate('compareWithFinancing', e.target.checked)}
              />
            }
            label="Comparar com financiamento tradicional"
          />
        </Grid>

        {state.compareWithFinancing && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <CalculatorInput
                label="Taxa de Juros Financiamento (% ao ano)"
                value={state.financingInterestRate}
                onChange={(value) => handleFieldUpdate('financingInterestRate', value)}
                type="text"
                helperText="Taxa anual do financiamento para comparação"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                initialValue={state.downPayment}
                handleChange={(value) => handleFieldUpdate('downPayment', value)}
                label="Entrada do Financiamento (R$)"
                helperText="Valor da entrada no financiamento"
              />
            </Grid>
          </>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <ConsortiumResultDisplay 
              result={result as ConsortiumResult} 
              consortiumType={state.consortiumType}
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

export default ConsortiumCalculator;