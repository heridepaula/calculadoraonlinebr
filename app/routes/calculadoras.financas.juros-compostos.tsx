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
  LineChart,
  BarChart,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateAdvancedCompoundInterest,
  compareWithSimpleInterest,
  type CompoundInterestParams,
  type CompoundInterestResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Juros Compostos 2025 - Simulador Completo com Aportes - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de juros compostos GRATUITA com aportes mensais e gráficos detalhados. Simule investimentos, entenda o poder dos juros sobre juros e descubra como multiplicar seu dinheiro. Ferramenta completa para planejamento financeiro e aposentadoria.",
    },
    {
      name: "keywords",
      content:
        "calculadora juros compostos, juros sobre juros, aportes mensais, investimento longo prazo, simulador financeiro, crescimento exponencial, planejamento aposentadoria, como calcular juros compostos, fórmula juros compostos, CDI, tesouro direto, fundos investimento, poupança programada, educação financeira, multiplicação dinheiro, regra dos 72, taxa real de juros, inflação investimentos",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },

    // Open Graph tags
    { property: "og:title", content: `Calculadora de Juros Compostos Completa 2025 - ${APP_NAME}` },
    {
      property: "og:description",
      content:
        "★ Simule investimentos com juros compostos e aportes mensais. Veja como seu dinheiro pode crescer exponencialmente com gráficos e tabelas detalhadas. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/juros-compostos",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Juros Compostos com Aportes - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Descubra o poder dos juros compostos! Simule investimentos, visualize gráficos de crescimento e planeje sua aposentadoria.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#22c55e" },
    { name: "theme-color", content: "#22c55e" },
    { name: "format-detection", content: "telephone=no" },

    // Structured Data - JSON-LD will be added in the component
    { name: "next-head-count", content: "25" },
  ];
};

