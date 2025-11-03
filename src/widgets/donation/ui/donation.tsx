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
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        color: '#f8fafc',
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      {/* Заголовок */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>

      {/* Цель */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
      <Box sx={{ mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 16,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 8,
              backgroundColor: '#4ade80',
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            ml: `${progress}%`,
            mt: '-20px',
            transform: 'translateX(-50%)',
            fontWeight: 600,
          }}
        >
          {Math.floor(progress)}%
        </Typography>
      </Box>

      {/* Суммы */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
