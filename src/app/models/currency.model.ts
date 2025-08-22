export interface Currency {
  code: string;
  name: string;
  flag?: string;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export interface ConversionResult {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  exchangeRate: number;
}

export interface ApiError {
  error: string;
  message: string;
}


