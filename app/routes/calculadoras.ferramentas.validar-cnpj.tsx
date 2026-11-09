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
    ...buildCalculatorMeta("validar-cnpj"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Validador de CNPJ - Validação Oficial com Algoritmo da Receita Federal 2026",
        description:
          "Ferramenta gratuita para validar CNPJs com ou sem pontuação. Usa algoritmo oficial da Receita Federal para verificar se CNPJ é válido. Validação instantânea e precisa.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cnpj",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cnpj",
          name: "Validador de CNPJ 2026 - Validação Rápida e Precisa",
          description:
            "Validador de CNPJ gratuito com algoritmo oficial da Receita Federal. Valide CNPJs com ou sem pontuação, validação instantânea e precisa.",
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
                name: "Validador de CNPJ",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/validar-cnpj",
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
          "Validação de CNPJ com algoritmo oficial",
          "Suporte a CNPJ com ou sem pontuação",
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
            name: "Como funciona o validador de CNPJ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O validador usa o algoritmo oficial da Receita Federal para verificar os dígitos verificadores do CNPJ. Ele calcula matematicamente se os dois últimos dígitos estão corretos conforme as regras estabelecidas.",
            },
          },
          {
            "@type": "Question",
            name: "Posso validar CNPJ com ou sem pontuação?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. O validador aceita CNPJ nos dois formatos: com pontuação (12.345.678/0001-90) ou sem pontuação (12345678000190). O sistema remove automaticamente a formatação para fazer a validação.",
            },
          },
          {
            "@type": "Question",
            name: "O que significa CNPJ inválido?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CNPJ inválido significa que os dígitos verificadores não batem com o cálculo matemático oficial, ou que é um CNPJ conhecido como inválido (como sequências iguais).",
            },
          },
        ],
      },
    },
  ];
};

interface CnpjValidationResult {
  cnpj: string;
  cnpjFormatted: string;
  isValid: boolean;
  validatedAt: Date;
  errorMessage?: string;
}

interface ValidationErrors {
  cnpj?: string;
}

