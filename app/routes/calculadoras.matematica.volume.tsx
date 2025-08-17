import type { MetaFunction } from "@remix-run/node";
import { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  SmartInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { ShapePreview3D } from "~/components/calculators/ShapePreview3D";
import { VolumeResultsComparison } from "~/components/calculators/VolumeResultsComparison";
import { VolumeFormulasReference } from "~/components/calculators/VolumeFormulasReference";
import { APP_NAME } from "~/lib/constants";
import { calculateVolume, type VolumeParams, type VolumeResult } from "~/utils/calculations";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Volume 3D 2025 - Sólidos Geométricos - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de Volume 3D GRATUITA para sólidos geométricos! Cubo, esfera, cilindro, cone, pirâmide e mais. Fórmulas passo a passo, área superficial e aplicações práticas. Ideal para engenharia, arquitetura e construção.",
    },
    {
      name: "keywords",
      content:
        "calculadora volume, volume cubo, volume esfera, volume cilindro, volume cone, volume piramide, calcular volume, area superficial, geometria espacial, solidos geometricos, matematica 3d, engenharia volume, arquitetura calculo, volume tanque, capacidade recipiente, metro cubico, litros volume, formula volume, calculo engenharia, construcao volume, prisma triangular, elipsoide volume, tronco cone, geometria solida",
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
      content: `Calculadora de Volume 3D - Sólidos Geométricos 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Calcule volume e área superficial de sólidos 3D! Cubo, esfera, cilindro, cone, pirâmide e mais. Fórmulas passo a passo para engenharia e arquitetura. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/matematica/volume",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Volume 3D - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Calcule volume e área superficial de sólidos geométricos com explicações passo a passo! Fórmulas detalhadas para engenharia e arquitetura.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function VolumeCalculator() {
  const [selectedShape, setSelectedShape] = useState<VolumeParams["shape"]>("cube");
  const [dimensions, setDimensions] = useState<Record<string, string>>({});
  const [unit, setUnit] = useState("m");
  const [result, setResult] = useState<VolumeResult | null>(null);
  const [error, setError] = useState("");
  const [calculationHistory, setCalculationHistory] = useState<VolumeResult[]>([]);
  const [mobileSection, setMobileSection] = useState<'calculator' | 'preview' | 'theory'>('calculator');
  const [showVolumeSteps, setShowVolumeSteps] = useState(true);
  const [showSurfaceAreaSteps, setShowSurfaceAreaSteps] = useState(true);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "volume",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("volume");

  const shapeOptions = useMemo(() => [
    { value: "cube", label: "📦 Cubo", icon: "⬜" },
    { value: "rectangular_prism", label: "📦 Prisma Retangular", icon: "▬" },
    { value: "sphere", label: "🌐 Esfera", icon: "⚪" },
    { value: "cylinder", label: "🛢️ Cilindro", icon: "⭕" },
    { value: "cone", label: "🍦 Cone", icon: "🔺" },
    { value: "pyramid", label: "🏛️ Pirâmide", icon: "🔺" },
    { value: "triangular_prism", label: "📐 Prisma Triangular", icon: "▲" },
    { value: "ellipsoid", label: "🥚 Elipsoide", icon: "⭕" },
    { value: "frustum", label: "🪣 Tronco de Cone", icon: "🪣" },
  ], []);

  const unitOptions = useMemo(() => [
    { value: "m", label: "metros (m)" },
    { value: "cm", label: "centímetros (cm)" },
    { value: "mm", label: "milímetros (mm)" },
    { value: "km", label: "quilômetros (km)" },
    { value: "in", label: "polegadas (in)" },
    { value: "ft", label: "pés (ft)" },
  ], []);

  const handleCalculate = () => {
    setError("");

    try {
      // Convert string inputs to numbers
      const numericDimensions: any = {};
      Object.keys(dimensions).forEach((key) => {
        const value = parseFloat(dimensions[key]);
        if (isNaN(value) || value <= 0) {
          throw new Error(`${key} deve ser um número positivo`);
        }
        numericDimensions[key] = value;
      });

      // Validate required dimensions for each shape
      validateShapeDimensions(selectedShape, numericDimensions);

      const params: VolumeParams = {
        shape: selectedShape,
        dimensions: numericDimensions,
        unit,
      };

      const calculationResult = calculateVolume(params);
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
      case "cube":
        if (!dims.side) throw new Error("Lado é obrigatório para cubo");
        break;
      case "rectangular_prism":
        if (!dims.length || !dims.width || !dims.height)
          throw new Error("Comprimento, largura e altura são obrigatórios para prisma retangular");
        break;
      case "sphere":
        if (!dims.radius && !dims.diameter)
          throw new Error("Raio ou diâmetro é obrigatório para esfera");
        break;
      case "cylinder":
        if ((!dims.radius && !dims.diameter) || !dims.height)
          throw new Error("Raio (ou diâmetro) e altura são obrigatórios para cilindro");
        break;
      case "cone":
        if ((!dims.radius && !dims.diameter) || !dims.height)
          throw new Error("Raio (ou diâmetro) e altura são obrigatórios para cone");
        break;
      case "pyramid":
        if (!dims.base || !dims.height)
          throw new Error("Base e altura são obrigatórios para pirâmide");
        break;
      case "triangular_prism":
        if (!dims.base || !dims.height || !dims.length)
          throw new Error(
            "Base, altura do triângulo e comprimento são obrigatórios para prisma triangular"
          );
        break;
      case "ellipsoid":
        if (!dims.semiAxisA || !dims.semiAxisB || !dims.semiAxisC)
          throw new Error("Todos os semi-eixos (a, b, c) são obrigatórios para elipsoide");
        break;
      case "frustum":
        if (!dims.topRadius || !dims.bottomRadius || !dims.height)
          throw new Error(
            "Raio superior, raio inferior e altura são obrigatórios para tronco de cone"
          );
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
      case "cube":
        return (
          <SmartInput
            type="number"
            field="side"
            shape={selectedShape}
            label="Lado (aresta)"
            value={dimensions.side || ""}
            onChange={(e) => setDimensions({ ...dimensions, side: e.target.value })}
            placeholder="Ex: 3"
            step="0.01"
            unit={unit}
            fullWidth
          />
        );

      case "rectangular_prism":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SmartInput
              type="number"
              field="length"
              shape={selectedShape}
              label="Comprimento"
              value={dimensions.length || ""}
              onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              placeholder="Ex: 5"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="width"
              shape={selectedShape}
              label="Largura"
              value={dimensions.width || ""}
              onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              placeholder="Ex: 3"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="height"
              shape={selectedShape}
              label="Altura"
              value={dimensions.height || ""}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              placeholder="Ex: 2"
              step="0.01"
              unit={unit}
              fullWidth
            />
          </div>
        );

      case "sphere":
        return (
          <div className="space-y-3">
            <SmartInput
              type="number"
              field="radius"
              shape={selectedShape}
              label="Raio (prioritário)"
              value={dimensions.radius || ""}
              onChange={(e) =>
                setDimensions({ ...dimensions, radius: e.target.value, diameter: "" })
              }
              placeholder="Ex: 2"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <div className="text-center">
              <span className="inline-block rounded bg-background-dark-secondary px-2 py-1 text-xs text-text-secondary">
                OU
              </span>
            </div>
            <SmartInput
              type="number"
              field="diameter"
              shape={selectedShape}
              label="Diâmetro"
              value={dimensions.diameter || ""}
              onChange={(e) =>
                setDimensions({ ...dimensions, diameter: e.target.value, radius: "" })
              }
              placeholder="Ex: 4"
              step="0.01"
              unit={unit}
              fullWidth
            />
          </div>
        );

      case "cylinder":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SmartInput
                type="number"
                field="radius"
                shape={selectedShape}
                label="Raio da base"
                value={dimensions.radius || ""}
                onChange={(e) =>
                  setDimensions({ ...dimensions, radius: e.target.value, diameter: "" })
                }
                placeholder="Ex: 1.5"
                step="0.01"
                unit={unit}
                fullWidth
              />
              <SmartInput
                type="number"
                field="height"
                shape={selectedShape}
                label="Altura"
                value={dimensions.height || ""}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 4"
                step="0.01"
                unit={unit}
                fullWidth
              />
            </div>
            <p className="text-center text-xs text-text-secondary">OU use o diâmetro:</p>
            <SmartInput
              type="number"
              field="diameter"
              shape={selectedShape}
              label="Diâmetro da base (alternativo)"
              value={dimensions.diameter || ""}
              onChange={(e) =>
                setDimensions({ ...dimensions, diameter: e.target.value, radius: "" })
              }
              placeholder="Ex: 3"
              step="0.01"
              unit={unit}
              fullWidth
            />
          </div>
        );

      case "cone":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SmartInput
                type="number"
                field="radius"
                shape={selectedShape}
                label="Raio da base"
                value={dimensions.radius || ""}
                onChange={(e) =>
                  setDimensions({ ...dimensions, radius: e.target.value, diameter: "" })
                }
                placeholder="Ex: 3"
                step="0.01"
                unit={unit}
                fullWidth
              />
              <SmartInput
                type="number"
                field="height"
                shape={selectedShape}
                label="Altura"
                value={dimensions.height || ""}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 6"
                step="0.01"
                unit={unit}
                fullWidth
              />
            </div>
            <p className="text-center text-xs text-text-secondary">OU use o diâmetro:</p>
            <SmartInput
              type="number"
              field="diameter"
              shape={selectedShape}
              label="Diâmetro da base (alternativo)"
              value={dimensions.diameter || ""}
              onChange={(e) =>
                setDimensions({ ...dimensions, diameter: e.target.value, radius: "" })
              }
              placeholder="Ex: 6"
              step="0.01"
              unit={unit}
              fullWidth
            />
          </div>
        );

      case "pyramid":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SmartInput
                type="number"
                field="base"
                shape={selectedShape}
                label="Base (lado)"
                value={dimensions.base || ""}
                onChange={(e) => setDimensions({ ...dimensions, base: e.target.value })}
                placeholder="Ex: 4"
                step="0.01"
                unit={unit}
                fullWidth
              />
              <SmartInput
                type="number"
                field="height"
                shape={selectedShape}
                label="Altura"
                value={dimensions.height || ""}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 5"
                step="0.01"
                unit={unit}
                fullWidth
              />
            </div>
            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
              <p className="mb-2 text-xs text-text-secondary">
                <strong>Para base retangular (opcional):</strong>
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <SmartInput
                  type="number"
                  field="baseLength"
                  shape={selectedShape}
                  label="Comprimento da base"
                  value={dimensions.baseLength || ""}
                  onChange={(e) => setDimensions({ ...dimensions, baseLength: e.target.value })}
                  placeholder="Ex: 4"
                  step="0.01"
                  unit={unit}
                  validationConfig={{ required: false }}
                  fullWidth
                />
                <SmartInput
                  type="number"
                  field="baseWidth"
                  shape={selectedShape}
                  label="Largura da base"
                  value={dimensions.baseWidth || ""}
                  onChange={(e) => setDimensions({ ...dimensions, baseWidth: e.target.value })}
                  placeholder="Ex: 3"
                  step="0.01"
                  unit={unit}
                  validationConfig={{ required: false }}
                  fullWidth
                />
              </div>
            </div>
          </div>
        );

      case "triangular_prism":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SmartInput
              type="number"
              field="base"
              shape={selectedShape}
              label="Base do triângulo"
              value={dimensions.base || ""}
              onChange={(e) => setDimensions({ ...dimensions, base: e.target.value })}
              placeholder="Ex: 3"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="height"
              shape={selectedShape}
              label="Altura do triângulo"
              value={dimensions.height || ""}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              placeholder="Ex: 4"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="length"
              shape={selectedShape}
              label="Comprimento do prisma"
              value={dimensions.length || ""}
              onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              placeholder="Ex: 8"
              step="0.01"
              unit={unit}
              fullWidth
            />
          </div>
        );

      case "ellipsoid":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SmartInput
              type="number"
              field="semiAxisA"
              shape={selectedShape}
              label="Semi-eixo A (maior)"
              value={dimensions.semiAxisA || ""}
              onChange={(e) => setDimensions({ ...dimensions, semiAxisA: e.target.value })}
              placeholder="Ex: 3"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="semiAxisB"
              shape={selectedShape}
              label="Semi-eixo B (médio)"
              value={dimensions.semiAxisB || ""}
              onChange={(e) => setDimensions({ ...dimensions, semiAxisB: e.target.value })}
              placeholder="Ex: 2"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="semiAxisC"
              shape={selectedShape}
              label="Semi-eixo C (menor)"
              value={dimensions.semiAxisC || ""}
              onChange={(e) => setDimensions({ ...dimensions, semiAxisC: e.target.value })}
              placeholder="Ex: 1.5"
              step="0.01"
              unit={unit}
              fullWidth
            />
          </div>
        );

      case "frustum":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SmartInput
              type="number"
              field="topRadius"
              shape={selectedShape}
              label="Raio superior"
              value={dimensions.topRadius || ""}
              onChange={(e) => setDimensions({ ...dimensions, topRadius: e.target.value })}
              placeholder="Ex: 2"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="bottomRadius"
              shape={selectedShape}
              label="Raio inferior"
              value={dimensions.bottomRadius || ""}
              onChange={(e) => setDimensions({ ...dimensions, bottomRadius: e.target.value })}
              placeholder="Ex: 4"
              step="0.01"
              unit={unit}
              fullWidth
            />
            <SmartInput
              type="number"
              field="height"
              shape={selectedShape}
              label="Altura"
              value={dimensions.height || ""}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              placeholder="Ex: 3"
              step="0.01"
              unit={unit}
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
        <BreadcrumbItem isLast>Volume</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de Volume 3D</span>
          <span className="sm:hidden">Volume 3D</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Calcule <strong className="text-primary-blue-dark">volume e área superficial</strong> de
          <strong className="text-system-success"> sólidos geométricos</strong> com
          <strong className="text-growth-green">fórmulas passo a passo</strong> e aplicações
          práticas.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            🟢 <strong>5 Básicos</strong> • 🟠 <strong>4 Avançados</strong> • 📊{" "}
            <strong>Volume + Área</strong> • 🔬 <strong>Passo a Passo</strong>
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
                <CardTitle as="h2">🔢 Selecionar Sólido Geométrico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {shapeOptions.map((shape) => (
                      <button
                        key={shape.value}
                        onClick={() => {
                          setSelectedShape(shape.value as VolumeParams["shape"]);
                          setDimensions({});
                          setResult(null);
                          setError("");
                        }}
                        className={`rounded-lg border p-3 text-center transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 ${
                          selectedShape === shape.value
                            ? "border-primary-blue bg-primary-blue-light text-primary-blue-dark shadow-lg"
                            : "border-neutral-surface-variant hover:border-primary-blue/50 hover:bg-primary-blue-light/30"
                        }`}
                        aria-pressed={selectedShape === shape.value}
                        aria-label={`Selecionar ${shape.label.replace(/^[^\s]+ /, "")}`}
                      >
                        <div className="mb-1 text-2xl">{shape.icon}</div>
                        <div className="text-xs font-medium">
                          {shape.label.replace(/^[^\s]+ /, "")}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <p className="mb-2 text-sm text-text-secondary">
                      <strong className="text-system-info">Sólido selecionado:</strong>{" "}
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
                Calcular Volume e Área
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
          {/* Preview Visual 3D */}
          <ShapePreview3D 
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
                    {/* Volume - Principal */}
                    <Card className="border-2 border-system-success bg-gradient-to-r from-system-success/10 to-system-success/5">
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold text-system-success mb-2">
                          {result.volume} {result.volumeUnit}
                        </div>
                        <p className="text-sm text-text-secondary">Volume Total</p>
                      </div>
                    </Card>

                    {/* Área Superficial - Secundário */}
                    <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Área Superficial</p>
                        <div className="text-2xl font-bold tabular-nums text-growth-green">
                          {result.surfaceArea} {result.surfaceAreaUnit}
                        </div>
                      </div>
                    </div>

                    {/* Grid de medições auxiliares */}
                    <div className="grid grid-cols-2 gap-3">

                      {result.measurements.diagonal && (
                        <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-2">
                          <p className="text-center text-xs font-semibold text-system-info">
                            📏 Diagonal
                          </p>
                          <p className="text-center text-sm font-bold text-text-primary">
                            {result.measurements.diagonal.toFixed(2)} {result.unit}
                          </p>
                        </div>
                      )}

                      {result.measurements.baseArea && (
                        <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-2">
                          <p className="text-center text-xs font-semibold text-system-info">
                            📐 Área Base
                          </p>
                          <p className="text-center text-sm font-bold text-text-primary">
                            {result.measurements.baseArea.toFixed(2)} {result.surfaceAreaUnit}
                          </p>
                        </div>
                      )}

                      {result.measurements.lateralArea && (
                        <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-2">
                          <p className="text-center text-xs font-semibold text-system-info">
                            🔄 Área Lateral
                          </p>
                          <p className="text-center text-sm font-bold text-text-primary">
                            {result.measurements.lateralArea.toFixed(2)} {result.surfaceAreaUnit}
                          </p>
                        </div>
                      )}

                      {result.measurements.circumference && (
                        <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-2">
                          <p className="text-center text-xs font-semibold text-system-info">
                            ⭕ Circunferência
                          </p>
                          <p className="text-center text-sm font-bold text-text-primary">
                            {result.measurements.circumference.toFixed(2)} {result.unit}
                          </p>
                        </div>
                      )}
                    </div>
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
                      <div className="mb-1 font-bold text-system-success">Volume:</div>
                      <p className="font-mono text-system-success">{result.formulas.volume}</p>
                    </div>
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-growth-green">Área Superficial:</div>
                      <p className="font-mono text-growth-green">{result.formulas.surfaceArea}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Comparação de Resultados */}
          <VolumeResultsComparison history={calculationHistory} />
        </div>

        {/* Coluna 3: Fórmulas + Teoria (lg:col-span-4) */}
        <div className={`space-y-4 lg:col-span-4 ${mobileSection !== 'theory' ? 'hidden md:block' : ''}`}>
          <VolumeFormulasReference selectedShape={selectedShape} />
          
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

      {/* Step-by-step calculations section - only show when result exists */}
      {result && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Volume Steps */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📊 Cálculo do Volume - Passo a Passo
                <Button
                  onClick={() => setShowVolumeSteps(!showVolumeSteps)}
                  variant="outline"
                  className="text-sm"
                >
                  {showVolumeSteps ? "Ocultar" : "Mostrar"} Passos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showVolumeSteps && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">
                      🧮 Passos do Cálculo:
                    </h4>
                    {result.calculations.volumeSteps.map((step, index) => (
                      <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Surface Area Steps */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📐 Cálculo da Área Superficial - Passo a Passo
                <Button
                  onClick={() => setShowSurfaceAreaSteps(!showSurfaceAreaSteps)}
                  variant="outline"
                  className="text-sm"
                >
                  {showSurfaceAreaSteps ? "Ocultar" : "Mostrar"} Passos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showSurfaceAreaSteps && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">📏 Passos do Cálculo:</h4>
                    {result.calculations.surfaceAreaSteps.map((step, index) => (
                      <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}



      {/* Educational Content Sections */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🏗️ Volume e Área Superficial: Geometria Espacial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                <strong className="text-system-success">Volume</strong> e{" "}
                <strong className="text-growth-green">área superficial</strong> são conceitos
                fundamentais da geometria espacial, essenciais para
                <strong className="text-primary-blue-dark">
                  {" "}
                  engenharia, arquitetura, construção
                </strong>{" "}
                e aplicações industriais.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-success">
                  📊 Volume - Capacidade
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-4">
                    <p className="mb-2 text-center font-semibold text-system-success">Definição:</p>
                    <p className="text-center">
                      Medida do <strong>espaço tridimensional</strong> ocupado por um sólido,
                      expressa em unidades cúbicas (m³, cm³, etc.)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-system-success">Aplicações:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Capacidade de tanques e reservatórios</li>
                      <li>Volume de concreto em construções</li>
                      <li>Dimensionamento de embalagens</li>
                      <li>Cálculo de materiais para fundição</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">
                  📐 Área Superficial - Revestimento
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-growth-green/20 bg-growth-green-soft p-4">
                    <p className="mb-2 text-center font-semibold text-growth-green">Definição:</p>
                    <p className="text-center">
                      Medida da <strong>superfície externa</strong> de um sólido, expressa em
                      unidades quadradas (m², cm², etc.)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-growth-green">Aplicações:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Quantidade de tinta para pintura</li>
                      <li>Material para revestimento</li>
                      <li>Cálculo de perda de calor</li>
                      <li>Dimensionamento de embalagens</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes sobre Volume e Área Superficial"
        items={[
          {
            question: "Qual a diferença entre volume e área superficial?",
            answer:
              "<strong>Volume</strong> mede o espaço interno (em m³, litros, etc.), enquanto <strong>área superficial</strong> mede a superfície externa (em m², cm², etc.). <br><br><strong>Exemplo prático:</strong> Para um cubo 2×2×2 metros:<br><strong>Volume = 8 m³</strong> (capacidade interna)<br><strong>Área superficial = 24 m²</strong> (superfície total das faces)",
            borderColor: "system-info",
          },
          {
            question: "Como converter volume entre diferentes unidades?",
            answer:
              "Para unidades de volume, você <strong>eleva ao cubo</strong> o fator de conversão das unidades lineares. <strong>1 m³ = 1.000 litros</strong>. <br><br><strong>Conversões úteis:</strong><br>• 1 m³ = 1.000.000 cm³ (100³ cm³)<br>• 1 m³ = 1.000 litros<br>• 1 litro = 1.000 cm³ = 1 dm³<br>• 1 galão (US) ≈ 3,785 litros",
            borderColor: "primary-blue",
          },
          {
            question: "Qual sólido tem maior volume com área superficial fixa?",
            answer:
              "A <strong>esfera</strong> sempre tem o maior volume para uma dada área superficial. Isso se chama <strong>problema isoperimétrico em 3D</strong>. <br><br><strong>Exemplo:</strong> Com área superficial de 100 m²:<br>• Esfera: ~94,3 m³<br>• Cubo: ~68,0 m³<br>• Cilindro ótimo: ~81,6 m³",
            borderColor: "growth-green",
          },
          {
            question: "Como calcular volume de objetos irregulares?",
            answer:
              "Para objetos irregulares, use métodos como <strong>decomposição</strong>, <strong>integração</strong> ou <strong>princípio de Arquimedes</strong> (deslocamento de fluido). <br><br><strong>Métodos práticos:</strong><br>• <strong>Decomposição:</strong> Dividir em formas conhecidas<br>• <strong>Deslocamento:</strong> Mergulhar em água e medir volume deslocado<br>• <strong>Aproximação:</strong> Usar sólidos similares como estimativa",
            borderColor: "system-warning",
          },
          {
            question: "Para que serve o número π (pi) em volumes?",
            answer:
              "O <strong>π (pi)</strong> aparece em todos os cálculos envolvendo formas circulares: esferas, cilindros, cones e elipsoides. <br><br><strong>Fórmulas com π:</strong><br>• Volume da esfera: (4/3) × π × r³<br>• Volume do cilindro: π × r² × h<br>• Volume do cone: (1/3) × π × r² × h",
            borderColor: "system-info",
          },
          {
            question: "Como otimizar recipientes para menor gasto de material?",
            answer:
              "Para <strong>minimizar área superficial com volume fixo</strong>, use formas esféricas. Para cilindros, a relação ótima é <strong>altura = diâmetro</strong>. <br><br><strong>Otimizações práticas:</strong><br>• Tanques esféricos para alta pressão<br>• Latas cilíndricas: h ≈ d para mínimo material<br>• Embalagens cúbicas para facilidade de empilhamento",
            borderColor: "growth-green",
          },
          {
            question: "Qual a aplicação prática do cálculo de volumes?",
            answer:
              "Cálculo de volumes é <strong>essencial</strong> em engenharia, arquitetura, indústria e logística para dimensionamento correto de projetos. <br><br><strong>Aplicações por área:</strong><br>• <strong>Construção:</strong> Volume de concreto, escavações<br>• <strong>Indústria:</strong> Capacidade de tanques, silos<br>• <strong>Logística:</strong> Otimização de embalagens e transporte<br>• <strong>Medicina:</strong> Dosagem precisa de medicamentos",
            borderColor: "system-success",
          },
        ]}
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Volume 3D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de volume 3D</strong> é
              <strong className="text-system-success"> 100% gratuita</strong> e oferece cálculos
              para 9 sólidos geométricos diferentes com fórmulas detalhadas, área superficial e
              aplicações práticas profissionais.
            </p>
            <p>
              <strong>Sólidos suportados:</strong> Cubo, prisma retangular, esfera, cilindro, cone,
              pirâmide, prisma triangular, elipsoide e tronco de cone. Cada forma inclui explicações
              passo a passo, propriedades matemáticas e aplicações industriais.
            </p>
            <p>
              <strong className="text-system-warning">Uso Profissional:</strong> Esta ferramenta é
              ideal para engenheiros, arquitetos, designers, estudantes e profissionais que
              trabalham com cálculos volumétricos e dimensionamento.
              <strong>Sempre verifique os resultados em projetos críticos.</strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em fórmulas geométricas padrão • 🎓 Ferramenta educacional
              gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos os
              dispositivos • 🌙 Modo escuro disponível • 🏗️ 9 sólidos geométricos suportados • 📊
              Volume + Área Superficial
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
            name: "Calculadora de Volume 3D",
            description:
              "Calculadora online gratuita para calcular volume e área superficial de sólidos geométricos com fórmulas passo a passo. Ideal para engenharia, arquitetura e educação.",
            url: "https://calculadorasonline.com.br/calculadoras/matematica/volume",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Cálculo de volume para 9 sólidos geométricos",
              "Cálculo de área superficial para 9 sólidos geométricos",
              "Fórmulas matemáticas detalhadas",
              "Explicações passo a passo",
              "Aplicações práticas para cada sólido",
              "Conversão de unidades",
              "Medições auxiliares (diagonal, área lateral, etc.)",
              "Interface móvel responsiva",
              "100% gratuito",
            ],
            educationalLevel: ["MiddleSchool", "HighSchool", "College", "Professional"],
            learningResourceType: "Interactive Tool",
            about: [
              {
                "@type": "Thing",
                name: "Volume de Sólidos Geométricos",
                description: "Medida do espaço tridimensional ocupado por sólidos geométricos",
              },
              {
                "@type": "Thing",
                name: "Área Superficial",
                description: "Medida da superfície externa de sólidos geométricos",
              },
              {
                "@type": "Thing",
                name: "Geometria Espacial",
                description: "Estudo de formas tridimensionais e suas propriedades",
              },
            ],
            teaches: [
              "Cálculo de volume de sólidos geométricos",
              "Cálculo de área superficial",
              "Fórmulas de geometria espacial",
              "Aplicações práticas de volume",
              "Conversão entre unidades volumétricas",
            ],
            audience: [
              {
                "@type": "Audience",
                name: "Estudantes",
                description: "Estudantes do ensino médio ao superior",
              },
              {
                "@type": "Audience",
                name: "Profissionais",
                description: "Engenheiros, arquitetos, designers e profissionais da construção",
              },
              {
                "@type": "Audience",
                name: "Educadores",
                description: "Professores de matemática e geometria",
              },
              {
                "@type": "Audience",
                name: "Industriais",
                description: "Profissionais da indústria e manufatura",
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

      <RelatedCalculators category="matematica" currentCalculatorId="volume" />
    </div>
  );
}
