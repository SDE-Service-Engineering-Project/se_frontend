import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './config/login.routing';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [LoginRoutingModule, CommonModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
