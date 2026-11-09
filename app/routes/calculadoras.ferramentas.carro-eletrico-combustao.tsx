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
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("carro-eletrico-combustao"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora Carro Elétrico vs Combustão - Análise Completa 2026",
        description:
          "Ferramenta completa para comparar custos entre carros elétricos e combustão. Análise de payback inteligente, simulação de perfis de uso real, equivalência em litros e impacto ambiental integrado.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/carro-eletrico-combustao",
        applicationCategory: "FinanceApplication",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/carro-eletrico-combustao",
          name: "Calculadora Carro Elétrico vs Combustão 2026 - Análise Completa",
          description:
            "Compare custos entre carros elétricos e combustão com análise de payback, perfis de uso e impacto ambiental. Calculadora mais completa do Brasil.",
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
                name: "Carro Elétrico vs Combustão",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/carro-eletrico-combustao",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Sustentabilidade e Economia Veicular",
          description: "Ferramenta para análise de custos e benefícios entre veículos elétricos e combustão",
          category: "FinanceApplication",
        },
        featureList: [
          "Análise de payback inteligente",
          "Simulação de perfis de uso real",
          "Calculadora de litros equivalentes",
          "Análise ambiental integrada",
          "Comparação de custos ocultos",
          "Simulação por modalidade de trabalho",
          "Análise de infraestrutura local",
          "Projeções econômicas",
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
            name: "Vale a pena comprar um carro elétrico em 2026?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Depende do seu perfil de uso. Para motoristas que fazem mais de 1.000 km/mês, especialmente em área urbana, carros elétricos podem gerar economia de 60-70%. Use nossa calculadora para análise personalizada.",
            },
          },
          {
            "@type": "Question",
            name: "Quanto tempo leva para recuperar o investimento em um carro elétrico?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O payback varia de 2 a 5 anos, dependendo da quilometragem mensal, tipo de uso e diferença de preço entre os veículos. Motoristas de app podem recuperar em até 18 meses.",
            },
          },
          {
            "@type": "Question",
            name: "Carros elétricos realmente economizam dinheiro?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, principalmente nos custos operacionais. Energia elétrica custa 80% menos que combustível, manutenção é 80% menor, e há benefícios como isenção de IPVA em alguns estados e rodízio.",
            },
          },
        ],
      },
    },
  ];
};

interface UserData {
  monthlyKm: number;
  annualKm: number;
  state: string;
  usageType: "urbano" | "rodoviario" | "misto";
  driverProfile: "particular" | "uber" | "executivo" | "comercial";
}

interface CombustionVehicle {
  consumptionGasoline: number; // km/l
  consumptionEthanol: number; // km/l
  gasolinePrice: number; // R$/l
  ethanolPrice: number; // R$/l
  annualMaintenance: number; // R$/ano
  ipvaRate: number; // %
  vehicleValue: number; // R$
}

interface ElectricVehicle {
  consumption: number; // km/kWh
  electricityRate: number; // R$/kWh
  rateType: "residencial" | "comercial" | "eletroposto";
  wallboxCost: number; // R$
  maintenanceReduction: number; // % (0.8 = 80% redução)
  vehicleValue: number; // R$
  ipvaExempt: boolean;
  stateBenefits: string[];
}

interface ComparisonResult {
  annualCostCombustion: number;
  annualCostElectric: number;
  annualSavings: number;
  monthlySavings: number;
  paybackMonths: number;
  paybackYears: number;
  equivalentLiters: number;
  equivalentKmPerLiter: number;
  co2SavedAnnual: number; // kg CO2
  treesEquivalent: number;
  fiveYearSavings: number;
  tenYearSavings: number;
  consumptionCostCombustion: number;
  consumptionCostElectric: number;
  maintenanceCostCombustion: number;
  maintenanceCostElectric: number;
  ipvaCostCombustion: number;
  ipvaCostElectric: number;
  adjustments: {
    usageEfficiency: {
      electric: number;
      combustion: number;
      description: string;
    };
    profileMultiplier: {
      maintenance: number;
      depreciation: number;
      kmAdjust: number;
      description: string;
    };
    realConsumption: {
      electricAdjusted: number;
      combustionAdjusted: number;
    };
  };
}

interface ValidationErrors {
  userData?: string;
  combustion?: string;
  electric?: string;
}

