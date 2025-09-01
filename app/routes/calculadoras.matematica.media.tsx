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
      title: "Calculadora de Média Estatística 2025 – Aritmética, Geométrica e Harmônica | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Calcule média aritmética, geométrica e harmônica com análise completa. Identifique medidas de tendência central, desvio padrão e variância com explicações passo a passo.",
    },
    {
      name: "keywords",
      content:
        "calculadora média, média aritmética, média geométrica, média harmônica, tendência central, desvio padrão, variância, estatística descritiva, análise dados",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
    },
    {
      property: "og:title",
      content: "Calculadora de Média Estatística 2025 – Aritmética, Geométrica e Harmônica",
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
      content: "Calculadora de Média Estatística 2025 – Aritmética, Geométrica e Harmônica",
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
          "Calculadora gratuita e precisa para calcular média aritmética, geométrica e harmônica. Análise completa de medidas de tendência central com desvio padrão, variância e explicações detalhadas.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/media",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: new Date().toISOString().split('T')[0],
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
          description: "Medidas de tendência central que representam o valor típico de um conjunto de dados",
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
      .map(val => {
        const normalizedVal = val.trim().replace(",", ".");
        return parseFloat(normalizedVal);
      })
      .filter(val => !isNaN(val));
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
    if (values.every(val => val > 0)) {
      const product = values.reduce((acc, val) => acc * val, 1);
      geometricMean = Math.pow(product, 1 / count);
    }
    
    // Média Harmônica (somente para valores positivos)
    let harmonicMean: number | null = null;
    if (values.every(val => val > 0)) {
      const reciprocalSum = values.reduce((acc, val) => acc + (1 / val), 0);
      harmonicMean = count / reciprocalSum;
    }
    
    // Variância e Desvio Padrão
    const variance = values.reduce((acc, val) => acc + Math.pow(val - arithmeticMean, 2), 0) / count;
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
          Calcule a <strong className="text-math-purple">média aritmética, geométrica e harmônica</strong>{" "}
          de qualquer conjunto de dados. Analise{" "}
          <strong className="text-primary-blue-dark">medidas de tendência central</strong> com desvio padrão,
          variância e estatísticas detalhadas.
        </p>
        <div className="inline-block rounded-lg bg-math-purple-soft p-4 duration-300">
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
              💡 <strong>Dica:</strong> Você pode usar vírgulas, espaços ou ponto e vírgula para separar os valores.
              Para médias geométrica e harmônica, use apenas números positivos.
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
                  Dados ordenados: <strong>[{result.sortedValues.map(v => v % 1 === 0 ? v.toString() : formatNumber(v, 2)).join(", ")}]</strong>
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

      <RelatedCalculators category="matematica" currentCalculatorId="media" />
    </div>
  );
}