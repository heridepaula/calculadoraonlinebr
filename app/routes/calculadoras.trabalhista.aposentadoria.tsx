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
} from "~/components/ui";
import { RelatedCalculators } from "~/components/RelatedCalculators";
import { FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

// Função auxiliar para formatação de moeda
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Função auxiliar para formatação de data
function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}

// Constantes 2026
const CONSTANTS_2026 = {
  SALARIO_MINIMO: 1518.0,
  TETO_INSS: 8157.41,
  EXPECTATIVA_VIDA: 76.4,
  FATOR_ATUARIAL: 0.31,
};

// Interfaces para tipagem
interface RetirementModality {
  id: string;
  name: string;
  description: string;
  isEligible: boolean;
  timeRemaining: {
    years: number;
    months: number;
    days: number;
  };
  minimumAge?: number;
  minimumContribution?: number;
  requiredPoints?: number;
  estimatedBenefit: number;
  retirementDate: Date;
  rules: string[];
  advantages: string[];
  disadvantages: string[];
}

interface RetirementCalculation {
  dataNascimento: string;
  sexo: "masculino" | "feminino";
  tempoContribuicao: number; // em meses
  mediaSalarial: number;
  salarioAtual: number;
  dataPretendida?: string;
  contribuicaoFutura?: number;
}

interface RetirementResult {
  modalidades: RetirementModality[];
  melhorOpcao: RetirementModality;
  recomendacoes: string[];
  simulacoes: {
    crescimentoSalarial: Array<{
      year: number;
      salary: number;
      benefit: number;
    }>;
  };
}

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Aposentadoria INSS 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Simule aposentadoria INSS 2026: idade, pontos, pedágio 50% e 100%. Compare modalidades e descubra a melhor opção de aposentadoria.",
    },
    {
      name: "keywords",
      content:
        "calculadora aposentadoria inss, simulador inss, pedágio 50 100, regra transição, pontos aposentadoria",
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
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
    },
    {
      property: "og:title",
      content: "Calculadora de Aposentadoria INSS 2026 – Todas as Modalidades",
    },
    {
      property: "og:description",
      content:
        "Simule aposentadoria INSS 2026: idade, pontos, pedágio 50% e 100%, regras de transição. Compare modalidades e descubra a melhor opção.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-aposentadoria.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Aposentadoria INSS - Simule todas as modalidades: idade, pontos, pedágio 50% e 100%",
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
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Aposentadoria INSS 2026 – Todas as Modalidades",
    },
    {
      name: "twitter:description",
      content:
        "Simule aposentadoria INSS: idade, pontos, pedágio 50% e 100%. Compare modalidades e descubra a melhor opção.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-aposentadoria.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Aposentadoria INSS - Simule modalidades e compare opções",
    },
    { name: "twitter:site", content: "@CalculadoraOnlineBR" },
    { name: "twitter:creator", content: "@CalculadoraOnlineBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "apple-mobile-web-app-title", content: "Aposentadoria INSS" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Aposentadoria INSS - Simulador de Modalidades 2026",
        description:
          "Simulador gratuito e confiável de aposentadoria INSS com todas as modalidades: idade, pontos, pedágio 50% e 100%, regras de transição. Compare opções e descubra a melhor para você.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
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
            "https://twitter.com/CalculadoraOnlineBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
          name: "Calculadora de Aposentadoria INSS 2026 - Simulador de Modalidades",
          description:
            "Simule aposentadoria INSS 2026: idade, pontos, pedágio 50% e 100%, regras de transição. Compare modalidades e descubra a melhor opção.",
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
                name: "Trabalhista",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Aposentadoria INSS",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/trabalhista/aposentadoria",
              },
            ],
          },
        },
        about: {
          "@type": "GovernmentService",
          name: "Aposentadoria INSS",
          description: "Benefício previdenciário pago pelo Instituto Nacional do Seguro Social",
          category: "SocialSecurity",
        },
        featureList: [
          "Simulação de aposentadoria por idade",
          "Simulação de aposentadoria por pontos",
          "Cálculo de pedágio 50%",
          "Cálculo de pedágio 100%",
          "Regras de transição da reforma",
          "Comparação de modalidades",
          "Cálculo de tempo restante",
          "Estimativa de valor do benefício",
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
            name: "Como calcular aposentadoria pelo INSS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para calcular a aposentadoria INSS, considere: tempo de contribuição, idade, média salarial e modalidade (idade, pontos, pedágio 50% ou 100%). Use nossa calculadora para simular todas as opções disponíveis.",
            },
          },
          {
            "@type": "Question",
            name: "Qual a melhor modalidade de aposentadoria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A melhor modalidade depende da sua situação: aposentadoria por idade (65H/62M), por pontos (96H/86M), pedágio 50% ou 100%. Nossa calculadora compara todas e mostra a mais vantajosa.",
            },
          },
          {
            "@type": "Question",
            name: "Como funciona o pedágio da aposentadoria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pedágio 50%: pague metade do tempo que faltava em 2019. Pedágio 100%: pague o dobro do tempo restante, mas sem idade mínima. Nossa calculadora simula ambas as opções.",
            },
          },
        ],
      }),
    },
  ];
};

// Funções de cálculo

