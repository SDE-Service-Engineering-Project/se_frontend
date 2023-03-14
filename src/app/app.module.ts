import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { httpInterceptor } from './services/interceptor/http.interceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouting,
    NgbModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [httpInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
