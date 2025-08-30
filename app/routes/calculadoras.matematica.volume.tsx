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
      title:
        "Calculadora de Área e Perímetro ⚡ Grátis - Retângulo, Círculo, Triângulo | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Calcule área e perímetro de formas geométricas: retângulo, círculo, triângulo, quadrado, trapézio. Fórmulas precisas e resultados instantâneos para estudos.",
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
      href: "https://calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
    },
    {
      property: "og:title",
      content: "Calculadora de Área e Perímetro 2025 – Formas Geométricas",
    },
    {
      property: "og:description",
      content:
        "Calcule área e perímetro de formas geométricas: retângulo, círculo, triângulo, quadrado, trapézio. Fórmulas matemáticas precisas e resultados instantâneos.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-area-perimetro.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Área e Perímetro - Formas geométricas: retângulo, círculo, triângulo",
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
      content: "https://calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Área e Perímetro 2025 – Formas Geométricas",
    },
    {
      name: "twitter:description",
      content:
        "Calcule área e perímetro de formas geométricas: retângulo, círculo, triângulo, quadrado, trapézio. Fórmulas precisas.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-area-perimetro.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Área e Perímetro - Formas geométricas",
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
          "Calculadora gratuita e precisa de área e perímetro para diferentes formas geométricas: retângulo, círculo, triângulo, quadrado e trapézio. Fórmulas matemáticas exatas.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
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
          url: "https://calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://calculadoraonlinebr.com.br/android-chrome-192x192.webp",
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
          "@id": "https://calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
          name: "Calculadora de Área e Perímetro 2025 - Formas Geométricas",
          description:
            "Calcule área e perímetro de formas geométricas: retângulo, círculo, triângulo, quadrado, trapézio. Fórmulas precisas e resultados instantâneos.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://calculadoraonlinebr.com.br/search?q={search_term_string}",
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
                item: "https://calculadoraonlinebr.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://calculadoraonlinebr.com.br/calculadoras",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Matemática",
                item: "https://calculadoraonlinebr.com.br/calculadoras/matematica",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Área e Perímetro",
                item: "https://calculadoraonlinebr.com.br/calculadoras/matematica/area-perimetro",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Cálculos de Área e Perímetro",
          description: "Fórmulas matemáticas para calcular área e perímetro de formas geométricas",
          category: "Mathematics",
        },
        featureList: [
          "Cálculo de área e perímetro de retângulos",
          "Cálculo de área e perímetro de círculos",
          "Cálculo de área e perímetro de triângulos",
          "Cálculo de área e perímetro de quadrados",
          "Cálculo de área e perímetro de trapézios",
          "Fórmulas matemáticas precisas",
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

type ShapeType = "cubo" | "esfera" | "cilindro" | "retangulo" | "circulo";

interface GeometryResult {
  area: number;
  volume: number;
  formula: {
    area: string;
    volume: string;
  };
  dimensions: Record<string, number>;
}

interface ValidationErrors {
  comprimento?: string;
  largura?: string;
  altura?: string;
  raio?: string;
  lado?: string;
  base?: string;
}

export default function AreaVolumeCalculator() {
  const [shapeType, setShapeType] = useState<ShapeType>("cubo");

  // Inputs para diferentes formas
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [raio, setRaio] = useState("");
  const [lado, setLado] = useState("");

  const [result, setResult] = useState<GeometryResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "volume",
    category: "matematica",
  });
  useFormTracking("volume");

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

    if (shapeType === "cubo") {
      const l = parseNumber(lado);
      if (l <= 0) {
        newErrors.lado = "Lado deve ser maior que 0";
        ok = false;
      }
    }

    if (shapeType === "esfera") {
      const r = parseNumber(raio);
      if (r <= 0) {
        newErrors.raio = "Raio deve ser maior que 0";
        ok = false;
      }
    }

    if (shapeType === "cilindro") {
      const r = parseNumber(raio);
      const h = parseNumber(altura);
      if (r <= 0) {
        newErrors.raio = "Raio deve ser maior que 0";
        ok = false;
      }
      if (h <= 0) {
        newErrors.altura = "Altura deve ser maior que 0";
        ok = false;
      }
    }

    if (shapeType === "retangulo") {
      const c = parseNumber(comprimento);
      const l = parseNumber(largura);
      if (c <= 0) {
        newErrors.comprimento = "Comprimento deve ser maior que 0";
        ok = false;
      }
      if (l <= 0) {
        newErrors.largura = "Largura deve ser maior que 0";
        ok = false;
      }
    }

    if (shapeType === "circulo") {
      const r = parseNumber(raio);
      if (r <= 0) {
        newErrors.raio = "Raio deve ser maior que 0";
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateGeometry = (): GeometryResult => {
    let area = 0;
    let volume = 0;
    let formula = { area: "", volume: "" };
    let dimensions: Record<string, number> = {};

    if (shapeType === "cubo") {
      const l = parseNumber(lado);
      area = 6 * l * l;
      volume = l * l * l;
      formula.area = "6 × Lado²";
      formula.volume = "Lado³";
      dimensions = { lado: l };
    }

    if (shapeType === "esfera") {
      const r = parseNumber(raio);
      area = 4 * Math.PI * r * r;
      volume = (4 / 3) * Math.PI * r * r * r;
      formula.area = "4 × π × Raio²";
      formula.volume = "(4/3) × π × Raio³";
      dimensions = { raio: r };
    }

    if (shapeType === "cilindro") {
      const r = parseNumber(raio);
      const h = parseNumber(altura);
      area = 2 * Math.PI * r * (r + h);
      volume = Math.PI * r * r * h;
      formula.area = "2 × π × Raio × (Raio + Altura)";
      formula.volume = "π × Raio² × Altura";
      dimensions = { raio: r, altura: h };
    }

    if (shapeType === "retangulo") {
      const c = parseNumber(comprimento);
      const l = parseNumber(largura);
      area = c * l;
      volume = 0; // Retângulo é 2D, não tem volume
      formula.area = "Comprimento × Largura";
      formula.volume = "N/A (forma 2D)";
      dimensions = { comprimento: c, largura: l };
    }

    if (shapeType === "circulo") {
      const r = parseNumber(raio);
      area = Math.PI * r * r;
      volume = 0; // Círculo é 2D, não tem volume
      formula.area = "π × Raio²";
      formula.volume = "N/A (forma 2D)";
      dimensions = { raio: r };
    }

    return { area, volume, formula, dimensions };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateGeometry();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ comprimento: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setComprimento("");
    setLargura("");
    setAltura("");
    setRaio("");
    setLado("");
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
        <BreadcrumbItem isLast>Área e Perímetro</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Área e Perímetro 2025 – Formas Geométricas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule a <strong className="text-growth-green">área e perímetro</strong> de diferentes{" "}
          formas geométricas com precisão. Retângulo, círculo, triângulo, quadrado e trapézio com{" "}
          <strong className="text-primary-blue-dark">fórmulas matemáticas exatas</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📐 <strong>Fórmulas Precisas</strong> • 📊 <strong>Múltiplas Formas</strong> • 🧮{" "}
            <strong>Cálculos Instantâneos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📐 Selecione a Forma Geométrica</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Seleção de Forma */}
          <div className="mb-6 flex flex-wrap justify-center gap-1">
            <button
              type="button"
              onClick={() => setShapeType("cubo")}
              className={`w-20 rounded-md px-2 py-2 text-xs font-medium transition ${
                shapeType === "cubo"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Cubo
            </button>
            <button
              type="button"
              onClick={() => setShapeType("esfera")}
              className={`w-20 rounded-md px-2 py-2 text-xs font-medium transition ${
                shapeType === "esfera"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Esfera
            </button>
            <button
              type="button"
              onClick={() => setShapeType("cilindro")}
              className={`w-20 rounded-md px-2 py-2 text-xs font-medium transition ${
                shapeType === "cilindro"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Cilindro
            </button>
            <button
              type="button"
              onClick={() => setShapeType("retangulo")}
              className={`w-20 rounded-md px-2 py-2 text-xs font-medium transition ${
                shapeType === "retangulo"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Retângulo
            </button>
            <button
              type="button"
              onClick={() => setShapeType("circulo")}
              className={`w-20 rounded-md px-2 py-2 text-xs font-medium transition ${
                shapeType === "circulo"
                  ? "bg-primary-blue text-white"
                  : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
              }`}
            >
              Círculo
            </button>
          </div>

          {/* Campos de entrada conforme a forma */}
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            {shapeType === "cubo" && (
              <div className="w-48">
                <Input
                  type="number"
                  label="Lado"
                  value={lado}
                  onChange={(e) => setLado(e.target.value)}
                  placeholder="5"
                  fullWidth
                  className="h-12 text-lg"
                  step="any"
                />
                <ErrorMessage error={errors.lado} />
                <div className="mt-1 text-xs text-text-secondary">Medida de cada aresta</div>
              </div>
            )}

            {shapeType === "esfera" && (
              <div className="w-48">
                <Input
                  type="number"
                  label="Raio"
                  value={raio}
                  onChange={(e) => setRaio(e.target.value)}
                  placeholder="3"
                  fullWidth
                  className="h-12 text-lg"
                  step="any"
                />
                <ErrorMessage error={errors.raio} />
                <div className="mt-1 text-xs text-text-secondary">Distância do centro à superfície</div>
              </div>
            )}

            {shapeType === "cilindro" && (
              <>
                <div className="w-48">
                  <Input
                    type="number"
                    label="Raio"
                    value={raio}
                    onChange={(e) => setRaio(e.target.value)}
                    placeholder="3"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.raio} />
                  <div className="mt-1 text-xs text-text-secondary">Raio da base circular</div>
                </div>
                <div className="w-48">
                  <Input
                    type="number"
                    label="Altura"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="8"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.altura} />
                  <div className="mt-1 text-xs text-text-secondary">Altura do cilindro</div>
                </div>
              </>
            )}

            {shapeType === "retangulo" && (
              <>
                <div className="w-48">
                  <Input
                    type="number"
                    label="Comprimento"
                    value={comprimento}
                    onChange={(e) => setComprimento(e.target.value)}
                    placeholder="10"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.comprimento} />
                  <div className="mt-1 text-xs text-text-secondary">Medida do lado maior</div>
                </div>
                <div className="w-48">
                  <Input
                    type="number"
                    label="Largura"
                    value={largura}
                    onChange={(e) => setLargura(e.target.value)}
                    placeholder="5"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.largura} />
                  <div className="mt-1 text-xs text-text-secondary">Medida do lado menor</div>
                </div>
              </>
            )}

            {shapeType === "circulo" && (
              <div className="w-48">
                <Input
                  type="number"
                  label="Raio"
                  value={raio}
                  onChange={(e) => setRaio(e.target.value)}
                  placeholder="5"
                  fullWidth
                  className="h-12 text-lg"
                  step="any"
                />
                <ErrorMessage error={errors.raio} />
                <div className="mt-1 text-xs text-text-secondary">Distância do centro à borda</div>
              </div>
            )}
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
              📊 Resultado dos Cálculos de Área e Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-growth-green">
                  {numberBR(result.area)} unidades²
                </div>
                <div className="text-sm text-text-secondary">Área da Superfície</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {result.volume > 0 ? `${numberBR(result.volume)} unidades³` : "N/A"}
                </div>
                <div className="text-sm text-text-secondary">Volume</div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-2">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Fórmula da Área</div>
                <div className="text-lg font-bold text-text-primary">{result.formula.area}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Fórmula do Volume</div>
                <div className="text-lg font-bold text-text-primary">
                  {result.formula.volume}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Dimensões Utilizadas</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
                {Object.entries(result.dimensions).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}:</span>
                    <strong>{numberBR(value)} unidades</strong>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Formas Geométricas - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Formas Geométricas – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Retângulo */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Retângulo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Quadrilátero com quatro ângulos retos (90°) e lados opostos iguais e paralelos.
                    É uma das formas mais comuns na geometria.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Área: Comprimento × Largura</li>
                    <li>• Perímetro: 2 × (Comprimento + Largura)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Quatro lados e quatro ângulos retos</li>
                    <li>• Lados opostos são iguais</li>
                    <li>• Diagonais são iguais</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Cálculo de área de terrenos</li>
                    <li>• Dimensões de móveis e construção</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Círculo */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔄 Círculo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Figura plana formada por pontos equidistantes de um ponto central (centro). A
                    distância do centro à borda é o raio.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Área: π × Raio²</li>
                    <li>• Perímetro: 2 × π × Raio</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Todos os pontos equidistam do centro</li>
                    <li>• Não possui lados nem vértices</li>
                    <li>• π (pi) ≈ 3.14159...</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Cálculo de área de jardins circulares</li>
                    <li>• Dimensões de rodas e tubulações</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Triângulo */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🔺 Triângulo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Polígono de três lados e três vértices. A soma dos ângulos internos sempre
                    totaliza 180 graus.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Área: (Base × Altura) ÷ 2</li>
                    <li>• Perímetro: Soma dos três lados</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Três lados e três vértices</li>
                    <li>• Soma dos ângulos internos = 180°</li>
                    <li>• Forma mais estável estruturalmente</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Cálculos de telhados e estruturas</li>
                    <li>• Navegação e triangulação</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Formas Geométricas */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Características das Formas Geométricas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Retângulo
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">Círculo</th>
                  <th className="p-3 text-center font-semibold text-system-warning">Triângulo</th>
                  <th className="p-3 text-center font-semibold text-system-info">Quadrado</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Número de Lados</td>
                  <td className="p-3 text-center text-primary-blue-dark">4</td>
                  <td className="p-3 text-center text-growth-green">0 (curvo)</td>
                  <td className="p-3 text-center text-system-warning">3</td>
                  <td className="p-3 text-center text-system-info">4</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Complexidade do Cálculo</td>
                  <td className="p-3 text-center">⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Fórmula da Área</td>
                  <td className="p-3 text-center text-primary-blue-dark">C × L</td>
                  <td className="p-3 text-center text-growth-green">π × r²</td>
                  <td className="p-3 text-center text-system-warning">(B × A) ÷ 2</td>
                  <td className="p-3 text-center text-system-info">L²</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Fórmula do Perímetro</td>
                  <td className="p-3 text-center">2(C + L)</td>
                  <td className="p-3 text-center">2πr</td>
                  <td className="p-3 text-center">L1 + L2 + L3</td>
                  <td className="p-3 text-center">4L</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Aplicações Comuns</td>
                  <td className="p-3 text-center">Terrenos, salas</td>
                  <td className="p-3 text-center">Jardins, rodas</td>
                  <td className="p-3 text-center">Telhados, estruturas</td>
                  <td className="p-3 text-center">Azulejos, praças</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Estabilidade Estrutural</td>
                  <td className="p-3 text-center text-primary-blue-dark">Média</td>
                  <td className="p-3 text-center text-growth-green">N/A</td>
                  <td className="p-3 text-center text-system-warning">Alta</td>
                  <td className="p-3 text-center text-system-info">Baixa</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🏠 Construção</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>retângulos</strong> para calcular áreas de cômodos, terrenos e
                construções em geral.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">🌸 Paisagismo</h4>
              <p className="text-sm text-text-secondary">
                Prefira <strong>círculos</strong> para jardins, canteiros e áreas curvas que
                precisam de cálculos de área.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">🏗️ Estruturas</h4>
              <p className="text-sm text-text-secondary">
                Escolha <strong>triângulos</strong> para calcular telhados, treliças e estruturas
                triangulares.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Área e Perímetro"
        items={[
          {
            question: "O que é área e perímetro?",
            answer:
              "Área é a medida da superfície de uma figura geométrica (em unidades²). Perímetro é a soma das medidas de todos os lados da figura (em unidades lineares).",
            borderColor: "primary-blue",
          },
          {
            question: "Por que π (pi) é usado no círculo?",
            answer:
              "π (pi) é a razão entre a circunferência e o diâmetro de qualquer círculo, sempre igual a aproximadamente 3,14159. É uma constante matemática fundamental para cálculos circulares.",
            borderColor: "growth-green",
          },
          {
            question: "Como calcular área de triângulos irregulares?",
            answer:
              "Para triângulos irregulares, use a fórmula da área: (base × altura) ÷ 2. A altura deve ser perpendicular à base escolhida. Para o perímetro, some todos os três lados.",
            borderColor: "system-info",
          },
          {
            question: "Qual a diferença entre quadrado e retângulo?",
            answer:
              "Quadrado tem todos os lados iguais, então área = lado² e perímetro = 4 × lado. Retângulo tem lados opostos iguais, então área = comprimento × largura e perímetro = 2 × (comprimento + largura).",
            borderColor: "system-warning",
          },
          {
            question: "Como medir área em terrenos reais?",
            answer:
              "Para terrenos retangulares, meça comprimento e largura em metros. Para formas irregulares, divida em formas geométricas simples, calcule cada área separadamente e some os resultados.",
            borderColor: "growth-green",
          },
          {
            question: "Posso usar qualquer unidade de medida?",
            answer:
              "Sim, mas mantenha consistência. Se usar metros para as dimensões, a área será em metros² e perímetro em metros. Se usar centímetros, área será em cm² e perímetro em cm.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Cálculos Geométricos",
          content:
            "<strong>Para resultados precisos:</strong> sempre use a mesma unidade de medida para todas as dimensões. Dobre-check suas medições e lembre-se que área é sempre em unidades².",
        }}
        footerText="<strong>Lembre-se:</strong> Área mede superfície (unidades²), perímetro mede contorno (unidades). Sempre confira suas medições antes de calcular."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Área e Perímetro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de área e perímetro</strong>{" "}
              utiliza <strong className="text-growth-green">fórmulas matemáticas precisas</strong>{" "}
              para calcular a área e o perímetro de diferentes formas geométricas com resultados
              instantâneos.
            </p>
            <p>
              <strong>Formas disponíveis:</strong> Retângulo, Círculo, Triângulo, Quadrado e
              Trapézio. Cada forma tem suas próprias características e aplicações práticas
              específicas.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e cálculos básicos. Para projetos profissionais de engenharia ou
              arquitetura, consulte sempre um <strong>profissional qualificado</strong> e considere
              outras variáveis específicas do projeto.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco educacional • 📐 Fórmulas precisas • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="volume" />
    </div>
  );
}
