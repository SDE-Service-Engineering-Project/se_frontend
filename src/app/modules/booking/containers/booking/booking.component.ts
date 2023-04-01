import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Booking } from '../../../../models/booking';
import { BookingDataService } from '../../../../services/booking/booking-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass'],
})
export class BookingComponent {
  bookings$: Observable<Booking[]>;
  currentBooking$: Observable<Booking[]>;
  expiredBookings$: Observable<Booking[]>;

  constructor(private bookingDataService: BookingDataService) {
    this.bookings$ = this.bookingDataService.fetchBookings();

    this.currentBooking$ = this.bookings$.pipe(
      map((bookings) => bookings.filter((x) => x.bookingStatus === 'BOOKED'))
    );

    this.expiredBookings$ = this.bookings$.pipe(
      map((bookings) => bookings.filter((x) => x.bookingStatus === 'EXPIRED'))
    );
  }
}
