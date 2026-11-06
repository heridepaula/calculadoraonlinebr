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
import { MEGASENA } from "~/lib/lottery/definitions";
import { buildStatsFaq, formatDateBR, type LotteryStats } from "~/lib/lottery/stats";
import { LotteryGenerator } from "~/components/calculators/LotteryGenerator";
import { getStats } from "~/services/lottery/statistics.server";

// Estatísticas vêm do MongoDB e mudam a cada sorteio novo. O CDN serve a página por até 5 min
// e revalida em segundo plano, então um concurso gravado pelo cron aparece em poucos minutos.
export async function loader() {
  const stats = await getStats(MEGASENA);
  return json({ stats });
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" };
}

export const meta: MetaFunction = () => {
  return [
    { title: `Gerador de Mega-Sena Grátis com Estratégias | ${APP_NAME}` },
    {
      name: "description",
      content:
        "Gerador gratuito de Mega-Sena com estratégias inteligentes: análise de frequência, filtros de paridade, soma e consecutivos. Gere jogos equilibrados e salve no histórico.",
    },
    {
      name: "keywords",
      content:
        "gerador mega-sena, números mega sena, estratégias mega-sena, análise estatística mega sena, números quentes frios mega sena, sorteio mega sena, jogo mega sena online",
    },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:title", content: "Gerador de Mega-Sena com Estratégias Inteligentes" },
    {
      property: "og:description",
      content:
        "Gerador gratuito de Mega-Sena com estratégias inteligentes: análise de frequência, filtros de paridade, soma e consecutivos. Gere jogos equilibrados e salve no histórico.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    { property: "og:image:alt", content: "Gerador de Mega-Sena - Interface mostrando números gerados com estratégias" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Gerador de Mega-Sena Grátis 2026 | Estratégias Inteligentes" },
    { name: "twitter:description", content: "Gere números da Mega-Sena GRÁTIS com análise estatística e estratégias avançadas!" },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    { name: "twitter:image:alt", content: "Gerador de Mega-Sena - Interface mostrando números gerados com estratégias" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
    },
  ];
};

const pad = (n: number) => n.toString().padStart(2, "0");
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
/** "R$ 55 milhões" para valores grandes; moeda completa para os demais. */
const brlShort = (v: number) =>
  v >= 1e6 ? `R$ ${(v / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${v >= 2e6 ? "milhões" : "milhão"}` : brl(v);

/** Chances da aposta simples (6 dezenas): C(60,6) e faixas da Caixa. */
const ODDS_FAQ = {
  question: "Quais são as chances de ganhar na Mega-Sena?",
  answer:
    "Com uma aposta simples de 6 dezenas, a chance de acertar a sena é de 1 em 50.063.860; a quina, 1 em 154.518; e a quadra, 1 em 2.332. Nenhuma estratégia muda essas probabilidades: todas as combinações têm a mesma chance em cada sorteio.",
};

