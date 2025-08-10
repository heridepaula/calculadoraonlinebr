import { Link } from "@remix-run/react";
import { APP_NAME } from "~/lib/constants";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-700 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-600">
            © 2024 {APP_NAME}. Todas as calculadoras são gratuitas e de código aberto.
          </p>
          <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0">
            <Link to="/sobre" className="text-sm text-gray-500 hover:text-blue-600">
              Sobre
            </Link>
            <Link to="/privacidade" className="text-sm text-gray-500 hover:text-blue-600">
              Privacidade
            </Link>
            <button className="text-sm text-gray-500 hover:text-blue-600">
              Termos de Uso
            </button>
            <button className="text-sm text-gray-500 hover:text-blue-600">
              Contato
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
