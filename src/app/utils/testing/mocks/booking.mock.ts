import { Booking } from '../../../models/booking';
import { carMock1 } from './car.mock';

export const mockBooking: Booking = {
  daysToRent: 1,
  bookedFrom: '2020-02-20:01:04.753Z',
  bookedUntil: '2020-02-20T12:01:04.753Z',
  createdOn: '2020-02-14T12:01:04.753Z',
  bookingId: 1,
  bookingStatus: 'EXPIRED',
  carId: carMock1.carId,
  currency: 'USD',
  price: 12345,
  userId: 1,
};

export const mockBooking2: Booking = {
  bookedFrom: '2020-02-20:01:04.753Z',
  bookedUntil: '2020-02-30T12:01:04.753Z',
  createdOn: '2020-02-14T12:01:04.753Z',
  daysToRent: 10,
  bookingId: 1,
  bookingStatus: 'BOOKED',
  carId: carMock1.carId,
  currency: 'USD',
  price: 12345,
  userId: 1,
};

export const mockBookings: Booking[] = [
  mockBooking,
  mockBooking2,
  mockBooking,
  mockBooking,
  mockBooking2,
  mockBooking,
];
