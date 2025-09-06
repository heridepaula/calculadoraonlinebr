import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
  return [
    { title: "Página não encontrada - CalculadoraOnlineBR" },
    {
      name: "description",
      content: "Página não encontrada. Volte à nossa calculadora gratuita.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="space-y-8 py-16">
        {/* Logo/Image */}
        <div className="flex justify-center">
          <img
            src="/android-chrome-512x512.webp"
            alt="CalculadoraOnlineBR"
            className="h-32 w-32 opacity-80"
            loading="eager"
          />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-400">404</h1>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Página não encontrada</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Ops! A página que você está procurando não existe ou foi movida. Que tal explorar nossas
            calculadoras gratuitas?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Voltar ao início
          </Link>
          <Link
            to="/calculadoras"
            className="inline-flex items-center justify-center rounded-lg border border-gray-600 bg-transparent px-6 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Ver calculadoras
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8">
          <h3 className="mb-6 text-xl font-semibold text-white">Calculadoras mais populares</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/calculadoras/saude/imc"
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <div className="mb-2 text-2xl">🏥</div>
              <div className="font-medium">Calculadora de IMC</div>
            </Link>
            <Link
              to="/calculadoras/financas/juros-compostos"
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <div className="mb-2 text-2xl">💰</div>
              <div className="font-medium">Juros Compostos</div>
            </Link>
            <Link
              to="/calculadoras/matematica/porcentagem"
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <div className="mb-2 text-2xl">🔢</div>
              <div className="font-medium">Porcentagem</div>
            </Link>
            <Link
              to="/calculadoras/trabalhista/salario-liquido"
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <div className="mb-2 text-2xl">👷</div>
              <div className="font-medium">Salário Líquido</div>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-8 text-sm text-gray-400">
          <p>
            Se você acredita que isso é um erro, entre em contato conosco em{" "}
            <a
              href="mailto:contato@calculadoraonlinebr.com.br"
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              contato@calculadoraonlinebr.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
