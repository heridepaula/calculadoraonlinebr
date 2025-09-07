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
      title: "Gerador Cartão de Crédito – Gere Números de Teste para Desenvolvimento",
    },
    {
      name: "description",
      content:
        "Gere números de cartão de crédito válidos para testes e desenvolvimento. Suporte para Visa, Mastercard, American Express e outras bandeiras. Apenas para fins educacionais.",
    },
    {
      name: "keywords",
      content:
        "gerador cartão crédito, números teste, Visa, Mastercard, American Express, desenvolvimento, teste cartão, cartão fictício, cartão falso para teste",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
    },
    {
      property: "og:title",
      content: "Gerador Cartão de Crédito – Gere Números de Teste para Desenvolvimento",
    },
    {
      property: "og:description",
      content:
        "Gere números de cartão de crédito válidos para testes e desenvolvimento. Suporte para Visa, Mastercard, American Express e outras bandeiras. Apenas para fins educacionais.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/gerador-cartao-credito.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Gerador de Cartão de Crédito - Gere números válidos de teste para desenvolvimento e educação",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Gerador Cartão de Crédito 2025 – Números de Teste Válidos",
    },
    {
      name: "twitter:description",
      content:
        "Gerador de números de cartão de crédito para testes e desenvolvimento. Suporte para todas as principais bandeiras.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/gerador-cartao-credito.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Cartão de Crédito - Números de teste válidos",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Gerador Cartão" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Gerador de Cartão de Crédito - Números de Teste para Desenvolvimento 2025",
        description:
          "Ferramenta educacional para gerar números de cartão de crédito válidos para testes e desenvolvimento. Suporte para Visa, Mastercard, American Express e outras bandeiras.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-01-09",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
          name: "Gerador Cartão de Crédito 2025 - Números de Teste Válidos",
          description:
            "Gerador de números de cartão de crédito para testes e desenvolvimento. Suporte para todas as principais bandeiras e validação com algoritmo de Luhn.",
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
                name: "Gerador de Cartão de Crédito",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cartao-credito",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Gerador de Cartão de Crédito",
          description: "Ferramenta educacional para gerar números de cartão de teste válidos",
          category: "EducationalApplication",
        },
        featureList: [
          "Geração de números válidos com algoritmo de Luhn",
          "Suporte para principais bandeiras",
          "Cópia automática para área de transferência",
          "Interface responsiva",
          "Uso educacional e desenvolvimento",
          "Geração instantânea",
          "Ferramenta gratuita",
          "Validação matemática",
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
            name: "Os números de cartão gerados são reais?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não. Os números são matematicamente válidos (passam no algoritmo de Luhn), mas são fictícios e não correspondem a cartões reais. São exclusivamente para testes e educação.",
            },
          },
          {
            "@type": "Question",
            name: "Quais bandeiras são suportadas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Suportamos Visa, Mastercard, American Express, Discover, Diners Club, JCB e outras bandeiras principais com seus respectivos padrões de numeração.",
            },
          },
          {
            "@type": "Question",
            name: "Posso usar estes números para compras?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não. Estes números são apenas para testes de desenvolvimento e educação. Usá-los para tentativas de compras reais é ilegal e antiético.",
            },
          },
        ],
      }),
    },
  ];
};

type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb";

interface CardResult {
  number: string;
  numberFormatted: string;
  brand: CardBrand;
  brandName: string;
  cvv: string;
  expiryDate: string;
  generatedAt: Date;
}

interface ValidationErrors {
  generation?: string;
}

