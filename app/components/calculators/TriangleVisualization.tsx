import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import type { PythagoreanParams, PythagoreanResult } from "~/utils/calculations";

interface TriangleVisualizationProps {
  mode: PythagoreanParams["mode"];
  inputs: Record<string, string>;
  result: PythagoreanResult | null;
  unit: string;
}

export const TriangleVisualization = React.memo<TriangleVisualizationProps>(
  function TriangleVisualization({ mode, inputs, result, unit }) {
    const getTriangleDimensions = () => {
      if (result) {
        return {
          sideA: result.sideA,
          sideB: result.sideB,
          hypotenuse: result.hypotenuse,
          angleA: result.angleA,
          angleB: result.angleB,
        };
      }

      // Use partial inputs for preview
      return {
        sideA: parseFloat(inputs.sideA) || 0,
        sideB: parseFloat(inputs.sideB) || 0,
        hypotenuse: parseFloat(inputs.hypotenuse) || 0,
        angleA: parseFloat(inputs.angleA) || 0,
        angleB: parseFloat(inputs.angleB) || 0,
      };
    };

    const dimensions = getTriangleDimensions();
    const hasValidDimensions = dimensions.sideA > 0 && dimensions.sideB > 0;

    // Calculate triangle proportions for SVG display
    const getTrianglePoints = () => {
      if (!hasValidDimensions) {
        // Default triangle for empty state
        return {
          A: { x: 50, y: 160 },
          B: { x: 200, y: 160 },
          C: { x: 200, y: 60 },
          scale: 1,
        };
      }

      const { sideA, sideB, hypotenuse } = dimensions;
      const maxSide = Math.max(sideA, sideB, hypotenuse || Math.sqrt(sideA * sideA + sideB * sideB));
      const scale = Math.min(120 / maxSide, 1.5);

      const scaledA = sideA * scale;
      const scaledB = sideB * scale;

      return {
        A: { x: 60, y: 160 },
        B: { x: 60 + scaledB, y: 160 },
        C: { x: 60 + scaledB, y: 160 - scaledA },
        scale,
      };
    };

    const points = getTrianglePoints();
    
    const getSideColor = (side: 'A' | 'B' | 'C') => {
      if (!result) {
        // Preview mode - show what's being calculated
        switch (mode) {
          case 'find_hypotenuse':
            return side === 'C' ? '#FF9800' : '#4CAF50'; // Orange for unknown, green for known
          case 'find_side':
            return side === 'A' || side === 'B' ? '#FF9800' : '#4CAF50';
          default:
            return '#63B5F6';
        }
      }
      return '#63B5F6'; // All sides known in results
    };

    const getSideThickness = (side: 'A' | 'B' | 'C') => {
      if (!result && mode === 'find_hypotenuse' && side === 'C') return 3;
      if (!result && mode === 'find_side' && (side === 'A' || side === 'B')) return 3;
      return 2;
    };

    return (
      <Card className="bg-gradient-to-br from-primary-blue-light/30 to-system-success/10 border-primary-blue/20">
        <CardHeader>
          <CardTitle className="text-primary-blue-dark flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="triangle visualization">📐</span>
            Visualização do Triângulo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <svg
              width="260"
              height="200"
              viewBox="0 0 260 200"
              className="drop-shadow-lg"
              role="img"
              aria-labelledby="triangle-title triangle-desc"
            >
              <title id="triangle-title">Triângulo Retângulo Interativo</title>
              <desc id="triangle-desc">
                {result 
                  ? `Triângulo com catetos ${dimensions.sideA.toFixed(2)} e ${dimensions.sideB.toFixed(2)}, hipotenusa ${dimensions.hypotenuse.toFixed(2)}`
                  : "Triângulo para visualização do teorema de Pitágoras"
                }
              </desc>

              {/* Grid background for better reference */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Triangle sides */}
              <g>
                {/* Side A (vertical) */}
                <line
                  x1={points.C.x}
                  y1={points.C.y}
                  x2={points.B.x}
                  y2={points.B.y}
                  stroke={getSideColor('A')}
                  strokeWidth={getSideThickness('A')}
                  className="transition-all duration-300"
                />
                
                {/* Side B (horizontal) */}
                <line
                  x1={points.A.x}
                  y1={points.A.y}
                  x2={points.B.x}
                  y2={points.B.y}
                  stroke={getSideColor('B')}
                  strokeWidth={getSideThickness('B')}
                  className="transition-all duration-300"
                />
                
                {/* Hypotenuse C */}
                <line
                  x1={points.A.x}
                  y1={points.A.y}
                  x2={points.C.x}
                  y2={points.C.y}
                  stroke={getSideColor('C')}
                  strokeWidth={getSideThickness('C')}
                  className="transition-all duration-300"
                />
              </g>

              {/* Right angle indicator */}
              <g>
                <path
                  d={`M ${points.B.x - 15} ${points.B.y} L ${points.B.x - 15} ${points.B.y - 15} L ${points.B.x} ${points.B.y - 15}`}
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="1.5"
                />
                <text
                  x={points.B.x - 20}
                  y={points.B.y - 5}
                  className="text-xs fill-system-success font-bold"
                  textAnchor="middle"
                >
                  90°
                </text>
              </g>

              {/* Vertex labels */}
              <g className="text-sm font-bold">
                <text x={points.A.x - 15} y={points.A.y + 15} className="fill-primary-blue-dark" textAnchor="middle">A</text>
                <text x={points.B.x + 15} y={points.B.y + 15} className="fill-primary-blue-dark" textAnchor="middle">B</text>
                <text x={points.C.x + 15} y={points.C.y - 5} className="fill-primary-blue-dark" textAnchor="middle">C</text>
              </g>

              {/* Side labels with values */}
              {hasValidDimensions && (
                <g className="text-xs font-semibold">
                  {/* Cateto A label */}
                  <text
                    x={points.C.x + 25}
                    y={(points.C.y + points.B.y) / 2}
                    className="fill-system-success"
                    textAnchor="middle"
                  >
                    {dimensions.sideA > 0 ? `${dimensions.sideA.toFixed(1)}${unit}` : '?'}
                  </text>
                  
                  {/* Cateto B label */}
                  <text
                    x={(points.A.x + points.B.x) / 2}
                    y={points.A.y + 20}
                    className="fill-growth-green"
                    textAnchor="middle"
                  >
                    {dimensions.sideB > 0 ? `${dimensions.sideB.toFixed(1)}${unit}` : '?'}
                  </text>
                  
                  {/* Hypotenuse label */}
                  <text
                    x={(points.A.x + points.C.x) / 2 - 15}
                    y={(points.A.y + points.C.y) / 2}
                    className="fill-system-warning"
                    textAnchor="middle"
                    transform={`rotate(-${Math.atan2(points.A.y - points.C.y, points.C.x - points.A.x) * 180 / Math.PI}, ${(points.A.x + points.C.x) / 2 - 15}, ${(points.A.y + points.C.y) / 2})`}
                  >
                    {dimensions.hypotenuse > 0 ? `${dimensions.hypotenuse.toFixed(1)}${unit}` : '?'}
                  </text>
                </g>
              )}

              {/* Angle labels */}
              {result && (result.angleA || result.angleB) && (
                <g className="text-xs font-medium">
                  {result.angleA && (
                    <text
                      x={points.A.x + 20}
                      y={points.A.y - 10}
                      className="fill-system-info"
                      textAnchor="middle"
                    >
                      {result.angleA.toFixed(1)}°
                    </text>
                  )}
                  {result.angleB && (
                    <text
                      x={points.C.x - 20}
                      y={points.C.y + 15}
                      className="fill-system-info"
                      textAnchor="middle"
                    >
                      {result.angleB.toFixed(1)}°
                    </text>
                  )}
                </g>
              )}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-text-primary mb-2">Legenda:</h4>
              <div className="flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-system-success"></div>
                  <span className="text-text-secondary">Cateto A</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-growth-green"></div>
                  <span className="text-text-secondary">Cateto B</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-system-warning"></div>
                  <span className="text-text-secondary">Hipotenusa</span>
                </div>
              </div>
            </div>

            {!result && mode && (
              <div className="text-center text-xs text-system-info">
                💡 {mode === 'find_hypotenuse' ? 'Calculando hipotenusa (laranja)' : 
                     mode === 'find_side' ? 'Calculando cateto (laranja)' : 
                     'Digite os valores para ver o triângulo'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);