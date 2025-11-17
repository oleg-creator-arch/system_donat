import { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  onHelpClick?: () => void; // функция скролла к Payment
}

export const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
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
      <Box ref={sentinelRef} sx={{ height: 1 }} />

      <AppBar
        position={isMobile ? 'sticky' : 'static'}
        sx={{
          top: 0,
          background: 'transparent',
          boxShadow: 'none',
          zIndex: 1200,
        }}
        elevation={0}
      >
        <Box
          sx={{
            background: isMobile
              ? isStuck
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(255,255,255,0.12)'
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
              justifyContent: 'space-between',
              py: { xs: 0.5, sm: 1 },
              minHeight: { xs: 48, sm: 56, md: 64 },
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

            {/* Кнопка "Помочь" только если закреплен header */}
            {isMobile && isStuck && (
              <Button
                variant="contained"
                color="success"
                onClick={onHelpClick}
                sx={{
                  ml: 2,
                  color: '#fff',
                  py: 0.8,
                  px: 2,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.5)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' },
                  },
                }}
              >
                Помочь
              </Button>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
};
