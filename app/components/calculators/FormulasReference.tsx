import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import { calculateAreaPerimeter, type AreaPerimeterParams } from "~/utils/calculations";

interface FormulasReferenceProps {
  selectedShape: string;
}

export function FormulasReference({ selectedShape }: FormulasReferenceProps) {
  const shapeOptions = [
    { value: "square", label: "Quadrado", icon: "⬜" },
    { value: "rectangle", label: "Retângulo", icon: "▬" },
    { value: "circle", label: "Círculo", icon: "⭕" },
    { value: "triangle", label: "Triângulo", icon: "🔺" },
    { value: "parallelogram", label: "Paralelogramo", icon: "▱" },
    { value: "trapezoid", label: "Trapézio", icon: "⬟" },
    { value: "rhombus", label: "Losango", icon: "◊" },
    { value: "ellipse", label: "Elipse", icon: "⭕" },
  ];

  const getMockResult = (shape: string) => {
    const mockDimensions = {
      side: 1,
      length: 1,
      width: 1,
      radius: 1,
      base: 1,
      height: 1,
      base1: 1,
      base2: 1,
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    };

    try {
      return calculateAreaPerimeter({
        shape: shape as AreaPerimeterParams["shape"],
        dimensions: mockDimensions,
        unit: "u",
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Fórmula da forma selecionada em destaque */}
      {selectedShape && (
        <Card className="border-2 border-primary-blue/50 bg-primary-blue-light/30 sticky top-4">
          <CardHeader>
            <CardTitle className="text-primary-blue-dark flex items-center gap-2">
              <span className="text-xl">
                {shapeOptions.find(s => s.value === selectedShape)?.icon}
              </span>
              Fórmulas - {shapeOptions.find(s => s.value === selectedShape)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const result = getMockResult(selectedShape);
              if (!result) return <p className="text-sm text-text-secondary">Fórmulas indisponíveis</p>;
              
              return (
                <div className="space-y-3">
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-3">
                    <h4 className="mb-2 font-semibold text-system-success text-sm">📐 Área:</h4>
                    <div className="rounded bg-background-dark-secondary p-2">
                      <code className="text-sm text-text-primary font-mono">
                        {result.formulas.area}
                      </code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-3">
                    <h4 className="mb-2 font-semibold text-growth-green text-sm">📏 Perímetro:</h4>
                    <div className="rounded bg-background-dark-secondary p-2">
                      <code className="text-sm text-text-primary font-mono">
                        {result.formulas.perimeter}
                      </code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                    <h4 className="mb-2 font-semibold text-system-info text-sm">ℹ️ Características:</h4>
                    <ul className="text-xs text-text-secondary space-y-1">
                      {result.properties.characteristics.slice(0, 2).map((char, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-system-info">•</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Referência rápida de todas as fórmulas */}
      <Card className="border-neutral-surface-variant">
        <CardHeader>
          <CardTitle className="text-text-primary flex items-center gap-2">
            <span className="text-lg">📚</span>
            Referência Rápida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {shapeOptions.map((shape) => {
              const result = getMockResult(shape.value);
              if (!result) return null;

              const isSelected = shape.value === selectedShape;

              return (
                <div 
                  key={shape.value}
                  className={`border rounded-lg p-3 transition-all ${
                    isSelected 
                      ? "border-primary-blue/30 bg-primary-blue/5 opacity-50" 
                      : "border-neutral-surface-variant hover:border-primary-blue/20 hover:bg-primary-blue/5"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{shape.icon}</span>
                    <span className="font-medium text-sm text-text-primary">
                      {shape.label}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-system-success">Área:</span>
                      <code className="font-mono text-text-primary">
                        {result.formulas.area}
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-growth-green">Perímetro:</span>
                      <code className="font-mono text-text-primary">
                        {result.formulas.perimeter}
                      </code>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-system-warning/10 rounded-lg border border-system-warning/20">
            <p className="text-xs text-system-warning font-semibold mb-1">💡 Dica:</p>
            <p className="text-xs text-text-secondary">
              As fórmulas acima são para valores unitários. Substitua pelas suas dimensões reais.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}