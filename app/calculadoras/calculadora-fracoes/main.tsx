"use client";

import { Container, Box } from "@mui/material";
import FractionsCalculator from "./calculator";

const Main = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <FractionsCalculator />
      </Box>
    </Container>
  );
};

export default Main;