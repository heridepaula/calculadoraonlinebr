import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  MoneyInput,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  RateInput,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculateConsortium,
  type ConsortiumParams,
  type ConsortiumResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Consórcio 2025 - Simule Parcelas e Compare com Financiamento - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora de consórcio GRATUITA e precisa! Simule parcelas de veículos, imóveis e motos. Compare com financiamento, calcule taxas e veja vantagens. Resultado instantâneo com todas as taxas detalhadas.",
    },
    {
      name: "keywords",
      content:
        "calculadora consórcio, consórcio veículo, consórcio imóvel, consórcio moto, parcela consórcio, taxa administração, fundo reserva, consórcio vs financiamento, simulador consórcio, carta de crédito",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de Consórcio Completa 2025 - Simule e Compare - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Simule consórcios de veículos, imóveis e motos. Compare com financiamento e veja todas as taxas detalhadas. Ferramenta completa e gratuita!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonline.com.br/calculadoras/financas/consorcio",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Simulador de Consórcio Online - Calcule Parcelas 2025 - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Descubra se consórcio vale a pena! Simule parcelas, compare com financiamento e veja todas as vantagens e desvantagens.",
    },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "theme-color", content: "#3B82F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Consórcio",
        description:
          "Calculadora online gratuita para simular consórcios de veículos, imóveis e motos. Compare com financiamento e veja todas as taxas.",
        url: "https://calculadoraonline.com.br/calculadoras/financas/consorcio",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: "https://calculadoraonline.com.br",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Calculadoras",
              item: "https://calculadoraonline.com.br/calculadoras",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Finanças",
              item: "https://calculadoraonline.com.br/calculadoras/financas",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Consórcio",
              item: "https://calculadoraonline.com.br/calculadoras/financas/consorcio",
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "Calculadora Online BR",
          url: "https://calculadoraonline.com.br",
        },
      }),
    },
  ];
};

