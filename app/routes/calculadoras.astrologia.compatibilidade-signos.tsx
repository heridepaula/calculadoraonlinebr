import type { MetaFunction } from "@remix-run/node";
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";

export const meta: MetaFunction = () => {
  return [
    { title: "Calculadora de Compatibilidade de Signos - Grátis 2025" },
    {
      name: "description",
      content:
        "Descubra a compatibilidade astrológica entre signos grátis. Análise completa do amor, amizade, trabalho e elementos astrológicos.",
    },
    {
      name: "keywords",
      content:
        "compatibilidade signos, compatibilidade astrológica, signos compatíveis, astrologia amor, compatibilidade zodíaco, mapa astral, relacionamento signos",
    },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "author",
      content: "CalculadoraOnlineBR",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      property: "og:title",
      content: "Calculadora de Compatibilidade de Signos - Grátis 2025",
    },
    {
      property: "og:description",
      content:
        "Descubra a compatibilidade astrológica entre signos grátis. Análise completa do amor, amizade, trabalho e elementos astrológicos.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content:
        "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/compatibilidade-signos.jpg",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Compatibilidade de Signos - Interface mostrando seleção de signos e análise de compatibilidade",
    },
    {
      property: "og:site_name",
      content: "CalculadoraOnlineBR",
    },
    {
      property: "og:locale",
      content: "pt_BR",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Calculadora de Compatibilidade de Signos Grátis 2025",
    },
    {
      name: "twitter:description",
      content:
        "Descubra a compatibilidade entre signos GRÁTIS! Análise completa de amor, amizade e trabalho.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/compatibilidade-signos.jpg",
    },
    {
      name: "twitter:image:alt",
      content:
        "Calculadora de Compatibilidade de Signos - Interface mostrando seleção de signos e análise de compatibilidade",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    },
  ];
};

// Interfaces
interface CompatibilityResult {
  titulo: string;
  descricao_compatibilidade: string;
  geral: {
    porcentagem: number;
    categoria: string;
    resumo: string;
    caracteristicas_signo1: string;
    caracteristicas_signo2: string;
    atracao_inicial: string;
    diferenca_fundamental: string;
  };
  amor: {
    porcentagem: number;
    titulo: string;
    descricao_geral: string;
    atracao_inicial: string;
    intimidade_fisica: string;
    desafios_principais: string[];
  };
  amizade: {
    porcentagem: number;
    titulo: string;
    descricao_geral: string;
    contribuicao_signo1: string;
    contribuicao_signo2: string;
    atividades_compartilhadas: string;
    conflitos_possiveis: string;
  };
  trabalho: {
    porcentagem: number;
    titulo: string;
    descricao_geral: string;
    pontos_fortes_signo1: string;
    pontos_fortes_signo2: string;
    setores_ideais: string;
    desafio_principal: string;
  };
  elementos: {
    titulo: string;
    combinacao: string;
    descricao_geral: string;
    natureza_elemental: string;
    sinergia_positiva: string;
    riscos_elementais: string;
  };
  pontos_fortes: {
    titulo: string;
    lista: Array<{
      nome: string;
      descricao: string;
    }>;
  };
  desafios?: {
    titulo: string;
    lista: Array<{
      nome: string;
      descricao: string;
    }>;
  };
  desafios_principais?: {
    titulo: string;
    lista: Array<{
      nome: string;
      descricao: string;
    }>;
  };
  dicas?: {
    titulo: string;
    para_signo1: {
      titulo: string;
      lista: Array<{
        nome: string;
        descricao: string;
      }>;
    };
    para_signo2: {
      titulo: string;
      lista: Array<{
        nome: string;
        descricao: string;
      }>;
    };
    para_ambos: {
      titulo: string;
      lista: Array<{
        nome: string;
        descricao: string;
      }>;
    };
  };
  dicas_relacionamento?: {
    titulo: string;
    para_signo1: {
      titulo: string;
      dicas: Array<{
        nome: string;
        descricao: string;
      }>;
    };
    para_signo2: {
      titulo: string;
      dicas: Array<{
        nome: string;
        descricao: string;
      }>;
    };
    para_ambos: {
      titulo: string;
      dicas: Array<{
        nome: string;
        descricao: string;
      }>;
    };
  };
  crescimento?: {
    titulo: string;
    paragrafo_1: string;
    paragrafo_2: string;
    paragrafo_3: string;
    paragrafo_4: string;
    paragrafo_5: string;
  };
  potencial_crescimento?: {
    titulo: string;
    introducao: string;
    crescimento_signo1: string;
    crescimento_signo2: string;
    crescimento_conjunto: string;
    potencial_cura: string;
  };
  conclusao: {
    titulo: string;
    paragrafo_1: string;
    paragrafo_2: string;
    paragrafo_3: string;
    paragrafo_4: string;
    paragrafo_5: string;
  };
}

