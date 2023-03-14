import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './config/login.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [LoginRoutingModule, CommonModule, ReactiveFormsModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
