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
      title: `Calculadora de Regra de Três 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora regra de três simples e composta grátis. Resolva proporções com explicação passo a passo. Resultados confiáveis.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
    },
    {
      property: "og:title",
      content: "Calculadora de Regra de 3 Simples 2026 | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "📏 Calculadora de regra de 3 simples e composta gratuita. Resolva proporções e problemas de regra de três com explicação passo a passo. Resultados confiáveis!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-regra-de-tres.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Regra de Três - Proporções Matemáticas",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Regra de 3 Simples 2026 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "📏 Calculadora de regra de 3 simples e composta gratuita. Resolva proporções e problemas de regra de três com explicação passo a passo. Resultados confiáveis!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-regra-de-tres.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Regra de Três - Proporções Matemáticas",
    },
    { name: "twitter:site", content: "@CalculadoraOnlineBR" },
    { name: "twitter:creator", content: "@CalculadoraOnlineBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Regra de Três" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      name: "keywords",
      content:
        "calculadora regra de três, regra de 3 simples, proporção direta, proporção inversa, regra de três composta",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
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
            name: "Regra de Três",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Regra de 3 Simples e Composta Online 2026",
        description:
          "Ferramenta educacional online gratuita para resolver problemas de regra de três simples direta, inversa e composta. Calcule proporções matemáticas com explicação passo a passo e resultados instantâneos.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
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
            "https://twitter.com/CalculadoraOnlineBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/regra-de-tres",
          name: "Calculadora de Regra de 3 Simples e Composta - Matemática Educacional",
          description:
            "Ferramenta educacional online para resolver problemas de regra de três simples direta, inversa e composta. Calcule proporções matemáticas com explicação passo a passo.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
          },
        },
        about: {
          "@type": "Thing",
          name: "Regra de Três",
          description:
            "Processo matemático para resolver problemas de proporcionalidade: regra de três simples direta, inversa e composta",
          category: "Mathematics",
        },
        featureList: [
          "Regra de 3 simples direta",
          "Regra de 3 simples inversa",
          "Regra de 3 composta",
          "Resolução passo a passo",
          "Verificação automática",
          "Proporções matemáticas",
          "Cálculos confiáveis",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Explicação detalhada",
          "Identificação de tipo automática",
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
            name: "O que é regra de três?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A regra de três é um processo matemático usado para resolver problemas de proporcionalidade entre grandezas diretamente ou inversamente proporcionais, permitindo encontrar um valor desconhecido em uma proporção.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre regra de três simples direta e inversa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Na regra de três direta, quando uma grandeza aumenta, a outra também aumenta na mesma proporção. Na inversa, quando uma grandeza aumenta, a outra diminui proporcionalmente.",
            },
          },
          {
            "@type": "Question",
            name: "Como montar uma regra de três?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Identifique as grandezas envolvidas, determine se são diretamente ou inversamente proporcionais, monte a proporção (A:B :: C:X) e resolva através da multiplicação cruzada.",
            },
          },
          {
            "@type": "Question",
            name: "Como verificar se o resultado está correto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para verificar, substitua o valor encontrado na proporção original e verifique se as razões são iguais (para proporção direta) ou se os produtos são iguais (para proporção inversa).",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Regra de Três",
        description:
          "Aprenda a resolver problemas de regra de três simples e composta de forma simples e confiável com nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Selecione o tipo",
            text: "Escolha entre regra de três simples direta ou inversa, dependendo da relação entre as grandezas do problema.",
          },
          {
            "@type": "HowToStep",
            name: "Insira os valores conhecidos",
            text: "Digite os três valores conhecidos nos campos A, B e C. Certifique-se de que todos são números válidos e diferentes de zero quando necessário.",
          },
          {
            "@type": "HowToStep",
            name: "Calcule o resultado",
            text: "Clique no botão 'Calcular' para obter o valor de X, a proporção montada e a resolução passo a passo completa.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja o valor de X calculado, a proporção matemática formada, a resolução detalhada passo a passo e a verificação do resultado.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Regra de Três Online",
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
    return value.toFixed(4).replace(/\.?0+$/, "");
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
          Calculadora de Regra de 3 Online 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva <strong className="text-growth-green">regra de três simples e composta</strong> de
          forma simples e confiável. Calcule proporções matemáticas com{" "}
          <strong className="text-primary-blue-dark">explicação passo a passo</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📏 <strong>Regra de Três</strong> • 🔄 <strong>Proporções Diretas/Inversas</strong> • 🧮{" "}
            <strong>Resultados Instantâneos</strong>
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
                    <span>
                      Se <strong>A</strong> está para <strong>B</strong>, então <strong>C</strong>{" "}
                      está para <strong>X</strong>
                    </span>
                  )}
                  {calculationType === "simples-inversa" && (
                    <span>
                      Se <strong>A</strong> está para <strong>X</strong>, então <strong>B</strong>{" "}
                      está para <strong>C</strong> (inversa)
                    </span>
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
                <div className="text-xl font-bold text-primary-blue-dark">{result.proportion}</div>
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
              <h4 className="mb-2 font-semibold text-primary-blue-dark">
                Informações da Proporção
              </h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>Tipo:</strong>{" "}
                  {result.type === "simples-direta"
                    ? "Regra de 3 Simples Direta"
                    : "Regra de 3 Simples Inversa"}
                </div>
                <div>
                  <strong>Valores:</strong> A = {result.originalValues.value1}, B ={" "}
                  {result.originalValues.value2}, C = {result.originalValues.value3}
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

      {/* Seção: Regra de Três - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Regra de Três – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Regra de Três */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Conceito de Regra de Três
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A regra de três é um processo matemático usado para resolver problemas de
                    proporcionalidade entre grandezas, permitindo encontrar um valor desconhecido
                    através de proporções.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Tipos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Simples Direta: A/B = C/X</li>
                    <li>• Simples Inversa: A×X = B×C</li>
                    <li>• Composta: Multiple grandezas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Problemas de velocidade e tempo</li>
                    <li>• Cálculos de quantidade e preço</li>
                    <li>• Conversões de unidades</li>
                    <li>• Receitas culinárias</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Características</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Baseada em proporcionalidade</li>
                    <li>• Requer identificação do tipo</li>
                    <li>• Resolução por multiplicação cruzada</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Identificando o Tipo */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📐 Como Identificar o Tipo
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">➡️ Proporção Direta</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Quando uma grandeza aumenta, a outra também aumenta na mesma proporção. Exemplo:
                    mais produtos = mais dinheiro.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Exemplos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Distância e combustível</li>
                    <li>• Horas trabalhadas e salário</li>
                    <li>• Quantidade e preço total</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">⬅️ Proporção Inversa</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Quando uma grandeza aumenta, a outra diminui proporcionalmente. Exemplo: mais
                    velocidade = menos tempo.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Exemplos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Velocidade e tempo</li>
                    <li>• Número de pessoas e tempo de trabalho</li>
                    <li>• Força aplicada e distância</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Passo a Passo */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🔍 Passo a Passo da Resolução
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📝 Etapas</h4>
                  <ol className="mb-4 space-y-2 text-sm text-text-secondary">
                    <li>
                      1. <strong>Identificar</strong> as grandezas do problema
                    </li>
                    <li>
                      2. <strong>Determinar</strong> se são direta ou inversamente proporcionais
                    </li>
                    <li>
                      3. <strong>Montar</strong> a proporção (A:B :: C:X)
                    </li>
                    <li>
                      4. <strong>Resolver</strong> por multiplicação cruzada
                    </li>
                    <li>
                      5. <strong>Verificar</strong> o resultado obtido
                    </li>
                  </ol>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Dicas Importantes</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Leia o problema com atenção</li>
                    <li>• Identifique as unidades de medida</li>
                    <li>• Verifique se o resultado faz sentido</li>
                    <li>• Considere o contexto do problema</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Cuidados</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Não confundir proporção direta com inversa</li>
                    <li>• Verificar se grandezas são realmente proporcionais</li>
                    <li>• Atenção às unidades de medida</li>
                  </ul>
                </div>
              </div>
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
            "<strong>Para melhores resultados:</strong> sempre identifique corretamente se as grandezas são direta ou inversamente proporcionais antes de montar a proporção.",
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
              <strong className="text-growth-green">problemas de proporcionalidade</strong>: regra
              de 3 simples direta, inversa e composta facilmente matemática e resultados
              instantâneos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Identificação automática do tipo de proporção,
              resolução passo a passo, verificação dos resultados e explicação detalhada do processo
              de cálculo.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e resolução de exercícios. Para aplicações científicas ou de
              engenharia que exigem alta qualidade, consulte sempre um{" "}
              <strong>profissional qualificado</strong> e considere limitações numérica. Explore
              também nossas calculadoras de
              <a
                href="/calculadoras/matematica/porcentagem"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                porcentagem
              </a>
              para complementar seus estudos matemáticos.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco educacional • 📏 Regra de Três • 🔒 Dados não armazenados • 📱 Compatível com
              todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="regra-de-tres" />
    </div>
  );
}
