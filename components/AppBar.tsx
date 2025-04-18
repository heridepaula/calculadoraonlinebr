"use client";

import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  reduced?: boolean;
}

export default function Header({ reduced }: HeaderProps) {

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={1}
      sx={{
        py: reduced ? 1 : 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" passHref legacyBehavior>
            <MuiLink
              underline="none"
              color="inherit"
              aria-label="Ir para a página inicial"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/logo-header.png"
                alt="Logo Calculadora Online BR"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  ml: 2,
                  display: "inline-block",
                }}
              >
                Calculadora Online BR
              </Typography>
            </MuiLink>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
