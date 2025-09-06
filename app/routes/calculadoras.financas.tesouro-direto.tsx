import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { getCachedTreasuryBonds, type ProcessedBond } from "~/services/treasuryBonds.server";
import { getSchedulerStatus } from "~/services/scheduler.server";
import {
  calculateTreasuryDirect,
  type TreasuryDirectParams,
  type TreasuryDirectResult,
} from "~/utils/calculations";
import { ECONOMIC_INDICATORS } from "~/lib/economic-data";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

// Loader para buscar dados dos títulos do Tesouro Direto
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const bonds = await getCachedTreasuryBonds();
    const schedulerStatus = getSchedulerStatus();

    return json({
      bonds,
      success: true,
      lastUpdate: new Date().toISOString(),
      scheduler: {
        isRunning: schedulerStatus.isRunning,
        nextExecution: schedulerStatus.nextExecution?.toISOString(),
        cacheLastUpdate: schedulerStatus.cacheStatus.lastUpdate?.toISOString(),
        cacheNextUpdate: schedulerStatus.cacheStatus.nextUpdate?.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error loading treasury bonds:", error);

    // Retorna dados vazios em caso de erro
    return json({
      bonds: [],
      success: false,
      error: "Falha ao carregar dados do Tesouro Direto",
      scheduler: {
        isRunning: false,
        nextExecution: null,
        cacheLastUpdate: null,
        cacheNextUpdate: null,
      },
    });
  }
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Tesouro Direto – Simule Rentabilidade dos Títulos",
    },
    {
      name: "description",
      content:
        "Simule Tesouro Direto com dados reais. Compare Selic, IPCA+ e Prefixado. Calcule rentabilidade, imposto de renda e taxa de custódia.",
    },
    {
      name: "keywords",
      content:
        "calculadora tesouro direto, simulador tesouro direto, tesouro selic, tesouro prefixado, tesouro ipca, resgate antecipado, custódia",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
    { name: "author", content: "Calculadora Online BR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    { name: "bingbot", content: "index,follow" },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
    },
    {
      property: "og:title",
      content: "Tesouro Direto – Simule Rentabilidade dos Títulos",
    },
    {
      property: "og:description",
      content:
        "Simule Tesouro Direto com dados reais. Compare Selic, IPCA+ e Prefixado. Calcule rentabilidade, imposto de renda e taxa de custódia.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-tesouro-direto.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora Tesouro Direto - Simule Tesouro Selic, Prefixado e IPCA+ com dados oficiais",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Tesouro Direto 2025 - Simulador",
    },
    {
      name: "twitter:description",
      content:
        "Simule Tesouro Selic, Prefixado e IPCA+ com dados oficiais. Calcule IR, custódia e resgate antecipado.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-tesouro-direto.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora Tesouro Direto - Simule com dados oficiais",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora Tesouro Direto - Simulador com Dados Oficiais 2025",
        description:
          "Simulador gratuito de Tesouro Direto com dados oficiais: Tesouro Selic, Prefixado, IPCA+, com juros semestrais. Calcule IR, taxas de custódia e resgate antecipado.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-26",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 180,
            height: 180,
          },
          sameAs: [
            "https://twitter.com/CalculadoraBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
          name: "Calculadora Tesouro Direto 2025 - Simulador com Dados Oficiais",
          description:
            "Simule Tesouro Direto com dados oficiais: Selic, Prefixado, IPCA+, com juros semestrais. Calcule IR, custódia e resgate antecipado.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.calculadoraonlinebr.com.br/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://www.calculadoraonlinebr.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Finanças",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Tesouro Direto",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/tesouro-direto",
              },
            ],
          },
        },
        about: {
          "@type": "FinancialProduct",
          name: "Tesouro Direto",
          description:
            "Títulos públicos federais: Tesouro Selic, Prefixado e IPCA+, com segurança do governo",
          category: "Investment",
        },
        featureList: [
          "Simulação de Tesouro Selic (pós-fixado)",
          "Simulação de Tesouro Prefixado",
          "Simulação de Tesouro IPCA+ (híbrido)",
          "Cálculo de IR regressivo e taxas de custódia",
          "Simulação de resgate antecipado",
          "Dados oficiais do Tesouro Nacional",
          "Interface móvel responsiva",
          "Resultados em tempo real",
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Qual título do Tesouro Direto é melhor para iniciantes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tesouro Selic é ideal para iniciantes! Tem liquidez diária sem perda, baixa volatilidade e acompanha a taxa básica de juros. É perfeito para reserva de emergência e para quem está começando a investir.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona o resgate antecipado do Tesouro Direto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Você pode resgatar qualquer título antes do vencimento, com liquidez diária. Tesouro Selic: praticamente sem perda. Prefixado e IPCA+: sujeitos à marcação a mercado (pode ter ganho ou perda conforme variação dos juros).",
            },
          },
          {
            "@type": "Question",
            name: "Quais são os custos para investir no Tesouro Direto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Taxa do Tesouro Nacional: 0,20% ao ano sobre o valor investido. Taxa da corretora: varia de 0% a 0,50% ao ano. Imposto de Renda: regressivo de 15% a 22,5% sobre o rendimento.",
            },
          },
          {
            "@type": "Question",
            name: "É seguro investir no Tesouro Direto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "É o investimento mais seguro do Brasil! Tem garantia do Governo Federal - quem emite o Real e cobra impostos. O risco é praticamente zero, sendo considerado 'livre de risco' pelos especialistas.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como Calcular Rendimentos do Tesouro Direto",
        description:
          "Passo a passo para simular investimentos em títulos do Tesouro Direto com dados oficiais",
        image: "https://www.calculadoraonlinebr.com.br/images/calculadora-tesouro-direto.webp",
        totalTime: "PT3M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "BRL",
          value: "0",
        },
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora Tesouro Direto Online",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Selecionar tipo de título",
            text: "Escolha entre Tesouro Selic, Prefixado ou IPCA+ conforme seu objetivo",
            image: "https://www.calculadoraonlinebr.com.br/images/calculadora-tesouro-direto.webp",
          },
          {
            "@type": "HowToStep",
            name: "Inserir valor do investimento",
            text: "Digite o valor inicial e aportes mensais se houver",
          },
          {
            "@type": "HowToStep",
            name: "Configurar prazo",
            text: "Defina a data de vencimento ou resgate do título",
          },
          {
            "@type": "HowToStep",
            name: "Calcular rendimentos",
            text: "Veja o resultado com IR, custódia e valor líquido final",
          },
        ],
      }),
    },
  ];
};

