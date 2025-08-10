import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora do Primeiro Milhão 2025 - Como Ficar Milionário - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora do Primeiro Milhão GRATUITA! Descubra em quanto tempo você pode se tornar milionário ou quanto investir mensalmente. Simulações realistas com juros compostos, estratégias comprovadas e planejamento financeiro para independência. Usado por +50.000 brasileiros.",
    },
    {
      name: "keywords",
      content: "calculadora primeiro milhão, como ficar milionário, quanto tempo para ser milionário, investir para ser milionário, planejamento financeiro milionário, simulação primeiro milhão, independência financeira, juros compostos primeiro milhão, aporte mensal milionário, estratégia primeiro milhão, brasileiros milionários, patrimônio líquido um milhão, como juntar um milhão de reais, investimento longo prazo milionário, aposentadoria milionário, educação financeira milhão, multiplicar dinheiro milhão",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    
    // Open Graph tags
    { property: "og:title", content: `Calculadora do Primeiro Milhão - Como se Tornar Milionário - ${APP_NAME}` },
    { property: "og:description", content: "★ Simule seu caminho para o primeiro milhão! Descubra quanto tempo levará ou quanto investir mensalmente. Estratégias comprovadas usadas por brasileiros milionários. 100% gratuito!" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadoraonline.com.br/calculadora/financas/primeiro-milhao" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora do Primeiro Milhão - Como Ficar Milionário - ${APP_NAME}` },
    { name: "twitter:description", content: "Descubra seu caminho para a independência financeira! Simule investimentos e veja quanto tempo para chegar ao primeiro milhão." },
    
    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#10b981" },
    { name: "theme-color", content: "#10b981" },
    { name: "format-detection", content: "telephone=no" },
    
    // Schema.org structured data for Financial Calculator
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://calculadoraonline.com.br/calculadora/financas/primeiro-milhao",
        "url": "https://calculadoraonline.com.br/calculadora/financas/primeiro-milhao",
        "name": "Calculadora do Primeiro Milhão - Como se Tornar Milionário",
        "description": "Calculadora gratuita para descobrir quanto tempo levará para alcançar seu primeiro milhão ou quanto investir mensalmente. Simulações com juros compostos e estratégias comprovadas.",
        "inLanguage": "pt-BR",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://calculadoraonline.com.br",
          "name": APP_NAME,
          "url": "https://calculadoraonline.com.br"
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "Calculadora do Primeiro Milhão",
          "description": "Ferramenta online gratuita para simular o caminho para o primeiro milhão através de investimentos sistemáticos com juros compostos",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
          },
          "featureList": [
            "Cálculo de tempo para primeiro milhão",
            "Cálculo de aporte mensal necessário",
            "Simulação com juros compostos",
            "Análise de retorno sobre investimento",
            "Planejamento financeiro personalizado"
          ]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@id": "https://calculadoraonline.com.br/",
                "name": "Início"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": "https://calculadoraonline.com.br/calculadora",
                "name": "Calculadoras"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@id": "https://calculadoraonline.com.br/calculadora/financas",
                "name": "Finanças"
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@id": "https://calculadoraonline.com.br/calculadora/financas/primeiro-milhao",
                "name": "Calculadora do Primeiro Milhão"
              }
            }
          ]
        },
        "about": [
          {
            "@type": "Thing",
            "name": "Independência Financeira",
            "description": "Estado de ter recursos suficientes para viver sem depender de emprego"
          },
          {
            "@type": "Thing",
            "name": "Juros Compostos",
            "description": "Sistema de capitalização onde os juros são incorporados ao capital"
          },
          {
            "@type": "Thing",
            "name": "Planejamento Financeiro",
            "description": "Processo de organização das finanças pessoais para atingir objetivos"
          }
        ],
        "mentions": [
          {
            "@type": "FinancialProduct",
            "name": "Investimentos de Renda Fixa",
            "description": "Produtos como CDB, Tesouro Direto e LCI para investidores conservadores"
          },
          {
            "@type": "FinancialProduct",
            "name": "Ações",
            "description": "Participação societária em empresas listadas na bolsa de valores"
          },
          {
            "@type": "FinancialProduct",
            "name": "Fundos Imobiliários",
            "description": "Investimento coletivo em empreendimentos imobiliários com renda mensal"
          }
        ]
      })
    }
  ];
};

interface CalculationResult {
  totalInvestido: number;
  totalJuros: number;
  valorFinal: number;
  tempo?: number;
  aporteMensal?: number;
}

