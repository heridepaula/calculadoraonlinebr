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
  calculateRuleOfThree,
  generateRuleOfThreeExamples,
  detectProportionType,
  type RuleOfThreeParams,
  type RuleOfThreeResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora Regra de Três 2025 - Simples e Inversa Passo a Passo - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de regra de três GRATUITA com resolução passo a passo! Resolva regra de três simples e inversa com explicações detalhadas, exemplos práticos e verificação automática. Perfeita para estudantes, professores e uso profissional do dia a dia.",
    },
    {
      name: "keywords",
      content:
        "calculadora regra de três, regra de três simples, regra de três inversa, regra de 3 passo a passo, como resolver regra de três, calculadora proporção, regra de três direta, regra de três indireta, exercícios regra de três, matemática básica, proporção matemática, cálculo proporção, regra de três online, resolver proporção, regra de três exemplos, regra três exercícios, matemática ensino fundamental, regra de três aplicada, problemas regra de três",
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
      content: `Calculadora Regra de Três - Resolução Passo a Passo 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Resolva regra de três simples e inversa com explicações detalhadas! Ferramenta educativa com verificação automática e exemplos práticos. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/matematica/regra-de-tres",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora Regra de Três Passo a Passo - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Aprenda e resolva regra de três com explicações detalhadas! Simples, inversa e exemplos práticos para todos os níveis.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function RuleOfThreeCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [x, setX] = useState("");
  const [mode, setMode] = useState<"simple_direct" | "simple_inverse">("simple_direct");
  const [unitA, setUnitA] = useState("");
  const [unitB, setUnitB] = useState("");
  const [unitC, setUnitC] = useState("");
  const [unitX, setUnitX] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<RuleOfThreeResult | null>(null);
  const [showSteps, setShowSteps] = useState(true);
  const [selectedExample, setSelectedExample] = useState("");
  const [autoDetect, setAutoDetect] = useState(false);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "regra_de_tres",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("regra_de_tres");

  const handleCalculate = () => {
    const aNum = parseFloat(a) || 0;
    const bNum = parseFloat(b) || 0;
    const cNum = parseFloat(c) || 0;
    const xNum = x ? parseFloat(x) : undefined;

    if (aNum > 0 && bNum > 0 && cNum > 0) {
      const params: RuleOfThreeParams = {
        a: aNum,
        b: bNum,
        c: cNum,
        x: xNum,
        mode,
        proportionType: mode === "simple_direct" ? "direct" : "inverse",
        units:
          unitA || unitB || unitC || unitX
            ? {
                a: unitA || "",
                b: unitB || "",
                c: unitC || "",
                x: unitX || "",
              }
            : undefined,
        context: context || undefined,
      };

      const calculationResult = calculateRuleOfThree(params);
      setResult(calculationResult);
    }
  };

  const handleReset = () => {
    setA("");
    setB("");
    setC("");
    setX("");
    setUnitA("");
    setUnitB("");
    setUnitC("");
    setUnitX("");
    setContext("");
    setResult(null);
    setSelectedExample("");
  };

  const handleAutoDetect = () => {
    const aNum = parseFloat(a) || 0;
    const bNum = parseFloat(b) || 0;
    const cNum = parseFloat(c) || 0;
    const xNum = parseFloat(x) || 0;

    if (aNum > 0 && bNum > 0 && cNum > 0 && xNum > 0) {
      const detectedType = detectProportionType(aNum, bNum, cNum, xNum);
      setMode(detectedType === "direct" ? "simple_direct" : "simple_inverse");
    }
  };

  const loadExample = (exampleId: string) => {
    const examples = {
      price: {
        a: "3",
        b: "12",
        c: "5",
        x: "",
        unitA: "canetas",
        unitB: "R$",
        unitC: "canetas",
        unitX: "R$",
        context: "Compra de canetas",
      },
      fuel: {
        a: "8",
        b: "100",
        c: "20",
        x: "",
        unitA: "litros",
        unitB: "km",
        unitC: "litros",
        unitX: "km",
        context: "Consumo de combustível",
      },
      workers: {
        a: "6",
        b: "12",
        c: "9",
        x: "",
        unitA: "operários",
        unitB: "dias",
        unitC: "operários",
        unitX: "dias",
        context: "Trabalho em equipe",
      },
      speed: {
        a: "80",
        b: "3",
        c: "120",
        x: "",
        unitA: "km/h",
        unitB: "horas",
        unitC: "km/h",
        unitX: "horas",
        context: "Velocidade e tempo",
      },
    };

    const example = examples[exampleId as keyof typeof examples];
    if (example) {
      setA(example.a);
      setB(example.b);
      setC(example.c);
      setX(example.x);
      setUnitA(example.unitA);
      setUnitB(example.unitB);
      setUnitC(example.unitC);
      setUnitX(example.unitX);
      setContext(example.context);

      // Auto-set mode based on example
      if (exampleId === "price" || exampleId === "fuel") {
        setMode("simple_direct");
      } else {
        setMode("simple_inverse");
      }
    }
  };

  useEffect(() => {
    if (autoDetect && x && a && b && c) {
      handleAutoDetect();
    }
  }, [x, autoDetect]);

  const formatNumber = (value: number) => {
    if (value % 1 === 0) {
      return value.toString();
    } else {
      return value.toFixed(4).replace(/\.?0+$/, "");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Regra de Três</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de Regra de Três</span>
          <span className="sm:hidden">Regra de Três</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Resolva{" "}
          <strong className="text-primary-blue-dark">regra de três simples e inversa</strong> com
          <strong className="text-system-success"> explicações passo a passo</strong>. Perfeita para{" "}
          <strong className="text-growth-green">estudantes, professores</strong> e aplicações do dia
          a dia.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            📝 <strong>Passo a Passo</strong> • ✅ <strong>Verificação Automática</strong> • 🎯{" "}
            <strong>Exemplos Práticos</strong>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Calculator Inputs */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">🔢 Configuração da Proporção</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <Select
                    label="Tipo de Proporção"
                    value={mode}
                    onChange={(value) => setMode(value as typeof mode)}
                    options={[
                      { value: "simple_direct", label: "Regra de Três Simples (Direta)" },
                      { value: "simple_inverse", label: "Regra de Três Inversa (Indireta)" },
                    ]}
                    fullWidth
                  />
                  <div className="mt-2 flex items-center space-x-2 sm:mt-6">
                    <input
                      type="checkbox"
                      id="autoDetect"
                      checked={autoDetect}
                      onChange={(e) => setAutoDetect(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label
                      htmlFor="autoDetect"
                      className="whitespace-nowrap text-xs font-medium text-text-primary"
                    >
                      Auto-detectar tipo
                    </label>
                  </div>
                </div>

                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <p className="mb-2 text-sm text-text-secondary">
                    <strong className="text-system-info">Fórmula:</strong>
                  </p>
                  <div className="text-center">
                    {mode === "simple_direct" ? (
                      <p className="font-mono text-lg font-bold text-primary-blue-dark">
                        a : b :: c : x → a/b = c/x
                      </p>
                    ) : (
                      <p className="font-mono text-lg font-bold text-system-warning">
                        a × b = c × x
                      </p>
                    )}
                  </div>
                  <p className="mt-2 text-center text-xs text-text-secondary">
                    {mode === "simple_direct"
                      ? "Proporção direta: quando uma grandeza aumenta, a outra também aumenta"
                      : "Proporção inversa: quando uma grandeza aumenta, a outra diminui"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Primeiro valor (a)
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={a}
                            onChange={(e) => setA(e.target.value)}
                            placeholder="Ex: 3"
                            step="any"
                            required
                            fullWidth
                          />
                        </div>
                        <Input
                          type="text"
                          value={unitA}
                          onChange={(e) => setUnitA(e.target.value)}
                          placeholder="unidade"
                          fullWidth
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Segundo valor (b)
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            placeholder="Ex: 12"
                            step="any"
                            required
                            fullWidth
                          />
                        </div>
                        <Input
                          type="text"
                          value={unitB}
                          onChange={(e) => setUnitB(e.target.value)}
                          placeholder="unidade"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Terceiro valor (c)
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={c}
                            onChange={(e) => setC(e.target.value)}
                            placeholder="Ex: 5"
                            step="any"
                            required
                            fullWidth
                          />
                        </div>
                        <Input
                          type="text"
                          value={unitC}
                          onChange={(e) => setUnitC(e.target.value)}
                          placeholder="unidade"
                          fullWidth
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Valor procurado (x)
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={x}
                            onChange={(e) => setX(e.target.value)}
                            placeholder="(opcional)"
                            step="any"
                            fullWidth
                          />
                        </div>
                        <Input
                          type="text"
                          value={unitX}
                          onChange={(e) => setUnitX(e.target.value)}
                          placeholder="unidade"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>

                  <Input
                    type="text"
                    label="Contexto do Problema (Opcional)"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Ex: Cálculo de preços, consumo de combustível..."
                    fullWidth
                  />
                </div>
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
                    setSelectedExample("price");
                    loadExample("price");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-primary-blue-dark">
                      💰 Preços Proporcionais
                    </div>
                    <div className="text-xs text-text-secondary">3 canetas custam R$ 12...</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("fuel");
                    loadExample("fuel");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-growth-green">⛽ Consumo de Combustível</div>
                    <div className="text-xs text-text-secondary">8 litros para 100 km...</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("workers");
                    loadExample("workers");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-system-warning">👷 Trabalho em Equipe</div>
                    <div className="text-xs text-text-secondary">6 operários em 12 dias...</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("speed");
                    loadExample("speed");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-system-info">🚗 Velocidade e Tempo</div>
                    <div className="text-xs text-text-secondary">80 km/h em 3 horas...</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button onClick={handleCalculate} className="px-6 sm:px-8" fullWidth>
              Resolver Regra de Três
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
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                  🎯 Resultado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="mb-2 text-2xl font-bold tabular-nums text-primary-blue-dark sm:text-3xl">
                    x = {formatNumber(result.x)}
                    {unitX && <span className="ml-1 text-lg">{unitX}</span>}
                  </div>
                  <p className="text-sm text-text-secondary">{result.interpretation}</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 duration-300 ${
                result.verification.isCorrect
                  ? "border-system-success bg-system-success/10"
                  : "border-system-warning bg-system-warning/10"
              }`}
            >
              <CardHeader>
                <CardTitle
                  as="h3"
                  className={`text-lg ${
                    result.verification.isCorrect ? "text-system-success" : "text-system-warning"
                  }`}
                >
                  {result.verification.isCorrect ? "✅" : "⚠️"} Verificação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Tipo de proporção:</span>
                    <span className="font-bold">
                      {result.proportionType === "direct" ? "Direta" : "Inversa"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lado esquerdo:</span>
                    <span className="font-mono">{result.verification.leftSide.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lado direito:</span>
                    <span className="font-mono">{result.verification.rightSide.toFixed(4)}</span>
                  </div>
                  <div className="rounded bg-background-dark-secondary p-2 text-center text-xs">
                    {result.verification.isCorrect
                      ? "✓ A proporção está correta"
                      : `⚠ Diferença: ${result.verification.difference.toFixed(6)}`}
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.unitAnalysis && (
              <Card
                className={`border-2 duration-300 ${
                  result.unitAnalysis.unitsMatch
                    ? "border-system-success bg-system-success/10"
                    : "border-system-warning bg-system-warning/10"
                }`}
              >
                <CardHeader>
                  <CardTitle
                    as="h3"
                    className={`text-lg ${
                      result.unitAnalysis.unitsMatch ? "text-system-success" : "text-system-warning"
                    }`}
                  >
                    📏 Análise de Unidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Unidades de entrada:</strong> {result.unitAnalysis.inputUnits}
                    </p>
                    <p>
                      <strong>Unidade de saída:</strong> {result.unitAnalysis.outputUnits}
                    </p>
                    <div className="rounded bg-background-dark-secondary p-2 text-xs">
                      {result.unitAnalysis.recommendation}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                            ? "border-growth-green bg-growth-green-soft"
                            : step.step === 3
                              ? "border-system-warning bg-system-warning/10"
                              : "border-system-success bg-system-success/10"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                            step.step === 1
                              ? "bg-primary-blue"
                              : step.step === 2
                                ? "bg-growth-green"
                                : step.step === 3
                                  ? "bg-system-warning"
                                  : "bg-system-success"
                          }`}
                        >
                          {step.step}
                        </div>
                        <div className="flex-grow">
                          <h4 className="mb-2 font-semibold text-text-primary">
                            {step.description}
                          </h4>
                          <div className="space-y-2">
                            <div className="rounded bg-gray-900 p-3 font-mono text-sm">
                              <p className="mb-1 text-gray-300">Fórmula:</p>
                              <p className="font-bold text-white">{step.formula}</p>
                            </div>
                            <div className="rounded bg-background-dark-secondary p-3">
                              <p className="mb-1 text-sm text-text-secondary">Cálculo:</p>
                              <p className="font-semibold">{step.calculation}</p>
                            </div>
                            <div
                              className={`rounded p-2 text-center font-bold ${
                                step.step === 4 && result.verification.isCorrect
                                  ? "bg-system-success text-white"
                                  : step.step === 4 && !result.verification.isCorrect
                                    ? "bg-system-warning text-white"
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
                {result.proportionType === "direct" ? "Proporção Direta" : "Proporção Inversa"}
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
                      <p className="font-mono text-xs text-gray-300">{example.formula}</p>
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
            📐 Regra de Três: O Guia Completo para Resolver Proporções
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                A <strong className="text-primary-blue-dark">regra de três</strong> é um método
                matemático usado para resolver problemas que envolvem
                <strong className="text-system-success"> proporções entre grandezas</strong>. É uma
                das ferramentas mais úteis da matemática básica, aplicada em situações do cotidiano
                como <em>cálculos de preços, consumo, tempo e distância</em>.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                  📈 Regra de Três Simples (Direta)
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Quando usar:</strong> Quando as grandezas são diretamente proporcionais
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-primary-blue-dark">Características:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Se uma grandeza aumenta, a outra também aumenta</li>
                      <li>Se uma grandeza diminui, a outra também diminui</li>
                      <li>A razão entre as grandezas permanece constante</li>
                    </ul>
                  </div>
                  <div className="rounded bg-primary-blue-light p-3">
                    <p className="font-semibold text-primary-blue-dark">Fórmula:</p>
                    <p className="font-mono text-lg">a : b :: c : x</p>
                    <p className="font-mono text-lg">a/b = c/x</p>
                    <p className="font-mono text-lg">x = (b × c) / a</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-warning">
                  📉 Regra de Três Inversa (Indireta)
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Quando usar:</strong> Quando as grandezas são inversamente proporcionais
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-system-warning">Características:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Se uma grandeza aumenta, a outra diminui</li>
                      <li>Se uma grandeza diminui, a outra aumenta</li>
                      <li>O produto das grandezas permanece constante</li>
                    </ul>
                  </div>
                  <div className="rounded border border-system-warning/20 bg-system-warning/10 p-3">
                    <p className="font-semibold text-system-warning">Fórmula:</p>
                    <p className="font-mono text-lg">a × b = c × x</p>
                    <p className="font-mono text-lg">x = (a × b) / c</p>
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
            🎯 Como Identificar o Tipo de Proporção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-primary-blue-dark">
                  ➡️ Proporção Direta - Exemplos Práticos
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">🛒 Compras</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Situação:</strong> Mais produtos = Mais dinheiro
                      <br />
                      <strong>Exemplo:</strong> "Se 2 kg de arroz custam R$ 8, quanto custam 5 kg?"
                      <br />
                      <strong>Lógica:</strong> Aumentando a quantidade, o preço aumenta
                      proporcionalmente.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      🚗 Distância e Combustível
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Situação:</strong> Mais distância = Mais combustível
                      <br />
                      <strong>Exemplo:</strong> "Para 100 km gasto 8 litros, para 250 km gasto
                      quanto?"
                      <br />
                      <strong>Lógica:</strong> Mais quilômetros exigem mais combustível.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📏 Escalas e Mapas
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Situação:</strong> Maior escala = Maior distância real
                      <br />
                      <strong>Exemplo:</strong> "No mapa 2 cm = 50 km, então 7 cm = ?"
                      <br />
                      <strong>Lógica:</strong> Proporcionalidade direta entre mapa e realidade.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-system-warning">
                  ⬅️ Proporção Inversa - Exemplos Práticos
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      👷 Trabalho em Equipe
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Situação:</strong> Mais trabalhadores = Menos tempo
                      <br />
                      <strong>Exemplo:</strong> "6 operários fazem em 12 dias, 9 operários fazem em
                      quanto tempo?"
                      <br />
                      <strong>Lógica:</strong> Mais pessoas trabalhando, menos tempo necessário.
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      🏃 Velocidade e Tempo
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Situação:</strong> Mais velocidade = Menos tempo
                      <br />
                      <strong>Exemplo:</strong> "A 60 km/h levo 4 horas, a 80 km/h levo quanto?"
                      <br />
                      <strong>Lógica:</strong> Velocidade maior reduz o tempo de viagem.
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">🍽️ Consumo e Duração</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Situação:</strong> Mais pessoas = Menos dias
                      <br />
                      <strong>Exemplo:</strong> "Para 10 pessoas a comida dura 15 dias, para 15
                      pessoas dura quanto?"
                      <br />
                      <strong>Lógica:</strong> Mais consumidores esgotam o estoque mais rápido.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Recognition Guide */}
      <Card className="border-l-4 border-system-success bg-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔍 Guia de Identificação Rápida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-system-success">
                🤔 Perguntas para Identificar o Tipo
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      ✅ É Proporção Direta se:
                    </h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      <li>Aumentando A, B também aumenta</li>
                      <li>Diminuindo A, B também diminui</li>
                      <li>A relação é "quanto mais... mais"</li>
                      <li>A razão A/B é constante</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📊 Exemplos de Análise:
                    </h4>
                    <div className="space-y-1 text-sm text-text-secondary">
                      <p>
                        <strong>Preço × Quantidade:</strong> ✓ Direta
                      </p>
                      <p>
                        <strong>Distância × Combustível:</strong> ✓ Direta
                      </p>
                      <p>
                        <strong>Horas × Salário:</strong> ✓ Direta
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      ⚠️ É Proporção Inversa se:
                    </h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      <li>Aumentando A, B diminui</li>
                      <li>Diminuindo A, B aumenta</li>
                      <li>A relação é "quanto mais... menos"</li>
                      <li>O produto A × B é constante</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      📊 Exemplos de Análise:
                    </h4>
                    <div className="space-y-1 text-sm text-text-secondary">
                      <p>
                        <strong>Velocidade × Tempo:</strong> ⚠️ Inversa
                      </p>
                      <p>
                        <strong>Operários × Dias:</strong> ⚠️ Inversa
                      </p>
                      <p>
                        <strong>Torneiras × Tempo:</strong> ⚠️ Inversa
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <h4 className="mb-3 font-semibold text-system-info">
                💡 Dica Prática para Não Errar
              </h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>
                  <strong>1. Leia o problema e identifique as duas grandezas principais</strong>
                  (ex: velocidade e tempo, preço e quantidade)
                </p>
                <p>
                  <strong>2. Faça a pergunta:</strong> "Se eu aumentar a primeira grandeza, o que
                  acontece com a segunda?"
                </p>
                <p>
                  <strong>3. Se a resposta for:</strong>
                </p>
                <div className="ml-4 space-y-1">
                  <p>
                    • <strong className="text-primary-blue-dark">"Também aumenta"</strong> → Use
                    regra de três DIRETA
                  </p>
                  <p>
                    • <strong className="text-system-warning">"Diminui"</strong> → Use regra de três
                    INVERSA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes sobre Regra de Três"
        items={[
          {
            question: "Qual a diferença entre regra de três simples e composta?",
            answer:
              "<strong>Regra de três simples</strong> envolve apenas duas grandezas. <strong>Regra de três composta</strong> envolve três ou mais grandezas relacionadas. <br><br><strong>Simples:</strong> preço × quantidade (2 grandezas)<br><strong>Composta:</strong> operários × horas × dias (3+ grandezas)",
            borderColor: "system-info",
          },
          {
            question: "Como saber se é direta ou inversa?",
            answer:
              "Analise o <strong>comportamento das grandezas</strong>: se uma aumenta e a outra também aumenta, é <strong>direta</strong>. Se uma aumenta e a outra diminui, é <strong>inversa</strong>. <br><br><strong>Direta:</strong><br>• Mais produtos → Mais dinheiro<br>• Mais horas → Mais salário<br>• Mais km → Mais combustível<br><br><strong>Inversa:</strong><br>• Mais velocidade → Menos tempo<br>• Mais operários → Menos dias<br>• Mais pessoas → Menos duração",
            borderColor: "primary-blue",
          },
          {
            question: "Posso usar regra de três para qualquer problema de proporção?",
            answer:
              "Sim, mas <strong>desde que as grandezas sejam proporcionais</strong>. Nem todas as relações matemáticas são proporcionais - algumas são exponenciais, logarítmicas, etc. <br><br><strong>Funcionam bem:</strong> preços, consumo, trabalho, velocidade<br><strong>Cuidado com:</strong> juros compostos, crescimento populacional, fenômenos físicos complexos",
            borderColor: "system-success",
          },
          {
            question: "Como verificar se meu resultado está correto?",
            answer:
              "<strong>Substitua o valor encontrado</strong> na proporção original e verifique se os <strong>dois lados ficam iguais</strong>. <br><br><strong>Exemplo:</strong> Se encontrei x = 20 em '3:12::5:x'<br><strong>Verificação:</strong> 3/12 = 5/20?<br><strong>Cálculo:</strong> 0,25 = 0,25 ✓ Correto!",
            borderColor: "growth-green",
          },
          {
            question: "E se as unidades forem diferentes?",
            answer:
              "<strong>Sempre converta para as mesmas unidades</strong> antes de calcular. Em proporções diretas, unidades semelhantes ficam na mesma posição. <br><br><strong>Exemplo:</strong> '2 metros custam R$ 10, quantos centímetros custam R$ 5?'<br><strong>Converter:</strong> 2 metros = 200 centímetros<br><strong>Então:</strong> 200 cm : R$ 10 :: x cm : R$ 5",
            borderColor: "system-warning",
          },
          {
            question: "Qual a aplicação prática da regra de três?",
            answer:
              "A regra de três está presente no <strong>cotidiano</strong>: compras no supermercado, cálculo de combustível, receitas culinárias, conversões, orçamentos. <br><br><strong>Na cozinha:</strong> 'Para 4 pessoas uso 2 xícaras de arroz, para 6 pessoas uso quantas?'<br><strong>No trabalho:</strong> 'Se produzo 50 peças em 8 horas, quantas em 12 horas?'<br><strong>Em viagens:</strong> 'Gastei 40 litros em 500 km, quanto gastarei em 800 km?'",
            borderColor: "growth-green",
          },
          {
            question: "Como ensinar regra de três para crianças?",
            answer:
              "Use <strong>exemplos concretos</strong> do dia a dia delas: doces, brinquedos, tempo de brincadeira. <strong>Comece sempre com situações familiares</strong>. <br><br><strong>Exemplo didático:</strong> 'Se 2 sorvetes custam R$ 6, quanto custam 3 sorvetes?'<br><strong>Estratégia:</strong> Desenhe, use objetos concretos, faça eles 'sentirem' a proporção<br><strong>Verificação:</strong> 'Faz sentido? Mais sorvetes custam mais ou menos dinheiro?'",
            borderColor: "system-success",
          },
        ]}
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Regra de Três
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de regra de três</strong>{" "}
              é<strong className="text-system-success"> 100% gratuita</strong> e oferece resolução
              passo a passo para problemas de proporção direta e inversa, com verificação automática
              e exemplos educativos.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Detecção automática do tipo de proporção,
              resolução passo a passo detalhada, verificação de resultados, análise de unidades,
              exemplos práticos contextualizados, e guia educativo completo para estudantes e
              professores.
            </p>
            <p>
              <strong className="text-system-warning">Uso Educacional:</strong> Esta ferramenta é
              ideal para estudantes do ensino fundamental e médio, professores de matemática, e
              profissionais que trabalham com cálculos proporcionais no dia a dia.{" "}
              <strong>Sempre confira os resultados em situações críticas.</strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em fórmulas matemáticas padronizadas • 🎓 Ferramenta educacional
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
            name: "Calculadora de Regra de Três",
            description:
              "Calculadora online gratuita para resolver regra de três simples e inversa com explicações passo a passo. Ideal para estudantes e aplicações práticas.",
            url: "https://calculadorasonline.com.br/calculadoras/matematica/regra-de-tres",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Regra de três simples e inversa",
              "Resolução passo a passo",
              "Verificação automática",
              "Detecção do tipo de proporção",
              "Exemplos práticos",
              "100% gratuito",
            ],
            educationalLevel: ["Elementary", "MiddleSchool", "HighSchool"],
            learningResourceType: "Interactive Tool",
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

      <RelatedCalculators category="matematica" currentCalculatorId="regra-de-tres" />
    </div>
  );
}
