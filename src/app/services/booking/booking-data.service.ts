import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Booking } from '../../models/booking';
import { environment } from '../../../environments/environment';

export const BOOKING_API = `${environment.baseUrl}bookings/`;

@Injectable({
  providedIn: 'root',
})
export class BookingDataService {
  constructor(private http: HttpClient) {}

  fetchBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(BOOKING_API);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(BOOKING_API, booking);
  }

  cancelBooking(booking: Booking): Observable<any> {
    return of(['Booking was canceled']);
  }
}
