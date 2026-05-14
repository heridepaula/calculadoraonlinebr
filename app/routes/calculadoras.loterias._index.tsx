import type { MetaFunction } from "@remix-run/node";
import {
  RelatedCalculators,
  CategoryHero,
  CategoryStats,
  QuickAccessCard,
  ResponsiveBreadcrumb,
  createCategoryBreadcrumb,
} from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import { generateCategoryPageGraph } from "~/lib/structured-data";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Geradores de Jogos de Loterias Grátis 2026 | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "Gere números da sorte para Mega-Sena, Lotofácil, Quina e outras loterias grátis. Estratégias inteligentes e análises estatísticas para aumentar suas chances.",
    },
    {
      name: "keywords",
      content:
        "gerador números loteria, mega-sena online, lotofácil gerador, quina números, jogos loteria, números da sorte, estratégias loteria, análise estatística loteria",
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
      content: "Geradores de Loterias Grátis – Mega-Sena, Lotofácil, Quina",
    },
    {
      property: "og:description",
      content:
        "Gere números da sorte para Mega-Sena, Lotofácil, Quina e outras loterias grátis. Estratégias inteligentes e análises estatísticas para aumentar suas chances.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:image:alt",
      content:
        "Geradores de Loterias - Interface mostrando diversas ferramentas para gerar números de loterias",
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
      content: "Geradores de Loterias Grátis 2026 | Números da Sorte",
    },
    {
      name: "twitter:description",
      content:
        "Gere números da sorte GRÁTIS! Mega-Sena, Lotofácil, Quina com estratégias inteligentes.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp",
    },
    {
      name: "twitter:image:alt",
      content:
        "Geradores de Loterias - Interface mostrando diversas ferramentas para gerar números de loterias",
    },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias",
    },
    { "script:ld+json": generateCategoryPageGraph("loterias") },
  ];
};

