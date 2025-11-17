import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DonationCard } from '@/widgets/donation';
import { Expenses } from '@/widgets/expenses';
import { Payment } from '@/widgets/payment';
import { useOutletContext } from 'react-router-dom';

interface HomeContext {
  paymentRef: React.RefObject<HTMLDivElement>;
}

export const Home = () => {
  const { paymentRef } = useOutletContext<HomeContext>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={2} sx={{ overflow: 'unset' }}>
      {/* Левая колонка на десктопе */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Stack spacing={2}>
          <DonationCard
            title="Ежемесячное обслуживание мечети «Ихляс»"
            goal={328000}
            collected={328000}
            quote="Милостыня стирает грехи так же, как вода гасит огонь"
            reference="Хадис передал ат-Тирмизи"
          />

          {/* На мобильных сразу Payment */}
          {isMobile && (
            <Box ref={paymentRef}>
              <Payment />
            </Box>
          )}

          {/* Expenses идут после DonationCard на десктопе и после Payment на мобиле */}
          <Expenses />
          <Expenses />
          <Expenses />
          <Expenses />
        </Stack>
      </Grid>

      {/* Правая колонка на десктопе */}
      {!isMobile && (
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            ref={paymentRef}
            sx={{
              position: 'sticky',
              top: 20,
            }}
          >
            <Payment />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
