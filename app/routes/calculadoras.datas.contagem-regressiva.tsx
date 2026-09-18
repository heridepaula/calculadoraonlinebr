import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "~/components/ui";
import {
  RelatedCalculators,
  FAQ,
  ResponsiveBreadcrumb,
  createCalculatorBreadcrumb,
} from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Contagem Regressiva Online Grátis | ${APP_NAME}`,
    },
    {
      name: "description",
      content:
        "⏰ Contador regressivo online GRÁTIS para eventos! Anos, meses, dias, horas, minutos e segundos em tempo real. Crie sua contagem regressiva personalizada agora mesmo.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    },
    {
      property: "og:title",
      content: "Contador Regressivo Online Grátis | CalculadoraOnlineBR",
    },
    {
      property: "og:description",
      content:
        "⏰ Contador regressivo online GRÁTIS para eventos! Anos, meses, dias, horas, minutos e segundos em tempo real. Crie sua contagem regressiva personalizada agora mesmo.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-contagem-regressiva.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Interface da calculadora de contagem regressiva mostrando contador de tempo para eventos especiais",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Contador Regressivo Online Grátis - Eventos e Celebrações",
    },
    {
      name: "twitter:description",
      content:
        "⏰ Crie contadores regressivos para eventos especiais com anos, meses, dias, horas, minutos e segundos em tempo real. 100% grátis e sem cadastro!",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-contagem-regressiva.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de contagem regressiva online para eventos especiais",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Contador Regressivo Online - Calculadora de Contagem Regressiva",
        alternateName: "Countdown Timer Online",
        description:
          "Ferramenta online gratuita para criar contadores regressivos personalizados. Conte anos, meses, dias, horas, minutos e segundos até eventos especiais em tempo real.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateCreated: "2025-01-01",
        dateModified: "2025-09-06",
        author: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 192,
            height: 192,
          },
          sameAs: [
            "https://twitter.com/CalculadoraBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          validFrom: "2025-01-01",
        },
        featureList: [
          "Contagem regressiva em tempo real com atualização automática",
          "Exibição de anos, meses, dias, horas, minutos e segundos",
          "Eventos personalizados com nomes customizáveis",
          "Efeito de celebração visual ao término da contagem",
          "Interface responsiva para todos os dispositivos",
          "Sem limitação de tempo ou número de eventos",
          "100% gratuito e sem necessidade de cadastro",
          "Funciona diretamente no navegador",
        ],
        about: {
          "@type": "Thing",
          name: "Contagem Regressiva para Eventos",
          description:
            "Sistema de cronometragem regressiva para eventos especiais, aniversários, casamentos, formaturas e celebrações",
          sameAs: "https://pt.wikipedia.org/wiki/Contagem_regressiva",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Pessoas planejando eventos especiais",
        },
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: "https://www.calculadoraonlinebr.com.br",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculadoras",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Calculadoras de Datas",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Contador Regressivo Online",
            item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
          },
        ],
      }),
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Como criar uma contagem regressiva personalizada?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Para criar sua contagem regressiva: 1) Digite o nome do evento no campo correspondente, 2) Selecione a data desejada, 3) Defina o horário específico, 4) Clique em 'Iniciar Contagem Regressiva'. O contador mostrará anos, meses, dias, horas, minutos e segundos restantes em tempo real.",
            },
          },
          {
            "@type": "Question",
            name: "O contador regressivo funciona em tempo real?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim! O contador atualiza automaticamente a cada segundo, mostrando o tempo restante até o evento. A contagem é executada diretamente no seu navegador.",
            },
          },
          {
            "@type": "Question",
            name: "O que acontece quando a contagem regressiva termina?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Quando o evento inicia (contagem chega a zero), uma celebração especial aparece na tela com efeitos visuais festivos e animações indicando que seu evento começou! É uma forma divertida de marcar o momento especial.",
            },
          },
          {
            "@type": "Question",
            name: "Para que tipos de eventos posso usar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use para qualquer evento especial: casamentos, aniversários, formatura, aposentadoria, lançamentos de produtos, feriados, Copa do Mundo, olimpíadas, Ano Novo, Black Friday, ou qualquer data importante que você queira acompanhar.",
            },
          },
          {
            "@type": "Question",
            name: "A contagem regressiva fica salva se eu fechar o navegador?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não, a contagem é executada em tempo real no seu navegador. Se você fechar a página, precisará configurar novamente. Para manter a contagem ativa, mantenha a aba do navegador aberta.",
            },
          },
          {
            "@type": "Question",
            name: "É possível ter múltiplas contagens regressivas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim! Cada aba do navegador pode ter uma contagem diferente. Abra várias abas desta calculadora para acompanhar múltiplos eventos simultaneamente, cada uma com seu próprio contador independente.",
            },
          },
          {
            "@type": "Question",
            name: "O contador regressivo é grátis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim, totalmente gratuito! Não é necessário cadastro, pagamento ou download. Use quantas vezes quiser para todos os seus eventos especiais, sem limitações.",
            },
          },
        ],
      }),
    },
  ];
};

interface CountdownResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
  eventName: string;
}

interface ValidationErrors {
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  general?: string;
}

export default function CountdownCalculator() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { startCalculation, endCalculation } = useAutoCalculatorTracking({
    calculatorType: "contagem-regressiva",
    category: "datas",
  });
  useFormTracking("contagem-regressiva");

  const calculateCountdown = (targetDate: Date, eventName: string): CountdownResult => {
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isFinished: true,
        eventName,
      };
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const totalDays = Math.floor(hours / 24);

    // Calculate years, months, days more accurately
    let tempNow = new Date(now);
    let tempTarget = new Date(targetDate);

    let years = tempTarget.getFullYear() - tempNow.getFullYear();
    if (
      tempTarget.getMonth() < tempNow.getMonth() ||
      (tempTarget.getMonth() === tempNow.getMonth() && tempTarget.getDate() < tempNow.getDate())
    ) {
      years--;
    }

    // Adjust current date by years calculated
    tempNow.setFullYear(tempNow.getFullYear() + years);

    // Calculate months
    let months = tempTarget.getMonth() - tempNow.getMonth();
    if (tempTarget.getDate() < tempNow.getDate()) {
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    // Adjust current date by months calculated
    tempNow.setMonth(tempNow.getMonth() + months);

    // Calculate remaining days
    let days = 0;
    if (tempNow <= tempTarget) {
      days = Math.floor((tempTarget.getTime() - tempNow.getTime()) / (1000 * 60 * 60 * 24));
    }

    return {
      years,
      months,
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
      isFinished: false,
      eventName,
    };
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};
    let ok = true;

    if (!eventName.trim()) {
      newErrors.eventName = "Nome do evento é obrigatório";
      ok = false;
    }

    if (!eventDate) {
      newErrors.eventDate = "Data do evento é obrigatória";
      ok = false;
    }

    if (!eventTime) {
      newErrors.eventTime = "Horário do evento é obrigatório";
      ok = false;
    }

    if (eventDate && eventTime) {
      const targetDate = new Date(`${eventDate}T${eventTime}`);
      const now = new Date();

      if (targetDate <= now) {
        newErrors.general = "A data e horário do evento devem estar no futuro";
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  };

  const handleStart = () => {
    if (!validateInputs()) return;

    startCalculation();
    try {
      const targetDate = new Date(`${eventDate}T${eventTime}`);
      setIsRunning(true);
      setErrors({});

      // Initial calculation
      const initialCountdown = calculateCountdown(targetDate, eventName);
      setCountdown(initialCountdown);

      // Start interval
      intervalRef.current = setInterval(() => {
        const newCountdown = calculateCountdown(targetDate, eventName);
        setCountdown(newCountdown);

        if (newCountdown.isFinished) {
          setShowCelebration(true);
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1000);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      endCalculation(true);
    } catch (error) {
      setErrors({ general: "Erro ao iniciar contagem regressiva. Verifique os dados inseridos." });
      endCalculation(false, "Erro ao iniciar countdown");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setCountdown(null);
    setShowCelebration(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    setEventName("");
    setEventDate("");
    setEventTime("00:00");
    setIsRunning(false);
    setCountdown(null);
    setShowCelebration(false);
    setErrors({});
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? <div className="mt-1 text-sm text-system-error">{error}</div> : null;

  const CelebrationEffect = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm">
      <div className="text-center">
        <div className="mb-8 animate-bounce text-8xl">🎉</div>
        <h2 className="mb-4 text-4xl font-bold text-primary-blue">
          {countdown?.eventName} Começou!
        </h2>
        <p className="mb-6 text-xl text-growth-green">
          Seu evento especial está acontecendo agora!
        </p>
        <div className="flex justify-center space-x-4 text-6xl">
          <span className="animate-pulse">🎊</span>
          <span className="animate-bounce">🎈</span>
          <span className="animate-pulse">🎆</span>
          <span className="animate-bounce">🎁</span>
          <span className="animate-pulse">🎉</span>
        </div>
        <Button onClick={() => setShowCelebration(false)} className="mt-8 px-8 py-3 text-lg">
          Fechar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <ResponsiveBreadcrumb items={createCalculatorBreadcrumb("datas", "Contagem Regressiva")} />

      <div className="space-y-8 px-3 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
          {showCelebration && <CelebrationEffect />}

          <header className="space-y-6 text-center">
            <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
              Contador Regressivo Online Grátis
            </h1>
            <p className="mx-auto max-w-4xl text-lg text-text-secondary-dark md:text-xl">
              Crie sua{" "}
              <strong className="text-growth-green">contagem regressiva personalizada</strong> para
              eventos especiais. Contador em tempo real com{" "}
              <strong className="text-primary-blue-dark">
                anos, meses, dias, horas, minutos e segundos
              </strong>{" "}
              até o grande momento.
            </p>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
              <div className="inline-block rounded-lg bg-growth-green-soft p-4 transition-transform hover:scale-105">
                <p className="text-sm font-medium text-text-primary">
                  ⏰ <strong>Tempo Real</strong>
                  <br />
                  <span className="text-xs text-text-secondary">Atualização automática</span>
                </p>
              </div>
              <div className="inline-block rounded-lg bg-primary-blue-light p-4 transition-transform hover:scale-105">
                <p className="text-sm font-medium text-text-primary">
                  🎉 <strong>Celebração Visual</strong>
                  <br />
                  <span className="text-xs text-text-secondary">Efeitos especiais</span>
                </p>
              </div>
              <div className="inline-block rounded-lg bg-system-info/10 p-4 transition-transform hover:scale-105">
                <p className="text-sm font-medium text-text-primary">
                  📅 <strong>100% Gratuito</strong>
                  <br />
                  <span className="text-xs text-text-secondary">Sem cadastro</span>
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl rounded-xl bg-gray-800/50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-primary-blue">
                Como Funciona a Contagem Regressiva?
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary-dark">
                Uma <strong>contagem regressiva</strong> é uma ferramenta de cronometragem que
                calcula o tempo restante até uma data específica. É ideal para{" "}
                <strong>eventos especiais</strong> como casamentos, aniversários, formaturas,
                lançamentos e celebrações, oferecendo uma experiência visual envolvente com
                contadores grandes e efeitos de celebração.
              </p>
            </div>
          </header>

          <main className="space-y-8">
            <section aria-labelledby="calculator-section">
              <Card>
                <CardHeader>
                  <CardTitle as="h2" id="calculator-section">
                    ⏱️ Configure sua Contagem Regressiva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-6">
                    <div>
                      <Input
                        type="text"
                        label="🎯 Nome do Evento"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Ex: Meu Aniversário, Casamento, Formatura..."
                        fullWidth
                        className="h-12 text-lg"
                        aria-describedby={errors.eventName ? "event-name-error" : undefined}
                        required
                      />
                      <ErrorMessage error={errors.eventName} />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Input
                          type="date"
                          label="📅 Data do Evento"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          fullWidth
                          className="h-12 text-lg"
                          aria-describedby={errors.eventDate ? "event-date-error" : undefined}
                          required
                        />
                        <ErrorMessage error={errors.eventDate} />
                      </div>

                      <div>
                        <Input
                          type="time"
                          label="🕒 Horário do Evento"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          fullWidth
                          className="h-12 text-lg"
                          aria-describedby={errors.eventTime ? "event-time-error" : undefined}
                          required
                        />
                        <ErrorMessage error={errors.eventTime} />
                      </div>
                    </div>
                  </div>

                  {errors.general && (
                    <div className="mb-4 text-center">
                      <ErrorMessage error={errors.general} />
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    {!isRunning ? (
                      <Button
                        onClick={handleStart}
                        className="px-8"
                        aria-describedby="calculator-description"
                        type="button"
                      >
                        🚀 Iniciar Contagem Regressiva
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStop}
                        variant="outline"
                        className="border-system-warning px-8 text-system-warning hover:bg-system-warning hover:text-white"
                        type="button"
                      >
                        ⏹️ Parar
                      </Button>
                    )}
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
                      aria-label="Limpar todos os campos do formulário"
                      type="button"
                    >
                      🔄 Resetar
                    </Button>
                  </div>
                  <p id="calculator-description" className="sr-only">
                    Clique para iniciar a contagem regressiva para o evento
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Contador */}
            {countdown && (
              <section aria-labelledby="countdown-section" className="mt-8">
                <div ref={resultRef}>
                  <Card className="border-2 border-growth-green bg-growth-green-soft">
                    <CardHeader>
                      <CardTitle
                        as="h2"
                        id="countdown-section"
                        className="text-center text-growth-green"
                      >
                        ⏰ {countdown.eventName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {countdown.isFinished ? (
                        <div className="text-center">
                          <div className="mb-4 animate-bounce text-6xl">🎉</div>
                          <h3 className="mb-2 text-2xl font-bold text-primary-blue">
                            Seu evento começou!
                          </h3>
                          <p className="text-lg text-growth-green">
                            {countdown.eventName} está acontecendo agora!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {/* Main Counter Display - Large and Prominent */}
                          <div className="mx-auto max-w-6xl">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
                              <div className="flex min-h-[120px] flex-col justify-center rounded-xl border border-system-error/20 bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center shadow-lg transition-shadow hover:shadow-xl md:min-h-[140px] md:p-6 lg:min-h-[160px]">
                                <div className="mb-1 overflow-hidden text-4xl font-black leading-none tracking-tight text-system-error md:text-5xl lg:text-6xl">
                                  {countdown.years}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wide text-text-primary md:text-sm">
                                  {countdown.years === 1 ? "Ano" : "Anos"}
                                </div>
                              </div>

                              <div className="flex min-h-[120px] flex-col justify-center rounded-xl border border-system-warning/20 bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center shadow-lg transition-shadow hover:shadow-xl md:min-h-[140px] md:p-6 lg:min-h-[160px]">
                                <div className="mb-1 overflow-hidden text-4xl font-black leading-none tracking-tight text-system-warning md:text-5xl lg:text-6xl">
                                  {countdown.months}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wide text-text-primary md:text-sm">
                                  {countdown.months === 1 ? "Mês" : "Meses"}
                                </div>
                              </div>

                              <div className="flex min-h-[120px] flex-col justify-center rounded-xl border border-primary-blue/20 bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center shadow-lg transition-shadow hover:shadow-xl md:min-h-[140px] md:p-6 lg:min-h-[160px]">
                                <div className="mb-1 overflow-hidden text-4xl font-black leading-none tracking-tight text-primary-blue md:text-5xl lg:text-6xl">
                                  {countdown.days}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wide text-text-primary md:text-sm">
                                  {countdown.days === 1 ? "Dia" : "Dias"}
                                </div>
                              </div>

                              <div className="flex min-h-[120px] flex-col justify-center rounded-xl border border-growth-green/20 bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center shadow-lg transition-shadow hover:shadow-xl md:min-h-[140px] md:p-6 lg:min-h-[160px]">
                                <div className="mb-1 overflow-hidden text-4xl font-black leading-none tracking-tight text-growth-green md:text-5xl lg:text-6xl">
                                  {countdown.hours.toString().padStart(2, "0")}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wide text-text-primary md:text-sm">
                                  {countdown.hours === 1 ? "Hora" : "Horas"}
                                </div>
                              </div>

                              <div className="flex min-h-[120px] flex-col justify-center rounded-xl border border-system-info/20 bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center shadow-lg transition-shadow hover:shadow-xl md:min-h-[140px] md:p-6 lg:min-h-[160px]">
                                <div className="mb-1 overflow-hidden text-4xl font-black leading-none tracking-tight text-system-info md:text-5xl lg:text-6xl">
                                  {countdown.minutes.toString().padStart(2, "0")}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wide text-text-primary md:text-sm">
                                  {countdown.minutes === 1 ? "Minuto" : "Minutos"}
                                </div>
                              </div>

                              <div className="flex min-h-[120px] flex-col justify-center rounded-xl border border-text-primary/20 bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center shadow-lg transition-shadow hover:shadow-xl md:min-h-[140px] md:p-6 lg:min-h-[160px]">
                                <div className="mb-1 animate-pulse overflow-hidden text-4xl font-black leading-none tracking-tight text-text-primary drop-shadow-lg md:text-5xl lg:text-6xl">
                                  {countdown.seconds.toString().padStart(2, "0")}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wide text-text-primary md:text-sm">
                                  {countdown.seconds === 1 ? "Segundo" : "Segundos"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Secondary Display - Compact Summary */}
                          <div className="text-center">
                            <div className="inline-block rounded-full border border-primary-blue/30 bg-gray-800 px-8 py-4">
                              <p className="text-xl font-bold text-primary-blue md:text-2xl">
                                {countdown.years > 0 &&
                                  `${countdown.years} ano${countdown.years !== 1 ? "s" : ""} `}
                                {countdown.months > 0 &&
                                  `${countdown.months} ${countdown.months === 1 ? "mês" : "meses"} `}
                                {countdown.days} dia{countdown.days !== 1 ? "s" : ""}{" "}
                                {countdown.hours.toString().padStart(2, "0")}:
                                {countdown.minutes.toString().padStart(2, "0")}:
                                {countdown.seconds.toString().padStart(2, "0")}
                              </p>
                              <p className="mt-1 text-sm font-medium text-text-secondary">
                                Faltam para {countdown.eventName}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            <section aria-labelledby="faq-section" className="mt-10">
              <FAQ
                title="Perguntas Frequentes - Contador Regressivo Online"
                items={[
                  {
                    question: "Como criar uma contagem regressiva personalizada?",
                    answer:
                      "Para criar sua contagem regressiva: 1) Digite o nome do evento no campo correspondente, 2) Selecione a data desejada, 3) Defina o horário específico, 4) Clique em 'Iniciar Contagem Regressiva'. O contador mostrará anos, meses, dias, horas, minutos e segundos restantes em tempo real.",
                    borderColor: "primary-blue",
                  },
                  {
                    question: "O contador regressivo funciona em tempo real?",
                    answer:
                      "Sim! O contador atualiza automaticamente a cada segundo, mostrando o tempo restante até o evento. A contagem é executada diretamente no seu navegador.",
                    borderColor: "growth-green",
                  },
                  {
                    question: "O que acontece quando a contagem regressiva termina?",
                    answer:
                      "Quando o evento inicia (contagem chega a zero), uma celebração especial aparece na tela com efeitos visuais festivos e animações indicando que seu evento começou! É uma forma divertida de marcar o momento especial.",
                    borderColor: "system-info",
                  },
                  {
                    question: "Para que tipos de eventos posso usar?",
                    answer:
                      "Use para qualquer evento especial: casamentos, aniversários, formatura, aposentadoria, lançamentos de produtos, feriados, Copa do Mundo, olimpíadas, Ano Novo, Black Friday, ou qualquer data importante que você queira acompanhar.",
                    borderColor: "system-warning",
                  },
                  {
                    question: "A contagem regressiva fica salva se eu fechar o navegador?",
                    answer:
                      "Não, a contagem é executada em tempo real no seu navegador. Se você fechar a página, precisará configurar novamente. Para manter a contagem ativa, mantenha a aba do navegador aberta.",
                    borderColor: "growth-green",
                  },
                  {
                    question: "É possível ter múltiplas contagens regressivas?",
                    answer:
                      "Sim! Cada aba do navegador pode ter uma contagem diferente. Abra várias abas desta calculadora para acompanhar múltiplos eventos simultaneamente, cada uma com seu próprio contador independente.",
                    borderColor: "system-error-dark",
                  },
                  {
                    question: "O contador regressivo é grátis?",
                    answer:
                      "Sim, totalmente gratuito! Não é necessário cadastro, pagamento ou download. Use quantas vezes quiser para todos os seus eventos especiais, sem limitações.",
                    borderColor: "primary-blue",
                  },
                ]}
                tipSection={{
                  title: "💡 Dicas para Usar o Contador Regressivo",
                  content:
                    "<strong>Para melhor experiência:</strong> mantenha a aba aberta para o contador continuar funcionando. Use nomes descritivos para seus eventos e configure horários específicos para maior precisão. Para eventos muito importantes, considere criar um lembrete adicional no seu calendário.",
                }}
                footerText="<strong>🎯 Lembre-se:</strong> A contagem é executada no seu navegador em tempo real. Perfeito para eventos especiais, lançamentos e celebrações!"
              />
            </section>

            {/* Seção Educativa Adicional */}
            <section className="mt-10 rounded-xl bg-gray-800/30 py-8">
              <div className="mx-auto max-w-4xl px-6">
                <h2 className="mb-6 text-center text-2xl font-bold text-primary-blue">
                  🎯 Casos de Uso Populares para Contagem Regressiva
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg bg-growth-green-soft p-4">
                    <h3 className="mb-2 font-semibold text-growth-green">👰 Eventos Pessoais</h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Casamentos e festas</li>
                      <li>• Aniversários especiais</li>
                      <li>• Formaturas e conquistas</li>
                      <li>• Aposentadoria</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-primary-blue-light p-4">
                    <h3 className="mb-2 font-semibold text-primary-blue-dark">🚀 Lançamentos</h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Produtos e serviços</li>
                      <li>• Campanhas de marketing</li>
                      <li>• Black Friday</li>
                      <li>• Ofertas especiais</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-system-warning/20 p-4">
                    <h3 className="mb-2 font-semibold text-system-warning">🎊 Celebrações</h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Ano Novo</li>
                      <li>• Copa do Mundo</li>
                      <li>• Olimpíadas</li>
                      <li>• Feriados especiais</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 rounded-lg bg-system-info/10 p-6">
                  <h3 className="mb-3 font-semibold text-system-info">
                    ⚡ Por que usar nosso Contador Regressivo?
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-sm text-text-secondary md:grid-cols-2">
                    <ul className="space-y-2">
                      <li>
                        ✅ <strong>Tempo real:</strong> Atualização automática a cada segundo
                      </li>
                      <li>
                        ✅ <strong>Visual atrativo:</strong> Contadores grandes e coloridos
                      </li>
                      <li>
                        ✅ <strong>Fácil de usar:</strong> Interface simples e intuitiva
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li>
                        ✅ <strong>100% gratuito:</strong> Sem cadastros ou limitações
                      </li>
                      <li>
                        ✅ <strong>Celebração especial:</strong> Efeitos visuais ao final
                      </li>
                      <li>
                        ✅ <strong>Responsivo:</strong> Funciona em todos os dispositivos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <aside aria-label="Calculadoras relacionadas" className="mt-12">
            <RelatedCalculators category="datas" currentCalculatorId="contagem-regressiva" />
          </aside>
        </div>
      </div>
    </div>
  );
}
