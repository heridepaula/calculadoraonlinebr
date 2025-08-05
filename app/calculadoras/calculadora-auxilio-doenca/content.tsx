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

  const getBenefitColor = (type: string) => {
    switch (type) {
      case "auxilio_doenca":
        return theme.palette.success.dark;
      case "auxilio_acidente":
        return theme.palette.warning.main;
      case "pensao_morte":
        return theme.palette.info.dark;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Guia Completo: Auxílio-Doença e Benefícios INSS 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>auxílio-doença</strong> e demais benefícios por incapacidade do INSS são direitos fundamentais dos trabalhadores brasileiros que se encontram temporária ou permanentemente incapacitados para o trabalho. Em 2025, os valores foram reajustados para R$ 1.518,00 como piso e R$ 8.157,41 como teto, garantindo proteção social adequada.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que são os benefícios por incapacidade?</strong> São prestações pecuniárias pagas pelo INSS aos segurados que, por motivo de doença ou acidente, ficam impossibilitados de exercer suas atividades laborais habituais, seja temporária ou permanentemente.
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
            <strong>Valores dos Benefícios em 2025:</strong><br />
            • Valor mínimo: R$ 1.518,00 (salário mínimo)<br />
            • Valor máximo: R$ 8.157,41 (teto do INSS)<br />
            • Reajuste: 4,77% em relação a 2024
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Principais Benefícios por Incapacidade
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
              <strong style={{ color: getBenefitColor("auxilio_doenca") }}>
                Auxílio-Doença (Auxílio por Incapacidade Temporária):
              </strong>{" "}
              Benefício temporário para segurados incapacitados para o trabalho por mais de 15 dias consecutivos. Corresponde a <strong>91% do salário-de-benefício</strong> e exige carência de 12 contribuições (dispensada em casos de doenças graves).
            </li>
            <li>
              <strong style={{ color: getBenefitColor("auxilio_acidente") }}>
                Auxílio-Acidente:
              </strong>{" "}
              Benefício complementar e permanente para segurados que sofrem acidentes de trabalho ou doenças ocupacionais com sequelas definitivas. Corresponde a <strong>50% do salário-de-benefício</strong> e pode ser acumulado com salário ou aposentadoria.
            </li>
            <li>
              <strong style={{ color: getBenefitColor("pensao_morte") }}>
                Pensão por Morte:
              </strong>{" "}
              Benefício pago aos dependentes do segurado falecido. O valor é composto por <strong>50% da aposentadoria mais 10% por dependente</strong>, limitado a 100%. Não exige carência do falecido.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como é Calculado o Salário-de-Benefício
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>salário-de-benefício</strong> é a base de cálculo para todos os benefícios previdenciários e considera:
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
            <strong>Cálculo do Salário-de-Benefício:</strong><br /><br />
            • <strong>Período Básico de Cálculo:</strong> Todos os salários desde julho/1994<br />
            • <strong>Média Aritmética:</strong> 100% das contribuições atualizadas<br />
            • <strong>Valor Mínimo:</strong> 1 salário mínimo (R$ 1.518,00)<br />
            • <strong>Valor Máximo:</strong> Teto do INSS (R$ 8.157,41)<br /><br />
            <strong>Fórmulas dos Benefícios:</strong><br />
            • <strong>Auxílio-Doença:</strong> 91% do salário-de-benefício<br />
            • <strong>Auxílio-Acidente:</strong> 50% do salário-de-benefício<br />
            • <strong>Pensão por Morte:</strong> 50% + (10% × nº dependentes)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Requisitos de Carência por Benefício
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>carência</strong> é o número mínimo de contribuições mensais exigidas para ter direito ao benefício:
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
            <li><strong>Auxílio-Doença:</strong> 12 contribuições mensais</li>
            <li><strong>Auxílio-Acidente:</strong> Sem carência (acidente de trabalho)</li>
            <li><strong>Pensão por Morte:</strong> Sem carência para o segurado falecido</li>
            <li><strong>Isenção de Carência:</strong> Doenças graves, acidentes e doenças ocupacionais</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Doenças que Dispensam Carência
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As seguintes doenças dispensam o período de carência de 12 meses para auxílio-doença:
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
            <li>Tuberculose ativa</li>
            <li>Hanseníase</li>
            <li>Alienação mental</li>
            <li>Esclerose múltipla</li>
            <li>Hepatopatia grave</li>
            <li>Neoplasia maligna (câncer)</li>
            <li>Cegueira</li>
            <li>Paralisia irreversível e incapacitante</li>
            <li>Cardiopatia grave</li>
            <li>Doença de Parkinson</li>
            <li>Espondiloartrose anquilosante</li>
            <li>Nefropatia grave</li>
            <li>Estado avançado da doença de Paget (osteíte deformante)</li>
            <li>Síndrome da deficiência imunológica adquirida (AIDS)</li>
            <li>Contaminação por radiação (comprovada)</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Processo de Solicitação dos Benefícios
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para solicitar os benefícios por incapacidade do INSS, siga os seguintes passos:
          </Typography>

          <Typography
            variant="body2"
            component="ol"
            sx={{
              listStyleType: "decimal",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Acesse o Meu INSS:</strong> Site (meu.inss.gov.br) ou aplicativo móvel</li>
            <li><strong>Faça login:</strong> Com CPF e senha cadastrada</li>
            <li><strong>Selecione o benefício:</strong> Auxílio-doença, auxílio-acidente ou pensão por morte</li>
            <li><strong>Preencha os dados:</strong> Informações pessoais e médicas completas</li>
            <li><strong>Anexe documentos:</strong> Atestados médicos, exames e laudos</li>
            <li><strong>Agende perícia:</strong> Quando exigida pelo sistema</li>
            <li><strong>Acompanhe o processo:</strong> Pelo aplicativo ou site</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Documentos Necessários
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Documentação obrigatória para solicitação dos benefícios:
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
            <li>RG e CPF do requerente</li>
            <li>Carteira de Trabalho ou comprovantes de contribuição</li>
            <li>Atestados médicos detalhados (CID-10)</li>
            <li>Exames complementares (laboratoriais, imagem)</li>
            <li>Relatório médico completo com histórico da doença</li>
            <li>Comprovante de residência atualizado</li>
            <li>Para pensão: certidão de óbito e documentos do falecido</li>
            <li>Para dependentes: documentos que comprovem a dependência</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Perícia Médica do INSS
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>perícia médica</strong> é obrigatória para concessão dos benefícios por incapacidade:
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
            <li><strong>Agendamento:</strong> Automático pelo sistema ou em agência</li>
            <li><strong>Documentação:</strong> Leve todos os exames e laudos médicos</li>
            <li><strong>Avaliação:</strong> Médico perito avalia a incapacidade laboral</li>
            <li><strong>Resultado:</strong> Deferimento, indeferimento ou nova perícia</li>
            <li><strong>Recursos:</strong> Possível em caso de indeferimento</li>
            <li><strong>Reavaliação:</strong> Periódica para auxílio-doença</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Duração e Cessação dos Benefícios
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
              <strong>Auxílio-Doença:</strong> Temporário, cessando com a recuperação da capacidade laboral ou conversão em aposentadoria por invalidez
            </li>
            <li>
              <strong>Auxílio-Acidente:</strong> Permanente enquanto persistirem as sequelas
            </li>
            <li>
              <strong>Pensão por Morte:</strong> Vitalícia ou temporária, conforme idade e tipo de dependente
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Reabilitação Profissional
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O INSS oferece <strong>reabilitação profissional</strong> para segurados em benefício por incapacidade:
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
            <li>Fornecimento de órteses e próteses</li>
            <li>Cursos de capacitação profissional</li>
            <li>Orientação para reinserção no mercado de trabalho</li>
            <li>Acompanhamento multidisciplinar</li>
            <li>Auxílio-reabilitação durante o processo</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece estimativas baseadas nas regras atuais de 2025. Para informações oficiais e solicitação dos benefícios, acesse sempre os canais oficiais do INSS.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre benefícios do INSS, acesse o{" "}
            <Link
              href="https://www.gov.br/inss/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Portal Oficial do INSS
            </Link>{" "}
            ou ligue para{" "}
            <Link
              href="tel:135"
              color="#0fa4d5"
            >
              135
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Direitos dos Segurados em Benefício por Incapacidade
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              É fundamental conhecer seus direitos quando em benefício por incapacidade:
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
                <strong>Estabilidade no emprego:</strong> Garantia de emprego por 12 meses após o retorno ao trabalho (acidente de trabalho).
              </li>
              <li>
                <strong>Conversão em aposentadoria:</strong> Possibilidade de conversão do auxílio-doença em aposentadoria por invalidez quando a incapacidade for permanente.
              </li>
              <li>
                <strong>Recurso administrativo:</strong> Direito de recorrer em caso de indeferimento do benefício.
              </li>
              <li>
                <strong>Ação judicial:</strong> Possibilidade de ingressar na Justiça Federal em caso de negativa definitiva.
              </li>
              <li>
                <strong>Acompanhamento médico:</strong> Direito a tratamento médico adequado durante o período de benefício.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Sempre mantenha seus documentos organizados e busque orientação especializada quando necessário. Seus direitos previdenciários são garantidos por lei e devem ser respeitados integralmente.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;