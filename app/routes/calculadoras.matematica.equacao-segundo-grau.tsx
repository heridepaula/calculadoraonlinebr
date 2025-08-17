import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateQuadraticEquation,
  generateQuadraticExamples,
  type QuadraticEquationParams,
  type QuadraticEquationResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora Equação 2º Grau Bhaskara 2025 - Resolução Passo a Passo - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de Equação do 2º Grau GRATUITA com fórmula de Bhaskara! Resolva equações quadráticas passo a passo com análise do discriminante, vértice da parábola, raízes reais e complexas. Perfeita para estudantes e professores de matemática.",
    },
    {
      name: "keywords",
      content:
        "calculadora equação segundo grau, bhaskara calculadora, equação quadrática, fórmula de bhaskara, discriminante, vértice parábola, raízes reais, raízes complexas, equação ax2+bx+c, resolução passo a passo, matemática ensino médio, função quadrática, delta discriminante, parábola matemática, bhaskara online, equação 2 grau exercícios, raízes equação, fatoração quadrática, gráfico parábola, calculadora matemática",
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
      content: `Calculadora Equação 2º Grau - Fórmula de Bhaskara 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Resolva equações do 2º grau com Bhaskara passo a passo! Análise completa do discriminante, vértice e raízes. 100% gratuito e educativo!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/matematica/equacao-segundo-grau",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora Bhaskara - Equação 2º Grau - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Aprenda e resolva equações quadráticas com explicações passo a passo! Discriminante, vértice e todas as propriedades.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function QuadraticEquationCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [precision, setPrecision] = useState("4");
  const [result, setResult] = useState<QuadraticEquationResult | null>(null);
  const [showSteps, setShowSteps] = useState(true);
  const [selectedExample, setSelectedExample] = useState("");
  const [error, setError] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "equacao_segundo_grau",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("equacao_segundo_grau");

  const handleCalculate = () => {
    const aNum = parseFloat(a) || 0;
    const bNum = parseFloat(b) || 0;
    const cNum = parseFloat(c) || 0;
    const precisionNum = parseInt(precision) || 4;

    setError("");

    if (aNum === 0) {
      setError("O coeficiente 'a' não pode ser zero para uma equação do 2º grau");
      setResult(null);
      return;
    }

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setError("Por favor, insira valores numéricos válidos");
      setResult(null);
      return;
    }

    try {
      const params: QuadraticEquationParams = {
        a: aNum,
        b: bNum,
        c: cNum,
        precision: precisionNum,
      };

      const calculationResult = calculateQuadraticEquation(params);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no cálculo");
      setResult(null);
    }
  };

  const handleReset = () => {
    setA("");
    setB("");
    setC("");
    setPrecision("4");
    setResult(null);
    setError("");
    setSelectedExample("");
    setShowGraph(false);
  };

  const loadExample = (exampleId: string) => {
    const examples = generateQuadraticExamples();
    const example = examples.find((ex) => ex.type === exampleId || ex.title.includes(exampleId));

    if (example) {
      setA(example.params.a.toString());
      setB(example.params.b.toString());
      setC(example.params.c.toString());
      setSelectedExample(exampleId);
      setError("");
    }
  };

  const formatNumber = (value: number) => {
    if (value % 1 === 0) {
      return value.toString();
    } else {
      return value.toFixed(4).replace(/\.?0+$/, "");
    }
  };

  const formatEquation = (a: number, b: number, c: number) => {
    let equation = "";

    // Coefficient a
    if (a === 1) equation += "x²";
    else if (a === -1) equation += "-x²";
    else equation += `${a}x²`;

    // Coefficient b
    if (b > 0) equation += ` + ${b === 1 ? "" : b}x`;
    else if (b < 0) equation += ` - ${b === -1 ? "" : Math.abs(b)}x`;

    // Coefficient c
    if (c > 0) equation += ` + ${c}`;
    else if (c < 0) equation += ` - ${Math.abs(c)}`;

    return equation + " = 0";
  };

  const getRootTypeColor = (rootType: string) => {
    switch (rootType) {
      case "two_real":
        return "border-system-success bg-system-success/10";
      case "one_real":
        return "border-system-warning bg-system-warning/10";
      case "complex":
        return "border-primary-blue bg-primary-blue-light";
      default:
        return "border-neutral-surface-variant bg-background-dark-secondary";
    }
  };

  const getRootTypeIcon = (rootType: string) => {
    switch (rootType) {
      case "two_real":
        return "✅";
      case "one_real":
        return "⚠️";
      case "complex":
        return "🔵";
      default:
        return "📊";
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Equação do 2º Grau</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de Equação do 2º Grau</span>
          <span className="sm:hidden">Bhaskara</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Resolva <strong className="text-primary-blue-dark">equações quadráticas</strong> usando a
          <strong className="text-system-success"> fórmula de Bhaskara</strong> com
          <strong className="text-growth-green">resolução passo a passo</strong>. Perfeita para
          estudantes do ensino médio e fundamental.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            📐 <strong>Fórmula de Bhaskara</strong> • 📊 <strong>Análise do Discriminante</strong> •
            📈 <strong>Propriedades da Parábola</strong>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Calculator Inputs */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">🔢 Coeficientes da Equação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <p className="mb-2 text-sm text-text-secondary">
                    <strong className="text-system-info">Forma geral:</strong>
                  </p>
                  <div className="text-center">
                    <p className="font-mono text-lg font-bold text-primary-blue-dark">
                      ax² + bx + c = 0
                    </p>
                  </div>
                  <p className="mt-2 text-center text-xs text-text-secondary">onde a ≠ 0</p>
                </div>

                {result && (
                  <div className="rounded-lg border bg-background-dark-secondary p-4">
                    <p className="mb-2 text-sm text-text-secondary">
                      <strong>Sua equação:</strong>
                    </p>
                    <p className="text-center font-mono text-lg font-bold text-primary-blue-dark">
                      {formatEquation(result.a, result.b, result.c)}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-primary">
                      Coeficiente a
                    </label>
                    <Input
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="Ex: 1"
                      step="any"
                      required
                      fullWidth
                    />
                    <p className="mt-1 text-xs text-text-secondary">Não pode ser zero</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-primary">
                      Coeficiente b
                    </label>
                    <Input
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="Ex: -5"
                      step="any"
                      fullWidth
                    />
                    <p className="mt-1 text-xs text-text-secondary">Pode ser zero</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-primary">
                      Coeficiente c
                    </label>
                    <Input
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="Ex: 6"
                      step="any"
                      fullWidth
                    />
                    <p className="mt-1 text-xs text-text-secondary">Pode ser zero</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 sm:flex-row">
                  <div className="flex-1">
                    <Select
                      label="Precisão (casas decimais)"
                      value={precision}
                      onChange={(value) => setPrecision(value)}
                      options={[
                        { value: "2", label: "2 casas decimais" },
                        { value: "4", label: "4 casas decimais" },
                        { value: "6", label: "6 casas decimais" },
                        { value: "8", label: "8 casas decimais" },
                      ]}
                      fullWidth
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showGraph"
                      checked={showGraph}
                      onChange={(e) => setShowGraph(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label
                      htmlFor="showGraph"
                      className="whitespace-nowrap text-xs font-medium text-text-primary"
                    >
                      Mostrar propriedades
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-3">
                    <p className="text-sm font-medium text-system-error">{error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h3">📚 Exemplos Práticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  onClick={() => {
                    setSelectedExample("two_real");
                    loadExample("two_real");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-system-success">✅ Duas Raízes Reais</div>
                    <div className="text-xs text-text-secondary">x² - 5x + 6 = 0</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("one_real");
                    loadExample("one_real");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-system-warning">⚠️ Uma Raiz Real</div>
                    <div className="text-xs text-text-secondary">x² - 6x + 9 = 0</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("complex");
                    loadExample("complex");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-primary-blue-dark">🔵 Raízes Complexas</div>
                    <div className="text-xs text-text-secondary">x² + 2x + 5 = 0</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("application");
                    loadExample("Movimento projétil");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-growth-green">🚀 Aplicação Física</div>
                    <div className="text-xs text-text-secondary">-5t² + 20t + 15 = 0</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button onClick={handleCalculate} className="px-6 sm:px-8" fullWidth>
              Resolver Equação
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-6 text-system-error hover:bg-system-error hover:text-white sm:px-8"
              fullWidth
            >
              Limpar
            </Button>
          </div>
        </div>

        {/* Right Column - Quick Results */}
        {result && (
          <div className="space-y-4">
            <Card className={`border-2 duration-300 ${getRootTypeColor(result.rootType)}`}>
              <CardHeader>
                <CardTitle as="h3" className="text-lg">
                  {getRootTypeIcon(result.rootType)} Resultado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="mb-2 text-sm text-text-secondary">Discriminante (Δ)</p>
                    <div className="mb-2 text-2xl font-bold tabular-nums">
                      Δ = {formatNumber(result.discriminant)}
                    </div>
                  </div>

                  {result.rootType === "two_real" && result.roots.x1 && result.roots.x2 && (
                    <div className="space-y-2">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Raízes</p>
                        <div className="font-mono text-lg font-bold text-system-success">
                          x₁ = {result.roots.x1.formatted}
                        </div>
                        <div className="font-mono text-lg font-bold text-system-success">
                          x₂ = {result.roots.x2.formatted}
                        </div>
                      </div>
                    </div>
                  )}

                  {result.rootType === "one_real" && result.roots.x1 && (
                    <div className="text-center">
                      <p className="mb-1 text-sm text-text-secondary">Raiz Dupla</p>
                      <div className="font-mono text-lg font-bold text-system-warning">
                        x = {result.roots.x1.formatted}
                      </div>
                    </div>
                  )}

                  {result.rootType === "complex" && result.roots.complex && (
                    <div className="space-y-2">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Raízes Complexas</p>
                        <div className="font-mono text-sm font-bold text-primary-blue-dark">
                          x₁ = {result.roots.complex.x1}
                        </div>
                        <div className="font-mono text-sm font-bold text-primary-blue-dark">
                          x₂ = {result.roots.complex.x2}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded bg-background-dark-secondary p-3 text-center">
                    <p className="text-xs text-text-secondary">{result.interpretation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showGraph && (
              <>
                <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
                  <CardHeader>
                    <CardTitle as="h3" className="text-lg text-growth-green">
                      📊 Vértice da Parábola
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-center">
                        <div className="font-mono text-lg font-bold text-growth-green">
                          V = {result.vertex.formatted}
                        </div>
                        <p className="mt-2 text-xs text-text-secondary">
                          {result.parabola.opensUpward
                            ? "Parábola para cima (mínimo)"
                            : "Parábola para baixo (máximo)"}
                        </p>
                      </div>
                      <div className="space-y-1 rounded bg-background-dark-secondary p-2 text-xs">
                        <div className="flex justify-between">
                          <span>Eixo de simetria:</span>
                          <span className="font-mono">
                            x = {formatNumber(result.parabola.axis)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Intercepto y:</span>
                          <span className="font-mono">y = {formatNumber(result.yIntercept)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-system-info bg-system-info/10 duration-300">
                  <CardHeader>
                    <CardTitle as="h3" className="text-lg text-system-info">
                      📈 Domínio e Imagem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 font-semibold text-system-info">Domínio:</p>
                        <p className="font-mono text-xs">{result.domainRange.domain}</p>
                      </div>
                      <div>
                        <p className="mb-1 font-semibold text-system-info">Imagem:</p>
                        <p className="font-mono text-xs">{result.domainRange.range}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {result.factorization && (
                  <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
                    <CardHeader>
                      <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                        🔧 Fatoração
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="mb-1 text-text-secondary">Forma padrão:</p>
                          <p className="rounded bg-background-dark-secondary p-2 font-mono text-xs">
                            {result.factorization.standard}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-text-secondary">Forma fatorada:</p>
                          <p className="rounded bg-background-dark-secondary p-2 font-mono text-xs">
                            {result.factorization.factored}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Step-by-Step Solution */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📝 Resolução Passo a Passo
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
                <div className="space-y-4">
                  {result.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border-l-4 p-4 ${
                        step.step === 1
                          ? "border-primary-blue bg-primary-blue-light"
                          : step.step === 2
                            ? "border-system-info bg-system-info/10"
                            : step.step === 3
                              ? "border-growth-green bg-growth-green-soft"
                              : "border-system-success bg-system-success/10"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                            step.step === 1
                              ? "bg-primary-blue"
                              : step.step === 2
                                ? "bg-system-info"
                                : step.step === 3
                                  ? "bg-growth-green"
                                  : "bg-system-success"
                          }`}
                        >
                          {step.step}
                        </div>
                        <div className="flex-grow">
                          <h4 className="mb-2 font-semibold text-text-primary">{step.title}</h4>
                          <div className="space-y-2">
                            <div className="rounded bg-gray-900 p-3 font-mono text-sm">
                              <p className="mb-1 text-gray-300">Fórmula:</p>
                              <p className="font-bold text-white">{step.formula}</p>
                            </div>
                            <div className="rounded bg-background-dark-secondary p-3">
                              <p className="mb-1 text-sm text-text-secondary">Cálculo:</p>
                              <p className="whitespace-pre-line font-semibold">
                                {step.calculation}
                              </p>
                            </div>
                            <div
                              className={`rounded p-2 text-center font-bold ${
                                step.step === 4 && result.hasRealRoots
                                  ? "bg-system-success text-white"
                                  : step.step === 4 && !result.hasRealRoots
                                    ? "bg-primary-blue text-white"
                                    : "bg-primary-blue-light text-primary-blue-dark"
                              }`}
                            >
                              {step.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Examples Section */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">
                📖 Exemplos Similares -{" "}
                {result.rootType === "two_real"
                  ? "Duas Raízes Reais"
                  : result.rootType === "one_real"
                    ? "Uma Raiz Real"
                    : "Raízes Complexas"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {result.examples.map((example, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4"
                  >
                    <h4 className="mb-2 font-bold text-primary-blue-dark">{example.title}</h4>
                    <p className="mb-3 text-sm text-text-secondary">{example.description}</p>
                    <div className="rounded bg-gray-900 p-2">
                      <p className="font-mono text-xs text-gray-300">{example.equation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Educational Content Sections */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📐 Equação do 2º Grau: O Guia Completo da Fórmula de Bhaskara
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                A <strong className="text-primary-blue-dark">equação do 2º grau</strong> é uma das
                mais importantes da matemática, representada pela forma{" "}
                <strong className="text-system-success">ax² + bx + c = 0</strong> onde a ≠ 0. A{" "}
                <strong className="text-growth-green">fórmula de Bhaskara</strong> é o método
                clássico para encontrar suas raízes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                  📊 Fórmula de Bhaskara
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded bg-primary-blue-light p-4">
                    <p className="mb-2 text-center font-semibold text-primary-blue-dark">
                      Fórmula Completa:
                    </p>
                    <div className="space-y-2 text-center">
                      <p className="font-mono text-lg">x = (-b ± √Δ) / (2a)</p>
                      <p className="font-mono text-lg">Δ = b² - 4ac</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-primary-blue-dark">Onde:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>
                        <strong>a</strong>: coeficiente do termo x² (a ≠ 0)
                      </li>
                      <li>
                        <strong>b</strong>: coeficiente do termo x
                      </li>
                      <li>
                        <strong>c</strong>: termo constante
                      </li>
                      <li>
                        <strong>Δ</strong>: discriminante
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-info/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-info">
                  🔍 Análise do Discriminante
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="space-y-3">
                    <div className="rounded border border-system-success/20 bg-system-success/10 p-3">
                      <p className="font-semibold text-system-success">
                        Δ &gt; 0: Duas raízes reais distintas
                      </p>
                      <p className="text-xs text-text-secondary">
                        A parábola corta o eixo x em dois pontos
                      </p>
                    </div>

                    <div className="rounded border border-system-warning/20 bg-system-warning/10 p-3">
                      <p className="font-semibold text-system-warning">
                        Δ = 0: Uma raiz real (dupla)
                      </p>
                      <p className="text-xs text-text-secondary">A parábola tangencia o eixo x</p>
                    </div>

                    <div className="rounded border border-primary-blue/20 bg-primary-blue-light p-3">
                      <p className="font-semibold text-primary-blue-dark">
                        Δ &lt; 0: Duas raízes complexas
                      </p>
                      <p className="text-xs text-text-secondary">A parábola não toca o eixo x</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Educational Content */}
      <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🎯 Propriedades da Função Quadrática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-primary-blue-dark">
                  📈 Características da Parábola
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">🔄 Concavidade</h4>
                    <p className="mb-2 text-sm text-text-secondary">
                      <strong>a &gt; 0:</strong> Parábola para cima (∪) - tem ponto de mínimo
                      <br />
                      <strong>a &lt; 0:</strong> Parábola para baixo (∩) - tem ponto de máximo
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">📍 Vértice</h4>
                    <p className="mb-2 text-sm text-text-secondary">
                      <strong>Coordenadas:</strong> V = (-b/2a, -Δ/4a)
                      <br />
                      <strong>Significado:</strong> Ponto de máximo ou mínimo da função
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📏 Eixo de Simetria
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Equação:</strong> x = -b/2a
                      <br />
                      <strong>Propriedade:</strong> Divide a parábola em duas partes iguais
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-system-success">
                  🎯 Aplicações Práticas
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">
                      🚀 Física - Movimento Projétil
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Exemplo:</strong> h(t) = -5t² + 20t + 25
                      <br />
                      <strong>Aplicação:</strong> Altura de um projétil ao longo do tempo
                      <br />
                      <strong>Raízes:</strong> Momentos em que o objeto toca o solo
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">
                      💰 Economia - Lucro Máximo
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Exemplo:</strong> L(x) = -x² + 50x - 400
                      <br />
                      <strong>Aplicação:</strong> Lucro em função da quantidade produzida
                      <br />
                      <strong>Vértice:</strong> Ponto de lucro máximo
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">
                      🏗️ Engenharia - Otimização
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Exemplo:</strong> A = x(20 - x)
                      <br />
                      <strong>Aplicação:</strong> Área máxima com perímetro fixo
                      <br />
                      <strong>Solução:</strong> Encontrar dimensões ótimas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Steps Guide */}
      <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📋 Guia Passo a Passo para Resolver Equações do 2º Grau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-growth-green">🔢 Método Sistemático</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-primary-blue-dark">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-blue text-sm text-white">
                      1
                    </span>
                    Identificar os Coeficientes
                  </h4>
                  <p className="ml-8 text-sm text-text-secondary">
                    Na equação ax² + bx + c = 0, identifique os valores de a, b e c.
                    <br />
                    <strong>Importante:</strong> a ≠ 0 (senão não é equação do 2º grau)
                  </p>
                </div>

                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-system-info">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-system-info text-sm text-white">
                      2
                    </span>
                    Calcular o Discriminante
                  </h4>
                  <p className="ml-8 text-sm text-text-secondary">
                    Δ = b² - 4ac
                    <br />
                    <strong>Dica:</strong> O valor de Δ determinará o tipo de raízes
                  </p>
                </div>

                <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-growth-green">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-growth-green text-sm text-white">
                      3
                    </span>
                    Analisar o Discriminante
                  </h4>
                  <div className="ml-8 space-y-1 text-sm text-text-secondary">
                    <p>
                      <strong>Se Δ &gt; 0:</strong> Duas raízes reais diferentes
                    </p>
                    <p>
                      <strong>Se Δ = 0:</strong> Uma raiz real (dupla)
                    </p>
                    <p>
                      <strong>Se Δ &lt; 0:</strong> Duas raízes complexas (não reais)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-system-success">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-system-success text-sm text-white">
                      4
                    </span>
                    Aplicar a Fórmula de Bhaskara
                  </h4>
                  <div className="ml-8 text-sm text-text-secondary">
                    <p className="mb-2">
                      <strong>x = (-b ± √Δ) / (2a)</strong>
                    </p>
                    <p>
                      <strong>Se Δ ≥ 0:</strong> x₁ = (-b + √Δ) / (2a) e x₂ = (-b - √Δ) / (2a)
                    </p>
                    <p>
                      <strong>Se Δ &lt; 0:</strong> Raízes complexas com parte imaginária
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-3 font-semibold text-system-warning">⚠️ Dicas Importantes</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                <li>
                  <strong>Sempre verifique</strong> se a ≠ 0 antes de começar
                </li>
                <li>
                  <strong>Organize a equação</strong> na forma padrão ax² + bx + c = 0
                </li>
                <li>
                  <strong>Cuidado com os sinais</strong> ao identificar os coeficientes
                </li>
                <li>
                  <strong>Substitua as raízes</strong> na equação original para verificar
                </li>
                <li>
                  <strong>Interprete o resultado</strong> no contexto do problema
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Equação do 2º Grau"
        items={[
          {
            question: "O que é uma equação do 2º grau e como resolvê-la?",
            answer:
              "É uma <strong>equação polinomial</strong> na forma ax² + bx + c = 0, onde a ≠ 0. Resolve-se usando a <strong>fórmula de Bhaskara</strong>: x = (-b ± √Δ)/2a, onde Δ = b² - 4ac. É fundamental para modelar situações que envolvem <strong>relações quadráticas</strong>!",
            borderColor: "primary-blue",
          },
          {
            question: "O que significa o discriminante (Δ) na equação do 2º grau?",
            answer:
              "O <strong>discriminante Δ = b² - 4ac</strong> determina o tipo de raízes: <strong>Δ > 0:</strong> duas raízes reais diferentes, <strong>Δ = 0:</strong> uma raiz dupla, <strong>Δ < 0:</strong> raízes complexas. É essencial para entender o comportamento da parábola!",
            borderColor: "system-success",
          },
          {
            question: "Como verificar se as raízes encontradas estão corretas?",
            answer:
              "<strong>Substitua as raízes na equação original</strong> - o resultado deve ser zero! Exemplo: para x² - 5x + 6 = 0, se x₁ = 2, então (2)² - 5(2) + 6 = 0 ✓. É o método mais confiável para <strong>validar sua solução</strong>!",
            borderColor: "growth-green",
          },
          {
            question: "Quais são as aplicações práticas das equações do 2º grau?",
            answer:
              "<strong>Física:</strong> trajetórias de projéteis, <strong>Economia:</strong> otimização de lucros, <strong>Engenharia:</strong> design de estruturas parabólicas, <strong>Arquitetura:</strong> arcos e pontes. São fundamentais para <strong>modelar fenômenos quadráticos</strong> em diversas áreas!",
            borderColor: "system-info",
          },
          {
            question: "Quando uma equação do 2º grau tem raízes complexas?",
            answer:
              "Quando o <strong>discriminante é negativo (Δ < 0)</strong>. Isso significa que a parábola não toca o eixo x, ficando toda acima ou abaixo dele. As raízes são da forma a ± bi, onde i é a <strong>unidade imaginária</strong>!",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre vértice e raízes da parábola?",
            answer:
              "<strong>Raízes:</strong> pontos onde a parábola corta o eixo x (f(x) = 0). <strong>Vértice:</strong> ponto de máximo ou mínimo da parábola V = (-b/2a, -Δ/4a). Raízes resolvem equações, vértice resolve <strong>problemas de otimização</strong>!",
            borderColor: "system-success",
          },
          {
            question: "Como resolver equações do 2º grau sem a fórmula de Bhaskara?",
            answer:
              "<strong>Fatoração:</strong> x² - 5x + 6 = (x-2)(x-3) = 0. <strong>Completar quadrados:</strong> transformar em (x+h)² = k. <strong>Método gráfico:</strong> plotar a parábola e observar intersecções. Cada método tem suas <strong>vantagens específicas</strong>!",
            borderColor: "growth-green",
          },
          {
            question: "A calculadora funciona para todos os tipos de equação do 2º grau?",
            answer:
              "<strong>Sim, absolutamente!</strong> Resolve equações completas (ax² + bx + c = 0), incompletas (ax² + c = 0, ax² + bx = 0), com <strong>coeficientes positivos, negativos, decimais ou fracionários</strong>. Mostra passo a passo e análise completa!",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Sempre <strong>organize a equação na forma padrão</strong> ax² + bx + c = 0 antes de aplicar Bhaskara. Verifique se a ≠ 0 e cuidado com os sinais dos coeficientes - são os erros mais comuns!",
        }}
        footerText="<strong>Precisa resolver mais equações?</strong> Use nossa calculadora quantas vezes quiser e explore os exemplos práticos para dominar completamente as equações do 2º grau!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Equação do 2º Grau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de equação do 2º grau</strong>{" "}
              é<strong className="text-system-success"> 100% gratuita</strong> e oferece resolução
              passo a passo usando a fórmula de Bhaskara, com análise completa do discriminante e
              propriedades da parábola.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Cálculo do discriminante, identificação do tipo de
              raízes, resolução passo a passo detalhada, análise do vértice e propriedades da
              parábola, fatoração quando possível, e exemplos práticos contextualizados para
              diferentes áreas.
            </p>
            <p>
              <strong className="text-system-warning">Uso Educacional:</strong> Esta ferramenta é
              ideal para estudantes do ensino fundamental e médio, professores de matemática, e
              profissionais que trabalham com modelagem quadrática.{" "}
              <strong>Sempre confira os resultados em situações críticas.</strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados na fórmula de Bhaskara padronizada • 🎓 Ferramenta educacional
              gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos os
              dispositivos • 🌙 Modo escuro disponível • ✅ Verificação automática de resultados
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
            name: "Calculadora de Equação do 2º Grau - Bhaskara",
            description:
              "Calculadora online gratuita para resolver equações do 2º grau usando a fórmula de Bhaskara com explicações passo a passo. Ideal para estudantes e professores.",
            url: "https://calculadorasonline.com.br/calculadoras/matematica/equacao-segundo-grau",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Fórmula de Bhaskara",
              "Análise do discriminante",
              "Resolução passo a passo",
              "Propriedades da parábola",
              "Raízes reais e complexas",
              "Exemplos práticos",
              "100% gratuito",
            ],
            educationalLevel: ["MiddleSchool", "HighSchool"],
            learningResourceType: "Interactive Tool",
            about: {
              "@type": "Thing",
              name: "Equação do Segundo Grau",
              description: "Equação polinomial de grau 2 da forma ax² + bx + c = 0",
            },
            teaches: [
              "Fórmula de Bhaskara",
              "Discriminante",
              "Função quadrática",
              "Propriedades da parábola",
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

      <RelatedCalculators category="matematica" currentCalculatorId="equacao-segundo-grau" />
    </div>
  );
}
