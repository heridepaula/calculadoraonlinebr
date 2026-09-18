import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  MoneyInput,
  Select,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

// Função auxiliar para formatação de moeda
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Constantes 2026
const CONSTANTS_2026 = {
  SALARIO_MINIMO: 1518.0,
  TETO_INSS: 8157.41,
  CARENCIA_MINIMA: 12,
  PERCENTUAL_BENEFICIO: 0.91, // 91%
};

// Lista de doenças que isentam carência
const DOENCAS_ISENCAO_CARENCIA = [
  "tuberculose ativa",
  "hanseníase",
  "transtorno mental grave",
  "neoplasia maligna",
  "cegueira",
  "paralisia irreversível e incapacitante",
  "cardiopatia grave",
  "doença de Parkinson",
  "espondiloartrose anquilosante",
  "nefropatia grave",
  "estado avançado da doença de Paget",
  "síndrome da deficiência imunológica adquirida",
  "contaminação por radiação",
  "hepatopatia grave",
];

// Interfaces para tipagem
interface SalarioContribuicao {
  mes: string;
  valor: number;
}

interface AuxilioDoencaForm {
  dataRequerimento: string;
  dataInicioIncapacidade: string;
  salariosContribuicao: SalarioContribuicao[];
  tipoSegurado: "empregado" | "contribuinte_individual" | "domestico" | "facultativo";
  cidDoenca: string;
  isAcidente: boolean;
}

interface AuxilioDoencaResult {
  valorBruto: number;
  mediaUsada: number;
  tipoMedia: "geral" | "12_meses";
  temCarencia: boolean;
  isencaoCarencia: boolean;
  motivoIsencao: string;
  observacoes: string[];
  detalhesCalculo: {
    mediaGeral: number;
    media12Meses: number;
    numeroContribuicoes: number;
    contribuicoesCarencia: number;
  };
}

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Auxílio-Doença INSS 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Calcule auxílio-doença INSS 2026: valor do benefício, verificação carência e isenções. Regras atualizadas e resultado instantâneo.",
    },
    {
      name: "keywords",
      content:
        "calculadora auxílio doença inss, benefício incapacidade, carência auxílio, isenção carência, simulador inss, benefício incapacidade temporária",
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
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
    },
    {
      property: "og:title",
      content: "Calculadora de Auxílio-Doença INSS 2026 – Cálculo Completo",
    },
    {
      property: "og:description",
      content:
        "Calcule auxílio-doença INSS 2026 facilmente: valor do benefício, verificação de carência e isenções. Regras atualizadas e resultado instantâneo.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-auxilio-doenca.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Auxílio-Doença INSS - Calcule benefício por incapacidade com verificação de carência",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Auxílio-Doença INSS 2026 – Cálculo Completo",
    },
    {
      name: "twitter:description",
      content:
        "Calcule auxílio-doença INSS: valor do benefício, carência e isenções. Resultado confiável e instantâneo.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-auxilio-doenca.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Auxílio-Doença INSS - Cálculo completo de benefício",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Auxílio-Doença" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Auxílio-Doença INSS - Simulador de Benefício 2026",
        description:
          "Simulador gratuito e confiável de auxílio-doença INSS com verificação automática de carência, isenções e cálculo do benefício por incapacidade temporária.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-08-31",
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
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
          name: "Calculadora de Auxílio-Doença INSS 2026 - Simulador de Benefício",
          description:
            "Calcule auxílio-doença INSS 2026 facilmente: valor do benefício, verificação de carência e isenções. Regras atualizadas e resultado instantâneo.",
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
                name: "Trabalhista",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Auxílio-Doença INSS",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/auxilio-doenca",
              },
            ],
          },
        },
        about: {
          "@type": "GovernmentService",
          name: "Auxílio-Doença INSS",
          description: "Benefício previdenciário por incapacidade temporária para o trabalho",
          category: "SocialSecurity",
        },
        featureList: [
          "Cálculo de auxílio-doença por incapacidade",
          "Verificação automática de carência",
          "Identificação de doenças com isenção",
          "Cálculo da média salarial",
          "Simulação de diferentes cenários",
          "Análise de elegibilidade",
          "Interface móvel responsiva",
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
            name: "Como calcular auxílio-doença INSS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular auxílio-doença INSS, considere: carência de 12 contribuições, média dos 12 últimos salários ou média geral (o que for maior), aplicar 91% sobre a média. Algumas doenças têm isenção de carência.",
            },
          },
          {
            "@type": "Question",
            name: "Quais doenças têm isenção de carência?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Doenças com isenção: tuberculose ativa, hanseníase, transtorno mental grave, neoplasia maligna, cegueira, paralisia irreversível, cardiopatia grave, Parkinson, AIDS, contaminação por radiação.",
            },
          },
          {
            "@type": "Question",
            name: "Qual o valor do auxílio-doença em 2026?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O auxílio-doença é calculado como 91% da média salarial, limitado ao teto INSS (R$ 8.157,41) e não pode ser inferior ao salário mínimo (R$ 1.518,00).",
            },
          },
        ],
      }),
    },
  ];
};

