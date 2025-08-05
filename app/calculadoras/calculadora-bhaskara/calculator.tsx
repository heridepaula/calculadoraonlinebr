'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Grid, Typography, Paper, Divider, Box, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

interface BhaskaraState {
  coefficientA: string;
  coefficientB: string;
  coefficientC: string;
}

interface BhaskaraResult extends CalculatorResultType {
  breakdown: {
    discriminant: number;
    root1: number | null;
    root2: number | null;
    vertex: { x: number; y: number };
    nature: 'two_real_distinct' | 'two_real_equal' | 'no_real_roots';
    concavity: 'up' | 'down';
    coefficients: { a: number; b: number; c: number };
  };
}

// Calculate discriminant (delta)
const calculateDiscriminant = (a: number, b: number, c: number): number => {
  return b * b - 4 * a * c;
};

// Calculate roots using Bhaskara formula
const calculateRoots = (a: number, b: number, c: number, discriminant: number): { root1: number | null; root2: number | null } => {
  if (discriminant < 0) {
    return { root1: null, root2: null };
  }
  
  const sqrtDiscriminant = Math.sqrt(discriminant);
  const root1 = (-b + sqrtDiscriminant) / (2 * a);
  const root2 = (-b - sqrtDiscriminant) / (2 * a);
  
  return { root1, root2 };
};

// Calculate vertex coordinates
const calculateVertex = (a: number, b: number, c: number): { x: number; y: number } => {
  const x = -b / (2 * a);
  const y = a * x * x + b * x + c;
  return { x, y };
};

// Main calculation function
const calculateBhaskara = (state: BhaskaraState, theme: any): BhaskaraResult | null => {
  const a = parseFloat(state.coefficientA) || 0;
  const b = parseFloat(state.coefficientB) || 0;
  const c = parseFloat(state.coefficientC) || 0;
  
  if (a === 0) return null; // Not a quadratic equation
  
  const discriminant = calculateDiscriminant(a, b, c);
  const { root1, root2 } = calculateRoots(a, b, c, discriminant);
  const vertex = calculateVertex(a, b, c);
  
  let nature: 'two_real_distinct' | 'two_real_equal' | 'no_real_roots';
  if (discriminant > 0) {
    nature = 'two_real_distinct';
  } else if (discriminant === 0) {
    nature = 'two_real_equal';
  } else {
    nature = 'no_real_roots';
  }
  
  const concavity: 'up' | 'down' = a > 0 ? 'up' : 'down';
  
  const breakdown = {
    discriminant,
    root1,
    root2,
    vertex,
    nature,
    concavity,
    coefficients: { a, b, c }
  };
  
  let message = '';
  if (nature === 'two_real_distinct') {
    message = `A equação possui duas raízes reais distintas: x₁ = ${root1?.toFixed(4)} e x₂ = ${root2?.toFixed(4)}`;
  } else if (nature === 'two_real_equal') {
    message = `A equação possui duas raízes reais iguais: x = ${root1?.toFixed(4)}`;
  } else {
    message = 'A equação não possui raízes reais (Δ < 0)';
  }
  
  return {
    value: discriminant,
    isValid: true,
    message,
    breakdown,
    additionalInfo: {
      'Discriminante (Δ)': `${discriminant.toFixed(4)}`,
      'Vértice da Parábola': `(${vertex.x.toFixed(4)}, ${vertex.y.toFixed(4)})`,
      'Concavidade': concavity === 'up' ? 'Para cima (a > 0)' : 'Para baixo (a < 0)',
      'Natureza das Raízes': nature === 'two_real_distinct' ? 'Duas raízes reais distintas' : 
                           nature === 'two_real_equal' ? 'Duas raízes reais iguais' : 
                           'Sem raízes reais',
    }
  };
};

