import type { MetaFunction } from "@remix-run/node";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";

export const meta: MetaFunction = () => {
  return [
    { title: "Compatibilidade de Signos – Teste Grátis Amor e Amizade" },
    {
      name: "description",
      content:
        "Teste a compatibilidade entre signos grátis. Descubra afinidade amorosa, amizade e trabalho com análise detalhada e dicas personalizadas.",
    },
    {
      name: "keywords",
      content:
        "compatibilidade signos grátis, teste compatibilidade amorosa, afinidade signos zodiacais, relacionamento astrologia, sinastria online, combinação signos amor",
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
      content: "Compatibilidade de Signos – Teste Grátis Amor e Amizade",
    },
    {
      property: "og:description",
      content: "Teste a compatibilidade entre signos grátis. Descubra afinidade amorosa, amizade e trabalho com análise detalhada e dicas personalizadas.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/compatibilidade-signos.jpg",
    },
    {
      property: "og:image:alt",
      content: "Calculadora de Compatibilidade de Signos - Interface mostrando teste de afinidade entre signos zodiacais",
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
      content: "Teste Compatibilidade de Signos GRÁTIS 2025 - Amor, Amizade e Trabalho",
    },
    {
      name: "twitter:description",
      content: "✨ Descubra GRÁTIS a compatibilidade entre signos! Teste completo para amor, amizade e trabalho. Análise detalhada + dicas personalizadas. Experimente já!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-images/compatibilidade-signos.jpg",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Compatibilidade de Signos - Interface mostrando teste de afinidade entre signos zodiacais",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
    },
  ];
};

// Interfaces
interface CompatibilityResult {
  geral: {
    porcentagem: number;
    categoria: string;
    resumo: string;
  };
  amor: {
    porcentagem: number;
    atração_inicial: string;
    relacionamento_longo_prazo: string;
    desafios_principais: string[];
    pontos_fortes: string[];
  };
  amizade: {
    porcentagem: number;
    tipo_amizade: string;
    atividades_conjuntas: string[];
    conflitos_possíveis: string[];
  };
  trabalho: {
    porcentagem: number;
    dinamica_profissional: string;
    roles_ideais: string[];
    potencial_sociedade: string;
  };
  elementos: {
    combinacao: string;
    sinergia: string;
    energia_dominante: string;
  };
  dicas_relacionamento: string[];
  pontos_crescimento: string[];
}

// Lista dos signos com informações básicas
const SIGNOS = [
  { id: "aries", nome: "Áries", simbolo: "♈", elemento: "Fogo", modalidade: "Cardeal", planeta: "Marte" },
  { id: "touro", nome: "Touro", simbolo: "♉", elemento: "Terra", modalidade: "Fixo", planeta: "Vênus" },
  { id: "gemeos", nome: "Gêmeos", simbolo: "♊", elemento: "Ar", modalidade: "Mutável", planeta: "Mercúrio" },
  { id: "cancer", nome: "Câncer", simbolo: "♋", elemento: "Água", modalidade: "Cardeal", planeta: "Lua" },
  { id: "leao", nome: "Leão", simbolo: "♌", elemento: "Fogo", modalidade: "Fixo", planeta: "Sol" },
  { id: "virgem", nome: "Virgem", simbolo: "♍", elemento: "Terra", modalidade: "Mutável", planeta: "Mercúrio" },
  { id: "libra", nome: "Libra", simbolo: "♎", elemento: "Ar", modalidade: "Cardeal", planeta: "Vênus" },
  { id: "escorpiao", nome: "Escorpião", simbolo: "♏", elemento: "Água", modalidade: "Fixo", planeta: "Plutão" },
  { id: "sagitario", nome: "Sagitário", simbolo: "♐", elemento: "Fogo", modalidade: "Mutável", planeta: "Júpiter" },
  { id: "capricornio", nome: "Capricórnio", simbolo: "♑", elemento: "Terra", modalidade: "Cardeal", planeta: "Saturno" },
  { id: "aquario", nome: "Aquário", simbolo: "♒", elemento: "Ar", modalidade: "Fixo", planeta: "Urano" },
  { id: "peixes", nome: "Peixes", simbolo: "♓", elemento: "Água", modalidade: "Mutável", planeta: "Netuno" },
];

