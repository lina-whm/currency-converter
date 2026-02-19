import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Converter } from './Converter';
import { ThemeProvider } from '../../context/ThemeContext';
import { useCurrency } from '../../hooks/useCurrency';

jest.mock('../../hooks/useCurrency', () => ({
  useCurrency: jest.fn()
}));

describe('Конвертер валют', () => {
  beforeEach(() => {
    (useCurrency as jest.Mock).mockReturnValue({
      fromCurrency: 'USD',
      setFromCurrency: jest.fn(),
      toCurrency: 'EUR',
      setToCurrency: jest.fn(),
      amount: 1,
      setAmount: jest.fn(),
      result: 0.85,
      loading: false,
      error: null,
      swapCurrencies: jest.fn()
    });
  });

  test('отображает заголовок конвертера', () => {
    render(
      <ThemeProvider>
        <Converter />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Конвертер валют')).toBeInTheDocument();
  });

  test('отображает правильный результат конвертации', () => {
    render(
      <ThemeProvider>
        <Converter />
      </ThemeProvider>
    );
    
    expect(screen.getByText('1 USD =')).toBeInTheDocument();
    expect(screen.getByText('0.85 EUR')).toBeInTheDocument();
  });

  test('поле ввода суммы существует', () => {
    render(
      <ThemeProvider>
        <Converter />
      </ThemeProvider>
    );
    
    const amountInput = screen.getByLabelText('Сумма');
    expect(amountInput).toBeInTheDocument();
  });
});