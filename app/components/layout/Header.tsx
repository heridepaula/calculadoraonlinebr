import { Link } from "@remix-run/react";
import { APP_NAME } from "~/lib/constants";

export const Header = () => {
  return (
    <header className="border-b border-gray-700 bg-gray-900 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-14">
          <Link to="/" className="flex items-center space-x-2" aria-label="Ir para página inicial">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <span className="text-2xl font-bold text-gray-100 sm:text-lg md:text-xl">
              <span className="sm:hidden md:inline">{APP_NAME}</span>
            </span>
          </Link>

          <nav className="hidden items-center space-x-4 md:hidden md:space-x-2 lg:flex">
            <Link
              to="/"
              className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 md:text-xs"
            >
              Início
            </Link>
            <Link
              to="/calculadoras"
              className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 md:text-xs"
            >
              Calculadoras
            </Link>
          </nav>

          <button
            className="min-h-[44px] min-w-[44px] rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
            aria-label="Menu de navegação"
            aria-expanded="false"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
