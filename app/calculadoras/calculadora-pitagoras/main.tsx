import React from "react";
import { Container, Paper } from "@mui/material";
import Calculator from "./calculator";
import { classes } from '@/src/styles/classes';

const Main = () => {
  return (
    <>
      <Container maxWidth="md" sx={classes.layout.container}>
        <Paper sx={classes.calculator.paper}>
          <Calculator />
        </Paper>
      </Container>
    </>
  );
};

export default Main;