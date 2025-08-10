import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem, Select } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";
import { calculateLCILCA } from "~/utils/calculations";
import type { LCILCAParams, LCILCAResult } from "~/utils/calculations";
import { getDefaultRate, getIndicatorInfo, isDataRecent, getDataFreshnessColor } from "~/lib/economic-data";

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
      content: "calculadora LCI, calculadora LCA, letra de crédito imobiliário, letra de crédito agronegócio, investimento LCI LCA, rendimento LCI LCA, carência LCI LCA, isenção imposto renda, CDI LCI LCA, comparar LCI CDB, simulador investimento, renda fixa brasil, banco investimento, percentual CDI, IPCA+ LCI, taxa pré fixada, liquidez LCI LCA",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    
    // Open Graph tags
    { property: "og:title", content: `Calculadora LCI e LCA - Simule seu Investimento - ${APP_NAME}` },
    { property: "og:description", content: "★ Simule investimentos em LCI e LCA! Compare rendimentos, veja vantagens fiscais e descubra qual o melhor investimento para seu perfil. Ferramenta gratuita e completa." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadoraonline.com.br/calculadora/financas/lci-lca" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora LCI e LCA - ${APP_NAME}` },
    { name: "twitter:description", content: "Simule investimentos em LCI e LCA com nossa calculadora gratuita. Compare rendimentos e tome a melhor decisão!" },
    
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
  const [interestType, setInterestType] = useState<'percentage_cdi' | 'percentage_ipca' | 'fixed_rate'>('percentage_cdi');
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState<'days' | 'months' | 'years'>('months');
  const [indexRate, setIndexRate] = useState(() => {
    // Define valor padrão baseado no tipo de taxa inicial
    return getDefaultRate('CDI').toString();
  });
  const [investmentType, setInvestmentType] = useState<'lci' | 'lca'>('lci');
  const [hasCarencia, setHasCarencia] = useState(false);
  const [carenciaPeriod, setCarenciaPeriod] = useState("");
  const [carenciaUnit, setCarenciaUnit] = useState<'days' | 'months'>('days');
  const [result, setResult] = useState<LCILCAResult | null>(null);

  // Função para atualizar indexRate quando o tipo de taxa mudar
  const handleInterestTypeChange = (newType: 'percentage_cdi' | 'percentage_ipca' | 'fixed_rate') => {
    setInterestType(newType);
    // Atualiza automaticamente o indexRate com valor padrão
    if (newType === 'percentage_cdi') {
      setIndexRate(getDefaultRate('CDI').toString());
    } else if (newType === 'percentage_ipca') {
      setIndexRate(getDefaultRate('IPCA').toString());
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
    setIndexRate(getDefaultRate('CDI').toString()); // Restaura valor padrão do CDI
    setCarenciaPeriod("");
    setHasCarencia(false);
    setInterestType('percentage_cdi'); // Volta para CDI
    setResult(null);
  };

  const handleLoadDefaults = () => {
    setPrincipal("10000");
    setInterestRate("95");
    setPeriod("24");
    setPeriodUnit('months');
    setIndexRate(getDefaultRate('CDI').toString());
    setInterestType('percentage_cdi');
    setInvestmentType('lci');
    setHasCarencia(true);
    setCarenciaPeriod("90");
    setCarenciaUnit('days');
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatPercentage = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);

  const formatDate = (date: Date) =>
    new Intl.DateFormat('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>LCI e LCA</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de LCI e LCA
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-4xl mx-auto">
          Simule investimentos em <strong className="text-growth-green">LCI e LCA</strong> com 
          vantagens fiscais. Compare rendimentos, analise carência e descubra se vale mais que 
          <strong className="text-primary-blue-dark"> CDB e Poupança</strong>.
        </p>
        <div className="bg-growth-green-soft rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            💰 <strong>Isento de IR</strong> • 📊 <strong>Compare investimentos</strong> • ⏰ <strong>Analise carência</strong>
          </p>
        </div>
      </header>

      {/* Formulário Principal */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados do Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primeira linha - Tipo de Investimento e Valor */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Tipo de Investimento"
                value={investmentType}
                onChange={(value) => setInvestmentType(value as 'lci' | 'lca')}
                options={[
                  { value: 'lci', label: 'LCI - Imobiliário' },
                  { value: 'lca', label: 'LCA - Agronegócio' },
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="number"
                label="Taxa Oferecida (%)"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Ex: 95"
                min="0"
                step="0.01"
                required
                fullWidth
              />

              <Select
                label="Tipo de Taxa"
                value={interestType}
                onChange={(value) => handleInterestTypeChange(value as any)}
                options={[
                  { value: 'percentage_cdi', label: '% do CDI' },
                  { value: 'percentage_ipca', label: 'IPCA +' },
                  { value: 'fixed_rate', label: 'Taxa Fixa' },
                ]}
                fullWidth
              />
            </div>

            {/* Terceira linha - Taxa de referência (condicional) */}
            {(interestType === 'percentage_cdi' || interestType === 'percentage_ipca') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Input
                      type="number"
                      label={interestType === 'percentage_cdi' ? "Taxa CDI Atual (%)" : "IPCA Estimado (%)"}
                      value={indexRate}
                      onChange={(e) => setIndexRate(e.target.value)}
                      placeholder={interestType === 'percentage_cdi' ? "Ex: 10.75" : "Ex: 4.5"}
                      min="0"
                      step="0.01"
                      required
                      fullWidth
                    />
                    
                    {/* Informações sobre o valor atual */}
                    <div className="bg-system-info/10 p-3 rounded-lg border border-system-info/20">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className={`font-semibold ${getDataFreshnessColor(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA')}`}>
                            💹 Valor oficial atual: {getDefaultRate(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA')}%
                          </span>
                        </div>
                        <div className="text-text-secondary">
                          {getIndicatorInfo(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA').source}
                        </div>
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        📅 Última atualização: {getIndicatorInfo(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA').lastUpdate}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        {getIndicatorInfo(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA').description}
                      </div>
                      {!isDataRecent(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA') && (
                        <div className="text-xs text-system-warning mt-1 font-medium">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  { value: 'days', label: 'Dias' },
                  { value: 'months', label: 'Meses' },
                  { value: 'years', label: 'Anos' },
                ]}
                fullWidth
              />
            </div>

            {/* Quinta linha - Seção de Carência */}
            <div>

              <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
                <div className="mb-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setHasCarencia(!hasCarencia)}
                      className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${
                        hasCarencia
                          ? 'border-system-info bg-system-info text-white'
                          : 'border-neutral-surface-variant bg-background-dark-secondary hover:border-system-info:border-system-info-dark'
                      }`}
                    >
                      {hasCarencia && (
                        <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <label 
                        className="text-sm font-medium text-system-info cursor-pointer"
                        onClick={() => setHasCarencia(!hasCarencia)}
                      >
                        Este investimento tem carência?
                      </label>
                      <p className="text-xs text-text-secondary mt-1">
                        💡 <strong>Carência</strong> é o período mínimo que você deve manter o investimento.
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
                        { value: 'days', label: 'Dias' },
                        { value: 'months', label: 'Meses' },
                      ]}
                      fullWidth
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={handleCalculate} className="px-8">
              Simular Investimento
            </Button>
            <Button 
              onClick={handleLoadDefaults}
              variant="outline"
              className="px-6 border-system-info text-system-info hover:bg-system-info hover:text-white"
            >
              📊 Exemplo
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="px-6 border-system-error text-system-error hover:bg-system-error hover:text-white"
            >
              🗑️ Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {result && (
        <>
          {/* Cards de Resultados Principais */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                    Após {period} {periodUnit === 'months' ? 'meses' : periodUnit === 'years' ? 'anos' : 'dias'}
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
                  <div className="text-3xl font-bold text-system-success tabular-nums">
                    {formatCurrency(result.netReturn)}
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
                    Isento de Imposto de Renda
                  </p>
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
                  <div className="text-3xl font-bold text-primary-blue-dark tabular-nums">
                    {formatPercentage(result.annualReturn)}
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-system-warning mb-2">Data de Liberação</h4>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatDate(result.canWithdrawOn)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Você poderá resgatar a partir desta data
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-system-warning mb-2">Status Atual</h4>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      result.isDuringCarencia 
                        ? 'bg-system-error/10 text-system-error/10'
                        : 'bg-system-success/10 text-system-success/10'
                    }`}>
                      {result.isDuringCarencia ? '🔒 Em carência' : '✅ Disponível para resgate'}
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      {result.isDuringCarencia 
                        ? 'Investimento ainda em período de carência'
                        : 'Investimento já pode ser resgatado'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comparações */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Comparação com Poupança */}
            <Card className="bg-primary-blue-light border-2 border-primary-blue duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  🏦 Comparação com a Poupança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Na Poupança:</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(parseFloat(principal) + result.comparisonWithSavings.savingsReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Na {investmentType.toUpperCase()}:</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.finalAmount)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-text-primary">Vantagem:</span>
                    <div className="text-right">
                      <div className="font-bold text-primary-blue-dark">
                        {formatCurrency(result.comparisonWithSavings.advantage)}
                      </div>
                      <div className="text-sm text-system-success">
                        {result.comparisonWithSavings.percentageAdvantage > 0 ? '+' : ''}{result.comparisonWithSavings.percentageAdvantage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparação com CDB */}
            <Card className="bg-system-info/10 border-2 border-system-info duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info">
                  💳 Comparação com CDB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">CDB (bruto):</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(parseFloat(principal) + result.comparisonWithCDB.cdbReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Imposto CDB:</span>
                    <span className="font-bold text-system-error-dark">
                      -{formatCurrency(result.comparisonWithCDB.cdbTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">CDB (líquido):</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(parseFloat(principal) + result.comparisonWithCDB.cdbNetReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">{investmentType.toUpperCase()} (isento):</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.finalAmount)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-text-primary">Vantagem fiscal:</span>
                    <div className="text-right">
                      <div className="font-bold text-system-info">
                        {formatCurrency(result.comparisonWithCDB.advantage)}
                      </div>
                      <div className="text-sm text-system-success">
                        {result.comparisonWithCDB.percentageAdvantage > 0 ? '+' : ''}{result.comparisonWithCDB.percentageAdvantage.toFixed(1)}%
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
                        <th className="text-left p-2">Mês</th>
                        <th className="text-right p-2">Saldo</th>
                        <th className="text-right p-2">Juros do Mês</th>
                        <th className="text-right p-2">Rendimento Acumulado</th>
                        <th className="text-center p-2">Status</th>
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
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              evolution.canWithdraw 
                                ? 'bg-system-success/10 text-system-success/10'
                                : 'bg-system-warning/10 text-system-warning/10'
                            }`}>
                              {evolution.canWithdraw ? '✅ Livre' : '🔒 Carência'}
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
      <Card className="bg-gradient-to-r from-growth-green-soft to-primary-blue-light border-l-4 border-growth-green duration-300">
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
                <strong className="text-primary-blue-dark"> LCA (Letra de Crédito do Agronegócio)</strong> são 
                investimentos de renda fixa <strong className="text-system-success">isentos de Imposto de Renda</strong> 
                para pessoas físicas, oferecendo excelente relação risco-retorno.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-xl border border-growth-green/20">
                <h3 className="text-xl font-bold text-growth-green mb-4 flex items-center">
                  🏠 LCI - Letra de Crédito Imobiliário
                </h3>
                <div className="space-y-3">
                  <div className="bg-growth-green-soft p-4 rounded-lg">
                    <h4 className="font-semibold text-growth-green mb-2">💡 Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Você empresta dinheiro para o banco, que usa esses recursos para financiar 
                      <strong className="text-growth-green"> operações do setor imobiliário</strong> 
                      (financiamentos de casas, apartamentos, construção civil).
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-growth-green">✅</span>
                      <span><strong>Isento de IR</strong> para pessoa física</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-growth-green">✅</span>
                      <span><strong>Garantido pelo FGC</strong> até R$ 250.000</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-growth-green">✅</span>
                      <span><strong>Rentabilidade</strong> normalmente entre 80% a 100% do CDI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span><strong>Carência:</strong> Normalmente 90 dias a 24 meses</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-primary-blue/20">
                <h3 className="text-xl font-bold text-primary-blue-dark mb-4 flex items-center">
                  🌾 LCA - Letra de Crédito do Agronegócio
                </h3>
                <div className="space-y-3">
                  <div className="bg-primary-blue-light p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-blue-dark mb-2">💡 Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Você empresta dinheiro para o banco, que usa esses recursos para financiar 
                      <strong className="text-primary-blue-dark"> operações do agronegócio</strong> 
                      (compra de equipamentos, custeio de safras, financiamento rural).
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-blue-dark">✅</span>
                      <span><strong>Isento de IR</strong> para pessoa física</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-blue-dark">✅</span>
                      <span><strong>Garantido pelo FGC</strong> até R$ 250.000</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-blue-dark">✅</span>
                      <span><strong>Rentabilidade</strong> similar ou superior à LCI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span><strong>Carência:</strong> Varia conforme a instituição</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-system-success/10 p-6 rounded-xl border border-system-success/20">
              <h4 className="text-lg font-bold text-system-success mb-3 text-center">
                🎯 Principal Vantagem: Isenção de Imposto de Renda
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-system-success mb-2">💚 LCI/LCA (Isento):</h5>
                  <div className="text-sm space-y-1">
                    <p>• <strong>Rendimento bruto:</strong> R$ 1.000</p>
                    <p>• <strong>Imposto de Renda:</strong> R$ 0</p>
                    <p className="font-bold text-system-success">• <strong>Rendimento líquido:</strong> R$ 1.000</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-system-warning mb-2">💛 CDB (Com IR):</h5>
                  <div className="text-sm space-y-1">
                    <p>• <strong>Rendimento bruto:</strong> R$ 1.000</p>
                    <p>• <strong>Imposto de Renda:</strong> R$ 150-225</p>
                    <p className="font-bold text-system-warning">• <strong>Rendimento líquido:</strong> R$ 775-850</p>
                  </div>
                </div>
              </div>
              <p className="text-center font-bold text-system-success mt-4">
                💰 Vantagem fiscal de até 29% nos seus rendimentos!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Tipos de Rentabilidade */}
      <Card className="bg-background-dark-secondary border-l-4 border-system-info duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📊 Tipos de Rentabilidade em LCI e LCA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-primary text-lg">
              <p>
                LCI e LCA podem oferecer diferentes tipos de rentabilidade. 
                <strong className="text-system-info"> Entenda cada modalidade</strong> 
                para escolher a que melhor se adapta ao seu perfil e momento econômico.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-blue-light p-6 rounded-xl border border-primary-blue/20">
                <h3 className="text-lg font-bold text-primary-blue-dark mb-4">
                  📈 Pós-fixada (% do CDI)
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-blue-dark mb-2">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Oferece um <strong>percentual do CDI</strong> (ex: 95% do CDI). 
                      Se o CDI subir, sua rentabilidade também sobe.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Proteção contra alta da Selic</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Mais comum no mercado</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span><strong>Risco:</strong> Queda da Selic reduz rendimento</span>
                    </div>
                  </div>
                  <div className="bg-primary-blue-light p-3 rounded">
                    <p className="text-xs font-bold text-primary-blue-dark">
                      💡 Ideal quando: CDI está em alta ou há expectativa de alta da Selic
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-growth-green-soft p-6 rounded-xl border border-growth-green/20">
                <h3 className="text-lg font-bold text-growth-green mb-4">
                  📊 Pré-fixada (Taxa Fixa)
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-growth-green mb-2">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Oferece uma <strong>taxa fixa</strong> (ex: 10% ao ano). 
                      Você sabe exatamente quanto receberá no vencimento.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Previsibilidade total</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Proteção contra queda da Selic</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span><strong>Risco:</strong> Perde se o CDI subir muito</span>
                    </div>
                  </div>
                  <div className="bg-growth-green-soft p-3 rounded">
                    <p className="text-xs font-bold text-growth-green">
                      💡 Ideal quando: CDI está alto e há expectativa de queda da Selic
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-system-info/10 p-6 rounded-xl border border-system-info/20">
                <h3 className="text-lg font-bold text-system-info mb-4">
                  📊 Híbrida (IPCA+)
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-system-info mb-2">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Oferece <strong>inflação + taxa fixa</strong> (ex: IPCA + 5% ao ano). 
                      Protege contra inflação e ainda rende um extra.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Proteção contra inflação</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Ganho real garantido</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span><strong>Menos comum em LCI/LCA</strong></span>
                    </div>
                  </div>
                  <div className="bg-system-info/10 p-3 rounded">
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
      <Card className="bg-system-warning/10 border-l-4 border-system-warning duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⏰ Carência e Liquidez: O que Você Precisa Saber
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-primary text-lg">
              <p>
                A <strong className="text-system-warning">carência</strong> é a principal 
                limitação das LCI e LCA. Entenda como funciona e como se planejar para maximizar seus rendimentos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-system-warning mb-4">
                  🔒 O que é Carência?
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-system-warning/20">
                    <p className="text-sm text-text-secondary mb-3">
                      <strong className="text-system-warning">Carência</strong> é o período mínimo 
                      que você deve manter o dinheiro investido. Durante esse tempo, 
                      <strong> não é possível resgatar</strong> sem perdas.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-system-error-dark">❌</span>
                        <span><strong>90 dias:</strong> Carência mínima mais comum</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-error-dark">❌</span>
                        <span><strong>180 dias a 2 anos:</strong> Carências mais longas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-system-warning">⚠️</span>
                        <span><strong>Resgate antecipado:</strong> Pode perder rentabilidade</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-system-warning/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-system-warning mb-2">
                      💡 Dica de Planejamento
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Só invista dinheiro que você <strong>não precisará</strong> durante o período de carência. 
                      Considere sua reserva de emergência antes de investir.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-growth-green mb-4">
                  🎯 Estratégias de Liquidez
                </h3>
                <div className="space-y-4">
                  <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
                    <h4 className="font-semibold text-growth-green mb-2">
                      1. 💰 Escadinha de Vencimentos
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Divida o dinheiro em várias aplicações com vencimentos escalonados. 
                      Ex: R$ 10.000 em 4 LCIs de R$ 2.500 com vencimentos de 3, 6, 12 e 24 meses.
                    </p>
                  </div>

                  <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                    <h4 className="font-semibold text-primary-blue-dark mb-2">
                      2. 🏦 Diversifique Bancos
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Aplique em diferentes instituições para ter mais opções de resgate 
                      e aproveitar melhores ofertas de diferentes bancos.
                    </p>
                  </div>

                  <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                    <h4 className="font-semibold text-system-success mb-2">
                      3. ⚖️ Mix de Prazos
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Combine investimentos de curto prazo (mais líquidos) com longo prazo 
                      (maior rentabilidade) conforme sua necessidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-system-info/10 p-6 rounded-xl border border-system-info/20">
              <h4 className="text-lg font-bold text-system-info mb-3 text-center">
                📊 Comparação: Carência vs Rentabilidade
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-system-info/30">
                      <th className="text-left p-3">Prazo de Carência</th>
                      <th className="text-center p-3">Rentabilidade Típica</th>
                      <th className="text-center p-3">Liquidez</th>
                      <th className="text-center p-3">Recomendado Para</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-system-info/20">
                    <tr>
                      <td className="p-3 font-medium">90 dias</td>
                      <td className="p-3 text-center">85% - 95% CDI</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-system-success/10 text-system-success/10 text-xs">
                          Alta
                        </span>
                      </td>
                      <td className="p-3 text-center text-xs">Reserva de oportunidade</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">180-360 dias</td>
                      <td className="p-3 text-center">95% - 105% CDI</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-system-warning/10 text-system-warning/10 text-xs">
                          Média
                        </span>
                      </td>
                      <td className="p-3 text-center text-xs">Objetivos médio prazo</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">1-2 anos</td>
                      <td className="p-3 text-center">100% - 120% CDI</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-system-error/10 text-system-error/10 text-xs">
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

      {/* FAQ */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre LCI e LCA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                1. LCI e LCA são realmente isentas de Imposto de Renda?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong className="text-text-primary">Sim, mas apenas para pessoas físicas.</strong> 
                A isenção é total - você não paga nem os 15% mínimos do CDB. 
                Para pessoas jurídicas, há cobrança normal de IR.
              </p>
              <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                <div className="text-sm space-y-2">
                  <p><strong>Exemplo prático:</strong></p>
                  <p>• <strong>LCI/LCA:</strong> Rendimento de R$ 1.000 = R$ 1.000 na sua conta</p>
                  <p>• <strong>CDB:</strong> Rendimento de R$ 1.000 = R$ 850 na sua conta (R$ 150 de IR)</p>
                  <p className="font-bold text-system-success">Vantagem de R$ 150 para a LCI/LCA!</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                2. Qual o valor mínimo para investir em LCI e LCA?
              </h3>
              <p className="text-text-secondary mb-3">
                O valor mínimo varia conforme o banco, mas geralmente é <strong>entre R$ 1.000 e R$ 30.000</strong>.
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                <div className="text-sm space-y-2">
                  <p><strong>Valores mínimos típicos:</strong></p>
                  <p>• <strong>Bancos digitais:</strong> R$ 1.000 - R$ 5.000</p>
                  <p>• <strong>Grandes bancos:</strong> R$ 5.000 - R$ 30.000</p>
                  <p>• <strong>Corretoras:</strong> R$ 1.000 - R$ 10.000</p>
                  <p className="text-xs opacity-75 mt-3">
                    💡 Valores podem variar conforme a instituição e condições de mercado
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                3. LCI e LCA são garantidas pelo FGC?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong className="text-system-success">Sim!</strong> 
                São garantidas pelo FGC até <strong>R$ 250.000 por CPF por instituição</strong>, 
                com limite de R$ 1 milhão renovável a cada 4 anos.
              </p>
              <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
                <div className="text-sm space-y-2">
                  <p><strong>Estratégia de proteção:</strong></p>
                  <p>• <strong>Diversifique bancos:</strong> R$ 250.000 no Banco A + R$ 250.000 no Banco B</p>
                  <p>• <strong>Include cônjuge:</strong> Cada CPF tem direito a R$ 250.000 por banco</p>
                  <p>• <strong>Diferentes produtos:</strong> LCI + LCA + CDB = R$ 250.000 cada no mesmo banco</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                4. Vale mais a pena LCI/LCA ou CDB com IR?
              </h3>
              <p className="text-text-secondary mb-3">
                Depende da rentabilidade oferecida e do prazo. <strong>Use a regra prática:</strong>
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                <div className="text-sm space-y-3">
                  <div>
                    <p><strong className="text-primary-blue-dark">Para ser equivalente ao CDB:</strong></p>
                    <p>• <strong>Até 180 dias:</strong> LCI/LCA precisa pagar 77,5% do que o CDB paga</p>
                    <p>• <strong>181-360 dias:</strong> LCI/LCA precisa pagar 80% do que o CDB paga</p>
                    <p>• <strong>361-720 dias:</strong> LCI/LCA precisa pagar 82,5% do que o CDB paga</p>
                    <p>• <strong>Acima de 720 dias:</strong> LCI/LCA precisa pagar 85% do que o CDB paga</p>
                  </div>
                  <div className="border-t border-primary-blue/30 pt-3">
                    <p><strong>Exemplo:</strong> Se o CDB paga 100% do CDI, uma LCI de 85% do CDI já vale mais a pena!</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                5. Posso resgatar LCI/LCA antes do vencimento?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong className="text-system-error-dark">Geralmente não.</strong> 
                A maioria das LCI e LCA não permite resgate antecipado, especialmente durante a carência.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-system-error/10 p-4 rounded-lg border border-system-error/20">
                  <h4 className="font-semibold text-system-error-dark mb-2">❌ Durante a Carência</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Sem possibilidade de resgate</li>
                    <li>• Perda total ou parcial dos rendimentos</li>
                    <li>• Possível cobrança de taxas</li>
                  </ul>
                </div>
                <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                  <h4 className="font-semibold text-system-warning mb-2">⚠️ Após a Carência</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Alguns bancos permitem</li>
                    <li>• Pode haver perda de rentabilidade</li>
                    <li>• Consulte as condições específicas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                6. Há diferença entre LCI e LCA na prática?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong className="text-text-primary">Para o investidor, praticamente não.</strong> 
                A diferença está no destino do dinheiro, mas as características são iguais.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-neutral-surface-variant rounded-lg overflow-hidden">
                  <thead className="bg-growth-green-soft">
                    <tr>
                      <th className="p-3 text-left">Característica</th>
                      <th className="p-3 text-center">LCI</th>
                      <th className="p-3 text-center">LCA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light">
                    <tr>
                      <td className="p-3 font-semibold">Destino do dinheiro</td>
                      <td className="p-3 text-center">Setor imobiliário</td>
                      <td className="p-3 text-center">Agronegócio</td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Imposto de Renda</td>
                      <td className="p-3 text-center text-system-success">Isento</td>
                      <td className="p-3 text-center text-system-success">Isento</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Garantia FGC</td>
                      <td className="p-3 text-center text-system-success">Sim</td>
                      <td className="p-3 text-center text-system-success">Sim</td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Rentabilidade</td>
                      <td className="p-3 text-center">Similar</td>
                      <td className="p-3 text-center">Similar</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Carência</td>
                      <td className="p-3 text-center">Sim</td>
                      <td className="p-3 text-center">Sim</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculadoras Relacionadas */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Outras Calculadoras de Investimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
              <h3 className="font-bold text-growth-green mb-2 text-sm">
                📈 Juros Compostos Avançada
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Simulador completo com <strong>aportes mensais e gráficos</strong> para investimentos de longo prazo.
              </p>
              <a 
                href="/calculadora/financas/juros-compostos" 
                className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark inline-block"
              >
                Simular →
              </a>
            </div>
            
            <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
              <h3 className="font-bold text-primary-blue-dark mb-2 text-sm">
                ⚖️ Comparação de Juros
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Compare <strong>juros simples vs compostos</strong> lado a lado com exemplos práticos.
              </p>
              <a 
                href="/calculadora/financas/juros" 
                className="text-xs bg-primary-blue text-white px-2 py-1 rounded hover:bg-primary-blue-dark inline-block"
              >
                Comparar →
              </a>
            </div>
            
            <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
              <h3 className="font-bold text-system-success mb-2 text-sm">
                🥇 Primeiro Milhão
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Descubra <strong>quando chegará ao primeiro milhão</strong> com diferentes estratégias de investimento.
              </p>
              <a 
                href="/calculadora/financas/primeiro-milhao" 
                className="text-xs bg-system-success text-white px-2 py-1 rounded hover:bg-system-success-dark inline-block"
              >
                Calcular →
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a 
              href="/calculadora/financas" 
              className="inline-flex items-center text-growth-green hover text-sm"
            >
              💰 Ver Todas as Calculadoras Financeiras
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de LCI e LCA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-growth-green">calculadora de LCI e LCA</strong> é 
              <strong className="text-system-success"> 100% gratuita</strong> e oferece 
              simulações completas com comparações, análise de carência e vantagens fiscais. Ideal para investidores 
              que buscam renda fixa com isenção de IR.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Cálculo de rentabilidade, comparação com CDB e Poupança, 
              análise de carência, evolução mensal do investimento, diferentes tipos de rentabilidade 
              (CDI, pré-fixada, IPCA+) e conteúdo educacional completo sobre o mercado brasileiro.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para fins 
              educacionais e de planejamento. Rentabilidades passadas não garantem resultados futuros. 
              Para decisões de investimento importantes, consulte sempre um <strong>assessor financeiro</strong> 
              ou <strong>analista qualificado</strong>.
            </p>
            <p className="text-xs opacity-75 border-t border-growth-green/20 pt-3 mt-4">
              ⚖️ Cálculos baseados em metodologia do mercado financeiro brasileiro • 🎓 Conteúdo educacional especializado • 
              🔒 Seus dados não são armazenados • 📱 Interface responsiva • 
              🌙 Modo escuro disponível • 💰 Informações atualizadas sobre LCI e LCA
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
            description: "Calculadora online gratuita para simular investimentos em LCI e LCA. Compare rendimentos, analise vantagens fiscais e carência.",
            url: "https://calculadoraonline.com.br/calculadora/financas/lci-lca",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL"
            },
            featureList: [
              "Cálculo de rentabilidade LCI/LCA",
              "Comparação com CDB e Poupança",
              "Análise de carência e liquidez",
              "Diferentes tipos de rentabilidade",
              "Evolução mensal do investimento",
              "Conteúdo educacional especializado",
              "100% gratuito"
            ],
            about: [
              {
                "@type": "Thing",
                name: "LCI - Letra de Crédito Imobiliário"
              },
              {
                "@type": "Thing", 
                name: "LCA - Letra de Crédito do Agronegócio"
              }
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