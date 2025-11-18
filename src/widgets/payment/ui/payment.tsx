import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { paymentMethods } from '../lib/make-pay';

export const Payment = () => {
  const [selected, setSelected] = useState('spb');
  const [amount, setAmount] = useState('');
  const [isError, setIsError] = useState(false);

  const validateAmount = (value: string) => {
    const num = Number(value.replace(/\s|₽/g, ''));
    if (!num || num < 10) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    if (inputValue === '') {
      setAmount('');
      setIsError(true);
      return;
    }

    const num = Number(inputValue);
    const formatted = num.toLocaleString('ru-RU');
    setAmount(`${formatted} ₽`);
    validateAmount(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const digits = amount.replace(/[^\d]/g, '').slice(0, -1);
      if (digits) {
        const formatted = Number(digits).toLocaleString('ru-RU');
        setAmount(`${formatted} ₽`);
        validateAmount(formatted);
      } else {
        setAmount('');
        setIsError(true);
      }
      e.preventDefault();
    }
  };
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
      <Stack spacing={2}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            textAlign: 'center',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          Выберите способ оплаты
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            mb: 3,
            maxWidth: { md: '500px', xs: '100%' },
            flexDirection: 'row',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          {paymentMethods.map(method => (
            <Grid key={method.id} size={{ xs: 12, sm: 6, md: 6 }}>
              <Box
                onClick={() => setSelected(method.id)}
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 1, md: 0 },
                  p: { xs: 1, md: 2 },
                  borderRadius: 2,
                  background:
                    selected === method.id
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(255, 255, 255, 0.05)',
                  border:
                    selected === method.id
                      ? '1px solid rgba(255,255,255,0.3)'
                      : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={method.icon}
                  alt={method.label}
                  sx={{
                    width: 40,
                    height: 40,
                    mb: { md: 1, xs: 0 },
                  }}
                />
                <Typography
                  fontWeight={500}
                  fontSize={{ xs: '0.9rem', md: '1rem' }}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {method.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <TextField
          fullWidth
          variant="standard"
          label="Cумма пожертвования"
          placeholder="1000 ₽"
          value={amount}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={isError}
          helperText={isError ? 'от 10 ₽' : ''}
          sx={{
            '& input': {
              color: isError ? '#f44336' : amount ? '#fff' : '#4caf50',
              fontWeight: 500,
            },
            '& label': {
              color: isError ? '#f44336' : amount ? '#fff' : '#4caf50',
            },
            '& label.Mui-focused': {
              color: isError ? '#f44336' : '#4caf50',
            },
            '& label.Mui-error': {
              color: '#f44336',
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: isError ? '#f44336' : amount ? '#fff' : '#4caf50',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: isError ? '#f44336' : amount ? '#fff' : '#4caf50',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: isError ? '#f44336' : '#4caf50',
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{
            color: '#fff',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.5)' },
              '70%': { boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' },
            },
          }}
          onClick={() => alert(`Вы выбрали ${selected}, сумма ${amount || 0}₽`)}
        >
          Внести свой вклад
        </Button>
      </Stack>
    </Box>
  );
};
