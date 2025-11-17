import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

const rows = [
  { id: 1, item: 'Аренда помещения', cost: 50000 },
  { id: 2, item: 'Зарплата персонала', cost: 120000 },
  { id: 3, item: 'Реклама и маркетинг', cost: 30000 },
  { id: 4, item: 'Закупка оборудования', cost: 80000 },
  { id: 5, item: 'Коммунальные услуги', cost: 15000 },
];

export const Expenses = () => {
  const total = rows.reduce((sum, row) => sum + row.cost, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{
        position: 'relative',
        overflowX: 'hidden',
        p: 3,
        color: '#f8fafc',
        mx: 'auto',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        maxWidth: 1055,
        width: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Table
        aria-label="Таблица расходов"
        sx={{
          '& td, & th': { borderBottom: 'none' },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: '#4ade80', whiteSpace: 'nowrap' }}>
              №
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#4ade80' }}>Статья расходов</TableCell>
            <TableCell
              sx={{ fontWeight: 600, color: '#4ade80', textAlign: 'right', whiteSpace: 'nowrap' }}
            >
              Сумма (₽)
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell sx={{ color: '#ffffff', whiteSpace: 'nowrap' }}>{row.id}</TableCell>
              <TableCell
                sx={{
                  color: '#ffffff',
                  wordBreak: 'normal',
                  overflowWrap: 'break-word',
                }}
              >
                {row.item}
              </TableCell>
              <TableCell align="right" sx={{ color: '#ffffff', whiteSpace: 'nowrap' }}>
                {row.cost.toLocaleString('ru-RU')} ₽
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={2} sx={{ fontWeight: 600, color: '#4ade80', whiteSpace: 'nowrap' }}>
              Итого:
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: 600, color: '#4ade80', whiteSpace: 'nowrap' }}
            >
              {total.toLocaleString('ru-RU')} ₽
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
