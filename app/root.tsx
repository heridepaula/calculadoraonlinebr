import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link } from "@remix-run/react";
import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ThemeProvider } from "~/lib/theme-context";

import "./tailwind.css";
import "./styles/globals.css";
import "./styles/colors.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect", 
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Loader with dark theme (always dark)
export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    resolvedTheme: "dark" as const,
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { charset: "utf-8" },
    { title: "Calculadora Online BR" },
    { name: "description", content: "Calculadoras online gratuitas para facilitar seu dia a dia" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "theme-color", content: "#64B5F6" },
    { name: "color-scheme", content: "dark" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {  
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background-dark font-inter antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <header className="shadow-default border-light border-b bg-background-dark-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                to="/"
                className="group flex items-center space-x-2 transition-all duration-200 hover:opacity-90"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-blue transition-transform group-hover:scale-110">
                  <span className="text-sm font-bold text-white">C</span>
                </div>
                <h1 className="text-xl font-bold text-text-primary">
                  Calculadora Online BR
                </h1>
              </Link>

              <div className="flex items-center space-x-4">
                {/* Fixed dark theme - no theme toggle */}
              </div>
            </div>
          </div>
        </header>

        <main
          id="main-content"
          className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
          role="main"
          aria-label="Conteúdo principal"
        >
          <Outlet />
        </main>

        <footer className="border-light mt-auto border-t bg-background-dark-secondary">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-sm text-text-secondary">
                © 2024 Calculadora Online BR. Todas as calculadoras são gratuitas e de código aberto.
              </p>
              <div className="mb-4 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0">
                <Link to="/sobre" className="text-sm text-text-secondary transition-colors hover:text-primary-blue">
                  Sobre
                </Link>
                <Link to="/privacidade" className="text-sm text-text-secondary transition-colors hover:text-primary-blue">
                  Privacidade
                </Link>
                <Link to="/termos-de-uso" className="text-sm text-text-secondary transition-colors hover:text-primary-blue">
                  Termos de Uso
                </Link>
                <button className="text-sm text-text-secondary transition-colors hover:text-primary-blue">
                  Contato
                </button>
              </div>
              <p className="text-xs text-text-secondary opacity-75">
                Design moderno e funcional para facilitar seus cálculos
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

