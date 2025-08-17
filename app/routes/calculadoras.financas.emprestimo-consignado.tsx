import type { MetaFunction } from "@remix-run/node";
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
  LineChart,
  BarChart,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import {
  calculatePayrollLoan,
  type PayrollLoanParams,
  type PayrollLoanResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora Empréstimo Consignado 2025 - Simulador CLT, Servidor e Aposentado - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora de empréstimo consignado COMPLETA e GRATUITA para CLT, servidores públicos e aposentados. Simule parcelas, analise margem consignável, compare taxas e descubra o melhor consignado para seu perfil. Análise de affordability e comparação com outras modalidades de crédito.",
    },
    {
      name: "keywords",
      content:
        "calculadora empréstimo consignado, consignado CLT, consignado servidor público, consignado aposentado, margem consignável, simulador consignado, taxa empréstimo consignado, parcela consignado, consignado INSS, consignado folha pagamento, crédito consignado, empréstimo desconto folha, consignado pensionista, consignado vs crediário, melhor empréstimo consignado, como funciona consignado, limite consignado, consignado banco, consignado correspondente bancário, consignado fintech, portabilidade consignado",
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
      content: `Calculadora Empréstimo Consignado - Simulador Completo 2025 - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Simule seu empréstimo consignado com precisão! Analise margem consignável, compare taxas por instituição e descubra a melhor opção para CLT, servidor ou aposentado. 100% gratuito!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/emprestimo-consignado",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    {
      name: "twitter:title",
      content: `Simulador Empréstimo Consignado CLT/Servidor - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Simule empréstimos consignados com análise completa de margem! Compare taxas, calcule parcelas e tome decisões financeiras inteligentes.",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#059669" },
    { name: "theme-color", content: "#059669" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function PayrollLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termMonths, setTermMonths] = useState("");
  const [grossSalary, setGrossSalary] = useState("");
  const [employeeType, setEmployeeType] = useState<
    "clt" | "public_servant" | "retiree" | "pensioner"
  >("clt");
  const [hasOtherConsignados, setHasOtherConsignados] = useState(false);
  const [otherConsignadosAmount, setOtherConsignadosAmount] = useState("");
  const [institutionType, setInstitutionType] = useState<"bank" | "correspondent" | "fintech">(
    "bank"
  );
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceCost, setInsuranceCost] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<PayrollLoanResult | null>(null);
  const [calculationMode, setCalculationMode] = useState<"loan_amount" | "desired_payment">(
    "loan_amount"
  );
  const [desiredPayment, setDesiredPayment] = useState("");
  const [showAmortization, setShowAmortization] = useState(false);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "emprestimo_consignado",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("emprestimo_consignado");

  const handleCalculate = () => {
    const loanAmountNum = parseFloat(loanAmount) || 0;
    const interestRateNum = parseFloat(interestRate) || 0;
    const termMonthsNum = parseFloat(termMonths) || 0;
    const grossSalaryNum = parseFloat(grossSalary) || 0;
    const otherConsignadosAmountNum = hasOtherConsignados
      ? parseFloat(otherConsignadosAmount) || 0
      : 0;
    const insuranceCostNum = hasInsurance ? parseFloat(insuranceCost) || 0 : 0;
    const ageNum = age ? parseFloat(age) : undefined;

    if (grossSalaryNum > 0 && interestRateNum > 0 && termMonthsNum > 0) {
      let finalLoanAmount = loanAmountNum;

      // If calculating by desired payment, reverse calculate loan amount
      if (calculationMode === "desired_payment" && desiredPayment) {
        const desiredPaymentNum = parseFloat(desiredPayment) || 0;
        const monthlyRate = interestRateNum / 100;
        finalLoanAmount =
          (desiredPaymentNum * (Math.pow(1 + monthlyRate, termMonthsNum) - 1)) /
          (monthlyRate * Math.pow(1 + monthlyRate, termMonthsNum));
      }

      if (finalLoanAmount > 0) {
        const params: PayrollLoanParams = {
          loanAmount: finalLoanAmount,
          interestRate: interestRateNum,
          termMonths: termMonthsNum,
          grossSalary: grossSalaryNum,
          employeeType,
          hasOtherConsignados,
          otherConsignadosAmount: otherConsignadosAmountNum,
          institutionType,
          hasInsurance,
          insuranceCost: insuranceCostNum,
          age: ageNum,
        };

        const calculationResult = calculatePayrollLoan(params);
        setResult(calculationResult);

        // Update loan amount if we calculated from desired payment
        if (calculationMode === "desired_payment") {
          setLoanAmount(finalLoanAmount.toFixed(2));
        }
      }
    }
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTermMonths("");
    setGrossSalary("");
    setEmployeeType("clt");
    setHasOtherConsignados(false);
    setOtherConsignadosAmount("");
    setInstitutionType("bank");
    setHasInsurance(false);
    setInsuranceCost("");
    setAge("");
    setDesiredPayment("");
    setResult(null);
    setShowAmortization(false);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercentage = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2 }).format(
      value / 100
    );

  const getEmployeeTypeLabel = (type: string) => {
    const labels = {
      clt: "CLT (Carteira Assinada)",
      public_servant: "Servidor Público",
      retiree: "Aposentado INSS",
      pensioner: "Pensionista",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getRiskColor = (level: "low" | "medium" | "high") => {
    const colors = {
      low: "system-success",
      medium: "system-warning",
      high: "system-error",
    };
    return colors[level];
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Empréstimo Consignado</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">Calculadora de Empréstimo Consignado</span>
          <span className="sm:hidden">Empréstimo Consignado</span>
        </h1>
        <p className="mx-auto max-w-4xl px-4 text-lg text-text-secondary-dark sm:text-sm md:text-base">
          Simule <strong className="text-growth-green">empréstimos consignados</strong> para
          <strong className="text-primary-blue-dark"> CLT, servidores e aposentados</strong>.
          Analise <strong className="text-system-success">margem consignável</strong>, compare taxas
          e descubra a melhor opção para seu perfil.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            💳 <strong>Análise de Margem</strong> • 📊 <strong>Comparação de Taxas</strong> • 🎯{" "}
            <strong>Perfil Personalizado</strong>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Calculator Inputs */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2">👤 Dados Pessoais e Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  type="number"
                  label="Salário Bruto (R$)"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  placeholder="Ex: 5000"
                  min="0"
                  step="100"
                  required
                  fullWidth
                />

                <Select
                  label="Tipo de Vínculo"
                  value={employeeType}
                  onChange={(value) => setEmployeeType(value as typeof employeeType)}
                  options={[
                    { value: "clt", label: "CLT (Carteira Assinada)" },
                    { value: "public_servant", label: "Servidor Público" },
                    { value: "retiree", label: "Aposentado INSS" },
                    { value: "pensioner", label: "Pensionista" },
                  ]}
                  fullWidth
                />

                <Input
                  type="number"
                  label="Idade (Opcional)"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 45"
                  min="18"
                  max="80"
                  step="1"
                  fullWidth
                />

                <Select
                  label="Tipo de Instituição"
                  value={institutionType}
                  onChange={(value) => setInstitutionType(value as typeof institutionType)}
                  options={[
                    { value: "bank", label: "Banco Tradicional" },
                    { value: "correspondent", label: "Correspondente Bancário" },
                    { value: "fintech", label: "Fintech" },
                  ]}
                  fullWidth
                />
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasOtherConsignados"
                    checked={hasOtherConsignados}
                    onChange={(e) => setHasOtherConsignados(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label
                    htmlFor="hasOtherConsignados"
                    className="text-sm font-medium text-text-primary"
                  >
                    Já possui outros empréstimos consignados?
                  </label>
                </div>

                {hasOtherConsignados && (
                  <Input
                    type="number"
                    label="Valor Total dos Outros Consignados (R$/mês)"
                    value={otherConsignadosAmount}
                    onChange={(e) => setOtherConsignadosAmount(e.target.value)}
                    placeholder="Ex: 300"
                    min="0"
                    step="10"
                    fullWidth
                  />
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasInsurance"
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="hasInsurance" className="text-sm font-medium text-text-primary">
                    Incluir seguro prestamista?
                  </label>
                </div>

                {hasInsurance && (
                  <Input
                    type="number"
                    label="Custo do Seguro (R$/mês)"
                    value={insuranceCost}
                    onChange={(e) => setInsuranceCost(e.target.value)}
                    placeholder="Ex: 25"
                    min="0"
                    step="1"
                    fullWidth
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h3">💰 Configurações do Empréstimo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  label="Modo de Cálculo"
                  value={calculationMode}
                  onChange={(value) => setCalculationMode(value as typeof calculationMode)}
                  options={[
                    { value: "loan_amount", label: "Por Valor do Empréstimo" },
                    { value: "desired_payment", label: "Por Parcela Desejada" },
                  ]}
                  fullWidth
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {calculationMode === "loan_amount" ? (
                    <Input
                      type="number"
                      label="Valor do Empréstimo (R$)"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Ex: 50000"
                      min="0"
                      step="1000"
                      required
                      fullWidth
                    />
                  ) : (
                    <Input
                      type="number"
                      label="Parcela Desejada (R$)"
                      value={desiredPayment}
                      onChange={(e) => setDesiredPayment(e.target.value)}
                      placeholder="Ex: 800"
                      min="0"
                      step="10"
                      required
                      fullWidth
                    />
                  )}

                  <RateInput
                    label="Taxa de Juros (% ao mês)"
                    value={interestRate}
                    onChange={(value) => setInterestRate(value)}
                    placeholder="0,00"
                    required
                    fullWidth
                  />

                  <Input
                    type="number"
                    label="Prazo (meses)"
                    value={termMonths}
                    onChange={(e) => setTermMonths(e.target.value)}
                    placeholder="Ex: 60"
                    min="6"
                    max="120"
                    step="6"
                    required
                    fullWidth
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button onClick={handleCalculate} className="px-6 sm:px-8" fullWidth>
              Calcular
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

        {/* Right Column - Quick Results */}
        {result && (
          <div className="space-y-4">
            <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-lg text-growth-green">
                  💰 Resumo do Empréstimo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Valor emprestado:</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.loanAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Parcela mensal:</span>
                    <span className="font-bold text-primary-blue-dark">
                      {formatCurrency(result.monthlyPayment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Taxa efetiva (ano):</span>
                    <span className="font-bold text-text-primary">
                      {result.effectiveAnnualRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="border-t border-growth-green/20 pt-2">
                    <div className="flex items-center justify-between">
                      <span>Total a pagar:</span>
                      <span className="font-bold text-system-warning">
                        {formatCurrency(result.totalAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total de juros:</span>
                      <span className="font-bold text-system-warning">
                        {formatCurrency(result.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 duration-300 ${
                result.marginAnalysis.isWithinLimits
                  ? "border-system-success bg-system-success/10"
                  : "border-system-error bg-system-error/10"
              }`}
            >
              <CardHeader>
                <CardTitle
                  as="h3"
                  className={`text-lg ${
                    result.marginAnalysis.isWithinLimits
                      ? "text-system-success"
                      : "text-system-error"
                  }`}
                >
                  {result.marginAnalysis.isWithinLimits ? "✅" : "⚠️"} Análise de Margem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Margem disponível:</span>
                    <span className="font-bold">
                      {formatCurrency(result.marginAnalysis.availableMargin)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Margem utilizada:</span>
                    <span
                      className={`font-bold ${
                        result.marginAnalysis.isWithinLimits
                          ? "text-system-success"
                          : "text-system-error"
                      }`}
                    >
                      {formatCurrency(result.marginAnalysis.usedMargin)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>% da margem:</span>
                    <span
                      className={`font-bold ${
                        result.marginAnalysis.marginPercent <= 100
                          ? "text-system-success"
                          : "text-system-error"
                      }`}
                    >
                      {result.marginAnalysis.marginPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="rounded bg-background-dark-secondary p-2 text-xs">
                    <p
                      className={
                        result.marginAnalysis.isWithinLimits
                          ? "text-system-success"
                          : "text-system-error"
                      }
                    >
                      {result.marginAnalysis.isWithinLimits
                        ? `👍 Empréstimo dentro da margem para ${getEmployeeTypeLabel(employeeType)}`
                        : "⚠️ Empréstimo excede a margem consignável permitida"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 duration-300 border-${getRiskColor(result.affordabilityAnalysis.riskLevel)} bg-${getRiskColor(result.affordabilityAnalysis.riskLevel)}/10`}
            >
              <CardHeader>
                <CardTitle
                  as="h3"
                  className={`text-lg text-${getRiskColor(result.affordabilityAnalysis.riskLevel)}`}
                >
                  📊 Análise de Risco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Compromet. salário:</span>
                    <span
                      className={`font-bold text-${getRiskColor(result.affordabilityAnalysis.riskLevel)}`}
                    >
                      {result.affordabilityAnalysis.salaryCommitment.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Salário restante:</span>
                    <span className="font-bold">
                      {formatCurrency(result.affordabilityAnalysis.remainingSalary)}
                    </span>
                  </div>
                  <div className="rounded bg-background-dark-secondary p-2 text-xs">
                    <p className={`text-${getRiskColor(result.affordabilityAnalysis.riskLevel)}`}>
                      Nível de risco:{" "}
                      <strong>{result.affordabilityAnalysis.riskLevel.toUpperCase()}</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Main Results Section */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
            <Card className="border-2 border-primary-blue bg-primary-blue-light duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-primary-blue-dark">
                  💳 Parcela Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-primary-blue-dark sm:text-2xl">
                    {formatCurrency(result.monthlyPayment)}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {result.affordabilityAnalysis.salaryCommitment.toFixed(1)}% do salário bruto
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-growth-green">
                  💰 Valor Liberado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-growth-green sm:text-2xl">
                    {formatCurrency(result.loanAmount)}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">Dinheiro na conta</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-warning bg-system-warning/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-system-warning">
                  📈 Taxa Anual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-system-warning sm:text-2xl">
                    {result.effectiveAnnualRate.toFixed(2)}%
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">Taxa efetiva ao ano</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-system-info bg-system-info/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-base text-system-info">
                  🏦 Margem Restante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-system-info sm:text-2xl">
                    {formatCurrency(Math.max(0, result.marginAnalysis.remainingMargin))}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">Para novos consignados</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Section */}
          <Card className="border-l-4 border-growth-green bg-background-dark-secondary duration-300">
            <CardHeader>
              <CardTitle as="h2" className="text-xl font-bold text-text-primary">
                🆚 Comparação com Outras Modalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="mb-3 font-bold text-growth-green">
                    💰 Consignado vs Empréstimo Pessoal
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-lg bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">Consignado</h4>
                      <p>
                        Parcela: <strong>{formatCurrency(result.monthlyPayment)}</strong>
                      </p>
                      <p>
                        Total: <strong>{formatCurrency(result.totalAmount)}</strong>
                      </p>
                    </div>
                    <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-warning">Empréstimo Pessoal</h4>
                      <p>
                        Parcela:{" "}
                        <strong>
                          {formatCurrency(result.comparison.personalLoan.monthlyPayment)}
                        </strong>
                      </p>
                      <p>
                        Total:{" "}
                        <strong>
                          {formatCurrency(result.comparison.personalLoan.totalAmount)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-3">
                    <p className="text-center text-sm">
                      <strong className="text-system-success">Economia com consignado:</strong>
                      <br />
                      {formatCurrency(result.comparison.personalLoan.savings)}(
                      {result.comparison.personalLoan.percentageSavings.toFixed(1)}% menos)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="mb-3 font-bold text-primary-blue-dark">
                    💳 Consignado vs Cartão de Crédito
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-lg bg-growth-green-soft p-4">
                      <h4 className="mb-2 font-semibold text-growth-green">Consignado</h4>
                      <p>
                        Parcela: <strong>{formatCurrency(result.monthlyPayment)}</strong>
                      </p>
                      <p>
                        Total: <strong>{formatCurrency(result.totalAmount)}</strong>
                      </p>
                    </div>
                    <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                      <h4 className="mb-2 font-semibold text-system-error">Cartão Crédito</h4>
                      <p>
                        Parcela:{" "}
                        <strong>
                          {formatCurrency(result.comparison.creditCard.monthlyPayment)}
                        </strong>
                      </p>
                      <p>
                        Total:{" "}
                        <strong>{formatCurrency(result.comparison.creditCard.totalAmount)}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-3">
                    <p className="text-center text-sm">
                      <strong className="text-system-success">Economia com consignado:</strong>
                      <br />
                      {formatCurrency(result.comparison.creditCard.savings)}(
                      {result.comparison.creditCard.percentageSavings.toFixed(1)}% menos)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle as="h3">📈 Evolução do Saldo Devedor</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={result.monthlyPayments
                    .filter((_, index) => index % 6 === 0)
                    .map((payment) => ({
                      label: `${Math.ceil(payment.month / 6)}º Sem.`,
                      value: payment.balance,
                    }))}
                  width={400}
                  height={300}
                  className="mb-4"
                />
                <div className="text-xs text-text-secondary">
                  <p>Acompanhe como o saldo devedor diminui ao longo do tempo</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h3">💰 Composição do Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { label: "Principal", value: result.loanAmount, color: "rgb(34, 197, 94)" },
                    { label: "Juros", value: result.totalInterest, color: "rgb(251, 146, 60)" },
                  ]}
                  width={400}
                  height={300}
                />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded bg-growth-green-soft p-2">
                    <span>Dinheiro recebido:</span>
                    <span className="font-bold text-growth-green">
                      {formatCurrency(result.loanAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded border border-system-warning/20 bg-system-warning/10 p-2">
                    <span>Juros pagos:</span>
                    <span className="font-bold text-system-warning">
                      {formatCurrency(result.totalInterest)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Institution Analysis */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">🏦 Análise da Instituição Selecionada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-bold text-primary-blue-dark">
                    ✅ Vantagens -{" "}
                    {institutionType === "bank"
                      ? "Banco"
                      : institutionType === "correspondent"
                        ? "Correspondente"
                        : "Fintech"}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {result.institutionAnalysis.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-system-success">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-bold text-system-warning">⚠️ Considerações</h4>
                  <ul className="space-y-2 text-sm">
                    {result.institutionAnalysis.considerations.map((consideration, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-system-warning">•</span>
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-bold text-primary-blue-dark">
                  📊 Taxas Típicas do Mercado
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="text-system-success">Mínima</p>
                    <p className="font-bold">{result.institutionAnalysis.typicalRates.min}% a.m.</p>
                  </div>
                  <div>
                    <p className="text-primary-blue-dark">Média</p>
                    <p className="font-bold">
                      {result.institutionAnalysis.typicalRates.average}% a.m.
                    </p>
                  </div>
                  <div>
                    <p className="text-system-error">Máxima</p>
                    <p className="font-bold">{result.institutionAnalysis.typicalRates.max}% a.m.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Age Impact Analysis */}
          {result.ageImpact && (
            <Card
              className={`border-l-4 duration-300 ${
                result.ageImpact.isViable
                  ? "border-system-success bg-system-success/10"
                  : "border-system-warning bg-system-warning/10"
              }`}
            >
              <CardHeader>
                <CardTitle
                  as="h3"
                  className={`text-lg ${result.ageImpact.isViable ? "text-system-success" : "text-system-warning"}`}
                >
                  📅 Análise de Idade e Prazo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Idade atual:</span>
                      <span className="font-bold">{age} anos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Idade no final:</span>
                      <span className="font-bold">{result.ageImpact.ageAtEnd} anos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prazo máximo disponível:</span>
                      <span className="font-bold">
                        {Math.ceil(result.ageImpact.maxTermAvailable / 12)} anos
                      </span>
                    </div>
                  </div>
                  <div>
                    <h5 className="mb-2 font-bold text-system-info">💡 Recomendações</h5>
                    <ul className="space-y-1 text-sm">
                      {result.ageImpact.recommendations.length > 0 ? (
                        result.ageImpact.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-system-warning">•</span>
                            <span>{rec}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-system-success">✓ Prazo adequado para sua idade</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.affordabilityAnalysis.recommendations.length > 0 && (
            <Card className="border-l-4 border-system-info bg-system-info/10 duration-300">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info">
                  💡 Recomendações Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {result.affordabilityAnalysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-system-info">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Amortization Table */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between">
                📊 Tabela de Amortização
                <Button
                  onClick={() => setShowAmortization(!showAmortization)}
                  variant="outline"
                  className="text-sm"
                >
                  {showAmortization ? "Ocultar" : "Mostrar"} Tabela
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showAmortization && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant">
                        <th className="p-2 text-left">Mês</th>
                        <th className="p-2 text-right">Parcela</th>
                        <th className="p-2 text-right">Principal</th>
                        <th className="p-2 text-right">Juros</th>
                        <th className="p-2 text-right">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyPayments.slice(0, 24).map((payment) => (
                        <tr key={payment.month} className="border-b border-neutral-surface-variant">
                          <td className="p-2 font-medium">{payment.month}</td>
                          <td className="p-2 text-right tabular-nums">
                            {formatCurrency(payment.payment)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-growth-green">
                            {formatCurrency(payment.principal)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-system-warning">
                            {formatCurrency(payment.interest)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-primary-blue-dark">
                            {formatCurrency(payment.balance)}
                          </td>
                        </tr>
                      ))}
                      {result.monthlyPayments.length > 24 && (
                        <tr>
                          <td colSpan={5} className="p-2 text-center text-xs text-text-secondary">
                            ... e mais {result.monthlyPayments.length - 24} parcelas
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Educational Content Sections */}
      <Card className="border-l-4 border-growth-green bg-gradient-to-r from-growth-green-soft to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            💳 Empréstimo Consignado: O Crédito Mais Barato do Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-growth-green">empréstimo consignado</strong> é uma
                modalidade de crédito com
                <strong className="text-primary-blue-dark">
                  {" "}
                  desconto direto na folha de pagamento
                </strong>
                , oferecendo as <em>menores taxas de juros</em> do mercado brasileiro devido à menor
                inadimplência.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">
                  ✅ Principais Vantagens
                </h3>
                <div className="space-y-3 text-sm">
                  <ul className="list-inside list-disc space-y-2 text-text-secondary">
                    <li>
                      <strong className="text-growth-green">Taxas mais baixas:</strong> 1,5% a 3,5%
                      ao mês
                    </li>
                    <li>
                      <strong className="text-growth-green">Sem consulta ao SPC/Serasa:</strong>{" "}
                      Aprovação mais fácil
                    </li>
                    <li>
                      <strong className="text-growth-green">Desconto automático:</strong> Nunca
                      esquece de pagar
                    </li>
                    <li>
                      <strong className="text-growth-green">Prazos longos:</strong> Até 96 meses
                    </li>
                    <li>
                      <strong className="text-growth-green">Portabilidade:</strong> Pode trocar de
                      banco
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-warning">⚠️ Pontos de Atenção</h3>
                <div className="space-y-3 text-sm">
                  <ul className="list-inside list-disc space-y-2 text-text-secondary">
                    <li>
                      <strong className="text-system-warning">Margem limitada:</strong> Máximo
                      30-35% do salário
                    </li>
                    <li>
                      <strong className="text-system-warning">Vinculação obrigatória:</strong>{" "}
                      Precisa manter o emprego
                    </li>
                    <li>
                      <strong className="text-system-warning">Dificulta mobilidade:</strong> Mudança
                      de emprego complica
                    </li>
                    <li>
                      <strong className="text-system-warning">Prazo longo:</strong> Compromisso de
                      vários anos
                    </li>
                    <li>
                      <strong className="text-system-warning">Taxas variáveis:</strong> Algumas
                      podem aumentar
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Educational Content */}
      <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📋 Como Funciona o Empréstimo Consignado na Prática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-system-info">
                  👥 Quem Pode Contratar
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      🏢 CLT (Carteira Assinada)
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Margem:</strong> 30% do salário bruto
                      <br />
                      <strong>Prazo:</strong> Até 96 meses
                      <br />
                      <strong>Taxa típica:</strong> 1,8% a 2,5% a.m.
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">🏛️ Servidor Público</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Margem:</strong> 35% do salário bruto
                      <br />
                      <strong>Prazo:</strong> Até 96 meses
                      <br />
                      <strong>Taxa típica:</strong> 1,5% a 2,0% a.m.
                    </p>
                  </div>
                  <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-success">
                      👴 Aposentados e Pensionistas
                    </h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Margem:</strong> 35% do benefício
                      <br />
                      <strong>Prazo:</strong> Até 84 meses
                      <br />
                      <strong>Taxa típica:</strong> 1,6% a 2,2% a.m.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 flex items-center text-lg font-bold text-growth-green">
                  💡 Processo de Contratação
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">
                      1️⃣ Escolha da Instituição
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Compare taxas entre bancos, correspondentes e fintechs. Negocie sempre a
                      melhor condição.
                    </p>
                  </div>
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">2️⃣ Documentação</h4>
                    <p className="text-sm text-text-secondary">
                      CPF, RG, comprovante de renda, extrato bancário e autorização do empregador
                      (quando necessário).
                    </p>
                  </div>
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">3️⃣ Análise e Aprovação</h4>
                    <p className="text-sm text-text-secondary">
                      Verificação da margem consignável, histórico empregatício e aprovação em 24-48
                      horas.
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">4️⃣ Liberação</h4>
                    <p className="text-sm text-text-secondary">
                      Dinheiro na conta em até 72 horas e desconto automático na folha a partir do
                      mês seguinte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Empréstimo Consignado"
        items={[
          {
            question: "Qual a diferença entre empréstimo consignado e empréstimo pessoal?",
            answer:
              "<strong>Consignado</strong> tem desconto automático na folha com taxas de <strong>1,5% a 3,5% a.m.</strong> e prazo até 96 meses. <strong>Empréstimo pessoal</strong> é pago por boleto com taxas de 4% a 15% a.m. e consulta SPC/Serasa.",
            borderColor: "growth-green",
          },
          {
            question: "O que é margem consignável e como funciona?",
            answer:
              "É o <strong>percentual máximo do salário</strong> que pode ser comprometido: <strong>CLT: 30%</strong>, <strong>Servidor Público: 35%</strong>, <strong>Aposentado/Pensionista: 35%</strong> do benefício. É definido por lei para proteger sua renda.",
            borderColor: "system-info",
          },
          {
            question: "Posso quitar o empréstimo consignado antecipadamente?",
            answer:
              "<strong>Sim!</strong> Você pode quitar antecipadamente com <strong>desconto nos juros futuros</strong> (Lei 10.820/03). Opções: quitação total, amortização parcial ou portabilidade para melhor taxa.",
            borderColor: "system-success",
          },
          {
            question: "O que acontece se eu for demitido com consignado ativo?",
            answer:
              "O <strong>saldo devedor não é cancelado</strong>. Opções: renegociar como crédito pessoal, parcelar com novas condições, quitar com FGTS ou transferir para nova empresa se conseguir emprego.",
            borderColor: "system-warning",
          },
          {
            question: "Como funciona a portabilidade do empréstimo consignado?",
            answer:
              "Permite <strong>transferir para instituição com melhor taxa</strong> sem custos. A nova instituição quita seu débito atual e você fica com condições melhores. Compare sempre as taxas!",
            borderColor: "primary-blue",
          },
          {
            question: "Empréstimo consignado afeta meu CPF ou score?",
            answer:
              "<strong>Não afeta negativamente!</strong> Não aparece no SPC/Serasa como restrição e pode até <strong>melhorar seu score</strong> por demonstrar capacidade de pagamento, já que o desconto é automático.",
            borderColor: "system-success",
          },
          {
            question: "Qual a melhor estratégia para usar o empréstimo consignado?",
            answer:
              "Use para <strong>quitar dívidas caras</strong> (cartão, cheque especial - economia de 80%+ em juros), consolidar dívidas, investir em educação ou reformar imóvel. Evite gastos supérfluos!",
            borderColor: "growth-green",
          },
          {
            question: "Quais documentos preciso para contratar um consignado?",
            answer:
              "Documentos básicos: <strong>CPF, RG, comprovante de renda, extrato bancário</strong> e autorização do empregador (quando necessário). Aprovação em 24-48h e liberação em até 72h.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Sempre <strong>compare taxas</strong> entre bancos, correspondentes e fintechs. Negocie condições e considere a portabilidade periodicamente para garantir as <strong>melhores taxas do mercado</strong>!",
        }}
        footerText="<strong>Precisa simular diferentes cenários?</strong> Nossa calculadora oferece análise completa de margem consignável e comparação com outras modalidades para sua melhor decisão financeira!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-growth-green bg-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Empréstimo Consignado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-growth-green">calculadora de empréstimo consignado</strong> é
              <strong className="text-primary-blue-dark"> 100% gratuita</strong> e permite simular
              empréstimos para CLT, servidores públicos, aposentados e pensionistas com análise
              completa de margem consignável e comparação com outras modalidades.
            </p>
            <p>
              <strong>Recursos inclusos:</strong> Análise de margem por categoria profissional,
              comparação com empréstimo pessoal e cartão de crédito, análise de risco personalizada,
              simulação por parcela desejada, impacto da idade no prazo e muito mais.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Os cálculos são para
              fins educacionais e de planejamento. Para contratação de empréstimos, consulte sempre
              um
              <strong> correspondente bancário autorizado</strong> ou{" "}
              <strong>instituição financeira</strong>e leia atentamente o contrato.
            </p>
            <p className="mt-4 border-t border-growth-green/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados na legislação atual (Lei 10.820/03) • 🎓 Ferramenta educacional
              gratuita • 🔒 Seus dados não são armazenados • 📱 Responsivo para todos os
              dispositivos • 🌙 Modo escuro disponível • 📊 Gráficos SVG nativos para melhor
              performance
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
            name: "Calculadora de Empréstimo Consignado",
            description:
              "Calculadora online gratuita para simular empréstimos consignados para CLT, servidores públicos, aposentados e pensionistas. Análise completa de margem consignável.",
            url: "https://calculadorasonline.com.br/calculadoras/financas/emprestimo-consignado",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Simulação para CLT, servidores e aposentados",
              "Análise de margem consignável",
              "Comparação com outras modalidades",
              "Análise de risco personalizada",
              "Simulação por parcela desejada",
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

      <RelatedCalculators category="financas" currentCalculatorId="emprestimo-consignado" />
    </div>
  );
}