export default function AdvancedCompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [interestPeriod, setInterestPeriod] = useState<"monthly" | "annual">("annual");
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState<"months" | "years">("years");
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  const [comparison, setComparison] = useState<any>(null);
  const [showEvolution, setShowEvolution] = useState(false);
  const [errors, setErrors] = useState<{
    principal?: string;
    interestRate?: string;
    time?: string;
  }>({});

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "juros_compostos",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("juros_compostos");

  const handleCalculate = () => {
    const principalNum = parseFloat(principal) || 0;
    const monthlyContributionNum = parseFloat(monthlyContribution) || 0;
    const interestRateNum = parseFloat(interestRate) || 0;
    const timeNum = parseFloat(time) || 0;

    // Reset errors
    setErrors({});

    // Validation
    const newErrors: { principal?: string; interestRate?: string; time?: string } = {};

    if (principalNum <= 0 && monthlyContributionNum <= 0) {
      newErrors.principal = "Informe um valor inicial ou aporte mensal";
    }

    if (!interestRate || isNaN(interestRateNum) || interestRateNum <= 0) {
      newErrors.interestRate = "Por favor, insira uma taxa de juros válida";
    } else if (interestRateNum > 100) {
      newErrors.interestRate = "Taxa de juros muito alta. Use valores até 100%";
    }

    if (!time || isNaN(timeNum) || timeNum <= 0) {
      newErrors.time = "Por favor, insira um período válido";
    } else if (timePeriod === "years" && timeNum > 100) {
      newErrors.time = "Período muito longo. Máximo 100 anos";
    } else if (timePeriod === "months" && timeNum > 1200) {
      newErrors.time = "Período muito longo. Máximo 1200 meses";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      setComparison(null);
      return;
    }

    // If validation passes, calculate
    const params: CompoundInterestParams = {
      principal: principalNum,
      monthlyContribution: monthlyContributionNum,
      interestRate: interestRateNum,
      interestPeriod,
      time: timeNum,
      timePeriod,
    };

    const calculationResult = calculateAdvancedCompoundInterest(params);
    const comparisonResult = compareWithSimpleInterest(
      principalNum,
      interestRateNum,
      interestPeriod,
      timeNum,
      timePeriod
    );

    setResult(calculationResult);
    setComparison(comparisonResult);
  };

  const handleReset = () => {
    setPrincipal("");
    setMonthlyContribution("");
    setInterestRate("");
    setTime("");
    setInterestPeriod("annual");
    setTimePeriod("years");
    setResult(null);
    setComparison(null);
    setShowEvolution(false);
    setErrors({});
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercentage = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2 }).format(
      value / 100
    );

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border-primary bg-surface-light px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
            <BreadcrumbItem isLast>Juros Compostos</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - S-Tier Visual Hierarchy */}
      <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-finance-gold/10 via-transparent to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
              <span className="mr-2">📈</span>
              Simulador Avançado com Visualizações Interativas
            </div>
            
            <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Calculadora de
              <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
                Juros Compostos
              </span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-text-secondary-dark sm:text-lg">
              Simule investimentos com <strong className="text-finance-gold-dark">aportes mensais</strong> e descubra o{" "}
              <strong className="text-system-success">poder dos juros compostos</strong>. Visualize
              gráficos e tabelas detalhadas da evolução do seu patrimônio.
            </p>
            
            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-system-success"></div>
                <span className="font-medium">Visualizações Avançadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-finance-gold"></div>
                <span className="font-medium">Aportes Mensais</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-blue"></div>
                <span className="font-medium">Resultados Instantâneos</span>
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

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-finance-gold/10 to-finance-gold/5">
                <CardTitle as="h2" className="text-finance-gold-dark">💰 Parâmetros do Investimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Investment Inputs */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <MoneyInput
                    label="Valor Inicial"
                    value={principal}
                    onChange={(value) => setPrincipal(value)}
                    placeholder="1.000,00"
                    min="0.01"
                    fullWidth
                    className="h-14 text-lg"
                  />

                  <MoneyInput
                    label="Aporte Mensal"
                    value={monthlyContribution}
                    onChange={(value) => setMonthlyContribution(value)}
                    placeholder="500,00"
                    min="0"
                    fullWidth
                    className="h-14 text-lg"
                  />
                </div>

                {/* Rate and Period Inputs */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <RateInput
                    label="Taxa de Juros (%)"
                    value={interestRate}
                    onChange={(value) => setInterestRate(value)}
                    placeholder="12,00"
                    required
                    fullWidth
                    className="h-14 text-lg"
                  />
                  
                  <Select
                    label="Período da Taxa"
                    value={interestPeriod}
                    onChange={(value) => setInterestPeriod(value as "monthly" | "annual")}
                    options={[
                      { value: "annual", label: "Ao ano" },
                      { value: "monthly", label: "Ao mês" },
                    ]}
                    fullWidth
                    className="h-14"
                  />

                  <Input
                    type="number"
                    label="Período de Investimento"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Ex: 10"
                    min="0"
                  step={timePeriod === "years" ? "0.1" : "1"}
                  required
                  fullWidth
                />
                <Select
                  label="Unidade"
                  value={timePeriod}
                  onChange={(value) => setTimePeriod(value as "months" | "years")}
                  options={[
                    { value: "years", label: "Anos" },
                    { value: "months", label: "Meses" },
                  ]}
                  fullWidth
                />
              </div>

            {/* Action Buttons - Prominent S-Tier Design */}
            <div className="mt-8 space-y-4">
              <Button 
                onClick={handleCalculate} 
                className="h-14 px-12 text-lg font-semibold bg-finance-gold hover:bg-finance-gold-dark text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
                fullWidth
              >
                📊 Calcular Juros Compostos
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
          </CardContent>
        </Card>

        {result && (
          <>
            {/* Hero Result Card - S-Tier Prominence */}
            <Card className="border-4 border-finance-gold bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full bg-finance-gold/20 px-4 py-2 text-sm font-medium text-finance-gold-dark">
                      💰 Valor Final do Investimento
                    </span>
                  </div>
                  <div className="text-5xl font-bold text-finance-gold-dark mb-2">
                    {formatCurrency(result.finalAmount)}
                  </div>
                  <p className="text-lg text-text-secondary">
                    Após {time}{" "}
                    {timePeriod === "years"
                      ? parseFloat(time) === 1
                        ? "ano"
                        : "anos"
                      : parseFloat(time) === 1
                        ? "mês"
                        : "meses"}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-system-success/10 border border-system-success/20">
                      <div className="text-2xl font-bold text-system-success">
                        {formatCurrency(result.totalInterest)}
                      </div>
                      <p className="text-sm text-text-secondary mt-1">Juros Ganhos</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary-blue/10 border border-primary-blue/20">
                      <div className="text-2xl font-bold text-primary-blue-dark">
                        {formatPercentage((result.totalInterest / result.totalContributions) * 100)}
                      </div>
                      <p className="text-sm text-text-secondary mt-1">Rentabilidade</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-growth-green">
                    💰 Valor Final
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-growth-green sm:text-3xl">
                      {formatCurrency(result.finalAmount)}
                    </div>
                    <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                      Após {time}{" "}
                      {timePeriod === "years"
                        ? parseFloat(time) === 1
                          ? "ano"
                          : "anos"
                        : parseFloat(time) === 1
                          ? "mês"
                          : "meses"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-primary-blue-dark">
                    🏦 Total Investido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-primary-blue-dark sm:text-3xl">
                      {formatCurrency(result.totalContributions)}
                    </div>
                    <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                      Valor inicial + aportes
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-system-success bg-system-success/10 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-system-success">
                    📈 Juros Ganhos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-system-success sm:text-3xl">
                      {formatCurrency(result.totalInterest)}
                    </div>
                    <p className="mt-2 text-xs text-text-secondary sm:text-sm">
                      {formatPercentage((result.totalInterest / result.totalContributions) * 100)}{" "}
                      do investido
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {comparison && (
              <Card className="border-2 border-system-warning bg-system-warning/10 duration-300">
                <CardHeader>
                  <CardTitle as="h3" className="text-system-warning">
                    ⚖️ Juros Compostos vs Simples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-text-secondary sm:text-sm">Juros Simples</p>
                      <p className="text-lg font-bold tabular-nums text-primary-blue-dark sm:text-xl">
                        {formatCurrency(comparison.simple)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary sm:text-sm">Juros Compostos</p>
                      <p className="text-lg font-bold tabular-nums text-growth-green sm:text-xl">
                        {formatCurrency(comparison.compound)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary sm:text-sm">Vantagem</p>
                      <p className="text-lg font-bold tabular-nums text-system-warning sm:text-xl">
                        {formatCurrency(comparison.difference)}
                      </p>
                      <p className="text-xs text-system-warning">
                        (+{comparison.percentageDifference.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle as="h3">📈 Gráfico de Crescimento</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={result.monthlyEvolution
                    .filter(
                      (_, index) =>
                        index % 12 === 11 || index === result.monthlyEvolution.length - 1
                    )
                    .map((evolution) => ({
                      label: `Ano ${Math.ceil(evolution.month / 12)}`,
                      value: evolution.balance,
                    }))}
                  width={800}
                  height={400}
                  className="mb-6"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-primary-blue-dark">
                      📊 Composição Final
                    </h4>
                    <BarChart
                      data={[
                        {
                          label: "Capital Inicial",
                          value: parseFloat(principal) || 0,
                          color: "rgb(59, 130, 246)",
                        },
                        {
                          label: "Aportes",
                          value: result.totalContributions - (parseFloat(principal) || 0),
                          color: "rgb(16, 185, 129)",
                        },
                        { label: "Juros", value: result.totalInterest, color: "rgb(34, 197, 94)" },
                      ]}
                      width={350}
                      height={250}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-growth-green">💡 Insights do Investimento</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between rounded bg-primary-blue-light p-3">
                        <span>Rendimento anual médio:</span>
                        <span className="font-bold text-primary-blue-dark">
                          {formatPercentage(
                            Math.pow(
                              result.finalAmount / result.totalContributions,
                              1 /
                                (timePeriod === "years" ? parseFloat(time) : parseFloat(time) / 12)
                            ) - 1
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-growth-green-soft p-3">
                        <span>Multiplicador do investimento:</span>
                        <span className="font-bold text-growth-green">
                          {(result.finalAmount / result.totalContributions).toFixed(2)}x
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-system-success/10 p-3">
                        <span>Tempo para dobrar:</span>
                        <span className="font-bold text-system-success">
                          {(() => {
                            const effectiveAnnualRate =
                              interestPeriod === "annual"
                                ? parseFloat(interestRate)
                                : parseFloat(interestRate) * 12;
                            return (70 / effectiveAnnualRate).toFixed(1);
                          })()}{" "}
                          anos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h3" className="flex items-center justify-between">
                  📊 Evolução Detalhada
                  <Button
                    onClick={() => setShowEvolution(!showEvolution)}
                    variant="outline"
                    className="text-sm"
                  >
                    {showEvolution ? "Ocultar" : "Mostrar"} Tabela
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showEvolution && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-neutral-surface-variant">
                          <th className="p-2 text-left">Ano</th>
                          <th className="p-2 text-right">Saldo</th>
                          <th className="p-2 text-right">Aportes</th>
                          <th className="p-2 text-right">Juros do Ano</th>
                          <th className="p-2 text-right">Total Investido</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.monthlyEvolution
                          .filter(
                            (_, index) =>
                              index % 12 === 11 || index === result.monthlyEvolution.length - 1
                          )
                          .map((evolution, index) => (
                            <tr key={index} className="border-b border-neutral-surface-variant">
                              <td className="p-2 font-medium">{Math.ceil(evolution.month / 12)}</td>
                              <td className="p-2 text-right font-medium tabular-nums text-growth-green">
                                {formatCurrency(evolution.balance)}
                              </td>
                              <td className="p-2 text-right tabular-nums">
                                {formatCurrency(evolution.contribution)}
                              </td>
                              <td className="p-2 text-right tabular-nums text-system-success">
                                {formatCurrency(
                                  result.monthlyEvolution
                                    .slice(Math.max(0, index * 12), (index + 1) * 12)
                                    .reduce((sum, month) => sum + month.interest, 0)
                                )}
                              </td>
                              <td className="p-2 text-right tabular-nums text-primary-blue-dark">
                                {formatCurrency(evolution.totalContributions)}
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

        {/* Seção: O que são Juros Compostos - SEO Principal */}
        <Card className="border-l-4 border-growth-green bg-gradient-to-r from-growth-green-soft to-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
              📈 O que são Juros Compostos? A 8ª Maravilha do Mundo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-text-primary">
              <div className="text-lg leading-relaxed">
                <p>
                  <strong className="text-growth-green">Juros compostos</strong> são os juros
                  calculados sobre o capital inicial
                  <strong className="text-primary-blue-dark">
                    {" "}
                    mais todos os juros acumulados
                  </strong>{" "}
                  dos períodos anteriores. É o famoso <em>"juros sobre juros"</em> que fez Albert
                  Einstein supostamente chamar de "a 8ª maravilha do mundo".
                </p>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">
                  🔢 Fórmula dos Juros Compostos
                </h3>
                <div className="rounded-lg border border-growth-green/30 bg-growth-green-soft p-4">
                  <div className="text-center">
                    <p className="mb-2 font-mono text-2xl font-bold text-growth-green">
                      M = C × (1 + i)^t
                    </p>
                    <div className="space-y-1 text-sm text-text-secondary">
                      <p>
                        <strong>M</strong> = Montante final (valor futuro)
                      </p>
                      <p>
                        <strong>C</strong> = Capital inicial (valor presente)
                      </p>
                      <p>
                        <strong>i</strong> = Taxa de juros por período (em decimal)
                      </p>
                      <p>
                        <strong>t</strong> = Número de períodos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-primary-blue/20 bg-primary-blue-light p-6">
                  <h4 className="mb-3 text-lg font-bold text-primary-blue-dark">
                    💰 Exemplo Prático
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Situação:</strong> R$ 1.000 investidos a 10% ao ano por 10 anos
                    </p>
                    <div className="space-y-2">
                      <p>
                        <strong className="text-growth-green">Juros Compostos:</strong>
                      </p>
                      <p className="ml-4">M = 1.000 × (1 + 0,10)^10</p>
                      <p className="ml-4">
                        M = 1.000 × 2,594 = <strong className="text-growth-green">R$ 2.594</strong>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <strong className="text-primary-blue-dark">Juros Simples:</strong>
                      </p>
                      <p className="ml-4">M = 1.000 + (1.000 × 0,10 × 10)</p>
                      <p className="ml-4">
                        M = 1.000 + 1.000 ={" "}
                        <strong className="text-primary-blue-dark">R$ 2.000</strong>
                      </p>
                    </div>
                    <div className="border-t border-system-warning/30 pt-2">
                      <p className="font-bold text-system-warning">
                        Diferença: R$ 594 (29,7% a mais!)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-system-success/20 bg-system-success/10 p-6">
                  <h4 className="mb-3 text-lg font-bold text-system-success">
                    🚀 O Poder do Tempo
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Mesmo investimento (R$ 1.000 a 10% ao ano):</strong>
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>5 anos:</span>
                        <span className="font-bold">R$ 1.611</span>
                      </div>
                      <div className="flex justify-between">
                        <span>10 anos:</span>
                        <span className="font-bold">R$ 2.594</span>
                      </div>
                      <div className="flex justify-between">
                        <span>20 anos:</span>
                        <span className="font-bold text-growth-green">R$ 6.728</span>
                      </div>
                      <div className="flex justify-between">
                        <span>30 anos:</span>
                        <span className="font-bold text-system-success">R$ 17.449</span>
                      </div>
                    </div>
                    <div className="border-t border-growth-green/30 pt-2">
                      <p className="text-center font-bold text-growth-green">
                        Crescimento Exponencial!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Como Funcionam na Prática */}
        <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🏦 Como os Juros Compostos Funcionam na Prática
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-text-primary">
                <p className="mb-4 text-lg">
                  Os juros compostos são aplicados em praticamente{" "}
                  <strong className="text-system-info">todos os investimentos modernos</strong>e
                  também nas dívidas. Entender como funcionam é essencial para sua saúde financeira.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 flex items-center text-lg font-bold text-growth-green">
                    📊 Investimentos com Juros Compostos
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">🏛️ Tesouro Direto</h4>
                      <p className="text-sm text-text-secondary">
                        Os títulos do governo pagam juros que são automaticamente reinvestidos,
                        gerando juros sobre juros ao longo do tempo.
                      </p>
                    </div>
                    <div className="rounded-lg bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">🏦 CDB e LCI/LCA</h4>
                      <p className="text-sm text-text-secondary">
                        Certificados de Depósito Bancário e Letras de Crédito aplicam juros
                        compostos mensalmente sobre o valor investido.
                      </p>
                    </div>
                    <div className="rounded-lg bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">
                        💰 Fundos de Investimento
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Os rendimentos são reinvestidos automaticamente, comprando mais cotas e
                        aumentando exponencialmente seu patrimônio.
                      </p>
                    </div>
                    <div className="rounded-lg bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">
                        📈 Ações (Dividendos)
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Quando você reinveste os dividendos comprando mais ações, cria um efeito de
                        juros compostos no longo prazo.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center text-lg font-bold text-system-warning">
                    ⚠️ Dívidas com Juros Compostos
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">
                        💳 Cartão de Crédito
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Juros sobre juros fazem a dívida crescer exponencialmente.
                        <strong className="text-system-error-dark">
                          {" "}
                          Taxa média: 300% ao ano!
                        </strong>
                      </p>
                    </div>
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">🏦 Cheque Especial</h4>
                      <p className="text-sm text-text-secondary">
                        Uma das modalidades mais caras, com juros compostos diários.
                        <strong className="text-system-error-dark">Evite a todo custo!</strong>
                      </p>
                    </div>
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">
                        🏠 Financiamento Imobiliário
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Sistema SAC e PRICE aplicam juros compostos mensalmente. Amortizações extras
                        reduzem significativamente o total pago.
                      </p>
                    </div>
                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">💡 Dica de Ouro</h4>
                      <p className="text-sm text-text-secondary">
                        <strong>Quite dívidas caras primeiro!</strong> É melhor quitar um cartão de
                        crédito do que investir na poupança. O "rendimento" é maior!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Estratégias Práticas */}
        <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🎯 Estratégias para Maximizar o Poder dos Juros Compostos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-bold text-growth-green">
                  🚀 Para Multiplicar seu Dinheiro
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-growth-green/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      1. ⏰ Comece o Quanto Antes
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Tempo é seu maior aliado.</strong> Quem investe R$ 200/mês dos 25 aos
                      35 anos (10 anos) pode ter mais dinheiro aos 65 do que quem investe dos 35 aos
                      65 anos (30 anos).
                    </p>
                  </div>
                  <div className="rounded-lg border border-growth-green/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      2. 🔄 Aportes Regulares
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Consistência vence valor.</strong> É melhor investir R$ 100 todo mês
                      do que R$ 1.200 uma vez por ano. Os aportes regulares maximizam o tempo de
                      cada real investido.
                    </p>
                  </div>
                  <div className="rounded-lg border border-growth-green/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      3. 🎯 Foque no Longo Prazo
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Paciência é fundamental.</strong> Os juros compostos são mais
                      poderosos quanto maior o prazo. Pense em décadas, não em meses.
                    </p>
                  </div>
                  <div className="rounded-lg border border-growth-green/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      4. 📊 Reinvista os Rendimentos
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Nunca retire os juros.</strong> Deixe que trabalhem para você. É assim
                      que funciona a mágica dos juros sobre juros.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-primary-blue-dark">
                  💡 Dicas Práticas e Avançadas
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-primary-blue/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      5. 🤖 Automatize Tudo
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Configure débito automático para seus investimentos.
                      <strong>Automatizar elimina a tentação</strong> de gastar o dinheiro com
                      outras coisas.
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      6. 📈 Aumente os Aportes
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Sempre que receber aumento, promoção ou 13º salário,
                      <strong>aumente proporcionalmente seus investimentos</strong> para acelerar o
                      crescimento.
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      7. 🎚️ Busque Melhores Taxas
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>1% de diferença na taxa</strong> pode significar dezenas de milhares
                      de reais a mais no longo prazo. Compare sempre as opções.
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      8. 🛡️ Proteja-se da Inflação
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Invista em ativos que rendam <strong>acima da inflação</strong>
                      (IPCA+ no Tesouro, fundos imobiliários, ações) para manter o poder de compra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Juros Compostos"
          items={[
            {
              question: "Qual a diferença entre juros compostos e juros simples?",
              answer:
                "<strong>Juros simples:</strong> calculados apenas sobre o capital inicial. <strong>Juros compostos:</strong> calculados sobre capital inicial + juros acumulados. Exemplo: R$ 1.000 a 10% por 10 anos - Simples: R$ 2.000 | <strong>Compostos: R$ 2.594 (29,7% mais!)</strong>",
              borderColor: "growth-green",
            },
            {
              question: "Como calcular juros compostos manualmente?",
              answer:
                "Use a fórmula: <strong>M = C × (1 + i)^t</strong>. Exemplo: R$ 5.000 a 8% ao ano por 5 anos = 5.000 × (1,08)^5 = <strong>R$ 7.346</strong>. Nossa calculadora faz isso automaticamente com precisão total!",
              borderColor: "primary-blue",
            },
            {
              question: "Quanto tempo para dobrar o dinheiro com juros compostos?",
              answer:
                "Use a <strong>Regra dos 72:</strong> divida 72 pela taxa anual. <strong>8% = 9 anos | 10% = 7,2 anos | 12% = 6 anos | 15% = 4,8 anos</strong>. Quanto maior a taxa, mais rápido seu dinheiro dobra exponencialmente!",
              borderColor: "system-info",
            },
            {
              question: "Quais investimentos brasileiros usam juros compostos?",
              answer:
                "<strong>Praticamente todos:</strong> Tesouro Direto, CDB, LCI/LCA, Fundos, Poupança, Previdência. Até <strong>ações com dividendos reinvestidos</strong> criam efeito composto. Apenas alguns empréstimos comerciais usam juros simples.",
              borderColor: "system-success",
            },
            {
              question: "É melhor investir tudo de uma vez ou aportes mensais?",
              answer:
                "<strong>Matematicamente:</strong> investir tudo de uma vez é melhor (mais tempo para composição). <strong>Na prática:</strong> aportes mensais são mais seguros e disciplinados. <strong>Ideal: quantia inicial + aportes regulares!</strong>",
              borderColor: "growth-green",
            },
            {
              question: "Como a inflação afeta os juros compostos?",
              answer:
                "A inflação corrói o <strong>poder de compra real</strong>. Se você ganha 10% ao ano mas a inflação é 4%, seu ganho real é ~6%. Sempre invista em ativos que rendem <strong>acima da inflação</strong> (IPCA+, FIIs, ações)!",
              borderColor: "system-warning",
            },
            {
              question: "Por que começar cedo é tão importante?",
              answer:
                "<strong>Tempo é o maior aliado!</strong> Exemplo clássico: João investe R$ 200/mês dos 25-35 anos (R$ 24k total). Maria investe dos 35-65 anos (R$ 72k total). Aos 65 anos, <strong>João terá mais dinheiro que Maria!</strong> 🤯",
              borderColor: "primary-blue",
            },
            {
              question: "Como maximizar o poder dos juros compostos?",
              answer:
                "<strong>7 estratégias:</strong> 1) Comece hoje, 2) Aportes regulares automáticos, 3) Reinvista todos os rendimentos, 4) Aumente aportes com promoções, 5) Busque melhores taxas, 6) Foque no longo prazo, 7) Proteja-se da inflação. <strong>Disciplina vence timing!</strong>",
              borderColor: "system-success",
            },
          ]}
          tipSection={{
            title: "Dica Matemática Poderosa",
            content:
              "Para <strong>acelerar drasticamente</strong> seus juros compostos, use a regra 1% = 70 anos. Cada 1% a mais na taxa reduz ~7 anos no tempo para dobrar! Por isso vale tanto a pena buscar melhores investimentos.",
          }}
          footerText="<strong>Pronto para ver a mágica?</strong> Use nossa calculadora para simular diferentes cenários e descobrir o poder transformador dos juros compostos!"
        />

        {/* Footer */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Sobre Esta Calculadora de Juros Compostos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta{" "}
                <strong className="text-primary-blue-dark">
                  calculadora avançada de juros compostos
                </strong>{" "}
                é<strong className="text-growth-green"> 100% gratuita</strong> e permite simular
                investimentos com aportes mensais regulares, mostrando o crescimento exponencial do
                seu patrimônio ao longo do tempo.
              </p>
              <p>
                <strong>Recursos inclusos:</strong> Gráficos interativos, tabelas detalhadas,
                comparação com juros simples, cálculo de rentabilidade real, e muito mais. Ideal
                para planejamento de aposentadoria e educação financeira.
              </p>
              <p>
                <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para
                fins educacionais e de planejamento. Para decisões financeiras importantes, consulte
                sempre um
                <strong> planejador financeiro certificado</strong> ou{" "}
                <strong>consultor de investimentos</strong>.
              </p>
              <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                ⚖️ Cálculos baseados em fórmulas matemáticas padronizadas • 🎓 Ferramenta
                educacional gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos
                os dispositivos • 🌙 Modo escuro disponível • 📊 Gráficos SVG nativos para melhor
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
              name: "Calculadora de Juros Compostos",
              description:
                "Calculadora online gratuita para simular investimentos com juros compostos e aportes mensais. Visualize o crescimento exponencial do seu patrimônio.",
              url: "https://calculadorasonline.com.br/calculadoras/financas/juros-compostos",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
              featureList: [
                "Cálculo de juros compostos",
                "Simulação com aportes mensais",
                "Gráficos interativos",
                "Comparação com juros simples",
                "Tabelas detalhadas",
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

        <RelatedCalculators category="financas" currentCalculatorId="juros-compostos" />
          </div>
        </div>
      </div>
    </div>
  );
}
