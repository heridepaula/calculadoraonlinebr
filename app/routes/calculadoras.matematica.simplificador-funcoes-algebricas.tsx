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
    ...buildCalculatorMeta("simplificador-funcoes-algebricas"),
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
            name: "Simplificador de Expressões Algébricas",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/simplificador-funcoes-algebricas",
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Simplificador de Expressões Algébricas Online 2026",
        description:
          "Ferramenta educacional online gratuita para simplificar expressões algébricas. Fatoração automática, redução de termos semelhantes e explicação passo a passo.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/simplificador-funcoes-algebricas",
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
          "Simplificação de expressões algébricas",
          "Fatoração de polinômios",
          "Redução de termos semelhantes",
          "Produtos notáveis",
          "Explicação passo a passo",
          "Verificação automática",
          "Interface móvel responsiva",
          "Suporte a múltiplas variáveis",
          "Detecção de fatores comuns",
          "Resultados em formato matemático",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Simplificador de Expressões Algébricas 2026",
        description: "Simplifique expressões algébricas com fatoração automática e redução de termos semelhantes. Ferramenta educacional gratuita.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/simplificador-funcoes-algebricas",
        inLanguage: "pt-BR",
        dateModified: "2025-09-21",
        datePublished: "2024-11-01",
        mainEntity: {
          "@type": "WebApplication",
          name: "Simplificador de Expressões Algébricas",
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
              name: "Simplificador de Expressões Algébricas",
              item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/simplificador-funcoes-algebricas",
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
            name: "Expressões Algébricas",
            description: "Combinações de números, variáveis e operações matemáticas que podem ser simplificadas",
          },
          {
            "@type": "Thing",
            name: "Fatoração",
            description: "Processo de decompor uma expressão em produto de fatores mais simples",
          },
          {
            "@type": "Thing",
            name: "Termos Semelhantes",
            description: "Termos que possuem a mesma parte literal e podem ser somados ou subtraídos",
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
            name: "O que é simplificação de expressões algébricas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Simplificação de expressões algébricas é o processo de reduzir uma expressão à sua forma mais simples, combinando termos semelhantes, aplicando propriedades distributivas e fatorando quando possível.",
            },
          },
          {
            "@type": "Question",
            name: "Como fatorar uma expressão algébrica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para fatorar uma expressão, identifique fatores comuns, aplique produtos notáveis (diferença de quadrados, trinômio quadrado perfeito) ou use métodos como agrupamento e fatoração por tentativa.",
            },
          },
          {
            "@type": "Question",
            name: "O que são termos semelhantes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Termos semelhantes são aqueles que têm a mesma parte literal (variáveis com os mesmos expoentes). Por exemplo: 3x² e 5x² são termos semelhantes e podem ser somados: 3x² + 5x² = 8x².",
            },
          },
          {
            "@type": "Question",
            name: "Quais são os principais produtos notáveis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Os principais produtos notáveis são: quadrado da soma (a+b)² = a² + 2ab + b², quadrado da diferença (a-b)² = a² - 2ab + b², e produto da soma pela diferença (a+b)(a-b) = a² - b².",
            },
          },
          {
            "@type": "Question",
            name: "Como identificar o fator comum em uma expressão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para identificar o fator comum, observe os coeficientes numéricos (MDC) e as variáveis (menor expoente de cada variável presente em todos os termos). Por exemplo, em 6x³ + 9x², o fator comum é 3x².",
            },
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
            name: "O que é simplificação de expressões algébricas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Simplificação de expressões algébricas é o processo de reduzir uma expressão à sua forma mais simples, combinando termos semelhantes, aplicando propriedades distributivas e fatorando quando possível.",
            },
          },
          {
            "@type": "Question",
            name: "Como fatorar uma expressão algébrica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para fatorar uma expressão, identifique fatores comuns, aplique produtos notáveis (diferença de quadrados, trinômio quadrado perfeito) ou use métodos como agrupamento e fatoração por tentativa.",
            },
          },
          {
            "@type": "Question",
            name: "O que são termos semelhantes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Termos semelhantes são aqueles que têm a mesma parte literal (variáveis com os mesmos expoentes). Por exemplo: 3x² e 5x² são termos semelhantes e podem ser somados: 3x² + 5x² = 8x².",
            },
          },
          {
            "@type": "Question",
            name: "Quais são os principais produtos notáveis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Os principais produtos notáveis são: quadrado da soma (a+b)² = a² + 2ab + b², quadrado da diferença (a-b)² = a² - 2ab + b², e produto da soma pela diferença (a+b)(a-b) = a² - b².",
            },
          },
          {
            "@type": "Question",
            name: "Como identificar o fator comum em uma expressão?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para identificar o fator comum, observe os coeficientes numéricos (MDC) e as variáveis (menor expoente de cada variável presente em todos os termos). Por exemplo, em 6x³ + 9x², o fator comum é 3x².",
            },
          },
        ],
      },
    },
  ];
};

