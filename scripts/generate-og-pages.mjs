// Gera as imagens Open Graph (1200x630, JPG) de cada calculadora e de cada categoria
// a partir de CALCULATORS/CATEGORIES em app/lib/constants.ts.
// Saída: public/og/<id-da-calculadora>.jpg, public/og/categoria-<id>.jpg e public/og/default.jpg
// JPG em vez de WebP: é o formato mais seguro para a prévia de links do WhatsApp.
// Requer Node >= 22.18 (importa o .ts direto, com type stripping nativo).
// Uso: npm run og:pages            (todas)
//      npm run og:pages -- imc cdb (só as ids informadas)
import sharp from "sharp";
import { Buffer } from "node:buffer";
import process from "node:process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CALCULATORS, CATEGORIES } from "../app/lib/constants.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/og");
mkdirSync(outDir, { recursive: true });

// Mesmas cores de categoria do CategoryHero (tailwind.config.ts)
const CATEGORY_COLORS = {
  saude: "#E57373",
  financas: "#FFD54F",
  matematica: "#BA68C8",
  trabalhista: "#64B5F6",
  ferramentas: "#42A5F5",
  astrologia: "#BA68C8",
  datas: "#64B5F6",
  loterias: "#FFD54F",
  apostas: "#81C784",
};

// Título da imagem da página de categoria (nem toda categoria aceita "Calculadoras de X")
const CATEGORY_TITLES = {
  saude: "Calculadoras de Saúde",
  financas: "Calculadoras Financeiras",
  matematica: "Calculadoras de Matemática",
  trabalhista: "Calculadoras Trabalhistas",
  ferramentas: "Ferramentas Online",
  astrologia: "Calculadoras de Astrologia",
  datas: "Calculadoras de Datas",
  loterias: "Geradores de Loteria",
  apostas: "Calculadoras de Apostas",
};

// Fonte do sistema usada pelo librsvg do sharp; a imagem foi gerada no Windows (Segoe UI)
const FONT = "Segoe UI, Arial, Helvetica, sans-serif";
const WIDTH = 1200;
const HEIGHT = 630;
const PAD_X = 80;

const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Quebra o texto em linhas de até `maxChars` caracteres, sem cortar palavras. */
function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Escolhe o maior tamanho de fonte em que o título cabe em até 3 linhas. */
function fitTitle(title) {
  for (const [size, maxChars] of [
    [78, 23],
    [68, 27],
    [58, 32],
  ]) {
    const lines = wrap(title, maxChars);
    if (lines.length <= 3) return { size, lines };
  }
  return { size: 58, lines: wrap(title, 32).slice(0, 3) };
}

function clampLines(text, maxChars, maxLines) {
  // Prefere terminar numa frase completa quando a primeira frase cabe no espaço
  const firstSentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0];
  if (firstSentence && wrap(text, maxChars).length > maxLines) {
    const sentenceLines = wrap(firstSentence, maxChars);
    if (sentenceLines.length <= maxLines) return sentenceLines;
  }
  const lines = wrap(text, maxChars);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s,.;:]+$/, "")}…`;
  return kept;
}

function buildSvg({ label, title, description, color }) {
  const { size, lines } = fitTitle(title);
  const lineHeight = Math.round(size * 1.12);
  const titleTop = 230;
  const titleSvg = lines
    .map(
      (l, i) =>
        `<text x="${PAD_X}" y="${titleTop + i * lineHeight}" font-family="${FONT}" font-size="${size}" font-weight="700" fill="#ffffff">${escapeXml(l)}</text>`,
    )
    .join("\n  ");
  const descTop = titleTop + (lines.length - 1) * lineHeight + 70;
  const descSvg = clampLines(description, 56, 2)
    .map(
      (l, i) =>
        `<text x="${PAD_X}" y="${descTop + i * 44}" font-family="${FONT}" font-size="32" font-weight="400" fill="#cbd5e1">${escapeXml(l)}</text>`,
    )
    .join("\n  ");
  const labelText = escapeXml(label.toUpperCase());
  const labelWidth = Math.round(labelText.length * 17 + 48);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0f23"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="1130" cy="40" r="260" fill="${color}" opacity="0.07"/>
  <circle cx="1130" cy="40" r="170" fill="${color}" opacity="0.07"/>
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${color}"/>
  <rect x="${PAD_X}" y="86" width="${labelWidth}" height="50" rx="25" fill="${color}" opacity="0.16"/>
  <text x="${PAD_X + 24}" y="120" font-family="${FONT}" font-size="24" font-weight="700" letter-spacing="3" fill="${color}">${labelText}</text>
  ${titleSvg}
  ${descSvg}
  <rect x="${PAD_X}" y="528" width="${WIDTH - PAD_X * 2}" height="2" fill="#ffffff" opacity="0.08"/>
  <text x="${PAD_X}" y="580" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff">CalculadoraOnlineBR</text>
  <text x="${WIDTH - PAD_X}" y="580" font-family="${FONT}" font-size="26" font-weight="600" fill="${color}" text-anchor="end">Grátis · sem cadastro</text>
</svg>`;
}

async function render(file, spec) {
  const buffer = await sharp(Buffer.from(buildSvg(spec)))
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();
  writeFileSync(resolve(outDir, file), buffer);
  return buffer.length;
}

const only = new Set(process.argv.slice(2));
const want = (id) => only.size === 0 || only.has(id);
const categoryName = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.name]));
let count = 0;
let bytes = 0;

for (const calc of CALCULATORS) {
  if (!want(calc.id)) continue;
  const color = CATEGORY_COLORS[calc.category] ?? "#64B5F6";
  bytes += await render(`${calc.id}.jpg`, {
    label: categoryName[calc.category] ?? calc.category,
    title: calc.name,
    description: calc.description,
    color,
  });
  count++;
}

for (const cat of CATEGORIES) {
  if (!want(`categoria-${cat.id}`)) continue;
  bytes += await render(`categoria-${cat.id}.jpg`, {
    label: "Categoria",
    title: CATEGORY_TITLES[cat.id] ?? `Calculadoras de ${cat.name}`,
    description: cat.description,
    color: CATEGORY_COLORS[cat.id] ?? "#64B5F6",
  });
  count++;
}

if (want("default")) {
  bytes += await render("default.jpg", {
    label: "Calculadoras online",
    title: "Calculadoras online gratuitas",
    description: "Saúde, finanças, matemática, trabalhista, datas e mais. Resultados na hora, sem cadastro.",
    color: "#64B5F6",
  });
  count++;
}

console.log(`Geradas ${count} imagens em ${outDir} (${(bytes / 1024).toFixed(0)} KB no total)`);
