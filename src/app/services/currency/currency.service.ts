import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  CurrencyResponse,
  CurrencyConversionResponse,
} from '../../models/currency';

export const CURRENCY_API = `${environment.baseUrl}currency/`;

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private _oldCurrency: string = '';
  private _currentCurrency: string = 'USD';

  constructor(private http: HttpClient) {}

  setCurrentCurrency(currency: string): void {
    this._currentCurrency = currency;
  }

  getCurrentCurrency(): string {
    return this._currentCurrency;
  }

  setOldCurrency(currency: string): void {
    this._oldCurrency = currency;
  }

  getOldCurrency(): string {
    return this._oldCurrency;
  }
  fetchCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(CURRENCY_API);
  }

  convertCurrency(
    amount: number,
    from: string,
    to: string
  ): Observable<CurrencyConversionResponse> {
    return this.http.get<CurrencyConversionResponse>(
      `${CURRENCY_API}convert?amount=${amount}&fromCurrency=${from}&toCurrency=${to}`
    );
  }
}
