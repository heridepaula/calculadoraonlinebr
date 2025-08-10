import { createRequestHandler } from "@remix-run/express";
import compression from "compression";
import express from "express";
import { installGlobals } from "@remix-run/node";

installGlobals();

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();

// Enable compression for all responses
app.use(
  compression({
    filter: (req, res) => {
      // Don't compress responses with cache-control: no-transform directive
      if (
        res.getHeader("cache-control") &&
        res.getHeader("cache-control").includes("no-transform")
      ) {
        return false;
      }

      // Use compression for all other responses
      return compression.filter(req, res);
    },
    threshold: 1024, // Only compress responses larger than 1kb
    level: 6, // Compression level (1-9, 6 is default)
    memLevel: 8, // Memory usage (1-9, 8 is default)
  })
);

// Handle static assets with caching
app.use(
  "/assets",
  express.static("build/client/assets", {
    immutable: true,
    maxAge: "1y",
  })
);

// Handle other static files
app.use(express.static("build/client", { maxAge: "1h" }));

// Handle vite dev server
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Production: serve built assets
  const requestHandler = createRequestHandler({
    build: await import("./build/server/index.js"),
    mode: process.env.NODE_ENV,
  });

  app.all("*", requestHandler);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
