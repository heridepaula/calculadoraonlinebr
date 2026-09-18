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
      title: `Calculadora de Fibonacci 2026 - Sequência Dourada | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora de Fibonacci GRATUITA! Explore a sequência dourada, calcule termos específicos e descubra a proporção áurea na natureza. Ferramenta educativa completa.",
    },
    {
      name: "keywords",
      content: "calculadora fibonacci, sequencia fibonacci, proporção aurea, razao aurea, fibonacci natureza, matematica fibonacci, sequencia dourada, espiral dourada, phi fibonacci, numeros fibonacci"
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
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
    },
    {
      property: "og:title",
      content: "Calculadora de Fibonacci 2026 – Sequência Dourada",
    },
    {
      property: "og:description",
      content:
        "★ Calculadora de Fibonacci GRATUITA! Explore a sequência dourada, calcule termos específicos e descubra a proporção áurea na natureza. Ferramenta educativa completa.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-fibonacci.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Fibonacci - Sequência dourada e propriedades matemáticas",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Fibonacci 2026 – Sequência Dourada",
    },
    {
      name: "twitter:description",
      content:
        "★ Calculadora de Fibonacci GRATUITA! Explore a sequência dourada, calcule termos específicos e descubra a proporção áurea na natureza.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-fibonacci.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Fibonacci - Sequência dourada",
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
    { name: "language", content: "pt-BR" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Fibonacci - Sequência Dourada 2026",
        description:
          "Calculadora gratuita da sequência de Fibonacci: calcule números, termos específicos e explore as propriedades matemáticas da famosa sequência dourada.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "Mathematics",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-01-20",
        datePublished: "2025-01-20",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
          name: "Calculadora de Fibonacci 2026 - Sequência Dourada",
          description:
            "Calcule a sequência de Fibonacci: números, termo específico e propriedades matemáticas. Explore a proporção áurea e sequências numéricas.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
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
                name: "Fibonacci",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Sequência de Fibonacci",
          description: "Famosa sequência matemática onde cada número é a soma dos dois anteriores",
          category: "Mathematics",
        },
        featureList: [
          "Cálculo da sequência de Fibonacci",
          "Termo específico da sequência",
          "Propriedades matemáticas",
          "Razão áurea (proporção dourada)",
          "Interface educativa e interativa",
          "Responsivo para dispositivos móveis",
          "Resultados em tempo real",
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Calculadora de Fibonacci Online",
        applicationCategory: "UtilitiesApplication",
        applicationSubCategory: "Calculator",
        operatingSystem: "Web Browser",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
        description: "Ferramenta online gratuita para calcular a sequência de Fibonacci e explorar suas propriedades matemáticas",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        softwareVersion: "1.0",
        downloadUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
        installUrl: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fibonacci",
        requirements: "Navegador web moderno",
        permissions: "Não requer permissões especiais",
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br"
        }
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é a sequência de Fibonacci?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A sequência de Fibonacci é uma série de números onde cada número é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89... Está presente na natureza e tem aplicações na matemática, computação e arte.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular um termo específico de Fibonacci?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular F(n), use a fórmula recursiva: F(n) = F(n-1) + F(n-2), onde F(0) = 0 e F(1) = 1. Para termos grandes, use a fórmula de Binet: F(n) = (φⁿ - ψⁿ)/√5, onde φ = (1+√5)/2 é a proporção áurea.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a relação entre Fibonacci e a proporção áurea?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A razão entre números consecutivos de Fibonacci aproxima-se da proporção áurea (φ ≈ 1,618) conforme n aumenta. Esta constante aparece frequentemente na natureza, arte e arquitetura, sendo considerada esteticamente agradável.",
            },
          },
          {
            "@type": "Question",
            name: "Onde encontramos Fibonacci na natureza?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fibonacci aparece em pétalas de flores, espirais de conchas, arranjo de sementes em girassóis, galhos de árvores, favos de mel, e muitos outros padrões naturais. É um dos exemplos mais fascinantes de matemática na natureza.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Fibonacci",
        description:
          "Aprenda a calcular a sequência de Fibonacci e explorar suas propriedades matemáticas",
        step: [
          {
            "@type": "HowToStep",
            name: "Escolha o tipo de cálculo",
            text: "Selecione entre gerar a sequência completa ou calcular um termo específico usando os botões de opção.",
          },
          {
            "@type": "HowToStep",
            name: "Insira o número desejado",
            text: "Digite quantos termos deseja gerar (máximo 50) ou qual termo específico calcular (máximo 1000).",
          },
          {
            "@type": "HowToStep",
            name: "Calcule os resultados",
            text: "Clique em 'Calcular' para obter a sequência ou termo específico com propriedades matemáticas.",
          },
          {
            "@type": "HowToStep",
            name: "Explore as propriedades",
            text: "Visualize a sequência, razões áureas e outras propriedades matemáticas interessantes dos números de Fibonacci.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Fibonacci Online",
          },
        ],
      }),
    },
  ];
};

type CalculationType = "sequence" | "specific";

interface FibonacciResult {
  sequence?: number[];
  specificTerm?: {
    position: number;
    value: number;
    goldenRatio?: number;
  };
  properties: {
    sum?: number;
    goldenRatios?: number[];
    isPrime?: boolean;
    isEven?: boolean;
  };
}

interface ValidationErrors {
  number?: string;
}

export default function FibonacciCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>("sequence");
  const [numberInput, setNumberInput] = useState("");
  const [result, setResult] = useState<FibonacciResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "fibonacci",
    category: "matematica",
  });
  useFormTracking("fibonacci");

  const numberBR = (v: number, digits = 0) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

  const parseNumber = (v: string): number => {
    const s = String(v ?? "");
    const n = parseInt(s, 10);
    return isNaN(n) ? 0 : n;
  };

  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  };

  const fibonacciSequence = (count: number): number[] => {
    if (count <= 0) return [];
    if (count === 1) return [0];
    if (count === 2) return [0, 1];

    const sequence = [0, 1];
    for (let i = 2; i < count; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  };

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const goldenRatio = (current: number, previous: number): number => {
    return previous === 0 ? 1 : current / previous;
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const num = parseNumber(numberInput);

    if (num <= 0) {
      newErrors.number = "O número deve ser maior que 0";
      ok = false;
    }

    if (calculationType === "sequence" && num > 50) {
      newErrors.number = "Para a sequência, máximo 50 termos";
      ok = false;
    }

    if (calculationType === "specific" && num > 1000) {
      newErrors.number = "Para termo específico, máximo posição 1000";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateFibonacci = (): FibonacciResult => {
    const num = parseNumber(numberInput);

    if (calculationType === "sequence") {
      const sequence = fibonacciSequence(num);
      const sum = sequence.reduce((acc, val) => acc + val, 0);
      const goldenRatios = sequence.slice(2).map((val, i) => goldenRatio(val, sequence[i + 1]));

      return {
        sequence,
        properties: {
          sum,
          goldenRatios,
        },
      };
    } else {
      const value = fibonacci(num);
      const previousValue = num > 0 ? fibonacci(num - 1) : 0;
      const ratio = goldenRatio(value, previousValue);

      return {
        specificTerm: {
          position: num,
          value,
          goldenRatio: ratio,
        },
        properties: {
          isPrime: isPrime(value),
          isEven: value % 2 === 0,
        },
      };
    }
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateFibonacci();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ number: "Erro no cálculo. Verifique o valor inserido." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setNumberInput("");
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
        <BreadcrumbItem isLast>Fibonacci</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Fibonacci 2026 – Sequência Dourada
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Explore a fascinante <strong className="text-growth-green">sequência de Fibonacci</strong> e suas{" "}
          propriedades matemáticas. Calcule termos específicos, visualize a sequência e descubra a{" "}
          <strong className="text-primary-blue-dark">proporção áurea</strong> presente na natureza.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🌸 <strong>Matemática na Natureza</strong> • 📐 <strong>Proporção Áurea</strong> • 🔢{" "}
            <strong>Sequências Numéricas</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔢 Calculadora de Fibonacci</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Cálculo */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setCalculationType("sequence")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                calculationType === "sequence"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Gerar Sequência
            </button>
            <button
              type="button"
              onClick={() => setCalculationType("specific")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                calculationType === "specific"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Termo Específico
            </button>
          </div>

          {/* Campo de entrada */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-xs">
              <Input
                type="number"
                label={
                  calculationType === "sequence"
                    ? "Quantos termos gerar (máx. 50)"
                    : "Posição do termo (máx. 1000)"
                }
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder={calculationType === "sequence" ? "10" : "20"}
                fullWidth
                className="h-12 text-lg text-center"
              />
              <ErrorMessage error={errors.number} />
              {calculationType === "sequence" && (
                <p className="mt-2 text-xs text-text-secondary text-center">
                  Ex: Digite 10 para gerar os primeiros 10 números de Fibonacci
                </p>
              )}
              {calculationType === "specific" && (
                <p className="mt-2 text-xs text-text-secondary text-center">
                  Ex: Digite 20 para calcular F(20)
                </p>
              )}
            </div>
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
        <Card ref={resultRef as any} className="border-2 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              🌟 Resultado de Fibonacci
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.sequence && (
              <div className="space-y-6">
                {/* Sequência */}
                <div className="rounded-lg bg-gray-900 p-6">
                  <h4 className="mb-4 text-lg font-bold text-growth-green">
                    📋 Sequência de Fibonacci ({result.sequence.length} termos)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                    {result.sequence.map((num, index) => (
                      <div
                        key={index}
                        className="rounded bg-primary-blue-light p-2 font-mono font-bold text-primary-blue-dark break-all overflow-hidden"
                        title={`F(${index}) = ${numberBR(num)}`}
                      >
                        <div className="text-xs text-primary-blue-dark/70 mb-1">F({index})</div>
                        <div className="text-xs leading-tight">{numberBR(num)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Propriedades da Sequência */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-growth-green break-all font-mono leading-tight px-2">
                      {numberBR(result.properties.sum || 0)}
                    </div>
                    <div className="text-sm text-text-secondary">Soma de todos os termos</div>
                  </div>
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className="text-xl sm:text-xl md:text-2xl font-bold text-primary-blue-dark break-all font-mono leading-tight px-2">
                      {result.properties.goldenRatios?.length
                        ? numberBR(result.properties.goldenRatios[result.properties.goldenRatios.length - 1], 6)
                        : "N/A"}
                    </div>
                    <div className="text-sm text-text-secondary">Aproximação da Razão Áurea</div>
                  </div>
                </div>
              </div>
            )}

            {result.specificTerm && (
              <div className="space-y-6">
                {/* Termo Específico */}
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="mb-2 text-sm text-text-secondary">
                    F({result.specificTerm.position})
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-growth-green break-all font-mono leading-tight px-2">
                    {numberBR(result.specificTerm.value)}
                  </div>
                  <div className="mt-2 text-sm text-text-secondary">
                    {result.specificTerm.position}º termo de Fibonacci
                  </div>
                </div>

                {/* Propriedades do Termo */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary-blue-dark break-all font-mono leading-tight px-2">
                      {result.specificTerm.goldenRatio ? numberBR(result.specificTerm.goldenRatio, 6) : "N/A"}
                    </div>
                    <div className="text-sm text-text-secondary">Razão Áurea</div>
                  </div>
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className={`text-lg sm:text-xl font-bold ${result.properties.isPrime ? "text-growth-green" : "text-system-error"}`}>
                      {result.properties.isPrime ? "Primo" : "Não Primo"}
                    </div>
                    <div className="text-sm text-text-secondary">Número Primo</div>
                  </div>
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className={`text-lg sm:text-xl font-bold ${result.properties.isEven ? "text-system-info" : "text-system-warning"}`}>
                      {result.properties.isEven ? "Par" : "Ímpar"}
                    </div>
                    <div className="text-sm text-text-secondary">Paridade</div>
                  </div>
                </div>
              </div>
            )}

            {/* Informação sobre a Proporção Áurea */}
            <div className="mt-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">📐 Proporção Áurea (φ)</h4>
              <p className="text-sm text-text-secondary">
                A razão áurea φ ≈ 1,618033988... aparece quando dividimos um número de Fibonacci pelo anterior.
                Esta constante está presente em muitas formas da natureza e é considerada esteticamente perfeita.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Sequência de Fibonacci - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🌸 Sequência de Fibonacci – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* O que é Fibonacci */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 O que é a Sequência de Fibonacci?
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    É uma sequência onde cada número é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
                    Iniciada por Leonardo Fibonacci em 1202, estudando reprodução de coelhos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• F(0) = 0, F(1) = 1</li>
                    <li>• F(n) = F(n-1) + F(n-2)</li>
                    <li>• Fórmula de Binet para termos grandes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">🌟 Propriedades</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Razão áurea entre termos consecutivos</li>
                    <li>• Presença em padrões naturais</li>
                    <li>• Aplicações em matemática e computação</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Primeiros Termos</h4>
                  <div className="text-sm text-text-secondary font-mono">
                    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233...
                  </div>
                </div>
              </div>
            </div>

            {/* Proporção Áurea */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📐 Proporção Áurea (φ)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    φ ≈ 1,618033988... é a razão entre números consecutivos de Fibonacci quando n tende ao infinito.
                    Também conhecida como "número de ouro" ou "divina proporção".
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Cálculo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• φ = (1 + √5) / 2</li>
                    <li>• lim(n→∞) F(n+1)/F(n) = φ</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Na Natureza</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Espirais de conchas e caracóis</li>
                    <li>• Pétalas de flores e sementes</li>
                    <li>• Galhos de árvores e folhas</li>
                    <li>• Proporções do corpo humano</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Arte e arquitetura</li>
                    <li>• Design e estética</li>
                    <li>• Mercado financeiro (retrações)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fibonacci na Natureza */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🌿 Fibonacci na Natureza
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🌻 Plantas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Girassóis: 21, 34, 55, 89 espirais</li>
                    <li>• Pinhas: 8 e 13 espirais</li>
                    <li>• Margaridas: 21, 34, 55, 89 pétalas</li>
                    <li>• Folhas em galhos: padrão 1/3, 2/5, 3/8</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🐚 Animais</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Espiral da concha do náutilo</li>
                    <li>• Padrões em favos de abelhas</li>
                    <li>• Reprodução de coelhos (problema original)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">🎨 Arte e Arquitetura</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Parthenon (Grécia antiga)</li>
                    <li>• Quadros de Da Vinci</li>
                    <li>• Pirâmides do Egito</li>
                    <li>• Design moderno e logos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">💻 Tecnologia</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Algoritmos de busca</li>
                    <li>• Análise técnica financeira</li>
                    <li>• Criptografia e segurança</li>
                    <li>• Otimização computacional</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Propriedades Matemáticas */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🧮 Propriedades Matemáticas Interessantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🔄 Identidade de Cassini</h4>
              <p className="text-sm text-text-secondary">
                F(n-1)×F(n+1) - F(n)² = (-1)ⁿ
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Relaciona três números consecutivos de Fibonacci
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">📊 Soma até n</h4>
              <p className="text-sm text-text-secondary">
                ∑F(i) = F(n+2) - 1
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                A soma dos primeiros n termos
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🔢 MDC</h4>
              <p className="text-sm text-text-secondary">
                mdc(F(m), F(n)) = F(mdc(m,n))
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Máximo divisor comum preserva a estrutura
              </p>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <h4 className="mb-2 font-bold text-system-info">⚡ Paridade</h4>
              <p className="text-sm text-text-secondary">
                F(n) é par ⟺ n ≡ 0 (mod 3)
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Padrão: ímpar, ímpar, par, ímpar, ímpar, par...
              </p>
            </div>

            <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
              <h4 className="mb-2 font-bold text-system-success">🎯 Limite</h4>
              <p className="text-sm text-text-secondary">
                lim F(n+1)/F(n) = φ
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Converge para a proporção áurea
              </p>
            </div>

            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h4 className="mb-2 font-bold text-system-error">🔍 Primos</h4>
              <p className="text-sm text-text-secondary">
                F(p) ≡ (5/p) (mod p)
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Relação com símbolos de Legendre
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Fibonacci"
        items={[
          {
            question: "O que é a sequência de Fibonacci?",
            answer:
              "A sequência de Fibonacci é uma série de números onde cada número é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89... Está presente na natureza e tem aplicações na matemática, computação e arte.",
            borderColor: "primary-blue",
          },
          {
            question: "Como calcular um termo específico de Fibonacci?",
            answer:
              "Para calcular F(n), use a fórmula recursiva: F(n) = F(n-1) + F(n-2), onde F(0) = 0 e F(1) = 1. Para termos grandes, use a fórmula de Binet: F(n) = (φⁿ - ψⁿ)/√5, onde φ = (1+√5)/2 é a proporção áurea.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a relação entre Fibonacci e a proporção áurea?",
            answer:
              "A razão entre números consecutivos de Fibonacci aproxima-se da proporção áurea (φ ≈ 1,618) conforme n aumenta. Esta constante aparece frequentemente na natureza, arte e arquitetura, sendo considerada esteticamente agradável.",
            borderColor: "system-info",
          },
          {
            question: "Onde encontramos Fibonacci na natureza?",
            answer:
              "Fibonacci aparece em pétalas de flores, espirais de conchas, arranjo de sementes em girassóis, galhos de árvores, favos de mel, e muitos outros padrões naturais. É um dos exemplos mais fascinantes de matemática na natureza.",
            borderColor: "system-warning",
          },
          {
            question: "Por que Fibonacci é importante na computação?",
            answer:
              "Fibonacci é usado em algoritmos de busca (busca de Fibonacci), análise de complexidade, estruturas de dados (árvores de Fibonacci), criptografia e otimização. Também aparece em análise técnica do mercado financeiro.",
            borderColor: "growth-green",
          },
          {
            question: "Como Leonardo Fibonacci descobriu esta sequência?",
            answer:
              "Em 1202, Fibonacci estudou um problema sobre reprodução de coelhos: quantos pares nascem em um ano, se cada par produz um novo par mensalmente após 2 meses? A solução levou à famosa sequência.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Interessante sobre Fibonacci",
          content:
            "<strong>Curiosidade:</strong> A razão áurea φ é irracional e tem a propriedade única de que φ² = φ + 1. Isso significa que 1/φ = φ - 1, uma característica matemática fascinante.",
        }}
        footerText="<strong>Lembre-se:</strong> Fibonacci não é apenas matemática abstrata - está presente em flores, conchas, arte e até mesmo no mercado financeiro. É um exemplo perfeito de como a matemática descreve a beleza natural."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Fibonacci
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de Fibonacci</strong>{" "}
              permite explorar a fascinante sequência matemática que aparece em{" "}
              <strong className="text-growth-green">padrões naturais</strong> e tem aplicações em
              arte, arquitetura e computação.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Gerar sequências de até 50 termos, calcular termos
              específicos até a posição 1000, explorar propriedades como a proporção áurea e
              verificar se números são primos.
            </p>
            <p>
              <strong className="text-system-warning">Educacional:</strong> Esta ferramenta é ideal
              para estudantes, professores e curiosos que querem entender melhor a{" "}
              <strong>matemática presente na natureza</strong> e as propriedades únicas desta
              sequência milenar.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🌸 Matemática na natureza • 📐 Proporção áurea • 🔒 Cálculos seguros • 📱
              Responsivo para mobile • ⚡ Resultados instantâneos
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="fibonacci" />
    </div>
  );
}