"use client";

import { Container, Paper } from "@mui/material";
import Calculator from "./calculator";

export default function Main() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Calculator />
      </Paper>
    </Container>
  );
}