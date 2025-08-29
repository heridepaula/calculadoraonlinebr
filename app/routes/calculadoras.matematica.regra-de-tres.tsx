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
      title: "Calculadora de Regra de 3 Online 2025 | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "📏 Calculadora de regra de 3 simples e composta gratuita. Resolva proporções e problemas de regra de três com explicação passo a passo. Resultados precisos!",
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
      href: "https://calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
    },
    {
      property: "og:title",
      content: "Calculadora de Frações Online Gratuita - Operações Precisas 2025",
    },
    {
      property: "og:description",
      content:
        "Ferramenta online precisa para operações com frações: soma, subtração, multiplicação, divisão e simplificação automática. Gratuita para estudantes!",
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
      content: "https://calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Frações Online Gratuita - Resultados Precisos",
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
        name: "Calculadora de Frações Online Gratuita - Operações Matemáticas 2025",
        description:
          "Ferramenta educacional online gratuita para realizar operações precisas com frações: soma, subtração, multiplicação, divisão e simplificação automática. Resultados instantâneos com explicação passo a passo.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
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
          "@id": "https://calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
          name: "Calculadora de Frações Online Gratuita - Matemática Educacional",
          description:
            "Ferramenta educacional online para operações precisas com frações: soma, subtração, multiplicação, divisão e simplificação automática com explicação passo a passo.",
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
                name: "Frações",
                item: "https://calculadoraonlinebr.com.br/calculadoras/matematica/fracoes",
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
          "Aprenda a realizar operações com frações de forma simples e precisa com nossa calculadora online gratuita",
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

interface RuleTwoThreeResult {
  originalValues: {
    value1: number;
    value2: number;
    value3: number;
    valueX: number; // the result
  };
  type: "simples-direta" | "simples-inversa";
  result: {
    value: number;
    formatted: string;
  };
  steps: string[];
  proportion: string;
  verification?: string;
}

interface ValidationErrors {
  value1?: string;
  value2?: string;
  value3?: string;
  type?: string;
}

export default function RuleOfThreeCalculator() {
  // Inputs para regra de três
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [calculationType, setCalculationType] = useState<"simples-direta" | "simples-inversa">(
    "simples-direta"
  );

  const [result, setResult] = useState<RuleTwoThreeResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "regra-de-tres",
    category: "matematica",
  });
  useFormTracking("regra-de-tres");

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

  // Função auxiliar para formatação
  const formatResult = (value: number): string => {
    // Se for um número inteiro, exibir sem casas decimais
    if (Number.isInteger(value)) {
      return value.toString();
    }
    
    // Se for decimal, mostrar até 4 casas decimais, removendo zeros desnecessários
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const val1 = parseNumber(value1);
    const val2 = parseNumber(value2);
    const val3 = parseNumber(value3);

    if (value1.trim() === "") {
      newErrors.value1 = "Primeiro valor é obrigatório";
      ok = false;
    } else if (isNaN(val1)) {
      newErrors.value1 = "Insira um número válido";
      ok = false;
    }

    if (value2.trim() === "") {
      newErrors.value2 = "Segundo valor é obrigatório";
      ok = false;
    } else if (isNaN(val2) || val2 === 0) {
      newErrors.value2 = "Insira um número válido diferente de zero";
      ok = false;
    }

    if (value3.trim() === "") {
      newErrors.value3 = "Terceiro valor é obrigatório";
      ok = false;
    } else if (isNaN(val3)) {
      newErrors.value3 = "Insira um número válido";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateRuleOfThree = (): RuleTwoThreeResult => {
    const val1 = parseNumber(value1);
    const val2 = parseNumber(value2);
    const val3 = parseNumber(value3);

    let resultValue: number;
    const steps: string[] = [];
    let proportion: string;
    let verification: string;

    steps.push(`Valores informados:`);
    steps.push(`A = ${val1}`);
    steps.push(`B = ${val2}`);
    steps.push(`C = ${val3}`);
    steps.push(`X = ? (valor procurado)`);

    if (calculationType === "simples-direta") {
      // A está para B assim como C está para X
      // A/B = C/X  =>  X = (B * C) / A
      resultValue = (val2 * val3) / val1;
      proportion = `${val1} : ${val2} :: ${val3} : X`;
      
      steps.push(`Montando a proporção (regra de 3 simples direta):`);
      steps.push(`${val1} está para ${val2}`);
      steps.push(`assim como ${val3} está para X`);
      steps.push(`${val1} / ${val2} = ${val3} / X`);
      steps.push(`X × ${val1} = ${val2} × ${val3}`);
      steps.push(`X × ${val1} = ${val2 * val3}`);
      steps.push(`X = ${val2 * val3} / ${val1}`);
      steps.push(`X = ${resultValue}`);
      
      // Verificação
      const ratio1 = val1 / val2;
      const ratio2 = val3 / resultValue;
      verification = `Verificação: ${val1}/${val2} = ${ratio1.toFixed(4)} e ${val3}/${resultValue} = ${ratio2.toFixed(4)}`;
    } else {
      // Regra de 3 simples inversa
      // A está para X assim como B está para C (inversamente)
      // A × C = B × X  =>  X = (A × C) / B
      resultValue = (val1 * val3) / val2;
      proportion = `${val1} : X :: ${val2} : ${val3}`;
      
      steps.push(`Montando a proporção (regra de 3 simples inversa):`);
      steps.push(`${val1} está para X (inversamente)`);
      steps.push(`assim como ${val2} está para ${val3}`);
      steps.push(`${val1} × ${val3} = ${val2} × X`);
      steps.push(`X = (${val1} × ${val3}) / ${val2}`);
      steps.push(`X = ${val1 * val3} / ${val2}`);
      steps.push(`X = ${resultValue}`);
      
      // Verificação
      const prod1 = val1 * val3;
      const prod2 = val2 * resultValue;
      verification = `Verificação: ${val1} × ${val3} = ${prod1} e ${val2} × ${resultValue} = ${prod2.toFixed(4)}`;
    }

    return {
      originalValues: { value1: val1, value2: val2, value3: val3, valueX: resultValue },
      type: calculationType,
      result: {
        value: resultValue,
        formatted: formatResult(resultValue),
      },
      steps,
      proportion,
      verification,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateRuleOfThree();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ value1: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setValue1("");
    setValue2("");
    setValue3("");
    setCalculationType("simples-direta");
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
        <BreadcrumbItem isLast>Regra de 3</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Regra de 3 Online 2025
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva <strong className="text-growth-green">regra de três simples e composta</strong> de forma
          simples e precisa. Calcule proporções matemáticas com{" "}
          <strong className="text-primary-blue-dark">explicação passo a passo</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📏 <strong>Regra de Três</strong> • 🔄 <strong>Proporções Diretas/Inversas</strong>{" "}
            • 🧮 <strong>Resultados Instantâneos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📏 Calculadora de Regra de Três</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">Selecione o tipo e insira os valores:</p>
            <div className="mt-4">
              <select
                value={calculationType}
                onChange={(e) =>
                  setCalculationType(e.target.value as "simples-direta" | "simples-inversa")
                }
                className="mx-auto block rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-2 text-lg font-medium text-text-primary"
              >
                <option value="simples-direta">➡️ Regra de 3 Simples Direta</option>
                <option value="simples-inversa">⬅️ Regra de 3 Simples Inversa</option>
              </select>
            </div>
          </div>

          {/* Campos de entrada para regra de três */}
          <div className="mb-6 space-y-6">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
                Valores para Regra de Três
              </h3>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Input
                    type="number"
                    label="Primeiro Valor (A)"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="2"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.value1} />
                  <div className="mt-1 text-xs text-text-secondary">Valor conhecido</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Segundo Valor (B)"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="4"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.value2} />
                  <div className="mt-1 text-xs text-text-secondary">Valor conhecido</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Terceiro Valor (C)"
                    value={value3}
                    onChange={(e) => setValue3(e.target.value)}
                    placeholder="6"
                    fullWidth
                    className="h-12 text-lg"
                    step="any"
                  />
                  <ErrorMessage error={errors.value3} />
                  <div className="mt-1 text-xs text-text-secondary">Valor conhecido</div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="text-lg text-text-secondary">
                  {calculationType === "simples-direta" && (
                    <span>Se <strong>A</strong> está para <strong>B</strong>, então <strong>C</strong> está para <strong>X</strong></span>
                  )}
                  {calculationType === "simples-inversa" && (
                    <span>Se <strong>A</strong> está para <strong>X</strong>, então <strong>B</strong> está para <strong>C</strong> (inversa)</span>
                  )}
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
              📊 Resultado da Regra de Três
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Proporção</div>
                <div className="text-xl font-bold text-primary-blue-dark">
                  {result.proportion}
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-system-warning">
                  {result.result.formatted}
                </div>
                <div className="text-sm text-text-secondary">Valor de X</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-lg font-bold text-growth-green">
                  {result.type === "simples-direta" 
                    ? "Diretamente Proporcional"
                    : "Inversamente Proporcional"}
                </div>
                <div className="text-sm text-text-secondary">Tipo de Proporção</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Informações da Proporção</h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>Tipo:</strong>{" "}
                  {result.type === "simples-direta"
                    ? "Regra de 3 Simples Direta"
                    : "Regra de 3 Simples Inversa"}
                </div>
                <div>
                  <strong>Valores:</strong> A = {result.originalValues.value1}, B = {result.originalValues.value2}, C = {result.originalValues.value3}
                </div>
                <div>
                  <strong>Resultado:</strong> X = {result.result.formatted}
                </div>
                {result.verification && (
                  <div>
                    <strong>Verificação:</strong> {result.verification}
                  </div>
                )}
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
            🎯 Frações – Guia Completo 2025
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
                  <td className="p-3 font-medium">Precisão</td>
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
        title="Perguntas Frequentes - Calculadora de Regra de Três"
        items={[
          {
            question: "O que é regra de três?",
            answer:
              "A regra de três é um processo matemático usado para resolver problemas de proporcionalidade entre grandezas diretamente ou inversamente proporcionais, permitindo encontrar um valor desconhecido em uma proporção.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre regra de três simples direta e inversa?",
            answer:
              "Na regra de três direta, quando uma grandeza aumenta, a outra também aumenta na mesma proporção. Na inversa, quando uma grandeza aumenta, a outra diminui proporcionalmente.",
            borderColor: "growth-green",
          },
          {
            question: "Como montar uma regra de três?",
            answer:
              "Identifique as grandezas envolvidas, determine se são diretamente ou inversamente proporcionais, monte a proporção (A:B :: C:X) e resolva através da multiplicação cruzada.",
            borderColor: "system-info",
          },
          {
            question: "O que é regra de três composta?",
            answer:
              "A regra de três composta envolve mais de duas grandezas proporcionais. É usada quando o problema apresenta três ou mais grandezas relacionadas entre si.",
            borderColor: "system-warning",
          },
          {
            question: "Como verificar se o resultado está correto?",
            answer:
              "Para verificar, substitua o valor encontrado na proporção original e verifique se as razões são iguais (para proporção direta) ou se os produtos são iguais (para proporção inversa).",
            borderColor: "growth-green",
          },
          {
            question: "Quando usar cada tipo de regra de três?",
            answer:
              "Use regra de três direta quando as grandezas aumentam/diminuem juntas (ex: mais produtos, mais dinheiro). Use inversa quando uma aumenta e outra diminui (ex: mais velocidade, menos tempo).",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Regra de Três",
          content:
            "<strong>Para resultados precisos:</strong> sempre identifique corretamente se as grandezas são direta ou inversamente proporcionais antes de montar a proporção.",
        }}
        footerText="<strong>Lembre-se:</strong> Proporção direta: grandezas aumentam/diminuem juntas. Proporção inversa: uma aumenta quando a outra diminui. Sempre verifique o resultado."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Regra de Três
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de regra de três</strong>{" "}
              permite resolver{" "}
              <strong className="text-growth-green">problemas de proporcionalidade</strong>: regra de 3 simples direta, inversa e composta com precisão matemática e resultados instantâneos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Identificação automática do tipo de proporção, resolução passo a passo, verificação dos resultados e explicação detalhada do processo de cálculo.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e resolução de exercícios. Para aplicações científicas ou de
              engenharia que exigem alta precisão, consulte sempre um{" "}
              <strong>profissional qualificado</strong> e considere limitações de precisão numérica.
              Explore também nossas calculadoras de
              <a
                href="/calculadoras/matematica/porcentagem"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                porcentagem
              </a>
              para complementar seus estudos matemáticos.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco educacional • 📏 Regra de Três • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="regra-de-tres" />
    </div>
  );
}
