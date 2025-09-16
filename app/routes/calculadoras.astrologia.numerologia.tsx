import type { MetaFunction } from "@remix-run/node";
import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "~/components/ui";
import { Input } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import numerologyData from "~/data/astrology/numerologia/numerologia-interpretacoes.json";
import { APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Numerologia Online Grátis | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "🔮 Calculadora de Numerologia Pitagórica GRÁTIS! Descubra seu número da vida, destino, personalidade e alma. Mapa numerológico completo com nome e data de nascimento. Teste agora!",
    },
    {
      name: "keywords",
      content:
        "numerologia pitagórica, calculadora numerologia grátis, mapa numerológico, número da vida, número do destino, número da alma, número da personalidade, numerologia do nome completo, autoconhecimento numerológico, tabela pitagórica, significado números, numerologia online grátis",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
    },
    {
      property: "og:title",
      content: "Calculadora Numerologia Pitagórica Grátis 2025 | Mapa Numerológico Completo",
    },
    {
      property: "og:description",
      content:
        "🔮 Calculadora de Numerologia Pitagórica GRÁTIS! Descubra seu número da vida, destino, personalidade e alma. Mapa numerológico completo com interpretações detalhadas.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/numerologia.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Numerologia - Interface moderna mostrando cálculos numerológicos e interpretações",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
    },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Numerologia Pitagórica Grátis 2025 🔮 Mapa Completo",
    },
    {
      name: "twitter:description",
      content:
        "🔮 Numerologia Pitagórica GRÁTIS! Descubra número da vida, destino, alma e personalidade. Mapa numerológico completo baseado no seu nome e data de nascimento.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/numerologia.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Numerologia - Análise completa dos números da vida",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#BA68C8" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Numerologia BR" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Numerologia - Descubra Seus Números da Vida 2025",
        description:
          "Calculadora numerológica completa e gratuita para descobrir seu número da vida, personalidade, destino e alma. Interpretações detalhadas baseadas em nome completo e data de nascimento com análise profunda da personalidade.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-01-15",
        datePublished: "2025-01-15",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
          name: "Calculadora de Numerologia 2025 - Números da Vida",
          description:
            "Calculadora numerológica com interpretações detalhadas para autoconhecimento e desenvolvimento pessoal através dos números.",
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
                name: "Astrologia",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Numerologia",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Numerologia e Autoconhecimento",
          description:
            "Estudo dos números e sua influência na personalidade, destino e características pessoais",
          category: "Self-Help",
        },
        featureList: [
          "Cálculo do número da vida (caminho de vida)",
          "Número da personalidade",
          "Número do destino",
          "Número da alma/motivação",
          "Interpretações detalhadas de cada número",
          "Análise de compatibilidade numerológica",
          "Dicas de desenvolvimento pessoal",
          "Interface responsiva e mobile-first",
          "Cálculos instantâneos",
          "Análise completa gratuita",
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
            name: "Como calcular o número da vida na numerologia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular o número da vida, some todos os dígitos da sua data de nascimento e reduza a um único dígito. Por exemplo: 15/03/1990 → 1+5+0+3+1+9+9+0 = 28 → 2+8 = 10 → 1+0 = 1. O número da vida é 1. Exceção para números mestres 11, 22 e 33.",
            },
          },
          {
            "@type": "Question",
            name: "O que significa cada número na numerologia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cada número de 1 a 9 possui significados específicos: 1 (liderança), 2 (cooperação), 3 (criatividade), 4 (organização), 5 (liberdade), 6 (família), 7 (espiritualidade), 8 (sucesso material), 9 (humanitarismo). Os números mestres 11, 22 e 33 têm vibração espiritual elevada.",
            },
          },
          {
            "@type": "Question",
            name: "A numerologia é científica ou apenas crenças?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A numerologia não é uma ciência exata, mas sim um sistema simbólico milenar usado para autoconhecimento e reflexão pessoal. Deve ser vista como uma ferramenta de desenvolvimento pessoal, não como predição absoluta do futuro.",
            },
          },
        ],
      }),
    },
  ];
};

// Interfaces
interface NumerologyData {
  fullName: string;
  birthDate: string;
}

interface NumerologyResult {
  lifePathNumber: number;
  personalityNumber: number;
  destinyNumber: number;
  soulNumber: number;
  calculations: {
    lifePathCalculation: string;
    personalityCalculation: string;
    destinyCalculation: string;
    soulCalculation: string;
  };
  interpretations: {
    lifePath: string;
    personality: string;
    destiny: string;
    soul: string;
  };
  compatibility: string[];
  isLifePathMasterNumber: boolean;
  calculatedAt: Date;
}

interface ValidationErrors {
  fullName?: string;
  birthDate?: string;
}

// Tabela de valores numerológicos das letras
const letterValues: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
  // Acentos e caracteres especiais
  Á: 1,
  À: 1,
  Â: 1,
  Ã: 1,
  Ä: 1,
  É: 5,
  È: 5,
  Ê: 5,
  Ë: 5,
  Í: 9,
  Ì: 9,
  Î: 9,
  Ï: 9,
  Ó: 6,
  Ò: 6,
  Ô: 6,
  Õ: 6,
  Ö: 6,
  Ú: 3,
  Ù: 3,
  Û: 3,
  Ü: 3,
  Ç: 3,
  Ñ: 5,
};

// Vogais para cálculo do número da alma
const vowels = [
  "A",
  "E",
  "I",
  "O",
  "U",
  "Á",
  "À",
  "Â",
  "Ã",
  "Ä",
  "É",
  "È",
  "Ê",
  "Ë",
  "Í",
  "Ì",
  "Î",
  "Ï",
  "Ó",
  "Ò",
  "Ô",
  "Õ",
  "Ö",
  "Ú",
  "Ù",
  "Û",
  "Ü",
];

// Função para reduzir número a dígito único (exceto números mestres)
const reduceToSingleDigit = (num: number, allowMasterNumbers = true): number => {
  if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
    return num;
  }

  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
  }
  return num;
};

// Calcular número da vida (caminho de vida)
const calculateLifePathNumber = (date: string): { number: number; calculation: string } => {
  const [year, month, day] = date.split("-").map(Number);

  const daySum = day
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);
  const monthSum = month
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);
  const yearSum = year
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);

  const total = daySum + monthSum + yearSum;
  const finalNumber = reduceToSingleDigit(total);

  const calculation = `${day}/${month}/${year} → ${day} + ${month} + ${year} = ${daySum} + ${monthSum} + ${yearSum} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Calcular valor numerológico de uma string
const calculateNameValue = (name: string, useOnlyVowels = false): number => {
  const cleanName = name.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, "");

  let total = 0;
  for (const letter of cleanName) {
    if (useOnlyVowels) {
      if (vowels.includes(letter) && letterValues[letter]) {
        total += letterValues[letter];
      }
    } else {
      if (letterValues[letter]) {
        total += letterValues[letter];
      }
    }
  }

  return total;
};

// Calcular número do destino (nome completo)
const calculateDestinyNumber = (fullName: string): { number: number; calculation: string } => {
  const total = calculateNameValue(fullName);
  const finalNumber = reduceToSingleDigit(total, true); // Permite números mestres para destino

  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, "");
  const letterBreakdown = Array.from(cleanName)
    .map((letter) => `${letter}(${letterValues[letter] || 0})`)
    .join(" + ");

  const calculation = `${fullName} → ${letterBreakdown} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Calcular número da personalidade (consoantes)
