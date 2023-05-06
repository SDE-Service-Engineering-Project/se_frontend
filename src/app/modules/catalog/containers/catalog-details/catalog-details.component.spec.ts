import { ComponentFixture } from '@angular/core/testing';

import { CatalogDetailsComponent } from './catalog-details.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { carMock1 } from '../../../../utils/testing/mocks/car.mock';
import { CarDataService } from '../../services/car-data.service';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { of, throwError } from 'rxjs';
import { BookingDataService } from '../../../../services/booking/booking-data.service';
import { mockBooking } from '../../../../utils/testing/mocks/booking.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyService } from '../../../../services/currency/currency.service';

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;
  let spectator: Spectator<CatalogDetailsComponent>;
  let date: NgbDate;
  let toastService: ToastService;
  let carDataService: CarDataService;
  let bookingService: BookingDataService;
  let currencyService: CurrencyService;
  let router: Router;

  const createComponent = createComponentFactory({
    component: CatalogDetailsComponent,
    declarations: [DatePickerComponent],
    imports: [
      NgbInputDatepicker,
      SharedModule,
      RouterModule,
      HttpClientTestingModule,
      RouterTestingModule.withRoutes([
        {
          path: 'bookings',
          component: RoutedTestComponent,
        },
      ]),
    ],
    providers: [
      CarDataService,
      ToastService,
      BookingDataService,
      CurrencyService,
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              carId: carMock1.carId,
            },
          },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
    carDataService = spectator.inject(CarDataService);
    currencyService = spectator.inject(CurrencyService);
  });

  beforeEach(() => {
    date = new NgbDate(2021, 1, 1);
    jest.spyOn(carDataService, 'fetchCarById').mockReturnValue(of(carMock1));
  });

  it('should render the component', () => {
    component.setCarById();
    spectator.detectChanges();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should get the carId', () => {
    expect(component.getCarId()).toEqual(carMock1.carId);
  });

  it('should set the car', () => {
    component.setCarById();
    expect(component.car).toEqual(carMock1);
  });

  it('should set the start date', () => {
    getDatePicker().startDate.emit(new NgbDate(2021, 1, 1));
    expect(component.startDate).toEqual(date);
  });

  it('should set the end date', () => {
    getDatePicker().endDate.emit(new NgbDate(2021, 1, 1));
    expect(component.endDate).toEqual(date);
  });

  it('should return 0 if the start date or the end date are not set', () => {
    component.startDate = null;
    component.endDate = null;
    expect(component.getTotalPrice()).toEqual(0);
  });

  it('should return the total price in USD if the currency is set to original', () => {
    component.startDate = new NgbDate(2021, 1, 1);
    component.endDate = new NgbDate(2021, 1, 2);
    component.setCarById();
    spectator.detectChanges();
    expect(component.getTotalPrice(true)).toEqual(200);
  });

  it('should return the total price ', () => {
    component.startDate = new NgbDate(2021, 1, 1);
    component.endDate = new NgbDate(2021, 1, 2);
    component.setCarById();
    component.price = 50;
    spectator.detectChanges();
    expect(component.getTotalPrice(false)).toEqual(100);
  });

  it('should set the currency', () => {
    const oldCurrencySpy = jest.spyOn(currencyService, 'setOldCurrency');
    const currentCurrencySpy = jest.spyOn(
      currencyService,
      'setCurrentCurrency'
    );
    component.setCurrency('EUR');
    expect(oldCurrencySpy).toHaveBeenCalledWith('USD');
    expect(currentCurrencySpy).toHaveBeenCalledWith('EUR');
  });

  it('should set the price according to the currency', () => {
    const currencySpy = jest.spyOn(currencyService, 'convertCurrency');
    component.price = 100;
    component.setCurrency('EUR');
    expect(currencySpy).toHaveBeenCalledWith(100, 'USD', 'EUR');
  });

  it('should check if the dates are valid', () => {
    component.startDate = new NgbDate(2021, 1, 1);
    component.endDate = new NgbDate(2021, 1, 2);
    expect(component.checkIfDatesAreValid()).toBeTruthy();
    component.startDate = null;
    component.endDate = null;
    expect(component.checkIfDatesAreValid()).toBeFalsy();
  });

  it('should convert NgbDate to Date', () => {
    const date = new Date(Date.UTC(2021, 0, 1));
    expect(
      component.createStartDateFromNgbDate(new NgbDate(2021, 1, 1))
    ).toEqual(date);
  });

  it('should calculate the difference between two dates', () => {
    const date1 = new NgbDate(2021, 1, 1);
    const date2 = new NgbDate(2021, 1, 2);
    expect(component.calcDuration(date1, date2)).toEqual(1);
  });

  describe('bookCar', () => {
    let toastSpy: jest.SpyInstance;
    let navigateSpy: jest.SpyInstance;

    beforeEach(() => {
      toastService = spectator.inject(ToastService);
      bookingService = spectator.inject(BookingDataService);
      router = spectator.inject(Router);
    });

    it('should show a error toast if the dates are not valid', () => {
      toastSpy = jest.spyOn(toastService, 'showDefaultErrorToast');
      component.startDate = null;
      getBookingBtn().click();
      expect(toastSpy).toHaveBeenCalledWith(
        'Please select a valid time range!'
      );
    });

    it('should check if the dates are valid', () => {
      component.startDate = null;
      expect(component.checkIfDatesAreValid()).toEqual(false);
      spectator.detectChanges();
      expect(getBookingBtn().disabled).toEqual(true);
    });

    it('should book a car', () => {
      toastSpy = jest.spyOn(toastService, 'showDefaultSuccessToast');
      navigateSpy = jest.spyOn(router, 'navigate');
      jest.spyOn(component, 'buildBooking').mockReturnValue(mockBooking);
      jest
        .spyOn(bookingService, 'createBooking')
        .mockReturnValue(of(mockBooking));
      component.startDate = new NgbDate(2021, 1, 1);
      component.endDate = new NgbDate(2021, 1, 2);
      getBookingBtn().click();
      spectator.detectChanges();
      expect(component.buildBooking).toHaveBeenCalled();
      expect(toastSpy).toHaveBeenCalledWith('Car booked successfully!');
      expect(navigateSpy).toHaveBeenCalledWith(['/bookings']);
    });

    it('should show a error toast if the booking fails', () => {
      toastSpy = jest.spyOn(toastService, 'showDefaultErrorToast');
      jest.spyOn(component, 'buildBooking').mockReturnValue(mockBooking);
      jest
        .spyOn(bookingService, 'createBooking')
        .mockReturnValue(
          throwError({ error: { message: 'error' } } as HttpErrorResponse)
        );
      component.startDate = new NgbDate(2021, 1, 1);
      component.endDate = new NgbDate(2021, 1, 2);
      getBookingBtn().click();
      spectator.detectChanges();
      expect(component.buildBooking).toHaveBeenCalled();
      expect(toastSpy).toHaveBeenCalledWith('error');
    });
  });

  function getDatePicker(): DatePickerComponent {
    return spectator.query(DatePickerComponent) as DatePickerComponent;
  }

  function getBookingBtn(): HTMLButtonElement {
    return spectator.query(byTestId('book-car-btn')) as HTMLButtonElement;
  }
});
