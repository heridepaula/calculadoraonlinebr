'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Grid, Typography, Paper, Divider, Box, Alert, Button, ButtonGroup, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface Fraction {
  numerator: number;
  denominator: number;
}

interface FractionState {
  numerator1: string;
  denominator1: string;
  numerator2: string;
  denominator2: string;
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
}

interface FractionResult extends CalculatorResultType {
  breakdown: {
    fraction1: Fraction;
    fraction2: Fraction;
    operation: string;
    result: Fraction;
    simplified: Fraction;
    mixedNumber?: { whole: number; numerator: number; denominator: number };
    steps: string[];
    commonDenominator?: number;
    equivalentFractions?: {
      fraction1: Fraction;
      fraction2: Fraction;
    };
  };
}

// Calculate GCD using Euclidean algorithm
const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Calculate LCM
const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

// Simplify fraction to lowest terms
const simplifyFraction = (numerator: number, denominator: number): Fraction => {
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
};

// Convert improper fraction to mixed number
const toMixedNumber = (numerator: number, denominator: number): { whole: number; numerator: number; denominator: number } | null => {
  if (Math.abs(numerator) < Math.abs(denominator)) return null;
  
  const whole = Math.floor(Math.abs(numerator) / Math.abs(denominator));
  const remainingNumerator = Math.abs(numerator) % Math.abs(denominator);
  
  return {
    whole: numerator < 0 ? -whole : whole,
    numerator: remainingNumerator,
    denominator: Math.abs(denominator)
  };
};

// Addition of fractions
const addFractions = (f1: Fraction, f2: Fraction): { result: Fraction; steps: string[]; commonDenominator: number; equivalentFractions: { fraction1: Fraction; fraction2: Fraction } } => {
  const steps: string[] = [];
  const commonDenominator = lcm(f1.denominator, f2.denominator);
  
  const newF1 = {
    numerator: f1.numerator * (commonDenominator / f1.denominator),
    denominator: commonDenominator
  };
  
  const newF2 = {
    numerator: f2.numerator * (commonDenominator / f2.denominator),
    denominator: commonDenominator
  };
  
  const result = {
    numerator: newF1.numerator + newF2.numerator,
    denominator: commonDenominator
  };
  
  steps.push(`1. Encontrar denominador comum (MMC de ${f1.denominator} e ${f2.denominator}): ${commonDenominator}`);
  steps.push(`2. Converter frações para denominador comum:`);
  steps.push(`   ${f1.numerator}/${f1.denominator} = ${newF1.numerator}/${newF1.denominator}`);
  steps.push(`   ${f2.numerator}/${f2.denominator} = ${newF2.numerator}/${newF2.denominator}`);
  steps.push(`3. Somar os numeradores: ${newF1.numerator} + ${newF2.numerator} = ${result.numerator}`);
  steps.push(`4. Resultado: ${result.numerator}/${result.denominator}`);
  
  return {
    result,
    steps,
    commonDenominator,
    equivalentFractions: { fraction1: newF1, fraction2: newF2 }
  };
};

// Subtraction of fractions
const subtractFractions = (f1: Fraction, f2: Fraction): { result: Fraction; steps: string[]; commonDenominator: number; equivalentFractions: { fraction1: Fraction; fraction2: Fraction } } => {
  const steps: string[] = [];
  const commonDenominator = lcm(f1.denominator, f2.denominator);
  
  const newF1 = {
    numerator: f1.numerator * (commonDenominator / f1.denominator),
    denominator: commonDenominator
  };
  
  const newF2 = {
    numerator: f2.numerator * (commonDenominator / f2.denominator),
    denominator: commonDenominator
  };
  
  const result = {
    numerator: newF1.numerator - newF2.numerator,
    denominator: commonDenominator
  };
  
  steps.push(`1. Encontrar denominador comum (MMC de ${f1.denominator} e ${f2.denominator}): ${commonDenominator}`);
  steps.push(`2. Converter frações para denominador comum:`);
  steps.push(`   ${f1.numerator}/${f1.denominator} = ${newF1.numerator}/${newF1.denominator}`);
  steps.push(`   ${f2.numerator}/${f2.denominator} = ${newF2.numerator}/${newF2.denominator}`);
  steps.push(`3. Subtrair os numeradores: ${newF1.numerator} - ${newF2.numerator} = ${result.numerator}`);
  steps.push(`4. Resultado: ${result.numerator}/${result.denominator}`);
  
  return {
    result,
    steps,
    commonDenominator,
    equivalentFractions: { fraction1: newF1, fraction2: newF2 }
  };
};

