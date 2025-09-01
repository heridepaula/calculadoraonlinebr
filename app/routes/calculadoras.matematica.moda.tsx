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
      title: "Calculadora de Moda 2025 – Cálculo Estatístico de Moda | CalculadoraOnlineBR",
    },
    {
      name: "description",
      content:
        "Calculadora gratuita de moda estatística. Calcule a moda de números, identifique amodal, bimodal, multimodal com explicações passo a passo e exemplos práticos.",
    },
    {
      name: "keywords",
      content:
        "calculadora moda, moda estatística, calcular moda, amodal, bimodal, multimodal, medidas tendência central, estatística básica",
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
      content:
        "Calculadora de Moda - Calcule moda estatística com explicações passo a passo",
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
    { name: "theme-color", content: "#8B5CF6" },
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
        dateModified: "2025-09-01",
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
          "Cálculo automático da moda",
          "Identificação de amodal, bimodal, multimodal",
          "Análise de frequência de números",
          "Explicações passo a passo",
          "Interface educativa e intuitiva",
        ],
      }),
    },
    // FAQ Schema adicional para melhor SEO
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é moda em estatística?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A moda é o valor ou valores que aparecem com maior frequência em um conjunto de dados. É uma das medidas de tendência central mais importantes na estatística."
            }
          },
          {
            "@type": "Question", 
            "name": "Qual a diferença entre amodal, bimodal e multimodal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Amodal: quando não há repetição de valores. Bimodal: quando dois valores diferentes têm a mesma frequência máxima. Multimodal: quando três ou mais valores têm a mesma frequência máxima."
            }
          },
          {
            "@type": "Question",
            "name": "Como calcular a moda de um conjunto de números?", 
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para calcular a moda, conte quantas vezes cada número aparece no conjunto. O(s) número(s) que aparecer(em) mais vezes é(são) a moda. Se nenhum se repete, é amodal."
            }
          }
        ]
      })
    },
  ];
};

interface ModeResult {
  originalNumbers: number[];
  sortedNumbers: number[];
  frequency: Record<number, number>;
  modes: number[];
  type: 'amodal' | 'unimodal' | 'bimodal' | 'multimodal';
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
      .map(n => n.trim())
      .filter(n => n !== "")
      .map(n => parseFloat(n.replace(",", ".")))
      .filter(n => !isNaN(n));
    
