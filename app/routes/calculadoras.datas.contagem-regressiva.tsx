import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Input,
} from "~/components/ui";
import { RelatedCalculators, FAQ } from "~/components";
import { APP_NAME } from "~/lib/constants";
import { useAutoCalculatorTracking, useFormTracking } from "~/hooks/useAutoCalculatorTracking";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Contagem Regressiva 2025 – Contador Eventos Online",
    },
    {
      name: "description",
      content:
        "Contador regressivo online com anos, meses, dias, horas, minutos e segundos. Crie sua contagem regressiva personalizada para eventos especiais.",
    },
    {
      name: "keywords",
      content:
        "contagem regressiva, contador online, timer eventos, countdown timer, contador de tempo",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "CalculadoraOnlineBR" },
    {
      name: "robots",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    { name: "bingbot", content: "index,follow" },
    {
      rel: "canonical",
      href: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    },
    {
      property: "og:title",
      content: "Contagem Regressiva 2025 – Contador Eventos Online",
    },
    {
      property: "og:description",
      content:
        "Contador regressivo online com anos, meses, dias, horas, minutos e segundos. Crie sua contagem regressiva personalizada para eventos especiais.",
    },
    {
      property: "og:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-contagem-regressiva.webp",
    },
    {
      property: "og:image:alt",
      content:
        "Calculadora de Contagem Regressiva - Contador de tempo para eventos",
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
      content:
        "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
    },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Calculadora de Contagem Regressiva 2025 – Contador de Eventos",
    },
    {
      name: "twitter:description",
      content:
        "Crie contadores regressivos personalizados para eventos especiais com anos, meses, dias, horas, minutos e segundos em tempo real.",
    },
    {
      name: "twitter:image",
      content: "https://www.calculadoraonlinebr.com.br/images/calculadora-contagem-regressiva.webp",
    },
    {
      name: "twitter:image:alt",
      content: "Calculadora de Contagem Regressiva - Contador de eventos",
    },
    { name: "twitter:site", content: "@CalculadoraBR" },
    { name: "twitter:creator", content: "@CalculadoraBR" },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "theme-color", content: "#64B5F6" },
    { httpEquiv: "content-language", content: "pt-br" },
    { name: "geo.region", content: "BR" },
    { name: "geo.country", content: "Brazil" },
    { name: "next-head-count", content: "32" },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Contagem Regressiva - Contador de Eventos 2025",
        description:
          "Ferramenta gratuita para criar contadores regressivos personalizados com anos, meses, dias, horas, minutos e segundos. Ideal para eventos especiais.",
        url: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        inLanguage: "pt-BR",
        dateModified: "2025-09-06",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
        publisher: {
          "@type": "Organization",
          name: "CalculadoraOnlineBR",
          url: "https://www.calculadoraonlinebr.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://www.calculadoraonlinebr.com.br/android-chrome-192x192.webp",
            width: 180,
            height: 180,
          },
          sameAs: [
            "https://twitter.com/CalculadoraBR",
            "https://www.facebook.com/CalculadoraOnlineBR",
          ],
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
          name: "Calculadora de Contagem Regressiva 2025 - Contador de Eventos",
          description:
            "Crie contadores regressivos personalizados para eventos especiais com anos, meses, dias, horas, minutos e segundos em tempo real.",
          inLanguage: "pt-BR",
          isPartOf: {
            "@type": "WebSite",
            name: "CalculadoraOnlineBR",
            url: "https://www.calculadoraonlinebr.com.br",
            description: "Calculadoras online gratuitas para facilitar seu dia a dia",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.calculadoraonlinebr.com.br/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          breadcrumb: {
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
                name: "Datas",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Contagem Regressiva",
                item: "https://www.calculadoraonlinebr.com.br/calculadoras/datas/contagem-regressiva",
              },
            ],
          },
        },
        about: {
          "@type": "Thing",
          name: "Contagem Regressiva de Eventos",
          description: "Ferramenta para criar contadores regressivos para eventos especiais",
          category: "CountdownTimer",
        },
        featureList: [
          "Contagem regressiva em tempo real",
          "Exibição de anos, meses, dias, horas, minutos e segundos",
          "Eventos personalizados",
          "Efeito de celebração ao término",
          "Interface responsiva",
          "Atualização automática",
          "Sem limitação de tempo",
          "Compatível com todos os dispositivos",
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
              text: "Digite o nome do seu evento e selecione a data e horário desejado. Clique em 'Iniciar Contagem Regressiva' para começar o contador em tempo real com anos, meses, dias, horas, minutos e segundos.",
            },
          },
          {
            "@type": "Question",
            name: "O contador funciona em tempo real?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim! O contador atualiza automaticamente a cada segundo, mostrando o tempo restante exato até o evento. A contagem é precisa e considera anos bissextos, fusos horários e horário de verão.",
            },
          },
          {
            "@type": "Question",
            name: "O que acontece quando a contagem termina?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Quando o evento inicia (contagem chega a zero), uma celebração especial aparece na tela com efeitos visuais festivos indicando que seu evento começou!",
            },
          },
          {
            "@type": "Question",
            name: "Posso usar para qualquer tipo de evento?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim! Use para casamentos, aniversários, formatura, aposentadoria, lançamentos, feriados, Copa do Mundo, olimpíadas, ou qualquer evento que você queira acompanhar.",
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
        <Button
          onClick={() => setShowCelebration(false)}
          className="mt-8 px-8 py-3 text-lg"
        >
          Fechar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 md:max-w-4xl lg:max-w-6xl" lang="pt-BR">
      {showCelebration && <CelebrationEffect />}
      
      <nav aria-label="Navegação estrutural">
        <Breadcrumb>
          <BreadcrumbItem href="/">Início</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras">Calculadoras</BreadcrumbItem>
          <BreadcrumbItem href="/calculadoras/datas">Datas</BreadcrumbItem>
          <BreadcrumbItem isLast>Contagem Regressiva</BreadcrumbItem>
        </Breadcrumb>
      </nav>

      <header className="space-y-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Contagem Regressiva 2025 – Contador de Eventos
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary-dark">
          Crie sua <strong className="text-growth-green">contagem regressiva personalizada</strong>{" "}
          para eventos especiais. Contador em tempo real com{" "}
          <strong className="text-primary-blue-dark">anos, meses, dias, horas, minutos e segundos</strong> até o grande momento.
        </p>
        <div className="inline-block rounded-lg bg-growth-green-soft p-4 duration-300">
          <p className="text-sm font-medium text-text-primary">
            ⏰ <strong>Tempo Real</strong> • 🎉 <strong>Efeito de Celebração</strong> • 📅{" "}
            <strong>Eventos Personalizados</strong>
          </p>
        </div>
      </header>

      <main>
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
          <section aria-labelledby="countdown-section">
            <div ref={resultRef}>
              <Card className="border-2 border-growth-green bg-growth-green-soft">
                <CardHeader>
                  <CardTitle as="h2" id="countdown-section" className="text-growth-green text-center">
                    ⏰ {countdown.eventName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {countdown.isFinished ? (
                    <div className="text-center">
                      <div className="mb-4 text-6xl animate-bounce">🎉</div>
                      <h3 className="mb-2 text-2xl font-bold text-primary-blue">
                        Seu evento começou!
                      </h3>
                      <p className="text-growth-green text-lg">
                        {countdown.eventName} está acontecendo agora!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Main Counter Display - Large and Prominent */}
                      <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
                          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 text-center shadow-lg border border-system-error/20 hover:shadow-xl transition-shadow min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
                            <div className="text-4xl font-black text-system-error md:text-5xl lg:text-6xl mb-1 tracking-tight leading-none overflow-hidden">
                              {countdown.years}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wide">
                              {countdown.years === 1 ? "Ano" : "Anos"}
                            </div>
                          </div>
                          
                          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 text-center shadow-lg border border-system-warning/20 hover:shadow-xl transition-shadow min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
                            <div className="text-4xl font-black text-system-warning md:text-5xl lg:text-6xl mb-1 tracking-tight leading-none overflow-hidden">
                              {countdown.months}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wide">
                              {countdown.months === 1 ? "Mês" : "Meses"}
                            </div>
                          </div>
                          
                          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 text-center shadow-lg border border-primary-blue/20 hover:shadow-xl transition-shadow min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
                            <div className="text-4xl font-black text-primary-blue md:text-5xl lg:text-6xl mb-1 tracking-tight leading-none overflow-hidden">
                              {countdown.days}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wide">
                              {countdown.days === 1 ? "Dia" : "Dias"}
                            </div>
                          </div>
                          
                          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 text-center shadow-lg border border-growth-green/20 hover:shadow-xl transition-shadow min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
                            <div className="text-4xl font-black text-growth-green md:text-5xl lg:text-6xl mb-1 tracking-tight leading-none overflow-hidden">
                              {countdown.hours.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wide">
                              {countdown.hours === 1 ? "Hora" : "Horas"}
                            </div>
                          </div>
                          
                          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 text-center shadow-lg border border-system-info/20 hover:shadow-xl transition-shadow min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
                            <div className="text-4xl font-black text-system-info md:text-5xl lg:text-6xl mb-1 tracking-tight leading-none overflow-hidden">
                              {countdown.minutes.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wide">
                              {countdown.minutes === 1 ? "Minuto" : "Minutos"}
                            </div>
                          </div>
                          
                          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 text-center shadow-lg border border-text-primary/20 hover:shadow-xl transition-shadow min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
                            <div className="text-4xl font-black text-text-primary animate-pulse md:text-5xl lg:text-6xl mb-1 tracking-tight leading-none overflow-hidden drop-shadow-lg">
                              {countdown.seconds.toString().padStart(2, "0")}
                            </div>
                            <div className="text-xs md:text-sm font-semibold text-text-primary uppercase tracking-wide">
                              {countdown.seconds === 1 ? "Segundo" : "Segundos"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Secondary Display - Compact Summary */}
                      <div className="text-center">
                        <div className="inline-block bg-gray-800 rounded-full px-8 py-4 border border-primary-blue/30">
                          <p className="text-xl font-bold text-primary-blue md:text-2xl">
                            {countdown.years > 0 && `${countdown.years} ano${countdown.years !== 1 ? 's' : ''} `}
                            {countdown.months > 0 && `${countdown.months} ${countdown.months === 1 ? 'mês' : 'meses'} `}
                            {countdown.days} dia{countdown.days !== 1 ? 's' : ''} {countdown.hours.toString().padStart(2, "0")}:{countdown.minutes.toString().padStart(2, "0")}:{countdown.seconds.toString().padStart(2, "0")}
                          </p>
                          <p className="text-sm text-text-secondary mt-1 font-medium">
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

        <section aria-labelledby="faq-section">
          <FAQ
            title="Perguntas Frequentes - Calculadora de Contagem Regressiva"
            items={[
              {
                question: "Como criar uma contagem regressiva personalizada?",
                answer:
                  "Digite o nome do seu evento e selecione a data e horário desejado. Clique em 'Iniciar Contagem Regressiva' para começar o contador em tempo real com anos, meses, dias, horas, minutos e segundos.",
                borderColor: "primary-blue",
              },
              {
                question: "O contador funciona em tempo real?",
                answer:
                  "Sim! O contador atualiza automaticamente a cada segundo, mostrando o tempo restante exato até o evento. A contagem é precisa e considera anos bissextos, fusos horários e horário de verão.",
                borderColor: "growth-green",
              },
              {
                question: "O que acontece quando a contagem termina?",
                answer:
                  "Quando o evento inicia (contagem chega a zero), uma celebração especial aparece na tela com efeitos visuais festivos indicando que seu evento começou!",
                borderColor: "system-info",
              },
              {
                question: "Posso usar para qualquer tipo de evento?",
                answer:
                  "Sim! Use para casamentos, aniversários, formatura, aposentadoria, lançamentos, feriados, Copa do Mundo, olimpíadas, ou qualquer evento que você queira acompanhar.",
                borderColor: "system-warning",
              },
              {
                question: "A contagem regressiva fica salvada se eu fechar o navegador?",
                answer:
                  "Não, a contagem é executada em tempo real no seu navegador. Se você fechar a página, precisará configurar novamente. Para contar permanente, mantenha a aba aberta.",
                borderColor: "growth-green",
              },
              {
                question: "Posso ter várias contagens regressivas ao mesmo tempo?",
                answer:
                  "Cada aba do navegador pode ter uma contagem diferente. Abra várias abas desta calculadora para acompanhar múltiplos eventos simultaneamente.",
                borderColor: "system-error-dark",
              },
            ]}
            tipSection={{
              title: "Dica Importante sobre Contagem Regressiva",
              content:
                "<strong>Para melhor experiência:</strong> mantenha a aba aberta para o contador continuar funcionando. Use nomes descritivos para seus eventos e configure horários específicos para maior precisão.",
            }}
            footerText="<strong>Lembre-se:</strong> A contagem é executada no seu navegador em tempo real. Para eventos importantes, considere adicionar aos favoritos ou criar um lembrete adicional no seu calendário."
          />
        </section>
      </main>

      <aside aria-label="Calculadoras relacionadas">
        <RelatedCalculators category="datas" currentCalculatorId="contagem-regressiva" />
      </aside>
    </div>
  );
}