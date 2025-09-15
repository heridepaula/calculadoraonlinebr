import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import numerologyData from "~/data/astrology/numerologia/numerologia-interpretacoes.json";

// Tabela de valores numerológicos das letras
const letterValues: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  // Acentos e caracteres especiais
  Á: 1, À: 1, Â: 1, Ã: 1, Ä: 1,
  É: 5, È: 5, Ê: 5, Ë: 5,
  Í: 9, Ì: 9, Î: 9, Ï: 9,
  Ó: 6, Ò: 6, Ô: 6, Õ: 6, Ö: 6,
  Ú: 3, Ù: 3, Û: 3, Ü: 3,
  Ç: 3, Ñ: 5
};

// Vogais para cálculo do número da alma
const vowels = ['A', 'E', 'I', 'O', 'U', 'Á', 'À', 'Â', 'Ã', 'Ä', 'É', 'È', 'Ê', 'Ë', 'Í', 'Ì', 'Î', 'Ï', 'Ó', 'Ò', 'Ô', 'Õ', 'Ö', 'Ú', 'Ù', 'Û', 'Ü'];

// Função para reduzir número a dígito único (exceto números mestres)
const reduceToSingleDigit = (num: number, allowMasterNumbers = true): number => {
  if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
    return num;
  }

  while (num > 9) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  return num;
};

// Calcular valor numérico do nome
const calculateNameValue = (name: string, useOnlyVowels = false): number => {
  const cleanName = name.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, '');
  let total = 0;

  for (const letter of cleanName) {
    if (useOnlyVowels) {
      if (vowels.includes(letter) && letterValues[letter]) {
        total += letterValues[letter];
      }
    } else {
      if (letterValues[letter]) {
        total += letterValues[letter];
      }
    }
  }

  return total;
};

// Calcular número da vida (caminho de vida)
const calculateLifePathNumber = (date: string): { number: number; calculation: string } => {
  const [year, month, day] = date.split('-').map(Number);

  const daySum = day.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const monthSum = month.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);

  const total = daySum + monthSum + yearSum;
  const finalNumber = reduceToSingleDigit(total);

  const calculation = `${day}/${month}/${year} → ${day} + ${month} + ${year} = ${daySum} + ${monthSum} + ${yearSum} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Calcular número do destino (nome completo)
const calculateDestinyNumber = (fullName: string): { number: number; calculation: string } => {
  const total = calculateNameValue(fullName);
  const finalNumber = reduceToSingleDigit(total);

  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, '');
  const letterBreakdown = Array.from(cleanName).map(letter => `${letter}(${letterValues[letter] || 0})`).join(' + ');

  const calculation = `${fullName} → ${letterBreakdown} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Calcular número da personalidade (consoantes)
