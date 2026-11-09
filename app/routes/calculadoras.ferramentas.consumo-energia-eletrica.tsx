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
  Input,
  Label,
  Checkbox,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Calculadora de Consumo de Energia Elétrica 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "🔌⚡ Calcule o consumo de energia elétrica por aparelho! Análise completa kWh/mês, custo da conta de luz, simulação standby e biblioteca com 50+ aparelhos. Reduza sua conta!",
    },
    {
      name: "keywords",
      content:
        "calculadora consumo energia elétrica, kWh aparelho doméstico, quanto custa usar geladeira, consumo ar-condicionado, gasto energia chuveiro elétrico, simulador conta luz, calculadora kWh mensal, consumo standby vampirismo energético, aparelhos que mais gastam energia",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
    },
    {
      property: "og:title",
      content: "Calculadora Consumo Energia Elétrica – Analise kWh por Aparelho",
    },
    {
      property: "og:description",
      content:
        "🔌⚡ Calcule consumo elétrico por aparelho, custo mensal, vampirismo energético. Biblioteca com 50+ aparelhos e análise completa da conta de luz!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og/consumo-energia-eletrica.jpg",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Consumo de Energia Elétrica - Análise por aparelho e custo mensal",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Consumo Energia Elétrica 2026 – Analise por Aparelho",
    },
    {
      name: "twitter:description",
      content:
        "🔌⚡ Calcule kWh, custo mensal, vampirismo energético. Biblioteca com 50+ aparelhos!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og/consumo-energia-eletrica.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Consumo de Energia Elétrica",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Consumo Energia Elétrica" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Consumo de Energia Elétrica - Análise por Aparelho 2026",
        description:
          "Ferramenta completa para calcular consumo de energia elétrica por aparelho. Analise kWh mensal, custo da conta de luz, vampirismo energético e compare diferentes equipamentos domésticos.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-27",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
          name: "Calculadora Consumo Energia Elétrica 2026 - Análise por Aparelho",
          description:
            "Calcule o consumo de energia elétrica de qualquer aparelho doméstico. Análise completa de kWh, custo mensal e vampirismo energético com biblioteca de equipamentos.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
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
                name: "Ferramentas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Consumo de Energia Elétrica",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/consumo-energia-eletrica",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Consumo de Energia Elétrica Residencial",
          description: "Ferramenta para cálculo e análise do consumo de energia elétrica por aparelho doméstico",
          category: "UtilitiesApplication",
        },
        featureList: [
          "Cálculo de consumo kWh por aparelho",
          "Análise de custo mensal da conta de luz",
          "Biblioteca com 50+ aparelhos domésticos",
          "Detecção de vampirismo energético (standby)",
          "Simulação com diferentes tarifas",
          "Comparação entre aparelhos",
          "Cálculo de emissão de CO₂",
          "Recomendações de economia",
          "Interface responsiva mobile-first",
          "Ferramenta 100% gratuita",
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
            name: "Como calcular o consumo de energia elétrica de um aparelho?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use a fórmula: Consumo (kWh) = Potência (W) × Horas de uso × Dias / 1000. Por exemplo: geladeira 150W × 24h × 30 dias = 108 kWh/mês. Multiplique por sua tarifa para obter o custo.",
            },
          },
          {
            "@type": "Question",
            name: "Quais aparelhos mais consomem energia elétrica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Chuveiro elétrico (30-40% da conta), ar-condicionado (20-30%), geladeira antiga (15-20%), aquecedor elétrico (25%), forno elétrico e secadora de roupas são os maiores vilões do consumo.",
            },
          },
          {
            "@type": "Question",
            name: "O que é vampirismo energético e como detectar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Vampirismo é o consumo de aparelhos em standby (modo de espera). TVs, micro-ondas, carregadores conectados consomem energia 24h. Pode representar até 12% da conta de luz mensal.",
            },
          },
        ],
      },
    },
  ];
};

