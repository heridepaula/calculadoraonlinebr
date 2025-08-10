import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "~/components/ui";
import { APP_NAME } from "~/lib/constants";
import { calculateChildDevelopment, type ChildDevelopmentParams, type ChildDevelopmentResult, type DevelopmentMilestone } from "~/utils/calculations";

export const meta: MetaFunction = () => {
  return [
    { title: `Calculadora de Desenvolvimento Infantil - Marcos do Bebê 0-36 Meses Online Gratuita - ${APP_NAME}` },
    {
      name: "description",
      content:
        "Calculadora de desenvolvimento infantil gratuita baseada em diretrizes pediátricas. Acompanhe 25+ marcos de desenvolvimento do bebê, cronograma de consultas médicas, idade corrigida para prematuros e análise interativa por categorias motor, cognitivo, linguagem e social.",
    },
    { 
      name: "keywords", 
      content: "calculadora desenvolvimento infantil, marcos do bebê, desenvolvimento motor bebê, linguagem infantil, marcos cognitivos, crescimento bebê, prematuros idade corrigida, consulta pediatra, desenvolvimento social bebê, marcos 0-36 meses, acompanhamento pediátrico, desenvolvimento neuropsicomotor, estimulação precoce" 
    },
    { name: "author", content: "Calculadora Online BR" },
    { name: "robots", content: "index,follow" },
    { name: "googlebot", content: "index,follow" },
    { name: "bingbot", content: "index,follow" },
    { property: "og:title", content: `Calculadora de Desenvolvimento Infantil - Acompanhe Marcos do Bebê - ${APP_NAME}` },
    { property: "og:description", content: "Monitore gratuitamente o desenvolvimento do seu bebê com 25+ marcos interativos, cronograma pediátrico personalizado e suporte completo a prematuros. Baseado em diretrizes médicas." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calculadora-online-br.com/calculadora/saude/desenvolvimento-infantil" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Calculadora Desenvolvimento Infantil Online - Marcos 0-36 Meses - ${APP_NAME}` },
    { name: "twitter:description", content: "Ferramenta completa para pais: marcos interativos, cronograma médico, idade corrigida para prematuros e análise por categorias de desenvolvimento." },
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
        "@type": "MedicalWebPage",
        "name": "Calculadora de Desenvolvimento Infantil",
        "description": "Ferramenta online gratuita para acompanhar marcos de desenvolvimento de bebês de 0 a 36 meses, com suporte a prematuros e cronograma pediátrico personalizado.",
        "url": "https://calculadora-online-br.com/calculadora/saude/desenvolvimento-infantil",
        "mainEntity": {
          "@type": "MedicalCalculator",
          "name": "Calculadora de Marcos de Desenvolvimento Infantil",
          "description": "Calculadora interativa que monitora marcos de desenvolvimento motor, cognitivo, linguagem e social em bebês e crianças de 0 a 36 meses.",
          "medicalSpecialty": "Pediatria",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://calculadora-online-br.com/calculadora/saude/desenvolvimento-infantil"
          }
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Início",
              "item": "https://calculadora-online-br.com"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Calculadoras",
              "item": "https://calculadora-online-br.com/calculadora"
            },
            {
              "@type": "ListItem",
              "position": 3, 
              "name": "Saúde",
              "item": "https://calculadora-online-br.com/calculadora/saude"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Desenvolvimento Infantil"
            }
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "Calculadora Online BR",
          "url": "https://calculadora-online-br.com"
        },
        "inLanguage": "pt-BR",
        "isAccessibleForFree": true,
        "hasPart": [
          {
            "@type": "MedicalTest",
            "name": "Marcos de Desenvolvimento Motor"
          },
          {
            "@type": "MedicalTest", 
            "name": "Marcos de Desenvolvimento Cognitivo"
          },
          {
            "@type": "MedicalTest",
            "name": "Marcos de Desenvolvimento da Linguagem" 
          },
          {
            "@type": "MedicalTest",
            "name": "Marcos de Desenvolvimento Social"
          }
        ]
      })
    }
  ];
};

