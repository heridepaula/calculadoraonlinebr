"use client";

import { Container, Box } from "@mui/material";
import AreaPerimeterCalculator from "./calculator";

const Main = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <AreaPerimeterCalculator />
      </Box>
    </Container>
  );
};

export default Main;