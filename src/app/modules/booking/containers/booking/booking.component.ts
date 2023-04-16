import { Component } from '@angular/core';
import { Booking } from '../../../../models/booking';
import { BookingDataService } from '../../../../services/booking/booking-data.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass'],
})
export class BookingComponent {
  bookings: Booking[];

  constructor(
    private bookingDataService: BookingDataService,
    private toastService: ToastService
  ) {
    this.bookings = [];
    this.bookingDataService.fetchBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: () => {
        this.toastService.showDefaultErrorToast(
          'Bookings are not available right now.'
        );
      },
    });
  }

  public filterBookings(type: string): Booking[] {
    return this.bookings?.filter((x) => x.bookingStatus === type);
  }

  //TODO: adapt to real response!
  cancelBooking(booking: Booking) {
    this.bookingDataService.cancelBooking(booking).subscribe({
      next: (response) => {
        this.toastService.showDefaultSuccessToast(
          'Your Booking was successfully canceled'
        );
      },
      error: (err) => this.toastService.showDefaultErrorToast(err),
    });
  }
}
