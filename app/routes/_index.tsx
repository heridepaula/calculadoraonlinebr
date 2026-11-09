import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { CategoryCard } from "~/components/CategoryCard";
import { APP_NAME, CATEGORIES, CALCULATORS } from "~/lib/constants";
import type { Category } from "~/types";
import { buildPageMeta } from "~/lib/page-meta";

export const meta: MetaFunction = () => {
  const siteUrl = "https://www.calculadoraonlinebr.com.br";

  return [
    ...buildPageMeta({
      title: "Calculadoras Online Gratuitas: IMC, Juros, Rescisão e Mais",
      description:
        "Mais de 70 calculadoras online gratuitas: IMC, juros compostos, porcentagem, rescisão trabalhista e mais. Resultados na hora e sem cadastro.",
      path: "/",
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Calculadoras Online Gratuitas",
        description:
          "66+ calculadoras online gratuitas para saúde, finanças, matemática e trabalhista",
        url: siteUrl,
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: APP_NAME,
          url: siteUrl,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
          ],
        },
      },
    },
  ];
};

const TOTAL_CALCULATORS = CALCULATORS.length;

// Top 3 per category — curated highlights surfaced as podium on each category card.
const TOP_BY_CATEGORY: Record<string, string[]> = {
  saude: ["imc", "gordura-corporal", "ciclo-menstrual"],
  financas: ["tesouro-direto", "financiamento-imobiliario", "cdb"],
  matematica: ["porcentagem", "calculadora-cientifica", "regra-de-tres"],
  trabalhista: ["rescisao-trabalhista", "salario-liquido", "aposentadoria"],
  ferramentas: ["gerador-cpf", "gerador-senha-segura", "conversor-unidades"],
  astrologia: ["signo", "ascendente-astrologico", "numerologia"],
  datas: ["diferenca-entre-datas", "idade-exata", "dias-uteis"],
  loterias: ["gerador-mega-sena", "gerador-lotofacil", "gerador-quina"],
  apostas: ["valor-esperado", "criterio-de-kelly", "surebet"],
};

function getCalculator(id: string) {
  return CALCULATORS.find((c) => c.id === id);
}