// Funções de cálculo
function verificaIsencaoCarencia(
  cidDoenca: string,
  isAcidente: boolean
): { isencao: boolean; motivo: string } {
  if (isAcidente) {
    return { isencao: true, motivo: "Acidente de trabalho ou acidente de qualquer natureza" };
  }

  const doencaLimpa = cidDoenca.toLowerCase().trim();
  const doencaEncontrada = DOENCAS_ISENCAO_CARENCIA.find(
    (doenca) =>
      doencaLimpa.includes(doenca.toLowerCase()) || doenca.toLowerCase().includes(doencaLimpa)
  );

  if (doencaEncontrada) {
    return { isencao: true, motivo: `Doença grave: ${doencaEncontrada}` };
  }

  return { isencao: false, motivo: "" };
}

function calcularAuxilioDoenca(form: AuxilioDoencaForm): AuxilioDoencaResult {
  const salariosValidos = form.salariosContribuicao.filter((s) => s.valor > 0);
  const numeroContribuicoes = salariosValidos.length;

  // Verificar carência
  const { isencao, motivo } = verificaIsencaoCarencia(form.cidDoenca, form.isAcidente);
  const temCarencia = numeroContribuicoes >= CONSTANTS_2026.CARENCIA_MINIMA || isencao;

  if (!temCarencia && !isencao) {
    return {
      valorBruto: 0,
      mediaUsada: 0,
      tipoMedia: "geral",
      temCarencia: false,
      isencaoCarencia: false,
      motivoIsencao: "",
      observacoes: [
        "Carência não atendida. É necessário ter pelo menos 12 contribuições.",
        "Requerimento será indeferido por falta de carência.",
      ],
      detalhesCalculo: {
        mediaGeral: 0,
        media12Meses: 0,
        numeroContribuicoes,
        contribuicoesCarencia: CONSTANTS_2026.CARENCIA_MINIMA,
      },
    };
  }

  // Calcular médias
  const somaGeral = salariosValidos.reduce((sum, s) => sum + s.valor, 0);
  const mediaGeral = numeroContribuicoes > 0 ? somaGeral / numeroContribuicoes : 0;

  const ultimos12 = salariosValidos.slice(-12);
  const soma12Meses = ultimos12.reduce((sum, s) => sum + s.valor, 0);
  const media12Meses = ultimos12.length > 0 ? soma12Meses / ultimos12.length : 0;

  // Escolher a menor média (mais favorável ao segurado)
  const menorMedia = Math.min(mediaGeral, media12Meses);
  const tipoMedia = mediaGeral <= media12Meses ? "geral" : "12_meses";

  // Calcular benefício (91% da menor média)
  let valorBruto = menorMedia * CONSTANTS_2026.PERCENTUAL_BENEFICIO;

  // Aplicar limites mínimo e máximo
  valorBruto = Math.max(valorBruto, CONSTANTS_2026.SALARIO_MINIMO);
  valorBruto = Math.min(valorBruto, CONSTANTS_2026.TETO_INSS);

  // Observações
  const observacoes = [
    "Benefício calculado com base na legislação INSS vigente.",
    "Valor sujeito à análise médico-pericial.",
    "Prazo para requerimento: até 30 dias após o início da incapacidade.",
    "Perícia pode ser realizada de forma digital através do Meu INSS.",
  ];

  if (isencao) {
    observacoes.unshift(`Isenção de carência aplicada: ${motivo}`);
  }

  return {
    valorBruto,
    mediaUsada: menorMedia,
    tipoMedia,
    temCarencia,
    isencaoCarencia: isencao,
    motivoIsencao: motivo,
    observacoes,
    detalhesCalculo: {
      mediaGeral,
      media12Meses,
      numeroContribuicoes,
      contribuicoesCarencia: CONSTANTS_2026.CARENCIA_MINIMA,
    },
  };
}

