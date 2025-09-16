import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
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
import { Select } from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Conversor de Unidades Online | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Conversor de unidades completo com 17 categorias: comprimento, massa, volume, área, temperatura, tempo, velocidade, dados, energia, pressão, força, potência e mais. Conversão instantânea e precisa.",
    },
    {
      name: "keywords",
      content:
        "conversor unidades, converter medidas, metros para quilômetros, celsius fahrenheit, quilogramas libras, litros galões, conversor temperatura, conversor peso",
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
    },
    {
      property: "og:title",
      content: "Conversor de Unidades – 17 Categorias com Conversão Instantânea",
    },
    {
      property: "og:description",
      content:
        "Conversor de unidades completo com 17 categorias: comprimento, massa, volume, área, temperatura, tempo, velocidade, dados, energia, pressão, força, potência e mais. Conversão instantânea e precisa.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/conversor-unidades.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Conversor de Unidades - 17 categorias de conversão com interface moderna e intuitiva",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Conversor de Unidades 2025 – 17 Categorias de Conversão",
    },
    {
      name: "twitter:description",
      content:
        "Conversor completo com 17 categorias: comprimento, massa, volume, temperatura e mais. Conversão instantânea e precisa.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/conversor-unidades.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Conversor de Unidades - 17 categorias de conversão",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Conversor Unidades" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Conversor de Unidades - 17 Categorias de Conversão 2025",
        description:
          "Conversor de unidades completo e gratuito com 17 categorias: comprimento, massa, volume, área, temperatura, tempo, velocidade, dados, energia, pressão, força, potência, concentração, fluxo, ângulo, iluminação e frequência. Conversão instantânea e precisa.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
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
          "@id":
            "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
          name: "Conversor de Unidades 2025 - 17 Categorias de Conversão",
          description:
            "Conversor de unidades completo com 17 categorias de conversão. Interface intuitiva, conversão instantânea e suporte a dezenas de unidades de medida diferentes.",
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
                name: "Conversor de Unidades",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/conversor-unidades",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Conversão de Unidades de Medida",
          description:
            "Sistema de conversão entre diferentes unidades de medida usadas globalmente",
          category: "Mathematics",
        },
        featureList: [
          "17 categorias de conversão",
          "Conversão instantânea",
          "Interface responsiva",
          "Comprimento (metro, quilômetro, milha, etc.)",
          "Massa/Peso (quilograma, libra, grama, etc.)",
          "Volume (litro, galão, metro cúbico, etc.)",
          "Área (metro quadrado, hectare, acre, etc.)",
          "Temperatura (Celsius, Fahrenheit, Kelvin)",
          "Tempo (segundo, minuto, hora, dia, etc.)",
          "Velocidade (m/s, km/h, mph, nós)",
          "Dados (bit, byte, KB, MB, GB, TB)",
          "Energia (joule, caloria, watt-hora, etc.)",
          "Pressão (pascal, bar, psi, etc.)",
          "Força (newton, quilograma-força, etc.)",
          "Potência (watt, quilowatt, cavalo de potência)",
          "Precisão decimal ajustável",
          "Suporte offline",
          "Múltiplas unidades por categoria",
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
            name: "Quantas categorias de conversão estão disponíveis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O conversor possui 17 categorias completas: comprimento, massa/peso, volume, área, temperatura, tempo, velocidade, dados/informação, energia, pressão, força, potência, concentração, fluxo, ângulo, iluminação e frequência.",
            },
          },
          {
            "@type": "Question",
            name: "Como converter metros para pés?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Selecione a categoria 'Comprimento', escolha 'Metro (m)' como unidade de origem, 'Pé (ft)' como destino e digite o valor. A conversão é instantânea: 1 metro = 3.28084 pés.",
            },
          },
          {
            "@type": "Question",
            name: "O conversor funciona offline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim! Após carregar a página, todas as conversões são feitas localmente no seu navegador, permitindo uso mesmo sem conexão à internet.",
            },
          },
        ],
      }),
    },
  ];
};

