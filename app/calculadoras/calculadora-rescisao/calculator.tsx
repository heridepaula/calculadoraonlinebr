'use client';

import React from 'react';
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

interface RescisaoState {
  salary: string;
  startDate: string;
  endDate: string;
  dismissalType: 'sem_justa_causa' | 'com_justa_causa' | 'pedido_demissao' | 'acordo_mutuo';
  workedVacationDays: string;
  noticeType: 'trabalhado' | 'indenizado' | 'dispensado';
  dependents: string;
  hasVacationAcquired: boolean;
  vacationDaysVested: string;
}

interface RescisaoResult extends CalculatorResultType {
  breakdown: {
    saldoSalario: number;
    feriasProporcionais: number;
    feriasVencidas: number;
    tercoFerias: number;
    decimoTerceiro: number;
    avisoProvio: number;
    salarioFamilia: number;
    fgtsDepositos: number;
    fgtsRescisao: number;
    multaFgts: number;
    inss: number;
    ir: number;
    totalBruto: number;
    totalDescontos: number;
    totalLiquido: number;
  };
}

// Função auxiliar para calcular diferença em meses exatos
const calculateMonthsDifference = (startDate: Date, endDate: Date) => {
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months += endDate.getMonth() - startDate.getMonth();
  
  // Adicionar proporção dos dias
  if (endDate.getDate() >= startDate.getDate()) {
    months += (endDate.getDate() - startDate.getDate()) / 30;
  } else {
    months -= 1;
    const daysInPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    months += (daysInPrevMonth - startDate.getDate() + endDate.getDate()) / 30;
  }
  
  return Math.max(0, months);
};

// Função para calcular INSS
const calculateINSS = (baseValue: number) => {
  if (baseValue <= 1412.00) return baseValue * 0.075;
  if (baseValue <= 2666.68) return baseValue * 0.09 - 21.18;
  if (baseValue <= 4000.03) return baseValue * 0.12 - 101.18;
  if (baseValue <= 7786.02) return baseValue * 0.14 - 181.18;
  return 908.85; // Teto do INSS em 2024
};

// Função para calcular Imposto de Renda
const calculateIR = (baseValue: number, dependents: number) => {
  const deducaoDependente = dependents * 189.59;
  const baseCalculo = baseValue - deducaoDependente;
  
  if (baseCalculo <= 2259.20) return 0;
  if (baseCalculo <= 2826.65) return baseCalculo * 0.075 - 169.44;
  if (baseCalculo <= 3751.05) return baseCalculo * 0.15 - 381.44;
  if (baseCalculo <= 4664.68) return baseCalculo * 0.225 - 662.77;
  return baseCalculo * 0.275 - 896.00;
};

