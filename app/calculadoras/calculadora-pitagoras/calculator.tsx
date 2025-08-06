'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Grid, Typography, Paper, Divider, Box, Alert, Button, ButtonGroup, MenuItem, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

type CalculationType = 'find_hypotenuse' | 'find_cateto_a' | 'find_cateto_b';

interface PythagoreanState {
  calculationType: CalculationType;
  catetoA: string;
  catetoB: string;
  hypotenuse: string;
}

interface PythagoreanResult extends CalculatorResultType {
  breakdown: {
    calculationType: string;
    catetoA: number;
    catetoB: number;
    hypotenuse: number;
    formula: string;
    calculations: string[];
    triangleData: {
      perimeter: number;
      area: number;
      angles: {
        angleA: number;
        angleB: number;
        angleC: number;
      };
    };
    practicalApplications: string[];
  };
}

// Calculation types with descriptions
const CALCULATION_TYPES: { [key in CalculationType]: {
  name: string;
  description: string;
  formula: string;
  requiredFields: string[];
}} = {
  find_hypotenuse: {
    name: 'Calcular Hipotenusa',
    description: 'Encontrar a hipotenusa conhecendo os dois catetos',
    formula: 'c² = a² + b² → c = √(a² + b²)',
    requiredFields: ['catetoA', 'catetoB']
  },
  find_cateto_a: {
    name: 'Calcular Cateto A',
    description: 'Encontrar o cateto A conhecendo o cateto B e a hipotenusa',
    formula: 'a² = c² - b² → a = √(c² - b²)',
    requiredFields: ['catetoB', 'hypotenuse']
  },
  find_cateto_b: {
    name: 'Calcular Cateto B',
    description: 'Encontrar o cateto B conhecendo o cateto A e a hipotenusa',
    formula: 'b² = c² - a² → b = √(c² - a²)',
    requiredFields: ['catetoA', 'hypotenuse']
  }
};

// Field configurations
const FIELD_CONFIG = {
  catetoA: { label: 'Cateto A', placeholder: 'Digite o valor do cateto A', unit: 'unidades' },
  catetoB: { label: 'Cateto B', placeholder: 'Digite o valor do cateto B', unit: 'unidades' },
  hypotenuse: { label: 'Hipotenusa', placeholder: 'Digite o valor da hipotenusa', unit: 'unidades' },
};

