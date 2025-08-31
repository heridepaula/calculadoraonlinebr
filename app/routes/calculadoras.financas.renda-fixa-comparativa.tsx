import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { MoneyInput, RateInput, Input } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { ECONOMIC_INDICATORS } from "~/lib/economic-data";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const meta: MetaFunction = () => {
  return [
    {
      title: "Comparador Renda Fixa 2025 | CalculadoraOnlineBR",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      href: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
      as: "image",
      type: "image/webp",
    },
    {
      name: "description",
      content:
        "Comparador completo de renda fixa 2025: CDB vs LCI/LCA vs Tesouro Direto vs Poupança. Compare rentabilidade líquida com IR, simule cenários e descubra o melhor investimento para seu perfil.",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "publisher", content: "CalculadoraOnlineBR" },
    { name: "article:modified_time", content: "2025-08-25T00:00:00-03:00" },
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
      name: "keywords",
      content:
        "renda fixa, comparador investimentos, CDB, LCI, LCA, Tesouro Direto, poupança, simulador, Brasil",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
    },
    {
      property: "og:title",
      content: "Comparador Renda Fixa 2025 | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "Comparador completo de renda fixa 2025: CDB vs LCI/LCA vs Tesouro Direto vs Poupança. Compare rentabilidade líquida com IR e descubra o melhor investimento.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Comparador de Renda Fixa - Compare CDB, LCI, LCA, Tesouro Direto e Poupança com impostos",
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
      content:
        "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:article:modified_time", content: "2025-08-25T00:00:00-03:00" },
    { property: "og:article:publisher", content: "https://www.facebook.com/CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Comparador Renda Fixa 2025 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "Compare CDB, LCI/LCA, Tesouro Direto e Poupança com cálculos reais de IR. Descubra qual investimento oferece melhor rentabilidade líquida para seu perfil.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Comparador Renda Fixa - Compare investimentos e impostos",
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
        name: "Comparador de Renda Fixa - Simulador de Investimentos 2025",
        description:
          "Comparador gratuito de renda fixa: CDB, LCI, LCA, Tesouro Direto e Poupança. Compare rendimentos com impostos e encontre o melhor investimento.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-25",
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
        author: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
          name: "Comparador de Renda Fixa 2025 - Simulador Completo",
          description:
            "Compare CDB, LCI/LCA, Tesouro Direto e Poupança com cálculos precisos de IR. Descubra o investimento com melhor rentabilidade líquida.",
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
                name: "Comparador Renda Fixa",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/renda-fixa-comparativa",
              },
            ],
          },
        },
        about: {
          "@type": "FinancialProduct",
          name: "Comparação de Renda Fixa",
          description:
            "Ferramenta para comparar rentabilidade líquida entre diferentes investimentos de renda fixa: CDB, LCI/LCA, Tesouro Direto e Poupança",
          category: "Investment Analysis",
        },
        featureList: [
          "Comparação entre CDB, LCI/LCA, Tesouro Direto e Poupança",
          "Cálculo de rentabilidade líquida com IR regressivo",
          "Simulação com taxas personalizáveis por produto",
          "Análise de qual investimento oferece melhor retorno",
          "Tabela comparativa detalhada com impostos",
          "Cálculo baseado em juros compostos reais",
          "Simulação por diferentes prazos em dias",
          "Interface otimizada para mobile",
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
            name: "Qual é o melhor investimento em renda fixa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não existe um 'melhor' investimento único. Depende do seu perfil, prazo e objetivos. Para reserva de emergência, LCI/LCA com liquidez diária são ideais. Para longo prazo, CDB com boa rentabilidade ou Tesouro IPCA+ podem ser melhores opções.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona a tabela regressiva do Imposto de Renda?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O IR sobre renda fixa diminui conforme o tempo: até 180 dias = 22,5%; 181-360 dias = 20%; 361-720 dias = 17,5%; acima de 720 dias = 15%. Investimentos mais longos têm menor tributação.",
            },
          },
          {
            "@type": "Question",
            name: "LCI/LCA valem a pena mesmo com rentabilidade menor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, pois são isentas de IR. Uma LCI a 86% do CDI pode render mais líquido que um CDB a 110% do CDI (tributado), especialmente em prazos menores onde o IR é maior.",
            },
          },
          {
            "@type": "Question",
            name: "Como diversificar investimentos em renda fixa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Diversifique por prazos (curto, médio e longo), tipos de investimento (CDB, LCI/LCA, Tesouro), e emissor (diferentes bancos). Mantenha parte em produtos com liquidez diária para emergências.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como Comparar Investimentos em Renda Fixa",
        description:
          "Passo a passo para comparar CDB, LCI/LCA, Tesouro Direto e Poupança e encontrar o melhor investimento",
        image: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
        totalTime: "PT3M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "BRL",
          value: "0",
        },
        tool: [
          {
            "@type": "HowToTool",
            name: "Comparador de Renda Fixa Online",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Inserir valor a investir",
            text: "Digite o valor que deseja investir para comparar as opções",
            image: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
          },
          {
            "@type": "HowToStep",
            name: "Definir prazo do investimento",
            text: "Informe o prazo em dias que pretende manter o investimento",
          },
          {
            "@type": "HowToStep",
            name: "Configurar taxas dos produtos",
            text: "Ajuste as rentabilidades de CDB, LCI/LCA e Tesouro Direto conforme ofertado",
          },
          {
            "@type": "HowToStep",
            name: "Comparar resultados",
            text: "Clique em 'Calcular' para ver qual investimento oferece melhor rentabilidade líquida",
          },
        ],
      }),
    },
  ];
};

