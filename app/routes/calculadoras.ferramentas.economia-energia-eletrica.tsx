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
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Calculadora de Economia de Energia Elétrica 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "💡⚡ Calculadora completa de economia de energia elétrica! Analise consumo por aparelho, simule troca LED, bandeiras tarifárias, energia solar e otimize sua conta de luz. Economize até 80%!",
    },
    {
      name: "keywords",
      content:
        "calculadora energia elétrica, economia conta de luz, consumo aparelhos elétricos, simulador energia solar, bandeiras tarifárias, calculadora LED, vampirismo energético, eficiência energética, tarifa branca",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
    },
    {
      property: "og:title",
      content: "Calculadora de Economia de Energia Elétrica – Reduza sua Conta até 80%",
    },
    {
      property: "og:description",
      content:
        "💡⚡ Calculadora completa para economia de energia! Analise consumo, simule LED vs incandescente, bandeiras tarifárias e energia solar. Economize agora!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og/economia-energia-eletrica.jpg",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Economia de Energia Elétrica - Análise completa de consumo e otimização",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Economia Energia Elétrica 2026 – Reduza sua Conta",
    },
    {
      name: "twitter:description",
      content:
        "💡⚡ Analise consumo, simule LED, bandeiras tarifárias e energia solar. Economize até 80% na conta de luz!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og/economia-energia-eletrica.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Economia de Energia Elétrica",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Economia Energia Elétrica" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Economia de Energia Elétrica - Análise Completa 2026",
        description:
          "Ferramenta completa para otimização de consumo elétrico. Analise consumo por aparelho, simule troca de lâmpadas LED, bandeiras tarifárias, energia solar e vampirismo energético.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
          name: "Calculadora Economia Energia Elétrica 2026 - Análise Completa",
          description:
            "Reduza sua conta de luz com análise completa de consumo. Simuladores de LED, energia solar, bandeiras tarifárias e vampirismo energético.",
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
                name: "Economia de Energia Elétrica",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/economia-energia-eletrica",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Eficiência Energética e Sustentabilidade",
          description: "Ferramenta para análise e otimização do consumo de energia elétrica residencial e comercial",
          category: "UtilitiesApplication",
        },
        featureList: [
          "Análise de consumo por aparelho",
          "Simulador LED vs outras lâmpadas",
          "Calculadora de bandeiras tarifárias",
          "Simulador energia solar residencial",
          "Análise vampirismo energético",
          "Otimização por cômodo",
          "Comparação eficiência energética",
          "Plano de economia personalizado",
          "Interface responsiva",
          "Ferramenta gratuita",
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
            name: "Como economizar energia elétrica em casa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use lâmpadas LED (economizam 80%), desligue aparelhos do standby, ajuste temperatura do ar-condicionado e geladeira, use horários de tarifa mais barata e considere energia solar.",
            },
          },
          {
            "@type": "Question",
            name: "Quanto posso economizar trocando lâmpadas por LED?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LEDs consomem até 80% menos energia que incandescentes e duram 25x mais. Uma casa pode economizar R$ 200-500/ano apenas trocando todas as lâmpadas.",
            },
          },
          {
            "@type": "Question",
            name: "O que são bandeiras tarifárias e como afetam minha conta?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bandeiras indicam custos de geração de energia. Verde: sem custo extra. Amarela: +R$ 0,01885/kWh. Vermelha P1: +R$ 0,04463/kWh. Vermelha P2: +R$ 0,07877/kWh.",
            },
          },
        ],
      },
    },
  ];
};

