import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { api } from '@/shared/api/api';
import { useSnackbar } from 'notistack';

interface DonationCardProps {
  title: string;
  quote: string;
  reference: string;
}

export const DonationCard = ({ title, quote, reference }: DonationCardProps) => {
  const [collected, setCollected] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const currency = '₽';
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<{ collected: number; expenses: number }>('/payments');

        setCollected(res.data.collected);
        setExpenses(res.data.expenses);
      } catch (err) {
        enqueueSnackbar('Ошибка загрузки статистики', { variant: 'error' });
      }
    };

    load();
  }, []);

  const goal = expenses;
  const remaining = Math.max(goal - collected, 0);
  const progress = goal > 0 ? Math.min((collected / goal) * 100, 100) : 0;

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
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Chip label="Цель расходов" color="success" size="small" sx={{ mr: 1, fontWeight: 600 }} />
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {goal.toLocaleString()} {currency}
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, color: '#4ade80', mb: 2 }}>
        {remaining.toLocaleString()} {currency} Осталось собрать
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 20,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 8,
              background: 'linear-gradient(90deg, #b0fdcc, #4ade80)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '-25%',
            minWidth: '28px',
            height: '28px',
            lineHeight: '28px',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: '-14px',
            zIndex: 3,
            background: '#4ade80',
            borderRadius: '50%',
            padding: '0px 2px',
            left: `${progress}%`,
            transform: 'translateX(-50%)',
            transition: 'left 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            ...(progress < 1 && { left: '3%' }),
          }}
        >
          {Math.floor(progress)}%
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Собрано: {collected.toLocaleString()} {currency}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Расходы: {expenses.toLocaleString()} {currency}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
        «{quote}»
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
        {reference}
      </Typography>
    </Box>
  );
};