type PeriodType = "days";

interface InvestmentOption {
  id: string;
  name: string;
  rate: number;
  rateType: "percentage_cdi" | "fixed_rate";
  hasIRExemption: boolean;
}

interface ComparisonResult {
  investment: InvestmentOption;
  finalAmount: number;
  totalInterest: number;
  netAmount: number;
  netInterest: number;
  irAmount: number;
  effectiveRate: number;
}

interface FixedIncomeComparisonResult {
  initialAmount: number;
  period: number;
  cdiRate: number;
  results: ComparisonResult[];
}

interface ValidationErrors {
  investedAmount?: string;
  period?: string;
}

export default function FixedIncomeComparison() {
  const [investedAmount, setInvestedAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [cdbRate, setCdbRate] = useState("100");
  const [lciLcaRate, setLciLcaRate] = useState("86");
  const [tesouroSelicRate, setTesouroSelicRate] = useState("14.25");
  const [tesouroIpcaRate, setTesouroIpcaRate] = useState("11.0");
  const [result, setResult] = useState<FixedIncomeComparisonResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Função para criar opções de investimento baseadas nos inputs do usuário
  const getInvestmentOptions = (): InvestmentOption[] => [
    {
      id: "poupanca",
      name: "Poupança",
      rate: 70, // 70% do CDI (fixo)
      rateType: "percentage_cdi",
      hasIRExemption: true,
    },
    {
      id: "cdb",
      name: "CDB",
      rate: parseFloat(cdbRate.replace(",", ".")) || 100,
      rateType: "percentage_cdi",
      hasIRExemption: false,
    },
    {
      id: "lci_lca",
      name: "LCI/LCA",
      rate: parseFloat(lciLcaRate.replace(",", ".")) || 86,
      rateType: "percentage_cdi",
      hasIRExemption: true,
    },
    {
      id: "tesouro_selic",
      name: "Tesouro Selic",
      rate: parseFloat(tesouroSelicRate.replace(",", ".")) || 14.25,
      rateType: "fixed_rate",
      hasIRExemption: false,
    },
    {
      id: "tesouro_ipca",
      name: "Tesouro IPCA+",
      rate: parseFloat(tesouroIpcaRate.replace(",", ".")) || 11.0,
      rateType: "fixed_rate",
      hasIRExemption: false,
    },
  ];
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "renda-fixa-comparativa",
    category: "financas",
  });
  useFormTracking("renda-fixa-comparativa");

  // Inicializar valores padrão
  useEffect(() => {
    if (!period) {
      setPeriod("365"); // 1 ano como padrão
    }
    if (!cdbRate) {
      setCdbRate("100");
    }
    if (!lciLcaRate) {
      setLciLcaRate("86");
    }
    if (!tesouroSelicRate) {
      setTesouroSelicRate("14.25");
    }
    if (!tesouroIpcaRate) {
      setTesouroIpcaRate("11.0");
    }
  }, []);

  const currencyBR = (v: number) => {
    if (isNaN(v) || !isFinite(v)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
  };
  const percentBR = (v: number, digits = 2) => {
    if (isNaN(v) || !isFinite(v)) return "0,00";
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
  };

  const parseMoney = (v: string | number): number => {
    const s = String(v ?? "");
    const normalized = s.replace(/\./g, "").replace(",", ".");
    const n = parseFloat(normalized);
    return isNaN(n) ? 0 : n;
  };
  const parseRate = (v: string | number): number => parseMoney(v) / 100;

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const amount = parseMoney(investedAmount);
    if (amount <= 0) {
      newErrors.investedAmount = "Valor investido obrigatório e maior que 0";
      ok = false;
    }

    const periodDays = parseInt(period, 10);
    if (!period || isNaN(periodDays) || periodDays <= 0) {
      newErrors.period = "Prazo em dias obrigatório e maior que 0";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  // Função para calcular IR baseado na tabela regressiva
  const calculateIRRate = (days: number): number => {
    if (days <= 180) return 22.5; // Até 180 dias: 22,5%
    if (days <= 360) return 20.0; // 181 a 360 dias: 20%
    if (days <= 720) return 17.5; // 361 a 720 dias: 17,5%
    return 15.0; // Acima de 720 dias: 15%
  };

  const calculateInvestmentResult = (
    amount: number,
    option: InvestmentOption,
    periodDays: number,
    cdiRate: number
  ): ComparisonResult => {
    let effectiveAnnualRate: number;

    if (option.rateType === "percentage_cdi") {
      effectiveAnnualRate = cdiRate * (option.rate / 100);
    } else {
      effectiveAnnualRate = option.rate / 100;
    }

    // Taxa diária composta
    const dailyRate = Math.pow(1 + effectiveAnnualRate, 1 / 252) - 1;

    // Cálculo do montante final
    const finalAmount = amount * Math.pow(1 + dailyRate, periodDays);
    const totalInterest = finalAmount - amount;

    // Cálculo do IR se aplicável
    let irAmount = 0;
    let netAmount = finalAmount;
    let netInterest = totalInterest;

    if (!option.hasIRExemption) {
      const irRate = calculateIRRate(periodDays);
      irAmount = totalInterest * (irRate / 100);
      netAmount = finalAmount - irAmount;
      netInterest = totalInterest - irAmount;
    }

    return {
      investment: option,
      finalAmount,
      totalInterest,
      netAmount,
      netInterest,
      irAmount,
      effectiveRate: effectiveAnnualRate,
    };
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");

    try {
      const amount = parseMoney(investedAmount);
      const periodDays = parseInt(period, 10);

      // Taxa CDI atual (baseada na SELIC)
      const currentCdiRate = ECONOMIC_INDICATORS.SELIC.rate / 100;

      // Calcular resultado para cada opção de investimento
      const investmentOptions = getInvestmentOptions();
      const results = investmentOptions.map((option) =>
        calculateInvestmentResult(amount, option, periodDays, currentCdiRate)
      );

      // Ordenar por rentabilidade líquida (maior para menor)
      results.sort((a, b) => b.netAmount - a.netAmount);

      const comparisonResult: FixedIncomeComparisonResult = {
        initialAmount: amount,
        period: periodDays,
        cdiRate: currentCdiRate,
        results,
      };

      setResult(comparisonResult);
      setErrors({});
      setCurrentPage(1);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ investedAmount: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setInvestedAmount("");
    setPeriod("");
    setCdbRate("100");
    setLciLcaRate("86");
    setTesouroSelicRate("14.25");
    setTesouroIpcaRate("11.5");
    setResult(null);
    setErrors({});
    setCurrentPage(1);
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Renda Fixa Comparativa</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Comparador de Renda Fixa 2025 – Compare Investimentos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Compare{" "}
          <strong className="text-growth-green">CDB, LCI/LCA, Tesouro Direto e Poupança</strong> com
          cálculos reais de IR. Descubra{" "}
          <strong className="text-primary-blue-dark">
            qual investimento oferece melhor retorno líquido
          </strong>{" "}
          para seu perfil e prazo.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🏦 <strong>IR Regressivo</strong> • 📈 <strong>Baseado no CDI</strong> • 💰{" "}
            <strong>Garantia do FGC</strong> • ⏰ <strong>Menor IR = Maior Prazo</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Comparação de Renda Fixa</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Linha 1: Valor a ser investido */}
          <div className="mb-6">
            <div>
              <MoneyInput
                label="Valor a Investir"
                value={investedAmount}
                onChange={setInvestedAmount}
                placeholder="10.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.investedAmount} />
              <div className="mt-1 text-xs text-text-secondary">
                Valor que deseja investir para comparar as opções
              </div>
            </div>
          </div>

          {/* Linha 2: Período */}
          <div className="mb-6">
            <div>
              <Input
                type="number"
                label="Prazo (dias)"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="365"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.period} />
              <div className="mt-1 text-xs text-text-secondary">
                Prazo do investimento em dias corridos
                <span className="ml-2 text-system-info">
                  (CDI atual: {ECONOMIC_INDICATORS.SELIC.rate.toFixed(2)}% a.a.)
                </span>
              </div>
            </div>
          </div>

          {/* Linha 3: Configuração das taxas */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              ⚙️ Configure as Rentabilidades
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Input
                  type="text"
                  label="CDB (% do CDI)"
                  value={cdbRate}
                  onChange={(e) => setCdbRate(e.target.value)}
                  placeholder="100"
                  fullWidth
                  className="h-12 text-lg"
                />
                <div className="mt-1 text-xs text-text-secondary">
                  Percentual do CDI oferecido pelo CDB
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  label="LCI/LCA (% do CDI)"
                  value={lciLcaRate}
                  onChange={(e) => setLciLcaRate(e.target.value)}
                  placeholder="86"
                  fullWidth
                  className="h-12 text-lg"
                />
                <div className="mt-1 text-xs text-text-secondary">
                  Percentual do CDI oferecido por LCI/LCA
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  label="Tesouro Selic (% a.a.)"
                  value={tesouroSelicRate}
                  onChange={(e) => setTesouroSelicRate(e.target.value)}
                  placeholder="14.25"
                  fullWidth
                  className="h-12 text-lg"
                />
                <div className="mt-1 text-xs text-text-secondary">
                  Taxa anual do Tesouro Selic (atual: ~14,25%)
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  label="Tesouro IPCA+ (% a.a.)"
                  value={tesouroIpcaRate}
                  onChange={(e) => setTesouroIpcaRate(e.target.value)}
                  placeholder="11.0"
                  fullWidth
                  className="h-12 text-lg"
                />
                <div className="mt-1 text-xs text-text-secondary">
                  Taxa anual do Tesouro IPCA+ (atual: ~11,0%)
                </div>
              </div>
            </div>
          </div>

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
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <Card ref={resultRef as any} className="border-2 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              📊 Comparação de Investimentos em Renda Fixa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Resumo Geral */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="text-2xl font-bold text-primary-blue">
                  {currencyBR(result.initialAmount)}
                </div>
                <div className="text-sm text-text-secondary">Valor Investido</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="text-2xl font-bold text-system-info">{result.period} dias</div>
                <div className="text-sm text-text-secondary">Período</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-4 text-center">
                <div className="text-2xl font-bold text-system-warning">
                  {(result.cdiRate * 100).toFixed(2)}%
                </div>
                <div className="text-sm text-text-secondary">CDI Atual (a.a.)</div>
              </div>
            </div>

            {/* Tabela de Comparação */}
            <div className="overflow-x-auto">
              <table className="bg-background-primary w-full rounded-lg">
                <thead>
                  <tr className="border-b border-neutral-surface-variant bg-gray-800">
                    <th className="p-3 text-left text-sm font-semibold text-text-primary">
                      Investimento
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-text-primary">
                      Rentabilidade
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-text-primary">
                      Montante Bruto
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-text-primary">IR</th>
                    <th className="p-3 text-right text-sm font-semibold text-text-primary">
                      Montante Líquido
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-text-primary">
                      Rendimento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((item, index) => (
                    <tr
                      key={item.investment.id}
                      className={`border-b border-neutral-surface-variant ${
                        index === 0
                          ? "border-l-4 border-l-growth-green bg-gradient-to-r from-growth-green/20 to-growth-green/10"
                          : "hover:bg-gray-800/50"
                      }`}
                    >
                      <td className="p-3">
                        <div
                          className={`font-semibold ${index === 0 ? "text-growth-green" : "text-text-primary"}`}
                        >
                          {index === 0 && <span className="mr-2">🏆</span>}
                          {item.investment.name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {item.investment.rateType === "percentage_cdi"
                            ? `${item.investment.rate}% do CDI`
                            : `${item.investment.rate}% a.a.`}
                          {item.investment.hasIRExemption && (
                            <span className="ml-1 text-growth-green">• Isento IR</span>
                          )}
                          {index === 0 && (
                            <span className="ml-1 font-semibold text-growth-green">
                              MELHOR OPÇÃO
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div
                          className={`font-semibold ${index === 0 ? "text-growth-green" : "text-text-primary"}`}
                        >
                          {(item.effectiveRate * 100).toFixed(2)}% a.a.
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div
                          className={`font-semibold ${index === 0 ? "text-growth-green" : "text-text-primary"}`}
                        >
                          {currencyBR(item.finalAmount)}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="font-semibold text-system-error">
                          {item.irAmount > 0 ? currencyBR(item.irAmount) : "-"}
                        </div>
                        {item.irAmount > 0 && (
                          <div className="text-xs text-text-secondary">
                            {calculateIRRate(result.period)}% IR
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div
                          className={`text-lg font-bold ${index === 0 ? "text-xl text-growth-green" : "text-growth-green"}`}
                        >
                          {currencyBR(item.netAmount)}
                          {index === 0 && <span className="ml-2 text-sm">🏆</span>}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div
                          className={`font-semibold ${index === 0 ? "text-growth-green" : "text-primary-blue"}`}
                        >
                          {currencyBR(item.netInterest)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Análise da Melhor Opção */}
            <div className="mt-6 rounded-lg bg-growth-green/10 p-4">
              <h4 className="mb-3 font-semibold text-growth-green">
                🏆 Melhor Opção: {result.results[0].investment.name}
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm text-text-secondary">Diferença para o 2º colocado:</div>
                  <div className="text-lg font-bold text-growth-green">
                    +{" "}
                    {currencyBR(result.results[0].netAmount - (result.results[1]?.netAmount || 0))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">Vantagem fiscal:</div>
                  <div className="text-lg font-bold text-primary-blue">
                    {result.results[0].investment.hasIRExemption
                      ? "Isento de Imposto de Renda"
                      : `IR: ${currencyBR(result.results[0].irAmount)}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Explicação da Tabela Regressiva de IR */}
            <div className="mt-6 rounded-lg border-l-4 border-system-info bg-system-info/10 p-4">
              <h4 className="mb-3 font-semibold text-system-info">
                📊 Tabela Regressiva do Imposto de Renda
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <div
                  className={`rounded p-2 ${result.period <= 180 ? "border border-system-error bg-system-error/20" : "bg-gray-800"}`}
                >
                  <div className="text-sm font-semibold text-text-primary">Até 180 dias</div>
                  <div
                    className={`text-lg font-bold ${result.period <= 180 ? "text-system-error" : "text-text-secondary"}`}
                  >
                    22,5%
                  </div>
                </div>
                <div
                  className={`rounded p-2 ${result.period > 180 && result.period <= 360 ? "border border-system-warning bg-system-warning/20" : "bg-gray-800"}`}
                >
                  <div className="text-sm font-semibold text-text-primary">181 - 360 dias</div>
                  <div
                    className={`text-lg font-bold ${result.period > 180 && result.period <= 360 ? "text-system-warning" : "text-text-secondary"}`}
                  >
                    20,0%
                  </div>
                </div>
                <div
                  className={`rounded p-2 ${result.period > 360 && result.period <= 720 ? "border border-primary-blue bg-primary-blue/20" : "bg-gray-800"}`}
                >
                  <div className="text-sm font-semibold text-text-primary">361 - 720 dias</div>
                  <div
                    className={`text-lg font-bold ${result.period > 360 && result.period <= 720 ? "text-primary-blue" : "text-text-secondary"}`}
                  >
                    17,5%
                  </div>
                </div>
                <div
                  className={`rounded p-2 ${result.period > 720 ? "border border-growth-green bg-growth-green/20" : "bg-gray-800"}`}
                >
                  <div className="text-sm font-semibold text-text-primary">Acima de 720 dias</div>
                  <div
                    className={`text-lg font-bold ${result.period > 720 ? "text-growth-green" : "text-text-secondary"}`}
                  >
                    15,0%
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                💡 <strong>Seu período:</strong> {result.period} dias •{" "}
                <strong>IR aplicado:</strong> {calculateIRRate(result.period)}%
                {result.period <= 720 &&
                  ` • Para chegar a ${result.period > 360 ? "15%" : result.period > 180 ? "17,5%" : "20%"}, invista por ${result.period > 360 ? "720+" : result.period > 180 ? "361+" : "181+"} dias`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Renda Fixa - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Renda Fixa – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Renda Fixa */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🏦 Conceito de Investimentos em Renda Fixa
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Renda fixa são investimentos onde você empresta dinheiro e recebe de volta com
                    juros. O retorno é mais previsível que na renda variável, sendo ideal para
                    reserva de emergência e diversificação de carteira.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Rentabilidade mais previsível</li>
                    <li>• Diferentes prazos de vencimento</li>
                    <li>• Garantia do FGC até R$ 250 mil</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Segurança e estabilidade</li>
                    <li>• Previsibilidade de retornos</li>
                    <li>• Proteção contra volatilidade</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Fatores Importantes</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Tributação de Imposto de Renda</li>
                    <li>• Inflação pode corroer ganhos</li>
                    <li>• Liquidez varia por produto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tipos de Investimentos */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📈 Principais Tipos de Investimentos em Renda Fixa
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    🏦 CDB (Certificado de Depósito Bancário)
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Título emitido por bancos com rentabilidade baseada no CDI. Possui garantia do
                    FGC e diferentes prazos de vencimento.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">🏠 LCI/LCA</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Isenção de Imposto de Renda</li>
                    <li>• Lastreados em crédito imobiliário/agronegócio</li>
                    <li>• Rentabilidade baseada no CDI</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🏛️ Tesouro Direto</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Títulos do governo federal com alta segurança. Tesouro Selic acompanha a taxa
                    básica de juros, enquanto IPCA+ protege contra inflação.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">💰 Poupança</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Isenção de IR e liquidez diária</li>
                    <li>• Rentabilidade limitada (70% do CDI)</li>
                    <li>• Garantia do FGC</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Estratégias de Investimento */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🎯 Estratégias para Otimizar Investimentos em Renda Fixa
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    📊 Diversificação de Prazos
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Distribua investimentos em diferentes vencimentos para aproveitar melhores
                    oportunidades e manter liquidez escalonada.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">
                    ⚖️ Balanceamento Tributário
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Combine produtos isentos e tributados</li>
                    <li>• Aproveite prazo para reduzir IR</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">🔄 Reinvestimento</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Aproveite juros compostos</li>
                    <li>• Reavalie opções periodicamente</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">
                    📈 Acompanhamento de Mercado
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Monitor taxa Selic e inflação</li>
                    <li>• Ajuste estratégia conforme cenário</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Produtos de Renda Fixa */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Comparação: Produtos de Renda Fixa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">CDB</th>
                  <th className="p-3 text-center font-semibold text-growth-green">LCI/LCA</th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Tesouro Direto
                  </th>
                  <th className="p-3 text-center font-semibold text-system-info">Poupança</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Imposto de Renda</td>
                  <td className="p-3 text-center text-system-error">15% a 22,5%</td>
                  <td className="p-3 text-center text-growth-green">Isento</td>
                  <td className="p-3 text-center text-system-error">15% a 22,5%</td>
                  <td className="p-3 text-center text-growth-green">Isento</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Garantia FGC</td>
                  <td className="p-3 text-center text-growth-green">Até R$ 250 mil</td>
                  <td className="p-3 text-center text-growth-green">Até R$ 250 mil</td>
                  <td className="p-3 text-center text-system-info">Governo Federal</td>
                  <td className="p-3 text-center text-growth-green">Até R$ 250 mil</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Rentabilidade Típica</td>
                  <td className="p-3 text-center">95-120% CDI</td>
                  <td className="p-3 text-center">80-100% CDI</td>
                  <td className="p-3 text-center">Selic ou IPCA+</td>
                  <td className="p-3 text-center">70% CDI</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Liquidez</td>
                  <td className="p-3 text-center">Varia por produto</td>
                  <td className="p-3 text-center">Carência comum</td>
                  <td className="p-3 text-center">Diária (Selic)</td>
                  <td className="p-3 text-center">Diária</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Valor Mínimo</td>
                  <td className="p-3 text-center">Varia por banco</td>
                  <td className="p-3 text-center">R$ 1.000+</td>
                  <td className="p-3 text-center">R$ 30+</td>
                  <td className="p-3 text-center">Qualquer valor</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Complexidade</td>
                  <td className="p-3 text-center text-system-warning">Média</td>
                  <td className="p-3 text-center text-system-warning">Média</td>
                  <td className="p-3 text-center text-primary-blue-dark">Baixa</td>
                  <td className="p-3 text-center text-growth-green">Muito baixa</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Iniciantes</h4>
              <p className="text-sm text-text-secondary">
                Comece com <strong>Tesouro Selic</strong> para aprender sobre renda fixa com alta
                liquidez e segurança máxima.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">💰 Reserva de Emergência</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>LCI/LCA</strong> com liquidez diária ou Tesouro Selic para manter
                reservas isentas de IR com boa rentabilidade.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">📈 Maximizar Ganhos</h4>
              <p className="text-sm text-text-secondary">
                Diversifique entre <strong>CDB premium, LCI/LCA e Tesouro IPCA+</strong>
                para otimizar rentabilidade líquida.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Comparador de Renda Fixa"
        items={[
          {
            question: "Qual é o melhor investimento em renda fixa?",
            answer:
              "Não existe um 'melhor' investimento único. Depende do seu perfil, prazo e objetivos. Para reserva de emergência, LCI/LCA com liquidez diária são ideais. Para longo prazo, CDB com boa rentabilidade ou Tesouro IPCA+ podem ser melhores opções.",
            borderColor: "primary-blue",
          },
          {
            question: "Como funciona a tabela regressiva do Imposto de Renda?",
            answer:
              "O IR sobre renda fixa diminui conforme o tempo: até 180 dias = 22,5%; 181-360 dias = 20%; 361-720 dias = 17,5%; acima de 720 dias = 15%. Investimentos mais longos têm menor tributação.",
            borderColor: "growth-green",
          },
          {
            question: "LCI/LCA valem a pena mesmo com rentabilidade menor?",
            answer:
              "Sim, pois são isentas de IR. Uma LCI a 86% do CDI pode render mais líquido que um CDB a 110% do CDI (tributado), especialmente em prazos menores onde o IR é maior.",
            borderColor: "system-info",
          },
          {
            question: "Tesouro Selic ou Tesouro IPCA+, qual escolher?",
            answer:
              "Tesouro Selic para reserva de emergência (liquidez diária e acompanha a Selic). Tesouro IPCA+ para proteção contra inflação em investimentos de longo prazo (mínimo 2-3 anos).",
            borderColor: "system-warning",
          },
          {
            question: "A poupança ainda vale a pena?",
            answer:
              "A poupança rende apenas 70% do CDI e tem regras específicas de aniversário. Com CDI alto, outros investimentos isentos como LCI/LCA ou Tesouro Selic oferecem melhor rentabilidade com mesma segurança.",
            borderColor: "growth-green",
          },
          {
            question: "Como diversificar investimentos em renda fixa?",
            answer:
              "Diversifique por prazos (curto, médio e longo), tipos de investimento (CDB, LCI/LCA, Tesouro), e emissor (diferentes bancos). Mantenha parte em produtos com liquidez diária para emergências.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Renda Fixa",
          content:
            "<strong>Para otimizar resultados:</strong> combine produtos isentos de IR (LCI/LCA) com tributados de alta rentabilidade (CDB premium), considerando sempre prazo e liquidez necessários.",
        }}
        footerText="<strong>Lembre-se:</strong> Renda fixa não é sinônimo de baixa rentabilidade. Com escolha inteligente e diversificação adequada, pode superar a inflação e preservar seu poder de compra."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Comparador de Renda Fixa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este{" "}
              <strong className="text-primary-blue-dark">
                comparador de investimentos em renda fixa
              </strong>{" "}
              utiliza{" "}
              <strong className="text-growth-green">cálculos reais de juros compostos</strong> e{" "}
              <strong className="text-system-warning">tabela regressiva do IR</strong> para
              determinar qual investimento oferece melhor rentabilidade líquida.
            </p>
            <p>
              <strong>Funcionalidades disponíveis:</strong> Compare CDB, LCI/LCA, Tesouro Direto e
              Poupança configurando taxas personalizadas, visualize impacto do IR por prazo, analise
              qual investimento oferece melhor retorno líquido, e entenda as diferenças entre cada
              produto.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e simulação de cenários. Para decisões de investimento, considere
              sempre <strong>análise de risco, liquidez necessária</strong> e consulte um assessor
              financeiro qualificado.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              💰 Juros compostos • 📊 IR regressivo • 🔒 Dados não armazenados • 📱 Compatível com
              todos os dispositivos • 🌙 Interface otimizada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="renda-fixa-comparativa" />
    </div>
  );
}
