import { Link } from "@remix-run/react";
import { APP_NAME } from "~/lib/constants";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-700 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-xs text-gray-400 sm:text-sm">
            © 2024 {APP_NAME}. Todas as calculadoras são gratuitas e de código aberto.
          </p>
          <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0">
            <Link
              to="/sobre"
              className="flex min-h-[44px] items-center text-xs text-gray-300 hover:text-blue-400 sm:text-sm"
            >
              Sobre
            </Link>
            <Link
              to="/privacidade"
              className="flex min-h-[44px] items-center text-xs text-gray-300 hover:text-blue-400 sm:text-sm"
            >
              Privacidade
            </Link>
            <Link
              to="/termos-de-uso"
              className="flex min-h-[44px] items-center text-xs text-gray-300 hover:text-blue-400 sm:text-sm"
            >
              Termos de Uso
            </Link>
            <a
              href="mailto:contato@calculadoraonlinebr.com?subject=Contato%20-%20CalculadoraOnlineBR&body=Olá,%0A%0AEscreva%20sua%20mensagem%20aqui...%0A%0AAtenciosamente,"
              className="flex min-h-[44px] items-center text-xs text-gray-300 hover:text-blue-400 sm:text-sm"
              title="Enviar email direto para contato@calculadoraonlinebr.com"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
