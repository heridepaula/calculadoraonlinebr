import {
    Box,
    Typography,
    Stack,
    Paper,
    Divider,
  } from "@mui/material";
  import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
  
  const Content = () => {
    return (
      <Box mt={4} mx="auto" maxWidth="md">
        <Stack spacing={4}>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
            <Box display="flex" alignItems="center" mb={1}>
              <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                O Que São Juros Compostos e Por Que Eles Importam
              </Typography>
            </Box>
  
            <Typography variant="body2" gutterBottom>
              Os <strong>juros compostos</strong> são uma forma de crescimento
              exponencial do dinheiro. Diferente dos juros simples — onde o rendimento
              é sempre calculado sobre o valor inicial — os juros compostos fazem o{" "}
              <strong>dinheiro render sobre o próprio rendimento</strong>. Isso
              significa que, a cada período, os lucros anteriores também começam a
              gerar novos lucros.
            </Typography>
  
            <Typography variant="body2" gutterBottom>
              Esse efeito é poderoso e pode ser um grande aliado quando você está
              investindo. Aplicações como{" "}
              <strong>poupança, CDBs, Tesouro Direto, previdência privada</strong> e
              até fundos de investimento utilizam juros compostos para fazer seu
              patrimônio crescer ao longo do tempo.
            </Typography>
  
            <Typography variant="body2" gutterBottom>
              Por outro lado, também é preciso atenção:{" "}
              <strong>
                dívidas no cartão de crédito, empréstimos e financiamentos
              </strong>{" "}
              muitas vezes usam juros compostos contra você. Se você não paga no
              prazo, os valores acumulam de forma acelerada e viram uma bola de neve.
            </Typography>
  
            <Typography variant="body2">
              Entender e aplicar os juros compostos é uma das chaves para alcançar a{" "}
              <strong>liberdade financeira</strong>. Comece cedo, invista com
              regularidade e deixe o tempo trabalhar a seu favor.
            </Typography>
          </Paper>
  
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Como Calcular Juros Compostos
            </Typography>
  
            <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
              <Typography variant="body2" gutterBottom>
                Use esta fórmula para calcular o montante final:
              </Typography>
  
              <Box
                p={2}
                bgcolor="#fff"
                borderRadius={2}
                boxShadow={1}
                mb={2}
                textAlign="center"
                fontFamily="monospace"
                fontSize="1rem"
              >
                M = C × (1 + i)<sup>n</sup>
              </Box>
  
              <Typography variant="caption" color="text.secondary">
                Onde:
                <br />– <strong>M</strong>: montante final
                <br />– <strong>C</strong>: capital inicial
                <br />– <strong>i</strong>: taxa de juros (decimal)
                <br />– <strong>n</strong>: número de períodos
              </Typography>
            </Paper>
  
            <Divider sx={{ my: 2 }} />
  
            <Paper
              elevation={1}
              sx={{
                p: 2,
                backgroundColor: "#e3f2fd",
                borderLeft: "4px solid #1976d2"
              }}
            >
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Exemplo Rápido:
              </Typography>
              <Typography variant="caption" fontFamily="monospace">
                C = R$ 1.000
                <br />
                i = 1% ao mês (0.01)
                <br />
                n = 12 meses
                <br />
                <br />M = 1000 × (1 + 0.01)<sup>12</sup> ≈ R$ 1.126,83
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  };
  
  export default Content;
  