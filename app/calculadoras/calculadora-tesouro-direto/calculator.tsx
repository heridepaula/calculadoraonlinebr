'use client';

import React, { useState, useCallback } from 'react';
import { Grid, MenuItem, TextField, Box, Typography, Paper, Divider, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber, validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import CurrencyInput from '@/components/CurrencyInput';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TesouroDiretoState {
  bondType: 'ltn' | 'lft' | 'ntn-b' | 'ntn-b-cupom' | 'ntn-f';
  investmentAmount: string;
  maturityDate: string;
  purchaseDate: string;
  annualRate: string;
  ipca: string;
  selic: string;
  administrationFee: string;
}

interface TesouroDiretoResult extends CalculatorResultType {
  breakdown: {
    investedAmount: number;
    grossValue: number;
    netValue: number;
    grossReturn: number;
    netReturn: number;
    irTax: number;
    iofTax: number;
    administrationFee: number;
    nominalValue: number;
    accumulatedIndex: number;
    annualYield: number;
    realYield: number;
    totalDays: number;
    totalCoupons?: number;
    couponPayments?: Array<{
      date: string;
      grossCoupon: number;
      netCoupon: number;
      accumulatedIpca: number;
    }>;
    chartData: Array<{
      period: string;
      accumulated: number;
      grossValue: number;
      netValue: number;
    }>;
  };
}

// Current market rates for 2025
const CURRENT_SELIC = 15.0;
const CURRENT_IPCA = 4.87;
const CURRENT_LTN_RATE = 14.5;
const CURRENT_NTN_RATE = 6.2;

// Tax calculation functions
const calculateIRRate = (daysToMaturity: number): number => {
  if (daysToMaturity <= 180) return 22.5;
  if (daysToMaturity <= 360) return 20.0;
  if (daysToMaturity <= 720) return 17.5;
  return 15.0;
};

const calculateIOF = (daysToMaturity: number, returnAmount: number): number => {
  if (daysToMaturity >= 30) return 0;
  const iofRate = Math.max(0, (30 - daysToMaturity) / 30) * 0.01;
  return returnAmount * iofRate;
};

// Business days calculation (approximation: 252 business days per year)
const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  // Approximate conversion: 252 business days per 365 calendar days
  return Math.round(totalDays * (252 / 365));
};

// LTN (Tesouro Prefixado) calculation
const calculateLTN = (
  investmentAmount: number,
  annualRate: number,
  businessDays: number,
  administrationFee: number
): any => {
  const faceValue = 1000; // LTN face value is always R$ 1,000
  const dailyRate = Math.pow(1 + annualRate / 100, 1 / 252) - 1;
  const accumulatedFactor = Math.pow(1 + dailyRate, businessDays);
  
  // Present value calculation (purchase price per unit)
  const unitPrice = faceValue / accumulatedFactor;
  const numberOfUnits = investmentAmount / unitPrice;
  
  // Gross value at maturity
  const grossValue = numberOfUnits * faceValue;
  const grossReturn = grossValue - investmentAmount;
  
  // Administration fee
  const adminFeeAmount = grossReturn * (administrationFee / 100);
  
  // Net value after fees and taxes
  const netValue = grossValue - adminFeeAmount;
  const netReturn = netValue - investmentAmount;
  
  return {
    grossValue,
    netValue,
    grossReturn,
    netReturn,
    administrationFee: adminFeeAmount,
    nominalValue: faceValue,
    accumulatedIndex: accumulatedFactor,
    unitPrice,
    numberOfUnits
  };
};

// LFT (Tesouro Selic) calculation
const calculateLFT = (
  investmentAmount: number,
  selicRate: number,
  businessDays: number,
  administrationFee: number
): any => {
  const baseVNA = 1000; // Base VNA value
  const dailySelicRate = Math.pow(1 + selicRate / 100, 1 / 252) - 1;
  const accumulatedFactor = Math.pow(1 + dailySelicRate, businessDays);
  
  // VNA projection
  const projectedVNA = baseVNA * accumulatedFactor;
  
  // Gross value calculation
  const grossValue = investmentAmount * accumulatedFactor;
  const grossReturn = grossValue - investmentAmount;
  
  // Administration fee
  const adminFeeAmount = grossReturn * (administrationFee / 100);
  
  // Net value
  const netValue = grossValue - adminFeeAmount;
  const netReturn = netValue - investmentAmount;
  
  return {
    grossValue,
    netValue,
    grossReturn,
    netReturn,
    administrationFee: adminFeeAmount,
    nominalValue: projectedVNA,
    accumulatedIndex: accumulatedFactor,
    currentVNA: baseVNA,
    projectedVNA
  };
};