// Main calculation function
const calculatePythagorean = (state: PythagoreanState): PythagoreanResult | null => {
  const calcType = CALCULATION_TYPES[state.calculationType];
  
  // Parse values
  const catetoAValue = parseFloat(state.catetoA) || 0;
  const catetoBValue = parseFloat(state.catetoB) || 0;
  const hypotenuseValue = parseFloat(state.hypotenuse) || 0;

  let finalCatetoA: number;
  let finalCatetoB: number;
  let finalHypotenuse: number;
  
  const calculations: string[] = [];
  
  switch (state.calculationType) {
    case 'find_hypotenuse':
      if (catetoAValue <= 0 || catetoBValue <= 0) return null;
      finalCatetoA = catetoAValue;
      finalCatetoB = catetoBValue;
      finalHypotenuse = Math.sqrt(Math.pow(catetoAValue, 2) + Math.pow(catetoBValue, 2));
      
      calculations.push('1. Aplicando o Teorema de Pitágoras:');
      calculations.push(`   c² = a² + b²`);
      calculations.push(`   c² = ${catetoAValue}² + ${catetoBValue}²`);
      calculations.push(`   c² = ${Math.pow(catetoAValue, 2)} + ${Math.pow(catetoBValue, 2)}`);
      calculations.push(`   c² = ${Math.pow(catetoAValue, 2) + Math.pow(catetoBValue, 2)}`);
      calculations.push(`   c = √${Math.pow(catetoAValue, 2) + Math.pow(catetoBValue, 2)}`);
      calculations.push(`   c = ${finalHypotenuse.toFixed(4)}`);
      break;
      
    case 'find_cateto_a':
      if (catetoBValue <= 0 || hypotenuseValue <= 0 || hypotenuseValue <= catetoBValue) return null;
      finalCatetoA = Math.sqrt(Math.pow(hypotenuseValue, 2) - Math.pow(catetoBValue, 2));
      finalCatetoB = catetoBValue;
      finalHypotenuse = hypotenuseValue;
      
      calculations.push('1. Rearranjando o Teorema de Pitágoras:');
      calculations.push(`   c² = a² + b² → a² = c² - b²`);
      calculations.push(`   a² = ${hypotenuseValue}² - ${catetoBValue}²`);
      calculations.push(`   a² = ${Math.pow(hypotenuseValue, 2)} - ${Math.pow(catetoBValue, 2)}`);
      calculations.push(`   a² = ${Math.pow(hypotenuseValue, 2) - Math.pow(catetoBValue, 2)}`);
      calculations.push(`   a = √${Math.pow(hypotenuseValue, 2) - Math.pow(catetoBValue, 2)}`);
      calculations.push(`   a = ${finalCatetoA.toFixed(4)}`);
      break;
      
    case 'find_cateto_b':
      if (catetoAValue <= 0 || hypotenuseValue <= 0 || hypotenuseValue <= catetoAValue) return null;
      finalCatetoA = catetoAValue;
      finalCatetoB = Math.sqrt(Math.pow(hypotenuseValue, 2) - Math.pow(catetoAValue, 2));
      finalHypotenuse = hypotenuseValue;
      
      calculations.push('1. Rearranjando o Teorema de Pitágoras:');
      calculations.push(`   c² = a² + b² → b² = c² - a²`);
      calculations.push(`   b² = ${hypotenuseValue}² - ${catetoAValue}²`);
      calculations.push(`   b² = ${Math.pow(hypotenuseValue, 2)} - ${Math.pow(catetoAValue, 2)}`);
      calculations.push(`   b² = ${Math.pow(hypotenuseValue, 2) - Math.pow(catetoAValue, 2)}`);
      calculations.push(`   b = √${Math.pow(hypotenuseValue, 2) - Math.pow(catetoAValue, 2)}`);
      calculations.push(`   b = ${finalCatetoB.toFixed(4)}`);
      break;
      
    default:
      return null;
  }

  // Calculate triangle properties
  const perimeter = finalCatetoA + finalCatetoB + finalHypotenuse;
  const area = (finalCatetoA * finalCatetoB) / 2;
  
  // Calculate angles using trigonometry
  const angleA = Math.atan(finalCatetoA / finalCatetoB) * (180 / Math.PI); // angle opposite to cateto A
  const angleB = Math.atan(finalCatetoB / finalCatetoA) * (180 / Math.PI); // angle opposite to cateto B
  const angleC = 90; // right angle

  calculations.push('2. Propriedades do Triângulo:');
  calculations.push(`   Perímetro = ${finalCatetoA.toFixed(4)} + ${finalCatetoB.toFixed(4)} + ${finalHypotenuse.toFixed(4)} = ${perimeter.toFixed(4)}`);
  calculations.push(`   Área = (cateto A × cateto B) ÷ 2 = ${area.toFixed(4)}`);
  calculations.push(`   Ângulo A = arctan(${finalCatetoA.toFixed(4)}/${finalCatetoB.toFixed(4)}) = ${angleA.toFixed(2)}°`);
  calculations.push(`   Ângulo B = arctan(${finalCatetoB.toFixed(4)}/${finalCatetoA.toFixed(4)}) = ${angleB.toFixed(2)}°`);
  calculations.push(`   Ângulo C = 90° (ângulo reto)`);

  // Practical applications
  const practicalApplications = [
    `Construção: Para criar um ângulo reto, use medidas 3-4-5 ou múltiplos (${(finalCatetoA * 3/finalCatetoA).toFixed(1)}-${(finalCatetoB * 4/finalCatetoB).toFixed(1)}-${(finalHypotenuse * 5/finalHypotenuse).toFixed(1)})`,
    `Navegação: Distância direta entre dois pontos é ${finalHypotenuse.toFixed(2)} quando os deslocamentos perpendiculares são ${finalCatetoA.toFixed(2)} e ${finalCatetoB.toFixed(2)}`,
    `Arquitetura: Diagonal de retângulo ${finalCatetoA.toFixed(2)} × ${finalCatetoB.toFixed(2)} mede ${finalHypotenuse.toFixed(2)}`,
    `Física: Resultante de forças perpendiculares de ${finalCatetoA.toFixed(2)}N e ${finalCatetoB.toFixed(2)}N é ${finalHypotenuse.toFixed(2)}N`
  ];

  const result: PythagoreanResult = {
    value: state.calculationType === 'find_hypotenuse' ? finalHypotenuse : 
           state.calculationType === 'find_cateto_a' ? finalCatetoA : finalCatetoB,
    isValid: true,
    message: `${calcType.name}: ${
      state.calculationType === 'find_hypotenuse' ? `c = ${finalHypotenuse.toFixed(4)}` :
      state.calculationType === 'find_cateto_a' ? `a = ${finalCatetoA.toFixed(4)}` : 
      `b = ${finalCatetoB.toFixed(4)}`
    }`,
    breakdown: {
      calculationType: calcType.name,
      catetoA: finalCatetoA,
      catetoB: finalCatetoB,
      hypotenuse: finalHypotenuse,
      formula: calcType.formula,
      calculations,
      triangleData: {
        perimeter,
        area,
        angles: {
          angleA,
          angleB,
          angleC
        }
      },
      practicalApplications
    },
    additionalInfo: {
      'Tipo de Cálculo': calcType.name,
      'Cateto A': `${finalCatetoA.toFixed(4)} unidades`,
      'Cateto B': `${finalCatetoB.toFixed(4)} unidades`,
      'Hipotenusa': `${finalHypotenusa.toFixed(4)} unidades`,
      'Perímetro': `${perimeter.toFixed(4)} unidades`,
      'Área': `${area.toFixed(4)} unidades²`
    }
  };

  return result;
};

