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
  Checkbox,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Contador de Caracteres Online | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Contador de caracteres gratuito com análise detalhada. Conte letras, palavras, frases e veja estatísticas avançadas. Opções para ignorar espaços e pontuação.",
    },
    {
      name: "keywords",
      content:
        "contador caracteres, contador letras, contador palavras, contador frases, análise texto, estatística texto, contagem caracteres, contador online",
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
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
    },
    {
      property: "og:title",
      content: "Contador de Caracteres – Contagem de Letras, Palavras e Frases Online",
    },
    {
      property: "og:description",
      content:
        "Contador de caracteres gratuito com análise detalhada. Conte letras, palavras, frases e veja estatísticas avançadas. Opções para ignorar espaços e pontuação.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og/contador-caracteres.jpg",
    },
    {
      property: "og:image:alt",
      content:
        "Contador de Caracteres - Análise completa de texto com contagem de letras, palavras e frases",
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
        "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Contador de Caracteres 2026 – Análise Completa de Texto",
    },
    {
      name: "twitter:description",
      content:
        "Contador de caracteres gratuito e completo. Análise detalhada com contagem de letras, palavras, frases e estatísticas avançadas.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og/contador-caracteres.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Contador de Caracteres - Análise completa de texto",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Contador Caracteres" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Contador de Caracteres - Análise Completa de Texto 2026",
        description:
          "Ferramenta gratuita para contar caracteres, letras, palavras e frases. Análise detalhada com estatísticas avançadas e opções de filtro para espaços e pontuação.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-07",
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
            "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
          name: "Contador de Caracteres 2026 - Análise Completa de Texto",
          description:
            "Contador de caracteres gratuito e completo. Análise detalhada com contagem de letras, palavras, frases e estatísticas avançadas.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
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
                name: "Ferramentas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Contador de Caracteres",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/contador-caracteres",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Contador de Caracteres",
          description: "Ferramenta para análise estatística de texto e contagem de caracteres",
          category: "UtilitiesApplication",
        },
        featureList: [
          "Contagem de caracteres em tempo real",
          "Análise de letras individuais",
          "Contagem de palavras e frases",
          "Opção ignorar espaços e pontuação",
          "Estatísticas detalhadas",
          "Interface responsiva",
          "Análise instantânea",
          "Ferramenta gratuita",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Como funciona o contador de caracteres?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O contador analisa o texto em tempo real, contando caracteres, letras, palavras, frases e fornecendo estatísticas detalhadas. Usa algoritmos otimizados para análise rápida de grandes textos.",
            },
          },
          {
            "@type": "Question",
            name: "Posso ignorar espaços e pontuação na contagem?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. A ferramenta oferece opções para incluir ou excluir espaços, pontuação e caracteres especiais na contagem, permitindo análises personalizadas do texto.",
            },
          },
          {
            "@type": "Question",
            name: "O contador mostra a frequência de cada letra?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. A ferramenta exibe quantas vezes cada letra aparece no texto, com visualização organizada e percentuais de ocorrência.",
            },
          },
        ],
      },
    },
  ];
};

interface CharacterCount {
  [key: string]: number;
}

interface TextStats {
  totalCharacters: number;
  charactersWithoutSpaces: number;
  charactersWithoutPunctuation: number;
  lettersOnly: number;
  words: number;
  sentences: number;
  paragraphs: number;
  letterFrequency: CharacterCount;
  mostFrequentLetter: string;
  leastFrequentLetter: string;
  averageWordsPerSentence: number;
  averageCharactersPerWord: number;
  analyzedAt: Date;
}

