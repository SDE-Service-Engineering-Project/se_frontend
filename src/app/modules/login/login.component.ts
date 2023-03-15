import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/http/auth.service';
import {StorageService} from '../../services/storage.service';
import {ToastService} from '../../services/toast/toast.service';
import {Router} from "@angular/router";

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
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    this.toastService.removeAll();

    this.authService
      .login(this.loginForm.get('username')?.value!!, this.loginForm.get('password')?.value!!)
      .subscribe({
        next: (data) => {
          this.storageService.saveToken(data);
          this.router.navigate(['/home'])
            .then(() => this.toastService.showDefaultSuccessToast("Login successfully"));
        },
        error: (err) => {
          this.loginForm.get('password')?.setValue('');
          this.toastService.showDefaultErrorToast(err.error.message);
        },
      });
  }


}
