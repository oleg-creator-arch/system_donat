import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

export const Layout = () => {
  const paymentRef = useRef<HTMLDivElement | null>(null);

  const handleHelpClick = () => {
    paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        px: 2,
        color: '#f8fafc',
        backgroundColor: '#0a0f1a',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #081f1c, #0f3d3e, #111e41, #09342e)',
          backgroundSize: '250% 250%',
          animation: 'moveGradient 25s linear infinite',
          zIndex: 0,
          opacity: 0.9,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          opacity: 0.1,
          animation: 'moveGrid 40s linear infinite',
        }}
      />

      <Box
        sx={{ position: 'relative', zIndex: 3, maxWidth: 1055, mx: 'auto', width: '100%', py: 2 }}
      >
        <Header paymentRef={paymentRef} onHelpClick={handleHelpClick} />

        <Container sx={{ mt: 4 }} disableGutters>
          <Outlet context={{ paymentRef }} />
        </Container>
      </Box>
    </Box>
  );
};