const calculatePersonalityNumber = (fullName: string): { number: number; calculation: string } => {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, "");

  let total = 0;
  const consonants = [];

  for (const letter of cleanName) {
    if (!vowels.includes(letter) && letterValues[letter]) {
      total += letterValues[letter];
      consonants.push(`${letter}(${letterValues[letter]})`);
    }
  }

  const finalNumber = reduceToSingleDigit(total, false); // Personalidade não usa números mestres

  const calculation = `Consoantes: ${consonants.join(" + ")} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Calcular número da alma (vogais)
const calculateSoulNumber = (fullName: string): { number: number; calculation: string } => {
  const total = calculateNameValue(fullName, true);
  const finalNumber = reduceToSingleDigit(total, false); // Alma não usa números mestres

  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, "");
  const vowelBreakdown = Array.from(cleanName)
    .filter((letter) => vowels.includes(letter))
    .map((letter) => `${letter}(${letterValues[letter] || 0})`)
    .join(" + ");

  const calculation = `Vogais: ${vowelBreakdown} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Interpretações detalhadas dos números com cristais, ervas e orientações adicionais
// Usar dados do JSON importado ao invés de objeto local
const numberInterpretations = numerologyData as Record<
  string,
  {
    lifePath: string;
    personality: string;
    destiny: string;
    soul: string;
    compatibility: string[];
    crystals: string[];
    herbs: string[];
    colors: string[];
    affirmation: string;
    chakra: string;
    careerPaths: string[];
    challenges: string[];
    gifts: string[];
    moonPhase: string;
    element: string;
  }
>;

// Função de validação
const validateNumerologyData = (data: NumerologyData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validar nome completo
  if (!data.fullName.trim()) {
    errors.fullName = "Nome completo é obrigatório";
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = "Nome deve ter pelo menos 3 caracteres";
  } else if (!/^[a-záàâãäéèêëíìîïóòôõöúùûüçñ\s]+$/i.test(data.fullName.trim())) {
    errors.fullName = "Nome deve conter apenas letras e espaços";
  }

  // Validar data de nascimento
  if (!data.birthDate) {
    errors.birthDate = "Data de nascimento é obrigatória";
  } else {
    const birthDate = new Date(data.birthDate);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      errors.birthDate = "Data de nascimento inválida";
    } else if (birthDate > today) {
      errors.birthDate = "Data de nascimento não pode ser no futuro";
    } else if (birthDate < new Date("1900-01-01")) {
      errors.birthDate = "Data de nascimento muito antiga";
    }
  }

  return errors;
};

// Função principal de cálculo numerológico
const calculateNumerology = (data: NumerologyData): NumerologyResult => {
  const lifePathResult = calculateLifePathNumber(data.birthDate);
  const destinyResult = calculateDestinyNumber(data.fullName);
  const personalityResult = calculatePersonalityNumber(data.fullName);
  const soulResult = calculateSoulNumber(data.fullName);

  const interpretations =
    numberInterpretations[lifePathResult.number.toString()] || numberInterpretations["1"];

  return {
    lifePathNumber: lifePathResult.number,
    personalityNumber: personalityResult.number,
    destinyNumber: destinyResult.number,
    soulNumber: soulResult.number,
    calculations: {
      lifePathCalculation: lifePathResult.calculation,
      personalityCalculation: personalityResult.calculation,
      destinyCalculation: destinyResult.calculation,
      soulCalculation: soulResult.calculation,
    },
    interpretations: {
      lifePath: interpretations.lifePath,
      personality: interpretations.personality,
      destiny: interpretations.destiny,
      soul: interpretations.soul,
    },
    compatibility: interpretations.compatibility,
    isLifePathMasterNumber: [11, 22, 33].includes(lifePathResult.number),
    calculatedAt: new Date(),
  };
};

// Componente de resultado detalhado
const DetailedResultDisplay = ({ result }: { result: NumerologyResult }) => {
  const getNumberColor = (number: number) => {
    const colors = {
      1: "from-rose-400 via-pink-500 to-red-500",
      2: "from-orange-300 via-coral-400 to-pink-400",
      3: "from-yellow-300 via-gold-400 to-orange-400",
      4: "from-emerald-400 via-teal-400 to-cyan-400",
      5: "from-sky-400 via-blue-400 to-indigo-400",
      6: "from-indigo-400 via-purple-400 to-violet-400",
      7: "from-purple-400 via-violet-500 to-fuchsia-500",
      8: "from-pink-400 via-rose-500 to-red-500",
      9: "from-teal-400 via-cyan-500 to-blue-500",
      11: "from-amber-300 via-gold-400 to-yellow-500",
      22: "from-slate-300 via-gray-400 to-zinc-500",
      33: "from-rose-300 via-pink-400 to-purple-500",
    };
    return colors[number as keyof typeof colors] || "from-gray-400 to-gray-500";
  };

  const getNumberData = (number: number) => {
    return numberInterpretations[number.toString()] || numberInterpretations["1"];
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho mágico com números principais */}
      <Card className="relative overflow-hidden border-2 border-pink-300/50 bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-blue-50/30 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

        {/* Elementos decorativos flutuantes */}
        <div className="absolute -left-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-xl delay-700"></div>
        <div className="absolute left-1/4 top-1/2 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-yellow-200/20 to-orange-200/20 blur-lg delay-1000"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="text-center">
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="animate-bounce text-3xl">🔮</span>
                <h2 className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Seu Mandala Numerológico
                </h2>
                <span className="animate-bounce text-3xl delay-300">✨</span>
              </div>
              <p className="text-sm font-medium text-purple-600">
                Os números que governam sua jornada espiritual nesta encarnação
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="group transform transition-all duration-300 hover:scale-105">
                <div className="rounded-2xl border border-pink-200/50 bg-gradient-to-b from-white/40 to-white/20 p-6 shadow-lg backdrop-blur-lg">
                  <div
                    className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${getNumberColor(result.lifePathNumber)} shadow-xl ring-4 ring-white/30`}
                  >
                    <span className="text-3xl font-bold text-white drop-shadow-lg">
                      {result.lifePathNumber}
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-bold text-pink-700">✨ Número da Vida</div>
                  <div className="text-xs text-purple-600 opacity-80">Sua missão divina</div>
                </div>
              </div>

              <div className="group transform transition-all duration-300 hover:scale-105">
                <div className="rounded-2xl border border-purple-200/50 bg-gradient-to-b from-white/40 to-white/20 p-6 shadow-lg backdrop-blur-lg">
                  <div
                    className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${getNumberColor(result.destinyNumber)} shadow-xl ring-4 ring-white/30`}
                  >
                    <span className="text-3xl font-bold text-white drop-shadow-lg">
                      {result.destinyNumber}
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-bold text-purple-700">🌟 Destino</div>
                  <div className="text-xs text-blue-600 opacity-80">Seu propósito cósmico</div>
                </div>
              </div>

              <div className="group transform transition-all duration-300 hover:scale-105">
                <div className="rounded-2xl border border-blue-200/50 bg-gradient-to-b from-white/40 to-white/20 p-6 shadow-lg backdrop-blur-lg">
                  <div
                    className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${getNumberColor(result.personalityNumber)} shadow-xl ring-4 ring-white/30`}
                  >
                    <span className="text-3xl font-bold text-white drop-shadow-lg">
                      {result.personalityNumber}
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-bold text-blue-700">🎭 Personalidade</div>
                  <div className="text-xs text-teal-600 opacity-80">Sua máscara pessoal</div>
                </div>
              </div>

              <div className="group transform transition-all duration-300 hover:scale-105">
                <div className="rounded-2xl border border-cyan-200/50 bg-gradient-to-b from-white/40 to-white/20 p-6 shadow-lg backdrop-blur-lg">
                  <div
                    className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${getNumberColor(result.soulNumber)} shadow-xl ring-4 ring-white/30`}
                  >
                    <span className="text-3xl font-bold text-white drop-shadow-lg">
                      {result.soulNumber}
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-bold text-teal-700">💎 Alma</div>
                  <div className="text-xs text-purple-600 opacity-80">Seus desejos profundos</div>
                </div>
              </div>
            </div>

            {result.isLifePathMasterNumber && (
              <div className="relative mt-6 rounded-2xl border-2 border-yellow-600/60 bg-gradient-to-r from-yellow-900/50 via-orange-900/40 to-amber-900/50 p-6 shadow-xl backdrop-blur-lg">
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20"></div>
                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-center gap-3">
                    <span className="animate-spin-slow text-3xl">⭐</span>
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-xl font-bold text-transparent">
                      Número Mestre {result.lifePathNumber}
                    </span>
                    <span className="animate-spin-slow text-3xl">⭐</span>
                  </div>
                  <div className="rounded-xl border border-yellow-600/50 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 p-4">
                    <p className="text-sm font-medium leading-relaxed text-yellow-200">
                      🌟 <strong>Alma Mestra Encarnada:</strong> Você carrega um número especial que
                      indica alta responsabilidade espiritual, dons especiais e uma missão elevada
                      nesta encarnação. Sua jornada requer maior consciência e dedicação ao
                      crescimento espiritual.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Cálculos detalhados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🧮</span>
            Como Chegamos aos Seus Números
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
              <h4 className="mb-2 font-semibold text-primary-blue">
                Número da Vida (Caminho de Vida)
              </h4>
              <p className="font-mono text-sm text-text-secondary">
                {result.calculations.lifePathCalculation}
              </p>
            </div>

            <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
              <h4 className="mb-2 font-semibold text-growth-green">
                Número do Destino (Nome Completo)
              </h4>
              <p className="font-mono text-sm text-text-secondary">
                {result.calculations.destinyCalculation}
              </p>
            </div>

            <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
              <h4 className="mb-2 font-semibold text-system-warning">
                Número da Personalidade (Consoantes)
              </h4>
              <p className="font-mono text-sm text-text-secondary">
                {result.calculations.personalityCalculation}
              </p>
            </div>

            <div className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4">
              <h4 className="mb-2 font-semibold text-math-purple">Número da Alma (Vogais)</h4>
              <p className="font-mono text-sm text-text-secondary">
                {result.calculations.soulCalculation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interpretações mágicas detalhadas */}
      <div className="space-y-8">
        {/* Número da Vida - Versão Feminina Expandida */}
        <Card className="relative overflow-hidden border-2 border-pink-200/60 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/20 shadow-xl">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-200/20 blur-2xl"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl bg-gradient-to-r ${getNumberColor(result.lifePathNumber)} p-4 shadow-2xl ring-4 ring-white/40`}
                >
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    {result.lifePathNumber}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                    ✨ Número da Vida
                  </span>
                  <p className="text-sm font-medium text-purple-600">Sua missão nesta encarnação</p>
                </div>
              </div>

              {/* Informações adicionais do número */}
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">
                  {getNumberData(result.lifePathNumber).element}
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  {getNumberData(result.lifePathNumber).chakra.split(" ")[0]}
                </span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Interpretação principal */}
            <div className="rounded-2xl border border-pink-600/40 bg-gradient-to-r from-gray-800/70 to-gray-900/50 p-6 shadow-lg backdrop-blur-sm">
              <p className="text-base leading-relaxed text-text-secondary">
                {result.interpretations.lifePath}
              </p>
            </div>

            {/* Grid de informações espirituais */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Cristais de Cura */}
              <div className="rounded-xl border border-purple-600/50 bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-5">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-purple-300">
                  <span className="text-lg">💎</span>
                  Cristais de Cura:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getNumberData(result.lifePathNumber).crystals.map((crystal, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-purple-600/50 bg-purple-800/60 px-3 py-1 text-sm font-medium text-purple-200"
                    >
                      {crystal}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs italic text-purple-300">
                  Use estes cristais para amplificar sua energia de vida
                </p>
              </div>

              {/* Ervas Especiais */}
              <div className="rounded-xl border border-green-600/50 bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-5">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-green-300">
                  <span className="text-lg">🌿</span>
                  Ervas Especiais:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getNumberData(result.lifePathNumber).herbs.map((herb, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-green-600/50 bg-green-800/60 px-3 py-1 text-sm font-medium text-green-200"
                    >
                      {herb}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs italic text-green-300">
                  Ervas para chás, banhos e aromatização do ambiente
                </p>
              </div>

              {/* Cores de Poder */}
              <div className="rounded-xl border border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-orange-50 p-5">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-orange-700">
                  <span className="text-lg">🎨</span>
                  Cores de Poder:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getNumberData(result.lifePathNumber).colors.map((color, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                    >
                      {color}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs italic text-orange-600">
                  Use essas cores em roupas e decoração para fortalecer sua energia
                </p>
              </div>

              {/* Fase Lunar */}
              <div className="rounded-xl border border-blue-200/50 bg-gradient-to-br from-indigo-50 to-blue-50 p-5">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-blue-700">
                  <span className="text-lg">🌙</span>
                  Conexão Lunar:
                </h4>
                <p className="text-sm font-medium text-blue-800">
                  {getNumberData(result.lifePathNumber).moonPhase}
                </p>
                <p className="mt-2 text-xs italic text-blue-600">
                  Momento ideal para rituais e manifestações
                </p>
              </div>
            </div>

            {/* Afirmação Pessoal */}
            <div className="rounded-2xl border-2 border-pink-300/50 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-6 text-center">
              <h4 className="mb-3 flex items-center justify-center gap-2 font-bold text-purple-700">
                <span className="text-xl">🙏</span>
                Sua Afirmação Pessoal:
              </h4>
              <p className="text-lg font-semibold italic leading-relaxed text-purple-800">
                "{getNumberData(result.lifePathNumber).affirmation}"
              </p>
              <p className="mt-2 text-xs text-purple-600">
                Repita esta afirmação diariamente para alinhar-se com sua essência
              </p>
            </div>

            {/* Dons e Desafios */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-emerald-700">
                  <span className="text-lg">🎁</span>
                  Seus Dons Naturais:
                </h4>
                <ul className="space-y-2">
                  {getNumberData(result.lifePathNumber).gifts.map((gift, index) => (
                    <li key={index} className="flex items-start gap-2 text-emerald-800">
                      <span className="mt-1 text-emerald-500">✨</span>
                      <span className="text-sm font-medium">{gift}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-rose-200/50 bg-gradient-to-br from-rose-50 to-pink-50 p-5">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-rose-700">
                  <span className="text-lg">🌱</span>
                  Oportunidades de Crescimento:
                </h4>
                <ul className="space-y-2">
                  {getNumberData(result.lifePathNumber).challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-rose-800">
                      <span className="mt-1 text-rose-500">💪</span>
                      <span className="text-sm font-medium">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Caminhos de Carreira */}
            <div className="rounded-xl border border-violet-200/50 bg-gradient-to-r from-violet-50 to-purple-50 p-5">
              <h4 className="mb-4 flex items-center gap-2 font-bold text-violet-700">
                <span className="text-lg">🚀</span>
                Caminhos de Realização Profissional:
              </h4>
              <div className="flex flex-wrap gap-3">
                {getNumberData(result.lifePathNumber).careerPaths.map((career, index) => (
                  <span
                    key={index}
                    className="rounded-lg border border-violet-200 bg-violet-100 px-4 py-2 text-sm font-medium text-violet-800 transition-colors hover:bg-violet-200"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Número do Destino */}
        <Card className="relative overflow-hidden border-l-4 border-growth-green bg-gradient-to-r from-growth-green/10 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div
                className={`rounded-full bg-gradient-to-br p-3 ${getNumberColor(result.destinyNumber)} shadow-lg`}
              >
                <span className="text-2xl font-bold text-white">{result.destinyNumber}</span>
              </div>
              <div>
                <span className="text-xl font-bold text-growth-green">Número do Destino</span>
                <p className="text-sm text-text-secondary">O que você veio realizar nesta vida</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-background-dark-secondary p-4">
              <p className="leading-relaxed text-text-secondary">
                {result.interpretations.destiny}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Número da Personalidade */}
        <Card className="relative overflow-hidden border-l-4 border-system-warning bg-gradient-to-r from-yellow-500/10 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div
                className={`rounded-full bg-gradient-to-br p-3 ${getNumberColor(result.personalityNumber)} shadow-lg`}
              >
                <span className="text-2xl font-bold text-white">{result.personalityNumber}</span>
              </div>
              <div>
                <span className="text-xl font-bold text-system-warning">
                  Número da Personalidade
                </span>
                <p className="text-sm text-text-secondary">Como você se apresenta ao mundo</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-background-dark-secondary p-4">
              <p className="leading-relaxed text-text-secondary">
                {result.interpretations.personality}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Número da Alma */}
        <Card className="relative overflow-hidden border-l-4 border-math-purple bg-gradient-to-r from-math-purple/10 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div
                className={`rounded-full bg-gradient-to-br p-3 ${getNumberColor(result.soulNumber)} shadow-lg`}
              >
                <span className="text-2xl font-bold text-white">{result.soulNumber}</span>
              </div>
              <div>
                <span className="text-xl font-bold text-math-purple">Número da Alma</span>
                <p className="text-sm text-text-secondary">
                  Seus desejos e motivações mais profundos
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-background-dark-secondary p-4">
              <p className="leading-relaxed text-text-secondary">{result.interpretations.soul}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compatibilidade */}
      <Card className="border-2 border-pink-500/20 bg-gradient-to-br from-pink-50/5 to-purple-50/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-3 shadow-lg">
              <span className="text-2xl">💕</span>
            </div>
            <div>
              <span className="text-xl font-bold text-pink-400">Compatibilidade Numerológica</span>
              <p className="text-sm text-text-secondary">Números que harmonizam com o seu</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-background-dark-secondary p-4">
            <p className="mb-4 text-text-secondary">
              Com base no seu número da vida{" "}
              <strong className="text-primary-blue">{result.lifePathNumber}</strong>, você tem maior
              compatibilidade com pessoas dos seguintes números:
            </p>
            <div className="flex flex-wrap gap-3">
              {result.compatibility.map((num, index) => (
                <div
                  key={index}
                  className={`rounded-full bg-gradient-to-br ${getNumberColor(parseInt(num))} px-4 py-2 shadow-lg`}
                >
                  <span className="font-bold text-white">{num}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-text-secondary opacity-75">
              💡 Lembre-se: a compatibilidade numerológica é apenas um guia. O amor verdadeiro
              transcende números!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Número do Destino - Interpretação Completa */}
      <Card className="relative overflow-hidden border-2 border-green-200/60 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/20 shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-green-200/20 to-emerald-200/20 blur-2xl"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-2xl bg-gradient-to-r ${getNumberColor(result.destinyNumber)} p-4 shadow-2xl ring-4 ring-white/40`}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {result.destinyNumber}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent">
                  🌟 Número do Destino
                </span>
                <p className="text-sm font-medium text-green-600">Sua missão através do seu nome</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:ml-auto">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {getNumberData(result.destinyNumber).element}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                {getNumberData(result.destinyNumber).chakra.split(" ")[0]}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-green-600/40 bg-gradient-to-r from-gray-800/70 to-gray-900/50 p-6 shadow-lg backdrop-blur-sm">
            <p className="text-base leading-relaxed text-text-secondary">
              {getNumberData(result.destinyNumber).destiny}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-green-700">
                <span className="text-lg">🚀</span>
                Caminhos de Carreira:
              </h4>
              <div className="flex flex-wrap gap-2">
                {getNumberData(result.destinyNumber)
                  .careerPaths.slice(0, 3)
                  .map((career, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-800"
                    >
                      {career}
                    </span>
                  ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-100 to-teal-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-emerald-700">
                <span className="text-lg">🎁</span>
                Dons Principais:
              </h4>
              <ul className="space-y-1">
                {getNumberData(result.destinyNumber)
                  .gifts.slice(0, 3)
                  .map((gift, index) => (
                    <li key={index} className="flex items-start gap-2 text-emerald-800">
                      <span className="mt-1 text-emerald-500">✨</span>
                      <span className="text-sm font-medium">{gift}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Número da Personalidade - Interpretação Completa */}
      <Card className="relative overflow-hidden border-2 border-blue-200/60 bg-gradient-to-br from-blue-50/50 via-sky-50/30 to-cyan-50/20 shadow-xl">
        <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-200/20 to-sky-200/20 blur-2xl"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-2xl bg-gradient-to-r ${getNumberColor(result.personalityNumber)} p-4 shadow-2xl ring-4 ring-white/40`}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {result.personalityNumber}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-2xl font-bold text-transparent">
                  🎭 Número da Personalidade
                </span>
                <p className="text-sm font-medium text-blue-600">Como você se apresenta ao mundo</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:ml-auto">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {getNumberData(result.personalityNumber).element}
              </span>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                {getNumberData(result.personalityNumber).chakra.split(" ")[0]}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-blue-600/40 bg-gradient-to-r from-gray-800/70 to-gray-900/50 p-6 shadow-lg backdrop-blur-sm">
            <p className="text-base leading-relaxed text-text-secondary">
              {getNumberData(result.personalityNumber).personality}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-100 to-sky-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-blue-700">
                <span className="text-lg">🌈</span>
                Cores de Poder:
              </h4>
              <div className="flex flex-wrap gap-2">
                {getNumberData(result.personalityNumber).colors.map((color, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-200 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-100 to-cyan-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-sky-700">
                <span className="text-lg">🌱</span>
                Desafios de Crescimento:
              </h4>
              <ul className="space-y-1">
                {getNumberData(result.personalityNumber)
                  .challenges.slice(0, 3)
                  .map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-sky-800">
                      <span className="mt-1 text-sky-500">💪</span>
                      <span className="text-sm font-medium">{challenge}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Número da Alma - Interpretação Completa */}
      <Card className="relative overflow-hidden border-2 border-purple-200/60 bg-gradient-to-br from-purple-50/50 via-violet-50/30 to-indigo-50/20 shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-purple-200/20 to-violet-200/20 blur-2xl"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-2xl bg-gradient-to-r ${getNumberColor(result.soulNumber)} p-4 shadow-2xl ring-4 ring-white/40`}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {result.soulNumber}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
                  💎 Número da Alma
                </span>
                <p className="text-sm font-medium text-purple-600">Seus desejos mais profundos</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:ml-auto">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                {getNumberData(result.soulNumber).element}
              </span>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                {getNumberData(result.soulNumber).chakra.split(" ")[0]}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-purple-600/40 bg-gradient-to-r from-gray-800/70 to-gray-900/50 p-6 shadow-lg backdrop-blur-sm">
            <p className="text-base leading-relaxed text-text-secondary">
              {getNumberData(result.soulNumber).soul}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-100 to-violet-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-purple-700">
                <span className="text-lg">💎</span>
                Cristais da Alma:
              </h4>
              <div className="flex flex-wrap gap-2">
                {getNumberData(result.soulNumber)
                  .crystals.slice(0, 3)
                  .map((crystal, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-200 px-3 py-1 text-sm font-medium text-purple-800"
                    >
                      {crystal}
                    </span>
                  ))}
              </div>
            </div>

            <div className="rounded-xl border border-violet-200 bg-gradient-to-br from-violet-100 to-indigo-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-violet-700">
                <span className="text-lg">🌿</span>
                Ervas Especiais:
              </h4>
              <div className="flex flex-wrap gap-2">
                {getNumberData(result.soulNumber)
                  .herbs.slice(0, 3)
                  .map((herb, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-violet-200 px-3 py-1 text-sm font-medium text-violet-800"
                    >
                      {herb}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-purple-300/50 bg-gradient-to-r from-purple-100 via-violet-100 to-indigo-100 p-6 text-center">
            <h4 className="mb-3 flex items-center justify-center gap-2 font-bold text-violet-700">
              <span className="text-xl">🙏</span>
              Afirmação da Alma:
            </h4>
            <p className="text-lg font-semibold italic leading-relaxed text-violet-800">
              "{getNumberData(result.soulNumber).affirmation}"
            </p>
            <p className="mt-2 text-xs text-violet-600">
              Conecte-se com sua essência mais profunda através desta afirmação
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção Como Chegamos aos Seus Números */}
      <Card className="relative overflow-hidden border-2 border-amber-200/60 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/20 shadow-xl">
        <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-2xl"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 p-3 shadow-2xl">
              <span className="text-2xl">🧮</span>
            </div>
            <div>
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent">
                Como Chegamos aos Seus Números
              </span>
              <p className="mt-1 text-sm font-medium text-amber-600">
                Entenda os cálculos por trás da sua análise numerológica
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Número da Vida */}
            <div className="rounded-xl border border-pink-200 bg-gradient-to-br from-pink-100 to-rose-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-pink-700">
                <span className="text-lg">🌟</span>
                Número da Vida ({result.lifePathNumber})
              </h4>
              <div className="rounded-lg border border-pink-200/50 bg-white/60 p-3">
                <p className="font-mono text-sm text-gray-700">
                  {result.calculations.lifePathCalculation}
                </p>
              </div>
              <p className="mt-2 text-xs italic text-pink-600">
                Calculado a partir da sua data de nascimento
              </p>
            </div>

            {/* Número do Destino */}
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-green-700">
                <span className="text-lg">🌟</span>
                Número do Destino ({result.destinyNumber})
              </h4>
              <div className="rounded-lg border border-green-200/50 bg-white/60 p-3">
                <p className="break-all font-mono text-sm text-gray-700">
                  {result.calculations.destinyCalculation}
                </p>
              </div>
              <p className="mt-2 text-xs italic text-green-600">
                Calculado a partir do seu nome completo
              </p>
            </div>

            {/* Número da Personalidade */}
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-100 to-sky-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-blue-700">
                <span className="text-lg">🎭</span>
                Número da Personalidade ({result.personalityNumber})
              </h4>
              <div className="rounded-lg border border-blue-200/50 bg-white/60 p-3">
                <p className="break-all font-mono text-sm text-gray-700">
                  {result.calculations.personalityCalculation}
                </p>
              </div>
              <p className="mt-2 text-xs italic text-blue-600">
                Calculado usando as consoantes do seu nome
              </p>
            </div>

            {/* Número da Alma */}
            <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-100 to-violet-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-purple-700">
                <span className="text-lg">💎</span>
                Número da Alma ({result.soulNumber})
              </h4>
              <div className="rounded-lg border border-purple-200/50 bg-white/60 p-3">
                <p className="break-all font-mono text-sm text-gray-700">
                  {result.calculations.soulCalculation}
                </p>
              </div>
              <p className="mt-2 text-xs italic text-purple-600">
                Calculado usando as vogais do seu nome
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber-300/50 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 p-6">
            <h4 className="mb-3 flex items-center justify-center gap-2 font-bold text-amber-700">
              <span className="text-xl">📚</span>
              Sistema Numerológico Utilizado
            </h4>
            <div className="space-y-2 text-sm text-amber-800">
              <p>
                <strong>Método:</strong> Numerologia Pitagórica - cada letra possui um valor de 1 a
                9
              </p>
              <p>
                <strong>Redução:</strong> Soma contínua até obter um dígito único (preservando
                números mestres 11, 22, 33)
              </p>
              <p>
                <strong>Números Mestres:</strong> Possuem vibração especial e não são reduzidos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente principal
export default function CalculadoraNumerologia() {
  const [numerologyData, setNumerologyData] = useState<NumerologyData>({
    fullName: "",
    birthDate: "",
  });
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "numerologia",
    category: "astrologia",
  });
  useFormTracking("numerologia");

  const validateAndCalculate = () => {
    const validationErrors = validateNumerologyData(numerologyData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      startCalculation();
      setCopySuccess(false);

      try {
        const calculatedResult = calculateNumerology(numerologyData);
        setResult(calculatedResult);

        // Auto-scroll para resultado
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);

        endCalculation(true);
      } catch (error) {
        console.error("Erro no cálculo numerológico:", error);
        setErrors({ fullName: "Erro no cálculo. Tente novamente." });
        endCalculation(false);
      }
    }
  };

  const handleReset = () => {
    setNumerologyData({ fullName: "", birthDate: "" });
    setResult(null);
    setErrors({});
    setCopySuccess(false);
  };

  // Funções de compartilhamento
  const generateShareText = () => {
    if (!result) return "";

    return `🔮 Descobri meu Mapa Numerológico completo!

🌟 Vida: ${result.lifePathNumber} - ${(numberInterpretations[result.lifePathNumber.toString()] || numberInterpretations["1"]).lifePath.substring(0, 120)}...
🌟 Destino: ${result.destinyNumber} - Minha missão através do meu nome
🎭 Personalidade: ${result.personalityNumber} - Como me apresento ao mundo
💎 Alma: ${result.soulNumber} - Meus desejos mais profundos

✨ Faça sua análise numerológica completa também!`;
  };

  const handleWhatsAppShare = () => {
    const text = generateShareText();
    const url = "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + "\n\n" + url)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const text = `🔮 Descobri meu Mapa Numerológico: Vida ${result?.lifePathNumber}, Destino ${result?.destinyNumber}, Personalidade ${result?.personalityNumber}, Alma ${result?.soulNumber}! ✨ Faça sua análise numerológica em:`;
    const url = "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const url = "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia";
    const text = `🔮 Acabei de descobrir meu Mapa Numerológico completo: Vida ${result?.lifePathNumber}, Destino ${result?.destinyNumber}, Personalidade ${result?.personalityNumber}, Alma ${result?.soulNumber}! Faça sua análise numerológica também!`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleTelegramShare = () => {
    const text = generateShareText();
    const url = "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia";
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank");
  };

  const handleEmailShare = () => {
    const text = generateShareText();
    const subject = "Meu Mapa Numerológico Completo";
    const body = `${text}\n\nDescubra sua numerologia em: https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  const copyResult = async () => {
    if (result) {
      const fullText =
        generateShareText() +
        "\n\nDescubra sua numerologia em: https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/numerologia";

      try {
        await navigator.clipboard.writeText(fullText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      } catch (err) {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement("textarea");
        textArea.value = fullText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    }
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl">
      <ResponsiveBreadcrumb items={createCalculatorBreadcrumb("astrologia", "Numerologia")} />

      <header className="space-y-6 text-center">
        <div className="relative">
          {/* Elementos decorativos */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
            <div className="flex space-x-4 opacity-20">
              <span className="animate-pulse text-4xl">✨</span>
              <span className="animate-pulse text-4xl delay-300">🌙</span>
              <span className="delay-600 animate-pulse text-4xl">💫</span>
            </div>
          </div>

          <h1 className="relative z-10 mb-6 text-3xl font-bold text-text-primary md:text-4xl">
            <span className="bg-gradient-to-r from-math-purple via-primary-blue to-pink-500 bg-clip-text text-transparent">
              🔮 Calculadora de Numerologia Pitagórica Grátis 2025
            </span>
            <br />
            <span className="text-2xl font-light md:text-3xl">
              Mapa Numerológico Completo - Descubra Seus Números da Vida, Destino e Alma
            </span>
          </h1>
        </div>

        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-lg leading-relaxed text-text-secondary">
            Bem-vinda ao universo místico da{" "}
            <strong className="text-pink-400">numerologia completa</strong>. Descubra os{" "}
            <strong className="text-purple-400">segredos cósmicos dos números</strong> que governam
            sua jornada espiritual. Calcule seus números de{" "}
            <strong className="text-blue-400">vida, destino, personalidade e alma</strong> com
            interpretações profundas que incluem cristais de cura, ervas especiais e orientações
            lunares.
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-pink-600/30 bg-gradient-to-b from-pink-900/30 to-purple-900/30 p-4 backdrop-blur-sm">
              <span className="mb-2 block text-2xl">🔮</span>
              <span className="text-sm font-medium text-pink-300">Cristais de Cura</span>
            </div>
            <div className="rounded-xl border border-purple-600/30 bg-gradient-to-b from-purple-900/30 to-blue-900/30 p-4 backdrop-blur-sm">
              <span className="mb-2 block text-2xl">🌿</span>
              <span className="text-sm font-medium text-purple-300">Ervas Especiais</span>
            </div>
            <div className="rounded-xl border border-blue-600/30 bg-gradient-to-b from-blue-900/30 to-cyan-900/30 p-4 backdrop-blur-sm">
              <span className="mb-2 block text-2xl">🌙</span>
              <span className="text-sm font-medium text-blue-300">Fases Lunares</span>
            </div>
            <div className="rounded-xl border border-cyan-600/30 bg-gradient-to-b from-cyan-900/30 to-pink-900/30 p-4 backdrop-blur-sm">
              <span className="mb-2 block text-2xl">💎</span>
              <span className="text-sm font-medium text-cyan-300">Chakras & Cores</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="rounded-2xl border border-pink-600/40 bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-blue-900/40 p-6 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-text-secondary">
              <span className="flex items-center gap-2">
                <span className="text-lg">🔢</span>
                <strong className="text-pink-300">Cálculos Completos</strong>
              </span>
              <span className="text-pink-400">•</span>
              <span className="flex items-center gap-2">
                <span className="text-lg">💫</span>
                <strong className="text-purple-300">Orientação Espiritual</strong>
              </span>
              <span className="text-pink-400">•</span>
              <span className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <strong className="text-blue-300">Desenvolvimento Pessoal</strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      <Card className="relative overflow-hidden border-2 border-pink-600/60 bg-gradient-to-br from-gray-900/80 via-purple-900/40 to-blue-900/40 shadow-xl">
        {/* Elementos decorativos de fundo */}
        <div className="absolute left-0 top-0 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-pink-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 blur-2xl delay-1000"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="animate-bounce text-3xl">🔮</span>
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
                Numerologia Completa
              </span>
              <span className="animate-bounce text-3xl delay-500">✨</span>
            </div>
            <p className="text-sm font-medium text-purple-300">
              Descubra os segredos cósmicos dos seus números pessoais
            </p>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Nome Completo */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Nome Completo:
              </label>
              <Input
                id="fullName"
                type="text"
                value={numerologyData.fullName}
                onChange={(e) => setNumerologyData({ ...numerologyData, fullName: e.target.value })}
                placeholder="Digite seu nome completo"
                className="w-full"
                required
              />
              <ErrorMessage error={errors.fullName} />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label
                htmlFor="birthDate"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Data de Nascimento:
              </label>
              <Input
                id="birthDate"
                type="date"
                value={numerologyData.birthDate}
                onChange={(e) =>
                  setNumerologyData({ ...numerologyData, birthDate: e.target.value })
                }
                className="w-full"
                required
              />
              <ErrorMessage error={errors.birthDate} />
            </div>
          </div>

          {/* Informação mágica sobre o cálculo */}
          <div className="relative rounded-2xl border-2 border-pink-600/50 bg-gradient-to-r from-gray-900/60 via-purple-900/40 to-blue-900/40 p-6 shadow-xl">
            <div className="animate-spin-slow absolute right-4 top-4 text-2xl">✨</div>
            <h4 className="mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-center text-lg font-bold text-transparent">
              🔮 O que seu Oráculo Numerológico revelará:
            </h4>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-pink-600/50 bg-gradient-to-br from-pink-900/40 to-rose-900/40 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <strong className="text-pink-300">Número da Vida:</strong>
                </div>
                <p className="text-sm text-pink-200">
                  Sua missão e caminho de evolução espiritual nesta encarnação
                </p>
              </div>

              <div className="rounded-xl border border-purple-600/50 bg-gradient-to-br from-purple-900/40 to-violet-900/40 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">🌟</span>
                  <strong className="text-purple-300">Número do Destino:</strong>
                </div>
                <p className="text-sm text-purple-200">
                  Seu propósito divino baseado na vibração do seu nome completo
                </p>
              </div>

              <div className="rounded-xl border border-blue-600/50 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">🎭</span>
                  <strong className="text-blue-300">Número da Personalidade:</strong>
                </div>
                <p className="text-sm text-blue-200">
                  Como você se apresenta ao mundo e sua máscara social
                </p>
              </div>

              <div className="rounded-xl border border-cyan-600/50 bg-gradient-to-br from-cyan-900/40 to-teal-900/40 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">💎</span>
                  <strong className="text-cyan-300">Número da Alma:</strong>
                </div>
                <p className="text-sm text-cyan-200">
                  Seus desejos mais profundos e motivações íntimas da alma
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-yellow-600/50 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-4 text-center">
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-yellow-200">
                <span className="text-lg">💎</span>
                <span>
                  <strong>Bônus Mágico:</strong> Cristais, ervas, cores e fases lunares
                  personalizadas para sua jornada!
                </span>
                <span className="text-lg">✨</span>
              </p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={validateAndCalculate}
              className="relative transform overflow-hidden rounded-2xl border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 hover:shadow-2xl"
            >
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">🔮</span>
                Revelar Meus Números
                <span className="text-lg">✨</span>
              </span>
            </Button>

            <Button
              onClick={handleReset}
              className="rounded-2xl border border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-semibold text-gray-300 shadow-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-700 hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <span>🌀</span>
                Limpar & Recomeçar
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <div ref={resultRef}>
          <DetailedResultDisplay result={result} />

          {/* Seção de Compartilhamento */}
          <Card className="border-2 border-growth-green bg-gradient-to-r from-growth-green/10 to-growth-green/5">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-bold text-text-primary">
                  📱 Compartilhe seu Mapa Numerológico
                </h3>
                <p className="mb-8 text-lg text-text-secondary">
                  Que tal compartilhar sua análise numerológica com amigos e família?
                </p>

                {/* Botões de Redes Sociais */}
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  <button
                    onClick={handleWhatsAppShare}
                    className="group flex flex-col items-center gap-2 rounded-lg bg-green-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl"
                    title="Compartilhar no WhatsApp"
                  >
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.384" />
                    </svg>
                    <span className="text-xs font-medium">WhatsApp</span>
                  </button>

                  <button
                    onClick={handleFacebookShare}
                    className="group flex flex-col items-center gap-2 rounded-lg bg-blue-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
                    title="Compartilhar no Facebook"
                  >
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-xs font-medium">Facebook</span>
                  </button>

                  <button
                    onClick={handleTwitterShare}
                    className="group flex flex-col items-center gap-2 rounded-lg bg-sky-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-600 hover:shadow-xl"
                    title="Compartilhar no Twitter"
                  >
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="text-xs font-medium">Twitter</span>
                  </button>

                  <button
                    onClick={handleTelegramShare}
                    className="group flex flex-col items-center gap-2 rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl"
                    title="Compartilhar no Telegram"
                  >
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    <span className="text-xs font-medium">Telegram</span>
                  </button>

                  <button
                    onClick={handleEmailShare}
                    className="group flex flex-col items-center gap-2 rounded-lg bg-gray-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
                    title="Compartilhar por Email"
                  >
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium">Email</span>
                  </button>

                  <button
                    onClick={copyResult}
                    className="group flex flex-col items-center gap-2 rounded-lg bg-purple-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-xl"
                    title="Copiar texto"
                  >
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    <span className="text-xs font-medium">
                      {copySuccess ? "✓ Copiado!" : "Copiar"}
                    </span>
                  </button>
                </div>

                <p className="text-sm text-text-secondary">
                  💡 Ajude outras pessoas a descobrirem sua numerologia também!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção Educativa SEO */}
      <Card className="from-growth-green-light border-l-4 border-growth-green bg-gradient-to-r to-primary-blue-light">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📚 O que é Numerologia Pitagórica? Guia Completo 2025
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none text-text-secondary">
            <p className="text-lg leading-relaxed">
              A <strong>numerologia pitagórica</strong> é um sistema ancestral de autoconhecimento
              que utiliza a <strong>tabela pitagórica</strong> para revelar aspectos profundos da
              personalidade através do <strong>nome completo</strong> e{" "}
              <strong>data de nascimento</strong>. Esta calculadora de numerologia online gratuita
              oferece um <strong>mapa numerológico completo</strong> com interpretações detalhadas.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white/10 p-4">
                <h3 className="mb-3 text-lg font-semibold text-primary-blue">
                  🎯 Como Funciona o Cálculo
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Número da Vida:</strong> Calculado pela data de nascimento completa
                  </li>
                  <li>
                    • <strong>Número do Destino:</strong> Baseado no nome completo de batismo
                  </li>
                  <li>
                    • <strong>Número da Alma:</strong> Soma das vogais do seu nome
                  </li>
                  <li>
                    • <strong>Número da Personalidade:</strong> Soma das consoantes
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white/10 p-4">
                <h3 className="mb-3 text-lg font-semibold text-growth-green">
                  ✨ Benefícios da Numerologia
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Autoconhecimento profundo e desenvolvimento pessoal</li>
                  <li>• Compreensão dos talentos e desafios naturais</li>
                  <li>• Orientação para decisões importantes da vida</li>
                  <li>• Entendimento dos ciclos e propósito de vida</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-math-purple/20 bg-math-purple/10 p-4">
              <h3 className="mb-3 text-lg font-semibold text-math-purple">
                🔮 Numerologia vs Outros Métodos
              </h3>
              <p className="text-sm">
                Diferente da <em>numerologia cabalística</em>, a{" "}
                <strong>numerologia pitagórica</strong> utiliza um sistema de redução específico que
                preserva os <strong>números mestres</strong> (11, 22, 33), oferecendo interpretações
                mais precisas sobre seu caminho de vida, missão e características inatas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guia dos Números */}
      <Card className="border-l-4 border-math-purple bg-gradient-to-r from-math-purple-light to-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Significados dos Números na Numerologia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div
                key={num}
                className="rounded-lg border border-neutral-surface-variant bg-background-dark-secondary p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-math-purple to-primary-blue font-bold text-white`}
                  >
                    {num}
                  </div>
                  <h4 className="font-semibold text-primary-blue">Número {num}</h4>
                </div>
                <p className="text-sm text-text-secondary">
                  {num === 1 && "Liderança, independência, pioneirismo e originalidade."}
                  {num === 2 && "Cooperação, diplomacia, sensibilidade e parceria."}
                  {num === 3 && "Criatividade, comunicação, expressão e otimismo."}
                  {num === 4 && "Estabilidade, organização, trabalho duro e praticidade."}
                  {num === 5 && "Liberdade, aventura, versatilidade e mudança."}
                  {num === 6 && "Responsabilidade, família, cuidado e harmonia."}
                  {num === 7 && "Espiritualidade, introspecção, mistério e sabedoria."}
                  {num === 8 && "Sucesso material, autoridade, ambição e poder."}
                  {num === 9 && "Humanitarismo, compaixão, sabedoria universal e altruísmo."}
                </p>
              </div>
            ))}

            {/* Números Mestres */}
            <div className="md:col-span-2 lg:col-span-3">
              <h4 className="mb-4 text-xl font-bold text-growth-green">✨ Números Mestres</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="border-gold-300/20 bg-gold-50/5 rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">11</span>
                    <span className="text-gold-400 font-semibold">Número Mestre 11</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Intuição elevada, inspiração espiritual, liderança visionária e sensibilidade
                    psíquica.
                  </p>
                </div>

                <div className="border-silver-300/20 bg-silver-50/5 rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">22</span>
                    <span className="text-silver-400 font-semibold">Número Mestre 22</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Construtor mestre, grandes realizações, visionário prático e transformador
                    mundial.
                  </p>
                </div>

                <div className="border-rainbow-300/20 bg-rainbow-50/5 rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">33</span>
                    <span className="font-semibold text-purple-400">Número Mestre 33</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Professor mestre, amor incondicional, cura espiritual e serviço à humanidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Numerologia"
        items={[
          {
            question: "Como calcular o número da vida na numerologia?",
            answer:
              "Para calcular o número da vida, some todos os dígitos da sua data de nascimento e reduza a um único dígito. Por exemplo: 15/03/1990 → 1+5+0+3+1+9+9+0 = 28 → 2+8 = 10 → 1+0 = 1. O número da vida é 1. Exceção para números mestres 11, 22 e 33.",
            borderColor: "math-purple",
          },
          {
            question: "O que significa cada número na numerologia?",
            answer:
              "Cada número de 1 a 9 possui significados específicos: 1 (liderança), 2 (cooperação), 3 (criatividade), 4 (organização), 5 (liberdade), 6 (família), 7 (espiritualidade), 8 (sucesso material), 9 (humanitarismo). Os números mestres 11, 22 e 33 têm vibração espiritual elevada.",
            borderColor: "primary-blue",
          },
          {
            question: "A numerologia é científica ou apenas crenças?",
            answer:
              "A numerologia não é uma ciência exata, mas sim um sistema simbólico milenar usado para autoconhecimento e reflexão pessoal. Deve ser vista como uma ferramenta de desenvolvimento pessoal, não como predição absoluta do futuro.",
            borderColor: "system-info",
          },
          {
            question: "Qual a diferença entre os números da vida, destino, personalidade e alma?",
            answer:
              "O número da vida (data de nascimento) mostra sua missão. O destino (nome completo) indica o que você veio realizar. A personalidade (consoantes) é como você se apresenta. A alma (vogais) revela seus desejos mais profundos.",
            borderColor: "system-warning",
          },
          {
            question: "Os números mestres são melhores que os outros?",
            answer:
              "Números mestres (11, 22, 33) não são 'melhores', são diferentes. Eles indicam maior responsabilidade espiritual e potencial elevado, mas também maiores desafios. Cada número tem seu valor único e propósito específico.",
            borderColor: "growth-green",
          },
          {
            question: "A numerologia pode prever o futuro?",
            answer:
              "A numerologia não prevê o futuro, mas oferece insights sobre tendências, potenciais e características pessoais. É uma ferramenta de autoconhecimento que pode ajudar nas escolhas conscientes, mas o livre arbítrio sempre prevalece.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica para Maior Precisão Numerológica",
          content:
            "<strong>Use sempre:</strong> o nome completo como consta em documentos oficiais e a data de nascimento exata. Apelidos ou nomes artísticos podem ser calculados separadamente para comparação, mas o nome de registro é considerado mais significativo numerologicamente.",
        }}
        footerText="<strong>Lembre-se:</strong> A numerologia é uma ferramenta de reflexão e autoconhecimento. Use as informações como guia para seu desenvolvimento pessoal, sempre mantendo seu livre arbítrio e responsabilidade pelas suas escolhas."
      />

      <RelatedCalculators category="astrologia" currentCalculatorId="numerologia" />
    </div>
  );
}
