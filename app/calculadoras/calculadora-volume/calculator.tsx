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

type SolidType = 'sphere' | 'cylinder' | 'cone' | 'cube' | 'rectangular_prism' | 'triangular_prism' | 'pyramid' | 'ellipsoid' | 'torus';

interface VolumeState {
  solid: SolidType;
  // Sphere
  sphereRadius?: string;
  // Cylinder
  cylinderRadius?: string;
  cylinderHeight?: string;
  // Cone
  coneRadius?: string;
  coneHeight?: string;
  // Cube
  cubeSide?: string;
  // Rectangular Prism
  prismLength?: string;
  prismWidth?: string;
  prismHeight?: string;
  // Triangular Prism
  triangleBase?: string;
  triangleHeight?: string;
  trianglePrismHeight?: string;
  // Pyramid
  pyramidBaseArea?: string;
  pyramidHeight?: string;
  // Ellipsoid
  ellipsoidA?: string;
  ellipsoidB?: string;
  ellipsoidC?: string;
  // Torus
  torusMajorRadius?: string;
  torusMinorRadius?: string;
}

interface VolumeResult extends CalculatorResultType {
  breakdown: {
    solid: string;
    volume: number;
    surfaceArea?: number;
    formulas: {
      volumeFormula: string;
      surfaceAreaFormula?: string;
    };
    calculations: string[];
    measurements: { [key: string]: number };
    unit: string;
  };
}

// Solid definitions with formulas and field requirements
const SOLIDS: { [key in SolidType]: {
  name: string;
  icon: string;
  fields: string[];
  volumeFormula: (values: any) => number;
  surfaceAreaFormula?: (values: any) => number;
  volumeFormulaText: string;
  surfaceAreaFormulaText?: string;
  description: string;
}} = {
  sphere: {
    name: 'Esfera',
    icon: '⚪',
    fields: ['sphereRadius'],
    volumeFormula: (v) => (4/3) * Math.PI * Math.pow(parseFloat(v.sphereRadius || '0'), 3),
    surfaceAreaFormula: (v) => 4 * Math.PI * Math.pow(parseFloat(v.sphereRadius || '0'), 2),
    volumeFormulaText: 'V = (4/3) × π × r³',
    surfaceAreaFormulaText: 'A = 4 × π × r²',
    description: 'Sólido geométrico perfeitamente redondo'
  },
  cylinder: {
    name: 'Cilindro',
    icon: '🥫',
    fields: ['cylinderRadius', 'cylinderHeight'],
    volumeFormula: (v) => Math.PI * Math.pow(parseFloat(v.cylinderRadius || '0'), 2) * parseFloat(v.cylinderHeight || '0'),
    surfaceAreaFormula: (v) => 2 * Math.PI * parseFloat(v.cylinderRadius || '0') * (parseFloat(v.cylinderRadius || '0') + parseFloat(v.cylinderHeight || '0')),
    volumeFormulaText: 'V = π × r² × h',
    surfaceAreaFormulaText: 'A = 2πr(r + h)',
    description: 'Sólido com base circular e altura constante'
  },
  cone: {
    name: 'Cone',
    icon: '🔺',
    fields: ['coneRadius', 'coneHeight'],
    volumeFormula: (v) => (1/3) * Math.PI * Math.pow(parseFloat(v.coneRadius || '0'), 2) * parseFloat(v.coneHeight || '0'),
    surfaceAreaFormula: (v) => {
      const r = parseFloat(v.coneRadius || '0');
      const h = parseFloat(v.coneHeight || '0');
      const l = Math.sqrt(r*r + h*h); // slant height
      return Math.PI * r * (r + l);
    },
    volumeFormulaText: 'V = (1/3) × π × r² × h',
    surfaceAreaFormulaText: 'A = πr(r + l), onde l = √(r² + h²)',
    description: 'Sólido com base circular que afunila até um ponto'
  },
  cube: {
    name: 'Cubo',
    icon: '⬜',
    fields: ['cubeSide'],
    volumeFormula: (v) => Math.pow(parseFloat(v.cubeSide || '0'), 3),
    surfaceAreaFormula: (v) => 6 * Math.pow(parseFloat(v.cubeSide || '0'), 2),
    volumeFormulaText: 'V = a³',
    surfaceAreaFormulaText: 'A = 6a²',
    description: 'Sólido com seis faces quadradas iguais'
  },
  rectangular_prism: {
    name: 'Paralelepípedo',
    icon: '📦',
    fields: ['prismLength', 'prismWidth', 'prismHeight'],
    volumeFormula: (v) => parseFloat(v.prismLength || '0') * parseFloat(v.prismWidth || '0') * parseFloat(v.prismHeight || '0'),
    surfaceAreaFormula: (v) => {
      const l = parseFloat(v.prismLength || '0');
      const w = parseFloat(v.prismWidth || '0');
      const h = parseFloat(v.prismHeight || '0');
      return 2 * (l*w + l*h + w*h);
    },
    volumeFormulaText: 'V = comprimento × largura × altura',
    surfaceAreaFormulaText: 'A = 2(cl + ch + lh)',
    description: 'Sólido com seis faces retangulares'
  },
  triangular_prism: {
    name: 'Prisma Triangular',
    icon: '🔺📏',
    fields: ['triangleBase', 'triangleHeight', 'trianglePrismHeight'],
    volumeFormula: (v) => (parseFloat(v.triangleBase || '0') * parseFloat(v.triangleHeight || '0') / 2) * parseFloat(v.trianglePrismHeight || '0'),
    volumeFormulaText: 'V = (base × altura_triângulo / 2) × altura_prisma',
    description: 'Prisma com base triangular'
  },
  pyramid: {
    name: 'Pirâmide',
    icon: '🔺',
    fields: ['pyramidBaseArea', 'pyramidHeight'],
    volumeFormula: (v) => (1/3) * parseFloat(v.pyramidBaseArea || '0') * parseFloat(v.pyramidHeight || '0'),
    volumeFormulaText: 'V = (1/3) × área_base × altura',
    description: 'Sólido com base poligonal que converge para um ponto'
  },
  ellipsoid: {
    name: 'Elipsoide',
    icon: '🥚',
    fields: ['ellipsoidA', 'ellipsoidB', 'ellipsoidC'],
    volumeFormula: (v) => (4/3) * Math.PI * parseFloat(v.ellipsoidA || '0') * parseFloat(v.ellipsoidB || '0') * parseFloat(v.ellipsoidC || '0'),
    volumeFormulaText: 'V = (4/3) × π × a × b × c',
    description: 'Esfera achatada com três semi-eixos diferentes'
  },
  torus: {
    name: 'Toro (Rosquinha)',
    icon: '🍩',
    fields: ['torusMajorRadius', 'torusMinorRadius'],
    volumeFormula: (v) => 2 * Math.pow(Math.PI, 2) * parseFloat(v.torusMajorRadius || '0') * Math.pow(parseFloat(v.torusMinorRadius || '0'), 2),
    surfaceAreaFormula: (v) => 4 * Math.pow(Math.PI, 2) * parseFloat(v.torusMajorRadius || '0') * parseFloat(v.torusMinorRadius || '0'),
    volumeFormulaText: 'V = 2π² × R × r²',
    surfaceAreaFormulaText: 'A = 4π² × R × r',
    description: 'Sólido em forma de rosquinha ou pneu'
  }
};

