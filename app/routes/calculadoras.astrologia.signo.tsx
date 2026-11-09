import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { buildCalculatorMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("signo"),
  ];
};

// Interfaces
interface SignoResult {
  nome: string;
  simbolo: string;
  elemento: string;
  planeta_regente: string;
  periodo: string;
  descricao_geral: string;
  personalidade: {
    caracteristicas_principais: string[];
    pontos_fortes: string[];
    desafios: string[];
  };
  vida_amorosa: {
    estilo_romantico: string[];
    compatibilidades: string[];
    desafios_amorosos: string[];
  };
  vida_profissional: {
    talentos_profissionais: string[];
    carreiras_ideais: string[];
    ambiente_trabalho_ideal: string[];
  };
  saude_bem_estar: {
    pontos_atencao: string[];
    atividades_recomendadas: string[];
  };
  dicas_desenvolvimento: string[];
}

// Função para calcular o signo solar
function calculateSolarSign(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // getMonth() retorna 0-11
  const day = date.getDate();

  // Datas baseadas no calendário astrológico tradicional
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "touro";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemeos";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leao";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgem";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "escorpiao";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagitario";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return "capricornio";
  if ((month === 1 && day >= 21) || (month === 2 && day <= 19)) return "aquario";
  if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) return "peixes";

  return "aries"; // fallback
}

