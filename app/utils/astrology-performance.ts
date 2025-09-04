// Utilitários para otimização de performance em dados de astrologia

/**
 * Lazy loading de dados de astrologia com cache inteligente
 */
export class AstrologyDataManager {
  private cache = new Map<string, Promise<any>>();
  private memoryCache = new Map<string, any>();
  private maxCacheSize = 50; // Limita cache para economizar memória

  /**
   * Carrega dados com cache e lazy loading
   */
  async loadData(signo: string, ascendente: string): Promise<any> {
    const key = `${signo.toLowerCase()}-${ascendente.toLowerCase()}`;
    
    // Verifica cache em memória primeiro
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // Verifica cache de promises
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // Carrega dados
    const promise = this.fetchData(key);
    this.cache.set(key, promise);
    
    try {
      const data = await promise;
      this.addToMemoryCache(key, data);
      return data;
    } catch (error) {
      this.cache.delete(key); // Remove promise falha do cache
      throw error;
    }
  }

  private async fetchData(key: string): Promise<any> {
    try {
      // Tenta carregar do arquivo unificado primeiro
      const { getAscendentData } = await import('~/lib/astrology-loader');
      const [signo, ascendente] = key.split('-');
      return await getAscendentData(signo, ascendente);
    } catch (error) {
      console.error(`Erro ao carregar dados de astrologia para ${key}:`, error);
      throw new Error(`Dados não disponíveis para ${key}`);
    }
  }

  private addToMemoryCache(key: string, data: any): void {
    // Limpa cache se exceder limite
    if (this.memoryCache.size >= this.maxCacheSize) {
      const firstKey = this.memoryCache.keys().next().value;
      this.memoryCache.delete(firstKey);
    }
    
    this.memoryCache.set(key, data);
  }

  /**
   * Pré-carrega combinações mais comuns
   */
  async preloadCommonCombinations(): Promise<void> {
    const commonCombinations = [
      'aries-aries', 'touro-touro', 'gemeos-gemeos',
      'cancer-cancer', 'leao-leao', 'virgem-virgem',
      'libra-libra', 'escorpiao-escorpiao', 'sagitario-sagitario',
      'capricornio-capricornio', 'aquario-aquario', 'peixes-peixes'
    ];

    const loadPromises = commonCombinations.map(combo => {
      const [signo, ascendente] = combo.split('-');
      return this.loadData(signo, ascendente).catch(console.warn);
    });

    await Promise.allSettled(loadPromises);
  }

  /**
   * Limpa todos os caches
   */
  clearCache(): void {
    this.cache.clear();
    this.memoryCache.clear();
  }

  /**
   * Obtém estatísticas do cache
   */
  getCacheStats(): {
    promiseCacheSize: number;
    memoryCacheSize: number;
    maxCacheSize: number;
  } {
    return {
      promiseCacheSize: this.cache.size,
      memoryCacheSize: this.memoryCache.size,
      maxCacheSize: this.maxCacheSize
    };
  }
}

// Instância singleton
export const astrologyManager = new AstrologyDataManager();

/**
 * Hook para usar em componentes React
 */
export function useAstrologyData(signo: string, ascendente: string) {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!signo || !ascendente) return;

    let cancelled = false;

    astrologyManager.loadData(signo, ascendente)
      .then(result => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [signo, ascendente]);

  return { data, loading, error };
}

/**
 * Utilitário para batch loading de múltiplas combinações
 */
export async function loadMultipleAstrologyData(
  combinations: Array<{ signo: string; ascendente: string }>
): Promise<Array<{ key: string; data: any; error?: Error }>> {
  const results = await Promise.allSettled(
    combinations.map(async ({ signo, ascendente }) => {
      const data = await astrologyManager.loadData(signo, ascendente);
      return { key: `${signo}-${ascendente}`, data };
    })
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      const { signo, ascendente } = combinations[index];
      return {
        key: `${signo}-${ascendente}`,
        data: null,
        error: result.reason
      };
    }
  });
}

// Para React import
import React from 'react';