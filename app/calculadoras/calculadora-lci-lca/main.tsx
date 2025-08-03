"use client";

import { Container } from "@mui/material";
import LciLcaCalculator from "./calculator";

export default function Main() {
  return (
    <Container maxWidth="sm">
      <LciLcaCalculator />
    </Container>
  );
}