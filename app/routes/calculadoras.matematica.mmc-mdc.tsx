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
import { useIndexNow } from "~/hooks/useIndexNow";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Calculadora MMC e MDC 2025 - Mínimo Múltiplo Comum | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Calcule MMC (Mínimo Múltiplo Comum) e MDC (Máximo Divisor Comum) de forma rápida e precisa. Fatoração completa com explicação passo a passo. Gratuito!",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
    },
    {
      property: "og:title",
      content: "Calculadora MMC e MDC Online 2025 – Mínimo Múltiplo Comum e Máximo Divisor Comum",
    },
    {
      property: "og:description",
      content:
        "Ferramenta online gratuita para calcular MMC e MDC com fatoração completa. Encontre o Mínimo Múltiplo Comum e Máximo Divisor Comum com explicação passo a passo.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-mmc-mdc.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora MMC e MDC - Mínimo Múltiplo Comum e Máximo Divisor Comum",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora MMC e MDC Online 2025 – Mínimo Múltiplo Comum",
    },
    {
      name: "twitter:description",
      content:
        "Calculadora online para MMC e MDC. Encontre o Mínimo Múltiplo Comum e Máximo Divisor Comum com fatoração completa. Gratuito!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-mmc-mdc.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora MMC e MDC - Operações Matemáticas",
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
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    {
      name: "keywords",
      content:
        "MMC, MDC, mínimo múltiplo comum, máximo divisor comum, fatoração prima, algoritmo euclides, matemática, calculadora",
    },
    { name: "rating", content: "general" },
    { name: "distribution", content: "global" },
    { name: "revisit-after", content: "7 days" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora MMC e MDC - Mínimo Múltiplo Comum e Máximo Divisor Comum 2025",
        description:
          "Calculadora online gratuita para MMC e MDC com fatoração prima. Calcule Mínimo Múltiplo Comum e Máximo Divisor Comum com explicação passo a passo detalhada.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-28",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
          name: "Calculadora MMC e MDC 2025 - Mínimo Múltiplo Comum e Máximo Divisor Comum",
          description:
            "Calcule MMC e MDC com fatoração prima e algoritmo de Euclides. Explicação passo a passo dos métodos para encontrar Mínimo Múltiplo Comum e Máximo Divisor Comum.",
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
                name: "MMC e MDC",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "MMC e MDC",
          description:
            "Cálculo de Mínimo Múltiplo Comum e Máximo Divisor Comum usando fatoração prima e algoritmo de Euclides",
          category: "Mathematics",
        },
        featureList: [
          "Cálculo de MMC (Mínimo Múltiplo Comum)",
          "Cálculo de MDC (Máximo Divisor Comum)",
          "Fatoração prima completa",
          "Algoritmo de Euclides para MDC",
          "Explicação passo a passo dos métodos",
          "Demonstração da relação MMC × MDC = a × b",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é MMC (Mínimo Múltiplo Comum)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O MMC é o menor número inteiro positivo que é múltiplo comum de dois ou mais números. Por exemplo, o MMC de 12 e 18 é 36, pois 36 é o menor número que é múltiplo tanto de 12 quanto de 18.",
            },
          },
          {
            "@type": "Question",
            name: "O que é MDC (Máximo Divisor Comum)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O MDC é o maior número que divide dois ou mais números sem deixar resto. Por exemplo, o MDC de 12 e 18 é 6, pois 6 é o maior número que divide tanto 12 quanto 18 completamente.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular MMC usando fatoração prima?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fatore cada número em números primos. Para o MMC, multiplique todos os fatores primos elevados aos seus maiores expoentes. Exemplo: MMC(12,18) = 12=2²×3, 18=2×3², então MMC = 2²×3² = 36.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a relação entre MMC e MDC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Existe uma relação fundamental: MMC(a,b) × MDC(a,b) = a × b. Esta propriedade permite calcular um quando você conhece o outro. Por exemplo, se MMC(12,18) = 36 e MDC(12,18) = 6, então 36 × 6 = 12 × 18 = 216.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
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
            name: "MMC e MDC",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/mmc-mdc",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de MMC e MDC",
        description:
          "Aprenda a calcular MMC e MDC (Mínimo Múltiplo Comum e Máximo Divisor Comum) usando nossa calculadora online com fatoração prima",
        step: [
          {
            "@type": "HowToStep",
            name: "Digite os números",
            text: "Insira 2 ou 3 números inteiros positivos nos campos correspondentes. Exemplo: 12, 18, 24.",
          },
          {
            "@type": "HowToStep",
            name: "Clique em Calcular",
            text: "Pressione o botão 'Calcular MMC e MDC' para processar os números e obter os resultados.",
          },
          {
            "@type": "HowToStep",
            name: "Veja os resultados",
            text: "Observe o MMC, MDC, fatoração prima de cada número e a explicação passo a passo dos cálculos.",
          },
          {
            "@type": "HowToStep",
            name: "Entenda os métodos",
            text: "Acompanhe a resolução detalhada usando fatoração prima e algoritmo de Euclides para compreender os conceitos.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora MMC e MDC Online Gratuita",
          },
        ],
      }),
    },
  ];
};

