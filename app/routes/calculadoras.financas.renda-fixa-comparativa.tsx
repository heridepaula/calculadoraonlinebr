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
  RateInput,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateFixedIncome,
  compareFixedIncomeInvestments,
  getDefaultRate,
  getInvestmentInfo,
  type FixedIncomeParams,
  type FixedIncomeResult,
  type ComparativeResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora Comparativa de Renda Fixa 2025 - Compare CDB, LCI, Tesouro e Poupança - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora GRATUITA para comparar investimentos em renda fixa! Compare CDB, LCI, LCA, Tesouro Direto e Poupança com taxas reais 2025. Ranking automático e análise completa de rendimentos.",
    },
    {
      name: "keywords",
      content:
        "calculadora renda fixa, comparar investimentos, CDB vs LCI, tesouro direto, poupança, CDI 2025, IR investimentos, simulador investimentos, ranking renda fixa, melhor investimento",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Comparador de Renda Fixa Oficial 2025 - Ranking Automático - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Descubra qual investimento rende mais! Compare CDB, LCI, LCA, Tesouro e Poupança com cálculos precisos e ranking automático. Ferramenta gratuita e atualizada!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonline.com.br/calculadoras/financas/renda-fixa-comparativa",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Calculadora Comparativa Renda Fixa 2025 - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Compare investimentos lado a lado! Veja qual rende mais: CDB, LCI, Tesouro ou Poupança. Cálculo com taxas reais e IR 2025.",
    },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "theme-color", content: "#3B82F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora Comparativa de Renda Fixa",
        description:
          "Calculadora online gratuita para comparar investimentos em renda fixa. Compare CDB, LCI, LCA, Tesouro Direto e Poupança com taxas oficiais 2025 e ranking automático.",
        url: "https://calculadoraonline.com.br/calculadoras/financas/renda-fixa-comparativa",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: "https://calculadoraonline.com.br",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Calculadoras",
              item: "https://calculadoraonline.com.br/calculadoras",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Finanças",
              item: "https://calculadoraonline.com.br/calculadoras/financas",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Renda Fixa Comparativa",
              item: "https://calculadoraonline.com.br/calculadoras/financas/renda-fixa-comparativa",
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "Calculadora Online BR",
          url: "https://calculadoraonline.com.br",
        },
      }),
    },
  ];
};

interface Investment {
  id: string;
  enabled: boolean;
  initialValue: string;
  monthlyContribution: string;
  periodInMonths: string;
  investmentType:
    | "poupanca"
    | "cdb"
    | "lci"
    | "lca"
    | "tesouro-selic"
    | "tesouro-ipca"
    | "tesouro-prefixado";
  returnType: "pre-fixado" | "pos-cdi" | "selic" | "ipca-plus" | "poupanca";
  annualRate: string;
}

