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
      title: `Calculadora de Hidratação Diária 2025 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora hidratação diária grátis. Calcule quantidade ideal de água, necessidades hídricas personalizadas. Método científico.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
    },
    {
      property: "og:title",
      content: "Calculadora de Hidratação Diária 2025 | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "💧 Calculadora de hidratação diária gratuita. Calcule quantidade ideal de água, necessidades hídricas personalizadas e plano de hidratação. Método científico!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-hidratacao.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Hidratação - Cálculo de Água Diária",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Hidratação Diária 2025 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "💧 Calculadora de hidratação diária gratuita. Calcule quantidade ideal de água, necessidades hídricas personalizadas e plano de hidratação. Método científico!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-hidratacao.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Hidratação - Cálculo de Água Diária",
    },
    { name: "twitter:site", content: "@CalculadoraOnlineBR" },
    { name: "twitter:creator", content: "@CalculadoraOnlineBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Hidratação" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      name: "keywords",
      content:
        "calculadora hidratação, água diária, necessidade hídrica, quanto beber água, litros água por dia, hidratação corporal, sede, desidratação, agua calculator",
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
            name: "Saúde",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Hidratação",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Hidratação Diária Online 2025",
        description:
          "Ferramenta gratuita para calcular necessidade hídrica diária personalizada. Cálculo científico de água ideal por peso, idade, atividade física e clima.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2024-12-31",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
          name: "Calculadora de Hidratação - Cálculo de Água Diária",
          description:
            "Ferramenta gratuita para calcular necessidade hídrica diária personalizada com base no peso, idade, atividade física e condições climáticas.",
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
          name: "Hidratação",
          description:
            "Necessidade diária de água para manter o corpo hidratado e funcionário de forma ótima",
          category: "Health",
        },
        featureList: [
          "Cálculo de necessidade hídrica diária",
          "Personalização por peso e idade",
          "Ajuste para atividade física",
          "Consideração de fatores climáticos",
          "Plano de hidratação horário",
          "Alertas de desidratação",
          "Recomendações personalizadas",
          "Interface móvel responsiva",
          "Resultados em tempo real",
          "Dicas de hidratação saudável",
          "Base científica validada",
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
            name: "Quanta água devo beber por dia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A necessidade varia por idade, peso e atividade. Homens adultos necessitam de cerca de 3,7L/dia e mulheres 2,7L/dia, incluindo água de alimentos. Use nossa calculadora para uma recomendação personalizada.",
            },
          },
          {
            "@type": "Question",
            name: "Como saber se estou bem hidratado?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Monitore a cor da urina: amarelo claro indica boa hidratação, enquanto amarelo escuro sugere desidratação. Outros sinais: pele elástica, não sentir sede constante e disposição adequada.",
            },
          },
          {
            "@type": "Question",
            name: "Quando devo beber mais água?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aumente o consumo durante exercícios (+200ml a cada 15min), clima quente (+500-1000ml), febre (+500ml por grau), gestação (+300ml) e amamentação (+500-700ml).",
            },
          },
          {
            "@type": "Question",
            name: "Posso beber outros líquidos além da água?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim! Chás, sucos naturais, água de coco e sopas contam para a hidratação. Evite excesso de bebidas com cafeína ou açúcar. Cerca de 20% da hidratação vem dos alimentos.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Hidratação Diária",
        description:
          "Aprenda a calcular sua necessidade diária de água de forma confiável usando nossa calculadora de hidratação online gratuita",
        step: [
          {
            "@type": "HowToStep",
            name: "Insira dados pessoais",
            text: "Digite sua idade, peso, altura e selecione seu gênero. Essas informações são fundamentais para calcular sua necessidade hídrica basal.",
          },
          {
            "@type": "HowToStep",
            name: "Defina nível de atividade",
            text: "Selecione seu nível de atividade física: sedentário, leve, moderado ou intenso. Exercícios aumentam significativamente a necessidade de água.",
          },
          {
            "@type": "HowToStep",
            name: "Considere fatores climáticos",
            text: "Escolha o tipo de clima: frio, temperado ou quente. Temperaturas elevadas requerem hidratação adicional para regulação térmica.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja sua necessidade diária de água, cronograma de hidratação personalizado, dicas específicas e status de hidratação ideal.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Hidratação Online",
          },
        ],
      }),
    },
    // Adicionar WebPage Schema separado para melhor estruturação
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/saude/hidratacao",
        name: "Calculadora de Hidratação Diária - Necessidade de Água Personalizada",
        description:
          "Ferramenta gratuita para calcular necessidade diária de água personalizada com base no peso, idade, atividade física e condições climáticas.",
        inLanguage: "pt-BR",
        dateModified: "2025-08-31",
        lastReviewed: "2025-08-31",
        isPartOf: {
          "@type": "WebSite",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        about: [
          {
            "@type": "Thing",
            name: "Hidratação",
            description: "Necessidade diária de água para manter o corpo hidratado",
          },
          {
            "@type": "Thing",
            name: "Necessidade Hídrica",
            description: "Cálculo científico de consumo de água personalizado",
          },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Pessoas interessadas em saúde e hidratação adequada",
        },
      }),
    },
  ];
};

interface HydrationResult {
  inputs: {
    age: number;
    weight: number;
    height: number;
    gender: "masculino" | "feminino";
    activityLevel: "sedentario" | "leve" | "moderado" | "intenso";
    climate: "temperado" | "quente" | "frio";
    healthConditions: string[];
  };
  calculations: {
    baseWaterNeeds: number; // ml
    activityAdjustment: number; // ml
    climateAdjustment: number; // ml
    totalDailyNeeds: number; // ml
    totalLiters: number;
    hourlyIntake: number; // ml per hour
  };
  recommendations: {
    hydrationStatus: string;
    tips: string[];
    schedule: Array<{ time: string; amount: number; description: string }>;
  };
}

interface ValidationErrors {
  age?: string;
  weight?: string;
  height?: string;
  gender?: string;
  activityLevel?: string;
  climate?: string;
}

export default function HydrationCalculator() {
  // Inputs para hidratação
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"masculino" | "feminino" | "">("");
  const [activityLevel, setActivityLevel] = useState<
    "sedentario" | "leve" | "moderado" | "intenso"
  >("sedentario");
  const [climate, setClimate] = useState<"temperado" | "quente" | "frio">("temperado");
  const [pregnancy, setPregnancy] = useState(false);
  const [breastfeeding, setBreastfeeding] = useState(false);

  const [result, setResult] = useState<HydrationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "hidratacao",
    category: "saude",
  });
  useFormTracking("hidratacao");

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

    if (!age || ageNum < 1 || ageNum > 100) {
      newErrors.age = "Idade deve estar entre 1 e 100 anos";
      ok = false;
    }

    if (!weight || weightNum < 10 || weightNum > 300) {
      newErrors.weight = "Peso deve estar entre 10 e 300 kg";
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

    if (!activityLevel) {
      newErrors.activityLevel = "Selecione o nível de atividade";
      ok = false;
    }

    if (!climate) {
      newErrors.climate = "Selecione o tipo de clima";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const calculateHydration = (): HydrationResult => {
    const ageNum = parseNumber(age);
    const weightNum = parseNumber(weight);
    const heightNum = parseNumber(height);
    const isMale = gender === "masculino";

    // Base water needs calculation (Formula baseada no peso corporal)
    let baseWaterNeeds: number;

    if (ageNum < 13) {
      // Crianças: 1-1.5L por 10kg de peso
      baseWaterNeeds = (weightNum / 10) * 1200;
    } else {
      // Adultos: fórmula baseada no peso corporal
      // Recomendação personalizada por peso
      let mlPerKg = 35;

      // Ajustes por idade
      if (ageNum < 19) {
        mlPerKg = 40; // Adolescentes necessitam de mais água
      } else if (ageNum > 65) {
        mlPerKg = 30; // Idosos têm menor necessidade base
      }

      // Ajuste por gênero - usando 35ml/kg para mulheres e 37ml/kg para homens
      if (!isMale) {
        mlPerKg = 35; // Mulheres: 35ml/kg (70kg = 2450ml = 2.45L)
      } else {
        mlPerKg = 37; // Homens: 37ml/kg
      }

      baseWaterNeeds = weightNum * mlPerKg;
    }

    // Adjustments for activity level
    let activityAdjustment = 0;
    switch (activityLevel) {
      case "leve":
        activityAdjustment = 300;
        break;
      case "moderado":
        activityAdjustment = 600;
        break;
      case "intenso":
        activityAdjustment = 1000;
        break;
    }

    // Climate adjustments
    let climateAdjustment = 0;
    switch (climate) {
      case "quente":
        climateAdjustment = 500;
        break;
      case "frio":
        climateAdjustment = -200;
        break;
    }

    // Special conditions
    let specialAdjustment = 0;
    const healthConditions: string[] = [];

    if (gender === "feminino") {
      if (pregnancy) {
        specialAdjustment += 300;
        healthConditions.push("Gravidez");
      }

      if (breastfeeding) {
        specialAdjustment += 700;
        healthConditions.push("Amamentação");
      }
    }

    const totalDailyNeeds =
      baseWaterNeeds + activityAdjustment + climateAdjustment + specialAdjustment;
    const totalLiters = totalDailyNeeds / 1000;
    const hourlyIntake = Math.round(totalDailyNeeds / 16); // 16 horas acordado

    // Generate hydration schedule
    const schedule = generateHydrationSchedule(totalDailyNeeds);

    // Get hydration status
    const hydrationStatus = getHydrationStatus(totalLiters, ageNum, isMale);

    // Get personalized tips
    const tips = getHydrationTips(activityLevel, climate, ageNum, healthConditions);

    return {
      inputs: {
        age: ageNum,
        weight: weightNum,
        height: heightNum,
        gender: gender as "masculino" | "feminino",
        activityLevel,
        climate,
        healthConditions,
      },
      calculations: {
        baseWaterNeeds,
        activityAdjustment,
        climateAdjustment,
        totalDailyNeeds,
        totalLiters,
        hourlyIntake,
      },
      recommendations: {
        hydrationStatus,
        tips,
        schedule,
      },
    };
  };

  const generateHydrationSchedule = (totalMl: number) => [
    { time: "07:00", amount: Math.round(totalMl * 0.15), description: "Ao acordar - reidratação" },
    { time: "09:00", amount: Math.round(totalMl * 0.1), description: "Manhã - manutenção" },
    { time: "11:00", amount: Math.round(totalMl * 0.1), description: "Meio da manhã" },
    { time: "13:00", amount: Math.round(totalMl * 0.12), description: "Almoço - digestão" },
    { time: "15:00", amount: Math.round(totalMl * 0.1), description: "Tarde" },
    { time: "17:00", amount: Math.round(totalMl * 0.1), description: "Final da tarde" },
    { time: "19:00", amount: Math.round(totalMl * 0.12), description: "Jantar - digestão" },
    { time: "21:00", amount: Math.round(totalMl * 0.08), description: "Noite - moderado" },
  ];

  const getHydrationStatus = (liters: number, age: number, isMale: boolean): string => {
    const ideal =
      age < 19 ? (isMale ? 3.3 : 2.3) : age < 51 ? (isMale ? 3.7 : 2.7) : isMale ? 3.5 : 2.5;
    const percentage = (liters / ideal) * 100;

    if (percentage < 70) return "Desidratação severa";
    if (percentage < 85) return "Desidratação leve";
    if (percentage <= 115) return "Hidratação adequada";
    return "Hidratação excessiva";
  };

  const getHydrationTips = (
    activity: string,
    climate: string,
    age: number,
    conditions: string[]
  ): string[] => {
    const tips = [
      "Beba água regularmente ao longo do dia",
      "Monitor a cor da urina - deve ser amarelo claro",
    ];

    if (activity !== "sedentario") {
      tips.push("Hidrate-se antes, durante e após exercícios");
    }

    if (climate === "quente") {
      tips.push("Aumente a ingestão em dias quentes e secos");
    }

    if (age > 65) {
      tips.push("Idosos têm menor sensação de sede - mantenha horários regulares");
    }

    if (conditions.includes("Gravidez")) {
      tips.push("Gestantes necessitam de hidratação extra para o bebê");
    }

    return tips;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation();
    try {
      const result = calculateHydration();
      setResult(result);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setErrors({ age: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation(false, String(error));
    }
  };

  const handleReset = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("");
    setActivityLevel("sedentario");
    setClimate("temperado");
    setPregnancy(false);
    setBreastfeeding(false);
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
        <BreadcrumbItem isLast>Hidratação</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Hidratação 2025
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule sua <strong className="text-health-red">necessidade diária de hidratação</strong>{" "}
          facilmente científica. Análise completa de{" "}
          <strong className="text-primary-blue-dark">consumo de água</strong> para sua saúde.
        </p>
        <div className="bg-health-red-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            💧 <strong>Base Científica</strong> • 📊 <strong>Análise Personalizada</strong> • ⏰{" "}
            <strong>Cronograma de Hidratação</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">💧 Calculadora de Hidratação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg text-text-secondary">
              Insira seus dados para calcular hidratação ideal:
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
                    min="1"
                    max="100"
                    fullWidth
                    className="h-12 text-lg"
                  />
                  <ErrorMessage error={errors.age} />
                  <div className="mt-1 text-xs text-text-secondary">1 a 100 anos</div>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Peso (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="10"
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

            {/* Fatores de Hidratação */}
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-6">
              <h3 className="mb-4 text-center text-lg font-semibold text-primary-blue-dark">
                🌡️ Fatores que Afetam a Hidratação
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nível de Atividade */}
                <div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-text-primary">
                      Nível de Atividade Física
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "sedentario", label: "🪑 Sedentário", desc: "Pouco movimento" },
                      { value: "leve", label: "🚶 Leve", desc: "Caminhadas" },
                      { value: "moderado", label: "🏃 Moderado", desc: "Exercícios regulares" },
                      { value: "intenso", label: "💪 Intenso", desc: "Treinos pesados" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setActivityLevel(item.value as any)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          activityLevel === item.value
                            ? "bg-primary-blue text-white"
                            : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                        }`}
                      >
                        <div>{item.label}</div>
                        <div className="text-xs opacity-75">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                  <ErrorMessage error={errors.activityLevel} />
                </div>

                {/* Clima */}
                <div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-text-primary">
                      Tipo de Clima
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "frio", label: "🧊 Frio", desc: "< 15°C" },
                      { value: "temperado", label: "🌤️ Temperado", desc: "15-25°C" },
                      { value: "quente", label: "🔥 Quente", desc: "> 25°C" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setClimate(item.value as any)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          climate === item.value
                            ? "bg-primary-blue text-white"
                            : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                        }`}
                      >
                        <div>{item.label}</div>
                        <div className="text-xs opacity-75">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                  <ErrorMessage error={errors.climate} />
                </div>
              </div>

              {/* Condições Especiais */}
              {gender === "feminino" && (
                <div className="mt-6 rounded-lg bg-system-info/10 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-system-info">
                    👶 Condições Especiais (Mulheres)
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={pregnancy}
                        onChange={(e) => setPregnancy(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-text-secondary">🤰 Gestante (+300ml)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={breastfeeding}
                        onChange={(e) => setBreastfeeding(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-text-secondary">🍼 Amamentando (+700ml)</span>
                    </label>
                  </div>
                </div>
              )}
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
              💧 Seu Plano de Hidratação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-900 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm text-text-secondary">Necessidade Hídrica Diária</div>
                <div className="text-xl font-bold text-primary-blue-dark">
                  {result.calculations.totalLiters.toFixed(1)}L
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-system-warning">
                  {result.calculations.hourlyIntake} ml
                </div>
                <div className="text-sm text-text-secondary">Por Hora (Acordado)</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-lg font-bold text-growth-green">
                  {Math.round(result.calculations.totalDailyNeeds / 250)} copos
                </div>
                <div className="text-sm text-text-secondary">Copos de 250ml</div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">
                Informações da Hidratação
              </h4>
              <div className="text-sm text-text-secondary">
                <div>
                  <strong>Necessidade Base:</strong>{" "}
                  {(result.calculations.baseWaterNeeds / 1000).toFixed(1)}L
                </div>
                <div>
                  <strong>Ajuste Atividade:</strong> +
                  {(result.calculations.activityAdjustment / 1000).toFixed(1)}L
                </div>
                <div>
                  <strong>Ajuste Clima:</strong>{" "}
                  {result.calculations.climateAdjustment >= 0 ? "+" : ""}
                  {(result.calculations.climateAdjustment / 1000).toFixed(1)}L
                </div>
                <div>
                  <strong>Status:</strong> {result.recommendations.hydrationStatus}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-900 p-4">
              <h4 className="mb-3 font-semibold text-growth-green">Dicas Personalizadas</h4>
              <div className="space-y-2">
                {result.recommendations.tips.map((tip, index) => (
                  <div key={index} className="text-sm text-text-secondary">
                    <span className="font-medium text-primary-blue-dark">• </span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Cronograma de Hidratação */}
            <div className="rounded-lg border border-growth-green/30 bg-growth-green-soft p-4">
              <h4 className="mb-3 font-semibold text-growth-green">
                ⏰ Cronograma de Hidratação Sugerido
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {result.recommendations.schedule.map((item, index) => (
                  <div key={index} className="rounded-lg bg-gray-900 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary-blue">{item.time}</span>
                        <span className="text-xs text-text-secondary">•</span>
                        <span className="text-sm font-semibold text-growth-green">
                          {item.amount}ml
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-text-secondary">{item.description}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-gray-800 p-3">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Total diário recomendado:</div>
                  <div className="text-xl font-bold text-primary-blue">
                    {result.calculations.totalLiters}L
                  </div>
                  <div className="text-xs text-text-secondary">
                    ({result.calculations.totalDailyNeeds}ml)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Hidratação - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            💧 Hidratação – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Hidratação */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                💧 Hidratação e Saúde
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    A hidratação adequada é essencial para todas as funções corporais, desde a
                    regulação da temperatura até o transporte de nutrientes e eliminação de toxinas.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Fatores</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Idade e peso corporal</li>
                    <li>• Nível de atividade física</li>
                    <li>• Condições climáticas</li>
                    <li>• Estado de saúde</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Importância</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Regulação da temperatura corporal</li>
                    <li>• Manutenção da pressão arterial</li>
                    <li>• Transporte de nutrientes</li>
                    <li>• Eliminação de toxinas</li>
                    <li>• Lubrificação das articulações</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Sinais</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Sede é sinal tardio</li>
                    <li>• Cor da urina indica hidratação</li>
                    <li>• Pele ressecada e fadiga</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Valores de Referência */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📐 Necessidades Diárias
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">👨 Homens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 19-30 anos: 3,7L/dia</li>
                    <li>• 31-50 anos: 3,7L/dia</li>
                    <li>• 51+ anos: 3,5L/dia</li>
                    <li>• Atletas: +500-1000ml</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🎯 Distribuição</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 80% de líquidos</li>
                    <li>• 20% de alimentos</li>
                    <li>• Fracionado ao longo do dia</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">👩 Mulheres</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 19-30 anos: 2,7L/dia</li>
                    <li>• 31-50 anos: 2,7L/dia</li>
                    <li>• 51+ anos: 2,5L/dia</li>
                    <li>• Grávidas: +300ml</li>
                    <li>• Lactantes: +500-700ml</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🎯 Crianças</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 1-3 anos: 1,3L/dia</li>
                    <li>• 4-8 anos: 1,7L/dia</li>
                    <li>• 9-13 anos: 2,1-2,4L/dia</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Como Hidratar Corretamente */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💡 Como Hidratar Corretamente
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">⏰ Horários Ideais</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Ao acordar: 1-2 copos</li>
                    <li>• Antes das refeições: 1 copo</li>
                    <li>• Durante exercícios: 200ml/15min</li>
                    <li>• Antes de dormir: 1 copo</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">🌡️ Condições Especiais</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Calor intenso: +500-1000ml</li>
                    <li>• Ar condicionado: +300ml</li>
                    <li>• Febre: +500ml por grau</li>
                    <li>• Altitudes elevadas: +300ml</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Dicas Práticas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Use garrafa marcada</li>
                    <li>• Configure lembretes</li>
                    <li>• Varie com chás e águas aromatizadas</li>
                    <li>• Monitore a cor da urina</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Evite</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Beber grandes volumes de uma vez</li>
                    <li>• Esperar sentir sede</li>
                    <li>• Excesso de bebidas com cafeína</li>
                    <li>• Substituir água por refrigerantes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Hidratação"
        items={[
          {
            question: "Quanta água devo beber por dia?",
            answer:
              "A necessidade varia por idade, peso e atividade. Homens adultos necessitam de cerca de 3,7L/dia e mulheres 2,7L/dia, incluindo água de alimentos. Use nossa calculadora para uma recomendação personalizada.",
            borderColor: "primary-blue",
          },
          {
            question: "Como saber se estou bem hidratado?",
            answer:
              "Monitore a cor da urina: amarelo claro indica boa hidratação, enquanto amarelo escuro sugere desidratação. Outros sinais: pele elástica, não sentir sede constante e disposição adequada.",
            borderColor: "growth-green",
          },
          {
            question: "Quando devo beber mais água?",
            answer:
              "Aumente o consumo durante exercícios (+200ml a cada 15min), clima quente (+500-1000ml), febre (+500ml por grau), gestação (+300ml) e amamentação (+500-700ml).",
            borderColor: "system-info",
          },
          {
            question: "Posso beber outros líquidos além da água?",
            answer:
              "Sim! Chás, sucos naturais, água de coco e sopas contam para a hidratação. Evite excesso de bebidas com cafeína ou açúcar. Cerca de 20% da hidratação vem dos alimentos.",
            borderColor: "system-warning",
          },
          {
            question: "Qual o melhor horário para beber água?",
            answer:
              "Distribua ao longo do dia: ao acordar (1-2 copos), antes das refeições (1 copo), durante exercícios e antes de dormir. Evite grandes volumes de uma vez para melhor absorção.",
            borderColor: "growth-green",
          },
          {
            question: "Posso beber água demais?",
            answer:
              "Raramente, mas sim. Intoxicação por água (hiponatremia) pode ocorrer ao beber mais de 4-5L rapidamente. Distribua o consumo ao longo do dia e escute seu corpo para evitar excessos.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Hidratação",
          content:
            "<strong>Para melhor hidratação:</strong> distribua o consumo ao longo do dia, monitore a cor da urina e ajuste conforme atividade física e clima. Configure lembretes para criar o hábito.",
        }}
        footerText="<strong>Lembre-se:</strong> A hidratação adequada é essencial para saúde. Ajuste conforme suas necessidades individuais e consulte profissionais para orientações específicas."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Hidratação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de hidratação</strong>{" "}
              permite calcular{" "}
              <strong className="text-growth-green">necessidade diária de água</strong>{" "}
              personalizada com base em fatores científicos como idade, peso, atividade e clima.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Cálculo baseado no Instituto de Medicina (EUA),
              ajustes para atividade física e clima, cronograma personalizado de hidratação e dicas
              específicas para sua rotina.
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
              para complementar seu cuidado com a saúde.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔎 Foco em saúde • 💧 Hidratação • 🔒 Dados não armazenados • 📱 Compatível com todos
              os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="hidratacao" />
    </div>
  );
}
