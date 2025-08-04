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

interface FinancingState {
  propertyValue: string;
  downPayment: string;
  interestRate: string;
  termYears: string;
  amortizationType: 'sac' | 'price';
  hasGovernmentProgram: boolean;
  programType: 'casa_verde_amarela' | 'minha_casa_minha_vida' | 'none';
  familyIncome: string;
  hasFgts: boolean;
  fgtsBalance: string;
  includeMipInsurance: boolean;
  includeDfiInsurance: boolean;
  bankType: 'caixa' | 'bb' | 'itau' | 'bradesco' | 'santander' | 'outros';
}

interface FinancingResult extends CalculatorResultType {
  breakdown: {
    loanAmount: number;
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
    firstInstallment: number;
    lastInstallment: number;
    mipInsurance: number;
    dfiInsurance: number;
    governmentSubsidy: number;
    effectiveRate: number;
    incomeCommitment: number;
    amortizationSchedule: Array<{
      installment: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  };
}

// Taxas atualizadas para 2025
const BANK_RATES = {
  caixa: { min: 11.29, max: 13.50 },
  bb: { min: 12.00, max: 14.00 },
  itau: { min: 12.19, max: 15.00 },
  bradesco: { min: 13.50, max: 16.00 },
  santander: { min: 12.50, max: 15.50 },
  outros: { min: 11.00, max: 16.00 }
};

// Faixas do programa Casa Verde e Amarela 2025
const GOVERNMENT_PROGRAMS = {
  casa_verde_amarela: {
    faixa1: { maxIncome: 2400, maxProperty: 200000, rate: 4.25, maxSubsidy: 47500 },
    faixa2: { maxIncome: 4400, maxProperty: 350000, rate: 7.66, maxSubsidy: 29000 },
    faixa3: { maxIncome: 8000, maxProperty: 350000, rate: 8.16, maxSubsidy: 15000 }
  },
  minha_casa_minha_vida: {
    faixa1: { maxIncome: 2400, maxProperty: 200000, rate: 4.50, maxSubsidy: 47500 },
    faixa2: { maxIncome: 4400, maxProperty: 350000, rate: 8.00, maxSubsidy: 29000 },
    faixa3: { maxIncome: 8000, maxProperty: 350000, rate: 8.50, maxSubsidy: 15000 },
    faixa4: { maxIncome: 12000, maxProperty: 500000, rate: 9.50, maxSubsidy: 5000 }
  }
};

// Cálculo do seguro MIP (baseado na idade média de 35 anos)
const calculateMipInsurance = (loanAmount: number, termYears: number): number => {
  const monthlyRate = 0.0006; // 0.06% ao mês (taxa média)
  return loanAmount * monthlyRate;
};

// Cálculo do seguro DFI
const calculateDfiInsurance = (propertyValue: number): number => {
  const annualRate = 0.0001337; // 0.01337% ao ano
  return (propertyValue * annualRate) / 12;
};

// Função para calcular subsídio governamental
const calculateGovernmentSubsidy = (
  familyIncome: number, 
  propertyValue: number, 
  programType: string
): { rate: number; subsidy: number } => {
  if (programType === 'none') return { rate: 0, subsidy: 0 };
  
  const program = GOVERNMENT_PROGRAMS[programType as keyof typeof GOVERNMENT_PROGRAMS];
  
  if (familyIncome <= program.faixa1.maxIncome && propertyValue <= program.faixa1.maxProperty) {
    return { rate: program.faixa1.rate, subsidy: program.faixa1.maxSubsidy };
  } else if (familyIncome <= program.faixa2.maxIncome && propertyValue <= program.faixa2.maxProperty) {
    return { rate: program.faixa2.rate, subsidy: program.faixa2.maxSubsidy };
  } else if (familyIncome <= program.faixa3.maxIncome && propertyValue <= program.faixa3.maxProperty) {
    return { rate: program.faixa3.rate, subsidy: program.faixa3.maxSubsidy };
  } else if (programType === 'minha_casa_minha_vida' && 'faixa4' in program && familyIncome <= program.faixa4.maxIncome && propertyValue <= program.faixa4.maxProperty) {
    return { rate: program.faixa4.rate, subsidy: program.faixa4.maxSubsidy };
  }
  
  return { rate: 0, subsidy: 0 };
};

// Cálculo SAC
const calculateSac = (
  loanAmount: number, 
  annualRate: number, 
  termMonths: number
): Array<{ installment: number; payment: number; principal: number; interest: number; balance: number }> => {
  const monthlyRate = annualRate / 12 / 100;
  const principalPayment = loanAmount / termMonths;
  const schedule = [];
  let balance = loanAmount;
  
  for (let i = 1; i <= termMonths; i++) {
    const interest = balance * monthlyRate;
    const payment = principalPayment + interest;
    balance -= principalPayment;
    
    schedule.push({
      installment: i,
      payment,
      principal: principalPayment,
      interest,
      balance
    });
  }
  
  return schedule;
};

// Cálculo PRICE
const calculatePrice = (
  loanAmount: number, 
  annualRate: number, 
  termMonths: number
): Array<{ installment: number; payment: number; principal: number; interest: number; balance: number }> => {
  const monthlyRate = annualRate / 12 / 100;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                        (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  const schedule = [];
  let balance = loanAmount;
  
  for (let i = 1; i <= termMonths; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    
    schedule.push({
      installment: i,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance)
    });
  }
  
  return schedule;
};

const calculateFinancing = (state: FinancingState): FinancingResult | null => {
  const propertyValue = parseBRLNumber(state.propertyValue);
  const downPayment = parseBRLNumber(state.downPayment);
  const interestRate = parseFloat(state.interestRate.replace(',', '.'));
  const termYears = parseInt(state.termYears);
  const familyIncome = parseBRLNumber(state.familyIncome);
  const fgtsBalance = parseBRLNumber(state.fgtsBalance);
  
  if (isNaN(propertyValue) || isNaN(downPayment) || isNaN(interestRate) || isNaN(termYears)) {
    return null;
  }

  const loanAmount = propertyValue - downPayment;
  const termMonths = termYears * 12;
  
  // Calcular subsídio governamental e taxa efetiva
  const governmentData = state.hasGovernmentProgram 
    ? calculateGovernmentSubsidy(familyIncome, propertyValue, state.programType)
    : { rate: 0, subsidy: 0 };
  
  const effectiveRate = governmentData.rate > 0 ? governmentData.rate : interestRate;
  
  // Calcular amortização
  const amortizationSchedule = state.amortizationType === 'sac' 
    ? calculateSac(loanAmount, effectiveRate, termMonths)
    : calculatePrice(loanAmount, effectiveRate, termMonths);
  
  const monthlyPayment = amortizationSchedule[0].payment;
  const firstInstallment = amortizationSchedule[0].payment;
  const lastInstallment = amortizationSchedule[amortizationSchedule.length - 1].payment;
  
  // Calcular seguros
  const mipInsurance = state.includeMipInsurance ? calculateMipInsurance(loanAmount, termYears) : 0;
  const dfiInsurance = state.includeDfiInsurance ? calculateDfiInsurance(propertyValue) : 0;
  
  // Totais
  const totalInterest = amortizationSchedule.reduce((sum, item) => sum + item.interest, 0);
  const totalAmount = loanAmount + totalInterest;
  
  // Comprometimento da renda
  const monthlyPaymentWithInsurance = monthlyPayment + mipInsurance + dfiInsurance;
  const incomeCommitment = familyIncome > 0 ? (monthlyPaymentWithInsurance / familyIncome) * 100 : 0;
  
  const breakdown = {
    loanAmount,
    monthlyPayment: monthlyPaymentWithInsurance,
    totalInterest,
    totalAmount,
    firstInstallment: firstInstallment + mipInsurance + dfiInsurance,
    lastInstallment: lastInstallment + mipInsurance + dfiInsurance,
    mipInsurance,
    dfiInsurance,
    governmentSubsidy: governmentData.subsidy,
    effectiveRate,
    incomeCommitment,
    amortizationSchedule: amortizationSchedule.slice(0, 12) // Primeiros 12 meses para exibição
  };

  return {
    value: monthlyPaymentWithInsurance,
    isValid: true,
    message: `Parcela mensal de ${monthlyPaymentWithInsurance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
    additionalInfo: {
      'Valor do Imóvel': `${propertyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Entrada': `${downPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Valor Financiado': `${loanAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Taxa de Juros Efetiva': `${effectiveRate.toFixed(2)}% a.a.`,
      'Parcela Mensal': `${monthlyPaymentWithInsurance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total de Juros': `${totalInterest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total a Pagar': `${totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Comprometimento da Renda': `${incomeCommitment.toFixed(1)}%`,
    },
  };
};

// Componente personalizado para mostrar resultados do financiamento
const FinancingResultDisplay: React.FC<{ result: FinancingResult; state: FinancingState }> = ({ result, state }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  const getIncomeCommitmentColor = (percentage: number) => {
    if (percentage <= 30) return theme.palette.success.main;
    if (percentage <= 35) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado do Financiamento Imobiliário
      </Typography>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Resumo" />
        <Tab label="Comparação SAC vs Price" />
        <Tab label="Cronograma" />
      </Tabs>

      {tabValue === 0 && (
        <>
          {/* Informações Principais */}
          <Box sx={{ 
            backgroundColor: theme.palette.primary.light, 
            p: 3, 
            borderRadius: 2,
            mb: 3
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
              🏠 Resumo do Financiamento
            </Typography>
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Valor do Imóvel:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(parseBRLNumber(state.propertyValue))}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Entrada:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(parseBRLNumber(state.downPayment))}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Valor Financiado:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(result.breakdown.loanAmount)}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Sistema:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {state.amortizationType.toUpperCase()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Taxa Efetiva:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatPercentage(result.breakdown.effectiveRate)} a.a.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Prazo:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {state.termYears} anos
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Parcela e Comprometimento */}
          <Box sx={{ 
            backgroundColor: '#e8f5e8', 
            p: 3, 
            borderRadius: 2,
            border: `2px solid ${theme.palette.success.main}`,
            mb: 3
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
              💳 Parcela Mensal
            </Typography>
            
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.success.dark,
                mb: 1
              }}>
                {formatCurrency(result.breakdown.monthlyPayment)}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="caption" display="block">Primeira Parcela</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(result.breakdown.firstInstallment)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" display="block">Última Parcela</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(result.breakdown.lastInstallment)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {state.familyIncome && (
              <Box sx={{ 
                backgroundColor: 'white', 
                p: 2, 
                borderRadius: 1,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Comprometimento da Renda Familiar
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: getIncomeCommitmentColor(result.breakdown.incomeCommitment)
                  }}
                >
                  {formatPercentage(result.breakdown.incomeCommitment)}
                </Typography>
                <Typography variant="caption" display="block">
                  {result.breakdown.incomeCommitment <= 30 ? 
                    '✅ Comprometimento ideal (até 30%)' :
                    result.breakdown.incomeCommitment <= 35 ? 
                    '⚠️ Comprometimento moderado (até 35%)' :
                    '❌ Comprometimento alto (acima de 35%)'
                  }
                </Typography>
              </Box>
            )}
          </Box>

          {/* Seguros */}
          {(result.breakdown.mipInsurance > 0 || result.breakdown.dfiInsurance > 0) && (
            <Box sx={{ 
              backgroundColor: '#fff3e0', 
              p: 3, 
              borderRadius: 2,
              mb: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                🛡️ Seguros Obrigatórios
              </Typography>
              
              {result.breakdown.mipInsurance > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Seguro MIP (Morte e Invalidez):</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(result.breakdown.mipInsurance)}/mês
                  </Typography>
                </Box>
              )}
              
              {result.breakdown.dfiInsurance > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1">Seguro DFI (Danos Físicos ao Imóvel):</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(result.breakdown.dfiInsurance)}/mês
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Programas Governamentais */}
          {result.breakdown.governmentSubsidy > 0 && (
            <Box sx={{ 
              backgroundColor: '#e3f2fd', 
              p: 3, 
              borderRadius: 2,
              mb: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                🏛️ Benefícios Governamentais
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body1">Programa:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {state.programType === 'casa_verde_amarela' ? 'Casa Verde e Amarela' : 'Minha Casa Minha Vida'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body1">Subsídio Máximo:</Typography>
                <Typography variant="body1" fontWeight="bold" color={theme.palette.success.dark}>
                  {formatCurrency(result.breakdown.governmentSubsidy)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body1">Taxa Subsidiada:</Typography>
                <Typography variant="body1" fontWeight="bold" color={theme.palette.success.dark}>
                  {formatPercentage(result.breakdown.effectiveRate)} a.a.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Totais */}
          <Box sx={{ 
            backgroundColor: '#f5f5f5',
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.grey[400]}`
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📊 Resumo Financeiro
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body1">Total de Juros:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatCurrency(result.breakdown.totalInterest)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body1">Total a Pagar:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatCurrency(result.breakdown.totalAmount)}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="h6" fontWeight="bold">Custo Total do Imóvel:</Typography>
              <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.dark}>
                {formatCurrency(result.breakdown.totalAmount + parseBRLNumber(state.downPayment))}
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📈 Comparação: SAC vs Price
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, backgroundColor: '#e8f5e8' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  SAC (Sistema Atual)
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Parcelas decrescentes • Amortização constante
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography>Primeira parcela:</Typography>
                  <Typography fontWeight="bold">
                    {formatCurrency(result.breakdown.firstInstallment)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography>Última parcela:</Typography>
                  <Typography fontWeight="bold">
                    {formatCurrency(result.breakdown.lastInstallment)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2, backgroundColor: '#fff3e0' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  PRICE
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Parcelas fixas • Amortização crescente
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Simule alterando o sistema para ver a comparação
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📅 Cronograma de Pagamento (Primeiros 12 meses)
          </Typography>
          
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: theme.palette.grey[100] }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Parcela</th>
                  <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Valor</th>
                  <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Amortização</th>
                  <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Juros</th>
                  <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.amortizationSchedule.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : theme.palette.grey[50] }}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.installment}ª</td>
                    <td style={{ padding: '8px', textAlign: 'right', border: '1px solid #ddd' }}>
                      {formatCurrency(item.payment)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', border: '1px solid #ddd' }}>
                      {formatCurrency(item.principal)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', border: '1px solid #ddd' }}>
                      {formatCurrency(item.interest)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', border: '1px solid #ddd' }}>
                      {formatCurrency(item.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

const FinancingCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: FinancingState = {
    propertyValue: '',
    downPayment: '',
    interestRate: '12,00',
    termYears: '30',
    amortizationType: 'sac',
    hasGovernmentProgram: false,
    programType: 'none',
    familyIncome: '',
    hasFgts: false,
    fgtsBalance: '',
    includeMipInsurance: true,
    includeDfiInsurance: true,
    bankType: 'caixa',
  };

  const validate = (state: FinancingState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.propertyValue) {
      return { valid: false, error: 'Informe o valor do imóvel' };
    }
    if (!state.downPayment) {
      return { valid: false, error: 'Informe o valor da entrada' };
    }
    if (!state.interestRate) {
      return { valid: false, error: 'Informe a taxa de juros' };
    }
    if (!state.termYears) {
      return { valid: false, error: 'Informe o prazo em anos' };
    }

    const propertyValue = parseBRLNumber(state.propertyValue);
    const downPayment = parseBRLNumber(state.downPayment);
    const interestRate = parseFloat(state.interestRate.replace(',', '.'));
    const termYears = parseInt(state.termYears);

    const propertyValid = validateNumberInput(state.propertyValue, 50000, 50000000);
    if (!propertyValid.valid) {
      return { valid: false, error: propertyValid.error };
    }

    if (downPayment >= propertyValue) {
      return { valid: false, error: 'A entrada deve ser menor que o valor do imóvel' };
    }

    if (downPayment < propertyValue * 0.1) {
      return { valid: false, error: 'A entrada mínima deve ser 10% do valor do imóvel' };
    }

    if (interestRate < 1 || interestRate > 30) {
      return { valid: false, error: 'Taxa de juros deve estar entre 1% e 30% ao ano' };
    }

    if (termYears < 1 || termYears > 35) {
      return { valid: false, error: 'Prazo deve estar entre 1 e 35 anos' };
    }

    return { valid: true };
  };

  const calculate = (state: FinancingState): FinancingResult | null => {
    return calculateFinancing(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof FinancingState, value: string | boolean) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    updateField(field, value);
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  // Atualizar taxa sugerida baseada no banco selecionado
  const handleBankChange = useCallback((bankType: string) => {
    const bankRate = BANK_RATES[bankType as keyof typeof BANK_RATES];
    const suggestedRate = ((bankRate.min + bankRate.max) / 2).toFixed(2);
    handleFieldUpdate('bankType', bankType);
    handleFieldUpdate('interestRate', suggestedRate.replace('.', ','));
  }, [handleFieldUpdate]);

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Financiamento Imobiliário"
        description="Simule seu financiamento imobiliário com sistemas SAC e Price, incluindo seguros obrigatórios, programas governamentais e análise de comprometimento de renda."
      />

      <Grid container spacing={3}>
        {/* Dados do Imóvel */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            🏠 Dados do Imóvel
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.propertyValue}
            handleChange={(value) => handleFieldUpdate('propertyValue', value)}
            label="Valor do Imóvel (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Valor total do imóvel'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.downPayment}
            handleChange={(value) => handleFieldUpdate('downPayment', value)}
            label="Entrada (R$)"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Mínimo 10% do valor do imóvel'}
          />
        </Grid>

        {/* Dados do Financiamento */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
            💰 Dados do Financiamento
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Banco/Instituição"
            value={state.bankType}
            onChange={(e) => handleBankChange(e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Taxas atualizadas para 2025"
          >
            <MenuItem value="caixa">Caixa Econômica Federal</MenuItem>
            <MenuItem value="bb">Banco do Brasil</MenuItem>
            <MenuItem value="itau">Itaú</MenuItem>
            <MenuItem value="bradesco">Bradesco</MenuItem>
            <MenuItem value="santander">Santander</MenuItem>
            <MenuItem value="outros">Outros Bancos</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Taxa de Juros (% ao ano)"
            value={state.interestRate}
            onChange={(value) => handleFieldUpdate('interestRate', value)}
            helperText={`Faixa ${state.bankType}: ${BANK_RATES[state.bankType as keyof typeof BANK_RATES].min}% - ${BANK_RATES[state.bankType as keyof typeof BANK_RATES].max}%`}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Sistema de Amortização"
            value={state.amortizationType}
            onChange={(e) => handleFieldUpdate('amortizationType', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="SAC: parcelas decrescentes | Price: parcelas fixas"
          >
            <MenuItem value="sac">SAC - Sistema de Amortização Constante</MenuItem>
            <MenuItem value="price">Price - Tabela Price</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Prazo (anos)"
            value={state.termYears}
            onChange={(value) => handleFieldUpdate('termYears', value)}
            type="number"
            helperText="Prazo máximo: 35 anos"
          />
        </Grid>

        {/* Renda Familiar */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
            👨‍👩‍👧‍👦 Renda Familiar
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.familyIncome}
            handleChange={(value) => handleFieldUpdate('familyIncome', value)}
            label="Renda Familiar Bruta (R$)"
            helperText="Soma de todas as rendas da família"
          />
        </Grid>

        {/* Programas Governamentais */}
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasGovernmentProgram}
                onChange={(e) => handleFieldUpdate('hasGovernmentProgram', e.target.checked)}
              />
            }
            label="Participar de programa habitacional do governo"
          />
        </Grid>

        {state.hasGovernmentProgram && (
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Programa Habitacional"
              value={state.programType}
              onChange={(e) => handleFieldUpdate('programType', e.target.value)}
              select
              fullWidth
              variant="standard"
              helperText="Programas com juros subsidiados"
            >
              <MenuItem value="casa_verde_amarela">Casa Verde e Amarela</MenuItem>
              <MenuItem value="minha_casa_minha_vida">Minha Casa Minha Vida</MenuItem>
            </TextField>
          </Grid>
        )}

        {/* FGTS */}
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasFgts}
                onChange={(e) => handleFieldUpdate('hasFgts', e.target.checked)}
              />
            }
            label="Usar FGTS na entrada ou amortização"
          />
        </Grid>

        {state.hasFgts && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              initialValue={state.fgtsBalance}
              handleChange={(value) => handleFieldUpdate('fgtsBalance', value)}
              label="Saldo FGTS Disponível (R$)"
              helperText="Valor disponível para uso habitacional"
            />
          </Grid>
        )}

        {/* Seguros */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
            🛡️ Seguros Obrigatórios
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.includeMipInsurance}
                onChange={(e) => handleFieldUpdate('includeMipInsurance', e.target.checked)}
              />
            }
            label="Incluir Seguro MIP (Morte e Invalidez Permanente)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.includeDfiInsurance}
                onChange={(e) => handleFieldUpdate('includeDfiInsurance', e.target.checked)}
              />
            }
            label="Incluir Seguro DFI (Danos Físicos ao Imóvel)"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <FinancingResultDisplay result={result as FinancingResult} state={state} />
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

export default FinancingCalculator;