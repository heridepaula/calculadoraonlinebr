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
    { title: `Gerador de Mega-Sena Gratis 2025 | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Gere numeros da sorte para Mega-Sena com analise de frequencia, filtros matematicos e estrategias estatisticas. Historico de jogos e geracao inteligente.",
    },
    {
      name: "keywords",
      content:
        "gerador mega-sena, numeros mega-sena, estrategias mega-sena, analise estatistica loteria, numeros quentes frios, fechamento mega-sena, desdobramento loteria",
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
      content: "Gerador de Mega-Sena com Estrategias Inteligentes",
    },
    {
      property: "og:description",
      content:
        "Gere numeros da sorte para Mega-Sena com analise de frequencia, filtros matematicos e estrategias estatisticas. Historico de jogos e geracao inteligente.",
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
      content: "https://www.calculadoraonlinebr.com.br/og-images/gerador-mega-sena.jpg",
    },
    {
      property: "og:image:alt",
      content: "Gerador de Mega-Sena - Interface mostrando numeros gerados com estrategias",
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
      content: "Gerador de Mega-Sena Gratis 2025 | Estrategias Inteligentes",
    },
    {
      name: "twitter:description",
      content: "Gere numeros da Mega-Sena GRATIS com analise estatistica e estrategias avancadas!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/gerador-mega-sena.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Mega-Sena - Interface mostrando numeros gerados com estrategias",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
    },
  ];
};

// Dados estatisticos da Mega-Sena baseados em analises historicas
const MEGA_SENA_STATS = {
  numbersFrequency: {
    // Numeros mais sorteados (baseado em dados historicos)
    hot: [4, 5, 10, 23, 33, 37, 42, 43, 53, 54],
    warm: [3, 7, 12, 16, 21, 24, 29, 36, 47, 56],
    cold: [1, 6, 13, 15, 19, 28, 34, 41, 50, 60],
  },
  primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59],
  patterns: {
    minPairs: 2,
    maxPairs: 4,
    idealPairs: [2, 3, 4],
    minSum: 120,
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
  minSum: 130,
  maxSum: 230,
  avoidConsecutive: true,
  maxConsecutive: 2,
  includePrimes: true,
  minPrimes: 2,
  maxPrimes: 4,
};

export default function GeradorMegaSena() {
  const [generatedGames, setGeneratedGames] = useState<MegaSenaGame[]>([]);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<GenerationStrategy>(defaultStrategy);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameHistory, setGameHistory] = useState<MegaSenaGame[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // Carregar histÃ³rico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mega-sena-history");
    if (saved) {
      try {
        setGameHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Erro ao carregar histÃ³rico:", error);
      }
    }
  }, []);

  // Salvar histÃ³rico no localStorage
  const saveToHistory = (game: MegaSenaGame) => {
    const newHistory = [game, ...gameHistory].slice(0, 50); // Limitar a 50 jogos
    setGameHistory(newHistory);
    localStorage.setItem("mega-sena-history", JSON.stringify(newHistory));
  };

  // Remover item do histÃ³rico
  const removeFromHistory = (gameId: string) => {
    const updatedHistory = gameHistory.filter((game) => game.id !== gameId);
    setGameHistory(updatedHistory);
    localStorage.setItem("mega-sena-history", JSON.stringify(updatedHistory));
  };

  // Limpar todo o histÃ³rico
  const clearHistory = () => {
    if (
      window.confirm(
        "Tem certeza que deseja apagar todo o histÃ³rico? Esta aÃ§Ã£o nÃ£o pode ser desfeita."
      )
    ) {
      setGameHistory([]);
      localStorage.removeItem("mega-sena-history");
    }
  };

  // FunÃ§Ã£o para gerar nÃºmeros aleatÃ³rios baseados na estratÃ©gia
  const generateNumbers = (): number[] => {
    const numbers: number[] = [];
    const available = Array.from({ length: 60 }, (_, i) => i + 1);

    // Aplicar filtros de frequÃªncia se habilitado
    if (strategy.useFrequency) {
      const sourceNumbers =
        strategy.frequencyType === "hot"
          ? MEGA_SENA_STATS.numbersFrequency.hot
          : strategy.frequencyType === "cold"
            ? MEGA_SENA_STATS.numbersFrequency.cold
            : [...MEGA_SENA_STATS.numbersFrequency.hot, ...MEGA_SENA_STATS.numbersFrequency.warm];

      // Priorizar nÃºmeros da estratÃ©gia (70% de chance)
      while (numbers.length < 4 && sourceNumbers.length > 0) {
        if (Math.random() < 0.7) {
          const randomIndex = Math.floor(Math.random() * sourceNumbers.length);
          const number = sourceNumbers[randomIndex];
          if (!numbers.includes(number)) {
            numbers.push(number);
          }
        }
        sourceNumbers.splice(
          sourceNumbers.findIndex((n) => numbers.includes(n)),
          1
        );
      }
    }

    // Completar com nÃºmeros aleatÃ³rios
    while (numbers.length < 6) {
      const remaining = available.filter((n) => !numbers.includes(n));
      const randomNumber = remaining[Math.floor(Math.random() * remaining.length)];
      numbers.push(randomNumber);
    }

    return numbers.sort((a, b) => a - b);
  };

  // Verificar se o jogo atende aos critÃ©rios da estratÃ©gia
  const validateGame = (numbers: number[]): boolean => {
    const pairs = numbers.filter((n) => n % 2 === 0).length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter((n) => MEGA_SENA_STATS.primes.includes(n)).length;

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

  // Calcular estatÃ­sticas do jogo
  const calculateStatistics = (numbers: number[]) => {
    const pairs = numbers.filter((n) => n % 2 === 0).length;
    const odds = 6 - pairs;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter((n) => MEGA_SENA_STATS.primes.includes(n)).length;
    const hotNumbers = numbers.filter((n) =>
      MEGA_SENA_STATS.numbersFrequency.hot.includes(n)
    ).length;
    const coldNumbers = numbers.filter((n) =>
      MEGA_SENA_STATS.numbersFrequency.cold.includes(n)
    ).length;

    return { pairs, odds, sum, primes, hotNumbers, coldNumbers };
  };

  // Gerar um jogo
  const handleGenerateGame = async () => {
    setIsGenerating(true);

    // Simular tempo de processamento para melhor UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    let attempts = 0;
    let numbers: number[] = [];

    // Tentar gerar um jogo vÃ¡lido (mÃ¡ximo 100 tentativas)
    do {
      numbers = generateNumbers();
      attempts++;
    } while (!validateGame(numbers) && attempts < 100);

    if (selectedNumbers.length > 0) {
      // Incluir nÃºmeros selecionados manualmente
      const manualNumbers = selectedNumbers.slice(0, 6);
      const remaining = 6 - manualNumbers.length;
      const generatedNumbers = generateNumbers()
        .filter((n) => !manualNumbers.includes(n))
        .slice(0, remaining);
      numbers = [...manualNumbers, ...generatedNumbers].sort((a, b) => a - b);
    }

    const statistics = calculateStatistics(numbers);
    const strategyName = strategy.useFrequency
      ? `FrequÃªncia ${strategy.frequencyType === "hot" ? "Quente" : strategy.frequencyType === "cold" ? "Fria" : "Equilibrada"}`
      : "AleatÃ³rio";

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

  // Toggle nÃºmero selecionado manualmente
  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  // Limpar seleÃ§Ã£o manual
  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  // Gerar mÃºltiplos jogos
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
        strategy: strategy.useFrequency
          ? `FrequÃªncia ${strategy.frequencyType === "hot" ? "Quente" : strategy.frequencyType === "cold" ? "Fria" : "Equilibrada"}`
          : "AleatÃ³rio",
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
              "Gerador inteligente de nÃºmeros para Mega-Sena com estratÃ©gias estatÃ­sticas e anÃ¡lise de frequÃªncia",
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
              "AnÃ¡lise de frequÃªncia de nÃºmeros",
              "Filtros matemÃ¡ticos avanÃ§ados",
              "Controle de paridade (pares/Ã­mpares)",
              "EstratÃ©gias estatÃ­sticas",
              "HistÃ³rico de jogos",
              "SeleÃ§Ã£o manual de nÃºmeros",
              "GeraÃ§Ã£o em lote",
            ],
          }),
        }}
      />

      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb
        items={createCalculatorBreadcrumb("loterias", "Gerador de Mega-Sena")}
      />

      <div className="space-y-8 px-3 py-6 sm:px-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            ðŸ€ Gerador de Mega-Sena Inteligente
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Gere nÃºmeros para <strong className="text-system-success-dark">Mega-Sena</strong> usando
            estratÃ©gias estatÃ­sticas avanÃ§adas, anÃ¡lise de frequÃªncia e filtros matemÃ¡ticos
            inteligentes.
          </p>
          <div className="inline-block rounded-lg bg-system-success/10 p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              ðŸŽ¯ <strong>EstratÃ©gias Inteligentes</strong> â€¢ ðŸ“Š <strong>AnÃ¡lise EstatÃ­stica</strong>{" "}
              â€¢ ðŸ’¾ <strong>HistÃ³rico Salvo</strong>
            </p>
          </div>
        </header>

        {/* Gerador Principal */}
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">ðŸŽ°</span>
              Gerador Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Volante da Mega-Sena */}
            <div>
              <h3 className="mb-4 text-center text-lg font-semibold">
                ðŸ€ Volante da Mega-Sena - Marque 6 numeros
              </h3>

              {/* SimulaÃ§Ã£o do TalÃ£o Real */}
              <div className="mx-auto max-w-4xl rounded-xl border-4 border-pink-600 bg-gradient-to-b from-white to-pink-50 p-6 shadow-2xl">
                {/* CabeÃ§alho do TalÃ£o */}
                <div className="mb-4 text-center">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-pink-800">
                    MEGA-SENA
                  </div>
                  <div className="text-xs text-pink-700">Marque 6 numeros</div>
                </div>

                {/* Grid 5x5 como no volante real */}
                <div className="mb-4 grid grid-cols-6 gap-1 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-12 rounded-lg bg-white p-3 shadow-inner">
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => toggleNumber(number)}
                      className={`relative aspect-square h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-md border-2 text-sm font-bold transition-all duration-200 ${
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
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600">
                            <span className="text-lg font-bold text-white">âœ“</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* InformaÃ§Ãµes do TalÃ£o */}
                <div className="space-y-2 text-center text-xs text-pink-700">
                  <div className="flex justify-between">
                    <span>NÃºmeros marcados:</span>
                    <span className="font-bold">{selectedNumbers.length}/6</span>
                  </div>

                  {selectedNumbers.length > 0 && selectedNumbers.length < 6 && (
                    <div className="text-orange-600">
                      Marque mais {6 - selectedNumbers.length} numero(s)
                    </div>
                  )}

                  {selectedNumbers.length === 6 && (
                    <div className="font-bold text-pink-600">
                      âœ… Jogo completo! Pode gerar automaticamente
                    </div>
                  )}

                  {selectedNumbers.length > 6 && (
                    <div className="text-red-600">
                      âŒ Muitos nÃºmeros! Maximo 6 para este gerador
                    </div>
                  )}
                </div>

                {/* NÃºmeros Selecionados */}
                {selectedNumbers.length > 0 && (
                  <div className="mt-4 rounded-lg bg-pink-50 p-3">
                    <div className="mb-2 text-center text-xs font-bold text-pink-800">
                      SEUS NÃšMEROS:
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

                {/* BotÃµes do TalÃ£o */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {selectedNumbers.length > 0 && (
                    <button
                      onClick={clearSelection}
                      className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-red-600"
                    >
                      ðŸ—‘ï¸ Limpar
                    </button>
                  )}

                  <button
                    onClick={() => {
                      // Surpresinha - selecao automatica de 6 numeros
                      const numbers: number[] = [];
                      while (numbers.length < 6) {
                        const random = Math.floor(Math.random() * 60) + 1;
                        if (!numbers.includes(random)) {
                          numbers.push(random);
                        }
                      }
                      setSelectedNumbers(numbers.sort((a, b) => a - b));
                    }}
                    className="rounded-md bg-pink-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-pink-600"
                  >
                    ðŸŽ² Surpresinha
                  </button>
                </div>

                {/* RodapÃ© do TalÃ£o */}
                <div className="mt-4 border-t border-pink-200 pt-2 text-center text-xs text-pink-600">
                  <div>ðŸ’° PrÃªmio estimado: R$ 1.700.000,00</div>
                  <div className="text-pink-500">
                    Sorteio: Segunda, TerÃ§a, Quarta, Quinta, Sexta e SÃ¡bado
                  </div>
                </div>
              </div>

              {/* Legenda */}
              <div className="mt-4 text-center text-sm text-text-secondary">
                <p>
                  ðŸ’¡ <strong>Dica:</strong> No volante real da Mega-Sena vocÃª pode marcar de 6 a 15
                  nÃºmeros.
                </p>
                <p>Aqui geramos automaticamente jogos de 6 numeros com suas estratÃ©gias.</p>
              </div>
            </div>

            {/* ConfiguraÃ§Ãµes da EstratÃ©gia */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">EstratÃ©gias</h3>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-primary-blue hover:underline"
                >
                  {showAdvanced ? "Ocultar" : "Mostrar"} AvanÃ§adas
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* AnÃ¡lise de FrequÃªncia */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={strategy.useFrequency}
                      onChange={(e) => setStrategy({ ...strategy, useFrequency: e.target.checked })}
                      className="rounded border-neutral-surface-variant"
                    />
                    <span className="font-medium">Usar AnÃ¡lise de FrequÃªncia</span>
                  </label>

                  {strategy.useFrequency && (
                    <div className="ml-6 space-y-2">
                      <label className="block text-sm font-medium">Tipo de FrequÃªncia:</label>
                      <select
                        value={strategy.frequencyType}
                        onChange={(e) =>
                          setStrategy({
                            ...strategy,
                            frequencyType: e.target.value as "hot" | "balanced" | "cold",
                          })
                        }
                        className="bg-background-primary w-full rounded-lg border border-neutral-surface-variant p-2"
                      >
                        <option value="hot">NÃºmeros Quentes (mais sorteados)</option>
                        <option value="balanced">Equilibrado (quentes + mÃ©dios)</option>
                        <option value="cold">NÃºmeros Frios (menos sorteados)</option>
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
                    <span className="font-medium">Controlar Pares/Ãmpares</span>
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
                          className="bg-background-primary w-full rounded border border-neutral-surface-variant p-1 text-sm"
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
                          className="bg-background-primary w-full rounded border border-neutral-surface-variant p-1 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ConfiguraÃ§Ãµes AvanÃ§adas */}
              {showAdvanced && (
                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-neutral-surface-variant pt-4 md:grid-cols-2">
                  {/* Controle de Soma */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={strategy.controlSum}
                        onChange={(e) => setStrategy({ ...strategy, controlSum: e.target.checked })}
                        className="rounded border-neutral-surface-variant"
                      />
                      <span className="font-medium">Controlar Soma Total</span>
                    </label>

                    {strategy.controlSum && (
                      <div className="ml-6 grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-text-secondary">Soma MÃ­n.:</label>
                          <input
                            type="number"
                            min="120"
                            max="240"
                            value={strategy.minSum}
                            onChange={(e) =>
                              setStrategy({ ...strategy, minSum: parseInt(e.target.value) })
                            }
                            className="bg-background-primary w-full rounded border border-neutral-surface-variant p-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-text-secondary">Soma MÃ¡x.:</label>
                          <input
                            type="number"
                            min="120"
                            max="240"
                            value={strategy.maxSum}
                            onChange={(e) =>
                              setStrategy({ ...strategy, maxSum: parseInt(e.target.value) })
                            }
                            className="bg-background-primary w-full rounded border border-neutral-surface-variant p-1 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* NÃºmeros Primos */}
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
                      <span className="font-medium">Controlar NÃºmeros Primos</span>
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
                            className="bg-background-primary w-full rounded border border-neutral-surface-variant p-1 text-sm"
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
                            className="bg-background-primary w-full rounded border border-neutral-surface-variant p-1 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* BotÃµes de GeraÃ§Ã£o */}
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
                  "ðŸŽ² Gerar 1 Jogo"
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
          <div className="mx-auto max-w-4xl">
            {/* SimulaÃ§Ã£o de Comprovante */}
            <div className="rounded-xl border-4 border-pink-600 bg-gradient-to-b from-white to-pink-50 p-6 shadow-2xl">
              {/* CabeÃ§alho do Comprovante */}
              <div className="mb-4 border-b border-pink-200 pb-4 text-center">
                <div className="text-lg font-bold uppercase tracking-wide text-pink-800">
                  ðŸ€ MEGA-SENA
                </div>
                <div className="text-sm text-pink-700">Comprovante de Jogo Gerado</div>
                <div className="mt-1 text-xs text-gray-600">
                  {new Date().toLocaleDateString("pt-BR")} -{" "}
                  {new Date().toLocaleTimeString("pt-BR")}
                </div>
              </div>

              {/* NÃºmeros do Jogo */}
              <div className="mb-4">
                <div className="mb-2 text-center text-sm font-bold text-pink-800">
                  SEUS NÃšMEROS DA SORTE:
                </div>

                {/* Grid dos nÃºmeros como no comprovante real */}
                <div className="grid grid-cols-6 gap-1 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-12 rounded-lg bg-white p-3 shadow-inner">
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => (
                    <div
                      key={number}
                      className={`relative flex aspect-square h-10 w-10 items-center justify-center rounded-md border-2 text-sm font-bold ${
                        currentNumbers.includes(number)
                          ? "border-pink-600 bg-pink-600 text-white shadow-md"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                      }`}
                    >
                      {number.toString().padStart(2, "0")}
                      {currentNumbers.includes(number) && (
                        <div className="absolute -right-1 -top-1">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-pink-800">
                            <span className="text-xs text-white">âœ“</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Resumo dos nÃºmeros */}
                <div className="mt-3 rounded-lg bg-pink-100 p-3">
                  <div className="text-center">
                    <div className="mb-2 text-sm font-bold text-pink-800">RESUMO DO JOGO:</div>
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

              {/* EstatÃ­sticas do Jogo */}
              {generatedGames.length > 0 && (
                <div className="mb-4 rounded-lg bg-blue-50 p-3">
                  <div className="mb-2 text-center text-sm font-bold text-blue-800">
                    ðŸ“Š ANÃLISE ESTATÃSTICA:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-700">NÃºmeros Pares:</span>
                      <span className="font-bold text-blue-800">
                        {generatedGames[0].statistics.pairs}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">NÃºmeros Ãmpares:</span>
                      <span className="font-bold text-blue-800">
                        {generatedGames[0].statistics.odds}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Soma Total:</span>
                      <span className="font-bold text-blue-800">
                        {generatedGames[0].statistics.sum}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">NÃºmeros Primos:</span>
                      <span className="font-bold text-blue-800">
                        {generatedGames[0].statistics.primes}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Quentes:</span>
                      <span className="font-bold text-blue-800">
                        {generatedGames[0].statistics.hotNumbers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Frios:</span>
                      <span className="font-bold text-blue-800">
                        {generatedGames[0].statistics.coldNumbers}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* EstratÃ©gia Utilizada */}
              {generatedGames.length > 0 && (
                <div className="mb-4 rounded-lg bg-yellow-50 p-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-yellow-800">
                      ðŸŽ¯ ESTRATÃ‰GIA UTILIZADA:
                    </div>
                    <div className="text-sm text-yellow-700">{generatedGames[0].strategy}</div>
                  </div>
                </div>
              )}

              {/* RodapÃ© do Comprovante */}
              <div className="border-t border-pink-200 pt-3 text-center">
                <div className="space-y-1 text-xs text-pink-600">
                  <div>
                    ðŸ’° <strong>Premio Principal:</strong> 6 acertos
                  </div>
                  <div>
                    ðŸŽ¯ <strong>Premios Secundarios:</strong> 5 e 4 acertos
                  </div>
                  <div className="font-bold text-pink-500">BOA SORTE! ðŸ€</div>
                </div>
              </div>
            </div>

            {/* BotÃµes de AÃ§Ã£o */}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  const printContent = `
                    MEGA-SENA - NÃšMEROS DA SORTE
                    Data: ${new Date().toLocaleDateString("pt-BR")}

                    NÃºmeros: ${currentNumbers.join(", ")}

                    EstatÃ­sticas:
                    - Pares: ${generatedGames[0]?.statistics.pairs || 0}
                    - Ãmpares: ${generatedGames[0]?.statistics.odds || 0}
                    - Soma: ${generatedGames[0]?.statistics.sum || 0}

                    EstratÃ©gia: ${generatedGames[0]?.strategy || "PadrÃ£o"}

                    Gerado por: CalculadoraOnlineBR.com.br
                  `;

                  const printWindow = window.open("", "_blank");
                  if (printWindow) {
                    printWindow.document.write(`<pre>${printContent}</pre>`);
                    printWindow.print();
                    printWindow.close();
                  }
                }}
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-700"
              >
                ðŸ–¨ï¸ Imprimir
              </button>

              <button
                onClick={() => {
                  const textContent = `Mega-Sena: ${currentNumbers.join(", ")} - Gerado em ${new Date().toLocaleDateString("pt-BR")}`;
                  navigator.clipboard.writeText(textContent);
                  alert("NÃºmeros copiados para a Ã¡rea de transferÃªncia!");
                }}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                ðŸ“‹ Copiar
              </button>
            </div>
          </div>
        )}

        {/* Jogos Gerados */}
        {generatedGames.length > 0 && (
          <Card className="mx-auto max-w-6xl">
            <CardHeader>
              <CardTitle>ðŸ“ Jogos da SessÃ£o Atual ({generatedGames.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedGames.map((game, index) => (
                  <div
                    key={game.id}
                    className="bg-background-secondary rounded-lg border border-neutral-surface-variant p-4"
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
                      <div>Ãmpares: {game.statistics.odds}</div>
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

        {/* HistÃ³rico Salvo */}
        {gameHistory.length > 0 && (
          <Card className="mx-auto max-w-6xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ðŸ’¾ HistÃ³rico de Jogos ({gameHistory.length})</CardTitle>
                <button
                  onClick={clearHistory}
                  className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-red-600"
                >
                  ðŸ—‘ï¸ Limpar Tudo
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-text-secondary">
                Ãšltimos jogos salvos automaticamente (mÃ¡ximo 50). Clique no âŒ para remover jogos
                individuais.
              </div>
              <div className="space-y-3">
                {gameHistory.slice(0, 10).map((game, index) => (
                  <div
                    key={game.id}
                    className="bg-background-primary hover:bg-background-secondary group rounded border border-neutral-surface-variant p-3 transition-all"
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
                              window.confirm(
                                "Tem certeza que deseja remover este jogo do histÃ³rico?"
                              )
                            ) {
                              removeFromHistory(game.id);
                            }
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                          title="Remover este jogo do histÃ³rico"
                        >
                          âŒ
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

                    {/* EstatÃ­sticas do jogo */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary md:grid-cols-6">
                      <div>Pares: {game.statistics.pairs}</div>
                      <div>Ãmpares: {game.statistics.odds}</div>
                      <div>Soma: {game.statistics.sum}</div>
                      <div>Primos: {game.statistics.primes}</div>
                      <div>Quentes: {game.statistics.hotNumbers}</div>
                      <div>Frios: {game.statistics.coldNumbers}</div>
                    </div>

                    {/* BotÃµes de aÃ§Ã£o individual */}
                    <div className="mt-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setSelectedNumbers(game.numbers);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded bg-blue-500 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-600"
                        title="Carregar estes nÃºmeros no volante"
                      >
                        ðŸ”„ Usar NÃºmeros
                      </button>
                      <button
                        onClick={() => {
                          const textContent = `Mega-Sena: ${game.numbers.join(", ")} - ${game.strategy} - ${game.date}`;
                          navigator.clipboard.writeText(textContent);
                          alert("NÃºmeros copiados para a Ã¡rea de transferÃªncia!");
                        }}
                        className="rounded bg-green-500 px-2 py-1 text-xs text-white transition-colors hover:bg-green-600"
                        title="Copiar nÃºmeros para Ã¡rea de transferÃªncia"
                      >
                        ðŸ“‹ Copiar
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
                      const allGamesText = gameHistory
                        .map(
                          (game, i) =>
                            `${i + 1}. ${game.strategy} - ${game.date}\nNÃºmeros: ${game.numbers.join(", ")}\n`
                        )
                        .join("\n");

                      const newWindow = window.open("", "_blank");
                      if (newWindow) {
                        newWindow.document.write(`
                          <html>
                            <head><title>HistÃ³rico Completo - Mega-Sena</title></head>
                            <body style="font-family: monospace; padding: 20px;">
                              <h2>HistÃ³rico Completo de Jogos da Mega-Sena</h2>
                              <pre>${allGamesText}</pre>
                            </body>
                          </html>
                        `);
                        newWindow.document.close();
                      }
                    }}
                    className="text-sm text-primary-blue hover:underline"
                  >
                    ðŸ“„ Ver todos os {gameHistory.length} jogos
                  </button>
                </div>
              )}

              {/* Dicas do HistÃ³rico */}
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="text-sm text-blue-800">
                  ðŸ’¡ <strong>Dicas do HistÃ³rico:</strong>
                  <ul className="ml-4 mt-1 space-y-1 text-xs text-blue-700">
                    <li>â€¢ Passe o mouse sobre um jogo para ver opÃ§Ãµes adicionais</li>
                    <li>â€¢ Use "ðŸ”„ Usar NÃºmeros" para carregar nÃºmeros antigos no volante</li>
                    <li>â€¢ O histÃ³rico Ã© salvo no seu navegador atÃ© 50 jogos</li>
                    <li>â€¢ NÃºmeros mostrados com cores da Mega-Sena (verde)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* InformaÃ§Ãµes EstatÃ­sticas */}
        <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
          <CardHeader>
            <CardTitle>ðŸ“Š AnÃ¡lise EstatÃ­stica da Mega-Sena</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* NÃºmeros por FrequÃªncia */}
            <div>
              <h4 className="mb-3 font-semibold">FrequÃªncia HistÃ³rica de NÃºmeros</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <h5 className="mb-2 text-sm font-medium text-system-error">
                    ðŸ”¥ NÃºmeros Quentes (mais sorteados)
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {MEGA_SENA_STATS.numbersFrequency.hot.map((number) => (
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
                    ðŸŒ¡ï¸ NÃºmeros MÃ©dios
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {MEGA_SENA_STATS.numbersFrequency.warm.map((number) => (
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
                    ðŸ§Š NÃºmeros Frios (menos sorteados)
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {MEGA_SENA_STATS.numbersFrequency.cold.map((number) => (
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

            {/* PadrÃµes MatemÃ¡ticos */}
            <div>
              <h4 className="mb-3 font-semibold">PadrÃµes MatemÃ¡ticos Ideais</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded bg-system-success/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-success-dark">2-4</div>
                  <div className="text-sm text-text-secondary">NÃºmeros Pares</div>
                </div>
                <div className="rounded bg-system-info/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-info-dark">150-210</div>
                  <div className="text-sm text-text-secondary">Soma Ideal</div>
                </div>
                <div className="rounded bg-math-purple/10 p-3 text-center">
                  <div className="text-lg font-bold text-math-purple-dark">2-4</div>
                  <div className="text-sm text-text-secondary">NÃºmeros Primos</div>
                </div>
                <div className="rounded bg-system-warning/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-warning-dark">{'<='} 2</div>
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
              question: "Como funcionam as estratÃ©gias de nÃºmeros quentes e frios?",
              answer:
                "NÃºmeros quentes sÃ£o aqueles que foram sorteados com maior frequÃªncia nos Ãºltimos concursos. NÃºmeros frios sÃ£o os menos sorteados. Nossa anÃ¡lise Ã© baseada em dados histÃ³ricos reais da Mega-Sena para identificar padrÃµes estatÃ­sticos.",
              borderColor: "system-success",
            },
            {
              question: "O que significa controlar a paridade dos nÃºmeros?",
              answer:
                "Paridade refere-se ao equilÃ­brio entre nÃºmeros pares e Ã­mpares. Estatisticamente, a maioria dos sorteios da Mega-Sena tem entre 2-4 nÃºmeros pares e 7-9 Ã­mpares. Controlar isso pode melhorar a qualidade estatÃ­stica do jogo.",
              borderColor: "primary-blue",
            },
            {
              question: "Por que a soma dos nÃºmeros Ã© importante?",
              answer:
                "A soma total dos 6 numeros de um jogo da Mega-Sena geralmente fica entre 120-240. Valores muito baixos ou muito altos sÃ£o estatisticamente menos provÃ¡veis, entÃ£o controlar a soma pode ser uma estratÃ©gia interessante.",
              borderColor: "system-info",
            },
            {
              question: "O histÃ³rico de jogos fica salvo permanentemente?",
              answer:
                "O histÃ³rico fica salvo no seu navegador (localStorage) e permanece atÃ© vocÃª limpar os dados do navegador. Recomendamos anotar ou imprimir os jogos importantes, pois eles podem ser perdidos se os dados do navegador forem apagados.",
              borderColor: "system-warning",
            },
            {
              question: "Essas estratÃ©gias garantem que vou ganhar?",
              answer:
                "NÃ£o! As loterias sÃ£o jogos de sorte e nenhuma estratÃ©gia garante vitÃ³ria. Nosso gerador apenas aplica filtros baseados em padrÃµes estatÃ­sticos histÃ³ricos para criar jogos mais 'equilibrados' matematicamente, mas isso nÃ£o aumenta as chances reais de ganhar.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica para Uso ResponsÃ¡vel",
            content:
              "<strong>Jogue com responsabilidade:</strong> Loterias sÃ£o entretenimento, nÃ£o investimento. EstabeleÃ§a um limite de gastos mensal e nunca aposte mais do que pode perder. Use nosso gerador como ferramenta de diversÃ£o e estudo estatÃ­stico.",
          }}
          footerText="<strong>Lembre-se:</strong> Este gerador Ã© uma ferramenta educativa para estudo de padrÃµes estatÃ­sticos. O resultado das loterias Ã© sempre aleatÃ³rio e imprevisÃ­vel."
        />

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-mega-sena" />
      </div>
    </div>
  );
}