// Função para calcular compatibilidade entre signos
function calculateCompatibility(signo1: string, signo2: string): CompatibilityResult {
  const s1 = SIGNOS.find(s => s.id === signo1);
  const s2 = SIGNOS.find(s => s.id === signo2);
  
  if (!s1 || !s2) {
    throw new Error("Signos inválidos");
  }

  // Matriz de compatibilidade baseada em pesquisa astrológica
  const compatibilityMatrix: Record<string, Record<string, number>> = {
    aries: { aries: 85, touro: 45, gemeos: 78, cancer: 40, leao: 95, virgem: 35, libra: 88, escorpiao: 55, sagitario: 92, capricornio: 42, aquario: 85, peixes: 50 },
    touro: { aries: 45, touro: 75, gemeos: 40, cancer: 85, leao: 60, virgem: 95, libra: 70, escorpiao: 88, sagitario: 35, capricornio: 92, aquario: 30, peixes: 78 },
    gemeos: { aries: 78, touro: 40, gemeos: 80, cancer: 55, leao: 85, virgem: 60, libra: 95, escorpiao: 45, sagitario: 88, capricornio: 35, aquario: 92, peixes: 65 },
    cancer: { aries: 40, touro: 85, gemeos: 55, cancer: 80, leao: 65, virgem: 88, libra: 60, escorpiao: 95, sagitario: 40, capricornio: 78, aquario: 45, peixes: 92 },
    leao: { aries: 95, touro: 60, gemeos: 85, cancer: 65, leao: 85, virgem: 50, libra: 88, escorpiao: 70, sagitario: 95, capricornio: 55, aquario: 88, peixes: 60 },
    virgem: { aries: 35, touro: 95, gemeos: 60, cancer: 88, leao: 50, virgem: 85, libra: 75, escorpiao: 82, sagitario: 45, capricornio: 95, aquario: 55, peixes: 80 },
    libra: { aries: 88, touro: 70, gemeos: 95, cancer: 60, leao: 88, virgem: 75, libra: 85, escorpiao: 65, sagitario: 82, capricornio: 60, aquario: 95, peixes: 70 },
    escorpiao: { aries: 55, touro: 88, gemeos: 45, cancer: 95, leao: 70, virgem: 82, libra: 65, escorpiao: 90, sagitario: 60, capricornio: 85, aquario: 55, peixes: 95 },
    sagitario: { aries: 92, touro: 35, gemeos: 88, cancer: 40, leao: 95, virgem: 45, libra: 82, escorpiao: 60, sagitario: 85, capricornio: 50, aquario: 92, peixes: 65 },
    capricornio: { aries: 42, touro: 92, gemeos: 35, cancer: 78, leao: 55, virgem: 95, libra: 60, escorpiao: 85, sagitario: 50, capricornio: 85, aquario: 60, peixes: 82 },
    aquario: { aries: 85, touro: 30, gemeos: 92, cancer: 45, leao: 88, virgem: 55, libra: 95, escorpiao: 55, sagitario: 92, capricornio: 60, aquario: 85, peixes: 68 },
    peixes: { aries: 50, touro: 78, gemeos: 65, cancer: 92, leao: 60, virgem: 80, libra: 70, escorpiao: 95, sagitario: 65, capricornio: 82, aquario: 68, peixes: 85 },
  };

  const compatibilityScore = compatibilityMatrix[signo1]?.[signo2] || 50;

  // Análise por elementos
  const elementoCompatibility = {
    "Fogo-Fogo": { sinergia: "Paixão intensa e energia contagiante", energia: "Dinâmica e explosiva" },
    "Fogo-Terra": { sinergia: "Fogo aquece a Terra, Terra sustenta o Fogo", energia: "Construtiva mas desafiadora" },
    "Fogo-Ar": { sinergia: "Ar alimenta o Fogo, criando chamas brilhantes", energia: "Estimulante e criativa" },
    "Fogo-Água": { sinergia: "Opostos que podem se complementar ou se anular", energia: "Intensa e transformadora" },
    "Terra-Terra": { sinergia: "Estabilidade e construção sólida", energia: "Prática e duradoura" },
    "Terra-Ar": { sinergia: "Ar traz leveza à Terra prática", energia: "Equilibrada e produtiva" },
    "Terra-Água": { sinergia: "Água nutre a Terra, Terra dá forma à Água", energia: "Nutritiva e fértil" },
    "Ar-Ar": { sinergia: "Mentes que se conectam e se inspiram", energia: "Intelectual e comunicativa" },
    "Ar-Água": { sinergia: "Ar movimenta as águas emocionais", energia: "Fluida e inspiradora" },
    "Água-Água": { sinergia: "Profundidade emocional e conexão psíquica", energia: "Intuitiva e curativa" },
  };

  const combinacaoElementos = `${s1.elemento}-${s2.elemento}` === `${s2.elemento}-${s1.elemento}` ? 
    `${s1.elemento}-${s2.elemento}` : 
    elementoCompatibility[`${s2.elemento}-${s1.elemento}` as keyof typeof elementoCompatibility] ? 
      `${s2.elemento}-${s1.elemento}` : `${s1.elemento}-${s2.elemento}`;

  const elementInfo = elementoCompatibility[combinacaoElementos as keyof typeof elementoCompatibility] || 
    { sinergia: "Combinação única com potencial de crescimento", energia: "Variável e adaptável" };

  // Determinar categoria de compatibilidade
  let categoria = "";
  let resumo = "";
  
  if (compatibilityScore >= 90) {
    categoria = "Compatibilidade Excepcional";
    resumo = "Uma combinação rara e especial! Vocês têm tudo para formar uma parceria extraordinária, seja no amor, amizade ou trabalho.";
  } else if (compatibilityScore >= 80) {
    categoria = "Alta Compatibilidade";
    resumo = "Excelente afinidade! Vocês se complementam naturalmente e têm grandes chances de sucesso em qualquer tipo de relacionamento.";
  } else if (compatibilityScore >= 70) {
    categoria = "Boa Compatibilidade";
    resumo = "Uma combinação promissora! Com um pouco de esforço e compreensão mútua, vocês podem construir algo sólido e duradouro.";
  } else if (compatibilityScore >= 50) {
    categoria = "Compatibilidade Moderada";
    resumo = "Há potencial, mas exigirá trabalho. As diferenças podem ser desafiadoras, mas também podem levar ao crescimento mútuo.";
  } else {
    categoria = "Compatibilidade Desafiadora";
    resumo = "Uma combinação que requer dedicação extra. As diferenças são significativas, mas não impossíveis de superar com amor e paciência.";
  }

  return {
    geral: {
      porcentagem: compatibilityScore,
      categoria,
      resumo,
    },
    amor: {
      porcentagem: Math.max(30, compatibilityScore - 10),
      atração_inicial: compatibilityScore >= 80 ? 
        "Forte atração magnética desde o primeiro encontro" : 
        compatibilityScore >= 60 ? 
          "Interesse gradual que cresce com o tempo" : 
          "Atração que pode surgir através da amizade",
      relacionamento_longo_prazo: compatibilityScore >= 75 ?
        "Excelente potencial para relacionamento duradouro e satisfatório" :
        compatibilityScore >= 50 ?
          "Relacionamento estável possível com comunicação e compromisso" :
          "Requer muito trabalho e compreensão mútua para funcionar a longo prazo",
      desafios_principais: compatibilityScore >= 70 ? 
        ["Pequenos ajustes de personalidade", "Diferentes ritmos de vida"] :
        ["Estilos de comunicação diferentes", "Prioridades de vida distintas", "Necessidades emocionais variadas"],
      pontos_fortes: compatibilityScore >= 80 ?
        ["Química natural", "Compreensão mútua profunda", "Objetivos alinhados"] :
        compatibilityScore >= 60 ?
          ["Respeito mútuo", "Potencial de crescimento junto", "Complementaridade"] :
          ["Oportunidade de aprendizado", "Crescimento pessoal", "Desafio estimulante"],
    },
    amizade: {
      porcentagem: Math.min(95, compatibilityScore + 15),
      tipo_amizade: compatibilityScore >= 80 ?
        "Amizade profunda e duradoura, quase fraternal" :
        compatibilityScore >= 60 ?
          "Amizade sólida com interesses em comum" :
          "Amizade baseada em respeito mútuo e diferenças interessantes",
      atividades_conjuntas: compatibilityScore >= 75 ?
        ["Viagens e aventuras", "Hobbies criativos", "Conversas profundas", "Projetos em equipe"] :
        ["Eventos sociais", "Atividades culturais", "Exercícios físicos", "Estudos e aprendizado"],
      conflitos_possíveis: compatibilityScore >= 70 ?
        ["Mal-entendidos ocasionais", "Ciúmes raros"] :
        ["Diferenças de opinião", "Estilos de vida conflitantes", "Expectativas diferentes"],
    },
    trabalho: {
      porcentagem: compatibilityScore,
      dinamica_profissional: compatibilityScore >= 80 ?
        "Parceria produtiva com sinergia natural e resultados excepcionais" :
        compatibilityScore >= 60 ?
          "Colaboração eficaz com complementaridade de habilidades" :
          "Trabalho conjunto possível com papéis bem definidos",
      roles_ideais: compatibilityScore >= 75 ?
        ["Co-fundadores", "Parceiros de negócio", "Equipe de liderança"] :
        ["Departamentos diferentes", "Projetos específicos", "Consultoria mútua"],
      potencial_sociedade: compatibilityScore >= 70 ?
        "Alto potencial para sociedade bem-sucedida" :
        compatibilityScore >= 50 ?
          "Sociedade possível com acordos claros" :
          "Melhor como colaboradores eventuais",
    },
    elementos: {
      combinacao: combinacaoElementos,
      sinergia: elementInfo.sinergia,
      energia_dominante: elementInfo.energia,
    },
    dicas_relacionamento: compatibilityScore >= 80 ? [
      "Mantenham a espontaneidade e novidade na relação",
      "Celebrem suas afinidades naturais",
      "Apoiem os sonhos e objetivos um do outro",
      "Criem tradições especiais juntos"
    ] : compatibilityScore >= 60 ? [
      "Pratiquem a comunicação aberta e honesta",
      "Respeitem as diferenças individuais",
      "Encontrem atividades que ambos gostem",
      "Seja paciente com os defeitos do outro"
    ] : [
      "Invistam tempo para se conhecerem profundamente",
      "Busquem pontos em comum para se conectarem",
      "Pratiquem a paciência e a tolerância",
      "Considerem aconselhamento quando necessário"
    ],
    pontos_crescimento: compatibilityScore >= 70 ? [
      "Explorem novos horizontes juntos",
      "Desenvolvam projetos criativos em parceria",
      "Fortaleçam ainda mais a confiança mútua"
    ] : [
      "Trabalhem na compreensão das necessidades do outro",
      "Desenvolvam habilidades de comunicação",
      "Aprendam a valorizar as diferenças",
      "Construam uma base sólida de respeito mútuo"
    ],
  };
}

