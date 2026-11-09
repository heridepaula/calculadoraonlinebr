import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { APP_NAME, APP_URL } from "~/lib/constants";
import { CALCULATOR_SEO_DATA } from "~/lib/calculator-seo";
import { buildCalculatorMeta } from "~/lib/page-meta";
import { generateFAQStructuredData } from "~/lib/structured-data";
import { marketIndicatorsLoader } from "~/services/market/loader.server";

const SEO = CALCULATOR_SEO_DATA["antecipacao-parcelas-nubank"];
const PAGE_URL = SEO.canonicalUrl;

/** Taxa de referência usada só como valor inicial do campo; o app mostra a taxa do dia. */
const DEFAULT_RATE = "10,58";
/** IR de um CDB resgatado em até 180 dias, para comparar com antecipações de curto prazo. */
const SHORT_TERM_IR = 0.225;

const FAQ_ITEMS = [
  {
    question: "Como antecipar parcelas no Nubank?",
    answer:
      'No app, abra o cartão de crédito, toque na compra parcelada e escolha "Antecipar parcelas". O app mostra o desconto para cada quantidade de parcelas antes de você confirmar. O valor é cobrado na fatura atual e a operação não pode ser desfeita.',
  },
  {
    question: "Como o Nubank calcula o desconto da antecipação?",
    answer:
      "O Nubank não divulga a fórmula. Segundo a empresa, o desconto é proporcional aos juros e usa uma taxa que varia com os juros da economia e outros fatores do dia. Esta calculadora estima o desconto trazendo cada parcela a valor presente pela taxa informada; o valor exato é o que aparece no app.",
  },
  {
    question: "Quanto mais parcelas eu antecipo, maior o desconto?",
    answer:
      "Sim. As últimas parcelas estão mais longe no tempo e recebem mais desconto. Antecipar só a próxima parcela quase não gera economia; antecipar as últimas gera o maior desconto por real pago.",
  },
  {
    question: "Vale a pena antecipar parcelas?",
    answer:
      "Compare a taxa de desconto com o que o dinheiro renderia aplicado. Se o desconto anual for maior que o rendimento líquido de um investimento seguro, como um CDB de 100% do CDI, antecipar compensa. Se for menor, deixar o dinheiro rendendo e pagar as parcelas no prazo sai melhor. Nunca use a reserva de emergência para antecipar.",
  },
  {
    question: "Posso antecipar só algumas parcelas?",
    answer:
      "Sim. O app permite escolher quantas parcelas antecipar, de uma até todas as restantes, com desconto proporcional a cada uma.",
  },
  {
    question: "Antecipar parcelas aumenta o limite do cartão?",
    answer:
      "Sim. O limite usado pela compra parcelada é liberado à medida que as parcelas são pagas, e a antecipação devolve ao limite o valor das parcelas quitadas.",
  },
];

export const loader = () => marketIndicatorsLoader();

