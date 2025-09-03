import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import citiesData from "~/data/cities.json";

interface City {
  city: string;
  state: string;
  lat: number;
  long: number;
}

// Função para normalizar strings (remover acentos e converter para lowercase)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c");
}

// Cache para strings normalizadas (otimização de performance)
const normalizedCitiesCache = new Map<string, string>();

function getNormalizedCityName(cityName: string): string {
  if (!normalizedCitiesCache.has(cityName)) {
    normalizedCitiesCache.set(cityName, normalizeString(cityName));
  }
  return normalizedCitiesCache.get(cityName)!;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);

  if (!query) {
    return json({ 
      error: "Parâmetro 'q' é obrigatório",
      cities: []
    }, { status: 400 });
  }

  if (query.length < 1) {
    return json({ 
      error: "Query deve ter pelo menos 1 caractere",
      cities: []
    }, { status: 400 });
  }

  const normalizedQuery = normalizeString(query);

  // Filtragem otimizada com early exit
  const matchedCities: City[] = [];
  const cities = citiesData as City[];

  for (let i = 0; i < cities.length && matchedCities.length < limit; i++) {
    const city = cities[i];
    const normalizedCityName = getNormalizedCityName(city.city);
    
    if (normalizedCityName.includes(normalizedQuery)) {
      matchedCities.push(city);
    }
  }

  // Ordenar por relevância: cidades que começam com o termo primeiro
  matchedCities.sort((a, b) => {
    const aNormalized = getNormalizedCityName(a.city);
    const bNormalized = getNormalizedCityName(b.city);
    
    const aStartsWith = aNormalized.startsWith(normalizedQuery);
    const bStartsWith = bNormalized.startsWith(normalizedQuery);
    
    // Priorizar cidades que começam com o termo
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    
    // Se ambas começam ou ambas não começam, ordenar alfabeticamente
    return a.city.localeCompare(b.city);
  });

  return json({
    query,
    count: matchedCities.length,
    cities: matchedCities
  });
}