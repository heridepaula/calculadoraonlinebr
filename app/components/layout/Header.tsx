import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "@remix-run/react";
import { APP_NAME, CATEGORIES } from "~/lib/constants";

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-[44px] items-center rounded-lg px-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary-blue/10 text-primary-blue"
      : "text-text-secondary-dark hover:bg-white/5 hover:text-text-primary"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary-blue/10 text-primary-blue"
      : "text-text-primary hover:bg-white/5"
  }`;

/**
 * Cabeçalho com navegação por categoria em todas as páginas. No mobile o menu usa
 * <details>, então os links ficam no HTML do SSR (rastreáveis) e funcionam sem JS.
 */
export function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const { pathname } = useLocation();

  // Fecha o menu ao navegar
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  // Fecha com Esc ou com clique fora
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const menu = menuRef.current;
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="shadow-default relative z-40 border-b border-light bg-background-dark-secondary">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4 md:h-14">
          <Link
            to="/"
            className="group flex shrink-0 items-center space-x-2 transition-all duration-200 hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-light bg-card-bg transition-transform group-hover:scale-110">
              <img
                src="/favicon-32x32.webp"
                alt=""
                className="h-5 w-5"
                width={20}
                height={20}
              />
            </div>
            <span className="text-base font-bold text-text-primary sm:text-lg md:text-xl">
              {APP_NAME}
            </span>
          </Link>

          <nav aria-label="Categorias" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <NavLink to={category.path} prefetch="intent" className={desktopLinkClass}>
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <details ref={menuRef} className="group relative xl:hidden">
            <summary className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-light px-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-white/5 sm:px-3 [&::-webkit-details-marker]:hidden">
              {/* No mobile só o ícone; o texto continua disponível para leitores de tela */}
              <span className="sr-only sm:not-sr-only">Categorias</span>
              <svg
                className="h-5 w-5 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  className="group-open:hidden"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className="hidden group-open:block"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </summary>
            <nav
              aria-label="Categorias"
              className="absolute right-0 top-full mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-light bg-background-dark-secondary p-2 shadow-2xl"
            >
              <ul>
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <NavLink to={category.path} className={mobileLinkClass}>
                      <span aria-hidden="true">{category.icon}</span>
                      {category.name}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-1 border-t border-light pt-1">
                  <NavLink to="/calculadoras" end className={mobileLinkClass}>
                    <span aria-hidden="true">🧮</span>
                    Todas as calculadoras
                  </NavLink>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
