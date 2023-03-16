import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './config/landing-page.routing';
import { LandingPageComponent } from './landing-page.component';
import { CommonModule } from '@angular/common';
import { CarCardModule } from './components/car-card/car-card.module';

@NgModule({
  imports: [LandingPageRoutingModule, CommonModule, CarCardModule],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
