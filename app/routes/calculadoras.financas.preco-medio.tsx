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
      title: "Calculadora de Preço Médio de Ações 2025 | CalculadoraOnlineBR",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
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
        "✅ Calcule o preço médio ponderado de ações grátis. Adicione compras e vendas, veja lucro/prejuízo em tempo real. Ferramenta completa para investidores.",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "keywords",
      content:
        "preço médio ações, calculadora ações, preço médio ponderado, investimentos, bovespa",
    },
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
    },
    { httpEquiv: "content-language", content: "pt-BR" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "referrer", content: "strict-origin-when-cross-origin" },
    {
      property: "og:title",
      content: "Calculadora de Preço Médio de Ações 2025 - Grátis",
    },
    {
      property: "og:description",
      content:
        "✅ Calcule o preço médio ponderado de ações grátis. Adicione compras e vendas, veja lucro/prejuízo em tempo real. Ferramenta completa para investidores brasileiros.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-preco-medio-acoes.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Interface da calculadora de preço médio de ações mostrando campos de entrada e resultados com lucro/prejuízo em tempo real",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Preço Médio de Ações 2025 | CalculadoraOnlineBR",
    },
    {
      name: "twitter:description",
      content:
        "Calcule o preço médio de ações facilmente. Adicione compras e vendas, visualize evolução do preço médio e quantidade total. Ferramenta gratuita para investidores.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-preco-medio-acoes.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Preço Médio - Calcule preço médio de ações",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "application-name", content: "CalculadoraOnlineBR" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Preço Médio de Ações - Simulador 2025",
        description:
          "Calculadora gratuita e confiável de preço médio de ações. Adicione compras e vendas, visualize evolução do preço médio ponderado e quantidade total de cotas.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        datePublished: "2024-01-15",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
          name: "Calculadora de Preço Médio de Ações 2025 - Simulador Completo",
          description:
            "Calcule preço médio ponderado de ações com compras e vendas. Visualize gráficos interativos, tabela detalhada de operações e acompanhe a evolução da sua carteira de investimentos.",
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
                name: "Calculadora de Preço Médio",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/financas/preco-medio",
              },
            ],
          },
        },
        about: {
          "@type": "MathematicalConcept",
          name: "Preço Médio de Ações",
          description:
            "Método de cálculo do preço médio ponderado de ações considerando diferentes operações de compra e venda",
          category: "Financial Mathematics",
        },
        featureList: [
          "Cálculo de preço médio ponderado de ações",
          "Adição de múltiplas operações de compra e venda",
          "Tabela detalhada de todas as operações",
          "Evolução visual do preço médio e quantidade",
          "Cálculo automático de ganhos e perdas",
          "Histórico completo de transações",
          "Interface móvel responsiva otimizada",
          "Resultados confiáveis em tempo real",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "2847",
        },
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é preço médio ponderado de ações?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O preço médio ponderado é calculado dividindo o valor total investido pela quantidade total de ações. Cada compra influencia o preço médio proporcionalmente ao valor investido, oferecendo uma visão clara do seu custo de entrada.",
            },
          },
          {
            "@type": "Question",
            name: "Como as vendas afetam o preço médio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "As vendas reduzem a quantidade total de ações, mas mantêm o preço médio ponderado das ações restantes. O preço médio só muda com novas compras, não com vendas.",
            },
          },
          {
            "@type": "Question",
            name: "Por que é importante acompanhar o preço médio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O preço médio ajuda a tomar decisões de compra e venda mais informadas. Saber seu custo médio permite avaliar quando comprar mais, quando vender e qual o seu ponto de equilíbrio.",
            },
          },
          {
            "@type": "Question",
            name: "Como melhorar o preço médio de uma ação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para melhorar (diminuir) o preço médio, compre mais ações quando o preço estiver abaixo do seu preço médio atual. Use estratégias como Dollar Cost Average ou compras escalonadas em quedas.",
            },
          },
        ],
      }),
    },
  ];
};

type TransactionType = "buy" | "sell";

interface Transaction {
  id: number;
  type: TransactionType;
  quantity: number;
  price: number;
  date: string;
  total: number;
}

interface AveragePrice {
  averagePrice: number;
  totalQuantity: number;
  totalInvested: number;
  transactions: Transaction[];
  currentGainLoss?: number;
  currentMarketPrice?: number;
}

interface ValidationErrors {
  quantity?: string;
  price?: string;
  marketPrice?: string;
}

