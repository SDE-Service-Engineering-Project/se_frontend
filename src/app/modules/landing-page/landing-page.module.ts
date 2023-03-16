import {NgModule} from '@angular/core';
import {LandingPageRoutingModule} from './config/landing-page.routing';
import {LandingPageComponent} from './landing-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [LandingPageRoutingModule, CommonModule, SharedModule],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
