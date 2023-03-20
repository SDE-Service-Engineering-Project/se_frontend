import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookingComponent } from './containers/booking/booking.component';
import { BookingCardModule } from './components/booking-card.module';
import { BookingRoutingModule } from './config/booking.routing';

@NgModule({
  declarations: [BookingComponent],
  imports: [BookingCardModule, AsyncPipe, CommonModule, BookingRoutingModule],
})
export class BookingModule {}
