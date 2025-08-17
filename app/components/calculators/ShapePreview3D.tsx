import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import type { VolumeParams } from "~/utils/calculations";

interface ShapePreview3DProps {
  shape: VolumeParams["shape"];
  dimensions: Record<string, string>;
  unit: string;
}

export const ShapePreview3D = React.memo<ShapePreview3DProps>(function ShapePreview3D({ shape, dimensions, unit }) {
  const getShapeDisplay = () => {
    const shapeNames: Record<string, string> = {
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
    return shapeNames[shape] || shape;
  };

  const renderShape3D = () => {
    switch (shape) {
      case "cube":
        return <CubeSVG dimensions={dimensions} unit={unit} />;
      case "rectangular_prism":
        return <RectangularPrismSVG dimensions={dimensions} unit={unit} />;
      case "sphere":
        return <SphereSVG dimensions={dimensions} unit={unit} />;
      case "cylinder":
        return <CylinderSVG dimensions={dimensions} unit={unit} />;
      case "cone":
        return <ConeSVG dimensions={dimensions} unit={unit} />;
      case "pyramid":
        return <PyramidSVG dimensions={dimensions} unit={unit} />;
      case "triangular_prism":
        return <TriangularPrismSVG dimensions={dimensions} unit={unit} />;
      case "ellipsoid":
        return <EllipsoidSVG dimensions={dimensions} unit={unit} />;
      case "frustum":
        return <FrustumSVG dimensions={dimensions} unit={unit} />;
      default:
        return (
          <div className="flex h-56 items-center justify-center text-text-secondary">
            <p>Selecione um sólido para visualizar</p>
          </div>
        );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary-blue-light/30 to-system-success/10 border-primary-blue/20">
      <CardHeader>
        <CardTitle className="text-primary-blue-dark flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="3D visualization">🎲</span>
          Visualização 3D - {getShapeDisplay()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="flex h-64 items-center justify-center rounded-lg bg-background-dark-secondary/50 relative overflow-hidden"
          role="img"
          aria-label={`Visualização 3D de ${getShapeDisplay()}`}
        >
          {renderShape3D()}
        </div>
        <div className="mt-4 text-center text-sm text-text-secondary">
          <p>Unidade: <span className="font-semibold text-primary-blue">{unit}</span></p>
          <p className="text-xs mt-1 opacity-75">Visualização em perspectiva 3D</p>
        </div>
      </CardContent>
    </Card>
  );
});

// Componente SVG 3D para Cubo
function CubeSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const side = parseFloat(dimensions.side) || 50;
  const size = Math.max(Math.min(side * 2, 120), 60);
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Face frontal */}
      <polygon
        points={`60,180 ${60+size},180 ${60+size},${180-size} 60,${180-size}`}
        fill="rgba(99, 181, 246, 0.8)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {/* Face superior */}
      <polygon
        points={`60,${180-size} ${60+size},${180-size} ${80+size},${160-size} 80,${160-size}`}
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      {/* Face lateral direita */}
      <polygon
        points={`${60+size},180 ${80+size},160 ${80+size},${160-size} ${60+size},${180-size}`}
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {dimensions.side && (
        <>
          <text 
            x={60 + size/2} 
            y="195" 
            textAnchor="middle" 
            className="text-sm font-bold fill-primary-blue-dark"
          >
            {side}{unit}
          </text>
          <text 
            x="45" 
            y={180 - size/2} 
            textAnchor="middle" 
            className="text-sm font-bold fill-primary-blue-dark"
            transform={`rotate(-90, 45, ${180 - size/2})`}
          >
            {side}{unit}
          </text>
        </>
      )}
    </svg>
  );
}

// Componente SVG 3D para Prisma Retangular
function RectangularPrismSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const length = parseFloat(dimensions.length) || 80;
  const width = parseFloat(dimensions.width) || 50;
  const height = parseFloat(dimensions.height) || 60;
  
  const maxDim = Math.max(length, width, height);
  const scale = maxDim > 100 ? 100 / maxDim : 1;
  const l = length * scale;
  const w = width * scale;
  const h = height * scale;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Face frontal */}
      <polygon
        points={`60,180 ${60+l},180 ${60+l},${180-h} 60,${180-h}`}
        fill="rgba(99, 181, 246, 0.8)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {/* Face superior */}
      <polygon
        points={`60,${180-h} ${60+l},${180-h} ${60+l+w/2},${180-h-w/2} ${60+w/2},${180-h-w/2}`}
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      {/* Face lateral direita */}
      <polygon
        points={`${60+l},180 ${60+l+w/2},${180-w/2} ${60+l+w/2},${180-h-w/2} ${60+l},${180-h}`}
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {dimensions.length && dimensions.width && dimensions.height && (
        <text 
          x={60 + l/2} 
          y="195" 
          textAnchor="middle" 
          className="text-xs font-bold fill-primary-blue-dark"
        >
          {length}×{width}×{height}{unit}
        </text>
      )}
    </svg>
  );
}

