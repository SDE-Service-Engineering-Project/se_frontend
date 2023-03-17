import { ComponentFixture } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/http/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import spyOn = jest.spyOn;

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let spectator: Spectator<RegisterComponent>;
  let router: Router;
  let toastService: ToastService;
  let authService: AuthService;
  let navigateSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: RegisterComponent,
    imports: [
      HttpClientTestingModule,
      ReactiveFormsModule,
      RouterTestingModule.withRoutes([
        {
          path: '',
          component: RoutedTestComponent,
        },
      ]),
    ],
    providers: [AuthService, ToastService],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
    router = spectator.inject(Router);
    toastService = spectator.inject(ToastService);
    authService = spectator.inject(AuthService);
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  describe('form is not valid', () => {
    it('should not submit register', () => {
      const registerSpy = jest.spyOn(component, 'submitRegister');
      component.registerForm.get('username')?.setValue('');
      getRegisterButton().click();
      expect(registerSpy).not.toHaveBeenCalled();
      expect(component.registerForm.invalid).toBe(true);
    });
  });

  describe('form is valid', () => {
    let toastSpy: jest.SpyInstance;
    let authSpy: jest.SpyInstance;

    beforeEach(() => {
      component.registerForm.get('username')?.setValue('username');
      component.registerForm.get('firstname')?.setValue('firstname');
      component.registerForm.get('lastname')?.setValue('lastname');
      component.registerForm.get('password')?.setValue('password');
      component.registerForm.get('confirm_password')?.setValue('password');
      spectator.detectChanges();
    });

    it('should enable register button when all fields are correctly set', function () {
      expect(getRegisterButton().disabled).toBeFalsy();
    });

    it('should submit register', () => {
      const registerSpy = jest.spyOn(component, 'submitRegister');
      getRegisterButton().click();
      expect(registerSpy).toHaveBeenCalled();
    });

    it('should call the remove all method from the toast service', () => {
      toastSpy = spyOn(toastService, 'removeAll');
      authSpy = spyOn(authService, 'register');
      getRegisterButton().click();
      expect(toastSpy).toHaveBeenCalled();
      expect(authSpy).toHaveBeenCalled();
    });

    it('should navigate to the login page and show a success toast', () => {
      toastSpy = spyOn(toastService, 'showDefaultSuccessToast');
      navigateSpy = spyOn(router, 'navigate');
      jest.spyOn(authService, 'register').mockReturnValue(of(null));
      getRegisterButton().click();
      expect(navigateSpy).toHaveBeenCalledWith(['']);
      expect(toastSpy).toHaveBeenCalledWith('Account successfully created');
    });

    it('should show a toast with the error message', () => {
      toastSpy = spyOn(toastService, 'showDefaultErrorToast');
      jest.spyOn(authService, 'register').mockReturnValue(
        throwError(() => {
          return {
            error: {
              message: 'error',
            },
          };
        })
      );
      getRegisterButton().click();
      expect(component.registerForm.get('password')?.value).toBe('');
      expect(component.registerForm.get('confirm_password')?.value).toBe('');
      expect(toastSpy).toHaveBeenCalledWith('error');
    });
  });

  function getRegisterButton(): HTMLButtonElement {
    return spectator.query(byTestId('register-btn')) as HTMLButtonElement;
  }
});
