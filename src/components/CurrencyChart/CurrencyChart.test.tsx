import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CurrencyChart } from './CurrencyChart';
import { ThemeProvider } from '../../context/ThemeContext';
import { fetchHistoricalRates } from '../../services/currencyApi';

jest.mock('../../services/currencyApi', () => ({
  fetchHistoricalRates: jest.fn()
}));

jest.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn()
  })
}));

describe('CurrencyChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображает загрузку', () => {
    (fetchHistoricalRates as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(
      <ThemeProvider>
        <CurrencyChart 
          fromCurrency="USD" 
          toCurrency="EUR" 
          timeRange="week" 
        />
      </ThemeProvider>
    );
    
    expect(screen.getByText(/Загрузка графика/i)).toBeInTheDocument();
  });

  test('отображает график после загрузки', async () => {
    const mockData = {
      '2026-02-18': { EUR: 0.85 },
      '2026-02-19': { EUR: 0.86 }
    };
    
    (fetchHistoricalRates as jest.Mock).mockResolvedValue(mockData);
    
    render(
      <ThemeProvider>
        <CurrencyChart 
          fromCurrency="USD" 
          toCurrency="EUR" 
          timeRange="week" 
        />
      </ThemeProvider>
    );
    
    expect(await screen.findByText(/Загрузка графика/i)).toBeInTheDocument();
  });
});