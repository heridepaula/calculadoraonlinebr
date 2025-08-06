'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Grid, Typography, Paper, Divider, Box, Alert, Button, ButtonGroup, Chip, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { validateNumberInput } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';

type ShapeType = 'triangle' | 'rectangle' | 'square' | 'circle' | 'trapezoid' | 'rhombus' | 'parallelogram' | 'hexagon' | 'pentagon' | 'ellipse';

interface ShapeState {
  shape: ShapeType;
  // Triangle
  triangleBase?: string;
  triangleHeight?: string;
  triangleSide1?: string;
  triangleSide2?: string;
  triangleSide3?: string;
  // Rectangle
  rectangleLength?: string;
  rectangleWidth?: string;
  // Square
  squareSide?: string;
  // Circle
  circleRadius?: string;
  // Trapezoid
  trapezoidBase1?: string;
  trapezoidBase2?: string;
  trapezoidHeight?: string;
  trapezoidSide1?: string;
  trapezoidSide2?: string;
  // Rhombus/Parallelogram
  rhombusBase?: string;
  rhombusHeight?: string;
  rhombusDiagonal1?: string;
  rhombusDiagonal2?: string;
  rhombusSide?: string;
  // Regular polygons
  polygonSide?: string;
  // Ellipse
  ellipseMajorAxis?: string;
  ellipseMinorAxis?: string;
}

interface GeometryResult extends CalculatorResultType {
  breakdown: {
    shape: string;
    area: number;
    perimeter: number;
    formulas: {
      areaFormula: string;
      perimeterFormula: string;
    };
    calculations: string[];
    measurements: { [key: string]: number };
  };
}

