import {
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Política de Privacidade
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1">
          A sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como coletamos, usamos e protegemos as informações que você
          possa fornecer ao utilizar a Calculadora Online BR.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Coleta de Dados
        </Typography>
        <Typography variant="body1">
          Geralmente, a Calculadora Online BR não coleta informações pessoais
          identificáveis diretamente dos usuários. Podemos coletar dados não
          pessoais, como informações sobre o seu navegador, tipo de dispositivo
          e padrões de uso do site, através de cookies e outras tecnologias de
          rastreamento. Esses dados são utilizados para melhorar a
          funcionalidade e a experiência do usuário no site.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Uso de Dados
        </Typography>
        <Typography variant="body1">
          Os dados não pessoais coletados podem ser usados para:
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="Analisar tendências de uso do site para melhorar sua funcionalidade." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Personalizar a experiência do usuário." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Administrar o site e diagnosticar problemas técnicos." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Compartilhamento de Dados
        </Typography>
        <Typography variant="body1">
          Não compartilhamos informações pessoais identificáveis com terceiros.
          Podemos compartilhar dados não pessoais e agregados com parceiros para
          fins de análise ou melhoria do site.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Cookies
        </Typography>
        <Typography variant="body1">
          Podemos utilizar cookies para melhorar a experiência do usuário.
          Cookies são pequenos arquivos de texto armazenados no seu dispositivo.
          Você pode controlar o uso de cookies nas configurações do seu
          navegador. No entanto, desabilitar cookies pode afetar a
          funcionalidade do site.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Segurança
        </Typography>
        <Typography variant="body1">
          Embora não coletemos informações pessoais sensíveis, implementamos
          medidas de segurança razoáveis para proteger os dados não pessoais
          contra acesso não autorizado, alteração, divulgação ou destruição.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Links para Outros Sites
        </Typography>
        <Typography variant="body1">
          Nosso site pode conter links para outros sites. Não somos responsáveis
          pelas práticas de privacidade desses outros sites. Recomendamos que
          você revise as políticas de privacidade deles antes de fornecer
          qualquer informação pessoal.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Alterações nesta Política de Privacidade
        </Typography>
        <Typography variant="body1">
          Podemos atualizar esta Política de Privacidade periodicamente.
          Quaisquer alterações serão publicadas nesta página. Recomendamos que
          você revise esta política regularmente para estar ciente de quaisquer
          atualizações.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Contato
        </Typography>
        <Typography variant="body1">
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre
          em contato conosco através da página de contato.
        </Typography>
      </Paper>
    </Container>
  );
}

export default PrivacyPolicy;