// NTN-B (Tesouro IPCA+) calculation
const calculateNTNB = (
  investmentAmount: number,
  realRate: number,
  ipcaRate: number,
  businessDays: number,
  administrationFee: number
): any => {
  const baseVNA = 1000; // Base VNA value
  const years = businessDays / 252;
  
  // IPCA accumulated factor
  const ipcaFactor = Math.pow(1 + ipcaRate / 100, years);
  
  // Real rate factor
  const realFactor = Math.pow(1 + realRate / 100, years);
  
  // Combined factor: (1 + IPCA) × (1 + real rate)
  const totalFactor = ipcaFactor * realFactor;
  
  // Gross value calculation
  const grossValue = investmentAmount * totalFactor;
  const grossReturn = grossValue - investmentAmount;
  
  // Administration fee
  const adminFeeAmount = grossReturn * (administrationFee / 100);
  
  // Net value
  const netValue = grossValue - adminFeeAmount;
  const netReturn = netValue - investmentAmount;
  
  return {
    grossValue,
    netValue,
    grossReturn,
    netReturn,
    administrationFee: adminFeeAmount,
    nominalValue: baseVNA * ipcaFactor,
    accumulatedIndex: totalFactor,
    ipcaFactor,
    realFactor
  };
};

// NTN-B com Cupons (Tesouro IPCA+ com Juros Semestrais) calculation
const calculateNTNBCupom = (
  investmentAmount: number,
  realRate: number,
  ipcaRate: number,
  businessDays: number,
  administrationFee: number,
  purchaseDate: Date,
  maturityDate: Date
): any => {
  const years = businessDays / 252;
  const totalSemesters = Math.ceil(years * 2);
  
  // Calculate coupon dates (every 6 months from maturity date backwards)
  const couponDates = [];
  const maturity = new Date(maturityDate);
  
  for (let i = 1; i <= totalSemesters; i++) {
    const couponDate = new Date(maturity);
    couponDate.setMonth(maturity.getMonth() - (6 * i));
    if (couponDate >= purchaseDate) {
      couponDates.unshift({
        date: couponDate,
        semester: i,
        daysFromPurchase: calculateBusinessDays(purchaseDate, couponDate)
      });
    }
  }
  
  // Base values and rates
  const baseVNA = 1000;
  const annualCouponRate = 0.06; // 6% annually
  const semestralCouponRate = Math.pow(1 + annualCouponRate, 0.5) - 1; // ~2.956%
  
  // Calculate total factors
  const totalIpcaFactor = Math.pow(1 + ipcaRate / 100, years);
  const totalRealFactor = Math.pow(1 + realRate / 100, years);
  const totalCombinedFactor = totalIpcaFactor * totalRealFactor;
  
  // Calculate present values for pricing
  let couponsPresentValue = 0;
  const semestralRealRate = Math.pow(1 + realRate / 100, 0.5) - 1;
  const semestralIpcaRate = Math.pow(1 + ipcaRate / 100, 0.5) - 1;
  
  // Calculate each coupon's present value for unit pricing
  for (let i = 1; i <= totalSemesters; i++) {
    // VNA at each coupon date (IPCA accumulated)
    const semestersElapsed = i;
    const ipcaFactorAtCoupon = Math.pow(1 + semestralIpcaRate, semestersElapsed);
    const vnaAtCoupon = baseVNA * ipcaFactorAtCoupon;
    
    // Coupon value at that date
    const couponValue = vnaAtCoupon * semestralCouponRate;
    
    // Present value (discounted by real rate)
    const discountFactor = Math.pow(1 + semestralRealRate, -semestersElapsed);
    couponsPresentValue += couponValue * discountFactor;
  }
  
  // Present value of principal at maturity
  const finalVNA = baseVNA * totalIpcaFactor;
  const principalPresentValue = finalVNA / Math.pow(1 + semestralRealRate, totalSemesters);
  
  // Unit price and number of units
  const unitPrice = couponsPresentValue + principalPresentValue;
  const numberOfUnits = investmentAmount / unitPrice;
  
  // Calculate actual coupon payments that will be received
  let totalCouponsReceived = 0;
  const couponPayments: Array<{
    date: string;
    grossCoupon: number;
    netCoupon: number;
    accumulatedIpca: number;
  }> = [];
  
  couponDates.forEach((couponInfo, index) => {
    // IPCA accumulated until this coupon date
    const couponYears = couponInfo.daysFromPurchase / 252;
    const ipcaFactorToCoupon = Math.pow(1 + ipcaRate / 100, couponYears);
    const vnaAtCoupon = baseVNA * ipcaFactorToCoupon;
    
    // Gross coupon value per unit
    const grossCouponPerUnit = vnaAtCoupon * semestralCouponRate;
    
    // Total gross coupon (all units)
    const totalGrossCoupon = grossCouponPerUnit * numberOfUnits;
    
    // Net coupon (after 15% IR)
    const totalNetCoupon = totalGrossCoupon * 0.85;
    
    totalCouponsReceived += totalGrossCoupon;
    
    couponPayments.push({
      date: couponInfo.date.toISOString().split('T')[0],
      grossCoupon: totalGrossCoupon,
      netCoupon: totalNetCoupon,
      accumulatedIpca: ipcaFactorToCoupon
    });
  });
  
  // Principal at maturity
  const principalAtMaturity = finalVNA * numberOfUnits;
  
  // Total gross value (all coupons + principal)
  const grossValue = totalCouponsReceived + principalAtMaturity;
  const grossReturn = grossValue - investmentAmount;
  
  // Administration fee
  const adminFeeAmount = grossReturn * (administrationFee / 100);
  
  // Net value
  const netValue = grossValue - adminFeeAmount;
  const netReturn = netValue - investmentAmount;
  
  return {
    grossValue,
    netValue,
    grossReturn,
    netReturn,
    administrationFee: adminFeeAmount,
    nominalValue: finalVNA,
    accumulatedIndex: grossValue / investmentAmount,
    totalCoupons: totalCouponsReceived,
    couponPayments,
    numberOfUnits,
    unitPrice,
    ipcaFactor: totalIpcaFactor,
    realFactor: totalRealFactor
  };
};

