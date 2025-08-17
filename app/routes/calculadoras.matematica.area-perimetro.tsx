import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { ShapePreview } from "~/components/calculators/ShapePreview";
import { ResultsComparison } from "~/components/calculators/ResultsComparison";
import { FormulasReference } from "~/components/calculators/FormulasReference";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateAreaPerimeter,
  type AreaPerimeterParams,
  type AreaPerimeterResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Área e Perímetro 2025 - Formas Geométricas - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de Área e Perímetro GRATUITA para todas as formas geométricas! Quadrado, retângulo, círculo, triângulo e mais. Fórmulas passo a passo, aplicações práticas e conceitos educativos. Ideal para arquitetura, engenharia e estudos.",
    },
    {
      name: "keywords",
      content:
        "calculadora area perimetro, area quadrado, perimetro retangulo, area circulo, area triangulo, calcular area, calcular perimetro, geometria plana, formas geometricas, matematica geometrica, arquitetura calculo, engenharia medidas, area terreno, perimetro lote, calculo construcao, geometria basica, medidas geometricas, superficie area, contorno perimetro, formulas geometricas, trapezio area, losango perimetro, elipse area, paralelogramo calculo",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },

    // Open Graph tags
    {
      property: "og:title",
      content: `Calculadora de Área e Perímetro - Formas Geométricas 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Calcule área e perímetro de todas as formas geométricas! Quadrado, retângulo, círculo, triângulo e mais. Fórmulas passo a passo e aplicações práticas. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/matematica/area-perimetro",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Área e Perímetro - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Calcule área e perímetro de formas geométricas com explicações passo a passo! Fórmulas detalhadas para arquitetura e engenharia.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function AreaPerimeterCalculator() {
  const [selectedShape, setSelectedShape] = useState<AreaPerimeterParams["shape"]>("square");
  const [dimensions, setDimensions] = useState<Record<string, string>>({});
  const [unit, setUnit] = useState("m");
  const [result, setResult] = useState<AreaPerimeterResult | null>(null);
  const [error, setError] = useState("");
  const [calculationHistory, setCalculationHistory] = useState<AreaPerimeterResult[]>([]);
  const [mobileSection, setMobileSection] = useState<'calculator' | 'preview' | 'theory'>('calculator');

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "area_perimetro",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("area_perimetro");

  const shapeOptions = [
    { value: "square", label: "📐 Quadrado", icon: "⬜" },
    { value: "rectangle", label: "📐 Retângulo", icon: "▬" },
    { value: "circle", label: "🔵 Círculo", icon: "⭕" },
    { value: "triangle", label: "📐 Triângulo", icon: "🔺" },
    { value: "parallelogram", label: "📐 Paralelogramo", icon: "▱" },
    { value: "trapezoid", label: "📐 Trapézio", icon: "⬟" },
    { value: "rhombus", label: "📐 Losango", icon: "◊" },
    { value: "ellipse", label: "🔵 Elipse", icon: "⭕" },
  ];

  const unitOptions = [
    { value: "m", label: "metros (m)" },
    { value: "cm", label: "centímetros (cm)" },
    { value: "mm", label: "milímetros (mm)" },
    { value: "km", label: "quilômetros (km)" },
    { value: "in", label: "polegadas (in)" },
    { value: "ft", label: "pés (ft)" },
  ];

  const handleCalculate = () => {
    setError("");

    try {
      // Convert string inputs to numbers
      const numericDimensions: any = {};
      Object.keys(dimensions).forEach((key) => {
        const stringValue = dimensions[key];
        // Skip empty fields
        if (!stringValue || stringValue.trim() === "") {
          return;
        }
        const value = parseFloat(stringValue);
        if (isNaN(value) || value <= 0) {
          throw new Error(`${key} deve ser um número positivo`);
        }
        numericDimensions[key] = value;
      });

      // Validate required dimensions for each shape
      validateShapeDimensions(selectedShape, numericDimensions);

      const params: AreaPerimeterParams = {
        shape: selectedShape,
        dimensions: numericDimensions,
        unit,
      };

      const calculationResult = calculateAreaPerimeter(params);
      setResult(calculationResult);
      
      // Adicionar ao histórico
      if (calculationResult) {
        setCalculationHistory(prev => [
          calculationResult,
          ...prev.slice(0, 4) // Manter apenas 5 últimos
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no cálculo");
      setResult(null);
    }
  };

  const validateShapeDimensions = (shape: string, dims: any) => {
    switch (shape) {
      case "square":
        if (!dims.side) throw new Error("Lado é obrigatório para quadrado");
        break;
      case "rectangle":
        if (!dims.length || !dims.width)
          throw new Error("Comprimento e largura são obrigatórios para retângulo");
        break;
      case "circle":
        if (!dims.radius && !dims.diameter)
          throw new Error("Raio ou diâmetro é obrigatório para círculo");
        if (dims.radius && dims.diameter)
          throw new Error("Informe APENAS raio OU diâmetro, não ambos");
        break;
      case "triangle":
        if (!dims.base || !dims.height)
          throw new Error("Base e altura são obrigatórios para triângulo");
        break;
      case "parallelogram":
        if (!dims.base || !dims.height)
          throw new Error("Base e altura são obrigatórios para paralelogramo");
        break;
      case "trapezoid":
        if (!dims.base1 || !dims.base2 || !dims.height)
          throw new Error("Base maior, base menor e altura são obrigatórios para trapézio");
        break;
      case "rhombus":
        if (!dims.side) throw new Error("Lado é obrigatório para losango");
        break;
      case "ellipse":
        if (!dims.semiMajorAxis || !dims.semiMinorAxis)
          throw new Error("Semi-eixo maior e menor são obrigatórios para elipse");
        break;
    }
  };

  const handleReset = () => {
    setDimensions({});
    setResult(null);
    setError("");
  };

  const renderShapeInputs = () => {
    switch (selectedShape) {
      case "square":
        return (
          <Input
            type="number"
            label="Lado"
            value={dimensions.side || ""}
            onChange={(e) => setDimensions({ ...dimensions, side: e.target.value })}
            placeholder="Ex: 5"
            step="0.01"
            fullWidth
          />
        );

      case "rectangle":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              type="number"
              label="Comprimento"
              value={dimensions.length || ""}
              onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              placeholder="Ex: 8"
              step="0.01"
              fullWidth
            />
            <Input
              type="number"
              label="Largura"
              value={dimensions.width || ""}
              onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              placeholder="Ex: 5"
              step="0.01"
              fullWidth
            />
          </div>
        );

      case "circle":
        return (
          <div className="space-y-3">
            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
              <p className="text-center text-xs font-semibold text-system-info">
                💡 Informe APENAS um dos valores abaixo
              </p>
            </div>
            <Input
              type="number"
              label="Raio"
              value={dimensions.radius || ""}
              onChange={(e) =>
                setDimensions({ ...dimensions, radius: e.target.value, diameter: "" })
              }
              placeholder="Ex: 4"
              step="0.01"
              fullWidth
            />
            <div className="text-center">
              <span className="inline-block rounded bg-background-dark-secondary px-2 py-1 text-xs text-text-secondary">
                OU
              </span>
            </div>
            <Input
              type="number"
              label="Diâmetro"
              value={dimensions.diameter || ""}
              onChange={(e) =>
                setDimensions({ ...dimensions, diameter: e.target.value, radius: "" })
              }
              placeholder="Ex: 8 (será convertido para raio = 4)"
              step="0.01"
              fullWidth
            />
            {dimensions.diameter && (
              <div className="rounded border border-growth-green/20 bg-growth-green-soft p-2">
                <p className="text-center text-xs text-growth-green">
                  ✓ Raio calculado: {(parseFloat(dimensions.diameter) / 2).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        );

      case "triangle":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                type="number"
                label="Base"
                value={dimensions.base || ""}
                onChange={(e) => setDimensions({ ...dimensions, base: e.target.value })}
                placeholder="Ex: 10"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Altura"
                value={dimensions.height || ""}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 6"
                step="0.01"
                fullWidth
              />
            </div>
            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
              <p className="mb-2 text-xs text-text-secondary">
                <strong>Lados do triângulo (para perímetro):</strong>
              </p>
              <p className="mb-3 text-xs text-system-warning">
                ⚠️ Para perímetro correto, informe os 3 lados reais do triângulo
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Input
                  type="number"
                  label="Lado 1"
                  value={dimensions.side1 || ""}
                  onChange={(e) => setDimensions({ ...dimensions, side1: e.target.value })}
                  placeholder="Ex: 10"
                  step="0.01"
                  fullWidth
                />
                <Input
                  type="number"
                  label="Lado 2"
                  value={dimensions.side2 || ""}
                  onChange={(e) => setDimensions({ ...dimensions, side2: e.target.value })}
                  placeholder="Ex: 8"
                  step="0.01"
                  fullWidth
                />
                <Input
                  type="number"
                  label="Lado 3"
                  value={dimensions.side3 || ""}
                  onChange={(e) => setDimensions({ ...dimensions, side3: e.target.value })}
                  placeholder="Ex: 8"
                  step="0.01"
                  fullWidth
                />
              </div>
            </div>
          </div>
        );

      case "parallelogram":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                type="number"
                label="Base"
                value={dimensions.base || ""}
                onChange={(e) => setDimensions({ ...dimensions, base: e.target.value })}
                placeholder="Ex: 8"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Altura"
                value={dimensions.height || ""}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 5"
                step="0.01"
                fullWidth
              />
            </div>
            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
              <Input
                type="number"
                label="Lado oblíquo (opcional)"
                value={dimensions.side1 || ""}
                onChange={(e) => setDimensions({ ...dimensions, side1: e.target.value })}
                placeholder="Ex: 6 (se não informado, será estimado)"
                step="0.01"
                fullWidth
              />
              <p className="mt-2 text-xs text-system-warning">
                ⚠️ Para perímetro preciso, informe a medida real do lado oblíquo
              </p>
            </div>
          </div>
        );

      case "trapezoid":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Input
                type="number"
                label="Base Maior"
                value={dimensions.base1 || ""}
                onChange={(e) => setDimensions({ ...dimensions, base1: e.target.value })}
                placeholder="Ex: 12"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Base Menor"
                value={dimensions.base2 || ""}
                onChange={(e) => setDimensions({ ...dimensions, base2: e.target.value })}
                placeholder="Ex: 8"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Altura"
                value={dimensions.height || ""}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 5"
                step="0.01"
                fullWidth
              />
            </div>
            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
              <p className="mb-2 text-xs text-text-secondary">
                <strong>Lados laterais (para perímetro):</strong>
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Input
                  type="number"
                  label="Lado 1"
                  value={dimensions.side1 || ""}
                  onChange={(e) => setDimensions({ ...dimensions, side1: e.target.value })}
                  placeholder="Ex: 6 (opcional)"
                  step="0.01"
                  fullWidth
                />
                <Input
                  type="number"
                  label="Lado 2"
                  value={dimensions.side2 || ""}
                  onChange={(e) => setDimensions({ ...dimensions, side2: e.target.value })}
                  placeholder="Ex: 6 (opcional)"
                  step="0.01"
                  fullWidth
                />
              </div>
            </div>
          </div>
        );

      case "rhombus":
        return (
          <div className="space-y-3">
            <Input
              type="number"
              label="Lado"
              value={dimensions.side || ""}
              onChange={(e) => setDimensions({ ...dimensions, side: e.target.value })}
              placeholder="Ex: 6"
              step="0.01"
              fullWidth
            />
            <Input
              type="number"
              label="Altura (opcional - será estimada)"
              value={dimensions.height || ""}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              placeholder="Ex: 5"
              step="0.01"
              fullWidth
            />
          </div>
        );

      case "ellipse":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              type="number"
              label="Semi-eixo Maior (a)"
              value={dimensions.semiMajorAxis || ""}
              onChange={(e) => setDimensions({ ...dimensions, semiMajorAxis: e.target.value })}
              placeholder="Ex: 8"
              step="0.01"
              fullWidth
            />
            <Input
              type="number"
              label="Semi-eixo Menor (b)"
              value={dimensions.semiMinorAxis || ""}
              onChange={(e) => setDimensions({ ...dimensions, semiMinorAxis: e.target.value })}
              placeholder="Ex: 5"
              step="0.01"
              fullWidth
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Área e Perímetro</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de Área e Perímetro</span>
          <span className="sm:hidden">Área e Perímetro</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Calcule <strong className="text-primary-blue-dark">área e perímetro</strong> de
          <strong className="text-system-success"> formas geométricas</strong> com
          <strong className="text-growth-green">fórmulas passo a passo</strong> e aplicações
          práticas.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            📐 <strong>8 Formas Geométricas</strong> • 📊 <strong>Fórmulas Detalhadas</strong> • 🏗️{" "}
            <strong>Aplicações Práticas</strong>
          </p>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex rounded-lg bg-background-dark-secondary p-1">
          <button 
            onClick={() => setMobileSection('calculator')}
            className={`flex-1 py-2 px-3 text-center rounded-md text-sm font-medium transition-colors ${
              mobileSection === 'calculator' 
                ? 'bg-primary-blue text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            🧮 Calcular
          </button>
          <button 
            onClick={() => setMobileSection('preview')}
            className={`flex-1 py-2 px-3 text-center rounded-md text-sm font-medium transition-colors ${
              mobileSection === 'preview' 
                ? 'bg-system-success text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            👁️ Visualizar
          </button>
          <button 
            onClick={() => setMobileSection('theory')}
            className={`flex-1 py-2 px-3 text-center rounded-md text-sm font-medium transition-colors ${
              mobileSection === 'theory' 
                ? 'bg-growth-green text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            📚 Aprender
          </button>
        </div>
      </div>

      {/* Layout Principal Unificado */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Coluna 1: Calculadora (lg:col-span-4) */}
        <div className={`space-y-4 lg:col-span-4 ${mobileSection !== 'calculator' ? 'hidden md:block' : ''}`}>
          <Card>
            <CardHeader>
              <CardTitle as="h2">🔢 Selecionar Forma Geométrica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
                  {shapeOptions.map((shape) => (
                    <button
                      key={shape.value}
                      onClick={() => {
                        setSelectedShape(shape.value as AreaPerimeterParams["shape"]);
                        setDimensions({});
                        setResult(null);
                        setError("");
                      }}
                      className={`rounded-lg border p-3 text-center transition-all hover:scale-105 ${
                        selectedShape === shape.value
                          ? "border-primary-blue bg-primary-blue-light text-primary-blue-dark shadow-lg"
                          : "border-neutral-surface-variant hover:border-primary-blue/50 hover:bg-primary-blue-light/30"
                      }`}
                    >
                      <div className="mb-1 text-xl">{shape.icon}</div>
                      <div className="text-xs font-medium">
                        {shape.label.replace("📐 ", "").replace("🔵 ", "")}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-system-info">Forma selecionada:</strong>{" "}
                    {shapeOptions.find((s) => s.value === selectedShape)?.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">📏 Dimensões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Unidade de medida
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full rounded-lg border border-neutral-surface-variant bg-background-dark-secondary px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    {unitOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {renderShapeInputs()}

                {error && (
                  <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-3">
                    <p className="text-sm font-medium text-system-error">{error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button onClick={handleCalculate} className="px-6" fullWidth>
              Calcular Área e Perímetro
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-6 text-system-error hover:bg-system-error hover:text-white"
              fullWidth
            >
              Limpar
            </Button>
          </div>
        </div>

        {/* Coluna 2: Preview + Resultados (lg:col-span-4) */}
        <div className={`space-y-4 lg:col-span-4 ${mobileSection !== 'preview' ? 'hidden md:block' : ''}`}>
          {/* Preview Visual */}
          <ShapePreview 
            shape={selectedShape} 
            dimensions={dimensions} 
            unit={unit} 
          />
          
          {/* Resultados */}
          {result && (
            <div className="space-y-4">
              <Card className="border-2 border-primary-blue bg-primary-blue-light/50 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                    📊 Resultados - {result.shape}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Área</p>
                        <div className="text-2xl font-bold tabular-nums text-system-success">
                          {result.area.toFixed(2)} {result.areaUnit}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Perímetro</p>
                        <div className="text-2xl font-bold tabular-nums text-growth-green">
                          {result.perimeter.toFixed(2)} {result.unit}
                        </div>
                      </div>
                    </div>

                    {result.measurements.diagonal && (
                      <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                        <p className="text-center text-xs font-semibold text-system-info">
                          📏 Diagonal: {result.measurements.diagonal.toFixed(2)} {result.unit}
                        </p>
                      </div>
                    )}

                    {result.measurements.circumference && (
                      <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                        <p className="text-center text-xs font-semibold text-system-info">
                          ⭕ Circunferência: {result.measurements.circumference.toFixed(2)}{" "}
                          {result.unit}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-system-info bg-system-info/10 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-system-info">
                    📐 Fórmulas Utilizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-system-success">Área:</div>
                      <p className="font-mono text-system-success">{result.formulas.area}</p>
                    </div>
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-growth-green">Perímetro:</div>
                      <p className="font-mono text-growth-green">{result.formulas.perimeter}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-neutral-surface-variant bg-background-dark-secondary/50 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-text-primary">
                    🔢 Cálculo Passo a Passo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="mb-2 font-semibold text-system-success">📐 Cálculo da Área:</p>
                      {result.calculations.areaSteps.map((step, index) => (
                        <p key={index} className="mb-1 ml-2 font-mono text-text-secondary">
                          {step}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-growth-green">
                        📏 Cálculo do Perímetro:
                      </p>
                      {result.calculations.perimeterSteps.map((step, index) => (
                        <p key={index} className="mb-1 ml-2 font-mono text-text-secondary">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Comparação de Resultados */}
          <ResultsComparison history={calculationHistory} />
        </div>

        {/* Coluna 3: Fórmulas + Teoria (lg:col-span-4) */}
        <div className={`space-y-4 lg:col-span-4 ${mobileSection !== 'theory' ? 'hidden md:block' : ''}`}>
          <FormulasReference selectedShape={selectedShape} />
          
          {/* Teoria contextual para a forma selecionada */}
          {result && (
            <div className="space-y-4">
              <Card className="border-l-4 border-primary-blue bg-primary-blue-light/30 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                    🏗️ Propriedades - {result.shape}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold text-text-primary text-sm">📝 Características:</h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-text-secondary">
                        {result.properties.characteristics.slice(0, 3).map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold text-text-primary text-sm">🎯 Aplicações:</h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-text-secondary">
                        {result.properties.applications.slice(0, 3).map((app, index) => (
                          <li key={index}>{app}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.relatedConcepts.length > 0 && (
                <Card className="border-l-4 border-growth-green bg-growth-green-soft/30 duration-300">
                  <CardHeader>
                    <CardTitle as="h3" className="text-lg text-growth-green">
                      💡 Conceitos Relacionados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.relatedConcepts.slice(0, 2).map((concept, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-growth-green/20 bg-background-dark-secondary p-3"
                        >
                          <h5 className="mb-1 font-bold text-growth-green text-sm">{concept.concept}</h5>
                          <p className="mb-2 text-xs text-text-secondary">{concept.explanation}</p>
                          <div className="rounded bg-growth-green/10 p-2 text-xs">
                            <p className="font-semibold">Exemplo:</p>
                            <p>{concept.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Educational Content Sections */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📐 Área e Perímetro: Fundamentos da Geometria Plana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                <strong className="text-system-success">Área</strong> e{" "}
                <strong className="text-growth-green">perímetro</strong> são conceitos fundamentais
                da geometria que têm aplicações práticas em
                <strong className="text-primary-blue-dark">
                  {" "}
                  arquitetura, engenharia, construção
                </strong>{" "}
                e no dia a dia.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-success">📊 Área - Superfície</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-4">
                    <p className="mb-2 text-center font-semibold text-system-success">Definição:</p>
                    <p className="text-center">
                      Medida da <strong>superfície interna</strong> de uma forma geométrica,
                      expressa em unidades quadradas (m², cm², etc.)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-system-success">Aplicações:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Cálculo de quantidade de tinta para pintar</li>
                      <li>Área de pisos e azulejos necessários</li>
                      <li>Dimensionamento de terrenos e lotes</li>
                      <li>Projetos arquitetônicos e paisagísticos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">
                  📏 Perímetro - Contorno
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-growth-green/20 bg-growth-green-soft p-4">
                    <p className="mb-2 text-center font-semibold text-growth-green">Definição:</p>
                    <p className="text-center">
                      Medida do <strong>contorno externo</strong> de uma forma geométrica, expressa
                      em unidades lineares (m, cm, etc.)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-growth-green">Aplicações:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Quantidade de cerca para delimitar terreno</li>
                      <li>Molduras e acabamentos necessários</li>
                      <li>Cálculo de materiais lineares</li>
                      <li>Projetos de paisagismo e jardins</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Área e Perímetro"
        items={[
          {
            question: "Qual a diferença entre área e perímetro?",
            answer:
              "<strong>Área</strong> mede a superfície interna (m², cm²) - quanto de piso você precisa. <strong>Perímetro</strong> mede o contorno externo (m, cm) - quanto de cerca/moldura precisa. Exemplo: sala 4×3m = <strong>12m² de área</strong>, <strong>14m de perímetro</strong>.",
            borderColor: "primary-blue",
          },
          {
            question: "Como calcular área de formas irregulares?",
            answer:
              "Divida em <strong>formas regulares conhecidas</strong> (retângulos, triângulos, círculos), calcule cada área separadamente e <strong>some todas</strong>. Método: 1) Divida a forma, 2) Calcule cada parte, 3) Some os resultados. Funciona para terrenos, plantas arquitetônicas!",
            borderColor: "growth-green",
          },
          {
            question: "Qual forma tem maior área com mesmo perímetro?",
            answer:
              "O <strong>círculo sempre vence!</strong> É o problema isoperimétrico. Com 20m de perímetro: <strong>Círculo = 31,8m²</strong>, Quadrado = 25m², Retângulo 2×8 = 16m². Para máxima eficiência espacial, prefira formas arredondadas!",
            borderColor: "system-success",
          },
          {
            question: "Como converter unidades de área corretamente?",
            answer:
              "Para área, <strong>eleve ao quadrado</strong> o fator de conversão linear! <strong>1m² = 10.000cm²</strong> (100²), <strong>1km² = 1.000.000m²</strong> (1000²), <strong>1 hectare = 10.000m²</strong>. Cuidado: é comum errar essas conversões!",
            borderColor: "system-warning",
          },
          {
            question: "Para que serve π (pi) nos cálculos de área?",
            answer:
              "<strong>π é fundamental para círculos!</strong> Área do círculo = <strong>π × r²</strong>, Circunferência = <strong>2 × π × r</strong>. π ≈ 3,14159... é a relação constante entre circunferência e diâmetro. Essencial para cálculos curvos!",
            borderColor: "system-info",
          },
          {
            question: "Como usar para projetos de construção e reforma?",
            answer:
              "<strong>Área:</strong> quantidade de piso, tinta, grama. <strong>Perímetro:</strong> quantidade de cerca, moldura, rodapé. Exemplo prático: <strong>quarto 3×4m</strong> = 12m² de piso + 14m de rodapé. Sempre considere perdas de 10% no material!",
            borderColor: "growth-green",
          },
          {
            question: "Posso usar para terrenos e propriedades rurais?",
            answer:
              "<strong>Claro!</strong> Ideal para calcular área de <strong>terrenos, lotes, propriedades rurais</strong>. Para formas irregulares, divida em triângulos e retângulos. Use medidas precisas e considere topografia. Fundamental para documentação e impostos!",
            borderColor: "primary-blue",
          },
          {
            question: "Como otimizar espaços com área ou perímetro fixo?",
            answer:
              "Para <strong>maximizar área</strong> com perímetro fixo: prefira círculo > quadrado > retângulo. Para <strong>minimizar perímetro</strong> com área fixa: também círculo vence. Aplicação prática: <strong>jardins, piscinas, terrenos</strong> mais eficientes com formas arredondadas!",
            borderColor: "system-success",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para <strong>projetos reais</strong>, sempre adicione 10-15% de margem para perdas e recortes. Use medidas em metros para facilitar cálculos e conversões. Círculos são mais eficientes em espaço!",
        }}
        footerText="<strong>Precisa de cálculos precisos?</strong> Nossa calculadora suporta 8 formas geométricas com fórmulas detalhadas para todos seus projetos e estudos!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Área e Perímetro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de área e perímetro</strong> é
              <strong className="text-system-success"> 100% gratuita</strong> e oferece cálculos
              para 8 formas geométricas diferentes com fórmulas detalhadas, aplicações práticas e
              conceitos educativos.
            </p>
            <p>
              <strong>Formas suportadas:</strong> Quadrado, retângulo, círculo, triângulo,
              paralelogramo, trapézio, losango e elipse. Cada forma inclui explicações passo a
              passo, propriedades matemáticas e aplicações no mundo real.
            </p>
            <p>
              <strong className="text-system-warning">Uso Profissional:</strong> Esta ferramenta é
              ideal para arquitetos, engenheiros, designers, estudantes e profissionais que
              trabalham com medições geométricas.
              <strong>Sempre confira os resultados em projetos críticos.</strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em fórmulas geométricas padrão • 🎓 Ferramenta educacional
              gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos os
              dispositivos • 🌙 Modo escuro disponível • 📐 8 formas geométricas suportadas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Structured Data - JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de Área e Perímetro",
            description:
              "Calculadora online gratuita para calcular área e perímetro de formas geométricas com fórmulas passo a passo. Ideal para arquitetura, engenharia e educação.",
            url: "https://calculadorasonline.com.br/calculadoras/matematica/area-perimetro",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Cálculo de área para 8 formas geométricas",
              "Cálculo de perímetro para 8 formas geométricas",
              "Fórmulas matemáticas detalhadas",
              "Explicações passo a passo",
              "Aplicações práticas para cada forma",
              "Conversão de unidades",
              "Interface móvel responsiva",
              "100% gratuito",
            ],
            educationalLevel: ["Elementary", "MiddleSchool", "HighSchool", "College"],
            learningResourceType: "Interactive Tool",
            about: [
              {
                "@type": "Thing",
                name: "Área Geométrica",
                description: "Medida da superfície interna de formas geométricas planas",
              },
              {
                "@type": "Thing",
                name: "Perímetro Geométrico",
                description: "Medida do contorno externo de formas geométricas planas",
              },
              {
                "@type": "Thing",
                name: "Geometria Plana",
                description: "Estudo de formas bidimensionais e suas propriedades",
              },
            ],
            teaches: [
              "Cálculo de área e perímetro",
              "Fórmulas geométricas fundamentais",
              "Aplicações práticas da geometria",
              "Conversão entre unidades de medida",
              "Propriedades das formas geométricas",
            ],
            audience: [
              {
                "@type": "Audience",
                name: "Estudantes",
                description: "Estudantes do ensino fundamental ao superior",
              },
              {
                "@type": "Audience",
                name: "Profissionais",
                description: "Arquitetos, engenheiros, designers e profissionais da construção",
              },
              {
                "@type": "Audience",
                name: "Educadores",
                description: "Professores de matemática e geometria",
              },
            ],
            author: {
              "@type": "Organization",
              name: "Calculadora Online BR",
            },
            publisher: {
              "@type": "Organization",
              name: "Calculadora Online BR",
            },
          }),
        }}
      />

      <RelatedCalculators category="matematica" currentCalculatorId="area-perimetro" />
    </div>
  );
}
