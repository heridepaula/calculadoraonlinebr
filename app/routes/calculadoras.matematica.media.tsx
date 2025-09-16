import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { Input } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Média Estatística 2025 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calcule média aritmética, geométrica e harmônica com análise completa. Identifique tendência central e desvio padrão com explicações passo a passo.",
    },
    {
      name: "keywords",
      content:
        "calculadora média, média aritmética, média geométrica, média harmônica, tendência central, desvio padrão, variância, estatística descritiva, análise dados, estatística básica, matemática estatística, medidas centralidade, cálculo média",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    { name: "bingbot", content: "index,follow" },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
    },
    {
      property: "og:title",
      content: "Calculadora de Média Estatística 2025 – 3 Tipos",
    },
    {
      property: "og:description",
      content:
        "Calcule média aritmética, geométrica e harmônica com análise completa. Identifique medidas de tendência central, desvio padrão e variância com explicações detalhadas.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-media-estatistica.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Média Estatística - Calcule média aritmética, geométrica e harmônica",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Média Estatística 2025 – 3 Tipos",
    },
    {
      name: "twitter:description",
      content:
        "Calcule média aritmética, geométrica e harmônica com análise completa. Medidas de tendência central com explicações passo a passo.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-media-estatistica.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Média Estatística - Tendência central",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#8E24AA" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Média Estatística - Tendência Central 2025",
        description:
          "Calculadora gratuita e confiável para calcular média aritmética, geométrica e harmônica. Análise completa de medidas de tendência central com desvio padrão, variância e explicações detalhadas.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: new Date().toISOString().split("T")[0],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 180,
            height: 180,
          },
          sameAs: [
            "https://twitter.com/CalculadoraBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
          name: "Calculadora de Média Estatística 2025 - Tendência Central",
          description:
            "Calcule média aritmética, geométrica e harmônica com análise completa. Identifique medidas de tendência central, desvio padrão e variância com explicações passo a passo.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.calculadoraonlinebr.com.br/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://www.calculadoraonlinebr.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Matemática",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Calculadora de Média Estatística",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Média Estatística",
          description:
            "Medidas de tendência central que representam o valor típico de um conjunto de dados",
          category: "Statistics",
        },
        featureList: [
          "Cálculo de média aritmética simples e ponderada",
          "Cálculo de média geométrica",
          "Cálculo de média harmônica",
          "Análise de desvio padrão e variância",
          "Tabela de análise estatística detalhada",
          "Visualização gráfica dos dados",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      }),
    },
  ];
};

type MediaType = "aritmetica" | "geometrica" | "harmonica";

interface MediaResult {
  values: number[];
  count: number;
  sum: number;
  arithmeticMean: number;
  geometricMean: number | null;
  harmonicMean: number | null;
  variance: number;
  standardDeviation: number;
  range: number;
  min: number;
  max: number;
  sortedValues: number[];
}

interface ValidationErrors {
  values?: string;
}

