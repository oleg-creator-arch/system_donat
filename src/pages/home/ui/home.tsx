import { Box } from '@mui/material';
import './home.scss';
import { DonationCard } from '@/widgets/donation';

export const Home = () => {
  return (
    <Box>
      <DonationCard
        title="Ежемесячное обслуживание мечети «Ихляс»"
        goal={328000}
        collected={48718}
        quote="Защитите себя от огня Ада пожертвованием хотя бы половинки финика"
        reference="Хадис передал аль-Бухари"
      />
    </Box>
  );
};
