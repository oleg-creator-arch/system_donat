import { Header } from '@/widgets/header';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Box sx={{ px: 2 }}>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
