import type { IMCResult, PercentageCalculation, InterestCalculation } from "~/types";

export interface HydrationParams {
  weight: number;
  age: number;
  gender: "male" | "female";
  activityLevel: "sedentary" | "light" | "moderate" | "intense" | "extreme";
  climate: "cold" | "temperate" | "hot" | "very_hot";
  altitude: "sea_level" | "moderate" | "high";
  pregnancy?: boolean;
  breastfeeding?: boolean;
  healthConditions?: string[];
  currentIntake?: number;
  startTime?: string;
  endTime?: string;
}

export interface HydrationResult {
  baseWater: number; // ml per day
  activityAdjustment: number; // ml per day
  climateAdjustment: number; // ml per day
  altitudeAdjustment: number; // ml per day
  specialConditionsAdjustment: number; // ml per day
  totalDaily: number; // ml per day
  totalDailyLiters: number; // liters per day
  perHour: number; // ml per hour
  perKg: number; // ml per kg body weight
  glassesPerDay: number; // 250ml glasses
  bottlesPerDay: number; // 500ml bottles
  recommendations: string[];
  riskLevel: "low" | "moderate" | "high";
  hydrationSchedule: Array<{ time: string; amount: number; description: string }>;
}

export interface AdvancedIMCParams {
  weight: number;
  height: number;
  age?: number;
  gender?: "male" | "female";
  unitSystem?: "metric" | "imperial";
  weightUnit?: "kg" | "lb";
  heightUnit?: "m" | "cm" | "ft" | "in";
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
  if (params.weightUnit === "lb") {
    weight = weight * 0.453592;
  }

  // Convert height to meters
  if (params.heightUnit === "cm") {
    height = height / 100;
  } else if (params.heightUnit === "ft") {
    height = height * 0.3048;
  } else if (params.heightUnit === "in") {
    height = height * 0.0254;
  }

  return { weight, height };
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  // Mifflin-St Jeor Equation
  const heightInCm = height * 100;

  if (gender === "male") {
    return 10 * weight + 6.25 * heightInCm - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * heightInCm - 5 * age - 161;
  }
}

export function estimateBodyFat(imc: number, age: number, gender: "male" | "female"): number {
  // Deurenberg formula (approximation)
  let bodyFat: number;

  if (gender === "male") {
    bodyFat = 1.2 * imc + 0.23 * age - 16.2;
  } else {
    bodyFat = 1.2 * imc + 0.23 * age - 5.4;
  }

  return Math.max(0, Math.min(50, bodyFat)); // Clamp between 0-50%
}

export function getIdealWeightRange(height: number): { min: number; max: number } {
  const heightSquared = height * height;
  return {
    min: Math.round(18.5 * heightSquared * 100) / 100,
    max: Math.round(24.9 * heightSquared * 100) / 100,
  };
}

export function getAgeAdjustedIMCClassification(imc: number, age: number): string {
  // Slightly more flexible ranges for older adults
  if (age >= 65) {
    if (imc < 18.5) return "Abaixo do peso";
    else if (imc < 27)
      return "Peso normal"; // More flexible upper limit
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
    result.bmr = Math.round(
      calculateBMR(convertedWeight, convertedHeight, params.age, params.gender)
    );
    result.bodyFatPercentage =
      Math.round(estimateBodyFat(basicResult.imc, params.age, params.gender) * 10) / 10;
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
  interestPeriod: "monthly" | "annual";
  time: number;
  timePeriod: "months" | "years";
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

export function calculateAdvancedCompoundInterest(
  params: CompoundInterestParams
): CompoundInterestResult {
  const { principal, monthlyContribution, interestRate, interestPeriod, time, timePeriod } = params;

  // Convert everything to monthly basis for calculation
  const timeInMonths = timePeriod === "years" ? time * 12 : time;

  // Convert interest rate to monthly rate
  let monthlyRate: number;
  if (interestPeriod === "annual") {
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
  interestPeriod: "monthly" | "annual",
  time: number,
  timePeriod: "months" | "years"
) {
  const timeInMonths = timePeriod === "years" ? time * 12 : time;

  // Convert to annual rate for consistent calculation
  let annualRate: number;
  if (interestPeriod === "annual") {
    annualRate = interestRate;
  } else {
    annualRate = interestRate * 12;
  }

  const monthlyRate = annualRate / 100 / 12;
  const simpleInterestTotal = principal + (((principal * annualRate) / 100) * timeInMonths) / 12;
  const compoundInterestTotal = principal * Math.pow(1 + monthlyRate, timeInMonths);

  return {
    simple: Math.round(simpleInterestTotal * 100) / 100,
    compound: Math.round(compoundInterestTotal * 100) / 100,
    difference: Math.round((compoundInterestTotal - simpleInterestTotal) * 100) / 100,
    percentageDifference:
      Math.round((compoundInterestTotal / simpleInterestTotal - 1) * 100 * 100) / 100,
  };
}

export interface LCILCAParams {
  principal: number;
  interestRate: number;
  interestType: "percentage_cdi" | "percentage_ipca" | "fixed_rate";
  period: number;
  periodUnit: "days" | "months" | "years";
  indexRate?: number; // CDI rate or IPCA rate
  investmentType: "lci" | "lca";
  bank: string;
  minimumAmount?: number;
  hasCarencia?: boolean;
  carenciaPeriod?: number;
  carenciaUnit?: "days" | "months";
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
    carenciaUnit = "days",
  } = params;

  // Convert period to days
  let periodInDays: number;
  switch (periodUnit) {
    case "days":
      periodInDays = period;
      break;
    case "months":
      periodInDays = period * 30;
      break;
    case "years":
      periodInDays = period * 365;
      break;
  }

  // Calculate carencia period in days
  let carenciaInDays = 0;
  if (hasCarencia && carenciaPeriod > 0) {
    carenciaInDays = carenciaUnit === "days" ? carenciaPeriod : carenciaPeriod * 30;
  }

  // Calculate effective annual rate
  let effectiveAnnualRate: number;
  switch (interestType) {
    case "percentage_cdi":
      effectiveAnnualRate = (indexRate * interestRate) / 100 / 100;
      break;
    case "percentage_ipca":
      effectiveAnnualRate = (indexRate + interestRate) / 100;
      break;
    case "fixed_rate":
      effectiveAnnualRate = interestRate / 100;
      break;
  }

  // Calculate daily rate
  const dailyRate = Math.pow(1 + effectiveAnnualRate, 1 / 365) - 1;

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
  const canWithdrawOn = new Date(
    startDate.getTime() + Math.max(periodInDays, carenciaInDays) * 24 * 60 * 60 * 1000
  );
  const isDuringCarencia = periodInDays < carenciaInDays;

  // Calculate monthly evolution
  const monthlyEvolution = [];
  const monthsInPeriod = Math.ceil(periodInDays / 30);

  for (let month = 1; month <= monthsInPeriod; month++) {
    const daysInMonth = Math.min(month * 30, periodInDays);
    const monthlyBalance = principal * Math.pow(1 + dailyRate, daysInMonth);
    const interestEarned =
      month === 1
        ? monthlyBalance - principal
        : monthlyBalance - principal * Math.pow(1 + dailyRate, (month - 1) * 30);

    monthlyEvolution.push({
      month,
      balance: Math.round(monthlyBalance * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      accumulatedReturn: Math.round((monthlyBalance - principal) * 100) / 100,
      canWithdraw: daysInMonth >= carenciaInDays,
    });
  }

  // Comparison with savings (approximately 70% of CDI)
  const savingsRate = indexRate ? (indexRate * 0.7) / 100 : 0.05; // Default 5% if no CDI provided
  const savingsReturn = principal * Math.pow(1 + savingsRate / 365, periodInDays) - principal;
  const savingsAdvantage = netReturn - savingsReturn;
  const savingsPercentageAdvantage =
    savingsReturn > 0 ? (savingsAdvantage / savingsReturn) * 100 : 0;

  // Comparison with CDB (similar rate but with taxes)
  const cdbReturn = grossReturn;
  let cdbTaxRate = 0;
  if (periodInDays <= 180) cdbTaxRate = 0.225;
  else if (periodInDays <= 360) cdbTaxRate = 0.2;
  else if (periodInDays <= 720) cdbTaxRate = 0.175;
  else cdbTaxRate = 0.15;

  const cdbTax = cdbReturn * cdbTaxRate;
  const cdbNetReturn = cdbReturn - cdbTax;
  const cdbAdvantage = netReturn - cdbNetReturn;
  const cdbPercentageAdvantage = cdbNetReturn > 0 ? (cdbAdvantage / cdbNetReturn) * 100 : 0;

  // Calculate real return (simplified, assuming IPCA if provided)
  const inflationRate = interestType === "percentage_ipca" ? indexRate / 100 : 0.04; // Default 4% inflation
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
      percentageAdvantage: Math.round(savingsPercentageAdvantage * 100) / 100,
    },
    comparisonWithCDB: {
      cdbReturn: Math.round(cdbReturn * 100) / 100,
      cdbTax: Math.round(cdbTax * 100) / 100,
      cdbNetReturn: Math.round(cdbNetReturn * 100) / 100,
      advantage: Math.round(cdbAdvantage * 100) / 100,
      percentageAdvantage: Math.round(cdbPercentageAdvantage * 100) / 100,
    },
    monthlyEvolution,
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

  const variance =
    cycleHistory.reduce((acc, cycle) => {
      const avgCycle = cycleHistory.reduce((a, b) => a + b, 0) / cycleHistory.length;
      return acc + Math.pow(cycle - avgCycle, 2);
    }, 0) / cycleHistory.length;

  return Math.sqrt(variance) > 4;
}

export function getCurrentPhase(
  lastPeriodDate: Date,
  cycleLength: number,
  periodLength: number
): string {
  const today = new Date();
  const daysSinceLastPeriod = daysBetween(lastPeriodDate, today);

  if (daysSinceLastPeriod <= periodLength) {
    return "Menstrual";
  } else if (daysSinceLastPeriod <= cycleLength / 2 - 3) {
    return "Folicular";
  } else if (
    daysSinceLastPeriod >= cycleLength / 2 - 3 &&
    daysSinceLastPeriod <= cycleLength / 2 + 1
  ) {
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
        end: addDays(lastPeriodDate, periodLength - 1),
      },
      follicular: {
        start: addDays(lastPeriodDate, periodLength),
        end: addDays(ovulationDate, -1),
      },
      ovulation: {
        start: addDays(ovulationDate, -1),
        end: addDays(ovulationDate, 1),
      },
      luteal: {
        start: addDays(ovulationDate, 2),
        end: addDays(nextPeriodDate, -1),
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
  category: "motor" | "cognitive" | "language" | "social" | "physical";
  priority: "high" | "medium" | "low";
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
  {
    id: "smile",
    title: "Sorrir socialmente",
    description: "Bebê responde com sorriso quando sorrimos para ele",
    expectedAgeMonths: 2,
    category: "social",
    priority: "high",
  },
  {
    id: "head_up",
    title: "Levantar a cabeça",
    description: "Consegue levantar e sustentar a cabeça por alguns segundos",
    expectedAgeMonths: 1.5,
    category: "motor",
    priority: "high",
  },
  {
    id: "follow_objects",
    title: "Seguir objetos com os olhos",
    description: "Acompanha objetos em movimento com o olhar",
    expectedAgeMonths: 2.5,
    category: "cognitive",
    priority: "high",
  },

  // 3-6 meses
  {
    id: "roll_over",
    title: "Rolar",
    description: "Consegue rolar da barriga para as costas e vice-versa",
    expectedAgeMonths: 4,
    category: "motor",
    priority: "high",
  },
  {
    id: "laugh",
    title: "Dar risada",
    description: "Ri alto e demonstra alegria",
    expectedAgeMonths: 4,
    category: "social",
    priority: "medium",
  },
  {
    id: "grab_objects",
    title: "Pegar objetos",
    description: "Consegue pegar e segurar objetos propositalmente",
    expectedAgeMonths: 5,
    category: "motor",
    priority: "high",
  },
  {
    id: "babble",
    title: "Balbuciar",
    description: 'Produz sons como "ba", "ma", "da"',
    expectedAgeMonths: 6,
    category: "language",
    priority: "high",
  },

  // 6-12 meses
  {
    id: "sit_alone",
    title: "Sentar sem apoio",
    description: "Senta sozinho por alguns minutos",
    expectedAgeMonths: 7,
    category: "motor",
    priority: "high",
  },
  {
    id: "stranger_anxiety",
    title: "Ansiedade com estranhos",
    description: "Fica desconfortável com pessoas desconhecidas",
    expectedAgeMonths: 8,
    category: "social",
    priority: "medium",
  },
  {
    id: "crawl",
    title: "Engatinhar",
    description: "Move-se engatinhando pela casa",
    expectedAgeMonths: 9,
    category: "motor",
    priority: "high",
  },
  {
    id: "first_words",
    title: "Primeiras palavras",
    description: 'Fala "mamã" ou "papá" com significado',
    expectedAgeMonths: 10,
    category: "language",
    priority: "high",
  },
  {
    id: "stand_support",
    title: "Ficar em pé com apoio",
    description: "Fica em pé segurando em móveis",
    expectedAgeMonths: 10,
    category: "motor",
    priority: "high",
  },

  // 12-18 meses
  {
    id: "walk_alone",
    title: "Andar sozinho",
    description: "Caminha sem apoio por vários passos",
    expectedAgeMonths: 13,
    category: "motor",
    priority: "high",
  },
  {
    id: "point_objects",
    title: "Apontar objetos",
    description: "Aponta para mostrar interesse em algo",
    expectedAgeMonths: 12,
    category: "cognitive",
    priority: "high",
  },
  {
    id: "simple_commands",
    title: "Seguir comandos simples",
    description: 'Entende e obedece comandos como "vem cá"',
    expectedAgeMonths: 14,
    category: "language",
    priority: "high",
  },
  {
    id: "drink_cup",
    title: "Beber no copo",
    description: "Consegue beber líquidos em copo com ajuda",
    expectedAgeMonths: 15,
    category: "motor",
    priority: "medium",
  },

  // 18-24 meses
  {
    id: "run",
    title: "Correr",
    description: "Corre com coordenação básica",
    expectedAgeMonths: 20,
    category: "motor",
    priority: "medium",
  },
  {
    id: "two_words",
    title: "Falar duas palavras juntas",
    description: 'Combina duas palavras como "quero água"',
    expectedAgeMonths: 18,
    category: "language",
    priority: "high",
  },
  {
    id: "pretend_play",
    title: "Brincar de faz de conta",
    description: "Simula atividades como alimentar boneca",
    expectedAgeMonths: 19,
    category: "cognitive",
    priority: "medium",
  },
  {
    id: "climb_stairs",
    title: "Subir escadas",
    description: "Sobe escadas com apoio, um degrau por vez",
    expectedAgeMonths: 21,
    category: "motor",
    priority: "medium",
  },

  // 24-36 meses
  {
    id: "jump",
    title: "Pular",
    description: "Pula com os dois pés saindo do chão",
    expectedAgeMonths: 28,
    category: "motor",
    priority: "medium",
  },
  {
    id: "sentences",
    title: "Formar frases",
    description: "Fala frases de 3-4 palavras",
    expectedAgeMonths: 30,
    category: "language",
    priority: "high",
  },
  {
    id: "parallel_play",
    title: "Brincar ao lado de outras crianças",
    description: "Brinca próximo, mas não necessariamente junto com outras crianças",
    expectedAgeMonths: 24,
    category: "social",
    priority: "medium",
  },
  {
    id: "potty_training",
    title: "Controle de esfíncter",
    description: "Mostra sinais de estar pronto para desfralde",
    expectedAgeMonths: 30,
    category: "physical",
    priority: "low",
  },
];

export interface AveragePriceTransaction {
  id: string;
  date: Date;
  quantity: number;
  price: number;
  type: "buy" | "sell";
  fees?: number;
}

export interface AveragePriceParams {
  transactions: AveragePriceTransaction[];
  method: "fifo" | "weighted_average" | "simple_average";
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
    type: "buy" | "sell";
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
  const buyTransactions = sortedTransactions.filter((t) => t.type === "buy");
  const sellTransactions = sortedTransactions.filter((t) => t.type === "sell");

  for (const transaction of sortedTransactions) {
    const fees = includeFees ? transaction.fees || 0 : 0;
    totalFees += fees;

    if (transaction.type === "buy") {
      const totalCost = transaction.price * transaction.quantity + fees;
      runningTotal += totalCost;
      runningQuantity += transaction.quantity;

      if (method === "weighted_average") {
        runningAverage = runningTotal / runningQuantity;
      } else if (method === "simple_average") {
        const buyPrices = sortedTransactions
          .filter((t) => t.type === "buy" && t.date <= transaction.date)
          .map((t) => t.price);
        runningAverage = buyPrices.reduce((sum, price) => sum + price, 0) / buyPrices.length;
      }
    } else {
      // sell
      if (runningQuantity >= transaction.quantity) {
        const sellValue = transaction.price * transaction.quantity - fees;
        const costBasis = runningAverage * transaction.quantity;
        const gainLoss = sellValue - costBasis;

        realizedGainLoss += gainLoss;
        runningTotal -= costBasis;
        runningQuantity -= transaction.quantity;

        if (runningQuantity > 0 && method === "weighted_average") {
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
          gainLoss,
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
      runningQuantity,
    });
  }

  // Calculate summary statistics
  const totalBuyQuantity = buyTransactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalSellQuantity = sellTransactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalBuyValue = buyTransactions.reduce((sum, t) => sum + t.price * t.quantity, 0);
  const totalSellValue = sellTransactions.reduce((sum, t) => sum + t.price * t.quantity, 0);

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
      breakEvenPrice: Math.round(breakEvenPrice * 100) / 100,
    },
  };
}

export function calculateUnrealizedGainLoss(
  result: AveragePriceResult,
  currentMarketPrice: number
): AveragePriceResult {
  const unrealizedGainLoss = (currentMarketPrice - result.averagePrice) * result.currentPosition;

  return {
    ...result,
    currentMarketPrice,
    unrealizedGainLoss: Math.round(unrealizedGainLoss * 100) / 100,
  };
}

export interface CDBParams {
  principal: number;
  interestRate: number;
  interestType: "percentage_cdi" | "percentage_ipca" | "fixed_rate";
  period: number;
  periodUnit: "days" | "months" | "years";
  indexRate?: number; // CDI rate or IPCA rate
  bankTier: "tier1" | "tier2" | "credit_cooperative"; // Affects guarantee limits
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
  { days: 181, maxDays: 360, rate: 0.2, description: "181 a 360 dias" },
  { days: 361, maxDays: 720, rate: 0.175, description: "361 a 720 dias" },
  { days: 721, maxDays: Infinity, rate: 0.15, description: "Acima de 720 dias" },
];

// IOF rates for investments less than 30 days
export const IOF_RATES = [
  { day: 1, rate: 0.96 },
  { day: 2, rate: 0.93 },
  { day: 3, rate: 0.9 },
  { day: 4, rate: 0.86 },
  { day: 5, rate: 0.83 },
  { day: 6, rate: 0.8 },
  { day: 7, rate: 0.76 },
  { day: 8, rate: 0.73 },
  { day: 9, rate: 0.7 },
  { day: 10, rate: 0.66 },
  { day: 11, rate: 0.63 },
  { day: 12, rate: 0.6 },
  { day: 13, rate: 0.56 },
  { day: 14, rate: 0.53 },
  { day: 15, rate: 0.5 },
  { day: 16, rate: 0.46 },
  { day: 17, rate: 0.43 },
  { day: 18, rate: 0.4 },
  { day: 19, rate: 0.36 },
  { day: 20, rate: 0.33 },
  { day: 21, rate: 0.3 },
  { day: 22, rate: 0.26 },
  { day: 23, rate: 0.23 },
  { day: 24, rate: 0.2 },
  { day: 25, rate: 0.16 },
  { day: 26, rate: 0.13 },
  { day: 27, rate: 0.1 },
  { day: 28, rate: 0.06 },
  { day: 29, rate: 0.03 },
  { day: 30, rate: 0.0 },
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
    monthlyContributions = 0,
  } = params;

  // Convert period to days
  let periodInDays: number;
  switch (periodUnit) {
    case "days":
      periodInDays = period;
      break;
    case "months":
      periodInDays = period * 30;
      break;
    case "years":
      periodInDays = period * 365;
      break;
  }

  // Calculate effective annual rate
  let effectiveAnnualRate: number;
  switch (interestType) {
    case "percentage_cdi":
      effectiveAnnualRate = (indexRate * interestRate) / 100 / 100;
      break;
    case "percentage_ipca":
      effectiveAnnualRate = (indexRate + interestRate) / 100;
      break;
    case "fixed_rate":
      effectiveAnnualRate = interestRate / 100;
      break;
  }

  // Calculate daily rate
  const dailyRate = Math.pow(1 + effectiveAnnualRate, 1 / 365) - 1;

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
      if (month < monthsInPeriod || month * 30 <= periodInDays) {
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
        accumulatedNet: Math.round((accumulatedGross - accumulatedGross * taxRate) * 100) / 100,
      });
    }

    finalAmount = currentBalance;
  } else {
    // Simple compound interest
    finalAmount = principal * Math.pow(1 + dailyRate, periodInDays);
  }

  const grossReturn = finalAmount - principal - monthlyContributions * Math.ceil(periodInDays / 30);

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
  const savingsAmount = principal * Math.pow(1 + savingsRate / 365, periodInDays);
  const savingsAdvantage = netFinalAmount - savingsAmount;
  const savingsPercentageAdvantage =
    savingsAmount > 0 ? (savingsAdvantage / savingsAmount) * 100 : 0;

  // LCI/LCA comparison (no tax)
  const lciLcaAmount = finalAmount; // Same gross return as CDB
  const lciLcaAdvantage = lciLcaAmount - netFinalAmount; // Tax savings
  const lciLcaPercentageAdvantage =
    netFinalAmount > 0 ? (lciLcaAdvantage / netFinalAmount) * 100 : 0;

  // Real return calculation
  const inflationRate = interestType === "percentage_ipca" ? indexRate / 100 : 0.04; // Default 4% inflation
  const realReturnRate = (1 + netReturn / principal) / (1 + inflationRate) - 1;
  const realReturn = principal * realReturnRate;

  // Break-even inflation
  const netAnnualReturn = Math.pow(netFinalAmount / principal, 365 / periodInDays) - 1;
  const breakEvenInflation = netAnnualReturn;

  // Tax brackets info
  const taxBrackets = CDB_TAX_BRACKETS.map((bracket) => ({
    days: bracket.days === 0 ? bracket.days : bracket.days,
    rate: bracket.rate,
    description: bracket.description,
    isActive:
      periodInDays >= bracket.days &&
      periodInDays <= (bracket.maxDays === Infinity ? periodInDays : bracket.maxDays),
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
        percentageAdvantage: Math.round(savingsPercentageAdvantage * 100) / 100,
      },
      lciLca: {
        finalAmount: Math.round(lciLcaAmount * 100) / 100,
        advantage: Math.round(lciLcaAdvantage * 100) / 100,
        percentageAdvantage: Math.round(lciLcaPercentageAdvantage * 100) / 100,
      },
    },
    taxBrackets,
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

  const iofEntry = IOF_RATES.find((entry) => entry.day === periodInDays);
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

  DEVELOPMENT_MILESTONES.forEach((milestone) => {
    const expectedAge = milestone.expectedAgeMonths;
    const toleranceMonths =
      milestone.priority === "high" ? 2 : milestone.priority === "medium" ? 3 : 4;

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

  DEVELOPMENT_MILESTONES.forEach((milestone) => {
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
  Object.keys(categories).forEach((key) => {
    const category = categories[key as keyof typeof categories];
    category.percentage =
      category.total > 0 ? Math.round((category.achieved / category.total) * 100) : 0;
  });

  // Score geral de desenvolvimento
  const totalExpected = DEVELOPMENT_MILESTONES.filter(
    (m) => m.expectedAgeMonths <= effectiveAge
  ).length;
  const totalAchieved = DEVELOPMENT_MILESTONES.filter(
    (m) =>
      m.expectedAgeMonths <= effectiveAge && (m.achieved || effectiveAge >= m.expectedAgeMonths)
  ).length;
  const developmentScore =
    totalExpected > 0 ? Math.round((totalAchieved / totalExpected) * 100) : 100;

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
    categories,
  };
}

export interface RealEstateFinancingParams {
  propertyValue: number;
  downPayment: number;
  loanTerm: number; // years
  interestRate: number; // annual percentage
  system: "sac" | "price";
  insurance?: number; // annual insurance cost
  propertyTax?: number; // annual property tax
  condominiumFee?: number; // monthly
  income?: number; // monthly income for affordability analysis
  extraPayments?: Array<{ month: number; amount: number }>;
}

export interface RealEstateFinancingResult {
  loanAmount: number;
  downPaymentAmount: number;
  totalInterest: number;
  totalAmount: number;
  monthlyPayments: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    totalInterest: number;
    totalPaid: number;
  }>;
  firstPayment: number;
  lastPayment: number;
  averagePayment: number;
  totalMonthlyCost: number; // Including taxes, insurance, condo fee
  affordabilityAnalysis: {
    incomeRatio: number;
    isAffordable: boolean;
    maxRecommendedPayment: number;
    monthlyBudgetLeft: number;
  };
  comparison: {
    rentEquivalent: number;
    breakEvenPoint: number; // months
  };
  amortizationChart: Array<{
    year: number;
    totalPaid: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }>;
  extraPaymentImpact?: {
    timeReduction: number; // months saved
    interestSavings: number;
    newTotalInterest: number;
    newTotalAmount: number;
  };
}

export function calculateRealEstateFinancing(
  params: RealEstateFinancingParams
): RealEstateFinancingResult {
  const {
    propertyValue,
    downPayment,
    loanTerm,
    interestRate,
    system,
    insurance = 0,
    propertyTax = 0,
    condominiumFee = 0,
    income = 0,
    extraPayments = [],
  } = params;

  const loanAmount = propertyValue - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;

  let monthlyPayments: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    totalInterest: number;
    totalPaid: number;
  }> = [];

  let totalInterest = 0;
  let balance = loanAmount;

  if (system === "price") {
    // PRICE System (Constant Payment)
    const fixedPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = fixedPayment - interestPayment;

      // Apply extra payments if any
      const extraPayment = extraPayments.find((ep) => ep.month === month)?.amount || 0;
      const totalPrincipalPayment = principalPayment + extraPayment;

      balance -= totalPrincipalPayment;
      totalInterest += interestPayment;

      monthlyPayments.push({
        month,
        payment: Math.round((fixedPayment + extraPayment) * 100) / 100,
        principal: Math.round(totalPrincipalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.round(Math.max(0, balance) * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalPaid:
          Math.round(
            (month * fixedPayment +
              extraPayments
                .slice(0, month)
                .reduce((sum, ep) => sum + (ep.month <= month ? ep.amount : 0), 0)) *
              100
          ) / 100,
      });

      if (balance <= 0) break;
    }
  } else {
    // SAC System (Constant Amortization)
    const constantPrincipal = loanAmount / totalMonths;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = constantPrincipal;

      // Apply extra payments if any
      const extraPayment = extraPayments.find((ep) => ep.month === month)?.amount || 0;
      const totalPrincipalPayment = principalPayment + extraPayment;

      const totalPayment = interestPayment + totalPrincipalPayment;

      balance -= totalPrincipalPayment;
      totalInterest += interestPayment;

      monthlyPayments.push({
        month,
        payment: Math.round(totalPayment * 100) / 100,
        principal: Math.round(totalPrincipalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.round(Math.max(0, balance) * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalPaid:
          Math.round(
            (month * (constantPrincipal + interestPayment) +
              extraPayments
                .slice(0, month)
                .reduce((sum, ep) => sum + (ep.month <= month ? ep.amount : 0), 0)) *
              100
          ) / 100,
      });

      if (balance <= 0) break;
    }
  }

  const totalAmount = loanAmount + totalInterest;
  const firstPayment = monthlyPayments[0]?.payment || 0;
  const lastPayment = monthlyPayments[monthlyPayments.length - 1]?.payment || 0;
  const averagePayment =
    monthlyPayments.reduce((sum, payment) => sum + payment.payment, 0) / monthlyPayments.length;

  // Additional monthly costs
  const monthlyInsurance = insurance / 12;
  const monthlyPropertyTax = propertyTax / 12;
  const totalMonthlyCost = averagePayment + monthlyInsurance + monthlyPropertyTax + condominiumFee;

  // Affordability analysis
  const incomeRatio = income > 0 ? totalMonthlyCost / income : 0;
  const maxRecommendedPayment = income * 0.3; // 30% rule
  const isAffordable = totalMonthlyCost <= maxRecommendedPayment;
  const monthlyBudgetLeft = income - totalMonthlyCost;

  // Comparison with rent
  const rentEquivalent = totalMonthlyCost * 0.7; // Estimate: owning costs ~30% more than renting
  const breakEvenPoint = Math.round(
    (downPayment + (totalMonthlyCost - rentEquivalent) * 12) / (rentEquivalent * 0.03 * 12)
  ); // Simplified calculation

  // Yearly amortization chart
  const amortizationChart = [];
  for (let year = 1; year <= loanTerm; year++) {
    const endMonth = Math.min(year * 12, monthlyPayments.length);
    const yearPayments = monthlyPayments.slice((year - 1) * 12, endMonth);

    amortizationChart.push({
      year,
      totalPaid:
        Math.round(yearPayments.reduce((sum, payment) => sum + payment.payment, 0) * 100) / 100,
      principalPaid:
        Math.round(yearPayments.reduce((sum, payment) => sum + payment.principal, 0) * 100) / 100,
      interestPaid:
        Math.round(yearPayments.reduce((sum, payment) => sum + payment.interest, 0) * 100) / 100,
      remainingBalance:
        endMonth < monthlyPayments.length ? monthlyPayments[endMonth - 1].balance : 0,
    });
  }

  // Extra payment impact analysis
  let extraPaymentImpact = undefined;
  if (extraPayments.length > 0) {
    // Calculate without extra payments for comparison
    const withoutExtraParams = { ...params, extraPayments: [] };
    const withoutExtra = calculateRealEstateFinancing(withoutExtraParams);

    const timeReduction = withoutExtra.monthlyPayments.length - monthlyPayments.length;
    const interestSavings = withoutExtra.totalInterest - totalInterest;

    extraPaymentImpact = {
      timeReduction,
      interestSavings: Math.round(interestSavings * 100) / 100,
      newTotalInterest: Math.round(totalInterest * 100) / 100,
      newTotalAmount: Math.round(totalAmount * 100) / 100,
    };
  }

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    downPaymentAmount: Math.round(downPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    monthlyPayments,
    firstPayment: Math.round(firstPayment * 100) / 100,
    lastPayment: Math.round(lastPayment * 100) / 100,
    averagePayment: Math.round(averagePayment * 100) / 100,
    totalMonthlyCost: Math.round(totalMonthlyCost * 100) / 100,
    affordabilityAnalysis: {
      incomeRatio: Math.round(incomeRatio * 10000) / 100,
      isAffordable,
      maxRecommendedPayment: Math.round(maxRecommendedPayment * 100) / 100,
      monthlyBudgetLeft: Math.round(monthlyBudgetLeft * 100) / 100,
    },
    comparison: {
      rentEquivalent: Math.round(rentEquivalent * 100) / 100,
      breakEvenPoint,
    },
    amortizationChart,
    extraPaymentImpact,
  };
}

export interface PayrollLoanParams {
  loanAmount: number;
  interestRate: number; // monthly percentage
  termMonths: number;
  grossSalary: number;
  employeeType: "clt" | "public_servant" | "retiree" | "pensioner";
  hasOtherConsignados?: boolean;
  otherConsignadosAmount?: number;
  institutionType: "bank" | "correspondent" | "fintech";
  hasInsurance?: boolean;
  insuranceCost?: number; // monthly
  age?: number;
  desiredAmount?: number; // for reverse calculation
}

export interface PayrollLoanResult {
  loanAmount: number;
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  effectiveAnnualRate: number;
  monthlyPayments: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    totalPaid: number;
  }>;
  marginAnalysis: {
    availableMargin: number;
    usedMargin: number;
    remainingMargin: number;
    marginPercent: number;
    maxLoanAmount: number;
    isWithinLimits: boolean;
  };
  affordabilityAnalysis: {
    salaryCommitment: number;
    remainingSalary: number;
    isAffordable: boolean;
    riskLevel: "low" | "medium" | "high";
    recommendations: string[];
  };
  comparison: {
    personalLoan: {
      monthlyPayment: number;
      totalAmount: number;
      savings: number;
      percentageSavings: number;
    };
    creditCard: {
      monthlyPayment: number;
      totalAmount: number;
      savings: number;
      percentageSavings: number;
    };
  };
  institutionAnalysis: {
    typicalRates: {
      min: number;
      max: number;
      average: number;
    };
    advantages: string[];
    considerations: string[];
  };
  ageImpact?: {
    maxTermAvailable: number;
    ageAtEnd: number;
    isViable: boolean;
    recommendations: string[];
  };
}

export function calculatePayrollLoan(params: PayrollLoanParams): PayrollLoanResult {
  const {
    loanAmount,
    interestRate,
    termMonths,
    grossSalary,
    employeeType,
    hasOtherConsignados = false,
    otherConsignadosAmount = 0,
    institutionType,
    hasInsurance = false,
    insuranceCost = 0,
    age,
    desiredAmount,
  } = params;

  // Calculate monthly payment using compound interest formula
  const monthlyRate = interestRate / 100;
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  // Generate payment schedule
  const monthlyPayments = [];
  let balance = loanAmount;
  let totalPaid = 0;

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    totalPaid += monthlyPayment;

    monthlyPayments.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.round(Math.max(0, balance) * 100) / 100,
      totalPaid: Math.round(totalPaid * 100) / 100,
    });
  }

  const totalAmount = monthlyPayment * termMonths;
  const totalInterest = totalAmount - loanAmount;

  // Calculate consignado margin limits based on employee type
  let maxMarginPercent: number;
  switch (employeeType) {
    case "clt":
      maxMarginPercent = 0.3; // 30% for CLT employees
      break;
    case "public_servant":
      maxMarginPercent = 0.35; // 35% for public servants
      break;
    case "retiree":
    case "pensioner":
      maxMarginPercent = 0.35; // 35% for retirees and pensioners
      break;
    default:
      maxMarginPercent = 0.3;
  }

  // Margin analysis
  const availableMargin = grossSalary * maxMarginPercent;
  const usedMargin = monthlyPayment + otherConsignadosAmount + (hasInsurance ? insuranceCost : 0);
  const remainingMargin = availableMargin - usedMargin;
  const marginPercent = (usedMargin / availableMargin) * 100;
  const isWithinLimits = usedMargin <= availableMargin;

  // Calculate maximum loan amount with available margin
  const availablePaymentCapacity = remainingMargin;
  const maxLoanAmount =
    availablePaymentCapacity > 0
      ? (availablePaymentCapacity * (Math.pow(1 + monthlyRate, termMonths) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, termMonths))
      : 0;

  // Affordability analysis
  const salaryCommitment = (usedMargin / grossSalary) * 100;
  const remainingSalary = grossSalary - usedMargin;
  let riskLevel: "low" | "medium" | "high" = "low";
  let isAffordable = true;

  if (salaryCommitment > 35) {
    riskLevel = "high";
    isAffordable = false;
  } else if (salaryCommitment > 25) {
    riskLevel = "medium";
  }

  const recommendations: string[] = [];
  if (riskLevel === "high") {
    recommendations.push(
      "Compromentimento alto da renda. Considere um valor menor ou prazo maior."
    );
  }
  if (hasOtherConsignados && otherConsignadosAmount > 0) {
    recommendations.push(
      "Você já tem outros consignados. Avalie a possibilidade de quitação antecipada."
    );
  }
  if (remainingSalary < grossSalary * 0.5) {
    recommendations.push(
      "Restará menos de 50% do salário livre. Planeje gastos essenciais cuidadosamente."
    );
  }

  // Compare with other loan types
  const personalLoanRate = interestRate * 2.5; // Personal loans are typically much higher
  const personalLoanPayment =
    (loanAmount * (personalLoanRate / 100) * Math.pow(1 + personalLoanRate / 100, termMonths)) /
    (Math.pow(1 + personalLoanRate / 100, termMonths) - 1);
  const personalLoanTotal = personalLoanPayment * termMonths;

  const creditCardRate = interestRate * 4; // Credit cards are even higher
  const creditCardPayment =
    (loanAmount * (creditCardRate / 100) * Math.pow(1 + creditCardRate / 100, termMonths)) /
    (Math.pow(1 + creditCardRate / 100, termMonths) - 1);
  const creditCardTotal = creditCardPayment * termMonths;

  // Institution analysis
  const institutionRates = {
    bank: { min: 1.5, max: 2.5, average: 2.0 },
    correspondent: { min: 1.8, max: 3.2, average: 2.5 },
    fintech: { min: 1.6, max: 2.8, average: 2.2 },
  };

  const institutionAdvantages = {
    bank: [
      "Maior segurança e tradição",
      "Relacionamento bancário existente",
      "Atendimento presencial",
    ],
    correspondent: ["Processo mais rápido", "Menor burocracia", "Atendimento personalizado"],
    fintech: ["Processo 100% digital", "Aprovação mais ágil", "Interface moderna e intuitiva"],
  };

  const institutionConsiderations = {
    bank: ["Processo pode ser mais demorado", "Mais burocracia documental"],
    correspondent: ["Verifique a reputação no mercado", "Leia o contrato com atenção"],
    fintech: ["Empresa mais nova no mercado", "Menos histórico de atendimento"],
  };

  // Age impact analysis
  let ageImpact = undefined;
  if (age) {
    const ageAtEnd = age + Math.ceil(termMonths / 12);
    const maxAge = employeeType === "clt" ? 70 : 80; // Different limits for different types
    const maxTermAvailable = Math.max(0, (maxAge - age) * 12);
    const isViable = ageAtEnd <= maxAge;

    const ageRecommendations: string[] = [];
    if (!isViable) {
      ageRecommendations.push(`Prazo excede limite de idade (${maxAge} anos). Reduza o prazo.`);
    }
    if (ageAtEnd > maxAge - 5) {
      ageRecommendations.push(
        "Considere um prazo menor para maior tranquilidade na aposentadoria."
      );
    }

    ageImpact = {
      maxTermAvailable: Math.round(maxTermAvailable),
      ageAtEnd,
      isViable,
      recommendations: ageRecommendations,
    };
  }

  // Calculate effective annual rate
  const effectiveAnnualRate = (Math.pow(1 + monthlyRate, 12) - 1) * 100;

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    effectiveAnnualRate: Math.round(effectiveAnnualRate * 100) / 100,
    monthlyPayments,
    marginAnalysis: {
      availableMargin: Math.round(availableMargin * 100) / 100,
      usedMargin: Math.round(usedMargin * 100) / 100,
      remainingMargin: Math.round(remainingMargin * 100) / 100,
      marginPercent: Math.round(marginPercent * 100) / 100,
      maxLoanAmount: Math.round(maxLoanAmount * 100) / 100,
      isWithinLimits,
    },
    affordabilityAnalysis: {
      salaryCommitment: Math.round(salaryCommitment * 100) / 100,
      remainingSalary: Math.round(remainingSalary * 100) / 100,
      isAffordable,
      riskLevel,
      recommendations,
    },
    comparison: {
      personalLoan: {
        monthlyPayment: Math.round(personalLoanPayment * 100) / 100,
        totalAmount: Math.round(personalLoanTotal * 100) / 100,
        savings: Math.round((personalLoanTotal - totalAmount) * 100) / 100,
        percentageSavings:
          Math.round(((personalLoanTotal - totalAmount) / personalLoanTotal) * 10000) / 100,
      },
      creditCard: {
        monthlyPayment: Math.round(creditCardPayment * 100) / 100,
        totalAmount: Math.round(creditCardTotal * 100) / 100,
        savings: Math.round((creditCardTotal - totalAmount) * 100) / 100,
        percentageSavings:
          Math.round(((creditCardTotal - totalAmount) / creditCardTotal) * 10000) / 100,
      },
    },
    institutionAnalysis: {
      typicalRates: institutionRates[institutionType],
      advantages: institutionAdvantages[institutionType],
      considerations: institutionConsiderations[institutionType],
    },
    ageImpact,
  };
}

