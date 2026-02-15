import axios from 'axios';
import { CurrencyData, HistoricalData } from '../types/currency.types';

// бесплатное API
const API_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchCurrentRates = async (baseCurrency: string): Promise<CurrencyData> => {
  try {
    const response = await axios.get(`${API_URL}/${baseCurrency}`);
    return {
      base: response.data.base,
      rates: response.data.rates,
      date: response.data.date
    };
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

export const fetchHistoricalRates = async (
  baseCurrency: string, 
  targetCurrency: string, 
  days: number
): Promise<HistoricalData> => {
  //  моковые данные
  const historicalData: HistoricalData = {};
  const today = new Date();
  
  // базовый курс 
  const baseRate = 0.92; 
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // небольшие колебания курса для реалистичности
    const variation = (Math.random() * 0.04) - 0.02; // от -0.02 до +0.02
    const rate = baseRate + variation;
    
    historicalData[dateStr] = {
      [targetCurrency]: Number(rate.toFixed(4))
    };
  }
  
  return historicalData;
};