import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        my: 2,
        maxWidth: 1055,
        width: '100%',
        mx: 'auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
        },
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            color: '#f8fafc',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          Мечеть «Ихляс»
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
