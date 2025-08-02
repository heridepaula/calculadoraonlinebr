"use client";

import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link as MuiLink,
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CALCULATORS } from "@/lib/data/calculators";
import { CALCULATOR_CATEGORIES } from "@/lib/config/constants";

interface HeaderProps {
  reduced?: boolean;
}

export default function Header({ reduced }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };
  
  const categoryColors: Record<string, string> = {
    financeira: "#4caf50",
    matematica: "#3f51b5",
    saude: "#f44336",
    trabalhista: "#380202ff"
  };
  
  const calculatorsByCategory = CALCULATORS.reduce((acc, calc) => {
    const category = calc.category || 'outros';
    if (!acc[category]) acc[category] = [];
    acc[category].push(calc);
    return acc;
  }, {} as Record<string, typeof CALCULATORS>);

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
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            aria-label="Ir para a página inicial"
          >
            <MuiLink
              component="div"
              underline="none"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <Image
                src="/images/logo-header.webp"
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
                  display: { xs: "none", sm: "inline-block" },
                  color: "#333333",
                }}
              >
                Calculadora Online BR
              </Typography>
            </MuiLink>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                endIcon={<ExpandMore />}
                sx={{ color: "#333333", fontWeight: 500 }}
                aria-label="Menu de calculadoras"
              >
                Calculadoras
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 320,
                    maxWidth: { xs: "90vw", sm: 400 },
                    maxHeight: 500,
                    overflow: "auto"
                  }
                }}
              >
                {Object.entries(calculatorsByCategory).map(([category, calcs]) => [
                  <MenuItem
                    key={`${category}-header`}
                    disabled
                    sx={{
                      fontWeight: 600,
                      color: categoryColors[category] || "#666",
                      textTransform: "capitalize",
                      fontSize: "0.9rem",
                      opacity: 1
                    }}
                  >
                    {CALCULATOR_CATEGORIES[category as keyof typeof CALCULATOR_CATEGORIES]?.name || category}
                  </MenuItem>,
                  ...calcs.map((calc) => (
                    <MenuItem
                      key={calc.id}
                      component={Link}
                      href={calc.path}
                      onClick={handleMenuClose}
                      sx={{
                        pl: 3,
                        fontSize: "0.875rem",
                        whiteSpace: "normal",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)"
                        }
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {calc.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                        {calc.description}
                      </Typography>
                    </MenuItem>
                  ))
                ])}
              </Menu>
            </Box>
          )}
          
          {/* Mobile Navigation */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              aria-label="Menu de navegação mobile"
              sx={{ color: "#333333" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            PaperProps={{
              sx: {
                width: "95vw",
                maxWidth: "350px",
                maxHeight: "80vh",
                overflow: "auto"
              }
            }}
          >
            <MenuItem
              component={Link}
              href="/"
              onClick={handleMobileMenuClose}
              sx={{ fontWeight: 600 }}
            >
              Página Inicial
            </MenuItem>
            {Object.entries(calculatorsByCategory).map(([category, calcs]) => [
              <MenuItem
                key={`${category}-header-mobile`}
                disabled
                sx={{
                  fontWeight: 600,
                  color: categoryColors[category] || "#666",
                  textTransform: "capitalize",
                  fontSize: "0.9rem",
                  opacity: 1,
                  mt: 1
                }}
              >
                {CALCULATOR_CATEGORIES[category as keyof typeof CALCULATOR_CATEGORIES]?.name || category}
              </MenuItem>,
              ...calcs.map((calc) => (
                <MenuItem
                  key={calc.id}
                  component={Link}
                  href={calc.path}
                  onClick={handleMobileMenuClose}
                  sx={{
                    pl: 3,
                    fontSize: "0.875rem",
                    whiteSpace: "normal",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    py: 1.5
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {calc.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                    {calc.description}
                  </Typography>
                </MenuItem>
              ))
            ])}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