export default function AveragePriceCalculator() {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [transactionType, setTransactionType] = useState<TransactionType>("buy");
  const [marketPrice, setMarketPrice] = useState(0);
  const [result, setResult] = useState<AveragePrice>({
    averagePrice: 0,
    totalQuantity: 0,
    totalInvested: 0,
    transactions: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "preco-medio",
    category: "financas",
  });
  useFormTracking("preco-medio");

  // Calcular lucro/prejuízo automaticamente quando preço de mercado mudar
  useEffect(() => {
    if (marketPrice > 0 && result.totalQuantity > 0) {
      const currentValue = result.totalQuantity * marketPrice;
      const gainLoss = currentValue - result.totalInvested;

      // Só atualizar se os valores mudaram para evitar loops
      if (result.currentGainLoss !== gainLoss || result.currentMarketPrice !== marketPrice) {
        setResult((prevResult) => ({
          ...prevResult,
          currentGainLoss: gainLoss,
          currentMarketPrice: marketPrice,
        }));
      }
    } else if (result.currentGainLoss !== undefined || result.currentMarketPrice !== undefined) {
      // Só limpar se havia valores anteriormente
      setResult((prevResult) => ({
        ...prevResult,
        currentGainLoss: undefined,
        currentMarketPrice: undefined,
      }));
    }
  }, [
    marketPrice,
    result.totalQuantity,
    result.totalInvested,
    result.currentGainLoss,
    result.currentMarketPrice,
  ]);

  const currencyBR = (v: number) => {
    if (isNaN(v) || !isFinite(v)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
  };

  const numberBR = (v: number, digits = 0) => {
    if (isNaN(v) || !isFinite(v)) return "0";
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
  };

  const parseMoney = (v: string | number): number => {
    const s = String(v ?? "");
    // Remove espaços e caracteres especiais, exceto números, vírgulas e pontos
    const cleaned = s.replace(/[^\d,.-]/g, "");

    // Se contém vírgula, trata como separador decimal brasileiro
    if (cleaned.includes(",")) {
      // Remove pontos (separadores de milhares) e substitui vírgula por ponto
      const normalized = cleaned.replace(/\./g, "").replace(",", ".");
      const n = parseFloat(normalized);
      return isNaN(n) ? 0 : n;
    }

    // Se não contém vírgula, trata como formato americano ou número simples
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const qty = parseMoney(quantity);
    if (qty <= 0) {
      newErrors.quantity = "Quantidade deve ser maior que 0";
      ok = false;
    }

    if (price <= 0) {
      newErrors.price = "Preço deve ser maior que 0";
      ok = false;
    }

    // Validar se é venda e não há ações suficientes
    if (transactionType === "sell" && qty > result.totalQuantity) {
      newErrors.quantity = "Não há ações suficientes para venda";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const addTransaction = () => {
    if (!validateInputs()) return;
    startCalculation("adicionar_operacao");

    try {
      const qty = parseMoney(quantity);
      const priceValue = price; // price já é number agora
      const total = qty * priceValue;

      const newTransaction: Transaction = {
        id: Date.now(),
        type: transactionType,
        quantity: qty,
        price: priceValue,
        date: new Date().toLocaleDateString("pt-BR"),
        total,
      };

      let newResult = { ...result };

      if (transactionType === "buy") {
        // Compra: calcular novo preço médio ponderado
        const newTotalInvested = newResult.totalInvested + total;
        const newTotalQuantity = newResult.totalQuantity + qty;
        const newAveragePrice = newTotalInvested / newTotalQuantity;

        newResult = {
          ...newResult,
          averagePrice: newAveragePrice,
          totalQuantity: newTotalQuantity,
          totalInvested: newTotalInvested,
          transactions: [...newResult.transactions, newTransaction],
        };
      } else {
        // Venda: diminuir quantidade, manter preço médio
        const newTotalQuantity = newResult.totalQuantity - qty;
        const newTotalInvested = newTotalQuantity * newResult.averagePrice;

        newResult = {
          ...newResult,
          totalQuantity: newTotalQuantity,
          totalInvested: newTotalInvested,
          transactions: [...newResult.transactions, newTransaction],
        };
      }

      setResult(newResult);
      setErrors({});

      // Limpar campos após adicionar
      setQuantity("");
      setPrice(0);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation("adicionar_operacao", { success: true });
    } catch {
      setErrors({ quantity: "Erro no cálculo. Verifique os valores inseridos." });
      endCalculation("adicionar_operacao", { success: false });
    }
  };

  const handleReset = () => {
    setQuantity("");
    setPrice(0);
    setMarketPrice(0);
    setTransactionType("buy");
    setResult({
      averagePrice: 0,
      totalQuantity: 0,
      totalInvested: 0,
      transactions: [],
    });
    setErrors({});
    setCurrentPage(1);
  };

  const removeTransaction = (transactionId: number) => {
    const updatedTransactions = result.transactions.filter((t) => t.id !== transactionId);

    // Recalcular preço médio com transações restantes
    let newResult = {
      averagePrice: 0,
      totalQuantity: 0,
      totalInvested: 0,
      transactions: updatedTransactions,
    };

    // Processar transações em ordem para recalcular
    updatedTransactions.forEach((transaction) => {
      if (transaction.type === "buy") {
        const newTotalInvested = newResult.totalInvested + transaction.total;
        const newTotalQuantity = newResult.totalQuantity + transaction.quantity;
        newResult.averagePrice = newTotalInvested / newTotalQuantity;
        newResult.totalQuantity = newTotalQuantity;
        newResult.totalInvested = newTotalInvested;
      } else {
        newResult.totalQuantity -= transaction.quantity;
        newResult.totalInvested = newResult.totalQuantity * newResult.averagePrice;
      }
    });

    setResult(newResult);
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <nav aria-label="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
          <BreadcrumbItem isLast>Preço Médio</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <main>
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            Calculadora de Preço Médio de Ações 2025 – Simulador Completo
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Calcule o <strong className="text-growth-green">preço médio ponderado</strong> das suas
            ações. Adicione compras e vendas para descobrir{" "}
            <strong className="text-primary-blue-dark">seu preço médio atual</strong> e acompanhe
            seus investimentos.
          </p>
          <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              📊 <strong>Preço Ponderado</strong> • 📈 <strong>Compras e Vendas</strong> • 💰{" "}
              <strong>Acompanhamento Detalhado</strong>
            </p>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle as="h2">📋 Adicione Operações de Compra e Venda</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tipo de Operação centralizado */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <div className="inline-flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setTransactionType("buy")}
                  className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                    transactionType === "buy"
                      ? "bg-growth-green text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-growth-green/10"
                  }`}
                >
                  Compra
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType("sell")}
                  className={`min-w-[120px] flex-1 basis-0 py-3 text-center text-base font-medium transition ${
                    transactionType === "sell"
                      ? "bg-system-error text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-system-error/10"
                  }`}
                >
                  Venda
                </button>
              </div>
            </div>

            {/* Linha 1: Quantidade e Preço */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  type="text"
                  label="Quantidade de Ações"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="100"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.quantity} />
                <div className="mt-1 text-xs text-text-secondary">
                  Número de ações para {transactionType === "buy" ? "comprar" : "vender"}
                </div>
              </div>
              <div>
                <MoneyInput
                  label="Preço por Ação"
                  value={price}
                  onChange={(value) => setPrice(value)}
                  placeholder="25,50"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.price} />
                <div className="mt-1 text-xs text-text-secondary">Preço unitário de cada ação</div>
              </div>
            </div>

            {/* Preço de Mercado Atual (opcional) */}
            <div className="mb-6">
              <div>
                <MoneyInput
                  label="Preço Atual"
                  value={marketPrice}
                  onChange={(value) => setMarketPrice(value)}
                  placeholder="10,90"
                  fullWidth
                  className="h-12 text-lg"
                />
                <ErrorMessage error={errors.marketPrice} />
              </div>
            </div>

            {/* Botões */}
            <div className="margin-top-4 flex justify-center space-x-4">
              <Button onClick={addTransaction} className="px-8">
                Adicionar Operação
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
        {result && result.transactions.length > 0 && (
          <Card
            ref={resultRef as any}
            className="border-2 border-growth-green bg-growth-green-soft"
          >
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                📊 Preço Médio Calculado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-3xl font-bold text-growth-green">
                    {currencyBR(result.averagePrice)}
                  </div>
                  <div className="text-sm text-text-secondary">Preço Médio</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-2xl font-bold text-primary-blue-dark">
                    {numberBR(result.totalQuantity)}
                  </div>
                  <div className="text-sm text-text-secondary">Quantidade Total</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="text-2xl font-bold text-system-warning">
                    {currencyBR(result.totalInvested)}
                  </div>
                  <div className="text-sm text-text-secondary">Total Investido</div>
                </div>
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  {result.currentMarketPrice && result.currentGainLoss !== undefined ? (
                    <>
                      <div
                        className={`text-2xl font-bold ${
                          result.currentGainLoss >= 0 ? "text-growth-green" : "text-system-error"
                        }`}
                      >
                        {result.currentGainLoss >= 0 ? "+" : ""}
                        {currencyBR(result.currentGainLoss)}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {result.currentGainLoss >= 0 ? "Lucro" : "Prejuízo"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl font-bold text-text-secondary">--</div>
                      <div className="text-sm text-text-secondary">Insira preço atual</div>
                    </>
                  )}
                </div>
              </div>

              {/* Detalhamento se houver preço de mercado */}
              {result.currentMarketPrice && result.currentGainLoss !== undefined && (
                <div className="mb-6 rounded-lg bg-gray-900 p-4">
                  <h4 className="mb-3 font-semibold text-text-primary">📈 Análise de Desempenho</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Preço Atual</div>
                      <div className="text-lg font-bold text-text-primary">
                        {currencyBR(result.currentMarketPrice)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Valor da Carteira</div>
                      <div className="text-lg font-bold text-text-primary">
                        {currencyBR(result.totalQuantity * result.currentMarketPrice)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Variação</div>
                      <div
                        className={`text-lg font-bold ${
                          result.currentMarketPrice >= result.averagePrice
                            ? "text-growth-green"
                            : "text-system-error"
                        }`}
                      >
                        {(
                          ((result.currentMarketPrice - result.averagePrice) /
                            result.averagePrice) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">Rentabilidade</div>
                      <div
                        className={`text-lg font-bold ${
                          result.currentGainLoss >= 0 ? "text-growth-green" : "text-system-error"
                        }`}
                      >
                        {((result.currentGainLoss / result.totalInvested) * 100).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabela de transações */}
              {result.transactions.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold text-text-primary">
                    📋 Histórico de Transações
                  </h4>

                  <div className="overflow-x-auto rounded-lg bg-gray-900">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-border border-b text-text-secondary">
                          <th className="px-4 py-3 text-left">Data</th>
                          <th className="px-4 py-3 text-left">Operação</th>
                          <th className="px-4 py-3 text-right">Quantidade</th>
                          <th className="px-4 py-3 text-right">Preço</th>
                          <th className="px-4 py-3 text-right">Total</th>
                          <th className="px-4 py-3 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-border/50 border-b">
                            <td className="px-4 py-3 text-text-primary">{transaction.date}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`rounded px-2 py-1 text-xs font-medium ${
                                  transaction.type === "buy"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {transaction.type === "buy" ? "Compra" : "Venda"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-text-secondary">
                              {transaction.quantity.toLocaleString("pt-BR")}
                            </td>
                            <td className="px-4 py-3 text-right text-text-secondary">
                              {currencyBR(transaction.price)}
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-text-primary">
                              {currencyBR(transaction.total)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button
                                onClick={() => removeTransaction(transaction.id)}
                                variant="outline"
                                className="border-system-error px-2 py-1 text-xs text-system-error hover:bg-system-error hover:text-white"
                              >
                                Remover
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">📊 Resumo da Carteira</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    Preço médio por ação: <strong>{currencyBR(result.averagePrice)}</strong>
                  </li>
                  <li>
                    Quantidade total de ações:{" "}
                    <strong>{result.totalQuantity.toLocaleString("pt-BR")}</strong>
                  </li>
                  <li>
                    Total investido: <strong>{currencyBR(result.totalInvested)}</strong>
                  </li>
                  <li>
                    Total de operações: <strong>{result.transactions.length}</strong>
                  </li>
                  {result.currentMarketPrice && (
                    <>
                      <li>
                        Preço atual de mercado:{" "}
                        <strong>{currencyBR(result.currentMarketPrice)}</strong>
                      </li>
                      <li>
                        Valor atual da carteira:{" "}
                        <strong>
                          {currencyBR(result.totalQuantity * result.currentMarketPrice)}
                        </strong>
                      </li>
                      <li
                        className={
                          result.currentGainLoss && result.currentGainLoss >= 0
                            ? "text-growth-green"
                            : "text-system-error"
                        }
                      >
                        Resultado:{" "}
                        <strong>
                          {result.currentGainLoss && result.currentGainLoss >= 0 ? "+" : ""}
                          {currencyBR(result.currentGainLoss || 0)}
                        </strong>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seção: Preço Médio de Ações - Guia Completo */}
        <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
              🎯 Preço Médio de Ações – Guia Completo 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Conceito de Preço Médio */}
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                  🧮 Conceito de Preço Médio Ponderado
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">🔍 O que é?</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      O preço médio ponderado é calculado considerando o valor investido total
                      dividido pela quantidade total de ações. Cada compra influencia o preço médio
                      proporcionalmente ao valor investido.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📊 Como Funciona</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Compras aumentam quantidade e ajustam preço médio</li>
                      <li>• Vendas reduzem quantidade, mantém preço médio</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Controle detalhado do preço de entrada</li>
                      <li>• Facilita decisões de compra e venda</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-warning">
                      ⚠️ Fatores Importantes
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Considere custos de corretagem</li>
                      <li>• Acompanhe o desempenho da empresa</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Compra vs Venda */}
              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                  🔄 Como Compras e Vendas Afetam o Preço Médio
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-primary-blue-dark">
                      📊 Operações de Compra
                    </h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Cada compra adiciona valor investido e quantidade, recalculando o preço médio
                      ponderado baseado no total acumulado.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">📈 Fórmula</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Preço Médio = Total Investido ÷ Quantidade Total</li>
                      <li>• Consideração ponderada por valor</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">🚀 Operações de Venda</h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Vendas reduzem a quantidade total mas mantêm o preço médio ponderado das ações
                      restantes, permitindo controle dos ganhos e perdas.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-success">💡 Impacto</h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Mantém preço médio das ações restantes</li>
                      <li>• Realiza ganhos ou perdas na venda</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Estratégias de Investimento */}
              <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                  🎯 Estratégias para Otimizar Preço Médio
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-growth-green">
                      🚀 Dollar Cost Average (DCA)
                    </h4>
                    <p className="mb-4 text-sm text-text-secondary">
                      Investir valores fixos regularmente reduz o impacto da volatilidade e pode
                      melhorar o preço médio ao longo do tempo.
                    </p>

                    <h4 className="mb-3 font-semibold text-system-info">💰 Compras Escalonadas</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Aproveite quedas para melhorar preço médio</li>
                      <li>• Diversifique momentos de entrada</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-system-success">📈 Gestão de Risco</h4>
                    <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                      <li>• Defina limites de perda (stop loss)</li>
                      <li>• Considere realização parcial de lucros</li>
                    </ul>

                    <h4 className="mb-3 font-semibold text-system-warning">
                      ⏰ Paciência Estratégica
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Aguarde momentos favoráveis para comprar</li>
                      <li>• Foco no longo prazo é essencial</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção: Comparação de Estratégias de Compra */}
        <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-xl font-bold text-text-primary">
              ⚖️ Comparação: Estratégias de Compra de Ações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-surface-variant">
                    <th className="p-3 text-left font-semibold">Critério</th>
                    <th className="p-3 text-center font-semibold text-primary-blue-dark">
                      Compra à Vista
                    </th>
                    <th className="p-3 text-center font-semibold text-growth-green">
                      Dollar Cost Average
                    </th>
                    <th className="p-3 text-center font-semibold text-system-warning">
                      Compra Escalonada
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Simplicidade</td>
                    <td className="p-3 text-center text-primary-blue-dark">Alta (uma operação)</td>
                    <td className="p-3 text-center text-growth-green">Média (aportes regulares)</td>
                    <td className="p-3 text-center text-system-warning">Baixa (várias decisões)</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Controle de Timing</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Redução de Volatilidade</td>
                    <td className="p-3 text-center text-growth-green">Baixa</td>
                    <td className="p-3 text-center">Alta</td>
                    <td className="p-3 text-center">Média</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Capital Necessário</td>
                    <td className="p-3 text-center">Alto (valor total)</td>
                    <td className="p-3 text-center">Baixo (parcelado)</td>
                    <td className="p-3 text-center">Médio (flexível)</td>
                  </tr>
                  <tr className="border-b border-neutral-surface-variant">
                    <td className="p-3 font-medium">Indicado para</td>
                    <td className="p-3 text-center">Timing detalhado</td>
                    <td className="p-3 text-center">Investimento regular</td>
                    <td className="p-3 text-center">Análise técnica</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Gestão de Risco</td>
                    <td className="p-3 text-center text-primary-blue-dark">Concentrada</td>
                    <td className="p-3 text-center text-growth-green">Distribuída</td>
                    <td className="p-3 text-center text-system-warning">Controlada</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                <h4 className="mb-2 font-bold text-primary-blue-dark">🎯 Iniciantes</h4>
                <p className="text-sm text-text-secondary">
                  Comece com <strong>Dollar Cost Average</strong> para reduzir o impacto da
                  volatilidade e criar disciplina de investimento.
                </p>
              </div>

              <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                <h4 className="mb-2 font-bold text-growth-green">💰 Experientes</h4>
                <p className="text-sm text-text-secondary">
                  Use <strong>Compra Escalonada</strong> combinada com análise técnica para otimizar
                  pontos de entrada.
                </p>
              </div>

              <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                <h4 className="mb-2 font-bold text-system-warning">📈 Oportunistas</h4>
                <p className="text-sm text-text-secondary">
                  <strong>Compra à Vista</strong> quando identificar oportunidades claras de mercado
                  e tiver convicção na análise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Preço Médio"
          items={[
            {
              question: "O que é preço médio ponderado de ações?",
              answer:
                "O preço médio ponderado é calculado dividindo o valor total investido pela quantidade total de ações. Cada compra influencia o preço médio proporcionalmente ao valor investido, oferecendo uma visão clara do seu custo de entrada.",
              borderColor: "primary-blue",
            },
            {
              question: "Como as vendas afetam o preço médio?",
              answer:
                "As vendas reduzem a quantidade total de ações, mas mantêm o preço médio ponderado das ações restantes. O preço médio só muda com novas compras, não com vendas.",
              borderColor: "growth-green",
            },
            {
              question: "Qual a diferença entre preço médio e preço médio ponderado?",
              answer:
                "O preço médio simples é a soma dos preços dividida pelo número de operações. O preço médio ponderado considera o valor investido em cada operação, sendo mais confiável para decisões de investimento.",
              borderColor: "system-info",
            },
            {
              question: "Por que é importante acompanhar o preço médio?",
              answer:
                "O preço médio ajuda a tomar decisões de compra e venda mais informadas. Saber seu custo médio permite avaliar quando comprar mais, quando vender e qual o seu ponto de equilíbrio.",
              borderColor: "system-warning",
            },
            {
              question: "Como melhorar o preço médio de uma ação?",
              answer:
                "Para melhorar (diminuir) o preço médio, compre mais ações quando o preço estiver abaixo do seu preço médio atual. Use estratégias como Dollar Cost Average ou compras escalonadas em quedas.",
              borderColor: "growth-green",
            },
            {
              question: "Devo considerar taxas de corretagem no cálculo?",
              answer:
                "Sim, para melhor resultado, inclua taxas de corretagem e custos no valor total investido. Isso dará uma visão mais realista do seu preço médio real e impacto nos resultados.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica Importante sobre Preço Médio",
            content:
              "<strong>Para otimizar resultados:</strong> use o preço médio como ferramenta de decisão, não como meta. Foque na qualidade da empresa e em estratégias consistentes de investimento.",
          }}
          footerText="<strong>Lembre-se:</strong> O preço médio é uma ferramenta de controle, não um objetivo. Priorize análise fundamentalista e estratégia de longo prazo sobre otimização do preço médio."
        />

        {/* Footer com informações adicionais */}
        <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Como Usar Esta Calculadora de Preço Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta{" "}
                <strong className="text-primary-blue-dark">
                  calculadora de preço médio de ações
                </strong>{" "}
                utiliza <strong className="text-growth-green">cálculo ponderado por valor</strong>{" "}
                para determinar seu preço médio de entrada considerando todas as operações de compra
                e venda.
              </p>
              <p>
                <strong>Funcionalidades disponíveis:</strong> Adicione operações de compra e venda,
                acompanhe o preço médio em tempo real, insira preço atual para calcular
                ganhos/perdas, e visualize histórico completo de transações.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para
                fins educacionais e controle de carteira. Para decisões de investimento, considere
                sempre <strong>análise fundamentalista</strong> e consulte um assessor financeiro
                qualificado.
              </p>
              <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
                🧮 Cálculo ponderado • 📊 Controle de carteira • 🔒 Dados não armazenados • 📱
                Compatível com todos os dispositivos • 🌙 Interface otimizada
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="financas" currentCalculatorId="preco-medio" />
      </main>
    </div>
  );
}
