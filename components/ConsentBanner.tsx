"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Link,
} from '@mui/material';
import { Close, Settings } from '@mui/icons-material';
import { acceptAnalyticsConsent } from '@/components/Analytics';

const ConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('analytics_consent');
    const consentTimestamp = localStorage.getItem('consent_timestamp');
    
    // Mostrar banner se não há consentimento ou se passou mais de 1 ano
    if (!consent || !consentTimestamp || 
        Date.now() - parseInt(consentTimestamp) > 365 * 24 * 60 * 60 * 1000) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    acceptAnalyticsConsent();
    localStorage.setItem('consent_timestamp', Date.now().toString());
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('analytics_consent', 'denied');
    localStorage.setItem('consent_timestamp', Date.now().toString());
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 3,
          borderRadius: 2,
          maxWidth: 600,
          mx: 'auto',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              🍪 Política de Cookies e Privacidade
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, 
              analisar o uso do site e personalizar conteúdo. Seus dados são tratados 
              conforme nossa{' '}
              <Link href="/privacidade" color="primary" underline="hover">
                Política de Privacidade
              </Link>
              .
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setShowBanner(false)}
            sx={{ ml: 1 }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Collapse in={showDetails}>
          <Box sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Categorias de Cookies:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Essenciais:</strong> Necessários para o funcionamento básico do site.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Analytics:</strong> Ajudam-nos a entender como você usa o site (Google Analytics).
            </Typography>
            <Typography variant="body2">
              <strong>Performance:</strong> Monitoram a velocidade e performance do site (Vercel).
            </Typography>
          </Box>
        </Collapse>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Settings />}
            onClick={handleCustomize}
          >
            {showDetails ? 'Ocultar' : 'Personalizar'}
          </Button>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleReject}
              color="secondary"
            >
              Rejeitar
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleAccept}
              color="primary"
            >
              Aceitar Todos
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConsentBanner;