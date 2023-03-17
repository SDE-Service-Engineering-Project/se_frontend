import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapse, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MapsComponent } from './components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    NotFoundComponent,
    MapsComponent,
  ],
  exports: [HeaderComponent, ToastComponent, MapsComponent],
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive,
    NgbCollapse,
    NgbToast,
    GoogleMapsModule,
  ],
})
export class SharedModule {}
