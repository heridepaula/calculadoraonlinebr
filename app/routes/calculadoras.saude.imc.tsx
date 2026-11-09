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
    ...buildCalculatorMeta("imc"),
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
            name: "Saúde",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "IMC",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de IMC com Taxa Metabólica 2026",
        description:
          "Ferramenta gratuita para calcular IMC, taxa metabólica basal e percentual de gordura corporal. Análise completa por idade, sexo e classificação de saúde.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-31",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
          name: "Calculadora de IMC com Taxa Metabólica - Análise Corporal",
          description:
            "Ferramenta gratuita para calcular IMC, taxa metabólica basal e percentual de gordura corporal com classificação por idade e sexo.",
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
          name: "IMC e Taxa Metabólica",
          description:
            "Índice de Massa Corporal e metabolismo basal, indicadores importantes de saúde e composição corporal",
          category: "Health",
        },
        featureList: [
          "Cálculo de IMC confiável",
          "Taxa metabólica basal (TMB)",
          "Percentual de gordura corporal estimado",
          "Classificação por idade e sexo",
          "Análise de composição corporal",
          "Gasto calórico diário",
          "Faixas ideais personalizadas",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Análise de risco à saúde",
          "Recomendações personalizadas",
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
            name: "O que é IMC?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "IMC (Índice de Massa Corporal) é um indicador que relaciona peso e altura para avaliar se uma pessoa está dentro do peso ideal. É calculado dividindo o peso pela altura ao quadrado (kg/m²).",
            },
          },
          {
            "@type": "Question",
            name: "Qual é o IMC ideal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O IMC ideal varia por idade. Para adultos: 18,5-24,9 (peso normal). Idosos (65+): 22-27 é considerado mais saudável. Crianças e adolescentes usam percentis específicos por idade e sexo.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular IMC em casa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Divida seu peso (kg) pela altura ao quadrado (m²). Exemplo: 70kg ÷ (1,75m)² = 22,9. Use nossa calculadora online gratuita que também calcula taxa metabólica e percentual de gordura estimado.",
            },
          },
          {
            "@type": "Question",
            name: "O que é taxa metabólica basal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Taxa Metabólica Basal (TMB) é a quantidade mínima de energia que o corpo confiável para manter funções vitais em repouso. Varia conforme idade, sexo, peso e altura, sendo fundamental para planejamento nutricional.",
            },
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de IMC com Taxa Metabólica",
        description:
          "Aprenda a calcular seu IMC, taxa metabólica basal e percentual de gordura de forma confiável usando nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Insira seus dados pessoais",
            text: "Digite sua idade, peso, altura e selecione seu sexo. Essas informações são necessárias para cálculos confiáveis de IMC e metabolismo.",
          },
          {
            "@type": "HowToStep",
            name: "Analise seu IMC",
            text: "Visualize sua classificação de IMC personalizada por idade, com faixas ideais ajustadas para diferentes grupos etários.",
          },
          {
            "@type": "HowToStep",
            name: "Veja sua taxa metabólica",
            text: "Conheça sua Taxa Metabólica Basal (TMB) e gasto calórico diário, fundamentais para planejamento nutricional.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados completos",
            text: "Veja percentual de gordura estimado, classificação de saúde, recomendações personalizadas e comparação com valores ideais.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de IMC com Taxa Metabólica Online",
          },
        ],
      },
    },
    // Adicionar WebPage Schema separado para melhor estruturação
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/imc",
        name: "Calculadora de IMC com Taxa Metabólica - Análise Corporal Completa",
        description:
          "Ferramenta gratuita para calcular IMC, taxa metabólica basal e percentual de gordura corporal com classificação personalizada por idade e sexo.",
        inLanguage: "pt-BR",
        dateModified: "2024-12-31",
        lastReviewed: "2024-12-31",
        isPartOf: {
          "@type": "WebSite",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        about: [
          {
            "@type": "Thing",
            name: "IMC",
            description: "Índice de Massa Corporal para avaliação de peso",
          },
          {
            "@type": "Thing",
            name: "Taxa Metabólica",
            description: "Cálculo do metabolismo basal e gasto calórico",
          },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Pessoas interessadas em saúde e fitness",
        },
      },
    },
  ];
};

