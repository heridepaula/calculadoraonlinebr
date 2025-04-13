import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao MUI com Next.js 15! (IBM Plex Mono)
      </Typography>
      <Typography variant="body1">
        Este texto também está usando a fonte IBM Plex Mono.
      </Typography>
      <Button variant="contained" color="primary">
        Clique aqui
      </Button>
    </Container>
  );
}