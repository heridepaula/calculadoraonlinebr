"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Content = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileTextStyle = {
    textAlign: isMobile ? "justify" : "left",
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Guia Completo sobre Hidratação e Balanço Hídrico
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>hidratação adequada</strong> é fundamental para o bom funcionamento do organismo. Nossa <strong>calculadora de hidratação</strong> determina suas <strong>necessidades diárias de água</strong> baseada em fatores científicos como peso, idade, atividade física e condições climáticas.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Por que a hidratação é importante?</strong> A água constitui aproximadamente 60% do peso corporal em adultos e é essencial para todas as funções vitais: transporte de nutrientes, regulação da temperatura, eliminação de toxinas e manutenção do equilíbrio eletrolítico.
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            textAlign="center"
            fontSize="0.9rem"
          >
            <strong>Recomendação Geral OMS:</strong><br />
            2,7L/dia para mulheres • 3,7L/dia para homens
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Funções da Água no Organismo
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li>
              <strong style={{ color: theme.palette.primary.dark }}>
                Regulação da Temperatura:
              </strong>{" "}
              Através da transpiração e respiração, mantém a temperatura corporal constante.
            </li>
            <li>
              <strong style={{ color: theme.palette.secondary.dark }}>
                Transporte de Nutrientes:
              </strong>{" "}
              Carrega vitaminas, minerais e oxigênio para todas as células do corpo.
            </li>
            <li>
              <strong style={{ color: theme.palette.success.dark }}>
                Eliminação de Toxinas:
              </strong>{" "}
              Remove produtos metabólicos através dos rins, pulmões e pele.
            </li>
            <li>
              <strong style={{ color: theme.palette.warning.dark }}>
                Lubrificação e Proteção:
              </strong>{" "}
              Mantém articulações lubrificadas e protege órgãos vitais.
            </li>
            <li>
              <strong style={{ color: theme.palette.info.dark }}>
                Digestão e Absorção:
              </strong>{" "}
              Facilita a digestão dos alimentos e absorção de nutrientes.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Fatores que Influenciam as Necessidades Hídricas
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As necessidades de água variam significativamente entre indivíduos, sendo influenciadas por diversos fatores:
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li>
              <strong>Peso Corporal:</strong> Base fundamental - recomenda-se 35ml por kg de peso corporal para adultos.
            </li>
            <li>
              <strong>Idade:</strong> Crianças necessitam mais água por kg (40ml/kg), idosos têm menor reserva hídrica.
            </li>
            <li>
              <strong>Atividade Física:</strong> Exercícios aumentam as perdas hídricas através do suor (até 3L/hora).
            </li>
            <li>
              <strong>Clima:</strong> Temperaturas elevadas e baixa umidade aumentam as necessidades hídricas.
            </li>
            <li>
              <strong>Estado de Saúde:</strong> Febre, vômitos, diarreia e algumas medicações alteram o balanço hídrico.
            </li>
            <li>
              <strong>Gestação e Amamentação:</strong> Aumentam significativamente as necessidades hídricas.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Cálculo das Necessidades Hídricas
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontFamily="monospace"
            fontSize="0.85rem"
          >
            <strong>Fórmulas de Cálculo:</strong><br /><br />
            • <strong>Base por Peso:</strong> Peso (kg) × 35ml (adultos)<br />
            • <strong>Ajuste por Idade:</strong> +15% (crianças), -15% (idosos)<br />
            • <strong>Atividade Física:</strong> +20-80% conforme intensidade<br />
            • <strong>Clima:</strong> +30% (quente), -10% (frio)<br />
            • <strong>Gravidez:</strong> +300ml/dia<br />
            • <strong>Amamentação:</strong> +700ml/dia<br />
            <br />
            <strong>Exemplo (70kg, adulto, sedentário):</strong><br />
            - Necessidade base: 70 × 35 = 2.450ml<br />
            - Água dos alimentos: 490ml (20%)<br />
            - Água para beber: 1.960ml<br />
            - Copos de 250ml: 8 copos/dia
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Sinais de Desidratação
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Reconhecer os sinais de desidratação é crucial para manter um adequado balanço hídrico:
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Desidratação Leve (2-5%):</strong> Sede, boca seca, urina amarelo-escura, fadiga leve</li>
            <li><strong>Desidratação Moderada (5-10%):</strong> Tontura, dor de cabeça, pele menos elástica, redução urinária</li>
            <li><strong>Desidratação Severa (>10%):</strong> Confusão mental, taquicardia, hipotensão, pele pegajosa</li>
            <li><strong>Cor da Urina:</strong> Amarelo claro indica boa hidratação, amarelo escuro sugere desidratação</li>
            <li><strong>Teste da Prega Cutânea:</strong> Pelliscar a pele do dorso da mão - retorno lento indica desidratação</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Hidratação Durante Exercícios
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Durante atividades físicas, as perdas hídricas aumentam drasticamente, exigindo estratégias específicas de hidratação:
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Pré-exercício:</strong> 500-600ml de água 2-3 horas antes, 200-300ml 15-20 minutos antes</li>
            <li><strong>Durante exercício:</strong> 150-250ml a cada 15-20 minutos (exercícios > 1 hora)</li>
            <li><strong>Pós-exercício:</strong> 150% do peso perdido em suor nas próximas 6 horas</li>
            <li><strong>Exercícios longos:</strong> Bebidas esportivas com eletrólitos após 1 hora de atividade</li>
            <li><strong>Monitoramento:</strong> Pese-se antes e após o exercício para calcular perdas hídricas</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Água dos Alimentos
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Cerca de 20% das necessidades hídricas são supridas pelos alimentos. Conheça o teor de água dos principais grupos:
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Frutas (85-95%):</strong> Melancia, laranja, melão, morango, abacaxi, uva</li>
            <li><strong>Vegetais (85-95%):</strong> Pepino, alface, tomate, abobrinha, brócolis, espinafre</li>
            <li><strong>Laticínios (80-90%):</strong> Leite, iogurte, queijos frescos</li>
            <li><strong>Sopas e caldos (85-95%):</strong> Contribuição significativa para hidratação</li>
            <li><strong>Bebidas:</strong> Chás, sucos naturais, água de coco também contribuem</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Grupos Especiais - Necessidades Diferenciadas
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Crianças:</strong> Maior proporção de água corporal, metabolismo acelerado, maior vulnerabilidade</li>
            <li><strong>Idosos:</strong> Redução da sensação de sede, menor reserva hídrica, medicações diuréticas</li>
            <li><strong>Gestantes:</strong> Volume sanguíneo aumentado, líquido amniótico, necessidades do feto</li>
            <li><strong>Lactantes:</strong> Produção de leite exige 700ml adicionais por dia</li>
            <li><strong>Atletas:</strong> Perdas elevadas pelo suor, necessidade de reposição de eletrólitos</li>
            <li><strong>Pessoas com doenças:</strong> Febre, diabetes, doenças renais alteram necessidades hídricas</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Qualidade da Água
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Além da quantidade, a qualidade da água consumida é fundamental para a saúde:
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Água tratada:</strong> Livre de contaminantes microbiológicos e químicos</li>
            <li><strong>Filtração:</strong> Remove cloro, metais pesados e impurezas</li>
            <li><strong>pH adequado:</strong> Entre 6,0 e 8,5 conforme legislação brasileira</li>
            <li><strong>Minerais essenciais:</strong> Cálcio, magnésio, potássio em quantidades adequadas</li>
            <li><strong>Temperatura:</strong> Água em temperatura ambiente ou fresca é melhor absorvida</li>
          </Typography>

          <Box
            p={2}
            bgcolor="#fff3cd"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontSize="0.9rem"
          >
            <strong>⚠️ Atenção:</strong> Pessoas com problemas cardíacos ou renais devem consultar médico antes de aumentar significativamente o consumo de água. O excesso pode ser prejudicial em certas condições.
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Quando Buscar Orientação Médica
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Consulte um médico ou nutricionista em situações específicas:
          </Typography>

          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li>Histórico de problemas renais, cardíacos ou hepáticos</li>
            <li>Uso de medicamentos diuréticos ou que alteram o balanço hídrico</li>
            <li>Sintomas persistentes de desidratação mesmo com ingestão adequada</li>
            <li>Condições que alteram as perdas hídricas (diabetes, hipertireoidismo)</li>
            <li>Planejamento de hidratação para atletas de endurance</li>
            <li>Gestação ou amamentação com dúvidas sobre necessidades hídricas</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora fornece estimativas baseadas em diretrizes científicas internacionais. Para condições específicas ou dúvidas médicas, sempre consulte um profissional de saúde qualificado.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre qualidade da água e saúde, consulte a{" "}
            <Link
              href="https://www.who.int/water_sanitation_health/dwq/en/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Organização Mundial da Saúde (OMS)
            </Link>{" "}
            ou o{" "}
            <Link
              href="https://www.gov.br/saude/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Ministério da Saúde
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas Práticas para Manter-se Hidratado
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Estratégias simples para incorporar a hidratação adequada no seu dia a dia:
            </Typography>
            <Typography
              variant="body2"
              component="ul"
              sx={{
                listStyleType: "disc",
                pl: 2,
                lineHeight: 1.6,
                marginBottom: 2,
                ...mobileTextStyle,
              }}
            >
              <li>
                <strong>Comece o dia hidratado:</strong> Beba 1-2 copos de água ao acordar para repor perdas noturnas.
              </li>
              <li>
                <strong>Tenha água sempre à mão:</strong> Mantenha uma garrafa de água no trabalho, carro e casa.
              </li>
              <li>
                <strong>Use lembretes:</strong> Configure alarmes no celular ou use aplicativos de hidratação.
              </li>
              <li>
                <strong>Sabores naturais:</strong> Adicione limão, pepino ou hortelã para variar o sabor.
              </li>
              <li>
                <strong>Monitore a cor da urina:</strong> Use como indicador simples do seu estado de hidratação.
              </li>
              <li>
                <strong>Distribua ao longo do dia:</strong> Pequenas quantidades frequentes são mais eficazes que grandes volumes esporádicos.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Lembre-se: a hidratação é um hábito que se constrói gradualmente. Comece com pequenas mudanças e aumente progressivamente até atingir suas necessidades individuais. Sua saúde e bem-estar agradecem!
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;