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
import { RelatedCalculators, FAQ, DirectAnswer } from "~/components";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("validar-cpf"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Validador de CPF - Validação Oficial com Algoritmo da Receita Federal 2026",
        description:
          "Ferramenta gratuita para validar CPFs com ou sem pontuação. Usa algoritmo oficial da Receita Federal para verificar se CPF é válido. Validação instantânea e precisa.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cpf",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cpf",
          name: "Validador de CPF 2026 - Validação Rápida e Precisa",
          description:
            "Validador de CPF gratuito com algoritmo oficial da Receita Federal. Valide CPFs com ou sem pontuação, validação instantânea e precisa.",
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
                name: "Validador de CPF",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cpf",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Cadastro de Pessoas Físicas (CPF)",
          description: "Registro de pessoa física no Brasil usado para identificação tributária",
          category: "GovernmentService",
        },
        featureList: [
          "Validação de CPF com algoritmo oficial",
          "Suporte a CPF com ou sem pontuação",
          "Validação em tempo real",
          "Detecção de dígitos verificadores",
          "Interface responsiva",
          "Validação instantânea",
          "Ferramenta gratuita",
          "Explicação do resultado",
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
            name: "Como funciona o validador de CPF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O validador usa o algoritmo oficial da Receita Federal para verificar os dígitos verificadores do CPF. Ele calcula matematicamente se os dois últimos dígitos estão corretos conforme as regras estabelecidas.",
            },
          },
          {
            "@type": "Question",
            name: "Posso validar CPF com ou sem pontuação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. O validador aceita CPF nos dois formatos: com pontuação (123.456.789-01) ou sem pontuação (12345678901). O sistema remove automaticamente a formatação para fazer a validação.",
            },
          },
          {
            "@type": "Question",
            name: "O que significa CPF inválido?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CPF inválido significa que os dígitos verificadores não batem com o cálculo matemático oficial, ou que é um CPF conhecido como inválido (como 111.111.111-11).",
            },
          },
        ],
      },
    },
  ];
};

interface CpfValidationResult {
  cpf: string;
  cpfFormatted: string;
  isValid: boolean;
  validatedAt: Date;
  errorMessage?: string;
}

interface ValidationErrors {
  cpf?: string;
}

