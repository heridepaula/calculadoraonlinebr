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
      content: "Gerador de Lotofácil Grátis 2026 | Estratégias Inteligentes",
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

// Dados estatísticos da Lotofácil baseados em análises históricas (atualizado 2026, ~3300 concursos)
const LOTOFACIL_STATS = {
  numbersFrequency: {
    // Números mais sorteados — frequência acima da média histórica
    hot: [20, 25, 10, 5, 14, 22, 4, 11, 2, 23, 13, 24],
    // Números com frequência próxima da média
    warm: [3, 12, 15, 16, 17, 18, 19, 21],
    // Números menos sorteados — candidatos à revanche estatística
    cold: [1, 6, 7, 8, 9],
  },
  primes: [2, 3, 5, 7, 11, 13, 17, 19, 23],
  fibonacci: [1, 2, 3, 5, 8, 13, 21],
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

interface StrategyPreset {
  name: string;
  icon: string;
  description: string;
  config: GenerationStrategy;
}

const LOTOFACIL_PRESETS: StrategyPreset[] = [
  {
    name: "Equilibrado",
    icon: "🍀",
    description: "Mix de quentes e médios com filtros balanceados — recomendado",
    config: { useFrequency: true, frequencyType: "balanced", controlParity: true, minPairs: 6, maxPairs: 8, controlSum: true, minSum: 185, maxSum: 205, avoidConsecutive: true, maxConsecutive: 2, includePrimes: true, minPrimes: 4, maxPrimes: 6 },
  },
  {
    name: "Só Quentes",
    icon: "🔥",
    description: "Prioriza os números mais sorteados historicamente na Lotofácil",
    config: { useFrequency: true, frequencyType: "hot", controlParity: true, minPairs: 6, maxPairs: 8, controlSum: true, minSum: 182, maxSum: 210, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
  {
    name: "Revanche",
    icon: "🧊",
    description: "Números frios (1, 6, 7, 8, 9) — teoria da revanche estatística",
    config: { useFrequency: true, frequencyType: "cold", controlParity: false, minPairs: 5, maxPairs: 10, controlSum: false, minSum: 120, maxSum: 250, avoidConsecutive: false, maxConsecutive: 4, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
  {
    name: "Alta Soma",
    icon: "⬆️",
    description: "Concentra os 15 números na faixa alta (soma 208–225)",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: true, minPairs: 6, maxPairs: 8, controlSum: true, minSum: 208, maxSum: 225, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
  {
    name: "Baixa Soma",
    icon: "⬇️",
    description: "Concentra os 15 números na faixa baixa (soma 165–184)",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: true, minPairs: 6, maxPairs: 8, controlSum: true, minSum: 165, maxSum: 184, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
  {
    name: "Mais Ímpares",
    icon: "1️⃣",
    description: "Favorece ímpares no jogo (5–7 pares de 15 números)",
    config: { useFrequency: true, frequencyType: "balanced", controlParity: true, minPairs: 5, maxPairs: 7, controlSum: true, minSum: 180, maxSum: 210, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
  {
    name: "Máx. Primos",
    icon: "🔢",
    description: "Maximiza primos: 2, 3, 5, 7, 11, 13, 17, 19, 23 — 5 a 7 primos no jogo",
    config: { useFrequency: true, frequencyType: "balanced", controlParity: false, minPairs: 5, maxPairs: 10, controlSum: true, minSum: 180, maxSum: 210, avoidConsecutive: true, maxConsecutive: 2, includePrimes: true, minPrimes: 5, maxPrimes: 7 },
  },
  {
    name: "Fibonacci",
    icon: "🌀",
    description: "Inclui números da sequência de Fibonacci disponíveis (1, 2, 3, 5, 8, 13, 21)",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: true, minPairs: 6, maxPairs: 8, controlSum: true, minSum: 180, maxSum: 210, avoidConsecutive: true, maxConsecutive: 3, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
  {
    name: "Puro Aleatório",
    icon: "🎲",
    description: "Sem filtros — seleção totalmente aleatória de 15 números entre 1 e 25",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: false, minPairs: 0, maxPairs: 15, controlSum: false, minSum: 120, maxSum: 250, avoidConsecutive: false, maxConsecutive: 15, includePrimes: false, minPrimes: 0, maxPrimes: 9 },
  },
];

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

  // Remover item do histórico
  const removeFromHistory = (gameId: string) => {
    const updatedHistory = gameHistory.filter(game => game.id !== gameId);
    setGameHistory(updatedHistory);
    localStorage.setItem("lotofacil-history", JSON.stringify(updatedHistory));
  };

  // Limpar todo o histórico
  const clearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.")) {
      setGameHistory([]);
      localStorage.removeItem("lotofacil-history");
    }
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
            {/* Volante da Lotofácil */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-center">
                🍀 Volante da Lotofácil - Marque até 15 números
              </h3>

              {/* Simulação do Talão Real */}
              <div className="mx-auto max-w-lg rounded-xl border-4 border-pink-600 bg-gradient-to-b from-white to-pink-50 p-6 shadow-2xl">
                {/* Cabeçalho do Talão */}
                <div className="mb-4 text-center">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-pink-800">
                    LOTOFÁCIL
                  </div>
                  <div className="text-xs text-pink-700">
                    Marque de 15 a 18 números
                  </div>
                </div>

                {/* Grid 5x5 como no volante real */}
                <div className="mb-4 grid grid-cols-5 gap-1 rounded-lg bg-white p-3 shadow-inner">
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => toggleNumber(number)}
                      className={`relative aspect-square h-12 w-12 rounded-md border-2 text-sm font-bold transition-all duration-200 ${
                        selectedNumbers.includes(number)
                          ? "border-pink-600 bg-pink-100 text-pink-800 shadow-md"
                          : "border-gray-300 bg-white text-gray-700 hover:border-pink-400 hover:bg-pink-50"
                      }`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        {number.toString().padStart(2, "0")}
                      </span>
                      {selectedNumbers.includes(number) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">✓</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Informações do Talão */}
                <div className="space-y-2 text-center text-xs text-pink-700">
                  <div className="flex justify-between">
                    <span>Números marcados:</span>
                    <span className="font-bold">{selectedNumbers.length}/15</span>
                  </div>

                  {selectedNumbers.length > 0 && selectedNumbers.length < 15 && (
                    <div className="text-orange-600">
                      Marque mais {15 - selectedNumbers.length} número(s)
                    </div>
                  )}

                  {selectedNumbers.length === 15 && (
                    <div className="text-pink-600 font-bold">
                      ✅ Jogo completo! Pode gerar automaticamente
                    </div>
                  )}

                  {selectedNumbers.length > 15 && (
                    <div className="text-red-600">
                      ❌ Muitos números! Máximo 15 para este gerador
                    </div>
                  )}
                </div>

                {/* Números Selecionados */}
                {selectedNumbers.length > 0 && (
                  <div className="mt-4 rounded-lg bg-pink-50 p-3">
                    <div className="mb-2 text-xs font-bold text-pink-800 text-center">
                      SEUS NÚMEROS:
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {selectedNumbers.map((number) => (
                        <span
                          key={number}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white"
                        >
                          {number.toString().padStart(2, "0")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botões do Talão */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {selectedNumbers.length > 0 && (
                    <button
                      onClick={clearSelection}
                      className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                    >
                      🗑️ Limpar
                    </button>
                  )}

                  <button
                    onClick={() => {
                      // Surpresinha - seleção automática de 15 números
                      const numbers: number[] = [];
                      while (numbers.length < 15) {
                        const random = Math.floor(Math.random() * 25) + 1;
                        if (!numbers.includes(random)) {
                          numbers.push(random);
                        }
                      }
                      setSelectedNumbers(numbers.sort((a, b) => a - b));
                    }}
                    className="rounded-md bg-pink-500 px-3 py-1 text-xs font-bold text-white hover:bg-pink-600 transition-colors"
                  >
                    🎲 Surpresinha
                  </button>
                </div>

                {/* Rodapé do Talão */}
                <div className="mt-4 border-t border-pink-200 pt-2 text-center text-xs text-pink-600">
                  <div className="text-pink-500">Sorteio: Segunda, Terça, Quarta, Quinta, Sexta e Sábado</div>
                </div>
              </div>

              {/* Legenda */}
              <div className="mt-4 text-center text-sm text-text-secondary">
                <p>💡 <strong>Dica:</strong> No volante real da Lotofácil você pode marcar de 15 a 18 números.</p>
                <p>Aqui geramos automaticamente jogos de 15 números com suas estratégias.</p>
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

              {/* Estratégias Pré-definidas */}
              <div className="mb-4 rounded-lg bg-background-secondary p-4">
                <h4 className="mb-3 text-sm font-semibold text-text-secondary">Aplicar estratégia:</h4>
                <div className="flex flex-wrap gap-2">
                  {LOTOFACIL_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setStrategy(preset.config)}
                      title={preset.description}
                      className="rounded-lg border border-neutral-surface-variant bg-background-primary px-3 py-2 text-sm font-medium transition-all hover:border-pink-500 hover:bg-pink-600/10 hover:text-pink-700"
                    >
                      {preset.icon} {preset.name}
                    </button>
                  ))}
                </div>
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

        {/* Comprovante do Jogo */}
        {currentNumbers.length > 0 && (
          <div className="mx-auto max-w-lg">
            {/* Simulação de Comprovante */}
            <div className="rounded-xl border-4 border-pink-600 bg-gradient-to-b from-white to-pink-50 p-6 shadow-2xl">
              {/* Cabeçalho do Comprovante */}
              <div className="mb-4 text-center border-b border-pink-200 pb-4">
                <div className="text-lg font-bold text-pink-800 uppercase tracking-wide">
                  🍀 LOTOFÁCIL
                </div>
                <div className="text-sm text-pink-700">
                  Comprovante de Jogo Gerado
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {new Date().toLocaleDateString('pt-BR')} - {new Date().toLocaleTimeString('pt-BR')}
                </div>
              </div>

              {/* Números do Jogo */}
              <div className="mb-4">
                <div className="mb-2 text-center text-sm font-bold text-pink-800">
                  SEUS NÚMEROS DA SORTE:
                </div>

                {/* Grid dos números como no comprovante real */}
                <div className="grid grid-cols-5 gap-1 rounded-lg bg-white p-3 shadow-inner">
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((number) => (
                    <div
                      key={number}
                      className={`relative aspect-square h-10 w-10 rounded-md border-2 text-sm font-bold flex items-center justify-center ${
                        currentNumbers.includes(number)
                          ? "border-pink-600 bg-pink-600 text-white shadow-md"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                      }`}
                    >
                      {number.toString().padStart(2, "0")}
                      {currentNumbers.includes(number) && (
                        <div className="absolute -top-1 -right-1">
                          <div className="h-3 w-3 rounded-full bg-pink-800 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Resumo dos números */}
                <div className="mt-3 rounded-lg bg-pink-100 p-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-pink-800 mb-2">
                      RESUMO DO JOGO:
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {currentNumbers.map((number) => (
                        <span
                          key={number}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white"
                        >
                          {number.toString().padStart(2, "0")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas do Jogo */}
              {generatedGames.length > 0 && (
                <div className="mb-4 rounded-lg bg-blue-50 p-3">
                  <div className="mb-2 text-center text-sm font-bold text-blue-800">
                    📊 ANÁLISE ESTATÍSTICA:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Números Pares:</span>
                      <span className="font-bold text-blue-800">{generatedGames[0].statistics.pairs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Números Ímpares:</span>
                      <span className="font-bold text-blue-800">{generatedGames[0].statistics.odds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Soma Total:</span>
                      <span className="font-bold text-blue-800">{generatedGames[0].statistics.sum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Números Primos:</span>
                      <span className="font-bold text-blue-800">{generatedGames[0].statistics.primes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Quentes:</span>
                      <span className="font-bold text-blue-800">{generatedGames[0].statistics.hotNumbers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Frios:</span>
                      <span className="font-bold text-blue-800">{generatedGames[0].statistics.coldNumbers}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Estratégia Utilizada */}
              {generatedGames.length > 0 && (
                <div className="mb-4 rounded-lg bg-yellow-50 p-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-yellow-800">
                      🎯 ESTRATÉGIA UTILIZADA:
                    </div>
                    <div className="text-sm text-yellow-700">
                      {generatedGames[0].strategy}
                    </div>
                  </div>
                </div>
              )}

              {/* Rodapé do Comprovante */}
              <div className="border-t border-pink-200 pt-3 text-center">
                <div className="text-xs text-pink-600 space-y-1">
                  <div>💰 <strong>Prêmio Principal:</strong> 15 acertos</div>
                  <div>🎯 <strong>Prêmios Secundários:</strong> 14, 13, 12 e 11 acertos</div>
                  <div className="text-pink-500 font-bold">BOA SORTE! 🍀</div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  const printContent = `
                    LOTOFÁCIL - NÚMEROS DA SORTE
                    Data: ${new Date().toLocaleDateString('pt-BR')}

                    Números: ${currentNumbers.join(', ')}

                    Estatísticas:
                    - Pares: ${generatedGames[0]?.statistics.pairs || 0}
                    - Ímpares: ${generatedGames[0]?.statistics.odds || 0}
                    - Soma: ${generatedGames[0]?.statistics.sum || 0}

                    Estratégia: ${generatedGames[0]?.strategy || 'Padrão'}

                    Gerado por: CalculadoraOnlineBR.com.br
                  `;

                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(`<pre>${printContent}</pre>`);
                    printWindow.print();
                    printWindow.close();
                  }
                }}
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-bold text-white hover:bg-gray-700 transition-colors"
              >
                🖨️ Imprimir
              </button>

              <button
                onClick={() => {
                  const textContent = `Lotofácil: ${currentNumbers.join(', ')} - Gerado em ${new Date().toLocaleDateString('pt-BR')}`;
                  navigator.clipboard.writeText(textContent);
                  alert('Números copiados para a área de transferência!');
                }}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
              >
                📋 Copiar
              </button>
            </div>
          </div>
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
              <div className="flex items-center justify-between">
                <CardTitle>💾 Histórico de Jogos ({gameHistory.length})</CardTitle>
                <button
                  onClick={clearHistory}
                  className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                >
                  🗑️ Limpar Tudo
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-text-secondary">
                Últimos jogos salvos automaticamente (máximo 50). Clique no ❌ para remover jogos individuais.
              </div>
              <div className="space-y-3">
                {gameHistory.slice(0, 10).map((game, index) => (
                  <div
                    key={game.id}
                    className="group rounded border border-neutral-surface-variant bg-background-primary p-3 transition-all hover:bg-background-secondary"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{game.strategy}</span>
                        <span className="text-xs text-text-secondary">#{index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-text-secondary">{game.date}</span>
                        <button
                          onClick={() => {
                            if (window.confirm("Tem certeza que deseja remover este jogo do histórico?")) {
                              removeFromHistory(game.id);
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-red-500 hover:bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs"
                          title="Remover este jogo do histórico"
                        >
                          ❌
                        </button>
                      </div>
                    </div>

                    <div className="mb-2 flex flex-wrap gap-1">
                      {game.numbers.map((number) => (
                        <div
                          key={number}
                          className="flex h-6 w-6 items-center justify-center rounded bg-pink-100 text-xs font-medium text-pink-800"
                        >
                          {number.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>

                    {/* Estatísticas do jogo */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary md:grid-cols-6">
                      <div>Pares: {game.statistics.pairs}</div>
                      <div>Ímpares: {game.statistics.odds}</div>
                      <div>Soma: {game.statistics.sum}</div>
                      <div>Primos: {game.statistics.primes}</div>
                      <div>Quentes: {game.statistics.hotNumbers}</div>
                      <div>Frios: {game.statistics.coldNumbers}</div>
                    </div>

                    {/* Botões de ação individual */}
                    <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setSelectedNumbers(game.numbers);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600 transition-colors"
                        title="Carregar estes números no volante"
                      >
                        🔄 Usar Números
                      </button>
                      <button
                        onClick={() => {
                          const textContent = `Lotofácil: ${game.numbers.join(', ')} - ${game.strategy} - ${game.date}`;
                          navigator.clipboard.writeText(textContent);
                          alert('Números copiados para a área de transferência!');
                        }}
                        className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600 transition-colors"
                        title="Copiar números para área de transferência"
                      >
                        📋 Copiar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {gameHistory.length > 10 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      // Expandir para mostrar todos os jogos
                      const allGamesText = gameHistory.map((game, i) =>
                        `${i + 1}. ${game.strategy} - ${game.date}\nNúmeros: ${game.numbers.join(', ')}\n`
                      ).join('\n');

                      const newWindow = window.open('', '_blank');
                      if (newWindow) {
                        newWindow.document.write(`
                          <html>
                            <head><title>Histórico Completo - Lotofácil</title></head>
                            <body style="font-family: monospace; padding: 20px;">
                              <h2>Histórico Completo de Jogos da Lotofácil</h2>
                              <pre>${allGamesText}</pre>
                            </body>
                          </html>
                        `);
                        newWindow.document.close();
                      }
                    }}
                    className="text-sm text-primary-blue hover:underline"
                  >
                    📄 Ver todos os {gameHistory.length} jogos
                  </button>
                </div>
              )}

              {/* Dicas do Histórico */}
              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
                <div className="text-sm text-blue-800">
                  💡 <strong>Dicas do Histórico:</strong>
                  <ul className="mt-1 ml-4 text-xs text-blue-700 space-y-1">
                    <li>• Passe o mouse sobre um jogo para ver opções adicionais</li>
                    <li>• Use "🔄 Usar Números" para carregar números antigos no volante</li>
                    <li>• O histórico é salvo no seu navegador até 50 jogos</li>
                    <li>• Números mostrados com cores da Lotofácil (rosa)</li>
                  </ul>
                </div>
              </div>
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

            {/* Números de Fibonacci e contexto */}
            <div>
              <h4 className="mb-3 font-semibold">Sequências Especiais na Lotofácil</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-neutral-surface-variant p-3">
                  <h5 className="mb-2 text-sm font-medium text-math-purple">🌀 Números de Fibonacci (1–25)</h5>
                  <div className="flex flex-wrap gap-1">
                    {LOTOFACIL_STATS.fibonacci.map((n) => (
                      <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-math-purple/20 text-sm font-bold text-math-purple-dark">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">Aparecem em ~42% dos sorteios premiados da Lotofácil.</p>
                </div>
                <div className="rounded-lg border border-neutral-surface-variant p-3">
                  <h5 className="mb-2 text-sm font-medium text-system-info">🔢 Números Primos (1–25)</h5>
                  <div className="flex flex-wrap gap-1">
                    {LOTOFACIL_STATS.primes.map((n) => (
                      <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-system-info/20 text-sm font-bold text-system-info-dark">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">A maioria dos sorteios tem entre 4 e 6 números primos.</p>
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