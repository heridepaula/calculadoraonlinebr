import type { MetaFunction } from "@remix-run/node";
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "~/components/ui";
import { RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb, DirectAnswer } from "~/components";
import { trackEvent } from "~/lib/google-analytics";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("compatibilidade-signos"),
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
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {SIGNOS.map((signo) => (
          <button
            key={signo.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(signo.id)}
            className={`group relative flex flex-col items-center justify-center rounded-lg border-2 p-2 text-center transition-all duration-300 hover:scale-105 sm:p-3 md:p-4 ${
              value === signo.id
                ? `border-primary-blue bg-gradient-to-br ${signo.cores} text-white shadow-lg shadow-primary-blue/25`
                : "bg-background-primary border-neutral-surface-variant text-text-primary hover:border-primary-blue hover:bg-primary-blue/5 hover:shadow-md"
            } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} aspect-square min-h-[85px] sm:min-h-[100px] md:min-h-[120px]`}
          >
            {/* Símbolo do signo */}
            <div
              className={`mb-1 text-2xl transition-all duration-300 sm:mb-1.5 sm:text-3xl md:mb-2 md:text-4xl lg:text-5xl ${value === signo.id ? "text-white drop-shadow-sm" : "text-text-primary"}`}
            >
              {signo.simbolo}
            </div>

            {/* Nome do signo */}
            <div
              className={`px-0.5 text-[10px] font-semibold leading-tight transition-all duration-300 sm:text-xs md:text-sm lg:text-base ${value === signo.id ? "text-white drop-shadow-sm" : "text-text-primary"}`}
            >
              {signo.nome}
            </div>

            {/* Elemento - visível apenas em telas maiores no mobile */}
            <div
              className={`mt-0.5 hidden text-[8px] font-medium transition-all duration-300 sm:block sm:text-[10px] md:text-xs lg:text-sm ${
                value === signo.id ? "text-white/85 drop-shadow-sm" : "text-text-secondary"
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
  showCopyToast,
}: {
  result: CompatibilityResult;
  signo1: string;
  signo2: string;
  showCopyToast: (message: string) => void;
}) => {
  const getSigno = (id: string) => SIGNOS.find((s) => s.id === id);
  const s1 = getSigno(signo1);
  const s2 = getSigno(signo2);

  // Verificação robusta para garantir que todos os dados necessários existam
  if (!s1 || !s2 || !result || typeof result !== "object") {
    return null;
  }

  if (
    !result.titulo ||
    !result.geral ||
    !result.amor ||
    !result.amizade ||
    !result.trabalho ||
    !result.elementos ||
    !result.pontos_fortes ||
    !result.conclusao
  ) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 55) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return "❤️";
    if (score >= 70) return "💖";
    if (score >= 55) return "💛";
    return "💚";
  };

  const generateWhatsAppText = () => {
    const emoji = getScoreIcon(result?.geral?.porcentagem || 0);
    const score = result?.geral?.porcentagem || 0;
    const categoria = result?.geral?.categoria || "";

    return `${emoji} *Compatibilidade Astrologica* ${emoji}

*${s1?.nome}* + *${s2?.nome}*

*Resultado:* ${score}% - ${categoria}

${result?.geral?.resumo || ""}

Descubra sua compatibilidade em: https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos

#Astrologia #Compatibilidade #Signos`;
  };

  const handleWhatsAppShare = () => {
    const text = generateWhatsAppText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    // Track GA event
    trackEvent("share", {
      event_category: "Social Share",
      event_label: "WhatsApp",
      custom_parameters: {
        content_type: "compatibility_result",
        signs: `${s1?.nome}_${s2?.nome}`,
        compatibility_score: result?.geral?.porcentagem || 0,
        share_method: "whatsapp",
      },
    });

    window.open(whatsappUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const emoji = getScoreIcon(result?.geral?.porcentagem || 0);
    const score = result?.geral?.porcentagem || 0;
    const categoria = result?.geral?.categoria || "";

    const twitterText = `${emoji} Compatibilidade ${s1?.nome} + ${s2?.nome}: ${score}% - ${categoria}!

✨ Descubra sua compatibilidade astrológica em:`;

    // Track GA event
    trackEvent("share", {
      event_category: "Social Share",
      event_label: "Twitter",
      custom_parameters: {
        content_type: "compatibility_result",
        signs: `${s1?.nome}_${s2?.nome}`,
        compatibility_score: score,
        share_method: "twitter",
      },
    });

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent("https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos")}&hashtags=Astrologia,Compatibilidade,Signos`;
    window.open(twitterUrl, "_blank");
  };

  const handleFacebookShare = () => {
    // Track GA event
    trackEvent("share", {
      event_category: "Social Share",
      event_label: "Facebook",
      custom_parameters: {
        content_type: "compatibility_result",
        signs: `${s1?.nome}_${s2?.nome}`,
        compatibility_score: result?.geral?.porcentagem || 0,
        share_method: "facebook",
      },
    });

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos")}&quote=${encodeURIComponent(`${getScoreIcon(result?.geral?.porcentagem || 0)} Acabei de descobrir minha compatibilidade astrológica: ${s1?.nome} + ${s2?.nome} = ${result?.geral?.porcentagem || 0}% - ${result?.geral?.categoria || ""}! Faça o seu teste também!`)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleTelegramShare = () => {
    const text = generateWhatsAppText();

    // Track GA event
    trackEvent("share", {
      event_category: "Social Share",
      event_label: "Telegram",
      custom_parameters: {
        content_type: "compatibility_result",
        signs: `${s1?.nome}_${s2?.nome}`,
        compatibility_score: result?.geral?.porcentagem || 0,
        share_method: "telegram",
      },
    });

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent("https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos")}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank");
  };

  const handleCopyLink = async () => {
    const text = generateWhatsAppText();
    const fullText = `${text}\n\nLeia mais em: https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullText);

        // Track GA event
        trackEvent("share", {
          event_category: "Social Share",
          event_label: "Copy Text",
          custom_parameters: {
            content_type: "compatibility_result",
            signs: `${s1?.nome}_${s2?.nome}`,
            compatibility_score: result?.geral?.porcentagem || 0,
            share_method: "copy",
          },
        });

        showCopyToast("Texto copiado para área de transferência! ✅");
      } else {
        // Fallback para browsers mais antigos
        const textArea = document.createElement("textarea");
        textArea.value = fullText;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();

        // Track GA event
        trackEvent("share", {
          event_category: "Social Share",
          event_label: "Copy Text",
          custom_parameters: {
            content_type: "compatibility_result",
            signs: `${s1?.nome}_${s2?.nome}`,
            compatibility_score: result?.geral?.porcentagem || 0,
            share_method: "copy",
          },
        });

        showCopyToast("Texto copiado para área de transferência! ✅");
      }
    } catch (error) {
      console.error("Erro ao copiar:", error);
      showCopyToast("Erro ao copiar texto. Tente novamente.");
    }
  };

  const handleEmailShare = () => {
    const text = generateWhatsAppText();
    const subject = `${getScoreIcon(result?.geral?.porcentagem || 0)} Compatibilidade Astrológica: ${s1?.nome} + ${s2?.nome}`;
    const body = `${text}\n\nDescubra sua compatibilidade em: https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos`;

    // Track GA event
    trackEvent("share", {
      event_category: "Social Share",
      event_label: "Email",
      custom_parameters: {
        content_type: "compatibility_result",
        signs: `${s1?.nome}_${s2?.nome}`,
        compatibility_score: result?.geral?.porcentagem || 0,
        share_method: "email",
      },
    });

    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho principal */}
      <div id="cabecalho-principal"></div>
      <Card className="relative overflow-hidden border-2 border-primary-blue bg-gradient-to-br from-primary-blue to-math-purple shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">
              {result?.titulo || "Carregando..."}
            </h2>
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
              <h3 className="text-3xl font-bold text-white">
                {result?.geral?.categoria || "Carregando..."}
              </h3>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-4xl">{getScoreIcon(result?.geral?.porcentagem || 0)}</span>
                <span className="text-5xl font-bold text-white">
                  {result?.geral?.porcentagem || 0}%
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="mb-4 text-center text-lg font-medium leading-relaxed text-white">
                {result?.geral?.resumo || "Carregando análise..."}
              </p>
              <div className="grid grid-cols-1 gap-4 text-white/90 md:grid-cols-2">
                <div className="text-center">
                  <h4 className="mb-2 font-semibold text-white">Características de {s1?.nome}</h4>
                  <p className="text-sm">
                    {result?.geral?.caracteristicas_signo1 || "Carregando..."}
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="mb-2 font-semibold text-white">Características de {s2?.nome}</h4>
                  <p className="text-sm">
                    {result?.geral?.caracteristicas_signo2 || "Carregando..."}
                  </p>
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
              <span className="text-pink-400">Amor</span>
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
              <span className="text-blue-400">Amizade</span>
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
              <span className="text-green-400">Trabalho</span>
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
            <span className="text-pink-400">{result.amor.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-pink-500/30 bg-background-secondary p-4">
            <p className="text-text-primary-dark">{result.amor.descricao_geral}</p>
          </div>

          <div className="rounded-lg border border-pink-500/30 bg-background-secondary p-4">
            <h4 className="mb-2 font-semibold text-pink-400">✨ Atração Inicial</h4>
            <p className="text-text-primary-dark">{result.amor.atracao_inicial}</p>
          </div>

          <div className="rounded-lg border border-pink-500/30 bg-background-secondary p-4">
            <h4 className="mb-2 font-semibold text-pink-400">💑 Intimidade Física</h4>
            <p className="text-text-primary-dark">{result.amor.intimidade_fisica}</p>
          </div>

          <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
            <h4 className="mb-3 font-semibold text-orange-400">⚠️ Principais Desafios</h4>
            <ul className="space-y-2">
              {result.amor.desafios_principais.map((desafio, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span className="text-sm text-text-primary-dark">{desafio}</span>
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
            <span className="text-blue-400">{result.amizade.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4">
            <p className="text-text-primary-dark">{result.amizade.descricao_geral}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4">
              <h4 className="mb-3 font-semibold text-blue-400">🔥 Contribuição de {s1.nome}</h4>
              <p className="text-sm text-text-primary-dark">{result.amizade.contribuicao_signo1}</p>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4">
              <h4 className="mb-3 font-semibold text-blue-400">💙 Contribuição de {s2.nome}</h4>
              <p className="text-sm text-text-primary-dark">{result.amizade.contribuicao_signo2}</p>
            </div>
          </div>

          <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4">
            <h4 className="mb-3 font-semibold text-blue-400">🎯 Atividades Compartilhadas</h4>
            <p className="text-sm text-text-primary-dark">{result.amizade.atividades_compartilhadas}</p>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
            <h4 className="mb-3 font-semibold text-yellow-400">⚡ Conflitos Possíveis</h4>
            <p className="text-sm text-text-primary-dark">{result.amizade.conflitos_possiveis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Análise profissional */}
      <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">💼</span>
            <span className="text-green-400">{result.trabalho.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-green-500/30 bg-background-secondary p-4">
            <p className="text-text-primary-dark">{result.trabalho.descricao_geral}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-500/30 bg-background-secondary p-4">
              <h4 className="mb-3 font-semibold text-green-400">🔥 Pontos Fortes de {s1.nome}</h4>
              <p className="text-sm text-text-primary-dark">{result.trabalho.pontos_fortes_signo1}</p>
            </div>

            <div className="rounded-lg border border-green-500/30 bg-background-secondary p-4">
              <h4 className="mb-3 font-semibold text-green-400">💙 Pontos Fortes de {s2.nome}</h4>
              <p className="text-sm text-text-primary-dark">{result.trabalho.pontos_fortes_signo2}</p>
            </div>
          </div>

          <div className="rounded-lg border border-green-500/30 bg-background-secondary p-4">
            <h4 className="mb-3 font-semibold text-green-400">🎯 Setores Ideais</h4>
            <p className="text-sm text-text-primary-dark">{result.trabalho.setores_ideais}</p>
          </div>

          <div className="rounded-lg border border-green-500/30 bg-background-secondary p-4">
            <h4 className="mb-3 font-semibold text-green-400">⚠️ Desafio Principal</h4>
            <p className="text-sm text-text-primary-dark">{result.trabalho.desafio_principal}</p>
          </div>
        </CardContent>
      </Card>

      {/* Análise dos elementos */}
      <Card className="border-l-4 border-purple-500 bg-gradient-to-br from-purple-50 to-violet-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">⚡</span>
            <span className="text-purple-400">{result.elementos.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-purple-500/30 bg-background-secondary px-6 py-3">
              <span className="text-2xl">{s1.simbolo}</span>
              <span className="font-semibold text-purple-400">{s1.elemento}</span>
              <span className="text-purple-500">+</span>
              <span className="font-semibold text-purple-400">{s2.elemento}</span>
              <span className="text-2xl">{s2.simbolo}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-purple-400">
              {result.elementos.combinacao}
            </h3>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-background-secondary p-4">
            <p className="text-text-primary-dark">{result.elementos.descricao_geral}</p>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-background-secondary p-4">
            <h4 className="mb-2 font-semibold text-purple-400">🌟 Natureza Elemental</h4>
            <p className="text-text-primary-dark">{result.elementos.natureza_elemental}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <h4 className="mb-2 font-semibold text-green-400">✨ Sinergia Positiva</h4>
              <p className="text-sm text-text-primary-dark">{result.elementos.sinergia_positiva}</p>
            </div>

            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <h4 className="mb-2 font-semibold text-orange-400">⚠️ Riscos Elementais</h4>
              <p className="text-sm text-text-primary-dark">{result.elementos.riscos_elementais}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pontos Fortes */}
      <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">💪</span>
            <span className="text-green-400">{result.pontos_fortes.titulo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {result.pontos_fortes.lista.map((ponto, index) => (
              <div key={index} className="rounded-lg border border-green-500/30 bg-background-secondary p-4">
                <h4 className="mb-2 font-semibold text-green-400">✨ {ponto.nome}</h4>
                <p className="text-sm text-text-primary-dark">{ponto.descricao}</p>
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
              <span className="text-orange-400">
                {result.desafios?.titulo ||
                  result.desafios_principais?.titulo ||
                  "Principais Desafios"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(result.desafios?.lista || result.desafios_principais?.lista || []).map(
                (desafio, index) => (
                  <div key={index} className="rounded-lg border border-orange-500/30 bg-background-secondary p-4">
                    <h4 className="mb-2 font-semibold text-orange-400">⚡ {desafio.nome}</h4>
                    <p className="text-sm text-text-primary-dark">{desafio.descricao}</p>
                  </div>
                )
              )}
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
              <span className="text-yellow-400">
                {result.dicas?.titulo ||
                  result.dicas_relacionamento?.titulo ||
                  "Dicas para Fortalecer o Relacionamento"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dicas para o primeiro signo */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                {result.dicas?.para_signo1.titulo ||
                  result.dicas_relacionamento?.para_signo1.titulo}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(
                  result.dicas?.para_signo1.lista ||
                  result.dicas_relacionamento?.para_signo1.dicas ||
                  []
                ).map((dica, index) => (
                  <div key={index} className="rounded-lg border border-yellow-500/30 bg-background-secondary p-3">
                    <h4 className="mb-2 text-sm font-semibold text-yellow-400">{dica.nome}</h4>
                    <p className="text-xs text-text-primary-dark">{dica.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dicas para o segundo signo */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                {result.dicas?.para_signo2.titulo ||
                  result.dicas_relacionamento?.para_signo2.titulo}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(
                  result.dicas?.para_signo2.lista ||
                  result.dicas_relacionamento?.para_signo2.dicas ||
                  []
                ).map((dica, index) => (
                  <div key={index} className="rounded-lg border border-yellow-500/30 bg-background-secondary p-3">
                    <h4 className="mb-2 text-sm font-semibold text-yellow-400">{dica.nome}</h4>
                    <p className="text-xs text-text-primary-dark">{dica.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dicas para ambos */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                {result.dicas?.para_ambos.titulo || result.dicas_relacionamento?.para_ambos.titulo}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(
                  result.dicas?.para_ambos.lista ||
                  result.dicas_relacionamento?.para_ambos.dicas ||
                  []
                ).map((dica, index) => (
                  <div key={index} className="rounded-lg border border-yellow-500/30 bg-background-secondary p-3">
                    <h4 className="mb-2 text-sm font-semibold text-yellow-400">{dica.nome}</h4>
                    <p className="text-xs text-text-primary-dark">{dica.descricao}</p>
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
              <span className="text-emerald-400">
                {result.crescimento?.titulo ||
                  result.potencial_crescimento?.titulo ||
                  "Potencial de Crescimento Juntos"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.crescimento ? (
              <div className="space-y-4 rounded-lg border border-emerald-500/30 bg-background-secondary p-4">
                {result.crescimento.paragrafo_1 && (
                  <p className="text-text-primary-dark">{result.crescimento.paragrafo_1}</p>
                )}
                {result.crescimento.paragrafo_2 && (
                  <p className="text-text-primary-dark">{result.crescimento.paragrafo_2}</p>
                )}
                {result.crescimento.paragrafo_3 && (
                  <p className="text-text-primary-dark">{result.crescimento.paragrafo_3}</p>
                )}
                {result.crescimento.paragrafo_4 && (
                  <p className="text-text-primary-dark">{result.crescimento.paragrafo_4}</p>
                )}
                {result.crescimento.paragrafo_5 && (
                  <p className="text-text-primary-dark">{result.crescimento.paragrafo_5}</p>
                )}
              </div>
            ) : result.potencial_crescimento ? (
              <>
                <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4">
                  <p className="text-text-primary-dark">{result.potencial_crescimento.introducao}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4">
                    <h4 className="mb-2 font-semibold text-emerald-400">
                      🔥 Crescimento para {s1.nome}
                    </h4>
                    <p className="text-sm text-text-primary-dark">
                      {result.potencial_crescimento.crescimento_signo1}
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4">
                    <h4 className="mb-2 font-semibold text-emerald-400">
                      💙 Crescimento para {s2.nome}
                    </h4>
                    <p className="text-sm text-text-primary-dark">
                      {result.potencial_crescimento.crescimento_signo2}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4">
                  <h4 className="mb-2 font-semibold text-emerald-400">✨ Crescimento Conjunto</h4>
                  <p className="text-sm text-text-primary-dark">
                    {result.potencial_crescimento.crescimento_conjunto}
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4">
                  <h4 className="mb-2 font-semibold text-emerald-400">💚 Potencial de Cura</h4>
                  <p className="text-sm text-text-primary-dark">
                    {result.potencial_crescimento.potencial_cura}
                  </p>
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
          <div className="space-y-4 rounded-lg border border-primary-blue/20 bg-background-secondary p-6">
            <p className="leading-relaxed text-text-primary-dark">{result.conclusao.paragrafo_1}</p>
            <p className="leading-relaxed text-text-primary-dark">{result.conclusao.paragrafo_2}</p>
            <p className="leading-relaxed text-text-primary-dark">{result.conclusao.paragrafo_3}</p>
            <p className="leading-relaxed text-text-primary-dark">{result.conclusao.paragrafo_4}</p>
            <p className="leading-relaxed text-text-primary-dark">{result.conclusao.paragrafo_5}</p>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Compartilhamento */}
      <Card className="border-2 border-growth-green bg-gradient-to-r from-growth-green/10 to-growth-green/5">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-text-primary">
              📱 Compartilhe seu Resultado
            </h3>
            <p className="mb-8 text-lg text-text-secondary">
              Que tal compartilhar sua compatibilidade astrológica com amigos e família?
            </p>

            {/* Botões de Redes Sociais */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="group flex flex-col items-center gap-2 rounded-lg bg-green-500/100 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-xl"
                title="Compartilhar no WhatsApp"
              >
                <svg
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.384" />
                </svg>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={handleFacebookShare}
                className="group flex flex-col items-center gap-2 rounded-lg bg-blue-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
                title="Compartilhar no Facebook"
              >
                <svg
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>

              {/* Twitter */}
              <button
                onClick={handleTwitterShare}
                className="group flex flex-col items-center gap-2 rounded-lg bg-sky-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-600 hover:shadow-xl"
                title="Compartilhar no Twitter"
              >
                <svg
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="text-sm font-medium">Twitter</span>
              </button>

              {/* Telegram */}
              <button
                onClick={handleTelegramShare}
                className="group flex flex-col items-center gap-2 rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl"
                title="Compartilhar no Telegram"
              >
                <svg
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span className="text-sm font-medium">Telegram</span>
              </button>

              {/* Email */}
              <button
                onClick={handleEmailShare}
                className="group flex flex-col items-center gap-2 rounded-lg bg-gray-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
                title="Compartilhar por Email"
              >
                <svg
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Email</span>
              </button>

              {/* Copiar Link */}
              <button
                onClick={handleCopyLink}
                className="group flex flex-col items-center gap-2 rounded-lg bg-primary-blue p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-blue-dark hover:shadow-xl"
                title="Copiar texto"
              >
                <svg
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
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
                <span className="text-sm font-medium">Copiar</span>
              </button>
            </div>

            <div className="rounded-lg border border-growth-green/30 bg-growth-green/5 p-4">
              <p className="text-sm text-text-secondary">
                💡 <strong>Dica:</strong> O resultado será formatado automaticamente para cada
                plataforma com emojis e hashtags otimizadas!
              </p>
            </div>
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
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const showCopyToast = (msg: string) => { setCopyToast(msg); setTimeout(() => setCopyToast(null), 2000); };

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
        const cabecalhoPrincipal = document.getElementById("cabecalho-principal");
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
        {/* Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["WebApplication", "Article"],
              name: "🔮 Compatibilidade Signos Amor: Teste Grátis Sinastria Amorosa 2026",
              headline: "Teste Compatibilidade Signos Amor - Sinastria Amorosa Grátis",
              description:
                "Teste GRÁTIS de compatibilidade signos amor! Sinastria amorosa, combinação zodiacal e análise completa de relacionamento. Descubra se vocês combinam no amor, amizade e trabalho.",
              url: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
              applicationCategory: ["UtilitiesApplication", "Entertainment"],
              operatingSystem: "Web",
              isAccessibleForFree: true,
              inLanguage: "pt-BR",
              author: {
                "@type": "Organization",
                name: "CalculadoraOnlineBR",
                url: "https://www.calculadoraonlinebr.com.br",
              },
              publisher: {
                "@type": "Organization",
                name: "CalculadoraOnlineBR",
                url: "https://www.calculadoraonlinebr.com.br",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.png",
                },
              },
              datePublished: "2025-09-15",
              dateModified: new Date().toISOString().split("T")[0],
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id":
                  "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
              },
              featureList: [
                "Compatibilidade amorosa entre signos",
                "Compatibilidade na amizade",
                "Compatibilidade profissional",
                "Análise de elementos astrológicos (Fogo, Terra, Ar, Água)",
                "Dicas personalizadas para relacionamentos",
                "Pontos fortes e desafios do casal",
                "Percentuais de compatibilidade detalhados",
              ],
              keywords:
                "combinação de signos, compatibilidade astrológica, signos que combinam, compatibilidade no amor, astrologia, zodíaco, relacionamento",
              about: [
                {
                  "@type": "Thing",
                  name: "Astrologia",
                },
                {
                  "@type": "Thing",
                  name: "Compatibilidade de Signos",
                },
                {
                  "@type": "Thing",
                  name: "Zodíaco",
                },
              ],
              mentions: [
                "Áries",
                "Touro",
                "Gêmeos",
                "Câncer",
                "Leão",
                "Virgem",
                "Libra",
                "Escorpião",
                "Sagitário",
                "Capricórnio",
                "Aquário",
                "Peixes",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Como funciona a compatibilidade entre signos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A compatibilidade astrológica é baseada na interação entre os elementos (Fogo, Terra, Ar, Água), modalidades e características específicas de cada signo. Signos do mesmo elemento tendem a se harmonizar, enquanto elementos complementares podem criar atrações intensas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Os signos opostos são sempre incompatíveis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Não necessariamente! Signos opostos podem criar relacionamentos muito intensos e complementares. A atração entre opostos pode levar a relacionamentos profundos, onde cada um aprende e cresce com as diferenças do outro.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual é o signo mais compatível com todos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Não existe um signo universalmente compatível. A compatibilidade depende de muitos fatores além do signo solar, como ascendente, lua e outros aspectos astrológicos. Cada combinação tem suas características únicas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "A compatibilidade astrológica determina o sucesso do relacionamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A astrologia oferece insights valiosos sobre dinâmicas de relacionamento, mas não determina o destino. Comunicação, respeito mútuo, crescimento pessoal e esforço consciente são fatores muito mais importantes para o sucesso de qualquer relacionamento.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como melhorar a compatibilidade com signos 'difíceis'?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Foque no autoconhecimento e compreensão das diferenças. Pratique comunicação aberta, respeite as características únicas do outro, encontre pontos em comum e veja os desafios como oportunidades de crescimento mútuo.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            🔮 Compatibilidade Signos Amor: Teste Grátis Sinastria 2026
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Descubra a <strong className="text-math-purple-dark">sinastria amorosa</strong> e{" "}
            <strong className="text-primary-blue-dark">combinação astral</strong> entre signos.
            Análise completa de{" "}
            <strong className="text-primary-blue-dark">amor, amizade e trabalho</strong> com{" "}
            <strong className="text-math-purple-dark">mapa astral do casal</strong>.
          </p>
          <div className="inline-block rounded-lg bg-growth-green-soft p-4">
            <p className="text-sm font-medium text-text-primary">
              💖 <strong>Amor</strong> • 🤝 <strong>Amizade</strong> • 💼 <strong>Trabalho</strong>{" "}
              • ⚡ <strong>Elementos</strong>
            </p>
          </div>
        </header>

        <DirectAnswer title="Como a astrologia avalia a compatibilidade entre signos">
          <p>A compatibilidade parte dos elementos de cada signo. Fogo (Áries, Leão e Sagitário) e Ar (Gêmeos, Libra e Aquário) se complementam, assim como Terra (Touro, Virgem e Capricórnio) e Água (Câncer, Escorpião e Peixes). Signos do mesmo elemento tendem a ter afinidade natural, e combinações como Fogo com Água ou Terra com Ar costumam pedir mais esforço de adaptação.</p>
          <p>A calculadora parte dessa combinação de elementos para descrever a afinidade no amor, na amizade e no trabalho, com pontos fortes e desafios de cada par. Uma análise astrológica completa considera também ascendente, Lua e Vênus. Astrologia não tem comprovação científica: use o resultado como diversão, não para decidir um relacionamento.</p>
        </DirectAnswer>

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
            <CompatibilityResults
              result={result}
              signo1={signo1}
              signo2={signo2}
              showCopyToast={showCopyToast}
            />
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

      {copyToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-growth-green px-5 py-3 text-sm font-medium text-white shadow-lg">
          {copyToast}
        </div>
      )}
    </div>
  );
}
