import { Box, Button, Stack, Typography } from '@mui/material';

import phoneIcon from '@shared/assets/icons/phone.svg';
import locationIcon from '@shared/assets/icons/location.svg';
import telegramIcon from '@shared/assets/icons/telegram.svg';

export const Contact = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        p: 4,
        color: '#f8fafc',
        mx: 'auto',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Контакты
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box component="img" src={phoneIcon} alt="phone" sx={{ width: 32, height: 32 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>
              +7 917 265 87 38
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>По всем вопросам</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Box component="img" src={locationIcon} alt="location" sx={{ width: 32, height: 32 }} />
          <Box>
            <Typography sx={{ fontWeight: 600 }}>г. Таганрог</Typography>
            <Typography sx={{ opacity: 0.7 }}>ул. Ореховая д. 25</Typography>
          </Box>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        sx={{
          background: 'linear-gradient(90deg, #4CB944, #2dbb70)',
          borderRadius: '10px',
          px: 3,
          py: 1.5,
          fontWeight: 700,
          fontSize: '16px',
        }}
        startIcon={
          <Box component="img" src={telegramIcon} alt="telegram" sx={{ width: 20, height: 20 }} />
        }
      >
        TELEGRAM
      </Button>

      <Typography
        variant="body2"
        sx={{
          mt: 4,
          fontSize: '12px',
          opacity: 0.7,
          maxWidth: 700,
        }}
      >
        © {new Date().getFullYear()} ИНН: 6154161496 МЕСТНАЯ МУСУЛЬМАНСКАЯ РЕЛИГИОЗНАЯ ОРГАНИЗАЦИЯ
        Г.ТАГАНРОГА "ИХЛАС" (ОТКРОВЕННОСТЬ) В СОСТАВЕ ЦРО ДУМ РОСТОВСКОЙ ОБЛАСТИ (ДОНСКОЙ МУФТИЯТ)
      </Typography>
    </Box>
  );
};