// Field labels and placeholders
const FIELD_CONFIG = {
  sphereRadius: { label: 'Raio', placeholder: 'Digite o raio da esfera', unit: 'unidades' },
  cylinderRadius: { label: 'Raio da Base', placeholder: 'Digite o raio da base', unit: 'unidades' },
  cylinderHeight: { label: 'Altura', placeholder: 'Digite a altura do cilindro', unit: 'unidades' },
  coneRadius: { label: 'Raio da Base', placeholder: 'Digite o raio da base', unit: 'unidades' },
  coneHeight: { label: 'Altura', placeholder: 'Digite a altura do cone', unit: 'unidades' },
  cubeSide: { label: 'Lado', placeholder: 'Digite o lado do cubo', unit: 'unidades' },
  prismLength: { label: 'Comprimento', placeholder: 'Digite o comprimento', unit: 'unidades' },
  prismWidth: { label: 'Largura', placeholder: 'Digite a largura', unit: 'unidades' },
  prismHeight: { label: 'Altura', placeholder: 'Digite a altura', unit: 'unidades' },
  triangleBase: { label: 'Base do Triângulo', placeholder: 'Digite a base do triângulo', unit: 'unidades' },
  triangleHeight: { label: 'Altura do Triângulo', placeholder: 'Digite a altura do triângulo', unit: 'unidades' },
  trianglePrismHeight: { label: 'Altura do Prisma', placeholder: 'Digite a altura do prisma', unit: 'unidades' },
  pyramidBaseArea: { label: 'Área da Base', placeholder: 'Digite a área da base', unit: 'unidades²' },
  pyramidHeight: { label: 'Altura', placeholder: 'Digite a altura da pirâmide', unit: 'unidades' },
  ellipsoidA: { label: 'Semi-eixo A', placeholder: 'Digite o semi-eixo A', unit: 'unidades' },
  ellipsoidB: { label: 'Semi-eixo B', placeholder: 'Digite o semi-eixo B', unit: 'unidades' },
  ellipsoidC: { label: 'Semi-eixo C', placeholder: 'Digite o semi-eixo C', unit: 'unidades' },
  torusMajorRadius: { label: 'Raio Maior (R)', placeholder: 'Digite o raio maior', unit: 'unidades' },
  torusMinorRadius: { label: 'Raio Menor (r)', placeholder: 'Digite o raio menor', unit: 'unidades' },
};

