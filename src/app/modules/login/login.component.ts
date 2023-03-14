import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/http/auth.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  submitLogin() {
    if (this.loginForm.invalid) return;

    this.authService
      .login(this.getFormField('username'), this.getFormField('password'))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.storageService.saveToken(data);
          this.showSuccessToast();
        },
        error: (err) => {
          this.showDangerToast(err.statusText);
          console.log(err);
        },
      });
  }

  private getFormField(name: string): string {
    return this.loginForm.get(name)!!.value;
  }

  private showDangerToast(errorMsg: string) {
    this.toastService.show('ERROR', {
      body: errorMsg,
      classname: 'bg-danger text-light',
      delay: 1000000,
    });
  }

  private showSuccessToast() {
    this.toastService.show('Login was a success!', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }
}