interface MMCMDCResult {
  numbers: number[];
  mmc: number;
  mdc: number;
  factorizations: {
    [key: number]: number[];
  };
  primeFactors: {
    [key: number]: { [prime: number]: number };
  };
  steps: string[];
  mmcSteps: string[];
  mdcSteps: string[];
}

interface ValidationErrors {
  number1?: string;
  number2?: string;
  number3?: string;
}

export default function MMCMDCCalculator() {
  // Inputs para números inteiros
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");

  const [result, setResult] = useState<MMCMDCResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "mmc-mdc",
    category: "matematica",
  });
  useFormTracking("mmc-mdc");

  // IndexNow integration for SEO
  const { submitCalculatorUrls } = useIndexNow({
    autoSubmit: true, // Submit current page on mount
    delay: 2000, // Wait 2 seconds before submission
  });

  const numberBR = (v: number, digits = 2) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

  const parseNumber = (v: string): number => {
    const s = String(v ?? "");
    const normalized = s.replace(",", ".");
    const n = parseFloat(normalized);
    return isNaN(n) ? 0 : n;
  };

  // Funções auxiliares para MMC e MDC
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getPrimeFactorization = (n: number): { [prime: number]: number } => {
    const factors: { [prime: number]: number } = {};
    let temp = n;

    for (let i = 2; i <= temp; i++) {
      while (temp % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        temp /= i;
      }
    }

    return factors;
  };

  const getFactorization = (n: number): number[] => {
    const factors: number[] = [];
    let temp = n;

    for (let i = 2; i <= temp; i++) {
      while (temp % i === 0) {
        factors.push(i);
        temp /= i;
      }
    }

    return factors.length ? factors : [n];
  };

  const calculateGCD = (a: number, b: number): number => {
    return b === 0 ? a : calculateGCD(b, a % b);
  };

  const calculateLCM = (a: number, b: number): number => {
    return Math.abs(a * b) / calculateGCD(a, b);
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const num1 = parseNumber(number1);
    const num2 = parseNumber(number2);
    const num3 = parseNumber(number3);

    if (number1.trim() === "") {
      newErrors.number1 = "Primeiro número é obrigatório";
      ok = false;
    } else if (num1 <= 0 || !Number.isInteger(num1)) {
      newErrors.number1 = "Deve ser um número inteiro positivo";
      ok = false;
    }

    if (number2.trim() === "") {
      newErrors.number2 = "Segundo número é obrigatório";
      ok = false;
    } else if (num2 <= 0 || !Number.isInteger(num2)) {
      newErrors.number2 = "Deve ser um número inteiro positivo";
      ok = false;
    }

    // Terceiro número é opcional
    if (number3.trim() !== "" && (num3 <= 0 || !Number.isInteger(num3))) {
      newErrors.number3 = "Deve ser um número inteiro positivo ou deixe vazio";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateMMCMDC = (): MMCMDCResult => {
    const num1 = parseNumber(number1);
    const num2 = parseNumber(number2);
    const num3 = number3.trim() ? parseNumber(number3) : null;

    const numbers = num3 ? [num1, num2, num3] : [num1, num2];

    // Calcular fatorações
    const factorizations: { [key: number]: number[] } = {};
    const primeFactors: { [key: number]: { [prime: number]: number } } = {};

    numbers.forEach((num) => {
      factorizations[num] = getFactorization(num);
      primeFactors[num] = getPrimeFactorization(num);
    });

    // Calcular MDC
    let mdc = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      mdc = calculateGCD(mdc, numbers[i]);
    }

    // Calcular MMC
    let mmc = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      mmc = calculateLCM(mmc, numbers[i]);
    }

    // Passos gerais
    const steps: string[] = [`Números: ${numbers.join(", ")}`, `Fatoração de cada número:`];

    numbers.forEach((num) => {
      const factors = factorizations[num];
      if (factors.length === 1 && factors[0] === num) {
        steps.push(`${num} = ${num} (número primo)`);
      } else {
        steps.push(`${num} = ${factors.join(" × ")}`);
      }
    });

    // Passos para MDC
    const mdcSteps: string[] = [
      `MDC(${numbers.join(", ")}) - Máximo Divisor Comum`,
      `Fatores primos comuns com menor expoente:`,
    ];

    // Encontrar fatores comuns para MDC
    const allPrimes = new Set<number>();
    numbers.forEach((num) => {
      Object.keys(primeFactors[num]).forEach((prime) => {
        allPrimes.add(parseInt(prime));
      });
    });

    const commonFactors: { [prime: number]: number } = {};
    allPrimes.forEach((prime) => {
      const exponents = numbers.map((num) => primeFactors[num][prime] || 0);
      const minExponent = Math.min(...exponents);
      if (minExponent > 0) {
        commonFactors[prime] = minExponent;
      }
    });

    if (Object.keys(commonFactors).length > 0) {
      const commonFactorsStr = Object.entries(commonFactors)
        .map(([prime, exp]) => (exp === 1 ? prime : `${prime}^${exp}`))
        .join(" × ");
      mdcSteps.push(`MDC = ${commonFactorsStr} = ${mdc}`);
    } else {
      mdcSteps.push(`Não há fatores primos comuns`);
      mdcSteps.push(`MDC = 1`);
    }

    // Passos para MMC
    const mmcSteps: string[] = [
      `MMC(${numbers.join(", ")}) - Mínimo Múltiplo Comum`,
      `Fatores primos com maior expoente:`,
    ];

    const allFactorsForMMC: { [prime: number]: number } = {};
    allPrimes.forEach((prime) => {
      const exponents = numbers.map((num) => primeFactors[num][prime] || 0);
      const maxExponent = Math.max(...exponents);
      if (maxExponent > 0) {
        allFactorsForMMC[prime] = maxExponent;
      }
    });

    const mmcFactorsStr = Object.entries(allFactorsForMMC)
      .map(([prime, exp]) => (exp === 1 ? prime : `${prime}^${exp}`))
      .join(" × ");
    mmcSteps.push(`MMC = ${mmcFactorsStr} = ${mmc}`);

    return {
      numbers,
      mmc,
      mdc,
      factorizations,
      primeFactors,
      steps,
      mmcSteps,
      mdcSteps,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateMMCMDC();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ number1: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setNumber1("");
    setNumber2("");
    setNumber3("");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>MMC e MDC</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora MMC e MDC 2025 – Mínimo Múltiplo Comum e Máximo Divisor Comum
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule <strong className="text-growth-green">MMC e MDC</strong> com fatoração prima e{" "}
          algoritmo de Euclides. Encontre o Mínimo Múltiplo Comum e Máximo Divisor Comum com{" "}
          <strong className="text-primary-blue-dark">explicação passo a passo</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔢 <strong>Fatoração Prima</strong> • 📊 <strong>MMC e MDC</strong> • 🧮{" "}
            <strong>Resultados Instantâneos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔢 Números para Cálculo de MMC e MDC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">
              Calcule o Mínimo Múltiplo Comum (MMC) e Máximo Divisor Comum (MDC):
            </p>
            <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
              <span className="text-xl font-bold text-primary-blue-dark">MMC e MDC</span>
              <p className="mt-1 text-sm text-primary-blue-dark">
                Digite números inteiros positivos para calcular o MMC e MDC
              </p>
            </div>
          </div>

          {/* Campos de entrada para números */}
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <div className="w-48">
              <Input
                type="number"
                label="Número 1"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder="12"
                fullWidth
                className="h-12 text-lg"
                min="1"
                step="1"
              />
              <ErrorMessage error={errors.number1} />
              <div className="mt-1 text-xs text-text-secondary">
                Digite um número inteiro positivo
              </div>
            </div>
            <div className="w-48">
              <Input
                type="number"
                label="Número 2"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
                placeholder="18"
                fullWidth
                className="h-12 text-lg"
                min="1"
                step="1"
              />
              <ErrorMessage error={errors.number2} />
              <div className="mt-1 text-xs text-text-secondary">
                Digite um número inteiro positivo
              </div>
            </div>
            <div className="w-48">
              <Input
                type="number"
                label="Número 3 (opcional)"
                value={number3}
                onChange={(e) => setNumber3(e.target.value)}
                placeholder="24"
                fullWidth
                className="h-12 text-lg"
                min="1"
                step="1"
              />
              <ErrorMessage error={errors.number3} />
              <div className="mt-1 text-xs text-text-secondary">Número opcional para cálculo</div>
            </div>
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
        <Card ref={resultRef as any} className="border-2 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              📊 Resultado MMC e MDC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Números analisados</div>
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {result.numbers.join(", ")}
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-system-warning">{result.mmc}</div>
                <div className="text-sm text-text-secondary">MMC (Mínimo Múltiplo Comum)</div>
                <div className="mt-2 text-xs text-gray-400">
                  Menor múltiplo comum a todos os números
                </div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-growth-green">{result.mdc}</div>
                <div className="text-sm text-text-secondary">MDC (Máximo Divisor Comum)</div>
                <div className="mt-2 text-xs text-gray-400">
                  Maior divisor comum a todos os números
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-3 font-semibold text-primary-blue-dark">Fatoração dos Números</h4>
              <div className="space-y-2">
                {Object.entries(result.factorizations).map(([num, factors]) => (
                  <div key={num} className="text-sm">
                    <span className="font-medium text-primary-blue-dark">{num} = </span>
                    <span className="text-text-secondary">{factors.join(" × ")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-gray-900 p-4">
              <h4 className="mb-3 font-semibold text-growth-green">Resolução Passo a Passo</h4>
              <div className="space-y-2">
                {result.steps.map((step, index) => (
                  <div key={index} className="text-sm text-text-secondary">
                    <span className="font-medium text-primary-blue-dark">{index + 1}. </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: MMC e MDC - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 MMC e MDC – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceitos Fundamentais */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Conceitos Fundamentais
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    🔍 MMC - Mínimo Múltiplo Comum
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O MMC é o menor número inteiro positivo que é múltiplo comum de dois ou mais
                    números. Usado para operações com frações e resolução de problemas matemáticos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Cálculo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Fatore os números em primos</li>
                    <li>• Multiplique os fatores com maior expoente</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ MDC - Máximo Divisor Comum
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O MDC é o maior número que divide dois ou mais números sem deixar resto.
                    Fundamental para simplificação de frações.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Simplificação de frações</li>
                    <li>• Resolução de problemas do cotidiano</li>
                    <li>• Organização em grupos iguais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Métodos de Cálculo */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📐 Métodos de Cálculo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Fatoração Prima</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Decomponha cada número em fatores primos. Para o MMC, use os fatores com maior
                    expoente. Para o MDC, use os fatores comuns com menor expoente.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Exemplo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 12 = 2² × 3</li>
                    <li>• 18 = 2 × 3²</li>
                    <li>• MMC = 2² × 3² = 36</li>
                    <li>• MDC = 2 × 3 = 6</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Algoritmo de Euclides
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Para calcular o MDC, divida o maior pelo menor e continue dividindo pelos restos
                    até obter resto zero. O último divisor é o MDC.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Relação</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• MMC(a,b) × MDC(a,b) = a × b</li>
                    <li>• MMC útil para frações</li>
                    <li>• MDC útil para simplificação</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Aplicações Práticas */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🔍 Aplicações Práticas
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    🔍 Problemas do Cotidiano
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    MMC e MDC aparecem em diversas situações práticas da vida real, desde
                    organização de objetos até cálculos financeiros.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Exemplos MMC</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Sincronização de eventos periódicos</li>
                    <li>• Soma de frações com denominadores diferentes</li>
                    <li>• Planejamento de horários</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Exemplos MDC</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Divisão de grupos em partes iguais</li>
                    <li>• Simplificação de frações</li>
                    <li>• Organização de objetos em fileiras</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Situações Reais</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 24 maçãs e 18 bananas em cestas iguais</li>
                    <li>• Encontro de dois ônibus no mesmo ponto</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Métodos de Cálculo */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Métodos de Cálculo de MMC e MDC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Fatoração Prima
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Algoritmo de Euclides
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Divisões Sucessivas
                  </th>
                  <th className="p-3 text-center font-semibold text-system-info">
                    Lista de Múltiplos
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Aplicabilidade</td>
                  <td className="p-3 text-center text-primary-blue-dark">MMC e MDC</td>
                  <td className="p-3 text-center text-growth-green">Apenas MDC</td>
                  <td className="p-3 text-center text-system-warning">MMC e MDC</td>
                  <td className="p-3 text-center text-system-info">Apenas MMC</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Dificuldade</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐</td>
                  <td className="p-3 text-center">⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Eficiência</td>
                  <td className="p-3 text-center text-primary-blue-dark">Boa</td>
                  <td className="p-3 text-center text-growth-green">Excelente</td>
                  <td className="p-3 text-center text-system-warning">Boa</td>
                  <td className="p-3 text-center text-system-info">Ruim</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Números Grandes</td>
                  <td className="p-3 text-center">Funciona</td>
                  <td className="p-3 text-center">Excelente</td>
                  <td className="p-3 text-center">Funciona</td>
                  <td className="p-3 text-center">Impraticável</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Vantagens</td>
                  <td className="p-3 text-center">Compreensivo</td>
                  <td className="p-3 text-center">Muito rápido</td>
                  <td className="p-3 text-center">Didático</td>
                  <td className="p-3 text-center">Números pequenos</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Melhor Uso</td>
                  <td className="p-3 text-center text-primary-blue-dark">Ensino</td>
                  <td className="p-3 text-center text-growth-green">Cálculos rápidos</td>
                  <td className="p-3 text-center text-system-warning">Prática</td>
                  <td className="p-3 text-center text-system-info">Iniciantes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🔢 Fatoração Prima</h4>
              <p className="text-sm text-text-secondary">
                Método <strong>mais compreensivo</strong> para calcular MMC e MDC, ideal para ensino
                e compreensão dos conceitos. Saiba mais sobre
                <a
                  href="/calculadoras/matematica/porcentagem"
                  className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
                >
                  cálculos de porcentagem
                </a>
                ou explore nossa{" "}
                <a
                  href="/calculadoras/matematica/fracoes"
                  className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
                >
                  calculadora de frações
                </a>
                .
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">⚡ Algoritmo de Euclides</h4>
              <p className="text-sm text-text-secondary">
                Método <strong>mais eficiente</strong> para calcular MDC de números grandes,
                especialmente útil em programação.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">📐 Divisões Sucessivas</h4>
              <p className="text-sm text-text-secondary">
                Método <strong>prático e visual</strong> para calcular MMC e MDC simultaneamente,
                ideal para resolução manual.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de MMC e MDC"
        items={[
          {
            question: "O que é MMC (Mínimo Múltiplo Comum)?",
            answer:
              "O MMC é o menor número inteiro positivo que é múltiplo comum de dois ou mais números. Por exemplo, o MMC de 12 e 18 é 36, pois 36 é o menor número que é múltiplo tanto de 12 quanto de 18.",
            borderColor: "primary-blue",
          },
          {
            question: "O que é MDC (Máximo Divisor Comum)?",
            answer:
              "O MDC é o maior número que divide dois ou mais números sem deixar resto. Por exemplo, o MDC de 12 e 18 é 6, pois 6 é o maior número que divide tanto 12 quanto 18 completamente.",
            borderColor: "growth-green",
          },
          {
            question: "Como calcular MMC usando fatoração prima?",
            answer:
              "Fatore cada número em números primos. Para o MMC, multiplique todos os fatores primos elevados aos seus maiores expoentes. Exemplo: MMC(12,18) = 12=2²×3, 18=2×3², então MMC = 2²×3² = 36.",
            borderColor: "system-info",
          },
          {
            question: "Qual a relação entre MMC e MDC?",
            answer:
              "Existe uma relação fundamental: MMC(a,b) × MDC(a,b) = a × b. Esta propriedade permite calcular um quando você conhece o outro. Por exemplo, se MMC(12,18) = 36 e MDC(12,18) = 6, então 36 × 6 = 12 × 18 = 216.",
            borderColor: "system-warning",
          },
          {
            question: "Quais são as aplicações práticas do MMC e MDC?",
            answer:
              "MMC é usado para encontrar denominadores comuns em frações, sincronizar eventos periódicos e resolver problemas de tempo. MDC é usado para simplificar frações, dividir objetos em grupos iguais e encontrar medidas comuns.",
            borderColor: "growth-green",
          },
          {
            question: "O algoritmo de Euclides é mais eficiente?",
            answer:
              "Sim, o algoritmo de Euclides é muito eficiente para calcular o MDC, especialmente com números grandes. Ele usa divisões sucessivas até encontrar resto zero. É amplamente usado em programação e criptografia.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre MMC e MDC",
          content:
            "<strong>Para resultados precisos:</strong> sempre use números inteiros positivos e verifique se os números foram fatorados corretamente. A fatoração prima é o método mais confiável para entender os conceitos.",
        }}
        footerText="<strong>Lembre-se:</strong> MMC × MDC = produto dos números (para dois números). Use fatoração prima para compreender melhor os conceitos."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de MMC e MDC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de MMC e MDC</strong>{" "}
              utiliza{" "}
              <strong className="text-growth-green">fatoração prima e algoritmo de Euclides</strong>{" "}
              para calcular o Mínimo Múltiplo Comum e Máximo Divisor Comum com precisão matemática e
              resultados instantâneos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Cálculo simultâneo de MMC e MDC, fatoração prima
              completa, explicação passo a passo dos métodos utilizados e demonstração da relação
              fundamental entre os conceitos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e resolução de exercícios matemáticos. Use números inteiros
              positivos para obter resultados corretos. Explore também nossas calculadoras de
              <a
                href="/calculadoras/matematica/area-perimetro"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                área e perímetro
              </a>
              para complementar seus estudos matemáticos.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco educacional • 🔢 Fatoração Prima • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="equacao-segundo-grau" />
    </div>
  );
}
