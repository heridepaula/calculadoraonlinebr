import { Link } from "@remix-run/react";
import { APP_NAME } from "~/lib/constants";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-700 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-xs text-gray-600 sm:text-sm">
            © 2024 {APP_NAME}. Todas as calculadoras são gratuitas e de código aberto.
          </p>
          <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0">
            <Link
              to="/sobre"
              className="flex min-h-[44px] items-center text-xs text-gray-500 hover:text-blue-600 sm:text-sm"
            >
              Sobre
            </Link>
            <Link
              to="/privacidade"
              className="flex min-h-[44px] items-center text-xs text-gray-500 hover:text-blue-600 sm:text-sm"
            >
              Privacidade
            </Link>
            <button className="flex min-h-[44px] items-center text-xs text-gray-500 hover:text-blue-600 sm:text-sm">
              Termos de Uso
            </button>
            <button className="flex min-h-[44px] items-center text-xs text-gray-500 hover:text-blue-600 sm:text-sm">
              Contato
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
