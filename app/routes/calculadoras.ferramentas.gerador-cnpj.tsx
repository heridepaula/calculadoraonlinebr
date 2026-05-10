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
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Gerador de CNPJ Online | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Gere CNPJ válido grátis com ou sem pontuação. Ferramenta para testes e desenvolvimento com cópia automática. Geração instantânea e confiável.",
    },
    {
      name: "keywords",
      content:
        "gerador CNPJ, CNPJ válido, CNPJ sem pontuação, CNPJ com pontuação, validador CNPJ, teste CNPJ, desenvolvimento CNPJ, pessoa jurídica, criar CNPJ, CNPJ falso, CNPJ fictício, CNPJ para teste",
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
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
    },
    {
      property: "og:title",
      content: "Gerador CNPJ – Gere CNPJ Válido com ou sem Pontuação",
    },
    {
      property: "og:description",
      content:
        "Gere CNPJ válido grátis com ou sem pontuação. Ferramenta para testes e desenvolvimento com cópia automática. Geração instantânea e confiável.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/gerador-cnpj.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Gerador de CNPJ - Gere CNPJs válidos com ou sem pontuação para testes e desenvolvimento",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Gerador de CNPJ 2026 – Geração Rápida com e sem Pontuação",
    },
    {
      name: "twitter:description",
      content:
        "Gerador de CNPJ válido e gratuito com opção de formatação. Cópia automática para área de transferência.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/gerador-cnpj.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de CNPJ - Gere CNPJs válidos para testes",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Gerador CNPJ" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Gerador de CNPJ - Geração Válida com Formatação 2026",
        description:
          "Ferramenta gratuita para gerar CNPJs válidos com ou sem pontuação. Ideal para testes, desenvolvimento e validação de sistemas. Cópia automática para área de transferência.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
          name: "Gerador de CNPJ 2026 - Geração Rápida com e sem Pontuação",
          description:
            "Gerador de CNPJ válido e gratuito com opção de formatação. Gere CNPJs com ou sem pontuação, cópia automática para área de transferência.",
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
                name: "Ferramentas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Gerador de CNPJ",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Cadastro Nacional de Pessoas Jurídicas (CNPJ)",
          description: "Registro de pessoa jurídica no Brasil usado para identificação tributária",
          category: "GovernmentService",
        },
        featureList: [
          "Geração de CNPJ válido",
          "Formatação com ou sem pontuação",
          "Cópia automática para área de transferência",
          "Validação de dígitos verificadores",
          "Interface responsiva",
          "Uso para testes e desenvolvimento",
          "Geração instantânea",
          "Ferramenta gratuita",
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é um CNPJ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CNPJ (Cadastro Nacional de Pessoas Jurídicas) é o documento de identificação fiscal de pessoa jurídica no Brasil, composto por 14 dígitos com formatação XX.XXX.XXX/XXXX-XX.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona o algoritmo de validação do CNPJ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O CNPJ possui dois dígitos verificadores calculados através de operações matemáticas específicas com os primeiros 12 dígitos, validando o número.",
            },
          },
          {
            "@type": "Question",
            name: "Posso usar CNPJs gerados para cadastros reais?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não. CNPJs gerados são apenas para testes, desenvolvimento de sistemas e validação. Usar CNPJ falso em documentos oficiais é crime.",
            },
          },
        ],
      }),
    },
  ];
};

interface CnpjResult {
  cnpj: string;
  cnpjFormatted: string;
  isValid: boolean;
  generatedAt: Date;
}

interface ValidationErrors {
  generation?: string;
}

