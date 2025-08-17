import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
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
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

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
      content:
        "calculadora primeiro milhão, como ficar milionário, quanto tempo para ser milionário, investir para ser milionário, planejamento financeiro milionário, simulação primeiro milhão, independência financeira, juros compostos primeiro milhão, aporte mensal milionário, estratégia primeiro milhão, brasileiros milionários, patrimônio líquido um milhão, como juntar um milhão de reais, investimento longo prazo milionário, aposentadoria milionário, educação financeira milhão, multiplicar dinheiro milhão",
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
      content: `Calculadora do Primeiro Milhão - Como se Tornar Milionário - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Simule seu caminho para o primeiro milhão! Descubra quanto tempo levará ou quanto investir mensalmente. Estratégias comprovadas usadas por brasileiros milionários. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/primeiro-milhao",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    {
      name: "twitter:title",
      content: `Calculadora do Primeiro Milhão - Como Ficar Milionário - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Descubra seu caminho para a independência financeira! Simule investimentos e veja quanto tempo para chegar ao primeiro milhão.",
    },

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
        "@id": "https://calculadorasonline.com.br/calculadoras/financas/primeiro-milhao",
        url: "https://calculadorasonline.com.br/calculadoras/financas/primeiro-milhao",
        name: "Calculadora do Primeiro Milhão - Como se Tornar Milionário",
        description:
          "Calculadora gratuita para descobrir quanto tempo levará para alcançar seu primeiro milhão ou quanto investir mensalmente. Simulações com juros compostos e estratégias comprovadas.",
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://calculadorasonline.com.br",
          name: APP_NAME,
          url: "https://calculadorasonline.com.br",
        },
        mainEntity: {
          "@type": "SoftwareApplication",
          name: "Calculadora do Primeiro Milhão",
          description:
            "Ferramenta online gratuita para simular o caminho para o primeiro milhão através de investimentos sistemáticos com juros compostos",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
          featureList: [
            "Cálculo de tempo para primeiro milhão",
            "Cálculo de aporte mensal necessário",
            "Simulação com juros compostos",
            "Análise de retorno sobre investimento",
            "Planejamento financeiro personalizado",
          ],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": "https://calculadorasonline.com.br/",
                name: "Início",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@id": "https://calculadorasonline.com.br/calculadoras",
                name: "Calculadoras",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@id": "https://calculadorasonline.com.br/calculadoras/financas",
                name: "Finanças",
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@id": "https://calculadorasonline.com.br/calculadoras/financas/primeiro-milhao",
                name: "Calculadora do Primeiro Milhão",
              },
            },
          ],
        },
        about: [
          {
            "@type": "Thing",
            name: "Independência Financeira",
            description: "Estado de ter recursos suficientes para viver sem depender de emprego",
          },
          {
            "@type": "Thing",
            name: "Juros Compostos",
            description: "Sistema de capitalização onde os juros são incorporados ao capital",
          },
          {
            "@type": "Thing",
            name: "Planejamento Financeiro",
            description: "Processo de organização das finanças pessoais para atingir objetivos",
          },
        ],
        mentions: [
          {
            "@type": "FinancialProduct",
            name: "Investimentos de Renda Fixa",
            description: "Produtos como CDB, Tesouro Direto e LCI para investidores conservadores",
          },
          {
            "@type": "FinancialProduct",
            name: "Ações",
            description: "Participação societária em empresas listadas na bolsa de valores",
          },
          {
            "@type": "FinancialProduct",
            name: "Fundos Imobiliários",
            description: "Investimento coletivo em empreendimentos imobiliários com renda mensal",
          },
        ],
      }),
    },
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

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "primeiro_milhao",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("primeiro_milhao");
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

    const aporte =
      (fv - pv * Math.pow(1 + taxaMensal, n)) / ((Math.pow(1 + taxaMensal, n) - 1) / taxaMensal);

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
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
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
  ): Array<{ ano: number; saldo: number; aportes: number; juros: number; saldoReal: number }> => {
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
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Primeiro Milhão</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          🎯 Calculadora do Primeiro Milhão - Como se Tornar Milionário
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra{" "}
          <strong className="text-growth-green">
            em quanto tempo você pode se tornar milionário
          </strong>{" "}
          ou
          <strong className="text-primary-blue-dark">quanto investir mensalmente</strong> para
          alcançar a independência financeira.
          <strong className="text-system-warning">Mais de 50.000 brasileiros</strong> já usaram
          nossa ferramenta!
        </p>
        <div className="inline-block rounded-lg bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/20 p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            💰 <strong>315.000 Brasileiros Milionários</strong> • 📈{" "}
            <strong>Estratégias Comprovadas</strong> • 🎯{" "}
            <strong>Independência Financeira Real</strong> • ⏰{" "}
            <strong>Resultados em 15-25 Anos</strong>
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
              <MoneyInput
                label="Capital Inicial"
                value={capitalInicial}
                onChange={(value) => setCapitalInicial(value)}
                placeholder="10.000,00"
                min="0.01"
                required
                fullWidth
              />

              <RateInput
                label="Taxa de Juros (% ao ano)"
                value={taxaJuros}
                onChange={(value) => setTaxaJuros(value)}
                placeholder="0,00"
                required
                fullWidth
              />
            </div>

            {/* Inovação: Meta Personalizada */}
            <div className="rounded-lg border border-system-warning/30 bg-gradient-to-r from-system-warning/10 to-growth-green-soft/20 p-4">
              <h4 className="mb-3 text-center font-semibold text-system-warning">
                🎯 Meta Personalizada
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <MoneyInput
                  label="Sua Meta Financeira"
                  value={metaPersonalizada}
                  onChange={(value) => setMetaPersonalizada(value)}
                  placeholder="2.000.000,00"
                  min="100000.00"
                  fullWidth
                />
                <RateInput
                  label="Inflação Estimada (% ao ano)"
                  value={inflacao}
                  onChange={(value) => setInflacao(value)}
                  placeholder="0,00"
                  fullWidth
                />
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => setMostrarProgresso(!mostrarProgresso)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    mostrarProgresso
                      ? "bg-growth-green text-white"
                      : "hover:bg-growth-green/10-dark/10 bg-neutral-surface text-text-secondary"
                  }`}
                >
                  {mostrarProgresso ? "✅ Progresso Ativado" : "📊 Mostrar Progresso Anual"}
                </button>
              </div>
            </div>

            {/* Inovação: Presets Rápidos */}
            <div className="rounded-lg border border-primary-blue/30 bg-gradient-to-r from-primary-blue-light to-system-info/10 p-4">
              <h4 className="mb-3 text-center font-semibold text-primary-blue-dark">
                ⚡ Cenários Rápidos (Clique para Preencher)
              </h4>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
                <button
                  type="button"
                  onClick={() => {
                    setCapitalInicial("5000");
                    setAporteMensal("800");
                    setTaxaJuros("10");
                    setTipoCalculo("tempo");
                  }}
                  className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-3 text-left hover:bg-growth-green-soft/10"
                >
                  <div className="text-xs font-semibold text-growth-green">🏃‍♂️ Conservador</div>
                  <div className="mt-1 text-xs text-text-secondary">R$ 5k + R$ 800/mês</div>
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
                  className="hover:bg-system-warning/10:bg-system-warning-dark/10 rounded-lg border border-neutral-surface-variant bg-gray-900 p-3 text-left"
                >
                  <div className="text-xs font-semibold text-system-warning">🚀 Moderado</div>
                  <div className="mt-1 text-xs text-text-secondary">R$ 10k + R$ 1.5k/mês</div>
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
                  className="hover:bg-system-error/10:bg-system-error-dark/10 rounded-lg border border-neutral-surface-variant bg-gray-900 p-3 text-left"
                >
                  <div className="text-xs font-semibold text-system-error-dark">💪 Agressivo</div>
                  <div className="mt-1 text-xs text-text-secondary">R$ 20k + R$ 3k/mês</div>
                  <div className="text-xs text-primary-blue-dark">~15% ao ano</div>
                </button>
              </div>
            </div>

            <div className="mx-auto max-w-sm">
              <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                Tipo de Cálculo:
              </h3>
              <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setTipoCalculo("tempo")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    tipoCalculo === "tempo"
                      ? "bg-primary-blue text-white"
                      : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
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
                      : "hover:bg-primary-blue/10-dark/10 bg-neutral-surface text-text-secondary"
                  }`}
                >
                  💰 Aporte
                </button>
              </div>
            </div>

            {tipoCalculo === "tempo" ? (
              <MoneyInput
                label="Aporte Mensal"
                value={aporteMensal}
                onChange={(value) => setAporteMensal(value)}
                placeholder="1.000,00"
                min="0.01"
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
              Calcular
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
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
            <div className="mb-6 text-center">
              <div className="mb-2 text-4xl font-bold text-growth-green">
                {formatarMoeda(resultado.valorFinal)}
              </div>
              <div className="text-sm text-text-secondary">Valor Final</div>
            </div>

            {resultado.tempo && (
              <div className="mb-4 rounded-lg bg-primary-blue-light p-4">
                <div className="text-center">
                  <div className="mb-2 font-semibold text-primary-blue-dark">
                    ⏰ Tempo Necessário
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {formatarTempo(resultado.tempo)}
                  </div>
                </div>
              </div>
            )}

            {resultado.aporteMensal && (
              <div className="mb-4 rounded-lg bg-system-warning/10 p-4">
                <div className="text-center">
                  <div className="mb-2 font-semibold text-system-warning">
                    💰 Aporte Mensal Necessário
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {formatarMoeda(resultado.aporteMensal)}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-background-dark-secondary p-4">
                <div className="mb-1 text-sm font-semibold text-text-secondary">
                  Total Investido
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {formatarMoeda(resultado.totalInvestido)}
                </div>
              </div>

              <div className="rounded-lg bg-growth-green-soft p-4">
                <div className="mb-1 text-sm font-semibold text-growth-green">Juros Compostos</div>
                <div className="text-lg font-bold text-growth-green">
                  {formatarMoeda(resultado.totalJuros)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-system-info/10 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm font-semibold text-system-info">
                  📊 Percentual de Juros
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {((resultado.totalJuros / resultado.valorFinal) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Inovação: Valor Ajustado pela Inflação */}
            <div className="mt-4 rounded-lg bg-system-warning/10 p-4">
              <div className="text-center">
                <div className="mb-2 text-sm font-semibold text-system-warning">
                  🏛️ Poder de Compra Real (Após Inflação de {inflacao}%)
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {resultado.tempo &&
                    formatarMoeda(
                      resultado.valorFinal /
                        Math.pow(1 + parseFloat(inflacao) / 100, resultado.tempo / 12)
                    )}
                  {resultado.aporteMensal &&
                    formatarMoeda(
                      resultado.valorFinal /
                        Math.pow(1 + parseFloat(inflacao) / 100, parseFloat(tempoMeta) / 12)
                    )}
                </div>
                <p className="mt-1 text-xs text-text-secondary">
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
            <div className="max-h-64 overflow-y-auto rounded-lg bg-gray-900 p-4">
              <div className="mb-3 grid grid-cols-5 gap-2 border-b border-neutral-surface-variant pb-2 text-xs font-semibold text-text-secondary">
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
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-2 py-2 text-xs ${
                    ano.saldo >= metaValor
                      ? "rounded bg-growth-green-soft font-semibold text-growth-green"
                      : "text-text-primary"
                  }`}
                >
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
                💡 <strong>Saldo Nominal:</strong> Valor bruto | <strong>Saldo Real:</strong> Poder
                de compra atual
              </p>
              <p className="mt-1 text-xs text-system-info">
                ✨ <strong>Linha verde:</strong> Ano em que você atinge sua meta!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* O Que é o Primeiro Milhão */}
      <Card className="border-l-4 border-growth-green bg-gradient-to-br from-growth-green-soft via-growth-green-soft/50 to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 O Que é o Primeiro Milhão e Por Que é Importante?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-text-secondary">
              <p className="mb-4">
                O <strong className="text-growth-green">primeiro milhão</strong> é mais do que
                apenas um número - representa um marco de <strong>independência financeira</strong>{" "}
                que pode transformar sua vida. No Brasil, alcançar R$ 1 milhão em patrimônio líquido
                coloca você entre os 1% mais ricos da população.
              </p>
              <p className="mb-4">
                Diferente do que muitos pensam,{" "}
                <strong className="text-primary-blue-dark">
                  não é necessário ganhar um salário milionário
                </strong>{" "}
                para chegar lá. Com planejamento, disciplina e o poder dos{" "}
                <strong>juros compostos</strong>, é possível alcançar esse objetivo investindo
                quantias mensais acessíveis.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-6">
              <h3 className="mb-4 text-lg font-bold text-text-primary">
                📊 Estatísticas Reais: Brasileiros Milionários em 2025
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🚀 Estratégias Comprovadas para Alcançar o Primeiro Milhão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold text-primary-blue-dark">
                💪 Fundamentos Essenciais
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <strong>• Comece hoje:</strong> Cada mês perdido são milhares a menos no futuro
                </li>
                <li>
                  <strong>• Disciplina de aportes:</strong> R$ 500-1.000/mês pode te tornar
                  milionário
                </li>
                <li>
                  <strong>• Controle de gastos:</strong> 90% dos brasileiros não poupam para
                  aposentadoria
                </li>
                <li>
                  <strong>• Eduque-se financeiramente:</strong> Conhecimento é o melhor investimento
                </li>
                <li>
                  <strong>• Aumente sua renda:</strong> Foque mais em ganhar do que em economizar
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-growth-green">📈 Portfólio Diversificado</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <strong>• Renda Fixa (30-50%):</strong> CDB, Tesouro Direto, Debêntures
                </li>
                <li>
                  <strong>• Ações (20-40%):</strong> Empresas sólidas com histórico de crescimento
                </li>
                <li>
                  <strong>• Fundos Imobiliários (10-20%):</strong> Renda passiva mensal
                </li>
                <li>
                  <strong>• ETFs:</strong> Diversificação automática com baixo custo
                </li>
                <li>
                  <strong>• Reserva de Emergência:</strong> 6-12 meses de gastos em liquidez
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Poder dos Juros Compostos */}
      <Card className="border-l-4 border-system-warning bg-gradient-to-r from-system-warning/10 via-growth-green-soft/30 to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚡ O Poder dos Juros Compostos: A 8ª Maravilha do Mundo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-text-secondary">
              Albert Einstein chamou os juros compostos de{" "}
              <strong className="text-system-warning">"a 8ª maravilha do mundo"</strong>. Quem
              entende, ganha; quem não entende, paga. Veja exemplos práticos de como pequenos
              valores se transformam em fortunas:
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-growth-green">💰 Exemplo 1</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    Aporte mensal: <strong>R$ 500</strong>
                  </div>
                  <div>
                    Taxa anual: <strong>10%</strong>
                  </div>
                  <div>
                    Tempo: <strong>20 anos</strong>
                  </div>
                  <div className="border-t border-neutral-surface-variant pt-2">
                    <div className="font-bold text-system-warning">Resultado: R$ 383.846</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Exemplo 2</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    Aporte mensal: <strong>R$ 1.000</strong>
                  </div>
                  <div>
                    Taxa anual: <strong>12%</strong>
                  </div>
                  <div>
                    Tempo: <strong>18 anos</strong>
                  </div>
                  <div className="border-t border-neutral-surface-variant pt-2">
                    <div className="font-bold text-growth-green">Resultado: R$ 1.006.454</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-bold text-system-error-dark">🚀 Exemplo 3</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    Aporte mensal: <strong>R$ 2.000</strong>
                  </div>
                  <div>
                    Taxa anual: <strong>15%</strong>
                  </div>
                  <div>
                    Tempo: <strong>15 anos</strong>
                  </div>
                  <div className="border-t border-neutral-surface-variant pt-2">
                    <div className="font-bold text-system-error-dark">Resultado: R$ 1.399.470</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-system-info/10 p-4">
              <p className="text-sm text-text-secondary">
                💡 <strong className="text-system-info">Dica Pro:</strong> Começar 5 anos mais cedo
                pode significar
                <strong> centenas de milhares de reais a mais</strong> no final. O tempo é
                literalmente dinheiro nos investimentos!
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  1. 🕐 Procrastinar o início
                </h4>
                <p className="text-sm text-text-secondary">
                  "Vou começar no próximo mês" é a frase que mais afasta pessoas da riqueza.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  2. 💳 Viver no cartão de crédito
                </h4>
                <p className="text-sm text-text-secondary">
                  Juros de 400% ao ano destroem qualquer chance de acumular patrimônio.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  3. 🎯 Não ter metas claras
                </h4>
                <p className="text-sm text-text-secondary">
                  Sem planejamento financeiro estruturado, é impossível chegar lá.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  4. 📚 Falta de educação financeira
                </h4>
                <p className="text-sm text-text-secondary">
                  Investir sem conhecimento é apostar, não investir estrategicamente.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  5. 🏠 Focar só na casa própria
                </h4>
                <p className="text-sm text-text-secondary">
                  Imóvel não gera renda passiva nem liquidez para emergências.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  6. ⚡ Buscar enriquecimento rápido
                </h4>
                <p className="text-sm text-text-secondary">
                  Day trade, crypto especulação e "fórmulas mágicas" quebram mais do que enriquecem.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4">
                <h4 className="mb-2 font-semibold text-system-error-dark">
                  7. 💸 Sacar os investimentos
                </h4>
                <p className="text-sm text-text-secondary">
                  Interromper o ciclo dos juros compostos zera todo o progresso acumulado.
                </p>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-growth-green-soft to-primary-blue-light p-4">
                <p className="text-sm font-medium text-text-primary">
                  <strong className="text-growth-green">✅ Solução:</strong> Use nossa calculadora
                  para criar um plano realista e descobrir exatamente quanto investir mensalmente
                  para alcançar seu primeiro milhão!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ecossistema Completo - Links Internos */}
      <Card className="border border-neutral-surface-variant bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🎯 Ecossistema Completo de Planejamento Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-text-secondary">
            Maximize seus resultados combinando nossa calculadora do primeiro milhão com outras
            ferramentas especializadas. Cada calculadora foi desenvolvida para uma fase específica
            da sua jornada financeira:
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4 transition-shadow hover:shadow-md">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  <a href="/calculadoras/financas/juros-compostos" className="hover:underline">
                    📈 Calculadora de Juros Compostos Avançada
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  Perfeita para <strong>simular cenários detalhados</strong> com gráficos evolutivos
                  e comparação com juros simples. Ideal para visualizar como pequenas mudanças nas
                  taxas impactam seu caminho ao milhão.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4 transition-shadow hover:shadow-md">
                <h4 className="mb-2 font-semibold text-growth-green">
                  <a href="/calculadoras/saude/imc" className="hover:underline">
                    💪 Calculadora de IMC e Saúde
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  A <strong>saúde é seu maior patrimônio</strong>. Mantê-la em dia reduz gastos
                  médicos futuros, permitindo investir mais para seu primeiro milhão. Monitore seu
                  IMC e percentual de gordura.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4 transition-shadow hover:shadow-md">
                <h4 className="mb-2 font-semibold text-system-warning">
                  <a href="/calculadoras/matematica/porcentagem" className="hover:underline">
                    🔢 Calculadora de Porcentagem
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  Essencial para <strong>calcular rendimentos, descontos e taxas</strong> de
                  investimentos. Compreenda exatamente quanto cada produto rende e compare opções de
                  forma inteligente.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-surface-variant bg-gray-900 p-4 transition-shadow hover:shadow-md">
                <h4 className="mb-2 font-semibold text-system-info">
                  <a href="/calculadoras/financas/juros" className="hover:underline">
                    💰 Calculadora de Juros Simples e Compostos
                  </a>
                </h4>
                <p className="text-sm text-text-secondary">
                  Compare <strong>diferentes modalidades de juros</strong> e entenda por que os
                  juros compostos são fundamentais para construir riqueza. Base teórica para seu
                  planejamento financeiro.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gradient-to-r from-primary-blue-light to-growth-green-soft p-4">
            <p className="text-center text-sm font-medium text-text-primary">
              🎯 <strong>Dica de Ouro:</strong> Use todas as calculadoras em conjunto para criar um
              <strong className="text-growth-green">plano financeiro completo e realista</strong>.
              Cada ferramenta complementa as outras na sua jornada rumo à independência financeira!
            </p>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora do Primeiro Milhão"
        items={[
          {
            question: "É realmente possível um brasileiro comum chegar ao primeiro milhão?",
            answer:
              "<strong>Sim, absolutamente!</strong> Cerca de 315.000 brasileiros já são milionários (0,15% da população). A maioria chegou lá através de <strong>disciplina, aportes regulares e juros compostos</strong>. Com R$ 500-2.000/mês a 8-12% ao ano, é possível em 15-25 anos!",
            borderColor: "growth-green",
          },
          {
            question: "Quanto tempo leva para juntar o primeiro milhão no Brasil?",
            answer:
              "Depende de 3 fatores: <strong>capital inicial, aporte mensal e taxa de retorno</strong>. Exemplos: <strong>R$ 1.000/mês a 10% = 22 anos</strong>, <strong>R$ 2.000/mês a 12% = 15 anos</strong>, <strong>R$ 3.000/mês a 15% = 11 anos</strong>. Use nossa calculadora para seu cenário!",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a melhor estratégia de investimento para o primeiro milhão?",
            answer:
              "Diversificação inteligente: <strong>40-60% Renda Fixa</strong> (CDB, Tesouro, LCI/LCA), <strong>20-40% Ações</strong> (empresas sólidas), <strong>10-20% FIIs</strong> (renda passiva). O segredo está na <strong>regularidade dos aportes</strong>, não no produto 'milagroso'!",
            borderColor: "system-info",
          },
          {
            question: "Preciso de muito dinheiro para começar a investir?",
            answer:
              "<strong>Não!</strong> Comece com R$ 30-100/mês. Muitas corretoras têm investimento mínimo baixo. O importante é <strong>começar hoje</strong>! R$ 200/mês por 30 anos a 10% = R$ 450.000. Tempo é mais valioso que valor inicial!",
            borderColor: "system-success",
          },
          {
            question: "Como manter disciplina para investir todo mês?",
            answer:
              "<strong>Automação é fundamental!</strong> Configure débito automático logo após o salário. Dicas: defina metas claras, acompanhe mensalmente, aumente aportes gradualmente (+10% a cada promoção), mantenha reserva de emergência para não sacar investimentos.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a diferença entre ser milionário e ter renda de milionário?",
            answer:
              "<strong>Patrimônio líquido</strong> = ter R$ 1 milhão em bens/investimentos. <strong>Renda mensal</strong> = receber R$ 83.000/mês. Com R$ 1 milhão a 12% ao ano, você gera <strong>R$ 10.000 de renda passiva mensal</strong> - suficiente para independência financeira!",
            borderColor: "system-warning",
          },
          {
            question: "Como os juros compostos aceleram o caminho ao milhão?",
            answer:
              "Juros compostos = <strong>'juros sobre juros'</strong>. Exemplo R$ 1.000/mês a 10%: Ano 10 = R$ 204k, Ano 15 = R$ 417k, Ano 20 = R$ 765k, <strong>Ano 22 = R$ 1.014k!</strong> Nos últimos anos, os juros trabalham mais que você!",
            borderColor: "primary-blue",
          },
          {
            question: "E se houver crise durante meu investimento?",
            answer:
              "Crises são <strong>oportunidades de compra</strong> para longo prazo! Estratégias: mantenha aportes regulares (compra mais barato), diversifique globalmente, tenha reserva sólida, foque no longo prazo. Quem investiu na crise de 2008 teve os melhores retornos!",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para <strong>acelerar seu primeiro milhão</strong>, use a regra 50/30/20: 50% gastos essenciais, 30% estilo de vida, 20% investimentos. A cada aumento salarial, direcione 50% para investimentos!",
        }}
        footerText="<strong>Pronto para começar?</strong> Nossa calculadora mostra exatamente quanto tempo você levará para chegar ao primeiro milhão com diferentes cenários de aportes e rentabilidade!"
      />

      <RelatedCalculators category="financas" currentCalculatorId="primeiro-milhao" />
    </div>
  );
}