// Shape definitions with formulas and field requirements
const SHAPES: { [key in ShapeType]: {
  name: string;
  icon: string;
  fields: string[];
  areaFormula: (values: any) => number;
  perimeterFormula: (values: any) => number;
  areaFormulaText: string;
  perimeterFormulaText: string;
  description: string;
}} = {
  triangle: {
    name: 'Triângulo',
    icon: '▲',
    fields: ['triangleBase', 'triangleHeight', 'triangleSide1', 'triangleSide2', 'triangleSide3'],
    areaFormula: (v) => (parseFloat(v.triangleBase || '0') * parseFloat(v.triangleHeight || '0')) / 2,
    perimeterFormula: (v) => parseFloat(v.triangleSide1 || '0') + parseFloat(v.triangleSide2 || '0') + parseFloat(v.triangleSide3 || '0'),
    areaFormulaText: 'A = (base × altura) ÷ 2',
    perimeterFormulaText: 'P = lado1 + lado2 + lado3',
    description: 'Figura com três lados e três ângulos'
  },
  rectangle: {
    name: 'Retângulo',
    icon: '▭',
    fields: ['rectangleLength', 'rectangleWidth'],
    areaFormula: (v) => parseFloat(v.rectangleLength || '0') * parseFloat(v.rectangleWidth || '0'),
    perimeterFormula: (v) => 2 * (parseFloat(v.rectangleLength || '0') + parseFloat(v.rectangleWidth || '0')),
    areaFormulaText: 'A = comprimento × largura',
    perimeterFormulaText: 'P = 2 × (comprimento + largura)',
    description: 'Quadrilátero com quatro ângulos retos'
  },
  square: {
    name: 'Quadrado',
    icon: '⬜',
    fields: ['squareSide'],
    areaFormula: (v) => Math.pow(parseFloat(v.squareSide || '0'), 2),
    perimeterFormula: (v) => 4 * parseFloat(v.squareSide || '0'),
    areaFormulaText: 'A = lado²',
    perimeterFormulaText: 'P = 4 × lado',
    description: 'Quadrilátero com quatro lados iguais'
  },
  circle: {
    name: 'Círculo',
    icon: '●',
    fields: ['circleRadius'],
    areaFormula: (v) => Math.PI * Math.pow(parseFloat(v.circleRadius || '0'), 2),
    perimeterFormula: (v) => 2 * Math.PI * parseFloat(v.circleRadius || '0'),
    areaFormulaText: 'A = π × raio²',
    perimeterFormulaText: 'P = 2 × π × raio',
    description: 'Figura circular perfeita'
  },
  trapezoid: {
    name: 'Trapézio',
    icon: '⬢',
    fields: ['trapezoidBase1', 'trapezoidBase2', 'trapezoidHeight', 'trapezoidSide1', 'trapezoidSide2'],
    areaFormula: (v) => ((parseFloat(v.trapezoidBase1 || '0') + parseFloat(v.trapezoidBase2 || '0')) * parseFloat(v.trapezoidHeight || '0')) / 2,
    perimeterFormula: (v) => parseFloat(v.trapezoidBase1 || '0') + parseFloat(v.trapezoidBase2 || '0') + parseFloat(v.trapezoidSide1 || '0') + parseFloat(v.trapezoidSide2 || '0'),
    areaFormulaText: 'A = ((base1 + base2) × altura) ÷ 2',
    perimeterFormulaText: 'P = base1 + base2 + lado1 + lado2',
    description: 'Quadrilátero com um par de lados paralelos'
  },
  rhombus: {
    name: 'Losango',
    icon: '◊',
    fields: ['rhombusDiagonal1', 'rhombusDiagonal2', 'rhombusSide'],
    areaFormula: (v) => (parseFloat(v.rhombusDiagonal1 || '0') * parseFloat(v.rhombusDiagonal2 || '0')) / 2,
    perimeterFormula: (v) => 4 * parseFloat(v.rhombusSide || '0'),
    areaFormulaText: 'A = (diagonal1 × diagonal2) ÷ 2',
    perimeterFormulaText: 'P = 4 × lado',
    description: 'Quadrilátero com quatro lados iguais'
  },
  parallelogram: {
    name: 'Paralelogramo',
    icon: '▱',
    fields: ['rhombusBase', 'rhombusHeight', 'rhombusSide'],
    areaFormula: (v) => parseFloat(v.rhombusBase || '0') * parseFloat(v.rhombusHeight || '0'),
    perimeterFormula: (v) => 2 * (parseFloat(v.rhombusBase || '0') + parseFloat(v.rhombusSide || '0')),
    areaFormulaText: 'A = base × altura',
    perimeterFormulaText: 'P = 2 × (base + lado)',
    description: 'Quadrilátero com lados opostos paralelos'
  },
  hexagon: {
    name: 'Hexágono Regular',
    icon: '⬡',
    fields: ['polygonSide'],
    areaFormula: (v) => (3 * Math.sqrt(3) * Math.pow(parseFloat(v.polygonSide || '0'), 2)) / 2,
    perimeterFormula: (v) => 6 * parseFloat(v.polygonSide || '0'),
    areaFormulaText: 'A = (3√3 × lado²) ÷ 2',
    perimeterFormulaText: 'P = 6 × lado',
    description: 'Polígono regular de seis lados'
  },
  pentagon: {
    name: 'Pentágono Regular',
    icon: '⬟',
    fields: ['polygonSide'],
    areaFormula: (v) => (Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(parseFloat(v.polygonSide || '0'), 2)) / 4,
    perimeterFormula: (v) => 5 * parseFloat(v.polygonSide || '0'),
    areaFormulaText: 'A = (√(25+10√5) × lado²) ÷ 4',
    perimeterFormulaText: 'P = 5 × lado',
    description: 'Polígono regular de cinco lados'
  },
  ellipse: {
    name: 'Elipse',
    icon: '⬭',
    fields: ['ellipseMajorAxis', 'ellipseMinorAxis'],
    areaFormula: (v) => Math.PI * parseFloat(v.ellipseMajorAxis || '0') * parseFloat(v.ellipseMinorAxis || '0'),
    perimeterFormula: (v) => Math.PI * (3 * (parseFloat(v.ellipseMajorAxis || '0') + parseFloat(v.ellipseMinorAxis || '0')) - Math.sqrt((3 * parseFloat(v.ellipseMajorAxis || '0') + parseFloat(v.ellipseMinorAxis || '0')) * (parseFloat(v.ellipseMajorAxis || '0') + 3 * parseFloat(v.ellipseMinorAxis || '0')))),
    areaFormulaText: 'A = π × eixo_maior × eixo_menor',
    perimeterFormulaText: 'P ≈ π × [3(a+b) - √((3a+b)(a+3b))]',
    description: 'Curva fechada oval'
  },
};

