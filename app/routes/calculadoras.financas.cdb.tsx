import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  MoneyInput,
  RateInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { calculateCDB, CDB_TAX_BRACKETS } from "~/utils/calculations";
import type { CDBParams, CDBResult } from "~/utils/calculations";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  getDefaultRate,
  getIndicatorInfo,
  isDataRecent,
  getDataFreshnessColor,
} from "~/lib/economic-data";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora CDB 2025 - Simulador Completo com Tributação - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora CDB GRATUITA com simulação completa de tributação. Calcule rendimentos, imposto de renda, IOF e compare com LCI/LCA e Poupança. Ferramenta completa para investimentos em renda fixa com aportes mensais.",
    },
    {
      name: "keywords",
      content:
        "calculadora cdb, certificado depósito bancário, cdb tributação, imposto renda cdb, cdb vs lci lca, cdb aportes mensais, rendimento cdb, taxa cdb, cdb pré fixado, cdb pós fixado, cdb ipca, simulador cdb, investimento renda fixa, cdb bancos digitais, cdb corretoras, IOF CDB",
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
      content: `Calculadora CDB - Simulação Completa com Tributação - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Simule investimentos em CDB com cálculo preciso de impostos! Compare rendimentos líquidos, veja vantagens da LCI/LCA e tome a melhor decisão. Ferramenta gratuita e completa.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadorasonline.com.br/calculadoras/financas/cdb" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora CDB com Tributação - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Simule investimentos em CDB com cálculo completo de impostos e compare com outras opções de renda fixa!",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "theme-color", content: "#1e40af" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function CDBCalculator() {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("105");
  const [interestType, setInterestType] = useState<
    "percentage_cdi" | "percentage_ipca" | "fixed_rate"
  >("percentage_cdi");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState<"days" | "months" | "years">("months");
  const [indexRate, setIndexRate] = useState(() => getDefaultRate("CDI").toString());
  const [hasIOF, setHasIOF] = useState(false);
  const [monthlyContributions, setMonthlyContributions] = useState("");
  const [result, setResult] = useState<CDBResult | null>(null);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "cdb",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("cdb");

  // Função para atualizar indexRate quando o tipo de taxa mudar
  const handleInterestTypeChange = (
    newType: "percentage_cdi" | "percentage_ipca" | "fixed_rate"
  ) => {
    setInterestType(newType);
    if (newType === "percentage_cdi") {
      setIndexRate(getDefaultRate("CDI").toString());
    } else if (newType === "percentage_ipca") {
      setIndexRate(getDefaultRate("IPCA").toString());
    }
  };

  const handleCalculate = () => {
    const principalNum = parseFloat(principal) || 0;
    const interestRateNum = parseFloat(interestRate) || 0;
    const periodNum = parseFloat(period) || 0;
    const indexRateNum = parseFloat(indexRate) || 0;
    const monthlyContributionsNum = parseFloat(monthlyContributions) || 0;

    if (principalNum > 0 && interestRateNum > 0 && periodNum > 0) {
      const params: CDBParams = {
        principal: principalNum,
        interestRate: interestRateNum,
        interestType,
        period: periodNum,
        periodUnit,
        indexRate: indexRateNum,
        bankTier: "tier1", // Default value
        hasIOF,
        monthlyContributions: monthlyContributionsNum,
      };

      const calculationResult = calculateCDB(params);
      setResult(calculationResult);
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setInterestRate("105");
    setPeriod("");
    setIndexRate(getDefaultRate("CDI").toString());
    setMonthlyContributions("");
    setHasIOF(false);
    setInterestType("percentage_cdi");
    setResult(null);
  };

  const handleLoadDefaults = () => {
    setPrincipal("10000");
    setInterestRate("105");
    setPeriod("24");
    setPeriodUnit("months");
    setIndexRate(getDefaultRate("CDI").toString());
    setInterestType("percentage_cdi");
    setHasIOF(false);
    setMonthlyContributions("500");
  };

  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    } catch (error) {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    }
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border-primary bg-surface-light px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
            <BreadcrumbItem isLast>CDB</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - S-Tier Visual Hierarchy */}
      <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-finance-gold/10 via-transparent to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
              <span className="mr-2">🏦</span>
              Simulador CDB com Cálculo Automático de IR
            </div>
            
            <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Calculadora de
              <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
                CDB
              </span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-text-secondary-dark sm:text-lg">
              Simule rendimentos de <strong className="text-finance-gold-dark">CDB pré e pós-fixado</strong> com{" "}
              <strong className="text-system-success">tributação automática</strong> e compare com outros
              investimentos de renda fixa.
            </p>
            
            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">IR Regressivo Automático</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-finance-gold"></div>
                <span className="font-medium">Pré e Pós-Fixado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Comparações Precisas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Input Section - Optimized for Mobile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Input Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-finance-gold/10 to-finance-gold/5">
                <CardTitle as="h2" className="text-finance-gold-dark">💰 Dados do Investimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Inputs - Strategic White Space */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <MoneyInput
                    label="Valor Inicial"
                    value={principal}
                    onChange={(value) => setPrincipal(value)}
                    placeholder="10.000,00"
                    min="0.01"
                    required
                    fullWidth
                    className="h-14 text-lg"
                  />

                  <RateInput
                    label="Taxa Oferecida (%)"
                    value={interestRate}
                    onChange={(value) => setInterestRate(value)}
                    placeholder="105,00"
                    required
                    fullWidth
                    className="h-14 text-lg"
                  />
                </div>

                {/* Secondary Inputs */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Select
                    label="Tipo de Taxa"
                    value={interestType}
                    onChange={(value) => handleInterestTypeChange(value as any)}
                    options={[
                      { value: "percentage_cdi", label: "% do CDI" },
                      { value: "percentage_ipca", label: "IPCA +" },
                      { value: "fixed_rate", label: "Taxa Fixa" },
                    ]}
                    fullWidth
                    className="h-14"
                  />

                  <Input
                    type="number"
                    label="Prazo do Investimento"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="Ex: 24"
                    min="0"
                    step="1"
                    required
                    fullWidth
                    className="h-14 text-lg"
                  />
                </div>

                {/* Reference Rate - Conditional */}
                {(interestType === "percentage_cdi" || interestType === "percentage_ipca") && (
                  <div className="rounded-lg border border-system-info/20 bg-system-info/5 p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <RateInput
                        label={
                          interestType === "percentage_cdi"
                            ? "Taxa CDI Atual (%)"
                            : "IPCA Estimado (%)"
                        }
                        value={indexRate}
                        onChange={(value) => setIndexRate(value)}
                        placeholder="0,00"
                        required
                        fullWidth
                        className="h-12"
                      />

                      <Select
                        label="Unidade do Prazo"
                        value={periodUnit}
                        onChange={(value) => setPeriodUnit(value as any)}
                        options={[
                          { value: "days", label: "Dias" },
                          { value: "months", label: "Meses" },
                          { value: "years", label: "Anos" },
                        ]}
                        fullWidth
                        className="h-12"
                      />
                    </div>

                    {/* Economic Indicator Info */}
                    <div className="mt-3 rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`font-semibold ${getDataFreshnessColor(interestType === "percentage_cdi" ? "CDI" : "IPCA")}`}
                        >
                          💹 Oficial:{" "}
                          {getDefaultRate(
                            interestType === "percentage_cdi" ? "CDI" : "IPCA"
                          )}
                          %
                        </span>
                        <span className="text-text-secondary">
                          {
                            getIndicatorInfo(
                              interestType === "percentage_cdi" ? "CDI" : "IPCA"
                            ).source
                          }
                        </span>
                      </div>
                      {!isDataRecent(
                        interestType === "percentage_cdi" ? "CDI" : "IPCA"
                      ) && (
                        <div className="mt-1 font-medium text-system-warning text-xs">
                          ⚠️ Dados podem estar desatualizados
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Settings */}
                <div className="rounded-lg border border-finance-gold/20 bg-finance-gold/5 p-4">
                  <h3 className="mb-4 font-semibold text-finance-gold-dark">⚙️ Configurações Opcionais</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MoneyInput
                      label="Aporte Mensal"
                      value={monthlyContributions}
                      onChange={(value) => setMonthlyContributions(value)}
                      placeholder="500,00"
                      min="0"
                      fullWidth
                      className="h-12"
                    />

                    
                    {/* IOF Toggle */}
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setHasIOF(!hasIOF)}
                        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                          hasIOF
                            ? "border-system-warning bg-system-warning text-white"
                            : "border-border-primary bg-surface hover:border-system-warning"
                        }`}
                      >
                        {hasIOF && (
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <div>
                        <label
                          className="cursor-pointer font-medium text-text-primary"
                          onClick={() => setHasIOF(!hasIOF)}
                        >
                          Aplicar IOF (&lt; 30 dias)
                        </label>
                        <p className="text-xs text-text-secondary">
                          💡 IOF incide em aplicações de curto prazo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Prominent and Accessible */}
                <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-center">
                  <Button 
                    onClick={handleCalculate} 
                    className="h-14 px-12 text-lg font-semibold bg-finance-gold hover:bg-finance-gold-dark text-white"
                    fullWidth
                  >
                    🏦 Simular CDB
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="h-14 px-8 border-2 border-system-error text-system-error hover:bg-system-error hover:text-white"
                    fullWidth
                  >
                    Limpar Dados
                  </Button>
                </div>

                {/* Quick Presets */}
                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/5 p-4">
                  <h4 className="mb-3 text-center font-semibold text-primary-blue-dark">
                    ⚡ Cenários Rápidos
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPrincipal("5000");
                        setInterestRate("105");
                        setPeriod("12");
                        setInterestType("percentage_cdi");
                        setMonthlyContributions("300");
                      }}
                      className="rounded-lg border border-system-success/20 bg-system-success/10 p-3 text-left hover:bg-system-success/20 transition-colors"
                    >
                      <div className="text-xs font-semibold text-system-success">💚 Conservador</div>
                      <div className="mt-1 text-xs text-text-secondary">R$ 5k + R$ 300/mês</div>
                      <div className="text-xs text-primary-blue-dark">105% CDI</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPrincipal("10000");
                        setInterestRate("115");
                        setPeriod("24");
                        setInterestType("percentage_cdi");
                        setMonthlyContributions("500");
                      }}
                      className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3 text-left hover:bg-system-warning/20 transition-colors"
                    >
                      <div className="text-xs font-semibold text-system-warning">🔥 Moderado</div>
                      <div className="mt-1 text-xs text-text-secondary">R$ 10k + R$ 500/mês</div>
                      <div className="text-xs text-primary-blue-dark">115% CDI</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPrincipal("20000");
                        setInterestRate("125");
                        setPeriod("36");
                        setInterestType("percentage_cdi");
                        setMonthlyContributions("1000");
                      }}
                      className="rounded-lg border border-finance-gold/20 bg-finance-gold/10 p-3 text-left hover:bg-finance-gold/20 transition-colors"
                    >
                      <div className="text-xs font-semibold text-finance-gold-dark">💪 Agressivo</div>
                      <div className="mt-1 text-xs text-text-secondary">R$ 20k + R$ 1k/mês</div>
                      <div className="text-xs text-primary-blue-dark">125% CDI</div>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Tax Information & Market Data */}
          <div className="space-y-6">
            {/* Tax Brackets */}
            <Card className="border-2 border-system-warning bg-system-warning/5 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-system-warning/10 to-system-warning/5">
                <CardTitle as="h3" className="text-system-warning">
                  📋 Tributação CDB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {CDB_TAX_BRACKETS.map((bracket, index) => (
                    <div
                      key={index}
                      className={`flex justify-between rounded-lg p-3 transition-all ${
                        result &&
                        result.periodInDays >= bracket.days &&
                        result.periodInDays <=
                          (bracket.maxDays === Infinity ? result.periodInDays : bracket.maxDays)
                          ? "border-2 border-system-warning bg-system-warning/20 shadow-md"
                          : "border border-border-primary bg-surface-light"
                      }`}
                    >
                      <span className="font-medium text-sm">{bracket.description}</span>
                      <span className="font-bold text-lg">{formatPercentage(bracket.rate)}</span>
                    </div>
                  ))}
                  <div className="mt-3 rounded-lg bg-system-warning/10 p-2 text-xs text-system-warning text-center">
                    💡 Taxa destacada será aplicada ao seu investimento
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FGC Guarantee */}
            <Card className="border-2 border-system-success bg-system-success/5 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-system-success/10 to-system-success/5">
                <CardTitle as="h3" className="text-system-success">
                  🛡️ Garantia FGC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center rounded-lg bg-system-success/10 p-3">
                    <span className="font-medium">Por CPF por banco:</span>
                    <span className="font-bold text-lg text-system-success">R$ 250.000</span>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-surface-light p-3">
                    <span className="font-medium">Limite renovável:</span>
                    <span className="font-bold">A cada 4 anos</span>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-surface-light p-3">
                    <span className="font-medium">Total máximo:</span>
                    <span className="font-bold text-lg">R$ 1.000.000</span>
                  </div>
                  <div className="mt-3 rounded-lg bg-system-success/10 p-2 text-xs text-system-success text-center font-medium">
                    ✅ Seu investimento está 100% protegido
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market References */}
            <Card className="border-2 border-primary-blue bg-primary-blue/5 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary-blue/10 to-primary-blue/5">
                <CardTitle as="h3" className="text-primary-blue-dark">
                  📊 Referências de Mercado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center rounded-lg bg-system-success/10 p-3">
                    <span className="font-medium">CDI atual:</span>
                    <span className="font-bold text-lg text-system-success">
                      {getDefaultRate("CDI")}% a.a.
                    </span>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-surface-light p-3">
                    <span className="font-medium">IPCA (projeção):</span>
                    <span className="font-bold text-lg text-primary-blue-dark">
                      {getDefaultRate("IPCA")}% a.a.
                    </span>
                  </div>
                  <div className="flex justify-between items-center rounded-lg bg-surface-light p-3">
                    <span className="font-medium">Poupança:</span>
                    <span className="font-bold text-lg text-finance-gold-dark">
                      {getDefaultRate("POUPANCA")}% a.a.
                    </span>
                  </div>
                  <div className="mt-3 rounded-lg bg-primary-blue/10 p-2 text-xs text-primary-blue-dark text-center font-medium">
                    📈 CDBs típicos: 95% a 130% do CDI
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section - Prominent Visual Display */}
        {result && (
          <div className="space-y-8">
            {/* Hero Result Card */}
            <Card className="border-4 border-finance-gold bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle as="h2" className="text-2xl font-bold text-finance-gold-dark">
                  🎉 Resultado da Simulação CDB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-finance-gold/20 to-finance-gold/10 rounded-2xl p-6">
                    <div className="text-5xl font-bold text-finance-gold-dark mb-2">
                      {formatCurrency(result.netFinalAmount)}
                    </div>
                    <div className="text-lg text-text-secondary">Valor Final Líquido</div>
                    <div className="text-sm text-system-success mt-1">
                      Lucro de {formatCurrency(result.netReturn)} • {((result.netReturn / (parseFloat(principal) || 1)) * 100).toFixed(1)}% de rentabilidade
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Grid - Enhanced for Mobile */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 border-primary-blue bg-primary-blue/10 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle as="h3" className="text-sm text-primary-blue-dark font-semibold">
                    💰 Valor Bruto
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-primary-blue-dark">
                      {formatCurrency(result.finalAmount)}
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      Antes dos impostos
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-system-error bg-system-error/10 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle as="h3" className="text-sm text-system-error font-semibold">
                    💸 Total Impostos
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-system-error">
                      {formatCurrency(result.incomeTax + result.iofTax)}
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      IR: {formatPercentage(result.taxRate)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-system-success bg-system-success/10 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle as="h3" className="text-sm text-system-success font-semibold">
                    📊 Lucro Líquido
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-system-success">
                      {formatCurrency(result.netReturn)}
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      Ganho final
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-finance-gold bg-finance-gold/10 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle as="h3" className="text-sm text-finance-gold-dark font-semibold">
                    📈 Rentabilidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-finance-gold-dark">
                      {((result.netReturn / (parseFloat(principal) || 1)) * 100).toFixed(1)}%
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      Retorno total
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investment Comparison - Enhanced Visual Hierarchy */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="border-2 border-growth-green bg-gradient-to-br from-growth-green/10 to-growth-green/5 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-growth-green/20 to-growth-green/10">
                  <CardTitle as="h3" className="text-lg font-bold text-growth-green flex items-center">
                    🏦 CDB vs Poupança
                    {result.comparison.savings.advantage > 0 && 
                      <span className="ml-2 bg-growth-green text-white px-2 py-1 rounded-full text-xs">VANTAGEM</span>
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-surface-light rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-secondary font-medium">💰 Na Poupança:</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(result.comparison.savings.finalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary font-medium">🏦 No CDB (líquido):</span>
                        <span className="font-bold text-lg text-growth-green">
                          {formatCurrency(result.netFinalAmount)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-growth-green/20 rounded-lg p-4 text-center">
                      <div className="text-sm text-text-secondary mb-1">💚 Vantagem do CDB</div>
                      <div className="text-2xl font-bold text-growth-green">
                        {formatCurrency(result.comparison.savings.advantage)}
                      </div>
                      <div className="text-sm text-system-success mt-1">
                        {result.comparison.savings.percentageAdvantage > 0 ? "+" : ""}
                        {result.comparison.savings.percentageAdvantage.toFixed(1)}% a mais
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-system-info bg-gradient-to-br from-system-info/10 to-system-info/5 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-system-info/20 to-system-info/10">
                  <CardTitle as="h3" className="text-lg font-bold text-system-info flex items-center">
                    💎 CDB vs LCI/LCA
                    {result.comparison.lciLca.advantage > 0 && 
                      <span className="ml-2 bg-system-info text-white px-2 py-1 rounded-full text-xs">LCI MELHOR</span>
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-surface-light rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-secondary font-medium">🏦 CDB (líquido):</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(result.netFinalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary font-medium">💎 LCI/LCA (isento):</span>
                        <span className="font-bold text-lg text-system-info">
                          {formatCurrency(result.comparison.lciLca.finalAmount)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-system-info/20 rounded-lg p-4 text-center">
                      <div className="text-sm text-text-secondary mb-1">
                        {result.comparison.lciLca.advantage > 0 ? "💎 Vantagem LCI/LCA" : "🏦 Vantagem CDB"}
                      </div>
                      <div className="text-2xl font-bold text-system-info">
                        {formatCurrency(Math.abs(result.comparison.lciLca.advantage))}
                      </div>
                      <div className="text-sm text-text-secondary mt-1">
                        {Math.abs(result.comparison.lciLca.percentageAdvantage).toFixed(1)}% de diferença
                      </div>
                    </div>
                    
                    <div className="bg-system-info/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-system-info font-medium">
                        💡 Economia de imposto com LCI/LCA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Evolution Table - Enhanced */}
            {result.monthlyEvolution.length > 1 && (
              <Card className="border-2 border-primary-blue bg-primary-blue/5 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary-blue/10 to-primary-blue/5">
                  <CardTitle as="h3" className="text-primary-blue-dark">📊 Evolução Mensal do Investimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-primary-blue/20 bg-primary-blue/10">
                          <th className="p-3 text-left font-semibold">Mês</th>
                          <th className="p-3 text-right font-semibold">Saldo</th>
                          <th className="p-3 text-right font-semibold">Juros Brutos</th>
                          <th className="p-3 text-right font-semibold">Imposto</th>
                          <th className="p-3 text-right font-semibold">Juros Líquidos</th>
                          <th className="p-3 text-right font-semibold">Total Acumulado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.monthlyEvolution.map((evolution, index) => (
                          <tr
                            key={index}
                            className="border-b border-border-primary hover:bg-primary-blue/5 transition-colors"
                          >
                            <td className="p-3 font-medium">{evolution.month}º mês</td>
                            <td className="p-3 text-right font-medium tabular-nums text-primary-blue-dark">
                              {formatCurrency(evolution.balance)}
                            </td>
                            <td className="p-3 text-right tabular-nums text-growth-green font-medium">
                              {formatCurrency(evolution.grossInterest)}
                            </td>
                            <td className="p-3 text-right tabular-nums text-system-error font-medium">
                              -{formatCurrency(evolution.tax)}
                            </td>
                            <td className="p-3 text-right tabular-nums text-system-success font-medium">
                              {formatCurrency(evolution.netInterest)}
                            </td>
                            <td className="p-3 text-right font-bold tabular-nums text-finance-gold-dark">
                              {formatCurrency(evolution.accumulatedNet)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Seção Educacional: O que é CDB */}
        <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary sm:text-2xl">
              🏦 O que é CDB? Guia Completo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-text-primary">
              <div className="text-base leading-relaxed sm:text-lg">
                <p>
                  <strong className="text-primary-blue-dark">
                    CDB (Certificado de Depósito Bancário)
                  </strong>{" "}
                  é um investimento de renda fixa onde você empresta dinheiro para o banco em troca
                  de juros. É uma das aplicações mais populares do Brasil, oferecendo{" "}
                  <strong className="text-growth-green">segurança e rentabilidade</strong>
                  superiores à poupança.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                    🎯 Como Funciona o CDB?
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-primary-blue-light p-4">
                      <h4 className="mb-2 font-semibold text-primary-blue-dark">
                        💡 Mecânica Simples
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Você empresta seu dinheiro para o banco, que usa esses recursos para fazer
                        empréstimos e investimentos. Em troca, o banco paga{" "}
                        <strong>juros pré-definidos</strong> sobre seu capital.
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-system-success">✅</span>
                        <span>
                          <strong>Garantido pelo FGC</strong> até R$ 250.000
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-success">✅</span>
                        <span>
                          <strong>Liquidez:</strong> Pode ser diária ou no vencimento
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-success">✅</span>
                        <span>
                          <strong>Rentabilidade:</strong> Geralmente superior à poupança
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-warning">⚠️</span>
                        <span>
                          <strong>Tributação:</strong> Imposto de Renda sobre os ganhos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                    📊 Tipos de CDB
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-3">
                      <h4 className="mb-1 font-semibold text-growth-green">
                        📈 Pós-fixado (% do CDI)
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Mais comum. Rentabilidade varia com a taxa CDI (ex: 105% do CDI)
                      </p>
                    </div>
                    <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-3">
                      <h4 className="mb-1 font-semibold text-primary-blue-dark">💹 Pré-fixado</h4>
                      <p className="text-xs text-text-secondary">
                        Taxa definida na contratação (ex: 12% ao ano)
                      </p>
                    </div>
                    <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                      <h4 className="mb-1 font-semibold text-system-info">🌡️ Híbrido (IPCA+)</h4>
                      <p className="text-xs text-text-secondary">
                        Inflação + taxa fixa (ex: IPCA + 5%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-success/20 bg-system-success/10 p-6">
                <h4 className="mb-3 text-center text-lg font-bold text-system-success">
                  💰 Exemplo Prático: CDB vs Poupança vs LCI/LCA
                </h4>
                <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
                  <div>
                    <h5 className="mb-2 font-semibold text-system-success">💙 CDB 105% CDI:</h5>
                    <p>• Investimento: R$ 10.000</p>
                    <p>• Prazo: 24 meses</p>
                    <p>• Bruto: R$ 12.860</p>
                    <p>• IR (20%): R$ 572</p>
                    <p className="font-bold">• Líquido: R$ 12.288</p>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-growth-green">💚 Poupança:</h5>
                    <p>• Investimento: R$ 10.000</p>
                    <p>• Prazo: 24 meses</p>
                    <p>• Bruto: R$ 11.796</p>
                    <p>• IR: R$ 0 (isento)</p>
                    <p className="font-bold">• Líquido: R$ 11.796</p>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-system-info">🌟 LCI 95% CDI:</h5>
                    <p>• Investimento: R$ 10.000</p>
                    <p>• Prazo: 24 meses</p>
                    <p>• Bruto: R$ 12.421</p>
                    <p>• IR: R$ 0 (isento)</p>
                    <p className="font-bold">• Líquido: R$ 12.421</p>
                  </div>
                </div>
                <p className="mt-4 text-center font-bold">
                  <span className="text-system-info">🏆 LCI ganha por R$ 133!</span>
                  <span className="text-primary-blue-dark"> CDB ganha da poupança por R$ 492!</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora CDB"
          items={[
            {
              question: "Como funciona a tributação do CDB e qual a alíquota de Imposto de Renda?",
              answer:
                "O <strong>CDB é tributado pelo Imposto de Renda</strong> com alíquotas decrescentes: <strong>22,5% até 180 dias</strong>, 20% de 181-360 dias, 17,5% de 361-720 dias e <strong>15% acima de 720 dias</strong>. Quanto mais tempo investido, menor o imposto!",
              borderColor: "system-warning",
            },
            {
              question: "CDB ou LCI/LCA: qual investimento é melhor para minha carteira?",
              answer:
                "Depende da <strong>rentabilidade oferecida e prazo</strong>. LCI/LCA são isentas de IR, mas CDB pode pagar taxas maiores. Regra prática: CDB precisa pagar <strong>18-29% a mais</strong> que LCI/LCA para ser equivalente (dependendo do prazo).",
              borderColor: "primary-blue",
            },
            {
              question: "Qual o valor mínimo para investir em CDB?",
              answer:
                "Varia por instituição: <strong>Bancos digitais: R$ 1-1.000</strong> (100-120% CDI), <strong>Corretoras: R$ 1.000-5.000</strong> (105-130% CDI), <strong>Grandes bancos: R$ 5.000-30.000</strong> (95-110% CDI). Geralmente menor que LCI/LCA.",
              borderColor: "growth-green",
            },
            {
              question: "CDB tem liquidez diária ou só no vencimento?",
              answer:
                "<strong>Alguns CDBs têm liquidez diária</strong>, outros só no vencimento. CDBs com liquidez diária são ideais para <strong>reserva de emergência</strong>, mas oferecem rentabilidade menor. CDBs sem liquidez pagam mais e são ideais para objetivos de longo prazo.",
              borderColor: "system-info",
            },
            {
              question: "Vale a pena fazer aportes mensais no CDB?",
              answer:
                "<strong>Sim, é excelente estratégia!</strong> Aportes regulares potencializam os <strong>juros compostos</strong> e criam disciplina. Exemplo: R$ 5.000 inicial + R$ 500 mensais por 24 meses em CDB 105% CDI = <strong>R$ 19.278 líquidos</strong> (13,4% de rendimento).",
              borderColor: "growth-green",
            },
            {
              question: "CDB é garantido pelo FGC? Qual o limite de proteção?",
              answer:
                "<strong>Sim, CDB é 100% garantido pelo FGC</strong> até R$ 250.000 por CPF por banco. Limite renovável a cada 4 anos, com máximo total de <strong>R$ 1.000.000</strong>. Seu investimento está completamente protegido!",
              borderColor: "system-success",
            },
            {
              question: "Como comparar CDB com Poupança e outros investimentos?",
              answer:
                "CDB geralmente rende <strong>muito mais que a Poupança</strong>. Nossa calculadora mostra comparação automática! CDB 105% CDI supera poupança em 15-25%. Compare sempre o <strong>rendimento líquido</strong> após impostos.",
              borderColor: "primary-blue",
            },
            {
              question: "Posso resgatar meu CDB antes do vencimento?",
              answer:
                "Depende do tipo: <strong>CDB com liquidez diária</strong> permite resgate a qualquer momento. <strong>CDB sem liquidez</strong> só permite resgate no vencimento ou com perda de rentabilidade. Sempre verifique as condições antes de investir.",
              borderColor: "system-warning",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "Para <strong>maximizar seus ganhos</strong>, considere CDBs com prazo acima de 2 anos (menor IR) e diversifique entre bancos para aproveitar melhor o limite do FGC de R$ 250.000 por instituição.",
          }}
          footerText="<strong>Precisa simular outros cenários?</strong> Nossa calculadora CDB oferece cálculos precisos com tributação automática e comparações inteligentes para suas melhores decisões de investimento!"
        />

        {/* Footer */}
        <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Sobre Esta Calculadora de CDB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta <strong className="text-primary-blue-dark">calculadora de CDB</strong> é
                <strong className="text-system-success"> 100% gratuita</strong> e oferece cálculo
                preciso de tributação, comparações com outros investimentos e simulação de aportes
                mensais. Ideal para quem busca renda fixa com rentabilidade superior à poupança.
              </p>
              <p>
                <strong>Funcionalidades avançadas:</strong> Cálculo automático de IR com tabela
                regressiva, simulação de IOF para aplicações curtas, comparação com LCI/LCA e
                Poupança, aportes mensais, evolução detalhada mês a mês, informações sobre garantia
                do FGC e interface mobile-first.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Os cálculos são para
                fins educacionais. Rentabilidades passadas não garantem resultados futuros. Para
                decisões de investimento, consulte sempre um <strong>assessor qualificado</strong>{" "}
                ou <strong>planejador financeiro certificado</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Structured Data - JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Calculadora CDB",
              description:
                "Calculadora gratuita para CDB com cálculo preciso de tributação. Compare rendimentos líquidos e tome a melhor decisão de investimento.",
              url: "https://calculadorasonline.com.br/calculadoras/financas/cdb",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
              featureList: [
                "Cálculo de tributação IR automática",
                "Comparação com LCI/LCA e Poupança",
                "Simulação de aportes mensais",
                "Cálculo de IOF para investimentos curtos",
                "Evolução mensal detalhada",
                "Informações sobre garantia FGC",
                "Interface mobile-first",
                "100% gratuito",
              ],
              about: [
                {
                  "@type": "Thing",
                  name: "CDB - Certificado de Depósito Bancário",
                },
                {
                  "@type": "Thing",
                  name: "Investimento em Renda Fixa",
                },
                {
                  "@type": "Thing",
                  name: "Tributação de Investimentos",
                },
              ],
              author: {
                "@type": "Organization",
                name: "Calculadora Online BR",
              },
              publisher: {
                "@type": "Organization",
                name: "Calculadora Online BR",
              },
            }),
          }}
        />
        <RelatedCalculators category="financas" currentCalculatorId="cdb" />
      </div>
    </div>
  );
}