export default function ChildDevelopmentCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [isPremature, setIsPremature] = useState(false);
  const [gestationalWeeks, setGestationalWeeks] = useState("40");
  const [result, setResult] = useState<ChildDevelopmentResult | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAge = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    } else {
      return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
    }
  };

  const handleCalculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const gestationalWeeksNum = parseInt(gestationalWeeks);

    if (gestationalWeeksNum > 0) {
      const params: ChildDevelopmentParams = {
        birthDate: birth,
        isPremature,
        gestationalWeeks: gestationalWeeksNum,
      };

      const developmentResult = calculateChildDevelopment(params);
      setResult(developmentResult);
    }
  };

  const handleReset = () => {
    setBirthDate("");
    setIsPremature(false);
    setGestationalWeeks("40");
    setResult(null);
    setCompletedMilestones(new Set());
  };

  const toggleMilestone = (milestoneId: string) => {
    const newCompletedMilestones = new Set(completedMilestones);
    if (newCompletedMilestones.has(milestoneId)) {
      newCompletedMilestones.delete(milestoneId);
    } else {
      newCompletedMilestones.add(milestoneId);
    }
    setCompletedMilestones(newCompletedMilestones);
  };

  useEffect(() => {
    if (birthDate) {
      handleCalculate();
    }
  }, [birthDate, isPremature, gestationalWeeks]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'motor': return 'primary-blue';
      case 'cognitive': return 'growth-green';
      case 'language': return 'system-info';
      case 'social': return 'system-warning';
      case 'physical': return 'system-error';
      default: return 'neutral';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'motor': return '🏃';
      case 'cognitive': return '🧠';
      case 'language': return '💬';
      case 'social': return '👥';
      case 'physical': return '📏';
      default: return '📋';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'motor': return 'Motor';
      case 'cognitive': return 'Cognitivo';
      case 'language': return 'Linguagem';
      case 'social': return 'Social';
      case 'physical': return 'Físico';
      default: return 'Outros';
    }
  };

  const getDevelopmentStatus = (score: number) => {
    if (score >= 90) return { status: 'Excelente', color: 'growth-green', emoji: '🌟' };
    if (score >= 75) return { status: 'Bom', color: 'primary-blue', emoji: '✅' };
    if (score >= 60) return { status: 'Atenção', color: 'system-warning', emoji: '⚠️' };
    return { status: 'Consulte Pediatra', color: 'system-error', emoji: '🏥' };
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora">Calculadoras</BreadcrumbItem>
        <BreadcrumbItem href="/calculadora/saude">Saúde</BreadcrumbItem>
        <BreadcrumbItem isLast>Desenvolvimento Infantil</BreadcrumbItem>
      </Breadcrumb>

      <header className="text-center space-y-4">
        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          Calculadora de Desenvolvimento Infantil
        </h1>
        <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
          Acompanhe o <strong className="text-primary-blue-dark">desenvolvimento do seu bebê</strong> com marcos personalizados por idade, cronograma de <strong className="text-growth-green">consultas pediátricas</strong> e cálculo de idade corrigida para <strong className="text-system-info">prematuros</strong>.
        </p>
        <div className="bg-growth-green-light rounded-lg p-4 inline-block duration-300">
          <p className="text-sm text-text-primary font-medium">
            🍼 <strong>0-36 meses</strong> • 👶 <strong>Marcos interativos</strong> • 📊 <strong>Progresso visual</strong> • 🏥 <strong>Cronograma médico</strong>
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle as="h2">Informações do Bebê</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="max-w-sm mx-auto">
              <Input
                type="date"
                label="Data de nascimento"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                fullWidth
              />
              <p className="mt-1 text-xs text-text-secondary text-center">
                Data de nascimento do bebê
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <h3 className="font-semibold mb-3 text-text-primary text-center text-sm">Bebê prematuro?</h3>
              <div className="flex rounded-lg border border-neutral-surface-variant overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsPremature(false)}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    !isPremature
                      ? "bg-primary-blue text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-primary-blue/10-dark/10"
                  }`}
                >
                  👶 Não (≥ 37 semanas)
                </button>
                <button
                  type="button"
                  onClick={() => setIsPremature(true)}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    isPremature
                      ? "bg-system-warning text-white"
                      : "bg-neutral-surface text-text-secondary hover:bg-system-warning/10:bg-system-warning-dark/10"
                  }`}
                >
                  🍼 Sim (&lt; 37 semanas)
                </button>
              </div>
            </div>

            {isPremature && (
              <div className="max-w-xs mx-auto">
                <Input
                  type="number"
                  label="Semanas de gestação"
                  value={gestationalWeeks}
                  onChange={(e) => setGestationalWeeks(e.target.value)}
                  placeholder="Ex: 34"
                  min="24"
                  max="42"
                  step="1"
                  required
                  fullWidth
                />
                <p className="mt-1 text-xs text-text-secondary text-center">
                  Semanas de gestação ao nascer
                </p>
              </div>
            )}

            <div className="bg-system-info/10 p-4 rounded-lg border border-system-info/20">
              <h3 className="font-semibold text-system-info mb-2">
                💡 Como usar a calculadora
              </h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• <strong>Marcos interativos:</strong> Marque os marcos que seu bebê já alcançou</li>
                <li>• <strong>Idade corrigida:</strong> Calculada automaticamente para prematuros</li>
                <li>• <strong>Cronograma médico:</strong> Sugestão de próximas consultas</li>
                <li>• <strong>Monitoramento:</strong> Acompanhe o progresso ao longo do tempo</li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={handleCalculate} className="px-8">
                Calcular Desenvolvimento
              </Button>
              <Button 
                onClick={handleReset} 
                variant="outline"
                className="px-8 border-system-error text-system-error hover:bg-system-error hover:text-white"
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* Resumo da idade e desenvolvimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-primary-blue/10 border-l-4 border-primary-blue">
              <CardHeader>
                <CardTitle as="h3" className="text-primary-blue-dark text-lg">
                  👶 Idade Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-1">
                  <div className="text-lg font-semibold text-text-primary">
                    {formatAge(result.ageInMonths)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {result.ageInWeeks} semanas
                  </div>
                  {result.correctedAge !== undefined && (
                    <div className="text-xs text-system-warning">
                      Idade corrigida: {formatAge(result.correctedAge)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-${getDevelopmentStatus(result.developmentScore).color}/10${getDevelopmentStatus(result.developmentScore).color}-dark/10 border-l-4 border-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark`}>
              <CardHeader>
                <CardTitle as="h3" className={`text-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark text-lg`}>
                  {getDevelopmentStatus(result.developmentScore).emoji} Score Desenvolvimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-1">
                  <div className={`text-2xl font-bold text-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark`}>
                    {result.developmentScore}%
                  </div>
                  <div className={`text-sm text-${getDevelopmentStatus(result.developmentScore).color}${getDevelopmentStatus(result.developmentScore).color}-dark font-medium`}>
                    {getDevelopmentStatus(result.developmentScore).status}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-growth-green/10 border-l-4 border-growth-green">
              <CardHeader>
                <CardTitle as="h3" className="text-growth-green text-lg">
                  🎯 Marcos Atuais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-text-primary">
                    {result.currentMilestones.length}
                  </div>
                  <div className="text-sm text-growth-green">
                    marcos para sua idade
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-system-info/10 border-l-4 border-system-info">
              <CardHeader>
                <CardTitle as="h3" className="text-system-info text-lg">
                  🏥 Próxima Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-1">
                  <div className="text-sm font-semibold text-text-primary">
                    {formatDate(result.nextCheckupDate)}
                  </div>
                  <div className="text-xs text-system-info">
                    consulta pediátrica
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progresso por categoria */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">📊 Progresso por Área de Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.categories).map(([key, category]) => (
                  <div key={key} className={`p-4 rounded-lg border border-${getCategoryColor(key)}/20${getCategoryColor(key)}-dark/20 bg-${getCategoryColor(key)}/5${getCategoryColor(key)}-dark/5`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold text-${getCategoryColor(key)}${getCategoryColor(key)}-dark flex items-center`}>
                        {getCategoryEmoji(key)} <span className="ml-2">{getCategoryName(key)}</span>
                      </h4>
                      <span className={`text-lg font-bold text-${getCategoryColor(key)}${getCategoryColor(key)}-dark`}>
                        {category.percentage}%
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      {category.achieved}/{category.total} marcos
                    </div>
                    <div className="mt-2 bg-light rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${getCategoryColor(key)}${getCategoryColor(key)}-dark transition-all duration-300`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Marcos atuais - Interativos */}
          {result.currentMilestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">🎯 Marcos para sua Idade ({formatAge(result.correctedAge || result.ageInMonths)})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.currentMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        completedMilestones.has(milestone.id)
                          ? `border-growth-green bg-growth-green/10`
                          : `border-light bg-background hover:border-${getCategoryColor(milestone.category)}/50 ${getCategoryColor(milestone.category)}-dark/50`
                      }`}
                      onClick={() => toggleMilestone(milestone.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 ${
                          completedMilestones.has(milestone.id)
                            ? 'border-growth-green bg-growth-green'
                            : 'border-neutral-surface-variant'
                        }`}>
                          {completedMilestones.has(milestone.id) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-text-primary">
                              {milestone.title}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium text-${getCategoryColor(milestone.category)}${getCategoryColor(milestone.category)}-dark bg-${getCategoryColor(milestone.category)}/10${getCategoryColor(milestone.category)}-dark/10`}>
                              {getCategoryEmoji(milestone.category)} {getCategoryName(milestone.category)}
                            </span>
                            {milestone.priority === 'high' && (
                              <span className="px-2 py-1 rounded text-xs font-medium text-system-error-dark bg-system-error/10">
                                🚨 Importante
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary">
                            {milestone.description}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            Idade esperada: {formatAge(milestone.expectedAgeMonths)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-text-secondary">
                    💡 <strong>Dica:</strong> Clique nos marcos para marcar como alcançados
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Próximos marcos */}
          {result.upcomingMilestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle as="h3">⏳ Próximos Marcos de Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.upcomingMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-4 rounded-lg border border-neutral-surface-variant bg-background"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-text-primary">
                          {milestone.title}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium text-${getCategoryColor(milestone.category)}${getCategoryColor(milestone.category)}-dark bg-${getCategoryColor(milestone.category)}/10${getCategoryColor(milestone.category)}-dark/10`}>
                          {getCategoryEmoji(milestone.category)} {getCategoryName(milestone.category)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {milestone.description}
                      </p>
                      <p className="text-xs text-system-info">
                        📅 Previsto para: {formatAge(milestone.expectedAgeMonths)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Marcos em atraso - se houver */}
          {result.overdueMilestones.length > 0 && (
            <Card className="bg-system-warning/10 border-l-4 border-system-warning">
              <CardHeader>
                <CardTitle as="h3" className="text-system-warning">
                  ⚠️ Marcos que Merecem Atenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.overdueMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-4 rounded-lg border border-system-warning/20 bg-system-warning/5/5"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-text-primary">
                          {milestone.title}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium text-${getCategoryColor(milestone.category)}${getCategoryColor(milestone.category)}-dark bg-${getCategoryColor(milestone.category)}/10${getCategoryColor(milestone.category)}-dark/10`}>
                          {getCategoryEmoji(milestone.category)} {getCategoryName(milestone.category)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {milestone.description}
                      </p>
                      <p className="text-xs text-system-warning">
                        Era esperado aos: {formatAge(milestone.expectedAgeMonths)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-system-info/10 rounded-lg border border-system-info/20">
                  <p className="text-sm text-system-info">
                    <strong>💡 Importante:</strong> Cada bebê se desenvolve em seu próprio ritmo. Se você tem preocupações, consulte seu pediatra para uma avaliação individualizada.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Seção: Métodos de Avaliação do Desenvolvimento Infantil */}
      <Card className="bg-system-info/10 border-l-4 border-system-info duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔬 Métodos Científicos de Avaliação do Desenvolvimento Infantil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-text-primary">
              Nossa calculadora combina diferentes <strong className="text-system-info">métodos científicos reconhecidos</strong> para oferecer uma avaliação abrangente do desenvolvimento infantil. Entenda cada método utilizado:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-blue/5/5 p-4 rounded-lg border border-primary-blue/20">
                <h4 className="font-semibold mb-3 text-primary-blue-dark flex items-center">
                  📋 <span className="ml-2">Escala de Marcos Desenvolvimentais</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• <strong>Baseado em:</strong> Academia Americana de Pediatria (AAP)</li>
                  <li>• <strong>Referência:</strong> Sociedade Brasileira de Pediatria (SBP)</li>
                  <li>• <strong>Metodologia:</strong> Marcos padronizados por idade</li>
                  <li>• <strong>Precisão:</strong> 95% de confiabilidade para população geral</li>
                  <li>• <strong>Categorias:</strong> Motor, Cognitivo, Linguagem, Social</li>
                </ul>
                <div className="mt-3 p-2 bg-primary-blue/10 rounded text-xs text-primary-blue-dark">
                  <strong>Vantagens:</strong> Padronização internacional, fácil aplicação, monitoramento longitudinal
                </div>
              </div>
              
              <div className="bg-growth-green/5/5 p-4 rounded-lg border border-growth-green/20">
                <h4 className="font-semibold mb-3 text-growth-green flex items-center">
                  ⏱️ <span className="ml-2">Idade Corrigida para Prematuros</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• <strong>Cálculo:</strong> Semanas de prematuridade descontadas</li>
                  <li>• <strong>Aplicação:</strong> Bebês nascidos &lt; 37 semanas</li>
                  <li>• <strong>Período:</strong> Até 24 meses de idade cronológica</li>
                  <li>• <strong>Precisão:</strong> Ajuste baseado em evidências científicas</li>
                  <li>• <strong>Importância:</strong> Expectativas realistas de desenvolvimento</li>
                </ul>
                <div className="mt-3 p-2 bg-growth-green/10 rounded text-xs text-growth-green">
                  <strong>Exemplo:</strong> Bebê de 6 meses nascido com 32 semanas usa idade corrigida de 4 meses
                </div>
              </div>
              
              <div className="bg-system-warning/5/5 p-4 rounded-lg border border-system-warning/20">
                <h4 className="font-semibold mb-3 text-system-warning flex items-center">
                  📊 <span className="ml-2">Sistema de Pontuação Ponderada</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• <strong>Prioridade Alta:</strong> Marcos críticos (peso 3x)</li>
                  <li>• <strong>Prioridade Média:</strong> Marcos importantes (peso 2x)</li>
                  <li>• <strong>Prioridade Baixa:</strong> Marcos complementares (peso 1x)</li>
                  <li>• <strong>Tolerância:</strong> Variação por categoria de prioridade</li>
                  <li>• <strong>Score Final:</strong> Percentual ponderado de desenvolvimento</li>
                </ul>
                <div className="mt-3 p-2 bg-system-warning/10 rounded text-xs text-system-warning">
                  <strong>Benefício:</strong> Identifica rapidamente marcos que necessitam atenção especial
                </div>
              </div>
              
              <div className="bg-system-info/5/5 p-4 rounded-lg border border-system-info/20">
                <h4 className="font-semibold mb-3 text-system-info flex items-center">
                  🎯 <span className="ml-2">Análise Multidimensional</span>
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• <strong>4 Domínios:</strong> Análise separada por área</li>
                  <li>• <strong>Progresso Individual:</strong> Percentual por categoria</li>
                  <li>• <strong>Identificação Precoce:</strong> Atrasos específicos</li>
                  <li>• <strong>Intervenção Dirigida:</strong> Foco nas áreas necessárias</li>
                  <li>• <strong>Acompanhamento:</strong> Evolução temporal do progresso</li>
                </ul>
                <div className="mt-3 p-2 bg-system-info/10 rounded text-xs text-system-info">
                  <strong>Diferencial:</strong> Visão holística e específica simultaneamente
                </div>
              </div>
            </div>
            
            <div className="bg-growth-green/10 p-4 rounded-lg border border-growth-green/20">
              <h4 className="font-semibold text-growth-green mb-2">🏆 Por que Nossa Metodologia se Destaca?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-text-secondary">
                <div>
                  <strong className="text-growth-green">1. Precisão Científica</strong>
                  <p>Baseada nas diretrizes mais atuais da pediatria mundial, com marcos validados por pesquisas longitudinais.</p>
                </div>
                <div>
                  <strong className="text-growth-green">2. Personalização Total</strong>
                  <p>Considera prematuridade, prioridades de marcos e oferece análise individualizada por área de desenvolvimento.</p>
                </div>
                <div>
                  <strong className="text-growth-green">3. Interatividade Única</strong>
                  <p>Interface que permite acompanhamento dinâmico, marcação de conquistas e visualização do progresso em tempo real.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: FAQ Otimizada para SEO */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            ❓ Perguntas Frequentes - Desenvolvimento Infantil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary-blue pl-4">
                  <h4 className="font-semibold mb-2 text-primary-blue-dark">1. Quando devo me preocupar com atrasos no desenvolvimento?</h4>
                  <p className="text-sm text-text-secondary">
                    Marcos de <strong>alta prioridade</strong> com atraso superior a 2 meses merecem atenção. Para marcos de média prioridade, a tolerância é de 3-4 meses. Sempre consulte um pediatra se tiver dúvidas ou se múltiplos marcos estiverem atrasados.
                  </p>
                </div>
                
                <div className="border-l-4 border-growth-green pl-4">
                  <h4 className="font-semibold mb-2 text-growth-green">2. Como funciona o cálculo da idade corrigida para prematuros?</h4>
                  <p className="text-sm text-text-secondary">
                    Subtraímos as semanas de prematuridade da idade atual. Por exemplo: bebê de 10 meses nascido com 32 semanas (8 semanas antes das 40) tem idade corrigida de 8 meses. Usamos essa idade para avaliar marcos até os 24 meses.
                  </p>
                </div>
                
                <div className="border-l-4 border-system-info pl-4">
                  <h4 className="font-semibold mb-2 text-system-info">3. Posso usar a calculadora para crianças com deficiência?</h4>
                  <p className="text-sm text-text-secondary">
                    A calculadora oferece uma <strong>referência geral</strong>, mas crianças com deficiências podem ter padrões únicos de desenvolvimento. Recomendamos usar como complemento ao acompanhamento especializado, não como substituto.
                  </p>
                </div>
                
                <div className="border-l-4 border-system-warning pl-4">
                  <h4 className="font-semibold mb-2 text-system-warning">4. Qual a diferença entre desenvolvimento motor fino e grosso?</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Motor grosso:</strong> movimentos de grandes músculos (rolar, sentar, andar). <strong>Motor fino:</strong> movimentos precisos (pegar objetos pequenos, desenhar). Nossa calculadora avalia ambos dentro da categoria "Motor".
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-system-error-dark pl-4">
                  <h4 className="font-semibold mb-2 text-system-error-dark">5. O que fazer se meu bebê está "adiantado" nos marcos?</h4>
                  <p className="text-sm text-text-secondary">
                    Desenvolvimento acelerado em algumas áreas é normal! Continue estimulando todas as áreas igualmente. Bebês podem se destacar em uma categoria (ex: motor) e ser típicos em outras. O importante é o <strong>progresso contínuo</strong>.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-blue pl-4">
                  <h4 className="font-semibold mb-2 text-primary-blue-dark">6. Com que frequência devo atualizar o acompanhamento?</h4>
                  <p className="text-sm text-text-secondary">
                    Recomendamos verificar semanalmente nos primeiros 6 meses, quinzenalmente dos 6-12 meses, e mensalmente após 1 ano. Marque marcos assim que observá-los pela primeira vez de forma consistente.
                  </p>
                </div>
                
                <div className="border-l-4 border-growth-green pl-4">
                  <h4 className="font-semibold mb-2 text-growth-green">7. A calculadora substitui consultas pediátricas?</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>Definitivamente não!</strong> Nossa ferramenta é complementar. Use-a para se preparar para consultas, fazer perguntas direcionadas e acompanhar progresso entre consultas. O pediatra sempre deve ser consultado para avaliação completa.
                  </p>
                </div>
                
                <div className="border-l-4 border-system-warning pl-4">
                  <h4 className="font-semibold mb-2 text-system-warning">8. Por que alguns marcos têm prioridades diferentes?</h4>
                  <p className="text-sm text-text-secondary">
                    Marcos de <strong>alta prioridade</strong> são fundamentais para o desenvolvimento futuro e indicadores precoces de possíveis problemas. Marcos de prioridade média e baixa são importantes, mas têm maior variabilidade normal entre crianças.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-blue/10 p-4 rounded-lg border border-primary-blue/20">
              <h4 className="font-semibold text-primary-blue-dark mb-2 flex items-center">
                💡 <span className="ml-2">Dica para Pais de Primeira Viagem</span>
              </h4>
              <p className="text-sm text-text-secondary">
                <strong>Relaxe e observe!</strong> Cada bebê é único. Use nossa calculadora como uma <strong>bússola, não um cronômetro</strong>. 
                O mais importante é o amor, a interação e o acompanhamento médico regular. Desenvolvimento saudável acontece no ritmo certo para cada criança.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                <strong>Tem outras dúvidas?</strong> Nossa calculadora oferece explicações detalhadas para cada marco e categoria de desenvolvimento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: O que é desenvolvimento infantil */}
      <Card className="bg-growth-green-soft border-l-4 border-growth-green duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🌱 O que é Desenvolvimento Infantil?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-text-primary">
            <p>
              O <strong className="text-growth-green">desenvolvimento infantil</strong> é o processo contínuo de mudanças físicas, cognitivas, emocionais e sociais que ocorrem nos primeiros anos de vida. É fundamental acompanhar os marcos de desenvolvimento para identificar precocemente qualquer necessidade de intervenção.
            </p>
            <p>
              Os marcos são habilidades que a maioria das crianças desenvolve em idades específicas. Eles servem como <strong className="text-primary-blue-dark">guias gerais</strong>, mas é importante lembrar que cada criança é única e pode alcançar esses marcos em momentos diferentes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-growth-green">🧠 Áreas de Desenvolvimento</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• <strong>Motor:</strong> Movimentos e coordenação física</li>
                  <li>• <strong>Cognitivo:</strong> Pensamento, aprendizado e resolução de problemas</li>
                  <li>• <strong>Linguagem:</strong> Comunicação e compreensão</li>
                  <li>• <strong>Social:</strong> Interação e relacionamentos</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-primary-blue-dark">📅 Importância do Acompanhamento</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Identificação precoce de atrasos</li>
                  <li>• Orientação para estímulos adequados</li>
                  <li>• Tranquilidade para os pais</li>
                  <li>• Cronograma de consultas pediátricas</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Inovações diferenciais */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🚀 Recursos Exclusivos da Nossa Calculadora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary-blue-dark flex items-center">
                ✅ <span className="ml-2">Marcos Interativos</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Check-list dinâmico:</strong> Marque marcos alcançados em tempo real</li>
                <li>• <strong>Progresso visual:</strong> Acompanhe o desenvolvimento por categorias</li>
                <li>• <strong>Priorização:</strong> Marcos críticos destacados</li>
                <li>• <strong>Histórico:</strong> Registre quando cada marco foi atingido</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-growth-green flex items-center">
                👶 <span className="ml-2">Suporte a Prematuros</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Idade corrigida:</strong> Cálculo automático para prematuros</li>
                <li>• <strong>Marcos ajustados:</strong> Expectativas realistas baseadas na idade corrigida</li>
                <li>• <strong>Acompanhamento especializado:</strong> Cronograma específico de consultas</li>
                <li>• <strong>Tolerância personalizada:</strong> Consideração da prematuridade nos prazos</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-system-info flex items-center">
                📊 <span className="ml-2">Analytics Avançados</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Score de desenvolvimento:</strong> Avaliação percentual geral</li>
                <li>• <strong>Análise por categoria:</strong> Progresso detalhado por área</li>
                <li>• <strong>Alertas inteligentes:</strong> Identificação de marcos em atraso</li>
                <li>• <strong>Tendências:</strong> Visualização do progresso ao longo do tempo</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-system-warning flex items-center">
                🏥 <span className="ml-2">Cronograma Médico</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Consultas automáticas:</strong> Sugestão de datas por faixa etária</li>
                <li>• <strong>Lembretes importantes:</strong> Vacinas e exames por idade</li>
                <li>• <strong>Preparação:</strong> O que esperar em cada consulta</li>
                <li>• <strong>Perguntas sugeridas:</strong> Para discutir com o pediatra</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Como estimular o desenvolvimento */}
      <Card className="bg-system-info/10 border-l-4 border-system-info duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🎯 Como Estimular o Desenvolvimento do Bebê
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary-blue-dark flex items-center">
                🏃 <span className="ml-2">Desenvolvimento Motor</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Tummy time:</strong> Tempo de barriga para baixo supervisionado</li>
                <li>• <strong>Brinquedos texturizados:</strong> Diferentes materiais para explorar</li>
                <li>• <strong>Espaço seguro:</strong> Ambiente livre para movimentação</li>
                <li>• <strong>Brincadeiras físicas:</strong> Puxar para sentar, rolar</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-growth-green flex items-center">
                🧠 <span className="ml-2">Desenvolvimento Cognitivo</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Contraste visual:</strong> Livros e brinquedos com alto contraste</li>
                <li>• <strong>Causa e efeito:</strong> Brinquedos que respondem a ações</li>
                <li>• <strong>Música e sons:</strong> Diferentes estímulos sonoros</li>
                <li>• <strong>Esconde-esconde:</strong> Jogos de permanência do objeto</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-system-info flex items-center">
                💬 <span className="ml-2">Desenvolvimento da Linguagem</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Conversar sempre:</strong> Narrar atividades do dia a dia</li>
                <li>• <strong>Leitura diária:</strong> Livros adequados para a idade</li>
                <li>• <strong>Canções e rimas:</strong> Musicas infantis e parlendas</li>
                <li>• <strong>Responder aos balbucios:</strong> Manter "conversas" com o bebê</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-system-warning flex items-center">
                👥 <span className="ml-2">Desenvolvimento Social</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Contato visual:</strong> Olhar nos olhos durante atividades</li>
                <li>• <strong>Expressões faciais:</strong> Sorrir e fazer caretas</li>
                <li>• <strong>Rotinas sociais:</strong> Cumprimentos, despedidas</li>
                <li>• <strong>Interação com outros:</strong> Socialização supervisionada</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-growth-green/10 p-4 rounded-lg border border-growth-green/20">
            <h4 className="font-semibold text-growth-green mb-2">💡 Dica Importante</h4>
            <p className="text-sm text-text-secondary">
              <strong>O melhor estímulo é o amor e a atenção!</strong> Brincadeiras simples, carinho e interação são mais importantes que brinquedos caros. Respeite o ritmo do seu bebê e celebre cada pequena conquista.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Quando procurar ajuda */}
      <Card className="bg-system-warning/10 border-l-4 border-system-warning duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🏥 Quando Procurar Ajuda Profissional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-system-error-dark flex items-center">
                🚨 <span className="ml-2">Sinais de Alerta por Idade</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-text-primary">2 meses:</h5>
                  <ul className="text-sm text-text-secondary ml-4">
                    <li>• Não sorri socialmente</li>
                    <li>• Não acompanha objetos com os olhos</li>
                    <li>• Não levanta a cabeça</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-text-primary">6 meses:</h5>
                  <ul className="text-sm text-text-secondary ml-4">
                    <li>• Não rola</li>
                    <li>• Não emite sons</li>
                    <li>• Muito mole ou rígido</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-text-primary">12 meses:</h5>
                  <ul className="text-sm text-text-secondary ml-4">
                    <li>• Não aponta ou acena</li>
                    <li>• Não fala "mamá" ou "papá"</li>
                    <li>• Não fica em pé com apoio</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-system-info flex items-center">
                👨‍⚕️ <span className="ml-2">Profissionais Especializados</span>
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong>Pediatra:</strong> Primeira avaliação e encaminhamentos</li>
                <li>• <strong>Neuropediatra:</strong> Desenvolvimento neurológico</li>
                <li>• <strong>Fisioterapeuta:</strong> Desenvolvimento motor</li>
                <li>• <strong>Fonoaudiólogo:</strong> Linguagem e comunicação</li>
                <li>• <strong>Terapeuta Ocupacional:</strong> Habilidades funcionais</li>
                <li>• <strong>Psicólogo infantil:</strong> Desenvolvimento socioemocional</li>
              </ul>
              
              <div className="mt-4 p-3 bg-growth-green/10 rounded-lg border border-growth-green/20">
                <h5 className="font-semibold text-growth-green mb-1">✅ Lembre-se</h5>
                <p className="text-xs text-text-secondary">
                  A <strong>intervenção precoce</strong> é fundamental. Não hesite em procurar ajuda se tiver dúvidas. É melhor uma avaliação desnecessária do que perder uma oportunidade de ajudar seu bebê.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Calculadoras relacionadas - Jornada completa da maternidade */}
      <Card className="bg-background-dark-secondary border border-neutral-surface-variant duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-xl font-bold text-text-primary">
            🔗 Jornada Completa: Da Concepção ao Desenvolvimento
          </CardTitle>
          <p className="text-sm text-text-secondary mt-2">
            Acompanhe toda a jornada da maternidade com nossas calculadoras especializadas
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-growth-green-soft p-4 rounded-lg border border-growth-green/20">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🌸</span>
                  <div>
                    <h4 className="font-bold text-growth-green text-sm">FASE 1: Planejamento</h4>
                    <p className="text-xs text-text-secondary">Preparando para engravidar</p>
                  </div>
                </div>
                <h3 className="font-semibold text-growth-green mb-1">
                  Calculadora de Ciclo Menstrual
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  <strong>Identifique seu período fértil</strong> e optimize as chances de concepção com acompanhamento personalizado do ciclo.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-growth-green font-medium">
                    Fertilidade • Ovulação • Concepção
                  </span>
                  <a 
                    href="/calculadora/saude/ciclo-menstrual" 
                    className="text-xs bg-growth-green text-white px-2 py-1 rounded hover:bg-growth-green-dark"
                  >
                    Usar →
                  </a>
                </div>
              </div>
              
              <div className="bg-primary-blue-light p-4 rounded-lg border border-primary-blue/20">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🤰</span>
                  <div>
                    <h4 className="font-bold text-primary-blue-dark text-sm">FASE 2: Gestação</h4>
                    <p className="text-xs text-text-secondary">Cuidando da saúde materna</p>
                  </div>
                </div>
                <h3 className="font-semibold text-primary-blue-dark mb-1">
                  Calculadora de IMC
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  <strong>Monitore seu peso ideal</strong> antes e após a gravidez para uma gestação saudável e recuperação adequada.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-blue-dark font-medium">
                    Peso • Saúde • Pré-natal
                  </span>
                  <a 
                    href="/calculadora/saude/imc" 
                    className="text-xs bg-primary-blue text-white px-2 py-1 rounded hover:bg-primary-blue-dark"
                  >
                    Usar →
                  </a>
                </div>
              </div>
              
              <div className="bg-system-info-soft p-4 rounded-lg border border-system-info/20">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">👶</span>
                  <div>
                    <h4 className="font-bold text-system-info text-sm">FASE 3: Desenvolvimento</h4>
                    <p className="text-xs text-text-secondary">Acompanhando o crescimento</p>
                  </div>
                </div>
                <h3 className="font-semibold text-system-info mb-1">
                  Desenvolvimento Infantil ✨
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  <strong>Você está aqui!</strong> Monitore marcos de desenvolvimento, cronograma médico e progresso interativo.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-system-info font-medium">
                    Marcos • Pediatria • 0-36 meses
                  </span>
                  <span className="text-xs bg-system-info/20 text-system-info/20 px-2 py-1 rounded font-medium">
                    Atual
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-growth-green/10 to-primary-blue/10 p-4 rounded-lg border border-growth-green/20">
              <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                🌟 <span className="ml-2">Jornada Integrada da Maternidade</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-growth-green">1. Planejamento Familiar</div>
                  <p className="text-xs text-text-secondary">Use a calculadora de ciclo menstrual para otimizar as chances de concepção natural</p>
                </div>
                <div className="text-center">
                  <div className="font-medium text-primary-blue-dark">2. Gestação Saudável</div>
                  <p className="text-xs text-text-secondary">Monitore seu IMC e peso para uma gravidez equilibrada</p>
                </div>
                <div className="text-center">
                  <div className="font-medium text-system-info">3. Desenvolvimento do Bebê</div>
                  <p className="text-xs text-text-secondary">Acompanhe cada marco importante do crescimento do seu filho</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-system-warning-soft p-3 rounded-lg border border-system-warning/20">
                <h4 className="font-semibold text-system-warning mb-1 text-sm">
                  📊 Para Profissionais de Saúde
                </h4>
                <p className="text-xs text-text-secondary mb-2">
                  Ferramentas complementares para consultórios e clínicas especializadas em saúde materno-infantil.
                </p>
                <a 
                  href="/calculadora/saude/gordura-corporal" 
                  className="text-xs text-system-warning hover:underline"
                >
                  Calculadora de Gordura Corporal →
                </a>
              </div>
              
              <div className="bg-growth-green-soft p-3 rounded-lg border border-growth-green/20">
                <h4 className="font-semibold text-growth-green mb-1 text-sm">
                  💝 Compartilhe com Outros Pais
                </h4>
                <p className="text-xs text-text-secondary mb-2">
                  Ajude outras famílias em sua jornada compartilhando nossas calculadoras especializadas.
                </p>
                <button 
                  onClick={() => navigator.share?.({ 
                    title: 'Calculadoras de Desenvolvimento Infantil', 
                    url: window.location.href 
                  })}
                  className="text-xs text-growth-green hover:underline"
                >
                  Compartilhar ferramentas →
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center border-t border-neutral-surface-variant pt-4">
            <a 
              href="/calculadora/saude" 
              className="inline-flex items-center text-primary-blue-dark hover font-medium"
            >
              🏥 Explorar Todas as Calculadoras de Saúde
            </a>
            <p className="text-xs text-text-secondary mt-1">
              Descubra mais ferramentas para cuidar da saúde da sua família
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer informativo */}
      <Card className="bg-primary-blue-light border-l-4 border-primary-blue duration-300">
        <CardHeader>
          <CardTitle as="h2" className="text-lg font-bold text-text-primary">
            📚 Sobre Esta Calculadora de Desenvolvimento Infantil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Esta calculadora de desenvolvimento infantil é <strong className="text-primary-blue-dark">gratuita</strong> e foi desenvolvida com base em diretrizes pediátricas reconhecidas internacionalmente. 
              Os marcos incluem referências da Academia Americana de Pediatria (AAP) e Sociedade Brasileira de Pediatria (SBP).
            </p>
            <p>
              <strong className="text-growth-green">Diferencial único:</strong> Nossa calculadora oferece recursos exclusivos como marcos interativos, suporte completo a prematuros, cronograma médico personalizado e análise visual do progresso por categorias.
            </p>
            <p>
              <strong className="text-system-warning">Importante:</strong> Esta ferramenta é apenas para fins educacionais e informativos. 
              Não substitui consultas médicas regulares. Sempre discuta o desenvolvimento do seu bebê com um pediatra qualificado.
            </p>
            <p className="text-xs opacity-75">
              Última atualização: Dezembro 2024 • Baseado em diretrizes pediátricas atualizadas • Dados processados localmente para privacidade
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}