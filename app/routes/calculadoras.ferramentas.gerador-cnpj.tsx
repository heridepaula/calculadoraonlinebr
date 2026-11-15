import type { MetaFunction } from "@remix-run/node";
import { useRef, useState, type ComponentProps } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Input,
} from "~/components/ui";
import { RelatedCalculators, FAQ, DirectAnswer } from "~/components";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";
import { SEO_YEAR } from "~/lib/constants";
import { formatCnpj, generateCnpj, sanitizeCnpj, validateBranch } from "~/lib/cnpj";

type FaqItems = ComponentProps<typeof FAQ>["items"];

// Fonte única: a mesma lista alimenta o FAQ visível e o JSON-LD FAQPage
const FAQ_ITEMS: FaqItems = [
  {
    question: "O gerador cria CNPJ alfanumérico?",
    answer:
      "Sim. O padrão é o CNPJ alfanumérico (IN RFB 2.229/2024, em vigor desde julho de 2026): letras de A a Z e números nas 12 primeiras posições, com os 2 dígitos verificadores numéricos calculados pelo módulo 11. Você pode trocar para o formato numérico tradicional.",
    borderColor: "primary-blue",
  },
  {
    question: "O que é um CNPJ?",
    answer:
      "CNPJ (Cadastro Nacional de Pessoas Jurídicas) é o documento de identificação fiscal de pessoa jurídica no Brasil, composto por 14 caracteres com formatação XX.XXX.XXX/XXXX-XX. É obrigatório para empresas e organizações.",
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
      "Com pontuação: 12.345.678/0001-95 (formato padrão para documentos). Sem pontuação: 12345678000195 (formato usado em sistemas e bases de dados). O mesmo vale para o alfanumérico, como 12.ABC.345/0001-88. Você pode alternar entre os formatos a qualquer momento.",
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
      "'0001' é o código da matriz e é o valor padrão do gerador. Você pode editar o campo Ordem/filial (por exemplo 0002 para uma filial). No CNPJ alfanumérico a ordem também aceita letras; '0000' não é aceito.",
    borderColor: "primary-blue",
  },
];

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("gerador-cnpj"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: `Gerador de CNPJ Alfanumérico e Numérico ${SEO_YEAR}`,
        description:
          "Ferramenta gratuita para gerar CNPJs alfanuméricos (IN RFB 2.229/2024) ou numéricos válidos, com ou sem pontuação e ordem/filial editável. Ideal para testes e desenvolvimento, com cópia automática.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-cnpj",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2026-11-15",
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
          name: `Gerador de CNPJ Alfanumérico e Numérico ${SEO_YEAR}`,
          description:
            "Gerador de CNPJ alfanumérico e numérico, válido e gratuito. Gere com ou sem pontuação, edite a ordem/filial e copie automaticamente.",
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
          "Geração de CNPJ numérico e alfanumérico (IN RFB 2.229/2024)",
          "Ordem/filial editável (padrão 0001)",
          "Formatação com ou sem pontuação",
          "Cópia automática para área de transferência",
          "Validação de dígitos verificadores",
          "Interface responsiva",
          "Uso para testes e desenvolvimento",
          "Geração instantânea",
          "Ferramenta gratuita",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    },
  ];
};

interface CnpjResult {
  cnpj: string;
  cnpjFormatted: string;
  isValid: boolean;
  alphanumeric: boolean;
  generatedAt: Date;
}

interface ValidationErrors {
  generation?: string;
  branch?: string;
}

