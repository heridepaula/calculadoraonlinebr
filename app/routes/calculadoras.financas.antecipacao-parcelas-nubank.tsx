import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";
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
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Antecipação Parcelas Nubank | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Simule antecipação de parcelas do cartão Nubank. Calcule desconto, juros e economia ao antecipar faturas parceladas com análise detalhada.",
    },
    {
      name: "keywords",
      content:
        "calculadora adiantamento parcelas nubank, antecipação nubank, adiantamento nubank, quitar parcelas nubank, simulador nubank, desconto antecipação, calculadora nubank 2025",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
    },
    {
      property: "og:title",
      content: "Calculadora Adiantamento Parcelas Nubank 2025 – Antecipação e Economia",
    },
    {
      property: "og:description",
      content:
        "Simule antecipação de parcelas do cartão Nubank. Calcule desconto, juros e economia ao antecipar faturas parceladas com análise detalhada.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-antecipacao-nubank.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Antecipação Nubank - Calcule descontos e economize",
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
        "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Adiantamento Parcelas Nubank 2025 – Antecipação e Economia",
    },
    {
      name: "twitter:description",
      content:
        "Simule antecipação de parcelas do cartão Nubank. Calcule desconto, juros e economia ao antecipar faturas parceladas com análise detalhada.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-antecipacao-nubank.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Antecipação Nubank - Calcule Descontos",
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
  ];
};

interface MesAntecipacao {
  mes: number;
  parcelasRestantesNoMes: number;
  valorTotalRestante: number;
  descontoAntecipacaoNoMes: number;
  economiaAntecipacaoNoMes: number;
}

interface AntecipacaoResult {
  // Antecipação
  valorAntecipacao: number;
  descontoAntecipacao: number;
  valorPagoPelaAntecipacao: number;
  economiaAntecipacao: number;

  // Dados auxiliares
  parcelasRestantes: number;
  taxaJurosAntecipacao: number;

  // Tabela mês a mês
  tabelaMensal: MesAntecipacao[];
}

interface ValidationErrors {
  valorParcela?: string;
  numeroParcelasRestantes?: string;
  taxaJurosAntecipacao?: string;
}

