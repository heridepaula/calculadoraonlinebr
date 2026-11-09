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
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { useIndexNow } from "~/hooks/useIndexNow";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("sistemas-equacoes-lineares"),
    {
      "script:ld+json": {
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
            name: "Sistemas de Equações Lineares",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/sistemas-equacoes-lineares",
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Sistemas de Equações Lineares Online 2026",
        description:
          "Ferramenta educacional online gratuita para resolver sistemas de equações lineares usando métodos de eliminação de Gauss, regra de Cramer e matriz inversa. Solução passo a passo com verificação automática.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/sistemas-equacoes-lineares",
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
        featureList: [
          "Método de eliminação de Gauss",
          "Regra de Cramer",
          "Método da matriz inversa",
          "Sistemas 2x2 e 3x3",
          "Solução passo a passo",
          "Verificação automática",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Explicação detalhada",
          "Análise de determinantes",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Calculadora de Sistemas de Equações Lineares 2026",
        description: "Resolva sistemas de equações lineares com métodos de eliminação de Gauss, Cramer e matriz inversa. Calculadora online gratuita com solução passo a passo.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/sistemas-equacoes-lineares",
        inLanguage: "pt-BR",
        dateModified: "2025-09-21",
        datePublished: "2024-11-01",
        mainEntity: {
          "@type": "WebApplication",
          name: "Calculadora de Sistemas de Equações Lineares",
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
              name: "Sistemas de Equações Lineares",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/sistemas-equacoes-lineares",
            },
          ],
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
        },
        about: [
          {
            "@type": "Thing",
            name: "Sistemas de Equações Lineares",
            description: "Conjunto de equações matemáticas lineares que devem ser resolvidas simultaneamente",
          },
          {
            "@type": "Thing",
            name: "Método de Eliminação de Gauss",
            description: "Algoritmo para resolver sistemas de equações lineares através de escalonamento de matrizes",
          },
          {
            "@type": "Thing",
            name: "Regra de Cramer",
            description: "Método matemático que utiliza determinantes para resolver sistemas de equações lineares",
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é um sistema de equações lineares?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "É um conjunto de duas ou mais equações lineares com as mesmas variáveis que devem ser satisfeitas simultaneamente. Por exemplo: 2x + 3y = 7 e x - y = 1.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre os métodos de Gauss e Cramer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Gauss usa escalonamento de matrizes e é mais eficiente para sistemas grandes. Cramer usa determinantes e é limitado a sistemas onde o número de equações igual ao de incógnitas com determinante não nulo.",
            },
          },
          {
            "@type": "Question",
            name: "Quando um sistema não tem solução única?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Quando o determinante da matriz dos coeficientes é zero, o sistema pode não ter solução (incompatível) ou ter infinitas soluções (indeterminado).",
            },
          },
          {
            "@type": "Question",
            name: "Como verificar se a solução está correta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Substitua os valores encontrados nas equações originais. Se todas as equações forem satisfeitas, a solução está correta.",
            },
          },
          {
            "@type": "Question",
            name: "Qual método é mais rápido?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para sistemas pequenos (2x2, 3x3), ambos são rápidos. Para sistemas maiores, a eliminação de Gauss é mais eficiente que Cramer.",
            },
          },
        ],
      },
    },
  ];
};

interface SystemSolution {
  method: "gauss" | "cramer" | "matrix-inverse";
  variables: { [key: string]: number };
  steps: string[];
  determinant?: number;
  hasUniqueSolution: boolean;
  matrix?: number[][];
  augmentedMatrix?: number[][];
}

interface ValidationErrors {
  [key: string]: string;
}

