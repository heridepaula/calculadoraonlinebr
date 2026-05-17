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
  Checkbox,
} from "~/components/ui";
import { Input } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { useIndexNow } from "~/hooks/useIndexNow";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Peso na Gravidez 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora peso gravidez grátis segundo OMS. Monitore ganho gestacional por trimestre com análise completa e diretrizes médicas atualizadas.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
    },
    {
      property: "og:title",
      content: "Peso na Gravidez 2026 segundo OMS | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "🤰 Monitore ganho peso gestacional segundo OMS. Análise completa por trimestre com diretrizes médicas atualizadas e personalizadas.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-peso-gravidez.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Peso na Gravidez segundo OMS - Monitoramento Gestacional",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Peso na Gravidez 2026 segundo OMS | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "🤰 Monitore ganho peso gestacional segundo OMS. Análise completa por trimestre com diretrizes médicas atualizadas e personalizadas.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-peso-gravidez.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Peso na Gravidez segundo OMS - Monitoramento Gestacional",
    },
    { name: "twitter:site", content: "@CalculadoraOnlineBR" },
    { name: "twitter:creator", content: "@CalculadoraOnlineBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#E91E63" },
    { name: "msapplication-TileColor", content: "#E91E63" },
    { name: "apple-mobile-web-app-title", content: "Peso Gravidez" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      name: "keywords",
      content:
        "calculadora peso gravidez, ganho peso gestacional, IMC gravidez, peso ideal gravidez, OMS gravidez, trimestre gestacional",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
    { name: "referrer", content: "origin-when-cross-origin" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
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
            name: "Saúde",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Peso na Gravidez",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora Peso na Gravidez segundo OMS 2026",
        description:
          "Ferramenta gratuita para monitorar ganho de peso gestacional segundo diretrizes da OMS. Calcula IMC pré-gestacional, ganho recomendado por trimestre e acompanha evolução da gravidez.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-01-22",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
          name: "Calculadora de Peso na Gravidez segundo OMS",
          description:
            "Ferramenta gratuita para monitorar ganho de peso gestacional com base nas diretrizes da Organização Mundial da Saúde e Ministério da Saúde brasileiro.",
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
        },
        about: {
          "@type": "Thing",
          name: "Peso na Gravidez",
          description:
            "Monitoramento do ganho de peso gestacional baseado em diretrizes médicas da OMS e Ministério da Saúde brasileiro",
          category: "Health",
        },
        featureList: [
          "Cálculo IMC pré-gestacional",
          "Ganho peso recomendado OMS",
          "Monitoramento por trimestre",
          "Diretrizes brasileiras atualizadas",
          "Gestações múltiplas (gêmeos)",
          "Análise evolução gestacional",
          "Faixas ideais personalizadas",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Acompanhamento nutricional",
          "Classificação estado nutricional",
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
            name: "Qual o ganho de peso ideal na gravidez?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O ganho de peso ideal varia conforme IMC pré-gestacional: baixo peso (12,5-18kg), peso normal (11,5-16kg), sobrepeso (6,8-11,3kg), obesidade (5-9kg). Para gestações gemelares os valores são maiores.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular IMC pré-gestacional?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "IMC pré-gestacional = peso antes da gravidez (kg) ÷ altura (m)². Use o peso de antes da gestação ou medido até 8 semanas. Este valor determina o ganho recomendado durante toda a gravidez.",
            },
          },
          {
            "@type": "Question",
            name: "Quanto ganhar de peso por trimestre?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "1º trimestre: 0,5-2kg para todas. 2º/3º trimestres: baixo peso (0,4kg/semana), normal (0,4kg/semana), sobrepeso (0,27kg/semana), obesidade (0,23kg/semana). Diretrizes baseadas na OMS.",
            },
          },
          {
            "@type": "Question",
            name: "Gestação de gêmeos tem ganho diferente?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. Gestações gemelares: peso normal (16,8-24,5kg), sobrepeso (14,1-22,7kg), obesidade (11,3-19,1kg). O ganho é maior que gestações únicas devido às necessidades nutricionais aumentadas.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Peso na Gravidez",
        description:
          "Aprenda a monitorar seu ganho de peso gestacional usando diretrizes médicas da OMS e Ministério da Saúde brasileiro",
        step: [
          {
            "@type": "HowToStep",
            name: "Insira dados pré-gestacionais",
            text: "Digite peso antes da gravidez, altura, peso atual e idade gestacional em semanas. Esses dados são fundamentais para cálculo preciso do ganho recomendado.",
          },
          {
            "@type": "HowToStep",
            name: "Analise IMC pré-gestacional",
            text: "Veja sua classificação nutricional (baixo peso, normal, sobrepeso, obesidade) que determina o ganho total recomendado durante toda a gestação.",
          },
          {
            "@type": "HowToStep",
            name: "Monitore ganho atual",
            text: "Compare seu ganho atual com a faixa recomendada para sua idade gestacional, verificando se está adequado, insuficiente ou excessivo.",
          },
          {
            "@type": "HowToStep",
            name: "Acompanhe projeção trimestral",
            text: "Veja a projeção de ganho até o final da gestação e orientações específicas para cada trimestre baseadas em evidências científicas.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Peso na Gravidez segundo OMS",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalCalculator",
        name: "Calculadora de Peso na Gravidez segundo OMS",
        description:
          "Ferramenta médica para monitoramento do ganho de peso gestacional baseada nas diretrizes da Organização Mundial da Saúde e Ministério da Saúde brasileiro",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/peso-gravidez",
        medicalSpecialty: ["Obstetrics", "Nutrition", "GeneralMedicine"],
        guideline: {
          "@type": "MedicalGuideline",
          name: "Diretrizes OMS e Ministério da Saúde para Ganho de Peso Gestacional",
          description:
            "Recomendações atualizadas da Organização Mundial da Saúde e curvas brasileiras do Ministério da Saúde (2022) para monitoramento nutricional gestacional",
        },
        applicationCategory: "HealthApplication",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
      }),
    },
  ];
};