// NTN-F (Tesouro Prefixado com Juros Semestrais) calculation
const calculateNTNF = (
  investmentAmount: number,
  annualRate: number,
  businessDays: number,
  administrationFee: number
): any => {
  const years = businessDays / 252;
  const semesters = Math.ceil(years * 2);
  const semesterRate = Math.pow(1 + annualRate / 100, 0.5) - 1;
  
  // Principal at maturity
  const principalValue = 1000;
  
  // Coupon payments (6% annually, paid semiannually)
  const couponRate = 0.06;
  const semiannualCoupon = principalValue * (Math.pow(1 + couponRate, 0.5) - 1);
  
  // Present value of coupons
  let couponsPresentValue = 0;
  for (let i = 1; i <= semesters; i++) {
    const discountFactor = Math.pow(1 + semesterRate, -i);
    couponsPresentValue += semiannualCoupon * discountFactor;
  }
  
  // Present value of principal
  const principalPresentValue = principalValue / Math.pow(1 + semesterRate, semesters);
  
  // Total present value (unit price)
  const unitPrice = couponsPresentValue + principalPresentValue;
  const numberOfUnits = investmentAmount / unitPrice;
  
  // Total coupons to receive
  const totalCoupons = numberOfUnits * semiannualCoupon * semesters;
  const principalReturn = numberOfUnits * principalValue;
  
  // Gross value
  const grossValue = totalCoupons + principalReturn;
  const grossReturn = grossValue - investmentAmount;
  
  // Administration fee
  const adminFeeAmount = grossReturn * (administrationFee / 100);
  
  // Net value
  const netValue = grossValue - adminFeeAmount;
  const netReturn = netValue - investmentAmount;
  
  return {
    grossValue,
    netValue,
    grossReturn,
    netReturn,
    administrationFee: adminFeeAmount,
    nominalValue: principalValue,
    accumulatedIndex: grossValue / investmentAmount,
    totalCoupons,
    numberOfUnits,
    unitPrice
  };
};

