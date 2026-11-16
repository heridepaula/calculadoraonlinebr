// Verificação manual do parser da planilha da ANP: `npx tsx scripts/checkFuelParser.ts <pasta com os .xlsx>`.
import { readFileSync } from "node:fs";
import { zipSync, strToU8 } from "fflate";
import {
  FALLBACK_FUEL_PRICES,
  isFuelStale,
  lastCompletedWeekStart,
  parseAnpWeeklyXlsx,
  parseListingLinks,
  weekFileName,
  weekFileUrl,
  weekStartFromFileName,
} from "../app/lib/market/fuel";

const dir = process.argv[2];
let failures = 0;
const check = (name: string, ok: boolean, detail?: unknown) => {
  if (!ok) failures++;
  console.log(`${ok ? "OK  " : "FAIL"} ${name}${detail !== undefined ? ` -> ${JSON.stringify(detail)}` : ""}`);
};
const throwsWith = (fn: () => unknown, part: string) => {
  try {
    fn();
    return false;
  } catch (e) {
    return e instanceof Error && e.message.includes(part);
  }
};

// 1. Arquivos reais
const real = (n: string) => new Uint8Array(readFileSync(`${dir}/${n}`));
const w1 = parseAnpWeeklyXlsx(real("resumo_semanal_lpc_2026_11_01-2026_11_07.xlsx"));
check("semana 01-07/11", w1.gasoline === 6.47 && w1.ethanol === 4.15 && w1.weekStart === "2026-11-01" && w1.weekEnd === "2026-11-07", w1);
const w2 = parseAnpWeeklyXlsx(real("resumo_semanal_lpc_2026_11_08-2026_11_14.xlsx"));
check("semana 08-14/11", w2.gasoline === 6.48 && w2.ethanol === 4.25 && w2.weekStart === "2026-11-08" && w2.weekEnd === "2026-11-14", w2);

// 2. Semanas e nomes
check("última semana encerrada (dom 15/11)", lastCompletedWeekStart(new Date("2026-11-15T12:00:00Z")) === "2026-11-08");
check("última semana encerrada (sáb 14/11)", lastCompletedWeekStart(new Date("2026-11-14T12:00:00Z")) === "2026-11-01");
check("última semana encerrada (qua 18/11)", lastCompletedWeekStart(new Date("2026-11-18T12:00:00Z")) === "2026-11-08");
check("virada de ano (qui 01/01/2026)", lastCompletedWeekStart(new Date("2026-01-01T12:00:00Z")) === "2025-12-21");
check("virada de ano (dom 04/01/2026)", lastCompletedWeekStart(new Date("2026-01-04T12:00:00Z")) === "2025-12-28");
check("nome do arquivo na virada", weekFileName("2025-12-28") === "resumo_semanal_lpc_2025_12_28-2026_01_03.xlsx");
check("pasta = ano do domingo", weekFileUrl("2025-12-28").includes("/arquivos-lpc/2025/"));
check("nome inválido", weekStartFromFileName("resumo_semanal_lpc_2026_11_08-2026_11_20.xlsx") === null);
const html = `<a href="https://www.gov.br/x/arquivos-lpc/2026/resumo_semanal_lpc_2026_11_01-2026_11_07.xlsx">a</a>
<a href="/anp/pt-br/z/arquivos-lpc/2026/resumo_semanal_lpc_2026_11_08-2026_11_14.xlsx">b</a>
<a href="https://www.gov.br/x/arquivos-lpc/2026/revendas_lpc_2026_11_08-2026_11_14.xlsx">c</a>`;
const links = parseListingLinks(html);
check("listagem: mais nova primeiro, ignora revendas", links.length === 2 && links[0].weekStart === "2026-11-08", links);

