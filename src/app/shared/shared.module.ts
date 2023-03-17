import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NgbCollapse,
  NgbInputDatepicker,
  NgbToast,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MapsComponent } from './components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    NotFoundComponent,
    MapsComponent,
    DatePickerComponent,
  ],
  exports: [
    HeaderComponent,
    ToastComponent,
    MapsComponent,
    DatePickerComponent,
  ],
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive,
    NgbCollapse,
    NgbToast,
    GoogleMapsModule,
    NgbInputDatepicker,
    FormsModule,
  ],
})
export class SharedModule {}
