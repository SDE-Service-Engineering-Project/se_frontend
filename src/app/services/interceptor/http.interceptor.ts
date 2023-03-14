import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../storage.service";


@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {
  }

  // TODO: add refresh token interceptor: https://www.bezkoder.com/angular-12-refresh-token/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }

    let accessToken = this.storageService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set("Authentication", "Bearer " + accessToken)
      })
    }
    return next.handle(request);
  }
}

export const httpInterceptor =
  {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true}
