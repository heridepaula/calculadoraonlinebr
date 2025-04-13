import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { CheckCircleOutline, Lightbulb, AccessibilityNew, Code } from "@mui/icons-material";
import Head from "next/head";
import Image from "next/image";

import profileImage from '../../public/images/profile.jpg'; // Certifique-se do caminho correto

function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre Nós - Calculadora Online BR</title>
        <meta
          name="description"
          content="Saiba mais sobre a Calculadora Online BR, um projeto pessoal de um entusiasta de matemática e programação dedicado a fornecer ferramentas de cálculo online fáceis de usar e eficientes."
        />
      </Head>
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}> {/* Maior margem para respiro */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center"> {/* Centralizando o título */}
            Sobre a Calculadora Online BR
          </Typography>
          <Divider sx={{ mb: 3 }} /> {/* Separador visual */}

          <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}> {/* Margem abaixo da seção */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Image
                src={profileImage}
                alt="Entusiasta de Matemática e Programação"
                width={120}
                height={120}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                priority // Se a imagem for importante para o carregamento inicial
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="body1" paragraph>
                Olá! Por trás da Calculadora Online BR está uma pessoa com uma profunda paixão por duas áreas fascinantes: a **matemática** e a **programação**. Este projeto nasceu da vontade de unir esses dois mundos, criando ferramentas de cálculo online que sejam não apenas eficientes e fáceis de usar, mas também uma demonstração do poder da lógica matemática traduzida em código.
              </Typography>
              <Typography variant="body1" paragraph>
                Acredito que a beleza da matemática pode ser ainda mais acessível através da programação. Cada calculadora aqui é um resultado dessa paixão, um esforço para transformar conceitos matemáticos em ferramentas práticas que possam simplificar o dia a dia de outras pessoas. Este é um projeto pessoal, feito com dedicação e um genuíno interesse em compartilhar a utilidade e a elegância dos cálculos online.
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 3 }} /> {/* Separador visual */}

          <Box sx={{ mb: 4 }}> {/* Margem abaixo da seção */}
            <Typography variant="h6" gutterBottom align="center"> {/* Centralizando o subtítulo */}
              Minha Missão
            </Typography>
            <Typography variant="body1" paragraph align="center"> {/* Centralizando o parágrafo */}
              Minha missão é clara: **tornar os cálculos mais acessíveis e compreensíveis através de interfaces intuitivas e código bem estruturado.** Quero oferecer ferramentas que ajudem as pessoas a resolverem seus problemas de forma rápida e eficiente, ao mesmo tempo em que demonstro a sinergia entre a matemática e a programação.
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} /> {/* Separador visual */}

          <Box sx={{ mb: 4 }}> {/* Margem abaixo da seção */}
            <Typography variant="h6" gutterBottom align="center"> {/* Centralizando o subtítulo */}
              O Que Me Guia
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText primary="Resultados confiáveis em cada cálculo, construídos com lógica matemática sólida." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Lightbulb color="primary" />
                </ListItemIcon>
                <ListItemText primary="Interfaces intuitivas e fáceis de usar, pensadas para uma experiência agradável." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessibilityNew color="primary" />
                </ListItemIcon>
                <ListItemText primary="Ferramentas disponíveis para todos, independentemente do seu nível de conhecimento matemático." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Code color="primary" />
                </ListItemIcon>
                <ListItemText primary="A busca constante por código limpo, eficiente e que traduza a matemática de forma elegante." />
              </ListItem>
            </List>
          </Box>
          <Divider sx={{ mb: 3 }} /> {/* Separador visual */}

          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 3 }}> {/* Centralizando o texto final */}
            Agradeço por explorar a Calculadora Online BR. Sinta-se à vontade para entrar em contato com sugestões, feedback ou qualquer dúvida. Como um projeto pessoal, cada interação é muito valiosa!
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Sobre;