import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', borderRadius: '12px', my: 2 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#18181c' }}>
          Мечеть г. Таганрог
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
