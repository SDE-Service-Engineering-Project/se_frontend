import {TestBed} from '@angular/core/testing';
import {ACCESS_TOKEN, REFRESH_TOKEN, StorageService, USER_NAME,} from './storage.service';
import {AuthResponse} from '../models/AuthResponse';

const token: AuthResponse = {
  authToken: 'token',
  refreshToken: 'refreshtoken',
  expiresAt: new Date(123456),
  userName: 'username',
};
describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save auth response to session storage', function () {
    expect(sessionStorage.getItem(ACCESS_TOKEN)).toBeNull();
    expect(sessionStorage.getItem(REFRESH_TOKEN)).toBeNull();
    expect(sessionStorage.getItem(USER_NAME)).toBeNull();
    service.saveToken(token);
    expect(sessionStorage.getItem(ACCESS_TOKEN)).toEqual(
      JSON.stringify(token.authToken)
    );
    expect(sessionStorage.getItem(REFRESH_TOKEN)).toEqual(
      JSON.stringify(token.refreshToken)
    );
    expect(sessionStorage.getItem(USER_NAME)).toEqual(
      JSON.stringify(token.userName)
    );
  });

  it('should retrieve authentication when present', function () {
    expect(sessionStorage.getItem(ACCESS_TOKEN)).toBeNull();
    expect(sessionStorage.getItem(REFRESH_TOKEN)).toBeNull();
    expect(sessionStorage.getItem(USER_NAME)).toBeNull();
    service.saveToken(token);

    expect(service.getItem(ACCESS_TOKEN)).toEqual(token.authToken);
  });
});
