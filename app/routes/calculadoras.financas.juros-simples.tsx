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
import { useLoaderData } from "@remix-run/react";
import { marketIndicatorsLoader } from "~/services/market/loader.server";
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
import { buildCalculatorMeta } from "~/lib/page-meta";

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
    ...buildCalculatorMeta("juros-simples"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Juros Simples - Simulador Completo 2026",
        description:
          "Calculadora gratuita e confiável de juros simples. Simule o crescimento linear do seu capital, visualize gráficos e tabela detalhada com resultados claros.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-simples",
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
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-simples",
          name: "Calculadora de Juros Simples 2026 - Simulador Completo",
          description:
            "Simule crescimento linear do capital com juros simples. Visualize gráficos claros, tabela detalhada e entenda como funciona o cálculo de juros simples.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
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
                name: "Calculadora de Juros Simples",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/juros-simples",
              },
            ],
          },
        },
        about: {
          "@type": "DefinedTerm",
          name: "Juros Simples",
          description:
            "Sistema de capitalização onde os juros incidem apenas sobre o capital inicial, sem acumulação de juros sobre juros",
        },
        featureList: [
          "Simulação de juros simples com cálculo direto",
          "Gráficos claros de evolução do capital",
          "Tabela detalhada com progressão linear",
          "Visualização da composição do montante final",
          "Cálculo baseado na fórmula clássica de juros simples",
          "Simulação por meses ou anos",
          "Interface móvel responsiva otimizada",
          "Resultados confiáveis em tempo real",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que são juros simples?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Juros simples são calculados apenas sobre o capital inicial, sem incidência de juros sobre juros acumulados. O crescimento é linear e proporcional ao tempo.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a fórmula dos juros simples?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A fórmula é M = C + (C × i × t), onde M é o montante final, C é o capital inicial, i é a taxa de juros por período (em decimal) e t é o número de períodos.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre juros simples e compostos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nos juros simples, os juros são calculados apenas sobre o capital inicial, gerando crescimento linear. Nos juros compostos, os juros são calculados sobre o capital inicial + juros acumulados, gerando crescimento exponencial.",
            },
          },
          {
            "@type": "Question",
            name: "Quando usar juros simples?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Juros simples são comuns em empréstimos de curto prazo, financiamentos diretos e algumas aplicações bancárias. São mais fáceis de calcular e entender que juros compostos.",
            },
          },
        ],
      },
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

interface SimpleInterestResult {
  finalAmount: number;
  totalInterest: number;
  initialAmount: number;
  rate: number;
  periods: number;
  periodType: PeriodType;
  annualRate: number;
  monthlyData: MonthlyData[];
}

interface ValidationErrors {
  principal?: string;
  rate?: string;
  periods?: string;
}

export async function loader() {
  return marketIndicatorsLoader();
}