// Main calculation function
const calculateVolume = (state: VolumeState): VolumeResult | null => {
  const solid = SOLIDS[state.solid];
  
  // Get relevant field values
  const values: { [key: string]: string } = {};
  solid.fields.forEach(field => {
    values[field] = state[field as keyof VolumeState] || '';
  });

  // Check if all required fields are filled
  const hasAllData = solid.fields.every(field => values[field] && parseFloat(values[field]) > 0);
  
  if (!hasAllData) return null;

  const volume = solid.volumeFormula(values);
  const surfaceArea = solid.surfaceAreaFormula ? solid.surfaceAreaFormula(values) : undefined;
  
  // Generate step-by-step calculations
  const calculations = [];
  const measurements: { [key: string]: number } = {};
  
  // Add measurements
  solid.fields.forEach(field => {
    if (values[field] && parseFloat(values[field]) > 0) {
      measurements[FIELD_CONFIG[field as keyof typeof FIELD_CONFIG].label] = parseFloat(values[field]);
    }
  });
  
  calculations.push(`1. Cálculo do Volume:`);
  calculations.push(`   Fórmula: ${solid.volumeFormulaText}`);
  calculations.push(`   Substituindo valores: ${getVolumeCalculationText(state.solid, values)}`);
  calculations.push(`   Volume = ${volume.toFixed(4)} unidades³`);
  
  if (surfaceArea !== undefined) {
    calculations.push(`2. Cálculo da Área da Superfície:`);
    calculations.push(`   Fórmula: ${solid.surfaceAreaFormulaText}`);
    calculations.push(`   Área = ${surfaceArea.toFixed(4)} unidades²`);
  }

  return {
    value: volume,
    isValid: true,
    message: `${solid.name}: Volume = ${volume.toFixed(4)} u³${surfaceArea ? `, Área = ${surfaceArea.toFixed(4)} u²` : ''}`,
    breakdown: {
      solid: solid.name,
      volume: volume,
      surfaceArea: surfaceArea,
      formulas: {
        volumeFormula: solid.volumeFormulaText,
        surfaceAreaFormula: solid.surfaceAreaFormulaText
      },
      calculations,
      measurements,
      unit: 'unidades³'
    },
    additionalInfo: {
      'Sólido': solid.name,
      'Volume': `${volume.toFixed(4)} unidades³`,
      'Área da Superfície': surfaceArea ? `${surfaceArea.toFixed(4)} unidades²` : 'N/A',
      'Descrição': solid.description
    }
  };
};

// Generate calculation text for display
function getVolumeCalculationText(solid: SolidType, values: { [key: string]: string }): string {
  switch (solid) {
    case 'sphere': return `(4/3) × π × ${values.sphereRadius}³`;
    case 'cylinder': return `π × ${values.cylinderRadius}² × ${values.cylinderHeight}`;
    case 'cone': return `(1/3) × π × ${values.coneRadius}² × ${values.coneHeight}`;
    case 'cube': return `${values.cubeSide}³`;
    case 'rectangular_prism': return `${values.prismLength} × ${values.prismWidth} × ${values.prismHeight}`;
    case 'triangular_prism': return `(${values.triangleBase} × ${values.triangleHeight} ÷ 2) × ${values.trianglePrismHeight}`;
    case 'pyramid': return `(1/3) × ${values.pyramidBaseArea} × ${values.pyramidHeight}`;
    case 'ellipsoid': return `(4/3) × π × ${values.ellipsoidA} × ${values.ellipsoidB} × ${values.ellipsoidC}`;
    case 'torus': return `2π² × ${values.torusMajorRadius} × ${values.torusMinorRadius}²`;
    default: return '';
  }
}

