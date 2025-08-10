import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem, Select } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";
import { calculateCDB, CDB_TAX_BRACKETS } from "~/utils/calculations";
import type { CDBParams, CDBResult } from "~/utils/calculations";
import { getDefaultRate, getIndicatorInfo, isDataRecent, getDataFreshnessColor } from "~/lib/economic-data";

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
      content: "calculadora cdb, certificado depósito bancário, cdb tributação, imposto renda cdb, cdb vs lci lca, cdb aportes mensais, rendimento cdb, taxa cdb, cdb pré fixado, cdb pós fixado, cdb ipca, simulador cdb, investimento renda fixa, cdb bancos digitais, cdb corretoras, IOF CDB",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    
    // Open Graph tags
    { property: "og:title", content: `Calculadora CDB - Simulação Completa com Tributação - ${APP_NAME}` },
    { property: "og:description", content: "★ Simule investimentos em CDB com cálculo preciso de impostos! Compare rendimentos líquidos, veja vantagens da LCI/LCA e tome a melhor decisão. Ferramenta gratuita e completa." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadoraonline.com.br/calculadora/financas/cdb" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora CDB com Tributação - ${APP_NAME}` },
    { name: "twitter:description", content: "Simule investimentos em CDB com cálculo completo de impostos e compare com outras opções de renda fixa!" },
    
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
  const [interestType, setInterestType] = useState<'percentage_cdi' | 'percentage_ipca' | 'fixed_rate'>('percentage_cdi');
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState<'days' | 'months' | 'years'>('months');
  const [indexRate, setIndexRate] = useState(() => getDefaultRate('CDI').toString());
  const [hasIOF, setHasIOF] = useState(false);
  const [monthlyContributions, setMonthlyContributions] = useState("");
  const [result, setResult] = useState<CDBResult | null>(null);

  // Função para atualizar indexRate quando o tipo de taxa mudar
  const handleInterestTypeChange = (newType: 'percentage_cdi' | 'percentage_ipca' | 'fixed_rate') => {
    setInterestType(newType);
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
    const monthlyContributionsNum = parseFloat(monthlyContributions) || 0;

    if (principalNum > 0 && interestRateNum > 0 && periodNum > 0) {
      const params: CDBParams = {
        principal: principalNum,
        interestRate: interestRateNum,
        interestType,
        period: periodNum,
        periodUnit,
        indexRate: indexRateNum,
        bankTier: 'tier1', // Default value
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
    setIndexRate(getDefaultRate('CDI').toString());
    setMonthlyContributions("");
    setHasIOF(false);
    setInterestType('percentage_cdi');
    setResult(null);
  };

  const handleLoadDefaults = () => {
    setPrincipal("10000");
    setInterestRate("105");
    setPeriod("24");
    setPeriodUnit('months');
    setIndexRate(getDefaultRate('CDI').toString());
    setInterestType('percentage_cdi');
    setHasIOF(false);
    setMonthlyContributions("500");
  };

  useEffect(() => {
    if (principal && interestRate && period) {
      handleCalculate();
    }
  }, [principal, interestRate, interestType, period, periodUnit, indexRate, hasIOF, monthlyContributions]);

  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    } catch (error) {
      return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>CDB</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-text-primary md:text-3xl lg:text-4xl">
          Calculadora de CDB
        </h1>
        <p className="text-base md:text-lg text-text-secondary-dark max-w-4xl mx-auto">
          Simule investimentos em <strong className="text-primary-blue-dark">CDB com tributação precisa</strong>. 
          Compare rendimentos líquidos e descubra se vale mais que 
          <strong className="text-growth-green"> LCI/LCA e Poupança</strong>.
        </p>
        <div className="bg-primary-blue-light rounded-lg p-3 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            📊 <strong>Tributação automática</strong> • 💰 <strong>Compare investimentos</strong> • 📈 <strong>Aportes mensais</strong>
          </p>
        </div>
      </header>

      {/* Formulário Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 - Formulário */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">💰 Dados do Investimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Primeira linha - Valor e Taxa oferecida */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    type="number"
                    label="Valor Inicial (R$)"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="Ex: 10000"
                    min="0"
                    step="0.01"
                    required
                    fullWidth
                  />

                  <Input
                    type="number"
                    label="Taxa Oferecida (%)"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="Ex: 105"
                    min="0"
                    step="0.01"
                    required
                    fullWidth
                  />
                </div>

                {/* Segunda linha - Tipo de taxa e Prazo */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                </div>

                {/* Taxa de referência (condicional) */}
                {(interestType === 'percentage_cdi' || interestType === 'percentage_ipca') && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Input
                          type="number"
                          label={interestType === 'percentage_cdi' ? "Taxa CDI Atual (%)" : "IPCA Estimado (%)"}
                          value={indexRate}
                          onChange={(e) => setIndexRate(e.target.value)}
                          placeholder={interestType === 'percentage_cdi' ? "Ex: 12.25" : "Ex: 4.87"}
                          min="0"
                          step="0.01"
                          required
                          fullWidth
                        />
                        
                        {/* Informações sobre o valor atual */}
                        <div className="bg-system-info/10 p-2 rounded-lg border border-system-info/20">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-semibold ${getDataFreshnessColor(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA')}`}>
                                💹 Oficial: {getDefaultRate(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA')}%
                              </span>
                              <span className="text-text-secondary">
                                {getIndicatorInfo(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA').source}
                              </span>
                            </div>
                            {!isDataRecent(interestType === 'percentage_cdi' ? 'CDI' : 'IPCA') && (
                              <div className="text-system-warning font-medium">
                                ⚠️ Dados podem estar desatualizados
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

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
                  </div>
                )}

                {/* Configurações Adicionais */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary">⚙️ Configurações Adicionais</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      type="number"
                      label="Aporte Mensal (R$) - Opcional"
                      value={monthlyContributions}
                      onChange={(e) => setMonthlyContributions(e.target.value)}
                      placeholder="Ex: 500"
                      min="0"
                      step="0.01"
                      fullWidth
                    />
                    <div></div> {/* Espaço vazio para manter layout */}
                  </div>

                  {/* IOF para investimentos curtos */}
                  <div className="flex items-start space-x-3">
                    <button
                      type="button"
                      onClick={() => setHasIOF(!hasIOF)}
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                        hasIOF
                          ? 'border-system-warning bg-system-warning text-white'
                          : 'border-neutral-surface-variant bg-background-dark-secondary hover:border-system-warning'
                      }`}
                    >
                      {hasIOF && (
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <label 
                        className="text-sm font-medium text-text-primary cursor-pointer"
                        onClick={() => setHasIOF(!hasIOF)}
                      >
                        Aplicar IOF (investimentos com menos de 30 dias)
                      </label>
                      <p className="text-xs text-text-secondary mt-1">
                        💡 IOF incide sobre rendimentos em aplicações de curto prazo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Button onClick={handleCalculate} className="px-6 sm:px-8">
                    Calcular CDB
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline"
                    className="px-4 sm:px-6 border-system-error text-system-error hover:bg-system-error hover:text-white"
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna 2 - Informações e Tributação */}
        <div className="space-y-4">
          {/* Informações de Tributação */}
          <Card className="border-l-4 border-system-warning">
            <CardHeader>
              <CardTitle as="h3" className="text-system-warning">
                📋 Tributação CDB
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {CDB_TAX_BRACKETS.map((bracket, index) => (
                  <div key={index} className={`flex justify-between p-2 rounded ${
                    result && result.periodInDays >= bracket.days && result.periodInDays <= (bracket.maxDays === Infinity ? result.periodInDays : bracket.maxDays)
                      ? 'bg-system-warning/20 border border-system-warning/40'
                      : 'bg-neutral-surface/30'
                  }`}>
                    <span className="font-medium">{bracket.description}</span>
                    <span className="font-bold">{formatPercentage(bracket.rate)}</span>
                  </div>
                ))}
                <div className="text-xs text-text-secondary pt-2 border-t border-neutral-surface-variant">
                  💡 Taxa destacada será aplicada ao seu investimento
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Garantia do FGC */}
          <Card className="border-l-4 border-system-success">
            <CardHeader>
              <CardTitle as="h3" className="text-system-success">
                🛡️ Garantia FGC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Por CPF por banco:</span>
                  <span className="font-bold text-system-success">R$ 250.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Limite renovável:</span>
                  <span className="font-bold">A cada 4 anos</span>
                </div>
                <div className="flex justify-between">
                  <span>Total máximo:</span>
                  <span className="font-bold">R$ 1.000.000</span>
                </div>
                <div className="text-xs text-text-secondary pt-2 border-t border-neutral-surface-variant">
                  ✅ Seu investimento está protegido pelo FGC
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados Econômicos */}
          <Card className="border-l-4 border-primary-blue">
            <CardHeader>
              <CardTitle as="h3" className="text-primary-blue-dark">
                📊 Referências de Mercado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>CDI atual:</span>
                  <span className="font-bold text-system-success">{getDefaultRate('CDI')}% a.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>IPCA (projeção):</span>
                  <span className="font-bold text-primary-blue-dark">{getDefaultRate('IPCA')}% a.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>Poupança:</span>
                  <span className="font-bold text-growth-green">{getDefaultRate('POUPANCA')}% a.a.</span>
                </div>
                <div className="text-xs text-text-secondary pt-2 border-t border-neutral-surface-variant">
                  📈 CDBs típicos: 95% a 130% do CDI
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <>
          {/* Cards de Resultados Principais */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-primary-blue bg-primary-blue-light">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  💰 Valor Final Bruto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-blue-dark tabular-nums">
                    {formatCurrency(result.finalAmount)}
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    Antes dos impostos
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-growth-green bg-growth-green-soft">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  📈 Valor Final Líquido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-growth-green tabular-nums">
                    {formatCurrency(result.netFinalAmount)}
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    Após IR: {formatPercentage(result.taxRate)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-error-dark bg-system-error/10">
              <CardHeader>
                <CardTitle as="h3" className="text-system-error-dark">
                  💸 Total de Impostos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-system-error-dark tabular-nums">
                    {formatCurrency(result.incomeTax + result.iofTax)}
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    IR + IOF
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-success bg-system-success/10">
              <CardHeader>
                <CardTitle as="h3" className="text-system-success">
                  📊 Rendimento Líquido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-system-success tabular-nums">
                    {formatCurrency(result.netReturn)}
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    Lucro final
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparações */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Comparação com Poupança */}
            <Card className="bg-growth-green-soft border-2 border-growth-green">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  🏦 CDB vs Poupança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Na Poupança:</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(result.comparison.savings.finalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">No CDB (líquido):</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.netFinalAmount)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-text-primary">Vantagem do CDB:</span>
                    <div className="text-right">
                      <div className="font-bold text-growth-green">
                        {formatCurrency(result.comparison.savings.advantage)}
                      </div>
                      <div className="text-sm text-system-success">
                        {result.comparison.savings.percentageAdvantage > 0 ? '+' : ''}{result.comparison.savings.percentageAdvantage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparação com LCI/LCA */}
            <Card className="bg-system-info/10 border-2 border-system-info">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info">
                  💎 LCI/LCA vs CDB
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">CDB (líquido):</span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(result.netFinalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">LCI/LCA (isento):</span>
                    <span className="font-bold text-system-info">
                      {formatCurrency(result.comparison.lciLca.finalAmount)}
                    </span>
                  </div>
                  <hr className="border-neutral-surface-variant" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-text-primary">Vantagem LCI/LCA:</span>
                    <div className="text-right">
                      <div className="font-bold text-system-info">
                        {formatCurrency(result.comparison.lciLca.advantage)}
                      </div>
                      <div className="text-sm text-system-success">
                        {result.comparison.lciLca.percentageAdvantage > 0 ? '+' : ''}{result.comparison.lciLca.percentageAdvantage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-system-info bg-system-info/10 p-2 rounded">
                    💡 Esta é a economia de imposto que você teria com LCI/LCA
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evolução Mensal (se houver aportes) */}
          {result.monthlyEvolution.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">📊 Evolução Mensal do Investimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant">
                        <th className="text-left p-2">Mês</th>
                        <th className="text-right p-2">Saldo</th>
                        <th className="text-right p-2">Juros Brutos</th>
                        <th className="text-right p-2">Imposto</th>
                        <th className="text-right p-2">Juros Líquidos</th>
                        <th className="text-right p-2">Rendimento Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyEvolution.map((evolution, index) => (
                        <tr key={index} className="border-b border-neutral-surface-variant hover:bg-neutral-surface/30:bg-background-dark-secondary/30">
                          <td className="p-2 font-medium">{evolution.month}º mês</td>
                          <td className="p-2 text-right font-medium tabular-nums text-primary-blue-dark">
                            {formatCurrency(evolution.balance)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-growth-green">
                            {formatCurrency(evolution.grossInterest)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-system-error-dark">
                            -{formatCurrency(evolution.tax)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-system-success">
                            {formatCurrency(evolution.netInterest)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-growth-green font-medium">
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
        </>
      )}

      {/* Seção Educacional: O que é CDB */}
      <Card className="bg-gradient-to-r from-primary-blue-light to-growth-green-soft border-l-4 border-primary-blue">
        <CardHeader>
          <CardTitle as="h2" className="text-xl sm:text-2xl font-bold text-text-primary">
            🏦 O que é CDB? Guia Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-primary-blue-dark">CDB (Certificado de Depósito Bancário)</strong> é um 
                investimento de renda fixa onde você empresta dinheiro para o banco em troca de juros. É uma das aplicações mais 
                populares do Brasil, oferecendo <strong className="text-growth-green">segurança e rentabilidade</strong> 
                superiores à poupança.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-xl border border-primary-blue/20">
                <h3 className="text-xl font-bold text-primary-blue-dark mb-4 flex items-center">
                  🎯 Como Funciona o CDB?
                </h3>
                <div className="space-y-3">
                  <div className="bg-primary-blue-light p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-blue-dark mb-2">💡 Mecânica Simples</h4>
                    <p className="text-sm text-text-secondary">
                      Você empresta seu dinheiro para o banco, que usa esses recursos para fazer empréstimos e 
                      investimentos. Em troca, o banco paga <strong>juros pré-definidos</strong> sobre seu capital.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Garantido pelo FGC</strong> até R$ 250.000</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Liquidez:</strong> Pode ser diária ou no vencimento</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span><strong>Rentabilidade:</strong> Geralmente superior à poupança</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span><strong>Tributação:</strong> Imposto de Renda sobre os ganhos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-growth-green/20">
                <h3 className="text-xl font-bold text-growth-green mb-4 flex items-center">
                  📊 Tipos de CDB
                </h3>
                <div className="space-y-3">
                  <div className="bg-growth-green-soft p-3 rounded-lg border border-growth-green/20">
                    <h4 className="font-semibold text-growth-green mb-1">📈 Pós-fixado (% do CDI)</h4>
                    <p className="text-xs text-text-secondary">
                      Mais comum. Rentabilidade varia com a taxa CDI (ex: 105% do CDI)
                    </p>
                  </div>
                  <div className="bg-primary-blue-light p-3 rounded-lg border border-primary-blue/20">
                    <h4 className="font-semibold text-primary-blue-dark mb-1">💹 Pré-fixado</h4>
                    <p className="text-xs text-text-secondary">
                      Taxa definida na contratação (ex: 12% ao ano)
                    </p>
                  </div>
                  <div className="bg-system-info/10 p-3 rounded-lg border border-system-info/20">
                    <h4 className="font-semibold text-system-info mb-1">🌡️ Híbrido (IPCA+)</h4>
                    <p className="text-xs text-text-secondary">
                      Inflação + taxa fixa (ex: IPCA + 5%)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-system-success/10 p-6 rounded-xl border border-system-success/20">
              <h4 className="text-lg font-bold text-system-success mb-3 text-center">
                💰 Exemplo Prático: CDB vs Poupança vs LCI/LCA
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h5 className="font-semibold text-system-success mb-2">💙 CDB 105% CDI:</h5>
                  <p>• Investimento: R$ 10.000</p>
                  <p>• Prazo: 24 meses</p>
                  <p>• Bruto: R$ 12.860</p>
                  <p>• IR (20%): R$ 572</p>
                  <p className="font-bold">• Líquido: R$ 12.288</p>
                </div>
                <div>
                  <h5 className="font-semibold text-growth-green mb-2">💚 Poupança:</h5>
                  <p>• Investimento: R$ 10.000</p>
                  <p>• Prazo: 24 meses</p>
                  <p>• Bruto: R$ 11.796</p>
                  <p>• IR: R$ 0 (isento)</p>
                  <p className="font-bold">• Líquido: R$ 11.796</p>
                </div>
                <div>
                  <h5 className="font-semibold text-system-info mb-2">🌟 LCI 95% CDI:</h5>
                  <p>• Investimento: R$ 10.000</p>
                  <p>• Prazo: 24 meses</p>
                  <p>• Bruto: R$ 12.421</p>
                  <p>• IR: R$ 0 (isento)</p>
                  <p className="font-bold">• Líquido: R$ 12.421</p>
                </div>
              </div>
              <p className="mt-4 font-bold text-center">
                <span className="text-system-info">🏆 LCI ganha por R$ 133!</span> 
                <span className="text-primary-blue-dark"> CDB ganha da poupança por R$ 492!</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes sobre CDB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                1. Como funciona a tributação do CDB?
              </h3>
              <p className="text-text-secondary mb-3">
                O CDB é tributado pelo <strong>Imposto de Renda na fonte</strong>, com alíquotas decrescentes conforme o tempo de aplicação.
              </p>
              <div className="bg-system-warning/10 p-4 rounded-lg border border-system-warning/20">
                <div className="text-sm space-y-2">
                  <p><strong>Tabela regressiva do IR:</strong></p>
                  <p>• <strong>Até 180 dias:</strong> 22,5% sobre os rendimentos</p>
                  <p>• <strong>181 a 360 dias:</strong> 20% sobre os rendimentos</p>
                  <p>• <strong>361 a 720 dias:</strong> 17,5% sobre os rendimentos</p>
                  <p>• <strong>Acima de 720 dias:</strong> 15% sobre os rendimentos</p>
                  <p className="font-bold text-system-warning pt-2 border-t border-system-warning/30">
                    💡 Quanto mais tempo investido, menor o imposto!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                2. CDB ou LCI/LCA: qual é melhor?
              </h3>
              <p className="text-text-secondary mb-3">
                Depende da rentabilidade oferecida e do prazo. <strong>LCI/LCA são isentas de IR</strong>, 
                mas CDB pode oferecer taxas mais altas.
              </p>
              <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                <div className="text-sm space-y-2">
                  <p><strong>Regra prática:</strong></p>
                  <p>• Para <strong>ser equivalente</strong> a uma LCI/LCA, o CDB precisa pagar:</p>
                  <p className="ml-4">- Até 180 dias: <strong>29% a mais</strong> que a LCI/LCA</p>
                  <p className="ml-4">- 181-360 dias: <strong>25% a mais</strong> que a LCI/LCA</p>
                  <p className="ml-4">- 361-720 dias: <strong>21% a mais</strong> que a LCI/LCA</p>
                  <p className="ml-4">- Acima de 720 dias: <strong>18% a mais</strong> que a LCI/LCA</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                3. Qual o valor mínimo para investir em CDB?
              </h3>
              <p className="text-text-secondary mb-3">
                O valor mínimo varia por instituição, mas geralmente é <strong>menor que LCI/LCA</strong>.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-neutral-surface-variant rounded-lg overflow-hidden">
                  <thead className="bg-growth-green-soft">
                    <tr>
                      <th className="p-3 text-left">Tipo de Instituição</th>
                      <th className="p-3 text-center">Valor Mínimo Típico</th>
                      <th className="p-3 text-center">Rentabilidade Típica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light">
                    <tr>
                      <td className="p-3 font-semibold">Bancos Digitais</td>
                      <td className="p-3 text-center">R$ 1 - R$ 1.000</td>
                      <td className="p-3 text-center">100% - 120% CDI</td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Corretoras</td>
                      <td className="p-3 text-center">R$ 1.000 - R$ 5.000</td>
                      <td className="p-3 text-center">105% - 130% CDI</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Grandes Bancos</td>
                      <td className="p-3 text-center">R$ 5.000 - R$ 30.000</td>
                      <td className="p-3 text-center">95% - 110% CDI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                4. CDB tem liquidez diária?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong>Alguns CDBs têm liquidez diária</strong>, outros só no vencimento. 
                CDBs com liquidez diária geralmente oferecem rentabilidade menor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
                  <h4 className="font-semibold text-system-success mb-2">✅ Liquidez Diária</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pode resgatar a qualquer momento</li>
                    <li>• Rentabilidade geralmente menor</li>
                    <li>• Ideal para reserva de emergência</li>
                    <li>• Comum em bancos digitais</li>
                  </ul>
                </div>
                <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                  <h4 className="font-semibold text-primary-blue-dark mb-2">🔒 Só no Vencimento</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Resgate apenas na data acordada</li>
                    <li>• Rentabilidade geralmente maior</li>
                    <li>• Ideal para objetivos de longo prazo</li>
                    <li>• Mais comum em corretoras</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-lg text-growth-green">
                5. Vale a pena fazer aportes mensais no CDB?
              </h3>
              <p className="text-text-secondary mb-3">
                <strong>Sim, é uma excelente estratégia!</strong> Aportes regulares potencializam 
                o efeito dos juros compostos e criam disciplina de investimento.
              </p>
              <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
                <div className="text-sm space-y-3">
                  <div>
                    <p><strong className="text-growth-green">Exemplo de aportes mensais:</strong></p>
                    <p>• Investimento inicial: R$ 5.000</p>
                    <p>• Aporte mensal: R$ 500</p>
                    <p>• CDB: 105% do CDI (12,25% a.a.)</p>
                    <p>• Prazo: 24 meses</p>
                  </div>
                  <div className="border-t border-growth-green/30 pt-3">
                    <p><strong>Resultado:</strong></p>
                    <p>• Total investido: R$ 17.000</p>
                    <p>• Valor bruto final: R$ 19.847</p>
                    <p>• IR (20%): R$ 569</p>
                    <p className="font-bold text-growth-green">• Valor líquido: R$ 19.278</p>
                    <p className="text-system-success font-bold">• Rendimento líquido: R$ 2.278 (13,4%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculadoras Relacionadas */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Calculadoras de Renda Fixa Relacionadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
              <h3 className="font-bold text-system-info mb-2 text-sm">
                💰 LCI e LCA
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Compare CDB com <strong>investimentos isentos de IR</strong>. Veja qual compensa mais para seu perfil.
              </p>
              <a 
                href="/calculadora/financas/lci-lca" 
                className="text-xs bg-system-info text-white px-2 py-1 rounded hover:bg-system-info-dark inline-block"
              >
                Comparar →
              </a>
            </div>

            <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
              <h3 className="font-bold text-growth-green mb-2 text-sm">
                📈 Juros Compostos Avançada
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Simule o poder dos <strong>juros compostos com aportes mensais</strong> em qualquer investimento.
              </p>
              <a 
                href="/calculadora/financas/juros-compostos" 
                className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark inline-block"
              >
                Simular →
              </a>
            </div>
            
            <div className="bg-system-success/10 p-4 rounded-lg border border-system-success/20">
              <h3 className="font-bold text-system-success mb-2 text-sm">
                🥇 Primeiro Milhão
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Descubra <strong>quando chegará ao primeiro milhão</strong> investindo em CDB com aportes regulares.
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
      <Card className="bg-gradient-to-r from-primary-blue-light to-growth-green-soft border-l-4 border-primary-blue">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de CDB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de CDB</strong> é 
              <strong className="text-system-success"> 100% gratuita</strong> e oferece 
              cálculo preciso de tributação, comparações com outros investimentos e simulação de aportes mensais. 
              Ideal para quem busca renda fixa com rentabilidade superior à poupança.
            </p>
            <p>
              <strong>Funcionalidades avançadas:</strong> Cálculo automático de IR com tabela regressiva, 
              simulação de IOF para aplicações curtas, comparação com LCI/LCA e Poupança, aportes mensais, 
              evolução detalhada mês a mês, informações sobre garantia do FGC e interface mobile-first.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Os cálculos são para fins 
              educacionais. Rentabilidades passadas não garantem resultados futuros. Para decisões de investimento, 
              consulte sempre um <strong>assessor qualificado</strong> ou <strong>planejador financeiro certificado</strong>.
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
            description: "Calculadora gratuita para CDB com cálculo preciso de tributação. Compare rendimentos líquidos e tome a melhor decisão de investimento.",
            url: "https://calculadoraonline.com.br/calculadora/financas/cdb",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL"
            },
            featureList: [
              "Cálculo de tributação IR automática",
              "Comparação com LCI/LCA e Poupança",
              "Simulação de aportes mensais",
              "Cálculo de IOF para investimentos curtos",
              "Evolução mensal detalhada",
              "Informações sobre garantia FGC",
              "Interface mobile-first",
              "100% gratuito"
            ],
            about: [
              {
                "@type": "Thing",
                name: "CDB - Certificado de Depósito Bancário"
              },
              {
                "@type": "Thing", 
                name: "Investimento em Renda Fixa"
              },
              {
                "@type": "Thing",
                name: "Tributação de Investimentos"
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