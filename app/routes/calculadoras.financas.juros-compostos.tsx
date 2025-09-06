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
      title: "Juros Compostos – Calculadora de Investimentos Grátis",
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
      name: "description",
      content:
        "Calcule juros compostos e potencialize seus investimentos. Simule aportes mensais, tempo e rentabilidade com gráficos interativos educativos.",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
    },
    {
      property: "og:title",
      content: "Juros Compostos – Calculadora de Investimentos Grátis",
    },
    {
      property: "og:description",
      content:
        "Calcule juros compostos e potencialize seus investimentos. Simule aportes mensais, tempo e rentabilidade com gráficos interativos educativos.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-juros-compostos.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Juros Compostos - Simule crescimento exponencial do patrimônio com aportes mensais",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Juros Compostos 2025 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "Calcule juros compostos facilmente. Simule crescimento exponencial do patrimônio com aportes mensais, visualize gráficos e tabela detalhada. Ferramenta gratuita e completa.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-juros-compostos.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Juros Compostos - Simule crescimento do patrimônio",
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
        name: "Calculadora de Juros Compostos - Simulador de Crescimento 2025",
        description:
          "Simulador gratuito e completo de juros compostos com aportes mensais. Visualize gráficos, tabela mês a mês e descubra o poder do crescimento exponencial do seu patrimônio.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-24",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
          name: "Calculadora de Juros Compostos 2025 - Simulador Completo",
          description:
            "Simule crescimento exponencial do patrimônio com juros compostos e aportes mensais. Visualize gráficos interativos, tabela detalhada mês a mês e descubra o poder dos juros sobre juros.",
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
                name: "Calculadora de Juros Compostos",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-compostos",
              },
            ],
          },
        },
        about: {
          "@type": "MathematicalConcept",
          name: "Juros Compostos",
          description:
            "Sistema de capitalização onde os juros incidem sobre o capital inicial acrescido dos juros acumulados",
          category: "Financial Mathematics",
        },
        featureList: [
          "Simulação de juros compostos com aportes mensais",
          "Gráficos interativos de evolução do patrimônio",
          "Tabela detalhada mês a mês com paginação",
          "Composição visual do patrimônio final",
          "Cálculo baseado em taxas SELIC atualizadas",
          "Simulação por meses ou anos",
          "Interface móvel responsiva otimizada",
          "Resultados confiáveis em tempo real",
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
            name: "O que são juros compostos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Juros compostos são calculados sobre o capital inicial somado aos juros acumulados de períodos anteriores. É o famoso 'juros sobre juros', responsável pelo crescimento exponencial dos investimentos ao longo do tempo.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a fórmula dos juros compostos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A fórmula é M = C × (1 + i)^t, onde M é o montante final, C é o capital inicial, i é a taxa de juros por período (em decimal) e t é o número de períodos.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre juros simples e compostos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nos juros simples, os juros são calculados apenas sobre o capital inicial. Nos juros compostos, os juros são calculados sobre o capital inicial + juros acumulados, gerando crescimento exponencial.",
            },
          },
          {
            "@type": "Question",
            name: "Que taxa de juros devo usar na simulação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use taxas realistas baseadas em investimentos disponíveis: Renda Fixa (8-12% a.a.), Tesouro Direto (10-13% a.a.), fundos de investimento (6-15% a.a.). A SELIC atual é de 12,25% a.a.",
            },
          },
        ],
      }),
    },
  ];
};

type PeriodType = "months" | "years";

interface MonthlyData {
  month: number;
  balance: number;
  monthlyContribution: number;
  monthlyInterest: number;
  totalContributions: number;
  totalInterest: number;
}

interface CompoundInterestResult {
  finalAmount: number;
  totalInterest: number;
  initialAmount: number;
  monthlyRate: number;
  periods: number;
  periodType: PeriodType;
  annualRate: number;
  monthlyInvestment: number;
  totalContributions: number;
  monthlyData: MonthlyData[];
}