export default function CnpjGenerator() {
  const [withFormatting, setWithFormatting] = useState(true);
  const [result, setResult] = useState<CnpjResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "gerador-cnpj",
    category: "ferramentas",
  });
  useFormTracking("gerador-cnpj");

  // Gera 12 dígitos aleatórios para o CNPJ (8 dígitos + 4 dígitos da filial)
  const generateRandomDigits = (): string => {
    const baseDigits = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");
    const filialDigits = "0001"; // Matriz (filial 0001)
    return baseDigits + filialDigits;
  };

  // Calcula o primeiro dígito verificador
  const calculateFirstDigit = (cnpjDigits: string): number => {
    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = cnpjDigits.split("").reduce((acc, digit, index) => {
      return acc + parseInt(digit) * weights[index];
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calcula o segundo dígito verificador
  const calculateSecondDigit = (cnpjDigits: string, firstDigit: number): number => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digitsWithFirst = cnpjDigits + firstDigit;
    const sum = digitsWithFirst.split("").reduce((acc, digit, index) => {
      return acc + parseInt(digit) * weights[index];
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Formatar CNPJ com pontuação
  const formatCnpj = (cnpj: string): string => {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  // Função para copiar para clipboard
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback para browsers mais antigos
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const result = document.execCommand("copy");
        textArea.remove();
        return result;
      }
    } catch (error) {
      console.error("Erro ao copiar:", error);
      return false;
    }
  };

  const validateGeneration = (): boolean => {
    const newErrors: ValidationErrors = {};
    setErrors(newErrors);
    return true;
  };

  // Gerar CNPJ válido
  const generateValidCnpj = (): CnpjResult => {
    const randomDigits = generateRandomDigits();
    const firstDigit = calculateFirstDigit(randomDigits);
    const secondDigit = calculateSecondDigit(randomDigits, firstDigit);

    const cnpj = randomDigits + firstDigit + secondDigit;
    const cnpjFormatted = formatCnpj(cnpj);

    return {
      cnpj,
      cnpjFormatted,
      isValid: true,
      generatedAt: new Date(),
    };
  };

  const handleGenerate = async () => {
    if (!validateGeneration()) return;
    startCalculation();
    setCopySuccess(false);

    try {
      const generatedCnpj = generateValidCnpj();
      setResult(generatedCnpj);
      setErrors({});

      // Auto-copy to clipboard
      const cnpjToCopy = withFormatting ? generatedCnpj.cnpjFormatted : generatedCnpj.cnpj;
      const copied = await copyToClipboard(cnpjToCopy);

      if (copied) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro ao gerar CNPJ:", error);
      setErrors({ generation: "Erro ao gerar CNPJ. Tente novamente." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setWithFormatting(true);
    setResult(null);
    setErrors({});
    setCopySuccess(false);
  };

  const handleCopyAgain = async () => {
    if (!result) return;
    const cnpjToCopy = withFormatting ? result.cnpjFormatted : result.cnpj;
    const copied = await copyToClipboard(cnpjToCopy);

    if (copied) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Gerador de CNPJ</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Gerador de CNPJ 2026 – Geração Rápida com e sem Pontuação
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Gere <strong className="text-primary-blue-dark">CNPJs válidos</strong> com ou sem
          pontuação para <strong className="text-growth-green">testes e desenvolvimento</strong>.
          Cópia automática para área de transferência com um clique.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>Geração Instantânea</strong> • 📋 <strong>Cópia Automática</strong> • 🔒{" "}
            <strong>CNPJ Válido</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configurações do Gerador de CNPJ</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Opção de formatação mobile first */}
          <div className="mb-6 flex justify-center">
            <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-neutral-surface-variant sm:flex-row">
              <button
                type="button"
                onClick={() => setWithFormatting(true)}
                className={`flex-1 px-4 py-3 text-center text-base font-medium transition ${
                  withFormatting
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Com Pontuação
              </button>
              <button
                type="button"
                onClick={() => setWithFormatting(false)}
                className={`flex-1 px-4 py-3 text-center text-base font-medium transition ${
                  !withFormatting
                    ? "bg-primary-blue text-white"
                    : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                }`}
              >
                Sem Pontuação
              </button>
            </div>
          </div>

          {/* Informações sobre a formatação */}
          <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Formato selecionado:{" "}
                <strong className="text-primary-blue-dark">
                  {withFormatting ? "XX.XXX.XXX/XXXX-XX" : "XXXXXXXXXXXXXX"}
                </strong>
              </p>
              <p className="mt-1 text-xs text-text-secondary opacity-80">
                O CNPJ será copiado automaticamente para sua área de transferência
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="margin-top-4 flex justify-center space-x-4">
            <Button onClick={handleGenerate} className="px-8">
              Gerar CNPJ
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <div ref={resultRef}>
          <Card className="border-2 border-growth-green bg-growth-green-soft">
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                🎉 CNPJ Gerado com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6">
                <div className="rounded-lg bg-gray-900 p-8 text-center">
                  <div className="mb-4">
                    <div className="mb-2 text-sm text-text-secondary">CNPJ Gerado</div>
                    <div className="break-all font-mono text-4xl font-bold text-primary-blue-dark">
                      {withFormatting ? result.cnpjFormatted : result.cnpj}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                      onClick={handleCopyAgain}
                      variant="outline"
                      className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                    >
                      📋 Copiar Novamente
                    </Button>

                    <Button
                      onClick={() => setWithFormatting(!withFormatting)}
                      variant="outline"
                      className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                    >
                      {withFormatting ? "❌ Remover Pontuação" : "✓ Adicionar Pontuação"}
                    </Button>
                  </div>

                  {copySuccess && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-growth-green-soft px-4 py-2 text-sm text-growth-green">
                      ✓ CNPJ copiado para área de transferência!
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">Informações Técnicas</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    <strong>CNPJ sem formatação:</strong>{" "}
                    <code className="rounded bg-gray-800 px-1">{result.cnpj}</code>
                  </li>
                  <li>
                    <strong>CNPJ formatado:</strong>{" "}
                    <code className="rounded bg-gray-800 px-1">{result.cnpjFormatted}</code>
                  </li>
                  <li>
                    <strong>Status:</strong> <span className="text-growth-green">Válido ✓</span>
                  </li>
                  <li>
                    <strong>Gerado em:</strong> {result.generatedAt.toLocaleString("pt-BR")}
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded border border-system-warning/20 bg-system-warning/10 p-3 text-sm text-system-warning">
                ⚠️ <strong>Importante:</strong> Este CNPJ é válido apenas para testes e
                desenvolvimento. Não utilize em documentos oficiais ou cadastros reais.
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção: Detalhes sobre CNPJ - Guia Completo */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 CNPJ – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* O que é CNPJ */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📄 O que é CNPJ?
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    CNPJ (Cadastro Nacional de Pessoas Jurídicas) é o registro de identificação do
                    contribuinte pessoa jurídica na Receita Federal brasileira, composto por 14
                    dígitos numéricos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Formato</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Formato: XX.XXX.XXX/XXXX-XX</li>
                    <li>• 12 dígitos + 2 dígitos verificadores</li>
                    <li>• Único para cada pessoa jurídica</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Características</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Documento obrigatório para empresas</li>
                    <li>• Válido em todo território nacional</li>
                    <li>• Necessário para transações comerciais</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Importância</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Abertura de contas empresariais</li>
                    <li>• Emissão de notas fiscais</li>
                    <li>• Contratos comerciais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Como funciona a validação */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Algoritmo de Validação
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🎯 Primeiro Dígito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Multiplica-se cada um dos primeiros 12 dígitos por uma sequência específica
                    (5,4,3,2,9,8,7,6,5,4,3,2) e calcula-se o resto da divisão por 11.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Cálculo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Soma = d₁×5 + d₂×4 + ... + d₁₂×2</li>
                    <li>• Resto = Soma % 11</li>
                    <li>• Se resto {"<"} 2, DV1 = 0, senão DV1 = 11 - resto</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🎯 Segundo Dígito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Similar ao primeiro, mas inclui o primeiro dígito verificador e usa sequência
                    (6,5,4,3,2,9,8,7,6,5,4,3,2).
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">✅ Validação</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Soma = d₁×6 + d₂×5 + ... + DV1×2</li>
                    <li>• Resto = Soma % 11</li>
                    <li>• Se resto {"<"} 2, DV2 = 0, senão DV2 = 11 - resto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Usos práticos */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💼 Usos do Gerador de CNPJ
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Usos Permitidos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Testes de software e aplicações</li>
                    <li>• Desenvolvimento de sistemas</li>
                    <li>• Validação de algoritmos</li>
                    <li>• Demonstrações e apresentações</li>
                    <li>• Estudos acadêmicos</li>
                    <li>• Mockups e protótipos</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-error">❌ Usos Proibidos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Cadastros oficiais ou reais</li>
                    <li>• Documentos fiscais</li>
                    <li>• Abertura de empresas</li>
                    <li>• Contratos comerciais</li>
                    <li>• Qualquer documento oficial</li>
                    <li>• Fraudes empresariais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Gerador de CNPJ"
        items={[
          {
            question: "O que é um CNPJ?",
            answer:
              "CNPJ (Cadastro Nacional de Pessoas Jurídicas) é o documento de identificação fiscal de pessoa jurídica no Brasil, composto por 14 dígitos com formatação XX.XXX.XXX/XXXX-XX. É obrigatório para empresas e organizações.",
            borderColor: "primary-blue",
          },
          {
            question: "Como funciona o algoritmo de validação do CNPJ?",
            answer:
              "O CNPJ possui dois dígitos verificadores calculados através de operações matemáticas específicas com os primeiros 12 dígitos. O primeiro dígito usa multiplicadores específicos, e o segundo inclui o primeiro dígito, validando matematicamente o número.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso usar CNPJs gerados para cadastros reais?",
            answer:
              "Não. CNPJs gerados por esta ferramenta são exclusivamente para testes, desenvolvimento de sistemas e validação de algoritmos. Usar CNPJ falso em documentos oficiais é crime previsto em lei e pode resultar em multa e prisão.",
            borderColor: "system-error-dark",
          },
          {
            question: "Como é feita a cópia automática?",
            answer:
              "Ao gerar um CNPJ, ele é automaticamente copiado para sua área de transferência (clipboard) usando a API do navegador. Você pode colar (Ctrl+V) em qualquer lugar. Se não funcionar, use o botão 'Copiar Novamente'.",
            borderColor: "growth-green",
          },
          {
            question: "Qual a diferença entre com e sem pontuação?",
            answer:
              "Com pontuação: 12.345.678/0001-90 (formato padrão para documentos). Sem pontuação: 12345678000190 (formato usado em sistemas e bases de dados). Você pode alternar entre os formatos a qualquer momento.",
            borderColor: "system-info",
          },
          {
            question: "Os CNPJs gerados são realmente válidos?",
            answer:
              "Sim, matematicamente válidos. Os dígitos verificadores são calculados corretamente conforme o algoritmo da Receita Federal. Porém, não existem como registros reais no sistema da Receita Federal.",
            borderColor: "system-warning",
          },
          {
            question: "O que significa a filial '0001'?",
            answer:
              "Todos os CNPJs gerados usam '0001' como código da filial, que representa a matriz da empresa. É o padrão usado para a sede principal de qualquer pessoa jurídica no Brasil.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre CNPJ",
          content:
            "<strong>Para uso seguro:</strong> Use apenas para testes e desenvolvimento. Nunca utilize CNPJs gerados em cadastros reais, documentos oficiais ou transações comerciais. É crime usar CNPJ falso.",
        }}
        footerText="<strong>Lembre-se:</strong> CNPJs gerados são válidos algoritmicamente, mas fictícios. Use responsavelmente apenas para fins de desenvolvimento e testes."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Gerador de CNPJ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">gerador de CNPJ</strong> utiliza o{" "}
              <strong className="text-growth-green">algoritmo oficial</strong> da Receita Federal
              para calcular dígitos verificadores válidos. Os CNPJs gerados passam em todas as
              validações matemáticas, mas são fictícios.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Geração com ou sem pontuação, cópia automática para
              área de transferência, interface responsiva e geração instantânea com um clique.
            </p>
            <p>
              <strong className="text-system-error">Aviso Legal:</strong> Esta ferramenta é
              exclusivamente para fins educacionais, testes de software e desenvolvimento.
              <strong> Usar CNPJ falso em documentos oficiais é crime</strong> previsto nos artigos
              297 e 299 do Código Penal Brasileiro.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚡ Geração instantânea • 📋 Cópia automática • 🔒 CNPJ válido • 📱 Mobile-friendly •
              🌙 Modo escuro • 🛡️ Uso responsável
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="gerador-cnpj" />
    </div>
  );
}