// Dados dos signos
const SIGNOS = [
  {
    id: "aries",
    nome: "Áries",
    simbolo: "♈",
    elemento: "Fogo",
    cores: "from-red-500 to-orange-500",
  },
  {
    id: "touro",
    nome: "Touro",
    simbolo: "♉",
    elemento: "Terra",
    cores: "from-green-600 to-emerald-600",
  },
  {
    id: "gemeos",
    nome: "Gêmeos",
    simbolo: "♊",
    elemento: "Ar",
    cores: "from-sky-500 to-blue-500",
  },
  {
    id: "cancer",
    nome: "Câncer",
    simbolo: "♋",
    elemento: "Água",
    cores: "from-indigo-500 to-blue-600",
  },
  {
    id: "leao",
    nome: "Leão",
    simbolo: "♌",
    elemento: "Fogo",
    cores: "from-yellow-500 to-orange-500",
  },
  {
    id: "virgem",
    nome: "Virgem",
    simbolo: "♍",
    elemento: "Terra",
    cores: "from-teal-600 to-green-600",
  },
  { id: "libra", nome: "Libra", simbolo: "♎", elemento: "Ar", cores: "from-pink-500 to-rose-500" },
  {
    id: "escorpiao",
    nome: "Escorpião",
    simbolo: "♏",
    elemento: "Água",
    cores: "from-red-600 to-red-800",
  },
  {
    id: "sagitario",
    nome: "Sagitário",
    simbolo: "♐",
    elemento: "Fogo",
    cores: "from-purple-500 to-pink-500",
  },
  {
    id: "capricornio",
    nome: "Capricórnio",
    simbolo: "♑",
    elemento: "Terra",
    cores: "from-slate-600 to-gray-700",
  },
  {
    id: "aquario",
    nome: "Aquário",
    simbolo: "♒",
    elemento: "Ar",
    cores: "from-cyan-500 to-blue-500",
  },
  {
    id: "peixes",
    nome: "Peixes",
    simbolo: "♓",
    elemento: "Água",
    cores: "from-violet-500 to-purple-600",
  },
];

