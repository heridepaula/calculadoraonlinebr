import "@fontsource/ibm-plex-mono";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Meu Projeto MUI com Next.js 15",
  description:
    "Um exemplo de como usar a fonte IBM Plex Mono com MUI e Next.js 15",
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
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-4FB8PBLZ68" />
    </html>
  );
}
