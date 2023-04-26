import { ComponentFixture } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/http/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { of, throwError } from 'rxjs';
import { mockAuthResponse } from '../../utils/testing/mocks/authResponse.mock';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spectator: Spectator<LoginComponent>;
  let toastService: ToastService;
  let authService: AuthService;
  let storageService: StorageService;
  let router: Router;
  let toastSpy: jest.SpyInstance;
  let authSpy: jest.SpyInstance;
  let storageSpy: jest.SpyInstance;
  let navigateSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    detectChanges: true,
    component: LoginComponent,
    imports: [
      ReactiveFormsModule,
      HttpClientModule,
      HttpClientTestingModule,
      RouterTestingModule.withRoutes([
        {
          path: 'home',
          component: RoutedTestComponent,
        },
      ]),
    ],
    providers: [AuthService, StorageService, ToastService],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
    toastService = spectator.inject(ToastService);
    router = spectator.inject(Router);
    authService = spectator.inject(AuthService);
    storageService = spectator.inject(StorageService);
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should display login button', () => {
    expect(getLoginButton()).toBeDefined();
  });

  it('should enable login button when username and password is set', () => {
    expect(getLoginButton().disabled).toBeTruthy();
    component.loginForm.get('username')?.setValue('username');
    component.loginForm.get('password')?.setValue('password');

    fixture.detectChanges();

    expect(getLoginButton().disabled).toBeFalsy();
  });

  it('should not enable login button when only username is set', () => {
    expect(getLoginButton().disabled).toBeTruthy();
    component.loginForm.get('username')?.setValue('username');

    fixture.detectChanges();

    expect(getLoginButton().disabled).toBeTruthy();
  });

  describe('form is invalid', () => {
    beforeEach(() => {
      component.loginForm.get('username')?.setValue('');
      component.loginForm.get('password')?.setValue('');
      fixture.detectChanges();
    });

    it('should return invalid login form if username is empty', () => {
      expect(component.loginForm.get('username')?.invalid).toBeTruthy();
      expect(getUserNameValidationMessage()).toBeDefined();
    });

    it('should return invalid login form if password is not set', () => {
      expect(component.loginForm.get('password')?.invalid).toBeTruthy();
      expect(getUserNameValidationMessage()).toBeDefined();
    });

    it('should not call login method when login button is clicked', () => {
      const loginSpy = jest.spyOn(component, 'submitLogin');
      getLoginButton().click();
      expect(loginSpy).not.toHaveBeenCalled();
    });
  });

  describe('form is valid', () => {
    beforeEach(() => {
      component.loginForm.get('username')?.setValue('username');
      component.loginForm.get('password')?.setValue('password');
      fixture.detectChanges();
    });

    it('should return valid login form if username is set', () => {
      expect(component.loginForm.get('username')?.valid).toBeTruthy();
      expect(getUserNameValidationMessage()).toBeNull();
    });

    it('should return valid login form if password is set', () => {
      expect(component.loginForm.get('password')?.valid).toBeTruthy();
      expect(getUserNameValidationMessage()).toBeNull();
    });

    it('should call login method when login button is clicked', () => {
      const loginSpy = jest.spyOn(component, 'submitLogin');
      getLoginButton().click();
      expect(loginSpy).toHaveBeenCalled();
    });

    it('should call the remove all method from the toast service in submit login', () => {
      toastSpy = jest.spyOn(toastService, 'removeAll');
      authSpy = jest.spyOn(authService, 'login');
      getLoginButton().click();
      expect(toastSpy).toHaveBeenCalled();
      expect(authSpy).toHaveBeenCalled();
    });

    it('should save the token in the storage service', () => {
      storageSpy = jest.spyOn(storageService, 'saveToken');
      jest.spyOn(authService, 'login').mockReturnValue(of(mockAuthResponse));
      getLoginButton().click();
      expect(storageSpy).toHaveBeenCalledWith(mockAuthResponse);
    });

    it('should navigate to the home page and show a success toast', () => {
      toastSpy = jest.spyOn(toastService, 'showDefaultSuccessToast');
      navigateSpy = jest.spyOn(router, 'navigate');
      jest.spyOn(authService, 'login').mockReturnValue(of(mockAuthResponse));
      getLoginButton().click();
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
      expect(toastSpy).toHaveBeenCalledWith('Login successfully');
    });

    it('should show a toast with the error message', () => {
      toastSpy = jest.spyOn(toastService, 'showDefaultErrorToast');
      jest.spyOn(authService, 'login').mockReturnValue(
        throwError(() => {
          return {
            error: {
              message: 'error',
            },
          };
        })
      );
      getLoginButton().click();
      expect(component.loginForm.get('password')?.value).toBe('');
      expect(toastSpy).toHaveBeenCalledWith('error');
    });
  });

  function getLoginButton(): HTMLButtonElement {
    return spectator.query(byTestId('login-btn')) as HTMLButtonElement;
  }

  function getUserNameValidationMessage(): HTMLDivElement {
    return spectator.query(byTestId('err-username')) as HTMLDivElement;
  }
});
