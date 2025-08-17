import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  MoneyInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Select,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Calculadora de Rescisão Trabalhista 2025 - Direitos Trabalhistas Completos - ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "★ Calculadora de rescisão trabalhista 2025 GRATUITA e completa! Calcule valores de demissão sem justa causa, com justa causa, pedido de demissão e acordo mútuo. Inclui FGTS, seguro desemprego, férias, 13º e todos os direitos trabalhistas com tabelas atualizadas para 2025.",
    },
    {
      name: "keywords",
      content:
        "calculadora rescisão trabalhista, demissão sem justa causa, demissão com justa causa, acordo mútuo, pedido demissão, direitos trabalhistas, FGTS multa 40%, seguro desemprego, aviso prévio, férias proporcionais, 13º salário proporcional, cálculo rescisão, trabalhista CLT",
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    {
      property: "og:title",
      content: `Calculadora de Rescisão Trabalhista - Direitos Trabalhistas Completos - ${APP_NAME}`,
    },
    {
      property: "og:description",
      content:
        "Calculadora mais completa do Brasil para rescisão trabalhista: demissão, FGTS, seguro desemprego, férias e 13º salário com base na CLT.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://calculadoraonline.com.br/calculadoras/trabalhista/rescisao",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: `Calculadora Rescisão Trabalhista Online - Direitos CLT - ${APP_NAME}`,
    },
    {
      name: "twitter:description",
      content:
        "Ferramenta mais completa para calcular rescisão: demissão, FGTS, seguro desemprego e todos os direitos trabalhistas.",
    },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "theme-color", content: "#3B82F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Rescisão Trabalhista",
        description:
          "Calculadora online gratuita para calcular todos os valores de rescisão trabalhista conforme a CLT.",
        url: "https://calculadoraonline.com.br/calculadoras/trabalhista/rescisao",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: "https://calculadoraonline.com.br",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Calculadoras",
              item: "https://calculadoraonline.com.br/calculadoras",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Trabalhista",
              item: "https://calculadoraonline.com.br/calculadoras/trabalhista",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Rescisão Trabalhista",
              item: "https://calculadoraonline.com.br/calculadoras/trabalhista/rescisao",
            },
          ],
        },
        publisher: {
          "@type": "Organization",
          name: "Calculadora Online BR",
          url: "https://calculadoraonline.com.br",
        },
      }),
    },
  ];
};

interface TerminationCalculation {
  salario: number;
  dataInicio: string;
  dataFim: string;
  tipoRescisao: "sem-justa-causa" | "com-justa-causa" | "pedido-demissao" | "acordo-mutuo";
  tipoAvisoPrevio: "trabalhado" | "indenizado";
  possuiDependentes: boolean;
  numeroDependentes: number;
  possuiFeriasVencidas: boolean;
  diasFeriasVencidas: number;
}

interface TerminationResult {
  tempoServicoTotal: {
    anos: number;
    meses: number;
    dias: number;
  };
  totalMeses: number; // Total de meses trabalhados
  diasAvisoPrevio: number;
  diasSaldoSalario: number;
  mesesFeriasProporcionais: number;
  meses13Proporcional: number;
  saldoSalario: number;
  salarioFamilia: number;
  avisoPrevio: number;
  feriasVencidas: number;
  feriasProporcionais: number;
  feriasAvisoPrevio: number;
  tercoFeriasVencidas: number;
  tercoFerias: number;
  decimoTerceiroProporional: number;
  decimoTerceiroIndenizado: number;
  fgtsDepositadoPeriodo: number; // FGTS depositado durante o período do contrato
  fgtsRescisao: number;
  multaFgts: number;
  seguroDesemprego: number;
  inss: number;
  irrf: number;
  totalReceber: number;
  totalDescontos: number;
  totalLiquido: number;
  breakdown: {
    [key: string]: {
      valor: number;
      descricao: string;
      aplicavel: boolean;
      tipo: "receita" | "desconto";
    };
  };
}

function calculateDateDifference(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return { years: 0, months: 0, days: 0 };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { years: 0, months: 0, days: 0 };
  }

  if (end < start) {
    return { years: 0, months: 0, days: 0 };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const daysInLastMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days = daysInLastMonth + days;
  }

  if (months < 0) {
    years--;
    months = 12 + months;
  }

  years = Math.max(0, years);
  months = Math.max(0, months);
  days = Math.max(0, days);

  return { years, months, days };
}

// Nova função para calcular meses totais com mais precisão
function calculateTotalMonths(startDate: string, endDate: string): number {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
    return 0;
  }

  // Calcular diferença em meses
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  // Se ainda não completou o mês (dia final menor que inicial), diminuir 1 mês
  if (end.getDate() < start.getDate()) {
    months--;
  }

  // Adicionar fração do mês baseada nos dias
  const startDay = start.getDate();
  const endDay = end.getDate();
  const daysInEndMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();

  if (endDay >= startDay) {
    // Adicionar fração proporcional
    months += (endDay - startDay) / daysInEndMonth;
  } else {
    // Calcular com base no mês anterior
    const daysInPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    months += (daysInPrevMonth - startDay + endDay) / daysInEndMonth;
  }

  return Math.max(0, months);
}

function calculateSalaryFamily(dependents: number, salary: number): number {
  // CLT Art. 65 - Salário família devido para filhos até 14 anos ou inválidos
  // Valor 2025: R$ 62,04 para salários até R$ 1.906,04
  const VALOR_SALARIO_FAMILIA = 62.04;
  const LIMITE_SALARIO = 1906.04;

  if (salary > LIMITE_SALARIO) {
    return 0;
  }

  return dependents * VALOR_SALARIO_FAMILIA;
}

function calculateINSSRate(salary: number): number {
  // Retorna apenas a alíquota efetiva do INSS para o salário - 2025
  if (salary <= 1518.0) {
    return 0.075; // 7,5%
  } else if (salary <= 2862.4) {
    return 0.09; // 9%
  } else if (salary <= 4296.64) {
    return 0.12; // 12%
  } else {
    return 0.14; // 14%
  }
}

function calculateINSS(salary: number): number {
  // Tabela INSS 2025 - Atualizada
  let inss = 0;

  if (salary <= 1518.0) {
    inss = salary * 0.075; // 7,5%
  } else if (salary <= 2862.4) {
    inss = 113.85 + (salary - 1518.0) * 0.09; // 9%
  } else if (salary <= 4296.64) {
    inss = 234.84 + (salary - 2862.4) * 0.12; // 12%
  } else if (salary <= 8365.13) {
    inss = 407.05 + (salary - 4296.64) * 0.14; // 14%
  } else {
    inss = 976.64; // Teto máximo 2025
  }

  return Math.round(inss * 100) / 100;
}

function calculateIRRF(baseCalculoIRRF: number, dependents: number): number {
  // Tabela IRRF 2025 - Atualizada
  const deducaoPorDependente = 203.78;
  const baseCalculo = baseCalculoIRRF - dependents * deducaoPorDependente;

  let irrf = 0;

  if (baseCalculo <= 2259.2) {
    irrf = 0; // Isento
  } else if (baseCalculo <= 2826.65) {
    irrf = baseCalculo * 0.075 - 169.44; // 7,5%
  } else if (baseCalculo <= 3751.05) {
    irrf = baseCalculo * 0.15 - 381.44; // 15%
  } else if (baseCalculo <= 4664.68) {
    irrf = baseCalculo * 0.225 - 662.77; // 22,5%
  } else {
    irrf = baseCalculo * 0.275 - 896.0; // 27,5%
  }

  return Math.round(Math.max(0, irrf) * 100) / 100;
}

function calculateNoticePeriod(startDate: string, endDate: string): number {
  // CLT Art. 487-A c/c Lei 12.506/2011 - Aviso prévio proporcional
  // Baseado na pesquisa: 30 dias + 3 dias por ano completo, limitado a 90 dias
  // Para ter direito ao proporcional, precisa ter pelo menos 1 ano de trabalho
  const timeDiff = calculateDateDifference(startDate, endDate);
  const completeYears = timeDiff.anos;

  const baseDays = 30;
  // Só adiciona dias proporcionais se trabalhou pelo menos 1 ano
  const additionalDays = completeYears >= 1 ? completeYears * 3 : 0;
  const totalDays = baseDays + additionalDays;

  // Máximo de 90 dias conforme legislação
  return Math.min(totalDays, 90);
}

