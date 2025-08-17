import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import type { VolumeResult } from "~/utils/calculations";

interface VolumeResultsComparisonProps {
  history: VolumeResult[];
}

export const VolumeResultsComparison = React.memo<VolumeResultsComparisonProps>(function VolumeResultsComparison({ history }) {
  if (history.length < 2) {
    return (
      <Card className="border-system-info/20 bg-system-info/5">
        <CardHeader>
          <CardTitle className="text-system-info flex items-center gap-2">
            <span className="text-lg">📊</span>
            Histórico de Cálculos 3D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-text-secondary py-4">
            <p>Calcule diferentes sólidos para ver comparações aqui</p>
            <p className="text-xs mt-1 opacity-75">Máximo de 5 cálculos salvos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getShapeEmoji = (shape: string) => {
    const emojis: Record<string, string> = {
      cube: "📦",
      rectangular_prism: "📦",
      sphere: "🌐",
      cylinder: "🛢️",
      cone: "🍦",
      pyramid: "🏛️",
      triangular_prism: "📐",
      ellipsoid: "🥚",
      frustum: "🪣"
    };
    return emojis[shape] || "🎲";
  };

  const getShapeName = (shape: string) => {
    const names: Record<string, string> = {
      cube: "Cubo",
      rectangular_prism: "Prisma Retangular",
      sphere: "Esfera",
      cylinder: "Cilindro",
      cone: "Cone",
      pyramid: "Pirâmide",
      triangular_prism: "Prisma Triangular",
      ellipsoid: "Elipsoide",
      frustum: "Tronco de Cone"
    };
    return names[shape] || shape;
  };

  // Encontrar maiores valores para destacar
  const maxVolume = Math.max(...history.map(r => parseFloat(r.volume)));
  const maxSurfaceArea = Math.max(...history.map(r => parseFloat(r.surfaceArea)));

  // Calcular eficiência espacial (volume/área superficial)
  const calculateEfficiency = (volume: number, surfaceArea: number) => {
    return surfaceArea > 0 ? (volume / surfaceArea).toFixed(3) : "0";
  };

  return (
    <Card className="border-growth-green/20 bg-growth-green-soft/30">
      <CardHeader>
        <CardTitle className="text-growth-green flex items-center gap-2">
          <span className="text-lg" role="img" aria-label="comparison chart">📊</span>
          Comparação de Sólidos 3D
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((result, index) => {
            const volume = parseFloat(result.volume);
            const surfaceArea = parseFloat(result.surfaceArea);
            const isMaxVolume = volume === maxVolume;
            const isMaxSurfaceArea = surfaceArea === maxSurfaceArea;
            const efficiency = calculateEfficiency(volume, surfaceArea);
            
            return (
              <div 
                key={index} 
                className={`rounded-lg border p-3 transition-all ${
                  index === 0 
                    ? "border-primary-blue/50 bg-primary-blue/10 ring-1 ring-primary-blue/30" 
                    : "border-neutral-surface-variant bg-background-dark-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
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
                
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className={`text-center p-2 rounded ${
                    isMaxVolume ? "bg-system-success/20 border border-system-success/30" : "bg-background-dark"
                  }`}>
                    <p className="text-text-secondary mb-1">Volume</p>
                    <p className={`font-bold tabular-nums ${
                      isMaxVolume ? "text-system-success" : "text-text-primary"
                    }`}>
                      {result.volume}
                    </p>
                    <p className="text-text-secondary text-xs">{result.volumeUnit}</p>
                    {isMaxVolume && (
                      <span className="text-xs text-system-success">👑 Maior</span>
                    )}
                  </div>
                  
                  <div className={`text-center p-2 rounded ${
                    isMaxSurfaceArea ? "bg-growth-green/20 border border-growth-green/30" : "bg-background-dark"
                  }`}>
                    <p className="text-text-secondary mb-1">Área Superficial</p>
                    <p className={`font-bold tabular-nums ${
                      isMaxSurfaceArea ? "text-growth-green" : "text-text-primary"
                    }`}>
                      {result.surfaceArea}
                    </p>
                    <p className="text-text-secondary text-xs">{result.surfaceAreaUnit}</p>
                    {isMaxSurfaceArea && (
                      <span className="text-xs text-growth-green">👑 Maior</span>
                    )}
                  </div>
                </div>

                {/* Medições auxiliares quando disponíveis */}
                {(result.measurements.diagonal || result.measurements.baseArea || result.measurements.lateralArea) && (
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {result.measurements.diagonal && (
                      <div className="text-center p-1 bg-system-info/10 rounded">
                        <p className="text-system-info font-semibold">
                          {result.measurements.diagonal.toFixed(1)}
                        </p>
                        <p className="text-text-secondary text-xs">Diagonal</p>
                      </div>
                    )}
                    {result.measurements.baseArea && (
                      <div className="text-center p-1 bg-system-info/10 rounded">
                        <p className="text-system-info font-semibold">
                          {result.measurements.baseArea.toFixed(1)}
                        </p>
                        <p className="text-text-secondary text-xs">Área Base</p>
                      </div>
                    )}
                    {result.measurements.lateralArea && (
                      <div className="text-center p-1 bg-system-info/10 rounded">
                        <p className="text-system-info font-semibold">
                          {result.measurements.lateralArea.toFixed(1)}
                        </p>
                        <p className="text-text-secondary text-xs">Área Lateral</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Indicador de eficiência espacial */}
                <div className="mt-2 text-center">
                  <span className="text-xs text-text-secondary">
                    Eficiência: <span className="font-semibold text-primary-blue">{efficiency}</span> vol/área
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {history.length >= 2 && (
          <div className="mt-4 p-3 bg-system-info/10 rounded-lg border border-system-info/20">
            <h4 className="text-xs font-semibold text-system-info mb-2">💡 Insights 3D:</h4>
            <div className="text-xs text-text-secondary space-y-1">
              <p>• {getShapeName(history.find(r => parseFloat(r.volume) === maxVolume)?.shape || "")} tem o maior volume</p>
              <p>• {getShapeName(history.find(r => parseFloat(r.surfaceArea) === maxSurfaceArea)?.shape || "")} tem a maior área superficial</p>
              {maxVolume > 0 && maxSurfaceArea > 0 && (
                <p>• Melhor eficiência espacial: {Math.max(...history.map(r => parseFloat(calculateEfficiency(parseFloat(r.volume), parseFloat(r.surfaceArea))))).toFixed(3)} vol/área</p>
              )}
              <p>• A <strong>esfera</strong> sempre tem a melhor relação volume/área superficial</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});