export default function CnpjValidator() {
  const [cnpjInput, setCnpjInput] = useState("");
  const [result, setResult] = useState<CnpjValidationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "validar-cnpj",
    category: "ferramentas",
  });
  useFormTracking("validar-cnpj");

  // Remove formatação do CNPJ. Desde julho de 2026 (IN RFB 2.229/2024) as 12 primeiras
  // posições podem ter letras (CNPJ alfanumérico); os 2 dígitos verificadores são numéricos.
  const cleanCnpj = (cnpj: string): string => {
    return cnpj.toUpperCase().replace(/[^A-Z0-9]/g, "");
  };

  // Formatar CNPJ com pontuação
  const formatCnpj = (cnpj: string): string => {
    const cleanedCnpj = cleanCnpj(cnpj);
    if (cleanedCnpj.length !== 14) return cnpj;
    return cleanedCnpj.replace(
      /([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  // Valor de cada caractere no módulo 11: código ASCII − 48 ("0" a "9" valem 0 a 9, "A" vale 17)
  const charValue = (char: string): number => char.charCodeAt(0) - 48;

  // Verifica CNPJs com sequências inválidas
  const hasInvalidSequence = (cnpj: string): boolean => {
    const invalidCnpjs = [
      "00000000000000",
      "11111111111111",
      "22222222222222",
      "33333333333333",
      "44444444444444",
      "55555555555555",
      "66666666666666",
      "77777777777777",
      "88888888888888",
      "99999999999999",
    ];
    return invalidCnpjs.includes(cnpj);
  };

  // Calcula o primeiro dígito verificador
  const calculateFirstDigit = (cnpjDigits: string): number => {
    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = cnpjDigits.split("").reduce((acc, digit, index) => {
      return acc + charValue(digit) * weights[index];
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calcula o segundo dígito verificador
  const calculateSecondDigit = (cnpjDigits: string, firstDigit: number): number => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digitsWithFirst = cnpjDigits + firstDigit;
    const sum = digitsWithFirst.split("").reduce((acc, digit, index) => {
      return acc + charValue(digit) * weights[index];
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Valida CNPJ
  const validateCnpj = (cnpj: string): { isValid: boolean; errorMessage?: string } => {
    const cleanedCnpj = cleanCnpj(cnpj);

    // Verifica se tem 14 caracteres: 12 letras ou números e 2 dígitos verificadores
    if (cleanedCnpj.length !== 14) {
      return { isValid: false, errorMessage: "CNPJ deve ter 14 caracteres" };
    }
    if (!/^[A-Z0-9]{12}\d{2}$/.test(cleanedCnpj)) {
      return {
        isValid: false,
        errorMessage: "Os dois últimos caracteres (dígitos verificadores) devem ser números",
      };
    }

    // Verifica sequências inválidas
    if (hasInvalidSequence(cleanedCnpj)) {
      return { isValid: false, errorMessage: "CNPJ com sequência de dígitos iguais é inválido" };
    }

    // Extrai os primeiros 12 dígitos
    const digits = cleanedCnpj.substring(0, 12);
    const digit1 = parseInt(cleanedCnpj.charAt(12));
    const digit2 = parseInt(cleanedCnpj.charAt(13));

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

    if (!cnpjInput.trim()) {
      newErrors.cnpj = "Digite um CNPJ para validar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidate = () => {
    if (!validateInput()) return;

    startCalculation();

    try {
      const validation = validateCnpj(cnpjInput);
      const cleanedCnpj = cleanCnpj(cnpjInput);
      const formattedCnpj = formatCnpj(cnpjInput);

      const validationResult: CnpjValidationResult = {
        cnpj: cleanedCnpj,
        cnpjFormatted: formattedCnpj,
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
      console.error("Erro ao validar CNPJ:", error);
      setErrors({ cnpj: "Erro ao validar CNPJ. Tente novamente." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setCnpjInput("");
    setResult(null);
    setErrors({});
  };

  const handleInputChange = (value: string) => {
    // Letras e números (CNPJ alfanumérico); a pontuação é descartada
    const formatted = cleanCnpj(value).substring(0, 14);
    setCnpjInput(formatted);

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
        <BreadcrumbItem isLast>Validador de CNPJ</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Validador de CNPJ 2026 – Validação Rápida e Precisa
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Valide <strong className="text-primary-blue-dark">CNPJs</strong> com ou sem pontuação
          usando o <strong className="text-growth-green">algoritmo oficial</strong> da Receita
          Federal. Validação instantânea e confiável para pessoas jurídicas.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚡ <strong>Validação Instantânea</strong> • 🔒 <strong>Algoritmo Oficial</strong> • ✓{" "}
            <strong>100% Preciso</strong>
          </p>
        </div>
      </header>

      <DirectAnswer title="Como saber se um CNPJ é válido">
        <p>O CNPJ tem 14 caracteres: 8 da raiz da empresa, 4 da filial (0001 indica a matriz) e 2 dígitos verificadores calculados pelo módulo 11, com pesos de 5 a 2 e de 9 a 2 para o 1º dígito e de 6 a 2 e de 9 a 2 para o 2º.</p>
        <p>Desde julho de 2026, os novos CNPJs podem ter letras nas 12 primeiras posições (CNPJ alfanumérico, Instrução Normativa RFB 2.229/2024). Nesse caso, cada caractere entra na conta com o valor do seu código ASCII menos 48, e os dois dígitos finais continuam numéricos. Este validador aceita os dois formatos. A validação não confirma se a empresa existe ou está ativa.</p>
      </DirectAnswer>

      <Card>
        <CardHeader>
          <CardTitle as="h2">🔍 Validador de CNPJ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input CNPJ */}
            <div>
              <label htmlFor="cnpj" className="mb-2 block text-sm font-medium text-text-primary">
                CNPJ para Validação
              </label>
              <Input
                id="cnpj"
                type="text"
                placeholder="Digite o CNPJ (com ou sem pontuação)"
                value={formatCnpj(cnpjInput)}
                onChange={(e) => handleInputChange(e.target.value)}
                className="text-lg"
                maxLength={18}
              />
              <ErrorMessage error={errors.cnpj} />
              <p className="mt-1 text-sm text-text-secondary">
                Aceita formatos: 12345678000190 ou 12.345.678/0001-90
              </p>
            </div>

            {/* Botões */}
            <div className="flex justify-center space-x-4">
              <Button onClick={handleValidate} className="px-8">
                Validar CNPJ
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
                {result.isValid ? "✅ CNPJ Válido!" : "❌ CNPJ Inválido!"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-6">
                <div className="rounded-lg bg-gray-900 p-8 text-center">
                  <div className="mb-4">
                    <div className="mb-2 text-sm text-text-secondary">CNPJ Analisado</div>
                    <div className="break-all font-mono text-4xl font-bold text-primary-blue-dark">
                      {result.cnpjFormatted}
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
                    <strong>CNPJ sem formatação:</strong>{" "}
                    <code className="rounded bg-gray-800 px-1">{result.cnpj}</code>
                  </li>
                  <li>
                    <strong>CNPJ formatado:</strong>{" "}
                    <code className="rounded bg-gray-800 px-1">{result.cnpjFormatted}</code>
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
                  ✅ <strong>Este CNPJ é válido</strong> de acordo com o algoritmo da Receita
                  Federal.
                </div>
              ) : (
                <div className="mt-4 rounded border border-system-error/20 bg-system-error/10 p-3 text-sm text-system-error">
                  ❌ <strong>Este CNPJ é inválido.</strong> {result.errorMessage}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção: Detalhes sobre Validação de CNPJ */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 Como Funciona a Validação de CNPJ
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
                    Multiplica cada um dos 12 primeiros dígitos pelos pesos
                    (5,4,3,2,9,8,7,6,5,4,3,2), soma tudo e calcula o resto da divisão por 11.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">Exemplo</h4>
                  <ul className="mb-4 space-y-1 text-xs text-text-secondary">
                    <li>• CNPJ: 12.345.678/0001-90</li>
                    <li>• 1×5 + 2×4 + 3×3 + 4×2 + 5×9 + 6×8 + ...</li>
                    <li>• Soma total, Resto = Soma % 11</li>
                    <li>• Se resto {"<"} 2, DV1 = 0, senão DV1 = 11 - resto</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">2️⃣ Segundo Dígito</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Similar ao primeiro, mas inclui o primeiro dígito verificador e usa pesos
                    (6,5,4,3,2,9,8,7,6,5,4,3,2).
                  </p>

                  <h4 className="mb-3 font-semibold text-system-success">Validação</h4>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>• Inclui o primeiro DV calculado</li>
                    <li>• Multiplica pelos pesos específicos</li>
                    <li>• Calcula resto da divisão por 11</li>
                    <li>• Se resto {"<"} 2, DV = 0, senão DV = 11 - resto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Casos especiais */}
            <div className="rounded-xl border border-system-warning/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-warning">
                ⚠️ CNPJs Automaticamente Inválidos
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">❌ Sequências Iguais</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 00.000.000/0000-00</li>
                    <li>• 11.111.111/1111-11</li>
                    <li>• 22.222.222/2222-22</li>
                    <li>• E assim por diante...</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">📋 Outras Invalidações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• CNPJ com menos de 14 dígitos</li>
                    <li>• Dígitos verificadores incorretos</li>
                    <li>• Caracteres não numéricos (exceto formatação)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Por que validar */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                ✅ Por que Validar CNPJ?
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    🛡️ Segurança Empresarial
                  </h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Evita cadastros com CNPJ inválido</li>
                    <li>• Reduz erros de digitação</li>
                    <li>• Melhora qualidade dos dados</li>
                    <li>• Previne fraudes empresariais</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue">💼 Aplicações</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Sistemas B2B e B2C</li>
                    <li>• E-commerce empresarial</li>
                    <li>• Aplicações financeiras</li>
                    <li>• Contratos comerciais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Validador de CNPJ"
        items={[
          {
            question: "Como funciona o validador de CNPJ?",
            answer:
              "O validador usa o algoritmo oficial da Receita Federal para verificar os dígitos verificadores do CNPJ. Ele calcula matematicamente se os dois últimos dígitos estão corretos conforme as regras estabelecidas pela Receita Federal do Brasil.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso validar CNPJ com ou sem pontuação?",
            answer:
              "Sim. O validador aceita CNPJ nos dois formatos: com pontuação (12.345.678/0001-90) ou sem pontuação (12345678000190). O sistema remove automaticamente a formatação para fazer a validação e depois exibe o resultado formatado.",
            borderColor: "primary-blue",
          },
          {
            question: "O que significa CNPJ inválido?",
            answer:
              "CNPJ inválido significa que os dígitos verificadores não batem com o cálculo matemático oficial, ou que é um CNPJ conhecido como inválido (como 11.111.111/1111-11, sequências iguais ou com menos de 14 dígitos).",
            borderColor: "system-error-dark",
          },
          {
            question: "Por que CNPJs com sequência igual são inválidos?",
            answer:
              "CNPJs como 11.111.111/1111-11 ou 00.000.000/0000-00 são automaticamente considerados inválidos pela Receita Federal, mesmo que passem no cálculo dos dígitos verificadores. Isso é uma regra específica do sistema.",
            borderColor: "system-warning",
          },
          {
            question: "Este validador é 100% preciso?",
            answer:
              "Sim. O validador usa exatamente o mesmo algoritmo oficial da Receita Federal para calcular e verificar os dígitos verificadores. Se um CNPJ passar na validação, ele está matematicamente correto segundo as regras oficiais.",
            borderColor: "growth-green",
          },
          {
            question: "O que significa o código da filial no CNPJ?",
            answer:
              "Os dígitos 9º ao 12º do CNPJ representam o código da filial. A matriz sempre usa '0001'. Cada filial da empresa recebe um número sequencial (0002, 0003, etc.). Isso permite que uma empresa tenha múltiplos CNPJs para diferentes estabelecimentos.",
            borderColor: "system-info",
          },
          {
            question: "Posso usar este validador em meu sistema?",
            answer:
              "Esta ferramenta é para uso manual. Para integrar validação de CNPJ em sistemas, recomendamos implementar o algoritmo diretamente ou usar bibliotecas específicas da sua linguagem de programação.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Validação",
          content:
            "<strong>Para desenvolvedores:</strong> Sempre valide CNPJ tanto no frontend quanto no backend. A validação no navegador pode ser burlada, então é essencial ter validação também no servidor.",
        }}
        footerText="<strong>Lembre-se:</strong> Um CNPJ válido matematicamente não significa que a empresa existe na Receita Federal. Esta validação apenas verifica se os dígitos estão corretos conforme o algoritmo oficial."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Usar Este Validador de CNPJ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">validador de CNPJ</strong> utiliza o{" "}
              <strong className="text-growth-green">algoritmo oficial</strong> da Receita Federal
              para verificar se um CNPJ está correto. A validação é feita em tempo real e considera
              todas as regras oficiais para pessoas jurídicas.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Validação com ou sem pontuação, detecção de erros
              específicos, interface responsiva e resultado instantâneo com explicação detalhada
              sobre dígitos verificadores e códigos de filial.
            </p>
            <p>
              <strong className="text-system-info">Importante:</strong> Esta ferramenta apenas
              verifica se um CNPJ está <strong>matematicamente correto</strong>. Não verifica se a
              empresa existe realmente na base da Receita Federal ou se está ativa.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              ⚡ Validação instantânea • 🔒 Algoritmo oficial • ✓ 100% preciso • 📱 Mobile-friendly
              • 🌙 Modo escuro • 📊 Explicação detalhada
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="validar-cnpj" />
    </div>
  );
}
