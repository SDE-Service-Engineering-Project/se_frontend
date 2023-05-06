import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../../../models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { Booking } from '../../../../models/booking';
import { BookingDataService } from '../../../../services/booking/booking-data.service';
import { CurrencyService } from '../../../../services/currency/currency.service';
import { CurrencyResponse } from '../../../../models/currency';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.sass'],
})
export class CatalogDetailsComponent implements OnInit, OnDestroy {
  car: Car = {} as Car;
  price: number = 0;
  currencies$: Observable<CurrencyResponse>;
  startDate: NgbDate | null;
  endDate: NgbDate | null;
  subscriptions: Subscription[] = [];

  constructor(
    private carService: CarDataService,
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private toastService: ToastService,
    private bookingService: BookingDataService,
    private router: Router,
    public currencyService: CurrencyService
  ) {
    this.startDate = calendar.getToday();
    this.endDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.currencies$ = this.currencyService.fetchCurrencies();
  }

  ngOnInit() {
    this.setCarById();
  }

  setCarById(): void {
    this.subscriptions.push(
      this.carService.fetchCarById(this.getCarId()).subscribe({
        next: (car: Car) => {
          this.price = car.price;
          this.car = car;
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showDefaultErrorToast(error.error.message);
          void this.router.navigate(['/not-found']);
        },
      })
    );
  }

  getCarId(): string {
    return this.route.snapshot.params['carId'];
  }

  setCurrency(newCurrency: string): void {
    this.currencyService.setOldCurrency(
      this.currencyService.getCurrentCurrency()
    );
    this.currencyService.setCurrentCurrency(newCurrency);
    this.setPrice(
      this.price,
      this.currencyService.getOldCurrency(),
      newCurrency
    );
  }

  setPrice(price: number, oldCurrency: string, newCurrency: string): void {
    this.currencyService
      .convertCurrency(price, oldCurrency, newCurrency)
      .pipe(tap((curr) => (this.price = curr.amount)))
      .subscribe();
  }

  getTotalPrice(originalCurrency?: boolean): number {
    if (!this.startDate || !this.endDate) {
      return 0;
    }
    return originalCurrency
      ? (this.calcDuration(this.startDate, this.endDate) + 1) * this.car.price
      : (this.calcDuration(this.startDate, this.endDate) + 1) * this.price;
  }

  bookCar(): void {
    if (!this.startDate || !this.endDate) {
      this.toastService.showDefaultErrorToast(
        'Please select a valid time range!'
      );
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
            this.toastService.showDefaultErrorToast(err?.error.message);
            return of(err);
          })
        )
        .subscribe()
    );
  }

  buildBooking(): Booking {
    return {
      carId: this.getCarId(),
      bookedFrom: this.createStartDateFromNgbDate(
        this.startDate!
      ).toISOString(),
      bookedUntil: this.createEndDateFromNgbDate(this.endDate!).toISOString(),
      currency: this.currencyService.getCurrentCurrency(),
      price: this.getTotalPrice(true),
    };
  }

  setStartDate(date: NgbDate | null): void {
    this.startDate = date;
  }

  setEndDate(date: NgbDate | null): void {
    this.endDate = date;
  }

  checkIfDatesAreValid(): boolean {
    return !!this.startDate && !!this.endDate;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  createStartDateFromNgbDate(ngbDate: NgbDate): Date {
    return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
  }

  createEndDateFromNgbDate(ngbDate: NgbDate): Date {
    return new Date(
      Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day, 23, 59, 59)
    );
  }

  calcDuration(startDate: NgbDate, endDate: NgbDate): number {
    const fromDate: Date = this.createStartDateFromNgbDate(startDate);
    const toDate: Date = this.createEndDateFromNgbDate(endDate);
    return Math.floor(
      Math.abs(<any>fromDate - <any>toDate) / (1000 * 60 * 60 * 24)
    );
  }
}
