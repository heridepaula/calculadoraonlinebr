import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui";

export interface SourceLink {
  label: string;
  href: string;
}

interface SourcesAndUpdateProps {
  /** Legislação e tabelas oficiais usadas no cálculo */
  sources: readonly SourceLink[];
  /** Data da última revisão do conteúdo e das tabelas (AAAA-MM-DD) */
  updatedAt: string;
  /** Frase curta sobre o que foi conferido, ex.: "Tabelas de INSS e IRRF de 2026" */
  reviewNote?: string;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Bloco "Fontes e atualização" das calculadoras de temas sensíveis (trabalhista, finanças,
 * saúde): lista a legislação usada, mostra a data da última revisão e aponta a metodologia.
 */
export function SourcesAndUpdate({ sources, updatedAt, reviewNote }: SourcesAndUpdateProps) {
  return (
    <Card className="border border-neutral-surface-variant bg-background-dark-secondary">
      <CardHeader>
        <CardTitle as="h2" className="text-lg font-bold text-text-primary">
          📑 Fontes e Atualização
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-text-secondary">
          Última atualização:{" "}
          <time dateTime={updatedAt} className="font-semibold text-text-primary">
            {dateFormatter.format(new Date(`${updatedAt}T00:00:00Z`))}
          </time>
          {reviewNote ? `. ${reviewNote}.` : "."} Os cálculos seguem a legislação abaixo; veja
          também{" "}
          <Link
            to="/sobre#metodologia"
            className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
          >
            como revisamos as calculadoras
          </Link>
          .
        </p>
        <ul className="space-y-2 text-sm">
          {sources.map((source) => (
            <li key={source.href} className="flex gap-2">
              <span aria-hidden="true" className="text-gray-400">
                •
              </span>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-blue-dark underline hover:text-primary-blue"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-gray-400">
          Os resultados são simulações informativas e não substituem o cálculo do departamento
          pessoal, de um contador ou de um advogado.
        </p>
      </CardContent>
    </Card>
  );
}

export default SourcesAndUpdate;