// Counter that animates from 0 to target on mount (respects prefers-reduced-motion).
function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export default function Index() {
  const liveCount = useCountUp(TOTAL_CALCULATORS);

  return (
    <div className="min-h-screen relative">
      {/* Global atmospheric noise overlay — fixed, ignores scroll, sits above bg gradients */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px",
        }}
      />

      {/* ────────────────────────────────────────────────── HERO ── */}
      <section className="relative isolate overflow-hidden">
        {/* Layered background: radial spotlight + diagonal mesh */}
        <div className="absolute inset-0 -z-10 bg-background-dark" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(100,181,246,0.18), transparent 60%), radial-gradient(circle at 85% 30%, rgba(255,213,79,0.10), transparent 50%), radial-gradient(circle at 15% 70%, rgba(186,104,200,0.10), transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left column — copy */}
          <div className="lg:col-span-7">
            <div
              className="mb-8 inline-flex items-center rounded-full bg-primary-blue/10 px-4 py-2 text-sm font-medium text-primary-blue-dark ring-1 ring-inset ring-primary-blue/20 animate-slide-up"
              style={{ animationDelay: "40ms", animationFillMode: "backwards" }}
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-system-success animate-pulse" />
              {TOTAL_CALCULATORS}+ calculadoras em 8 categorias
            </div>

            <h1
              className="max-w-3xl text-5xl tracking-tight text-text-primary sm:text-6xl lg:text-7xl animate-slide-up"
              style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
            >
              <span className="font-display font-normal italic text-text-secondary-dark">A calculadora</span>
              <span className="block font-bold">que resolve</span>
              <span className="block bg-gradient-to-r from-primary-blue via-finance-gold to-math-purple bg-clip-text text-transparent font-bold">
                tudo que você precisa.
              </span>
            </h1>

            <p
              className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary-dark sm:text-xl animate-slide-up"
              style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
            >
              <strong className="text-text-primary">IMC, Juros Compostos, Rescisão Trabalhista, Tesouro Direto</strong>
              {" "}e muito mais. Resultados instantâneos, sem cadastro, otimizado para mobile.
            </p>

            {/* Trust strip — real data, no fake numbers */}
            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-secondary animate-slide-up"
              style={{ animationDelay: "280ms", animationFillMode: "backwards" }}
            >
              {[
                { dot: "bg-system-success", label: "100% Gratuito" },
                { dot: "bg-primary-blue", label: "Sem Cadastro" },
                { dot: "bg-finance-gold", label: "Resultados Instantâneos" },
                { dot: "bg-health-red", label: "Mobile First" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 animate-slide-up"
                  style={{
                    animationDelay: `${320 + i * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <div className={`h-2 w-2 rounded-full ${item.dot}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA pair */}
            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row animate-slide-up"
              style={{ animationDelay: "560ms", animationFillMode: "backwards" }}
            >
              <Link
                to="/calculadoras"
                className="inline-flex items-center justify-center rounded-xl bg-primary-blue px-7 py-4 text-base font-semibold text-white shadow-lg shadow-primary-blue/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-blue/30 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-background-dark"
              >
                Ver todas as {TOTAL_CALCULATORS} calculadoras →
              </Link>
              <Link
                to="/calculadoras/financas/juros-compostos"
                className="inline-flex items-center justify-center rounded-xl border border-text-secondary/30 bg-transparent px-7 py-4 text-base font-semibold text-text-primary transition-all duration-300 hover:border-primary-blue hover:bg-primary-blue/5 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                Calcular juros compostos
              </Link>
            </div>
          </div>

          {/* Right column — animated big-number stat (display font) */}
          <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
            <div
              className="relative w-full max-w-md animate-slide-up"
              style={{ animationDelay: "420ms", animationFillMode: "backwards" }}
            >
              <div className="rounded-3xl border border-primary-blue/20 bg-gradient-to-br from-background-dark-secondary/80 to-background-dark/50 backdrop-blur-sm p-10 shadow-2xl shadow-primary-blue/5">
                <div className="text-xs uppercase tracking-[0.3em] text-text-secondary mb-4">
                  Calculadoras disponíveis hoje
                </div>
                <div
                  className="font-display font-normal leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary-blue via-finance-gold to-math-purple"
                  style={{ fontSize: "12rem", lineHeight: "0.85" }}
                  aria-label={`${TOTAL_CALCULATORS} calculadoras disponíveis`}
                >
                  {liveCount}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2 py-1.5"
                    >
                      <span className="text-base" aria-hidden>
                        {cat.icon}
                      </span>
                      <span className="text-text-secondary truncate">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────── POPULAR NOW (curated) ── */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-finance-gold-dark mb-2">
                Em alta
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
                <span className="font-display italic font-normal">As mais</span> usadas no momento
              </h2>
            </div>
            <Link
              to="/calculadoras"
              className="text-sm font-medium text-primary-blue hover:text-primary-blue-dark transition-colors"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                to: "/calculadoras/financas/tesouro-direto",
                title: "Tesouro Direto",
                sub: "Títulos Públicos",
                icon: "🏛️",
                card: "border-finance-gold/15 bg-gradient-to-br from-finance-gold/[0.06] to-finance-gold/[0.02] hover:border-finance-gold/40 hover:shadow-finance-gold/10",
                iconBg: "bg-finance-gold",
              },
              {
                to: "/calculadoras/financas/financiamento-imobiliario",
                title: "Financiamento",
                sub: "Imobiliário",
                icon: "🏠",
                card: "border-primary-blue/15 bg-gradient-to-br from-primary-blue/[0.06] to-primary-blue/[0.02] hover:border-primary-blue/40 hover:shadow-primary-blue/10",
                iconBg: "bg-primary-blue",
              },
              {
                to: "/calculadoras/financas/cdb",
                title: "CDB",
                sub: "Certificado de Depósito",
                icon: "💰",
                card: "border-system-success/15 bg-gradient-to-br from-system-success/[0.06] to-system-success/[0.02] hover:border-system-success/40 hover:shadow-system-success/10",
                iconBg: "bg-system-success",
              },
              {
                to: "/calculadoras/financas/juros-compostos",
                title: "Juros Compostos",
                sub: "Investimentos",
                icon: "📈",
                card: "border-math-purple/15 bg-gradient-to-br from-math-purple/[0.06] to-math-purple/[0.02] hover:border-math-purple/40 hover:shadow-math-purple/10",
                iconBg: "bg-math-purple",
              },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${c.card}`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${c.iconBg}`}
                  >
                    <span className="text-xl">{c.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{c.title}</h3>
                    <p className="text-xs text-text-secondary">{c.sub}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────── #1 BY CATEGORY (all 8 categories) ── */}
      <section className="relative py-16 sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 80%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-math-purple-dark mb-2">
              Pódio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              <span className="font-display italic font-normal">Top 3</span> por categoria
            </h2>
            <p className="mt-3 text-text-secondary-dark">
              As favoritas dos brasileiros em cada área
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((category) => {
              const topIds = TOP_BY_CATEGORY[category.id] ?? [];
              const top = topIds.map(getCalculator).filter(Boolean);
              if (top.length === 0) return null;

              const medals = ["🥇", "🥈", "🥉"];
              const medalColors = [
                "border-yellow-400/30 bg-yellow-500/[0.08] hover:bg-yellow-500/[0.14] text-yellow-300",
                "border-gray-400/30 bg-gray-400/[0.08] hover:bg-gray-400/[0.14] text-gray-300",
                "border-amber-500/30 bg-amber-500/[0.08] hover:bg-amber-500/[0.14] text-amber-400",
              ];

              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-white/[0.05] bg-gradient-to-br from-background-dark-secondary/60 to-background-dark/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5"
                >
                  <Link
                    to={category.path}
                    className="mb-5 flex items-center space-x-3 group"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-all duration-300 group-hover:ring-primary-blue/40 group-hover:scale-105">
                      <span className="text-xl" aria-hidden>
                        {category.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-blue transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-widest text-text-secondary">
                        Ver categoria →
                      </p>
                    </div>
                  </Link>

                  <div className="space-y-2">
                    {top.map((calc, i) => (
                      <Link
                        key={calc!.id}
                        to={calc!.path}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 ${medalColors[i]}`}
                      >
                        <span className="text-base flex-shrink-0" aria-hidden>
                          {medals[i]}
                        </span>
                        <span className="font-medium text-text-primary flex-1 truncate">
                          {calc!.name.replace(/^Calculadora de /, "").replace(/^Gerador de /, "")}
                        </span>
                        <span className="text-[10px] font-bold opacity-70">
                          #{i + 1}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────── ALL CATEGORIES ── */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-primary-blue mb-2">
              Navegação
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              <span className="font-display italic font-normal">Explore</span> todas as categorias
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATEGORIES.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────── FINAL CTA ── */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        {/* Mesh gradient background, not a flat linear */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(100,181,246,0.5), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,213,79,0.35), transparent 50%), radial-gradient(circle at 50% 100%, rgba(186,104,200,0.3), transparent 60%), #0b1426",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            <span className="font-display italic font-normal">Comece</span> a calcular agora
          </h2>
          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
            {TOTAL_CALCULATORS} ferramentas confiáveis em 8 categorias. Sem cadastro, sem anúncios pop-up, sem pegadinhas.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:items-center">
            <Link
              to="/calculadoras"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-background-dark shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-blue-dark"
              aria-label="Ver todas as calculadoras"
            >
              Ver todas as {TOTAL_CALCULATORS} calculadoras
            </Link>
          </div>

          {/* Quick category chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.path}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:border-white/40"
              >
                <span aria-hidden>{c.icon}</span>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
