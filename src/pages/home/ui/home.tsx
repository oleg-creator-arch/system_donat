import { Box, Grid, Stack, Typography } from '@mui/material';
import './home.scss';
import { DonationCard } from '@/widgets/donation';
import { Expenses } from '@/widgets/expenses';

export const Home = () => {
  return (
    <Grid container spacing={2} sx={{ overflow: 'unset' }}>
      <Grid size={8}>
        <Stack spacing={2}>
          <DonationCard
            title="Ежемесячное обслуживание мечети «Ихляс»"
            goal={328000}
            collected={328000}
            quote="Милостыня стирает грехи так же, как вода гасит огонь"
            reference="Хадис передал ат-Тирмизи"
          />
          <Expenses />
        </Stack>
      </Grid>
      <Grid size={4}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.1)',
            position: 'sticky',
            top: 20,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Правая колонка (фиксируется)
          </Typography>
          <Typography>Эта колонка остаётся видимой при прокрутке левого контента.</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
