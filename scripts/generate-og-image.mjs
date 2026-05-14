import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/og-image-1200x630.webp");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0f23"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#64B5F6"/>
      <stop offset="100%" stop-color="#42A5F5"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)"/>

  <g transform="translate(120, 180)">
    <rect x="0" y="0" width="160" height="200" rx="20" fill="#1e293b" stroke="#64B5F6" stroke-width="4"/>
    <rect x="20" y="20" width="120" height="50" rx="6" fill="#0f172a"/>
    <text x="80" y="55" font-family="monospace" font-size="28" fill="#64B5F6" text-anchor="middle" font-weight="700">123</text>
    <g fill="#334155">
      <rect x="20" y="90" width="32" height="32" rx="4"/>
      <rect x="64" y="90" width="32" height="32" rx="4"/>
      <rect x="108" y="90" width="32" height="32" rx="4"/>
      <rect x="20" y="130" width="32" height="32" rx="4"/>
      <rect x="64" y="130" width="32" height="32" rx="4"/>
      <rect x="108" y="130" width="32" height="32" rx="4"/>
    </g>
    <rect x="20" y="170" width="120" height="14" rx="4" fill="#64B5F6"/>
  </g>

  <text x="340" y="280" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="800" fill="#ffffff">
    CalculadoraOnlineBR
  </text>

  <text x="340" y="340" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="500" fill="#94a3b8">
    Calculadoras Online Gratuitas
  </text>

  <g font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="600" fill="#64B5F6">
    <text x="340" y="420">Saúde · Finanças · Matemática · Trabalhista · Datas</text>
  </g>

  <text x="600" y="570" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#64748b" text-anchor="middle">
    calculadoraonlinebr.com.br
  </text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .webp({ quality: 85, effort: 6 })
  .toBuffer();

writeFileSync(outputPath, buffer);
console.log(`Generated ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
