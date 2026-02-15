import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentRates } from '../services/currencyApi';
import { useLocalStorage } from './useLocalStorage';
import { CurrencyData } from '../types/currency.types';

export const useCurrency = () => {
  const [fromCurrency, setFromCurrency] = useLocalStorage('fromCurrency', 'USD');
  const [toCurrency, setToCurrency] = useLocalStorage('toCurrency', 'EUR');
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number>(0);
  const [rates, setRates] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCurrentRates(fromCurrency);
        setRates(data);
      } catch (err) {
        setError('Не удалось загрузить курсы валют');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (rates?.rates && rates.rates[toCurrency]) {
      setResult(amount * rates.rates[toCurrency]);
    }
  }, [amount, toCurrency, rates]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency, setFromCurrency, setToCurrency]);

  return {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    result,
    loading,
    error,
    swapCurrencies
  };
};