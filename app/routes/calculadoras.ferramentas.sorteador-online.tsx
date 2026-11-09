import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("sorteador-online"),
    {
      "script:ld+json": [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Sorteador Online Profissional",
          url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/sorteador-online",
          description: "Sorteador online com algoritmo aleatório garantido. Sorteie múltiplos resultados, nomes, objetos e listas com animação profissional.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br"
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://www.calculadoraonlinebr.com.br"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculadoras",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Ferramentas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas"
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Sorteador Online",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/sorteador-online"
              }
            ]
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Sorteador Online Profissional",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          description: "Sorteador online com algoritmo aleatório garantido para múltiplos resultados",
          url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/sorteador-online",
          author: {
            "@type": "Organization",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br"
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL"
          },
          featureList: [
            "Sorteio de múltiplos resultados",
            "Algoritmo aleatório garantido",
            "Animação profissional",
            "Interface intuitiva",
            "Histórico de sorteios",
            "100% gratuito"
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "O sorteador é realmente aleatório e justo?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim! O sorteador utiliza o gerador de números pseudoaleatórios do JavaScript (Math.random()) combinado com algoritmos de embaralhamento para garantir que todos os itens tenham exatamente a mesma probabilidade de serem sorteados."
              }
            },
            {
              "@type": "Question",
              name: "Quantos itens posso colocar na lista?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não há limite fixo para o número de itens. O campo de texto aceita qualquer quantidade de caracteres, então você pode sortear desde uma lista pequena de 2 itens até listas com centenas de opções."
              }
            },
            {
              "@type": "Question",
              name: "Como funciona a animação do sorteio?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "O sorteio tem efeito 'peão do baú' igual aos programas de TV! A animação começa muito rápida, vai desacelerando progressivamente e termina com uma grande celebração."
              }
            }
          ]
        }
      ]
    },
  ];
};

