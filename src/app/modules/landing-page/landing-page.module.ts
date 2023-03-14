import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './config/landing-page.routing';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  imports: [LandingPageRoutingModule],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
