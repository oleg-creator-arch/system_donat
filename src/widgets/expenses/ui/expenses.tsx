import { api } from '@/shared/api/api';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Expense {
  id: number;
  item: string;
  cost: number;
}

interface ServerExpense {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
}

export const Expenses = () => {
  const [rows, setRows] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/expenses');
        const mapped: Expense[] = res.data.map((e: ServerExpense) => ({
          id: e.id,
          item: e.title,
          cost: e.amount,
        }));
        setRows(mapped);
      } catch (err) {
        console.error(err);
        alert('Ошибка загрузки расходов');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const total = rows.reduce((sum, row) => sum + row.cost, 0);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress color="success" />
      </Box>
    );

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
