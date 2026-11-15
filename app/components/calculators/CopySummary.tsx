import { useState } from "react";

/** Caixa com o resumo textual do resultado e o botão de copiar. */
export function CopySummary({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <div className="rounded-lg border border-primary-blue/30 bg-gray-900 p-4">
      <p className="text-sm text-text-primary">{text}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="min-h-[44px] rounded-lg bg-primary-blue px-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary-blue-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue-dark"
        >
          Copiar resumo
        </button>
        <span role="status" className="text-sm text-text-secondary">
          {status === "copied" && "✅ Resumo copiado!"}
          {status === "failed" && "Não foi possível copiar. Selecione o texto manualmente."}
        </span>
      </div>
    </div>
  );
}
