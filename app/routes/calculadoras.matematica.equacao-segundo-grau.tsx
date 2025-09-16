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
      title: `Calculadora de Equação 2º Grau 2025 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Resolva equações 2º grau com Bhaskara. Calcule delta, raízes reais e complexas grátis. Ferramenta ideal para estudantes.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
    },
    {
      property: "og:title",
      content: "Calculadora de Equação de Segundo Grau 2025 – Fórmula de Bhaskara",
    },
    {
      property: "og:description",
      content:
        "Resolva equações de segundo grau usando a fórmula de Bhaskara. Calcule delta, raízes reais e complexas com explicação passo a passo.",
    },
    {
      property: "og:image",
      content:
        "https://www.calculadoraonlinebr.com.br/images/calculadora-equacao-segundo-grau.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Equação de Segundo Grau - Fórmula de Bhaskara e Delta",
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
      content:
        "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Equação de Segundo Grau 2025 – Fórmula de Bhaskara",
    },
    {
      name: "twitter:description",
      content:
        "Resolva equações de segundo grau usando a fórmula de Bhaskara. Calcule delta, raízes reais e complexas.",
    },
    {
      name: "twitter:image",
      content:
        "https://www.calculadoraonlinebr.com.br/images/calculadora-equacao-segundo-grau.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Equação de Segundo Grau - Fórmula de Bhaskara",
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
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Equação de Segundo Grau - Fórmula de Bhaskara 2025",
        description:
          "Calculadora gratuita e confiável para resolver equações de segundo grau usando a fórmula de Bhaskara. Calcule delta, raízes reais e complexas com explicação passo a passo.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-26",
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
          "@id":
            "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
          name: "Calculadora de Equação de Segundo Grau 2025 - Fórmula de Bhaskara",
          description:
            "Resolva equações de segundo grau usando a fórmula de Bhaskara. Calcule delta, raízes reais e complexas com explicação passo a passo.",
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
                name: "Equação de Segundo Grau",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Equações de Segundo Grau",
          description: "Fórmulas matemáticas para resolver equações quadráticas usando Bhaskara",
          category: "Mathematics",
        },
        featureList: [
          "Cálculo do discriminante (delta)",
          "Resolução de raízes reais",
          "Resolução de raízes complexas",
          "Fórmula de Bhaskara passo a passo",
          "Classificação do tipo de raízes",
          "Fórmulas matemáticas confiáveis",
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
            name: "O que é uma equação de segundo grau?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Uma equação de segundo grau é uma equação polinomial do tipo ax² + bx + c = 0, onde a ≠ 0. É chamada de segundo grau porque o maior expoente da variável x é 2.",
            },
          },
          {
            "@type": "Question",
            name: "O que é o discriminante (Delta) e para que serve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O discriminante (Δ) é calculado pela fórmula Δ = b² - 4ac. Ele determina a natureza das raízes: se Δ > 0, há duas raízes reais distintas; se Δ = 0, há uma raiz real dupla; se Δ < 0, há duas raízes complexas.",
            },
          },
          {
            "@type": "Question",
            name: "Por que o coeficiente 'a' não pode ser zero?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Se a = 0, a equação se torna bx + c = 0, que é uma equação de primeiro grau, não de segundo grau. Para ser classificada como equação de segundo grau, o termo x² deve estar presente.",
            },
          },
          {
            "@type": "Question",
            name: "A fórmula de Bhaskara sempre funciona?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, a fórmula de Bhaskara funciona para qualquer equação de segundo grau com coeficientes reais. É um método universal que sempre encontra as raízes, sejam elas reais ou complexas.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Equação de Segundo Grau",
        description:
          "Aprenda a resolver equações de segundo grau usando a fórmula de Bhaskara com nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Identifique os coeficientes",
            text: "Na equação ax² + bx + c = 0, identifique os valores dos coeficientes a, b e c.",
          },
          {
            "@type": "HowToStep",
            name: "Insira os coeficientes",
            text: "Digite os valores dos coeficientes a, b e c nos campos correspondentes. Lembre-se que a ≠ 0.",
          },
          {
            "@type": "HowToStep",
            name: "Calcule a solução",
            text: "Clique no botão 'Calcular' para obter o discriminante (Δ), as raízes e a resolução passo a passo.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja o valor do Delta, o tipo de raízes obtidas e acompanhe a resolução detalhada usando a fórmula de Bhaskara.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Equação de Segundo Grau Online",
          },
        ],
      }),
    },
  ];
};

interface QuadraticResult {
  delta: number;
  roots: {
    x1: number | string;
    x2: number | string;
  };
  rootType: "real_different" | "real_equal" | "complex";
  equation: string;
  steps: string[];
  coefficients: {
    a: number;
    b: number;
    c: number;
  };
}

interface ValidationErrors {
  a?: string;
  b?: string;
  c?: string;
}

export default function QuadraticEquationCalculator() {
  // Inputs para coeficientes da equação de segundo grau
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const [result, setResult] = useState<QuadraticResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "equacao-segundo-grau",
    category: "matematica",
  });
  useFormTracking("equacao-segundo-grau");

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

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const aValue = parseNumber(a);
    const bValue = parseNumber(b);
    const cValue = parseNumber(c);

    if (aValue === 0) {
      newErrors.a = "Coeficiente 'a' não pode ser zero (equação de segundo grau)";
      ok = false;
    }

    if (a.trim() === "") {
      newErrors.a = "Coeficiente 'a' é obrigatório";
      ok = false;
    }

    if (b.trim() === "") {
      newErrors.b = "Coeficiente 'b' é obrigatório";
      ok = false;
    }

    if (c.trim() === "") {
      newErrors.c = "Coeficiente 'c' é obrigatório";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateQuadratic = (): QuadraticResult => {
    const aValue = parseNumber(a);
    const bValue = parseNumber(b);
    const cValue = parseNumber(c);

    // Calcular o discriminante (delta)
    const delta = bValue * bValue - 4 * aValue * cValue;

    // Determinar o tipo de raízes
    let rootType: "real_different" | "real_equal" | "complex";
    let roots: { x1: number | string; x2: number | string };

    if (delta > 0) {
      rootType = "real_different";
      const x1 = (-bValue + Math.sqrt(delta)) / (2 * aValue);
      const x2 = (-bValue - Math.sqrt(delta)) / (2 * aValue);
      roots = { x1, x2 };
    } else if (delta === 0) {
      rootType = "real_equal";
      const x = -bValue / (2 * aValue);
      roots = { x1: x, x2: x };
    } else {
      rootType = "complex";
      const realPart = -bValue / (2 * aValue);
      const imagPart = Math.sqrt(-delta) / (2 * aValue);
      roots = {
        x1: `${numberBR(realPart, 4)} + ${numberBR(imagPart, 4)}i`,
        x2: `${numberBR(realPart, 4)} - ${numberBR(imagPart, 4)}i`,
      };
    }

    // Montar a equação
    let equation = `${aValue}x²`;
    if (bValue >= 0) equation += ` + ${bValue}x`;
    else equation += ` - ${Math.abs(bValue)}x`;
    if (cValue >= 0) equation += ` + ${cValue}`;
    else equation += ` - ${Math.abs(cValue)}`;
    equation += " = 0";

    // Passos da resolução
    const steps = [
      `Equação: ${equation}`,
      `Coeficientes: a = ${aValue}, b = ${bValue}, c = ${cValue}`,
      `Δ = b² - 4ac = (${bValue})² - 4(${aValue})(${cValue})`,
      `Δ = ${bValue * bValue} - ${4 * aValue * cValue} = ${delta}`,
    ];

    if (delta > 0) {
      steps.push(
        `Como Δ > 0, existem duas raízes reais e distintas`,
        `x₁ = (-b + √Δ) / 2a = (${-bValue} + √${delta}) / ${2 * aValue} = ${numberBR(roots.x1 as number, 4)}`,
        `x₂ = (-b - √Δ) / 2a = (${-bValue} - √${delta}) / ${2 * aValue} = ${numberBR(roots.x2 as number, 4)}`
      );
    } else if (delta === 0) {
      steps.push(
        `Como Δ = 0, existe uma raiz real dupla`,
        `x = -b / 2a = ${-bValue} / ${2 * aValue} = ${numberBR(roots.x1 as number, 4)}`
      );
    } else {
      steps.push(
        `Como Δ < 0, existem duas raízes complexas conjugadas`,
        `x₁ = ${roots.x1}`,
        `x₂ = ${roots.x2}`
      );
    }

    return {
      delta,
      roots,
      rootType,
      equation,
      steps,
      coefficients: { a: aValue, b: bValue, c: cValue },
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateQuadratic();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ a: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setA("");
    setB("");
    setC("");
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
        <BreadcrumbItem isLast>Equação de Segundo Grau</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Equação de Segundo Grau 2025 – Fórmula de Bhaskara
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva <strong className="text-growth-green">equações de segundo grau</strong> usando a{" "}
          fórmula de Bhaskara facilmente. Calcule delta, raízes reais e complexas com{" "}
          <strong className="text-primary-blue-dark">explicação passo a passo</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔢 <strong>Fórmula de Bhaskara</strong> • 📊 <strong>Delta e Raízes</strong> • 🧮{" "}
            <strong>Resultados Instantâneos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔢 Coeficientes da Equação ax² + bx + c = 0</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">
              Insira os coeficientes da equação de segundo grau no formato:
            </p>
            <div className="mt-2 rounded-lg bg-primary-blue-light p-3">
              <span className="text-xl font-bold text-primary-blue-dark">ax² + bx + c = 0</span>
            </div>
          </div>

          {/* Campos de entrada para coeficientes */}
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <div className="w-48">
              <Input
                type="number"
                label="Coeficiente a"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="1"
                fullWidth
                className="h-12 text-lg"
                step="any"
              />
              <ErrorMessage error={errors.a} />
              <div className="mt-1 text-xs text-text-secondary">
                Coeficiente do termo x² (não pode ser zero)
              </div>
            </div>
            <div className="w-48">
              <Input
                type="number"
                label="Coeficiente b"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="0"
                fullWidth
                className="h-12 text-lg"
                step="any"
              />
              <ErrorMessage error={errors.b} />
              <div className="mt-1 text-xs text-text-secondary">Coeficiente do termo x</div>
            </div>
            <div className="w-48">
              <Input
                type="number"
                label="Coeficiente c"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="0"
                fullWidth
                className="h-12 text-lg"
                step="any"
              />
              <ErrorMessage error={errors.c} />
              <div className="mt-1 text-xs text-text-secondary">Termo independente</div>
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
              📊 Resultado da Equação de Segundo Grau
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Equação</div>
                <div className="text-2xl font-bold text-primary-blue-dark">{result.equation}</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-system-warning">
                  {numberBR(result.delta, 2)}
                </div>
                <div className="text-sm text-text-secondary">Delta (Δ)</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-xl font-bold text-growth-green">
                  {typeof result.roots.x1 === "number"
                    ? numberBR(result.roots.x1, 4)
                    : result.roots.x1}
                </div>
                <div className="text-sm text-text-secondary">Raiz x₁</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-xl font-bold text-primary-blue-dark">
                  {typeof result.roots.x2 === "number"
                    ? numberBR(result.roots.x2, 4)
                    : result.roots.x2}
                </div>
                <div className="text-sm text-text-secondary">Raiz x₂</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Tipo de Raízes</h4>
              <div className="text-sm text-text-secondary">
                {result.rootType === "real_different" && "Duas raízes reais e distintas (Δ > 0)"}
                {result.rootType === "real_equal" && "Uma raiz real dupla (Δ = 0)"}
                {result.rootType === "complex" && "Duas raízes complexas conjugadas (Δ < 0)"}
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
            🎯 Equações de Segundo Grau – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fórmula de Bhaskara */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Fórmula de Bhaskara
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
        title="Perguntas Frequentes - Calculadora de Equação de Segundo Grau"
        items={[
          {
            question: "O que é uma equação de segundo grau?",
            answer:
              "Uma equação de segundo grau é uma equação polinomial do tipo ax² + bx + c = 0, onde a ≠ 0. É chamada de segundo grau porque o maior expoente da variável x é 2.",
            borderColor: "primary-blue",
          },
          {
            question: "O que é o discriminante (Delta) e para que serve?",
            answer:
              "O discriminante (Δ) é calculado pela fórmula Δ = b² - 4ac. Ele determina a natureza das raízes: se Δ > 0, há duas raízes reais distintas; se Δ = 0, há uma raiz real dupla; se Δ < 0, há duas raízes complexas.",
            borderColor: "growth-green",
          },
          {
            question: "Por que o coeficiente 'a' não pode ser zero?",
            answer:
              "Se a = 0, a equação se torna bx + c = 0, que é uma equação de primeiro grau, não de segundo grau. Para ser classificada como equação de segundo grau, o termo x² deve estar presente.",
            borderColor: "system-info",
          },
          {
            question: "Como interpretar raízes complexas?",
            answer:
              "Raízes complexas aparecem quando Δ < 0. Elas são da forma a + bi e a - bi, onde i é a unidade imaginária. Isso significa que a parábola não cruza o eixo x no plano real.",
            borderColor: "system-warning",
          },
          {
            question: "Quais são as aplicações práticas da equação de segundo grau?",
            answer:
              "Equações de segundo grau são usadas em física (movimento de projéteis), engenharia (otimização de estruturas), economia (maximização de lucros), e geometria (problemas de área).",
            borderColor: "growth-green",
          },
          {
            question: "A fórmula de Bhaskara sempre funciona?",
            answer:
              "Sim, a fórmula de Bhaskara funciona para qualquer equação de segundo grau com coeficientes reais. É um método universal que sempre encontra as raízes, sejam elas reais ou complexas.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Equações de Segundo Grau",
          content:
            "<strong>Para melhores resultados:</strong> sempre verifique se a ≠ 0 e calcule primeiro o discriminante para entender a natureza das raízes antes de aplicar a fórmula de Bhaskara.",
        }}
        footerText="<strong>Lembre-se:</strong> O discriminante (Δ) determina o tipo de raízes. Bhaskara sempre funciona, mas analise primeiro o Δ para compreender o resultado."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Equação de Segundo Grau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">
                calculadora de equação de segundo grau
              </strong>{" "}
              utiliza a <strong className="text-growth-green">fórmula de Bhaskara</strong> para
              resolver equações do tipo ax² + bx + c = 0 facilmente matemática e resultados
              instantâneos.
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
              🔎 Foco educacional • 🔢 Fórmula de Bhaskara • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="equacao-segundo-grau" />
    </div>
  );
}
