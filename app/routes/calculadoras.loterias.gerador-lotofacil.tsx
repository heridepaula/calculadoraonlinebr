import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { title: `Gerador de Lotofácil Grátis com Estratégias | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Gere números inteligentes para Lotofácil com análise de frequência, filtros matemáticos e estratégias estatísticas. Histórico de jogos e técnicas avançadas.",
    },
    {
      name: "keywords",
      content:
        "gerador lotofácil, números lotofácil, estratégias lotofácil, análise estatística loteria, números quentes frios, fechamento lotofácil, desdobramento loteria",
    },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "author",
      content: "CalculadoraOnlineBR",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      property: "og:title",
      content: "Gerador de Lotofácil com Estratégias Inteligentes",
    },
    {
      property: "og:description",
      content:
        "Gere números inteligentes para Lotofácil com análise de frequência, filtros matemáticos e estratégias estatísticas. Histórico de jogos e técnicas avançadas.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/gerador-lotofacil.jpg",
    },
    {
      property: "og:image:alt",
      content: "Gerador de Lotofácil - Interface mostrando números gerados com estratégias",
    },
    {
      property: "og:site_name",
      content: "CalculadoraOnlineBR",
    },
    {
      property: "og:locale",
      content: "pt_BR",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Gerador de Lotofácil Grátis 2025 | Estratégias Inteligentes",
    },
    {
      name: "twitter:description",
      content: "Gere números da Lotofácil GRÁTIS com análise estatística e estratégias avançadas!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/gerador-lotofacil.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Lotofácil - Interface mostrando números gerados com estratégias",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    },
  ];
};

// Dados estatísticos da Lotofácil baseados em análises históricas
const LOTOFACIL_STATS = {
  numbersFrequency: {
    // Números mais sorteados (baseado em dados históricos)
    hot: [20, 10, 25, 11, 13, 5, 4, 23, 2, 24],
    warm: [14, 16, 3, 12, 22, 17, 18, 19, 15, 21],
    cold: [1, 6, 7, 8, 9],
  },
  primes: [2, 3, 5, 7, 11, 13, 17, 19, 23],
  patterns: {
    minPairs: 5,
    maxPairs: 10,
    idealPairs: [6, 7, 8],
    minSum: 170,
    maxSum: 220,
    idealSum: [185, 205],
    maxConsecutive: 3,
  },
};

interface LotofacilGame {
  id: string;
  numbers: number[];
  strategy: string;
  date: string;
  statistics: {
    pairs: number;
    odds: number;
    sum: number;
    primes: number;
    hotNumbers: number;
    coldNumbers: number;
  };
}

interface GenerationStrategy {
  useFrequency: boolean;
  frequencyType: "hot" | "balanced" | "cold";
  controlParity: boolean;
  minPairs: number;
  maxPairs: number;
  controlSum: boolean;
  minSum: number;
  maxSum: number;
  avoidConsecutive: boolean;
  maxConsecutive: number;
  includePrimes: boolean;
  minPrimes: number;
  maxPrimes: number;
}

const defaultStrategy: GenerationStrategy = {
  useFrequency: true,
  frequencyType: "balanced",
  controlParity: true,
  minPairs: 6,
  maxPairs: 8,
  controlSum: true,
  minSum: 180,
  maxSum: 210,
  avoidConsecutive: true,
  maxConsecutive: 2,
  includePrimes: true,
  minPrimes: 4,
  maxPrimes: 6,
};

export default function GeradorLotofacil() {
  const [generatedGames, setGeneratedGames] = useState<LotofacilGame[]>([]);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<GenerationStrategy>(defaultStrategy);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameHistory, setGameHistory] = useState<LotofacilGame[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lotofacil-history");
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    }
  }, []);

  // Salvar histórico no localStorage
  const saveToHistory = (game: LotofacilGame) => {
    const newHistory = [game, ...gameHistory].slice(0, 50); // Limitar a 50 jogos
    setGameHistory(newHistory);
    localStorage.setItem("lotofacil-history", JSON.stringify(newHistory));
  };

  // Função para gerar números aleatórios baseados na estratégia
  const generateNumbers = (): number[] => {
    const numbers: number[] = [];
    const available = Array.from({ length: 25 }, (_, i) => i + 1);

    // Aplicar filtros de frequência se habilitado
    if (strategy.useFrequency) {
      const sourceNumbers =
        strategy.frequencyType === "hot" ? LOTOFACIL_STATS.numbersFrequency.hot :
        strategy.frequencyType === "cold" ? LOTOFACIL_STATS.numbersFrequency.cold :
        [...LOTOFACIL_STATS.numbersFrequency.hot, ...LOTOFACIL_STATS.numbersFrequency.warm];

      // Priorizar números da estratégia (70% de chance)
      while (numbers.length < 10 && sourceNumbers.length > 0) {
        if (Math.random() < 0.7) {
          const randomIndex = Math.floor(Math.random() * sourceNumbers.length);
          const number = sourceNumbers[randomIndex];
          if (!numbers.includes(number)) {
            numbers.push(number);
          }
        }
        sourceNumbers.splice(sourceNumbers.findIndex(n => numbers.includes(n)), 1);
      }
    }

    // Completar com números aleatórios
    while (numbers.length < 15) {
      const remaining = available.filter(n => !numbers.includes(n));
      const randomNumber = remaining[Math.floor(Math.random() * remaining.length)];
      numbers.push(randomNumber);
    }

    return numbers.sort((a, b) => a - b);
  };

  // Verificar se o jogo atende aos critérios da estratégia
  const validateGame = (numbers: number[]): boolean => {
    const pairs = numbers.filter(n => n % 2 === 0).length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter(n => LOTOFACIL_STATS.primes.includes(n)).length;

    // Verificar consecutivos
    let consecutive = 1;
    let maxConsecutiveFound = 1;
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] === numbers[i - 1] + 1) {
        consecutive++;
        maxConsecutiveFound = Math.max(maxConsecutiveFound, consecutive);
      } else {
        consecutive = 1;
      }
    }

    return (
      (!strategy.controlParity || (pairs >= strategy.minPairs && pairs <= strategy.maxPairs)) &&
      (!strategy.controlSum || (sum >= strategy.minSum && sum <= strategy.maxSum)) &&
      (!strategy.avoidConsecutive || maxConsecutiveFound <= strategy.maxConsecutive) &&
      (!strategy.includePrimes || (primes >= strategy.minPrimes && primes <= strategy.maxPrimes))
    );
  };

  // Calcular estatísticas do jogo
  const calculateStatistics = (numbers: number[]) => {
    const pairs = numbers.filter(n => n % 2 === 0).length;
    const odds = 15 - pairs;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter(n => LOTOFACIL_STATS.primes.includes(n)).length;
    const hotNumbers = numbers.filter(n => LOTOFACIL_STATS.numbersFrequency.hot.includes(n)).length;
    const coldNumbers = numbers.filter(n => LOTOFACIL_STATS.numbersFrequency.cold.includes(n)).length;

    return { pairs, odds, sum, primes, hotNumbers, coldNumbers };
  };

  // Gerar um jogo
  const handleGenerateGame = async () => {
    setIsGenerating(true);

    // Simular tempo de processamento para melhor UX
    await new Promise(resolve => setTimeout(resolve, 800));

    let attempts = 0;
    let numbers: number[] = [];

    // Tentar gerar um jogo válido (máximo 100 tentativas)
    do {
      numbers = generateNumbers();
      attempts++;
    } while (!validateGame(numbers) && attempts < 100);

    if (selectedNumbers.length > 0) {
      // Incluir números selecionados manualmente
      const manualNumbers = selectedNumbers.slice(0, 15);
      const remaining = 15 - manualNumbers.length;
      const generatedNumbers = generateNumbers().filter(n => !manualNumbers.includes(n)).slice(0, remaining);
      numbers = [...manualNumbers, ...generatedNumbers].sort((a, b) => a - b);
    }

    const statistics = calculateStatistics(numbers);
    const strategyName = strategy.useFrequency ?
      `Frequência ${strategy.frequencyType === 'hot' ? 'Quente' : strategy.frequencyType === 'cold' ? 'Fria' : 'Equilibrada'}` :
      'Aleatório';

    const game: LotofacilGame = {
      id: Date.now().toString(),
      numbers,
      strategy: strategyName,
      date: new Date().toLocaleString('pt-BR'),
      statistics,
    };

    setCurrentNumbers(numbers);
    setGeneratedGames([game, ...generatedGames].slice(0, 10));
    saveToHistory(game);
    setIsGenerating(false);
  };

  // Toggle número selecionado manualmente
  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < 15) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  // Limpar seleção manual
  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  // Gerar múltiplos jogos
  const generateMultipleGames = async (count: number) => {
    setIsGenerating(true);
    const newGames: LotofacilGame[] = [];

    for (let i = 0; i < count; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));

      let attempts = 0;
      let numbers: number[] = [];

      do {
        numbers = generateNumbers();
        attempts++;
      } while (!validateGame(numbers) && attempts < 50);

      const statistics = calculateStatistics(numbers);
      const game: LotofacilGame = {
        id: `${Date.now()}-${i}`,
        numbers,
        strategy: strategy.useFrequency ?
          `Frequência ${strategy.frequencyType === 'hot' ? 'Quente' : strategy.frequencyType === 'cold' ? 'Fria' : 'Equilibrada'}` :
          'Aleatório',
        date: new Date().toLocaleString('pt-BR'),
        statistics,
      };

      newGames.push(game);
      saveToHistory(game);
    }

    setGeneratedGames([...newGames, ...generatedGames].slice(0, 20));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Gerador de Lotofácil",
            "description": "Gerador inteligente de números para Lotofácil com estratégias estatísticas e análise de frequência",
            "url": "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL",
            },
            "featureList": [
              "Análise de frequência de números",
              "Filtros matemáticos avançados",
              "Controle de paridade (pares/ímpares)",
              "Estratégias estatísticas",
              "Histórico de jogos",
              "Seleção manual de números",
              "Geração em lote",
            ],
          }),
        }}
      />

      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb
        items={createCalculatorBreadcrumb("loterias", "Gerador de Lotofácil")}
      />

      <div className="space-y-8 px-3 py-6 sm:px-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            🍀 Gerador de Lotofácil Inteligente
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Gere números para <strong className="text-system-success-dark">Lotofácil</strong> usando
            estratégias estatísticas avançadas, análise de frequência e filtros matemáticos
            inteligentes.
          </p>
          <div className="inline-block rounded-lg bg-system-success/10 p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              🎯 <strong>Estratégias Inteligentes</strong> • 📊 <strong>Análise Estatística</strong> •
              💾 <strong>Histórico Salvo</strong>
            </p>
          </div>
        </header>

        {/* Gerador Principal */}
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">🎰</span>
              Gerador Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seleção Manual de Números */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Seleção Manual (Opcional)</h3>
              <div className="mb-4 grid grid-cols-5 gap-2 sm:grid-cols-10 lg:grid-cols-15">
                {Array.from({ length: 25 }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => toggleNumber(number)}
                    className={`aspect-square h-10 w-10 rounded-lg border-2 text-sm font-bold transition-all duration-200 ${
                      selectedNumbers.includes(number)
                        ? "border-system-success bg-system-success text-white shadow-lg"
                        : "border-neutral-surface-variant bg-background-primary text-text-primary hover:border-system-success hover:bg-system-success/10"
                    }`}
                  >
                    {number.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-text-secondary">
                  Selecionados: {selectedNumbers.length}/15
                </span>
                {selectedNumbers.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="text-sm text-system-error hover:underline"
                  >
                    Limpar seleção
                  </button>
                )}
              </div>
            </div>

            {/* Configurações da Estratégia */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Estratégias</h3>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-primary-blue hover:underline"
                >
                  {showAdvanced ? "Ocultar" : "Mostrar"} Avançadas
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Análise de Frequência */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={strategy.useFrequency}
                      onChange={(e) =>
                        setStrategy({ ...strategy, useFrequency: e.target.checked })
                      }
                      className="rounded border-neutral-surface-variant"
                    />
                    <span className="font-medium">Usar Análise de Frequência</span>
                  </label>

                  {strategy.useFrequency && (
                    <div className="ml-6 space-y-2">
                      <label className="block text-sm font-medium">Tipo de Frequência:</label>
                      <select
                        value={strategy.frequencyType}
                        onChange={(e) =>
                          setStrategy({
                            ...strategy,
                            frequencyType: e.target.value as "hot" | "balanced" | "cold",
                          })
                        }
                        className="w-full rounded-lg border border-neutral-surface-variant bg-background-primary p-2"
                      >
                        <option value="hot">Números Quentes (mais sorteados)</option>
                        <option value="balanced">Equilibrado (quentes + médios)</option>
                        <option value="cold">Números Frios (menos sorteados)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Controle de Paridade */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={strategy.controlParity}
                      onChange={(e) =>
                        setStrategy({ ...strategy, controlParity: e.target.checked })
                      }
                      className="rounded border-neutral-surface-variant"
                    />
                    <span className="font-medium">Controlar Pares/Ímpares</span>
                  </label>

                  {strategy.controlParity && (
                    <div className="ml-6 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-text-secondary">Min. Pares:</label>
                        <input
                          type="number"
                          min="0"
                          max="15"
                          value={strategy.minPairs}
                          onChange={(e) =>
                            setStrategy({ ...strategy, minPairs: parseInt(e.target.value) })
                          }
                          className="w-full rounded border border-neutral-surface-variant bg-background-primary p-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-secondary">Max. Pares:</label>
                        <input
                          type="number"
                          min="0"
                          max="15"
                          value={strategy.maxPairs}
                          onChange={(e) =>
                            setStrategy({ ...strategy, maxPairs: parseInt(e.target.value) })
                          }
                          className="w-full rounded border border-neutral-surface-variant bg-background-primary p-1 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Configurações Avançadas */}
              {showAdvanced && (
                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-neutral-surface-variant pt-4 md:grid-cols-2">
                  {/* Controle de Soma */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={strategy.controlSum}
                        onChange={(e) =>
                          setStrategy({ ...strategy, controlSum: e.target.checked })
                        }
                        className="rounded border-neutral-surface-variant"
                      />
                      <span className="font-medium">Controlar Soma Total</span>
                    </label>

                    {strategy.controlSum && (
                      <div className="ml-6 grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-text-secondary">Soma Mín.:</label>
                          <input
                            type="number"
                            min="120"
                            max="250"
                            value={strategy.minSum}
                            onChange={(e) =>
                              setStrategy({ ...strategy, minSum: parseInt(e.target.value) })
                            }
                            className="w-full rounded border border-neutral-surface-variant bg-background-primary p-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-text-secondary">Soma Máx.:</label>
                          <input
                            type="number"
                            min="120"
                            max="250"
                            value={strategy.maxSum}
                            onChange={(e) =>
                              setStrategy({ ...strategy, maxSum: parseInt(e.target.value) })
                            }
                            className="w-full rounded border border-neutral-surface-variant bg-background-primary p-1 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Números Primos */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={strategy.includePrimes}
                        onChange={(e) =>
                          setStrategy({ ...strategy, includePrimes: e.target.checked })
                        }
                        className="rounded border-neutral-surface-variant"
                      />
                      <span className="font-medium">Controlar Números Primos</span>
                    </label>

                    {strategy.includePrimes && (
                      <div className="ml-6 grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-text-secondary">Min. Primos:</label>
                          <input
                            type="number"
                            min="0"
                            max="9"
                            value={strategy.minPrimes}
                            onChange={(e) =>
                              setStrategy({ ...strategy, minPrimes: parseInt(e.target.value) })
                            }
                            className="w-full rounded border border-neutral-surface-variant bg-background-primary p-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-text-secondary">Max. Primos:</label>
                          <input
                            type="number"
                            min="0"
                            max="9"
                            value={strategy.maxPrimes}
                            onChange={(e) =>
                              setStrategy({ ...strategy, maxPrimes: parseInt(e.target.value) })
                            }
                            className="w-full rounded border border-neutral-surface-variant bg-background-primary p-1 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Botões de Geração */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleGenerateGame}
                disabled={isGenerating}
                className="bg-system-success hover:bg-system-success-dark"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Gerando...
                  </span>
                ) : (
                  "🎲 Gerar 1 Jogo"
                )}
              </Button>

              <Button
                onClick={() => generateMultipleGames(5)}
                disabled={isGenerating}
                variant="outline"
              >
                Gerar 5 Jogos
              </Button>

              <Button
                onClick={() => generateMultipleGames(10)}
                disabled={isGenerating}
                variant="outline"
              >
                Gerar 10 Jogos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultado Atual */}
        {currentNumbers.length > 0 && (
          <Card className="mx-auto max-w-4xl border-l-4 border-system-success">
            <CardHeader>
              <CardTitle className="text-system-success-dark">
                🎯 Último Jogo Gerado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  {currentNumbers.map((number) => (
                    <div
                      key={number}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-system-success font-bold text-white shadow-lg"
                    >
                      {number.toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>

                {generatedGames.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                    <div>
                      <span className="font-medium text-text-secondary">Pares:</span>
                      <span className="ml-1">{generatedGames[0].statistics.pairs}</span>
                    </div>
                    <div>
                      <span className="font-medium text-text-secondary">Ímpares:</span>
                      <span className="ml-1">{generatedGames[0].statistics.odds}</span>
                    </div>
                    <div>
                      <span className="font-medium text-text-secondary">Soma:</span>
                      <span className="ml-1">{generatedGames[0].statistics.sum}</span>
                    </div>
                    <div>
                      <span className="font-medium text-text-secondary">Primos:</span>
                      <span className="ml-1">{generatedGames[0].statistics.primes}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Jogos Gerados */}
        {generatedGames.length > 0 && (
          <Card className="mx-auto max-w-6xl">
            <CardHeader>
              <CardTitle>📝 Jogos da Sessão Atual ({generatedGames.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedGames.map((game, index) => (
                  <div
                    key={game.id}
                    className="rounded-lg border border-neutral-surface-variant bg-background-secondary p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-secondary">
                        Jogo #{index + 1} - {game.strategy}
                      </span>
                      <span className="text-xs text-text-secondary">{game.date}</span>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-1">
                      {game.numbers.map((number) => (
                        <div
                          key={number}
                          className="flex h-8 w-8 items-center justify-center rounded bg-system-success/20 text-sm font-medium text-system-success-dark"
                        >
                          {number.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs md:grid-cols-6">
                      <div>Pares: {game.statistics.pairs}</div>
                      <div>Ímpares: {game.statistics.odds}</div>
                      <div>Soma: {game.statistics.sum}</div>
                      <div>Primos: {game.statistics.primes}</div>
                      <div>Quentes: {game.statistics.hotNumbers}</div>
                      <div>Frios: {game.statistics.coldNumbers}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Histórico Salvo */}
        {gameHistory.length > 0 && (
          <Card className="mx-auto max-w-6xl">
            <CardHeader>
              <CardTitle>💾 Histórico de Jogos ({gameHistory.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-text-secondary">
                Últimos jogos salvos automaticamente (máximo 50)
              </div>
              <div className="space-y-3">
                {gameHistory.slice(0, 10).map((game, index) => (
                  <div
                    key={game.id}
                    className="rounded border border-neutral-surface-variant bg-background-primary p-3"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{game.strategy}</span>
                      <span className="text-text-secondary">{game.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {game.numbers.map((number) => (
                        <div
                          key={number}
                          className="flex h-6 w-6 items-center justify-center rounded bg-primary-blue/20 text-xs font-medium text-primary-blue-dark"
                        >
                          {number.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {gameHistory.length > 10 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      // Implementar visualização completa do histórico
                      alert(`Você tem ${gameHistory.length} jogos no histórico!`);
                    }}
                    className="text-sm text-primary-blue hover:underline"
                  >
                    Ver todos os {gameHistory.length} jogos
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Informações Estatísticas */}
        <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
          <CardHeader>
            <CardTitle>📊 Análise Estatística da Lotofácil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Números por Frequência */}
            <div>
              <h4 className="mb-3 font-semibold">Frequência Histórica de Números</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <h5 className="mb-2 text-sm font-medium text-system-error">
                    🔥 Números Quentes (mais sorteados)
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {LOTOFACIL_STATS.numbersFrequency.hot.map((number) => (
                      <div
                        key={number}
                        className="flex h-8 w-8 items-center justify-center rounded bg-system-error/20 text-sm font-medium text-system-error-dark"
                      >
                        {number.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="mb-2 text-sm font-medium text-system-warning">
                    🌡️ Números Médios
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {LOTOFACIL_STATS.numbersFrequency.warm.map((number) => (
                      <div
                        key={number}
                        className="flex h-8 w-8 items-center justify-center rounded bg-system-warning/20 text-sm font-medium text-system-warning-dark"
                      >
                        {number.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="mb-2 text-sm font-medium text-primary-blue">
                    🧊 Números Frios (menos sorteados)
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {LOTOFACIL_STATS.numbersFrequency.cold.map((number) => (
                      <div
                        key={number}
                        className="flex h-8 w-8 items-center justify-center rounded bg-primary-blue/20 text-sm font-medium text-primary-blue-dark"
                      >
                        {number.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Padrões Matemáticos */}
            <div>
              <h4 className="mb-3 font-semibold">Padrões Matemáticos Ideais</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded bg-system-success/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-success-dark">6-8</div>
                  <div className="text-sm text-text-secondary">Números Pares</div>
                </div>
                <div className="rounded bg-system-info/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-info-dark">185-205</div>
                  <div className="text-sm text-text-secondary">Soma Ideal</div>
                </div>
                <div className="rounded bg-math-purple/10 p-3 text-center">
                  <div className="text-lg font-bold text-math-purple-dark">4-6</div>
                  <div className="text-sm text-text-secondary">Números Primos</div>
                </div>
                <div className="rounded bg-system-warning/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-warning-dark">≤2</div>
                  <div className="text-sm text-text-secondary">Consecutivos</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes - Gerador de Lotofácil"
          items={[
            {
              question: "Como funcionam as estratégias de números quentes e frios?",
              answer:
                "Números quentes são aqueles que foram sorteados com maior frequência nos últimos concursos. Números frios são os menos sorteados. Nossa análise é baseada em dados históricos reais da Lotofácil para identificar padrões estatísticos.",
              borderColor: "system-success",
            },
            {
              question: "O que significa controlar a paridade dos números?",
              answer:
                "Paridade refere-se ao equilíbrio entre números pares e ímpares. Estatisticamente, a maioria dos sorteios da Lotofácil tem entre 6-8 números pares e 7-9 ímpares. Controlar isso pode melhorar a qualidade estatística do jogo.",
              borderColor: "primary-blue",
            },
            {
              question: "Por que a soma dos números é importante?",
              answer:
                "A soma total dos 15 números de um jogo da Lotofácil geralmente fica entre 180-210. Valores muito baixos ou muito altos são estatisticamente menos prováveis, então controlar a soma pode ser uma estratégia interessante.",
              borderColor: "system-info",
            },
            {
              question: "O histórico de jogos fica salvo permanentemente?",
              answer:
                "O histórico fica salvo no seu navegador (localStorage) e permanece até você limpar os dados do navegador. Recomendamos anotar ou imprimir os jogos importantes, pois eles podem ser perdidos se os dados do navegador forem apagados.",
              borderColor: "system-warning",
            },
            {
              question: "Essas estratégias garantem que vou ganhar?",
              answer:
                "Não! As loterias são jogos de sorte e nenhuma estratégia garante vitória. Nosso gerador apenas aplica filtros baseados em padrões estatísticos históricos para criar jogos mais 'equilibrados' matematicamente, mas isso não aumenta as chances reais de ganhar.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica para Uso Responsável",
            content:
              "<strong>Jogue com responsabilidade:</strong> Loterias são entretenimento, não investimento. Estabeleça um limite de gastos mensal e nunca aposte mais do que pode perder. Use nosso gerador como ferramenta de diversão e estudo estatístico.",
          }}
          footerText="<strong>Lembre-se:</strong> Este gerador é uma ferramenta educativa para estudo de padrões estatísticos. O resultado das loterias é sempre aleatório e imprevisível."
        />

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-lotofacil" />
      </div>
    </div>
  );
}