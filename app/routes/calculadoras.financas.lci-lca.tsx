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
      title: `Calculadora de LCI e LCA 2026 | ${APP_NAME}`,
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
        "Calcule rendimentos LCI e LCA isentos de IR. Simule investimentos baseados no CDI e compare rentabilidade. Grátis e atualizada.",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
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
      content: "LCI, LCA, calculadora, investimentos, CDI, renda fixa, isento IR, Brasil",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
    },
    {
      property: "og:title",
      content: "LCI e LCA 2026 – Simulador Isenção IR",
    },
    {
      property: "og:description",
      content:
        "Calcule rendimentos LCI e LCA isentos de IR. Simule investimentos baseados no CDI e compare rentabilidade. Grátis e atualizada.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de LCI e LCA - Simule rendimentos de investimentos isentos de IR baseados no CDI",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:article:modified_time", content: "2025-08-25T00:00:00-03:00" },
    { property: "og:article:publisher", content: "https://www.facebook.com/CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "LCI e LCA 2026 – Simulador Isenção IR",
    },
    {
      name: "twitter:description",
      content:
        "Calcule rendimentos LCI e LCA isentos de IR. Simule investimentos baseados no CDI e compare rentabilidade. Grátis e atualizada.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de LCI e LCA - Simule rendimentos isentos de IR",
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
        name: "Calculadora de LCI e LCA - Simulador de Rendimentos 2026",
        description:
          "Calculadora gratuita de LCI e LCA com cálculos baseados no CDI. Simule rendimentos isentos de IR, compare opções e otimize seus investimentos.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
          name: "Calculadora de LCI e LCA 2026 - Simulador Completo",
          description:
            "Simule rendimentos de LCI e LCA baseados no CDI. Calcule ganhos isentos de IR, compare rentabilidade e tome decisões de investimento mais inteligentes.",
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
                name: "Calculadora de LCI e LCA",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/lci-lca",
              },
            ],
          },
        },
        about: {
          "@type": "MathematicalConcept",
          name: "LCI e LCA",
          description:
            "Letras de Crédito Imobiliário e do Agronegócio - investimentos de renda fixa isentos de IR para pessoa física",
          category: "Financial Mathematics",
        },
        featureList: [
          "Simulação de rendimentos LCI/LCA baseados no CDI",
          "Cálculo de rentabilidade isenta de IR",
          "Comparação com outros investimentos",
          "Tabela detalhada de evolução diária",
          "Gráficos de crescimento do capital",
          "Cálculo baseado em percentual do CDI",
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
            name: "O que são LCI e LCA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são títulos de renda fixa isentos de IR para pessoa física, lastreados por créditos imobiliários e do agronegócio.",
            },
          },
          {
            "@type": "Question",
            name: "Como é calculado o rendimento de LCI e LCA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O rendimento é calculado com base em um percentual do CDI, usando juros compostos. Fórmula: M = C × (1 + CDI × percentual)^t, sendo isento de Imposto de Renda.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre LCI e LCA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LCI é lastreada em créditos imobiliários e LCA em créditos do agronegócio. Ambas têm características similares: isenção de IR, garantia do FGC até R$ 250 mil e rentabilidade atrelada ao CDI.",
            },
          },
          {
            "@type": "Question",
            name: "Qual percentual do CDI devo usar na simulação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LCI/LCA geralmente oferecem entre 80% a 120% do CDI. Grandes bancos: 80-95% do CDI. Bancos médios/digitais: 90-110% do CDI. Corretoras: 95-120% do CDI.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como Calcular Rendimentos de LCI e LCA",
        description:
          "Passo a passo para simular rendimentos de investimentos em LCI e LCA com base no CDI",
        image: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
        totalTime: "PT2M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "BRL",
          value: "0",
        },
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora de LCI e LCA Online",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Inserir valor a investir",
            text: "Digite o valor que deseja aplicar em LCI ou LCA",
            image: "https://www.calculadoraonlinebr.com.br/images/calculadora-lci-lca.webp",
          },
          {
            "@type": "HowToStep",
            name: "Definir percentual do CDI",
            text: "Informe o percentual do CDI oferecido pela instituição financeira",
          },
          {
            "@type": "HowToStep",
            name: "Escolher prazo em dias",
            text: "Selecione o prazo de vencimento da LCI/LCA em dias corridos",
          },
          {
            "@type": "HowToStep",
            name: "Calcular rendimentos",
            text: "Clique em 'Calcular' para ver o resultado completo com evolução diária",
          },
        ],
      }),
    },
  ];
};

