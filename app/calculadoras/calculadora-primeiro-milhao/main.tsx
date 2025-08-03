"use client";

import { Container } from "@mui/material";
import PrimeiroMilhaoCalculator from "./calculator";

export default function Main() {
  return (
    <Container maxWidth="sm">
      <PrimeiroMilhaoCalculator />
    </Container>
  );
}