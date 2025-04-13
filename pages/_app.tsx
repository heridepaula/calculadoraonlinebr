import "@fontsource/ibm-plex-mono";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../app/theme";
import { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (isProduction && gaId) {
      const handleRouteChange = (url: string) => {
        window.gtag("config", gaId, {
          page_path: url,
        });
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      handleRouteChange(router.pathname);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router, isProduction, gaId]);

  return (
    <>
      {isProduction && gaId && <GoogleAnalytics gaId={gaId} />}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;