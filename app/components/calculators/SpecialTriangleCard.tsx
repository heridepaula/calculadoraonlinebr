import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";

interface SpecialTriangleCardProps {
  triangles: Array<{
    name: string;
    ratio: string;
    description: string;
  }>;
}

export const SpecialTriangleCard: React.FC<SpecialTriangleCardProps> = ({ triangles }) => {
  if (triangles.length === 0) return null;

  const getTriangleIcon = (name: string) => {
    if (name.includes("Egípcio") || name.includes("3:4:5")) return "🏺";
    if (name.includes("45°") || name.includes("Isósceles")) return "📐";
    if (name.includes("30-60") || name.includes("30°")) return "🎯";
    if (name.includes("5:12:13")) return "🏗️";
    return "⭐";
  };

  return (
    <Card className="border-2 border-system-success bg-gradient-to-r from-system-success/10 to-growth-green/10 animate-pulse">
      <CardHeader>
        <CardTitle className="text-system-success flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="special triangle">⭐</span>
          Triângulo Especial Detectado!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {triangles.map((triangle, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {getTriangleIcon(triangle.name)}
                </span>
                <h3 className="text-lg font-bold text-system-success">
                  {triangle.name}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="rounded-lg bg-background-dark-secondary p-3">
                  <p className="text-sm font-semibold text-text-secondary mb-1">
                    Proporção:
                  </p>
                  <p className="text-xl font-mono font-bold text-primary-blue-dark">
                    {triangle.ratio}
                  </p>
                </div>
                
                <div className="rounded-lg bg-system-success/5 border border-system-success/20 p-3">
                  <p className="text-sm text-text-secondary">
                    {triangle.description}
                  </p>
                </div>
              </div>

              {/* Historical context for famous triangles */}
              {triangle.name.includes("Egípcio") && (
                <div className="mt-3 text-xs text-text-secondary bg-background-dark-secondary/50 p-2 rounded">
                  <strong>📚 História:</strong> Usado pelos antigos egípcios na construção das pirâmides há mais de 4000 anos.
                </div>
              )}
              
              {triangle.name.includes("45°") && (
                <div className="mt-3 text-xs text-text-secondary bg-background-dark-secondary/50 p-2 rounded">
                  <strong>📐 Aplicação:</strong> Comum em arquitetura e design, especialmente em estruturas simétricas.
                </div>
              )}
              
              {triangle.name.includes("30-60") && (
                <div className="mt-3 text-xs text-text-secondary bg-background-dark-secondary/50 p-2 rounded">
                  <strong>🎯 Uso:</strong> Fundamental em trigonometria, com valores exatos para seno, cosseno e tangente.
                </div>
              )}

              {triangle.name.includes("5:12:13") && (
                <div className="mt-3 text-xs text-text-secondary bg-background-dark-secondary/50 p-2 rounded">
                  <strong>🏗️ Prática:</strong> Amplamente usado em construção civil e carpintaria para criar ângulos retos.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits of special triangles */}
        <div className="mt-4 p-3 bg-growth-green/10 rounded-lg border border-growth-green/20">
          <h4 className="text-xs font-semibold text-growth-green mb-2">
            💡 Por que são especiais?
          </h4>
          <div className="text-xs text-text-secondary space-y-1">
            <p>• <strong>Valores inteiros:</strong> Todos os lados são números inteiros ou têm valores exatos</p>
            <p>• <strong>Fácil memorização:</strong> Proporções simples e reconhecíveis</p>
            <p>• <strong>Aplicação prática:</strong> Usados em construção, navegação e engenharia</p>
            <p>• <strong>Base matemática:</strong> Fundamentais para o ensino de geometria</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};