export interface RuleOfThreeParams {
  a: number; // First value
  b: number; // Second value
  c: number; // Third value
  x?: number; // Fourth value (when provided, for verification)
  mode: "simple_direct" | "simple_inverse" | "compound";
  proportionType?: "direct" | "inverse";
  units?: {
    a: string;
    b: string;
    c: string;
    x: string;
  };
  context?: string; // Description of the problem
}

export interface RuleOfThreeResult {
  x: number; // The calculated unknown value
  steps: Array<{
    step: number;
    description: string;
    formula: string;
    calculation: string;
    result: string;
  }>;
  proportionType: "direct" | "inverse";
  verification: {
    isCorrect: boolean;
    leftSide: number;
    rightSide: number;
    difference: number;
  };
  interpretation: string;
  examples: Array<{
    title: string;
    description: string;
    formula: string;
  }>;
  unitAnalysis?: {
    inputUnits: string;
    outputUnits: string;
    unitsMatch: boolean;
    recommendation: string;
  };
}

export function calculateRuleOfThree(params: RuleOfThreeParams): RuleOfThreeResult {
  const { a, b, c, x, mode, proportionType = "direct", units, context } = params;

  let calculatedX: number;
  let detectedProportionType: "direct" | "inverse" = proportionType;
  const steps: RuleOfThreeResult["steps"] = [];
  let examples: RuleOfThreeResult["examples"] = [];

  // Step 1: Set up the proportion
  steps.push({
    step: 1,
    description: "Configurar a proporção",
    formula: `${a} está para ${b} assim como ${c} está para x`,
    calculation: `${a} : ${b} :: ${c} : x`,
    result: "Proporção estabelecida",
  });

  if (mode === "simple_direct" || (mode === "compound" && proportionType === "direct")) {
    // Direct proportion: a/b = c/x  =>  x = (b * c) / a
    calculatedX = (b * c) / a;

    steps.push({
      step: 2,
      description: "Aplicar propriedade fundamental das proporções",
      formula: "a × x = b × c",
      calculation: `${a} × x = ${b} × ${c}`,
      result: `${a} × x = ${b * c}`,
    });

    steps.push({
      step: 3,
      description: "Isolar x dividindo ambos os lados por a",
      formula: "x = (b × c) / a",
      calculation: `x = (${b} × ${c}) / ${a}`,
      result: `x = ${calculatedX.toFixed(4)}`,
    });

    examples = [
      {
        title: "Velocidade e Distância",
        description: "Se um carro percorre 100 km em 2 horas, quantos km percorrerá em 3 horas?",
        formula: "100 : 2 :: x : 3  →  x = (2 × 3) × 100 / 2 = 150 km",
      },
      {
        title: "Receita Culinária",
        description:
          "Se 2 xícaras de farinha servem para 4 pessoas, quantas xícaras para 6 pessoas?",
        formula: "2 : 4 :: x : 6  →  x = (2 × 6) / 4 = 3 xícaras",
      },
      {
        title: "Trabalho e Tempo",
        description:
          "Se 5 operários fazem um serviço em 8 dias, quantos operários para fazer em 4 dias?",
        formula: "5 : 8 :: x : 4  →  x = (5 × 8) / 4 = 10 operários",
      },
    ];
  } else if (mode === "simple_inverse" || (mode === "compound" && proportionType === "inverse")) {
    // Inverse proportion: a × b = c × x  =>  x = (a × b) / c
    calculatedX = (a * b) / c;
    detectedProportionType = "inverse";

    steps.push({
      step: 2,
      description: "Aplicar propriedade da proporção inversa",
      formula: "a × b = c × x",
      calculation: `${a} × ${b} = ${c} × x`,
      result: `${a * b} = ${c} × x`,
    });

    steps.push({
      step: 3,
      description: "Isolar x dividindo ambos os lados por c",
      formula: "x = (a × b) / c",
      calculation: `x = (${a} × ${b}) / ${c}`,
      result: `x = ${calculatedX.toFixed(4)}`,
    });

    examples = [
      {
        title: "Velocidade e Tempo",
        description: "Se um carro a 60 km/h faz um trajeto em 4 horas, em quanto tempo a 80 km/h?",
        formula: "60 × 4 = 80 × x  →  x = (60 × 4) / 80 = 3 horas",
      },
      {
        title: "Operários e Tempo",
        description: "Se 6 operários fazem um trabalho em 12 dias, quantos dias para 9 operários?",
        formula: "6 × 12 = 9 × x  →  x = (6 × 12) / 9 = 8 dias",
      },
      {
        title: "Consumo e Duração",
        description:
          "Se 8 pessoas consomem mantimentos em 15 dias, para quantos dias para 12 pessoas?",
        formula: "8 × 15 = 12 × x  →  x = (8 × 15) / 12 = 10 dias",
      },
    ];
  }

  // Step 4: Verification
  let verification: RuleOfThreeResult["verification"];
  if (detectedProportionType === "direct") {
    const leftSide = a / b;
    const rightSide = c / calculatedX;
    verification = {
      isCorrect: Math.abs(leftSide - rightSide) < 0.0001,
      leftSide,
      rightSide,
      difference: Math.abs(leftSide - rightSide),
    };
  } else {
    const leftSide = a * b;
    const rightSide = c * calculatedX;
    verification = {
      isCorrect: Math.abs(leftSide - rightSide) < 0.0001,
      leftSide,
      rightSide,
      difference: Math.abs(leftSide - rightSide),
    };
  }

  steps.push({
    step: 4,
    description: "Verificar o resultado",
    formula:
      detectedProportionType === "direct"
        ? `${a}/${b} = ${c}/${calculatedX.toFixed(4)}`
        : `${a} × ${b} = ${c} × ${calculatedX.toFixed(4)}`,
    calculation:
      detectedProportionType === "direct"
        ? `${verification.leftSide.toFixed(4)} = ${verification.rightSide.toFixed(4)}`
        : `${verification.leftSide.toFixed(2)} = ${verification.rightSide.toFixed(2)}`,
    result: verification.isCorrect ? "✓ Resultado correto" : "⚠ Verificar cálculos",
  });

  // Generate interpretation
  let interpretation = "";
  if (context) {
    interpretation = `No contexto "${context}", o valor procurado é ${calculatedX.toFixed(2)}`;
    if (units?.x) {
      interpretation += ` ${units.x}`;
    }
  } else {
    interpretation = `O valor desconhecido (x) é ${calculatedX.toFixed(2)}`;
    if (units?.x) {
      interpretation += ` ${units.x}`;
    }
  }

  // Unit analysis
  let unitAnalysis: RuleOfThreeResult["unitAnalysis"];
  if (units) {
    const inputUnits = `${units.a}, ${units.b}, ${units.c}`;
    const outputUnits = units.x;

    // Simple heuristic for unit compatibility
    const unitsMatch =
      units.b === units.x ||
      (units.a === units.c && detectedProportionType === "direct") ||
      (units.a === units.x && detectedProportionType === "inverse");

    let recommendation = "";
    if (!unitsMatch) {
      recommendation =
        "Verifique se as unidades estão compatíveis. Em proporções diretas, unidades da mesma 'família' devem estar na mesma posição.";
    } else {
      recommendation = "As unidades estão adequadamente posicionadas para este tipo de proporção.";
    }

    unitAnalysis = {
      inputUnits,
      outputUnits,
      unitsMatch,
      recommendation,
    };
  }

  return {
    x: Math.round(calculatedX * 10000) / 10000, // Round to 4 decimal places
    steps,
    proportionType: detectedProportionType,
    verification,
    interpretation,
    examples,
    unitAnalysis,
  };
}

export function detectProportionType(
  a: number,
  b: number,
  c: number,
  x: number
): "direct" | "inverse" {
  // Calculate ratios for direct proportion
  const directRatio1 = a / b;
  const directRatio2 = c / x;
  const directDifference = Math.abs(directRatio1 - directRatio2);

  // Calculate products for inverse proportion
  const inverseProduct1 = a * b;
  const inverseProduct2 = c * x;
  const inverseDifference = Math.abs(inverseProduct1 - inverseProduct2);

  // Return the type with smaller difference (better fit)
  return directDifference < inverseDifference ? "direct" : "inverse";
}

export function generateRuleOfThreeExamples(type: "direct" | "inverse" = "direct"): Array<{
  problem: string;
  setup: string;
  solution: string;
  context: string;
}> {
  if (type === "direct") {
    return [
      {
        problem: "Se 3 canetas custam R$ 12, quanto custam 5 canetas?",
        setup: "3 canetas : R$ 12 :: 5 canetas : x",
        solution: "x = (12 × 5) / 3 = R$ 20",
        context: "Compras e preços proporcionais",
      },
      {
        problem: "Um carro consome 8 litros para percorrer 100 km. Quantos litros para 250 km?",
        setup: "8 litros : 100 km :: x litros : 250 km",
        solution: "x = (8 × 250) / 100 = 20 litros",
        context: "Consumo de combustível",
      },
      {
        problem: "Se 4 metros de tecido custam R$ 36, quanto custam 7 metros?",
        setup: "4 metros : R$ 36 :: 7 metros : x",
        solution: "x = (36 × 7) / 4 = R$ 63",
        context: "Compra de materiais",
      },
    ];
  } else {
    return [
      {
        problem:
          "Se 6 operários fazem um trabalho em 12 dias, em quantos dias 9 operários farão o mesmo trabalho?",
        setup: "6 operários × 12 dias = 9 operários × x dias",
        solution: "x = (6 × 12) / 9 = 8 dias",
        context: "Trabalho e produtividade",
      },
      {
        problem: "Um carro a 80 km/h faz um trajeto em 3 horas. Quanto tempo levará a 120 km/h?",
        setup: "80 km/h × 3 horas = 120 km/h × x horas",
        solution: "x = (80 × 3) / 120 = 2 horas",
        context: "Velocidade e tempo",
      },
      {
        problem:
          "Se 15 pessoas consomem mantimentos em 20 dias, para quantos dias durará para 25 pessoas?",
        setup: "15 pessoas × 20 dias = 25 pessoas × x dias",
        solution: "x = (15 × 20) / 25 = 12 dias",
        context: "Consumo e recursos",
      },
    ];
  }
}

export function calculateHydration(params: HydrationParams): HydrationResult {
  const {
    weight,
    age,
    gender,
    activityLevel,
    climate,
    altitude,
    pregnancy,
    breastfeeding,
    healthConditions,
    currentIntake,
    startTime,
    endTime,
  } = params;

  // Base water requirement - Updated based on current research
  // OMS recommendation: 35ml per kg of body weight as primary calculation
  let baseWater = weight * 35; // ml/day - Primary method

  // Safety minimum for very light individuals (below 60kg)
  let safetyMinimum = 0;
  if (weight < 60) {
    if (gender === "male") {
      safetyMinimum = age >= 19 ? 2200 : age >= 14 ? 2000 : age >= 9 ? 1800 : 1600; // ml/day
    } else {
      safetyMinimum = age >= 19 ? 2000 : age >= 14 ? 1800 : age >= 9 ? 1600 : 1400; // ml/day
    }
    baseWater = Math.max(baseWater, safetyMinimum);
  }
  // For normal weight individuals (60kg+), use weight-based calculation directly

  // Activity level adjustments
  const activityAdjustments = {
    sedentary: 0,
    light: baseWater * 0.12, // +12%
    moderate: baseWater * 0.16, // +16%
    intense: baseWater * 0.23, // +23%
    extreme: baseWater * 0.35, // +35%
  };
  const activityAdjustment = activityAdjustments[activityLevel];

  // Climate adjustments - Updated based on research showing up to 45ml/kg in hot climates
  const climateAdjustments = {
    cold: baseWater * -0.05, // -5%
    temperate: 0,
    hot: Math.max(baseWater * 0.2, weight * 40 - baseWater), // +20% or up to 40ml/kg
    very_hot: Math.max(baseWater * 0.29, weight * 45 - baseWater), // +29% or up to 45ml/kg
  };
  const climateAdjustment = climateAdjustments[climate];

  // Altitude adjustments (above 2500m)
  const altitudeAdjustments = {
    sea_level: 0,
    moderate: baseWater * 0.15, // +15%
    high: baseWater * 0.25, // +25%
  };
  const altitudeAdjustment = altitudeAdjustments[altitude];

  // Special conditions adjustments
  let specialConditionsAdjustment = 0;
  if (pregnancy) specialConditionsAdjustment += 300; // +300ml
  if (breastfeeding) specialConditionsAdjustment += 600; // +600ml

  // Health conditions adjustments
  if (healthConditions && healthConditions.length > 0) {
    if (healthConditions.includes("fever")) specialConditionsAdjustment += 500;
    if (healthConditions.includes("diarrhea")) specialConditionsAdjustment += 600;
    if (healthConditions.includes("vomiting")) specialConditionsAdjustment += 400;
    if (healthConditions.includes("kidney_stones")) specialConditionsAdjustment += 800;
    if (healthConditions.includes("diabetes")) specialConditionsAdjustment += 300;
  }

  // Calculate total daily water need
  const totalDaily = Math.round(
    baseWater +
      activityAdjustment +
      climateAdjustment +
      altitudeAdjustment +
      specialConditionsAdjustment
  );
  const totalDailyLiters = Math.round((totalDaily / 1000) * 10) / 10;
  const perHour = Math.round(totalDaily / 16); // Assuming 16 waking hours
  const perKg = Math.round(totalDaily / weight);
  const glassesPerDay = Math.ceil(totalDaily / 250);
  const bottlesPerDay = Math.ceil(totalDaily / 500);

  // Risk assessment
  let riskLevel: "low" | "moderate" | "high" = "low";
  if (currentIntake && currentIntake < totalDaily * 0.7) {
    riskLevel = "high";
  } else if (currentIntake && currentIntake < totalDaily * 0.85) {
    riskLevel = "moderate";
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (activityLevel === "intense" || activityLevel === "extreme") {
    recommendations.push("Beba 150-250ml de água a cada 15-20 minutos durante exercícios intensos");
  }
  if (climate === "hot" || climate === "very_hot") {
    recommendations.push("Aumente significativamente a ingestão de água em dias quentes");
  }
  if (age > 65) {
    recommendations.push(
      "Idosos têm menor sensação de sede - beba água regularmente mesmo sem sentir sede"
    );
  }
  if (pregnancy) {
    recommendations.push(
      "Grávidas necessitam de hidratação extra para suporte ao desenvolvimento fetal"
    );
  }
  if (breastfeeding) {
    recommendations.push(
      "Lactantes necessitam hidratação adicional para produção de leite materno"
    );
  }

  // Create dynamic hydration schedule based on start/end times
  const generateHydrationSchedule = (start: string, end: string, total: number) => {
    const startHour = parseInt(start.split(":")[0]);
    const startMin = parseInt(start.split(":")[1]);
    const endHour = parseInt(end.split(":")[0]);
    const endMin = parseInt(end.split(":")[1]);

    // Calculate total minutes awake
    let totalMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle crossing midnight

    const totalHours = totalMinutes / 60;
    const intervals = Math.max(6, Math.min(10, Math.round(totalHours / 2))); // 6-10 intervals
    const intervalMinutes = Math.round(totalMinutes / intervals);

    const schedule = [];
    const descriptions = [
      "Ao acordar - reidrata após jejum noturno",
      "Manhã - facilita digestão",
      "Meio da manhã - mantém energia",
      "Almoço - auxilia digestão",
      "Tarde - combate fadiga",
      "Final da tarde - prepara para exercícios",
      "Jantar - facilita digestão",
      "Final do dia - hidratação moderada",
      "Noite - última hidratação do dia",
      "Antes de dormir - quantidade mínima",
    ];

    // Priority distribution: adjust based on number of intervals
    let priorities = [0.18, 0.12, 0.1, 0.15, 0.12, 0.1, 0.13, 0.1];

    // If we have fewer intervals than priorities, take the most important ones
    if (intervals < priorities.length) {
      priorities = priorities.slice(0, intervals);
      // Normalize to sum to 1.0
      const sum = priorities.reduce((a, b) => a + b, 0);
      priorities = priorities.map((p) => p / sum);
    } else if (intervals > priorities.length) {
      // If more intervals, distribute remaining equally
      const remaining = 1.0 - priorities.reduce((a, b) => a + b, 0);
      const extraIntervals = intervals - priorities.length;
      const extraPortion = remaining / extraIntervals;
      for (let j = 0; j < extraIntervals; j++) {
        priorities.push(extraPortion);
      }
    }

    let distributedTotal = 0;

    for (let i = 0; i < intervals; i++) {
      const currentMinutes = startHour * 60 + startMin + i * intervalMinutes;
      const hour = Math.floor(currentMinutes / 60) % 24;
      const minute = currentMinutes % 60;

      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

      let amount;
      if (i === intervals - 1) {
        // Last interval gets whatever is left to ensure total matches
        amount = total - distributedTotal;
      } else {
        amount = Math.round(total * priorities[i]);
        distributedTotal += amount;
      }

      schedule.push({
        time: timeStr,
        amount: amount,
        description: descriptions[i] || `Intervalo ${i + 1} - mantenha hidratação`,
      });
    }

    return schedule;
  };

  const hydrationSchedule = generateHydrationSchedule(
    startTime || "06:00",
    endTime || "22:00",
    totalDaily
  );

  return {
    baseWater: Math.round(baseWater),
    activityAdjustment: Math.round(activityAdjustment),
    climateAdjustment: Math.round(climateAdjustment),
    altitudeAdjustment: Math.round(altitudeAdjustment),
    specialConditionsAdjustment: Math.round(specialConditionsAdjustment),
    totalDaily,
    totalDailyLiters,
    perHour,
    perKg,
    glassesPerDay,
    bottlesPerDay,
    recommendations,
    riskLevel,
    hydrationSchedule,
  };
}

// Quadratic Equation (Bhaskara) Calculator
export interface QuadraticEquationParams {
  a: number;
  b: number;
  c: number;
  precision?: number;
}

export interface QuadraticEquationRoot {
  value: number;
  formatted: string;
  isReal: boolean;
  isRational: boolean;
}

export interface QuadraticEquationResult {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  hasRealRoots: boolean;
  rootType: "two_real" | "one_real" | "complex";
  roots: {
    x1?: QuadraticEquationRoot;
    x2?: QuadraticEquationRoot;
    complex?: {
      real: number;
      imaginary: number;
      x1: string;
      x2: string;
    };
  };
  vertex: {
    x: number;
    y: number;
    formatted: string;
  };
  yIntercept: number;
  xIntercepts?: number[];
  parabola: {
    opensUpward: boolean;
    axis: number;
    focus: { x: number; y: number };
    directrix: number;
  };
  steps: Array<{
    step: number;
    title: string;
    formula: string;
    calculation: string;
    result: string;
  }>;
  interpretation: string;
  domainRange: {
    domain: string;
    range: string;
  };
  examples: Array<{
    title: string;
    description: string;
    equation: string;
  }>;
  factorization?: {
    standard: string;
    factored: string;
    canFactor: boolean;
  };
}

export function calculateQuadraticEquation(
  params: QuadraticEquationParams
): QuadraticEquationResult {
  const { a, b, c, precision = 4 } = params;

  // Validate input
  if (a === 0) {
    throw new Error("O coeficiente 'a' não pode ser zero para uma equação do 2º grau");
  }

  // Calculate discriminant (Δ = b² - 4ac)
  const discriminant = b * b - 4 * a * c;

  const formatNumber = (value: number): string => {
    if (Math.abs(value - Math.round(value)) < 0.0001) {
      return Math.round(value).toString();
    }
    return parseFloat(value.toFixed(precision)).toString();
  };

  const isRational = (value: number): boolean => {
    const tolerance = 0.0001;
    return Math.abs(value - Math.round(value)) < tolerance;
  };

  // Calculate vertex
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  // Calculate y-intercept
  const yIntercept = c;

  // Parabola properties
  const opensUpward = a > 0;
  const axis = vertexX;
  const focusX = vertexX;
  const focusY = vertexY + 1 / (4 * a);
  const directrix = vertexY - 1 / (4 * a);

  let rootType: "two_real" | "one_real" | "complex";
  let roots: QuadraticEquationResult["roots"] = {};
  let xIntercepts: number[] | undefined = undefined;
  let hasRealRoots = false;

  const steps: QuadraticEquationResult["steps"] = [
    {
      step: 1,
      title: "Identificar os coeficientes",
      formula: "ax² + bx + c = 0",
      calculation: `a = ${a}, b = ${b}, c = ${c}`,
      result: `Equação: ${a}x² ${b >= 0 ? "+" : ""}${b}x ${c >= 0 ? "+" : ""}${c} = 0`,
    },
    {
      step: 2,
      title: "Calcular o discriminante (Δ)",
      formula: "Δ = b² - 4ac",
      calculation: `Δ = ${b}² - 4(${a})(${c}) = ${b * b} - ${4 * a * c}`,
      result: `Δ = ${discriminant}`,
    },
  ];

  if (discriminant > 0) {
    // Two distinct real roots
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const x1 = (-b + sqrtDiscriminant) / (2 * a);
    const x2 = (-b - sqrtDiscriminant) / (2 * a);

    rootType = "two_real";
    hasRealRoots = true;
    xIntercepts = [x1, x2];

    roots.x1 = {
      value: x1,
      formatted: formatNumber(x1),
      isReal: true,
      isRational: isRational(x1),
    };

    roots.x2 = {
      value: x2,
      formatted: formatNumber(x2),
      isReal: true,
      isRational: isRational(x2),
    };

    steps.push(
      {
        step: 3,
        title: "Aplicar a fórmula de Bhaskara",
        formula: "x = (-b ± √Δ) / (2a)",
        calculation: `x = (-${b} ± √${discriminant}) / (2 × ${a})`,
        result: `x = (-${b} ± ${formatNumber(sqrtDiscriminant)}) / ${2 * a}`,
      },
      {
        step: 4,
        title: "Calcular as duas raízes",
        formula: "x₁ = (-b + √Δ) / (2a) e x₂ = (-b - √Δ) / (2a)",
        calculation: `x₁ = (-${b} + ${formatNumber(sqrtDiscriminant)}) / ${2 * a} = ${formatNumber(x1)}\nx₂ = (-${b} - ${formatNumber(sqrtDiscriminant)}) / ${2 * a} = ${formatNumber(x2)}`,
        result: `x₁ = ${formatNumber(x1)} e x₂ = ${formatNumber(x2)}`,
      }
    );
  } else if (discriminant === 0) {
    // One real root (repeated)
    const x1 = -b / (2 * a);

    rootType = "one_real";
    hasRealRoots = true;
    xIntercepts = [x1];

    roots.x1 = {
      value: x1,
      formatted: formatNumber(x1),
      isReal: true,
      isRational: isRational(x1),
    };

    steps.push(
      {
        step: 3,
        title: "Aplicar a fórmula de Bhaskara",
        formula: "x = (-b ± √Δ) / (2a)",
        calculation: `x = (-${b} ± √0) / (2 × ${a}) = (-${b}) / ${2 * a}`,
        result: `x = ${formatNumber(x1)}`,
      },
      {
        step: 4,
        title: "Raiz única (dupla)",
        formula: "x₁ = x₂ = (-b) / (2a)",
        calculation: `Como Δ = 0, temos apenas uma raiz real`,
        result: `x₁ = x₂ = ${formatNumber(x1)}`,
      }
    );
  } else {
    // Complex roots
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);

    rootType = "complex";
    hasRealRoots = false;

    roots.complex = {
      real: realPart,
      imaginary: imaginaryPart,
      x1: `${formatNumber(realPart)} + ${formatNumber(imaginaryPart)}i`,
      x2: `${formatNumber(realPart)} - ${formatNumber(imaginaryPart)}i`,
    };

    steps.push(
      {
        step: 3,
        title: "Raízes complexas (imaginárias)",
        formula: "x = (-b ± √|Δ|i) / (2a)",
        calculation: `x = (-${b} ± √${Math.abs(discriminant)}i) / (2 × ${a})`,
        result: `Como Δ < 0, as raízes são complexas`,
      },
      {
        step: 4,
        title: "Calcular as raízes complexas",
        formula: "x = a + bi e x = a - bi",
        calculation: `x₁ = ${formatNumber(realPart)} + ${formatNumber(imaginaryPart)}i\nx₂ = ${formatNumber(realPart)} - ${formatNumber(imaginaryPart)}i`,
        result: `x₁ = ${roots.complex.x1} e x₂ = ${roots.complex.x2}`,
      }
    );
  }

  // Generate interpretation
  let interpretation: string;
  if (rootType === "two_real") {
    interpretation = `A equação possui duas raízes reais distintas: x₁ = ${roots.x1!.formatted} e x₂ = ${roots.x2!.formatted}`;
  } else if (rootType === "one_real") {
    interpretation = `A equação possui uma raiz real dupla: x = ${roots.x1!.formatted}`;
  } else {
    interpretation = `A equação possui duas raízes complexas: ${roots.complex!.x1} e ${roots.complex!.x2}`;
  }

  // Domain and Range
  const domainRange = {
    domain: "ℝ (todos os números reais)",
    range: opensUpward ? `[${formatNumber(vertexY)}, +∞)` : `(-∞, ${formatNumber(vertexY)}]`,
  };

  // Try to factor if possible
  let factorization: QuadraticEquationResult["factorization"] = undefined;
  if (hasRealRoots && rootType === "two_real" && roots.x1 && roots.x2) {
    const canFactor = roots.x1.isRational && roots.x2.isRational;
    if (canFactor) {
      const r1 = roots.x1.value;
      const r2 = roots.x2.value;

      // Convert roots to fractions if needed for cleaner display
      const getFactorForm = (root: number): string => {
        if (Math.abs(root - Math.round(root)) < 0.0001) {
          const intRoot = Math.round(root);
          return intRoot > 0 ? `(x - ${intRoot})` : `(x + ${Math.abs(intRoot)})`;
        }
        return root > 0 ? `(x - ${root})` : `(x + ${Math.abs(root)})`;
      };

      factorization = {
        standard: `${a}x² ${b >= 0 ? "+" : ""}${b}x ${c >= 0 ? "+" : ""}${c}`,
        factored:
          a === 1
            ? `${getFactorForm(r1)}${getFactorForm(r2)}`
            : `${a}${getFactorForm(r1)}${getFactorForm(r2)}`,
        canFactor,
      };
    } else {
      factorization = {
        standard: `${a}x² ${b >= 0 ? "+" : ""}${b}x ${c >= 0 ? "+" : ""}${c}`,
        factored: "Não pode ser fatorada com números racionais",
        canFactor: false,
      };
    }
  }

  // Generate examples based on discriminant
  const examples: QuadraticEquationResult["examples"] = [];

  if (discriminant > 0) {
    examples.push(
      {
        title: "Exemplo com duas raízes reais",
        description: "Equação com discriminante positivo",
        equation: "x² - 5x + 6 = 0 (raízes: 2 e 3)",
      },
      {
        title: "Aplicação: Movimento projétil",
        description: "Altura de um objeto em movimento",
        equation: "h = -5t² + 20t + 25",
      },
      {
        title: "Aplicação: Área máxima",
        description: "Otimização de área retangular",
        equation: "A = x(20 - x) → -x² + 20x",
      }
    );
  } else if (discriminant === 0) {
    examples.push(
      {
        title: "Exemplo com uma raiz real",
        description: "Equação com discriminante zero",
        equation: "x² - 4x + 4 = 0 (raiz dupla: 2)",
      },
      {
        title: "Aplicação: Ponto de tangência",
        description: "Parábola tangente ao eixo x",
        equation: "y = (x - 3)² (vértice no eixo x)",
      },
      {
        title: "Caso especial: Quadrado perfeito",
        description: "Trinômio quadrado perfeito",
        equation: "(x + 5)² = x² + 10x + 25",
      }
    );
  } else {
    examples.push(
      {
        title: "Exemplo com raízes complexas",
        description: "Equação com discriminante negativo",
        equation: "x² + 2x + 5 = 0 (sem raízes reais)",
      },
      {
        title: "Aplicação: Oscilações",
        description: "Movimento harmônico amortecido",
        equation: "x² + 4x + 13 = 0",
      },
      {
        title: "Geometria: Elipse",
        description: "Equação sem intersecção com eixo x",
        equation: "y = x² + x + 1 (sempre positiva)",
      }
    );
  }

  return {
    a,
    b,
    c,
    discriminant,
    hasRealRoots,
    rootType,
    roots,
    vertex: {
      x: vertexX,
      y: vertexY,
      formatted: `(${formatNumber(vertexX)}, ${formatNumber(vertexY)})`,
    },
    yIntercept,
    xIntercepts,
    parabola: {
      opensUpward,
      axis,
      focus: { x: focusX, y: focusY },
      directrix,
    },
    steps,
    interpretation,
    domainRange,
    examples,
    factorization,
  };
}

