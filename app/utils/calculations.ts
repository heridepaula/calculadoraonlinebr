import type { IMCResult, PercentageCalculation, InterestCalculation } from "~/types";

export interface AdvancedIMCParams {
  weight: number;
  height: number;
  age?: number;
  gender?: 'male' | 'female';
  unitSystem?: 'metric' | 'imperial';
  weightUnit?: 'kg' | 'lb';
  heightUnit?: 'm' | 'cm' | 'ft' | 'in';
}

export interface AdvancedIMCResult extends IMCResult {
  bmr?: number;
  bodyFatPercentage?: number;
  idealWeightRange?: { min: number; max: number };
  ageAdjustedClassification?: string;
}

export function calculateIMC(weight: number, height: number): IMCResult {
  const imc = weight / (height * height);

  let classification: string;
  let healthy: boolean;

  if (imc < 18.5) {
    classification = "Abaixo do peso";
    healthy = false;
  } else if (imc < 25) {
    classification = "Peso normal";
    healthy = true;
  } else if (imc < 30) {
    classification = "Sobrepeso";
    healthy = false;
  } else if (imc < 35) {
    classification = "Obesidade grau I";
    healthy = false;
  } else if (imc < 40) {
    classification = "Obesidade grau II";
    healthy = false;
  } else {
    classification = "Obesidade grau III";
    healthy = false;
  }

  return {
    imc: Math.round(imc * 100) / 100,
    classification,
    healthy,
  };
}

export function convertUnits(params: AdvancedIMCParams): { weight: number; height: number } {
  let weight = params.weight;
  let height = params.height;

  // Convert weight to kg
  if (params.weightUnit === 'lb') {
    weight = weight * 0.453592;
  }

  // Convert height to meters
  if (params.heightUnit === 'cm') {
    height = height / 100;
  } else if (params.heightUnit === 'ft') {
    height = height * 0.3048;
  } else if (params.heightUnit === 'in') {
    height = height * 0.0254;
  }

  return { weight, height };
}

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Mifflin-St Jeor Equation
  const heightInCm = height * 100;
  
  if (gender === 'male') {
    return (10 * weight) + (6.25 * heightInCm) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * heightInCm) - (5 * age) - 161;
  }
}

export function estimateBodyFat(imc: number, age: number, gender: 'male' | 'female'): number {
  // Deurenberg formula (approximation)
  let bodyFat: number;
  
  if (gender === 'male') {
    bodyFat = (1.20 * imc) + (0.23 * age) - 16.2;
  } else {
    bodyFat = (1.20 * imc) + (0.23 * age) - 5.4;
  }
  
  return Math.max(0, Math.min(50, bodyFat)); // Clamp between 0-50%
}

export function getIdealWeightRange(height: number): { min: number; max: number } {
  const heightSquared = height * height;
  return {
    min: Math.round((18.5 * heightSquared) * 100) / 100,
    max: Math.round((24.9 * heightSquared) * 100) / 100,
  };
}

export function getAgeAdjustedIMCClassification(imc: number, age: number): string {
  // Slightly more flexible ranges for older adults
  if (age >= 65) {
    if (imc < 18.5) return "Abaixo do peso";
    else if (imc < 27) return "Peso normal"; // More flexible upper limit
    else if (imc < 32) return "Sobrepeso";
    else if (imc < 37) return "Obesidade grau I";
    else if (imc < 42) return "Obesidade grau II";
    else return "Obesidade grau III";
  }
  
  // Standard classification for adults under 65
  if (imc < 18.5) return "Abaixo do peso";
  else if (imc < 25) return "Peso normal";
  else if (imc < 30) return "Sobrepeso";
  else if (imc < 35) return "Obesidade grau I";
  else if (imc < 40) return "Obesidade grau II";
  else return "Obesidade grau III";
}

export function calculateAdvancedIMC(params: AdvancedIMCParams): AdvancedIMCResult {
  const { weight: convertedWeight, height: convertedHeight } = convertUnits(params);
  const basicResult = calculateIMC(convertedWeight, convertedHeight);
  
  const result: AdvancedIMCResult = {
    ...basicResult,
    idealWeightRange: getIdealWeightRange(convertedHeight),
  };

  if (params.age && params.gender) {
    result.bmr = Math.round(calculateBMR(convertedWeight, convertedHeight, params.age, params.gender));
    result.bodyFatPercentage = Math.round(estimateBodyFat(basicResult.imc, params.age, params.gender) * 10) / 10;
    result.ageAdjustedClassification = getAgeAdjustedIMCClassification(basicResult.imc, params.age);
  }

  return result;
}

export function calculatePercentage(value: number, percentage: number): PercentageCalculation {
  const result = (value * percentage) / 100;

  return {
    value,
    percentage,
    result: Math.round(result * 100) / 100,
  };
}

export function calculatePercentageOf(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 10000) / 100;
}

export function calculateSimpleInterest(
  principal: number,
  rate: number,
  time: number
): InterestCalculation {
  const interest = (principal * rate * time) / 100;
  const result = principal + interest;

  return {
    principal,
    rate,
    time,
    compound: false,
    result: Math.round(result * 100) / 100,
  };
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number
): InterestCalculation {
  const result = principal * Math.pow(1 + rate / 100, time);

  return {
    principal,
    rate,
    time,
    compound: true,
    result: Math.round(result * 100) / 100,
  };
}

export interface CompoundInterestParams {
  principal: number;
  monthlyContribution: number;
  interestRate: number;
  interestPeriod: 'monthly' | 'annual';
  time: number;
  timePeriod: 'months' | 'years';
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  monthlyEvolution: Array<{
    month: number;
    balance: number;
    contribution: number;
    interest: number;
    totalContributions: number;
  }>;
}