// Componente de seleção de signo
const SignSelector = ({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-text-primary">{label}</label>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {SIGNOS.map((signo) => (
          <button
            key={signo.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(signo.id)}
            className={`group relative flex flex-col items-center justify-center rounded-lg border-2 p-4 text-center transition-all duration-200 hover:scale-105 ${
              value === signo.id
                ? `border-primary-blue bg-gradient-to-br ${signo.cores} text-white shadow-lg`
                : "bg-background-primary border-neutral-surface-variant text-text-primary hover:border-primary-blue hover:shadow-md"
            } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} aspect-square min-h-[100px]`}
          >
            {/* Símbolo do signo */}
            <div
              className={`mb-2 text-4xl md:text-5xl ${value === signo.id ? "text-white" : "text-text-primary"}`}
            >
              {signo.simbolo}
            </div>

            {/* Nome do signo */}
            <div
              className={`text-sm md:text-base font-semibold ${value === signo.id ? "text-white" : "text-text-primary"}`}
            >
              {signo.nome}
            </div>

            {/* Elemento (apenas para telas maiores) */}
            <div
              className={`mt-1 hidden text-xs md:text-sm font-medium sm:block ${
                value === signo.id ? "text-white/80" : "text-text-secondary"
              }`}
            >
              {signo.elemento}
            </div>

            {/* Indicador de selecionado */}
            {value === signo.id && (
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-primary-blue bg-white"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente de resultado de compatibilidade
const CompatibilityResults = ({
  result,
  signo1,
  signo2,
}: {
  result: CompatibilityResult;
  signo1: string;
  signo2: string;
}) => {
  const getSigno = (id: string) => SIGNOS.find((s) => s.id === id);
  const s1 = getSigno(signo1);
  const s2 = getSigno(signo2);

  // Verificação robusta para garantir que todos os dados necessários existam
  if (!s1 || !s2 || !result || typeof result !== 'object') {
    return null;
  }

  if (!result.titulo || !result.geral || !result.amor || !result.amizade || !result.trabalho || !result.elementos || !result.pontos_fortes || !result.conclusao) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 55) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return "🔥";
    if (score >= 70) return "✨";
    if (score >= 55) return "⚡";
    return "💫";
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho principal */}
      <div id="cabecalho-principal"></div>
      <Card className="relative overflow-hidden border-2 border-primary-blue bg-gradient-to-br from-primary-blue to-math-purple shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">{result?.titulo || 'Carregando...'}</h2>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <div className="flex items-center gap-4">
                <div className={`rounded-full bg-gradient-to-br p-4 ${s1.cores} shadow-lg`}>
                  <span className="text-4xl">{s1.simbolo}</span>
                </div>
                <span className="text-2xl font-bold text-white">{s1.nome}</span>
              </div>
              <div className="text-3xl text-white/80">💝</div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-white">{s2.nome}</span>
                <div className={`rounded-full bg-gradient-to-br p-4 ${s2.cores} shadow-lg`}>
                  <span className="text-4xl">{s2.simbolo}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{result?.geral?.categoria || 'Carregando...'}</h3>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-4xl">{getScoreIcon(result?.geral?.porcentagem || 0)}</span>
                <span className="text-5xl font-bold text-white">{result?.geral?.porcentagem || 0}%</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="mb-4 text-center text-lg font-medium leading-relaxed text-white">
                {result?.geral?.resumo || 'Carregando análise...'}
              </p>
              <div className="grid grid-cols-1 gap-4 text-white/90 md:grid-cols-2">
                <div className="text-center">
                  <h4 className="mb-2 font-semibold text-white">Características de {s1?.nome}</h4>
                  <p className="text-sm">{result?.geral?.caracteristicas_signo1 || 'Carregando...'}</p>
                </div>
                <div className="text-center">
                  <h4 className="mb-2 font-semibold text-white">Características de {s2?.nome}</h4>
                  <p className="text-sm">{result?.geral?.caracteristicas_signo2 || 'Carregando...'}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <h4 className="mb-2 font-semibold text-white">✨ Atração Inicial</h4>
              <p className="text-sm text-white/90">{result.geral.atracao_inicial}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <h4 className="mb-2 font-semibold text-white">🔍 Diferença Fundamental</h4>
              <p className="text-sm text-white/90">{result.geral.diferenca_fundamental}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scores por categoria */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">💖</span>
              <span className="text-pink-700">Amor</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className={`text-3xl font-bold ${getScoreColor(result.amor.porcentagem)}`}>
                {result.amor.porcentagem}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🤝</span>
              <span className="text-blue-700">Amizade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className={`text-3xl font-bold ${getScoreColor(result.amizade.porcentagem)}`}>
                {result.amizade.porcentagem}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">💼</span>
              <span className="text-green-700">Trabalho</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className={`text-3xl font-bold ${getScoreColor(result.trabalho.porcentagem)}`}>
                {result.trabalho.porcentagem}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise detalhada do amor */}
      <Card className="border-l-4 border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">💕</span>
            <span className="text-pink-700">{result.amor.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-pink-200 bg-white/80 p-4">
            <p className="text-gray-800">{result.amor.descricao_geral}</p>
          </div>

          <div className="rounded-lg border border-pink-200 bg-white/80 p-4">
            <h4 className="mb-2 font-semibold text-pink-700">✨ Atração Inicial</h4>
            <p className="text-gray-800">{result.amor.atracao_inicial}</p>
          </div>

          <div className="rounded-lg border border-pink-200 bg-white/80 p-4">
            <h4 className="mb-2 font-semibold text-pink-700">💑 Intimidade Física</h4>
            <p className="text-gray-800">{result.amor.intimidade_fisica}</p>
          </div>

          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <h4 className="mb-3 font-semibold text-orange-700">⚠️ Principais Desafios</h4>
            <ul className="space-y-2">
              {result.amor.desafios_principais.map((desafio, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span className="text-sm text-gray-800">{desafio}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Análise de amizade */}
      <Card className="border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">👫</span>
            <span className="text-blue-700">{result.amizade.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-blue-200 bg-white/80 p-4">
            <p className="text-gray-800">{result.amizade.descricao_geral}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-white/70 p-4">
              <h4 className="mb-3 font-semibold text-blue-700">🔥 Contribuição de {s1.nome}</h4>
              <p className="text-sm text-gray-800">{result.amizade.contribuicao_signo1}</p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-white/70 p-4">
              <h4 className="mb-3 font-semibold text-blue-700">💙 Contribuição de {s2.nome}</h4>
              <p className="text-sm text-gray-800">{result.amizade.contribuicao_signo2}</p>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-white/70 p-4">
            <h4 className="mb-3 font-semibold text-blue-700">🎯 Atividades Compartilhadas</h4>
            <p className="text-sm text-gray-800">{result.amizade.atividades_compartilhadas}</p>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h4 className="mb-3 font-semibold text-yellow-700">⚡ Conflitos Possíveis</h4>
            <p className="text-sm text-gray-800">{result.amizade.conflitos_possiveis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Análise profissional */}
      <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">💼</span>
            <span className="text-green-700">{result.trabalho.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-green-200 bg-white/80 p-4">
            <p className="text-gray-800">{result.trabalho.descricao_geral}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-200 bg-white/70 p-4">
              <h4 className="mb-3 font-semibold text-green-700">🔥 Pontos Fortes de {s1.nome}</h4>
              <p className="text-sm text-gray-800">{result.trabalho.pontos_fortes_signo1}</p>
            </div>

            <div className="rounded-lg border border-green-200 bg-white/70 p-4">
              <h4 className="mb-3 font-semibold text-green-700">💙 Pontos Fortes de {s2.nome}</h4>
              <p className="text-sm text-gray-800">{result.trabalho.pontos_fortes_signo2}</p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-white/70 p-4">
            <h4 className="mb-3 font-semibold text-green-700">🎯 Setores Ideais</h4>
            <p className="text-sm text-gray-800">{result.trabalho.setores_ideais}</p>
          </div>

          <div className="rounded-lg border border-green-200 bg-white/70 p-4">
            <h4 className="mb-3 font-semibold text-green-700">⚠️ Desafio Principal</h4>
            <p className="text-sm text-gray-800">{result.trabalho.desafio_principal}</p>
          </div>
        </CardContent>
      </Card>

      {/* Análise dos elementos */}
      <Card className="border-l-4 border-purple-500 bg-gradient-to-br from-purple-50 to-violet-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">⚡</span>
            <span className="text-purple-700">{result.elementos.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-purple-200 bg-white/80 px-6 py-3">
              <span className="text-2xl">{s1.simbolo}</span>
              <span className="font-semibold text-purple-700">{s1.elemento}</span>
              <span className="text-purple-500">+</span>
              <span className="font-semibold text-purple-700">{s2.elemento}</span>
              <span className="text-2xl">{s2.simbolo}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-purple-700">
              {result.elementos.combinacao}
            </h3>
          </div>

          <div className="rounded-lg border border-purple-200 bg-white/80 p-4">
            <p className="text-gray-800">{result.elementos.descricao_geral}</p>
          </div>

          <div className="rounded-lg border border-purple-200 bg-white/80 p-4">
            <h4 className="mb-2 font-semibold text-purple-700">🌟 Natureza Elemental</h4>
            <p className="text-gray-800">{result.elementos.natureza_elemental}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-700">✨ Sinergia Positiva</h4>
              <p className="text-sm text-gray-800">{result.elementos.sinergia_positiva}</p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <h4 className="mb-2 font-semibold text-orange-700">⚠️ Riscos Elementais</h4>
              <p className="text-sm text-gray-800">{result.elementos.riscos_elementais}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pontos Fortes */}
      <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">💪</span>
            <span className="text-green-700">{result.pontos_fortes.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {result.pontos_fortes.lista.map((ponto, index) => (
              <div key={index} className="rounded-lg border border-green-200 bg-white/80 p-4">
                <h4 className="mb-2 font-semibold text-green-700">✨ {ponto.nome}</h4>
                <p className="text-sm text-gray-800">{ponto.descricao}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Desafios */}
      {(result.desafios || result.desafios_principais) && (
        <Card className="border-l-4 border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <span className="text-3xl">⚠️</span>
              <span className="text-orange-700">
                {result.desafios?.titulo || result.desafios_principais?.titulo || "Principais Desafios"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(result.desafios?.lista || result.desafios_principais?.lista || []).map((desafio, index) => (
                <div key={index} className="rounded-lg border border-orange-200 bg-white/80 p-4">
                  <h4 className="mb-2 font-semibold text-orange-700">⚡ {desafio.nome}</h4>
                  <p className="text-sm text-gray-800">{desafio.descricao}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dicas de relacionamento */}
      {(result.dicas || result.dicas_relacionamento) && (
        <Card className="border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <span className="text-3xl">💡</span>
              <span className="text-yellow-700">
                {result.dicas?.titulo || result.dicas_relacionamento?.titulo || "Dicas para Fortalecer o Relacionamento"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dicas para o primeiro signo */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-yellow-700">
                {result.dicas?.para_signo1.titulo || result.dicas_relacionamento?.para_signo1.titulo}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(result.dicas?.para_signo1.lista || result.dicas_relacionamento?.para_signo1.dicas || []).map((dica, index) => (
                  <div key={index} className="rounded-lg border border-yellow-200 bg-white/80 p-3">
                    <h4 className="mb-2 text-sm font-semibold text-yellow-700">{dica.nome}</h4>
                    <p className="text-xs text-gray-800">{dica.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dicas para o segundo signo */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-yellow-700">
                {result.dicas?.para_signo2.titulo || result.dicas_relacionamento?.para_signo2.titulo}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(result.dicas?.para_signo2.lista || result.dicas_relacionamento?.para_signo2.dicas || []).map((dica, index) => (
                  <div key={index} className="rounded-lg border border-yellow-200 bg-white/80 p-3">
                    <h4 className="mb-2 text-sm font-semibold text-yellow-700">{dica.nome}</h4>
                    <p className="text-xs text-gray-800">{dica.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dicas para ambos */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-yellow-700">
                {result.dicas?.para_ambos.titulo || result.dicas_relacionamento?.para_ambos.titulo}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(result.dicas?.para_ambos.lista || result.dicas_relacionamento?.para_ambos.dicas || []).map((dica, index) => (
                  <div key={index} className="rounded-lg border border-yellow-200 bg-white/80 p-3">
                    <h4 className="mb-2 text-sm font-semibold text-yellow-700">{dica.nome}</h4>
                    <p className="text-xs text-gray-800">{dica.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Potencial de crescimento */}
      {(result.crescimento || result.potencial_crescimento) && (
        <Card className="border-l-4 border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <span className="text-3xl">🌱</span>
              <span className="text-emerald-700">
                {result.crescimento?.titulo || result.potencial_crescimento?.titulo || "Potencial de Crescimento Juntos"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.crescimento ? (
              <div className="space-y-4 rounded-lg border border-emerald-200 bg-white/80 p-4">
                {result.crescimento.paragrafo_1 && <p className="text-gray-800">{result.crescimento.paragrafo_1}</p>}
                {result.crescimento.paragrafo_2 && <p className="text-gray-800">{result.crescimento.paragrafo_2}</p>}
                {result.crescimento.paragrafo_3 && <p className="text-gray-800">{result.crescimento.paragrafo_3}</p>}
                {result.crescimento.paragrafo_4 && <p className="text-gray-800">{result.crescimento.paragrafo_4}</p>}
                {result.crescimento.paragrafo_5 && <p className="text-gray-800">{result.crescimento.paragrafo_5}</p>}
              </div>
            ) : result.potencial_crescimento ? (
              <>
                <div className="rounded-lg border border-emerald-200 bg-white/80 p-4">
                  <p className="text-gray-800">{result.potencial_crescimento.introducao}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-emerald-200 bg-white/80 p-4">
                    <h4 className="mb-2 font-semibold text-emerald-700">🔥 Crescimento para {s1.nome}</h4>
                    <p className="text-sm text-gray-800">{result.potencial_crescimento.crescimento_signo1}</p>
                  </div>

                  <div className="rounded-lg border border-emerald-200 bg-white/80 p-4">
                    <h4 className="mb-2 font-semibold text-emerald-700">💙 Crescimento para {s2.nome}</h4>
                    <p className="text-sm text-gray-800">{result.potencial_crescimento.crescimento_signo2}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-white/80 p-4">
                  <h4 className="mb-2 font-semibold text-emerald-700">✨ Crescimento Conjunto</h4>
                  <p className="text-sm text-gray-800">{result.potencial_crescimento.crescimento_conjunto}</p>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-white/80 p-4">
                  <h4 className="mb-2 font-semibold text-emerald-700">💚 Potencial de Cura</h4>
                  <p className="text-sm text-gray-800">{result.potencial_crescimento.potencial_cura}</p>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Conclusão */}
      <Card className="border-2 border-primary-blue bg-gradient-to-br from-primary-blue/10 to-math-purple/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">🎯</span>
            <span className="text-primary-blue">{result.conclusao.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 rounded-lg border border-primary-blue/20 bg-white/80 p-6">
            <p className="leading-relaxed text-gray-800">{result.conclusao.paragrafo_1}</p>
            <p className="leading-relaxed text-gray-800">{result.conclusao.paragrafo_2}</p>
            <p className="leading-relaxed text-gray-800">{result.conclusao.paragrafo_3}</p>
            <p className="leading-relaxed text-gray-800">{result.conclusao.paragrafo_4}</p>
            <p className="leading-relaxed text-gray-800">{result.conclusao.paragrafo_5}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente principal

// Componente principal
export default function CalculadoraCompatibilidadeSignos() {
  const [signo1, setSigno1] = useState("");
  const [signo2, setSigno2] = useState("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Referencia para controle de scroll
  const signo2SelectorRef = useRef<HTMLDivElement>(null);

  // Função para fazer scroll suave para um elemento
  const scrollToElement = (element: HTMLElement | null) => {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Handlers para seleção de signos com regras de UX
  const handleSigno1Change = (value: string) => {
    setSigno1(value);
    // Limpar resposta e segunda seleção quando selecionar novo primeiro signo
    setResult(null);
    setSigno2("");
    setError("");

    // Fazer scroll para o segundo signo
    setTimeout(() => {
      scrollToElement(signo2SelectorRef.current);
    }, 100);
  };

  const handleSigno2Change = (value: string) => {
    setSigno2(value);
    // Limpar apenas a resposta quando selecionar novo segundo signo
    setResult(null);
    setError("");
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signo1 || !signo2) {
      setError("Selecione ambos os signos para calcular a compatibilidade");
      return;
    }

    // Permitir consulta de signos iguais para análise de compatibilidade do mesmo signo
    // if (signo1 === signo2) {
    //   setError("Selecione signos diferentes para analisar a compatibilidade");
    //   return;
    // }

    setLoading(true);
    setError("");
    setResult(null); // Limpar resultado anterior

    try {
      const response = await fetch(`/api/compatibilidade-signos?signo1=${signo1}&signo2=${signo2}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados de compatibilidade");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Erro ao calcular compatibilidade. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fazer scroll para o cabeçalho principal quando o resultado for atualizado
  useEffect(() => {
    if (result) {
      setTimeout(() => {
        const cabecalhoPrincipal = document.getElementById('cabecalho-principal');
        scrollToElement(cabecalhoPrincipal);
      }, 300); // Aguardar um pouco mais para garantir que o conteúdo foi renderizado
    }
  }, [result]);


  return (
    <div className="min-h-screen">
      <ResponsiveBreadcrumb
        items={createCalculatorBreadcrumb("astrologia", "Compatibilidade de Signos")}
      />

      <div className="space-y-8 px-3 py-6 sm:px-6">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Calculadora de Compatibilidade de Signos",
              description:
                "Calculadora gratuita para descobrir a compatibilidade astrológica entre signos zodiacais",
              url: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              isAccessibleForFree: true,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
              featureList: [
                "Compatibilidade amorosa",
                "Compatibilidade na amizade",
                "Compatibilidade profissional",
                "Análise de elementos astrológicos",
                "Dicas de relacionamento",
                "Pontos de crescimento",
              ],
            }),
          }}
        />

        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            Calculadora de Compatibilidade de Signos
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Descubra a{" "}
            <strong className="text-math-purple-dark">compatibilidade astrológica</strong> entre
            signos. Análise completa de{" "}
            <strong className="text-primary-blue-dark">amor, amizade e trabalho</strong> com base na
            astrologia tradicional.
          </p>
          <div className="inline-block rounded-lg bg-growth-green-soft p-4">
            <p className="text-sm font-medium text-text-primary">
              💖 <strong>Amor</strong> • 🤝 <strong>Amizade</strong> • 💼 <strong>Trabalho</strong>{" "}
              • ⚡ <strong>Elementos</strong>
            </p>
          </div>
        </header>

        {/* Formulário */}
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Selecione os Signos</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Seleção do primeiro signo */}
              <SignSelector
                label="Primeiro Signo"
                value={signo1}
                onChange={handleSigno1Change}
                disabled={loading}
              />

              {/* Seleção do segundo signo */}
              <div ref={signo2SelectorRef}>
                <SignSelector
                  label="Segundo Signo"
                  value={signo2}
                  onChange={handleSigno2Change}
                  disabled={loading}
                />
              </div>

              {/* Botão de ação */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={loading || !signo1 || !signo2}
                  className="w-full max-w-md bg-math-purple hover:bg-math-purple-dark"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Combinando...
                    </span>
                  ) : (
                    "Combinar"
                  )}
                </Button>
              </div>

              {error && (
                <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                  <p className="text-sm text-system-error">{error}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && signo1 && signo2 && (
          <div className="mx-auto max-w-4xl">
            <CompatibilityResults result={result} signo1={signo1} signo2={signo2} />
          </div>
        )}

        {/* Guia dos signos */}
        <Card className="border-l-4 border-math-purple bg-gradient-to-r from-math-purple/10 to-primary-blue/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-text-primary">
              🌟 Guia dos Signos do Zodíaco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  elemento: "Fogo",
                  cor: "from-red-500 to-orange-500",
                  signos: ["Áries", "Leão", "Sagitário"],
                  caracteristicas: ["Dinâmicos", "Energéticos", "Corajosos"],
                },
                {
                  elemento: "Terra",
                  cor: "from-green-600 to-emerald-600",
                  signos: ["Touro", "Virgem", "Capricórnio"],
                  caracteristicas: ["Práticos", "Estáveis", "Confiáveis"],
                },
                {
                  elemento: "Ar",
                  cor: "from-sky-500 to-blue-500",
                  signos: ["Gêmeos", "Libra", "Aquário"],
                  caracteristicas: ["Intelectuais", "Comunicativos", "Sociais"],
                },
                {
                  elemento: "Água",
                  cor: "from-indigo-500 to-purple-600",
                  signos: ["Câncer", "Escorpião", "Peixes"],
                  caracteristicas: ["Emotivos", "Intuitivos", "Sensíveis"],
                },
              ].map((grupo, index) => (
                <div
                  key={index}
                  className="bg-background-primary rounded-lg border border-neutral-surface-variant p-4"
                >
                  <div
                    className={`mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${grupo.cor} px-3 py-1 text-sm font-semibold text-white`}
                  >
                    {grupo.elemento}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-text-primary">Signos:</h4>
                      <ul className="text-sm text-text-secondary">
                        {grupo.signos.map((signo, i) => (
                          <li key={i}>• {signo}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">Características:</h4>
                      <ul className="text-sm text-text-secondary">
                        {grupo.caracteristicas.map((carac, i) => (
                          <li key={i}>• {carac}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Compatibilidade de Signos"
          items={[
            {
              question: "Como funciona a compatibilidade entre signos?",
              answer:
                "A compatibilidade astrológica é baseada na interação entre os elementos (Fogo, Terra, Ar, Água), modalidades e características específicas de cada signo. Signos do mesmo elemento tendem a se harmonizar, enquanto elementos complementares podem criar atrações intensas.",
              borderColor: "math-purple",
            },
            {
              question: "Os signos opostos são sempre incompatíveis?",
              answer:
                "Não necessariamente! Signos opostos podem criar relacionamentos muito intensos e complementares. A atração entre opostos pode levar a relacionamentos profundos, onde cada um aprende e cresce com as diferenças do outro.",
              borderColor: "primary-blue",
            },
            {
              question: "Qual é o signo mais compatível com todos?",
              answer:
                "Não existe um signo universalmente compatível. A compatibilidade depende de muitos fatores além do signo solar, como ascendente, lua e outros aspectos astrológicos. Cada combinação tem suas características únicas.",
              borderColor: "system-info",
            },
            {
              question: "A compatibilidade astrológica determina o sucesso do relacionamento?",
              answer:
                "A astrologia oferece insights valiosos sobre dinâmicas de relacionamento, mas não determina o destino. Comunicação, respeito mútuo, crescimento pessoal e esforço consciente são fatores muito mais importantes para o sucesso de qualquer relacionamento.",
              borderColor: "system-warning",
            },
            {
              question: "Como melhorar a compatibilidade com signos 'difíceis'?",
              answer:
                "Foque no autoconhecimento e compreensão das diferenças. Pratique comunicação aberta, respeite as características únicas do outro, encontre pontos em comum e veja os desafios como oportunidades de crescimento mútuo.",
              borderColor: "growth-green",
            },
          ]}
          tipSection={{
            title: "Dica sobre Compatibilidade Astrológica",
            content:
              "<strong>Para relacionamentos mais profundos:</strong> considere também os signos lunares e ascendentes de ambas as pessoas. A compatibilidade completa vai além dos signos solares e inclui todo o mapa astrológico.",
          }}
          footerText="<strong>Lembre-se:</strong> A astrologia é uma ferramenta de autoconhecimento e reflexão. Use as informações como guia, mas sempre mantenha seu livre arbítrio e responsabilidade pessoal nos relacionamentos."
        />

        <RelatedCalculators category="astrologia" />
      </div>
    </div>
  );
}