// Parabola graph component
const ParabolaGraph: React.FC<{ result: BhaskaraResult }> = ({ result }) => {
  const theme = useTheme();
  const { a, b, c } = result.breakdown.coefficients;
  const { vertex, root1, root2 } = result.breakdown;
  
  // Generate points for the parabola
  const generateParabolaPoints = useMemo(() => {
    const points: string[] = [];
    const centerX = vertex.x;
    const range = Math.max(Math.abs(centerX) + 5, 10);
    const step = range / 50;
    
    for (let x = centerX - range; x <= centerX + range; x += step) {
      const y = a * x * x + b * x + c;
      const screenX = (x - (centerX - range)) * (300 / (2 * range));
      const screenY = 200 - ((y - vertex.y) * (150 / Math.max(Math.abs(vertex.y) + 5, 10)));
      points.push(`${screenX},${screenY}`);
    }
    
    return points.join(' ');
  }, [a, b, c, vertex]);
  
  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📈 Gráfico da Parábola
      </Typography>
      <Box sx={{ 
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 2,
        backgroundColor: '#fafafa',
        overflow: 'auto'
      }}>
        <svg width="320" height="220" viewBox="0 0 320 220" style={{ maxWidth: '100%' }}>
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Axes */}
          <line x1="160" y1="0" x2="160" y2="220" stroke="#666" strokeWidth="2" />
          <line x1="0" y1="110" x2="320" y2="110" stroke="#666" strokeWidth="2" />
          
          {/* Parabola */}
          <polyline
            points={generateParabolaPoints}
            fill="none"
            stroke={theme.palette.primary.main}
            strokeWidth="3"
          />
          
          {/* Vertex point */}
          <circle
            cx="150"
            cy="110"
            r="4"
            fill={theme.palette.secondary.main}
            stroke="#fff"
            strokeWidth="2"
          />
          
          {/* Root points */}
          {root1 !== null && (
            <circle
              cx={150 + (root1 - vertex.x) * 10}
              cy="110"
              r="3"
              fill={theme.palette.error.main}
              stroke="#fff"
              strokeWidth="1"
            />
          )}
          {root2 !== null && root2 !== root1 && (
            <circle
              cx={150 + (root2 - vertex.x) * 10}
              cy="110"
              r="3"
              fill={theme.palette.error.main}
              stroke="#fff"
              strokeWidth="1"
            />
          )}
          
          {/* Labels */}
          <text x="165" y="115" fontSize="12" fill="#666">0</text>
          <text x="165" y="20" fontSize="12" fill="#666">y</text>
          <text x="300" y="125" fontSize="12" fill="#666">x</text>
        </svg>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 12, 
              height: 3, 
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1
            }} />
            <Typography variant="caption">Parábola</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '50%'
            }} />
            <Typography variant="caption">Vértice</Typography>
          </Box>
          {(root1 !== null || root2 !== null) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 6, 
                height: 6, 
                backgroundColor: theme.palette.error.main,
                borderRadius: '50%'
              }} />
              <Typography variant="caption">Raízes</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Step-by-step solution component
const StepByStepSolution: React.FC<{ result: BhaskaraResult }> = ({ result }) => {
  const theme = useTheme();
  const { a, b, c } = result.breakdown.coefficients;
  const { discriminant, root1, root2, nature } = result.breakdown;
  
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📝 Resolução Passo a Passo
      </Typography>
      
      <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Equação: {a}x² {b >= 0 ? ' + ' : ' '}({b})x {c >= 0 ? ' + ' : ' '}({c}) = 0
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
          1️⃣ Identificar os coeficientes:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
          a = {a}, b = {b}, c = {c}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
          2️⃣ Calcular o discriminante (Δ):
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
          Δ = b² - 4ac
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
          Δ = ({b})² - 4({a})({c}) = {b * b} - {4 * a * c} = {discriminant}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
          3️⃣ Analisar a natureza das raízes:
        </Typography>
        {nature === 'two_real_distinct' && (
          <>
            <Alert severity="success" sx={{ mb: 2 }}>
              Δ = {discriminant} &gt; 0 → A equação possui duas raízes reais distintas
            </Alert>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              4️⃣ Aplicar a fórmula de Bhaskara:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
              x = (-b ± √Δ) / (2a)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
              x₁ = (-{b} + √{discriminant}) / (2·{a}) = {root1?.toFixed(4)}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
              x₂ = (-{b} - √{discriminant}) / (2·{a}) = {root2?.toFixed(4)}
            </Typography>
          </>
        )}
        
        {nature === 'two_real_equal' && (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              Δ = {discriminant} = 0 → A equação possui duas raízes reais iguais
            </Alert>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              4️⃣ Aplicar a fórmula de Bhaskara:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
              x = -b / (2a)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: '#fff', p: 1, borderRadius: 1 }}>
              x = -{b} / (2·{a}) = {root1?.toFixed(4)}
            </Typography>
          </>
        )}
        
        {nature === 'no_real_roots' && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Δ = {discriminant} &lt; 0 → A equação não possui raízes reais
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

// Main result display component
const BhaskaraResultDisplay: React.FC<{ result: BhaskaraResult }> = ({ result }) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado da Equação do 2º Grau
      </Typography>
      
      <ParabolaGraph result={result} />
      <StepByStepSolution result={result} />
    </Box>
  );
};

