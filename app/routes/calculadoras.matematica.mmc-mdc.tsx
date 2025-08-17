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
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateMMCMDC,
  generateMMCMDCExamples,
  type MMCMDCParams,
  type MMCMDCResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora MMC e MDC 2025 - Fatores Primos Passo a Passo - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de MMC e MDC GRATUITA com decomposição em fatores primos! Calcule Mínimo Múltiplo Comum e Máximo Divisor Comum passo a passo com explicações detalhadas, verificações automáticas e aplicações práticas. Perfeita para estudantes e professores.",
    },
    {
      name: "keywords",
      content:
        "calculadora mmc mdc, minimo multiplo comum, maximo divisor comum, fatores primos, mmc online, mdc online, decomposição fatores primos, algoritmo euclidiano, numeros primos, mmc mdc passo a passo, matemática básica, divisibilidade, multiplos comum, divisores comum, mmc tres numeros, mdc tres numeros, coprimos, números primos entre si, ensino fundamental, matematica escolar, exercicios mmc mdc",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },

    // Open Graph tags
    { property: "og:title", content: `Calculadora MMC e MDC - Fatores Primos 2025 - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "★ Calcule MMC e MDC com decomposição em fatores primos passo a passo! Explicações detalhadas, verificações automáticas e aplicações práticas. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/matematica/mmc-mdc",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora MMC e MDC - Fatores Primos - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Aprenda e calcule MMC e MDC com explicações passo a passo! Decomposição em fatores primos e aplicações práticas.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function MMCMDCCalculator() {
  const [inputNumbers, setInputNumbers] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<MMCMDCResult | null>(null);
  const [showMMCSteps, setShowMMCSteps] = useState(true);
  const [showMDCSteps, setShowMDCSteps] = useState(true);
  const [selectedExample, setSelectedExample] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"both" | "mmc" | "mdc">("both");

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "mmc_mdc",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("mmc_mdc");

  const handleCalculate = () => {
    setError("");

    if (numbers.length < 2) {
      setError("Digite pelo menos dois números para calcular MMC e MDC");
      setResult(null);
      return;
    }

    if (numbers.some((n) => n <= 0 || !Number.isInteger(n))) {
      setError("Todos os números devem ser inteiros positivos");
      setResult(null);
      return;
    }

    try {
      const params: MMCMDCParams = {
        numbers,
      };

      const calculationResult = calculateMMCMDC(params);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no cálculo");
      setResult(null);
    }
  };

  const handleInputChange = (value: string) => {
    setInputNumbers(value);

    // Parse numbers from input
    const parsedNumbers = value
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));

    setNumbers(parsedNumbers);
  };

  const handleReset = () => {
    setInputNumbers("");
    setNumbers([]);
    setResult(null);
    setError("");
    setSelectedExample("");
  };

  const loadExample = (exampleType: string) => {
    const examples = generateMMCMDCExamples();
    const example = examples.find((ex) => ex.type === exampleType);

    if (example) {
      const numbersStr = example.numbers.join(", ");
      setInputNumbers(numbersStr);
      setNumbers([...example.numbers]);
      setSelectedExample(exampleType);
      setError("");
    }
  };

  const formatNumber = (value: number) => {
    return value.toString();
  };

  const addNumber = (num: number) => {
    const newNumbers = [...numbers, num];
    setNumbers(newNumbers);
    setInputNumbers(newNumbers.join(", "));
  };

  const removeNumber = (index: number) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
    setInputNumbers(newNumbers.join(", "));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>MMC e MDC</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de MMC e MDC</span>
          <span className="sm:hidden">MMC e MDC</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Calcule o <strong className="text-primary-blue-dark">Mínimo Múltiplo Comum (MMC)</strong>{" "}
          e<strong className="text-system-success"> Máximo Divisor Comum (MDC)</strong> com
          <strong className="text-growth-green">decomposição em fatores primos</strong> passo a
          passo.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            🔢 <strong>Fatores Primos</strong> • ➕ <strong>Múltiplos Números</strong> • ✅{" "}
            <strong>Verificação Automática</strong>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Calculator Inputs */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">🔢 Números para Calcular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <p className="mb-2 text-sm text-text-secondary">
                    <strong className="text-system-info">Como usar:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-xs text-text-secondary">
                    <li>Digite os números separados por vírgula, espaço ou ponto e vírgula</li>
                    <li>Exemplo: 12, 18, 24 ou 15 20 30</li>
                    <li>Mínimo de 2 números, máximo recomendado: 6 números</li>
                  </ul>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Números (separados por vírgula, espaço ou ponto e vírgula)
                  </label>
                  <Input
                    type="text"
                    value={inputNumbers}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Ex: 12, 18, 24"
                    fullWidth
                  />
                  <p className="mt-1 text-xs text-text-secondary">
                    {numbers.length > 0
                      ? `${numbers.length} número(s) detectado(s): ${numbers.join(", ")}`
                      : "Nenhum número válido detectado"}
                  </p>
                </div>

                {numbers.length > 0 && (
                  <div className="rounded-lg bg-background-dark-secondary p-4">
                    <p className="mb-2 text-sm font-semibold text-text-primary">
                      Números identificados:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {numbers.map((num, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 rounded-full bg-primary-blue px-3 py-1 text-sm text-white"
                        >
                          <span>{num}</span>
                          <button
                            onClick={() => removeNumber(index)}
                            className="font-bold text-white hover:text-red-200"
                            title="Remover número"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18, 20, 21, 24].map((num) => (
                    <Button
                      key={num}
                      onClick={() => addNumber(num)}
                      variant="outline"
                      className="h-8 px-2 py-1 text-xs"
                      disabled={numbers.includes(num)}
                    >
                      +{num}
                    </Button>
                  ))}
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
                    setSelectedExample("small_numbers");
                    loadExample("small_numbers");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-primary-blue-dark">🔢 Números Pequenos</div>
                    <div className="text-xs text-text-secondary">6, 8</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("three_numbers");
                    loadExample("three_numbers");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-growth-green">🎯 Três Números</div>
                    <div className="text-xs text-text-secondary">12, 18, 24</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("coprime");
                    loadExample("coprime");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-system-warning">🔄 Números Coprimos</div>
                    <div className="text-xs text-text-secondary">7, 11</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    setSelectedExample("multiples");
                    loadExample("multiples");
                  }}
                  variant="outline"
                  className="h-auto justify-start p-4 text-left"
                >
                  <div>
                    <div className="font-semibold text-system-info">🔗 Múltiplos</div>
                    <div className="text-xs text-text-secondary">8, 24</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button
              onClick={handleCalculate}
              className="px-6 sm:px-8"
              fullWidth
              disabled={numbers.length < 2}
            >
              Calcular
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
                  📊 Resultados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="mb-2 text-sm text-text-secondary">
                      Números: {result.numbers.join(", ")}
                    </p>
                  </div>

                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <div className="text-center">
                      <p className="mb-1 text-sm text-text-secondary">
                        MMC (Mínimo Múltiplo Comum)
                      </p>
                      <div className="text-2xl font-bold tabular-nums text-system-success">
                        {formatNumber(result.mmc)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <div className="text-center">
                      <p className="mb-1 text-sm text-text-secondary">MDC (Máximo Divisor Comum)</p>
                      <div className="text-2xl font-bold tabular-nums text-growth-green">
                        {formatNumber(result.mdc)}
                      </div>
                    </div>
                  </div>

                  {result.properties.coprimeNumbers && (
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
                      <p className="text-center text-xs font-semibold text-system-warning">
                        ⭐ Números são coprimos (primos entre si)
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-info bg-system-info/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-system-info">
                  🔍 Decomposição em Fatores Primos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {result.primeFactorizations.map((pf, index) => (
                    <div key={index} className="rounded bg-background-dark-secondary p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary-blue-dark">{pf.number}</span>
                        <span className="font-mono text-system-info">
                          {pf.representation}
                          {pf.isPrime && (
                            <span className="ml-2 text-xs text-system-warning">(primo)</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-neutral-surface-variant bg-background-dark-secondary duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-text-primary">
                  ✅ Verificação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="mb-1 font-semibold text-system-success">
                      MMC {result.verification.mmcValid ? "✓" : "✗"}
                    </p>
                    <p className="font-mono text-text-secondary">{result.verification.mmcCheck}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-growth-green">
                      MDC {result.verification.mdcValid ? "✓" : "✗"}
                    </p>
                    <p className="font-mono text-text-secondary">{result.verification.mdcCheck}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-background-dark-secondary p-1">
              <button
                onClick={() => setActiveTab("both")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "both"
                    ? "bg-primary-blue text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Ambos (MMC e MDC)
              </button>
              <button
                onClick={() => setActiveTab("mmc")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "mmc"
                    ? "bg-system-success text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Apenas MMC
              </button>
              <button
                onClick={() => setActiveTab("mdc")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "mdc"
                    ? "bg-growth-green text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Apenas MDC
              </button>
            </div>
          </div>

          {/* MMC Steps */}
          {(activeTab === "both" || activeTab === "mmc") && (
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="flex items-center justify-between">
                  📝 Cálculo do MMC - Passo a Passo
                  <Button
                    onClick={() => setShowMMCSteps(!showMMCSteps)}
                    variant="outline"
                    className="text-sm"
                  >
                    {showMMCSteps ? "Ocultar" : "Mostrar"} Passos
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showMMCSteps && (
                  <div className="space-y-4">
                    {result.mmcSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border-l-4 p-4 ${
                          step.step === 1
                            ? "border-primary-blue bg-primary-blue-light"
                            : step.step === 2
                              ? "border-system-info bg-system-info/10"
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
                                  : "bg-system-success"
                            }`}
                          >
                            {step.step}
                          </div>
                          <div className="flex-grow">
                            <h4 className="mb-2 font-semibold text-text-primary">{step.title}</h4>
                            <p className="mb-3 text-sm text-text-secondary">{step.description}</p>
                            <div className="rounded bg-background-dark-secondary p-3">
                              <p className="whitespace-pre-line text-sm font-semibold">
                                {step.calculation}
                              </p>
                            </div>
                            <div className="mt-2 rounded bg-system-success/10 p-2 text-center font-bold text-system-success">
                              {step.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">
                        💡 Interpretação do MMC
                      </h4>
                      <p className="text-sm text-text-secondary">{result.mmcInterpretation}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* MDC Steps */}
          {(activeTab === "both" || activeTab === "mdc") && (
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="flex items-center justify-between">
                  📝 Cálculo do MDC - Passo a Passo
                  <Button
                    onClick={() => setShowMDCSteps(!showMDCSteps)}
                    variant="outline"
                    className="text-sm"
                  >
                    {showMDCSteps ? "Ocultar" : "Mostrar"} Passos
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showMDCSteps && (
                  <div className="space-y-4">
                    {result.mdcSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border-l-4 p-4 ${
                          step.step === 1
                            ? "border-primary-blue bg-primary-blue-light"
                            : step.step === 2
                              ? "border-system-warning bg-system-warning/10"
                              : "border-growth-green bg-growth-green-soft"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                              step.step === 1
                                ? "bg-primary-blue"
                                : step.step === 2
                                  ? "bg-system-warning"
                                  : "bg-growth-green"
                            }`}
                          >
                            {step.step}
                          </div>
                          <div className="flex-grow">
                            <h4 className="mb-2 font-semibold text-text-primary">{step.title}</h4>
                            <p className="mb-3 text-sm text-text-secondary">{step.description}</p>
                            <div className="rounded bg-background-dark-secondary p-3">
                              <p className="whitespace-pre-line text-sm font-semibold">
                                {step.calculation}
                              </p>
                            </div>
                            <div className="mt-2 rounded bg-growth-green/10 p-2 text-center font-bold text-growth-green">
                              {step.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">
                        💡 Interpretação do MDC
                      </h4>
                      <p className="text-sm text-text-secondary">{result.mdcInterpretation}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Applications Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-xl text-system-success">
                  🎯 Aplicações do MMC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.applications.mmc.map((app, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-system-success/20 bg-system-success/10 p-4"
                    >
                      <h4 className="mb-2 font-bold text-system-success">{app.title}</h4>
                      <p className="mb-2 text-sm text-text-secondary">{app.description}</p>
                      <div className="rounded bg-background-dark-secondary p-2 text-xs">
                        <p className="font-semibold">Exemplo:</p>
                        <p>{app.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-xl text-growth-green">
                  🔧 Aplicações do MDC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.applications.mdc.map((app, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4"
                    >
                      <h4 className="mb-2 font-bold text-growth-green">{app.title}</h4>
                      <p className="mb-2 text-sm text-text-secondary">{app.description}</p>
                      <div className="rounded bg-background-dark-secondary p-2 text-xs">
                        <p className="font-semibold">Exemplo:</p>
                        <p>{app.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties */}
          {result.numbers.length === 2 && (
            <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-xl text-primary-blue-dark">
                  🔍 Propriedades Matemáticas (2 números)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-background-dark-secondary p-4">
                    <h4 className="mb-2 font-semibold text-text-primary">📊 Relação Fundamental</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>MMC × MDC =</strong> {result.properties.mmcTimesGcd}
                      </p>
                      <p>
                        <strong>a × b =</strong> {result.properties.productOfNumbers}
                      </p>
                      <p
                        className={`font-semibold ${result.properties.relationshipValid ? "text-system-success" : "text-system-error"}`}
                      >
                        {result.properties.relationshipValid ? "✓" : "✗"} MMC × MDC = a × b
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-background-dark-secondary p-4">
                    <h4 className="mb-2 font-semibold text-text-primary">🔄 Classificação</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Números são coprimos:</strong>{" "}
                        {result.properties.coprimeNumbers ? "Sim" : "Não"}
                      </p>
                      {result.properties.coprimeNumbers && (
                        <p className="text-system-warning">⭐ MDC = 1 (primos entre si)</p>
                      )}
                      {!result.properties.coprimeNumbers && (
                        <p className="text-system-info">🔗 Números têm fatores comuns</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Educational Content Sections */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📐 MMC e MDC: O Guia Completo para Múltiplos e Divisores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-system-success">MMC (Mínimo Múltiplo Comum)</strong> e o{" "}
                <strong className="text-growth-green">MDC (Máximo Divisor Comum)</strong> são
                conceitos fundamentais da matemática, especialmente importantes para
                <strong className="text-primary-blue-dark">
                  {" "}
                  operações com frações, resolução de problemas
                </strong>{" "}
                e aplicações práticas do dia a dia.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-success">
                  📈 MMC - Mínimo Múltiplo Comum
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-4">
                    <p className="mb-2 text-center font-semibold text-system-success">Definição:</p>
                    <p className="text-center">
                      O <strong>menor número positivo</strong> que é múltiplo de todos os números
                      dados
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-system-success">Aplicações:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Somar frações com denominadores diferentes</li>
                      <li>Sincronizar eventos periódicos</li>
                      <li>Coordenar processos de produção</li>
                      <li>Encontrar padrões de repetição</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">
                  📉 MDC - Máximo Divisor Comum
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-growth-green/20 bg-growth-green-soft p-4">
                    <p className="mb-2 text-center font-semibold text-growth-green">Definição:</p>
                    <p className="text-center">
                      O <strong>maior número positivo</strong> que divide todos os números dados
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-growth-green">Aplicações:</strong>
                    </p>
                    <ul className="ml-4 list-inside list-disc space-y-1 text-text-secondary">
                      <li>Simplificar frações ao máximo</li>
                      <li>Dividir quantidades em grupos iguais</li>
                      <li>Resolver problemas de ladrilhamento</li>
                      <li>Encontrar medidas comuns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methods Guide */}
      <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔬 Métodos de Cálculo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-primary-blue-dark">
                  🧮 Decomposição em Fatores Primos
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📝 Método Principal
                    </h4>
                    <p className="mb-3 text-sm text-text-secondary">
                      <strong>1.</strong> Decomponha cada número em fatores primos
                      <br />
                      <strong>2.</strong> Para MMC: tome o maior expoente de cada fator
                      <br />
                      <strong>3.</strong> Para MDC: tome o menor expoente dos fatores comuns
                    </p>
                    <div className="rounded bg-gray-900 p-2 text-xs">
                      <p className="text-gray-300">Exemplo: 12 = 2² × 3, 18 = 2 × 3²</p>
                      <p className="text-white">MMC = 2² × 3² = 36</p>
                      <p className="text-white">MDC = 2¹ × 3¹ = 6</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-system-warning">
                  🔄 Algoritmo de Euclides (MDC)
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">⚡ Método Rápido</h4>
                    <p className="mb-3 text-sm text-text-secondary">
                      Para calcular MDC de dois números rapidamente:
                      <br />
                      <strong>1.</strong> Divida o maior pelo menor
                      <br />
                      <strong>2.</strong> Substitua o maior pelo menor e o menor pelo resto
                      <br />
                      <strong>3.</strong> Repita até o resto ser zero
                    </p>
                    <div className="rounded bg-gray-900 p-2 text-xs">
                      <p className="text-gray-300">Exemplo: MDC(48, 18)</p>
                      <p className="text-white">48 ÷ 18 = 2 resto 12</p>
                      <p className="text-white">18 ÷ 12 = 1 resto 6</p>
                      <p className="text-white">12 ÷ 6 = 2 resto 0 → MDC = 6</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <h4 className="mb-3 font-semibold text-system-info">💡 Relação Fundamental</h4>
              <div className="grid grid-cols-1 gap-4 text-sm text-text-secondary md:grid-cols-2">
                <div>
                  <p className="mb-2">
                    <strong>Para dois números a e b:</strong>
                  </p>
                  <p className="rounded bg-gray-900 p-2 text-center font-mono text-white">
                    MMC(a,b) × MDC(a,b) = a × b
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Isso significa:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Se conhecemos MMC e um dos números, podemos calcular MDC</li>
                    <li>Se conhecemos MDC e um dos números, podemos calcular MMC</li>
                    <li>É uma forma de verificar nossos cálculos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de MMC e MDC"
        items={[
          {
            question:
              "Qual a diferença entre MMC (Mínimo Múltiplo Comum) e MDC (Máximo Divisor Comum)?",
            answer:
              "<strong>MMC:</strong> menor número que é múltiplo de todos os números dados. <strong>MDC:</strong> maior número que divide todos os números dados. Exemplo: MMC(6,8) = 24, MDC(6,8) = 2. São conceitos <strong>opostos mas complementares</strong>!",
            borderColor: "primary-blue",
          },
          {
            question: "Como usar MMC para somar frações com denominadores diferentes?",
            answer:
              "Encontre o <strong>MMC dos denominadores</strong> e converta todas as frações para esse denominador comum. Exemplo: 1/6 + 1/8 → MMC(6,8) = 24 → 4/24 + 3/24 = <strong>7/24</strong>. O MMC é essencial para operações com frações!",
            borderColor: "system-success",
          },
          {
            question: "Como usar MDC para simplificar frações?",
            answer:
              "Divida numerador e denominador pelo <strong>MDC de ambos</strong>. Exemplo: 18/24 → MDC(18,24) = 6 → 18÷6 = 3, 24÷6 = 4 → resultado: <strong>3/4</strong>. O MDC reduz frações ao menor termo possível!",
            borderColor: "growth-green",
          },
          {
            question: "O que são números coprimos e como identificá-los?",
            answer:
              "Números são <strong>coprimos quando MDC = 1</strong>, ou seja, não têm fatores comuns além de 1. Exemplos: 7 e 11, 8 e 15. <strong>Propriedade especial:</strong> se a e b são coprimos, então MMC(a,b) = a × b!",
            borderColor: "system-info",
          },
          {
            question: "Como calcular MMC e MDC de mais de dois números?",
            answer:
              "<strong>Método sucessivo:</strong> MMC(a,b,c) = MMC(MMC(a,b),c). <strong>Decomposição em primos:</strong> mais eficiente para muitos números. Exemplo: MMC(12,18,24) = MMC(36,24) = <strong>72</strong>. Use nossa calculadora para qualquer quantidade!",
            borderColor: "primary-blue",
          },
          {
            question: "Qual é mais fácil de calcular: MMC ou MDC?",
            answer:
              "<strong>MDC é geralmente mais rápido</strong> usando algoritmo de Euclides. Uma vez calculado o MDC, o MMC é fácil: MMC = (a × b) ÷ MDC. Para mais de 2 números, <strong>decomposição em primos</strong> é mais eficiente!",
            borderColor: "system-success",
          },
          {
            question: "Quais as aplicações práticas do MMC e MDC no dia a dia?",
            answer:
              "<strong>MMC:</strong> sincronizar horários, receitas culinárias, eventos periódicos. <strong>MDC:</strong> cortar materiais sem desperdício, organizar grupos iguais, dividir heranças. <strong>Ambos:</strong> arquitetura, música, programação e design!",
            borderColor: "growth-green",
          },
          {
            question: "Quando MMC e MDC de números são iguais?",
            answer:
              "<strong>Apenas quando todos os números são idênticos!</strong> Exemplo: MMC(5,5,5) = MDC(5,5,5) = 5. <strong>Regra geral:</strong> MMC ≥ maior número, MDC ≤ menor número. Para números diferentes, MMC > MDC sempre!",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para calcular rapidamente, use a <strong>relação fundamental</strong>: MMC(a,b) × MDC(a,b) = a × b. Calcule primeiro o MDC (mais rápido) e depois use a fórmula para encontrar o MMC!",
        }}
        footerText="<strong>Precisa de mais cálculos?</strong> Use nossa calculadora para MMC e MDC de qualquer quantidade de números, com decomposição em fatores primos inclusa!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de MMC e MDC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de MMC e MDC</strong> é
              <strong className="text-system-success"> 100% gratuita</strong> e oferece cálculo
              completo com decomposição em fatores primos, verificação automática e aplicações
              práticas detalhadas.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Suporte para múltiplos números, decomposição em
              fatores primos passo a passo, verificação automática de resultados, detecção de
              números coprimos, aplicações práticas contextualizadas, e propriedades matemáticas com
              exemplos educativos.
            </p>
            <p>
              <strong className="text-system-warning">Uso Educacional:</strong> Esta ferramenta é
              ideal para estudantes do ensino fundamental e médio, professores de matemática, e
              profissionais que trabalham com frações, divisibilidade e problemas de otimização.{" "}
              <strong>Sempre confira os resultados em situações críticas.</strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em algoritmos matemáticos padrão • 🎓 Ferramenta educacional
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
            name: "Calculadora de MMC e MDC",
            description:
              "Calculadora online gratuita para calcular Mínimo Múltiplo Comum e Máximo Divisor Comum com decomposição em fatores primos passo a passo. Ideal para estudantes e professores.",
            url: "https://calculadorasonline.com.br/calculadoras/matematica/mmc-mdc",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Cálculo de MMC (Mínimo Múltiplo Comum)",
              "Cálculo de MDC (Máximo Divisor Comum)",
              "Decomposição em fatores primos",
              "Resolução passo a passo",
              "Verificação automática",
              "Múltiplos números simultâneos",
              "Aplicações práticas",
              "100% gratuito",
            ],
            educationalLevel: ["Elementary", "MiddleSchool", "HighSchool"],
            learningResourceType: "Interactive Tool",
            about: [
              {
                "@type": "Thing",
                name: "Mínimo Múltiplo Comum",
                description: "Menor número positivo que é múltiplo de todos os números dados",
              },
              {
                "@type": "Thing",
                name: "Máximo Divisor Comum",
                description: "Maior número que divide todos os números dados",
              },
            ],
            teaches: [
              "MMC - Mínimo Múltiplo Comum",
              "MDC - Máximo Divisor Comum",
              "Decomposição em fatores primos",
              "Algoritmo de Euclides",
              "Números coprimos",
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

      <RelatedCalculators category="matematica" currentCalculatorId="mmc-mdc" />
    </div>
  );
}