// Base de dados de aparelhos elétricos com potências médias e selo Procel
const APPLIANCES_DATABASE = {
  "Sala de Estar": [
    { name: "TV LED 32\"", power: 120, category: "Entretenimento", procel: "A", standby: 15 },
    { name: "TV LED 50\"", power: 180, category: "Entretenimento", procel: "A", standby: 20 },
    { name: "TV LED 65\"", power: 220, category: "Entretenimento", procel: "A", standby: 25 },
    { name: "TV OLED 55\"", power: 200, category: "Entretenimento", procel: "A", standby: 22 },
    { name: "Ar-condicionado 9000 BTU", power: 1000, category: "Climatização", procel: "A", standby: 5 },
    { name: "Ar-condicionado 12000 BTU", power: 1400, category: "Climatização", procel: "A", standby: 5 },
    { name: "Ar-condicionado 18000 BTU", power: 2000, category: "Climatização", procel: "A", standby: 8 },
    { name: "Ventilador de teto", power: 120, category: "Climatização", procel: "A", standby: 0 },
    { name: "Ventilador de mesa", power: 60, category: "Climatização", procel: "B", standby: 0 },
    { name: "Soundbar", power: 50, category: "Entretenimento", procel: "B", standby: 8 },
    { name: "Videogame (PS5/Xbox)", power: 150, category: "Entretenimento", procel: "B", standby: 12 },
    { name: "Chromecast/Apple TV", power: 8, category: "Entretenimento", procel: "A", standby: 3 },
  ],
  "Quarto": [
    { name: "TV LED 32\"", power: 120, category: "Entretenimento", procel: "A", standby: 15 },
    { name: "Ar-condicionado 9000 BTU", power: 1000, category: "Climatização", procel: "A", standby: 5 },
    { name: "Ar-condicionado 12000 BTU", power: 1400, category: "Climatização", procel: "A", standby: 5 },
    { name: "Ventilador de teto", power: 120, category: "Climatização", procel: "A", standby: 0 },
    { name: "Carregador celular", power: 5, category: "Eletrônicos", procel: "A", standby: 2 },
    { name: "Notebook", power: 65, category: "Eletrônicos", procel: "A", standby: 3 },
    { name: "Abajur LED", power: 12, category: "Iluminação", procel: "A", standby: 0 },
    { name: "Umidificador", power: 25, category: "Saúde", procel: "B", standby: 2 },
  ],
  "Cozinha": [
    { name: "Geladeira duplex 300L", power: 150, category: "Eletrodomésticos", procel: "A", standby: 0 },
    { name: "Geladeira frost-free 400L", power: 180, category: "Eletrodomésticos", procel: "A", standby: 0 },
    { name: "Geladeira side by side 500L", power: 250, category: "Eletrodomésticos", procel: "B", standby: 0 },
    { name: "Freezer horizontal 300L", power: 200, category: "Eletrodomésticos", procel: "A", standby: 0 },
    { name: "Micro-ondas 30L", power: 1400, category: "Eletrodomésticos", procel: "B", standby: 3 },
    { name: "Forno elétrico 50L", power: 1800, category: "Eletrodomésticos", procel: "B", standby: 0 },
    { name: "Cooktop elétrico 4 bocas", power: 7000, category: "Eletrodomésticos", procel: "C", standby: 0 },
    { name: "Liquidificador", power: 600, category: "Eletrodomésticos", procel: "A", standby: 0 },
    { name: "Cafeteira elétrica", power: 800, category: "Eletrodomésticos", procel: "B", standby: 2 },
    { name: "Torradeira", power: 1200, category: "Eletrodomésticos", procel: "B", standby: 0 },
    { name: "Exaustor", power: 200, category: "Ventilação", procel: "B", standby: 0 },
    { name: "Cooktop por indução", power: 3500, category: "Eletrodomésticos", procel: "A", standby: 3 },
    { name: "Lava-louças", power: 1500, category: "Eletrodomésticos", procel: "A", standby: 5 },
  ],
  "Banheiro": [
    { name: "Chuveiro elétrico 4500W", power: 4500, category: "Aquecimento", procel: "C", standby: 0 },
    { name: "Chuveiro elétrico 5500W", power: 5500, category: "Aquecimento", procel: "C", standby: 0 },
    { name: "Chuveiro elétrico 6800W", power: 6800, category: "Aquecimento", procel: "C", standby: 0 },
    { name: "Ducha eletrônica", power: 7500, category: "Aquecimento", procel: "B", standby: 8 },
    { name: "Secador de cabelo", power: 1800, category: "Beleza", procel: "B", standby: 0 },
    { name: "Chapinha/Prancha", power: 200, category: "Beleza", procel: "B", standby: 0 },
    { name: "Exaustor", power: 180, category: "Ventilação", procel: "B", standby: 0 },
    { name: "Aquecedor elétrico", power: 1500, category: "Aquecimento", procel: "C", standby: 3 },
  ],
  "Lavanderia": [
    { name: "Máquina de lavar 10kg", power: 500, category: "Limpeza", procel: "A", standby: 0 },
    { name: "Máquina de lavar 15kg", power: 700, category: "Limpeza", procel: "A", standby: 0 },
    { name: "Secadora de roupas", power: 2500, category: "Limpeza", procel: "B", standby: 5 },
    { name: "Lava e seca", power: 2000, category: "Limpeza", procel: "A", standby: 8 },
    { name: "Ferro de passar", power: 1200, category: "Limpeza", procel: "B", standby: 0 },
    { name: "Aspirador de pó", power: 1000, category: "Limpeza", procel: "A", standby: 0 },
    { name: "Enceradeira", power: 300, category: "Limpeza", procel: "B", standby: 0 },
  ],
  "Escritório": [
    { name: "Computador Desktop", power: 400, category: "Eletrônicos", procel: "B", standby: 15 },
    { name: "Monitor 24\"", power: 80, category: "Eletrônicos", procel: "A", standby: 5 },
    { name: "Monitor 32\"", power: 120, category: "Eletrônicos", procel: "A", standby: 8 },
    { name: "Impressora laser", power: 600, category: "Eletrônicos", procel: "B", standby: 12 },
    { name: "Impressora jato de tinta", power: 200, category: "Eletrônicos", procel: "A", standby: 8 },
    { name: "Roteador Wi-Fi", power: 12, category: "Eletrônicos", procel: "A", standby: 12 },
    { name: "Ar-condicionado 9000 BTU", power: 1000, category: "Climatização", procel: "A", standby: 5 },
    { name: "Nobreak 1200VA", power: 15, category: "Eletrônicos", procel: "A", standby: 15 },
  ],
};

