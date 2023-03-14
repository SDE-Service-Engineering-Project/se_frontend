import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../models/AuthResponse';
import { mockAuthResponse } from '../../utils/testing/mocks/authResponse.mock';

const AUTH_API = 'http://localhost:8080/auth';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: AuthService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject<HttpClient>(HttpClient);
    httpTestingController = spectator.inject<HttpTestingController>(
      HttpTestingController
    );
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should log send an auth request to the backend', () => {
    let authResponse: AuthResponse;
    spectator.service.login('testUser', 'testPwd').subscribe((response) => {
      authResponse = response;
    });
    const mockRequest = httpTestingController.expectOne(`${AUTH_API}/login`);
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(mockAuthResponse);
    expect(mockRequest.request.body).toMatchObject({
      password: "testPwd",
      userName: "testUser",
    });
    // @ts-ignore
    expect(authResponse).toEqual(mockAuthResponse);
  });
});
