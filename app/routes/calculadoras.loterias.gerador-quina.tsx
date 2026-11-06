import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { APP_NAME } from "~/lib/constants";
import { QUINA } from "~/lib/lottery/definitions";
import { buildStatsFaq, type LotteryStats } from "~/lib/lottery/stats";
import { LotteryGenerator } from "~/components/calculators/LotteryGenerator";
import { LatestResultCard, NextDrawBanner } from "~/components/calculators/LotteryResultInfo";
import { LotteryStatsCard } from "~/components/calculators/LotteryStatsCard";
import { getStats } from "~/services/lottery/statistics.server";
import { getCommunityGames } from "~/services/lottery/generatedGames.server";
import { LiveGamesFeed } from "~/components/calculators/LiveGamesFeed";
import { BestPastGame } from "~/components/calculators/BestPastGame";

// Estatísticas vêm do MongoDB e mudam a cada sorteio novo. O CDN serve a página por até 5 min
// e revalida em segundo plano, então um concurso gravado pelo cron aparece em poucos minutos.
export async function loader() {
  const [stats, community] = await Promise.all([getStats(QUINA), getCommunityGames(QUINA)]);
  return json({ stats, community });
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" };
}

export const meta: MetaFunction = () => {
  return [
    { title: `Gerador de Quina Grátis com Estratégias | ${APP_NAME}` },
    { name: "description", content: "Gerador gratuito de Quina com estratégias inteligentes: análise de frequência, filtros matemáticos e paridade. Gere 5 números equilibrados para Quina e salve no histórico." },
    {
      name: "keywords",
      content: "gerador quina, números quina, estratégias quina, análise estatística quina, números quentes frios quina, sorteio quina, jogo quina online",
    },
    {
      name: "robots",
      content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:title", content: "Gerador de Quina com Estratégias Inteligentes" },
    { property: "og:description", content: "Gerador gratuito de Quina com estratégias inteligentes: análise de frequência, filtros matemáticos e paridade. Gere 5 números equilibrados para Quina e salve no histórico." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina" },
    { property: "og:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    { property: "og:image:alt", content: "Gerador de Quina - Interface mostrando números gerados com estratégias" },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Gerador de Quina Grátis 2026 | Estratégias Inteligentes" },
    { name: "twitter:description", content: "Gere números da Quina GRÁTIS com análise estatística e estratégias avançadas!" },
    { name: "twitter:image", content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp" },
    { name: "twitter:image:alt", content: "Gerador de Quina - Interface mostrando números gerados com estratégias" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina",
    },
  ];
};


/** Chances da aposta simples (5 dezenas): C(80,5) e faixas da Caixa. */
const ODDS_FAQ = {
  question: "Quais são as chances de ganhar na Quina?",
  answer:
    "Com uma aposta simples de 5 dezenas, a chance de acertar a quina é de 1 em 24.040.016; a quadra, 1 em 64.106; o terno, 1 em 866; e o duque, 1 em 36. Nenhuma estratégia muda essas probabilidades: todas as combinações têm a mesma chance em cada sorteio.",
};

export default function GeradorQuina() {
  const { stats: loaded, community } = useLoaderData<typeof loader>();
  const stats = loaded as LotteryStats;
  const faqItems = useMemo(() => {
    const items = buildStatsFaq(stats);
    // a pergunta das chances entra antes da última ("Essas estratégias garantem…")
    return [...items.slice(0, -1), ODDS_FAQ, ...items.slice(-1)];
  }, [stats]);
  const latest = stats.latest;

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de Quina",
            description:
              "Gerador inteligente de números para Quina com estratégias estatísticas e análise de frequência",
            url: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina",
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
              { "@type": "ListItem", position: 4, name: "Gerador de Quina", item: "https://www.calculadoraonlinebr.com.br/calculadoras/loterias/gerador-quina" },
            ],
          }),
        }}
      />

      <ResponsiveBreadcrumb items={createCalculatorBreadcrumb("loterias", "Gerador de Quina")} />

      <div className="space-y-8 px-2 py-6 sm:px-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">🎲 Gerador de Quina Inteligente</h1>
          <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
            Gere números para <strong className="text-system-success-dark">Quina</strong> usando estratégias
            estatísticas, análise de frequência e filtros calculados com todos os concursos já sorteados.
          </p>
          <NextDrawBanner latest={latest} />
        </header>

        <BestPastGame lottery="quina" best={community.best} />

        <LotteryGenerator stats={stats} />

        <LiveGamesFeed lottery="quina" pusher={community.pusher} initial={community.recent} />

        {/* Último resultado */}
        <LatestResultCard lottery="quina" latest={latest} />

        <LotteryStatsCard stats={stats} />

        {/* FAQ */}
        <FAQ
          title="Perguntas Frequentes - Gerador de Quina"
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

        <RelatedCalculators category="loterias" currentCalculatorId="gerador-quina" />
      </div>
    </div>
  );
}
