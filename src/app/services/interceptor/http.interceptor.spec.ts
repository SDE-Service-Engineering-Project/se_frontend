import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { httpInterceptor, HttpInterceptor } from './http.interceptor';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastService } from '../toast/toast.service';
import { AUTH_API, AuthService } from '../http/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { mockAuthResponse } from '../../utils/testing/mocks/authResponse.mock';

describe('HttpInterceptor', () => {
  let spectator: SpectatorService<HttpInterceptor>;
  let httpClient: HttpClient;
  let router: Router;
  let storageService: StorageService;
  let toastService: ToastService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: HttpInterceptor,
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [StorageService, ToastService, AuthService, httpInterceptor],
  });

  beforeEach(() => {
    spectator = createService();
    router = spectator.inject(Router);
    storageService = spectator.inject(StorageService);
    toastService = spectator.inject(ToastService);
    authService = spectator.inject(AuthService);
    httpClient = spectator.inject<HttpClient>(HttpClient);
    httpTestingController = spectator.inject<HttpTestingController>(
      HttpTestingController
    );
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor: HttpInterceptor = TestBed.inject(HttpInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add content type to request', () => {
    httpClient.get('anyUrl').subscribe();
    let testRequest = httpTestingController.expectOne('anyUrl');
    testRequest.flush(null);
    expect(testRequest.request.headers.get('Content-Type')).toEqual(
      'application/json'
    );
  });

  it('should add access token to request if present', () => {
    jest.spyOn(storageService, 'getItem').mockReturnValue('token');
    httpClient.get('anyUrl').subscribe();
    let testRequest = httpTestingController.expectOne('anyUrl');
    testRequest.flush(null);

    expect(testRequest.request.headers.get('Authorization')).toEqual(
      'Bearer token'
    );
  });

  it('should refresh token if initial request responded with 401', () => {
    jest.spyOn(storageService, 'getItem').mockReturnValue('token');

    httpClient.get('anyUrl').subscribe();
    let testRequest = httpTestingController.expectOne('anyUrl');
    testRequest.flush(null, { status: 401, statusText: '401' });

    let refresh = httpTestingController.expectOne(`${AUTH_API}refresh/token`);
    refresh.flush(mockAuthResponse);

    let requestWithNewToken = httpTestingController.expectOne('anyUrl');
    requestWithNewToken.flush(null, { status: 200, statusText: 'all good' });

    expect(testRequest.request.headers.get('Authorization')).toEqual(
      'Bearer token'
    );

    expect(requestWithNewToken.request.headers.get('Authorization')).toEqual(
      'Bearer newAuth'
    );
  });
});