export default function LoteriasIndex() {
  const loteriasCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "loterias"
  );

  return (
    <div className="min-h-screen">
      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb items={createCategoryBreadcrumb("loterias")} />

      <CategoryHero
        category="loterias"
        title="Geradores"
        subtitle="de Loterias"
        description="Gere números da sorte com **estratégias inteligentes e análises estatísticas**. Aumente suas chances nas principais loterias brasileiras com ferramentas gratuitas."
        badge={{
          icon: "🎰",
          text: "Geradores Inteligentes para Jogos da Sorte",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Números Aleatórios" },
          { color: "bg-finance-gold", text: "Estratégias Inteligentes" },
          { color: "bg-primary-blue", text: "Análise Estatística" },
        ]}
      />

      {/* Quick Access to Most Used Generators */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              🚀 Acesso Rápido - Mais Populares
            </h2>
            <p className="mt-2 text-text-secondary">
              Comece por aqui: os geradores de loterias mais utilizados
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <QuickAccessCard
              title="Gerador Mega-Sena"
              description="Gere números aleatórios para jogos da Mega-Sena com análises estatísticas."
              icon="💰"
              href="/calculadoras/loterias/gerador-mega-sena"
              category="loterias"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Gerador Lotofácil"
              description="Gere números para Lotofácil com estratégias inteligentes e padrões."
              icon="🍀"
              href="/calculadoras/loterias/gerador-lotofacil"
              category="loterias"
              isPopular={true}
              complexity="basic"
            />
            <QuickAccessCard
              title="Gerador Quina"
              description="Gere números para Quina com análise de frequência e probabilidades."
              icon="🎲"
              href="/calculadoras/loterias/gerador-quina"
              category="loterias"
              complexity="basic"
            />
          </div>
        </div>
      </section>

      {/* Lottery Stats Section */}
      <CategoryStats
        category="loterias"
        stats={[
          {
            icon: "🎰",
            number: "3",
            label: "Geradores",
            description: "Principais loterias",
          },
          {
            icon: "📊",
            number: "100%",
            label: "Aleatórios",
            description: "Números verdadeiros",
          },
          {
            icon: "⚡",
            number: "<1s",
            label: "Velocidade",
            description: "Geração instantânea",
          },
          {
            icon: "🧠",
            number: "IA",
            label: "Estratégias",
            description: "Análise inteligente",
          },
        ]}
      />

      {/* Lottery Categories */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Geradores por Especialidade
            </h2>
            <p className="mt-2 text-text-secondary">
              Explore diferentes tipos de loterias e estratégias de jogos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {/* Popular Lotteries */}
            <div className="group rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-finance-gold/25 sm:p-8">
              <div className="mb-4 flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-finance-gold text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                  Loterias Populares
                </h3>
              </div>
              <p className="mb-4 text-center text-sm text-text-secondary">
                Principais loterias brasileiras com maiores prêmios
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-finance-gold-dark">•</span> Mega-Sena
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-finance-gold-dark">•</span> Lotofácil
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-finance-gold-dark">•</span> Quina
                </div>
              </div>
            </div>

            {/* Smart Strategies */}
            <div className="group rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-blue/25 sm:p-8">
              <div className="mb-4 flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                  Estratégias Inteligentes
                </h3>
              </div>
              <p className="mb-4 text-center text-sm text-text-secondary">
                Análises estatísticas e padrões para melhorar suas chances
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-primary-blue-dark">•</span> Análise de Frequência
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-primary-blue-dark">•</span> Padrões Estatísticos
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-primary-blue-dark">•</span> Números Quentes/Frios
                </div>
              </div>
            </div>

            {/* Tools & Features */}
            <div className="group rounded-2xl bg-gradient-to-br from-system-success/10 to-system-success/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-system-success/25 sm:p-8">
              <div className="mb-4 flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-system-success text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <span className="text-xl">🛠️</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                  Ferramentas Avançadas
                </h3>
              </div>
              <p className="mb-4 text-center text-sm text-text-secondary">
                Recursos extras para otimizar seus jogos de loteria
              </p>
              <div className="space-y-2">
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-success-dark">•</span> Geração em Lote
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-success-dark">•</span> Filtros Personalizados
                </div>
                <div className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-success-dark">•</span> Histórico de Jogos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Lottery Generators */}
      {loteriasCalculators.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
                Todos os Geradores de Loterias
              </h2>
              <p className="mt-4 text-base text-text-secondary-dark sm:text-lg">
                Escolha a loteria ideal para seus jogos da sorte
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {loteriasCalculators.map((calculator: Calculator) => (
                <CalculatorCard key={calculator.id} calculator={calculator} category="loterias" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coming Soon Message */}
      {loteriasCalculators.length === 0 && (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-finance-gold/10 to-finance-gold/5 p-6 sm:p-8 lg:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-finance-gold/20">
                <span className="text-3xl">🚧</span>
              </div>
              <h2 className="mb-4 text-xl font-bold text-text-primary sm:text-2xl">
                Geradores em Desenvolvimento
              </h2>
              <p className="mb-6 text-base text-text-secondary sm:text-lg">
                Estamos criando geradores incríveis de loterias para você! Em breve teremos:
              </p>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💰</span>
                    <span className="font-medium">Gerador Mega-Sena</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🍀</span>
                    <span className="font-medium">Gerador Lotofácil</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎲</span>
                    <span className="font-medium">Gerador Quina</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📊</span>
                    <span className="font-medium">Análise Estatística</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🧠</span>
                    <span className="font-medium">Estratégias IA</span>
                  </div>
                </div>
                <div className="bg-background-primary/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💡</span>
                    <span className="font-medium">Dicas Personalizadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lottery Education & Benefits */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Jogue com Inteligência
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-finance-gold/20">
                <span className="text-2xl">🎲</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Aleatoriedade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Números verdadeiramente aleatórios para máxima imparcialidade
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Estatísticas</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Análises baseadas em dados históricos das loterias
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Estratégias</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Métodos inteligentes para otimizar suas apostas
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-warning/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Rapidez</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Gere múltiplos jogos em segundos com facilidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-finance-gold-dark to-finance-gold py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            🎰 Teste sua Sorte Agora
          </h2>
          <p className="mt-4 text-base text-finance-gold-light sm:text-lg">
            Geradores gratuitos para <strong>aumentar suas chances</strong> nas principais loterias
            brasileiras
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:justify-center">
            <a
              href="/calculadoras/loterias/gerador-mega-sena"
              className="group inline-flex transform items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-finance-gold-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark sm:px-8 sm:py-4 sm:text-base"
              aria-label="Gerar números da Mega-Sena"
            >
              <span className="mr-2 text-xl group-hover:animate-bounce">💰</span>
              Gerar Mega-Sena
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
              href="/calculadoras/loterias/gerador-lotofacil"
              className="group inline-flex transform items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:text-finance-gold-dark hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-finance-gold-dark sm:px-8 sm:py-4 sm:text-base"
              aria-label="Gerar números da Lotofácil"
            >
              <span className="mr-2 text-xl group-hover:animate-spin">🍀</span>
              Gerar Lotofácil
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-finance-gold-light sm:mt-8 sm:gap-8 sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
              <span>Números Aleatórios</span>
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

      {/* Tips for Lotteries */}
      <section className="bg-system-info/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-system-info/20 bg-system-info/10 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-system-info/20">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Dica Importante sobre Loterias
                </h3>
                <p className="mt-2 text-text-secondary">
                  Lembre-se que loterias são jogos de chance e não há garantia de ganho.
                  <strong className="text-system-info-dark"> Jogue com responsabilidade</strong>,
                  estabeleça limites de apostas e nunca aposte mais do que pode perder. Nossos
                  geradores apenas facilitam a escolha aleatória de números.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="loterias" />
    </div>
  );
}
