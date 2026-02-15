import React, { useState } from 'react';
import { CURRENCIES } from '../../utils/constants';
import { useCurrency } from '../../hooks/useCurrency';
import { CurrencyChart } from '../CurrencyChart/CurrencyChart';
import styles from './Converter.module.css';

export const Converter: React.FC = () => {
  const {
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
  } = useCurrency();

  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  return (
    <div className={styles.converter}>
      <h1 className={styles.title}>Конвертер валют</h1>
      
      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="amount">Сумма</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              step="0.01"
              className={styles.input}
              placeholder="Введите сумму"
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="fromCurrency">Из</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className={styles.select}
            >
              {CURRENCIES.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={swapCurrencies} className={styles.swapButton} aria-label="Поменять валюты">
            ⇄
          </button>

          <div className={styles.inputWrapper}>
            <label htmlFor="toCurrency">В</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className={styles.select}
            >
              {CURRENCIES.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <div className={styles.loading}>Загрузка...</div>}

{error && (
  <div className={styles.error}>
    <p> {error}</p>
    {error.includes('API key') && (
      <p style={{ fontSize: '14px', marginTop: '10px' }}>
         Убедитесь, что файл .env существует и содержит правильный API ключ
      </p>
    )}
  </div>
)}        
        {!loading && !error && (
          <div className={styles.result}>
            <span className={styles.resultText}>
              {amount} {fromCurrency} =
            </span>
            <span className={styles.resultValue}>
              {result.toFixed(2)} {toCurrency}
            </span>
          </div>
        )}
      </div>

      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>График изменения курса</h2>
        <div className={styles.chartControls}>
          <button
            className={`${styles.timeButton} ${timeRange === 'week' ? styles.active : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Неделя
          </button>
          <button
            className={`${styles.timeButton} ${timeRange === 'month' ? styles.active : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Месяц
          </button>
        </div>
        
        <CurrencyChart
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          timeRange={timeRange}
        />
      </div>
    </div>
  );
};