import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../../models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subscription, tap } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { Booking } from '../../../../models/booking';
import { BookingDataService } from '../../../../services/booking/booking-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.sass'],
})
export class CatalogDetailsComponent implements OnInit, OnDestroy {
  car: Car = {} as Car;
  reservationBtnDisabled = true;
  startDate: NgbDate | null;
  endDate: NgbDate | null;
  subscriptions: Subscription[] = [];

  constructor(
    private carService: CarDataService,
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private toastService: ToastService,
    private bookingService: BookingDataService,
    private router: Router
  ) {
    this.startDate = calendar.getToday();
    this.endDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.setCarById();
  }

  setCarById(): void {
    this.subscriptions.push(
      this.carService.fetchCarById(this.getCarId()).subscribe((car) => {
        this.car = car;
      })
    );
  }

  getCarId(): number {
    return this.route.snapshot.params['carId'];
  }

  bookCar(): void {
    if (!this.startDate || !this.endDate) {
      this.toastService.showDefaultErrorToast('Ups something went wrong!');
      return;
    }
    const booking = this.buildBooking();
    this.subscriptions.push(
      this.bookingService
        .createBooking(booking)
        .pipe(
          tap(() => {
            this.toastService.showDefaultSuccessToast(
              'Car booked successfully!'
            );
            this.router.navigate(['/bookings']);
          }),
          catchError((err: HttpErrorResponse) => {
            this.toastService.showDefaultErrorToast(err.error.message);
            return of(err);
          })
        )
        .subscribe()
    );
  }

  buildBooking(): Booking {
    return {
      carId: this.getCarId(),
      bookedFrom: this.convertNgbDateToDateString(this.startDate!),
      bookedUntil: this.convertNgbDateToDateString(this.endDate!),
      createdOn: new Date().toISOString(),
      currency: 'USD',
      price: this.getTotalPrice(),
      daysToRent: this.calcDuration(this.startDate!, this.endDate!),
    };
  }

  setStartDate(date: NgbDate): void {
    this.startDate = date;
  }

  setEndDate(date: NgbDate): void {
    this.endDate = date;
  }

  convertNgbDateToDateString(date: NgbDate): string {
    return new Date(date.year, date.month - 1, date.day).toISOString();
  }

  getTotalPrice(): number {
    if (!this.startDate || !this.endDate) {
      return 0;
    }
    return (
      (this.calcDuration(this.startDate, this.endDate) + 1) * this.car.price
    );
  }

  checkIfDatesAreValid(): boolean {
    return !!this.startDate && !!this.endDate;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  createDateFromNgbDate(ngbDate: NgbDate): Date {
    return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
  }

  calcDuration(startDate: NgbDate, endDate: NgbDate): number {
    const fromDate: Date = this.createDateFromNgbDate(startDate);
    const toDate: Date = this.createDateFromNgbDate(endDate);
    return Math.floor(
      Math.abs(<any>fromDate - <any>toDate) / (1000 * 60 * 60 * 24)
    );
  }
}
