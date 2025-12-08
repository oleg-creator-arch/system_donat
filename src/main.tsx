import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
);
