import type { MetaFunction } from "@remix-run/node";
import {
  RelatedCalculators,
  CategoryHero,
  CategoryStats,
  QuickAccessCard,
  ResponsiveBreadcrumb,
  createCategoryBreadcrumb,
  CategoryGuide,
  categoryFaqStructuredData,
} from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { CALCULATORS } from "~/lib/constants";
import { generateCategoryPageGraph } from "~/lib/structured-data";
import type { Calculator } from "~/types";
import { buildCategoryMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => [
  ...buildCategoryMeta("astrologia"),
  { "script:ld+json": generateCategoryPageGraph("astrologia") },
  { "script:ld+json": categoryFaqStructuredData("astrologia") },
];

export default function AstrologiaIndex() {
  const astrologiaCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "astrologia"
  );

  return (
    <div className="min-h-screen">
      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("astrologia")} />

      <CategoryHero
        category="astrologia"
        title="Calculadoras Astrológicas"
        subtitle="Grátis 2026"
        description="🔮 **Mapa astral online**, **ascendente astrológico** e **compatibilidade de signos** GRÁTIS! Ferramentas para **autoconhecimento** e **crescimento espiritual** baseadas na **astrologia brasileira**."
        badge={{
          icon: "🌟",
          text: "Ferramentas Astrológicas para Autoconhecimento",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Cálculos Confiáveis" },
          { color: "bg-math-purple", text: "Baseado em Tradições" },
          { color: "bg-primary-blue", text: "Autoconhecimento" },
        ]}
      />

      {/* Quick Access to Most Used Calculators */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              🚀 Acesso Rápido - Mais Usadas
            </h2>
            <p className="mt-2 text-text-secondary">
              Comece por aqui: as calculadoras astrológicas mais populares
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <QuickAccessCard
              title="Ascendente Astrológico"
              description="Descubra seu signo ascendente usando data, hora e local de nascimento."
              icon="🌅"
              href="/calculadoras/astrologia/ascendente"
              category="astrologia"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Compatibilidade de Signos"
              description="Descubra a compatibilidade astrológica entre diferentes signos do zodíaco."
              icon="💕"
              href="/calculadoras/astrologia/compatibilidade-signos"
              category="astrologia"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Descubra Seu Signo"
              description="Descubra seu signo zodiacal baseado na data de nascimento."
              icon="♈"
              href="/calculadoras/astrologia/signo"
              category="astrologia"
              complexity="basic"
            />
          </div>
        </div>
      </section>

      {/* Astrology Stats Section */}
      <CategoryStats
        category="astrologia"
        stats={[
          {
            icon: "🌟",
            number: "1+",
            label: "Calculadoras",
            description: "Ferramentas especializadas",
          },
          {
            icon: "📊",
            number: "100%",
            label: "Confiabilidade",
            description: "Cálculos validados",
          },
          {
            icon: "⚡",
            number: "<1s",
            label: "Velocidade",
            description: "Resultados instantâneos",
          },
          {
            icon: "🎓",
            number: "+FAQ",
            label: "Educativo",
            description: "Conteúdo completo",
          },
        ]}
      />

      {/* Astrology Categories */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Calculadoras por Especialidade
            </h2>
            <p className="mt-2 text-text-secondary">
              Explore diferentes áreas da astrologia e do autoconhecimento
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {/* Personal Astrology */}
            <div className="group rounded-2xl bg-gradient-to-br from-math-purple/10 to-math-purple/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-math-purple/25 sm:p-8">
              <div className="mb-4 flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-math-purple text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">🌌</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                  Astrologia Pessoal
                </h3>
              </div>
              <p className="mb-4 text-center text-sm text-text-secondary">
                Descubra sua personalidade através do seu mapa astral
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-math-purple-dark">•</span> Ascendente Astrológico
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-math-purple-dark">•</span> Descubra Seu Signo
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-math-purple-dark">•</span> Mapa Astral Completo
                </div>
              </div>
            </div>

            {/* Compatibility */}
            <div className="group rounded-2xl bg-gradient-to-br from-health-red/10 to-health-red/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-health-red/25 sm:p-8">
              <div className="mb-4 flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-health-red text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">💕</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Compatibilidade</h3>
              </div>
              <p className="mb-4 text-center text-sm text-text-secondary">
                Analise relacionamentos e compatibilidade entre signos
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-health-red-dark">•</span> Compatibilidade de Signos
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-health-red-dark">•</span> Sinastria Amorosa
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-health-red-dark">•</span> Análise de Relacionamentos
                </div>
              </div>
            </div>

            {/* Numerology & Mystical */}
            <div className="group rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-finance-gold/25 sm:p-8">
              <div className="mb-4 flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">🔢</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Numerologia</h3>
              </div>
              <p className="mb-4 text-center text-sm text-text-secondary">
                Explore os mistérios dos números e seu significado pessoal
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-finance-gold-dark">•</span> Número da Personalidade
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-finance-gold-dark">•</span> Caminho de Vida
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-finance-gold-dark">•</span> Números do Destino
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Astrology Calculators */}
      {astrologiaCalculators.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
                Todas as Calculadoras de Astrologia
              </h2>
              <p className="mt-4 text-lg text-text-secondary-dark">
                Escolha a ferramenta ideal para sua jornada de autoconhecimento
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {astrologiaCalculators.map((calculator: Calculator) => (
                <CalculatorCard key={calculator.id} calculator={calculator} category="astrologia" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coming Soon Message */}
      {astrologiaCalculators.length === 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-math-purple/10 to-math-purple/5 p-8 sm:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-math-purple/20">
                <span className="text-3xl">🚧</span>
              </div>
              <h2 className="mb-4 text-xl font-bold text-text-primary sm:text-2xl">
                Calculadoras em Desenvolvimento
              </h2>
              <p className="mb-6 text-lg text-text-secondary">
                Estamos criando ferramentas incríveis de astrologia para você! Em breve teremos
                calculadoras de:
              </p>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌌</span>
                    <span className="font-medium">Mapa Astral Completo</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💕</span>
                    <span className="font-medium">Compatibilidade de Signos</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌙</span>
                    <span className="font-medium">Fases da Lua</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏠</span>
                    <span className="font-medium">Casas Astrológicas</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🪐</span>
                    <span className="font-medium">Trânsitos Planetários</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Astrology Education & Benefits */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Autoconhecimento através da Astrologia
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-math-purple/20">
                <span className="text-2xl">🌌</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Personalidade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Descubra traços únicos da sua personalidade através dos astros
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-health-red/20">
                <span className="text-2xl">💕</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Relacionamentos</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Entenda melhor suas relações pessoais e amorosas
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Propósito</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Encontre direção e propósito na sua jornada de vida
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Crescimento</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Desenvolva-se espiritualmente através do conhecimento astral
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-math-purple-dark to-math-purple py-12 sm:py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            ✨ Inicie sua Jornada de Autoconhecimento
          </h2>
          <p className="mt-4 text-lg text-math-purple-light">
            Ferramentas gratuitas para <strong>descobrir sua essência</strong> e navegar pela vida
            com mais consciência
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:justify-center">
            <a
              href="/calculadoras/astrologia/ascendente"
              className="group inline-flex transform items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-math-purple-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-math-purple-dark"
              aria-label="Calcular ascendente astrológico"
            >
              <span className="mr-2 text-xl group-hover:animate-bounce">🌅</span>
              Descobrir Meu Ascendente
              <svg
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            <a
              href="/calculadoras/astrologia/compatibilidade-signos"
              className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-math-purple-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-math-purple-dark"
              aria-label="Ver compatibilidade astrológica"
            >
              <span className="mr-2 text-xl group-hover:animate-spin">💕</span>
              Compatibilidade de Signos
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm text-math-purple-light sm:mt-8 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
              <span>Cálculos Confiáveis</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-white"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-white"
                style={{ animationDelay: "1s" }}
              ></div>
              <span>Sem Cadastro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Astrology */}
      <section className="bg-system-info/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-system-info/20 bg-system-info/10 p-6 sm:p-8">
            <div className="flex flex-col items-center space-y-4 text-center sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0 sm:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-info/20">
                <span className="text-xl">💫</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Dica para Maximizar o Autoconhecimento
                </h3>
                <p className="mt-2 text-text-secondary">
                  A astrologia é uma ferramenta poderosa de autoconhecimento. Use nossas
                  calculadoras para
                  <strong className="text-math-purple-dark">
                    {" "}
                    explorar diferentes aspectos da sua personalidade
                  </strong>
                  e entender melhor suas potencialidades, desafios e caminhos de crescimento
                  pessoal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryGuide categoryId="astrologia" />

      <RelatedCalculators category="astrologia" />
    </div>
  );
}