// Generate examples for different types of quadratic equations
export function generateQuadraticExamples(): Array<{
  type: string;
  title: string;
  equation: string;
  params: QuadraticEquationParams;
  description: string;
}> {
  return [
    {
      type: "two_real",
      title: "Duas raízes reais distintas",
      equation: "x² - 5x + 6 = 0",
      params: { a: 1, b: -5, c: 6 },
      description: "Exemplo clássico com duas soluções inteiras",
    },
    {
      type: "one_real",
      title: "Uma raiz real (dupla)",
      equation: "x² - 6x + 9 = 0",
      params: { a: 1, b: -6, c: 9 },
      description: "Quadrado perfeito com raiz dupla",
    },
    {
      type: "complex",
      title: "Raízes complexas",
      equation: "x² + 2x + 5 = 0",
      params: { a: 1, b: 2, c: 5 },
      description: "Sem raízes reais, apenas complexas",
    },
    {
      type: "application",
      title: "Aplicação: Movimento projétil",
      equation: "-5t² + 20t + 15 = 0",
      params: { a: -5, b: 20, c: 15 },
      description: "Encontrar quando o projétil toca o solo",
    },
    {
      type: "application",
      title: "Aplicação: Área máxima",
      equation: "-x² + 12x - 20 = 0",
      params: { a: -1, b: 12, c: -20 },
      description: "Dimensões para área máxima",
    },
    {
      type: "application",
      title: "Aplicação: Lucro máximo",
      equation: "-2x² + 100x - 800 = 0",
      params: { a: -2, b: 100, c: -800 },
      description: "Preço para lucro zero (ponto de equilíbrio)",
    },
  ];
}

// MMC and MDC Calculator
export interface MMCMDCParams {
  numbers: number[];
  precision?: number;
}

export interface MMCMDCStep {
  step: number;
  title: string;
  description: string;
  calculation: string;
  result: string;
  method: string;
}

export interface PrimeFactorization {
  number: number;
  factors: Array<{ prime: number; power: number }>;
  representation: string;
  isPrime: boolean;
}

export interface MMCMDCResult {
  numbers: number[];
  mmc: number;
  mdc: number;
  primeFactorizations: PrimeFactorization[];
  mmcSteps: MMCMDCStep[];
  mdcSteps: MMCMDCStep[];
  mmcMethod: "factorization" | "division" | "euclidean";
  mdcMethod: "factorization" | "division" | "euclidean";
  mmcInterpretation: string;
  mdcInterpretation: string;
  applications: {
    mmc: Array<{ title: string; description: string; example: string }>;
    mdc: Array<{ title: string; description: string; example: string }>;
  };
  verification: {
    mmcValid: boolean;
    mdcValid: boolean;
    mmcCheck: string;
    mdcCheck: string;
  };
  properties: {
    mmcTimesGcd: number;
    productOfNumbers: number;
    relationshipValid: boolean;
    coprimeNumbers: boolean;
  };
}

// Helper function to check if a number is prime
function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// Helper function to get prime factors
function getPrimeFactors(n: number): Array<{ prime: number; power: number }> {
  const factors: Array<{ prime: number; power: number }> = [];
  let num = n;

  // Handle factor 2
  if (num % 2 === 0) {
    let power = 0;
    while (num % 2 === 0) {
      power++;
      num /= 2;
    }
    factors.push({ prime: 2, power });
  }

  // Handle odd factors
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) {
      let power = 0;
      while (num % i === 0) {
        power++;
        num /= i;
      }
      factors.push({ prime: i, power });
    }
  }

  // If num is still greater than 1, it's a prime
  if (num > 1) {
    factors.push({ prime: num, power: 1 });
  }

  return factors;
}

// Helper function to format prime factorization
function formatPrimeFactorization(factors: Array<{ prime: number; power: number }>): string {
  if (factors.length === 0) return "1";

  return factors
    .map((f) => (f.power === 1 ? f.prime.toString() : `${f.prime}^${f.power}`))
    .join(" × ");
}

// Calculate GCD using Euclidean algorithm
function calculateGCD(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Calculate GCD for multiple numbers
function calculateGCDMultiple(numbers: number[]): number {
  return numbers.reduce((gcd, num) => calculateGCD(gcd, num));
}

// Calculate LCM using the formula: LCM(a,b) = (a * b) / GCD(a,b)
function calculateLCM(a: number, b: number): number {
  return Math.abs(a * b) / calculateGCD(a, b);
}

// Calculate LCM for multiple numbers
function calculateLCMMultiple(numbers: number[]): number {
  return numbers.reduce((lcm, num) => calculateLCM(lcm, num));
}

export function calculateMMCMDC(params: MMCMDCParams): MMCMDCResult {
  const { numbers, precision = 0 } = params;

  // Validate input
  if (numbers.length < 2) {
    throw new Error("Pelo menos dois números são necessários para calcular MMC e MDC");
  }

  if (numbers.some((n) => n <= 0 || !Number.isInteger(n))) {
    throw new Error("Todos os números devem ser inteiros positivos");
  }

  // Sort numbers for consistent display
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  // Calculate MMC and MDC
  const mmc = calculateLCMMultiple(sortedNumbers);
  const mdc = calculateGCDMultiple(sortedNumbers);

  // Get prime factorizations
  const primeFactorizations: PrimeFactorization[] = sortedNumbers.map((num) => {
    const factors = getPrimeFactors(num);
    return {
      number: num,
      factors,
      representation: formatPrimeFactorization(factors),
      isPrime: isPrime(num),
    };
  });

  // Generate MMC steps using prime factorization method
  const mmcSteps: MMCMDCStep[] = [
    {
      step: 1,
      title: "Decomposição em fatores primos",
      description: "Decompomos cada número em seus fatores primos",
      calculation: primeFactorizations
        .map((pf) => `${pf.number} = ${pf.representation}`)
        .join("\n"),
      result: "Fatores primos identificados",
      method: "factorization",
    },
    {
      step: 2,
      title: "Identificar fatores primos únicos",
      description: "Listamos todos os fatores primos que aparecem nas decomposições",
      calculation:
        "Fatores únicos: " +
        Array.from(new Set(primeFactorizations.flatMap((pf) => pf.factors.map((f) => f.prime))))
          .sort((a, b) => a - b)
          .join(", "),
      result: "Fatores primos únicos identificados",
      method: "factorization",
    },
    {
      step: 3,
      title: "Tomar maior expoente de cada fator",
      description:
        "Para o MMC, tomamos cada fator primo elevado ao seu maior expoente entre todos os números",
      calculation: generateMMCCalculation(primeFactorizations),
      result: `MMC = ${formatNumber(mmc)}`,
      method: "factorization",
    },
  ];

  // Generate MDC steps using prime factorization method
  const mdcSteps: MMCMDCStep[] = [
    {
      step: 1,
      title: "Decomposição em fatores primos",
      description: "Decompomos cada número em seus fatores primos",
      calculation: primeFactorizations
        .map((pf) => `${pf.number} = ${pf.representation}`)
        .join("\n"),
      result: "Fatores primos identificados",
      method: "factorization",
    },
    {
      step: 2,
      title: "Identificar fatores comuns",
      description: "Identificamos os fatores primos que aparecem em TODOS os números",
      calculation: generateMDCCalculation(primeFactorizations),
      result: "Fatores comuns identificados",
      method: "factorization",
    },
    {
      step: 3,
      title: "Tomar menor expoente de cada fator comum",
      description:
        "Para o MDC, tomamos cada fator comum elevado ao seu menor expoente entre todos os números",
      calculation: generateMDCFinalCalculation(primeFactorizations),
      result: `MDC = ${formatNumber(mdc)}`,
      method: "factorization",
    },
  ];

  // Generate applications
  const applications = {
    mmc: [
      {
        title: "Sincronização de eventos",
        description: "Encontrar quando eventos periódicos ocorrem simultaneamente",
        example: `Se temos eventos a cada ${sortedNumbers[0]} e ${sortedNumbers[1]} dias, eles coincidem a cada ${mmc} dias`,
      },
      {
        title: "Frações com denominadores diferentes",
        description: "Somar ou subtrair frações convertendo ao mesmo denominador",
        example: `Para somar 1/${sortedNumbers[0]} + 1/${sortedNumbers[1]}, usamos denominador comum ${mmc}`,
      },
      {
        title: "Problemas de produção",
        description: "Coordenar processos com tempos de ciclo diferentes",
        example: `Máquinas com ciclos de ${sortedNumbers[0]} e ${sortedNumbers[1]} minutos sincronizam a cada ${mmc} minutos`,
      },
    ],
    mdc: [
      {
        title: "Divisão em grupos iguais",
        description: "Dividir quantidades em grupos do maior tamanho possível",
        example: `${sortedNumbers[0]} e ${sortedNumbers[1]} objetos podem ser divididos em grupos de ${mdc}`,
      },
      {
        title: "Simplificação de frações",
        description: "Reduzir frações ao menor termo possível",
        example: `A fração ${sortedNumbers[0]}/${sortedNumbers[1]} simplifica dividindo por ${mdc}`,
      },
      {
        title: "Ladrilhamento e mosaicos",
        description: "Encontrar o maior tamanho de azulejo que cabe perfeitamente",
        example: `Parede ${sortedNumbers[0]}×${sortedNumbers[1]} usa azulejos de ${mdc}×${mdc}`,
      },
    ],
  };

  // Verification
  const verification = {
    mmcValid: sortedNumbers.every((num) => mmc % num === 0),
    mdcValid: sortedNumbers.every((num) => num % mdc === 0),
    mmcCheck: `Verificação: ${sortedNumbers.map((n) => `${mmc} ÷ ${n} = ${mmc / n}`).join(", ")}`,
    mdcCheck: `Verificação: ${sortedNumbers.map((n) => `${n} ÷ ${mdc} = ${n / mdc}`).join(", ")}`,
  };

  // Properties
  const productOfNumbers = sortedNumbers.length === 2 ? sortedNumbers[0] * sortedNumbers[1] : 0;
  const mmcTimesGcd = mmc * mdc;
  const relationshipValid = sortedNumbers.length === 2 ? mmcTimesGcd === productOfNumbers : false;
  const coprimeNumbers = mdc === 1;

  const properties = {
    mmcTimesGcd,
    productOfNumbers,
    relationshipValid,
    coprimeNumbers,
  };

  // Generate interpretations
  const mmcInterpretation =
    `O MMC de ${sortedNumbers.join(", ")} é ${mmc}. ` +
    `Este é o menor número positivo que é múltiplo de todos os números dados.`;

  const mdcInterpretation =
    `O MDC de ${sortedNumbers.join(", ")} é ${mdc}. ` +
    `Este é o maior número que divide todos os números dados.` +
    (coprimeNumbers ? " Os números são coprimos (primos entre si)." : "");

  function formatNumber(value: number): string {
    return value.toString();
  }

  return {
    numbers: sortedNumbers,
    mmc,
    mdc,
    primeFactorizations,
    mmcSteps,
    mdcSteps,
    mmcMethod: "factorization",
    mdcMethod: "factorization",
    mmcInterpretation,
    mdcInterpretation,
    applications,
    verification,
    properties,
  };
}

// Helper function to generate MMC calculation explanation
function generateMMCCalculation(factorizations: PrimeFactorization[]): string {
  const allPrimes = new Set<number>();
  factorizations.forEach((pf) => {
    pf.factors.forEach((f) => allPrimes.add(f.prime));
  });

  const mmcFactors: Array<{ prime: number; power: number }> = [];

  for (const prime of Array.from(allPrimes).sort((a, b) => a - b)) {
    const maxPower = Math.max(
      ...factorizations.map((pf) => {
        const factor = pf.factors.find((f) => f.prime === prime);
        return factor ? factor.power : 0;
      })
    );

    if (maxPower > 0) {
      mmcFactors.push({ prime, power: maxPower });
    }
  }

  const steps = mmcFactors.map((f) => {
    const powers = factorizations.map((pf) => {
      const factor = pf.factors.find((pf_f) => pf_f.prime === f.prime);
      return factor ? factor.power : 0;
    });

    return `${f.prime}: max(${powers.join(", ")}) = ${f.power}`;
  });

  return steps.join("\n") + "\n\nMMC = " + formatPrimeFactorization(mmcFactors);
}

// Helper function to generate MDC calculation explanation
function generateMDCCalculation(factorizations: PrimeFactorization[]): string {
  const firstFactors = factorizations[0].factors;
  const commonFactors = firstFactors.filter((f) =>
    factorizations.every((pf) => pf.factors.some((pf_f) => pf_f.prime === f.prime))
  );

  if (commonFactors.length === 0) {
    return "Não há fatores primos comuns a todos os números";
  }

  return "Fatores comuns: " + commonFactors.map((f) => f.prime).join(", ");
}

// Helper function to generate final MDC calculation
function generateMDCFinalCalculation(factorizations: PrimeFactorization[]): string {
  const firstFactors = factorizations[0].factors;
  const commonFactors = firstFactors.filter((f) =>
    factorizations.every((pf) => pf.factors.some((pf_f) => pf_f.prime === f.prime))
  );

  if (commonFactors.length === 0) {
    return "MDC = 1 (números são coprimos)";
  }

  const mdcFactors: Array<{ prime: number; power: number }> = [];

  for (const factor of commonFactors) {
    const minPower = Math.min(
      ...factorizations.map((pf) => {
        const f = pf.factors.find((pf_f) => pf_f.prime === factor.prime);
        return f ? f.power : 0;
      })
    );

    mdcFactors.push({ prime: factor.prime, power: minPower });
  }

  const steps = mdcFactors.map((f) => {
    const powers = factorizations.map((pf) => {
      const factor = pf.factors.find((pf_f) => pf_f.prime === f.prime);
      return factor ? factor.power : 0;
    });

    return `${f.prime}: min(${powers.join(", ")}) = ${f.power}`;
  });

  return steps.join("\n") + "\n\nMDC = " + formatPrimeFactorization(mdcFactors);
}

// Generate examples for different types of MMC/MDC problems
export function generateMMCMDCExamples(): Array<{
  type: string;
  title: string;
  numbers: number[];
  description: string;
  application: string;
}> {
  return [
    {
      type: "small_numbers",
      title: "Números pequenos",
      numbers: [6, 8],
      description: "Exemplo básico com números pequenos",
      application: "Ideal para aprender o conceito",
    },
    {
      type: "three_numbers",
      title: "Três números",
      numbers: [12, 18, 24],
      description: "MMC e MDC de três números",
      application: "Coordenar três processos diferentes",
    },
    {
      type: "coprime",
      title: "Números coprimos",
      numbers: [7, 11],
      description: "Números primos entre si (MDC = 1)",
      application: "Casos especiais onde MDC é 1",
    },
    {
      type: "one_prime",
      title: "Um número primo",
      numbers: [15, 17],
      description: "Um dos números é primo",
      application: "Análise com números primos",
    },
    {
      type: "multiples",
      title: "Múltiplos",
      numbers: [8, 24],
      description: "Um número é múltiplo do outro",
      application: "Casos onde um divide o outro",
    },
    {
      type: "large_numbers",
      title: "Números maiores",
      numbers: [48, 72, 96],
      description: "Exemplo com números maiores",
      application: "Problemas mais complexos do dia a dia",
    },
  ];
}

// Fractions Calculator
export interface Fraction {
  numerator: number;
  denominator: number;
  whole?: number; // For mixed numbers
  isImproper?: boolean;
  isProper?: boolean;
  isWhole?: boolean;
  decimal: number;
  percentage: string;
}

export interface FractionParams {
  fraction1: Fraction;
  fraction2: Fraction;
  operation: "add" | "subtract" | "multiply" | "divide";
}

export interface FractionStep {
  step: number;
  title: string;
  description: string;
  calculation: string;
  result: string;
  formula?: string;
}

export interface FractionResult {
  operation: "add" | "subtract" | "multiply" | "divide";
  fraction1: Fraction;
  fraction2: Fraction;
  result: Fraction;
  simplified: Fraction;
  steps: FractionStep[];
  commonDenominator?: number;
  lcm?: number;
  gcd?: number;
  interpretation: string;
  mixedResult?: {
    whole: number;
    fraction: Fraction;
    representation: string;
  };
  verification: {
    original: string;
    decimal: number;
    isCorrect: boolean;
  };
  properties: {
    resultType: "proper" | "improper" | "whole" | "mixed";
    canSimplify: boolean;
    isNegative: boolean;
    equivalentFractions: string[];
  };
}

// Helper function to calculate GCD
function gcdFraction(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Helper function to calculate LCM
function lcmFraction(a: number, b: number): number {
  return Math.abs(a * b) / gcdFraction(a, b);
}

// Helper function to simplify a fraction
export function simplifyFraction(numerator: number, denominator: number): Fraction {
  if (denominator === 0) {
    throw new Error("Denominador não pode ser zero");
  }

  const sign = numerator < 0 !== denominator < 0 ? -1 : 1;
  const absNum = Math.abs(numerator);
  const absDen = Math.abs(denominator);

  const commonFactor = gcdFraction(absNum, absDen);
  const simplifiedNum = (absNum / commonFactor) * sign;
  const simplifiedDen = absDen / commonFactor;

  const decimal = simplifiedNum / simplifiedDen;
  const percentage = (decimal * 100).toFixed(2) + "%";

  // Check if it's a whole number
  const isWhole = simplifiedDen === 1;

  // For mixed numbers (if improper)
  let whole: number | undefined;

  if (Math.abs(simplifiedNum) >= simplifiedDen && !isWhole) {
    whole = Math.floor(Math.abs(simplifiedNum) / simplifiedDen) * (simplifiedNum < 0 ? -1 : 1);
  }

  return {
    numerator: simplifiedNum,
    denominator: simplifiedDen,
    whole: whole,
    isImproper: Math.abs(simplifiedNum) >= simplifiedDen && !isWhole,
    isProper: Math.abs(simplifiedNum) < simplifiedDen,
    isWhole: isWhole,
    decimal: decimal,
    percentage: percentage,
  };
}

// Helper function to create fraction from mixed number
function createFraction(numerator: number, denominator: number, whole?: number): Fraction {
  let actualNumerator = numerator;

  if (whole !== undefined && whole !== 0) {
    actualNumerator = whole * denominator + numerator;
  }

  return simplifyFraction(actualNumerator, denominator);
}

// Helper function to format fraction as string
export function formatFraction(fraction: Fraction, showMixed = true): string {
  if (fraction.isWhole) {
    return fraction.numerator.toString();
  }

  if (showMixed && fraction.whole !== undefined && fraction.whole !== 0) {
    const mixedNum = Math.abs(fraction.numerator) % fraction.denominator;
    if (mixedNum === 0) {
      return fraction.whole.toString();
    }
    return `${fraction.whole} ${mixedNum}/${fraction.denominator}`;
  }

  return `${fraction.numerator}/${fraction.denominator}`;
}

export function calculateFractions(params: FractionParams): FractionResult {
  const { fraction1, fraction2, operation } = params;

  // Validate fractions
  if (fraction1.denominator === 0 || fraction2.denominator === 0) {
    throw new Error("Denominador não pode ser zero");
  }

  if (operation === "divide" && fraction2.numerator === 0) {
    throw new Error("Não é possível dividir por zero");
  }

  let result: Fraction;
  let steps: FractionStep[] = [];
  let commonDenominator: number | undefined;
  let lcmValue: number | undefined;
  let gcdValue: number | undefined;

  // Convert to improper fractions if mixed
  const f1 = createFraction(fraction1.numerator, fraction1.denominator, fraction1.whole);
  const f2 = createFraction(fraction2.numerator, fraction2.denominator, fraction2.whole);

  switch (operation) {
    case "add":
    case "subtract": {
      lcmValue = lcmFraction(f1.denominator, f2.denominator);
      commonDenominator = lcmValue;

      const num1 = f1.numerator * (lcmValue / f1.denominator);
      const num2 = f2.numerator * (lcmValue / f2.denominator);

      steps = [
        {
          step: 1,
          title: "Encontrar o denominador comum",
          description: "Calculamos o MMC dos denominadores para obter um denominador comum",
          calculation: `MMC(${f1.denominator}, ${f2.denominator}) = ${lcmValue}`,
          result: `Denominador comum: ${lcmValue}`,
          formula: "MMC dos denominadores",
        },
        {
          step: 2,
          title: "Converter para frações equivalentes",
          description: "Multiplicamos numerador e denominador para obter o denominador comum",
          calculation: `${f1.numerator}/${f1.denominator} = ${num1}/${lcmValue}\n${f2.numerator}/${f2.denominator} = ${num2}/${lcmValue}`,
          result: `Frações equivalentes: ${num1}/${lcmValue} e ${num2}/${lcmValue}`,
          formula: "Frações equivalentes",
        },
        {
          step: 3,
          title: operation === "add" ? "Somar os numeradores" : "Subtrair os numeradores",
          description: `${operation === "add" ? "Somamos" : "Subtraímos"} os numeradores mantendo o denominador comum`,
          calculation: `${num1} ${operation === "add" ? "+" : "-"} ${num2} = ${operation === "add" ? num1 + num2 : num1 - num2}`,
          result: `Resultado: ${operation === "add" ? num1 + num2 : num1 - num2}/${lcmValue}`,
          formula: `${operation === "add" ? "a/c + b/c = (a+b)/c" : "a/c - b/c = (a-b)/c"}`,
        },
      ];

      const resultNum = operation === "add" ? num1 + num2 : num1 - num2;
      result = simplifyFraction(resultNum, lcmValue);
      break;
    }

    case "multiply": {
      steps = [
        {
          step: 1,
          title: "Multiplicar numeradores",
          description: "Multiplicamos os numeradores entre si",
          calculation: `${f1.numerator} × ${f2.numerator} = ${f1.numerator * f2.numerator}`,
          result: `Numerador do resultado: ${f1.numerator * f2.numerator}`,
          formula: "Numerador = a × c",
        },
        {
          step: 2,
          title: "Multiplicar denominadores",
          description: "Multiplicamos os denominadores entre si",
          calculation: `${f1.denominator} × ${f2.denominator} = ${f1.denominator * f2.denominator}`,
          result: `Denominador do resultado: ${f1.denominator * f2.denominator}`,
          formula: "Denominador = b × d",
        },
        {
          step: 3,
          title: "Formar o resultado",
          description: "Combinamos numerador e denominador",
          calculation: `${f1.numerator * f2.numerator}/${f1.denominator * f2.denominator}`,
          result: `Resultado: ${f1.numerator * f2.numerator}/${f1.denominator * f2.denominator}`,
          formula: "(a/b) × (c/d) = (a×c)/(b×d)",
        },
      ];

      result = simplifyFraction(f1.numerator * f2.numerator, f1.denominator * f2.denominator);
      break;
    }

    case "divide": {
      const reciprocalNum = f2.denominator;
      const reciprocalDen = f2.numerator;

      steps = [
        {
          step: 1,
          title: "Inverter a segunda fração",
          description: "Para dividir, multiplicamos pela fração inversa (recíproca)",
          calculation: `${f2.numerator}/${f2.denominator} → ${reciprocalNum}/${reciprocalDen}`,
          result: `Fração inversa: ${reciprocalNum}/${reciprocalDen}`,
          formula: "Inverter: a/b → b/a",
        },
        {
          step: 2,
          title: "Multiplicar pela fração inversa",
          description: "Agora multiplicamos a primeira fração pela inversa da segunda",
          calculation: `${f1.numerator}/${f1.denominator} × ${reciprocalNum}/${reciprocalDen}`,
          result: `Multiplicação: ${f1.numerator * reciprocalNum}/${f1.denominator * reciprocalDen}`,
          formula: "(a/b) ÷ (c/d) = (a/b) × (d/c)",
        },
        {
          step: 3,
          title: "Calcular o resultado",
          description: "Multiplicamos numeradores e denominadores",
          calculation: `${f1.numerator} × ${reciprocalNum} = ${f1.numerator * reciprocalNum}\n${f1.denominator} × ${reciprocalDen} = ${f1.denominator * reciprocalDen}`,
          result: `Resultado: ${f1.numerator * reciprocalNum}/${f1.denominator * reciprocalDen}`,
          formula: "Resultado final",
        },
      ];

      result = simplifyFraction(f1.numerator * reciprocalNum, f1.denominator * reciprocalDen);
      break;
    }
  }

  // Simplify result
  const simplified = result;
  gcdValue = gcdFraction(Math.abs(result.numerator), result.denominator);

  // Add simplification step if needed
  if (gcdValue > 1) {
    steps.push({
      step: steps.length + 1,
      title: "Simplificar o resultado",
      description: "Dividimos numerador e denominador pelo MDC para simplificar",
      calculation: `MDC(${Math.abs(result.numerator)}, ${result.denominator}) = ${gcdValue}\n${result.numerator} ÷ ${gcdValue} = ${result.numerator / gcdValue}\n${result.denominator} ÷ ${gcdValue} = ${result.denominator / gcdValue}`,
      result: `Fração simplificada: ${formatFraction(simplified)}`,
      formula: "Simplificar dividindo pelo MDC",
    });
  }

  // Generate interpretation
  const operationNames = {
    add: "soma",
    subtract: "subtração",
    multiply: "multiplicação",
    divide: "divisão",
  };

  let interpretation = `A ${operationNames[operation]} de ${formatFraction(f1)} ${operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "×" : "÷"} ${formatFraction(f2)} é igual a ${formatFraction(simplified)}.`;

  if (simplified.isWhole) {
    interpretation += ` O resultado é um número inteiro.`;
  } else if (simplified.isImproper) {
    interpretation += ` O resultado é uma fração imprópria.`;
  } else {
    interpretation += ` O resultado é uma fração própria.`;
  }

  // Mixed number representation
  let mixedResult: FractionResult["mixedResult"] | undefined;
  if (simplified.isImproper && !simplified.isWhole) {
    const whole =
      Math.floor(Math.abs(simplified.numerator) / simplified.denominator) *
      (simplified.numerator < 0 ? -1 : 1);
    const remainderNum =
      (Math.abs(simplified.numerator) % simplified.denominator) *
      (simplified.numerator < 0 ? -1 : 1);

    mixedResult = {
      whole: whole,
      fraction: simplifyFraction(remainderNum, simplified.denominator),
      representation: `${whole} ${Math.abs(remainderNum)}/${simplified.denominator}`,
    };
  }

  // Generate equivalent fractions
  const equivalentFractions = [];
  for (let i = 2; i <= 5; i++) {
    if (simplified.numerator * i <= 100 && simplified.denominator * i <= 100) {
      equivalentFractions.push(`${simplified.numerator * i}/${simplified.denominator * i}`);
    }
  }

  return {
    operation,
    fraction1: f1,
    fraction2: f2,
    result: result,
    simplified: simplified,
    steps: steps,
    commonDenominator: commonDenominator,
    lcm: lcmValue,
    gcd: gcdValue,
    interpretation: interpretation,
    mixedResult: mixedResult,
    verification: {
      original: `${formatFraction(f1)} ${operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "×" : "÷"} ${formatFraction(f2)}`,
      decimal: simplified.decimal,
      isCorrect: !isNaN(simplified.decimal) && isFinite(simplified.decimal),
    },
    properties: {
      resultType: simplified.isWhole
        ? "whole"
        : simplified.isImproper
          ? "improper"
          : mixedResult
            ? "mixed"
            : "proper",
      canSimplify: gcdValue > 1,
      isNegative: simplified.numerator < 0,
      equivalentFractions: equivalentFractions,
    },
  };
}

// Helper function to parse fraction from string
export function parseFraction(input: string): Fraction | null {
  // Remove extra spaces but keep single spaces for mixed numbers
  input = input.trim();

  // Handle mixed numbers (e.g., "2 1/3" or "2_1/3")
  const mixedMatch = input.match(/^(-?\d+)[\s_]+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1]);
    const numerator = parseInt(mixedMatch[2]);
    const denominator = parseInt(mixedMatch[3]);
    return createFraction(numerator, denominator, whole);
  }

  // Handle simple fractions (e.g., "3/4")
  const fractionMatch = input.replace(/\s+/g, "").match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1]);
    const denominator = parseInt(fractionMatch[2]);
    return createFraction(numerator, denominator);
  }

  // Handle whole numbers (e.g., "5")
  const wholeMatch = input.replace(/\s+/g, "").match(/^-?\d+$/);
  if (wholeMatch) {
    const whole = parseInt(input.replace(/\s+/g, ""));
    return createFraction(0, 1, whole);
  }

  // Handle decimals (e.g., "0.75")
  const decimalMatch = input.replace(/\s+/g, "").match(/^-?\d*\.\d+$/);
  if (decimalMatch) {
    const decimal = parseFloat(input.replace(/\s+/g, ""));
    const denominator = Math.pow(10, input.replace(/\s+/g, "").split(".")[1].length);
    const numerator = decimal * denominator;
    return simplifyFraction(numerator, denominator);
  }

  return null;
}