const calculateTesouroDireto = (state: TesouroDiretoState): TesouroDiretoResult | null => {
  const investmentAmount = parseBRLNumber(state.investmentAmount);
  const annualRate = parseFloat(state.annualRate) || 0;
  const ipca = parseFloat(state.ipca) || CURRENT_IPCA;
  const selic = parseFloat(state.selic) || CURRENT_SELIC;
  const administrationFee = parseFloat(state.administrationFee) || 0;

  if (isNaN(investmentAmount) || investmentAmount <= 0) return null;

  const purchaseDate = new Date(state.purchaseDate);
  const maturityDate = new Date(state.maturityDate);
  
  if (!purchaseDate || !maturityDate || maturityDate <= purchaseDate) return null;

  const businessDays = calculateBusinessDays(purchaseDate, maturityDate);
  const irRate = calculateIRRate(businessDays);

  let calculation: any;

  switch (state.bondType) {
    case 'ltn':
      calculation = calculateLTN(investmentAmount, annualRate, businessDays, administrationFee);
      break;
    case 'lft':
      calculation = calculateLFT(investmentAmount, selic, businessDays, administrationFee);
      break;
    case 'ntn-b':
      calculation = calculateNTNB(investmentAmount, annualRate, ipca, businessDays, administrationFee);
      break;
    case 'ntn-b-cupom':
      calculation = calculateNTNBCupom(investmentAmount, annualRate, ipca, businessDays, administrationFee, purchaseDate, maturityDate);
      break;
    case 'ntn-f':
      calculation = calculateNTNF(investmentAmount, annualRate, businessDays, administrationFee);
      break;
    default:
      return null;
  }

  // Tax calculations
  const irTax = calculation.grossReturn * (irRate / 100);
  const iofTax = calculateIOF(businessDays, calculation.grossReturn);

  // Final net value after all taxes and fees
  const finalNetValue = calculation.grossValue - irTax - iofTax - calculation.administrationFee;
  const finalNetReturn = finalNetValue - investmentAmount;

  // Annual yield calculation
  const years = businessDays / 252;
  const annualYield = years > 0 ? (Math.pow(finalNetValue / investmentAmount, 1 / years) - 1) * 100 : 0;
  
  // Real yield (discounting IPCA)
  const realYield = years > 0 ? (Math.pow(1 + annualYield / 100, 1) / Math.pow(1 + ipca / 100, 1) - 1) * 100 : 0;

  // Generate chart data
  const chartData = [];
  const periods = Math.min(Math.ceil(years * 12), 60); // Max 5 years monthly data
  
  for (let i = 1; i <= periods; i++) {
    const monthlyBusinessDays = (businessDays * i) / periods;
    const periodFactor = Math.pow(calculation.accumulatedIndex, i / periods);
    const periodGrossValue = investmentAmount * periodFactor;
    const periodGrossReturn = periodGrossValue - investmentAmount;
    const periodIR = periodGrossReturn * (calculateIRRate(monthlyBusinessDays) / 100);
    const periodIOF = calculateIOF(monthlyBusinessDays, periodGrossReturn);
    const periodAdminFee = periodGrossReturn * (administrationFee / 100);
    const periodNetValue = periodGrossValue - periodIR - periodIOF - periodAdminFee;
    
    chartData.push({
      period: `${i}m`,
      accumulated: periodFactor,
      grossValue: periodGrossValue,
      netValue: periodNetValue,
    });
  }

  const breakdown = {
    investedAmount: investmentAmount,
    grossValue: calculation.grossValue,
    netValue: finalNetValue,
    grossReturn: calculation.grossReturn,
    netReturn: finalNetReturn,
    irTax,
    iofTax,
    administrationFee: calculation.administrationFee,
    nominalValue: calculation.nominalValue,
    accumulatedIndex: calculation.accumulatedIndex,
    annualYield,
    realYield,
    totalDays: businessDays,
    totalCoupons: calculation.totalCoupons,
    couponPayments: calculation.couponPayments,
    chartData,
  };

  const bondNames = {
    ltn: 'Tesouro Prefixado (LTN)',
    lft: 'Tesouro Selic (LFT)',
    'ntn-b': 'Tesouro IPCA+ (NTN-B Principal)',
    'ntn-b-cupom': 'Tesouro IPCA+ com Juros Semestrais (NTN-B)',
    'ntn-f': 'Tesouro Prefixado com Juros Semestrais (NTN-F)',
  };

  return {
    value: finalNetValue,
    isValid: true,
    message: `${bondNames[state.bondType]}: ${finalNetValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    breakdown,
  };
};

const TesouroDiretoResultDisplay: React.FC<{ result: TesouroDiretoResult; bondType: string }> = ({ result, bondType }) => {
  const theme = useTheme();
  
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatPercentage = (value: number) => 
    `${value.toFixed(2)}%`;

  const bondNames = {
    ltn: 'Tesouro Prefixado (LTN)',
    lft: 'Tesouro Selic (LFT)',
    'ntn-b': 'Tesouro IPCA+ (NTN-B Principal)',
    'ntn-b-cupom': 'Tesouro IPCA+ com Juros Semestrais (NTN-B)',
    'ntn-f': 'Tesouro Prefixado com Juros Semestrais (NTN-F)',
  };

  const EvolutionChart = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Evolução do Investimento
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
            <Line 
              type="monotone" 
              dataKey="grossValue" 
              stroke="#2196F3" 
              strokeWidth={2} 
              name="Valor Bruto"
            />
            <Line 
              type="monotone" 
              dataKey="netValue" 
              stroke="#4CAF50" 
              strokeWidth={2} 
              name="Valor Líquido"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );

  const CouponPaymentsTable = () => {
    if (!result.breakdown.couponPayments || result.breakdown.couponPayments.length === 0) {
      return null;
    }

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
          💰 Cronograma de Cupons Semestrais
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
          <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
            Cupons de 6% a.a. (≈2,96% a.s.) sobre o VNA corrigido pelo IPCA
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
            gap: 2,
            maxHeight: 300,
            overflow: 'auto'
          }}>
            <Typography variant="body2" fontWeight="bold" sx={{ gridColumn: { xs: 'span 1', sm: 'span 4' }, borderBottom: '1px solid #ddd', pb: 1 }}>
              Data | Cupom Bruto | Cupom Líquido | IPCA Acum.
            </Typography>
            
            {result.breakdown.couponPayments.map((coupon, index) => (
              <React.Fragment key={index}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  {new Date(coupon.date).toLocaleDateString('pt-BR')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, color: theme.palette.success.main }}>
                  {formatCurrency(coupon.grossCoupon)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, color: theme.palette.primary.main }}>
                  {formatCurrency(coupon.netCoupon)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  {coupon.accumulatedIpca.toFixed(4)}x
                </Typography>
              </React.Fragment>
            ))}
          </Box>
          
          <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.info.light, borderRadius: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Total de Cupons: {formatCurrency(result.breakdown.totalCoupons || 0)}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
              Os cupons são pagos semestralmente e sofrem tributação de IR na fonte
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado: {bondNames[bondType as keyof typeof bondNames]}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
                💰 Resumo Financeiro
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Valor Investido:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(result.breakdown.investedAmount)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Valor Bruto no Vencimento:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(result.breakdown.grossValue)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Rendimento Bruto:</Typography>
                <Typography variant="body2" fontWeight="medium" sx={{ color: theme.palette.success.main }}>
                  {formatCurrency(result.breakdown.grossReturn)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1" fontWeight="bold">Valor Líquido:</Typography>
                <Typography variant="body1" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
                  {formatCurrency(result.breakdown.netValue)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Rendimento Líquido:</Typography>
                <Typography variant="body2" fontWeight="medium" sx={{ color: theme.palette.success.main }}>
                  {formatCurrency(result.breakdown.netReturn)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.info.main, fontWeight: 'bold' }}>
                📊 Indicadores
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Prazo (dias úteis):</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {result.breakdown.totalDays}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Rentabilidade Anual:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatPercentage(result.breakdown.annualYield)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Rentabilidade Real:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatPercentage(result.breakdown.realYield)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Fator de Acumulação:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {result.breakdown.accumulatedIndex.toFixed(4)}x
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Valor Nominal Atualizado:</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(result.breakdown.nominalValue)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {(result.breakdown.irTax > 0 || result.breakdown.iofTax > 0 || result.breakdown.administrationFee > 0) && (
        <Card sx={{ mb: 4, border: `2px solid ${theme.palette.error.main}` }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.main, fontWeight: 'bold' }}>
              🏛️ Tributos e Taxas
            </Typography>
            
            {result.breakdown.irTax > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Imposto de Renda:</Typography>
                <Typography variant="body2" fontWeight="medium" color="error">
                  -{formatCurrency(result.breakdown.irTax)}
                </Typography>
              </Box>
            )}
            
            {result.breakdown.iofTax > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">IOF:</Typography>
                <Typography variant="body2" fontWeight="medium" color="error">
                  -{formatCurrency(result.breakdown.iofTax)}
                </Typography>
              </Box>
            )}
            
            {result.breakdown.administrationFee > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Taxa de Administração:</Typography>
                <Typography variant="body2" fontWeight="medium" color="error">
                  -{formatCurrency(result.breakdown.administrationFee)}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      <EvolutionChart />
      <CouponPaymentsTable />

      <Box sx={{ 
        mt: 4,
        p: { xs: 2, sm: 3 },
        backgroundColor: theme.palette.success.light,
        borderRadius: 2,
        border: `2px solid ${theme.palette.success.main}`
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
          🎯 Análise do Investimento
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mb: 1
          }}
        >
          Rentabilidade anual de <strong>{formatPercentage(result.breakdown.annualYield)}</strong> 
          com ganho real de <strong>{formatPercentage(result.breakdown.realYield)}</strong> acima da inflação.
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
          Cálculo baseado em {result.breakdown.totalDays} dias úteis até o vencimento
        </Typography>
      </Box>
    </Paper>
  );
};

const TesouroDiretoCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [result, setResult] = useState<TesouroDiretoResult | null>(null);

  const initialState: TesouroDiretoState = {
    bondType: 'ltn',
    investmentAmount: '',
    maturityDate: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    annualRate: '',
    ipca: CURRENT_IPCA.toString(),
    selic: CURRENT_SELIC.toString(),
    administrationFee: '0',
  };

  const [state, setState] = useState<TesouroDiretoState>(initialState);

  const validate = (state: TesouroDiretoState): ValidationResult => {
    if (!state.investmentAmount) {
      return { valid: false, error: 'Informe o valor do investimento' };
    }
    if (!state.maturityDate) {
      return { valid: false, error: 'Informe a data de vencimento' };
    }
    if (!state.purchaseDate) {
      return { valid: false, error: 'Informe a data de compra' };
    }

    const amountValid = validateNumberInput(state.investmentAmount, 30, 50000000);
    if (!amountValid.valid) {
      return { valid: false, error: amountValid.error };
    }

    const purchaseDate = new Date(state.purchaseDate);
    const maturityDate = new Date(state.maturityDate);
    
    if (maturityDate <= purchaseDate) {
      return { valid: false, error: 'A data de vencimento deve ser posterior à data de compra' };
    }

    if (state.bondType !== 'lft' && !state.annualRate) {
      return { valid: false, error: 'Informe a taxa anual para este tipo de título' };
    }

    return { valid: true };
  };

  const [validation, setValidation] = useState<ValidationResult>({ valid: true });

  const updateField = (field: keyof TesouroDiretoState, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validation.error) {
      setValidation({ valid: true });
    }
    
    // Clear result when form changes
    if (result) {
      setResult(null);
    }
  };

  const handleCalculate = () => {
    setHasInteracted(true);
    const validationResult = validate(state);
    setValidation(validationResult);
    
    if (validationResult.valid) {
      const calculationResult = calculateTesouroDireto(state);
      setResult(calculationResult);
    } else {
      setResult(null);
    }
  };

  const handleClear = () => {
    setState(initialState);
    setResult(null);
    setValidation({ valid: true });
    setHasInteracted(false);
  };

  const handleFieldUpdate = (field: keyof TesouroDiretoState, value: string) => {
    // Auto-fill rates based on bond type
    if (field === 'bondType') {
      const bondType = value as TesouroDiretoState['bondType'];
      const newState = { ...state, bondType };
      
      switch (bondType) {
        case 'ltn':
          newState.annualRate = CURRENT_LTN_RATE.toString();
          break;
        case 'ntn-b':
        case 'ntn-b-cupom':
        case 'ntn-f':
          newState.annualRate = CURRENT_NTN_RATE.toString();
          break;
        case 'lft':
          newState.annualRate = '';
          break;
      }
      
      setState(newState);
    } else {
      updateField(field, value);
    }
    
    // Clear validation error when user starts typing
    if (validation.error) {
      setValidation({ valid: true });
    }
    
    // Clear result when form changes
    if (result) {
      setResult(null);
    }
  };

  const getBondDescription = (bondType: string) => {
    const descriptions = {
      ltn: 'Taxa prefixada - você já sabe o valor que receberá no vencimento',
      lft: 'Rentabilidade atrelada à Taxa Selic - acompanha a taxa básica de juros',
      'ntn-b': 'IPCA + taxa prefixada - protege contra a inflação (sem cupons)',
      'ntn-b-cupom': 'IPCA + taxa real + cupons semestrais de 6% a.a. - renda periódica',
      'ntn-f': 'Taxa prefixada com cupons semestrais de juros',
    };
    return descriptions[bondType as keyof typeof descriptions] || '';
  };

  return (
    <>
      <CalculatorHeader
        title="Calculadora do Tesouro Direto"
        description="Simule investimentos em títulos públicos federais: Tesouro Prefixado, Tesouro Selic e Tesouro IPCA+. Calcule rentabilidade, impostos e valor no vencimento."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Tipo de Título"
            value={state.bondType}
            onChange={(e) => handleFieldUpdate('bondType', e.target.value)}
            select
            fullWidth
            variant="standard"
            helperText={getBondDescription(state.bondType)}
          >
            <MenuItem value="ltn">Tesouro Prefixado (LTN)</MenuItem>
            <MenuItem value="lft">Tesouro Selic (LFT)</MenuItem>
            <MenuItem value="ntn-b">Tesouro IPCA+ (NTN-B Principal)</MenuItem>
            <MenuItem value="ntn-b-cupom">Tesouro IPCA+ com Juros Semestrais (NTN-B)</MenuItem>
            <MenuItem value="ntn-f">Tesouro Prefixado com Juros Semestrais (NTN-F)</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={state.investmentAmount}
            handleChange={(value) => handleFieldUpdate('investmentAmount', value)}
            label="Valor do Investimento (R$)"
            error={!!validation.error && validation.error.includes('investimento')}
            helperText={!!validation.error && validation.error.includes('investimento') ? validation.error : 'Valor mínimo: R$ 30,00'}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Data de Compra"
            value={state.purchaseDate}
            onChange={(e) => handleFieldUpdate('purchaseDate', e.target.value)}
            type="date"
            fullWidth
            variant="standard"
            helperText="Data da compra do título"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Data de Vencimento"
            value={state.maturityDate}
            onChange={(e) => handleFieldUpdate('maturityDate', e.target.value)}
            type="date"
            fullWidth
            variant="standard"
            helperText="Data de vencimento do título"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Grid>

        {state.bondType !== 'lft' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Taxa Anual (%)"
              value={state.annualRate}
              onChange={(value) => handleFieldUpdate('annualRate', value)}
              type="number"
              helperText={
                state.bondType === 'ltn' || state.bondType === 'ntn-f' 
                  ? 'Taxa prefixada anual do título'
                  : 'Taxa real anual (acima do IPCA)'
              }
            />
          </Grid>
        )}

        {(state.bondType === 'ntn-b' || state.bondType === 'ntn-b-cupom') && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="IPCA Projetado (% a.a.)"
              value={state.ipca}
              onChange={(value) => handleFieldUpdate('ipca', value)}
              type="number"
              helperText="Inflação projetada para o período"
            />
          </Grid>
        )}

        {state.bondType === 'lft' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CalculatorInput
              label="Taxa Selic Projetada (% a.a.)"
              value={state.selic}
              onChange={(value) => handleFieldUpdate('selic', value)}
              type="number"
              helperText="Taxa Selic projetada para o período"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <CalculatorInput
            label="Taxa de Administração (% a.a.)"
            value={state.administrationFee}
            onChange={(value) => handleFieldUpdate('administrationFee', value)}
            type="number"
            helperText="Taxa cobrada pela corretora (opcional)"
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <TesouroDiretoResultDisplay result={result as TesouroDiretoResult} bondType={state.bondType} />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <CalculatorActions
            onCalculate={handleCalculate}
            onClear={handleClear}
            layout="side-by-side"
            calculateLabel="Calcular Investimento"
            clearLabel="Limpar Campos"
            disabled={!state.investmentAmount || !state.maturityDate || !state.purchaseDate}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TesouroDiretoCalculator;