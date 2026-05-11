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
    { title: `Gerador de Mega-Sena Grátis com Estratégias | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Gerador gratuito de Mega-Sena com estratégias inteligentes: análise de frequência, filtros de paridade, soma e consecutivos. Gere jogos equilibrados e salve no histórico.",
    },
    {
      name: "keywords",
      content:
        "gerador mega-sena, números mega sena, estratégias mega-sena, análise estatística mega sena, números quentes frios mega sena, sorteio mega sena, jogo mega sena online",
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
      content: "Gerador de Mega-Sena com Estratégias Inteligentes",
    },
    {
      property: "og:description",
      content:
        "Gerador gratuito de Mega-Sena com estratégias inteligentes: análise de frequência, filtros de paridade, soma e consecutivos. Gere jogos equilibrados e salve no histórico.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    {
      property: "og:image:width",
      content: "512",
    },
    {
      property: "og:image:height",
      content: "512",
    },
    {
      property: "og:image:alt",
      content: "Gerador de Mega-Sena - Interface mostrando números gerados com estratégias",
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
      content: "Gerador de Mega-Sena Grátis 2026 | Estratégias Inteligentes",
    },
    {
      name: "twitter:description",
      content: "Gere números da Mega-Sena GRÁTIS com análise estatística e estratégias avançadas!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Mega-Sena - Interface mostrando números gerados com estratégias",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
    },
  ];
};

interface StrategyPreset {
  name: string;
  icon: string;
  description: string;
  config: GenerationStrategy;
}

const MEGA_SENA_PRESETS: StrategyPreset[] = [
  {
    name: "Equilibrado",
    icon: "🎯",
    description: "Mix de quentes e médios com filtros balanceados — recomendado",
    config: { useFrequency: true, frequencyType: "balanced", controlParity: true, minPairs: 2, maxPairs: 4, controlSum: true, minSum: 150, maxSum: 210, avoidConsecutive: true, maxConsecutive: 2, includePrimes: true, minPrimes: 2, maxPrimes: 4 },
  },
  {
    name: "Só Quentes",
    icon: "🔥",
    description: "Prioriza os números mais sorteados historicamente na Mega-Sena",
    config: { useFrequency: true, frequencyType: "hot", controlParity: true, minPairs: 2, maxPairs: 4, controlSum: true, minSum: 140, maxSum: 215, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 6 },
  },
  {
    name: "Revanche",
    icon: "🧊",
    description: "Números frios — teoria da revanche estatística (menos jogados por outros)",
    config: { useFrequency: true, frequencyType: "cold", controlParity: false, minPairs: 0, maxPairs: 6, controlSum: false, minSum: 21, maxSum: 355, avoidConsecutive: false, maxConsecutive: 6, includePrimes: false, minPrimes: 0, maxPrimes: 6 },
  },
  {
    name: "Alta Soma",
    icon: "⬆️",
    description: "Concentra os 6 números na faixa alta (soma 200–240)",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: true, minPairs: 2, maxPairs: 4, controlSum: true, minSum: 200, maxSum: 240, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 6 },
  },
  {
    name: "Baixa Soma",
    icon: "⬇️",
    description: "Concentra os 6 números na faixa baixa (soma 100–155)",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: true, minPairs: 2, maxPairs: 4, controlSum: true, minSum: 100, maxSum: 155, avoidConsecutive: true, maxConsecutive: 2, includePrimes: false, minPrimes: 0, maxPrimes: 6 },
  },
  {
    name: "Máx. Primos",
    icon: "🔢",
    description: "Maximiza números primos no jogo (4–6 primos entre 2, 3, 5, 7, 11...59)",
    config: { useFrequency: true, frequencyType: "balanced", controlParity: false, minPairs: 0, maxPairs: 6, controlSum: true, minSum: 130, maxSum: 220, avoidConsecutive: true, maxConsecutive: 2, includePrimes: true, minPrimes: 4, maxPrimes: 6 },
  },
  {
    name: "Puro Aleatório",
    icon: "🎲",
    description: "Sem filtros — seleção totalmente aleatória de 6 números entre 1 e 60",
    config: { useFrequency: false, frequencyType: "balanced", controlParity: false, minPairs: 0, maxPairs: 6, controlSum: false, minSum: 21, maxSum: 355, avoidConsecutive: false, maxConsecutive: 6, includePrimes: false, minPrimes: 0, maxPrimes: 6 },
  },
];

// Dados estatísticos da Mega-Sena baseados em análises históricas (Caixa Econômica Federal)
const MEGA_SENA_STATS = {
  numbersFrequency: {
    // Números mais sorteados historicamente
    hot: [10, 5, 53, 25, 60, 40, 23, 22, 20, 33, 37, 42],
    warm: [44, 17, 36, 13, 47, 48, 24, 26, 11, 38, 15, 50],
    cold: [55, 34, 8, 1, 6, 51, 49, 45, 3, 56],
  },
  primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59],
  patterns: {
    minPairs: 2,
    maxPairs: 4,
    idealPairs: [2, 3, 4],
    minSum: 100,
    maxSum: 240,
    idealSum: [150, 210],
    maxConsecutive: 2,
  },
};

interface MegaSenaGame {
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
  minPairs: 2,
  maxPairs: 4,
  controlSum: true,
  minSum: 140,
  maxSum: 220,
  avoidConsecutive: true,
  maxConsecutive: 2,
  includePrimes: true,
  minPrimes: 2,
  maxPrimes: 4,
};

function mergePresetsConfig(presetNames: string[], presets: StrategyPreset[]): GenerationStrategy {
  const selected = presetNames
    .map((name) => presets.find((p) => p.name === name)?.config)
    .filter((c): c is GenerationStrategy => Boolean(c));
  if (selected.length === 0) return defaultStrategy;
  if (selected.length === 1) return selected[0];
  return {
    useFrequency: selected.some((c) => c.useFrequency),
    frequencyType:
      selected.find((c) => c.frequencyType === "hot")?.frequencyType ??
      selected.find((c) => c.frequencyType === "cold")?.frequencyType ??
      "balanced",
    controlParity: selected.some((c) => c.controlParity),
    minPairs: Math.max(...selected.map((c) => c.minPairs)),
    maxPairs: Math.min(...selected.map((c) => c.maxPairs)),
    controlSum: selected.some((c) => c.controlSum),
    minSum: Math.max(...selected.map((c) => c.minSum)),
    maxSum: Math.min(...selected.map((c) => c.maxSum)),
    avoidConsecutive: selected.some((c) => c.avoidConsecutive),
    maxConsecutive: Math.min(...selected.map((c) => c.maxConsecutive)),
    includePrimes: selected.some((c) => c.includePrimes),
    minPrimes: Math.max(...selected.map((c) => c.minPrimes)),
    maxPrimes: Math.min(...selected.map((c) => c.maxPrimes)),
  };
}

export default function GeradorMegaSena() {
  const [generatedGames, setGeneratedGames] = useState<MegaSenaGame[]>([]);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<GenerationStrategy>(defaultStrategy);
  const [activePresets, setActivePresets] = useState<string[]>(["Equilibrado"]);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameHistory, setGameHistory] = useState<MegaSenaGame[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mega-sena-history");
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    }
  }, []);

  const saveToHistory = (game: MegaSenaGame) => {
    const newHistory = [game, ...gameHistory].slice(0, 50);
    setGameHistory(newHistory);
    localStorage.setItem("mega-sena-history", JSON.stringify(newHistory));
  };

  const removeFromHistory = (gameId: string) => {
    const updatedHistory = gameHistory.filter((game) => game.id !== gameId);
    setGameHistory(updatedHistory);
    localStorage.setItem("mega-sena-history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.")) {
      setGameHistory([]);
      localStorage.removeItem("mega-sena-history");
    }
  };

  const generateNumbers = (): number[] => {
    const numbers: number[] = [];
    const available = Array.from({ length: 60 }, (_, i) => i + 1);

    if (strategy.useFrequency) {
      const sourceNumbers =
        strategy.frequencyType === "hot"
          ? [...MEGA_SENA_STATS.numbersFrequency.hot]
          : strategy.frequencyType === "cold"
          ? [...MEGA_SENA_STATS.numbersFrequency.cold]
          : [...MEGA_SENA_STATS.numbersFrequency.hot, ...MEGA_SENA_STATS.numbersFrequency.warm];

      while (numbers.length < 4 && sourceNumbers.length > 0) {
        if (Math.random() < 0.7) {
          const randomIndex = Math.floor(Math.random() * sourceNumbers.length);
          const number = sourceNumbers[randomIndex];
          if (!numbers.includes(number)) {
            numbers.push(number);
          }
        }
        const idx = sourceNumbers.findIndex((n) => numbers.includes(n));
        if (idx !== -1) sourceNumbers.splice(idx, 1);
      }
    }

    while (numbers.length < 6) {
      const remaining = available.filter((n) => !numbers.includes(n));
      const randomNumber = remaining[Math.floor(Math.random() * remaining.length)];
      numbers.push(randomNumber);
    }

    return numbers.sort((a, b) => a - b);
  };

  const validateGame = (numbers: number[]): boolean => {
    const pairs = numbers.filter((n) => n % 2 === 0).length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter((n) => MEGA_SENA_STATS.primes.includes(n)).length;

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

  const calculateStatistics = (numbers: number[]) => {
    const pairs = numbers.filter((n) => n % 2 === 0).length;
    const odds = 6 - pairs;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter((n) => MEGA_SENA_STATS.primes.includes(n)).length;
    const hotNumbers = numbers.filter((n) => MEGA_SENA_STATS.numbersFrequency.hot.includes(n)).length;
    const coldNumbers = numbers.filter((n) => MEGA_SENA_STATS.numbersFrequency.cold.includes(n)).length;

    return { pairs, odds, sum, primes, hotNumbers, coldNumbers };
  };

  const handleGenerateGame = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    let attempts = 0;
    let numbers: number[] = [];

    do {
      numbers = generateNumbers();
      attempts++;
    } while (!validateGame(numbers) && attempts < 100);

    if (selectedNumbers.length > 0) {
      const manualNumbers = selectedNumbers.slice(0, 6);
      const remaining = 6 - manualNumbers.length;
      const generatedNumbers = generateNumbers()
        .filter((n) => !manualNumbers.includes(n))
        .slice(0, remaining);
      numbers = [...manualNumbers, ...generatedNumbers].sort((a, b) => a - b);
    }

    const statistics = calculateStatistics(numbers);
    const strategyName = activePresets.join(" + ");

    const game: MegaSenaGame = {
      id: Date.now().toString(),
      numbers,
      strategy: strategyName,
      date: new Date().toLocaleString("pt-BR"),
      statistics,
    };

    setCurrentNumbers(numbers);
    setGeneratedGames([game, ...generatedGames].slice(0, 10));
    saveToHistory(game);
    setIsGenerating(false);
  };

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  const togglePreset = (presetName: string) => {
    let newActive: string[];
    if (presetName === "Puro Aleatório") {
      newActive = ["Puro Aleatório"];
    } else if (activePresets.includes(presetName)) {
      newActive = activePresets.filter((p) => p !== presetName);
      if (newActive.length === 0) newActive = ["Equilibrado"];
    } else {
      newActive = [...activePresets.filter((p) => p !== "Puro Aleatório"), presetName];
    }
    setActivePresets(newActive);
    setStrategy(mergePresetsConfig(newActive, MEGA_SENA_PRESETS));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast("Copiado! ✓");
    setTimeout(() => setCopyToast(null), 2000);
  };

  const generateMultipleGames = async (count: number) => {
    setIsGenerating(true);
    const newGames: MegaSenaGame[] = [];

    for (let i = 0; i < count; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200));

      let attempts = 0;
      let numbers: number[] = [];

      do {
        numbers = generateNumbers();
        attempts++;
      } while (!validateGame(numbers) && attempts < 50);

      const statistics = calculateStatistics(numbers);
      const game: MegaSenaGame = {
        id: `${Date.now()}-${i}`,
        numbers,
        strategy: activePresets.join(" + "),
        date: new Date().toLocaleString("pt-BR"),
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
            name: "Gerador de Mega-Sena",
            description:
              "Gerador inteligente de números para Mega-Sena com estratégias estatísticas e análise de frequência",
            url: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            featureList: [
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

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Como funcionam as estratégias de números quentes e frios na Mega-Sena?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Números quentes são aqueles que foram sorteados com maior frequência nos concursos históricos da Mega-Sena. Números frios são os menos sorteados. Nossa análise é baseada em dados históricos reais da Caixa Econômica Federal para identificar padrões estatísticos.",
                },
              },
              {
                "@type": "Question",
                name: "Qual é a soma ideal para um jogo de Mega-Sena?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Estatisticamente, a soma dos 6 números de um jogo premiado da Mega-Sena costuma ficar entre 150 e 210. Valores muito extremos (abaixo de 100 ou acima de 240) são menos comuns nos sorteios premiados, embora possam ocorrer.",
                },
              },
              {
                "@type": "Question",
                name: "Quantos números primos devo incluir no meu jogo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A análise histórica da Mega-Sena sugere que a maioria dos jogos premiados contém entre 2 e 4 números primos (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59). Incluir pelo menos 2 primos é uma boa estratégia estatística.",
                },
              },
              {
                "@type": "Question",
                name: "Devo evitar números consecutivos na Mega-Sena?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não é obrigatório evitar consecutivos, mas estatisticamente a maioria dos resultados premiados tem no máximo 2 números consecutivos. Jogos com 4 ou mais números em sequência são historicamente menos frequentes nos resultados.",
                },
              },
              {
                "@type": "Question",
                name: "Essas estratégias garantem que vou ganhar na Mega-Sena?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não! A Mega-Sena é um jogo de azar e nenhuma estratégia garante vitória. As chances de ganhar a sena são de aproximadamente 1 em 50 milhões. Nosso gerador aplica filtros baseados em padrões estatísticos históricos para criar jogos mais equilibrados matematicamente, mas isso não aumenta suas chances reais de ganhar.",
                },
              },
            ],
          }),
        }}
      />

      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
              { "@type": "ListItem", position: 2, name: "Calculadoras", item: "https://www.calculadoraonlinebr.com.br/calculadoras" },
              { "@type": "ListItem", position: 3, name: "Loterias", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias" },
              { "@type": "ListItem", position: 4, name: "Gerador de Mega-Sena", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena" },
            ],
          }),
        }}
      />

      <ResponsiveBreadcrumb
        items={createCalculatorBreadcrumb("loterias", "Gerador de Mega-Sena")}
      />

      <div className="space-y-8 px-3 py-6 sm:px-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            💰 Gerador de Mega-Sena Inteligente
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Gere números para <strong className="text-green-600">Mega-Sena</strong> usando
            estratégias estatísticas avançadas, análise de frequência e filtros matemáticos
            inteligentes.
          </p>
          <div className="inline-block rounded-lg bg-green-600/10 p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              🎯 <strong>Estratégias Inteligentes</strong> • 📊 <strong>Análise Estatística</strong>{" "}
              • 💾 <strong>Histórico Salvo</strong>
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
            {/* Volante da Mega-Sena */}
            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                💰 Volante da Mega-Sena — Marque até 6 números
              </h3>

              {/* Simulação do Talão Real */}
              <div className="mx-auto max-w-xl rounded-xl border-4 border-green-600 bg-gradient-to-b from-white to-green-50 p-6 shadow-2xl">
                {/* Cabeçalho do Talão */}
                <div className="mb-4 text-center">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-green-800">
                    MEGA-SENA
                  </div>
                  <div className="text-xs text-green-700">
                    Marque de 6 a 20 números
                  </div>
                </div>

                {/* Grid 6x10 como no volante real */}
                <div className="mb-4 grid grid-cols-6 gap-1 rounded-lg bg-white p-3 shadow-inner sm:grid-cols-10">
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => toggleNumber(number)}
                      className={`relative aspect-square rounded-md border-2 text-xs font-bold transition-all duration-200 ${
                        selectedNumbers.includes(number)
                          ? "border-green-600 bg-green-100 text-green-800 shadow-md"
                          : "border-gray-300 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50"
                      }`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        {number.toString().padStart(2, "0")}
                      </span>
                      {selectedNumbers.includes(number) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600">
                            <span className="text-xs font-bold text-white">✓</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Informações do Talão */}
                <div className="space-y-2 text-center text-xs text-green-700">
                  <div className="flex justify-between">
                    <span>Números marcados:</span>
                    <span className="font-bold">{selectedNumbers.length}/6</span>
                  </div>

                  {selectedNumbers.length > 0 && selectedNumbers.length < 6 && (
                    <div className="text-orange-600">
                      Marque mais {6 - selectedNumbers.length} número(s)
                    </div>
                  )}

                  {selectedNumbers.length === 6 && (
                    <div className="font-bold text-green-600">
                      ✅ Jogo completo! Pode gerar automaticamente
                    </div>
                  )}

                  {selectedNumbers.length > 6 && (
                    <div className="text-red-600">
                      ❌ Muitos números! Máximo 6 para este gerador
                    </div>
                  )}
                </div>

                {/* Números Selecionados */}
                {selectedNumbers.length > 0 && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3">
                    <div className="mb-2 text-center text-xs font-bold text-green-800">
                      SEUS NÚMEROS:
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {selectedNumbers.map((number) => (
                        <span
                          key={number}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
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
                      className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-red-600"
                    >
                      🗑️ Limpar
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const numbers: number[] = [];
                      while (numbers.length < 6) {
                        const random = Math.floor(Math.random() * 60) + 1;
                        if (!numbers.includes(random)) {
                          numbers.push(random);
                        }
                      }
                      setSelectedNumbers(numbers.sort((a, b) => a - b));
                    }}
                    className="rounded-md bg-green-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-green-600"
                  >
                    🎲 Surpresinha
                  </button>
                </div>

                {/* Rodapé do Talão */}
                <div className="mt-4 border-t border-green-200 pt-2 text-center text-xs text-green-600">
                  <div className="text-green-500">Sorteio: Quarta-feira e Sábado</div>
                </div>
              </div>

              {/* Legenda */}
              <div className="mt-4 text-center text-sm text-text-secondary">
                <p>
                  💡 <strong>Dica:</strong> No volante real da Mega-Sena você pode marcar de 6 a 20
                  números.
                </p>
                <p>Aqui geramos automaticamente jogos de 6 números com suas estratégias.</p>
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
              <div className="mb-4 rounded-lg border border-neutral-surface-variant bg-background-secondary p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">
                    Estratégias{activePresets.length > 1 ? ` (${activePresets.length} combinadas)` : ""}
                  </h4>
                  {activePresets.length > 1 && (
                    <span className="text-xs font-medium text-green-600">
                      🔀 {activePresets.join(" + ")}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {MEGA_SENA_PRESETS.map((preset) => {
                    const isActive = activePresets.includes(preset.name);
                    return (
                      <button
                        key={preset.name}
                        onClick={() => togglePreset(preset.name)}
                        className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "border-green-500 bg-green-600/20 text-green-700 shadow-sm ring-1 ring-green-500/50"
                            : "border-neutral-surface-variant bg-background-primary text-text-primary hover:border-green-400 hover:bg-green-600/10"
                        }`}
                      >
                        {isActive && <span className="text-green-600">✓</span>}
                        <span>{preset.icon}</span>
                        <span>{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 space-y-1">
                  {MEGA_SENA_PRESETS.filter((p) => activePresets.includes(p.name)).map((p) => (
                    <p key={p.name} className="text-xs text-text-secondary">
                      <strong>{p.icon} {p.name}:</strong> {p.description}
                    </p>
                  ))}
                </div>
                {activePresets.length > 1 && (
                  <p className="mt-2 border-t border-neutral-surface-variant pt-2 text-xs text-text-secondary">
                    💡 Combinação ativa — filtros mesclados automaticamente (restrições mais rigorosas prevalecem).
                  </p>
                )}
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
                      className="h-4 w-4 rounded border-neutral-surface-variant"
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
                      className="h-4 w-4 rounded border-neutral-surface-variant"
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
                          max="6"
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
                          max="6"
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
                        className="h-4 w-4 rounded border-neutral-surface-variant"
                      />
                      <span className="font-medium">Controlar Soma Total</span>
                    </label>

                    {strategy.controlSum && (
                      <div className="ml-6 grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-text-secondary">Soma Mín.:</label>
                          <input
                            type="number"
                            min="21"
                            max="355"
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
                            min="21"
                            max="355"
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
                        className="h-4 w-4 rounded border-neutral-surface-variant"
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
                            max="6"
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
                            max="6"
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
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Button
                onClick={handleGenerateGame}
                disabled={isGenerating}
                size="lg"
                className="col-span-2 w-full bg-system-success hover:bg-system-success-dark sm:w-auto"
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
                className="w-full sm:w-auto"
              >
                Gerar 5 Jogos
              </Button>

              <Button
                onClick={() => generateMultipleGames(10)}
                disabled={isGenerating}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Gerar 10 Jogos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comprovante do Jogo */}
        {currentNumbers.length > 0 && (
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-2xl border border-green-500/30 bg-background-secondary shadow-xl">
              {/* Header */}
              <div className="border-b border-green-500/20 bg-green-600/10 px-6 py-4 text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-green-500">
                  💰 Mega-Sena — Jogo Gerado
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
                </div>
              </div>

              {/* Números em destaque */}
              <div className="flex flex-wrap justify-center gap-3 px-6 py-6">
                {currentNumbers.map((number) => (
                  <div
                    key={number}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white shadow-lg ring-2 ring-green-400/30"
                  >
                    {number.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>

              {/* Stats */}
              {generatedGames.length > 0 && (
                <div className="grid grid-cols-3 gap-px border-t border-green-500/20 bg-green-500/10">
                  {[
                    { label: "Pares", value: generatedGames[0].statistics.pairs },
                    { label: "Ímpares", value: generatedGames[0].statistics.odds },
                    { label: "Soma", value: generatedGames[0].statistics.sum },
                    { label: "Primos", value: generatedGames[0].statistics.primes },
                    { label: "🔥 Quentes", value: generatedGames[0].statistics.hotNumbers },
                    { label: "🧊 Frios", value: generatedGames[0].statistics.coldNumbers },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center bg-background-secondary px-3 py-3">
                      <span className="text-lg font-bold text-text-primary">{stat.value}</span>
                      <span className="text-xs text-text-secondary">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Estratégia */}
              {generatedGames.length > 0 && (
                <div className="border-t border-green-500/20 px-6 py-3 text-center">
                  <span className="text-xs text-text-secondary">Estratégia: </span>
                  <span className="text-xs font-semibold text-green-500">{generatedGames[0].strategy}</span>
                </div>
              )}

              {/* Faixas */}
              <div className="border-t border-green-500/20 px-6 py-3 text-center">
                <div className="text-xs text-text-secondary">
                  Sena: 6 acertos · Quina: 5 acertos · Quadra: 4 acertos
                </div>
                <div className="mt-1 text-sm font-bold text-green-500">BOA SORTE! 🍀</div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 border-t border-green-500/20 p-4">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Mega-Sena: ${currentNumbers.join(", ")} — ${generatedGames[0]?.strategy || "Padrão"} — ${new Date().toLocaleDateString("pt-BR")}`
                    )
                  }
                  className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  📋 Copiar Números
                </button>
                <button
                  onClick={() => {
                    const printContent = `MEGA-SENA - NÚMEROS DA SORTE\nData: ${new Date().toLocaleDateString("pt-BR")}\n\nNúmeros: ${currentNumbers.join(", ")}\n\nEstatísticas:\n- Pares: ${generatedGames[0]?.statistics.pairs || 0}\n- Ímpares: ${generatedGames[0]?.statistics.odds || 0}\n- Soma: ${generatedGames[0]?.statistics.sum || 0}\n\nEstratégia: ${generatedGames[0]?.strategy || "Padrão"}\n\nGerado por: CalculadoraOnlineBR.com.br`;
                    const printWindow = window.open("", "_blank");
                    if (printWindow) {
                      printWindow.document.write(`<pre>${printContent}</pre>`);
                      printWindow.print();
                      printWindow.close();
                    }
                  }}
                  className="rounded-lg border border-neutral-surface-variant bg-background-primary px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-background-secondary"
                >
                  🖨️ Imprimir
                </button>
              </div>
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
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white shadow"
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
                  className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-red-600"
                >
                  🗑️ Limpar Tudo
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-text-secondary">
                Últimos jogos salvos automaticamente (máximo 50). Clique no ❌ para remover jogos
                individuais.
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
                            if (
                              window.confirm("Tem certeza que deseja remover este jogo do histórico?")
                            ) {
                              removeFromHistory(game.id);
                            }
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-opacity hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
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
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
                        >
                          {number.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary md:grid-cols-6">
                      <div>Pares: {game.statistics.pairs}</div>
                      <div>Ímpares: {game.statistics.odds}</div>
                      <div>Soma: {game.statistics.sum}</div>
                      <div>Primos: {game.statistics.primes}</div>
                      <div>Quentes: {game.statistics.hotNumbers}</div>
                      <div>Frios: {game.statistics.coldNumbers}</div>
                    </div>

                    <div className="mt-2 flex gap-2 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setSelectedNumbers(game.numbers);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded bg-blue-500 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-600"
                        title="Carregar estes números no volante"
                      >
                        🔄 Usar Números
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(`Mega-Sena: ${game.numbers.join(", ")} - ${game.strategy} - ${game.date}`)
                        }
                        className="rounded bg-green-500 px-2 py-1 text-xs text-white transition-colors hover:bg-green-600"
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
                      const allGamesText = gameHistory
                        .map(
                          (game, i) =>
                            `${i + 1}. ${game.strategy} - ${game.date}\nNúmeros: ${game.numbers.join(", ")}\n`
                        )
                        .join("\n");

                      const newWindow = window.open("", "_blank");
                      if (newWindow) {
                        newWindow.document.write(`
                          <html>
                            <head><title>Histórico Completo - Mega-Sena</title></head>
                            <body style="font-family: monospace; padding: 20px;">
                              <h2>Histórico Completo de Jogos da Mega-Sena</h2>
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

              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="text-sm text-blue-800">
                  💡 <strong>Dicas do Histórico:</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-xs text-blue-700">
                    <li>• Passe o mouse sobre um jogo para ver opções adicionais</li>
                    <li>• Use "🔄 Usar Números" para carregar números antigos no volante</li>
                    <li>• O histórico é salvo no seu navegador até 50 jogos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Informações Estatísticas */}
        <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
          <CardHeader>
            <CardTitle>📊 Análise Estatística da Mega-Sena</CardTitle>
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
                    {MEGA_SENA_STATS.numbersFrequency.hot.map((number) => (
                      <div
                        key={number}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white"
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
                    {MEGA_SENA_STATS.numbersFrequency.warm.map((number) => (
                      <div
                        key={number}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-system-warning/20 text-sm font-medium text-system-warning-dark"
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
                    {MEGA_SENA_STATS.numbersFrequency.cold.map((number) => (
                      <div
                        key={number}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue/20 text-sm font-medium text-primary-blue-dark"
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
                  <div className="text-lg font-bold text-system-success-dark">2-4</div>
                  <div className="text-sm text-text-secondary">Números Pares</div>
                </div>
                <div className="rounded bg-system-info/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-info-dark">150-210</div>
                  <div className="text-sm text-text-secondary">Soma Ideal</div>
                </div>
                <div className="rounded bg-math-purple/10 p-3 text-center">
                  <div className="text-lg font-bold text-math-purple-dark">2-4</div>
                  <div className="text-sm text-text-secondary">Números Primos</div>
                </div>
                <div className="rounded bg-system-warning/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-warning-dark">{'≤'}2</div>
                  <div className="text-sm text-text-secondary">Consecutivos</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes - Gerador de Mega-Sena"
          items={[
            {
              question: "Como funcionam as estratégias de números quentes e frios na Mega-Sena?",
              answer:
                "Números quentes são aqueles que foram sorteados com maior frequência nos concursos históricos da Mega-Sena. Números frios são os menos sorteados. Nossa análise é baseada em dados históricos reais da Caixa Econômica Federal para identificar padrões estatísticos.",
              borderColor: "system-success",
            },
            {
              question: "Qual é a soma ideal para um jogo de Mega-Sena?",
              answer:
                "Estatisticamente, a soma dos 6 números de um jogo premiado da Mega-Sena costuma ficar entre 150 e 210. Valores muito extremos (abaixo de 100 ou acima de 240) são menos comuns nos sorteios premiados, embora possam ocorrer.",
              borderColor: "primary-blue",
            },
            {
              question: "Quantos números primos devo incluir no meu jogo?",
              answer:
                "A análise histórica da Mega-Sena sugere que a maioria dos jogos premiados contém entre 2 e 4 números primos (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59). Incluir pelo menos 2 primos é uma boa estratégia estatística.",
              borderColor: "system-info",
            },
            {
              question: "Devo evitar números consecutivos na Mega-Sena?",
              answer:
                "Não é obrigatório evitar consecutivos, mas estatisticamente a maioria dos resultados premiados tem no máximo 2 números consecutivos. Jogos com 4 ou mais números em sequência são historicamente menos frequentes nos resultados.",
              borderColor: "system-warning",
            },
            {
              question: "Essas estratégias garantem que vou ganhar na Mega-Sena?",
              answer:
                "Não! A Mega-Sena é um jogo de azar e nenhuma estratégia garante vitória. As chances de ganhar a sena são de aproximadamente 1 em 50 milhões. Nosso gerador aplica filtros baseados em padrões estatísticos históricos para criar jogos mais 'equilibrados' matematicamente, mas isso não aumenta suas chances reais de ganhar.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica para Uso Responsável",
            content:
              "<strong>Jogue com responsabilidade:</strong> A Mega-Sena é entretenimento, não investimento. Estabeleça um limite de gastos mensal e nunca aposte mais do que pode perder. Use nosso gerador como ferramenta de diversão e estudo estatístico.",
          }}
          footerText="<strong>Lembre-se:</strong> Este gerador é uma ferramenta educativa para estudo de padrões estatísticos. O resultado das loterias é sempre aleatório e imprevisível."
        />

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-mega-sena" />
      </div>

      {/* Toast de cópia */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          {copyToast}
        </div>
      )}
    </div>
  );
}
