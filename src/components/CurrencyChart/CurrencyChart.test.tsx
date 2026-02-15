import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrencyChart } from './CurrencyChart';
import { ThemeProvider } from '../../context/ThemeContext';

jest.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn()
  })
}));

jest.mock('../../services/currencyApi', () => ({
  fetchHistoricalRates: jest.fn().mockResolvedValue({
    '2026-02-14': { EUR: 0.85 }, 
    '2026-02-15': { EUR: 0.86 }   
  })
}));

describe('CurrencyChart', () => {
  test('renders chart component', () => {
    render(
      <ThemeProvider>
        <CurrencyChart 
          fromCurrency="USD" 
          toCurrency="EUR" 
          timeRange="week" 
        />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/Loading chart/i)).toBeInTheDocument();
  });
});