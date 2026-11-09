import { useId, type ReactNode } from "react";

/**
 * Bloco de resposta direta logo abaixo do H1: o que é e como se calcula, em 2 a 4 linhas.
 * Ajuda leitores com pressa e mecanismos de busca e de IA a extrair a resposta da página.
 */
export function DirectAnswer({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return (
    <section
      aria-labelledby={id}
      className="rounded-lg border-l-4 border-primary-blue bg-background-dark-secondary p-5"
    >
      <h2 id={id} className="mb-2 text-lg font-semibold text-text-primary">
        {title}
      </h2>
      <div className="space-y-2 text-sm leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

export default DirectAnswer;
