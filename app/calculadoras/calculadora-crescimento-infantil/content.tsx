import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GrowthContent = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Calculadora de Crescimento e Desenvolvimento Infantil - Avalie o Crescimento do seu Filho
      </Typography>

      <Typography variant="body1" paragraph>
        Nossa <strong>calculadora de crescimento infantil</strong> utiliza as <strong>curvas de crescimento da OMS</strong> 
        para avaliar o desenvolvimento das crianças de 0 a 5 anos. Calcule <strong>percentis de peso e altura</strong>, 
        <strong>previsão de altura adulta</strong> e acompanhe os <strong>marcos de desenvolvimento</strong> do seu filho 
        com base em padrões internacionais de saúde infantil.
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            📊 O que são Percentis de Crescimento?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Os <strong>percentis de crescimento</strong> indicam como o desenvolvimento da criança se compara 
            com outras crianças da mesma idade e sexo:
          </Typography>
          
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Percentil 50:</strong> Representa a média da população (50% das crianças estão acima e 50% abaixo)
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Percentil 3-97:</strong> Faixa considerada normal para 94% das crianças saudáveis
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Abaixo do percentil 3:</strong> Pode indicar baixo peso ou baixa estatura, requerendo avaliação médica
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Acima do percentil 97:</strong> Pode indicar sobrepeso, obesidade ou crescimento acelerado
              </Typography>
            </li>
          </Box>

          <Typography variant="body2" paragraph>
            <strong>Importante:</strong> Percentis são ferramentas de triagem. A avaliação deve sempre considerar 
            o padrão de crescimento individual da criança ao longo do tempo, não apenas uma medida isolada.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            📏 Como Funciona o Cálculo da Altura Adulta
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Nossa calculadora utiliza a <strong>Fórmula de Tanner</strong> para prever a altura adulta 
            baseada na altura dos pais:
          </Typography>

          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Fórmulas Utilizadas:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Meninos:</strong> (Altura da mãe + 13cm + Altura do pai) ÷ 2
            </Typography>
            <Typography variant="body2">
              <strong>Meninas:</strong> (Altura da mãe + Altura do pai - 13cm) ÷ 2
            </Typography>
          </Box>

          <Typography variant="body2" paragraph>
            <strong>Margem de erro:</strong> ±8,5cm é considerada uma variação normal. Fatores como nutrição, 
            exercícios, condições de saúde e genética podem influenciar o resultado final.
          </Typography>

          <Typography variant="body2" paragraph>
            <strong>Melhor uso:</strong> Esta previsão é mais precisa quando feita após os 2 anos de idade, 
            quando o padrão de crescimento da criança está mais estabelecido.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            🎯 Marcos de Desenvolvimento por Idade
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Acompanhe os principais <strong>marcos de desenvolvimento motor</strong> da criança por idade:
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            0-6 meses:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">2 meses: Sustenta a cabeça</Typography></li>
            <li><Typography variant="body2">4 meses: Rola de bruços para costas</Typography></li>
            <li><Typography variant="body2">6 meses: Senta com apoio</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            6-12 meses:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">8 meses: Senta sem apoio</Typography></li>
            <li><Typography variant="body2">10 meses: Engatinha</Typography></li>
            <li><Typography variant="body2">12 meses: Anda com apoio</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            12-36 meses:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">15 meses: Anda sem apoio</Typography></li>
            <li><Typography variant="body2">18 meses: Corre</Typography></li>
            <li><Typography variant="body2">24 meses: Sobe escadas</Typography></li>
            <li><Typography variant="body2">36 meses: Pedala triciclo</Typography></li>
          </Box>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            <strong>Lembre-se:</strong> Cada criança tem seu próprio ritmo de desenvolvimento. 
            Variações de alguns meses são normais, mas consulte um pediatra se houver atrasos significativos.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            ⚖️ Avaliação do Estado Nutricional Infantil
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            O <strong>estado nutricional</strong> é avaliado através da relação entre peso, altura e idade:
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Classificação Nutricional:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2"><strong>Baixo peso severo:</strong> Peso abaixo do percentil 3</Typography></li>
            <li><Typography variant="body2"><strong>Baixo peso:</strong> Peso entre percentis 3-10</Typography></li>
            <li><Typography variant="body2"><strong>Peso normal:</strong> Peso entre percentis 10-85</Typography></li>
            <li><Typography variant="body2"><strong>Sobrepeso:</strong> Peso entre percentis 85-97</Typography></li>
            <li><Typography variant="body2"><strong>Obesidade:</strong> Peso acima do percentil 97</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Crescimento Linear:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2"><strong>Baixa estatura:</strong> Altura abaixo do percentil 3</Typography></li>
            <li><Typography variant="body2"><strong>Estatura normal:</strong> Altura entre percentis 3-97</Typography></li>
            <li><Typography variant="body2"><strong>Alta estatura:</strong> Altura acima do percentil 97</Typography></li>
          </Box>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            <strong>Atenção especial:</strong> Crianças com baixo peso e baixa estatura podem ter desnutrição crônica. 
            Peso baixo com estatura normal pode indicar desnutrição aguda. Consulte sempre um pediatra ou nutricionista.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            🏥 Quando Procurar Orientação Médica
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Consulte um <strong>pediatra</strong> nas seguintes situações:
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Sinais de Alerta para Crescimento:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">Peso ou altura consistentemente abaixo do percentil 3</Typography></li>
            <li><Typography variant="body2">Queda abrupta nos percentis de crescimento</Typography></li>
            <li><Typography variant="body2">Diferença muito grande entre percentil de peso e altura</Typography></li>
            <li><Typography variant="body2">Ausência de ganho de peso por 2-3 meses (lactentes)</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Sinais de Alerta para Desenvolvimento:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">Atraso significativo nos marcos motores (mais de 2-3 meses)</Typography></li>
            <li><Typography variant="body2">Perda de habilidades já adquiridas</Typography></li>
            <li><Typography variant="body2">Assimetria ou rigidez muscular</Typography></li>
            <li><Typography variant="body2">Dificuldades de coordenação após 2 anos</Typography></li>
          </Box>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            <strong>Avaliação profissional:</strong> Além do pediatra, podem ser necessárias consultas com 
            endocrinologista pediátrico, nutricionista infantil ou fisioterapeuta, dependendo das necessidades da criança.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            📝 Como Medir Corretamente a Criança
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Para obter medidas precisas e resultados confiáveis:
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Medição do Peso:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">Use balança calibrada e de boa qualidade</Typography></li>
            <li><Typography variant="body2">Pese a criança sem roupas pesadas (fralda para bebês)</Typography></li>
            <li><Typography variant="body2">Faça a medição sempre no mesmo horário do dia</Typography></li>
            <li><Typography variant="body2">Para bebês: use balança pediátrica específica</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Medição da Altura:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2"><strong>0-24 meses:</strong> Meça deitado (comprimento) com régua pediátrica</Typography></li>
            <li><Typography variant="body2"><strong>Acima de 24 meses:</strong> Meça em pé, descalço, contra parede lisa</Typography></li>
            <li><Typography variant="body2">Mantenha a cabeça no plano de Frankfort (olhar para frente)</Typography></li>
            <li><Typography variant="body2">Faça 2-3 medições e use a média</Typography></li>
          </Box>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            <strong>Dica importante:</strong> Mantenha um registro das medições ao longo do tempo. 
            O padrão de crescimento é mais importante que uma única medida.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            🌟 Dicas para Promover Crescimento Saudável
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            <strong>Fatores essenciais</strong> para o crescimento e desenvolvimento adequados:
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Nutrição:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">Aleitamento materno exclusivo até 6 meses</Typography></li>
            <li><Typography variant="body2">Introdução alimentar adequada após 6 meses</Typography></li>
            <li><Typography variant="body2">Dieta rica em proteínas, cálcio, ferro e vitaminas</Typography></li>
            <li><Typography variant="body2">Evite açúcar em excesso e alimentos ultraprocessados</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Sono e Descanso:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">Recém-nascidos: 14-17 horas/dia</Typography></li>
            <li><Typography variant="body2">1-2 anos: 11-14 horas/dia</Typography></li>
            <li><Typography variant="body2">3-5 anos: 10-13 horas/dia</Typography></li>
            <li><Typography variant="body2">Estabeleça rotina de sono consistente</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Atividade Física:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><Typography variant="body2">Estimule movimento livre e brincadeiras ativas</Typography></li>
            <li><Typography variant="body2">Limite tempo de telas (máximo 1h/dia para 2-5 anos)</Typography></li>
            <li><Typography variant="body2">Atividades ao ar livre quando possível</Typography></li>
            <li><Typography variant="body2">Desenvolvimento motor através de brincadeiras</Typography></li>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4, color: 'secondary.main', fontWeight: 'bold' }}>
        Por que Usar Nossa Calculadora de Crescimento Infantil?
      </Typography>

      <Typography variant="body1" paragraph>
        Nossa <strong>calculadora de crescimento infantil</strong> oferece:
      </Typography>

      <Box component="ul" sx={{ pl: 2 }}>
        <li>
          <Typography variant="body1" paragraph>
            <strong>Padrões Internacionais:</strong> Baseada nas curvas de crescimento da OMS, reconhecidas mundialmente
          </Typography>
        </li>
        <li>
          <Typography variant="body1" paragraph>
            <strong>Avaliação Completa:</strong> Percentis de peso, altura, IMC e previsão de altura adulta
          </Typography>
        </li>
        <li>
          <Typography variant="body1" paragraph>
            <strong>Marcos de Desenvolvimento:</strong> Acompanhamento dos principais marcos motores por idade
          </Typography>
        </li>
        <li>
          <Typography variant="body1" paragraph>
            <strong>Interface Amigável:</strong> Resultados visuais claros com códigos de cores intuitivos
          </Typography>
        </li>
        <li>
          <Typography variant="body1" paragraph>
            <strong>Orientações Práticas:</strong> Interpretação dos resultados e quando buscar ajuda médica
          </Typography>
        </li>
      </Box>

      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        Acompanhe o <strong>crescimento e desenvolvimento</strong> do seu filho com nossa ferramenta profissional 
        e confiável. Seja para monitoramento rotineiro ou para identificar possíveis questões de desenvolvimento, 
        nossa calculadora oferece as informações essenciais para cuidar da saúde infantil com segurança.
      </Typography>
    </Box>
  );
};

export default GrowthContent;