// Função para obter cores baseadas na porcentagem de compatibilidade
const getCompatibilityColors = (porcentagem: number) => {
  if (porcentagem >= 90) {
    return {
      bg: "from-emerald-500 to-green-600",
      text: "text-emerald-700",
      accent: "border-emerald-500",
      gradient: "bg-gradient-to-br from-emerald-50 to-green-50",
      ring: "ring-emerald-500/30",
    };
  } else if (porcentagem >= 80) {
    return {
      bg: "from-green-500 to-emerald-500",
      text: "text-green-700",
      accent: "border-green-500",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50",
      ring: "ring-green-500/30",
    };
  } else if (porcentagem >= 70) {
    return {
      bg: "from-lime-500 to-green-500",
      text: "text-lime-700",
      accent: "border-lime-500",
      gradient: "bg-gradient-to-br from-lime-50 to-green-50",
      ring: "ring-lime-500/30",
    };
  } else if (porcentagem >= 50) {
    return {
      bg: "from-yellow-500 to-orange-500",
      text: "text-yellow-700",
      accent: "border-yellow-500",
      gradient: "bg-gradient-to-br from-yellow-50 to-orange-50",
      ring: "ring-yellow-500/30",
    };
  } else {
    return {
      bg: "from-orange-500 to-red-500",
      text: "text-orange-700",
      accent: "border-orange-500",
      gradient: "bg-gradient-to-br from-orange-50 to-red-50",
      ring: "ring-orange-500/30",
    };
  }
};

