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
    { title: `Calculadora Tesouro Direto 2025 - Simulador Completo com Cupons - ${APP_NAME}` },
    {
      name: "description",
      content:
        "★ Calculadora Tesouro Direto GRATUITA com simulação completa! Calcule rendimentos, cupons semestrais, impostos e compare todos os títulos: Selic, Prefixado, IPCA+. Indexadores reais atualizados e aportes mensais incluídos.",
    },
    {
      name: "keywords",
      content:
        "calculadora tesouro direto, tesouro selic, tesouro prefixado, tesouro ipca, cupons semestrais, simulador títulos públicos, rendimento tesouro direto, imposto renda tesouro, taxa selic atual, ipca atual, tesouro nacional, investimento governo, renda fixa, titulo publico brasil, tesouro direto 2025",
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
      content: `Calculadora Tesouro Direto - Simulação Completa 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Simule todos os títulos do Tesouro Direto! Calcule cupons, rendimentos, impostos e compare Selic, Prefixado e IPCA+. Indexadores reais e aportes mensais. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/tesouro-direto",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora Tesouro Direto com Cupons - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Simule todos os títulos do Tesouro Direto com cálculo de cupons semestrais, impostos e comparações detalhadas!",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "theme-color", content: "#1e40af" },
    { name: "format-detection", content: "telephone=no" },
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
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "tesouro_direto",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("tesouro_direto");

  // Efeito para atualizar campos quando um título é selecionado
  useEffect(() => {
    if (selectedBondCode && bonds.length > 0) {
      const bond = bonds.find((b) => b.code === selectedBondCode);
      if (bond) {
        setSelectedBond(bond);

        // Usa a taxa oficial da API
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
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Tesouro Direto</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora do Tesouro Direto</span>
          <span className="sm:hidden">Tesouro Direto</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Simule investimentos em{" "}
          <strong className="text-primary-blue-dark">títulos públicos</strong> com
          <strong className="text-system-success"> cálculo de cupons</strong>, impostos e
          <strong className="text-growth-green">indexadores reais atualizados</strong>.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            🏛️ <strong>5 Títulos</strong> • 💰 <strong>Cupons Semestrais</strong> • 📊{" "}
            <strong>Selic + IPCA</strong> • 🎯 <strong>Comparações</strong>
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
                      ℹ️ Data oficial de vencimento do título
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
                      ℹ️ Taxa oficial do título selecionado
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
                      ℹ️ Taxa de cupom oficial do título
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
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center sm:gap-4">
                <Button onClick={handleCalculate} className="px-6 sm:px-8" fullWidth>
                  💰 Simular Tesouro Direto
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-system-error px-6 text-system-error hover:bg-system-error hover:text-white sm:px-8"
                  fullWidth
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

      {/* Step-by-step calculations */}
      {result && (
        <div className="space-y-6">
          {/* Calculation Steps */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📊 Cálculo Passo a Passo
                <Button
                  onClick={() => setShowSteps(!showSteps)}
                  variant="outline"
                  className="text-sm"
                >
                  {showSteps ? "Ocultar" : "Mostrar"} Passos
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showSteps && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      🧮 Cálculos Principais:
                    </h4>
                    {result.calculations.stepByStep.map((step, index) => (
                      <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                        {step}
                      </p>
                    ))}
                  </div>

                  {result.calculations.indexerDetails.length > 0 && (
                    <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-success">
                        📈 Detalhes dos Indexadores:
                      </h4>
                      {result.calculations.indexerDetails.map((detail, index) => (
                        <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-error">💸 Impostos e Taxas:</h4>
                    {result.calculations.taxCalculations.map((tax, index) => (
                      <p key={index} className="mb-1 font-mono text-sm text-text-secondary">
                        {tax}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comparisons */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📊 Comparações
                <Button
                  onClick={() => setShowComparisons(!showComparisons)}
                  variant="outline"
                  className="text-sm"
                >
                  {showComparisons ? "Ocultar" : "Mostrar"} Comparações
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showComparisons && (
                <div className="space-y-3">
                  <div className="space-y-3">
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">💰 vs. Poupança</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-text-secondary">Poupança:</p>
                          <p className="font-bold">
                            {result.comparisons.poupanca.finalAmount.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Vantagem:</p>
                          <p
                            className={`font-bold ${result.comparisons.poupanca.difference > 0 ? "text-system-success" : "text-system-error"}`}
                          >
                            {result.comparisons.poupanca.difference > 0 ? "+" : ""}
                            {result.comparisons.poupanca.difference.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">📈 vs. CDI (90%)</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-text-secondary">CDI 90%:</p>
                          <p className="font-bold">
                            {result.comparisons.cdi.finalAmount.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Vantagem:</p>
                          <p
                            className={`font-bold ${result.comparisons.cdi.difference > 0 ? "text-system-success" : "text-system-error"}`}
                          >
                            {result.comparisons.cdi.difference > 0 ? "+" : ""}
                            {result.comparisons.cdi.difference.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-info">📊 vs. IPCA</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-text-secondary">IPCA:</p>
                          <p className="font-bold">
                            {result.comparisons.ipca.finalAmount.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Poder de Compra:</p>
                          <p
                            className={`font-bold ${result.comparisons.ipca.difference > 0 ? "text-system-success" : "text-system-error"}`}
                          >
                            {result.comparisons.ipca.difference > 0 ? "+" : ""}
                            {result.comparisons.ipca.difference.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

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

      {/* Educational Content Section */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-system-success/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🏛️ Tesouro Direto: Investimento em Títulos Públicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-primary-blue-dark">Tesouro Direto</strong> é o programa do
                <strong className="text-system-success"> Tesouro Nacional</strong> para venda de
                títulos públicos federais a pessoas físicas, oferecendo{" "}
                <strong className="text-growth-green">segurança</strong> e
                <strong className="text-system-info">rentabilidade</strong> superiores à poupança.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                  🎯 Tipos de Títulos
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-3">
                    <p className="mb-1 font-semibold text-system-success">Tesouro Selic:</p>
                    <p>
                      Pós-fixado, acompanha 100% da taxa Selic. Ideal para reserva de emergência.
                    </p>
                  </div>
                  <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-3">
                    <p className="mb-1 font-semibold text-primary-blue-dark">Tesouro Prefixado:</p>
                    <p>Taxa fixa definida na compra. Adequado para objetivos de longo prazo.</p>
                  </div>
                  <div className="rounded border border-primary-blue/20 bg-primary-blue/10 p-3">
                    <p className="mb-1 font-semibold text-growth-green">Tesouro IPCA+:</p>
                    <p>Taxa real + inflação. Proteção do poder de compra no longo prazo.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-success/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-success">💰 Vantagens</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-3">
                    <p className="mb-1 font-semibold text-system-success">Segurança Máxima:</p>
                    <p>Garantido pelo Governo Federal, menor risco de crédito do país.</p>
                  </div>
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-3">
                    <p className="mb-1 font-semibold text-growth-green">Liquidez Diária:</p>
                    <p>Resgate a qualquer dia útil pelo Tesouro Direto.</p>
                  </div>
                  <div className="rounded border border-system-success/20 bg-system-success/10 p-3">
                    <p className="mb-1 font-semibold text-system-info">Baixo Investimento:</p>
                    <p>A partir de R$ 30, acessível para todos os perfis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora do Tesouro Direto"
        items={[
          {
            question: "O que é Tesouro Direto e por que é o investimento mais seguro?",
            answer:
              "Tesouro Direto é o programa do <strong>Governo Federal</strong> para venda de títulos públicos. É o investimento <strong>mais seguro do país</strong> pois tem garantia soberana, risco mínimo de crédito e supervisão do Banco Central. Mínimo R$ 30, liquidez diária!",
            borderColor: "system-success",
          },
          {
            question: "Qual a diferença entre Tesouro Selic, Prefixado e IPCA+?",
            answer:
              "<strong>Tesouro Selic:</strong> 100% da taxa Selic (ideal para reserva). <strong>Tesouro Prefixado:</strong> taxa fixa definida na compra (ideal para objetivos). <strong>Tesouro IPCA+:</strong> taxa real + inflação (proteção contra alta de preços). Escolha conforme seu objetivo!",
            borderColor: "primary-blue",
          },
          {
            question: "Como funcionam os cupons semestrais dos títulos?",
            answer:
              "Títulos <strong>com juros semestrais</strong> pagam <strong>cupons a cada 6 meses</strong> na sua conta corrente + principal corrigido no vencimento. Ideais para <strong>renda periódica</strong>. Cupons do IPCA+ são corrigidos pela inflação. IR incide sobre cada cupom!",
            borderColor: "growth-green",
          },
          {
            question: "O que é marcação a mercado e quando me afeta?",
            answer:
              "<strong>Marcação a mercado</strong> = variação do preço conforme juros do mercado. Afeta quem vende <strong>antes do vencimento</strong>. Tesouro Selic quase não sofre, Prefixado sofre mais. <strong>Solução:</strong> manter até vencimento elimina o risco!",
            borderColor: "system-warning",
          },
          {
            question: "Como funciona a tributação do Tesouro Direto?",
            answer:
              "<strong>IR regressivo:</strong> 22,5% até 180 dias, 20% até 360 dias, 17,5% até 720 dias, <strong>15% acima de 720 dias</strong>. <strong>IOF</strong> só primeiros 30 dias. Taxa de custódia: 0,20% ao ano. Quanto mais tempo, menor o imposto!",
            borderColor: "system-error-dark",
          },
          {
            question: "Qual título escolher para cada objetivo?",
            answer:
              "<strong>Reserva emergência:</strong> Tesouro Selic (liquidez diária). <strong>Objetivos longo prazo:</strong> Tesouro Prefixado (taxa fixa). <strong>Proteção inflação:</strong> Tesouro IPCA+. <strong>Renda mensal:</strong> títulos com juros semestrais. Nossa calculadora ajuda a escolher!",
            borderColor: "system-info",
          },
          {
            question: "Vale a pena investir no Tesouro com a Selic atual?",
            answer:
              "<strong>Sim!</strong> Com Selic em 10,50% (2025), Tesouro oferece: <strong>rendimento real positivo</strong>, segurança máxima, liquidez diária (Selic), proteção contra volatilidade. Ideal para construir base sólida da carteira de investimentos!",
            borderColor: "growth-green",
          },
          {
            question: "Posso fazer aportes mensais no Tesouro Direto?",
            answer:
              "<strong>Claro!</strong> Aportes regulares são excelente estratégia para <strong>aproveitar juros compostos</strong> e criar disciplina. Configure débito automático, comece com R$ 30/mês. Nossa calculadora simula aportes mensais com precisão!",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para <strong>maximizar resultados</strong>, mantenha 30% em Tesouro Selic (liquidez), 40% IPCA+ (proteção inflação), 30% Prefixado (aproveitamento de juros altos). Diversifique prazos e mantenha aportes regulares!",
        }}
        footerText="<strong>Quer simular seu investimento?</strong> Nossa calculadora inclui todos os 5 tipos de títulos, cupons semestrais, impostos e comparações para você escolher a melhor estratégia!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora do Tesouro Direto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-primary-blue-dark">calculadora do Tesouro Direto</strong>{" "}
              é<strong className="text-system-success"> 100% gratuita</strong> e oferece simulações
              completas para todos os 5 tipos de títulos públicos, incluindo cálculo de cupons
              semestrais, impostos e comparações.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Simulação de Tesouro Selic, Prefixado, IPCA+,
              títulos com juros semestrais, cálculo de cupons, impostos (IR regressivo), taxa de
              custódia, aportes mensais, comparações com outros investimentos e análise de riscos
              detalhada.
            </p>
            <p>
              <strong className="text-system-warning">Uso Profissional:</strong> Ideal para
              investidores, consultores financeiros, estudantes de economia e qualquer pessoa
              interessada em títulos públicos.
              <strong>
                Os indexadores podem ser ajustados conforme cenários econômicos atuais.
              </strong>
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🏛️ Baseado nas regras oficiais do Tesouro Direto • 📊 Taxas e indexadores editáveis •
              🔒 Seus dados não são armazenados • 📱 Interface responsiva • 🌙 Modo escuro
              disponível • 💰 5 tipos de títulos • 📈 Cupons semestrais
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
            name: "Calculadora do Tesouro Direto",
            description:
              "Calculadora online gratuita para simular investimentos em títulos do Tesouro Direto. Calcule cupons semestrais, impostos, rendimentos com indexadores reais atualizados.",
            url: "https://calculadorasonline.com.br/calculadoras/financas/tesouro-direto",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Simulação de Tesouro Selic",
              "Simulação de Tesouro Prefixado",
              "Simulação de Tesouro IPCA+",
              "Cálculo de títulos com juros semestrais",
              "Cálculo de cupons semestrais detalhado",
              "Cálculo de impostos (IR regressivo)",
              "Taxa de custódia automática",
              "Aportes mensais programados",
              "Comparações com outros investimentos",
              "Análise de riscos detalhada",
              "Indexadores econômicos editáveis",
              "Interface móvel responsiva",
              "100% gratuito",
            ],
            educationalLevel: ["HighSchool", "College", "Professional"],
            learningResourceType: "Interactive Tool",
            about: [
              {
                "@type": "Thing",
                name: "Tesouro Direto",
                description:
                  "Programa do Tesouro Nacional para venda de títulos públicos a pessoas físicas",
              },
              {
                "@type": "Thing",
                name: "Títulos Públicos",
                description: "Investimentos em dívida do governo federal com garantia soberana",
              },
              {
                "@type": "Thing",
                name: "Cupons Semestrais",
                description: "Pagamentos periódicos de juros realizados a cada 6 meses",
              },
              {
                "@type": "Thing",
                name: "Taxa Selic",
                description: "Taxa básica de juros da economia brasileira",
              },
              {
                "@type": "Thing",
                name: "IPCA",
                description: "Índice Nacional de Preços ao Consumidor Amplo - inflação oficial",
              },
            ],
            teaches: [
              "Como calcular rendimentos do Tesouro Direto",
              "Diferenças entre tipos de títulos públicos",
              "Funcionamento dos cupons semestrais",
              "Cálculo de impostos em títulos públicos",
              "Comparação entre investimentos de renda fixa",
              "Análise de riscos em títulos públicos",
            ],
            audience: [
              {
                "@type": "Audience",
                name: "Investidores Iniciantes",
                description: "Pessoas físicas interessadas em começar a investir no Tesouro Direto",
              },
              {
                "@type": "Audience",
                name: "Investidores Experientes",
                description: "Investidores que querem comparar diferentes títulos públicos",
              },
              {
                "@type": "Audience",
                name: "Consultores Financeiros",
                description: "Profissionais que auxiliam clientes em investimentos",
              },
              {
                "@type": "Audience",
                name: "Estudantes",
                description: "Estudantes de economia, administração e finanças",
              },
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

      <RelatedCalculators category="financas" currentCalculatorId="tesouro-direto" />
    </div>
  );
}
