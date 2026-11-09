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
  Input,
  Label,
  Checkbox,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {
      title: `Gerador de Senhas Seguras 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "🔐 Gerador de senhas seguras GRATUITO! Crie senhas personalizáveis com análise de força, cópia automática e controle total de caracteres. Teste agora!",
    },
    {
      name: "keywords",
      content:
        "gerador senha segura, criar senha forte, senha aleatória online, password generator brasileiro, análise força senha",
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
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
    },
    {
      property: "og:title",
      content: "Gerador de Senhas Seguras – Personalize Tamanho e Caracteres",
    },
    {
      property: "og:description",
      content:
        "🔐 Gerador de senhas seguras GRATUITO! Crie senhas personalizáveis com análise de força, cópia automática e controle total de caracteres. Teste agora!",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og/gerador-senha-segura.jpg",
    },
    {
      property: "og:image:alt",
      content:
        "Gerador de Senhas Seguras - Crie senhas fortes com caracteres especiais e números",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Gerador de Senhas Seguras 2026 – Crie Senhas Fortes Personalizadas",
    },
    {
      name: "twitter:description",
      content:
        "🔐 Gerador de senhas seguras GRATUITO! Crie senhas personalizáveis com análise de força e cópia automática. Teste agora!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og/gerador-senha-segura.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Senhas Seguras - Crie senhas fortes personalizadas",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "msapplication-TileColor", content: "#1f2937" },
    { name: "apple-mobile-web-app-title", content: "Gerador Senhas" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Gerador de Senhas Seguras - Personalização Completa 2026",
        description:
          "Ferramenta gratuita para gerar senhas seguras personalizáveis com controle de tamanho, caracteres especiais, números e letras. Análise de força da senha e cópia automática.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
        applicationCategory: "SecurityApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-22",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
          name: "Gerador de Senhas Seguras 2026 - Personalização Completa",
          description:
            "Gerador de senhas seguras com controle total sobre tamanho, caracteres especiais, números e letras. Análise de força da senha e cópia automática.",
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
                name: "Gerador de Senhas Seguras",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas/gerador-senha-segura",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Segurança Digital",
          description: "Ferramenta para criação de senhas seguras e fortes para proteção digital",
          category: "SecurityApplication",
        },
        featureList: [
          "Geração de senhas personalizáveis",
          "Controle de tamanho (4-128 caracteres)",
          "Opção de incluir/excluir caracteres especiais",
          "Opção de incluir/excluir números",
          "Opção de incluir/excluir letras maiúsculas",
          "Análise de força da senha",
          "Cópia automática para área de transferência",
          "Interface responsiva",
          "Ferramenta gratuita",
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
            name: "Como criar uma senha segura?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Uma senha segura deve ter pelo menos 12 caracteres, incluir letras maiúsculas e minúsculas, números e símbolos especiais. Evite palavras do dicionário, informações pessoais e sequências óbvias.",
            },
          },
          {
            "@type": "Question",
            name: "Qual o tamanho ideal para uma senha?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O tamanho ideal é de pelo menos 12-16 caracteres. Senhas mais longas são exponencialmente mais seguras. Para contas importantes, recomenda-se 16+ caracteres.",
            },
          },
          {
            "@type": "Question",
            name: "É seguro usar geradores de senha online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, quando o gerador é confiável e executa localmente no navegador. Nossa ferramenta gera senhas no seu dispositivo, sem enviar dados para servidores externos.",
            },
          },
        ],
      },
    },
  ];
};

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  customSymbols: string;
  minUppercase: number;
  minLowercase: number;
  minNumbers: number;
  minSymbols: number;
}

interface PasswordResult {
  password: string;
  strength: {
    score: number;
    level: "Muito Fraca" | "Fraca" | "Média" | "Forte" | "Muito Forte";
    color: string;
    feedback: string[];
  };
  generatedAt: Date;
}

interface ValidationErrors {
  length?: string;
  options?: string;
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    customSymbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  const [result, setResult] = useState<PasswordResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "gerador-senha-segura",
    category: "ferramentas",
  });
  useFormTracking("gerador-senha-segura");

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

  // Gerar senha com base nas opções
  const generatePassword = (opts: PasswordOptions): string => {
    // Definir conjuntos de caracteres
    const lowerChars = opts.excludeSimilar ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
    const upperChars = opts.excludeSimilar ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = opts.excludeSimilar ? "23456789" : "0123456789";
    const symbolChars = opts.customSymbols;

    // Verificar se pelo menos um tipo está selecionado
    if (!opts.includeUppercase && !opts.includeLowercase && !opts.includeNumbers && !opts.includeSymbols) {
      throw new Error("Pelo menos um tipo de caractere deve ser selecionado");
    }

    // Calcular quantidades mínimas requeridas
    const minRequiredChars =
      (opts.includeUppercase ? opts.minUppercase : 0) +
      (opts.includeLowercase ? opts.minLowercase : 0) +
      (opts.includeNumbers ? opts.minNumbers : 0) +
      (opts.includeSymbols ? opts.minSymbols : 0);

    if (minRequiredChars > opts.length) {
      throw new Error("Tamanho da senha é menor que a soma dos mínimos requeridos");
    }

    let password: string[] = [];

    // Adicionar caracteres mínimos obrigatórios
    if (opts.includeUppercase) {
      for (let i = 0; i < opts.minUppercase; i++) {
        password.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
      }
    }

    if (opts.includeLowercase) {
      for (let i = 0; i < opts.minLowercase; i++) {
        password.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
      }
    }

    if (opts.includeNumbers) {
      for (let i = 0; i < opts.minNumbers; i++) {
        password.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
      }
    }

    if (opts.includeSymbols) {
      for (let i = 0; i < opts.minSymbols; i++) {
        password.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
      }
    }

    // Completar o restante da senha com caracteres aleatórios dos tipos disponíveis
    let allChars = "";
    if (opts.includeUppercase) allChars += upperChars;
    if (opts.includeLowercase) allChars += lowerChars;
    if (opts.includeNumbers) allChars += numberChars;
    if (opts.includeSymbols) allChars += symbolChars;

    const remainingLength = opts.length - password.length;
    for (let i = 0; i < remainingLength; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Embaralhar a senha para distribuir os caracteres obrigatórios
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join("");
  };

  // Analisar força da senha
  const analyzePasswordStrength = (password: string): PasswordResult['strength'] => {
    let score = 0;
    const feedback: string[] = [];

    // Critérios de pontuação
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Feedback específico
    if (password.length < 8) feedback.push("Use pelo menos 8 caracteres");
    if (password.length < 12) feedback.push("Senhas com 12+ caracteres são mais seguras");
    if (!/[a-z]/.test(password)) feedback.push("Adicione letras minúsculas");
    if (!/[A-Z]/.test(password)) feedback.push("Adicione letras maiúsculas");
    if (!/[0-9]/.test(password)) feedback.push("Adicione números");
    if (!/[^A-Za-z0-9]/.test(password)) feedback.push("Adicione símbolos especiais");

    // Determinar nível
    let level: PasswordResult['strength']['level'];
    let color: string;

    if (score <= 2) {
      level = "Muito Fraca";
      color = "system-error";
    } else if (score <= 3) {
      level = "Fraca";
      color = "system-warning";
    } else if (score <= 4) {
      level = "Média";
      color = "system-info";
    } else if (score <= 6) {
      level = "Forte";
      color = "growth-green";
    } else {
      level = "Muito Forte";
      color = "primary-blue";
    }

    if (feedback.length === 0) {
      feedback.push("Senha atende a todos os critérios de segurança!");
    }

    return { score, level, color, feedback };
  };

  const validateOptions = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (options.length < 4 || options.length > 128) {
      newErrors.length = "O tamanho deve estar entre 4 e 128 caracteres";
    }

    if (!options.includeUppercase && !options.includeLowercase && !options.includeNumbers && !options.includeSymbols) {
      newErrors.options = "Selecione pelo menos um tipo de caractere";
    }

    // Validar quantidades mínimas
    const minRequiredChars =
      (options.includeUppercase ? options.minUppercase : 0) +
      (options.includeLowercase ? options.minLowercase : 0) +
      (options.includeNumbers ? options.minNumbers : 0) +
      (options.includeSymbols ? options.minSymbols : 0);

    if (minRequiredChars > options.length) {
      newErrors.options = `A soma dos mínimos (${minRequiredChars}) é maior que o tamanho da senha (${options.length})`;
    }

    // Validar valores mínimos individuais
    if (options.includeUppercase && (options.minUppercase < 0 || options.minUppercase > options.length)) {
      newErrors.options = "Quantidade mínima de maiúsculas inválida";
    }
    if (options.includeLowercase && (options.minLowercase < 0 || options.minLowercase > options.length)) {
      newErrors.options = "Quantidade mínima de minúsculas inválida";
    }
    if (options.includeNumbers && (options.minNumbers < 0 || options.minNumbers > options.length)) {
      newErrors.options = "Quantidade mínima de números inválida";
    }
    if (options.includeSymbols && (options.minSymbols < 0 || options.minSymbols > options.length)) {
      newErrors.options = "Quantidade mínima de símbolos inválida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateOptions()) return;
    startCalculation();
    setCopySuccess(false);

    try {
      const password = generatePassword(options);
      const strength = analyzePasswordStrength(password);

      const newResult: PasswordResult = {
        password,
        strength,
        generatedAt: new Date(),
      };

      setResult(newResult);
      setErrors({});

      // Auto-copy to clipboard
      const copied = await copyToClipboard(password);

      if (copied) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      console.error("Erro ao gerar senha:", error);
      setErrors({ options: "Erro ao gerar senha. Verifique as configurações." });
      endCalculation(false);
    }
  };

  const handleReset = () => {
    setOptions({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: false,
      customSymbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    setResult(null);
    setErrors({});
    setCopySuccess(false);
    setShowPassword(false);
  };

  const handleCopyAgain = async () => {
    if (!result) return;
    const copied = await copyToClipboard(result.password);

    if (copied) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Função para mascarar a senha
  const maskPassword = (password: string): string => {
    return '•'.repeat(password.length);
  };

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-3 sm:px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/ferramentas">Ferramentas</BreadcrumbItem>
        <BreadcrumbItem isLast>Gerador de Senhas Seguras</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Gerador de Senhas Seguras 2026 – Personalização Completa
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Crie <strong className="text-primary-blue-dark">senhas seguras</strong> personalizáveis com
          controle total sobre <strong className="text-growth-green">tamanho, caracteres especiais</strong>, números e letras.
          Análise de força e cópia automática.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            🔐 <strong>Senhas Personalizáveis</strong> • 📊 <strong>Análise de Força</strong> • 📋{" "}
            <strong>Cópia Automática</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">⚙️ Configurações da Senha</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tamanho da senha */}
          <div className="mb-6">
            <Label htmlFor="length" className="mb-2 block text-sm font-medium text-text-primary">
              Tamanho da Senha
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="length"
                type="number"
                min="4"
                max="128"
                value={options.length}
                onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) || 4 }))}
                className="w-24"
              />
              <input
                type="range"
                min="4"
                max="128"
                value={options.length}
                onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-sm text-text-secondary">{options.length} caracteres</span>
            </div>
            <ErrorMessage error={errors.length} />
          </div>

          {/* Tipos de caracteres e quantidades */}
          <div className="mb-6">
            <Label className="mb-3 block text-sm font-medium text-text-primary">
              Tipos de Caracteres e Quantidades Mínimas
            </Label>
            <div className="grid grid-cols-1 gap-4">
              {/* Maiúsculas */}
              <div className="flex items-center gap-4 rounded-lg border border-neutral-surface-variant p-4">
                <div className="flex-1">
                  <Checkbox
                    checked={options.includeUppercase}
                    onChange={(e) => setOptions(prev => ({ ...prev, includeUppercase: e.target.checked }))}
                    label="Letras Maiúsculas (A-Z)"
                    labelClassName="text-text-secondary"
                  />
                </div>
                {options.includeUppercase && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="minUppercase" className="text-xs text-text-secondary whitespace-nowrap">
                      Mín:
                    </Label>
                    <Input
                      id="minUppercase"
                      type="number"
                      min="0"
                      max={options.length}
                      value={options.minUppercase}
                      onChange={(e) => setOptions(prev => ({ ...prev, minUppercase: parseInt(e.target.value) || 0 }))}
                      className="w-16"
                    />
                  </div>
                )}
              </div>

              {/* Minúsculas */}
              <div className="flex items-center gap-4 rounded-lg border border-neutral-surface-variant p-4">
                <div className="flex-1">
                  <Checkbox
                    checked={options.includeLowercase}
                    onChange={(e) => setOptions(prev => ({ ...prev, includeLowercase: e.target.checked }))}
                    label="Letras Minúsculas (a-z)"
                    labelClassName="text-text-secondary"
                  />
                </div>
                {options.includeLowercase && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="minLowercase" className="text-xs text-text-secondary whitespace-nowrap">
                      Mín:
                    </Label>
                    <Input
                      id="minLowercase"
                      type="number"
                      min="0"
                      max={options.length}
                      value={options.minLowercase}
                      onChange={(e) => setOptions(prev => ({ ...prev, minLowercase: parseInt(e.target.value) || 0 }))}
                      className="w-16"
                    />
                  </div>
                )}
              </div>

              {/* Números */}
              <div className="flex items-center gap-4 rounded-lg border border-neutral-surface-variant p-4">
                <div className="flex-1">
                  <Checkbox
                    checked={options.includeNumbers}
                    onChange={(e) => setOptions(prev => ({ ...prev, includeNumbers: e.target.checked }))}
                    label="Números (0-9)"
                    labelClassName="text-text-secondary"
                  />
                </div>
                {options.includeNumbers && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="minNumbers" className="text-xs text-text-secondary whitespace-nowrap">
                      Mín:
                    </Label>
                    <Input
                      id="minNumbers"
                      type="number"
                      min="0"
                      max={options.length}
                      value={options.minNumbers}
                      onChange={(e) => setOptions(prev => ({ ...prev, minNumbers: parseInt(e.target.value) || 0 }))}
                      className="w-16"
                    />
                  </div>
                )}
              </div>

              {/* Símbolos */}
              <div className="flex items-center gap-4 rounded-lg border border-neutral-surface-variant p-4">
                <div className="flex-1">
                  <Checkbox
                    checked={options.includeSymbols}
                    onChange={(e) => setOptions(prev => ({ ...prev, includeSymbols: e.target.checked }))}
                    label="Símbolos (!@#$%)"
                    labelClassName="text-text-secondary"
                  />
                </div>
                {options.includeSymbols && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="minSymbols" className="text-xs text-text-secondary whitespace-nowrap">
                      Mín:
                    </Label>
                    <Input
                      id="minSymbols"
                      type="number"
                      min="0"
                      max={options.length}
                      value={options.minSymbols}
                      onChange={(e) => setOptions(prev => ({ ...prev, minSymbols: parseInt(e.target.value) || 0 }))}
                      className="w-16"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Resumo do total mínimo */}
            {(options.includeUppercase || options.includeLowercase || options.includeNumbers || options.includeSymbols) && (
              <div className="mt-4 rounded-lg bg-primary-blue-light p-3">
                <p className="text-center text-sm text-primary-blue-dark">
                  <strong>Total mínimo:</strong> {
                    (options.includeUppercase ? options.minUppercase : 0) +
                    (options.includeLowercase ? options.minLowercase : 0) +
                    (options.includeNumbers ? options.minNumbers : 0) +
                    (options.includeSymbols ? options.minSymbols : 0)
                  } de {options.length} caracteres
                </p>
              </div>
            )}

            <ErrorMessage error={errors.options} />
          </div>

          {/* Opções avançadas */}
          <div className="mb-6">
            <Label className="mb-3 block text-sm font-medium text-text-primary">
              Opções Avançadas
            </Label>
            <div className="space-y-3">
              <Checkbox
                checked={options.excludeSimilar}
                onChange={(e) => setOptions(prev => ({ ...prev, excludeSimilar: e.target.checked }))}
                label="Excluir caracteres similares (i, l, 1, I, o, 0, O)"
                labelClassName="text-text-secondary"
              />

              {options.includeSymbols && (
                <div>
                  <Label htmlFor="customSymbols" className="mb-2 block text-xs text-text-secondary">
                    Símbolos Personalizados
                  </Label>
                  <Input
                    id="customSymbols"
                    type="text"
                    value={options.customSymbols}
                    onChange={(e) => setOptions(prev => ({ ...prev, customSymbols: e.target.value }))}
                    placeholder="!@#$%^&*()_+-=[]{}|;:,.<>?"
                    className="font-mono text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-center space-x-4">
            <Button onClick={handleGenerate} className="px-8">
              🔐 Gerar Senha
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
                🎉 Senha Gerada com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="rounded-lg bg-gray-900 p-6 text-center">
                  <div className="mb-4">
                    <div className="mb-2 text-sm text-text-secondary">Sua Nova Senha</div>
                    <div className="relative">
                      <div className="break-all font-mono text-2xl font-bold text-primary-blue-dark sm:text-3xl">
                        {showPassword ? result.password : maskPassword(result.password)}
                      </div>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-primary-blue transition-colors"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L7.636 7.636m2.242 2.242L12 12m-2.122-2.122L7.636 7.636m9.192 9.192l2.122 2.122M19.5 7.5L16.879 4.879M7.636 7.636L4.5 4.5m9.192 9.192l2.122 2.122" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 text-sm text-text-secondary">Força da Senha</div>
                    <div className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium text-${result.strength.color}`}>
                      {result.strength.level} ({result.strength.score}/7 pontos)
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                      onClick={handleCopyAgain}
                      variant="outline"
                      className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
                    >
                      📋 Copiar Senha
                    </Button>

                    <Button
                      onClick={handleGenerate}
                      variant="outline"
                      className="border-growth-green text-growth-green hover:bg-growth-green hover:text-white"
                    >
                      🔄 Gerar Nova
                    </Button>
                  </div>

                  {copySuccess && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-growth-green-soft px-4 py-2 text-sm text-growth-green">
                      ✓ Senha copiada para área de transferência!
                    </div>
                  )}
                </div>
              </div>

              {/* Análise de força */}
              <div className="rounded-lg bg-primary-blue-light p-4">
                <h4 className="mb-3 font-semibold text-primary-blue-dark">📊 Análise de Segurança</h4>
                <div className="space-y-2">
                  {result.strength.feedback.map((feedback, index) => (
                    <div key={index} className="text-sm text-text-secondary">
                      {feedback.includes("!") ? "✓" : "•"} {feedback}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded border border-system-warning/20 bg-system-warning/10 p-3 text-sm text-system-warning">
                🔒 <strong>Dica de Segurança:</strong> Não compartilhe sua senha e use um gerenciador
                de senhas para armazenar com segurança.
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção: Guia de Segurança de Senhas */}
      <Card className="border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🛡️ Guia Completo de Segurança de Senhas 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Boas práticas */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-primary-blue-dark">
                ✅ Boas Práticas para Senhas Seguras
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">🎯 Características Ideais</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Pelo menos 12-16 caracteres</li>
                    <li>• Combinação de maiúsculas e minúsculas</li>
                    <li>• Números e símbolos especiais</li>
                    <li>• Evitar palavras do dicionário</li>
                    <li>• Não usar informações pessoais</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-info">🔄 Gerenciamento</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Use senhas únicas para cada conta</li>
                    <li>• Utilize gerenciadores de senha</li>
                    <li>• Ative autenticação de dois fatores</li>
                    <li>• Atualize senhas regularmente</li>
                    <li>• Monitore vazamentos de dados</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Critérios de força */}
            <div className="rounded-xl border border-growth-green/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-growth-green">
                💪 Como Avaliar a Força da Senha
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-success">📈 Fatores de Pontuação</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• Tamanho: 8+, 12+, 16+ caracteres</li>
                    <li>• Letras minúsculas (a-z)</li>
                    <li>• Letras maiúsculas (A-Z)</li>
                    <li>• Números (0-9)</li>
                    <li>• Símbolos especiais (!@#$%)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Níveis de Segurança</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• <span className="text-system-error">Muito Fraca:</span> 0-2 pontos</li>
                    <li>• <span className="text-system-warning">Fraca:</span> 3 pontos</li>
                    <li>• <span className="text-system-info">Média:</span> 4 pontos</li>
                    <li>• <span className="text-growth-green">Forte:</span> 5-6 pontos</li>
                    <li>• <span className="text-primary-blue">Muito Forte:</span> 7 pontos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Erros comuns */}
            <div className="rounded-xl border border-system-error/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-system-error">
                ❌ Erros Comuns a Evitar
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-system-error">🚫 Senhas Perigosas</h4>
                  <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                    <li>• 123456, password, admin</li>
                    <li>• Nome + data de nascimento</li>
                    <li>• Sequências do teclado (qwerty)</li>
                    <li>• Palavras do dicionário</li>
                    <li>• Senhas anteriores com variações</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-system-warning">⚠️ Práticas Inseguras</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Reutilizar a mesma senha</li>
                    <li>• Compartilhar por email/mensagem</li>
                    <li>• Anotar em papel visível</li>
                    <li>• Usar em computadores públicos</li>
                    <li>• Ignorar avisos de vazamento</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Gerador de Senhas Seguras"
        items={[
          {
            question: "Como criar uma senha segura?",
            answer:
              "Uma senha segura deve ter pelo menos 12 caracteres, incluir letras maiúsculas e minúsculas, números e símbolos especiais. Evite palavras do dicionário, informações pessoais e sequências óbvias. Use nosso gerador para criar senhas que atendem a todos esses critérios automaticamente.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual o tamanho ideal para uma senha?",
            answer:
              "O tamanho ideal é de pelo menos 12-16 caracteres. Senhas mais longas são exponencialmente mais seguras contra ataques de força bruta. Para contas importantes como email e bancos, recomenda-se 16+ caracteres.",
            borderColor: "growth-green",
          },
          {
            question: "É seguro usar geradores de senha online?",
            answer:
              "Sim, quando o gerador é confiável e executa localmente no navegador. Nossa ferramenta gera senhas inteiramente no seu dispositivo, sem enviar dados para servidores externos. A senha é criada usando randomização criptográfica do seu navegador.",
            borderColor: "system-info",
          },
          {
            question: "Devo excluir caracteres similares?",
            answer:
              "Recomendamos excluir caracteres similares (como i, l, 1, I, o, 0, O) apenas se você precisar digitar a senha manualmente com frequência. Para senhas copiadas e coladas, caracteres similares aumentam a complexidade sem problemas práticos.",
            borderColor: "system-warning",
          },
          {
            question: "Com que frequência devo trocar minhas senhas?",
            answer:
              "Troque senhas imediatamente se houver suspeita de comprometimento ou vazamento. Para uso normal, senhas fortes não precisam ser trocadas regularmente. Foque em usar senhas únicas para cada conta e ativar autenticação de dois fatores.",
            borderColor: "primary-blue",
          },
          {
            question: "Como armazenar senhas com segurança?",
            answer:
              "Use um gerenciador de senhas confiável como Bitwarden, 1Password ou LastPass. Eles criptografam suas senhas e geram automaticamente senhas fortes. Evite anotar senhas em papel ou arquivos de texto sem criptografia.",
            borderColor: "growth-green",
          },
        ]}
        tipSection={{
          title: "Dica de Ouro para Senhas",
          content:
            "<strong>Regra dos 3 Únicos:</strong> Use senhas únicas para cada conta, ative autenticação de dois fatores sempre que possível e utilize um gerenciador de senhas para não precisar decorar todas elas.",
        }}
        footerText="<strong>Lembre-se:</strong> A segurança digital começa com senhas fortes. Invista tempo criando e gerenciando suas senhas adequadamente - é uma das melhores proteções que você pode ter online."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            🔐 Como Usar Este Gerador de Senhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Este <strong className="text-primary-blue-dark">gerador de senhas seguras</strong> oferece{" "}
              <strong className="text-growth-green">personalização completa</strong> para criar senhas
              que atendem às suas necessidades específicas. Configure tamanho, tipos de caracteres e
              opções avançadas.
            </p>
            <p>
              <strong>Funcionalidades:</strong> Controle de tamanho (4-128 caracteres), seleção de tipos
              de caracteres, exclusão de similares, símbolos personalizados, análise de força em tempo
              real e cópia automática.
            </p>
            <p>
              <strong className="text-system-info">Segurança:</strong> Todas as senhas são geradas
              localmente no seu navegador usando randomização criptográfica. Nenhum dado é enviado para
              servidores externos, garantindo total privacidade.
            </p>
            <p className="mt-4 border-t border-primary-blue/20 pt-3 text-xs opacity-75">
              🔐 Geração local • 📊 Análise de força • 📋 Cópia automática • 📱 Mobile-friendly • 🌙
              Modo escuro • 🛡️ Privacidade total
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="ferramentas" currentCalculatorId="gerador-senha-segura" />
    </div>
  );
}