"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ShowChart,
  Calculate,
  TrendingUp,
  MonetizationOn,
  Info,
  ExpandMore,
} from "@mui/icons-material";

const Content: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileTextStyle = {
    textAlign: isMobile ? "justify" as const : "left" as const,
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        {/* Introdução */}
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <ShowChart color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              O que é Preço Médio?
            </Typography>
          </Box>
          
          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>preço médio de ações</strong> é uma métrica fundamental para investidores que fazem compras 
            recorrentes de uma mesma ação. Também conhecido como <em>custo médio ponderado</em>, 
            ele representa o valor médio pago por ação considerando todas as compras realizadas ao longo do tempo.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Esta estratégia de investimento é conhecida como <strong>Dollar Cost Averaging (DCA)</strong> 
            ou <strong>Aporte Regular</strong>, e é amplamente utilizada por investidores de longo prazo 
            para reduzir o impacto da volatilidade do mercado.
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
            <strong>Exemplo Prático:</strong><br />
            100 ações × R$ 20,00 + 50 ações × R$ 30,00 = Preço médio de R$ 23,33 por ação
          </Box>
        </Paper>

        {/* Como Calcular */}
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Calculate color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Como Calcular o Preço Médio
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O cálculo do preço médio é uma <strong>média ponderada</strong> que considera tanto a quantidade 
            quanto o preço de cada compra. A fórmula é:
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
            <strong>Fórmula:</strong><br />
            Preço Médio = Valor Total Investido ÷ Quantidade Total de Ações
          </Box>
        </Paper>

        {/* Vantagens da Estratégia */}
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <TrendingUp color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Vantagens do Aporte Regular (DCA)
            </Typography>
          </Box>

          <Box component="ul" sx={{ listStyleType: "disc", pl: 2, lineHeight: 1.6, marginBottom: 2 }}>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Redução do Risco:</strong> Diminui o impacto da volatilidade do mercado ao longo do tempo
            </Typography>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Disciplina de Investimento:</strong> Cria um hábito regular de investir
            </Typography>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Aproveitamento de Baixas:</strong> Quando o preço cai, você compra mais ações com o mesmo valor
            </Typography>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Simplicidade:</strong> Estratégia fácil de entender e implementar
            </Typography>
          </Box>
        </Paper>

        {/* Conceitos Importantes */}
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Info color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Conceitos Importantes
            </Typography>
          </Box>

          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body2" fontWeight="bold">Dollar Cost Averaging (DCA)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                Estratégia onde você investe uma quantia fixa regularmente, 
                independentemente do preço da ação. Resulta em comprar mais ações quando 
                o preço está baixo e menos quando está alto.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body2" fontWeight="bold">Média Ponderada vs Média Simples</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                A <strong>média ponderada</strong> considera a quantidade de cada compra, 
                sendo mais precisa. A <strong>média simples</strong> apenas soma os preços 
                e divide pela quantidade de compras.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body2" fontWeight="bold">Impostos e Custos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                Para vendas acima de R$ 20.000,00/mês, há 15% de IR sobre ganho de capital. 
                O preço médio é usado para calcular esse ganho.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Dicas Práticas */}
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <MonetizationOn color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Dicas Práticas
            </Typography>
          </Box>

          <Box component="ul" sx={{ listStyleType: "disc", pl: 2, lineHeight: 1.6, marginBottom: 2 }}>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Defina um valor fixo mensal:</strong> Estabeleça um valor que caiba no seu orçamento
            </Typography>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Mantenha registros:</strong> Use nossa calculadora para acompanhar a evolução
            </Typography>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Pense no longo prazo:</strong> A estratégia funciona melhor em horizontes de 3-5 anos
            </Typography>
            <Typography component="li" variant="body2" sx={mobileTextStyle}>
              <strong>Analise a empresa:</strong> Estude os fundamentos antes de iniciar aportes regulares
            </Typography>
          </Box>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            textAlign="center"
            fontSize="0.9rem"
          >
            <strong>⚠️ Atenção:</strong><br />
            Invista apenas valores que não precisará no curto prazo
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Content;