const calculateRescisao = (state: RescisaoState, theme: any): RescisaoResult | null => {
  const salary = parseBRLNumber(state.salary);
  const startDate = new Date(state.startDate);
  const endDate = new Date(state.endDate);
  const dependents = parseInt(state.dependents) || 0;
  const vacationDaysVested = parseInt(state.vacationDaysVested) || 0;
  
  if (isNaN(salary) || !startDate || !endDate) return null;

  // Constantes
  const SALARIO_FAMILIA_VALOR = 65.00;
  const SALARIO_FAMILIA_LIMITE = 1906.04;
  const FGTS_RATE = 0.08;

  // Calcular tempo de trabalho
  const totalMonthsWorked = calculateMonthsDifference(startDate, endDate);
  const daysInRescissionMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate();
  const workedDaysInMonth = endDate.getDate();
  
  // Calcular período aquisitivo atual (meses no ano atual)
  const currentYearStart = new Date(endDate.getFullYear(), 0, 1);
  const monthsInCurrentPeriod = Math.min(12, calculateMonthsDifference(
    startDate > currentYearStart ? startDate : currentYearStart, 
    endDate
  ));

  // 1. Saldo de Salário
  const saldoSalario = (salary / daysInRescissionMonth) * workedDaysInMonth;

  // 2. Férias Vencidas (se houver)
  const feriasVencidas = state.hasVacationAcquired ? (salary / 30) * vacationDaysVested : 0;

  // 3. Férias Proporcionais
  const feriasProporcionais = (salary / 12) * monthsInCurrentPeriod;

  // 4. 1/3 das Férias (sobre vencidas + proporcionais)
  const tercoFerias = (feriasVencidas + feriasProporcionais) / 3;

  // 5. 13º Salário Proporcional
  const decimoTerceiro = (salary / 12) * monthsInCurrentPeriod;

  // 6. Aviso Prévio
  let avisoProvio = 0;
  if (state.dismissalType === 'sem_justa_causa' && state.noticeType !== 'dispensado') {
    avisoProvio = salary;
  } else if (state.dismissalType === 'acordo_mutuo') {
    avisoProvio = salary / 2;
  }

  // 7. Salário Família
  let salarioFamilia = 0;
  if (salary <= SALARIO_FAMILIA_LIMITE && dependents > 0) {
    const salarioFamiliaIntegral = SALARIO_FAMILIA_VALOR * dependents;
    salarioFamilia = (salarioFamiliaIntegral / daysInRescissionMonth) * workedDaysInMonth;
  }

  // 8. FGTS - Depósitos acumulados durante o período
  const fgtsDepositos = salary * totalMonthsWorked * FGTS_RATE;
  
  // 9. FGTS - Sobre verbas rescisórias
  const fgtsRescisao = (avisoProvio + decimoTerceiro) * FGTS_RATE;
  
  const fgtsTotal = fgtsDepositos + fgtsRescisao;

  // 10. Multa FGTS
  let multaFgts = 0;
  if (state.dismissalType === 'sem_justa_causa') {
    multaFgts = fgtsTotal * 0.4; // 40%
  } else if (state.dismissalType === 'acordo_mutuo') {
    multaFgts = fgtsTotal * 0.2; // 20%
  }

  // Ajustar valores conforme tipo de demissão
  let finalSaldo = saldoSalario;
  let finalFeriasVencidas = feriasVencidas;
  let finalFeriasProporcionais = feriasProporcionais;
  let finalTerco = tercoFerias;
  let finalDecimo = decimoTerceiro;
  let finalAviso = avisoProvio;
  let finalSalarioFamilia = salarioFamilia;
  let finalMultaFgts = multaFgts;

  if (state.dismissalType === 'com_justa_causa') {
    finalFeriasProporcionais = 0;
    finalTerco = feriasVencidas / 3; // Apenas 1/3 das vencidas
    finalDecimo = 0;
    finalAviso = 0;
    finalSalarioFamilia = 0;
    finalMultaFgts = 0;
  } else if (state.dismissalType === 'pedido_demissao') {
    finalAviso = 0;
    finalMultaFgts = 0;
  }

  // Total bruto
  const totalBruto = finalSaldo + finalFeriasVencidas + finalFeriasProporcionais + 
                     finalTerco + finalDecimo + finalAviso + finalSalarioFamilia + finalMultaFgts;

  // Calcular descontos
  const baseINSS = finalSaldo + finalAviso + finalDecimo;
  const inss = calculateINSS(baseINSS);
  
  const baseIR = totalBruto - inss;
  const ir = Math.max(0, calculateIR(baseIR, dependents));

  const totalDescontos = inss + ir;
  const totalLiquido = totalBruto - totalDescontos;

  const breakdown = {
    saldoSalario: finalSaldo,
    feriasVencidas: finalFeriasVencidas,
    feriasProporcionais: finalFeriasProporcionais,
    tercoFerias: finalTerco,
    decimoTerceiro: finalDecimo,
    avisoProvio: finalAviso,
    salarioFamilia: finalSalarioFamilia,
    fgtsDepositos,
    fgtsRescisao,
    multaFgts: finalMultaFgts,
    inss,
    ir,
    totalBruto,
    totalDescontos,
    totalLiquido
  };

  return {
    value: totalLiquido,
    isValid: true,
    message: `Total líquido a receber: ${totalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
    additionalInfo: {
      'Saldo de Salário': `${breakdown.saldoSalario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Férias Vencidas': `${breakdown.feriasVencidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Férias Proporcionais': `${breakdown.feriasProporcionais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      '1/3 das Férias': `${breakdown.tercoFerias.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      '13º Salário': `${breakdown.decimoTerceiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Aviso Prévio': `${breakdown.avisoProvio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Salário Família': `${breakdown.salarioFamilia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'FGTS Depósitos': `${breakdown.fgtsDepositos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'FGTS Rescisão': `${breakdown.fgtsRescisao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Multa FGTS': `${breakdown.multaFgts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Bruto': `${breakdown.totalBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'INSS': `- ${breakdown.inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Imposto de Renda': `- ${breakdown.ir.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      'Total Descontos': `- ${breakdown.totalDescontos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    },
  };
};

// Componente personalizado para mostrar resultados da rescisão
const RescisaoResultDisplay: React.FC<{ result: RescisaoResult }> = ({ result }) => {
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
        Resultado da Rescisão Trabalhista
      </Typography>

      {/* Verbas Rescisórias */}
      <ResultSection
        title="💰 Verbas Rescisórias"
        color={theme.palette.success.dark}
        items={[
          { label: 'Saldo de Salário', value: result.breakdown.saldoSalario },
          { label: 'Férias Vencidas', value: result.breakdown.feriasVencidas },
          { label: 'Férias Proporcionais', value: result.breakdown.feriasProporcionais },
          { label: '1/3 das Férias', value: result.breakdown.tercoFerias },
          { label: '13º Salário Proporcional', value: result.breakdown.decimoTerceiro },
          { label: 'Aviso Prévio', value: result.breakdown.avisoProvio },
          { label: 'Salário Família', value: result.breakdown.salarioFamilia },
        ]}
      />

      <Divider sx={{ my: 2 }} />

      {/* FGTS */}
      <ResultSection
        title="🏦 FGTS e Multa"
        color={theme.palette.info.dark}
        items={[
          { label: 'FGTS - Depósitos Acumulados', value: result.breakdown.fgtsDepositos },
          { label: 'FGTS - Sobre Verbas Rescisórias', value: result.breakdown.fgtsRescisao },
          { label: 'Multa FGTS (40%)', value: result.breakdown.multaFgts },
        ]}
      />

      <Divider sx={{ my: 2 }} />

      {/* Descontos */}
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
          { label: 'Imposto de Renda', value: result.breakdown.ir },
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

      {/* Totais */}
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
            {formatCurrency(result.breakdown.totalBruto)}
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
            {formatCurrencyNegative(result.breakdown.totalDescontos)}
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
            Total Líquido a Receber:
          </Typography>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.primary.dark,
            fontSize: '1.3rem'
          }}>
            {formatCurrency(result.breakdown.totalLiquido)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total FGTS + Rescisão */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.light, 
        p: 2, 
        borderRadius: 2,
        mt: 2
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, textAlign: 'center' }}>
          💼 Total Disponível (FGTS + Rescisão)
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">
            FGTS Total + Rescisão Líquida:
          </Typography>
          <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.dark}>
            {formatCurrency(
              result.breakdown.fgtsDepositos + 
              result.breakdown.fgtsRescisao + 
              result.breakdown.multaFgts + 
              result.breakdown.totalLiquido
            )}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, opacity: 0.8 }}>
          Este é o valor total que você terá disponível (saque do FGTS + valor líquido da rescisão)
        </Typography>
      </Box>
    </Paper>
  );
};

const RescisaoCalculator: React.FC = () => {
  const theme = useTheme();

  const initialState: RescisaoState = {
    salary: '',
    startDate: '',
    endDate: '',
    dismissalType: 'sem_justa_causa',
    workedVacationDays: '',
    noticeType: 'indenizado',
    dependents: '0',
    hasVacationAcquired: false,
    vacationDaysVested: '0',
  };

  const validate = (state: RescisaoState): ValidationResult => {
    const salaryValid = validateNumberInput(state.salary, 1, 1000000);

    if (!salaryValid.valid) {
      return { valid: false, error: salaryValid.error };
    }
    if (!state.salary) {
      return { valid: false, error: 'Informe o salário' };
    }
    if (!state.startDate) {
      return { valid: false, error: 'Informe a data de admissão' };
    }
    if (!state.endDate) {
      return { valid: false, error: 'Informe a data de demissão' };
    }

    const startDate = new Date(state.startDate);
    const endDate = new Date(state.endDate);
    
    if (endDate <= startDate) {
      return { valid: false, error: 'A data de demissão deve ser posterior à data de admissão' };
    }

    return { valid: true };
  };

  const calculate = (state: RescisaoState): RescisaoResult | null => {
    return calculateRescisao(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Rescisão Trabalhista"
        description="Calcule os valores da rescisão trabalhista de acordo com a CLT, incluindo saldo de salário, férias, 13º salário, aviso prévio e FGTS."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.salary}
            handleChange={(value) => updateField('salary', value)}
            label="Salário (R$)"
            error={!!validation.error}
            helperText={validation.error || 'Informe o salário atual'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Tipo de Demissão"
            value={state.dismissalType}
            onChange={(e) => updateField('dismissalType', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Selecione o tipo de demissão"
          >
            <MenuItem value="sem_justa_causa">Demissão sem justa causa</MenuItem>
            <MenuItem value="com_justa_causa">Demissão com justa causa</MenuItem>
            <MenuItem value="pedido_demissao">Pedido de demissão</MenuItem>
            <MenuItem value="acordo_mutuo">Acordo mútuo</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Data de Admissão"
            value={state.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            type="date"
            fullWidth
            variant="standard"
            helperText="Data de início do contrato"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Data de Demissão"
            value={state.endDate}
            onChange={(e) => updateField('endDate', e.target.value)}
            type="date"
            fullWidth
            variant="standard"
            helperText="Data de término do contrato"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Aviso Prévio"
            value={state.noticeType}
            onChange={(e) => updateField('noticeType', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText="Como será o aviso prévio"
          >
            <MenuItem value="trabalhado">Trabalhado</MenuItem>
            <MenuItem value="indenizado">Indenizado</MenuItem>
            <MenuItem value="dispensado">Dispensado</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Número de Dependentes"
            value={state.dependents}
            onChange={(value) => updateField('dependents', value)}
            type="number"
            helperText="Filhos menores de 14 anos ou com deficiência"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.hasVacationAcquired}
                onChange={(e) => updateField('hasVacationAcquired', e.target.checked)}
              />
            }
            label="Possui férias vencidas (não gozadas de períodos anteriores)"
          />
        </Grid>

        {state.hasVacationAcquired && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Dias de Férias Vencidas"
              value={state.vacationDaysVested}
              onChange={(value) => updateField('vacationDaysVested', value)}
              type="number"
              helperText="Quantidade de dias de férias não gozadas"
            />
          </Grid>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <RescisaoResultDisplay result={result as RescisaoResult} />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <CalculatorActions
            onClear={handleClear}
            layout="clear-only"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RescisaoCalculator;