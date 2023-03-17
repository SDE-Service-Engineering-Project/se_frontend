import { Component, Input } from '@angular/core';
import { Booking } from '../../../models/booking';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.sass'],
})
export class BookingCardComponent {
  @Input() booking: Booking = {} as Booking;
}