// Generate examples for different types of fraction operations
export function generateFractionExamples(): Array<{
  type: string;
  title: string;
  operation: "add" | "subtract" | "multiply" | "divide";
  fraction1: string;
  fraction2: string;
  description: string;
  application: string;
}> {
  return [
    {
      type: "addition_basic",
      title: "Soma básica",
      operation: "add",
      fraction1: "1/4",
      fraction2: "1/3",
      description: "Soma de frações com denominadores diferentes",
      application: "Combinação de quantidades (receitas, medidas)",
    },
    {
      type: "subtraction_basic",
      title: "Subtração básica",
      operation: "subtract",
      fraction1: "3/4",
      fraction2: "1/2",
      description: "Subtração de frações simples",
      application: "Cálculo de diferenças e restos",
    },
    {
      type: "multiplication_basic",
      title: "Multiplicação básica",
      operation: "multiply",
      fraction1: "2/3",
      fraction2: "3/4",
      description: "Multiplicação direta de frações",
      application: "Cálculo de partes de partes",
    },
    {
      type: "division_basic",
      title: "Divisão básica",
      operation: "divide",
      fraction1: "3/4",
      fraction2: "1/2",
      description: "Divisão usando fração inversa",
      application: "Distribuição e partilha",
    },
    {
      type: "mixed_numbers",
      title: "Números mistos",
      operation: "add",
      fraction1: "2 1/3",
      fraction2: "1 1/4",
      description: "Operações com números mistos",
      application: "Medidas práticas (comprimento, tempo)",
    },
    {
      type: "improper_fractions",
      title: "Frações impróprias",
      operation: "multiply",
      fraction1: "5/3",
      fraction2: "4/5",
      description: "Operações com frações impróprias",
      application: "Cálculos técnicos e científicos",
    },
  ];
}

// Area and Perimeter Calculator
export interface AreaPerimeterParams {
  shape:
    | "square"
    | "rectangle"
    | "circle"
    | "triangle"
    | "parallelogram"
    | "trapezoid"
    | "rhombus"
    | "ellipse";
  dimensions: {
    side?: number;
    length?: number;
    width?: number;
    radius?: number;
    diameter?: number;
    base?: number;
    height?: number;
    side1?: number;
    side2?: number;
    side3?: number;
    base1?: number;
    base2?: number;
    semiMajorAxis?: number;
    semiMinorAxis?: number;
  };
  unit?: string;
}

export interface AreaPerimeterResult {
  shape: string;
  area: number;
  perimeter: number;
  unit: string;
  areaUnit: string;
  formulas: {
    area: string;
    perimeter: string;
  };
  calculations: {
    areaSteps: string[];
    perimeterSteps: string[];
  };
  properties: {
    shapeType: string;
    characteristics: string[];
    applications: string[];
  };
  measurements: {
    diagonal?: number;
    circumference?: number;
    apothem?: number;
  };
  relatedConcepts: Array<{
    concept: string;
    explanation: string;
    example: string;
  }>;
}

export function calculateAreaPerimeter(params: AreaPerimeterParams): AreaPerimeterResult {
  const { shape, dimensions, unit = "m" } = params;
  const areaUnit = `${unit}²`;
  let area = 0;
  let perimeter = 0;
  let areaSteps: string[] = [];
  let perimeterSteps: string[] = [];
  let formulas = { area: "", perimeter: "" };
  let measurements: AreaPerimeterResult["measurements"] = {};

  switch (shape) {
    case "square":
      {
        const side = dimensions.side!;
        area = side * side;
        perimeter = 4 * side;

        formulas.area = "A = lado²";
        formulas.perimeter = "P = 4 × lado";

        areaSteps = [`A = ${side}²`, `A = ${area} ${areaUnit}`];
        perimeterSteps = [`P = 4 × ${side}`, `P = ${perimeter} ${unit}`];

        measurements.diagonal = side * Math.sqrt(2);
      }
      break;

    case "rectangle":
      {
        const length = dimensions.length!;
        const width = dimensions.width!;
        area = length * width;
        perimeter = 2 * (length + width);

        formulas.area = "A = comprimento × largura";
        formulas.perimeter = "P = 2 × (comprimento + largura)";

        areaSteps = [`A = ${length} × ${width}`, `A = ${area} ${areaUnit}`];
        perimeterSteps = [
          `P = 2 × (${length} + ${width})`,
          `P = 2 × ${length + width}`,
          `P = ${perimeter} ${unit}`,
        ];

        measurements.diagonal = Math.sqrt(length * length + width * width);
      }
      break;

    case "circle":
      {
        const radius = dimensions.radius || (dimensions.diameter ? dimensions.diameter / 2 : 0);
        area = Math.PI * radius * radius;
        perimeter = 2 * Math.PI * radius;

        formulas.area = "A = π × raio²";
        formulas.perimeter = "P = 2 × π × raio";

        areaSteps = [
          `A = π × ${radius}²`,
          `A = π × ${radius * radius}`,
          `A = ${area.toFixed(2)} ${areaUnit}`,
        ];
        perimeterSteps = [
          `P = 2 × π × ${radius}`,
          `P = 2π × ${radius}`,
          `P = ${perimeter.toFixed(2)} ${unit}`,
        ];

        measurements.circumference = perimeter;
      }
      break;

    case "triangle":
      {
        const base = dimensions.base!;
        const height = dimensions.height!;
        const side1 = dimensions.side1 || base;
        const side2 = dimensions.side2 || base; // estimativa conservadora
        const side3 = dimensions.side3 || base; // estimativa conservadora

        area = (base * height) / 2;
        perimeter = side1 + side2 + side3;

        formulas.area = "A = (base × altura) ÷ 2";
        formulas.perimeter = "P = lado1 + lado2 + lado3";

        areaSteps = [
          `A = (${base} × ${height}) ÷ 2`,
          `A = ${base * height} ÷ 2`,
          `A = ${area} ${areaUnit}`,
        ];
        perimeterSteps = [
          `P = ${side1} + ${side2} + ${side3}`,
          `P = ${perimeter.toFixed(2)} ${unit}`,
        ];
      }
      break;

    case "parallelogram":
      {
        const base = dimensions.base!;
        const height = dimensions.height!;
        const side = dimensions.side1 || height; // estimativa conservadora

        area = base * height;
        perimeter = 2 * (base + side);

        formulas.area = "A = base × altura";
        formulas.perimeter = "P = 2 × (base + lado)";

        areaSteps = [`A = ${base} × ${height}`, `A = ${area} ${areaUnit}`];
        perimeterSteps = [
          `P = 2 × (${base} + ${side.toFixed(2)})`,
          `P = ${perimeter.toFixed(2)} ${unit}`,
        ];
      }
      break;

    case "trapezoid":
      {
        const base1 = dimensions.base1!;
        const base2 = dimensions.base2!;
        const height = dimensions.height!;
        const side1 = dimensions.side1 || height;
        const side2 = dimensions.side2 || height;

        area = ((base1 + base2) * height) / 2;
        perimeter = base1 + base2 + side1 + side2;

        formulas.area = "A = ((base1 + base2) × altura) ÷ 2";
        formulas.perimeter = "P = base1 + base2 + lado1 + lado2";

        areaSteps = [
          `A = ((${base1} + ${base2}) × ${height}) ÷ 2`,
          `A = (${base1 + base2} × ${height}) ÷ 2`,
          `A = ${(base1 + base2) * height} ÷ 2`,
          `A = ${area} ${areaUnit}`,
        ];
        perimeterSteps = [
          `P = ${base1} + ${base2} + ${side1} + ${side2}`,
          `P = ${perimeter} ${unit}`,
        ];
      }
      break;

    case "rhombus":
      {
        const side = dimensions.side!;
        const height = dimensions.height || side * 0.8; // estimativa conservadora (ângulo ~53°)

        area = side * height;
        perimeter = 4 * side;

        formulas.area = "A = lado × altura";
        formulas.perimeter = "P = 4 × lado";

        areaSteps = [`A = ${side} × ${height.toFixed(2)}`, `A = ${area.toFixed(2)} ${areaUnit}`];
        perimeterSteps = [`P = 4 × ${side}`, `P = ${perimeter} ${unit}`];
      }
      break;

    case "ellipse":
      {
        const semiMajorAxis = dimensions.semiMajorAxis!;
        const semiMinorAxis = dimensions.semiMinorAxis!;

        area = Math.PI * semiMajorAxis * semiMinorAxis;
        // Ramanujan's approximation for ellipse perimeter
        const h = Math.pow((semiMajorAxis - semiMinorAxis) / (semiMajorAxis + semiMinorAxis), 2);
        perimeter =
          Math.PI * (semiMajorAxis + semiMinorAxis) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

        formulas.area = "A = π × semi-eixo maior × semi-eixo menor";
        formulas.perimeter = "P ≈ π × (a + b) × [1 + 3h/(10 + √(4 - 3h))]";

        areaSteps = [
          `A = π × ${semiMajorAxis} × ${semiMinorAxis}`,
          `A = ${area.toFixed(2)} ${areaUnit}`,
        ];
        perimeterSteps = [
          `h = ((${semiMajorAxis} - ${semiMinorAxis}) / (${semiMajorAxis} + ${semiMinorAxis}))²`,
          `h = ${h.toFixed(4)}`,
          `P ≈ π × (${semiMajorAxis} + ${semiMinorAxis}) × [fator de correção]`,
          `P ≈ ${perimeter.toFixed(2)} ${unit}`,
        ];
      }
      break;

    default:
      throw new Error(`Forma geométrica não suportada: ${shape}`);
  }

  // Properties and characteristics
  const properties = getShapeProperties(shape);

  // Related concepts
  const relatedConcepts = getRelatedConcepts(shape);

  return {
    shape: getShapeDisplayName(shape),
    area: Math.round(area * 100) / 100,
    perimeter: Math.round(perimeter * 100) / 100,
    unit,
    areaUnit,
    formulas,
    calculations: {
      areaSteps,
      perimeterSteps,
    },
    properties,
    measurements,
    relatedConcepts,
  };
}

function getShapeDisplayName(shape: string): string {
  const names: { [key: string]: string } = {
    square: "Quadrado",
    rectangle: "Retângulo",
    circle: "Círculo",
    triangle: "Triângulo",
    parallelogram: "Paralelogramo",
    trapezoid: "Trapézio",
    rhombus: "Losango",
    ellipse: "Elipse",
  };
  return names[shape] || shape;
}

function getShapeProperties(shape: string): AreaPerimeterResult["properties"] {
  const properties: { [key: string]: AreaPerimeterResult["properties"] } = {
    square: {
      shapeType: "Quadrilátero Regular",
      characteristics: [
        "Todos os lados são iguais",
        "Todos os ângulos são de 90°",
        "Diagonais são iguais e perpendiculares",
        "Tem 4 eixos de simetria",
      ],
      applications: [
        "Arquitetura e construção civil",
        "Design gráfico e logotipos",
        "Cálculo de área de pisos e azulejos",
        "Geometria básica e ensino fundamental",
      ],
    },
    rectangle: {
      shapeType: "Quadrilátero",
      characteristics: [
        "Lados opostos são iguais",
        "Todos os ângulos são de 90°",
        "Diagonais são iguais",
        "Tem 2 eixos de simetria",
      ],
      applications: [
        "Cálculo de área de cômodos",
        "Design de layouts e interfaces",
        "Engenharia e projetos técnicos",
        "Agricultura e medição de terrenos",
      ],
    },
    circle: {
      shapeType: "Figura Circular",
      characteristics: [
        "Todos os pontos equidistam do centro",
        "Perímetro é chamado de circunferência",
        "Tem infinitos eixos de simetria",
        "Relação constante entre circunferência e diâmetro (π)",
      ],
      applications: [
        "Engenharia mecânica (rodas, engrenagens)",
        "Arquitetura (cúpulas, arcos)",
        "Cálculo de área de jardins circulares",
        "Física (movimento circular)",
      ],
    },
    triangle: {
      shapeType: "Polígono de 3 lados",
      characteristics: [
        "Soma dos ângulos internos é 180°",
        "Base para muitos outros cálculos geométricos",
        "Forma mais estável estruturalmente",
        "Pode ser classificado por lados ou ângulos",
      ],
      applications: [
        "Estruturas de telhados",
        "Navegação e trigonometria",
        "Arte e design",
        "Cálculos de engenharia estrutural",
      ],
    },
    parallelogram: {
      shapeType: "Quadrilátero",
      characteristics: [
        "Lados opostos são paralelos e iguais",
        "Ângulos opostos são iguais",
        "Diagonais se cortam ao meio",
        "Tem simetria central",
      ],
      applications: [
        "Física (representação de vetores)",
        "Engenharia estrutural",
        "Design gráfico",
        "Matemática aplicada",
      ],
    },
    trapezoid: {
      shapeType: "Quadrilátero",
      characteristics: [
        "Possui um par de lados paralelos (bases)",
        "Bases têm comprimentos diferentes",
        "Altura é perpendicular às bases",
        "Forma comum em construções",
      ],
      applications: [
        "Cálculo de área de terrenos irregulares",
        "Engenharia hidráulica (canais)",
        "Arquitetura e construção",
        "Pontes e estruturas trapezoidais",
      ],
    },
    rhombus: {
      shapeType: "Quadrilátero Regular",
      characteristics: [
        "Todos os lados são iguais",
        "Lados opostos são paralelos",
        "Diagonais são perpendiculares",
        "Ângulos opostos são iguais",
      ],
      applications: [
        "Design de logotipos e símbolos",
        "Arquitetura decorativa",
        "Cristalografia",
        "Arte geométrica",
      ],
    },
    ellipse: {
      shapeType: "Curva Cônica",
      characteristics: [
        "Possui dois focos",
        "Soma das distâncias aos focos é constante",
        "Generalização do círculo",
        "Tem dois eixos de simetria",
      ],
      applications: [
        "Astronomia (órbitas planetárias)",
        "Engenharia óptica",
        "Arquitetura (cúpulas elípticas)",
        "Design de pistas de corrida",
      ],
    },
  };

  return (
    properties[shape] || {
      shapeType: "Forma Geométrica",
      characteristics: [],
      applications: [],
    }
  );
}

function getRelatedConcepts(shape: string): AreaPerimeterResult["relatedConcepts"] {
  const concepts: { [key: string]: AreaPerimeterResult["relatedConcepts"] } = {
    square: [
      {
        concept: "Área vs Perímetro",
        explanation: "Área mede superfície (m²), perímetro mede contorno (m)",
        example: "Quadrado 4x4: área = 16 m², perímetro = 16 m",
      },
      {
        concept: "Teorema de Pitágoras",
        explanation: "Diagonal do quadrado = lado × √2",
        example: "Se lado = 5m, diagonal = 5 × 1,414 = 7,07m",
      },
      {
        concept: "Escala e Proporção",
        explanation: "Se dobrar o lado, área fica 4× maior",
        example: "Lado 2m → 4m: área de 4m² → 16m²",
      },
    ],
    rectangle: [
      {
        concept: "Razão Áurea",
        explanation: "Retângulo áureo tem proporção 1:1,618",
        example: "Se largura = 10cm, comprimento ≈ 16,18cm",
      },
      {
        concept: "Otimização",
        explanation: "Para área fixa, quadrado tem menor perímetro",
        example: "Área 36m²: quadrado P=24m, retângulo 2×18m P=40m",
      },
      {
        concept: "Área Eficiente",
        explanation: "Maximizar área com perímetro limitado",
        example: "Com 20m de cerca, quadrado 5×5 = 25m² é máximo",
      },
    ],
    circle: [
      {
        concept: "Número Pi (π)",
        explanation: "Relação constante: circunferência ÷ diâmetro = π",
        example: "π ≈ 3,14159... é um número irracional",
      },
      {
        concept: "Máxima Eficiência",
        explanation: "Círculo tem maior área para dado perímetro",
        example: "Perímetro 10m: círculo ≈ 7,96m², quadrado = 6,25m²",
      },
      {
        concept: "Radianos",
        explanation: "Medida de ângulo: 360° = 2π radianos",
        example: "90° = π/2 radianos ≈ 1,57 rad",
      },
    ],
    triangle: [
      {
        concept: "Classificação por Lados",
        explanation: "Equilátero, isósceles, escaleno",
        example: "Equilátero: todos lados iguais, ângulos = 60°",
      },
      {
        concept: "Classificação por Ângulos",
        explanation: "Acutângulo, retângulo, obtusângulo",
        example: "Retângulo: tem um ângulo de 90°",
      },
      {
        concept: "Fórmula de Heron",
        explanation: "Calcula área usando apenas os lados",
        example: "A = √[s(s-a)(s-b)(s-c)], onde s = (a+b+c)/2",
      },
    ],
    parallelogram: [
      {
        concept: "Propriedade dos Vetores",
        explanation: "Regra do paralelogramo para soma de vetores",
        example: "Duas forças formam paralelogramo, resultante é diagonal",
      },
      {
        concept: "Transformações Geométricas",
        explanation: "Cisalhamento transforma retângulo em paralelogramo",
        example: "Área se mantém durante a transformação",
      },
      {
        concept: "Base e Altura",
        explanation: "Altura sempre perpendicular à base",
        example: "Base = 8cm, altura = 5cm → Área = 40cm²",
      },
    ],
    trapezoid: [
      {
        concept: "Média das Bases",
        explanation: "Área = (base1 + base2)/2 × altura",
        example: "Bases 6m e 10m, altura 4m → Área = 8 × 4 = 32m²",
      },
      {
        concept: "Trapézio Isósceles",
        explanation: "Lados não-paralelos são iguais",
        example: "Tem eixo de simetria perpendicular às bases",
      },
      {
        concept: "Aplicação Civil",
        explanation: "Comum em canais de irrigação e muros de arrimo",
        example: "Forma estável contra pressão lateral",
      },
    ],
    rhombus: [
      {
        concept: "Diagonais Perpendiculares",
        explanation: "Diagonais se cruzam em ângulo reto",
        example: "Área = (diagonal1 × diagonal2) ÷ 2",
      },
      {
        concept: "Propriedades Especiais",
        explanation: "É um paralelogramo com lados iguais",
        example: "Quadrado é um losango com ângulos retos",
      },
      {
        concept: "Simetrias",
        explanation: "Tem simetria central e axial",
        example: "2 eixos de simetria pelas diagonais",
      },
    ],
    ellipse: [
      {
        concept: "Excentricidade",
        explanation: 'Medida do "achatamento" da elipse',
        example: "e = 0 (círculo), 0 < e < 1 (elipse)",
      },
      {
        concept: "Focos",
        explanation: "Dois pontos especiais dentro da elipse",
        example: "Soma das distâncias de qualquer ponto aos focos é constante",
      },
      {
        concept: "Leis de Kepler",
        explanation: "Planetas orbitam o Sol em elipses",
        example: "Sol está em um dos focos da órbita terrestre",
      },
    ],
  };

  return concepts[shape] || [];
}

export function generateAreaPerimeterExamples(): Array<{
  shape: string;
  dimensions: any;
  description: string;
  context: string;
}> {
  return [
    {
      shape: "square",
      dimensions: { side: 6 },
      description: "Quadrado de 6 metros de lado",
      context: "Cálculo de área de uma sala quadrada",
    },
    {
      shape: "rectangle",
      dimensions: { length: 8, width: 5 },
      description: "Retângulo 8×5 metros",
      context: "Área de um cômodo retangular",
    },
    {
      shape: "circle",
      dimensions: { radius: 4 },
      description: "Círculo com raio de 4 metros",
      context: "Área de um jardim circular",
    },
    {
      shape: "triangle",
      dimensions: { base: 10, height: 6, side1: 10, side2: 8, side3: 8 },
      description: "Triângulo com base 10m e altura 6m",
      context: "Área de um terreno triangular",
    },
    {
      shape: "trapezoid",
      dimensions: { base1: 12, base2: 8, height: 5, side1: 6, side2: 6 },
      description: "Trapézio com bases 12m e 8m, altura 5m",
      context: "Área de um lote trapezoidal",
    },
  ];
}

// Volume Calculator
export interface VolumeParams {
  shape:
    | "cube"
    | "rectangular_prism"
    | "sphere"
    | "cylinder"
    | "cone"
    | "pyramid"
    | "triangular_prism"
    | "ellipsoid"
    | "frustum";
  dimensions: {
    side?: number;
    length?: number;
    width?: number;
    height?: number;
    radius?: number;
    diameter?: number;
    base?: number;
    baseLength?: number;
    baseWidth?: number;
    topRadius?: number;
    bottomRadius?: number;
    semiAxisA?: number;
    semiAxisB?: number;
    semiAxisC?: number;
  };
  unit?: string;
}

export interface VolumeResult {
  shape: string;
  volume: number;
  surfaceArea: number;
  unit: string;
  volumeUnit: string;
  surfaceAreaUnit: string;
  formulas: {
    volume: string;
    surfaceArea: string;
  };
  calculations: {
    volumeSteps: string[];
    surfaceAreaSteps: string[];
  };
  properties: {
    shapeType: string;
    characteristics: string[];
    applications: string[];
  };
  measurements: {
    diagonal?: number;
    circumference?: number;
    baseArea?: number;
    lateralArea?: number;
  };
  relatedConcepts: Array<{
    concept: string;
    explanation: string;
    example: string;
  }>;
}

// Pythagorean Theorem Calculator Interfaces and Functions
export interface PythagoreanParams {
  sideA?: number;
  sideB?: number;
  hypotenuse?: number;
  angleA?: number; // in degrees
  angleB?: number; // in degrees
  mode: "find_hypotenuse" | "find_side" | "find_angle" | "verify_triangle" | "find_all_from_angle";
  unit: string;
}

export interface PythagoreanResult {
  sideA: number;
  sideB: number;
  hypotenuse: number;
  angleA?: number; // in degrees
  angleB?: number; // in degrees
  angleC: number; // always 90°
  area: number;
  perimeter: number;
  isValidTriangle: boolean;
  triangleType: string;
  unit: string;
  areaUnit: string;
  calculations: {
    stepByStep: string[];
    verification: string[];
    trigonometricSteps?: string[];
  };
  formulas: {
    pythagoras: string;
    area: string;
    perimeter: string;
    trigonometric?: string[];
  };
  properties: {
    characteristics: string[];
    applications: string[];
    relatedConcepts: string[];
  };
  ratios: {
    name: string;
    ratio: string;
    description: string;
  }[];
}

