"use client";

import { Container, Box } from "@mui/material";
import MMCMDCCalculator from "./calculator";

const Main = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <MMCMDCCalculator />
      </Box>
    </Container>
  );
};

export default Main;