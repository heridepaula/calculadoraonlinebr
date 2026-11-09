import { Link } from "@remix-run/react";
import { APP_NAME, CALCULATORS, CATEGORIES } from "~/lib/constants";

/** Calculadoras de maior procura, linkadas em todas as páginas pelo rodapé. */
const POPULAR_IDS = [
  "imc",
  "juros-compostos",
  "porcentagem",
  "rescisao-trabalhista",
  "salario-liquido",
  "decimo-terceiro",
  "ferias-decimo-terceiro",
  "regra-de-tres",
  "idade-exata",
  "dias-uteis",
  "financiamento-imobiliario",
  "gerador-cpf",
  "gerador-mega-sena",
];

const POPULAR = POPULAR_IDS.map((id) => CALCULATORS.find((c) => c.id === id)).filter(
  (c): c is (typeof CALCULATORS)[number] => Boolean(c),
);

// p-0 anula o `a { padding: 12px 16px }` global do mobile (globals.css), mantendo o alvo de 44px
const linkClass =
  "flex min-h-[44px] items-center p-0 text-sm text-gray-300 transition-colors hover:text-primary-blue sm:min-h-0 sm:py-1";

const headingClass = "mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-700 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.6fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center p-0 text-lg font-bold text-white hover:text-primary-blue">
              {APP_NAME}
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
              Calculadoras online gratuitas para saúde, finanças, matemática, direitos
              trabalhistas e o dia a dia. Sem cadastro.
            </p>
          </div>

          <nav aria-labelledby="footer-categorias">
            <p id="footer-categorias" className={headingClass}>
              Categorias
            </p>
            <ul className="grid grid-cols-2 gap-x-4 !gap-y-0 sm:grid-cols-1">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={category.path} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-populares">
            <p id="footer-populares" className={headingClass}>
              Mais usadas
            </p>
            <ul className="grid gap-x-4 !gap-y-0 sm:grid-cols-2 lg:grid-cols-1">
              {POPULAR.map((calc) => (
                <li key={calc.id}>
                  <Link to={calc.path} className={linkClass}>
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-institucional">
            <p id="footer-institucional" className={headingClass}>
              Institucional
            </p>
            <ul>
              <li>
                <Link to="/calculadoras" className={linkClass}>
                  Todas as calculadoras
                </Link>
              </li>
              <li>
                <Link to="/sobre" className={linkClass}>
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className={linkClass}>
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className={linkClass}>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contato@calculadoraonlinebr.com.br?subject=Contato%20-%20CalculadoraOnlineBR&body=Olá,%0A%0AEscreva%20sua%20mensagem%20aqui...%0A%0AAtenciosamente,"
                  className={linkClass}
                  title="Enviar email direto para contato@calculadoraonlinebr.com.br"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-400 sm:text-sm">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {APP_NAME}. Todas as
          calculadoras são gratuitas e de código aberto.
        </p>
      </div>
    </footer>
  );
};