export default function AntecipacaoNubankCalculator() {
  const [valorParcela, setValorParcela] = useState("");
  const [numeroParcelasRestantes, setNumeroParcelasRestantes] = useState("");
  const [taxaJurosAntecipacao, setTaxaJurosAntecipacao] = useState("10,58"); // Taxa padrão do Nubank
  const [result, setResult] = useState<AntecipacaoResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "antecipacao-nubank",
    category: "financas",
  });
  useFormTracking("antecipacao-nubank");

  const currencyBR = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
  const percentBR = (v: number, digits = 2) =>
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

  const parseMoney = (v: string | number): number => {
    const s = String(v ?? "");
    // Remove R$ e espaços
    let normalized = s.replace(/[R$\s]/g, "");

    // Se contém vírgula, trata como formato brasileiro (ex: 1.000,01)
    if (normalized.includes(",")) {
      // Remove pontos (separadores de milhares) e substitui vírgula por ponto
      normalized = normalized.replace(/\./g, "").replace(",", ".");
    }
    // Se não contém vírgula mas contém ponto, verifica se é decimal ou milhares
    else if (normalized.includes(".")) {
      // Se tem mais de 3 dígitos após o último ponto, trata como separador de milhares
      const parts = normalized.split(".");
      if (parts[parts.length - 1].length > 3) {
        normalized = normalized.replace(/\./g, "");
      }
      // Caso contrário, mantém como decimal
    }

    const n = parseFloat(normalized);
    return isNaN(n) ? 0 : n;
  };
  const parseRate = (v: string | number): number => parseMoney(v) / 100;

  const getIRRate = (days: number) =>
    days <= 180 ? 0.225 : days <= 360 ? 0.2 : days <= 720 ? 0.175 : 0.15;

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const valorParc = parseMoney(valorParcela);
    if (valorParc <= 0) {
      newErrors.valorParcela = "Valor da parcela deve ser maior que 0";
      ok = false;
    }

    const numParcelas = parseInt(numeroParcelasRestantes, 10);
    if (!numeroParcelasRestantes || isNaN(numParcelas) || numParcelas <= 1) {
      newErrors.numeroParcelasRestantes =
        "Número de parcelas deve ser maior que 1 para aplicar desconto";
      ok = false;
    }

    if (parseRate(taxaJurosAntecipacao) <= 0) {
      newErrors.taxaJurosAntecipacao = "Taxa de juros deve ser maior que 0";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation();
    try {
      const valorParc = parseMoney(valorParcela);
      const numParcelas = parseInt(numeroParcelasRestantes, 10);
      const taxaJurosAnual = parseRate(taxaJurosAntecipacao);

      // Cálculos da Antecipação - Baseado na fórmula do Nubank
      const valorTotalSemAntecipacao = valorParc * numParcelas;

      // Taxa mensal efetiva do contrato
      const taxaMensal = taxaJurosAnual / 12;

      // Calcular o valor antecipado baseado na tabela PRICE (usado pelo Nubank)
      // Fórmula: VP = PMT * [(1 - (1 + i)^-n) / i]
      const fatorDesconto = (1 - Math.pow(1 + taxaMensal, -numParcelas)) / taxaMensal;
      const valorPresenteTotal = valorParc * fatorDesconto;

      const descontoAntecipacao = valorTotalSemAntecipacao - valorPresenteTotal;
      const economiaAntecipacao = descontoAntecipacao;

      const tabelaMensal: MesAntecipacao[] = [];

      // Simular antecipação com diferentes números de parcelas restantes (de 2 até total)
      for (
        let parcelasRestantesNoMes = 2;
        parcelasRestantesNoMes <= numParcelas;
        parcelasRestantesNoMes++
      ) {
        const valorTotalRestanteNoMes = valorParc * parcelasRestantesNoMes;

        // Calcular valor presente das parcelas restantes usando tabela PRICE
        const fatorDescontoRestante =
          (1 - Math.pow(1 + taxaMensal, -parcelasRestantesNoMes)) / taxaMensal;
        const valorPresenteRestanteNoMes = valorParc * fatorDescontoRestante;

        const descontoAntecipacaoNoMes = valorTotalRestanteNoMes - valorPresenteRestanteNoMes;
        const economiaAntecipacaoNoMes = descontoAntecipacaoNoMes;

        tabelaMensal.push({
          mes: numParcelas - parcelasRestantesNoMes + 2, // Mês em que seria feita a antecipação
          parcelasRestantesNoMes: parcelasRestantesNoMes,
          valorTotalRestante: valorTotalRestanteNoMes,
          descontoAntecipacaoNoMes: descontoAntecipacaoNoMes,
          economiaAntecipacaoNoMes: economiaAntecipacaoNoMes,
        });
      }

      const res: AntecipacaoResult = {
        valorAntecipacao: valorTotalSemAntecipacao,
        descontoAntecipacao: descontoAntecipacao,
        valorPagoPelaAntecipacao: valorPresenteTotal,
        economiaAntecipacao: economiaAntecipacao,

        parcelasRestantes: numParcelas,
        taxaJurosAntecipacao: taxaJurosAnual * 100,

        tabelaMensal: tabelaMensal,
      };

      setResult(res);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation(true);
    } catch {
      setErrors({ valorParcela: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setValorParcela("");
    setNumeroParcelasRestantes("");
    setTaxaJurosAntecipacao("10,58");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora Adiantamento Parcelas Nubank - Antecipação 2025",
    description:
      "Ferramenta gratuita para calcular descontos da antecipação de parcelas Nubank. Calcule custos, juros e descubra quanto pode economizar.",
    url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    isAccessibleForFree: true,
    inLanguage: "pt-BR",
    dateModified: "2025-09-01",
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
      "@id":
        "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
      name: "Calculadora Antecipação Nubank 2025 - Descontos",
      description:
        "Calcule os descontos da antecipação de parcelas do Nubank. Descubra quanto pode economizar antecipando suas parcelas em 2025.",
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
            name: "Antecipação Nubank",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/antecipacao-parcelas-nubank",
          },
        ],
      },
    },
    about: {
      "@type": "FinancialProduct",
      name: "Antecipação de Parcelas Nubank",
      description: "Serviço de quitação antecipada de empréstimos pessoais do Nubank",
      category: "Personal Loan",
    },
    featureList: [
      "Cálculo de descontos por antecipação",
      "Cálculo de juros de antecipação",
      "Tabela de descontos por parcelas",
      "Análise de economia potencial",
      "Recomendação personalizada",
      "Interface móvel responsiva",
      "Resultados em tempo real",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como funciona a antecipação de parcelas no Nubank?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O Nubank calcula um desconto sobre o valor total das parcelas restantes, considerando a taxa de juros do contrato original. Você paga menos do que a soma das parcelas restantes.",
        },
      },
      {
        "@type": "Question",
        name: "Qual é a taxa de desconto da antecipação?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A taxa varia conforme seu contrato, mas geralmente fica em torno de 10% a 12% ao ano. O desconto é calculado com base no valor presente das parcelas futuras.",
        },
      },
      {
        "@type": "Question",
        name: "Quando vale a pena antecipar parcelas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vale a pena antecipar quando você tem recursos disponíveis e quer se livrar da dívida. A antecipação sempre gera economia e melhora sua situação financeira.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Adiantamento Parcelas Nubank</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora Adiantamento Parcelas Nubank 2025 – Antecipação e Economia
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          <strong className="text-growth-green">
            Calculadora gratuita de adiantamento de parcelas Nubank
          </strong>{" "}
          para simular antecipação. Descubra quanto pode economizar com{" "}
          <strong>adiantamento Nubank</strong> e qual o melhor momento para quitar suas parcelas.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            💰 <strong>Simulador Completo</strong> • 📊 <strong>Cálculos em Tempo Real</strong> • ⚙️{" "}
            <strong>Análise Detalhada</strong>
          </p>
        </div>
      </header>

      {/* Seção informativa sobre adiantamento Nubank */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
        <CardContent>
          <div className="py-4">
            <h2 className="mb-3 text-xl font-bold text-primary-blue-dark">
              Como funciona o Adiantamento de Parcelas Nubank?
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              O <strong>adiantamento Nubank</strong> permite antecipar o pagamento das suas parcelas
              restantes com desconto. Nossa <strong>calculadora de adiantamento</strong> simula
              exatamente quanto você economizará ao fazer a
              <strong> antecipação das parcelas Nubank</strong>, mostrando o valor do desconto por
              número de parcelas.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🧮 Simulador de Adiantamento Nubank</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <MoneyInput
                label="Valor da Parcela"
                value={valorParcela}
                onChange={setValorParcela}
                placeholder="250,00"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.valorParcela} />
            </div>
            <div>
              <Input
                type="number"
                label="Parcelas Restantes"
                value={numeroParcelasRestantes}
                onChange={(e) => setNumeroParcelasRestantes(e.target.value)}
                placeholder="12"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.numeroParcelasRestantes} />
            </div>
          </div>

          <div className="mb-6">
            <div>
              <RateInput
                label="Taxa de Juros Antecipação (a.a.)"
                value={taxaJurosAntecipacao}
                onChange={setTaxaJurosAntecipacao}
                placeholder="10,58"
                fullWidth
                className="h-12 text-lg"
              />
              <ErrorMessage error={errors.taxaJurosAntecipacao} />
            </div>
          </div>

          <div className="flex justify-center space-x-4">
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

      {result && (
        <Card className="border-2 border-growth-green bg-growth-green-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-growth-green">
              📊 Resultado da Antecipação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={resultRef}>
            <div className="mb-6 text-center">
              <div className="text-2xl font-bold text-growth-green">
                🚀 VOCÊ ECONOMIZA {currencyBR(result.economiaAntecipacao)}!
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                Desconto de{" "}
                <strong>
                  {percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}%
                </strong>{" "}
                sobre o valor total
              </div>
            </div>

            {/* Resultado da Antecipação */}
            <div className="mb-6">
              <div className="rounded-lg border border-system-warning/20 bg-gray-900 p-6">
                <h4 className="mb-4 text-xl font-bold text-system-warning">
                  💰 Resultado da Antecipação
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-text-primary">
                      {currencyBR(result.valorAntecipacao)}
                    </div>
                    <div className="text-sm text-text-secondary">Valor Total das Parcelas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-system-warning">
                      {currencyBR(result.valorPagoPelaAntecipacao)}
                    </div>
                    <div className="text-sm text-text-secondary">Valor para Quitar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-growth-green">
                      {currencyBR(result.economiaAntecipacao)}
                    </div>
                    <div className="text-sm text-text-secondary">Economia Total</div>
                    <div className="mt-1 text-xs text-growth-green">
                      ({percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}% de
                      desconto)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue-dark">Resumo da Análise</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  Parcelas restantes: <strong>{result.parcelasRestantes}</strong>
                </li>
                <li>
                  Taxa de desconto antecipação:{" "}
                  <strong>{percentBR(result.taxaJurosAntecipacao)}% a.a.</strong>
                </li>
                <li>
                  Desconto percentual total:{" "}
                  <strong>
                    {percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}%
                  </strong>
                </li>
              </ul>
            </div>

            {/* Análise de Antecipação - Responsiva */}
            <div className="mt-6">
              <h4 className="mb-4 text-xl font-bold text-text-primary">
                📊 Análise de Antecipação por Parcelas
              </h4>

              {/* Versão Mobile - Cards */}
              <div className="block space-y-3 lg:hidden">
                {/* Card principal - Antecipação Total */}
                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-system-warning">
                      {result.parcelasRestantes} Parcelas
                    </span>
                    <span className="rounded bg-system-warning/20 px-2 py-1 text-xs font-medium text-system-warning">
                      TOTAL
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="mb-1 text-text-secondary">Valor das Parcelas</div>
                      <div className="font-semibold">{currencyBR(result.valorAntecipacao)}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-text-secondary">Valor a Pagar</div>
                      <div className="font-semibold text-system-warning">
                        {currencyBR(result.valorPagoPelaAntecipacao)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-system-warning/20 pt-3 text-center">
                    <div className="mb-1 text-sm text-text-secondary">Desconto Total</div>
                    <div className="text-lg font-bold text-growth-green">
                      {currencyBR(result.economiaAntecipacao)}
                    </div>
                    <div className="text-xs text-growth-green">
                      ({percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}% de
                      desconto)
                    </div>
                  </div>
                </div>

                {/* Cards das simulações mensais */}
                {result.tabelaMensal
                  .sort((a, b) => b.parcelasRestantesNoMes - a.parcelasRestantesNoMes)
                  .map((mes) => (
                    <div
                      key={mes.mes}
                      className="rounded-lg border border-neutral-surface-variant bg-gray-800/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-bold text-text-primary">
                          {mes.parcelasRestantesNoMes} Parcelas
                        </span>
                        <span className="rounded bg-gray-700 px-2 py-1 text-xs text-text-secondary">
                          Mês {mes.mes}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="mb-1 text-text-secondary">Valor das Parcelas</div>
                          <div className="font-semibold">{currencyBR(mes.valorTotalRestante)}</div>
                        </div>
                        <div>
                          <div className="mb-1 text-text-secondary">Valor a Pagar</div>
                          <div className="font-semibold text-system-warning">
                            {currencyBR(mes.valorTotalRestante - mes.economiaAntecipacaoNoMes)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 border-t border-gray-700 pt-3 text-center">
                        <div className="mb-1 text-sm text-text-secondary">Desconto</div>
                        <div className="font-bold text-growth-green">
                          {currencyBR(mes.economiaAntecipacaoNoMes)}
                        </div>
                        <div className="text-xs text-growth-green">
                          (
                          {percentBR((mes.economiaAntecipacaoNoMes / mes.valorTotalRestante) * 100)}
                          % de desconto)
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Versão Desktop - Tabela */}
              <div className="hidden overflow-x-auto rounded-lg border border-neutral-surface-variant lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-surface-variant bg-gray-800">
                      <th className="p-4 text-center font-semibold text-text-primary">
                        Parcelas a Antecipar
                      </th>
                      <th className="p-4 text-right font-semibold text-text-primary">
                        Valor das Parcelas
                      </th>
                      <th className="p-4 text-right font-semibold text-system-warning">
                        Valor a Pagar
                      </th>
                      <th className="p-4 text-right font-semibold text-growth-green">Desconto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Primeira linha: antecipação total */}
                    <tr className="border-b border-neutral-surface-variant bg-system-warning/10">
                      <td className="p-4 text-center text-lg font-bold text-system-warning">
                        {result.parcelasRestantes}
                      </td>
                      <td className="p-4 text-right text-lg font-semibold">
                        {currencyBR(result.valorAntecipacao)}
                      </td>
                      <td className="p-4 text-right text-lg font-bold text-system-warning">
                        {currencyBR(result.valorPagoPelaAntecipacao)}
                      </td>
                      <td className="p-4 text-right text-growth-green">
                        <div className="text-lg font-bold">
                          {currencyBR(result.economiaAntecipacao)}
                        </div>
                        <div className="text-sm opacity-80">
                          ({percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}
                          %)
                        </div>
                      </td>
                    </tr>
                    {/* Demais linhas ordenadas por número decrescente de parcelas */}
                    {result.tabelaMensal
                      .sort((a, b) => b.parcelasRestantesNoMes - a.parcelasRestantesNoMes)
                      .map((mes) => (
                        <tr
                          key={mes.mes}
                          className="border-b border-neutral-surface-variant transition-colors hover:bg-gray-800/30"
                        >
                          <td className="p-4 text-center font-semibold">
                            {mes.parcelasRestantesNoMes}
                          </td>
                          <td className="p-4 text-right font-semibold">
                            {currencyBR(mes.valorTotalRestante)}
                          </td>
                          <td className="p-4 text-right font-semibold text-system-warning">
                            {currencyBR(mes.valorTotalRestante - mes.economiaAntecipacaoNoMes)}
                          </td>
                          <td className="p-4 text-right text-growth-green">
                            <div className="font-semibold">
                              {currencyBR(mes.economiaAntecipacaoNoMes)}
                            </div>
                            <div className="text-sm opacity-80">
                              (
                              {percentBR(
                                (mes.economiaAntecipacaoNoMes / mes.valorTotalRestante) * 100
                              )}
                              %)
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Explicação da Tabela */}
              <div className="mt-4 rounded-lg bg-gray-800 p-4">
                <h5 className="mb-2 font-semibold text-text-primary">
                  💡 Como Interpretar a Tabela
                </h5>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong className="text-text-primary">Parcela:</strong> Número de parcelas
                    restantes a antecipar
                  </li>
                  <li>
                    • <strong className="text-text-secondary">Valor:</strong> Valor total das
                    parcelas restantes
                  </li>
                  <li>
                    • <strong className="text-system-warning">Adiantamento:</strong> Valor que você
                    pagaria antecipando
                  </li>
                  <li>
                    • <strong className="text-growth-green">Desconto:</strong> Valor em reais e
                    percentual de desconto obtido
                  </li>
                </ul>
              </div>

              {/* Recomendação */}
              <div className="mt-6 rounded-lg border border-growth-green/20 bg-growth-green-soft p-6">
                <h5 className="mb-4 text-xl font-bold text-text-primary">
                  🎯 Vantagens da Antecipação
                </h5>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h6 className="mb-3 text-lg font-bold text-system-warning">
                      💰 Benefícios Financeiros
                    </h6>
                    <ul className="space-y-2 text-sm">
                      <li>
                        ✅ Economia de{" "}
                        <strong className="text-growth-green">
                          {currencyBR(result.economiaAntecipacao)}
                        </strong>
                      </li>
                      <li>
                        ✅ Desconto de{" "}
                        <strong>
                          {percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}%
                        </strong>{" "}
                        sobre o total
                      </li>
                      <li>✅ Liberdade financeira imediata</li>
                      <li>✅ Não há risco de inadimplência</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="mb-3 text-lg font-bold text-primary-blue-dark">
                      🛡️ Vantagens Estratégicas
                    </h6>
                    <ul className="space-y-2 text-sm">
                      <li>✅ Eliminação total da dívida</li>
                      <li>✅ Melhora do score de crédito</li>
                      <li>✅ Mais dinheiro disponível mensalmente</li>
                      <li>✅ Tranquilidade psicológica</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funciona a Antecipação Nubank
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                💳 Antecipação de Parcelas
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  O Nubank oferece desconto para quitar antecipadamente as parcelas restantes do seu
                  empréstimo pessoal. O valor do desconto varia conforme a taxa de juros original e
                  o número de parcelas restantes.
                </p>
                <h4 className="font-semibold text-growth-green">Como funciona o cálculo:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Aplicação de desconto usando taxa de juros do contrato</li>
                  <li>• Cálculo do valor presente das parcelas futuras</li>
                  <li>• Economia imediata com a quitação antecipada</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Antecipação Nubank"
        items={[
          {
            question: "Como funciona a antecipação de parcelas no Nubank?",
            answer:
              "O Nubank calcula um desconto sobre o valor total das parcelas restantes, considerando a taxa de juros do contrato original. Você paga menos do que a soma das parcelas restantes.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual é a taxa de desconto da antecipação?",
            answer:
              "A taxa varia conforme seu contrato, mas geralmente fica em torno de 10% a 12% ao ano. O desconto é calculado com base no valor presente das parcelas futuras.",
            borderColor: "growth-green",
          },
          {
            question: "Quando vale a pena antecipar parcelas?",
            answer:
              "Vale a pena antecipar quando você tem recursos disponíveis e quer se livrar da dívida. A antecipação sempre gera economia e melhora sua situação financeira.",
            borderColor: "system-warning",
          },
          {
            question: "Posso antecipar apenas algumas parcelas?",
            answer:
              "Sim, o Nubank permite antecipação parcial. Você pode escolher antecipar todas ou apenas algumas parcelas restantes, sempre com desconto proporcional.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante",
          content:
            "<strong>Planeje-se:</strong> Antes de antecipar, certifique-se de que não ficará sem reserva de emergência. A antecipação é irreversível.",
        }}
        footerText="<strong>Lembre-se:</strong> Esta calculadora usa estimativas. Para valores exatos, consulte sempre o app do Nubank."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora de antecipação Nubank</strong>{" "}
              calcula{" "}
              <strong className="text-growth-green">
                os descontos obtidos com a quitação antecipada
              </strong>{" "}
              das suas parcelas.
            </p>
            <p>
              <strong>Como funciona:</strong> Calcula o desconto da antecipação usando a fórmula de
              valor presente das parcelas futuras, mostrando exatamente quanto você economizará.
            </p>
            <p>
              <strong className="text-system-warning">Limitações da Simulação:</strong> Esta
              calculadora utiliza a metodologia PRICE padrão para os cálculos, porém pequenas
              variações podem ocorrer devido ao dia específico da contratação da antecipação e às
              diferenças nos dias de cada mês durante o período de parcelamento. Como não temos
              acesso a esses dados específicos do Nubank, recomendamos consultar o app para valores
              exatos.
            </p>
            <p>
              <strong className="text-primary-blue-dark">Recomendação:</strong> Use esta ferramenta
              para análises preliminares e planejamento. Para decisões finais, confirme sempre os
              valores no aplicativo oficial do Nubank.
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="financas" currentCalculatorId="antecipacao-parcelas-nubank" />
      </div>
    </>
  );
}
