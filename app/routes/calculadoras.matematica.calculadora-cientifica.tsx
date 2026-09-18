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
import { useIndexNow } from "~/hooks/useIndexNow";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora Científica Online 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calculadora científica online gratuita com trigonometria, logaritmos, exponenciais, raízes e fatorial. Interface intuitiva para estudantes, professores e engenheiros. Use agora!",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "keywords",
      content: "calculadora científica, trigonometria, logaritmo, exponencial, raiz quadrada, fatorial, calculadora online, matemática, engenharia"
    },
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
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
    },
    {
      property: "og:title",
      content: "Calculadora Científica Online 2026 – Funções Completas",
    },
    {
      property: "og:description",
      content:
        "Calculadora científica online gratuita com trigonometria, logaritmos, exponenciais, raízes e fatorial. Interface intuitiva para estudantes, professores e engenheiros. Use agora!",
    },
    {
      property: "og:image",
      content:
        "https://www.calculadoraonlinebr.com.br/images/calculadora-cientifica.webp",
    },
    {
      property: "og:image:alt",
      content: "Calculadora Científica Online - Funções Trigonométricas e Logarítmicas",
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
        "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora Científica Online 2026 – Funções Completas",
    },
    {
      name: "twitter:description",
      content:
        "Calculadora científica online gratuita com trigonometria, logaritmos, exponenciais, raízes e fatorial. Interface intuitiva para estudantes e engenheiros. Use agora!",
    },
    {
      name: "twitter:image",
      content:
        "https://www.calculadoraonlinebr.com.br/images/calculadora-cientifica.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora Científica Online - Funções Trigonométricas",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "language", content: "pt-BR" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora Científica Online 2026",
        description:
          "Calculadora científica online gratuita com trigonometria, logaritmos, exponenciais, raízes e fatorial. Interface intuitiva para estudantes, professores e engenheiros.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-20",
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
            "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
          name: "Calculadora Científica Online 2026",
          description:
            "Calculadora científica online gratuita com trigonometria, logaritmos, exponenciais, raízes e fatorial. Interface intuitiva para estudantes e engenheiros.",
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
                name: "Matemática",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Calculadora Científica",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/calculadora-cientifica",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Calculadora Científica",
          description: "Ferramenta científica para cálculos matemáticos avançados",
          category: "Mathematics",
        },
        featureList: [
          "Funções trigonométricas (sin, cos, tan)",
          "Logaritmos naturais e base 10",
          "Funções exponenciais",
          "Raízes quadradas e cúbicas",
          "Fatorial e combinatória",
          "Conversão de graus/radianos",
          "Constantes matemáticas (π, e)",
          "Interface móvel responsiva",
          "Histórico de cálculos",
          "Resultados em tempo real",
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
            name: "O que é uma calculadora científica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Uma calculadora científica é uma ferramenta avançada que oferece funções matemáticas complexas como trigonometria, logaritmos, exponenciais e estatísticas, essenciais para estudos científicos e engenharia.",
            },
          },
          {
            "@type": "Question",
            name: "Quais funções estão disponíveis na calculadora científica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nossa calculadora inclui funções trigonométricas (sin, cos, tan), logaritmos (ln, log), exponenciais, raízes, fatorial, potenciação, conversão de ângulos e constantes matemáticas como π e e.",
            },
          },
          {
            "@type": "Question",
            name: "Como usar funções trigonométricas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para usar funções trigonométricas, insira o valor do ângulo e selecione a função desejada (sin, cos, tan). Certifique-se de escolher a unidade correta (graus ou radianos) antes do cálculo.",
            },
          },
          {
            "@type": "Question",
            name: "A calculadora funciona em dispositivos móveis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, nossa calculadora científica é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores, mantendo todas as funcionalidades em qualquer dispositivo.",
            },
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Como usar a Calculadora Científica Online",
        description:
          "Aprenda a usar todas as funções da calculadora científica online para resolver cálculos matemáticos avançados",
        step: [
          {
            "@type": "HowToStep",
            name: "Selecione a função desejada",
            text: "Escolha entre funções básicas, trigonométricas, logarítmicas ou exponenciais usando os botões da interface.",
          },
          {
            "@type": "HowToStep",
            name: "Insira os valores",
            text: "Digite os números ou use os botões numéricos da calculadora para inserir os valores necessários.",
          },
          {
            "@type": "HowToStep",
            name: "Configure unidades se necessário",
            text: "Para funções trigonométricas, escolha entre graus ou radianos usando o botão de alternância.",
          },
          {
            "@type": "HowToStep",
            name: "Execute o cálculo",
            text: "Pressione o botão de igual (=) ou Enter para executar o cálculo e ver o resultado instantaneamente.",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Calculadora Científica Online",
          },
        ],
      }),
    },
  ];
};

