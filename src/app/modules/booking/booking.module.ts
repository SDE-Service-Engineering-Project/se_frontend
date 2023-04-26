import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookingComponent } from './containers/booking/booking.component';
import { BookingCardModule } from './components/booking-card/booking-card.module';
import { BookingRoutingModule } from './config/booking.routing';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BookingComponent, ModalComponent],
  imports: [
    BookingCardModule,
    AsyncPipe,
    CommonModule,
    BookingRoutingModule,
    NgbModalModule,
  ],
})
export class BookingModule {}
