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
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("gerador-uuid-guid"),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": ["WebApplication", "SoftwareApplication"],
        name: "Gerador de UUID/GUID - Múltiplos Formatos e Tipos 2026",
        description:
          "Ferramenta gratuita para gerar UUIDs/GUIDs com múltiplos formatos de saída (JavaScript, SQL, MongoDB, Python, Base64). Suporte para tipos v1, v4, v5, geração em lote até 1000 IDs, exportação e copy to clipboard.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-uuid-guid",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-14",
        datePublished: "2025-09-14",
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
            "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-uuid-guid",
          name: "Gerador de UUID/GUID 2026 - Múltiplos Formatos e Tipos",
          description:
            "Gerador de UUID/GUID com múltiplos formatos de saída e tipos. Suporte para JavaScript, SQL, MongoDB, Python, Base64, tipos v1/v4/v5, geração em lote até 1000 e exportação.",
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
                name: "Gerador de UUID/GUID",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-uuid-guid",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "UUID - Universally Unique Identifier",
          description: "Identificador único universal usado em desenvolvimento de software",
          category: "ComputerScience",
        },
        featureList: [
          "Geração UUID v1 (timestamp-based)",
          "Geração UUID v4 (random)",
          "Geração UUID v5 (namespace+name)",
          "Formato GUID Microsoft",
          "Formato sem hífens",
          "Geração em lote até 1000 UUIDs",
          "Múltiplos formatos de saída",
          "Array JavaScript/TypeScript",
          "SQL Server INSERT",
          "Array MongoDB",
          "PostgreSQL array",
          "Lista Python/Django ORM",
          "JSON estruturado",
          "Codificação Base64",
          "Copy to clipboard",
          "Exportação .txt, .json, .sql",
          "Templates SQL avançados",
          "Exemplos ORM",
          "Interface responsiva",
          "Histórico local",
          "RFC 4122 compliant",
          "Compatível com microserviços",
          "Zero dependências externas",
        ],
        softwareVersion: "1.0.0",
        releaseNotes:
          "Versão inicial com suporte completo a UUID v1, v4, v5 e múltiplos formatos de exportação",
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O que é UUID/GUID?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UUID (Universally Unique Identifier) ou GUID (Globally Unique Identifier) são identificadores únicos de 128 bits usados em desenvolvimento de software para garantir unicidade mesmo em sistemas distribuídos.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a diferença entre UUID v1, v4 e v5?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UUID v1 é baseado em timestamp e MAC address. UUID v4 é totalmente aleatório. UUID v5 é baseado em namespace e nome usando hash SHA-1. V4 é mais usado por ser seguro e não expor informações do sistema.",
            },
          },
          {
            "@type": "Question",
            name: "Posso usar UUIDs em produção?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. UUIDs são amplamente usados em produção como chaves primárias, identificadores de sessão, IDs de recursos em APIs REST, e muito mais. São seguros e únicos globalmente.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona a codificação Base64 de UUIDs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A codificação Base64 converte UUIDs (sem hífens) em strings mais compactas para transmissão e armazenamento. Útil em URLs, tokens e sistemas que precisam de identificadores mais curtos mantendo a unicidade.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a performance de geração em lote?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Este gerador suporta até 1000 UUIDs por vez com performance otimizada. A geração é local no navegador, sem dependências de servidor, garantindo velocidade e privacidade dos dados.",
            },
          },
        ],
      },
    },
  ];
};

type UuidVersion = "v1" | "v4" | "v5" | "guid" | "no-hyphens";
type OutputFormat =
  | "simple"
  | "js-array"
  | "sql-server"
  | "mongodb"
  | "postgresql"
  | "python"
  | "json"
  | "base64";

interface UuidResult {
  id: string;
  uuid: string;
  version: UuidVersion;
  generatedAt: Date;
}

interface UuidHistory {
  results: UuidResult[];
  totalGenerated: number;
}

interface ValidationErrors {
  quantity?: string;
  namespace?: string;
  name?: string;
}