// Field labels and placeholders
const FIELD_CONFIG = {
  triangleBase: { label: 'Base', placeholder: 'Digite a base do triângulo', unit: 'unidades' },
  triangleHeight: { label: 'Altura', placeholder: 'Digite a altura do triângulo', unit: 'unidades' },
  triangleSide1: { label: 'Lado 1', placeholder: 'Digite o primeiro lado', unit: 'unidades' },
  triangleSide2: { label: 'Lado 2', placeholder: 'Digite o segundo lado', unit: 'unidades' },
  triangleSide3: { label: 'Lado 3', placeholder: 'Digite o terceiro lado', unit: 'unidades' },
  rectangleLength: { label: 'Comprimento', placeholder: 'Digite o comprimento', unit: 'unidades' },
  rectangleWidth: { label: 'Largura', placeholder: 'Digite a largura', unit: 'unidades' },
  squareSide: { label: 'Lado', placeholder: 'Digite o lado do quadrado', unit: 'unidades' },
  circleRadius: { label: 'Raio', placeholder: 'Digite o raio do círculo', unit: 'unidades' },
  trapezoidBase1: { label: 'Base Maior', placeholder: 'Digite a base maior', unit: 'unidades' },
  trapezoidBase2: { label: 'Base Menor', placeholder: 'Digite a base menor', unit: 'unidades' },
  trapezoidHeight: { label: 'Altura', placeholder: 'Digite a altura do trapézio', unit: 'unidades' },
  trapezoidSide1: { label: 'Lado 1', placeholder: 'Digite o primeiro lado', unit: 'unidades' },
  trapezoidSide2: { label: 'Lado 2', placeholder: 'Digite o segundo lado', unit: 'unidades' },
  rhombusBase: { label: 'Base', placeholder: 'Digite a base', unit: 'unidades' },
  rhombusHeight: { label: 'Altura', placeholder: 'Digite a altura', unit: 'unidades' },
  rhombusDiagonal1: { label: 'Diagonal 1', placeholder: 'Digite a primeira diagonal', unit: 'unidades' },
  rhombusDiagonal2: { label: 'Diagonal 2', placeholder: 'Digite a segunda diagonal', unit: 'unidades' },
  rhombusSide: { label: 'Lado', placeholder: 'Digite o lado', unit: 'unidades' },
  polygonSide: { label: 'Lado', placeholder: 'Digite o lado do polígono', unit: 'unidades' },
  ellipseMajorAxis: { label: 'Semi-eixo Maior', placeholder: 'Digite o semi-eixo maior', unit: 'unidades' },
  ellipseMinorAxis: { label: 'Semi-eixo Menor', placeholder: 'Digite o semi-eixo menor', unit: 'unidades' },
};