// Função para buscar descrição completa do signo
async function fetchSignoDescription(signo: string): Promise<SignoResult> {
  const response = await fetch(`/api/signo-description?signo=${encodeURIComponent(signo)}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar descrição do signo");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Erro ao carregar dados do signo");
  }

  return data.data;
}

// Função para obter cores baseadas nos elementos dos signos
const getSignColors = (signo: string) => {
  const signElements: Record<
    string,
    { element: string; colors: { bg: string; text: string; accent: string; gradient: string } }
  > = {
    Áries: {
      element: "fogo",
      colors: {
        bg: "from-red-500 to-orange-500",
        text: "text-red-600",
        accent: "border-red-500",
        gradient: "bg-gradient-to-br from-red-500/10 to-orange-500/10",
      },
    },
    Leão: {
      element: "fogo",
      colors: {
        bg: "from-yellow-500 to-orange-500",
        text: "text-orange-600",
        accent: "border-yellow-500",
        gradient: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
      },
    },
    Sagitário: {
      element: "fogo",
      colors: {
        bg: "from-purple-500 to-pink-500",
        text: "text-purple-600",
        accent: "border-purple-500",
        gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      },
    },
    Touro: {
      element: "terra",
      colors: {
        bg: "from-green-600 to-emerald-600",
        text: "text-green-700",
        accent: "border-green-600",
        gradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      },
    },
    Virgem: {
      element: "terra",
      colors: {
        bg: "from-teal-600 to-green-600",
        text: "text-teal-700",
        accent: "border-teal-600",
        gradient: "bg-gradient-to-br from-teal-500/10 to-green-500/10",
      },
    },
    Capricórnio: {
      element: "terra",
      colors: {
        bg: "from-slate-600 to-gray-700",
        text: "text-slate-700",
        accent: "border-slate-600",
        gradient: "bg-gradient-to-br from-slate-500/10 to-gray-500/10",
      },
    },
    Gêmeos: {
      element: "ar",
      colors: {
        bg: "from-sky-500 to-blue-500",
        text: "text-sky-600",
        accent: "border-sky-500",
        gradient: "bg-gradient-to-br from-sky-500/10 to-blue-500/10",
      },
    },
    Libra: {
      element: "ar",
      colors: {
        bg: "from-pink-500 to-rose-500",
        text: "text-pink-600",
        accent: "border-pink-500",
        gradient: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
      },
    },
    Aquário: {
      element: "ar",
      colors: {
        bg: "from-cyan-500 to-blue-500",
        text: "text-cyan-600",
        accent: "border-cyan-500",
        gradient: "bg-gradient-to-br from-cyan-500/10 to-blue-500/10",
      },
    },
    Câncer: {
      element: "água",
      colors: {
        bg: "from-indigo-500 to-blue-600",
        text: "text-indigo-600",
        accent: "border-indigo-500",
        gradient: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
      },
    },
    Escorpião: {
      element: "água",
      colors: {
        bg: "from-red-600 to-red-800",
        text: "text-red-700",
        accent: "border-red-600",
        gradient: "bg-gradient-to-br from-red-500/10 to-red-500/10",
      },
    },
    Peixes: {
      element: "água",
      colors: {
        bg: "from-violet-500 to-purple-600",
        text: "text-violet-600",
        accent: "border-violet-500",
        gradient: "bg-gradient-to-br from-violet-50 to-purple-50",
      },
    },
  };

  return (
    signElements[signo] || {
      element: "neutro",
      colors: {
        bg: "from-gray-500 to-gray-600",
        text: "text-text-secondary-dark",
        accent: "border-gray-500",
        gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
      },
    }
  );
};

// Componente de resultado detalhado
const DetailedSignResult = ({ result }: { result: SignoResult }) => {
  const signColors = getSignColors(result.nome);

  return (
    <div className="mt-8 space-y-6">
      {/* Cabeçalho Principal */}
      <Card
        className={`relative overflow-hidden border-2 ${signColors.colors.accent} bg-gradient-to-br ${signColors.colors.bg} shadow-2xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex flex-col items-center justify-center gap-6 text-center md:flex-row">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="animate-pulse text-7xl drop-shadow-lg filter">
                  {result.simbolo}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/20 to-transparent blur-xl"></div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
                {result.nome}
              </h2>
              <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {result.elemento}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {result.planeta_regente}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-lg font-medium text-white/90">{result.periodo}</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-lg font-medium leading-relaxed text-white">
              {result.descricao_geral}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personalidade */}
      <Card
        className={`relative overflow-hidden border-l-4 ${signColors.colors.accent} ${signColors.colors.gradient} shadow-lg transition-all duration-300 hover:shadow-xl`}
      >
        <div className="absolute right-0 top-0 h-32 w-32 opacity-10">
          <div
            className={`h-full w-full bg-gradient-to-br ${signColors.colors.bg} rounded-full blur-3xl`}
          ></div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className={`rounded-full bg-gradient-to-br p-3 ${signColors.colors.bg} shadow-lg`}>
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <span className={`text-xl font-bold ${signColors.colors.text}`}>
                Personalidade de {result.nome}
              </span>
              <p className="mt-1 text-sm text-text-secondary-dark">Suas características principais</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-white/20 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className={`font-bold ${signColors.colors.text} mb-3 flex items-center gap-2`}>
                <span className="text-lg">🌟</span>
                Características Principais:
              </h5>
              <ul className="space-y-2">
                {result.personalidade.caracteristicas_principais.map(
                  (char: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={`${signColors.colors.text} mt-0.5 text-sm leading-none`}>
                        ●
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                        {char}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-lg border border-white/20 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-green-700">
                <span className="text-lg">💪</span>
                Pontos Fortes:
              </h5>
              <ul className="space-y-2">
                {result.personalidade.pontos_fortes.map((forte: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-green-600">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {forte}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-white/20 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-orange-700">
                <span className="text-lg">⚠️</span>
                Principais Desafios:
              </h5>
              <ul className="space-y-2">
                {result.personalidade.desafios.map((desafio: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-orange-600">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {desafio}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vida Amorosa */}
      <Card className="relative overflow-hidden border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-red-500/10 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute right-0 top-0 h-40 w-40 opacity-20">
          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-pink-400 to-red-400 blur-3xl"></div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-pink-500 to-red-500 p-3 shadow-lg">
              <span className="text-2xl">💖</span>
            </div>
            <div>
              <span className="text-xl font-bold text-pink-700">
                Vida Amorosa e Relacionamentos
              </span>
              <p className="mt-1 text-sm text-pink-600">Como {result.nome} ama e se relaciona</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-pink-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-pink-700">
                <span className="text-lg">💕</span>
                Estilo Romântico:
              </h5>
              <ul className="space-y-2">
                {result.vida_amorosa.estilo_romantico.map((estilo, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-pink-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {estilo}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-pink-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-pink-700">
                <span className="text-lg">✨</span>
                Compatibilidades:
              </h5>
              <ul className="space-y-2">
                {result.vida_amorosa.compatibilidades.map((comp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-pink-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {comp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-pink-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-orange-700">
                <span className="text-lg">⚡</span>
                Desafios Amorosos:
              </h5>
              <ul className="space-y-2">
                {result.vida_amorosa.desafios_amorosos.map((desafio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-orange-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {desafio}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vida Profissional */}
      <Card className="relative overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute bottom-0 left-0 h-40 w-40 opacity-20">
          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-3xl"></div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-3 shadow-lg">
              <span className="text-2xl">💼</span>
            </div>
            <div>
              <span className="text-xl font-bold text-blue-700">Carreira e Vida Profissional</span>
              <p className="mt-1 text-sm text-blue-600">O potencial de {result.nome} no trabalho</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-blue-700">
                <span className="text-lg">🎯</span>
                Talentos Profissionais:
              </h5>
              <ul className="space-y-2">
                {result.vida_profissional.talentos_profissionais.map((talento, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-blue-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {talento}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-blue-700">
                <span className="text-lg">💼</span>
                Carreiras Ideais:
              </h5>
              <div className="flex flex-wrap gap-2">
                {result.vida_profissional.carreiras_ideais.map((carreira, index) => (
                  <span
                    key={index}
                    className="transform cursor-default rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    {carreira}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-blue-700">
                <span className="text-lg">🏢</span>
                Ambiente Ideal:
              </h5>
              <ul className="space-y-2">
                {result.vida_profissional.ambiente_trabalho_ideal.map((ambiente, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-green-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {ambiente}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saúde e Bem-estar */}
      <Card className="relative overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute right-0 top-0 h-40 w-40 opacity-20">
          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-3xl"></div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 p-3 shadow-lg">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <span className="text-xl font-bold text-emerald-700">Saúde e Bem-estar</span>
              <p className="mt-1 text-sm text-emerald-600">Cuidados especiais para {result.nome}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-orange-700">
                <span className="text-lg">⚠️</span>
                Pontos de Atenção:
              </h5>
              <ul className="space-y-2">
                {result.saude_bem_estar.pontos_atencao.map((ponto, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-orange-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {ponto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-emerald-500/30 bg-background-secondary p-4 shadow-sm backdrop-blur-sm">
              <h5 className="mb-3 flex items-center gap-2 font-bold text-emerald-700">
                <span className="text-lg">🏃</span>
                Atividades Recomendadas:
              </h5>
              <ul className="space-y-2">
                {result.saude_bem_estar.atividades_recomendadas.map((atividade, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm leading-none text-emerald-500">●</span>
                    <span className="text-sm font-medium leading-relaxed text-text-primary-dark">
                      {atividade}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dicas de Desenvolvimento */}
      <Card className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-orange-500/10 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 transform opacity-10">
          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-amber-400 to-orange-400 blur-3xl"></div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 p-3 shadow-lg">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <span className="text-xl font-bold text-amber-700">
                Dicas de Desenvolvimento Pessoal
              </span>
              <p className="mt-1 text-sm text-amber-600">
                Como {result.nome} pode evoluir e crescer
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="rounded-lg border border-amber-500/30 bg-background-secondary p-6 shadow-md backdrop-blur-sm">
            <ul className="space-y-4">
              {result.dicas_desenvolvimento.map((dica, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-base font-medium leading-relaxed text-text-primary-dark">
                    {dica}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente principal
export default function CalculadoraSigno() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<SignoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate) {
      setError("Data de nascimento é obrigatória");
      return;
    }

    // Validar se a data não é futura
    const selectedDate = new Date(birthDate);
    const today = new Date();
    if (selectedDate > today) {
      setError("Data de nascimento não pode ser no futuro");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const signo = calculateSolarSign(birthDate);
      const signoData = await fetchSignoDescription(signo);
      setResult(signoData);
    } catch (err) {
      setError("Erro ao carregar informações do signo. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <ResponsiveBreadcrumb items={createCalculatorBreadcrumb("astrologia", "Signo Solar")} />

      <div className="space-y-8 px-3 py-6 sm:px-6">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.calculadoraonlinebr.com.br/#website",
                  url: "https://www.calculadoraonlinebr.com.br/",
                  name: "CalculadoraOnlineBR",
                  description:
                    "Calculadoras online gratuitas para matemática, finanças, saúde e astrologia",
                  inLanguage: "pt-BR",
                },
                {
                  "@type": "WebPage",
                  "@id":
                    "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo#webpage",
                  url: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo",
                  name: "Calculadora de Signo Solar Grátis 2026",
                  isPartOf: {
                    "@id": "https://www.calculadoraonlinebr.com.br/#website",
                  },
                  description:
                    "Descubra seu signo solar GRÁTIS! Cálculo rápido com apenas sua data de nascimento. Análise completa da personalidade, amor e carreira.",
                  inLanguage: "pt-BR",
                  breadcrumb: {
                    "@id":
                      "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo#breadcrumb",
                  },
                  mainEntity: {
                    "@id":
                      "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo#software",
                  },
                },
                {
                  "@type": "BreadcrumbList",
                  "@id":
                    "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Início",
                      item: "https://www.calculadoraonlinebr.com.br/",
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
                      name: "Astrologia",
                      item: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia",
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "Signo Solar",
                      item: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo",
                    },
                  ],
                },
                {
                  "@type": "SoftwareApplication",
                  "@id":
                    "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo#software",
                  name: "Calculadora de Signo Solar",
                  description:
                    "Calculadora gratuita para descobrir o signo solar com base apenas na data de nascimento. Análise completa da personalidade, vida amorosa e carreira.",
                  url: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo",
                  applicationCategory: "UtilitiesApplication",
                  operatingSystem: "Web",
                  permissions: "Não requer permissões especiais",
                  isAccessibleForFree: true,
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "BRL",
                    availability: "https://schema.org/InStock",
                  },
                  author: {
                    "@type": "Organization",
                    name: "CalculadoraOnlineBR",
                    url: "https://www.calculadoraonlinebr.com.br",
                  },
                  provider: {
                    "@type": "Organization",
                    name: "CalculadoraOnlineBR",
                  },
                  featureList: [
                    "Cálculo rápido do signo solar",
                    "Análise detalhada da personalidade",
                    "Compatibilidade amorosa",
                    "Orientação profissional",
                    "Dicas de desenvolvimento pessoal",
                    "Interface responsiva",
                  ],
                  screenshot: "https://www.calculadoraonlinebr.com.br/og/signo.jpg",
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/signo#faq",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "O que é o signo solar?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "O signo solar é o signo onde o Sol estava no momento do seu nascimento. Representa sua identidade central, personalidade essencial e propósito de vida. É o signo mais conhecido e fácil de descobrir, necessitando apenas da data de nascimento.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Necessito da hora de nascimento para descobrir meu signo solar?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Não! Para descobrir seu signo solar você necessita apenas da data de nascimento. O signo solar muda aproximadamente a cada 30 dias, diferente do ascendente que muda a cada 2 horas.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Qual a diferença entre signo solar e ascendente?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "O signo solar representa sua essência e identidade verdadeira - quem você é por dentro. O ascendente representa sua máscara social - como você se apresenta ao mundo. O solar é mais estável, enquanto o ascendente pode suavizar com a idade.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            🌟 Descobrir Meu Signo Grátis: Qual Signo Zodiacal 2026
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Descubra seu <strong className="text-math-purple-dark">signo solar</strong> e entenda
            sua personalidade essencial. O signo solar representa{" "}
            <strong className="text-primary-blue-dark">sua identidade central</strong> e propósito
            de vida.
          </p>
          <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              🌟 <strong>Só confiável da data</strong> • ✨ <strong>Análise Completa</strong> • 💖{" "}
              <strong>Compatibilidade Amorosa</strong> • 💼 <strong>Orientação Profissional</strong>
            </p>
          </div>
        </header>

        {/* Formulário */}
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Descubra seu Signo Solar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Data de nascimento */}
              <div>
                <label
                  htmlFor="birth-date"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Data de Nascimento: <span className="text-system-error">*</span>
                </label>
                <input
                  id="birth-date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-background-primary w-full rounded-lg border border-neutral-surface-variant p-3 text-text-primary transition-colors duration-200 focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  required
                />
                <small className="mt-1 block text-xs text-text-secondary">
                  💡 Só necessitamos da data! O signo solar não depende da hora de nascimento.
                </small>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-math-purple hover:bg-math-purple-dark"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Descobrindo seu signo...
                  </span>
                ) : (
                  "Descobrir Meu Signo Solar"
                )}
              </Button>

              {error && (
                <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
                  <p className="text-sm text-system-error">{error}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && (
          <div className="mx-auto max-w-4xl">
            <DetailedSignResult result={result} />
          </div>
        )}

        {/* Guia dos 12 Signos */}
        <Card className="border-l-4 border-math-purple bg-gradient-to-r from-math-purple/10 to-primary-blue/10 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
              🌟 Os 12 Signos do Zodíaco – Guia Completo 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Áries */}
              <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♈</span>
                  <div>
                    <h3 className="text-lg font-bold text-red-600">Áries</h3>
                    <p className="text-sm text-text-secondary-dark">21/03 - 19/04</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Dinâmico, corajoso e pioneiro. Lidera naturalmente e enfrenta desafios de cabeça
                  erguida.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Fogo
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Marte
                  </span>
                </div>
              </div>

              {/* Touro */}
              <div className="rounded-xl border border-green-600/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♉</span>
                  <div>
                    <h3 className="text-lg font-bold text-green-700">Touro</h3>
                    <p className="text-sm text-text-secondary-dark">20/04 - 20/05</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Estável, persistente e amante do conforto. Constrói relacionamentos e patrimônio
                  duradouros.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Terra
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Vênus
                  </span>
                </div>
              </div>

              {/* Gêmeos */}
              <div className="rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-blue-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♊</span>
                  <div>
                    <h3 className="text-lg font-bold text-sky-600">Gêmeos</h3>
                    <p className="text-sm text-text-secondary-dark">21/05 - 20/06</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Comunicativo, versátil e curioso. Mente ágil e facilidade para se adaptar a
                  qualquer situação.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">
                    Ar
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Mercúrio
                  </span>
                </div>
              </div>

              {/* Câncer */}
              <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♋</span>
                  <div>
                    <h3 className="text-lg font-bold text-indigo-600">Câncer</h3>
                    <p className="text-sm text-text-secondary-dark">21/06 - 22/07</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Emotivo, protetor e familiar. Intuição aguçada e forte conexão com o lar e
                  tradições.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                    Água
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Lua
                  </span>
                </div>
              </div>

              {/* Leão */}
              <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♌</span>
                  <div>
                    <h3 className="text-lg font-bold text-orange-600">Leão</h3>
                    <p className="text-sm text-text-secondary-dark">23/07 - 22/08</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Carismático, generoso e criativo. Presença marcante e talento natural para liderar
                  e inspirar.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                    Fogo
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Sol
                  </span>
                </div>
              </div>

              {/* Virgem */}
              <div className="rounded-xl border border-teal-600/20 bg-gradient-to-br from-teal-500/10 to-green-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♍</span>
                  <div>
                    <h3 className="text-lg font-bold text-teal-700">Virgem</h3>
                    <p className="text-sm text-text-secondary-dark">23/08 - 22/09</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Meticuloso, prático e prestativo. Busca a perfeição e tem talento para organizar e
                  servir.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700">
                    Terra
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Mercúrio
                  </span>
                </div>
              </div>

              {/* Libra */}
              <div className="rounded-xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♎</span>
                  <div>
                    <h3 className="text-lg font-bold text-pink-600">Libra</h3>
                    <p className="text-sm text-text-secondary-dark">23/09 - 22/10</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Equilibrado, charmoso e diplomático. Busca harmonia e tem senso estético refinado.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
                    Ar
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Vênus
                  </span>
                </div>
              </div>

              {/* Escorpião */}
              <div className="rounded-xl border border-red-600/20 bg-gradient-to-br from-red-500/10 to-red-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♏</span>
                  <div>
                    <h3 className="text-lg font-bold text-red-700">Escorpião</h3>
                    <p className="text-sm text-text-secondary-dark">23/10 - 21/11</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Intenso, transformador e magnético. Profundidade emocional e capacidade de
                  renovação total.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Água
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Plutão
                  </span>
                </div>
              </div>

              {/* Sagitário */}
              <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♐</span>
                  <div>
                    <h3 className="text-lg font-bold text-purple-600">Sagitário</h3>
                    <p className="text-sm text-text-secondary-dark">22/11 - 21/12</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Otimista, aventureiro e filosófico. Busca liberdade, conhecimento e novos
                  horizontes.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    Fogo
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Júpiter
                  </span>
                </div>
              </div>

              {/* Capricórnio */}
              <div className="rounded-xl border border-slate-600/20 bg-gradient-to-br from-slate-500/10 to-gray-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♑</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-700">Capricórnio</h3>
                    <p className="text-sm text-text-secondary-dark">22/12 - 20/01</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Ambicioso, disciplinado e responsável. Constrói carreira sólida e alcança
                  objetivos de longo prazo.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                    Terra
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Saturno
                  </span>
                </div>
              </div>

              {/* Aquário */}
              <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♒</span>
                  <div>
                    <h3 className="text-lg font-bold text-cyan-600">Aquário</h3>
                    <p className="text-sm text-text-secondary-dark">21/01 - 19/02</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Original, humanitário e visionário. Mente inovadora e desejo de contribuir para um
                  mundo melhor.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-700">
                    Ar
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Urano
                  </span>
                </div>
              </div>

              {/* Peixes */}
              <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-50 to-purple-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">♓</span>
                  <div>
                    <h3 className="text-lg font-bold text-violet-600">Peixes</h3>
                    <p className="text-sm text-text-secondary-dark">20/02 - 20/03</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary-dark">
                  Empático, criativo e espiritual. Sensibilidade artística e capacidade única de
                  compreender emoções.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">
                    Água
                  </span>
                  <span className="rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary-dark">
                    Netuno
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ
          title="Perguntas Frequentes - Calculadora de Signo Solar"
          items={[
            {
              question: "O que é o signo solar?",
              answer:
                "O signo solar é o signo onde o Sol estava no momento do seu nascimento. Representa sua identidade central, personalidade essencial e propósito de vida. É o signo mais conhecido e fácil de descobrir, necessitando apenas da data de nascimento.",
              borderColor: "math-purple",
            },
            {
              question: "Necessito da hora de nascimento para descobrir meu signo solar?",
              answer:
                "Não! Para descobrir seu signo solar você necessita apenas da data de nascimento. O signo solar muda aproximadamente a cada 30 dias, diferente do ascendente que muda a cada 2 horas.",
              borderColor: "primary-blue",
            },
            {
              question: "Qual a diferença entre signo solar e ascendente?",
              answer:
                "O signo solar representa sua essência e identidade verdadeira - quem você é por dentro. O ascendente representa sua máscara social - como você se apresenta ao mundo. O solar é mais estável, enquanto o ascendente pode suavizar com a idade.",
              borderColor: "system-info",
            },
            {
              question: "Por que meu signo solar é importante?",
              answer:
                "O signo solar revela suas características fundamentais, valores pessoais, forma de expressar criatividade, e seu propósito de vida. Ele representa 'quem você é' no nível mais profundo e como você brilha no mundo.",
              borderColor: "system-warning",
            },
            {
              question: "Posso ter características de outros signos?",
              answer:
                "Sim! Você também é influenciado pela posição da Lua (emoções), Ascendente (máscara social), e outros planetas no seu mapa astral. É normal se identificar com características de vários signos, especialmente os que fazem aspectos com seu Sol.",
              borderColor: "growth-green",
            },
            {
              question: "Como usar as informações do meu signo solar?",
              answer:
                "Use as características do seu signo para autoconhecimento e desenvolvimento pessoal. Entenda seus pontos fortes para potencializá-los, reconheça seus desafios para trabalhar neles, e use as dicas de carreira e relacionamento como orientação.",
              borderColor: "system-error-dark",
            },
          ]}
          tipSection={{
            title: "Dica Importante sobre Signo Solar",
            content:
              "<strong>Para maior autoconhecimento:</strong> seu signo solar é apenas uma parte da sua personalidade astrológica. Combine com seu ascendente (máscara social) e signo lunar (emoções) para uma visão mais completa de quem você é.",
          }}
          footerText="<strong>Lembre-se:</strong> A astrologia é uma ferramenta de autoconhecimento e reflexão. Use as informações para crescimento pessoal, sempre mantendo seu livre arbítrio e responsabilidade pessoal."
        />

        {/* Footer com informações adicionais */}
        <Card className="border-l-4 border-math-purple bg-math-purple/5 duration-300">
          <CardHeader>
            <CardTitle as="h2" className="text-lg font-bold text-text-primary">
              📚 Como Usar Esta Calculadora de Signo Solar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                Esta <strong className="text-math-purple-dark">calculadora de signo solar</strong>{" "}
                utiliza{" "}
                <strong className="text-primary-blue-dark">
                  as datas tradicionais da astrologia
                </strong>{" "}
                para determinar o signo onde o Sol estava no momento do seu nascimento.
              </p>
              <p>
                <strong>Dados necessários:</strong> Apenas a data de nascimento. O signo solar não
                depende da hora ou local, mudando aproximadamente a cada 30 dias.
              </p>
              <p>
                <strong className="text-system-warning">Importante:</strong> Esta ferramenta oferece
                uma
                <strong> análise completa da personalidade, vida amorosa e carreira</strong> baseada
                no seu signo solar para fins de autoconhecimento.
              </p>
              <p className="mt-4 border-t border-math-purple/20 pt-3 text-xs opacity-75">
                🌟 Só confiável da data • ✨ Análise completa de personalidade • 💖 Compatibilidade
                amorosa • 💼 Orientação profissional • 🌱 Dicas de desenvolvimento • 📱 100%
                responsivo
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedCalculators category="astrologia" />
      </div>
    </div>
  );
}
