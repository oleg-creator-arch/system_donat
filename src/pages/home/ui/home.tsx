import { Box, Grid, Stack } from '@mui/material';
import './home.scss';
import { DonationCard } from '@/widgets/donation';
import { Expenses } from '@/widgets/expenses';
import { Payment } from '@/widgets/payment';

export const Home = () => {
  return (
    <Grid container spacing={2} sx={{ overflow: 'unset' }}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Stack spacing={2}>
          <DonationCard
            title="Ежемесячное обслуживание мечети «Ихляс»"
            goal={328000}
            collected={328000}
            quote="Милостыня стирает грехи так же, как вода гасит огонь"
            reference="Хадис передал ат-Тирмизи"
          />
          <Expenses />
          <Expenses />
          <Expenses />
          <Expenses />
          <Expenses />
          <Expenses />
          <Expenses />
          <Expenses />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Box
          sx={{
            position: 'sticky',
            top: 20,
          }}
        >
          <Payment />
        </Box>
      </Grid>
    </Grid>
  );
};
