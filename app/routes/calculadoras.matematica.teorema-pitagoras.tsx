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
      title: "Teorema Pitágoras 2025 – Hipotenusa e Catetos",
    },
    {
      name: "description",
      content:
        "Calcule hipotenusa e catetos de triângulos retângulos com Teorema Pitágoras. Fórmulas confiáveis e resultados instantâneos para estudos.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/teorema-pitagoras",
    },
    {
      property: "og:title",
      content: "Calculadora do Teorema de Pitágoras 2025 – Hipotenusa e Catetos",
    },
    {
      property: "og:description",
      content:
        "Calcule hipotenusa e catetos de triângulos retângulos usando o Teorema de Pitágoras. Fórmulas matemáticas confiáveis e resultados instantâneos.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-teorema-pitagoras.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora do Teorema de Pitágoras - Triângulos retângulos: hipotenusa e catetos",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/teorema-pitagoras",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora do Teorema de Pitágoras 2025 – Hipotenusa e Catetos",
    },
    {
      name: "twitter:description",
      content:
        "Calcule hipotenusa e catetos de triângulos retângulos com o Teorema de Pitágoras. Fórmulas matemáticas confiáveis.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-teorema-pitagoras.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora do Teorema de Pitágoras - Triângulos retângulos",
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
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Área e Perímetro - Formas Geométricas 2025",
        description:
          "Calculadora gratuita e confiável de área e perímetro para diferentes formas geométricas: retângulo, círculo, triângulo, quadrado e trapézio. Fórmulas matemáticas exatas.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-30",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
          name: "Calculadora de Área e Perímetro 2025 - Formas Geométricas",
          description:
            "Calcule área e perímetro de formas geométricas: retângulo, círculo, triângulo, quadrado, trapézio. Fórmulas confiáveis e resultados instantâneos.",
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
                name: "Área e Perímetro",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Teorema de Pitágoras e Triângulos Retângulos",
          description:
            "Fórmulas matemáticas para calcular hipotenusa e catetos usando o Teorema de Pitágoras",
          category: "Mathematics",
          sameAs: [
            "https://pt.wikipedia.org/wiki/Teorema_de_Pitágoras",
            "https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pythagorean-theorem",
          ],
        },
        featureList: [
          "Cálculo de hipotenusa usando h² = a² + b²",
          "Cálculo de catetos usando c² = h² - a²",
          "Verificação automática dos resultados",
          "Cálculos passo a passo detalhados",
          "Validação de triângulos retângulos",
          "Fórmulas matemáticas confiáveis do teorema",
          "Cálculo de hipotenusa usando h² = a² + b²",
          "Cálculo de catetos usando c² = h² - a²",
          "Verificação automática dos resultados",
          "Cálculos passo a passo detalhados",
          "Validação de triângulos retângulos",
          "Fórmulas matemáticas confiáveis do teorema",
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
            name: "O que é área e perímetro?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Área é a medida da superfície de uma figura geométrica (em unidades²). Perímetro é a soma das medidas de todos os lados da figura (em unidades lineares).",
            },
          },
          {
            "@type": "Question",
            name: "Por que π (pi) é usado no círculo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "π (pi) é a razão entre a circunferência e o diâmetro de qualquer círculo, sempre igual a aproximadamente 3,14159. É uma constante matemática fundamental para cálculos circulares.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular área de triângulos irregulares?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para triângulos irregulares, use a fórmula da área: (base × altura) ÷ 2. A altura deve ser perpendicular à base escolhida. Para o perímetro, some todos os três lados.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre quadrado e retângulo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Quadrado tem todos os lados iguais, então área = lado² e perímetro = 4 × lado. Retângulo tem lados opostos iguais, então área = comprimento × largura e perímetro = 2 × (comprimento + largura).",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Área e Perímetro",
        description:
          "Aprenda a calcular área e perímetro de formas geométricas usando nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Selecione a forma geométrica",
            text: "Escolha entre retângulo, círculo, triângulo, quadrado ou trapézio usando os botões de seleção.",
          },
          {
            "@type": "HowToStep",
            name: "Insira as dimensões",
            text: "Digite as medidas necessárias para a forma escolhida (comprimento, largura, raio, lados, etc.).",
          },
          {
            "@type": "HowToStep",
            name: "Calcule os resultados",
            text: "Clique no botão 'Calcular' para obter instantaneamente a área, perímetro e fórmulas utilizadas.",
          },
          {
            "@type": "HowToStep",
            name: "Visualize os resultados",
            text: "Veja os valores calculados com as fórmulas matemáticas e dimensões utilizadas no cálculo.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Área e Perímetro Online",
          },
        ],
      }),
    },
  ];
};