// Definição das categorias e unidades
interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: number; // Fator para converter para unidade base
  fromBase?: (value: number) => number; // Função personalizada para converter da base (para casos especiais como temperatura)
  toBaseFunc?: (value: number) => number; // Função personalizada para converter para a base
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseUnit: string;
  units: Unit[];
}

const CONVERSION_CATEGORIES: Category[] = [
  {
    id: "comprimento",
    name: "Comprimento",
    icon: "📏",
    description: "Metro, quilômetro, milha, pé, polegada",
    baseUnit: "metro",
    units: [
      { id: "m", name: "Metro", symbol: "m", toBase: 1 },
      { id: "km", name: "Quilômetro", symbol: "km", toBase: 1000 },
      { id: "cm", name: "Centímetro", symbol: "cm", toBase: 0.01 },
      { id: "mm", name: "Milímetro", symbol: "mm", toBase: 0.001 },
      { id: "mi", name: "Milha", symbol: "mi", toBase: 1609.344 },
      { id: "yd", name: "Jarda", symbol: "yd", toBase: 0.9144 },
      { id: "ft", name: "Pé", symbol: "ft", toBase: 0.3048 },
      { id: "in", name: "Polegada", symbol: "in", toBase: 0.0254 },
    ],
  },
  {
    id: "massa",
    name: "Massa/Peso",
    icon: "⚖️",
    description: "Quilograma, grama, libra, onça, tonelada",
    baseUnit: "quilograma",
    units: [
      { id: "kg", name: "Quilograma", symbol: "kg", toBase: 1 },
      { id: "g", name: "Grama", symbol: "g", toBase: 0.001 },
      { id: "mg", name: "Miligrama", symbol: "mg", toBase: 0.000001 },
      { id: "lb", name: "Libra", symbol: "lb", toBase: 0.453592 },
      { id: "oz", name: "Onça", symbol: "oz", toBase: 0.0283495 },
      { id: "t", name: "Tonelada", symbol: "t", toBase: 1000 },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "🫗",
    description: "Litro, mililitro, galão, metro cúbico",
    baseUnit: "litro",
    units: [
      { id: "l", name: "Litro", symbol: "L", toBase: 1 },
      { id: "ml", name: "Mililitro", symbol: "mL", toBase: 0.001 },
      { id: "m3", name: "Metro cúbico", symbol: "m³", toBase: 1000 },
      { id: "gal", name: "Galão (US)", symbol: "gal", toBase: 3.78541 },
      { id: "cup", name: "Xícara", symbol: "cup", toBase: 0.24 },
    ],
  },
  {
    id: "area",
    name: "Área",
    icon: "🔲",
    description: "Metro quadrado, hectare, acre, quilômetro quadrado",
    baseUnit: "metro quadrado",
    units: [
      { id: "m2", name: "Metro quadrado", symbol: "m²", toBase: 1 },
      { id: "km2", name: "Quilômetro quadrado", symbol: "km²", toBase: 1000000 },
      { id: "cm2", name: "Centímetro quadrado", symbol: "cm²", toBase: 0.0001 },
      { id: "ha", name: "Hectare", symbol: "ha", toBase: 10000 },
      { id: "acre", name: "Acre", symbol: "acre", toBase: 4046.86 },
      { id: "ft2", name: "Pé quadrado", symbol: "ft²", toBase: 0.092903 },
    ],
  },
  {
    id: "temperatura",
    name: "Temperatura",
    icon: "🌡️",
    description: "Celsius, Fahrenheit, Kelvin",
    baseUnit: "celsius",
    units: [
      {
        id: "c",
        name: "Celsius",
        symbol: "°C",
        toBase: 1,
        toBaseFunc: (value: number) => value,
        fromBase: (value: number) => value,
      },
      {
        id: "f",
        name: "Fahrenheit",
        symbol: "°F",
        toBase: 1,
        toBaseFunc: (value: number) => ((value - 32) * 5) / 9,
        fromBase: (value: number) => (value * 9) / 5 + 32,
      },
      {
        id: "k",
        name: "Kelvin",
        symbol: "K",
        toBase: 1,
        toBaseFunc: (value: number) => value - 273.15,
        fromBase: (value: number) => value + 273.15,
      },
    ],
  },
  {
    id: "tempo",
    name: "Tempo",
    icon: "⏰",
    description: "Segundo, minuto, hora, dia, semana, ano",
    baseUnit: "segundo",
    units: [
      { id: "s", name: "Segundo", symbol: "s", toBase: 1 },
      { id: "min", name: "Minuto", symbol: "min", toBase: 60 },
      { id: "h", name: "Hora", symbol: "h", toBase: 3600 },
      { id: "d", name: "Dia", symbol: "d", toBase: 86400 },
      { id: "w", name: "Semana", symbol: "sem", toBase: 604800 },
      { id: "month", name: "Mês", symbol: "mês", toBase: 2628000 },
      { id: "y", name: "Ano", symbol: "ano", toBase: 31536000 },
    ],
  },
  {
    id: "velocidade",
    name: "Velocidade",
    icon: "🏎️",
    description: "m/s, km/h, mph, nós",
    baseUnit: "metros por segundo",
    units: [
      { id: "ms", name: "Metro por segundo", symbol: "m/s", toBase: 1 },
      { id: "kmh", name: "Quilômetro por hora", symbol: "km/h", toBase: 0.277778 },
      { id: "mph", name: "Milha por hora", symbol: "mph", toBase: 0.44704 },
      { id: "kt", name: "Nó", symbol: "kt", toBase: 0.514444 },
    ],
  },
  {
    id: "dados",
    name: "Dados/Informação",
    icon: "💾",
    description: "Bit, byte, KB, MB, GB, TB",
    baseUnit: "byte",
    units: [
      { id: "bit", name: "Bit", symbol: "b", toBase: 0.125 },
      { id: "byte", name: "Byte", symbol: "B", toBase: 1 },
      { id: "kb", name: "Quilobyte", symbol: "KB", toBase: 1024 },
      { id: "mb", name: "Megabyte", symbol: "MB", toBase: 1048576 },
      { id: "gb", name: "Gigabyte", symbol: "GB", toBase: 1073741824 },
      { id: "tb", name: "Terabyte", symbol: "TB", toBase: 1099511627776 },
    ],
  },
  {
    id: "energia",
    name: "Energia",
    icon: "⚡",
    description: "Joule, caloria, watt-hora, kWh",
    baseUnit: "joule",
    units: [
      { id: "j", name: "Joule", symbol: "J", toBase: 1 },
      { id: "cal", name: "Caloria", symbol: "cal", toBase: 4.184 },
      { id: "kcal", name: "Quilocaloria", symbol: "kcal", toBase: 4184 },
      { id: "wh", name: "Watt-hora", symbol: "Wh", toBase: 3600 },
      { id: "kwh", name: "Quilowatt-hora", symbol: "kWh", toBase: 3600000 },
    ],
  },
  {
    id: "pressao",
    name: "Pressão",
    icon: "🔬",
    description: "Pascal, bar, kgf/cm², psi",
    baseUnit: "pascal",
    units: [
      { id: "pa", name: "Pascal", symbol: "Pa", toBase: 1 },
      { id: "bar", name: "Bar", symbol: "bar", toBase: 100000 },
      { id: "kgfcm2", name: "Quilograma-força/cm²", symbol: "kgf/cm²", toBase: 98066.5 },
      { id: "psi", name: "Libra-força/pol²", symbol: "psi", toBase: 6894.76 },
      { id: "atm", name: "Atmosfera", symbol: "atm", toBase: 101325 },
    ],
  },
  {
    id: "forca",
    name: "Força",
    icon: "💪",
    description: "Newton, quilograma-força, libra-força",
    baseUnit: "newton",
    units: [
      { id: "n", name: "Newton", symbol: "N", toBase: 1 },
      { id: "kgf", name: "Quilograma-força", symbol: "kgf", toBase: 9.80665 },
      { id: "lbf", name: "Libra-força", symbol: "lbf", toBase: 4.44822 },
    ],
  },
  {
    id: "potencia",
    name: "Potência",
    icon: "🔋",
    description: "Watt, quilowatt, cavalo de potência",
    baseUnit: "watt",
    units: [
      { id: "w", name: "Watt", symbol: "W", toBase: 1 },
      { id: "kw", name: "Quilowatt", symbol: "kW", toBase: 1000 },
      { id: "hp", name: "Cavalo de potência", symbol: "hp", toBase: 745.7 },
    ],
  },
  {
    id: "concentracao",
    name: "Concentração",
    icon: "🧪",
    description: "Porcentagem, ppm, ppb",
    baseUnit: "porcentagem",
    units: [
      { id: "percent", name: "Porcentagem", symbol: "%", toBase: 1 },
      { id: "ppm", name: "Partes por milhão", symbol: "ppm", toBase: 0.0001 },
      { id: "ppb", name: "Partes por bilhão", symbol: "ppb", toBase: 0.0000001 },
    ],
  },
  {
    id: "fluxo",
    name: "Fluxo",
    icon: "🌊",
    description: "L/s, L/min, m³/h",
    baseUnit: "litro por segundo",
    units: [
      { id: "ls", name: "Litro por segundo", symbol: "L/s", toBase: 1 },
      { id: "lmin", name: "Litro por minuto", symbol: "L/min", toBase: 0.0166667 },
      { id: "m3h", name: "Metro cúbico por hora", symbol: "m³/h", toBase: 0.277778 },
    ],
  },
  {
    id: "angulo",
    name: "Ângulo",
    icon: "📐",
    description: "Grau, radiano, gon",
    baseUnit: "grau",
    units: [
      { id: "deg", name: "Grau", symbol: "°", toBase: 1 },
      { id: "rad", name: "Radiano", symbol: "rad", toBase: 57.2958 },
      { id: "gon", name: "Gon", symbol: "gon", toBase: 0.9 },
    ],
  },
  {
    id: "iluminacao",
    name: "Iluminação",
    icon: "💡",
    description: "Lux, lumen, candela",
    baseUnit: "lux",
    units: [
      { id: "lx", name: "Lux", symbol: "lx", toBase: 1 },
      { id: "lm", name: "Lumen por m²", symbol: "lm/m²", toBase: 1 },
      { id: "cd", name: "Candela por m²", symbol: "cd/m²", toBase: 3.14159 },
    ],
  },
  {
    id: "frequencia",
    name: "Frequência",
    icon: "📶",
    description: "Hertz, kHz, MHz, GHz",
    baseUnit: "hertz",
    units: [
      { id: "hz", name: "Hertz", symbol: "Hz", toBase: 1 },
      { id: "khz", name: "Quilohertz", symbol: "kHz", toBase: 1000 },
      { id: "mhz", name: "Megahertz", symbol: "MHz", toBase: 1000000 },
      { id: "ghz", name: "Gigahertz", symbol: "GHz", toBase: 1000000000 },
    ],
  },
];

interface ConversionResult {
  value: number;
  fromUnit: Unit;
  toUnit: Unit;
  category: Category;
  convertedAt: Date;
}

interface ValidationErrors {
  value?: string;
  category?: string;
}

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState<string>("comprimento");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("km");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "conversor-unidades",
    category: "ferramentas",
  });
  useFormTracking("conversor-unidades");

  // Obter categoria atual
  const currentCategory = CONVERSION_CATEGORIES.find((cat) => cat.id === selectedCategory);

  // Obter unidades da categoria atual
  const currentUnits = currentCategory?.units || [];

  // Função para converter unidades
  const convertUnits = (
    value: number,
    fromUnitId: string,
    toUnitId: string,
    category: Category
  ): number => {
    const fromUnitObj = category.units.find((u) => u.id === fromUnitId);
    const toUnitObj = category.units.find((u) => u.id === toUnitId);

    if (!fromUnitObj || !toUnitObj) return 0;

    // Para temperatura, usar funções personalizadas
    if (category.id === "temperatura") {
      const celsiusValue = fromUnitObj.toBaseFunc ? fromUnitObj.toBaseFunc(value) : value;
      return toUnitObj.fromBase ? toUnitObj.fromBase(celsiusValue) : celsiusValue;
    }

    // Para outras categorias, usar conversão padrão via unidade base
    const baseValue = fromUnitObj.toBaseFunc
      ? fromUnitObj.toBaseFunc(value)
      : value * fromUnitObj.toBase;
    const result = toUnitObj.fromBase
      ? toUnitObj.fromBase(baseValue)
      : baseValue / toUnitObj.toBase;

    return result;
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

  const validateInput = (): boolean => {
    const newErrors: ValidationErrors = {};

    const numValue = parseFloat(inputValue.replace(",", "."));
    if (isNaN(numValue)) {
      newErrors.value = "Digite um número válido";
    }

    if (!currentCategory) {
      newErrors.category = "Selecione uma categoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConvert = async () => {
    if (!validateInput()) return;
    startCalculation();
    setCopySuccess(false);

    try {
      const numValue = parseFloat(inputValue.replace(",", "."));
      const fromUnitObj = currentUnits.find((u) => u.id === fromUnit);
      const toUnitObj = currentUnits.find((u) => u.id === toUnit);

      if (!fromUnitObj || !toUnitObj || !currentCategory) {
        setErrors({ category: "Erro ao obter unidades" });
        endCalculation(false);
        return;
      }

      const convertedValue = convertUnits(numValue, fromUnit, toUnit, currentCategory);

      const conversionResult: ConversionResult = {
        value: convertedValue,
        fromUnit: fromUnitObj,
        toUnit: toUnitObj,
        category: currentCategory,
        convertedAt: new Date(),
      };

      setResult(conversionResult);
      setErrors({});

      // Auto-copy resultado
      const resultText = `${numValue} ${fromUnitObj.symbol} = ${convertedValue.toLocaleString("pt-BR", { maximumFractionDigits: 6 })} ${toUnitObj.symbol}`;
      const copied = await copyToClipboard(resultText);

      if (copied) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro na conversão:", error);
      setErrors({ value: "Erro ao realizar conversão. Tente novamente." });
      endCalculation(false);
    }
  };

  // Auto-conversão quando valores mudam
  useEffect(() => {
    if (inputValue && !isNaN(parseFloat(inputValue.replace(",", ".")))) {
      handleConvert();
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  // Atualizar unidades quando categoria muda
  useEffect(() => {
    if (currentCategory && currentCategory.units.length > 0) {
      setFromUnit(currentCategory.units[0].id);
      setToUnit(
        currentCategory.units.length > 1 ? currentCategory.units[1].id : currentCategory.units[0].id
      );
    }
  }, [selectedCategory]);

  const handleReset = () => {
    setSelectedCategory("comprimento");
    setFromUnit("m");
    setToUnit("km");
    setInputValue("");
    setResult(null);
    setErrors({});
    setCopySuccess(false);
  };

  const handleSwapUnits = () => {
    const tempFromUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempFromUnit);
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Conversor de Unidades</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Conversor de Unidades 2025 – 17 Categorias de Conversão
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Converta <strong className="text-primary-blue-dark">qualquer unidade de medida</strong>{" "}
          com precisão e rapidez.{" "}
          <strong className="text-growth-green">17 categorias completas</strong> com conversão
          instantânea e interface mobile-first.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>Conversão Instantânea</strong> • 📊 <strong>17 Categorias</strong> • 🔄{" "}
            <strong>Precisão Decimal</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Conversor de Unidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Seleção de Categoria */}
            <div>
              <Select
                label="Categoria de Conversão"
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                options={CONVERSION_CATEGORIES.map((cat) => ({
                  value: cat.id,
                  label: `${cat.icon} ${cat.name}`,
                }))}
                fullWidth
              />
              {currentCategory && (
                <div className="mt-2 text-sm text-text-secondary">
                  {currentCategory.description}
                </div>
              )}
              <ErrorMessage error={errors.category} />
            </div>

            {/* Valor de Entrada */}
            <div>
              <Input
                label="Valor a Converter"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite o valor"
                fullWidth
              />
              <ErrorMessage error={errors.value} />
            </div>

            {/* Seleção de Unidades */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Select
                  label="De"
                  value={fromUnit}
                  onChange={(value) => setFromUnit(value)}
                  options={currentUnits.map((unit) => ({
                    value: unit.id,
                    label: `${unit.name} (${unit.symbol})`,
                  }))}
                  fullWidth
                />
              </div>

              <div className="flex items-end">
                <div className="flex-1">
                  <Select
                    label="Para"
                    value={toUnit}
                    onChange={(value) => setToUnit(value)}
                    options={currentUnits.map((unit) => ({
                      value: unit.id,
                      label: `${unit.name} (${unit.symbol})`,
                    }))}
                    fullWidth
                  />
                </div>
                <Button
                  onClick={handleSwapUnits}
                  variant="outline"
                  className="ml-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                >
                  🔄
                </Button>
              </div>
            </div>

            {/* Informações sobre a conversão */}
            {currentCategory && (
              <div className="rounded-lg bg-primary-blue-light p-4">
                <div className="text-center">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-primary-blue-dark">
                      {currentCategory.icon} {currentCategory.name}
                    </strong>
                  </p>
                  <p className="mt-1 text-xs text-text-secondary opacity-80">
                    {copySuccess
                      ? "✓ Resultado copiado automaticamente!"
                      : "O resultado será copiado automaticamente"}
                  </p>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex justify-center space-x-4">
              <Button onClick={handleConvert} className="px-8">
                Converter
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <div ref={resultRef}>
          <Card className="border-2 border-growth-green bg-growth-green-soft">
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                🎉 Conversão Realizada com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resultado principal */}
                <div className="rounded-lg bg-gray-900 p-6">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="mb-2 text-sm text-text-secondary">Resultado da Conversão</div>
                      <div className="break-all font-mono text-2xl font-bold text-primary-blue-dark md:text-3xl">
                        {parseFloat(inputValue.replace(",", ".")).toLocaleString("pt-BR")}{" "}
                        {result.fromUnit.symbol}
                      </div>
                      <div className="my-2 text-primary-blue-dark">=</div>
                      <div className="break-all font-mono text-2xl font-bold text-growth-green md:text-3xl">
                        {result.value.toLocaleString("pt-BR", { maximumFractionDigits: 6 })}{" "}
                        {result.toUnit.symbol}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <Button
                        onClick={async () => {
                          const resultText = `${parseFloat(inputValue.replace(",", ".")).toLocaleString("pt-BR")} ${result.fromUnit.symbol} = ${result.value.toLocaleString("pt-BR", { maximumFractionDigits: 6 })} ${result.toUnit.symbol}`;
                          const copied = await copyToClipboard(resultText);
                          if (copied) {
                            setCopySuccess(true);
                            setTimeout(() => setCopySuccess(false), 3000);
                          }
                        }}
                        variant="outline"
                        className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                      >
                        📋 Copiar Resultado
                      </Button>

                      <Button
                        onClick={handleSwapUnits}
                        variant="outline"
                        className="border-growth-green text-growth-green hover:bg-growth-green hover:text-white"
                      >
                        🔄 Inverter Conversão
                      </Button>
                    </div>

                    {copySuccess && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-growth-green-soft px-4 py-2 text-sm text-growth-green">
                        ✓ Resultado copiado para área de transferência!
                      </div>
                    )}
                  </div>
                </div>

                {/* Detalhes técnicos */}
                <div className="rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">
                    Detalhes da Conversão
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      <strong>Categoria:</strong> {result.category.icon} {result.category.name}
                    </li>
                    <li>
                      <strong>De:</strong> {result.fromUnit.name} ({result.fromUnit.symbol})
                    </li>
                    <li>
                      <strong>Para:</strong> {result.toUnit.name} ({result.toUnit.symbol})
                    </li>
                    <li>
                      <strong>Convertido em:</strong> {result.convertedAt.toLocaleString("pt-BR")}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guia de Categorias */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📊 Guia Completo de Conversões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Grid de categorias */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CONVERSION_CATEGORIES.slice(0, 9).map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer rounded-lg border border-primary-blue/20 bg-gray-900 p-4 transition-all duration-300 hover:border-primary-blue/50 hover:bg-gray-800"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <h3 className="mb-2 flex items-center text-lg font-bold text-primary-blue-dark">
                    {category.icon} {category.name}
                  </h3>
                  <p className="mb-3 text-sm text-text-secondary">{category.description}</p>
                  <div className="text-xs text-text-secondary opacity-75">
                    {category.units.length} unidades disponíveis
                  </div>
                </div>
              ))}
            </div>

            {/* Conversões populares */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                🔥 Conversões Mais Populares
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    ✨ Medidas do Dia a Dia
                  </h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Metros ↔ Pés/Polegadas</li>
                    <li>• Quilômetros ↔ Milhas</li>
                    <li>• Quilogramas ↔ Libras</li>
                    <li>• Celsius ↔ Fahrenheit</li>
                    <li>• Litros ↔ Galões</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🔬 Técnicas e Científicas</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Pascal ↔ Bar/PSI</li>
                    <li>• Joules ↔ Calorias</li>
                    <li>• Watts ↔ Cavalos de Potência</li>
                    <li>• Graus ↔ Radianos</li>
                    <li>• GB ↔ TB (Dados)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Conversor de Unidades"
        items={[
          {
            question: "Quantas categorias de conversão estão disponíveis?",
            answer:
              "O conversor possui 17 categorias completas: comprimento, massa/peso, volume, área, temperatura, tempo, velocidade, dados/informação, energia, pressão, força, potência, concentração, fluxo, ângulo, iluminação e frequência. Cada categoria inclui as unidades mais utilizadas mundialmente.",
            borderColor: "primary-blue",
          },
          {
            question: "Como converter metros para pés?",
            answer:
              "Selecione a categoria 'Comprimento', escolha 'Metro (m)' como unidade de origem, 'Pé (ft)' como destino e digite o valor. A conversão é instantânea: 1 metro = 3.28084 pés. O resultado é copiado automaticamente para sua área de transferência.",
            borderColor: "primary-blue",
          },
          {
            question: "O conversor funciona offline?",
            answer:
              "Sim! Após carregar a página, todas as conversões são feitas localmente no seu navegador usando JavaScript, permitindo uso mesmo sem conexão à internet. Nenhum dado é enviado para servidores externos.",
            borderColor: "growth-green",
          },
          {
            question: "Como funciona a conversão de temperatura?",
            answer:
              "Temperaturas usam fórmulas específicas: Celsius para Fahrenheit (°F = °C × 9/5 + 32), Celsius para Kelvin (K = °C + 273.15). O conversor aplica automaticamente a fórmula correta para cada conversão.",
            borderColor: "system-info",
          },
          {
            question: "Qual a precisão das conversões?",
            answer:
              "O conversor usa fatores de conversão oficiais e internacionais, com precisão de até 6 casas decimais. Para uso científico ou engenharia de precisão, sempre verifique os resultados com fontes especializadas.",
            borderColor: "system-warning",
          },
          {
            question: "Posso converter múltiplas unidades ao mesmo tempo?",
            answer:
              "Atualmente cada conversão é individual. Para converter múltiplos valores, altere o número no campo 'Valor' e a conversão será atualizada automaticamente. O botão 🔄 permite inverter rapidamente as unidades.",
            borderColor: "system-success",
          },
        ]}
        tipSection={{
          title: "Dica para Conversões Precisas",
          content:
            "<strong>Para máxima precisão:</strong> Use pontos decimais (1.5) em vez de vírgulas. Para resultados científicos, considere o número de algarismos significativos. O conversor mantém alta precisão, mas sempre confirme resultados críticos.",
        }}
        footerText="<strong>Lembre-se:</strong> Este conversor usa fatores de conversão padrão internacionais. Para aplicações científicas críticas, sempre valide os resultados com fontes especializadas."
      />

      <RelatedCalculators category="ferramentas" currentCalculatorId="conversor-unidades" />
    </div>
  );
}
