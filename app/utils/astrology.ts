// Utilitários para cálculos astrológicos

export function calculateSolarSign(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // getMonth() retorna 0-11, necessitamos 1-12
  const day = date.getDate();

  // Datas aproximadas dos signos solares
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Áries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Touro';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gêmeos';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Câncer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leão';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgem';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Escorpião';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitário';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricórnio';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquário';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Peixes';

  return 'Áries'; // fallback
}

export async function fetchAscendantDescription(solarSign: string, ascendantSign: string) {
  try {
    const response = await fetch(
      `/api/ascendant-description?solar=${encodeURIComponent(solarSign)}&ascendant=${encodeURIComponent(ascendantSign)}`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Erro ao buscar descrição');
    }
    
    return result.data;
  } catch (error) {
    console.error('Erro ao buscar descrição do ascendente:', error);
    throw error;
  }
}