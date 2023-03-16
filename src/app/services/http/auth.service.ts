import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../../models/AuthResponse';

export const AUTH_API = 'http://localhost:8080/api/v1/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public login(userName: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API + 'login', {
      userName,
      password,
    });
  }

  public register(userName: string, firstName: string, lastName: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      userName,
      firstName,
      lastName,
      password,
    });
  }

  public refreshToken(refreshToken: string, userName: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API + 'refresh/token', {
      refreshToken,
      userName,
    });
  }
}