// Componente SVG 3D para Esfera
function SphereSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const radius = parseFloat(dimensions.radius) || (dimensions.diameter ? parseFloat(dimensions.diameter) / 2 : 50);
  const r = Math.max(Math.min(radius * 1.5, 80), 40);
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Círculo principal */}
      <circle
        cx="120"
        cy="120"
        r={r}
        fill="rgba(99, 181, 246, 0.3)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      {/* Círculo de contorno 3D */}
      <ellipse
        cx="120"
        cy="120"
        rx={r}
        ry={r * 0.3}
        fill="none"
        stroke="#4CAF50"
        strokeWidth="1.5"
        strokeDasharray="4,4"
        opacity="0.7"
      />
      
      {/* Semicírculo vertical para dar efeito 3D */}
      <ellipse
        cx="120"
        cy="120"
        rx={r * 0.3}
        ry={r}
        fill="none"
        stroke="#4CAF50"
        strokeWidth="1.5"
        strokeDasharray="4,4"
        opacity="0.7"
      />
      
      {/* Linha do raio */}
      <line
        x1="120"
        y1="120"
        x2={120 + r}
        y2="120"
        stroke="#FF9800"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      
      {(dimensions.radius || dimensions.diameter) && (
        <>
          <text 
            x="120" 
            y="135" 
            textAnchor="middle" 
            className="text-sm font-bold fill-primary-blue-dark"
          >
            r = {radius.toFixed(1)}{unit}
          </text>
          <text 
            x={120 + r/2} 
            y="110" 
            textAnchor="middle" 
            className="text-xs font-bold fill-orange-500"
          >
            r
          </text>
        </>
      )}
    </svg>
  );
}

// Componente SVG 3D para Cilindro
function CylinderSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const radius = parseFloat(dimensions.radius) || (dimensions.diameter ? parseFloat(dimensions.diameter) / 2 : 40);
  const height = parseFloat(dimensions.height) || 80;
  
  const maxDim = Math.max(radius * 2, height);
  const scale = maxDim > 120 ? 120 / maxDim : 1;
  const r = radius * scale;
  const h = height * scale;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Base inferior */}
      <ellipse
        cx="120"
        cy={180}
        rx={r}
        ry={r * 0.3}
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {/* Corpo do cilindro */}
      <rect
        x={120 - r}
        y={180 - h}
        width={r * 2}
        height={h}
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      {/* Base superior */}
      <ellipse
        cx="120"
        cy={180 - h}
        rx={r}
        ry={r * 0.3}
        fill="rgba(99, 181, 246, 0.8)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {/* Linha de altura */}
      <line
        x1="120"
        y1="180"
        x2="120"
        y2={180 - h}
        stroke="#4CAF50"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      
      {dimensions.height && (dimensions.radius || dimensions.diameter) && (
        <>
          <text 
            x="105" 
            y={180 - h/2} 
            textAnchor="middle" 
            className="text-xs font-bold fill-system-success"
            transform={`rotate(-90, 105, ${180 - h/2})`}
          >
            h = {height.toFixed(1)}{unit}
          </text>
          <text 
            x="120" 
            y="200" 
            textAnchor="middle" 
            className="text-xs font-bold fill-primary-blue-dark"
          >
            r = {radius.toFixed(1)}{unit}
          </text>
        </>
      )}
    </svg>
  );
}

// Componente SVG 3D para Cone
function ConeSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const radius = parseFloat(dimensions.radius) || (dimensions.diameter ? parseFloat(dimensions.diameter) / 2 : 40);
  const height = parseFloat(dimensions.height) || 80;
  
  const maxDim = Math.max(radius * 2, height);
  const scale = maxDim > 120 ? 120 / maxDim : 1;
  const r = radius * scale;
  const h = height * scale;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Base */}
      <ellipse
        cx="120"
        cy="180"
        rx={r}
        ry={r * 0.3}
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {/* Cone */}
      <polygon
        points={`${120-r},180 ${120+r},180 120,${180-h}`}
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      {/* Linha de altura */}
      <line
        x1="120"
        y1="180"
        x2="120"
        y2={180 - h}
        stroke="#4CAF50"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      
      {dimensions.height && (dimensions.radius || dimensions.diameter) && (
        <>
          <text 
            x="105" 
            y={180 - h/2} 
            textAnchor="middle" 
            className="text-xs font-bold fill-system-success"
            transform={`rotate(-90, 105, ${180 - h/2})`}
          >
            h = {height.toFixed(1)}{unit}
          </text>
          <text 
            x="120" 
            y="200" 
            textAnchor="middle" 
            className="text-xs font-bold fill-primary-blue-dark"
          >
            r = {radius.toFixed(1)}{unit}
          </text>
        </>
      )}
    </svg>
  );
}