type CalculationType = "hipotenusa" | "cateto";

interface PythagoreanResult {
  hypotenuse?: number;
  missingCathetus?: number;
  formula: string;
  calculation: string;
  verification: string;
  dimensions: {
    cathetus1: number;
    cathetus2: number;
    hypotenuse: number;
  };
}

interface ValidationErrors {
  cathetus1?: string;
  cathetus2?: string;
  hypotenuse?: string;
}

export default function PythagoreanTheoremCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>("hipotenusa");

  // Inputs para Teorema de Pitágoras
  const [cathetus1, setCathetus1] = useState("");
  const [cathetus2, setCathetus2] = useState("");
  const [hypotenuse, setHypotenuse] = useState("");

  const [result, setResult] = useState<PythagoreanResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "teorema-pitagoras",
    category: "matematica",
  });
  useFormTracking("teorema-pitagoras");

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

    if (calculationType === "hipotenusa") {
      const c1 = parseNumber(cathetus1);
      const c2 = parseNumber(cathetus2);

      if (c1 <= 0) {
        newErrors.cathetus1 = "Cateto 1 deve ser maior que 0";
        ok = false;
      }
      if (c2 <= 0) {
        newErrors.cathetus2 = "Cateto 2 deve ser maior que 0";
        ok = false;
      }
    }

    if (calculationType === "cateto") {
      const h = parseNumber(hypotenuse);
      const c1 = parseNumber(cathetus1);

      if (h <= 0) {
        newErrors.hypotenuse = "Hipotenusa deve ser maior que 0";
        ok = false;
      }
      if (c1 <= 0) {
        newErrors.cathetus1 = "Cateto conhecido deve ser maior que 0";
        ok = false;
      }
      if (h <= c1) {
        newErrors.hypotenuse = "Hipotenusa deve ser maior que o cateto";
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  };

  const calculatePythagorean = (): PythagoreanResult => {
    const c1 = parseNumber(cathetus1);
    const c2 = parseNumber(cathetus2);
    const h = parseNumber(hypotenuse);

    let result: PythagoreanResult;

    if (calculationType === "hipotenusa") {
      // Calcular hipotenusa: h² = c1² + c2²
      const hypotenuseValue = Math.sqrt(c1 * c1 + c2 * c2);
      result = {
        hypotenuse: hypotenuseValue,
        formula: "h² = a² + b²",
        calculation: `h² = ${c1}² + ${c2}² = ${c1 * c1} + ${c2 * c2} = ${c1 * c1 + c2 * c2}`,
        verification: `Verificação: ${c1}² + ${c2}² = ${Math.round((c1 * c1 + c2 * c2) * 10000) / 10000} e ${hypotenuseValue.toFixed(4)}² = ${Math.round(hypotenuseValue * hypotenuseValue * 10000) / 10000}`,
        dimensions: {
          cathetus1: c1,
          cathetus2: c2,
          hypotenuse: hypotenuseValue,
        },
      };
    } else {
      // Calcular cateto: c² = h² - a²
      const cathetusValue = Math.sqrt(h * h - c1 * c1);
      result = {
        missingCathetus: cathetusValue,
        formula: "c² = h² - a²",
        calculation: `c² = ${h}² - ${c1}² = ${h * h} - ${c1 * c1} = ${h * h - c1 * c1}`,
        verification: `Verificação: ${c1}² + ${cathetusValue.toFixed(4)}² = ${Math.round((c1 * c1 + cathetusValue * cathetusValue) * 10000) / 10000} e ${h}² = ${h * h}`,
        dimensions: {
          cathetus1: c1,
          cathetus2: cathetusValue,
          hypotenuse: h,
        },
      };
    }

    return result;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculatePythagorean();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ cathetus1: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setCathetus1("");
    setCathetus2("");
    setHypotenuse("");
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
        <BreadcrumbItem isLast>Teorema de Pitágoras</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora do Teorema de Pitágoras 2025
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a <strong className="text-growth-green">hipotenusa ou cateto</strong> de
          triângulos retângulos usando o{" "}
          <strong className="text-primary-blue-dark">Teorema de Pitágoras</strong> com fórmulas
          matemáticas confiáveis para seus estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📐 <strong>Teorema de Pitágoras</strong> • 🔺 <strong>Triângulos Retângulos</strong> •
            🧮 <strong>Cálculos Confiáveis</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📐 Calculadora do Teorema de Pitágoras</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Seleção do Tipo de Cálculo */}
          <div className="mb-6 text-center">
            <p className="mb-4 text-lg text-text-secondary">Selecione o que deseja calcular:</p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setCalculationType("hipotenusa")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition ${
                  calculationType === "hipotenusa"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                🔺 Calcular Hipotenusa
              </button>
              <button
                type="button"
                onClick={() => setCalculationType("cateto")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition ${
                  calculationType === "cateto"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                📐 Calcular Cateto
              </button>
            </div>
          </div>

          {/* Campos de entrada conforme o tipo de cálculo */}
          <div className="mb-6">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
                {calculationType === "hipotenusa"
                  ? "📐 Insira os dois catetos para calcular a hipotenusa"
                  : "📏 Insira a hipotenusa e um cateto para calcular o cateto faltante"}
              </h3>

              <div className="flex flex-wrap justify-center gap-4">
                {calculationType === "hipotenusa" && (
                  <>
                    <div className="w-48">
                      <Input
                        type="number"
                        label="Cateto 1 (a)"
                        value={cathetus1}
                        onChange={(e) => setCathetus1(e.target.value)}
                        placeholder="3"
                        fullWidth
                        className="h-12 text-lg"
                        step="any"
                      />
                      <ErrorMessage error={errors.cathetus1} />
                      <div className="mt-1 text-xs text-text-secondary">
                        Primeiro lado perpendicular
                      </div>
                    </div>
                    <div className="w-48">
                      <Input
                        type="number"
                        label="Cateto 2 (b)"
                        value={cathetus2}
                        onChange={(e) => setCathetus2(e.target.value)}
                        placeholder="4"
                        fullWidth
                        className="h-12 text-lg"
                        step="any"
                      />
                      <ErrorMessage error={errors.cathetus2} />
                      <div className="mt-1 text-xs text-text-secondary">
                        Segundo lado perpendicular
                      </div>
                    </div>
                  </>
                )}

                {calculationType === "cateto" && (
                  <>
                    <div className="w-48">
                      <Input
                        type="number"
                        label="Hipotenusa (h)"
                        value={hypotenuse}
                        onChange={(e) => setHypotenuse(e.target.value)}
                        placeholder="5"
                        fullWidth
                        className="h-12 text-lg"
                        step="any"
                      />
                      <ErrorMessage error={errors.hypotenuse} />
                      <div className="mt-1 text-xs text-text-secondary">
                        Lado oposto ao ângulo reto
                      </div>
                    </div>
                    <div className="w-48">
                      <Input
                        type="number"
                        label="Cateto Conhecido (a)"
                        value={cathetus1}
                        onChange={(e) => setCathetus1(e.target.value)}
                        placeholder="3"
                        fullWidth
                        className="h-12 text-lg"
                        step="any"
                      />
                      <ErrorMessage error={errors.cathetus1} />
                      <div className="mt-1 text-xs text-text-secondary">
                        Cateto que você já conhece
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 text-center">
                <div className="text-lg font-medium text-primary-blue-dark">
                  {calculationType === "hipotenusa"
                    ? "Fórmula: h² = a² + b²"
                    : "Fórmula: c² = h² - a²"}
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
              📊 Resultado do Teorema de Pitágoras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Fórmula Utilizada</div>
                <div className="text-xl font-bold text-primary-blue-dark">{result.formula}</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-system-warning">
                  {result.hypotenuse
                    ? numberBR(result.hypotenuse, 4)
                    : numberBR(result.missingCathetus!, 4)}
                </div>
                <div className="text-sm text-text-secondary">
                  {calculationType === "hipotenusa" ? "Hipotenusa (h)" : "Cateto Faltante (c)"}
                </div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-lg font-bold text-growth-green">
                  {calculationType === "hipotenusa" ? "h² = a² + b²" : "c² = h² - a²"}
                </div>
                <div className="text-sm text-text-secondary">Tipo de Cálculo</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Cálculo Passo a Passo</h4>
              <div className="text-sm text-text-secondary">
                <div className="mb-2">
                  <strong>Cálculo:</strong> {result.calculation}
                </div>
                <div>
                  <strong>Resultado:</strong> √
                  {Math.round((result.hypotenuse || result.missingCathetus!) ** 2 * 10000) / 10000}{" "}
                  ={" "}
                  {result.hypotenuse
                    ? numberBR(result.hypotenusa, 4)
                    : numberBR(result.missingCathetus!, 4)}
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <h4 className="mb-2 font-semibold text-growth-green">Verificação</h4>
              <div className="text-sm text-text-secondary">{result.verification}</div>
            </div>

            <div className="rounded-lg bg-system-info/10 p-4">
              <h4 className="mb-2 font-semibold text-system-info">Dimensões do Triângulo</h4>
              <div className="grid grid-cols-3 gap-4 text-sm text-text-secondary">
                <div className="text-center">
                  <div className="font-semibold">Cateto 1 (a)</div>
                  <div className="text-lg font-bold text-primary-blue-dark">
                    {numberBR(result.dimensions.cathetus1, 4)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Cateto 2 (b)</div>
                  <div className="text-lg font-bold text-primary-blue-dark">
                    {numberBR(result.dimensions.cathetus2, 4)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Hipotenusa (h)</div>
                  <div className="text-lg font-bold text-system-warning">
                    {numberBR(result.dimensions.hypotenuse, 4)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Teorema de Pitágoras - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Teorema de Pitágoras – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito do Teorema */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 O Teorema de Pitágoras
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O Teorema de Pitágoras estabelece que em um triângulo retângulo, o quadrado da
                    hipotenusa é igual à soma dos quadrados dos catetos: h² = a² + b².
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Hipotenusa: h² = a² + b²</li>
                    <li>• Cateto: c² = h² - a²</li>
                    <li>• Verificação: a² + b² = h²</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Aplica-se apenas a triângulos retângulos</li>
                    <li>• Hipotenusa é sempre o maior lado</li>
                    <li>• Catetos são perpendiculares entre si</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Cálculos de distâncias</li>
                    <li>• Construção e arquitetura</li>
                    <li>• Navegação e GPS</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Triângulo Retângulo */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔺 Triângulo Retângulo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Triângulo que possui um ângulo reto (90°). Os dois lados que formam o ângulo
                    reto são os catetos, e o lado oposto é a hipotenusa.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Elementos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Catetos: lados perpendiculares</li>
                    <li>• Hipotenusa: maior lado, oposto ao ângulo reto</li>
                    <li>• Ângulo reto: exatamente 90°</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Propriedades</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Soma dos ângulos = 180°</li>
                    <li>• Um ângulo = 90°, outros dois &lt; 90°</li>
                    <li>• Hipotenusa &gt; qualquer cateto</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Exemplos Clássicos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Triângulo 3-4-5</li>
                    <li>• Triângulo 5-12-13</li>
                    <li>• Triângulo 8-15-17</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* História e Aplicações */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                📚 História e Aplicações
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📜 História</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Atribuído ao matemático grego Pitágoras (século VI a.C.), embora civilizações
                    anteriores já conhecessem essa relação matemática.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">🏛️ Civilizações Antigas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Babilônios (2000 a.C.)</li>
                    <li>• Egípcios (construção de pirâmides)</li>
                    <li>• Chineses (Zhōubì Suànjīng)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações Modernas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Engenharia civil e arquitetura</li>
                    <li>• Sistemas de navegação GPS</li>
                    <li>• Gráficos computacionais e jogos</li>
                    <li>• Física e astronomia</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">🔧 Exemplos Práticos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Calcular diagonal de telas</li>
                    <li>• Medir distâncias indiretas</li>
                    <li>• Verificar esquadros na construção</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Exemplos Práticos do Teorema */}
      {/* Seção: Exemplos Práticos do Teorema */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Exemplos Práticos: Aplicações do Teorema de Pitágoras ⚖️ Exemplos Práticos:
            Aplicações do Teorema de Pitágoras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Situação</th>
                  <th className="p-3 text-left font-semibold">Situação</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Escada na Parede Escada na Parede
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Diagonal TV</th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Distância GPS
                  </th>
                  <th className="p-3 text-center font-semibold text-system-info">Construção</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Cateto 1</td>
                  <td className="p-3 text-center text-primary-blue-dark">Altura da parede</td>
                  <td className="p-3 text-center text-growth-green">Largura</td>
                  <td className="p-3 text-center text-system-warning">Distância Norte</td>
                  <td className="p-3 text-center text-system-info">Comprimento base</td>
                  <td className="p-3 font-medium">Cateto 1</td>
                  <td className="p-3 text-center text-primary-blue-dark">Altura da parede</td>
                  <td className="p-3 text-center text-growth-green">Largura</td>
                  <td className="p-3 text-center text-system-warning">Distância Norte</td>
                  <td className="p-3 text-center text-system-info">Comprimento base</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Cateto 2</td>
                  <td className="p-3 text-center">Distância da base</td>
                  <td className="p-3 text-center">Altura</td>
                  <td className="p-3 text-center">Distância Leste</td>
                  <td className="p-3 text-center">Altura do telhado</td>
                  <td className="p-3 font-medium">Cateto 2</td>
                  <td className="p-3 text-center">Distância da base</td>
                  <td className="p-3 text-center">Altura</td>
                  <td className="p-3 text-center">Distância Leste</td>
                  <td className="p-3 text-center">Altura do telhado</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Hipotenusa</td>
                  <td className="p-3 text-center text-primary-blue-dark">Comprimento escada</td>
                  <td className="p-3 text-center text-growth-green">Diagonal da tela</td>
                  <td className="p-3 text-center text-system-warning">Distância direta</td>
                  <td className="p-3 text-center text-system-info">Viga diagonal</td>
                  <td className="p-3 font-medium">Hipotenusa</td>
                  <td className="p-3 text-center text-primary-blue-dark">Comprimento escada</td>
                  <td className="p-3 text-center text-growth-green">Diagonal da tela</td>
                  <td className="p-3 text-center text-system-warning">Distância direta</td>
                  <td className="p-3 text-center text-system-info">Viga diagonal</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Exemplo</td>
                  <td className="p-3 text-center">3m + 4m = 5m</td>
                  <td className="p-3 text-center">40" + 30" = 50"</td>
                  <td className="p-3 text-center">60km + 80km = 100km</td>
                  <td className="p-3 text-center">6m + 8m = 10m</td>
                  <td className="p-3 font-medium">Exemplo</td>
                  <td className="p-3 text-center">3m + 4m = 5m</td>
                  <td className="p-3 text-center">40" + 30" = 50"</td>
                  <td className="p-3 text-center">60km + 80km = 100km</td>
                  <td className="p-3 text-center">6m + 8m = 10m</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Aplicação</td>
                  <td className="p-3 text-center text-primary-blue-dark">Segurança</td>
                  <td className="p-3 text-center text-growth-green">Especificação</td>
                  <td className="p-3 text-center text-system-warning">Navegação</td>
                  <td className="p-3 text-center text-system-info">Estrutural</td>
                  <td className="p-3 font-medium">Aplicação</td>
                  <td className="p-3 text-center text-primary-blue-dark">Segurança</td>
                  <td className="p-3 text-center text-growth-green">Especificação</td>
                  <td className="p-3 text-center text-system-warning">Navegação</td>
                  <td className="p-3 text-center text-system-info">Estrutural</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🏗️ Construção Civil</h4>
              <h4 className="mb-2 font-bold text-primary-blue-dark">🏗️ Construção Civil</h4>
              <p className="text-sm text-text-secondary">
                Use o <strong>Teorema de Pitágoras</strong> para verificar esquadros, calcular vigas
                diagonais e garantir ângulos retos em estruturas.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">📐 Engenharia</h4>
              <h4 className="mb-2 font-bold text-growth-green">📐 Engenharia</h4>
              <p className="text-sm text-text-secondary">
                Aplicação em <strong>cálculos de distâncias</strong>, dimensionamento de estruturas
                triangulares e verificação de medidas.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🗺️ Navegação</h4>
              <h4 className="mb-2 font-bold text-system-warning">🗺️ Navegação</h4>
              <p className="text-sm text-text-secondary">
                Usado em <strong>sistemas GPS</strong> para calcular distâncias diretas entre dois
                pontos com coordenadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora do Teorema de Pitágoras"
        items={[
          {
            question: "O que é o Teorema de Pitágoras?",
            answer:
              "O Teorema de Pitágoras estabelece que em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos dois catetos: h² = a² + b².",
            borderColor: "primary-blue",
          },
          {
            question: "O que são catetos e hipotenusa?",
            answer:
              "Catetos são os dois lados do triângulo retângulo que formam o ângulo reto (90°). A hipotenusa é o lado oposto ao ângulo reto e sempre o maior lado do triângulo.",
            borderColor: "growth-green",
          },
          {
            question: "Como identificar um triângulo retângulo?",
            answer:
              "Um triângulo é retângulo quando possui um ângulo de exatamente 90°. Você pode verificar usando o Teorema de Pitágoras: se h² = a² + b², então é retângulo.",
            borderColor: "system-info",
          },
          {
            question: "Quais são os triângulos pitagóricos mais comuns?",
            answer:
              "Os triângulos pitagóricos mais conhecidos são: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Estes possuem lados com medidas inteiras que satisfazem o teorema.",
            borderColor: "system-warning",
          },
          {
            question: "Para que serve o Teorema de Pitágoras na prática?",
            answer:
              "Usado para calcular distâncias, verificar esquadros na construção, determinar diagonais de retângulos, navegação, engenharia e arquitetura.",
            borderColor: "growth-green",
          },
          {
            question: "Como verificar se o resultado está correto?",
            answer:
              "Substitua os valores na fórmula original: h² = a² + b². Se a igualdade for verdadeira, o resultado está correto. Lembre-se que a hipotenusa sempre deve ser maior que qualquer cateto.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre o Teorema de Pitágoras",
          content:
            "<strong>Para melhores resultados:</strong> certifique-se de que o triângulo é retângulo (tem um ângulo de 90°). A hipotenusa sempre será maior que qualquer cateto.",
        }}
        footerText="<strong>Lembre-se:</strong> O teorema só se aplica a triângulos retângulos. Sempre verifique se h > a e h > b."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora do Teorema de Pitágoras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">
                calculadora do Teorema de Pitágoras
              </strong>{" "}
              utiliza <strong className="text-growth-green">fórmulas matemáticas confiáveis</strong>{" "}
              para calcular a hipotenusa ou cateto faltante em triângulos retângulos com resultados
              instantâneos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Cálculo de hipotenusa (h² = a² + b²), cálculo de
              cateto faltante (c² = h² - a²), verificação automática dos resultados e explicação
              passo a passo.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e cálculos básicos. Para projetos profissionais de engenharia ou
              arquitetura, consulte sempre um <strong>profissional qualificado</strong> e considere
              outras variáveis específicas do projeto.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco educacional • 📐 Teorema de Pitágoras • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="teorema-pitagoras" />
    </div>
  );
}