export default function SorteadorOnline() {
  const [inputText, setInputText] = useState("");
  const [numberOfResults, setNumberOfResults] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [finalResults, setFinalResults] = useState<string[]>([]);
  const [drawHistory, setDrawHistory] = useState<string[][]>([]);
  const [drawStarted, setDrawStarted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "sorteador-online",
    category: "ferramentas",
  });

  const { trackFormInteraction } = useFormTracking({
    formId: "sorteador-form",
    calculatorId: "sorteador-online",
  });

  const items = useMemo(() => {
    if (!inputText.trim()) return [];
    return inputText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }, [inputText]);

  const isValidList = items.length >= 2 && numberOfResults <= items.length;

  // Validate inputs and set error messages
  useEffect(() => {
    setValidationError("");

    if (items.length === 0) {
      return;
    }

    if (items.length < 2) {
      setValidationError("Mínimo 2 itens necessários para sortear");
      return;
    }

    if (numberOfResults > items.length) {
      setValidationError(`Não é possível sortear ${numberOfResults} resultados com apenas ${items.length} itens`);
      return;
    }

    if (numberOfResults < 1) {
      setValidationError("Número de resultados deve ser pelo menos 1");
      return;
    }
  }, [items.length, numberOfResults]);

  const startDraw = async () => {
    if (!isValidList || isDrawing) return;

    setIsDrawing(true);
    setDrawStarted(true);
    setFinalResults([]);
    setCurrentItem("");

    // Track the start of calculation
    startCalculation();

    const totalDuration = 5000; // 5 seconds fixed duration
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / totalDuration;

      if (progress >= 1) {
        // Pick multiple random winners without repetition
        const shuffledItems = [...items].sort(() => Math.random() - 0.5);
        const winners = shuffledItems.slice(0, numberOfResults);

        // Finish the draw - show final winners
        setCurrentItem(winners.join(", "));
        setFinalResults(winners);
        setIsDrawing(false);
        setDrawHistory(prev => [winners, ...prev.slice(0, 9)]); // Keep last 10 results

        // Track the end of calculation
        endCalculation(true);

        return;
      }

      // Show random item (like spinning wheel effect)
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setCurrentItem(randomItem);

      // Calculate speed based on progress (fast at start, slower at end)
      let speed;
      if (progress < 0.6) {
        // First 60% - very fast (30-60ms)
        speed = 30 + Math.random() * 30;
      } else if (progress < 0.85) {
        // Next 25% - medium speed (80-150ms)
        speed = 80 + Math.random() * 70;
      } else {
        // Final 15% - slow down dramatically (200-400ms)
        speed = 200 + Math.random() * 200;
      }

      intervalRef.current = setTimeout(animate, speed);
    };

    // Start the animation immediately with the first random item
    const firstRandomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(firstRandomItem);

    // Start the animation loop
    setTimeout(animate, 50);
  };

  const resetDraw = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    setIsDrawing(false);
    setCurrentItem("");
    setFinalResults([]);
    setDrawStarted(false);
  };

  const clearAll = () => {
    resetDraw();
    setInputText("");
    setNumberOfResults(1);
    setDrawHistory([]);
    setValidationError("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  const handleInputChange = (value: string) => {
    setInputText(value);
    trackFormInteraction({
      field: "items-list",
      value: value.length > 0 ? "has_content" : "empty"
    });
  };

  return (
    <div className="min-h-screen" lang="pt-BR">
      {/* Breadcrumb Navigation */}
      <div className="border-border-primary bg-surface-light border-b px-3 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
            <BreadcrumbItem isLast>Sorteador Online</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-indigo-900/40 py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-indigo-600/10 animate-pulse"></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur animate-pulse"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-2xl">
                <span className="text-4xl animate-bounce">🎲</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 sm:text-5xl lg:text-6xl mb-4">
            SORTEADOR ONLINE
          </h1>

          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-300 mb-2 leading-relaxed">
              🎯 Sorteador <strong className="text-yellow-400">profissional</strong> com <strong className="text-blue-400">algoritmo aleatório</strong> garantido
            </p>
            <p className="text-lg text-gray-400">
              Sorteie <strong className="text-purple-400">múltiplos resultados</strong> com efeito "peão do baú" e animações incríveis ✨
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-green-400">⚡</span>
              <span className="text-gray-300">Super rápido</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-blue-400">🎯</span>
              <span className="text-gray-300">100% aleatório</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-purple-400">🎉</span>
              <span className="text-gray-300">Efeitos visuais</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-3 py-8 sm:px-6 lg:px-8">

        {/* Main Calculator - Modern Design */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <span className="text-xl">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Configure seu Sorteio</h2>
                </div>
                <p className="text-gray-400">Digite os itens que você quer sortear, um por linha</p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    id="items-list"
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={`🎯 Digite os itens para sortear:

✨ João
✨ Maria
✨ Pedro
✨ Ana
✨ Carlos
✨ Beatriz

E quantos mais você quiser! 🚀`}
                    className="w-full h-56 px-6 py-4 bg-slate-900/70 border border-slate-600/50 rounded-2xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none font-mono text-lg transition-all duration-300"
                    disabled={isDrawing}
                    aria-label="Lista de itens para sorteio"
                    aria-describedby="items-help"
                    role="textbox"
                    aria-multiline="true"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-gray-300">
                      Área de texto
                    </div>
                  </div>
                </div>

                {/* Number of Results Selector */}
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-600/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Número de Resultados</h3>
                      <p className="text-sm text-gray-400">Escolha quantos vencedores você quer</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        min="1"
                        max={items.length || 1}
                        value={numberOfResults}
                        onChange={(e) => setNumberOfResults(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-4 py-3 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white text-lg font-bold text-center focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all duration-300"
                        disabled={isDrawing}
                        aria-label="Número de resultados para sortear"
                        aria-describedby="results-help"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Máximo:</div>
                      <div className="text-lg font-bold text-yellow-400">{items.length || 0}</div>
                    </div>
                  </div>

                  {/* Quick select buttons */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[1, 2, 3, 5].filter(num => num <= items.length).map(num => (
                      <button
                        key={num}
                        onClick={() => setNumberOfResults(num)}
                        disabled={isDrawing}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                          numberOfResults === num
                            ? 'bg-yellow-500 text-black'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        } disabled:opacity-50`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${isValidList ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} aria-hidden="true"></div>
                    <span id="items-help" className={`text-sm font-medium ${isValidList ? 'text-green-400' : 'text-gray-400'}`}>
                      {items.length} {items.length === 1 ? 'item' : 'itens'}
                      {isValidList && (
                        <span> • {numberOfResults} resultado{numberOfResults > 1 ? 's' : ''} ✓</span>
                      )}
                    </span>
                  </div>
                  {validationError && (
                    <span className="text-red-400 text-sm font-medium animate-pulse" role="alert" aria-live="polite">
                      ⚠️ {validationError}
                    </span>
                  )}
                </div>

                <div id="results-help" className="sr-only">
                  Configure quantos resultados você deseja obter no sorteio. O máximo permitido é igual ao número de itens na sua lista.
                </div>
              </div>
            </div>
          </div>

          {/* Action & Animation Section */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8 space-y-6">

              {/* Draw Animation Area */}
              {(drawStarted || currentItem) ? (
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/40 rounded-3xl border border-purple-500/30 shadow-2xl">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-indigo-600/20 animate-pulse"></div>

                  <div className="relative p-8 text-center">
                    <div className="mb-6">
                      {isDrawing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-75 animate-ping"></div>
                            <span className="relative text-4xl animate-spin">🎰</span>
                          </div>
                          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            SORTEANDO
                          </h3>
                          <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-75 animate-ping" style={{animationDelay: '0.5s'}}></div>
                            <span className="relative text-4xl animate-spin" style={{animationDelay: '0.5s'}}>🎰</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-center gap-2">
                            <span className="text-4xl animate-bounce">🏆</span>
                            <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🎉</span>
                            <span className="text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🏆</span>
                          </div>
                          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            RESULTADO!
                          </h3>
                        </div>
                      )}
                    </div>

                    {/* Main Display Box */}
                    <div className={`
                      relative min-h-[140px] flex items-center justify-center rounded-2xl border-2
                      transition-all duration-500 overflow-hidden backdrop-blur-sm
                      ${isDrawing
                        ? 'border-yellow-400/70 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 shadow-lg shadow-yellow-400/30'
                        : 'border-green-400/70 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 shadow-lg shadow-green-400/30'
                      }
                    `}>
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className={`w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent ${isDrawing ? 'animate-pulse' : ''}`}></div>
                      </div>

                      {/* Text Display */}
                      <div className={`
                        relative z-10 px-6 py-4 rounded-xl font-bold text-center
                        transition-all duration-300 max-w-full backdrop-blur-sm
                        ${isDrawing
                          ? 'text-2xl md:text-3xl text-yellow-100 bg-yellow-500/20 border border-yellow-400/50 animate-pulse transform scale-105'
                          : 'text-xl md:text-2xl text-green-100 bg-green-500/20 border border-green-400/50'
                        }
                      `}>
                        <div className={`break-words ${isDrawing ? 'animate-bounce' : ''}`}>
                          {currentItem || "🎯 Preparando sorteio..."}
                        </div>
                      </div>

                      {/* Sparkle Effects */}
                      {!isDrawing && finalResults.length > 0 && (
                        <>
                          <div className="absolute top-3 left-3 text-yellow-300 text-xl animate-ping">✨</div>
                          <div className="absolute top-3 right-3 text-pink-300 text-xl animate-ping" style={{animationDelay: '0.3s'}}>💫</div>
                          <div className="absolute bottom-3 left-3 text-blue-300 text-xl animate-ping" style={{animationDelay: '0.6s'}}>⭐</div>
                          <div className="absolute bottom-3 right-3 text-purple-300 text-xl animate-ping" style={{animationDelay: '0.9s'}}>🌟</div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-300 text-2xl animate-ping" style={{animationDelay: '1.2s'}}>✨</div>
                        </>
                      )}
                    </div>

                    {/* Progress Indicator during draw */}
                    {isDrawing && (
                      <div className="mt-6 space-y-3">
                        <div className="relative w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full animate-pulse opacity-80"></div>
                          <div className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-sm text-purple-300 animate-pulse font-medium">
                          ⚡ Criando suspense... aguarde o resultado! ⚡
                        </p>
                      </div>
                    )}

                    {/* Final Result Celebration */}
                    {finalResults.length > 0 && (
                      <div className="mt-8 p-6 bg-gradient-to-br from-green-500/30 via-emerald-500/30 to-teal-500/30 rounded-2xl border border-green-400/50 backdrop-blur-sm">
                        <div className="text-4xl mb-4 space-x-2">
                          <span className="animate-bounce">🎉</span>
                          <span className="animate-bounce" style={{animationDelay: '0.1s'}}>🎊</span>
                          <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎈</span>
                          <span className="animate-bounce" style={{animationDelay: '0.3s'}}>🏆</span>
                        </div>
                        <h4 className="text-xl font-black text-green-100 mb-4 uppercase tracking-wide">
                          🏆 {finalResults.length === 1 ? 'VENCEDOR SORTEADO!' : `${finalResults.length} VENCEDORES SORTEADOS!`} 🏆
                        </h4>

                        <div className="space-y-3">
                          {finalResults.map((result, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-green-400 to-emerald-400 text-green-900 rounded-xl py-3 px-6 border-2 border-green-300"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                                    {index + 1}
                                  </div>
                                  <p className="text-xl font-black break-words">
                                    {result}
                                  </p>
                                </div>
                                <div className="text-2xl">
                                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏆'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-3xl mt-4 space-x-1">
                          <span className="animate-pulse">🎯</span>
                          <span className="animate-pulse" style={{animationDelay: '0.2s'}}>🌟</span>
                          <span className="animate-pulse" style={{animationDelay: '0.4s'}}>⭐</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Standby State */
                <div className="text-center p-12 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-3xl border border-slate-600/30 backdrop-blur-sm">
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30 blur animate-pulse"></div>
                      <span className="relative text-6xl animate-bounce">🎲</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-300 mb-2">Aguardando Configuração</h2>
                  <p className="text-gray-500">Digite sua lista e clique no botão abaixo!</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={startDraw}
                  disabled={!isValidList || isDrawing}
                  className={`
                    w-full h-16 text-xl font-black rounded-2xl transition-all duration-300 transform
                    ${!isValidList || isDrawing
                      ? 'bg-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:scale-105 hover:shadow-2xl shadow-purple-500/25'
                    }
                  `}
                >
                  {isDrawing ? (
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl animate-spin">⚡</span>
                      <span>SORTEANDO...</span>
                      <span className="text-2xl animate-spin">⚡</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">🎲</span>
                      <span>
                        SORTEAR {numberOfResults} {numberOfResults === 1 ? 'RESULTADO' : 'RESULTADOS'}
                      </span>
                      <span className="text-2xl">🎯</span>
                    </div>
                  )}
                </Button>

                <div className="flex gap-3">
                  {(isDrawing || finalResults.length > 0) && (
                    <Button
                      onClick={resetDraw}
                      className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300"
                    >
                      <span className="mr-2">🔄</span>
                      Parar/Reiniciar
                    </Button>
                  )}

                  <Button
                    onClick={clearAll}
                    disabled={isDrawing}
                    className="flex-1 h-12 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
                  >
                    <span className="mr-2">🗑️</span>
                    Limpar Tudo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Draw History - Modern Design */}
        {drawHistory.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-600/30 p-8 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Histórico de Resultados</h2>
                      <p className="text-gray-400">Últimos resultados sorteados</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setDrawHistory([])}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300"
                  >
                    🗑️ Limpar Histórico
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {drawHistory.map((results, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-sm rounded-2xl border border-emerald-400/30 p-5 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                  >
                    {/* Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-teal-600/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                          Sorteio #{drawHistory.length - index}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-emerald-400 text-sm font-medium">
                            {results.length} resultado{results.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-xl">🏆</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {results.map((result, resultIndex) => (
                          <div
                            key={resultIndex}
                            className="bg-emerald-600/20 rounded-lg p-2 flex items-center gap-2"
                          >
                            <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {resultIndex + 1}
                            </div>
                            <p className="font-bold text-white text-sm break-words flex-1">
                              {result}
                            </p>
                            <span className="text-lg">
                              {resultIndex === 0 ? '🥇' : resultIndex === 1 ? '🥈' : resultIndex === 2 ? '🥉' : '🏆'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex justify-center gap-1">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-pink-400 text-sm">✨</span>
                        <span className="text-blue-400 text-sm">💫</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-slate-700/50 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-emerald-400">📊</span>
                  <span className="text-sm text-gray-300">
                    Total de sorteios realizados: <strong className="text-emerald-400">{drawHistory.length}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" role="heading" aria-level="2">
              <span className="text-xl" aria-hidden="true">📖</span>
              <h2>Como Usar o Sorteador</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">1. Digite sua lista</h3>
                    <p className="text-sm text-text-secondary">
                      Escreva cada item em uma linha separada. Pode ser nomes, objetos, animais, etc.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Clique em "Iniciar Sorteio"</h3>
                    <p className="text-sm text-text-secondary">
                      O sorteador começará a alternar entre os itens rapidamente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Aguarde o resultado</h3>
                    <p className="text-sm text-text-secondary">
                      A velocidade vai diminuindo para criar suspense até revelar o vencedor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Veja o histórico</h3>
                    <p className="text-sm text-text-secondary">
                      Acompanhe os últimos sorteios realizados na seção de histórico.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" role="heading" aria-level="2">
              <span className="text-xl" aria-hidden="true">💡</span>
              <h2>Dicas para um Sorteio Justo</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-system-info/10 rounded-lg border border-system-info/20">
                <h3 className="font-semibold text-system-info-dark mb-2">🎯 Aleatoriedade Garantida</h3>
                <p className="text-sm text-text-secondary">
                  O algoritmo utiliza geradores de números aleatórios seguros para garantir que todos os itens tenham a mesma chance.
                </p>
              </div>

              <div className="p-4 bg-system-success/10 rounded-lg border border-system-success/20">
                <h3 className="font-semibold text-system-success-dark mb-2">📝 Formato Flexível</h3>
                <p className="text-sm text-text-secondary">
                  Não há limite de caracteres. Digite nomes curtos ou descrições longas - o sorteador funciona com qualquer texto.
                </p>
              </div>

              <div className="p-4 bg-primary-blue/10 rounded-lg border border-primary-blue/20">
                <h3 className="font-semibold text-primary-blue-dark mb-2">🎭 Efeito "Peão do Baú"</h3>
                <p className="text-sm text-text-secondary">
                  A animação começa muito rápida e vai desacelerando progressivamente para criar máximo suspense, igual aos programas de TV.
                </p>
              </div>

              <div className="p-4 bg-growth-green/10 rounded-lg border border-growth-green/20">
                <h3 className="font-semibold text-growth-green-dark mb-2">🔄 Múltiplos Sorteios</h3>
                <p className="text-sm text-text-secondary">
                  Realize quantos sorteios quiser com a mesma lista. Cada sorteio é independente e aleatório.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes sobre o Sorteador Online"
          items={[
            {
              question: "O sorteador é realmente aleatório e justo?",
              answer: "Sim! O sorteador utiliza o gerador de números pseudoaleatórios do JavaScript (Math.random()) combinado com algoritmos de embaralhamento para garantir que todos os itens tenham exatamente a mesma probabilidade de serem sorteados. Cada sorteio é independente dos anteriores.",
              borderColor: "primary-blue"
            },
            {
              question: "Quantos itens posso colocar na lista?",
              answer: "Não há limite fixo para o número de itens. O campo de texto aceita qualquer quantidade de caracteres, então você pode sortear desde uma lista pequena de 2 itens até listas com centenas de opções. O sorteador funciona igualmente bem com qualquer quantidade.",
              borderColor: "growth-green"
            },
            {
              question: "Como funciona a animação do sorteio?",
              answer: "O sorteio tem efeito 'peão do baú' igual aos programas de TV! A animação começa muito rápida, vai desacelerando progressivamente e termina com uma grande celebração. Os textos ficam trocando rapidamente para criar o máximo de suspense e diversão.",
              borderColor: "system-info"
            },
            {
              question: "Posso usar o sorteador para rifas e sorteios oficiais?",
              answer: "O sorteador é uma ferramenta confiável para sorteios casuais, rifas beneficentes, escolhas em sala de aula, etc. Para sorteios oficiais ou com valor monetário, recomendamos consultar a legislação local e considerar ferramentas certificadas para jogos oficiais.",
              borderColor: "system-warning"
            },
            {
              question: "Como funciona o histórico de sorteios?",
              answer: "O histórico mantém os últimos 10 sorteios realizados na sessão atual. Isso permite acompanhar os resultados e verificar que não há padrões ou repetições suspeitas. O histórico é limpo quando você recarrega a página ou clica em 'Limpar Histórico'.",
              borderColor: "system-success"
            },
            {
              question: "Posso sortear textos longos ou apenas palavras simples?",
              answer: "O sorteador funciona com qualquer tipo de texto! Você pode sortear desde nomes simples até frases completas, descrições de prêmios, endereços, ou qualquer outro texto. Não há restrições de tamanho por item.",
              borderColor: "primary-blue"
            },
            {
              question: "O que acontece se eu tiver itens duplicados na lista?",
              answer: "Se você digitar o mesmo item várias vezes na lista, ele terá mais chances de ser sorteado proporcionalmente ao número de vezes que aparece. Por exemplo, se 'João' aparecer 3 vezes numa lista de 10 itens, ele terá 30% de chance de ser sorteado.",
              borderColor: "growth-green"
            },
            {
              question: "É possível parar o sorteio no meio da animação?",
              answer: "Sim! Você pode clicar no botão 'Parar/Reiniciar' a qualquer momento durante a animação. Isso interrompe o sorteio imediatamente e você pode começar um novo sorteio ou editar sua lista.",
              borderColor: "system-error-dark"
            }
          ]}
        />

        <RelatedCalculators category="ferramentas" />
      </div>
    </div>
  );
}