// Componente SVG 3D para Pirâmide
function PyramidSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const base = parseFloat(dimensions.base) || 80;
  const height = parseFloat(dimensions.height) || 60;
  
  const maxDim = Math.max(base, height);
  const scale = maxDim > 100 ? 100 / maxDim : 1;
  const b = base * scale;
  const h = height * scale;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Base */}
      <polygon
        points={`${120-b/2},180 ${120+b/2},180 ${120+b/2+b/4},${180-b/4} ${120-b/2+b/4},${180-b/4}`}
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {/* Faces da pirâmide */}
      <polygon
        points={`${120-b/2},180 ${120+b/2},180 120,${180-h}`}
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      <polygon
        points={`${120+b/2},180 ${120+b/2+b/4},${180-b/4} 120,${180-h}`}
        fill="rgba(99, 181, 246, 0.3)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {/* Linha de altura */}
      <line
        x1="120"
        y1="180"
        x2="120"
        y2={180 - h}
        stroke="#4CAF50"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      
      {dimensions.height && dimensions.base && (
        <>
          <text 
            x="105" 
            y={180 - h/2} 
            textAnchor="middle" 
            className="text-xs font-bold fill-system-success"
            transform={`rotate(-90, 105, ${180 - h/2})`}
          >
            h = {height.toFixed(1)}{unit}
          </text>
          <text 
            x="120" 
            y="200" 
            textAnchor="middle" 
            className="text-xs font-bold fill-primary-blue-dark"
          >
            base = {base.toFixed(1)}{unit}
          </text>
        </>
      )}
    </svg>
  );
}

// Componentes simplificados para formas mais complexas
function TriangularPrismSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const base = parseFloat(dimensions.base) || 60;
  const height = parseFloat(dimensions.height) || 50;
  const length = parseFloat(dimensions.length) || 80;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Base triangular frontal */}
      <polygon
        points="90,180 150,180 120,130"
        fill="rgba(99, 181, 246, 0.8)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {/* Base triangular traseira */}
      <polygon
        points="110,160 170,160 140,110"
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      {/* Faces laterais */}
      <polygon
        points="90,180 110,160 140,110 120,130"
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      <polygon
        points="150,180 170,160 140,110 120,130"
        fill="rgba(99, 181, 246, 0.5)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {dimensions.base && dimensions.height && dimensions.length && (
        <text 
          x="120" 
          y="200" 
          textAnchor="middle" 
          className="text-xs font-bold fill-primary-blue-dark"
        >
          {base}×{height}×{length}{unit}
        </text>
      )}
    </svg>
  );
}

function EllipsoidSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const a = parseFloat(dimensions.semiAxisA) || 60;
  const b = parseFloat(dimensions.semiAxisB) || 45;
  const c = parseFloat(dimensions.semiAxisC) || 30;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Elipse principal */}
      <ellipse
        cx="120"
        cy="120"
        rx={a * 0.8}
        ry={b * 0.8}
        fill="rgba(99, 181, 246, 0.3)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      {/* Elipses de contorno para efeito 3D */}
      <ellipse
        cx="120"
        cy="120"
        rx={a * 0.8}
        ry={c * 0.4}
        fill="none"
        stroke="#4CAF50"
        strokeWidth="1.5"
        strokeDasharray="4,4"
        opacity="0.7"
      />
      
      {dimensions.semiAxisA && dimensions.semiAxisB && dimensions.semiAxisC && (
        <text 
          x="120" 
          y="200" 
          textAnchor="middle" 
          className="text-xs font-bold fill-primary-blue-dark"
        >
          a={a}, b={b}, c={c}{unit}
        </text>
      )}
    </svg>
  );
}

function FrustumSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const topRadius = parseFloat(dimensions.topRadius) || 20;
  const bottomRadius = parseFloat(dimensions.bottomRadius) || 40;
  const height = parseFloat(dimensions.height) || 60;
  
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-xl">
      {/* Base inferior */}
      <ellipse
        cx="120"
        cy="180"
        rx={bottomRadius}
        ry={bottomRadius * 0.3}
        fill="rgba(99, 181, 246, 0.6)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {/* Tronco */}
      <polygon
        points={`${120-bottomRadius},180 ${120+bottomRadius},180 ${120+topRadius},${180-height} ${120-topRadius},${180-height}`}
        fill="rgba(99, 181, 246, 0.4)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      {/* Base superior */}
      <ellipse
        cx="120"
        cy={180 - height}
        rx={topRadius}
        ry={topRadius * 0.3}
        fill="rgba(99, 181, 246, 0.8)"
        stroke="#63B5F6"
        strokeWidth="2"
      />
      
      {dimensions.topRadius && dimensions.bottomRadius && dimensions.height && (
        <text 
          x="120" 
          y="200" 
          textAnchor="middle" 
          className="text-xs font-bold fill-primary-blue-dark"
        >
          R={bottomRadius}, r={topRadius}, h={height}{unit}
        </text>
      )}
    </svg>
  );
}