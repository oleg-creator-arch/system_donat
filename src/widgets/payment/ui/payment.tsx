import { Alert, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { paymentMethods } from '../lib/make-pay';
import { api } from '@/shared/api/api';
import { useSnackbar } from 'notistack';

export const Payment = () => {
  const [selected, setSelected] = useState('bank_card');
  const [amount, setAmount] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const DEMO_MODE = true;
  const DEMO_ENABLED_METHOD = 'bank_card';
  const { enqueueSnackbar } = useSnackbar();

  const validateAmount = (value: string) => {
    const num = Number(value.replace(/\s|₽/g, ''));
    setIsError(Number.isNaN(num) || num < 10);
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
    validateAmount(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const digits = amount.replace(/[^\d]/g, '').slice(0, -1);
      if (digits) {
        const formatted = Number(digits).toLocaleString('ru-RU');
        setAmount(`${formatted} ₽`);
        validateAmount(formatted);
      } else {
        setAmount('');
        setIsError(true);
      }
    }
  };

  const handleSelectMethod = (id: string) => {
    if (DEMO_MODE && id !== DEMO_ENABLED_METHOD) {
      enqueueSnackbar('Сайт работает в демо-режиме. Доступна только оплата картой.', {
        variant: 'info',
      });
      return;
    }

    setSelected(id);
  };

  const handlePayment = async () => {
    const numericAmount = Number(amount.replace(/\s|₽/g, ''));

    if (isError || !numericAmount) return;

    if (DEMO_MODE) {
      enqueueSnackbar('Демо-режим: платёж не будет выполнен', { variant: 'warning' });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/payments', {
        amount: numericAmount,
        paymentMethod: selected,
      });

      console.log('Server response:', res.data);

      const url = res.data?.paymentUrl;

      if (url) {
        window.location.href = url;
      } else {
        enqueueSnackbar('Ссылка на оплату не найдена', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Ошибка при создании платежа', { variant: 'error' });
    } finally {
      setLoading(false);
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
      {DEMO_MODE && (
        <Alert severity="info">Сайт работает в демо-режиме. Доступна только оплата картой.</Alert>
      )}
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
          Выберите способ перевода
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
          {paymentMethods.map(method => {
            const isDisabled = DEMO_MODE && method.id !== DEMO_ENABLED_METHOD;
            return (
              <Grid key={method.id} size={{ xs: 12, sm: 6, md: 6 }}>
                <Box
                  onClick={() => handleSelectMethod(method.id)}
                  sx={{
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.4 : 1,
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    border:
                      selected === method.id
                        ? '1px solid #4caf50'
                        : '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <Box
                    component="img"
                    src={method.icon}
                    alt={method.label}
                    sx={{ width: 40, height: 40, mb: 1 }}
                  />
                  <Typography>{method.label}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <TextField
          fullWidth
          variant="standard"
          label="Сумма пожертвования"
          placeholder="100 ₽"
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
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Обрабатываем…' : 'Внести свой вклад'}
        </Button>
      </Stack>
    </Box>
  );
};
