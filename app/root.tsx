import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link } from "@remix-run/react";
import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ThemeProvider } from "~/lib/theme-context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnalyticsProvider } from "~/lib/analytics-provider";
import { GlobalErrorBoundary } from "~/components/ErrorBoundary";
import { useGoogleAnalytics } from "~/hooks/useGoogleAnalytics";
import { isGAEnabled, GA_TRACKING_ID } from "~/lib/google-analytics";
import { useCloudflareAnalyticsSimple } from "~/hooks/useCloudflareAnalytics";
import { isCloudflareEnabled, CLOUDFLARE_TOKEN } from "~/lib/cloudflare-analytics";
import { CookieConsent, CSSLoadingDetector } from "~/components";
import { Footer } from "~/components/layout/Footer";

import "./tailwind.css";
import "./styles/globals.css";
import "./styles/colors.css";

export const links: LinksFunction = () => [
  // Fonts
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

  // AdSense Performance Optimization
  { rel: "preconnect", href: "https://pagead2.googlesyndication.com" },
  { rel: "preconnect", href: "https://googleads.g.doubleclick.net" },
  { rel: "dns-prefetch", href: "https://pagead2.googlesyndication.com" },
  { rel: "dns-prefetch", href: "https://googleads.g.doubleclick.net" },

  // Favicons and Icons
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "icon", type: "image/webp", sizes: "16x16", href: "/favicon-16x16.webp" },
  { rel: "icon", type: "image/webp", sizes: "32x32", href: "/favicon-32x32.webp" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.webp" },

  // Web App Manifest
  { rel: "manifest", href: "/site.webmanifest" },

  // Android Chrome Icons
  { rel: "shortcut icon", href: "/android-chrome-192x192.webp" },
];