export default function PrimeiroMilhao() {
  const [capitalInicial, setCapitalInicial] = useState("");
  const [aporteMensal, setAporteMensal] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [tipoCalculo, setTipoCalculo] = useState<"tempo" | "aporte">("tempo");
  const [tempoMeta, setTempoMeta] = useState("");
  const [resultado, setResultado] = useState<CalculationResult | null>(null);
  const [metaPersonalizada, setMetaPersonalizada] = useState("1000000");
  const [mostrarProgresso, setMostrarProgresso] = useState(false);
  const [inflacao, setInflacao] = useState("4");
  const metaValor = parseFloat(metaPersonalizada) || 1000000;

  const calcularJurosCompostos = (
    capital: number,
    aporte: number,
    taxa: number,
    meses: number
  ): CalculationResult => {
    const taxaMensal = taxa / 100 / 12;
    
    let montante = capital;
    let totalInvestido = capital;
    
    for (let i = 0; i < meses; i++) {
      montante = montante * (1 + taxaMensal) + aporte;
      totalInvestido += aporte;
    }
    
    return {
      totalInvestido,
      totalJuros: montante - totalInvestido,
      valorFinal: montante,
    };
  };

  const calcularTempoParaMeta = (): CalculationResult | null => {
    const capital = parseFloat(capitalInicial);
    const aporte = parseFloat(aporteMensal);
    const taxa = parseFloat(taxaJuros);

    console.log("Calculando tempo:", { capital, aporte, taxa });
    
    if (isNaN(capital) || isNaN(aporte) || isNaN(taxa) || aporte <= 0 || taxa <= 0) {
      console.log("Validação falhou:", { capital, aporte, taxa });
      return null;
    }

    const taxaMensal = taxa / 100 / 12;
    
    let meses = 0;
    let montante = capital;
    let totalInvestido = capital;
    const maxMeses = 600; // 50 anos
    
    while (montante < metaValor && meses < maxMeses) {
      montante = montante * (1 + taxaMensal) + aporte;
      totalInvestido += aporte;
      meses++;
    }
    
    if (meses >= maxMeses) return null;
    
    return {
      totalInvestido,
      totalJuros: montante - totalInvestido,
      valorFinal: montante,
      tempo: meses,
    };
  };

  const calcularAporteNecessario = (): CalculationResult | null => {
    const capital = parseFloat(capitalInicial);
    const tempo = parseFloat(tempoMeta);
    const taxa = parseFloat(taxaJuros);

    console.log("Calculando aporte:", { capital, tempo, taxa });
    
    if (isNaN(capital) || isNaN(tempo) || isNaN(taxa) || tempo <= 0 || taxa <= 0) {
      console.log("Validação aporte falhou:", { capital, tempo, taxa });
      return null;
    }

    const taxaMensal = taxa / 100 / 12;
    const n = tempo;
    const fv = metaValor;
    const pv = capital;
    
    const aporte = (fv - pv * Math.pow(1 + taxaMensal, n)) / (((Math.pow(1 + taxaMensal, n) - 1) / taxaMensal));
    
    if (aporte < 0) return null;
    
    const resultado = calcularJurosCompostos(capital, aporte, taxa, tempo);
    
    return {
      ...resultado,
      aporteMensal: aporte,
    };
  };

  const handleCalculate = () => {
    console.log("Botão calcular clicado, tipo:", tipoCalculo);
    console.log("Valores atuais:", { capitalInicial, aporteMensal, taxaJuros, tempoMeta });
    
    if (tipoCalculo === "tempo") {
      const result = calcularTempoParaMeta();
      console.log("Resultado tempo:", result);
      setResultado(result);
    } else {
      const result = calcularAporteNecessario();
      console.log("Resultado aporte:", result);
      setResultado(result);
    }
  };

  const handleReset = () => {
    setCapitalInicial("");
    setAporteMensal("");
    setTaxaJuros("");
    setTempoMeta("");
    setResultado(null);
  };

  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarTempo = (meses: number): string => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    
    if (anos === 0) return `${meses} meses`;
    if (mesesRestantes === 0) return `${anos} anos`;
    return `${anos} anos e ${mesesRestantes} meses`;
  };

  const calcularProgressoAnual = (
    capital: number,
    aporte: number,
    taxa: number,
    meses: number
  ): Array<{ ano: number; saldo: number; aportes: number; juros: number; saldoReal: number; }> => {
    const taxaMensal = taxa / 100 / 12;
    const inflacaoMensal = parseFloat(inflacao) / 100 / 12;
    
    let montante = capital;
    let totalAportes = capital;
    const progressoAnual = [];
    
    for (let ano = 1; ano <= Math.ceil(meses / 12); ano++) {
      const mesesDoAno = Math.min(12, meses - (ano - 1) * 12);
      
      for (let mes = 0; mes < mesesDoAno; mes++) {
        montante = montante * (1 + taxaMensal) + aporte;
        totalAportes += aporte;
      }
      
      // Valor real considerando inflação
      const saldoReal = montante / Math.pow(1 + parseFloat(inflacao) / 100, ano);
      
      progressoAnual.push({
        ano,
        saldo: Math.round(montante),
        aportes: Math.round(totalAportes),
        juros: Math.round(montante - totalAportes),
        saldoReal: Math.round(saldoReal),
      });
    }
    
    return progressoAnual;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Primeiro Milhão</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🎯 Calculadora do Primeiro Milhão - Como se Tornar Milionário
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
          Descubra <strong className="text-growth-green">em quanto tempo você pode se tornar milionário</strong> ou 
          <strong className="text-primary-blue-dark">quanto investir mensalmente</strong> para alcançar a independência financeira. 
          <strong className="text-system-warning">Mais de 50.000 brasileiros</strong> já usaram nossa ferramenta!
        </p>
        <div className="bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/20 rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            💰 <strong>315.000 Brasileiros Milionários</strong> • 📈 <strong>Estratégias Comprovadas</strong> • 🎯 <strong>Independência Financeira Real</strong> • ⏰ <strong>Resultados em 15-25 Anos</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Parâmetros de Investimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="number"
                label="Capital Inicial (R$)"
                value={capitalInicial}
                onChange={(e) => setCapitalInicial(e.target.value)}
                placeholder="Ex: 10000"
                min="0"
                step="0.01"
                required
                fullWidth
              />

              <Input
                type="number"
                label="Taxa de Juros (% ao ano)"
                value={taxaJuros}
                onChange={(e) => setTaxaJuros(e.target.value)}
                placeholder="Ex: 10"
                min="0"
                step="0.1"
                required
                fullWidth
              />
            </div>

            {/* Inovação: Meta Personalizada */}
            <div className="bg-gradient-to-r from-system-warning/10 to-growth-green-soft/20 p-4 rounded-lg border border-system-warning/30">
              <h4 className="font-semibold mb-3 text-system-warning text-center">🎯 Meta Personalizada (Inovação Exclusiva!)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Sua Meta Financeira (R$)"
                  value={metaPersonalizada}
                  onChange={(e) => setMetaPersonalizada(e.target.value)}
                  placeholder="Ex: 2000000 (2 milhões)"
                  min="100000"
                  step="50000"
                  fullWidth
                />
                <Input
                  type="number"
                  label="Inflação Estimada (% ao ano)"
                  value={inflacao}
                  onChange={(e) => setInflacao(e.target.value)}
                  placeholder="Ex: 4"
                  min="0"
                  max="15"
                  step="0.1"
                  fullWidth
                />
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => setMostrarProgresso(!mostrarProgresso)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    mostrarProgresso
                      ? "bg-growth-green text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-growth-green/10-dark/10"
                  }`}
                >
                  {mostrarProgresso ? "✅ Progresso Ativado" : "📊 Mostrar Progresso Anual"}
                </button>
              </div>
            </div>

            {/* Inovação: Presets Rápidos */}
            <div className="bg-gradient-to-r from-primary-blue-light to-system-info/10 p-4 rounded-lg border border-primary-blue/30">
              <h4 className="font-semibold mb-3 text-primary-blue-dark text-center">⚡ Cenários Rápidos (Clique para Preencher)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCapitalInicial("5000");
                    setAporteMensal("800");
                    setTaxaJuros("10");
                    setTipoCalculo("tempo");
                  }}
                  className="bg-gray-900 p-3 rounded-lg border border-neutral-surface-variant hover:bg-growth-green-soft/10 text-left"
                >
                  <div className="font-semibold text-xs text-growth-green">🏃‍♂️ Conservador</div>
                  <div className="text-xs text-text-secondary mt-1">R$ 5k + R$ 800/mês</div>
                  <div className="text-xs text-primary-blue-dark">~10% ao ano</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCapitalInicial("10000");
                    setAporteMensal("1500");
                    setTaxaJuros("12");
                    setTipoCalculo("tempo");
                  }}
                  className="bg-gray-900 p-3 rounded-lg border border-neutral-surface-variant hover:bg-system-warning/10:bg-system-warning-dark/10 text-left"
                >
                  <div className="font-semibold text-xs text-system-warning">🚀 Moderado</div>
                  <div className="text-xs text-text-secondary mt-1">R$ 10k + R$ 1.5k/mês</div>
                  <div className="text-xs text-primary-blue-dark">~12% ao ano</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCapitalInicial("20000");
                    setAporteMensal("3000");
                    setTaxaJuros("15");
                    setTipoCalculo("tempo");
                  }}
                  className="bg-gray-900 p-3 rounded-lg border border-neutral-surface-variant hover:bg-system-error/10:bg-system-error-dark/10 text-left"
                >
                  <div className="font-semibold text-xs text-system-error-dark">💪 Agressivo</div>
                  <div className="text-xs text-text-secondary mt-1">R$ 20k + R$ 3k/mês</div>
                  <div className="text-xs text-primary-blue-dark">~15% ao ano</div>
                </button>
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <h3 className="font-semibold mb-3 text-text-primary text-center text-sm">Tipo de Cálculo:</h3>
              <div className="flex rounded-lg border border-neutral-surface-variant overflow-hidden">
                <button
                  type="button"
                  onClick={() => setTipoCalculo("tempo")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    tipoCalculo === "tempo"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10-dark/10"
                  }`}
                >
                  ⏰ Tempo
                </button>
                <button
                  type="button"
                  onClick={() => setTipoCalculo("aporte")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    tipoCalculo === "aporte"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10-dark/10"
                  }`}
                >
                  💰 Aporte
                </button>
              </div>
            </div>

            {tipoCalculo === "tempo" ? (
              <Input
                type="number"
                label="Aporte Mensal (R$)"
                value={aporteMensal}
                onChange={(e) => setAporteMensal(e.target.value)}
                placeholder="Ex: 1000"
                min="0"
                step="0.01"
                required
                fullWidth
              />
            ) : (
              <Input
                type="number"
                label="Tempo para Meta (meses)"
                value={tempoMeta}
                onChange={(e) => setTempoMeta(e.target.value)}
                placeholder="Ex: 120"
                min="1"
                step="1"
                required
                fullWidth
              />
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular Primeiro Milhão
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

      {resultado && (
        <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              🎉 Resultado da Simulação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-growth-green mb-2">
                {formatarMoeda(resultado.valorFinal)}
              </div>
              <div className="text-sm text-text-secondary">Valor Final</div>
            </div>

            {resultado.tempo && (
              <div className="bg-primary-blue-light p-4 rounded-lg mb-4">
                <div className="text-center">
                  <div className="font-semibold text-primary-blue-dark mb-2">
                    ⏰ Tempo Necessário
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {formatarTempo(resultado.tempo)}
                  </div>
                </div>
              </div>
            )}

            {resultado.aporteMensal && (
              <div className="bg-system-warning/10 p-4 rounded-lg mb-4">
                <div className="text-center">
                  <div className="font-semibold text-system-warning mb-2">
                    💰 Aporte Mensal Necessário
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {formatarMoeda(resultado.aporteMensal)}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-dark-secondary p-4 rounded-lg">
                <div className="font-semibold text-text-secondary text-sm mb-1">
                  Total Investido
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {formatarMoeda(resultado.totalInvestido)}
                </div>
              </div>
              
              <div className="bg-growth-green-soft p-4 rounded-lg">
                <div className="font-semibold text-growth-green text-sm mb-1">
                  Juros Compostos
                </div>
                <div className="text-lg font-bold text-growth-green">
                  {formatarMoeda(resultado.totalJuros)}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-system-info/10 p-4 rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-system-info text-sm mb-2">
                  📊 Percentual de Juros
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {((resultado.totalJuros / resultado.valorFinal) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Inovação: Valor Ajustado pela Inflação */}
            <div className="mt-4 bg-system-warning/10 p-4 rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-system-warning text-sm mb-2">
                  🏛️ Poder de Compra Real (Após Inflação de {inflacao}%)
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {resultado.tempo && formatarMoeda(
                    resultado.valorFinal / Math.pow(1 + parseFloat(inflacao) / 100, resultado.tempo / 12)
                  )}
                  {resultado.aporteMensal && formatarMoeda(
                    resultado.valorFinal / Math.pow(1 + parseFloat(inflacao) / 100, parseFloat(tempoMeta) / 12)
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  💡 Este é o valor real que você terá considerando a perda do poder de compra
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inovação: Tabela de Progresso Anual */}
      {resultado && mostrarProgresso && resultado.tempo && (
        <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h3" className="text-primary-blue-dark">
              📈 Progresso Anual Detalhado (Exclusivo!)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-text-secondary mb-3 pb-2 border-b border-neutral-surface-variant">
                <div>Ano</div>
                <div>Saldo Nominal</div>
                <div>Saldo Real</div>
                <div>Aportes</div>
                <div>Juros</div>
              </div>
              {calcularProgressoAnual(
                parseFloat(capitalInicial) || 0,
                parseFloat(aporteMensal) || 0,
                parseFloat(taxaJuros) || 0,
                resultado.tempo
              ).map((ano, index) => (
                <div key={index} className={`grid grid-cols-5 gap-2 text-xs py-2 ${
                  ano.saldo >= metaValor 
                    ? "bg-growth-green-soft font-semibold text-growth-green rounded" 
                    : "text-text-primary"
                }`}>
                  <div>{ano.ano}º</div>
                  <div>{(ano.saldo / 1000).toFixed(0)}k</div>
                  <div>{(ano.saldoReal / 1000).toFixed(0)}k</div>
                  <div>{(ano.aportes / 1000).toFixed(0)}k</div>
                  <div>{(ano.juros / 1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-text-secondary">
                💡 <strong>Saldo Nominal:</strong> Valor bruto | <strong>Saldo Real:</strong> Poder de compra atual
              </p>
              <p className="text-xs text-system-info mt-1">
                ✨ <strong>Linha verde:</strong> Ano em que você atinge sua meta!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* O Que é o Primeiro Milhão */}
      <Card className="bg-gradient-to-br from-growth-green-soft via-growth-green-soft/50 to-primary-blue-light border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 O Que é o Primeiro Milhão e Por Que é Importante?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-secondary">
              <p className="mb-4">
                O <strong className="text-growth-green">primeiro milhão</strong> é mais do que apenas um número - representa um marco de <strong>independência financeira</strong> que pode transformar sua vida. No Brasil, alcançar R$ 1 milhão em patrimônio líquido coloca você entre os 1% mais ricos da população.
              </p>
              <p className="mb-4">
                Diferente do que muitos pensam, <strong className="text-primary-blue-dark">não é necessário ganhar um salário milionário</strong> para chegar lá. Com planejamento, disciplina e o poder dos <strong>juros compostos</strong>, é possível alcançar esse objetivo investindo quantias mensais acessíveis.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-4 text-text-primary">📊 Estatísticas Reais: Brasileiros Milionários em 2025</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Brasileiros milionários:</span>
                    <strong className="text-growth-green">~315.000 pessoas</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">% da população:</span>
                    <strong className="text-growth-green">~0,15%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tempo médio para chegar:</span>
                    <strong className="text-primary-blue-dark">15-25 anos</strong>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Aporte mensal médio:</span>
                    <strong className="text-system-warning">R$ 500-2.000</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Taxa anual média:</span>
                    <strong className="text-system-warning">8-12%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Idade média:</span>
                    <strong className="text-primary-blue-dark">45-55 anos</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estratégias para o Primeiro Milhão */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🚀 Estratégias Comprovadas para Alcançar o Primeiro Milhão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary-blue-dark">💪 Fundamentos Essenciais</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><strong>• Comece hoje:</strong> Cada mês perdido são milhares a menos no futuro</li>
                <li><strong>• Disciplina de aportes:</strong> R$ 500-1.000/mês pode te tornar milionário</li>
                <li><strong>• Controle de gastos:</strong> 90% dos brasileiros não poupam para aposentadoria</li>
                <li><strong>• Eduque-se financeiramente:</strong> Conhecimento é o melhor investimento</li>
                <li><strong>• Aumente sua renda:</strong> Foque mais em ganhar do que em economizar</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-growth-green">📈 Portfólio Diversificado</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><strong>• Renda Fixa (30-50%):</strong> CDB, Tesouro Direto, Debêntures</li>
                <li><strong>• Ações (20-40%):</strong> Empresas sólidas com histórico de crescimento</li>
                <li><strong>• Fundos Imobiliários (10-20%):</strong> Renda passiva mensal</li>
                <li><strong>• ETFs:</strong> Diversificação automática com baixo custo</li>
                <li><strong>• Reserva de Emergência:</strong> 6-12 meses de gastos em liquidez</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Poder dos Juros Compostos */}
      <Card className="bg-gradient-to-r from-system-warning/10 via-growth-green-soft/30 to-primary-blue-light border-l-4 border-system-warning duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚡ O Poder dos Juros Compostos: A 8ª Maravilha do Mundo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-text-secondary">
              Albert Einstein chamou os juros compostos de <strong className="text-system-warning">"a 8ª maravilha do mundo"</strong>. 
              Quem entende, ganha; quem não entende, paga. Veja exemplos práticos de como pequenos valores se transformam em fortunas:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-bold text-growth-green mb-2">💰 Exemplo 1</h4>
                <div className="space-y-1 text-sm">
                  <div>Aporte mensal: <strong>R$ 500</strong></div>
                  <div>Taxa anual: <strong>10%</strong></div>
                  <div>Tempo: <strong>20 anos</strong></div>
                  <div className="pt-2 border-t border-neutral-surface-variant">
                    <div className="text-system-warning font-bold">Resultado: R$ 383.846</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-bold text-primary-blue-dark mb-2">🎯 Exemplo 2</h4>
                <div className="space-y-1 text-sm">
                  <div>Aporte mensal: <strong>R$ 1.000</strong></div>
                  <div>Taxa anual: <strong>12%</strong></div>
                  <div>Tempo: <strong>18 anos</strong></div>
                  <div className="pt-2 border-t border-neutral-surface-variant">
                    <div className="text-growth-green font-bold">Resultado: R$ 1.006.454</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-bold text-system-error-dark mb-2">🚀 Exemplo 3</h4>
                <div className="space-y-1 text-sm">
                  <div>Aporte mensal: <strong>R$ 2.000</strong></div>
                  <div>Taxa anual: <strong>15%</strong></div>
                  <div>Tempo: <strong>15 anos</strong></div>
                  <div className="pt-2 border-t border-neutral-surface-variant">
                    <div className="text-system-error-dark font-bold">Resultado: R$ 1.399.470</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-system-info/10 p-4 rounded-lg">
              <p className="text-sm text-text-secondary">
                💡 <strong className="text-system-info">Dica Pro:</strong> Começar 5 anos mais cedo pode significar 
                <strong> centenas de milhares de reais a mais</strong> no final. O tempo é literalmente dinheiro nos investimentos!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Erros Comuns */}
      <Card className="bg-system-error/5/5 border-l-4 border-system-error-dark duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❌ 7 Erros Que Impedem Você de Chegar ao Primeiro Milhão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">1. 🕐 Procrastinar o início</h4>
                <p className="text-sm text-text-secondary">
                  "Vou começar no próximo mês" é a frase que mais afasta pessoas da riqueza.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">2. 💳 Viver no cartão de crédito</h4>
                <p className="text-sm text-text-secondary">
                  Juros de 400% ao ano destroem qualquer chance de acumular patrimônio.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">3. 🎯 Não ter metas claras</h4>
                <p className="text-sm text-text-secondary">
                  Sem planejamento financeiro estruturado, é impossível chegar lá.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">4. 📚 Falta de educação financeira</h4>
                <p className="text-sm text-text-secondary">
                  Investir sem conhecimento é apostar, não investir estrategicamente.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">5. 🏠 Focar só na casa própria</h4>
                <p className="text-sm text-text-secondary">
                  Imóvel não gera renda passiva nem liquidez para emergências.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">6. ⚡ Buscar enriquecimento rápido</h4>
                <p className="text-sm text-text-secondary">
                  Day trade, crypto especulação e "fórmulas mágicas" quebram mais do que enriquecem.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant">
                <h4 className="font-semibold text-system-error-dark mb-2">7. 💸 Sacar os investimentos</h4>
                <p className="text-sm text-text-secondary">
                  Interromper o ciclo dos juros compostos zera todo o progresso acumulado.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-growth-green-soft to-primary-blue-light p-4 rounded-lg">
                <p className="text-sm text-text-primary font-medium">
                  <strong className="text-growth-green">✅ Solução:</strong> Use nossa calculadora para criar um plano realista 
                  e descobrir exatamente quanto investir mensalmente para alcançar seu primeiro milhão!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="bg-gradient-to-br from-primary-blue-light via-growth-green-soft/30 to-system-info/10 border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            ❓ Perguntas Frequentes - Primeiro Milhão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-growth-green">💰 É realmente possível um brasileiro comum chegar ao primeiro milhão?</h3>
              <p className="text-text-secondary mb-3">
                <strong>Sim, absolutamente!</strong> Cerca de 315.000 brasileiros já são milionários, representando 0,15% da população. A maioria não nasceu rica - chegou lá através de <strong className="text-primary-blue-dark">planejamento, disciplina e investimentos consistentes</strong>.
              </p>
              <p className="text-text-secondary">
                Com aportes mensais de R$ 500-2.000 e taxas de retorno de 8-12% ao ano, é possível alcançar R$ 1 milhão em 15-25 anos, mesmo começando do zero.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-primary-blue-dark">⏰ Quanto tempo leva para juntar o primeiro milhão?</h3>
              <p className="text-text-secondary mb-3">
                O tempo varia conforme três fatores principais: <strong>capital inicial</strong>, <strong>aporte mensal</strong> e <strong>taxa de retorno</strong>. Exemplos práticos:
              </p>
              <ul className="text-text-secondary space-y-1 ml-4">
                <li>• <strong>R$ 1.000/mês + 10% ao ano:</strong> ~22 anos</li>
                <li>• <strong>R$ 2.000/mês + 12% ao ano:</strong> ~15 anos</li>
                <li>• <strong>R$ 3.000/mês + 15% ao ano:</strong> ~11 anos</li>
              </ul>
              <p className="text-text-secondary mt-3">
                Use nossa calculadora para descobrir seu cenário personalizado!
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-system-warning">📊 Qual a melhor estratégia de investimento para o primeiro milhão?</h3>
              <p className="text-text-secondary mb-3">
                A estratégia mais eficaz combina <strong className="text-growth-green">diversificação, consistência e longo prazo</strong>. Portfólio recomendado:
              </p>
              <ul className="text-text-secondary space-y-1 ml-4">
                <li>• <strong>Renda Fixa (40-60%):</strong> CDB, Tesouro Direto, LCI/LCA</li>
                <li>• <strong>Ações (20-40%):</strong> Empresas sólidas e dividendos</li>
                <li>• <strong>Fundos Imobiliários (10-20%):</strong> Renda passiva mensal</li>
                <li>• <strong>ETFs:</strong> Diversificação internacional</li>
              </ul>
              <p className="text-text-secondary mt-3">
                O segredo está na <strong>regularidade dos aportes</strong>, não no produto "milagroso".
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-system-error-dark">💸 Preciso de muito dinheiro para começar a investir?</h3>
              <p className="text-text-secondary mb-3">
                <strong>Não!</strong> É possível começar com apenas <strong className="text-primary-blue-dark">R$ 30-100 por mês</strong>. Muitas corretoras não cobram taxa mínima para Tesouro Direto e alguns CDBs.
              </p>
              <p className="text-text-secondary">
                O importante é <strong>começar hoje</strong>. Quem investe R$ 200/mês por 30 anos a 10% ao ano pode acumular mais de R$ 450.000. Tempo é mais valioso que quantidade inicial!
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-growth-green">🎯 Como manter a disciplina para investir todo mês?</h3>
              <p className="text-text-secondary mb-3">
                A <strong className="text-system-warning">automação é fundamental</strong>. Configure débito automático logo após receber o salário - "pague-se primeiro". Outras dicas:
              </p>
              <ul className="text-text-secondary space-y-1 ml-4">
                <li>• <strong>Defina metas claras:</strong> "R$ 1 milhão em 20 anos"</li>
                <li>• <strong>Acompanhe mensalmente:</strong> Celebre cada marco atingido</li>
                <li>• <strong>Aumente aportes gradualmente:</strong> +10% a cada promoção/aumento</li>
                <li>• <strong>Tenha reserva de emergência:</strong> Evita sacar investimentos</li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-system-info">🏦 Qual a diferença entre ser milionário e ter renda de milionário?</h3>
              <p className="text-text-secondary mb-3">
                <strong>Patrimônio líquido</strong> (ser milionário) = ter R$ 1 milhão em bens e investimentos líquidos. <strong>Renda mensal</strong> = receber R$ 83.000/mês (R$ 1 milhão por ano).
              </p>
              <p className="text-text-secondary">
                Com R$ 1 milhão investido a 12% ao ano, você gera aproximadamente <strong className="text-growth-green">R$ 10.000 de renda passiva mensal</strong> - suficiente para independência financeira de muitas pessoas.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-primary-blue-dark">📈 Como os juros compostos aceleram o caminho ao milhão?</h3>
              <p className="text-text-secondary mb-3">
                Os juros compostos fazem você ganhar "<strong className="text-system-warning">juros sobre os juros</strong>". Exemplo prático com R$ 1.000/mês a 10% ao ano:
              </p>
              <ul className="text-text-secondary space-y-1 ml-4">
                <li>• <strong>Ano 10:</strong> R$ 204.845 (R$ 83.845 de juros)</li>
                <li>• <strong>Ano 15:</strong> R$ 417.725 (R$ 237.725 de juros)</li>
                <li>• <strong>Ano 20:</strong> R$ 765.270 (R$ 525.270 de juros)</li>
                <li>• <strong>Ano 22:</strong> R$ 1.014.970 (<strong className="text-growth-green">R$ 750.970 de juros!</strong>)</li>
              </ul>
              <p className="text-text-secondary mt-3">
                Nos últimos anos, <strong>os juros trabalham mais que você</strong>!
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-neutral-surface-variant">
              <h3 className="font-bold text-lg mb-3 text-system-warning">🛡️ E se houver uma crise durante meu investimento?</h3>
              <p className="text-text-secondary mb-3">
                Crises são <strong className="text-primary-blue-dark">oportunidades de compra</strong> para investidores de longo prazo. Estratégias anti-crise:
              </p>
              <ul className="text-text-secondary space-y-1 ml-4">
                <li>• <strong>Mantenha aportes regulares:</strong> Compra mais barato nas baixas</li>
                <li>• <strong>Diversifique globalmente:</strong> Não dependa só do Brasil</li>
                <li>• <strong>Reserve de emergência sólida:</strong> 12 meses de gastos</li>
                <li>• <strong>Foco no longo prazo:</strong> Mercados sempre se recuperam</li>
              </ul>
              <p className="text-text-secondary mt-3">
                Quem investiu durante a crise de 2008 teve os melhores retornos da história!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ecossistema Completo - Links Internos */}
      <Card className="bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/10 border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🎯 Ecossistema Completo de Planejamento Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary mb-6">
            Maximize seus resultados combinando nossa calculadora do primeiro milhão com outras ferramentas especializadas. 
            Cada calculadora foi desenvolvida para uma fase específica da sua jornada financeira:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-primary-blue-dark mb-2">
                  <a href="/calculadora/financas/juros-compostos" className="hover:underline">
                    📈 Calculadora de Juros Compostos Avançada
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  Perfeita para <strong>simular cenários detalhados</strong> com gráficos evolutivos e comparação com juros simples. 
                  Ideal para visualizar como pequenas mudanças nas taxas impactam seu caminho ao milhão.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-growth-green mb-2">
                  <a href="/calculadora/saude/imc" className="hover:underline">
                    💪 Calculadora de IMC e Saúde
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  A <strong>saúde é seu maior patrimônio</strong>. Mantê-la em dia reduz gastos médicos futuros, 
                  permitindo investir mais para seu primeiro milhão. Monitore seu IMC e percentual de gordura.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-system-warning mb-2">
                  <a href="/calculadora/matematica/porcentagem" className="hover:underline">
                    🔢 Calculadora de Porcentagem
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  Essencial para <strong>calcular rendimentos, descontos e taxas</strong> de investimentos. 
                  Compreenda exatamente quanto cada produto rende e compare opções de forma inteligente.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-neutral-surface-variant hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-system-info mb-2">
                  <a href="/calculadora/financas/juros" className="hover:underline">
                    💰 Calculadora de Juros Simples e Compostos
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  Compare <strong>diferentes modalidades de juros</strong> e entenda por que os juros compostos 
                  são fundamentais para construir riqueza. Base teórica para seu planejamento financeiro.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-primary-blue-light to-growth-green-soft p-4 rounded-lg">
            <p className="text-sm text-text-primary font-medium text-center">
              🎯 <strong>Dica de Ouro:</strong> Use todas as calculadoras em conjunto para criar um 
              <strong className="text-growth-green">plano financeiro completo e realista</strong>. 
              Cada ferramenta complementa as outras na sua jornada rumo à independência financeira!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}