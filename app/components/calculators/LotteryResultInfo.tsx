import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui";
import { LOTTERIES } from "~/lib/lottery/definitions";
import { formatDateBR } from "~/lib/lottery/stats";
import type { LotteryLatest } from "~/types/lottery";

const pad = (n: number) => n.toString().padStart(2, "0");
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
/** "R$ 55 milhões" para valores grandes; moeda completa para os demais. */
export const brlShort = (v: number) =>
  v >= 1e6 ? `R$ ${(v / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${v >= 2e6 ? "milhões" : "milhão"}` : brl(v);

/** Nome tradicional da faixa (só a Mega-Sena tem). */
const TIER_NAMES: Partial<Record<keyof typeof LOTTERIES, Record<number, string>>> = {
  megasena: { 6: "Sena", 5: "Quina", 4: "Quadra" },
};

/** Faixa do cabeçalho: próximo concurso e prêmio estimado (ou os destaques, sem dados do próximo). */
export function NextDrawBanner({ latest }: { latest?: LotteryLatest }) {
  if (!latest?.proximo) {
    return (
      <div className="inline-block rounded-lg bg-system-success/10 p-4">
        <p className="!mb-0 text-sm font-medium text-text-primary">
          🎯 <strong>Estratégias Inteligentes</strong> • 📊 <strong>Análise Estatística</strong> • 💾{" "}
          <strong>Histórico Salvo</strong>
        </p>
      </div>
    );
  }
  const { proximo } = latest;
  return (
    <div className="inline-block rounded-lg bg-system-success/10 px-4 py-3">
      <p className="!mb-0 text-sm font-medium text-text-primary">
        🎯 Próximo concurso <strong>{proximo.concurso}</strong> em <strong>{formatDateBR(proximo.data)}</strong> · prêmio
        estimado <strong className="text-system-success-dark">{brlShort(proximo.estimativa)}</strong>
      </p>
    </div>
  );
}

/** Card do último concurso: dezenas, acumulou e tabela de premiação. */
export function LatestResultCard({ lottery, latest }: { lottery: keyof typeof LOTTERIES; latest?: LotteryLatest }) {
  if (!latest) return null;
  const def = LOTTERIES[lottery];
  const names = TIER_NAMES[lottery];
  const top = def.prizeTiers[0];
  const tierLabel = (acertos: number) => (names?.[acertos] ? `${names[acertos]} (${acertos} acertos)` : `${acertos} acertos`);

  return (
    <Card className={`${def.themeClass} mx-auto max-w-4xl border-l-4 border-system-success`}>
      <CardHeader>
        <CardTitle>
          🏆 Último resultado: concurso {latest.concurso} ({formatDateBR(latest.data)})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2" aria-label="Dezenas sorteadas">
          {latest.dezenas.map((n) => (
            <span key={n} className="flex h-11 w-11 items-center justify-center rounded-full bg-lot-600 text-base font-bold text-white shadow">
              {pad(n)}
            </span>
          ))}
          {latest.acumulou !== undefined && (
            <span
              className={`self-center rounded-full px-3 py-1 text-xs font-semibold ${
                latest.acumulou ? "bg-system-warning/20 text-system-warning-dark" : "bg-system-success/20 text-system-success-dark"
              }`}
            >
              {latest.acumulou ? "Acumulou!" : names?.[top] ? `Teve ganhador da ${names[top].toLowerCase()}` : `Teve ganhador de ${top} acertos`}
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
                    <td className="py-2 pr-3 font-medium text-text-primary">{tierLabel(f.acertos)}</td>
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
  );
}
