import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const meta: MetaFunction = () => {
  return [
    {
      title: "Calculadora Desenvolvimento Infantil 2025 | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Acompanhe o desenvolvimento da criança com gráficos de crescimento. Calcule percentis de altura e peso, marcos do desenvolvimento. Ferramenta gratuita para pais e pediatras.",
    },
    { name: "author", content: "CalculadoraOnlineBR - Ferramentas Educacionais" },
    {
      name: "keywords",
      content:
        "desenvolvimento infantil, crescimento criança, percentil altura peso, marcos desenvolvimento",
    },
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
      href: "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
    },
    {
      property: "og:title",
      content: "Calculadora Desenvolvimento Infantil 2025 | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "Acompanhe o desenvolvimento da criança com gráficos de crescimento. Calcule percentis de altura e peso, marcos do desenvolvimento. Ferramenta gratuita para pais e pediatras.",
    },
    {
      property: "og:image",
      content:
        "https://www.calculadoraonlinebr.com.br/images/calculadora-desenvolvimento-infantil.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Desenvolvimento Infantil - Gráficos de Crescimento e Percentis",
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
      content: "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Desenvolvimento Infantil 2025 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "Acompanhe o desenvolvimento da criança com gráficos de crescimento. Calcule percentis de altura e peso, marcos do desenvolvimento. Ferramenta gratuita para pais e pediatras.",
    },
    {
      name: "twitter:image",
      content:
        "https://www.calculadoraonlinebr.com.br/images/calculadora-desenvolvimento-infantil.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Desenvolvimento Infantil - Acompanhe o crescimento",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Desenvolvimento Infantil 2025",
        description:
          "Ferramenta gratuita para acompanhar o crescimento e desenvolvimento de crianças. Calcule percentis de altura e peso, marcos do desenvolvimento baseados em padrões da OMS.",
        url: "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
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
          url: "https://calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://calculadoraonlinebr.com.br/android-chrome-192x192.webp",
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
          "@id": "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
          name: "Calculadora de Desenvolvimento Infantil 2025 - Percentis e Crescimento",
          description:
            "Monitore o crescimento infantil com precisão. Calcule percentis de altura e peso, acompanhe marcos do desenvolvimento baseados em padrões da OMS. Ferramenta essencial para pais e profissionais da saúde.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://calculadoraonlinebr.com.br/search?q={search_term_string}",
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
                item: "https://calculadoraonlinebr.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://calculadoraonlinebr.com.br/calculadoras",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Saúde",
                item: "https://calculadoraonlinebr.com.br/calculadoras/saude",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Desenvolvimento Infantil",
                item: "https://calculadoraonlinebr.com.br/calculadoras/saude/desenvolvimento-infantil",
              },
            ],
          },
        },
        about: {
          "@type": "MedicalCondition",
          name: "Desenvolvimento Infantil",
          description:
            "Processo de crescimento físico, cognitivo, emocional e social das crianças, monitorado através de percentis de altura, peso e marcos do desenvolvimento",
          category: "Pediatrics",
        },
        featureList: [
          "Cálculo de percentis de altura e peso baseados na OMS",
          "Gráficos de crescimento interativos",
          "Marcos do desenvolvimento por idade",
          "Comparação com padrões de referência",
          "Análise de tendências de crescimento",
          "Interface otimizada para mobile",
          "Dados não armazenados garantindo privacidade",
          "Ferramenta educacional para pais e profissionais",
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
            name: "O que são percentis de crescimento?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Percentis de crescimento comparam o tamanho da sua criança com outras crianças da mesma idade e sexo. Por exemplo, se a criança está no percentil 50 de altura, significa que é mais alta que 50% das crianças da mesma idade.",
            },
          },
          {
            "@type": "Question",
            name: "Qual percentil é considerado normal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Percentis entre 10 e 90 são considerados dentro da normalidade. O mais importante é que a criança mantenha um padrão de crescimento consistente ao longo do tempo, independente do percentil específico.",
            },
          },
          {
            "@type": "Question",
            name: "Com que frequência devo monitorar o crescimento?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para bebês: mensalmente até 6 meses, depois a cada 2-3 meses. Para crianças maiores: a cada 3-6 meses. Consulte sempre um pediatra para acompanhamento profissional regular.",
            },
          },
          {
            "@type": "Question",
            name: "Esta calculadora substitui consulta médica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não! Esta ferramenta é apenas educacional e informativa. Para avaliação adequada do desenvolvimento infantil, diagnósticos ou orientações de saúde, sempre consulte um pediatra qualificado.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora de Desenvolvimento Infantil",
        description:
          "Aprenda a monitorar o crescimento da criança usando nossa calculadora de percentis baseada em padrões da OMS",
        step: [
          {
            "@type": "HowToStep",
            name: "Insira dados da criança",
            text: "Digite a data de nascimento, altura atual, peso atual e selecione o sexo da criança.",
          },
          {
            "@type": "HowToStep",
            name: "Calcule os percentis",
            text: "Clique em 'Calcular' para obter os percentis de altura e peso comparados aos padrões da OMS.",
          },
          {
            "@type": "HowToStep",
            name: "Analise os resultados",
            text: "Veja os gráficos de crescimento, percentis atuais e marcos do desenvolvimento esperados para a idade.",
          },
          {
            "@type": "HowToStep",
            name: "Consulte um pediatra",
            text: "Use os resultados como referência para discussão com o pediatra da criança durante consultas regulares.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de Desenvolvimento Infantil Online",
          },
        ],
      }),
    },
  ];
};

