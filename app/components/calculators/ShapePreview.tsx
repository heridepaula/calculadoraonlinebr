import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";

interface ShapePreviewProps {
  shape: string;
  dimensions: Record<string, string>;
  unit: string;
}

export function ShapePreview({ shape, dimensions, unit }: ShapePreviewProps) {
  const getShapeDisplay = () => {
    const shapeNames: Record<string, string> = {
      square: "Quadrado",
      rectangle: "Retângulo", 
      circle: "Círculo",
      triangle: "Triângulo",
      parallelogram: "Paralelogramo",
      trapezoid: "Trapézio",
      rhombus: "Losango",
      ellipse: "Elipse"
    };
    return shapeNames[shape] || shape;
  };

  const renderShape = () => {
    switch (shape) {
      case "square":
        return <SquareSVG dimensions={dimensions} unit={unit} />;
      case "rectangle":
        return <RectangleSVG dimensions={dimensions} unit={unit} />;
      case "circle":
        return <CircleSVG dimensions={dimensions} unit={unit} />;
      case "triangle":
        return <TriangleSVG dimensions={dimensions} unit={unit} />;
      case "parallelogram":
        return <ParallelogramSVG dimensions={dimensions} unit={unit} />;
      case "trapezoid":
        return <TrapezoidSVG dimensions={dimensions} unit={unit} />;
      case "rhombus":
        return <RhombusSVG dimensions={dimensions} unit={unit} />;
      case "ellipse":
        return <EllipseSVG dimensions={dimensions} unit={unit} />;
      default:
        return (
          <div className="flex h-48 items-center justify-center text-text-secondary">
            <p>Selecione uma forma para visualizar</p>
          </div>
        );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary-blue-light/30 to-system-success/10 border-primary-blue/20">
      <CardHeader>
        <CardTitle className="text-primary-blue-dark flex items-center gap-2">
          <span className="text-xl">👁️</span>
          Visualização - {getShapeDisplay()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-56 items-center justify-center rounded-lg bg-background-dark-secondary/50">
          {renderShape()}
        </div>
        <div className="mt-4 text-center text-sm text-text-secondary">
          <p>Unidade: <span className="font-semibold text-primary-blue">{unit}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente SVG para Quadrado
function SquareSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const side = parseFloat(dimensions.side) || 50;
  const displaySize = Math.max(Math.min(side * 3, 150), 60);
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <rect
        x={(200 - displaySize) / 2}
        y={(200 - displaySize) / 2}
        width={displaySize}
        height={displaySize}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {dimensions.side && (
        <text 
          x="100" 
          y="100" 
          textAnchor="middle" 
          className="text-sm font-semibold fill-primary-blue-dark"
        >
          {side}{unit}
        </text>
      )}
    </svg>
  );
}

// Componente SVG para Retângulo
function RectangleSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const length = parseFloat(dimensions.length) || 80;
  const width = parseFloat(dimensions.width) || 50;
  
  // Normalizar para caber na visualização
  const maxDim = Math.max(length, width);
  const scale = maxDim > 120 ? 120 / maxDim : 1;
  const displayLength = length * scale;
  const displayWidth = width * scale;
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <rect
        x={(200 - displayLength) / 2}
        y={(200 - displayWidth) / 2}
        width={displayLength}
        height={displayWidth}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {dimensions.length && dimensions.width && (
        <>
          <text 
            x="100" 
            y="100" 
            textAnchor="middle" 
            className="text-xs font-semibold fill-primary-blue-dark"
          >
            {length}×{width}{unit}
          </text>
        </>
      )}
    </svg>
  );
}

// Componente SVG para Círculo
function CircleSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const radius = parseFloat(dimensions.radius) || (dimensions.diameter ? parseFloat(dimensions.diameter) / 2 : 40);
  const displayRadius = Math.max(Math.min(radius * 2, 80), 30);
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <circle
        cx="100"
        cy="100"
        r={displayRadius}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {/* Linha do raio */}
      <line
        x1="100"
        y1="100"
        x2={100 + displayRadius}
        y2="100"
        stroke="#4CAF50"
        strokeWidth="1.5"
        strokeDasharray="3,3"
      />
      {(dimensions.radius || dimensions.diameter) && (
        <>
          <text 
            x="100" 
            y="105" 
            textAnchor="middle" 
            className="text-xs font-semibold fill-primary-blue-dark"
          >
            r = {radius.toFixed(1)}{unit}
          </text>
          <text 
            x={100 + displayRadius/2} 
            y="95" 
            textAnchor="middle" 
            className="text-xs font-medium fill-system-success"
          >
            r
          </text>
        </>
      )}
    </svg>
  );
}

