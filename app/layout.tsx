import "@fontsource/ibm-plex-mono/400.css"; // Carrega apenas peso específico
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Metadata } from "next";

// Importações diretas - componentes críticos para layout
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import Analytics from "../components/Analytics";
import ConsentBanner from "../components/ConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL('https://calculadoraonlinebr.com.br'),
  title: {
    template: "%s | Calculadora Online BR",
    default: "Calculadora Online BR - Ferramentas de Cálculo Gratuitas",
  },
  description:
    "Realize cálculos online de forma rápida e precisa com a Calculadora Online BR. Ferramentas gratuitas para juros compostos, IMC, regra de três e muito mais. Acesse já!",
  keywords: [
    "calculadora online",
    "calculadora gratuita",
    "ferramentas online",
    "cálculo matemático",
    "calculadora financeira",
    "juros compostos",
    "calculadora IMC",
    "regra de três",
    "simples",
    "fácil",
    "gratuita",
    "Brasil",
    "grátis",
    "online",
  ],
  authors: [{ name: "Calculadora Online BR" }],
  creator: "Calculadora Online BR",
  publisher: "Calculadora Online BR",
  category: "Ferramentas",
  classification: "Ferramentas de Cálculo Online",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://calculadoraonlinebr.com.br',
    siteName: 'Calculadora Online BR',
    title: 'Calculadora Online BR - Ferramentas de Cálculo Gratuitas',
    description: 'Realize cálculos online de forma rápida e precisa. Ferramentas gratuitas para juros compostos, IMC, regra de três e muito mais.',
    images: [
      {
        url: '/images/logo-header.webp',
        width: 1200,
        height: 630,
        alt: 'Calculadora Online BR - Ferramentas de Cálculo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora Online BR - Ferramentas de Cálculo Gratuitas',
    description: 'Realize cálculos online de forma rápida e precisa. Ferramentas gratuitas para juros compostos, IMC, regra de três e muito mais.',
    images: ['/images/logo-header.webp'],
    creator: '@calculadoraonlinebr',
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "196x196",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: 'https://calculadoraonlinebr.com.br',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <AppBar />
            <div style={{ flexGrow: 1 }}>{children}</div>
            <Footer />
          </main>
        </ThemeProvider>
        <StructuredData type="website" />
        <Analytics gaId={gaId} />
        <ConsentBanner />
      </body>
    </html>
  );
}
