import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class CatalogDetailsComponent implements OnInit, OnDestroy {
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
  }

  ngOnInit() {
    this.setCarById();
  }

  setCarById(): void {
    this.subscription = this.carService
      .fetchCarById(this.getCarId())
      .subscribe((car) => {
        this.car = car;
      });
  }

  getCarId(): number {
    return this.route.snapshot.params['carId'];
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
  }

  setStartDate(date: NgbDate): void {
    this.startDate = date;
  }

  setEndDate(date: NgbDate): void {
    this.endDate = date;
  }

  getTotalPrice(): number {
    if (!this.startDate || !this.endDate) {
      return 0;
    }
    return (
      (this.calcDaysDiff(this.startDate, this.endDate) + 1) * this.car.price
    );
  }

  checkIfDatesAreValid(): boolean {
    return !!this.startDate && !!this.endDate;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createDateFromNgbDate(ngbDate: NgbDate): Date {
    return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
  }

  calcDaysDiff(startDate: NgbDate, endDate: NgbDate): number {
    const fromDate: Date = this.createDateFromNgbDate(startDate);
    const toDate: Date = this.createDateFromNgbDate(endDate);
    return Math.floor(
      Math.abs(<any>fromDate - <any>toDate) / (1000 * 60 * 60 * 24)
    );
  }
}
