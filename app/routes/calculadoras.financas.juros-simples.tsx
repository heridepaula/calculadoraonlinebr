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
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { calculateSimpleInterest } from "~/utils/calculations";
import type { InterestCalculation } from "~/types";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Juros Simples 2025 - Fácil e Precisa - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora de Juros Simples GRATUITA e fácil de usar. Calcule juros, capital, taxa ou tempo com fórmulas detalhadas. Ideal para empréstimos, financiamentos e aplicações de curto prazo. Ferramenta educacional completa com exemplos práticos.",
    },
    {
      name: "keywords",
      content:
        "calculadora juros simples, como calcular juros simples, fórmula juros simples, juros lineares, empréstimo curto prazo, desconto duplicata, calculadora financeira, matemática financeira, juros sobre capital inicial, cálculo de juros, simulador empréstimo, taxa de juros, capital inicial, tempo aplicação, rendimento linear, juros não compostos",
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
      content: `Calculadora de Juros Simples - Rápida e Precisa - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Calcule juros simples facilmente! Ferramenta gratuita com fórmulas detalhadas e exemplos práticos. Ideal para estudantes, profissionais e educação financeira.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/juros-simples",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Juros Simples - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Calcule juros simples com nossa ferramenta gratuita. Fórmulas explicadas passo a passo!",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

type CalculationMode = "findAmount" | "findPrincipal" | "findRate" | "findTime";

export default function SimpleInterestCalculator() {
  const [mode, setMode] = useState<CalculationMode>("findAmount");
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [result, setResult] = useState<InterestCalculation | null>(null);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "juros_simples",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("juros_simples");

  const handleCalculate = () => {
    const principalNum = parseFloat(principal) || 0;
    const rateNum = parseFloat(rate) || 0;
    const timeNum = parseFloat(time) || 0;
    const targetAmountNum = parseFloat(targetAmount) || 0;

    let calculation: InterestCalculation | null = null;
    let calculated: number | null = null;

    switch (mode) {
      case "findAmount":
        if (principalNum > 0 && rateNum > 0 && timeNum > 0) {
          calculation = calculateSimpleInterest(principalNum, rateNum, timeNum);
        }
        break;
      case "findPrincipal":
        if (targetAmountNum > 0 && rateNum > 0 && timeNum > 0) {
          // M = P + (P * i * t) = P(1 + i*t)
          // P = M / (1 + i*t)
          calculated = targetAmountNum / (1 + (rateNum / 100) * timeNum);
          calculation = calculateSimpleInterest(calculated, rateNum, timeNum);
        }
        break;
      case "findRate":
        if (principalNum > 0 && targetAmountNum > 0 && timeNum > 0) {
          // M = P(1 + i*t)
          // i = (M/P - 1) / t
          calculated = ((targetAmountNum / principalNum - 1) / timeNum) * 100;
          calculation = calculateSimpleInterest(principalNum, calculated, timeNum);
        }
        break;
      case "findTime":
        if (principalNum > 0 && targetAmountNum > 0 && rateNum > 0) {
          // M = P(1 + i*t)
          // t = (M/P - 1) / i
          calculated = (targetAmountNum / principalNum - 1) / (rateNum / 100);
          calculation = calculateSimpleInterest(principalNum, rateNum, calculated);
        }
        break;
    }

    setResult(calculation);
    setCalculatedValue(calculated);
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTargetAmount("");
    setResult(null);
    setCalculatedValue(null);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const getModeTitle = () => {
    switch (mode) {
      case "findAmount":
        return "Calcular Montante Final";
      case "findPrincipal":
        return "Calcular Capital Inicial";
      case "findRate":
        return "Calcular Taxa de Juros";
      case "findTime":
        return "Calcular Tempo";
    }
  };

  const getModeDescription = () => {
    switch (mode) {
      case "findAmount":
        return "Descubra quanto você terá ao final do período";
      case "findPrincipal":
        return "Descubra quanto precisa investir inicialmente";
      case "findRate":
        return "Descubra qual taxa de juros está sendo aplicada";
      case "findTime":
        return "Descubra em quanto tempo atingirá o valor desejado";
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Juros Simples</BreadcrumbItem>
      </Breadcrumb>

      {/* S-Tier Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-finance-gold/5 via-surface to-surface-dark">
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-24">
          <div className="mb-6 inline-flex items-center rounded-full bg-finance-gold/10 px-4 py-2 text-sm font-medium text-finance-gold-dark ring-1 ring-inset ring-finance-gold/20">
            <span className="mr-2">📐</span>
            Calculadora Educativa com 4 Modos de Cálculo
          </div>
          
          <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Calculadora de
            <span className="block bg-gradient-to-r from-finance-gold via-finance-gold-light to-finance-gold bg-clip-text text-transparent">
              Juros Simples
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Domine os <strong className="text-finance-gold-dark">juros simples</strong> com nossa calculadora educativa.
            Encontre <strong className="text-system-success">capital, taxa, tempo ou montante</strong> com 
            explicações detalhadas e fórmulas interativas.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3 lg:gap-6">
            <div className="rounded-xl bg-finance-gold/10 p-4 ring-1 ring-finance-gold/20">
              <div className="text-2xl font-bold text-finance-gold-dark">4</div>
              <div className="text-sm text-text-secondary">Modos de Cálculo</div>
            </div>
            <div className="rounded-xl bg-system-success/10 p-4 ring-1 ring-system-success/20">
              <div className="text-2xl font-bold text-system-success">📐</div>
              <div className="text-sm text-text-secondary">Fórmulas Explicadas</div>
            </div>
            <div className="rounded-xl bg-primary-blue/10 p-4 ring-1 ring-primary-blue/20">
              <div className="text-2xl font-bold text-primary-blue-dark">💡</div>
              <div className="text-sm text-text-secondary">Conteúdo Educativo</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center space-y-8">

        {/* Seletor de Modo */}
        <Card className="bg-system-info/5/5 border-2 border-system-info duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-system-info">
              🎯 O que você quer calcular?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  value: "findAmount",
                  label: "Montante Final",
                  icon: "💰",
                  desc: "Valor final após juros",
                },
                {
                  value: "findPrincipal",
                  label: "Capital Inicial",
                  icon: "🏦",
                  desc: "Investimento necessário",
                },
                {
                  value: "findRate",
                  label: "Taxa de Juros",
                  icon: "📈",
                  desc: "Percentual aplicado",
                },
                { value: "findTime", label: "Tempo", icon: "⏱️", desc: "Período necessário" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMode(option.value as CalculationMode)}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    mode === option.value
                      ? "border-system-info bg-system-info-dark text-white"
                      : "hover:border-system-info:border-system-info-dark border-neutral-surface-variant bg-background-dark-secondary"
                  }`}
                >
                  <div className="mb-2 text-2xl">{option.icon}</div>
                  <div className="mb-1 text-sm font-semibold">{option.label}</div>
                  <div className="text-xs opacity-80">{option.desc}</div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-system-info">{getModeTitle()}</h3>
              <p className="text-sm text-text-secondary">{getModeDescription()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle as="h2">Dados para o Cálculo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {mode !== "findPrincipal" && (
                <MoneyInput
                  label="Capital Inicial"
                  value={principal}
                  onChange={(value) => setPrincipal(value)}
                  placeholder="1.000,00"
                  min="0.01"
                  required={mode !== "findPrincipal"}
                  fullWidth
                />
              )}

              {mode === "findPrincipal" && (
                <MoneyInput
                  label="Montante Desejado"
                  value={targetAmount}
                  onChange={(value) => setTargetAmount(value)}
                  placeholder="1.200,00"
                  min="0.01"
                  required
                  fullWidth
                />
              )}

              {mode !== "findRate" && (
                <RateInput
                  label="Taxa de Juros (% ao período)"
                  value={rate}
                  onChange={(value) => setRate(value)}
                  placeholder="0,00"
                  required={mode !== "findRate"}
                  fullWidth
                />
              )}

              {mode === "findRate" && (
                <MoneyInput
                  label="Montante Desejado"
                  value={targetAmount}
                  onChange={(value) => setTargetAmount(value)}
                  placeholder="1.200,00"
                  min="0.01"
                  required
                  fullWidth
                />
              )}

              {mode !== "findTime" && (
                <Input
                  type="number"
                  label="Tempo (períodos)"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Ex: 12"
                  min="0"
                  step="0.1"
                  required={mode !== "findTime"}
                  fullWidth
                />
              )}

              {mode === "findTime" && (
                <MoneyInput
                  label="Montante Desejado"
                  value={targetAmount}
                  onChange={(value) => setTargetAmount(value)}
                  placeholder="1.200,00"
                  min="0.01"
                  required
                  fullWidth
                />
              )}
            </div>

            {/* Action Buttons - Prominent S-Tier Design */}
            <div className="mt-8 space-y-4">
              <Button 
                onClick={handleCalculate} 
                className="h-14 px-12 text-lg font-semibold bg-finance-gold hover:bg-finance-gold-dark text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
                fullWidth
              >
                📐 {getModeTitle()}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 border-2 border-finance-gold/30 text-finance-gold hover:bg-finance-gold/10 hover:border-finance-gold transition-all duration-200"
                fullWidth
              >
                🔄 Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hero Result Card - S-Tier Prominence */}
        {result && (
          <>
            <Card className="border-4 border-finance-gold bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full bg-finance-gold/20 px-4 py-2 text-sm font-medium text-finance-gold-dark">
                      📊 {getModeTitle()}
                    </span>
                  </div>
                  <div className="text-5xl font-bold text-finance-gold-dark mb-2">
                    {mode === "findAmount" && formatCurrency(result.result)}
                    {mode === "findPrincipal" && calculatedValue && formatCurrency(calculatedValue)}
                    {mode === "findRate" && calculatedValue && `${calculatedValue.toFixed(2)}%`}
                    {mode === "findTime" && calculatedValue && `${calculatedValue.toFixed(2)} períodos`}
                  </div>
                  <p className="text-lg text-text-secondary mb-6">
                    {getModeDescription()}
                  </p>
                  
                  {mode === "findAmount" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-system-success/10 border border-system-success/20">
                        <div className="text-2xl font-bold text-system-success">
                          {formatCurrency(result.result - result.principal)}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">Juros Ganhos</p>
                      </div>
                      <div className="p-4 rounded-xl bg-primary-blue/10 border border-primary-blue/20">
                        <div className="text-2xl font-bold text-primary-blue-dark">
                          {formatCurrency(result.principal)}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">Capital Inicial</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  📊 Detalhamento do Cálculo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Capital inicial:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(result.principal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Taxa de juros:</span>
                      <span className="font-medium text-text-primary">{result.rate}% ao período</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Tempo:</span>
                      <span className="font-medium text-text-primary">{result.time} períodos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Juros ganhos:</span>
                      <span className="font-medium tabular-nums text-system-success">
                        {formatCurrency(result.result - result.principal)}
                      </span>
                    </div>
                    <hr className="border-neutral-surface-variant" />
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold text-text-primary">Montante final:</span>
                      <span className="font-bold tabular-nums text-primary-blue-dark">
                        {formatCurrency(result.result)}
                      </span>
                    </div>
                  </div>

                <div className="rounded-lg bg-gray-900 p-4">
                  <h4 className="mb-3 font-bold text-primary-blue-dark">🔢 Fórmula Utilizada</h4>
                  <div className="space-y-2 text-sm">
                    <div className="rounded bg-primary-blue-light p-3 text-center font-mono">
                      <div className="font-bold text-primary-blue-dark">J = P × i × t</div>
                      <div className="font-bold text-primary-blue-dark">M = P + J</div>
                    </div>
                    <div className="space-y-1 text-text-secondary">
                      <p>
                        <strong>J</strong> = Juros
                      </p>
                      <p>
                        <strong>P</strong> = Capital/Principal
                      </p>
                      <p>
                        <strong>i</strong> = Taxa de juros
                      </p>
                      <p>
                        <strong>t</strong> = Tempo
                      </p>
                      <p>
                        <strong>M</strong> = Montante
                      </p>
                    </div>
                    {mode !== "findAmount" && calculatedValue && (
                      <div className="mt-3 rounded border border-system-success/20 bg-system-success/10 p-3">
                        <p className="font-bold text-system-success">
                          Valor calculado:{" "}
                          {mode === "findPrincipal"
                            ? formatCurrency(calculatedValue)
                            : mode === "findRate"
                              ? `${calculatedValue.toFixed(2)}%`
                              : `${calculatedValue.toFixed(2)} períodos`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </>
        )}

        {/* Seção: O que são Juros Simples */}
        <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-info/20 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
              📐 O que são Juros Simples? Conceito Fundamental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-text-primary">
              <div className="text-lg leading-relaxed">
                <p>
                  <strong className="text-primary-blue-dark">Juros simples</strong> são juros
                  calculados
                  <strong className="text-system-success">
                    {" "}
                    apenas sobre o valor inicial
                  </strong>{" "}
                  (capital principal), sem considerar os juros já acumulados. É um sistema de{" "}
                  <em>crescimento linear</em>, onde o valor dos juros permanece constante a cada
                  período.
                </p>
              </div>

              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                  🔢 Fórmulas dos Juros Simples
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-bold text-primary-blue-dark">Fórmula Principal</h4>
                    <div className="mb-3 text-center font-mono text-xl text-primary-blue-dark">
                      <div>
                        <strong>J = P × i × t</strong>
                      </div>
                      <div>
                        <strong>M = P + J</strong>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>J</strong> = Valor dos juros
                      </p>
                      <p>
                        <strong>P</strong> = Capital principal (inicial)
                      </p>
                      <p>
                        <strong>i</strong> = Taxa de juros (decimal)
                      </p>
                      <p>
                        <strong>t</strong> = Período de aplicação
                      </p>
                      <p>
                        <strong>M</strong> = Montante final
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-bold text-system-info">Variações da Fórmula</h4>
                    <div className="space-y-2 font-mono text-sm">
                      <div>
                        <strong>Para encontrar P:</strong>
                        <br />P = J ÷ (i × t)
                      </div>
                      <div>
                        <strong>Para encontrar i:</strong>
                        <br />i = J ÷ (P × t)
                      </div>
                      <div>
                        <strong>Para encontrar t:</strong>
                        <br />t = J ÷ (P × i)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-system-success/20 bg-system-success/10 p-6">
                  <h4 className="mb-3 text-lg font-bold text-system-success">
                    ✅ Vantagens dos Juros Simples
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      • <strong>Simplicidade:</strong> Fácil de calcular e entender
                    </li>
                    <li>
                      • <strong>Previsibilidade:</strong> Valor dos juros sempre igual
                    </li>
                    <li>
                      • <strong>Transparência:</strong> Cálculo direto sem complicações
                    </li>
                    <li>
                      • <strong>Rapidez:</strong> Ideal para períodos curtos
                    </li>
                    <li>
                      • <strong>Controle:</strong> Fácil planejamento financeiro
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-system-warning/20 bg-system-warning/10 p-6">
                  <h4 className="mb-3 text-lg font-bold text-system-warning">⚠️ Limitações</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      • <strong>Crescimento linear:</strong> Não aproveita o "efeito multiplicador"
                    </li>
                    <li>
                      • <strong>Menor rendimento:</strong> No longo prazo, rende menos que juros
                      compostos
                    </li>
                    <li>
                      • <strong>Uso limitado:</strong> Pouco usado em investimentos modernos
                    </li>
                    <li>
                      • <strong>Inflação:</strong> Não protege contra perda de poder de compra
                    </li>
                    <li>
                      • <strong>Oportunidade:</strong> Perde o potencial de reinvestimento
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Onde são Usados */}
        <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              🏦 Onde os Juros Simples são Aplicados na Prática
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-text-primary">
                <p className="mb-4 text-lg">
                  Embora menos comuns que os juros compostos, os juros simples ainda são utilizados
                  em
                  <strong className="text-system-info"> situações específicas</strong>
                  do mercado financeiro e comercial brasileiro.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-bold text-system-success">
                    ✅ Principais Aplicações
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">
                        📄 Desconto de Duplicatas
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Bancos usam juros simples para calcular o desconto de duplicatas e títulos a
                        receber, principalmente em operações de curto prazo.
                      </p>
                    </div>

                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">
                        💼 Empréstimos de Curto Prazo
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Algumas modalidades de empréstimo pessoal e empresarial de curto prazo
                        utilizam juros simples para facilitar o cálculo.
                      </p>
                    </div>

                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">
                        🏪 Operações Comerciais
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Descontos para pagamento à vista, multas de atraso simples, e algumas
                        modalidades de crediário utilizam este sistema.
                      </p>
                    </div>

                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">
                        📚 Educação Financeira
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Amplamente usado no ensino de matemática financeira básica por ser mais
                        simples de compreender e calcular.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold text-primary-blue-dark">
                    📊 Exemplos Práticos Brasileiros
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-primary-blue-light p-4">
                      <h4 className="mb-2 font-semibold text-primary-blue-dark">
                        💰 Exemplo 1: Desconto de Duplicata
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Situação:</strong> Empresa quer antecipar R$ 10.000
                        </p>
                        <p>
                          <strong>Prazo:</strong> 60 dias
                        </p>
                        <p>
                          <strong>Taxa:</strong> 3% ao mês
                        </p>
                        <p>
                          <strong>Desconto:</strong> R$ 10.000 × 0,03 × 2 = R$ 600
                        </p>
                        <p className="font-bold text-primary-blue-dark">Valor líquido: R$ 9.400</p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-info">
                        🏪 Exemplo 2: Desconto à Vista
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Produto:</strong> R$ 1.000 em 30 dias
                        </p>
                        <p>
                          <strong>Desconto à vista:</strong> 5%
                        </p>
                        <p>
                          <strong>Equivale a:</strong> 5% ao mês
                        </p>
                        <p className="font-bold text-system-info">Preço à vista: R$ 950</p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">
                        ⏰ Exemplo 3: Multa de Atraso
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Conta:</strong> R$ 500
                        </p>
                        <p>
                          <strong>Atraso:</strong> 15 dias
                        </p>
                        <p>
                          <strong>Multa:</strong> 2% + 1% ao mês
                        </p>
                        <p>
                          <strong>Cálculo:</strong> R$ 10 + (R$ 500 × 0,01 × 0,5) = R$ 12,50
                        </p>
                        <p className="font-bold text-system-warning">Total: R$ 512,50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Juros Simples vs Compostos */}
        <Card className="border-l-4 border-system-warning bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              ⚖️ Juros Simples vs Juros Compostos - Comparação Completa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg text-text-primary">
                <p>
                  A principal diferença está no{" "}
                  <strong className="text-system-warning">método de cálculo</strong>: juros simples
                  incidem apenas sobre o capital inicial, enquanto juros compostos incidem sobre o
                  montante acumulado.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full overflow-hidden rounded-lg border border-neutral-surface-variant text-sm">
                  <thead className="bg-primary-blue-light">
                    <tr>
                      <th className="p-3 text-left font-bold text-primary-blue-dark">Aspecto</th>
                      <th className="p-3 text-center font-bold text-primary-blue-dark">
                        Juros Simples
                      </th>
                      <th className="p-3 text-center font-bold text-growth-green">
                        Juros Compostos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light">
                    <tr>
                      <td className="p-3 font-semibold">Fórmula</td>
                      <td className="p-3 text-center font-mono text-primary-blue-dark">
                        J = P × i × t
                      </td>
                      <td className="p-3 text-center font-mono text-growth-green">
                        M = P × (1 + i)^t
                      </td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Base de Cálculo</td>
                      <td className="p-3 text-center">Sempre sobre o capital inicial</td>
                      <td className="p-3 text-center">Sobre o montante acumulado</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Crescimento</td>
                      <td className="p-3 text-center text-primary-blue-dark">Linear (constante)</td>
                      <td className="p-3 text-center text-growth-green">
                        Exponencial (acelerando)
                      </td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Complexidade</td>
                      <td className="p-3 text-center text-system-success">Simples</td>
                      <td className="p-3 text-center text-system-warning">Mais complexo</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Melhor Para</td>
                      <td className="p-3 text-center">Curto prazo</td>
                      <td className="p-3 text-center">Longo prazo</td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Uso no Mercado</td>
                      <td className="p-3 text-center">Limitado</td>
                      <td className="p-3 text-center">Predominante</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Exemplo Comparativo Visual */}
              <div className="rounded-xl border border-system-warning/20 bg-system-warning/10 p-6">
                <h4 className="mb-4 text-center text-lg font-bold text-system-warning">
                  📊 Exemplo Comparativo: R$ 1.000 a 10% ao ano
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h5 className="mb-3 text-center font-bold text-primary-blue-dark">
                      📈 Juros Simples
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ano 1:</span>
                        <span>
                          R$ 1.000 + R$ 100 = <strong>R$ 1.100</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ano 2:</span>
                        <span>
                          R$ 1.100 + R$ 100 = <strong>R$ 1.200</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ano 3:</span>
                        <span>
                          R$ 1.200 + R$ 100 = <strong>R$ 1.300</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ano 5:</span>
                        <span>
                          R$ 1.400 + R$ 100 = <strong>R$ 1.500</strong>
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-primary-blue/30 pt-2">
                        <span>Ano 10:</span>
                        <span className="font-bold text-primary-blue-dark">R$ 2.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h5 className="mb-3 text-center font-bold text-growth-green">
                      📈 Juros Compostos
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ano 1:</span>
                        <span>
                          R$ 1.000 × 1,10 = <strong>R$ 1.100</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ano 2:</span>
                        <span>
                          R$ 1.100 × 1,10 = <strong>R$ 1.210</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ano 3:</span>
                        <span>
                          R$ 1.210 × 1,10 = <strong>R$ 1.331</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ano 5:</span>
                        <span>
                          R$ 1.464 × 1,10 = <strong>R$ 1.611</strong>
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-growth-green/30 pt-2">
                        <span>Ano 10:</span>
                        <span className="font-bold text-growth-green">R$ 2.594</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-system-warning p-3 text-center text-white">
                  <p className="text-lg font-bold">
                    Diferença após 10 anos: R$ 594 (29,7% a mais com juros compostos!)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Juros Simples"
          items={[
            {
              question: "Qual a fórmula dos juros simples e como aplicá-la corretamente?",
              answer:
                "A fórmula é <strong>J = C × i × t</strong> onde J=juros, C=capital, i=taxa (decimal), t=tempo. Para o montante: <strong>M = C + J</strong>. Exemplo: R$ 1.000 a 5% ao mês por 6 meses = R$ 1.000 × 0,05 × 6 = <strong>R$ 300 de juros</strong>.",
              borderColor: "primary-blue",
            },
            {
              question: "Qual a diferença entre juros simples e juros compostos na prática?",
              answer:
                "Nos <strong>juros simples</strong>, os juros incidem apenas sobre o capital inicial. Nos <strong>juros compostos</strong>, incidem sobre capital + juros acumulados. Exemplo: R$ 1.000 a 10% por 3 anos: simples = R$ 1.300, compostos = R$ 1.331.",
              borderColor: "growth-green",
            },
            {
              question: "Como converter taxas de juros entre diferentes períodos?",
              answer:
                "Para juros simples: <strong>Taxa mensal = Taxa anual ÷ 12</strong>, <strong>Taxa diária = Taxa anual ÷ 365</strong>. Exemplo: 12% ao ano = 1% ao mês = 0,033% ao dia. Sempre mantenha taxa e tempo na mesma unidade!",
              borderColor: "system-info",
            },
            {
              question: "Quando usar juros simples ao invés de juros compostos?",
              answer:
                "Use juros simples para: <strong>operações de curto prazo</strong> (até 1 ano), desconto de duplicatas, multas contratuais, estudos matemáticos básicos. Para investimentos e financiamentos longos, use <strong>juros compostos</strong>.",
              borderColor: "system-warning",
            },
            {
              question: "Como calcular o tempo necessário para atingir determinado valor?",
              answer:
                "Use a fórmula: <strong>t = (M - C) ÷ (C × i)</strong>. Exemplo: Para R$ 1.000 virarem R$ 1.500 a 10% ao ano: t = (1.500 - 1.000) ÷ (1.000 × 0,10) = <strong>5 anos</strong>.",
              borderColor: "growth-green",
            },
            {
              question: "Posso usar esta calculadora para descontos e antecipações?",
              answer:
                "<strong>Sim!</strong> Para descontos por antecipação, use taxa negativa ou calcule o desconto e subtraia do valor. Exemplo: Antecipação de 3 meses com 2% de desconto mensal = 6% de desconto total.",
              borderColor: "system-success",
            },
            {
              question: "Como validar se meus cálculos de juros simples estão corretos?",
              answer:
                "Verifique se: <strong>1)</strong> Taxa e tempo estão na mesma unidade, <strong>2)</strong> Taxa está em decimal (5% = 0,05), <strong>3)</strong> M = C + J, <strong>4)</strong> J = C × i × t. Nossa calculadora faz essas validações automaticamente!",
              borderColor: "primary-blue",
            },
            {
              question: "Quais os erros mais comuns no cálculo de juros simples?",
              answer:
                "Principais erros: <strong>1)</strong> Não converter % para decimal, <strong>2)</strong> Misturar unidades de tempo, <strong>3)</strong> Confundir capital com montante, <strong>4)</strong> Usar juros simples para períodos longos (ideal: juros compostos).",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "Para <strong>facilitar os cálculos</strong>, sempre converta a taxa percentual para decimal dividindo por 100, e mantenha taxa e tempo na mesma unidade. Juros simples são ideais para operações de até 1 ano!",
          }}
          footerText="<strong>Precisa de mais cálculos?</strong> Nossa calculadora oferece 4 modos diferentes para encontrar qualquer variável da fórmula de juros simples com precisão matemática!"
        />

        {/* Footer */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Sobre Esta Calculadora de Juros Simples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta{" "}
                <strong className="text-primary-blue-dark">calculadora de juros simples</strong> é
                <strong className="text-system-success"> 100% gratuita</strong> e oferece 4 modos de
                cálculo para encontrar qualquer variável da fórmula de juros simples. Ideal para
                estudantes, profissionais e educação financeira básica.
              </p>
              <p>
                <strong>Recursos inclusos:</strong> Múltiplos modos de cálculo, fórmulas detalhadas,
                exemplos práticos, comparação com juros compostos, e conteúdo educacional abrangente
                sobre matemática financeira.
              </p>
              <p>
                <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para
                fins educacionais e de planejamento. Para decisões financeiras importantes, consulte
                sempre um
                <strong> consultor financeiro</strong> ou <strong>contador</strong> qualificado.
              </p>
              <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                ⚖️ Cálculos baseados em fórmulas matemáticas padronizadas • 🎓 Ferramenta
                educacional gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos
                os dispositivos • 🌙 Modo escuro disponível • 🚀 Interface moderna e intuitiva
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
              name: "Calculadora de Juros Simples",
              description:
                "Calculadora online gratuita para calcular juros simples com 4 modos de cálculo. Encontre capital, taxa, tempo ou montante facilmente.",
              url: "https://calculadorasonline.com.br/calculadoras/financas/juros-simples",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
              featureList: [
                "Cálculo de juros simples",
                "4 modos de cálculo",
                "Fórmulas detalhadas",
                "Exemplos práticos",
                "Comparação com juros compostos",
                "100% gratuito",
              ],
              author: {
                "@type": "Organization",
                name: "Calculadora Online BR",
              },
              publisher: {
                "@type": "Organization",
                name: "Calculadora Online BR",
              },
            }),
          }}
        />

        <RelatedCalculators category="financas" currentCalculatorId="juros-simples" />
      </div>
    </div>
  );
}
