import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import {
  ConversionResult,
  Currency,
} from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private API_URL = 'https://api.unirateapi.com/api/rates';
  private API_URL_tokens = 'https://api.unirateapi.com/api/currencies?api_key=kvUpXzFrZLWl5uI6zElGrSsxAY1O6Tz3iFKYkoj4djggZDPRjHEkLozLKVm0Cr5K&format=json'
  private api_key =
    'kvUpXzFrZLWl5uI6zElGrSsxAY1O6Tz3iFKYkoj4djggZDPRjHEkLozLKVm0Cr5K';

  constructor(private http: HttpClient) { }

  convertCurrency(
    amount: number,
    from: string,
    to: string
  ): Observable<ConversionResult> {

    const url = `${this.API_URL}?api_key=${this.api_key}&amount=${amount}&from=${from.trim()
      }&to=${to.trim()}&format=json`;

    return this.http.get<any>(url).pipe(
      map((response) => {


        if (response.result && response.base && response.to && response.rate) {
          return {
            fromCurrency: response.base,
            toCurrency: response.to,
            amount: amount,
            convertedAmount: response.result,
            exchangeRate: response.rate,
          };
        } else {
          throw new Error('Resposta inválida da API');
        }
      }),
      catchError((error) => {
        console.error('Erro completo:', error);
        console.error('Erro response:', error.error);

        return throwError(() => new Error('Falha ao converter moeda: ' + (error.message ||
          'Erro desconhecido')));
      })
    );
  }

  getExchangeRate(from: string, to: string): Observable<number> {
    return this.convertCurrency(1, from, to).pipe(
      map((result) => result.exchangeRate)
    );
  }

  private readonly MAIN_CURRENCIES: Currency[] = [
    { code: 'USD', name: 'US Dollar', flag: 'https://flagcdn.com/w640/us.png' },
    { code: 'EUR', name: 'Euro', flag: 'https://flagcdn.com/w640/eu.png' },
    { code: 'BRL', name: 'Brazilian Real', flag: 'https://flagcdn.com/w640/br.png' },
    { code: 'GBP', name: 'British Pound', flag: 'https://flagcdn.com/w640/gb.png' },
    { code: 'JPY', name: 'Japanese Yen', flag: 'https://flagcdn.com/w640/jp.png' },
    { code: 'CAD', name: 'Canadian Dollar', flag: 'https://flagcdn.com/w640/ca.png' },
    { code: 'AUD', name: 'Australian Dollar', flag: 'https://flagcdn.com/w640/au.png' },
    { code: 'CHF', name: 'Swiss Franc', flag: 'https://flagcdn.com/w640/ch.png' },
    { code: 'CNY', name: 'Chinese Yuan', flag: 'https://flagcdn.com/w640/cn.png' },
    { code: 'INR', name: 'Indian Rupee', flag: 'https://flagcdn.com/w640/in.png' },
  ];

  // Verifica se as moedas estão disponíveis na API
  private checkCurrencyAvailability(): Observable<string[]> {
    return this.http.get<any>(this.API_URL_tokens).pipe(
      map((response) => response?.currencies || []),
      catchError(() => of([]))
    );
  }

  // Método simples para obter moedas suportadas
  getSupportedCurrencies(): Observable<Currency[]> {
    return this.checkCurrencyAvailability().pipe(
      map((availableCurrencies) => {
        // Filtra apenas moedas principais que estão disponíveis na API
        return this.MAIN_CURRENCIES.filter(currency =>
          availableCurrencies.includes(currency.code)
        );
      }),
      catchError(() => {
        // Em caso de erro, retorna todas as moedas principais
        console.warn('Usando moedas principais como fallback');
        return of(this.MAIN_CURRENCIES);
      })
    );
  }
}
