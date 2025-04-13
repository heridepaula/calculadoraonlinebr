import React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";

import Headers from "./headers";
import Content from "./content";

const CalculadoraJurosCompostos = () => {
  return (
    <>
      <Headers />
      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Calculadora de Juros Compostos
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 3 }}>
            Insira os valores abaixo para calcular o montante final.
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Capital Inicial (R$)"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Taxa de Juros (% ao mês)"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Período (meses)" variant="standard" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Aporte Mensal (R$)"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
              <Box
                sx={{
                  padding: 2,
                  textAlign: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="primary">
                  Montante Final: R$ 0,00
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ paddingY: 1.5, fontSize: "1rem" }}
                fullWidth
              >
                Calcular
              </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                variant="outlined"
                color="error"
                sx={{ paddingY: 1.5, fontSize: "1rem" }}
                fullWidth
              >
                Limpar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Container maxWidth="md" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Content />
        </Paper>
      </Container>
    </>
  );
};

export default CalculadoraJurosCompostos;