// Base de dados de aparelhos elétricos com potências médias
const APPLIANCES_DATABASE = {
  sala: [
    { name: "TV LED 32\"", power: 120, category: "Entretenimento" },
    { name: "TV LED 50\"", power: 180, category: "Entretenimento" },
    { name: "TV LED 65\"", power: 220, category: "Entretenimento" },
    { name: "Ar-condicionado 9000 BTU", power: 1000, category: "Climatização" },
    { name: "Ar-condicionado 12000 BTU", power: 1400, category: "Climatização" },
    { name: "Ar-condicionado 18000 BTU", power: 2000, category: "Climatização" },
    { name: "Ventilador de teto", power: 120, category: "Climatização" },
    { name: "Ventilador de mesa", power: 60, category: "Climatização" },
    { name: "Soundbar", power: 50, category: "Entretenimento" },
    { name: "Videogame (PS5/Xbox)", power: 150, category: "Entretenimento" },
  ],
  quarto: [
    { name: "TV LED 32\"", power: 120, category: "Entretenimento" },
    { name: "Ar-condicionado 9000 BTU", power: 1000, category: "Climatização" },
    { name: "Ar-condicionado 12000 BTU", power: 1400, category: "Climatização" },
    { name: "Ventilador de teto", power: 120, category: "Climatização" },
    { name: "Carregador celular", power: 5, category: "Eletrônicos" },
    { name: "Notebook", power: 65, category: "Eletrônicos" },
    { name: "Abajur LED", power: 12, category: "Iluminação" },
  ],
  cozinha: [
    { name: "Geladeira duplex 300L", power: 150, category: "Eletrodomésticos" },
    { name: "Geladeira frost-free 400L", power: 180, category: "Eletrodomésticos" },
    { name: "Freezer horizontal 300L", power: 200, category: "Eletrodomésticos" },
    { name: "Micro-ondas 30L", power: 1400, category: "Eletrodomésticos" },
    { name: "Forno elétrico 50L", power: 1800, category: "Eletrodomésticos" },
    { name: "Cooktop elétrico 4 bocas", power: 7000, category: "Eletrodomésticos" },
    { name: "Liquidificador", power: 600, category: "Eletrodomésticos" },
    { name: "Cafeteira elétrica", power: 800, category: "Eletrodomésticos" },
    { name: "Torradeira", power: 1200, category: "Eletrodomésticos" },
    { name: "Exaustor", power: 200, category: "Ventilação" },
  ],
  banheiro: [
    { name: "Chuveiro elétrico 4500W", power: 4500, category: "Aquecimento" },
    { name: "Chuveiro elétrico 5500W", power: 5500, category: "Aquecimento" },
    { name: "Chuveiro elétrico 6800W", power: 6800, category: "Aquecimento" },
    { name: "Secador de cabelo", power: 1800, category: "Beleza" },
    { name: "Chapinha/Prancha", power: 200, category: "Beleza" },
    { name: "Exaustor", power: 180, category: "Ventilação" },
  ],
  lavanderia: [
    { name: "Máquina de lavar 10kg", power: 500, category: "Limpeza" },
    { name: "Máquina de lavar 15kg", power: 700, category: "Limpeza" },
    { name: "Secadora de roupas", power: 2500, category: "Limpeza" },
    { name: "Ferro de passar", power: 1200, category: "Limpeza" },
    { name: "Aspirador de pó", power: 1000, category: "Limpeza" },
  ],
  escritorio: [
    { name: "Computador Desktop", power: 400, category: "Eletrônicos" },
    { name: "Monitor 24\"", power: 80, category: "Eletrônicos" },
    { name: "Monitor 32\"", power: 120, category: "Eletrônicos" },
    { name: "Impressora laser", power: 600, category: "Eletrônicos" },
    { name: "Roteador Wi-Fi", power: 12, category: "Eletrônicos" },
    { name: "Ar-condicionado 9000 BTU", power: 1000, category: "Climatização" },
  ],
};

// Bandeiras tarifárias 2026
const TARIFF_FLAGS = {
  verde: { name: "Verde", cost: 0.0, color: "text-green-600" },
  amarela: { name: "Amarela", cost: 0.01885, color: "text-yellow-600" },
  vermelhaP1: { name: "Vermelha P1", cost: 0.04463, color: "text-red-500" },
  vermelhaP2: { name: "Vermelha P2", cost: 0.07877, color: "text-red-700" },
};

// Tipos de lâmpadas para comparação
const LAMP_TYPES = {
  incandescente: { name: "Incandescente", efficiency: 1.0, lifespan: 1000, cost: 3 },
  fluorescente: { name: "Fluorescente", efficiency: 0.25, lifespan: 8000, cost: 12 },
  led: { name: "LED", efficiency: 0.2, lifespan: 25000, cost: 25 },
};

interface Appliance {
  name: string;
  power: number;
  hoursPerDay: number;
  daysPerMonth: number;
  room: string;
}

