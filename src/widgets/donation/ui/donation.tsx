import { Box, Typography, LinearProgress, Chip } from '@mui/material';

interface DonationCardProps {
  title: string;
  goal: number;
  collected: number;
  quote: string;
  reference: string;
  currency?: string;
}

export const DonationCard = ({
  title,
  goal,
  collected,
  quote,
  reference,
  currency = '₽',
}: DonationCardProps) => {
  const progress = Math.min((collected / goal) * 100, 100);

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
      {/* Заголовок */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>

      {/* Цель */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Chip label="ЦЕЛЬ на месяц" color="success" size="small" sx={{ mr: 1, fontWeight: 600 }} />

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {goal.toLocaleString()} {currency}
        </Typography>
      </Box>

      {/* Остаток */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#4ade80', mb: 2 }}>
        {goal - collected} {currency} Осталось собрать
      </Typography>

      {/* Прогресс-бар */}
      <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
        {/* Полоска прогресса */}
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

        {/* Круг с процентом */}
        <Box
          sx={{
            position: 'absolute',
            top: '-25%',
            minWidth: '28px',
            height: '28px',
            lineHeight: '28px',
            color: 'var(--text-btn, #fff)',
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

      {/* Суммы */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {collected.toLocaleString()} {currency}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {goal.toLocaleString()} {currency}
        </Typography>
      </Box>

      {/* Цитата / хадис */}
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        «{quote}»
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
        {reference}
      </Typography>
    </Box>
  );
};
