import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";
import compression from "vite-plugin-compression";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      compressionOptions: {
        level: 6,
      },
      deleteOriginFile: false,
    }),
  ],
  build: {
    minify: "terser",
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
        passes: 2,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        properties: false,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Só React e Remix, usados em todas as páginas, ficam em blocos fixos. As demais
        // bibliotecas (chart.js etc.) ficam com a divisão automática do Rollup e só são
        // baixadas pelas páginas que as importam; um bloco "vendor-libs" único as carregava
        // em todas as páginas (269 KB em nov/2026).
        manualChunks(id) {
          const normalized = id.replace(/\\/g, "/");
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(normalized)) {
            return "vendor-react";
          }
          if (
            /\/node_modules\/(@remix-run|react-router|react-router-dom|@remix-run\/router)\//.test(
              normalized
            )
          ) {
            return "vendor-remix";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    target: "es2020",
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 3000,
    host: true,
  },
});
