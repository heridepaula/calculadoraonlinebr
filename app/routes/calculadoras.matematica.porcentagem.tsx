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
      title: `Calculadora de Porcentagem 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calcule porcentagem online: aumentos, descontos e diferenças percentuais. Grátis, confiável e com explicação passo a passo.",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "generator", content: "Remix" },
    { name: "application-name", content: "CalculadoraOnlineBR" },
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
    },
    {
      property: "og:title",
      content: "Calculadora de Porcentagem Online Gratuita - Cálculos Confiáveis 2026",
    },
    {
      property: "og:description",
      content:
        "Ferramenta online confiável para cálculos de porcentagem: aumentos, descontos, diferenças percentuais e regra de três. Gratuita para estudantes!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-porcentagem.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Porcentagem - Cálculos Matemáticos com Porcentagem",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Porcentagem Online Gratuita - Resultados Confiáveis",
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta educacional gratuita para cálculos de porcentagem. Aumentos, descontos, diferenças percentuais e regra de três instantânea. Ideal para estudos!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-porcentagem.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Porcentagem - Cálculos Matemáticos",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Calculadora Porcentagem" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      name: "keywords",
      content:
        "calculadora porcentagem, porcentagem online, aumento percentual, desconto percentual, regra três, diferenca percentual, calculo porcentagem",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { rel: "preconnect", href: "https://www.google-analytics.com" },
    { rel: "preconnect", href: "https://www.googletagmanager.com" },
    { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Porcentagem Online Gratuita - Cálculos Matemáticos 2026",
        description:
          "Ferramenta educacional online gratuita para realizar cálculos confiáveis de porcentagem: aumentos, descontos, diferenças percentuais e regra de três. Resultados instantâneos com explicação passo a passo.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
          name: "Calculadora de Porcentagem Online Gratuita - Matemática Educacional",
          description:
            "Ferramenta educacional online para cálculos confiáveis de porcentagem: aumentos, descontos, diferenças percentuais e regra de três com explicação passo a passo.",
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
                name: "Porcentagem",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Porcentagem",
          description:
            "Cálculos matemáticos com porcentagem: aumentos, descontos, diferenças percentuais e regra de três",
          category: "Mathematics",
        },
        featureList: [
          "Cálculo de aumento percentual",
          "Cálculo de desconto percentual",
          "Diferença percentual entre valores",
          "Regra de três simples",
          "Porcentagem de um valor",
          "Valor original com desconto/aumento",
          "Percentual de variação",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Explicação passo a passo",
          "Formatação brasileira",
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
            name: "O que é porcentagem?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Porcentagem é uma forma de expressar uma proporção ou fração em relação a 100. O símbolo % significa 'por cento' ou 'a cada 100 unidades'. Por exemplo, 25% significa 25 de cada 100 partes.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular aumento percentual?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular um aumento percentual, multiplique o valor original por (1 + porcentagem/100). Por exemplo: R$ 100 com aumento de 20% = R$ 100 × (1 + 20/100) = R$ 120.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular desconto percentual?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular um desconto percentual, multiplique o valor original por (1 - porcentagem/100). Por exemplo: R$ 100 com desconto de 15% = R$ 100 × (1 - 15/100) = R$ 85.",
            },
          },
          {
            "@type": "Question",
            name: "O que é diferença percentual?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Diferença percentual compara dois valores mostrando a variação em porcentagem. Fórmula: ((Valor2 - Valor1) ÷ Valor1) × 100. Resultado positivo indica aumento, negativo indica redução.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Porcentagem",
        description:
          "Aprenda a realizar cálculos de porcentagem de forma simples e confiável com nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Selecione o tipo de cálculo",
            text: "Escolha o tipo de cálculo desejado: aumento percentual, desconto, diferença percentual, valor original ou porcentagem de um valor.",
          },
          {
            "@type": "HowToStep",
            name: "Insira os valores",
            text: "Digite os valores necessários nos campos correspondentes. Para aumentos/descontos: valor inicial e porcentagem. Para diferenças: dois valores para comparação.",
          },
          {
            "@type": "HowToStep",
            name: "Calcule o resultado",
            text: "Clique no botão 'Calcular' para obter o resultado do cálculo e a resolução passo a passo com a fórmula utilizada.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja o resultado formatado em moeda ou porcentagem, a fórmula utilizada e acompanhe a resolução detalhada passo a passo.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Porcentagem Online",
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
            name: "Porcentagem",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Calculadora de Porcentagem Online - Aumentos, Descontos e Diferenças",
        description:
          "Calcule porcentagem online: aumentos, descontos, diferenças percentuais e regra de três. Gratuita, confiável e com explicação passo a passo.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
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
              name: "Matemática",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Porcentagem",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/porcentagem",
            },
          ],
        },
        mainEntity: {
          "@type": "SoftwareApplication",
          name: "Calculadora de Porcentagem",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
          },
        },
      }),
    },
  ];
};

interface PercentageResult {
  originalValues: {
    value1: number;
    value2?: number;
    percentage?: number;
  };
  operation: "aumento" | "desconto" | "diferenca" | "valor-original" | "porcentagem-de";
  result: {
    value: number;
    percentage?: number;
    formatted: string;
  };
  steps: string[];
  formula?: string;
}

interface ValidationErrors {
  value1?: string;
  value2?: string;
  percentage?: string;
  operation?: string;
}

export default function PercentageCalculator() {
  // Inputs para porcentagem
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [percentage, setPercentage] = useState("");
  const [operation, setOperation] = useState<
    "aumento" | "desconto" | "diferenca" | "valor-original" | "porcentagem-de"
  >("aumento");

  const [result, setResult] = useState<PercentageResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "porcentagem",
    category: "matematica",
  });
  useFormTracking("porcentagem");

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

  // Funções auxiliares para porcentagem
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const val1 = parseNumber(value1);
    const val2 = parseNumber(value2);
    const perc = parseNumber(percentage);

    // Validações específicas por tipo de operação
    switch (operation) {
      case "aumento":
      case "desconto":
        if (value1.trim() === "") {
          newErrors.value1 = "Valor inicial é obrigatório";
          ok = false;
        } else if (val1 < 0) {
          newErrors.value1 = "Valor inicial deve ser positivo";
          ok = false;
        }
        if (percentage.trim() === "") {
          newErrors.percentage = "Porcentagem é obrigatória";
          ok = false;
        } else if (perc < 0) {
          newErrors.percentage = "Porcentagem deve ser positiva";
          ok = false;
        }
        break;

      case "diferenca":
        if (value1.trim() === "") {
          newErrors.value1 = "Primeiro valor é obrigatório";
          ok = false;
        }
        if (value2.trim() === "") {
          newErrors.value2 = "Segundo valor é obrigatório";
          ok = false;
        }
        if (val1 === 0) {
          newErrors.value1 =
            "Primeiro valor não pode ser zero para cálculo de diferença percentual";
          ok = false;
        }
        break;

      case "valor-original":
        if (value1.trim() === "") {
          newErrors.value1 = "Valor com desconto/aumento é obrigatório";
          ok = false;
        } else if (val1 < 0) {
          newErrors.value1 = "Valor deve ser positivo";
          ok = false;
        }
        if (percentage.trim() === "") {
          newErrors.percentage = "Porcentagem é obrigatória";
          ok = false;
        }
        break;

      case "porcentagem-de":
        if (value1.trim() === "") {
          newErrors.value1 = "Valor parcial é obrigatório";
          ok = false;
        }
        if (value2.trim() === "") {
          newErrors.value2 = "Valor total é obrigatório";
          ok = false;
        } else if (val2 === 0) {
          newErrors.value2 = "Valor total não pode ser zero";
          ok = false;
        }
        break;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculatePercentage = (): PercentageResult => {
    const val1 = parseNumber(value1);
    const val2 = parseNumber(value2);
    const perc = parseNumber(percentage);

    let resultValue: number;
    let resultPercentage: number | undefined;
    const steps: string[] = [];
    let formula = "";

    const originalValues = { value1: val1, value2: val2, percentage: perc };

    switch (operation) {
      case "aumento":
        resultValue = val1 + (val1 * perc) / 100;
        formula = "Valor Final = Valor Inicial + (Valor Inicial × Porcentagem ÷ 100)";
        steps.push(`Valor inicial: ${formatCurrency(val1)}`);
        steps.push(`Aumento de: ${formatPercentage(perc)}`);
        steps.push(
          `Cálculo do aumento: ${formatCurrency(val1)} × ${perc}% = ${formatCurrency((val1 * perc) / 100)}`
        );
        steps.push(
          `Valor final: ${formatCurrency(val1)} + ${formatCurrency((val1 * perc) / 100)} = ${formatCurrency(resultValue)}`
        );
        break;

      case "desconto":
        resultValue = val1 - (val1 * perc) / 100;
        formula = "Valor Final = Valor Inicial - (Valor Inicial × Porcentagem ÷ 100)";
        steps.push(`Valor inicial: ${formatCurrency(val1)}`);
        steps.push(`Desconto de: ${formatPercentage(perc)}`);
        steps.push(
          `Cálculo do desconto: ${formatCurrency(val1)} × ${perc}% = ${formatCurrency((val1 * perc) / 100)}`
        );
        steps.push(
          `Valor final: ${formatCurrency(val1)} - ${formatCurrency((val1 * perc) / 100)} = ${formatCurrency(resultValue)}`
        );
        break;

      case "diferenca":
        resultPercentage = ((val2 - val1) / Math.abs(val1)) * 100;
        resultValue = resultPercentage;
        formula = "Diferença % = ((Valor2 - Valor1) ÷ |Valor1|) × 100";
        steps.push(`Primeiro valor: ${formatCurrency(val1)}`);
        steps.push(`Segundo valor: ${formatCurrency(val2)}`);
        steps.push(
          `Diferença absoluta: ${formatCurrency(val2)} - ${formatCurrency(val1)} = ${formatCurrency(val2 - val1)}`
        );
        steps.push(
          `Diferença percentual: (${formatCurrency(val2 - val1)} ÷ ${formatCurrency(Math.abs(val1))}) × 100 = ${formatPercentage(resultPercentage)}`
        );
        if (resultPercentage > 0) {
          steps.push(`Resultado: Aumento de ${formatPercentage(Math.abs(resultPercentage))}`);
        } else {
          steps.push(`Resultado: Redução de ${formatPercentage(Math.abs(resultPercentage))}`);
        }
        break;

      case "valor-original":
        // Se é aumento: valor_original × (1 + perc/100) = valor_final
        // Se é desconto: valor_original × (1 - perc/100) = valor_final
        // Assumindo desconto por padrão, mas pode ser configurado
        const isDiscount = true; // Pode ser configurado via interface
        if (isDiscount) {
          resultValue = val1 / (1 - perc / 100);
          formula = "Valor Original = Valor com Desconto ÷ (1 - Porcentagem ÷ 100)";
          steps.push(`Valor com desconto: ${formatCurrency(val1)}`);
          steps.push(`Desconto aplicado: ${formatPercentage(perc)}`);
          steps.push(`Fator de desconto: 1 - ${perc}% = ${(1 - perc / 100).toFixed(4)}`);
          steps.push(
            `Valor original: ${formatCurrency(val1)} ÷ ${(1 - perc / 100).toFixed(4)} = ${formatCurrency(resultValue)}`
          );
        } else {
          resultValue = val1 / (1 + perc / 100);
          formula = "Valor Original = Valor com Aumento ÷ (1 + Porcentagem ÷ 100)";
          steps.push(`Valor com aumento: ${formatCurrency(val1)}`);
          steps.push(`Aumento aplicado: ${formatPercentage(perc)}`);
          steps.push(`Fator de aumento: 1 + ${perc}% = ${(1 + perc / 100).toFixed(4)}`);
          steps.push(
            `Valor original: ${formatCurrency(val1)} ÷ ${(1 + perc / 100).toFixed(4)} = ${formatCurrency(resultValue)}`
          );
        }
        break;

      case "porcentagem-de":
        resultPercentage = (val1 / val2) * 100;
        resultValue = resultPercentage;
        formula = "Porcentagem = (Valor Parcial ÷ Valor Total) × 100";
        steps.push(`Valor parcial: ${formatCurrency(val1)}`);
        steps.push(`Valor total: ${formatCurrency(val2)}`);
        steps.push(
          `Divisão: ${formatCurrency(val1)} ÷ ${formatCurrency(val2)} = ${(val1 / val2).toFixed(6)}`
        );
        steps.push(
          `Porcentagem: ${(val1 / val2).toFixed(6)} × 100 = ${formatPercentage(resultPercentage)}`
        );
        break;

      default:
        resultValue = 0;
        steps.push("Operação não reconhecida");
    }

    let formatted: string;
    if (operation === "diferenca" || operation === "porcentagem-de") {
      formatted = formatPercentage(resultValue);
    } else {
      formatted = formatCurrency(resultValue);
    }

    return {
      originalValues,
      operation,
      result: {
        value: resultValue,
        percentage: resultPercentage,
        formatted,
      },
      steps,
      formula,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculatePercentage();
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
    setValue1("");
    setValue2("");
    setPercentage("");
    setOperation("aumento");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <nav aria-label="Navegação estrutural">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
          <BreadcrumbItem isLast>Porcentagem</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center" role="banner">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Porcentagem 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Realize <strong className="text-growth-green">cálculos de porcentagem</strong> de forma
          simples e confiável. Calcule aumentos, descontos, diferenças percentuais e regra de três
          com <strong className="text-primary-blue-dark">explicação passo a passo</strong> para seus
          estudos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📊 <strong>Cálculos de Porcentagem</strong> • 📈 <strong>Aumentos e Descontos</strong> •
            🧮 <strong>Resultados Instantâneos</strong>
          </p>
        </div>
      </header>

      <main role="main">
        <Card>
          <CardHeader>
            <CardTitle as="h2">📊 Cálculos de Porcentagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-lg text-text-secondary">
                Selecione o tipo de cálculo de porcentagem:
              </p>
              <div className="mt-4">
                <select
                  value={operation}
                  onChange={(e) =>
                    setOperation(
                      e.target.value as
                        | "aumento"
                        | "desconto"
                        | "diferenca"
                        | "valor-original"
                        | "porcentagem-de"
                    )
                  }
                  className="mx-auto block rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-2 text-lg font-medium text-text-primary"
                  aria-label="Selecionar tipo de cálculo de porcentagem"
                >
                  <option value="aumento">📈 Aumento Percentual</option>
                  <option value="desconto">📉 Desconto Percentual</option>
                  <option value="diferenca">⚖️ Diferença Percentual</option>
                  <option value="valor-original">⬅️ Valor Original</option>
                  <option value="porcentagem-de">🔢 Porcentagem de um Valor</option>
                </select>
              </div>
            </div>

            {/* Campos de entrada para porcentagem */}
            <div className="mb-6 space-y-6">
              {/* Campos dinâmicos baseados na operação */}
              {(operation === "aumento" || operation === "desconto") && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-primary-blue-dark">
                      Valor Inicial
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Valor (R$)"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="1000"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.value1} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-growth-green">
                      {operation === "aumento" ? "Aumento" : "Desconto"} (%)
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Porcentagem (%)"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="15"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.percentage} />
                    </div>
                  </div>
                </div>
              )}

              {operation === "diferenca" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-primary-blue-dark">
                      Primeiro Valor
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Valor Inicial (R$)"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="100"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.value1} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-growth-green">
                      Segundo Valor
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Valor Final (R$)"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        placeholder="120"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.value2} />
                    </div>
                  </div>
                </div>
              )}

              {operation === "valor-original" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-primary-blue-dark">
                      Valor com Desconto/Aumento
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Valor Final (R$)"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="850"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.value1} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-growth-green">
                      Porcentagem Aplicada
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Desconto/Aumento (%)"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="15"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.percentage} />
                    </div>
                  </div>
                </div>
              )}

              {operation === "porcentagem-de" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-primary-blue-dark">
                      Valor Parcial
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Parte do Valor (R$)"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="250"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.value1} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <h3 className="mb-3 text-center text-lg font-semibold text-growth-green">
                      Valor Total
                    </h3>
                    <div>
                      <Input
                        type="number"
                        label="Total (R$)"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        placeholder="1000"
                        fullWidth
                        className="h-12 text-lg"
                        step="0.01"
                      />
                      <ErrorMessage error={errors.value2} />
                      <div className="mt-1 text-xs text-text-secondary">Não pode ser zero</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="margin-top-4 flex justify-center space-x-4">
              <Button
                onClick={handleCalculate}
                className="px-8"
                aria-label="Calcular resultado da porcentagem"
              >
                Calcular
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                aria-label="Limpar todos os campos e reiniciar cálculo"
              >
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && (
          <Card
            ref={resultRef as any}
            className="border-2 border-growth-green bg-growth-green-soft"
          >
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                📊 Resultado do Cálculo de Porcentagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-lg bg-gray-900 p-4">
                <div className="text-center">
                  <div className="mb-2 text-sm text-text-secondary">
                    {result.operation === "aumento" && "Aumento Percentual"}
                    {result.operation === "desconto" && "Desconto Percentual"}
                    {result.operation === "diferenca" && "Diferença Percentual"}
                    {result.operation === "valor-original" && "Valor Original"}
                    {result.operation === "porcentagem-de" && "Porcentagem de um Valor"}
                  </div>
                  <div className="text-3xl font-bold text-primary-blue-dark">
                    {result.result.formatted}
                  </div>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-2xl font-bold text-system-warning">
                    {result.operation === "diferenca" || result.operation === "porcentagem-de"
                      ? formatPercentage(result.result.value)
                      : formatCurrency(result.result.value)}
                  </div>
                  <div className="text-sm text-text-secondary">Resultado</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-xl font-bold text-growth-green">
                    {result.formula && (
                      <div className="mb-2 text-xs text-text-secondary">Fórmula:</div>
                    )}
                    <div className="text-sm">{result.formula || "N/A"}</div>
                  </div>
                  <div className="text-sm text-text-secondary">Fórmula Utilizada</div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  Informações do Cálculo
                </h4>
                <div className="text-sm text-text-secondary">
                  <div>
                    <strong>Tipo de cálculo:</strong>{" "}
                    {result.operation === "aumento" && "Aumento Percentual"}
                    {result.operation === "desconto" && "Desconto Percentual"}
                    {result.operation === "diferenca" && "Diferença Percentual"}
                    {result.operation === "valor-original" && "Cálculo do Valor Original"}
                    {result.operation === "porcentagem-de" && "Porcentagem de um Valor"}
                  </div>
                  <div>
                    <strong>Valores utilizados:</strong>{" "}
                    {result.originalValues.value1 &&
                      `Valor 1: ${formatCurrency(result.originalValues.value1)}`}
                    {result.originalValues.value2 &&
                      ` • Valor 2: ${formatCurrency(result.originalValues.value2)}`}
                    {result.originalValues.percentage &&
                      ` • Porcentagem: ${formatPercentage(result.originalValues.percentage)}`}
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
      </main>

      {/* Seção: Porcentagem - Guia Completo */}
      <aside role="complementary" aria-labelledby="guia-porcentagem">
        <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle
              as="h2"
              className="text-2xl font-bold text-text-primary"
              id="guia-porcentagem"
            >
              🎯 Porcentagem – Guia Completo 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Conceitos de Porcentagem */}
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                  📊 Conceitos de Porcentagem
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Porcentagem é uma forma de expressar uma proporção em relação a 100. O símbolo
                      % significa "por cento" ou "a cada 100 unidades".
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas Básicas</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Porcentagem de um valor: (Valor × %) ÷ 100</li>
                      <li>• Aumento: Valor × (1 + %/100)</li>
                      <li>• Desconto: Valor × (1 - %/100)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Facilita comparações entre valores</li>
                      <li>• Base 100 para facilitar cálculos</li>
                      <li>• Universalmente utilizada</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Comércio: descontos e aumentos</li>
                      <li>• Finanças: juros e rendimentos</li>
                      <li>• Estatística: análise de dados</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tipos de Cálculos de Porcentagem */}
              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                  📈 Tipos de Cálculos de Porcentagem
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-primary-blue-dark">
                      🔍 Aumentos e Descontos
                    </h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Cálculos para aplicar aumentos ou descontos sobre um valor inicial, comuns em
                      vendas, impostos e reajustes.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📊 Fórmulas</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Aumento: Valor × (1 + %/100)</li>
                      <li>• Desconto: Valor × (1 - %/100)</li>
                      <li>• Diferença: ((V2-V1)/V1) × 100</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Facilita comparações</li>
                      <li>• Padrão universal de medida</li>
                      <li>• Aplicação em diversas áreas</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Comércio: preços e descontos</li>
                      <li>• Finanças: juros e investimentos</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Regra de Três */}
              <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                  🔢 Regra de Três e Porcentagem
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">🔍 Relação</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      A regra de três é fundamental para resolver problemas de porcentagem,
                      estabelecendo proporções entre valores.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📊 Estrutura</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• 100% está para Valor Total</li>
                      <li>• X% está para Valor Parcial</li>
                      <li>• X = (Valor Parcial × 100) ÷ Valor Total</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">✅ Casos de Uso</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Calcular descontos em compras</li>
                      <li>• Determinar juros e rendimentos</li>
                      <li>• Analisar crescimento e variações</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-warning">📝 Exemplos</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• 20% de R$ 500 = R$ 100</li>
                      <li>• R$ 80 é 25% de R$ 320</li>
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
              ⚖️ Tabela Comparativa: Métodos de Cálculo de Porcentagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-surface-variant">
                    <th className="p-3 text-left font-semibold">Critério</th>
                    <th className="p-3 text-center font-semibold text-primary-blue-dark">
                      Aumento/Desconto
                    </th>
                    <th className="p-3 text-center font-semibold text-growth-green">Diferença %</th>
                    <th className="p-3 text-center font-semibold text-system-warning">
                      Valor Original
                    </th>
                    <th className="p-3 text-center font-semibold text-system-info">
                      Regra de Três
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Aplicabilidade</td>
                    <td className="p-3 text-center text-primary-blue-dark">Comercial</td>
                    <td className="p-3 text-center text-growth-green">Análise</td>
                    <td className="p-3 text-center text-system-warning">Investigativa</td>
                    <td className="p-3 text-center text-system-info">Universal</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Dificuldade</td>
                    <td className="p-3 text-center">⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐</td>
                    <td className="p-3 text-center">⭐</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Detalhamento</td>
                    <td className="p-3 text-center text-primary-blue-dark">Exata</td>
                    <td className="p-3 text-center text-growth-green">Exata</td>
                    <td className="p-3 text-center text-system-warning">Exata</td>
                    <td className="p-3 text-center text-system-info">Exata</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Tempo de Resolução</td>
                    <td className="p-3 text-center">Rápido</td>
                    <td className="p-3 text-center">Rápido</td>
                    <td className="p-3 text-center">Médio</td>
                    <td className="p-3 text-center">Rápido</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Requisitos</td>
                    <td className="p-3 text-center">Valor e porcentagem</td>
                    <td className="p-3 text-center">Dois valores</td>
                    <td className="p-3 text-center">Valor final e %</td>
                    <td className="p-3 text-center">Proporção</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Melhor Uso</td>
                    <td className="p-3 text-center text-primary-blue-dark">Vendas</td>
                    <td className="p-3 text-center text-growth-green">Comparação</td>
                    <td className="p-3 text-center text-system-warning">Investigação</td>
                    <td className="p-3 text-center text-system-info">Educação</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                <h4 className="mb-2 font-bold text-primary-blue-dark">📈 Aumento/Desconto</h4>
                <p className="text-sm text-text-secondary">
                  Método <strong>mais comum</strong> para calcular preços finais com aumentos ou
                  descontos percentuais em vendas e reajustes.
                </p>
              </div>

              <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                <h4 className="mb-2 font-bold text-growth-green">📊 Diferença %</h4>
                <p className="text-sm text-text-secondary">
                  Ideal para <strong>análise de variações</strong> entre dois valores, comum em
                  estatística e relatórios financeiros.
                </p>
              </div>

              <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h4 className="mb-2 font-bold text-system-warning">🔍 Valor Original</h4>
                <p className="text-sm text-text-secondary">
                  Útil para <strong>descobrir valores iniciais</strong> quando conhecemos apenas o
                  resultado final e a porcentagem aplicada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Porcentagem"
          items={[
            {
              question: "O que é porcentagem?",
              answer:
                "Porcentagem é uma forma de expressar uma proporção ou fração em relação a 100. O símbolo % significa 'por cento' ou 'a cada 100 unidades'. Por exemplo, 25% significa 25 de cada 100 partes.",
              borderColor: "primary-blue",
            },
            {
              question: "Como calcular aumento percentual?",
              answer:
                "Para calcular um aumento percentual, multiplique o valor original por (1 + porcentagem/100). Por exemplo: R$ 100 com aumento de 20% = R$ 100 × (1 + 20/100) = R$ 120.",
              borderColor: "growth-green",
            },
            {
              question: "Como calcular desconto percentual?",
              answer:
                "Para calcular um desconto percentual, multiplique o valor original por (1 - porcentagem/100). Por exemplo: R$ 100 com desconto de 15% = R$ 100 × (1 - 15/100) = R$ 85.",
              borderColor: "system-info",
            },
            {
              question: "O que é diferença percentual?",
              answer:
                "Diferença percentual compara dois valores mostrando a variação em porcentagem. Fórmula: ((Valor2 - Valor1) ÷ Valor1) × 100. Resultado positivo indica aumento, negativo indica redução.",
              borderColor: "system-warning",
            },
            {
              question: "Como encontrar o valor original?",
              answer:
                "Para encontrar o valor original quando conhecemos o valor final e a porcentagem: Valor Original = Valor Final ÷ (1 ± porcentagem/100). Use '+' para aumento e '-' para desconto.",
              borderColor: "growth-green",
            },
            {
              question: "O que é regra de três em porcentagem?",
              answer:
                "A regra de três relaciona proporções: se 100% corresponde ao valor total, então X% corresponde ao valor parcial. Fórmula: X = (Valor Parcial × 100) ÷ Valor Total.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica Importante sobre Porcentagem",
            content:
              "<strong>Para melhores resultados:</strong> sempre verifique se os valores são positivos (exceto em diferenças percentuais) e use as fórmulas corretas para cada tipo de cálculo.",
          }}
          footerText="<strong>Lembre-se:</strong> Em aumentos e descontos, use fatores multiplicativos. Para diferenças, compare valores. Sempre interprete o resultado no contexto do problema."
        />

        {/* Footer com informações adicionais */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Como Usar Esta Calculadora de Porcentagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta <strong className="text-primary-blue-dark">calculadora de porcentagem</strong>{" "}
                permite realizar{" "}
                <strong className="text-growth-green">cálculos básicos com porcentagem</strong>:
                aumentos, descontos, diferenças percentuais e regra de três facilmente matemática e
                resultados instantâneos.
              </p>
              <p>
                <strong>Funcionalidades:</strong> Cálculo de aumentos e descontos, determinação de
                diferenças percentuais, busca do valor original, resolução passo a passo e aplicação
                da regra de três em problemas de porcentagem.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
                fins educacionais e comerciais básicos. Para aplicações financeiras que exigem alta
                detalhamento, consulte sempre um <strong>profissional qualificado</strong> e
                considere limitações numérica. Explore também nossas calculadoras de
                <a
                  href="/calculadoras/matematica/fracoes"
                  className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
                >
                  frações
                </a>
                para complementar seus estudos matemáticos.
              </p>
              <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                🔎 Foco educacional • 📊 Cálculos de Porcentagem • 🔒 Dados não armazenados • 📱
                Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
              </p>
            </div>
          </CardContent>
        </Card>
      </aside>

      <RelatedCalculators category="matematica" currentCalculatorId="porcentagem" />
    </div>
  );
}
