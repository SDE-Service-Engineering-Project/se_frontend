import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './config/landing-page.routing';
import { LandingPageComponent } from './landing-page.component';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from './components/car-card/car-card.component';

@NgModule({
  imports: [LandingPageRoutingModule, CommonModule],
  declarations: [LandingPageComponent, CarCardComponent],
})
export class LandingPageModule {}
