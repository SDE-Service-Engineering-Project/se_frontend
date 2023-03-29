import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  StorageService,
  USER_NAME,
} from '../storage.service';
import { AuthService } from '../http/auth.service';
import { AuthResponse } from '../../models/AuthResponse';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    let accessToken = this.storageService.getItem(ACCESS_TOKEN);
    if (accessToken) {
      request = this.addTokenHeader(request, accessToken);
    }

    return next.handle(request).pipe(
      // @ts-ignore
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => new HttpErrorResponse(error));
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.storageService.getItem(REFRESH_TOKEN);
      const userName = this.storageService.getItem(USER_NAME);

      if (token && userName)
        return this.authService.refreshToken(token, userName).pipe(
          switchMap((token: AuthResponse) => {
            this.isRefreshing = false;

            this.storageService.saveToken(token);
            this.refreshTokenSubject.next(token);

            return next.handle(this.addTokenHeader(request, token.authToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.storageService.removeAll();

            // if we get a new token but the token does not work we return to login page
            this.router
              .navigate([''])
              .then(() =>
                this.toastService.showDefaultErrorToast(
                  'An authentication failure occurred, please login again.'
                )
              );

            return throwError(() => new Error(err));
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    if (!request.url.includes('/auth')) {
      return request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return request;
  }
}

export const httpInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpInterceptor,
  multi: true,
};
