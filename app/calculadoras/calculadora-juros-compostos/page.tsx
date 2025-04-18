import React from "react";
import {
  Container,
  Paper,
} from "@mui/material";

import Content from "./content";
import Calculator from "./calculator";

const CalculadoraJurosCompostos = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Calculator />
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
