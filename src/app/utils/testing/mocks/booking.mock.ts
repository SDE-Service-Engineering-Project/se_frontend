import { Booking } from '../../../models/booking';

export const mockBooking: Booking = {
  bookedUntil: new Date(),
  bookingId: 1,
  bookingStatus: 'EXPIRED',
  carId: '1',
  createdOn: new Date(),
  currency: 'EUR',
  precision: 2,
  price: 12345,
  userId: '1',
};

export const mockBookings: Booking[] = [mockBooking];
