import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import { calculateVolume, type VolumeParams } from "~/utils/calculations";

interface VolumeFormulasReferenceProps {
  selectedShape: VolumeParams["shape"];
}

export const VolumeFormulasReference = React.memo<VolumeFormulasReferenceProps>(function VolumeFormulasReference({ selectedShape }) {
  const shapeOptions = [
    { value: "cube", label: "Cubo", icon: "📦" },
    { value: "rectangular_prism", label: "Prisma Retangular", icon: "📦" },
    { value: "sphere", label: "Esfera", icon: "🌐" },
    { value: "cylinder", label: "Cilindro", icon: "🛢️" },
    { value: "cone", label: "Cone", icon: "🍦" },
    { value: "pyramid", label: "Pirâmide", icon: "🏛️" },
    { value: "triangular_prism", label: "Prisma Triangular", icon: "📐" },
    { value: "ellipsoid", label: "Elipsoide", icon: "🥚" },
    { value: "frustum", label: "Tronco de Cone", icon: "🪣" },
  ];

  const getMockResult = (shape: VolumeParams["shape"]) => {
    const mockDimensions = {
      side: 1,
      length: 1,
      width: 1,
      height: 1,
      radius: 1,
      base: 1,
      topRadius: 1,
      bottomRadius: 1.5,
      semiAxisA: 2,
      semiAxisB: 1.5,
      semiAxisC: 1,
    };

    try {
      return calculateVolume({
        shape,
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
              <span className="text-xl" role="img" aria-label="shape icon">
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
                    <h4 className="mb-2 font-semibold text-system-success text-sm">📊 Volume:</h4>
                    <div className="rounded bg-background-dark-secondary p-2">
                      <code className="text-sm text-text-primary font-mono">
                        {result.formulas.volume}
                      </code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-3">
                    <h4 className="mb-2 font-semibold text-growth-green text-sm">📐 Área Superficial:</h4>
                    <div className="rounded bg-background-dark-secondary p-2">
                      <code className="text-sm text-text-primary font-mono">
                        {result.formulas.surfaceArea}
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

                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
                    <h4 className="mb-2 font-semibold text-system-warning text-sm">🎯 Aplicações:</h4>
                    <ul className="text-xs text-text-secondary space-y-1">
                      {result.properties.applications.slice(0, 2).map((app, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-system-warning">•</span>
                          {app}
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
            Referência Rápida - Volumes 3D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {shapeOptions.map((shape) => {
              const result = getMockResult(shape.value);
              if (!result) return null;

              const isSelected = shape.value === selectedShape as string;

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
                    <div className="flex justify-between items-start">
                      <span className="text-system-success min-w-0 mr-2">Volume:</span>
                      <code className="font-mono text-text-primary text-right">
                        {result.formulas.volume.length > 20 
                          ? result.formulas.volume.substring(0, 20) + "..." 
                          : result.formulas.volume}
                      </code>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-growth-green min-w-0 mr-2">Área Sup.:</span>
                      <code className="font-mono text-text-primary text-right">
                        {result.formulas.surfaceArea.length > 20 
                          ? result.formulas.surfaceArea.substring(0, 20) + "..." 
                          : result.formulas.surfaceArea}
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
              As fórmulas acima são para valores unitários. Substitua pelas suas dimensões reais para cálculos precisos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});