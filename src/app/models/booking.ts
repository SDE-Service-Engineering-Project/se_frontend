import { Car } from './car';

export interface Booking {
  bookingId?: number;
  createdOn?: string;
  bookedFrom: string;
  bookedUntil: string;
  bookingStatus?: string;
  price: number;
  priceSaved?: number;
  currency: string;
  currencySaved?: string;
  carId: string;
  userId?: number; // for now optional since we do not have a user id available
  car?: Car;
}