interface DevelopmentMilestone {
  age: number; // in months
  milestones: string[];
}

interface ChildDevelopmentResult {
  ageInMonths: number;
  ageDisplay: string;
  heightPercentile: number;
  weightPercentile: number;
  heightStatus: "baixa" | "normal" | "alta";
  weightStatus: "baixo" | "normal" | "alto" | "sobrepeso";
  milestones: DevelopmentMilestone;
  bmi: number;
  bmiStatus: string;
  nextMilestones: DevelopmentMilestone;
  growthTrend: "normal" | "attention" | "concern";
}

interface ValidationErrors {
  birthDate?: string;
  height?: string;
  weight?: string;
  gender?: string;
}

export default function ChildDevelopmentCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState<ChildDevelopmentResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "desenvolvimento-infantil",
    category: "saude",
  });
  useFormTracking("desenvolvimento-infantil");
  useIndexNow("/calculadoras/saude/desenvolvimento-infantil");

  const parseNumber = (v: string): number => {
    const n = parseFloat(v.replace(",", "."));
    return isNaN(n) ? 0 : n;
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const calculateAgeInMonths = (birthDate: Date): number => {
    const today = new Date();
    const ageInMs = today.getTime() - birthDate.getTime();
    return ageInMs / (1000 * 60 * 60 * 24 * 30.44); // approximate months
  };

  const formatAgeDisplay = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.floor(months % 12);

    if (years === 0) {
      return `${remainingMonths} meses`;
    } else if (years === 1) {
      return remainingMonths === 0 ? "1 ano" : `1 ano e ${remainingMonths} meses`;
    } else {
      return remainingMonths === 0 ? `${years} anos` : `${years} anos e ${remainingMonths} meses`;
    }
  };

  // Gender-specific percentile calculation for 0-5 years (0-60 months)
  const calculatePercentile = (
    value: number,
    ageMonths: number,
    type: "height" | "weight",
    isMale: boolean
  ): number => {
    // WHO-based growth curves for 0-60 months with gender distinction

    if (type === "height") {
      let expectedHeight: number;
      let standardDeviation: number;
      
      if (ageMonths <= 24) {
        // 0-24 months: rapid growth (gender-specific)
        const birthHeight = isMale ? 50.0 : 49.0; // Male vs Female birth height
        const growthRate = isMale ? 2.3 : 2.1; // Slightly different growth rates
        expectedHeight = birthHeight + (ageMonths * growthRate) - (ageMonths * ageMonths * 0.02);
        standardDeviation = 2.5 + (ageMonths * 0.1);
      } else {
        // 24-60 months: steady growth (gender-specific)
        const height24m = isMale ? 87.0 : 85.0; // Male vs Female at 24 months
        const growthRate = isMale ? 0.65 : 0.6; // Males grow slightly faster
        expectedHeight = height24m + ((ageMonths - 24) * growthRate);
        standardDeviation = 4.0;
      }
      
      const zScore = (value - expectedHeight) / standardDeviation;
      return Math.round(Math.max(1, Math.min(99, normalCDFToPercentile(zScore))));
      
    } else {
      // Weight calculation (gender-specific)
      let expectedWeight: number;
      let standardDeviation: number;
      
      if (ageMonths <= 24) {
        // 0-24 months: rapid weight gain (gender-specific)
        const birthWeight = isMale ? 3.4 : 3.2; // Male vs Female birth weight
        const weightGain = isMale ? 0.42 : 0.38; // Males gain weight slightly faster
        expectedWeight = birthWeight + (ageMonths * weightGain) - (ageMonths * ageMonths * 0.005);
        standardDeviation = 0.8 + (ageMonths * 0.05);
      } else {
        // 24-60 months: slower weight gain (gender-specific)
        const weight24m = isMale ? 12.2 : 11.5; // Male vs Female at 24 months
        const weightGain = isMale ? 0.22 : 0.20; // Males continue to gain slightly more
        expectedWeight = weight24m + ((ageMonths - 24) * weightGain);
        standardDeviation = 2.0;
      }
      
      const zScore = (value - expectedWeight) / standardDeviation;
      return Math.round(Math.max(1, Math.min(99, normalCDFToPercentile(zScore))));
    }
  };

  // Helper function to convert z-score to percentile
  const normalCDFToPercentile = (z: number): number => {
    // Approximation of normal CDF for z-score to percentile conversion
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    
    if (z > 0) prob = 1 - prob;
    
    return prob * 100;
  };

  // Generate growth curve data for clinical chart (0-60 months) - Gender-specific
  const generateGrowthCurveData = (type: "height" | "weight", isMale: boolean) => {
    const months = [];
    const percentiles = { P3: [], P10: [], P25: [], P50: [], P75: [], P90: [], P97: [] };
    
    // Generate data points for 0-60 months (every 3 months for smoother curves)
    for (let month = 0; month <= 60; month += 3) {
      months.push(month);
      
      if (type === "height") {
        // Height curve values (cm) - gender-specific
        let baseHeight: number;
        if (month <= 24) {
          const birthHeight = isMale ? 50.0 : 49.0;
          const growthRate = isMale ? 2.3 : 2.1;
          baseHeight = birthHeight + (month * growthRate) - (month * month * 0.02);
        } else {
          const height24m = isMale ? 87.0 : 85.0;
          const growthRate = isMale ? 0.65 : 0.6;
          baseHeight = height24m + ((month - 24) * growthRate);
        }
        
        const stdDev = 4.0;
        percentiles.P3.push(Math.round(baseHeight - 1.88 * stdDev));
        percentiles.P10.push(Math.round(baseHeight - 1.28 * stdDev));
        percentiles.P25.push(Math.round(baseHeight - 0.67 * stdDev));
        percentiles.P50.push(Math.round(baseHeight));
        percentiles.P75.push(Math.round(baseHeight + 0.67 * stdDev));
        percentiles.P90.push(Math.round(baseHeight + 1.28 * stdDev));
        percentiles.P97.push(Math.round(baseHeight + 1.88 * stdDev));
      } else {
        // Weight curve values (kg) - gender-specific
        let baseWeight: number;
        if (month <= 24) {
          const birthWeight = isMale ? 3.4 : 3.2;
          const weightGain = isMale ? 0.42 : 0.38;
          baseWeight = birthWeight + (month * weightGain) - (month * month * 0.005);
        } else {
          const weight24m = isMale ? 12.2 : 11.5;
          const weightGain = isMale ? 0.22 : 0.20;
          baseWeight = weight24m + ((month - 24) * weightGain);
        }
        
        const stdDev = 2.0;
        percentiles.P3.push(parseFloat((baseWeight - 1.88 * stdDev).toFixed(1)));
        percentiles.P10.push(parseFloat((baseWeight - 1.28 * stdDev).toFixed(1)));
        percentiles.P25.push(parseFloat((baseWeight - 0.67 * stdDev).toFixed(1)));
        percentiles.P50.push(parseFloat(baseWeight.toFixed(1)));
        percentiles.P75.push(parseFloat((baseWeight + 0.67 * stdDev).toFixed(1)));
        percentiles.P90.push(parseFloat((baseWeight + 1.28 * stdDev).toFixed(1)));
        percentiles.P97.push(parseFloat((baseWeight + 1.88 * stdDev).toFixed(1)));
      }
    }
    
    return { months, percentiles };
  };

  // Find child's position on the curve
  const getChildPositionOnCurve = (value: number, percentile: number, type: "height" | "weight", isMale: boolean) => {
    const curveData = generateGrowthCurveData(type, isMale);
    const childAge = result ? Math.round(result.ageInMonths / 3) * 3 : 0;
    const monthIndex = curveData.months.indexOf(childAge);
    
    if (monthIndex === -1) return null;
    
    return {
      x: monthIndex,
      y: parseFloat(value.toString()),
      percentile
    };
  };

  const getHeightStatus = (percentile: number): "baixa" | "normal" | "alta" => {
    if (percentile < 10) return "baixa";
    if (percentile > 90) return "alta";
    return "normal";
  };

  const getWeightStatus = (percentile: number): "baixo" | "normal" | "alto" | "sobrepeso" => {
    if (percentile < 10) return "baixo";
    if (percentile > 85 && percentile <= 95) return "alto";
    if (percentile > 95) return "sobrepeso";
    return "normal";
  };

  const getDevelopmentMilestones = (ageInMonths: number): DevelopmentMilestone => {
    const milestoneData: DevelopmentMilestone[] = [
      {
        age: 2,
        milestones: [
          "Sorri responsivamente",
          "Acompanha objetos com os olhos",
          "Sustenta cabeça por breves momentos",
        ],
      },
      {
        age: 4,
        milestones: [
          "Sorri espontaneamente",
          "Sustenta cabeça firmemente",
          "Emite sons e balbucios",
        ],
      },
      {
        age: 6,
        milestones: [
          "Senta com apoio",
          "Transfere objetos de uma mão para outra",
          "Reconhece pessoas familiares",
        ],
      },
      { age: 9, milestones: ["Senta sem apoio", "Engatinha", "Diz 'mama' e 'papa' específicos"] },
      { age: 12, milestones: ["Anda com apoio", "Diz primeiras palavras", "Imita gestos simples"] },
      { age: 18, milestones: ["Anda sozinho", "Fala 10-20 palavras", "Usa colher para comer"] },
      { age: 24, milestones: ["Corre", "Combina 2 palavras", "Imita atividades domésticas"] },
      {
        age: 36,
        milestones: [
          "Sobe escadas alternando os pés",
          "Fala em frases",
          "Brinca com outras crianças",
        ],
      },
      { age: 48, milestones: ["Pula em um pé", "Conta até 10", "Desenha figuras simples"] },
      { age: 60, milestones: ["Anda de bicicleta", "Conhece cores e formas", "Brinca em grupos"] },
    ];

    // Find closest milestone age
    let closest = milestoneData[0];
    for (const milestone of milestoneData) {
      if (Math.abs(milestone.age - ageInMonths) < Math.abs(closest.age - ageInMonths)) {
        closest = milestone;
      }
    }
    return closest;
  };

  const getNextMilestones = (ageInMonths: number): DevelopmentMilestone => {
    const milestoneData: DevelopmentMilestone[] = [
      {
        age: 2,
        milestones: [
          "Sorri responsivamente",
          "Acompanha objetos com os olhos",
          "Sustenta cabeça por breves momentos",
        ],
      },
      {
        age: 4,
        milestones: [
          "Sorri espontaneamente",
          "Sustenta cabeça firmemente",
          "Emite sons e balbucios",
        ],
      },
      {
        age: 6,
        milestones: [
          "Senta com apoio",
          "Transfere objetos de uma mão para outra",
          "Reconhece pessoas familiares",
        ],
      },
      { age: 9, milestones: ["Senta sem apoio", "Engatinha", "Diz 'mama' e 'papa' específicos"] },
      { age: 12, milestones: ["Anda com apoio", "Diz primeiras palavras", "Imita gestos simples"] },
      { age: 18, milestones: ["Anda sozinho", "Fala 10-20 palavras", "Usa colher para comer"] },
      { age: 24, milestones: ["Corre", "Combina 2 palavras", "Imita atividades domésticas"] },
      {
        age: 36,
        milestones: [
          "Sobe escadas alternando os pés",
          "Fala em frases",
          "Brinca com outras crianças",
        ],
      },
      { age: 48, milestones: ["Pula em um pé", "Conta até 10", "Desenha figuras simples"] },
      { age: 60, milestones: ["Anda de bicicleta", "Conhece cores e formas", "Brinca em grupos"] },
    ];

    for (const milestone of milestoneData) {
      if (milestone.age > ageInMonths) {
        return milestone;
      }
    }
    return milestoneData[milestoneData.length - 1];
  };

  const calculateBMI = (weightKg: number, heightCm: number): number => {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  };

  const getBMIStatus = (bmi: number, ageInMonths: number): string => {
    if (ageInMonths < 24) return "IMC não aplicável para menores de 2 anos";
    if (bmi < 15) return "Abaixo do peso";
    if (bmi < 18.5) return "Peso normal";
    if (bmi < 25) return "Sobrepeso";
    return "Obesidade";
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const birth = parseDate(birthDate);
    if (!birth) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
      ok = false;
    } else if (birth > new Date()) {
      newErrors.birthDate = "Data não pode ser no futuro";
      ok = false;
    } else if (calculateAgeInMonths(birth) > 60) {
      newErrors.birthDate = "Calculadora adequada para crianças de 0 a 5 anos apenas";
      ok = false;
    }

    const h = parseNumber(height);
    if (!h || h < 40 || h > 150) {
      newErrors.height = "Altura deve estar entre 40 e 150 cm";
      ok = false;
    }

    const w = parseNumber(weight);
    if (!w || w < 2 || w > 50) {
      newErrors.weight = "Peso deve estar entre 2 e 50 kg";
      ok = false;
    }

    if (!gender) {
      newErrors.gender = "Selecione o sexo da criança";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");

    try {
      const birthDateObj = parseDate(birthDate)!;
      const h = parseNumber(height);
      const w = parseNumber(weight);
      const isMale = gender === "masculino";

      const ageInMonths = calculateAgeInMonths(birthDateObj);
      const heightPercentile = calculatePercentile(h, ageInMonths, "height", isMale);
      const weightPercentile = calculatePercentile(w, ageInMonths, "weight", isMale);

      const bmi = calculateBMI(w, h);
      const milestones = getDevelopmentMilestones(ageInMonths);
      const nextMilestones = getNextMilestones(ageInMonths);

      const res: ChildDevelopmentResult = {
        ageInMonths,
        ageDisplay: formatAgeDisplay(ageInMonths),
        heightPercentile,
        weightPercentile,
        heightStatus: getHeightStatus(heightPercentile),
        weightStatus: getWeightStatus(weightPercentile),
        milestones,
        bmi,
        bmiStatus: getBMIStatus(bmi, ageInMonths),
        nextMilestones,
        growthTrend:
          heightPercentile >= 10 &&
          heightPercentile <= 90 &&
          weightPercentile >= 10 &&
          weightPercentile <= 90
            ? "normal"
            : "attention",
      };

      setResult(res);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ birthDate: "Erro no cálculo. Verifique os dados inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setBirthDate("");
    setHeight("");
    setWeight("");
    setGender("");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Desenvolvimento Infantil</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Desenvolvimento Infantil 2025 – Percentis e Crescimento
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Monitore o <strong className="text-health-red">crescimento da criança</strong> com
          precisão. Calcule{" "}
          <strong className="text-primary-blue-dark">percentis de altura e peso</strong>, acompanhe
          marcos do desenvolvimento baseados em padrões da OMS.
        </p>
        <div className="bg-health-red-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            👶 <strong>Percentis OMS</strong> • 📊 <strong>Gráficos de Crescimento</strong> • 🎯{" "}
            <strong>Marcos do Desenvolvimento</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Dados da Criança</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Linha 1: Data de nascimento */}
          <div className="mb-6">
            <div className="mx-auto max-w-md">
              <Input
                type="date"
                label="Data de Nascimento"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.birthDate} />
              <div className="mt-1 text-center text-xs text-text-secondary">
                Data de nascimento da criança
              </div>
            </div>
          </div>

          {/* Linha 2: Sexo da criança */}
          <div className="mb-6">
            <div className="mx-auto max-w-sm">
              <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                👶 Sexo da Criança:
              </h3>
              <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setGender("masculino")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    gender === "masculino"
                      ? "bg-primary-blue text-white"
                      : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
                  }`}
                >
                  👦 Masculino
                </button>
                <button
                  type="button"
                  onClick={() => setGender("feminino")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    gender === "feminino"
                      ? "bg-primary-blue text-white"
                      : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
                  }`}
                >
                  👧 Feminino
                </button>
              </div>
              <ErrorMessage error={errors.gender} />
              <div className="mt-1 text-center text-xs text-text-secondary">
                Necessário para cálculo dos percentis
              </div>
            </div>
          </div>

          {/* Linha 3: Altura e peso */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Input
                type="number"
                label="Altura Atual (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="70"
                min="40"
                max="150"
                step="0.1"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.height} />
              <div className="mt-1 text-xs text-text-secondary">
                Altura da criança em centímetros
              </div>
            </div>
            <div>
              <Input
                type="number"
                label="Peso Atual (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="8.5"
                min="2"
                max="50"
                step="0.1"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.weight} />
              <div className="mt-1 text-xs text-text-secondary">Peso da criança em quilogramas</div>
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
        <Card ref={resultRef} className="bg-health-red-soft border-2 border-health-red">
          <CardHeader>
            <CardTitle as="h3" className="text-health-red">
              📊 Análise do Desenvolvimento Infantil
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Informações básicas */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border-l-4 border-primary-blue-dark bg-gray-900 p-4 text-center">
                <div className="mb-1 text-xl font-bold text-primary-blue-dark">
                  {result.ageDisplay}
                </div>
                <div className="text-sm text-text-secondary">Idade Atual</div>
              </div>
              <div className="rounded-lg border-l-4 border-system-success bg-gray-900 p-4 text-center">
                <div className="mb-1 text-xl font-bold text-system-success">
                  P{result.heightPercentile}
                </div>
                <div className="text-sm text-text-secondary">Percentil Altura</div>
                <div className="mt-1 text-xs text-system-success">
                  Status: {result.heightStatus}
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-system-warning bg-gray-900 p-4 text-center sm:col-span-2 lg:col-span-1">
                <div className="mb-1 text-xl font-bold text-system-warning">
                  P{result.weightPercentile}
                </div>
                <div className="text-sm text-text-secondary">Percentil Peso</div>
                <div className="mt-1 text-xs text-system-warning">
                  Status: {result.weightStatus}
                </div>
              </div>
            </div>

            {/* Resumo e IMC */}
            <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo da Análise</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm text-text-secondary">
                    <strong>Altura:</strong> {height} cm (Percentil {result.heightPercentile}) -{" "}
                    {result.heightStatus}
                  </p>
                  <p className="text-sm text-text-secondary">
                    <strong>Peso:</strong> {weight} kg (Percentil {result.weightPercentile}) -{" "}
                    {result.weightStatus}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-text-secondary">
                    <strong>IMC:</strong> {result.bmi.toFixed(1)} kg/m²
                  </p>
                  <p className="text-sm text-text-secondary">
                    <strong>Status IMC:</strong> {result.bmiStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Gráficos de Crescimento */}
            <div className="mb-6">
              <h4 className="mb-4 text-lg font-semibold text-text-primary">
                📈 Gráficos de Crescimento
              </h4>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Gráfico de Altura */}
                <div className="rounded-lg bg-gray-900 p-4">
                  <h5 className="mb-3 text-center font-semibold text-system-success">
                    Crescimento Estatural - {gender === "masculino" ? "Meninos" : "Meninas"} (0-5 anos)
                  </h5>
                  <div className="h-80">
                    <Line
                      data={(() => {
                        const isMale = gender === "masculino";
                        const heightCurve = generateGrowthCurveData("height", isMale);
                        const childPos = getChildPositionOnCurve(parseNumber(height), result.heightPercentile, "height", isMale);
                        
                        // Create labels for months (convert to user-friendly format)
                        const monthLabels = heightCurve.months.map(month => {
                          if (month === 0) return "0";
                          if (month < 12) return `${month}m`;
                          const years = Math.floor(month / 12);
                          const remainingMonths = month % 12;
                          return remainingMonths === 0 ? `${years}a` : `${years}a${remainingMonths}m`;
                        });
                        
                        return {
                          labels: monthLabels,
                          datasets: [
                            {
                              label: "P3",
                              data: heightCurve.percentiles.P3,
                              borderColor: "#EF4444",
                              backgroundColor: "transparent",
                              borderWidth: 1.5,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P10",
                              data: heightCurve.percentiles.P10,
                              borderColor: "#F59E0B",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P25",
                              data: heightCurve.percentiles.P25,
                              borderColor: "#10B981",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P50",
                              data: heightCurve.percentiles.P50,
                              borderColor: "#3B82F6",
                              backgroundColor: "transparent",
                              borderWidth: 3,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P75",
                              data: heightCurve.percentiles.P75,
                              borderColor: "#10B981",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P90",
                              data: heightCurve.percentiles.P90,
                              borderColor: "#F59E0B",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P97",
                              data: heightCurve.percentiles.P97,
                              borderColor: "#EF4444",
                              backgroundColor: "transparent",
                              borderWidth: 1.5,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            ...(childPos ? [{
                              label: `${isMale ? "Menino" : "Menina"}`,
                              data: heightCurve.months.map((_, index) => index === childPos.x ? childPos.y : null),
                              backgroundColor: result.heightPercentile >= 10 && result.heightPercentile <= 90 ? "#10B981" : "#EF4444",
                              borderColor: "#FFFFFF",
                              pointRadius: 6,
                              pointBorderWidth: 2,
                              showLine: false,
                            }] : [])
                          ],
                        };
                      })()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                              color: "#9CA3AF",
                              font: { size: 10 },
                              usePointStyle: true,
                            },
                          },
                          tooltip: {
                            callbacks: {
                              title: (context) => `Idade: ${context[0]?.label || ''}`,
                              label: (context) => {
                                if (context.datasetIndex === 7) {
                                  return `Sua criança: ${context.parsed.y} cm (P${result.heightPercentile})`;
                                }
                                return `${context.dataset.label}: ${context.parsed.y} cm`;
                              },
                            },
                          },
                        },
                        scales: {
                          y: {
                            min: 45,
                            max: 125,
                            title: {
                              display: true,
                              text: "Altura (cm)",
                              color: "#9CA3AF",
                            },
                            ticks: {
                              color: "#9CA3AF",
                              stepSize: 5,
                            },
                            grid: {
                              color: "#374151",
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: "Idade (meses)",
                              color: "#9CA3AF",
                            },
                            ticks: {
                              color: "#9CA3AF",
                            },
                            grid: {
                              color: "#374151",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center text-xs text-text-secondary">
                    Altura: <strong>{height} cm</strong> • Percentil: 
                    <strong className={result.heightPercentile >= 10 && result.heightPercentile <= 90 ? "text-system-success" : "text-system-error"}>
                      P{result.heightPercentile}
                    </strong> ({result.heightStatus})
                  </div>
                </div>

                {/* Gráfico de Peso */}
                <div className="rounded-lg bg-gray-900 p-4">
                  <h5 className="mb-3 text-center font-semibold text-system-warning">
                    Crescimento Ponderal - {gender === "masculino" ? "Meninos" : "Meninas"} (0-5 anos)
                  </h5>
                  <div className="h-80">
                    <Line
                      data={(() => {
                        const isMale = gender === "masculino";
                        const weightCurve = generateGrowthCurveData("weight", isMale);
                        const childPos = getChildPositionOnCurve(parseNumber(weight), result.weightPercentile, "weight", isMale);
                        
                        // Create labels for months (convert to user-friendly format)
                        const monthLabels = weightCurve.months.map(month => {
                          if (month === 0) return "0";
                          if (month < 12) return `${month}m`;
                          const years = Math.floor(month / 12);
                          const remainingMonths = month % 12;
                          return remainingMonths === 0 ? `${years}a` : `${years}a${remainingMonths}m`;
                        });
                        
                        return {
                          labels: monthLabels,
                          datasets: [
                            {
                              label: "P3",
                              data: weightCurve.percentiles.P3,
                              borderColor: "#EF4444",
                              backgroundColor: "transparent",
                              borderWidth: 1.5,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P10",
                              data: weightCurve.percentiles.P10,
                              borderColor: "#F59E0B",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P25",
                              data: weightCurve.percentiles.P25,
                              borderColor: "#10B981",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P50",
                              data: weightCurve.percentiles.P50,
                              borderColor: "#3B82F6",
                              backgroundColor: "transparent",
                              borderWidth: 3,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P75",
                              data: weightCurve.percentiles.P75,
                              borderColor: "#10B981",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P90",
                              data: weightCurve.percentiles.P90,
                              borderColor: "#F59E0B",
                              backgroundColor: "transparent",
                              borderWidth: 2,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            {
                              label: "P97",
                              data: weightCurve.percentiles.P97,
                              borderColor: "#EF4444",
                              backgroundColor: "transparent",
                              borderWidth: 1.5,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                            ...(childPos ? [{
                              label: `${isMale ? "Menino" : "Menina"}`,
                              data: weightCurve.months.map((_, index) => index === childPos.x ? childPos.y : null),
                              backgroundColor: result.weightPercentile >= 10 && result.weightPercentile <= 90 ? "#10B981" : "#EF4444",
                              borderColor: "#FFFFFF",
                              pointRadius: 6,
                              pointBorderWidth: 2,
                              showLine: false,
                            }] : [])
                          ],
                        };
                      })()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                              color: "#9CA3AF",
                              font: { size: 10 },
                              usePointStyle: true,
                            },
                          },
                          tooltip: {
                            callbacks: {
                              title: (context) => `Idade: ${context[0]?.label || ''}`,
                              label: (context) => {
                                if (context.datasetIndex === 7) {
                                  return `Sua criança: ${context.parsed.y} kg (P${result.weightPercentile})`;
                                }
                                return `${context.dataset.label}: ${context.parsed.y} kg`;
                              },
                            },
                          },
                        },
                        scales: {
                          y: {
                            min: 2,
                            max: 25,
                            title: {
                              display: true,
                              text: "Peso (kg)",
                              color: "#9CA3AF",
                            },
                            ticks: {
                              color: "#9CA3AF",
                              stepSize: 2,
                            },
                            grid: {
                              color: "#374151",
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: "Idade (meses)",
                              color: "#9CA3AF",
                            },
                            ticks: {
                              color: "#9CA3AF",
                            },
                            grid: {
                              color: "#374151",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center text-xs text-text-secondary">
                    Peso: <strong>{weight} kg</strong> • Percentil: 
                    <strong className={result.weightPercentile >= 10 && result.weightPercentile <= 90 ? "text-system-success" : "text-system-error"}>
                      P{result.weightPercentile}
                    </strong> ({result.weightStatus})
                  </div>
                </div>
              </div>

              {/* Legenda dos gráficos */}
              <div className="mt-4 rounded-lg bg-primary-blue/10 p-3">
                <h6 className="mb-3 text-sm font-semibold text-text-primary">
                  📋 Como interpretar os gráficos:
                </h6>
                <div className="grid grid-cols-1 gap-2 text-xs text-text-secondary sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary-blue"></span>
                    <span>Curva de referência (OMS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-8 rounded border border-system-success/40 bg-system-success/20"></span>
                    <span>Faixa normal (P10-P90)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${result.heightPercentile >= 10 && result.heightPercentile <= 90 ? "bg-system-success" : "bg-system-warning"}`}
                    ></span>
                    <span>Posição da sua criança</span>
                  </div>
                  <div className="col-span-full mt-2 space-y-1">
                    <div>
                      <strong>P10-P90:</strong> Faixa considerada normal
                    </div>
                    <div>
                      <strong>P50:</strong> Mediana (50% acima, 50% abaixo)
                    </div>
                    <div className="text-xs text-text-secondary/80">
                      🟢 <strong>Verde:</strong> Dentro da normalidade • 🟡{" "}
                      <strong>Laranja:</strong> Atenção necessária
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status geral */}
            <div
              className={`mb-6 rounded-lg p-4 ${
                result.growthTrend === "normal"
                  ? "border border-system-success/20 bg-system-success/10"
                  : "border border-system-warning/20 bg-system-warning/10"
              }`}
            >
              <h4
                className={`mb-2 font-semibold ${
                  result.growthTrend === "normal" ? "text-system-success" : "text-system-warning"
                }`}
              >
                {result.growthTrend === "normal" ? "✅ Crescimento Normal" : "⚠️ Requer Atenção"}
              </h4>
              <p className="text-sm text-text-secondary">
                {result.growthTrend === "normal"
                  ? "Os percentis de altura e peso estão dentro da faixa normal. Continue monitorando o crescimento regularmente."
                  : "Alguns valores estão fora da faixa típica. Recomenda-se consultar um pediatra para avaliação mais detalhada."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Marcos do Desenvolvimento - Destaque Principal */}
      {result && (
        <Card className="border-2 border-system-success bg-gradient-to-r from-system-success/5 to-primary-blue/5">
          <CardHeader>
            <CardTitle as="h2" className="text-2xl font-bold text-center text-system-success">
              🎯 Marcos de Desenvolvimento - Checklist Interativo
            </CardTitle>
            <p className="text-center text-sm text-text-secondary mt-2">
              Acompanhe o progresso da sua criança nos marcos esperados para a idade
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Marcos Atuais */}
              <Card className="border-2 border-system-success bg-system-success/5">
                <CardHeader>
                  <CardTitle as="h3" className="text-system-success text-center">
                    🎯 Marcos Esperados para a Idade
                  </CardTitle>
                  <div className="text-center">
                    <span className="inline-block rounded-lg bg-system-success/20 px-3 py-1 text-sm font-semibold text-system-success-dark">
                      {result.ageDisplay} ({result.milestones.age} meses)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.milestones.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-system-success/10 border border-system-success/20">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-system-success flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-text-primary flex-1">{milestone}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-system-success/15 rounded-lg border-l-4 border-system-success">
                    <p className="text-sm text-system-success-dark">
                      🎆 <strong>Parabéns!</strong> Estes são os marcos esperados para a idade atual da criança. 
                      Cada conquista é uma vitória importante no desenvolvimento!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Marcos */}
              <Card className="border-2 border-primary-blue bg-primary-blue/5">
                <CardHeader>
                  <CardTitle as="h3" className="text-primary-blue-dark text-center">
                    🔮 Próximos Marcos do Desenvolvimento
                  </CardTitle>
                  <div className="text-center">
                    <span className="inline-block rounded-lg bg-primary-blue/20 px-3 py-1 text-sm font-semibold text-primary-blue-dark">
                      Aos {Math.floor(result.nextMilestones.age / 12)} anos e {result.nextMilestones.age % 12} meses
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.nextMilestones.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-primary-blue/10 border border-primary-blue/20">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-primary-blue flex items-center justify-center">
                            <span className="text-white text-sm">⏳</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-text-primary flex-1">{milestone}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary-blue/15 rounded-lg border-l-4 border-primary-blue">
                    <p className="text-sm text-primary-blue-dark">
                      🌱 <strong>Em breve:</strong> Estes marcos geralmente aparecem nos próximos meses. 
                      Continue estimulando o desenvolvimento com amor e paciência!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Alerta Educativo Destacado */}
            <div className="mt-8 p-4 bg-gradient-to-r from-health-red/10 to-system-warning/10 border-l-4 border-health-red rounded-lg">
              <h4 className="font-bold text-health-red mb-2 flex items-center gap-2">
                ⚠️ Importante Lembrar
              </h4>
              <p className="text-sm text-text-secondary">
                <strong>Cada criança é única!</strong> Estes marcos são referências gerais baseadas em padrões da OMS. 
                Algumas crianças podem alcançar marcos mais cedo ou mais tarde, e isso é completamente normal. 
                <strong className="text-health-red">Em caso de dúvidas, sempre consulte um pediatra.</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Desenvolvimento Infantil - Guia Completo */}
      <Card className="from-health-red-soft border-l-4 border-health-red bg-gradient-to-r to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📚 Desenvolvimento Infantil – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Percentis de Crescimento */}
            <div className="rounded-xl border border-health-red/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-health-red">
                📊 Entendendo os Percentis de Crescimento
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">📏 Percentil de Altura</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Compara a altura da sua criança com outras da mesma idade e sexo. Percentil 50
                    significa que a criança é mais alta que 50% das crianças da mesma idade.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-warning">⚖️ Percentil de Peso</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Avalia se o peso está adequado para a idade. Importante analisar junto com a
                    altura para uma avaliação completa do crescimento.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    📈 Faixas de Normalidade
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Percentil 10-90:</strong> Faixa normal
                    </li>
                    <li>
                      • <strong>Percentil 50:</strong> Mediana (padrão médio)
                    </li>
                    <li>
                      • <strong>Abaixo P10:</strong> Requer avaliação
                    </li>
                    <li>
                      • <strong>Acima P90:</strong> Requer acompanhamento
                    </li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">⚠️ Importante Lembrar</h4>
                  <p className="text-sm text-text-secondary">
                    O percentil não indica "melhor" ou "pior". Uma criança no percentil 20 pode ser
                    perfeitamente saudável se mantiver crescimento consistente.
                  </p>
                </div>
              </div>
            </div>

            {/* Marcos do Desenvolvimento */}
            <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-success">
                🎯 Marcos do Desenvolvimento por Idade
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-health-red">👶 0-12 meses</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Sustentação da cabeça (2-4 meses)</li>
                    <li>• Sentar sem apoio (6-8 meses)</li>
                    <li>• Engatinhar (8-10 meses)</li>
                    <li>• Primeiros passos (10-15 meses)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">👦 1-3 anos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Caminhar sozinho (12-18 meses)</li>
                    <li>• Falar palavras simples (15-20 meses)</li>
                    <li>• Correr e pular (2-3 anos)</li>
                    <li>• Frases de 2-3 palavras (2 anos)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🧒 3-6 anos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Subir escadas alternadamente (3 anos)</li>
                    <li>• Desenhar figuras simples (4 anos)</li>
                    <li>• Andar de bicicleta (5 anos)</li>
                    <li>• Preparação escolar (6 anos)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Desenvolvimento Infantil"
        items={[
          {
            question: "O que são percentis de crescimento?",
            answer:
              "Percentis de crescimento comparam o tamanho da sua criança com outras crianças da mesma idade e sexo. Por exemplo, se a criança está no percentil 50 de altura, significa que é mais alta que 50% das crianças da mesma idade.",
            borderColor: "health-red",
          },
          {
            question: "Qual percentil é considerado normal?",
            answer:
              "Percentis entre 10 e 90 são considerados dentro da normalidade. O mais importante é que a criança mantenha um padrão de crescimento consistente ao longo do tempo, independente do percentil específico.",
            borderColor: "system-success",
          },
          {
            question: "Com que frequência devo monitorar o crescimento?",
            answer:
              "Para bebês: mensalmente até 6 meses, depois a cada 2-3 meses. Para crianças maiores: a cada 3-6 meses. Consulte sempre um pediatra para acompanhamento profissional regular.",
            borderColor: "primary-blue",
          },
          {
            question: "Minha criança não atingiu um marco esperado. Devo me preocupar?",
            answer:
              "Cada criança se desenvolve no seu próprio ritmo. Variações de alguns meses são normais. Se houver atraso significativo em múltiplas áreas ou preocupações persistentes, consulte um pediatra.",
            borderColor: "system-info",
          },
          {
            question: "Esta calculadora substitui consulta médica?",
            answer:
              "Não! Esta ferramenta é apenas educacional e informativa. Para avaliação adequada do desenvolvimento infantil, diagnósticos ou orientações de saúde, sempre consulte um pediatra qualificado.",
            borderColor: "system-error-dark",
          },
          {
            question: "Como interpretar percentis muito altos ou baixos?",
            answer:
              "Percentis extremos (abaixo de 10 ou acima de 90) podem indicar necessidade de avaliação, mas não necessariamente problemas. O mais importante é a consistência do padrão de crescimento ao longo do tempo.",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "👨‍⚕️ Dica Pediátrica Importante",
          content:
            "<strong>Acompanhamento regular:</strong> Mantenha um registro do crescimento, observe marcos do desenvolvimento e faça consultas preventivas regulares. O pediatra é o profissional mais adequado para avaliar o desenvolvimento global da criança.",
        }}
        footerText="<strong>⚠️ Aviso Médico:</strong> Esta ferramenta é educacional. Cada criança é única e se desenvolve em seu próprio ritmo. Para avaliação profissional do desenvolvimento infantil, sempre consulte um pediatra."
      />

      {/* Footer com informações adicionais */}
      <Card className="bg-health-red-soft border-l-4 border-health-red duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-health-red">calculadora de desenvolvimento infantil</strong>{" "}
              utiliza{" "}
              <strong className="text-system-success">padrões de referência baseados na OMS</strong>{" "}
              para calcular percentis de crescimento e marcos esperados. Os cálculos consideram
              idade, sexo e medidas atuais da criança.
            </p>
            <p>
              <strong>Configurações disponíveis:</strong> Data de nascimento, altura e peso atuais,
              sexo da criança. A calculadora gera análise completa de percentis e marcos do
              desenvolvimento.
            </p>
            <p>
              <strong className="text-system-error">⚠️ Importante:</strong> Esta ferramenta é para
              fins educacionais. Para diagnósticos, intervenções ou preocupações sobre o
              desenvolvimento, consulte sempre um <strong>pediatra qualificado</strong>. Cada
              criança se desenvolve em seu próprio ritmo único.
            </p>
            <p className="mt-4 border-t border-health-red/20 pt-3 text-xs opacity-75">
              👶 Percentis OMS • 📊 Gráficos crescimento • 🔒 Dados não armazenados • 📱 Interface
              responsiva • 🎯 Marcos desenvolvimento
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="saude" currentCalculatorId="desenvolvimento-infantil" />
    </div>
  );
}
