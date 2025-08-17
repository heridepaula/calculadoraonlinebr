import type { MetaFunction } from "@remix-run/node";
import { useState, useMemo, useCallback, useEffect } from "react";
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
import { TriangleVisualization } from "~/components/calculators/TriangleVisualization";
import { PythagoreanFormulasReference } from "~/components/calculators/PythagoreanFormulasReference";
import { ResultCard } from "~/components/calculators/ResultCard";
import { SpecialTriangleCard } from "~/components/calculators/SpecialTriangleCard";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculatePythagorean,
  type PythagoreanParams,
  type PythagoreanResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora do Teorema de Pitágoras 2025 - Triângulos Retângulos - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora do Teorema de Pitágoras GRATUITA! Encontre hipotenusa, catetos e ângulos com explicações passo a passo. Verificação de triângulos retângulos, razões trigonométricas e triângulos famosos. Ideal para estudantes e profissionais.",
    },
    {
      name: "keywords",
      content:
        "calculadora pitagoras, teorema pitagoras, triangulo retangulo, hipotenusa, catetos, angulos triangulo, trigonometria basica, razoes trigonometricas, sen cos tan, triangulo egípcio, triangulo 3 4 5, pitagoras online, geometria triangulos, calculo hipotenusa, verificar triangulo retangulo, triangulos famosos, matematica geometria, trigonometria escolar, angulos complementares, area triangulo retangulo, perimetro triangulo",
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
      content: `Calculadora do Teorema de Pitágoras - Triângulos Retângulos 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Calcule hipotenusa, catetos e ângulos com o Teorema de Pitágoras! Explicações passo a passo, verificação de triângulos e trigonometria. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/matematica/teorema-pitagoras",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora do Teorema de Pitágoras - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Calcule hipotenusa, catetos e ângulos com explicações detalhadas do Teorema de Pitágoras! Trigonometria e verificação de triângulos retângulos.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function PythagoreanCalculator() {
  const [selectedMode, setSelectedMode] = useState<PythagoreanParams["mode"]>("find_hypotenuse");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [unit, setUnit] = useState("m");
  const [result, setResult] = useState<PythagoreanResult | null>(null);
  const [error, setError] = useState("");
  const [mobileSection, setMobileSection] = useState<'calculator' | 'preview' | 'theory'>('calculator');
  const [showSteps, setShowSteps] = useState(true);
  const [showTrigonometry, setShowTrigonometry] = useState(true);
  const [showAdvancedModes, setShowAdvancedModes] = useState(false);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "teorema_pitagoras",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("teorema_pitagoras");

  // Real-time calculation preview for better UX
  const previewResult = useMemo(() => {
    if (!inputs || Object.keys(inputs).length === 0) return null;
    
    try {
      const numericInputs: any = {};
      let hasValidInputs = false;
      
      Object.keys(inputs).forEach((key) => {
        if (inputs[key]) {
          const value = parseFloat(inputs[key]);
          if (!isNaN(value) && value > 0) {
            numericInputs[key] = value;
            hasValidInputs = true;
          }
        }
      });

      if (!hasValidInputs) return null;

      const params: PythagoreanParams = {
        sideA: numericInputs.sideA,
        sideB: numericInputs.sideB,
        hypotenuse: numericInputs.hypotenuse,
        angleA: numericInputs.angleA,
        angleB: numericInputs.angleB,
        mode: selectedMode,
        unit,
      };

      return calculatePythagorean(params);
    } catch {
      return null;
    }
  }, [inputs, selectedMode, unit]);

  // Simplified primary modes for better UX
  const primaryModes = useMemo(() => [
    {
      value: "find_hypotenuse",
      label: "Encontrar Hipotenusa",
      description: "Tenho os 2 catetos",
      icon: "🔷",
      primary: true
    },
    {
      value: "find_side", 
      label: "Encontrar Cateto",
      description: "Tenho hipotenusa + 1 cateto",
      icon: "📐",
      primary: true
    },
    {
      value: "verify_triangle",
      label: "Verificar Triângulo",
      description: "Tenho os 3 lados",
      icon: "✅",
      primary: true
    }
  ], []);

  const secondaryModes = useMemo(() => [
    {
      value: "find_angle",
      label: "Calcular Ângulos",
      description: "Encontrar ângulos conhecendo todos os lados",
      icon: "📊"
    },
    {
      value: "find_all_from_angle",
      label: "Usar Ângulo + Lado",
      description: "Encontrar todos os lados usando um ângulo e um lado",
      icon: "🎯"
    }
  ], []);

  const unitOptions = useMemo(() => [
    { value: "m", label: "metros (m)" },
    { value: "cm", label: "centímetros (cm)" },
    { value: "mm", label: "milímetros (mm)" },
    { value: "km", label: "quilômetros (km)" },
    { value: "in", label: "polegadas (in)" },
    { value: "ft", label: "pés (ft)" },
  ], []);

  const handleCalculate = useCallback(() => {
    setError("");

    try {
      // Convert string inputs to numbers
      const numericInputs: any = {};
      Object.keys(inputs).forEach((key) => {
        if (inputs[key]) {
          const value = parseFloat(inputs[key]);
          if (isNaN(value) || value <= 0) {
            throw new Error(`${key} deve ser um número positivo`);
          }
          numericInputs[key] = value;
        }
      });

      const params: PythagoreanParams = {
        sideA: numericInputs.sideA,
        sideB: numericInputs.sideB,
        hypotenuse: numericInputs.hypotenuse,
        angleA: numericInputs.angleA,
        angleB: numericInputs.angleB,
        mode: selectedMode,
        unit,
      };

      const calculationResult = calculatePythagorean(params);
      setResult(calculationResult);
      
      // Announce result to screen readers
      if (calculationResult) {
        const announcement = `Cálculo concluído. ${
          selectedMode === 'find_hypotenuse' ? `Hipotenusa: ${calculationResult.hypotenuse.toFixed(3)} ${calculationResult.unit}` :
          selectedMode === 'find_side' ? `Cateto encontrado` :
          selectedMode === 'verify_triangle' ? (calculationResult.isValidTriangle ? 'É um triângulo retângulo válido' : 'Não é um triângulo retângulo') :
          'Cálculo realizado com sucesso'
        }`;
        
        // Create temporary element for screen reader announcement
        const announcement_div = document.createElement('div');
        announcement_div.setAttribute('aria-live', 'polite');
        announcement_div.setAttribute('aria-atomic', 'true');
        announcement_div.className = 'sr-only';
        announcement_div.textContent = announcement;
        document.body.appendChild(announcement_div);
        setTimeout(() => document.body.removeChild(announcement_div), 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no cálculo");
      setResult(null);
    }
  }, [inputs, selectedMode, unit]);

  const handleReset = useCallback(() => {
    setInputs({});
    setResult(null);
    setError("");
  }, []);

  // Keyboard shortcuts for better accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt+C: Calculate
      if (event.altKey && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        handleCalculate();
      }
      // Alt+R: Reset
      if (event.altKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        handleReset();
      }
      // Alt+1, Alt+2, Alt+3: Switch primary modes
      if (event.altKey && ['1', '2', '3'].includes(event.key)) {
        event.preventDefault();
        const modeIndex = parseInt(event.key) - 1;
        if (primaryModes[modeIndex]) {
          setSelectedMode(primaryModes[modeIndex].value as PythagoreanParams["mode"]);
          setInputs({});
          setResult(null);
          setError("");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCalculate, handleReset, primaryModes]);

  const renderInputs = () => {
    const allModes = [...primaryModes, ...secondaryModes];
    const currentMode = allModes.find((mode) => mode.value === selectedMode);

    return (
      <div className="space-y-4">
        {/* Mode Description */}
        <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
          <div className="flex items-center">
            <span className="mr-3 text-2xl">{currentMode?.icon}</span>
            <div>
              <h4 className="font-semibold text-primary-blue-dark">{currentMode?.label}</h4>
              <p className="text-sm text-text-secondary">{currentMode?.description}</p>
            </div>
          </div>
        </div>

        {/* Input Fields Based on Mode */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selectedMode === "find_hypotenuse" && (
            <>
              <Input
                type="number"
                label="Cateto A"
                value={inputs.sideA || ""}
                onChange={(e) => setInputs({ ...inputs, sideA: e.target.value })}
                placeholder="Ex: 3"
                step="0.01"
                fullWidth
                required
              />
              <Input
                type="number"
                label="Cateto B"
                value={inputs.sideB || ""}
                onChange={(e) => setInputs({ ...inputs, sideB: e.target.value })}
                placeholder="Ex: 4"
                step="0.01"
                fullWidth
                required
              />
            </>
          )}

          {selectedMode === "find_side" && (
            <>
              <Input
                type="number"
                label="Cateto A (opcional)"
                value={inputs.sideA || ""}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    sideA: e.target.value,
                    sideB: e.target.value ? "" : inputs.sideB,
                  })
                }
                placeholder="Ex: 3"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Cateto B (opcional)"
                value={inputs.sideB || ""}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    sideB: e.target.value,
                    sideA: e.target.value ? "" : inputs.sideA,
                  })
                }
                placeholder="Ex: 4"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Hipotenusa"
                value={inputs.hypotenuse || ""}
                onChange={(e) => setInputs({ ...inputs, hypotenuse: e.target.value })}
                placeholder="Ex: 5"
                step="0.01"
                fullWidth
                required
              />
            </>
          )}

          {(selectedMode === "find_angle" || selectedMode === "verify_triangle") && (
            <>
              <Input
                type="number"
                label="Cateto A"
                value={inputs.sideA || ""}
                onChange={(e) => setInputs({ ...inputs, sideA: e.target.value })}
                placeholder="Ex: 3"
                step="0.01"
                fullWidth
                required
              />
              <Input
                type="number"
                label="Cateto B"
                value={inputs.sideB || ""}
                onChange={(e) => setInputs({ ...inputs, sideB: e.target.value })}
                placeholder="Ex: 4"
                step="0.01"
                fullWidth
                required
              />
              <Input
                type="number"
                label="Hipotenusa"
                value={inputs.hypotenuse || ""}
                onChange={(e) => setInputs({ ...inputs, hypotenuse: e.target.value })}
                placeholder="Ex: 5"
                step="0.01"
                fullWidth
                required
              />
            </>
          )}

          {selectedMode === "find_all_from_angle" && (
            <>
              <Input
                type="number"
                label="Ângulo A (graus)"
                value={inputs.angleA || ""}
                onChange={(e) => setInputs({ ...inputs, angleA: e.target.value })}
                placeholder="Ex: 30"
                step="0.1"
                min="0.1"
                max="89.9"
                fullWidth
                required
              />
              <Input
                type="number"
                label="Hipotenusa (opcional)"
                value={inputs.hypotenuse || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, hypotenuse: e.target.value, sideA: "", sideB: "" })
                }
                placeholder="Ex: 10"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Cateto A (opcional)"
                value={inputs.sideA || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, sideA: e.target.value, hypotenuse: "", sideB: "" })
                }
                placeholder="Ex: 5"
                step="0.01"
                fullWidth
              />
              <Input
                type="number"
                label="Cateto B (opcional)"
                value={inputs.sideB || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, sideB: e.target.value, hypotenuse: "", sideA: "" })
                }
                placeholder="Ex: 8.66"
                step="0.01"
                fullWidth
              />
            </>
          )}
        </div>

        {selectedMode === "find_all_from_angle" && (
          <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
            <p className="text-sm text-text-secondary">
              <strong>💡 Dica:</strong> Forneça o ângulo A e <strong>apenas um</strong> dos lados
              (hipotenusa, cateto A ou cateto B).
            </p>
          </div>
        )}

        {selectedMode === "find_side" && (
          <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
            <p className="text-sm text-text-secondary">
              <strong>⚠️ Atenção:</strong> Forneça a hipotenusa e <strong>apenas um</strong> cateto
              para encontrar o outro.
            </p>
          </div>
        )}
      </div>
    );
  };

  const famousTriangles = useMemo(() => [
    {
      name: "Triângulo Egípcio (3:4:5)",
      sides: { a: 3, b: 4, c: 5 },
      description: "O triângulo mais famoso da antiguidade, usado na construção das pirâmides",
      color: "text-system-success",
    },
    {
      name: "Triângulo 5:12:13",
      sides: { a: 5, b: 12, c: 13 },
      description: "Muito usado em carpintaria e construção civil",
      color: "text-primary-blue-dark",
    },
    {
      name: "Triângulo 8:15:17",
      sides: { a: 8, b: 15, c: 17 },
      description: "Aplicado em projetos de engenharia e topografia",
      color: "text-growth-green",
    },
    {
      name: "Triângulo Isósceles 45°",
      sides: { a: 1, b: 1, c: 1.414 },
      description: "Ângulos de 45°-45°-90°, razão 1:1:√2",
      color: "text-system-warning",
    },
    {
      name: "Triângulo 30-60-90",
      sides: { a: 1, b: 1.732, c: 2 },
      description: "Ângulos de 30°-60°-90°, razão 1:√3:2",
      color: "text-system-info",
    },
  ], []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Teorema de Pitágoras</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora do Teorema de Pitágoras</span>
          <span className="sm:hidden">Teorema de Pitágoras</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Calcule <strong className="text-primary-blue-dark">hipotenusa, catetos e ângulos</strong>{" "}
          de
          <strong className="text-system-success"> triângulos retângulos</strong> com
          <strong className="text-growth-green">explicações passo a passo</strong> e verificação de
          triângulos famosos.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            📐 <strong>5 Modos de Cálculo</strong> • 🎯 <strong>Trigonometria</strong> • 📚{" "}
            <strong>Triângulos Famosos</strong> • ✅ <strong>Verificação</strong>
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
            📐 Visualizar
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
                <CardTitle as="h2">🎯 Selecionar Modo de Cálculo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Primary Modes */}
                  <div className="grid grid-cols-1 gap-3">
                    {primaryModes.map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => {
                          setSelectedMode(mode.value as PythagoreanParams["mode"]);
                          setInputs({});
                          setResult(null);
                          setError("");
                        }}
                        className={`rounded-lg border p-4 text-left transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 ${
                          selectedMode === mode.value
                            ? "border-primary-blue bg-primary-blue-light text-primary-blue-dark shadow-lg"
                            : "border-neutral-surface-variant hover:border-primary-blue/50 hover:bg-primary-blue-light/30"
                        }`}
                        aria-pressed={selectedMode === mode.value}
                        aria-label={`Selecionar modo ${mode.label}`}
                      >
                        <div className="mb-2 flex items-center">
                          <span className="mr-2 text-xl" role="img" aria-hidden="true">{mode.icon}</span>
                          <span className="text-sm font-medium">
                            {mode.label}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">{mode.description}</p>
                      </button>
                    ))}
                  </div>
                  
                  {/* Advanced Modes Toggle */}
                  {result && (
                    <div className="border-t border-neutral-surface-variant pt-4">
                      <button
                        onClick={() => setShowAdvancedModes(!showAdvancedModes)}
                        className="w-full text-center text-sm text-system-info hover:text-system-info/80 transition-colors"
                      >
                        {showAdvancedModes ? '▲' : '▼'} Cálculos Avançados
                      </button>
                      
                      {showAdvancedModes && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {secondaryModes.map((mode) => (
                            <button
                              key={mode.value}
                              onClick={() => {
                                setSelectedMode(mode.value as PythagoreanParams["mode"]);
                                setInputs({});
                                setResult(null);
                                setError("");
                              }}
                              className="p-2 text-xs border border-system-info/30 rounded hover:bg-system-info/10 transition-colors"
                            >
                              <span className="mr-1">{mode.icon}</span>
                              {mode.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">📏 Dados de Entrada</CardTitle>
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

                  {renderInputs()}

                  {error && (
                    <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-3">
                      <p className="text-sm font-medium text-system-error">{error}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button 
                onClick={handleCalculate} 
                className="px-6" 
                fullWidth
                aria-label="Calcular usando o teorema de Pitágoras"
                title="Pressione Alt+C para calcular rapidamente"
              >
                Calcular Pitágoras
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-system-error px-6 text-system-error hover:bg-system-error hover:text-white"
                fullWidth
                aria-label="Limpar todos os campos e resultados"
                title="Pressione Alt+R para limpar rapidamente"
              >
                Limpar
              </Button>
            </div>
            
            {/* Keyboard shortcuts help */}
            <div className="text-xs text-text-secondary text-center space-y-1 bg-background-dark-secondary/30 p-2 rounded">
              <p className="font-medium">⌨️ Atalhos do teclado:</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <span><kbd className="px-1 py-0.5 bg-background-dark-secondary rounded text-xs">Alt+C</kbd> Calcular</span>
                <span><kbd className="px-1 py-0.5 bg-background-dark-secondary rounded text-xs">Alt+R</kbd> Limpar</span>
                <span><kbd className="px-1 py-0.5 bg-background-dark-secondary rounded text-xs">Alt+1,2,3</kbd> Modos</span>
              </div>
            </div>
        </div>

        {/* Coluna 2: Visualização + Resultados (lg:col-span-4) */}
        <div className={`space-y-4 lg:col-span-4 ${mobileSection !== 'preview' ? 'hidden md:block' : ''}`}>
          {/* Preview indicator */}
          {previewResult && !result && (
            <div className="rounded-lg bg-system-info/10 border border-system-info/20 p-2 text-center">
              <span className="text-xs text-system-info font-medium">
                👁️ Visualização prévia - clique em "Calcular" para resultado final
              </span>
            </div>
          )}
          
          {/* Visualização do Triângulo */}
          <TriangleVisualization 
            mode={selectedMode} 
            inputs={inputs} 
            result={result || previewResult}
            unit={unit} 
          />
          
          {/* Resultados */}
          {result && (
            <div className="space-y-4">
              {/* Resultado Principal */}
              <Card className="border-2 border-primary-blue bg-primary-blue-light/50 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                    📊 Resultados - {result.triangleType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Grid de resultados principais */}
                    <div className="grid grid-cols-3 gap-3">
                      <ResultCard 
                        label="Cateto A" 
                        value={result.sideA} 
                        unit={result.unit}
                        color="success"
                        icon="📐"
                      />
                      <ResultCard 
                        label="Cateto B" 
                        value={result.sideB} 
                        unit={result.unit}
                        color="info"
                        icon="📐"
                      />
                      <ResultCard 
                        label="Hipotenusa" 
                        value={result.hypotenuse} 
                        unit={result.unit}
                        color="warning"
                        icon="🔷"
                      />
                    </div>

                    {/* Ângulos */}
                    {(result.angleA || result.angleB) && (
                      <div className="grid grid-cols-3 gap-2">
                        <ResultCard 
                          label="Ângulo A" 
                          value={result.angleA ? `${result.angleA.toFixed(1)}°` : "-"}
                          size="small"
                          color="info"
                        />
                        <ResultCard 
                          label="Ângulo B" 
                          value={result.angleB ? `${result.angleB.toFixed(1)}°` : "-"}
                          size="small"
                          color="info"
                        />
                        <ResultCard 
                          label="Ângulo C" 
                          value="90.0°"
                          size="small"
                          color="success"
                        />
                      </div>
                    )}

                    {/* Área e Perímetro */}
                    <div className="grid grid-cols-2 gap-3">
                      <ResultCard 
                        label="Área" 
                        value={result.area.toFixed(2)} 
                        unit={result.areaUnit}
                        color="primary"
                      />
                      <ResultCard 
                        label="Perímetro" 
                        value={result.perimeter.toFixed(2)} 
                        unit={result.unit}
                        color="primary"
                      />
                    </div>

                    {/* Triângulos Especiais */}
                    {result.ratios.length > 0 && (
                      <SpecialTriangleCard triangles={result.ratios} />
                    )}

                    {/* Status de Validação */}
                    <Card
                      className={`border p-3 text-center ${
                        result.isValidTriangle
                          ? "border-system-success/20 bg-system-success/10"
                          : "border-system-error/20 bg-system-error/10"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          result.isValidTriangle ? "text-system-success" : "text-system-error"
                        }`}
                      >
                        {result.isValidTriangle
                          ? "✅ Triângulo Retângulo Válido"
                          : "❌ Não é um Triângulo Retângulo"}
                      </p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Triângulos Famosos (quando não há resultado) */}
          {!result && (
            <Card className="border-system-info/20 bg-system-info/5">
              <CardHeader>
                <CardTitle className="text-system-info flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  Triângulos Famosos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary mb-3">
                    Clique para testar:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {famousTriangles.slice(0, 3).map((triangle, index) => (
                      <button 
                        key={index}
                        onClick={() => {
                          setSelectedMode('verify_triangle');
                          setInputs({
                            sideA: triangle.sides.a.toString(),
                            sideB: triangle.sides.b.toString(),
                            hypotenuse: triangle.sides.c.toString(),
                          });
                        }}
                        className="px-3 py-1 text-xs rounded bg-primary-blue/10 hover:bg-primary-blue/20 transition-colors"
                      >
                        {triangle.sides.a}:{triangle.sides.b}:{triangle.sides.c}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Coluna 3: Fórmulas + Teoria (lg:col-span-4) */}
        <div className={`space-y-4 lg:col-span-4 ${mobileSection !== 'theory' ? 'hidden md:block' : ''}`}>
          <PythagoreanFormulasReference 
            selectedMode={selectedMode} 
            inputs={inputs}
            result={result || previewResult}
          />
        </div>
      </div>


      {/* Step-by-step calculations section - only show when result exists */}
      {result && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Calculation Steps */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📊 Cálculo Passo a Passo
                <Button
                  onClick={() => setShowSteps(!showSteps)}
                  variant="outline"
                  className="text-sm"
                >
                  {showSteps ? "Ocultar" : "Mostrar"} Passos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showSteps && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      🧮 Passos do Cálculo:
                    </h4>
                    {result.calculations.stepByStep.map((step, index) => (
                      <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                        {step}
                      </p>
                    ))}
                  </div>

                  {result.calculations.verification.length > 0 && (
                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">✅ Verificação:</h4>
                      {result.calculations.verification.map((step, index) => (
                        <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                          {step}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trigonometric Steps */}
          {result.calculations.trigonometricSteps && (
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="flex items-center justify-between">
                  📐 Trigonometria
                  <Button
                    onClick={() => setShowTrigonometry(!showTrigonometry)}
                    variant="outline"
                    className="text-sm"
                  >
                    {showTrigonometry ? "Ocultar" : "Mostrar"} Trigonometria
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showTrigonometry && (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">
                        🎯 Cálculos Trigonométricos:
                      </h4>
                      {result.calculations.trigonometricSteps.map((step, index) => (
                        <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}



      {/* Educational Content Section */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📐 Teorema de Pitágoras: Fundamentos e Aplicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-primary-blue-dark">Teorema de Pitágoras</strong> é uma das
                descobertas mais importantes da
                <strong className="text-system-success"> geometria</strong>, estabelecendo a relação
                fundamental entre os lados de um
                <strong className="text-growth-green">triângulo retângulo</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">📐 O Teorema</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <p className="mb-2 text-center font-semibold text-primary-blue-dark">
                      Fórmula:
                    </p>
                    <p className="text-center font-mono text-xl text-primary-blue-dark">
                      a² + b² = c²
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-primary-blue-dark">Onde:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>
                        <strong>a</strong> e <strong>b</strong> são os catetos (lados
                        perpendiculares)
                      </li>
                      <li>
                        <strong>c</strong> é a hipotenusa (lado oposto ao ângulo reto)
                      </li>
                      <li>A hipotenusa é sempre o maior lado do triângulo</li>
                      <li>O ângulo reto mede exatamente 90°</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-success">🏛️ História</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-4">
                    <p className="mb-2 text-center font-semibold text-system-success">Origem:</p>
                    <p className="text-center text-sm">
                      Conhecido pelos <strong>babilônios</strong> há mais de 4000 anos, formalizado
                      por <strong>Pitágoras</strong> na Grécia Antiga
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-system-success">Marcos Históricos:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>2000 a.C.: Uso pelos construtores egípcios</li>
                      <li>1800 a.C.: Tabletas babilônicas com triplas pitagóricas</li>
                      <li>500 a.C.: Demonstração formal por Pitágoras</li>
                      <li>300 a.C.: Elementos de Euclides</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes sobre o Teorema de Pitágoras"
        items={[
          {
            question: "O que é o Teorema de Pitágoras?",
            answer:
              "É uma relação matemática que afirma: em um <strong>triângulo retângulo</strong>, o quadrado da hipotenusa é igual à <strong>soma dos quadrados dos catetos</strong> (a² + b² = c²). <br><br><strong>Exemplo:</strong> Triângulo com catetos 3 e 4:<br>• 3² + 4² = 9 + 16 = 25<br>• c² = 25, então c = 5<br>• Hipotenusa = 5 unidades",
            borderColor: "primary-blue",
          },
          {
            question: "Como identificar a hipotenusa em um triângulo?",
            answer:
              "A <strong>hipotenusa</strong> é sempre o <strong>lado mais longo</strong> do triângulo retângulo, localizado <strong>oposto ao ângulo reto</strong> (90°). <br><br><strong>Dicas para identificar:</strong><br>• Está oposta ao ângulo reto (90°)<br>• É sempre o lado mais longo<br>• Nunca forma o ângulo reto<br>• Conecta os dois catetos",
            borderColor: "system-warning",
          },
          {
            question: "Quais são os triângulos pitagóricos mais famosos?",
            answer:
              "Os <strong>triângulos pitagóricos</strong> são aqueles cujos lados formam números inteiros. O mais famoso é o <strong>triângulo 3-4-5</strong>, conhecido como 'triângulo egípcio'. <br><br><strong>Triângulos famosos:</strong><br>• <strong>3:4:5</strong> - Triângulo Egípcio (usado nas pirâmides)<br>• <strong>5:12:13</strong> - Muito usado em construção<br>• <strong>8:15:17</strong> - Aplicado em engenharia<br>• <strong>7:24:25</strong> - Útil em topografia",
            borderColor: "system-success",
          },
          {
            question: "Como usar o Teorema de Pitágoras na prática?",
            answer:
              "O teorema tem <strong>aplicações práticas</strong> em construção, navegação, física e engenharia para calcular <strong>distâncias, alturas e profundidades</strong>. <br><br><strong>Aplicações do dia a dia:</strong><br>• <strong>Construção:</strong> Verificar esquadrias e ângulos retos<br>• <strong>Navegação:</strong> Calcular distâncias mais curtas<br>• <strong>Decoração:</strong> Posicionar móveis e TV na parede<br>• <strong>Jardinagem:</strong> Delimitar canteiros retangulares",
            borderColor: "growth-green",
          },
          {
            question: "Qual a relação entre Pitágoras e trigonometria?",
            answer:
              "O Teorema de Pitágoras é a <strong>base da trigonometria</strong>. As funções <strong>seno, cosseno e tangente</strong> derivam das proporções dos lados em triângulos retângulos. <br><br><strong>Razões trigonométricas:</strong><br>• <strong>sen(α) = cateto oposto / hipotenusa</strong><br>• <strong>cos(α) = cateto adjacente / hipotenusa</strong><br>• <strong>tan(α) = cateto oposto / cateto adjacente</strong><br>• Identidade fundamental: sen²(α) + cos²(α) = 1",
            borderColor: "system-info",
          },
          {
            question: "Como verificar se um triângulo é retângulo?",
            answer:
              "Para verificar se um triângulo é retângulo, aplique o teorema: se <strong>a² + b² = c²</strong> (sendo c o maior lado), então é um <strong>triângulo retângulo</strong>. <br><br><strong>Método de verificação:</strong><br>1. Identifique o lado mais longo (hipotenusa candidata)<br>2. Calcule o quadrado deste lado<br>3. Some os quadrados dos outros dois lados<br>4. Se forem iguais, é triângulo retângulo ✅",
            borderColor: "primary-blue",
          },
          {
            question: "Por que o Teorema de Pitágoras é tão importante?",
            answer:
              "É um dos teoremas mais <strong>fundamentais da matemática</strong>, conectando geometria, álgebra e trigonometria. Tem <strong>aplicações universais</strong> em ciência, tecnologia e engenharia. <br><br><strong>Importância histórica e moderna:</strong><br>• <strong>Base da geometria:</strong> Fundamento para medições<br>• <strong>Física:</strong> Cálculos de forças e movimento<br>• <strong>Tecnologia:</strong> GPS, computação gráfica, robótica<br>• <strong>Educação:</strong> Ensina lógica e raciocínio matemático",
            borderColor: "system-success",
          },
        ]}
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora do Teorema de Pitágoras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">
                calculadora do Teorema de Pitágoras
              </strong>{" "}
              é<strong className="text-system-success"> 100% gratuita</strong> e oferece 5 modos de
              cálculo diferentes com explicações passo a passo, verificação de triângulos famosos e
              cálculos trigonométricos completos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Encontrar hipotenusa, calcular catetos, determinar
              ângulos, verificar triângulos retângulos e calcular usando ângulos. Inclui
              identificação de triângulos especiais como o Egípcio (3:4:5) e razões trigonométricas
              (sen, cos, tan).
            </p>
            <p>
              <strong className="text-system-warning">Uso Educacional e Profissional:</strong> Ideal
              para estudantes, professores, engenheiros, arquitetos, construtores e profissionais
              que trabalham com medições e geometria.
              <strong>Sempre verifique os resultados em aplicações críticas.</strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              📐 Baseado no teorema clássico de Pitágoras • 🎓 Ferramenta educacional gratuita • 🔒
              Seus dados não são armazenados • 📱 Interface responsiva • 🌙 Modo escuro disponível •
              🧮 5 modos de cálculo • 📊 Trigonometria incluída
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
            name: "Calculadora do Teorema de Pitágoras",
            description:
              "Calculadora online gratuita para aplicar o Teorema de Pitágoras em triângulos retângulos. Calcule hipotenusa, catetos, ângulos com explicações passo a passo e trigonometria.",
            url: "https://calculadorasonline.com.br/calculadoras/matematica/teorema-pitagoras",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Cálculo de hipotenusa usando catetos",
              "Cálculo de catetos usando hipotenusa",
              "Cálculo de ângulos em triângulos retângulos",
              "Verificação se triângulo é retângulo",
              "Cálculo usando ângulos e trigonometria",
              "Identificação de triângulos famosos",
              "Explicações passo a passo detalhadas",
              "Razões trigonométricas (sen, cos, tan)",
              "Interface móvel responsiva",
              "100% gratuito",
            ],
            educationalLevel: ["MiddleSchool", "HighSchool", "College", "Professional"],
            learningResourceType: "Interactive Tool",
            about: [
              {
                "@type": "Thing",
                name: "Teorema de Pitágoras",
                description:
                  "Relação matemática fundamental em triângulos retângulos: a² + b² = c²",
              },
              {
                "@type": "Thing",
                name: "Triângulos Retângulos",
                description: "Triângulos com um ângulo reto (90 graus) e propriedades especiais",
              },
              {
                "@type": "Thing",
                name: "Trigonometria",
                description: "Estudo das relações entre ângulos e lados em triângulos",
              },
              {
                "@type": "Thing",
                name: "Geometria Euclidiana",
                description: "Fundamentos geométricos baseados nos Elementos de Euclides",
              },
            ],
            teaches: [
              "Aplicação do Teorema de Pitágoras",
              "Cálculo de lados em triângulos retângulos",
              "Identificação de triângulos retângulos",
              "Razões trigonométricas básicas",
              "Triângulos pitagóricos famosos",
              "Aplicações práticas de geometria",
            ],
            audience: [
              {
                "@type": "Audience",
                name: "Estudantes",
                description: "Estudantes do ensino fundamental ao superior",
              },
              {
                "@type": "Audience",
                name: "Professores",
                description: "Educadores de matemática e geometria",
              },
              {
                "@type": "Audience",
                name: "Profissionais",
                description: "Engenheiros, arquitetos, construtores e profissionais técnicos",
              },
              {
                "@type": "Audience",
                name: "Pesquisadores",
                description: "Pesquisadores em matemática aplicada e educação",
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

      <RelatedCalculators category="matematica" currentCalculatorId="teorema-pitagoras" />
    </div>
  );
}
