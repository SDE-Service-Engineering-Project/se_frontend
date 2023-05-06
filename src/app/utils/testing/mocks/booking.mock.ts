import { Booking } from '../../../models/booking';
import { carMock1, carMock2 } from './car.mock';

export const mockBooking: Booking = {
  bookedFrom: '2020-02-20T01:04:00',
  bookedUntil: '2020-02-20T12:01:04',
  createdOn: '2020-02-14T12:01:04',
  bookingId: 1,
  bookingStatus: 'EXPIRED',
  carId: carMock1.carId,
  currency: 'USD',
  price: 12345,
  userId: 1,
  car: carMock2,
};

export const mockBooking2: Booking = {
  bookedFrom: '2020-02-20:01:04',
  bookedUntil: '2020-02-30T12:01:04',
  createdOn: '2020-02-14T12:01:04',
  bookingId: 1,
  bookingStatus: 'BOOKED',
  carId: carMock1.carId,
  currency: 'USD',
  price: 12345,
  userId: 1,
  car: carMock1,
};

export const mockBooking3: Booking = {
  bookedFrom: '2020-02-20:01:04',
  bookedUntil: '2020-02-30T12:01:04',
  createdOn: '2020-02-14T12:01:04',
  bookingId: 1,
  bookingStatus: 'PENDING',
  carId: carMock1.carId,
  currency: 'USD',
  price: 12345,
  userId: 1,
  car: carMock1,
};

export const mockBookings: Booking[] = [
  mockBooking,
  mockBooking2,
  mockBooking,
  mockBooking3,
  mockBooking,
  mockBooking2,
  mockBooking3,
  mockBooking,
];
