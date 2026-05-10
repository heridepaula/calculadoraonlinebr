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
import { getCriticalCSSHTML, getDeferredCSSScript } from "~/lib/critical-css";
import { usePrefetchOptimization } from "~/lib/prefetch-strategy";

import "./tailwind.css";
import "./styles/globals.css";
import "./styles/colors.css";

export const links: LinksFunction = () => [
  // CRITICAL CHAIN OPTIMIZATION - Preload WOFF2 directly to break 987ms chain
  {
    rel: "preload",
    href: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous"
  },

  // Early DNS resolution for critical domains
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },

  // CSS will be deferred since critical CSS is inline
  {
    rel: "preload",
    href: "/assets/root-D_Rv9tYd.css",
    as: "style",
    onLoad: "this.onload=null;this.rel='stylesheet'",
    "data-defer": "true"
  },

  // Font CSS - completely non-blocking with fallback
  {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    as: "style",
    onLoad: "this.onload=null;this.rel='stylesheet'",
    "data-defer": "true"
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
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
    },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    {
      property: "og:image:alt",
      content: "CalculadoraOnlineBR - Calculadoras Online Gratuitas",
    },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br",
    },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@calculadorabr" },
    { name: "twitter:title", content: "CalculadoraOnlineBR - Calculadoras Gratuitas" },
    {
      name: "twitter:description",
      content: "Calculadoras online gratuitas para facilitar seu dia a dia",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
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

        {/* JSON-LD: WebSite + SearchAction - global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CalculadoraOnlineBR",
              description:
                "Calculadoras online gratuitas para facilitar seu dia a dia - saúde, finanças e matemática",
              url: "https://www.calculadoraonlinebr.com.br",
              inLanguage: "pt-BR",
              author: { "@type": "Organization", name: "CalculadoraOnlineBR" },
              publisher: {
                "@type": "Organization",
                name: "CalculadoraOnlineBR",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.calculadoraonlinebr.com.br/android-chrome-512x512.webp",
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.calculadoraonlinebr.com.br/calculadoras?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Critical CSS Inline - LCP Optimization (breaks 987ms chain) */}
        <style id="critical-css" data-optimized="lcp" dangerouslySetInnerHTML={{
          __html: `
            :root{--bg-primary:#0f0f23;--bg-secondary:#1a1a2e;--text-primary:#fff;--text-secondary:#e2e8f0;--primary-blue:#64B5F6;--primary-blue-dark:#42A5F5}
            *,*::before,*::after{box-sizing:border-box}*{margin:0}
            html,body{background-color:var(--bg-primary);color:var(--text-primary);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased;min-height:100vh}
            h1{font-size:2.25rem;font-weight:700;line-height:1.2;margin-bottom:1rem}
            h2{font-size:1.875rem;font-weight:600;line-height:1.3;margin-bottom:0.75rem}
            p{color:var(--text-secondary);line-height:1.6;margin-bottom:1rem}
            .container{max-width:1200px;margin:0 auto;padding:0 1rem}
            .card{background-color:var(--bg-secondary);border-radius:0.75rem;padding:1.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.3)}
            .btn-primary{background-color:var(--primary-blue);color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;display:inline-block;border:none;cursor:pointer;transition:background-color 0.2s}
            .btn-primary:hover{background-color:var(--primary-blue-dark)}
            .grid{display:grid;gap:1rem}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
            .text-center{text-align:center}.font-bold{font-weight:700}.mb-4{margin-bottom:1rem}.mt-8{margin-top:2rem}.p-6{padding:1.5rem}
            .loading-spinner{display:inline-block;width:1rem;height:1rem;border:2px solid transparent;border-top:2px solid var(--primary-blue);border-radius:50%;animation:spin 1s linear infinite}
            @keyframes spin{to{transform:rotate(360deg)}}
            @media(min-width:768px){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}h1{font-size:3rem}}
            @media(max-width:767px){h1{font-size:1.875rem}.container{padding:0 0.75rem}}
            @font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url('data:font/woff2;base64,') format('woff2'),local('Inter')}
          `
        }} />

        {/* Performance Optimization Script - Breaks Critical Chain */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var loaded=false;
              function loadDeferredResources(){
                if(loaded)return;loaded=true;
                var links=document.querySelectorAll('link[data-defer="true"]');
                for(var i=0;i<links.length;i++){
                  var link=links[i];
                  link.media='all';
                  if(link.getAttribute('as')==='style'){link.rel='stylesheet';}
                }
                var fontCSS=document.createElement('link');
                fontCSS.rel='stylesheet';
                fontCSS.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
                fontCSS.media='all';
                document.head.appendChild(fontCSS);
              }
              function initLoad(){setTimeout(loadDeferredResources,16);}
              if(document.readyState==='complete'){initLoad();}
              else{window.addEventListener('load',initLoad);document.addEventListener('DOMContentLoaded',function(){setTimeout(initLoad,100);});}
            })();
          `
        }} />

        {/* Service Worker Registration - Long-term Caching */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if('serviceWorker' in navigator && location.protocol === 'https:'){
              window.addEventListener('load', function(){
                navigator.serviceWorker.register('/sw.js', {scope: '/'})
                .then(function(registration){
                  console.log('[SW] Registration successful:', registration.scope);
                  registration.addEventListener('updatefound', function(){
                    var newWorker = registration.installing;
                    newWorker.addEventListener('statechange', function(){
                      if(newWorker.state === 'installed' && navigator.serviceWorker.controller){
                        newWorker.postMessage({type: 'SKIP_WAITING'});
                      }
                    });
                  });
                })
                .catch(function(error){
                  console.log('[SW] Registration failed:', error);
                });
              });
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

  // Ativar prefetch inteligente para cache de longo prazo
  usePrefetchOptimization();

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