interface CountOptions {
  ignoreSpaces: boolean;
  ignorePunctuation: boolean;
  caseSensitive: boolean;
}

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<CountOptions>({
    ignoreSpaces: false,
    ignorePunctuation: false,
    caseSensitive: false,
  });
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "contador-caracteres",
    category: "ferramentas",
  });
  useFormTracking("contador-caracteres");

  // Algoritmo otimizado para análise de texto
  const textStats = useMemo((): TextStats | null => {
    if (!text.trim()) return null;

    startCalculation();

    // Contadores básicos
    const totalCharacters = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;
    const charactersWithoutPunctuation = text.replace(/[^\w\sÀ-ÿ]/g, "").length;
    const lettersOnly = text.replace(/[^a-zA-ZÀ-ÿ]/g, "").length;

    // Contagem de palavras (otimizada)
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    // Contagem de frases
    const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;

    // Contagem de parágrafos
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;

    // Análise de frequência de letras (otimizada com Map)
    const letterFrequency: CharacterCount = {};
    let textToAnalyze = text;

    if (options.ignoreSpaces) {
      textToAnalyze = textToAnalyze.replace(/\s/g, "");
    }

    if (options.ignorePunctuation) {
      textToAnalyze = textToAnalyze.replace(/[^\w\sÀ-ÿ]/g, "");
    }

    if (!options.caseSensitive) {
      textToAnalyze = textToAnalyze.toLowerCase();
    }

    // Usa algoritmo de contagem otimizado
    for (let i = 0; i < textToAnalyze.length; i++) {
      const char = textToAnalyze[i];
      if (/[a-zA-ZÀ-ÿ]/.test(char)) {
        letterFrequency[char] = (letterFrequency[char] || 0) + 1;
      }
    }

    // Encontra letras mais e menos frequentes
    const frequencies = Object.entries(letterFrequency);
    const mostFrequentLetter = frequencies.length
      ? frequencies.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
      : "";
    const leastFrequentLetter = frequencies.length
      ? frequencies.reduce((a, b) => (a[1] < b[1] ? a : b))[0]
      : "";

    // Cálculos de médias
    const averageWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 100) / 100 : 0;
    const averageCharactersPerWord = words > 0 ? Math.round((lettersOnly / words) * 100) / 100 : 0;

    const stats: TextStats = {
      totalCharacters,
      charactersWithoutSpaces,
      charactersWithoutPunctuation,
      lettersOnly,
      words,
      sentences,
      paragraphs,
      letterFrequency,
      mostFrequentLetter,
      leastFrequentLetter,
      averageWordsPerSentence,
      averageCharactersPerWord,
      analyzedAt: new Date(),
    };

    endCalculation(true);
    return stats;
  }, [text, options, startCalculation, endCalculation]);

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleOptionChange = (key: keyof CountOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = () => {
    setText("");
    setOptions({
      ignoreSpaces: false,
      ignorePunctuation: false,
      caseSensitive: false,
    });
  };

  const getSortedLetterFrequency = () => {
    if (!textStats?.letterFrequency) return [];
    return Object.entries(textStats.letterFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20); // Top 20 letras mais frequentes
  };

  // Scroll para resultado quando há análise
  useEffect(() => {
    if (textStats && text.length > 0) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [textStats, text]);

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Contador de Caracteres</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Contador de Caracteres 2026 – Análise Completa de Texto
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Analise seu texto de forma{" "}
          <strong className="text-primary-blue-dark">completa e detalhada</strong>. Conte
          caracteres, letras, palavras, frases e veja{" "}
          <strong className="text-growth-green">estatísticas avançadas</strong> em tempo real.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>Análise em Tempo Real</strong> • 📊 <strong>Estatísticas Detalhadas</strong>{" "}
            • 🔤 <strong>Frequência de Letras</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">📝 Contador de Caracteres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Área de texto */}
            <div>
              <label htmlFor="text" className="mb-2 block text-sm font-medium text-text-primary">
                Digite ou cole seu texto aqui
              </label>
              <textarea
                id="text"
                placeholder="Digite ou cole seu texto aqui para análise completa..."
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="min-h-[200px] w-full resize-none rounded-lg border border-neutral-surface-variant bg-neutral-surface p-4 text-base text-text-primary placeholder-text-secondary focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                rows={8}
              />
              <p className="mt-1 text-sm text-text-secondary">
                A análise é feita automaticamente conforme você digita
              </p>
            </div>

            {/* Opções de contagem */}
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h3 className="mb-4 font-semibold text-primary-blue-dark">Opções de Análise</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Checkbox
                  checked={options.ignoreSpaces}
                  onChange={() => handleOptionChange("ignoreSpaces")}
                  label="Ignorar espaços"
                />
                <Checkbox
                  checked={options.ignorePunctuation}
                  onChange={() => handleOptionChange("ignorePunctuation")}
                  label="Ignorar pontuação"
                />
                <Checkbox
                  checked={options.caseSensitive}
                  onChange={() => handleOptionChange("caseSensitive")}
                  label="Diferenciar maiúsculas"
                />
              </div>
            </div>

            {/* Botão limpar */}
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-system-error text-system-error hover:bg-system-error hover:text-white"
              >
                🗑️ Limpar Texto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {textStats && (
        <div ref={resultRef}>
          <Card className="bg-primary-blue-soft border-2 border-primary-blue">
            <CardHeader>
              <CardTitle as="h3" className="text-primary-blue">
                📊 Análise do Texto
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Estatísticas principais */}
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="text-2xl font-bold text-primary-blue-dark">
                    {textStats.totalCharacters.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Total de Caracteres</div>
                </div>

                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="text-2xl font-bold text-growth-green">
                    {textStats.words.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Palavras</div>
                </div>

                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="text-2xl font-bold text-system-info">
                    {textStats.sentences.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Frases</div>
                </div>

                <div className="rounded-lg bg-gray-900 p-4 text-center">
                  <div className="text-2xl font-bold text-system-warning">
                    {textStats.paragraphs.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Parágrafos</div>
                </div>
              </div>

              {/* Estatísticas detalhadas */}
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    📏 Detalhes da Contagem
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Caracteres sem espaços:</span>
                      <span className="font-mono text-text-primary">
                        {textStats.charactersWithoutSpaces.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Caracteres sem pontuação:</span>
                      <span className="font-mono text-text-primary">
                        {textStats.charactersWithoutPunctuation.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Apenas letras:</span>
                      <span className="font-mono text-text-primary">
                        {textStats.lettersOnly.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Média palavras/frase:</span>
                      <span className="font-mono text-text-primary">
                        {textStats.averageWordsPerSentence}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Média caracteres/palavra:</span>
                      <span className="font-mono text-text-primary">
                        {textStats.averageCharactersPerWord}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-growth-green-soft p-4">
                  <h4 className="mb-3 font-semibold text-growth-green">🔤 Análise de Letras</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Letra mais frequente:</span>
                      <span className="font-mono text-2xl text-growth-green">
                        {textStats.mostFrequentLetter || "—"}
                        {textStats.mostFrequentLetter && (
                          <span className="ml-2 text-sm">
                            ({textStats.letterFrequency[textStats.mostFrequentLetter]}x)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Letra menos frequente:</span>
                      <span className="font-mono text-2xl text-system-warning">
                        {textStats.leastFrequentLetter || "—"}
                        {textStats.leastFrequentLetter && (
                          <span className="ml-2 text-sm">
                            ({textStats.letterFrequency[textStats.leastFrequentLetter]}x)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Letras diferentes:</span>
                      <span className="font-mono text-text-primary">
                        {Object.keys(textStats.letterFrequency).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frequência de letras */}
              {getSortedLetterFrequency().length > 0 && (
                <div className="rounded-lg bg-gray-900 p-6">
                  <h4 className="mb-4 font-semibold text-primary-blue-dark">
                    📈 Frequência das Letras (Top 20)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                    {getSortedLetterFrequency().map(([letter, count], index) => {
                      const percentage = Math.round((count / textStats.lettersOnly) * 10000) / 100;
                      const isTop = index < 3;

                      return (
                        <div
                          key={letter}
                          className={`rounded p-3 text-center transition-colors ${
                            isTop
                              ? "border border-primary-blue/40 bg-primary-blue/20"
                              : "border border-neutral-surface-variant bg-neutral-surface"
                          }`}
                        >
                          <div
                            className={`text-2xl font-bold ${isTop ? "text-primary-blue" : "text-text-primary"}`}
                          >
                            {letter.toUpperCase()}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {count}x ({percentage}%)
                          </div>
                          {isTop && (
                            <div className="mt-1">
                              <span className="rounded-full bg-primary-blue px-2 py-0.5 text-xs text-white">
                                #{index + 1}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Informações técnicas */}
              <div className="mt-6 rounded-lg bg-system-info/10 p-4">
                <h4 className="mb-2 font-semibold text-system-info">ℹ️ Informações da Análise</h4>
                <div className="text-sm text-text-secondary">
                  <p>
                    <strong>Analisado em:</strong> {textStats.analyzedAt.toLocaleString("pt-BR")}
                  </p>
                  <p>
                    <strong>Opções aplicadas:</strong>
                    {options.ignoreSpaces && " Espaços ignorados"}
                    {options.ignorePunctuation && " Pontuação ignorada"}
                    {options.caseSensitive && " Diferencia maiúsculas"}
                    {!options.ignoreSpaces &&
                      !options.ignorePunctuation &&
                      !options.caseSensitive &&
                      " Nenhuma"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção educacional */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funciona o Contador de Caracteres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Algoritmo de contagem */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                ⚡ Algoritmo Otimizado
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">
                    🔢 Contagem em Tempo Real
                  </h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Utiliza algoritmos otimizados para análise instantânea, processando texto
                    conforme você digita usando técnicas de memoização e processamento eficiente.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Múltiplas Métricas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Caracteres totais e filtrados</li>
                    <li>• Palavras e frases</li>
                    <li>• Parágrafos e estrutura</li>
                    <li>• Frequência de cada letra</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🎯 Análise Avançada</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Calcula estatísticas complexas como médias, frequências e padrões, identificando
                    as letras mais e menos utilizadas automaticamente.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">✅ Precisão</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Reconhece acentos portugueses</li>
                    <li>• Distingue maiúsculas/minúsculas</li>
                    <li>• Filtra pontuação e espaços</li>
                    <li>• Análise de estrutura textual</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tipos de análise */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📝 Tipos de Análise
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">📏 Contagens Básicas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Total de caracteres:</strong> Todos os símbolos
                    </li>
                    <li>
                      • <strong>Sem espaços:</strong> Excluindo espaços em branco
                    </li>
                    <li>
                      • <strong>Sem pontuação:</strong> Apenas letras e números
                    </li>
                    <li>
                      • <strong>Apenas letras:</strong> Somente caracteres alfabéticos
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🔤 Análise de Frequência</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • <strong>Letra mais frequente:</strong> Maior ocorrência
                    </li>
                    <li>
                      • <strong>Letra menos frequente:</strong> Menor ocorrência
                    </li>
                    <li>
                      • <strong>Top 20 letras:</strong> Ranking completo
                    </li>
                    <li>
                      • <strong>Percentuais:</strong> Distribuição relativa
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Casos de uso */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💼 Casos de Uso Práticos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✍️ Redação e Escrita</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Controle de limite de caracteres</li>
                    <li>• Análise de densidade textual</li>
                    <li>• Verificação de estrutura</li>
                    <li>• Otimização de conteúdo</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue">🔬 Análise Linguística</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Estudos de frequência</li>
                    <li>• Análise estatística de textos</li>
                    <li>• Pesquisa acadêmica</li>
                    <li>• Criptografia e codificação</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Contador de Caracteres"
        items={[
          {
            question: "Como funciona o contador de caracteres?",
            answer:
              "O contador analisa o texto em tempo real, contando caracteres, letras, palavras, frases e fornecendo estatísticas detalhadas. Usa algoritmos otimizados para análise rápida mesmo de textos grandes, processando milhares de caracteres instantaneamente.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso ignorar espaços e pontuação na contagem?",
            answer:
              "Sim. A ferramenta oferece opções para incluir ou excluir espaços, pontuação e caracteres especiais na contagem. Você pode personalizar a análise conforme sua necessidade, ideal para diferentes tipos de análise textual.",
            borderColor: "primary-blue",
          },
          {
            question: "O contador mostra a frequência de cada letra?",
            answer:
              "Sim. A ferramenta exibe quantas vezes cada letra aparece no texto, com ranking das 20 letras mais frequentes, percentuais de ocorrência e destaque para as letras mais e menos utilizadas.",
            borderColor: "growth-green",
          },
          {
            question: "Como são calculadas as médias de palavras e caracteres?",
            answer:
              "A média de palavras por frase é calculada dividindo o total de palavras pelo número de frases. A média de caracteres por palavra divide o total de letras pelo número de palavras, excluindo pontuação e espaços.",
            borderColor: "system-info",
          },
          {
            question: "O contador funciona com acentos portugueses?",
            answer:
              "Sim. A ferramenta reconhece completamente caracteres acentuados do português (á, é, í, ó, ú, ã, õ, ç, etc.) e outros caracteres especiais, contando-os corretamente como letras na análise.",
            borderColor: "system-success",
          },
          {
            question: "Para que serve a opção 'Diferenciar maiúsculas'?",
            answer:
              "Quando ativada, a ferramenta trata 'A' e 'a' como letras diferentes na análise de frequência. Quando desativada, ambas são contadas como a mesma letra. Útil para análises linguísticas específicas.",
            borderColor: "system-warning",
          },
          {
            question: "Há limite de texto para análise?",
            answer:
              "Não há limite rígido, mas para melhor performance recomendamos textos até 100.000 caracteres. A ferramenta é otimizada para processar textos longos rapidamente, mantendo a análise em tempo real.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica para Análise Eficiente",
          content:
            "<strong>Aproveite as opções:</strong> Use 'Ignorar espaços' para contar apenas conteúdo, 'Ignorar pontuação' para análise linguística pura, e 'Diferenciar maiúsculas' para estudos detalhados de frequência.",
        }}
        footerText="<strong>Lembre-se:</strong> O contador é atualizado automaticamente conforme você digita. Todas as estatísticas são calculadas em tempo real para máxima praticidade."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Contador de Caracteres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">contador de caracteres</strong>{" "}
              oferece <strong className="text-growth-green">análise completa em tempo real</strong>{" "}
              do seu texto. Digite ou cole qualquer texto para ver estatísticas detalhadas
              instantaneamente.
            </p>
            <p>
              <strong>Recursos avançados:</strong> Contagem de caracteres, letras, palavras, frases,
              análise de frequência de letras, estatísticas médias e opções de filtro
              personalizáveis.
            </p>
            <p>
              <strong className="text-system-info">Ideal para:</strong> Redatores, estudantes,
              pesquisadores, desenvolvedores e qualquer pessoa que precise de{" "}
              <strong>análise textual precisa</strong> e detalhada.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚡ Análise em tempo real • 📊 Estatísticas detalhadas • 🔤 Frequência de letras • 📱
              Mobile-friendly • 🌙 Modo escuro • 🎯 Precisão total
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="contador-caracteres" />
    </div>
  );
}
