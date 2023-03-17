export interface Booking {
  bookingId: number;
  createdOn: Date;
  bookedUntil: Date;
  bookingStatus: string;
  price: number;
  precision: number;
  currency: string;
  carId: string;
  userId: string;
}
