/** Rótulo usado quando a Vercel não informa a região (localhost, IP não mapeado). */
export const UNKNOWN_LOCATION = "Brasil";

const clean = (s: string) =>
  s
    .replace(/[\p{C}<>]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);

/**
 * Localização aproximada de quem fez a requisição, a partir dos cabeçalhos de geolocalização
 * da Vercel: "Cidade, UF", "UF", "Brasil" ou "Exterior". O IP nunca é lido nem gravado (LGPD):
 * só o nome da região sai daqui.
 */
export function locationFromHeaders(headers: Headers): string {
  const country = headers.get("x-vercel-ip-country");
  if (country && country !== "BR") return "Exterior";

  const rawRegion = headers.get("x-vercel-ip-country-region") ?? "";
  const uf = /^[A-Z]{2}$/.test(rawRegion) ? rawRegion : "";

  let city = "";
  const rawCity = headers.get("x-vercel-ip-city");
  if (rawCity) {
    try {
      city = clean(decodeURIComponent(rawCity)); // a Vercel envia a cidade codificada (ex.: S%C3%A3o%20Paulo)
    } catch {
      city = "";
    }
  }

  if (city && uf) return `${city}, ${uf}`;
  return uf || UNKNOWN_LOCATION;
}
