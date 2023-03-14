import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/http/auth.service';
import { StorageService } from '../../services/storage.service';

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
    private storageService: StorageService
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
          // TODO: redirect to home page
        },
        error: (err) => {
          // TODO: add toast for errors
          console.log(err);
        },
      });
  }

  private getFormField(name: string): string {
    return this.loginForm.get(name)!!.value;
  }
}