export default function CpfValidator() {
  const [cpfInput, setCpfInput] = useState("");
  const [result, setResult] = useState<CpfValidationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "validar-cpf",
    category: "ferramentas",
  });
  useFormTracking("validar-cpf");

  // Remove formatação do CPF
  const cleanCpf = (cpf: string): string => {
    return cpf.replace(/\D/g, "");
  };

  // Formatar CPF com pontuação
  const formatCpf = (cpf: string): string => {
    const cleanedCpf = cleanCpf(cpf);
    if (cleanedCpf.length !== 11) return cpf;
    return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Verifica CPFs com sequências inválidas
  const hasInvalidSequence = (cpf: string): boolean => {
    const invalidCpfs = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ];
    return invalidCpfs.includes(cpf);
  };

  // Calcula o primeiro dígito verificador
  const calculateFirstDigit = (cpfDigits: string): number => {
    const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = cpfDigits.split("").reduce((acc, digit, index) => {
      return acc + parseInt(digit) * weights[index];
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calcula o segundo dígito verificador
  const calculateSecondDigit = (cpfDigits: string, firstDigit: number): number => {
    const weights = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const digitsWithFirst = cpfDigits + firstDigit;
    const sum = digitsWithFirst.split("").reduce((acc, digit, index) => {
      return acc + parseInt(digit) * weights[index];
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Valida CPF
  const validateCpf = (cpf: string): { isValid: boolean; errorMessage?: string } => {
    const cleanedCpf = cleanCpf(cpf);

    // Verifica se tem 11 dígitos
    if (cleanedCpf.length !== 11) {
      return { isValid: false, errorMessage: "CPF deve ter 11 dígitos" };
    }

    // Verifica sequências inválidas
    if (hasInvalidSequence(cleanedCpf)) {
      return { isValid: false, errorMessage: "CPF com sequência de dígitos iguais é inválido" };
    }

    // Extrai os primeiros 9 dígitos
    const digits = cleanedCpf.substring(0, 9);
    const digit1 = parseInt(cleanedCpf.charAt(9));
    const digit2 = parseInt(cleanedCpf.charAt(10));

    // Calcula os dígitos verificadores
    const calculatedDigit1 = calculateFirstDigit(digits);
    const calculatedDigit2 = calculateSecondDigit(digits, calculatedDigit1);

    // Verifica se os dígitos batem
    if (digit1 !== calculatedDigit1 || digit2 !== calculatedDigit2) {
      return { isValid: false, errorMessage: "Dígitos verificadores não conferem" };
    }

    return { isValid: true };
  };

  const validateInput = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!cpfInput.trim()) {
      newErrors.cpf = "Digite um CPF para validar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidate = () => {
    if (!validateInput()) return;

    startCalculation();

    try {
      const validation = validateCpf(cpfInput);
      const cleanedCpf = cleanCpf(cpfInput);
      const formattedCpf = formatCpf(cpfInput);

      const validationResult: CpfValidationResult = {
        cpf: cleanedCpf,
        cpfFormatted: formattedCpf,
        isValid: validation.isValid,
        validatedAt: new Date(),
        errorMessage: validation.errorMessage,
      };

      setResult(validationResult);
      setErrors({});

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro ao validar CPF:", error);
      setErrors({ cpf: "Erro ao validar CPF. Tente novamente." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setCpfInput("");
    setResult(null);
    setErrors({});
  };

  const handleInputChange = (value: string) => {
    // Permite apenas números e formatação básica
    const formatted = value.replace(/\D/g, "").substring(0, 11);
    setCpfInput(formatted);

    // Limpa resultado anterior se houver
    if (result) {
      setResult(null);
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
        <BreadcrumbItem isLast>Validador de CPF</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Validador de CPF 2026 – Validação Rápida e Precisa
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Valide <strong className="text-primary-blue-dark">CPFs</strong> com ou sem pontuação
          usando o <strong className="text-growth-green">algoritmo oficial</strong> da Receita
          Federal. Validação instantânea e confiável.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>Validação Instantânea</strong> • 🔒 <strong>Algoritmo Oficial</strong> • ✓{" "}
            <strong>100% Preciso</strong>
          </p>
        </div>
      </header>

      <DirectAnswer title="Como saber se um CPF é válido">
        <p>O CPF tem 11 dígitos: os 9 primeiros identificam o contribuinte e os 2 últimos são dígitos verificadores, calculados pelo módulo 11. Para o 1º dígito, multiplique os 9 primeiros pelos pesos de 10 a 2, some e calcule o resto da divisão por 11: se o resto for menor que 2, o dígito é 0; senão, é 11 menos o resto. O 2º dígito repete a conta com os 10 primeiros e pesos de 11 a 2.</p>
        <p>A validação confirma só a matemática do número. Ela não mostra se o CPF existe, a quem pertence ou se está regular na Receita Federal; para isso, use a consulta de situação cadastral no site da Receita.</p>
      </DirectAnswer>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔍 Validador de CPF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input CPF */}
            <div>
              <label htmlFor="cpf" className="mb-2 block text-sm font-medium text-text-primary">
                CPF para Validação
              </label>
              <Input
                id="cpf"
                type="text"
                placeholder="Digite o CPF (com ou sem pontuação)"
                value={formatCpf(cpfInput)}
                onChange={(e) => handleInputChange(e.target.value)}
                className="text-lg"
                maxLength={14}
              />
              <ErrorMessage error={errors.cpf} />
              <p className="mt-1 text-sm text-text-secondary">
                Aceita formatos: 12345678901 ou 123.456.789-01
              </p>
            </div>

            {/* Botões */}
            <div className="flex justify-center space-x-4">
              <Button onClick={handleValidate} className="px-8">
                Validar CPF
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
          <Card
            className={`border-2 ${result.isValid ? "border-growth-green bg-growth-green-soft" : "border-system-error bg-system-error/10"}`}
          >
            <CardHeader>
              <CardTitle
                as="h3"
                className={result.isValid ? "text-growth-green" : "text-system-error"}
              >
                {result.isValid ? "✅ CPF Válido!" : "❌ CPF Inválido!"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6">
                <div className="rounded-lg bg-gray-900 p-8 text-center">
                  <div className="mb-4">
                    <div className="mb-2 text-sm text-text-secondary">CPF Analisado</div>
                    <div className="break-all font-mono text-4xl font-bold text-primary-blue-dark">
                      {result.cpfFormatted}
                    </div>
                  </div>

                  <div
                    className={`mb-4 rounded-lg p-4 ${result.isValid ? "bg-growth-green/20" : "bg-system-error/20"}`}
                  >
                    <div
                      className={`text-2xl font-bold ${result.isValid ? "text-growth-green" : "text-system-error"}`}
                    >
                      {result.isValid ? "VÁLIDO" : "INVÁLIDO"}
                    </div>
                    {result.errorMessage && (
                      <div className="mt-2 text-sm text-system-error">{result.errorMessage}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-2 font-semibold text-primary-blue-dark">
                  Informações da Validação
                </h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    <strong>CPF sem formatação:</strong>{" "}
                    <code className="rounded bg-gray-800 px-1">{result.cpf}</code>
                  </li>
                  <li>
                    <strong>CPF formatado:</strong>{" "}
                    <code className="rounded bg-gray-800 px-1">{result.cpfFormatted}</code>
                  </li>
                  <li>
                    <strong>Status:</strong>{" "}
                    <span className={result.isValid ? "text-growth-green" : "text-system-error"}>
                      {result.isValid ? "Válido ✓" : "Inválido ✗"}
                    </span>
                  </li>
                  <li>
                    <strong>Validado em:</strong> {result.validatedAt.toLocaleString("pt-BR")}
                  </li>
                </ul>
              </div>

              {result.isValid ? (
                <div className="mt-4 rounded border border-growth-green/20 bg-growth-green/10 p-3 text-sm text-growth-green">
                  ✅ <strong>Este CPF é válido</strong> de acordo com o algoritmo da Receita
                  Federal.
                </div>
              ) : (
                <div className="mt-4 rounded border border-system-error/20 bg-system-error/10 p-3 text-sm text-system-error">
                  ❌ <strong>Este CPF é inválido.</strong> {result.errorMessage}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção: Detalhes sobre Validação de CPF */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funciona a Validação de CPF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Como funciona */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔍 Algoritmo de Validação
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">1️⃣ Primeiro Dígito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Multiplica cada um dos 9 primeiros dígitos pelos pesos de 10 a 2, soma tudo e
                    calcula o resto da divisão por 11.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">Exemplo</h4>
                  <ul className="mb-4 space-y-1 text-xs text-text-secondary">
                    <li>• CPF: 123.456.789-09</li>
                    <li>• 1×10 + 2×9 + 3×8 + 4×7 + 5×6 + 6×5 + 7×4 + 8×3 + 9×2</li>
                    <li>• Soma = 210, Resto = 210 % 11 = 1</li>
                    <li>• DV1 = 11 - 1 = 10 → 0</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">2️⃣ Segundo Dígito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Similar ao primeiro, mas inclui o primeiro dígito verificador e usa pesos de 11
                    a 2.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">Validação</h4>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>• Inclui o primeiro DV calculado</li>
                    <li>• Multiplica pelos pesos de 11 a 2</li>
                    <li>• Calcula resto da divisão por 11</li>
                    <li>• Se resto {"<"} 2, DV = 0, senão DV = 11 - resto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Casos especiais */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚠️ CPFs Automaticamente Inválidos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">❌ Sequências Iguais</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 000.000.000-00</li>
                    <li>• 111.111.111-11</li>
                    <li>• 222.222.222-22</li>
                    <li>• E assim por diante...</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">📋 Outras Invalidações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• CPF com menos de 11 dígitos</li>
                    <li>• Dígitos verificadores incorretos</li>
                    <li>• Caracteres não numéricos (exceto formatação)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Por que validar */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                ✅ Por que Validar CPF?
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">🛡️ Segurança</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Evita cadastros com CPF inválido</li>
                    <li>• Reduz erros de digitação</li>
                    <li>• Melhora qualidade dos dados</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue">💼 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Sistemas de cadastro</li>
                    <li>• E-commerce e vendas</li>
                    <li>• Aplicações financeiras</li>
                    <li>• Validação de formulários</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Validador de CPF"
        items={[
          {
            question: "Como funciona o validador de CPF?",
            answer:
              "O validador usa o algoritmo oficial da Receita Federal para verificar os dígitos verificadores do CPF. Ele calcula matematicamente se os dois últimos dígitos estão corretos conforme as regras estabelecidas pela Receita Federal do Brasil.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso validar CPF com ou sem pontuação?",
            answer:
              "Sim. O validador aceita CPF nos dois formatos: com pontuação (123.456.789-01) ou sem pontuação (12345678901). O sistema remove automaticamente a formatação para fazer a validação e depois exibe o resultado formatado.",
            borderColor: "primary-blue",
          },
          {
            question: "O que significa CPF inválido?",
            answer:
              "CPF inválido significa que os dígitos verificadores não batem com o cálculo matemático oficial, ou que é um CPF conhecido como inválido (como 111.111.111-11, sequências iguais ou com menos de 11 dígitos).",
            borderColor: "system-error-dark",
          },
          {
            question: "Por que CPFs com sequência igual são inválidos?",
            answer:
              "CPFs como 111.111.111-11 ou 000.000.000-00 são automaticamente considerados inválidos pela Receita Federal, mesmo que passem no cálculo dos dígitos verificadores. Isso é uma regra específica do sistema.",
            borderColor: "system-warning",
          },
          {
            question: "Este validador é 100% preciso?",
            answer:
              "Sim. O validador usa exatamente o mesmo algoritmo oficial da Receita Federal para calcular e verificar os dígitos verificadores. Se um CPF passar na validação, ele está matematicamente correto segundo as regras oficiais.",
            borderColor: "growth-green",
          },
          {
            question: "Posso usar este validador em meu sistema?",
            answer:
              "Esta ferramenta é para uso manual. Para integrar validação de CPF em sistemas, recomendamos implementar o algoritmo diretamente ou usar bibliotecas específicas da sua linguagem de programação.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Validação",
          content:
            "<strong>Para desenvolvedores:</strong> Sempre valide CPF tanto no frontend quanto no backend. A validação no navegador pode ser burlada, então é essencial ter validação também no servidor.",
        }}
        footerText="<strong>Lembre-se:</strong> Um CPF válido matematicamente não significa que existe na Receita Federal. Esta validação apenas verifica se os dígitos estão corretos conforme o algoritmo oficial."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Validador de CPF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">validador de CPF</strong> utiliza o{" "}
              <strong className="text-growth-green">algoritmo oficial</strong> da Receita Federal
              para verificar se um CPF está correto. A validação é feita em tempo real e considera
              todas as regras oficiais.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Validação com ou sem pontuação, detecção de erros
              específicos, interface responsiva e resultado instantâneo com explicação detalhada.
            </p>
            <p>
              <strong className="text-system-info">Importante:</strong> Esta ferramenta apenas
              verifica se um CPF está <strong>matematicamente correto</strong>. Não verifica se o
              CPF existe realmente na base da Receita Federal ou se pertence a uma pessoa real.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚡ Validação instantânea • 🔒 Algoritmo oficial • ✓ 100% preciso • 📱 Mobile-friendly
              • 🌙 Modo escuro • 📊 Explicação detalhada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="validar-cpf" />
    </div>
  );
}
