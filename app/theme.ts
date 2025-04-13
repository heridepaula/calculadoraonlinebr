// src/app/theme/theme.ts
import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#ADD8E6',
        light: '#E0F2F7',
        dark: '#00838F',
        contrastText: '#333333',
      },
      secondary: { // Using secondary for the accent color
        main: '#90CAF9', // Azul mais vibrante
        light: '#E3F2FD',
        dark: '#1E88E5',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F0F8FF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#333333',
        secondary: '#444444',
      },
      error: {
        main: '#FFCDD2',
        light: '#FFEBEE',
        dark: '#B71C1C',
        contrastText: '#333333',
      },
      success: {
        main: '#A5D6A7',
        light: '#E8F5E9',
        dark: '#388E3C',
        contrastText: '#333333',
      },
    },
    typography: {
      fontFamily: '"IBM Plex Mono", monospace',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            textTransform: 'none',
            fontWeight: 400,
          },
        },
      },
    },
  },
  ptBR,
);

export default theme;