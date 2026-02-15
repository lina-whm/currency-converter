import { CurrencyOption } from '../types/currency.types';

export const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'Доллар США' },
  { code: 'EUR', name: 'Евро' },
  { code: 'GBP', name: 'Британский фунт' },
  { code: 'JPY', name: 'Японская йена' },
  { code: 'CHF', name: 'Швейцарский франк' },
  { code: 'CAD', name: 'Канадский доллар' },
  { code: 'AUD', name: 'Австралийский доллар' },
  { code: 'CNY', name: 'Китайский юань' },
  { code: 'RUB', name: 'Российский рубль' },
];

export const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';