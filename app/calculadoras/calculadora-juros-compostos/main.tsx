"use client";

import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import Calculator from "./calculator";
import Reinvested from "./graphics/income-evolution";
import MonthlyResult from "@/models/interfaces/MonthlyResult";
import OutcomeEvolution from "./graphics/outcome-evolution";
import { classes } from '@/src/styles/classes';

const Main = () => {
  const [monthlyResults, setMonthlyResults] = useState<MonthlyResult[]>([]);

  return (
    <>
      <Container maxWidth="sm" sx={classes.layout.container}>
        <Paper sx={classes.calculator.paper}>
          <Calculator  monthlyResults={monthlyResults} setMonthlyResults={setMonthlyResults} />
        </Paper>
      </Container>
      {monthlyResults?.length > 0 && (
        <>
          <Container maxWidth="sm" sx={classes.layout.container}>
            <Paper sx={classes.calculator.paper}>
              <Reinvested monthlyResults={monthlyResults} setMonthlyResults={setMonthlyResults} />
            </Paper>
          </Container>
          <Container maxWidth="sm" sx={classes.layout.container}>
            <Paper sx={classes.calculator.paper}>
              <OutcomeEvolution monthlyResults={monthlyResults} setMonthlyResults={setMonthlyResults} />
            </Paper>
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