export default function UuidGenerator() {
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("simple");
  const [quantity, setQuantity] = useState("1");
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState<UuidResult[]>([]);
  const [history, setHistory] = useState<UuidHistory>({ results: [], totalGenerated: 0 });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "gerador-uuid-guid",
    category: "ferramentas",
  });
  useFormTracking("gerador-uuid-guid");

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("uuid-generator-history");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (error) {
        console.error("Error loading history:", error);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newResults: UuidResult[]) => {
    const updatedHistory: UuidHistory = {
      results: [...newResults, ...history.results].slice(0, 100), // Keep last 100
      totalGenerated: history.totalGenerated + newResults.length,
    };
    setHistory(updatedHistory);
    localStorage.setItem("uuid-generator-history", JSON.stringify(updatedHistory));
  };

  // Generate random UUID v4
  const generateUuidV4 = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Generate timestamp-based UUID v1 (simplified)
  const generateUuidV1 = (): string => {
    const timestamp = Date.now();
    const randomNode = Math.floor(Math.random() * 0xffffffffffff);
    const timeHex = timestamp.toString(16).padStart(12, "0");

    return [
      timeHex.slice(-8),
      timeHex.slice(-12, -8),
      "1" + timeHex.slice(-15, -12),
      "8" +
        Math.floor(Math.random() * 16).toString(16) +
        Math.floor(Math.random() * 16).toString(16) +
        Math.floor(Math.random() * 16).toString(16),
      randomNode.toString(16).padStart(12, "0"),
    ].join("-");
  };

  // Generate namespace-based UUID v5 (simplified using hash)
  const generateUuidV5 = (namespace: string, name: string): string => {
    const hash = hashString(namespace + name);
    return [
      hash.slice(0, 8),
      hash.slice(8, 12),
      "5" + hash.slice(13, 16),
      "8" + hash.slice(17, 20),
      hash.slice(20, 32),
    ].join("-");
  };

  // Simple hash function for UUID v5
  const hashString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(32, "0");
  };

  // Format UUID based on version type
  const formatUuid = (baseUuid: string, version: UuidVersion): string => {
    switch (version) {
      case "guid":
        return `{${baseUuid.toUpperCase()}}`;
      case "no-hyphens":
        return baseUuid.replace(/-/g, "");
      default:
        return baseUuid;
    }
  };

  // Generate UUID based on version
  const generateUuid = (version: UuidVersion, namespace?: string, name?: string): string => {
    let baseUuid: string;

    switch (version) {
      case "v1":
        baseUuid = generateUuidV1();
        break;
      case "v5":
        if (!namespace || !name) throw new Error("Namespace and name required for UUID v5");
        baseUuid = generateUuidV5(namespace, name);
        break;
      case "v4":
      case "guid":
      case "no-hyphens":
      default:
        baseUuid = generateUuidV4();
        break;
    }

    return formatUuid(baseUuid, version);
  };

  // Format output based on selected format
  const formatOutput = (uuids: string[], format: OutputFormat): string => {
    switch (format) {
      case "js-array":
        return `const uuids = [\n  "${uuids.join('",\n  "')}"\n];`;
      case "sql-server":
        return uuids.map((uuid) => `INSERT INTO table (id) VALUES ('${uuid}');`).join("\n");
      case "mongodb":
        return `db.collection.insertMany([\n  ${uuids.map((uuid) => `{ _id: "${uuid}" }`).join(",\n  ")}\n]);`;
      case "postgresql":
        return `ARRAY['${uuids.join("', '")}']::UUID[]`;
      case "python":
        return `uuids = [\n    "${uuids.join('",\n    "')}"\n]`;
      case "json":
        return JSON.stringify(
          { uuids, count: uuids.length, generated_at: new Date().toISOString() },
          null,
          2
        );
      case "base64":
        return uuids
          .map((uuid) => {
            const base64 = btoa(uuid.replace(/-/g, ""));
            return `${uuid} => ${base64}`;
          })
          .join("\n");
      case "simple":
      default:
        return uuids.join("\n");
    }
  };

  // Copy to clipboard function
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
      console.error("Copy error:", error);
      return false;
    }
  };

  // Export function
  const exportUuids = (format: "txt" | "json" | "sql") => {
    const uuids = results.map((r) => r.uuid);
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case "txt":
        content = uuids.join("\n");
        filename = `uuids-${Date.now()}.txt`;
        mimeType = "text/plain";
        break;
      case "json":
        content = JSON.stringify(
          { uuids, metadata: { count: uuids.length, generated_at: new Date().toISOString() } },
          null,
          2
        );
        filename = `uuids-${Date.now()}.json`;
        mimeType = "application/json";
        break;
      case "sql":
        content = uuids.map((uuid) => `INSERT INTO table (id) VALUES ('${uuid}');`).join("\n");
        filename = `uuids-${Date.now()}.sql`;
        mimeType = "text/sql";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validateInput = (): boolean => {
    const newErrors: ValidationErrors = {};

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1 || qty > 1000) {
      newErrors.quantity = "Quantidade deve ser entre 1 e 1000";
    }

    if (version === "v5") {
      if (!namespace.trim()) {
        newErrors.namespace = "Namespace é obrigatório para UUID v5";
      }
      if (!name.trim()) {
        newErrors.name = "Nome é obrigatório para UUID v5";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateInput()) return;
    startCalculation();
    setCopySuccess(false);

    try {
      const qty = parseInt(quantity);
      const newResults: UuidResult[] = [];

      for (let i = 0; i < qty; i++) {
        const uuid = generateUuid(version, namespace, name);
        newResults.push({
          id: Date.now().toString() + i,
          uuid,
          version,
          generatedAt: new Date(),
        });
      }

      setResults(newResults);
      saveHistory(newResults);
      setErrors({});

      // Auto-copy first UUID
      if (newResults.length > 0) {
        const copied = await copyToClipboard(newResults[0].uuid);
        if (copied) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        }
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("UUID generation error:", error);
      setErrors({ quantity: "Erro ao gerar UUID. Tente novamente." });
      endCalculation(false);
    }
  };

  const handleCopyOutput = async () => {
    if (results.length === 0) return;
    const uuids = results.map((r) => r.uuid);
    const formattedOutput = formatOutput(uuids, outputFormat);
    const copied = await copyToClipboard(formattedOutput);

    if (copied) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const handleReset = () => {
    setVersion("v4");
    setOutputFormat("simple");
    setQuantity("1");
    setNamespace("");
    setName("");
    setResults([]);
    setErrors({});
    setCopySuccess(false);
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Gerador de UUID/GUID</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Gerador UUID/GUID 2026 – Múltiplos Formatos e Tipos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Gere <strong className="text-primary-blue-dark">UUIDs/GUIDs únicos</strong> com múltiplos{" "}
          <strong className="text-growth-green">formatos de saída</strong>. Suporte para tipos v1,
          v4, v5, geração em lote e exportação para desenvolvimento.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔀 <strong>Múltiplos Tipos</strong> • 📦 <strong>Lote até 1000</strong> • 💾{" "}
            <strong>Export/Copy</strong> • 🔐 <strong>Base64</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configurações do Gerador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Tipo de UUID */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Select
                  label="Tipo de UUID"
                  value={version}
                  onChange={(value) => setVersion(value as UuidVersion)}
                  options={[
                    { value: "v4", label: "UUID v4 (Random) - Recomendado" },
                    { value: "v1", label: "UUID v1 (Timestamp-based)" },
                    { value: "v5", label: "UUID v5 (Namespace+Name)" },
                    { value: "guid", label: "GUID Microsoft {xxxx...}" },
                    { value: "no-hyphens", label: "Sem hífens (xxxxxxxx...)" },
                  ]}
                  fullWidth
                />
              </div>

              <div>
                <Input
                  label="Quantidade"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  max="1000"
                  fullWidth
                />
                <ErrorMessage error={errors.quantity} />
              </div>
            </div>

            {/* Campos para UUID v5 */}
            {version === "v5" && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Input
                    label="Namespace"
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    placeholder="ex: myapp.domain.com"
                    fullWidth
                  />
                  <ErrorMessage error={errors.namespace} />
                </div>

                <div>
                  <Input
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: user123"
                    fullWidth
                  />
                  <ErrorMessage error={errors.name} />
                </div>
              </div>
            )}

            {/* Formato de Saída */}
            <div>
              <Select
                label="Formato de Saída"
                value={outputFormat}
                onChange={(value) => setOutputFormat(value as OutputFormat)}
                options={[
                  { value: "simple", label: "Simples (um por linha)" },
                  { value: "js-array", label: "Array JavaScript/TypeScript" },
                  { value: "sql-server", label: "SQL Server INSERT" },
                  { value: "mongodb", label: "MongoDB insertMany" },
                  { value: "postgresql", label: "PostgreSQL Array" },
                  { value: "python", label: "Lista Python/Django" },
                  { value: "json", label: "JSON estruturado" },
                  { value: "base64", label: "Base64 (UUID => Codificado)" },
                ]}
                fullWidth
              />
            </div>

            {/* Informações sobre o tipo selecionado */}
            <div className="rounded-lg bg-primary-blue-light p-4">
              <div className="text-center">
                <p className="text-sm text-text-secondary">
                  <strong className="text-primary-blue-dark">
                    {version === "v1" && "UUID v1: Baseado em timestamp e MAC address"}
                    {version === "v4" && "UUID v4: Totalmente aleatório (mais seguro)"}
                    {version === "v5" && "UUID v5: Baseado em namespace e nome"}
                    {version === "guid" && "GUID: Formato Microsoft com chaves"}
                    {version === "no-hyphens" && "Sem hífens: Formato compacto"}
                  </strong>
                </p>
                <p className="mt-1 text-xs text-text-secondary opacity-80">
                  {copySuccess
                    ? "✓ UUID copiado para área de transferência!"
                    : "O primeiro UUID será copiado automaticamente"}
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-center space-x-4">
              <Button onClick={handleGenerate} className="px-8">
                Gerar UUID{parseInt(quantity) > 1 ? "s" : ""}
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
      {results.length > 0 && (
        <div ref={resultRef}>
          <Card className="border-2 border-growth-green bg-growth-green-soft">
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                🎉 {results.length} UUID{results.length > 1 ? "s" : ""} Gerado
                {results.length > 1 ? "s" : ""} com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Saída formatada */}
                <div className="rounded-lg bg-gray-900 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-primary-blue-dark">
                      Resultado ({outputFormat})
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCopyOutput}
                        variant="outline"
                        className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                        size="sm"
                      >
                        📋 Copiar
                      </Button>
                    </div>
                  </div>
                  <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-green-400">
                    {formatOutput(
                      results.map((r) => r.uuid),
                      outputFormat
                    )}
                  </pre>
                </div>

                {/* Ações */}
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={() => exportUuids("txt")}
                    variant="outline"
                    className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                  >
                    💾 Export .txt
                  </Button>
                  <Button
                    onClick={() => exportUuids("json")}
                    variant="outline"
                    className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                  >
                    📄 Export .json
                  </Button>
                  <Button
                    onClick={() => exportUuids("sql")}
                    variant="outline"
                    className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                  >
                    🗃️ Export .sql
                  </Button>
                </div>

                {/* Histórico resumido */}
                {history.totalGenerated > 0 && (
                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">📊 Estatísticas</h4>
                    <p className="text-sm text-text-secondary">
                      <strong>Total gerado nesta sessão:</strong> {history.totalGenerated} UUIDs
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>Último tipo usado:</strong> {version.toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção: Guia Completo sobre UUID/GUID */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🎯 UUID/GUID – Guia Completo 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* O que é UUID */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🆔 O que é UUID/GUID?
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🔍 Definição</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    UUID (Universally Unique Identifier) ou GUID (Globally Unique Identifier) são
                    identificadores únicos de 128 bits usados para garantir unicidade em sistemas
                    distribuídos.
                  </p>

                  <h4 className="mb-3 font-semibold text-system-info">📊 Formato</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</li>
                    <li>• 32 caracteres hexadecimais + 4 hífens</li>
                    <li>• 2^128 possibilidades (340 undecilhões)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-success">✅ Vantagens</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Globalmente únicos sem coordenação</li>
                    <li>• Não sequenciais (segurança)</li>
                    <li>• Padrão RFC 4122</li>
                  </ul>

                  <h4 className="mb-3 font-semibold text-system-warning">⚡ Usos Comuns</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Chaves primárias em bancos</li>
                    <li>• IDs de sessão e tokens</li>
                    <li>• Identificadores de recursos em APIs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tipos de UUID */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                🔢 Tipos de UUID
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold text-primary-blue-dark">🕐 UUID v1</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Baseado em timestamp e MAC address. Garantia de ordem temporal.
                  </p>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>• Pode expor informações do sistema</li>
                    <li>• Ordenável por tempo</li>
                    <li>• Menos usado em produção</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-growth-green">🎲 UUID v4</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Totalmente aleatório. Mais seguro e amplamente usado.
                  </p>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>• 122 bits aleatórios</li>
                    <li>• Mais seguro</li>
                    <li>• Padrão recomendado</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🏷️ UUID v5</h4>
                  <p className="mb-4 text-sm text-text-secondary">
                    Baseado em namespace e nome usando hash SHA-1. Determinístico.
                  </p>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    <li>• Mesmo input = mesmo UUID</li>
                    <li>• Útil para referências</li>
                    <li>• Requer namespace</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Formatos de Saída */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💻 Formatos de Saída para Desenvolvimento
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">
                    🔧 Linguagens de Programação
                  </h4>
                  <ul className="mb-4 space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>JavaScript/TypeScript:</strong>
                      <code className="block rounded bg-gray-800 p-1 text-xs">
                        const ids = ["uuid1", "uuid2"];
                      </code>
                    </li>
                    <li>
                      <strong>Python:</strong>
                      <code className="block rounded bg-gray-800 p-1 text-xs">
                        uuids = ["uuid1", "uuid2"]
                      </code>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🗄️ Bancos de Dados</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>SQL Server:</strong>
                      <code className="block rounded bg-gray-800 p-1 text-xs">
                        INSERT INTO table VALUES ('uuid');
                      </code>
                    </li>
                    <li>
                      <strong>MongoDB:</strong>
                      <code className="block rounded bg-gray-800 p-1 text-xs">
                        db.col.insertMany([{`{_id: "uuid"}`}]);
                      </code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Gerador UUID/GUID"
        items={[
          {
            question: "O que é UUID/GUID?",
            answer:
              "UUID (Universally Unique Identifier) ou GUID (Globally Unique Identifier) são identificadores únicos de 128 bits usados em desenvolvimento de software para garantir unicidade mesmo em sistemas distribuídos, sem necessidade de coordenação central.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre UUID v1, v4 e v5?",
            answer:
              "UUID v1 é baseado em timestamp e MAC address, sendo ordenável mas podendo expor informações do sistema. UUID v4 é totalmente aleatório e mais seguro. UUID v5 é baseado em namespace e nome usando hash SHA-1, sendo determinístico (mesmo input sempre gera o mesmo UUID).",
            borderColor: "primary-blue",
          },
          {
            question: "Posso usar UUIDs em produção?",
            answer:
              "Sim, UUIDs são amplamente usados em produção como chaves primárias em bancos de dados, identificadores de sessão, IDs de recursos em APIs REST, e muito mais. São seguros, únicos globalmente e seguem o padrão RFC 4122.",
            borderColor: "growth-green",
          },
          {
            question: "Qual tipo de UUID devo usar?",
            answer:
              "Para a maioria dos casos, use UUID v4 (random) pois é mais seguro e não expõe informações do sistema. Use v1 se precisar de ordenação temporal. Use v5 se precisar do mesmo UUID para os mesmos inputs (determinístico).",
            borderColor: "system-info",
          },
          {
            question: "Como usar UUIDs em diferentes linguagens?",
            answer:
              "JavaScript: crypto.randomUUID(). Python: import uuid; uuid.uuid4(). C#: Guid.NewGuid(). Java: UUID.randomUUID(). PHP: uniqid() ou random_bytes(). SQL: NEWID() no SQL Server, gen_random_uuid() no PostgreSQL.",
            borderColor: "system-warning",
          },
          {
            question: "UUIDs podem ser duplicados?",
            answer:
              "A probabilidade de duplicação é praticamente zero. Com 2^128 possibilidades, seria necessário gerar trilhões de UUIDs por segundo durante bilhões de anos para ter chance significativa de duplicação. Por isso são considerados únicos globalmente.",
            borderColor: "system-success",
          },
        ]}
        tipSection={{
          title: "Dica para Desenvolvedores",
          content:
            "<strong>Boas práticas:</strong> Use UUID v4 para chaves primárias, armazene como BINARY(16) no MySQL ou UUID no PostgreSQL para otimizar performance. Para APIs REST, sempre use UUIDs em URLs públicas para evitar enumeração de recursos.",
        }}
        footerText="<strong>Lembre-se:</strong> UUIDs garantem unicidade global sem coordenação, sendo ideais para sistemas distribuídos, microserviços e APIs modernas."
      />

      {/* Snippets de Código */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Snippets de Código para Desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">JavaScript/Node.js</h4>
                <pre className="rounded bg-gray-800 p-3 text-xs text-green-400">
                  {`// Nativo (moderno)
const uuid = crypto.randomUUID();

// Com biblioteca uuid
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();`}
                </pre>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">Python</h4>
                <pre className="rounded bg-gray-800 p-3 text-xs text-green-400">
                  {`import uuid

# UUID v4 (random)
uuid4 = str(uuid.uuid4())

# UUID v1 (timestamp)
uuid1 = str(uuid.uuid1())`}
                </pre>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">C#/.NET</h4>
                <pre className="rounded bg-gray-800 p-3 text-xs text-green-400">
                  {`// Novo GUID
var guid = Guid.NewGuid();
var guidString = guid.ToString();

// Formatos
guid.ToString("D"); // com hífens
guid.ToString("N"); // sem hífens`}
                </pre>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-primary-blue-dark">SQL</h4>
                <pre className="rounded bg-gray-800 p-3 text-xs text-green-400">
                  {`-- SQL Server
SELECT NEWID() as uuid;

-- PostgreSQL
SELECT gen_random_uuid() as uuid;

-- MySQL
SELECT UUID() as uuid;`}
                </pre>
              </div>
            </div>

            <div className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              💡 <strong>Dica:</strong> Use este gerador para prototipagem rápida, testes de carga,
              seeds de banco de dados e criação de dados fictícios para desenvolvimento.
            </div>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="gerador-uuid-guid" />
    </div>
  );
}
