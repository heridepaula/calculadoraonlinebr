import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { readFileSync } from "fs";
import { join } from "path";
import { expandAstrologyData } from "~/types/astrology-optimized";

// Mapeamento de signos para normalização
const signMapping: Record<string, string> = {
  'aries': 'aries',
  'áries': 'aries',
  'touro': 'touro',
  'taurus': 'touro',
  'gemeos': 'gemeos',
  'gêmeos': 'gemeos',
  'gemini': 'gemeos',
  'cancer': 'cancer',
  'câncer': 'cancer',
  'leao': 'leao',
  'leão': 'leao',
  'leo': 'leao',
  'virgem': 'virgem',
  'virgo': 'virgem',
  'libra': 'libra',
  'escorpiao': 'escorpiao',
  'escorpião': 'escorpiao',
  'scorpio': 'escorpiao',
  'sagitario': 'sagitario',
  'sagitário': 'sagitario',
  'sagittarius': 'sagitario',
  'capricornio': 'capricornio',
  'capricórnio': 'capricornio',
  'capricorn': 'capricornio',
  'aquario': 'aquario',
  'aquário': 'aquario',
  'aquarius': 'aquario',
  'peixes': 'peixes',
  'pisces': 'peixes'
};

function normalizeSignName(sign: string): string {
  const normalized = sign.toLowerCase().trim();
  return signMapping[normalized] || normalized;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const solarSign = url.searchParams.get("solar");
  const ascendantSign = url.searchParams.get("ascendant");

  if (!solarSign || !ascendantSign) {
    return json(
      { error: "Parâmetros 'solar' e 'ascendant' são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    // Normalizar nomes dos signos
    const normalizedSolar = normalizeSignName(solarSign);
    const normalizedAscendant = normalizeSignName(ascendantSign);
    
    // Construir chave para o arquivo unificado
    const key = `${normalizedSolar}-${normalizedAscendant}`;
    
    // Ler arquivo JSON unificado
    const unifiedFilePath = join(process.cwd(), "app", "data", "astrology", "ascendentes", "ascendentes-unified.json");
    const fileContent = readFileSync(unifiedFilePath, "utf-8");
    const unifiedData = JSON.parse(fileContent);
    
    // Buscar dados específicos
    const optimizedData = unifiedData[key];
    
    if (!optimizedData) {
      return json(
        { 
          error: "Combinação de signos não encontrada",
          availableCombinations: "Verifique se a combinação de signos solar e ascendente está correta"
        },
        { status: 404 }
      );
    }
    
    // Expandir dados otimizados para formato original
    const expandedData = expandAstrologyData(optimizedData);

    return json({
      success: true,
      data: expandedData
    });
    
  } catch (error) {
    console.error("Erro ao carregar descrição do ascendente:", error);
    
    // Verificar se o erro é de arquivo não encontrado
    const isFileNotFound = error instanceof Error && 
      (error.message.includes('ENOENT') || error.message.includes('no such file'));
    
    if (isFileNotFound) {
      return json(
        { 
          error: "Combinação de signos não encontrada",
          availableCombinations: "Verifique se a combinação de signos solar e ascendente está correta"
        },
        { status: 404 }
      );
    }
    
    return json(
      { error: "Erro interno do servidor ao carregar descrição" },
      { status: 500 }
    );
  }
}