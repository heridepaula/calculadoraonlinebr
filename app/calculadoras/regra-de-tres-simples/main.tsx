import { Container, Paper } from "@mui/material";
import Calculator from "./calculator";

const Main = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Calculator />
        </Paper>
      </Container>
    </>
  );
};

export default Main;
