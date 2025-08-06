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
              Tudo Sobre Fertilidade e Ciclo Menstrual
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>calculadora de fertilidade</strong> é uma ferramenta fundamental para mulheres que desejam <strong>planejar a gravidez</strong> ou entender melhor seu <strong>ciclo menstrual</strong>. Baseada em métodos científicos, ela identifica o <strong>período fértil</strong> e a <strong>data de ovulação</strong> para maximizar as chances de concepção.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é o período fértil?</strong> O período fértil compreende os dias do ciclo menstrual em que há maior probabilidade de gravidez. Geralmente ocorre entre 5 dias antes e 1 dia após a ovulação, totalizando cerca de 6 dias por ciclo.
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
            <strong>Duração do Ciclo Menstrual Normal:</strong><br />
            Entre 21 a 35 dias (média de 28 dias)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Funciona o Ciclo Menstrual
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
                Fase Menstrual (Dias 1-5):
              </strong>{" "}
              Eliminação do endométrio através da menstruação. Baixa fertilidade devido aos níveis hormonais reduzidos.
            </li>
            <li>
              <strong style={{ color: theme.palette.secondary.dark }}>
                Fase Folicular (Dias 6-14):
              </strong>{" "}
              Crescimento dos folículos ovarianos e espessamento do endométrio. Aumento gradual da fertilidade.
            </li>
            <li>
              <strong style={{ color: theme.palette.error.dark }}>
                Ovulação (Dia 14):
              </strong>{" "}
              Liberação do óvulo maduro do ovário. Período de máxima fertilidade, durando aproximadamente 24 horas.
            </li>
            <li>
              <strong style={{ color: theme.palette.warning.dark }}>
                Fase Lútea (Dias 15-28):
              </strong>{" "}
              Após a ovulação, o corpo se prepara para uma possível gravidez. Fertilidade decresce gradualmente.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Sinais de Ovulação e Fertilidade
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O corpo feminino apresenta diversos sinais que indicam o período fértil e a proximidade da ovulação:
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
              <strong>Muco cervical:</strong> Torna-se mais abundante, transparente e elástico, semelhante à clara de ovo.
            </li>
            <li>
              <strong>Temperatura basal:</strong> Ligeiro aumento (0,2-0,5°C) após a ovulação, permanecendo elevada até a menstruação.
            </li>
            <li>
              <strong>Dor pélvica:</strong> Dor leve de um lado do abdômen, conhecida como "dor do meio" ou mittelschmerz.
            </li>
            <li>
              <strong>Mudanças no colo do útero:</strong> Fica mais alto, macio e ligeiramente aberto durante a ovulação.
            </li>
            <li>
              <strong>Aumento da libido:</strong> Elevação natural do desejo sexual próximo ao período ovulatório.
            </li>
            <li>
              <strong>Sensibilidade mamária:</strong> Aumento da sensibilidade ou inchaço das mamas após a ovulação.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Cálculo do Período Fértil
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
            • <strong>Data da Ovulação:</strong> Último dia do ciclo - 14 dias<br />
            • <strong>Início do Período Fértil:</strong> Data da ovulação - 5 dias<br />
            • <strong>Fim do Período Fértil:</strong> Data da ovulação + 1 dia<br />
            • <strong>Próxima Menstruação:</strong> Data da última menstruação + duração do ciclo<br />
            • <strong>Probabilidade de Gravidez:</strong> Varia com idade e dia do ciclo<br />
            <br />
            <strong>Exemplo (Ciclo de 28 dias):</strong><br />
            - Última menstruação: 01/01<br />
            - Ovulação: 15/01 (dia 14)<br />
            - Período fértil: 10/01 a 16/01<br />
            - Próxima menstruação: 29/01
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Fatores que Afetam a Fertilidade
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Diversos fatores podem influenciar a <strong>fertilidade feminina</strong> e a regularidade do ciclo menstrual:
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
            <li><strong>Idade:</strong> A fertilidade diminui gradualmente após os 30 anos, com declínio mais acentuado após os 35</li>
            <li><strong>Peso corporal:</strong> Tanto o sobrepeso quanto o baixo peso podem afetar a ovulação</li>
            <li><strong>Estresse:</strong> Níveis elevados de estresse podem alterar os hormônios reprodutivos</li>
            <li><strong>Exercícios excessivos:</strong> Atividade física muito intensa pode interferir na ovulação</li>
            <li><strong>Tabagismo:</strong> Reduz significativamente a fertilidade e qualidade dos óvulos</li>
            <li><strong>Condições médicas:</strong> SOP, endometriose, problemas de tireoide podem afetar a fertilidade</li>
            <li><strong>Medicamentos:</strong> Alguns medicamentos podem interferir na ovulação</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Dicas para Aumentar as Chances de Gravidez
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
            <li><strong>Relações regulares:</strong> Mantenha relações a cada 2-3 dias durante o período fértil</li>
            <li><strong>Ácido fólico:</strong> Inicie suplementação 3 meses antes de tentar engravidar</li>
            <li><strong>Alimentação saudável:</strong> Dieta rica em folato, ferro, cálcio e proteínas</li>
            <li><strong>Peso ideal:</strong> Mantenha IMC entre 18,5 e 24,9 kg/m²</li>
            <li><strong>Exercícios moderados:</strong> Atividade física regular, mas sem excessos</li>
            <li><strong>Evite substâncias tóxicas:</strong> Álcool, cigarro e drogas reduzem a fertilidade</li>
            <li><strong>Controle o estresse:</strong> Pratique técnicas de relaxamento e mindfulness</li>
            <li><strong>Acompanhamento médico:</strong> Consulte ginecologista para check-up pré-concepcional</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Métodos Contraceptivos Naturais
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para quem busca <strong>prevenção natural da gravidez</strong>, é importante conhecer os métodos baseados no conhecimento do ciclo:
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
            <li><strong>Método do calendário:</strong> Evitar relações no período fértil (eficácia: 76-88%)</li>
            <li><strong>Método da temperatura basal:</strong> Monitoramento diário da temperatura corporal</li>
            <li><strong>Método do muco cervical:</strong> Observação das mudanças no muco vaginal</li>
            <li><strong>Método sintotérmico:</strong> Combinação de temperatura, muco e outros sinais</li>
          </Typography>

          <Box
            p={2}
            bgcolor="#fff3cd"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontSize="0.9rem"
          >
            <strong>⚠️ Importante:</strong> Os métodos contraceptivos naturais têm eficácia limitada e não protegem contra ISTs. Para maior segurança, consulte um ginecologista sobre métodos contraceptivos modernos.
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Quando Buscar Ajuda Médica
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            É recomendável consultar um ginecologista ou especialista em reprodução nas seguintes situações:
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
            <li>Tentativas de engravidar há mais de 12 meses (ou 6 meses se idade > 35 anos)</li>
            <li>Ciclos menstruais irregulares ou ausência de menstruação</li>
            <li>Histórico de abortos recorrentes</li>
            <li>Dor pélvica intensa durante a menstruação</li>
            <li>Sintomas de SOP, endometriose ou outras condições</li>
            <li>Sangramento entre menstruações</li>
            <li>Parceiro com problemas de fertilidade conhecidos</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece uma estimativa baseada em ciclos regulares e fórmulas científicas. Para casos específicos ou irregular, sempre consulte um profissional qualificado para avaliação personalizada.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre saúde reprodutiva, consulte a{" "}
            <Link
              href="https://www.febrasgo.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              FEBRASGO (Federação Brasileira de Ginecologia e Obstetrícia)
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
            Planejamento Familiar e Saúde Reprodutiva
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              O planejamento familiar é um direito fundamental que permite aos casais decidir sobre o número e espaçamento dos filhos:
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
                <strong>Preparação pré-concepcional:</strong> Exames, vacinação e suplementação adequada antes de engravidar.
              </li>
              <li>
                <strong>Espaçamento entre gestações:</strong> Recomenda-se intervalo mínimo de 18 meses entre partos.
              </li>
              <li>
                <strong>Idade materna ideal:</strong> Entre 20-35 anos há menores riscos para mãe e bebê.
              </li>
              <li>
                <strong>Saúde do parceiro:</strong> A fertilidade masculina também deve ser considerada no planejamento.
              </li>
              <li>
                <strong>Suporte emocional:</strong> Acompanhamento psicológico pode ser benéfico durante o processo.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Lembre-se de que cada mulher é única, e o conhecimento do próprio corpo é fundamental para uma vida reprodutiva saudável. Utilize nossa calculadora como ferramenta complementar, mas sempre mantenha acompanhamento médico regular.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;