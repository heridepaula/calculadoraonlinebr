import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import type { AreaPerimeterResult } from "~/utils/calculations";

interface ResultsComparisonProps {
  history: AreaPerimeterResult[];
}

export function ResultsComparison({ history }: ResultsComparisonProps) {
  if (history.length < 2) {
    return (
      <Card className="border-system-info/20 bg-system-info/5">
        <CardHeader>
          <CardTitle className="text-system-info flex items-center gap-2">
            <span className="text-lg">📊</span>
            Histórico de Cálculos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-text-secondary py-4">
            <p>Calcule diferentes formas para ver comparações aqui</p>
            <p className="text-xs mt-1 opacity-75">Máximo de 5 cálculos salvos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getShapeEmoji = (shape: string) => {
    const emojis: Record<string, string> = {
      square: "⬜",
      rectangle: "▬", 
      circle: "⭕",
      triangle: "🔺",
      parallelogram: "▱",
      trapezoid: "⬟",
      rhombus: "◊",
      ellipse: "⭕"
    };
    return emojis[shape] || "📐";
  };

  const getShapeName = (shape: string) => {
    const names: Record<string, string> = {
      square: "Quadrado",
      rectangle: "Retângulo",
      circle: "Círculo", 
      triangle: "Triângulo",
      parallelogram: "Paralelogramo",
      trapezoid: "Trapézio",
      rhombus: "Losango",
      ellipse: "Elipse"
    };
    return names[shape] || shape;
  };

  // Encontrar maior área para destacar
  const maxArea = Math.max(...history.map(r => r.area));
  const maxPerimeter = Math.max(...history.map(r => r.perimeter));

  return (
    <Card className="border-growth-green/20 bg-growth-green-soft/30">
      <CardHeader>
        <CardTitle className="text-growth-green flex items-center gap-2">
          <span className="text-lg">📊</span>
          Comparação de Resultados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((result, index) => {
            const isMaxArea = result.area === maxArea;
            const isMaxPerimeter = result.perimeter === maxPerimeter;
            
            return (
              <div 
                key={index} 
                className={`rounded-lg border p-3 transition-all ${
                  index === 0 
                    ? "border-primary-blue/50 bg-primary-blue/10 ring-1 ring-primary-blue/30" 
                    : "border-neutral-surface-variant bg-background-dark-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getShapeEmoji(result.shape)}</span>
                    <span className="font-medium text-text-primary text-sm">
                      {getShapeName(result.shape)}
                    </span>
                    {index === 0 && (
                      <span className="text-xs bg-primary-blue text-white px-2 py-0.5 rounded-full">
                        Atual
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`text-center p-2 rounded ${
                    isMaxArea ? "bg-system-success/20 border border-system-success/30" : "bg-background-dark"
                  }`}>
                    <p className="text-text-secondary mb-1">Área</p>
                    <p className={`font-bold tabular-nums ${
                      isMaxArea ? "text-system-success" : "text-text-primary"
                    }`}>
                      {result.area.toFixed(2)}
                    </p>
                    <p className="text-text-secondary text-xs">{result.areaUnit}</p>
                    {isMaxArea && (
                      <span className="text-xs text-system-success">👑 Maior</span>
                    )}
                  </div>
                  
                  <div className={`text-center p-2 rounded ${
                    isMaxPerimeter ? "bg-growth-green/20 border border-growth-green/30" : "bg-background-dark"
                  }`}>
                    <p className="text-text-secondary mb-1">Perímetro</p>
                    <p className={`font-bold tabular-nums ${
                      isMaxPerimeter ? "text-growth-green" : "text-text-primary"
                    }`}>
                      {result.perimeter.toFixed(2)}
                    </p>
                    <p className="text-text-secondary text-xs">{result.unit}</p>
                    {isMaxPerimeter && (
                      <span className="text-xs text-growth-green">👑 Maior</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {history.length >= 2 && (
          <div className="mt-4 p-3 bg-system-info/10 rounded-lg border border-system-info/20">
            <h4 className="text-xs font-semibold text-system-info mb-2">💡 Insights:</h4>
            <div className="text-xs text-text-secondary space-y-1">
              <p>• {getShapeName(history.find(r => r.area === maxArea)?.shape || "")} tem a maior área</p>
              <p>• {getShapeName(history.find(r => r.perimeter === maxPerimeter)?.shape || "")} tem o maior perímetro</p>
              {maxArea > 0 && maxPerimeter > 0 && (
                <p>• Eficiência espacial: {(maxArea / maxPerimeter).toFixed(2)} área/perímetro</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}