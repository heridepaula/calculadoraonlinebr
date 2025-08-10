import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem, LineChart, BarChart, Select } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";
import { 
  calculateAdvancedCompoundInterest, 
  compareWithSimpleInterest,
  type CompoundInterestParams,
  type CompoundInterestResult 
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
      content: "calculadora juros compostos, juros sobre juros, aportes mensais, investimento longo prazo, simulador financeiro, crescimento exponencial, planejamento aposentadoria, como calcular juros compostos, fórmula juros compostos, CDI, tesouro direto, fundos investimento, poupança programada, educação financeira, multiplicação dinheiro, regra dos 72, taxa real de juros, inflação investimentos",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    
    // Open Graph tags
    { property: "og:title", content: `Calculadora de Juros Compostos Completa 2025 - ${APP_NAME}` },
    { property: "og:description", content: "★ Simule investimentos com juros compostos e aportes mensais. Veja como seu dinheiro pode crescer exponencialmente com gráficos e tabelas detalhadas. 100% gratuito!" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadoraonline.com.br/calculadora/financas/juros-compostos" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Juros Compostos com Aportes - ${APP_NAME}` },
    { name: "twitter:description", content: "Descubra o poder dos juros compostos! Simule investimentos, visualize gráficos de crescimento e planeje sua aposentadoria." },
    
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
  const [interestPeriod, setInterestPeriod] = useState<'monthly' | 'annual'>('annual');
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState<'months' | 'years'>('years');
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  const [comparison, setComparison] = useState<any>(null);
  const [showEvolution, setShowEvolution] = useState(false);

  const handleCalculate = () => {
    const principalNum = parseFloat(principal) || 0;
    const monthlyContributionNum = parseFloat(monthlyContribution) || 0;
    const interestRateNum = parseFloat(interestRate) || 0;
    const timeNum = parseFloat(time) || 0;

    if ((principalNum > 0 || monthlyContributionNum > 0) && interestRateNum > 0 && timeNum > 0) {
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
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setMonthlyContribution("");
    setInterestRate("");
    setTime("");
    setInterestPeriod('annual');
    setTimePeriod('years');
    setResult(null);
    setComparison(null);
    setShowEvolution(false);
  };

  useEffect(() => {
    if (principal && interestRate && time) {
      handleCalculate();
    }
  }, [principal, monthlyContribution, interestRate, interestPeriod, time, timePeriod]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatPercentage = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Juros Compostos</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Juros Compostos Avançada
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-4xl mx-auto">
          Simule investimentos com <strong className="text-primary-blue-dark">aportes mensais</strong> e 
          descubra o <strong className="text-growth-green">poder dos juros compostos</strong>. 
          Visualize gráficos e tabelas detalhadas da evolução do seu investimento.
        </p>
        <div className="bg-growth-green-soft rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            📊 <strong>Visualizações avançadas</strong> • 📈 <strong>Aportes mensais</strong> • ⏰ <strong>Resultados instantâneos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Parâmetros do Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Input
              type="number"
              label="Valor Inicial (R$)"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Ex: 1000"
              min="0"
              step="0.01"
              fullWidth
            />

            <Input
              type="number"
              label="Aporte Mensal (R$)"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="Ex: 500"
              min="0"
              step="0.01"
              fullWidth
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                label="Taxa de Juros (%)"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Ex: 10"
                min="0"
                step="0.01"
                required
                fullWidth
              />
              <Select
                label="Período"
                value={interestPeriod}
                onChange={(value) => setInterestPeriod(value as 'monthly' | 'annual')}
                options={[
                  { value: 'annual', label: 'Ao ano' },
                  { value: 'monthly', label: 'Ao mês' },
                ]}
                fullWidth
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-1">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                label="Período de Investimento"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: 10"
                min="0"
                step={timePeriod === 'years' ? '0.1' : '1'}
                required
                fullWidth
              />
              <Select
                label="Unidade"
                value={timePeriod}
                onChange={(value) => setTimePeriod(value as 'months' | 'years')}
                options={[
                  { value: 'years', label: 'Anos' },
                  { value: 'months', label: 'Meses' },
                ]}
                fullWidth
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular Investimento
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="px-8 border-system-error text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  💰 Valor Final
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-growth-green tabular-nums">
                    {formatCurrency(result.finalAmount)}
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
                    Após {time} {timePeriod === 'years' ? (parseFloat(time) === 1 ? 'ano' : 'anos') : (parseFloat(time) === 1 ? 'mês' : 'meses')}
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
                  <div className="text-3xl font-bold text-primary-blue-dark tabular-nums">
                    {formatCurrency(result.totalContributions)}
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
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
                  <div className="text-3xl font-bold text-system-success tabular-nums">
                    {formatCurrency(result.totalInterest)}
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
                    {formatPercentage((result.totalInterest / result.totalContributions) * 100)} do investido
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-text-secondary">Juros Simples</p>
                    <p className="text-xl font-bold text-primary-blue-dark tabular-nums">
                      {formatCurrency(comparison.simple)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Juros Compostos</p>
                    <p className="text-xl font-bold text-growth-green tabular-nums">
                      {formatCurrency(comparison.compound)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Vantagem</p>
                    <p className="text-xl font-bold text-system-warning tabular-nums">
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
                  .filter((_, index) => index % 12 === 11 || index === result.monthlyEvolution.length - 1)
                  .map(evolution => ({
                    label: `Ano ${Math.ceil(evolution.month / 12)}`,
                    value: evolution.balance,
                  }))}
                width={800}
                height={400}
                className="mb-6"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary-blue-dark">📊 Composição Final</h4>
                  <BarChart
                    data={[
                      { label: 'Capital Inicial', value: parseFloat(principal) || 0, color: 'rgb(59, 130, 246)' },
                      { label: 'Aportes', value: result.totalContributions - (parseFloat(principal) || 0), color: 'rgb(16, 185, 129)' },
                      { label: 'Juros', value: result.totalInterest, color: 'rgb(34, 197, 94)' },
                    ]}
                    width={350}
                    height={250}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-growth-green">💡 Insights do Investimento</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-primary-blue-light rounded">
                      <span>Rendimento anual médio:</span>
                      <span className="font-bold text-primary-blue-dark">
                        {formatPercentage(Math.pow(result.finalAmount / result.totalContributions, 1 / (timePeriod === 'years' ? parseFloat(time) : parseFloat(time) / 12)) - 1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-growth-green-soft rounded">
                      <span>Multiplicador do investimento:</span>
                      <span className="font-bold text-growth-green">
                        {(result.finalAmount / result.totalContributions).toFixed(2)}x
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-system-success/10 rounded">
                      <span>Tempo para dobrar:</span>
                      <span className="font-bold text-system-success">
                        {(() => {
                          const effectiveAnnualRate = interestPeriod === 'annual' ? parseFloat(interestRate) : parseFloat(interestRate) * 12;
                          return (70 / effectiveAnnualRate).toFixed(1);
                        })()} anos
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
                  {showEvolution ? 'Ocultar' : 'Mostrar'} Tabela
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showEvolution && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant">
                        <th className="text-left p-2">Ano</th>
                        <th className="text-right p-2">Saldo</th>
                        <th className="text-right p-2">Aportes</th>
                        <th className="text-right p-2">Juros do Ano</th>
                        <th className="text-right p-2">Total Investido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyEvolution
                        .filter((_, index) => index % 12 === 11 || index === result.monthlyEvolution.length - 1)
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
      <Card className="bg-gradient-to-r from-growth-green-soft to-primary-blue-light border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📈 O que são Juros Compostos? A 8ª Maravilha do Mundo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                <strong className="text-growth-green">Juros compostos</strong> são os juros calculados sobre o capital inicial 
                <strong className="text-primary-blue-dark"> mais todos os juros acumulados</strong> dos períodos anteriores. 
                É o famoso <em>"juros sobre juros"</em> que fez Albert Einstein supostamente chamar de "a 8ª maravilha do mundo".
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-growth-green/20">
              <h3 className="text-xl font-bold text-growth-green mb-4">🔢 Fórmula dos Juros Compostos</h3>
              <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/30">
                <div className="text-center">
                  <p className="text-2xl font-mono font-bold text-growth-green mb-2">
                    M = C × (1 + i)^t
                  </p>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p><strong>M</strong> = Montante final (valor futuro)</p>
                    <p><strong>C</strong> = Capital inicial (valor presente)</p>
                    <p><strong>i</strong> = Taxa de juros por período (em decimal)</p>
                    <p><strong>t</strong> = Número de períodos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-blue-light p-6 rounded-xl border border-primary-blue/20">
                <h4 className="text-lg font-bold text-primary-blue-dark mb-3">💰 Exemplo Prático</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Situação:</strong> R$ 1.000 investidos a 10% ao ano por 10 anos</p>
                  <div className="space-y-2">
                    <p><strong className="text-growth-green">Juros Compostos:</strong></p>
                    <p className="ml-4">M = 1.000 × (1 + 0,10)^10</p>
                    <p className="ml-4">M = 1.000 × 2,594 = <strong className="text-growth-green">R$ 2.594</strong></p>
                  </div>
                  <div className="space-y-2">
                    <p><strong className="text-primary-blue-dark">Juros Simples:</strong></p>
                    <p className="ml-4">M = 1.000 + (1.000 × 0,10 × 10)</p>
                    <p className="ml-4">M = 1.000 + 1.000 = <strong className="text-primary-blue-dark">R$ 2.000</strong></p>
                  </div>
                  <div className="pt-2 border-t border-system-warning/30">
                    <p className="font-bold text-system-warning">
                      Diferença: R$ 594 (29,7% a mais!)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-system-success/10 p-6 rounded-xl border border-system-success/20">
                <h4 className="text-lg font-bold text-system-success mb-3">🚀 O Poder do Tempo</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Mesmo investimento (R$ 1.000 a 10% ao ano):</strong></p>
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
                  <div className="pt-2 border-t border-growth-green/30">
                    <p className="font-bold text-growth-green text-center">
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
      <Card className="bg-background-dark-secondary border-l-4 border-system-info duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🏦 Como os Juros Compostos Funcionam na Prática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-primary">
              <p className="text-lg mb-4">
                Os juros compostos são aplicados em praticamente <strong className="text-system-info">todos os investimentos modernos</strong> 
                e também nas dívidas. Entender como funcionam é essencial para sua saúde financeira.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-growth-green mb-4 flex items-center">
                  📊 Investimentos com Juros Compostos
                </h3>
                <div className="space-y-4">
                  <div className="bg-growth-green-soft p-4 rounded-lg">
                    <h4 className="font-semibold text-growth-green mb-2">🏛️ Tesouro Direto</h4>
                    <p className="text-sm text-text-secondary">
                      Os títulos do governo pagam juros que são automaticamente reinvestidos, 
                      gerando juros sobre juros ao longo do tempo.
                    </p>
                  </div>
                  <div className="bg-growth-green-soft p-4 rounded-lg">
                    <h4 className="font-semibold text-growth-green mb-2">🏦 CDB e LCI/LCA</h4>
                    <p className="text-sm text-text-secondary">
                      Certificados de Depósito Bancário e Letras de Crédito aplicam juros compostos 
                      mensalmente sobre o valor investido.
                    </p>
                  </div>
                  <div className="bg-growth-green-soft p-4 rounded-lg">
                    <h4 className="font-semibold text-growth-green mb-2">💰 Fundos de Investimento</h4>
                    <p className="text-sm text-text-secondary">
                      Os rendimentos são reinvestidos automaticamente, comprando mais cotas 
                      e aumentando exponencialmente seu patrimônio.
                    </p>
                  </div>
                  <div className="bg-growth-green-soft p-4 rounded-lg">
                    <h4 className="font-semibold text-growth-green mb-2">📈 Ações (Dividendos)</h4>
                    <p className="text-sm text-text-secondary">
                      Quando você reinveste os dividendos comprando mais ações, 
                      cria um efeito de juros compostos no longo prazo.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-system-warning mb-4 flex items-center">
                  ⚠️ Dívidas com Juros Compostos
                </h3>
                <div className="space-y-4">
                  <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                    <h4 className="font-semibold text-system-warning mb-2">💳 Cartão de Crédito</h4>
                    <p className="text-sm text-text-secondary">
                      Juros sobre juros fazem a dívida crescer exponencialmente. 
                      <strong className="text-system-error-dark"> Taxa média: 300% ao ano!</strong>
                    </p>
                  </div>
                  <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                    <h4 className="font-semibold text-system-warning mb-2">🏦 Cheque Especial</h4>
                    <p className="text-sm text-text-secondary">
                      Uma das modalidades mais caras, com juros compostos diários. 
                      <strong className="text-system-error-dark">Evite a todo custo!</strong>
                    </p>
                  </div>
                  <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                    <h4 className="font-semibold text-system-warning mb-2">🏠 Financiamento Imobiliário</h4>
                    <p className="text-sm text-text-secondary">
                      Sistema SAC e PRICE aplicam juros compostos mensalmente. 
                      Amortizações extras reduzem significativamente o total pago.
                    </p>
                  </div>
                  <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                    <h4 className="font-semibold text-system-success mb-2">💡 Dica de Ouro</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Quite dívidas caras primeiro!</strong> É melhor quitar um cartão de crédito 
                      do que investir na poupança. O "rendimento" é maior!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Estratégias Práticas */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🎯 Estratégias para Maximizar o Poder dos Juros Compostos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-growth-green mb-4">🚀 Para Multiplicar seu Dinheiro</h3>
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-growth-green/20">
                  <h4 className="font-semibold text-growth-green mb-2">1. ⏰ Comece o Quanto Antes</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Tempo é seu maior aliado.</strong> Quem investe R$ 200/mês dos 25 aos 35 anos (10 anos) 
                    pode ter mais dinheiro aos 65 do que quem investe dos 35 aos 65 anos (30 anos).
                  </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-growth-green/20">
                  <h4 className="font-semibold text-growth-green mb-2">2. 🔄 Aportes Regulares</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Consistência vence valor.</strong> É melhor investir R$ 100 todo mês 
                    do que R$ 1.200 uma vez por ano. Os aportes regulares maximizam o tempo de cada real investido.
                  </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-growth-green/20">
                  <h4 className="font-semibold text-growth-green mb-2">3. 🎯 Foque no Longo Prazo</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Paciência é fundamental.</strong> Os juros compostos são mais poderosos 
                    quanto maior o prazo. Pense em décadas, não em meses.
                  </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-growth-green/20">
                  <h4 className="font-semibold text-growth-green mb-2">4. 📊 Reinvista os Rendimentos</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Nunca retire os juros.</strong> Deixe que trabalhem para você. 
                    É assim que funciona a mágica dos juros sobre juros.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-primary-blue-dark mb-4">💡 Dicas Práticas e Avançadas</h3>
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-primary-blue/20">
                  <h4 className="font-semibold text-primary-blue-dark mb-2">5. 🤖 Automatize Tudo</h4>
                  <p className="text-sm text-text-secondary">
                    Configure débito automático para seus investimentos. 
                    <strong>Automatizar elimina a tentação</strong> de gastar o dinheiro com outras coisas.
                  </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-primary-blue/20">
                  <h4 className="font-semibold text-primary-blue-dark mb-2">6. 📈 Aumente os Aportes</h4>
                  <p className="text-sm text-text-secondary">
                    Sempre que receber aumento, promoção ou 13º salário, 
                    <strong>aumente proporcionalmente seus investimentos</strong> para acelerar o crescimento.
                  </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-primary-blue/20">
                  <h4 className="font-semibold text-primary-blue-dark mb-2">7. 🎚️ Busque Melhores Taxas</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>1% de diferença na taxa</strong> pode significar dezenas de milhares 
                    de reais a mais no longo prazo. Compare sempre as opções.
                  </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-primary-blue/20">
                  <h4 className="font-semibold text-primary-blue-dark mb-2">8. 🛡️ Proteja-se da Inflação</h4>
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

      {/* FAQ Section - SEO */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre Juros Compostos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                1. Qual a diferença entre juros compostos e juros simples?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong className="text-text-primary">Juros simples</strong> são calculados apenas sobre o capital inicial. 
                <strong className="text-growth-green"> Juros compostos</strong> são calculados sobre o capital inicial 
                MAIS todos os juros já acumulados, gerando o efeito "juros sobre juros".
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Exemplo:</strong> R$ 1.000 a 10% ao ano por 10 anos:<br/>
                  • Juros simples: R$ 2.000<br/>
                  • Juros compostos: R$ 2.594 (29,7% mais!)
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                2. Como calcular juros compostos manualmente?
              </h3>
              <p className="text-text-secondary mb-3">
                Use a fórmula: <strong className="font-mono bg-growth-green-soft px-2 py-1 rounded">M = C × (1 + i)^t</strong>
              </p>
              <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
                <p className="text-sm">
                  <strong>Exemplo prático:</strong><br/>
                  Capital: R$ 5.000 | Taxa: 8% ao ano | Tempo: 5 anos<br/>
                  M = 5.000 × (1 + 0,08)^5<br/>
                  M = 5.000 × 1,469 = <strong className="text-growth-green">R$ 7.346</strong>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                3. Quanto tempo leva para dobrar o dinheiro com juros compostos?
              </h3>
              <p className="text-text-secondary mb-3">
                Use a <strong className="text-primary-blue-dark">Regra dos 72</strong>: 
                divida 72 pela taxa de juros anual para descobrir em quantos anos seu dinheiro dobra.
              </p>
              <div className="bg-growth-green-soft p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>8% ao ano:</strong> 72 ÷ 8 = 9 anos</div>
                  <div><strong>10% ao ano:</strong> 72 ÷ 10 = 7,2 anos</div>
                  <div><strong>12% ao ano:</strong> 72 ÷ 12 = 6 anos</div>
                  <div><strong>15% ao ano:</strong> 72 ÷ 15 = 4,8 anos</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                4. Quais investimentos usam juros compostos no Brasil?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-growth-green-soft p-4 rounded-lg">
                  <h4 className="font-semibold text-growth-green mb-2">✅ Com Juros Compostos:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Tesouro Direto (IPCA+, Selic)</li>
                    <li>• CDB, LCI, LCA</li>
                    <li>• Fundos de Investimento</li>
                    <li>• Poupança</li>
                    <li>• Previdência Privada</li>
                    <li>• Ações (dividendos reinvestidos)</li>
                  </ul>
                </div>
                <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                  <h4 className="font-semibold text-system-warning mb-2">❌ Com Juros Simples:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Desconto de duplicatas</li>
                    <li>• Alguns empréstimos de curto prazo</li>
                    <li>• Operações comerciais específicas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                5. É melhor investir tudo de uma vez ou fazer aportes mensais?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong>Matematicamente</strong>, investir tudo de uma vez é melhor (mais tempo para os juros compostos agirem). 
                <strong className="text-primary-blue-dark"> Na prática</strong>, aportes mensais são mais seguros e criam disciplina.
              </p>
              <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                <h4 className="font-semibold text-system-success mb-2">💡 Estratégia Híbrida:</h4>
                <p className="text-sm text-text-secondary">
                  Invista uma quantia inicial maior + aportes mensais regulares. 
                  Assim você aproveita o tempo E cria o hábito de investir.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                6. Como a inflação afeta os juros compostos?
              </h3>
              <p className="text-text-secondary mb-3">
                A inflação corrói o <strong className="text-system-warning">poder de compra real</strong> 
                do seu dinheiro. Por isso, é importante investir em ativos que rendam acima da inflação.
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg">
                <div className="text-sm space-y-2">
                  <p><strong>Juros Nominais vs Reais:</strong></p>
                  <p>• Se seu investimento rende 10% ao ano e a inflação é 4%</p>
                  <p>• Seu <strong className="text-growth-green">ganho real</strong> é aproximadamente 6% ao ano</p>
                  <p>• Use sempre taxas reais para planejar o futuro!</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                7. Qual a importância de começar cedo?
              </h3>
              <p className="text-text-secondary mb-3">
                O <strong className="text-system-success">tempo é o maior aliado</strong> dos juros compostos. 
                Começar cedo, mesmo com valores menores, pode ser mais eficaz do que começar tarde com valores maiores.
              </p>
              <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                <div className="text-sm">
                  <p><strong>Exemplo clássico:</strong></p>
                  <p>• <strong className="text-growth-green">João</strong> investe R$ 200/mês dos 25 aos 35 anos (10 anos) = R$ 24.000 investidos</p>
                  <p>• <strong className="text-primary-blue-dark">Maria</strong> investe R$ 200/mês dos 35 aos 65 anos (30 anos) = R$ 72.000 investidos</p>
                  <p>• Aos 65 anos, <strong className="text-growth-green">João terá mais dinheiro que Maria!</strong></p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Calculadoras Relacionadas */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Outras Calculadoras Financeiras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
              <h3 className="font-bold text-growth-green mb-2 text-sm">
                🥇 Primeiro Milhão
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Descubra <strong>quando você chegará ao primeiro milhão</strong> com diferentes estratégias de investimento.
              </p>
              <a 
                href="/calculadora/financas/primeiro-milhao" 
                className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark inline-block"
              >
                Calcular →
              </a>
            </div>
            
            <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
              <h3 className="font-bold text-system-info mb-2 text-sm">
                📊 Calculadora de Porcentagem
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Calcule <strong>porcentagens, aumentos, descontos</strong> e variações percentuais rapidamente.
              </p>
              <a 
                href="/calculadora/matematica/porcentagem" 
                className="text-xs bg-system-info text-white px-2 py-1 rounded hover:bg-system-info-dark inline-block"
              >
                Usar →
              </a>
            </div>
            
            <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
              <h3 className="font-bold text-primary-blue-dark mb-2 text-sm">
                🏥 Calculadora de IMC
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Monitore sua <strong>saúde física</strong> enquanto cuida da saúde financeira.
              </p>
              <a 
                href="/calculadora/saude/imc" 
                className="text-xs bg-primary-blue text-white px-2 py-1 rounded hover:bg-primary-blue-dark inline-block"
              >
                Verificar →
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a 
              href="/calculadora" 
              className="inline-flex items-center text-primary-blue-dark hover text-sm"
            >
              🚀 Ver Todas as Calculadoras Gratuitas
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Juros Compostos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora avançada de juros compostos</strong> é 
              <strong className="text-growth-green"> 100% gratuita</strong> e permite simular investimentos 
              com aportes mensais regulares, mostrando o crescimento exponencial do seu patrimônio ao longo do tempo.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Gráficos interativos, tabelas detalhadas, comparação com juros simples, 
              cálculo de rentabilidade real, e muito mais. Ideal para planejamento de aposentadoria e educação financeira.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para fins 
              educacionais e de planejamento. Para decisões financeiras importantes, consulte sempre um 
              <strong> planejador financeiro certificado</strong> ou <strong>consultor de investimentos</strong>.
            </p>
            <p className="text-xs opacity-75 border-t border-primary-blue/20 pt-3 mt-4">
              ⚖️ Cálculos baseados em fórmulas matemáticas padronizadas • 🎓 Ferramenta educacional gratuita • 
              🔒 Seus dados não são armazenados • 📱 Responsivo para todos os dispositivos • 
              🌙 Modo escuro disponível • 📊 Gráficos SVG nativos para melhor performance
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
            description: "Calculadora online gratuita para simular investimentos com juros compostos e aportes mensais. Visualize o crescimento exponencial do seu patrimônio.",
            url: "https://calculadoraonline.com.br/calculadora/financas/juros-compostos",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL"
            },
            featureList: [
              "Cálculo de juros compostos",
              "Simulação com aportes mensais",
              "Gráficos interativos",
              "Comparação com juros simples",
              "Tabelas detalhadas",
              "100% gratuito"
            ],
            author: {
              "@type": "Organization",
              name: "Calculadora Online BR"
            },
            publisher: {
              "@type": "Organization",
              name: "Calculadora Online BR"
            }
          })
        }}
      />
    </div>
  );
}