// Triangle visualization component
const TriangleVisualization: React.FC<{ result: PythagoreanResult }> = ({ result }) => {
  const theme = useTheme();
  
  // Scale the triangle for display
  const maxSide = Math.max(result.breakdown.catetoA, result.breakdown.catetoB, result.breakdown.hypotenuse);
  const scale = 120 / maxSide;
  
  const displayCatetoA = result.breakdown.catetoA * scale;
  const displayCatetoB = result.breakdown.catetoB * scale;
  const displayHypotenuse = result.breakdown.hypotenuse * scale;
  
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
        🔺 Visualização do Triângulo Retângulo
      </Typography>
      
      <Box sx={{ p: 2, display: 'inline-block', backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <svg width="200" height="180" viewBox="0 0 200 180">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={theme.palette.primary.main} />
            </marker>
          </defs>
          
          {/* Triangle */}
          <polygon 
            points={`40,140 ${40 + displayCatetoB},140 40,${140 - displayCatetoA}`}
            fill="rgba(25, 118, 210, 0.1)" 
            stroke={theme.palette.primary.main} 
            strokeWidth="2"
          />
          
          {/* Right angle indicator */}
          <path 
            d={`M ${40 + 12} 140 L ${40 + 12} ${140 - 12} L 40 ${140 - 12}`}
            fill="none" 
            stroke={theme.palette.primary.main} 
            strokeWidth="1"
          />
          
          {/* Labels and measurements */}
          {/* Cateto A (vertical) */}
          <line 
            x1="25" y1="140" 
            x2="25" y2={140 - displayCatetoA}
            stroke={theme.palette.secondary.main} 
            strokeWidth="1"
            markerEnd="url(#arrowhead)"
          />
          <line 
            x1="25" y1={140 - displayCatetoA} 
            x2="25" y2="140"
            stroke={theme.palette.secondary.main} 
            strokeWidth="1"
            markerEnd="url(#arrowhead)"
          />
          <text x="15" y={140 - displayCatetoA/2} textAnchor="middle" fontSize="12" fill={theme.palette.secondary.main}>
            a = {result.breakdown.catetoA.toFixed(2)}
          </text>
          
          {/* Cateto B (horizontal) */}
          <line 
            x1="40" y1="155" 
            x2={40 + displayCatetoB} y2="155"
            stroke={theme.palette.secondary.main} 
            strokeWidth="1"
            markerEnd="url(#arrowhead)"
          />
          <line 
            x1={40 + displayCatetoB} y1="155" 
            x2="40" y2="155"
            stroke={theme.palette.secondary.main} 
            strokeWidth="1"
            markerEnd="url(#arrowhead)"
          />
          <text x={40 + displayCatetoB/2} y="170" textAnchor="middle" fontSize="12" fill={theme.palette.secondary.main}>
            b = {result.breakdown.catetoB.toFixed(2)}
          </text>
          
          {/* Hypotenuse */}
          <text 
            x={40 + displayCatetoB/2 - 15} 
            y={140 - displayCatetoA/2 + 15} 
            textAnchor="middle" 
            fontSize="12" 
            fill={theme.palette.primary.main}
            fontWeight="bold"
          >
            c = {result.breakdown.hypotenuse.toFixed(2)}
          </text>
          
          {/* Angle labels */}
          <text x="50" y="135" fontSize="10" fill={theme.palette.text.secondary}>
            {result.breakdown.triangleData.angles.angleA.toFixed(1)}°
          </text>
          <text x={40 + displayCatetoB - 15} y="135" fontSize="10" fill={theme.palette.text.secondary}>
            {result.breakdown.triangleData.angles.angleB.toFixed(1)}°
          </text>
          <text x="45" y={140 - displayCatetoA + 10} fontSize="10" fill={theme.palette.text.secondary}>
            90°
          </text>
        </svg>
        
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography variant="caption" sx={{ display: 'block' }}>
            <strong>Perímetro:</strong> {result.breakdown.triangleData.perimeter.toFixed(4)} u
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            <strong>Área:</strong> {result.breakdown.triangleData.area.toFixed(4)} u²
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Step-by-step solution component
const StepByStepSolution: React.FC<{ result: PythagoreanResult }> = ({ result }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📝 Resolução Passo a Passo
      </Typography>
      
      <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {result.breakdown.calculationType}
        </Typography>
        
        <Box sx={{ mb: 2, p: 2, backgroundColor: '#fff', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Fórmula Utilizada:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: theme => theme.palette.primary.main }}>
            {result.breakdown.formula}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {result.breakdown.calculations.map((step, index) => (
          <Typography 
            key={index}
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontFamily: step.includes('=') || step.includes('√') || step.includes('²') ? 'monospace' : 'inherit',
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
      </Box>
    </Box>
  );
};

// Practical applications component
const PracticalApplications: React.FC<{ result: PythagoreanResult }> = ({ result }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        🔧 Aplicações Práticas
      </Typography>
      
      <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        {result.breakdown.practicalApplications.map((application, index) => (
          <Alert key={index} severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              {application}
            </Typography>
          </Alert>
        ))}
      </Box>
    </Box>
  );
};

// Main result display component
const PythagoreanResultDisplay: React.FC<{ result: PythagoreanResult }> = ({ result }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ p: 3, backgroundColor: '#ffffff' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado: {result.breakdown.calculationType}
      </Typography>
      
      {/* Triangle visualization */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TriangleVisualization result={result} />
        </Box>
      </Box>
      
      <StepByStepSolution result={result} />
      <PracticalApplications result={result} />
    </Paper>
  );
};

const PythagoreanCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: PythagoreanState = {
    calculationType: 'find_hypotenuse',
    catetoA: '',
    catetoB: '',
    hypotenuse: '',
  };

  const validate = (state: PythagoreanState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    const calcType = CALCULATION_TYPES[state.calculationType];
    
    // Check if all required fields are filled
    const hasAllData = calcType.requiredFields.every(field => {
      const value = state[field as keyof PythagoreanState];
      return value && parseFloat(value) > 0;
    });
    
    if (!hasAllData) {
      return { 
        valid: false, 
        error: `Preencha todos os campos necessários para ${calcType.name.toLowerCase()}` 
      };
    }

    // Validate triangle inequality for catetos finding
    if (state.calculationType === 'find_cateto_a' || state.calculationType === 'find_cateto_b') {
      const hyp = parseFloat(state.hypotenuse);
      const knownCateto = parseFloat(state.calculationType === 'find_cateto_a' ? state.catetoB : state.catetoA);
      
      if (hyp <= knownCateto) {
        return { 
          valid: false, 
          error: 'A hipotenusa deve ser maior que o cateto conhecido' 
        };
      }
    }

    return { valid: true };
  };

  const calculate = (state: PythagoreanState): PythagoreanResult | null => {
    return calculatePythagorean(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof PythagoreanState, value: string | CalculationType) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (field === 'calculationType') {
      updateField(field, value as CalculationType);
    } else {
      // Only allow positive numbers with decimals
      const sanitized = value.toString().replace(/[^0-9.]/g, '');
      updateField(field, sanitized);
    }
  }, [hasInteracted, updateField]);

  const handleClearWithReset = useCallback(() => {
    handleClear();
    setHasInteracted(false);
  }, [handleClear]);

  const currentCalcType = CALCULATION_TYPES[state.calculationType];

  return (
    <>
      <CalculatorHeader
        title="Calculadora do Teorema de Pitágoras"
        description="Calcule hipotenusa, catetos e propriedades de triângulos retângulos com visualização e aplicações práticas."
      />

      <Grid container spacing={3}>
        {/* Calculation type selection */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Tipo de Cálculo
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {Object.entries(CALCULATION_TYPES).map(([key, calcType]) => (
                <Button
                  key={key}
                  variant={state.calculationType === key ? 'contained' : 'outlined'}
                  onClick={() => handleFieldUpdate('calculationType', key as CalculationType)}
                  sx={{ minWidth: 180, textAlign: 'center', mb: 1 }}
                >
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {calcType.name}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block' }}>
                      {calcType.description}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Formula info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {currentCalcType.name} - {currentCalcType.description}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              <strong>Fórmula:</strong> {currentCalcType.formula}
            </Typography>
          </Alert>
        </Grid>

        {/* Input fields based on calculation type */}
        {currentCalcType.requiredFields.map((field) => {
          const fieldConfig = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG];
          const value = state[field as keyof PythagoreanState] || '';
          
          return (
            <Grid key={field} size={{ xs: 12, sm: 6, md: 4 }}>
              <CalculatorInput
                label={fieldConfig.label}
                value={value}
                onChange={(value) => handleFieldUpdate(field as keyof PythagoreanState, value)}
                type="number"
                error={hasInteracted && !!validation.error}
                helperText={fieldConfig.placeholder}
                inputProps={{ min: 0, step: 0.01 }}
                allowDecimals={true}
              />
            </Grid>
          );
        })}
        
        {hasInteracted && validation.error && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">
              {validation.error}
            </Alert>
          </Grid>
        )}

        {result && (
          <Grid size={{ xs: 12 }}>
            <PythagoreanResultDisplay result={result as PythagoreanResult} />
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

export default PythagoreanCalculator;