interface EnergyResult {
  monthlyConsumption: number; // kWh
  monthlyCost: number; // R$
  annualConsumption: number; // kWh
  annualCost: number; // R$
  consumptionByRoom: Record<string, { consumption: number; cost: number; percentage: number }>;
  vampireConsumption: number; // kWh standby
  vampireCost: number; // R$ standby
  flagImpact: number; // Adicional por bandeira
  ledSavings: { monthlyAmount: number; annualAmount: number; paybackMonths: number };
  solarPotential: { systemSize: number; monthlySavings: number; paybackYears: number };
  efficiencyScore: number; // 0-100
  recommendations: string[];
}

interface ValidationErrors {
  general?: string;
  appliances?: string;
}

export default function EconomiaEnergiaEletrica() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [electricityRate, setElectricityRate] = useState(0.65); // R$/kWh
  const [currentFlag, setCurrentFlag] = useState<keyof typeof TARIFF_FLAGS>("verde");
  const [profileType, setProfileType] = useState<"residencial" | "comercial">("residencial");
  const [roofArea, setRoofArea] = useState(50); // m² para energia solar
  const [result, setResult] = useState<EnergyResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activeTab, setActiveTab] = useState<"consumo" | "led" | "solar">("consumo");
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "economia-energia-eletrica",
    category: "ferramentas",
  });
  useFormTracking("economia-energia-eletrica");

  const addAppliance = (room: string, applianceName: string, power: number) => {
    const newAppliance: Appliance = {
      name: applianceName,
      power: power,
      hoursPerDay: 8,
      daysPerMonth: 30,
      room: room,
    };
    setAppliances(prev => [...prev, newAppliance]);
  };

  const updateAppliance = (index: number, field: keyof Appliance, value: string | number) => {
    setAppliances(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeAppliance = (index: number) => {
    setAppliances(prev => prev.filter((_, i) => i !== index));
  };

  const calculateEnergyAnalysis = (): EnergyResult => {
    // Cálculo básico de consumo
    let totalMonthlyConsumption = 0;
    const consumptionByRoom: Record<string, { consumption: number; cost: number; percentage: number }> = {};

    appliances.forEach(appliance => {
      const monthlyConsumption = (appliance.power * appliance.hoursPerDay * appliance.daysPerMonth) / 1000;
      totalMonthlyConsumption += monthlyConsumption;

      if (!consumptionByRoom[appliance.room]) {
        consumptionByRoom[appliance.room] = { consumption: 0, cost: 0, percentage: 0 };
      }
      consumptionByRoom[appliance.room].consumption += monthlyConsumption;
    });

    // Calcular percentuais por cômodo
    Object.keys(consumptionByRoom).forEach(room => {
      consumptionByRoom[room].percentage = (consumptionByRoom[room].consumption / totalMonthlyConsumption) * 100;
      consumptionByRoom[room].cost = consumptionByRoom[room].consumption * electricityRate;
    });

    const annualConsumption = totalMonthlyConsumption * 12;
    const flagCost = TARIFF_FLAGS[currentFlag].cost;
    const monthlyCost = totalMonthlyConsumption * (electricityRate + flagCost);
    const annualCost = monthlyCost * 12;

    // Vampirismo energético (standby) - aproximadamente 12% do consumo total
    const vampireConsumption = totalMonthlyConsumption * 0.12;
    const vampireCost = vampireConsumption * electricityRate;

    // Impacto da bandeira tarifária
    const flagImpact = totalMonthlyConsumption * flagCost;

    // Simulação LED (assumindo 20% do consumo em iluminação)
    const lightingConsumption = totalMonthlyConsumption * 0.20;
    const ledSavings = {
      monthlyAmount: lightingConsumption * 0.8 * electricityRate, // 80% economia
      annualAmount: lightingConsumption * 0.8 * electricityRate * 12,
      paybackMonths: 8, // Payback médio para troca de lâmpadas
    };

    // Potencial solar (1 kWp gera ~130 kWh/mês no Brasil)
    const systemSize = Math.min(totalMonthlyConsumption / 130, roofArea / 8); // 8m² por kWp
    const solarGeneration = systemSize * 130;
    const solarPotential = {
      systemSize: systemSize,
      monthlySavings: Math.min(solarGeneration, totalMonthlyConsumption) * electricityRate * 0.95, // 95% da conta
      paybackYears: 6, // Payback médio energia solar no Brasil
    };

    // Score de eficiência (baseado em consumo per capita e uso de aparelhos eficientes)
    const monthlyPerCapita = totalMonthlyConsumption / (profileType === "residencial" ? 3 : 10); // Assumindo 3 pessoas ou 10 funcionários
    let efficiencyScore = 100;
    if (monthlyPerCapita > 150) efficiencyScore -= 30; // Alto consumo
    if (monthlyPerCapita > 300) efficiencyScore -= 30; // Muito alto
    if (flagImpact > monthlyCost * 0.1) efficiencyScore -= 20; // Muito impacto de bandeira
    efficiencyScore = Math.max(0, efficiencyScore);

    // Recomendações personalizadas
    const recommendations: string[] = [];
    if (vampireCost > monthlyCost * 0.1) {
      recommendations.push("Elimine vampirismo energético desligando aparelhos do standby");
    }
    if (lightingConsumption > totalMonthlyConsumption * 0.25) {
      recommendations.push("Troque lâmpadas por LED para economia de 80%");
    }
    if (totalMonthlyConsumption > 300) {
      recommendations.push("Considere energia solar para reduzir 95% da conta");
    }
    if (flagImpact > 20) {
      recommendations.push("Evite usar aparelhos de alto consumo em horários de pico");
    }

    return {
      monthlyConsumption: totalMonthlyConsumption,
      monthlyCost,
      annualConsumption,
      annualCost,
      consumptionByRoom,
      vampireConsumption,
      vampireCost,
      flagImpact,
      ledSavings,
      solarPotential,
      efficiencyScore,
      recommendations,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (appliances.length === 0) {
      newErrors.appliances = "Adicione pelo menos um aparelho para análise";
    }

    if (electricityRate < 0.1 || electricityRate > 2.0) {
      newErrors.general = "Tarifa elétrica deve estar entre R$ 0,10 e R$ 2,00 por kWh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    startCalculation();

    try {
      const analysisResult = calculateEnergyAnalysis();
      setResult(analysisResult);
      setErrors({});

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setErrors({ general: "Erro no cálculo. Verifique os dados inseridos." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setAppliances([]);
    setElectricityRate(0.65);
    setCurrentFlag("verde");
    setProfileType("residencial");
    setRoofArea(50);
    setResult(null);
    setErrors({});
    setActiveTab("consumo");
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

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Economia de Energia Elétrica</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          💡⚡ Calculadora de Economia de Energia Elétrica 2026
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-text-secondary-dark">
          Analise seu <strong className="text-primary-blue-dark">consumo por aparelho</strong>, simule economia com
          <strong className="text-growth-green"> LED e energia solar</strong>, calcule impacto das
          <strong className="text-system-warning"> bandeiras tarifárias</strong> e otimize sua conta de luz!
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🏠 <strong>Análise por Cômodo</strong> • 💡 <strong>Simulador LED</strong> • ☀️{" "}
            <strong>Energia Solar</strong> • 🧛 <strong>Vampirismo Energético</strong>
          </p>
        </div>
      </header>

      {/* Tabs de Navegação */}
      <div className="flex justify-center">
        <div className="flex rounded-lg bg-gray-900 p-1">
          <button
            onClick={() => setActiveTab("consumo")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === "consumo"
                ? "bg-primary-blue text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            📊 Análise de Consumo
          </button>
          <button
            onClick={() => setActiveTab("led")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === "led"
                ? "bg-primary-blue text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            💡 Simulador LED
          </button>
          <button
            onClick={() => setActiveTab("solar")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === "solar"
                ? "bg-primary-blue text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            ☀️ Energia Solar
          </button>
        </div>
      </div>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configurações da Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="electricityRate" className="mb-2 block text-sm font-medium text-text-primary">
                Tarifa Elétrica (R$/kWh)
              </Label>
              <Input
                id="electricityRate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
                className="w-full"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Média Brasil: R$ 0,65/kWh
              </div>
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
              <Label htmlFor="profileType" className="mb-2 block text-sm font-medium text-text-primary">
                Tipo de Perfil
              </Label>
              <select
                id="profileType"
                value={profileType}
                onChange={(e) => setProfileType(e.target.value as "residencial" | "comercial")}
                className="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-text-primary focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div>
              <Label htmlFor="roofArea" className="mb-2 block text-sm font-medium text-text-primary">
                Área do Telhado (m²)
              </Label>
              <Input
                id="roofArea"
                type="number"
                value={roofArea}
                onChange={(e) => setRoofArea(parseInt(e.target.value) || 0)}
                className="w-full"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Para simulação solar
              </div>
            </div>
          </div>
          <ErrorMessage error={errors.general} />
        </CardContent>
      </Card>

      {/* Seção de Aparelhos */}
      {activeTab === "consumo" && (
        <Card>
          <CardHeader>
            <CardTitle as="h2">🏠 Aparelhos por Cômodo</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Seletor de Aparelhos */}
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">Adicionar Aparelhos</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(APPLIANCES_DATABASE).map(([room, appliances]) => (
                  <div key={room} className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark capitalize">{room}</h4>
                    <div className="space-y-1">
                      {appliances.map((appliance, index) => (
                        <button
                          key={index}
                          onClick={() => addAppliance(room, appliance.name, appliance.power)}
                          className="w-full rounded px-2 py-1 text-left text-xs text-text-secondary hover:bg-primary-blue/10"
                        >
                          {appliance.name} ({appliance.power}W)
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de Aparelhos Adicionados */}
            {appliances.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Aparelhos Configurados</h3>
                <div className="space-y-3">
                  {appliances.map((appliance, index) => (
                    <div key={index} className="rounded-lg border border-input-border bg-gray-900 p-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <div>
                          <Label className="mb-1 block text-xs font-medium text-text-primary">Aparelho</Label>
                          <div className="text-sm text-text-secondary">{appliance.name}</div>
                        </div>
                        <div>
                          <Label className="mb-1 block text-xs font-medium text-text-primary">Potência (W)</Label>
                          <Input
                            type="number"
                            value={appliance.power}
                            onChange={(e) => updateAppliance(index, "power", parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="mb-1 block text-xs font-medium text-text-primary">Horas/dia</Label>
                          <Input
                            type="number"
                            value={appliance.hoursPerDay}
                            onChange={(e) => updateAppliance(index, "hoursPerDay", parseFloat(e.target.value) || 0)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="mb-1 block text-xs font-medium text-text-primary">Dias/mês</Label>
                          <Input
                            type="number"
                            value={appliance.daysPerMonth}
                            onChange={(e) => updateAppliance(index, "daysPerMonth", parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="mb-1 block text-xs font-medium text-text-primary">Consumo</Label>
                          <div className="text-sm text-growth-green">
                            {formatNumber((appliance.power * appliance.hoursPerDay * appliance.daysPerMonth) / 1000)} kWh
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={() => removeAppliance(index)}
                            variant="outline"
                            className="h-8 border-system-error text-system-error hover:bg-system-error hover:text-white"
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <ErrorMessage error={errors.appliances} />
          </CardContent>
        </Card>
      )}

      {/* Simulador LED */}
      {activeTab === "led" && (
        <Card>
          <CardHeader>
            <CardTitle as="h2">💡 Simulador: LED vs Outras Lâmpadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {Object.entries(LAMP_TYPES).map(([type, lamp]) => (
                <div key={type} className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-primary-blue-dark">{lamp.name}</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>💡 <strong>Consumo:</strong> {(60 * lamp.efficiency).toFixed(0)}W (equivalente 60W)</div>
                    <div>⏰ <strong>Durabilidade:</strong> {lamp.lifespan.toLocaleString()} horas</div>
                    <div>💰 <strong>Preço:</strong> R$ {lamp.cost}</div>
                    <div>📊 <strong>Custo 5 anos:</strong> R$ {((60 * lamp.efficiency * 5 * 365 * electricityRate) / 1000 + (lamp.cost * Math.ceil(5 * 365 * 5 / lamp.lifespan))).toFixed(0)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-growth-green-soft p-4">
              <h3 className="mb-2 font-semibold text-growth-green">💰 Economia com LED</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-lg font-bold text-growth-green">80%</div>
                  <div className="text-sm text-text-secondary">Menos consumo vs incandescente</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-growth-green">25x</div>
                  <div className="text-sm text-text-secondary">Maior durabilidade</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-growth-green">R$ 300-800</div>
                  <div className="text-sm text-text-secondary">Economia anual (casa média)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simulador Solar */}
      {activeTab === "solar" && (
        <Card>
          <CardHeader>
            <CardTitle as="h2">☀️ Simulador: Energia Solar Residencial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-blue">Dimensionamento do Sistema</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Área disponível:</span>
                    <span className="font-medium">{roofArea} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Potência máxima:</span>
                    <span className="font-medium">{formatNumber(roofArea / 8, 1)} kWp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Geração mensal estimada:</span>
                    <span className="font-medium">{formatNumber((roofArea / 8) * 130)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Economia mensal estimada:</span>
                    <span className="font-medium text-growth-green">{formatCurrency((roofArea / 8) * 130 * electricityRate * 0.95)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-system-warning">Investimento e Retorno</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Investimento estimado:</span>
                    <span className="font-medium">{formatCurrency((roofArea / 8) * 4500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback estimado:</span>
                    <span className="font-medium">6-8 anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Economia 25 anos:</span>
                    <span className="font-medium text-growth-green">{formatCurrency((roofArea / 8) * 130 * electricityRate * 0.95 * 12 * 19)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redução da conta:</span>
                    <span className="font-medium text-growth-green">até 95%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-system-info-soft p-4">
              <h3 className="mb-2 font-semibold text-system-info">📋 Benefícios da Energia Solar</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="text-sm text-text-secondary">✅ Redução de até 95% na conta de luz</div>
                <div className="text-sm text-text-secondary">✅ Sistema paga a si mesmo em 6-8 anos</div>
                <div className="text-sm text-text-secondary">✅ Vida útil de 25+ anos</div>
                <div className="text-sm text-text-secondary">✅ Valorização do imóvel</div>
                <div className="text-sm text-text-secondary">✅ Energia limpa e sustentável</div>
                <div className="text-sm text-text-secondary">✅ Manutenção mínima</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botões */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleCalculate} className="px-8">
          📊 Analisar Consumo
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
                🎉 Análise Completa de Economia de Energia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Resumo Executivo */}
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

                <div className="rounded-lg bg-system-error-soft p-4 text-center">
                  <div className="text-2xl font-bold text-system-error">
                    {formatCurrency(result.vampireCost)}
                  </div>
                  <div className="text-sm text-text-secondary">Gasto com Standby</div>
                </div>

                <div className="rounded-lg bg-growth-green-soft p-4 text-center">
                  <div className="text-2xl font-bold text-growth-green">
                    {result.efficiencyScore}
                  </div>
                  <div className="text-sm text-text-secondary">Score de Eficiência</div>
                </div>
              </div>

              {/* Consumo por Cômodo */}
              {Object.keys(result.consumptionByRoom).length > 0 && (
                <div className="mb-8">
                  <h4 className="mb-4 text-xl font-semibold text-text-primary">🏠 Consumo por Cômodo</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(result.consumptionByRoom).map(([room, data]) => (
                      <div key={room} className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                        <h5 className="mb-2 font-semibold text-primary-blue-dark capitalize">{room}</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Consumo:</span>
                            <span className="font-medium">{formatNumber(data.consumption)} kWh</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Custo:</span>
                            <span className="font-medium">{formatCurrency(data.cost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Participação:</span>
                            <span className="font-medium">{formatNumber(data.percentage)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Potencial de Economia */}
              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">💰 Potencial de Economia</h4>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Economia LED */}
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/5 p-4">
                    <h5 className="mb-3 font-semibold text-growth-green">💡 Troca para LED</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Economia mensal:</span>
                        <span className="font-medium">{formatCurrency(result.ledSavings.monthlyAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Economia anual:</span>
                        <span className="font-medium">{formatCurrency(result.ledSavings.annualAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payback:</span>
                        <span className="font-medium">{result.ledSavings.paybackMonths} meses</span>
                      </div>
                    </div>
                  </div>

                  {/* Energia Solar */}
                  <div className="rounded-lg border border-system-info/20 bg-system-info/5 p-4">
                    <h5 className="mb-3 font-semibold text-system-info">☀️ Energia Solar</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sistema sugerido:</span>
                        <span className="font-medium">{formatNumber(result.solarPotential.systemSize)} kWp</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Economia mensal:</span>
                        <span className="font-medium">{formatCurrency(result.solarPotential.monthlySavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payback:</span>
                        <span className="font-medium">{result.solarPotential.paybackYears} anos</span>
                      </div>
                    </div>
                  </div>

                  {/* Eliminação Standby */}
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/5 p-4">
                    <h5 className="mb-3 font-semibold text-system-warning">🧛 Eliminar Standby</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Consumo standby:</span>
                        <span className="font-medium">{formatNumber(result.vampireConsumption)} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Economia mensal:</span>
                        <span className="font-medium">{formatCurrency(result.vampireCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Economia anual:</span>
                        <span className="font-medium">{formatCurrency(result.vampireCost * 12)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impacto Bandeiras */}
              {result.flagImpact > 0 && (
                <div className="mb-6 rounded-lg bg-system-warning/10 border border-system-warning/20 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">
                    🚩 Impacto da Bandeira {TARIFF_FLAGS[currentFlag].name}
                  </h4>
                  <div className="text-sm text-text-secondary">
                    <p>
                      A bandeira <strong>{TARIFF_FLAGS[currentFlag].name}</strong> adiciona{" "}
                      <strong className="text-system-warning">{formatCurrency(result.flagImpact)}</strong> à sua conta mensal.
                      Evite usar aparelhos de alto consumo quando possível.
                    </p>
                  </div>
                </div>
              )}

              {/* Recomendações */}
              {result.recommendations.length > 0 && (
                <div className="rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🎯 Recomendações Personalizadas</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-text-secondary">
                        • {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guia Educativo Sempre Visível */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎓 Guia Completo: Economia de Energia Elétrica 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Dicas de Economia */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💡 Principais Formas de Economizar
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Mudanças Sem Investimento</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Desligue aparelhos do standby (economize 12%)</li>
                    <li>• Use ar-condicionado a 23°C (economize 30%)</li>
                    <li>• Abra geladeira menos vezes</li>
                    <li>• Use máquina de lavar com carga cheia</li>
                    <li>• Evite horários de pico na tarifa branca</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue">💰 Investimentos que Se Pagam</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Lâmpadas LED: payback 6-12 meses</li>
                    <li>• Geladeira classe A: payback 2-3 anos</li>
                    <li>• Ar-condicionado inverter: payback 3-4 anos</li>
                    <li>• Energia solar: payback 6-8 anos</li>
                    <li>• Aquecedor solar: payback 3-5 anos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bandeiras Tarifárias */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🚩 Bandeiras Tarifárias 2026
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(TARIFF_FLAGS).map(([key, flag]) => (
                  <div key={key} className="rounded-lg bg-gray-800 p-4">
                    <h4 className={`mb-2 font-semibold ${flag.color}`}>{flag.name}</h4>
                    <div className="text-sm text-text-secondary">
                      <div>Adicional: <strong>+R$ {flag.cost.toFixed(5)}/kWh</strong></div>
                      <div className="mt-2 text-xs">
                        {key === "verde" && "Condições favoráveis de geração"}
                        {key === "amarela" && "Condições menos favoráveis"}
                        {key === "vermelhaP1" && "Condições mais custosas"}
                        {key === "vermelhaP2" && "Condições muito custosas"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vilões do Consumo */}
            <div className="rounded-xl border border-system-error/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-error">
                ⚡ Vilões do Consumo Elétrico
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">🔥 Alto Consumo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Chuveiro elétrico: 30-40% da conta</li>
                    <li>• Ar-condicionado: 20-30% da conta</li>
                    <li>• Geladeira antiga: 15-20% da conta</li>
                    <li>• Aquecedor elétrico: 25% da conta</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">🧛 Vampiros Energéticos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• TV em standby: 15W contínuo</li>
                    <li>• Micro-ondas com relógio: 3W</li>
                    <li>• Carregadores conectados: 2-5W</li>
                    <li>• Aparelhos com display: 5-10W</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔧 Soluções Simples</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Filtros de linha com interruptor</li>
                    <li>• Timers automáticos</li>
                    <li>• Tomadas inteligentes</li>
                    <li>• Desligar na tomada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparativo de Equipamentos */}
      <Card className="border-l-4 border-system-info bg-system-info-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            ⚡ Consumo dos Principais Aparelhos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-system-error">🔥 Alto Consumo</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-system-error">Chuveiro Elétrico 5500W</div>
                  <div className="text-sm text-text-secondary">R$ 220/mês (1h/dia)</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-system-error">Ar-condicionado 12000 BTU</div>
                  <div className="text-sm text-text-secondary">R$ 140/mês (8h/dia)</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-system-error">Forno Elétrico</div>
                  <div className="text-sm text-text-secondary">R$ 85/mês (1h/dia)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-system-warning">⚠️ Médio Consumo</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-system-warning">Geladeira 400L</div>
                  <div className="text-sm text-text-secondary">R$ 35/mês (24h/dia)</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-system-warning">Máquina de Lavar</div>
                  <div className="text-sm text-text-secondary">R$ 20/mês (1h/dia)</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-system-warning">TV LED 50\"</div>
                  <div className="text-sm text-text-secondary">R$ 18/mês (6h/dia)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-growth-green">✅ Baixo Consumo</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-growth-green">Lâmpada LED 12W</div>
                  <div className="text-sm text-text-secondary">R$ 3/mês (6h/dia)</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-growth-green">Ventilador de Teto</div>
                  <div className="text-sm text-text-secondary">R$ 8/mês (8h/dia)</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="font-semibold text-growth-green">Notebook</div>
                  <div className="text-sm text-text-secondary">R$ 6/mês (8h/dia)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Economia de Energia Elétrica"
        items={[
          {
            question: "Como economizar energia elétrica em casa?",
            answer:
              "Use lâmpadas LED (economizam 80%), desligue aparelhos do standby, ajuste temperatura do ar-condicionado para 23°C, use a geladeira corretamente e considere energia solar. Evite usar aparelhos de alto consumo nos horários de pico.",
            borderColor: "primary-blue",
          },
          {
            question: "Quanto posso economizar trocando lâmpadas por LED?",
            answer:
              "LEDs consomem até 80% menos energia que incandescentes e duram 25x mais. Uma casa média pode economizar R$ 200-500/ano apenas trocando todas as lâmpadas, com payback de 6-12 meses.",
            borderColor: "growth-green",
          },
          {
            question: "O que são bandeiras tarifárias e como afetam minha conta?",
            answer:
              "Bandeiras indicam custos de geração de energia. Verde: sem custo extra. Amarela: +R$ 0,01885/kWh. Vermelha P1: +R$ 0,04463/kWh. Vermelha P2: +R$ 0,07877/kWh. Evite usar aparelhos de alto consumo em bandeiras vermelhas.",
            borderColor: "system-warning",
          },
          {
            question: "Vale a pena investir em energia solar residencial?",
            answer:
              "Sim! A energia solar pode reduzir até 95% da conta de luz, com payback de 6-8 anos e vida útil de 25+ anos. O investimento se paga e ainda gera economia por décadas, além de valorizar o imóvel.",
            borderColor: "system-info",
          },
          {
            question: "O que é vampirismo energético e como eliminá-lo?",
            answer:
              "Vampirismo é o consumo de aparelhos em standby (até 12% da conta). TVs, micro-ondas, carregadores conectados consomem energia 24h. Solução: use filtros de linha com interruptor ou desligue da tomada.",
            borderColor: "system-error",
          },
          {
            question: "Qual aparelho mais consome energia em casa?",
            answer:
              "Chuveiro elétrico consome 30-40% da conta, seguido por ar-condicionado (20-30%) e geladeira antiga (15-20%). Focar na otimização destes aparelhos gera maior impacto na economia.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica de Ouro para Economizar",
          content:
            "<strong>Regra 23-12-8:</strong> Ar-condicionado a 23°C, geladeira no 12 (meio da escala) e máximo 8 lâmpadas ligadas simultaneamente. Esta regra simples pode reduzir 30% da sua conta sem investimento.",
        }}
        footerText="<strong>Lembre-se:</strong> Pequenas mudanças de hábito somadas a investimentos inteligentes podem reduzir sua conta de luz em até 80%. Comece pelas ações sem custo e evolua para investimentos maiores."
      />

      <RelatedCalculators category="ferramentas" currentCalculatorId="economia-energia-eletrica" />
    </div>
  );
}