export default function FixedIncomeComparativeCalculator() {
  const [result, setResult] = useState<ComparativeResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Estados dos investimentos (até 4 simultâneos)
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      enabled: true,
      initialValue: "10000",
      monthlyContribution: "500",
      periodInMonths: "24",
      investmentType: "poupanca",
      returnType: "poupanca",
      annualRate: "6.17",
    },
    {
      id: "2",
      enabled: true,
      initialValue: "10000",
      monthlyContribution: "500",
      periodInMonths: "24",
      investmentType: "cdb",
      returnType: "pos-cdi",
      annualRate: "11.31",
    },
    {
      id: "3",
      enabled: false,
      initialValue: "10000",
      monthlyContribution: "500",
      periodInMonths: "24",
      investmentType: "lci",
      returnType: "pos-cdi",
      annualRate: "10.68",
    },
    {
      id: "4",
      enabled: false,
      initialValue: "10000",
      monthlyContribution: "500",
      periodInMonths: "24",
      investmentType: "tesouro-selic",
      returnType: "selic",
      annualRate: "10.50",
    },
  ]);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "renda_fixa_comparativa",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("renda_fixa_comparativa");

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

  // Função para atualizar investimento
  const updateInvestment = (index: number, field: keyof Investment, value: any) => {
    setInvestments((prev) =>
      prev.map((inv, i) => (i === index ? { ...inv, [field]: value } : inv))
    );
  };

  // Função para ativar/desativar investimento
  const toggleInvestment = (index: number) => {
    setInvestments((prev) =>
      prev.map((inv, i) => (i === index ? { ...inv, enabled: !inv.enabled } : inv))
    );
  };

  // Função para atualizar taxa baseada no tipo de investimento
  const updateInvestmentType = (index: number, type: string) => {
    const defaultRate = getDefaultRate(type);
    updateInvestment(index, "investmentType", type);
    updateInvestment(index, "annualRate", defaultRate.toString());
  };

  // Cálculo em tempo real
  useEffect(() => {
    const calculate = () => {
      try {
        const enabledInvestments = investments.filter((inv) => inv.enabled);

        if (enabledInvestments.length === 0) {
          setResult(null);
          return;
        }

        const params: FixedIncomeParams[] = enabledInvestments.map((inv) => ({
          initialValue: parseMoneyValue(inv.initialValue),
          monthlyContribution: parseMoneyValue(inv.monthlyContribution),
          periodInMonths: parseInt(inv.periodInMonths) || 0,
          investmentType: inv.investmentType,
          returnType: inv.returnType,
          annualRate: parseFloat(inv.annualRate) || 0,
        }));

        // Validação básica
        const isValid = params.every(
          (p) => p.initialValue > 0 && p.periodInMonths > 0 && p.annualRate >= 0
        );

        if (isValid) {
          setIsCalculating(true);
          const calculationResult = compareFixedIncomeInvestments(params);
          setResult(calculationResult);
          setTimeout(() => setIsCalculating(false), 100);
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error("Erro no cálculo:", error);
        setResult(null);
        setIsCalculating(false);
      }
    };

    calculate();
  }, [investments]);

  const handleCalculate = () => {
    // Força recálculo
    const enabledInvestments = investments.filter((inv) => inv.enabled);

    if (enabledInvestments.length === 0) return;

    const params: FixedIncomeParams[] = enabledInvestments.map((inv) => ({
      initialValue: parseMoneyValue(inv.initialValue),
      monthlyContribution: parseMoneyValue(inv.monthlyContribution),
      periodInMonths: parseInt(inv.periodInMonths) || 0,
      investmentType: inv.investmentType,
      returnType: inv.returnType,
      annualRate: parseFloat(inv.annualRate) || 0,
    }));

    try {
      setIsCalculating(true);
      const calculationResult = compareFixedIncomeInvestments(params);
      setResult(calculationResult);
      setTimeout(() => setIsCalculating(false), 100);
    } catch (error) {
      console.error("Erro no cálculo manual:", error);
      setResult(null);
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInvestments([
      {
        id: "1",
        enabled: true,
        initialValue: "10000",
        monthlyContribution: "500",
        periodInMonths: "24",
        investmentType: "poupanca",
        returnType: "poupanca",
        annualRate: "6.17",
      },
      {
        id: "2",
        enabled: true,
        initialValue: "10000",
        monthlyContribution: "500",
        periodInMonths: "24",
        investmentType: "cdb",
        returnType: "pos-cdi",
        annualRate: "11.31",
      },
      {
        id: "3",
        enabled: false,
        initialValue: "10000",
        monthlyContribution: "500",
        periodInMonths: "24",
        investmentType: "lci",
        returnType: "pos-cdi",
        annualRate: "10.68",
      },
      {
        id: "4",
        enabled: false,
        initialValue: "10000",
        monthlyContribution: "500",
        periodInMonths: "24",
        investmentType: "tesouro-selic",
        returnType: "selic",
        annualRate: "10.50",
      },
    ]);
    setResult(null);
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

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "baixo":
        return "text-growth-green";
      case "medio":
        return "text-system-warning";
      case "alto":
        return "text-system-error";
      default:
        return "text-text-secondary";
    }
  };

  const getRiskLevelLabel = (level: string) => {
    switch (level) {
      case "baixo":
        return "Baixo";
      case "medio":
        return "Médio";
      case "alto":
        return "Alto";
      default:
        return "N/A";
    }
  };

  const getLiquidityLabel = (liquidity: string) => {
    switch (liquidity) {
      case "diaria":
        return "Diária";
      case "mensal":
        return "Mensal";
      case "vencimento":
        return "No Vencimento";
      default:
        return "N/A";
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem>Renda Fixa Comparativa</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-8">
        {/* S-Tier Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
          <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-24">
            <div className="mb-6 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
              <span className="mr-2">📊</span>
              Comparativo Inteligente com Ranking Automático
            </div>
            
            <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Calculadora
              <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
                Renda Fixa Comparativa
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              Compare <strong className="text-finance-gold-dark">CDB, LCI, LCA, Tesouro Direto e Poupança</strong>
              lado a lado! Descubra <strong className="text-system-success">qual investimento rende mais</strong>
              com taxas reais 2025.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-4 lg:gap-6">
              <div className="rounded-xl bg-finance-gold/10 p-4 ring-1 ring-finance-gold/20">
                <div className="text-2xl font-bold text-finance-gold-dark">💰</div>
                <div className="text-sm text-text-secondary">Taxas Reais 2025</div>
              </div>
              <div className="rounded-xl bg-system-success/10 p-4 ring-1 ring-system-success/20">
                <div className="text-2xl font-bold text-system-success">📈</div>
                <div className="text-sm text-text-secondary">Ranking Automático</div>
              </div>
              <div className="rounded-xl bg-primary-blue/10 p-4 ring-1 ring-primary-blue/20">
                <div className="text-2xl font-bold text-primary-blue-dark">4</div>
                <div className="text-sm text-text-secondary">Comparações</div>
              </div>
              <div className="rounded-xl bg-system-warning/10 p-4 ring-1 ring-system-warning/20">
                <div className="text-2xl font-bold text-system-warning">⚡</div>
                <div className="text-sm text-text-secondary">Tempo Real</div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário - Grid de Investimentos */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {investments.map((investment, index) => (
            <Card
              key={investment.id}
              className={`${investment.enabled ? "border-primary-blue" : "border-neutral-stroke bg-neutral-surface/20"}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle as="h3">
                    Investimento {index + 1}
                    {investment.enabled && result && (
                      <span className="ml-2 text-sm font-normal text-growth-green">
                        #
                        {result.ranking.findIndex(
                          (r) =>
                            r.investmentInfo.name ===
                            getInvestmentInfo(investment.investmentType)?.name
                        ) + 1}{" "}
                        no ranking
                      </span>
                    )}
                  </CardTitle>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={investment.enabled}
                      onChange={() => toggleInvestment(index)}
                      className="border-neutral-stroke h-4 w-4 rounded text-primary-blue focus:ring-primary-blue"
                    />
                    <span className="text-sm">Ativo</span>
                  </label>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 gap-4">
                    <MoneyInput
                      label="Valor Inicial"
                      value={investment.initialValue}
                      onChange={(value) => updateInvestment(index, "initialValue", value)}
                      placeholder="R$ 10.000,00"
                      disabled={!investment.enabled}
                      fullWidth
                    />

                    <MoneyInput
                      label="Aportes Mensais"
                      value={investment.monthlyContribution}
                      onChange={(value) => updateInvestment(index, "monthlyContribution", value)}
                      placeholder="R$ 500,00"
                      disabled={!investment.enabled}
                      fullWidth
                    />

                    <Input
                      type="number"
                      label="Período (meses)"
                      value={investment.periodInMonths}
                      onChange={(e) => updateInvestment(index, "periodInMonths", e.target.value)}
                      placeholder="24"
                      min="1"
                      max="600"
                      disabled={!investment.enabled}
                      fullWidth
                    />

                    <Select
                      label="Tipo de Investimento"
                      value={investment.investmentType}
                      onChange={(value) => updateInvestmentType(index, value)}
                      options={[
                        { value: "poupanca", label: "Poupança" },
                        { value: "cdb", label: "CDB" },
                        { value: "lci", label: "LCI" },
                        { value: "lca", label: "LCA" },
                        { value: "tesouro-selic", label: "Tesouro Selic" },
                        { value: "tesouro-ipca", label: "Tesouro IPCA+" },
                        { value: "tesouro-prefixado", label: "Tesouro Prefixado" },
                      ]}
                      disabled={!investment.enabled}
                      fullWidth
                    />

                    <RateInput
                      label="Taxa de Rentabilidade (% a.a.)"
                      value={investment.annualRate}
                      onChange={(value) => updateInvestment(index, "annualRate", value)}
                      placeholder="10,50"
                      min="0.1"
                      max="50"
                      disabled={!investment.enabled}
                      fullWidth
                    />
                  </div>

                  {investment.enabled && (
                    <div className="rounded-lg bg-system-info/10 p-3 text-xs text-text-secondary">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Mínimo:</strong>{" "}
                          {formatCurrency(
                            getInvestmentInfo(investment.investmentType)?.minimumValue || 0
                          )}
                        </div>
                        <div>
                          <strong>Risco:</strong>{" "}
                          <span
                            className={getRiskLevelColor(
                              getInvestmentInfo(investment.investmentType)?.riskLevel || "baixo"
                            )}
                          >
                            {getRiskLevelLabel(
                              getInvestmentInfo(investment.investmentType)?.riskLevel || "baixo"
                            )}
                          </span>
                        </div>
                        <div>
                          <strong>Liquidez:</strong>{" "}
                          {getLiquidityLabel(
                            getInvestmentInfo(investment.investmentType)?.liquidity || "diaria"
                          )}
                        </div>
                        <div>
                          <strong>IR:</strong>{" "}
                          {getInvestmentInfo(investment.investmentType)?.taxFree
                            ? "Isento"
                            : "Tributado"}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons - Prominent S-Tier Design */}
        <div className="mt-8 space-y-4">
          <Button 
            type="button"
            onClick={handleCalculate} 
            className="h-14 px-12 text-lg font-semibold bg-finance-gold hover:bg-finance-gold-dark text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
            fullWidth
          >
            📊 Comparar Investimentos
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="outline"
            className="h-12 border-2 border-finance-gold/30 text-finance-gold hover:bg-finance-gold/10 hover:border-finance-gold transition-all duration-200"
            fullWidth
          >
            🔄 Limpar Campos
          </Button>
        </div>

        {/* Resultado */}
        {result && (
          <>
            {/* Ranking */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle as="h2">🏆 Ranking dos Melhores Investimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.ranking.map((investment, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-4 ${
                        index === 0
                          ? "border-growth-green bg-gradient-to-r from-growth-green/20 to-growth-green/5"
                          : index === 1
                            ? "border-primary-blue bg-gradient-to-r from-primary-blue/20 to-primary-blue/5"
                            : index === 2
                              ? "border-system-warning bg-gradient-to-r from-system-warning/20 to-system-warning/5"
                              : "border-neutral-stroke bg-neutral-surface/20"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                              index === 0
                                ? "bg-growth-green"
                                : index === 1
                                  ? "bg-primary-blue"
                                  : index === 2
                                    ? "bg-system-warning"
                                    : "bg-neutral-stroke"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary">
                              {investment.investmentInfo.name}
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {investment.investmentInfo.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-text-primary">
                            {formatCurrency(investment.finalValue)}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Rendimento: {formatCurrency(investment.totalReturn)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                        <div>
                          <span className="text-text-secondary">Taxa Efetiva:</span>
                          <div className="font-semibold">
                            {formatPercentage(investment.effectiveRate)}
                          </div>
                        </div>
                        <div>
                          <span className="text-text-secondary">Rendimento Real:</span>
                          <div className="font-semibold">
                            {formatCurrency(investment.realReturn)}
                          </div>
                        </div>
                        <div>
                          <span className="text-text-secondary">IR Pago:</span>
                          <div className="font-semibold">
                            {formatCurrency(investment.incomeTax)}
                          </div>
                        </div>
                        <div>
                          <span className="text-text-secondary">ROI:</span>
                          <div className="font-semibold">
                            {formatPercentage(investment.returnOnInvestment)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparação com Poupança */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle as="h2">💰 Vantagem sobre a Poupança</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {result.poupancaComparison.map((comparison, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold text-primary-blue-dark">
                          {comparison.investment.investmentInfo.name}
                        </h4>
                        <div
                          className={`font-bold ${comparison.additionalReturn > 0 ? "text-growth-green" : "text-system-error"}`}
                        >
                          {comparison.additionalReturn > 0 ? "+" : ""}
                          {formatCurrency(comparison.additionalReturn)}
                        </div>
                      </div>
                      <div className="text-sm text-text-secondary">
                        <span>
                          Rendimento {comparison.percentage > 0 ? "superior" : "inferior"} em{" "}
                        </span>
                        <span
                          className={`font-semibold ${comparison.percentage > 0 ? "text-growth-green" : "text-system-error"}`}
                        >
                          {Math.abs(comparison.percentage).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recomendações */}
            {result.recommendations.length > 0 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle as="h2">💡 Recomendações Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.recommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 rounded-lg border border-growth-green/20 bg-growth-green/10 p-3"
                      >
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-growth-green text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <p className="text-sm text-text-secondary">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alertas sobre Mudanças Tributárias */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle as="h2">⚠️ Alertas Importantes - Mudanças 2025/2026</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      📋 MP 1.303/2025 - Nova Tributação
                    </h4>
                    <p className="text-sm text-text-secondary">
                      A partir de 2025, investimentos em renda fixa podem ter alíquota única de{" "}
                      <strong>17,5%</strong> de IR, substituindo a tabela regressiva. Acompanhe as
                      mudanças na legislação.
                    </p>
                  </div>

                  <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-error">
                      🚨 LCI/LCA - Fim da Isenção 2026
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>ATENÇÃO:</strong> A partir de 2026, LCI e LCA podem perder a isenção
                      de IR. Aproveite os benefícios fiscais até o final de 2025.
                    </p>
                  </div>

                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">📊 Taxas de Referência</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                      <div className="text-center">
                        <div className="font-semibold">CDI</div>
                        <div className="text-primary-blue-dark">12,57% a.a.</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Selic</div>
                        <div className="text-growth-green">10,50% a.a.</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">IPCA</div>
                        <div className="text-system-warning">4,20% a.a.</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Poupança</div>
                        <div className="text-text-secondary">6,17% a.a.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Conteúdo Educacional */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">
              📚 Guia Completo: Renda Fixa e Comparação de Investimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-text-secondary">
              {/* O que é Renda Fixa */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  💰 O que é Renda Fixa?
                </h3>
                <p className="mb-4">
                  <strong className="text-primary-blue-dark">Renda fixa</strong> são investimentos
                  que possuem regras de remuneração definidas no momento da aplicação. Você sabe{" "}
                  <strong className="text-growth-green">exatamente como</strong> seu dinheiro será
                  remunerado, seja por uma{" "}
                  <strong className="text-system-warning">
                    taxa prefixada, pós-fixada ou híbrida
                  </strong>
                  .
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      ✅ Vantagens da Renda Fixa:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Previsibilidade:</strong> Rendimento conhecido antecipadamente
                      </li>
                      <li>
                        • <strong>Baixo risco:</strong> Maioria protegida pelo FGC
                      </li>
                      <li>
                        • <strong>Liquidez:</strong> Alguns permitem resgate a qualquer momento
                      </li>
                      <li>
                        • <strong>Variedade:</strong> Opções para todos os perfis
                      </li>
                      <li>
                        • <strong>Proteção:</strong> Boa proteção contra volatilidade
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      ⚠️ Pontos de Atenção:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Inflação:</strong> Rendimento real pode ser baixo
                      </li>
                      <li>
                        • <strong>Imposto de Renda:</strong> Tributação regressiva
                      </li>
                      <li>
                        • <strong>Liquidez limitada:</strong> Alguns têm carência
                      </li>
                      <li>
                        • <strong>Oportunidade:</strong> Menor potencial de ganho
                      </li>
                      <li>
                        • <strong>Taxa fixa:</strong> Risco de juros em alta
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Tipos de Investimento */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  🏦 Principais Tipos de Renda Fixa
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">🏛️ Poupança</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Rendimento:</strong> 6,17% ao ano (2025)
                      </li>
                      <li>
                        • <strong>IR:</strong> Isento de imposto de renda
                      </li>
                      <li>
                        • <strong>Liquidez:</strong> Diária (perde rendimento do mês)
                      </li>
                      <li>
                        • <strong>Mínimo:</strong> R$ 1,00
                      </li>
                      <li>
                        • <strong>Proteção:</strong> FGC até R$ 250 mil
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      🏪 CDB (Certificado de Depósito Bancário)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Rendimento:</strong> 90% a 120% do CDI
                      </li>
                      <li>
                        • <strong>IR:</strong> Tabela regressiva (22,5% a 15%)
                      </li>
                      <li>
                        • <strong>Liquidez:</strong> Diária ou no vencimento
                      </li>
                      <li>
                        • <strong>Mínimo:</strong> R$ 1.000 (varia por banco)
                      </li>
                      <li>
                        • <strong>Proteção:</strong> FGC até R$ 250 mil
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      🏡 LCI/LCA (Letras de Crédito)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Rendimento:</strong> 85% a 95% do CDI
                      </li>
                      <li>
                        • <strong>IR:</strong> Isento até 2025
                      </li>
                      <li>
                        • <strong>Liquidez:</strong> No vencimento (carência 90 dias)
                      </li>
                      <li>
                        • <strong>Mínimo:</strong> R$ 30.000 (maioria)
                      </li>
                      <li>
                        • <strong>Proteção:</strong> FGC até R$ 250 mil
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">🇧🇷 Tesouro Direto</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Selic:</strong> 10,50% a.a. + liquidez diária
                      </li>
                      <li>
                        • <strong>IPCA+:</strong> Taxa fixa + inflação
                      </li>
                      <li>
                        • <strong>Prefixado:</strong> Taxa definida na compra
                      </li>
                      <li>
                        • <strong>IR:</strong> 17,5% (nova regra)
                      </li>
                      <li>
                        • <strong>Custódia:</strong> 0,2% a.a.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Como Escolher */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  🎯 Como Escolher o Melhor Investimento
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">💡 Para Iniciantes</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • Comece com <strong>Tesouro Selic</strong>
                      </li>
                      <li>• Liquidez diária para emergências</li>
                      <li>• Baixo valor mínimo (R$ 30)</li>
                      <li>• Risco baixíssimo (governo)</li>
                      <li>• Boa rentabilidade vs poupança</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      💰 Para Valores Altos
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>LCI/LCA</strong> até 2025 (isento IR)
                      </li>
                      <li>• CDB com taxa acima de 100% CDI</li>
                      <li>• Diversificar entre bancos</li>
                      <li>• Respeitar limite FGC (R$ 250 mil)</li>
                      <li>• Negociar taxa com gerente</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      📈 Para Proteção Inflação
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Tesouro IPCA+</strong> para prazos longos
                      </li>
                      <li>• Proteção real do poder de compra</li>
                      <li>• Ideal para aposentadoria</li>
                      <li>• Taxa fixa + variação IPCA</li>
                      <li>• Atenção à marcação a mercado</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Estratégias Avançadas */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  🚀 Estratégias de Diversificação
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      🎯 Estratégia de Liquidez
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Reserva de Emergência (40%):</strong>
                      </p>
                      <p className="ml-4">• Tesouro Selic ou CDB com liquidez diária</p>
                      <p>
                        <strong>Investimentos Médio Prazo (40%):</strong>
                      </p>
                      <p className="ml-4">• LCI/LCA com vencimentos escalonados</p>
                      <p>
                        <strong>Investimentos Longo Prazo (20%):</strong>
                      </p>
                      <p className="ml-4">• Tesouro IPCA+ para proteção inflacionária</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      ⚖️ Estratégia de Prazo
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Escada de Vencimentos:</strong>
                      </p>
                      <p className="ml-4">• Divida aplicações em prazos diferentes</p>
                      <p className="ml-4">• Renovação periódica com novas taxas</p>
                      <p>
                        <strong>Balanceamento:</strong>
                      </p>
                      <p className="ml-4">• 30% curto prazo (até 1 ano)</p>
                      <p className="ml-4">• 50% médio prazo (1-3 anos)</p>
                      <p className="ml-4">• 20% longo prazo (3+ anos)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mudanças 2025/2026 */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  ⚠️ Importantes Mudanças 2025/2026
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-error">
                      🚨 MP 1.303/2025 - Nova Tributação
                    </h4>
                    <p className="mb-2 text-sm">
                      A Medida Provisória 1.303/2025 estabelece{" "}
                      <strong>alíquota única de 17,5%</strong> para investimentos em renda fixa,
                      substituindo a tabela regressiva atual.
                    </p>
                    <div className="text-sm">
                      <p>
                        <strong>Antes:</strong> 22,5% → 20% → 17,5% → 15% (regressiva)
                      </p>
                      <p>
                        <strong>Depois:</strong> 17,5% fixo para todos os prazos
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      📅 Fim da Isenção LCI/LCA (2026)
                    </h4>
                    <p className="mb-2 text-sm">
                      A partir de 2026, <strong>LCI e LCA perdem a isenção</strong> de Imposto de
                      Renda. Investimentos realizados até 31/12/2025 mantêm o benefício.
                    </p>
                    <div className="text-sm">
                      <p>
                        <strong>Até 2025:</strong> Isenção total de IR
                      </p>
                      <p>
                        <strong>A partir 2026:</strong> Tributação de 17,5%
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      💡 Estratégias para 2025
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Aproveite LCI/LCA</strong> até dezembro de 2025
                      </li>
                      <li>
                        • <strong>Prefira prazos longos</strong> em LCI/LCA (mantêm isenção)
                      </li>
                      <li>
                        • <strong>Diversifique</strong> entre isentos e tributados
                      </li>
                      <li>
                        • <strong>Monitore</strong> aprovação final da MP no Congresso
                      </li>
                      <li>
                        • <strong>Reavalie</strong> estratégia a partir de 2026
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora Comparativa de Renda Fixa"
          items={[
            {
              question: "Qual investimento rende mais: CDB, LCI, Tesouro Direto ou Poupança?",
              answer:
                "Depende do <strong>prazo, valor e tributação</strong>. <strong>LCI/LCA são isentas de IR</strong>, CDB tem taxa maior mas paga IR, <strong>Tesouro tem liquidez diária</strong>, Poupança rende menos. Nossa calculadora compara automaticamente o rendimento líquido de todos!",
              borderColor: "growth-green",
            },
            {
              question: "Como funciona a tabela regressiva do Imposto de Renda?",
              answer:
                "IR decresce com tempo: <strong>22,5% até 180 dias</strong>, 20% até 360 dias, 17,5% até 720 dias, <strong>15% acima de 720 dias</strong>. <strong>Atenção:</strong> MP 1.303/2025 pode mudar para alíquota única de 17,5%. LCI/LCA continuam isentas!",
              borderColor: "system-warning",
            },
            {
              question: "O que é FGC e como protege meus investimentos?",
              answer:
                "<strong>Fundo Garantidor de Créditos</strong> protege até <strong>R$ 250.000 por CPF por banco</strong> em CDB, LCI, LCA e Poupança. Tesouro Direto é garantido pelo Governo Federal. Para valores maiores, diversifique entre instituições diferentes!",
              borderColor: "system-success",
            },
            {
              question: "Quando escolher Tesouro IPCA+ ao invés de Tesouro Selic?",
              answer:
                "<strong>Tesouro IPCA+:</strong> para prazo longo (+3 anos), proteção contra inflação, quando a taxa real é atrativa. <strong>Tesouro Selic:</strong> para reserva de emergência, prazo curto, necessidade de liquidez. Nossa calculadora mostra qual é melhor!",
              borderColor: "primary-blue",
            },
            {
              question: "Posso perder dinheiro investindo em renda fixa?",
              answer:
                "O risco é <strong>baixíssimo</strong> com proteção FGC/Governo. Porém, pode haver 'perda real' se: <strong>rendimento < inflação</strong>, venda antecipada do Tesouro com marcação a mercado, ou quebra de instituição acima do FGC. Compare sempre o rendimento real!",
              borderColor: "system-error-dark",
            },
            {
              question: "Vale a pena investir em renda fixa com a Selic atual?",
              answer:
                "<strong>Sim!</strong> Com Selic em 10,50% (2025), temos: <strong>rendimento real positivo</strong> (Selic > IPCA), CDBs pagando até 120% do CDI, segurança em cenário incerto. Momento excelente para renda fixa, mas mantenha diversificação!",
              borderColor: "growth-green",
            },
            {
              question: "Como migrar da poupança para investimentos melhores?",
              answer:
                "Transição <strong>gradual e segura</strong>: 1) Mantenha emergência em Tesouro Selic, 2) Migre 20-30% inicialmente, 3) Teste CDB/LCI com prazos diferentes, 4) Compare sempre com nossa calculadora, 5) Aumente gradualmente conforme experiência.",
              borderColor: "system-info",
            },
            {
              question: "Qual o valor mínimo para começar a investir?",
              answer:
                "<strong>Tesouro Direto: R$ 30</strong> (mais acessível), Poupança: R$ 1, <strong>CDB: R$ 1.000-5.000</strong>, LCI/LCA: R$ 30.000. <strong>Dica:</strong> Comece com Tesouro Selic se tem pouco dinheiro - seguro, rentável e líquido!",
              borderColor: "primary-blue",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "Para <strong>maximizar rendimentos</strong>, diversifique entre produtos: 40% Tesouro (liquidez), 30% CDB (rentabilidade), 30% LCI/LCA (isenção fiscal). Sempre compare o rendimento líquido final!",
          }}
          footerText="<strong>Quer a melhor escolha?</strong> Nossa calculadora compara automaticamente todos os investimentos e mostra o ranking dos melhores rendimentos líquidos para seu perfil!"
        />

        <RelatedCalculators category="financas" currentCalculatorId="renda-fixa-comparativa" />
      </div>
    </div>
  );
}
