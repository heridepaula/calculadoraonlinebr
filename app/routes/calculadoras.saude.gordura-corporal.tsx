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
    ...buildCalculatorMeta("gordura-corporal"),
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
            name: "Gordura Corporal",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/gordura-corporal",
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Gordura Corporal Online 2026",
        description:
          "Ferramenta gratuita para calcular percentual de gordura corporal, massa magra e composição corporal. Métodos científicos US Navy e Jackson-Pollock com análise personalizada.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/gordura-corporal",
        applicationCategory: "HealthApplication",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/gordura-corporal",
          name: "Calculadora de Gordura Corporal - Análise de Composição Corporal",
          description:
            "Ferramenta gratuita para calcular percentual de gordura corporal, massa magra e composição corporal usando métodos científicos US Navy e Jackson-Pollock.",
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
          name: "Gordura Corporal",
          description:
            "Percentual de tecido adiposo no corpo humano, indicador importante de saúde e composição corporal",
          category: "Health",
        },
        featureList: [
          "Cálculo de percentual de gordura corporal",
          "Método US Navy científico",
          "Método Jackson-Pollock",
          "Análise de composição corporal",
          "Cálculo de massa magra e gordura",
          "Comparativo com pessoa saudável",
          "Classificação por idade e gênero",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Análise de risco à saúde",
          "Validação científica",
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
            name: "O que é gordura corporal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Gordura corporal é o percentual de tecido adiposo em relação ao peso total do corpo. É um indicador mais confiável de saúde que apenas o peso ou IMC, pois diferencia massa magra de massa gorda.",
            },
          },
          {
            "@type": "Question",
            name: "Qual é o percentual de gordura corporal ideal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O percentual ideal varia por idade e gênero. Para homens: 8-24% (dependendo da idade). Para mulheres: 16-31%. Atletas podem ter valores menores, enquanto níveis acima de 25% (homens) ou 32% (mulheres) indicam obesidade.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular gordura corporal em casa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use fita métrica para medir pescoço, cintura e quadril (mulheres). Aplique o método US Navy ou use nossa calculadora online gratuita que faz os cálculos automaticamente com base nas suas medidas.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre método US Navy e Jackson-Pollock?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O método US Navy usa circunferências corporais (pescoço, cintura, quadril) e é mais acessível. O Jackson-Pollock tradicionalmente usa dobras cutâneas com adipômetro, mas nossa versão simplificada usa medidas corporais para maior praticidade.",
            },
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Gordura Corporal",
        description:
          "Aprenda a calcular seu percentual de gordura corporal de forma confiável com métodos científicos usando nossa calculadora online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Selecione o método",
            text: "Escolha entre método US Navy (mais acessível) ou Jackson-Pollock (simplificado), dependendo da sua preferência e disponibilidade de medidas.",
          },
          {
            "@type": "HowToStep",
            name: "Insira seus dados pessoais",
            text: "Digite sua idade, peso, altura e selecione seu gênero. Essas informações são necessárias para cálculos confiáveis de composição corporal.",
          },
          {
            "@type": "HowToStep",
            name: "Faça as medidas corporais",
            text: "Use fita métrica para medir circunferência do pescoço, cintura e quadril (se mulher). Siga as instruções de como medir corretamente.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja seu percentual de gordura, massa magra, massa gorda, classificação de saúde e comparação com valores ideais para sua idade e gênero.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Gordura Corporal Online",
          },
        ],
      },
    },
    // Adicionar WebPage Schema separado para melhor estruturação
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/gordura-corporal",
        name: "Calculadora de Gordura Corporal - Análise de Composição Corporal",
        description:
          "Ferramenta gratuita para calcular percentual de gordura corporal, massa magra e composição corporal usando métodos científicos US Navy e Jackson-Pollock.",
        inLanguage: "pt-BR",
        dateModified: "2025-08-30",
        lastReviewed: "2025-08-30",
        isPartOf: {
          "@type": "WebSite",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        about: [
          {
            "@type": "Thing",
            name: "Gordura Corporal",
            description: "Percentual de tecido adiposo no corpo humano",
          },
          {
            "@type": "Thing",
            name: "Composição Corporal",
            description: "Análise da distribuição de massa magra e gorda",
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

interface BodyFatResult {
  inputs: {
    age: number;
    weight: number;
    height: number;
    gender: "masculino" | "feminino";
    neck: number;
    waist: number;
    hip?: number; // Only for females
  };
  calculations: {
    bodyFatPercentage: number;
    leanMass: number;
    fatMass: number;
    bmi: number;
  };
  classification: {
    bodyFatStatus: string;
    bmiStatus: string;
    healthRisk: "baixo" | "normal" | "moderado" | "alto";
  };
  method: "us-navy" | "jackson-pollock";
}

interface ValidationErrors {
  age?: string;
  weight?: string;
  height?: string;
  gender?: string;
  neck?: string;
  waist?: string;
  hip?: string;
}

export default function BodyFatCalculator() {
  // Inputs para gordura corporal
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"masculino" | "feminino" | "">("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [method, setMethod] = useState<"us-navy" | "jackson-pollock">("us-navy");

  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "gordura-corporal",
    category: "saude",
  });
  useFormTracking("gordura-corporal");

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
    const neckNum = parseNumber(neck);
    const waistNum = parseNumber(waist);
    const hipNum = parseNumber(hip);

    if (!age || ageNum < 18 || ageNum > 80) {
      newErrors.age = "Idade deve estar entre 18 e 80 anos";
      ok = false;
    }

    if (!weight || weightNum < 30 || weightNum > 300) {
      newErrors.weight = "Peso deve estar entre 30 e 300 kg";
      ok = false;
    }

    if (!height || heightNum < 120 || heightNum > 220) {
      newErrors.height = "Altura deve estar entre 120 e 220 cm";
      ok = false;
    }

    if (!gender) {
      newErrors.gender = "Selecione o sexo";
      ok = false;
    }

    if (!neck || neckNum < 20 || neckNum > 50) {
      newErrors.neck = "Circunferência do pescoço deve estar entre 20 e 50 cm";
      ok = false;
    }

    if (!waist || waistNum < 50 || waistNum > 150) {
      newErrors.waist = "Circunferência da cintura deve estar entre 50 e 150 cm";
      ok = false;
    }

    if (gender === "feminino" && (!hip || hipNum < 70 || hipNum > 180)) {
      newErrors.hip = "Circunferência do quadril deve estar entre 70 e 180 cm";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateBodyFat = (): BodyFatResult => {
    const ageNum = parseNumber(age);
    const weightNum = parseNumber(weight);
    const heightNum = parseNumber(height);
    const neckNum = parseNumber(neck);
    const waistNum = parseNumber(waist);
    const hipNum = parseNumber(hip);
    const isMale = gender === "masculino";

    // Calculate BMI
    const heightM = heightNum / 100;
    const bmi = weightNum / (heightM * heightM);

    // Calculate body fat percentage using US Navy method
    let bodyFatPercentage: number;

    if (method === "us-navy") {
      if (isMale) {
        // Male formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        const log1 = Math.log10(waistNum - neckNum);
        const log2 = Math.log10(heightNum);
        bodyFatPercentage = 495 / (1.0324 - 0.19077 * log1 + 0.15456 * log2) - 450;
      } else {
        // Female formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
        const log1 = Math.log10(waistNum + hipNum - neckNum);
        const log2 = Math.log10(heightNum);
        bodyFatPercentage = 495 / (1.29579 - 0.35004 * log1 + 0.221 * log2) - 450;
      }
    } else {
      // Jackson-Pollock method (simplified 3-point)
      if (isMale) {
        // Simplified male formula based on waist, chest approximation
        bodyFatPercentage = 0.31457 * waistNum - 0.10969 * neckNum + 10.834;
      } else {
        // Simplified female formula
        bodyFatPercentage = 0.41563 * waistNum - 0.18086 * hipNum + 0.07594 * ageNum + 15.707;
      }
    }

    // Ensure reasonable bounds
    bodyFatPercentage = Math.max(3, Math.min(50, bodyFatPercentage));

    // Calculate fat mass and lean mass
    const fatMass = (bodyFatPercentage / 100) * weightNum;
    const leanMass = weightNum - fatMass;

    // Get classifications
    const bodyFatStatus = getBodyFatStatus(bodyFatPercentage, isMale);
    const bmiStatus = getBMIStatus(bmi);
    const healthRisk = getHealthRisk(bodyFatPercentage, bmi, isMale);

    return {
      inputs: {
        age: ageNum,
        weight: weightNum,
        height: heightNum,
        gender: gender as "masculino" | "feminino",
        neck: neckNum,
        waist: waistNum,
        hip: hipNum,
      },
      calculations: {
        bodyFatPercentage,
        leanMass,
        fatMass,
        bmi,
      },
      classification: {
        bodyFatStatus,
        bmiStatus,
        healthRisk,
      },
      method,
    };
  };

  const getBodyFatStatus = (percentage: number, isMale: boolean): string => {
    if (isMale) {
      if (percentage < 6) return "Muito baixo";
      if (percentage < 14) return "Atlético";
      if (percentage < 18) return "Excelente";
      if (percentage < 25) return "Bom";
      return "Acima do ideal";
    } else {
      if (percentage < 16) return "Muito baixo";
      if (percentage < 20) return "Atlético";
      if (percentage < 25) return "Excelente";
      if (percentage < 32) return "Bom";
      return "Acima do ideal";
    }
  };

  const getBMIStatus = (bmi: number): string => {
    if (bmi < 18.5) return "Abaixo do peso";
    if (bmi < 25) return "Peso normal";
    if (bmi < 30) return "Sobrepeso";
    return "Obesidade";
  };

  const getHealthRisk = (
    bodyFat: number,
    bmi: number,
    isMale: boolean
  ): "baixo" | "normal" | "moderado" | "alto" => {
    const fatLimit = isMale ? 25 : 32;

    if (bodyFat > fatLimit && bmi > 30) return "alto";
    if (bodyFat > fatLimit || bmi > 27) return "moderado";
    if (bodyFat < (isMale ? 6 : 16) || bmi < 18.5) return "moderado";
    return "normal";
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const result = calculateBodyFat();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ age: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("");
    setNeck("");
    setWaist("");
    setHip("");
    setMethod("us-navy");
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
        <BreadcrumbItem isLast>Gordura Corporal</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Gordura Corporal 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule <strong className="text-health-red">percentual de gordura corporal</strong> com
          qualidade científica. Análise completa de{" "}
          <strong className="text-primary-blue-dark">composição corporal</strong> para sua saúde.
        </p>
        <div className="bg-health-red-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🏃‍♂️ <strong>Método US Navy</strong> • 📊 <strong>Análise Corporal</strong> • 💪{" "}
            <strong>Massa Magra</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">💪 Calculadora de Gordura Corporal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">Selecione o método e insira suas medidas:</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setMethod("us-navy")}
                className={`rounded-lg px-6 py-3 text-lg font-medium transition-all ${
                  method === "us-navy"
                    ? "border-2 border-primary-blue-dark bg-primary-blue text-text-primary"
                    : "border border-neutral-surface-variant bg-gray-900 text-text-secondary hover:bg-gray-800"
                }`}
              >
                🏅 Método US Navy
              </button>
              <button
                type="button"
                onClick={() => setMethod("jackson-pollock")}
                className={`rounded-lg px-6 py-3 text-lg font-medium transition-all ${
                  method === "jackson-pollock"
                    ? "border-2 border-primary-blue-dark bg-primary-blue text-text-primary"
                    : "border border-neutral-surface-variant bg-gray-900 text-text-secondary hover:bg-gray-800"
                }`}
              >
                📐 Jackson-Pollock
              </button>
            </div>
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
                    min="18"
                    max="80"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.age} />
                  <div className="mt-1 text-xs text-text-secondary">18 a 80 anos</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Peso (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="30"
                    max="300"
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
                    min="120"
                    max="220"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.height} />
                  <div className="mt-1 text-xs text-text-secondary">Altura em cm</div>
                </div>
              </div>
            </div>

            {/* Medidas corporais */}
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
                📏 Medidas Corporais (Circunferências)
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Input
                    type="number"
                    label="Pescoço (cm)"
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                    placeholder="35"
                    min="20"
                    max="50"
                    step="0.1"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.neck} />
                  <div className="mt-1 text-xs text-text-secondary">Circunferência do pescoço</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Cintura (cm)"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    placeholder="80"
                    min="50"
                    max="150"
                    step="0.1"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.waist} />
                  <div className="mt-1 text-xs text-text-secondary">Circunferência da cintura</div>
                </div>

                {gender === "feminino" && (
                  <div>
                    <Input
                      type="number"
                      label="Quadril (cm)"
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                      placeholder="95"
                      min="70"
                      max="180"
                      step="0.1"
                      fullWidth
                      className="h-12 text-lg"
                    />
                    <ErrorMessage error={errors.hip} />
                    <div className="mt-1 text-xs text-text-secondary">
                      Circunferência do quadril
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-lg bg-system-info/10 p-3">
                <h4 className="mb-2 text-sm font-semibold text-system-info">
                  📏 Como medir corretamente:
                </h4>
                <ul className="space-y-1 text-xs text-text-secondary">
                  <li>
                    <strong>Pescoço:</strong> Logo abaixo do pomo de Adão (homens) ou na parte mais
                    fina (mulheres)
                  </li>
                  <li>
                    <strong>Cintura:</strong> Na altura do umbigo, sem contrair a barriga
                  </li>
                  {gender === "feminino" && (
                    <li>
                      <strong>Quadril:</strong> Na parte mais larga dos quadris
                    </li>
                  )}
                </ul>
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
              📊 Resultado da Análise Corporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Percentual de Gordura</div>
                <div className="text-xl font-bold text-primary-blue-dark">
                  {result.calculations.bodyFatPercentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-system-warning">
                  {result.calculations.fatMass.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">Massa de Gordura</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-lg font-bold text-growth-green">
                  {result.calculations.leanMass.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">Massa Magra</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Informações da Análise</h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>Método:</strong>{" "}
                  {result.method === "us-navy" ? "Método US Navy" : "Método Jackson-Pollock"}
                </div>
                <div>
                  <strong>IMC:</strong> {result.calculations.bmi.toFixed(1)} kg/m²
                </div>
                <div>
                  <strong>Status:</strong> {result.classification.bodyFatStatus}
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
                  Seu percentual de gordura corporal é{" "}
                  {result.classification.bodyFatStatus.toLowerCase()}
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  IMC de {result.calculations.bmi.toFixed(1)} kg/m² indica{" "}
                  {result.classification.bmiStatus.toLowerCase()}
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Método {result.method === "us-navy" ? "US Navy" : "Jackson-Pollock"} utilizado
                  para melhor resultado
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Risco à saúde classificado como{" "}
                  {result.classification.healthRisk === "baixo"
                    ? "baixo"
                    : result.classification.healthRisk === "normal"
                      ? "normal"
                      : result.classification.healthRisk === "moderado"
                        ? "moderado"
                        : "alto"}
                </div>
              </div>
            </div>

            {/* Comparativo com Pessoa Saudável */}
            <div className="rounded-lg border border-growth-green/30 bg-growth-green-soft p-4">
              <h4 className="mb-3 font-semibold text-growth-green">
                🎯 Comparativo com Pessoa Saudável
              </h4>

              {(() => {
                const isMale = result.inputs.gender === "masculino";
                const age = result.inputs.age;

                // Faixas saudáveis por idade e gênero
                let healthyRange;
                if (isMale) {
                  if (age <= 30) healthyRange = { min: 8, max: 15, ideal: 12 };
                  else if (age <= 40) healthyRange = { min: 10, max: 17, ideal: 14 };
                  else if (age <= 50) healthyRange = { min: 12, max: 19, ideal: 16 };
                  else healthyRange = { min: 14, max: 21, ideal: 18 };
                } else {
                  if (age <= 30) healthyRange = { min: 16, max: 24, ideal: 20 };
                  else if (age <= 40) healthyRange = { min: 18, max: 26, ideal: 22 };
                  else if (age <= 50) healthyRange = { min: 20, max: 28, ideal: 24 };
                  else healthyRange = { min: 22, max: 30, ideal: 26 };
                }

                const currentBF = result.calculations.bodyFatPercentage;
                const difference = currentBF - healthyRange.ideal;
                const diffText =
                  difference > 0
                    ? `${difference.toFixed(1)}% acima`
                    : `${Math.abs(difference).toFixed(1)}% abaixo`;
                const diffColor =
                  Math.abs(difference) <= 2
                    ? "text-growth-green"
                    : difference > 0
                      ? "text-system-warning"
                      : "text-system-info";

                return (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-gray-900 p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-growth-green">
                          {healthyRange.ideal}%
                        </div>
                        <div className="text-sm text-text-secondary">Ideal para sua idade</div>
                        <div className="mt-1 text-xs text-text-secondary">
                          Faixa saudável: {healthyRange.min}% - {healthyRange.max}%
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${diffColor}`}>{diffText}</div>
                        <div className="text-sm text-text-secondary">Diferença do ideal</div>
                        <div className="mt-1 text-xs text-text-secondary">
                          {difference <= -2
                            ? "Abaixo do recomendado"
                            : difference >= 2
                              ? "Acima do recomendado"
                              : "Dentro da faixa ideal"}
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
            🎯 Gordura Corporal – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Gordura Corporal */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🧬 Composição Corporal
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O percentual de gordura corporal indica a proporção de tecido adiposo em relação
                    ao peso total do corpo, sendo um indicador mais confiável de saúde que apenas o
                    peso.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Métodos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• US Navy: Utiliza medidas de pescoço e cintura</li>
                    <li>• Jackson-Pollock: Baseado em dobras cutâneas</li>
                    <li>• Bioimpedância: Resistência elétrica</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Importância</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Avaliação de riscos à saúde</li>
                    <li>• Monitoramento de progresso fitness</li>
                    <li>• Planejamento nutricional</li>
                    <li>• Prevenção de doenças</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Características</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Varia com idade e gênero</li>
                    <li>• Indica riscos à saúde</li>
                    <li>• Melhor que IMC para fitness</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Valores de Referência */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📐 Valores de Referência
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">👨 Homens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Atlético: 6-13%</li>
                    <li>• Fitness: 14-17%</li>
                    <li>• Aceitável: 18-24%</li>
                    <li>• Obeso: 25%+</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🎯 Objetivos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Saúde geral: 10-18%</li>
                    <li>• Performance esportiva: 6-13%</li>
                    <li>• Manutenção: 14-24%</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">👩 Mulheres</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Atlético: 16-20%</li>
                    <li>• Fitness: 21-24%</li>
                    <li>• Aceitável: 25-31%</li>
                    <li>• Obeso: 32%+</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🎯 Objetivos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Saúde geral: 20-28%</li>
                    <li>• Performance esportiva: 16-23%</li>
                    <li>• Manutenção: 24-31%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Como Medir */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🔍 Como Medir Corretamente
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">📝 Medidas Necessárias</h4>
                  <ol className="mb-4 space-y-2 text-sm text-text-secondary">
                    <li>
                      1. <strong>Pescoço:</strong> Logo abaixo do pomo de Adão
                    </li>
                    <li>
                      2. <strong>Cintura:</strong> Ponto mais estreito do abdômen
                    </li>
                    <li>
                      3. <strong>Quadril (mulheres):</strong> Ponto mais largo dos quadris
                    </li>
                    <li>
                      4. <strong>Altura:</strong> Sem sapatos, encostado na parede
                    </li>
                    <li>
                      5. <strong>Peso:</strong> Preferencialmente pela manhã
                    </li>
                  </ol>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Dicas Importantes</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Use fita métrica flexível</li>
                    <li>• Mantenha a fita paralela ao chão</li>
                    <li>• Não aperte demais a fita</li>
                    <li>• Meça sempre no mesmo horário</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Cuidados</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Não meça após exercícios intensos</li>
                    <li>• Evite medir durante ciclo menstrual</li>
                    <li>• Mantenha postura ereta e relaxada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Gordura Corporal"
        items={[
          {
            question: "O que é gordura corporal?",
            answer:
              "Gordura corporal é o percentual de tecido adiposo em relação ao peso total do corpo. É um indicador mais confiável de saúde que apenas o peso ou IMC, pois diferencia massa magra de massa gorda.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual é o percentual de gordura corporal ideal?",
            answer:
              "O percentual ideal varia por idade e gênero. Para homens: 8-24% (dependendo da idade). Para mulheres: 16-31%. Atletas podem ter valores menores, enquanto níveis acima de 25% (homens) ou 32% (mulheres) indicam obesidade.",
            borderColor: "growth-green",
          },
          {
            question: "Como calcular gordura corporal em casa?",
            answer:
              "Use fita métrica para medir pescoço, cintura e quadril (mulheres). Aplique o método US Navy ou use nossa calculadora online gratuita que faz os cálculos automaticamente com base nas suas medidas.",
            borderColor: "system-info",
          },
          {
            question: "Qual a diferença entre método US Navy e Jackson-Pollock?",
            answer:
              "O método US Navy usa circunferências corporais (pescoço, cintura, quadril) e é mais acessível. O Jackson-Pollock tradicionalmente usa dobras cutâneas com adipômetro, mas nossa versão simplificada usa medidas corporais para maior praticidade.",
            borderColor: "system-warning",
          },
          {
            question: "Como medir corretamente as circunferências?",
            answer:
              "Use fita métrica flexível. Pescoço: logo abaixo do pomo de Adão. Cintura: ponto mais estreito do abdômen. Quadril (mulheres): ponto mais largo. Mantenha a fita paralela ao chão sem apertar demais.",
            borderColor: "growth-green",
          },
          {
            question: "Gordura corporal é mais importante que IMC?",
            answer:
              "Sim, o percentual de gordura corporal é mais confiável que o IMC para avaliar saúde e fitness. O IMC não diferencia massa magra de gorda, enquanto a gordura corporal fornece informações específicas sobre composição corporal.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Gordura Corporal",
          content:
            "<strong>Para melhores resultados:</strong> meça sempre no mesmo horário, evite exercícios intensos antes da medição e mantenha postura ereta e relaxada durante as medidas.",
        }}
        footerText="<strong>Lembre-se:</strong> O percentual de gordura corporal é mais confiável que o IMC para avaliar saúde. Consulte profissionais de saúde para interpretação completa dos resultados."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Gordura Corporal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de gordura corporal</strong>{" "}
              permite calcular{" "}
              <strong className="text-growth-green">composição corporal confiável</strong>:
              percentual de gordura, massa magra e análise de saúde com métodos científicos
              validados.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Métodos US Navy e Jackson-Pollock, análise por idade
              e gênero, comparativo com pessoa saudável, classificação de risco à saúde e cálculo de
              IMC integrado.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins informativos e acompanhamento pessoal. Para avaliações médicas ou nutricionais
              profissionais, consulte sempre um <strong>profissional de saúde qualificado</strong>.
              Explore também nossas calculadoras de
              <a
                href="/calculadoras/saude/imc"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                IMC
              </a>
              para complementar sua análise de saúde.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco em saúde • 📏 Gordura Corporal • 🔒 Dados não armazenados • 📱 Compatível com
              todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="regra-de-tres" />
    </div>
  );
}
