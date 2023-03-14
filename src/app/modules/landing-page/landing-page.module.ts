import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './config/landing-page.routing';
import { LandingPageComponent } from './landing-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [LandingPageRoutingModule, CommonModule],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