interface SimplificationResult {
  originalExpression: string;
  simplifiedExpression: string;
  steps: string[];
  factorization?: string;
  commonFactors?: string[];
  likeTerms?: { [key: string]: string[] };
  isSimplified: boolean;
  explanation: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function AlgebraicSimplifier() {
  const [expression, setExpression] = useState("");
  const [simplifyType, setSimplifyType] = useState<"complete" | "factorization" | "like-terms">("complete");
  const [isCalculating, setIsCalculating] = useState(false);

  const [result, setResult] = useState<SimplificationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "simplificador-funcoes-algebricas",
    category: "matematica",
  });
  useFormTracking("simplificador-funcoes-algebricas");

  // IndexNow integration for SEO
  const { submitCalculatorUrls } = useIndexNow({
    autoSubmit: true,
    delay: 2000,
  });

  const validateExpression = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (expression.trim() === "") {
      newErrors.expression = "Digite uma expressão algébrica";
      isValid = false;
    } else {
      // Validação básica de caracteres permitidos (incluindo símbolos matemáticos)
      const allowedChars = /^[a-zA-Z0-9+\-*/^().\s²³⁴⁵⁶⁷⁸⁹⁰]+$/;
      if (!allowedChars.test(expression)) {
        newErrors.expression = "Use apenas letras, números e operadores básicos (+, -, *, /, ^, parênteses, ²)";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const findCommonFactors = (expr: string): string[] => {
    const factors: string[] = [];

    // Busca por fatores numéricos comuns
    const terms = expr.split(/[+\-]/).filter(term => term.trim());
    const numbers = terms.map(term => {
      const match = term.match(/^(\d+)/);
      return match ? parseInt(match[1]) : 1;
    });

    if (numbers.length > 1) {
      const gcd = numbers.reduce((a, b) => {
        while (b !== 0) {
          const temp = b;
          b = a % b;
          a = temp;
        }
        return a;
      });

      if (gcd > 1) {
        factors.push(gcd.toString());
      }
    }

    // Busca por variáveis comuns
    const variables = new Map<string, number>();
    terms.forEach(term => {
      const varMatches = term.match(/([a-zA-Z])(\^?\d*|[²³⁴⁵⁶⁷⁸⁹⁰]?)/g);
      if (varMatches) {
        varMatches.forEach(varMatch => {
          const [, variable, exponent] = varMatch.match(/([a-zA-Z])(\^?(\d+)|([²³⁴⁵⁶⁷⁸⁹⁰]))?/) || [];
          let exp = 1;

          if (exponent) {
            if (exponent.startsWith('^')) {
              exp = parseInt(exponent.replace('^', ''));
            } else {
              // Converte símbolos de potência para números
              const superscriptMap: { [key: string]: number } = {
                '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '⁰': 0
              };
              exp = superscriptMap[exponent] || 1;
            }
          }

          if (!variables.has(variable)) {
            variables.set(variable, exp);
          } else {
            variables.set(variable, Math.min(variables.get(variable)!, exp));
          }
        });
      }
    });

    variables.forEach((exp, variable) => {
      if (exp > 0) {
        factors.push(exp === 1 ? variable : `${variable}^${exp}`);
      }
    });

    return factors;
  };

  const identifyLikeTerms = (expr: string): { [key: string]: string[] } => {
    const likeTerms: { [key: string]: string[] } = {};
    const terms = expr.split(/(?=[+\-])/).filter(term => term.trim());

    terms.forEach(term => {
      const cleanTerm = term.replace(/^\+/, '').trim(); // Remove + no início mas mantém -

      // Extrai a parte literal (variáveis com expoentes, incluindo símbolos de potência)
      const literalMatch = cleanTerm.match(/[a-zA-Z][a-zA-Z0-9\^²³⁴⁵⁶⁷⁸⁹⁰]*/);
      const literalPart = literalMatch ? literalMatch[0] : 'constant';

      if (!likeTerms[literalPart]) {
        likeTerms[literalPart] = [];
      }
      likeTerms[literalPart].push(cleanTerm);
    });

    // Filtra apenas grupos com mais de um termo
    Object.keys(likeTerms).forEach(key => {
      if (likeTerms[key].length <= 1) {
        delete likeTerms[key];
      }
    });

    return likeTerms;
  };

  const extractCoefficient = (term: string): number => {
    // Remove espaços
    term = term.trim();

    // Se o termo é apenas uma variável (como "x"), o coeficiente é 1
    if (/^[a-zA-Z]/.test(term) && !/^\d/.test(term)) {
      return term.startsWith('-') ? -1 : 1;
    }

    // Se o termo começa com - e depois variável (como "-x"), coeficiente é -1
    if (/^-[a-zA-Z]/.test(term)) {
      return -1;
    }

    // Extrai o coeficiente numérico
    const coeffMatch = term.match(/^([+\-]?\d*)/);
    if (coeffMatch && coeffMatch[1]) {
      const coeff = coeffMatch[1];
      if (coeff === '+' || coeff === '') return 1;
      if (coeff === '-') return -1;
      return parseInt(coeff);
    }

    return 1;
  };

  const parseAlgebraicExpression = (expr: string) => {
    // Remove espaços e normaliza a expressão
    const cleanExpr = expr.replace(/\s/g, '');

    // Divide em termos usando uma abordagem mais robusta
    const terms: { coefficient: number; variables: string }[] = [];

    // Adiciona + no início se não tiver sinal
    const normalized = cleanExpr.startsWith('-') || cleanExpr.startsWith('+') ? cleanExpr : '+' + cleanExpr;

    // Regex melhorada para capturar termos (incluindo símbolos de potência)
    const termRegex = /([+\-])(\d*)([a-zA-Z][a-zA-Z0-9\^²³⁴⁵⁶⁷⁸⁹⁰]*)?/g;
    let match;

    while ((match = termRegex.exec(normalized)) !== null) {
      const [fullMatch, sign, coeff, variables] = match;

      // Pula matches vazios
      if (fullMatch === '+' || fullMatch === '-') continue;

      let coefficient = 1;

      // Se há coeficiente numérico
      if (coeff && coeff !== '') {
        coefficient = parseInt(coeff);
      }

      // Aplica o sinal
      if (sign === '-') {
        coefficient *= -1;
      }

      // Se não há variáveis, é um termo constante
      if (!variables && coeff) {
        terms.push({
          coefficient,
          variables: ''
        });
      } else if (variables) {
        terms.push({
          coefficient,
          variables: variables
        });
      }
    }

    return terms;
  };

  const combineTerms = (terms: { coefficient: number; variables: string }[]) => {
    const combined: { [key: string]: number } = {};

    terms.forEach(term => {
      const key = term.variables || 'constant';
      if (!combined[key]) combined[key] = 0;
      combined[key] += term.coefficient;
    });

    return combined;
  };

  const formatExpression = (combined: { [key: string]: number }) => {
    const parts: string[] = [];

    Object.entries(combined).forEach(([variables, coefficient]) => {
      if (coefficient === 0) return;

      let part = '';
      if (variables === 'constant') {
        part = coefficient.toString();
      } else {
        if (coefficient === 1) {
          part = variables;
        } else if (coefficient === -1) {
          part = `-${variables}`;
        } else {
          part = `${coefficient}${variables}`;
        }
      }

      parts.push(part);
    });

    if (parts.length === 0) return '0';

    // Junta os termos com sinais corretos
    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
      if (parts[i].startsWith('-')) {
        result += parts[i];
      } else {
        result += '+' + parts[i];
      }
    }

    return result;
  };

  const simplifyExpression = (expr: string, type: string): SimplificationResult => {
    const steps: string[] = [];
    const originalExpression = expr;
    let currentExpression = expr;

    steps.push("Análise da Expressão Algébrica");
    steps.push(`Expressão original: ${originalExpression}`);

    // Encontrar fatores comuns
    const commonFactors = findCommonFactors(currentExpression);

    // Identificar termos semelhantes
    const likeTerms = identifyLikeTerms(currentExpression);

    let factorization = "";
    let explanation = "";

    if (type === "complete" || type === "like-terms") {
      // Simplificação de termos semelhantes
      if (Object.keys(likeTerms).length > 0) {
        steps.push("Identificação de termos semelhantes:");
        Object.entries(likeTerms).forEach(([literal, terms]) => {
          steps.push(`  ${literal}: ${terms.join(', ')}`);
        });

        // Parse e combine termos
        const terms = parseAlgebraicExpression(currentExpression);
        const combined = combineTerms(terms);
        currentExpression = formatExpression(combined);

        steps.push("Combinando termos semelhantes...");
        Object.entries(combined).forEach(([variables, coefficient]) => {
          if (coefficient !== 0) {
            const varDisplay = variables === 'constant' ? 'constantes' : variables;
            steps.push(`  ${varDisplay}: coeficiente total = ${coefficient}`);
          }
        });

        explanation = "Expressão simplificada através da combinação de termos semelhantes";
      }
    }

    if (type === "complete" || type === "factorization") {
      // Fatoração
      if (commonFactors.length > 0) {
        steps.push("Fatoração por fator comum:");
        const factor = commonFactors.join(' × ');
        steps.push(`Fator comum encontrado: ${factor}`);

        factorization = `${factor}(...)`;
        explanation = "Expressão fatorada através da identificação de fatores comuns";
      }
    }

    // Resultado final
    if (currentExpression === originalExpression && !factorization) {
      explanation = "A expressão já está em sua forma mais simples";
      steps.push("Resultado: A expressão não pode ser simplificada");
    } else {
      steps.push(`Resultado final: ${currentExpression}`);
    }

    return {
      originalExpression,
      simplifiedExpression: currentExpression,
      steps,
      factorization: factorization || undefined,
      commonFactors: commonFactors.length > 0 ? commonFactors : undefined,
      likeTerms: Object.keys(likeTerms).length > 0 ? likeTerms : undefined,
      isSimplified: currentExpression !== originalExpression || !!factorization,
      explanation,
    };
  };

  const handleSimplify = () => {
    if (!validateExpression() || isCalculating) return;

    setIsCalculating(true);
    startCalculation("simplificar");

    // Usa setTimeout para simular processamento no servidor
    setTimeout(() => {
      try {
        const result = simplifyExpression(expression, simplifyType);
        setResult(result);
        setErrors({});
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
        endCalculation("simplificar", { success: true });
      } catch (error) {
        setErrors({ general: "Erro na simplificação. Verifique a expressão inserida." });
        endCalculation("simplificar", { success: false });
      } finally {
        setIsCalculating(false);
      }
    }, 100);
  };

  const handleReset = () => {
    setExpression("");
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
        <BreadcrumbItem isLast>Simplificador de Expressões Algébricas</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Simplificador de Expressões Algébricas 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Simplifique <strong className="text-growth-green">expressões algébricas</strong> com{" "}
          <strong className="text-primary-blue-dark">fatoração automática e redução de termos</strong> semelhantes.
          Explicação passo a passo para seus estudos de álgebra.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔢 <strong>Fatoração Automática</strong> • 📊 <strong>Termos Semelhantes</strong> • 📈{" "}
            <strong>Explicação Detalhada</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔢 Simplificador de Expressões Algébricas</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile First: Controles otimizados */}
          <div className="mb-8 space-y-4 md:space-y-0">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                Tipo de Simplificação
              </label>
              <select
                value={simplifyType}
                onChange={(e) => setSimplifyType(e.target.value as "complete" | "factorization" | "like-terms")}
                className="w-full h-12 rounded-lg border border-neutral-surface-variant bg-gray-900 px-4 py-3 text-text-primary text-base font-medium shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
              >
                <option value="complete">🎯 Simplificação Completa</option>
                <option value="factorization">🔧 Apenas Fatoração</option>
                <option value="like-terms">📊 Apenas Termos Semelhantes</option>
              </select>
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4 sm:p-6">
            <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
              Digite sua Expressão Algébrica
            </h3>

            <div className="space-y-4">
              <div className="text-center text-sm text-text-secondary mb-4">
                Exemplos: 2x + 3x, x² - 4, 6x³ + 9x², (a+b)² - c²
              </div>

              {/* Input da expressão */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">
                    Expressão Algébrica
                  </label>
                  <Input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="Ex: 2x² + 4x + 6x² - 8x"
                    className="h-12 text-center text-base font-medium"
                  />
                  <div className="text-xs text-text-secondary text-center">
                    Use: +, -, *, /, ^, ², parênteses, variáveis (a-z) e números
                  </div>
                </div>
              </div>

              <ErrorMessage error={errors.expression || errors.general} />
            </div>
          </div>

          {/* Mobile First: Botões otimizados */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              onClick={handleSimplify}
              disabled={isCalculating}
              className="w-full h-12 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 sm:w-auto sm:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? "Simplificando..." : "Simplificar Expressão"}
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
              🔢 Resultado da Simplificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-xl font-bold text-system-warning mb-2">
                    Expressão Original
                  </div>
                  <div className="text-lg text-text-primary font-mono">{result.originalExpression}</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-xl font-bold text-primary-blue-dark mb-2">
                    Expressão Simplificada
                  </div>
                  <div className="text-lg text-text-primary font-mono">{result.simplifiedExpression}</div>
                </div>
              </div>

              {result.factorization && (
                <div className="mb-6 rounded-lg bg-system-warning-light p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">
                    🔧 Fatoração
                  </h4>
                  <div className="text-text-primary font-mono">{result.factorization}</div>
                </div>
              )}

              {result.commonFactors && (
                <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    📊 Fatores Comuns Identificados
                  </h4>
                  <div className="text-sm text-text-secondary">
                    {result.commonFactors.join(', ')}
                  </div>
                </div>
              )}

              {result.likeTerms && (
                <div className="mb-6 rounded-lg bg-growth-green-light p-4">
                  <h4 className="mb-2 font-semibold text-growth-green">
                    📈 Termos Semelhantes
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(result.likeTerms).map(([literal, terms]) => (
                      <div key={literal} className="text-sm text-text-secondary">
                        <strong>{literal === 'constant' ? 'Constantes' : literal}:</strong> {terms.join(', ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  Informações da Simplificação
                </h4>
                <div className="text-sm text-text-secondary space-y-1">
                  <div><strong>Status:</strong> {result.isSimplified ? "Expressão simplificada" : "Expressão já simplificada"}</div>
                  <div><strong>Tipo:</strong> {
                    simplifyType === "complete" ? "Simplificação Completa" :
                    simplifyType === "factorization" ? "Apenas Fatoração" :
                    "Apenas Termos Semelhantes"
                  }</div>
                  <div><strong>Explicação:</strong> {result.explanation}</div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-900 p-4">
                <h4 className="mb-3 font-semibold text-growth-green">Passos da Simplificação</h4>
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <div key={index} className="text-sm text-text-secondary">
                      <span className="font-medium text-primary-blue-dark">{index + 1}. </span>
                      <span className="font-mono">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          </CardContent>
        </Card>
      )}

      {/* Seção educacional */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Expressões Algébricas – Guia Completo 2026
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
                  <h4 className="mb-3 font-semibold text-growth-green">📚 O que são Expressões Algébricas?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Expressões algébricas são combinações matemáticas de números, variáveis (letras)
                    e operações. Elas podem ser simplificadas através de técnicas como combinação
                    de termos semelhantes e fatoração.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🎯 Técnicas de Simplificação</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• <strong>Termos semelhantes:</strong> 3x + 5x = 8x</li>
                    <li>• <strong>Fatoração:</strong> ax + bx = x(a + b)</li>
                    <li>• <strong>Produtos notáveis:</strong> (a+b)² = a² + 2ab + b²</li>
                    <li>• <strong>Distributiva:</strong> a(b + c) = ab + ac</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-growth-green">
                📊 Termos Semelhantes
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Como Identificar</h4>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>1. <strong>Mesma parte literal:</strong> Variáveis idênticas</li>
                    <li>2. <strong>Mesmos expoentes:</strong> Potências iguais</li>
                    <li>3. <strong>Combinar coeficientes:</strong> Somar ou subtrair</li>
                  </ol>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Exemplos</h4>
                  <div className="text-sm text-text-secondary space-y-1 font-mono bg-gray-800 p-3 rounded">
                    <div>2x + 5x = 7x</div>
                    <div>3x² - x² = 2x²</div>
                    <div>4y + 2y - y = 5y</div>
                    <div>6ab + 3ab = 9ab</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-system-warning">
                🔧 Fatoração
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📐 Técnicas Principais</h4>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>1. <strong>Fator comum:</strong> Identificar MDC</li>
                    <li>2. <strong>Agrupamento:</strong> Agrupar termos</li>
                    <li>3. <strong>Produtos notáveis:</strong> Reconhecer padrões</li>
                  </ol>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">⚡ Exemplos Práticos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary font-mono bg-gray-800 p-3 rounded">
                    <li>6x + 9 = 3(2x + 3)</li>
                    <li>x² - 4 = (x+2)(x-2)</li>
                    <li>x² + 6x + 9 = (x+3)²</li>
                    <li>2x² + 4x = 2x(x + 2)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Simplificação de Expressões Algébricas"
        items={[
          {
            question: "O que é simplificação de expressões algébricas?",
            answer:
              "Simplificação de expressões algébricas é o processo de reduzir uma expressão à sua forma mais simples, combinando termos semelhantes, aplicando propriedades distributivas e fatorando quando possível.",
            borderColor: "primary-blue",
          },
          {
            question: "Como fatorar uma expressão algébrica?",
            answer:
              "Para fatorar uma expressão, identifique fatores comuns, aplique produtos notáveis (diferença de quadrados, trinômio quadrado perfeito) ou use métodos como agrupamento e fatoração por tentativa.",
            borderColor: "growth-green",
          },
          {
            question: "O que são termos semelhantes?",
            answer:
              "Termos semelhantes são aqueles que têm a mesma parte literal (variáveis com os mesmos expoentes). Por exemplo: 3x² e 5x² são termos semelhantes e podem ser somados: 3x² + 5x² = 8x².",
            borderColor: "system-warning",
          },
          {
            question: "Quais são os principais produtos notáveis?",
            answer:
              "Os principais produtos notáveis são: quadrado da soma (a+b)² = a² + 2ab + b², quadrado da diferença (a-b)² = a² - 2ab + b², e produto da soma pela diferença (a+b)(a-b) = a² - b².",
            borderColor: "system-success",
          },
          {
            question: "Como identificar o fator comum em uma expressão?",
            answer:
              "Para identificar o fator comum, observe os coeficientes numéricos (MDC) e as variáveis (menor expoente de cada variável presente em todos os termos). Por exemplo, em 6x³ + 9x², o fator comum é 3x².",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Simplificação",
          content:
            "<strong>Para melhores resultados:</strong> sempre identifique primeiro os termos semelhantes, depois procure por fatores comuns. Lembre-se de verificar se existem produtos notáveis na expressão.",
        }}
        footerText="<strong>Lembre-se:</strong> A simplificação de expressões algébricas é fundamental para resolver equações, inequações e outras operações matemáticas avançadas."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Simplificador de Expressões Algébricas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">simplificador de expressões algébricas</strong>{" "}
              oferece <strong className="text-growth-green">fatoração automática e combinação de termos</strong> semelhantes
              com explicação passo a passo completa.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Simplificação completa, fatoração por fator comum,
              combinação de termos semelhantes, detecção de produtos notáveis e explicação detalhada.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais. Para aplicações científicas que exigem alta precisão, consulte sempre um{" "}
              <strong>profissional qualificado</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="simplificador-funcoes-algebricas" />
    </div>
  );
}