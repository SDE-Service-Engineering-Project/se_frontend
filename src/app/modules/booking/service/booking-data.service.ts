import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../../models/booking';

export const BOOKING_API = 'http://localhost:8080/api/v1/bookings';

@Injectable({
  providedIn: 'root',
})
export class BookingDataService {
  constructor(private http: HttpClient) {}

  fetchBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(BOOKING_API);
  }
}
