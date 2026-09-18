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
import { useIndexNow } from "~/hooks/useIndexNow";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Frações 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora frações grátis: soma, subtração, multiplicação e divisão. Simplificação automática com resultados instantâneos.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
    },
    {
      property: "og:title",
      content: "Calculadora de Frações Online Gratuita - Operações Confiáveis 2026",
    },
    {
      property: "og:description",
      content:
        "Ferramenta online confiável para operações com frações: soma, subtração, multiplicação, divisão e simplificação automática. Gratuita para estudantes!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-fracoes.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Frações - Operações Matemáticas com Frações",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Frações Online Gratuita - Resultados Confiáveis",
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta educacional gratuita para operações com frações. Soma, subtração, multiplicação, divisão e simplificação instantânea. Ideal para estudos!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-fracoes.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Frações - Operações Matemáticas",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Calculadora Frações" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      name: "keywords",
      content: "calculadora frações, soma frações, divisão frações, simplificar frações, MMC, MDC",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Frações Online Gratuita - Operações Matemáticas 2026",
        description:
          "Ferramenta educacional online gratuita para realizar operações confiáveis com frações: soma, subtração, multiplicação, divisão e simplificação automática. Resultados instantâneos com explicação passo a passo.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
          name: "Calculadora de Frações Online Gratuita - Matemática Educacional",
          description:
            "Ferramenta educacional online para operações confiáveis com frações: soma, subtração, multiplicação, divisão e simplificação automática com explicação passo a passo.",
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
                name: "Frações",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Frações",
          description:
            "Operações matemáticas com frações: soma, subtração, multiplicação, divisão e simplificação",
          category: "Mathematics",
        },
        featureList: [
          "Soma de frações",
          "Subtração de frações",
          "Multiplicação de frações",
          "Divisão de frações",
          "Simplificação automática",
          "Conversão para decimal",
          "Número misto automático",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Explicação passo a passo",
          "Cálculo de MMC e MDC",
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
            name: "O que é uma fração?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Uma fração é um número que representa uma ou mais partes iguais de um todo. É formada por numerador (número superior) e denominador (número inferior), onde o denominador indica em quantas partes o todo foi dividido.",
            },
          },
          {
            "@type": "Question",
            name: "Por que o denominador não pode ser zero?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O denominador zero tornaria a fração indefinida matematicamente, pois representaria uma divisão por zero, que não é permitida na matemática. Sempre verifique se o denominador é diferente de zero.",
            },
          },
          {
            "@type": "Question",
            name: "Como somar e subtrair frações?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para somar ou subtrair frações, é necessário igualar os denominadores encontrando o MMC (Mínimo Múltiplo Comum). Depois, some ou subtraia apenas os numeradores, mantendo o denominador comum.",
            },
          },
          {
            "@type": "Question",
            name: "Como multiplicar e dividir frações?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para multiplicar frações, multiplique numerador com numerador e denominador com denominador. Para dividir frações, multiplique a primeira fração pelo inverso da segunda.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Frações",
        description:
          "Aprenda a realizar operações com frações de forma simples e confiável com nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Selecione a operação",
            text: "Escolha a operação desejada: soma, subtração, multiplicação ou divisão de frações.",
          },
          {
            "@type": "HowToStep",
            name: "Insira as frações",
            text: "Digite os numeradores e denominadores das duas frações nos campos correspondentes. Lembre-se que denominadores não podem ser zero.",
          },
          {
            "@type": "HowToStep",
            name: "Calcule o resultado",
            text: "Clique no botão 'Calcular' para obter o resultado da operação, a fração simplificada e a resolução passo a passo.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja a fração simplificada, o valor decimal equivalente, o número misto (quando aplicável) e acompanhe a resolução detalhada passo a passo.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Frações Online",
          },
        ],
      }),
    },
  ];
};