export default function ConsortiumCalculator() {
  const [result, setResult] = useState<ConsortiumResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Estados do formulário
  const [goodType, setGoodType] = useState<"vehicle" | "property" | "motorcycle" | "durables">(
    "vehicle"
  );
  const [calculationMode, setCalculationMode] = useState<"by_value" | "by_installment">("by_value");
  const [value, setValue] = useState("100000");
  const [termMonths, setTermMonths] = useState("84");
  const [adminFeeRate, setAdminFeeRate] = useState("15");
  const [reserveFundRate, setReserveFundRate] = useState("2.5");
  const [insuranceRate, setInsuranceRate] = useState("3");
  const [membershipFeeRate, setMembershipFeeRate] = useState("0");

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "consorcio",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("consorcio");

  // Função para processar valor monetário
  const parseMoneyValue = (value: string | number | undefined): number => {
    if (!value && value !== 0) {
      return 0;
    }

    if (typeof value === "number") {
      return value;
    }

    const stringValue = String(value);
    const cleanValue = stringValue.replace(/[^\d,.]/g, "");

    if (!cleanValue) {
      return 0;
    }

    if (cleanValue.includes(",")) {
      return parseFloat(cleanValue.replace(/\./g, "").replace(",", ".")) || 0;
    }

    return parseFloat(cleanValue) || 0;
  };

  // Função para processar percentual
  const parsePercentValue = (value: string): number => {
    return parseFloat(value) || 0;
  };

  // Configurações baseadas no tipo de bem
  const getDefaultValues = (type: typeof goodType) => {
    const defaults = {
      vehicle: { reserveFund: 2.5, maxTerm: 120, minTerm: 60 },
      property: { reserveFund: 3.0, maxTerm: 200, minTerm: 60 },
      motorcycle: { reserveFund: 2.0, maxTerm: 100, minTerm: 60 },
      durables: { reserveFund: 2.5, maxTerm: 120, minTerm: 60 },
    };
    return defaults[type];
  };

  // Atualiza valores padrão quando muda o tipo de bem
  useEffect(() => {
    const defaults = getDefaultValues(goodType);
    setReserveFundRate(defaults.reserveFund.toString());

    // Ajusta prazo se necessário
    const currentTerm = parseInt(termMonths);
    if (currentTerm > defaults.maxTerm) {
      setTermMonths(defaults.maxTerm.toString());
    } else if (currentTerm < defaults.minTerm) {
      setTermMonths(defaults.minTerm.toString());
    }
  }, [goodType]);

  // Cálculo em tempo real
  useEffect(() => {
    const calculate = () => {
      try {
        const valueNum = parseMoneyValue(value);
        const termNum = parseInt(termMonths) || 0;
        const adminFeeNum = parsePercentValue(adminFeeRate);
        const reserveFundNum = parsePercentValue(reserveFundRate);
        const insuranceNum = parsePercentValue(insuranceRate);
        const membershipFeeNum = parsePercentValue(membershipFeeRate);

        if (valueNum > 0 && termNum > 0) {
          setIsCalculating(true);

          const params: ConsortiumParams = {
            goodType,
            calculationMode,
            value: valueNum,
            termMonths: termNum,
            adminFeeRate: adminFeeNum,
            reserveFundRate: reserveFundNum,
            insuranceRate: insuranceNum > 0 ? insuranceNum : undefined,
            membershipFeeRate: membershipFeeNum > 0 ? membershipFeeNum : undefined,
          };

          const calculationResult = calculateConsortium(params);
          setResult(calculationResult);

          setTimeout(() => setIsCalculating(false), 100);
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error("Erro no cálculo:", error);
        setResult(null);
        setIsCalculating(false);
      }
    };

    calculate();
  }, [
    goodType,
    calculationMode,
    value,
    termMonths,
    adminFeeRate,
    reserveFundRate,
    insuranceRate,
    membershipFeeRate,
  ]);

  const handleCalculate = () => {
    // Força recálculo
    try {
      const valueNum = parseMoneyValue(value);
      const termNum = parseInt(termMonths) || 0;
      const adminFeeNum = parsePercentValue(adminFeeRate);
      const reserveFundNum = parsePercentValue(reserveFundRate);
      const insuranceNum = parsePercentValue(insuranceRate);
      const membershipFeeNum = parsePercentValue(membershipFeeRate);

      if (valueNum > 0 && termNum > 0) {
        setIsCalculating(true);

        const params: ConsortiumParams = {
          goodType,
          calculationMode,
          value: valueNum,
          termMonths: termNum,
          adminFeeRate: adminFeeNum,
          reserveFundRate: reserveFundNum,
          insuranceRate: insuranceNum > 0 ? insuranceNum : undefined,
          membershipFeeRate: membershipFeeNum > 0 ? membershipFeeNum : undefined,
        };

        const calculationResult = calculateConsortium(params);
        setResult(calculationResult);

        setTimeout(() => setIsCalculating(false), 100);
      }
    } catch (error) {
      console.error("Erro no cálculo manual:", error);
      setResult(null);
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setGoodType("vehicle");
    setCalculationMode("by_value");
    setValue("100000");
    setTermMonths("84");
    setAdminFeeRate("15");
    setReserveFundRate("2.5");
    setInsuranceRate("3");
    setMembershipFeeRate("0");
    setResult(null);
    setShowComparison(false);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const getGoodTypeLabel = (type: string) => {
    const labels = {
      vehicle: "Veículo",
      property: "Imóvel",
      motorcycle: "Motocicleta",
      durables: "Bens Duráveis",
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem>Consórcio</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            🚗 Calculadora de Consórcio - Simule e Compare 2025
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Simule{" "}
            <strong className="text-primary-blue-dark">
              consórcios de veículos, imóveis e motos
            </strong>{" "}
            com precisão. Compare{" "}
            <strong className="text-growth-green">vantagens vs financiamento</strong>, veja todas as
            taxas detalhadas e tome a{" "}
            <strong className="text-system-warning">melhor decisão financeira</strong> para realizar
            seu sonho!
          </p>
          <div className="inline-block rounded-lg bg-gradient-to-r from-primary-blue-light via-growth-green-soft to-system-warning/20 p-4">
            <p className="text-sm font-medium text-text-primary">
              📊 <strong>Taxas Reais 2025</strong> • 🚗 <strong>Todos os Tipos</strong> • 📈{" "}
              <strong>Projeções com Reajuste</strong> • ⚡ <strong>Comparativo Automático</strong>
            </p>
          </div>
        </header>

        {/* Formulário */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">Dados do Consórcio</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Tipo de Bem"
                  value={goodType}
                  onChange={(value) => setGoodType(value as typeof goodType)}
                  options={[
                    { value: "vehicle", label: "Veículo (Carro)" },
                    { value: "motorcycle", label: "Motocicleta" },
                    { value: "property", label: "Imóvel" },
                    { value: "durables", label: "Bens Duráveis" },
                  ]}
                  fullWidth
                />

                <Select
                  label="Forma de Cálculo"
                  value={calculationMode}
                  onChange={(value) => setCalculationMode(value as typeof calculationMode)}
                  options={[
                    { value: "by_value", label: "Por Valor do Bem" },
                    { value: "by_installment", label: "Por Valor da Parcela" },
                  ]}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <MoneyInput
                  label={
                    calculationMode === "by_value" ? "Valor do Bem" : "Valor da Parcela Desejada"
                  }
                  value={value}
                  onChange={setValue}
                  placeholder="R$ 100.000,00"
                  help={
                    calculationMode === "by_value"
                      ? "Valor total do bem que deseja adquirir"
                      : "Valor que você quer pagar mensalmente"
                  }
                  required
                  fullWidth
                />

                <Input
                  type="number"
                  label="Prazo do Consórcio (meses)"
                  value={termMonths}
                  onChange={(e) => setTermMonths(e.target.value)}
                  placeholder="84"
                  min={getDefaultValues(goodType).minTerm}
                  max={getDefaultValues(goodType).maxTerm}
                  help={`Entre ${getDefaultValues(goodType).minTerm} e ${getDefaultValues(goodType).maxTerm} meses para ${getGoodTypeLabel(goodType).toLowerCase()}`}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RateInput
                  label="Taxa de Administração (%)"
                  value={adminFeeRate}
                  onChange={setAdminFeeRate}
                  placeholder="15,00"
                  help="Média de mercado: 12% a 18%"
                  min="10"
                  max="22.5"
                  fullWidth
                />

                <RateInput
                  label="Fundo de Reserva (%)"
                  value={reserveFundRate}
                  onChange={setReserveFundRate}
                  placeholder="2,50"
                  help="Reserva para inadimplência e despesas"
                  min="2"
                  max="5"
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RateInput
                  label="Seguro (% - Opcional)"
                  value={insuranceRate}
                  onChange={setInsuranceRate}
                  placeholder="3,00"
                  help="Recomendado para veículos e motos"
                  min="0"
                  max="10"
                  fullWidth
                />

                <RateInput
                  label="Taxa de Adesão (% - Opcional)"
                  value={membershipFeeRate}
                  onChange={setMembershipFeeRate}
                  placeholder="0,00"
                  help="Taxa única cobrada no início"
                  min="0"
                  max="5"
                  fullWidth
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button type="button" onClick={handleCalculate} className="px-8">
                  Calcular
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                >
                  Limpar
                </Button>
              </div>

              <div className="rounded-lg border border-primary-blue/20 bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4">
                <div className="text-center">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    💡 Diferencial Exclusivo
                  </h4>
                  <p className="text-sm text-text-secondary">
                    🔥 <strong>Simulação Completa:</strong> Nossa calculadora inclui comparativo com
                    financiamento, projeção de reajustes e todas as taxas do mercado. Veja se
                    consórcio realmente vale a pena!
                  </p>
                  <Button
                    type="button"
                    onClick={() => setShowComparison(!showComparison)}
                    variant="outline"
                    className="mt-2 text-xs"
                  >
                    {showComparison ? "Ocultar" : "Mostrar"} Comparativo Detalhado
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h2">Resultado da Simulação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Valor Principal */}
                <div className="rounded-lg bg-gradient-to-r from-primary-blue-light to-growth-green-soft p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-primary-blue-dark">
                    {formatCurrency(result.monthlyPayment.total)}
                  </div>
                  <div className="text-sm text-text-secondary">Parcela Mensal do Consórcio</div>
                  <div className="mt-1 text-xs text-text-secondary">
                    {getGoodTypeLabel(goodType)} • {termMonths} meses
                  </div>
                </div>

                {/* Breakdown da Parcela */}
                <div>
                  <h4 className="mb-3 font-semibold text-text-primary">
                    💰 Composição da Parcela Mensal:
                  </h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded border border-growth-green/20 bg-growth-green/10 p-3">
                      <div>
                        <div className="font-medium text-growth-green">Fundo Comum</div>
                        <div className="text-xs text-text-secondary">Valor do bem ÷ prazo</div>
                      </div>
                      <div className="font-semibold text-growth-green">
                        {formatCurrency(result.monthlyPayment.commonFund)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded border border-system-warning/20 bg-system-warning/10 p-3">
                      <div>
                        <div className="font-medium text-system-warning">Taxa de Administração</div>
                        <div className="text-xs text-text-secondary">{adminFeeRate}% do valor</div>
                      </div>
                      <div className="font-semibold text-system-warning">
                        {formatCurrency(result.monthlyPayment.adminFee)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded border border-primary-blue/20 bg-primary-blue/10 p-3">
                      <div>
                        <div className="font-medium text-primary-blue-dark">Fundo de Reserva</div>
                        <div className="text-xs text-text-secondary">
                          {reserveFundRate}% do valor
                        </div>
                      </div>
                      <div className="font-semibold text-primary-blue-dark">
                        {formatCurrency(result.monthlyPayment.reserveFund)}
                      </div>
                    </div>

                    {result.monthlyPayment.insurance > 0 && (
                      <div className="flex items-center justify-between rounded border border-system-info/20 bg-system-info/10 p-3">
                        <div>
                          <div className="font-medium text-system-info">Seguro</div>
                          <div className="text-xs text-text-secondary">
                            {insuranceRate}% do valor
                          </div>
                        </div>
                        <div className="font-semibold text-system-info">
                          {formatCurrency(result.monthlyPayment.insurance)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                  <div className="rounded bg-neutral-surface/20 p-4 text-center">
                    <div className="text-lg font-semibold text-text-primary">
                      {formatCurrency(result.totalValues.goodValue)}
                    </div>
                    <div className="text-text-secondary">Valor do Bem</div>
                  </div>

                  <div className="rounded bg-neutral-surface/20 p-4 text-center">
                    <div className="text-lg font-semibold text-text-primary">
                      {formatCurrency(result.totalValues.totalPaid)}
                    </div>
                    <div className="text-text-secondary">Total Pago</div>
                  </div>

                  <div className="rounded bg-neutral-surface/20 p-4 text-center">
                    <div className="text-lg font-semibold text-system-error">
                      {formatCurrency(result.totalValues.totalFees)}
                    </div>
                    <div className="text-text-secondary">Total em Taxas</div>
                  </div>
                </div>

                {/* Projeções */}
                <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <h4 className="mb-3 font-semibold text-system-info">
                    📈 Projeções com Reajuste Anual:
                  </h4>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    <div>
                      <p>
                        <strong>Índice de Reajuste:</strong> {result.projections.adjustmentIndex}
                      </p>
                      <p>
                        <strong>Reajuste Anual:</strong>{" "}
                        {formatPercentage(result.projections.annualAdjustment)}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Última Parcela Estimada:</strong>
                      </p>
                      <div className="text-lg font-bold text-system-warning">
                        {formatCurrency(result.projections.lastInstallment)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alertas e Recomendações */}
                {(result.validation.warnings.length > 0 ||
                  result.validation.recommendations.length > 0) && (
                  <div className="space-y-3">
                    {result.validation.warnings.length > 0 && (
                      <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                        <h4 className="mb-2 font-semibold text-system-error">⚠️ Atenção:</h4>
                        <ul className="space-y-1 text-sm text-text-secondary">
                          {result.validation.warnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.validation.recommendations.length > 0 && (
                      <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                        <h4 className="mb-2 font-semibold text-growth-green">💡 Recomendações:</h4>
                        <ul className="space-y-1 text-sm text-text-secondary">
                          {result.validation.recommendations.map((recommendation, index) => (
                            <li key={index}>• {recommendation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparativo Detalhado */}
        {showComparison && result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h3">⚖️ Consórcio vs Financiamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Consórcio */}
                  <div className="rounded-lg border border-primary-blue bg-primary-blue/5 p-4">
                    <h4 className="mb-3 font-semibold text-primary-blue-dark">🏆 Consórcio</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Parcela Inicial:</span>
                        <span className="font-semibold">
                          {formatCurrency(result.monthlyPayment.total)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Pago:</span>
                        <span className="font-semibold">
                          {formatCurrency(result.totalValues.totalPaid)}
                        </span>
                      </div>
                      <div className="flex justify-between text-growth-green">
                        <span>Economia:</span>
                        <span className="font-semibold">
                          {formatCurrency(result.totalValues.savingsVsFinancing)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold text-text-secondary">Vantagens:</p>
                      <ul className="space-y-1 text-xs text-text-secondary">
                        {result.comparison.consortiumAdvantages.map((advantage, index) => (
                          <li key={index}>• {advantage}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Financiamento */}
                  <div className="rounded-lg border border-system-warning bg-system-warning/5 p-4">
                    <h4 className="mb-3 font-semibold text-system-warning">💳 Financiamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Parcela Fixa:</span>
                        <span className="font-semibold">
                          {formatCurrency(result.comparison.financingMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Pago:</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            result.comparison.financingMonthlyPayment * parseInt(termMonths)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-system-error">
                        <span>Custo Extra:</span>
                        <span className="font-semibold">
                          {formatCurrency(Math.abs(result.totalValues.savingsVsFinancing))}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold text-text-secondary">Vantagens:</p>
                      <ul className="space-y-1 text-xs text-text-secondary">
                        {result.comparison.financingAdvantages.map((advantage, index) => (
                          <li key={index}>• {advantage}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4 text-center">
                  <h4 className="mb-2 font-semibold text-growth-green">🎯 Veredicto</h4>
                  <p className="text-sm text-text-secondary">
                    {result.totalValues.savingsVsFinancing > 0
                      ? `O consórcio pode economizar ${formatCurrency(result.totalValues.savingsVsFinancing)} comparado ao financiamento, mas você precisa aguardar a contemplação.`
                      : "O financiamento tem custo maior, mas oferece o bem imediatamente. Avalie sua necessidade de urgência."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conteúdo Educacional */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">📚 Tudo sobre Consórcio - Guia Completo 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-text-secondary">
              {/* O que é Consórcio */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  🤔 O que é Consórcio?
                </h3>
                <p className="mb-4">
                  O <strong className="text-primary-blue-dark">consórcio</strong> é um sistema de
                  compra programada onde um grupo de pessoas se reúne para adquirir bens (carros,
                  motos, imóveis) ou serviços através de{" "}
                  <strong className="text-growth-green">sorteios ou lances</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">✅ Como Funciona:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Grupo de pessoas paga parcelas mensais</li>
                      <li>• Formação do fundo comum para compras</li>
                      <li>• Contemplação por sorteio ou lance</li>
                      <li>• Contemplado adquire o bem imediatamente</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      🎯 Tipos de Contemplação:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Sorteio:</strong> Contemplação gratuita por sorte
                      </li>
                      <li>
                        • <strong>Lance:</strong> Oferta em dinheiro para antecipar
                      </li>
                      <li>
                        • <strong>Natural:</strong> Ordem de entrada no grupo
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Vantagens e Desvantagens */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  ⚖️ Vantagens vs Desvantagens
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-3 font-semibold text-growth-green">
                      ✅ Vantagens do Consórcio:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Sem juros:</strong> Não há incidência de juros sobre o valor
                      </li>
                      <li>
                        • <strong>Menor custo total:</strong> Economia significativa vs
                        financiamento
                      </li>
                      <li>
                        • <strong>Flexibilidade:</strong> Possibilidade de quitar antecipadamente
                      </li>
                      <li>
                        • <strong>Proteção:</strong> Reajuste apenas por índices oficiais
                      </li>
                      <li>
                        • <strong>Contemplação antecipada:</strong> Chance de sorteio a cada
                        assembleia
                      </li>
                      <li>
                        • <strong>Crédito pré-aprovado:</strong> Processo mais simples
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                    <h4 className="mb-3 font-semibold text-system-error">
                      ❌ Desvantagens do Consórcio:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Tempo de espera:</strong> Não garante contemplação imediata
                      </li>
                      <li>
                        • <strong>Taxa de administração:</strong> Custo fixo mensal obrigatório
                      </li>
                      <li>
                        • <strong>Reajuste anual:</strong> Parcelas aumentam conforme inflação
                      </li>
                      <li>
                        • <strong>Risco de inadimplência:</strong> Afeta todo o grupo
                      </li>
                      <li>
                        • <strong>Lance obrigatório:</strong> Para contemplação antecipada
                      </li>
                      <li>
                        • <strong>Menor liquidez:</strong> Dificuldade para sair antes do fim
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Tipos de Consórcio */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  🚗 Tipos de Consórcio Disponíveis
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      🚙 Consórcio de Veículos
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Prazo:</strong> 60 a 120 meses
                      </li>
                      <li>
                        • <strong>Taxa Admin:</strong> 12% a 18%
                      </li>
                      <li>
                        • <strong>Carros populares:</strong> Grupos grandes, parcelas menores
                      </li>
                      <li>
                        • <strong>Carros premium:</strong> Grupos menores, contemplação mais rápida
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      🏠 Consórcio de Imóveis
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Prazo:</strong> 120 a 200 meses
                      </li>
                      <li>
                        • <strong>Taxa Admin:</strong> 15% a 20%
                      </li>
                      <li>
                        • <strong>Valores altos:</strong> Contemplação pode demorar mais
                      </li>
                      <li>
                        • <strong>Uso para reforma:</strong> Também aceito pela maioria
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      🏍️ Consórcio de Motos
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Prazo:</strong> 60 a 100 meses
                      </li>
                      <li>
                        • <strong>Taxa Admin:</strong> 10% a 16%
                      </li>
                      <li>
                        • <strong>Contemplação rápida:</strong> Grupos menores
                      </li>
                      <li>
                        • <strong>Parcelas baixas:</strong> Mais acessível
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📱 Consórcio de Bens
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Eletrônicos:</strong> Celulares, notebooks, TVs
                      </li>
                      <li>
                        • <strong>Eletrodomésticos:</strong> Geladeira, fogão, máquina
                      </li>
                      <li>
                        • <strong>Prazo:</strong> 60 a 120 meses
                      </li>
                      <li>
                        • <strong>Valores:</strong> R$ 2.000 a R$ 50.000
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Dicas Importantes */}
              <section>
                <h3 className="mb-3 text-xl font-semibold text-text-primary">
                  💡 Dicas para Escolher o Melhor Consórcio
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">🔍 Antes de Aderir</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Compare taxas de administração</li>
                      <li>• Verifique reputação da administradora</li>
                      <li>• Leia todo o contrato</li>
                      <li>• Entenda as regras de contemplação</li>
                      <li>• Calcule o custo total</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📊 Durante o Consórcio
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Mantenha pagamentos em dia</li>
                      <li>• Participe das assembleias</li>
                      <li>• Monitore o fundo de reserva</li>
                      <li>• Considere lances estratégicos</li>
                      <li>• Acompanhe reajustes</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-warning">
                      ⚠️ Cuidados Importantes
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Não acredite em "garantia" de contemplação</li>
                      <li>• Evite empresas sem registro no Banco Central</li>
                      <li>• Desconfie de taxas muito baixas</li>
                      <li>• Leia todas as cláusulas</li>
                      <li>• Guarde todos os comprovantes</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Consórcio"
          items={[
            {
              question: "Como funciona o sistema de sorteio no consórcio e quais minhas chances?",
              answer:
                "O sorteio acontece <strong>mensalmente nas assembleias</strong>, com chances iguais para todos os não contemplados. O número de contemplados por sorteio depende do tamanho do grupo. É <strong>totalmente aleatório</strong> e fiscalizado pelo Banco Central.",
              borderColor: "primary-blue",
            },
            {
              question: "Posso dar lance mesmo não tendo o dinheiro todo disponível?",
              answer:
                "<strong>Sim!</strong> O lance pode ser parcelado junto com as mensalidades restantes. Exemplo: lance de R$ 10.000 divide pelas parcelas que faltam. <strong>Atenção:</strong> certifique-se de conseguir pagar o valor aumentado das parcelas.",
              borderColor: "growth-green",
            },
            {
              question: "Como é calculado o reajuste anual das parcelas do consórcio?",
              answer:
                "O reajuste é baseado em <strong>índices oficiais</strong> como INPC ou IGP-M, definidos no contrato. Ocorre no aniversário do grupo para <strong>manter o poder de compra</strong> do fundo comum, compensando a inflação.",
              borderColor: "system-warning",
            },
            {
              question: "Posso escolher qualquer marca/modelo de veículo no consórcio?",
              answer:
                "Depende do tipo: <strong>Consórcios de carta de crédito</strong> permitem qualquer marca/modelo dentro do valor. <strong>Consórcios específicos</strong> limitam marcas/modelos. Sempre verifique no contrato!",
              borderColor: "system-info",
            },
            {
              question: "Consórcio de imóvel serve para financiar construção ou reforma?",
              answer:
                "<strong>Sim!</strong> Muitos consórcios imobiliários permitem usar o crédito para <strong>compra de terreno + construção, reforma ou ampliação</strong>. É necessário apresentar projetos e orçamentos aprovados.",
              borderColor: "growth-green",
            },
            {
              question: "Qual o prazo médio para ser contemplado no consórcio?",
              answer:
                "Não há prazo garantido, mas estatisticamente <strong>50% são contemplados até a metade do prazo</strong>. Grupos pequenos têm contemplação mais rápida. Com lance, contemplação é <strong>imediata</strong> (se ganhar o leilão).",
              borderColor: "primary-blue",
            },
            {
              question: "Posso sair do consórcio antes de ser contemplado? Perco dinheiro?",
              answer:
                "Sim, mas há regras: <strong>Desistência</strong> = recebe de volta só no final do grupo. <strong>Inadimplência</strong> = pode perder parte do valor. <strong>Transferência de cota</strong> = venda para terceiros (se permitido).",
              borderColor: "system-error-dark",
            },
            {
              question: "O consórcio é regulamentado e seguro para investir?",
              answer:
                "<strong>Totalmente seguro!</strong> É regulamentado pelo <strong>Banco Central do Brasil</strong> (Circular 3.432). Administradoras precisam de autorização, manter reservas e seguir regras rígidas. Sempre verifique o registro no BC!",
              borderColor: "system-success",
            },
          ]}
          tipSection={{
            title: "Dica de Especialista",
            content:
              "Para <strong>maximizar suas chances</strong>, prefira grupos menores, considere dar lances estratégicos nos primeiros meses e sempre mantenha as parcelas em dia para não perder seus direitos!",
          }}
          footerText="<strong>Quer simular diferentes cenários?</strong> Nossa calculadora oferece comparação completa entre consórcio e financiamento, ajudando você a tomar a melhor decisão financeira!"
        />

        <RelatedCalculators category="financas" currentCalculatorId="consorcio" />
      </div>
    </div>
  );
}