const BhaskaraCalculator: React.FC = () => {
  const theme = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: BhaskaraState = {
    coefficientA: '',
    coefficientB: '',
    coefficientC: '',
  };

  const validate = (state: BhaskaraState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    if (!state.coefficientA) {
      return { valid: false, error: 'Informe o coeficiente a' };
    }

    const aValue = parseFloat(state.coefficientA);
    if (isNaN(aValue) || aValue === 0) {
      return { valid: false, error: 'O coeficiente a deve ser diferente de zero' };
    }

    const aValid = validateNumberInput(state.coefficientA, -1000000, 1000000);
    if (!aValid.valid) {
      return { valid: false, error: aValid.error };
    }

    if (state.coefficientB && !validateNumberInput(state.coefficientB, -1000000, 1000000).valid) {
      return { valid: false, error: 'Coeficiente b inválido' };
    }

    if (state.coefficientC && !validateNumberInput(state.coefficientC, -1000000, 1000000).valid) {
      return { valid: false, error: 'Coeficiente c inválido' };
    }

    return { valid: true };
  };

  const calculate = (state: BhaskaraState): BhaskaraResult | null => {
    return calculateBhaskara(state, theme);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof BhaskaraState, value: string) => {
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
        title="Calculadora de Equação do 2º Grau (Bhaskara)"
        description="Resolva equações quadráticas usando a fórmula de Bhaskara. Visualize o gráfico da parábola e acompanhe a resolução passo a passo."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {state.coefficientA || state.coefficientB || state.coefficientC ? (
              <>
                Equação: {state.coefficientA || 'a'}x² {state.coefficientB ? (parseFloat(state.coefficientB) >= 0 ? '+' : '') + state.coefficientB : (state.coefficientB === '' ? '+ b' : '')}x {state.coefficientC ? (parseFloat(state.coefficientC) >= 0 ? '+' : '') + state.coefficientC : (state.coefficientC === '' ? '+ c' : '')} = 0
              </>
            ) : (
              'Equação: ax² + bx + c = 0'
            )}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CalculatorInput
            label="Coeficiente a"
            value={state.coefficientA}
            onChange={(value) => handleFieldUpdate('coefficientA', value)}
            type="number"
            error={hasInteracted && !!validation.error}
            helperText={hasInteracted && validation.error ? validation.error : 'Coeficiente de x² (deve ser ≠ 0)'}
            inputProps={{ step: 0.01, min: undefined }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CalculatorInput
            label="Coeficiente b"
            value={state.coefficientB}
            onChange={(value) => handleFieldUpdate('coefficientB', value)}
            type="number"
            helperText="Coeficiente de x (opcional)"
            inputProps={{ step: 0.01, min: undefined }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CalculatorInput
            label="Coeficiente c"
            value={state.coefficientC}
            onChange={(value) => handleFieldUpdate('coefficientC', value)}
            type="number"
            helperText="Termo independente (opcional)"
            inputProps={{ step: 0.01, min: undefined }}
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <BhaskaraResultDisplay result={result as BhaskaraResult} />
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

export default BhaskaraCalculator;