export default function GeradorMegaSena() {
  const { stats: loaded } = useLoaderData<typeof loader>();
  const stats = loaded as LotteryStats;
  const faqItems = useMemo(() => {
    const items = buildStatsFaq(stats);
    // a pergunta das chances entra antes da última ("Essas estratégias garantem…")
    return [...items.slice(0, -1), ODDS_FAQ, ...items.slice(-1)];
  }, [stats]);
  const latest = stats.latest;
  const p = stats.patterns;

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de Mega-Sena",
            description:
              "Gerador inteligente de números para Mega-Sena com estratégias estatísticas e análise de frequência",
            url: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
            featureList: [
              "Análise de frequência de números",
              "Números atrasados",
              "Filtros de paridade, soma, primos, sequências e linhas do volante",
              "Surpresinha com estratégia sorteada",
              "Histórico de jogos",
              "Seleção manual de números",
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
              { "@type": "ListItem", position: 4, name: "Gerador de Mega-Sena", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-mega-sena" },
            ],
          }),
        }}
      />

      <ResponsiveBreadcrumb items={createCalculatorBreadcrumb("loterias", "Gerador de Mega-Sena")} />

      <div className="space-y-8 px-2 py-6 sm:px-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">💰 Gerador de Mega-Sena Inteligente</h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Gere números para <strong className="text-system-success-dark">Mega-Sena</strong> usando estratégias
            estatísticas, análise de frequência e filtros calculados com todos os concursos já sorteados.
          </p>
          {latest?.proximo ? (
            <div className="inline-block rounded-lg bg-system-success/10 px-4 py-3">
              <p className="!mb-0 text-sm font-medium text-text-primary">
                🎯 Próximo concurso <strong>{latest.proximo.concurso}</strong> em{" "}
                <strong>{formatDateBR(latest.proximo.data)}</strong> · prêmio estimado{" "}
                <strong className="text-system-success-dark">{brlShort(latest.proximo.estimativa)}</strong>
              </p>
            </div>
          ) : (
            <div className="inline-block rounded-lg bg-system-success/10 p-4">
              <p className="!mb-0 text-sm font-medium text-text-primary">
                🎯 <strong>Estratégias Inteligentes</strong> • 📊 <strong>Análise Estatística</strong> • 💾{" "}
                <strong>Histórico Salvo</strong>
              </p>
            </div>
          )}
        </header>

        <LotteryGenerator stats={stats} />

        {/* Último resultado */}
        {latest && (
          <Card className="mx-auto max-w-4xl border-l-4 border-system-success">
            <CardHeader>
              <CardTitle>
                🏆 Último resultado: concurso {latest.concurso} ({formatDateBR(latest.data)})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2" aria-label="Dezenas sorteadas">
                {latest.dezenas.map((n) => (
                  <span
                    key={n}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-base font-bold text-white shadow"
                  >
                    {pad(n)}
                  </span>
                ))}
                {latest.acumulou !== undefined && (
                  <span
                    className={`self-center rounded-full px-3 py-1 text-xs font-semibold ${
                      latest.acumulou ? "bg-system-warning/20 text-system-warning-dark" : "bg-system-success/20 text-system-success-dark"
                    }`}
                  >
                    {latest.acumulou ? "Acumulou!" : "Teve ganhador da sena"}
                  </span>
                )}
              </div>
              {latest.premiacoes && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[18rem] text-sm">
                    <caption className="sr-only">Premiação do concurso {latest.concurso}</caption>
                    <thead>
                      <tr className="border-b border-neutral-surface-variant text-left text-text-secondary">
                        <th scope="col" className="py-2 pr-3 font-medium">Faixa</th>
                        <th scope="col" className="py-2 pr-3 text-right font-medium">Ganhadores</th>
                        <th scope="col" className="py-2 text-right font-medium">Prêmio por ganhador</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latest.premiacoes.map((f) => (
                        <tr key={f.acertos} className="border-b border-neutral-surface-variant/50">
                          <td className="py-2 pr-3 font-medium text-text-primary">
                            {{ 6: "Sena", 5: "Quina", 4: "Quadra" }[f.acertos] ?? ""} ({f.acertos} acertos)
                          </td>
                          <td className="py-2 pr-3 text-right text-text-primary">{f.ganhadores.toLocaleString("pt-BR")}</td>
                          <td className="py-2 text-right text-text-primary">{f.ganhadores > 0 ? brl(f.rateio) : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Informações Estatísticas (calculadas do banco; atualizam a cada novo sorteio) */}
        <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
          <CardHeader>
            <CardTitle>📊 Análise Estatística da Mega-Sena</CardTitle>
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
              <div className="space-y-4">
                {(
                  [
                    { key: "hot", title: "🔥 Números Quentes (mais sorteados)", titleClass: "text-system-error", ballClass: "rounded bg-system-error/20 text-system-error-dark", list: stats.hot },
                    { key: "cold", title: "🧊 Números Frios (menos sorteados)", titleClass: "text-primary-blue", ballClass: "rounded-full bg-primary-blue/20 text-primary-blue-dark", list: stats.cold },
                    { key: "warm", title: "🌡️ Números Médios", titleClass: "text-system-warning", ballClass: "rounded-full bg-system-warning/20 text-system-warning-dark", list: stats.warm },
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
                            title={pct !== undefined ? `${pad(number)}: ${pct.toLocaleString("pt-BR")}% dos concursos` : undefined}
                            className={`flex h-8 w-8 items-center justify-center text-sm font-medium ${group.ballClass}`}
                          >
                            {pad(number)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {stats.frequency.length > 0 && (
                <p className="mt-3 text-xs text-text-secondary">
                  Cada dezena aparece em cerca de 10% dos concursos (6 de 60, esperado ao acaso). A variação real vai de{" "}
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
                  Dezenas que não saem há {MEGASENA.overdueMinDelay} sorteios ou mais (o dobro do intervalo médio), até o concurso {stats.ultimoConcurso}. O
                  número abaixo de cada dezena é o atraso atual.
                </p>
                <div className="flex flex-wrap gap-3">
                  {stats.overdue.map((number) => {
                    const d = stats.delays.find((x) => x.numero === number);
                    return (
                      <div
                        key={number}
                        className="flex flex-col items-center gap-1"
                        title={d ? `${pad(number)}: ${d.atraso} sorteios sem sair (maior atraso histórico: ${d.maxAtraso})` : undefined}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-system-warning/20 text-sm font-bold text-system-warning-dark">
                          {pad(number)}
                        </div>
                        {d && <span className="text-xs text-text-secondary">{d.atraso}x</span>}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-text-secondary">
                  Atraso não aumenta a chance: cada sorteio é independente. O maior atraso já registrado foi de{" "}
                  {Math.max(...stats.delays.map((d) => d.maxAtraso))} sorteios seguidos.
                </p>
              </div>
            )}

            {/* Padrões Matemáticos */}
            <div>
              <h4 className="mb-3 font-semibold">Padrões Mais Comuns nos Sorteios</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <div className="rounded bg-system-success/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-success-dark">{p.pairs.min}-{p.pairs.max}</div>
                  <div className="text-sm text-text-secondary">Números Pares</div>
                  <div className="text-xs text-text-secondary">{p.pairs.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="rounded bg-system-info/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-info-dark">{p.sum.ideal[0]}-{p.sum.ideal[1]}</div>
                  <div className="text-sm text-text-secondary">Soma Ideal</div>
                  <div className="text-xs text-text-secondary">50% centrais · média {p.sum.mean.toLocaleString("pt-BR")}</div>
                </div>
                <div className="rounded bg-math-purple/10 p-3 text-center">
                  <div className="text-lg font-bold text-math-purple-dark">{p.primes.min}-{p.primes.max}</div>
                  <div className="text-sm text-text-secondary">Números Primos</div>
                  <div className="text-xs text-text-secondary">{p.primes.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="rounded bg-system-warning/10 p-3 text-center">
                  <div className="text-lg font-bold text-system-warning-dark">≤{p.maxConsecutive.limit}</div>
                  <div className="text-sm text-text-secondary">Seguidos (maior sequência)</div>
                  <div className="text-xs text-text-secondary">{p.maxConsecutive.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
                <div className="col-span-2 rounded bg-system-error/10 p-3 text-center md:col-span-1">
                  <div className="text-lg font-bold text-system-error-dark">≤{p.rows.limit}</div>
                  <div className="text-sm text-text-secondary">Na mesma linha</div>
                  <div className="text-xs text-text-secondary">{p.rows.coverage.toLocaleString("pt-BR")}% dos concursos</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                Em média, {p.repeatedFromPrevious.toLocaleString("pt-BR")} das 6 dezenas se repetem do concurso anterior.
              </p>
            </div>

            {/* Primos e volante */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-neutral-surface-variant p-3">
                <h5 className="mb-2 text-sm font-medium text-system-info">🔢 Números Primos (1–60)</h5>
                <div className="flex flex-wrap gap-1">
                  {stats.primes.map((n) => (
                    <div key={n} className="flex h-8 w-8 items-center justify-center rounded bg-system-info/20 text-sm font-bold text-system-info-dark">
                      {pad(n)}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                  Em {p.primes.coverage.toLocaleString("pt-BR")}% dos concursos saíram de {p.primes.min} a {p.primes.max} números primos.
                </p>
              </div>
              <div className="rounded-lg border border-neutral-surface-variant p-3">
                <h5 className="mb-2 text-sm font-medium text-system-error">▤ Linhas do volante</h5>
                <p className="text-sm text-text-secondary">
                  O volante tem 6 linhas de 10 dezenas (01–10, 11–20, …, 51–60). Em {p.rows.coverage.toLocaleString("pt-BR")}% dos concursos
                  nenhuma linha teve mais de {p.rows.limit} dezenas sorteadas. O filtro &quot;Por linha&quot; do gerador evita jogos
                  concentrados numa mesma linha.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes - Gerador de Mega-Sena"
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

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-mega-sena" />
      </div>
    </div>
  );
}
