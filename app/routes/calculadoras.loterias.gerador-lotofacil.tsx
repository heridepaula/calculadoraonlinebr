import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { APP_NAME } from "~/lib/constants";
import { LOTOFACIL } from "~/lib/lottery/definitions";
import { buildStatsFaq, formatDateBR, type LotteryStats } from "~/lib/lottery/stats";
import { LotteryGenerator } from "~/components/calculators/LotteryGenerator";
import { getStats } from "~/services/lottery/statistics.server";

// Estatísticas vêm do MongoDB e mudam a cada sorteio novo. O CDN serve a página por até 5 min
// e revalida em segundo plano, então um concurso gravado pelo cron aparece em poucos minutos.
export async function loader() {
  const stats = await getStats(LOTOFACIL);
  return json({ stats });
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" };
}

export const meta: MetaFunction = () => {
  return [
    { title: `Gerador de Lotofácil Grátis com Estratégias | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Gerador gratuito de Lotofácil com estratégias inteligentes: análise de frequência, paridade e filtros estatísticos. Gere 15 números equilibrados para Lotofácil agora.",
    },
    {
      name: "keywords",
      content:
        "gerador lotofácil, números lotofácil, estratégias lotofácil, análise estatística loteria, números quentes frios, fechamento lotofácil, desdobramento loteria",
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
      content: "Gerador de Lotofácil com Estratégias Inteligentes",
    },
    {
      property: "og:description",
      content:
        "Gerador gratuito de Lotofácil com estratégias inteligentes: análise de frequência, paridade e filtros estatísticos. Gere 15 números equilibrados para Lotofácil agora.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    {
      property: "og:image:width",
      content: "512",
    },
    {
      property: "og:image:height",
      content: "512",
    },
    {
      property: "og:image:alt",
      content: "Gerador de Lotofácil - Interface mostrando números gerados com estratégias",
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
      content: "Gerador de Lotofácil Grátis 2026 | Estratégias Inteligentes",
    },
    {
      name: "twitter:description",
      content: "Gere números da Lotofácil GRÁTIS com análise estatística e estratégias avançadas!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Gerador de Lotofácil - Interface mostrando números gerados com estratégias",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
    },
  ];
};

export default function GeradorLotofacil() {
  const { stats: loaded } = useLoaderData<typeof loader>();
  const stats = loaded as LotteryStats;
  const faqItems = useMemo(() => buildStatsFaq(stats), [stats]);

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Gerador de Lotofácil",
            "description": "Gerador inteligente de números para Lotofácil com estratégias estatísticas e análise de frequência",
            "url": "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL",
            },
            "featureList": [
              "Análise de frequência de números",
              "Filtros matemáticos avançados",
              "Controle de paridade (pares/ímpares)",
              "Estratégias estatísticas",
              "Histórico de jogos",
              "Seleção manual de números",
              "Geração em lote",
            ],
          }),
        }}
      />

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "https://www.calculadoraonlinebr.com.br" },
              { "@type": "ListItem", position: 2, name: "Calculadoras", item: "https://www.calculadoraonlinebr.com.br/calculadoras" },
              { "@type": "ListItem", position: 3, name: "Loterias", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias" },
              { "@type": "ListItem", position: 4, name: "Gerador de Lotofácil", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-lotofacil" },
            ],
          }),
        }}
      />

      {/* Responsive Breadcrumb Navigation */}
      <ResponsiveBreadcrumb
        items={createCalculatorBreadcrumb("loterias", "Gerador de Lotofácil")}
      />

      <div className="space-y-8 px-2 py-6 sm:px-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
            🍀 Gerador de Lotofácil Inteligente
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Gere números para <strong className="text-system-success-dark">Lotofácil</strong> usando
            estratégias estatísticas avançadas, análise de frequência e filtros matemáticos
            inteligentes.
          </p>
          <div className="inline-block rounded-lg bg-system-success/10 p-4 duration-300">
            <p className="text-sm font-medium text-text-primary">
              🎯 <strong>Estratégias Inteligentes</strong> • 📊 <strong>Análise Estatística</strong> •
              💾 <strong>Histórico Salvo</strong>
            </p>
          </div>
        </header>

        <LotteryGenerator stats={stats} />

        {/* Informações Estatísticas (calculadas do banco; atualizam a cada novo sorteio) */}
        <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
          <CardHeader>
            <CardTitle>📊 Análise Estatística da Lotofácil</CardTitle>
            <p className="mt-1 text-sm text-text-secondary" data-testid="stats-updated">
              {stats.source === "database" ? (
                <>
                  Base: <strong>{stats.totalConcursos.toLocaleString("pt-BR")} concursos</strong>
                  {stats.ultimoConcurso && (
                    <>
                      {" "}
                      (último: <strong>{stats.ultimoConcurso}</strong>
                      {stats.ultimaData && <> em {formatDateBR(stats.ultimaData)}</>})
                    </>
                  )}
                  . Atualizada automaticamente após cada sorteio.
                </>
              ) : (
                <>Dados de referência (até o concurso {stats.ultimoConcurso}); a atualização automática está temporariamente indisponível.</>
              )}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Números por Frequência */}
            <div>
              <h4 className="mb-3 font-semibold">Frequência Histórica de Números</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {(
                  [
                    { key: "hot", title: "🔥 Números Quentes (mais sorteados)", titleClass: "text-system-error", ballClass: "rounded bg-system-error/20 text-system-error-dark", list: stats.hot },
                    { key: "warm", title: "🌡️ Números Médios", titleClass: "text-system-warning", ballClass: "rounded-full bg-system-warning/20 text-system-warning-dark", list: stats.warm },
                    { key: "cold", title: "🧊 Números Frios (menos sorteados)", titleClass: "text-primary-blue", ballClass: "rounded-full bg-primary-blue/20 text-primary-blue-dark", list: stats.cold },
                  ] as const
                ).map((group) => (
                  <div key={group.key}>
                    <h5 className={`mb-2 text-sm font-medium ${group.titleClass}`}>{group.title}</h5>
                    <div className="flex flex-wrap gap-1">
                      {group.list.map((number) => {
                        const pct = stats.frequency.find((f) => f.numero === number)?.pct;
                        return (
                          <div
                            key={number}
                            title={pct !== undefined ? `${number.toString().padStart(2, "0")}: ${pct.toLocaleString("pt-BR")}% dos concursos` : undefined}
                            className={`flex h-8 w-8 items-center justify-center text-sm font-medium ${group.ballClass}`}
                          >
                            {number.toString().padStart(2, "0")}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {stats.frequency.length > 0 && (
                <p className="mt-3 text-xs text-text-secondary">
                  Cada dezena aparece em cerca de 60% dos concursos (esperado ao acaso). A variação real vai de{" "}
                  {Math.min(...stats.frequency.map((f) => f.pct)).toLocaleString("pt-BR")}% a{" "}
                  {Math.max(...stats.frequency.map((f) => f.pct)).toLocaleString("pt-BR")}%: a diferença é pequena e os sorteios são
                  independentes, então quente/frio é só um critério de variação.
                </p>
              )}
            </div>

            {/* Números Atrasados */}
            {stats.overdue.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold">⏳ Números Atrasados</h4>
                <p className="mb-3 text-sm text-text-secondary">
                  Dezenas que não saem há mais sorteios seguidos (até o concurso {stats.ultimoConcurso}). O número abaixo de cada dezena é o atraso atual.
                </p>
                <div className="flex flex-wrap gap-3">
                  {stats.overdue.map((number) => {
                    const d = stats.delays.find((x) => x.numero === number);
                    return (
                      <div key={number} className="flex flex-col items-center gap-1" title={d ? `${number.toString().padStart(2, "0")}: ${d.atraso} sorteios sem sair (maior atraso histórico: ${d.maxAtraso})` : undefined}>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-system-warning/20 text-sm font-bold text-system-warning-dark">
                          {number.toString().padStart(2, "0")}
                        </div>
                        {d && <span className="text-xs text-text-secondary">{d.atraso}x</span>}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-text-secondary">
                  Atraso não aumenta a chance: cada sorteio é independente. O maior atraso já registrado foi de {Math.max(...stats.delays.map((d) => d.maxAtraso))} sorteios seguidos.
                </p>
              </div>
            )}

            {/* Padrões Matemáticos */}
            <div>
              <h4 className="mb-3 font-semibold">Padrões Mais Comuns nos Sorteios</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded bg-system-success/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-success-dark">{stats.patterns.pairs.min}-{stats.patterns.pairs.max}</div>
                  <div className="text-sm text-text-secondary">Números Pares</div>
                  <div className="text-xs text-text-secondary">{stats.patterns.pairs.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="rounded bg-system-info/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-info-dark">{stats.patterns.sum.ideal[0]}-{stats.patterns.sum.ideal[1]}</div>
                  <div className="text-sm text-text-secondary">Soma Ideal</div>
                  <div className="text-xs text-text-secondary">50% centrais · média {stats.patterns.sum.mean.toLocaleString("pt-BR")}</div>
                </div>
                <div className="rounded bg-math-purple/10 p-3 text-center">
                  <div className="text-lg font-bold text-math-purple-dark">{stats.patterns.primes.min}-{stats.patterns.primes.max}</div>
                  <div className="text-sm text-text-secondary">Números Primos</div>
                  <div className="text-xs text-text-secondary">{stats.patterns.primes.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="rounded bg-system-warning/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-warning-dark">≤{stats.patterns.maxConsecutive.limit}</div>
                  <div className="text-sm text-text-secondary">Seguidos (maior sequência)</div>
                  <div className="text-xs text-text-secondary">{stats.patterns.maxConsecutive.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                Em média, {stats.patterns.repeatedFromPrevious.toLocaleString("pt-BR")} das 15 dezenas se repetem do concurso anterior.
              </p>
            </div>

            {/* Números de Fibonacci e contexto */}
            <div>
              <h4 className="mb-3 font-semibold">Sequências Especiais na Lotofácil</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-neutral-surface-variant p-3">
                  <h5 className="mb-2 text-sm font-medium text-math-purple">🌀 Números de Fibonacci (1–25)</h5>
                  <div className="flex flex-wrap gap-1">
                    {stats.fibonacci.map((n) => (
                      <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-math-purple/20 text-sm font-bold text-math-purple-dark">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">
                    Em {stats.patterns.fibonacci.coverage.toLocaleString("pt-BR")}% dos concursos saíram de {stats.patterns.fibonacci.min} a {stats.patterns.fibonacci.max} números de Fibonacci.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-surface-variant p-3">
                  <h5 className="mb-2 text-sm font-medium text-system-info">🔢 Números Primos (1–25)</h5>
                  <div className="flex flex-wrap gap-1">
                    {stats.primes.map((n) => (
                      <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-system-info/20 text-sm font-bold text-system-info-dark">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">
                    Em {stats.patterns.primes.coverage.toLocaleString("pt-BR")}% dos concursos saíram de {stats.patterns.primes.min} a {stats.patterns.primes.max} números primos.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes - Gerador de Lotofácil"
          items={faqItems.map((item, i) => ({
            ...item,
            borderColor: (["system-success", "primary-blue", "system-info", "system-warning", "system-error-dark"] as const)[i % 5],
          }))}
          tipSection={{
            title: "Dica para Uso Responsável",
            content:
              "<strong>Jogue com responsabilidade:</strong> Loterias são entretenimento, não investimento. Estabeleça um limite de gastos mensal e nunca aposte mais do que pode perder. Use nosso gerador como ferramenta de diversão e estudo estatístico.",
          }}
          footerText="<strong>Lembre-se:</strong> Este gerador é uma ferramenta educativa para estudo de padrões estatísticos. O resultado das loterias é sempre aleatório e imprevisível."
        />

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-lotofacil" />
      </div>

    </div>
  );
}