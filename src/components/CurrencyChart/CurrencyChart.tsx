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
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const days = timeRange === 'week' ? 7 : 30;
        const historicalData = await fetchHistoricalRates(fromCurrency, toCurrency, days);
        
        const chartData = Object.entries(historicalData).map(([date, rates]) => ({
          date,
          rate: rates[toCurrency]
        }));
        
        chartData.sort((a, b) => {
          const [aDay, aMonth, aYear] = a.date.split('.').map(Number);
          const [bDay, bMonth, bYear] = b.date.split('.').map(Number);
          return new Date(aYear, aMonth-1, aDay).getTime() - new Date(bYear, bMonth-1, bDay).getTime();
        });
        
        setData(chartData);
      } catch (error) {
        console.error('Error loading chart:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [fromCurrency, toCurrency, timeRange]);

  const currencyNames: { [key: string]: string } = {
    'USD': 'Доллар США',
    'EUR': 'Евро',
    'GBP': 'Фунт стерлингов',
    'JPY': 'Японская йена',
    'CHF': 'Швейцарский франк',
    'CAD': 'Канадский доллар',
    'AUD': 'Австралийский доллар',
    'CNY': 'Китайский юань',
    'RUB': 'Российский рубль'
  };

  const formatTooltipDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.');
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year} года`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const rate = payload[0].value;
      const date = formatTooltipDate(label);
      const fromName = currencyNames[fromCurrency] || fromCurrency;
      const toName = currencyNames[toCurrency] || toCurrency;
      
      return (
        <div style={{
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#333',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          minWidth: '200px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
            {date}
          </p>
          <p style={{ margin: '4px 0', display: 'flex', justifyContent: 'space-between' }}>
            <span>1 {fromCurrency} ({fromName}) =</span>
            <strong style={{ color: '#8884d8', marginLeft: '8px' }}>
              {rate?.toFixed(4)} {toCurrency}
            </strong>
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.9em', color: theme === 'dark' ? '#aaa' : '#666' }}>
            ({toName})
          </p>
          {label === data[data.length - 1]?.date && (
            <p style={{ margin: '8px 0 0 0', fontSize: '0.85em', color: '#4caf50', textAlign: 'center' }}>
              ✓ Сегодняшний реальный курс
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className={styles.loading}>Загрузка графика...</div>;
  if (data.length === 0) return <div className={styles.loading}>Нет данных</div>;

  const currentRate = data[data.length - 1]?.rate;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.currentRate}>
        <span>Текущий курс: </span>
        <strong>
          {currentRate?.toFixed(2)} {toCurrency} за 1 {fromCurrency}
        </strong>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
          <XAxis 
            dataKey="date" 
            stroke={theme === 'dark' ? '#fff' : '#333'}
            tick={{ fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke={theme === 'dark' ? '#fff' : '#333'}
            tick={{ fontSize: 10 }}
            domain={['auto', 'auto']}
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