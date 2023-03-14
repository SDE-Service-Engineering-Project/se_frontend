import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponse} from "../../model/AuthResponse";

const AUTH_API = 'http://localhost:8080/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(userName: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      AUTH_API + 'login',
      {userName, password}
    );
  }
}