// Multiplication of fractions
const multiplyFractions = (f1: Fraction, f2: Fraction): { result: Fraction; steps: string[] } => {
  const steps: string[] = [];
  const result = {
    numerator: f1.numerator * f2.numerator,
    denominator: f1.denominator * f2.denominator
  };
  
  steps.push(`1. Multiplicar numeradores: ${f1.numerator} × ${f2.numerator} = ${result.numerator}`);
  steps.push(`2. Multiplicar denominadores: ${f1.denominator} × ${f2.denominator} = ${result.denominator}`);
  steps.push(`3. Resultado: ${result.numerator}/${result.denominator}`);
  
  return { result, steps };
};

// Division of fractions
const divideFractions = (f1: Fraction, f2: Fraction): { result: Fraction; steps: string[] } => {
  const steps: string[] = [];
  
  if (f2.numerator === 0) {
    throw new Error('Divisão por zero não é permitida');
  }
  
  const reciprocal = {
    numerator: f2.denominator,
    denominator: f2.numerator
  };
  
  const result = {
    numerator: f1.numerator * reciprocal.numerator,
    denominator: f1.denominator * reciprocal.denominator
  };
  
  steps.push(`1. Inverter a segunda fração: ${f2.numerator}/${f2.denominator} → ${reciprocal.numerator}/${reciprocal.denominator}`);
  steps.push(`2. Multiplicar pela fração invertida:`);
  steps.push(`   ${f1.numerator}/${f1.denominator} × ${reciprocal.numerator}/${reciprocal.denominator}`);
  steps.push(`3. Multiplicar numeradores: ${f1.numerator} × ${reciprocal.numerator} = ${result.numerator}`);
  steps.push(`4. Multiplicar denominadores: ${f1.denominator} × ${reciprocal.denominator} = ${result.denominator}`);
  steps.push(`5. Resultado: ${result.numerator}/${result.denominator}`);
  
  return { result, steps };
};

