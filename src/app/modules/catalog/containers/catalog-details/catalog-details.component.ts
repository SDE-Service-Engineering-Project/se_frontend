import { Component, OnDestroy } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../../models/car';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reservation } from '../../../../models/reservation';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.sass'],
})
export class CatalogDetailsComponent implements OnDestroy {
  car: Car = {} as Car;
  reservation: Reservation = {} as Reservation;
  reservationBtnDisabled = true;
  startDate: NgbDate | null;
  endDate: NgbDate | null;
  subscription: Subscription = new Subscription();

  constructor(
    private carService: CarDataService,
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private toastService: ToastService
  ) {
    this.startDate = calendar.getToday();
    this.endDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.subscription = this.carService
      .fetchCarById(this.route.snapshot.params['carId'])
      .subscribe((car) => {
        this.car = car;
      });
  }

  reserveCar(): void {
    if (!this.startDate || !this.endDate) {
      this.toastService.showDefaultErrorToast('Ups something went wrong!');
      return;
    }
    this.reservation.carId = this.car.carId;
    this.reservation.startDate = this.startDate;
    this.reservation.endDate = this.endDate;
    this.reservation.totalPrice = this.getTotalPrice();
    this.toastService.showDefaultSuccessToast('Car reserved!');
    console.log(this.reservation);
  }

  setStartDate(date: NgbDate): void {
    this.startDate = date;
    this.checkIfDatesAreValid();
  }

  setEndDate(date: NgbDate): void {
    this.endDate = date;
    this.checkIfDatesAreValid();
  }

  getTotalPrice(): number {
    if (!this.startDate || !this.endDate) {
      return 0;
    }
    return this.endDate.day - this.startDate.day;
  }

  checkIfDatesAreValid(): boolean {
    return this.startDate && this.endDate
      ? (this.reservationBtnDisabled = false)
      : (this.reservationBtnDisabled = true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
