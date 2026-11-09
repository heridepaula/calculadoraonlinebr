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
import { MEGASENA } from "~/lib/lottery/definitions";
import { buildStatsFaq, type LotteryStats } from "~/lib/lottery/stats";
import { LotteryGenerator } from "~/components/calculators/LotteryGenerator";
import { LatestResultCard, NextDrawBanner } from "~/components/calculators/LotteryResultInfo";
import { LotteryStatsCard } from "~/components/calculators/LotteryStatsCard";
import { getStats } from "~/services/lottery/statistics.server";
import { getCommunityGames } from "~/services/lottery/generatedGames.server";
import { LiveGamesFeed } from "~/components/calculators/LiveGamesFeed";
import { BestPastGame } from "~/components/calculators/BestPastGame";
import { buildCalculatorMeta } from "~/lib/page-meta";

// Estatísticas vêm do MongoDB e mudam a cada sorteio novo. O CDN serve a página por até 5 min
// e revalida em segundo plano, então um concurso gravado pelo cron aparece em poucos minutos.
export async function loader() {
  const [stats, community] = await Promise.all([getStats(MEGASENA), getCommunityGames(MEGASENA)]);
  return json({ stats, community });
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" };
}

export const meta: MetaFunction = () => {
  return [
    ...buildCalculatorMeta("gerador-mega-sena"),
  ];
};


/** Chances da aposta simples (6 dezenas): C(60,6) e faixas da Caixa. */
const ODDS_FAQ = {
  question: "Quais são as chances de ganhar na Mega-Sena?",
  answer:
    "Com uma aposta simples de 6 dezenas, a chance de acertar a sena é de 1 em 50.063.860; a quina, 1 em 154.518; e a quadra, 1 em 2.332. Nenhuma estratégia muda essas probabilidades: todas as combinações têm a mesma chance em cada sorteio.",
};

export default function GeradorMegaSena() {
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
          <div className="flex flex-wrap justify-center gap-2">
            <NextDrawBanner latest={latest} />
            <BestPastGame lottery="megasena" best={community.best} />
          </div>
        </header>

        <LotteryGenerator stats={stats} />

        <LiveGamesFeed lottery="megasena" pusher={community.pusher} initial={community.recent} />

        {/* Último resultado */}
        <LatestResultCard lottery="megasena" latest={latest} />

        <LotteryStatsCard stats={stats} />

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
