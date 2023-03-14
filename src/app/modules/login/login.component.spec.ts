import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/http/auth.service';
import { StorageService } from '../../services/storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spectator: Spectator<LoginComponent>;

  const createComponent = createComponentFactory({
    detectChanges: true,
    component: LoginComponent,
    imports: [ReactiveFormsModule, HttpClientModule],
    providers: [AuthService, StorageService],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login button', function () {
    const loginButton =
      fixture.debugElement.nativeElement.querySelector('#login-btn');
    expect(loginButton).toBeDefined();
  });

  it('should return valid login form is username is set', function () {
    component.loginForm.get('username')?.setValue('username');

    expect(component.loginForm.get('username')?.valid).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector('#err-username')
    ).toBeNull();
  });

  it('should return invalid login form if username is empty', function () {
    component.loginForm.get('username')?.setValue('');
    expect(component.loginForm.get('username')?.invalid).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector('#err-username')
    ).toBeDefined();
  });

  it('should return valid login form if password is set', function () {
    component.loginForm.get('password')?.setValue('myAwesomePassword');
    expect(component.loginForm.get('password')?.valid).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector('#err-password')
    ).toBeNull();
  });

  it('should return invalid login form if password is not set', function () {
    component.loginForm.get('password')?.setValue('');
    expect(component.loginForm.get('password')?.invalid).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector('#err-password')
    ).toBeDefined();
  });

  it('should enable login button when username and password is set', function () {
    expect(
      fixture.debugElement.nativeElement.querySelector('#login-btn').disabled
    ).toBeTruthy();
    component.loginForm.get('username')?.setValue('username');
    component.loginForm.get('password')?.setValue('password');

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('#login-btn').disabled
    ).toBeFalsy();
  });

  it('should not enable login button when only username is set', function () {
    expect(
      fixture.debugElement.nativeElement.querySelector('#login-btn').disabled
    ).toBeTruthy();
    component.loginForm.get('username')?.setValue('username');

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('#login-btn').disabled
    ).toBeTruthy();
  });
});