    return numbers;
  };

  const calculateMode = (numbers: number[]): ModeResult => {
    const frequency: Record<number, number> = {};
    
    // Conta a frequência de cada número
    numbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    // Encontra a frequência máxima
    const maxFrequency = Math.max(...Object.values(frequency));
    
    // Encontra os números com frequência máxima
    const modes = Object.keys(frequency)
      .filter(num => frequency[parseFloat(num)] === maxFrequency)
      .map(num => parseFloat(num))
      .sort((a, b) => a - b);

    // Determina o tipo de moda
    let type: ModeResult['type'];
    if (maxFrequency === 1) {
      type = 'amodal';
    } else if (modes.length === 1) {
      type = 'unimodal';
    } else if (modes.length === 2) {
      type = 'bimodal';
    } else {
      type = 'multimodal';
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
          Identifique se o conjunto é <strong>amodal, bimodal ou multimodal</strong> com explicações detalhadas.
        </p>
        <div className="inline-block rounded-lg bg-math-purple-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            📊 <strong>Análise Completa</strong> • 📈 <strong>Frequência de Dados</strong> • 🎯{" "}
            <strong>Resultados Precisos</strong>
          </p>
        </div>
      </header>

      {/* Seção informativa sobre moda */}
      <Card className="border-l-4 border-math-purple bg-math-purple-soft">
        <CardContent>
          <div className="py-4">
            <h2 className="mb-3 text-xl font-bold text-math-purple-dark">
              O que é Moda em Estatística?
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              A <strong>moda</strong> é o valor que aparece com maior frequência em um conjunto de dados. 
              É uma das três medidas de tendência central (junto com média e mediana) e é especialmente 
              útil para analisar dados categóricos e identificar padrões de repetição.
            </p>
          </div>
        </CardContent>
      </Card>

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
        <Card ref={resultRef as any} className="border-2 border-math-purple bg-math-purple-soft">
          <CardHeader>
            <CardTitle as="h3" className="text-math-purple">
              📊 Resultado da Moda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <div className="text-2xl font-bold text-math-purple">
                {result.type === 'amodal' ? '❌ AMODAL (Sem Moda)' : 
                 result.type === 'unimodal' ? `🎯 MODA: ${result.modes.join(', ')}` :
                 result.type === 'bimodal' ? `🎯 BIMODAL: ${result.modes.join(' e ')}` :
                 `🎯 MULTIMODAL: ${result.modes.join(', ')}`}
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                {result.type === 'amodal' ? 'Nenhum número se repete' :
                 result.type === 'unimodal' ? `Aparece ${result.maxFrequency} vezes` :
                 result.type === 'bimodal' ? `Cada um aparece ${result.maxFrequency} vezes` :
                 `Cada um aparece ${result.maxFrequency} vezes`}
              </div>
            </div>

            {/* Dados Organizados */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-math-purple/20 bg-gray-900 p-4">
                <h4 className="mb-3 text-lg font-bold text-math-purple">📋 Dados Originais</h4>
                <p className="text-sm font-mono bg-gray-800 p-2 rounded">
                  [{result.originalNumbers.join(', ')}]
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  Total: {result.originalNumbers.length} números
                </p>
              </div>
              
              <div className="rounded-lg border border-math-purple/20 bg-gray-900 p-4">
                <h4 className="mb-3 text-lg font-bold text-math-purple">📊 Dados Ordenados</h4>
                <p className="text-sm font-mono bg-gray-800 p-2 rounded">
                  [{result.sortedNumbers.join(', ')}]
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  Ordenação crescente para análise
                </p>
              </div>
            </div>

            {/* Tabela de Frequências */}
            <div className="mb-6">
              <h4 className="mb-4 text-xl font-bold text-text-primary">📈 Tabela de Frequências</h4>
              <div className="overflow-x-auto rounded-lg border border-neutral-surface-variant">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800 border-b border-neutral-surface-variant">
                      <th className="p-4 text-center font-semibold text-text-primary">Número</th>
                      <th className="p-4 text-center font-semibold text-text-primary">Frequência</th>
                      <th className="p-4 text-center font-semibold text-text-primary">É Moda?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.frequency)
                      .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                      .map(([num, freq]) => (
                      <tr key={num} className={`border-b border-neutral-surface-variant ${
                        result.modes.includes(parseFloat(num)) ? 'bg-math-purple/20' : 'hover:bg-gray-800/30'
                      }`}>
                        <td className="p-4 text-center font-semibold text-lg">{num}</td>
                        <td className="p-4 text-center font-semibold text-lg">{freq}</td>
                        <td className="p-4 text-center">
                          {result.modes.includes(parseFloat(num)) ? 
                            <span className="text-math-purple font-bold">✅ SIM</span> : 
                            <span className="text-text-secondary">❌ Não</span>
                          }
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
                {result.type === 'amodal' && (
                  <>
                    <p>• <strong className="text-text-primary">Amodal:</strong> Nenhum número se repete no conjunto</p>
                    <p>• Todos os valores têm frequência igual a 1</p>
                    <p>• Não há valor modal neste conjunto de dados</p>
                  </>
                )}
                {result.type === 'unimodal' && (
                  <>
                    <p>• <strong className="text-math-purple">Unimodal:</strong> Há apenas uma moda no conjunto</p>
                    <p>• O número <strong>{result.modes[0]}</strong> aparece <strong>{result.maxFrequency} vezes</strong></p>
                    <p>• Este é o valor que mais se repete no conjunto</p>
                  </>
                )}
                {result.type === 'bimodal' && (
                  <>
                    <p>• <strong className="text-math-purple">Bimodal:</strong> Há duas modas no conjunto</p>
                    <p>• Os números <strong>{result.modes.join(' e ')}</strong> aparecem <strong>{result.maxFrequency} vezes cada</strong></p>
                    <p>• Ambos os valores têm a mesma frequência máxima</p>
                  </>
                )}
                {result.type === 'multimodal' && (
                  <>
                    <p>• <strong className="text-math-purple">Multimodal:</strong> Há três ou mais modas no conjunto</p>
                    <p>• Os números <strong>{result.modes.join(', ')}</strong> aparecem <strong>{result.maxFrequency} vezes cada</strong></p>
                    <p>• Todos estes valores têm a mesma frequência máxima</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

      <Card className="border-l-4 border-math-purple bg-math-purple-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-math-purple-dark">calculadora de moda</strong> identifica{" "}
              <strong className="text-math-purple">automaticamente os valores mais frequentes</strong> no seu conjunto de dados.
            </p>
            <p>
              <strong>Como usar:</strong> Digite os números separados por vírgula, espaço ou ponto e vírgula. 
              A calculadora conta a frequência de cada valor e identifica a(s) moda(s).
            </p>
            <p>
              <strong className="text-system-warning">Tipos de resultado:</strong> Pode ser amodal (sem moda), 
              unimodal (uma moda), bimodal (duas modas) ou multimodal (três+ modas).
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="moda" />
    </div>
  );
}