export default function CnpjGenerator() {
  const [withFormatting, setWithFormatting] = useState(true);
  const [alphanumeric, setAlphanumeric] = useState(true);
  const [branch, setBranch] = useState("0001");
  const [branchNotice, setBranchNotice] = useState<string | null>(null);
  const [result, setResult] = useState<CnpjResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "gerador-cnpj",
    category: "ferramentas",
  });
  useFormTracking("gerador-cnpj");

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

  const handleBranchChange = (value: string) => {
    const cleaned = sanitizeCnpj(value).slice(0, 4);
    setBranch(alphanumeric ? cleaned : cleaned.replace(/[^0-9]/g, ""));
    setErrors({});
    setBranchNotice(null);
  };

  const handleTypeChange = (nextAlphanumeric: boolean) => {
    setAlphanumeric(nextAlphanumeric);
    setErrors({});
    setBranchNotice(null);
    if (!nextAlphanumeric && /[^0-9]/.test(branch)) {
      setBranch("0001");
      setBranchNotice("A ordem voltou para 0001: no CNPJ numérico ela só aceita números.");
    }
  };

  // Gerar CNPJ válido
  const generateValidCnpj = (): CnpjResult => {
    const cnpj = generateCnpj({ alphanumeric, branch });
    return {
      cnpj,
      cnpjFormatted: formatCnpj(cnpj),
      isValid: true,
      alphanumeric,
      generatedAt: new Date(),
    };
  };

  const handleGenerate = async () => {
    const branchError = validateBranch(branch, alphanumeric);
    if (branchError) {
      setErrors({ branch: branchError });
      return;
    }
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
    setAlphanumeric(true);
    setBranch("0001");
    setBranchNotice(null);
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
          Gerador de CNPJ Alfanumérico e Numérico {SEO_YEAR}
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

      <DirectAnswer title="O que é o CNPJ alfanumérico e como gerar um válido">
        <p>
          O CNPJ tem 14 caracteres: 8 da raiz, 4 de ordem/filial (0001 é a matriz) e 2 dígitos
          verificadores calculados pelo módulo 11. Desde julho de 2026 (Instrução Normativa RFB
          2.229/2024), as 12 primeiras posições podem ter letras de A a Z, e cada caractere entra na
          conta com o valor do seu código ASCII menos 48 (A=17, Z=42). Os dois dígitos finais
          continuam numéricos.
        </p>
        <p>
          Este gerador cria CNPJs alfanuméricos (padrão) ou numéricos matematicamente válidos, mas
          fictícios, só para testes e desenvolvimento.
        </p>
      </DirectAnswer>

      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configurações do Gerador de CNPJ</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tipo de CNPJ */}
          <div className="mb-6">
            <div
              className="mb-2 text-center text-sm font-medium text-text-primary"
              id="cnpj-type-label"
            >
              Tipo de CNPJ
            </div>
            <div className="flex justify-center">
              <div
                role="radiogroup"
                aria-labelledby="cnpj-type-label"
                className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-neutral-surface-variant sm:flex-row"
              >
                {[
                  { value: true, label: "Alfanumérico (novo)" },
                  { value: false, label: "Numérico" },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    role="radio"
                    aria-checked={alphanumeric === option.value}
                    onClick={() => handleTypeChange(option.value)}
                    className={`min-h-[44px] flex-1 px-4 py-3 text-center text-base font-medium transition ${
                      alphanumeric === option.value
                        ? "bg-primary-blue text-gray-900"
                        : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-text-secondary">
              {alphanumeric
                ? "Raiz com letras e números (IN RFB 2.229/2024); os 2 dígitos verificadores são numéricos."
                : "Formato tradicional, somente números."}
            </p>
          </div>

          {/* Ordem / filial */}
          <div className="mx-auto mb-6 max-w-md">
            <label
              htmlFor="cnpj-branch"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Ordem / filial (4 caracteres)
            </label>
            <Input
              id="cnpj-branch"
              type="text"
              value={branch}
              onChange={(e) => handleBranchChange(e.target.value)}
              maxLength={4}
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              className="font-mono text-lg"
            />
            <ErrorMessage error={errors.branch} />
            {branchNotice && <p className="mt-1 text-sm text-system-warning">{branchNotice}</p>}
            <p className="mt-1 text-xs text-text-secondary">
              0001 representa a matriz; filiais usam 0002, 0003...
              {alphanumeric ? " No alfanumérico a ordem também pode ter letras." : ""}
            </p>
          </div>

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
                    <strong>Tipo:</strong> {result.alphanumeric ? "Alfanumérico" : "Numérico"}
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
                    caracteres. Desde julho de 2026 a raiz e a ordem também podem ter letras (CNPJ
                    alfanumérico, IN RFB 2.229/2024); os 2 dígitos verificadores seguem numéricos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Formato</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Formato: XX.XXX.XXX/XXXX-XX</li>
                    <li>• 12 caracteres (0-9 e A-Z) + 2 dígitos verificadores</li>
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
                    Converte-se cada um dos primeiros 12 caracteres em número (código ASCII − 48:
                    A=17 ... Z=42) e multiplica-se por uma sequência específica
                    (5,4,3,2,9,8,7,6,5,4,3,2) e calcula-se o resto da divisão por 11.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Cálculo</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Soma = v₁×5 + v₂×4 + ... + v₁₂×2 (v = valor do caractere)</li>
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
                    <li>• Soma = v₁×6 + v₂×5 + ... + DV1×2</li>
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
        items={FAQ_ITEMS}
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
              <strong>Funcionalidades:</strong> Geração numérica ou alfanumérica, ordem/filial
              editável, com ou sem pontuação, cópia automática para área de transferência, interface
              responsiva e geração instantânea com um clique.
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