export default function LinearSystemCalculator() {
  const [systemSize, setSystemSize] = useState<"2x2" | "3x3">("2x2");
  const [method, setMethod] = useState<"gauss" | "cramer" | "matrix-inverse">("gauss");

  // Coeficientes para sistema 2x2: ax + by = c, dx + ey = f
  const [a11, setA11] = useState("");
  const [a12, setA12] = useState("");
  const [b1, setB1] = useState("");
  const [a21, setA21] = useState("");
  const [a22, setA22] = useState("");
  const [b2, setB2] = useState("");

  // Coeficientes adicionais para sistema 3x3
  const [a13, setA13] = useState("");
  const [a23, setA23] = useState("");
  const [a31, setA31] = useState("");
  const [a32, setA32] = useState("");
  const [a33, setA33] = useState("");
  const [b3, setB3] = useState("");

  const [result, setResult] = useState<SystemSolution | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "sistemas-equacoes-lineares",
    category: "matematica",
  });
  useFormTracking("sistemas-equacoes-lineares");

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

    const requiredFields = systemSize === "2x2"
      ? [a11, a12, b1, a21, a22, b2]
      : [a11, a12, a13, b1, a21, a22, a23, b2, a31, a32, a33, b3];

    requiredFields.forEach((field, index) => {
      if (field.trim() === "") {
        const fieldNames = systemSize === "2x2"
          ? ["a11", "a12", "b1", "a21", "a22", "b2"]
          : ["a11", "a12", "a13", "b1", "a21", "a22", "a23", "b2", "a31", "a32", "a33", "b3"];
        newErrors[fieldNames[index]] = "Campo obrigatório";
        isValid = false;
      } else if (isNaN(parseNumber(field))) {
        const fieldNames = systemSize === "2x2"
          ? ["a11", "a12", "b1", "a21", "a22", "b2"]
          : ["a11", "a12", "a13", "b1", "a21", "a22", "a23", "b2", "a31", "a32", "a33", "b3"];
        newErrors[fieldNames[index]] = "Número inválido";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const calculateDeterminant2x2 = (matrix: number[][]): number => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  };

  const calculateDeterminant3x3 = (matrix: number[][]): number => {
    const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
    const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
    const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  };

  const solveByGauss = (): SystemSolution => {
    const steps: string[] = [];
    let matrix: number[][];

    if (systemSize === "2x2") {
      matrix = [
        [parseNumber(a11), parseNumber(a12), parseNumber(b1)],
        [parseNumber(a21), parseNumber(a22), parseNumber(b2)]
      ];
    } else {
      matrix = [
        [parseNumber(a11), parseNumber(a12), parseNumber(a13), parseNumber(b1)],
        [parseNumber(a21), parseNumber(a22), parseNumber(a23), parseNumber(b2)],
        [parseNumber(a31), parseNumber(a32), parseNumber(a33), parseNumber(b3)]
      ];
    }

    steps.push("Método de Eliminação de Gauss");
    steps.push(`Matriz aumentada inicial:`);
    steps.push(matrixToString(matrix));

    // Eliminação progressiva
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
      // Encontrar pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
          maxRow = k;
        }
      }

      // Trocar linhas se necessário
      if (maxRow !== i) {
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        steps.push(`Trocando linha ${i + 1} com linha ${maxRow + 1}:`);
        steps.push(matrixToString(matrix));
      }

      // Fazer zeros abaixo do pivot
      for (let k = i + 1; k < n; k++) {
        if (matrix[i][i] !== 0) {
          const factor = matrix[k][i] / matrix[i][i];
          steps.push(`L${k + 1} = L${k + 1} - (${formatResult(factor)}) × L${i + 1}`);

          for (let j = i; j < matrix[k].length; j++) {
            matrix[k][j] -= factor * matrix[i][j];
          }
          steps.push(matrixToString(matrix));
        }
      }
    }

    // Substituição regressiva
    steps.push("Substituição regressiva:");
    const variables: { [key: string]: number } = {};

    if (systemSize === "2x2") {
      const y = matrix[1][2] / matrix[1][1];
      const x = (matrix[0][2] - matrix[0][1] * y) / matrix[0][0];

      steps.push(`y = ${formatResult(matrix[1][2])} / ${formatResult(matrix[1][1])} = ${formatResult(y)}`);
      steps.push(`x = (${formatResult(matrix[0][2])} - ${formatResult(matrix[0][1])} × ${formatResult(y)}) / ${formatResult(matrix[0][0])} = ${formatResult(x)}`);

      variables.x = x;
      variables.y = y;
    } else {
      const z = matrix[2][3] / matrix[2][2];
      const y = (matrix[1][3] - matrix[1][2] * z) / matrix[1][1];
      const x = (matrix[0][3] - matrix[0][1] * y - matrix[0][2] * z) / matrix[0][0];

      steps.push(`z = ${formatResult(matrix[2][3])} / ${formatResult(matrix[2][2])} = ${formatResult(z)}`);
      steps.push(`y = (${formatResult(matrix[1][3])} - ${formatResult(matrix[1][2])} × ${formatResult(z)}) / ${formatResult(matrix[1][1])} = ${formatResult(y)}`);
      steps.push(`x = (${formatResult(matrix[0][3])} - ${formatResult(matrix[0][1])} × ${formatResult(y)} - ${formatResult(matrix[0][2])} × ${formatResult(z)}) / ${formatResult(matrix[0][0])} = ${formatResult(x)}`);

      variables.x = x;
      variables.y = y;
      variables.z = z;
    }

    return {
      method: "gauss",
      variables,
      steps,
      hasUniqueSolution: true,
      augmentedMatrix: matrix
    };
  };

  const solveByCramer = (): SystemSolution => {
    const steps: string[] = [];
    let matrix: number[][];
    let constants: number[];

    if (systemSize === "2x2") {
      matrix = [
        [parseNumber(a11), parseNumber(a12)],
        [parseNumber(a21), parseNumber(a22)]
      ];
      constants = [parseNumber(b1), parseNumber(b2)];
    } else {
      matrix = [
        [parseNumber(a11), parseNumber(a12), parseNumber(a13)],
        [parseNumber(a21), parseNumber(a22), parseNumber(a23)],
        [parseNumber(a31), parseNumber(a32), parseNumber(a33)]
      ];
      constants = [parseNumber(b1), parseNumber(b2), parseNumber(b3)];
    }

    steps.push("Método de Cramer");
    steps.push("Matriz dos coeficientes:");
    steps.push(matrixToString(matrix));

    // Calcular determinante principal
    const det = systemSize === "2x2"
      ? calculateDeterminant2x2(matrix)
      : calculateDeterminant3x3(matrix);

    steps.push(`Determinante principal: D = ${formatResult(det)}`);

    if (Math.abs(det) < 1e-10) {
      steps.push("Determinante = 0, sistema não tem solução única");
      return {
        method: "cramer",
        variables: {},
        steps,
        determinant: det,
        hasUniqueSolution: false,
        matrix
      };
    }

    const variables: { [key: string]: number } = {};

    if (systemSize === "2x2") {
      // Dx para x
      const matrixX = [
        [constants[0], matrix[0][1]],
        [constants[1], matrix[1][1]]
      ];
      const detX = calculateDeterminant2x2(matrixX);
      steps.push(`Dx = ${formatResult(detX)}`);

      // Dy para y
      const matrixY = [
        [matrix[0][0], constants[0]],
        [matrix[1][0], constants[1]]
      ];
      const detY = calculateDeterminant2x2(matrixY);
      steps.push(`Dy = ${formatResult(detY)}`);

      variables.x = detX / det;
      variables.y = detY / det;

      steps.push(`x = Dx/D = ${formatResult(detX)}/${formatResult(det)} = ${formatResult(variables.x)}`);
      steps.push(`y = Dy/D = ${formatResult(detY)}/${formatResult(det)} = ${formatResult(variables.y)}`);
    } else {
      // Dx, Dy, Dz para sistema 3x3
      const matrixX = [
        [constants[0], matrix[0][1], matrix[0][2]],
        [constants[1], matrix[1][1], matrix[1][2]],
        [constants[2], matrix[2][1], matrix[2][2]]
      ];
      const detX = calculateDeterminant3x3(matrixX);

      const matrixY = [
        [matrix[0][0], constants[0], matrix[0][2]],
        [matrix[1][0], constants[1], matrix[1][2]],
        [matrix[2][0], constants[2], matrix[2][2]]
      ];
      const detY = calculateDeterminant3x3(matrixY);

      const matrixZ = [
        [matrix[0][0], matrix[0][1], constants[0]],
        [matrix[1][0], matrix[1][1], constants[1]],
        [matrix[2][0], matrix[2][1], constants[2]]
      ];
      const detZ = calculateDeterminant3x3(matrixZ);

      variables.x = detX / det;
      variables.y = detY / det;
      variables.z = detZ / det;

      steps.push(`Dx = ${formatResult(detX)}, Dy = ${formatResult(detY)}, Dz = ${formatResult(detZ)}`);
      steps.push(`x = ${formatResult(variables.x)}, y = ${formatResult(variables.y)}, z = ${formatResult(variables.z)}`);
    }

    return {
      method: "cramer",
      variables,
      steps,
      determinant: det,
      hasUniqueSolution: true,
      matrix
    };
  };

  const matrixToString = (matrix: number[][]): string => {
    return matrix.map(row =>
      "| " + row.map(val => formatResult(val).padStart(8)).join(" ") + " |"
    ).join("\n");
  };

  const calculateSystem = (): SystemSolution => {
    if (method === "cramer") {
      return solveByCramer();
    } else {
      return solveByGauss();
    }
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    startCalculation("calcular");
    try {
      const solution = calculateSystem();
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
    setA11(""); setA12(""); setA13(""); setB1("");
    setA21(""); setA22(""); setA23(""); setB2("");
    setA31(""); setA32(""); setA33(""); setB3("");
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
        <BreadcrumbItem isLast>Sistemas de Equações Lineares</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Sistemas de Equações Lineares 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Resolva <strong className="text-growth-green">sistemas de equações lineares</strong> com{" "}
          <strong className="text-primary-blue-dark">métodos de Gauss, Cramer</strong> e matriz inversa.
          Solução passo a passo para seus estudos de álgebra linear.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔢 <strong>Sistemas Lineares</strong> • ⚡ <strong>Múltiplos Métodos</strong> • 📊{" "}
            <strong>Solução Detalhada</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔢 Calculadora de Sistemas de Equações</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile First: Controles otimizados */}
          <div className="mb-8 space-y-4 md:space-y-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Tamanho do Sistema
                </label>
                <select
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value as "2x2" | "3x3")}
                  className="w-full h-12 rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-3 text-text-primary text-base font-medium shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                >
                  <option value="2x2">🔸 Sistema 2×2 (2 equações, 2 incógnitas)</option>
                  <option value="3x3">🔹 Sistema 3×3 (3 equações, 3 incógnitas)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Método de Resolução
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as "gauss" | "cramer" | "matrix-inverse")}
                  className="w-full h-12 rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-3 text-text-primary text-base font-medium shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                >
                  <option value="gauss">⚡ Eliminação de Gauss</option>
                  <option value="cramer">🎯 Regra de Cramer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4 sm:p-6">
            <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
              {systemSize === "2x2" ? "Sistema 2×2" : "Sistema 3×3"}
            </h3>

            {systemSize === "2x2" ? (
              <div className="space-y-4">
                <div className="text-center text-sm text-text-secondary mb-4">
                  Sistema: ax + by = c, dx + ey = f
                </div>

                {/* Mobile First: Layout adaptativo */}
                <div className="space-y-6">
                  {/* Primeira equação */}
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary font-medium border-b border-gray-700 pb-1">1ª equação:</div>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                      <Input
                        type="number"
                        value={a11}
                        onChange={(e) => setA11(e.target.value)}
                        placeholder="2"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                      <span className="text-text-secondary font-bold text-base px-1">x +</span>
                      <Input
                        type="number"
                        value={a12}
                        onChange={(e) => setA12(e.target.value)}
                        placeholder="3"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                      <span className="text-text-secondary font-bold text-base px-1">y =</span>
                      <Input
                        type="number"
                        value={b1}
                        onChange={(e) => setB1(e.target.value)}
                        placeholder="7"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                    </div>
                  </div>

                  {/* Segunda equação */}
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary font-medium border-b border-gray-700 pb-1">2ª equação:</div>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                      <Input
                        type="number"
                        value={a21}
                        onChange={(e) => setA21(e.target.value)}
                        placeholder="1"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                      <span className="text-text-secondary font-bold text-base px-1">x +</span>
                      <Input
                        type="number"
                        value={a22}
                        onChange={(e) => setA22(e.target.value)}
                        placeholder="-1"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                      <span className="text-text-secondary font-bold text-base px-1">y =</span>
                      <Input
                        type="number"
                        value={b2}
                        onChange={(e) => setB2(e.target.value)}
                        placeholder="1"
                        className="h-12 w-20 text-center text-base font-medium sm:w-24 md:w-28"
                        step="any"
                      />
                    </div>
                  </div>

                  {/* Progressivo enhancement para desktop */}
                  <div className="hidden lg:block">
                    <div className="text-xs text-text-secondary text-center mb-2">Visualização matricial:</div>
                    <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                      <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
                        <span>[ {parseNumber(a11) || "a"}</span>
                        <span>{parseNumber(a12) || "b"}</span>
                        <span>|</span>
                        <span>{parseNumber(b1) || "c"} ]</span>
                        <span>[ {parseNumber(a21) || "d"}</span>
                        <span>{parseNumber(a22) || "e"}</span>
                        <span>|</span>
                        <span>{parseNumber(b2) || "f"} ]</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ErrorMessage error={errors.a11 || errors.a12 || errors.b1 || errors.a21 || errors.a22 || errors.b2} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-sm text-text-secondary mb-4">
                  Sistema: ax + by + cz = d, ex + fy + gz = h, ix + jy + kz = l
                </div>

                {/* Mobile First: Layout stacked para melhor usabilidade */}
                <div className="space-y-6">
                  {/* Primeira equação */}
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary font-medium border-b border-gray-700 pb-1">1ª equação:</div>
                    <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a11}
                          onChange={(e) => setA11(e.target.value)}
                          placeholder="1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">x</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">+</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a12}
                          onChange={(e) => setA12(e.target.value)}
                          placeholder="2"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">y</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">+</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a13}
                          onChange={(e) => setA13(e.target.value)}
                          placeholder="1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">z</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">=</span>
                      <Input
                        type="number"
                        value={b1}
                        onChange={(e) => setB1(e.target.value)}
                        placeholder="6"
                        className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                        step="any"
                      />
                    </div>
                  </div>

                  {/* Segunda equação */}
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary font-medium border-b border-gray-700 pb-1">2ª equação:</div>
                    <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a21}
                          onChange={(e) => setA21(e.target.value)}
                          placeholder="2"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">x</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">+</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a22}
                          onChange={(e) => setA22(e.target.value)}
                          placeholder="-1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">y</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">+</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a23}
                          onChange={(e) => setA23(e.target.value)}
                          placeholder="1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">z</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">=</span>
                      <Input
                        type="number"
                        value={b2}
                        onChange={(e) => setB2(e.target.value)}
                        placeholder="4"
                        className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                        step="any"
                      />
                    </div>
                  </div>

                  {/* Terceira equação */}
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary font-medium border-b border-gray-700 pb-1">3ª equação:</div>
                    <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a31}
                          onChange={(e) => setA31(e.target.value)}
                          placeholder="1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">x</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">+</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a32}
                          onChange={(e) => setA32(e.target.value)}
                          placeholder="1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">y</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">+</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={a33}
                          onChange={(e) => setA33(e.target.value)}
                          placeholder="-1"
                          className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                          step="any"
                        />
                        <span className="text-text-secondary font-bold text-sm">z</span>
                      </div>
                      <span className="text-text-secondary font-bold text-base">=</span>
                      <Input
                        type="number"
                        value={b3}
                        onChange={(e) => setB3(e.target.value)}
                        placeholder="1"
                        className="h-11 w-16 text-center text-sm font-medium sm:w-20"
                        step="any"
                      />
                    </div>
                  </div>

                  {/* Progressive enhancement para tablets e desktop */}
                  <div className="hidden md:block mt-6">
                    <div className="text-xs text-text-secondary text-center mb-3">Representação matricial:</div>
                    <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div className="min-w-max">
                        <div className="grid grid-cols-5 gap-3 items-center justify-items-center mb-2">
                          <span>[ {parseNumber(a11) || "a"}</span>
                          <span>{parseNumber(a12) || "b"}</span>
                          <span>{parseNumber(a13) || "c"}</span>
                          <span>|</span>
                          <span>{parseNumber(b1) || "d"} ]</span>
                        </div>
                        <div className="grid grid-cols-5 gap-3 items-center justify-items-center mb-2">
                          <span>[ {parseNumber(a21) || "e"}</span>
                          <span>{parseNumber(a22) || "f"}</span>
                          <span>{parseNumber(a23) || "g"}</span>
                          <span>|</span>
                          <span>{parseNumber(b2) || "h"} ]</span>
                        </div>
                        <div className="grid grid-cols-5 gap-3 items-center justify-items-center">
                          <span>[ {parseNumber(a31) || "i"}</span>
                          <span>{parseNumber(a32) || "j"}</span>
                          <span>{parseNumber(a33) || "k"}</span>
                          <span>|</span>
                          <span>{parseNumber(b3) || "l"} ]</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhancement adicional para desktop large */}
                  <div className="hidden lg:block mt-4">
                    <div className="grid grid-cols-4 gap-4 text-center text-xs text-text-secondary mb-3">
                      <span className="font-medium">Coeficiente x</span>
                      <span className="font-medium">Coeficiente y</span>
                      <span className="font-medium">Coeficiente z</span>
                      <span className="font-medium">Termo independente</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile First: Botões otimizados */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              onClick={handleCalculate}
              className="w-full h-12 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 sm:w-auto sm:min-w-[160px]"
            >
              Resolver Sistema
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
              📊 Solução do Sistema de Equações
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.hasUniqueSolution ? (
              <>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Object.entries(result.variables).map(([variable, value]) => (
                    <div key={variable} className="rounded-lg bg-gray-900 p-6 text-center">
                      <div className="text-3xl font-bold text-system-warning">
                        {formatResult(value)}
                      </div>
                      <div className="text-sm text-text-secondary">{variable}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    Informações da Solução
                  </h4>
                  <div className="text-sm text-text-secondary space-y-1">
                    <div><strong>Método:</strong> {
                      result.method === "gauss" ? "Eliminação de Gauss" :
                      result.method === "cramer" ? "Regra de Cramer" : "Matriz Inversa"
                    }</div>
                    <div><strong>Tamanho:</strong> {systemSize}</div>
                    {result.determinant !== undefined && (
                      <div><strong>Determinante:</strong> {formatResult(result.determinant)}</div>
                    )}
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
                <h4 className="text-lg font-semibold mb-2">Sistema sem Solução Única</h4>
                <p>O determinante é zero, indicando que o sistema pode não ter solução ou ter infinitas soluções.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Seção educacional */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Sistemas de Equações Lineares – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                🔢 Conceitos Fundamentais
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📚 O que são?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sistemas de equações lineares são conjuntos de equações onde cada uma relaciona
                    as mesmas variáveis de forma linear. O objetivo é encontrar valores que satisfaçam
                    simultaneamente todas as equações.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🎯 Métodos de Resolução</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• <strong>Eliminação de Gauss:</strong> Escalonamento de matrizes</li>
                    <li>• <strong>Regra de Cramer:</strong> Usando determinantes</li>
                    <li>• <strong>Matriz Inversa:</strong> Multiplicação matricial</li>
                    <li>• <strong>Substituição:</strong> Método algébrico básico</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-growth-green">
                ⚡ Método de Eliminação de Gauss
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Como Funciona</h4>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>1. <strong>Escalonamento:</strong> Transformar em matriz triangular superior</li>
                    <li>2. <strong>Eliminação:</strong> Fazer zeros abaixo da diagonal</li>
                    <li>3. <strong>Substituição:</strong> Resolver de baixo para cima</li>
                  </ol>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Funciona para qualquer tamanho de sistema</li>
                    <li>• Detecta sistemas incompatíveis</li>
                    <li>• Mais eficiente computacionalmente</li>
                    <li>• Mostra claramente o processo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-system-warning">
                🎯 Regra de Cramer
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📐 Princípio</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A regra de Cramer usa determinantes para resolver sistemas onde o número de
                    equações é igual ao número de incógnitas e o determinante da matriz dos
                    coeficientes é diferente de zero.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">⚠️ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Só funciona quando det ≠ 0</li>
                    <li>• Ineficiente para sistemas grandes</li>
                    <li>• Requer cálculo de múltiplos determinantes</li>
                    <li>• Não detecta sistemas indeterminados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Sistemas de Equações Lineares"
        items={[
          {
            question: "O que é um sistema de equações lineares?",
            answer:
              "É um conjunto de duas ou mais equações lineares com as mesmas variáveis que devem ser satisfeitas simultaneamente. Por exemplo: 2x + 3y = 7 e x - y = 1.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre os métodos de Gauss e Cramer?",
            answer:
              "Gauss usa escalonamento de matrizes e é mais eficiente para sistemas grandes. Cramer usa determinantes e é limitado a sistemas onde o número de equações igual ao de incógnitas com determinante não nulo.",
            borderColor: "growth-green",
          },
          {
            question: "Quando um sistema não tem solução única?",
            answer:
              "Quando o determinante da matriz dos coeficientes é zero, o sistema pode não ter solução (incompatível) ou ter infinitas soluções (indeterminado).",
            borderColor: "system-warning",
          },
          {
            question: "Como verificar se a solução está correta?",
            answer:
              "Substitua os valores encontrados nas equações originais. Se todas as equações forem satisfeitas, a solução está correta.",
            borderColor: "system-success",
          },
          {
            question: "Qual método é mais rápido?",
            answer:
              "Para sistemas pequenos (2x2, 3x3), ambos são rápidos. Para sistemas maiores, a eliminação de Gauss é mais eficiente que Cramer.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Sistemas Lineares",
          content:
            "<strong>Para melhores resultados:</strong> sempre verifique se o sistema tem solução única calculando o determinante antes de aplicar a regra de Cramer.",
        }}
        footerText="<strong>Lembre-se:</strong> Sistemas lineares são fundamentais em álgebra e têm aplicações em física, engenharia, economia e ciência da computação."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Sistemas de Equações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de sistemas de equações lineares</strong>{" "}
              resolve sistemas 2×2 e 3×3 usando{" "}
              <strong className="text-growth-green">eliminação de Gauss e regra de Cramer</strong> com
              explicação passo a passo completa.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Escalonamento automático, cálculo de determinantes,
              detecção de sistemas incompatíveis, solução por múltiplos métodos e verificação automática.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais. Para aplicações científicas que exigem alta precisão, consulte sempre um{" "}
              <strong>profissional qualificado</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="sistemas-equacoes-lineares" />
    </div>
  );
}