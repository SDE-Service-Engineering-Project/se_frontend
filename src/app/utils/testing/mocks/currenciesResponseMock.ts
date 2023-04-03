import {
  CurrencyConversionResponse,
  CurrencyResponse,
} from '../../../models/currency';

export const currenciesResponseMock: CurrencyResponse = {
  currencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'],
};

export const currencyConversionResponseMock: CurrencyConversionResponse = {
  amount: 1,
  currency: 'EUR',
};
