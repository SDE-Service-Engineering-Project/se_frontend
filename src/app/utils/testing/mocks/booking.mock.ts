import { Booking } from '../../../models/booking';

export const mockBooking: Booking = {
  bookedUntil: new Date('2020-02-20T12:01:04.753Z'),
  bookingId: 1,
  bookingStatus: 'EXPIRED',
  carId: '1',
  createdOn: new Date('2020-02-24T12:01:04.753Z'),
  currency: 'EUR',
  precision: 2,
  price: 12345,
  userId: '1',
};

export const mockBooking2: Booking = {
  bookedUntil: new Date(),
  bookingId: 1,
  bookingStatus: 'BOOKED',
  carId: '1',
  createdOn: new Date(),
  currency: 'EUR',
  precision: 2,
  price: 12345,
  userId: '1',
};

export const mockBookings: Booking[] = [
  mockBooking,
  mockBooking2,
  mockBooking,
  mockBooking,
  mockBooking2,
  mockBooking,
];