export default function SimpleInterestCalculator() {
  const { indicators } = useLoaderData<typeof loader>();
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [periods, setPeriods] = useState("");
  const [periodType, setPeriodType] = useState<PeriodType>("months");
  const [result, setResult] = useState<SimpleInterestResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "juros-simples",
    category: "financas",
  });
  useFormTracking("juros-simples");

  // Função para calcular taxa padrão baseada na SELIC
  const getDefaultSelicRate = (type: PeriodType): string => {
    const selicAnnualRate = indicators.SELIC.rate; 
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

      // Taxa e período para juros simples
      const rate = periodType === "months" ? r : r / 12; // taxa por período
      const totalPeriods = periodType === "months" ? n : n * 12;

      // Cálculo de juros simples: M = C + (C × i × t)
      const totalInterest = p * rate * totalPeriods;
      const finalAmount = p + totalInterest;

      // Evolução mensal para juros simples
      const monthlyData: MonthlyData[] = [];
      const monthlyInterestAmount = totalInterest / totalPeriods;

      for (let month = 1; month <= totalPeriods; month++) {
        const accumulatedInterest = monthlyInterestAmount * month;
        const currentBalance = p + accumulatedInterest;

        monthlyData.push({
          month,
          balance: currentBalance,
          monthlyContribution: 0, // Juros simples não tem aportes mensais
          monthlyInterest: monthlyInterestAmount,
          totalContributions: 0,
          totalInterest: accumulatedInterest,
        });
      }

      const res: SimpleInterestResult = {
        finalAmount,
        totalInterest,
        initialAmount: p,
        rate: rate * 100, // taxa por período em porcentagem
        periods: totalPeriods,
        periodType,
        annualRate: (periodType === "months" ? r * 12 : r) * 100, // taxa anual em porcentagem
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
        <BreadcrumbItem isLast>Juros Simples</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Juros Simples 2026 – Simulador Completo
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule o <strong className="text-growth-green">crescimento linear do seu capital</strong>{" "}
          com juros simples. Entenda como funciona o cálculo direto e descubra{" "}
          <strong className="text-primary-blue-dark">o montante final</strong> de forma simples.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🧮 <strong>Fórmula Simples</strong> • 📈 <strong>Crescimento Linear</strong> • 💰{" "}
            <strong>Resultados Confiáveis</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📋 Configure sua Simulação de Juros Simples</CardTitle>
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

          {/* Linha 1: Capital inicial */}
          <div className="mb-6">
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
              <div className="mt-1 text-xs text-text-secondary">Valor inicial a ser aplicado</div>
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
                Taxa {periodType === "months" ? "mensal" : "anual"} de juros simples
                <span className="ml-2 text-system-info">
                  (SELIC:{" "}
                  {periodType === "months"
                    ? `${(indicators.SELIC.rate / 12).toFixed(2)}% a.m.`
                    : `${indicators.SELIC.rate.toFixed(2)}% a.a.`}
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
              📊 Resultado da Simulação de Juros Simples
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
                  {percentBR(result.rate)}%
                </div>
                <div className="text-sm text-text-secondary">
                  Taxa {result.periodType === "months" ? "Mensal" : "Anual"}
                </div>
              </div>
            </div>

            {/* Remover seção de aportes mensais - juros simples não têm aportes */}
            {false && (
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
                <div className="text-sm text-text-secondary">Valor aplicado</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">
                  Taxa {result.periodType === "months" ? "Mensal" : "Anual"}
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {percentBR(result.rate, 3)}%
                </div>
                <div className="text-sm text-text-secondary">Taxa por período</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Período</div>
                <div className="text-xl font-bold text-text-primary">
                  {result.periodType === "months" ? result.periods : result.periods / 12}{" "}
                  {result.periodType === "months" ? "meses" : "anos"}
                </div>
                <div className="text-sm text-text-secondary">
                  {result.periods} {result.periodType === "months" ? "meses" : "meses"} de aplicação
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo do Cálculo</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Capital inicial: <strong>{currencyBR(result.initialAmount)}</strong>
                </li>
                <li>
                  Taxa de juros: <strong>{percentBR(result.annualRate)}% ao ano</strong>
                </li>
                <li>
                  Período:{" "}
                  <strong>
                    {result.periodType === "months" ? result.periods : result.periods / 12}{" "}
                    {result.periodType === "months" ? "meses" : "anos"} ({result.periods}{" "}
                    {result.periodType === "months" ? "meses" : "meses"})
                  </strong>
                </li>
                <li>
                  Juros simples: <strong>{currencyBR(result.totalInterest)}</strong>
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
                  📈 Evolução do Capital (Juros Simples)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line
                    data={{
                      labels: result.monthlyData.map((_, i) => `Mês ${i + 1}`),
                      datasets: [
                        {
                          label: "Montante Total (C + J)",
                          data: result.monthlyData.map((d) => d.balance),
                          borderColor: "#64B5F6",
                          backgroundColor: "rgba(100, 181, 246, 0.1)",
                          fill: true,
                        },
                        {
                          label: "Capital Inicial",
                          data: result.monthlyData.map(() => result.initialAmount),
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
                  🥧 Composição do Montante Final
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Pie
                    data={{
                      labels: ["Capital Inicial", "Juros Simples"],
                      datasets: [
                        {
                          data: [result.initialAmount, result.totalInterest],
                          backgroundColor: [
                            "#64B5F6", // Primary blue
                            "#66BB6A", // Green
                          ],
                          borderColor: ["#1976D2", "#388E3C"],
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
                📊 Evolução Detalhada - Juros Simples
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
                        Mostrando períodos {startIndex + 1} a{" "}
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
                            <th className="p-3 text-left font-semibold">Período</th>
                            <th className="p-3 text-right font-semibold">Montante</th>
                            <th className="p-3 text-right font-semibold">Capital</th>
                            <th className="p-3 text-right font-semibold">Juros do Período</th>
                            <th className="p-3 text-right font-semibold">Juros Acumulados</th>
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
                                {currencyBR(result.initialAmount)}
                              </td>
                              <td className="p-3 text-right text-primary-blue-dark">
                                {currencyBR(data.monthlyInterest)}
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
                            <th className="p-2 text-left font-semibold">Período</th>
                            <th className="p-2 text-right font-semibold">Montante</th>
                            <th className="p-2 text-right font-semibold">Juros Acum.</th>
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
                                {currencyBR(data.totalInterest)}
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
            🎯 Juros Simples – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Conceito de Juros Compostos */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🧮 Conceito de Juros Simples
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Sistema de capitalização onde os juros incidem apenas sobre o capital inicial,
                    sem acumulação de juros sobre juros. Crescimento linear e proporcional ao tempo.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Como Funciona</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Crescimento linear e constante</li>
                    <li>• Fácil de calcular e entender</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Cálculo simples e direto</li>
                    <li>• Previsibilidade total dos resultados</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Fatores Importantes</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Ideal para investimentos de curto prazo</li>
                    <li>• Menos rentável que juros compostos no longo prazo</li>
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
                    <li>• M = C + (C × i × t)</li>
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

            {/* Quando Usar Juros Simples */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🎯 Quando Usar Juros Simples
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">
                    📈 Investimentos de Curto Prazo
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Juros simples são ideais para aplicações de curto prazo onde a simplicidade do
                    cálculo é mais importante que o crescimento exponencial.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">💰 Situações Comuns</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Empréstimos pessoais de curto prazo</li>
                    <li>• Algumas aplicações bancárias especiais</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">📈 Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Cálculo transparente e fácil</li>
                    <li>• Previsibilidade total</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⏰ Limitações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Crescimento mais lento no longo prazo</li>
                    <li>• Não aproveita o poder da capitalização</li>
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
            ⚖️ Comparação: Juros Simples vs Compostos em Diferentes Situações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Critério</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">
                    Juros Simples
                  </th>
                  <th className="p-3 text-center font-semibold text-growth-green">
                    Juros Compostos
                  </th>
                  <th className="p-3 text-center font-semibold text-system-warning">
                    Recomendação
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Complexidade de Cálculo</td>
                  <td className="p-3 text-center text-primary-blue-dark">Muito Fácil</td>
                  <td className="p-3 text-center text-growth-green">Moderada</td>
                  <td className="p-3 text-center text-system-warning">Iniciantes</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Crescimento do Capital</td>
                  <td className="p-3 text-center">Linear</td>
                  <td className="p-3 text-center">Exponencial</td>
                  <td className="p-3 text-center">Longo Prazo</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Melhor Para</td>
                  <td className="p-3 text-center text-growth-green">Curto Prazo</td>
                  <td className="p-3 text-center">Longo Prazo</td>
                  <td className="p-3 text-center">Planejamento</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Previsibilidade</td>
                  <td className="p-3 text-center">Total</td>
                  <td className="p-3 text-center">Alta</td>
                  <td className="p-3 text-center">Controle</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Exemplo de Uso</td>
                  <td className="p-3 text-center">Empréstimos</td>
                  <td className="p-3 text-center">Investimentos</td>
                  <td className="p-3 text-center">Financeiro</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Fórmula</td>
                  <td className="p-3 text-center text-primary-blue-dark">M = C + (C × i × t)</td>
                  <td className="p-3 text-center text-growth-green">M = C × (1 + i)^t</td>
                  <td className="p-3 text-center text-system-warning">Matemática</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Curto Prazo</h4>
              <p className="text-sm text-text-secondary">
                Use <strong>Juros Simples</strong> para aplicações de até 2 anos onde a simplicidade
                é importante.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">💰 Longo Prazo</h4>
              <p className="text-sm text-text-secondary">
                Prefira <strong>Juros Compostos</strong> para investimentos de longo prazo pelo
                crescimento exponencial.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">📈 Educação</h4>
              <p className="text-sm text-text-secondary">
                Comece com <strong>Juros Simples</strong> para entender os conceitos básicos antes
                dos compostos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Juros Simples"
        items={[
          {
            question: "O que são juros simples?",
            answer:
              "Juros simples são calculados apenas sobre o capital inicial, sem incidência de juros sobre juros acumulados. O crescimento é linear e proporcional ao tempo, sendo fácil de calcular e entender.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a fórmula dos juros simples?",
            answer:
              "A fórmula é M = C + (C × i × t), onde M é o montante final, C é o capital inicial, i é a taxa de juros por período (em decimal) e t é o número de períodos. Esta calculadora aplica essa fórmula automaticamente.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a diferença entre juros simples e compostos?",
            answer:
              "Nos juros simples, os juros são calculados apenas sobre o capital inicial, gerando crescimento linear. Nos juros compostos, os juros são calculados sobre o capital inicial + juros acumulados, gerando crescimento exponencial.",
            borderColor: "system-info",
          },
          {
            question: "Quando usar juros simples?",
            answer:
              "Juros simples são ideais para investimentos de curto prazo, empréstimos diretos e situações onde a simplicidade do cálculo é mais importante que o crescimento exponencial.",
            borderColor: "system-warning",
          },
          {
            question: "Como escolher entre meses e anos?",
            answer:
              "Use 'meses' para aplicações de curto prazo (até 2 anos) para melhor resultado. Use 'anos' para planejamentos mais longos. A calculadora converte automaticamente para cálculos mensais.",
            borderColor: "growth-green",
          },
          {
            question: "Que taxa de juros usar na simulação?",
            answer:
              "Use taxas realistas baseadas no tipo de aplicação: empréstimos (15-30% a.a.), algumas contas de poupança (6-8% a.a.) ou aplicações especiais que usem juros simples.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Juros Simples",
          content:
            "<strong>Juros simples são ideais para:</strong> situações onde você confiável de previsibilidade total e cálculos transparentes. São perfeitos para entender os conceitos básicos antes de avançar para juros compostos.",
        }}
        footerText="<strong>Lembre-se:</strong> Embora juros simples sejam menos rentáveis no longo prazo, eles oferecem clareza e previsibilidade total, sendo excelentes para fins educacionais e aplicações específicas."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora de Juros Simples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora de juros simples</strong>{" "}
              utiliza <strong className="text-growth-green">a fórmula matemática clássica</strong> M
              = C + (C × i × t) para calcular o crescimento linear do capital ao longo do tempo.
            </p>
            <p>
              <strong>Configurações disponíveis:</strong> Capital inicial, taxa de juros e período
              em meses ou anos. A calculadora distribui os juros de forma linear ao longo do
              período.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
              fins educacionais e de planejamento financeiro. Para decisões de investimento,
              consulte sempre um <strong>assessor financeiro qualificado</strong> e considere taxas
              reais de mercado.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🧮 Fórmula simples • 📈 Crescimento linear • 🔒 Dados não armazenados • 📱 Compatível
              com todos os dispositivos • 🌙 Interface otimizada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="juros-simples" />
    </div>
  );
}