// Loader with dark theme (always dark) and analytics configuration
export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    resolvedTheme: "dark" as const,
    // Fornecer variáveis de ambiente para o cliente
    ENV: {
      VITE_GA_ID: process.env.VITE_GA_ID,
      VITE_CLOUDFLARE_TOKEN: process.env.VITE_CLOUDFLARE_TOKEN,
      VITE_ADSENSE_CLIENT: process.env.VITE_ADSENSE_CLIENT || "ca-pub-1778632581161801",
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { charset: "utf-8" },
    { title: "CalculadoraOnlineBR - Calculadoras Gratuitas" },
    {
      name: "description",
      content:
        "Calculadoras online gratuitas para facilitar seu dia a dia. Matemática, finanças, saúde e trabalhista. Interface moderna e fácil de usar.",
    },
    { name: "viewport", content: "width=device-width,initial-scale=1" },

    // PWA and Theme
    { name: "theme-color", content: "#64B5F6" },
    { name: "color-scheme", content: "dark" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: "Calc BR" },
    { name: "application-name", content: "CalculadoraOnlineBR" },
    { name: "msapplication-TileColor", content: "#64B5F6" },
    { name: "msapplication-TileImage", content: "/android-chrome-512x512.webp" },

    // SEO
    { name: "robots", content: "index, follow" },
    {
      name: "googlebot",
      content: "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "keywords",
      content: "calculadora, online, gratis, matematica, financas, saude, trabalhista, brasil",
    },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "CalculadoraOnlineBR - Calculadoras Gratuitas" },
    {
      property: "og:description",
      content:
        "Calculadoras online gratuitas para facilitar seu dia a dia. Interface moderna e fácil de usar.",
    },
    { property: "og:site_name", content: "CalculadoraOnlineBR" },
    { property: "og:locale", content: "pt_BR" },

    // Twitter Card
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "CalculadoraOnlineBR" },
    {
      name: "twitter:description",
      content: "Calculadoras online gratuitas para facilitar seu dia a dia",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />

        {/* Performance and DNS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Analytics DNS Prefetch - apenas em produção */}
        {data?.ENV?.NODE_ENV === "production" && (
          <>
            {/* Google Analytics DNS Prefetch */}
            {data?.ENV?.VITE_GA_ID && (
              <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            )}

            {/* Cloudflare Analytics DNS Prefetch */}
            {(data?.ENV?.VITE_CLOUDFLARE_TOKEN || CLOUDFLARE_TOKEN) && (
              <>
                <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
                <link
                  rel="preconnect"
                  href="https://static.cloudflareinsights.com"
                  crossOrigin="anonymous"
                />
              </>
            )}

            {/* Microsoft Clarity DNS Prefetch */}
            <link rel="dns-prefetch" href="https://www.clarity.ms" />
            <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
          </>
        )}

        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />

        <Meta />
        <Links />

        {/* Critical CSS - Inline for reliability */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS fallback to prevent FOUC */
            body {
              background-color: #121212;
              color: #ffffff;
              font-family: Inter, sans-serif;
              margin: 0;
              min-height: 100vh;
            }
            /* Loading spinner for CSS loading issues */
            .css-loading:after {
              content: "";
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid #64B5F6;
              border-radius: 50%;
              border-top-color: transparent;
              animation: spin 1s ease-in-out infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `
        }} />

        {/* Analytics Scripts - apenas em produção */}
        {data?.ENV?.NODE_ENV === "production" && (
          <>
            {/* Google Analytics */}
            {data?.ENV?.VITE_GA_ID && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${data.ENV.VITE_GA_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${data.ENV.VITE_GA_ID}', {
                        page_title: document.title,
                        page_location: window.location.href,
                        anonymize_ip: true,
                        allow_google_signals: false,
                        allow_ad_personalization_signals: false,
                        send_page_view: true,
                        storage: 'none',
                        client_storage: 'none',
                        cookie_domain: 'none',
                        cookie_update: false,
                        cookie_expires: 0,
                        transport_type: 'beacon'
                      });
                    `,
                  }}
                />
              </>
            )}

            {/* Google AdSense */}
            {data?.ENV?.VITE_ADSENSE_CLIENT && (
              <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${data.ENV.VITE_ADSENSE_CLIENT}`}
                crossOrigin="anonymous"
                strategy="afterInteractive"
              />
            )}

            {/* Cloudflare Web Analytics */}
            {(data?.ENV?.VITE_CLOUDFLARE_TOKEN || CLOUDFLARE_TOKEN) && (
              <script
                defer
                src="https://static.cloudflareinsights.com/beacon.min.js"
                data-cf-beacon={JSON.stringify({
                  token: data?.ENV?.VITE_CLOUDFLARE_TOKEN || CLOUDFLARE_TOKEN,
                  spa: true,
                })}
              />
            )}

            {/* Microsoft Clarity */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "t66wl6zw9o");
                `,
              }}
            />
          </>
        )}

        {/* Disponibilizar ENV para o cliente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__ENV = ${JSON.stringify(data?.ENV || {})};`,
          }}
        />
      </head>
      <body className="bg-background-dark font-inter text-base leading-relaxed antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // Ativar tracking automático de page views do Google Analytics
  useGoogleAnalytics();

  // Ativar Cloudflare Web Analytics como fallback/complemento
  useCloudflareAnalyticsSimple();

  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <AnalyticsProvider>
          <div className="flex min-h-screen flex-col">
            <header className="shadow-default border-b border-light bg-background-dark-secondary">
              <div className="mx-auto max-w-7xl px-8 sm:px-4 md:px-6">
                <div className="flex h-16 items-center justify-between md:h-14">
                  <Link
                    to="/"
                    className="group flex items-center space-x-2 transition-all duration-200 hover:opacity-90"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-light bg-card-bg transition-transform group-hover:scale-110">
                      <img
                        src="/favicon-32x32.webp"
                        alt="CalculadoraOnlineBR"
                        className="h-5 w-5"
                        width={20}
                        height={20}
                      />
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary sm:text-lg md:text-xl">
                      <span className="sm:hidden md:inline">CalculadoraOnlineBR</span>
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
              className="mx-auto w-full max-w-7xl flex-1 px-8 py-8 sm:px-4 md:px-6 md:py-6"
              role="main"
              aria-label="Conteúdo principal"
            >
              <Outlet />
            </main>

            <Footer />
          </div>

          {/* CSS Loading Detector */}
          <CSSLoadingDetector />

          {/* Cookie Consent Banner */}
          <CookieConsent />

          {/* Vercel Analytics & Speed Insights */}
          <Analytics />
          <SpeedInsights />
        </AnalyticsProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
}
