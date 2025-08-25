// Scheduler para atualização automática dos dados do Tesouro Direto
// Executa de segunda a sexta-feira às 10:30
import { forceCacheUpdate, getCacheStatus } from "./treasuryBonds.server";

// Estado do scheduler
let schedulerInterval: NodeJS.Timeout | null = null;
let isSchedulerRunning = false;

// Função para verificar se é dia útil (segunda a sexta)
function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // 1 = Segunda, 5 = Sexta
}

// Função para calcular próximo horário de execução (10:30 em dias úteis)
function getNextExecutionTime(): Date {
  const now = new Date();
  let nextExecution = new Date(now);

  // Define para 10:30 (10:30:00)
  nextExecution.setHours(10, 30, 0, 0);

  // Se já passou das 10:30 hoje ou não é dia útil, procura próximo dia útil
  while (nextExecution <= now || !isWeekday(nextExecution)) {
    nextExecution.setDate(nextExecution.getDate() + 1);
    nextExecution.setHours(10, 30, 0, 0);
  }

  return nextExecution;
}

// Função para executar a atualização
async function executeScheduledUpdate() {
  try {
    console.log("🕘 [SCHEDULER] Executando atualização automática dos dados do Tesouro Direto...");

    const bondsBefore = getCacheStatus();
    console.log(`📊 [SCHEDULER] Status antes: ${bondsBefore.bondsCount} títulos em cache`);

    await forceCacheUpdate();

    const bondsAfter = getCacheStatus();
    console.log(
      `✅ [SCHEDULER] Atualização concluída: ${bondsAfter.bondsCount} títulos atualizados`
    );
    console.log(
      `⏰ [SCHEDULER] Próxima atualização: ${bondsAfter.nextUpdate?.toLocaleString("pt-BR")}`
    );
  } catch (error) {
    console.error("❌ [SCHEDULER] Erro na atualização automática:", error);
  }
}

// Função para iniciar o scheduler
export function startScheduler() {
  if (isSchedulerRunning) {
    console.log("⚠️ [SCHEDULER] Scheduler já está em execução");
    return;
  }

  const nextExecution = getNextExecutionTime();
  const timeUntilNextExecution = nextExecution.getTime() - Date.now();

  console.log(`🚀 [SCHEDULER] Iniciando scheduler do Tesouro Direto`);
  console.log(`📅 [SCHEDULER] Execução: Segunda a Sexta às 10:30`);
  console.log(`⏰ [SCHEDULER] Próxima execução: ${nextExecution.toLocaleString("pt-BR")}`);
  console.log(
    `⏳ [SCHEDULER] Tempo até próxima execução: ${Math.round(timeUntilNextExecution / 1000 / 60)} minutos`
  );

  // Agenda primeira execução
  setTimeout(async () => {
    await executeScheduledUpdate();

    // Função para agendar próxima execução em dia útil
    const scheduleNextExecution = () => {
      const nextTime = getNextExecutionTime();
      const timeUntilNext = nextTime.getTime() - Date.now();
      
      console.log(`⏰ [SCHEDULER] Próxima execução agendada: ${nextTime.toLocaleString("pt-BR")}`);
      
      schedulerInterval = setTimeout(async () => {
        await executeScheduledUpdate();
        scheduleNextExecution(); // Agenda a próxima após executar
      }, timeUntilNext);
    };

    // Inicia o ciclo de agendamento
    scheduleNextExecution();
  }, timeUntilNextExecution);

  isSchedulerRunning = true;
}

// Função para parar o scheduler
export function stopScheduler() {
  if (schedulerInterval) {
    clearTimeout(schedulerInterval);
    schedulerInterval = null;
  }

  isSchedulerRunning = false;
  console.log("🛑 [SCHEDULER] Scheduler do Tesouro Direto parado");
}

// Função para obter status do scheduler
export function getSchedulerStatus() {
  return {
    isRunning: isSchedulerRunning,
    nextExecution: isSchedulerRunning ? getNextExecutionTime() : null,
    cacheStatus: getCacheStatus(),
  };
}

// Função para forçar execução manual (útil para testing)
export async function triggerManualUpdate() {
  console.log("🔄 [SCHEDULER] Execução manual solicitada");
  await executeScheduledUpdate();
}

// Inicialização automática
if (typeof window === "undefined") {
  // Só executa no servidor
  console.log("🏛️ [SCHEDULER] Inicializando sistema de atualização do Tesouro Direto");
  startScheduler();
}

// Cleanup quando o processo termina
process.on("SIGINT", () => {
  console.log("🔄 [SCHEDULER] Encerrando scheduler...");
  stopScheduler();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("🔄 [SCHEDULER] Encerrando scheduler...");
  stopScheduler();
  process.exit(0);
});