type AngleUnit = "deg" | "rad";

interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState(0);
  const [angleUnit, setAngleUnit] = useState<AngleUnit>("deg");
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSecondFunction, setIsSecondFunction] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "calculadora-cientifica",
    category: "matematica",
  });
  useFormTracking("calculadora-cientifica");

  const { submitCalculatorUrls } = useIndexNow({
    autoSubmit: true,
    delay: 2000,
  });

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return "Erro";

    if (Math.abs(num) < 0.0001 && num !== 0) {
      return num.toExponential(6);
    }

    if (Math.abs(num) > 999999999) {
      return num.toExponential(6);
    }

    return parseFloat(num.toPrecision(10)).toString();
  };

  const toRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
  };

  const toDegrees = (radians: number): number => {
    return (radians * 180) / Math.PI;
  };

  const handleNumber = (num: string) => {
    if (display === "0" || display === "Erro") {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleOperator = (op: string) => {
    if (display === "Erro") return;

    const operators = ["+", "-", "*", "/", "^"];
    const lastChar = expression.slice(-1);

    if (operators.includes(lastChar)) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + op);
    }
    setDisplay("0");
  };

  const handleFunction = (func: string) => {
    if (display === "Erro") return;

    const value = parseFloat(display);
    let result: number;

    try {
      switch (func) {
        case "sin":
          result = Math.sin(angleUnit === "deg" ? toRadians(value) : value);
          break;
        case "cos":
          result = Math.cos(angleUnit === "deg" ? toRadians(value) : value);
          break;
        case "tan":
          result = Math.tan(angleUnit === "deg" ? toRadians(value) : value);
          break;
        case "asin":
          result = Math.asin(value);
          if (angleUnit === "deg") result = toDegrees(result);
          break;
        case "acos":
          result = Math.acos(value);
          if (angleUnit === "deg") result = toDegrees(result);
          break;
        case "atan":
          result = Math.atan(value);
          if (angleUnit === "deg") result = toDegrees(result);
          break;
        case "ln":
          result = Math.log(value);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "exp":
          result = Math.exp(value);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        case "cbrt":
          result = Math.cbrt(value);
          break;
        case "square":
          result = value * value;
          break;
        case "cube":
          result = value * value * value;
          break;
        case "factorial":
          if (value < 0 || value % 1 !== 0) throw new Error("Fatorial apenas para inteiros não negativos");
          result = value === 0 ? 1 : Array.from({ length: value }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
          break;
        case "reciprocal":
          result = 1 / value;
          break;
        case "abs":
          result = Math.abs(value);
          break;
        default:
          throw new Error("Função não reconhecida");
      }

      const formattedResult = formatNumber(result);
      setDisplay(formattedResult);
      setExpression(formattedResult);

      addToHistory(`${func}(${value})`, formattedResult);

    } catch (error) {
      setDisplay("Erro");
      setExpression("");
    }
  };

  const handleConstant = (constant: string) => {
    let value: number;

    switch (constant) {
      case "pi":
        value = Math.PI;
        break;
      case "e":
        value = Math.E;
        break;
      default:
        return;
    }

    const formattedValue = formatNumber(value);
    setDisplay(formattedValue);
    setExpression(formattedValue);
  };

  const addToHistory = (expr: string, result: string) => {
    const newEntry: CalculationHistory = {
      expression: expr,
      result: result,
      timestamp: new Date(),
    };

    setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
  };

  const calculate = () => {
    if (!expression || expression === "0") return;

    startCalculation("calcular");

    try {
      let processedExpression = expression
        .replace(/\^/g, "**")
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());

      const result = eval(processedExpression);
      const formattedResult = formatNumber(result);

      setDisplay(formattedResult);
      addToHistory(expression, formattedResult);
      setExpression(formattedResult);

      endCalculation("calcular", { success: true });

    } catch (error) {
      setDisplay("Erro");
      setExpression("");
      endCalculation("calcular", { success: false });
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  const clearAll = () => {
    clear();
    setMemory(0);
    setHistory([]);
  };

  const backspace = () => {
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setExpression(expression.slice(0, -1));
    } else {
      setDisplay("0");
      setExpression("");
    }
  };

  const handleMemory = (action: string) => {
    const value = parseFloat(display);

    switch (action) {
      case "MS":
        setMemory(value);
        break;
      case "MR":
        setDisplay(formatNumber(memory));
        setExpression(formatNumber(memory));
        break;
      case "M+":
        setMemory(memory + value);
        break;
      case "M-":
        setMemory(memory - value);
        break;
      case "MC":
        setMemory(0);
        break;
    }
  };

  const Button2 = ({ onClick, children, className = "", variant = "default" }: any) => (
    <button
      onClick={onClick}
      className={`rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center ${
        variant === "number"
          ? "bg-gray-700 text-white hover:bg-gray-600"
          : variant === "operator"
          ? "bg-primary-blue text-white hover:bg-primary-blue-dark"
          : variant === "function"
          ? "bg-math-purple text-white hover:bg-math-purple-dark"
          : variant === "secondary"
          ? "bg-system-warning text-white hover:bg-system-warning/80"
          : "bg-gray-600 text-white hover:bg-gray-500"
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR" role="main" aria-label="Calculadora Científica Online">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/matematica">Matemática</BreadcrumbItem>
        <BreadcrumbItem isLast>Calculadora Científica</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora Científica Online Gratuita 2026
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calculadora científica <strong className="text-growth-green">completa e gratuita</strong> com
          funções trigonométricas, logarítmicas, exponenciais e{" "}
          <strong className="text-primary-blue-dark">interface profissional</strong> para estudantes e
          profissionais.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🧮 <strong>Funções Científicas</strong> • 📐 <strong>Trigonometria</strong> • 📊{" "}
            <strong>Resultados Instantâneos</strong>
          </p>
        </div>
      </header>

      <Card role="application" aria-label="Interface da Calculadora Científica">
        <CardHeader>
          <CardTitle as="h2">🧮 Calculadora Científica</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          {/* Display - Compacto */}
          <div className="mb-3 rounded-lg bg-gray-900 p-3">
            <div className="mb-1 text-right text-xs text-text-secondary truncate">{expression}</div>
            <div className="text-right text-xl md:text-2xl font-mono font-bold text-primary-blue-dark">
              {display}
            </div>
          </div>

          {/* Controls - Mais compactos */}
          <div className="mb-3 flex flex-wrap gap-1 justify-center">
            <Button2
              onClick={() => setAngleUnit(angleUnit === "deg" ? "rad" : "deg")}
              variant="secondary"
              className="px-2 py-1 text-xs h-8"
            >
              {angleUnit.toUpperCase()}
            </Button2>
            <Button2
              onClick={() => setIsSecondFunction(!isSecondFunction)}
              variant="secondary"
              className="px-2 py-1 text-xs h-8"
            >
              2nd
            </Button2>
            <Button2
              onClick={() => setShowHistory(!showHistory)}
              variant="secondary"
              className="px-2 py-1 text-xs h-8"
            >
              Histórico
            </Button2>
          </div>

          {/* Scientific Calculator Grid - Layout Compacto */}
          <div className="space-y-2">

            {/* Memory and Clear Functions */}
            <div className="rounded border border-math-purple/30 bg-math-purple/5 p-2">
              <h4 className="mb-1 text-xs font-semibold text-math-purple-dark">Memória</h4>
              <div className="grid grid-cols-4 gap-1 text-xs lg:grid-cols-8">
                <Button2 onClick={() => handleMemory("MC")} variant="function" className="text-xs h-8">MC</Button2>
                <Button2 onClick={() => handleMemory("MR")} variant="function" className="text-xs h-8">MR</Button2>
                <Button2 onClick={() => handleMemory("MS")} variant="function" className="text-xs h-8">MS</Button2>
                <Button2 onClick={() => handleMemory("M+")} variant="function" className="text-xs h-8">M+</Button2>
                <Button2 onClick={() => handleMemory("M-")} variant="function" className="text-xs h-8">M-</Button2>
                <Button2 onClick={backspace} variant="operator" className="text-xs h-8">⌫</Button2>
                <Button2 onClick={clear} variant="operator" className="text-xs h-8">C</Button2>
                <Button2 onClick={clearAll} variant="operator" className="text-xs h-8">AC</Button2>
              </div>
            </div>

            {/* Mathematical Functions */}
            <div className="rounded border border-primary-blue/30 bg-primary-blue/5 p-2">
              <h4 className="mb-1 text-xs font-semibold text-primary-blue-dark">Funções</h4>
              <div className="grid grid-cols-4 gap-1 text-xs lg:grid-cols-8">
                <Button2 onClick={() => handleConstant("pi")} variant="function" className="text-xs h-8">π</Button2>
                <Button2 onClick={() => handleConstant("e")} variant="function" className="text-xs h-8">e</Button2>
                <Button2 onClick={() => handleFunction("sqrt")} variant="function" className="text-xs h-8">√</Button2>
                <Button2 onClick={() => handleFunction("cbrt")} variant="function" className="text-xs h-8">∛</Button2>
                <Button2 onClick={() => handleFunction("square")} variant="function" className="text-xs h-8">x²</Button2>
                <Button2 onClick={() => handleFunction("cube")} variant="function" className="text-xs h-8">x³</Button2>
                <Button2 onClick={() => handleOperator("^")} variant="operator" className="text-xs h-8">xʸ</Button2>
                <Button2 onClick={() => handleFunction("reciprocal")} variant="function" className="text-xs h-8">1/x</Button2>

                <Button2 onClick={() => handleFunction("factorial")} variant="function" className="text-xs h-8">n!</Button2>
                <Button2 onClick={() => handleFunction("abs")} variant="function" className="text-xs h-8">|x|</Button2>
                <Button2 onClick={() => handleFunction("ln")} variant="function" className="text-xs h-8">ln</Button2>
                <Button2 onClick={() => handleFunction("log")} variant="function" className="text-xs h-8">log</Button2>
                <Button2 onClick={() => handleFunction("exp")} variant="function" className="text-xs h-8">eˣ</Button2>
                <Button2 onClick={() => handleNumber("(")} variant="operator" className="text-xs h-8">(</Button2>
                <Button2 onClick={() => handleNumber(")")} variant="operator" className="text-xs h-8">)</Button2>
                <div></div> {/* Empty space for alignment */}
              </div>
            </div>

            {/* Trigonometric Functions */}
            <div className="rounded border border-growth-green/30 bg-growth-green/5 p-2">
              <h4 className="mb-1 text-xs font-semibold text-growth-green">Trigonometria</h4>
              <div className="grid grid-cols-3 gap-1 text-xs lg:grid-cols-6">
                <Button2 onClick={() => handleFunction(isSecondFunction ? "asin" : "sin")} variant="function" className="text-xs h-8">
                  {isSecondFunction ? "asin" : "sin"}
                </Button2>
                <Button2 onClick={() => handleFunction(isSecondFunction ? "acos" : "cos")} variant="function" className="text-xs h-8">
                  {isSecondFunction ? "acos" : "cos"}
                </Button2>
                <Button2 onClick={() => handleFunction(isSecondFunction ? "atan" : "tan")} variant="function" className="text-xs h-8">
                  {isSecondFunction ? "atan" : "tan"}
                </Button2>
                <div className="col-span-3 lg:col-span-3"></div> {/* Empty space for mobile layout */}
              </div>
            </div>

            {/* Main Calculator Grid - Numbers and Basic Operations */}
            <div className="rounded border border-gray-600/30 bg-gray-900/30 p-2">
              <h4 className="mb-1 text-xs font-semibold text-text-primary">Teclado</h4>
              <div className="grid grid-cols-4 gap-2">

                {/* Row 1 - Basic operations */}
                <Button2 onClick={() => handleOperator("/")} variant="operator" className="h-10">÷</Button2>
                <Button2 onClick={() => handleOperator("*")} variant="operator" className="h-10">×</Button2>
                <Button2 onClick={() => handleOperator("-")} variant="operator" className="h-10">-</Button2>
                <Button2 onClick={() => handleOperator("+")} variant="operator" className="h-10">+</Button2>

                {/* Row 2 - Numbers 7,8,9 */}
                <Button2 onClick={() => handleNumber("7")} variant="number" className="h-10">7</Button2>
                <Button2 onClick={() => handleNumber("8")} variant="number" className="h-10">8</Button2>
                <Button2 onClick={() => handleNumber("9")} variant="number" className="h-10">9</Button2>
                <Button2 onClick={calculate} variant="operator" className="row-span-4 h-auto text-lg font-bold">=</Button2>

                {/* Row 3 - Numbers 4,5,6 */}
                <Button2 onClick={() => handleNumber("4")} variant="number" className="h-10">4</Button2>
                <Button2 onClick={() => handleNumber("5")} variant="number" className="h-10">5</Button2>
                <Button2 onClick={() => handleNumber("6")} variant="number" className="h-10">6</Button2>

                {/* Row 4 - Numbers 1,2,3 */}
                <Button2 onClick={() => handleNumber("1")} variant="number" className="h-10">1</Button2>
                <Button2 onClick={() => handleNumber("2")} variant="number" className="h-10">2</Button2>
                <Button2 onClick={() => handleNumber("3")} variant="number" className="h-10">3</Button2>

                {/* Row 5 - 0, decimal */}
                <Button2 onClick={() => handleNumber("0")} variant="number" className="col-span-2 h-10">0</Button2>
                <Button2 onClick={() => handleNumber(".")} variant="number" className="h-10">.</Button2>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle as="h3">📋 Histórico de Cálculos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-900 rounded">
                  <span className="text-text-secondary">{item.expression}</span>
                  <span className="text-primary-blue-dark font-mono">{item.result}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <section aria-label="Conteúdo Educacional">
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📚 Guia Completo da Calculadora Científica 2026
          </CardTitle>
          <div className="text-xs text-text-secondary mt-2">
            <time dateTime="2025-09-20">Última atualização: 20 de setembro de 2026</time>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Trigonometric Functions */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                📐 Funções Trigonométricas
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Funções Básicas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• sin(x) - Seno</li>
                    <li>• cos(x) - Cosseno</li>
                    <li>• tan(x) - Tangente</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Funções Inversas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• asin(x) - Arco seno</li>
                    <li>• acos(x) - Arco cosseno</li>
                    <li>• atan(x) - Arco tangente</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Unidades de Ângulo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Graus (DEG): 0° a 360°</li>
                    <li>• Radianos (RAD): 0 a 2π</li>
                    <li>• Use o botão DEG/RAD para alternar</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Geometria e navegação</li>
                    <li>• Física: ondas e oscilações</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Logarithmic Functions */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                📈 Funções Logarítmicas e Exponenciais
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Logaritmos</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• ln(x) - Logaritmo natural (base e)</li>
                    <li>• log(x) - Logaritmo decimal (base 10)</li>
                    <li>• Aplicado em crescimento exponencial</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Exponenciais</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• eˣ - Função exponencial natural</li>
                    <li>• xʸ - Potenciação geral</li>
                    <li>• Constantes: π (pi) e e (Euler)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Aplicações</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Juros compostos em finanças</li>
                    <li>• Crescimento populacional</li>
                    <li>• Decaimento radioativo</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">📝 Dicas Importantes</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• ln(e) = 1 e log(10) = 1</li>
                    <li>• e ≈ 2.718 e π ≈ 3.14159</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Memory and Advanced Features */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                🧠 Memória e Recursos Avançados
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🔍 Funções de Memória</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• MS - Armazenar na memória</li>
                    <li>• MR - Recuperar da memória</li>
                    <li>• M+ - Somar à memória</li>
                    <li>• M- - Subtrair da memória</li>
                    <li>• MC - Limpar memória</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Outras Funções</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• n! - Fatorial</li>
                    <li>• √ - Raiz quadrada</li>
                    <li>• ∛ - Raiz cúbica</li>
                    <li>• |x| - Valor absoluto</li>
                    <li>• 1/x - Recíproco</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </section>

      <FAQ
        title="Perguntas Frequentes - Calculadora Científica"
        items={[
          {
            question: "O que é uma calculadora científica?",
            answer:
              "Uma calculadora científica é uma ferramenta avançada que oferece funções matemáticas complexas como trigonometria, logaritmos, exponenciais e estatísticas, essenciais para estudos científicos e engenharia.",
            borderColor: "primary-blue",
          },
          {
            question: "Quais funções estão disponíveis na calculadora científica?",
            answer:
              "Nossa calculadora inclui funções trigonométricas (sin, cos, tan), logaritmos (ln, log), exponenciais, raízes, fatorial, potenciação, conversão de ângulos e constantes matemáticas como π e e.",
            borderColor: "growth-green",
          },
          {
            question: "Como usar funções trigonométricas?",
            answer:
              "Para usar funções trigonométricas, insira o valor do ângulo e selecione a função desejada (sin, cos, tan). Certifique-se de escolher a unidade correta (graus ou radianos) antes do cálculo.",
            borderColor: "system-info",
          },
          {
            question: "Como funciona a memória da calculadora?",
            answer:
              "Use MS para armazenar um valor, MR para recuperar, M+ para somar ao valor da memória, M- para subtrair e MC para limpar. A memória permite armazenar resultados intermediários em cálculos complexos.",
            borderColor: "system-warning",
          },
          {
            question: "Qual a diferença entre ln e log?",
            answer:
              "ln é o logaritmo natural (base e ≈ 2.718) e log é o logaritmo decimal (base 10). O ln é mais usado em cálculos científicos, enquanto o log é comum em aplicações práticas.",
            borderColor: "growth-green",
          },
          {
            question: "A calculadora funciona em dispositivos móveis?",
            answer:
              "Sim, nossa calculadora científica é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores, mantendo todas as funcionalidades em qualquer dispositivo.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Calculadora Científica",
          content:
            "<strong>Para melhores resultados:</strong> sempre verifique a unidade de ângulo (DEG/RAD) antes de usar funções trigonométricas e use parênteses para agrupar operações complexas corretamente.",
        }}
        footerText="<strong>Lembre-se:</strong> Use a função 2nd para acessar funções inversas como asin, acos e atan. O histórico permite revisar cálculos anteriores."
      />

      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Esta Calculadora Científica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta{" "}
              <strong className="text-primary-blue-dark">calculadora científica online</strong>{" "}
              oferece funções avançadas como <strong className="text-growth-green">trigonometria, logaritmos e exponenciais</strong> com
              interface profissional e resultados instantâneos.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Funções trigonométricas com conversão graus/radianos, logaritmos naturais e decimais,
              exponenciais, raízes, fatorial, memória integrada e histórico de cálculos.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é para fins educacionais e cálculos gerais. Para aplicações críticas de engenharia ou científicas, consulte sempre{" "}
              <strong>software especializado</strong> e validação profissional. Explore também nossas calculadoras de
              <a
                href="/calculadoras/matematica/porcentagem"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                porcentagem
              </a>{" "}
              e{" "}
              <a
                href="/calculadoras/matematica/equacao-segundo-grau"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                equação do 2º grau
              </a>
              para complementar seus estudos.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🧮 Funções Científicas • 📐 Trigonometria Completa • 🔒 Dados não armazenados • 📱
              Compatível com todos os dispositivos • 🌙 Suporte a modo escuro
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="matematica" currentCalculatorId="calculadora-cientifica" />
    </main>
  );
}