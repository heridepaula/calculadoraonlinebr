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

  const getRiskColor = (imcRange: string) => {
    switch (imcRange) {
      case "Magreza Severa":
      case "Magreza Moderada":
      case "Magreza Leve":
        return theme.palette.warning.dark; // Laranja escuro - Atenção
      case "Peso Saudável":
        return theme.palette.success.dark; // Verde escuro - Saudável
      case "Sobrepeso":
      case "Obesidade Grau I":
        return theme.palette.warning.main; // Laranja médio - Risco Moderado
      case "Obesidade Grau II":
      case "Obesidade Grau III ou Obesidade Mórbida":
        return theme.palette.error.dark; // Vermelho escuro - Alto Risco
      default:
        return theme.palette.text.secondary;
    }
  };

  const getRiskLabel = (imcRange: string) => {
    switch (imcRange) {
      case "Magreza Severa":
      case "Magreza Moderada":
      case "Magreza Leve":
        return "Atenção";
      case "Peso Saudável":
        return "Saudável";
      case "Sobrepeso":
      case "Obesidade Grau I":
        return "Risco Moderado";
      case "Obesidade Grau II":
      case "Obesidade Grau III ou Obesidade Mórbida":
        return "Alto Risco";
      default:
        return "";
    }
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Entenda Tudo Sobre o Índice de Massa Corporal (IMC)
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>Índice de Massa Corporal (IMC)</strong> é uma medida
            simples que relaciona peso e altura, sendo amplamente utilizada para
            classificar se um adulto está dentro de uma faixa de peso saudável.
            Criado no século XIX pelo matemático e estatístico belga Adolphe
            Quetelet, o IMC é uma ferramenta valiosa para avaliar o risco de
            desenvolver certas doenças associadas ao peso.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Como o IMC é calculado?</strong> O cálculo do IMC é feito
            dividindo o peso de uma pessoa em quilogramas (kg) pelo quadrado de
            sua altura em metros (m²):
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            textAlign="center"
            fontFamily="monospace"
            fontSize="1rem"
          >
            IMC = Peso (kg) / Altura (m)²
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Importância do IMC:</strong> Embora seja uma ferramenta
            simples e não leve em consideração fatores como massa muscular,
            densidade óssea e composição corporal, o IMC é um indicador útil em
            estudos populacionais e para identificar potenciais problemas de
            peso em indivíduos. Ele serve como um ponto de partida para
            discussões sobre saúde com profissionais da área.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Classificação do IMC e seus Significados
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
              <strong style={{ color: getRiskColor("Magreza Severa") }}>
                Magreza Severa (IMC &lt; 16):
              </strong>{" "}
              Indica um peso muito abaixo do ideal, podendo estar associado a
              deficiências nutricionais e outros problemas de saúde sérios.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Magreza Severa")}
              >
                ({getRiskLabel("Magreza Severa")})
              </Typography>
            </li>
            <li>
              <strong style={{ color: getRiskColor("Magreza Moderada") }}>
                Magreza Moderada (IMC 16 a 16,9):
              </strong>{" "}
              Também indica peso abaixo do saudável, com riscos à saúde.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Magreza Moderada")}
              >
                ({getRiskLabel("Magreza Moderada")})
              </Typography>
            </li>
            <li>
              <strong style={{ color: getRiskColor("Magreza Leve") }}>
                Magreza Leve (IMC 17 a 18,4):
              </strong>{" "}
              Sinaliza um peso inferior ao considerado saudável e pode aumentar
              o risco de alguns problemas de saúde.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Magreza Leve")}
              >
                ({getRiskLabel("Magreza Leve")})
              </Typography>
            </li>
            <li>
              <strong style={{ color: getRiskColor("Peso Saudável") }}>
                Peso Saudável (IMC 18,5 a 24,9):
              </strong>{" "}
              Faixa de peso considerada ideal para a maioria dos adultos,
              associada a um menor risco de doenças relacionadas ao peso.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Peso Saudável")}
              >
                ({getRiskLabel("Peso Saudável")})
              </Typography>
            </li>
            <li>
              <strong style={{ color: getRiskColor("Sobrepeso") }}>
                Sobrepeso (IMC 25 a 29,9):
              </strong>{" "}
              Indica um peso acima do considerado saudável e aumenta o risco de
              diversas condições, como diabetes tipo 2, hipertensão e doenças
              cardiovasculares.{" "}
              <Typography variant="caption" color={getRiskColor("Sobrepeso")}>
                ({getRiskLabel("Sobrepeso")})
              </Typography>
            </li>
            <li>
              <strong style={{ color: getRiskColor("Obesidade Grau I") }}>
                Obesidade Grau I (IMC 30 a 34,9):
              </strong>{" "}
              Obesidade com risco moderado à saúde.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Obesidade Grau I")}
              >
                ({getRiskLabel("Obesidade Grau I")})
              </Typography>
            </li>
            <li>
              <strong style={{ color: getRiskColor("Obesidade Grau II") }}>
                Obesidade Grau II (IMC 35 a 39,9):
              </strong>{" "}
              Obesidade com risco significativo à saúde.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Obesidade Grau II")}
              >
                ({getRiskLabel("Obesidade Grau II")})
              </Typography>
            </li>
            <li>
              <strong
                style={{
                  color: getRiskColor(
                    "Obesidade Grau III ou Obesidade Mórbida"
                  ),
                }}
              >
                Obesidade Grau III ou Obesidade Mórbida (IMC ≥ 40):
              </strong>{" "}
              Nível mais grave de obesidade, com risco muito elevado de
              complicações de saúde e redução da qualidade de vida.{" "}
              <Typography
                variant="caption"
                color={getRiskColor("Obesidade Grau III ou Obesidade Mórbida")}
              >
                ({getRiskLabel("Obesidade Grau III ou Obesidade Mórbida")})
              </Typography>
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Perigos Associados ao IMC Fora da Faixa Saudável
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Estar fora da faixa de peso saudável, tanto abaixo quanto acima,
            pode trazer diversos perigos para a saúde. A{" "}
            <strong>magreza excessiva</strong>
            pode levar a problemas como deficiências nutricionais,
            enfraquecimento do sistema imunológico, osteoporose e
            irregularidades menstruais em mulheres. Já o{" "}
            <strong>sobrepeso e a obesidade</strong> aumentam significativamente
            o risco de desenvolver:
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
            <li>Doenças cardiovasculares (infarto, AVC)</li>
            <li>Diabetes tipo 2</li>
            <li>Hipertensão arterial</li>
            <li>Dislipidemia (alterações no colesterol e triglicerídeos)</li>
            <li>Apneia do sono</li>
            <li>Alguns tipos de câncer</li>
            <li>Problemas articulares</li>
            <li>Problemas de fertilidade</li>
            <li>Redução da qualidade de vida</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Quando Procurar um Médico em Relação ao IMC
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            É importante procurar um médico ou nutricionista nas seguintes
            situações relacionadas ao seu IMC:
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
              Se o seu IMC estiver nas faixas de{" "}
              <strong>magreza (qualquer grau)</strong>, para investigar
              possíveis causas e receber orientação sobre como ganhar peso de
              forma saudável.
            </li>
            <li>
              Se o seu IMC estiver na faixa de{" "}
              <strong>sobrepeso ou obesidade</strong>, para avaliar os riscos à
              saúde, receber orientações sobre perda de peso segura e eficaz, e
              discutir possíveis tratamentos.
            </li>
            <li>
              Mesmo que seu IMC esteja na faixa saudável, se você tiver outras
              preocupações com seu peso ou saúde, ou se houver histórico
              familiar de doenças relacionadas ao peso.
            </li>
            <li>
              Se você notar mudanças significativas no seu peso sem uma causa
              aparente.
            </li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Lembre-se que o IMC é apenas um indicador e deve ser interpretado no
            contexto da saúde individual de cada pessoa. Um profissional de
            saúde poderá realizar uma avaliação mais completa, considerando
            outros fatores como histórico médico, composição corporal e estilo
            de vida.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para mais informações detalhadas sobre o IMC, você pode consultar a
            página oficial da{" "}
            <Link
              href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Organização Mundial da Saúde (OMS)
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Limitações do IMC
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              É crucial entender que o IMC possui algumas limitações
              importantes:
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
                <strong>Não diferencia massa muscular de gordura:</strong>{" "}
                Atletas com alta massa muscular podem ter um IMC elevado e serem
                saudáveis.
              </li>
              <li>
                <strong>
                  Não considera a distribuição de gordura corporal:
                </strong>
                A gordura abdominal é mais prejudicial à saúde do que a gordura
                em outras áreas do corpo, mas o IMC não faz essa distinção.
              </li>
              <li>
                <strong>Variações por idade e etnia:</strong> A composição
                corporal pode variar entre diferentes faixas etárias e grupos
                étnicos, o que pode influenciar a interpretação do IMC.
              </li>
              <li>
                <strong>Não se aplica a todos:</strong> O IMC pode não ser um
                indicador preciso para crianças, adolescentes, idosos e
                gestantes.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Devido a essas limitações, o IMC deve ser usado como uma
              ferramenta de triagem inicial e complementado por outras
              avaliações de saúde, como a medição da circunferência da cintura,
              a análise da composição corporal e a avaliação clínica por um
              profissional de saúde.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;
