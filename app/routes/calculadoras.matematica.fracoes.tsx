import type { MetaFunction } from "@remix-run/node";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import {
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  parseFraction,
  simplifyFraction,
  decimalToFraction,
  fractionToDecimal,
  type Fraction,
} from "~/utils/calculations";

type FractionOperationResult = {
  result: Fraction;
  steps: string[];
  explanation: string;
};

type FractionConversionResult = {
  fraction: Fraction;
  steps: string[];
};

// Component for real-time result preview
const ResultPreview = ({ visible, result, label, type = "operation" }: {
  visible: boolean;
  result: any;
  label: string;
  type?: "operation" | "conversion" | "simplify";
}) => {
  if (!visible || !result) return null;

  const formatFraction = (fraction: any): string => {
    if (!fraction || typeof fraction.numerator !== 'number' || typeof fraction.denominator !== 'number') {
      return "0/1";
    }
    
    const sign = fraction.isNegative ? "-" : "";
    return `${sign}${Math.abs(fraction.numerator)}/${Math.abs(fraction.denominator)}`;
  };

  const getDisplayValue = () => {
    switch (type) {
      case "operation":
        return formatFraction(result.result);
      case "conversion":
        return formatFraction(result.fraction);
      case "simplify":
        return formatFraction(result.simplified);
      default:
        return "";
    }
  };

  const getDecimalValue = () => {
    switch (type) {
      case "operation":
        return result.result?.decimal;
      case "conversion":
        return result.fraction?.decimal;
      case "simplify":
        return result.simplified?.decimal;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
      <div className="rounded-lg border-2 border-system-success/30 bg-gradient-to-r from-system-success/10 to-growth-green/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-system-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-system-success">
            👁️ {label}
          </span>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-growth-green font-mono">
            {getDisplayValue()}
          </div>
          
          {getDecimalValue() && (
            <div className="text-sm text-text-secondary mt-1">
              ≈ {getDecimalValue().toFixed(4)}
            </div>
          )}
          
          <div className="text-xs text-text-secondary mt-2 opacity-75">
            Clique em "Calcular" para ver os passos detalhados
          </div>
        </div>
      </div>
    </div>
  );
};

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Frações 2025 - Somar, Subtrair, Multiplicar e Dividir Frações - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora de frações GRATUITA e completa! Some, subtraia, multiplique e divida frações com explicações passo a passo. Converta entre frações, decimais e números mistos. Simplifique frações automaticamente com métodos educativos.",
    },
    {
      name: "keywords",
      content:
        "calculadora frações, somar frações, subtrair frações, multiplicar frações, dividir frações, simplificar frações, converter decimal fração, números mistos, matemática frações, educação matemática, frações equivalentes, denominador comum, numerador",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },

    // Open Graph tags
    {
      property: "og:title",
      content: `Calculadora de Frações - Operações Completas com Explicações - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Resolva operações com frações passo a passo! Some, subtraia, multiplique, divida e converta frações com métodos educativos. Perfeita para estudos de matemática.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonline.com.br/calculadoras/matematica/fracoes",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Frações Educativa - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Aprenda e resolva operações com frações! Explicações passo a passo, conversões e simplificações automáticas.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
    { rel: "canonical", href: "https://calculadoraonline.com.br/calculadoras/matematica/fracoes" },

    // Structured Data
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Calculadora de Frações",
        description:
          "Calculadora online gratuita para operações com frações, conversões e simplificações com explicações passo a passo",
        url: "https://calculadoraonline.com.br/calculadoras/matematica/fracoes",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Somar frações com denominadores diferentes",
          "Subtrair frações com explicações",
          "Multiplicar e dividir frações",
          "Simplificar frações automaticamente",
          "Converter decimais em frações",
          "Converter frações em números mistos",
          "Explicações passo a passo educativas",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "320",
          bestRating: "5",
          worstRating: "1",
        },
      }),
    },
  ];
};

export default function FractionCalculator() {
  const [fraction1Input, setFraction1Input] = useState("");
  const [fraction2Input, setFraction2Input] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide">("add");
  const [decimalInput, setDecimalInput] = useState("");
  const [simplifyInput, setSimplifyInput] = useState("");

  const [operationResult, setOperationResult] = useState<FractionOperationResult | null>(null);
  const [conversionResult, setConversionResult] = useState<FractionConversionResult | null>(null);
  const [simplifyResult, setSimplifyResult] = useState<{
    original: Fraction;
    simplified: Fraction;
    mixedNumber: string;
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [mobileSection, setMobileSection] = useState<'calculator' | 'result' | 'conversion'>('calculator');

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "fracoes",
    category: "matematica"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("fracoes");

  // Real-time preview calculation
  const previewResult = useMemo(() => {
    if (!fraction1Input || !fraction2Input) return null;
    
    try {
      const fraction1 = parseFraction(fraction1Input);
      const fraction2 = parseFraction(fraction2Input);
      
      if (!fraction1 || !fraction2) return null;
      
      switch (operation) {
        case "add":
          return addFractions(fraction1, fraction2);
        case "subtract":
          return subtractFractions(fraction1, fraction2);
        case "multiply":
          return multiplyFractions(fraction1, fraction2);
        case "divide":
          return divideFractions(fraction1, fraction2);
        default:
          return null;
      }
    } catch {
      return null;
    }
  }, [fraction1Input, fraction2Input, operation]);

  const previewConversion = useMemo(() => {
    if (!decimalInput) return null;
    
    try {
      const decimal = parseFloat(decimalInput);
      if (isNaN(decimal)) return null;
      return decimalToFraction(decimal);
    } catch {
      return null;
    }
  }, [decimalInput]);

  const previewSimplify = useMemo(() => {
    if (!simplifyInput) return null;
    
    try {
      const fraction = parseFraction(simplifyInput);
      if (!fraction) return null;
      
      const simplified = simplifyFraction(fraction.numerator, fraction.denominator);
      return { original: fraction, simplified };
    } catch {
      return null;
    }
  }, [simplifyInput]);

  // Auto-switch to result section on mobile when result is available
  useEffect(() => {
    if (operationResult && window.innerWidth < 1024) {
      setMobileSection('result');
    }
  }, [operationResult]);

  const handleOperation = useCallback(async () => {
    // Start tracking calculation
    startCalculation();
    trackFormSubmission();
    
    try {
      setError("");
      setIsCalculating(true);
      
      // Simular loading para feedback visual
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const fraction1 = parseFraction(fraction1Input);
      const fraction2 = parseFraction(fraction2Input);

      if (!fraction1 || !fraction2) {
        throw new Error("Frações inválidas. Verifique o formato (ex: 1/2, 3/4)");
      }

      let result: FractionOperationResult;

      switch (operation) {
        case "add":
          result = addFractions(fraction1, fraction2);
          break;
        case "subtract":
          result = subtractFractions(fraction1, fraction2);
          break;
        case "multiply":
          result = multiplyFractions(fraction1, fraction2);
          break;
        case "divide":
          result = divideFractions(fraction1, fraction2);
          break;
      }

      setOperationResult(result);
      setShowSteps(false); // Reset steps visibility
      
      // Track successful calculation
      endCalculation(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro no cálculo";
      setError(errorMessage);
      setOperationResult(null);
      
      // Track failed calculation
      endCalculation(false, errorMessage);
    } finally {
      setIsCalculating(false);
    }
  }, [fraction1Input, fraction2Input, operation, startCalculation, trackFormSubmission, endCalculation]);

  const handleConversion = () => {
    try {
      setError("");
      const decimal = parseFloat(decimalInput);
      if (isNaN(decimal)) {
        throw new Error("Digite um número decimal válido");
      }
      const result = decimalToFraction(decimal);
      setConversionResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro na conversão");
      setConversionResult(null);
    }
  };

  const handleSimplify = () => {
    try {
      setError("");
      const fraction = parseFraction(simplifyInput);
      
      // Validate fraction object
      if (!fraction || typeof fraction.numerator !== 'number' || typeof fraction.denominator !== 'number') {
        throw new Error("Fração inválida. Verifique o formato de entrada.");
      }
      
      const simplified = simplifyFraction(fraction.numerator, fraction.denominator);
      
      // Create mixed number if improper fraction
      let mixedNumber: string;
      if (simplified.isImproper && Math.abs(simplified.numerator) > simplified.denominator) {
        const whole = Math.floor(Math.abs(simplified.numerator) / simplified.denominator);
        const remainder = Math.abs(simplified.numerator) % simplified.denominator;
        const sign = simplified.numerator < 0 ? '-' : '';
        
        if (remainder === 0) {
          mixedNumber = `${sign}${whole}`;
        } else {
          mixedNumber = `${sign}${whole} ${remainder}/${simplified.denominator}`;
        }
      } else {
        mixedNumber = formatFraction(simplified);
      }

      setSimplifyResult({
        original: fraction,
        simplified,
        mixedNumber,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro na simplificação");
      setSimplifyResult(null);
    }
  };

  const handleReset = () => {
    setFraction1Input("");
    setFraction2Input("");
    setDecimalInput("");
    setSimplifyInput("");
    setOperationResult(null);
    setConversionResult(null);
    setSimplifyResult(null);
    setError("");
  };

  const formatFraction = (fraction: Fraction): string => {
    if (!fraction || typeof fraction.numerator !== 'number' || typeof fraction.denominator !== 'number') {
      return "0/1";
    }
    
    const sign = fraction.isNegative ? "-" : "";
    return `${sign}${Math.abs(fraction.numerator)}/${Math.abs(fraction.denominator)}`;
  };

  const formatMixedNumber = (mixedNumber: { whole: number; fraction: Fraction }): string => {
    if (!mixedNumber || typeof mixedNumber.whole !== 'number' || !mixedNumber.fraction) {
      return "0";
    }
    
    if (!mixedNumber.fraction.numerator || !mixedNumber.fraction.denominator) {
      return mixedNumber.whole.toString();
    }
    
    if (mixedNumber.whole === 0) {
      return `${mixedNumber.fraction.numerator}/${mixedNumber.fraction.denominator}`;
    }

    if (mixedNumber.fraction.numerator === 0) {
      return mixedNumber.whole.toString();
    }

    const sign = mixedNumber.whole < 0 ? "-" : "";
    const whole = Math.abs(mixedNumber.whole);

    return `${sign}${whole} ${mixedNumber.fraction.numerator}/${mixedNumber.fraction.denominator}`;
  };


  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Frações</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🧮 Calculadora de Frações Online
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-text-secondary-dark">
          Resolva <strong className="text-primary-blue-dark">operações com frações</strong> de forma
          educativa e precisa.
          <strong className="text-growth-green">Some, subtraia, multiplique, divida</strong> e
          converta frações com
          <strong className="text-system-warning"> explicações passo a passo</strong> detalhadas.
        </p>
        <div className="inline-block rounded-lg bg-gradient-to-r from-primary-blue-light via-growth-green-soft to-system-warning/20 p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📚 <strong>Método Educativo</strong> • ⚡ <strong>Cálculo Instantâneo</strong> • 🔄{" "}
            <strong>Conversões Automáticas</strong> • 📊 <strong>Simplificação Inteligente</strong>
          </p>
        </div>
      </header>

      {error && (
        <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4 text-center">
          <p className="font-medium text-system-error">{error}</p>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex rounded-lg bg-background-dark-secondary p-1">
          <button 
            onClick={() => setMobileSection('calculator')}
            className={`flex-1 py-2 px-3 text-center rounded-md text-sm font-medium transition-colors ${
              mobileSection === 'calculator' 
                ? 'bg-primary-blue text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            🧮 Calcular
          </button>
          <button 
            onClick={() => setMobileSection('result')}
            className={`flex-1 py-2 px-3 text-center rounded-md text-sm font-medium transition-colors ${
              mobileSection === 'result' 
                ? 'bg-system-success text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            📊 Resultado
          </button>
          <button 
            onClick={() => setMobileSection('conversion')}
            className={`flex-1 py-2 px-3 text-center rounded-md text-sm font-medium transition-colors ${
              mobileSection === 'conversion' 
                ? 'bg-system-warning text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            🔄 Outros
          </button>
        </div>
      </div>

      {/* Layout Principal - UX Otimizado com 2 colunas principais */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Coluna 1: Input e Controles (lg:col-span-1) */}
        <div className={`${mobileSection !== 'calculator' ? 'hidden lg:block' : ''}`}>
          <Card>
            <CardHeader>
              <CardTitle as="h2">🔢 Operações com Frações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Primeira Fração"
                    value={fraction1Input}
                    onChange={(e) => setFraction1Input(e.target.value)}
                    placeholder="Ex: 3/4, 2 1/3, 5"
                    fullWidth
                  />
                  <Input
                    label="Segunda Fração"
                    value={fraction2Input}
                    onChange={(e) => setFraction2Input(e.target.value)}
                    placeholder="Ex: 1/2, 3 2/5, 7"
                    fullWidth
                  />
                </div>

                <Select
                  label="Operação"
                  value={operation}
                  onChange={(value) => setOperation(value as any)}
                  options={[
                    { value: "add", label: "➕ Somar (+)" },
                    { value: "subtract", label: "➖ Subtrair (-)" },
                    { value: "multiply", label: "✖️ Multiplicar (×)" },
                    { value: "divide", label: "➗ Dividir (÷)" },
                  ]}
                  fullWidth
                />

                {/* Preview em tempo real - Posicionado estrategicamente */}
                <ResultPreview 
                  visible={!!previewResult}
                  result={previewResult}
                  label="⚡ Resultado Instantâneo"
                  type="operation"
                />

                <div className="rounded-lg bg-system-info/10 p-3 text-xs text-text-secondary">
                  <p>
                    <strong>💡 Formatos aceitos:</strong>
                  </p>
                  <ul className="mt-1 list-inside list-disc space-y-1">
                    <li>
                      <strong>Fração simples:</strong> 3/4, 5/8, 7/2
                    </li>
                    <li>
                      <strong>Número misto:</strong> 2 1/3, 3 2/5, 1 4/7
                    </li>
                    <li>
                      <strong>Número inteiro:</strong> 5, 10, -3
                    </li>
                    <li>
                      <strong>Frações negativas:</strong> -2/3, -1 1/2
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleOperation} 
                    className="flex-1"
                    disabled={isCalculating || !fraction1Input || !fraction2Input}
                  >
                    {isCalculating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Calculando...
                      </div>
                    ) : (
                      "Calcular"
                    )}
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="flex-1">
                    Limpar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna 2: Resultado Principal Unificado (lg:col-span-1) */}
        <div className={`${mobileSection !== 'result' ? 'hidden lg:block' : ''}`}>
          {/* Resultado Principal - Design UX Otimizado */}
          {operationResult ? (
            <Card className="sticky top-4 border-2 border-system-success/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-system-success/10 to-growth-green/10">
                <CardTitle as="h3" className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-system-success rounded-full animate-pulse"></div>
                    <span className="text-system-success">✅ Resultado Calculado</span>
                  </span>
                  <Button
                    onClick={() => {
                      const newShowSteps = !showSteps;
                      setShowSteps(newShowSteps);
                      trackStepsToggle(newShowSteps);
                    }}
                    variant="outline"
                    className="text-sm border-system-success/30 hover:bg-system-success/10"
                  >
                    {showSteps ? "➖ Ocultar" : "➕ Ver"} Passos
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Resultado Principal com hierarquia visual melhorada */}
                  <div className="rounded-xl bg-gradient-to-br from-growth-green-soft/20 via-primary-blue-light/20 to-system-success/10 p-8 text-center border border-system-success/20 animate-in zoom-in-50 duration-500">
                    
                    {/* Expressão da operação */}
                    <div className="mb-4 text-xl font-semibold text-text-primary bg-white/50 rounded-lg p-3 border">
                      <span className="text-primary-blue-dark font-mono">{fraction1Input}</span>
                      <span className="mx-3 text-2xl">
                        {operation === "add"
                          ? "➕"
                          : operation === "subtract"
                            ? "➖"
                            : operation === "multiply"
                              ? "✖️"
                              : "➗"}
                      </span>
                      <span className="text-primary-blue-dark font-mono">{fraction2Input}</span>
                      <span className="mx-3 text-2xl">=</span>
                    </div>
                    
                    {/* Resultado principal - Hierarquia visual forte */}
                    <div className="mb-4">
                      <div className="text-5xl md:text-6xl font-bold text-growth-green font-mono mb-2 leading-tight">
                        {formatFraction(operationResult.result)}
                      </div>
                      {operationResult.result.decimal && (
                        <div className="text-xl text-text-secondary-dark font-medium">
                          ≈ <span className="font-mono">{operationResult.result.decimal.toFixed(4)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Explicação com melhor legibilidade */}
                    <div className="bg-white/70 rounded-lg p-4 border border-system-success/20">
                      <p className="text-sm font-medium text-text-primary">
                        💡 {operationResult.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Passos detalhados com design melhorado */}
                  {showSteps && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <div className="rounded-lg bg-system-info/10 border border-system-info/20 p-5">
                        <h4 className="text-base font-semibold text-system-info mb-4 flex items-center gap-2">
                          <span className="text-lg">📚</span>
                          Passos da Resolução Detalhados:
                        </h4>
                        <ol className="space-y-3">
                          {operationResult.steps.map((step, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-system-info text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="text-text-primary font-medium leading-relaxed">
                                {step}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : previewResult ? (
            <Card className="sticky top-4 border-2 border-primary-blue/30">
              <CardHeader className="bg-gradient-to-r from-primary-blue/10 to-system-info/10">
                <CardTitle as="h3" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-blue rounded-full animate-bounce"></div>
                  <span className="text-primary-blue">👁️ Preview do Resultado</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-primary-blue font-mono mb-3">
                    {formatFraction(previewResult.result)}
                  </div>
                  {previewResult.result.decimal && (
                    <div className="text-lg text-text-secondary mb-4">
                      ≈ {previewResult.result.decimal.toFixed(4)}
                    </div>
                  )}
                  <div className="bg-primary-blue/10 rounded-lg p-4 border border-primary-blue/20">
                    <p className="text-sm font-medium text-primary-blue flex items-center justify-center gap-2">
                      <span>🧠</span>
                      Clique em "Calcular" para ver os passos detalhados
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-text-secondary/30">
              <CardContent className="text-center py-16">
                <div className="text-8xl mb-6 opacity-50">🧮</div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Resultado aparecerá aqui
                </h3>
                <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">
                  Digite duas frações na coluna ao lado e veja o resultado aparecer instantaneamente
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary-blue">
                  <span>⚡</span>
                  <span>Cálculo em tempo real ativado</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
      
      {/* Seção de Conversões - Movida para baixo para não competir com foco principal */}
      <div className={`space-y-6 ${mobileSection !== 'conversion' ? 'hidden lg:block' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Conversão Decimal para Fração */}
          <Card>
            <CardHeader>
              <CardTitle as="h2" className="text-base">🔄 Converter Decimal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Número Decimal"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  placeholder="Ex: 0.75"
                  type="number"
                  step="any"
                  fullWidth
                />

                {/* Preview em tempo real */}
                <ResultPreview 
                  visible={!!previewConversion}
                  result={previewConversion}
                  label="Preview da Conversão"
                  type="conversion"
                />

                <div className="rounded-lg bg-growth-green-soft/10 p-2 text-xs text-text-secondary">
                  <p><strong>🎯 Exemplos:</strong></p>
                  <div className="mt-1 space-y-1">
                    <div>0.5 = 1/2</div>
                    <div>0.75 = 3/4</div>
                    <div>1.25 = 1¼</div>
                  </div>
                </div>

                <Button onClick={handleConversion} fullWidth className="text-sm">
                  Converter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Simplificar Fração */}
          <Card>
            <CardHeader>
              <CardTitle as="h2" className="text-base">📉 Simplificar Fração</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Fração para Simplificar"
                  value={simplifyInput}
                  onChange={(e) => setSimplifyInput(e.target.value)}
                  placeholder="Ex: 8/12"
                  fullWidth
                />

                {/* Preview em tempo real */}
                <ResultPreview 
                  visible={!!previewSimplify}
                  result={previewSimplify}
                  label="Preview da Simplificação"
                  type="simplify"
                />

                <div className="rounded-lg bg-primary-blue-light/20 p-2 text-xs text-text-secondary">
                  <p><strong>🧠 Como funciona:</strong></p>
                  <div className="mt-1 space-y-1">
                    <div>• Encontra o MDC</div>
                    <div>• Divide numerador e denominador</div>
                    <div>• Converte para misto se necessário</div>
                  </div>
                </div>

                <Button onClick={handleSimplify} fullWidth className="text-sm">
                  Simplificar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora Rápida */}
          <Card className="border-system-warning/20 bg-system-warning/5">
            <CardHeader>
              <CardTitle as="h3" className="text-base text-system-warning">⚡ Calculadora Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs text-text-secondary">
                  Digite frações e veja o resultado instantaneamente na coluna ao lado!
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => {
                      setFraction1Input("1/2");
                      setFraction2Input("1/3");
                      setOperation("add");
                    }}
                    variant="outline"
                    className="text-xs p-2 h-auto"
                  >
                    1/2 + 1/3
                  </Button>
                  <Button 
                    onClick={() => {
                      setFraction1Input("3/4");
                      setFraction2Input("1/2");
                      setOperation("multiply");
                    }}
                    variant="outline"
                    className="text-xs p-2 h-auto"
                  >
                    3/4 × 1/2
                  </Button>
                  <Button 
                    onClick={() => {
                      setFraction1Input("2/3");
                      setFraction2Input("1/4");
                      setOperation("divide");
                    }}
                    variant="outline"
                    className="text-xs p-2 h-auto"
                  >
                    2/3 ÷ 1/4
                  </Button>
                  <Button 
                    onClick={() => {
                      setSimplifyInput("12/16");
                    }}
                    variant="outline"
                    className="text-xs p-2 h-auto"
                  >
                    Simplificar 12/16
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seção de Resultados das Conversões (quando existem) */}
      {(conversionResult || simplifyResult) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Resultado da Conversão */}
          {conversionResult && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">🔄 Resultado da Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-system-warning/20 to-growth-green-soft/20 p-6 text-center">
                    <p className="mb-2 text-lg font-semibold text-text-primary">
                      {decimalInput} =
                    </p>
                    <div className="mb-2 text-3xl font-bold text-system-warning">
                      {formatFraction(conversionResult.fraction)}
                    </div>
                    {conversionResult.fraction.decimal && (
                      <p className="mt-2 text-sm text-text-secondary">
                        Decimal: {conversionResult.fraction.decimal.toFixed(6)}
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg bg-system-warning/10 p-4">
                    <h4 className="text-sm font-semibold text-system-warning mb-3">
                      📋 Passos da Conversão:
                    </h4>
                    <ol className="list-inside list-decimal space-y-2 text-sm">
                      {conversionResult.steps.map((step, index) => (
                        <li key={index} className="text-text-primary">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resultado da Simplificação */}
          {simplifyResult && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">📉 Resultado da Simplificação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-primary-blue-light/20 to-system-info/20 p-6 text-center">
                    <p className="mb-2 text-lg font-semibold text-text-primary">
                      {formatFraction(simplifyResult.original)} =
                    </p>
                    <div className="mb-2 text-3xl font-bold text-primary-blue-dark">
                      {formatFraction(simplifyResult.simplified)}
                    </div>
                    {simplifyResult.simplified.isImproper && (
                      <p className="text-lg text-growth-green">= {simplifyResult.mixedNumber}</p>
                    )}
                    <p className="mt-2 text-base text-text-secondary-dark">
                      ={" "}
                      {(
                        simplifyResult.simplified.numerator / simplifyResult.simplified.denominator
                      ).toFixed(4)}{" "}
                      (decimal)
                    </p>
                  </div>

                  <div className="text-center">
                    {formatFraction(simplifyResult.original) ===
                    formatFraction(simplifyResult.simplified) ? (
                      <div className="rounded-lg bg-growth-green-soft/20 p-4">
                        <p className="font-semibold text-growth-green">
                          ✅ Esta fração já está na forma mais simples!
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-system-info/20 p-4">
                        <p className="font-semibold text-system-info">
                          ✨ Fração simplificada com sucesso!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}


      {/* Conteúdo Educacional */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">📚 Guia Educativo sobre Frações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
              {/* O que são Frações */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">🤔 O que são Frações?</h3>
                <p className="text-text-secondary-dark">
                  Uma <strong>fração</strong> representa uma parte de um todo. É composta por um{" "}
                  <strong className="text-primary-blue-dark">numerador</strong> (parte de cima) que
                  indica quantas partes temos, e um{" "}
                  <strong className="text-growth-green">denominador</strong> (parte de baixo) que
                  indica em quantas partes o todo foi dividido.
                </p>
                <div className="rounded-lg bg-system-info/10 p-4">
                  <p className="text-sm">
                    <strong>Exemplo:</strong> Na fração 3/4:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                    <li>
                      <strong className="text-primary-blue-dark">3</strong> é o numerador (temos 3
                      partes)
                    </li>
                    <li>
                      <strong className="text-growth-green">4</strong> é o denominador (o todo foi
                      dividido em 4 partes)
                    </li>
                    <li>
                      Isso significa que temos <strong>3 de 4 partes</strong>, ou seja, três quartos
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tipos de Frações */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">📊 Tipos de Frações</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-growth-green-soft/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">✅ Frações Próprias</h4>
                    <p className="mb-2 text-sm text-text-secondary-dark">
                      O numerador é menor que o denominador. Representa uma parte menor que o todo.
                    </p>
                    <p className="font-mono text-sm">Exemplos: 1/2, 3/4, 5/8</p>
                  </div>
                  <div className="rounded-lg bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      ⚠️ Frações Impróprias
                    </h4>
                    <p className="mb-2 text-sm text-text-secondary-dark">
                      O numerador é maior ou igual ao denominador. Representa uma quantidade maior
                      que o todo.
                    </p>
                    <p className="font-mono text-sm">Exemplos: 5/3, 7/4, 9/5</p>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">🔄 Números Mistos</h4>
                    <p className="mb-2 text-sm text-text-secondary-dark">
                      Combinação de um número inteiro com uma fração própria.
                    </p>
                    <p className="font-mono text-sm">Exemplos: 1 1/2, 2 3/4, 3 2/5</p>
                  </div>
                </div>
              </div>

              {/* Operações com Frações */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">
                  🧮 Como Fazer Operações com Frações
                </h3>

                <div className="space-y-4">
                  {/* Adição e Subtração */}
                  <div className="rounded-lg bg-growth-green-soft/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      ➕➖ Adição e Subtração
                    </h4>
                    <ol className="list-inside list-decimal space-y-1 text-sm">
                      <li>
                        Encontre o <strong>denominador comum</strong> (MMC dos denominadores)
                      </li>
                      <li>Converta as frações para o denominador comum</li>
                      <li>Some ou subtraia apenas os numeradores</li>
                      <li>Simplifique o resultado se possível</li>
                    </ol>
                    <p className="mt-2 rounded bg-white/50 p-2 font-mono text-sm">
                      Exemplo: 1/3 + 1/4 = 4/12 + 3/12 = 7/12
                    </p>
                  </div>

                  {/* Multiplicação */}
                  <div className="rounded-lg bg-primary-blue-light/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">✖️ Multiplicação</h4>
                    <ol className="list-inside list-decimal space-y-1 text-sm">
                      <li>Multiplique numerador por numerador</li>
                      <li>Multiplique denominador por denominador</li>
                      <li>Simplifique o resultado se possível</li>
                    </ol>
                    <p className="mt-2 rounded bg-white/50 p-2 font-mono text-sm">
                      Exemplo: 2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2
                    </p>
                  </div>

                  {/* Divisão */}
                  <div className="rounded-lg bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">➗ Divisão</h4>
                    <ol className="list-inside list-decimal space-y-1 text-sm">
                      <li>Inverta a segunda fração (reciproco)</li>
                      <li>Multiplique as frações</li>
                      <li>Simplifique o resultado se possível</li>
                    </ol>
                    <p className="mt-2 rounded bg-white/50 p-2 font-mono text-sm">
                      Exemplo: 2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3 = 2 2/3
                    </p>
                  </div>
                </div>
              </div>

              {/* Dicas Práticas */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">💡 Dicas Práticas</h3>
                <div className="rounded-lg bg-system-info/10 p-4">
                  <ul className="list-inside list-disc space-y-2 text-sm">
                    <li>
                      <strong>Sempre simplifique:</strong> Use o MDC (Máximo Divisor Comum) para
                      reduzir frações
                    </li>
                    <li>
                      <strong>Converta quando necessário:</strong> Números mistos podem ser mais
                      fáceis de entender
                    </li>
                    <li>
                      <strong>Verifique seus cálculos:</strong> Converta para decimal para verificar
                      se o resultado faz sentido
                    </li>
                    <li>
                      <strong>Use denominadores comuns:</strong> Para comparar frações, use o mesmo
                      denominador
                    </li>
                    <li>
                      <strong>Pratique com exemplos:</strong> Quanto mais praticar, mais fácil fica!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Frações"
        items={[
          {
            question: "Como somar e subtrair frações com denominadores diferentes?",
            answer:
              "Para somar/subtrair frações com denominadores diferentes, encontre o <strong>MMC dos denominadores</strong>, converta ambas para o denominador comum e opere apenas os numeradores. Exemplo: 1/3 + 1/4 = 4/12 + 3/12 = <strong>7/12</strong>. Nossa calculadora faz isso automaticamente!",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre fração própria e imprópria?",
            answer:
              "<strong>Fração própria:</strong> numerador menor que denominador (3/4), representa menos que 1. <strong>Fração imprópria:</strong> numerador maior/igual ao denominador (5/4), representa 1 ou mais. Impróprias podem virar <strong>números mistos</strong> (1¼)!",
            borderColor: "system-success",
          },
          {
            question: "Como converter decimais em frações e vice-versa?",
            answer:
              "<strong>Decimal → Fração:</strong> 0,75 = 75/100 = 3/4 (simplifique pelo MDC). <strong>Fração → Decimal:</strong> divida numerador pelo denominador (3÷4 = 0,75). Use nossa calculadora para <strong>conversões automáticas</strong> com simplificação!",
            borderColor: "growth-green",
          },
          {
            question: "Como multiplicar e dividir frações corretamente?",
            answer:
              "<strong>Multiplicação:</strong> multiplique numeradores entre si e denominadores entre si (2/3 × 3/4 = 6/12 = 1/2). <strong>Divisão:</strong> multiplique pela fração inversa (2/3 ÷ 3/4 = 2/3 × 4/3 = <strong>8/9</strong>). Sempre simplifique o resultado!",
            borderColor: "system-info",
          },
          {
            question: "Por que é importante simplificar frações?",
            answer:
              "Simplificar torna frações mais <strong>fáceis de entender e comparar</strong>. 8/12 = 2/3 é mais claro! Frações simplificadas são a <strong>forma padrão em matemática</strong>, facilitam cálculos e evitam erros. Nossa calculadora simplifica automaticamente!",
            borderColor: "primary-blue",
          },
          {
            question: "O que são frações equivalentes e como identificá-las?",
            answer:
              "São frações que representam o <strong>mesmo valor</strong>: 1/2 = 2/4 = 3/6 = 4/8. Para criar equivalentes, <strong>multiplique/divida numerador e denominador pelo mesmo número</strong>. Use para encontrar denominadores comuns ou simplificar!",
            borderColor: "system-success",
          },
          {
            question: "Como usar frações no dia a dia e em receitas?",
            answer:
              "<strong>Receitas:</strong> dobrar (1/2 xícara × 2 = 1 xícara), reduzir pela metade. <strong>Medidas:</strong> 3/4 de metro, 2/3 de hora. <strong>Divisões:</strong> pizza em 8 fatias, cada uma é 1/8. Frações estão em <strong>situações cotidianas</strong>!",
            borderColor: "growth-green",
          },
          {
            question: "A calculadora funciona com números mistos e negativos?",
            answer:
              "<strong>Sim, totalmente!</strong> Aceita números mistos (2½), frações negativas (-3/4), decimais (0,75) e inteiros (5). Converte automaticamente entre formatos e <strong>mostra todos os passos</strong>. Perfeita para qualquer tipo de cálculo com frações!",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para dominar frações, <strong>pratique a simplificação</strong> encontrando o MDC. Sempre verifique se o resultado pode ser simplificado - isso torna os números mais fáceis de trabalhar e interpretar!",
        }}
        footerText="<strong>Precisa de mais cálculos com frações?</strong> Use nossa calculadora para somar, subtrair, multiplicar, dividir e converter frações com facilidade e precisão!"
      />

      <RelatedCalculators category="matematica" currentCalculatorId="fracoes" />
    </div>
  );
}