interface FractionResult {
  originalFractions: {
    fraction1: { numerator: number; denominator: number };
    fraction2: { numerator: number; denominator: number };
  };
  operation: "soma" | "subtracao" | "multiplicacao" | "divisao";
  result: {
    numerator: number;
    denominator: number;
    decimal: number;
    mixed?: { whole: number; numerator: number; denominator: number };
  };
  simplified: {
    numerator: number;
    denominator: number;
  };
  steps: string[];
  commonDenominator?: number;
}

interface ValidationErrors {
  numerator1?: string;
  denominator1?: string;
  numerator2?: string;
  denominator2?: string;
  operation?: string;
}

export default function FractionCalculator() {
  // Inputs para frações
  const [numerator1, setNumerator1] = useState("");
  const [denominator1, setDenominator1] = useState("");
  const [numerator2, setNumerator2] = useState("");
  const [denominator2, setDenominator2] = useState("");
  const [operation, setOperation] = useState<"soma" | "subtracao" | "multiplicacao" | "divisao">(
    "soma"
  );

  const [result, setResult] = useState<FractionResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "fracoes",
    category: "matematica",
  });
  useFormTracking("fracoes");

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

  // Funções auxiliares para frações
  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const simplifyFraction = (
    num: number,
    den: number
  ): { numerator: number; denominator: number } => {
    const divisor = gcd(num, den);
    let numerator = num / divisor;
    let denominator = den / divisor;

    // Se o denominador for negativo, move o sinal para o numerador
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }

    return { numerator, denominator };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const num1 = parseNumber(numerator1);
    const den1 = parseNumber(denominator1);
    const num2 = parseNumber(numerator2);
    const den2 = parseNumber(denominator2);

    if (numerator1.trim() === "") {
      newErrors.numerator1 = "Numerador da primeira fração é obrigatório";
      ok = false;
    }

    if (denominator1.trim() === "") {
      newErrors.denominator1 = "Denominador da primeira fração é obrigatório";
      ok = false;
    } else if (den1 === 0) {
      newErrors.denominator1 = "Denominador não pode ser zero";
      ok = false;
    }

    if (numerator2.trim() === "") {
      newErrors.numerator2 = "Numerador da segunda fração é obrigatório";
      ok = false;
    }

    if (denominator2.trim() === "") {
      newErrors.denominator2 = "Denominador da segunda fração é obrigatório";
      ok = false;
    } else if (den2 === 0) {
      newErrors.denominator2 = "Denominador não pode ser zero";
      ok = false;
    }

    // Validação especial para divisão: o segundo numerador não pode ser zero
    if (operation === "divisao" && num2 === 0) {
      newErrors.numerator2 = "Não é possível dividir por fração com numerador zero";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateFractions = (): FractionResult => {
    const num1 = parseNumber(numerator1);
    const den1 = parseNumber(denominator1);
    const num2 = parseNumber(numerator2);
    const den2 = parseNumber(denominator2);

    let resultNumerator: number;
    let resultDenominator: number;
    const steps: string[] = [];
    let commonDenominator: number | undefined;

    // Frações originais
    const fraction1 = { numerator: num1, denominator: den1 };
    const fraction2 = { numerator: num2, denominator: den2 };

    steps.push(`Fração 1: ${num1}/${den1}`);
    steps.push(`Fração 2: ${num2}/${den2}`);
    steps.push(
      `Operação: ${operation === "soma" ? "Soma" : operation === "subtracao" ? "Subtração" : operation === "multiplicacao" ? "Multiplicação" : "Divisão"}`
    );

    switch (operation) {
      case "soma":
        commonDenominator = lcm(den1, den2);
        const newNum1Sum = (num1 * commonDenominator) / den1;
        const newNum2Sum = (num2 * commonDenominator) / den2;
        resultNumerator = newNum1Sum + newNum2Sum;
        resultDenominator = commonDenominator;

        steps.push(`MMC(${den1}, ${den2}) = ${commonDenominator}`);
        steps.push(`${num1}/${den1} = ${newNum1Sum}/${commonDenominator}`);
        steps.push(`${num2}/${den2} = ${newNum2Sum}/${commonDenominator}`);
        steps.push(
          `${newNum1Sum}/${commonDenominator} + ${newNum2Sum}/${commonDenominator} = ${resultNumerator}/${resultDenominator}`
        );
        break;

      case "subtracao":
        commonDenominator = lcm(den1, den2);
        const newNum1Sub = (num1 * commonDenominator) / den1;
        const newNum2Sub = (num2 * commonDenominator) / den2;
        resultNumerator = newNum1Sub - newNum2Sub;
        resultDenominator = commonDenominator;

        steps.push(`MMC(${den1}, ${den2}) = ${commonDenominator}`);
        steps.push(`${num1}/${den1} = ${newNum1Sub}/${commonDenominator}`);
        steps.push(`${num2}/${den2} = ${newNum2Sub}/${commonDenominator}`);
        steps.push(
          `${newNum1Sub}/${commonDenominator} - ${newNum2Sub}/${commonDenominator} = ${resultNumerator}/${resultDenominator}`
        );
        break;

      case "multiplicacao":
        resultNumerator = num1 * num2;
        resultDenominator = den1 * den2;

        steps.push(`${num1}/${den1} × ${num2}/${den2} = (${num1} × ${num2})/(${den1} × ${den2})`);
        steps.push(`= ${resultNumerator}/${resultDenominator}`);
        break;

      case "divisao":
        // Divisão = multiplicação pelo inverso
        resultNumerator = num1 * den2;
        resultDenominator = den1 * num2;

        steps.push(`${num1}/${den1} ÷ ${num2}/${den2} = ${num1}/${den1} × ${den2}/${num2}`);
        steps.push(`= (${num1} × ${den2})/(${den1} × ${num2})`);
        steps.push(`= ${resultNumerator}/${resultDenominator}`);
        break;
    }

    // Simplificar o resultado
    const simplified = simplifyFraction(resultNumerator, resultDenominator);
    if (simplified.numerator !== resultNumerator || simplified.denominator !== resultDenominator) {
      const divisor = gcd(resultNumerator, resultDenominator);
      steps.push(
        `Simplificando por MDC(${Math.abs(resultNumerator)}, ${Math.abs(resultDenominator)}) = ${divisor}`
      );
      steps.push(
        `${resultNumerator}/${resultDenominator} = ${simplified.numerator}/${simplified.denominator}`
      );
    }

    // Calcular decimal
    const decimal = simplified.numerator / simplified.denominator;

    // Calcular número misto se necessário
    let mixed: { whole: number; numerator: number; denominator: number } | undefined;
    if (
      Math.abs(simplified.numerator) > Math.abs(simplified.denominator) &&
      simplified.denominator !== 1
    ) {
      const whole = Math.floor(Math.abs(simplified.numerator) / Math.abs(simplified.denominator));
      const remainder = Math.abs(simplified.numerator) % Math.abs(simplified.denominator);
      mixed = {
        whole: simplified.numerator < 0 ? -whole : whole,
        numerator: remainder,
        denominator: Math.abs(simplified.denominator),
      };
    }

    return {
      originalFractions: { fraction1, fraction2 },
      operation,
      result: {
        numerator: resultNumerator,
        denominator: resultDenominator,
        decimal,
        mixed,
      },
      simplified,
      steps,
      commonDenominator,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateFractions();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ numerator1: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setNumerator1("");
    setDenominator1("");
    setNumerator2("");
    setDenominator2("");
    setOperation("soma");
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
        <BreadcrumbItem isLast>Frações</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Frações 2026 – Soma, Subtração, Multiplicação e Divisão
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Realize <strong className="text-growth-green">operações com frações</strong> de forma
          simples e confiável. Calcule soma, subtração, multiplicação, divisão e simplificação com{" "}
          <strong className="text-primary-blue-dark">explicação passo a passo</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔢 <strong>Operações com Frações</strong> • 📊 <strong>Simplificação Automática</strong>{" "}
            • 🧮 <strong>Resultados Instantâneos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔢 Operações com Frações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">Selecione a operação e insira as frações:</p>
            <div className="mt-4">
              <select
                value={operation}
                onChange={(e) =>
                  setOperation(e.target.value as "soma" | "subtracao" | "multiplicacao" | "divisao")
                }
                className="mx-auto block rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-2 text-lg font-medium text-text-primary"
              >
                <option value="soma">+ Soma</option>
                <option value="subtracao">- Subtração</option>
                <option value="multiplicacao">× Multiplicação</option>
                <option value="divisao">÷ Divisão</option>
              </select>
            </div>
          </div>

          {/* Campos de entrada para frações */}
          <div className="mb-6 flex flex-wrap justify-center gap-8">
            {/* Primeira Fração */}
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h3 className="mb-3 text-center text-lg font-semibold text-primary-blue-dark">
                Primeira Fração
              </h3>
              <div className="space-y-3">
                <div>
                  <Input
                    type="number"
                    label="Numerador"
                    value={numerator1}
                    onChange={(e) => setNumerator1(e.target.value)}
                    placeholder="1"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.numerator1} />
                </div>
                <div className="text-center text-2xl font-bold text-primary-blue-dark">―</div>
                <div>
                  <Input
                    type="number"
                    label="Denominador"
                    value={denominator1}
                    onChange={(e) => setDenominator1(e.target.value)}
                    placeholder="2"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.denominator1} />
                  <div className="mt-1 text-xs text-text-secondary">Não pode ser zero</div>
                </div>
              </div>
            </div>

            {/* Operação */}
            <div className="flex items-center">
              <div className="text-4xl font-bold text-system-warning">
                {operation === "soma"
                  ? "+"
                  : operation === "subtracao"
                    ? "−"
                    : operation === "multiplicacao"
                      ? "×"
                      : "÷"}
              </div>
            </div>

            {/* Segunda Fração */}
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-3 text-center text-lg font-semibold text-growth-green">
                Segunda Fração
              </h3>
              <div className="space-y-3">
                <div>
                  <Input
                    type="number"
                    label="Numerador"
                    value={numerator2}
                    onChange={(e) => setNumerator2(e.target.value)}
                    placeholder="1"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.numerator2} />
                </div>
                <div className="text-center text-2xl font-bold text-growth-green">―</div>
                <div>
                  <Input
                    type="number"
                    label="Denominador"
                    value={denominator2}
                    onChange={(e) => setDenominator2(e.target.value)}
                    placeholder="3"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.denominator2} />
                  <div className="mt-1 text-xs text-text-secondary">Não pode ser zero</div>
                </div>
              </div>
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
              📊 Resultado da Operação com Frações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Operação</div>
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {result.originalFractions.fraction1.numerator}/
                  {result.originalFractions.fraction1.denominator}{" "}
                  {result.operation === "soma"
                    ? "+"
                    : result.operation === "subtracao"
                      ? "−"
                      : result.operation === "multiplicacao"
                        ? "×"
                        : "÷"}{" "}
                  {result.originalFractions.fraction2.numerator}/
                  {result.originalFractions.fraction2.denominator}
                  {" = "}
                  {result.simplified.numerator}/{result.simplified.denominator}
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-system-warning">
                  {result.simplified.numerator}/{result.simplified.denominator}
                </div>
                <div className="text-sm text-text-secondary">Fração Simplificada</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-xl font-bold text-growth-green">
                  {numberBR(result.result.decimal, 4)}
                </div>
                <div className="text-sm text-text-secondary">Decimal</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-xl font-bold text-primary-blue-dark">
                  {result.result.mixed
                    ? `${result.result.mixed.whole} ${result.result.mixed.numerator}/${result.result.mixed.denominator}`
                    : "Não aplicável"}
                </div>
                <div className="text-sm text-text-secondary">Número Misto</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Informações da Operação</h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>Operação:</strong>{" "}
                  {result.operation === "soma"
                    ? "Soma"
                    : result.operation === "subtracao"
                      ? "Subtração"
                      : result.operation === "multiplicacao"
                        ? "Multiplicação"
                        : "Divisão"}
                </div>
                {result.commonDenominator && (
                  <div>
                    <strong>MMC dos denominadores:</strong> {result.commonDenominator}
                  </div>
                )}
                <div>
                  <strong>Fração original:</strong> {result.result.numerator}/
                  {result.result.denominator}
                </div>
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

      {/* Seção: Equações de Segundo Grau - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Frações – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fórmula de Bhaskara */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Operações com Frações
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A fórmula de Bhaskara é utilizada para resolver equações de segundo grau do tipo
                    ax² + bx + c = 0, onde a ≠ 0.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Δ = b² - 4ac (discriminante)</li>
                    <li>• x = (-b ± √Δ) / 2a</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Resolve qualquer equação de 2º grau</li>
                    <li>• Baseada no discriminante (Δ)</li>
                    <li>• Determina natureza das raízes</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Física: movimento uniformemente variado</li>
                    <li>• Economia: maximização de lucros</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Discriminante Delta */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📐 Discriminante (Δ)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O discriminante determina a natureza das raízes da equação de segundo grau.
                    Calculado pela fórmula Δ = b² - 4ac.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Interpretação</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Δ &gt; 0: Duas raízes reais distintas</li>
                    <li>• Δ = 0: Uma raiz real dupla</li>
                    <li>• Δ &lt; 0: Duas raízes complexas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Importância</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Determina quantidade de soluções</li>
                    <li>• Indica se raízes são reais ou complexas</li>
                    <li>• Facilita análise prévia da equação</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Análise gráfica de parábolas</li>
                    <li>• Otimização em engenharia</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tipos de Raízes */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🔍 Tipos de Raízes
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Classificação</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    As raízes de uma equação de segundo grau podem ser reais ou complexas,
                    dependendo do valor do discriminante.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Tipos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Reais distintas (Δ &gt; 0)</li>
                    <li>• Real dupla (Δ = 0)</li>
                    <li>• Complexas conjugadas (Δ &lt; 0)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✅ Interpretação Gráfica
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Δ &gt; 0: Parábola corta eixo x em 2 pontos</li>
                    <li>• Δ = 0: Parábola toca eixo x em 1 ponto</li>
                    <li>• Δ &lt; 0: Parábola não toca eixo x</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Exemplos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• x² - 5x + 6 = 0 (Δ = 1 &gt; 0)</li>
                    <li>• x² - 4x + 4 = 0 (Δ = 0)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Métodos de Resolução */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Métodos de Resolução de Equações de 2º Grau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Fórmula de Bhaskara
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Fatoração</th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Completar Quadrado
                  </th>
                  <th className="p-3 text-center font-semibold text-system-info">Gráfico</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Aplicabilidade</td>
                  <td className="p-3 text-center text-primary-blue-dark">Universal</td>
                  <td className="p-3 text-center text-growth-green">Casos específicos</td>
                  <td className="p-3 text-center text-system-warning">Universal</td>
                  <td className="p-3 text-center text-system-info">Aproximado</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Dificuldade</td>
                  <td className="p-3 text-center">⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Detalhamento</td>
                  <td className="p-3 text-center text-primary-blue-dark">Exata</td>
                  <td className="p-3 text-center text-growth-green">Exata</td>
                  <td className="p-3 text-center text-system-warning">Exata</td>
                  <td className="p-3 text-center text-system-info">Aproximada</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Tempo de Resolução</td>
                  <td className="p-3 text-center">Rápido</td>
                  <td className="p-3 text-center">Muito Rápido</td>
                  <td className="p-3 text-center">Médio</td>
                  <td className="p-3 text-center">Lento</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Requisitos</td>
                  <td className="p-3 text-center">Fórmula memorizada</td>
                  <td className="p-3 text-center">Reconhecer padrões</td>
                  <td className="p-3 text-center">Técnica avançada</td>
                  <td className="p-3 text-center">Papel milimetrado</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Melhor Uso</td>
                  <td className="p-3 text-center text-primary-blue-dark">Geral</td>
                  <td className="p-3 text-center text-growth-green">Números inteiros</td>
                  <td className="p-3 text-center text-system-warning">Demonstrações</td>
                  <td className="p-3 text-center text-system-info">Visualização</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🔢 Bhaskara</h4>
              <p className="text-sm text-text-secondary">
                Método <strong>mais confiável</strong> para resolver qualquer equação de segundo
                grau, especialmente com coeficientes decimais. Saiba mais sobre
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
              <h4 className="mb-2 font-bold text-growth-green">⚡ Fatoração</h4>
              <p className="text-sm text-text-secondary">
                Ideal para equações com <strong>coeficientes inteiros</strong> pequenos que permitem
                fatoração simples.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">📐 Completar Quadrado</h4>
              <p className="text-sm text-text-secondary">
                Útil para <strong>compreender geometricamente</strong> e para demonstrações
                matemáticas avançadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Frações"
        items={[
          {
            question: "O que é uma fração?",
            answer:
              "Uma fração é um número que representa uma ou mais partes iguais de um todo. É formada por numerador (número superior) e denominador (número inferior), onde o denominador indica em quantas partes o todo foi dividido.",
            borderColor: "primary-blue",
          },
          {
            question: "Por que o denominador não pode ser zero?",
            answer:
              "O denominador zero tornaria a fração indefinida matematicamente, pois representaria uma divisão por zero, que não é permitida na matemática. Sempre verifique se o denominador é diferente de zero.",
            borderColor: "growth-green",
          },
          {
            question: "Como somar e subtrair frações?",
            answer:
              "Para somar ou subtrair frações, é necessário igualar os denominadores encontrando o MMC (Mínimo Múltiplo Comum). Depois, some ou subtraia apenas os numeradores, mantendo o denominador comum.",
            borderColor: "system-info",
          },
          {
            question: "Como multiplicar frações?",
            answer:
              "Para multiplicar frações, multiplique numerador com numerador e denominador com denominador: (a/b) × (c/d) = (a×c)/(b×d). Simplifique o resultado quando possível.",
            borderColor: "system-warning",
          },
          {
            question: "Como dividir frações?",
            answer:
              "Para dividir frações, multiplique a primeira fração pelo inverso da segunda: (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c). É o famoso 'multiplicar pelo inverso'.",
            borderColor: "growth-green",
          },
          {
            question: "O que é simplificar uma fração?",
            answer:
              "Simplificar uma fração significa reduzí-la à sua forma mais simples, dividindo numerador e denominador pelo seu MDC (Máximo Divisor Comum). Por exemplo: 6/8 = 3/4.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Frações",
          content:
            "<strong>Para melhores resultados:</strong> sempre verifique se os denominadores são diferentes de zero e simplifique o resultado final dividindo numerador e denominador pelo MDC.",
        }}
        footerText="<strong>Lembre-se:</strong> Em soma e subtração, iguale os denominadores. Em multiplicação e divisão, opere diretamente. Sempre simplifique o resultado."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Frações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de frações</strong>{" "}
              permite realizar{" "}
              <strong className="text-growth-green">operações básicas com frações</strong>: soma,
              subtração, multiplicação e divisão facilmente matemática e resultados instantâneos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Cálculo do discriminante (Δ), determinação do tipo
              de raízes, resolução passo a passo e apresentação de raízes reais ou complexas
              conforme o caso.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e resolução de exercícios. Para aplicações científicas ou de
              engenharia que exigem alta qualidade, consulte sempre um{" "}
              <strong>profissional qualificado</strong> e considere limitações numérica. Explore
              também nossas calculadoras de
              <a
                href="/calculadoras/matematica/area-perimetro"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                área e perímetro
              </a>
              para complementar seus estudos matemáticos.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco educacional • 🔢 Operações com Frações • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="fracoes" />
    </div>
  );
}