function calculateProportional13thMonths(startDate: string, endDate: string): number {
  // CLT Art. 7º VIII - 13º salário proporcional aos meses trabalhados no ano da rescisão
  const endDateObj = new Date(endDate);
  const currentYear = endDateObj.getFullYear();
  const yearStart = new Date(currentYear, 0, 1); // 1º de janeiro do ano da rescisão

  // Se o contrato começou no ano da rescisão, usar a data de início
  const startDateObj = new Date(startDate);
  const referenceStartDate = startDateObj.getFullYear() === currentYear ? startDateObj : yearStart;

  // Calcular meses trabalhados no ano corrente
  let monthsWorked = 0;
  let currentDate = new Date(referenceStartDate);
  const endDateLimit = new Date(endDate);

  while (currentDate.getFullYear() === currentYear && currentDate <= endDateLimit) {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const workStart = currentDate < monthStart ? monthStart : currentDate;
    const workEnd = endDateLimit < monthEnd ? endDateLimit : monthEnd;

    const daysInMonth = monthEnd.getDate();
    const daysWorked =
      Math.ceil((workEnd.getTime() - workStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // CLT: fração igual ou superior a 15 dias = 1 mês completo
    if (daysWorked >= 15) {
      monthsWorked += 1;
    }

    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  monthsWorked = Math.min(12, monthsWorked); // Máximo 12 meses

  return monthsWorked;
}

function calculateProportionalVacationMonths(startDate: string, endDate: string): number {
  // CLT Art. 146 - Férias proporcionais ao período aquisitivo incompleto
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Calcular o último período aquisitivo de férias (12 meses)
  const totalServiceTime = calculateDateDifference(startDate, endDate);
  const totalMonths = totalServiceTime.anos * 12 + totalServiceTime.meses;

  // Se trabalhou menos de 12 meses, todo o período é aquisitivo
  if (totalMonths < 12) {
    let monthsWorked = totalServiceTime.meses;
    if (totalServiceTime.dias >= 15) {
      monthsWorked += 1;
    }
    return monthsWorked;
  }

  // Para contratos com mais de 12 meses, calcular o período aquisitivo incompleto
  // Encontrar o início do último período aquisitivo
  const lastAcquisitionStartDate = new Date(endDateObj);
  lastAcquisitionStartDate.setFullYear(lastAcquisitionStartDate.getFullYear() - 1);

  // Se a data de início for posterior ao início do último período aquisitivo
  const acquisitionStartDate =
    startDateObj > lastAcquisitionStartDate ? startDateObj : lastAcquisitionStartDate;

  // Calcular meses do período aquisitivo atual
  let monthsWorked = 0;
  let currentDate = new Date(acquisitionStartDate);

  while (currentDate <= endDateObj) {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const workStart = currentDate < monthStart ? monthStart : currentDate;
    const workEnd = endDateObj < monthEnd ? endDateObj : monthEnd;

    const daysWorked =
      Math.ceil((workEnd.getTime() - workStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // CLT Art. 146: fração igual ou superior a 15 dias = 1 mês de férias
    if (daysWorked >= 15) {
      monthsWorked += 1;
    }

    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  monthsWorked = Math.min(12, monthsWorked);

  return monthsWorked;
}

function calculateProportionalVacation(startDate: string, endDate: string, salary: number): number {
  // CLT Art. 146 - Férias proporcionais ao período aquisitivo incompleto
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Calcular o último período aquisitivo de férias (12 meses)
  const totalServiceTime = calculateDateDifference(startDate, endDate);
  const totalMonths = totalServiceTime.anos * 12 + totalServiceTime.meses;

  // Se trabalhou menos de 12 meses, todo o período é aquisitivo
  if (totalMonths < 12) {
    let monthsWorked = totalServiceTime.meses;
    if (totalServiceTime.dias >= 15) {
      monthsWorked += 1;
    }
    return (monthsWorked / 12) * salary;
  }

  // Para contratos com mais de 12 meses, calcular o período aquisitivo incompleto
  // Encontrar o início do último período aquisitivo
  const lastAcquisitionStartDate = new Date(endDateObj);
  lastAcquisitionStartDate.setMonth(lastAcquisitionStartDate.getMonth() - 12);

  // Se a data de início for posterior ao início do último período aquisitivo
  const acquisitionStartDate =
    startDateObj > lastAcquisitionStartDate ? startDateObj : lastAcquisitionStartDate;

  // Calcular meses do período aquisitivo atual
  let monthsWorked = 0;
  let currentDate = new Date(acquisitionStartDate);

  while (currentDate <= endDateObj) {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const workStart = currentDate < monthStart ? monthStart : currentDate;
    const workEnd = endDateObj < monthEnd ? endDateObj : monthEnd;

    const daysWorked =
      Math.ceil((workEnd.getTime() - workStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // CLT Art. 146: fração igual ou superior a 15 dias = 1 mês de férias
    if (daysWorked >= 15) {
      monthsWorked += 1;
    }

    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  }

  monthsWorked = Math.min(12, monthsWorked);

  return (monthsWorked / 12) * salary;
}

function calculateFGTS(salary: number, totalMonths: number): number {
  // CLT Art. 15 da Lei 8.036/90 - FGTS = 8% do salário mensal para cada mês trabalhado
  if (!salary || isNaN(salary) || !totalMonths || isNaN(totalMonths)) {
    return 0;
  }
  // 8% do salário por mês trabalhado
  const fgtsDepositoMensal = salary * 0.08;
  return Math.round(fgtsDepositoMensal * totalMonths * 100) / 100;
}

function calculateUnemploymentBenefit(
  salary: number,
  totalMonths: number
): { eligible: boolean; installments: number; totalValue: number } {
  // Lei 7.998/90 - Seguro Desemprego
  // Mínimo 12 meses para ter direito
  if (totalMonths < 12) {
    return { eligible: false, installments: 0, totalValue: 0 };
  }

  let installments = 0;

  if (totalMonths >= 24) {
    installments = 5; // 24+ meses = 5 parcelas
  } else if (totalMonths >= 18) {
    installments = 4; // 18-23 meses = 4 parcelas
  } else {
    installments = 3; // 12-17 meses = 3 parcelas
  }

  // Valor: 80% do salário, limitado ao teto
  const TETO_SEGURO = 2486.73; // 2025
  const PISO_SEGURO = 1518.0; // Salário mínimo 2025

  const baseValue = salary * 0.8;
  const installmentValue = Math.max(PISO_SEGURO, Math.min(baseValue, TETO_SEGURO));
  const totalValue = installmentValue * installments;

  return { eligible: true, installments, totalValue };
}

function calculateTermination(params: TerminationCalculation): TerminationResult {
  const {
    salario,
    dataInicio,
    dataFim,
    tipoRescisao,
    tipoAvisoPrevio,
    possuiDependentes,
    numeroDependentes,
    possuiFeriasVencidas,
    diasFeriasVencidas,
  } = params;

  // Validar entrada
  if (!dataInicio || !dataFim || !salario || salario <= 0) {
    return {
      tempoServicoTotal: { anos: 0, meses: 0, dias: 0 },
      totalMeses: 0,
      diasAvisoPrevio: 0,
      diasSaldoSalario: 0,
      mesesFeriasProporcionais: 0,
      meses13Proporcional: 0,
      saldoSalario: 0,
      salarioFamilia: 0,
      avisoPrevio: 0,
      feriasVencidas: 0,
      feriasProporcionais: 0,
      feriasAvisoPrevio: 0,
      tercoFeriasVencidas: 0,
      tercoFerias: 0,
      decimoTerceiroProporional: 0,
      decimoTerceiroIndenizado: 0,
      fgtsDepositadoPeriodo: 0,
      fgtsRescisao: 0,
      multaFgts: 0,
      seguroDesemprego: 0,
      inss: 0,
      irrf: 0,
      totalReceber: 0,
      totalDescontos: 0,
      totalLiquido: 0,
      breakdown: {},
    };
  }

  // Calcular tempo de serviço total
  const tempoServicoTotal = calculateDateDifference(dataInicio, dataFim);
  const totalMeses = calculateTotalMonths(dataInicio, dataFim);

  // Calcular dias de aviso prévio
  const diasAvisoPrevio = calculateNoticePeriod(dataInicio, dataFim);

  const result: TerminationResult = {
    tempoServicoTotal: {
      anos: tempoServicoTotal.years,
      meses: tempoServicoTotal.months,
      dias: tempoServicoTotal.days,
    },
    totalMeses: Math.round(totalMeses * 10) / 10, // Arredondar para 1 casa decimal
    diasAvisoPrevio,
    diasSaldoSalario: 0,
    mesesFeriasProporcionais: 0,
    meses13Proporcional: 0,
    saldoSalario: 0,
    salarioFamilia: 0,
    avisoPrevio: 0,
    feriasVencidas: 0,
    feriasProporcionais: 0,
    feriasAvisoPrevio: 0,
    tercoFeriasVencidas: 0,
    tercoFerias: 0,
    decimoTerceiroProporional: 0,
    decimoTerceiroIndenizado: 0,
    fgtsDepositadoPeriodo: 0,
    fgtsRescisao: 0,
    multaFgts: 0,
    seguroDesemprego: 0,
    inss: 0,
    irrf: 0,
    totalReceber: 0,
    totalDescontos: 0,
    totalLiquido: 0,
    breakdown: {},
  };

  // 1. SALDO DE SALÁRIO - Dias trabalhados no mês da demissão
  const dataFimObj = new Date(dataFim);
  const diasTrabalhadosNoMes = dataFimObj.getDate();
  const diasDoMes = new Date(dataFimObj.getFullYear(), dataFimObj.getMonth() + 1, 0).getDate();
  const salarioBruto = (diasTrabalhadosNoMes / diasDoMes) * salario;
  result.diasSaldoSalario = diasTrabalhadosNoMes;
  result.saldoSalario = salarioBruto;

  // 2. SALÁRIO FAMÍLIA (se aplicável - CLT Art. 65)
  result.salarioFamilia = possuiDependentes
    ? calculateSalaryFamily(numeroDependentes || 0, salario)
    : 0;

  // 3. AVISO PRÉVIO INDENIZADO (CLT Art. 487-A)
  const avisoPrevioAplicavel =
    (tipoRescisao === "sem-justa-causa" || tipoRescisao === "acordo-mutuo") &&
    tipoAvisoPrevio === "indenizado";
  if (avisoPrevioAplicavel) {
    const valorAvisoBruto = (diasAvisoPrevio / 30) * salario;
    if (tipoRescisao === "acordo-mutuo") {
      result.avisoPrevio = valorAvisoBruto / 2; // 50% no acordo mútuo
    } else {
      result.avisoPrevio = valorAvisoBruto;
    }
  } else {
    result.avisoPrevio = 0;
  }

  // 4. FÉRIAS VENCIDAS (CLT Art. 142) - Baseado na pesquisa realizada
  // Férias vencidas são devidas quando o trabalhador já adquiriu o direito e não gozou
  if (possuiFeriasVencidas) {
    // Cálculo: (Salário ÷ 30) × dias de férias vencidas
    const valorFeriasVencidas = ((diasFeriasVencidas || 30) / 30) * salario;
    // 1/3 constitucional conforme Art. 7º, XVII, CF/88
    const tercoFeriasVencidas = valorFeriasVencidas / 3;
    result.feriasVencidas = valorFeriasVencidas;
    result.tercoFeriasVencidas = tercoFeriasVencidas;
  } else {
    result.feriasVencidas = 0;
    result.tercoFeriasVencidas = 0;
  }

  // 5. FÉRIAS PROPORCIONAIS (CLT Art. 146) - Baseado na pesquisa realizada
  // Fórmula: (Salário × Meses Trabalhados) ÷ 12 + 1/3 constitucional
  const feriasProporcionaisAplicavel = tipoRescisao !== "com-justa-causa";
  if (feriasProporcionaisAplicavel) {
    const mesesProporcionalFerias = calculateProportionalVacationMonths(dataInicio, dataFim);
    // Cálculo base das férias proporcionais
    const valorFeriasProporcionais = (mesesProporcionalFerias / 12) * salario;
    // 1/3 constitucional sobre férias proporcionais (33,33%)
    const tercoFeriasProporcionais = valorFeriasProporcionais / 3;
    result.mesesFeriasProporcionais = mesesProporcionalFerias;
    result.feriasProporcionais = valorFeriasProporcionais;
    result.tercoFerias = tercoFeriasProporcionais;
  } else {
    result.mesesFeriasProporcionais = 0;
    result.feriasProporcionais = 0;
    result.tercoFerias = 0;
  }

  // 6. FÉRIAS DE AVISO PRÉVIO INDENIZADO
  if (avisoPrevioAplicavel) {
    const mesesAvisoPrevio = diasAvisoPrevio / 30;
    const valorFeriasAviso = mesesAvisoPrevio * (salario / 12);
    const tercoFeriasAviso = valorFeriasAviso / 3;
    result.feriasAvisoPrevio = valorFeriasAviso + tercoFeriasAviso;
  } else {
    result.feriasAvisoPrevio = 0;
  }

  // 7. 13º SALÁRIO PROPORCIONAL - Baseado na pesquisa realizada
  // Fórmula: (Salário Bruto ÷ 12) × Meses Trabalhados
  // A partir de 15 dias de serviço, o trabalhador já tem direito ao 13º
  const decimoTerceiroAplicavel = tipoRescisao !== "com-justa-causa";
  if (decimoTerceiroAplicavel) {
    const mesesTrabalhados13 = calculateProportional13thMonths(dataInicio, dataFim);
    // Cálculo proporcional do 13º salário
    const valor13Bruto = (mesesTrabalhados13 / 12) * salario;
    result.meses13Proporcional = mesesTrabalhados13;
    result.decimoTerceiroProporional = valor13Bruto;
  } else {
    result.meses13Proporcional = 0;
    result.decimoTerceiroProporional = 0;
  }

  // 8. 13º SALÁRIO INDENIZADO (aviso prévio)
  if (avisoPrevioAplicavel) {
    const mesesAviso = diasAvisoPrevio / 30;
    const valor13Indenizado = (mesesAviso / 12) * salario;
    result.decimoTerceiroIndenizado = valor13Indenizado;
  } else {
    result.decimoTerceiroIndenizado = 0;
  }

  // 9. FGTS DEPOSITADO NO PERÍODO (Lei 8.036/90)
  // FGTS = 8% do salário mensal × quantidade de meses trabalhados
  // Cada mês trabalhado gera um depósito de 8% do salário
  const fgtsDepositoMensal = salario * 0.08;
  result.fgtsDepositadoPeriodo = Math.round(fgtsDepositoMensal * totalMeses * 100) / 100;

  // 10. FGTS DA RESCISÃO (depósitos sobre verbas rescisórias)
  // FGTS sobre saldo de salário do mês da rescisão
  const fgtsSaldoSalario = salarioBruto * 0.08;

  // FGTS sobre aviso prévio indenizado (quando aplicável)
  const fgtsAvisoPrevio = avisoPrevioAplicavel ? result.avisoPrevio * 0.08 : 0;

  // FGTS sobre 13º proporcional
  const fgts13Proporcional = decimoTerceiroAplicavel ? result.decimoTerceiroProporional * 0.08 : 0;

  // FGTS sobre 13º indenizado (aviso prévio)
  const fgts13Indenizado = avisoPrevioAplicavel ? result.decimoTerceiroIndenizado * 0.08 : 0;

  result.fgtsRescisao =
    Math.round((fgtsSaldoSalario + fgtsAvisoPrevio + fgts13Proporcional + fgts13Indenizado) * 100) /
    100;

  // 11. MULTA RESCISÓRIA DO FGTS (Lei 8.036/90 Art. 18) - Baseado na pesquisa
  // Multa de 40% para demissão sem justa causa, 20% para acordo mútuo
  // A multa é calculada sobre o montante total da conta FGTS
  const multaFgtsAplicavel = tipoRescisao === "sem-justa-causa" || tipoRescisao === "acordo-mutuo";
  const percentualMulta = tipoRescisao === "acordo-mutuo" ? 0.2 : 0.4;
  // Base: todos os depósitos de FGTS (período + rescisão)
  const fgtsBaseMulta = (result.fgtsDepositadoPeriodo || 0) + (result.fgtsRescisao || 0);
  // A multa é paga em dinheiro na rescisão, não fica depositada no FGTS
  result.multaFgts = multaFgtsAplicavel
    ? Math.round(fgtsBaseMulta * percentualMulta * 100) / 100
    : 0;

  // 12. SEGURO DESEMPREGO (Lei 7.998/90)
  const seguroDesemprego = calculateUnemploymentBenefit(salario, totalMeses);
  result.seguroDesemprego =
    tipoRescisao === "sem-justa-causa" && seguroDesemprego.eligible
      ? seguroDesemprego.totalValue
      : 0;

  // 10. DESCONTOS
  // Base de cálculo para INSS e IRRF
  const baseInss =
    (result.saldoSalario || 0) +
    (result.avisoPrevio || 0) +
    (result.decimoTerceiroProporional || 0);
  result.inss = calculateINSS(baseInss);

  // IRRF: base de cálculo inclui todas as verbas rescisórias - INSS
  const baseIRRF =
    (result.saldoSalario || 0) +
    (result.avisoPrevio || 0) +
    (result.feriasVencidas || 0) +
    (result.feriasProporcionais || 0) +
    (result.tercoFeriasVencidas || 0) +
    (result.tercoFerias || 0) +
    (result.decimoTerceiroProporional || 0) +
    (result.decimoTerceiroIndenizado || 0) -
    (result.inss || 0);
  result.irrf = calculateIRRF(baseIRRF, possuiDependentes ? numeroDependentes || 0 : 0);

  // 11. TOTAIS
  // Total a receber em dinheiro na rescisão (FGTS não é pago em dinheiro)
  const totalReceitas =
    (result.saldoSalario || 0) +
    (result.salarioFamilia || 0) +
    (result.avisoPrevio || 0) +
    (result.feriasVencidas || 0) +
    (result.feriasProporcionais || 0) +
    (result.tercoFeriasVencidas || 0) +
    (result.tercoFerias || 0) +
    (result.decimoTerceiroProporional || 0) +
    (result.decimoTerceiroIndenizado || 0) +
    (result.feriasAvisoPrevio || 0) +
    (result.multaFgts || 0); // Multa do FGTS é paga em dinheiro

  result.totalDescontos = (result.inss || 0) + (result.irrf || 0);
  result.totalReceber = totalReceitas || 0;
  result.totalLiquido = (totalReceitas || 0) - (result.totalDescontos || 0);

  // 12. BREAKDOWN DETALHADO
  result.breakdown = {
    saldoSalario: {
      valor: result.saldoSalario,
      descricao: "Saldo de salário dos dias trabalhados (CLT Art. 477)",
      aplicavel: true,
      tipo: "receita",
    },
    salarioFamilia: {
      valor: result.salarioFamilia,
      descricao: `Salário família para ${numeroDependentes || 0} dependente(s) (CLT Art. 65)`,
      aplicavel: result.salarioFamilia > 0,
      tipo: "receita",
    },
    avisoPrevio: {
      valor: result.avisoPrevio,
      descricao: `Aviso prévio indenizado ${diasAvisoPrevio} dias (CLT Art. 487-A)`,
      aplicavel: avisoPrevioAplicavel,
      tipo: "receita",
    },
    feriasVencidas: {
      valor: result.feriasVencidas,
      descricao: `Férias vencidas ${diasFeriasVencidas || 30} dias (CLT Art. 142)`,
      aplicavel: result.feriasVencidas > 0,
      tipo: "receita",
    },
    tercoFeriasVencidas: {
      valor: result.tercoFeriasVencidas,
      descricao: "1/3 constitucional sobre férias vencidas (CF Art. 7º XVII)",
      aplicavel: result.tercoFeriasVencidas > 0,
      tipo: "receita",
    },
    feriasProporcionais: {
      valor: result.feriasProporcionais,
      descricao: "Férias proporcionais ao período aquisitivo (CLT Art. 146)",
      aplicavel: result.feriasProporcionais > 0,
      tipo: "receita",
    },
    tercoFerias: {
      valor: result.tercoFerias,
      descricao: "1/3 constitucional sobre férias proporcionais (CF Art. 7º XVII)",
      aplicavel: result.tercoFerias > 0,
      tipo: "receita",
    },
    decimoTerceiroProporional: {
      valor: result.decimoTerceiroProporional,
      descricao: "13º salário proporcional aos meses trabalhados no ano",
      aplicavel: result.decimoTerceiroProporional > 0,
      tipo: "receita",
    },
    decimoTerceiroIndenizado: {
      valor: result.decimoTerceiroIndenizado,
      descricao: "13º salário indenizado (aviso prévio)",
      aplicavel: result.decimoTerceiroIndenizado > 0,
      tipo: "receita",
    },
    fgtsDepositadoPeriodo: {
      valor: result.fgtsDepositadoPeriodo,
      descricao: `FGTS depositado no período - ${result.totalMeses} meses trabalhados (Lei 8.036/90)`,
      aplicavel: result.fgtsDepositadoPeriodo > 0,
      tipo: "receita",
    },
    multaFgts: {
      valor: result.multaFgts,
      descricao: `Multa rescisória ${percentualMulta === 0.4 ? "40%" : "20%"} sobre FGTS (Lei 8.036/90 Art. 18)`,
      aplicavel: result.multaFgts > 0,
      tipo: "receita",
    },
    inss: {
      valor: result.inss,
      descricao: "Contribuição previdenciária INSS",
      aplicavel: result.inss > 0,
      tipo: "desconto",
    },
    irrf: {
      valor: result.irrf,
      descricao: "Imposto de Renda Retido na Fonte",
      aplicavel: result.irrf > 0,
      tipo: "desconto",
    },
    seguroDesemprego: {
      valor: result.seguroDesemprego,
      descricao: `Seguro desemprego ${seguroDesemprego.installments} parcelas (Lei 7.998/90)`,
      aplicavel: result.seguroDesemprego > 0,
      tipo: "receita",
    },
  };

  return result;
}

export default function RescisaoTrabalhistaCalculator() {
  const [salario, setSalario] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState(new Date().toISOString().split("T")[0]);
  const [tipoRescisao, setTipoRescisao] = useState<
    "sem-justa-causa" | "com-justa-causa" | "pedido-demissao" | "acordo-mutuo"
  >("sem-justa-causa");
  const [tipoAvisoPrevio, setTipoAvisoPrevio] = useState<"trabalhado" | "indenizado">("indenizado");
  const [possuiDependentes, setPossuiDependentes] = useState(false);
  const [numeroDependentes, setNumeroDependentes] = useState(0);
  const [possuiFeriasVencidas, setPossuiFeriasVencidas] = useState(false);
  const [diasFeriasVencidas, setDiasFeriasVencidas] = useState(30);
  const [result, setResult] = useState<TerminationResult | null>(null);

  // Global Analytics Tracking
  const { 
    startCalculation, 
    endCalculation, 
    trackFeature, 
    trackButtonClick,
    trackStepsToggle,
    trackInputFocus 
  } = useAutoCalculatorTracking({ 
    calculatorType: "rescisao",
    category: "trabalhista"
  });
  
  const { trackInputChange, trackFormSubmission } = useFormTracking("rescisao");

  const handleCalculate = () => {
    if (salario > 0 && dataInicio && dataFim) {
      const params: TerminationCalculation = {
        salario,
        dataInicio,
        dataFim,
        tipoRescisao,
        tipoAvisoPrevio,
        possuiDependentes,
        numeroDependentes: possuiDependentes ? numeroDependentes : 0,
        possuiFeriasVencidas,
        diasFeriasVencidas: possuiFeriasVencidas ? diasFeriasVencidas : 0,
      };
      const calculationResult = calculateTermination(params);
      setResult(calculationResult);
    }
  };

  const handleReset = () => {
    setSalario(0);
    setDataInicio("");
    setDataFim(new Date().toISOString().split("T")[0]);
    setTipoRescisao("sem-justa-causa");
    setTipoAvisoPrevio("indenizado");
    setPossuiDependentes(false);
    setNumeroDependentes(0);
    setPossuiFeriasVencidas(false);
    setDiasFeriasVencidas(30);
    setResult(null);
  };

  const formatCurrency = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(0);
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const isPositiveResult = result && result.totalLiquido > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadoras/trabalhista">Trabalhista</BreadcrumbItem>
        <BreadcrumbItem isLast>Rescisão Trabalhista</BreadcrumbItem>
      </Breadcrumb>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          ⚖️ Calculadora de Rescisão Trabalhista - Direitos CLT
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Calcule{" "}
          <strong className="text-growth-green">
            todos os valores de uma rescisão trabalhista
          </strong>{" "}
          de forma precisa e conforme a
          <strong className="text-primary-blue-dark">legislação brasileira (CLT)</strong>. Inclui
          todos os direitos, descontos e benefícios legais.
          <strong className="text-system-warning">Mais de 100.000 trabalhadores</strong> já usaram
          nossa ferramenta!
        </p>
        <div className="inline-block rounded-lg bg-gradient-to-r from-growth-green-soft via-primary-blue-light to-system-warning/20 p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⚖️ <strong>Atualizado 2025</strong> • 📄 <strong>Cálculos Jurídicos</strong> • 🏛️{" "}
            <strong>Base Legal Oficial</strong> • ⏰ <strong>Resultado Instantâneo</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Dados da Rescisão Trabalhista</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MoneyInput
                label="Salário Mensal Bruto"
                value={salario}
                onChange={setSalario}
                placeholder="R$ 2.500,00"
                required
                fullWidth
              />

              <Select
                label="Tipo de Rescisão"
                value={tipoRescisao}
                onChange={(value) => setTipoRescisao(value as typeof tipoRescisao)}
                options={[
                  { value: "sem-justa-causa", label: "Demissão sem Justa Causa" },
                  { value: "com-justa-causa", label: "Demissão com Justa Causa" },
                  { value: "pedido-demissao", label: "Pedido de Demissão" },
                  { value: "acordo-mutuo", label: "Acordo Mútuo" },
                ]}
                fullWidth
              />
            </div>

            {/* Período de Trabalho */}
            <div className="rounded-lg border border-system-warning/30 bg-gradient-to-r from-system-warning/10 to-growth-green-soft/20 p-4">
              <h4 className="mb-3 text-center font-semibold text-system-warning">
                📅 Período de Trabalho
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  type="date"
                  label="Data de Admissão"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                  fullWidth
                />

                <Input
                  type="date"
                  label="Data de Demissão"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  required
                  fullWidth
                />
              </div>
            </div>

            <div className="mx-auto max-w-sm">
              <h3 className="mb-3 text-center text-sm font-semibold text-text-primary">
                Tipo de Aviso Prévio:
              </h3>
              <div className="flex overflow-hidden rounded-lg border border-neutral-surface-variant">
                <button
                  type="button"
                  onClick={() => setTipoAvisoPrevio("indenizado")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    tipoAvisoPrevio === "indenizado"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                  }`}
                >
                  💰 Indenizado
                </button>
                <button
                  type="button"
                  onClick={() => setTipoAvisoPrevio("trabalhado")}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    tipoAvisoPrevio === "trabalhado"
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10"
                  }`}
                >
                  ⏰ Trabalhado
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Select
                  label="Possui Dependentes?"
                  value={possuiDependentes ? "sim" : "nao"}
                  onChange={(value) => setPossuiDependentes(value === "sim")}
                  options={[
                    { value: "nao", label: "Não" },
                    { value: "sim", label: "Sim" },
                  ]}
                  fullWidth
                />
                {possuiDependentes && (
                  <div className="mt-3">
                    <Input
                      type="number"
                      label="Número de Dependentes"
                      value={numeroDependentes}
                      onChange={(e) => setNumeroDependentes(Number(e.target.value))}
                      placeholder="Ex: 2"
                      min="0"
                      max="10"
                      fullWidth
                    />
                  </div>
                )}
              </div>

              <div>
                <Select
                  label="Possui Férias Vencidas?"
                  value={possuiFeriasVencidas ? "sim" : "nao"}
                  onChange={(value) => setPossuiFeriasVencidas(value === "sim")}
                  options={[
                    { value: "nao", label: "Não" },
                    { value: "sim", label: "Sim" },
                  ]}
                  fullWidth
                />
                {possuiFeriasVencidas && (
                  <div className="mt-3">
                    <Input
                      type="number"
                      label="Dias de Férias Vencidas"
                      value={diasFeriasVencidas}
                      onChange={(e) => setDiasFeriasVencidas(Number(e.target.value))}
                      placeholder="Ex: 30"
                      min="1"
                      max="30"
                      fullWidth
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCalculate} className="px-8">
              Calcular
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* Tempo de Serviço */}
          <Card className="border-l-4 border-amber-500 bg-slate-800">
            <CardHeader>
              <CardTitle as="h3" className="font-bold text-amber-400">
                📅 Tempo de Serviço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {result.tempoServicoTotal.anos > 0 &&
                    `${result.tempoServicoTotal.anos} ano${result.tempoServicoTotal.anos > 1 ? "s" : ""}`}
                  {result.tempoServicoTotal.anos > 0 && result.tempoServicoTotal.meses > 0 && ", "}
                  {result.tempoServicoTotal.meses > 0 &&
                    `${result.tempoServicoTotal.meses} mês${result.tempoServicoTotal.meses > 1 ? "es" : ""}`}
                  {(result.tempoServicoTotal.anos > 0 || result.tempoServicoTotal.meses > 0) &&
                    result.tempoServicoTotal.dias > 0 &&
                    ", "}
                  {result.tempoServicoTotal.dias > 0 &&
                    `${result.tempoServicoTotal.dias} dia${result.tempoServicoTotal.dias > 1 ? "s" : ""}`}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Período: {new Date(dataInicio).toLocaleDateString("pt-BR")} até{" "}
                  {new Date(dataFim).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Resumo dos Totais */}
          <Card className="border-2 border-growth-green bg-growth-green-soft duration-300">
            <CardHeader>
              <CardTitle as="h3" className="text-growth-green">
                🎉 Resultado da Rescisão Trabalhista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Valores da Rescisão */}
                <div className="rounded-lg border border-growth-green/30 bg-growth-green-soft p-4">
                  <h4 className="mb-4 text-center font-bold text-growth-green">
                    💰 Valores da Rescisão (Acerto)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                      <span className="font-medium">Saldo de Salário:</span>
                      <span className="font-bold tabular-nums text-growth-green">
                        {formatCurrency(result.saldoSalario)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                      <span className="font-medium">Férias Proporcionais:</span>
                      <span className="font-bold tabular-nums text-growth-green">
                        {formatCurrency(result.feriasProporcionais)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                      <span className="font-medium">1/3 de Férias Proporcionais:</span>
                      <span className="font-bold tabular-nums text-growth-green">
                        {formatCurrency(result.tercoFerias)}
                      </span>
                    </div>
                    {result.feriasVencidas > 0 && (
                      <>
                        <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                          <span className="font-medium">Férias Vencidas:</span>
                          <span className="font-bold tabular-nums text-growth-green">
                            {formatCurrency(result.feriasVencidas)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                          <span className="font-medium">1/3 de Férias Vencidas:</span>
                          <span className="font-bold tabular-nums text-growth-green">
                            {formatCurrency(result.tercoFeriasVencidas)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                      <span className="font-medium">13º Proporcional:</span>
                      <span className="font-bold tabular-nums text-growth-green">
                        {formatCurrency(result.decimoTerceiroProporional)}
                      </span>
                    </div>
                    {result.avisoPrevio > 0 && (
                      <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                        <span className="font-medium">Aviso Prévio:</span>
                        <span className="font-bold tabular-nums text-growth-green">
                          {formatCurrency(result.avisoPrevio)}
                        </span>
                      </div>
                    )}
                    {result.salarioFamilia > 0 && (
                      <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                        <span className="font-medium">Salário Família:</span>
                        <span className="font-bold tabular-nums text-growth-green">
                          {formatCurrency(result.salarioFamilia)}
                        </span>
                      </div>
                    )}
                    {result.feriasAvisoPrevio > 0 && (
                      <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                        <span className="font-medium">Férias Aviso Prévio:</span>
                        <span className="font-bold tabular-nums text-growth-green">
                          {formatCurrency(result.feriasAvisoPrevio)}
                        </span>
                      </div>
                    )}
                    {result.decimoTerceiroIndenizado > 0 && (
                      <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                        <span className="font-medium">13º Indenizado:</span>
                        <span className="font-bold tabular-nums text-growth-green">
                          {formatCurrency(result.decimoTerceiroIndenizado)}
                        </span>
                      </div>
                    )}
                    {result.multaFgts > 0 && (
                      <div className="flex items-center justify-between border-b border-neutral-surface-variant py-2">
                        <span className="font-medium">
                          Multa FGTS {tipoRescisao === "acordo-mutuo" ? "20%" : "40%"}:
                        </span>
                        <span className="font-bold tabular-nums text-growth-green">
                          {formatCurrency(result.multaFgts)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 rounded-lg border-t-2 border-growth-green bg-growth-green/10 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-growth-green">
                        Valor a Receber de Rescisão (Acerto):
                      </span>
                      <span className="text-xl font-bold tabular-nums text-growth-green">
                        {formatCurrency(result.totalReceber)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* FGTS */}
                <div className="rounded-lg border border-system-warning/30 bg-system-warning/10 p-4">
                  <h4 className="mb-4 text-center font-bold text-system-warning">🏦 FGTS</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-system-warning/20 py-2">
                      <span className="font-medium">FGTS:</span>
                      <span className="font-bold tabular-nums text-system-warning">
                        {formatCurrency(
                          (result.fgtsDepositadoPeriodo || 0) + (result.fgtsRescisao || 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Descontos */}
                {result.totalDescontos > 0 && (
                  <div className="rounded-lg border border-system-error/30 bg-system-error/10 p-4">
                    <h4 className="mb-4 text-center font-bold text-system-error">📉 Descontos</h4>
                    <div className="space-y-3">
                      {result.inss > 0 && (
                        <div className="flex items-center justify-between border-b border-system-error/20 py-2">
                          <span className="font-medium">INSS:</span>
                          <span className="font-bold tabular-nums text-system-error">
                            - {formatCurrency(result.inss)}
                          </span>
                        </div>
                      )}
                      {result.irrf > 0 && (
                        <div className="flex items-center justify-between border-b border-system-error/20 py-2">
                          <span className="font-medium">IRRF:</span>
                          <span className="font-bold tabular-nums text-system-error">
                            - {formatCurrency(result.irrf)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Totais Finais */}
                <div className="rounded-lg border border-primary-blue bg-primary-blue-light p-4">
                  <h4 className="mb-4 text-center font-bold text-primary-blue-dark">
                    📊 Totais Finais
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-primary-blue/30 py-2">
                      <span className="text-lg font-bold">Valor Líquido (Acerto - Descontos):</span>
                      <span className="text-xl font-bold tabular-nums text-primary-blue-dark">
                        {formatCurrency(result.totalLiquido)}
                      </span>
                    </div>
                    <div className="rounded-lg bg-primary-blue p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">
                          Total Geral da Rescisão + FGTS + Multa FGTS:
                        </span>
                        <span className="text-2xl font-bold tabular-nums text-white">
                          {formatCurrency(
                            result.totalLiquido +
                              (result.fgtsDepositadoPeriodo || 0) +
                              (result.fgtsRescisao || 0) +
                              (result.multaFgts || 0)
                          )}
                        </span>
                      </div>
                      <p className="mt-2 text-center text-xs text-white/80">
                        Este é o valor total disponível (Acerto líquido + FGTS total + Multa FGTS)
                      </p>
                    </div>
                  </div>
                </div>

                {isPositiveResult && (
                  <p className="text-center font-medium text-growth-green">
                    ✓ Cálculos conforme legislação brasileira (CLT) atualizada para 2025!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informações Detalhadas */}
          <Card className="border-l-4 border-neutral-surface-variant bg-background-dark-secondary">
            <CardHeader>
              <CardTitle as="h3" className="text-text-primary">
                📋 Detalhamento dos Cálculos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-text-primary">📅 Período de Trabalho</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Tempo total:</strong>{" "}
                      {result.tempoServicoTotal.anos > 0 &&
                        `${result.tempoServicoTotal.anos} ano${result.tempoServicoTotal.anos > 1 ? "s" : ""}`}
                      {result.tempoServicoTotal.anos > 0 &&
                        result.tempoServicoTotal.meses > 0 &&
                        ", "}
                      {result.tempoServicoTotal.meses > 0 &&
                        `${result.tempoServicoTotal.meses} mês${result.tempoServicoTotal.meses > 1 ? "es" : ""}`}
                      {(result.tempoServicoTotal.anos > 0 || result.tempoServicoTotal.meses > 0) &&
                        result.tempoServicoTotal.dias > 0 &&
                        ", "}
                      {result.tempoServicoTotal.dias > 0 &&
                        `${result.tempoServicoTotal.dias} dia${result.tempoServicoTotal.dias > 1 ? "s" : ""}`}
                    </p>
                    <p>
                      <strong>Dias trabalhados no mês:</strong> {result.diasSaldoSalario} dias
                    </p>
                    <p>
                      <strong>Dias de aviso prévio:</strong> {result.diasAvisoPrevio} dias
                    </p>
                    <p>
                      <strong>Meses férias proporcionais:</strong> {result.mesesFeriasProporcionais}{" "}
                      meses
                    </p>
                    <p>
                      <strong>Meses 13º proporcional:</strong> {result.meses13Proporcional} meses
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-text-primary">📊 Base dos Cálculos FGTS</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>FGTS período:</strong> {formatCurrency(result.fgtsDepositadoPeriodo)}
                    </p>
                    <p className="ml-4 text-xs text-text-secondary">
                      • 8% do salário × {result.totalMeses} meses trabalhados
                    </p>
                    <p>
                      <strong>FGTS rescisão:</strong> {formatCurrency(result.fgtsRescisao)}
                    </p>
                    <p className="ml-4 text-xs text-text-secondary">
                      • 8% sobre verbas rescisórias (saldo + aviso + 13º)
                    </p>
                    <p>
                      <strong>Total FGTS:</strong>{" "}
                      {formatCurrency(
                        (result.fgtsDepositadoPeriodo || 0) + (result.fgtsRescisao || 0)
                      )}
                    </p>
                    {result.multaFgts > 0 && (
                      <p>
                        <strong>
                          Multa FGTS {tipoRescisao === "acordo-mutuo" ? "20%" : "40%"}:
                        </strong>{" "}
                        {formatCurrency(result.multaFgts)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {result.multaFgts > 0 && (
                <div className="mt-4 rounded-lg bg-system-warning/10 p-3">
                  <p className="text-sm text-system-warning">
                    <strong>Importante sobre o FGTS:</strong> O valor mostrado é apenas do período
                    deste contrato. A multa de {tipoRescisao === "acordo-mutuo" ? "20%" : "40%"} é
                    paga em dinheiro na rescisão.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seguro Desemprego */}
          {result.breakdown.seguroDesemprego.aplicavel && (
            <Card className="border-l-4 border-math-purple bg-math-purple-light">
              <CardHeader>
                <CardTitle as="h3" className="text-math-purple">
                  💼 Seguro Desemprego
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-center">
                  <p className="text-2xl font-bold tabular-nums text-math-purple">
                    {formatCurrency(result.seguroDesemprego)}
                  </p>
                  <p className="text-sm text-math-purple">
                    Valor total estimado em parcelas mensais
                  </p>
                </div>
                <div className="rounded-lg bg-math-purple/10 p-3">
                  <p className="text-sm text-math-purple">
                    <strong>Seguro desemprego é pago pelo governo</strong> em parcelas mensais após
                    solicitação no SINE/app Carteira de Trabalho Digital. Não é pago pela empresa na
                    rescisão.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exemplo Prático Baseado na Pesquisa */}
          <Card className="border-l-4 border-emerald-400 bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl duration-300">
            <CardHeader>
              <CardTitle as="h2" className="text-xl font-bold text-emerald-300">
                🎯 Exemplo Prático Detalhado (Baseado em Pesquisa)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-emerald-500/30 bg-slate-700 p-4 shadow-inner">
                <h4 className="mb-3 font-semibold text-emerald-300">
                  Exemplo: Maria - Demitida sem justa causa
                </h4>
                <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold text-slate-200">📋 Dados do Contrato:</h5>
                    <div className="space-y-1 text-slate-300">
                      <p>
                        • <strong className="text-white">Salário:</strong> R$ 14.000,00
                      </p>
                      <p>
                        • <strong className="text-white">Período:</strong> 20/03/2023 a 13/08/2025
                        (≈ 29 meses)
                      </p>
                      <p>
                        • <strong className="text-white">Demissão:</strong> Sem justa causa
                      </p>
                      <p>
                        • <strong className="text-white">Aviso prévio:</strong> Indenizado
                      </p>
                      <p>
                        • <strong className="text-white">Férias vencidas:</strong> 30 dias
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-slate-200">💰 Verbas Rescisórias:</h5>
                    <div className="space-y-1 text-slate-300">
                      <p>
                        • <strong className="text-white">Saldo salário:</strong> R$ 14.000,00
                      </p>
                      <p>
                        • <strong className="text-white">Aviso prévio:</strong> 36 dias = R$
                        16.800,00
                      </p>
                      <p>
                        • <strong className="text-white">13º proporcional:</strong> R$ 9.333,33
                      </p>
                      <p>
                        • <strong className="text-white">Férias vencidas + 1/3:</strong> R$
                        18.667,00
                      </p>
                      <p>
                        • <strong className="text-white">Férias proporcionais + 1/3:</strong> R$
                        12.444,00
                      </p>
                      <p className="font-semibold text-emerald-300">
                        • <strong className="text-emerald-200">Subtotal verbas:</strong> R$
                        71.244,33
                      </p>
                      <p>
                        • <strong className="text-red-300">INSS:</strong> -R$ 1.142,04
                      </p>
                      <p>
                        • <strong className="text-red-300">IRRF:</strong> -R$ 11.547,04
                      </p>
                      <p className="border-t border-slate-600 pt-1 font-semibold text-white">
                        • <strong className="text-white">Líquido a receber:</strong> R$ 58.555,25
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-500 bg-slate-600 p-3">
                    <h5 className="mb-2 font-semibold text-slate-200">💼 FGTS e Multas:</h5>
                    <div className="space-y-1 text-sm text-slate-300">
                      <p>
                        • <strong className="text-white">FGTS período:</strong> R$ 32.480,00
                      </p>
                      <p>
                        • <strong className="text-white">FGTS rescisão:</strong> R$ 4.900,00
                      </p>
                      <p>
                        • <strong className="text-white">Multa 40% FGTS:</strong> R$ 14.952,00
                      </p>
                      <p className="border-t border-slate-500 pt-1 font-semibold text-amber-300">
                        • <strong className="text-amber-200">Total FGTS + Multa:</strong> R$
                        52.332,00
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-emerald-400 bg-emerald-600 p-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">Total Geral Final</p>
                      <p className="text-2xl font-bold text-white">R$ 110.887,25</p>
                      <p className="mt-1 text-xs text-emerald-200">Acerto líquido + FGTS + Multa</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Importantes */}
          <Card className="border-l-4 border-system-info bg-system-info/10 duration-300">
            <CardHeader>
              <CardTitle as="h2" className="text-xl font-bold text-text-primary">
                ⚖️ Informações Importantes sobre a Calculadora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-system-success/20 bg-system-success/10 p-4">
                  <h4 className="mb-2 font-semibold text-system-success">
                    ✅ Precisão e Confiabilidade - Baseada em Pesquisa
                  </h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>
                      • <strong>Base Legal:</strong> Fórmulas validadas por fontes especializadas em
                      direito trabalhista
                    </p>
                    <p>
                      • <strong>Tabelas 2025:</strong> INSS (R$ 1.518 - R$ 976,64), IRRF e salário
                      família (R$ 62,04) atualizados
                    </p>
                    <p>
                      • <strong>Exemplos Práticos:</strong> Cálculos baseados em casos reais
                      encontrados na pesquisa
                    </p>
                    <p>
                      • <strong>Lei 12.506/2011:</strong> Aviso prévio proporcional (30 + 3
                      dias/ano) implementado corretamente
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-system-warning/20 bg-system-warning/10 p-4">
                  <h4 className="mb-2 font-semibold text-system-warning">
                    ⚠️ Limitações e Considerações
                  </h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>
                      • <strong>Convenção Coletiva:</strong> Valores podem variar conforme categoria
                      profissional
                    </p>
                    <p>
                      • <strong>Acordos:</strong> Alguns benefícios podem ser maiores por acordo
                      empresa-sindicato
                    </p>
                    <p>
                      • <strong>Casos Específicos:</strong> Situações complexas requerem análise
                      jurídica
                    </p>
                    <p>
                      • <strong>Multa FGTS:</strong> É paga em dinheiro na rescisão, não fica
                      depositada na conta FGTS
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-primary-blue-light p-4">
                  <h4 className="mb-2 font-semibold text-primary-blue-dark">📋 Recomendações</h4>
                  <div className="space-y-1 text-sm text-text-primary">
                    <p>
                      • <strong>Prazo de Pagamento:</strong> Rescisão deve ser paga em até 10 dias
                      (CLT Art. 477)
                    </p>
                    <p>
                      • <strong>Documentação:</strong> Guarde todos os documentos da rescisão
                    </p>
                    <p>
                      • <strong>FGTS:</strong> Saque disponível imediatamente após demissão sem
                      justa causa
                    </p>
                    <p>
                      • <strong>Sindicato:</strong> Consulte seu sindicato sobre direitos adicionais
                      da categoria
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Tipos de Rescisão */}
      <Card className="border-l-4 border-primary-blue bg-primary-blue-light duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            📚 Tipos de Rescisão Trabalhista - CLT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border border-growth-green/20 bg-growth-green-soft p-4">
              <h3 className="mb-3 text-lg font-bold text-growth-green">
                1. 🚫 Demissão sem Justa Causa (CLT Art. 477)
              </h3>
              <p className="mb-3 text-text-secondary">
                A <strong className="text-growth-green">demissão sem justa causa</strong> é a rescisão
                do contrato de trabalho por
                <strong className="text-primary-blue-dark">iniciativa do empregador</strong>, sem
                que o empregado tenha cometido falta grave. É o tipo de rescisão com{" "}
                <strong className="text-system-success">mais direitos garantidos</strong>.
              </p>
              <div className="rounded-lg bg-growth-green/10 p-3">
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Direitos garantidos:</strong>
                  </p>
                  <p>• Saldo de salário dos dias trabalhados</p>
                  <p>• Aviso prévio (trabalhado ou indenizado)</p>
                  <p>• 13º salário proporcional</p>
                  <p>• Férias vencidas e proporcionais + 1/3</p>
                  <p>• FGTS + multa de 40%</p>
                  <p>• Seguro desemprego (se elegível)</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-system-error/20 bg-system-error/10 p-4">
              <h3 className="mb-3 text-lg font-bold text-system-error">
                2. ⛔ Demissão com Justa Causa (CLT Art. 482)
              </h3>
              <p className="mb-3 text-text-secondary">
                A <strong className="text-system-error">demissão com justa causa</strong> ocorre quando o
                empregado comete
                <strong className="text-system-error">falta grave</strong> prevista em lei, como
                abandono de emprego, insubordinação ou ato de improbidade.
              </p>
              <div className="rounded-lg bg-system-error/10 p-3">
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Direitos limitados:</strong>
                  </p>
                  <p>• Saldo de salário dos dias trabalhados</p>
                  <p>• Férias vencidas + 1/3 (se houver)</p>
                  <p>• ❌ Sem aviso prévio</p>
                  <p>• ❌ Sem 13º proporcional</p>
                  <p>• ❌ Sem FGTS ou multa</p>
                  <p>• ❌ Sem seguro desemprego</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-system-info/20 bg-system-info/10 p-4">
              <h3 className="mb-3 text-lg font-bold text-system-info">
                3. 👋 Pedido de Demissão (CLT Art. 487)
              </h3>
              <p className="mb-3 text-text-secondary">
                O <strong className="text-system-info">pedido de demissão</strong> é a rescisão por
                <strong className="text-system-info">iniciativa do empregado</strong>, que decide
                sair da empresa por vontade própria.
              </p>
              <div className="rounded-lg bg-system-info/10 p-3">
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Direitos garantidos:</strong>
                  </p>
                  <p>• Saldo de salário dos dias trabalhados</p>
                  <p>• 13º salário proporcional</p>
                  <p>• Férias vencidas e proporcionais + 1/3</p>
                  <p>• FGTS acumulado (sem multa)</p>
                  <p>• ❌ Sem aviso prévio indenizado</p>
                  <p>• ❌ Sem seguro desemprego</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-math-purple/20 bg-math-purple-light p-4">
              <h3 className="mb-3 text-lg font-bold text-math-purple">
                4. 🤝 Acordo Mútuo (Lei 13.467/2017)
              </h3>
              <p className="mb-3 text-text-secondary">
                O <strong className="text-math-purple">acordo mútuo</strong> é uma modalidade criada
                pela Reforma Trabalhista, onde{" "}
                <strong className="text-system-warning">empregador e empregado</strong> concordam em
                encerrar o contrato.
              </p>
              <div className="rounded-lg bg-math-purple/10 p-3">
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Direitos específicos:</strong>
                  </p>
                  <p>• Saldo de salário dos dias trabalhados</p>
                  <p>• 50% do aviso prévio</p>
                  <p>• 13º salário proporcional</p>
                  <p>• Férias vencidas e proporcionais + 1/3</p>
                  <p>• Saque de 80% do FGTS + multa de 20%</p>
                  <p>• Seguro desemprego reduzido (quando elegível)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FAQ
        title="Perguntas Frequentes - Rescisão Trabalhista"
        items={[
          {
            question: "Como é calculado o aviso prévio proporcional?",
            answer:
              "O <strong>aviso prévio proporcional</strong> foi criado pela <strong>Lei 12.506/2011</strong> e segue a regra: 30 dias + 3 dias por ano trabalhado, limitado a 90 dias. <strong>Exemplos:</strong> 1 ano = 33 dias, 5 anos = 45 dias, 10 anos = 60 dias, 20+ anos = 90 dias (limite máximo).",
            borderColor: "primary-blue",
          },
          {
            question: "Como são calculadas as férias proporcionais?",
            answer:
              "As <strong>férias proporcionais</strong> são calculadas com base no período aquisitivo incompleto. Cada mês ou fração ≥ 15 dias conta como 1 mês completo, fração < 15 dias é desconsiderada. Sempre + <strong>1/3 constitucional</strong> (CF Art. 7º, XVII). Período aquisitivo = 12 meses para cada período de férias.",
            borderColor: "growth-green",
          },
          {
            question: "Quando posso sacar o FGTS?",
            answer:
              "O <strong>FGTS</strong> pode ser sacado conforme <strong>Lei 8.036/90</strong>: <strong>Demissão sem justa causa:</strong> saque integral + multa 40%. <strong>Acordo mútuo:</strong> saque de 80% + multa 20%. <strong>Aposentadoria:</strong> saque integral. <strong>Compra casa própria:</strong> saque parcial/integral. <strong>Doenças graves:</strong> saque integral.",
            borderColor: "system-info",
          },
          {
            question: "Quais são os critérios do seguro desemprego?",
            answer:
              "O <strong>seguro desemprego</strong> é regulamentado pela <strong>Lei 7.998/90</strong> para demitidos sem justa causa. <strong>Critérios:</strong> Mínimo 12 meses trabalhados nos últimos 18 meses. <strong>Parcelas:</strong> 12-17 meses = 3 parcelas, 18-23 meses = 4 parcelas, 24+ meses = 5 parcelas. Valor = 80% do salário (limitado ao teto).",
            borderColor: "system-warning",
          },
          {
            question: "Quais são os prazos para pagamento da rescisão?",
            answer:
              "A <strong>CLT estabelece prazos rígidos</strong>: <strong>Aviso prévio trabalhado:</strong> até o 1º dia útil após término. <strong>Aviso prévio indenizado:</strong> até 10º dia após demissão. <strong>Atraso no pagamento:</strong> multa equivalente ao salário. <strong>Documentos:</strong> até 10 dias para entrega.",
            borderColor: "system-error-dark",
          },
          {
            question: "Como funcionam os descontos na rescisão?",
            answer:
              "Na rescisão incidem <strong>INSS e IRRF</strong> conforme tabelas vigentes: <strong>INSS:</strong> 7,5% a 14% (conforme salário). <strong>IRRF:</strong> 0% a 27,5% (tabela progressiva). <strong>Outros:</strong> descontos autorizados (vale-transporte, etc.) e desconto de faltas se aviso prévio trabalhado.",
            borderColor: "primary-blue",
          },
        ]}
        tipSection={{
          title: "Dica Importante sobre Rescisão",
          content:
            "<strong>Sempre confira seus direitos!</strong> Mantenha todos os documentos trabalhistas organizados e tire dúvidas com RH ou sindicato. Em caso de discordância, procure orientação jurídica especializada. A rescisão bem calculada garante seus direitos integralmente.",
        }}
        footerText="<strong>Baseado na CLT e legislação vigente:</strong> Cálculos seguem as regras da <strong>Consolidação das Leis do Trabalho</strong> e jurisprudência atual do TST."
      />

      <RelatedCalculators
        category="trabalhista"
        currentCalculatorId="rescisao"
        customCalculators={[
          {
            id: "aposentadoria",
            title: "🏛️ Calculadora Aposentadoria INSS",
            description: "Simule 5 modalidades de aposentadoria e planeje sua previdência.",
            href: "/calculadoras/trabalhista/aposentadoria",
            bgColor: "bg-primary-blue-light",
            textColor: "text-primary-blue-dark",
            borderColor: "border-primary-blue/20",
            buttonColor: "bg-primary-blue",
            buttonHoverColor: "hover:bg-primary-blue-dark",
          },
          {
            id: "juros-compostos",
            title: "📈 Calculadora Juros Compostos",
            description:
              "Invista sua rescisão trabalhista e veja o crescimento com juros compostos.",
            href: "/calculadoras/financas/juros-compostos",
            bgColor: "bg-growth-green-soft",
            textColor: "text-growth-green",
            borderColor: "border-growth-green/20",
            buttonColor: "bg-growth-green",
            buttonHoverColor: "hover:bg-growth-green-dark",
          },
          {
            id: "primeiro-milhao",
            title: "🎯 Calculadora Primeiro Milhão",
            description:
              "Use os valores da rescisão como aporte inicial para sua independência financeira.",
            href: "/calculadoras/financas/primeiro-milhao",
            bgColor: "bg-system-warning/10",
            textColor: "text-system-warning",
            borderColor: "border-system-warning/20",
            buttonColor: "bg-system-warning",
            buttonHoverColor: "hover:bg-system-warning-dark",
          },
        ]}
      />
    </div>
  );
}
