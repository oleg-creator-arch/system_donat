import { Header } from '@/widgets/header';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        px: 2,
        color: '#f8fafc',
        backgroundColor: '#0a0f1a',
      }}
    >
      {/* === Плавно движущийся градиент (CSS-анимация) === */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #081f1c, #0f3d3e, #111e41, #09342e)',
          backgroundSize: '250% 250%',
          animation: 'moveGradient 25s linear infinite',
          '@keyframes moveGradient': {
            '0%': { backgroundPosition: '100% 100%' },
            '50%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '100% 100%' },
          },
          zIndex: 0,
          opacity: 0.9,
          willChange: 'background-position', // GPU hint
        }}
      />

      {/* === Лёгкая сетка линий === */}
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
          '@keyframes moveGrid': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '120px 120px' },
          },
          willChange: 'background-position',
        }}
      />

      {/* === Контент === */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1055,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Header />
        <Container sx={{ mt: 4 }} disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
