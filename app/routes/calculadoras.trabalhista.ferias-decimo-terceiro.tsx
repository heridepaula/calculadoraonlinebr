import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  MoneyInput,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateVacation,
  calculateThirteenthSalary,
  type VacationParams,
  type VacationResult,
  type ThirteenthSalaryParams,
  type ThirteenthSalaryResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Calculadora de Férias e 13º Salário 2025 – CLT Atualizada | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Calcule férias e 13º salário 2025 facilmente: valores líquidos, INSS, IRRF, abono pecuniário e adiantamentos. Atualizada conforme CLT.",
    },
    {
      name: "keywords",
      content:
        "calculadora férias 13 salário, décimo terceiro, abono pecuniário, terço constitucional, CLT, direitos trabalhistas",
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
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
    },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: "Calculadora de Férias e 13º Salário 2025 – CLT Atualizada",
    },
    {
      property: "og:description",
      content:
        "Calcule férias e 13º salário 2025 facilmente: valores líquidos, INSS, IRRF, abono pecuniário e adiantamentos. Atualizada conforme CLT.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora de Férias e 13º Salário CLT 2025 - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Descubra quanto você vai receber de férias e décimo terceiro! Cálculo completo com todas as tabelas oficiais 2025.",
    },
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
        name: "Calculadora de Férias e 13º Salário - Simulador CLT 2025",
        description:
          "Simulador gratuito e confiável de férias e décimo terceiro salário com tabelas INSS e IRRF 2025. Calcule valores líquidos, abono pecuniário e adiantamentos conforme CLT.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
        applicationCategory: "FinanceApplication",
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
            "https://twitter.com/CalculadoraBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
          name: "Calculadora de Férias e 13º Salário 2025 - Simulador CLT",
          description:
            "Calcule férias e 13º salário 2025 facilmente: valores líquidos, INSS, IRRF, abono pecuniário e adiantamentos. Atualizada conforme CLT.",
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
                name: "Trabalhista",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Férias e 13º Salário",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/ferias-decimo-terceiro",
              },
            ],
          },
        },
        about: {
          "@type": "Service",
          name: "Férias e Décimo Terceiro Salário CLT",
          description: "Direitos trabalhistas garantidos pela CLT para trabalhadores com carteira assinada",
          category: "LaborRights",
        },
        featureList: [
          "Cálculo de férias proporcionais e integrais",
          "Cálculo de décimo terceiro salário",
          "Terço constitucional de férias",
          "Abono pecuniário (venda de férias)",
          "Descontos de INSS e IRRF",
          "Simulação de adiantamentos",
          "Interface móvel responsiva",
          "Resultados em tempo real",
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
            name: "Como calcular férias e 13º salário?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Férias: salário + 1/3 constitucional. 13º salário: salário ÷ 12 × meses trabalhados. Ambos têm descontos de INSS e IRRF conforme tabelas 2025."
            }
          },
          {
            "@type": "Question", 
            name: "Quando tenho direito a férias integrais?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Direito a 30 dias de férias após 12 meses de trabalho. Férias proporcionais para período menor. Pode vender até 10 dias (abono pecuniário)."
            }
          },
          {
            "@type": "Question",
            name: "Como funciona o abono pecuniário?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Venda de até 1/3 das férias (10 dias). Valor: salário ÷ 30 × dias vendidos + 1/3 constitucional sobre o valor vendido."
            }
          }
        ]
      })
    }
  ];
};

