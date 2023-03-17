import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface Reservation {
  startDate: NgbDate | null;
  endDate: NgbDate | null;
  carId: number;
  totalPrice: number;
}