// Bandeiras tarifárias atualizadas 2026
const TARIFF_FLAGS = {
  verde: { name: "Verde", cost: 0.0, color: "text-green-600" },
  amarela: { name: "Amarela", cost: 0.01885, color: "text-yellow-600" },
  vermelhaP1: { name: "Vermelha P1", cost: 0.04463, color: "text-red-500" },
  vermelhaP2: { name: "Vermelha P2", cost: 0.07877, color: "text-red-700" },
};

interface Appliance {
  name: string;
  power: number;
  hoursPerDay: number;
  daysPerMonth: number;
  procelRating: string;
  standbyPower: number;
}

interface ConsumptionResult {
  monthlyConsumption: number; // kWh
  monthlyCost: number; // R$
  annualConsumption: number; // kWh
  annualCost: number; // R$
  standbyConsumption: number; // kWh standby mensal
  standbyCost: number; // R$ standby mensal
  flagImpact: number; // Adicional por bandeira
  co2Emission: number; // kg CO₂/mês
  efficiencyRating: string; // A, B, C, D, E
  costBreakdown: {
    consumption: number;
    distribution: number;
    taxes: number;
    flags: number;
    total: number;
  };
}

interface ValidationErrors {
  power?: string;
  hours?: string;
  days?: string;
  tariff?: string;
}

