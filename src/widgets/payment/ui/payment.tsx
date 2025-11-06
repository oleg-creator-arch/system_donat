import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

// import { ReactComponent as SpbIcon } from '@/shared/assets/icons/spb.svg';
// import { ReactComponent as CardIcon } from '@/shared/assets/icons/card.svg';
// import { ReactComponent as TbankIcon } from '@/shared/assets/icons/tbank.svg';
// import { ReactComponent as SberpayIcon } from '@/shared/assets/icons/sberpay.svg';

import spbIcon from '@shared/assets/icons/spb.svg';
import cardIcon from '@shared/assets/icons/card.svg';
import tbankIcon from '@shared/assets/icons/tbank.svg';
import sberpayIcon from '@shared/assets/icons/sberpay.svg';

const paymentMethods = [
  { id: 'spb', label: 'Через СБП', icon: spbIcon },
  { id: 'card', label: 'Картой онлайн', icon: cardIcon },
  { id: 'tbank', label: 'T-Pay', icon: tbankIcon },
  { id: 'sberpay', label: 'SberPay', icon: sberpayIcon },
];

export const Payment = () => {
  const [selected, setSelected] = useState('spb');
  const [amount, setAmount] = useState('');
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

      {/* Варианты оплаты */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {paymentMethods.map(method => (
          <Grid size={6} key={method.id}>
            <Box
              onClick={() => setSelected(method.id)}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                hyphens: 'none',
                p: 2,
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
              <img
                src={method.icon}
                alt={method.label}
                width={40}
                height={40}
                style={{ marginBottom: 8 }}
              />
              <Typography fontWeight={500}>{method.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Поле для ввода суммы */}
      <TextField
        fullWidth
        variant="outlined"
        label="Сумма пожертвования"
        value={amount}
        onChange={e => setAmount(e.target.value.replace(/\D/g, ''))}
        sx={{
          input: { color: '#f8fafc' },
          label: { color: 'rgba(255,255,255,0.7)' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
          },
          mb: 3,
        }}
      />

      {/* Кнопка пожертвования */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#16a34a',
          color: '#fff',
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#15803d',
          },
        }}
        onClick={() => alert(`Вы выбрали ${selected}, сумма ${amount || 0}₽`)}
      >
        Пожертвовать
      </Button>
    </Box>
  );
};