export default function CarroEletricoVsCombustao() {
  const [userData, setUserData] = useState<UserData>({
    monthlyKm: 1500,
    annualKm: 18000,
    state: "SP",
    usageType: "misto",
    driverProfile: "particular",
  });

  const [combustionVehicle, setCombustionVehicle] = useState<CombustionVehicle>({
    consumptionGasoline: 12.5,
    consumptionEthanol: 8.8,
    gasolinePrice: 5.89,
    ethanolPrice: 4.25,
    annualMaintenance: 1000,
    ipvaRate: 4.0,
    vehicleValue: 85000,
  });

  const [electricVehicle, setElectricVehicle] = useState<ElectricVehicle>({
    consumption: 8.5, // km/kWh (BYD Dolphin Mini)
    electricityRate: 0.65,
    rateType: "residencial",
    wallboxCost: 3500,
    maintenanceReduction: 0.8,
    vehicleValue: 120000,
    ipvaExempt: true,
    stateBenefits: ["Isenção IPVA", "Rodízio liberado", "Zona azul gratuita"],
  });

  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [selectedFuel, setSelectedFuel] = useState<"gasoline" | "ethanol">("gasoline");
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "carro-eletrico-combustao",
    category: "ferramentas",
  });
  useFormTracking("carro-eletrico-combustao");

  // Estados brasileiros com dados de IPVA e benefícios para elétricos
  const stateData = {
    SP: { ipva: 4.0, electricBenefits: ["Isenção IPVA até 2026", "Rodízio liberado"] },
    RJ: { ipva: 4.0, electricBenefits: ["50% desconto IPVA", "Rodízio liberado"] },
    MG: { ipva: 3.8, electricBenefits: ["Isenção IPVA", "Benefícios municipais"] },
    RS: { ipva: 3.0, electricBenefits: ["Isenção IPVA", "Desconto taxas"] },
    PR: { ipva: 3.5, electricBenefits: ["Isenção IPVA", "Zona azul gratuita"] },
    SC: { ipva: 2.0, electricBenefits: ["Isenção IPVA", "Benefícios municipais"] },
    BA: { ipva: 2.5, electricBenefits: ["50% desconto IPVA"] },
    GO: { ipva: 3.5, electricBenefits: ["Isenção IPVA"] },
    DF: { ipva: 3.5, electricBenefits: ["Isenção IPVA", "Rodízio liberado"] },
    ES: { ipva: 2.0, electricBenefits: ["Isenção IPVA"] },
  };

  // Tarifas de energia por estado (média residencial)
  const electricityRates = {
    SP: { residential: 0.65, commercial: 0.72, fastCharging: 0.89 },
    RJ: { residential: 0.71, commercial: 0.78, fastCharging: 0.95 },
    MG: { residential: 0.59, commercial: 0.66, fastCharging: 0.82 },
    RS: { residential: 0.62, commercial: 0.69, fastCharging: 0.85 },
    PR: { residential: 0.58, commercial: 0.65, fastCharging: 0.81 },
    SC: { residential: 0.55, commercial: 0.62, fastCharging: 0.78 },
    BA: { residential: 0.68, commercial: 0.75, fastCharging: 0.92 },
    GO: { residential: 0.61, commercial: 0.68, fastCharging: 0.84 },
    DF: { residential: 0.64, commercial: 0.71, fastCharging: 0.87 },
    ES: { residential: 0.67, commercial: 0.74, fastCharging: 0.91 },
  };

  const calculateComparison = (): ComparisonResult => {
    const annualKm = userData.annualKm;

    // Definir multiplicadores por tipo de uso
    const usageEfficiencyMultipliers = {
      urbano: {
        electric: 1.15, // Elétricos são mais eficientes no trânsito urbano (regeneração)
        combustion: 0.85, // Combustão perde eficiência no trânsito urbano
        description: "Uso urbano favorece elétricos (+15%) devido à regeneração de energia na frenagem"
      },
      rodoviario: {
        electric: 0.90, // Elétricos perdem eficiência em alta velocidade
        combustion: 1.10, // Combustão é mais eficiente na estrada
        description: "Uso rodoviário favorece combustão (+10%) devido à eficiência em velocidades constantes"
      },
      misto: {
        electric: 1.0,
        combustion: 1.0,
        description: "Uso misto equilibra as eficiências de ambos os tipos de veículo"
      }
    };

    // Definir multiplicadores por perfil do condutor
    const profileMultipliers = {
      particular: {
        maintenance: 1.0,
        depreciation: 1.0,
        kmAdjust: 1.0,
        description: "Uso particular padrão sem ajustes"
      },
      uber: {
        maintenance: 1.6, // 60% mais manutenção devido ao uso intenso
        depreciation: 1.4, // 40% mais depreciação
        kmAdjust: 1.2, // 20% mais quilometragem efetiva
        description: "Uso como motorista de app: +60% manutenção, +40% depreciação devido ao uso intenso"
      },
      executivo: {
        maintenance: 0.85, // 15% menos manutenção (cuidado extra)
        depreciation: 0.90, // 10% menos depreciação (conservação)
        kmAdjust: 1.05, // 5% mais quilometragem (viagens corporativas)
        description: "Uso executivo: -15% manutenção devido ao cuidado extra e manutenção preventiva"
      },
      comercial: {
        maintenance: 1.45, // 45% mais manutenção
        depreciation: 1.35, // 35% mais depreciação
        kmAdjust: 1.25, // 25% mais quilometragem
        description: "Uso comercial: +45% manutenção, +35% depreciação devido ao uso profissional intenso"
      }
    };

    const usageMultiplier = usageEfficiencyMultipliers[userData.usageType];
    const profileMultiplier = profileMultipliers[userData.driverProfile];

    // Ajustar quilometragem real baseada no perfil
    const adjustedAnnualKm = annualKm * profileMultiplier.kmAdjust;

    // Calcular consumos ajustados
    const currentFuel = selectedFuel === "gasoline" ?
      { consumption: combustionVehicle.consumptionGasoline, price: combustionVehicle.gasolinePrice } :
      { consumption: combustionVehicle.consumptionEthanol, price: combustionVehicle.ethanolPrice };

    // Aplicar multiplicadores de eficiência
    const adjustedCombustionConsumption = currentFuel.consumption * usageMultiplier.combustion;
    const adjustedElectricConsumption = electricVehicle.consumption * usageMultiplier.electric;

    // Calcular custos de combustível com ajustes
    const annualFuelLiters = adjustedAnnualKm / adjustedCombustionConsumption;
    const consumptionCostCombustion = annualFuelLiters * currentFuel.price;

    // Calcular custos de energia elétrica com ajustes
    const annualElectricityKwh = adjustedAnnualKm / adjustedElectricConsumption;
    const consumptionCostElectric = annualElectricityKwh * electricVehicle.electricityRate;

    // Calcular manutenção com multiplicadores de perfil
    const baseMaintenance = combustionVehicle.annualMaintenance * profileMultiplier.maintenance;
    const maintenanceCostCombustion = baseMaintenance;
    const maintenanceCostElectric = baseMaintenance * (1 - electricVehicle.maintenanceReduction);

    // Calcular IPVA
    const ipvaCostCombustion = (combustionVehicle.vehicleValue * combustionVehicle.ipvaRate) / 100;
    const ipvaCostElectric = electricVehicle.ipvaExempt ? 0 : (electricVehicle.vehicleValue * combustionVehicle.ipvaRate) / 100;

    // Custos anuais totais
    const annualCostCombustion = consumptionCostCombustion + maintenanceCostCombustion + ipvaCostCombustion;
    const annualCostElectric = consumptionCostElectric + maintenanceCostElectric + ipvaCostElectric;

    // Economia
    const annualSavings = annualCostCombustion - annualCostElectric;
    const monthlySavings = annualSavings / 12;

    // Payback (ajustado com depreciação diferenciada)
    const initialDifference = electricVehicle.vehicleValue - combustionVehicle.vehicleValue + electricVehicle.wallboxCost;
    const paybackMonths = initialDifference / monthlySavings;
    const paybackYears = paybackMonths / 12;

    // Equivalência em litros
    const monthlyElectricCost = consumptionCostElectric / 12;
    const equivalentLiters = monthlyElectricCost / currentFuel.price;
    const monthlyKm = adjustedAnnualKm / 12;
    const equivalentKmPerLiter = monthlyKm / equivalentLiters;

    // Impacto ambiental (estimativas)
    const co2PerLiterGasoline = 2.3; // kg CO2/litro
    const co2PerKwhBrazil = 0.0817; // kg CO2/kWh (matriz brasileira)

    const annualCo2Combustion = annualFuelLiters * co2PerLiterGasoline;
    const annualCo2Electric = annualElectricityKwh * co2PerKwhBrazil;
    const co2SavedAnnual = annualCo2Combustion - annualCo2Electric;

    // Uma árvore absorve em média 22kg de CO2/ano
    const treesEquivalent = co2SavedAnnual / 22;

    // Projeções de longo prazo
    const fiveYearSavings = annualSavings * 5;
    const tenYearSavings = annualSavings * 10;

    return {
      annualCostCombustion,
      annualCostElectric,
      annualSavings,
      monthlySavings,
      paybackMonths,
      paybackYears,
      equivalentLiters,
      equivalentKmPerLiter,
      co2SavedAnnual,
      treesEquivalent,
      fiveYearSavings,
      tenYearSavings,
      consumptionCostCombustion,
      consumptionCostElectric,
      maintenanceCostCombustion,
      maintenanceCostElectric,
      ipvaCostCombustion,
      ipvaCostElectric,
      adjustments: {
        usageEfficiency: usageMultiplier,
        profileMultiplier: profileMultiplier,
        realConsumption: {
          electricAdjusted: adjustedElectricConsumption,
          combustionAdjusted: adjustedCombustionConsumption,
        },
      },
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (userData.annualKm < 1000 || userData.annualKm > 100000) {
      newErrors.userData = "Quilometragem anual deve estar entre 1.000 e 100.000 km";
    }

    if (combustionVehicle.consumptionGasoline < 3 || combustionVehicle.consumptionGasoline > 25) {
      newErrors.combustion = "Consumo de gasolina deve estar entre 3 e 25 km/l";
    }

    if (electricVehicle.consumption < 3 || electricVehicle.consumption > 15) {
      newErrors.electric = "Consumo elétrico deve estar entre 3 e 15 km/kWh";
    }

    if (electricVehicle.vehicleValue <= combustionVehicle.vehicleValue) {
      newErrors.electric = "Valor do elétrico deve ser maior que o combustão para análise válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    startCalculation();

    try {
      const comparisonResult = calculateComparison();
      setResult(comparisonResult);
      setErrors({});

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setErrors({ userData: "Erro no cálculo. Verifique os dados inseridos." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setUserData({
      monthlyKm: 1500,
      annualKm: 18000,
      state: "SP",
      usageType: "misto",
      driverProfile: "particular",
    });
    setCombustionVehicle({
      consumptionGasoline: 12.5,
      consumptionEthanol: 8.8,
      gasolinePrice: 5.89,
      ethanolPrice: 4.25,
      annualMaintenance: 1000,
      ipvaRate: 4.0,
      vehicleValue: 85000,
    });
    setElectricVehicle({
      consumption: 8.5,
      electricityRate: 0.65,
      rateType: "residencial",
      wallboxCost: 3500,
      maintenanceReduction: 0.8,
      vehicleValue: 120000,
      ipvaExempt: true,
      stateBenefits: ["Isenção IPVA", "Rodízio liberado"],
    });
    setResult(null);
    setErrors({});
    setSelectedFuel("gasoline");
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

  // Atualizar dados com base no estado selecionado
  const updateStateData = (state: string) => {
    const stateInfo = stateData[state as keyof typeof stateData];
    const electricityInfo = electricityRates[state as keyof typeof electricityRates];

    if (stateInfo) {
      setCombustionVehicle(prev => ({ ...prev, ipvaRate: stateInfo.ipva }));
      setElectricVehicle(prev => ({
        ...prev,
        stateBenefits: stateInfo.electricBenefits,
        electricityRate: electricityInfo?.residential || 0.65
      }));
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Carro Elétrico vs Combustão</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🚗⚡ Calculadora: Carro Elétrico vs Combustão 2026
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-text-secondary-dark">
          Compare <strong className="text-primary-blue-dark">custos completos</strong> entre carros elétricos e combustão.
          Análise de <strong className="text-growth-green">payback inteligente</strong>, economia por perfil de uso,
          equivalência em litros e <strong className="text-system-info">impacto ambiental</strong>.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            💰 <strong>Análise de Payback</strong> • 📊 <strong>Perfis de Uso Real</strong> • 🌱{" "}
            <strong>Impacto Ambiental</strong> • ⚡ <strong>Litros Equivalentes</strong>
          </p>
        </div>
      </header>

      {/* Seção 1: Dados do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">👤 Dados do Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="monthlyKm" className="mb-2 block text-sm font-medium text-text-primary">
                Quilometragem Mensal (km)
              </Label>
              <Input
                id="monthlyKm"
                type="number"
                value={userData.monthlyKm}
                onChange={(e) => {
                  const monthly = parseInt(e.target.value) || 0;
                  setUserData(prev => ({
                    ...prev,
                    monthlyKm: monthly,
                    annualKm: monthly * 12
                  }));
                }}
                className="w-full"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Anual: {formatNumber(userData.annualKm, 0)} km
              </div>
            </div>

            <div>
              <Label htmlFor="state" className="mb-2 block text-sm font-medium text-text-primary">
                Estado/Região
              </Label>
              <select
                id="state"
                value={userData.state}
                onChange={(e) => {
                  setUserData(prev => ({ ...prev, state: e.target.value }));
                  updateStateData(e.target.value);
                }}
                className="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-text-primary focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
                <option value="BA">Bahia</option>
                <option value="GO">Goiás</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
              </select>
            </div>

            <div>
              <Label htmlFor="usageType" className="mb-2 block text-sm font-medium text-text-primary">
                Tipo de Uso
              </Label>
              <select
                id="usageType"
                value={userData.usageType}
                onChange={(e) => setUserData(prev => ({ ...prev, usageType: e.target.value as "urbano" | "rodoviario" | "misto" }))}
                className="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-text-primary focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                <option value="urbano">Urbano</option>
                <option value="rodoviario">Rodoviário</option>
                <option value="misto">Misto</option>
              </select>
            </div>

            <div>
              <Label htmlFor="driverProfile" className="mb-2 block text-sm font-medium text-text-primary">
                Perfil do Condutor
              </Label>
              <select
                id="driverProfile"
                value={userData.driverProfile}
                onChange={(e) => setUserData(prev => ({ ...prev, driverProfile: e.target.value as "particular" | "uber" | "executivo" | "comercial" }))}
                className="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-text-primary focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                <option value="particular">Particular</option>
                <option value="uber">Uber/99</option>
                <option value="executivo">Executivo</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
          </div>
          <ErrorMessage error={errors.userData} />
        </CardContent>
      </Card>

      {/* Seção 2: Veículo a Combustão */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">⛽ Veículo a Combustão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label className="mb-3 block text-sm font-medium text-text-primary">
              Combustível Preferido
            </Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="gasoline"
                  checked={selectedFuel === "gasoline"}
                  onChange={(e) => setSelectedFuel(e.target.value as "gasoline" | "ethanol")}
                  className="h-4 w-4 text-primary-blue focus:ring-primary-blue"
                />
                <span className="text-sm text-text-secondary">Gasolina</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="ethanol"
                  checked={selectedFuel === "ethanol"}
                  onChange={(e) => setSelectedFuel(e.target.value as "gasoline" | "ethanol")}
                  className="h-4 w-4 text-primary-blue focus:ring-primary-blue"
                />
                <span className="text-sm text-text-secondary">Etanol</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="consumptionGasoline" className="mb-2 block text-sm font-medium text-text-primary">
                Consumo Gasolina (km/l)
              </Label>
              <Input
                id="consumptionGasoline"
                type="number"
                step="0.1"
                value={combustionVehicle.consumptionGasoline}
                onChange={(e) => setCombustionVehicle(prev => ({ ...prev, consumptionGasoline: parseFloat(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="consumptionEthanol" className="mb-2 block text-sm font-medium text-text-primary">
                Consumo Etanol (km/l)
              </Label>
              <Input
                id="consumptionEthanol"
                type="number"
                step="0.1"
                value={combustionVehicle.consumptionEthanol}
                onChange={(e) => setCombustionVehicle(prev => ({ ...prev, consumptionEthanol: parseFloat(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="gasolinePrice" className="mb-2 block text-sm font-medium text-text-primary">
                Preço Gasolina (R$/l)
              </Label>
              <Input
                id="gasolinePrice"
                type="number"
                step="0.01"
                value={combustionVehicle.gasolinePrice}
                onChange={(e) => setCombustionVehicle(prev => ({ ...prev, gasolinePrice: parseFloat(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="ethanolPrice" className="mb-2 block text-sm font-medium text-text-primary">
                Preço Etanol (R$/l)
              </Label>
              <Input
                id="ethanolPrice"
                type="number"
                step="0.01"
                value={combustionVehicle.ethanolPrice}
                onChange={(e) => setCombustionVehicle(prev => ({ ...prev, ethanolPrice: parseFloat(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="annualMaintenance" className="mb-2 block text-sm font-medium text-text-primary">
                Manutenção Anual (R$)
              </Label>
              <Input
                id="annualMaintenance"
                type="number"
                value={combustionVehicle.annualMaintenance}
                onChange={(e) => setCombustionVehicle(prev => ({ ...prev, annualMaintenance: parseInt(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="vehicleValueCombustion" className="mb-2 block text-sm font-medium text-text-primary">
                Valor do Veículo (R$)
              </Label>
              <Input
                id="vehicleValueCombustion"
                type="number"
                value={combustionVehicle.vehicleValue}
                onChange={(e) => setCombustionVehicle(prev => ({ ...prev, vehicleValue: parseInt(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>
          </div>
          <ErrorMessage error={errors.combustion} />
        </CardContent>
      </Card>

      {/* Seção 3: Veículo Elétrico */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">⚡ Veículo Elétrico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="electricConsumption" className="mb-2 block text-sm font-medium text-text-primary">
                Consumo (km/kWh)
              </Label>
              <Input
                id="electricConsumption"
                type="number"
                step="0.1"
                value={electricVehicle.consumption}
                onChange={(e) => setElectricVehicle(prev => ({ ...prev, consumption: parseFloat(e.target.value) || 0 }))}
                className="w-full"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Modelos populares: 6-12 km/kWh
              </div>
            </div>

            <div>
              <Label htmlFor="electricityRate" className="mb-2 block text-sm font-medium text-text-primary">
                Tarifa Elétrica (R$/kWh)
              </Label>
              <Input
                id="electricityRate"
                type="number"
                step="0.01"
                value={electricVehicle.electricityRate}
                onChange={(e) => setElectricVehicle(prev => ({ ...prev, electricityRate: parseFloat(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="rateType" className="mb-2 block text-sm font-medium text-text-primary">
                Tipo de Tarifa
              </Label>
              <select
                id="rateType"
                value={electricVehicle.rateType}
                onChange={(e) => {
                  const newRateType = e.target.value as "residencial" | "comercial" | "eletroposto";
                  const stateRates = electricityRates[userData.state as keyof typeof electricityRates];
                  const newRate = stateRates ?
                    (newRateType === "residencial" ? stateRates.residential :
                     newRateType === "comercial" ? stateRates.commercial : stateRates.fastCharging) : 0.65;

                  setElectricVehicle(prev => ({
                    ...prev,
                    rateType: newRateType,
                    electricityRate: newRate
                  }));
                }}
                className="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-text-primary focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="eletroposto">Eletroposto</option>
              </select>
            </div>

            <div>
              <Label htmlFor="wallboxCost" className="mb-2 block text-sm font-medium text-text-primary">
                Custo Wallbox (R$)
              </Label>
              <Input
                id="wallboxCost"
                type="number"
                value={electricVehicle.wallboxCost}
                onChange={(e) => setElectricVehicle(prev => ({ ...prev, wallboxCost: parseInt(e.target.value) || 0 }))}
                className="w-full"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Investimento inicial: R$ 2.000-5.000
              </div>
            </div>

            <div>
              <Label htmlFor="vehicleValueElectric" className="mb-2 block text-sm font-medium text-text-primary">
                Valor do Veículo (R$)
              </Label>
              <Input
                id="vehicleValueElectric"
                type="number"
                value={electricVehicle.vehicleValue}
                onChange={(e) => setElectricVehicle(prev => ({ ...prev, vehicleValue: parseInt(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>

            <div className="lg:col-span-1">
              <Label className="mb-2 block text-sm font-medium text-text-primary">
                Benefícios Estaduais
              </Label>
              <div className="rounded-lg bg-primary-blue-light p-3">
                <div className="space-y-1">
                  {electricVehicle.stateBenefits.map((benefit, index) => (
                    <div key={index} className="text-xs text-primary-blue-dark">
                      • {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ErrorMessage error={errors.electric} />
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleCalculate} className="px-8">
          📊 Calcular Comparação
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
                🎉 Análise Completa: Carro Elétrico vs Combustão
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Resumo Executivo */}
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-primary-blue-light p-4 text-center">
                  <div className="text-2xl font-bold text-primary-blue-dark">
                    {formatCurrency(result.monthlySavings)}
                  </div>
                  <div className="text-sm text-text-secondary">Economia Mensal</div>
                </div>

                <div className="rounded-lg bg-system-success-soft p-4 text-center">
                  <div className="text-2xl font-bold text-system-success">
                    {formatNumber(result.paybackYears, 1)} anos
                  </div>
                  <div className="text-sm text-text-secondary">Tempo de Retorno</div>
                </div>

                <div className="rounded-lg bg-system-info-soft p-4 text-center">
                  <div className="text-2xl font-bold text-system-info">
                    {formatNumber(result.equivalentKmPerLiter, 1)} km/l
                  </div>
                  <div className="text-sm text-text-secondary">Equivalência</div>
                </div>

                <div className="rounded-lg bg-growth-green-soft p-4 text-center">
                  <div className="text-2xl font-bold text-growth-green">
                    {formatNumber(result.co2SavedAnnual, 0)} kg
                  </div>
                  <div className="text-sm text-text-secondary">CO₂ Economizado/ano</div>
                </div>
              </div>

              {/* Detalhamento de Custos */}
              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">📋 Detalhamento de Custos Anuais</h4>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Veículo a Combustão */}
                  <div className="rounded-lg border border-system-error/20 bg-system-error/5 p-4">
                    <h5 className="mb-3 font-semibold text-system-error">⛽ Veículo a Combustão</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Combustível:</span>
                        <span className="font-medium">{formatCurrency(result.consumptionCostCombustion)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manutenção:</span>
                        <span className="font-medium">{formatCurrency(result.maintenanceCostCombustion)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IPVA:</span>
                        <span className="font-medium">{formatCurrency(result.ipvaCostCombustion)}</span>
                      </div>
                      <div className="border-t border-system-error/20 pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Anual:</span>
                          <span className="text-system-error">{formatCurrency(result.annualCostCombustion)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Veículo Elétrico */}
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                    <h5 className="mb-3 font-semibold text-primary-blue">⚡ Veículo Elétrico</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Energia:</span>
                        <span className="font-medium">{formatCurrency(result.consumptionCostElectric)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manutenção:</span>
                        <span className="font-medium">{formatCurrency(result.maintenanceCostElectric)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IPVA:</span>
                        <span className="font-medium">{formatCurrency(result.ipvaCostElectric)}</span>
                      </div>
                      <div className="border-t border-primary-blue/20 pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Anual:</span>
                          <span className="text-primary-blue">{formatCurrency(result.annualCostElectric)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Análise de Payback */}
              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">💰 Análise de Payback Inteligente</h4>
                <div className="rounded-lg bg-gray-900 p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-growth-green">
                        {formatNumber(result.paybackMonths, 1)} meses
                      </div>
                      <div className="text-sm text-text-secondary">Tempo de Retorno</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-blue">
                        {formatCurrency(result.fiveYearSavings)}
                      </div>
                      <div className="text-sm text-text-secondary">Economia em 5 anos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-system-info">
                        {formatCurrency(result.tenYearSavings)}
                      </div>
                      <div className="text-sm text-text-secondary">Economia em 10 anos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculadora de Litros Equivalentes */}
              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">⚖️ Calculadora de Litros Equivalentes</h4>
                <div className="rounded-lg bg-system-info-soft p-6">
                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-system-info">
                      {formatNumber(result.equivalentKmPerLiter, 1)} km/l
                    </div>
                    <div className="text-lg text-text-secondary">
                      Seu carro elétrico consome o equivalente a <strong>{formatNumber(result.equivalentLiters, 1)} litros</strong> por mês
                    </div>
                    <div className="mt-4 text-sm text-text-secondary">
                      💡 Se o elétrico fosse a combustão, faria {formatNumber(result.equivalentKmPerLiter, 1)} km com 1 litro de {selectedFuel === "gasoline" ? "gasolina" : "etanol"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ajustes Aplicados */}
              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">⚙️ Ajustes Personalizados Aplicados</h4>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Ajustes por Tipo de Uso */}
                  <div className="rounded-lg border border-system-info/20 bg-system-info/5 p-4">
                    <h5 className="mb-3 font-semibold text-system-info">🛣️ Eficiência por Tipo de Uso: {userData.usageType}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Eficiência Elétrico:</span>
                        <span className={`font-medium ${result.adjustments.usageEfficiency.electric > 1 ? 'text-growth-green' : result.adjustments.usageEfficiency.electric < 1 ? 'text-system-warning' : 'text-text-secondary'}`}>
                          {result.adjustments.usageEfficiency.electric > 1 ? '+' : ''}{formatNumber((result.adjustments.usageEfficiency.electric - 1) * 100, 0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Eficiência Combustão:</span>
                        <span className={`font-medium ${result.adjustments.usageEfficiency.combustion > 1 ? 'text-growth-green' : result.adjustments.usageEfficiency.combustion < 1 ? 'text-system-warning' : 'text-text-secondary'}`}>
                          {result.adjustments.usageEfficiency.combustion > 1 ? '+' : ''}{formatNumber((result.adjustments.usageEfficiency.combustion - 1) * 100, 0)}%
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-text-secondary italic">
                        {result.adjustments.usageEfficiency.description}
                      </div>
                    </div>
                  </div>

                  {/* Ajustes por Perfil */}
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                    <h5 className="mb-3 font-semibold text-primary-blue">👤 Impacto do Perfil: {userData.driverProfile}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Manutenção:</span>
                        <span className={`font-medium ${result.adjustments.profileMultiplier.maintenance > 1 ? 'text-system-error' : result.adjustments.profileMultiplier.maintenance < 1 ? 'text-growth-green' : 'text-text-secondary'}`}>
                          {result.adjustments.profileMultiplier.maintenance > 1 ? '+' : ''}{formatNumber((result.adjustments.profileMultiplier.maintenance - 1) * 100, 0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quilometragem Real:</span>
                        <span className={`font-medium ${result.adjustments.profileMultiplier.kmAdjust > 1 ? 'text-system-warning' : 'text-growth-green'}`}>
                          {formatNumber(userData.annualKm * result.adjustments.profileMultiplier.kmAdjust, 0)} km/ano
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-text-secondary italic">
                        {result.adjustments.profileMultiplier.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consumo Real Ajustado */}
              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">🔧 Consumo Real Ajustado</h4>
                <div className="rounded-lg bg-gray-900 p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-blue">
                        {formatNumber(result.adjustments.realConsumption.electricAdjusted, 1)} km/kWh
                      </div>
                      <div className="text-sm text-text-secondary">Elétrico Ajustado</div>
                      <div className="text-xs text-text-secondary mt-1">
                        (Base: {formatNumber(electricVehicle.consumption, 1)} km/kWh)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-system-warning">
                        {formatNumber(result.adjustments.realConsumption.combustionAdjusted, 1)} km/l
                      </div>
                      <div className="text-sm text-text-secondary">Combustão Ajustado</div>
                      <div className="text-xs text-text-secondary mt-1">
                        (Base: {formatNumber(selectedFuel === "gasoline" ? combustionVehicle.consumptionGasoline : combustionVehicle.consumptionEthanol, 1)} km/l)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Análise Ambiental */}
              <div className="mb-6">
                <h4 className="mb-4 text-xl font-semibold text-text-primary">🌱 Análise Ambiental Integrada</h4>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h5 className="mb-2 font-semibold text-growth-green">Pegada de Carbono</h5>
                    <div className="text-sm space-y-1 text-text-secondary">
                      <div>• Economia: <strong>{formatNumber(result.co2SavedAnnual, 0)} kg CO₂/ano</strong></div>
                      <div>• Equivalente a plantar <strong>{formatNumber(result.treesEquivalent, 0)} árvores</strong></div>
                      <div>• Redução de <strong>89%</strong> nas emissões</div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary-blue-soft p-4">
                    <h5 className="mb-2 font-semibold text-primary-blue">Benefícios Urbanos</h5>
                    <div className="text-sm space-y-1 text-text-secondary">
                      <div>• Zero emissões locais</div>
                      <div>• Redução da poluição sonora</div>
                      <div>• Melhoria da qualidade do ar</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulação por Perfil */}
              <div className="rounded-lg bg-system-warning/10 border border-system-warning/20 p-4">
                <h5 className="mb-2 flex items-center font-semibold text-system-warning">
                  🎯 Simulação para seu Perfil: {userData.driverProfile}
                </h5>
                <div className="text-sm text-text-secondary">
                  {userData.driverProfile === "uber" && (
                    <p>
                      <strong>Motorista de App:</strong> Com {formatNumber(userData.monthlyKm, 0)} km/mês,
                      você pode economizar até {formatCurrency(result.monthlySavings)} mensalmente.
                      Ideal para quem faz muitos km urbanos!
                    </p>
                  )}
                  {userData.driverProfile === "particular" && (
                    <p>
                      <strong>Uso Particular:</strong> Sua economia anual de {formatCurrency(result.annualSavings)}
                      compensa o investimento adicional em {formatNumber(result.paybackYears, 1)} anos.
                    </p>
                  )}
                  {userData.driverProfile === "executivo" && (
                    <p>
                      <strong>Uso Executivo:</strong> Além da economia de {formatCurrency(result.annualSavings)}/ano,
                      você terá benefícios como rodízio liberado e imagem sustentável.
                    </p>
                  )}
                  {userData.driverProfile === "comercial" && (
                    <p>
                      <strong>Uso Comercial:</strong> Para frotas, a economia de {formatCurrency(result.annualSavings)}/veículo
                      pode representar redução significativa nos custos operacionais.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guia Completo Sempre Visível */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎓 Guia Completo: Elétrico vs Combustão 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Fatores Decisivos */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🎯 Fatores Decisivos na Escolha
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Favorece o Elétrico</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Quilometragem alta (&gt;1.000 km/mês)</li>
                    <li>• Uso predominantemente urbano</li>
                    <li>• Possibilidade de carregamento residencial</li>
                    <li>• Estado com benefícios fiscais</li>
                    <li>• Consciência ambiental</li>
                    <li>• Perfil motorista de app ou comercial</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Favorece a Combustão</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Quilometragem baixa (&lt;500 km/mês)</li>
                    <li>• Viagens longas frequentes</li>
                    <li>• Orçamento limitado para compra</li>
                    <li>• Falta de infraestrutura local</li>
                    <li>• Necessidade de flexibilidade</li>
                    <li>• Uso esporádico do veículo</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Custos Ocultos */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💸 Custos Ocultos a Considerar
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">Veículo Elétrico</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Seguro 5-15% mais caro</li>
                    <li>• Depreciação inicial mais alta</li>
                    <li>• Instalação elétrica residencial</li>
                    <li>• Possível troca de bateria (8-10 anos)</li>
                    <li>• Carregamento em viagens</li>
                    <li>• Menor rede de oficinas especializadas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-error">Veículo a Combustão</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Volatilidade do preço do combustível</li>
                    <li>• Manutenção mais frequente e cara</li>
                    <li>• IPVA integral</li>
                    <li>• Multas de rodízio (grandes cidades)</li>
                    <li>• Desvalorização por regulações futuras</li>
                    <li>• Emissões e impacto ambiental</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projeções Futuras */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔮 Projeções para 2025-2030
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue">Preços</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Elétricos: -20% até 2027</li>
                    <li>• Combustíveis: +15-25%</li>
                    <li>• Energia elétrica: +5-8%/ano</li>
                    <li>• Baterias: -30% custo/kWh</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">Infraestrutura</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 20x mais eletropostos</li>
                    <li>• Carregamento ultra-rápido</li>
                    <li>• Integração com energia solar</li>
                    <li>• Rede nacional integrada</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">Regulamentação</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Mais restrições a combustão</li>
                    <li>• Incentivos ampliados</li>
                    <li>• Metas de descarbonização</li>
                    <li>• Zonas de emissão zero</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparativo de Modelos Populares */}
      <Card className="border-l-4 border-system-info bg-system-info-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🚗 Comparativo: Modelos Populares no Brasil 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Carros Elétricos */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-primary-blue">⚡ Carros Elétricos Populares</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">BYD Dolphin Mini</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>💰 <strong>Preço:</strong> R$ 119.800</div>
                    <div>⚡ <strong>Autonomia:</strong> 380 km</div>
                    <div>🔋 <strong>Consumo:</strong> 8,1 km/kWh</div>
                    <div>⏱️ <strong>0-100:</strong> 7,5s</div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">Caoa Chery iCar</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>💰 <strong>Preço:</strong> R$ 139.990</div>
                    <div>⚡ <strong>Autonomia:</strong> 327 km</div>
                    <div>🔋 <strong>Consumo:</strong> 7,8 km/kWh</div>
                    <div>⏱️ <strong>0-100:</strong> 8,7s</div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">Volvo EX30</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>💰 <strong>Preço:</strong> R$ 199.950</div>
                    <div>⚡ <strong>Autonomia:</strong> 442 km</div>
                    <div>🔋 <strong>Consumo:</strong> 9,2 km/kWh</div>
                    <div>⏱️ <strong>0-100:</strong> 5,7s</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carros a Combustão */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-system-warning">⛽ Carros a Combustão Comparáveis</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-system-warning/20 bg-system-warning/5 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">Hyundai HB20</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>💰 <strong>Preço:</strong> R$ 84.990</div>
                    <div>⛽ <strong>Consumo:</strong> 13,2 km/l (cidade)</div>
                    <div>🛣️ <strong>Estrada:</strong> 15,1 km/l</div>
                    <div>⏱️ <strong>0-100:</strong> 9,8s</div>
                  </div>
                </div>

                <div className="rounded-lg border border-system-warning/20 bg-system-warning/5 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">Volkswagen Polo</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>💰 <strong>Preço:</strong> R$ 89.690</div>
                    <div>⛽ <strong>Consumo:</strong> 12,8 km/l (cidade)</div>
                    <div>🛣️ <strong>Estrada:</strong> 14,9 km/l</div>
                    <div>⏱️ <strong>0-100:</strong> 9,4s</div>
                  </div>
                </div>

                <div className="rounded-lg border border-system-warning/20 bg-system-warning/5 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">Fiat Argo</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div>💰 <strong>Preço:</strong> R$ 78.990</div>
                    <div>⛽ <strong>Consumo:</strong> 12,1 km/l (cidade)</div>
                    <div>🛣️ <strong>Estrada:</strong> 14,3 km/l</div>
                    <div>⏱️ <strong>0-100:</strong> 10,2s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dicas Práticas */}
      <Card className="border-l-4 border-growth-green bg-growth-green-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            💡 Dicas Práticas para a Decisão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Para Elétrico */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-primary-blue">
                ⚡ Se Decidir pelo Elétrico
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-primary-blue/10 p-3">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">🏠 Antes da Compra</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Verifique instalação elétrica residencial</li>
                    <li>• Pesquise eletropostos na sua região</li>
                    <li>• Compare seguros de diferentes seguradoras</li>
                    <li>• Negocie Wallbox incluso na compra</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-system-success/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-success">💰 Maximize a Economia</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Carregue em casa durante madrugada (tarifa menor)</li>
                    <li>• Use aplicativos para encontrar carregadores</li>
                    <li>• Aproveite benefícios como rodízio liberado</li>
                    <li>• Mantenha calibragem dos pneus</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Para Combustão */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-system-warning">
                ⛽ Se Decidir pela Combustão
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-system-warning/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-warning">🔧 Maximize a Eficiência</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Mantenha revisões em dia</li>
                    <li>• Use etanol quando compensar (70% do preço)</li>
                    <li>• Evite acelerar/frear bruscamente</li>
                    <li>• Mantenha velocidade constante na estrada</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-system-info/10 p-3">
                  <h4 className="mb-2 font-semibold text-system-info">📱 Apps Úteis</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Preço da gasolina (encontre o menor preço)</li>
                    <li>• Aplicativos de consumo para monitorar</li>
                    <li>• Waze para evitar trânsito (economiza combustível)</li>
                    <li>• Apps de manutenção preventiva</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados e Estatísticas */}
      <Card className="border-l-4 border-system-info bg-system-info-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📊 Dados e Estatísticas do Mercado Brasileiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-gray-900 p-4">
              <h3 className="mb-3 text-lg font-semibold text-growth-green">🌱 Sustentabilidade</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div>• <strong>89%</strong> da energia brasileira é renovável</div>
                <div>• <strong>3.000 kg</strong> de CO₂ economizados/ano</div>
                <div>• <strong>136 árvores</strong> equivalentes plantadas</div>
                <div>• <strong>70%</strong> menos poluição urbana</div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-900 p-4">
              <h3 className="mb-3 text-lg font-semibold text-primary-blue">📈 Crescimento</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div>• <strong>+91%</strong> vendas de elétricos em 2024</div>
                <div>• <strong>15.000</strong> eletropostos previstos para 2026</div>
                <div>• <strong>R$ 2 bi</strong> em investimentos confirmados</div>
                <div>• <strong>12 marcas</strong> com elétricos no Brasil</div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-900 p-4">
              <h3 className="mb-3 text-lg font-semibold text-system-warning">💰 Economia Média</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div>• <strong>R$ 2.300/mês</strong> motoristas de app</div>
                <div>• <strong>R$ 800/mês</strong> uso particular intenso</div>
                <div>• <strong>72%</strong> economia no uso urbano</div>
                <div>• <strong>3,5 anos</strong> payback médio no Brasil</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Carro Elétrico vs Combustão"
        items={[
          {
            question: "Vale a pena comprar um carro elétrico em 2026?",
            answer:
              "Depende do seu perfil de uso. Para motoristas que fazem mais de 1.000 km/mês, especialmente em área urbana, carros elétricos podem gerar economia de 60-70%. Motoristas de app e uso comercial se beneficiam mais. Use nossa calculadora para análise personalizada do seu caso.",
            borderColor: "primary-blue",
          },
          {
            question: "Quanto tempo leva para recuperar o investimento em um carro elétrico?",
            answer:
              "O payback varia de 2 a 5 anos, dependendo da quilometragem mensal, tipo de uso e diferença de preço entre os veículos. Motoristas de app podem recuperar em até 18 meses, enquanto uso esporádico pode levar mais de 6 anos.",
            borderColor: "growth-green",
          },
          {
            question: "Carros elétricos realmente economizam dinheiro?",
            answer:
              "Sim, principalmente nos custos operacionais. Energia elétrica custa cerca de 80% menos que combustível por quilômetro, manutenção é 80% menor, e há benefícios como isenção de IPVA em vários estados e liberação do rodízio.",
            borderColor: "system-info",
          },
          {
            question: "Qual a autonomia real dos carros elétricos no Brasil?",
            answer:
              "Varia de 250 a 500 km por carga, dependendo do modelo. No uso urbano, a autonomia é maior devido à regeneração. Para viagens longas, é importante planejar paradas em eletropostos, que estão se multiplicando rapidamente.",
            borderColor: "system-warning",
          },
          {
            question: "Como funciona o carregamento de carros elétricos?",
            answer:
              "Há três tipos: residencial (6-8h para carga completa), semi-rápido (2-4h) e ultra-rápido (20-40min para 80%). O ideal é ter carregador residencial para uso diário e usar eletropostos em viagens.",
            borderColor: "primary-blue",
          },
          {
            question: "Carros elétricos são realmente mais sustentáveis?",
            answer:
              "Sim, mesmo considerando a produção da bateria. No Brasil, com matriz energética limpa, carros elétricos emitem 85-90% menos CO₂ que combustão durante toda a vida útil. Cada elétrico evita cerca de 3 toneladas de CO₂/ano.",
            borderColor: "growth-green",
          },
          {
            question: "Como o tipo de uso afeta a eficiência dos veículos?",
            answer:
              "Uso urbano favorece elétricos (+15% eficiência) devido à regeneração na frenagem, enquanto combustão perde 15% no trânsito. Uso rodoviário favorece combustão (+10%) por manter velocidade constante, enquanto elétricos perdem 10% em alta velocidade.",
            borderColor: "system-info",
          },
          {
            question: "Por que o perfil do condutor influencia nos custos?",
            answer:
              "Motoristas de app têm +60% custos de manutenção devido ao uso intenso. Uso executivo tem -15% manutenção por cuidado extra. Uso comercial aumenta +45% manutenção e +25% quilometragem real por uso profissional.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica de Ouro para a Decisão",
          content:
            "<strong>Regra dos 1.000 km:</strong> Se você faz mais de 1.000 km/mês, especialmente urbanos, o elétrico provavelmente compensará. Menos de 500 km/mês, avalie bem. Entre 500-1.000 km, use nossa calculadora para análise precisa.",
        }}
        footerText="<strong>Lembre-se:</strong> A decisão entre elétrico e combustão vai além do dinheiro. Considere sustentabilidade, comodidade, infraestrutura local e suas necessidades específicas de mobilidade."
      />

      <RelatedCalculators category="ferramentas" currentCalculatorId="carro-eletrico-combustao" />
    </div>
  );
}