export function calculateAdvancedCompoundInterest(params: CompoundInterestParams): CompoundInterestResult {
  const { principal, monthlyContribution, interestRate, interestPeriod, time, timePeriod } = params;
  
  // Convert everything to monthly basis for calculation
  const timeInMonths = timePeriod === 'years' ? time * 12 : time;
  
  // Convert interest rate to monthly rate
  let monthlyRate: number;
  if (interestPeriod === 'annual') {
    monthlyRate = interestRate / 100 / 12;
  } else {
    monthlyRate = interestRate / 100;
  }
  
  const monthlyEvolution = [];
  let balance = principal;
  let totalContributions = principal;
  
  for (let month = 1; month <= timeInMonths; month++) {
    const interestEarned = balance * monthlyRate;
    balance += interestEarned + monthlyContribution;
    totalContributions += monthlyContribution;
    
    monthlyEvolution.push({
      month,
      balance: Math.round(balance * 100) / 100,
      contribution: monthlyContribution,
      interest: Math.round(interestEarned * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
    });
  }
  
  const finalAmount = Math.round(balance * 100) / 100;
  const totalInterest = Math.round((finalAmount - totalContributions) * 100) / 100;
  
  return {
    finalAmount,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterest,
    monthlyEvolution,
  };
}

export function compareWithSimpleInterest(
  principal: number, 
  interestRate: number, 
  interestPeriod: 'monthly' | 'annual',
  time: number,
  timePeriod: 'months' | 'years'
) {
  const timeInMonths = timePeriod === 'years' ? time * 12 : time;
  
  // Convert to annual rate for consistent calculation
  let annualRate: number;
  if (interestPeriod === 'annual') {
    annualRate = interestRate;
  } else {
    annualRate = interestRate * 12;
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const simpleInterestTotal = principal + (principal * annualRate / 100 * timeInMonths / 12);
  const compoundInterestTotal = principal * Math.pow(1 + monthlyRate, timeInMonths);
  
  return {
    simple: Math.round(simpleInterestTotal * 100) / 100,
    compound: Math.round(compoundInterestTotal * 100) / 100,
    difference: Math.round((compoundInterestTotal - simpleInterestTotal) * 100) / 100,
    percentageDifference: Math.round(((compoundInterestTotal / simpleInterestTotal - 1) * 100) * 100) / 100,
  };
}

export interface LCILCAParams {
  principal: number;
  interestRate: number;
  interestType: 'percentage_cdi' | 'percentage_ipca' | 'fixed_rate';
  period: number;
  periodUnit: 'days' | 'months' | 'years';
  indexRate?: number; // CDI rate or IPCA rate
  investmentType: 'lci' | 'lca';
  bank: string;
  minimumAmount?: number;
  hasCarencia?: boolean;
  carenciaPeriod?: number;
  carenciaUnit?: 'days' | 'months';
}

export interface LCILCAResult {
  finalAmount: number;
  grossReturn: number;
  netReturn: number; // After potential fees (LCI/LCA are tax-exempt)
  dailyReturn: number;
  monthlyReturn: number;
  annualReturn: number;
  realReturn: number; // Considering inflation
  effectiveRate: number;
  periodInDays: number;
  canWithdrawOn: Date;
  isDuringCarencia: boolean;
  comparisonWithSavings: {
    savingsReturn: number;
    advantage: number;
    percentageAdvantage: number;
  };
  comparisonWithCDB: {
    cdbReturn: number;
    cdbTax: number;
    cdbNetReturn: number;
    advantage: number;
    percentageAdvantage: number;
  };
  monthlyEvolution: Array<{
    month: number;
    balance: number;
    interestEarned: number;
    accumulatedReturn: number;
    canWithdraw: boolean;
  }>;
}

export function calculateLCILCA(params: LCILCAParams): LCILCAResult {
  const {
    principal,
    interestRate,
    interestType,
    period,
    periodUnit,
    indexRate = 0,
    investmentType,
    hasCarencia = false,
    carenciaPeriod = 0,
    carenciaUnit = 'days'
  } = params;

  // Convert period to days
  let periodInDays: number;
  switch (periodUnit) {
    case 'days':
      periodInDays = period;
      break;
    case 'months':
      periodInDays = period * 30;
      break;
    case 'years':
      periodInDays = period * 365;
      break;
  }

  // Calculate carencia period in days
  let carenciaInDays = 0;
  if (hasCarencia && carenciaPeriod > 0) {
    carenciaInDays = carenciaUnit === 'days' ? carenciaPeriod : carenciaPeriod * 30;
  }

  // Calculate effective annual rate
  let effectiveAnnualRate: number;
  switch (interestType) {
    case 'percentage_cdi':
      effectiveAnnualRate = (indexRate * interestRate / 100) / 100;
      break;
    case 'percentage_ipca':
      effectiveAnnualRate = (indexRate + interestRate) / 100;
      break;
    case 'fixed_rate':
      effectiveAnnualRate = interestRate / 100;
      break;
  }

  // Calculate daily rate
  const dailyRate = Math.pow(1 + effectiveAnnualRate, 1/365) - 1;

  // Calculate final amount (compound interest)
  const finalAmount = principal * Math.pow(1 + dailyRate, periodInDays);
  const grossReturn = finalAmount - principal;
  
  // LCI/LCA are tax-exempt for individuals
  const netReturn = grossReturn;

  // Calculate returns
  const dailyReturn = (finalAmount / principal - 1) / periodInDays;
  const monthlyReturn = Math.pow(1 + dailyRate, 30) - 1;
  const annualReturn = effectiveAnnualRate;

  // Calculate withdrawal date
  const startDate = new Date();
  const canWithdrawOn = new Date(startDate.getTime() + Math.max(periodInDays, carenciaInDays) * 24 * 60 * 60 * 1000);
  const isDuringCarencia = periodInDays < carenciaInDays;

  // Calculate monthly evolution
  const monthlyEvolution = [];
  const monthsInPeriod = Math.ceil(periodInDays / 30);
  
  for (let month = 1; month <= monthsInPeriod; month++) {
    const daysInMonth = Math.min(month * 30, periodInDays);
    const monthlyBalance = principal * Math.pow(1 + dailyRate, daysInMonth);
    const interestEarned = month === 1 ? 
      (monthlyBalance - principal) : 
      (monthlyBalance - (principal * Math.pow(1 + dailyRate, (month - 1) * 30)));
    
    monthlyEvolution.push({
      month,
      balance: Math.round(monthlyBalance * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      accumulatedReturn: Math.round((monthlyBalance - principal) * 100) / 100,
      canWithdraw: daysInMonth >= carenciaInDays
    });
  }

  // Comparison with savings (approximately 70% of CDI)
  const savingsRate = indexRate ? (indexRate * 0.7) / 100 : 0.05; // Default 5% if no CDI provided
  const savingsReturn = principal * Math.pow(1 + savingsRate/365, periodInDays) - principal;
  const savingsAdvantage = netReturn - savingsReturn;
  const savingsPercentageAdvantage = savingsReturn > 0 ? (savingsAdvantage / savingsReturn) * 100 : 0;

  // Comparison with CDB (similar rate but with taxes)
  const cdbReturn = grossReturn;
  let cdbTaxRate = 0;
  if (periodInDays <= 180) cdbTaxRate = 0.225;
  else if (periodInDays <= 360) cdbTaxRate = 0.20;
  else if (periodInDays <= 720) cdbTaxRate = 0.175;
  else cdbTaxRate = 0.15;

  const cdbTax = cdbReturn * cdbTaxRate;
  const cdbNetReturn = cdbReturn - cdbTax;
  const cdbAdvantage = netReturn - cdbNetReturn;
  const cdbPercentageAdvantage = cdbNetReturn > 0 ? (cdbAdvantage / cdbNetReturn) * 100 : 0;

  // Calculate real return (simplified, assuming IPCA if provided)
  const inflationRate = interestType === 'percentage_ipca' ? indexRate / 100 : 0.04; // Default 4% inflation
  const realReturnRate = (1 + annualReturn) / (1 + inflationRate) - 1;
  const realReturn = principal * Math.pow(1 + realReturnRate, periodInDays / 365) - principal;

  return {
    finalAmount: Math.round(finalAmount * 100) / 100,
    grossReturn: Math.round(grossReturn * 100) / 100,
    netReturn: Math.round(netReturn * 100) / 100,
    dailyReturn: Math.round(dailyReturn * 100000) / 100000,
    monthlyReturn: Math.round(monthlyReturn * 10000) / 10000,
    annualReturn: Math.round(annualReturn * 10000) / 10000,
    realReturn: Math.round(realReturn * 100) / 100,
    effectiveRate: Math.round(effectiveAnnualRate * 10000) / 100,
    periodInDays,
    canWithdrawOn,
    isDuringCarencia,
    comparisonWithSavings: {
      savingsReturn: Math.round(savingsReturn * 100) / 100,
      advantage: Math.round(savingsAdvantage * 100) / 100,
      percentageAdvantage: Math.round(savingsPercentageAdvantage * 100) / 100
    },
    comparisonWithCDB: {
      cdbReturn: Math.round(cdbReturn * 100) / 100,
      cdbTax: Math.round(cdbTax * 100) / 100,
      cdbNetReturn: Math.round(cdbNetReturn * 100) / 100,
      advantage: Math.round(cdbAdvantage * 100) / 100,
      percentageAdvantage: Math.round(cdbPercentageAdvantage * 100) / 100
    },
    monthlyEvolution
  };
}

export interface MenstrualCycleParams {
  lastPeriodDate: Date;
  cycleLength: number;
  periodLength: number;
  cycleHistory?: number[];
}

export interface MenstrualCycleResult {
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  cyclePhases: {
    menstrual: { start: Date; end: Date };
    follicular: { start: Date; end: Date };
    ovulation: { start: Date; end: Date };
    luteal: { start: Date; end: Date };
  };
  daysToNextPeriod: number;
  daysToOvulation: number;
  isIrregularCycle: boolean;
  nextSixCycles: Array<{
    cycleNumber: number;
    periodStart: Date;
    ovulation: Date;
    fertileStart: Date;
    fertileEnd: Date;
  }>;
  currentPhase: string;
  cycleLength: number;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function daysBetween(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isIrregularCycle(cycleHistory?: number[]): boolean {
  if (!cycleHistory || cycleHistory.length < 3) return false;
  
  const variance = cycleHistory.reduce((acc, cycle) => {
    const avgCycle = cycleHistory.reduce((a, b) => a + b, 0) / cycleHistory.length;
    return acc + Math.pow(cycle - avgCycle, 2);
  }, 0) / cycleHistory.length;
  
  return Math.sqrt(variance) > 4;
}

export function getCurrentPhase(lastPeriodDate: Date, cycleLength: number, periodLength: number): string {
  const today = new Date();
  const daysSinceLastPeriod = daysBetween(lastPeriodDate, today);
  
  if (daysSinceLastPeriod <= periodLength) {
    return "Menstrual";
  } else if (daysSinceLastPeriod <= cycleLength / 2 - 3) {
    return "Folicular";
  } else if (daysSinceLastPeriod >= cycleLength / 2 - 3 && daysSinceLastPeriod <= cycleLength / 2 + 1) {
    return "Ovulação";
  } else {
    return "Lútea";
  }
}

export function calculateMenstrualCycle(params: MenstrualCycleParams): MenstrualCycleResult {
  const { lastPeriodDate, cycleLength, periodLength, cycleHistory } = params;
  
  const ovulationDay = Math.floor(cycleLength / 2);
  const ovulationDate = addDays(lastPeriodDate, ovulationDay);
  
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);
  
  const nextPeriodDate = addDays(lastPeriodDate, cycleLength);
  
  const today = new Date();
  const daysToNextPeriod = daysBetween(today, nextPeriodDate);
  const daysToOvulation = daysBetween(today, ovulationDate);
  
  const currentPhase = getCurrentPhase(lastPeriodDate, cycleLength, periodLength);
  const isIrregular = isIrregularCycle(cycleHistory);
  
  const nextSixCycles = [];
  for (let i = 1; i <= 6; i++) {
    const cycleStart = addDays(lastPeriodDate, cycleLength * i);
    const cycleOvulation = addDays(cycleStart, ovulationDay);
    const cycleFertileStart = addDays(cycleOvulation, -5);
    const cycleFertileEnd = addDays(cycleOvulation, 1);
    
    nextSixCycles.push({
      cycleNumber: i + 1,
      periodStart: cycleStart,
      ovulation: cycleOvulation,
      fertileStart: cycleFertileStart,
      fertileEnd: cycleFertileEnd,
    });
  }
  
  return {
    nextPeriodDate,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    cyclePhases: {
      menstrual: { 
        start: lastPeriodDate, 
        end: addDays(lastPeriodDate, periodLength - 1) 
      },
      follicular: { 
        start: addDays(lastPeriodDate, periodLength), 
        end: addDays(ovulationDate, -1) 
      },
      ovulation: { 
        start: addDays(ovulationDate, -1), 
        end: addDays(ovulationDate, 1) 
      },
      luteal: { 
        start: addDays(ovulationDate, 2), 
        end: addDays(nextPeriodDate, -1) 
      },
    },
    daysToNextPeriod: daysToNextPeriod > 0 ? daysToNextPeriod : 0,
    daysToOvulation: daysToOvulation > 0 ? daysToOvulation : 0,
    isIrregularCycle: isIrregular,
    nextSixCycles,
    currentPhase,
    cycleLength,
  };
}

export interface ChildDevelopmentParams {
  birthDate: Date;
  isPremature?: boolean;
  gestationalWeeks?: number;
  currentWeight?: number;
  currentHeight?: number;
  birthWeight?: number;
  birthHeight?: number;
}

export interface DevelopmentMilestone {
  id: string;
  title: string;
  description: string;
  expectedAgeMonths: number;
  category: 'motor' | 'cognitive' | 'language' | 'social' | 'physical';
  priority: 'high' | 'medium' | 'low';
  achieved?: boolean;
  achievedDate?: Date;
}

export interface ChildDevelopmentResult {
  ageInMonths: number;
  ageInWeeks: number;
  correctedAge?: number;
  currentMilestones: DevelopmentMilestone[];
  upcomingMilestones: DevelopmentMilestone[];
  overdueMilestones: DevelopmentMilestone[];
  developmentScore: number;
  weightPercentile?: number;
  heightPercentile?: number;
  nextCheckupDate: Date;
  categories: {
    motor: { achieved: number; total: number; percentage: number };
    cognitive: { achieved: number; total: number; percentage: number };
    language: { achieved: number; total: number; percentage: number };
    social: { achieved: number; total: number; percentage: number };
  };
}

const DEVELOPMENT_MILESTONES: DevelopmentMilestone[] = [
  // 0-3 meses
  { id: 'smile', title: 'Sorrir socialmente', description: 'Bebê responde com sorriso quando sorrimos para ele', expectedAgeMonths: 2, category: 'social', priority: 'high' },
  { id: 'head_up', title: 'Levantar a cabeça', description: 'Consegue levantar e sustentar a cabeça por alguns segundos', expectedAgeMonths: 1.5, category: 'motor', priority: 'high' },
  { id: 'follow_objects', title: 'Seguir objetos com os olhos', description: 'Acompanha objetos em movimento com o olhar', expectedAgeMonths: 2.5, category: 'cognitive', priority: 'high' },
  
  // 3-6 meses
  { id: 'roll_over', title: 'Rolar', description: 'Consegue rolar da barriga para as costas e vice-versa', expectedAgeMonths: 4, category: 'motor', priority: 'high' },
  { id: 'laugh', title: 'Dar risada', description: 'Ri alto e demonstra alegria', expectedAgeMonths: 4, category: 'social', priority: 'medium' },
  { id: 'grab_objects', title: 'Pegar objetos', description: 'Consegue pegar e segurar objetos propositalmente', expectedAgeMonths: 5, category: 'motor', priority: 'high' },
  { id: 'babble', title: 'Balbuciar', description: 'Produz sons como "ba", "ma", "da"', expectedAgeMonths: 6, category: 'language', priority: 'high' },
  
  // 6-12 meses
  { id: 'sit_alone', title: 'Sentar sem apoio', description: 'Senta sozinho por alguns minutos', expectedAgeMonths: 7, category: 'motor', priority: 'high' },
  { id: 'stranger_anxiety', title: 'Ansiedade com estranhos', description: 'Fica desconfortável com pessoas desconhecidas', expectedAgeMonths: 8, category: 'social', priority: 'medium' },
  { id: 'crawl', title: 'Engatinhar', description: 'Move-se engatinhando pela casa', expectedAgeMonths: 9, category: 'motor', priority: 'high' },
  { id: 'first_words', title: 'Primeiras palavras', description: 'Fala "mamã" ou "papá" com significado', expectedAgeMonths: 10, category: 'language', priority: 'high' },
  { id: 'stand_support', title: 'Ficar em pé com apoio', description: 'Fica em pé segurando em móveis', expectedAgeMonths: 10, category: 'motor', priority: 'high' },
  
  // 12-18 meses
  { id: 'walk_alone', title: 'Andar sozinho', description: 'Caminha sem apoio por vários passos', expectedAgeMonths: 13, category: 'motor', priority: 'high' },
  { id: 'point_objects', title: 'Apontar objetos', description: 'Aponta para mostrar interesse em algo', expectedAgeMonths: 12, category: 'cognitive', priority: 'high' },
  { id: 'simple_commands', title: 'Seguir comandos simples', description: 'Entende e obedece comandos como "vem cá"', expectedAgeMonths: 14, category: 'language', priority: 'high' },
  { id: 'drink_cup', title: 'Beber no copo', description: 'Consegue beber líquidos em copo com ajuda', expectedAgeMonths: 15, category: 'motor', priority: 'medium' },
  
  // 18-24 meses
  { id: 'run', title: 'Correr', description: 'Corre com coordenação básica', expectedAgeMonths: 20, category: 'motor', priority: 'medium' },
  { id: 'two_words', title: 'Falar duas palavras juntas', description: 'Combina duas palavras como "quero água"', expectedAgeMonths: 18, category: 'language', priority: 'high' },
  { id: 'pretend_play', title: 'Brincar de faz de conta', description: 'Simula atividades como alimentar boneca', expectedAgeMonths: 19, category: 'cognitive', priority: 'medium' },
  { id: 'climb_stairs', title: 'Subir escadas', description: 'Sobe escadas com apoio, um degrau por vez', expectedAgeMonths: 21, category: 'motor', priority: 'medium' },
  
  // 24-36 meses
  { id: 'jump', title: 'Pular', description: 'Pula com os dois pés saindo do chão', expectedAgeMonths: 28, category: 'motor', priority: 'medium' },
  { id: 'sentences', title: 'Formar frases', description: 'Fala frases de 3-4 palavras', expectedAgeMonths: 30, category: 'language', priority: 'high' },
  { id: 'parallel_play', title: 'Brincar ao lado de outras crianças', description: 'Brinca próximo, mas não necessariamente junto com outras crianças', expectedAgeMonths: 24, category: 'social', priority: 'medium' },
  { id: 'potty_training', title: 'Controle de esfíncter', description: 'Mostra sinais de estar pronto para desfralde', expectedAgeMonths: 30, category: 'physical', priority: 'low' }
];

export interface AveragePriceTransaction {
  id: string;
  date: Date;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  fees?: number;
}

export interface AveragePriceParams {
  transactions: AveragePriceTransaction[];
  method: 'fifo' | 'weighted_average' | 'simple_average';
  includeFees: boolean;
}

export interface AveragePriceResult {
  averagePrice: number;
  totalQuantity: number;
  totalInvested: number;
  totalFees: number;
  currentPosition: number;
  realizedGainLoss: number;
  unrealizedGainLoss: number;
  currentMarketPrice?: number;
  transactionHistory: Array<{
    id: string;
    date: Date;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    fees: number;
    runningAverage: number;
    runningQuantity: number;
    gainLoss?: number;
  }>;
  summary: {
    totalBuys: number;
    totalSells: number;
    averageBuyPrice: number;
    averageSellPrice: number;
    totalBuyQuantity: number;
    totalSellQuantity: number;
    breakEvenPrice: number;
  };
}

export function calculateAveragePrice(params: AveragePriceParams): AveragePriceResult {
  const { transactions, method, includeFees } = params;
  
  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  let runningQuantity = 0;
  let runningTotal = 0;
  let runningAverage = 0;
  let totalFees = 0;
  let realizedGainLoss = 0;
  const transactionHistory = [];
  
  // Separate buy and sell transactions for summary
  const buyTransactions = sortedTransactions.filter(t => t.type === 'buy');
  const sellTransactions = sortedTransactions.filter(t => t.type === 'sell');
  
  for (const transaction of sortedTransactions) {
    const fees = includeFees ? (transaction.fees || 0) : 0;
    totalFees += fees;
    
    if (transaction.type === 'buy') {
      const totalCost = (transaction.price * transaction.quantity) + fees;
      runningTotal += totalCost;
      runningQuantity += transaction.quantity;
      
      if (method === 'weighted_average') {
        runningAverage = runningTotal / runningQuantity;
      } else if (method === 'simple_average') {
        const buyPrices = sortedTransactions
          .filter(t => t.type === 'buy' && t.date <= transaction.date)
          .map(t => t.price);
        runningAverage = buyPrices.reduce((sum, price) => sum + price, 0) / buyPrices.length;
      }
    } else { // sell
      if (runningQuantity >= transaction.quantity) {
        const sellValue = (transaction.price * transaction.quantity) - fees;
        const costBasis = runningAverage * transaction.quantity;
        const gainLoss = sellValue - costBasis;
        
        realizedGainLoss += gainLoss;
        runningTotal -= costBasis;
        runningQuantity -= transaction.quantity;
        
        if (runningQuantity > 0 && method === 'weighted_average') {
          runningAverage = runningTotal / runningQuantity;
        }
        
        transactionHistory.push({
          id: transaction.id,
          date: transaction.date,
          type: transaction.type,
          quantity: transaction.quantity,
          price: transaction.price,
          fees,
          runningAverage,
          runningQuantity,
          gainLoss
        });
        continue;
      }
    }
    
    transactionHistory.push({
      id: transaction.id,
      date: transaction.date,
      type: transaction.type,
      quantity: transaction.quantity,
      price: transaction.price,
      fees,
      runningAverage,
      runningQuantity
    });
  }
  
  // Calculate summary statistics
  const totalBuyQuantity = buyTransactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalSellQuantity = sellTransactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalBuyValue = buyTransactions.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  const totalSellValue = sellTransactions.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  
  const averageBuyPrice = totalBuyQuantity > 0 ? totalBuyValue / totalBuyQuantity : 0;
  const averageSellPrice = totalSellQuantity > 0 ? totalSellValue / totalSellQuantity : 0;
  
  // Break-even price (including fees)
  const breakEvenPrice = runningQuantity > 0 ? (runningTotal + totalFees) / runningQuantity : 0;
  
  return {
    averagePrice: Math.round(runningAverage * 100) / 100,
    totalQuantity: runningQuantity,
    totalInvested: Math.round(runningTotal * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    currentPosition: runningQuantity,
    realizedGainLoss: Math.round(realizedGainLoss * 100) / 100,
    unrealizedGainLoss: 0, // Will be calculated when current market price is provided
    transactionHistory,
    summary: {
      totalBuys: buyTransactions.length,
      totalSells: sellTransactions.length,
      averageBuyPrice: Math.round(averageBuyPrice * 100) / 100,
      averageSellPrice: Math.round(averageSellPrice * 100) / 100,
      totalBuyQuantity,
      totalSellQuantity,
      breakEvenPrice: Math.round(breakEvenPrice * 100) / 100
    }
  };
}

export function calculateUnrealizedGainLoss(result: AveragePriceResult, currentMarketPrice: number): AveragePriceResult {
  const unrealizedGainLoss = (currentMarketPrice - result.averagePrice) * result.currentPosition;
  
  return {
    ...result,
    currentMarketPrice,
    unrealizedGainLoss: Math.round(unrealizedGainLoss * 100) / 100
  };
}

export interface CDBParams {
  principal: number;
  interestRate: number;
  interestType: 'percentage_cdi' | 'percentage_ipca' | 'fixed_rate';
  period: number;
  periodUnit: 'days' | 'months' | 'years';
  indexRate?: number; // CDI rate or IPCA rate
  bankTier: 'tier1' | 'tier2' | 'credit_cooperative'; // Affects guarantee limits
  hasIOF?: boolean; // For investments less than 30 days
  monthlyContributions?: number; // Optional monthly contributions
}

export interface CDBResult {
  finalAmount: number;
  grossReturn: number;
  incomeTax: number;
  iofTax: number;
  netReturn: number;
  netFinalAmount: number;
  dailyReturn: number;
  monthlyReturn: number;
  annualReturn: number;
  realReturn: number; // After inflation
  effectiveRate: number;
  periodInDays: number;
  taxRate: number; // IR rate applied
  breakEvenInflation: number; // Inflation rate to break even
  monthlyEvolution: Array<{
    month: number;
    balance: number;
    grossInterest: number;
    tax: number;
    netInterest: number;
    accumulatedGross: number;
    accumulatedNet: number;
  }>;
  comparison: {
    savings: {
      finalAmount: number;
      advantage: number;
      percentageAdvantage: number;
    };
    lciLca: {
      finalAmount: number;
      advantage: number; // Advantage of LCI/LCA over CDB
      percentageAdvantage: number;
    };
  };
  taxBrackets: {
    days: number;
    rate: number;
    description: string;
    isActive: boolean;
  }[];
}

// CDB Tax rates based on investment period
export const CDB_TAX_BRACKETS = [
  { days: 0, maxDays: 180, rate: 0.225, description: "Até 180 dias" },
  { days: 181, maxDays: 360, rate: 0.20, description: "181 a 360 dias" },
  { days: 361, maxDays: 720, rate: 0.175, description: "361 a 720 dias" },
  { days: 721, maxDays: Infinity, rate: 0.15, description: "Acima de 720 dias" },
];

// IOF rates for investments less than 30 days
export const IOF_RATES = [
  { day: 1, rate: 0.96 }, { day: 2, rate: 0.93 }, { day: 3, rate: 0.90 },
  { day: 4, rate: 0.86 }, { day: 5, rate: 0.83 }, { day: 6, rate: 0.80 },
  { day: 7, rate: 0.76 }, { day: 8, rate: 0.73 }, { day: 9, rate: 0.70 },
  { day: 10, rate: 0.66 }, { day: 11, rate: 0.63 }, { day: 12, rate: 0.60 },
  { day: 13, rate: 0.56 }, { day: 14, rate: 0.53 }, { day: 15, rate: 0.50 },
  { day: 16, rate: 0.46 }, { day: 17, rate: 0.43 }, { day: 18, rate: 0.40 },
  { day: 19, rate: 0.36 }, { day: 20, rate: 0.33 }, { day: 21, rate: 0.30 },
  { day: 22, rate: 0.26 }, { day: 23, rate: 0.23 }, { day: 24, rate: 0.20 },
  { day: 25, rate: 0.16 }, { day: 26, rate: 0.13 }, { day: 27, rate: 0.10 },
  { day: 28, rate: 0.06 }, { day: 29, rate: 0.03 }, { day: 30, rate: 0.00 }
];

export function calculateCDB(params: CDBParams): CDBResult {
  const {
    principal,
    interestRate,
    interestType,
    period,
    periodUnit,
    indexRate = 0,
    bankTier,
    hasIOF = false,
    monthlyContributions = 0
  } = params;

  // Convert period to days
  let periodInDays: number;
  switch (periodUnit) {
    case 'days':
      periodInDays = period;
      break;
    case 'months':
      periodInDays = period * 30;
      break;
    case 'years':
      periodInDays = period * 365;
      break;
  }

  // Calculate effective annual rate
  let effectiveAnnualRate: number;
  switch (interestType) {
    case 'percentage_cdi':
      effectiveAnnualRate = (indexRate * interestRate / 100) / 100;
      break;
    case 'percentage_ipca':
      effectiveAnnualRate = (indexRate + interestRate) / 100;
      break;
    case 'fixed_rate':
      effectiveAnnualRate = interestRate / 100;
      break;
  }

  // Calculate daily rate
  const dailyRate = Math.pow(1 + effectiveAnnualRate, 1/365) - 1;

  // Calculate gross return
  let finalAmount: number;
  let monthlyEvolution = [];
  
  if (monthlyContributions > 0) {
    // Calculate with monthly contributions
    finalAmount = principal;
    let currentBalance = principal;
    const monthsInPeriod = Math.ceil(periodInDays / 30);
    
    for (let month = 1; month <= monthsInPeriod; month++) {
      const daysInMonth = Math.min(month * 30, periodInDays) - (month - 1) * 30;
      const monthlyRate = Math.pow(1 + dailyRate, daysInMonth) - 1;
      
      // Interest on existing balance
      const grossInterest = currentBalance * monthlyRate;
      currentBalance += grossInterest;
      
      // Add monthly contribution (except last month if period doesn't align)
      if (month < monthsInPeriod || (month * 30) <= periodInDays) {
        currentBalance += monthlyContributions;
      }
      
      const accumulatedGross = currentBalance - (principal + monthlyContributions * month);
      
      // Calculate taxes on interest earned
      const taxRate = getTaxRate(periodInDays);
      const taxOnInterest = grossInterest * taxRate;
      const netInterest = grossInterest - taxOnInterest;
      
      monthlyEvolution.push({
        month,
        balance: Math.round(currentBalance * 100) / 100,
        grossInterest: Math.round(grossInterest * 100) / 100,
        tax: Math.round(taxOnInterest * 100) / 100,
        netInterest: Math.round(netInterest * 100) / 100,
        accumulatedGross: Math.round(accumulatedGross * 100) / 100,
        accumulatedNet: Math.round((accumulatedGross - (accumulatedGross * taxRate)) * 100) / 100,
      });
    }
    
    finalAmount = currentBalance;
  } else {
    // Simple compound interest
    finalAmount = principal * Math.pow(1 + dailyRate, periodInDays);
  }

  const grossReturn = finalAmount - principal - (monthlyContributions * Math.ceil(periodInDays / 30));

  // Calculate taxes
  const taxRate = getTaxRate(periodInDays);
  const incomeTax = grossReturn * taxRate;
  
  // Calculate IOF if applicable
  let iofTax = 0;
  if (hasIOF && periodInDays < 30) {
    const iofRate = getIOFRate(periodInDays);
    iofTax = grossReturn * (iofRate / 100);
  }

  const netReturn = grossReturn - incomeTax - iofTax;
  const netFinalAmount = finalAmount - incomeTax - iofTax;

  // Calculate returns
  const dailyReturn = (finalAmount / principal - 1) / periodInDays;
  const monthlyReturn = Math.pow(1 + dailyRate, 30) - 1;
  const annualReturn = effectiveAnnualRate;

  // Calculate comparisons
  const savingsRate = indexRate ? (indexRate * 0.7) / 100 : 0.05; // 70% of CDI or 5% default
  const savingsAmount = principal * Math.pow(1 + savingsRate/365, periodInDays);
  const savingsAdvantage = netFinalAmount - savingsAmount;
  const savingsPercentageAdvantage = savingsAmount > 0 ? (savingsAdvantage / savingsAmount) * 100 : 0;

  // LCI/LCA comparison (no tax)
  const lciLcaAmount = finalAmount; // Same gross return as CDB
  const lciLcaAdvantage = lciLcaAmount - netFinalAmount; // Tax savings
  const lciLcaPercentageAdvantage = netFinalAmount > 0 ? (lciLcaAdvantage / netFinalAmount) * 100 : 0;

  // Real return calculation
  const inflationRate = interestType === 'percentage_ipca' ? indexRate / 100 : 0.04; // Default 4% inflation
  const realReturnRate = (1 + (netReturn / principal)) / (1 + inflationRate) - 1;
  const realReturn = principal * realReturnRate;

  // Break-even inflation
  const netAnnualReturn = Math.pow(netFinalAmount / principal, 365 / periodInDays) - 1;
  const breakEvenInflation = netAnnualReturn;

  // Tax brackets info
  const taxBrackets = CDB_TAX_BRACKETS.map(bracket => ({
    days: bracket.days === 0 ? bracket.days : bracket.days,
    rate: bracket.rate,
    description: bracket.description,
    isActive: periodInDays >= bracket.days && periodInDays <= (bracket.maxDays === Infinity ? periodInDays : bracket.maxDays)
  }));

  return {
    finalAmount: Math.round(finalAmount * 100) / 100,
    grossReturn: Math.round(grossReturn * 100) / 100,
    incomeTax: Math.round(incomeTax * 100) / 100,
    iofTax: Math.round(iofTax * 100) / 100,
    netReturn: Math.round(netReturn * 100) / 100,
    netFinalAmount: Math.round(netFinalAmount * 100) / 100,
    dailyReturn: Math.round(dailyReturn * 100000) / 100000,
    monthlyReturn: Math.round(monthlyReturn * 10000) / 10000,
    annualReturn: Math.round(annualReturn * 10000) / 10000,
    realReturn: Math.round(realReturn * 100) / 100,
    effectiveRate: Math.round(effectiveAnnualRate * 10000) / 100,
    periodInDays,
    taxRate,
    breakEvenInflation: Math.round(breakEvenInflation * 10000) / 100,
    monthlyEvolution,
    comparison: {
      savings: {
        finalAmount: Math.round(savingsAmount * 100) / 100,
        advantage: Math.round(savingsAdvantage * 100) / 100,
        percentageAdvantage: Math.round(savingsPercentageAdvantage * 100) / 100
      },
      lciLca: {
        finalAmount: Math.round(lciLcaAmount * 100) / 100,
        advantage: Math.round(lciLcaAdvantage * 100) / 100,
        percentageAdvantage: Math.round(lciLcaPercentageAdvantage * 100) / 100
      }
    },
    taxBrackets
  };
}

function getTaxRate(periodInDays: number): number {
  for (const bracket of CDB_TAX_BRACKETS) {
    if (periodInDays >= bracket.days && periodInDays <= bracket.maxDays) {
      return bracket.rate;
    }
  }
  return 0.15; // Default to lowest rate
}

function getIOFRate(periodInDays: number): number {
  if (periodInDays >= 30) return 0;
  
  const iofEntry = IOF_RATES.find(entry => entry.day === periodInDays);
  return iofEntry ? iofEntry.rate : 0;
}

export function calculateChildDevelopment(params: ChildDevelopmentParams): ChildDevelopmentResult {
  const { birthDate, isPremature = false, gestationalWeeks = 40 } = params;
  const today = new Date();
  
  // Calcular idade em meses e semanas
  const ageInDays = daysBetween(birthDate, today);
  const ageInWeeks = Math.floor(ageInDays / 7);
  const ageInMonths = Math.floor(ageInDays / 30.44); // Média de dias por mês
  
  // Calcular idade corrigida para prematuros
  let correctedAge = ageInMonths;
  if (isPremature && gestationalWeeks < 37) {
    const weeksEarly = 40 - gestationalWeeks;
    const correctionInDays = weeksEarly * 7;
    const correctedAgeInDays = ageInDays - correctionInDays;
    correctedAge = Math.max(0, Math.floor(correctedAgeInDays / 30.44));
  }
  
  const effectiveAge = isPremature ? correctedAge : ageInMonths;
  
  // Categorizar marcos por status
  const currentMilestones: DevelopmentMilestone[] = [];
  const upcomingMilestones: DevelopmentMilestone[] = [];
  const overdueMilestones: DevelopmentMilestone[] = [];
  
  DEVELOPMENT_MILESTONES.forEach(milestone => {
    const expectedAge = milestone.expectedAgeMonths;
    const toleranceMonths = milestone.priority === 'high' ? 2 : milestone.priority === 'medium' ? 3 : 4;
    
    if (effectiveAge >= expectedAge - 1 && effectiveAge <= expectedAge + 1) {
      currentMilestones.push(milestone);
    } else if (effectiveAge < expectedAge - 1) {
      upcomingMilestones.push(milestone);
    } else if (effectiveAge > expectedAge + toleranceMonths) {
      overdueMilestones.push(milestone);
    }
  });
  
  // Calcular estatísticas por categoria
  const categories = {
    motor: { achieved: 0, total: 0, percentage: 0 },
    cognitive: { achieved: 0, total: 0, percentage: 0 },
    language: { achieved: 0, total: 0, percentage: 0 },
    social: { achieved: 0, total: 0, percentage: 0 },
  };
  
  DEVELOPMENT_MILESTONES.forEach(milestone => {
    if (milestone.expectedAgeMonths <= effectiveAge + 2) {
      if (categories[milestone.category]) {
        categories[milestone.category].total++;
        if (milestone.achieved || effectiveAge >= milestone.expectedAgeMonths) {
          categories[milestone.category].achieved++;
        }
      }
    }
  });
  
  // Calcular percentuais
  Object.keys(categories).forEach(key => {
    const category = categories[key as keyof typeof categories];
    category.percentage = category.total > 0 ? Math.round((category.achieved / category.total) * 100) : 0;
  });
  
  // Score geral de desenvolvimento
  const totalExpected = DEVELOPMENT_MILESTONES.filter(m => m.expectedAgeMonths <= effectiveAge).length;
  const totalAchieved = DEVELOPMENT_MILESTONES.filter(m => 
    m.expectedAgeMonths <= effectiveAge && (m.achieved || effectiveAge >= m.expectedAgeMonths)
  ).length;
  const developmentScore = totalExpected > 0 ? Math.round((totalAchieved / totalExpected) * 100) : 100;
  
  // Próxima consulta pediátrica recomendada
  let nextCheckupMonths = 1;
  if (ageInMonths < 6) nextCheckupMonths = 1;
  else if (ageInMonths < 12) nextCheckupMonths = 2;
  else if (ageInMonths < 24) nextCheckupMonths = 3;
  else nextCheckupMonths = 6;
  
  const nextCheckupDate = addDays(today, nextCheckupMonths * 30);
  
  return {
    ageInMonths,
    ageInWeeks,
    correctedAge: isPremature ? correctedAge : undefined,
    currentMilestones: currentMilestones.slice(0, 8), // Limite para não sobrecarregar
    upcomingMilestones: upcomingMilestones.slice(0, 6),
    overdueMilestones,
    developmentScore,
    nextCheckupDate,
    categories
  };
}