// Main calculation function
const calculateGeometry = (state: ShapeState): GeometryResult | null => {
  const shape = SHAPES[state.shape];
  
  // Get relevant field values
  const values: { [key: string]: string } = {};
  shape.fields.forEach(field => {
    values[field] = state[field as keyof ShapeState] || '';
  });

  // Check if all required fields are filled for area calculation
  const areaFields = getRequiredFieldsForArea(state.shape);
  const hasAreaData = areaFields.every(field => values[field] && parseFloat(values[field]) > 0);
  
  // Check if all required fields are filled for perimeter calculation  
  const perimeterFields = getRequiredFieldsForPerimeter(state.shape);
  const hasPerimeterData = perimeterFields.every(field => values[field] && parseFloat(values[field]) > 0);

  if (!hasAreaData && !hasPerimeterData) return null;

  const area = hasAreaData ? shape.areaFormula(values) : 0;
  const perimeter = hasPerimeterData ? shape.perimeterFormula(values) : 0;
  
  // Generate step-by-step calculations
  const calculations = [];
  const measurements: { [key: string]: number } = {};
  
  // Add measurements
  shape.fields.forEach(field => {
    if (values[field] && parseFloat(values[field]) > 0) {
      measurements[FIELD_CONFIG[field as keyof typeof FIELD_CONFIG].label] = parseFloat(values[field]);
    }
  });
  
  if (hasAreaData) {
    calculations.push(`1. Cálculo da Área:`);
    calculations.push(`   Fórmula: ${shape.areaFormulaText}`);
    calculations.push(`   Substituindo valores: ${getAreaCalculationText(state.shape, values)}`);
    calculations.push(`   Área = ${area.toFixed(4)} unidades²`);
  }
  
  if (hasPerimeterData) {
    calculations.push(`${hasAreaData ? '2' : '1'}. Cálculo do Perímetro:`);
    calculations.push(`   Fórmula: ${shape.perimeterFormulaText}`);
    calculations.push(`   Substituindo valores: ${getPerimeterCalculationText(state.shape, values)}`);
    calculations.push(`   Perímetro = ${perimeter.toFixed(4)} unidades`);
  }

  return {
    value: area || perimeter,
    isValid: true,
    message: `${shape.name}: ${hasAreaData ? `Área = ${area.toFixed(4)} u²` : ''} ${hasAreaData && hasPerimeterData ? ', ' : ''} ${hasPerimeterData ? `Perímetro = ${perimeter.toFixed(4)} u` : ''}`,
    breakdown: {
      shape: shape.name,
      area: area,
      perimeter: perimeter,
      formulas: {
        areaFormula: shape.areaFormulaText,
        perimeterFormula: shape.perimeterFormulaText
      },
      calculations,
      measurements
    },
    additionalInfo: {
      'Figura': shape.name,
      'Área': hasAreaData ? `${area.toFixed(4)} unidades²` : 'N/A',
      'Perímetro': hasPerimeterData ? `${perimeter.toFixed(4)} unidades` : 'N/A',
      'Descrição': shape.description
    }
  };
};

// Helper functions to determine required fields for each calculation
function getRequiredFieldsForArea(shape: ShapeType): string[] {
  switch (shape) {
    case 'triangle': return ['triangleBase', 'triangleHeight'];
    case 'rectangle': return ['rectangleLength', 'rectangleWidth'];
    case 'square': return ['squareSide'];
    case 'circle': return ['circleRadius'];
    case 'trapezoid': return ['trapezoidBase1', 'trapezoidBase2', 'trapezoidHeight'];
    case 'rhombus': return ['rhombusDiagonal1', 'rhombusDiagonal2'];
    case 'parallelogram': return ['rhombusBase', 'rhombusHeight'];
    case 'hexagon': case 'pentagon': return ['polygonSide'];
    case 'ellipse': return ['ellipseMajorAxis', 'ellipseMinorAxis'];
    default: return [];
  }
}

function getRequiredFieldsForPerimeter(shape: ShapeType): string[] {
  switch (shape) {
    case 'triangle': return ['triangleSide1', 'triangleSide2', 'triangleSide3'];
    case 'rectangle': return ['rectangleLength', 'rectangleWidth'];
    case 'square': return ['squareSide'];
    case 'circle': return ['circleRadius'];
    case 'trapezoid': return ['trapezoidBase1', 'trapezoidBase2', 'trapezoidSide1', 'trapezoidSide2'];
    case 'rhombus': return ['rhombusSide'];
    case 'parallelogram': return ['rhombusBase', 'rhombusSide'];
    case 'hexagon': case 'pentagon': return ['polygonSide'];
    case 'ellipse': return ['ellipseMajorAxis', 'ellipseMinorAxis'];
    default: return [];
  }
}

