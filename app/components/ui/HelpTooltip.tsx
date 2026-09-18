import { useEffect, useId, useRef, useState } from "react";

interface HelpTooltipProps {
  /** Nome do termo explicado, usado no rótulo acessível do botão (ex.: "Valor Esperado"). */
  term: string;
  children: string;
}

/**
 * Botão "?" com explicação curta. Abre ao passar o mouse, ao focar pelo teclado e ao tocar
 * (celular); fecha com Esc, ao tocar fora ou ao sair do botão.
 */
export function HelpTooltip({ term, children }: HelpTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const handlePointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [open]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`O que é ${term}?`}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        // Área de toque de 44px sem aumentar o círculo visível
        className="-m-3 inline-flex h-11 w-11 items-center justify-center rounded-full focus:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-primary-blue-dark"
      >
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full border border-text-secondary/60 text-xs font-bold text-text-secondary transition-colors hover:border-primary-blue-dark hover:text-primary-blue-dark"
        >
          ?
        </span>
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          // Alinhado à esquerda do botão: os "?" ficam logo após labels alinhados à esquerda,
          // e um tooltip centralizado sairia da tela no celular
          className="absolute bottom-full left-0 z-20 mb-2 w-64 max-w-[80vw] rounded-lg border border-neutral-surface-variant bg-gray-900 p-3 text-left text-xs font-normal leading-relaxed text-text-primary shadow-xl"
        >
          {children}
        </span>
      )}
    </span>
  );
}
