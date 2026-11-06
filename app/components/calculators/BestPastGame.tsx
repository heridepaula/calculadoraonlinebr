import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui";
import { badgeInfo, type BadgeInfo } from "~/lib/lottery/badges";
import { LOTTERIES, type LotteryId } from "~/lib/lottery/definitions";
import { userFrom } from "~/lib/lottery/live-games";
import type { PublicBestGame } from "~/types/lottery";

const pad = (n: number) => n.toString().padStart(2, "0");
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * "Melhor jogo do último sorteio": o jogo da comunidade com mais acertos no concurso auditado
 * mais recente (renderizado no servidor a partir do loader). Não aparece enquanto não houver um.
 */
export function BestPastGame({
  lottery,
  best,
}: {
  lottery: LotteryId;
  best: PublicBestGame | null;
}) {
  if (!best) return null;
  const def = LOTTERIES[lottery];
  const drawn = new Set(best.drawnNumbers);
  const tierName = def.tierNames?.[best.hits];
  const prized = def.prizeTiers.includes(best.hits);
  const badges = best.badges
    .map((id) => badgeInfo(id))
    .filter((b): b is BadgeInfo => b !== undefined);
  const total = best.totalGamesCompeted;

  return (
    <Card className={`${def.themeClass} mx-auto max-w-4xl border-l-4 border-finance-gold`}>
      <CardHeader>
        <CardTitle>🥇 Melhor jogo da comunidade no concurso {best.concursoTarget}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-lg bg-finance-gold px-4 py-2 text-center text-gray-900">
            <div className="text-3xl font-extrabold leading-none">{best.hits}</div>
            <div className="text-xs font-semibold">de {def.gameSize} acertos</div>
          </div>
          {prized ? (
            <div className="rounded-lg bg-system-success/15 px-4 py-2">
              <div className="text-xs font-medium text-text-secondary">
                🎉 Se tivesse sido apostado, acertaria a faixa{" "}
                {tierName ? `da ${tierName.toLowerCase()}` : `de ${best.hits} acertos`}
              </div>
              <div className="text-lg font-bold text-system-success-dark">
                {best.prize
                  ? `Prêmio estimado: ${brl(best.prize)}`
                  : best.prize === 0
                    ? "Faixa sem ganhadores neste concurso"
                    : "Premiação do concurso ainda não divulgada"}
              </div>
            </div>
          ) : (
            <p className="!mb-0 text-sm text-text-secondary">
              Não chegou a uma faixa premiada (a menor paga {Math.min(...def.prizeTiers)} acertos).
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Dezenas do jogo (em verde, as sorteadas)">
          {best.numbers.map((n) => {
            const hit = drawn.has(n);
            return (
              <span
                key={n}
                title={hit ? `${pad(n)}: sorteada` : `${pad(n)}: não sorteada`}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  hit
                    ? "bg-emerald-400 text-gray-900 shadow ring-2 ring-emerald-200"
                    : "bg-neutral-surface text-text-secondary"
                }`}
              >
                {pad(n)}
                <span className="sr-only">{hit ? " (sorteada)" : ""}</span>
              </span>
            );
          })}
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Estratégia usada">
            {badges.map((b) => (
              <span
                key={b.text}
                className="rounded-full border border-lot-500/50 bg-lot-600/15 px-2.5 py-1 text-xs font-medium text-lot-200"
              >
                {b.icon} {b.text}
              </span>
            ))}
          </div>
        )}

        <p className="!mb-0 text-sm text-text-primary">
          {total > 1 ? (
            <>
              Melhor combinação entre os <strong>{total.toLocaleString("pt-BR")} jogos</strong>{" "}
              gerados pela comunidade!
            </>
          ) : (
            <>Único jogo gerado pela comunidade para este concurso.</>
          )}{" "}
          Jogo criado por um usuário <strong>{userFrom(best.location)}</strong>
          {badges.length === 0 && <> com a estratégia {best.strategy}</>}.
        </p>
        <p className="!mb-0 text-xs text-text-secondary">
          Comparação feita com o resultado oficial. O prêmio estimado é o valor pago por ganhador
          naquela faixa; com mais um ganhador ele seria dividido. Jogos gerados aqui não são
          apostas: só concorrem de verdade se forem registrados numa lotérica ou nas Loterias Caixa.
        </p>
      </CardContent>
    </Card>
  );
}
