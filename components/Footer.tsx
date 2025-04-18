'use client';

import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    Tooltip,
    useTheme,
  } from "@mui/material";
  import { Email } from "@mui/icons-material";
  
  interface FooterLink {
    label: string;
    href: string;
  }
  
  interface FooterProps {
    reduced?: boolean; // Optional prop to indicate reduced size
  }
  
  const footerLinks: FooterLink[] = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Política de Privacidade", href: "/privacidade" },
  ];
  
  const emailLink = {
    icon: <Email />,
    href: "mailto:heridepaula@gmail.com",
    alt: "Email",
  };
  
  function Footer({ reduced }: FooterProps) {
    const theme = useTheme();
  
    return (
      <Box
        component="footer"
        sx={{
          py: reduced ? 2 : 3, // Reduced vertical padding on mobile
          bgcolor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
          marginTop: 2,
          fontSize: reduced ? "0.8rem" : "0.9rem", // Smaller font size on mobile
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: reduced ? "column" : "row", // Stack links on mobile
              alignItems: "center",
              justifyContent: "center",
              gap: reduced ? theme.spacing(1) : theme.spacing(2), // Smaller gap on mobile
              mb: reduced ? 1 : 2, // Smaller margin bottom on mobile
            }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                color="inherit"
                underline="hover"
                aria-label={`Link para a página de ${link.label}`}
                sx={{ fontSize: "inherit" }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
  
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: reduced ? 1 : 2, // Smaller margin bottom on mobile
            }}
          >
            <Tooltip title={`Enviar um e-mail para ${emailLink.alt}`}>
              <IconButton
                color="inherit"
                href={emailLink.href}
                aria-label={`Link para o ${emailLink.alt}`}
                size={reduced ? "small" : "medium"} // Smaller icon on mobile
              >
                {emailLink.icon}
              </IconButton>
            </Tooltip>
          </Box>
  
          <Typography variant="body2" color="inherit" sx={{ fontSize: "inherit" }}>
            &copy; {new Date().getFullYear()} Calculadora Online BR. Todos os
            direitos reservados.
          </Typography>
        </Container>
      </Box>
    );
  }
  
  export default Footer;