type PeriodType = "days";

interface DailyData {
  day: number;
  balance: number;
  dailyInterest: number;
  totalInterest: number;
}

interface LciLcaResult {
  finalAmount: number;
  totalInterest: number;
  initialAmount: number;
  cdiRate: number;
  cdiPercentage: number;
  effectiveRate: number;
  days: number;
  dailyData: DailyData[];
}

interface ValidationErrors {
  investedAmount?: string;
  cdiPercentage?: string;
  days?: string;
}

export default function LciLcaCalculator() {
  const [investedAmount, setInvestedAmount] = useState("");
  const [cdiPercentage, setCdiPercentage] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<LciLcaResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "lci-lca",
    category: "financas",
  });
  useFormTracking("lci-lca");

  // Função para obter percentual padrão do CDI
  const getDefaultCdiPercentage = (): string => {
    return "100"; // 100% do CDI como padrão
  };

  // Inicializa o percentual do CDI
  useEffect(() => {
    if (!cdiPercentage) {
      setCdiPercentage(getDefaultCdiPercentage());
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
    const percentage = parseFloat(cdiPercentage.replace(",", "."));
    if (percentage <= 0) {
      newErrors.cdiPercentage = "Percentual do CDI deve ser maior que 0";
      ok = false;
    }
    const numberOfDays = parseInt(days, 10);
    if (!days || isNaN(numberOfDays) || numberOfDays <= 0) {
      newErrors.days = "Prazo em dias obrigatório e maior que 0";
      ok = false;
    }
    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const amount = parseMoney(investedAmount);
      const cdiPercent = parseFloat(cdiPercentage.replace(",", ".")) / 100;
      const numberOfDays = parseInt(days, 10);

      // Taxa CDI atual (baseada na SELIC)
      const currentCdiRate = ECONOMIC_INDICATORS.SELIC.rate / 100; // CDI aproximadamente igual à SELIC
      const effectiveAnnualRate = currentCdiRate * cdiPercent;

      // Verificar se as taxas são válidas
      if (!isFinite(currentCdiRate) || !isFinite(effectiveAnnualRate)) {
        throw new Error("Taxa inválida");
      }

      const dailyRate = Math.pow(1 + effectiveAnnualRate, 1 / 252) - 1; // 252 dias úteis no ano

      // Calcular evolução dia a dia para LCI/LCA
      const dailyData: DailyData[] = [];
      let currentBalance = amount;
      let totalInterest = 0;

      for (let day = 1; day <= numberOfDays; day++) {
        const dailyInterest = currentBalance * dailyRate;
        currentBalance = currentBalance + dailyInterest;
        totalInterest += dailyInterest;

        dailyData.push({
          day,
          balance: currentBalance,
          dailyInterest,
          totalInterest,
        });
      }

      const finalAmount = currentBalance;

      // Verificar se todos os valores são válidos
      if (!isFinite(finalAmount) || !isFinite(totalInterest)) {
        throw new Error("Valores calculados inválidos");
      }

      const res: LciLcaResult = {
        finalAmount,
        totalInterest,
        initialAmount: amount,
        cdiRate: currentCdiRate * 100,
        cdiPercentage: cdiPercent * 100,
        effectiveRate: effectiveAnnualRate * 100,
        days: numberOfDays,
        dailyData,
      };

      setResult(res);
      setErrors({});
      setCurrentPage(1); // Reset pagination quando há novo cálculo
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
    setCdiPercentage(getDefaultCdiPercentage());
    setDays("");
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
        <BreadcrumbItem isLast>LCI e LCA</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de LCI e LCA 2026 – Simulador de Rendimentos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule os <strong className="text-growth-green">rendimentos de LCI e LCA</strong> isentos
          de IR. Simule investimentos baseados no CDI e descubra{" "}
          <strong className="text-primary-blue-dark">quanto seu dinheiro vai render</strong> livre
          de impostos.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🏦 <strong>Isento de IR</strong> • 📈 <strong>Baseado no CDI</strong> • 💰{" "}
            <strong>Garantia do FGC</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de LCI/LCA</CardTitle>
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
                Valor que deseja aplicar em LCI ou LCA
              </div>
            </div>
          </div>

          {/* Linha 2: Percentual do CDI e Período */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Input
                type="text"
                label="Percentual do CDI (%)"
                value={cdiPercentage}
                onChange={(e) => setCdiPercentage(e.target.value)}
                placeholder="100"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.cdiPercentage} />
              <div className="mt-1 text-xs text-text-secondary">
                Percentual do CDI oferecido pela LCI/LCA
                <span className="ml-2 text-system-info">
                  (CDI atual: {ECONOMIC_INDICATORS.SELIC.rate.toFixed(2)}% a.a.)
                </span>
              </div>
            </div>
            <div>
              <Input
                type="number"
                label="Prazo (dias)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="90"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.days} />
              <div className="mt-1 text-xs text-text-secondary">
                Prazo de vencimento da LCI/LCA em dias corridos
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
              📊 Resultado da Simulação de Juros Compostos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-4xl font-bold text-growth-green">
                  {currencyBR(result.finalAmount)}
                </div>
                <div className="text-sm text-text-secondary">Montante Final</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-primary-blue-dark">
                  {currencyBR(result.totalInterest)}
                </div>
                <div className="text-sm text-text-secondary">Juros Ganhos</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <div className="text-2xl font-bold text-system-warning">
                  {percentBR(result.annualRate)}%
                </div>
                <div className="text-sm text-text-secondary">Taxa Anual</div>
              </div>
            </div>

            {/* Breakdown detalhado se há aportes mensais */}
            {result.monthlyInvestment > 0 && (
              <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg bg-system-info/10 p-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Capital Inicial</div>
                  <div className="text-xl font-bold text-text-primary">
                    {currencyBR(result.initialAmount)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Aportes Mensais</div>
                  <div className="text-xl font-bold text-system-info">
                    {currencyBR(result.totalContributions)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {currencyBR(result.monthlyInvestment)}/mês
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Total Investido</div>
                  <div className="text-xl font-bold text-text-primary">
                    {currencyBR(result.initialAmount + result.totalContributions)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Juros Compostos</div>
                  <div className="text-xl font-bold text-growth-green">
                    {currencyBR(result.totalInterest)}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 grid grid-cols-1 gap-6 rounded-lg bg-gray-900 p-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Capital Inicial</div>
                <div className="text-xl font-bold text-text-primary">
                  {currencyBR(result.initialAmount)}
                </div>
                <div className="text-sm text-text-secondary">Valor investido</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Prazo</div>
                <div className="text-xl font-bold text-text-primary">{result.days} dias</div>
                <div className="text-sm text-text-secondary">
                  {Math.round(result.days / 30)} meses aprox.
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Cálculo</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Valor investido: <strong>{currencyBR(result.initialAmount)}</strong>
                </li>
                <li>
                  Taxa efetiva: <strong>{percentBR(result.effectiveRate)}% ao ano</strong>
                </li>
                <li>
                  Prazo de investimento:{" "}
                  <strong>
                    {result.days} dias ({Math.round(result.days / 30)} meses aprox.)
                  </strong>
                </li>
                <li>
                  Rendimento bruto: <strong>{currencyBR(result.totalInterest)}</strong> (isento de
                  IR)
                </li>
                <li>
                  Montante final: <strong>{currencyBR(result.finalAmount)}</strong>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gráficos e Tabela de Evolução */}
      {result && (
        <>
          {/* Gráficos */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Gráfico de Evolução do Patrimônio */}
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  📈 Evolução do Patrimônio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line
                    data={{
                      labels: result.dailyData.map((_, i) => `Dia ${i + 1}`),
                      datasets: [
                        {
                          label: "Patrimônio Total",
                          data: result.dailyData.map((d) => d.balance),
                          borderColor: "#64B5F6",
                          backgroundColor: "rgba(100, 181, 246, 0.1)",
                          fill: true,
                        },
                        {
                          label: "Valor Investido",
                          data: result.dailyData.map(() => result.initialAmount),
                          borderColor: "#FFA726",
                          backgroundColor: "rgba(255, 167, 38, 0.1)",
                          borderDash: [5, 5],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                          labels: {
                            color: "#E5E5E5",
                          },
                        },
                        tooltip: {
                          backgroundColor: "#1A1A1A",
                          titleColor: "#E5E5E5",
                          bodyColor: "#E5E5E5",
                          callbacks: {
                            label: function (context) {
                              return `${context.dataset.label}: ${currencyBR(context.parsed.y)}`;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          ticks: {
                            color: "#A1A1A1",
                            callback: function (value) {
                              return currencyBR(Number(value));
                            },
                          },
                          grid: {
                            color: "#333333",
                          },
                        },
                        x: {
                          ticks: {
                            color: "#A1A1A1",
                          },
                          grid: {
                            color: "#333333",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Pizza - Composição Final */}
            <Card>
              <CardHeader>
                <CardTitle as="h3" className="text-system-warning">
                  🥧 Composição do Patrimônio Final
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Pie
                    data={{
                      labels: ["Capital Inicial", "Aportes", "Juros Compostos"],
                      datasets: [
                        {
                          data: [
                            result.initialAmount,
                            result.totalContributions,
                            result.totalInterest,
                          ],
                          backgroundColor: [
                            "#64B5F6", // Primary blue
                            "#FFA726", // Orange
                            "#66BB6A", // Green
                          ],
                          borderColor: ["#1976D2", "#F57C00", "#388E3C"],
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom" as const,
                          labels: {
                            color: "#E5E5E5",
                            padding: 20,
                          },
                        },
                        tooltip: {
                          backgroundColor: "#1A1A1A",
                          titleColor: "#E5E5E5",
                          bodyColor: "#E5E5E5",
                          callbacks: {
                            label: function (context) {
                              const value = context.parsed;
                              const total = result.finalAmount;
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${context.label}: ${currencyBR(value)} (${percentage}%)`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Evolução Mensal */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="text-primary-blue-dark">
                📊 Evolução Diária Detalhada
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const itemsPerPage = 15; // Mais linhas por página para dados diários
                const totalPages = Math.ceil(result.dailyData.length / itemsPerPage);
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentItems = result.dailyData.slice(startIndex, endIndex);

                return (
                  <>
                    {/* Informação da paginação */}
                    <div className="mb-4 flex items-center justify-between text-sm text-text-secondary">
                      <div>
                        Mostrando dias {startIndex + 1} a{" "}
                        {Math.min(endIndex, result.dailyData.length)} de {result.dailyData.length}
                      </div>
                      <div>
                        Página {currentPage} de {totalPages}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      {/* Tabela Desktop - Todas as colunas */}
                      <table className="hidden w-full text-sm md:table">
                        <thead>
                          <tr className="border-b-2 border-neutral-surface-variant">
                            <th className="p-3 text-left font-semibold">Dia</th>
                            <th className="p-3 text-right font-semibold">Patrimônio</th>
                            <th className="p-3 text-right font-semibold">Rendimento Diário</th>
                            <th className="p-3 text-right font-semibold">Total de Rendimentos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((data, index) => (
                            <tr
                              key={data.day}
                              className="border-b border-neutral-surface-variant hover:bg-neutral-surface/20"
                            >
                              <td className="p-3 font-medium">{data.day}</td>
                              <td className="p-3 text-right font-bold text-growth-green">
                                {currencyBR(data.balance)}
                              </td>
                              <td className="p-3 text-right text-primary-blue-dark">
                                {currencyBR(data.dailyInterest)}
                              </td>
                              <td className="p-3 text-right text-growth-green">
                                {currencyBR(data.totalInterest)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Tabela Mobile - Colunas essenciais */}
                      <table className="w-full text-sm md:hidden">
                        <thead>
                          <tr className="border-b-2 border-neutral-surface-variant">
                            <th className="p-2 text-left font-semibold">Dia</th>
                            <th className="p-2 text-right font-semibold">Patrimônio</th>
                            <th className="p-2 text-right font-semibold">Rendimento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((data, index) => (
                            <tr
                              key={`mobile-${data.day}`}
                              className="border-b border-neutral-surface-variant hover:bg-neutral-surface/20"
                            >
                              <td className="p-2 font-medium">{data.day}</td>
                              <td className="p-2 text-right font-bold text-growth-green">
                                {currencyBR(data.balance)}
                              </td>
                              <td className="p-2 text-right text-primary-blue-dark">
                                {currencyBR(data.dailyInterest)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Controles de paginação */}
                    {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-center space-x-2">
                        <Button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          variant="outline"
                          className="px-3 py-2 text-sm"
                        >
                          ««
                        </Button>
                        <Button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          variant="outline"
                          className="px-3 py-2 text-sm"
                        >
                          ‹
                        </Button>

                        {/* Números das páginas */}
                        {(() => {
                          const pages = [];
                          const maxVisiblePages = 5;
                          let startPage = Math.max(1, currentPage - 2);
                          let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                          if (endPage - startPage < maxVisiblePages - 1) {
                            startPage = Math.max(1, endPage - maxVisiblePages + 1);
                          }

                          for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                              <Button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                variant={currentPage === i ? "default" : "outline"}
                                className="px-3 py-2 text-sm"
                              >
                                {i}
                              </Button>
                            );
                          }
                          return pages;
                        })()}

                        <Button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          variant="outline"
                          className="px-3 py-2 text-sm"
                        >
                          ›
                        </Button>
                        <Button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          variant="outline"
                          className="px-3 py-2 text-sm"
                        >
                          »»
                        </Button>
                      </div>
                    )}
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </>
      )}

      {/* Seção: LCI e LCA - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 LCI e LCA – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de LCI e LCA */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🏦 O que são LCI e LCA?
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    📋 LCI - Letra de Crédito Imobiliário
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Título de renda fixa lastreado em créditos imobiliários. Oferece isenção de IR
                    para pessoa física e garantia do FGC até R$ 250 mil.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">
                    🌾 LCA - Letra de Crédito do Agronegócio
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Lastreada em créditos do agronegócio</li>
                    <li>• Mesmos benefícios da LCI</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Isenção de Imposto de Renda</li>
                    <li>• Garantia do FGC até R$ 250 mil</li>
                    <li>• Rentabilidade baseada no CDI</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Fatores Importantes</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Carência para resgate antecipado</li>
                    <li>• Valor mínimo de aplicação</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CDI e Rentabilidade */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📊 CDI e Rentabilidade
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💹 O que é CDI?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Certificado de Depósito Interbancário - taxa de referência para empréstimos
                    entre bancos. Base para remuneração de LCI/LCA.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📈 Como funciona</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Percentual do CDI (ex: 100% do CDI)</li>
                    <li>• CDI atual: {ECONOMIC_INDICATORS.SELIC.rate.toFixed(2)}% a.a.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    💰 Faixas de Rentabilidade
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Grandes bancos: 80-95% do CDI</li>
                    <li>• Bancos médios: 90-110% do CDI</li>
                    <li>• Corretoras: 95-120% do CDI</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-success">✨ Benefício Fiscal</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 100% isento de Imposto de Renda</li>
                    <li>• Vantagem sobre CDB e outros</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Estratégias para Otimizar LCI e LCA */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🎯 Estratégias para Otimizar LCI e LCA
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Pesquise Taxas</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Compare percentuais do CDI entre instituições. Corretoras geralmente oferecem
                    melhores condições que grandes bancos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">💰 Diversifique</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Divida entre LCI e LCA</li>
                    <li>• Respeite limite do FGC (R$ 250 mil)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">📅 Planeje Prazos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Considere carência para liquidez</li>
                    <li>• Aloque conforme seus objetivos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">
                    ⚖️ Compare Alternativas
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Considere CDB (se taxa compensar IR)</li>
                    <li>• Avalie Tesouro Direto também</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação LCI/LCA vs Outros Investimentos */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ LCI/LCA vs Outros Investimentos de Renda Fixa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">LCI/LCA</th>
                  <th className="p-3 text-center font-semibold text-growth-green">CDB</th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Tesouro Direto
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Imposto de Renda</td>
                  <td className="p-3 text-center text-primary-blue-dark">Isento</td>
                  <td className="p-3 text-center text-growth-green">15-22,5% (regressivo)</td>
                  <td className="p-3 text-center text-system-warning">15-22,5% (regressivo)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Garantia FGC</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐ (R$ 250 mil)</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐ (R$ 250 mil)</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐ (Governo)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Liquidez</td>
                  <td className="p-3 text-center text-growth-green">Vence no prazo</td>
                  <td className="p-3 text-center">Diária (maioria)</td>
                  <td className="p-3 text-center">Diária</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Valor Mínimo</td>
                  <td className="p-3 text-center">R$ 1.000 a R$ 5.000</td>
                  <td className="p-3 text-center">R$ 500 a R$ 1.000</td>
                  <td className="p-3 text-center">R$ 30 a R$ 100</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Rentabilidade</td>
                  <td className="p-3 text-center">80-120% CDI</td>
                  <td className="p-3 text-center">90-130% CDI</td>
                  <td className="p-3 text-center">SELIC ou IPCA+</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Indicado para</td>
                  <td className="p-3 text-center text-primary-blue-dark">Médio prazo</td>
                  <td className="p-3 text-center text-growth-green">Curto/médio prazo</td>
                  <td className="p-3 text-center text-system-warning">Iniciantes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 LCI/LCA</h4>
              <p className="text-sm text-text-secondary">
                Ideal para <strong>médio prazo</strong> com isenção de IR. Melhor que CDB líquido
                por não ter taxa regressiva.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">💰 CDB</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>CDB com liquidez</strong> para reserva de emergência. Só vale se o CDI
                compensar o IR.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">📈 Tesouro Direto</h4>
              <p className="text-sm text-text-secondary">
                Para <strong>iniciantes</strong> pelo valor mínimo baixo e facilidade. Boa para
                objetivos de longo prazo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de LCI e LCA"
        items={[
          {
            question: "O que são LCI e LCA?",
            answer:
              "LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são títulos de renda fixa isentos de IR para pessoa física, lastreados por créditos imobiliários e do agronegócio.",
            borderColor: "primary-blue",
          },
          {
            question: "Como é calculado o rendimento de LCI e LCA?",
            answer:
              "O rendimento é calculado com base em um percentual do CDI, usando juros compostos. Fórmula: M = C × (1 + CDI × percentual)^t, sendo isento de Imposto de Renda.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a diferença entre LCI e LCA?",
            answer:
              "LCI é lastreada em créditos imobiliários e LCA em créditos do agronegócio. Ambas têm características similares: isenção de IR, garantia do FGC até R$ 250 mil e rentabilidade atrelada ao CDI.",
            borderColor: "system-info",
          },
          {
            question: "Qual percentual do CDI devo usar na simulação?",
            answer:
              "LCI/LCA geralmente oferecem entre 80% a 120% do CDI. Grandes bancos: 80-95% do CDI. Bancos médios/digitais: 90-110% do CDI. Corretoras: 95-120% do CDI.",
            borderColor: "system-warning",
          },
          {
            question: "LCI/LCA é melhor que CDB?",
            answer:
              "Depende da taxa e prazo. LCI/LCA são isentas de IR, enquanto CDB tem alíquota regressiva (22,5% a 15%). Para mesmo percentual do CDI, LCI/LCA sempre rendem mais líquido.",
            borderColor: "growth-green",
          },
          {
            question: "Qual o prazo ideal para LCI/LCA?",
            answer:
              "Varia conforme objetivo. Prazos mais longos geralmente oferecem percentuais melhores do CDI. Considere a carência (geralmente 90 dias) para liquidez antecipada.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre LCI/LCA",
          content:
            "<strong>Para otimizar resultados:</strong> compare percentuais do CDI entre instituições, respeite o limite do FGC (R$ 250 mil por CPF/CNPJ) e considere prazos conforme seu planejamento financeiro.",
        }}
        footerText="<strong>Lembre-se:</strong> LCI/LCA são ideais para médio prazo com isenção de IR. A rentabilidade líquida supera muitos investimentos tributados, mesmo com CDI menor."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de LCI e LCA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de LCI e LCA</strong>{" "}
              utiliza <strong className="text-growth-green">cálculos baseados no CDI</strong> para
              simular rendimentos de investimentos isentos de IR. Os cálculos consideram
              capitalização mensal composta para melhor resultado.
            </p>
            <p>
              <strong>Configurações disponíveis:</strong> Valor a investir, percentual do CDI
              oferecido e prazo em meses ou anos. A calculadora usa a taxa CDI atual (
              {ECONOMIC_INDICATORS.SELIC.rate.toFixed(2)}% a.a.) como base para os cálculos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e comparativos. As taxas reais podem variar entre instituições. Para
              decisões de investimento, consulte sempre um{" "}
              <strong>assessor financeiro qualificado</strong>.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🏦 Baseado no CDI • 📈 Isenção de IR • 🔒 Dados não armazenados • 📱 Compatível com
              todos os dispositivos • 🌙 Interface otimizada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="lci-lca" />
    </div>
  );
}
