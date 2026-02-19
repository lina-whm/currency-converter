import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { fetchHistoricalRates } from '../../services/currencyApi';
import { useTheme } from '../../hooks/useTheme';
import styles from './CurrencyChart.module.css';

interface CurrencyChartProps {
  fromCurrency: string;
  toCurrency: string;
  timeRange: 'week' | 'month';
}

export const CurrencyChart: React.FC<CurrencyChartProps> = ({
  fromCurrency,
  toCurrency,
  timeRange
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const days = timeRange === 'week' ? 7 : 30;
      const historicalData = await fetchHistoricalRates(fromCurrency, toCurrency, days);
      
      const chartData = Object.entries(historicalData).map(([date, rates]: [string, any]) => ({
        date: new Date(date).toLocaleDateString('ru-RU'),
        rate: rates[toCurrency]
      }));
      
      setData(chartData);
      setLoading(false);
    };

    fetchData();
  }, [fromCurrency, toCurrency, timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#333',
          border: 'none',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Дата: {label}</p>
          <p style={{ margin: '5px 0 0 0', color: '#8884d8' }}>
            Курс: {payload[0]?.value?.toFixed(4)} {toCurrency}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className={styles.loading}>Загрузка графика...</div>;

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
          <XAxis 
            dataKey="date" 
            stroke={theme === 'dark' ? '#fff' : '#333'}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#fff' : '#333'}
            tick={{ fontSize: 12 }}
            tickFormatter={(value: number) => value.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};