// Tipos otimizados para dados de astrologia
export interface AstrologyDataOptimized {
  ss: string; // signo_solar
  asc: string; // ascendente
  [key: string]: any; // Outras propriedades otimizadas
}

export interface UnifiedAstrologyData {
  [key: string]: AstrologyDataOptimized; // Chave = "signo-ascendente"
}

// Mapeamento de chaves abreviadas para nomes completos
export const keyMap = {
  ss: 'signo_solar',
  asc: 'ascendente',
  // Seções principais
  sa: 'sol_em_aries', st: 'sol_em_touro', sg: 'sol_em_gemeos',
  sc: 'sol_em_cancer', sl: 'sol_em_leao', sv: 'sol_em_virgem',
  sli: 'sol_em_libra', se: 'sol_em_escorpiao', ssa: 'sol_em_sagitario',
  sca: 'sol_em_capricornio', saq: 'sol_em_aquario', sp: 'sol_em_peixes',
  
  aa: 'ascendente_em_aries', at: 'ascendente_em_touro', ag: 'ascendente_em_gemeos',
  ac: 'ascendente_em_cancer', al: 'ascendente_em_leao', av: 'ascendente_em_virgem',
  ali: 'ascendente_em_libra', ae: 'ascendente_em_escorpiao', asa: 'ascendente_em_sagitario',
  aca: 'ascendente_em_capricornio', aaq: 'ascendente_em_aquario', ap: 'ascendente_em_peixes',
  
  // Propriedades
  pc: 'personalidade_combinada',
  va: 'vida_amorosa',
  vp: 'vida_profissional',
  d: 'descricao',
  cp: 'caracteristicas_principais',
  des: 'desafios',
  api: 'aparencia_primeira_impresso',
  cs: 'comportamento_social',
  cu: 'caracteristicas_unicas',
  pd: 'principais_dificuldades',
  er: 'estilo_romantico',
  ci: 'compatibilidades_ideais',
  da: 'desafios_amorosos',
  ai: 'ambiente_ideal',
  pr: 'profissoes_recomendadas',
  cpr: 'caracteristicas_profissionais'
} as const;

// Função para expandir dados otimizados
export function expandAstrologyData(optimizedData: AstrologyDataOptimized): any {
  if (Array.isArray(optimizedData)) {
    return optimizedData.map(item => 
      typeof item === 'object' ? expandAstrologyData(item) : item
    );
  }
  
  if (typeof optimizedData === 'object' && optimizedData !== null) {
    const expanded: any = {};
    for (const [key, value] of Object.entries(optimizedData)) {
      const fullKey = keyMap[key as keyof typeof keyMap] || key;
      expanded[fullKey] = typeof value === 'object' ? expandAstrologyData(value) : value;
    }
    return expanded;
  }
  
  return optimizedData;
}
