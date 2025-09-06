import type { MetaFunction } from "@remix-run/node";
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
import { Input } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Moda Estatística 2025 – Calculadora Grátis",
    },
    {
      name: "description",
      content:
        "Calculadora moda estatística grátis. Calcule moda de números, identifique amodal, bimodal e multimodal com explicações passo a passo.",
    },
    {
      name: "keywords",
      content:
        "calculadora moda, moda estatística, calcular moda, amodal, bimodal, multimodal, medidas tendência central, estatística básica, estatística descritiva, análise frequência, conjunto dados, valor frequente, estatística aplicada, matemática estatística",
    },
    { name: "author", content: "Calculadora Online BR" },
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
    },
    {
      property: "og:title",
      content: "Calculadora de Moda 2025 – Cálculo Estatístico de Moda",
    },
    {
      property: "og:description",
      content:
        "Calculadora gratuita de moda estatística. Calcule a moda de números, identifique amodal, bimodal, multimodal com explicações passo a passo.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-moda.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Moda - Calcule moda estatística com explicações passo a passo",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Moda 2025 – Cálculo Estatístico de Moda",
    },
    {
      name: "twitter:description",
      content:
        "Calculadora gratuita de moda estatística. Calcule a moda de números, identifique amodal, bimodal, multimodal.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-moda.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Moda - Calcule moda estatística",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#8E24AA" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Moda - Estatística 2025",
        description:
          "Ferramenta gratuita para calcular a moda estatística de conjuntos de números. Identifica amodal, bimodal e multimodal com explicações detalhadas.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
        applicationCategory: "EducationApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: new Date().toISOString().split("T")[0],
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
          name: "Calculadora de Moda 2025 - Estatística",
          description:
            "Calculadora gratuita de moda estatística. Calcule a moda de números, identifique amodal, bimodal, multimodal com explicações passo a passo.",
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
                name: "Matemática",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Moda",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/moda",
              },
            ],
          },
        },
        about: {
          "@type": "MathSolver",
          name: "Cálculo de Moda Estatística",
          description: "Ferramenta para calcular a moda de conjuntos de dados numéricos",
          mathExpression: "Moda = valor(es) que mais se repete(m) no conjunto",
        },
        featureList: [
          "Cálculo automático da moda estatística",
          "Identificação de amodal, bimodal, multimodal",
          "Análise de frequência absoluta e relativa",
          "Tabela de frequências detalhada",
          "Explicações passo a passo educativas",
          "Interface móvel responsiva e intuitiva",
          "Suporte a números decimais e negativos",
          "Resultados em tempo real",
        ],
      }),
    },
    // FAQ Schema adicional para melhor SEO
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é moda em estatística?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A moda é o valor ou valores que aparecem com maior frequência em um conjunto de dados. É uma das medidas de tendência central mais importantes na estatística.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre amodal, bimodal e multimodal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Amodal: quando não há repetição de valores. Bimodal: quando dois valores diferentes têm a mesma frequência máxima. Multimodal: quando três ou mais valores têm a mesma frequência máxima.",
            },
          },
          {
            "@type": "Question",
            name: "Como calcular a moda de um conjunto de números?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular a moda, conte quantas vezes cada número aparece no conjunto. O(s) número(s) que aparecer(em) mais vezes é(são) a moda. Se nenhum se repete, é amodal.",
            },
          },
        ],
      }),
    },
  ];
};

interface ModeResult {
  originalNumbers: number[];
  sortedNumbers: number[];
  frequency: Record<number, number>;
  modes: number[];
  type: "amodal" | "unimodal" | "bimodal" | "multimodal";
  maxFrequency: number;
}

interface ValidationErrors {
  numbers?: string;
}