const calculatePersonalityNumber = (fullName: string): { number: number; calculation: string } => {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, '');

  let total = 0;
  const consonants = [];

  for (const letter of cleanName) {
    if (!vowels.includes(letter) && letterValues[letter]) {
      total += letterValues[letter];
      consonants.push(`${letter}(${letterValues[letter]})`);
    }
  }

  const finalNumber = reduceToSingleDigit(total, false); // Personalidade não usa números mestres

  const calculation = `Consoantes: ${consonants.join(' + ')} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

// Calcular número da alma (vogais)
const calculateSoulNumber = (fullName: string): { number: number; calculation: string } => {
  const total = calculateNameValue(fullName, true);
  const finalNumber = reduceToSingleDigit(total, false); // Alma não usa números mestres

  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, '');
  const vowelBreakdown = Array.from(cleanName)
    .filter(letter => vowels.includes(letter))
    .map(letter => `${letter}(${letterValues[letter] || 0})`)
    .join(' + ');

  const calculation = `Vogais: ${vowelBreakdown} = ${total} → ${finalNumber}`;

  return { number: finalNumber, calculation };
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const fullName = url.searchParams.get("name");
  const birthDate = url.searchParams.get("date");

  if (!fullName || !birthDate) {
    return json({ error: "Parâmetros 'name' e 'date' são obrigatórios" }, { status: 400 });
  }

  try {
    // Calcular todos os números numerológicos
    const lifePathResult = calculateLifePathNumber(birthDate);
    const destinyResult = calculateDestinyNumber(fullName);
    const personalityResult = calculatePersonalityNumber(fullName);
    const soulResult = calculateSoulNumber(fullName);

    // Buscar interpretações dos dados JSON
    const lifePathData = numerologyData[lifePathResult.number.toString() as keyof typeof numerologyData];
    const destinyData = numerologyData[destinyResult.number.toString() as keyof typeof numerologyData];
    const personalityData = numerologyData[personalityResult.number.toString() as keyof typeof numerologyData];
    const soulData = numerologyData[soulResult.number.toString() as keyof typeof numerologyData];

    if (!lifePathData || !destinyData || !personalityData || !soulData) {
      return json({ error: "Dados de interpretação não encontrados" }, { status: 404 });
    }

    const result = {
      input: {
        fullName,
        birthDate
      },
      numbers: {
        lifePathNumber: lifePathResult.number,
        destinyNumber: destinyResult.number,
        personalityNumber: personalityResult.number,
        soulNumber: soulResult.number
      },
      calculations: {
        lifePathCalculation: lifePathResult.calculation,
        destinyCalculation: destinyResult.calculation,
        personalityCalculation: personalityResult.calculation,
        soulCalculation: soulResult.calculation
      },
      interpretations: {
        lifePath: {
          description: lifePathData.lifePath,
          compatibility: lifePathData.compatibility,
          crystals: lifePathData.crystals,
          herbs: lifePathData.herbs,
          colors: lifePathData.colors,
          affirmation: lifePathData.affirmation,
          chakra: lifePathData.chakra,
          careerPaths: lifePathData.careerPaths,
          challenges: lifePathData.challenges,
          gifts: lifePathData.gifts,
          moonPhase: lifePathData.moonPhase,
          element: lifePathData.element
        },
        destiny: {
          description: destinyData.destiny,
          compatibility: destinyData.compatibility,
          crystals: destinyData.crystals,
          herbs: destinyData.herbs,
          colors: destinyData.colors,
          affirmation: destinyData.affirmation,
          chakra: destinyData.chakra,
          careerPaths: destinyData.careerPaths,
          challenges: destinyData.challenges,
          gifts: destinyData.gifts,
          moonPhase: destinyData.moonPhase,
          element: destinyData.element
        },
        personality: {
          description: personalityData.personality,
          compatibility: personalityData.compatibility,
          crystals: personalityData.crystals,
          herbs: personalityData.herbs,
          colors: personalityData.colors,
          affirmation: personalityData.affirmation,
          chakra: personalityData.chakra,
          careerPaths: personalityData.careerPaths,
          challenges: personalityData.challenges,
          gifts: personalityData.gifts,
          moonPhase: personalityData.moonPhase,
          element: personalityData.element
        },
        soul: {
          description: soulData.soul,
          compatibility: soulData.compatibility,
          crystals: soulData.crystals,
          herbs: soulData.herbs,
          colors: soulData.colors,
          affirmation: soulData.affirmation,
          chakra: soulData.chakra,
          careerPaths: soulData.careerPaths,
          challenges: soulData.challenges,
          gifts: soulData.gifts,
          moonPhase: soulData.moonPhase,
          element: soulData.element
        }
      },
      masterNumbers: {
        hasLifePathMaster: [11, 22, 33].includes(lifePathResult.number),
        hasDestinyMaster: [11, 22, 33].includes(destinyResult.number),
        hasPersonalityMaster: [11, 22, 33].includes(personalityResult.number),
        hasSoulMaster: [11, 22, 33].includes(soulResult.number)
      }
    };

    return json(result);
  } catch (error) {
    console.error("Erro ao calcular numerologia:", error);
    return json({ error: "Erro interno ao calcular numerologia" }, { status: 500 });
  }
}