// 2b. Defasagem
const fresh = { weekEnd: "2026-11-14", stale: false };
check("não é stale em 21 dias", isFuelStale(fresh, new Date("2026-12-05T00:00:00Z")) === false);
check("é stale em 22 dias", isFuelStale(fresh, new Date("2026-12-06T00:00:00Z")) === true);
check("fallback é sempre stale", isFuelStale(FALLBACK_FUEL_PRICES, new Date("2026-11-15T00:00:00Z")) === true);

// 3. Casos negativos em memória
const xml = (rows: string[][], shared: string[]) =>
  `<worksheet><sheetData>${rows
    .map((r, i) => `<row r="${i + 1}">${r.map((v, j) => (v === "" ? "" : typeof v === "number" ? `<c r="${"ABCDEFG"[j]}${i + 1}"><v>${v}</v></c>` : `<c r="${"ABCDEFG"[j]}${i + 1}" t="s"><v>${shared.indexOf(v)}</v></c>`)).join("")}</row>`)
    .join("")}</sheetData></worksheet>`;
function build(opts: { sheetName?: string; unit?: string; gas?: number; eth?: number; start?: number; end?: number; stations?: number } = {}) {
  const o = { sheetName: "BRASIL", unit: "R$/l", gas: 6.48, eth: 4.25, start: 46334, end: 46340, stations: 4000, ...opts };
  const shared = ["BRASIL", "GASOLINA COMUM", "ETANOL HIDRATADO", o.unit];
  const rows: string[][] = [
    [o.start as unknown as string, o.end as unknown as string, "BRASIL", "GASOLINA COMUM", o.stations as unknown as string, o.unit, o.gas as unknown as string],
    [o.start as unknown as string, o.end as unknown as string, "BRASIL", "ETANOL HIDRATADO", o.stations as unknown as string, o.unit, o.eth as unknown as string],
  ];
  return zipSync({
    "xl/workbook.xml": strToU8(`<workbook xmlns:r="x"><sheets><sheet name="${o.sheetName}" sheetId="5" r:id="rId9"/></sheets></workbook>`),
    "xl/_rels/workbook.xml.rels": strToU8(`<Relationships><Relationship Id="rId9" Type="t" Target="worksheets/sheet5.xml"/></Relationships>`),
    "xl/sharedStrings.xml": strToU8(`<sst>${shared.map((s) => `<si><t>${s}</t></si>`).join("")}</sst>`),
    "xl/worksheets/sheet5.xml": strToU8(xml(rows, shared)),
  });
}
check("sintético válido", parseAnpWeeklyXlsx(build()).gasoline === 6.48);
check("aba ausente", throwsWith(() => parseAnpWeeklyXlsx(build({ sheetName: "ESTADOS" })), "Aba BRASIL"));
check("unidade errada", throwsWith(() => parseAnpWeeklyXlsx(build({ unit: "R$/kg" })), "unidade"));
check("preço fora da faixa", throwsWith(() => parseAnpWeeklyXlsx(build({ gas: 60 })), "fora da faixa"));
check("amostra pequena", throwsWith(() => parseAnpWeeklyXlsx(build({ stations: 20 })), "amostra"));
check("semana que não é dom-sáb", throwsWith(() => parseAnpWeeklyXlsx(build({ start: 46335, end: 46341 })), "domingo a sábado"));
check("semana de 10 dias", throwsWith(() => parseAnpWeeklyXlsx(build({ end: 46344 })), "domingo a sábado"));
check("zip inválido", throwsWith(() => parseAnpWeeklyXlsx(new Uint8Array([1, 2, 3, 4])), ""));
check("arquivo vazio", throwsWith(() => parseAnpWeeklyXlsx(new Uint8Array()), "tamanho"));
const big = zipSync({ "xl/workbook.xml": new Uint8Array(11 * 1024 * 1024) });
check("entrada acima do limite é ignorada", throwsWith(() => parseAnpWeeklyXlsx(big), "workbook.xml"));

console.log(failures === 0 ? "\nTudo certo." : `\n${failures} falha(s).`);
process.exit(failures === 0 ? 0 : 1);
