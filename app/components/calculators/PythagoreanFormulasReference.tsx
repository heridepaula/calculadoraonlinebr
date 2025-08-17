import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import type { PythagoreanParams, PythagoreanResult } from "~/utils/calculations";

interface PythagoreanFormulasReferenceProps {
  selectedMode: PythagoreanParams["mode"];
  inputs: Record<string, string>;
  result: PythagoreanResult | null;
}

export const PythagoreanFormulasReference = React.memo<PythagoreanFormulasReferenceProps>(
  function PythagoreanFormulasReference({ selectedMode, inputs, result }) {
    const getModeFormulas = () => {
      switch (selectedMode) {
        case "find_hypotenuse":
          return {
            primary: "c² = a² + b²",
            secondary: "c = √(a² + b²)",
            substituted: inputs.sideA && inputs.sideB 
              ? `c = √(${inputs.sideA}² + ${inputs.sideB}²)` 
              : "c = √(a² + b²)",
            description: "Para encontrar a hipotenusa, somamos os quadrados dos catetos e extraímos a raiz quadrada."
          };
        case "find_side":
          return {
            primary: "a² + b² = c²",
            secondary: "a = √(c² - b²)",
            substituted: inputs.hypotenuse && (inputs.sideA || inputs.sideB)
              ? inputs.sideA 
                ? `b = √(${inputs.hypotenuse}² - ${inputs.sideA}²)`
                : `a = √(${inputs.hypotenuse}² - ${inputs.sideB}²)`
              : "a = √(c² - b²)",
            description: "Para encontrar um cateto, subtraímos o quadrado do outro cateto do quadrado da hipotenusa."
          };
        case "verify_triangle":
          return {
            primary: "a² + b² = c²",
            secondary: "Verificação: igualdade deve ser verdadeira",
            substituted: inputs.sideA && inputs.sideB && inputs.hypotenuse
              ? `${inputs.sideA}² + ${inputs.sideB}² = ${inputs.hypotenuse}²`
              : "a² + b² = c²",
            description: "Para verificar se é um triângulo retângulo, testamos se a igualdade é válida."
          };
        case "find_angle":
          return {
            primary: "sen(α) = a/c, cos(α) = b/c, tan(α) = a/b",
            secondary: "α = arcsen(a/c) = arccos(b/c) = arctan(a/b)",
            substituted: inputs.sideA && inputs.sideB && inputs.hypotenuse
              ? `α = arctan(${inputs.sideA}/${inputs.sideB})`
              : "α = arctan(a/b)",
            description: "Usamos as razões trigonométricas para encontrar os ângulos."
          };
        case "find_all_from_angle":
          return {
            primary: "sen(α) = a/c, cos(α) = b/c, tan(α) = a/b",
            secondary: "Relações trigonométricas diretas",
            substituted: inputs.angleA
              ? `sen(${inputs.angleA}°) = a/c, cos(${inputs.angleA}°) = b/c`
              : "sen(α) = a/c, cos(α) = b/c",
            description: "Com um ângulo e um lado, calculamos todos os outros usando trigonometria."
          };
        default:
          return {
            primary: "a² + b² = c²",
            secondary: "Teorema fundamental de Pitágoras",
            substituted: "a² + b² = c²",
            description: "A base de todos os cálculos em triângulos retângulos."
          };
      }
    };

    const formulas = getModeFormulas();

    const getKnownValues = () => {
      const values = [];
      if (inputs.sideA) values.push(`a = ${inputs.sideA}`);
      if (inputs.sideB) values.push(`b = ${inputs.sideB}`);
      if (inputs.hypotenuse) values.push(`c = ${inputs.hypotenuse}`);
      if (inputs.angleA) values.push(`α = ${inputs.angleA}°`);
      if (inputs.angleB) values.push(`β = ${inputs.angleB}°`);
      return values;
    };

    const trigonometricRatios = [
      { name: "Seno", formula: "sen(α) = cateto oposto / hipotenusa", symbol: "sen(α) = a/c" },
      { name: "Cosseno", formula: "cos(α) = cateto adjacente / hipotenusa", symbol: "cos(α) = b/c" },
      { name: "Tangente", formula: "tan(α) = cateto oposto / cateto adjacente", symbol: "tan(α) = a/b" }
    ];

    return (
      <div className="space-y-4">
        {/* Primary Formula for Selected Mode */}
        <Card className="border-2 border-primary-blue/50 bg-primary-blue-light/30 sticky top-4">
          <CardHeader>
            <CardTitle className="text-primary-blue-dark flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="formula">📐</span>
              Fórmula Principal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Known Values */}
              {getKnownValues().length > 0 && (
                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-info text-sm">📋 Valores Conhecidos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {getKnownValues().map((value, index) => (
                      <span key={index} className="px-2 py-1 bg-background-dark-secondary rounded text-xs font-mono">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Formula */}
              <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-3">
                <h4 className="mb-2 font-semibold text-system-success text-sm">🎯 Fórmula Base:</h4>
                <div className="rounded bg-background-dark-secondary p-3 text-center">
                  <code className="text-lg text-text-primary font-mono font-bold">
                    {formulas.primary}
                  </code>
                </div>
              </div>

              {/* Calculation Formula */}
              <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-3">
                <h4 className="mb-2 font-semibold text-growth-green text-sm">🧮 Cálculo:</h4>
                <div className="rounded bg-background-dark-secondary p-3 text-center">
                  <code className="text-sm text-text-primary font-mono">
                    {formulas.secondary}
                  </code>
                </div>
              </div>

              {/* Substituted Values */}
              {formulas.substituted !== formulas.secondary && (
                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-warning text-sm">🔢 Com Seus Valores:</h4>
                  <div className="rounded bg-background-dark-secondary p-3 text-center">
                    <code className="text-sm text-text-primary font-mono">
                      {formulas.substituted}
                    </code>
                  </div>
                </div>
              )}

              {/* Result */}
              {result && (
                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-3">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark text-sm">✅ Resultado:</h4>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary-blue-dark">
                      {selectedMode === 'find_hypotenuse' && `c = ${result.hypotenuse.toFixed(3)} ${result.unit}`}
                      {selectedMode === 'find_side' && inputs.sideA === "" && `a = ${result.sideA.toFixed(3)} ${result.unit}`}
                      {selectedMode === 'find_side' && inputs.sideB === "" && `b = ${result.sideB.toFixed(3)} ${result.unit}`}
                      {selectedMode === 'verify_triangle' && (result.isValidTriangle ? "✅ É triângulo retângulo" : "❌ Não é triângulo retângulo")}
                      {selectedMode === 'find_angle' && result.angleA && `α = ${result.angleA.toFixed(1)}°, β = ${result.angleB?.toFixed(1)}°`}
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="text-xs text-text-secondary text-center p-2 bg-background-dark-secondary/50 rounded">
                💡 {formulas.description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trigonometric Ratios Reference */}
        {(selectedMode === 'find_angle' || selectedMode === 'find_all_from_angle') && (
          <Card className="border-neutral-surface-variant">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2">
                <span className="text-lg" role="img" aria-label="trigonometry">📊</span>
                Razões Trigonométricas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trigonometricRatios.map((ratio, index) => (
                  <div 
                    key={index}
                    className="border rounded-lg p-3 border-neutral-surface-variant hover:border-primary-blue/20 hover:bg-primary-blue/5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm text-text-primary">
                        {ratio.name}
                      </span>
                    </div>
                    
                    <div className="text-xs space-y-1">
                      <div className="text-text-secondary">
                        {ratio.formula}
                      </div>
                      <code className="font-mono text-text-primary bg-background-dark-secondary px-2 py-1 rounded">
                        {ratio.symbol}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Famous Triangles Quick Reference */}
        <Card className="border-neutral-surface-variant">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <span className="text-lg" role="img" aria-label="famous triangles">⭐</span>
              Triângulos Famosos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { name: "3:4:5", description: "Triângulo Egípcio", angles: "37°-53°-90°" },
                { name: "1:1:√2", description: "Triângulo 45°", angles: "45°-45°-90°" },
                { name: "1:√3:2", description: "Triângulo 30-60", angles: "30°-60°-90°" },
                { name: "5:12:13", description: "Construção civil", angles: "22.6°-67.4°-90°" }
              ].map((triangle, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-background-dark-secondary/50 rounded text-xs">
                  <div>
                    <span className="font-mono font-bold text-primary-blue">{triangle.name}</span>
                    <span className="text-text-secondary ml-2">{triangle.description}</span>
                  </div>
                  <span className="text-system-info text-xs">{triangle.angles}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);