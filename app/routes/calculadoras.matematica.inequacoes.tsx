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
      title: `Calculadora de Inequações 1º e 2º Grau 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "✅ Resolva inequações de 1º e 2º grau GRÁTIS! Encontre intervalos e soluções com explicação passo a passo profissional.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
    },
    {
      property: "og:title",
      content: "Calculadora de Inequações 1º e 2º Grau 2026 | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "✅ Resolva inequações de 1º e 2º grau GRÁTIS! Encontre intervalos e soluções com explicação passo a passo.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-inequacoes.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Inequações - Resolução de Inequações de 1º e 2º Grau",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Inequações 1º e 2º Grau 2026 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "✅ Resolva inequações de 1º e 2º grau GRÁTIS! Encontre intervalos e soluções com explicação passo a passo.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-inequacoes.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Inequações - Resolução de Inequações de 1º e 2º Grau",
    },
    { name: "twitter:site", content: "@CalculadoraOnlineBR" },
    { name: "twitter:creator", content: "@CalculadoraOnlineBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Inequações" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      name: "keywords",
      content:
        "inequações primeiro grau, inequações segundo grau, calculadora inequações, intervalos solução, matemática online",
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
            name: "Inequações",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Inequações de 1º e 2º Grau Online 2026",
        description:
          "Ferramenta educacional online gratuita para resolver inequações de primeiro e segundo grau. Encontre intervalos de solução com explicação passo a passo e representação gráfica.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-21",
        datePublished: "2024-11-01",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          alternateName: "Calculadora Online Brasil",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 180,
            height: 180,
          },
          foundingDate: "2024",
          description: "Plataforma educacional gratuita com calculadoras online para matemática, finanças, saúde e direito trabalhista",
          sameAs: [
            "https://twitter.com/CalculadoraOnlineBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        featureList: [
          "Resolução de inequações de 1º grau",
          "Resolução de inequações de 2º grau",
          "Cálculo de intervalos de solução",
          "Representação gráfica",
          "Explicação passo a passo",
          "Verificação automática",
          "Interface móvel responsiva",
          "Múltiplos operadores (<, >, ≤, ≥)",
          "Análise de sinais",
          "Resultados em notação de intervalo",
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Calculadora de Inequações de 1º e 2º Grau 2026",
        description: "Resolva inequações de 1º e 2º grau com explicação passo a passo e representação gráfica. Ferramenta educacional gratuita.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
        inLanguage: "pt-BR",
        dateModified: "2025-09-21",
        datePublished: "2024-11-01",
        mainEntity: {
          "@type": "WebApplication",
          name: "Calculadora de Inequações",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web Browser",
          isAccessibleForFree: true,
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
              name: "Inequações",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/inequacoes",
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          alternateName: "Calculadora Online Brasil",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 180,
            height: 180,
          },
          foundingDate: "2024",
          description: "Plataforma educacional gratuita com calculadoras online para matemática, finanças, saúde e direito trabalhista",
        },
        about: [
          {
            "@type": "Thing",
            name: "Inequações de Primeiro Grau",
            description: "Desigualdades matemáticas da forma ax + b > 0, ax + b < 0, ax + b ≥ 0 ou ax + b ≤ 0",
          },
          {
            "@type": "Thing",
            name: "Inequações de Segundo Grau",
            description: "Desigualdades matemáticas da forma ax² + bx + c > 0, ax² + bx + c < 0, ax² + bx + c ≥ 0 ou ax² + bx + c ≤ 0",
          },
          {
            "@type": "Thing",
            name: "Intervalos de Solução",
            description: "Conjunto de valores que satisfazem uma inequação, representados em notação de intervalo",
          },
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
            name: "O que são inequações de primeiro grau?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Inequações de primeiro grau são desigualdades matemáticas da forma ax + b > 0, ax + b < 0, ax + b ≥ 0 ou ax + b ≤ 0, onde a ≠ 0. A solução é um intervalo de valores que satisfazem a desigualdade.",
            },
          },
          {
            "@type": "Question",
            name: "Como resolver inequações de segundo grau?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para resolver inequações de segundo grau (ax² + bx + c > 0), primeiro encontre as raízes da equação ax² + bx + c = 0, depois analise o sinal da parábola em cada intervalo determinado pelas raízes.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre > e ≥ nas inequações?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O símbolo > indica 'maior que' (não inclui o valor), enquanto ≥ indica 'maior ou igual a' (inclui o valor). Na representação gráfica, > usa bolinha aberta e ≥ usa bolinha fechada.",
            },
          },
          {
            "@type": "Question",
            name: "Como representar a solução de uma inequação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A solução pode ser representada em notação de intervalo [a, b], (a, b), na reta numérica ou em forma de conjunto. Por exemplo: x > 2 pode ser escrito como (2, +∞) ou {x ∈ ℝ | x > 2}.",
            },
          },
          {
            "@type": "Question",
            name: "Quando uma inequação não tem solução?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Uma inequação não tem solução quando não existe nenhum valor real que a satisfaça. Por exemplo, x² + 1 < 0 não tem solução real, pois x² + 1 é sempre positivo para qualquer valor real de x.",
            },
          },
        ],
      }),
    },
  ];
};

interface InequalityResult {
  type: "first-degree" | "second-degree";
  operator: "<" | ">" | "≤" | "≥";
  solution: string;
  interval: string;
  steps: string[];
  graphPoints?: number[];
  hasRealSolution: boolean;
  explanation: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function InequalityCalculator() {
  const [degree, setDegree] = useState<"first" | "second">("first");
  const [operator, setOperator] = useState<"<" | ">" | "≤" | "≥">(">");

  // Coeficientes para inequação de 1º grau: ax + b [operator] 0
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  // Coeficiente adicional para inequação de 2º grau: ax² + bx + c [operator] 0
  const [c, setC] = useState("");

  const [result, setResult] = useState<InequalityResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "inequacoes",
    category: "matematica",
  });
  useFormTracking("inequacoes");

  // IndexNow integration for SEO
  const { submitCalculatorUrls } = useIndexNow({
    autoSubmit: true,
    delay: 2000,
  });

  const parseNumber = (v: string): number => {
    const s = String(v ?? "");
    const normalized = s.replace(",", ".");
    const n = parseFloat(normalized);
    return isNaN(n) ? 0 : n;
  };

  const formatResult = (value: number): string => {
    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toFixed(4).replace(/\.?0+$/, "");
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (a.trim() === "") {
      newErrors.a = "Coeficiente 'a' é obrigatório";
      isValid = false;
    } else if (isNaN(parseNumber(a))) {
      newErrors.a = "Coeficiente 'a' deve ser um número";
      isValid = false;
    } else if (parseNumber(a) === 0) {
      newErrors.a = "Coeficiente 'a' não pode ser zero";
      isValid = false;
    }

    if (b.trim() === "") {
      newErrors.b = "Coeficiente 'b' é obrigatório";
      isValid = false;
    } else if (isNaN(parseNumber(b))) {
      newErrors.b = "Coeficiente 'b' deve ser um número";
      isValid = false;
    }

    if (degree === "second") {
      if (c.trim() === "") {
        newErrors.c = "Coeficiente 'c' é obrigatório para inequações de 2º grau";
        isValid = false;
      } else if (isNaN(parseNumber(c))) {
        newErrors.c = "Coeficiente 'c' deve ser um número";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const solveFirstDegree = (): InequalityResult => {
    const steps: string[] = [];
    const coeffA = parseNumber(a);
    const coeffB = parseNumber(b);

    steps.push("Resolução da Inequação de 1º Grau");
    steps.push(`Inequação: ${formatResult(coeffA)}x + ${formatResult(coeffB)} ${operator} 0`);

    // Isolar x
    let solution: string;
    let interval: string;
    let explanation: string;

    if (coeffA > 0) {
      // a > 0: mantém o sentido da desigualdade
      const criticalPoint = -coeffB / coeffA;
      steps.push(`Isolando x: ${formatResult(coeffA)}x ${operator} ${formatResult(-coeffB)}`);
      steps.push(`x ${operator} ${formatResult(criticalPoint)}`);

      switch (operator) {
        case ">":
          solution = `x > ${formatResult(criticalPoint)}`;
          interval = `(${formatResult(criticalPoint)}, +∞)`;
          explanation = `Todos os valores maiores que ${formatResult(criticalPoint)}`;
          break;
        case "≥":
          solution = `x ≥ ${formatResult(criticalPoint)}`;
          interval = `[${formatResult(criticalPoint)}, +∞)`;
          explanation = `Todos os valores maiores ou iguais a ${formatResult(criticalPoint)}`;
          break;
        case "<":
          solution = `x < ${formatResult(criticalPoint)}`;
          interval = `(-∞, ${formatResult(criticalPoint)})`;
          explanation = `Todos os valores menores que ${formatResult(criticalPoint)}`;
          break;
        case "≤":
          solution = `x ≤ ${formatResult(criticalPoint)}`;
          interval = `(-∞, ${formatResult(criticalPoint)}]`;
          explanation = `Todos os valores menores ou iguais a ${formatResult(criticalPoint)}`;
          break;
      }
    } else {
      // a < 0: inverte o sentido da desigualdade
      const criticalPoint = -coeffB / coeffA;
      steps.push(`Isolando x: ${formatResult(coeffA)}x ${operator} ${formatResult(-coeffB)}`);
      steps.push(`Dividindo por ${formatResult(coeffA)} (negativo - inverte a desigualdade)`);

      const invertedOp = operator === ">" ? "<" : operator === "<" ? ">" : operator === "≥" ? "≤" : "≥";
      steps.push(`x ${invertedOp} ${formatResult(criticalPoint)}`);

      switch (invertedOp) {
        case ">":
          solution = `x > ${formatResult(criticalPoint)}`;
          interval = `(${formatResult(criticalPoint)}, +∞)`;
          explanation = `Todos os valores maiores que ${formatResult(criticalPoint)}`;
          break;
        case "≥":
          solution = `x ≥ ${formatResult(criticalPoint)}`;
          interval = `[${formatResult(criticalPoint)}, +∞)`;
          explanation = `Todos os valores maiores ou iguais a ${formatResult(criticalPoint)}`;
          break;
        case "<":
          solution = `x < ${formatResult(criticalPoint)}`;
          interval = `(-∞, ${formatResult(criticalPoint)})`;
          explanation = `Todos os valores menores que ${formatResult(criticalPoint)}`;
          break;
        case "≤":
          solution = `x ≤ ${formatResult(criticalPoint)}`;
          interval = `(-∞, ${formatResult(criticalPoint)}]`;
          explanation = `Todos os valores menores ou iguais a ${formatResult(criticalPoint)}`;
          break;
      }
    }

    return {
      type: "first-degree",
      operator,
      solution,
      interval,
      steps,
      hasRealSolution: true,
      explanation,
    };
  };

  const solveSecondDegree = (): InequalityResult => {
    const steps: string[] = [];
    const coeffA = parseNumber(a);
    const coeffB = parseNumber(b);
    const coeffC = parseNumber(c);

    steps.push("Resolução da Inequação de 2º Grau");
    steps.push(`Inequação: ${formatResult(coeffA)}x² + ${formatResult(coeffB)}x + ${formatResult(coeffC)} ${operator} 0`);

    // Calcular discriminante (delta)
    const delta = coeffB * coeffB - 4 * coeffA * coeffC;
    steps.push(`Calculando o discriminante: Δ = b² - 4ac`);
    steps.push(`Δ = ${formatResult(coeffB)}² - 4 × ${formatResult(coeffA)} × ${formatResult(coeffC)} = ${formatResult(delta)}`);

    let solution: string;
    let interval: string;
    let explanation: string;
    let graphPoints: number[] = [];

    if (delta < 0) {
      // Sem raízes reais - parábola não toca o eixo x
      steps.push("Δ < 0: A parábola não possui raízes reais");

      if (coeffA > 0) {
        // Parábola voltada para cima, sempre positiva
        if (operator === ">" || operator === "≥") {
          solution = "x ∈ ℝ (todos os números reais)";
          interval = "(-∞, +∞)";
          explanation = "A parábola está sempre acima do eixo x";
        } else {
          solution = "∅ (conjunto vazio)";
          interval = "∅";
          explanation = "A parábola nunca fica abaixo do eixo x";
        }
      } else {
        // Parábola voltada para baixo, sempre negativa
        if (operator === "<" || operator === "≤") {
          solution = "x ∈ ℝ (todos os números reais)";
          interval = "(-∞, +∞)";
          explanation = "A parábola está sempre abaixo do eixo x";
        } else {
          solution = "∅ (conjunto vazio)";
          interval = "∅";
          explanation = "A parábola nunca fica acima do eixo x";
        }
      }
    } else if (delta === 0) {
      // Uma raiz real (raiz dupla)
      const root = -coeffB / (2 * coeffA);
      steps.push(`Δ = 0: Uma raiz real (dupla): x = ${formatResult(root)}`);
      graphPoints = [root];

      if (coeffA > 0) {
        // Parábola voltada para cima
        if (operator === ">" ) {
          solution = `x ∈ ℝ, x ≠ ${formatResult(root)}`;
          interval = `(-∞, ${formatResult(root)}) ∪ (${formatResult(root)}, +∞)`;
          explanation = "A parábola toca o eixo x apenas em um ponto";
        } else if (operator === "≥") {
          solution = "x ∈ ℝ (todos os números reais)";
          interval = "(-∞, +∞)";
          explanation = "A parábola toca o eixo x em um ponto e é positiva nos demais";
        } else {
          solution = "∅ (conjunto vazio)";
          interval = "∅";
          explanation = "A parábola só toca o eixo x, nunca fica abaixo";
        }
      } else {
        // Parábola voltada para baixo
        if (operator === "<") {
          solution = `x ∈ ℝ, x ≠ ${formatResult(root)}`;
          interval = `(-∞, ${formatResult(root)}) ∪ (${formatResult(root)}, +∞)`;
          explanation = "A parábola toca o eixo x apenas em um ponto";
        } else if (operator === "≤") {
          solution = "x ∈ ℝ (todos os números reais)";
          interval = "(-∞, +∞)";
          explanation = "A parábola toca o eixo x em um ponto e é negativa nos demais";
        } else {
          solution = "∅ (conjunto vazio)";
          interval = "∅";
          explanation = "A parábola só toca o eixo x, nunca fica acima";
        }
      }
    } else {
      // Duas raízes reais distintas
      const x1 = (-coeffB - Math.sqrt(delta)) / (2 * coeffA);
      const x2 = (-coeffB + Math.sqrt(delta)) / (2 * coeffA);
      const root1 = Math.min(x1, x2);
      const root2 = Math.max(x1, x2);

      steps.push(`Δ > 0: Duas raízes reais:`);
      steps.push(`x₁ = ${formatResult(root1)}`);
      steps.push(`x₂ = ${formatResult(root2)}`);

      graphPoints = [root1, root2];

      // Analisar sinal da parábola em cada intervalo
      steps.push("Análise de sinais:");

      if (coeffA > 0) {
        // Parábola voltada para cima: negativa entre as raízes, positiva fora
        steps.push(`Para x < ${formatResult(root1)}: f(x) > 0`);
        steps.push(`Para ${formatResult(root1)} < x < ${formatResult(root2)}: f(x) < 0`);
        steps.push(`Para x > ${formatResult(root2)}: f(x) > 0`);

        switch (operator) {
          case ">":
            solution = `x < ${formatResult(root1)} ou x > ${formatResult(root2)}`;
            interval = `(-∞, ${formatResult(root1)}) ∪ (${formatResult(root2)}, +∞)`;
            explanation = "Intervalos onde a parábola é positiva";
            break;
          case "≥":
            solution = `x ≤ ${formatResult(root1)} ou x ≥ ${formatResult(root2)}`;
            interval = `(-∞, ${formatResult(root1)}] ∪ [${formatResult(root2)}, +∞)`;
            explanation = "Intervalos onde a parábola é positiva ou zero";
            break;
          case "<":
            solution = `${formatResult(root1)} < x < ${formatResult(root2)}`;
            interval = `(${formatResult(root1)}, ${formatResult(root2)})`;
            explanation = "Intervalo onde a parábola é negativa";
            break;
          case "≤":
            solution = `${formatResult(root1)} ≤ x ≤ ${formatResult(root2)}`;
            interval = `[${formatResult(root1)}, ${formatResult(root2)}]`;
            explanation = "Intervalo onde a parábola é negativa ou zero";
            break;
        }
      } else {
        // Parábola voltada para baixo: positiva entre as raízes, negativa fora
        steps.push(`Para x < ${formatResult(root1)}: f(x) < 0`);
        steps.push(`Para ${formatResult(root1)} < x < ${formatResult(root2)}: f(x) > 0`);
        steps.push(`Para x > ${formatResult(root2)}: f(x) < 0`);

        switch (operator) {
          case ">":
            solution = `${formatResult(root1)} < x < ${formatResult(root2)}`;
            interval = `(${formatResult(root1)}, ${formatResult(root2)})`;
            explanation = "Intervalo onde a parábola é positiva";
            break;
          case "≥":
            solution = `${formatResult(root1)} ≤ x ≤ ${formatResult(root2)}`;
            interval = `[${formatResult(root1)}, ${formatResult(root2)}]`;
            explanation = "Intervalo onde a parábola é positiva ou zero";
            break;
          case "<":
            solution = `x < ${formatResult(root1)} ou x > ${formatResult(root2)}`;
            interval = `(-∞, ${formatResult(root1)}) ∪ (${formatResult(root2)}, +∞)`;
            explanation = "Intervalos onde a parábola é negativa";
            break;
          case "≤":
            solution = `x ≤ ${formatResult(root1)} ou x ≥ ${formatResult(root2)}`;
            interval = `(-∞, ${formatResult(root1)}] ∪ [${formatResult(root2)}, +∞)`;
            explanation = "Intervalos onde a parábola é negativa ou zero";
            break;
        }
      }
    }

    return {
      type: "second-degree",
      operator,
      solution,
      interval,
      steps,
      graphPoints,
      hasRealSolution: solution !== "∅ (conjunto vazio)",
      explanation,
    };
  };

  const calculateInequality = (): InequalityResult => {
    if (degree === "first") {
      return solveFirstDegree();
    } else {
      return solveSecondDegree();
    }
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    startCalculation("calcular");
    try {
      const solution = calculateInequality();
      setResult(solution);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch (error) {
      setErrors({ general: "Erro no cálculo. Verifique os valores inseridos." });
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
        <BreadcrumbItem isLast>Inequações</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Inequações de 1º e 2º Grau 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva <strong className="text-growth-green">inequações de primeiro e segundo grau</strong> com{" "}
          <strong className="text-primary-blue-dark">análise de sinais e intervalos</strong> de solução.
          Explicação passo a passo para seus estudos de álgebra.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📊 <strong>Análise Completa</strong> • 🎯 <strong>Intervalos Precisos</strong> • 📈{" "}
            <strong>Gráficos Interativos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📊 Calculadora de Inequações</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile First: Controles otimizados */}
          <div className="mb-8 space-y-4 md:space-y-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Grau da Inequação
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value as "first" | "second")}
                  className="w-full h-12 rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-3 text-text-primary text-base font-medium shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                >
                  <option value="first">📈 1º Grau (ax + b)</option>
                  <option value="second">📊 2º Grau (ax² + bx + c)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Operador da Inequação
                </label>
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value as "<" | ">" | "≤" | "≥")}
                  className="w-full h-12 rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-3 text-text-primary text-base font-medium shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                >
                  <option value=">">▶ Maior que (&gt;)</option>
                  <option value="≥">▶ Maior ou igual (≥)</option>
                  <option value="<">◀ Menor que (&lt;)</option>
                  <option value="≤">◀ Menor ou igual (≤)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4 sm:p-6">
            <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
              {degree === "first" ? "Inequação de 1º Grau" : "Inequação de 2º Grau"}
            </h3>

            <div className="space-y-4">
              <div className="text-center text-sm text-text-secondary mb-4">
                {degree === "first"
                  ? `Inequação: ax + b ${operator} 0`
                  : `Inequação: ax² + bx + c ${operator} 0`
                }
              </div>

              {/* Mobile First: Layout adaptativo para coeficientes */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="text-sm text-text-secondary font-medium border-b border-gray-700 pb-1">
                    Coeficientes:
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <Input
                        type="number"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        placeholder="2"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                      <span className="text-text-secondary font-bold text-sm">
                        {degree === "first" ? "a (coef. x)" : "a (coef. x²)"}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <Input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        placeholder={degree === "first" ? "1" : "3"}
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                      <span className="text-text-secondary font-bold text-sm">
                        {degree === "first" ? "b (termo indep.)" : "b (coef. x)"}
                      </span>
                    </div>

                    {degree === "second" && (
                      <div className="flex flex-col items-center gap-2">
                        <Input
                          type="number"
                          value={c}
                          onChange={(e) => setC(e.target.value)}
                          placeholder="-2"
                          className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">c (termo indep.)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview da inequação */}
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-lg font-mono text-primary-blue-dark">
                    {degree === "first"
                      ? `${parseNumber(a) || "a"}x + ${parseNumber(b) || "b"} ${operator} 0`
                      : `${parseNumber(a) || "a"}x² + ${parseNumber(b) || "b"}x + ${parseNumber(c) || "c"} ${operator} 0`
                    }
                  </div>
                </div>
              </div>

              <ErrorMessage error={errors.a || errors.b || errors.c} />
            </div>
          </div>

          {/* Mobile First: Botões otimizados */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              onClick={handleCalculate}
              className="w-full h-12 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 sm:w-auto sm:min-w-[160px]"
            >
              Resolver Inequação
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-12 border-2 border-system-error px-8 py-3 text-base font-semibold text-system-error hover:bg-system-error hover:text-white transition-all duration-200 sm:w-auto sm:min-w-[120px]"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card ref={resultRef as any} className="border-2 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              📊 Solução da Inequação
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.hasRealSolution ? (
              <>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className="text-xl font-bold text-system-warning mb-2">
                      Solução
                    </div>
                    <div className="text-lg text-text-primary">{result.solution}</div>
                  </div>
                  <div className="rounded-lg bg-gray-900 p-6 text-center">
                    <div className="text-xl font-bold text-primary-blue-dark mb-2">
                      Notação de Intervalo
                    </div>
                    <div className="text-lg text-text-primary">{result.interval}</div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    Informações da Solução
                  </h4>
                  <div className="text-sm text-text-secondary space-y-1">
                    <div><strong>Tipo:</strong> {result.type === "first-degree" ? "Inequação de 1º Grau" : "Inequação de 2º Grau"}</div>
                    <div><strong>Operador:</strong> {result.operator}</div>
                    <div><strong>Explicação:</strong> {result.explanation}</div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-900 p-4">
                  <h4 className="mb-3 font-semibold text-growth-green">Resolução Passo a Passo</h4>
                  <div className="space-y-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="text-sm text-text-secondary">
                        <span className="font-medium text-primary-blue-dark">{index + 1}. </span>
                        <pre className="inline font-mono">{step}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-system-error">
                <h4 className="text-lg font-semibold mb-2">Sem Solução Real</h4>
                <p>{result.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Seção educacional */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Inequações – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                📊 Conceitos Fundamentais
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📚 O que são Inequações?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Inequações são desigualdades matemáticas que relacionam expressões algébricas
                    usando os símbolos &lt;, &gt;, ≤ ou ≥. A solução é um conjunto de valores
                    que tornam a desigualdade verdadeira.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🎯 Tipos de Inequações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• <strong>1º Grau:</strong> ax + b &gt; 0, ax + b &lt; 0</li>
                    <li>• <strong>2º Grau:</strong> ax² + bx + c &gt; 0, ax² + bx + c &lt; 0</li>
                    <li>• <strong>Intervalos:</strong> Conjuntos de soluções</li>
                    <li>• <strong>Gráficos:</strong> Representação visual das soluções</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-growth-green">
                📈 Inequações de 1º Grau
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Como Resolver</h4>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>1. <strong>Isolar a variável:</strong> Mova termos para um lado</li>
                    <li>2. <strong>Atenção aos sinais:</strong> Dividir por negativo inverte</li>
                    <li>3. <strong>Encontrar solução:</strong> Determine o intervalo</li>
                  </ol>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Exemplo</h4>
                  <div className="text-sm text-text-secondary space-y-1 font-mono bg-gray-800 p-3 rounded">
                    <div>2x + 3 &gt; 7</div>
                    <div>2x &gt; 4</div>
                    <div>x &gt; 2</div>
                    <div>Solução: (2, +∞)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-system-warning">
                📊 Inequações de 2º Grau
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📐 Método de Resolução</h4>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>1. <strong>Encontrar raízes:</strong> Resolver ax² + bx + c = 0</li>
                    <li>2. <strong>Analisar sinais:</strong> Estudar comportamento da parábola</li>
                    <li>3. <strong>Determinar intervalos:</strong> Onde a inequação é verdadeira</li>
                  </ol>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">⚡ Dicas Importantes</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• <strong>a &gt; 0:</strong> Parábola para cima (∪)</li>
                    <li>• <strong>a &lt; 0:</strong> Parábola para baixo (∩)</li>
                    <li>• <strong>Δ &gt; 0:</strong> Duas raízes reais</li>
                    <li>• <strong>Δ = 0:</strong> Uma raiz (dupla)</li>
                    <li>• <strong>Δ &lt; 0:</strong> Sem raízes reais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Inequações"
        items={[
          {
            question: "O que são inequações de primeiro grau?",
            answer:
              "Inequações de primeiro grau são desigualdades matemáticas da forma ax + b > 0, ax + b < 0, ax + b ≥ 0 ou ax + b ≤ 0, onde a ≠ 0. A solução é um intervalo de valores que satisfazem a desigualdade.",
            borderColor: "primary-blue",
          },
          {
            question: "Como resolver inequações de segundo grau?",
            answer:
              "Para resolver inequações de segundo grau (ax² + bx + c > 0), primeiro encontre as raízes da equação ax² + bx + c = 0, depois analise o sinal da parábola em cada intervalo determinado pelas raízes.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a diferença entre > e ≥ nas inequações?",
            answer:
              "O símbolo > indica 'maior que' (não inclui o valor), enquanto ≥ indica 'maior ou igual a' (inclui o valor). Na representação gráfica, > usa bolinha aberta e ≥ usa bolinha fechada.",
            borderColor: "system-warning",
          },
          {
            question: "Como representar a solução de uma inequação?",
            answer:
              "A solução pode ser representada em notação de intervalo [a, b], (a, b), na reta numérica ou em forma de conjunto. Por exemplo: x > 2 pode ser escrito como (2, +∞) ou {x ∈ ℝ | x > 2}.",
            borderColor: "system-success",
          },
          {
            question: "Quando uma inequação não tem solução?",
            answer:
              "Uma inequação não tem solução quando não existe nenhum valor real que a satisfaça. Por exemplo, x² + 1 < 0 não tem solução real, pois x² + 1 é sempre positivo para qualquer valor real de x.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Inequações",
          content:
            "<strong>Para melhores resultados:</strong> sempre faça a análise de sinais cuidadosamente e lembre-se de que dividir por um número negativo inverte o sentido da desigualdade.",
        }}
        footerText="<strong>Lembre-se:</strong> Inequações são fundamentais em matemática e têm aplicações em otimização, análise de funções e resolução de problemas do mundo real."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Inequações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de inequações</strong>{" "}
              resolve inequações de 1º e 2º grau com{" "}
              <strong className="text-growth-green">análise de sinais e intervalos</strong> de solução
              com explicação passo a passo completa.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Resolução automática, análise de sinais,
              notação de intervalos, múltiplos operadores (&lt;, &gt;, ≤, ≥) e explicação detalhada.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais. Para aplicações científicas que exigem alta precisão, consulte sempre um{" "}
              <strong>profissional qualificado</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="inequacoes" />
    </div>
  );
}