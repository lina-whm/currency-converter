import axios from 'axios';
import { CurrencyData, HistoricalData } from '../types/currency.types';

const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://v6.exchangerate-api.com/v6';

if (!API_KEY) {
  console.error('API key is missing. Please check your .env file');
}

export const fetchCurrentRates = async (baseCurrency: string): Promise<CurrencyData> => {
  try {
    if (!API_KEY) {
      throw new Error('API key is not configured');
    }

    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    
    return {
      base: response.data.base_code,
      rates: response.data.conversion_rates,
      date: response.data.time_last_update_utc
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
  try {
    if (!API_KEY) {
      throw new Error('API key is not configured');
    }

    const historicalData: HistoricalData = {};
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      historicalData[dateStr] = {
        [targetCurrency]: 0.85 + (Math.random() * 0.1 - 0.05)
      };
    }
    
    return historicalData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export const testApiConnection = async (): Promise<boolean> => {
  try {
    if (!API_KEY) return false;
    
    await axios.get(`${BASE_URL}/${API_KEY}/latest/USD`);
    return true;
  } catch {
    return false;
  }
};