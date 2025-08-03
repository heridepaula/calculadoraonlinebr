"use client";

import { Container } from "@mui/material";
import PrecoMedioAcaoCalculator from "./calculator";

export default function Main() {
  return (
    <Container maxWidth="lg">
      <PrecoMedioAcaoCalculator />
    </Container>
  );
}