// Componente de resultado detalhado
const DetailedCompatibilityResult = ({ result, signo1, signo2 }: { result: CompatibilityResult; signo1: string; signo2: string }) => {
  const s1 = SIGNOS.find(s => s.id === signo1)!;
  const s2 = SIGNOS.find(s => s.id === signo2)!;
  const colors = getCompatibilityColors(result.geral.porcentagem);

  return (
    <div className="mt-8 space-y-6">
      {/* Resultado Geral */}
      <Card className={`relative overflow-hidden border-2 ${colors.accent} bg-gradient-to-br ${colors.bg} shadow-2xl`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex flex-col items-center justify-center gap-6 text-center md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="animate-pulse text-5xl drop-shadow-lg filter" aria-label={`Símbolo do signo ${s1.nome}`}>
                    {s1.simbolo}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">{s1.nome}</h3>
                  <p className="text-sm text-white/80">{s1.elemento}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-3xl" aria-label="Ícone de corações representando amor">💕</span>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white" role="meter" aria-valuenow={result.geral.porcentagem} aria-valuemin="0" aria-valuemax="100">
                    {result.geral.porcentagem}%
                  </div>
                  <p className="text-sm text-white/80">Compatibilidade</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">{s2.nome}</h3>
                  <p className="text-sm text-white/80">{s2.elemento}</p>
                </div>
                <div className="relative">
                  <span className="animate-pulse text-5xl drop-shadow-lg filter" aria-label={`Símbolo do signo ${s2.nome}`}>
                    {s2.simbolo}
                  </span>
                </div>
              </div>
            </div>
          </CardTitle>
          
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-white">{result.geral.categoria}</h2>
            <p className="mt-2 text-lg text-white/90">{result.geral.resumo}</p>
          </div>
        </CardHeader>
      </Card>

      {/* Compatibilidade por Área */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Amor */}
        <Card className="relative overflow-hidden border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-br from-pink-500 to-red-500 p-3">
                <span className="text-xl" aria-label="Ícone de coração brilhante">💖</span>
              </div>
              <div>
                <span className="text-lg font-bold text-pink-700">Amor</span>
                <p className="text-2xl font-bold text-pink-600">{result.amor.porcentagem}%</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold text-pink-700 mb-2">Atração Inicial:</h5>
              <p className="text-sm text-gray-700">{result.amor.atração_inicial}</p>
            </div>
            <div>
              <h5 className="font-semibold text-pink-700 mb-2">Longo Prazo:</h5>
              <p className="text-sm text-gray-700">{result.amor.relacionamento_longo_prazo}</p>
            </div>
          </CardContent>
        </Card>

        {/* Amizade */}
        <Card className="relative overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3">
                <span className="text-xl" aria-label="Ícone de aperto de mãos">🤝</span>
              </div>
              <div>
                <span className="text-lg font-bold text-blue-700">Amizade</span>
                <p className="text-2xl font-bold text-blue-600">{result.amizade.porcentagem}%</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold text-blue-700 mb-2">Tipo de Amizade:</h5>
              <p className="text-sm text-gray-700">{result.amizade.tipo_amizade}</p>
            </div>
            <div>
              <h5 className="font-semibold text-blue-700 mb-2">Atividades:</h5>
              <div className="flex flex-wrap gap-1">
                {result.amizade.atividades_conjuntas.slice(0, 3).map((atividade, index) => (
                  <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                    {atividade}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trabalho */}
        <Card className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 p-3">
                <span className="text-xl" aria-label="Ícone de maleta de trabalho">💼</span>
              </div>
              <div>
                <span className="text-lg font-bold text-purple-700">Trabalho</span>
                <p className="text-2xl font-bold text-purple-600">{result.trabalho.porcentagem}%</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold text-purple-700 mb-2">Dinâmica:</h5>
              <p className="text-sm text-gray-700">{result.trabalho.dinamica_profissional}</p>
            </div>
            <div>
              <h5 className="font-semibold text-purple-700 mb-2">Potencial Sociedade:</h5>
              <p className="text-sm text-gray-700">{result.trabalho.potencial_sociedade}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise dos Elementos */}
      <Card className="relative overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 p-3">
              <span className="text-xl">🌟</span>
            </div>
            <span className="text-xl font-bold text-amber-700">Análise dos Elementos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h5 className="font-semibold text-amber-700 mb-2">Combinação:</h5>
              <p className="text-lg font-medium text-gray-800">{result.elementos.combinacao}</p>
            </div>
            <div>
              <h5 className="font-semibold text-amber-700 mb-2">Energia Dominante:</h5>
              <p className="text-lg font-medium text-gray-800">{result.elementos.energia_dominante}</p>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-amber-700 mb-2">Sinergia:</h5>
            <p className="text-base text-gray-700">{result.elementos.sinergia}</p>
          </div>
        </CardContent>
      </Card>

      {/* Pontos Fortes e Desafios */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-3">
                <span className="text-xl">💪</span>
              </div>
              <span className="text-lg font-bold text-green-700">Pontos Fortes do Relacionamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.amor.pontos_fortes.map((ponto, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-sm text-green-600">●</span>
                  <span className="text-sm font-medium text-gray-800">{ponto}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-br from-orange-500 to-red-500 p-3">
                <span className="text-xl">⚠️</span>
              </div>
              <span className="text-lg font-bold text-orange-700">Desafios Principais</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.amor.desafios_principais.map((desafio, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-sm text-orange-600">●</span>
                  <span className="text-sm font-medium text-gray-800">{desafio}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Dicas de Relacionamento */}
      <Card className="relative overflow-hidden border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-3">
              <span className="text-xl">💡</span>
            </div>
            <span className="text-xl font-bold text-indigo-700">Dicas para Fortalecer o Relacionamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.dicas_relacionamento.map((dica, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-base font-medium text-gray-800 flex-1">{dica}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Potencial de Crescimento */}
      <Card className="relative overflow-hidden border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-3">
              <span className="text-xl">🌱</span>
            </div>
            <span className="text-xl font-bold text-violet-700">Potencial de Crescimento Juntos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.pontos_crescimento.map((ponto, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 text-sm text-violet-600">✨</span>
                <span className="text-base font-medium text-gray-800">{ponto}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente principal
export default function CalculadoraCompatibilidadeSignos() {
  const [signo1, setSigno1] = useState<string>("");
  const [signo2, setSigno2] = useState<string>("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signo1 || !signo2) {
      setError("Selecione os dois signos para comparar");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const compatibilityResult = calculateCompatibility(signo1, signo2);
      setResult(compatibilityResult);
    } catch (err) {
      setError("Erro ao calcular compatibilidade. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapSignos = () => {
    const temp = signo1;
    setSigno1(signo2);
    setSigno2(temp);
  };

  // Lazy loading para componentes pesados
  const [shouldLoadResults, setShouldLoadResults] = useState(false);
  
  React.useEffect(() => {
    if (result) {
      setShouldLoadResults(true);
    }
  }, [result]);

  return (
    <div className="min-h-screen space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/astrologia">Astrologia</BreadcrumbItem>
        <BreadcrumbItem isLast>Compatibilidade de Signos</BreadcrumbItem>
      </Breadcrumb>

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
                "url": "https://www.calculadoraonlinebr.com.br/",
                "name": "CalculadoraOnlineBR",
                "description": "Calculadoras online gratuitas para matemática, finanças, saúde e astrologia",
                "inLanguage": "pt-BR",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.calculadoraonlinebr.com.br/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos#webpage",
                "url": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
                "name": "Teste Compatibilidade de Signos GRÁTIS 2025 - Amor, Amizade e Trabalho",
                "isPartOf": {
                  "@id": "https://www.calculadoraonlinebr.com.br/#website"
                },
                "description": "✨ Descubra GRÁTIS a compatibilidade entre signos! Teste completo para amor, amizade e trabalho. Análise detalhada + dicas personalizadas. Experimente já!",
                "inLanguage": "pt-BR",
                "breadcrumb": {
                  "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos#breadcrumb"
                },
                "mainEntity": {
                  "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos#software"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Início",
                    "item": "https://www.calculadoraonlinebr.com.br/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Calculadoras",
                    "item": "https://www.calculadoraonlinebr.com.br/calculadoras"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Astrologia",
                    "item": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Compatibilidade de Signos",
                    "item": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos"
                  }
                ]
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos#software",
                "name": "Calculadora de Compatibilidade de Signos",
                "description": "Teste gratuito de compatibilidade astrológica entre signos do zodíaco. Análise completa para amor, amizade e trabalho com dicas personalizadas.",
                "url": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Web",
                "permissions": "Não requer permissões especiais",
                "isAccessibleForFree": true,
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "BRL",
                  "availability": "https://schema.org/InStock"
                },
                "author": {
                  "@type": "Organization",
                  "name": "CalculadoraOnlineBR",
                  "url": "https://www.calculadoraonlinebr.com.br"
                },
                "provider": {
                  "@type": "Organization",
                  "name": "CalculadoraOnlineBR"
                },
                "featureList": [
                  "Teste de compatibilidade entre todos os signos",
                  "Análise detalhada para amor, amizade e trabalho",
                  "Porcentagem de afinidade",
                  "Dicas personalizadas de relacionamento",
                  "Análise dos elementos astrológicos",
                  "Interface responsiva"
                ],
                "screenshot": "https://www.calculadoraonlinebr.com.br/og-images/compatibilidade-signos.jpg"
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.calculadoraonlinebr.com.br/calculadoras/astrologia/compatibilidade-signos#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Como funciona a compatibilidade entre signos?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A compatibilidade entre signos é baseada nos elementos (Fogo, Terra, Ar, Água), modalidades (Cardeal, Fixo, Mutável) e características planetárias de cada signo. Signos do mesmo elemento tendem a se entender bem, enquanto elementos complementares (como Fogo e Ar) criam sinergias interessantes."
                    }
                  },
                  {
                    "@type": "Question", 
                    "name": "Signos incompatíveis não podem se relacionar?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Não! Compatibilidade baixa não significa relacionamento impossível. Muitas vezes, as diferenças podem ser complementares e gerar crescimento mútuo. Com comunicação, paciência e amor, qualquer combinação pode funcionar."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* Header */}
      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Compatibilidade de Signos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Descubra a <strong className="text-math-purple-dark">compatibilidade astrológica</strong>{" "}
          entre dois signos do zodíaco. Análise completa para{" "}
          <strong className="text-primary-blue-dark">amor, amizade e trabalho</strong> com dicas personalizadas.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            <span aria-label="Ícone de corações">💕</span> <strong>Análise Completa</strong> • <span aria-label="Ícone de alvo">🎯</span> <strong>3 Áreas</strong> • <span aria-label="Ícone de estrelas">✨</span>{" "}
            <strong>Dicas Personalizadas</strong> • <span aria-label="Ícone de gráfico">📊</span> <strong>Porcentagem de Afinidade</strong>
          </p>
        </div>
      </header>

      {/* Formulário */}
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Teste de Compatibilidade entre Signos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Primeiro Signo */}
              <div>
                <label
                  htmlFor="signo1"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Primeiro Signo: <span className="text-system-error">*</span>
                </label>
                <select
                  id="signo1"
                  value={signo1}
                  onChange={(e) => setSigno1(e.target.value)}
                  className="bg-background-primary w-full rounded-lg border border-neutral-surface-variant p-3 text-text-primary transition-colors duration-200 focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  required
                >
                  <option value="">Selecione o primeiro signo</option>
                  {SIGNOS.map((signo) => (
                    <option key={signo.id} value={signo.id}>
                      {signo.simbolo} {signo.nome} ({signo.elemento})
                    </option>
                  ))}
                </select>
              </div>

              {/* Segundo Signo */}
              <div>
                <label
                  htmlFor="signo2"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Segundo Signo: <span className="text-system-error">*</span>
                </label>
                <select
                  id="signo2"
                  value={signo2}
                  onChange={(e) => setSigno2(e.target.value)}
                  className="bg-background-primary w-full rounded-lg border border-neutral-surface-variant p-3 text-text-primary transition-colors duration-200 focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  required
                >
                  <option value="">Selecione o segundo signo</option>
                  {SIGNOS.map((signo) => (
                    <option key={signo.id} value={signo.id}>
                      {signo.simbolo} {signo.nome} ({signo.elemento})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botão de trocar signos */}
            {signo1 && signo2 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSwapSignos}
                  className="flex items-center gap-2 rounded-lg border border-primary-blue/30 bg-primary-blue/10 px-4 py-2 text-sm font-medium text-primary-blue hover:bg-primary-blue/20 transition-colors"
                >
                  <span aria-label="Ícone de setas circulares">🔄</span> Trocar Signos
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-math-purple hover:bg-math-purple-dark"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Analisando compatibilidade...
                </span>
              ) : (
                "Calcular Compatibilidade"
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
      {result && shouldLoadResults && (
        <div className="mx-auto max-w-6xl">
          <DetailedCompatibilityResult result={result} signo1={signo1} signo2={signo2} />
        </div>
      )}

      {/* Guia de Compatibilidade por Elementos */}
      <Card className="border-l-4 border-math-purple bg-gradient-to-r from-math-purple/10 to-primary-blue/10 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-2xl font-bold text-text-primary">
            🌟 Compatibilidade por Elementos – Guia 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Fogo */}
            <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-50 to-orange-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-label="Ícone de fogo">🔥</span>
                <div>
                  <h3 className="text-lg font-bold text-red-600">Signos de Fogo</h3>
                  <p className="text-sm text-gray-600">Áries, Leão, Sagitário</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Paixão, energia e iniciativa.</strong> Se dão bem entre si e com signos de Ar, que alimentam sua chama criativa.
              </p>
              <div className="space-y-2">
                <div className="text-xs"><strong>Melhor com:</strong> Outros Fogos, Ar (Gêmeos, Libra, Aquário)</div>
                <div className="text-xs"><strong>Desafiador com:</strong> Água (pode se anular), Terra (pode se cansar)</div>
              </div>
            </div>

            {/* Terra */}
            <div className="rounded-xl border border-green-600/20 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-label="Ícone de planta">🌱</span>
                <div>
                  <h3 className="text-lg font-bold text-green-700">Signos de Terra</h3>
                  <p className="text-sm text-gray-600">Touro, Virgem, Capricórnio</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Estabilidade, praticidade e persistência.</strong> Combinam perfeitamente com Água, que nutre seus projetos.
              </p>
              <div className="space-y-2">
                <div className="text-xs"><strong>Melhor com:</strong> Outros Terras, Água (Câncer, Escorpião, Peixes)</div>
                <div className="text-xs"><strong>Desafiador com:</strong> Fogo (pode ser muito intenso), Ar (pode parecer instável)</div>
              </div>
            </div>

            {/* Ar */}
            <div className="rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-50 to-blue-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-label="Ícone de vento">💨</span>
                <div>
                  <h3 className="text-lg font-bold text-sky-600">Signos de Ar</h3>
                  <p className="text-sm text-gray-600">Gêmeos, Libra, Aquário</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Comunicação, ideias e flexibilidade.</strong> Estimulam o Fogo e trazem leveza para relacionamentos.
              </p>
              <div className="space-y-2">
                <div className="text-xs"><strong>Melhor com:</strong> Outros Ares, Fogo (Áries, Leão, Sagitário)</div>
                <div className="text-xs"><strong>Desafiador com:</strong> Terra (muito prático), Água (muito emocional)</div>
              </div>
            </div>

            {/* Água */}
            <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-label="Ícone de ondas do mar">🌊</span>
                <div>
                  <h3 className="text-lg font-bold text-blue-600">Signos de Água</h3>
                  <p className="text-sm text-gray-600">Câncer, Escorpião, Peixes</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Emoção, intuição e sensibilidade.</strong> Nutrem a Terra e criam vínculos emocionais profundos.
              </p>
              <div className="space-y-2">
                <div className="text-xs"><strong>Melhor com:</strong> Outras Águas, Terra (Touro, Virgem, Capricórnio)</div>
                <div className="text-xs"><strong>Desafiador com:</strong> Fogo (pode evaporar), Ar (pode se dispersar)</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h4 className="font-bold text-amber-800 mb-2"><span aria-label="Ícone de lâmpada">💡</span> Dica Importante:</h4>
            <p className="text-sm text-amber-700">
              Lembre-se: signos "incompatíveis" podem ter relacionamentos maravilhosos! A compatibilidade é apenas um guia. 
              Amor, respeito, comunicação e crescimento mútuo são muito mais importantes que a astrologia.
            </p>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Compatibilidade de Signos"
        items={[
          {
            question: "Como funciona a compatibilidade entre signos?",
            answer:
              "A compatibilidade entre signos é baseada nos elementos (Fogo, Terra, Ar, Água), modalidades (Cardeal, Fixo, Mutável) e características planetárias de cada signo. Signos do mesmo elemento tendem a se entender bem, enquanto elementos complementares (como Fogo e Ar) criam sinergias interessantes.",
            borderColor: "math-purple",
          },
          {
            question: "Signos incompatíveis não podem se relacionar?",
            answer:
              "Não! Compatibilidade baixa não significa relacionamento impossível. Muitas vezes, as diferenças podem ser complementares e gerar crescimento mútuo. Com comunicação, paciência e amor, qualquer combinação pode funcionar.",
            borderColor: "primary-blue",
          },
          {
            question: "A compatibilidade é igual para amor, amizade e trabalho?",
            answer:
              "Não necessariamente. Dois signos podem não ser tão compatíveis no amor, mas ter uma excelente amizade ou parceria profissional. Cada tipo de relacionamento enfatiza aspectos diferentes da personalidade astrológica.",
            borderColor: "system-info",
          },
          {
            question: "O que mais influencia além dos signos solares?",
            answer:
              "A compatibilidade completa considera o mapa astral inteiro: Lua (emoções), Vênus (amor), Marte (desejo), Ascendente (máscara social), entre outros. O signo solar é apenas um dos fatores, embora seja muito importante.",
            borderColor: "system-warning",
          },
          {
            question: "Como melhorar a compatibilidade com qualquer signo?",
            answer:
              "Foque na comunicação honesta, respeite as diferenças individuais, pratique a paciência, encontre interesses em comum, e esteja disposto a crescer junto. A astrologia pode guiar, mas o esforço consciente é fundamental.",
            borderColor: "growth-green",
          },
          {
            question: "Posso usar isso para escolher parceiros ou amigos?",
            answer:
              "A compatibilidade astrológica é uma ferramenta de autoconhecimento, não um filtro para relacionamentos. Use-a para entender melhor as dinâmicas, mas sempre priorize a conexão real, valores compartilhados e sentimentos genuínos.",
            borderColor: "system-error-dark",
          },
        ]}
        tipSection={{
          title: "Dica Pro de Compatibilidade",
          content:
            "<strong>Para relacionamentos duradouros:</strong> além da compatibilidade solar, observe se vocês têm valores similares, objetivos de vida alinhados e, principalmente, se há respeito mútuo. A astrologia explica o 'como', mas o amor constrói o 'porquê'.",
        }}
        footerText="<strong>Importante:</strong> Use a compatibilidade astrológica como ferramenta de autoconhecimento e melhoria de relacionamentos, nunca como limitação ou preconceito. Todos os signos podem se relacionar bem com amor e compreensão."
      />

      {/* Footer com informações adicionais */}
      <Card className="border-l-4 border-math-purple bg-math-purple/5 duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Como Interpretar os Resultados da Compatibilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta <strong className="text-math-purple-dark">calculadora de compatibilidade</strong> analisa{" "}
              <strong className="text-primary-blue-dark">elementos, modalidades e características planetárias</strong> 
              dos signos para gerar insights sobre diferentes tipos de relacionamento.
            </p>
            <p>
              <strong>Como funciona:</strong> A análise considera a harmonia entre elementos, complementaridade 
              de características e potencial de crescimento mútuo em amor, amizade e trabalho.
            </p>
            <p>
              <strong className="text-system-warning">Lembre-se:</strong> A compatibilidade astrológica é{" "}
              <strong>um guia, não uma regra absoluta</strong>. Relacionamentos bem-sucedidos dependem muito 
              mais de comunicação, respeito e crescimento mútuo do que apenas dos signos.
            </p>
            <p className="mt-4 border-t border-math-purple/20 pt-3 text-xs opacity-75" aria-label="Características da calculadora">
              <span aria-hidden="true">💕</span> Análise completa 3 áreas • <span aria-hidden="true">📊</span> Porcentagem de afinidade • <span aria-hidden="true">💡</span> Dicas personalizadas • 
              <span aria-hidden="true">🌟</span> Análise dos elementos • <span aria-hidden="true">📱</span> 100% responsivo • <span aria-hidden="true">✨</span> Baseado em astrologia tradicional
            </p>
          </div>
        </CardContent>
      </Card>

      <RelatedCalculators category="astrologia" />
    </div>
  );
}