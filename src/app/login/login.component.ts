import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });


  ngOnInit(): void {

  }


  submitLogin() {
    if (this.loginForm.invalid) return;

    console.log("make login call user:" + this.loginForm.get('username')!!.value + " password: " + this.loginForm.get('password')!!.value)
  }
}
