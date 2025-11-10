import { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // <900px
  const [isFixed, setIsFixed] = useState(false);

  const THRESHOLD = 150;

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!isMobile) {
      setIsFixed(false);
      return;
    }

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsFixed(currentY > THRESHOLD);
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <AppBar
      position={isMobile && isFixed ? 'fixed' : 'static'}
      sx={{
        top: 0,
        left: isMobile && isFixed ? 16 : 0, // ← добавляем реальные внешние отступы
        right: isMobile && isFixed ? 16 : 0, // ← а не padding
        width: isMobile && isFixed ? 'calc(100% - 32px)' : '100%',
        borderRadius: '10px',
        background: isMobile
          ? isFixed
            ? '#165039'
            : 'rgba(255, 255, 255, 0.08)'
          : 'rgba(255, 255, 255, 0.1)',
        maxWidth: isMobile ? '100%' : 1055,
        mx: 'auto',
        mt: isMobile ? 0 : 2,
        transition: 'background 300ms ease, box-shadow 300ms ease',
        zIndex: isMobile && isFixed ? 1300 : 1000,
        boxShadow: isMobile && isFixed ? '0 4px 18px rgba(0,0,0,0.35)' : 'none',
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          justifyContent: 'center',
          py: { xs: 0.5, sm: 1 },
          minHeight: { xs: 48, sm: 56, md: 64 },
          px: { xs: 2, sm: 3 }, // ← внутренние отступы контента
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
    </AppBar>
  );
};
