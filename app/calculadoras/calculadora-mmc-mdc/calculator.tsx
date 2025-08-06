'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Grid, Typography, Paper, Divider, Box, Alert, Chip, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface MMCMDCState {
  numbers: string[];
}

interface PrimeFactorization {
  number: number;
  factors: number[];
  tree: Array<{ level: number; values: number[] }>;
}

interface MMCMDCResult extends CalculatorResultType {
  breakdown: {
    numbers: number[];
    mmc: number;
    mdc: number;
    primeFactorizations: PrimeFactorization[];
    mmcFactors: { [key: number]: number };
    mdcFactors: { [key: number]: number };
    steps: string[];
  };
}

// Calculate prime factorization with tree structure for animation
const getPrimeFactorization = (n: number): PrimeFactorization => {
  const factors: number[] = [];
  const tree: Array<{ level: number; values: number[] }> = [];
  let current = n;
  let level = 0;
  
  tree.push({ level, values: [current] });
  
  // Find all prime factors
  for (let i = 2; i <= Math.sqrt(current); i++) {
    while (current % i === 0) {
      factors.push(i);
      const newValues = tree[level].values.flatMap(val => 
        val === current ? [val / i, i] : [val]
      );
      level++;
      tree.push({ level, values: newValues });
      current = current / i;
    }
  }
  
  if (current > 1) {
    factors.push(current);
  }
  
  return { number: n, factors, tree };
};

// Calculate GCD using Euclidean algorithm
const calculateGCD = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};

// Calculate GCD for multiple numbers
const calculateMultipleGCD = (numbers: number[]): number => {
  return numbers.reduce((gcd, num) => calculateGCD(gcd, num));
};

// Calculate LCM using the formula: LCM(a,b) = |a*b| / GCD(a,b)
const calculateLCM = (a: number, b: number): number => {
  return Math.abs(a * b) / calculateGCD(a, b);
};

// Calculate LCM for multiple numbers
const calculateMultipleLCM = (numbers: number[]): number => {
  return numbers.reduce((lcm, num) => calculateLCM(lcm, num));
};

// Get prime factors count for LCM/GCD calculation
const getPrimeFactorsCount = (factors: number[]): { [key: number]: number } => {
  const count: { [key: number]: number } = {};
  factors.forEach(factor => {
    count[factor] = (count[factor] || 0) + 1;
  });
  return count;
};

// Main calculation function
const calculateMMCMDC = (state: MMCMDCState): MMCMDCResult | null => {
  const numbers = state.numbers
    .filter(num => num.trim() !== '')
    .map(num => parseInt(num))
    .filter(num => !isNaN(num) && num > 0);
  
  if (numbers.length < 2) return null;
  
  // Calculate prime factorizations
  const primeFactorizations = numbers.map(getPrimeFactorization);
  
  // Calculate MMC and MDC
  const mmc = calculateMultipleLCM(numbers);
  const mdc = calculateMultipleGCD(numbers);
  
  // Get factors count for each number
  const factorizations = primeFactorizations.map(pf => getPrimeFactorsCount(pf.factors));
  
  // Calculate MMC factors (maximum power of each prime)
  const allPrimes = [...new Set(primeFactorizations.flatMap(pf => pf.factors))];
  const mmcFactors: { [key: number]: number } = {};
  const mdcFactors: { [key: number]: number } = {};
  
  allPrimes.forEach(prime => {
    const powers = factorizations.map(f => f[prime] || 0);
    mmcFactors[prime] = Math.max(...powers);
    mdcFactors[prime] = Math.min(...powers);
    
    // Remove factors with power 0 from MDC
    if (mdcFactors[prime] === 0) {
      delete mdcFactors[prime];
    }
  });
  
  // Generate step-by-step explanation
  const steps = [
    `1. Decompomos cada número em fatores primos:`,
    ...primeFactorizations.map(pf => 
      `   ${pf.number} = ${pf.factors.join(' × ')}`
    ),
    `2. Para o MMC, tomamos cada fator primo com sua maior potência:`,
    `   MMC = ${Object.entries(mmcFactors)
      .map(([prime, power]) => power > 1 ? `${prime}^${power}` : prime)
      .join(' × ')} = ${mmc}`,
    `3. Para o MDC, tomamos cada fator primo com sua menor potência:`,
    Object.keys(mdcFactors).length > 0 
      ? `   MDC = ${Object.entries(mdcFactors)
          .map(([prime, power]) => power > 1 ? `${prime}^${power}` : prime)
          .join(' × ')} = ${mdc}`
      : `   MDC = 1 (não há fatores comuns)`
  ];
  
  return {
    value: mmc,
    isValid: true,
    message: `MMC = ${mmc}, MDC = ${mdc}`,
    breakdown: {
      numbers,
      mmc,
      mdc,
      primeFactorizations,
      mmcFactors,
      mdcFactors,
      steps
    },
    additionalInfo: {
      'MMC (Mínimo Múltiplo Comum)': mmc.toLocaleString('pt-BR'),
      'MDC (Máximo Divisor Comum)': mdc.toLocaleString('pt-BR'),
      'Números analisados': numbers.join(', '),
      'Quantidade de números': numbers.length.toString()
    }
  };
};