const CARD_BRANDS = {
  visa: {
    name: "Visa",
    prefixes: ["4"],
    lengths: [13, 16, 19],
    cvvLength: 3,
    color: "#1A1F71",
  },
  mastercard: {
    name: "Mastercard",
    prefixes: ["51", "52", "53", "54", "55", "2221", "2229", "223", "229", "23", "26", "27"],
    lengths: [16],
    cvvLength: 3,
    color: "#EB001B",
  },
  amex: {
    name: "American Express",
    prefixes: ["34", "37"],
    lengths: [15],
    cvvLength: 4,
    color: "#006FCF",
  },
  discover: {
    name: "Discover",
    prefixes: ["6011", "622", "64", "65"],
    lengths: [16],
    cvvLength: 3,
    color: "#FF6000",
  },
  diners: {
    name: "Diners Club",
    prefixes: ["300", "301", "302", "303", "304", "305", "36", "38"],
    lengths: [14],
    cvvLength: 3,
    color: "#0079BE",
  },
  jcb: {
    name: "JCB",
    prefixes: ["35"],
    lengths: [16],
    cvvLength: 3,
    color: "#006EBD",
  },
};

export default function CreditCardGenerator() {
  const [selectedBrand, setSelectedBrand] = useState<CardBrand>("visa");
  const [result, setResult] = useState<CardResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "gerador-cartao-credito",
    category: "ferramentas",
  });
  useFormTracking("gerador-cartao-credito");

  // Algoritmo de Luhn para validação de cartão de crédito
  const calculateLuhnCheckDigit = (partialNumber: string): string => {
    let sum = 0;
    let alternate = true;

    // Processa os dígitos de trás para frente
    for (let i = partialNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(partialNumber.charAt(i));

      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }

      sum += digit;
      alternate = !alternate;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit.toString();
  };

  // Gera um número de cartão válido para a bandeira selecionada
  const generateCardNumber = (brand: CardBrand): string => {
    const brandInfo = CARD_BRANDS[brand];
    const prefix = brandInfo.prefixes[Math.floor(Math.random() * brandInfo.prefixes.length)];
    const length = brandInfo.lengths[Math.floor(Math.random() * brandInfo.lengths.length)];

    // Gera o número base sem o dígito de controle
    let number = prefix;
    const remainingLength = length - prefix.length - 1; // -1 para o dígito de controle

    for (let i = 0; i < remainingLength; i++) {
      number += Math.floor(Math.random() * 10).toString();
    }

    // Adiciona o dígito de controle usando o algoritmo de Luhn
    const checkDigit = calculateLuhnCheckDigit(number);
    return number + checkDigit;
  };

  // Formata o número do cartão com espaços
  const formatCardNumber = (number: string, brand: CardBrand): string => {
    if (brand === "amex") {
      // American Express: XXXX XXXXXX XXXXX
      return number.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
    } else if (brand === "diners") {
      // Diners Club: XXXX XXXXXX XXXX
      return number.replace(/(\d{4})(\d{6})(\d{4})/, "$1 $2 $3");
    } else {
      // Outras bandeiras: XXXX XXXX XXXX XXXX
      return number.replace(/(\d{4})/g, "$1 ").trim();
    }
  };

  // Gera CVV
  const generateCvv = (brand: CardBrand): string => {
    const length = CARD_BRANDS[brand].cvvLength;
    let cvv = "";
    for (let i = 0; i < length; i++) {
      cvv += Math.floor(Math.random() * 10).toString();
    }
    return cvv;
  };

  // Gera data de expiração (sempre no futuro)
  const generateExpiryDate = (): string => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Gera uma data entre 1-5 anos no futuro
    const futureYears = Math.floor(Math.random() * 5) + 1;
    const futureYear = currentYear + futureYears;
    const month = Math.floor(Math.random() * 12) + 1;

    // Se for o mesmo ano, garante que o mês seja no futuro
    const finalMonth = futureYear === currentYear && month <= currentMonth 
      ? currentMonth + Math.floor(Math.random() * (12 - currentMonth)) + 1 
      : month;

    return `${finalMonth.toString().padStart(2, "0")}/${futureYear.toString().slice(-2)}`;
  };

  // Função para copiar para clipboard
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
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

  const handleGenerate = async () => {
    startCalculation();
    setCopySuccess(false);

    try {
      const cardNumber = generateCardNumber(selectedBrand);
      const cardFormatted = formatCardNumber(cardNumber, selectedBrand);
      const cvv = generateCvv(selectedBrand);
      const expiryDate = generateExpiryDate();

      const cardResult: CardResult = {
        number: cardNumber,
        numberFormatted: cardFormatted,
        brand: selectedBrand,
        brandName: CARD_BRANDS[selectedBrand].name,
        cvv,
        expiryDate,
        generatedAt: new Date(),
      };

      setResult(cardResult);
      setErrors({});

      // Auto-copy número do cartão
      const copied = await copyToClipboard(cardFormatted);
      if (copied) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro ao gerar cartão:", error);
      setErrors({ generation: "Erro ao gerar cartão. Tente novamente." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setSelectedBrand("visa");
    setResult(null);
    setErrors({});
    setCopySuccess(false);
  };

  const handleCopyAgain = async () => {
    if (!result) return;
    const copied = await copyToClipboard(result.numberFormatted);

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
        <BreadcrumbItem isLast>Gerador de Cartão de Crédito</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Gerador Cartão de Crédito 2025 – Números de Teste Válidos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Gere <strong className="text-primary-blue-dark">números de cartão válidos</strong> para{" "}
          <strong className="text-growth-green">testes e desenvolvimento</strong>. Suporte para todas
          as principais bandeiras com algoritmo de Luhn.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>Geração Instantânea</strong> • 📋 <strong>Cópia Automática</strong> • 🔒{" "}
            <strong>Algoritmo de Luhn</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">💳 Configurações do Gerador</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Seleção de bandeira */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-text-primary">
              Selecione a Bandeira do Cartão
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {(Object.keys(CARD_BRANDS) as CardBrand[]).map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`flex flex-col items-center rounded-lg border-2 p-3 text-center transition-all ${
                    selectedBrand === brand
                      ? "border-primary-blue bg-primary-blue/10 text-primary-blue"
                      : "border-neutral-surface-variant bg-neutral-surface text-text-secondary hover:border-primary-blue/50"
                  }`}
                >
                  <div
                    className="mb-2 h-8 w-12 rounded"
                    style={{ backgroundColor: CARD_BRANDS[brand].color }}
                  />
                  <span className="text-xs font-medium">{CARD_BRANDS[brand].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Informações sobre a bandeira selecionada */}
          <div className="mb-6 rounded-lg bg-primary-blue-light p-4">
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Bandeira selecionada:{" "}
                <strong className="text-primary-blue-dark">
                  {CARD_BRANDS[selectedBrand].name}
                </strong>
              </p>
              <p className="mt-1 text-xs text-text-secondary opacity-80">
                CVV: {CARD_BRANDS[selectedBrand].cvvLength} dígitos •{" "}
                Comprimento: {CARD_BRANDS[selectedBrand].lengths.join(" ou ")} dígitos
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-center space-x-4">
            <Button onClick={handleGenerate} className="px-8">
              Gerar Cartão
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>

          <ErrorMessage error={errors.generation} />
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <div ref={resultRef}>
          <Card className="border-2 border-growth-green bg-growth-green-soft">
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                🎉 Cartão Gerado com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6">
                {/* Visualização do cartão */}
                <div className="rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm opacity-75">TESTE / TEST</div>
                    <div
                      className="rounded px-2 py-1 text-xs font-bold text-white"
                      style={{ backgroundColor: CARD_BRANDS[result.brand].color }}
                    >
                      {result.brandName}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="mb-2 text-xl font-mono tracking-wider">
                      {result.numberFormatted}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="opacity-75">VÁLIDO ATÉ</div>
                      <div className="font-mono">{result.expiryDate}</div>
                    </div>
                    <div>
                      <div className="opacity-75">CVV</div>
                      <div className="font-mono">{result.cvv}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-xs opacity-60">
                    ⚠️ APENAS PARA TESTES - NÃO É UM CARTÃO REAL
                  </div>
                </div>
              </div>

              <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  onClick={handleCopyAgain}
                  variant="outline"
                  className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                >
                  📋 Copiar Número
                </Button>

                <Button
                  onClick={() => copyToClipboard(`${result.numberFormatted} | ${result.expiryDate} | ${result.cvv}`)}
                  variant="outline"
                  className="border-growth-green text-growth-green hover:bg-growth-green hover:text-white"
                >
                  📋 Copiar Todos os Dados
                </Button>
              </div>

              {copySuccess && (
                <div className="mb-4 text-center">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-growth-green-soft px-4 py-2 text-sm text-growth-green">
                    ✓ Dados copiados para área de transferência!
                  </div>
                </div>
              )}

              <div className="rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-3 font-semibold text-primary-blue-dark">Dados do Cartão</h4>
                
                {/* Número do Cartão */}
                <div className="mb-3 flex items-center justify-between rounded bg-gray-800 p-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">Número do Cartão</div>
                    <code className="text-sm font-mono text-white">{result.numberFormatted}</code>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(result.numberFormatted)}
                    variant="outline"
                    size="sm"
                    className="ml-3 h-8 w-8 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                  >
                    📋
                  </Button>
                </div>

                {/* Validade e CVV */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Validade */}
                  <div className="flex items-center justify-between rounded bg-gray-800 p-3">
                    <div className="flex-1">
                      <div className="text-xs text-gray-400">Validade</div>
                      <code className="text-sm font-mono text-white">{result.expiryDate}</code>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(result.expiryDate)}
                      variant="outline"
                      size="sm"
                      className="ml-3 h-8 w-8 border-growth-green text-growth-green hover:bg-growth-green hover:text-white"
                    >
                      📋
                    </Button>
                  </div>

                  {/* CVV */}
                  <div className="flex items-center justify-between rounded bg-gray-800 p-3">
                    <div className="flex-1">
                      <div className="text-xs text-gray-400">CVV</div>
                      <code className="text-sm font-mono text-white">{result.cvv}</code>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(result.cvv)}
                      variant="outline"
                      size="sm"
                      className="ml-3 h-8 w-8 border-system-info text-system-info hover:bg-system-info hover:text-white"
                    >
                      📋
                    </Button>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div className="mt-3 text-center text-sm text-text-secondary">
                  <div><strong>Bandeira:</strong> {result.brandName}</div>
                  <div><strong>Gerado em:</strong> {result.generatedAt.toLocaleString("pt-BR")}</div>
                </div>
              </div>

              <div className="mt-4 rounded border border-system-error/20 bg-system-error/10 p-3 text-sm text-system-error">
                ⚠️ <strong>Importante:</strong> Este cartão é válido apenas para testes e educação.
                Não é um cartão real e não pode ser usado para compras ou transações.
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção educacional */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funcionam os Cartões de Crédito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Algoritmo de Luhn */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Algoritmo de Luhn
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🎯 Como Funciona</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    O algoritmo de Luhn (Mod 10) é usado para validar números de cartão de crédito.
                    Ele detecta erros de digitação simples e sequências inválidas.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Processo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Multiplica dígitos alternados por 2</li>
                    <li>• Soma todos os dígitos resultantes</li>
                    <li>• Verifica se a soma é múltipla de 10</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🏛️ Estrutura dos Números</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Cada bandeira tem padrões específicos de numeração que identificam
                    o emissor, tipo de cartão e outras informações.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">✅ Validação</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Verifica prefixos da bandeira</li>
                    <li>• Confirma comprimento correto</li>
                    <li>• Aplica algoritmo de Luhn</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bandeiras */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💳 Principais Bandeiras
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">Visa</h4>
                  <p className="text-sm text-text-secondary">Inicia com 4, 13-19 dígitos</p>
                </div>
                <div className="rounded-lg bg-system-error/20 p-4">
                  <h4 className="mb-2 font-semibold text-system-error">Mastercard</h4>
                  <p className="text-sm text-text-secondary">Inicia com 5 ou 2, 16 dígitos</p>
                </div>
                <div className="rounded-lg bg-system-info/20 p-4">
                  <h4 className="mb-2 font-semibold text-system-info">American Express</h4>
                  <p className="text-sm text-text-secondary">Inicia com 34/37, 15 dígitos</p>
                </div>
              </div>
            </div>

            {/* Casos de uso */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                💼 Usos Educacionais
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Usos Permitidos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Testes de desenvolvimento</li>
                    <li>• Validação de formulários</li>
                    <li>• Estudos de algoritmos</li>
                    <li>• Demonstrações educacionais</li>
                    <li>• Testes de integração</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-error">❌ Usos Proibidos</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Tentativas de compra</li>
                    <li>• Fraudes ou golpes</li>
                    <li>• Cadastros reais</li>
                    <li>• Atividades ilegais</li>
                    <li>• Teste em sistemas de produção</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Gerador de Cartão de Crédito"
        items={[
          {
            question: "Os números de cartão gerados são reais?",
            answer:
              "Não. Os números são matematicamente válidos (passam no algoritmo de Luhn), mas são fictícios e não correspondem a cartões reais. São exclusivamente para testes educacionais e desenvolvimento.",
            borderColor: "system-error-dark",
          },
          {
            question: "Quais bandeiras são suportadas pelo gerador?",
            answer:
              "Suportamos as principais bandeiras: Visa, Mastercard, American Express, Discover, Diners Club e JCB. Cada uma segue seus padrões específicos de numeração e formatação.",
            borderColor: "primary-blue",
          },
          {
            question: "Como funciona o algoritmo de Luhn?",
            answer:
              "O algoritmo de Luhn (Mod 10) valida números de cartão multiplicando dígitos alternados por 2, somando todos os resultados e verificando se o total é divisível por 10. É usado mundialmente para detectar erros de digitação.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso usar estes números para compras ou cadastros?",
            answer:
              "Não. Estes números são apenas para testes de desenvolvimento e educação. Tentar usá-los para compras reais ou cadastros é ilegal e antiético. São números fictícios sem valor monetário.",
            borderColor: "system-error-dark",
          },
          {
            question: "Por que o CVV e data de validade são gerados?",
            answer:
              "Para testes completos de formulários e sistemas que requerem estes campos. Os CVVs seguem o padrão de cada bandeira (3 ou 4 dígitos) e as datas são sempre futuras para simular cartões válidos.",
            borderColor: "system-info",
          },
          {
            question: "É seguro usar esta ferramenta?",
            answer:
              "Sim, é completamente seguro para fins educacionais. Todos os números são gerados localmente no seu navegador e não são armazenados. Use apenas para aprendizado e desenvolvimento de software.",
            borderColor: "growth-green",
          },
          {
            question: "Como posso usar para testes de desenvolvimento?",
            answer:
              "Use os números gerados para testar formulários de pagamento, validações de cartão, integrações com APIs de pagamento em ambiente de testes (sandbox) e verificar se seu código está funcionando corretamente.",
            borderColor: "system-success",
          },
        ]}
        tipSection={{
          title: "Dica de Segurança",
          content:
            "<strong>Uso Responsável:</strong> Esta ferramenta é estritamente educacional. Nunca use os números gerados para tentativas de fraude, compras reais ou qualquer atividade ilegal. Use apenas em ambientes de teste.",
        }}
        footerText="<strong>Lembre-se:</strong> Os números gerados são válidos matematicamente, mas completamente fictícios. Use com responsabilidade apenas para educação e desenvolvimento."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Gerador de Cartão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">gerador de cartão de crédito</strong> cria
              números <strong className="text-growth-green">matematicamente válidos</strong> usando o
              algoritmo de Luhn. Todos os dados são fictícios e servem apenas para educação.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Suporte a 6 bandeiras principais, geração de CVV e data
              de validade, cópia automática, interface responsiva e validação completa com algoritmo de Luhn.
            </p>
            <p>
              <strong className="text-system-error">Aviso Legal:</strong> Esta ferramenta é
              exclusivamente educacional. <strong>É crime usar números fictícios para fraudes</strong> ou
              tentativas de compra. Use apenas para desenvolvimento e aprendizado.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚡ Geração instantânea • 🔒 Algoritmo de Luhn • 📋 Cópia automática • 📱 Mobile-friendly • 🎓
              Uso educacional • 🛡️ Totalmente seguro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="gerador-cartao-credito" />
    </div>
  );
}