export default function TreasuryDirectCalculator() {
  const { bonds, success, error: loadError, scheduler } = useLoaderData<typeof loader>();

  const [selectedBondCode, setSelectedBondCode] = useState("");
  const [selectedBond, setSelectedBond] = useState<ProcessedBond | null>(null);
  const [principal, setPrincipal] = useState("10000.00");
  const [maturityDate, setMaturityDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 3);
    return date.toISOString().split("T")[0];
  });
  const [purchaseRate, setPurchaseRate] = useState("10.5");
  const [currentSelicRate, setCurrentSelicRate] = useState(
    ECONOMIC_INDICATORS.SELIC.rate.toString()
  );
  const [currentIPCARate, setCurrentIPCARate] = useState(ECONOMIC_INDICATORS.IPCA.rate.toString());
  const [couponRate, setCouponRate] = useState("10.0");
  const [monthlyInvestment, setMonthlyInvestment] = useState("0.00");
  const [result, setResult] = useState<TreasuryDirectResult | null>(null);
  const [error, setError] = useState("");
  const [showSteps, setShowSteps] = useState(true);
  const [showComparisons, setShowComparisons] = useState(true);
  // Taxas de custódia
  const [treasuryCustodyRate, setTreasuryCustodyRate] = useState("0.20");
  const [bankCustodyRate, setBankCustodyRate] = useState("0");
  // Resgate antecipado
  const [enableEarlyRedemption, setEnableEarlyRedemption] = useState(false);
  const [earlyRedemptionDate, setEarlyRedemptionDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  });
  const [marketRateAtRedemption, setMarketRateAtRedemption] = useState(
    ECONOMIC_INDICATORS.SELIC.rate.toString()
  );

  // Global Analytics Tracking
  const {
    startCalculation,
    endCalculation,
    trackFeature,
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus,
  } = useAutoCalculatorTracking({
    calculatorType: "tesouro_direto",
    category: "financas",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("tesouro_direto");

  // Efeito para atualizar campos quando um título é selecionado
  useEffect(() => {
    if (selectedBondCode && bonds.length > 0) {
      const bond = bonds.find((b) => b.code === selectedBondCode);
      if (bond) {
        setSelectedBond(bond);

        // Usa a taxa da API
        setPurchaseRate(bond.rate.toFixed(2));
        setMaturityDate(bond.maturityDate);
        setCouponRate(bond.rate.toFixed(2));

        // Ajusta valor mínimo se necessário
        const currentPrincipal = parseFloat(principal);
        const minimumRequired = Math.max(bond.minInvestment, 30);
        if (currentPrincipal < minimumRequired) {
          // Arredonda para cima para múltiplos de 30 para valores pequenos
          const adjustedMinimum = minimumRequired < 100 ? 30 : Math.ceil(minimumRequired / 10) * 10;
          setPrincipal(adjustedMinimum.toFixed(2));
        }
      }
    }
  }, [selectedBondCode, bonds]);

  // Inicializa com o primeiro título disponível
  useEffect(() => {
    if (bonds.length > 0 && !selectedBondCode) {
      setSelectedBondCode(bonds[0].code);
    }
  }, [bonds, selectedBondCode]);

  const handleCalculate = () => {
    setError("");

    try {
      const principalNum = parseFloat(principal) || 0;
      const purchaseRateNum = parseFloat(purchaseRate) || 0;
      const currentSelicRateNum = parseFloat(currentSelicRate) || ECONOMIC_INDICATORS.SELIC.rate;
      const currentIPCARateNum = parseFloat(currentIPCARate) || ECONOMIC_INDICATORS.IPCA.rate;
      const couponRateNum = parseFloat(couponRate) || 10.0;
      const monthlyInvestmentNum = parseFloat(monthlyInvestment) || 0;

      if (principalNum <= 0) {
        throw new Error("Valor inicial deve ser maior que zero");
      }

      if (purchaseRateNum <= 0) {
        throw new Error("Taxa deve ser maior que zero");
      }

      if (!maturityDate) {
        throw new Error("Data de vencimento é obrigatória");
      }

      if (!selectedBond) {
        throw new Error("Selecione um título do Tesouro Direto");
      }

      if (principalNum < selectedBond.minInvestment) {
        throw new Error(
          `Valor mínimo para este título é ${selectedBond.minInvestment.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        );
      }

      const params: TreasuryDirectParams = {
        bondType: selectedBond.type,
        principal: principalNum,
        maturityDate,
        purchaseRate: purchaseRateNum,
        currentSelicRate: currentSelicRateNum,
        currentIPCARate: currentIPCARateNum,
        couponRate: couponRateNum,
        monthlyInvestment: monthlyInvestmentNum,
        // Taxas de custódia
        treasuryCustodyRate: parseFloat(treasuryCustodyRate) || 0.2,
        bankCustodyRate: parseFloat(bankCustodyRate) || 0,
        // Resgate antecipado
        earlyRedemption: enableEarlyRedemption,
        earlyRedemptionDate: enableEarlyRedemption ? earlyRedemptionDate : undefined,
        marketRateAtRedemption: enableEarlyRedemption
          ? parseFloat(marketRateAtRedemption) || purchaseRateNum
          : undefined,
      };

      const calculationResult = calculateTreasuryDirect(params);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no cálculo");
      setResult(null);
    }
  };

  const handleReset = () => {
    setPrincipal("10000.00");
    const date = new Date();
    date.setFullYear(date.getFullYear() + 3);
    setMaturityDate(date.toISOString().split("T")[0]);
    setMonthlyInvestment("0.00");
    setResult(null);
    setError("");
  };

  const exportCouponCalendar = (result: any) => {
    if (!result.coupons || result.coupons.length === 0) return;

    const csvHeader = "Semestre,Período,Valor do Cupom,Total Acumulado\n";
    const csvData = result.coupons
      .map((coupon: any, index: number) => {
        const couponDate = new Date(coupon.paymentDate);
        const year = couponDate.getFullYear();
        const month = couponDate.getMonth();
        const semesterText = month < 6 ? "1º Semestre" : "2º Semestre";

        return [
          `${index + 1}º`,
          `${semesterText} ${year}`,
          `"${coupon.couponValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}"`,
          `"${coupon.accumulatedValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}"`,
        ].join(",");
      })
      .join("\n");

    const csvContent = csvHeader + csvData;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `cronograma-cupons-tesouro-direto-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Funções auxiliares para exibição dos títulos
  const getBondTypeName = (type: ProcessedBond["type"]): string => {
    switch (type) {
      case "tesouro_selic":
        return "Tesouro Selic";
      case "tesouro_prefixado":
        return "Tesouro Prefixado";
      case "tesouro_ipca":
        return "Tesouro IPCA+";
      case "tesouro_prefixado_juros":
        return "Tesouro Prefixado c/ Juros";
      case "tesouro_ipca_juros":
        return "Tesouro IPCA+ c/ Juros";
      default:
        return "Título do Tesouro";
    }
  };

  const getBondTypeIcon = (type: ProcessedBond["type"]): string => {
    switch (type) {
      case "tesouro_selic":
        return "📈";
      case "tesouro_prefixado":
        return "🎯";
      case "tesouro_ipca":
        return "🛡️";
      case "tesouro_prefixado_juros":
        return "💸";
      case "tesouro_ipca_juros":
        return "💰";
      default:
        return "🏛️";
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <nav aria-label="Navegação estrutural">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
          <BreadcrumbItem isLast>Tesouro Direto</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora Tesouro Direto 2025 – Simulador com Dados Oficiais
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Simule <strong className="text-growth-green">Tesouro Selic, Prefixado e IPCA+</strong>
          com <strong className="text-primary-blue-dark">dados atualizados do governo</strong>.
          Calcule IR, custódia, juros semestrais e resgate antecipado.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🏛️ <strong>Dados Oficiais</strong> • 📊 <strong>IR Regressivo</strong> • 💰{" "}
            <strong>Custódia Real</strong> • 🔄 <strong>Resgate Antecipado</strong>
          </p>
        </div>
      </header>

      {/* Calculator Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle as="h2">🎯 Selecionar Título Público</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Status da API */}
              {loadError && (
                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
                  <p className="text-sm text-system-warning">
                    ⚠️ Usando dados padrão - API temporariamente indisponível
                  </p>
                </div>
              )}

              {success && bonds.length > 0 && scheduler.cacheLastUpdate && (
                <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-3">
                  <div className="text-center">
                    <p className="text-xs text-text-secondary">
                      Atualizado: {new Date(scheduler.cacheLastUpdate).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              )}

              {/* Select de títulos */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Título Disponível para Investimento:
                </label>
                <select
                  value={selectedBondCode}
                  onChange={(e) => {
                    setSelectedBondCode(e.target.value);
                    setResult(null);
                    setError("");
                  }}
                  className="bg-background-primary w-full rounded-lg border border-neutral-surface-variant p-3 text-text-primary focus:border-primary-blue focus:outline-none"
                >
                  <option value="">Selecione um título...</option>
                  {bonds.map((bond) => (
                    <option key={bond.code} value={bond.code}>
                      {bond.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detalhes do título selecionado */}
              {selectedBond && (
                <div className="rounded-lg border border-primary-blue bg-primary-blue-light p-4">
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-semibold text-primary-blue-dark">
                      <span className="text-xl">{getBondTypeIcon(selectedBond.type)}</span>
                      {selectedBond.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">Taxa:</p>
                        <p className="font-bold text-primary-blue-dark">
                          {selectedBond.rate.toFixed(2)}% a.a.
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Preço Unitário:</p>
                        <p className="font-bold text-primary-blue-dark">
                          {selectedBond.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Investimento Mínimo:</p>
                        <p className="font-bold text-system-success">
                          {selectedBond.minInvestment.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Vencimento:</p>
                        <p className="font-bold text-primary-blue-dark">
                          {new Date(selectedBond.maturityDate).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Tipo do título */}
                    <div className="border-t border-primary-blue/20 pt-2">
                      <p className="text-xs text-text-secondary">
                        Categoria:{" "}
                        <span className="font-semibold text-primary-blue-dark">
                          {getBondTypeName(selectedBond.type)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h2">💰 Dados do Investimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <MoneyInput
                  label="Valor Inicial"
                  value={principal}
                  onChange={(value) => setPrincipal(value)}
                  placeholder="10.000,00"
                  min="30.00"
                  fullWidth
                  required
                />
                <div>
                  <Input
                    type="date"
                    label="Data de Vencimento"
                    value={maturityDate}
                    onChange={(e) => setMaturityDate(e.target.value)}
                    fullWidth
                    required
                    readOnly={!!selectedBond}
                    className={selectedBond ? "bg-neutral-surface/50" : ""}
                  />
                  {selectedBond && (
                    <p className="mt-1 text-xs text-system-info">
                      ℹ️ Data de vencimento do título
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <RateInput
                    label={
                      selectedBond?.type === "tesouro_selic"
                        ? "Taxa Selic (%)"
                        : selectedBond?.type?.includes("ipca")
                          ? "Taxa Real (%)"
                          : "Taxa Prefixada (%)"
                    }
                    value={purchaseRate}
                    onChange={(value) => setPurchaseRate(value)}
                    placeholder="0,00"
                    required
                    readOnly={!!selectedBond}
                    className={selectedBond ? "bg-neutral-surface/50" : ""}
                  />
                  {selectedBond && (
                    <p className="mt-1 text-xs text-system-info">
                      ℹ️ Taxa do título selecionado
                    </p>
                  )}
                </div>
                <MoneyInput
                  label="Aportes Mensais - Opcional"
                  value={monthlyInvestment}
                  onChange={(value) => setMonthlyInvestment(value)}
                  placeholder="500,00"
                  fullWidth
                />
              </div>

              {/* Indexers Section */}
              <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <h4 className="mb-3 font-semibold text-system-info">📈 Indexadores Econômicos</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <RateInput
                    label="Taxa Selic Atual (%)"
                    value={currentSelicRate}
                    onChange={(value) => setCurrentSelicRate(value)}
                    placeholder="0,00"
                    fullWidth
                  />
                  <RateInput
                    label="IPCA Estimado (%)"
                    value={currentIPCARate}
                    onChange={(value) => setCurrentIPCARate(value)}
                    placeholder="0,00"
                    fullWidth
                  />
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  💡 Valores atuais: Selic {ECONOMIC_INDICATORS.SELIC.rate}% • IPCA{" "}
                  {ECONOMIC_INDICATORS.IPCA.rate}% • Atualizado em{" "}
                  {new Date(ECONOMIC_INDICATORS.SELIC.lastUpdate).toLocaleDateString("pt-BR")}
                </div>
              </div>

              {/* Custody Fees Section */}
              <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h4 className="mb-3 font-semibold text-system-warning">💳 Taxas de Custódia</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <RateInput
                    label="Taxa Tesouro Nacional (% a.a.)"
                    value={treasuryCustodyRate}
                    onChange={(value) => setTreasuryCustodyRate(value)}
                    placeholder="0,00"
                    fullWidth
                  />
                  <RateInput
                    label="Taxa da Corretora/Banco (% a.a.)"
                    value={bankCustodyRate}
                    onChange={(value) => setBankCustodyRate(value)}
                    placeholder="0,00"
                    fullWidth
                  />
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  ℹ️ Taxa do Tesouro é fixa em 0,20% a.a. • Corretoras variam de 0% a 0,50% a.a.
                </div>
              </div>

              {/* Early Redemption Section */}
              <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                <h4 className="mb-3 font-semibold text-growth-green">
                  🔄 Simulação de Resgate Antecipado
                </h4>

                <div className="mb-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enableEarlyRedemption"
                    checked={enableEarlyRedemption}
                    onChange={(e) => setEnableEarlyRedemption(e.target.checked)}
                    className="bg-background-primary h-4 w-4 rounded border border-neutral-surface-variant text-growth-green focus:ring-2 focus:ring-growth-green"
                  />
                  <label
                    htmlFor="enableEarlyRedemption"
                    className="text-sm font-medium text-text-primary"
                  >
                    Simular resgate antes do vencimento
                  </label>
                </div>

                {enableEarlyRedemption && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      type="date"
                      label="Data do Resgate Antecipado"
                      value={earlyRedemptionDate}
                      onChange={(e) => setEarlyRedemptionDate(e.target.value)}
                      fullWidth
                    />
                    <RateInput
                      label="Taxa de Mercado no Resgate (%)"
                      value={marketRateAtRedemption}
                      onChange={(value) => setMarketRateAtRedemption(value)}
                      placeholder="0,00"
                      fullWidth
                    />
                  </div>
                )}

                <div className="mt-2 text-xs text-text-secondary">
                  ⚠️ Títulos prefixados sofrem marcação a mercado • Selic praticamente não há
                  impacto • IPCA+ impacto moderado
                </div>
              </div>

              {/* Coupon Rate for titles with coupons */}
              {(selectedBond?.type === "tesouro_prefixado_juros" ||
                selectedBond?.type === "tesouro_ipca_juros") && (
                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-3 font-semibold text-system-warning">💰 Cupons Semestrais</h4>
                  <RateInput
                    label={
                      selectedBond?.type === "tesouro_ipca_juros"
                        ? "Taxa Real dos Cupons (%)"
                        : "Taxa dos Cupons (%)"
                    }
                    value={couponRate}
                    onChange={(value) => setCouponRate(value)}
                    placeholder="0,00"
                    readOnly={!!selectedBond}
                    className={selectedBond ? "bg-neutral-surface/50" : ""}
                  />
                  {selectedBond && (
                    <p className="mt-1 text-xs text-system-info">
                      ℹ️ Taxa de cupom do título
                    </p>
                  )}
                  <p className="mt-2 text-xs text-text-secondary">
                    Os cupons são pagos a cada 6 meses até o vencimento do título.
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-3">
                  <p className="text-sm font-medium text-system-error">{error}</p>
                </div>
              )}

              {/* Botões de Ação */}
              {/* Botões */}
              <div className="margin-top-4 flex justify-center space-x-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-primary-blue-dark">
                  📊 Resultados - {result.bondName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Main Results */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-3">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Valor Final Bruto</p>
                        <div className="text-xl font-bold tabular-nums text-system-success">
                          {result.finalAmount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-3">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Valor Líquido</p>
                        <div className="text-xl font-bold tabular-nums text-growth-green">
                          {result.netAmount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-3">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-text-secondary">Rendimento Total</p>
                        <div className="text-xl font-bold tabular-nums text-system-info">
                          {result.totalYield.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coupons Summary - próximo aos resultados */}
                  {result.totalCouponsReceived > 0 && (
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <div className="text-center">
                        <p className="mb-2 text-sm text-text-secondary">
                          💰 Total em Cupons Recebidos
                        </p>
                        <div className="mb-2 text-2xl font-bold tabular-nums text-system-warning">
                          {result.totalCouponsReceived.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="rounded bg-system-warning/20 p-2">
                            <p className="text-text-secondary">Cupons</p>
                            <p className="font-bold text-system-warning">{result.coupons.length}</p>
                          </div>
                          <div className="rounded bg-system-warning/20 p-2">
                            <p className="text-text-secondary">Semestres</p>
                            <p className="font-bold text-system-warning">{result.coupons.length}</p>
                          </div>
                          <div className="rounded bg-system-warning/20 p-2">
                            <p className="text-text-secondary">Média Semestral</p>
                            <p className="font-bold text-system-warning">
                              {(result.totalCouponsReceived / result.coupons.length).toLocaleString(
                                "pt-BR",
                                { style: "currency", currency: "BRL" }
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-xs italic text-text-secondary">
                          📅 Recebidos a cada 6 meses na sua conta
                        </p>
                      </div>

                      {/* Cronograma simplificado */}
                      <div className="mt-4 overflow-x-auto">
                        <h5 className="mb-2 font-medium text-system-warning">
                          📅 Cronograma dos Cupons:
                        </h5>
                        <table className="w-full overflow-hidden rounded-lg bg-background-dark-secondary">
                          <thead className="bg-system-warning/20">
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-system-warning">
                                Semestre
                              </th>
                              <th className="px-4 py-2 text-center text-sm font-semibold text-system-warning">
                                Período
                              </th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-system-warning">
                                Valor
                              </th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-system-warning">
                                Acumulado
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.coupons.map((coupon, index) => {
                              const couponDate = new Date(coupon.paymentDate);
                              const year = couponDate.getFullYear();
                              const month = couponDate.getMonth();
                              const semesterText = month < 6 ? "1º Semestre" : "2º Semestre";

                              return (
                                <tr
                                  key={index}
                                  className="border-t border-neutral-surface-variant hover:bg-system-warning/5"
                                >
                                  <td className="px-4 py-2">
                                    <span className="font-medium text-system-warning">
                                      {index + 1}º
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-center">
                                    <span className="text-sm text-text-primary">
                                      {semesterText} {year}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <span className="text-sm font-bold text-system-success">
                                      {coupon.couponValue.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <span className="text-sm font-medium text-primary-blue-dark">
                                      {coupon.accumulatedValue.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Period and Returns */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-2 text-center">
                      <p className="text-xs text-text-secondary">Período</p>
                      <p className="text-sm font-bold text-primary-blue-dark">
                        {result.periodInYears.toFixed(1)} anos
                      </p>
                    </div>
                    <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-2 text-center">
                      <p className="text-xs text-text-secondary">Rent. Anual</p>
                      <p className="text-sm font-bold text-primary-blue-dark">
                        {result.annualizedReturn.toFixed(2)}%
                      </p>
                    </div>
                    <div className="rounded border border-system-error/20 bg-system-error/10 p-2 text-center">
                      <p className="text-xs text-text-secondary">Imposto IR</p>
                      <p className="text-sm font-bold text-system-error">
                        {result.incomeTax.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                    <div className="rounded border border-system-warning/20 bg-system-warning/10 p-2 text-center">
                      <p className="text-xs text-text-secondary">Custódia Total</p>
                      <p className="text-sm font-bold text-system-warning">
                        {result.totalCustodyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Custody Fees Breakdown */}
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-3">
                    <h5 className="mb-2 text-sm font-semibold text-system-warning">
                      💳 Detalhamento das Taxas de Custódia:
                    </h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded bg-system-warning/20 p-2">
                        <p className="text-text-secondary">Tesouro Nacional</p>
                        <p className="font-bold text-system-warning">
                          {result.treasuryCustodyFee.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                      <div className="rounded bg-system-warning/20 p-2">
                        <p className="text-text-secondary">Corretora/Banco</p>
                        <p className="font-bold text-system-warning">
                          {result.bankCustodyFee.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Indexers */}
                  {(result.selicAccumulated > 0 || result.ipcaAccumulated > 0) && (
                    <div className="rounded-lg border border-system-success/20 bg-gradient-to-r from-system-success/10 to-growth-green/10 p-3">
                      <h4 className="mb-2 text-center font-semibold text-system-success">
                        📈 Indexadores no Período
                      </h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {result.selicAccumulated > 0 && (
                          <div className="rounded border border-system-success/20 bg-system-success/10 p-3 text-center">
                            <p className="mb-1 text-xs text-text-secondary">Selic Acumulada</p>
                            <p className="text-lg font-bold text-system-success">
                              {result.selicAccumulated.toFixed(2)}%
                            </p>
                          </div>
                        )}
                        {result.ipcaAccumulated > 0 && (
                          <div className="rounded border border-growth-green/20 bg-growth-green/10 p-3 text-center">
                            <p className="mb-1 text-xs text-text-secondary">IPCA Estimado</p>
                            <p className="text-lg font-bold text-growth-green">
                              {result.ipcaAccumulated.toFixed(2)}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Early Redemption Results */}
                  {result.earlyRedemption && (
                    <div className="rounded-lg border border-growth-green/20 bg-gradient-to-r from-growth-green/10 to-system-info/10 p-4">
                      <h5 className="mb-3 text-sm font-semibold text-growth-green">
                        🔄 Simulação de Resgate Antecipado
                      </h5>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="text-center">
                          <p className="mb-1 text-xs text-text-secondary">Data do Resgate</p>
                          <p className="text-sm font-bold text-growth-green">
                            {new Date(result.earlyRedemption.redemptionDate).toLocaleDateString(
                              "pt-BR"
                            )}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-xs text-text-secondary">Taxa de Mercado</p>
                          <p className="text-sm font-bold text-system-info">
                            {result.earlyRedemption.marketRate.toFixed(2)}% a.a.
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-xs text-text-secondary">Valor Bruto</p>
                          <p className="text-sm font-bold text-primary-blue-dark">
                            {result.earlyRedemption.redemptionValue.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded bg-growth-green/20 p-3 text-center">
                          <p className="mb-1 text-xs text-text-secondary">
                            Valor Líquido do Resgate
                          </p>
                          <p className="text-lg font-bold text-growth-green">
                            {result.earlyRedemption.netRedemptionValue.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                        <div className="rounded bg-system-info/20 p-3 text-center">
                          <p className="mb-1 text-xs text-text-secondary">
                            Rentabilidade Antecipada
                          </p>
                          <p className="text-lg font-bold text-system-info">
                            {result.earlyRedemption.earlyRedemptionYield.toFixed(2)}%
                          </p>
                        </div>
                      </div>

                      {result.earlyRedemption.markToMarketGainLoss !== 0 && (
                        <div className="mt-3 rounded bg-background-dark-secondary p-3">
                          <p className="mb-1 text-xs text-text-secondary">
                            Impacto da Marcação a Mercado:
                          </p>
                          <p
                            className={`text-sm font-bold ${
                              result.earlyRedemption.markToMarketGainLoss > 0
                                ? "text-system-success"
                                : "text-system-error"
                            }`}
                          >
                            {result.earlyRedemption.markToMarketGainLoss > 0 ? "+" : ""}
                            {result.earlyRedemption.markToMarketGainLoss.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="border-2 border-system-warning bg-system-warning/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-system-warning">
                  ⚖️ Análise de Riscos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-system-error">Risco de Crédito:</div>
                      <p className="text-text-secondary">{result.riskAnalysis.creditRisk}</p>
                    </div>
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-system-warning">
                        Risco de Taxa de Juros:
                      </div>
                      <p className="text-text-secondary">{result.riskAnalysis.interestRateRisk}</p>
                    </div>
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-system-success">Risco de Liquidez:</div>
                      <p className="text-text-secondary">{result.riskAnalysis.liquidityRisk}</p>
                    </div>
                    <div className="rounded bg-background-dark-secondary p-3">
                      <div className="mb-1 font-bold text-growth-green">Risco de Inflação:</div>
                      <p className="text-text-secondary">{result.riskAnalysis.inflationRisk}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Analysis Section */}
      {result && (
        <div className="space-y-6">
          {/* Bond Characteristics */}
          <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
            <CardHeader>
              <CardTitle as="h2" className="text-xl text-primary-blue-dark">
                📋 Características do {result.bondName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-text-primary">✅ Características:</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    {result.bondInfo.characteristics.map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold text-system-success">👍 Vantagens:</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      {result.bondInfo.advantages.map((adv, index) => (
                        <li key={index}>{adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-system-error">👎 Desvantagens:</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      {result.bondInfo.disadvantages.map((disadv, index) => (
                        <li key={index}>{disadv}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-growth-green">🎯 Adequado Para:</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    {result.bondInfo.suitableFor.map((suitable, index) => (
                      <li key={index}>{suitable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Breakdown if applicable */}
          {result.monthlyBreakdown && (
            <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h2" className="text-xl text-growth-green">
                  📈 Evolução dos Aportes Mensais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-growth-green/10 p-4">
                    <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
                      <div>
                        <p className="text-sm text-text-secondary">Total Investido</p>
                        <p className="font-bold text-growth-green">
                          {result.monthlyBreakdown[
                            result.monthlyBreakdown.length - 1
                          ].accumulatedInvestment.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Valor Final</p>
                        <p className="font-bold text-growth-green">
                          {result.monthlyBreakdown[
                            result.monthlyBreakdown.length - 1
                          ].currentValue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Rendimento</p>
                        <p className="font-bold text-growth-green">
                          {result.monthlyBreakdown[
                            result.monthlyBreakdown.length - 1
                          ].return.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Meses</p>
                        <p className="font-bold text-growth-green">
                          {result.monthlyBreakdown.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Show some key monthly points */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-text-primary">📊 Marcos Importantes:</h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {/* Show months 12, 24, 36, etc. */}
                      {result.monthlyBreakdown
                        .filter((_, index) => (index + 1) % 12 === 0)
                        .slice(0, 4)
                        .map((breakdown, index) => (
                          <div
                            key={index}
                            className="rounded border border-growth-green/20 bg-background-dark-secondary p-3"
                          >
                            <div className="flex justify-between">
                              <span className="text-sm text-text-secondary">
                                Ano {breakdown.month / 12}:
                              </span>
                              <span className="font-bold text-growth-green">
                                {breakdown.currentValue.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <section aria-labelledby="guia-completo-heading">
        {/* Seção: Tesouro Direto - Guia Completo */}
        <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle
              as="h2"
              id="guia-completo-heading"
              className="text-2xl font-bold text-text-primary"
            >
              🏛️ Tesouro Direto – Guia Completo 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* O que é o Tesouro Direto */}
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                  🏛️ O que é o Tesouro Direto?
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">🔍 Conceito</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Programa que permite pessoas físicas comprarem títulos públicos federais
                      diretamente do Tesouro Nacional via internet, com segurança máxima do governo.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📊 Por que Investir</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Segurança do governo federal</li>
                      <li>• Baixo investimento mínimo (R$ 30)</li>
                      <li>• Liquidez diária</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                    <ul className="mb-4 space-y-1 text-text-secondary">
                      <li>• Risco praticamente zero</li>
                      <li>• Rentabilidade superior à poupança</li>
                      <li>• Diversas opções de títulos</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-warning">⚠️ Custos Envolvidos</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Taxa Tesouro Nacional: 0,20% a.a.</li>
                      <li>• Taxa da corretora: 0% a 0,50% a.a.</li>
                      <li>• IR regressivo: 15% a 22,5%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tipos de Títulos do Tesouro Direto */}
              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                  📈 Tipos de Títulos do Tesouro Direto
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-primary-blue-dark">📊 Tesouro Selic</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Título pós-fixado que acompanha a taxa Selic. Ideal para reserva de
                      emergência.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📈 Características</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Rentabilidade = Taxa Selic</li>
                      <li>• Baixa volatilidade</li>
                      <li>• Liquidez diária sem perda</li>
                      <li>• Proteção contra alta de juros</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">🎯 Tesouro Prefixado</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Título com taxa fixa até o vencimento. Ideal para quem quer rentabilidade
                      garantida.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-success">💡 Características</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Taxa fixa conhecida na compra</li>
                      <li>• Marcação a mercado</li>
                      <li>• Melhor em cenário de queda de juros</li>
                      <li>• Previsibilidade total no vencimento</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-3 font-semibold text-system-warning">🛡️ Tesouro IPCA+</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Título híbrido que garante rentabilidade real (IPCA + taxa fixa). Protege contra
                    inflação.
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                    <li>• Rentabilidade = IPCA + taxa real</li>
                    <li>• Proteção contra inflação</li>
                    <li>• Ideal para longo prazo (5+ anos)</li>
                    <li>• Versão com juros semestrais disponível</li>
                  </ul>
                </div>
              </div>

              {/* Dicas para Investir no Tesouro Direto */}
              <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                  💡 Dicas para Investir no Tesouro Direto
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-system-error">🚫 Erros Comuns</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Não diversificar entre tipos de títulos</li>
                      <li>• Resgatar antecipadamente sem necessidade</li>
                      <li>• Ignorar custos de custódia</li>
                      <li>• Não considerar cenário econômico</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-info">💳 Escolha da Corretora</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Prefira corretoras com taxa zero</li>
                      <li>• Verifique facilidade da plataforma</li>
                      <li>• Considere investimento mínimo</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">✅ Boas Práticas</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Começar com Tesouro Selic</li>
                      <li>• Diversificar prazos de vencimento</li>
                      <li>• Acompanhar economia regularmente</li>
                      <li>• Considerar títulos com juros</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-growth-green">
                      🎯 Estratégias Inteligentes
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Escada de vencimentos</li>
                      <li>• Aproveitar momentos de alta de juros</li>
                      <li>• Reinvestir juros automaticamente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="estrategias-heading">
        {/* Seção: Comparação de Estratégias de Investimento */}
        <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
          <CardHeader>
            <CardTitle
              as="h2"
              id="estrategias-heading"
              className="text-xl font-bold text-text-primary"
            >
              ⚖️ Comparação: Tesouro Direto vs Outros Investimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-surface-variant">
                    <th className="p-3 text-left font-semibold">Critério</th>
                    <th className="p-3 text-center font-semibold text-primary-blue-dark">
                      Tesouro Selic
                    </th>
                    <th className="p-3 text-center font-semibold text-growth-green">
                      Tesouro Prefixado
                    </th>
                    <th className="p-3 text-center font-semibold text-system-warning">
                      Tesouro IPCA+
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Indexação</td>
                    <td className="p-3 text-center text-primary-blue-dark">Taxa Selic</td>
                    <td className="p-3 text-center text-growth-green">Taxa Fixa</td>
                    <td className="p-3 text-center text-system-warning">IPCA + Taxa Real</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Volatilidade</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐ (Baixa)</td>
                    <td className="p-3 text-center">⭐⭐⭐ (Média)</td>
                    <td className="p-3 text-center">⭐⭐⭐ (Média)</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Liquidez</td>
                    <td className="p-3 text-center text-growth-green">Diária sem perda</td>
                    <td className="p-3 text-center">Marcação a mercado</td>
                    <td className="p-3 text-center">Marcação a mercado</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Valor Mínimo</td>
                    <td className="p-3 text-center">R$ 100+</td>
                    <td className="p-3 text-center">R$ 30+</td>
                    <td className="p-3 text-center">R$ 50+</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Indicado para</td>
                    <td className="p-3 text-center">Reserva emergência</td>
                    <td className="p-3 text-center">Queda de juros</td>
                    <td className="p-3 text-center">Proteção inflação</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Cenário Ideal</td>
                    <td className="p-3 text-center text-primary-blue-dark">Juros altos/estáveis</td>
                    <td className="p-3 text-center text-growth-green">Queda da Selic</td>
                    <td className="p-3 text-center text-system-warning">Alta inflação</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Iniciantes</h4>
                <p className="text-sm text-text-secondary">
                  Comece com <strong>Tesouro Selic</strong> pela alta liquidez e baixa volatilidade.
                  Perfeito para aprender sobre títulos públicos.
                </p>
              </div>

              <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                <h4 className="mb-2 font-bold text-growth-green">💰 Reserva de Emergência</h4>
                <p className="text-sm text-text-secondary">
                  Use <strong>Tesouro Selic</strong> para reserva de emergência pela liquidez diária
                  sem perda de rentabilidade.
                </p>
              </div>

              <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h4 className="mb-2 font-bold text-system-warning">📈 Longo Prazo</h4>
                <p className="text-sm text-text-secondary">
                  Combine <strong>Tesouro IPCA+</strong> para proteger da inflação com
                  <strong>Prefixado</strong> se acredita em queda de juros.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="faq-heading">
        <FAQ
          id="faq-heading"
          title="Perguntas Frequentes - Calculadora Tesouro Direto"
          items={[
            {
              question: "Qual título do Tesouro Direto é melhor para iniciantes?",
              answer:
                "<strong>Tesouro Selic é ideal para iniciantes!</strong> Tem liquidez diária sem perda, baixa volatilidade e acompanha a taxa básica de juros. É perfeito para <strong>reserva de emergência</strong> e para quem está começando a investir.",
              borderColor: "growth-green",
            },
            {
              question: "Como funciona o resgate antecipado do Tesouro Direto?",
              answer:
                "Você pode resgatar qualquer título antes do vencimento, com liquidez diária. <strong>Tesouro Selic:</strong> praticamente sem perda. <strong>Prefixado e IPCA+:</strong> sujeitos à marcação a mercado (pode ter ganho ou perda conforme variação dos juros).",
              borderColor: "primary-blue",
            },
            {
              question: "Quais são os custos para investir no Tesouro Direto?",
              answer:
                "<strong>Taxa do Tesouro Nacional:</strong> 0,20% ao ano sobre o valor investido. <strong>Taxa da corretora:</strong> varia de 0% a 0,50% ao ano. <strong>Imposto de Renda:</strong> regressivo de 15% a 22,5% sobre o rendimento.",
              borderColor: "system-info",
            },
            {
              question: "Qual valor mínimo para investir no Tesouro Direto?",
              answer:
                "<strong>A partir de R$ 30!</strong> O investimento mínimo é R$ 30 ou 1% do valor do título, o que for maior. Isso torna o Tesouro Direto acessível para qualquer pessoa começar a investir.",
              borderColor: "system-success",
            },
            {
              question: "Tesouro IPCA+ protege mesmo contra a inflação?",
              answer:
                "<strong>Sim, totalmente!</strong> O Tesouro IPCA+ garante rentabilidade real (IPCA + taxa fixa). Se a inflação for 6% e a taxa real 5%, você terá aproximadamente 11,3% de rentabilidade nominal, mantendo seu poder de compra + ganho real.",
              borderColor: "growth-green",
            },
            {
              question: "É seguro investir no Tesouro Direto?",
              answer:
                "<strong>É o investimento mais seguro do Brasil!</strong> Tem garantia do Governo Federal - quem emite o Real e cobra impostos. O risco é praticamente zero, sendo considerado <strong>'livre de risco'</strong> pelos especialistas.",
              borderColor: "primary-blue",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "Para <strong>maximizar seus ganhos no Tesouro Direto</strong>, diversifique entre tipos de títulos: 40% Tesouro Selic (liquidez), 30% IPCA+ (inflação), 30% Prefixado (se acredita em queda de juros). Reinvista os juros automaticamente!",
          }}
          footerText="<strong>Pronto para simular?</strong> Nossa calculadora usa dados oficiais do Tesouro Nacional e calcula IR, custódia e todos os custos envolvidos!"
        />

        {/* Footer com informações adicionais */}
        <Card className="mt-6 border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Como Usar Esta Calculadora de Tesouro Direto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta{" "}
                <strong className="text-primary-blue-dark">calculadora de Tesouro Direto</strong>{" "}
                utiliza <strong className="text-growth-green">dados oficiais do governo</strong>{" "}
                para simular rendimentos de títulos públicos: Selic, Prefixado e IPCA+.
              </p>
              <p>
                <strong>Funcionalidades:</strong> Selecione títulos reais disponíveis para compra,
                configure aportes mensais, simule resgate antecipado com marcação a mercado, calcule
                IR regressivo e taxas de custódia.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
                fins educacionais e simulação de cenários. Para decisões de investimento, consulte
                sempre um <strong>assessor financeiro qualificado</strong> e considere sua
                tolerância ao risco.
              </p>
              <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                🏛️ Dados oficiais • 💰 IR calculado • 🔒 Dados não armazenados • 📱 Compatível com
                todos os dispositivos • 🌙 Interface otimizada
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <RelatedCalculators category="financas" currentCalculatorId="tesouro-direto" />
    </div>
  );
}
