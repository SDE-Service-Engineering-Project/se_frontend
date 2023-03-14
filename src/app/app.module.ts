import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { httpInterceptor } from './core/service/interceptor/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRouting, NgbModule],
  providers: [httpInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
