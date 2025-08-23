import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
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
  LineChart,
  BarChart,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateRealEstateFinancing,
  type RealEstateFinancingParams,
  type RealEstateFinancingResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Financiamento Imobiliário 2025 - SAC e PRICE - Simulação Completa - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Simulador de financiamento imobiliário COMPLETO e GRATUITO com sistemas SAC e PRICE. Calcule prestações, juros, amortização e análise de affordability. Compare cenários, simule antecipações e descubra se o financiamento cabe no seu bolso. Ferramenta essencial para comprar seu imóvel com segurança financeira.",
    },
    {
      name: "keywords",
      content:
        "calculadora financiamento imobiliário, simulador financiamento casa, SAC vs PRICE, tabela price, sistema SAC, prestação financiamento, juros financiamento imóvel, amortização constante, affordability imóvel, simulação CEF, financiamento habitacional, casa própria, apartamento financiado, antecipação parcela, quitação antecipada, capacidade pagamento, renda mínima financiamento, financiar imóvel, como financiar casa, minha casa minha vida, FGTS financiamento, SBPE, SFH, taxa juros imóvel",
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
      content: `Calculadora Financiamento Imobiliário - SAC e PRICE 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Simule seu financiamento imobiliário com precisão! Compare SAC vs PRICE, analise affordability, simule antecipações e descubra se o imóvel cabe no orçamento. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/financiamento-imobiliario",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    {
      name: "twitter:title",
      content: `Simulador Financiamento Imobiliário SAC/PRICE - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Simule financiamentos imobiliários com precisão! Compare sistemas, analise capacidade de pagamento e tome decisões seguras.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "theme-color", content: "#1e40af" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function RealEstateFinancingCalculator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentType, setDownPaymentType] = useState<"amount" | "percentage">("percentage");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [system, setSystem] = useState<"sac" | "price">("price");
  const [insurance, setInsurance] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [condominiumFee, setCondominiumFee] = useState("");
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<RealEstateFinancingResult | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "financiamento_imobiliario",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("financiamento_imobiliario");

  const handleCalculate = () => {
    const propertyValueNum = parseFloat(propertyValue) || 0;
    const downPaymentNum =
      downPaymentType === "percentage"
        ? (propertyValueNum * (parseFloat(downPayment) || 0)) / 100
        : parseFloat(downPayment) || 0;
    const loanTermNum = parseFloat(loanTerm) || 0;
    const interestRateNum = parseFloat(interestRate) || 0;
    const insuranceNum = parseFloat(insurance) || 0;
    const propertyTaxNum = parseFloat(propertyTax) || 0;
    const condominiumFeeNum = parseFloat(condominiumFee) || 0;
    const incomeNum = parseFloat(income) || 0;

    if (propertyValueNum > 0 && downPaymentNum >= 0 && loanTermNum > 0 && interestRateNum > 0) {
      const params: RealEstateFinancingParams = {
        propertyValue: propertyValueNum,
        downPayment: downPaymentNum,
        loanTerm: loanTermNum,
        interestRate: interestRateNum,
        system,
        insurance: insuranceNum,
        propertyTax: propertyTaxNum,
        condominiumFee: condominiumFeeNum,
        income: incomeNum,
      };

      const calculationResult = calculateRealEstateFinancing(params);
      setResult(calculationResult);
    }
  };

  const handleReset = () => {
    setPropertyValue("");
    setDownPayment("");
    setDownPaymentType("percentage");
    setLoanTerm("");
    setInterestRate("");
    setSystem("price");
    setInsurance("");
    setPropertyTax("");
    setCondominiumFee("");
    setIncome("");
    setResult(null);
    setShowAmortization(false);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercentage = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2 }).format(
      value / 100
    );

  const downPaymentPercentage =
    (parseFloat(propertyValue) || 0) > 0
      ? (
          ((downPaymentType === "percentage"
            ? ((parseFloat(propertyValue) || 0) * (parseFloat(downPayment) || 0)) / 100
            : parseFloat(downPayment) || 0) /
            (parseFloat(propertyValue) || 0)) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Financiamento Imobiliário</BreadcrumbItem>
      </Breadcrumb>

      {/* S-Tier Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-24">
          <div className="mb-6 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
            <span className="mr-2">🏠</span>
            Simulador SAC e PRICE com Análise de Capacidade
          </div>
          
          <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Calculadora de
            <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
              Financiamento Imobiliário
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Simule <strong className="text-finance-gold-dark">sistemas SAC e PRICE</strong>, analise
            <strong className="text-system-success"> capacidade de pagamento</strong> e descubra se o
            imóvel cabe no seu orçamento.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3 lg:gap-6">
            <div className="rounded-xl bg-finance-gold/10 p-4 ring-1 ring-finance-gold/20">
              <div className="text-2xl font-bold text-finance-gold-dark">🏠</div>
              <div className="text-sm text-text-secondary">SAC e PRICE</div>
            </div>
            <div className="rounded-xl bg-system-success/10 p-4 ring-1 ring-system-success/20">
              <div className="text-2xl font-bold text-system-success">📊</div>
              <div className="text-sm text-text-secondary">Análise de Capacidade</div>
            </div>
            <div className="rounded-xl bg-primary-blue/10 p-4 ring-1 ring-primary-blue/20">
              <div className="text-2xl font-bold text-primary-blue-dark">📈</div>
              <div className="text-sm text-text-secondary">Comparação Inteligente</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Calculator Inputs */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">🏠 Dados do Imóvel e Financiamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  type="number"
                  label="Valor do Imóvel (R$)"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  placeholder="Ex: 400000"
                  min="0"
                  step="1000"
                  required
                  fullWidth
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">Entrada</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder={downPaymentType === "percentage" ? "Ex: 20" : "Ex: 80000"}
                        min="0"
                        step={downPaymentType === "percentage" ? "0.1" : "1000"}
                        fullWidth
                      />
                    </div>
                    <Select
                      value={downPaymentType}
                      onChange={(value) => setDownPaymentType(value as "amount" | "percentage")}
                      options={[
                        { value: "percentage", label: "%" },
                        { value: "amount", label: "R$" },
                      ]}
                      fullWidth
                    />
                  </div>
                  {propertyValue && downPayment && (
                    <p className="text-xs text-text-secondary">
                      Entrada:{" "}
                      {formatCurrency(
                        downPaymentType === "percentage"
                          ? ((parseFloat(propertyValue) || 0) * (parseFloat(downPayment) || 0)) /
                              100
                          : parseFloat(downPayment) || 0
                      )}{" "}
                      ({downPaymentPercentage}%)
                    </p>
                  )}
                </div>

                <Input
                  type="number"
                  label="Prazo (anos)"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="Ex: 30"
                  min="1"
                  max="35"
                  step="1"
                  required
                  fullWidth
                />

                <RateInput
                  label="Taxa de Juros (% ao ano)"
                  value={interestRate}
                  onChange={(value) => setInterestRate(value)}
                  placeholder="0,00"
                  required
                  fullWidth
                />

                <div className="sm:col-span-2">
                  <Select
                    label="Sistema de Amortização"
                    value={system}
                    onChange={(value) => setSystem(value as "sac" | "price")}
                    options={[
                      { value: "price", label: "PRICE - Prestações Fixas" },
                      { value: "sac", label: "SAC - Amortização Constante" },
                    ]}
                    fullWidth
                  />
                  <p className="mt-1 text-xs text-text-secondary">
                    {system === "price"
                      ? "📊 PRICE: Prestações iguais, mais juros no início"
                      : "📈 SAC: Prestações decrescentes, menos juros total"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h3">📋 Custos Adicionais (Opcional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  type="number"
                  label="Seguro (R$/ano)"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  placeholder="Ex: 1200"
                  min="0"
                  step="10"
                  fullWidth
                />

                <Input
                  type="number"
                  label="IPTU (R$/ano)"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  placeholder="Ex: 2400"
                  min="0"
                  step="10"
                  fullWidth
                />

                <Input
                  type="number"
                  label="Condomínio (R$/mês)"
                  value={condominiumFee}
                  onChange={(e) => setCondominiumFee(e.target.value)}
                  placeholder="Ex: 350"
                  min="0"
                  step="10"
                  fullWidth
                />

                <Input
                  type="number"
                  label="Renda Mensal (R$)"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Ex: 8000"
                  min="0"
                  step="100"
                  fullWidth
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons - Prominent S-Tier Design */}
          <div className="mt-8 space-y-4">
            <Button 
              onClick={handleCalculate} 
              className="h-14 px-12 text-lg font-semibold bg-finance-gold hover:bg-finance-gold-dark text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
              fullWidth
            >
              🏠 Simular Financiamento
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-12 border-2 border-finance-gold/30 text-finance-gold hover:bg-finance-gold/10 hover:border-finance-gold transition-all duration-200"
              fullWidth
            >
              🔄 Limpar Campos
            </Button>
          </div>
        </div>

        {/* Right Column - Quick Results */}
        {result && (
          <div className="space-y-4">
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                  💰 Resumo do Financiamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Valor financiado:</span>
                    <span className="font-bold text-primary-blue-dark">
                      {formatCurrency(result.loanAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Primeira prestação:</span>
                    <span className="font-bold text-system-success">
                      {formatCurrency(result.firstPayment)}
                    </span>
                  </div>
                  {system === "sac" && (
                    <div className="flex items-center justify-between">
                      <span>Última prestação:</span>
                      <span className="font-bold text-growth-green">
                        {formatCurrency(result.lastPayment)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Prestação média:</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(result.averagePayment)}
                    </span>
                  </div>
                  <div className="border-t border-primary-blue/20 pt-2">
                    <div className="flex items-center justify-between">
                      <span>Total de juros:</span>
                      <span className="font-bold text-system-warning">
                        {formatCurrency(result.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {income && parseFloat(income) > 0 && (
              <Card
                className={`border-2 duration-300 ${
                  result.affordabilityAnalysis.isAffordable
                    ? "border-system-success bg-system-success/10"
                    : "border-system-error bg-system-error/10"
                }`}
              >
                <CardHeader>
                  <CardTitle
                    as="h3"
                    className={`text-lg ${
                      result.affordabilityAnalysis.isAffordable
                        ? "text-system-success"
                        : "text-system-error"
                    }`}
                  >
                    {result.affordabilityAnalysis.isAffordable ? "✅" : "⚠️"} Análise de Capacidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Custo total/mês:</span>
                      <span className="font-bold">{formatCurrency(result.totalMonthlyCost)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>% da renda:</span>
                      <span
                        className={`font-bold ${
                          result.affordabilityAnalysis.incomeRatio <= 30
                            ? "text-system-success"
                            : "text-system-warning"
                        }`}
                      >
                        {result.affordabilityAnalysis.incomeRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sobra no orçamento:</span>
                      <span
                        className={`font-bold ${
                          result.affordabilityAnalysis.monthlyBudgetLeft >= 0
                            ? "text-system-success"
                            : "text-system-error"
                        }`}
                      >
                        {formatCurrency(result.affordabilityAnalysis.monthlyBudgetLeft)}
                      </span>
                    </div>
                    <div className="rounded bg-background-dark-secondary p-2 text-xs">
                      <p
                        className={
                          result.affordabilityAnalysis.isAffordable
                            ? "text-system-success"
                            : "text-system-error"
                        }
                      >
                        {result.affordabilityAnalysis.isAffordable
                          ? "👍 Financiamento aprovado pelos critérios de affordability"
                          : "⚠️ Cuidado: financiamento acima de 30% da renda pode ser arriscado"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Main Results Section */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-primary-blue-dark">
                  🏦 Valor Financiado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-primary-blue-dark sm:text-2xl">
                    {formatCurrency(result.loanAmount)}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {(
                      (result.loanAmount / (parseFloat(propertyValue) || result.loanAmount)) *
                      100
                    ).toFixed(1)}
                    % do valor do imóvel
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-growth-green">
                  💰 Total Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-growth-green sm:text-2xl">
                    {formatCurrency(result.totalAmount)}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">Empréstimo + juros</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-warning bg-system-warning/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-system-warning">
                  📊 Total de Juros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-system-warning sm:text-2xl">
                    {formatCurrency(result.totalInterest)}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {((result.totalInterest / result.loanAmount) * 100).toFixed(1)}% do empréstimo
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-success bg-system-success/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-system-success">
                  🏠 Custo Total/Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-system-success sm:text-2xl">
                    {formatCurrency(result.totalMonthlyCost)}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">Prestação + custos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle as="h3">📈 Evolução das Prestações ({system.toUpperCase()})</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={result.monthlyPayments
                    .filter((_, index) => index % 12 === 0)
                    .map((payment) => ({
                      label: `Ano ${Math.ceil(payment.month / 12)}`,
                      value: payment.payment,
                    }))}
                  width={400}
                  height={300}
                  className="mb-4"
                />
                <div className="space-y-1 text-xs text-text-secondary">
                  <p>
                    • <span className="font-medium text-primary-blue-dark">PRICE</span>: Prestações
                    constantes, mais juros no início
                  </p>
                  <p>
                    • <span className="font-medium text-system-success">SAC</span>: Prestações
                    decrescentes, menos juros total
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h3">💰 Composição do Pagamento Total</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { label: "Principal", value: result.loanAmount, color: "rgb(34, 197, 94)" },
                    { label: "Juros", value: result.totalInterest, color: "rgb(251, 146, 60)" },
                    {
                      label: "Entrada",
                      value: result.downPaymentAmount,
                      color: "rgb(59, 130, 246)",
                    },
                  ]}
                  width={400}
                  height={300}
                />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded bg-growth-green-soft p-2">
                    <span>Valor do imóvel:</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(parseFloat(propertyValue) || 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amortization Table */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📊 Tabela de Amortização Anual
                <Button
                  onClick={() => setShowAmortization(!showAmortization)}
                  variant="outline"
                  className="text-sm"
                >
                  {showAmortization ? "Ocultar" : "Mostrar"} Tabela
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showAmortization && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant">
                        <th className="p-2 text-left">Ano</th>
                        <th className="p-2 text-right">Total Pago</th>
                        <th className="p-2 text-right">Principal</th>
                        <th className="p-2 text-right">Juros</th>
                        <th className="p-2 text-right">Saldo Devedor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.amortizationChart.map((row) => (
                        <tr key={row.year} className="border-b border-neutral-surface-variant">
                          <td className="p-2 font-medium">{row.year}</td>
                          <td className="p-2 text-right tabular-nums">
                            {formatCurrency(row.totalPaid)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-growth-green">
                            {formatCurrency(row.principalPaid)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-system-warning">
                            {formatCurrency(row.interestPaid)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-primary-blue-dark">
                            {formatCurrency(row.remainingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Educational Content Sections */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🏠 Financiamento Imobiliário: Guia Completo para Comprar seu Imóvel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-primary-blue-dark">financiamento imobiliário</strong> é
                uma modalidade de crédito que permite
                <strong className="text-growth-green">
                  {" "}
                  realizar o sonho da casa própria
                </strong>{" "}
                pagando em prestações mensais. No Brasil, os principais sistemas são o <em>
                  SAC
                </em>{" "}
                e <em>PRICE</em>, cada um com características distintas.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">🔢 Sistema PRICE</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Características:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-text-secondary">
                    <li>
                      Prestações <strong className="text-primary-blue-dark">fixas e iguais</strong>
                    </li>
                    <li>Juros mais altos no início</li>
                    <li>Amortização cresce com o tempo</li>
                    <li>Mais popular no Brasil</li>
                  </ul>
                  <div className="mt-4 rounded bg-primary-blue-light p-3">
                    <p className="font-semibold text-primary-blue-dark">💡 Vantagem:</p>
                    <p className="text-xs">
                      Facilita o orçamento familiar com prestações previsíveis
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">📈 Sistema SAC</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Características:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-text-secondary">
                    <li>
                      Amortização <strong className="text-growth-green">constante</strong>
                    </li>
                    <li>Prestações decrescentes</li>
                    <li>Menos juros no total</li>
                    <li>Primeiro anos mais pesados</li>
                  </ul>
                  <div className="mt-4 rounded bg-growth-green-soft p-3">
                    <p className="font-semibold text-growth-green">💰 Vantagem:</p>
                    <p className="text-xs">Economia significativa de juros no longo prazo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Educational Content */}
      <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📋 Como Funciona o Financiamento Imobiliário na Prática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-system-info">
                  🏦 Modalidades de Financiamento
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      🏡 SFH (Sistema Financeiro da Habitação)
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Para imóveis <strong>até R$ 1,5 milhão</strong>. Juros mais baixos, pode usar
                      FGTS, financiamento até 35 anos.
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      🏢 SFI (Sistema de Financiamento Imobiliário)
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Para imóveis <strong>acima de R$ 1,5 milhão</strong>. Juros livres, regras
                      mais flexíveis, não pode usar FGTS.
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">
                      🏠 Minha Casa Minha Vida
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Programa social com <strong>subsídios governamentais</strong>. Juros
                      subsidiados para famílias de baixa e média renda.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-growth-green">
                  💡 Requisitos e Documentação
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      📄 Documentos Necessários
                    </h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      <li>CPF, RG e comprovante de estado civil</li>
                      <li>Comprovantes de renda (últimos 3 meses)</li>
                      <li>Declaração de Imposto de Renda</li>
                      <li>Extrato do FGTS</li>
                      <li>Certidões negativas de débitos</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      ✅ Critérios de Aprovação
                    </h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      <li>
                        <strong>Renda:</strong> Prestação não pode exceder 30% da renda
                      </li>
                      <li>
                        <strong>CPF limpo:</strong> Nome não pode estar negativado
                      </li>
                      <li>
                        <strong>Idade:</strong> Idade + prazo ≤ 80 anos
                      </li>
                      <li>
                        <strong>Entrada:</strong> Mínimo 20% do valor do imóvel
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Financiamento Imobiliário"
        items={[
          {
            question: "Qual é a diferença entre sistema SAC e PRICE no financiamento?",
            answer:
              "<strong>PRICE</strong> tem prestações fixas e iguais durante todo o financiamento. <strong>SAC</strong> tem amortização constante e prestações decrescentes. SAC economiza <strong>15-20% nos juros totais</strong>, mas tem parcelas maiores no início.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso usar o FGTS no financiamento imobiliário?",
            answer:
              "<strong>Sim!</strong> O FGTS pode ser usado na <strong>entrada, amortização ou prestações mensais</strong> em financiamentos SFH (até R$ 1,5 milhão). Precisa ter mínimo 3 anos de trabalho com FGTS e não ter usado nos últimos 3 anos.",
            borderColor: "growth-green",
          },
          {
            question: "Vale a pena antecipar parcelas do financiamento?",
            answer:
              "<strong>Quase sempre vale a pena!</strong> A antecipação reduz significativamente os juros, especialmente nos primeiros anos. Opções: <strong>amortização</strong> (reduz parcelas), <strong>redução de prazo</strong> ou modalidade híbrida.",
            borderColor: "system-success",
          },
          {
            question: "Quanto preciso de entrada para financiar um imóvel?",
            answer:
              "No SFH, entrada mínima é <strong>20% do valor do imóvel</strong>. Entradas maiores reduzem valor financiado e juros totais. <strong>Entrada 40%</strong> pode gerar economia significativa de juros comparada aos 20% mínimos.",
            borderColor: "system-info",
          },
          {
            question: "Como é feita a análise de crédito para financiamento?",
            answer:
              "Bancos avaliam <strong>capacidade de pagamento</strong> baseada em: renda (prestação máx. 30%), histórico de crédito, idade + prazo ≤ 80 anos, e compromissos existentes. Mantenha CPF limpo 6 meses antes de solicitar!",
            borderColor: "system-warning",
          },
          {
            question: "É melhor financiar ou comprar o imóvel à vista?",
            answer:
              "Depende da <strong>situação financeira</strong> e cenário econômico. Se seus investimentos rendem mais que a taxa do financiamento, pode valer financiar. Considere também dedução de juros no IR e manutenção de liquidez.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre SFH, SFI e Minha Casa Minha Vida?",
            answer:
              "<strong>SFH:</strong> imóveis até R$ 1,5 mi, juros menores, pode usar FGTS. <strong>SFI:</strong> acima R$ 1,5 mi, juros livres, sem FGTS. <strong>MCMV:</strong> programa social com subsídios para baixa e média renda.",
            borderColor: "growth-green",
          },
          {
            question: "Posso transferir meu financiamento para outro banco?",
            answer:
              "<strong>Sim, através da portabilidade!</strong> Permite transferir para banco com melhores condições sem custos extras. Compare taxas, negocie condições e solicite a transferência. Processo leva cerca de 30-60 dias.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Antes de escolher entre SAC e PRICE, simule sua <strong>capacidade de pagamento</strong> nos primeiros anos. SAC economiza mais juros, mas exige maior disciplina financeira no início do contrato.",
        }}
        footerText="<strong>Quer simular diferentes cenários?</strong> Nossa calculadora oferece comparação completa SAC vs PRICE, análise de affordability e projeções detalhadas para sua melhor decisão!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Financiamento Imobiliário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">
                calculadora de financiamento imobiliário
              </strong>{" "}
              é<strong className="text-growth-green"> 100% gratuita</strong> e permite simular
              financiamentos nos sistemas SAC e PRICE com análise completa de affordability e
              amortização detalhada.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Simulação SAC vs PRICE, análise de capacidade de
              pagamento, tabela de amortização, gráficos interativos, cálculo de custos totais e
              muito mais. Ideal para quem quer comprar seu primeiro imóvel ou refinanciar.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para
              fins educacionais e de planejamento. Para decisões de financiamento, consulte sempre
              um
              <strong> correspondente bancário</strong> ou{" "}
              <strong>gerente da instituição financeira</strong>.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em fórmulas padronizadas dos sistemas SAC e PRICE • 🎓 Ferramenta
              educacional gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos os
              dispositivos • 🌙 Modo escuro disponível • 📊 Gráficos SVG nativos para melhor
              performance
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
            name: "Calculadora de Financiamento Imobiliário",
            description:
              "Calculadora online gratuita para simular financiamentos imobiliários com sistemas SAC e PRICE. Análise completa de affordability e amortização.",
            url: "https://calculadorasonline.com.br/calculadoras/financas/financiamento-imobiliario",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Simulação SAC e PRICE",
              "Análise de affordability",
              "Tabela de amortização",
              "Gráficos de evolução",
              "Cálculo de custos totais",
              "100% gratuito",
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

      <RelatedCalculators category="financas" currentCalculatorId="financiamento-imobiliario" />
    </div>
  );
}
