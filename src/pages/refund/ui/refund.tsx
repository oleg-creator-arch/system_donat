import { Box, Grid, Stack, Card, CardContent, Typography } from '@mui/material';
import { Contact } from '@/widgets/contact';
import { PaymentDev } from '@/widgets/paymentDev';
import thanksIcon from '@shared/assets/icons/thanks.svg';

export const Refund = () => {
  return (
    <Grid container spacing={2} sx={{ overflow: 'unset' }}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Stack spacing={2}>
          <Card
            sx={{
              p: 2,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              color: '#ccf386',
              animation: 'fadePulse 3s ease-in-out infinite',
              '@keyframes fadePulse': {
                '0%': { opacity: 0.7, transform: 'scale(0.98)' },
                '50%': { opacity: 1, transform: 'scale(1.02)' },
                '100%': { opacity: 0.7, transform: 'scale(0.98)' },
              },
            }}
          >
            <CardContent>
              <Typography variant="h6">Благодарим за вашу помощь</Typography>
              <Typography sx={{ mb: 1 }}>
                Ваша поддержка помогает мечети развиваться, покрывать расходы и совершать благие
                дела.
              </Typography>
              <Typography sx={{ mb: 1 }}>Спасибо за ваш вклад!</Typography>
              <Box
                component="img"
                src={thanksIcon}
                alt="thanks"
                sx={{
                  width: 150,
                  height: 150,
                  display: 'block',
                  mx: 'auto',
                  mt: 2,
                }}
              />
            </CardContent>
          </Card>
          <Card sx={{ p: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>
                Разместите вашу рекламу
              </Typography>
              <Typography sx={{ mb: 1, color: '#fff' }}>
                Ваша реклама помогает мечети «Ихляс» развиваться и поддерживать её проекты.
              </Typography>
              <Typography sx={{ mb: 1, color: '#fff' }}>
                Контакт для размещения рекламы: +7 960 461 37 97
              </Typography>
            </CardContent>
          </Card>

          <Contact />
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ position: 'sticky', top: 20 }}>
          <PaymentDev />
        </Box>
      </Grid>
    </Grid>
  );
};
