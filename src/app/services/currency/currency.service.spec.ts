import { CurrencyService } from './currency.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  currenciesResponseMock,
  currencyConversionResponseMock,
} from '../../utils/testing/mocks/currenciesResponseMock';
import {
  CurrencyConversionResponse,
  CurrencyResponse,
} from '../../models/currency';
import { environment } from '../../../environments/environment';

export const CURRENCY_API = `${environment.baseUrl}currency/`;

describe('CurrencyService', () => {
  let spectator: SpectatorService<CurrencyService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: CurrencyService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject(HttpClient);
    httpTestingController = spectator.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch all currencies', () => {
    let currenciesResponse: CurrencyResponse;
    spectator.service.fetchCurrencies().subscribe((currencies) => {
      currenciesResponse = currencies;
    });
    const mockRequest = httpTestingController.expectOne(`${CURRENCY_API}`);
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(currenciesResponseMock);
    // @ts-ignore
    expect(currenciesResponse).toEqual(currenciesResponseMock);
  });

  it('should convert currency', () => {
    let currenciesConversionResponse: CurrencyConversionResponse;
    spectator.service
      .convertCurrency(1, 'USD', 'EUR')
      .subscribe((conversion) => {
        currenciesConversionResponse = conversion;
      });
    const mockRequest = httpTestingController.expectOne(
      `${CURRENCY_API}convert?amount=1&fromCurrency=USD&toCurrency=EUR`
    );
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(currencyConversionResponseMock);
    // @ts-ignore
    expect(currenciesConversionResponse).toEqual(
      currencyConversionResponseMock
    );
  });
});
