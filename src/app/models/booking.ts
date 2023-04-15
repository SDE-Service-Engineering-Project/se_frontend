import { Car } from './car';

export interface Booking {
  bookingId?: number;
  createdOn: string;
  bookedFrom: string;
  bookedUntil: string;
  bookingStatus?: string;
  price: number;
  currency: string;
  carId: string;
  userId?: number; // for now optional since we do not have a user id available
  daysToRent?: number;
  car: Car;
}
