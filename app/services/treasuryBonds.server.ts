import { json } from "@remix-run/node";

// Tipos para a API do Tesouro Direto
export interface TreasuryBondData {
  TrsrBd: {
    nm: string; // Nome do título
    cd: number; // Código do título
    untrInvstmtVal: number; // Preço unitário
    anulInvstmtRate: number; // Taxa de investimento
    minInvstmtAmt: number; // Valor mínimo
    mtrtyDt: string; // Data de vencimento
  };
  TrsrBdType: {
    nm: string; // Tipo do título
  };
}

export interface TreasuryBondsResponse {
  response: {
    TrsrBdTradgList: TreasuryBondData[];
  };
}

// Cache em memória (em produção, usar Redis ou database)
let bondDataCache: {
  data: TreasuryBondData[] | null;
  lastUpdate: Date | null;
  nextUpdate: Date | null;
} = {
  data: null,
  lastUpdate: null,
  nextUpdate: null,
};

// Função para buscar dados da API oficial
export async function fetchTreasuryBonds(): Promise<TreasuryBondData[]> {
  try {
    console.log("🔄 Buscando dados do Tesouro Direto...");

    const response = await fetch(
      "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "application/json",
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TreasuryBondsResponse = await response.json();

    if (!data.response?.TrsrBdTradgList) {
      throw new Error("Estrutura de dados inválida da API");
    }

    console.log(`✅ ${data.response.TrsrBdTradgList.length} títulos obtidos do Tesouro Direto`);
    return data.response.TrsrBdTradgList;
  } catch (error) {
    console.error("❌ Erro ao buscar dados do Tesouro Direto:", error);
    throw error;
  }
}

// Função para processar e categorizar os títulos
export function processTreasuryBonds(bonds: TreasuryBondData[]): ProcessedBond[] {
  return bonds
    .map((bond) => {
      const bondType = detectBondType(bond.TrsrBd.nm);
      const maturityDate = parseMaturityDate(bond.TrsrBd.mtrtyDt);

      return {
        code: bond.TrsrBd.cd.toString(),
        name: bond.TrsrBd.nm,
        type: bondType,
        rate: bond.TrsrBd.anulInvstmtRate || 0, // Taxa de investimento
        price: bond.TrsrBd.untrInvstmtVal || 0, // Preço unitário
        minInvestment: bond.TrsrBd.minInvstmtAmt || 30, // Valor mínimo
        maturityDate: maturityDate,
        rawData: bond,
      };
    })
    .filter((bond) => {
      // Remove títulos com dados incompletos
      if (bond.type === "unknown" || !bond.name || !bond.maturityDate || bond.price <= 0) {
        return false;
      }

      // Remove Tesouro Educa+ e Renda+ Aposentadoria
      if (
        bond.name.toUpperCase().includes("EDUCA+") ||
        bond.name.toUpperCase().includes("RENDA+") ||
        bond.name.toUpperCase().includes("APOSENTADORIA")
      ) {
        return false;
      }

      return true;
    });
}

export interface ProcessedBond {
  code: string;
  name: string;
  type:
    | "tesouro_selic"
    | "tesouro_prefixado"
    | "tesouro_ipca"
    | "tesouro_prefixado_juros"
    | "tesouro_ipca_juros"
    | "unknown";
  rate: number;
  price: number;
  minInvestment: number;
  maturityDate: string;
  rawData: TreasuryBondData;
}

// Detecta o tipo do título baseado no nome
function detectBondType(name: string): ProcessedBond["type"] {
  const upperName = name.toUpperCase();

  // Tesouro Selic (LFT)
  if (upperName.includes("SELIC") || upperName.includes("LFT")) {
    return "tesouro_selic";
  }

  // Tesouro IPCA+ com Juros Semestrais (NTN-B)
  if (upperName.includes("NTN-B") || (upperName.includes("IPCA") && upperName.includes("JUROS"))) {
    return "tesouro_ipca_juros";
  }

  // Tesouro IPCA+ Principal (NTN-B Principal)
  if (
    upperName.includes("IPCA") &&
    (upperName.includes("PRINCIPAL") || !upperName.includes("JUROS"))
  ) {
    return "tesouro_ipca";
  }

  // Tesouro Prefixado com Juros Semestrais (NTN-F)
  if (
    upperName.includes("NTN-F") ||
    (upperName.includes("PREFIXADO") && upperName.includes("JUROS"))
  ) {
    return "tesouro_prefixado_juros";
  }

  // Tesouro Prefixado (LTN)
  if (upperName.includes("PREFIXADO") || upperName.includes("LTN")) {
    return "tesouro_prefixado";
  }

  return "unknown";
}

// Converte data de vencimento para formato ISO
function parseMaturityDate(dateString: string): string {
  try {
    // A API retorna datas em formato ISO: '2026-08-15T00:00:00'
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Retorna apenas YYYY-MM-DD
  } catch {
    return dateString; // Retorna original se não conseguir parsear
  }
}

// Função para obter dados com cache
export async function getCachedTreasuryBonds(): Promise<ProcessedBond[]> {
  const now = new Date();

  // Verifica se precisa atualizar o cache
  const needsUpdate =
    !bondDataCache.data ||
    !bondDataCache.lastUpdate ||
    (bondDataCache.nextUpdate && now >= bondDataCache.nextUpdate);

  if (needsUpdate) {
    try {
      const rawBonds = await fetchTreasuryBonds();
      const processedBonds = processTreasuryBonds(rawBonds);

      // Atualiza o cache
      bondDataCache.data = rawBonds;
      bondDataCache.lastUpdate = now;
      bondDataCache.nextUpdate = getNextUpdateTime();

      console.log(
        `💾 Cache atualizado. Próxima atualização: ${bondDataCache.nextUpdate?.toLocaleString("pt-BR")}`
      );

      return processedBonds;
    } catch (error) {
      console.error("❌ Erro ao atualizar cache, usando dados anteriores se disponível");

      // Se tiver dados em cache, usa eles mesmo que antigos
      if (bondDataCache.data) {
        return processTreasuryBonds(bondDataCache.data);
      }

      // Se não tem cache, retorna dados padrão
      return getDefaultBonds();
    }
  }

  // Usa dados do cache
  if (bondDataCache.data) {
    return processTreasuryBonds(bondDataCache.data);
  }

  // Fallback para dados padrão
  return getDefaultBonds();
}

// Calcula próxima atualização (21h do mesmo dia ou próximo dia)
function getNextUpdateTime(): Date {
  const now = new Date();
  const nextUpdate = new Date(now);

  // Define para 21h (21:00:00)
  nextUpdate.setHours(21, 0, 0, 0);

  // Se já passou das 21h hoje, agenda para amanhã
  if (now.getHours() >= 21) {
    nextUpdate.setDate(nextUpdate.getDate() + 1);
  }

  return nextUpdate;
}

// Títulos padrão em caso de falha na API
function getDefaultBonds(): ProcessedBond[] {
  const defaultMaturityDate = new Date();
  defaultMaturityDate.setFullYear(defaultMaturityDate.getFullYear() + 3);

  return [
    {
      code: "LTN_2027",
      name: "Tesouro Prefixado 2027",
      type: "tesouro_prefixado",
      rate: 12.5,
      price: 85.5,
      minInvestment: 30.0,
      maturityDate: "2027-01-01",
      rawData: {} as TreasuryBondData,
    },
    {
      code: "NTN-B_2029",
      name: "Tesouro IPCA+ 2029",
      type: "tesouro_ipca",
      rate: 6.8,
      price: 95.2,
      minInvestment: 30.0,
      maturityDate: "2029-05-15",
      rawData: {} as TreasuryBondData,
    },
    {
      code: "LFT_2027",
      name: "Tesouro Selic 2027",
      type: "tesouro_selic",
      rate: 0.03,
      price: 99.8,
      minInvestment: 30.0,
      maturityDate: "2027-03-01",
      rawData: {} as TreasuryBondData,
    },
  ];
}

// Função para forçar atualização (útil para debugging)
export async function forceCacheUpdate(): Promise<ProcessedBond[]> {
  bondDataCache.data = null;
  bondDataCache.lastUpdate = null;
  bondDataCache.nextUpdate = null;

  return getCachedTreasuryBonds();
}

// Status do cache para debugging
export function getCacheStatus() {
  return {
    hasData: !!bondDataCache.data,
    lastUpdate: bondDataCache.lastUpdate,
    nextUpdate: bondDataCache.nextUpdate,
    bondsCount: bondDataCache.data?.length || 0,
  };
}