interface BMIResult {
  inputs: {
    age: number;
    weight: number;
    height: number;
    gender: "masculino" | "feminino";
  };
  calculations: {
    bmi: number;
    basalMetabolicRate: number;
    dailyCalorieNeeds: number;
    estimatedBodyFat: number;
  };
  classification: {
    bmiStatus: string;
    bmiCategory: string;
    healthRisk: "baixo" | "normal" | "moderado" | "alto";
    ageAdjustedStatus: string;
  };
}

interface ValidationErrors {
  age?: string;
  weight?: string;
  height?: string;
  gender?: string;
}

export default function BMICalculator() {
  // Inputs para IMC
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"masculino" | "feminino" | "">("");

  const [result, setResult] = useState<BMIResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "imc",
    category: "saude",
  });
  useFormTracking("imc");

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

    const ageNum = parseNumber(age);
    const weightNum = parseNumber(weight);
    const heightNum = parseNumber(height);

    if (!age || ageNum < 2 || ageNum > 120) {
      newErrors.age = "Idade deve estar entre 2 e 120 anos";
      ok = false;
    }

    if (!weight || weightNum < 10 || weightNum > 500) {
      newErrors.weight = "Peso deve estar entre 10 e 500 kg";
      ok = false;
    }

    if (!height || heightNum < 50 || heightNum > 250) {
      newErrors.height = "Altura deve estar entre 50 e 250 cm";
      ok = false;
    }

    if (!gender) {
      newErrors.gender = "Selecione o sexo";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateBMI = (): BMIResult => {
    const ageNum = parseNumber(age);
    const weightNum = parseNumber(weight);
    const heightNum = parseNumber(height);
    const isMale = gender === "masculino";

    // Calculate BMI
    const heightM = heightNum / 100;
    const bmi = weightNum / (heightM * heightM);

    // Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
    let basalMetabolicRate: number;
    if (isMale) {
      basalMetabolicRate = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      basalMetabolicRate = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Calculate daily calorie needs (BMR * activity factor - using sedentary 1.2)
    const dailyCalorieNeeds = basalMetabolicRate * 1.2;

    // Estimate body fat percentage based on BMI, age, and gender (Deurenberg et al. formula)
    let estimatedBodyFat: number;
    if (ageNum >= 16) {
      estimatedBodyFat = 1.2 * bmi + 0.23 * ageNum - (isMale ? 16.2 : 5.4);
    } else {
      // For children/adolescents, use a simplified estimation
      estimatedBodyFat = isMale ? bmi * 0.8 - 2 : bmi * 0.9;
    }

    // Ensure reasonable bounds for body fat
    estimatedBodyFat = Math.max(isMale ? 3 : 10, Math.min(isMale ? 40 : 50, estimatedBodyFat));

    // Get classifications
    const bmiStatus = getBMIStatus(bmi, ageNum);
    const bmiCategory = getBMICategory(bmi);
    const ageAdjustedStatus = getAgeAdjustedBMIStatus(bmi, ageNum);
    const healthRisk = getHealthRisk(bmi, ageNum, estimatedBodyFat, isMale);

    return {
      inputs: {
        age: ageNum,
        weight: weightNum,
        height: heightNum,
        gender: gender as "masculino" | "feminino",
      },
      calculations: {
        bmi,
        basalMetabolicRate,
        dailyCalorieNeeds,
        estimatedBodyFat,
      },
      classification: {
        bmiStatus,
        bmiCategory,
        ageAdjustedStatus,
        healthRisk,
      },
    };
  };

  const getBMIStatus = (bmi: number, age: number): string => {
    // Classificação padrão da OMS para adultos
    if (age >= 18 && age < 65) {
      if (bmi < 18.5) return "Abaixo do peso";
      if (bmi < 25) return "Peso normal";
      if (bmi < 30) return "Sobrepeso";
      if (bmi < 35) return "Obesidade grau I";
      if (bmi < 40) return "Obesidade grau II";
      return "Obesidade grau III (mórbida)";
    }

    // Ajuste para idosos (65+)
    if (age >= 65) {
      if (bmi < 22) return "Abaixo do peso";
      if (bmi < 27) return "Peso normal";
      if (bmi < 32) return "Sobrepeso";
      if (bmi < 37) return "Obesidade grau I";
      return "Obesidade grau II+";
    }

    // Para crianças e adolescentes (2-17 anos) - classificação simplificada
    if (age < 18) {
      if (bmi < 15) return "Muito abaixo do peso";
      if (bmi < 18.5) return "Abaixo do peso";
      if (bmi < 25) return "Peso normal";
      if (bmi < 30) return "Sobrepeso";
      return "Obesidade";
    }

    return "Peso normal";
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Baixo peso";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Sobrepeso";
    return "Obesidade";
  };

  const getAgeAdjustedBMIStatus = (bmi: number, age: number): string => {
    if (age >= 18 && age <= 24) {
      if (bmi >= 19 && bmi <= 24) return "Ideal para jovens adultos";
    } else if (age >= 25 && age <= 34) {
      if (bmi >= 20 && bmi <= 25) return "Ideal para adultos";
    } else if (age >= 35 && age <= 44) {
      if (bmi >= 21 && bmi <= 26) return "Ideal para adultos de meia-idade";
    } else if (age >= 45 && age <= 54) {
      if (bmi >= 22 && bmi <= 27) return "Ideal para adultos maduros";
    } else if (age >= 55 && age <= 64) {
      if (bmi >= 23 && bmi <= 28) return "Ideal para adultos mais velhos";
    } else if (age >= 65) {
      if (bmi >= 24 && bmi <= 29) return "Ideal para idosos";
    }
    return "Fora da faixa ideal para sua idade";
  };

  const getHealthRisk = (
    bmi: number,
    age: number,
    estimatedBodyFat: number,
    isMale: boolean
  ): "baixo" | "normal" | "moderado" | "alto" => {
    let riskLevel: "baixo" | "normal" | "moderado" | "alto" = "normal";

    // Risco baseado no IMC
    if (bmi < 18.5 || bmi >= 35) {
      riskLevel = "alto";
    } else if (bmi >= 30 || bmi < 20) {
      riskLevel = "moderado";
    } else if (bmi >= 25 || bmi < 22) {
      riskLevel = "baixo";
    }

    // Ajuste para idosos (IMC mais alto é mais aceitável)
    if (age >= 65) {
      if (bmi >= 22 && bmi <= 27) {
        riskLevel = "normal";
      }
    }

    // Consideração do percentual de gordura corporal
    const highBodyFatThreshold = isMale ? 25 : 32;
    if (estimatedBodyFat > highBodyFatThreshold) {
      if (riskLevel === "normal") riskLevel = "baixo";
      else if (riskLevel === "baixo") riskLevel = "moderado";
    }

    return riskLevel;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation();
    try {
      const result = calculateBMI();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch {
      setErrors({ age: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("");
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
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>IMC</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de IMC 2026 com Taxa Metabólica
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule <strong className="text-health-red">IMC, taxa metabólica basal</strong> e
          percentual de gordura estimado. Análise completa por{" "}
          <strong className="text-primary-blue-dark">idade e sexo</strong> para sua saúde.
        </p>
        <div className="bg-health-red-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📏 <strong>Índice de Massa Corporal</strong> • 🔥 <strong>Taxa Metabólica</strong> • 📊{" "}
            <strong>Análise Personalizada</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📏 Calculadora de IMC com Taxa Metabólica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">
              Insira seus dados para cálculo completo de IMC e metabolismo:
            </p>
          </div>

          {/* Dados pessoais */}
          <div className="mb-6 space-y-6">
            <div className="bg-health-red-soft rounded-lg border border-health-red/20 p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-health-red">
                📋 Dados Pessoais
              </h3>

              {/* Seleção de Sexo - Centralizada */}
              <div className="mb-6 flex justify-center">
                <div className="w-full max-w-md">
                  <div className="mb-2 text-center">
                    <label className="block text-sm font-medium text-text-primary">Sexo</label>
                  </div>
                  <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                    <button
                      type="button"
                      onClick={() => setGender("masculino")}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        gender === "masculino"
                          ? "bg-primary-blue text-white"
                          : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                      }`}
                    >
                      👨 Masculino
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("feminino")}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        gender === "feminino"
                          ? "bg-primary-blue text-white"
                          : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                      }`}
                    >
                      👩 Feminino
                    </button>
                  </div>
                  <ErrorMessage error={errors.gender} />
                  <div className="mt-1 text-center text-xs text-text-secondary">
                    Necessário para cálculo
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Input
                    type="number"
                    label="Idade (anos)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="2"
                    max="120"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.age} />
                  <div className="mt-1 text-xs text-text-secondary">2 a 120 anos</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Peso (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="10"
                    max="500"
                    step="0.1"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.weight} />
                  <div className="mt-1 text-xs text-text-secondary">Peso atual</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Altura (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    min="50"
                    max="250"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.height} />
                  <div className="mt-1 text-xs text-text-secondary">Altura em cm</div>
                </div>
              </div>
            </div>

            {/* Informações sobre o cálculo */}
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
                📊 Informações do Cálculo
              </h3>
              <div className="text-center text-sm text-text-secondary">
                <p className="mb-2">
                  <strong>IMC:</strong> Índice de Massa Corporal calculado facilmente
                </p>
                <p className="mb-2">
                  <strong>Taxa Metabólica:</strong> Cálculo usando equação de Mifflin-St Jeor
                </p>
                <p>
                  <strong>Gordura Estimada:</strong> Estimativa baseada em idade, sexo e IMC
                </p>
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
              📊 Resultado do Cálculo de IMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="mb-2 text-sm text-text-secondary">IMC</div>
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {result.calculations.bmi.toFixed(1)}
                </div>
                <div className="text-xs text-text-secondary">kg/m²</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="mb-2 text-sm text-text-secondary">Taxa Metabólica</div>
                <div className="text-2xl font-bold text-system-warning">
                  {Math.round(result.calculations.basalMetabolicRate)}
                </div>
                <div className="text-xs text-text-secondary">kcal/dia</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="mb-2 text-sm text-text-secondary">Gordura Estimada</div>
                <div className="text-2xl font-bold text-health-red">
                  {result.calculations.estimatedBodyFat.toFixed(1)}%
                </div>
                <div className="text-xs text-text-secondary">estimativa</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">
                  Gasto Calórico Diário (Sedentário)
                </div>
                <div className="text-xl font-bold text-growth-green">
                  {Math.round(result.calculations.dailyCalorieNeeds)} kcal
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  Baseado na Taxa Metabólica Basal
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Classificação</h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>IMC:</strong> {result.classification.bmiStatus}
                </div>
                <div>
                  <strong>Categoria:</strong> {result.classification.bmiCategory}
                </div>
                <div>
                  <strong>Para sua idade:</strong> {result.classification.ageAdjustedStatus}
                </div>
                <div>
                  <strong>Risco à Saúde:</strong>{" "}
                  {result.classification.healthRisk === "baixo"
                    ? "Baixo"
                    : result.classification.healthRisk === "normal"
                      ? "Normal"
                      : result.classification.healthRisk === "moderado"
                        ? "Moderado"
                        : "Alto"}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-900 p-4">
              <h4 className="mb-3 font-semibold text-growth-green">Interpretação dos Resultados</h4>
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Seu IMC de {result.calculations.bmi.toFixed(1)} kg/m² indica{" "}
                  {result.classification.bmiCategory.toLowerCase()}
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Taxa metabólica basal: {Math.round(result.calculations.basalMetabolicRate)}{" "}
                  kcal/dia
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Percentual de gordura estimado: {result.calculations.estimatedBodyFat.toFixed(1)}%
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Classificação considerando sua idade ({result.inputs.age} anos)
                </div>
              </div>
            </div>

            {/* Comparativo com Faixas Ideais */}
            <div className="rounded-lg border border-growth-green/30 bg-growth-green-soft p-4">
              <h4 className="mb-3 font-semibold text-growth-green">🎯 Faixas Ideais de IMC</h4>

              {(() => {
                const age = result.inputs.age;
                const currentBMI = result.calculations.bmi;

                // Faixas ideais por idade
                let healthyRange;
                if (age >= 18 && age <= 24) {
                  healthyRange = { min: 19, max: 24, ideal: 21.5 };
                } else if (age >= 25 && age <= 34) {
                  healthyRange = { min: 20, max: 25, ideal: 22.5 };
                } else if (age >= 35 && age <= 44) {
                  healthyRange = { min: 21, max: 26, ideal: 23.5 };
                } else if (age >= 45 && age <= 54) {
                  healthyRange = { min: 22, max: 27, ideal: 24.5 };
                } else if (age >= 55 && age <= 64) {
                  healthyRange = { min: 23, max: 28, ideal: 25.5 };
                } else if (age >= 65) {
                  healthyRange = { min: 24, max: 29, ideal: 26.5 };
                } else {
                  // Crianças/adolescentes - valores mais genéricos
                  healthyRange = { min: 18.5, max: 24.9, ideal: 21.7 };
                }

                const difference = currentBMI - healthyRange.ideal;
                const diffText =
                  difference > 0 ? `+${difference.toFixed(1)}` : `${difference.toFixed(1)}`;
                const diffColor =
                  Math.abs(difference) <= 1
                    ? "text-growth-green"
                    : difference > 0
                      ? "text-system-warning"
                      : "text-system-info";

                return (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gray-900 p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-growth-green">
                          {healthyRange.ideal} kg/m²
                        </div>
                        <div className="text-sm text-text-secondary">Ideal para sua idade</div>
                        <div className="mt-1 text-xs text-text-secondary">
                          Faixa saudável: {healthyRange.min} - {healthyRange.max}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${diffColor}`}>{diffText}</div>
                        <div className="text-sm text-text-secondary">Diferença do ideal</div>
                        <div className="mt-1 text-xs text-text-secondary">
                          {Math.abs(difference) <= 1
                            ? "Dentro da faixa ideal"
                            : difference > 0
                              ? "Acima do recomendado"
                              : "Abaixo do recomendado"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Gordura Corporal - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📏 IMC e Taxa Metabólica – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Gordura Corporal */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📏 Índice de Massa Corporal
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O IMC é um indicador que relaciona peso e altura para avaliar se uma pessoa está
                    dentro do peso ideal. É calculado dividindo o peso (kg) pela altura ao quadrado
                    (m²).
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">🔥 Taxa Metabólica</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• TMB: Energia mínima para funções vitais</li>
                    <li>• Varia por idade, sexo, peso e altura</li>
                    <li>• Base para planejamento nutricional</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Importância</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Avaliação rápida do peso corporal</li>
                    <li>• Triagem de riscos à saúde</li>
                    <li>• Cálculo de necessidades calóricas</li>
                    <li>• Monitoramento de peso</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Características</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Classificação ajustada por idade</li>
                    <li>• Considera diferenças entre sexos</li>
                    <li>• Fácil cálculo e interpretação</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Valores de Referência */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📏 Faixas de IMC por Idade
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    👨👩 Adultos (18-64 anos)
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Baixo peso: &lt; 18,5 kg/m²</li>
                    <li>• Normal: 18,5-24,9 kg/m²</li>
                    <li>• Sobrepeso: 25-29,9 kg/m²</li>
                    <li>• Obesidade I: 30-34,9 kg/m²</li>
                    <li>• Obesidade II: 35-39,9 kg/m²</li>
                    <li>• Obesidade III: ≥ 40 kg/m²</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">
                    🎯 Faixas Ideais por Idade
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 18-24 anos: 19-24 kg/m²</li>
                    <li>• 25-34 anos: 20-25 kg/m²</li>
                    <li>• 35-44 anos: 21-26 kg/m²</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🧓 Idosos (65+ anos)</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Baixo peso: &lt; 22 kg/m²</li>
                    <li>• Normal: 22-27 kg/m²</li>
                    <li>• Sobrepeso: 27-32 kg/m²</li>
                    <li>• Obesidade: ≥ 32 kg/m²</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🎯 Faixas Maduras</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 45-54 anos: 22-27 kg/m²</li>
                    <li>• 55-64 anos: 23-28 kg/m²</li>
                    <li>• 65+ anos: 24-29 kg/m²</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Como Calcular IMC */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🔍 Como Calcular IMC
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📝 Dados Necessários</h4>
                  <ol className="mb-4 space-y-2 text-sm text-text-secondary">
                    <li>
                      1. <strong>Peso:</strong> Em quilogramas (kg)
                    </li>
                    <li>
                      2. <strong>Altura:</strong> Em centímetros (cm)
                    </li>
                    <li>
                      3. <strong>Idade:</strong> Para classificação ajustada
                    </li>
                    <li>
                      4. <strong>Sexo:</strong> Para cálculo de taxa metabólica
                    </li>
                  </ol>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🧮 Fórmula</h4>
                  <div className="rounded-lg bg-primary-blue-light p-3 text-sm">
                    <strong>IMC = Peso (kg) ÷ Altura (m)²</strong>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Dicas para Medição</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Pese-se pela manhã, em jejum</li>
                    <li>• Use balança calibrada</li>
                    <li>• Meça altura sem sapatos</li>
                    <li>• Mantenha postura ereta</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Considerações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• IMC não diferencia músculo e gordura</li>
                    <li>• Atletas podem ter IMC elevado</li>
                    <li>• Idosos têm faixas diferentes</li>
                    <li>• Crianças usam percentis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de IMC"
        items={[
          {
            question: "O que é IMC?",
            answer:
              "IMC (Índice de Massa Corporal) é um indicador que relaciona peso e altura para avaliar se uma pessoa está dentro do peso ideal. É calculado dividindo o peso pela altura ao quadrado (kg/m²).",
            borderColor: "primary-blue",
          },
          {
            question: "Qual é o IMC ideal?",
            answer:
              "O IMC ideal varia por idade. Para adultos: 18,5-24,9 (peso normal). Idosos (65+): 22-27 é considerado mais saudável. Crianças e adolescentes usam percentis específicos por idade e sexo.",
            borderColor: "growth-green",
          },
          {
            question: "Como calcular IMC em casa?",
            answer:
              "Divida seu peso (kg) pela altura ao quadrado (m²). Exemplo: 70kg ÷ (1,75m)² = 22,9. Use nossa calculadora online gratuita que também calcula taxa metabólica e percentual de gordura estimado.",
            borderColor: "system-info",
          },
          {
            question: "O que é taxa metabólica basal?",
            answer:
              "Taxa Metabólica Basal (TMB) é a quantidade mínima de energia que o corpo confiável para manter funções vitais em repouso. Varia conforme idade, sexo, peso e altura, sendo fundamental para planejamento nutricional.",
            borderColor: "system-warning",
          },
          {
            question: "Como interpretar o resultado do IMC?",
            answer:
              "Analise sua classificação (baixo peso, normal, sobrepeso, obesidade) e compare com as faixas ideais para sua idade. Considere também a taxa metabólica e percentual de gordura estimado para uma análise completa.",
            borderColor: "growth-green",
          },
          {
            question: "IMC é confiável para todas as idades?",
            answer:
              "O IMC é mais confiável para adultos (18-65 anos). Para idosos, faixas mais altas são aceitáveis. Para crianças e adolescentes, é preferível usar percentis específicos por idade e sexo.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre IMC",
          content:
            "<strong>Para melhores resultados:</strong> pese-se sempre no mesmo horário, preferencialmente pela manhã em jejum, e use balança calibrada. Meça altura sem sapatos.",
        }}
        footerText="<strong>Lembre-se:</strong> O IMC é uma ferramenta de triagem. Para análise completa da saúde, considere também composição corporal e consulte profissionais qualificados."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de IMC</strong> permite
              calcular <strong className="text-growth-green">IMC, taxa metabólica basal</strong> e
              percentual de gordura estimado com classificação personalizada por idade e sexo.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Cálculo de IMC confiável, taxa metabólica (TMB),
              gasto calórico diário, percentual de gordura estimado, classificação por faixa etária
              e análise de risco à saúde.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins informativos e acompanhamento pessoal. Para avaliações médicas ou nutricionais
              profissionais, consulte sempre um <strong>profissional de saúde qualificado</strong>.
              Explore também nossas calculadoras de
              <a
                href="/calculadoras/saude/hidratacao"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                Hidratação
              </a>
              para complementar sua análise de saúde.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco em saúde • 📏 IMC e Taxa Metabólica • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="imc" />
    </div>
  );
}
