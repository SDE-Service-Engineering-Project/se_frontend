import {Injectable} from '@angular/core';
import {AuthResponse} from "../model/AuthResponse";

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const USER_NAME = 'username';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  saveToken(value: AuthResponse) {
    window.sessionStorage.setItem(ACCESS_TOKEN, JSON.stringify(value.authToken))
    window.sessionStorage.setItem(REFRESH_TOKEN, JSON.stringify(value.refreshToken))
    window.sessionStorage.setItem(USER_NAME, JSON.stringify(value.userName))
  }

  public getAccessToken(): string | undefined {
    let item = window.sessionStorage.getItem(ACCESS_TOKEN);

    if (item) {
      return JSON.parse(item);
    }
    return undefined;
  }
}
