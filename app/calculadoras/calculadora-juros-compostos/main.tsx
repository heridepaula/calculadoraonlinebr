"use client";

import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import Calculator from "./calculator";
import Reinvested from "./income-evolution";
import MonthlyResult from "@/models/interfaces/MonthlyResult";
import OutcomeEvolution from "./outcome-evolution";

const Main = () => {
  const [monthlyResults, setMonthlyResults] = useState<MonthlyResult[]>([]);

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Calculator setMonthlyResults={setMonthlyResults} />
        </Paper>
      </Container>
      {monthlyResults?.length > 0 && (
        <>
          <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
            <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
              <Reinvested monthlyResults={monthlyResults} />
            </Paper>
          </Container>
          <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
            <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
              <OutcomeEvolution monthlyResults={monthlyResults} />
            </Paper>
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