// Generate calculation text for display
function getAreaCalculationText(shape: ShapeType, values: { [key: string]: string }): string {
  switch (shape) {
    case 'triangle': return `(${values.triangleBase} × ${values.triangleHeight}) ÷ 2`;
    case 'rectangle': return `${values.rectangleLength} × ${values.rectangleWidth}`;
    case 'square': return `${values.squareSide}²`;
    case 'circle': return `π × ${values.circleRadius}²`;
    case 'trapezoid': return `((${values.trapezoidBase1} + ${values.trapezoidBase2}) × ${values.trapezoidHeight}) ÷ 2`;
    case 'rhombus': return `(${values.rhombusDiagonal1} × ${values.rhombusDiagonal2}) ÷ 2`;
    case 'parallelogram': return `${values.rhombusBase} × ${values.rhombusHeight}`;
    case 'hexagon': return `(3√3 × ${values.polygonSide}²) ÷ 2`;
    case 'pentagon': return `(√(25+10√5) × ${values.polygonSide}²) ÷ 4`;
    case 'ellipse': return `π × ${values.ellipseMajorAxis} × ${values.ellipseMinorAxis}`;
    default: return '';
  }
}

function getPerimeterCalculationText(shape: ShapeType, values: { [key: string]: string }): string {
  switch (shape) {
    case 'triangle': return `${values.triangleSide1} + ${values.triangleSide2} + ${values.triangleSide3}`;
    case 'rectangle': return `2 × (${values.rectangleLength} + ${values.rectangleWidth})`;
    case 'square': return `4 × ${values.squareSide}`;
    case 'circle': return `2 × π × ${values.circleRadius}`;
    case 'trapezoid': return `${values.trapezoidBase1} + ${values.trapezoidBase2} + ${values.trapezoidSide1} + ${values.trapezoidSide2}`;
    case 'rhombus': return `4 × ${values.rhombusSide}`;
    case 'parallelogram': return `2 × (${values.rhombusBase} + ${values.rhombusSide})`;
    case 'hexagon': return `6 × ${values.polygonSide}`;
    case 'pentagon': return `5 × ${values.polygonSide}`;
    case 'ellipse': return `π × [3(${values.ellipseMajorAxis}+${values.ellipseMinorAxis}) - √((3×${values.ellipseMajorAxis}+${values.ellipseMinorAxis})(${values.ellipseMajorAxis}+3×${values.ellipseMinorAxis}))]`;
    default: return '';
  }
}

