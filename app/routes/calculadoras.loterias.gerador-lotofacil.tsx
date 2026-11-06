import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Checkbox } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { APP_NAME } from "~/lib/constants";
import {
  buildPresets,
  buildStatsFaq,
  formatDateBR,
  mergePresetsConfig,
  type GenerationStrategy,
} from "~/lib/lotofacil-stats";
import { getLotofacilStats } from "~/services/lotofacil/statistics.server";

// Estatísticas vêm do MongoDB e mudam a cada sorteio novo. O CDN serve a página por até 5 min
// e revalida em segundo plano, então um concurso gravado pelo cron aparece em poucos minutos.
export async function loader() {
  const stats = await getLotofacilStats();
  return json({ stats });
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" };
}

export const meta: MetaFunction = () => {
  return [
    { title: `Gerador de Lotofácil Grátis com Estratégias | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Gerador gratuito de Lotofácil com estratégias inteligentes: análise de frequência, paridade e filtros estatísticos. Gere 15 números equilibrados para Lotofácil agora.",
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
        "Gerador gratuito de Lotofácil com estratégias inteligentes: análise de frequência, paridade e filtros estatísticos. Gere 15 números equilibrados para Lotofácil agora.",
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
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Lotofácil - Interface mostrando números gerados com estratégias",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    },
  ];
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

export default function GeradorLotofacil() {
  const { stats } = useLoaderData<typeof loader>();
  const presets = useMemo(() => buildPresets(stats), [stats]);
  const defaultStrategy = presets[0].config;
  const faqItems = useMemo(() => buildStatsFaq(stats), [stats]);
  const [generatedGames, setGeneratedGames] = useState<LotofacilGame[]>([]);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
  const [strategy, setStrategy] = useState<GenerationStrategy>(presets[0].config);
  const [activePresets, setActivePresets] = useState<string[]>(["Equilibrado"]);
  const [copyToast, setCopyToast] = useState<string | null>(null);
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
      // Cópia: o loop abaixo remove itens da lista e não pode alterar as estatísticas.
      const sourceNumbers =
        strategy.frequencyType === "hot" ? [...stats.hot] :
        strategy.frequencyType === "cold" ? [...stats.cold] :
        [...stats.hot, ...stats.warm];

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
    const primes = numbers.filter(n => stats.primes.includes(n)).length;
    const fibs = numbers.filter(n => stats.fibonacci.includes(n)).length;

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
      (!strategy.includePrimes || (primes >= strategy.minPrimes && primes <= strategy.maxPrimes)) &&
      (!strategy.includeFibonacci || (fibs >= strategy.minFib && fibs <= strategy.maxFib))
    );
  };

  // Calcular estatísticas do jogo
  const calculateStatistics = (numbers: number[]) => {
    const pairs = numbers.filter(n => n % 2 === 0).length;
    const odds = 15 - pairs;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const primes = numbers.filter(n => stats.primes.includes(n)).length;
    const hotNumbers = numbers.filter(n => stats.hot.includes(n)).length;
    const coldNumbers = numbers.filter(n => stats.cold.includes(n)).length;

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
    const strategyName = activePresets.join(" + ");

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
    setStrategy(mergePresetsConfig(newActive, presets, defaultStrategy));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast("Copiado! ✓");
    setTimeout(() => setCopyToast(null), 2000);
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
        strategy: activePresets.join(" + "),
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

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
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
              { "@type": "ListItem", position: 4, name: "Gerador de Lotofácil", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil" },
            ],
          }),
        }}
      />

      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb
        items={createCalculatorBreadcrumb("loterias", "Gerador de Lotofácil")}
      />

      <div className="space-y-8 px-2 py-6 sm:px-6">
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
        <Card padding="none" className="-mx-2 max-w-4xl p-2 sm:mx-auto sm:p-5 lg:p-6">
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
              <div className="mx-auto max-w-lg rounded-xl border-4 border-pink-600 bg-gradient-to-b from-white to-pink-50 p-2 shadow-2xl sm:p-6">
                {/* Cabeçalho do Talão */}
                <div className="mb-4 text-center">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-pink-800">
                    LOTOFÁCIL
                  </div>
                  <div className="text-xs text-pink-700">
                    Marque de 15 a 18 números
                  </div>
                </div>

                {/* Grid 5x5 como no volante real — aspect-square + sm:h-12 sm:w-12 preserva tamanho desktop original */}
                <div className="mb-4 grid grid-cols-5 place-items-center gap-1 rounded-lg bg-white p-2 shadow-inner sm:p-3">
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => toggleNumber(number)}
                      className={`relative aspect-square w-full min-w-0 self-start rounded-md border !p-0 text-xs font-bold !leading-none transition-all duration-200 !min-h-0 sm:h-12 sm:w-12 sm:self-auto sm:border-2 sm:text-sm ${
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
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-600 sm:h-8 sm:w-8">
                            <span className="text-base font-bold text-white sm:text-lg">✓</span>
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
              <div className="mb-4 rounded-lg border border-neutral-surface-variant bg-background-secondary p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">
                    Estratégias{activePresets.length > 1 ? ` (${activePresets.length} combinadas)` : ""}
                  </h4>
                  {activePresets.length > 1 && (
                    <span className="text-xs font-medium text-pink-600">
                      🔀 {activePresets.join(" + ")}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => {
                    const isActive = activePresets.includes(preset.name);
                    return (
                      <button
                        key={preset.name}
                        onClick={() => togglePreset(preset.name)}
                        className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "border-pink-500 bg-pink-600/20 text-pink-700 shadow-sm ring-1 ring-pink-500/50"
                            : "border-neutral-surface-variant bg-background-primary text-text-primary hover:border-pink-400 hover:bg-pink-600/10"
                        }`}
                      >
                        {isActive && <span className="text-pink-600">✓</span>}
                        <span>{preset.icon}</span>
                        <span>{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 space-y-1">
                  {presets.filter((p) => activePresets.includes(p.name)).map((p) => (
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
                  <Checkbox
                    checked={strategy.useFrequency}
                    onChange={(e) =>
                      setStrategy({ ...strategy, useFrequency: e.target.checked })
                    }
                    label="Usar Análise de Frequência"
                    labelClassName="font-medium"
                  />

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
                  <Checkbox
                    checked={strategy.controlParity}
                    onChange={(e) =>
                      setStrategy({ ...strategy, controlParity: e.target.checked })
                    }
                    label="Controlar Pares/Ímpares"
                    labelClassName="font-medium"
                  />

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
                    <Checkbox
                      checked={strategy.controlSum}
                      onChange={(e) =>
                        setStrategy({ ...strategy, controlSum: e.target.checked })
                      }
                      label="Controlar Soma Total"
                      labelClassName="font-medium"
                    />

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
                    <Checkbox
                      checked={strategy.includePrimes}
                      onChange={(e) =>
                        setStrategy({ ...strategy, includePrimes: e.target.checked })
                      }
                      label="Controlar Números Primos"
                      labelClassName="font-medium"
                    />

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
            <div className="overflow-hidden rounded-2xl border border-pink-500/30 bg-background-secondary shadow-xl">
              {/* Header */}
              <div className="border-b border-pink-500/20 bg-pink-600/10 px-6 py-4 text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-pink-500">
                  🍀 Lotofácil — Jogo Gerado
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
                </div>
              </div>

              {/* Números em destaque */}
              <div className="flex flex-wrap justify-center gap-1.5 px-4 py-4 sm:gap-2 sm:px-6 sm:py-5">
                {currentNumbers.map((number) => (
                  <div
                    key={number}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white shadow-lg ring-2 ring-pink-400/30 sm:h-11 sm:w-11 sm:text-base"
                  >
                    {number.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>

              {/* Stats */}
              {generatedGames.length > 0 && (
                <div className="grid grid-cols-3 gap-px border-t border-pink-500/20 bg-pink-500/10">
                  {[
                    { label: "Pares", value: generatedGames[0].statistics.pairs },
                    { label: "Ímpares", value: generatedGames[0].statistics.odds },
                    { label: "Soma", value: generatedGames[0].statistics.sum },
                    { label: "Primos", value: generatedGames[0].statistics.primes },
                    { label: "🔥 Quentes", value: generatedGames[0].statistics.hotNumbers },
                    { label: "🧊 Frios", value: generatedGames[0].statistics.coldNumbers },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center bg-background-secondary px-2 py-3 sm:px-3">
                      <span className="text-base font-bold text-text-primary sm:text-lg">{stat.value}</span>
                      <span className="text-[10px] text-text-secondary sm:text-xs">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Estratégia */}
              {generatedGames.length > 0 && (
                <div className="border-t border-pink-500/20 px-6 py-3 text-center">
                  <span className="text-xs text-text-secondary">Estratégia: </span>
                  <span className="text-xs font-semibold text-pink-500">{generatedGames[0].strategy}</span>
                </div>
              )}

              {/* Faixas */}
              <div className="border-t border-pink-500/20 px-6 py-3 text-center">
                <div className="text-xs text-text-secondary">
                  Principal: 15 acertos · Prêmios secundários: 14, 13, 12 e 11 acertos
                </div>
                <div className="mt-1 text-sm font-bold text-pink-500">BOA SORTE! 🍀</div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 border-t border-pink-500/20 p-4">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `Lotofácil: ${currentNumbers.join(", ")} — ${generatedGames[0]?.strategy || "Padrão"} — ${new Date().toLocaleDateString("pt-BR")}`
                    )
                  }
                  className="flex-1 rounded-lg bg-pink-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
                >
                  📋 Copiar Números
                </button>
                <button
                  onClick={() => {
                    const printContent = `LOTOFÁCIL - NÚMEROS DA SORTE\nData: ${new Date().toLocaleDateString("pt-BR")}\n\nNúmeros: ${currentNumbers.join(", ")}\n\nEstatísticas:\n- Pares: ${generatedGames[0]?.statistics.pairs || 0}\n- Ímpares: ${generatedGames[0]?.statistics.odds || 0}\n- Soma: ${generatedGames[0]?.statistics.sum || 0}\n\nEstratégia: ${generatedGames[0]?.strategy || "Padrão"}\n\nGerado por: CalculadoraOnlineBR.com.br`;
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
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-system-success/20 text-sm font-medium text-system-success-dark"
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
                          className="transition-opacity sm:opacity-0 sm:group-hover:opacity-100 rounded-full bg-red-500 hover:bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs"
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
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-xs font-medium text-pink-800"
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
                    <div className="mt-2 flex gap-2 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
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
                        onClick={() =>
                          copyToClipboard(`Lotofácil: ${game.numbers.join(", ")} - ${game.strategy} - ${game.date}`)
                        }
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

        {/* Informações Estatísticas (calculadas do banco; atualizam a cada novo sorteio) */}
        <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
          <CardHeader>
            <CardTitle>📊 Análise Estatística da Lotofácil</CardTitle>
            <p className="mt-1 text-sm text-text-secondary" data-testid="stats-updated">
              {stats.source === "database" ? (
                <>
                  Base: <strong>{stats.totalConcursos.toLocaleString("pt-BR")} concursos</strong>
                  {stats.ultimoConcurso && (
                    <>
                      {" "}
                      (último: <strong>{stats.ultimoConcurso}</strong>
                      {stats.ultimaData && <> em {formatDateBR(stats.ultimaData)}</>})
                    </>
                  )}
                  . Atualizada automaticamente após cada sorteio.
                </>
              ) : (
                <>Dados de referência (até o concurso {stats.ultimoConcurso}); a atualização automática está temporariamente indisponível.</>
              )}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Números por Frequência */}
            <div>
              <h4 className="mb-3 font-semibold">Frequência Histórica de Números</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {(
                  [
                    { key: "hot", title: "🔥 Números Quentes (mais sorteados)", titleClass: "text-system-error", ballClass: "rounded bg-system-error/20 text-system-error-dark", list: stats.hot },
                    { key: "warm", title: "🌡️ Números Médios", titleClass: "text-system-warning", ballClass: "rounded-full bg-system-warning/20 text-system-warning-dark", list: stats.warm },
                    { key: "cold", title: "🧊 Números Frios (menos sorteados)", titleClass: "text-primary-blue", ballClass: "rounded-full bg-primary-blue/20 text-primary-blue-dark", list: stats.cold },
                  ] as const
                ).map((group) => (
                  <div key={group.key}>
                    <h5 className={`mb-2 text-sm font-medium ${group.titleClass}`}>{group.title}</h5>
                    <div className="flex flex-wrap gap-1">
                      {group.list.map((number) => {
                        const pct = stats.frequency.find((f) => f.numero === number)?.pct;
                        return (
                          <div
                            key={number}
                            title={pct !== undefined ? `${number.toString().padStart(2, "0")}: ${pct.toLocaleString("pt-BR")}% dos concursos` : undefined}
                            className={`flex h-8 w-8 items-center justify-center text-sm font-medium ${group.ballClass}`}
                          >
                            {number.toString().padStart(2, "0")}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {stats.frequency.length > 0 && (
                <p className="mt-3 text-xs text-text-secondary">
                  Cada dezena aparece em cerca de 60% dos concursos (esperado ao acaso). A variação real vai de{" "}
                  {Math.min(...stats.frequency.map((f) => f.pct)).toLocaleString("pt-BR")}% a{" "}
                  {Math.max(...stats.frequency.map((f) => f.pct)).toLocaleString("pt-BR")}%: a diferença é pequena e os sorteios são
                  independentes, então quente/frio é só um critério de variação.
                </p>
              )}
            </div>

            {/* Padrões Matemáticos */}
            <div>
              <h4 className="mb-3 font-semibold">Padrões Mais Comuns nos Sorteios</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded bg-system-success/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-success-dark">{stats.patterns.pairs.min}-{stats.patterns.pairs.max}</div>
                  <div className="text-sm text-text-secondary">Números Pares</div>
                  <div className="text-xs text-text-secondary">{stats.patterns.pairs.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="rounded bg-system-info/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-info-dark">{stats.patterns.sum.ideal[0]}-{stats.patterns.sum.ideal[1]}</div>
                  <div className="text-sm text-text-secondary">Soma Ideal</div>
                  <div className="text-xs text-text-secondary">50% centrais · média {stats.patterns.sum.mean.toLocaleString("pt-BR")}</div>
                </div>
                <div className="rounded bg-math-purple/10 p-3 text-center">
                  <div className="text-lg font-bold text-math-purple-dark">{stats.patterns.primes.min}-{stats.patterns.primes.max}</div>
                  <div className="text-sm text-text-secondary">Números Primos</div>
                  <div className="text-xs text-text-secondary">{stats.patterns.primes.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="rounded bg-system-warning/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-warning-dark">≤{stats.patterns.maxConsecutive.limit}</div>
                  <div className="text-sm text-text-secondary">Seguidos (maior sequência)</div>
                  <div className="text-xs text-text-secondary">{stats.patterns.maxConsecutive.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                Em média, {stats.patterns.repeatedFromPrevious.toLocaleString("pt-BR")} das 15 dezenas se repetem do concurso anterior.
              </p>
            </div>

            {/* Números de Fibonacci e contexto */}
            <div>
              <h4 className="mb-3 font-semibold">Sequências Especiais na Lotofácil</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-neutral-surface-variant p-3">
                  <h5 className="mb-2 text-sm font-medium text-math-purple">🌀 Números de Fibonacci (1–25)</h5>
                  <div className="flex flex-wrap gap-1">
                    {stats.fibonacci.map((n) => (
                      <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-math-purple/20 text-sm font-bold text-math-purple-dark">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">
                    Em {stats.patterns.fibonacci.coverage.toLocaleString("pt-BR")}% dos concursos saíram de {stats.patterns.fibonacci.min} a {stats.patterns.fibonacci.max} números de Fibonacci.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-surface-variant p-3">
                  <h5 className="mb-2 text-sm font-medium text-system-info">🔢 Números Primos (1–25)</h5>
                  <div className="flex flex-wrap gap-1">
                    {stats.primes.map((n) => (
                      <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-system-info/20 text-sm font-bold text-system-info-dark">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">
                    Em {stats.patterns.primes.coverage.toLocaleString("pt-BR")}% dos concursos saíram de {stats.patterns.primes.min} a {stats.patterns.primes.max} números primos.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes - Gerador de Lotofácil"
          items={faqItems.map((item, i) => ({
            ...item,
            borderColor: (["system-success", "primary-blue", "system-info", "system-warning", "system-error-dark"] as const)[i % 5],
          }))}
          tipSection={{
            title: "Dica para Uso Responsável",
            content:
              "<strong>Jogue com responsabilidade:</strong> Loterias são entretenimento, não investimento. Estabeleça um limite de gastos mensal e nunca aposte mais do que pode perder. Use nosso gerador como ferramenta de diversão e estudo estatístico.",
          }}
          footerText="<strong>Lembre-se:</strong> Este gerador é uma ferramenta educativa para estudo de padrões estatísticos. O resultado das loterias é sempre aleatório e imprevisível."
        />

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-lotofacil" />
      </div>

      {/* Toast de cópia */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          {copyToast}
        </div>
      )}
    </div>
  );
}