export default function ConsumoEnergiaEletrica() {
  const [power, setPower] = useState(150); // Watts
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [electricityRate, setElectricityRate] = useState(0.65); // R$/kWh
  const [currentFlag, setCurrentFlag] = useState<keyof typeof TARIFF_FLAGS>("verde");
  const [selectedAppliance, setSelectedAppliance] = useState<string>("");
  const [standbyHours, setStandbyHours] = useState(16); // Horas em standby
  const [includeStandby, setIncludeStandby] = useState(false);
  const [result, setResult] = useState<ConsumptionResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "consumo-energia-eletrica",
    category: "ferramentas",
  });
  useFormTracking("consumo-energia-eletrica");

  const selectAppliance = (applianceName: string, appliancePower: number) => {
    setPower(appliancePower);
    setSelectedAppliance(applianceName);

    // Configurações automáticas baseadas no tipo de aparelho
    if (applianceName.includes("Geladeira") || applianceName.includes("Freezer")) {
      setHoursPerDay(24);
      setDaysPerMonth(30);
      setStandbyHours(0);
      setIncludeStandby(false);
    } else if (applianceName.includes("Ar-condicionado")) {
      setHoursPerDay(8);
      setDaysPerMonth(25);
      setStandbyHours(16);
      setIncludeStandby(true);
    } else if (applianceName.includes("Chuveiro")) {
      setHoursPerDay(1);
      setDaysPerMonth(30);
      setStandbyHours(0);
      setIncludeStandby(false);
    } else if (applianceName.includes("TV")) {
      setHoursPerDay(6);
      setDaysPerMonth(30);
      setStandbyHours(18);
      setIncludeStandby(true);
    } else {
      setHoursPerDay(8);
      setDaysPerMonth(30);
      setStandbyHours(16);
      setIncludeStandby(false);
    }

    // Scroll para o formulário
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const calculateConsumption = (): ConsumptionResult => {
    // Consumo ativo (kWh/mês)
    const activeConsumption = (power * hoursPerDay * daysPerMonth) / 1000;

    // Consumo standby (kWh/mês) - apenas se habilitado
    const standbyConsumption = includeStandby ?
      ((power * 0.05) * standbyHours * daysPerMonth) / 1000 : 0; // 5% da potência em standby

    const totalMonthlyConsumption = activeConsumption + standbyConsumption;
    const annualConsumption = totalMonthlyConsumption * 12;

    // Cálculo de custos detalhado
    const flagCost = TARIFF_FLAGS[currentFlag].cost;
    const baseCost = totalMonthlyConsumption * electricityRate;
    const flagImpact = totalMonthlyConsumption * flagCost;

    // Breakdown detalhado da conta
    const costBreakdown = {
      consumption: baseCost * 0.65, // ~65% consumo
      distribution: baseCost * 0.25, // ~25% distribuição
      taxes: baseCost * 0.10, // ~10% impostos
      flags: flagImpact,
      total: baseCost + flagImpact,
    };

    const monthlyCost = costBreakdown.total;
    const annualCost = monthlyCost * 12;
    const standbyCost = standbyConsumption * electricityRate;

    // Emissão de CO₂ (fator médio Brasil: 0.0817 kgCO₂/kWh)
    const co2Emission = totalMonthlyConsumption * 0.0817;

    // Rating de eficiência baseado no consumo per capita
    let efficiencyRating = "A";
    if (totalMonthlyConsumption > 100) efficiencyRating = "B";
    if (totalMonthlyConsumption > 200) efficiencyRating = "C";
    if (totalMonthlyConsumption > 350) efficiencyRating = "D";
    if (totalMonthlyConsumption > 500) efficiencyRating = "E";

    return {
      monthlyConsumption: totalMonthlyConsumption,
      monthlyCost,
      annualConsumption,
      annualCost,
      standbyConsumption,
      standbyCost,
      flagImpact,
      co2Emission,
      efficiencyRating,
      costBreakdown,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (power < 1 || power > 20000) {
      newErrors.power = "Potência deve estar entre 1W e 20.000W";
    }

    if (hoursPerDay < 0 || hoursPerDay > 24) {
      newErrors.hours = "Horas por dia deve estar entre 0 e 24";
    }

    if (daysPerMonth < 1 || daysPerMonth > 31) {
      newErrors.days = "Dias por mês deve estar entre 1 e 31";
    }

    if (electricityRate < 0.1 || electricityRate > 2.0) {
      newErrors.tariff = "Tarifa deve estar entre R$ 0,10 e R$ 2,00 por kWh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    startCalculation();

    try {
      const consumptionResult = calculateConsumption();
      setResult(consumptionResult);
      setErrors({});

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setErrors({ power: "Erro no cálculo. Verifique os dados inseridos." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setPower(150);
    setHoursPerDay(8);
    setDaysPerMonth(30);
    setElectricityRate(0.65);
    setCurrentFlag("verde");
    setSelectedAppliance("");
    setStandbyHours(16);
    setIncludeStandby(false);
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatNumber = (value: number, decimals = 1) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  const getEfficiencyColor = (rating: string) => {
    const colors = {
      A: "text-green-600",
      B: "text-blue-600",
      C: "text-yellow-600",
      D: "text-orange-600",
      E: "text-red-600",
    };
    return colors[rating as keyof typeof colors] || "text-text-secondary-dark";
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Consumo de Energia Elétrica</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🔌⚡ Calculadora de Consumo de Energia Elétrica 2026
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-text-secondary-dark">
          Calcule o <strong className="text-primary-blue-dark">consumo real de qualquer aparelho</strong>, analise
          <strong className="text-system-warning"> custo mensal kWh</strong>, detecte
          <strong className="text-system-error"> vampirismo energético</strong> e compare equipamentos!
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📋 <strong>50+ Aparelhos</strong> • ⚡ <strong>Cálculo kWh Preciso</strong> • 🧛 <strong>Detecção Standby</strong> • 🌱 <strong>Emissão CO₂</strong>
          </p>
        </div>
      </header>

      {/* Seleção Rápida de Aparelhos */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">📱 Biblioteca de Aparelhos - Seleção Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(APPLIANCES_DATABASE).map(([room, appliances]) => (
              <div key={room} className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                <h3 className="mb-3 text-lg font-semibold text-primary-blue-dark">{room}</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {appliances.map((appliance, index) => (
                    <button
                      key={index}
                      onClick={() => selectAppliance(appliance.name, appliance.power)}
                      className={`group rounded-lg border p-3 text-left transition-all duration-200 ${
                        selectedAppliance === appliance.name
                          ? "border-primary-blue bg-primary-blue/10 text-primary-blue-dark"
                          : "border-gray-700 bg-gray-900 hover:border-primary-blue/50 hover:bg-primary-blue/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-text-primary group-hover:text-primary-blue">
                            {appliance.name}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {appliance.power}W • Selo {appliance.procel}
                          </div>
                        </div>
                        {appliance.standby > 0 && (
                          <div className="text-xs text-system-warning">🧛 {appliance.standby}W</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulário Principal */}
      <div ref={formRef}>
        <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configuração do Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="power" className="mb-2 block text-sm font-medium text-text-primary">
                Potência do Aparelho (W) *
              </Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(parseInt(e.target.value) || 0)}
                className="w-full"
                placeholder="Ex: 150"
              />
              <div className="mt-1 text-xs text-text-secondary">
                {selectedAppliance && `Selecionado: ${selectedAppliance}`}
              </div>
              <ErrorMessage error={errors.power} />
            </div>

            <div>
              <Label htmlFor="hoursPerDay" className="mb-2 block text-sm font-medium text-text-primary">
                Horas de Uso por Dia *
              </Label>
              <Input
                id="hoursPerDay"
                type="number"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
                className="w-full"
                placeholder="Ex: 8"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Tempo ativo funcionando
              </div>
              <ErrorMessage error={errors.hours} />
            </div>

            <div>
              <Label htmlFor="daysPerMonth" className="mb-2 block text-sm font-medium text-text-primary">
                Dias de Uso por Mês *
              </Label>
              <Input
                id="daysPerMonth"
                type="number"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(parseInt(e.target.value) || 0)}
                className="w-full"
                placeholder="Ex: 30"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Normalmente 30 dias
              </div>
              <ErrorMessage error={errors.days} />
            </div>

            <div>
              <Label htmlFor="electricityRate" className="mb-2 block text-sm font-medium text-text-primary">
                Tarifa Elétrica (R$/kWh) *
              </Label>
              <Input
                id="electricityRate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                className="w-full"
                placeholder="Ex: 0,65"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Média Brasil: R$ 0,65/kWh
              </div>
              <ErrorMessage error={errors.tariff} />
            </div>

            <div>
              <Label htmlFor="currentFlag" className="mb-2 block text-sm font-medium text-text-primary">
                Bandeira Tarifária Atual
              </Label>
              <select
                id="currentFlag"
                value={currentFlag}
                onChange={(e) => setCurrentFlag(e.target.value as keyof typeof TARIFF_FLAGS)}
                className="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-text-primary focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                {Object.entries(TARIFF_FLAGS).map(([key, flag]) => (
                  <option key={key} value={key}>
                    {flag.name} (+R$ {flag.cost.toFixed(5)}/kWh)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-text-primary">
                Vampirismo Energético (Standby)
              </Label>
              <div className="space-y-2">
                <Checkbox
                  checked={includeStandby}
                  onChange={(e) => setIncludeStandby(e.target.checked)}
                  label="Incluir consumo standby"
                />
                {includeStandby && (
                  <Input
                    type="number"
                    value={standbyHours}
                    onChange={(e) => setStandbyHours(parseInt(e.target.value) || 0)}
                    className="w-full"
                    placeholder="Horas em standby"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Botões */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleCalculate} className="px-8">
          ⚡ Calcular Consumo
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
        >
          Limpar
        </Button>
      </div>

      {/* Resultado */}
      {result && (
        <div ref={resultRef}>
          <Card className="border-2 border-growth-green bg-growth-green-soft">
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                📊 Análise Completa de Consumo de Energia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Resumo Principal */}
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-primary-blue-light p-4 text-center">
                  <div className="text-2xl font-bold text-primary-blue-dark">
                    {formatNumber(result.monthlyConsumption)} kWh
                  </div>
                  <div className="text-sm text-text-secondary">Consumo Mensal</div>
                </div>

                <div className="rounded-lg bg-system-warning-soft p-4 text-center">
                  <div className="text-2xl font-bold text-system-warning">
                    {formatCurrency(result.monthlyCost)}
                  </div>
                  <div className="text-sm text-text-secondary">Custo Mensal</div>
                </div>

                <div className="rounded-lg bg-system-info-soft p-4 text-center">
                  <div className={`text-2xl font-bold ${getEfficiencyColor(result.efficiencyRating)}`}>
                    {result.efficiencyRating}
                  </div>
                  <div className="text-sm text-text-secondary">Classe Eficiência</div>
                </div>

                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {formatNumber(result.co2Emission)} kg
                  </div>
                  <div className="text-sm text-text-secondary">CO₂/mês</div>
                </div>
              </div>

              {/* Detalhamento de Custos */}
              <div className="mb-8 rounded-lg bg-gray-900 p-6">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">💰 Breakdown Detalhado da Conta</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-blue">
                      {formatCurrency(result.costBreakdown.consumption)}
                    </div>
                    <div className="text-sm text-text-secondary">Consumo (65%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-system-info">
                      {formatCurrency(result.costBreakdown.distribution)}
                    </div>
                    <div className="text-sm text-text-secondary">Distribuição (25%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-system-warning">
                      {formatCurrency(result.costBreakdown.taxes)}
                    </div>
                    <div className="text-sm text-text-secondary">Impostos (10%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-system-error">
                      {formatCurrency(result.costBreakdown.flags)}
                    </div>
                    <div className="text-sm text-text-secondary">Bandeira {TARIFF_FLAGS[currentFlag].name}</div>
                  </div>
                  <div className="text-center border-l-2 border-growth-green">
                    <div className="text-lg font-bold text-growth-green">
                      {formatCurrency(result.costBreakdown.total)}
                    </div>
                    <div className="text-sm text-text-secondary">Total Mensal</div>
                  </div>
                </div>
              </div>

              {/* Consumo Standby */}
              {includeStandby && result.standbyConsumption > 0 && (
                <div className="mb-8 rounded-lg bg-system-error/10 border border-system-error/20 p-4">
                  <h4 className="mb-3 font-semibold text-system-error">🧛 Vampirismo Energético (Standby)</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <div className="text-lg font-bold text-system-error">
                        {formatNumber(result.standbyConsumption)} kWh
                      </div>
                      <div className="text-sm text-text-secondary">Consumo Standby/mês</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-system-error">
                        {formatCurrency(result.standbyCost)}
                      </div>
                      <div className="text-sm text-text-secondary">Custo Standby/mês</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-system-error">
                        {formatNumber((result.standbyConsumption / result.monthlyConsumption) * 100)}%
                      </div>
                      <div className="text-sm text-text-secondary">% do Consumo Total</div>
                    </div>
                  </div>
                  <div className="mt-3 rounded bg-system-error/5 p-3">
                    <p className="text-sm text-text-secondary">
                      💡 <strong>Dica:</strong> Desligue aparelhos da tomada ou use filtros de linha com interruptor
                      para eliminar o vampirismo energético e economizar {formatCurrency(result.standbyCost * 12)} por ano!
                    </p>
                  </div>
                </div>
              )}

              {/* Comparação Anual */}
              <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-3 font-semibold text-primary-blue-dark">📅 Projeção Anual</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex justify-between">
                    <span>Consumo anual:</span>
                    <span className="font-medium">{formatNumber(result.annualConsumption)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custo anual:</span>
                    <span className="font-medium">{formatCurrency(result.annualCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emissão CO₂ anual:</span>
                    <span className="font-medium">{formatNumber(result.co2Emission * 12)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Árvores para compensar:</span>
                    <span className="font-medium">{formatNumber((result.co2Emission * 12) / 22)} unidades</span>
                  </div>
                </div>
              </div>

              {/* Recomendações de Economia */}
              <div className="rounded-lg bg-growth-green-soft p-4">
                <h4 className="mb-3 font-semibold text-growth-green">🎯 Recomendações de Economia</h4>
                <ul className="space-y-2">
                  {power > 1000 && (
                    <li className="text-sm text-text-secondary">
                      • <strong>Alto consumo:</strong> Aparelho consome {power}W. Considere usar nos horários fora de pico.
                    </li>
                  )}
                  {result.efficiencyRating === "D" || result.efficiencyRating === "E" ? (
                    <li className="text-sm text-text-secondary">
                      • <strong>Baixa eficiência:</strong> Considere trocar por aparelho com selo Procel A.
                    </li>
                  ) : null}
                  {currentFlag !== "verde" && (
                    <li className="text-sm text-text-secondary">
                      • <strong>Bandeira {TARIFF_FLAGS[currentFlag].name}:</strong> Evite usar aparelhos de alto consumo. Economia de {formatCurrency(result.flagImpact)}/mês.
                    </li>
                  )}
                  <li className="text-sm text-text-secondary">
                    • <strong>Uso consciente:</strong> Desligue quando não usar. Economia potencial de 20-30%.
                  </li>
                  {includeStandby && result.standbyConsumption > 0 && (
                    <li className="text-sm text-text-secondary">
                      • <strong>Elimine standby:</strong> Desligando da tomada, economize {formatCurrency(result.standbyCost * 12)}/ano.
                    </li>
                  )}
                </ul>
              </div>

            </CardContent>
          </Card>
        </div>
      )}

      {/* Guia Educativo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎓 Guia Completo: Como Calcular e Reduzir o Consumo de Energia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fórmula Base */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue">
                🧮 Fórmula Fundamental do Consumo Elétrico
              </h3>

              <div className="rounded-lg bg-primary-blue/10 p-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-mono text-primary-blue-dark">
                    Consumo (kWh/mês) = Potência (W) × Horas/dia × Dias/mês ÷ 1000
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">✅ Exemplo Prático</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>• <strong>Geladeira 150W:</strong></div>
                    <div>• 150W × 24h × 30 dias ÷ 1000</div>
                    <div>• = <strong className="text-growth-green">108 kWh/mês</strong></div>
                    <div>• Custo: 108 × R$ 0,65 = <strong className="text-system-warning">R$ 70,20/mês</strong></div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">📋 Componentes do Cálculo</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>• <strong>Potência:</strong> Watts do aparelho (etiqueta)</div>
                    <div>• <strong>Horas/dia:</strong> Tempo real de uso</div>
                    <div>• <strong>Dias/mês:</strong> Frequência de uso</div>
                    <div>• <strong>÷ 1000:</strong> Conversão W para kW</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela de Consumo por Categoria */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚡ Consumo Médio por Categoria de Aparelho
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">🔥 Alto Consumo (&gt;1000W)</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>• <strong>Chuveiro elétrico:</strong> 4500-6800W</div>
                    <div>• <strong>Ar-condicionado:</strong> 1000-2000W</div>
                    <div>• <strong>Forno elétrico:</strong> 1800W</div>
                    <div>• <strong>Secadora roupas:</strong> 2500W</div>
                    <div>• <strong>Cooktop elétrico:</strong> 7000W</div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Médio Consumo (100-1000W)</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>• <strong>Geladeira:</strong> 150-250W</div>
                    <div>• <strong>TV LED 50&quot;:</strong> 180W</div>
                    <div>• <strong>Micro-ondas:</strong> 1400W</div>
                    <div>• <strong>Máquina lavar:</strong> 500-700W</div>
                    <div>• <strong>Ferro de passar:</strong> 1200W</div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">✅ Baixo Consumo (&lt;100W)</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>• <strong>Lâmpada LED:</strong> 12W</div>
                    <div>• <strong>Ventilador teto:</strong> 120W</div>
                    <div>• <strong>Notebook:</strong> 65W</div>
                    <div>• <strong>TV LED 32&quot;:</strong> 120W</div>
                    <div>• <strong>Carregador celular:</strong> 5W</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vampirismo Energético */}
            <div className="rounded-xl border border-system-error/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-error">
                🧛 Vampirismo Energético - O Vilão Oculto
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">🩸 Principais Vampiros</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>• <strong>TV em standby:</strong> 15W × 24h = 10,8 kWh/mês</div>
                    <div>• <strong>Micro-ondas (relógio):</strong> 3W × 24h = 2,2 kWh/mês</div>
                    <div>• <strong>Carregadores conectados:</strong> 2-5W contínuo</div>
                    <div>• <strong>Computador em sleep:</strong> 15W × 16h = 7,2 kWh/mês</div>
                    <div>• <strong>Ar-condicionado standby:</strong> 5W × 16h = 2,4 kWh/mês</div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔧 Soluções Anti-Vampiro</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>• <strong>Filtros de linha com interruptor:</strong> R$ 20-50</div>
                    <div>• <strong>Tomadas inteligentes:</strong> R$ 40-80</div>
                    <div>• <strong>Timers automáticos:</strong> R$ 15-30</div>
                    <div>• <strong>Desligar da tomada:</strong> R$ 0 (grátis!)</div>
                    <div>• <strong>Economia anual:</strong> R$ 100-300</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-system-error/10 p-4">
                <p className="text-sm text-text-secondary">
                  💡 <strong>Dica de Ouro:</strong> O vampirismo energético pode representar até 12% da sua conta de luz.
                  Uma casa com 10 aparelhos em standby pode gastar R$ 25-50/mês só com isso!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Comparativo Selo Procel */}
      <Card className="border-l-4 border-growth-green bg-growth-green-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🏆 Selo Procel - Guia de Eficiência Energética
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Classificação */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {["A", "B", "C", "D", "E"].map((rating, index) => (
                <div key={rating} className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className={`text-2xl font-bold ${getEfficiencyColor(rating)}`}>
                    {rating}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    {index === 0 && "Mais Eficiente"}
                    {index === 1 && "Muito Eficiente"}
                    {index === 2 && "Eficiente"}
                    {index === 3 && "Pouco Eficiente"}
                    {index === 4 && "Menos Eficiente"}
                  </div>
                  <div className="text-xs text-text-secondary mt-2">
                    {index === 0 && "Economiza até 40%"}
                    {index === 1 && "Economiza até 25%"}
                    {index === 2 && "Consumo padrão"}
                    {index === 3 && "Consome 15% mais"}
                    {index === 4 && "Consome 30% mais"}
                  </div>
                </div>
              ))}
            </div>

            {/* Benefícios */}
            <div className="rounded-lg bg-gray-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-growth-green">💰 Economia Real com Selo Procel A</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold text-primary-blue">Geladeira 400L</h4>
                  <div className="text-sm text-text-secondary">
                    <div>• Classe E: 250W → R$ 122/mês</div>
                    <div>• Classe A: 150W → R$ 73/mês</div>
                    <div>• <strong className="text-growth-green">Economia: R$ 49/mês</strong></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-blue">Ar-condicionado 12000 BTU</h4>
                  <div className="text-sm text-text-secondary">
                    <div>• Comum: 1800W → R$ 187/mês</div>
                    <div>• Inverter A: 1000W → R$ 104/mês</div>
                    <div>• <strong className="text-growth-green">Economia: R$ 83/mês</strong></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-blue">Lâmpadas LED</h4>
                  <div className="text-sm text-text-secondary">
                    <div>• Incandescente: 60W → R$ 12/mês</div>
                    <div>• LED A: 12W → R$ 2,4/mês</div>
                    <div>• <strong className="text-growth-green">Economia: R$ 9,6/mês</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Consumo de Energia Elétrica"
        items={[
          {
            question: "Como calcular o consumo de energia elétrica de um aparelho?",
            answer:
              "Use a fórmula: Consumo (kWh) = Potência (W) × Horas de uso × Dias ÷ 1000. Exemplo: geladeira 150W × 24h × 30 dias ÷ 1000 = 108 kWh/mês. Multiplique pela sua tarifa elétrica para obter o custo em reais.",
            borderColor: "primary-blue",
          },
          {
            question: "Quais aparelhos mais consomem energia elétrica em casa?",
            answer:
              "Chuveiro elétrico (30-40% da conta), ar-condicionado (20-30%), geladeira antiga (15-20%), aquecedor elétrico (25%), forno elétrico e secadora de roupas. Focar na otimização destes aparelhos gera maior economia.",
            borderColor: "system-error",
          },
          {
            question: "O que é vampirismo energético e como detectar?",
            answer:
              "Vampirismo é o consumo de aparelhos em standby (modo de espera). TVs, micro-ondas, carregadores conectados, computadores consomem energia 24h mesmo 'desligados'. Pode representar 12% da conta de luz.",
            borderColor: "system-warning",
          },
          {
            question: "Vale a pena trocar aparelhos antigos por eficientes?",
            answer:
              "Sim! Geladeira classe A consome 40% menos que classe E. Ar-condicionado inverter consome 50% menos. Lâmpadas LED consomem 80% menos que incandescentes. O investimento se paga em 1-3 anos.",
            borderColor: "growth-green",
          },
          {
            question: "Como as bandeiras tarifárias afetam minha conta?",
            answer:
              "Bandeiras indicam custos extras. Verde: R$ 0. Amarela: +R$ 0,01885/kWh. Vermelha P1: +R$ 0,04463/kWh. Vermelha P2: +R$ 0,07877/kWh. Em bandeira vermelha, evite usar aparelhos de alto consumo.",
            borderColor: "system-info",
          },
          {
            question: "Qual a diferença entre potência e consumo de energia?",
            answer:
              "Potência (W) é a capacidade máxima do aparelho. Consumo (kWh) é a energia efetivamente gasta durante o uso. Uma TV 200W ligada 5h consome 1 kWh. A mesma TV ligada 10h consome 2 kWh.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica Definitiva para Reduzir a Conta",
          content:
            "<strong>Regra 80/20:</strong> 80% da economia vem de 20% dos aparelhos. Foque no chuveiro elétrico, ar-condicionado e geladeira. Troque por modelos eficientes, use conscientemente e elimine standby. Resultado: até 50% de economia!",
        }}
        footerText="<strong>Lembre-se:</strong> Conhecer o consumo real dos seus aparelhos é o primeiro passo para uma conta de luz mais barata. Use nossa calculadora para analisar cada equipamento e descobrir oportunidades de economia."
      />

      <RelatedCalculators category="ferramentas" currentCalculatorId="economia-energia-eletrica" />
    </div>
  );
}