// Animated Factor Tree Component
const FactorTree: React.FC<{ factorization: PrimeFactorization; animated?: boolean }> = ({ 
  factorization, 
  animated = true 
}) => {
  const theme = useTheme();
  const [visibleLevels, setVisibleLevels] = useState(animated ? 1 : factorization.tree.length);
  
  React.useEffect(() => {
    if (!animated) return;
    
    const timer = setInterval(() => {
      setVisibleLevels(prev => {
        if (prev >= factorization.tree.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [factorization.tree.length, animated]);
  
  const resetAnimation = () => {
    setVisibleLevels(1);
  };
  
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          🌳 Árvore de Fatores: {factorization.number}
        </Typography>
        {animated && (
          <Button 
            size="small" 
            onClick={resetAnimation}
            variant="outlined"
          >
            Repetir Animação
          </Button>
        )}
      </Box>
      
      <Box sx={{ 
        minHeight: 200, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 2,
        p: 2
      }}>
        {factorization.tree.slice(0, visibleLevels).map((level, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 1 }}>
              {level.values.map((value, valueIndex) => (
                <Chip
                  key={valueIndex}
                  label={value}
                  color={factorization.factors.includes(value) && value !== factorization.number ? 'primary' : 'default'}
                  variant={factorization.factors.includes(value) && value !== factorization.number ? 'filled' : 'outlined'}
                  sx={{ 
                    fontSize: '1rem',
                    minWidth: 50,
                    animation: animated ? 'fadeIn 0.5s ease-in' : 'none',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'scale(0.8)' },
                      to: { opacity: 1, transform: 'scale(1)' }
                    }
                  }}
                />
              ))}
            </Box>
            
            {index < factorization.tree.length - 1 && index < visibleLevels - 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  ↓
                </Typography>
              </Box>
            )}
          </Box>
        ))}
        
        {visibleLevels >= factorization.tree.length && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Fatores primos: {factorization.factors.join(' × ')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Step-by-step solution component
const StepByStepSolution: React.FC<{ result: MMCMDCResult }> = ({ result }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📝 Resolução Passo a Passo
      </Typography>
      
      <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        {result.breakdown.steps.map((step, index) => (
          <Typography 
            key={index}
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontFamily: step.includes('×') ? 'monospace' : 'inherit',
              fontWeight: step.match(/^\d+\./) ? 'bold' : 'normal',
              backgroundColor: step.includes('=') ? '#fff' : 'transparent',
              p: step.includes('=') ? 1 : 0,
              borderRadius: step.includes('=') ? 1 : 0,
              ml: step.startsWith('   ') ? 2 : 0
            }}
          >
            {step}
          </Typography>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Alert severity="success" sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              MMC = {result.breakdown.mmc}
            </Typography>
            <Typography variant="caption">
              Menor múltiplo comum
            </Typography>
          </Alert>
          
          <Alert severity="info" sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              MDC = {result.breakdown.mdc}
            </Typography>
            <Typography variant="caption">
              Maior divisor comum
            </Typography>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

// Main result display component
const MMCMDCResultDisplay: React.FC<{ result: MMCMDCResult }> = ({ result }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ p: 3, backgroundColor: '#ffffff' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado: MMC e MDC
      </Typography>
      
      {/* Factor Trees */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          🌳 Árvores de Fatores Animadas
        </Typography>
        <Grid container spacing={2}>
          {result.breakdown.primeFactorizations.map((factorization, index) => (
            <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <FactorTree factorization={factorization} animated={true} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <StepByStepSolution result={result} />
    </Paper>
  );
};

const MMCMDCCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: MMCMDCState = {
    numbers: ['', ''],
  };

  const validate = (state: MMCMDCState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    const validNumbers = state.numbers.filter(num => {
      const trimmed = num.trim();
      if (trimmed === '') return false;
      const parsed = parseInt(trimmed);
      return !isNaN(parsed) && parsed > 0 && parsed <= 1000000;
    });

    if (validNumbers.length < 2) {
      return { valid: false, error: 'Informe pelo menos 2 números válidos' };
    }

    if (validNumbers.length > 6) {
      return { valid: false, error: 'Máximo de 6 números permitidos' };
    }

    // Validate each number
    for (const num of state.numbers) {
      if (num.trim() !== '') {
        const parsed = parseInt(num);
        if (isNaN(parsed) || parsed <= 0) {
          return { valid: false, error: 'Todos os números devem ser positivos' };
        }
        if (parsed > 1000000) {
          return { valid: false, error: 'Números devem ser menores que 1.000.000' };
        }
      }
    }

    return { valid: true };
  };

  const calculate = (state: MMCMDCState): MMCMDCResult | null => {
    return calculateMMCMDC(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((index: number, value: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    const newNumbers = [...state.numbers];
    newNumbers[index] = value.replace(/[^0-9]/g, ''); // Only allow digits
    updateField('numbers', newNumbers);
  }, [hasInteracted, updateField, state.numbers]);

  const addNumberField = useCallback(() => {
    if (state.numbers.length < 6) {
      const newNumbers = [...state.numbers, ''];
      updateField('numbers', newNumbers);
    }
  }, [state.numbers, updateField]);

  const removeNumberField = useCallback((index: number) => {
    if (state.numbers.length > 2) {
      const newNumbers = state.numbers.filter((_, i) => i !== index);
      updateField('numbers', newNumbers);
    }
  }, [state.numbers, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  return (
    <>
      <Paper sx={{ p: 3, backgroundColor: '#ffffff', mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
              Calculadora de MMC e MDC
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Calcule o Mínimo Múltiplo Comum (MMC) e Máximo Divisor Comum (MDC) de até 6 números com visualização da árvore de fatores animada.
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Informe os números (até 6):
            </Typography>
          </Grid>

          {state.numbers.map((num, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                <CalculatorInput
                  label={`Número ${index + 1}`}
                  value={num}
                  onChange={(value) => handleFieldUpdate(index, value)}
                  type="number"
                  error={hasInteracted && !!validation.error}
                  helperText={index === 0 ? (hasInteracted && validation.error ? validation.error : 'Número inteiro positivo') : ''}
                  inputProps={{ min: 1, max: 1000000 }}
                  allowDecimals={false}
                />
                {state.numbers.length > 2 && (
                  <Button
                    onClick={() => removeNumberField(index)}
                    color="error"
                    size="small"
                    variant="contained"
                    sx={{ minWidth: 40, height: 40 }}
                  >
                    <RemoveIcon />
                  </Button>
                )}
              </Box>
            </Grid>
          ))}

          {state.numbers.length < 6 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  onClick={addNumberField}
                  variant="contained"
                  startIcon={<AddIcon />}
                  color="primary"
                  sx={{ mb: 2, px: 3 }}
                >
                  Adicionar Número
                </Button>
              </Box>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <CalculatorActions
              onClear={handleClearWithReset}
              layout="clear-only"
            />
          </Grid>
        </Grid>
      </Paper>

      {result && (
        <MMCMDCResultDisplay result={result as MMCMDCResult} />
      )}
    </>
  );
};

export default MMCMDCCalculator;