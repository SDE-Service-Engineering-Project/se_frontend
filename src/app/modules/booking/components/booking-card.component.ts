import { Component, Input } from '@angular/core';
import { Booking } from '../../../models/booking';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.sass'],
})
export class BookingCardComponent {
  @Input() booking: Booking = {} as Booking;

  getTimeDuration(): number {
    if (this.booking.createdOn && this.booking.bookedUntil) {
      return (
        (this.booking.createdOn.getTime() -
          this.booking.bookedUntil.getTime()) /
        (1000 * 3600 * 24)
      );
    }
    return 0;
  }
}
