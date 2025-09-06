import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
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
      title: "Desvio Padrão 2025 – Calculadora Estatística",
    },
    {
      name: "description",
      content:
        "Calcule desvio padrão e variância grátis. Medidas de dispersão estatística com explicações passo a passo e fórmulas detalhadas.",
    },
    {
      name: "keywords",
      content:
        "calculadora desvio padrão, variância populacional amostral, dispersão estatística, sigma, correção Bessel, distribuição normal, medidas variabilidade, estatística descritiva, análise dados, N-1, regra empírica 68-95-99.7",
    },
    { name: "author", content: "Calculadora Online BR" },
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
    },
    {
      property: "og:title",
      content: "Calculadora Desvio Padrão 2025 – Variância Estatística",
    },
    {
      property: "og:description",
      content:
        "Calculadora gratuita de desvio padrão e variância. Calcule medidas de dispersão estatística com explicações passo a passo e análise completa dos dados.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-desvio-padrao.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Desvio Padrão - Calcule dispersão estatística com explicações detalhadas",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Desvio Padrão 2025 – Variância Estatística",
    },
    {
      name: "twitter:description",
      content:
        "Calculadora gratuita de desvio padrão e variância com explicações passo a passo e análise estatística completa.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-desvio-padrao.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Desvio Padrão - Medidas de dispersão estatística",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Desvio Padrão - Estatística Descritiva 2025",
        description:
          "Calculadora gratuita e confiável de desvio padrão e variância. Analise medidas de dispersão estatística com explicações detalhadas, fórmulas e interpretação dos resultados.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
          name: "Calculadora de Desvio Padrão 2025 - Estatística e Variabilidade",
          description:
            "Calculadora gratuita de desvio padrão e variância. Calcule medidas de dispersão estatística com explicações passo a passo e análise completa dos dados.",
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
                name: "Desvio Padrão",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/desvio-padrao",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Desvio Padrão e Variância",
          description: "Medidas de dispersão estatística que indicam o grau de variabilidade dos dados em relação à média",
          category: "Statistics",
        },
        featureList: [
          "Cálculo de desvio padrão populacional e amostral",
          "Cálculo de variância populacional e amostral",
          "Análise estatística descritiva completa",
          "Explicações passo a passo dos cálculos",
          "Interpretação dos resultados",
          "Fórmulas matemáticas detalhadas",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      }),
    },
    // FAQ Schema adicional para melhor SEO
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é desvio padrão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O desvio padrão é uma medida estatística que quantifica o grau de dispersão ou variabilidade dos dados em relação à média. Quanto maior o desvio padrão, mais espalhados estão os dados.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre desvio padrão populacional e amostral?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O desvio padrão populacional (divisor N) é usado quando temos dados de toda a população. O amostral (divisor N-1) usa a correção de Bessel para estimar melhor o parâmetro populacional a partir de uma amostra.",
            },
          },
          {
            "@type": "Question",
            name: "Como interpretar os valores do desvio padrão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Um desvio padrão baixo indica que os dados estão concentrados próximos à média. Um desvio padrão alto indica que os dados estão mais dispersos. Use a regra 68-95-99.7 para interpretação.",
            },
          },
        ],
      }),
    },
  ];
};

type CalculationType = "populacional" | "amostral";

interface StandardDeviationResult {
  values: number[];
  count: number;
  mean: number;
  variance: number;
  standardDeviation: number;
  populationVariance: number;
  populationStandardDeviation: number;
  sampleVariance: number;
  sampleStandardDeviation: number;
  sortedValues: number[];
  min: number;
  max: number;
  range: number;
  sumOfSquaredDeviations: number;
}

interface ValidationErrors {
  values?: string;
}