export const meta: MetaFunction = () => [
  ...buildCalculatorMeta("antecipacao-parcelas-nubank"),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Antecipação de Parcelas Nubank",
      url: PAGE_URL,
      description: SEO.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      publisher: { "@type": "Organization", name: APP_NAME, url: APP_URL },
    },
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${APP_URL}/` },
        { "@type": "ListItem", position: 2, name: "Calculadoras", item: `${APP_URL}/calculadoras` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Finanças",
          item: `${APP_URL}/calculadoras/financas`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Antecipação de Parcelas Nubank",
          item: PAGE_URL,
        },
      ],
    },
  },
  { "script:ld+json": generateFAQStructuredData(FAQ_ITEMS) },
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const pct2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Desconto ao antecipar `n` parcelas de `pmt` com taxa anual `annualRate` (mesma conta da calculadora). */
function anticipationDiscount(pmt: number, n: number, annualRate: number): number {
  const i = annualRate / 12;
  return pmt * n - pmt * ((1 - Math.pow(1 + i, -n)) / i);
}

const EXAMPLE_ROWS = [3, 6, 12].map((n) => ({
  n,
  discount: anticipationDiscount(100, n, 0.1058),
}));

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
  const { indicators } = useLoaderData<typeof loader>();
  const cdi = indicators.CDI.rate;
  const cdiNet = cdi * (1 - SHORT_TERM_IR);
  const [taxaJurosAntecipacao, setTaxaJurosAntecipacao] = useState(DEFAULT_RATE);
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
    setTaxaJurosAntecipacao(DEFAULT_RATE);
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
          <BreadcrumbItem isLast>Adiantamento Parcelas Nubank</BreadcrumbItem>
        </Breadcrumb>

        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            Calculadora Adiantamento Parcelas Nubank 2026 – Antecipação e Economia
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
              💰 <strong>Simulador Completo</strong> • 📊 <strong>Cálculos em Tempo Real</strong> •
              ⚙️ <strong>Análise Detalhada</strong>
            </p>
          </div>
        </header>

        {/* Resposta direta */}
        <section
          aria-labelledby="resposta-direta"
          className="rounded-lg border-l-4 border-primary-blue bg-background-dark-secondary p-5"
        >
          <h2 id="resposta-direta" className="mb-2 text-lg font-semibold text-text-primary">
            Como funciona a antecipação de parcelas do Nubank
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary">
            Ao antecipar parcelas de uma compra no cartão Nubank, você paga hoje as parcelas futuras
            com <strong className="text-text-primary">desconto</strong>, que é maior quanto mais
            distante estiver a parcela. O desconto equivale a trazer cada parcela a{" "}
            <strong className="text-text-primary">valor presente</strong> por uma taxa de juros:
            parcela ÷ (1 + taxa mensal)<sup>meses até o vencimento</sup>. Informe o valor da
            parcela, quantas faltam e a taxa para estimar a economia; o valor exato aparece no app
            antes de confirmar.
          </p>
        </section>

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
                  placeholder={DEFAULT_RATE}
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.taxaJurosAntecipacao} />
                <p className="mt-1 text-xs text-text-secondary">
                  {DEFAULT_RATE}% é só uma referência: a taxa muda com os juros da economia
                </p>
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
                          ({percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}
                          % de desconto)
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
                          ({percentBR((result.economiaAntecipacao / result.valorAntecipacao) * 100)}
                          % de desconto)
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
                              <div className="font-semibold">
                                {currencyBR(mes.valorTotalRestante)}
                              </div>
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
                              {percentBR(
                                (mes.economiaAntecipacaoNoMes / mes.valorTotalRestante) * 100
                              )}
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
                          <th className="p-4 text-right font-semibold text-growth-green">
                            Desconto
                          </th>
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
                              (
                              {percentBR(
                                (result.economiaAntecipacao / result.valorAntecipacao) * 100
                              )}
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
                        • <strong className="text-system-warning">Adiantamento:</strong> Valor que
                        você pagaria antecipando
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
                              {percentBR(
                                (result.economiaAntecipacao / result.valorAntecipacao) * 100
                              )}
                              %
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
                <h3 className="mb-4 text-xl font-bold text-primary-blue-dark">
                  📱 Como antecipar no app
                </h3>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-text-secondary">
                  <li>Abra o app do Nubank e entre na área do cartão de crédito.</li>
                  <li>Toque na compra parcelada que você quer antecipar.</li>
                  <li>Escolha &ldquo;Antecipar parcelas&rdquo; e veja o desconto de cada opção.</li>
                  <li>
                    Selecione quantas parcelas quer antecipar e confirme. O valor entra na fatura
                    atual e a operação não pode ser desfeita.
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-growth-green">
                  📊 Quanto se economiza: exemplo com parcelas de R$ 100
                </h3>
                <p className="mb-4 text-sm text-text-secondary">
                  Com taxa de {DEFAULT_RATE}% ao ano, o desconto cresce com o número de parcelas
                  antecipadas, porque as últimas estão mais longe no tempo:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant text-left text-text-secondary">
                        <th className="py-2 pr-2 font-medium">Parcelas antecipadas</th>
                        <th className="py-2 pr-2 text-right font-medium">Soma das parcelas</th>
                        <th className="py-2 pr-2 text-right font-medium">Desconto</th>
                        <th className="py-2 text-right font-medium">Você paga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXAMPLE_ROWS.map(({ n, discount }) => (
                        <tr key={n} className="border-b border-neutral-surface-variant/50">
                          <td className="py-2 pr-2">{n} parcelas</td>
                          <td className="py-2 pr-2 text-right">{brl.format(n * 100)}</td>
                          <td className="py-2 pr-2 text-right text-growth-green">
                            {brl.format(discount)}
                          </td>
                          <td className="py-2 text-right font-semibold text-text-primary">
                            {brl.format(n * 100 - discount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-system-warning">
                  ⚖️ Antecipar ou deixar o dinheiro rendendo?
                </h3>
                <p className="mb-3 text-sm text-text-secondary">
                  Antecipar só compensa se a taxa de desconto for maior que o que o dinheiro
                  renderia aplicado. Hoje o CDI está em{" "}
                  <strong className="text-text-primary">{pct2.format(cdi)}% ao ano</strong>, e um
                  CDB de 100% do CDI resgatado em até 6 meses rende cerca de{" "}
                  <strong className="text-text-primary">{pct2.format(cdiNet)}% ao ano</strong>{" "}
                  depois do Imposto de Renda de 22,5%.
                </p>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • <strong className="text-growth-green">Taxa de desconto maior</strong> que{" "}
                    {pct2.format(cdiNet)}%: antecipar economiza mais do que investir.
                  </li>
                  <li>
                    • <strong className="text-system-warning">Taxa de desconto menor</strong>: vale
                    mais deixar o dinheiro em um investimento com liquidez diária e pagar as
                    parcelas no prazo.
                  </li>
                  <li>
                    • Em qualquer caso, não use a reserva de emergência. Compare investimentos na{" "}
                    <Link
                      to="/calculadoras/financas/cdb"
                      className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
                    >
                      calculadora de CDB
                    </Link>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Antecipação Nubank"
          items={FAQ_ITEMS.map((item, index) => ({
            ...item,
            borderColor: (
              [
                "primary-blue",
                "growth-green",
                "system-info",
                "system-warning",
                "growth-green",
                "primary-blue",
              ] as const
            )[index],
          }))}
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
                <strong className="text-primary-blue-dark">
                  calculadora de antecipação Nubank
                </strong>{" "}
                calcula{" "}
                <strong className="text-growth-green">
                  os descontos obtidos com a quitação antecipada
                </strong>{" "}
                das suas parcelas.
              </p>
              <p>
                <strong>Como funciona:</strong> Calcula o desconto da antecipação usando a fórmula
                de valor presente das parcelas futuras, mostrando exatamente quanto você
                economizará.
              </p>
              <p>
                <strong className="text-system-warning">Limitações da Simulação:</strong> Esta
                calculadora utiliza a metodologia PRICE padrão para os cálculos, porém pequenas
                variações podem ocorrer devido ao dia específico da contratação da antecipação e às
                diferenças nos dias de cada mês durante o período de parcelamento. Como não temos
                acesso a esses dados específicos do Nubank, recomendamos consultar o app para
                valores exatos.
              </p>
              <p>
                <strong className="text-primary-blue-dark">Recomendação:</strong> Use esta
                ferramenta para análises preliminares e planejamento. Para decisões finais, confirme
                sempre os valores no aplicativo oficial do Nubank.
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="financas" currentCalculatorId="antecipacao-parcelas-nubank" />
      </div>
    </>
  );
}
