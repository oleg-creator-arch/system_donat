import { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobile) {
      setIsStuck(false);
      return;
    }

    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 1 },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <>
      {/* Невидимый элемент перед хедером, который сообщает: хедер вышел за экран */}
      <Box ref={sentinelRef} sx={{ height: 1 }} />

      <AppBar
        position={isMobile ? 'sticky' : 'static'} // ← КЛЮЧ: sticky НЕ ломает layout
        sx={{
          top: 0,
          background: 'transparent',
          boxShadow: 'none',
          zIndex: 1200,
        }}
        elevation={0}
      >
        {/* Внутренний слой — анимации только здесь */}
        <Box
          sx={{
            background: isMobile
              ? isStuck
                ? 'rgba(255, 255, 255, 0.12)' // ← плотный «мутный»
                : 'rgba(255,255,255,0.12)' // ← прозрачный
              : 'rgba(255,255,255,0.15)',
            backdropFilter: isMobile && isStuck ? 'blur(25px)' : 'none',
            WebkitBackdropFilter: isMobile && isStuck ? 'blur(25px)' : 'none',
            borderRadius: '10px',
            boxShadow: isMobile && isStuck ? '0 6px 18px rgba(0,0,0,0.35)' : 'none',
            opacity: isMobile && !isStuck ? 0.85 : 1,

            transition: `
              transform 280ms ease,
              opacity 280ms ease,
              background 250ms ease,
              box-shadow 250ms ease
            `,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'center',
              py: { xs: 0.5, sm: 1 },
              minHeight: { xs: 48, sm: 56, md: 64 },
              maxHeight: { xs: 48, sm: 56, md: 64 },
              px: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                color: '#f8fafc',
                fontWeight: 600,
                letterSpacing: '0.05em',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              }}
            >
              Мечеть «Ихляс»
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
};