export default function StandardDeviationCalculator() {
  const [inputValues, setInputValues] = useState("");
  const [calculationType, setCalculationType] = useState<CalculationType>("populacional");
  const [result, setResult] = useState<StandardDeviationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "desvio-padrao",
    category: "matematica",
  });
  useFormTracking("desvio-padrao");

  const formatNumber = (v: number, digits = 4) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

  const parseValues = (input: string): number[] => {
    const cleanInput = input.replace(/[^0-9.,;\s-]/g, "");
    const values = cleanInput
      .split(/[,;\s]+/)
      .map((val) => {
        const normalizedVal = val.trim().replace(",", ".");
        return parseFloat(normalizedVal);
      })
      .filter((val) => !isNaN(val));
    return values;
  };

  const calculateStatistics = (values: number[]): StandardDeviationResult => {
    const count = values.length;
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;
    const sortedValues = [...values].sort((a, b) => a - b);
    
    // Soma dos desvios quadráticos
    const sumOfSquaredDeviations = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    
    // Variância populacional (divisão por N)
    const populationVariance = sumOfSquaredDeviations / count;
    const populationStandardDeviation = Math.sqrt(populationVariance);
    
    // Variância amostral (divisão por N-1)
    const sampleVariance = count > 1 ? sumOfSquaredDeviations / (count - 1) : 0;
    const sampleStandardDeviation = Math.sqrt(sampleVariance);
    
    // Valores padrão baseados no tipo selecionado
    const variance = calculationType === "populacional" ? populationVariance : sampleVariance;
    const standardDeviation = calculationType === "populacional" ? populationStandardDeviation : sampleStandardDeviation;
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    
    return {
      values,
      count,
      mean,
      variance,
      standardDeviation,
      populationVariance,
      populationStandardDeviation,
      sampleVariance,
      sampleStandardDeviation,
      sortedValues,
      min,
      max,
      range,
      sumOfSquaredDeviations,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    const values = parseValues(inputValues);
    
    if (!inputValues.trim()) {
      newErrors.values = "Digite os valores para calcular o desvio padrão";
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
      const standardDeviationResult = calculateStatistics(values);
      setResult(standardDeviationResult);
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
    setCalculationType("populacional");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Desvio Padrão</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Desvio Padrão e Variância 2025
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule o <strong className="text-math-purple">desvio padrão e variância</strong> de qualquer conjunto de dados.
          Analise <strong className="text-primary-blue-dark">medidas de dispersão</strong> com explicações detalhadas
          e interpretação dos resultados.
        </p>
        <div className="inline-block rounded-lg bg-math-purple-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔎 <strong>Análise Completa</strong> • 📊 <strong>Estatística Descritiva</strong> • ⚙️{" "}
            <strong>Interpretação Detalhada</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🧮 Calculadora de Desvio Padrão</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Cálculo centralizado */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setCalculationType("populacional")}
                className={`min-w-[140px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  calculationType === "populacional"
                    ? "bg-math-purple text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-math-purple/10"
                }`}
              >
                Populacional
              </button>
              <button
                type="button"
                onClick={() => setCalculationType("amostral")}
                className={`min-w-[140px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  calculationType === "amostral"
                    ? "bg-math-purple text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-math-purple/10"
                }`}
              >
                Amostral
              </button>
            </div>
          </div>

          {/* Campo de Entrada de Dados */}
          <div className="mb-6">
            <Input
              label="Conjunto de Dados (separe os valores por vírgula, espaço ou ponto e vírgula)"
              value={inputValues}
              onChange={(e) => setInputValues(e.target.value)}
              placeholder="10, 12, 14, 16, 18, 20, 22"
              fullWidth
              className="h-12 text-lg"
            />
            <div className="mt-2 text-sm text-text-secondary">
              💡 <strong>Dica:</strong> Você pode usar vírgulas, espaços ou ponto e vírgula para
              separar os valores. {calculationType === "populacional" ? "População completa (N)" : "Amostra (N-1)"}
            </div>
            <ErrorMessage error={errors.values} />
          </div>

          {/* Botões */}
          <div className="margin-top-4 flex justify-center space-x-4">
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
        <Card ref={resultRef as any} className="border-2 border-math-purple bg-math-purple-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-math-purple">
              📊 Resultado da Análise Estatística
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-math-purple">
                  {formatNumber(result.standardDeviation)}
                </div>
                <div className="text-sm text-text-secondary">Desvio Padrão</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {formatNumber(result.variance)}
                </div>
                <div className="text-sm text-text-secondary">Variância</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-growth-green">
                  {formatNumber(result.mean)}
                </div>
                <div className="text-sm text-text-secondary">Média</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Total de Valores</div>
                <div className="text-xl font-bold text-text-primary">
                  {result.count}
                </div>
                <div className="text-sm text-text-secondary">elementos</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Amplitude</div>
                <div className="text-xl font-bold text-text-primary">
                  {formatNumber(result.range, 2)}
                </div>
                <div className="text-sm text-text-secondary">
                  Máx: {formatNumber(result.max, 2)} | Mín: {formatNumber(result.min, 2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Tipo de Cálculo</div>
                <div className="text-xl font-bold text-text-primary">
                  {calculationType === "populacional" ? "N" : "N-1"}
                </div>
                <div className="text-sm text-text-secondary">
                  {calculationType === "populacional" ? "População" : "Amostra"}
                </div>
              </div>
            </div>

            {/* Comparação Populacional vs Amostral */}
            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-3 font-semibold text-primary-blue-dark">Comparação: Populacional vs Amostral</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded bg-gray-800 p-3">
                  <h5 className="font-semibold text-math-purple">Populacional (N = {result.count})</h5>
                  <p className="text-sm text-text-secondary">
                    Variância: <strong>{formatNumber(result.populationVariance)}</strong>
                  </p>
                  <p className="text-sm text-text-secondary">
                    Desvio Padrão: <strong>{formatNumber(result.populationStandardDeviation)}</strong>
                  </p>
                </div>
                <div className="rounded bg-gray-800 p-3">
                  <h5 className="font-semibold text-growth-green">Amostral (N-1 = {result.count - 1})</h5>
                  <p className="text-sm text-text-secondary">
                    Variância: <strong>{formatNumber(result.sampleVariance)}</strong>
                  </p>
                  <p className="text-sm text-text-secondary">
                    Desvio Padrão: <strong>{formatNumber(result.sampleStandardDeviation)}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-math-purple-light p-4">
              <h4 className="mb-2 font-semibold text-math-purple">Resumo Estatístico</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Dados ordenados: <strong>[{result.sortedValues.map(v => v % 1 === 0 ? v.toString() : formatNumber(v, 2)).join(", ")}]</strong>
                </li>
                <li>
                  Soma dos desvios quadráticos: <strong>{formatNumber(result.sumOfSquaredDeviations)}</strong>
                </li>
                <li>
                  Média aritmética: <strong>{formatNumber(result.mean)}</strong>
                </li>
                <li>
                  Valor mínimo: <strong>{formatNumber(result.min)}</strong>
                </li>
                <li>
                  Valor máximo: <strong>{formatNumber(result.max)}</strong>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Detalhes do Desvio Padrão - Guia Completo */}
      <Card className="border-l-4 border-math-purple bg-gradient-to-r from-math-purple-soft to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📊 Desvio Padrão – Guia Completo Estatístico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Desvio Padrão Populacional */}
            <div className="rounded-xl border border-math-purple/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-math-purple">
                🖥️ Desvio Padrão Populacional (σ)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Medida de dispersão que quantifica o quanto os dados se afastam da média.
                    Usa todos os elementos da população (divisor N).
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📋 Fórmula</h4>
                  <div className="mb-4 rounded bg-gray-800 p-3 font-mono text-sm text-text-secondary">
                    σ = √(∑(xi - µ)² / N)
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Quando Usar</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Quando você tem dados de toda a população</li>
                    <li>• Censos demográficos completos</li>
                    <li>• Dados históricos completos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💡 Exemplo</h4>
                  <div className="rounded bg-gray-800 p-3 text-xs font-mono text-growth-green">
                    Idades de todos os 5 funcionários:<br/>
                    [25, 30, 35, 40, 45] → σ = 7,07
                  </div>
                </div>
              </div>
            </div>

            {/* Desvio Padrão Amostral */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🎯 Desvio Padrão Amostral (s)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Estimativa da variabilidade populacional baseada em uma amostra.
                    Usa correção de Bessel (divisor N-1) para reduzir o viés.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📋 Fórmula</h4>
                  <div className="mb-4 rounded bg-gray-800 p-3 font-mono text-sm text-text-secondary">
                    s = √(∑(xi - x̄)² / (N-1))
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Quando Usar</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Quando você tem apenas uma amostra</li>
                    <li>• Pesquisas de opinião</li>
                    <li>• Estudos científicos experimentais</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💡 Exemplo</h4>
                  <div className="rounded bg-gray-800 p-3 text-xs font-mono text-growth-green">
                    Amostra de 5 funcionários:<br/>
                    [25, 30, 35, 40, 45] → s = 7,91
                  </div>
                </div>
              </div>
            </div>

            {/* Variância */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📏 Variância (σ² ou s²)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Quadrado do desvio padrão. Representa a média dos quadrados dos desvios
                    em relação à média. Unidade em quadrados da variável original.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Propriedades</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Sempre positiva ou zero</li>
                    <li>• Sensível a valores extremos</li>
                    <li>• Unidade em quadrados</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Cálculos de portfólio de investimentos</li>
                    <li>• Controle de qualidade industrial</li>
                    <li>• Análise de risco estatístico</li>
                    <li>• Modelos de regressão</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Interpretação</h4>
                  <p className="text-xs text-text-secondary">
                    Desvio padrão é mais fácil de interpretar por ter a mesma unidade dos dados originais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação Populacional vs Amostral */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Populacional vs Amostral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-math-purple">
                    Populacional (σ)
                  </th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">Amostral (s)</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Divisor na fórmula</td>
                  <td className="p-3 text-center text-math-purple">N (tamanho total)</td>
                  <td className="p-3 text-center text-primary-blue-dark">N-1 (correção de Bessel)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Tipo de dados</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Objetivo</td>
                  <td className="p-3 text-center text-math-purple">Descrever a população completa</td>
                  <td className="p-3 text-center text-primary-blue-dark">Estimar parâmetros populacionais</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Resultado</td>
                  <td className="p-3 text-center">Valor exato (parâmetro)</td>
                  <td className="p-3 text-center">Estimativa (estatística)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Quando usar</td>
                  <td className="p-3 text-center">Censo, dados históricos</td>
                  <td className="p-3 text-center">Pesquisas, experimentos</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Valor relativo</td>
                  <td className="p-3 text-center text-math-purple">Menor (divisor maior)</td>
                  <td className="p-3 text-center text-primary-blue-dark">Maior (divisor menor)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-math-purple/20 bg-math-purple-soft p-4">
              <h4 className="mb-2 font-bold text-math-purple">🖥️ Populacional</h4>
              <p className="text-sm text-text-secondary">
                Use quando tiver <strong>dados completos da população</strong>. Ideal para
                censos e registros históricos completos.
              </p>
            </div>

            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Amostral</h4>
              <p className="text-sm text-text-secondary">
                Use quando tiver <strong>apenas uma amostra</strong>. A correção (N-1) fornece
                estimativas mais confiávels.
              </p>
            </div>
          </div>

          {/* Guia de Interpretação */}
          <div className="mt-6 rounded-lg bg-gradient-to-r from-system-info/10 to-math-purple/10 p-4">
            <h4 className="mb-3 font-bold text-system-info">💡 Como Interpretar os Valores</h4>
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <p className="font-semibold">📊 Desvio padrão baixo:</p>
                <p className="text-text-secondary">Dados concentrados próximos à média (pouca variação)</p>
              </div>
              <div>
                <p className="font-semibold">📊 Desvio padrão alto:</p>
                <p className="text-text-secondary">Dados dispersos, afastados da média (muita variação)</p>
              </div>
              <div>
                <p className="font-semibold">🔮 Regra empírica (68-95-99,7):</p>
                <p className="text-text-secondary">~68% dos dados estão dentro de 1 desvio padrão da média</p>
              </div>
              <div>
                <p className="font-semibold">🎯 Aplicação prática:</p>
                <p className="text-text-secondary">Controle de qualidade, análise de risco, pesquisas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Desvio Padrão"
        items={[
          {
            question: "O que é desvio padrão?",
            answer:
              "O desvio padrão é uma medida estatística que quantifica o grau de dispersão ou variabilidade dos dados em relação à média. Quanto maior o desvio padrão, mais espalhados estão os dados.",
            borderColor: "math-purple",
          },
          {
            question: "Qual a diferença entre populacional e amostral?",
            answer:
              "O desvio padrão populacional (divisor N) é usado quando temos dados de toda a população. O amostral (divisor N-1) usa a correção de Bessel para estimar melhor o parâmetro populacional a partir de uma amostra.",
            borderColor: "primary-blue",
          },
          {
            question: "O que é variância?",
            answer:
              "A variância é o quadrado do desvio padrão. Representa a média dos quadrados dos desvios. O desvio padrão é mais fácil de interpretar por ter a mesma unidade dos dados originais.",
            borderColor: "growth-green",
          },
          {
            question: "Como interpretar os valores do desvio padrão?",
            answer:
              "Um desvio padrão baixo indica que os dados estão concentrados próximos à média. Um desvio padrão alto indica que os dados estão mais dispersos. Use a regra 68-95-99.7 para interpretação em distribuições normais.",
            borderColor: "system-info",
          },
          {
            question: "Quando usar cada tipo de cálculo?",
            answer:
              "Use populacional quando tiver dados completos da população (censo, registros completos). Use amostral quando trabalhar com amostras (pesquisas, experimentos) para fazer inferências sobre a população.",
            borderColor: "system-warning",
          },
          {
            question: "Para que serve o desvio padrão na prática?",
            answer:
              "O desvio padrão é usado em controle de qualidade, análise de risco, pesquisas de mercado, estudos científicos, finanças (volatilidade), e qualquer situação onde é importante medir a variabilidade dos dados.",
            borderColor: "system-success",
          },
        ]}
        tipSection={{
          title: "Dica Estatística Importante",
          content:
            "<strong>Regra prática:</strong> Em distribuições normais, cerca de 68% dos dados ficam dentro de 1 desvio padrão da média, 95% dentro de 2 desvios, e 99,7% dentro de 3 desvios.",
        }}
        footerText="<strong>Lembre-se:</strong> O desvio padrão é fundamental para entender a variabilidade dos dados e tomar decisões baseadas em evidências estatísticas."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-math-purple bg-math-purple-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Desvio Padrão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-math-purple">calculadora de desvio padrão</strong> implementa{" "}
              <strong className="text-primary-blue-dark">algoritmos estatísticos confiáveis</strong> para calcular
              medidas de dispersão. Os cálculos seguem as fórmulas padrão para desvio padrão populacional
              e amostral com correção de Bessel.
            </p>
            <p>
              <strong>Recursos avançados:</strong> Cálculo simultâneo de desvio padrão populacional e
              amostral, variância, estatísticas descritivas e comparação entre os métodos.
            </p>
            <p>
              <strong className="text-system-warning">Nota técnica:</strong> Esta ferramenta é
              desenvolvida para fins educacionais, acadêmicos e profissionais. Para pesquisas
              científicas, recomenda-se validação com <strong>software estatístico especializado</strong>
              como R, Python, SPSS ou Minitab.
            </p>
            <p className="mt-4 border-t border-math-purple/20 pt-3 text-xs opacity-75">
              🔎 Cálculos confiáveis • 📊 Estatística descritiva • 🔒 Dados não armazenados • 📱 Interface
              responsiva • 🌙 Tema escuro otimizado • 🧮 Suporte a decimais
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção Educacional Avançada para E-E-A-T */}
      <Card className="border-l-4 border-system-info bg-gradient-to-r from-system-info/10 to-math-purple/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📚 Fundamentos Estatísticos - Guia Acadêmico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Regra Empírica */}
            <div className="rounded-lg bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-system-info">🎯 Regra Empírica (68-95-99,7)</h3>
              <p className="mb-4 text-sm text-text-secondary">
                Em distribuições normais, o desvio padrão permite prever a concentração dos dados:
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded border border-system-success/20 bg-system-success/10 p-3">
                  <h4 className="font-semibold text-system-success">1σ ≈ 68%</h4>
                  <p className="text-xs text-text-secondary">dos dados estão dentro de ±1 desvio padrão da média</p>
                </div>
                <div className="rounded border border-system-info/20 bg-system-info/10 p-3">
                  <h4 className="font-semibold text-system-info">2σ ≈ 95%</h4>
                  <p className="text-xs text-text-secondary">dos dados estão dentro de ±2 desvios padrão da média</p>
                </div>
                <div className="rounded border border-system-warning/20 bg-system-warning/10 p-3">
                  <h4 className="font-semibold text-system-warning">3σ ≈ 99,7%</h4>
                  <p className="text-xs text-text-secondary">dos dados estão dentro de ±3 desvios padrão da média</p>
                </div>
              </div>
            </div>

            {/* Correção de Bessel */}
            <div className="rounded-lg bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">🔬 Correção de Bessel Explicada</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-math-purple">Por que N-1?</h4>
                  <p className="mb-3 text-sm text-text-secondary">
                    Quando calculamos a variância amostral, subestimamos sistematicamente a variância populacional.
                    A correção de Bessel (divisor N-1) compensa esse viés.
                  </p>
                  <div className="rounded bg-gray-800 p-3 text-xs font-mono">
                    <p className="text-growth-green">Viés = E[s²] - σ² ≠ 0</p>
                    <p className="text-primary-blue">Correção: E[s²ᴮᵉˢˢᵉˡ] = σ²</p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-growth-green">Graus de Liberdade</h4>
                  <p className="text-sm text-text-secondary">
                    Ao estimar a média amostral, "perdemos" um grau de liberdade. Dos N valores, apenas N-1 são
                    independentes para calcular a variância, pois o último é determinado pelos outros e pela média.
                  </p>
                </div>
              </div>
            </div>

            {/* Aplicações Práticas Detalhadas */}
            <div className="rounded-lg bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-growth-green">🏭 Aplicações Profissionais</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded border border-system-info/20 bg-system-info/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-info">💰 Finanças</h4>
                  <ul className="text-xs text-text-secondary space-y-1">
                    <li>• Volatilidade de ativos (σ anualizada)</li>
                    <li>• Value at Risk (VaR)</li>
                    <li>• Sharpe Ratio e métricas de risco</li>
                    <li>• Diversificação de portfólio</li>
                  </ul>
                </div>
                <div className="rounded border border-system-success/20 bg-system-success/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-success">🏭 Controle de Qualidade</h4>
                  <ul className="text-xs text-text-secondary space-y-1">
                    <li>• Cartas de controle (±3σ)</li>
                    <li>• Capability studies (Cpk)</li>
                    <li>• Six Sigma methodology</li>
                    <li>• Análise de variabilidade de processo</li>
                  </ul>
                </div>
                <div className="rounded border border-system-warning/20 bg-system-warning/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-warning">🔬 Pesquisa Científica</h4>
                  <ul className="text-xs text-text-secondary space-y-1">
                    <li>• Intervalos de confiança</li>
                    <li>• Testes de hipóteses</li>
                    <li>• Análise de variância (ANOVA)</li>
                    <li>• Controle de variáveis experimentais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitações e Considerações */}
            <div className="rounded border border-system-warning/30 bg-system-warning/10 p-4">
              <h4 className="mb-3 font-semibold text-system-warning">⚠️ Limitações Importantes</h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <h5 className="font-medium text-text-primary">Sensibilidade a Outliers</h5>
                  <p className="text-sm text-text-secondary">
                    O desvio padrão é muito sensível a valores extremos. Considere usar mediana e IQR para dados com outliers.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-text-primary">Distribuições Não-Normais</h5>
                  <p className="text-sm text-text-secondary">
                    A regra 68-95-99.7 só se aplica a distribuições normais. Para outras distribuições, use desigualdade de Chebyshev.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="desvio-padrao" />
    </div>
  );
}