export default function VacationAndThirteenthCalculator() {
  const [activeTab, setActiveTab] = useState<"vacation" | "thirteenth">("vacation");
  const [vacationResult, setVacationResult] = useState<VacationResult | null>(null);
  const [thirteenthResult, setThirteenthResult] = useState<ThirteenthSalaryResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Estados do formulário - Férias
  const [vacationSalary, setVacationSalary] = useState("0");
  const [vacationDays, setVacationDays] = useState("30");
  const [vacationOvertime, setVacationOvertime] = useState("");
  const [vacationDependents, setVacationDependents] = useState("0");
  const [pecuniaryBonus, setPecuniaryBonus] = useState(false);
  const [advance13th, setAdvance13th] = useState(false);

  // Estados do formulário - 13º Salário
  const [thirteenthSalary, setThirteenthSalary] = useState("0");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [thirteenthOvertime, setThirteenthOvertime] = useState("");
  const [thirteenthDependents, setThirteenthDependents] = useState("0");
  const [installmentType, setInstallmentType] = useState<"first" | "second" | "single">("single");

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "ferias_decimo_terceiro",
    category: "trabalhista"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("ferias_decimo_terceiro");

  // Função para processar valor monetário
  const parseMoneyValue = (value: string | number | undefined): number => {
    if (!value && value !== 0) {
      return 0;
    }

    if (typeof value === "number") {
      return value;
    }

    const stringValue = String(value);
    const cleanValue = stringValue.replace(/[^\d,.]/g, "");

    if (!cleanValue) {
      return 0;
    }

    if (cleanValue.includes(",")) {
      return parseFloat(cleanValue.replace(/\./g, "").replace(",", ".")) || 0;
    }

    return parseFloat(cleanValue) || 0;
  };

  // Cálculo de férias em tempo real
  useEffect(() => {
    const calculate = () => {
      try {
        const salaryNum = parseMoneyValue(vacationSalary);
        const daysNum = parseInt(vacationDays) || 0;
        const overtimeNum = parseMoneyValue(vacationOvertime);
        const dependentsNum = parseInt(vacationDependents) || 0;

        if (salaryNum > 0 && daysNum > 0) {
          setIsCalculating(true);

          const params: VacationParams = {
            grossSalary: salaryNum,
            vacationDays: daysNum,
            overtimeHours: overtimeNum,
            dependents: dependentsNum,
            pecuniaryBonus,
            advance13th,
          };

          const result = calculateVacation(params);
          setVacationResult(result);

          setTimeout(() => setIsCalculating(false), 100);
        } else {
          setVacationResult(null);
        }
      } catch (error) {
        console.error("Erro no cálculo de férias:", error);
        setVacationResult(null);
        setIsCalculating(false);
      }
    };

    if (activeTab === "vacation") {
      calculate();
    }
  }, [
    activeTab,
    vacationSalary,
    vacationDays,
    vacationOvertime,
    vacationDependents,
    pecuniaryBonus,
    advance13th,
  ]);

  // Cálculo de 13º salário em tempo real
  useEffect(() => {
    const calculate = () => {
      try {
        const salaryNum = parseMoneyValue(thirteenthSalary);
        const monthsNum = parseInt(monthsWorked) || 0;
        const overtimeNum = parseMoneyValue(thirteenthOvertime);
        const dependentsNum = parseInt(thirteenthDependents) || 0;

        if (salaryNum > 0 && monthsNum > 0) {
          setIsCalculating(true);

          const params: ThirteenthSalaryParams = {
            grossSalary: salaryNum,
            monthsWorked: monthsNum,
            overtimeHours: overtimeNum,
            dependents: dependentsNum,
            installmentType,
          };

          const result = calculateThirteenthSalary(params);
          setThirteenthResult(result);

          setTimeout(() => setIsCalculating(false), 100);
        } else {
          setThirteenthResult(null);
        }
      } catch (error) {
        console.error("Erro no cálculo de 13º salário:", error);
        setThirteenthResult(null);
        setIsCalculating(false);
      }
    };

    if (activeTab === "thirteenth") {
      calculate();
    }
  }, [
    activeTab,
    thirteenthSalary,
    monthsWorked,
    thirteenthOvertime,
    thirteenthDependents,
    installmentType,
  ]);

  const handleCalculate = () => {
    if (activeTab === "vacation") {
      // Força recálculo das férias
      const salaryNum = parseMoneyValue(vacationSalary);
      const daysNum = parseInt(vacationDays) || 0;
      const overtimeNum = parseMoneyValue(vacationOvertime);
      const dependentsNum = parseInt(vacationDependents) || 0;

      if (salaryNum > 0 && daysNum > 0) {
        const params: VacationParams = {
          grossSalary: salaryNum,
          vacationDays: daysNum,
          overtimeHours: overtimeNum,
          dependents: dependentsNum,
          pecuniaryBonus,
          advance13th,
        };

        const result = calculateVacation(params);
        setVacationResult(result);
      }
    } else {
      // Força recálculo do 13º salário
      const salaryNum = parseMoneyValue(thirteenthSalary);
      const monthsNum = parseInt(monthsWorked) || 0;
      const overtimeNum = parseMoneyValue(thirteenthOvertime);
      const dependentsNum = parseInt(thirteenthDependents) || 0;

      if (salaryNum > 0 && monthsNum > 0) {
        const params: ThirteenthSalaryParams = {
          grossSalary: salaryNum,
          monthsWorked: monthsNum,
          overtimeHours: overtimeNum,
          dependents: dependentsNum,
          installmentType,
        };

        const result = calculateThirteenthSalary(params);
        setThirteenthResult(result);
      }
    }
  };

  const handleReset = () => {
    if (activeTab === "vacation") {
      setVacationSalary("3000");
      setVacationDays("30");
      setVacationOvertime("");
      setVacationDependents("0");
      setPecuniaryBonus(false);
      setAdvance13th(false);
      setVacationResult(null);
    } else {
      setThirteenthSalary("3000");
      setMonthsWorked("12");
      setThirteenthOvertime("");
      setThirteenthDependents("0");
      setInstallmentType("single");
      setThirteenthResult(null);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem>Férias e 13º Salário</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            🏖️ Calculadora de Férias e 13º Salário - CLT 2025
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Calcule{" "}
            <strong className="text-primary-blue-dark">férias e décimo terceiro salário</strong> com
            detalhamento! Inclui{" "}
            <strong className="text-growth-green">INSS, IRRF, abono pecuniário</strong> e
            <strong className="text-system-warning"> adiantamentos</strong> conforme as regras da
            CLT e tabelas oficiais 2025.
          </p>
          <div className="inline-block rounded-lg bg-gradient-to-r from-primary-blue-light via-growth-green-soft to-system-warning/20 p-4">
            <p className="text-sm font-medium text-text-primary">
              📊 <strong>Tabelas Oficiais 2025</strong> • ⚖️ <strong>100% Conforme CLT</strong> • 💰{" "}
              <strong>Cálculo em Tempo Real</strong> • 📋 <strong>Memória de Cálculo</strong>
            </p>
          </div>
        </header>

        {/* Seletor de Abas */}
        <Card className="w-full">
          <CardContent className="p-0">
            <div className="border-neutral-stroke flex border-b">
              <button
                onClick={() => setActiveTab("vacation")}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === "vacation"
                    ? "border-b-2 border-primary-blue-dark bg-primary-blue text-white"
                    : "text-text-secondary hover:bg-neutral-surface/50"
                }`}
              >
                🏖️ Calculadora de Férias
              </button>
              <button
                onClick={() => setActiveTab("thirteenth")}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === "thirteenth"
                    ? "border-b-2 border-growth-green bg-growth-green text-white"
                    : "text-text-secondary hover:bg-neutral-surface/50"
                }`}
              >
                💰 Calculadora de 13º Salário
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">
              {activeTab === "vacation"
                ? "Dados para Cálculo de Férias"
                : "Dados para Cálculo do 13º Salário"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
            >
              {activeTab === "vacation" ? (
                // Formulário de Férias
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <MoneyInput
                      label="Salário Bruto Mensal"
                      value={vacationSalary}
                      onChange={setVacationSalary}
                      placeholder="R$ 3.000,00"
                      help="Salário base registrado na carteira"
                      required
                      fullWidth
                    />

                    <Input
                      type="number"
                      label="Dias de Férias"
                      value={vacationDays}
                      onChange={(e) => setVacationDays(e.target.value)}
                      placeholder="30"
                      min="1"
                      max="30"
                      help="Entre 1 e 30 dias (padrão: 30 dias)"
                      fullWidth
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <MoneyInput
                      label="Horas Extras Médias Mensais (Opcional)"
                      value={vacationOvertime}
                      onChange={setVacationOvertime}
                      placeholder="R$ 0,00"
                      help="Média mensal de horas extras"
                      fullWidth
                    />

                    <Input
                      type="number"
                      label="Número de Dependentes"
                      value={vacationDependents}
                      onChange={(e) => setVacationDependents(e.target.value)}
                      placeholder="0"
                      min="0"
                      help="Para cálculo do IRRF (R$ 189,59 cada)"
                      fullWidth
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                      <input
                        type="checkbox"
                        id="pecuniaryBonus"
                        checked={pecuniaryBonus}
                        onChange={(e) => setPecuniaryBonus(e.target.checked)}
                        className="border-neutral-stroke h-4 w-4 rounded text-primary-blue focus:ring-primary-blue"
                      />
                      <label
                        htmlFor="pecuniaryBonus"
                        className="text-sm font-medium text-text-primary"
                      >
                        <strong>Abono Pecuniário</strong> - Vender 1/3 das férias (10 dias)
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                      <input
                        type="checkbox"
                        id="advance13th"
                        checked={advance13th}
                        onChange={(e) => setAdvance13th(e.target.checked)}
                        className="border-neutral-stroke h-4 w-4 rounded text-primary-blue focus:ring-primary-blue"
                      />
                      <label
                        htmlFor="advance13th"
                        className="text-sm font-medium text-text-primary"
                      >
                        <strong>Adiantar 1ª Parcela do 13º</strong> - Receber junto com as férias
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                // Formulário de 13º Salário
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <MoneyInput
                      label="Salário Bruto Mensal"
                      value={thirteenthSalary}
                      onChange={setThirteenthSalary}
                      placeholder="R$ 3.000,00"
                      help="Salário base registrado na carteira"
                      required
                      fullWidth
                    />

                    <Input
                      type="number"
                      label="Meses Trabalhados"
                      value={monthsWorked}
                      onChange={(e) => setMonthsWorked(e.target.value)}
                      placeholder="12"
                      min="1"
                      max="12"
                      help="Número de meses trabalhados no ano"
                      fullWidth
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <MoneyInput
                      label="Horas Extras Médias Mensais (Opcional)"
                      value={thirteenthOvertime}
                      onChange={setThirteenthOvertime}
                      placeholder="R$ 0,00"
                      help="Média mensal de horas extras"
                      fullWidth
                    />

                    <Input
                      type="number"
                      label="Número de Dependentes"
                      value={thirteenthDependents}
                      onChange={(e) => setThirteenthDependents(e.target.value)}
                      placeholder="0"
                      min="0"
                      help="Para cálculo do IRRF (R$ 189,59 cada)"
                      fullWidth
                    />
                  </div>

                  <Select
                    label="Tipo de Parcela"
                    value={installmentType}
                    onChange={(value) => setInstallmentType(value as typeof installmentType)}
                    options={[
                      { value: "first", label: "Primeira Parcela (50% - sem descontos)" },
                      { value: "second", label: "Segunda Parcela (50% - com descontos)" },
                      { value: "single", label: "Parcela Única (100% - com descontos)" },
                    ]}
                    help="Escolha como deseja receber o 13º salário"
                    fullWidth
                  />
                </>
              )}

              <div className="flex justify-center gap-4">
                <Button type="button" onClick={handleCalculate} className="px-8">
                  {activeTab === "vacation" ? "Calcular Férias" : "Calcular 13º Salário"}
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                >
                  Limpar
                </Button>
              </div>

              <div className="rounded-lg border border-primary-blue/20 bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4">
                <div className="text-center">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    📊 Tabelas Oficiais 2025
                  </h4>
                  <p className="text-sm text-text-secondary">
                    💼 <strong>INSS:</strong> 7.5% até R$ 1.518 | 9% até R$ 2.794 | 12% até R$ 4.191
                    | 14% até R$ 8.157
                    <br />
                    💰 <strong>IRRF:</strong> Isento até R$ 2.259 | 7.5% até R$ 2.827 | 15% até R$
                    3.751 | 22.5% até R$ 4.665 | 27.5% acima
                    <br />
                    👶 <strong>Dependentes:</strong> R$ 189,59 de dedução para cada dependente
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultado */}
        {((activeTab === "vacation" && vacationResult) ||
          (activeTab === "thirteenth" && thirteenthResult)) && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h2">
                {activeTab === "vacation"
                  ? "Resultado do Cálculo de Férias"
                  : "Resultado do Cálculo do 13º Salário"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Valor Principal */}
                <div className="rounded-lg bg-gradient-to-r from-primary-blue-light to-growth-green-soft p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-primary-blue-dark">
                    {formatCurrency(
                      activeTab === "vacation"
                        ? vacationResult!.netValue
                        : thirteenthResult!.netValue
                    )}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {activeTab === "vacation"
                      ? "Valor Líquido das Férias"
                      : "Valor Líquido do 13º Salário"}
                  </div>
                  {activeTab === "thirteenth" && thirteenthResult && (
                    <div className="mt-1 text-xs text-text-secondary">
                      {thirteenthResult.installmentInfo.description} •{" "}
                      {thirteenthResult.installmentInfo.paymentPeriod}
                    </div>
                  )}
                </div>

                {/* Breakdown dos Valores */}
                <div>
                  <h4 className="mb-3 font-semibold text-text-primary">💰 Composição do Valor:</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {activeTab === "vacation" && vacationResult ? (
                      <>
                        <div className="flex items-center justify-between rounded border border-growth-green/20 bg-growth-green/10 p-3">
                          <div>
                            <div className="font-medium text-growth-green">Valor das Férias</div>
                            <div className="text-xs text-text-secondary">
                              {vacationResult.calculations.effectiveVacationDays} dias
                            </div>
                          </div>
                          <div className="font-semibold text-growth-green">
                            {formatCurrency(vacationResult.grossValue)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded border border-primary-blue/20 bg-primary-blue/10 p-3">
                          <div>
                            <div className="font-medium text-primary-blue-dark">
                              Terço Constitucional
                            </div>
                            <div className="text-xs text-text-secondary">1/3 das férias</div>
                          </div>
                          <div className="font-semibold text-primary-blue-dark">
                            {formatCurrency(vacationResult.constitutionalThird)}
                          </div>
                        </div>

                        {vacationResult.pecuniaryBonusAmount > 0 && (
                          <div className="flex items-center justify-between rounded border border-system-info/20 bg-system-info/10 p-3">
                            <div>
                              <div className="font-medium text-system-info">Abono Pecuniário</div>
                              <div className="text-xs text-text-secondary">
                                Venda de 10 dias + 1/3
                              </div>
                            </div>
                            <div className="font-semibold text-system-info">
                              {formatCurrency(vacationResult.pecuniaryBonusAmount)}
                            </div>
                          </div>
                        )}

                        {vacationResult.advance13thAmount > 0 && (
                          <div className="flex items-center justify-between rounded border border-system-warning/20 bg-system-warning/10 p-3">
                            <div>
                              <div className="font-medium text-system-warning">
                                Adiantamento 13º
                              </div>
                              <div className="text-xs text-text-secondary">
                                1ª parcela sem desconto
                              </div>
                            </div>
                            <div className="font-semibold text-system-warning">
                              {formatCurrency(vacationResult.advance13thAmount)}
                            </div>
                          </div>
                        )}
                      </>
                    ) : thirteenthResult ? (
                      <>
                        <div className="flex items-center justify-between rounded border border-growth-green/20 bg-growth-green/10 p-3">
                          <div>
                            <div className="font-medium text-growth-green">Valor Bruto</div>
                            <div className="text-xs text-text-secondary">
                              {thirteenthResult.calculations.monthsWorked} meses
                            </div>
                          </div>
                          <div className="font-semibold text-growth-green">
                            {formatCurrency(thirteenthResult.grossValue)}
                          </div>
                        </div>

                        {thirteenthResult.breakdown.overtimeValue > 0 && (
                          <div className="flex items-center justify-between rounded border border-primary-blue/20 bg-primary-blue/10 p-3">
                            <div>
                              <div className="font-medium text-primary-blue-dark">Horas Extras</div>
                              <div className="text-xs text-text-secondary">Valor proporcional</div>
                            </div>
                            <div className="font-semibold text-primary-blue-dark">
                              {formatCurrency(thirteenthResult.breakdown.overtimeValue)}
                            </div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Descontos */}
                {((activeTab === "vacation" &&
                  vacationResult &&
                  (vacationResult.inssDeduction > 0 || vacationResult.irrfDeduction > 0)) ||
                  (activeTab === "thirteenth" &&
                    thirteenthResult &&
                    (thirteenthResult.inssDeduction > 0 ||
                      thirteenthResult.irrfDeduction > 0))) && (
                  <div>
                    <h4 className="mb-3 font-semibold text-text-primary">📉 Descontos:</h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {((activeTab === "vacation" && vacationResult?.inssDeduction) ||
                        (activeTab === "thirteenth" && thirteenthResult?.inssDeduction)) && (
                        <div className="flex items-center justify-between rounded border border-system-error/20 bg-system-error/10 p-3">
                          <div>
                            <div className="font-medium text-system-error">INSS</div>
                            <div className="text-xs text-text-secondary">
                              Contribuição previdenciária
                            </div>
                          </div>
                          <div className="font-semibold text-system-error">
                            -
                            {formatCurrency(
                              activeTab === "vacation"
                                ? vacationResult!.inssDeduction
                                : thirteenthResult!.inssDeduction
                            )}
                          </div>
                        </div>
                      )}

                      {((activeTab === "vacation" && vacationResult?.irrfDeduction) ||
                        (activeTab === "thirteenth" && thirteenthResult?.irrfDeduction)) && (
                        <div className="flex items-center justify-between rounded border border-system-warning/20 bg-system-warning/10 p-3">
                          <div>
                            <div className="font-medium text-system-warning">IRRF</div>
                            <div className="text-xs text-text-secondary">Imposto de Renda</div>
                          </div>
                          <div className="font-semibold text-system-warning">
                            -
                            {formatCurrency(
                              activeTab === "vacation"
                                ? vacationResult!.irrfDeduction
                                : thirteenthResult!.irrfDeduction
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Resumo */}
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                  <div className="rounded bg-neutral-surface/20 p-4 text-center">
                    <div className="text-lg font-semibold text-text-primary">
                      {formatCurrency(
                        activeTab === "vacation"
                          ? vacationResult!.totalGross
                          : thirteenthResult!.grossValue
                      )}
                    </div>
                    <div className="text-text-secondary">Valor Bruto</div>
                  </div>

                  <div className="rounded bg-neutral-surface/20 p-4 text-center">
                    <div className="text-lg font-semibold text-system-error">
                      -
                      {formatCurrency(
                        activeTab === "vacation"
                          ? vacationResult!.totalDeductions
                          : thirteenthResult!.totalDeductions
                      )}
                    </div>
                    <div className="text-text-secondary">Total de Descontos</div>
                  </div>

                  <div className="rounded bg-growth-green/20 p-4 text-center">
                    <div className="text-lg font-semibold text-growth-green">
                      {formatCurrency(
                        activeTab === "vacation"
                          ? vacationResult!.netValue
                          : thirteenthResult!.netValue
                      )}
                    </div>
                    <div className="text-text-secondary">Valor Líquido</div>
                  </div>
                </div>

                {/* Informações Legais */}
                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <h4 className="mb-3 font-semibold text-system-info">⚖️ Informações Legais:</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    {activeTab === "vacation" ? (
                      <>
                        <p>
                          • <strong>Prazo para pagamento:</strong> Até 2 dias antes do início das
                          férias
                        </p>
                        <p>
                          • <strong>Comunicação de férias:</strong> Empregador deve avisar com 30
                          dias de antecedência
                        </p>
                        <p>
                          • <strong>Abono pecuniário:</strong> Direito de vender até 1/3 das férias
                          (10 dias)
                        </p>
                        <p>
                          • <strong>Período aquisitivo:</strong> Direito adquirido após 12 meses de
                          trabalho
                        </p>
                        {advance13th && (
                          <p>
                            • <strong>Adiantamento 13º:</strong> Primeira parcela paga junto com as
                            férias
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p>
                          • <strong>1ª Parcela:</strong> Paga até 30 de novembro (50% sem descontos)
                        </p>
                        <p>
                          • <strong>2ª Parcela:</strong> Paga até 20 de dezembro (50% com descontos)
                        </p>
                        <p>
                          • <strong>Parcela única:</strong> Paga até 20 de dezembro (100% com
                          descontos)
                        </p>
                        <p>
                          • <strong>Base de cálculo:</strong> Maior salário do ano ou dezembro
                        </p>
                        <p>
                          • <strong>Proporcional:</strong> 1/12 por mês trabalhado (15 dias = 1 mês)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conteúdo Educacional */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">📚 Guia Completo: Férias e 13º Salário - CLT 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-text-secondary">
              {/* Férias */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  🏖️ Tudo sobre Férias Trabalhistas
                </h3>
                <p className="mb-4">
                  As <strong className="text-primary-blue-dark">férias</strong> são um direito
                  constitucional garantido a todos os trabalhadores CLT. Após{" "}
                  <strong className="text-growth-green">12 meses de trabalho</strong> (período
                  aquisitivo), você tem direito a
                  <strong className="text-system-warning"> 30 dias de descanso remunerado</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      ✅ Direitos nas Férias:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Remuneração integral:</strong> Salário + adicionais habituais
                      </li>
                      <li>
                        • <strong>Terço constitucional:</strong> 1/3 a mais do valor das férias
                      </li>
                      <li>
                        • <strong>Abono pecuniário:</strong> Vender até 10 dias das férias
                      </li>
                      <li>
                        • <strong>Adiantamento 13º:</strong> Receber primeira parcela junto
                      </li>
                      <li>
                        • <strong>Férias proporcionais:</strong> Mesmo com menos de 1 ano
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📅 Prazos e Regras:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Período aquisitivo:</strong> 12 meses para adquirir direito
                      </li>
                      <li>
                        • <strong>Período concessivo:</strong> 12 meses para gozar as férias
                      </li>
                      <li>
                        • <strong>Comunicação:</strong> Aviso com 30 dias de antecedência
                      </li>
                      <li>
                        • <strong>Pagamento:</strong> Até 2 dias antes do início
                      </li>
                      <li>
                        • <strong>Fracionamento:</strong> Máximo 3 períodos (1 ≥ 14 dias)
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 13º Salário */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  💰 Tudo sobre o 13º Salário
                </h3>
                <p className="mb-4">
                  O <strong className="text-primary-blue-dark">13º salário</strong> (gratificação
                  natalina) é um benefício obrigatório equivalente a{" "}
                  <strong className="text-growth-green">1/12 da remuneração</strong> por mês
                  trabalhado. É pago em até{" "}
                  <strong className="text-system-warning">duas parcelas anuais</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">🎯 Primeira Parcela</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Valor:</strong> 50% do 13º salário
                      </li>
                      <li>
                        • <strong>Prazo:</strong> Até 30 de novembro
                      </li>
                      <li>
                        • <strong>Descontos:</strong> Nenhum desconto
                      </li>
                      <li>
                        • <strong>Base:</strong> Salário de novembro
                      </li>
                      <li>
                        • <strong>Opção:</strong> Junto com as férias
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">💸 Segunda Parcela</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Valor:</strong> 50% restante do 13º
                      </li>
                      <li>
                        • <strong>Prazo:</strong> Até 20 de dezembro
                      </li>
                      <li>
                        • <strong>Descontos:</strong> INSS e IRRF completos
                      </li>
                      <li>
                        • <strong>Base:</strong> Maior salário do ano
                      </li>
                      <li>
                        • <strong>Cálculo:</strong> Sobre valor total
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">📋 Parcela Única</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Valor:</strong> 100% do 13º salário
                      </li>
                      <li>
                        • <strong>Prazo:</strong> Até 20 de dezembro
                      </li>
                      <li>
                        • <strong>Descontos:</strong> INSS e IRRF normais
                      </li>
                      <li>
                        • <strong>Vantagem:</strong> Recebe tudo de uma vez
                      </li>
                      <li>
                        • <strong>Opção:</strong> Escolha do empregador
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cálculos e Tabelas */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  📊 Como São Feitos os Cálculos
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      🧮 Cálculo das Férias
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>1. Valor das férias:</strong>
                      </p>
                      <p className="ml-4">• (Salário + horas extras) × (dias de férias ÷ 30)</p>
                      <p>
                        <strong>2. Terço constitucional:</strong>
                      </p>
                      <p className="ml-4">• Valor das férias ÷ 3</p>
                      <p>
                        <strong>3. Abono pecuniário (se escolher):</strong>
                      </p>
                      <p className="ml-4">• (Salário ÷ 30) × 10 + 1/3 do abono</p>
                      <p>
                        <strong>4. Descontos:</strong>
                      </p>
                      <p className="ml-4">• INSS e IRRF sobre férias + 1/3 + abono</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      💰 Cálculo do 13º Salário
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>1. Valor bruto:</strong>
                      </p>
                      <p className="ml-4">• (Salário + horas extras) × (meses ÷ 12)</p>
                      <p>
                        <strong>2. Primeira parcela:</strong>
                      </p>
                      <p className="ml-4">• 50% do valor bruto (sem descontos)</p>
                      <p>
                        <strong>3. Segunda parcela:</strong>
                      </p>
                      <p className="ml-4">• 50% restante - INSS - IRRF</p>
                      <p>
                        <strong>4. Proporcionalidade:</strong>
                      </p>
                      <p className="ml-4">• 15 dias ou mais = 1 mês completo</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tabelas Oficiais */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  📋 Tabelas Oficiais 2025
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">🏛️ Tabela INSS 2025</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Até R$ 1.518,00:</span>
                        <span className="font-semibold">7,5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>R$ 1.518,01 a R$ 2.793,88:</span>
                        <span className="font-semibold">9,0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>R$ 2.793,89 a R$ 4.190,83:</span>
                        <span className="font-semibold">12,0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>R$ 4.190,84 a R$ 8.157,41:</span>
                        <span className="font-semibold">14,0%</span>
                      </div>
                      <div className="mt-2 border-t border-system-info/20 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Teto INSS:</span>
                          <span>R$ 1.142,04</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">💰 Tabela IRRF 2025</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Até R$ 2.259,20:</span>
                        <span className="font-semibold">Isento</span>
                      </div>
                      <div className="flex justify-between">
                        <span>R$ 2.259,21 a R$ 2.826,65:</span>
                        <span className="font-semibold">7,5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>R$ 2.826,66 a R$ 3.751,05:</span>
                        <span className="font-semibold">15,0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>R$ 3.751,06 a R$ 4.664,68:</span>
                        <span className="font-semibold">22,5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acima de R$ 4.664,68:</span>
                        <span className="font-semibold">27,5%</span>
                      </div>
                      <div className="mt-2 border-t border-system-warning/20 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Dedução por dependente:</span>
                          <span>R$ 189,59</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dicas Importantes */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  💡 Dicas Importantes para Trabalhadores
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      🎯 Planejamento Financeiro
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Planeje gastos com antecedência</li>
                      <li>• Considere usar parte para emergências</li>
                      <li>• Quite dívidas com juros altos</li>
                      <li>• Invista em capacitação profissional</li>
                      <li>• Reserve parte para o Imposto de Renda</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📊 Estratégias Inteligentes
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Solicite adiantamento 13º nas férias</li>
                      <li>• Considere abono pecuniário se necessitar</li>
                      <li>• Confira cálculos no contracheque</li>
                      <li>• Guarde comprovantes de pagamento</li>
                      <li>• Negocie período de férias</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      ⚠️ Cuidados e Direitos
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Empresa não pode atrasar pagamentos</li>
                      <li>• Férias não podem ser descontadas</li>
                      <li>• Direito mesmo em caso de falta</li>
                      <li>• Proporcional na rescisão</li>
                      <li>• Procure sindicato se houver dúvidas</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Férias e 13º Salário"
          items={[
            {
              question: "Posso vender mais de 10 dias das minhas férias?",
              answer:
                "<strong>Não!</strong> Por lei, você pode vender no máximo <strong>1/3 das férias (10 dias)</strong>. Os outros 20 dias devem obrigatoriamente ser gozados como descanso. Esta regra existe para <strong>preservar sua saúde e bem-estar</strong>, garantindo o descanso necessário!",
              borderColor: "primary-blue",
            },
            {
              question: "Como é calculado o 13º salário proporcional?",
              answer:
                "O 13º é <strong>proporcional aos meses trabalhados</strong>: (Salário ÷ 12) × meses trabalhados. <strong>Importante:</strong> 15 dias ou mais em um mês conta como mês completo. Exemplo: trabalhou 10 meses = recebe <strong>10/12 do salário</strong> como 13º!",
              borderColor: "system-success",
            },
            {
              question: "Quando devo receber o pagamento das férias?",
              answer:
                "O pagamento deve ser feito <strong>até 2 dias antes</strong> do início das férias. A empresa deve comunicar com <strong>30 dias de antecedência</strong>. Se houver atraso no pagamento, você tem direito ao <strong>dobro da remuneração</strong>!",
              borderColor: "growth-green",
            },
            {
              question: "Perco o direito às férias se faltar muito?",
              answer:
                "Depende das faltas injustificadas: <strong>Até 5 faltas:</strong> 30 dias. <strong>6-14 faltas:</strong> 24 dias. <strong>15-23 faltas:</strong> 18 dias. <strong>24-32 faltas:</strong> 12 dias. <strong>Mais de 32 faltas:</strong> perde o direito às férias!",
              borderColor: "system-info",
            },
            {
              question: "Por que a primeira parcela do 13º não tem desconto?",
              answer:
                'A primeira parcela é considerada um <strong>adiantamento sem descontos</strong>. Os descontos de INSS e IRRF são calculados sobre o valor total e aplicados integralmente na <strong>segunda parcela</strong>. Isso garante primeira parcela "limpa"!',
              borderColor: "primary-blue",
            },
            {
              question: "Posso fracionar férias em quantos períodos?",
              answer:
                "Até <strong>3 períodos</strong> com regras: um período de <strong>pelo menos 14 dias</strong>, demais com <strong>pelo menos 5 dias</strong>. Não pode fracionar para menores de 18 e maiores de 50 anos. Família pode fracionar junto!",
              borderColor: "system-success",
            },
            {
              question: "O que acontece se a empresa atrasar pagamentos?",
              answer:
                "<strong>Férias em atraso:</strong> direito ao dobro da remuneração. <strong>13º em atraso:</strong> multa e juros de mora. Pode entrar com <strong>ação trabalhista</strong> e em casos excessivos, pedir <strong>danos morais</strong>. Seus direitos são garantidos!",
              borderColor: "growth-green",
            },
            {
              question: "Home office tem os mesmos direitos de férias e 13º?",
              answer:
                "<strong>Sim, absolutamente!</strong> Trabalhadores em home office ou teletrabalho mantêm <strong>todos os direitos trabalhistas</strong> iguais. A modalidade de trabalho não altera direitos da CLT. Cálculos são <strong>idênticos</strong> aos presenciais!",
              borderColor: "system-warning",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "<strong>Guarde todos os comprovantes</strong> de pagamentos e comunicações da empresa sobre férias e 13º salário. Documenteção organizada é sua melhor proteção legal!",
          }}
          footerText="<strong>Necessita calcular outros direitos?</strong> Explore nossas calculadoras trabalhistas e garanta que todos os seus direitos sejam respeitados!"
        />

        <RelatedCalculators category="trabalhista" currentCalculatorId="ferias-decimo-terceiro" />
      </div>
    </div>
  );
}