export default function ModeCalculator() {
  const [numbersInput, setNumbersInput] = useState("");
  const [result, setResult] = useState<ModeResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "moda",
    category: "matematica",
  });
  useFormTracking("moda");

  const parseNumbers = (input: string): number[] => {
    // Remove espaços extras e separa por vírgula, espaço ou ponto e vírgula
    const numbers = input
      .trim()
      .split(/[,;\s]+/)
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => parseFloat(n.replace(",", ".")))
      .filter((n) => !isNaN(n));

    return numbers;
  };

  const calculateMode = (numbers: number[]): ModeResult => {
    const frequency: Record<number, number> = {};

    // Conta a frequência de cada número
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    // Encontra a frequência máxima
    const maxFrequency = Math.max(...Object.values(frequency));

    // Encontra os números com frequência máxima
    const modes = Object.keys(frequency)
      .filter((num) => frequency[parseFloat(num)] === maxFrequency)
      .map((num) => parseFloat(num))
      .sort((a, b) => a - b);

    // Determina o tipo de moda
    let type: ModeResult["type"];
    if (maxFrequency === 1) {
      type = "amodal";
    } else if (modes.length === 1) {
      type = "unimodal";
    } else if (modes.length === 2) {
      type = "bimodal";
    } else {
      type = "multimodal";
    }

    return {
      originalNumbers: numbers,
      sortedNumbers: [...numbers].sort((a, b) => a - b),
      frequency,
      modes,
      type,
      maxFrequency,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    const numbers = parseNumbers(numbersInput);
    if (numbers.length < 2) {
      newErrors.numbers = "Digite pelo menos 2 números";
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    startCalculation("calcular");
    try {
      const numbers = parseNumbers(numbersInput);
      const modeResult = calculateMode(numbers);

      setResult(modeResult);
      setErrors({});
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      endCalculation("calcular", { success: true });
    } catch {
      setErrors({ numbers: "Erro no cálculo. Verifique os números inseridos." });
      endCalculation("calcular", { success: false });
    }
  };

  const handleClear = () => {
    setNumbersInput("");
    setResult(null);
    setErrors({});
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Moda</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Moda Estatística 2025
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          <strong className="text-math-purple">Calcule a moda de números</strong> facilmente.
          Identifique se o conjunto é <strong>amodal, bimodal ou multimodal</strong> com explicações
          detalhadas.
        </p>
        <div className="bg-math-purple-soft inline-block rounded-lg p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📊 <strong>Análise Completa</strong> • 📈 <strong>Frequência de Dados</strong> • 🎯{" "}
            <strong>Resultados Confiáveis</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🧮 Calculadora de Moda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              label="Digite os números (separados por vírgula, espaço ou ponto e vírgula)"
              value={numbersInput}
              onChange={(e) => setNumbersInput(e.target.value)}
              placeholder="Ex: 1, 2, 2, 3, 4, 4, 4, 5"
              fullWidth
              className="h-12 text-lg"
            />
            <ErrorMessage error={errors.numbers} />
            <p className="mt-2 text-xs text-text-secondary">
              💡 Dica: Você pode usar vírgulas, espaços ou ponto e vírgula para separar os números
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card ref={resultRef as any} className="bg-math-purple-soft border-2 border-math-purple">
          <CardHeader>
            <CardTitle as="h3" className="text-math-purple">
              📊 Resultado da Moda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <div className="text-2xl font-bold text-math-purple">
                {result.type === "amodal"
                  ? "❌ AMODAL (Sem Moda)"
                  : result.type === "unimodal"
                    ? `🎯 MODA: ${result.modes.join(", ")}`
                    : result.type === "bimodal"
                      ? `🎯 BIMODAL: ${result.modes.join(" e ")}`
                      : `🎯 MULTIMODAL: ${result.modes.join(", ")}`}
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                {result.type === "amodal"
                  ? "Nenhum número se repete"
                  : result.type === "unimodal"
                    ? `Aparece ${result.maxFrequency} vezes`
                    : result.type === "bimodal"
                      ? `Cada um aparece ${result.maxFrequency} vezes`
                      : `Cada um aparece ${result.maxFrequency} vezes`}
              </div>
            </div>

            {/* Dados Organizados */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-math-purple/20 bg-gray-900 p-4">
                <h4 className="mb-3 text-lg font-bold text-math-purple">📋 Dados Originais</h4>
                <p className="rounded bg-gray-800 p-2 font-mono text-sm">
                  [{result.originalNumbers.join(", ")}]
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  Total: {result.originalNumbers.length} números
                </p>
              </div>

              <div className="rounded-lg border border-math-purple/20 bg-gray-900 p-4">
                <h4 className="mb-3 text-lg font-bold text-math-purple">📊 Dados Ordenados</h4>
                <p className="rounded bg-gray-800 p-2 font-mono text-sm">
                  [{result.sortedNumbers.join(", ")}]
                </p>
                <p className="mt-2 text-xs text-text-secondary">Ordenação crescente para análise</p>
              </div>
            </div>

            {/* Tabela de Frequências */}
            <div className="mb-6">
              <h4 className="mb-4 text-xl font-bold text-text-primary">📈 Tabela de Frequências</h4>
              <div className="overflow-x-auto rounded-lg border border-neutral-surface-variant">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-surface-variant bg-gray-800">
                      <th className="p-4 text-center font-semibold text-text-primary">Número</th>
                      <th className="p-4 text-center font-semibold text-text-primary">
                        Frequência
                      </th>
                      <th className="p-4 text-center font-semibold text-text-primary">É Moda?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.frequency)
                      .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                      .map(([num, freq]) => (
                        <tr
                          key={num}
                          className={`border-b border-neutral-surface-variant ${
                            result.modes.includes(parseFloat(num))
                              ? "bg-math-purple/20"
                              : "hover:bg-gray-800/30"
                          }`}
                        >
                          <td className="p-4 text-center text-lg font-semibold">{num}</td>
                          <td className="p-4 text-center text-lg font-semibold">{freq}</td>
                          <td className="p-4 text-center">
                            {result.modes.includes(parseFloat(num)) ? (
                              <span className="font-bold text-math-purple">✅ SIM</span>
                            ) : (
                              <span className="text-text-secondary">❌ Não</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explicação do Resultado */}
            <div className="mt-6 rounded-lg bg-gray-800 p-4">
              <h5 className="mb-2 font-semibold text-text-primary">💡 Explicação do Resultado</h5>
              <div className="space-y-2 text-sm text-text-secondary">
                {result.type === "amodal" && (
                  <>
                    <p>
                      • <strong className="text-text-primary">Amodal:</strong> Nenhum número se
                      repete no conjunto
                    </p>
                    <p>• Todos os valores têm frequência igual a 1</p>
                    <p>• Não há valor modal neste conjunto de dados</p>
                  </>
                )}
                {result.type === "unimodal" && (
                  <>
                    <p>
                      • <strong className="text-math-purple">Unimodal:</strong> Há apenas uma moda
                      no conjunto
                    </p>
                    <p>
                      • O número <strong>{result.modes[0]}</strong> aparece{" "}
                      <strong>{result.maxFrequency} vezes</strong>
                    </p>
                    <p>• Este é o valor que mais se repete no conjunto</p>
                  </>
                )}
                {result.type === "bimodal" && (
                  <>
                    <p>
                      • <strong className="text-math-purple">Bimodal:</strong> Há duas modas no
                      conjunto
                    </p>
                    <p>
                      • Os números <strong>{result.modes.join(" e ")}</strong> aparecem{" "}
                      <strong>{result.maxFrequency} vezes cada</strong>
                    </p>
                    <p>• Ambos os valores têm a mesma frequência máxima</p>
                  </>
                )}
                {result.type === "multimodal" && (
                  <>
                    <p>
                      • <strong className="text-math-purple">Multimodal:</strong> Há três ou mais
                      modas no conjunto
                    </p>
                    <p>
                      • Os números <strong>{result.modes.join(", ")}</strong> aparecem{" "}
                      <strong>{result.maxFrequency} vezes cada</strong>
                    </p>
                    <p>• Todos estes valores têm a mesma frequência máxima</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Detalhes dos Tipos de Moda - Guia Completo */}
      <Card className="from-math-purple-soft border-l-4 border-math-purple bg-gradient-to-r to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📖 Tipos de Moda Estatística – Guia Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Moda Unimodal */}
            <div className="rounded-xl border border-math-purple/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-math-purple">
                1️⃣ Distribuição Unimodal - Um Valor Dominante
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Conjunto de dados com apenas um valor que aparece com maior frequência. É o caso
                    mais comum e representa uma clara tendência central.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Um único valor com máxima frequência</li>
                    <li>• Indica consenso ou padrão dominante</li>
                    <li>• Fácil interpretação estatística</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Pesquisas de opinião com resposta dominante</li>
                    <li>• Análise de produtos mais vendidos</li>
                    <li>• Identificação de padrões comportamentais</li>
                    <li>• Controle de qualidade industrial</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💡 Exemplo</h4>
                  <div className="rounded bg-gray-800 p-3 font-mono text-xs text-growth-green">
                    Idades: [25, 30, 25, 35, 25, 40]
                    <br />
                    Moda: 25 (aparece 3 vezes)
                  </div>
                </div>
              </div>
            </div>

            {/* Moda Bimodal */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                2️⃣ Distribuição Bimodal - Dois Picos de Frequência
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Dois valores distintos aparecem com a mesma frequência máxima. Indica
                    polarização ou existência de dois grupos principais.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Duas modas com igual frequência</li>
                    <li>• Sugere divisão em subgrupos</li>
                    <li>• Comum em populações heterogêneas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Análise de mercados segmentados</li>
                    <li>• Estudos demográficos com grupos distintos</li>
                    <li>• Avaliação de preferências polarizadas</li>
                    <li>• Controle de qualidade com dois padrões</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💡 Exemplo</h4>
                  <div className="rounded bg-gray-800 p-3 font-mono text-xs text-growth-green">
                    Notas: [7, 9, 7, 8, 9, 6, 9, 7]
                    <br />
                    Modas: 7 e 9 (3 vezes cada)
                  </div>
                </div>
              </div>
            </div>

            {/* Moda Multimodal */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                3️⃣ Distribuição Multimodal - Múltiplos Picos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Três ou mais valores compartilham a máxima frequência. Indica alta diversidade
                    ou múltiplos padrões concorrentes.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Três+ valores com mesma frequência máxima</li>
                    <li>• Alta variabilidade nos dados</li>
                    <li>• Múltiplos padrões de comportamento</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Análise de mercados muito fragmentados</li>
                    <li>• Estudos com múltiplas categorias populares</li>
                    <li>• Pesquisas com alta diversidade de respostas</li>
                    <li>• Análise de dados categóricos complexos</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💡 Exemplo</h4>
                  <div className="rounded bg-gray-800 p-3 font-mono text-xs text-growth-green">
                    Cores: [azul, verde, azul, vermelho, verde, vermelho]
                    <br />
                    Modas: azul, verde, vermelho (2 vezes cada)
                  </div>
                </div>
              </div>
            </div>

            {/* Distribuição Amodal */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ❌ Distribuição Amodal - Sem Moda
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Todos os valores aparecem com a mesma frequência. Não há valor dominante ou
                    padrão claramente identificável.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Frequências iguais para todos os valores</li>
                    <li>• Distribuição uniforme dos dados</li>
                    <li>• Ausência de tendência central por moda</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Interpretação</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Indica alta homogeneidade na distribuição</li>
                    <li>• Ausência de preferências dominantes</li>
                    <li>• Pode sugerir amostra muito pequena</li>
                    <li>• Usar outras medidas de tendência central</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-primary-blue-dark">💡 Exemplo</h4>
                  <div className="rounded bg-gray-800 p-3 font-mono text-xs text-growth-green">
                    Valores: [1, 2, 3, 4, 5]
                    <br />
                    Resultado: Amodal (todos aparecem 1 vez)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Comparação de Análises de Frequência */}
      <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ⚖️ Tabela Comparativa: Interpretação da Moda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-surface-variant">
                  <th className="p-3 text-left font-semibold">Tipo de Moda</th>
                  <th className="p-3 text-center font-semibold text-math-purple">Unimodal</th>
                  <th className="p-3 text-center font-semibold text-primary-blue-dark">Bimodal</th>
                  <th className="p-3 text-center font-semibold text-growth-green">Multimodal</th>
                  <th className="p-3 text-center font-semibold text-system-warning">Amodal</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Número de modas</td>
                  <td className="p-3 text-center text-math-purple">1</td>
                  <td className="p-3 text-center text-primary-blue-dark">2</td>
                  <td className="p-3 text-center text-growth-green">3+</td>
                  <td className="p-3 text-center text-system-warning">0</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Interpretação</td>
                  <td className="p-3 text-center">Consenso claro</td>
                  <td className="p-3 text-center">Polarização</td>
                  <td className="p-3 text-center">Alta diversidade</td>
                  <td className="p-3 text-center">Distribuição uniforme</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Facilidade de análise</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐⭐</td>
                  <td className="p-3 text-center">⭐⭐</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Aplicação comercial</td>
                  <td className="p-3 text-center text-system-success">Produto líder claro</td>
                  <td className="p-3 text-center text-system-info">Mercado segmentado</td>
                  <td className="p-3 text-center text-system-warning">Mercado fragmentado</td>
                  <td className="p-3 text-center text-system-error">Sem preferência</td>
                </tr>
                <tr className="border-b border-neutral-surface-variant">
                  <td className="p-3 font-medium">Ação recomendada</td>
                  <td className="p-3 text-center">Focar no valor dominante</td>
                  <td className="p-3 text-center">Analisar ambos os grupos</td>
                  <td className="p-3 text-center">Investigar subdivisões</td>
                  <td className="p-3 text-center">Usar outras medidas</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Frequência relativa</td>
                  <td className="p-3 text-center text-math-purple">Uma dominante</td>
                  <td className="p-3 text-center text-primary-blue-dark">Duas dominantes</td>
                  <td className="p-3 text-center text-growth-green">Múltiplas dominantes</td>
                  <td className="p-3 text-center text-system-warning">Todas iguais</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-math-purple-soft rounded-lg border border-math-purple/20 p-4">
              <h4 className="mb-2 font-bold text-math-purple">1️⃣ Unimodal</h4>
              <p className="text-sm text-text-secondary">
                Ideal para <strong>identificar o padrão dominante</strong> e fazer previsões
                baseadas na tendência principal.
              </p>
            </div>

            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-bold text-primary-blue-dark">2️⃣ Bimodal</h4>
              <p className="text-sm text-text-secondary">
                Revela <strong>dois grupos distintos</strong> que devem ser analisados separadamente
                para estratégias direcionadas.
              </p>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-bold text-growth-green">3️⃣+ Multimodal</h4>
              <p className="text-sm text-text-secondary">
                Indica <strong>alta diversidade</strong> que requer análise segmentada e estratégias
                múltiplas.
              </p>
            </div>

            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-bold text-system-warning">❌ Amodal</h4>
              <p className="text-sm text-text-secondary">
                Sugere <strong>distribuição uniforme</strong> onde outras medidas estatísticas são
                mais úteis.
              </p>
            </div>
          </div>

          {/* Guia de Aplicação Prática */}
          <div className="mt-6 rounded-lg bg-gradient-to-r from-system-info/10 to-math-purple/10 p-4">
            <h4 className="mb-3 font-bold text-system-info">💡 Guia Prático por Área</h4>
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <p className="font-semibold">🛒 E-commerce:</p>
                <p className="text-text-secondary">
                  Identificar produtos mais vendidos e preferências dos clientes
                </p>
              </div>
              <div>
                <p className="font-semibold">📊 Pesquisas:</p>
                <p className="text-text-secondary">
                  Encontrar respostas mais comuns em questionários
                </p>
              </div>
              <div>
                <p className="font-semibold">🏭 Qualidade:</p>
                <p className="text-text-secondary">
                  Detectar defeitos mais frequentes em processos industriais
                </p>
              </div>
              <div>
                <p className="font-semibold">📈 Marketing:</p>
                <p className="text-text-secondary">
                  Identificar perfis e comportamentos dominantes do público
                </p>
              </div>
              <div>
                <p className="font-semibold">🎓 Educação:</p>
                <p className="text-text-secondary">
                  Analisar notas mais frequentes e padrões de desempenho
                </p>
              </div>
              <div>
                <p className="font-semibold">🏥 Saúde:</p>
                <p className="text-text-secondary">
                  Identificar sintomas ou condições mais prevalentes
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <FAQ
        title="Perguntas Frequentes - Moda Estatística"
        items={[
          {
            question: "O que é moda em estatística?",
            answer:
              "A moda é o valor que aparece com maior frequência em um conjunto de dados. É uma das três medidas de tendência central, junto com média e mediana, e é especialmente útil para dados categóricos.",
            borderColor: "math-purple",
          },
          {
            question: "Qual a diferença entre amodal, bimodal e multimodal?",
            answer:
              "Amodal: quando nenhum valor se repete (todos têm frequência 1). Bimodal: quando dois valores diferentes têm a mesma frequência máxima. Multimodal: quando três ou mais valores compartilham a frequência máxima.",
            borderColor: "system-info",
          },
          {
            question: "A moda sempre existe em um conjunto de dados?",
            answer:
              "Não! Quando todos os valores aparecem apenas uma vez, o conjunto é chamado de 'amodal', ou seja, não possui moda. Isso é comum em conjuntos de dados únicos.",
            borderColor: "system-warning",
          },
          {
            question: "Como interpretar a moda em dados práticos?",
            answer:
              "A moda indica o valor mais comum ou típico. Por exemplo, em uma pesquisa de idades, a moda representa a idade mais frequente. É especialmente útil para dados categóricos como cores, marcas ou preferências.",
            borderColor: "growth-green",
          },
        ]}
        tipSection={{
          title: "Dica de Estudo",
          content:
            "<strong>Para memorizar:</strong> Moda = Mais comum (M-M). É o valor que aparece 'na moda' no seu conjunto de dados!",
        }}
        footerText="<strong>Lembre-se:</strong> A moda é especialmente útil para dados categóricos e pode não existir (amodal) ou existir em múltiplos valores."
      />

      <Card className="bg-math-purple-soft border-l-4 border-math-purple duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-math-purple-dark">calculadora de moda</strong> identifica{" "}
              <strong className="text-math-purple">
                automaticamente os valores mais frequentes
              </strong>{" "}
              no seu conjunto de dados.
            </p>
            <p>
              <strong>Como usar:</strong> Digite os números separados por vírgula, espaço ou ponto e
              vírgula. A calculadora conta a frequência de cada valor e identifica a(s) moda(s).
            </p>
            <p>
              <strong className="text-system-warning">Tipos de resultado:</strong> Pode ser amodal
              (sem moda), unimodal (uma moda), bimodal (duas modas) ou multimodal (três+ modas).
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="moda" />
    </div>
  );
}