export function calculatePythagorean(params: PythagoreanParams): PythagoreanResult {
  const { sideA, sideB, hypotenuse, angleA, angleB, mode, unit } = params;

  let a = sideA || 0;
  let b = sideB || 0;
  let c = hypotenuse || 0;
  let alphaA = angleA || 0;
  let alphaB = angleB || 0;

  const calculations: string[] = [];
  const verification: string[] = [];
  const trigonometricSteps: string[] = [];

  // Convert angles to radians for calculations
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const toDegrees = (radians: number) => (radians * 180) / Math.PI;

  switch (mode) {
    case "find_hypotenuse":
      if (!a || !b) throw new Error("Catetos A e B são obrigatórios para encontrar a hipotenusa");
      c = Math.sqrt(a * a + b * b);
      calculations.push(`1. Aplicar o Teorema de Pitágoras: c² = a² + b²`);
      calculations.push(`2. Substituir os valores: c² = ${a}² + ${b}²`);
      calculations.push(`3. Calcular: c² = ${a * a} + ${b * b} = ${a * a + b * b}`);
      calculations.push(`4. Extrair a raiz: c = √${a * a + b * b} = ${c.toFixed(4)}`);

      // Calculate angles using trigonometry
      alphaA = toDegrees(Math.atan(a / b));
      alphaB = toDegrees(Math.atan(b / a));

      trigonometricSteps.push(`Ângulo A = arctan(a/b) = arctan(${a}/${b}) = ${alphaA.toFixed(2)}°`);
      trigonometricSteps.push(`Ângulo B = arctan(b/a) = arctan(${b}/${a}) = ${alphaB.toFixed(2)}°`);
      trigonometricSteps.push(`Ângulo C = 90° (sempre em triângulo retângulo)`);
      break;

    case "find_side":
      if (a && c) {
        // Find side B
        if (c <= a) throw new Error("Hipotenusa deve ser maior que o cateto conhecido");
        b = Math.sqrt(c * c - a * a);
        calculations.push(`1. Rearranjar: b² = c² - a²`);
        calculations.push(`2. Substituir: b² = ${c}² - ${a}²`);
        calculations.push(`3. Calcular: b² = ${c * c} - ${a * a} = ${c * c - a * a}`);
        calculations.push(`4. Extrair a raiz: b = √${c * c - a * a} = ${b.toFixed(4)}`);

        alphaA = toDegrees(Math.atan(a / b));
        alphaB = toDegrees(Math.atan(b / a));
      } else if (b && c) {
        // Find side A
        if (c <= b) throw new Error("Hipotenusa deve ser maior que o cateto conhecido");
        a = Math.sqrt(c * c - b * b);
        calculations.push(`1. Rearranjar: a² = c² - b²`);
        calculations.push(`2. Substituir: a² = ${c}² - ${b}²`);
        calculations.push(`3. Calcular: a² = ${c * c} - ${b * b} = ${c * c - b * b}`);
        calculations.push(`4. Extrair a raiz: a = √${c * c - b * b} = ${a.toFixed(4)}`);

        alphaA = toDegrees(Math.atan(a / b));
        alphaB = toDegrees(Math.atan(b / a));
      } else {
        throw new Error("Para encontrar um lado, forneça a hipotenusa e um cateto");
      }

      trigonometricSteps.push(
        `Ângulo A = arctan(${a.toFixed(2)}/${b.toFixed(2)}) = ${alphaA.toFixed(2)}°`
      );
      trigonometricSteps.push(
        `Ângulo B = arctan(${b.toFixed(2)}/${a.toFixed(2)}) = ${alphaB.toFixed(2)}°`
      );
      break;

    case "find_angle":
      if (!a || !b || !c) throw new Error("Todos os lados são obrigatórios para encontrar ângulos");

      // Verify it's a right triangle first
      const cSquared = c * c;
      const aSqPlusBSq = a * a + b * b;
      const tolerance = 0.0001;

      if (Math.abs(cSquared - aSqPlusBSq) > tolerance) {
        throw new Error("Os lados fornecidos não formam um triângulo retângulo");
      }

      alphaA = toDegrees(Math.asin(a / c));
      alphaB = toDegrees(Math.asin(b / c));

      calculations.push(
        `1. Verificar se é triângulo retângulo: ${c}² = ${cSquared.toFixed(2)} e ${a}² + ${b}² = ${aSqPlusBSq.toFixed(2)}`
      );
      calculations.push(`2. Calcular ângulo A: sen(A) = cateto_oposto/hipotenusa = ${a}/${c}`);
      calculations.push(`3. A = arcsen(${(a / c).toFixed(4)}) = ${alphaA.toFixed(2)}°`);
      calculations.push(`4. Calcular ângulo B: sen(B) = ${b}/${c}`);
      calculations.push(`5. B = arcsen(${(b / c).toFixed(4)}) = ${alphaB.toFixed(2)}°`);

      trigonometricSteps.push(`sen(A) = ${a}/${c} = ${(a / c).toFixed(4)}`);
      trigonometricSteps.push(`cos(A) = ${b}/${c} = ${(b / c).toFixed(4)}`);
      trigonometricSteps.push(`tan(A) = ${a}/${b} = ${(a / b).toFixed(4)}`);
      break;

    case "verify_triangle":
      if (!a || !b || !c) throw new Error("Todos os lados são obrigatórios para verificação");

      const expectedC = Math.sqrt(a * a + b * b);
      const difference = Math.abs(c - expectedC);
      const isValid = difference < 0.0001;

      calculations.push(`1. Calcular hipotenusa esperada: c_esperada = √(${a}² + ${b}²)`);
      calculations.push(
        `2. c_esperada = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${expectedC.toFixed(4)}`
      );
      calculations.push(`3. Hipotenusa fornecida: ${c}`);
      calculations.push(
        `4. Diferença: |${c} - ${expectedC.toFixed(4)}| = ${difference.toFixed(6)}`
      );
      calculations.push(
        `5. ${isValid ? "É um triângulo retângulo válido!" : "NÃO é um triângulo retângulo válido!"}`
      );

      if (isValid) {
        alphaA = toDegrees(Math.atan(a / b));
        alphaB = toDegrees(Math.atan(b / a));
      }
      break;

    case "find_all_from_angle":
      if (alphaA && c) {
        // From angle A and hypotenuse
        a = c * Math.sin(toRadians(alphaA));
        b = c * Math.cos(toRadians(alphaA));
        alphaB = 90 - alphaA;

        calculations.push(`1. Com ângulo A = ${alphaA}° e hipotenusa = ${c}`);
        calculations.push(
          `2. Cateto oposto (a): a = c × sen(A) = ${c} × sen(${alphaA}°) = ${a.toFixed(4)}`
        );
        calculations.push(
          `3. Cateto adjacente (b): b = c × cos(A) = ${c} × cos(${alphaA}°) = ${b.toFixed(4)}`
        );
        calculations.push(`4. Ângulo B = 90° - A = 90° - ${alphaA}° = ${alphaB}°`);
      } else if (alphaA && a) {
        // From angle A and opposite side
        b = a / Math.tan(toRadians(alphaA));
        c = a / Math.sin(toRadians(alphaA));
        alphaB = 90 - alphaA;

        calculations.push(`1. Com ângulo A = ${alphaA}° e cateto oposto = ${a}`);
        calculations.push(
          `2. Cateto adjacente: b = a / tan(A) = ${a} / tan(${alphaA}°) = ${b.toFixed(4)}`
        );
        calculations.push(
          `3. Hipotenusa: c = a / sen(A) = ${a} / sen(${alphaA}°) = ${c.toFixed(4)}`
        );
        calculations.push(`4. Ângulo B = 90° - ${alphaA}° = ${alphaB}°`);
      } else if (alphaA && b) {
        // From angle A and adjacent side
        a = b * Math.tan(toRadians(alphaA));
        c = b / Math.cos(toRadians(alphaA));
        alphaB = 90 - alphaA;

        calculations.push(`1. Com ângulo A = ${alphaA}° e cateto adjacente = ${b}`);
        calculations.push(
          `2. Cateto oposto: a = b × tan(A) = ${b} × tan(${alphaA}°) = ${a.toFixed(4)}`
        );
        calculations.push(
          `3. Hipotenusa: c = b / cos(A) = ${b} / cos(${alphaA}°) = ${c.toFixed(4)}`
        );
        calculations.push(`4. Ângulo B = 90° - ${alphaA}° = ${alphaB}°`);
      } else {
        throw new Error(
          "Para encontrar todos os valores a partir de um ângulo, forneça o ângulo A e ao menos um lado"
        );
      }

      trigonometricSteps.push(`sen(${alphaA}°) = ${Math.sin(toRadians(alphaA)).toFixed(4)}`);
      trigonometricSteps.push(`cos(${alphaA}°) = ${Math.cos(toRadians(alphaA)).toFixed(4)}`);
      trigonometricSteps.push(`tan(${alphaA}°) = ${Math.tan(toRadians(alphaA)).toFixed(4)}`);
      break;

    default:
      throw new Error("Modo de cálculo inválido");
  }

  // Verification steps (always calculate for valid triangles)
  if (a > 0 && b > 0 && c > 0) {
    const pythagoreanCheck = Math.abs(a * a + b * b - c * c);
    verification.push(`Verificação pelo Teorema de Pitágoras:`);
    verification.push(
      `a² + b² = ${a.toFixed(2)}² + ${b.toFixed(2)}² = ${(a * a + b * b).toFixed(4)}`
    );
    verification.push(`c² = ${c.toFixed(2)}² = ${(c * c).toFixed(4)}`);
    verification.push(
      `Diferença: ${pythagoreanCheck.toFixed(6)} ${pythagoreanCheck < 0.001 ? "✓ Válido" : "✗ Inválido"}`
    );
  }

  // Calculate area and perimeter
  const area = (a * b) / 2;
  const perimeter = a + b + c;

  // Determine triangle type and properties
  const isValidTriangle = Math.abs(a * a + b * b - c * c) < 0.0001;

  let triangleType = "Triângulo Retângulo";
  if (a === b) triangleType += " Isósceles";

  // Famous Pythagorean ratios
  const ratios: { name: string; ratio: string; description: string }[] = [];

  // Check for common Pythagorean triples (scaled)
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const commonGCD = gcd(gcd(Math.round(a), Math.round(b)), Math.round(c));
  const scaledA = Math.round(a) / commonGCD;
  const scaledB = Math.round(b) / commonGCD;
  const scaledC = Math.round(c) / commonGCD;

  const commonTriples = [
    { ratio: "3:4:5", name: "Triângulo Egípcio", a: 3, b: 4, c: 5 },
    { ratio: "5:12:13", name: "Triângulo 5-12-13", a: 5, b: 12, c: 13 },
    { ratio: "8:15:17", name: "Triângulo 8-15-17", a: 8, b: 15, c: 17 },
    { ratio: "7:24:25", name: "Triângulo 7-24-25", a: 7, b: 24, c: 25 },
    { ratio: "9:40:41", name: "Triângulo 9-40-41", a: 9, b: 40, c: 41 },
    { ratio: "1:1:√2", name: "Triângulo Isósceles 45°", a: 1, b: 1, c: Math.sqrt(2) },
    { ratio: "1:√3:2", name: "Triângulo 30-60-90", a: 1, b: Math.sqrt(3), c: 2 },
  ];

  for (const triple of commonTriples) {
    const tolerance = 0.1;
    if (
      (Math.abs(scaledA - triple.a) < tolerance &&
        Math.abs(scaledB - triple.b) < tolerance &&
        Math.abs(scaledC - triple.c) < tolerance) ||
      (Math.abs(scaledA - triple.b) < tolerance &&
        Math.abs(scaledB - triple.a) < tolerance &&
        Math.abs(scaledC - triple.c) < tolerance)
    ) {
      ratios.push({
        name: triple.name,
        ratio: triple.ratio,
        description: `Este é um ${triple.name.toLowerCase()}, uma das proporções mais famosas da geometria.`,
      });
      break;
    }
  }

  // Golden ratio check for special triangles
  const phi = (1 + Math.sqrt(5)) / 2;
  if (Math.abs(c / a - phi) < 0.05 || Math.abs(c / b - phi) < 0.05) {
    ratios.push({
      name: "Triângulo Áureo",
      ratio: "φ:1:φ",
      description: "Este triângulo tem proporções relacionadas à razão áurea (φ ≈ 1,618).",
    });
  }

  return {
    sideA: parseFloat(a.toFixed(6)),
    sideB: parseFloat(b.toFixed(6)),
    hypotenuse: parseFloat(c.toFixed(6)),
    angleA: alphaA ? parseFloat(alphaA.toFixed(2)) : undefined,
    angleB: alphaB ? parseFloat(alphaB.toFixed(2)) : undefined,
    angleC: 90,
    area: parseFloat(area.toFixed(6)),
    perimeter: parseFloat(perimeter.toFixed(6)),
    isValidTriangle,
    triangleType,
    unit,
    areaUnit: `${unit}²`,
    calculations: {
      stepByStep: calculations,
      verification,
      trigonometricSteps: trigonometricSteps.length > 0 ? trigonometricSteps : undefined,
    },
    formulas: {
      pythagoras: "a² + b² = c²",
      area: "Área = (cateto₁ × cateto₂) / 2",
      perimeter: "Perímetro = a + b + c",
      trigonometric: [
        "sen(α) = cateto oposto / hipotenusa",
        "cos(α) = cateto adjacente / hipotenusa",
        "tan(α) = cateto oposto / cateto adjacente",
      ],
    },
    properties: {
      characteristics: [
        "Possui um ângulo reto (90°)",
        "A hipotenusa é sempre o maior lado",
        "Os ângulos agudos são complementares (α + β = 90°)",
        "A soma dos quadrados dos catetos igual ao quadrado da hipotenusa",
        `Área = ${area.toFixed(2)} ${unit}²`,
        `Perímetro = ${perimeter.toFixed(2)} ${unit}`,
      ],
      applications: [
        "Cálculos de distância e navegação",
        "Engenharia civil e arquitetura",
        "Física: decomposição de vetores",
        "Trigonometria e geometria analítica",
        "Construção: verificação de esquadrias",
        "Cartografia e topografia",
      ],
      relatedConcepts: [
        "Trigonometria básica (sen, cos, tan)",
        "Teorema de Tales e semelhança",
        "Lei dos cossenos (generalização)",
        "Geometria analítica e coordenadas",
        "Números irracionais e radiciação",
        "Proporções e razões trigonométricas",
      ],
    },
    ratios,
  };
}

// Treasury Direct Calculator Interfaces and Functions
export interface TreasuryDirectParams {
  bondType:
    | "tesouro_selic"
    | "tesouro_prefixado"
    | "tesouro_ipca"
    | "tesouro_prefixado_juros"
    | "tesouro_ipca_juros";
  principal: number;
  maturityDate: string;
  purchaseRate: number; // Taxa de compra do título
  currentSelicRate?: number; // Taxa Selic atual
  currentIPCARate?: number; // Taxa IPCA atual
  couponRate?: number; // Taxa de cupom para títulos com juros semestrais
  monthlyInvestment?: number; // Aportes mensais
  markToMarket?: boolean; // Considerar marcação a mercado
  sellBeforeMaturity?: boolean; // Venda antes do vencimento
  sellDate?: string; // Data de venda antecipada
  // Taxas de custódia
  treasuryCustodyRate?: number; // Taxa de custódia do Tesouro (0.20% a.a.)
  bankCustodyRate?: number; // Taxa de custódia do banco (0% a 0.50% a.a.)
  // Resgate antecipado
  earlyRedemption?: boolean; // Simulação de resgate antecipado
  earlyRedemptionDate?: string; // Data do resgate antecipado
  marketRateAtRedemption?: number; // Taxa de mercado no momento do resgate
}

export interface TreasuryDirectResult {
  bondType: string;
  bondName: string;
  principal: number;
  finalAmount: number;
  totalReturn: number;
  totalYield: number;
  annualizedReturn: number;
  periodInDays: number;
  periodInYears: number;

  // Coupons and payments
  coupons: Array<{
    paymentDate: string;
    couponValue: number;
    accumulatedValue: number;
    indexValue?: number;
    isOfficialDate?: boolean;
    daysToPay?: number;
  }>;
  totalCouponsReceived: number;

  // Indexers
  selicAccumulated?: number;
  ipcaAccumulated?: number;
  currentIndexValue: number;

  // Fees and taxes
  custodyFee: number;
  treasuryCustodyFee: number;
  bankCustodyFee: number;
  totalCustodyFee: number;
  incomeTax: number;
  netAmount: number;
  netReturn: number;
  netYield: number;

  // Early redemption
  earlyRedemption?: {
    redemptionDate: string;
    marketRate: number;
    redemptionValue: number;
    markToMarketGainLoss: number;
    netRedemptionValue: number;
    earlyRedemptionYield: number;
  };

  // Detailed calculations
  calculations: {
    stepByStep: string[];
    couponCalculations: string[];
    taxCalculations: string[];
    indexerDetails: string[];
  };

  // Risk analysis
  riskAnalysis: {
    creditRisk: string;
    interestRateRisk: string;
    liquidityRisk: string;
    inflationRisk: string;
  };

  // Comparisons
  comparisons: {
    poupanca: { finalAmount: number; difference: number; differencePercentage: number };
    cdi: { finalAmount: number; difference: number; differencePercentage: number };
    ipca: { finalAmount: number; difference: number; differencePercentage: number };
  };

  // Monthly breakdown for aportes
  monthlyBreakdown?: Array<{
    month: number;
    investment: number;
    accumulatedInvestment: number;
    currentValue: number;
    return: number;
  }>;

  // Bond characteristics
  bondInfo: {
    characteristics: string[];
    advantages: string[];
    disadvantages: string[];
    suitableFor: string[];
  };
}

// Função para calcular datas oficiais de pagamento de cupons (1º janeiro e 1º julho)
function getOfficialCouponDates(purchaseDate: Date, maturityDate: Date): Date[] {
  const dates: Date[] = [];
  const startYear = purchaseDate.getFullYear();
  const endYear = maturityDate.getFullYear();

  // Gera todas as datas de pagamento possíveis (1º jan e 1º jul)
  for (let year = startYear; year <= endYear + 1; year++) {
    const januaryDate = new Date(year, 0, 1); // 1º de janeiro
    const julyDate = new Date(year, 6, 1); // 1º de julho

    // Só adiciona datas futuras em relação à compra e anteriores ao vencimento
    if (januaryDate > purchaseDate && januaryDate <= maturityDate) {
      dates.push(januaryDate);
    }
    if (julyDate > purchaseDate && julyDate <= maturityDate) {
      dates.push(julyDate);
    }
  }

  return dates.sort((a, b) => a.getTime() - b.getTime());
}

