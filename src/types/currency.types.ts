export interface CurrencyRate {
  [key: string]: number;
}

export interface CurrencyData {
  base: string;
  rates: CurrencyRate;
  date: string;
}

export interface HistoricalData {
  [date: string]: CurrencyRate;
}

export interface CurrencyOption {
  code: string;
  name: string;
}

export type TimeRange = 'week' | 'month';