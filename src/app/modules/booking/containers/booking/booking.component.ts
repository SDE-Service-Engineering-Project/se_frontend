import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../../../models/booking';
import { BookingDataService } from '../../service/booking-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass'],
})
export class BookingComponent {
  bookings$: Observable<Booking[]>;

  constructor(private bookingDataService: BookingDataService) {
    this.bookings$ = this.bookingDataService.fetchBookings();
  }
}