interface ValidationErrors {
  principal?: string;
  rate?: string;
  periods?: string;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [periods, setPeriods] = useState("");
  const [periodType, setPeriodType] = useState<PeriodType>("months");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "juros-compostos",
    category: "financas",
  });
  useFormTracking("juros-compostos");

  // Função para calcular taxa padrão baseada na SELIC
  const getDefaultSelicRate = (type: PeriodType): string => {
    const selicAnnualRate = ECONOMIC_INDICATORS.SELIC.rate; // 12,25% ao ano
    if (type === "months") {
      const monthlyRate = selicAnnualRate / 12; // Converte para mensal
      return monthlyRate.toFixed(2).replace(".", ",");
    } else {
      return selicAnnualRate.toFixed(2).replace(".", ",");
    }
  };

  // Inicializa a taxa com valor da SELIC na primeira renderização
  useEffect(() => {
    if (!annualRate) {
      setAnnualRate(getDefaultSelicRate(periodType));
    }
  }, []);

  // Atualiza a taxa quando o tipo de período muda
  useEffect(() => {
    if (annualRate) {
      setAnnualRate(getDefaultSelicRate(periodType));
    }
  }, [periodType]);

  const currencyBR = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
  const percentBR = (v: number, digits = 2) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

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
    const p = parseMoney(principal);
    if (p <= 0) {
      newErrors.principal = "Capital inicial obrigatório e maior que 0";
      ok = false;
    }
    const r = parseRate(annualRate);
    if (r <= 0) {
      newErrors.rate = "Taxa de juros deve ser maior que 0";
      ok = false;
    }
    const n = parseInt(periods, 10);
    if (!periods || isNaN(n) || n <= 0) {
      newErrors.periods = "Período obrigatório e maior que 0";
      ok = false;
    }
    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const p = parseMoney(principal);
      const r = parseRate(annualRate);
      const n = parseInt(periods, 10);
      const pmt = parseMoney(monthlyInvestment || "0");

      // Taxa correta conforme período selecionado
      const monthlyRate = periodType === "months" ? r : r / 12;
      const totalMonths = periodType === "months" ? n : n * 12;

      // Calcular evolução mês a mês
      const monthlyData: MonthlyData[] = [];
      let currentBalance = p; // Começa com o capital inicial
      let totalContributions = 0;
      let totalInterest = 0;

      for (let month = 1; month <= totalMonths; month++) {
        let monthlyInterest = 0;
        let monthlyContribution = pmt;

        if (month === 1) {
          // Primeiro mês: apenas capital inicial + aporte (sem juros)
          currentBalance = p + monthlyContribution;
        } else {
          // Meses seguintes: aplica juros sobre saldo anterior + adiciona aporte
          monthlyInterest = currentBalance * monthlyRate;
          currentBalance = currentBalance + monthlyInterest + monthlyContribution;
        }

        // Acumular totais
        totalContributions += monthlyContribution;
        totalInterest += monthlyInterest;

        // Salvar dados do mês
        monthlyData.push({
          month,
          balance: currentBalance,
          monthlyContribution,
          monthlyInterest,
          totalContributions,
          totalInterest,
        });
      }

      const finalAmount = currentBalance;

      const res: CompoundInterestResult = {
        finalAmount,
        totalInterest,
        initialAmount: p,
        monthlyRate: (periodType === "months" ? r : r / 12) * 100, // taxa mensal em porcentagem
        periods: totalMonths,
        periodType,
        annualRate: (periodType === "months" ? r * 12 : r) * 100, // taxa anual em porcentagem
        monthlyInvestment: pmt,
        totalContributions,
        monthlyData,
      };

      setResult(res);
      setErrors({});
      setCurrentPage(1); // Reset pagination quando há novo cálculo
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ principal: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setAnnualRate(getDefaultSelicRate("months")); // Reset com SELIC mensal
    setPeriods("");
    setPeriodType("months");
    setMonthlyInvestment("");
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
        <BreadcrumbItem isLast>Juros Compostos</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Juros Compostos 2025 – Simulador Completo
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule o <strong className="text-growth-green">crescimento do seu capital</strong> com
          juros compostos. Simule diferentes cenários de investimento e descubra{" "}
          <strong className="text-primary-blue-dark">o montante final</strong> ao longo do tempo.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🧮 <strong>Fórmula Matemática</strong> • 📈 <strong>Crescimento Exponencial</strong> •
            💰 <strong>Resultados Confiáveis</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de Juros Compostos</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de Período centralizado */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
              <button
                type="button"
                onClick={() => setPeriodType("months")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  periodType === "months"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Meses
              </button>
              <button
                type="button"
                onClick={() => setPeriodType("years")}
                className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                  periodType === "years"
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Anos
              </button>
            </div>
          </div>

          {/* Linha 1: Valores - Capital inicial e Investimento mensal */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <MoneyInput
                label="Capital Inicial"
                value={principal}
                onChange={setPrincipal}
                placeholder="1.000,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.principal} />
              <div className="mt-1 text-xs text-text-secondary">Valor inicial a ser investido</div>
            </div>
            <div>
              <MoneyInput
                label="Investimento Mensal (Opcional)"
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                placeholder="0,00"
                fullWidth
                className="h-12 text-lg"
              />
              <div className="mt-1 text-xs text-text-secondary">
                Valor adicional investido mensalmente
              </div>
            </div>
          </div>

          {/* Linha 2: Taxa e Período */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <RateInput
                label={`Taxa de Juros (% ${periodType === "months" ? "a.m." : "a.a."})`}
                value={annualRate}
                onChange={setAnnualRate}
                placeholder={getDefaultSelicRate(periodType)}
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.rate} />
              <div className="mt-1 text-xs text-text-secondary">
                Taxa {periodType === "months" ? "mensal" : "anual"} de juros compostos
                <span className="ml-2 text-system-info">
                  (SELIC:{" "}
                  {periodType === "months"
                    ? `${(ECONOMIC_INDICATORS.SELIC.rate / 12).toFixed(2)}% a.m.`
                    : `${ECONOMIC_INDICATORS.SELIC.rate.toFixed(2)}% a.a.`}
                  )
                </span>
              </div>
            </div>
            <div>
              <Input
                type="number"
                label={`Período (${periodType === "months" ? "meses" : "anos"})`}
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
                placeholder={periodType === "months" ? "12" : "1"}
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.periods} />
              <div className="mt-1 text-xs text-text-secondary">
                Tempo de aplicação em {periodType === "months" ? "meses" : "anos"}
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
                <div className="text-sm text-text-secondary">Taxa Mensal</div>
                <div className="text-xl font-bold text-text-primary">
                  {percentBR(result.monthlyRate, 3)}%
                </div>
                <div className="text-sm text-text-secondary">Taxa equivalente mensal</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Período</div>
                <div className="text-xl font-bold text-text-primary">
                  {result.periodType === "months" ? result.periods : result.periods / 12}{" "}
                  {result.periodType === "months" ? "meses" : "anos"}
                </div>
                <div className="text-sm text-text-secondary">
                  {result.periods} meses de aplicação
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Cálculo</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Capital inicial: <strong>{currencyBR(result.initialAmount)}</strong>
                </li>
                {result.monthlyInvestment > 0 && (
                  <li>
                    Investimento mensal: <strong>{currencyBR(result.monthlyInvestment)}</strong>
                  </li>
                )}
                <li>
                  Taxa de juros: <strong>{percentBR(result.annualRate)}% ao ano</strong>
                </li>
                <li>
                  Período:{" "}
                  <strong>
                    {result.periodType === "months" ? result.periods : result.periods / 12}{" "}
                    {result.periodType === "months" ? "meses" : "anos"} ({result.periods} meses)
                  </strong>
                </li>
                {result.monthlyInvestment > 0 && (
                  <li>
                    Total de aportes: <strong>{currencyBR(result.totalContributions)}</strong>
                  </li>
                )}
                <li>
                  Juros compostos: <strong>{currencyBR(result.totalInterest)}</strong>
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
                      labels: result.monthlyData.map((_, i) => `Mês ${i + 1}`),
                      datasets: [
                        {
                          label: "Patrimônio Total",
                          data: result.monthlyData.map((d) => d.balance),
                          borderColor: "#64B5F6",
                          backgroundColor: "rgba(100, 181, 246, 0.1)",
                          fill: true,
                        },
                        {
                          label: "Capital + Aportes",
                          data: result.monthlyData.map(
                            (d) => result.initialAmount + d.totalContributions
                          ),
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
                📊 Evolução Mensal Detalhada
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const itemsPerPage = 12;
                const totalPages = Math.ceil(result.monthlyData.length / itemsPerPage);
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentItems = result.monthlyData.slice(startIndex, endIndex);

                return (
                  <>
                    {/* Informação da paginação */}
                    <div className="mb-4 flex items-center justify-between text-sm text-text-secondary">
                      <div>
                        Mostrando meses {startIndex + 1} a{" "}
                        {Math.min(endIndex, result.monthlyData.length)} de{" "}
                        {result.monthlyData.length}
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
                            <th className="p-3 text-left font-semibold">Mês</th>
                            <th className="p-3 text-right font-semibold">Patrimônio</th>
                            <th className="p-3 text-right font-semibold">Aporte Mensal</th>
                            <th className="p-3 text-right font-semibold">Juros do Mês</th>
                            <th className="p-3 text-right font-semibold">Total Investido</th>
                            <th className="p-3 text-right font-semibold">Total em Juros</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((data, index) => (
                            <tr
                              key={data.month}
                              className="border-b border-neutral-surface-variant hover:bg-neutral-surface/20"
                            >
                              <td className="p-3 font-medium">{data.month}</td>
                              <td className="p-3 text-right font-bold text-growth-green">
                                {currencyBR(data.balance)}
                              </td>
                              <td className="p-3 text-right text-system-info">
                                {currencyBR(data.monthlyContribution)}
                              </td>
                              <td className="p-3 text-right text-primary-blue-dark">
                                {currencyBR(data.monthlyInterest)}
                              </td>
                              <td className="p-3 text-right">
                                {currencyBR(result.initialAmount + data.totalContributions)}
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
                            <th className="p-2 text-left font-semibold">Mês</th>
                            <th className="p-2 text-right font-semibold">Patrimônio</th>
                            <th className="p-2 text-right font-semibold">Juros</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((data, index) => (
                            <tr
                              key={`mobile-${data.month}`}
                              className="border-b border-neutral-surface-variant hover:bg-neutral-surface/20"
                            >
                              <td className="p-2 font-medium">{data.month}</td>
                              <td className="p-2 text-right font-bold text-growth-green">
                                {currencyBR(data.balance)}
                              </td>
                              <td className="p-2 text-right text-primary-blue-dark">
                                {currencyBR(data.monthlyInterest)}
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

      {/* Seção: Juros Compostos - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Juros Compostos – Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Juros Compostos */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🧮 Conceito de Juros Compostos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sistema de capitalização onde os juros incidem sobre o capital inicial acrescido
                    dos juros acumulados de períodos anteriores. É o famoso "juros sobre juros".
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Como Funciona</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Crescimento exponencial do capital</li>
                    <li>• Tempo é seu maior aliado</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Acelera o crescimento do patrimônio</li>
                    <li>• Recompensa investimentos de longo prazo</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Fatores Importantes</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Taxa de juros impacta significativamente</li>
                    <li>• Consistência nos aportes maximiza resultados</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Juros Simples vs Compostos */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔄 Juros Simples vs Compostos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">📊 Juros Simples</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Juros calculados apenas sobre o capital inicial, sem capitalização. Crescimento
                    linear e previsível.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📈 Fórmula</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• M = C × (1 + i × t)</li>
                    <li>• Crescimento aritmético</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🚀 Juros Compostos</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Juros calculados sobre capital + juros acumulados. Crescimento exponencial e
                    acelerado.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">💡 Fórmula</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• M = C × (1 + i)^t</li>
                    <li>• Crescimento geométrico</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Estratégias para Maximizar Juros Compostos */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🎯 Estratégias para Maximizar Juros Compostos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🚀 Comece Cedo</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O tempo é o fator mais importante nos juros compostos. Começar mais cedo amplia
                    exponencialmente os resultados.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">💰 Aportes Regulares</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Consistência nos aportes mensais</li>
                    <li>• Disciplina supera valor individual</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">📈 Reinvestimento</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Sempre reinvista os rendimentos</li>
                    <li>• Evite resgates desnecessários</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⏰ Paciência</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Resultados expressivos levam tempo</li>
                    <li>• Foco no longo prazo é essencial</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Estratégias de Investimento */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Comparação: Investimentos que Utilizam Juros Compostos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Renda Fixa
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Fundos de Investimento
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Tesouro Direto
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Previsibilidade</td>
                  <td className="p-3 text-center text-primary-blue-dark">Alta (taxa conhecida)</td>
                  <td className="p-3 text-center text-growth-green">Média (varia com mercado)</td>
                  <td className="p-3 text-center text-system-warning">Alta (governo federal)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Facilidade de Comparação</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Liquidez</td>
                  <td className="p-3 text-center text-growth-green">Varia por produto</td>
                  <td className="p-3 text-center">Diária (na maioria)</td>
                  <td className="p-3 text-center">Diária (com desconto)</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Valor Mínimo</td>
                  <td className="p-3 text-center">R$ 1.000 a R$ 5.000</td>
                  <td className="p-3 text-center">R$ 100 a R$ 1.000</td>
                  <td className="p-3 text-center">R$ 30 a R$ 100</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Indicado para</td>
                  <td className="p-3 text-center">Reserva de emergência</td>
                  <td className="p-3 text-center">Diversificação</td>
                  <td className="p-3 text-center">Iniciantes em investimentos</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Potencial de Retorno</td>
                  <td className="p-3 text-center text-primary-blue-dark">8-13% ao ano</td>
                  <td className="p-3 text-center text-growth-green">Varia amplamente</td>
                  <td className="p-3 text-center text-system-warning">10-13% ao ano</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Iniciantes</h4>
              <p className="text-sm text-text-secondary">
                Comece com <strong>Tesouro Direto</strong> pelo baixo valor mínimo e garantia do
                governo federal.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">💰 Reserva</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>Renda Fixa</strong> para reserva de emergência pela previsibilidade e
                estabilidade.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">📈 Diversificação</h4>
              <p className="text-sm text-text-secondary">
                Explore <strong>Fundos de Investimento</strong> para diversificar e potencializar os
                juros compostos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Juros Compostos"
        items={[
          {
            question: "O que são juros compostos?",
            answer:
              "Juros compostos são calculados sobre o capital inicial somado aos juros acumulados de períodos anteriores. É o famoso 'juros sobre juros', responsável pelo crescimento exponencial dos investimentos ao longo do tempo.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a fórmula dos juros compostos?",
            answer:
              "A fórmula é M = C × (1 + i)^t, onde M é o montante final, C é o capital inicial, i é a taxa de juros por período (em decimal) e t é o número de períodos. Esta calculadora aplica essa fórmula automaticamente.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a diferença entre juros simples e compostos?",
            answer:
              "Nos juros simples, os juros são calculados apenas sobre o capital inicial. Nos juros compostos, os juros são calculados sobre o capital inicial + juros acumulados, gerando crescimento exponencial.",
            borderColor: "system-info",
          },
          {
            question: "Por que os juros compostos são importantes?",
            answer:
              "Os juros compostos aceleram o crescimento do capital ao longo do tempo. Quanto maior o período e a taxa, maior o impacto. É fundamental para planejamento financeiro de longo prazo.",
            borderColor: "system-warning",
          },
          {
            question: "Como escolher entre meses e anos?",
            answer:
              "Use 'meses' para investimentos de curto prazo (até 2 anos) para melhor resultado. Use 'anos' para planejamentos de longo prazo (3+ anos). A calculadora converte automaticamente para cálculos mensais.",
            borderColor: "growth-green",
          },
          {
            question: "Que taxa de juros devo usar na simulação?",
            answer:
              "Use taxas realistas baseadas em investimentos disponíveis: Renda Fixa (8-12% a.a.), Tesouro Direto (10-13% a.a.), fundos de investimento (6-15% a.a.). A SELIC atual é de 12,25% a.a. Evite taxas muito altas para simulações realistas.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Juros Compostos",
          content:
            "<strong>Para maximizar resultados:</strong> comece a investir cedo, mantenha consistência nos aportes e seja paciente. O tempo é seu maior aliado nos juros compostos.",
        }}
        footerText="<strong>Lembre-se:</strong> Juros compostos recompensam a disciplina e o tempo. Pequenos valores investidos regularmente podem gerar grandes resultados no longo prazo."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Juros Compostos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de juros compostos</strong>{" "}
              utiliza <strong className="text-growth-green">a fórmula matemática clássica</strong>{" "}
              para calcular o crescimento do capital ao longo do tempo. Os cálculos consideram
              capitalizações mensais para melhores resultados.
            </p>
            <p>
              <strong>Configurações disponíveis:</strong> Capital inicial, taxa anual de juros e
              período em meses ou anos. A calculadora converte automaticamente para cálculos mensais
              compostos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento financeiro. Para decisões de investimento,
              consulte sempre um <strong>assessor financeiro qualificado</strong> e considere taxas
              reais de mercado.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🧮 Fórmula matemática • 📈 Crescimento exponencial • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Interface otimizada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="juros-compostos" />
    </div>
  );
}