export default function CalculadoraAuxilioDoenca() {
  // Estados do formulário
  const [dataRequerimento, setDataRequerimento] = useState("");
  const [dataInicioIncapacidade, setDataInicioIncapacidade] = useState("");
  const [salariosContribuicao, setSalariosContribuicao] = useState<SalarioContribuicao[]>([
    { mes: new Date().toISOString().slice(0, 7), valor: 0 },
  ]);
  const [tipoSegurado, setTipoSegurado] = useState<
    "empregado" | "contribuinte_individual" | "domestico" | "facultativo"
  >("empregado");
  const [cidDoenca, setCidDoenca] = useState("");
  const [isAcidente, setIsAcidente] = useState(false);

  // Estado dos resultados
  const [result, setResult] = useState<AuxilioDoencaResult | null>(null);

  // Estados para validação em tempo real
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Estado para controlar botão flutuante
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);

  // Global Analytics Tracking
  const {
    startCalculation,
    endCalculation,
    trackFeature,
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus,
  } = useAutoCalculatorTracking({
    calculatorType: "auxilio_doenca",
    category: "trabalhista",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("auxilio_doenca");

  const handleAddSalario = () => {
    const novoMes = new Date();
    novoMes.setMonth(novoMes.getMonth() - salariosContribuicao.length);
    setSalariosContribuicao([
      ...salariosContribuicao,
      { mes: novoMes.toISOString().slice(0, 7), valor: 0 },
    ]);
  };

  const handleRemoveSalario = (index: number) => {
    if (salariosContribuicao.length > 1) {
      setSalariosContribuicao(salariosContribuicao.filter((_, i) => i !== index));
    }
  };

  const handleSalarioChange = (index: number, valor: number) => {
    const newSalarios = [...salariosContribuicao];
    newSalarios[index].valor = valor;
    setSalariosContribuicao(newSalarios);
  };

  // Função para adicionar salário com valor do último preenchido
  const handleAddSalarioComRepeticao = () => {
    const ultimoSalarioComValor = salariosContribuicao
      .slice()
      .reverse()
      .find((s) => s.valor > 0);

    const novoMes = new Date();
    novoMes.setMonth(novoMes.getMonth() - salariosContribuicao.length);

    setSalariosContribuicao([
      ...salariosContribuicao,
      {
        mes: novoMes.toISOString().slice(0, 7),
        valor: ultimoSalarioComValor?.valor || 0,
      },
    ]);
  };

  // Função para limpar todos os salários
  const handleLimparTodosSalarios = () => {
    setSalariosContribuicao([{ mes: new Date().toISOString().slice(0, 7), valor: 0 }]);
  };

  // Função para preencher automaticamente com o mesmo valor
  const handlePreencherComMesmoValor = (valor: number) => {
    const salariosAtualizados = salariosContribuicao.map((salario) => ({
      ...salario,
      valor: valor,
    }));
    setSalariosContribuicao(salariosAtualizados);
  };

  const handleCalculate = () => {
    const form: AuxilioDoencaForm = {
      dataRequerimento,
      dataInicioIncapacidade,
      salariosContribuicao,
      tipoSegurado,
      cidDoenca,
      isAcidente,
    };

    const calculation = calcularAuxilioDoenca(form);
    setResult(calculation);
  };

  // useEffect para validação em tempo real
  useEffect(() => {
    const errors = [];
    const salariosValidos = salariosContribuicao.filter((s) => s.valor > 0);

    if (salariosValidos.length === 0) {
      errors.push("Adicione pelo menos um salário de contribuição");
    }

    if (salariosValidos.length > 0 && salariosValidos.length < 12) {
      errors.push(
        `Para cálculo mais confiável, adicione mais salários (${salariosValidos.length}/12)`
      );
    }

    setValidationErrors(errors);
  }, [salariosContribuicao]);

  // useEffect para controlar botões flutuantes baseado no scroll
  useEffect(() => {
    const handleScroll = () => {
      const salariosSection = document.querySelector("[data-salarios-section]");
      if (salariosSection) {
        const rect = salariosSection.getBoundingClientRect();
        const isScrolled = rect.top < -100; // Mostra quando passou 100px do topo
        setShowFloatingButtons(isScrolled && salariosContribuicao.length >= 2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [salariosContribuicao.length]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 sm:space-y-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem isLast>Auxílio-Doença</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">🏥 Calculadora Auxílio-Doença INSS 2026</span>
          <span className="sm:hidden">🏥 Auxílio-Doença INSS</span>
        </h1>
        <p className="mx-auto max-w-3xl px-4 text-sm text-text-secondary-dark sm:text-base lg:text-lg">
          Calcule o valor do{" "}
          <strong className="text-primary-blue-dark">
            auxílio-doença por incapacidade temporária
          </strong>
          . Verifica carência, <strong className="text-growth-green">isenções automáticas</strong> e
          aplica todas as regras do INSS.
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            🏥 <strong>Regras 2026</strong> • ⚖️ <strong>Carência Automática</strong> • 💡{" "}
            <strong>Isenções</strong> • ⚡ <strong>Cálculo Instantâneo</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados para o Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="date"
                label="Data do Requerimento"
                value={dataRequerimento}
                onChange={(e) => setDataRequerimento(e.target.value)}
                required
                fullWidth
              />

              <Input
                type="date"
                label="Data de Início da Incapacidade"
                value={dataInicioIncapacidade}
                onChange={(e) => setDataInicioIncapacidade(e.target.value)}
                required
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Tipo de Segurado"
                value={tipoSegurado}
                onChange={(value) => setTipoSegurado(value as typeof tipoSegurado)}
                options={[
                  { value: "empregado", label: "Empregado CLT" },
                  { value: "contribuinte_individual", label: "Contribuinte Individual" },
                  { value: "domestico", label: "Empregado Doméstico" },
                  { value: "facultativo", label: "Segurado Facultativo" },
                ]}
                fullWidth
              />

              <div className="space-y-2">
                <Input
                  type="text"
                  label="CID da Doença/Acidente"
                  value={cidDoenca}
                  onChange={(e) => setCidDoenca(e.target.value)}
                  placeholder="Ex: M79.0 ou descrição da doença"
                  fullWidth
                />
                <Checkbox
                  checked={isAcidente}
                  onChange={(e) => setIsAcidente(e.target.checked)}
                  label="É decorrente de acidente?"
                />
              </div>
            </div>

            <div className="space-y-4" data-salarios-section>
              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Salários de Contribuição
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-secondary">
                      {salariosContribuicao.filter((s) => s.valor > 0).length} salários válidos
                    </span>
                  </div>
                </div>

                {/* Controles de ação rápida */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleAddSalario}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-blue px-3 py-2 text-sm text-white transition-all hover:scale-105 hover:bg-primary-blue-dark"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Adicionar
                    </Button>

                    <Button
                      onClick={handleAddSalarioComRepeticao}
                      disabled={salariosContribuicao.filter((s) => s.valor > 0).length === 0}
                      className="inline-flex items-center gap-2 rounded-lg bg-growth-green px-3 py-2 text-sm text-white transition-all hover:scale-105 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Repetir Último
                    </Button>
                  </div>

                  <Button
                    onClick={handleLimparTodosSalarios}
                    disabled={
                      salariosContribuicao.length <= 1 && salariosContribuicao[0]?.valor === 0
                    }
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-red-500/40 bg-red-500/15 px-3 py-2 text-sm font-medium text-red-400 transition-all hover:border-red-500/60 hover:bg-red-500/25 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Limpar Tudo
                  </Button>
                </div>
              </div>

              {/* Barra de progresso dos salários */}
              <div className="rounded-lg border border-neutral-surface-variant bg-background-secondary p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-primary-dark">
                    Progresso do preenchimento
                  </span>
                  <span className="rounded-md bg-primary-blue-light px-2 py-1 text-sm font-bold text-primary-blue">
                    {Math.round(
                      (salariosContribuicao.filter((s) => s.valor > 0).length /
                        Math.max(salariosContribuicao.length, 12)) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="h-3 w-full rounded-full border border-gray-400 bg-gray-300">
                  <div
                    className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-primary-blue to-growth-green transition-all duration-500"
                    style={{
                      width: `${Math.min((salariosContribuicao.filter((s) => s.valor > 0).length / 12) * 100, 100)}%`,
                    }}
                  >
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-text-secondary-dark">
                  {salariosContribuicao.filter((s) => s.valor > 0).length} de 12 salários
                  recomendados
                </p>
              </div>

              {/* Ações rápidas de preenchimento */}
              {salariosContribuicao.length > 1 && (
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-800">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Preenchimento Rápido
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handlePreencherComMesmoValor(1518)}
                      className="rounded-md border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs text-blue-400 transition-all hover:bg-blue-500/25"
                    >
                      Salário Mínimo (R$ 1.518)
                    </Button>
                    <Button
                      onClick={() => handlePreencherComMesmoValor(3000)}
                      className="rounded-md border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs text-blue-400 transition-all hover:bg-blue-500/25"
                    >
                      R$ 3.000
                    </Button>
                    <Button
                      onClick={() => handlePreencherComMesmoValor(5000)}
                      className="rounded-md border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs text-blue-400 transition-all hover:bg-blue-500/25"
                    >
                      R$ 5.000
                    </Button>
                    <Button
                      onClick={() => handlePreencherComMesmoValor(8157.41)}
                      className="rounded-md border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs text-blue-400 transition-all hover:bg-blue-500/25"
                    >
                      Teto INSS (R$ 8.157)
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-blue-600">
                    💡 Clique para preencher todos os salários com o mesmo valor
                  </p>
                </div>
              )}

              {/* Lista de salários com layout melhorado */}
              <div className="space-y-3">
                {salariosContribuicao.map((salario, index) => (
                  <div
                    key={index}
                    className={`group relative rounded-xl border-2 p-4 shadow-sm transition-all duration-200 ${
                      salario.valor > 0
                        ? "border-growth-green bg-growth-green-soft shadow-growth-green/10 hover:border-growth-green hover:bg-growth-green-soft/80"
                        : "border-neutral-surface-variant bg-background-secondary shadow-gray-200/50 hover:border-neutral-surface-variant/80 hover:bg-neutral-surface-variant"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="relative">
                        <Input
                          type="month"
                          label={`Mês ${index + 1}`}
                          value={salario.mes}
                          onChange={(e) => {
                            const newSalarios = [...salariosContribuicao];
                            newSalarios[index].mes = e.target.value;
                            setSalariosContribuicao(newSalarios);
                          }}
                          fullWidth
                          className="transition-all focus:ring-2 focus:ring-primary-blue/20"
                        />
                      </div>

                      <div className="relative">
                        <MoneyInput
                          label="Salário de Contribuição"
                          value={salario.valor}
                          onChange={(value) => handleSalarioChange(index, value)}
                          placeholder="Ex: R$ 3.000,00"
                          fullWidth
                          className="transition-all focus:ring-2 focus:ring-primary-blue/20"
                        />
                        {salario.valor > 0 && (
                          <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-growth-green" />
                        )}
                      </div>

                      <div className="flex items-end sm:col-span-2 lg:col-span-1">
                        {salariosContribuicao.length > 1 && (
                          <Button
                            onClick={() => handleRemoveSalario(index)}
                            className="w-full rounded-lg border-2 border-red-500/40 bg-red-500/15 px-3 py-2 text-sm font-medium text-red-400 transition-all hover:border-red-500/60 hover:bg-red-500/25 hover:text-red-300 group-hover:border-red-500 sm:w-auto"
                          >
                            <svg
                              className="h-4 w-4 sm:mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span className="hidden sm:inline">Remover</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Indicador de status visual */}
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      {salario.valor > 0 ? (
                        <span className="inline-flex items-center gap-2 rounded-md bg-green-100 px-2 py-1 font-medium text-green-700">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Salário válido
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-md bg-background-secondary px-2 py-1 font-medium text-text-secondary-dark">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Aguardando preenchimento
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Painel de informações e dicas aprimorado */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-primary-blue/20 bg-primary-blue-light p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary-blue p-2">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-blue-dark">
                        Como funciona o cálculo
                      </h4>
                      <p className="mt-1 text-sm text-text-secondary">
                        O sistema calcula automaticamente a média mais favorável entre todos os
                        salários ou apenas os últimos 12 meses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-growth-green/20 bg-growth-green-soft p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-growth-green p-2">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-growth-green">Dica importante</h4>
                      <p className="mt-1 text-sm text-text-secondary">
                        Quanto mais salários você adicionar, mais confiável será o cálculo do seu
                        benefício.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de cálculo aprimorado */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleCalculate}
          disabled={salariosContribuicao.filter((s) => s.valor > 0).length === 0}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-blue to-primary-blue-dark px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="relative z-10 flex items-center gap-3">
            <svg
              className="h-6 w-6 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Calcular Auxílio-Doença
          </div>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </Button>
      </div>

      {result && (
        <>
          <Card
            className={`result-success border-2 ${result.temCarencia ? "border-growth-green bg-growth-green-soft" : "border-system-error bg-system-error/10"}`}
          >
            <CardHeader>
              <CardTitle as="h3">Resultado do Auxílio-Doença</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <div className="text-4xl font-bold tabular-nums text-text-primary-dark">
                  {formatCurrency(result.valorBruto)}
                </div>
                <div
                  className={`text-xl font-semibold ${result.temCarencia ? "text-growth-green" : "text-system-error"}`}
                >
                  {result.temCarencia ? "Auxílio-Doença Deferido" : "Auxílio-Doença Indeferido"}
                </div>
                {result.isencaoCarencia && (
                  <p className="text-growth-green">
                    ✓ Isenção de carência aplicada: {result.motivoIsencao}
                  </p>
                )}
                {!result.temCarencia && (
                  <p className="text-system-error">
                    ✗ Carência insuficiente: {result.detalhesCalculo.numeroContribuicoes}/
                    {result.detalhesCalculo.contribuicoesCarencia} contribuições
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {result.temCarencia && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
                  <CardHeader>
                    <CardTitle as="h3" className="text-primary-blue-dark">
                      📊 Média Utilizada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="text-3xl font-bold text-primary-blue-dark">
                        {formatCurrency(result.mediaUsada)}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {result.tipoMedia === "geral" ? "Média Geral" : "Média 12 Meses"}
                        <br />
                        <span className="text-xs">(Menor média = mais favorável)</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-growth-green bg-growth-green-soft">
                  <CardHeader>
                    <CardTitle as="h3" className="text-growth-green">
                      ⚖️ Percentual Aplicado
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="text-3xl font-bold text-growth-green">91%</div>
                      <p className="text-sm text-text-secondary">
                        Do salário de benefício
                        <br />
                        <span className="text-xs">(Regra legal do auxílio-doença)</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-system-info bg-system-info/10">
                  <CardHeader>
                    <CardTitle as="h3" className="text-system-info">
                      📋 Contribuições
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="text-3xl font-bold text-system-info">
                        {result.detalhesCalculo.numeroContribuicoes}
                      </div>
                      <p className="text-sm text-text-secondary">
                        Salários computados
                        <br />
                        <span className="text-xs">
                          (Mínimo: {result.detalhesCalculo.contribuicoesCarencia})
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle as="h3" className="text-primary-blue">
                    📊 Detalhamento do Cálculo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary-blue/30 bg-primary-blue-light">
                          <th className="p-3 text-left font-semibold text-primary-blue-dark">
                            Tipo de Média
                          </th>
                          <th className="p-3 text-center font-semibold text-primary-blue-dark">
                            Valor
                          </th>
                          <th className="p-3 text-center font-semibold text-primary-blue-dark">
                            Utilizada
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-neutral-surface-variant">
                          <td className="p-3">
                            <div>
                              <div className="font-semibold">Média Geral</div>
                              <div className="text-xs text-gray-600">
                                Todos os salários ÷ {result.detalhesCalculo.numeroContribuicoes}{" "}
                                meses
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center font-bold tabular-nums">
                            {formatCurrency(result.detalhesCalculo.mediaGeral)}
                          </td>
                          <td className="p-3 text-center">
                            {result.tipoMedia === "geral" ? "✅" : "❌"}
                          </td>
                        </tr>
                        <tr className="border-b border-neutral-surface-variant">
                          <td className="p-3">
                            <div>
                              <div className="font-semibold">Média 12 Meses</div>
                              <div className="text-xs text-gray-600">
                                Últimos 12 salários ÷ 12 meses
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center font-bold tabular-nums">
                            {formatCurrency(result.detalhesCalculo.media12Meses)}
                          </td>
                          <td className="p-3 text-center">
                            {result.tipoMedia === "12_meses" ? "✅" : "❌"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="from-system-info-light bg-gradient-to-r to-primary-blue-light">
            <CardHeader>
              <CardTitle as="h3" className="text-system-info-dark">
                📋 Observações e Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.observacoes.map((observacao, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg bg-background-secondary p-3">
                    <span className="mt-1 text-xl text-system-info">
                      {index === 0 ? "⚖️" : index === 1 ? "🏥" : index === 2 ? "⏰" : "💻"}
                    </span>
                    <p className="text-sm">{observacao}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Seção: Guia do Auxílio-Doença - SEO Principal */}
      <Card className="mt-6 border-l-4 border-primary-blue bg-gradient-to-r from-primary-blue-light to-growth-green-soft duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📚 Guia Completo: Auxílio-Doença INSS 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                O <strong className="text-growth-green">auxílio-doença</strong> é um benefício
                previdenciário destinado a segurados que ficam{" "}
                <strong className="text-primary-blue-dark">temporariamente incapacitados</strong>{" "}
                para o trabalho devido a doença ou acidente.
              </p>
            </div>

            {/* Requisitos */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary-blue">
                📋 Requisitos para o Auxílio-Doença
              </h3>

              <div className="mb-4 rounded-lg border border-primary-blue/30 bg-primary-blue-light p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      ✅ Requisitos Obrigatórios:
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Qualidade de segurado do INSS</li>
                      <li>• Carência de 12 contribuições mensais</li>
                      <li>• Incapacidade temporária para o trabalho</li>
                      <li>• Atestado médico comprobatório</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      🏥 Isenções de Carência:
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Acidentes de qualquer natureza</li>
                      <li>• Doenças graves (câncer, tuberculose, etc.)</li>
                      <li>• Doenças profissionais</li>
                      <li>• Transtornos mentais graves</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cálculo do Benefício */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-primary-blue-light p-6">
                <h4 className="mb-3 text-lg font-bold text-primary-blue-dark">
                  💰 Como é Calculado
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p>
                      <strong className="text-growth-green">1. Salário de Benefício:</strong>
                    </p>
                    <p className="ml-4">
                      • Menor valor entre média geral e média dos últimos 12 salários
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong className="text-system-info">2. Renda Mensal:</strong>
                    </p>
                    <p className="ml-4">• 91% do salário de benefício</p>
                  </div>

                  <div>
                    <p>
                      <strong className="text-system-warning">3. Limites:</strong>
                    </p>
                    <p className="ml-4">• Mínimo: R$ 1.518,00 (salário mínimo)</p>
                    <p className="ml-4">• Máximo: R$ 8.157,41 (teto INSS)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-growth-green-soft p-6">
                <h4 className="mb-3 text-lg font-bold text-growth-green">📅 Prazos Importantes</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p>
                      <strong className="text-primary-blue-dark">Requerimento:</strong>
                    </p>
                    <p className="ml-4">• Até 30 dias após início da incapacidade</p>
                    <p className="ml-4">• Após 30 dias: DII (Data de Início do Impedimento)</p>
                  </div>

                  <div>
                    <p>
                      <strong className="text-system-success">Perícia Médica:</strong>
                    </p>
                    <p className="ml-4">• Agendamento automático pelo INSS</p>
                    <p className="ml-4">• Perícia digital disponível para alguns casos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doenças que Isentam Carência */}
            <div className="rounded-lg border border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
              <h4 className="mb-3 font-semibold text-orange-700">
                🏥 Doenças que Isentam Carência
              </h4>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div>
                  <h5 className="mb-2 font-semibold text-orange-600">🩺 Doenças Graves:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Neoplasia maligna (câncer)</li>
                    <li>• Tuberculose ativa</li>
                    <li>• Hanseníase</li>
                    <li>• Cardiopatia grave</li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-orange-600">🧠 Transtornos:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Transtornos mentais graves</li>
                    <li>• Doença de Parkinson</li>
                    <li>• Paralisia irreversível</li>
                    <li>• Cegueira</li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-orange-600">🦴 Outras Condições:</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Nefropatia grave</li>
                    <li>• Hepatopatia grave</li>
                    <li>• AIDS</li>
                    <li>• Espondiloartrose anquilosante</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card className="mt-6 border-l-4 border-system-warning bg-system-warning/10">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-system-warning">
            ⚖️ Informações Importantes sobre a Calculadora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-5 shadow-md">
              <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-amber-800">
                <span className="text-xl">⚠️</span>
                Importante - Estimativas
              </h4>
              <div className="space-y-2 text-sm text-amber-900">
                <p className="flex items-start gap-2">
                  <span className="min-w-fit font-bold text-amber-800">• Simulação:</span>
                  <span>Esta calculadora fornece estimativas baseadas nas regras atuais</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="min-w-fit font-bold text-amber-800">• Perícia:</span>
                  <span>Benefício condicionado à aprovação em perícia médica</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="min-w-fit font-bold text-amber-800">• Dados 2026:</span>
                  <span>Salário mínimo R$ 1.518,00, Teto R$ 8.157,41</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="min-w-fit font-bold text-amber-800">• Consultoria:</span>
                  <span>Para casos complexos, consulte um advogado previdenciário</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora de Auxílio-Doença"
        items={[
          {
            question: "Quanto tempo demora para receber o auxílio-doença do INSS?",
            answer:
              "O INSS tem prazo de até <strong>45 dias</strong> para analisar e agendar a perícia médica. Após perícia favorável, o pagamento começa no mês seguinte. Em casos de urgência ou <strong>perícia digital</strong>, o processo pode ser mais rápido!",
            borderColor: "primary-blue",
          },
          {
            question: "Posso trabalhar enquanto recebo auxílio-doença?",
            answer:
              "<strong>NÃO!</strong> O auxílio-doença é incompatível com atividade laboral. Se o INSS descobrir que você está trabalhando, o benefício será <strong>cancelado imediatamente</strong> e poderá haver cobrança de devolução, além de sanções legais!",
            borderColor: "system-success",
          },
          {
            question: "O que fazer se a perícia médica for negativa?",
            answer:
              "Você pode <strong>recorrer da decisão em até 30 dias</strong> através de recurso administrativo. Apresente novos laudos médicos, exames atualizados e relatório médico detalhado. Se mantida a negativa, <strong>cabe recurso na Justiça Federal</strong>!",
            borderColor: "growth-green",
          },
          {
            question: "Auxílio-doença conta tempo para aposentadoria?",
            answer:
              "<strong>Sim, conta integralmente!</strong> O período em auxílio-doença é computado como tempo de contribuição para aposentadoria. Você é considerado em <strong>licença remunerada</strong>, mantendo todos os direitos previdenciários!",
            borderColor: "system-info",
          },
          {
            question: "Qual a diferença entre auxílio-doença e aposentadoria por invalidez?",
            answer:
              "<strong>Auxílio-doença:</strong> incapacidade temporária com expectativa de retorno ao trabalho. <strong>Aposentadoria por invalidez:</strong> incapacidade permanente sem possibilidade de reabilitação. A <strong>perícia médica</strong> define qual benefício é adequado!",
            borderColor: "primary-blue",
          },
          {
            question: "Como funciona a reabilitação profissional no INSS?",
            answer:
              "O INSS pode <strong>encaminhar para reabilitação profissional</strong> se você não puder retornar à atividade anterior, mas tem condições para outra função. Durante a reabilitação, o <strong>auxílio-doença é mantido</strong>!",
            borderColor: "system-success",
          },
          {
            question: "Quais documentos são necessários para solicitar auxílio-doença?",
            answer:
              "<strong>Obrigatórios:</strong> documento de identidade, CPF, cartões de contribuição. <strong>Complementares:</strong> laudos médicos, exames, atestados, relatórios de internação. Quanto mais documentação médica, <strong>melhor para sua solicitação</strong>!",
            borderColor: "growth-green",
          },
          {
            question: "A calculadora é confiável para estimar meu benefício?",
            answer:
              "<strong>Sim, muito confiável!</strong> Usamos as regras oficiais do INSS e fórmulas atualizadas. Porém, o valor é uma <strong>estimativa</strong> - o INSS fará o cálculo oficial considerando todos os detalhes do seu histórico contributivo!",
            borderColor: "system-warning",
          },
        ]}
        tipSection={{
          title: "Dica de Especialista",
          content:
            "Para aumentar as chances de aprovação, <strong>organize toda documentação médica</strong> antes da perícia: laudos, exames, receitas, relatórios. Quanto mais completo o histórico, melhor!",
        }}
        footerText="<strong>Necessita calcular outros benefícios?</strong> Explore nossas calculadoras trabalhistas e garanta seus direitos previdenciários com segurança!"
      />

      <RelatedCalculators category="trabalhista" currentCalculatorId="auxilio-doenca" />

      {/* Botões flutuantes para adicionar salários */}
      {showFloatingButtons && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          <Button
            onClick={handleAddSalario}
            className="group relative overflow-hidden rounded-full bg-primary-blue p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary-blue-dark hover:shadow-xl"
            title="Adicionar novo salário"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Button>

          {salariosContribuicao.filter((s) => s.valor > 0).length > 0 && (
            <Button
              onClick={handleAddSalarioComRepeticao}
              className="group relative overflow-hidden rounded-full bg-growth-green p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl"
              title="Repetir último valor"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          )}

          {/* Tooltip flutuante */}
          <div className="absolute -left-32 top-2 hidden group-hover:block">
            <div className="rounded-lg bg-gray-800 px-3 py-2 text-xs text-white shadow-lg">
              Ações rápidas de salário
              <div className="absolute right-0 top-3 h-0 w-0 border-b-4 border-l-4 border-t-4 border-b-transparent border-l-gray-800 border-t-transparent"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
