import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  RateInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { calculateLCILCA } from "~/utils/calculations";
import type { LCILCAParams, LCILCAResult } from "~/utils/calculations";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  getDefaultRate,
  getIndicatorInfo,
  isDataRecent,
  getDataFreshnessColor,
} from "~/lib/economic-data";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora LCI e LCA 2025 - Simulador Completo de Investimentos - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora LCI e LCA GRATUITA com simulações completas. Compare rendimentos, veja vantagens fiscais, calcule carência e descubra se vale mais que CDB e Poupança. Ferramenta completa para investir em Letras de Crédito no Brasil.",
    },
    {
      name: "keywords",
      content:
        "calculadora LCI, calculadora LCA, letra de crédito imobiliário, letra de crédito agronegócio, investimento LCI LCA, rendimento LCI LCA, carência LCI LCA, isenção imposto renda, CDI LCI LCA, comparar LCI CDB, simulador investimento, renda fixa brasil, banco investimento, percentual CDI, IPCA+ LCI, taxa pré fixada, liquidez LCI LCA",
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
      content: `Calculadora LCI e LCA - Simule seu Investimento - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Simule investimentos em LCI e LCA! Compare rendimentos, veja vantagens fiscais e descubra qual o melhor investimento para seu perfil. Ferramenta gratuita e completa.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/lci-lca",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora LCI e LCA - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Simule investimentos em LCI e LCA com nossa calculadora gratuita. Compare rendimentos e tome a melhor decisão!",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#22c55e" },
    { name: "theme-color", content: "#22c55e" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function LCILCACalculator() {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [interestType, setInterestType] = useState<
    "percentage_cdi" | "percentage_ipca" | "fixed_rate"
  >("percentage_cdi");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState<"days" | "months" | "years">("months");
  const [indexRate, setIndexRate] = useState(() => {
    // Define valor padrão baseado no tipo de taxa inicial
    return getDefaultRate("CDI").toString();
  });
  const [investmentType, setInvestmentType] = useState<"lci" | "lca">("lci");
  const [hasCarencia, setHasCarencia] = useState(false);
  const [carenciaPeriod, setCarenciaPeriod] = useState("");
  const [carenciaUnit, setCarenciaUnit] = useState<"days" | "months">("days");
  const [result, setResult] = useState<LCILCAResult | null>(null);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "lci_lca",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("lci_lca");

  // Função para atualizar indexRate quando o tipo de taxa mudar
  const handleInterestTypeChange = (
    newType: "percentage_cdi" | "percentage_ipca" | "fixed_rate"
  ) => {
    setInterestType(newType);
    // Atualiza automaticamente o indexRate com valor padrão
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
    const carenciaPeriodNum = parseFloat(carenciaPeriod) || 0;

    if (principalNum > 0 && interestRateNum > 0 && periodNum > 0) {
      const params: LCILCAParams = {
        principal: principalNum,
        interestRate: interestRateNum,
        interestType,
        period: periodNum,
        periodUnit,
        indexRate: indexRateNum,
        investmentType,
        bank: "Não especificado",
        hasCarencia,
        carenciaPeriod: carenciaPeriodNum,
        carenciaUnit,
      };

      const calculationResult = calculateLCILCA(params);
      setResult(calculationResult);
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setInterestRate("");
    setPeriod("");
    setIndexRate(getDefaultRate("CDI").toString()); // Restaura valor padrão do CDI
    setCarenciaPeriod("");
    setHasCarencia(false);
    setInterestType("percentage_cdi"); // Volta para CDI
    setResult(null);
  };

  const handleLoadDefaults = () => {
    setPrincipal("10000");
    setInterestRate("95");
    setPeriod("24");
    setPeriodUnit("months");
    setIndexRate(getDefaultRate("CDI").toString());
    setInterestType("percentage_cdi");
    setInvestmentType("lci");
    setHasCarencia(true);
    setCarenciaPeriod("90");
    setCarenciaUnit("days");
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercentage = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2 }).format(
      value / 100
    );

  const formatDate = (date: Date) =>
    new Intl.DateFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>LCI e LCA</BreadcrumbItem>
      </Breadcrumb>

      {/* S-Tier Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-24">
          <div className="mb-6 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
            <span className="mr-2">💰</span>
            Simulador LCI e LCA com Vantagens Fiscais
          </div>
          
          <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Calculadora de
            <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
              LCI e LCA
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Simule <strong className="text-finance-gold-dark">Letras de Crédito</strong> com isenção fiscal.
            Compare rendimentos, analise carência e descubra se vale mais que 
            <strong className="text-system-success">CDB e Poupança</strong>.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3 lg:gap-6">
            <div className="rounded-xl bg-system-success/10 p-4 ring-1 ring-system-success/20">
              <div className="text-2xl font-bold text-system-success">0%</div>
              <div className="text-sm text-text-secondary">Imposto de Renda</div>
            </div>
            <div className="rounded-xl bg-finance-gold/10 p-4 ring-1 ring-finance-gold/20">
              <div className="text-2xl font-bold text-finance-gold-dark">📊</div>
              <div className="text-sm text-text-secondary">Compare Investimentos</div>
            </div>
            <div className="rounded-xl bg-primary-blue/10 p-4 ring-1 ring-primary-blue/20">
              <div className="text-2xl font-bold text-primary-blue-dark">⏰</div>
              <div className="text-sm text-text-secondary">Analise Carência</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário Principal */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados do Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primeira linha - Tipo de Investimento e Valor */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <Select
                label="Tipo de Investimento"
                value={investmentType}
                onChange={(value) => setInvestmentType(value as "lci" | "lca")}
                options={[
                  { value: "lci", label: "LCI - Imobiliário" },
                  { value: "lca", label: "LCA - Agronegócio" },
                ]}
                fullWidth
              />

              <Input
                type="number"
                label="Valor do Investimento (R$)"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Ex: 10000"
                min="0"
                step="0.01"
                required
                fullWidth
              />
            </div>

            {/* Segunda linha - Taxa oferecida e Tipo de Taxa */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <RateInput
                label="Taxa Oferecida (%)"
                value={interestRate}
                onChange={(value) => setInterestRate(value)}
                placeholder="0,00"
                required
                fullWidth
              />

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
              />
            </div>

            {/* Terceira linha - Taxa de referência (condicional) */}
            {(interestType === "percentage_cdi" || interestType === "percentage_ipca") && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <div className="space-y-2">
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
                    />

                    {/* Informações sobre o valor atual */}
                    <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span
                            className={`font-semibold ${getDataFreshnessColor(interestType === "percentage_cdi" ? "CDI" : "IPCA")}`}
                          >
                            💹 Valor oficial atual:{" "}
                            {getDefaultRate(interestType === "percentage_cdi" ? "CDI" : "IPCA")}%
                          </span>
                        </div>
                        <div className="text-text-secondary">
                          {
                            getIndicatorInfo(interestType === "percentage_cdi" ? "CDI" : "IPCA")
                              .source
                          }
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-text-secondary">
                        📅 Última atualização:{" "}
                        {
                          getIndicatorInfo(interestType === "percentage_cdi" ? "CDI" : "IPCA")
                            .lastUpdate
                        }
                      </div>
                      <div className="mt-1 text-xs text-text-secondary">
                        {
                          getIndicatorInfo(interestType === "percentage_cdi" ? "CDI" : "IPCA")
                            .description
                        }
                      </div>
                      {!isDataRecent(interestType === "percentage_cdi" ? "CDI" : "IPCA") && (
                        <div className="mt-1 text-xs font-medium text-system-warning">
                          ⚠️ Dados podem estar desatualizados. Verifique fontes oficiais.
                        </div>
                      )}
                    </div>
                  </div>
                  <div></div> {/* Espaço vazio para manter alinhamento */}
                </div>
              </div>
            )}

            {/* Quarta linha - Prazo do investimento */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
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
              />
            </div>

            {/* Quinta linha - Seção de Carência */}
            <div>
              <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <div className="mb-4">
                  <div className="mb-3 flex items-start space-x-3">
                    <button
                      type="button"
                      onClick={() => setHasCarencia(!hasCarencia)}
                      className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${
                        hasCarencia
                          ? "border-system-info bg-system-info text-white"
                          : "hover:border-system-info:border-system-info-dark border-neutral-surface-variant bg-background-dark-secondary"
                      }`}
                    >
                      {hasCarencia && (
                        <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <label
                        className="cursor-pointer text-sm font-medium text-system-info"
                        onClick={() => setHasCarencia(!hasCarencia)}
                      >
                        Este investimento tem carência?
                      </label>
                      <p className="mt-1 text-xs text-text-secondary">
                        💡 <strong>Carência</strong> é o período mínimo que você deve manter o
                        investimento.
                      </p>
                    </div>
                  </div>
                </div>

                {hasCarencia && (
                  <div className="grid grid-cols-2 gap-4 border-t border-system-info/20 pt-4">
                    <Input
                      type="number"
                      label="Período de Carência"
                      value={carenciaPeriod}
                      onChange={(e) => setCarenciaPeriod(e.target.value)}
                      placeholder="Ex: 90"
                      min="0"
                      step="1"
                      fullWidth
                    />

                    <Select
                      label="Unidade"
                      value={carenciaUnit}
                      onChange={(value) => setCarenciaUnit(value as any)}
                      options={[
                        { value: "days", label: "Dias" },
                        { value: "months", label: "Meses" },
                      ]}
                      fullWidth
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons - Prominent S-Tier Design */}
          <div className="mt-8 space-y-4">
            <Button 
              onClick={handleCalculate} 
              className="h-14 px-12 text-lg font-semibold bg-finance-gold hover:bg-finance-gold-dark text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
              fullWidth
            >
              💰 Simular LCI/LCA
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleLoadDefaults}
                variant="outline"
                className="h-12 border-2 border-system-info/30 text-system-info hover:bg-system-info/10 hover:border-system-info transition-all duration-200"
                fullWidth
              >
                📊 Exemplo
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 border-2 border-finance-gold/30 text-finance-gold hover:bg-finance-gold/10 hover:border-finance-gold transition-all duration-200"
                fullWidth
              >
                🔄 Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Result Card - S-Tier Prominence */}
      {result && (
        <>
          <Card className="border-4 border-finance-gold bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="mb-3">
                  <span className="inline-flex items-center rounded-full bg-finance-gold/20 px-4 py-2 text-sm font-medium text-finance-gold-dark">
                    💰 {investmentType.toUpperCase()} - Isento de IR
                  </span>
                </div>
                <div className="text-5xl font-bold text-finance-gold-dark mb-2">
                  {formatCurrency(result.finalAmount)}
                </div>
                <p className="text-lg text-text-secondary mb-6">
                  Valor final após {period}{" "}
                  {periodUnit === "months" ? "meses" : periodUnit === "years" ? "anos" : "dias"}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-system-success/10 border border-system-success/20">
                    <div className="text-2xl font-bold text-system-success">
                      {formatCurrency(result.netReturn)}
                    </div>
                    <p className="text-sm text-text-secondary mt-1">Rendimento Líquido</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary-blue/10 border border-primary-blue/20">
                    <div className="text-2xl font-bold text-primary-blue-dark">
                      {formatPercentage(result.annualReturn)}
                    </div>
                    <p className="text-sm text-text-secondary mt-1">Rentabilidade Anual</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-3 gap-6 md:grid-cols-1 md:gap-4">
            <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  💰 Valor Final
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold tabular-nums text-growth-green md:text-2xl">
                    {formatCurrency(result.finalAmount)}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary md:text-xs">
                    Após {period}{" "}
                    {periodUnit === "months" ? "meses" : periodUnit === "years" ? "anos" : "dias"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-success bg-system-success/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-system-success">
                  📈 Rendimento Líquido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold tabular-nums text-system-success">
                    {formatCurrency(result.netReturn)}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">Isento de Imposto de Renda</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  📊 Rentabilidade Anual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold tabular-nums text-primary-blue-dark">
                    {formatPercentage(result.annualReturn)}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    Taxa efetiva: {result.effectiveRate}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informações de Carência */}
          {hasCarencia && (
            <Card className="border-2 border-system-warning bg-system-warning/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-system-warning">
                  ⏰ Informações de Carência
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-bold text-system-warning">Data de Liberação</h4>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatDate(result.canWithdrawOn)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Você poderá resgatar a partir desta data
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-bold text-system-warning">Status Atual</h4>
                    <div
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        result.isDuringCarencia
                          ? "bg-system-error/10 text-system-error/10"
                          : "bg-system-success/10 text-system-success/10"
                      }`}
                    >
                      {result.isDuringCarencia ? "🔒 Em carência" : "✅ Disponível para resgate"}
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">
                      {result.isDuringCarencia
                        ? "Investimento ainda em período de carência"
                        : "Investimento já pode ser resgatado"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comparações */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Comparação com Poupança */}
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  🏦 Comparação com a Poupança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Na Poupança:</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(
                        parseFloat(principal) + result.comparisonWithSavings.savingsReturn
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Na {investmentType.toUpperCase()}:</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.finalAmount)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-text-primary">Vantagem:</span>
                    <div className="text-right">
                      <div className="font-bold text-primary-blue-dark">
                        {formatCurrency(result.comparisonWithSavings.advantage)}
                      </div>
                      <div className="text-sm text-system-success">
                        {result.comparisonWithSavings.percentageAdvantage > 0 ? "+" : ""}
                        {result.comparisonWithSavings.percentageAdvantage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparação com CDB */}
            <Card className="border-2 border-system-info bg-system-info/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info">
                  💳 Comparação com CDB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">CDB (bruto):</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(parseFloat(principal) + result.comparisonWithCDB.cdbReturn)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Imposto CDB:</span>
                    <span className="font-bold text-system-error-dark">
                      -{formatCurrency(result.comparisonWithCDB.cdbTax)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">CDB (líquido):</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(
                        parseFloat(principal) + result.comparisonWithCDB.cdbNetReturn
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">
                      {investmentType.toUpperCase()} (isento):
                    </span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.finalAmount)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-text-primary">Vantagem fiscal:</span>
                    <div className="text-right">
                      <div className="font-bold text-system-info">
                        {formatCurrency(result.comparisonWithCDB.advantage)}
                      </div>
                      <div className="text-sm text-system-success">
                        {result.comparisonWithCDB.percentageAdvantage > 0 ? "+" : ""}
                        {result.comparisonWithCDB.percentageAdvantage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evolução Mensal */}
          {result.monthlyEvolution.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">📊 Evolução do Investimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant">
                        <th className="p-2 text-left">Mês</th>
                        <th className="p-2 text-right">Saldo</th>
                        <th className="p-2 text-right">Juros do Mês</th>
                        <th className="p-2 text-right">Rendimento Acumulado</th>
                        <th className="p-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyEvolution.map((evolution, index) => (
                        <tr key={index} className="border-b border-neutral-surface-variant">
                          <td className="p-2 font-medium">{evolution.month}º mês</td>
                          <td className="p-2 text-right font-medium tabular-nums text-growth-green">
                            {formatCurrency(evolution.balance)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-system-success">
                            {formatCurrency(evolution.interestEarned)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-primary-blue-dark">
                            {formatCurrency(evolution.accumulatedReturn)}
                          </td>
                          <td className="p-2 text-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                evolution.canWithdraw
                                  ? "bg-system-success/10 text-system-success/10"
                                  : "bg-system-warning/10 text-system-warning/10"
                              }`}
                            >
                              {evolution.canWithdraw ? "✅ Livre" : "🔒 Carência"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Seção: O que são LCI e LCA */}
      <Card className="border-l-4 border-growth-green bg-gradient-to-r from-growth-green-soft to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🏢 O que são LCI e LCA? Investimentos com Vantagem Fiscal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                <strong className="text-growth-green">LCI (Letra de Crédito Imobiliário)</strong> e
                <strong className="text-primary-blue-dark">
                  {" "}
                  LCA (Letra de Crédito do Agronegócio)
                </strong>{" "}
                são investimentos de renda fixa{" "}
                <strong className="text-system-success">isentos de Imposto de Renda</strong>
                para pessoas físicas, oferecendo excelente relação risco-retorno.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                  🏠 LCI - Letra de Crédito Imobiliário
                </h3>
                <div className="space-y-3">
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">💡 Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Você empresta dinheiro para o banco, que usa esses recursos para financiar
                      <strong className="text-growth-green"> operações do setor imobiliário</strong>
                      (financiamentos de casas, apartamentos, construção civil).
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-growth-green">✅</span>
                      <span>
                        <strong>Isento de IR</strong> para pessoa física
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-growth-green">✅</span>
                      <span>
                        <strong>Garantido pelo FGC</strong> até R$ 250.000
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-growth-green">✅</span>
                      <span>
                        <strong>Rentabilidade</strong> normalmente entre 80% a 100% do CDI
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Carência:</strong> Normalmente 90 dias a 24 meses
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                  🌾 LCA - Letra de Crédito do Agronegócio
                </h3>
                <div className="space-y-3">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">💡 Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Você empresta dinheiro para o banco, que usa esses recursos para financiar
                      <strong className="text-primary-blue-dark"> operações do agronegócio</strong>
                      (compra de equipamentos, custeio de safras, financiamento rural).
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-blue-dark">✅</span>
                      <span>
                        <strong>Isento de IR</strong> para pessoa física
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-blue-dark">✅</span>
                      <span>
                        <strong>Garantido pelo FGC</strong> até R$ 250.000
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-blue-dark">✅</span>
                      <span>
                        <strong>Rentabilidade</strong> similar ou superior à LCI
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Carência:</strong> Varia conforme a instituição
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-success/20 bg-system-success/10 p-6">
              <h4 className="mb-3 text-center text-lg font-bold text-system-success">
                🎯 Principal Vantagem: Isenção de Imposto de Renda
              </h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h5 className="mb-2 font-semibold text-system-success">💚 LCI/LCA (Isento):</h5>
                  <div className="space-y-1 text-sm">
                    <p>
                      • <strong>Rendimento bruto:</strong> R$ 1.000
                    </p>
                    <p>
                      • <strong>Imposto de Renda:</strong> R$ 0
                    </p>
                    <p className="font-bold text-system-success">
                      • <strong>Rendimento líquido:</strong> R$ 1.000
                    </p>
                  </div>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-system-warning">💛 CDB (Com IR):</h5>
                  <div className="space-y-1 text-sm">
                    <p>
                      • <strong>Rendimento bruto:</strong> R$ 1.000
                    </p>
                    <p>
                      • <strong>Imposto de Renda:</strong> R$ 150-225
                    </p>
                    <p className="font-bold text-system-warning">
                      • <strong>Rendimento líquido:</strong> R$ 775-850
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center font-bold text-system-success">
                💰 Vantagem fiscal de até 29% nos seus rendimentos!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Tipos de Rentabilidade */}
      <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📊 Tipos de Rentabilidade em LCI e LCA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-lg text-text-primary">
              <p>
                LCI e LCA podem oferecer diferentes tipos de rentabilidade.
                <strong className="text-system-info"> Entenda cada modalidade</strong>
                para escolher a que melhor se adapta ao seu perfil e momento econômico.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-primary-blue/20 bg-primary-blue-light p-6">
                <h3 className="mb-4 text-lg font-bold text-primary-blue-dark">
                  📈 Pós-fixada (% do CDI)
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Oferece um <strong>percentual do CDI</strong> (ex: 95% do CDI). Se o CDI
                      subir, sua rentabilidade também sobe.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Proteção contra alta da Selic</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Mais comum no mercado</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Risco:</strong> Queda da Selic reduz rendimento
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-primary-blue-light p-3">
                    <p className="text-xs font-bold text-primary-blue-dark">
                      💡 Ideal quando: CDI está em alta ou há expectativa de alta da Selic
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-growth-green-soft p-6">
                <h3 className="mb-4 text-lg font-bold text-growth-green">
                  📊 Pré-fixada (Taxa Fixa)
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Oferece uma <strong>taxa fixa</strong> (ex: 10% ao ano). Você sabe exatamente
                      quanto receberá no vencimento.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Previsibilidade total</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Proteção contra queda da Selic</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Risco:</strong> Perde se o CDI subir muito
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-growth-green-soft p-3">
                    <p className="text-xs font-bold text-growth-green">
                      💡 Ideal quando: CDI está alto e há expectativa de queda da Selic
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-info/20 bg-system-info/10 p-6">
                <h3 className="mb-4 text-lg font-bold text-system-info">📊 Híbrida (IPCA+)</h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Oferece <strong>inflação + taxa fixa</strong> (ex: IPCA + 5% ao ano). Protege
                      contra inflação e ainda rende um extra.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Proteção contra inflação</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Ganho real garantido</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Menos comum em LCI/LCA</strong>
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-system-info/10 p-3">
                    <p className="text-xs font-bold text-system-info">
                      💡 Ideal para: Investimentos de longo prazo e proteção inflacionária
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Carência e Liquidez */}
      <Card className="border-l-4 border-system-warning bg-system-warning/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⏰ Carência e Liquidez: O que Você Precisa Saber
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-lg text-text-primary">
              <p>
                A <strong className="text-system-warning">carência</strong> é a principal limitação
                das LCI e LCA. Entenda como funciona e como se planejar para maximizar seus
                rendimentos.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-bold text-system-warning">🔒 O que é Carência?</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-warning/20 bg-gray-900 p-4">
                    <p className="mb-3 text-sm text-text-secondary">
                      <strong className="text-system-warning">Carência</strong> é o período mínimo
                      que você deve manter o dinheiro investido. Durante esse tempo,
                      <strong> não é possível resgatar</strong> sem perdas.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-system-error-dark">❌</span>
                        <span>
                          <strong>90 dias:</strong> Carência mínima mais comum
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-error-dark">❌</span>
                        <span>
                          <strong>180 dias a 2 anos:</strong> Carências mais longas
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-warning">⚠️</span>
                        <span>
                          <strong>Resgate antecipado:</strong> Pode perder rentabilidade
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      💡 Dica de Planejamento
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Só invista dinheiro que você <strong>não precisará</strong> durante o período
                      de carência. Considere sua reserva de emergência antes de investir.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-growth-green">
                  🎯 Estratégias de Liquidez
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      1. 💰 Escadinha de Vencimentos
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Divida o dinheiro em várias aplicações com vencimentos escalonados. Ex: R$
                      10.000 em 4 LCIs de R$ 2.500 com vencimentos de 3, 6, 12 e 24 meses.
                    </p>
                  </div>

                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      2. 🏦 Diversifique Bancos
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Aplique em diferentes instituições para ter mais opções de resgate e
                      aproveitar melhores ofertas de diferentes bancos.
                    </p>
                  </div>

                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">3. ⚖️ Mix de Prazos</h4>
                    <p className="text-xs text-text-secondary">
                      Combine investimentos de curto prazo (mais líquidos) com longo prazo (maior
                      rentabilidade) conforme sua necessidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-info/20 bg-system-info/10 p-6">
              <h4 className="mb-3 text-center text-lg font-bold text-system-info">
                📊 Comparação: Carência vs Rentabilidade
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-system-info/30">
                      <th className="p-3 text-left">Prazo de Carência</th>
                      <th className="p-3 text-center">Rentabilidade Típica</th>
                      <th className="p-3 text-center">Liquidez</th>
                      <th className="p-3 text-center">Recomendado Para</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-system-info/20">
                    <tr>
                      <td className="p-3 font-medium">90 dias</td>
                      <td className="p-3 text-center">85% - 95% CDI</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center rounded-full bg-system-success/10 px-2 py-1 text-xs text-system-success/10">
                          Alta
                        </span>
                      </td>
                      <td className="p-3 text-center text-xs">Reserva de oportunidade</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">180-360 dias</td>
                      <td className="p-3 text-center">95% - 105% CDI</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center rounded-full bg-system-warning/10 px-2 py-1 text-xs text-system-warning/10">
                          Média
                        </span>
                      </td>
                      <td className="p-3 text-center text-xs">Objetivos médio prazo</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">1-2 anos</td>
                      <td className="p-3 text-center">100% - 120% CDI</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center rounded-full bg-system-error/10 px-2 py-1 text-xs text-system-error/10">
                          Baixa
                        </span>
                      </td>
                      <td className="p-3 text-center text-xs">Objetivos longo prazo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora LCI e LCA"
        items={[
          {
            question: "LCI e LCA são realmente isentas de Imposto de Renda para pessoas físicas?",
            answer:
              "<strong>Sim, totalmente isentas!</strong> Para pessoas físicas, LCI e LCA não pagam IR mesmo nos prazos mais curtos. Esta é a <strong>maior vantagem</strong> sobre CDB, que pode ter IR de até 22,5%. Para pessoas jurídicas há tributação normal.",
            borderColor: "system-success",
          },
          {
            question: "Qual a diferença prática entre LCI e LCA para o investidor?",
            answer:
              "Para o investidor, <strong>são praticamente iguais</strong>. <strong>LCI</strong> financia setor imobiliário, <strong>LCA</strong> financia agronegócio. Ambas têm isenção de IR, garantia FGC, carência similar e rentabilidades equivalentes no mercado.",
            borderColor: "primary-blue",
          },
          {
            question: "Como comparar LCI/LCA com CDB? Qual vale mais a pena?",
            answer:
              "Use a <strong>regra prática</strong>: LCI/LCA precisa pagar <strong>77-85% da taxa do CDB</strong> para ser equivalente (dependendo do prazo). Exemplo: CDB 100% CDI = LCI 85% CDI no longo prazo. Nossa calculadora faz essa comparação automaticamente!",
            borderColor: "growth-green",
          },
          {
            question: "Qual o valor mínimo para investir em LCI e LCA?",
            answer:
              "Varia por instituição: <strong>Bancos digitais: R$ 1.000-5.000</strong>, <strong>Grandes bancos: R$ 5.000-30.000</strong>, <strong>Corretoras: R$ 1.000-10.000</strong>. Geralmente valores maiores que CDB devido à regulamentação específica.",
            borderColor: "system-info",
          },
          {
            question: "LCI e LCA têm garantia do FGC? Como funciona?",
            answer:
              "<strong>Sim, 100% garantidas!</strong> FGC protege até <strong>R$ 250.000 por CPF por banco</strong>. Estratégia: diversifique entre bancos para maximizar proteção (R$ 250k Banco A + R$ 250k Banco B = R$ 500k total protegidos).",
            borderColor: "system-success",
          },
          {
            question: "Posso resgatar LCI/LCA antes do vencimento?",
            answer:
              "<strong>Geralmente não</strong>, especialmente durante a carência (90-180 dias). Após carência, alguns bancos permitem com <strong>perda de rentabilidade</strong>. Planeje bem o prazo antes de investir!",
            borderColor: "system-warning",
          },
          {
            question: "Como funciona a carência da LCI e LCA?",
            answer:
              "Carência típica: <strong>90-180 dias</strong> para LCI e LCA. Durante este período, <strong>não é possível resgatar</strong> o investimento. Após a carência, resgate pode ser permitido conforme condições do banco.",
            borderColor: "system-error-dark",
          },
          {
            question: "Vale a pena investir em LCI/LCA com a taxa Selic atual?",
            answer:
              "Com Selic alta, LCI/LCA se tornam <strong>muito atrativas</strong> pela isenção de IR! Mesmo pagando 85-90% do CDI, o retorno líquido supera CDBs. Use nossa calculadora para comparar cenários reais do mercado!",
            borderColor: "growth-green",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para <strong>maximizar rendimentos</strong>, diversifique entre LCI e LCA de diferentes bancos, respeitando o limite de R$ 250.000 do FGC por instituição. Priorize taxas acima de 85% do CDI para superar CDBs!",
        }}
        footerText="<strong>Quer comparar investimentos?</strong> Nossa calculadora LCI/LCA oferece análise completa com comparações automáticas e projeções precisas para sua melhor decisão!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de LCI e LCA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-growth-green">calculadora de LCI e LCA</strong> é
              <strong className="text-system-success"> 100% gratuita</strong> e oferece simulações
              completas com comparações, análise de carência e vantagens fiscais. Ideal para
              investidores que buscam renda fixa com isenção de IR.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Cálculo de rentabilidade, comparação com CDB e
              Poupança, análise de carência, evolução mensal do investimento, diferentes tipos de
              rentabilidade (CDI, pré-fixada, IPCA+) e conteúdo educacional completo sobre o mercado
              brasileiro.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para
              fins educacionais e de planejamento. Rentabilidades passadas não garantem resultados
              futuros. Para decisões de investimento importantes, consulte sempre um{" "}
              <strong>assessor financeiro</strong>
              ou <strong>analista qualificado</strong>.
            </p>
            <p className="mt-4 border-t border-growth-green/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em metodologia do mercado financeiro brasileiro • 🎓 Conteúdo
              educacional especializado • 🔒 Seus dados não são armazenados • 📱 Interface
              responsiva • 🌙 Modo escuro disponível • 💰 Informações atualizadas sobre LCI e LCA
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
            name: "Calculadora LCI e LCA",
            description:
              "Calculadora online gratuita para simular investimentos em LCI e LCA. Compare rendimentos, analise vantagens fiscais e carência.",
            url: "https://calculadorasonline.com.br/calculadoras/financas/lci-lca",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Cálculo de rentabilidade LCI/LCA",
              "Comparação com CDB e Poupança",
              "Análise de carência e liquidez",
              "Diferentes tipos de rentabilidade",
              "Evolução mensal do investimento",
              "Conteúdo educacional especializado",
              "100% gratuito",
            ],
            about: [
              {
                "@type": "Thing",
                name: "LCI - Letra de Crédito Imobiliário",
              },
              {
                "@type": "Thing",
                name: "LCA - Letra de Crédito do Agronegócio",
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

      <RelatedCalculators category="financas" currentCalculatorId="lci-lca" />
    </div>
  );
}