// Visual representation component
const ShapeVisualization: React.FC<{ shape: ShapeType; measurements: { [key: string]: number } }> = ({ 
  shape, measurements 
}) => {
  const theme = useTheme();
  
  const renderShape = () => {
    const baseSize = 120;
    const strokeWidth = 2;
    const color = theme.palette.primary.main;
    
    switch (shape) {
      case 'triangle':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <polygon 
              points="70,20 20,120 120,120" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="135" textAnchor="middle" fontSize="12" fill={color}>
              Triângulo
            </text>
          </svg>
        );
      case 'rectangle':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <rect 
              x="30" y="40" width="80" height="60" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="125" textAnchor="middle" fontSize="12" fill={color}>
              Retângulo
            </text>
          </svg>
        );
      case 'square':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <rect 
              x="45" y="45" width="50" height="50" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="115" textAnchor="middle" fontSize="12" fill={color}>
              Quadrado
            </text>
          </svg>
        );
      case 'circle':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <circle 
              cx="70" cy="60" r="35" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="115" textAnchor="middle" fontSize="12" fill={color}>
              Círculo
            </text>
          </svg>
        );
      case 'trapezoid':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <polygon 
              points="50,30 90,30 110,100 30,100" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="125" textAnchor="middle" fontSize="12" fill={color}>
              Trapézio
            </text>
          </svg>
        );
      case 'rhombus':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <polygon 
              points="70,20 110,60 70,100 30,60" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="125" textAnchor="middle" fontSize="12" fill={color}>
              Losango
            </text>
          </svg>
        );
      case 'parallelogram':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <polygon 
              points="40,40 100,40 110,80 50,80" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="105" textAnchor="middle" fontSize="12" fill={color}>
              Paralelogramo
            </text>
          </svg>
        );
      case 'hexagon':
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = 70 + 30 * Math.cos(angle);
          const y = 60 + 30 * Math.sin(angle);
          hexPoints.push(`${x},${y}`);
        }
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <polygon 
              points={hexPoints.join(' ')} 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="110" textAnchor="middle" fontSize="12" fill={color}>
              Hexágono
            </text>
          </svg>
        );
      case 'pentagon':
        const pentPoints = [];
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = 70 + 30 * Math.cos(angle);
          const y = 60 + 30 * Math.sin(angle);
          pentPoints.push(`${x},${y}`);
        }
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <polygon 
              points={pentPoints.join(' ')} 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="110" textAnchor="middle" fontSize="12" fill={color}>
              Pentágono
            </text>
          </svg>
        );
      case 'ellipse':
        return (
          <svg width={baseSize + 40} height={baseSize + 20} viewBox="0 0 140 140">
            <ellipse 
              cx="70" cy="60" rx="40" ry="25" 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
            />
            <text x="70" y="105" textAnchor="middle" fontSize="12" fill={color}>
              Elipse
            </text>
          </svg>
        );
      default:
        return <div>Forma não encontrada</div>;
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ p: 2, display: 'inline-block', backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        {renderShape()}
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
const StepByStepSolution: React.FC<{ result: GeometryResult }> = ({ result }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        📐 Resolução Passo a Passo
      </Typography>
      
      <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {result.breakdown.shape}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {result.breakdown.calculations.map((step, index) => (
          <Typography 
            key={index}
            variant="body2" 
            sx={{ 
              mb: 1, 
              fontFamily: step.includes('=') || step.includes('×') || step.includes('÷') ? 'monospace' : 'inherit',
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
          {result.breakdown.area > 0 && (
            <Alert severity="success" sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Área: {result.breakdown.area.toFixed(4)} u²
              </Typography>
              <Typography variant="caption">
                {result.breakdown.formulas.areaFormula}
              </Typography>
            </Alert>
          )}
          
          {result.breakdown.perimeter > 0 && (
            <Alert severity="info" sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Perímetro: {result.breakdown.perimeter.toFixed(4)} u
              </Typography>
              <Typography variant="caption">
                {result.breakdown.formulas.perimeterFormula}
              </Typography>
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Main result display component
const GeometryResultDisplay: React.FC<{ result: GeometryResult; shape: ShapeType }> = ({ result, shape }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Resultado: {result.breakdown.shape}
      </Typography>
      
      {/* Visual representation */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          📏 Visualização da Figura
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ShapeVisualization shape={shape} measurements={result.breakdown.measurements} />
        </Box>
      </Box>
      
      <StepByStepSolution result={result} />
    </Paper>
  );
};

const AreaPerimeterCalculator: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const initialState: ShapeState = {
    shape: 'rectangle',
  };

  const validate = (state: ShapeState): ValidationResult => {
    if (!hasInteracted) {
      return { valid: true };
    }

    const shape = SHAPES[state.shape];
    const areaFields = getRequiredFieldsForArea(state.shape);
    const perimeterFields = getRequiredFieldsForPerimeter(state.shape);
    
    // Check if we have at least the data for area OR perimeter calculation
    const hasAreaData = areaFields.every(field => {
      const value = state[field as keyof ShapeState];
      return value && parseFloat(value) > 0;
    });
    
    const hasPerimeterData = perimeterFields.every(field => {
      const value = state[field as keyof ShapeState];
      return value && parseFloat(value) > 0;
    });
    
    if (!hasAreaData && !hasPerimeterData) {
      return { 
        valid: false, 
        error: `Preencha os campos necessários para calcular área ou perímetro do ${shape.name.toLowerCase()}` 
      };
    }

    // Validate individual fields
    shape.fields.forEach(field => {
      const value = state[field as keyof ShapeState];
      if (value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
          return { valid: false, error: 'Todos os valores devem ser números positivos' };
        }
      }
    });

    return { valid: true };
  };

  const calculate = (state: ShapeState): GeometryResult | null => {
    return calculateGeometry(state);
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });

  const handleFieldUpdate = useCallback((field: keyof ShapeState, value: string | ShapeType) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (field === 'shape') {
      updateField(field, value as ShapeType);
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

  const currentShape = SHAPES[state.shape];

  // Group shapes by category
  const basicShapes = ['rectangle', 'square', 'triangle', 'circle'] as ShapeType[];
  const advancedShapes = ['trapezoid', 'rhombus', 'parallelogram', 'hexagon', 'pentagon', 'ellipse'] as ShapeType[];

  return (
    <>
      <Paper sx={{ p: 3, backgroundColor: '#ffffff', mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
              Calculadora de Área e Perímetro
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Calcule área e perímetro de 15+ figuras geométricas com visualização e fórmulas passo a passo.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Shape selection */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Selecione a Figura Geométrica
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Figuras Básicas:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {basicShapes.map((shapeKey) => {
                const shape = SHAPES[shapeKey];
                return (
                  <Button
                    key={shapeKey}
                    variant={state.shape === shapeKey ? 'contained' : 'outlined'}
                    onClick={() => handleFieldUpdate('shape', shapeKey)}
                    sx={{ minWidth: 120, textAlign: 'center' }}
                  >
                    <Box>
                      <Typography variant="h6">{shape.icon}</Typography>
                      <Typography variant="caption">{shape.name}</Typography>
                    </Box>
                  </Button>
                );
              })}
            </Box>
            
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Figuras Avançadas:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {advancedShapes.map((shapeKey) => {
                const shape = SHAPES[shapeKey];
                return (
                  <Button
                    key={shapeKey}
                    variant={state.shape === shapeKey ? 'contained' : 'outlined'}
                    onClick={() => handleFieldUpdate('shape', shapeKey)}
                    sx={{ minWidth: 120, textAlign: 'center' }}
                  >
                    <Box>
                      <Typography variant="h6">{shape.icon}</Typography>
                      <Typography variant="caption">{shape.name}</Typography>
                    </Box>
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Grid>

        {/* Shape info */}
        <Grid size={{ xs: 12 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {currentShape.name} - {currentShape.description}
            </Typography>
            <Typography variant="caption">
              <strong>Área:</strong> {currentShape.areaFormulaText} | <strong>Perímetro:</strong> {currentShape.perimeterFormulaText}
            </Typography>
          </Alert>
        </Grid>

        {/* Input fields based on selected shape */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, backgroundColor: '#ffffff', mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Medidas do {currentShape.name}
            </Typography>
            
            <Grid container spacing={2}>
              {currentShape.fields.map((field) => {
                const fieldConfig = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG];
                const value = state[field as keyof ShapeState] || '';
                
                return (
                  <Grid key={field} size={{ xs: 12, sm: 6, md: 4 }}>
                    <CalculatorInput
                      label={fieldConfig.label}
                      value={value}
                      onChange={(value) => handleFieldUpdate(field as keyof ShapeState, value)}
                      type="number"
                      error={hasInteracted && !!validation.error}
                      helperText={fieldConfig.placeholder}
                      inputProps={{ min: 0, step: 0.01 }}
                      allowDecimals={true}
                    />
                  </Grid>
                );
              })}
            </Grid>
            
            {hasInteracted && validation.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {validation.error}
              </Alert>
            )}
          </Paper>
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <GeometryResultDisplay result={result as GeometryResult} shape={state.shape} />
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

export default AreaPerimeterCalculator;