// Main calculation function
const calculateFractions = (state: FractionState): FractionResult | null => {
  const fraction1: Fraction = {
    numerator: parseInt(state.numerator1) || 0,
    denominator: parseInt(state.denominator1) || 1
  };
  
  const fraction2: Fraction = {
    numerator: parseInt(state.numerator2) || 0,
    denominator: parseInt(state.denominator2) || 1
  };
  
  if (fraction1.denominator === 0 || fraction2.denominator === 0) {
    return null;
  }
  
  let operationResult: { result: Fraction; steps: string[]; commonDenominator?: number; equivalentFractions?: { fraction1: Fraction; fraction2: Fraction } };
  let operationSymbol: string;
  
  try {
    switch (state.operation) {
      case 'add':
        operationResult = addFractions(fraction1, fraction2);
        operationSymbol = '+';
        break;
      case 'subtract':
        operationResult = subtractFractions(fraction1, fraction2);
        operationSymbol = '-';
        break;
      case 'multiply':
        operationResult = multiplyFractions(fraction1, fraction2);
        operationSymbol = '×';
        break;
      case 'divide':
        operationResult = divideFractions(fraction1, fraction2);
        operationSymbol = '÷';
        break;
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
  
  const simplified = simplifyFraction(operationResult.result.numerator, operationResult.result.denominator);
  const mixedNumber = toMixedNumber(simplified.numerator, simplified.denominator) || undefined;
  
  // Add simplification step if needed
  const finalSteps = [...operationResult.steps];
  if (simplified.numerator !== operationResult.result.numerator || simplified.denominator !== operationResult.result.denominator) {
    const divisor = gcd(operationResult.result.numerator, operationResult.result.denominator);
    finalSteps.push(`5. Simplificar dividindo por ${divisor}: ${simplified.numerator}/${simplified.denominator}`);
  }
  
  return {
    value: simplified.numerator / simplified.denominator,
    isValid: true,
    message: `${fraction1.numerator}/${fraction1.denominator} ${operationSymbol} ${fraction2.numerator}/${fraction2.denominator} = ${simplified.numerator}/${simplified.denominator}`,
    breakdown: {
      fraction1,
      fraction2,
      operation: operationSymbol,
      result: operationResult.result,
      simplified,
      mixedNumber,
      steps: finalSteps,
      commonDenominator: operationResult.commonDenominator,
      equivalentFractions: operationResult.equivalentFractions
    },
    additionalInfo: {
      'Resultado simplificado': `${simplified.numerator}/${simplified.denominator}`,
      'Número misto': mixedNumber ? `${mixedNumber.whole} ${mixedNumber.numerator}/${mixedNumber.denominator}` : 'N/A',
      'Valor decimal': (simplified.numerator / simplified.denominator).toFixed(4),
      'Operação': `${fraction1.numerator}/${fraction1.denominator} ${operationSymbol} ${fraction2.numerator}/${fraction2.denominator}`
    }
  };
};

// Fraction visualization component
const FractionVisualizer: React.FC<{ fraction: Fraction; title: string }> = ({ fraction, title }) => {
  const theme = useTheme();
  
  const segments = Math.abs(fraction.denominator);
  const filledSegments = Math.abs(fraction.numerator);
  const isNegative = fraction.numerator < 0;
  
  const anglePerSegment = 360 / segments;
  const radius = 60;
  const centerX = 70;
  const centerY = 70;
  
  // Generate pie chart segments
  const generateSegments = () => {
    const segments = [];
    for (let i = 0; i < Math.abs(fraction.denominator); i++) {
      const startAngle = i * anglePerSegment - 90;
      const endAngle = (i + 1) * anglePerSegment - 90;
      
      const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
      
      const largeArcFlag = anglePerSegment > 180 ? 1 : 0;
      
      const path = [
        `M ${centerX} ${centerY}`,
        `L ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ');
      
      const isFilled = i < filledSegments;
      
      segments.push(
        <path
          key={i}
          d={path}
          fill={isFilled ? theme.palette.primary.main : '#f0f0f0'}
          stroke="#fff"
          strokeWidth="2"
        />
      );
    }
    return segments;
  };
  
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {isNegative && '-'}{Math.abs(fraction.numerator)}/{Math.abs(fraction.denominator)}
      </Typography>
      <svg width="140" height="140" viewBox="0 0 140 140">
        {generateSegments()}
        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r="2" fill="#666" />
      </svg>
      {isNegative && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
          (Fração negativa)
        </Typography>
      )}
    </Box>
  );
};

// Step-by-step solution component
const StepByStepSolution: React.FC<{ result: FractionResult }> = ({ result }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📝 Resolução Passo a Passo
      </Typography>
      
      <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {result.breakdown.fraction1.numerator}/{result.breakdown.fraction1.denominator} {result.breakdown.operation} {result.breakdown.fraction2.numerator}/{result.breakdown.fraction2.denominator}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {result.breakdown.steps.map((step, index) => (
          <Typography 
            key={index}
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontFamily: step.includes('×') || step.includes('÷') || step.includes('=') ? 'monospace' : 'inherit',
              fontWeight: step.match(/^\d+\./) ? 'bold' : 'normal',
              backgroundColor: step.includes('=') || step.includes('→') ? '#fff' : 'transparent',
              p: step.includes('=') || step.includes('→') ? 1 : 0,
              borderRadius: step.includes('=') || step.includes('→') ? 1 : 0,
              ml: step.startsWith('   ') ? 2 : 0
            }}
          >
            {step}
          </Typography>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Alert severity="success" sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Resultado: {result.breakdown.simplified.numerator}/{result.breakdown.simplified.denominator}
            </Typography>
            {result.breakdown.mixedNumber && (
              <Typography variant="caption">
                Número misto: {result.breakdown.mixedNumber.whole} {result.breakdown.mixedNumber.numerator}/{result.breakdown.mixedNumber.denominator}
              </Typography>
            )}
          </Alert>
          
          <Alert severity="info" sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Decimal: {(result.breakdown.simplified.numerator / result.breakdown.simplified.denominator).toFixed(4)}
            </Typography>
            <Typography variant="caption">
              Aproximação decimal
            </Typography>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

// Main result display component
const FractionResultDisplay: React.FC<{ result: FractionResult }> = ({ result }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado da Operação com Frações
      </Typography>
      
      {/* Visual representations */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          🥧 Representação Visual
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
              <FractionVisualizer 
                fraction={result.breakdown.fraction1} 
                title="Primeira Fração" 
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0', textAlign: 'center', py: 6 }}>
              <Typography variant="h3" color="primary">
                {result.breakdown.operation}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
              <FractionVisualizer 
                fraction={result.breakdown.fraction2} 
                title="Segunda Fração" 
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0', mt: 2 }}>
              <FractionVisualizer 
                fraction={result.breakdown.simplified} 
                title="Resultado Simplificado" 
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <StepByStepSolution result={result} />
    </Paper>
  );
};

const FractionsCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: FractionState = {
    numerator1: '',
    denominator1: '',
    numerator2: '',
    denominator2: '',
    operation: 'add',
  };

  const validate = (state: FractionState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.numerator1 || !state.denominator1 || !state.numerator2 || !state.denominator2) {
      return { valid: false, error: 'Preencha todos os campos das frações' };
    }

    const denom1 = parseInt(state.denominator1);
    const denom2 = parseInt(state.denominator2);
    
    if (denom1 === 0 || denom2 === 0) {
      return { valid: false, error: 'O denominador não pode ser zero' };
    }

    // Validate numeric inputs
    const num1 = parseInt(state.numerator1);
    const num2 = parseInt(state.numerator2);
    
    if (isNaN(num1) || isNaN(num2) || isNaN(denom1) || isNaN(denom2)) {
      return { valid: false, error: 'Digite apenas números inteiros' };
    }

    if (state.operation === 'divide' && parseInt(state.numerator2) === 0) {
      return { valid: false, error: 'Não é possível dividir por zero' };
    }

    return { valid: true };
  };

  const calculate = (state: FractionState): FractionResult | null => {
    return calculateFractions(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof FractionState, value: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (field === 'operation') {
      updateField(field, value as FractionState['operation']);
    } else {
      // Only allow integers (including negative)
      const sanitized = value.replace(/[^-0-9]/g, '');
      updateField(field, sanitized);
    }
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  const operations = [
    { key: 'add', label: 'Somar (+)', symbol: '+' },
    { key: 'subtract', label: 'Subtrair (-)', symbol: '-' },
    { key: 'multiply', label: 'Multiplicar (×)', symbol: '×' },
    { key: 'divide', label: 'Dividir (÷)', symbol: '÷' },
  ];

  return (
    <>
      <Paper sx={{ p: 3, backgroundColor: '#ffffff', mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
              Calculadora de Frações
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Realize operações com frações: soma, subtração, multiplicação e divisão. Visualize resultados com simplificação automática e representação gráfica.
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              {state.numerator1 && state.denominator1 && state.numerator2 && state.denominator2 ? (
                <>
                  {state.numerator1}/{state.denominator1} {operations.find(op => op.key === state.operation)?.symbol} {state.numerator2}/{state.denominator2}
                </>
              ) : (
                'Digite as frações para calcular'
              )}
            </Typography>
          </Grid>

          {/* First fraction */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                Primeira Fração
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <CalculatorInput
                    label="Numerador"
                    value={state.numerator1}
                    onChange={(value) => handleFieldUpdate('numerator1', value)}
                    type="number"
                    error={hasInteracted && !!validation.error}
                    helperText="Número de cima da fração"
                    allowDecimals={false}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 1, borderStyle: 'solid', borderWidth: 2, borderColor: 'text.primary' }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CalculatorInput
                    label="Denominador"
                    value={state.denominator1}
                    onChange={(value) => handleFieldUpdate('denominator1', value)}
                    type="number"
                    error={hasInteracted && !!validation.error}
                    helperText="Número de baixo da fração (≠ 0)"
                    allowDecimals={false}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Second fraction */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                Segunda Fração
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <CalculatorInput
                    label="Numerador"
                    value={state.numerator2}
                    onChange={(value) => handleFieldUpdate('numerator2', value)}
                    type="number"
                    error={hasInteracted && !!validation.error}
                    helperText="Número de cima da fração"
                    allowDecimals={false}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 1, borderStyle: 'solid', borderWidth: 2, borderColor: 'text.primary' }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CalculatorInput
                    label="Denominador"
                    value={state.denominator2}
                    onChange={(value) => handleFieldUpdate('denominator2', value)}
                    type="number"
                    error={hasInteracted && !!validation.error}
                    helperText="Número de baixo da fração (≠ 0)"
                    allowDecimals={false}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Operation selection */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Operação
              </Typography>
              <ButtonGroup variant="outlined" size="large">
                {operations.map((op) => (
                  <Button
                    key={op.key}
                    variant={state.operation === op.key ? 'contained' : 'outlined'}
                    onClick={() => handleFieldUpdate('operation', op.key)}
                    sx={{ minWidth: 120 }}
                  >
                    {op.symbol}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            {hasInteracted && validation.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {validation.error}
              </Alert>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CalculatorActions
              onClear={handleClearWithReset}
              layout="clear-only"
            />
          </Grid>
        </Grid>
      </Paper>

      {result && (
        <FractionResultDisplay result={result as FractionResult} />
      )}
    </>
  );
};

export default FractionsCalculator;