// Componente SVG para Triângulo
function TriangleSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const base = parseFloat(dimensions.base) || 80;
  const height = parseFloat(dimensions.height) || 60;
  
  const maxDim = Math.max(base, height);
  const scale = maxDim > 120 ? 120 / maxDim : 1;
  const displayBase = base * scale;
  const displayHeight = height * scale;
  
  const startX = (200 - displayBase) / 2;
  const startY = (200 + displayHeight) / 2;
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <polygon
        points={`${startX},${startY} ${startX + displayBase},${startY} ${startX + displayBase/2},${startY - displayHeight}`}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {/* Linha da altura */}
      <line
        x1={startX + displayBase/2}
        y1={startY}
        x2={startX + displayBase/2}
        y2={startY - displayHeight}
        stroke="#4CAF50"
        strokeWidth="1.5"
        strokeDasharray="3,3"
      />
      {dimensions.base && dimensions.height && (
        <>
          <text 
            x={startX + displayBase/2} 
            y={startY + 15} 
            textAnchor="middle" 
            className="text-xs font-medium fill-primary-blue-dark"
          >
            {base}{unit}
          </text>
          <text 
            x={startX + displayBase/2 + 15} 
            y={startY - displayHeight/2} 
            textAnchor="middle" 
            className="text-xs font-medium fill-system-success"
          >
            {height}{unit}
          </text>
        </>
      )}
    </svg>
  );
}

// Componentes SVG simplificados para outras formas
function ParallelogramSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const base = parseFloat(dimensions.base) || 80;
  const height = parseFloat(dimensions.height) || 50;
  const skew = 20;
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <polygon
        points={`80,120 ${80+base},120 ${100+base},${120-height} 100,${120-height}`}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {dimensions.base && dimensions.height && (
        <text 
          x="100" 
          y="110" 
          textAnchor="middle" 
          className="text-xs font-semibold fill-primary-blue-dark"
        >
          {base}×{height}{unit}
        </text>
      )}
    </svg>
  );
}

function TrapezoidSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const base1 = parseFloat(dimensions.base1) || 100;
  const base2 = parseFloat(dimensions.base2) || 60;
  const height = parseFloat(dimensions.height) || 50;
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <polygon
        points={`70,130 170,130 ${100+(base2/2)},80 ${100-(base2/2)},80`}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {dimensions.base1 && dimensions.base2 && (
        <text 
          x="100" 
          y="110" 
          textAnchor="middle" 
          className="text-xs font-semibold fill-primary-blue-dark"
        >
          {base1}×{base2}{unit}
        </text>
      )}
    </svg>
  );
}

function RhombusSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const side = parseFloat(dimensions.side) || 60;
  const displaySize = Math.max(Math.min(side * 2, 100), 50);
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <polygon
        points={`100,${100-displaySize/2} ${100+displaySize/2},100 100,${100+displaySize/2} ${100-displaySize/2},100`}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {dimensions.side && (
        <text 
          x="100" 
          y="105" 
          textAnchor="middle" 
          className="text-xs font-semibold fill-primary-blue-dark"
        >
          {side}{unit}
        </text>
      )}
    </svg>
  );
}

function EllipseSVG({ dimensions, unit }: { dimensions: Record<string, string>; unit: string }) {
  const semiMajor = parseFloat(dimensions.semiMajorAxis) || 70;
  const semiMinor = parseFloat(dimensions.semiMinorAxis) || 45;
  
  const maxDim = Math.max(semiMajor, semiMinor);
  const scale = maxDim > 80 ? 80 / maxDim : 1;
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
      <ellipse
        cx="100"
        cy="100"
        rx={semiMajor * scale}
        ry={semiMinor * scale}
        fill="rgba(99, 181, 246, 0.2)"
        stroke="#63B5F6"
        strokeWidth="2"
        className="animate-pulse"
      />
      {dimensions.semiMajorAxis && dimensions.semiMinorAxis && (
        <text 
          x="100" 
          y="105" 
          textAnchor="middle" 
          className="text-xs font-semibold fill-primary-blue-dark"
        >
          {semiMajor}×{semiMinor}{unit}
        </text>
      )}
    </svg>
  );
}