export function calculateTreasuryDirect(params: TreasuryDirectParams): TreasuryDirectResult {
  const {
    bondType,
    principal,
    maturityDate,
    purchaseRate,
    currentSelicRate = 10.75,
    currentIPCARate = 4.5,
    couponRate = 10.0,
    monthlyInvestment = 0,
    markToMarket = false,
    sellBeforeMaturity = false,
    sellDate,
    // Taxas de custódia
    treasuryCustodyRate = 0.2, // 0.20% a.a. - taxa padrão do Tesouro
    bankCustodyRate = 0.3, // 0.30% a.a. - taxa média dos bancos
    // Resgate antecipado
    earlyRedemption = false,
    earlyRedemptionDate,
    marketRateAtRedemption,
  } = params;

  // Calculate period
  const purchaseDate = new Date();
  const maturityDateObj = new Date(maturityDate);
  const sellDateObj = sellDate ? new Date(sellDate) : maturityDateObj;
  const actualMaturityDate = sellBeforeMaturity ? sellDateObj : maturityDateObj;

  const periodInDays = Math.max(
    1,
    Math.floor((actualMaturityDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const periodInYears = periodInDays / 365.25;

  let finalAmount = 0;
  let totalCouponsReceived = 0;
  let coupons: TreasuryDirectResult["coupons"] = [];
  let calculations: string[] = [];
  let couponCalculations: string[] = [];
  let indexerDetails: string[] = [];

  // Default values for indexers
  let selicAccumulated = 0;
  let ipcaAccumulated = 0;
  let currentIndexValue = 1;

  // Bond-specific calculations
  switch (bondType) {
    case "tesouro_selic":
      // Tesouro Selic - pós-fixado atrelado à Selic
      currentIndexValue = Math.pow(1 + currentSelicRate / 100, periodInYears);
      selicAccumulated = (currentIndexValue - 1) * 100;
      finalAmount = principal * currentIndexValue;

      calculations.push(
        `1. Tesouro Selic: ${principal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(`2. Taxa Selic: ${currentSelicRate}% ao ano`);
      calculations.push(`3. Período: ${periodInYears.toFixed(2)} anos (${periodInDays} dias)`);
      calculations.push(`4. Fator de correção: ${currentIndexValue.toFixed(6)}`);
      calculations.push(
        `5. Valor final bruto: ${finalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );

      indexerDetails.push(`Selic acumulada no período: ${selicAccumulated.toFixed(2)}%`);
      indexerDetails.push(`Rentabilidade segue 100% da taxa Selic`);
      indexerDetails.push(`Proteção contra oscilações da taxa de juros`);
      break;

    case "tesouro_prefixado":
      // Tesouro Prefixado
      const prefixedFactor = Math.pow(1 + purchaseRate / 100, periodInYears);
      finalAmount = principal * prefixedFactor;

      calculations.push(
        `1. Tesouro Prefixado: ${principal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(`2. Taxa prefixada: ${purchaseRate}% ao ano`);
      calculations.push(`3. Período: ${periodInYears.toFixed(2)} anos`);
      calculations.push(
        `4. Fator de correção: (1 + ${purchaseRate / 100})^${periodInYears.toFixed(2)} = ${prefixedFactor.toFixed(6)}`
      );
      calculations.push(
        `5. Valor final bruto: ${finalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );

      indexerDetails.push(`Taxa fixa de ${purchaseRate}% ao ano`);
      indexerDetails.push(`Rentabilidade garantida se mantido até o vencimento`);
      indexerDetails.push(`Risco de marcação a mercado se vendido antes do vencimento`);
      break;

    case "tesouro_ipca":
      // Tesouro IPCA+
      const ipcaFactor = Math.pow(1 + currentIPCARate / 100, periodInYears);
      const realRateFactor = Math.pow(1 + purchaseRate / 100, periodInYears);
      const totalFactor = ipcaFactor * realRateFactor;
      finalAmount = principal * totalFactor;
      ipcaAccumulated = (ipcaFactor - 1) * 100;

      calculations.push(
        `1. Tesouro IPCA+: ${principal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(`2. Taxa real: ${purchaseRate}% + IPCA`);
      calculations.push(`3. IPCA estimado: ${currentIPCARate}% ao ano`);
      calculations.push(`4. Período: ${periodInYears.toFixed(2)} anos`);
      calculations.push(`5. Fator IPCA: ${ipcaFactor.toFixed(6)}`);
      calculations.push(`6. Fator taxa real: ${realRateFactor.toFixed(6)}`);
      calculations.push(`7. Fator total: ${totalFactor.toFixed(6)}`);
      calculations.push(
        `8. Valor final bruto: ${finalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );

      indexerDetails.push(`IPCA acumulado estimado: ${ipcaAccumulated.toFixed(2)}%`);
      indexerDetails.push(`Taxa real de ${purchaseRate}% + inflação`);
      indexerDetails.push(`Proteção contra inflação`);
      break;

    case "tesouro_prefixado_juros":
      // Tesouro Prefixado com Juros Semestrais - ajustado conforme exemplo real
      const semiAnnualCouponRate = purchaseRate / 2 / 100; // Taxa semestral do cupom
      const numberOfCoupons = Math.floor(periodInYears * 2);

      // Baseado no exemplo: para R$ 8.000.000 a 7,31% a.a., cada cupom é R$ 329.158,01
      // Fórmula: Cupom = Principal × (Taxa anual / 2) / 100
      const referenceCouponValue = (principal * (purchaseRate / 2)) / 100;

      // Calculate coupons with official payment dates (January 1st and July 1st)
      let accumulatedCoupons = 0;
      const officialDates = getOfficialCouponDates(purchaseDate, actualMaturityDate);

      for (let i = 0; i < Math.min(numberOfCoupons, officialDates.length); i++) {
        const couponDate = officialDates[i];
        // Valor do cupom fixo semestralmente
        const couponValue = referenceCouponValue;
        accumulatedCoupons += couponValue;

        coupons.push({
          paymentDate: couponDate.toISOString().split("T")[0],
          couponValue: couponValue,
          accumulatedValue: accumulatedCoupons,
          isOfficialDate: true,
          daysToPay: Math.ceil(
            (couponDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
          ),
        });

        couponCalculations.push(
          `Cupom ${i + 1}: ${couponDate.toLocaleDateString("pt-BR")} - ${couponValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        );
      }

      totalCouponsReceived = accumulatedCoupons;

      // Para títulos prefixados com cupom, o valor principal no vencimento é calculado
      // descontando-se o valor presente dos cupons pagos
      // Baseado no exemplo real: total bruto = R$ 12.997.820,69
      // Com 18 cupons de R$ 329.158,01 = R$ 5.924.844,18 + principal R$ 7.072.976,48
      const discountRate = purchaseRate / 100;
      const presentValueOfCoupons =
        totalCouponsReceived / Math.pow(1 + discountRate, periodInYears);
      const adjustedPrincipal = principal - presentValueOfCoupons;
      const finalPrincipalValue = adjustedPrincipal * Math.pow(1 + discountRate, periodInYears);
      finalAmount = finalPrincipalValue + totalCouponsReceived;

      calculations.push(
        `1. Tesouro Prefixado c/ Juros: ${principal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(
        `2. Taxa de cupom: ${purchaseRate}% ao ano (${(purchaseRate / 2).toFixed(2)}% ao semestre)`
      );
      calculations.push(`3. Número de cupons: ${numberOfCoupons}`);
      calculations.push(
        `4. Valor do cupom: ${referenceCouponValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(
        `5. Total de cupons: ${totalCouponsReceived.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(
        `6. Principal no vencimento: ${finalPrincipalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(
        `7. Valor final bruto: ${finalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      break;

    case "tesouro_ipca_juros":
      // Tesouro IPCA+ com Juros Semestrais
      const ipca6m = Math.pow(1 + currentIPCARate / 100, 0.5) - 1; // IPCA semestral
      const realRate6m = Math.pow(1 + purchaseRate / 100, 0.5) - 1; // Taxa real semestral
      const numberOfCouponsIPCA = Math.floor(periodInYears * 2);

      let principalCorrected = principal;
      let accumulatedCouponsIPCA = 0;
      const officialDatesIPCA = getOfficialCouponDates(purchaseDate, actualMaturityDate);

      for (let i = 0; i < Math.min(numberOfCouponsIPCA, officialDatesIPCA.length); i++) {
        const couponDate = officialDatesIPCA[i];

        // Atualiza o principal pela inflação
        principalCorrected *= 1 + ipca6m;
        const couponValue = principalCorrected * realRate6m;
        accumulatedCouponsIPCA += couponValue;

        coupons.push({
          paymentDate: couponDate.toISOString().split("T")[0],
          couponValue: couponValue,
          accumulatedValue: accumulatedCouponsIPCA,
          indexValue: principalCorrected,
          isOfficialDate: true,
          daysToPay: Math.ceil(
            (couponDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
          ),
        });

        couponCalculations.push(
          `Cupom ${i + 1}: ${couponDate.toLocaleDateString("pt-BR")} - ${couponValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} (Principal corrigido: ${principalCorrected.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })})`
        );
      }

      totalCouponsReceived = accumulatedCouponsIPCA;
      // Principal corrigido até o vencimento
      const finalPrincipal = principal * Math.pow(1 + currentIPCARate / 100, periodInYears);
      finalAmount = finalPrincipal + totalCouponsReceived;
      ipcaAccumulated = (Math.pow(1 + currentIPCARate / 100, periodInYears) - 1) * 100;

      calculations.push(
        `1. Tesouro IPCA+ c/ Juros: ${principal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(`2. Taxa real: ${purchaseRate}% + IPCA`);
      calculations.push(`3. IPCA estimado: ${currentIPCARate}% ao ano`);
      calculations.push(`4. Número de cupons: ${numberOfCouponsIPCA}`);
      calculations.push(
        `5. Principal corrigido: ${finalPrincipal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(
        `6. Total de cupons: ${totalCouponsReceived.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      calculations.push(
        `7. Valor final bruto: ${finalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      break;
  }

  // Calculate monthly investments if applicable
  let monthlyBreakdown: TreasuryDirectResult["monthlyBreakdown"] = undefined;
  if (monthlyInvestment > 0) {
    monthlyBreakdown = [];
    let totalInvested = principal;
    let currentValue = principal;

    const monthlyReturn =
      bondType === "tesouro_selic"
        ? Math.pow(1 + currentSelicRate / 100, 1 / 12) - 1
        : bondType === "tesouro_prefixado"
          ? Math.pow(1 + purchaseRate / 100, 1 / 12) - 1
          : Math.pow(1 + (purchaseRate + currentIPCARate) / 100, 1 / 12) - 1;

    for (let month = 1; month <= periodInYears * 12; month++) {
      totalInvested += monthlyInvestment;
      currentValue = (currentValue + monthlyInvestment) * (1 + monthlyReturn);

      monthlyBreakdown.push({
        month,
        investment: monthlyInvestment,
        accumulatedInvestment: totalInvested,
        currentValue,
        return: currentValue - totalInvested,
      });
    }

    finalAmount = currentValue;
  }

  // Calculate returns
  const totalReturn = finalAmount - principal - monthlyInvestment * (periodInYears * 12);
  const totalYield = (totalReturn / (principal + monthlyInvestment * (periodInYears * 12))) * 100;
  const annualizedReturn =
    (Math.pow(
      finalAmount / (principal + monthlyInvestment * (periodInYears * 12)),
      1 / periodInYears
    ) -
      1) *
    100;

  // Calculate taxes and fees
  const totalInvested = principal + monthlyInvestment * (periodInYears * 12);

  // Calcular taxas de custódia separadamente
  const treasuryCustodyFee = totalInvested * (treasuryCustodyRate / 100) * periodInYears;
  const bankCustodyFee = totalInvested * (bankCustodyRate / 100) * periodInYears;
  const totalCustodyFee = treasuryCustodyFee + bankCustodyFee;
  const custodyFee = totalCustodyFee; // Para compatibilidade

  // IR calculation based on period (regressive table)
  let irRate = 0.225; // 22.5% default
  if (periodInDays <= 180)
    irRate = 0.225; // 22.5%
  else if (periodInDays <= 360)
    irRate = 0.2; // 20%
  else if (periodInDays <= 720)
    irRate = 0.175; // 17.5%
  else irRate = 0.15; // 15%

  const incomeTax = Math.max(0, totalReturn * irRate);
  const netAmount = finalAmount - totalCustodyFee - incomeTax;
  const netReturn = netAmount - totalInvested;
  const netYield = (netReturn / totalInvested) * 100;

  // Calculate early redemption if requested
  let earlyRedemptionData: TreasuryDirectResult["earlyRedemption"];
  if (earlyRedemption && earlyRedemptionDate && marketRateAtRedemption !== undefined) {
    const redemptionDate = new Date(earlyRedemptionDate);
    const daysToRedemption = Math.max(
      1,
      Math.floor((redemptionDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))
    );
    const yearsToRedemption = daysToRedemption / 365.25;

    let redemptionValue = 0;
    let markToMarketGainLoss = 0;

    if (bondType === "tesouro_selic") {
      // Tesouro Selic não sofre marcação a mercado significativa
      redemptionValue = principal * Math.pow(1 + purchaseRate / 100, yearsToRedemption);
      markToMarketGainLoss = 0;
    } else if (bondType === "tesouro_prefixado" || bondType === "tesouro_prefixado_juros") {
      // Títulos prefixados sofrem marcação a mercado
      const currentValue = principal * Math.pow(1 + purchaseRate / 100, yearsToRedemption);
      const marketValue = principal * Math.pow(1 + marketRateAtRedemption / 100, yearsToRedemption);

      // Aproximação da marcação a mercado para prefixados
      const remainingYears = periodInYears - yearsToRedemption;
      const rateDifference = marketRateAtRedemption - purchaseRate;
      const markToMarketFactor = 1 - (rateDifference / 100) * remainingYears * 0.7; // Fator aproximado

      redemptionValue = currentValue * Math.max(0.5, markToMarketFactor); // Limite mínimo de 50%
      markToMarketGainLoss = redemptionValue - currentValue;
    } else {
      // IPCA+ tem marcação a mercado moderada
      const currentValue = principal * Math.pow(1 + purchaseRate / 100, yearsToRedemption);
      const rateDifference = marketRateAtRedemption - purchaseRate;
      const remainingYears = periodInYears - yearsToRedemption;
      const markToMarketFactor = 1 - (rateDifference / 100) * remainingYears * 0.3; // Menor impacto que prefixado

      redemptionValue = currentValue * Math.max(0.7, markToMarketFactor); // Limite mínimo de 70%
      markToMarketGainLoss = redemptionValue - currentValue;
    }

    // Calcular taxas e impostos para resgate antecipado
    const earlyTotalInvested = principal + monthlyInvestment * (yearsToRedemption * 12);
    const earlyTreasuryCustodyFee =
      earlyTotalInvested * (treasuryCustodyRate / 100) * yearsToRedemption;
    const earlyBankCustodyFee = earlyTotalInvested * (bankCustodyRate / 100) * yearsToRedemption;
    const earlyTotalCustodyFee = earlyTreasuryCustodyFee + earlyBankCustodyFee;

    // IR para resgate antecipado
    const earlyReturn = Math.max(0, redemptionValue - earlyTotalInvested);
    let earlyIrRate = 0.225;
    if (daysToRedemption <= 180) earlyIrRate = 0.225;
    else if (daysToRedemption <= 360) earlyIrRate = 0.2;
    else if (daysToRedemption <= 720) earlyIrRate = 0.175;
    else earlyIrRate = 0.15;

    const earlyIncomeTax = Math.max(0, earlyReturn * earlyIrRate);
    const netRedemptionValue = redemptionValue - earlyTotalCustodyFee - earlyIncomeTax;
    const earlyNetReturn = netRedemptionValue - earlyTotalInvested;
    const earlyRedemptionYield = (earlyNetReturn / earlyTotalInvested) * 100;

    earlyRedemptionData = {
      redemptionDate: earlyRedemptionDate,
      marketRate: marketRateAtRedemption,
      redemptionValue,
      markToMarketGainLoss,
      netRedemptionValue,
      earlyRedemptionYield,
    };
  }

  // Tax calculations
  const taxCalculations = [
    `Taxa de custódia Tesouro: ${treasuryCustodyRate}% ao ano = ${treasuryCustodyFee.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
    `Taxa de custódia Banco: ${bankCustodyRate}% ao ano = ${bankCustodyFee.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
    `Total em custódia: ${totalCustodyFee.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
    `Imposto de Renda: ${irRate * 100}% sobre ganhos = ${incomeTax.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
    `Valor líquido: ${netAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
    `Rendimento líquido: ${netReturn.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} (${netYield.toFixed(2)}%)`,
  ];

  // Comparisons
  const poupancaRate = 6.17; // Aproximado
  const cdiRate = currentSelicRate * 0.9; // 90% do CDI
  const ipcaRate = currentIPCARate;

  const poupancaFinal =
    (principal + monthlyInvestment * (periodInYears * 12)) *
    Math.pow(1 + poupancaRate / 100, periodInYears);
  const cdiFinal =
    (principal + monthlyInvestment * (periodInYears * 12)) *
    Math.pow(1 + cdiRate / 100, periodInYears);
  const ipcaFinal =
    (principal + monthlyInvestment * (periodInYears * 12)) *
    Math.pow(1 + ipcaRate / 100, periodInYears);

  const comparisons = {
    poupanca: {
      finalAmount: poupancaFinal,
      difference: netAmount - poupancaFinal,
      differencePercentage: ((netAmount - poupancaFinal) / poupancaFinal) * 100,
    },
    cdi: {
      finalAmount: cdiFinal,
      difference: netAmount - cdiFinal,
      differencePercentage: ((netAmount - cdiFinal) / cdiFinal) * 100,
    },
    ipca: {
      finalAmount: ipcaFinal,
      difference: netAmount - ipcaFinal,
      differencePercentage: ((netAmount - ipcaFinal) / ipcaFinal) * 100,
    },
  };

  // Bond information
  const bondInfoMap = {
    tesouro_selic: {
      characteristics: [
        "Título pós-fixado indexado à taxa Selic",
        "Liquidez diária sem risco de mercado",
        "Rentabilidade acompanha a taxa básica de juros",
        "Ideal para reserva de emergência",
      ],
      advantages: [
        "Segurança: garantido pelo Tesouro Nacional",
        "Liquidez diária",
        "Sem risco de marcação a mercado",
        "Acompanha a taxa Selic",
      ],
      disadvantages: [
        "Rentabilidade variável",
        "Tributação regressiva do IR",
        "Taxa de custódia de 0,20% ao ano",
      ],
      suitableFor: [
        "Reserva de emergência",
        "Investidores conservadores",
        "Quem busca liquidez com segurança",
      ],
    },
    tesouro_prefixado: {
      characteristics: [
        "Título com taxa prefixada",
        "Rentabilidade conhecida na compra",
        "Risco de marcação a mercado",
        "Indicado para objetivos de longo prazo",
      ],
      advantages: [
        "Taxa de juros definida na compra",
        "Proteção contra queda dos juros",
        "Rentabilidade previsível até o vencimento",
      ],
      disadvantages: [
        "Risco de marcação a mercado",
        "Sem proteção contra inflação",
        "Tributação regressiva do IR",
      ],
      suitableFor: [
        "Objetivos de longo prazo",
        "Cenário de queda de juros",
        "Investidores com tolerância a volatilidade",
      ],
    },
    tesouro_ipca: {
      characteristics: [
        "Título híbrido: taxa real + inflação",
        "Proteção contra inflação",
        "Rentabilidade real garantida",
        "Marcação a mercado",
      ],
      advantages: [
        "Proteção contra inflação",
        "Rentabilidade real garantida",
        "Adequado para longo prazo",
      ],
      disadvantages: [
        "Risco de marcação a mercado",
        "Volatilidade maior",
        "Tributação regressiva do IR",
      ],
      suitableFor: [
        "Objetivos de longo prazo",
        "Proteção contra inflação",
        "Aposentadoria e metas futuras",
      ],
    },
    tesouro_prefixado_juros: {
      characteristics: [
        "Título prefixado com cupons semestrais",
        "Recebimento de juros a cada 6 meses",
        "Ideal para renda complementar",
        "Marcação a mercado nos cupons",
      ],
      advantages: [
        "Renda periódica (semestral)",
        "Taxa prefixada conhecida",
        "Diversificação de fluxo de caixa",
      ],
      disadvantages: [
        "Tributação sobre cada cupom",
        "Marcação a mercado",
        "Complexidade tributária maior",
      ],
      suitableFor: ["Busca por renda periódica", "Aposentados", "Diversificação de portfólio"],
    },
    tesouro_ipca_juros: {
      characteristics: [
        "Título híbrido com cupons semestrais",
        "Proteção contra inflação",
        "Cupons corrigidos pela inflação",
        "Ideal para renda real",
      ],
      advantages: [
        "Renda corrigida pela inflação",
        "Proteção do poder de compra",
        "Fluxo de caixa periódico",
      ],
      disadvantages: ["Maior volatilidade", "Tributação sobre cupons", "Complexidade de cálculo"],
      suitableFor: [
        "Renda de longo prazo",
        "Proteção contra inflação",
        "Aposentadoria com renda real",
      ],
    },
  };

  const bondInfo = bondInfoMap[bondType];

  // Risk analysis
  const riskAnalysis = {
    creditRisk: "Risco Soberano - Menor risco de crédito do país",
    interestRateRisk: bondType.includes("prefixado")
      ? "Alto - Marcação a mercado"
      : "Baixo - Acompanha taxa básica",
    liquidityRisk: "Baixo - Liquidez diária no Tesouro Direto",
    inflationRisk: bondType.includes("ipca")
      ? "Baixo - Proteção contra inflação"
      : "Médio/Alto - Sem proteção inflacionária",
  };

  const bondNames = {
    tesouro_selic: "Tesouro Selic",
    tesouro_prefixado: "Tesouro Prefixado",
    tesouro_ipca: "Tesouro IPCA+",
    tesouro_prefixado_juros: "Tesouro Prefixado com Juros Semestrais",
    tesouro_ipca_juros: "Tesouro IPCA+ com Juros Semestrais",
  };

  return {
    bondType,
    bondName: bondNames[bondType],
    principal,
    finalAmount,
    totalReturn,
    totalYield,
    annualizedReturn,
    periodInDays,
    periodInYears,
    coupons,
    totalCouponsReceived,
    selicAccumulated,
    ipcaAccumulated,
    currentIndexValue,
    custodyFee,
    treasuryCustodyFee,
    bankCustodyFee,
    totalCustodyFee,
    incomeTax,
    netAmount,
    netReturn,
    netYield,
    earlyRedemption: earlyRedemptionData,
    calculations: {
      stepByStep: calculations,
      couponCalculations,
      taxCalculations,
      indexerDetails,
    },
    riskAnalysis,
    comparisons,
    monthlyBreakdown,
    bondInfo,
  };
}

export function calculateVolume(params: VolumeParams): VolumeResult {
  const { shape, dimensions, unit = "m" } = params;
  const volumeUnit = `${unit}³`;
  const surfaceAreaUnit = `${unit}²`;
  let volume = 0;
  let surfaceArea = 0;
  let volumeSteps: string[] = [];
  let surfaceAreaSteps: string[] = [];
  let formulas = { volume: "", surfaceArea: "" };
  let measurements: VolumeResult["measurements"] = {};

  switch (shape) {
    case "cube":
      {
        const side = dimensions.side!;
        volume = side * side * side;
        surfaceArea = 6 * side * side;

        formulas.volume = "V = lado³";
        formulas.surfaceArea = "A = 6 × lado²";

        volumeSteps = [`V = ${side}³`, `V = ${volume} ${volumeUnit}`];
        surfaceAreaSteps = [
          `A = 6 × ${side}²`,
          `A = 6 × ${side * side}`,
          `A = ${surfaceArea} ${surfaceAreaUnit}`,
        ];

        measurements.diagonal = side * Math.sqrt(3);
      }
      break;

    case "rectangular_prism":
      {
        const length = dimensions.length!;
        const width = dimensions.width!;
        const height = dimensions.height!;
        volume = length * width * height;
        surfaceArea = 2 * (length * width + length * height + width * height);

        formulas.volume = "V = comprimento × largura × altura";
        formulas.surfaceArea = "A = 2 × (c×l + c×h + l×h)";

        volumeSteps = [`V = ${length} × ${width} × ${height}`, `V = ${volume} ${volumeUnit}`];
        surfaceAreaSteps = [
          `A = 2 × (${length}×${width} + ${length}×${height} + ${width}×${height})`,
          `A = 2 × (${length * width} + ${length * height} + ${width * height})`,
          `A = 2 × ${length * width + length * height + width * height}`,
          `A = ${surfaceArea} ${surfaceAreaUnit}`,
        ];

        measurements.diagonal = Math.sqrt(length * length + width * width + height * height);
      }
      break;

    case "sphere":
      {
        const radius = dimensions.radius || (dimensions.diameter ? dimensions.diameter / 2 : 0);
        volume = (4 / 3) * Math.PI * radius * radius * radius;
        surfaceArea = 4 * Math.PI * radius * radius;

        formulas.volume = "V = (4/3) × π × raio³";
        formulas.surfaceArea = "A = 4 × π × raio²";

        volumeSteps = [
          `V = (4/3) × π × ${radius}³`,
          `V = (4/3) × π × ${radius * radius * radius}`,
          `V = ${volume.toFixed(2)} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `A = 4 × π × ${radius}²`,
          `A = 4 × π × ${radius * radius}`,
          `A = ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];

        measurements.circumference = 2 * Math.PI * radius;
      }
      break;

    case "cylinder":
      {
        const radius = dimensions.radius || (dimensions.diameter ? dimensions.diameter / 2 : 0);
        const height = dimensions.height!;
        const baseArea = Math.PI * radius * radius;
        volume = baseArea * height;
        surfaceArea = 2 * baseArea + 2 * Math.PI * radius * height;

        formulas.volume = "V = π × raio² × altura";
        formulas.surfaceArea = "A = 2π × raio² + 2π × raio × altura";

        volumeSteps = [
          `V = π × ${radius}² × ${height}`,
          `V = π × ${radius * radius} × ${height}`,
          `V = ${volume.toFixed(2)} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `A = 2π × ${radius}² + 2π × ${radius} × ${height}`,
          `A = 2π × ${radius * radius} + 2π × ${radius * height}`,
          `A = ${(2 * baseArea).toFixed(2)} + ${(2 * Math.PI * radius * height).toFixed(2)}`,
          `A = ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];

        measurements.baseArea = baseArea;
        measurements.lateralArea = 2 * Math.PI * radius * height;
      }
      break;

    case "cone":
      {
        const radius = dimensions.radius || (dimensions.diameter ? dimensions.diameter / 2 : 0);
        const height = dimensions.height!;
        const slantHeight = Math.sqrt(radius * radius + height * height);
        const baseArea = Math.PI * radius * radius;
        volume = (1 / 3) * baseArea * height;
        surfaceArea = baseArea + Math.PI * radius * slantHeight;

        formulas.volume = "V = (1/3) × π × raio² × altura";
        formulas.surfaceArea = "A = π × raio² + π × raio × geratriz";

        volumeSteps = [
          `V = (1/3) × π × ${radius}² × ${height}`,
          `V = (1/3) × π × ${radius * radius} × ${height}`,
          `V = ${volume.toFixed(2)} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `Geratriz = √(${radius}² + ${height}²) = ${slantHeight.toFixed(2)}`,
          `A = π × ${radius}² + π × ${radius} × ${slantHeight.toFixed(2)}`,
          `A = ${baseArea.toFixed(2)} + ${(Math.PI * radius * slantHeight).toFixed(2)}`,
          `A = ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];

        measurements.baseArea = baseArea;
        measurements.lateralArea = Math.PI * radius * slantHeight;
      }
      break;

    case "pyramid":
      {
        const baseLength = dimensions.baseLength || dimensions.base!;
        const baseWidth = dimensions.baseWidth || baseLength;
        const height = dimensions.height!;
        const baseArea = baseLength * baseWidth;
        volume = (1 / 3) * baseArea * height;

        // Approximate surface area for rectangular pyramid
        const slantHeight1 = Math.sqrt(height * height + (baseWidth / 2) * (baseWidth / 2));
        const slantHeight2 = Math.sqrt(height * height + (baseLength / 2) * (baseLength / 2));
        surfaceArea =
          baseArea + 2 * (0.5 * baseLength * slantHeight1) + 2 * (0.5 * baseWidth * slantHeight2);

        formulas.volume = "V = (1/3) × área_base × altura";
        formulas.surfaceArea = "A = área_base + área_faces_laterais";

        volumeSteps = [
          `V = (1/3) × (${baseLength} × ${baseWidth}) × ${height}`,
          `V = (1/3) × ${baseArea} × ${height}`,
          `V = ${volume.toFixed(2)} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `Área base = ${baseLength} × ${baseWidth} = ${baseArea}`,
          `Área faces = 4 × área_triângulo_lateral`,
          `A = ${baseArea} + ${(surfaceArea - baseArea).toFixed(2)}`,
          `A = ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];

        measurements.baseArea = baseArea;
      }
      break;

    case "triangular_prism":
      {
        const base = dimensions.base!;
        const height = dimensions.height!;
        const length = dimensions.length!;
        const triangularArea = (base * height) / 2;
        volume = triangularArea * length;

        // Approximate surface area (assuming right triangle)
        const hypotenuse = Math.sqrt(base * base + height * height);
        surfaceArea = 2 * triangularArea + length * (base + height + hypotenuse);

        formulas.volume = "V = área_triângulo × comprimento";
        formulas.surfaceArea = "A = 2 × área_triângulo + perímetro × comprimento";

        volumeSteps = [
          `Área triângulo = (${base} × ${height}) ÷ 2 = ${triangularArea}`,
          `V = ${triangularArea} × ${length}`,
          `V = ${volume} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `A = 2 × ${triangularArea} + ${length} × (${base} + ${height} + ${hypotenuse.toFixed(2)})`,
          `A = ${2 * triangularArea} + ${(length * (base + height + hypotenuse)).toFixed(2)}`,
          `A = ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];

        measurements.baseArea = triangularArea;
      }
      break;

    case "ellipsoid":
      {
        const a = dimensions.semiAxisA!;
        const b = dimensions.semiAxisB!;
        const c = dimensions.semiAxisC!;
        volume = (4 / 3) * Math.PI * a * b * c;

        // Approximate surface area using Knud Thomsen's formula
        const p = 1.6075;
        surfaceArea =
          4 *
          Math.PI *
          Math.pow((Math.pow(a * b, p) + Math.pow(a * c, p) + Math.pow(b * c, p)) / 3, 1 / p);

        formulas.volume = "V = (4/3) × π × a × b × c";
        formulas.surfaceArea = "A ≈ fórmula de Knud Thomsen";

        volumeSteps = [
          `V = (4/3) × π × ${a} × ${b} × ${c}`,
          `V = ${volume.toFixed(2)} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `A ≈ fórmula aproximada de Knud Thomsen`,
          `A ≈ ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];
      }
      break;

    case "frustum":
      {
        const topRadius = dimensions.topRadius!;
        const bottomRadius = dimensions.bottomRadius!;
        const height = dimensions.height!;

        volume =
          (1 / 3) *
          Math.PI *
          height *
          (bottomRadius * bottomRadius + bottomRadius * topRadius + topRadius * topRadius);

        const slantHeight = Math.sqrt(
          height * height + (bottomRadius - topRadius) * (bottomRadius - topRadius)
        );
        surfaceArea =
          Math.PI * (bottomRadius * bottomRadius + topRadius * topRadius) +
          Math.PI * (bottomRadius + topRadius) * slantHeight;

        formulas.volume = "V = (1/3) × π × h × (R² + R×r + r²)";
        formulas.surfaceArea = "A = π(R² + r²) + π(R + r) × geratriz";

        volumeSteps = [
          `V = (1/3) × π × ${height} × (${bottomRadius}² + ${bottomRadius}×${topRadius} + ${topRadius}²)`,
          `V = (1/3) × π × ${height} × (${bottomRadius * bottomRadius} + ${bottomRadius * topRadius} + ${topRadius * topRadius})`,
          `V = ${volume.toFixed(2)} ${volumeUnit}`,
        ];
        surfaceAreaSteps = [
          `Geratriz = √(${height}² + (${bottomRadius}-${topRadius})²) = ${slantHeight.toFixed(2)}`,
          `A = π(${bottomRadius}² + ${topRadius}²) + π(${bottomRadius} + ${topRadius}) × ${slantHeight.toFixed(2)}`,
          `A = ${surfaceArea.toFixed(2)} ${surfaceAreaUnit}`,
        ];
      }
      break;

    default:
      throw new Error(`Forma 3D não suportada: ${shape}`);
  }

  // Properties and characteristics
  const properties = getVolumeShapeProperties(shape);

  // Related concepts
  const relatedConcepts = getVolumeRelatedConcepts(shape);

  return {
    shape: getVolumeShapeDisplayName(shape),
    volume: Math.round(volume * 100) / 100,
    surfaceArea: Math.round(surfaceArea * 100) / 100,
    unit,
    volumeUnit,
    surfaceAreaUnit,
    formulas,
    calculations: {
      volumeSteps,
      surfaceAreaSteps,
    },
    properties,
    measurements,
    relatedConcepts,
  };
}

function getVolumeShapeDisplayName(shape: string): string {
  const names: { [key: string]: string } = {
    cube: "Cubo",
    rectangular_prism: "Prisma Retangular",
    sphere: "Esfera",
    cylinder: "Cilindro",
    cone: "Cone",
    pyramid: "Pirâmide",
    triangular_prism: "Prisma Triangular",
    ellipsoid: "Elipsoide",
    frustum: "Tronco de Cone",
  };
  return names[shape] || shape;
}

function getVolumeShapeProperties(shape: string): VolumeResult["properties"] {
  const properties: { [key: string]: VolumeResult["properties"] } = {
    cube: {
      shapeType: "Poliedro Regular",
      characteristics: [
        "Todas as faces são quadrados iguais",
        "Possui 6 faces, 12 arestas e 8 vértices",
        "Todas as arestas têm o mesmo comprimento",
        "Ângulos internos são todos de 90°",
      ],
      applications: [
        "Embalagens e recipientes cúbicos",
        "Dados e jogos",
        "Elementos decorativos e arquitetônicos",
        "Cálculo de capacidade de armazenamento",
      ],
    },
    rectangular_prism: {
      shapeType: "Poliedro",
      characteristics: [
        "Possui 6 faces retangulares",
        "12 arestas e 8 vértices",
        "Faces opostas são paralelas e iguais",
        "Todos os ângulos internos são de 90°",
      ],
      applications: [
        "Caixas e embalagens retangulares",
        "Cômodos e construções",
        "Aquários e piscinas retangulares",
        "Contêineres de armazenamento",
      ],
    },
    sphere: {
      shapeType: "Sólido de Revolução",
      characteristics: [
        "Todos os pontos equidistam do centro",
        "Superfície lisa e contínua",
        "Maior volume para dada superfície",
        "Infinitos planos de simetria",
      ],
      applications: [
        "Bolas esportivas e recreativas",
        "Tanques esféricos de armazenamento",
        "Planetários e modelos astronômicos",
        "Gotas e bolhas",
      ],
    },
    cylinder: {
      shapeType: "Sólido de Revolução",
      characteristics: [
        "Duas bases circulares paralelas",
        "Superfície lateral curva",
        "Altura perpendicular às bases",
        "Eixo de simetria cilíndrica",
      ],
      applications: [
        "Tubos e canos",
        "Latas e recipientes cilíndricos",
        "Colunas arquitetônicas",
        "Tanques de combustível",
      ],
    },
    cone: {
      shapeType: "Sólido de Revolução",
      characteristics: [
        "Base circular e vértice (ápice)",
        "Superfície lateral cônica",
        "Geratriz conecta base ao vértice",
        "Eixo de simetria cônica",
      ],
      applications: [
        "Cones de trânsito e sinalização",
        "Funis e recipientes cônicos",
        "Telhados cônicos",
        "Sorvetes de casquinha",
      ],
    },
    pyramid: {
      shapeType: "Poliedro",
      characteristics: [
        "Base poligonal e vértice (ápice)",
        "Faces triangulares laterais",
        "Número de faces varia com a base",
        "Converge em um ponto no topo",
      ],
      applications: [
        "Arquitetura monumental (pirâmides)",
        "Telhados piramidais",
        "Estruturas decorativas",
        "Embalagens especiais",
      ],
    },
    triangular_prism: {
      shapeType: "Poliedro",
      characteristics: [
        "Duas bases triangulares paralelas",
        "Três faces retangulares laterais",
        "Ângulos dependem do triângulo da base",
        "9 arestas e 6 vértices",
      ],
      applications: [
        "Elementos estruturais (vigas)",
        "Prismas ópticos",
        "Telhas e coberturas triangulares",
        "Embalagens especializadas",
      ],
    },
    ellipsoid: {
      shapeType: "Sólido de Revolução",
      characteristics: [
        "Três semi-eixos (a, b, c)",
        "Generalização da esfera",
        "Superfície elíptica em todas seções",
        "Três planos de simetria",
      ],
      applications: [
        "Modelos planetários (Terra achatada)",
        "Tanques especializados",
        "Elementos decorativos",
        "Engenharia aeroespacial",
      ],
    },
    frustum: {
      shapeType: "Sólido de Revolução Truncado",
      characteristics: [
        "Cone truncado por plano paralelo à base",
        "Duas bases circulares de raios diferentes",
        "Superfície lateral cônica truncada",
        "Eixo de simetria",
      ],
      applications: [
        "Baldes e recipientes tronco-cônicos",
        "Estruturas arquitetônicas",
        "Peças mecânicas",
        "Luminárias e abajures",
      ],
    },
  };

  return (
    properties[shape] || {
      shapeType: "Forma 3D",
      characteristics: [],
      applications: [],
    }
  );
}

function getVolumeRelatedConcepts(shape: string): VolumeResult["relatedConcepts"] {
  const concepts: { [key: string]: VolumeResult["relatedConcepts"] } = {
    cube: [
      {
        concept: "Volume vs Área Superficial",
        explanation:
          "Volume mede espaço interno (m³), área superficial mede superfície externa (m²)",
        example: "Cubo 2×2×2: volume = 8 m³, área = 24 m²",
      },
      {
        concept: "Escala Cúbica",
        explanation: "Se dobrar as dimensões, volume aumenta 8× (2³)",
        example: "Cubo lado 2m → 4m: volume de 8m³ → 64m³",
      },
      {
        concept: "Densidade",
        explanation: "Massa por unidade de volume (kg/m³)",
        example: "Cubo 1m³ de água = 1000 kg",
      },
    ],
    rectangular_prism: [
      {
        concept: "Otimização de Embalagem",
        explanation: "Para volume fixo, cubo minimiza área superficial",
        example: "Volume 64m³: cubo 4×4×4 tem menor área que 1×8×8",
      },
      {
        concept: "Proporção Áurea 3D",
        explanation: "Prismas com proporções áureas são esteticamente agradáveis",
        example: "Se largura = 1, comprimento ≈ 1,618, altura ≈ 2,618",
      },
      {
        concept: "Capacidade de Carga",
        explanation: "Volume útil considerando espessura das paredes",
        example: "Caixa 10×10×10cm, parede 1cm = volume interno 8×8×8cm",
      },
    ],
    sphere: [
      {
        concept: "Máxima Eficiência Volumétrica",
        explanation: "Esfera tem maior volume para dada área superficial",
        example: "Para área 100m²: esfera ≈ 94,3m³, cubo ≈ 68,0m³",
      },
      {
        concept: "Pressão Hidrostática",
        explanation: "Forma esférica distribui pressão uniformemente",
        example: "Tanques esféricos para alta pressão",
      },
      {
        concept: "Número Pi em 3D",
        explanation: "π aparece em volume (4π/3) e área (4π)",
        example: "π é fundamental para cálculos esféricos",
      },
    ],
    cylinder: [
      {
        concept: "Área Lateral vs Total",
        explanation: "Área lateral = 2πrh, área total inclui as bases",
        example: "Cilindro r=5, h=10: lateral=314m², total=471m²",
      },
      {
        concept: "Otimização de Latas",
        explanation: "Relação altura/diâmetro para minimizar material",
        example: "Lata ótima: altura ≈ diâmetro",
      },
      {
        concept: "Fluxo em Tubos",
        explanation: "Volume de fluido = área × velocidade × tempo",
        example: "Tubo r=0,1m, v=2m/s = 0,063 m³/s de fluxo",
      },
    ],
    cone: [
      {
        concept: "Relação com Cilindro",
        explanation: "Volume do cone = 1/3 do volume do cilindro equivalente",
        example: "Cilindro e cone (r=3, h=4): 113m³ vs 38m³",
      },
      {
        concept: "Geratriz e Teorema de Pitágoras",
        explanation: "Geratriz² = altura² + raio²",
        example: "Cone r=3, h=4: geratriz = √(9+16) = 5",
      },
      {
        concept: "Seção Cônica",
        explanation: "Cortes paralelos geram círculos proporcionais",
        example: "Corte a 1/3 da altura: raio = 2/3 do raio da base",
      },
    ],
    pyramid: [
      {
        concept: "Relação com Prisma",
        explanation: "Volume da pirâmide = 1/3 do prisma de mesma base e altura",
        example: "Prisma e pirâmide (base 5×5, h=6): 150m³ vs 50m³",
      },
      {
        concept: "Apótema e Altura",
        explanation: "Apótema da face lateral conecta ápice ao meio da aresta",
        example: "Usado para calcular área das faces triangulares",
      },
      {
        concept: "Pirâmides Regulares",
        explanation: "Base é polígono regular, ápice sobre o centro",
        example: "Pirâmide quadrada, triangular, hexagonal, etc.",
      },
    ],
    triangular_prism: [
      {
        concept: "Área da Base Triangular",
        explanation: "Várias fórmulas: base×altura/2, Heron, trigonometria",
        example: "Base 3-4-5: área = 6m² (triângulo retângulo)",
      },
      {
        concept: "Estabilidade Estrutural",
        explanation: "Triângulos são estruturas rígidas e estáveis",
        example: "Treliças e estruturas usam prismas triangulares",
      },
      {
        concept: "Refração da Luz",
        explanation: "Prismas triangulares decompõem luz branca",
        example: "Espectroscopia e experimentos ópticos",
      },
    ],
    ellipsoid: [
      {
        concept: "Excentricidade 3D",
        explanation: 'Medida do "achatamento" do elipsoide',
        example: "Terra: elipsoide achatado nos polos",
      },
      {
        concept: "Semi-eixos",
        explanation: "Três semi-eixos definem a forma (a ≥ b ≥ c)",
        example: "a=maior, b=médio, c=menor semi-eixo",
      },
      {
        concept: "Aproximação de Superfície",
        explanation: "Fórmulas aproximadas para área superficial",
        example: "Knud Thomsen é uma das melhores aproximações",
      },
    ],
    frustum: [
      {
        concept: "Proporção de Raios",
        explanation: "Forma depende da relação entre raio superior e inferior",
        example: "r₁/r₂ = 0,5 cria formato bem definido",
      },
      {
        concept: "Estabilidade de Base",
        explanation: "Base maior oferece mais estabilidade",
        example: "Baldes com base larga são mais estáveis",
      },
      {
        concept: "Interpolação Linear",
        explanation: "Raio varia linearmente com a altura",
        example: "A qualquer altura h, raio = r₂ + (r₁-r₂)×h/H",
      },
    ],
  };

  return concepts[shape] || [];
}

export function generateVolumeExamples(): Array<{
  shape: string;
  dimensions: any;
  description: string;
  context: string;
}> {
  return [
    {
      shape: "cube",
      dimensions: { side: 3 },
      description: "Cubo de 3 metros de aresta",
      context: "Cálculo de volume de um contêiner cúbico",
    },
    {
      shape: "rectangular_prism",
      dimensions: { length: 5, width: 3, height: 2 },
      description: "Prisma retangular 5×3×2 metros",
      context: "Volume de uma caixa retangular",
    },
    {
      shape: "sphere",
      dimensions: { radius: 2 },
      description: "Esfera com raio de 2 metros",
      context: "Volume de uma bola esférica",
    },
    {
      shape: "cylinder",
      dimensions: { radius: 1.5, height: 4 },
      description: "Cilindro raio 1,5m e altura 4m",
      context: "Volume de um tanque cilíndrico",
    },
    {
      shape: "cone",
      dimensions: { radius: 3, height: 6 },
      description: "Cone raio 3m e altura 6m",
      context: "Volume de um cone de sinalização grande",
    },
  ];
}

// ===== FRACTION CALCULATIONS =====

export interface Fraction {
  numerator: number;
  denominator: number;
  isNegative?: boolean;
  isImproper?: boolean;
  wholeNumber?: number;
}

export interface FractionResult {
  result: Fraction;
  decimal: number;
  steps: string[];
  explanation: string;
  simplified: Fraction;
  isSimplified: boolean;
}

export interface FractionOperationParams {
  fraction1: Fraction;
  fraction2: Fraction;
  operation: "add" | "subtract" | "multiply" | "divide";
}

export interface FractionOperationResult {
  originalFraction1: Fraction;
  originalFraction2: Fraction;
  operation: string;
  result: Fraction;
  simplified: Fraction;
  decimal: number;
  steps: string[];
  explanation: string;
  mixedNumberResult?: string;
  isProperFraction: boolean;
  commonDenominator?: number;
}

export interface FractionConversionParams {
  input: string | number;
  inputType: "decimal" | "mixed" | "improper" | "percentage";
}

export interface FractionConversionResult {
  original: string | number;
  fraction: Fraction;
  simplified: Fraction;
  decimal: number;
  percentage: number;
  mixedNumber: string;
  steps: string[];
  isRepeatingDecimal: boolean;
  repeatingPattern?: string;
}

// Helper function to find GCD for fractions
function fractionGcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Helper function to find LCM for fractions
function fractionLcm(a: number, b: number): number {
  return Math.abs(a * b) / fractionGcd(a, b);
}

// Add fractions
export function addFractions(
  f1: Fraction,
  f2: Fraction
): { result: Fraction; steps: string[]; explanation: string } {
  const lcm = fractionLcm(f1.denominator, f2.denominator);
  const multiplier1 = lcm / f1.denominator;
  const multiplier2 = lcm / f2.denominator;
  const newNum1 = f1.numerator * multiplier1;
  const newNum2 = f2.numerator * multiplier2;
  const resultNumerator = newNum1 + newNum2;

  let result = { numerator: resultNumerator, denominator: lcm };
  result = simplifyFraction(result.numerator, result.denominator);

  const steps = [
    `Somando: ${formatFraction(f1, false)} + ${formatFraction(f2, false)}`,
    `MMC(${f1.denominator}, ${f2.denominator}) = ${lcm}`,
    `${formatFraction(f1, false)} = ${newNum1}/${lcm}`,
    `${formatFraction(f2, false)} = ${newNum2}/${lcm}`,
    `${newNum1}/${lcm} + ${newNum2}/${lcm} = ${resultNumerator}/${lcm}`,
    result.numerator !== resultNumerator || result.denominator !== lcm
      ? `Simplificando: ${formatFraction(result, false)}`
      : "",
  ].filter(Boolean);

  return {
    result,
    steps,
    explanation: "Para somar frações, encontre o MMC dos denominadores e some os numeradores.",
  };
}

// Subtract fractions
export function subtractFractions(
  f1: Fraction,
  f2: Fraction
): { result: Fraction; steps: string[]; explanation: string } {
  const lcm = fractionLcm(f1.denominator, f2.denominator);
  const multiplier1 = lcm / f1.denominator;
  const multiplier2 = lcm / f2.denominator;
  const newNum1 = f1.numerator * multiplier1;
  const newNum2 = f2.numerator * multiplier2;
  const resultNumerator = newNum1 - newNum2;

  let result = { numerator: resultNumerator, denominator: lcm };
  result = simplifyFraction(result.numerator, result.denominator);

  const steps = [
    `Subtraindo: ${formatFraction(f1, false)} - ${formatFraction(f2, false)}`,
    `MMC(${f1.denominator}, ${f2.denominator}) = ${lcm}`,
    `${formatFraction(f1, false)} = ${newNum1}/${lcm}`,
    `${formatFraction(f2, false)} = ${newNum2}/${lcm}`,
    `${newNum1}/${lcm} - ${newNum2}/${lcm} = ${resultNumerator}/${lcm}`,
    result.numerator !== resultNumerator || result.denominator !== lcm
      ? `Simplificando: ${formatFraction(result, false)}`
      : "",
  ].filter(Boolean);

  return {
    result,
    steps,
    explanation:
      "Para subtrair frações, encontre o MMC dos denominadores e subtraia os numeradores.",
  };
}

// Multiply fractions
export function multiplyFractions(
  f1: Fraction,
  f2: Fraction
): { result: Fraction; steps: string[]; explanation: string } {
  const resultNumerator = f1.numerator * f2.numerator;
  const resultDenominator = f1.denominator * f2.denominator;

  let result = { numerator: resultNumerator, denominator: resultDenominator };
  result = simplifyFraction(result.numerator, result.denominator);

  const steps = [
    `Multiplicando: ${formatFraction(f1, false)} × ${formatFraction(f2, false)}`,
    `${f1.numerator} × ${f2.numerator} = ${resultNumerator}`,
    `${f1.denominator} × ${f2.denominator} = ${resultDenominator}`,
    `Resultado: ${resultNumerator}/${resultDenominator}`,
    result.numerator !== resultNumerator || result.denominator !== resultDenominator
      ? `Simplificando: ${formatFraction(result, false)}`
      : "",
  ].filter(Boolean);

  return {
    result,
    steps,
    explanation:
      "Para multiplicar frações, multiplique numerador por numerador e denominador por denominador.",
  };
}

// Divide fractions
export function divideFractions(
  f1: Fraction,
  f2: Fraction
): { result: Fraction; steps: string[]; explanation: string } {
  if (f2.numerator === 0) throw new Error("Não é possível dividir por zero");

  const reciprocal = { numerator: f2.denominator, denominator: f2.numerator };
  const resultNumerator = f1.numerator * reciprocal.numerator;
  const resultDenominator = f1.denominator * reciprocal.denominator;

  let result = { numerator: resultNumerator, denominator: resultDenominator };
  result = simplifyFraction(result.numerator, result.denominator);

  const steps = [
    `Dividindo: ${formatFraction(f1, false)} ÷ ${formatFraction(f2, false)}`,
    `Inversão da segunda fração: ${formatFraction(reciprocal, false)}`,
    `${formatFraction(f1, false)} × ${formatFraction(reciprocal, false)}`,
    `${f1.numerator} × ${reciprocal.numerator} = ${resultNumerator}`,
    `${f1.denominator} × ${reciprocal.denominator} = ${resultDenominator}`,
    `Resultado: ${resultNumerator}/${resultDenominator}`,
    result.numerator !== resultNumerator || result.denominator !== resultDenominator
      ? `Simplificando: ${formatFraction(result, false)}`
      : "",
  ].filter(Boolean);

  return {
    result,
    steps,
    explanation:
      "Para dividir frações, multiplique pela fração inversa (recíproca) da segunda fração.",
  };
}

// Convert decimal to fraction
export function decimalToFraction(decimal: number): { fraction: Fraction; steps: string[] } {
  if (decimal === 0) return { fraction: { numerator: 0, denominator: 1 }, steps: ["0 = 0/1"] };

  const steps: string[] = [];
  const originalDecimal = decimal;
  const isNegative = decimal < 0;
  decimal = Math.abs(decimal);

  steps.push(`Convertendo ${originalDecimal} para fração`);

  // Handle whole numbers
  if (decimal % 1 === 0) {
    const result = { numerator: isNegative ? -decimal : decimal, denominator: 1 };
    steps.push(`${originalDecimal} = ${result.numerator}/1`);
    return { fraction: result, steps };
  }

  // Count decimal places
  const decimalStr = decimal.toString();
  const decimalIndex = decimalStr.indexOf(".");
  const decimalPlaces = decimalStr.length - decimalIndex - 1;

  // Convert to fraction
  const denominator = Math.pow(10, decimalPlaces);
  let numerator = Math.round(decimal * denominator);

  steps.push(`Multiplicando por ${denominator}: ${numerator}/${denominator}`);

  const simplified = simplifyFraction(numerator, denominator);
  if (simplified.numerator !== numerator || simplified.denominator !== denominator) {
    steps.push(`Simplificando: ${simplified.numerator}/${simplified.denominator}`);
  }

  return {
    fraction: {
      numerator: isNegative ? -simplified.numerator : simplified.numerator,
      denominator: simplified.denominator,
    },
    steps,
  };
}

// Convert fraction to decimal
export function fractionToDecimal(fraction: Fraction): { decimal: number; isRepeating: boolean } {
  return {
    decimal: fraction.numerator / fraction.denominator,
    isRepeating: false, // Simplified for now
  };
}

// Convert to mixed number
export function toMixedNumber(fraction: Fraction): {
  whole: number;
  numerator: number;
  denominator: number;
} {
  const whole = Math.floor(Math.abs(fraction.numerator) / fraction.denominator);
  const remainder = Math.abs(fraction.numerator) % fraction.denominator;
  const sign = fraction.numerator < 0 ? -1 : 1;

  return {
    whole: whole * sign,
    numerator: remainder,
    denominator: fraction.denominator,
  };
}

// =================================
// CÁLCULOS DE SALÁRIO LÍQUIDO
// =================================

export interface NetSalaryParams {
  grossSalary: number;
  dependents: number;
  overtimeValue?: number;
  otherDeductions?: number;
  contractType: "CLT" | "PJ" | "OUTROS";
}

export interface NetSalaryResult {
  netSalary: number;
  grossTotal: number;
  inssDeduction: number;
  irrfDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  inssDetails: {
    baseValue: number;
    rate: number;
    deduction: number;
  };
  irrfDetails: {
    baseValue: number;
    rate: number;
    deduction: number;
    dependentsDeduction: number;
    isExempt: boolean;
    exemptReason?: string;
  };
  summary: {
    effectiveRate: number;
    takeHomePercentage: number;
    isMinimumWage: boolean;
    isAboveIrrfExempt: boolean;
  };
  recommendations: string[];
}

// Tabela INSS 2025 - Faixas progressivas
const INSS_2025_TABLE = [
  { min: 0, max: 1518.0, rate: 0.075, deduction: 0 },
  { min: 1518.01, max: 2793.88, rate: 0.09, deduction: 22.77 },
  { min: 2793.89, max: 4190.83, rate: 0.12, deduction: 106.57 },
  { min: 4190.84, max: 8157.41, rate: 0.14, deduction: 190.4 },
];

// Tabela IRRF 2025 - Vigente a partir de maio de 2025
const IRRF_2025_TABLE = [
  { min: 0, max: 3036.0, rate: 0, deduction: 607.2 },
  { min: 3036.01, max: 3751.05, rate: 0.075, deduction: 120.15 },
  { min: 3751.06, max: 4664.68, rate: 0.15, rate2: 0.225, deduction: 402.75 },
  { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.67 },
];

const DEPENDENT_DEDUCTION_2025 = 189.59; // Por dependente por mês
const MINIMUM_WAGE_2025 = 1518.0;

export function calculateINSS(salary: number): { value: number; rate: number; baseValue: number } {
  const cappedSalary = Math.min(salary, 8157.41); // Teto do INSS

  for (const bracket of INSS_2025_TABLE) {
    if (cappedSalary >= bracket.min && cappedSalary <= bracket.max) {
      const value = cappedSalary * bracket.rate - bracket.deduction;
      return {
        value: Math.max(value, 0),
        rate: bracket.rate,
        baseValue: cappedSalary,
      };
    }
  }

  // Se não encontrar na tabela, usar última faixa
  const lastBracket = INSS_2025_TABLE[INSS_2025_TABLE.length - 1];
  const value = cappedSalary * lastBracket.rate - lastBracket.deduction;
  return {
    value: Math.max(value, 0),
    rate: lastBracket.rate,
    baseValue: cappedSalary,
  };
}

export function calculateIRRF(
  salary: number,
  inssDeduction: number,
  dependents: number
): {
  value: number;
  rate: number;
  baseValue: number;
  dependentsDeduction: number;
  isExempt: boolean;
  exemptReason?: string;
} {
  const taxableIncome = salary - inssDeduction;
  const dependentsDeduction = dependents * DEPENDENT_DEDUCTION_2025;
  const baseForTax = Math.max(taxableIncome - dependentsDeduction, 0);

  // Verifica isenção para valores até R$ 3.036 (dois salários mínimos)
  if (salary <= 3036.0) {
    return {
      value: 0,
      rate: 0,
      baseValue: baseForTax,
      dependentsDeduction,
      isExempt: true,
      exemptReason: "Isento - Salário até R$ 3.036,00 (dois salários mínimos)",
    };
  }

  // Aplicar desconto simplificado de R$ 607,20 para quem recebe até R$ 3.036
  const adjustedBase = baseForTax - 607.2;

  if (adjustedBase <= 0) {
    return {
      value: 0,
      rate: 0,
      baseValue: baseForTax,
      dependentsDeduction,
      isExempt: true,
      exemptReason: "Isento - Após desconto simplificado de R$ 607,20",
    };
  }

  for (const bracket of IRRF_2025_TABLE) {
    if (adjustedBase >= bracket.min && adjustedBase <= bracket.max) {
      const value = adjustedBase * bracket.rate - bracket.deduction;
      return {
        value: Math.max(value, 0),
        rate: bracket.rate,
        baseValue: baseForTax,
        dependentsDeduction,
        isExempt: false,
      };
    }
  }

  // Se não encontrar na tabela, usar última faixa
  const lastBracket = IRRF_2025_TABLE[IRRF_2025_TABLE.length - 1];
  const value = adjustedBase * lastBracket.rate - lastBracket.deduction;
  return {
    value: Math.max(value, 0),
    rate: lastBracket.rate,
    baseValue: baseForTax,
    dependentsDeduction,
    isExempt: false,
  };
}

export function calculateNetSalary(params: NetSalaryParams): NetSalaryResult {
  const { grossSalary, dependents, overtimeValue = 0, otherDeductions = 0, contractType } = params;

  // Para PJ, não há desconto de INSS/IRRF como CLT
  if (contractType === "PJ") {
    const grossTotal = grossSalary + overtimeValue;
    const netSalary = grossTotal - otherDeductions;

    return {
      netSalary,
      grossTotal,
      inssDeduction: 0,
      irrfDeduction: 0,
      otherDeductions,
      totalDeductions: otherDeductions,
      inssDetails: {
        baseValue: 0,
        rate: 0,
        deduction: 0,
      },
      irrfDetails: {
        baseValue: 0,
        rate: 0,
        deduction: 0,
        dependentsDeduction: 0,
        isExempt: true,
        exemptReason: "PJ - Não se aplica desconto CLT",
      },
      summary: {
        effectiveRate: otherDeductions / grossTotal,
        takeHomePercentage: (netSalary / grossTotal) * 100,
        isMinimumWage: grossSalary <= MINIMUM_WAGE_2025,
        isAboveIrrfExempt: grossSalary > 3036.0,
      },
      recommendations: [
        "Como PJ, você deve fazer sua própria contribuição previdenciária",
        "Consulte um contador para otimização tributária",
        "Guarde 20-30% da renda para impostos e contribuições",
      ],
    };
  }

  // Cálculo CLT
  const grossTotal = grossSalary + overtimeValue;
  const inss = calculateINSS(grossTotal);
  const irrf = calculateIRRF(grossTotal, inss.value, dependents);

  const totalDeductions = inss.value + irrf.value + otherDeductions;
  const netSalary = grossTotal - totalDeductions;

  const recommendations: string[] = [];

  if (grossSalary <= MINIMUM_WAGE_2025) {
    recommendations.push("Você recebe o salário mínimo nacional");
  }

  if (irrf.isExempt) {
    recommendations.push("Você está isento do Imposto de Renda");
  }

  if (dependents > 0) {
    recommendations.push(
      `Dedução de R$ ${(dependents * DEPENDENT_DEDUCTION_2025).toFixed(2)} por seus ${dependents} dependente(s)`
    );
  }

  const effectiveRate = totalDeductions / grossTotal;
  if (effectiveRate > 0.15) {
    recommendations.push("Considere estratégias de planejamento tributário");
  }

  return {
    netSalary,
    grossTotal,
    inssDeduction: inss.value,
    irrfDeduction: irrf.value,
    otherDeductions,
    totalDeductions,
    inssDetails: {
      baseValue: inss.baseValue,
      rate: inss.rate,
      deduction: inss.value,
    },
    irrfDetails: {
      baseValue: irrf.baseValue,
      rate: irrf.rate,
      deduction: irrf.value,
      dependentsDeduction: irrf.dependentsDeduction,
      isExempt: irrf.isExempt,
      exemptReason: irrf.exemptReason,
    },
    summary: {
      effectiveRate,
      takeHomePercentage: (netSalary / grossTotal) * 100,
      isMinimumWage: grossSalary <= MINIMUM_WAGE_2025,
      isAboveIrrfExempt: grossTotal > 3036.0,
    },
    recommendations,
  };
}

// ============== CALCULADORA DE CONSÓRCIO ==============

export interface ConsortiumParams {
  goodType: "vehicle" | "property" | "motorcycle" | "durables";
  calculationMode: "by_value" | "by_installment";
  value: number; // Valor do bem ou valor da parcela
  termMonths: number;
  adminFeeRate: number; // Taxa de administração em %
  reserveFundRate: number; // Fundo de reserva em %
  insuranceRate?: number; // Seguro em % (opcional)
  membershipFeeRate?: number; // Taxa de adesão em % (opcional)
}

export interface ConsortiumResult {
  // Parcela mensal detalhada
  monthlyPayment: {
    commonFund: number; // Fundo comum
    adminFee: number; // Taxa de administração
    reserveFund: number; // Fundo de reserva
    insurance: number; // Seguro
    membershipFee: number; // Taxa de adesão
    total: number; // Total da parcela
  };

  // Valores totais
  totalValues: {
    goodValue: number; // Valor total do bem
    totalPaid: number; // Total pago ao longo do consórcio
    totalFees: number; // Total em taxas
    savingsVsFinancing: number; // Economia vs financiamento
  };

  // Projeções
  projections: {
    lastInstallment: number; // Última parcela com reajustes
    adjustmentIndex: string; // Índice de reajuste
    annualAdjustment: number; // Reajuste anual em %
  };

  // Validações e alertas
  validation: {
    isValid: boolean;
    warnings: string[];
    recommendations: string[];
  };

  // Comparativo
  comparison: {
    financingRate: number; // Taxa de financiamento estimada
    financingMonthlyPayment: number; // Parcela do financiamento
    consortiumAdvantages: string[];
    financingAdvantages: string[];
  };
}

// Configurações por tipo de bem
const GOOD_TYPE_CONFIG = {
  vehicle: {
    minTermMonths: 60,
    maxTermMonths: 120,
    defaultReserveFund: 2.5,
    adjustmentIndex: "INPC",
    annualAdjustment: 6.5,
  },
  property: {
    minTermMonths: 60,
    maxTermMonths: 200,
    defaultReserveFund: 3.0,
    adjustmentIndex: "INCC",
    annualAdjustment: 8.0,
  },
  motorcycle: {
    minTermMonths: 60,
    maxTermMonths: 100,
    defaultReserveFund: 2.0,
    adjustmentIndex: "INPC",
    annualAdjustment: 6.5,
  },
  durables: {
    minTermMonths: 60,
    maxTermMonths: 120,
    defaultReserveFund: 2.5,
    adjustmentIndex: "INPC",
    annualAdjustment: 6.0,
  },
};

export function calculateConsortium(params: ConsortiumParams): ConsortiumResult {
  const config = GOOD_TYPE_CONFIG[params.goodType];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Determina o valor do bem baseado no modo de cálculo
  let goodValue: number;
  if (params.calculationMode === "by_value") {
    goodValue = params.value;
  } else {
    // Cálculo reverso: estimar valor do bem baseado na parcela desejada
    const totalRates =
      (params.adminFeeRate +
        params.reserveFundRate +
        (params.insuranceRate || 0) +
        (params.membershipFeeRate || 0)) /
      100;
    goodValue = (params.value * params.termMonths) / (1 + totalRates);
  }

  // Validações
  let isValid = true;

  if (params.termMonths < config.minTermMonths || params.termMonths > config.maxTermMonths) {
    warnings.push(
      `Prazo deve estar entre ${config.minTermMonths} e ${config.maxTermMonths} meses para ${params.goodType}`
    );
    isValid = false;
  }

  if (params.adminFeeRate < 10 || params.adminFeeRate > 22.5) {
    warnings.push("Taxa de administração deve estar entre 10% e 22,5%");
  }

  if (params.reserveFundRate < 2 || params.reserveFundRate > 5) {
    warnings.push("Fundo de reserva deve estar entre 2% e 5%");
  }

  if (goodValue <= 0) {
    warnings.push("Valor do bem deve ser maior que zero");
    isValid = false;
  }

  // Cálculos mensais
  const commonFund = goodValue / params.termMonths;
  const adminFee = (goodValue * params.adminFeeRate) / 100 / params.termMonths;
  const reserveFund = (goodValue * params.reserveFundRate) / 100 / params.termMonths;
  const insurance = params.insuranceRate
    ? (goodValue * params.insuranceRate) / 100 / params.termMonths
    : 0;
  const membershipFee = params.membershipFeeRate
    ? (goodValue * params.membershipFeeRate) / 100 / params.termMonths
    : 0;

  const monthlyTotal = commonFund + adminFee + reserveFund + insurance + membershipFee;

  // Cálculos totais
  const totalPaid = monthlyTotal * params.termMonths;
  const totalFees = (adminFee + reserveFund + insurance + membershipFee) * params.termMonths;

  // Projeção da última parcela com reajustes
  const years = params.termMonths / 12;
  const totalAdjustment = Math.pow(1 + config.annualAdjustment / 100, years);
  const lastInstallment = monthlyTotal * totalAdjustment;

  // Comparativo com financiamento
  const estimatedFinancingRate = 1.2; // 1,2% ao mês (estimativa)
  const financingMonthlyPayment = calculateFinancingPayment(
    goodValue,
    estimatedFinancingRate,
    params.termMonths
  );
  const savingsVsFinancing = financingMonthlyPayment * params.termMonths - totalPaid;

  // Recomendações
  if (params.adminFeeRate > 18) {
    recommendations.push(
      "Taxa de administração acima de 18% é considerada alta. Considere pesquisar outras administradoras."
    );
  }

  if (params.termMonths > 100) {
    recommendations.push(
      "Prazos muito longos aumentam o risco de desistência e podem encarecer o consórcio."
    );
  }

  if (params.goodType === "vehicle" && !params.insuranceRate) {
    recommendations.push("Para veículos, é altamente recomendável incluir seguro no consórcio.");
  }

  return {
    monthlyPayment: {
      commonFund,
      adminFee,
      reserveFund,
      insurance,
      membershipFee,
      total: monthlyTotal,
    },
    totalValues: {
      goodValue,
      totalPaid,
      totalFees,
      savingsVsFinancing,
    },
    projections: {
      lastInstallment,
      adjustmentIndex: config.adjustmentIndex,
      annualAdjustment: config.annualAdjustment,
    },
    validation: {
      isValid,
      warnings,
      recommendations,
    },
    comparison: {
      financingRate: estimatedFinancingRate,
      financingMonthlyPayment,
      consortiumAdvantages: [
        "Não há juros sobre o valor do bem",
        "Possibilidade de contemplação antecipada",
        "Disciplina financeira para poupança",
        "Menor custo total comparado ao financiamento",
      ],
      financingAdvantages: [
        "Recebe o bem imediatamente",
        "Valor da parcela fixo (sem reajustes)",
        "Não depende de sorteio ou lance",
        "Pode quitar antecipadamente",
      ],
    },
  };
}

// Função auxiliar para calcular financiamento
function calculateFinancingPayment(
  principal: number,
  monthlyRate: number,
  termMonths: number
): number {
  const rate = monthlyRate / 100;
  return (
    (principal * (rate * Math.pow(1 + rate, termMonths))) / (Math.pow(1 + rate, termMonths) - 1)
  );
}

// ===== VACATION AND 13TH SALARY CALCULATOR =====

export interface VacationParams {
  grossSalary: number;
  vacationDays: number;
  overtimeHours?: number;
  dependents: number;
  pecuniaryBonus: boolean; // Abono pecuniário - vender 1/3
  advance13th: boolean; // Adiantar 1ª parcela 13º
}

export interface ThirteenthSalaryParams {
  grossSalary: number;
  monthsWorked: number;
  overtimeHours?: number;
  dependents: number;
  installmentType: "first" | "second" | "single";
}

export interface VacationResult {
  grossValue: number;
  constitutionalThird: number;
  pecuniaryBonusAmount: number;
  advance13thAmount: number;
  totalGross: number;
  inssDeduction: number;
  irrfDeduction: number;
  totalDeductions: number;
  netValue: number;
  breakdown: {
    baseSalary: number;
    overtimeValue: number;
    vacationValue: number;
    constitutionalThird: number;
    pecuniaryBonus: number;
    advance13th: number;
  };
  calculations: {
    dailyRate: number;
    vacationDays: number;
    effectiveVacationDays: number;
  };
}

export interface ThirteenthSalaryResult {
  grossValue: number;
  inssDeduction: number;
  irrfDeduction: number;
  totalDeductions: number;
  netValue: number;
  installmentInfo: {
    type: "first" | "second" | "single";
    description: string;
    paymentPeriod: string;
  };
  breakdown: {
    baseSalary: number;
    overtimeValue: number;
    proportionalValue: number;
  };
  calculations: {
    monthsWorked: number;
    proportionalFactor: number;
  };
}

// Tabelas Oficiais 2025
const INSS_TABLE_2025 = [
  { min: 0, max: 1518.0, rate: 7.5 },
  { min: 1518.01, max: 2793.88, rate: 9.0 },
  { min: 2793.89, max: 4190.83, rate: 12.0 },
  { min: 4190.84, max: 8157.41, rate: 14.0 },
];

const IRRF_TABLE_2025 = [
  { min: 0, max: 2259.2, rate: 0, deduction: 0 },
  { min: 2259.21, max: 2826.65, rate: 7.5, deduction: 169.44 },
  { min: 2826.66, max: 3751.05, rate: 15.0, deduction: 381.44 },
  { min: 3751.06, max: 4664.68, rate: 22.5, deduction: 662.77 },
  { min: 4664.69, max: Infinity, rate: 27.5, deduction: 896.0 },
];

// Função para calcular INSS progressivo (específica para férias/13º)
function calculateVacationINSS(grossValue: number): number {
  let inssValue = 0;
  let remainingValue = grossValue;

  for (const bracket of INSS_TABLE_2025) {
    if (remainingValue <= 0) break;

    const bracketMax =
      bracket.max === Infinity ? remainingValue : Math.min(bracket.max, grossValue);
    const bracketMin = bracket.min;
    const taxableInBracket = Math.min(
      remainingValue,
      bracketMax - bracketMin + (bracket.min === 0 ? 0 : 0.01)
    );

    if (taxableInBracket > 0) {
      inssValue += taxableInBracket * (bracket.rate / 100);
      remainingValue -= taxableInBracket;
    }
  }

  return Math.min(inssValue, 8157.41 * 0.14); // Teto do INSS
}

// Função para calcular IRRF progressivo (específica para férias/13º)
function calculateVacationIRRF(grossValue: number, inssValue: number, dependents: number): number {
  const taxableBase = grossValue - inssValue - dependents * DEPENDENT_DEDUCTION_2025;

  if (taxableBase <= 0) return 0;

  for (const bracket of IRRF_TABLE_2025) {
    if (taxableBase >= bracket.min && taxableBase <= bracket.max) {
      const irrfValue = taxableBase * (bracket.rate / 100) - bracket.deduction;
      return Math.max(0, irrfValue);
    }
  }

  return 0;
}

// Calculadora de Férias
export function calculateVacation(params: VacationParams): VacationResult {
  const {
    grossSalary,
    vacationDays,
    overtimeHours = 0,
    dependents,
    pecuniaryBonus,
    advance13th,
  } = params;

  // Validações
  if (grossSalary <= 0 || grossSalary > 50000) {
    throw new Error("Salário deve estar entre R$ 0,01 e R$ 50.000,00");
  }
  if (vacationDays < 1 || vacationDays > 30) {
    throw new Error("Dias de férias devem estar entre 1 e 30");
  }
  if (dependents < 0) {
    throw new Error("Número de dependentes não pode ser negativo");
  }

  // Cálculos básicos
  const dailyRate = grossSalary / 30;
  const effectiveVacationDays = pecuniaryBonus ? vacationDays - 10 : vacationDays;
  const overtimeValue = overtimeHours;

  // Valor das férias
  const vacationValue = (grossSalary + overtimeValue) * (effectiveVacationDays / 30);

  // Terço constitucional
  const constitutionalThird = vacationValue / 3;

  // Abono pecuniário (venda de 1/3 das férias = 10 dias)
  const pecuniaryBonusAmount = pecuniaryBonus
    ? ((grossSalary + overtimeValue) / 30) * 10 + (((grossSalary + overtimeValue) / 30) * 10) / 3
    : 0;

  // Adiantamento da primeira parcela do 13º
  const advance13thAmount = advance13th
    ? ((grossSalary + overtimeValue) / 12) * 0.5 // 50% do 13º sem desconto
    : 0;

  // Total bruto
  const totalGross = vacationValue + constitutionalThird + pecuniaryBonusAmount + advance13thAmount;

  // Descontos (INSS e IRRF apenas sobre férias + 1/3, não sobre abono e adiantamento)
  const taxableBase = vacationValue + constitutionalThird + pecuniaryBonusAmount;
  const inssDeduction = calculateVacationINSS(taxableBase);
  const irrfDeduction = calculateVacationIRRF(taxableBase, inssDeduction, dependents);

  const totalDeductions = inssDeduction + irrfDeduction;
  const netValue = totalGross - totalDeductions;

  return {
    grossValue: vacationValue,
    constitutionalThird,
    pecuniaryBonusAmount,
    advance13thAmount,
    totalGross,
    inssDeduction,
    irrfDeduction,
    totalDeductions,
    netValue,
    breakdown: {
      baseSalary: grossSalary,
      overtimeValue,
      vacationValue,
      constitutionalThird,
      pecuniaryBonus: pecuniaryBonusAmount,
      advance13th: advance13thAmount,
    },
    calculations: {
      dailyRate,
      vacationDays,
      effectiveVacationDays,
    },
  };
}

// Calculadora de 13º Salário
export function calculateThirteenthSalary(params: ThirteenthSalaryParams): ThirteenthSalaryResult {
  const { grossSalary, monthsWorked, overtimeHours = 0, dependents, installmentType } = params;

  // Validações
  if (grossSalary <= 0 || grossSalary > 50000) {
    throw new Error("Salário deve estar entre R$ 0,01 e R$ 50.000,00");
  }
  if (monthsWorked < 1 || monthsWorked > 12) {
    throw new Error("Meses trabalhados devem estar entre 1 e 12");
  }
  if (dependents < 0) {
    throw new Error("Número de dependentes não pode ser negativo");
  }

  // Cálculos básicos
  const proportionalFactor = monthsWorked / 12;
  const overtimeValue = overtimeHours;
  const grossValue = (grossSalary + overtimeValue) * proportionalFactor;

  let taxableValue = grossValue;
  let inssDeduction = 0;
  let irrfDeduction = 0;

  // Informações da parcela
  const installmentInfo = {
    type: installmentType,
    description: getInstallmentDescription(installmentType),
    paymentPeriod: getPaymentPeriod(installmentType),
  };

  // Cálculo dos descontos baseado no tipo de parcela
  switch (installmentType) {
    case "first":
      // Primeira parcela: 50% sem descontos
      taxableValue = grossValue * 0.5;
      inssDeduction = 0;
      irrfDeduction = 0;
      break;

    case "second":
      // Segunda parcela: 50% com descontos
      taxableValue = grossValue * 0.5;
      inssDeduction = calculateVacationINSS(taxableValue);
      irrfDeduction = calculateVacationIRRF(taxableValue, inssDeduction, dependents);
      break;

    case "single":
      // Parcela única: valor total com descontos
      inssDeduction = calculateVacationINSS(taxableValue);
      irrfDeduction = calculateVacationIRRF(taxableValue, inssDeduction, dependents);
      break;
  }

  const totalDeductions = inssDeduction + irrfDeduction;
  const netValue = taxableValue - totalDeductions;

  return {
    grossValue: taxableValue,
    inssDeduction,
    irrfDeduction,
    totalDeductions,
    netValue,
    installmentInfo,
    breakdown: {
      baseSalary: grossSalary,
      overtimeValue,
      proportionalValue: grossValue,
    },
    calculations: {
      monthsWorked,
      proportionalFactor,
    },
  };
}

// Funções auxiliares para informações das parcelas
function getInstallmentDescription(type: "first" | "second" | "single"): string {
  switch (type) {
    case "first":
      return "Primeira Parcela do 13º Salário";
    case "second":
      return "Segunda Parcela do 13º Salário";
    case "single":
      return "Parcela Única do 13º Salário";
  }
}

function getPaymentPeriod(type: "first" | "second" | "single"): string {
  switch (type) {
    case "first":
      return "Paga até 30 de novembro";
    case "second":
      return "Paga até 20 de dezembro";
    case "single":
      return "Paga até 20 de dezembro";
  }
}

// ===== FIXED INCOME COMPARATIVE CALCULATOR =====

export interface FixedIncomeParams {
  initialValue: number;
  monthlyContribution: number;
  periodInMonths: number;
  investmentType:
    | "poupanca"
    | "cdb"
    | "lci"
    | "lca"
    | "tesouro-selic"
    | "tesouro-ipca"
    | "tesouro-prefixado";
  returnType: "pre-fixado" | "pos-cdi" | "selic" | "ipca-plus" | "poupanca";
  annualRate: number;
}

export interface FixedIncomeResult {
  finalValue: number;
  totalReturn: number;
  monthlyReturn: number;
  grossReturn: number;
  incomeTax: number;
  custodyFee: number;
  netReturn: number;
  realReturn: number; // Descontando inflação
  effectiveRate: number;
  realRate: number;
  totalContributed: number;
  returnOnInvestment: number;
  breakdown: {
    initialValue: number;
    contributions: number;
    grossEarnings: number;
    taxes: number;
    fees: number;
    inflationLoss: number;
  };
  investmentInfo: {
    name: string;
    type: string;
    taxFree: boolean;
    minimumValue: number;
    riskLevel: "baixo" | "medio" | "alto";
    liquidity: "diaria" | "mensal" | "vencimento";
  };
}

export interface ComparativeResult {
  investments: FixedIncomeResult[];
  ranking: FixedIncomeResult[];
  bestOption: FixedIncomeResult;
  poupancaComparison: {
    investment: FixedIncomeResult;
    additionalReturn: number;
    percentage: number;
  }[];
  projectedInflation: number;
  recommendations: string[];
}

// Taxas oficiais 2025
const OFFICIAL_RATES_2025 = {
  CDI: 12.57, // % a.a.
  SELIC: 10.5, // % a.a.
  IPCA: 4.2, // % a.a. projetado
  POUPANCA: 6.17, // % a.a.
};

// Tabela de IR regressiva
const INCOME_TAX_TABLE = [
  { minDays: 0, maxDays: 180, rate: 22.5 },
  { minDays: 181, maxDays: 360, rate: 20.0 },
  { minDays: 361, maxDays: 720, rate: 17.5 },
  { minDays: 721, maxDays: Infinity, rate: 15.0 },
];

// Nova MP 1.303/2025 - alíquota única
const NEW_INCOME_TAX_RATE = 17.5;

// Tipos de investimento e suas características
const INVESTMENT_TYPES = {
  poupanca: {
    name: "Poupança",
    type: "Isento de IR",
    taxFree: true,
    minimumValue: 1,
    riskLevel: "baixo" as const,
    liquidity: "diaria" as const,
    defaultRate: OFFICIAL_RATES_2025.POUPANCA,
    custodyFee: 0,
  },
  cdb: {
    name: "CDB",
    type: "Tributado (IR regressivo)",
    taxFree: false,
    minimumValue: 1000,
    riskLevel: "baixo" as const,
    liquidity: "vencimento" as const,
    defaultRate: OFFICIAL_RATES_2025.CDI * 0.9, // 90% do CDI
    custodyFee: 0,
  },
  lci: {
    name: "LCI",
    type: "Isento de IR (até 2025)",
    taxFree: true,
    minimumValue: 30000,
    riskLevel: "baixo" as const,
    liquidity: "vencimento" as const,
    defaultRate: OFFICIAL_RATES_2025.CDI * 0.85, // 85% do CDI
    custodyFee: 0,
  },
  lca: {
    name: "LCA",
    type: "Isento de IR (até 2025)",
    taxFree: true,
    minimumValue: 30000,
    riskLevel: "baixo" as const,
    liquidity: "vencimento" as const,
    defaultRate: OFFICIAL_RATES_2025.CDI * 0.85, // 85% do CDI
    custodyFee: 0,
  },
  "tesouro-selic": {
    name: "Tesouro Selic",
    type: "Tributado (IR 17,5%)",
    taxFree: false,
    minimumValue: 30,
    riskLevel: "baixo" as const,
    liquidity: "diaria" as const,
    defaultRate: OFFICIAL_RATES_2025.SELIC,
    custodyFee: 0.2, // 0,2% a.a.
  },
  "tesouro-ipca": {
    name: "Tesouro IPCA+",
    type: "Tributado (IR 17,5%)",
    taxFree: false,
    minimumValue: 30,
    riskLevel: "medio" as const,
    liquidity: "diaria" as const,
    defaultRate: 6.0 + OFFICIAL_RATES_2025.IPCA, // Taxa fixa + IPCA
    custodyFee: 0.2, // 0,2% a.a.
  },
  "tesouro-prefixado": {
    name: "Tesouro Prefixado",
    type: "Tributado (IR 17,5%)",
    taxFree: false,
    minimumValue: 30,
    riskLevel: "medio" as const,
    liquidity: "diaria" as const,
    defaultRate: 11.5, // Taxa prefixada
    custodyFee: 0.2, // 0,2% a.a.
  },
};

// Função para calcular IR baseado no prazo
function calculateIncomeTax(
  grossReturn: number,
  periodInMonths: number,
  useNewRule: boolean = true
): number {
  if (useNewRule) {
    return grossReturn * (NEW_INCOME_TAX_RATE / 100);
  }

  const days = periodInMonths * 30;
  for (const bracket of INCOME_TAX_TABLE) {
    if (days >= bracket.minDays && days <= bracket.maxDays) {
      return grossReturn * (bracket.rate / 100);
    }
  }

  return grossReturn * (INCOME_TAX_TABLE[INCOME_TAX_TABLE.length - 1].rate / 100);
}

// Função para calcular taxa de custódia
function calculateCustodyFee(
  totalValue: number,
  annualCustodyRate: number,
  periodInMonths: number
): number {
  if (annualCustodyRate === 0) return 0;
  return totalValue * (annualCustodyRate / 100) * (periodInMonths / 12);
}

// Função principal de cálculo de renda fixa
export function calculateFixedIncome(params: FixedIncomeParams): FixedIncomeResult {
  const { initialValue, monthlyContribution, periodInMonths, investmentType, annualRate } = params;

  // Validações
  if (initialValue <= 0) {
    throw new Error("Valor inicial deve ser maior que zero");
  }
  if (periodInMonths < 1 || periodInMonths > 600) {
    throw new Error("Período deve estar entre 1 e 600 meses");
  }
  if (annualRate < 0.1 || annualRate > 50) {
    throw new Error("Taxa de rentabilidade deve estar entre 0,1% e 50% ao ano");
  }

  const investmentInfo = INVESTMENT_TYPES[investmentType];
  const monthlyRate = annualRate / 100 / 12;

  // Cálculo do valor futuro com aportes mensais
  // VF = VP × (1 + i)^n + PMT × [((1 + i)^n - 1) / i]
  const futureValueInitial = initialValue * Math.pow(1 + monthlyRate, periodInMonths);
  const futureValueContributions =
    monthlyContribution > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, periodInMonths) - 1) / monthlyRate)
      : 0;

  const grossValue = futureValueInitial + futureValueContributions;
  const totalContributed = initialValue + monthlyContribution * periodInMonths;
  const grossReturn = grossValue - totalContributed;

  // Cálculo de impostos e taxas
  const incomeTax = investmentInfo.taxFree ? 0 : calculateIncomeTax(grossReturn, periodInMonths);
  const custodyFee = calculateCustodyFee(grossValue, investmentInfo.custodyFee, periodInMonths);

  const netValue = grossValue - incomeTax - custodyFee;
  const netReturn = netValue - totalContributed;

  // Cálculo do rendimento real (descontando inflação)
  const inflationRate = OFFICIAL_RATES_2025.IPCA / 100;
  const inflationLoss =
    totalContributed * Math.pow(1 + inflationRate / 12, periodInMonths) - totalContributed;
  const realReturn = netReturn - inflationLoss;

  // Taxas efetivas
  const effectiveRate = (netValue / totalContributed - 1) * 100;
  const realRate = (realReturn / totalContributed + 1) * 100;
  const monthlyReturn = netReturn / periodInMonths;
  const returnOnInvestment = (netReturn / totalContributed) * 100;

  return {
    finalValue: netValue,
    totalReturn: netReturn,
    monthlyReturn,
    grossReturn,
    incomeTax,
    custodyFee,
    netReturn,
    realReturn,
    effectiveRate,
    realRate,
    totalContributed,
    returnOnInvestment,
    breakdown: {
      initialValue,
      contributions: monthlyContribution * periodInMonths,
      grossEarnings: grossReturn,
      taxes: incomeTax,
      fees: custodyFee,
      inflationLoss,
    },
    investmentInfo: {
      name: investmentInfo.name,
      type: investmentInfo.type,
      taxFree: investmentInfo.taxFree,
      minimumValue: investmentInfo.minimumValue,
      riskLevel: investmentInfo.riskLevel,
      liquidity: investmentInfo.liquidity,
    },
  };
}

// Função para comparar múltiplos investimentos
export function compareFixedIncomeInvestments(investments: FixedIncomeParams[]): ComparativeResult {
  const results = investments.map((investment) => calculateFixedIncome(investment));

  // Ranking por rendimento líquido
  const ranking = [...results].sort((a, b) => b.finalValue - a.finalValue);
  const bestOption = ranking[0];

  // Comparação com poupança
  const poupancaParams: FixedIncomeParams = {
    initialValue: investments[0].initialValue,
    monthlyContribution: investments[0].monthlyContribution,
    periodInMonths: investments[0].periodInMonths,
    investmentType: "poupanca",
    returnType: "poupanca",
    annualRate: OFFICIAL_RATES_2025.POUPANCA,
  };

  const poupancaResult = calculateFixedIncome(poupancaParams);

  const poupancaComparison = results.map((result) => ({
    investment: result,
    additionalReturn: result.finalValue - poupancaResult.finalValue,
    percentage: (result.finalValue / poupancaResult.finalValue - 1) * 100,
  }));

  // Recomendações baseadas nos resultados
  const recommendations = generateRecommendations(results, poupancaResult);

  return {
    investments: results,
    ranking,
    bestOption,
    poupancaComparison,
    projectedInflation: OFFICIAL_RATES_2025.IPCA,
    recommendations,
  };
}

// Função para gerar recomendações
function generateRecommendations(
  results: FixedIncomeResult[],
  poupancaResult: FixedIncomeResult
): string[] {
  const recommendations: string[] = [];

  const bestResult = results.reduce((prev, current) =>
    current.finalValue > prev.finalValue ? current : prev
  );

  if (bestResult.finalValue > poupancaResult.finalValue * 1.1) {
    recommendations.push(
      `${bestResult.investmentInfo.name} supera a poupança em ${((bestResult.finalValue / poupancaResult.finalValue - 1) * 100).toFixed(1)}%`
    );
  }

  const highTaxResults = results.filter((r) => r.incomeTax > r.grossReturn * 0.15);
  if (highTaxResults.length > 0) {
    recommendations.push("Considere investimentos isentos de IR para maximizar rendimentos");
  }

  if (results.some((r) => r.investmentInfo.liquidity === "vencimento")) {
    recommendations.push("Atenção aos prazos de carência e liquidez dos investimentos");
  }

  recommendations.push("Diversifique sua carteira entre diferentes tipos de renda fixa");
  recommendations.push("Monitore mudanças na legislação tributária que podem afetar rendimentos");

  return recommendations;
}

// Função para obter taxa padrão por tipo de investimento
export function getDefaultRate(investmentType: string): number {
  const investment = INVESTMENT_TYPES[investmentType as keyof typeof INVESTMENT_TYPES];
  return investment ? investment.defaultRate : 0;
}

// Função para obter informações do investimento
export function getInvestmentInfo(investmentType: string) {
  return INVESTMENT_TYPES[investmentType as keyof typeof INVESTMENT_TYPES];
}

// ===================================
// CHILD DEVELOPMENT PERCENTILES SYSTEM
// ===================================

export interface ChildPercentilesParams {
  birthDate: Date;
  gender: "male" | "female";
  weight: number; // kg
  height: number; // cm
  headCircumference?: number; // cm
  motherHeight?: number; // cm
  fatherHeight?: number; // cm
  isPremature?: boolean;
  gestationalWeeks?: number;
}

export interface ChildPercentilesResult {
  ageInMonths: number;
  ageInWeeks: number;
  correctedAge?: number;

  // Growth percentiles
  weightPercentile: number;
  heightPercentile: number;
  headCircumferencePercentile?: number;

  // Status interpretations
  weightStatus: string;
  heightStatus: string;
  headCircumferenceStatus?: string;

  // Adult height prediction
  adultHeightPrediction?: {
    target: number; // cm
    range: { min: number; max: number };
    method: string;
  };

  // Growth velocity
  growthVelocity?: {
    weightVelocity: number; // kg/month
    heightVelocity: number; // cm/month
    isNormal: boolean;
  };

  // Nutritional status
  nutritionalStatus: {
    classification: string;
    bmi?: number;
    bmiPercentile?: number;
    recommendation: string;
  };

  // Charts data for visualization
  chartData: {
    weightChart: GrowthChartPoint[];
    heightChart: GrowthChartPoint[];
    headCircumferenceChart?: GrowthChartPoint[];
    childPosition: {
      weight: { age: number; value: number; percentile: number };
      height: { age: number; value: number; percentile: number };
      headCircumference?: { age: number; value: number; percentile: number };
    };
  };
}

export interface GrowthChartPoint {
  age: number; // months
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

// WHO Growth Standards Data (0-24 months) - Weight for Age (kg)
const WHO_WEIGHT_FOR_AGE_BOYS_0_24: GrowthChartPoint[] = [
  { age: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
  { age: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
  { age: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
  { age: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
  { age: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7 },
  { age: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3 },
  { age: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
  { age: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3 },
  { age: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7 },
  { age: 9, p3: 7.1, p15: 8.0, p50: 8.9, p85: 9.9, p97: 11.0 },
  { age: 10, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4 },
  { age: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7 },
  { age: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 },
  { age: 15, p3: 8.3, p15: 9.2, p50: 10.3, p85: 11.5, p97: 12.8 },
  { age: 18, p3: 8.8, p15: 9.8, p50: 10.9, p85: 12.2, p97: 13.5 },
  { age: 21, p3: 9.2, p15: 10.3, p50: 11.5, p85: 12.8, p97: 14.2 },
  { age: 24, p3: 9.7, p15: 10.8, p50: 12.0, p85: 13.4, p97: 14.8 },
];

const WHO_WEIGHT_FOR_AGE_GIRLS_0_24: GrowthChartPoint[] = [
  { age: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
  { age: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5 },
  { age: 2, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6 },
  { age: 3, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5 },
  { age: 4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2 },
  { age: 5, p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8 },
  { age: 6, p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
  { age: 7, p3: 6.0, p15: 6.8, p50: 7.6, p85: 8.6, p97: 9.8 },
  { age: 8, p3: 6.3, p15: 7.0, p50: 7.9, p85: 8.9, p97: 10.2 },
  { age: 9, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5 },
  { age: 10, p3: 6.7, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.9 },
  { age: 11, p3: 6.9, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.2 },
  { age: 12, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5 },
  { age: 15, p3: 7.6, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.4 },
  { age: 18, p3: 8.1, p15: 9.0, p50: 10.2, p85: 11.6, p97: 13.2 },
  { age: 21, p3: 8.5, p15: 9.5, p50: 10.9, p85: 12.3, p97: 13.9 },
  { age: 24, p3: 9.0, p15: 10.0, p50: 11.5, p85: 13.0, p97: 14.6 },
];

// WHO Growth Standards Data - Height for Age (cm)
const WHO_HEIGHT_FOR_AGE_BOYS_0_24: GrowthChartPoint[] = [
  { age: 0, p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7 },
  { age: 1, p3: 50.8, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.6 },
  { age: 2, p3: 54.4, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.4 },
  { age: 3, p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5 },
  { age: 4, p3: 59.7, p15: 61.8, p50: 63.9, p85: 66.0, p97: 68.0 },
  { age: 5, p3: 61.7, p15: 63.8, p50: 65.9, p85: 68.0, p97: 70.1 },
  { age: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9 },
  { age: 7, p3: 64.8, p15: 67.0, p50: 69.2, p85: 71.3, p97: 73.5 },
  { age: 8, p3: 66.2, p15: 68.4, p50: 70.6, p85: 72.8, p97: 75.0 },
  { age: 9, p3: 67.5, p15: 69.7, p50: 72.0, p85: 74.2, p97: 76.5 },
  { age: 10, p3: 68.7, p15: 71.0, p50: 73.3, p85: 75.6, p97: 77.9 },
  { age: 11, p3: 69.9, p15: 72.2, p50: 74.5, p85: 76.9, p97: 79.2 },
  { age: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
  { age: 15, p3: 74.1, p15: 76.6, p50: 79.1, p85: 81.7, p97: 84.2 },
  { age: 18, p3: 76.9, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.7 },
  { age: 21, p3: 79.6, p15: 82.3, p50: 85.1, p85: 87.9, p97: 90.7 },
  { age: 24, p3: 82.3, p15: 85.1, p50: 87.8, p85: 90.6, p97: 93.4 },
];

const WHO_HEIGHT_FOR_AGE_GIRLS_0_24: GrowthChartPoint[] = [
  { age: 0, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
  { age: 1, p3: 49.8, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.6 },
  { age: 2, p3: 53.0, p15: 55.0, p50: 57.1, p85: 59.1, p97: 61.1 },
  { age: 3, p3: 55.6, p15: 57.7, p50: 59.8, p85: 61.9, p97: 64.0 },
  { age: 4, p3: 57.8, p15: 59.9, p50: 62.1, p85: 64.3, p97: 66.4 },
  { age: 5, p3: 59.6, p15: 61.8, p50: 64.0, p85: 66.2, p97: 68.5 },
  { age: 6, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
  { age: 7, p3: 62.7, p15: 65.0, p50: 67.3, p85: 69.6, p97: 71.9 },
  { age: 8, p3: 64.0, p15: 66.4, p50: 68.7, p85: 71.1, p97: 73.5 },
  { age: 9, p3: 65.3, p15: 67.7, p50: 70.1, p85: 72.6, p97: 75.0 },
  { age: 10, p3: 66.5, p15: 69.0, p50: 71.5, p85: 74.0, p97: 76.4 },
  { age: 11, p3: 67.7, p15: 70.3, p50: 72.8, p85: 75.3, p97: 77.8 },
  { age: 12, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
  { age: 15, p3: 72.0, p15: 74.8, p50: 77.5, p85: 80.2, p97: 83.0 },
  { age: 18, p3: 74.9, p15: 77.7, p50: 80.7, p85: 83.6, p97: 86.5 },
  { age: 21, p3: 77.5, p15: 80.6, p50: 83.7, p85: 86.9, p97: 90.0 },
  { age: 24, p3: 80.0, p15: 83.2, p50: 86.4, p85: 89.6, p97: 92.9 },
];

// Head Circumference for Age (cm)
const WHO_HEAD_CIRCUMFERENCE_BOYS_0_24: GrowthChartPoint[] = [
  { age: 0, p3: 31.9, p15: 33.2, p50: 34.5, p85: 35.7, p97: 37.0 },
  { age: 1, p3: 35.2, p15: 36.4, p50: 37.6, p85: 38.8, p97: 40.0 },
  { age: 2, p3: 37.2, p15: 38.3, p50: 39.5, p85: 40.7, p97: 41.9 },
  { age: 3, p3: 38.6, p15: 39.7, p50: 40.9, p85: 42.0, p97: 43.2 },
  { age: 4, p3: 39.6, p15: 40.7, p50: 41.9, p85: 43.1, p97: 44.2 },
  { age: 5, p3: 40.4, p15: 41.5, p50: 42.6, p85: 43.8, p97: 45.0 },
  { age: 6, p3: 41.0, p15: 42.1, p50: 43.3, p85: 44.4, p97: 45.6 },
  { age: 7, p3: 41.5, p15: 42.7, p50: 43.8, p85: 45.0, p97: 46.1 },
  { age: 8, p3: 42.0, p15: 43.1, p50: 44.3, p85: 45.4, p97: 46.6 },
  { age: 9, p3: 42.4, p15: 43.5, p50: 44.7, p85: 45.8, p97: 47.0 },
  { age: 10, p3: 42.7, p15: 43.8, p50: 45.0, p85: 46.1, p97: 47.3 },
  { age: 11, p3: 43.0, p15: 44.1, p50: 45.3, p85: 46.4, p97: 47.6 },
  { age: 12, p3: 43.2, p15: 44.4, p50: 45.5, p85: 46.7, p97: 47.8 },
  { age: 15, p3: 44.0, p15: 45.1, p50: 46.3, p85: 47.4, p97: 48.6 },
  { age: 18, p3: 44.6, p15: 45.7, p50: 46.9, p85: 48.0, p97: 49.2 },
  { age: 21, p3: 45.1, p15: 46.2, p50: 47.4, p85: 48.5, p97: 49.7 },
  { age: 24, p3: 45.5, p15: 46.6, p50: 47.8, p85: 48.9, p97: 50.1 },
];

const WHO_HEAD_CIRCUMFERENCE_GIRLS_0_24: GrowthChartPoint[] = [
  { age: 0, p3: 31.7, p15: 32.7, p50: 33.9, p85: 35.1, p97: 36.2 },
  { age: 1, p3: 34.2, p15: 35.4, p50: 36.5, p85: 37.7, p97: 38.9 },
  { age: 2, p3: 36.1, p15: 37.1, p50: 38.3, p85: 39.5, p97: 40.7 },
  { age: 3, p3: 37.4, p15: 38.5, p50: 39.5, p85: 40.8, p97: 42.0 },
  { age: 4, p3: 38.4, p15: 39.5, p50: 40.6, p85: 41.8, p97: 43.0 },
  { age: 5, p3: 39.2, p15: 40.2, p50: 41.4, p85: 42.6, p97: 43.8 },
  { age: 6, p3: 39.8, p15: 40.9, p50: 42.0, p85: 43.2, p97: 44.4 },
  { age: 7, p3: 40.3, p15: 41.4, p50: 42.5, p85: 43.7, p97: 44.9 },
  { age: 8, p3: 40.7, p15: 41.8, p50: 42.9, p85: 44.1, p97: 45.3 },
  { age: 9, p3: 41.1, p15: 42.1, p50: 43.3, p85: 44.5, p97: 45.7 },
  { age: 10, p3: 41.4, p15: 42.5, p50: 43.6, p85: 44.8, p97: 46.0 },
  { age: 11, p3: 41.7, p15: 42.8, p50: 43.9, p85: 45.1, p97: 46.3 },
  { age: 12, p3: 41.9, p15: 43.0, p50: 44.2, p85: 45.3, p97: 46.5 },
  { age: 15, p3: 42.7, p15: 43.8, p50: 44.9, p85: 46.1, p97: 47.3 },
  { age: 18, p3: 43.3, p15: 44.4, p50: 45.6, p85: 46.7, p97: 47.9 },
  { age: 21, p3: 43.8, p15: 44.9, p50: 46.1, p85: 47.2, p97: 48.4 },
  { age: 24, p3: 44.2, p15: 45.3, p50: 46.5, p85: 47.6, p97: 48.8 },
];

// Extended data for 2-5 years (CDC data adapted)
const CDC_WEIGHT_FOR_AGE_BOYS_24_60: GrowthChartPoint[] = [
  { age: 24, p3: 9.7, p15: 10.8, p50: 12.0, p85: 13.4, p97: 14.8 },
  { age: 30, p3: 10.5, p15: 11.7, p50: 13.1, p85: 14.7, p97: 16.3 },
  { age: 36, p3: 11.3, p15: 12.7, p50: 14.2, p85: 16.0, p97: 17.8 },
  { age: 42, p3: 12.1, p15: 13.6, p50: 15.3, p85: 17.2, p97: 19.3 },
  { age: 48, p3: 12.8, p15: 14.5, p50: 16.4, p85: 18.5, p97: 20.8 },
  { age: 54, p3: 13.6, p15: 15.4, p50: 17.5, p85: 19.8, p97: 22.3 },
  { age: 60, p3: 14.4, p15: 16.3, p50: 18.6, p85: 21.2, p97: 23.9 },
];

const CDC_WEIGHT_FOR_AGE_GIRLS_24_60: GrowthChartPoint[] = [
  { age: 24, p3: 9.0, p15: 10.0, p50: 11.5, p85: 13.0, p97: 14.6 },
  { age: 30, p3: 9.9, p15: 11.0, p50: 12.7, p85: 14.4, p97: 16.2 },
  { age: 36, p3: 10.8, p15: 12.0, p50: 13.9, p85: 15.8, p97: 17.8 },
  { age: 42, p3: 11.6, p15: 13.0, p50: 15.1, p85: 17.3, p97: 19.5 },
  { age: 48, p3: 12.4, p15: 13.9, p50: 16.3, p85: 18.8, p97: 21.2 },
  { age: 54, p3: 13.2, p15: 14.9, p50: 17.5, p85: 20.3, p97: 23.0 },
  { age: 60, p3: 14.1, p15: 15.8, p50: 18.7, p85: 21.8, p97: 24.9 },
];

const CDC_HEIGHT_FOR_AGE_BOYS_24_60: GrowthChartPoint[] = [
  { age: 24, p3: 82.3, p15: 85.1, p50: 87.8, p85: 90.6, p97: 93.4 },
  { age: 30, p3: 87.1, p15: 90.0, p50: 92.9, p85: 95.8, p97: 98.7 },
  { age: 36, p3: 91.9, p15: 94.9, p50: 97.9, p85: 100.9, p97: 103.9 },
  { age: 42, p3: 96.4, p15: 99.6, p50: 102.8, p85: 106.0, p97: 109.2 },
  { age: 48, p3: 100.7, p15: 104.1, p50: 107.5, p85: 110.9, p97: 114.3 },
  { age: 54, p3: 104.8, p15: 108.5, p50: 112.2, p85: 115.9, p97: 119.6 },
  { age: 60, p3: 108.8, p15: 112.7, p50: 116.6, p85: 120.5, p97: 124.4 },
];

const CDC_HEIGHT_FOR_AGE_GIRLS_24_60: GrowthChartPoint[] = [
  { age: 24, p3: 80.0, p15: 83.2, p50: 86.4, p85: 89.6, p97: 92.9 },
  { age: 30, p3: 84.6, p15: 87.9, p50: 91.3, p85: 94.7, p97: 98.1 },
  { age: 36, p3: 89.0, p15: 92.6, p50: 96.1, p85: 99.7, p97: 103.3 },
  { age: 42, p3: 93.2, p15: 97.0, p50: 100.8, p85: 104.6, p97: 108.4 },
  { age: 48, p3: 97.3, p15: 101.3, p50: 105.3, p85: 109.3, p97: 113.3 },
  { age: 54, p3: 101.3, p15: 105.4, p50: 109.7, p85: 114.0, p97: 118.3 },
  { age: 60, p3: 105.1, p15: 109.4, p50: 113.9, p85: 118.4, p97: 122.9 },
];

// Utility function to interpolate between data points
function interpolatePercentile(
  age: number,
  chartData: GrowthChartPoint[],
  measurement: number
): number {
  // Find the two points to interpolate between
  let lowerPoint: GrowthChartPoint | null = null;
  let upperPoint: GrowthChartPoint | null = null;

  for (let i = 0; i < chartData.length - 1; i++) {
    if (age >= chartData[i].age && age <= chartData[i + 1].age) {
      lowerPoint = chartData[i];
      upperPoint = chartData[i + 1];
      break;
    }
  }

  // If age is outside the range, use nearest point
  if (!lowerPoint || !upperPoint) {
    if (age < chartData[0].age) {
      lowerPoint = upperPoint = chartData[0];
    } else {
      lowerPoint = upperPoint = chartData[chartData.length - 1];
    }
  }

  // Calculate percentile based on where measurement falls
  const percentiles = [3, 15, 50, 85, 97];
  const values = [lowerPoint.p3, lowerPoint.p15, lowerPoint.p50, lowerPoint.p85, lowerPoint.p97];

  // If we have two different points, interpolate the values
  if (lowerPoint !== upperPoint && lowerPoint && upperPoint) {
    const ageFraction = (age - lowerPoint.age) / (upperPoint.age - lowerPoint.age);
    for (let i = 0; i < values.length; i++) {
      const lowerVal = [
        lowerPoint.p3,
        lowerPoint.p15,
        lowerPoint.p50,
        lowerPoint.p85,
        lowerPoint.p97,
      ][i];
      const upperVal = [
        upperPoint.p3,
        upperPoint.p15,
        upperPoint.p50,
        upperPoint.p85,
        upperPoint.p97,
      ][i];
      values[i] = lowerVal + (upperVal - lowerVal) * ageFraction;
    }
  }

  // Find where the measurement falls in the percentile range
  if (measurement <= values[0]) return Math.max(1, (measurement / values[0]) * 3);
  if (measurement <= values[1])
    return 3 + ((measurement - values[0]) / (values[1] - values[0])) * 12;
  if (measurement <= values[2])
    return 15 + ((measurement - values[1]) / (values[2] - values[1])) * 35;
  if (measurement <= values[3])
    return 50 + ((measurement - values[2]) / (values[3] - values[2])) * 35;
  if (measurement <= values[4])
    return 85 + ((measurement - values[3]) / (values[4] - values[3])) * 12;

  return Math.min(99, 97 + ((measurement - values[4]) / values[4]) * 2);
}

// Function to get status interpretation from percentile
function getPercentileStatus(percentile: number, measurement: string): string {
  if (percentile < 3) return `${measurement} abaixo do esperado (< P3)`;
  if (percentile < 15) return `${measurement} no limite inferior (P3-P15)`;
  if (percentile <= 85) return `${measurement} dentro do esperado (P15-P85)`;
  if (percentile <= 97) return `${measurement} no limite superior (P85-P97)`;
  return `${measurement} acima do esperado (> P97)`;
}

// Adult height prediction using parental height method
function calculateAdultHeightPrediction(
  motherHeight: number,
  fatherHeight: number,
  gender: "male" | "female"
): { target: number; range: { min: number; max: number }; method: string } {
  let target: number;

  if (gender === "male") {
    target = (motherHeight + fatherHeight + 13) / 2;
  } else {
    target = (motherHeight + fatherHeight - 13) / 2;
  }

  return {
    target,
    range: {
      min: target - 8.5,
      max: target + 8.5,
    },
    method: "Altura média dos pais com correção por sexo",
  };
}

// Main calculation function for child percentiles
export function calculateChildPercentiles(params: ChildPercentilesParams): ChildPercentilesResult {
  const {
    birthDate,
    gender,
    weight,
    height,
    headCircumference,
    motherHeight,
    fatherHeight,
    isPremature = false,
    gestationalWeeks = 40,
  } = params;

  const today = new Date();
  const ageInDays = (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
  const ageInWeeks = Math.floor(ageInDays / 7);
  const ageInMonths = ageInDays / 30.44;

  // Calculate corrected age for premature babies
  let correctedAge = ageInMonths;
  if (isPremature && gestationalWeeks < 37) {
    const weeksEarly = 40 - gestationalWeeks;
    const correctionInDays = weeksEarly * 7;
    const correctedAgeInDays = ageInDays - correctionInDays;
    correctedAge = Math.max(0, correctedAgeInDays / 30.44);
  }

  const effectiveAge = isPremature && ageInMonths <= 24 ? correctedAge : ageInMonths;

  // Select appropriate growth charts
  let weightChart: GrowthChartPoint[];
  let heightChart: GrowthChartPoint[];
  let headChart: GrowthChartPoint[] | undefined;

  if (effectiveAge <= 24) {
    // WHO data for 0-24 months
    weightChart = gender === "male" ? WHO_WEIGHT_FOR_AGE_BOYS_0_24 : WHO_WEIGHT_FOR_AGE_GIRLS_0_24;
    heightChart = gender === "male" ? WHO_HEIGHT_FOR_AGE_BOYS_0_24 : WHO_HEIGHT_FOR_AGE_GIRLS_0_24;
    headChart =
      gender === "male" ? WHO_HEAD_CIRCUMFERENCE_BOYS_0_24 : WHO_HEAD_CIRCUMFERENCE_GIRLS_0_24;
  } else {
    // CDC data for 24-60 months
    weightChart =
      gender === "male" ? CDC_WEIGHT_FOR_AGE_BOYS_24_60 : CDC_WEIGHT_FOR_AGE_GIRLS_24_60;
    heightChart =
      gender === "male" ? CDC_HEIGHT_FOR_AGE_BOYS_24_60 : CDC_HEIGHT_FOR_AGE_GIRLS_24_60;
    // Head circumference not typically measured after 24 months
  }

  // Calculate percentiles
  const weightPercentile = Math.round(interpolatePercentile(effectiveAge, weightChart, weight));
  const heightPercentile = Math.round(interpolatePercentile(effectiveAge, heightChart, height));
  const headCircumferencePercentile =
    headCircumference && headChart && effectiveAge <= 24
      ? Math.round(interpolatePercentile(effectiveAge, headChart, headCircumference))
      : undefined;

  // Get status interpretations
  const weightStatus = getPercentileStatus(weightPercentile, "Peso");
  const heightStatus = getPercentileStatus(heightPercentile, "Altura");
  const headCircumferenceStatus = headCircumferencePercentile
    ? getPercentileStatus(headCircumferencePercentile, "Perímetro cefálico")
    : undefined;

  // Calculate BMI if child is over 24 months
  let nutritionalStatus: ChildPercentilesResult["nutritionalStatus"];
  if (effectiveAge >= 24) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let classification: string;
    let recommendation: string;

    if (bmi < 14) {
      classification = "Baixo peso severo";
      recommendation = "Consulte pediatra urgentemente para avaliação nutricional";
    } else if (bmi < 16) {
      classification = "Baixo peso";
      recommendation = "Consulte pediatra para orientação nutricional";
    } else if (bmi < 18) {
      classification = "Peso normal";
      recommendation = "Continue mantendo alimentação equilibrada";
    } else if (bmi < 20) {
      classification = "Sobrepeso";
      recommendation = "Atenção à alimentação e atividade física";
    } else {
      classification = "Obesidade";
      recommendation = "Consulte pediatra para programa de emagrecimento";
    }

    nutritionalStatus = {
      classification,
      bmi: Math.round(bmi * 10) / 10,
      recommendation,
    };
  } else {
    // For younger children, use weight-for-height assessment
    let classification: string;
    let recommendation: string;

    if (weightPercentile < 3) {
      classification = "Baixo peso para altura";
      recommendation = "Consulte pediatra para avaliação nutricional";
    } else if (weightPercentile > 97) {
      classification = "Alto peso para altura";
      recommendation = "Monitore crescimento com pediatra";
    } else {
      classification = "Peso adequado para altura";
      recommendation = "Continue com alimentação equilibrada";
    }

    nutritionalStatus = { classification, recommendation };
  }

  // Adult height prediction
  const adultHeightPrediction =
    motherHeight && fatherHeight
      ? calculateAdultHeightPrediction(motherHeight, fatherHeight, gender)
      : undefined;

  // Combine WHO and CDC data for complete charts (for visualization)
  const completeWeightChart =
    effectiveAge <= 24
      ? weightChart
      : [...weightChart.slice(0, -1), ...CDC_WEIGHT_FOR_AGE_BOYS_24_60];
  const completeHeightChart =
    effectiveAge <= 24
      ? heightChart
      : [...heightChart.slice(0, -1), ...CDC_HEIGHT_FOR_AGE_BOYS_24_60];

  return {
    ageInMonths: Math.round(ageInMonths * 10) / 10,
    ageInWeeks,
    correctedAge: isPremature && ageInMonths <= 24 ? Math.round(correctedAge * 10) / 10 : undefined,

    weightPercentile,
    heightPercentile,
    headCircumferencePercentile,

    weightStatus,
    heightStatus,
    headCircumferenceStatus,

    adultHeightPrediction,
    nutritionalStatus,

    chartData: {
      weightChart: completeWeightChart,
      heightChart: completeHeightChart,
      headCircumferenceChart: headChart,
      childPosition: {
        weight: { age: effectiveAge, value: weight, percentile: weightPercentile },
        height: { age: effectiveAge, value: height, percentile: heightPercentile },
        headCircumference:
          headCircumference && headCircumferencePercentile
            ? {
                age: effectiveAge,
                value: headCircumference,
                percentile: headCircumferencePercentile,
              }
            : undefined,
      },
    },
  };
}
