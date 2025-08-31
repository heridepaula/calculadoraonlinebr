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
  calculateNetSalary,
  type NetSalaryParams,
  type NetSalaryResult,
} from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora Salário Líquido 2025 | ${APP_NAME}` },
    {
      name: "description",
      content:
        "💰 Calcule salário líquido 2025: descontos INSS e IRRF atualizados. Inclui dependentes, CLT e PJ. Resultado instantâneo!",
    },
    {
      name: "keywords",
      content:
        "calculadora salário líquido, INSS IRRF 2025, desconto salário, tabela INSS, imposto renda, CLT PJ",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de Salário Líquido 2025 - Descontos INSS e IRRF - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calcule seu salário líquido com precisão usando as tabelas de INSS e IRRF atualizadas para 2025. Gratuita e completa!",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora Salário Líquido Online - INSS e IRRF 2025 - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta mais precisa para calcular salário líquido: INSS, IRRF, dependentes e todos os descontos trabalhistas.",
    },
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
        name: "Calculadora de Salário Líquido - Simulador INSS e IRRF 2025",
        description:
          "Simulador gratuito de salário líquido com tabelas INSS e IRRF 2025 atualizadas. Calcula descontos CLT, PJ e MEI com precisão.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-31",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
          name: "Calculadora de Salário Líquido 2025 - Simulador INSS e IRRF",
          description:
            "Calcule salário líquido 2025: descontos INSS e IRRF atualizados. Inclui dependentes, CLT e PJ. Resultado instantâneo!",
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
                name: "Trabalhista",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Salário Líquido",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/salario-liquido",
              },
            ],
          },
        },
        about: {
          "@type": "Service",
          name: "Cálculo de Salário Líquido",
          description: "Cálculo de descontos trabalhistas INSS e IRRF sobre salário bruto",
          category: "TaxCalculation",
        },
        featureList: [
          "Cálculo de salário líquido CLT",
          "Descontos INSS e IRRF 2025",
          "Simulação para CLT, PJ e MEI",
          "Cálculo com dependentes",
          "Horas extras e adições salariais",
          "Comparação entre regimes",
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
            name: "Como calcular salário líquido?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Salário líquido = salário bruto - INSS - IRRF - outros descontos. Use tabelas 2025: INSS até 8,14% e IRRF de 7,5% a 27,5% conforme faixa salarial."
            }
          },
          {
            "@type": "Question", 
            name: "Qual a diferença entre CLT, PJ e MEI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CLT: descontos INSS e IRRF obrigatórios. PJ: tributac£ão variável por regime. MEI: taxa fixa mensal até R$ 81 mil/ano, sem INSS nem IRRF sobre receita."
            }
          },
          {
            "@type": "Question",
            name: "Como dependentes afetam o IRRF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cada dependente deduz R$ 189,59 mensais da base de cálculo do IRRF, reduzindo o imposto. São considerados: filhos até 21 anos, cônjuge, pais etc."
            }
          }
        ]
      })
    }
  ];
};

export default function NetSalaryCalculator() {
  const [result, setResult] = useState<NetSalaryResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Estados do formulário
  const [grossSalary, setGrossSalary] = useState("0");
  const [dependents, setDependents] = useState("0");
  const [overtimeValue, setOvertimeValue] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [contractType, setContractType] = useState<"CLT" | "PJ" | "MEI">("CLT");
  const [accountantFee, setAccountantFee] = useState("0");
  const [taxRate, setTaxRate] = useState("0");

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "salario_liquido",
    category: "trabalhista"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("salario_liquido");

  // Constantes MEI
  const MEI_LIMIT_ANNUAL = 81000; // R$ 81.000,00 anuais
  const MEI_LIMIT_MONTHLY = MEI_LIMIT_ANNUAL / 12; // R$ 6.750,00 mensais

  // Função para processar valor monetário
  const parseMoneyValue = (value: string | number | undefined): number => {
    // Se for undefined ou null, retorna 0
    if (!value && value !== 0) {
      return 0;
    }

    // Se já for um número, retorna ele
    if (typeof value === "number") {
      return value;
    }

    // Converte para string se não for
    const stringValue = String(value);

    // Remove todos os caracteres exceto números, vírgulas e pontos
    const cleanValue = stringValue.replace(/[^\d,.]/g, "");

    // Se não sobrou nada, retorna 0
    if (!cleanValue) {
      return 0;
    }

    // Se contém vírgula, assume formato brasileiro (1.234,56)
    if (cleanValue.includes(",")) {
      return parseFloat(cleanValue.replace(/\./g, "").replace(",", ".")) || 0;
    }

    // Senão assume formato com ponto decimal
    return parseFloat(cleanValue) || 0;
  };

  // Função para verificar limite MEI
  const checkMEILimit = (monthlyIncome: number): boolean => {
    return monthlyIncome <= MEI_LIMIT_MONTHLY;
  };

  // Verifica se MEI está acima do limite
  const isMEIAboveLimit =
    contractType === "MEI" &&
    parseMoneyValue(grossSalary) + parseMoneyValue(overtimeValue) > MEI_LIMIT_MONTHLY;

  // Cálculo em tempo real
  useEffect(() => {
    const calculate = () => {
      try {
        console.log("Debug - valores recebidos:", {
          grossSalary,
          dependents,
          overtimeValue,
          otherDeductions,
          contractType,
        });

        const grossSalaryNum = parseMoneyValue(grossSalary);
        const dependentsNum = parseInt(dependents) || 0;
        const overtimeValueNum = parseMoneyValue(overtimeValue);
        const otherDeductionsNum = parseMoneyValue(otherDeductions);
        const accountantFeeNum = parseMoneyValue(accountantFee);
        const taxRateNum =
          contractType === "MEI" ? parseMoneyValue(taxRate) : parseFloat(taxRate) || 0;

        console.log("Debug - valores processados:", {
          grossSalaryNum,
          dependentsNum,
          overtimeValueNum,
          otherDeductionsNum,
          accountantFeeNum,
          taxRateNum,
        });

        if (grossSalaryNum > 0) {
          setIsCalculating(true);

          // Verifica limite MEI
          const totalMonthlyIncome = grossSalaryNum + overtimeValueNum;
          const isWithinMEILimit = contractType !== "MEI" || checkMEILimit(totalMonthlyIncome);

          // Para PJ e MEI, calcula impostos baseado na alíquota informada
          let totalTaxes = 0;
          if (contractType === "PJ" && taxRateNum > 0) {
            // PJ: alíquota percentual sobre o faturamento
            totalTaxes = (grossSalaryNum + overtimeValueNum) * (taxRateNum / 100);
          } else if (contractType === "MEI" && taxRateNum > 0 && isWithinMEILimit) {
            // MEI: valor fixo mensal (apenas se dentro do limite)
            totalTaxes = taxRateNum;
          } else if (contractType === "MEI" && !isWithinMEILimit) {
            // MEI acima do limite: não aplica tributação MEI
            totalTaxes = 0;
          }

          // Para PJ e MEI, adiciona taxa do contador e impostos aos outros descontos
          const totalOtherDeductions =
            contractType === "PJ" || contractType === "MEI"
              ? otherDeductionsNum + accountantFeeNum + totalTaxes
              : otherDeductionsNum;

          const params: NetSalaryParams = {
            grossSalary: grossSalaryNum,
            dependents: dependentsNum,
            overtimeValue: overtimeValueNum,
            otherDeductions: totalOtherDeductions,
            contractType: contractType as "CLT" | "PJ" | "OUTROS",
          };

          const calculationResult = calculateNetSalary(params);
          setResult(calculationResult);

          setTimeout(() => setIsCalculating(false), 100);
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error("Erro completo no cálculo:", error);
        setResult(null);
        setIsCalculating(false);
      }
    };

    calculate();
  }, [
    grossSalary,
    dependents,
    overtimeValue,
    otherDeductions,
    contractType,
    accountantFee,
    taxRate,
  ]);

  const handleCalculate = () => {
    // Força recálculo
    try {
      const grossSalaryNum = parseMoneyValue(grossSalary);
      const dependentsNum = parseInt(dependents) || 0;
      const overtimeValueNum = parseMoneyValue(overtimeValue);
      const otherDeductionsNum = parseMoneyValue(otherDeductions);
      const accountantFeeNum = parseMoneyValue(accountantFee);
      const taxRateNum =
        contractType === "MEI" ? parseMoneyValue(taxRate) : parseFloat(taxRate) || 0;

      if (grossSalaryNum > 0) {
        setIsCalculating(true);

        // Verifica limite MEI
        const totalMonthlyIncome = grossSalaryNum + overtimeValueNum;
        const isWithinMEILimit = contractType !== "MEI" || checkMEILimit(totalMonthlyIncome);

        // Para PJ e MEI, calcula impostos baseado na alíquota informada
        let totalTaxes = 0;
        if (contractType === "PJ" && taxRateNum > 0) {
          // PJ: alíquota percentual sobre o faturamento
          totalTaxes = (grossSalaryNum + overtimeValueNum) * (taxRateNum / 100);
        } else if (contractType === "MEI" && taxRateNum > 0 && isWithinMEILimit) {
          // MEI: valor fixo mensal (apenas se dentro do limite)
          totalTaxes = taxRateNum;
        } else if (contractType === "MEI" && !isWithinMEILimit) {
          // MEI acima do limite: não aplica tributação MEI
          totalTaxes = 0;
        }

        // Para PJ e MEI, adiciona taxa do contador e impostos aos outros descontos
        const totalOtherDeductions =
          contractType === "PJ" || contractType === "MEI"
            ? otherDeductionsNum + accountantFeeNum + totalTaxes
            : otherDeductionsNum;

        const params: NetSalaryParams = {
          grossSalary: grossSalaryNum,
          dependents: dependentsNum,
          overtimeValue: overtimeValueNum,
          otherDeductions: totalOtherDeductions,
          contractType: contractType as "CLT" | "PJ" | "OUTROS",
        };

        const calculationResult = calculateNetSalary(params);
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
    setGrossSalary("0");
    setDependents("0");
    setOvertimeValue("0");
    setOtherDeductions("0");
    setAccountantFee("0");
    setTaxRate("0");
    setContractType("CLT");
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
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem>Salário Líquido</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            💰 Calculadora de Salário Líquido - Tabelas 2025
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Calcule seu <strong className="text-growth-green">salário líquido</strong> com precisão
            usando as
            <strong className="text-primary-blue-dark">
              {" "}
              tabelas atualizadas de INSS e IRRF 2025
            </strong>
            . Inclui dedução por dependentes, horas extras e diferentes tipos de contratação.
            <strong className="text-system-warning"> Resultado em tempo real</strong>!
          </p>
          <div className="inline-block rounded-lg bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/20 p-4">
            <p className="text-sm font-medium text-text-primary">
              📊 <strong>Tabelas 2025</strong> • 💼 <strong>CLT e PJ</strong> • 👨‍👩‍👧‍👦{" "}
              <strong>Dependentes</strong> • ⚡ <strong>Cálculo Instantâneo</strong>
            </p>
          </div>
        </header>

        {/* Formulário */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">Dados do Salário</CardTitle>
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
                <MoneyInput
                  label="Salário Bruto Mensal"
                  value={grossSalary}
                  onChange={setGrossSalary}
                  placeholder="R$ 3.000,00"
                  required
                  fullWidth
                />

                <Select
                  label="Tipo de Contratação"
                  value={contractType}
                  onChange={(value) => setContractType(value as "CLT" | "PJ" | "MEI")}
                  options={[
                    { value: "CLT", label: "CLT (Carteira Assinada)" },
                    { value: "PJ", label: "PJ (Pessoa Jurídica)" },
                    { value: "MEI", label: "MEI (Microempreendedor Individual)" },
                  ]}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  type="number"
                  label="Número de Dependentes"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="20"
                  fullWidth
                />

                <MoneyInput
                  label="Horas Extras/Adicionais (Opcional)"
                  value={overtimeValue}
                  onChange={setOvertimeValue}
                  placeholder="R$ 0,00"
                  fullWidth
                />
              </div>

              <MoneyInput
                label="Outros Descontos (Opcional)"
                value={otherDeductions}
                onChange={setOtherDeductions}
                placeholder="R$ 0,00"
                help="Ex: convênio médico, vale-refeição, etc."
                fullWidth
              />

              {(contractType === "PJ" || contractType === "MEI") && (
                <div className="space-y-4">
                  <MoneyInput
                    label="Taxa do Contador (Opcional)"
                    value={accountantFee}
                    onChange={setAccountantFee}
                    placeholder="R$ 0,00"
                    help="Valor mensal da contabilidade"
                    fullWidth
                  />

                  {contractType === "MEI" ? (
                    <MoneyInput
                      label="Valor Fixo Mensal MEI (R$)"
                      value={taxRate}
                      onChange={setTaxRate}
                      placeholder="R$ 70,60"
                      help="Ex: R$ 70,60 (Comércio), R$ 74,60 (Serviços), R$ 75,60 (Misto)"
                      fullWidth
                    />
                  ) : (
                    <RateInput
                      label="Alíquota de Impostos (%)"
                      value={taxRate}
                      onChange={setTaxRate}
                      placeholder="0,00"
                      help="Ex: 6% (Simples), 11,33% (Lucro Presumido)"
                      fullWidth
                    />
                  )}
                </div>
              )}

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

              {/* Informações por tipo de contratação */}
              {contractType === "CLT" && (
                <div className="mt-4 rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <h4 className="mb-2 font-semibold text-system-info">📋 Informações CLT</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>
                      • <strong>INSS:</strong> Alíquotas de 7,5% a 14% (progressivo)
                    </p>
                    <p>
                      • <strong>IRRF:</strong> Isento até R$ 3.036 (dois salários mínimos)
                    </p>
                    <p>
                      • <strong>Dependentes:</strong> R$ 189,59 de dedução por dependente
                    </p>
                  </div>
                </div>
              )}

              {contractType === "PJ" && (
                <div className="mt-4 rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">⚠️ Atenção PJ</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      Como PJ, você não tem descontos automáticos de INSS/IRRF. Deve fazer suas
                      próprias contribuições e declarações.
                    </p>
                    <div>
                      <p className="font-semibold text-system-warning">
                        💡 Alíquotas de Exemplo por Regime:
                      </p>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>
                          • <strong>Simples Nacional:</strong> 4% a 22,9% (use no campo acima)
                        </li>
                        <li>
                          • <strong>Lucro Presumido:</strong> ~11,33% a 16,33% (use no campo acima)
                        </li>
                        <li>
                          • <strong>Lucro Real:</strong> Variável conforme lucro efetivo
                        </li>
                        <li>
                          • <strong>Dica:</strong> Informe sua alíquota específica no campo acima
                          para cálculo preciso
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {contractType === "MEI" && !isMEIAboveLimit && (
                <div className="mt-4 rounded-lg border border-growth-green/20 bg-growth-green/10 p-4">
                  <h4 className="mb-2 font-semibold text-growth-green">🏪 Informações MEI</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>Como MEI, você tem tributação fixa mensal muito baixa.</p>
                    <div>
                      <p className="font-semibold text-growth-green">💰 Valores Fixos MEI 2025:</p>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>
                          • <strong>Comércio/Indústria:</strong> R$ 70,60/mês (digite R$ 70,60 no
                          campo acima)
                        </li>
                        <li>
                          • <strong>Prestação de Serviços:</strong> R$ 74,60/mês (digite R$ 74,60 no
                          campo acima)
                        </li>
                        <li>
                          • <strong>Comércio + Serviços:</strong> R$ 75,60/mês (digite R$ 75,60 no
                          campo acima)
                        </li>
                        <li>
                          • <strong>Limite de Faturamento:</strong> R$ 81.000,00/ano (R${" "}
                          {formatCurrency(MEI_LIMIT_MONTHLY)} mensal)
                        </li>
                        <li>
                          • <strong>Dica:</strong> Informe o valor fixo mensal no campo "Valor Fixo
                          MEI" acima
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {isMEIAboveLimit && (
                <div className="mt-4 rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                  <h4 className="mb-2 font-semibold text-system-error">
                    ⚠️ ATENÇÃO: MEI Acima do Limite!
                  </h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>
                        Sua renda mensal de{" "}
                        {formatCurrency(
                          parseMoneyValue(grossSalary) + parseMoneyValue(overtimeValue)
                        )}
                        excede o limite MEI de {formatCurrency(MEI_LIMIT_MONTHLY)}/mês
                      </strong>
                    </p>
                    <div className="rounded border border-system-warning/30 bg-system-warning/20 p-3">
                      <p className="mb-1 font-semibold text-system-warning">
                        📋 O que você deve fazer:
                      </p>
                      <ul className="space-y-1 text-xs">
                        <li>
                          • <strong>Opção 1:</strong> Migrar para PJ (Pessoa Jurídica) imediatamente
                        </li>
                        <li>
                          • <strong>Opção 2:</strong> Reduzir o faturamento para dentro do limite
                          MEI
                        </li>
                        <li>
                          • <strong>Consequências:</strong> Multas e cobrança retroativa se
                          continuar como MEI
                        </li>
                        <li>
                          • <strong>Sugestão:</strong> Altere o tipo de contratação para "PJ" acima
                        </li>
                      </ul>
                    </div>
                    <div className="mt-3 text-center">
                      <Button
                        type="button"
                        onClick={() => setContractType("PJ")}
                        className="bg-system-warning px-4 py-2 text-sm text-white hover:bg-system-warning/80"
                      >
                        🔄 Converter para PJ Automaticamente
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h2">Resultado do Cálculo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Valor Principal */}
                <div className="rounded-lg bg-gradient-to-r from-growth-green-soft to-primary-blue-light p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-growth-green">
                    {formatCurrency(result.netSalary)}
                  </div>
                  <div className="text-sm text-text-secondary">Salário Líquido Mensal</div>
                  <div className="mt-1 text-xs text-text-secondary">
                    {formatPercentage(result.summary.takeHomePercentage / 100)} do bruto
                  </div>
                </div>

                {/* Resumo dos Valores */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-text-secondary">Salário Bruto Total</div>
                    <div className="font-semibold text-text-primary">
                      {formatCurrency(result.grossTotal)}
                    </div>
                  </div>
                  <div>
                    <div className="text-text-secondary">Total de Descontos</div>
                    <div className="font-semibold text-system-error">
                      -{formatCurrency(result.totalDeductions)}
                    </div>
                  </div>
                </div>

                {/* Detalhamento dos Descontos */}
                {contractType !== "PJ" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Detalhamento dos Descontos:</h4>

                    {result.inssDeduction > 0 && (
                      <div className="flex items-center justify-between rounded bg-neutral-surface/30 p-3">
                        <div>
                          <div className="font-medium text-text-primary">INSS</div>
                          <div className="text-xs text-text-secondary">
                            {formatPercentage(result.inssDetails.rate)} sobre{" "}
                            {formatCurrency(result.inssDetails.baseValue)}
                          </div>
                        </div>
                        <div className="font-semibold text-system-error">
                          -{formatCurrency(result.inssDeduction)}
                        </div>
                      </div>
                    )}

                    {result.irrfDeduction > 0 ? (
                      <div className="flex items-center justify-between rounded bg-neutral-surface/30 p-3">
                        <div>
                          <div className="font-medium text-text-primary">IRRF</div>
                          <div className="text-xs text-text-secondary">
                            {formatPercentage(result.irrfDetails.rate)}
                            {result.irrfDetails.dependentsDeduction > 0 &&
                              ` • Dedução dependentes: ${formatCurrency(result.irrfDetails.dependentsDeduction)}`}
                          </div>
                        </div>
                        <div className="font-semibold text-system-error">
                          -{formatCurrency(result.irrfDeduction)}
                        </div>
                      </div>
                    ) : (
                      result.irrfDetails.isExempt && (
                        <div className="rounded border border-growth-green/20 bg-growth-green-soft p-3">
                          <div className="font-medium text-growth-green">✓ IRRF - Isento</div>
                          <div className="text-xs text-text-secondary">
                            {result.irrfDetails.exemptReason}
                          </div>
                        </div>
                      )
                    )}

                    {result.otherDeductions > 0 && (
                      <div className="flex items-center justify-between rounded bg-neutral-surface/30 p-3">
                        <div>
                          <div className="font-medium text-text-primary">Outros Descontos</div>
                          <div className="text-xs text-text-secondary">Conforme informado</div>
                        </div>
                        <div className="font-semibold text-system-error">
                          -{formatCurrency(result.otherDeductions)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Informações Adicionais */}
                {result.recommendations.length > 0 && (
                  <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">
                      💡 Informações Importantes:
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index}>• {recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Indicadores */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="rounded bg-neutral-surface/20 p-3 text-center">
                    <div className="font-semibold text-text-primary">
                      {formatPercentage(result.summary.effectiveRate)}
                    </div>
                    <div className="text-text-secondary">Taxa Efetiva de Desconto</div>
                  </div>
                  <div className="rounded bg-neutral-surface/20 p-3 text-center">
                    <div className="font-semibold text-text-primary">
                      {result.summary.isMinimumWage ? "Sim" : "Não"}
                    </div>
                    <div className="text-text-secondary">Salário Mínimo</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Simulação Comparativa */}
        {showComparison && result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle as="h3">🔄 Simulação Comparativa de Salários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { label: "Salário Atual", value: parseMoneyValue(grossSalary) },
                  { label: "+10%", value: parseMoneyValue(grossSalary) * 1.1 },
                  { label: "+20%", value: parseMoneyValue(grossSalary) * 1.2 },
                ].map((scenario, index) => {
                  // Para PJ e MEI, calcula impostos baseado na alíquota informada
                  const taxRateNum =
                    contractType === "MEI" ? parseMoneyValue(taxRate) : parseFloat(taxRate) || 0;
                  const isWithinMEILimit = contractType !== "MEI" || checkMEILimit(scenario.value);

                  let totalTaxes = 0;
                  if (contractType === "PJ" && taxRateNum > 0) {
                    // PJ: alíquota percentual sobre o faturamento
                    totalTaxes = scenario.value * (taxRateNum / 100);
                  } else if (contractType === "MEI" && taxRateNum > 0 && isWithinMEILimit) {
                    // MEI: valor fixo mensal (apenas se dentro do limite)
                    totalTaxes = taxRateNum;
                  } else if (contractType === "MEI" && !isWithinMEILimit) {
                    // MEI acima do limite: não aplica tributação MEI
                    totalTaxes = 0;
                  }

                  // Para PJ e MEI, adiciona taxa do contador e impostos aos outros descontos
                  const totalOtherDeductions =
                    contractType === "PJ" || contractType === "MEI"
                      ? parseMoneyValue(otherDeductions) +
                        parseMoneyValue(accountantFee) +
                        totalTaxes
                      : parseMoneyValue(otherDeductions);

                  const testParams: NetSalaryParams = {
                    grossSalary: scenario.value,
                    dependents: parseInt(dependents) || 0,
                    overtimeValue: parseMoneyValue(overtimeValue),
                    otherDeductions: totalOtherDeductions,
                    contractType: contractType as "CLT" | "PJ" | "OUTROS",
                  };
                  const testResult = calculateNetSalary(testParams);

                  return (
                    <div
                      key={index}
                      className={`rounded-lg border p-4 ${
                        contractType === "MEI" && !isWithinMEILimit
                          ? "border-system-error bg-system-error/10"
                          : index === 0
                            ? "border-primary-blue bg-primary-blue/10"
                            : "border-growth-green bg-growth-green/10"
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="mb-2 font-semibold text-text-primary">{scenario.label}</h4>
                        {contractType === "MEI" && !isWithinMEILimit && (
                          <div className="mb-2 text-xs font-semibold text-system-error">
                            ⚠️ Acima do limite MEI
                          </div>
                        )}
                        <div className="text-lg font-bold text-growth-green">
                          {formatCurrency(testResult.netSalary)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          Bruto: {formatCurrency(scenario.value)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          Desconto: {formatPercentage(testResult.summary.effectiveRate)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-text-secondary">
                  💡 <strong>Insight:</strong> Veja como aumentos salariais impactam
                  proporcionalmente menos no líquido devido aos impostos progressivos.
                  {contractType === "MEI" && isMEIAboveLimit && (
                    <span className="mt-2 block font-semibold text-system-error">
                      ⚠️ Cenários acima do limite MEI precisam migrar para PJ!
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conteúdo Educacional */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle as="h2">📚 Como Funciona o Cálculo do Salário Líquido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* INSS */}
                <div>
                  <h3 className="mb-3 font-bold text-primary-blue-dark">
                    🏛️ INSS (Instituto Nacional do Seguro Social)
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-primary-blue-light p-3">
                      <h4 className="mb-2 font-semibold text-primary-blue-dark">Faixas 2025:</h4>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>
                          • Até R$ 1.518: <strong>7,5%</strong>
                        </div>
                        <div>
                          • R$ 1.518,01 a R$ 2.793,88: <strong>9%</strong>
                        </div>
                        <div>
                          • R$ 2.793,89 a R$ 4.190,83: <strong>12%</strong>
                        </div>
                        <div>
                          • R$ 4.190,84 a R$ 8.157,41: <strong>14%</strong>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">
                      O desconto do INSS é <strong>progressivo</strong>, ou seja, cada faixa
                      salarial tem sua alíquota específica aplicada apenas sobre a parte que se
                      enquadra nela.
                    </p>
                  </div>
                </div>

                {/* IRRF */}
                <div>
                  <h3 className="mb-3 font-bold text-growth-green">
                    📊 IRRF (Imposto de Renda Retido na Fonte)
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-growth-green-soft p-3">
                      <h4 className="mb-2 font-semibold text-growth-green">Novidade 2025:</h4>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>
                          • <strong>Isento</strong> até R$ 3.036 (2 salários mínimos)
                        </div>
                        <div>
                          • Desconto simplificado: <strong>R$ 607,20</strong>
                        </div>
                        <div>
                          • Dedução por dependente: <strong>R$ 189,59</strong>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">
                      A partir de <strong>maio de 2025</strong>, quem ganha até R$ 3.036 ficou
                      <strong className="text-growth-green"> isento do Imposto de Renda</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diferença CLT vs PJ */}
              <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h3 className="mb-3 font-bold text-system-warning">
                  ⚖️ CLT vs PJ: Principais Diferenças
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      👔 CLT (Carteira Assinada)
                    </h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• Desconto automático de INSS e IRRF</li>
                      <li>• Direitos trabalhistas garantidos</li>
                      <li>• 13º salário, férias, FGTS</li>
                      <li>• Estabilidade e proteções legais</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-growth-green">
                      🏢 PJ (Pessoa Jurídica)
                    </h4>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• Contribuições por conta própria</li>
                      <li>• Maior flexibilidade tributária</li>
                      <li>• Sem direitos trabalhistas CLT</li>
                      <li>• Responsabilidade pela previdência</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Metodologia de Cálculo */}
              <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                <h3 className="mb-3 font-bold text-system-info">
                  🔬 Metodologia de Cálculo (Baseada em Referências Oficiais)
                </h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <p>
                    <strong>Nossa calculadora segue rigorosamente as diretrizes:</strong>
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-system-info">📋 Fontes Oficiais:</h4>
                      <ul className="space-y-1">
                        <li>• Receita Federal do Brasil</li>
                        <li>• Ministério do Trabalho</li>
                        <li>• INSS - Instituto Nacional do Seguro Social</li>
                        <li>• Tabelas salariais 2025</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-system-info">🎯 Validação:</h4>
                      <ul className="space-y-1">
                        <li>• iDinheiro - calculadoras financeiras</li>
                        <li>• Mobills - gestão financeira</li>
                        <li>• Contabilidade Scalabrini</li>
                        <li>• Dev na Gringa - tech salaries</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dicas Importantes */}
              <div className="rounded-lg border border-primary-blue/20 bg-gradient-to-r from-primary-blue/10 to-growth-green/10 p-4">
                <h3 className="mb-3 font-bold text-primary-blue-dark">
                  💡 Dicas Importantes para Maximizar seu Salário Líquido
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm text-text-secondary md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-growth-green">✅ Estratégias Legais:</h4>
                    <ul className="space-y-1">
                      <li>• Declare dependentes elegíveis (filhos, cônjuge)</li>
                      <li>• Considere previdência privada (dedutível até 12%)</li>
                      <li>• Avalie benefícios não tributáveis (VR, VT)</li>
                      <li>• Para PJ: escolha o regime tributário adequado</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-system-warning">⚠️ Atenção:</h4>
                    <ul className="space-y-1">
                      <li>• 13º salário tem tributação separada</li>
                      <li>• Horas extras aumentam a base de cálculo</li>
                      <li>• Rescisão pode ter tributação diferenciada</li>
                      <li>• Sempre consulte um contador qualificado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Salário Líquido"
          items={[
            {
              question: "Como calcular salário líquido a partir do bruto em 2025?",
              answer:
                "<strong>Fórmula:</strong> Salário Líquido = Salário Bruto - INSS - IRRF - Outros Descontos. Use nossa calculadora para aplicar automaticamente as <strong>tabelas oficiais 2025</strong> com precisão total. O cálculo considera a progressão das alíquotas por faixa salarial.",
              borderColor: "primary-blue",
            },
            {
              question: "Qual o desconto do INSS em 2025? Como funciona a tabela progressiva?",
              answer:
                "O INSS 2025 varia de <strong>7,5% a 14%</strong> conforme a faixa salarial. É progressivo: <strong>até R$ 1.518 (7,5%)</strong>, de R$ 1.518 a R$ 2.793 (9%), de R$ 2.793 a R$ 4.190 (12%), <strong>acima de R$ 4.190 (14%)</strong>. O desconto máximo é limitado ao teto previdenciário.",
              borderColor: "growth-green",
            },
            {
              question: "Quem está isento do Imposto de Renda em 2025?",
              answer:
                "A partir de <strong>maio de 2025</strong>, estão isentos os trabalhadores que recebem <strong>até R$ 3.036</strong> (dois salários mínimos). Antes era R$ 2.259. Esta mudança beneficia milhões de brasileiros e aumenta significativamente o salário líquido dessa faixa.",
              borderColor: "system-info",
            },
            {
              question: "Como funciona a dedução por dependentes no IRRF?",
              answer:
                "Cada dependente reduz <strong>R$ 189,59</strong> da base de cálculo do IRRF mensalmente. São considerados: <strong>cônjuge, filhos até 21 anos</strong> (ou 24 se universitários), pais idosos, entre outros conforme legislação. Pode representar economia significativa no IRRF.",
              borderColor: "system-warning",
            },
            {
              question: "Qual a diferença entre salário líquido CLT e PJ?",
              answer:
                "<strong>CLT:</strong> Descontos automáticos (INSS/IRRF) mas com direitos garantidos (13º, férias, FGTS). <strong>PJ:</strong> Sem descontos automáticos, mas deve contribuir por conta própria. Compare sempre o <strong>custo-benefício total</strong>, incluindo direitos trabalhistas.",
              borderColor: "growth-green",
            },
            {
              question: "Por que meu salário líquido é diferente do calculado?",
              answer:
                'Podem existir outros descontos: <strong>vale-transporte, convênio médico, empréstimos consignados, contribuição sindical, pensão alimentícia</strong>. Nossa calculadora permite incluir estes valores no campo "Outros Descontos" para maior precisão.',
              borderColor: "primary-blue",
            },
            {
              question: "Como usar esta calculadora para negociar salário?",
              answer:
                "Use nossa <strong>simulação comparativa</strong> para ver o impacto real de aumentos. <strong>Exemplo:</strong> 20% de aumento no bruto pode resultar em apenas 15% no líquido devido aos impostos progressivos. Ajuda a negociar aumentos mais estratégicos.",
              borderColor: "growth-green",
            },
            {
              question: "Esta calculadora substitui um contador?",
              answer:
                "<strong>Não!</strong> É uma ferramenta educativa com estimativas precisas baseadas nas tabelas oficiais. Para <strong>planejamento tributário complexo, elisão fiscal</strong> ou situações especiais, sempre consulte um contador qualificado.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Diferencial da Nossa Calculadora",
            content:
              "<strong>1. Tempo Real:</strong> Cálculos instantâneos conforme você digita. <strong>2. Simulação Comparativa:</strong> Veja o impacto de aumentos automaticamente. <strong>3. Educação Financeira:</strong> Explicações detalhadas sobre cada desconto e dicas para otimização legal.",
          }}
          footerText="<strong>Tabelas 2025 atualizadas:</strong> Todos os cálculos seguem as <strong>tabelas oficiais da Receita Federal</strong> e são validados com ferramentas de referência do mercado."
        />

        {/* Seção sobre Precisão e Metodologia */}
        <Card className="w-full border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              🎯 Sobre Esta Calculadora de Salário Líquido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta{" "}
                <strong className="text-primary-blue-dark">calculadora de salário líquido</strong> é
                <strong className="text-system-success"> 100% gratuita</strong> e utiliza as
                <strong className="text-growth-green">
                  {" "}
                  tabelas oficiais de INSS e IRRF para 2025
                </strong>
                . Desenvolvida para oferecer cálculos precisos e educação financeira completa.
              </p>
              <p>
                <strong>Funcionalidades exclusivas:</strong> Cálculo em tempo real, simulação
                comparativa de aumentos, tabelas atualizadas 2025, suporte a CLT e PJ, dedução por
                dependentes, horas extras, interface mobile-first, explicações educativas detalhadas
                e comparações entre tipos de contratação.
              </p>
              <p>
                <strong>Metodologia validada:</strong> Cálculos baseados nas tabelas da Receita
                Federal, validados com ferramentas de referência como iDinheiro, Mobills e
                Contabilidade Scalabrini. Atualizada conforme as mudanças tributárias de 2025.
              </p>
              <p>
                <strong className="text-system-warning">Disclaimer:</strong> Os cálculos são
                baseados nas tabelas oficiais vigentes. Para situações específicas ou planejamento
                tributário complexo, <strong>consulte sempre um contador qualificado</strong> ou
                <strong> especialista em folha de pagamento</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="trabalhista" currentCalculatorId="salario-liquido" />
      </div>
    </div>
  );
}
