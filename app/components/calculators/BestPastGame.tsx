import { badgeInfo, type BadgeInfo } from "~/lib/lottery/badges";
import { LOTTERIES, type LotteryId } from "~/lib/lottery/definitions";
import { userFrom } from "~/lib/lottery/live-games";
import type { PublicBestGame } from "~/types/lottery";
import { brlShort } from "./LotteryResultInfo";

const pad = (n: number) => n.toString().padStart(2, "0");

/**
 * Faixa discreta do cabeçalho (mesmo formato do `NextDrawBanner`): o jogo da comunidade com mais
 * acertos no concurso auditado mais recente, com dezenas, estratégia e cidade. Não aparece enquanto
 * não houver um.
 */
export function BestPastGame({ lottery, best }: { lottery: LotteryId; best: PublicBestGame | null }) {
  if (!best) return null;
  const def = LOTTERIES[lottery];
  const tierName = def.tierNames?.[best.hits];
  const prized = def.prizeTiers.includes(best.hits);
  const total = best.totalGamesCompeted;
  const drawn = new Set(best.drawnNumbers);
  const badges = best.badges.map((id) => badgeInfo(id)).filter((b): b is BadgeInfo => b !== undefined);
  const strategy = badges.length ? badges.map((b) => `${b.icon} ${b.text}`).join(" · ") : best.strategy;

  return (
    <div className="inline-block max-w-full space-y-2 rounded-lg bg-finance-gold/10 px-4 py-3 text-sm text-text-primary">
      <p className="!mb-0 font-medium">
        🥇 Melhor jogo da comunidade no concurso <strong>{best.concursoTarget}</strong>:{" "}
        <strong className="text-finance-gold">
          {best.hits} de {def.gameSize} acertos
        </strong>
        {prized && tierName && <> ({tierName.toLowerCase()})</>}
        {prized && best.prize ? (
          <>
            {" "}· prêmio estimado <strong className="text-finance-gold">{brlShort(best.prize)}</strong> se apostado
          </>
        ) : null}
        {total > 1 && <> · entre {total.toLocaleString("pt-BR")} jogos</>}
      </p>

      <div
        className="flex flex-wrap justify-center gap-1"
        aria-label="Dezenas do jogo (em destaque, as sorteadas)"
      >
        {best.numbers.map((n) => {
          const hit = drawn.has(n);
          return (
            <span
              key={n}
              title={hit ? `${pad(n)}: sorteada` : `${pad(n)}: não sorteada`}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                hit ? "bg-finance-gold text-gray-900" : "bg-neutral-surface text-text-secondary"
              }`}
            >
              {pad(n)}
              <span className="sr-only">{hit ? " (sorteada)" : ""}</span>
            </span>
          );
        })}
      </div>

      <p className="!mb-0 text-xs text-text-secondary">
        Estratégia: <span className="text-text-primary">{strategy}</span> · usuário {userFrom(best.location)} ·
        simulação, não foi apostado
      </p>
    </div>
  );
}