// Visual representation component (3D-like effect)
const SolidVisualization: React.FC<{ solid: SolidType; measurements: { [key: string]: number } }> = ({ 
  solid, measurements 
}) => {
  const theme = useTheme();
  
  const renderSolid = () => {
    const baseSize = 120;
    const color = theme.palette.primary.main;
    const gradient = `url(#gradient-${solid})`;
    
    const GradientDefs = () => (
      <defs>
        <radialGradient id={`gradient-${solid}`} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor={theme.palette.primary.light} />
          <stop offset="100%" stopColor={theme.palette.primary.dark} />
        </radialGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
    );
    
    switch (solid) {
      case 'sphere':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <GradientDefs />
            <circle 
              cx="70" cy="60" r="35" 
              fill={gradient} 
              stroke={color} 
              strokeWidth="1"
              filter="url(#shadow)"
            />
            <ellipse cx="70" cy="50" rx="25" ry="10" fill="none" stroke={theme.palette.primary.light} strokeWidth="1" opacity="0.6" />
            <text x="70" y="115" textAnchor="middle" fontSize="12" fill={color}>
              Esfera
            </text>
          </svg>
        );
      case 'cylinder':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <GradientDefs />
            <ellipse cx="70" cy="95" rx="30" ry="8" fill={theme.palette.primary.dark} />
            <rect x="40" y="35" width="60" height="60" fill={gradient} stroke={color} strokeWidth="1" filter="url(#shadow)" />
            <ellipse cx="70" cy="35" rx="30" ry="8" fill={theme.palette.primary.light} stroke={color} strokeWidth="1" />
            <text x="70" y="125" textAnchor="middle" fontSize="12" fill={color}>
              Cilindro
            </text>
          </svg>
        );
      case 'cone':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <GradientDefs />
            <ellipse cx="70" cy="95" rx="30" ry="8" fill={theme.palette.primary.dark} />
            <polygon points="70,25 40,95 100,95" fill={gradient} stroke={color} strokeWidth="1" filter="url(#shadow)" />
            <ellipse cx="70" cy="95" rx="30" ry="8" fill="none" stroke={color} strokeWidth="1" />
            <text x="70" y="125" textAnchor="middle" fontSize="12" fill={color}>
              Cone
            </text>
          </svg>
        );
      case 'cube':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <GradientDefs />
            <polygon points="35,75 65,45 65,15 35,45" fill={theme.palette.primary.light} stroke={color} strokeWidth="1" />
            <polygon points="35,75 65,75 95,45 65,45" fill={theme.palette.primary.main} stroke={color} strokeWidth="1" />
            <polygon points="65,45 95,45 95,75 65,75" fill={gradient} stroke={color} strokeWidth="1" filter="url(#shadow)" />
            <text x="70" y="105" textAnchor="middle" fontSize="12" fill={color}>
              Cubo
            </text>
          </svg>
        );
      case 'rectangular_prism':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <GradientDefs />
            <polygon points="30,80 50,60 50,30 30,50" fill={theme.palette.primary.light} stroke={color} strokeWidth="1" />
            <polygon points="30,80 70,80 90,60 50,60" fill={theme.palette.primary.main} stroke={color} strokeWidth="1" />
            <polygon points="50,60 90,60 90,30 50,30" fill={gradient} stroke={color} strokeWidth="1" filter="url(#shadow)" />
            <text x="70" y="105" textAnchor="middle" fontSize="12" fill={color}>
              Paralelepípedo
            </text>
          </svg>
        );
      default:
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <GradientDefs />
            <circle cx="70" cy="60" r="35" fill={gradient} stroke={color} strokeWidth="2" filter="url(#shadow)" />
            <text x="70" y="67" textAnchor="middle" fontSize="24" fill="white" fontWeight="bold">
              3D
            </text>
            <text x="70" y="115" textAnchor="middle" fontSize="12" fill={color}>
              {SOLIDS[solid].name}
            </text>
          </svg>
        );
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ p: 2, display: 'inline-block', backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        {renderSolid()}
        {Object.keys(measurements).length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Medidas:
            </Typography>
            {Object.entries(measurements).map(([key, value]) => (
              <Typography key={key} variant="caption" sx={{ display: 'block' }}>
                {key}: {value}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Step-by-step solution component
const StepByStepSolution: React.FC<{ result: VolumeResult }> = ({ result }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📐 Resolução Passo a Passo
      </Typography>
      
      <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {result.breakdown.solid}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {result.breakdown.calculations.map((step, index) => (
          <Typography 
            key={index}
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontFamily: step.includes('=') || step.includes('×') || step.includes('÷') || step.includes('π') ? 'monospace' : 'inherit',
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
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Alert severity="success" sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Volume: {result.breakdown.volume.toFixed(4)} u³
            </Typography>
            <Typography variant="caption">
              {result.breakdown.formulas.volumeFormula}
            </Typography>
          </Alert>
          
          {result.breakdown.surfaceArea && (
            <Alert severity="info" sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Área: {result.breakdown.surfaceArea.toFixed(4)} u²
              </Typography>
              <Typography variant="caption">
                {result.breakdown.formulas.surfaceAreaFormula}
              </Typography>
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Main result display component
const VolumeResultDisplay: React.FC<{ result: VolumeResult; solid: SolidType }> = ({ result, solid }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ p: 3, backgroundColor: '#ffffff' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado: {result.breakdown.solid}
      </Typography>
      
      {/* Visual representation */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          📐 Visualização 3D do Sólido
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SolidVisualization solid={solid} measurements={result.breakdown.measurements} />
        </Box>
      </Box>
      
      <StepByStepSolution result={result} />
    </Paper>
  );
};

const VolumeCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: VolumeState = {
    solid: 'sphere',
  };

  const validate = (state: VolumeState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    const solid = SOLIDS[state.solid];
    
    // Check if we have all required fields
    const hasAllData = solid.fields.every(field => {
      const value = state[field as keyof VolumeState];
      return value && parseFloat(value) > 0;
    });
    
    if (!hasAllData) {
      return { 
        valid: false, 
        error: `Preencha todos os campos necessários para calcular o volume do ${solid.name.toLowerCase()}` 
      };
    }

    // Validate individual fields
    solid.fields.forEach(field => {
      const value = state[field as keyof VolumeState];
      if (value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
          return { valid: false, error: 'Todos os valores devem ser números positivos' };
        }
      }
    });

    return { valid: true };
  };

  const calculate = (state: VolumeState): VolumeResult | null => {
    return calculateVolume(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof VolumeState, value: string | SolidType) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (field === 'solid') {
      updateField(field, value as SolidType);
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

  const currentSolid = SOLIDS[state.solid];

  // Group solids by category
  const basicSolids = ['sphere', 'cylinder', 'cone', 'cube'] as SolidType[];
  const advancedSolids = ['rectangular_prism', 'triangular_prism', 'pyramid', 'ellipsoid', 'torus'] as SolidType[];

  return (
    <>
      <CalculatorHeader
        title="Calculadora de Volume"
        description="Calcule o volume de sólidos geométricos com fórmulas, visualização 3D e cálculos passo a passo."
      />

      <Grid container spacing={3}>
        {/* Solid selection */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Selecione o Sólido Geométrico
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Sólidos Básicos:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {basicSolids.map((solidKey) => {
                const solid = SOLIDS[solidKey];
                return (
                  <Button
                    key={solidKey}
                    variant={state.solid === solidKey ? 'contained' : 'outlined'}
                    onClick={() => handleFieldUpdate('solid', solidKey)}
                    sx={{ minWidth: 120, textAlign: 'center' }}
                  >
                    <Box>
                      <Typography variant="h6">{solid.icon}</Typography>
                      <Typography variant="caption">{solid.name}</Typography>
                    </Box>
                  </Button>
                );
              })}
            </Box>
            
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Sólidos Avançados:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {advancedSolids.map((solidKey) => {
                const solid = SOLIDS[solidKey];
                return (
                  <Button
                    key={solidKey}
                    variant={state.solid === solidKey ? 'contained' : 'outlined'}
                    onClick={() => handleFieldUpdate('solid', solidKey)}
                    sx={{ minWidth: 120, textAlign: 'center' }}
                  >
                    <Box>
                      <Typography variant="h6">{solid.icon}</Typography>
                      <Typography variant="caption">{solid.name}</Typography>
                    </Box>
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Grid>

        {/* Solid info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {currentSolid.name} - {currentSolid.description}
            </Typography>
            <Typography variant="caption">
              <strong>Volume:</strong> {currentSolid.volumeFormulaText}
              {currentSolid.surfaceAreaFormulaText && (
                <> | <strong>Área:</strong> {currentSolid.surfaceAreaFormulaText}</>
              )}
            </Typography>
          </Alert>
        </Grid>

        {/* Input fields based on selected solid */}
        {currentSolid.fields.map((field) => {
          const fieldConfig = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG];
          const value = state[field as keyof VolumeState] || '';
          
          return (
            <Grid key={field} size={{ xs: 12, sm: 6, md: 4 }}>
              <CalculatorInput
                label={fieldConfig.label}
                value={value}
                onChange={(value) => handleFieldUpdate(field as keyof VolumeState, value)}
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
            <VolumeResultDisplay result={result as VolumeResult} solid={state.solid} />
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

export default VolumeCalculator;