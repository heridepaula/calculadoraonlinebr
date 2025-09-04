// Loader otimizado para dados de astrologia
import type { UnifiedAstrologyData, AstrologyDataOptimized } from '~/types/astrology-optimized';
import { expandAstrologyData } from '~/types/astrology-optimized';

// Cache em memória para evitar múltiplas leituras
let unifiedDataCache: UnifiedAstrologyData | null = null;

/**
 * Carrega dados de astrologia de forma otimizada
 * Usa arquivo unificado em produção, arquivos individuais em desenvolvimento
 */
export async function loadAstrologyData(): Promise<UnifiedAstrologyData> {
  if (unifiedDataCache) {
    return unifiedDataCache;
  }

  try {
    // Tenta carregar arquivo unificado primeiro (produção)
    const unifiedData = await import('~/data/astrology/ascendentes-unified.json');
    unifiedDataCache = unifiedData.default || unifiedData;
    return unifiedDataCache;
  } catch (error) {
    console.warn('Arquivo unificado não encontrado, usando carregamento individual:', error);
    
    // Fallback: carrega arquivos individuais (desenvolvimento)
    const data: UnifiedAstrologyData = {};
    const signos = ['aries', 'touro', 'gemeos', 'cancer', 'leao', 'virgem', 'libra', 'escorpiao', 'sagitario', 'capricornio', 'aquario', 'peixes'];
    
    for (const signo of signos) {
      for (const ascendente of signos) {
        const key = `${signo}-${ascendente}`;
        try {
          const module = await import(`~/data/astrology/ascendentes/${key}.json`);
          data[key] = module.default || module;
        } catch (err) {
          console.warn(`Arquivo ${key}.json não encontrado`);
        }
      }
    }
    
    unifiedDataCache = data;
    return data;
  }
}

/**
 * Busca dados específicos de um signo e ascendente
 */
export async function getAscendentData(signo: string, ascendente: string): Promise<any> {
  const data = await loadAstrologyData();
  const key = `${signo.toLowerCase()}-${ascendente.toLowerCase()}`;
  const optimizedData = data[key] as AstrologyDataOptimized;
  
  if (!optimizedData) {
    throw new Error(`Combinação ${signo}-${ascendente} não encontrada`);
  }
  
  // Expande os dados otimizados para o formato original
  return expandAstrologyData(optimizedData);
}

/**
 * Limpa o cache (útil para testes)
 */
export function clearAstrologyCache(): void {
  unifiedDataCache = null;
}

/**
 * Pré-carrega dados de astrologia (para usar em routes loaders)
 */
export function preloadAstrologyData(): void {
  loadAstrologyData().catch(console.error);
}