function calculateAge(birthDate: string): { years: number; months: number; days: number } {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function calculateTimeRemaining(
  currentAge: number,
  requiredAge: number,
  currentContribution: number,
  requiredContribution?: number
): { years: number; months: number; days: number } {
  const ageGap = Math.max(0, requiredAge - currentAge);
  const contributionGap = requiredContribution
    ? Math.max(0, requiredContribution - currentContribution)
    : 0;

  const totalMonthsRemaining = Math.max(ageGap * 12, contributionGap);

  const years = Math.floor(totalMonthsRemaining / 12);
  const months = Math.floor(totalMonthsRemaining % 12);
  const days = Math.floor((totalMonthsRemaining % 1) * 30);

  return { years, months, days };
}

function calculateBenefit(
  averageSalary: number,
  contributionTimeMonths: number,
  gender: "masculino" | "feminino",
  modality: string,
  birthDate: string,
  beforeReform: boolean = false
): number {
  const limitedSalary = Math.min(averageSalary, CONSTANTS_2026.TETO_INSS);
  const contributionYears = contributionTimeMonths / 12;

  if (beforeReform && modality === "pedagio-50") {
    // Regra antes da reforma: 70% + 1% por ano
    const percentage = Math.min(1.0, 0.7 + Math.max(0, contributionYears - 25) * 0.01);
    return Math.max(limitedSalary * percentage, CONSTANTS_2026.SALARIO_MINIMO);
  }

  // Regra pós reforma: 60% + 2% por ano acima do mínimo
  const minimumYears = gender === "feminino" ? 15 : 20;
  let percentage = 0.6;

  if (contributionYears > minimumYears) {
    percentage += (contributionYears - minimumYears) * 0.02;
  }

  percentage = Math.min(percentage, 1.0);

  // Aplicar fator previdenciário se for regra de transição por idade progressiva
  if (modality === "idade-progressiva") {
    const age = calculateAge(birthDate).years;
    const expectancy = CONSTANTS_2026.EXPECTATIVA_VIDA;
    const factor =
      (contributionYears * CONSTANTS_2026.FATOR_ATUARIAL * (1 + age + contributionYears)) /
      (expectancy * 100);
    const appliedFactor = Math.min(factor, 1.0);
    percentage *= appliedFactor;
  }

  return Math.max(limitedSalary * percentage, CONSTANTS_2026.SALARIO_MINIMO);
}

function calculateRetirementModalites(params: RetirementCalculation): RetirementResult {
  const currentAge = calculateAge(params.dataNascimento).years;
  const contributionYears = params.tempoContribuicao / 12;
  const currentPoints = currentAge + contributionYears;

  const modalidades: RetirementModality[] = [];

  // 1. Aposentadoria por idade
  const idadeMinima = params.sexo === "masculino" ? 65 : 62;
  const tempoMinimoIdade = params.sexo === "masculino" ? 20 * 12 : 15 * 12;

  const idadeMod: RetirementModality = {
    id: "por-idade",
    name: "Aposentadoria por Idade",
    description: `Idade mínima: ${idadeMinima} anos`,
    isEligible: currentAge >= idadeMinima && params.tempoContribuicao >= tempoMinimoIdade,
    timeRemaining: calculateTimeRemaining(
      currentAge,
      idadeMinima,
      params.tempoContribuicao,
      tempoMinimoIdade
    ),
    minimumAge: idadeMinima,
    minimumContribution: tempoMinimoIdade,
    estimatedBenefit: calculateBenefit(
      params.mediaSalarial,
      Math.max(params.tempoContribuicao, tempoMinimoIdade),
      params.sexo,
      "por-idade",
      params.dataNascimento
    ),
    retirementDate: new Date(
      Date.now() +
        calculateTimeRemaining(currentAge, idadeMinima, params.tempoContribuicao, tempoMinimoIdade)
          .years *
          365.25 *
          24 *
          60 *
          60 *
          1000
    ),
    rules: [
      `${idadeMinima} anos de idade mínima`,
      `${tempoMinimoIdade / 12} anos de tempo de contribuição`,
      "Regra definitiva pós-reforma",
    ],
    advantages: [
      "Regra mais simples e clara",
      "Não há fator previdenciário",
      "Benefício integral se tiver 40 anos de contribuição",
    ],
    disadvantages: ["Idade mínima alta", "Benefício reduzido com menos tempo de contribuição"],
  };
  modalidades.push(idadeMod);

  // 2. Regra de transição por pontos
  const pontosNecessarios2026 = params.sexo === "masculino" ? 102 : 92;
  const pontosMod: RetirementModality = {
    id: "por-pontos",
    name: "Regra de Transição por Pontos",
    description: `${pontosNecessarios2026} pontos necessários (idade + tempo de contribuição)`,
    isEligible:
      currentPoints >= pontosNecessarios2026 && params.tempoContribuicao >= tempoMinimoIdade,
    timeRemaining: {
      years: Math.max(0, Math.floor((pontosNecessarios2026 - currentPoints) / 1)),
      months: 0,
      days: 0,
    },
    requiredPoints: pontosNecessarios2026,
    minimumContribution: tempoMinimoIdade,
    estimatedBenefit: calculateBenefit(
      params.mediaSalarial,
      params.tempoContribuicao,
      params.sexo,
      "por-pontos",
      params.dataNascimento
    ),
    retirementDate: new Date(
      Date.now() + Math.max(0, pontosNecessarios2026 - currentPoints) * 365.25 * 24 * 60 * 60 * 1000
    ),
    rules: [
      `${pontosNecessarios2026} pontos em 2026`,
      "Soma idade + tempo de contribuição",
      "Aumenta 1 ponto por ano até 2033 (H) / 2031 (M)",
    ],
    advantages: [
      "Sem idade mínima",
      "Benefício integral",
      "Flexibilidade na combinação idade/tempo",
    ],
    disadvantages: ["Pontuação alta", "Aumenta todo ano", "Exige muito tempo de contribuição"],
  };
  modalidades.push(pontosMod);

  // 3. Regra idade progressiva (com fator previdenciário)
  const idadeProgressiva2026 = params.sexo === "masculino" ? 64 : 59;
  const progressivaMod: RetirementModality = {
    id: "idade-progressiva",
    name: "Regra Idade Progressiva",
    description: `${idadeProgressiva2026} anos + fator previdenciário`,
    isEligible: currentAge >= idadeProgressiva2026 && params.tempoContribuicao >= tempoMinimoIdade,
    timeRemaining: calculateTimeRemaining(
      currentAge,
      idadeProgressiva2026,
      params.tempoContribuicao,
      tempoMinimoIdade
    ),
    minimumAge: idadeProgressiva2026,
    minimumContribution: tempoMinimoIdade,
    estimatedBenefit: calculateBenefit(
      params.mediaSalarial,
      params.tempoContribuicao,
      params.sexo,
      "idade-progressiva",
      params.dataNascimento
    ),
    retirementDate: new Date(
      Date.now() +
        calculateTimeRemaining(
          currentAge,
          idadeProgressiva2026,
          params.tempoContribuicao,
          tempoMinimoIdade
        ).years *
          365.25 *
          24 *
          60 *
          60 *
          1000
    ),
    rules: [
      `${idadeProgressiva2026} anos em 2026`,
      "Aumenta 6 meses por ano",
      "Aplica fator previdenciário",
    ],
    advantages: [
      "Idade mais baixa que por idade",
      "Para quem começou a contribuir antes da reforma",
    ],
    disadvantages: [
      "Fator previdenciário reduz benefício",
      "Idade aumenta todo ano",
      "Benefício menor",
    ],
  };
  modalidades.push(progressivaMod);

  // 4. Pedágio 50%
  const tempoMinimoHomem = 35 * 12; // 35 anos em meses
  const tempoMinimoMulher = 30 * 12; // 30 anos em meses
  const tempoMinimoRequerido = params.sexo === "masculino" ? tempoMinimoHomem : tempoMinimoMulher;

  // Calcular o tempo que faltava em 13/11/2019 para completar o tempo mínimo
  const dataReforma = new Date("2019-11-13");
  const idadeNaReforma =
    new Date(dataReforma.getTime() - new Date(params.dataNascimento).getTime()).getFullYear() -
    1970;
  const anosContribuicaoNaReforma = Math.max(0, idadeNaReforma - 16); // Assumindo início das contribuições aos 16 anos
  const tempoContribuicaoNaReforma = Math.min(
    anosContribuicaoNaReforma * 12,
    params.tempoContribuicao
  );
  const tempoFaltavaNaReforma = Math.max(0, tempoMinimoRequerido - tempoContribuicaoNaReforma);
  const pedagogio50Necessario = tempoFaltavaNaReforma * 0.5; // 50% do tempo que faltava
  const tempoTotalPedagio50 = tempoMinimoRequerido + pedagogio50Necessario;

  const pedagio50Mod: RetirementModality = {
    id: "pedagio-50",
    name: "Pedágio 50%",
    description: `${tempoMinimoRequerido / 12} anos + 50% do tempo que faltava em nov/2019`,
    isEligible: params.tempoContribuicao >= tempoTotalPedagio50 && tempoFaltavaNaReforma > 0,
    timeRemaining: calculateTimeRemaining(0, 0, params.tempoContribuicao, tempoTotalPedagio50),
    estimatedBenefit: calculateBenefit(
      params.mediaSalarial,
      Math.max(params.tempoContribuicao, tempoTotalPedagio50),
      params.sexo,
      "pedagio-50",
      params.dataNascimento,
      true
    ),
    retirementDate: new Date(
      Date.now() +
        Math.max(0, tempoTotalPedagio50 - params.tempoContribuicao) * 30.44 * 24 * 60 * 60 * 1000
    ),
    rules: [
      "Sem idade mínima",
      `${tempoMinimoRequerido / 12} anos de contribuição mínima`,
      `+ 50% do tempo que faltava em 13/11/2019`,
      "Fórmula anterior: 70% + 1% por ano acima do mínimo",
    ],
    advantages: [
      "Sem idade mínima",
      "Benefício calculado pela regra anterior (mais vantajosa)",
      "Para quem estava próximo da aposentadoria em 2019",
    ],
    disadvantages: [
      "Só para quem tinha tempo a cumprir em nov/2019",
      "Tempo adicional de 50% do que faltava",
      "Regra em extinção",
    ],
  };
  modalidades.push(pedagio50Mod);

  // 5. Pedágio 100%
  const idadePedagio100 = params.sexo === "masculino" ? 60 : 57;
  const pedagio100Mod: RetirementModality = {
    id: "pedagio-100",
    name: "Pedágio 100%",
    description: `${idadePedagio100} anos + 100% do tempo que faltava`,
    isEligible: currentAge >= idadePedagio100 && params.tempoContribuicao >= tempoMinimoIdade,
    timeRemaining: calculateTimeRemaining(
      currentAge,
      idadePedagio100,
      params.tempoContribuicao,
      tempoMinimoIdade
    ),
    minimumAge: idadePedagio100,
    minimumContribution: tempoMinimoIdade,
    estimatedBenefit: calculateBenefit(
      params.mediaSalarial,
      params.tempoContribuicao,
      params.sexo,
      "pedagio-100",
      params.dataNascimento
    ),
    retirementDate: new Date(
      Date.now() +
        calculateTimeRemaining(
          currentAge,
          idadePedagio100,
          params.tempoContribuicao,
          tempoMinimoIdade
        ).years *
          365.25 *
          24 *
          60 *
          60 *
          1000
    ),
    rules: [
      `${idadePedagio100} anos de idade mínima`,
      "Dobrar o tempo que faltava em 2019",
      "Benefício integral",
    ],
    advantages: [
      "Benefício integral",
      "Sem fator previdenciário",
      "Idade menor que aposentadoria por idade",
    ],
    disadvantages: ["Muito tempo adicional", "Só compensa se faltava pouco em 2019"],
  };
  modalidades.push(pedagio100Mod);

  // Determinar melhor opção
  const eligibleModalities = modalidades.filter((m) => m.isEligible);
  const melhorOpcao =
    eligibleModalities.length > 0
      ? eligibleModalities.reduce((best, current) =>
          current.estimatedBenefit > best.estimatedBenefit ? current : best
        )
      : modalidades.reduce((best, current) => {
          const bestTime = best.timeRemaining.years * 12 + best.timeRemaining.months;
          const currentTime = current.timeRemaining.years * 12 + current.timeRemaining.months;
          return currentTime < bestTime ? current : best;
        });

  // Recomendações
  const recomendacoes = [
    eligibleModalities.length > 0
      ? `Você já pode se aposentar pela modalidade: ${melhorOpcao.name}`
      : `Sua melhor opção futura é: ${melhorOpcao.name}`,
    `Tempo estimado até aposentadoria: ${melhorOpcao.timeRemaining.years} anos e ${melhorOpcao.timeRemaining.months} meses`,
    `Benefício estimado: ${formatCurrency(melhorOpcao.estimatedBenefit)}`,
    "Considere fazer um planejamento previdenciário completo",
    "Mantenha seus documentos sempre atualizados no Meu INSS",
  ];

  return {
    modalidades,
    melhorOpcao,
    recomendacoes,
    simulacoes: {
      crescimentoSalarial: [],
    },
  };
}

export default function CalculadoraAposentadoriaINSS() {
  // Estados do formulário
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState<"masculino" | "feminino">("masculino");
  const [tempoContribuicao, setTempoContribuicao] = useState<number>(0);
  const [mediaSalarial, setMediaSalarial] = useState<number>(0);
  const [salarioAtual, setSalarioAtual] = useState<number>(0);
  const [dataPretendida, setDataPretendida] = useState("");
  const [contribuicaoFutura, setContribuicaoFutura] = useState<number>(0);

  // Estado dos resultados
  const [result, setResult] = useState<RetirementResult | null>(null);
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const showSaveToast = (msg: string) => { setSaveToast(msg); setTimeout(() => setSaveToast(null), 2000); };

  // Global Analytics Tracking
  const {
    startCalculation,
    endCalculation,
    trackFeature,
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus,
  } = useAutoCalculatorTracking({
    calculatorType: "aposentadoria",
    category: "trabalhista",
  });

  const { trackInputChange, trackFormSubmission } = useFormTracking("aposentadoria");

  const handleCalculate = () => {
    if (!dataNascimento || !mediaSalarial || !salarioAtual || tempoContribuicao <= 0) {
      return;
    }

    const tempoEmMeses = tempoContribuicao * 12;

    const params: RetirementCalculation = {
      dataNascimento,
      sexo,
      tempoContribuicao: tempoEmMeses,
      mediaSalarial,
      salarioAtual,
      dataPretendida: dataPretendida || undefined,
      contribuicaoFutura: contribuicaoFutura || undefined,
    };

    const calculation = calculateRetirementModalites(params);
    setResult(calculation);
    setSelectedModality(calculation.melhorOpcao.id);
  };

  const handleReset = () => {
    setDataNascimento("");
    setSexo("masculino");
    setTempoContribuicao(0);
    setMediaSalarial(0);
    setSalarioAtual(0);
    setDataPretendida("");
    setContribuicaoFutura(0);
    setResult(null);
    setSelectedModality("");
  };

  const currentAge = dataNascimento ? calculateAge(dataNascimento) : null;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 sm:space-y-8 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem isLast>Aposentadoria</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-3 text-center sm:space-y-4">
        <h1 className="mb-3 text-2xl font-bold text-text-primary sm:mb-4 sm:text-3xl lg:text-4xl">
          <span className="hidden sm:inline">
            🏛️ Calculadora Aposentadoria INSS - Múltiplas Modalidades 2026
          </span>
          <span className="sm:hidden">🏛️ Aposentadoria INSS 2026</span>
        </h1>
        <p className="mx-auto max-w-3xl px-4 text-sm text-text-secondary-dark sm:text-base lg:text-lg">
          Calcule{" "}
          <strong className="text-primary-blue-dark">TODAS as modalidades de aposentadoria</strong>{" "}
          do INSS: por idade, pontos, pedágio 50% e 100%.{" "}
          <strong className="text-growth-green">
            Compare e descubra a melhor opção para você!
          </strong>
        </p>
        <div className="inline-block rounded-lg bg-primary-blue-light p-3 duration-300 sm:p-4">
          <p className="text-xs font-medium text-text-primary sm:text-sm">
            🏛️ <strong>Regras 2026</strong> • 📊 <strong>5 Modalidades</strong> • 💡{" "}
            <strong>Comparativo Inteligente</strong> • ⚡ <strong>Cálculo Instantâneo</strong>
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
                label="Data de Nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                required
                fullWidth
              />

              <Select
                label="Sexo"
                value={sexo}
                onChange={(value) => setSexo(value as "masculino" | "feminino")}
                options={[
                  { value: "masculino", label: "Masculino" },
                  { value: "feminino", label: "Feminino" },
                ]}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="number"
                label="Tempo de Contribuição (anos)"
                value={tempoContribuicao}
                onChange={(e) => setTempoContribuicao(Number(e.target.value))}
                placeholder="Ex: 25"
                min="0"
                step="1"
                required
                fullWidth
              />

              {currentAge && (
                <div className="rounded-lg border border-primary-blue/30 bg-primary-blue-light p-3">
                  <label className="mb-1 block text-sm font-medium text-primary-blue-dark">
                    Idade Atual
                  </label>
                  <p className="text-lg font-semibold text-primary-blue-dark">
                    {currentAge.years} anos, {currentAge.months} meses
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MoneyInput
                label="Média Salarial Histórica (R$)"
                value={mediaSalarial}
                onChange={(value) => setMediaSalarial(value)}
                placeholder="Ex: 5000"
                fullWidth
                required
              />

              <MoneyInput
                label="Salário Atual (R$)"
                value={salarioAtual}
                onChange={(value) => setSalarioAtual(value)}
                placeholder="Ex: 6000"
                fullWidth
                required
              />
            </div>

            <details className="group">
              <summary className="cursor-pointer font-medium text-primary-blue hover:text-primary-blue-dark">
                📅 Campos Opcionais
              </summary>
              <div className="mt-3 space-y-4 rounded-lg border border-slate-600 bg-slate-800 p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Input
                    type="date"
                    label="Data Pretendida para Aposentadoria"
                    value={dataPretendida}
                    onChange={(e) => setDataPretendida(e.target.value)}
                    fullWidth
                  />

                  <MoneyInput
                    label="Contribuição Mensal Futura (R$)"
                    value={contribuicaoFutura}
                    onChange={(value) => setContribuicaoFutura(value)}
                    placeholder="Ex: 800"
                    fullWidth
                  />
                </div>
              </div>
            </details>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular
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

      {result && (
        <>
          <Card
            className={`result-success border-2 ${result.melhorOpcao.isEligible ? "border-growth-green bg-growth-green-soft" : "border-system-warning bg-system-warning/10"}`}
          >
            <CardHeader>
              <CardTitle as="h3">Resultado da Aposentadoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <div className="text-4xl font-bold tabular-nums text-text-primary-dark">
                  {formatCurrency(result.melhorOpcao.estimatedBenefit)}
                </div>
                <div
                  className={`text-xl font-semibold ${result.melhorOpcao.isEligible ? "text-growth-green" : "text-system-warning"}`}
                >
                  {result.melhorOpcao.name}
                </div>
                {result.melhorOpcao.isEligible && (
                  <p className="text-growth-green">
                    ✓ Você já pode se aposentar por esta modalidade!
                  </p>
                )}
                {!result.melhorOpcao.isEligible && (
                  <p className="text-system-warning">
                    ⏳ Faltam {result.melhorOpcao.timeRemaining.years} anos e{" "}
                    {result.melhorOpcao.timeRemaining.months} meses
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-system-info bg-system-info/10">
            <CardHeader>
              <CardTitle as="h3" className="text-system-info">
                🎯 Data Estimada de Aposentadoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-center">
                <p className="text-text-secondary">
                  Pela modalidade {result.melhorOpcao.name}, você poderá se aposentar em:
                </p>
                <div className="text-2xl font-bold text-system-info">
                  {formatDate(result.melhorOpcao.retirementDate)}
                </div>
                {!result.melhorOpcao.isEligible && (
                  <p className="text-sm text-system-info">
                    {result.melhorOpcao.timeRemaining.years} anos,{" "}
                    {result.melhorOpcao.timeRemaining.months} meses e{" "}
                    {result.melhorOpcao.timeRemaining.days} dias restantes
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-l-4 border-growth-green bg-growth-green-soft">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green">
                  📊 Modalidades Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-growth-green">
                    {result.modalidades.filter((m) => m.isEligible).length}/
                    {result.modalidades.length}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {result.modalidades.filter((m) => m.isEligible).length > 0
                      ? `Você tem ${result.modalidades.filter((m) => m.isEligible).length} modalidade(s) disponível(is) agora`
                      : "Nenhuma modalidade disponível no momento"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-primary-blue bg-primary-blue-light">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark">
                  💰 Melhor Benefício Possível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-primary-blue-dark">
                    {formatCurrency(Math.max(...result.modalidades.map((m) => m.estimatedBenefit)))}
                  </div>
                  <p className="text-sm text-text-secondary">
                    Maior benefício entre todas as modalidades
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparativo de Modalidades */}
          <Card>
            <CardHeader>
              <CardTitle as="h3" className="text-primary-blue">
                📊 Comparativo de Todas as Modalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary-blue/30 bg-primary-blue-light">
                      <th className="p-3 text-left font-semibold text-primary-blue-dark">
                        Modalidade
                      </th>
                      <th className="p-3 text-center font-semibold text-primary-blue-dark">
                        Elegível
                      </th>
                      <th className="p-3 text-center font-semibold text-primary-blue-dark">
                        Tempo Restante
                      </th>
                      <th className="p-3 text-right font-semibold text-primary-blue-dark">
                        Benefício
                      </th>
                      <th className="p-3 text-center font-semibold text-primary-blue-dark">
                        Data Estimada
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.modalidades.map((modalidade) => (
                      <tr
                        key={modalidade.id}
                        className={`cursor-pointer border-b border-neutral-surface-variant transition-colors hover:bg-primary-blue-light/30 ${
                          selectedModality === modalidade.id ? "bg-primary-blue-light/50" : ""
                        }`}
                        onClick={() => setSelectedModality(modalidade.id)}
                      >
                        <td className="p-3">
                          <div>
                            <div className="font-semibold text-text-primary">{modalidade.name}</div>
                            <div className="text-xs text-text-secondary">
                              {modalidade.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              modalidade.isEligible
                                ? "bg-growth-green text-white"
                                : "bg-system-warning text-white"
                            }`}
                          >
                            {modalidade.isEligible ? "SIM" : "NÃO"}
                          </span>
                        </td>
                        <td className="p-3 text-center font-medium">
                          {modalidade.isEligible ? (
                            <span className="text-growth-green">✅ Agora</span>
                          ) : (
                            <span className="text-system-warning">
                              {modalidade.timeRemaining.years}a {modalidade.timeRemaining.months}m
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right font-bold tabular-nums text-growth-green">
                          {formatCurrency(modalidade.estimatedBenefit)}
                        </td>
                        <td className="p-3 text-center tabular-nums text-primary-blue-dark">
                          {formatDate(modalidade.retirementDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-lg bg-primary-blue-light/20 p-3">
                <p className="text-center text-xs text-primary-blue-dark">
                  💡 <strong>Dica:</strong> Clique em uma linha para ver detalhes da modalidade
                  abaixo
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes da Modalidade Selecionada */}
          {selectedModality && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info">
                  🔍 Detalhes: {result.modalidades.find((m) => m.id === selectedModality)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const modalidade = result.modalidades.find((m) => m.id === selectedModality);
                  if (!modalidade) return null;

                  return (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                      <div className="rounded-lg bg-system-info/10 p-4">
                        <h5 className="mb-3 font-semibold text-system-info">📋 Regras</h5>
                        <ul className="space-y-2 text-sm">
                          {modalidade.rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="mt-1 text-system-info">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg bg-growth-green-soft p-4">
                        <h5 className="mb-3 font-semibold text-growth-green">✅ Vantagens</h5>
                        <ul className="space-y-2 text-sm">
                          {modalidade.advantages.map((advantage, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="mt-1 text-growth-green">+</span>
                              <span>{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg bg-system-error/10 p-4">
                        <h5 className="mb-3 font-semibold text-system-error">⚠️ Desvantagens</h5>
                        <ul className="space-y-2 text-sm">
                          {modalidade.disadvantages.map((disadvantage, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="mt-1 text-system-error">-</span>
                              <span>{disadvantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Simulação "E se" */}
          <Card className="mt-6 border-l-4 border-math-purple bg-math-purple-light">
            <CardHeader>
              <CardTitle as="h3" className="text-math-purple">
                🔮 Simulação "E se..." - Cenários Alternativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Cenário: Aumentar Salário */}
                <div className="rounded-lg border border-math-purple/20 bg-background-dark-secondary p-4">
                  <h5 className="mb-3 font-semibold text-math-purple">
                    💰 E se aumentar o salário?
                  </h5>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const aumentoSalario = salarioAtual * 1.3; // 30% de aumento
                      const novoCalculo = calculateRetirementModalites({
                        ...{
                          dataNascimento,
                          sexo,
                          tempoContribuicao: tempoContribuicao * 12,
                          mediaSalarial: aumentoSalario,
                          salarioAtual: aumentoSalario,
                        },
                      });
                      const diferencaBenefico =
                        novoCalculo.melhorOpcao.estimatedBenefit -
                        result.melhorOpcao.estimatedBenefit;

                      return (
                        <>
                          <p>
                            <strong>Salário simulado:</strong> {formatCurrency(aumentoSalario)}
                          </p>
                          <p>
                            <strong>Novo benefício:</strong>{" "}
                            {formatCurrency(novoCalculo.melhorOpcao.estimatedBenefit)}
                          </p>
                          <p
                            className={`font-semibold ${diferencaBenefico > 0 ? "text-growth-green" : "text-system-error"}`}
                          >
                            <strong>Diferença:</strong> {diferencaBenefico > 0 ? "+" : ""}
                            {formatCurrency(diferencaBenefico)}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Cenário: Mais 5 anos contribuindo */}
                <div className="rounded-lg border border-math-purple/20 bg-background-dark-secondary p-4">
                  <h5 className="mb-3 font-semibold text-math-purple">
                    ⏰ E se contribuir mais 5 anos?
                  </h5>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const novoTempo = tempoContribuicao * 12 + 5 * 12;
                      const novoCalculo = calculateRetirementModalites({
                        ...{
                          dataNascimento,
                          sexo,
                          tempoContribuicao: novoTempo,
                          mediaSalarial,
                          salarioAtual,
                        },
                      });
                      const diferencaBenefico =
                        novoCalculo.melhorOpcao.estimatedBenefit -
                        result.melhorOpcao.estimatedBenefit;

                      return (
                        <>
                          <p>
                            <strong>Tempo simulado:</strong> {Math.floor(novoTempo / 12)} anos
                          </p>
                          <p>
                            <strong>Novo benefício:</strong>{" "}
                            {formatCurrency(novoCalculo.melhorOpcao.estimatedBenefit)}
                          </p>
                          <p
                            className={`font-semibold ${diferencaBenefico > 0 ? "text-growth-green" : "text-system-error"}`}
                          >
                            <strong>Diferença:</strong> {diferencaBenefico > 0 ? "+" : ""}
                            {formatCurrency(diferencaBenefico)}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Cenário: Aposentar mais cedo */}
                <div className="rounded-lg border border-math-purple/20 bg-background-dark-secondary p-4">
                  <h5 className="mb-3 font-semibold text-math-purple">
                    ⚡ E se aposentar mais cedo?
                  </h5>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const modalidadeMaisCedo = result.modalidades
                        .filter((m) => m.isEligible)
                        .sort((a, b) => {
                          const aTime = a.timeRemaining.years * 12 + a.timeRemaining.months;
                          const bTime = b.timeRemaining.years * 12 + b.timeRemaining.months;
                          return aTime - bTime;
                        })[0];

                      if (!modalidadeMaisCedo || modalidadeMaisCedo.id === result.melhorOpcao.id) {
                        return (
                          <>
                            <p className="text-text-secondary">
                              Não há opção mais rápida disponível
                            </p>
                            <p className="text-xs">Sua melhor opção já é a mais rápida</p>
                          </>
                        );
                      }

                      const diferencaBenefico =
                        modalidadeMaisCedo.estimatedBenefit - result.melhorOpcao.estimatedBenefit;

                      return (
                        <>
                          <p>
                            <strong>Modalidade:</strong>{" "}
                            {modalidadeMaisCedo.name
                              .replace("Aposentadoria ", "")
                              .replace("Regra de Transição ", "")
                              .replace("Regra ", "")}
                          </p>
                          <p>
                            <strong>Benefício:</strong>{" "}
                            {formatCurrency(modalidadeMaisCedo.estimatedBenefit)}
                          </p>
                          <p
                            className={`font-semibold ${diferencaBenefico > 0 ? "text-growth-green" : "text-system-error"}`}
                          >
                            <strong>Diferença:</strong> {diferencaBenefico > 0 ? "+" : ""}
                            {formatCurrency(diferencaBenefico)}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-math-purple/30 bg-background-dark-secondary p-4">
                <h5 className="mb-2 font-semibold text-purple-700">📈 Análise dos Cenários</h5>
                <div className="space-y-1 text-sm text-text-primary">
                  <p>
                    • <strong>Aumento salarial:</strong> Impacta diretamente no cálculo do benefício
                    final
                  </p>
                  <p>
                    • <strong>Mais tempo contribuindo:</strong> Aumenta percentual do benefício (2%
                    por ano extra)
                  </p>
                  <p>
                    • <strong>Aposentadoria antecipada:</strong> Pode reduzir valor mas acelera
                    acesso ao benefício
                  </p>
                  <p>
                    • <strong>Recomendação:</strong> Balance tempo vs. valor conforme sua
                    necessidade financeira
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico e Salvamento */}
          <Card className="mt-6 border-l-4 border-system-warning bg-system-warning/10">
            <CardHeader>
              <CardTitle as="h3" className="text-system-warning">
                💾 Histórico de Simulações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-lg bg-background-dark-secondary p-4">
                  <h5 className="mb-3 font-semibold text-system-warning">
                    💾 Salvar Esta Simulação
                  </h5>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const simulacao = {
                          id: Date.now().toString(),
                          data: new Date().toLocaleDateString("pt-BR"),
                          dataNascimento,
                          sexo,
                          tempoContribuicao,
                          mediaSalarial,
                          salarioAtual,
                          melhorOpcao: result.melhorOpcao.name,
                          beneficioEstimado: result.melhorOpcao.estimatedBenefit,
                        };

                        const historico = JSON.parse(
                          localStorage.getItem("historicoAposentadoria") || "[]"
                        );
                        historico.unshift(simulacao);
                        localStorage.setItem(
                          "historicoAposentadoria",
                          JSON.stringify(historico.slice(0, 10))
                        ); // Manter apenas 10

                        showSaveToast("Simulação salva com sucesso! ✅");
                      }}
                      className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                    >
                      💾 Salvar Simulação Atual
                    </button>
                    <p className="text-xs text-text-primary">
                      Suas simulações ficam salvas no navegador para consulta futura
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-background-dark-secondary p-4">
                  <h5 className="mb-3 font-semibold text-system-warning">📊 Exportar Relatório</h5>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const conteudo = `
RELATÓRIO DE APOSENTADORIA INSS - ${new Date().toLocaleDateString("pt-BR")}

DADOS PESSOAIS:
- Data de Nascimento: ${new Date(dataNascimento).toLocaleDateString("pt-BR")}
- Sexo: ${sexo}
- Idade Atual: ${currentAge?.years} anos, ${currentAge?.months} meses

DADOS PREVIDENCIÁRIOS:
- Tempo de Contribuição: ${tempoContribuicao} anos
- Média Salarial: ${formatCurrency(mediaSalarial)}
- Salário Atual: ${formatCurrency(salarioAtual)}

MELHOR OPÇÃO:
- Modalidade: ${result.melhorOpcao.name}
- Benefício Estimado: ${formatCurrency(result.melhorOpcao.estimatedBenefit)}
- Elegível: ${result.melhorOpcao.isEligible ? "SIM" : "NÃO"}
- Tempo Restante: ${result.melhorOpcao.timeRemaining.years} anos, ${result.melhorOpcao.timeRemaining.months} meses

TODAS AS MODALIDADES:
${result.modalidades
  .map(
    (m) =>
      `- ${m.name}: ${formatCurrency(m.estimatedBenefit)} (${m.isEligible ? "Elegível" : "Não elegível"})`
  )
  .join("\n")}

RECOMENDAÇÕES:
${result.recomendacoes.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Este relatório é uma estimativa baseada na legislação atual.
Consulte sempre um especialista para análise detalhada.
                        `;

                        const blob = new Blob([conteudo], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `aposentadoria-inss-${new Date().toISOString().slice(0, 10)}.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      📄 Exportar Relatório PDF/TXT
                    </button>
                    <p className="text-xs text-text-primary">
                      Gere um relatório completo para imprimir ou guardar
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recomendações */}
          <Card className="from-system-info-light mt-6 bg-gradient-to-r to-primary-blue-light">
            <CardHeader>
              <CardTitle as="h3" className="text-system-info-dark">
                💡 Recomendações Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recomendacoes.map((recomendacao, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-background-dark-secondary p-3"
                  >
                    <span className="mt-1 text-xl text-system-info">
                      {index === 0
                        ? "🎯"
                        : index === 1
                          ? "⏰"
                          : index === 2
                            ? "💰"
                            : index === 3
                              ? "📋"
                              : "📄"}
                    </span>
                    <p className="text-sm">{recomendacao}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Seção: Guia das Modalidades - SEO Principal */}
      <Card className="mt-6 border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            📚 Guia Completo: Modalidades de Aposentadoria INSS 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-text-primary">
            <div className="text-lg leading-relaxed">
              <p>
                A <strong className="text-growth-green">aposentadoria do INSS</strong> passou por
                uma grande reforma em 2019 (EC 103/2019), criando{" "}
                <strong className="text-primary-blue-dark">múltiplas modalidades</strong> com
                diferentes requisitos. Entender cada uma é fundamental para{" "}
                <em>escolher a melhor estratégia</em> para seu caso específico.
              </p>
            </div>

            {/* Aposentadoria por Idade */}
            <div className="rounded-xl border border-primary-blue/20 bg-gray-900 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary-blue">
                👴 Aposentadoria por Idade - A Regra Definitiva
              </h3>

              <div className="mb-4 rounded-lg border border-primary-blue/30 bg-primary-blue-light p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      📋 Requisitos Mínimos:
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>
                        • <strong>Homens:</strong> 65 anos de idade + 20 anos contribuição
                      </li>
                      <li>
                        • <strong>Mulheres:</strong> 62 anos de idade + 15 anos contribuição
                      </li>
                      <li>
                        • <strong>Vigência:</strong> Regra definitiva (não muda mais)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-primary-blue-dark">
                      💰 Fórmula do Benefício:
                    </h4>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>
                        • <strong>Base:</strong> 60% da média de todos os salários
                      </li>
                      <li>
                        • <strong>Adicional:</strong> +2% por ano acima do mínimo
                      </li>
                      <li>
                        • <strong>Máximo:</strong> 100% aos 40 anos de contribuição
                      </li>
                      <li>
                        • <strong>Piso:</strong> 1 salário mínimo (R$ 1.518,00)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-growth-green-soft to-system-success/20 p-4">
                <p className="text-sm text-text-primary">
                  <strong className="text-growth-green">💡 Exemplo Prático:</strong> Mulher de 62
                  anos com 25 anos de contribuição e média salarial de R$ 4.000. Benefício = 60% +
                  (25-15) × 2% = 80% × R$ 4.000 = <strong>R$ 3.200</strong>
                </p>
              </div>
            </div>

            {/* Resumo das Modalidades */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-primary-blue/20 bg-primary-blue-light p-6">
                <h4 className="mb-3 text-lg font-bold text-primary-blue-dark">
                  📊 Regras de Transição
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p>
                      <strong className="text-growth-green">Regra por Pontos:</strong>
                    </p>
                    <p className="ml-4">• Soma idade + tempo contribuição</p>
                    <p className="ml-4">• 2026: 102 pontos (H) / 92 pontos (M)</p>
                    <p className="ml-4">• Benefício integral sem idade mínima</p>
                  </div>

                  <div className="border-t border-primary-blue/20 pt-2">
                    <p>
                      <strong className="text-system-warning">Idade Progressiva:</strong>
                    </p>
                    <p className="ml-4">• 2026: 64 anos (H) / 59 anos (M)</p>
                    <p className="ml-4">• Aumenta 6 meses por ano</p>
                    <p className="ml-4">• Com fator previdenciário (reduz benefício)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-growth-green/20 bg-growth-green-soft p-6">
                <h4 className="mb-3 text-lg font-bold text-growth-green">🚪 Regras de Pedágio</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p>
                      <strong className="text-primary-blue-dark">Pedágio 50%:</strong>
                    </p>
                    <p className="ml-4">• Para quem estava próximo da aposentadoria em 2019</p>
                    <p className="ml-4">• Sem idade mínima</p>
                    <p className="ml-4">• Fórmula antiga: 70% + 1% por ano</p>
                  </div>

                  <div className="border-t border-growth-green/20 pt-2">
                    <p>
                      <strong className="text-system-success">Pedágio 100%:</strong>
                    </p>
                    <p className="ml-4">• Idade: 60 anos (H) / 57 anos (M)</p>
                    <p className="ml-4">• Tempo dobrado do que faltava</p>
                    <p className="ml-4">• Benefício integral (100%)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentação Necessária */}
            <div className="rounded-lg border border-system-warning/30 bg-system-warning/10 p-4">
              <h4 className="mb-3 font-semibold text-system-warning">
                📄 Documentação Necessária para Aposentadoria
              </h4>
              <div className="grid grid-cols-1 gap-4 text-sm lg:grid-cols-3">
                <div>
                  <h5 className="mb-2 font-semibold text-system-warning">📋 Documentos Básicos:</h5>
                  <ul className="space-y-1 text-text-primary">
                    <li>• RG e CPF</li>
                    <li>• Comprovante de residência</li>
                    <li>• Carteira de Trabalho</li>
                    <li>• Carnês de contribuição</li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-system-warning">
                    💼 Comprovantes de Renda:
                  </h5>
                  <ul className="space-y-1 text-text-primary">
                    <li>• Extratos do FGTS</li>
                    <li>• Declarações do IR</li>
                    <li>• Holerites antigos</li>
                    <li>• PPP (se aplicável)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-system-warning">🏛️ Documentos INSS:</h5>
                  <ul className="space-y-1 text-text-primary">
                    <li>• CNIS atualizado</li>
                    <li>• Extrato previdenciário</li>
                    <li>• Formulários específicos</li>
                    <li>• Procuração (se necessário)</li>
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
            <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
              <h4 className="mb-2 font-semibold text-system-warning">
                ⚠️ Importante - Estimativas
              </h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>
                  • <strong>Simulação:</strong> Esta calculadora fornece estimativas baseadas nas
                  regras atuais
                </p>
                <p>
                  • <strong>Legislação:</strong> Cálculos conforme EC 103/2019 e regulamentações do
                  INSS
                </p>
                <p>
                  • <strong>Dados 2026:</strong> Salário mínimo R$ 1.518,00, Teto R$ 8.157,41
                </p>
                <p>
                  • <strong>Consultoria:</strong> Para análise detalhada, consulte um advogado
                  previdenciário
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h4 className="mb-2 font-semibold text-growth-green">📋 Próximos Passos</h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>
                  • <strong>Meu INSS:</strong> Confira seu CNIS (Cadastro Nacional de Informações
                  Sociais)
                </p>
                <p>
                  • <strong>Documentação:</strong> Mantenha comprovantes de renda e contribuição
                  atualizados
                </p>
                <p>
                  • <strong>Planejamento:</strong> Considere contribuições adicionais se necessário
                </p>
                <p>
                  • <strong>Acompanhamento:</strong> Revise sua situação anualmente
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue-light p-4">
              <h4 className="mb-2 font-semibold text-primary-blue">🔗 Links Oficiais</h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>
                  • <strong>Meu INSS:</strong>{" "}
                  <a
                    href="https://meu.inss.gov.br"
                    target="_blank"
                    className="text-primary-blue hover:underline"
                  >
                    meu.inss.gov.br
                  </a>
                </p>
                <p>
                  • <strong>Portal Gov.br:</strong>{" "}
                  <a
                    href="https://www.gov.br/inss"
                    target="_blank"
                    className="text-primary-blue hover:underline"
                  >
                    gov.br/inss
                  </a>
                </p>
                <p>
                  • <strong>Agendamento:</strong>{" "}
                  <a
                    href="https://meu.inss.gov.br/central/index.html"
                    target="_blank"
                    className="text-primary-blue hover:underline"
                  >
                    Central de Atendimento 135
                  </a>
                </p>
                <p>
                  • <strong>Simuladores Oficiais:</strong>{" "}
                  <a
                    href="https://www.inss.gov.br/servicos-do-inss/calculo-da-guia-da-previdencia-social-gps/"
                    target="_blank"
                    className="text-primary-blue hover:underline"
                  >
                    inss.gov.br
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Calculadora Aposentadoria INSS"
        items={[
          {
            question: "Como calcular minha aposentadoria pelo INSS de forma confiável?",
            answer:
              "Para calcular sua aposentadoria INSS, considere: <strong>idade atual</strong>, <strong>tempo de contribuição</strong>, <strong>média salarial</strong> e <strong>modalidade escolhida</strong>. Nossa calculadora aplica as <strong>regras 2026</strong>: benefício base de 60% + 2% por ano acima do mínimo (15 anos mulheres/20 anos homens). O valor final é limitado ao <strong>teto INSS de R$ 8.157,41</strong>.",
            borderColor: "primary-blue",
          },
          {
            question: "Qual a diferença entre aposentadoria por idade e tempo de contribuição?",
            answer:
              "<strong>Por idade:</strong> 65 anos (homens) / 62 anos (mulheres) + 20/15 anos contribuição. <strong>Por pontos:</strong> soma idade + tempo = 102/92 pontos sem idade mínima. <strong>Pedágios 50%/100%:</strong> regras especiais para quem estava próximo da reforma em 2019. Cada modalidade tem <strong>requisitos e benefícios diferentes</strong>.",
            borderColor: "growth-green",
          },
          {
            question: "Como funciona a nova regra de transição da aposentadoria?",
            answer:
              "As <strong>regras de transição</strong> protegem quem já contribuía antes da reforma (2019). <strong>Regra por pontos:</strong> 102/92 pontos aumentando até 105/100. <strong>Idade progressiva:</strong> 64/59 anos aumentando 6 meses/ano. <strong>Pedágios:</strong> 50% sem idade mínima, 100% com 60/57 anos + tempo dobrado.",
            borderColor: "system-info",
          },
          {
            question: "Quanto confiável contribuir para me aposentar pelo INSS?",
            answer:
              "<strong>Tempo mínimo:</strong> 20 anos (homens) / 15 anos (mulheres) para aposentadoria por idade. <strong>Para benefício integral:</strong> 40 anos de contribuição. <strong>Regra por pontos:</strong> mesmo tempo mínimo + idade suficiente para somar 102/92 pontos. <strong>Pedágios:</strong> 35/30 anos + tempo adicional conforme regra.",
            borderColor: "system-warning",
          },
          {
            question: "Como calcular o valor da aposentadoria em 2026?",
            answer:
              "Fórmula 2026: <strong>60% da média salarial + 2% por ano acima do mínimo</strong>. Exemplo: mulher com 25 anos contribuição = 60% + (25-15) × 2% = 80%. <strong>Salário mínimo:</strong> R$ 1.518,00. <strong>Teto:</strong> R$ 8.157,41. <strong>Média salarial:</strong> calculada sobre todos os salários desde julho/1994, corrigidos monetariamente.",
            borderColor: "system-error-dark",
          },
          {
            question: "Quais são os requisitos para aposentadoria especial?",
            answer:
              "A <strong>aposentadoria especial</strong> é para atividades <strong>insalubres ou perigosas</strong>. Requisitos: <strong>15, 20 ou 25 anos</strong> de atividade especial (conforme grau de risco) + <strong>60 pontos</strong> (idade + tempo). <strong>Documentação:</strong> PPP (Perfil Profissiográfico Previdenciário) e LTCAT são essenciais. <strong>Benefício:</strong> 60% + 2% por ano.",
            borderColor: "primary-blue",
          },
          {
            question: "Posso trabalhar depois de me aposentar pelo INSS?",
            answer:
              "Sim, pode trabalhar após aposentado. <strong>Empregado CLT:</strong> contribuição obrigatória mas sem aumentar benefício. <strong>Autônomo:</strong> contribuição opcional. <strong>Servidor público:</strong> pode acumular com aposentadoria privada se cargos compatíveis. <strong>Importante:</strong> não há <strong>desaposentação</strong> desde 2019 - não é possível trocar benefício por outro melhor.",
            borderColor: "growth-green",
          },
          {
            question: "Quando devo dar entrada na aposentadoria INSS?",
            answer:
              "Dê entrada <strong>assim que completar os requisitos</strong> - não há vantagem em esperar. <strong>Documentos necessários:</strong> RG, CPF, CTPS, carnês, CNIS atualizado. <strong>Agendamento:</strong> pelo aplicativo Meu INSS ou telefone 135. <strong>Prazo:</strong> análise leva até 90 dias. <strong>Dica:</strong> organize documentação com antecedência.",
            borderColor: "system-info",
          },
        ]}
        tipSection={{
          title: "Dica Importante para Aposentadoria INSS",
          content:
            "Para <strong>maximizar seu benefício</strong>, considere continuar contribuindo se estiver próximo de completar <strong>40 anos</strong> (benefício integral). Acompanhe seu <strong>CNIS no Meu INSS</strong> regularmente e corrija inconsistências. Se nasceu antes de 1962 (homens) ou 1967 (mulheres), pode ter <strong>direito adquirido</strong> às regras anteriores à reforma.",
        }}
        footerText="<strong>Necessita planejar sua aposentadoria?</strong> Nossa calculadora analisa todas as modalidades INSS e indica a melhor opção para seu perfil específico."
      />

      <RelatedCalculators category="trabalhista" currentCalculatorId="aposentadoria" />

      {saveToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-growth-green px-5 py-3 text-sm font-medium text-white shadow-lg">
          {saveToast}
        </div>
      )}
    </div>
  );
}