export default function MediaCalculator() {
  const [selectedType, setSelectedType] = useState<MediaType>("aritmetica");
  const [inputValues, setInputValues] = useState("");
  const [result, setResult] = useState<MediaResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "media",
    category: "matematica",
  });
  useFormTracking("media");

  const parseValues = (input: string): number[] => {
    const cleanInput = input.replace(/[^0-9.,;\\s-]/g, "");
    const values = cleanInput
      .split(/[,;\\s]+/)
      .map((val) => {
        const normalizedVal = val.trim().replace(",", ".");
        return parseFloat(normalizedVal);
      })
      .filter((val) => !isNaN(val));
    return values;
  };

  const calculateStatistics = (values: number[]): MediaResult => {
    const count = values.length;
    const sum = values.reduce((acc, val) => acc + val, 0);
    const sortedValues = [...values].sort((a, b) => a - b);

    // Média Aritmética
    const arithmeticMean = sum / count;

    // Média Geométrica (somente para valores positivos)
    let geometricMean: number | null = null;
    if (values.every((val) => val > 0)) {
      const product = values.reduce((acc, val) => acc * val, 1);
      geometricMean = Math.pow(product, 1 / count);
    }

    // Média Harmônica (somente para valores positivos)
    let harmonicMean: number | null = null;
    if (values.every((val) => val > 0)) {
      const reciprocalSum = values.reduce((acc, val) => acc + 1 / val, 0);
      harmonicMean = count / reciprocalSum;
    }

    // Variância e Desvio Padrão
    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - arithmeticMean, 2), 0) / count;
    const standardDeviation = Math.sqrt(variance);

    // Range, Min e Max
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    return {
      values,
      count,
      sum,
      arithmeticMean,
      geometricMean,
      harmonicMean,
      variance,
      standardDeviation,
      range,
      min,
      max,
      sortedValues,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    const values = parseValues(inputValues);

    if (!inputValues.trim()) {
      newErrors.values = "Digite os valores para calcular a média";
      setErrors(newErrors);
      return false;
    }

    if (values.length < 2) {
      newErrors.values = "Digite pelo menos 2 valores válidos";
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    startCalculation("calcular");
    try {
      const values = parseValues(inputValues);
      const mediaResult = calculateStatistics(values);
      setResult(mediaResult);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ values: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setInputValues("");
    setResult(null);
    setErrors({});
  };

  const formatNumber = (num: number | null, decimals = 4) => {
    if (num === null) return "N/A";
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Média Estatística</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Média Estatística 2025 – Tendência Central
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a{" "}
          <strong className="text-math-purple">média aritmética, geométrica e harmônica</strong> de
          qualquer conjunto de dados. Analise{" "}
          <strong className="text-primary-blue-dark">medidas de tendência central</strong> com
          desvio padrão, variância e estatísticas detalhadas.
        </p>
        <div className="bg-math-purple-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Análise Completa</strong> • 📊 <strong>3 Tipos de Média</strong> • ⚙️{" "}
            <strong>Estatísticas Avançadas</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Análise de Média</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Média centralizado */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setSelectedType("aritmetica")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  selectedType === "aritmetica"
                    ? "bg-math-purple text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-math-purple/10"
                }`}
              >
                Aritmética
              </button>
              <button
                type="button"
                onClick={() => setSelectedType("geometrica")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  selectedType === "geometrica"
                    ? "bg-math-purple text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-math-purple/10"
                }`}
              >
                Geométrica
              </button>
              <button
                type="button"
                onClick={() => setSelectedType("harmonica")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  selectedType === "harmonica"
                    ? "bg-math-purple text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-math-purple/10"
                }`}
              >
                Harmônica
              </button>
            </div>
          </div>

          {/* Input de Valores */}
          <div className="mb-6">
            <Input
              label="Conjunto de Dados (separe os valores por vírgula, espaço ou ponto e vírgula)"
              value={inputValues}
              onChange={(e) => setInputValues(e.target.value)}
              placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
              fullWidth
              className="h-12 text-lg"
            />
            <div className="mt-2 text-sm text-text-secondary">
              💡 <strong>Dica:</strong> Você pode usar vírgulas, espaços ou ponto e vírgula para
              separar os valores. Para médias geométrica e harmônica, use apenas números positivos.
            </div>
            <ErrorMessage error={errors.values} />
          </div>

          {/* Botões */}
          <div className="flex justify-center space-x-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <Card ref={resultRef as any} className="bg-math-purple-soft border-2 border-math-purple">
          <CardHeader>
            <CardTitle as="h3" className="text-math-purple">
              📊 Resultado da Análise Estatística
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-math-purple">
                  {formatNumber(result.arithmeticMean)}
                </div>
                <div className="text-sm text-text-secondary">Média Aritmética</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {formatNumber(result.geometricMean)}
                </div>
                <div className="text-sm text-text-secondary">Média Geométrica</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-growth-green">
                  {formatNumber(result.harmonicMean)}
                </div>
                <div className="text-sm text-text-secondary">Média Harmônica</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Desvio Padrão</div>
                <div className="text-xl font-bold text-text-primary">
                  {formatNumber(result.standardDeviation, 4)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Variância</div>
                <div className="text-xl font-bold text-text-primary">
                  {formatNumber(result.variance, 4)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Amplitude</div>
                <div className="text-xl font-bold text-text-primary">
                  {formatNumber(result.range, 4)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Quantidade</div>
                <div className="text-xl font-bold text-text-primary">{result.count} valores</div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo Técnico</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Soma dos valores: <strong>{formatNumber(result.sum, 2)}</strong>
                </li>
                <li>
                  Valor mínimo: <strong>{formatNumber(result.min, 4)}</strong>
                </li>
                <li>
                  Valor máximo: <strong>{formatNumber(result.max, 4)}</strong>
                </li>
                <li>
                  Dados ordenados:{" "}
                  <strong>
                    [
                    {result.sortedValues
                      .map((v) => (v % 1 === 0 ? v.toString() : formatNumber(v, 2)))
                      .join(", ")}
                    ]
                  </strong>
                </li>
                {result.geometricMean === null && (
                  <li className="text-system-warning">
                    ⚠️ Média geométrica não calculada: contém valores negativos ou zero
                  </li>
                )}
                {result.harmonicMean === null && (
                  <li className="text-system-warning">
                    ⚠️ Média harmônica não calculada: contém valores negativos ou zero
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Guia Educativo Completo */}
      <Card className="border-l-4 border-math-purple bg-gradient-to-r from-math-purple-light to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎓 Guia Completo: Tipos de Média e Aplicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Média Aritmética */}
            <div className="rounded-xl border border-math-purple/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-math-purple">
                ➕ Média Aritmética
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Conceito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A soma de todos os valores dividida pela quantidade total. É a média mais
                    intuitiva e amplamente utilizada.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <div className="mb-4 rounded bg-gray-800 p-3 font-mono text-sm text-text-secondary">
                    Média = (x₁ + x₂ + ... + xₙ) / n
                  </div>

                  <h4 className="mb-3 font-semibold text-growth-green">💡 Exemplo Prático</h4>
                  <p className="text-xs text-text-secondary">
                    Notas: [7, 8, 6, 9, 5] → Média = 35 ÷ 5 = 7,0
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Cálculo de notas escolares</li>
                    <li>• Temperaturas médias</li>
                    <li>• Salários médios</li>
                    <li>• Análises gerais de dados</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Sensível a valores extremos (outliers)</li>
                    <li>• Pode não representar bem dados assimétricos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Média Geométrica */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue">
                ✖️ Média Geométrica
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-math-purple">🔍 Conceito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Raiz n-ésima do produto de todos os valores. Ideal para calcular taxas médias de
                    crescimento e retornos compostos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <div className="mb-4 rounded bg-gray-800 p-3 font-mono text-sm text-text-secondary">
                    Média = ⁿ√(x₁ × x₂ × ... × xₙ)
                  </div>

                  <h4 className="mb-3 font-semibold text-growth-green">💡 Exemplo Prático</h4>
                  <p className="text-xs text-text-secondary">
                    Crescimentos: [1.1, 1.2, 1.05] → Média = ³√1.386 ≈ 1.115 (11,5% ao período)
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Retornos de investimentos</li>
                    <li>• Taxas de crescimento populacional</li>
                    <li>• Progressões geométricas</li>
                    <li>• Índices econômicos compostos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Restrições</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Apenas valores positivos</li>
                    <li>• Sensível a valores próximos de zero</li>
                    <li>• Matemática mais complexa</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Média Harmônica */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🎵 Média Harmônica
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Conceito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Recíproco da média aritmética dos recíprocos. Especializada em médias de taxas,
                    velocidades e eficiências.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <div className="mb-4 rounded bg-gray-800 p-3 font-mono text-sm text-text-secondary">
                    Média = n / (1/x₁ + 1/x₂ + ... + 1/xₙ)
                  </div>

                  <h4 className="mb-3 font-semibold text-growth-green">💡 Exemplo Prático</h4>
                  <p className="text-xs text-text-secondary">
                    Velocidades: [60, 40, 80] km/h → Média harmônica ≈ 53,33 km/h
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Velocidade média em trajetos</li>
                    <li>• Resistências elétricas em paralelo</li>
                    <li>• Produtividade por unidade de tempo</li>
                    <li>• Eficiência de processos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Características</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Apenas valores positivos</li>
                    <li>• Mais sensível a valores pequenos</li>
                    <li>• Sempre menor que as outras médias</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Comparação Prática */}
          <div className="mt-8 rounded-xl border border-system-info/20 bg-gray-900 p-6">
            <h3 className="mb-4 text-xl font-bold text-system-info">🔬 Exemplo Comparativo</h3>
            <p className="mb-4 text-sm text-text-secondary">
              Para o conjunto [2, 8, 32], vamos calcular os três tipos de média:
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-math-purple/10 p-4">
                <h4 className="font-bold text-math-purple">Aritmética</h4>
                <p className="text-sm">(2+8+32) ÷ 3 = 14,0</p>
                <span className="text-xs text-text-secondary">
                  Mais alta - influenciada pelo 32
                </span>
              </div>
              <div className="rounded-lg bg-primary-blue/10 p-4">
                <h4 className="font-bold text-primary-blue">Geométrica</h4>
                <p className="text-sm">³√(2×8×32) = 8,0</p>
                <span className="text-xs text-text-secondary">
                  Intermediária - crescimento equilibrado
                </span>
              </div>
              <div className="rounded-lg bg-growth-green/10 p-4">
                <h4 className="font-bold text-growth-green">Harmônica</h4>
                <p className="text-sm">3÷(1/2+1/8+1/32) ≈ 4,6</p>
                <span className="text-xs text-text-secondary">
                  Mais baixa - penaliza valores grandes
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Detalhes dos Tipos de Média - Guia Completo */}
      <Card className="from-math-purple-soft border-l-4 border-math-purple bg-gradient-to-r to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📖 Tipos de Média – Guia Completo Estatístico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Média Aritmética Detalhada */}
            <div className="rounded-xl border border-math-purple/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-math-purple">
                🧮 Média Aritmética - Conceitos Fundamentais
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição Matemática</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A média aritmética representa o valor central que equilibra todos os dados. É
                    calculada somando todos os valores e dividindo pela quantidade de elementos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">
                    📊 Propriedades Estatísticas
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Minimiza a soma dos desvios quadráticos</li>
                    <li>• Sensível a valores extremos (outliers)</li>
                    <li>• Ponto de equilíbrio dos dados</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Quando Usar</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Dados distribuídos normalmente</li>
                    <li>• Análise de tendência central</li>
                    <li>• Cálculos de orçamentos e médias gerais</li>
                    <li>• Quando todos os valores têm mesma importância</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Cuidados</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Pode ser distorcida por valores extremos</li>
                    <li>• Não apropriada para dados com distribuição assimétrica</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Média Geométrica Detalhada */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📈 Média Geométrica - Crescimento e Proporções
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição Matemática</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Calcula a raiz n-ésima do produto de n valores positivos. Ideal para dados que
                    representam taxas de crescimento ou razões proporcionais.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">
                    📊 Propriedades Estatísticas
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Menos sensível a valores extremos</li>
                    <li>• Preserva razões entre dados</li>
                    <li>• Sempre menor ou igual à média aritmética</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Quando Usar</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Taxas de crescimento e retornos financeiros</li>
                    <li>• Índices e indicadores proporcionais</li>
                    <li>• Dados com variação percentual</li>
                    <li>• Quando a multiplicação dos valores é relevante</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Cuidados</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Apenas valores positivos</li>
                    <li>• Um valor zero anula todo o resultado</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Média Harmônica Detalhada */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                ⚡ Média Harmônica - Taxas e Velocidades
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    🔍 Definição Matemática
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Inverso da média aritmética dos inversos dos valores. Especializada em situações
                    onde a relação entre variáveis é inversamente proporcional.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">
                    📊 Propriedades Estatísticas
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Penaliza fortemente valores pequenos</li>
                    <li>• Sempre menor que as outras médias</li>
                    <li>• Ideal para taxas por unidade de tempo</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Quando Usar</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Velocidade média em trajetos variados</li>
                    <li>• Eficiência de máquinas e processos</li>
                    <li>• Resistências elétricas em paralelo</li>
                    <li>• Produtividade por unidade de tempo</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Cuidados</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Apenas valores positivos</li>
                    <li>• Muito sensível a valores próximos de zero</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Tipos de Média */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Qual Média Escolher?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-math-purple">Aritmética</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Geométrica
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Harmônica</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Sensibilidade a outliers</td>
                  <td className="p-3 text-center text-system-warning">Alta</td>
                  <td className="p-3 text-center text-system-info">Média</td>
                  <td className="p-3 text-center text-system-success">Baixa</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Facilidade de cálculo</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Valor relativo</td>
                  <td className="p-3 text-center text-math-purple">Maior</td>
                  <td className="p-3 text-center text-primary-blue-dark">Intermediária</td>
                  <td className="p-3 text-center text-growth-green">Menor</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Aplicação principal</td>
                  <td className="p-3 text-center">Tendência central geral</td>
                  <td className="p-3 text-center">Crescimento e proporções</td>
                  <td className="p-3 text-center">Taxas e velocidades</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Tipo de dados ideal</td>
                  <td className="p-3 text-center">Normalmente distribuídos</td>
                  <td className="p-3 text-center">Taxas de crescimento</td>
                  <td className="p-3 text-center">Relações inversas</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Interpretação</td>
                  <td className="p-3 text-center text-math-purple">Soma ÷ quantidade</td>
                  <td className="p-3 text-center text-primary-blue-dark">Raiz n do produto</td>
                  <td className="p-3 text-center text-growth-green">n ÷ soma dos inversos</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-math-purple-soft rounded-lg border border-math-purple/20 p-4">
              <h4 className="mb-2 font-bold text-math-purple">🎯 Uso Geral</h4>
              <p className="text-sm text-text-secondary">
                Use a <strong>Média Aritmética</strong> para análises gerais e dados com
                distribuição normal.
              </p>
            </div>

            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">📈 Crescimento</h4>
              <p className="text-sm text-text-secondary">
                Use a <strong>Média Geométrica</strong> para taxas de crescimento e análises
                proporcionais.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">⚡ Eficiência</h4>
              <p className="text-sm text-text-secondary">
                Use a <strong>Média Harmônica</strong> para velocidades, taxas e relações inversas.
              </p>
            </div>
          </div>

          {/* Guia de Aplicação Prática */}
          <div className="mt-6 rounded-lg bg-gradient-to-r from-system-info/10 to-math-purple/10 p-4">
            <h4 className="mb-3 font-bold text-system-info">💡 Guia Prático de Escolha</h4>
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <p className="font-semibold">📊 Para notas e avaliações:</p>
                <p className="text-text-secondary">Média aritmética (pesos iguais)</p>
              </div>
              <div>
                <p className="font-semibold">💰 Para investimentos e juros:</p>
                <p className="text-text-secondary">Média geométrica (retorno composto)</p>
              </div>
              <div>
                <p className="font-semibold">🚗 Para velocidades médias:</p>
                <p className="text-text-secondary">Média harmônica (tempo constante)</p>
              </div>
              <div>
                <p className="font-semibold">🏭 Para produtividade:</p>
                <p className="text-text-secondary">Média harmônica (unidades por tempo)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Média Estatística"
        items={[
          {
            question: "Qual a diferença entre os tipos de média?",
            answer:
              "Média aritmética é a soma dividida pela quantidade. Média geométrica é ideal para taxas de crescimento. Média harmônica é usada para taxas e velocidades. Cada uma tem aplicações específicas.",
            borderColor: "math-purple",
          },
          {
            question: "Por que média geométrica e harmônica não calculam com números negativos?",
            answer:
              "A média geométrica envolve raízes de números, e a harmônica divide por valores. Números negativos ou zero tornam esses cálculos matematicamente indefinidos ou complexos.",
            borderColor: "primary-blue",
          },
          {
            question: "Quando devo usar cada tipo de média?",
            answer:
              "Use aritmética para dados gerais, geométrica para taxas de crescimento e retornos de investimento, e harmônica para velocidades médias e taxas de produtividade.",
            borderColor: "growth-green",
          },
          {
            question: "O que são desvio padrão e variância?",
            answer:
              "Variância mede o quão espalhados os dados estão da média. Desvio padrão é a raiz quadrada da variância e tem a mesma unidade dos dados originais, sendo mais fácil de interpretar.",
            borderColor: "system-info",
          },
          {
            question: "Como interpretar o resultado das médias?",
            answer:
              "Compare os três valores: se forem similares, os dados são homogêneos. Se muito diferentes, há variabilidade significativa. A média aritmética é sempre a maior, harmônica a menor.",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "Dica Estatística Importante",
          content:
            "<strong>Para análise completa:</strong> Sempre observe as três médias juntas. A diferença entre elas indica a variabilidade e assimetria dos seus dados.",
        }}
        footerText="<strong>Lembre-se:</strong> Escolha o tipo de média adequado ao seu contexto. Média aritmética para casos gerais, geométrica para crescimento, harmônica para taxas."
      />

      {/* Footer Informativo */}
      <Card className="border-l-4 border-math-purple bg-math-purple-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Média
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-math-purple">calculadora de média estatística</strong>{" "}
              implementa{" "}
              <strong className="text-primary-blue-dark">
                algoritmos matematicamente confiávels
              </strong>{" "}
              para calcular os três principais tipos de média com análise estatística completa.
            </p>
            <p>
              <strong>Recursos avançados:</strong> Cálculo simultâneo de média aritmética
              (universal), geométrica (crescimento) e harmônica (taxas), incluindo desvio padrão,
              variância e estatísticas descritivas complementares.
            </p>
            <p>
              <strong className="text-system-warning">Nota técnica:</strong> Esta ferramenta é
              desenvolvida para fins educacionais, acadêmicos e profissionais. Para pesquisas
              científicas, recomenda-se validação com{" "}
              <strong>software estatístico especializado</strong> como R, Python ou SPSS.
            </p>
            <p className="mt-4 border-t border-math-purple/20 pt-3 text-xs opacity-75">
              📊 Três tipos de média simultâneos • 📈 Estatísticas descritivas completas • 📱
              Interface responsiva • 🌙 Tema escuro otimizado • 🎯 Cálculos matemáticos • 🔢 Suporte
              a decimais
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="media" />
    </div>
  );
}