interface PregnancyWeightResult {
  inputs: {
    prePregnancyWeight: number;
    height: number;
    currentWeight: number;
    gestationalWeeks: number;
    isMultiple: boolean;
  };
  calculations: {
    prePregnancyBMI: number;
    currentWeightGain: number;
    recommendedMinGain: number;
    recommendedMaxGain: number;
    projectedTotalGain: number;
    weeklyGainRate: number;
  };
  classification: {
    bmiCategory: string;
    nutritionalStatus: string;
    weightGainStatus: "adequado" | "insuficiente" | "excessivo";
    trimester: 1 | 2 | 3;
    riskLevel: "baixo" | "normal" | "moderado" | "alto";
  };
  recommendations: {
    weeklyGain: number;
    remainingWeeks: number;
    remainingRecommendedGain: number;
    nutritionalGuidance: string[];
  };
}

interface ValidationErrors {
  prePregnancyWeight?: string;
  height?: string;
  currentWeight?: string;
  gestationalWeeks?: string;
}

export default function PregnancyWeightCalculator() {
  // Inputs para calculadora
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("");
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [gestationalWeeks, setGestationalWeeks] = useState("");
  const [isMultiple, setIsMultiple] = useState(false);

  const [result, setResult] = useState<PregnancyWeightResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "peso-gravidez",
    category: "saude",
  });
  useFormTracking("peso-gravidez");

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

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const preWeightNum = parseNumber(prePregnancyWeight);
    const heightNum = parseNumber(height);
    const currentWeightNum = parseNumber(currentWeight);
    const weeksNum = parseNumber(gestationalWeeks);

    if (!prePregnancyWeight || preWeightNum < 30 || preWeightNum > 200) {
      newErrors.prePregnancyWeight = "Peso pré-gestacional deve estar entre 30 e 200 kg";
      ok = false;
    }

    if (!height || heightNum < 140 || heightNum > 200) {
      newErrors.height = "Altura deve estar entre 140 e 200 cm";
      ok = false;
    }

    if (!currentWeight || currentWeightNum < 30 || currentWeightNum > 250) {
      newErrors.currentWeight = "Peso atual deve estar entre 30 e 250 kg";
      ok = false;
    }

    if (!gestationalWeeks || weeksNum < 1 || weeksNum > 42) {
      newErrors.gestationalWeeks = "Idade gestacional deve estar entre 1 e 42 semanas";
      ok = false;
    }

    if (currentWeightNum < preWeightNum - 5) {
      newErrors.currentWeight = "Peso atual não pode ser muito menor que o pré-gestacional";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculatePregnancyWeight = (): PregnancyWeightResult => {
    const preWeightNum = parseNumber(prePregnancyWeight);
    const heightNum = parseNumber(height);
    const currentWeightNum = parseNumber(currentWeight);
    const weeksNum = parseNumber(gestationalWeeks);

    // Calculate pre-pregnancy BMI
    const heightM = heightNum / 100;
    const prePregnancyBMI = preWeightNum / (heightM * heightM);

    // Current weight gain
    const currentWeightGain = currentWeightNum - preWeightNum;

    // Determine BMI category and recommended weight gain
    let bmiCategory: string;
    let recommendedMinGain: number;
    let recommendedMaxGain: number;
    let weeklyGainRate: number;

    if (prePregnancyBMI < 18.5) {
      bmiCategory = "Baixo peso";
      if (isMultiple) {
        recommendedMinGain = 17;
        recommendedMaxGain = 25;
      } else {
        recommendedMinGain = 12.5;
        recommendedMaxGain = 18;
      }
      weeklyGainRate = 0.4;
    } else if (prePregnancyBMI < 25) {
      bmiCategory = "Peso normal";
      if (isMultiple) {
        recommendedMinGain = 16.8;
        recommendedMaxGain = 24.5;
      } else {
        recommendedMinGain = 11.5;
        recommendedMaxGain = 16;
      }
      weeklyGainRate = 0.4;
    } else if (prePregnancyBMI < 30) {
      bmiCategory = "Sobrepeso";
      if (isMultiple) {
        recommendedMinGain = 14.1;
        recommendedMaxGain = 22.7;
      } else {
        recommendedMinGain = 6.8;
        recommendedMaxGain = 11.3;
      }
      weeklyGainRate = 0.27;
    } else {
      bmiCategory = "Obesidade";
      if (isMultiple) {
        recommendedMinGain = 11.3;
        recommendedMaxGain = 19.1;
      } else {
        recommendedMinGain = 5;
        recommendedMaxGain = 9;
      }
      weeklyGainRate = 0.23;
    }

    // Determine trimester
    let trimester: 1 | 2 | 3;
    if (weeksNum <= 13) {
      trimester = 1;
    } else if (weeksNum <= 27) {
      trimester = 2;
    } else {
      trimester = 3;
    }

    // Calculate expected gain for current gestational age
    let expectedMinGain: number;
    let expectedMaxGain: number;

    if (trimester === 1) {
      // First trimester: 0.5-2kg for all categories
      expectedMinGain = 0.5;
      expectedMaxGain = 2;
    } else {
      // Second and third trimester: apply weekly gain rate
      const weeksAfterFirst = weeksNum - 13;
      const firstTrimesterGain = 1.5; // Average gain in first trimester
      expectedMinGain = firstTrimesterGain + (weeksAfterFirst * weeklyGainRate * 0.7);
      expectedMaxGain = firstTrimesterGain + (weeksAfterFirst * weeklyGainRate * 1.3);
    }

    // Determine weight gain status
    let weightGainStatus: "adequado" | "insuficiente" | "excessivo";
    if (currentWeightGain < expectedMinGain) {
      weightGainStatus = "insuficiente";
    } else if (currentWeightGain > expectedMaxGain) {
      weightGainStatus = "excessivo";
    } else {
      weightGainStatus = "adequado";
    }

    // Calculate projected total gain
    const remainingWeeks = 40 - weeksNum;
    const projectedTotalGain = currentWeightGain + (remainingWeeks * weeklyGainRate);

    // Determine risk level
    let riskLevel: "baixo" | "normal" | "moderado" | "alto";
    if (weightGainStatus === "adequado") {
      riskLevel = "baixo";
    } else if (weightGainStatus === "insuficiente" && currentWeightGain > expectedMinGain * 0.7) {
      riskLevel = "normal";
    } else if (weightGainStatus === "excessivo" && currentWeightGain < expectedMaxGain * 1.2) {
      riskLevel = "moderado";
    } else {
      riskLevel = "alto";
    }

    // Nutritional status
    const nutritionalStatus = getBMIClassification(prePregnancyBMI);

    // Recommendations
    const remainingRecommendedGain = (recommendedMinGain + recommendedMaxGain) / 2 - currentWeightGain;
    const nutritionalGuidance = getNutritionalGuidance(bmiCategory, trimester, weightGainStatus);

    return {
      inputs: {
        prePregnancyWeight: preWeightNum,
        height: heightNum,
        currentWeight: currentWeightNum,
        gestationalWeeks: weeksNum,
        isMultiple,
      },
      calculations: {
        prePregnancyBMI,
        currentWeightGain,
        recommendedMinGain,
        recommendedMaxGain,
        projectedTotalGain,
        weeklyGainRate,
      },
      classification: {
        bmiCategory,
        nutritionalStatus,
        weightGainStatus,
        trimester,
        riskLevel,
      },
      recommendations: {
        weeklyGain: weeklyGainRate,
        remainingWeeks: Math.max(0, 40 - weeksNum),
        remainingRecommendedGain: Math.max(0, remainingRecommendedGain),
        nutritionalGuidance,
      },
    };
  };

  const getBMIClassification = (bmi: number): string => {
    if (bmi < 18.5) return "Baixo peso (Underweight)";
    if (bmi < 25) return "Peso normal (Eutrofia)";
    if (bmi < 30) return "Sobrepeso (Overweight)";
    return "Obesidade (Obese)";
  };

  const getNutritionalGuidance = (
    category: string,
    trimester: number,
    status: string
  ): string[] => {
    const baseGuidance = [
      "Mantenha alimentação equilibrada e variada",
      "Consulte regularmente seu obstetra",
      "Monitore o ganho de peso semanalmente",
    ];

    if (status === "insuficiente") {
      baseGuidance.push(
        "Aumente a ingestão calórica de forma saudável",
        "Inclua mais proteínas e gorduras boas",
        "Considere suplementação nutricional"
      );
    } else if (status === "excessivo") {
      baseGuidance.push(
        "Controle o ganho de peso com dieta adequada",
        "Pratique atividade física orientada",
        "Evite alimentos ultraprocessados"
      );
    }

    if (category === "Obesidade") {
      baseGuidance.push(
        "Acompanhamento nutricional especializado",
        "Monitoramento rigoroso de complicações"
      );
    }

    return baseGuidance;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation();
    try {
      const result = calculatePregnancyWeight();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch {
      setErrors({ gestationalWeeks: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setPrePregnancyWeight("");
    setHeight("");
    setCurrentWeight("");
    setGestationalWeeks("");
    setIsMultiple(false);
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
        <BreadcrumbItem isLast>Peso na Gravidez</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Peso na Gravidez 2026 segundo OMS
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Monitore seu <strong className="text-health-red">ganho de peso gestacional</strong> com base
          nas diretrizes da <strong className="text-primary-blue-dark">OMS e Ministério da Saúde</strong>{" "}
          brasileiro. Acompanhe sua evolução trimestre a trimestre.
        </p>
        <div className="bg-health-red-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🤰 <strong>Peso Gestacional</strong> • 📊 <strong>Diretrizes OMS</strong> • 📈{" "}
            <strong>Monitoramento Trimestral</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🤰 Calculadora de Peso na Gravidez segundo OMS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">
              Insira seus dados para monitoramento do ganho de peso gestacional:
            </p>
          </div>

          {/* Dados gestacionais */}
          <div className="mb-6 space-y-6">
            <div className="bg-health-red-soft rounded-lg border border-health-red/20 p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-health-red">
                📋 Dados Gestacionais
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Input
                    type="number"
                    label="Peso Pré-Gestacional (kg)"
                    value={prePregnancyWeight}
                    onChange={(e) => setPrePregnancyWeight(e.target.value)}
                    placeholder="65"
                    min="30"
                    max="200"
                    step="0.1"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.prePregnancyWeight} />
                  <div className="mt-1 text-xs text-text-secondary">Peso antes da gravidez</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Altura (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="165"
                    min="140"
                    max="200"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.height} />
                  <div className="mt-1 text-xs text-text-secondary">Altura em centímetros</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Peso Atual (kg)"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="68"
                    min="30"
                    max="250"
                    step="0.1"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.currentWeight} />
                  <div className="mt-1 text-xs text-text-secondary">Peso na consulta atual</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Idade Gestacional (semanas)"
                    value={gestationalWeeks}
                    onChange={(e) => setGestationalWeeks(e.target.value)}
                    placeholder="20"
                    min="1"
                    max="42"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.gestationalWeeks} />
                  <div className="mt-1 text-xs text-text-secondary">Semanas de gestação</div>
                </div>
              </div>

              {/* Gestação múltipla */}
              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-md">
                  <Checkbox
                    id="multiple"
                    checked={isMultiple}
                    onChange={(e) => setIsMultiple(e.target.checked)}
                    label="👶👶 Gestação múltipla (gêmeos)"
                  />
                  <div className="mt-1 text-center text-xs text-text-secondary">
                    Marque se esperando gêmeos ou mais
                  </div>
                </div>
              </div>
            </div>

            {/* Informações sobre o cálculo */}
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
                📊 Diretrizes OMS e Ministério da Saúde
              </h3>
              <div className="text-center text-sm text-text-secondary">
                <p className="mb-2">
                  <strong>IMC Pré-Gestacional:</strong> Base para recomendações de ganho
                </p>
                <p className="mb-2">
                  <strong>Diretrizes OMS:</strong> Institute of Medicine atualizadas
                </p>
                <p>
                  <strong>Curvas Brasileiras:</strong> Ministério da Saúde 2022
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-center space-x-4">
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
              📊 Resultado do Monitoramento Gestacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="mb-2 text-sm text-text-secondary">IMC Pré-Gestacional</div>
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {result.calculations.prePregnancyBMI.toFixed(1)}
                </div>
                <div className="text-xs text-text-secondary">kg/m²</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="mb-2 text-sm text-text-secondary">Ganho Atual</div>
                <div className="text-2xl font-bold text-system-warning">
                  {result.calculations.currentWeightGain.toFixed(1)}
                </div>
                <div className="text-xs text-text-secondary">kg</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="mb-2 text-sm text-text-secondary">Status</div>
                <div className={`text-2xl font-bold ${
                  result.classification.weightGainStatus === "adequado"
                    ? "text-growth-green"
                    : result.classification.weightGainStatus === "insuficiente"
                    ? "text-system-info"
                    : "text-system-error"
                }`}>
                  {result.classification.weightGainStatus === "adequado" ? "✓" :
                   result.classification.weightGainStatus === "insuficiente" ? "↓" : "↑"}
                </div>
                <div className="text-xs text-text-secondary capitalize">
                  {result.classification.weightGainStatus}
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">
                  Ganho Recomendado Total ({result.inputs.isMultiple ? "Gêmeos" : "Único"})
                </div>
                <div className="text-xl font-bold text-growth-green">
                  {result.calculations.recommendedMinGain.toFixed(1)} - {result.calculations.recommendedMaxGain.toFixed(1)} kg
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  Baseado em {result.classification.bmiCategory}
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Classificação</h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>Estado Nutricional:</strong> {result.classification.nutritionalStatus}
                </div>
                <div>
                  <strong>Categoria IMC:</strong> {result.classification.bmiCategory}
                </div>
                <div>
                  <strong>Trimestre:</strong> {result.classification.trimester}º trimestre ({result.inputs.gestationalWeeks} semanas)
                </div>
                <div>
                  <strong>Ganho Semanal Recomendado:</strong> {result.recommendations.weeklyGain} kg/semana
                </div>
                <div>
                  <strong>Risco:</strong>{" "}
                  {result.classification.riskLevel === "baixo"
                    ? "Baixo"
                    : result.classification.riskLevel === "normal"
                    ? "Normal"
                    : result.classification.riskLevel === "moderado"
                    ? "Moderado"
                    : "Alto"}
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <h4 className="mb-3 font-semibold text-growth-green">Projeção e Orientações</h4>
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Projeção de ganho total: {result.calculations.projectedTotalGain.toFixed(1)} kg
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Semanas restantes: {result.recommendations.remainingWeeks}
                </div>
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-primary-blue-dark">• </span>
                  Ganho recomendado restante: {result.recommendations.remainingRecommendedGain.toFixed(1)} kg
                </div>
              </div>
            </div>

            {/* Faixas de Ganho de Peso por Categoria */}
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <h4 className="mb-3 font-semibold text-growth-green">📊 Faixas de Ganho de Peso por Categoria IMC</h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  {
                    category: "Baixo peso",
                    bmiRange: "< 18,5 kg/m²",
                    gainSingle: "12,5 - 18 kg",
                    gainMultiple: "17 - 25 kg",
                    weeklyRate: "0,4 kg/semana",
                    isCurrent: result.classification.bmiCategory === "Baixo peso"
                  },
                  {
                    category: "Peso normal",
                    bmiRange: "18,5 - 24,9 kg/m²",
                    gainSingle: "11,5 - 16 kg",
                    gainMultiple: "16,8 - 24,5 kg",
                    weeklyRate: "0,4 kg/semana",
                    isCurrent: result.classification.bmiCategory === "Peso normal"
                  },
                  {
                    category: "Sobrepeso",
                    bmiRange: "25,0 - 29,9 kg/m²",
                    gainSingle: "6,8 - 11,3 kg",
                    gainMultiple: "14,1 - 22,7 kg",
                    weeklyRate: "0,27 kg/semana",
                    isCurrent: result.classification.bmiCategory === "Sobrepeso"
                  },
                  {
                    category: "Obesidade",
                    bmiRange: "≥ 30,0 kg/m²",
                    gainSingle: "5 - 9 kg",
                    gainMultiple: "11,3 - 19,1 kg",
                    weeklyRate: "0,23 kg/semana",
                    isCurrent: result.classification.bmiCategory === "Obesidade"
                  }
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-3 ${
                      category.isCurrent
                        ? "border-growth-green bg-growth-green-soft shadow-lg ring-2 ring-growth-green/50"
                        : "border-gray-600 bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-semibold ${
                        category.isCurrent ? "text-growth-green" : "text-text-primary"
                      }`}>
                        {category.category}
                        {category.isCurrent && (
                          <span className="ml-2 text-xs bg-growth-green text-white px-2 py-0.5 rounded-full">
                            SUA CATEGORIA
                          </span>
                        )}
                      </h5>
                    </div>
                    <div className="space-y-1 text-xs text-text-secondary">
                      <div><strong>IMC:</strong> {category.bmiRange}</div>
                      <div><strong>Gestação única:</strong> {category.gainSingle}</div>
                      <div><strong>Gestação múltipla:</strong> {category.gainMultiple}</div>
                      <div><strong>Taxa semanal:</strong> {category.weeklyRate}</div>
                    </div>
                    {category.isCurrent && (
                      <div className="mt-2 text-xs text-growth-green font-medium">
                        🎯 Seu ganho atual: {result.calculations.currentWeightGain.toFixed(1)} kg
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-text-secondary text-center">
                <strong>Fonte:</strong> Diretrizes OMS/IOM e Ministério da Saúde brasileiro (2022)
              </div>
            </div>

            {/* Comparativo Trimestral - Curvas Brasileiras */}
            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-3 font-semibold text-primary-blue-dark">🇧🇷 Curvas Brasileiras por Trimestre</h4>
              <div className="text-sm text-text-secondary">
                <div className="mb-2">
                  <strong>Sua categoria:</strong> {result.classification.bmiCategory}
                  <span className="ml-2 text-xs bg-primary-blue text-white px-2 py-0.5 rounded-full">
                    {result.classification.trimester}º TRIMESTRE
                  </span>
                </div>

                {(() => {
                  const category = result.classification.bmiCategory;
                  let ranges;

                  if (category === "Baixo peso") {
                    ranges = {
                      first: "0,2 - 1,2 kg",
                      second: "5,6 - 7,2 kg",
                      third: "9,7 - 12,2 kg"
                    };
                  } else if (category === "Peso normal") {
                    ranges = {
                      first: "-1,8 - 0,7 kg",
                      second: "3,1 - 6,3 kg",
                      third: "8,0 - 12,0 kg"
                    };
                  } else if (category === "Sobrepeso") {
                    ranges = {
                      first: "-1,6 - (-0,05) kg",
                      second: "2,3 - 3,7 kg",
                      third: "7,0 - 9,0 kg"
                    };
                  } else {
                    ranges = {
                      first: "-1,6 - 0,05 kg",
                      second: "1,1 - 2,7 kg",
                      third: "5,0 - 7,2 kg"
                    };
                  }

                  return (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className={`text-center p-2 rounded ${
                        result.classification.trimester === 1 ? "bg-growth-green text-white" : "bg-gray-700"
                      }`}>
                        <div className="text-xs font-medium">1º Trimestre</div>
                        <div className="text-xs">{ranges.first}</div>
                      </div>
                      <div className={`text-center p-2 rounded ${
                        result.classification.trimester === 2 ? "bg-growth-green text-white" : "bg-gray-700"
                      }`}>
                        <div className="text-xs font-medium">2º Trimestre</div>
                        <div className="text-xs">{ranges.second}</div>
                      </div>
                      <div className={`text-center p-2 rounded ${
                        result.classification.trimester === 3 ? "bg-growth-green text-white" : "bg-gray-700"
                      }`}>
                        <div className="text-xs font-medium">3º Trimestre</div>
                        <div className="text-xs">{ranges.third}</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Orientações Nutricionais */}
            <div className="rounded-lg border border-growth-green/30 bg-growth-green-soft p-4">
              <h4 className="mb-3 font-semibold text-growth-green">🍎 Orientações Nutricionais</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                {result.recommendations.nutritionalGuidance.map((guidance, index) => (
                  <li key={index}>
                    <span className="font-medium text-primary-blue-dark">• </span>
                    {guidance}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Guia Completo de Peso na Gravidez */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🤰 Peso na Gravidez – Guia Completo OMS 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Ganho de Peso Gestacional */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📏 Metodologia de Cálculo OMS
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 IMC Pré-Gestacional</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O primeiro passo é determinar o IMC pré-gestacional usando a fórmula padrão da OMS:
                    <strong> IMC = peso pré-gestacional (kg) ÷ altura (m)²</strong>
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Classificação OMS</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Baixo peso: &lt; 18,5 kg/m²</li>
                    <li>• Peso normal: 18,5 - 24,9 kg/m²</li>
                    <li>• Sobrepeso: 25,0 - 29,9 kg/m²</li>
                    <li>• Obesidade: ≥ 30,0 kg/m²</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Diretrizes IOM</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Baixo peso: 12,5 - 18 kg</li>
                    <li>• Normal: 11,5 - 16 kg</li>
                    <li>• Sobrepeso: 6,8 - 11,3 kg</li>
                    <li>• Obesidade: 5 - 9 kg</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Ganho Semanal</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Normal/Baixo peso: 0,4 kg/semana</li>
                    <li>• Sobrepeso: 0,27 kg/semana</li>
                    <li>• Obesidade: 0,23 kg/semana</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Diretrizes Brasileiras */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🇧🇷 Diretrizes Brasileiras Atualizadas (2022)
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    📊 Ganho Cumulativo por Trimestre
                  </h4>
                  <div className="mb-4 space-y-2 text-sm text-text-secondary">
                    <div><strong>Baixo peso:</strong></div>
                    <ul className="ml-4 space-y-1">
                      <li>• 1º: 0,2 - 1,2 kg</li>
                      <li>• 2º: 5,6 - 7,2 kg</li>
                      <li>• 3º: 9,7 - 12,2 kg</li>
                    </ul>
                    <div><strong>Eutrofia:</strong></div>
                    <ul className="ml-4 space-y-1">
                      <li>• 1º: -1,8 - 0,7 kg</li>
                      <li>• 2º: 3,1 - 6,3 kg</li>
                      <li>• 3º: 8,0 - 12,0 kg</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🤱 Gestações Múltiplas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Normal: 16,8 - 24,5 kg</li>
                    <li>• Sobrepeso: 14,1 - 22,7 kg</li>
                    <li>• Obesidade: 11,3 - 19,1 kg</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">⚠️ Considerações Especiais</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 1º trimestre: 0,5-2 kg para todas</li>
                    <li>• Perda até 1,5 kg é aceitável</li>
                    <li>• Ganho constante no 2º/3º trimestre</li>
                    <li>• Monitoramento por percentis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Peso na Gravidez"
        items={[
          {
            question: "Qual o ganho de peso ideal na gravidez?",
            answer:
              "O ganho de peso ideal varia conforme IMC pré-gestacional: baixo peso (12,5-18kg), peso normal (11,5-16kg), sobrepeso (6,8-11,3kg), obesidade (5-9kg). Para gestações gemelares os valores são maiores.",
            borderColor: "primary-blue",
          },
          {
            question: "Como calcular IMC pré-gestacional?",
            answer:
              "IMC pré-gestacional = peso antes da gravidez (kg) ÷ altura (m)². Use o peso de antes da gestação ou medido até 8 semanas. Este valor determina o ganho recomendado durante toda a gravidez.",
            borderColor: "growth-green",
          },
          {
            question: "Quanto ganhar de peso por trimestre?",
            answer:
              "1º trimestre: 0,5-2kg para todas. 2º/3º trimestres: baixo peso (0,4kg/semana), normal (0,4kg/semana), sobrepeso (0,27kg/semana), obesidade (0,23kg/semana). Diretrizes baseadas na OMS.",
            borderColor: "system-info",
          },
          {
            question: "Gestação de gêmeos tem ganho diferente?",
            answer:
              "Sim. Gestações gemelares: peso normal (16,8-24,5kg), sobrepeso (14,1-22,7kg), obesidade (11,3-19,1kg). O ganho é maior que gestações únicas devido às necessidades nutricionais aumentadas.",
            borderColor: "system-warning",
          },
          {
            question: "É normal perder peso no primeiro trimestre?",
            answer:
              "Sim, é normal perder até 1,5kg no primeiro trimestre devido a náuseas e vômitos. Para mulheres com sobrepeso/obesidade, nenhum ganho é esperado neste período. Consulte seu médico se a perda for maior.",
            borderColor: "growth-green",
          },
          {
            question: "Como usar as curvas brasileiras atualizadas?",
            answer:
              "As curvas brasileiras de 2022 consideram dados de 7.086 mulheres brasileiras. Use os valores específicos por trimestre para sua categoria de IMC para monitoramento mais preciso da população brasileira.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Peso Gestacional",
          content:
            "<strong>Para melhores resultados:</strong> pesagem semanal no mesmo horário, registro constante e acompanhamento médico regular. Use sempre o peso pré-gestacional como referência.",
        }}
        footerText="<strong>Lembre-se:</strong> O ganho de peso gestacional adequado é fundamental para a saúde materno-fetal. Esta calculadora é informativa e não substitui acompanhamento médico profissional."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Peso na Gravidez
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de peso na gravidez</strong> permite
              monitorar <strong className="text-growth-green">ganho peso gestacional</strong> segundo
              diretrizes da OMS e Ministério da Saúde brasileiro com análise trimestral personalizada.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Cálculo IMC pré-gestacional, ganho recomendado por categoria,
              monitoramento trimestral, projeção evolução gestacional, orientações nutricionais e
              suporte para gestações múltiplas.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              acompanhamento gestacional e orientação nutricional. Para avaliações médicas ou intercorrências
              gestacionais, consulte sempre um <strong>obstetra qualificado</strong>.
              Explore também nossa calculadora de
              <a
                href="/calculadoras/saude/imc"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
                rel="related"
              >
                IMC
              </a>
              para análise nutricional completa.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🤰 Foco gestacional • 📊 Diretrizes OMS • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="peso-gravidez" />
    </div>
  );
}