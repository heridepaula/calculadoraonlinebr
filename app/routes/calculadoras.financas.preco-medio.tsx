import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  MoneyInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { calculateAveragePrice, calculateUnrealizedGainLoss } from "~/utils/calculations";
import type {
  AveragePriceTransaction,
  AveragePriceParams,
  AveragePriceResult,
} from "~/utils/calculations";
import { getDefaultRate, getIndicatorInfo } from "~/lib/economic-data";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Preço Médio de Ações e Investimentos 2025 - Completa e Gratuita - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora de PREÇO MÉDIO GRATUITA para ações, fundos e investimentos. Calcule seu preço médio, ganhos/perdas realizados e não realizados com múltiplos métodos (FIFO, média ponderada). Ferramenta completa para controle de carteira de investimentos.",
    },
    {
      name: "keywords",
      content:
        "calculadora preço médio, preço médio ações, preço médio investimentos, FIFO, média ponderada, controle carteira, ganho perda realizada, ganho perda não realizada, custo médio ações, break even, ponto de equilíbrio, histórico transações, calculadora investimentos, bolsa valores, fundos investimento, controle patrimônio",
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
      content: `Calculadora de Preço Médio - Ações e Investimentos - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "★ Calcule o preço médio das suas ações e investimentos! Controle ganhos/perdas, histórico de transações e análise completa da sua carteira. Ferramenta gratuita e profissional.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadorasonline.com.br/calculadoras/financas/preco-medio",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: `Calculadora de Preço Médio - ${APP_NAME}` },
    {
      name: "twitter:description",
      content:
        "Controle o preço médio das suas ações e investimentos com nossa calculadora gratuita e profissional!",
    },

    // Additional SEO tags
    { name: "application-name", content: APP_NAME },
    { name: "msapplication-TileColor", content: "#22c55e" },
    { name: "theme-color", content: "#22c55e" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function AveragePriceCalculator() {
  const [transactions, setTransactions] = useState<AveragePriceTransaction[]>([]);
  const [method, setMethod] = useState<"fifo" | "weighted_average" | "simple_average">(
    "weighted_average"
  );
  const [includeFees, setIncludeFees] = useState(true);
  const [currentMarketPrice, setCurrentMarketPrice] = useState("");
  const [result, setResult] = useState<AveragePriceResult | null>(null);

  // Form states for new transaction
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    quantity: "",
    price: "",
    type: "buy" as "buy" | "sell",
    fees: "",
  });

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "preco_medio",
    category: "financas"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("preco_medio");

  const addTransaction = () => {
    const quantity = parseFloat(newTransaction.quantity);
    const price = parseFloat(newTransaction.price);
    const fees = parseFloat(newTransaction.fees) || 0;

    if (quantity > 0 && price > 0) {
      const transaction: AveragePriceTransaction = {
        id: Date.now().toString(),
        date: new Date(newTransaction.date),
        quantity,
        price,
        type: newTransaction.type,
        fees,
      };

      setTransactions([...transactions, transaction]);
      setNewTransaction({
        date: new Date().toISOString().split("T")[0],
        quantity: "",
        price: "",
        type: "buy",
        fees: "",
      });
    }
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const clearAllTransactions = () => {
    setTransactions([]);
    setResult(null);
  };

  const calculate = () => {
    if (transactions.length > 0) {
      const params: AveragePriceParams = {
        transactions,
        method,
        includeFees,
      };

      let calculatedResult = calculateAveragePrice(params);

      const marketPrice = parseFloat(currentMarketPrice);
      if (marketPrice > 0) {
        calculatedResult = calculateUnrealizedGainLoss(calculatedResult, marketPrice);
      }

      setResult(calculatedResult);
    }
  };

  useEffect(() => {
    if (transactions.length > 0) {
      calculate();
    }
  }, [transactions, method, includeFees, currentMarketPrice]);

  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    } catch (error) {
      // Fallback para ambientes que não suportam Intl
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    }
  };

  const formatDate = (date: Date) => {
    try {
      return new Intl.DateFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch (error) {
      // Fallback para ambientes que não suportam Intl
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const loadExampleData = () => {
    const exampleTransactions: AveragePriceTransaction[] = [
      {
        id: "1",
        date: new Date("2024-01-15"),
        quantity: 100,
        price: 25.5,
        type: "buy",
        fees: 5.0,
      },
      {
        id: "2",
        date: new Date("2024-02-15"),
        quantity: 50,
        price: 30.0,
        type: "buy",
        fees: 3.0,
      },
      {
        id: "3",
        date: new Date("2024-03-15"),
        quantity: 30,
        price: 35.0,
        type: "sell",
        fees: 2.5,
      },
    ];
    setTransactions(exampleTransactions);
    setCurrentMarketPrice("32.50");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/financas">Finanças</BreadcrumbItem>
        <BreadcrumbItem isLast>Preço Médio</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-3xl">
          Calculadora de Preço Médio
        </h1>
        <p className="mx-auto max-w-4xl text-lg text-text-secondary-dark">
          Calcule o <strong className="text-growth-green">preço médio das suas ações</strong> e
          investimentos. Controle{" "}
          <strong className="text-primary-blue-dark">ganhos/perdas realizados</strong> e
          <strong className="text-system-success"> análise completa da carteira</strong>.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📊 <strong>Múltiplos métodos</strong> • 💰 <strong>Ganhos realizados</strong> • 📈{" "}
            <strong>Controle total</strong>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8 md:grid-cols-1">
        {/* Configurações e Nova Transação */}
        <div className="space-y-6 md:col-span-1">
          {/* Configurações de Cálculo */}
          <Card>
            <CardHeader>
              <CardTitle as="h2">⚙️ Configurações de Cálculo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  label="Método de Cálculo"
                  value={method}
                  onChange={(value) => setMethod(value as any)}
                  options={[
                    { value: "weighted_average", label: "Média Ponderada (Recomendado)" },
                    { value: "simple_average", label: "Média Simples" },
                    { value: "fifo", label: "FIFO (Primeiro a Entrar, Primeiro a Sair)" },
                  ]}
                  fullWidth
                />

                <div className="flex items-start space-x-3">
                  <button
                    type="button"
                    onClick={() => setIncludeFees(!includeFees)}
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                      includeFees
                        ? "border-growth-green bg-growth-green text-white"
                        : "hover:border-growth-green:border-growth-green-dark border-neutral-surface-variant bg-background-dark-secondary"
                    }`}
                  >
                    {includeFees && (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <label
                      className="cursor-pointer text-sm font-medium text-text-primary"
                      onClick={() => setIncludeFees(!includeFees)}
                    >
                      Incluir taxas e corretagens no cálculo
                    </label>
                    <p className="mt-1 text-xs text-text-secondary">
                      💡 Recomendado para cálculos mais precisos
                    </p>
                  </div>
                </div>

                <MoneyInput
                  label="Preço Atual de Mercado"
                  value={currentMarketPrice}
                  onChange={(value) => setCurrentMarketPrice(value)}
                  placeholder="32,50"
                  min="0.01"
                  fullWidth
                />
              </div>
            </CardContent>
          </Card>

          {/* Adicionar Nova Transação */}
          <Card>
            <CardHeader>
              <CardTitle as="h2">➕ Nova Transação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="date"
                  label="Data da Transação"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  fullWidth
                />

                <Select
                  label="Tipo de Operação"
                  value={newTransaction.type}
                  onChange={(value) => setNewTransaction({ ...newTransaction, type: value as any })}
                  options={[
                    { value: "buy", label: "📈 Compra" },
                    { value: "sell", label: "📉 Venda" },
                  ]}
                  fullWidth
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    label="Quantidade"
                    value={newTransaction.quantity}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, quantity: e.target.value })
                    }
                    placeholder="Ex: 100"
                    min="0"
                    step="1"
                    required
                    fullWidth
                  />

                  <MoneyInput
                    label="Preço"
                    value={newTransaction.price}
                    onChange={(value) => setNewTransaction({ ...newTransaction, price: value })}
                    placeholder="25,50"
                    min="0.01"
                    required
                    fullWidth
                  />
                </div>

                <MoneyInput
                  label="Taxas/Corretagem"
                  value={newTransaction.fees}
                  onChange={(value) => setNewTransaction({ ...newTransaction, fees: value })}
                  placeholder="5,00"
                  min="0"
                  fullWidth
                />

                <div className="space-y-3">
                  <Button
                    onClick={addTransaction}
                    className="w-full"
                    disabled={!newTransaction.quantity || !newTransaction.price}
                  >
                    Adicionar Transação
                  </Button>

                  <div className="flex gap-2">
                    <Button onClick={loadExampleData} variant="outline" className="flex-1 text-xs">
                      📊 Carregar Exemplo
                    </Button>
                    <Button
                      onClick={clearAllTransactions}
                      variant="outline"
                      className="hover:text-white:bg-system-error-dark flex-1 border-system-error text-xs text-system-error hover:bg-system-error"
                    >
                      🗑️ Limpar Tudo
                    </Button>
                  </div>
                </div>

                {/* Informações Econômicas de Referência */}
                <div className="mt-6 rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-system-info">
                    📊 Dados Econômicos de Referência
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">CDI atual:</span>
                      <span className="font-semibold text-system-success">
                        {getDefaultRate("CDI")}% a.a.
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Selic atual:</span>
                      <span className="font-semibold text-system-success">
                        {getDefaultRate("SELIC")}% a.a.
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">IPCA (projeção):</span>
                      <span className="font-semibold text-primary-blue-dark">
                        {getDefaultRate("IPCA")}% a.a.
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Poupança:</span>
                      <span className="font-semibold text-growth-green">
                        {getDefaultRate("POUPANCA")}% a.a.
                      </span>
                    </div>
                    <div className="mt-3 border-t border-system-info/20 pt-2 text-xs text-text-secondary">
                      💡 Use estes dados para comparar a rentabilidade das suas ações com renda fixa
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados e Histórico */}
        <div className="space-y-6 md:col-span-2">
          {/* Resultados Principais */}
          {result && (
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              <Card className="border-2 border-primary-blue bg-primary-blue-light">
                <CardHeader>
                  <CardTitle as="h3" className="text-primary-blue-dark">
                    💰 Preço Médio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-primary-blue-dark">
                      {formatCurrency(result.averagePrice)}
                    </div>
                    <p className="text-sm text-text-secondary">Por unidade</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-growth-green bg-growth-green-soft">
                <CardHeader>
                  <CardTitle as="h3" className="text-growth-green">
                    📊 Posição Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-growth-green">
                      {result.currentPosition}
                    </div>
                    <p className="text-sm text-text-secondary">Unidades</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-system-success bg-system-success/10">
                <CardHeader>
                  <CardTitle as="h3" className="text-system-success">
                    💵 Total Investido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold tabular-nums text-system-success">
                      {formatCurrency(result.totalInvested)}
                    </div>
                    <p className="text-sm text-text-secondary">Valor total aplicado</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Análise de Ganhos/Perdas */}
          {result && (result.realizedGainLoss !== 0 || result.unrealizedGainLoss !== 0) && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">📈 Análise de Ganhos e Perdas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
                  <div>
                    <h4 className="mb-3 font-bold text-text-primary">💰 Ganho/Perda Realizado</h4>
                    <div
                      className={`text-2xl font-bold tabular-nums ${
                        result.realizedGainLoss >= 0
                          ? "text-system-success"
                          : "text-system-error-dark"
                      }`}
                    >
                      {formatCurrency(result.realizedGainLoss)}
                    </div>
                    <p className="text-sm text-text-secondary">Resultado das vendas já efetuadas</p>
                  </div>

                  {result.currentMarketPrice && (
                    <div>
                      <h4 className="mb-3 font-bold text-text-primary">
                        📊 Ganho/Perda Não Realizado
                      </h4>
                      <div
                        className={`text-2xl font-bold tabular-nums ${
                          result.unrealizedGainLoss >= 0
                            ? "text-system-success"
                            : "text-system-error-dark"
                        }`}
                      >
                        {formatCurrency(result.unrealizedGainLoss)}
                      </div>
                      <p className="text-sm text-text-secondary">
                        Baseado no preço atual: {formatCurrency(result.currentMarketPrice)}
                      </p>
                    </div>
                  )}
                </div>

                {result.summary.breakEvenPrice > 0 && (
                  <div className="mt-6 rounded-lg border border-system-info/20 bg-system-info/10 p-4">
                    <h4 className="mb-2 font-bold text-system-info">
                      🎯 Ponto de Equilíbrio (Break-Even)
                    </h4>
                    <div className="text-xl font-bold tabular-nums text-system-info">
                      {formatCurrency(result.summary.breakEvenPrice)}
                    </div>
                    <p className="text-sm text-text-secondary">
                      Preço necessário para não ter lucro nem prejuízo (incluindo taxas)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Histórico de Transações */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">📋 Histórico de Transações ({transactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl">📈</div>
                  <p className="text-text-secondary">
                    Adicione suas transações para começar o cálculo do preço médio
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-surface-variant">
                        <th className="p-2 text-left">Data</th>
                        <th className="p-2 text-center">Tipo</th>
                        <th className="p-2 text-right">Qtd</th>
                        <th className="p-2 text-right">Preço</th>
                        <th className="p-2 text-right">Taxas</th>
                        <th className="p-2 text-right">Total</th>
                        <th className="p-2 text-center">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="hover:bg-neutral-surface/30:bg-background-dark-secondary/30 border-b border-neutral-surface-variant"
                          >
                            <td className="p-2">{formatDate(transaction.date)}</td>
                            <td className="p-2 text-center">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                  transaction.type === "buy"
                                    ? "bg-system-success/10 text-system-success/10"
                                    : "bg-system-error/10 text-system-error/10"
                                }`}
                              >
                                {transaction.type === "buy" ? "📈 Compra" : "📉 Venda"}
                              </span>
                            </td>
                            <td className="p-2 text-right tabular-nums">{transaction.quantity}</td>
                            <td className="p-2 text-right tabular-nums">
                              {formatCurrency(transaction.price)}
                            </td>
                            <td className="p-2 text-right tabular-nums">
                              {formatCurrency(transaction.fees || 0)}
                            </td>
                            <td className="p-2 text-right font-medium tabular-nums">
                              {formatCurrency(
                                transaction.price * transaction.quantity + (transaction.fees || 0)
                              )}
                            </td>
                            <td className="p-2 text-center">
                              <button
                                onClick={() => removeTransaction(transaction.id)}
                                className="hover rounded p-1 text-system-error-dark"
                                title="Remover transação"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resumo Estatístico */}
      {result && result.summary && (
        <Card>
          <CardHeader>
            <CardTitle as="h3">📊 Resumo Estatístico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6 md:grid-cols-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-system-success">
                  {result.summary.totalBuys}
                </div>
                <p className="text-sm text-text-secondary">Operações de Compra</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-system-error-dark">
                  {result.summary.totalSells}
                </div>
                <p className="text-sm text-text-secondary">Operações de Venda</p>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold tabular-nums text-growth-green">
                  {formatCurrency(result.summary.averageBuyPrice)}
                </div>
                <p className="text-sm text-text-secondary">Preço Médio Compras</p>
              </div>

              {result.summary.averageSellPrice > 0 && (
                <div className="text-center">
                  <div className="text-lg font-bold tabular-nums text-primary-blue-dark">
                    {formatCurrency(result.summary.averageSellPrice)}
                  </div>
                  <p className="text-sm text-text-secondary">Preço Médio Vendas</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção Educacional: O que é Preço Médio */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 O que é Preço Médio? Entenda Completamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-primary-blue-dark">preço médio</strong> é uma métrica
                fundamental para investidores que fazem múltiplas compras de um mesmo ativo ao longo
                do tempo. Ele representa o
                <strong className="text-growth-green"> custo médio pago por cada unidade</strong>
                do investimento, considerando todas as operações realizadas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
              <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                  🧮 Como é Calculado?
                </h3>
                <div className="space-y-3">
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">💡 Fórmula Básica</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Preço Médio = Total Investido ÷ Total de Unidades</strong>
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="rounded bg-system-info/10 p-3">
                      <p>
                        <strong>Exemplo prático:</strong>
                      </p>
                      <p>• 1ª compra: 100 ações a R$ 20,00 = R$ 2.000</p>
                      <p>• 2ª compra: 50 ações a R$ 30,00 = R$ 1.500</p>
                      <p className="font-bold text-primary-blue-dark">
                        Preço médio = R$ 3.500 ÷ 150 = R$ 23,33
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
                <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                  🎯 Por que é Importante?
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Controle de custos:</strong> Saber o custo real do investimento
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Ponto de equilíbrio:</strong> Preço para não ter lucro nem prejuízo
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Decisões de venda:</strong> Avaliar se vale a pena vender
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Imposto de renda:</strong> Calcular ganhos/perdas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Estratégia:</strong> Planejar novas compras
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-system-success/20 bg-system-success/10 p-6">
              <h4 className="mb-3 text-center text-lg font-bold text-system-success">
                💰 Exemplo Prático: Investimento em Ações
              </h4>
              <div className="grid grid-cols-3 gap-6 text-sm md:grid-cols-1">
                <div>
                  <h5 className="mb-2 font-semibold text-system-success">📅 Janeiro:</h5>
                  <p>• Comprou 100 ações a R$ 25,00</p>
                  <p>• Total investido: R$ 2.500</p>
                  <p className="font-bold">Preço médio: R$ 25,00</p>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-system-success">📅 Março:</h5>
                  <p>• Comprou mais 50 ações a R$ 35,00</p>
                  <p>• Total investido: R$ 4.250</p>
                  <p className="font-bold">Preço médio: R$ 28,33</p>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-system-success">📅 Maio:</h5>
                  <p>• Vendeu 30 ações a R$ 40,00</p>
                  <p>• Lucro: R$ 350 (30 × R$ 11,67)</p>
                  <p className="font-bold">Posição: 120 ações</p>
                </div>
              </div>
              <p className="mt-4 text-center font-bold text-system-success">
                💡 Com preço médio de R$ 28,33, qualquer venda acima desse valor gera lucro!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métodos de Cálculo */}
      <Card className="border-l-4 border-system-info bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📊 Métodos de Cálculo de Preço Médio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-lg text-text-primary">
              <p>
                Existem diferentes métodos para calcular o preço médio, cada um com suas vantagens.
                <strong className="text-system-info"> Escolha o método</strong>
                que melhor se adapta à sua estratégia de investimento.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
              <div className="rounded-xl border border-primary-blue/20 bg-primary-blue-light p-6">
                <h3 className="mb-4 text-lg font-bold text-primary-blue-dark">
                  ⚖️ Média Ponderada (Recomendado)
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Considera o <strong>valor investido</strong> em cada operação. Operações
                      maiores têm mais peso no cálculo final.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Mais preciso</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Reflete valor real investido</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Padrão do mercado</strong>
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-primary-blue-light p-3">
                    <p className="text-xs font-bold text-primary-blue-dark">
                      💡 Melhor para: Investidores que fazem aportes irregulares
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-growth-green-soft p-6">
                <h3 className="mb-4 text-lg font-bold text-growth-green">📊 Média Simples</h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-growth-green">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Soma todos os <strong>preços de compra</strong> e divide pelo número de
                      operações, ignorando as quantidades.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Fácil de calcular</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Bom para análise de tendência</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Menos preciso</strong>
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-growth-green-soft p-3">
                    <p className="text-xs font-bold text-growth-green">
                      💡 Melhor para: Análises rápidas e comparação de preços
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-system-info/20 bg-system-info/10 p-6">
                <h3 className="mb-4 text-lg font-bold text-system-info">
                  📋 FIFO (Primeiro a Entrar, Primeiro a Sair)
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h4 className="mb-2 font-semibold text-system-info">Como Funciona</h4>
                    <p className="text-sm text-text-secondary">
                      Nas vendas, considera que as <strong>primeiras ações compradas</strong>
                      são as primeiras a serem vendidas.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Padrão contábil</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-success">✅</span>
                      <span>
                        <strong>Bom para IR</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-system-warning">⚠️</span>
                      <span>
                        <strong>Mais complexo</strong>
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-system-info/10 p-3">
                    <p className="text-xs font-bold text-system-info">
                      💡 Melhor para: Cálculos oficiais e declaração de IR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Preço Médio"
        items={[
          {
            question: "Como calcular o preço médio de ações compradas em datas diferentes?",
            answer:
              "Some o <strong>valor total investido</strong> e divida pela <strong>quantidade total de ações</strong>. Exemplo: 100 ações a R$ 10 + 50 ações a R$ 15 = (R$ 1.000 + R$ 750) ÷ 150 ações = <strong>R$ 11,67 por ação</strong>.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre preço médio e preço médio ponderado?",
            answer:
              "São a mesma coisa! <strong>Preço médio ponderado</strong> considera a quantidade de cada compra, não apenas o preço. É o método correto para calcular sua posição real em ações e investimentos.",
            borderColor: "growth-green",
          },
          {
            question: "Como usar o preço médio para calcular lucro ou prejuízo?",
            answer:
              "<strong>Lucro/Prejuízo = (Preço Atual - Preço Médio) × Quantidade Total</strong>. Se o preço atual está acima do seu preço médio, você tem lucro. Se está abaixo, prejuízo. Simples e eficaz!",
            borderColor: "system-info",
          },
          {
            question: "Posso usar para outros investimentos além de ações?",
            answer:
              "<strong>Sim!</strong> Funciona para fundos imobiliários, criptomoedas, commodities, moedas estrangeiras e qualquer investimento onde você faça <strong>aportes em momentos diferentes</strong> com preços variados.",
            borderColor: "system-success",
          },
          {
            question: "Como o preço médio ajuda na estratégia de investimento?",
            answer:
              "Permite <strong>identificar boas oportunidades</strong> de compra quando o preço está abaixo do seu custo médio, <strong>reduzir o preço médio</strong> comprando na baixa, e <strong>tomar decisões de venda</strong> baseadas no seu custo real.",
            borderColor: "growth-green",
          },
          {
            question: "Como incluir taxas de corretagem no cálculo?",
            answer:
              "Some as <strong>taxas ao valor investido</strong> em cada operação. Exemplo: Compra R$ 1.000 + taxa R$ 10 = R$ 1.010 investidos. Isso dá o preço médio real incluindo custos operacionais.",
            borderColor: "system-warning",
          },
          {
            question: "O que fazer quando vendo parte das ações?",
            answer:
              "O <strong>preço médio não muda</strong> quando você vende! Ele permanece o mesmo para as ações restantes. Apenas a quantidade diminui. Exemplo: PM R$ 10 com 100 ações, vende 30, continua R$ 10 para as 70 restantes.",
            borderColor: "primary-blue",
          },
          {
            question: "Existe limite de operações para calcular o preço médio?",
            answer:
              "<strong>Não há limite!</strong> Nossa calculadora aceita quantas operações precisar. Quanto mais operações, mais preciso será seu controle de investimentos e análise de performance.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para <strong>otimizar seus investimentos</strong>, use o preço médio para identificar oportunidades de compra abaixo do seu custo atual, reduzindo gradualmente seu preço médio e aumentando potencial de lucro!",
        }}
        footerText="<strong>Precisa de controle mais detalhado?</strong> Nossa calculadora oferece análise completa de performance e permite adicionar quantas operações necessário para seu controle perfeito!"
      />

      {/* Footer */}
      <Card className="border-l-4 border-growth-green bg-gradient-to-r from-growth-green-soft to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Preço Médio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-bold text-growth-green">
                1. Como incluir taxas e corretagem no cálculo?
              </h3>
              <p className="mb-3 text-text-secondary">
                <strong className="text-text-primary">As taxas devem sempre ser incluídas</strong>
                para ter o custo real do investimento. Nossa calculadora soma automaticamente as
                taxas ao valor da operação.
              </p>
              <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Exemplo com taxas:</strong>
                  </p>
                  <p>• Compra: 100 ações × R$ 25,00 + R$ 5,00 (taxa) = R$ 2.505</p>
                  <p>• Preço médio real: R$ 2.505 ÷ 100 = R$ 25,05</p>
                  <p className="font-bold text-system-success">
                    💡 Taxa de R$ 0,05 por ação aumenta o preço médio!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold text-growth-green">
                2. O que é ganho realizado vs não realizado?
              </h3>
              <p className="mb-3 text-text-secondary">
                <strong>Ganho realizado</strong> é o lucro/prejuízo das vendas já efetuadas.
                <strong>Ganho não realizado</strong> é o lucro/prejuízo teórico baseado no preço
                atual.
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    💰 Realizado (Vendas)
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Já foi convertido em dinheiro</li>
                    <li>• Entra na declaração do IR</li>
                    <li>• Não muda mais</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">
                    📊 Não Realizado (Posição)
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Ainda não vendeu</li>
                    <li>• Muda com o preço de mercado</li>
                    <li>• "Lucro no papel"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold text-growth-green">
                3. Quando devo vender para ter lucro?
              </h3>
              <p className="mb-3 text-text-secondary">
                Para ter lucro, você deve vender por um preço{" "}
                <strong>acima do seu preço médio + taxas</strong>. O ponto de equilíbrio
                (break-even) mostra exatamente esse valor.
              </p>
              <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <p>
                      <strong className="text-primary-blue-dark">Cenário de exemplo:</strong>
                    </p>
                    <p>• Preço médio: R$ 28,00 por ação</p>
                    <p>• Taxa de venda estimada: R$ 0,20 por ação</p>
                    <p>• Ponto de equilíbrio: R$ 28,20</p>
                  </div>
                  <div className="border-t border-primary-blue/30 pt-3">
                    <p>
                      <strong>Resultado da venda:</strong>
                    </p>
                    <p>
                      • Venda a R$ 30,00:{" "}
                      <span className="font-bold text-system-success">Lucro de R$ 1,80</span>
                    </p>
                    <p>
                      • Venda a R$ 27,00:{" "}
                      <span className="font-bold text-system-error-dark">Prejuízo de R$ 1,20</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold text-growth-green">
                4. Como usar para estratégia de investimento?
              </h3>
              <p className="mb-3 text-text-secondary">
                O preço médio ajuda a <strong>tomar decisões estratégicas</strong> sobre quando
                comprar mais, quando vender e como diversificar seus investimentos.
              </p>
              <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="mb-2 font-semibold text-growth-green">
                      🎯 Estratégias Avançadas:
                    </h5>
                    <ul className="space-y-1">
                      <li>
                        • <strong>Custo médio constante (DCA):</strong> Compre sempre o mesmo valor
                      </li>
                      <li>
                        • <strong>Compra na baixa:</strong> Aproveite quedas para reduzir preço
                        médio
                      </li>
                      <li>
                        • <strong>Venda parcial:</strong> Realize lucros mantendo posição
                      </li>
                      <li>
                        • <strong>Stop loss:</strong> Use preço médio como referência
                      </li>
                    </ul>
                  </div>
                  <div className="border-t border-growth-green/30 pt-3">
                    <p className="font-bold text-growth-green">
                      💡 Lembre-se: Preço médio é uma ferramenta, não uma meta!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold text-growth-green">
                5. A calculadora funciona para todos os tipos de investimento?
              </h3>
              <p className="mb-3 text-text-secondary">
                <strong className="text-text-primary">Sim!</strong>
                Nossa calculadora funciona para ações, fundos, ETFs, criptomoedas, commodities e
                qualquer ativo que você compre e venda em unidades.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full overflow-hidden rounded-lg border border-neutral-surface-variant text-sm">
                  <thead className="bg-growth-green-soft">
                    <tr>
                      <th className="p-3 text-left">Tipo de Investimento</th>
                      <th className="p-3 text-center">Funciona?</th>
                      <th className="p-3 text-center">Observações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light">
                    <tr>
                      <td className="p-3 font-semibold">Ações (B3)</td>
                      <td className="p-3 text-center text-system-success">✅ Sim</td>
                      <td className="p-3 text-center text-xs">Inclua taxas da corretora</td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Fundos de Investimento</td>
                      <td className="p-3 text-center text-system-success">✅ Sim</td>
                      <td className="p-3 text-center text-xs">Use cotas como unidades</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">ETFs</td>
                      <td className="p-3 text-center text-system-success">✅ Sim</td>
                      <td className="p-3 text-center text-xs">Mesmo que ações</td>
                    </tr>
                    <tr className="bg-neutral-surface/30">
                      <td className="p-3 font-semibold">Criptomoedas</td>
                      <td className="p-3 text-center text-system-success">✅ Sim</td>
                      <td className="p-3 text-center text-xs">Atenção às casas decimais</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Produtos/Commodities</td>
                      <td className="p-3 text-center text-system-success">✅ Sim</td>
                      <td className="p-3 text-center text-xs">Qualquer item em unidades</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-l-4 border-growth-green bg-gradient-to-r from-growth-green-soft to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Preço Médio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-growth-green">calculadora de preço médio</strong> é
              <strong className="text-system-success"> 100% gratuita</strong> e oferece
              funcionalidades profissionais para controle completo da sua carteira de investimentos.
              Suporta múltiplos métodos de cálculo e análise detalhada de ganhos/perdas.
            </p>
            <p>
              <strong>Recursos avançados:</strong> Múltiplos métodos de cálculo (média ponderada,
              média simples, FIFO), inclusão de taxas e corretagens, análise de ganhos realizados e
              não realizados, ponto de equilíbrio, histórico detalhado de transações, resumo
              estatístico e interface responsiva.
            </p>
            <p>
              <strong className="text-system-warning">Aviso Legal:</strong> Esta calculadora é para
              fins educacionais e de planejamento. Não constitui assessoria de investimentos. Para
              decisões importantes, consulte sempre um <strong>assessor qualificado</strong> ou{" "}
              <strong>contador especializado</strong>.
            </p>
            <p className="mt-4 border-t border-growth-green/20 pt-3 text-xs opacity-75">
              ⚖️ Cálculos baseados em metodologias padrão do mercado financeiro • 🎓 Conteúdo
              educacional especializado • 🔒 Dados processados localmente • 📱 Interface responsiva
              • 🌙 Modo escuro • 💰 Suporte para todos os tipos de investimentos
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
            name: "Calculadora de Preço Médio",
            description:
              "Calculadora gratuita para calcular preço médio de ações e investimentos. Controle ganhos/perdas e análise completa da carteira.",
            url: "https://calculadorasonline.com.br/calculadoras/financas/preco-medio",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
              "Cálculo de preço médio com múltiplos métodos",
              "Análise de ganhos/perdas realizados e não realizados",
              "Inclusão de taxas e corretagens",
              "Histórico detalhado de transações",
              "Ponto de equilíbrio (break-even)",
              "Resumo estatístico completo",
              "Suporte para ações, fundos, ETFs e criptomoedas",
              "100% gratuito",
            ],
            about: [
              {
                "@type": "Thing",
                name: "Preço Médio de Ações",
              },
              {
                "@type": "Thing",
                name: "Controle de Carteira de Investimentos",
              },
              {
                "@type": "Thing",
                name: "Análise de Ganhos e Perdas",
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

      <RelatedCalculators category="financas" currentCalculatorId="preco-medio" />
    </div>
  );
}
