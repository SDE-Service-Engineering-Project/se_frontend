import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/http/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      matchValidator('confirm_password', true),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      matchValidator('password'),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  submitRegister() {
    if (this.registerForm.invalid) return;

    this.toastService.removeAll();

    this.authService
      .register(
        this.registerForm.get('username')?.value!!,
        this.registerForm.get('firstname')?.value!!,
        this.registerForm.get('lastname')?.value!!,
        this.registerForm.get('password')?.value!!
      )
      .subscribe({
        next: (test) => {
          this.router
            .navigate([''])
            .then(() =>
              this.toastService.showDefaultSuccessToast(
                'Account successfully created'
              )
            );
        },
        error: (err: HttpErrorResponse) => {
          this.registerForm.get('password')?.setValue('');
          this.registerForm.get('confirm_password')?.setValue('');
          this.toastService.showDefaultErrorToast(err.error.message);
        },
      });
  }
}

export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}
