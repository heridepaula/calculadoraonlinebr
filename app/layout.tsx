import "@fontsource/ibm-plex-mono";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Calculadora Online BR",
    default: "Calculadora Online BR",
  },
  description:
    "Realize cálculos online de forma rápida com a Calculadora Online BR. Diversas ferramentas para suas necessidades matemáticas, financeiras e muito mais.",
  keywords: [
    "calculadora online",
    "calculadora",
    "ferramentas online",
    "matemática",
    "financeira",
    "conversão",
    "simples",
    "fácil",
    "gratuita",
    "Brasil",
    "grátis",
  ],
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
  },
  manifest: "/site.webmanifest",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
            <div style={{ flexGrow: 1 }}>{children}</div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
