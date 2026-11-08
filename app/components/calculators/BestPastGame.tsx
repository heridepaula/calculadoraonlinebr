import { LOTTERIES, type LotteryId } from "~/lib/lottery/definitions";
import type { PublicBestGame } from "~/types/lottery";
import { brlShort } from "./LotteryResultInfo";

/**
 * Faixa discreta do cabeçalho (mesmo formato do `NextDrawBanner`): o jogo da comunidade com mais
 * acertos no concurso auditado mais recente. Não aparece enquanto não houver um.
 */
export function BestPastGame({ lottery, best }: { lottery: LotteryId; best: PublicBestGame | null }) {
  if (!best) return null;
  const def = LOTTERIES[lottery];
  const tierName = def.tierNames?.[best.hits];
  const prized = def.prizeTiers.includes(best.hits);
  const total = best.totalGamesCompeted;
  const drawn = new Set(best.drawnNumbers);
  const dezenas = best.numbers.map((n) => n.toString().padStart(2, "0"));

  return (
    <div className="inline-block rounded-lg bg-finance-gold/10 px-4 py-3">
      <p
        className="!mb-0 text-sm font-medium text-text-primary"
        title={`Dezenas: ${dezenas.map((d, i) => (drawn.has(best.numbers[i]) ? `${d}✓` : d)).join(" ")}. Simulação: jogos gerados aqui não são apostas.`}
      >
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
    </div>
  );
}
