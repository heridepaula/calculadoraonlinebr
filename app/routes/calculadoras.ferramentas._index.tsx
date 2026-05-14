import type { MetaFunction } from "@remix-run/node";
import { Breadcrumb, BreadcrumbItem } from "~/components/ui";
import { RelatedCalculators, CategoryHero, CategoryStats, QuickAccessCard } from "~/components";
import { CalculatorCard } from "~/components/CalculatorCard";
import { APP_NAME, CALCULATORS } from "~/lib/constants";
import type { Calculator } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: `Ferramentas Grátis: CPF, CNPJ, UUID, Datas e Conversões Online | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Ferramentas práticas gratuitas para desenvolvedores e uso diário. Gere CPF, CNPJ, UUID/GUID, validadores, contador de caracteres e cálculos de datas.",
    },
    {
      name: "keywords",
      content:
        "gerador CPF, gerador CNPJ, gerador UUID, validador CPF, validador CNPJ, contador caracteres, gerador cartão crédito, ferramentas desenvolvedor",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { rel: "canonical", href: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas" },
    {
      property: "og:title",
      content: "Ferramentas Grátis: CPF, CNPJ, UUID, Datas e Conversões Online",
    },
    {
      property: "og:description",
      content:
        "Ferramentas práticas gratuitas para desenvolvedores e uso diário. Gere CPF, CNPJ, UUID/GUID, validadores, contador de caracteres e cálculos de datas.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Ferramentas Online - CalculadoraOnlineBR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    {
      name: "twitter:title",
      content: "Ferramentas Grátis: CPF, CNPJ, UUID, Datas e Conversões Online",
    },
    {
      name: "twitter:description",
      content:
        "Ferramentas práticas gratuitas para desenvolvedores e uso diário. Gere CPF, CNPJ, UUID/GUID, validadores, contador de caracteres e cálculos de datas.",
    },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/og-image-1200x630.webp" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Ferramentas Online Gratuitas",
        description: "Ferramentas gratuitas: gerador de CPF, CNPJ, UUID, validadores e mais",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas",
        inLanguage: "pt-BR",
        isPartOf: { "@type": "WebSite", name: "CalculadoraOnlineBR", url: "https://www.calculadoraonlinebr.com.br" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
            { "@type": "ListItem", position: 2, name: "Ferramentas", item: "https://www.calculadoraonlinebr.com.br/calculadoras/ferramentas" },
          ],
        },
      },
    },
  ];
};

export default function FerramentasIndex() {
  const ferramentasCalculators = CALCULATORS.filter(
    (calc: Calculator) => calc.category === "ferramentas"
  );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-border-primary bg-surface-light border-b px-3 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
            <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
            <BreadcrumbItem isLast>Ferramentas</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <CategoryHero
        category="ferramentas"
        title="Calculadoras e"
        subtitle="Ferramentas"
        description="Ferramentas práticas para **desenvolvedores e uso diário**. Gere CPF, CNPJ, UUID/GUID, validadores, contador de caracteres e cálculos de datas. Soluções rápidas e confiáveis."
        badge={{
          icon: "🔧",
          text: "Ferramentas Práticas para o Dia a Dia",
        }}
        trustIndicators={[
          { color: "bg-system-success", text: "Ferramentas Úteis" },
          { color: "bg-system-info", text: "Resultados Confiáveis" },
          { color: "bg-primary-blue", text: "Interface Simples" },
        ]}
      />

      {/* Quick Access to Most Used Tools */}
      <section className="bg-surface-dark/30 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              🚀 Acesso Rápido - Mais Usadas
            </h2>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">
              Comece por aqui: as ferramentas mais populares para o dia a dia
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <QuickAccessCard
              title="Gerador de CPF"
              description="Gere CPFs válidos para testes e desenvolvimento com formatação automática e cópia para área de transferência."
              icon="🆔"
              href="/calculadoras/ferramentas/gerador-cpf"
              category="ferramentas"
              isPopular={true}
              complexity="basic"
              ctaText="Usar gerador"
            />
            <div className="rounded-2xl border border-system-info/20 bg-gradient-to-br from-system-info/10 to-system-info/5 p-4 opacity-60 sm:p-6">
              <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-system-info/20 sm:mx-0">
                  <span className="text-xl">⚖️</span>
                </div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Conversor de Unidades
                </h3>
              </div>
              <p className="mb-4 truncate text-center text-sm text-text-secondary sm:whitespace-normal sm:text-left">
                Converta medidas de peso, distância, temperatura e muito mais. (Em breve)
              </p>
              <div className="flex justify-center sm:justify-start">
                <span className="rounded-full bg-system-warning/20 px-2 py-1 text-xs text-system-warning">
                  Em desenvolvimento
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-growth-green/20 bg-gradient-to-br from-growth-green/10 to-growth-green/5 p-4 opacity-60 sm:p-6">
              <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-growth-green/20 sm:mx-0">
                  <span className="text-xl">🔗</span>
                </div>
                <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                  Gerador de Código
                </h3>
              </div>
              <p className="mb-4 truncate text-center text-sm text-text-secondary sm:whitespace-normal sm:text-left">
                Gere códigos QR, barras e outros formatos para seus projetos. (Em breve)
              </p>
              <div className="flex justify-center sm:justify-start">
                <span className="rounded-full bg-system-warning/20 px-2 py-1 text-xs text-system-warning">
                  Em desenvolvimento
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Stats Section */}
      <CategoryStats
        category="ferramentas"
        stats={[
          {
            icon: "🛠️",
            number: "7+",
            label: "Ferramentas",
            description: "Utilitários prontos",
          },
          {
            icon: "⚡",
            number: "<1s",
            label: "Velocidade",
            description: "Resultados instantâneos",
          },
          {
            icon: "💻",
            number: "100%",
            label: "Dev-Ready",
            description: "Para desenvolvedores",
          },
          {
            icon: "🔒",
            number: "Local",
            label: "Privacidade",
            description: "Processamento local",
          },
        ]}
      />

      {/* Tools by Category */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Ferramentas por Categoria
            </h2>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">
              Organize suas tarefas diárias por tipo de necessidade
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Development Tools */}
            <div className="group rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-blue/25 sm:p-6 lg:p-8">
              <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 sm:mx-0">
                  <span className="text-xl">💻</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Desenvolvimento</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Ferramentas essenciais para desenvolvedores e testes
              </p>
              <div className="space-y-2">
                {ferramentasCalculators
                  .filter((calc) =>
                    [
                      "gerador-cpf",
                      "gerador-cnpj",
                      "gerador-uuid-guid",
                      "validar-cpf",
                      "validar-cnpj",
                    ].includes(calc.id)
                  )
                  .map((calc) => (
                    <div
                      key={calc.id}
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span className="text-primary-blue-dark">•</span>{" "}
                      {calc.name
                        .replace("Gerador de ", "")
                        .replace("Validador de ", "")
                        .replace("Calculadora de ", "")}
                    </div>
                  ))}
                <div className="text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-primary-blue-dark">•</span> Gerador de Senhas (em breve)
                </div>
              </div>
            </div>

            {/* Converters */}
            <div className="group rounded-2xl bg-gradient-to-br from-system-info/10 to-system-info/5 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-system-info/25 sm:p-6 lg:p-8">
              <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-system-info text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 sm:mx-0">
                  <span className="text-xl">🔄</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Conversores</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Converta unidades de medida, moedas e formatos diversos
              </p>
              <div className="space-y-2">
                <div className="text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-info-dark">•</span> Unidades de Medida (em breve)
                </div>
                <div className="text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-info-dark">•</span> Conversor de Moedas (em breve)
                </div>
                <div className="text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-system-info-dark">•</span> Temperatura (em breve)
                </div>
              </div>
            </div>

            {/* Text & Content Tools */}
            <div className="group rounded-2xl bg-gradient-to-br from-growth-green/10 to-growth-green/5 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-growth-green/25 sm:p-6 lg:p-8">
              <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-growth-green text-white transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 sm:mx-0">
                  <span className="text-xl">📝</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">Texto e Conteúdo</h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Ferramentas para análise e manipulação de texto
              </p>
              <div className="space-y-2">
                {ferramentasCalculators
                  .filter((calc) =>
                    ["contador-caracteres", "gerador-cartao-credito", "sorteador-online", "clicks-por-segundo"].includes(calc.id)
                  )
                  .map((calc) => (
                    <div
                      key={calc.id}
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span className="text-growth-green-dark">•</span>{" "}
                      {calc.name.replace("Gerador de ", "").replace("Contador de ", "").replace("Teste CPS - ", "")}
                    </div>
                  ))}
                <div className="text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-growth-green-dark">•</span> Código QR (em breve)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Todas as Ferramentas Disponíveis
            </h2>
            <p className="mt-4 text-base text-text-secondary-dark sm:text-lg">
              Escolha a ferramenta ideal para suas necessidades diárias
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {ferramentasCalculators.map((calculator: Calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} category="ferramentas" />
            ))}

            {/* Coming Soon Cards */}
            {ferramentasCalculators.length < 3 && (
              <>
                <div className="to-system-info/2 rounded-2xl border border-system-info/20 bg-gradient-to-br from-system-info/5 p-4 opacity-60 sm:p-6">
                  <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-system-info/20 sm:mx-0">
                      <span className="text-xl">⚖️</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                        Conversor de Unidades
                      </h3>
                      <div className="mt-1 flex justify-center sm:justify-start">
                        <span className="rounded-full bg-system-warning/20 px-2 py-1 text-xs text-system-warning">
                          Em breve
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-text-secondary sm:text-left">
                    Converta peso, distância, volume, temperatura e outras unidades de medida.
                  </p>
                </div>

                <div className="to-growth-green/2 rounded-2xl border border-growth-green/20 bg-gradient-to-br from-growth-green/5 p-4 opacity-60 sm:p-6">
                  <div className="mb-4 flex flex-col space-y-2 text-center sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 sm:text-left">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-growth-green/20 sm:mx-0">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                        Gerador de QR Code
                      </h3>
                      <div className="mt-1 flex justify-center sm:justify-start">
                        <span className="rounded-full bg-system-warning/20 px-2 py-1 text-xs text-system-warning">
                          Em breve
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-text-secondary sm:text-left">
                    Gere códigos QR para URLs, textos, WiFi e outros dados.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits & Education */}
      <section className="from-surface-light to-surface bg-gradient-to-r py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
              Por Que Usar Nossas Ferramentas?
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Rapidez</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Resultados instantâneos sem instalação ou cadastro
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-success/20">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Confiabilidade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Cálculos exatos com algoritmos testados e confiáveis
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-system-info/20">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Mobilidade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Funciona perfeitamente em celulares, tablets e computadores
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-growth-green/20">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Privacidade</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Seus dados não são armazenados, processamento local
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-system-info-dark to-system-info py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-3 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            🚀 Simplifique seu Dia a Dia
          </h2>
          <p className="text-system-info-light mt-4 text-base sm:text-lg">
            Ferramentas gratuitas e práticas para <strong>facilitar cálculos cotidianos</strong> e
            economizar seu tempo
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/calculadoras/ferramentas/diferenca-entre-datas"
              className="group inline-flex transform items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-system-info-dark shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-system-info-dark"
              aria-label="Começar com diferença entre datas"
            >
              <span className="mr-2 text-xl group-hover:animate-bounce">📅</span>
              Calcular Diferença de Datas
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
          </div>

          {/* Trust indicators */}
          <div className="text-system-info-light mt-8 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
              <span>Resultados Instantâneos</span>
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

      {/* Tips Section */}
      <section className="bg-growth-green/5 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-growth-green/20 bg-growth-green/10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-growth-green/20">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Dica para Usar as Ferramentas
                </h3>
                <p className="mt-2 text-text-secondary">
                  Para cálculos de datas,{" "}
                  <strong className="text-primary-blue-dark">inclua horários</strong>
                  quando necessitar de máximo detalhe. Use a separação de dias úteis para
                  <strong className="text-growth-green-dark">
                    {" "}
                    planejamento de projetos profissionais
                  </strong>
                  e cronogramas realistas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedCalculators category="ferramentas" />
    </div>
  );
}
