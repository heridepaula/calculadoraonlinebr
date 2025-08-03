"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  Link,
  Grid,
} from "@mui/material";
import Image from "next/image";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Content = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileTextStyle = {
    textAlign: isMobile ? "justify" : "left",
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ideal":
        return theme.palette.success.dark;
      case "baixo":
        return theme.palette.error.dark;
      case "alto":
        return theme.palette.warning.main;
      case "obesidade":
        return theme.palette.error.main;
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
              Entenda Tudo Sobre Percentual de Gordura Corporal
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>percentual de gordura corporal</strong> é um indicador mais preciso da composição corporal do que o IMC tradicional, pois diferencia entre massa muscular e gordura. Nossa calculadora utiliza o método da Marinha Americana (US Navy), reconhecido por sua precisão e facilidade de aplicação, considerando medidas corporais específicas para homens e mulheres.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é percentual de gordura corporal?</strong> É a proporção de gordura em relação ao peso total do corpo, expressa em percentual. Este método é superior ao IMC pois atletas com alta massa muscular podem ter IMC elevado, mas percentual de gordura baixo, sendo mais saudáveis.
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
            <strong>Método US Navy:</strong><br />
            Precisão de 95% comparado a métodos laboratoriais
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Faixas de Percentual de Gordura Corporal
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Para Homens:</strong>
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
              <strong style={{ color: getCategoryColor("baixo") }}>
                2-5% - Gordura Essencial:
              </strong>{" "}
              Mínimo necessário para funções vitais. Abaixo disso pode ser prejudicial à saúde.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("ideal") }}>
                6-13% - Atlético:
              </strong>{" "}
              Típico de atletas profissionais. Excelente definição muscular e saúde ótima.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("ideal") }}>
                14-17% - Fitness:
              </strong>{" "}
              Boa forma física, músculos definidos, faixa ideal para a maioria dos homens ativos.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("alto") }}>
                18-24% - Aceitável:
              </strong>{" "}
              Faixa saudável para homens sedentários, sem riscos significativos à saúde.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("obesidade") }}>
                25%+ - Obesidade:
              </strong>{" "}
              Acima do recomendado. Aumenta riscos de doenças cardiovasculares e diabetes.
            </li>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Para Mulheres:</strong>
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
              <strong style={{ color: getCategoryColor("baixo") }}>
                10-13% - Gordura Essencial:
              </strong>{" "}
              Mínimo necessário para funções hormonais. Percentuais muito baixos podem afetar a menstruação.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("ideal") }}>
                14-20% - Atlético:
              </strong>{" "}
              Típico de atletas femininas profissionais. Excelente condição física e saúde.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("ideal") }}>
                21-24% - Fitness:
              </strong>{" "}
              Boa forma física, faixa ideal para mulheres ativas e saudáveis.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("alto") }}>
                25-31% - Aceitável:
              </strong>{" "}
              Faixa saudável para a maioria das mulheres, sem riscos significativos.
            </li>
            <li>
              <strong style={{ color: getCategoryColor("obesidade") }}>
                32%+ - Obesidade:
              </strong>{" "}
              Acima do recomendado. Requer atenção médica e mudanças no estilo de vida.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Medir Corretamente
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 3, ...mobileTextStyle }}
          >
            Para obter resultados precisos, siga estas instruções de medição:
          </Typography>

          {/* Grid com instruções e imagens */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Medição da Cintura */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef"
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  📏 Circunferência da Cintura
                </Typography>
                
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Image
                    src="/images/cards/cintura.webp"
                    alt="Como medir a circunferência da cintura"
                    width={200}
                    height={150}
                    style={{
                      borderRadius: '8px',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.6, ...mobileTextStyle }}
                >
                  <strong>Local:</strong> Na altura do umbigo, mantendo a fita horizontal.<br />
                  <strong>Posição:</strong> Respire normalmente, não comprima a pele.<br />
                  <strong>Fita:</strong> Firme mas sem apertar.
                </Typography>
              </Box>
            </Grid>

            {/* Medição do Pescoço */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef"
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  📏 Circunferência do Pescoço
                </Typography>
                
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Image
                    src="/images/cards/pescoco.webp"
                    alt="Como medir a circunferência do pescoço"
                    width={200}
                    height={150}
                    style={{
                      borderRadius: '8px',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.6, ...mobileTextStyle }}
                >
                  <strong>Homens:</strong> Logo abaixo do pomo de Adão.<br />
                  <strong>Mulheres:</strong> Na base do pescoço, ponto mais estreito.<br />
                  <strong>Postura:</strong> Cabeça ereta, olhando para frente.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Instruções adicionais */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#e3f2fd",
              borderRadius: 2,
              border: "1px solid #bbdefb",
              mb: 2
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}>
              💡 Dicas Importantes para Medição Precisa:
            </Typography>
            <Typography
              variant="body2"
              component="ul"
              sx={{
                listStyleType: "disc",
                pl: 2,
                lineHeight: 1.6,
                margin: 0,
                ...mobileTextStyle,
              }}
            >
              <li>Use uma fita métrica flexível (não elástica)</li>
              <li>Meça sempre no mesmo horário do dia</li>
              <li>Mantenha postura ereta e relaxada</li>
              <li>Não prenda a respiração durante a medição</li>
              <li>Para mulheres: o quadril deve ser medido na parte mais larga</li>
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Vantagens do Método US Navy
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
              <strong>Precisão:</strong> Aproximadamente 95% de precisão quando comparado a métodos laboratoriais como hidrostática.
            </li>
            <li>
              <strong>Praticidade:</strong> Não requer equipamentos caros, apenas uma fita métrica comum.
            </li>
            <li>
              <strong>Diferenciação por sexo:</strong> Fórmulas específicas para homens e mulheres, considerando diferenças anatômicas.
            </li>
            <li>
              <strong>Validação científica:</strong> Método desenvolvido e testado pela Marinha Americana em milhares de pessoas.
            </li>
            <li>
              <strong>Acessibilidade:</strong> Pode ser realizado em casa sem necessidade de profissionais especializados.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Quando Buscar Orientação Profissional
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Embora nossa calculadora seja precisa, recomendamos buscar orientação profissional em casos como:
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
            <li>Percentual muito baixo (abaixo da gordura essencial)</li>
            <li>Percentual na faixa de obesidade</li>
            <li>Dúvidas sobre interpretação dos resultados</li>
            <li>Planejamento de dieta e exercícios específicos</li>
            <li>Condições médicas que possam influenciar os resultados</li>
          </Typography>

          <Box
            p={2}
            bgcolor="#e3f2fd"
            borderRadius={2}
            boxShadow={1}
            mt={2}
            fontSize="0.85rem"
          >
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              ⚠️ Importante:
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              Esta calculadora fornece estimativas baseadas no método US Navy. Para avaliações mais precisas, considere métodos complementares como bioimpedância, DEXA ou consulte um profissional de saúde.
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Content;