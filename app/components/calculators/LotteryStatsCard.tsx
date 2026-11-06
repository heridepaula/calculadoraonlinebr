import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui";
import { LOTTERIES } from "~/lib/lottery/definitions";
import { formatDateBR, type LotteryStats } from "~/lib/lottery/stats";

const pad = (n: number) => n.toString().padStart(2, "0");

/**
 * Card "Análise Estatística" calculado do banco (Mega-Sena, Quina): frequência, atrasadas,
 * padrões, primos e linhas do volante. Atualiza sozinho a cada concurso gravado pelo cron.
 */
export function LotteryStatsCard({ stats }: { stats: LotteryStats }) {
  const def = LOTTERIES[stats.lottery];
  const p = stats.patterns;
  const N = def.universe;
  const K = def.gameSize;
  const rows = N / def.columns;
  const expectedPct = Math.round((K / N) * 1000) / 10;

  return (
    <Card className="mx-auto max-w-4xl border-l-4 border-system-info">
      <CardHeader>
        <CardTitle>📊 Análise Estatística da {def.name}</CardTitle>
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
              Cada dezena aparece em cerca de {expectedPct.toLocaleString("pt-BR")}% dos concursos ({K} de {N}, esperado ao acaso). A variação real
              vai de {Math.min(...stats.frequency.map((f) => f.pct)).toLocaleString("pt-BR")}% a{" "}
              {Math.max(...stats.frequency.map((f) => f.pct)).toLocaleString("pt-BR")}%: a diferença é pequena e os sorteios são independentes, então
              quente/frio é só um critério de variação.
            </p>
          )}
        </div>

        {/* Números Atrasados */}
        {stats.overdue.length > 0 && (
          <div>
            <h4 className="mb-3 font-semibold">⏳ Números Atrasados</h4>
            <p className="mb-3 text-sm text-text-secondary">
              Dezenas que não saem há {def.overdueMinDelay} sorteios ou mais (o dobro do intervalo médio), até o concurso {stats.ultimoConcurso}. O
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
            Em média, {p.repeatedFromPrevious.toLocaleString("pt-BR")} das {K} dezenas se repetem do concurso anterior.
          </p>
        </div>

        {/* Primos e volante */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-surface-variant p-3">
            <h5 className="mb-2 text-sm font-medium text-system-info">
              🔢 Números Primos (1–{N})
            </h5>
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
              O volante tem {rows} linhas de {def.columns} dezenas (01–{pad(def.columns)}, {def.columns + 1}–{def.columns * 2}, …,{" "}
              {N - def.columns + 1}–{N}). Em {p.rows.coverage.toLocaleString("pt-BR")}% dos concursos nenhuma linha teve mais de {p.rows.limit}{" "}
              {p.rows.limit === 1 ? "dezena sorteada" : "dezenas sorteadas"}. O filtro &quot;Por linha&quot; do gerador evita jogos concentrados
              numa mesma linha.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
