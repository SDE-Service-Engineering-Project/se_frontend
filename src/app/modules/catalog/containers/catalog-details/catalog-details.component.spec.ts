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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { carMock1 } from '../../../../utils/testing/mocks/car.mock';
import { CarDataService } from '../../services/car-data.service';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { of } from 'rxjs';

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;
  let spectator: Spectator<CatalogDetailsComponent>;
  let date: NgbDate;
  let toastService: ToastService;
  let carDataService: CarDataService;

  const createComponent = createComponentFactory({
    component: CatalogDetailsComponent,
    declarations: [DatePickerComponent],
    imports: [
      NgbInputDatepicker,
      SharedModule,
      RouterModule,
      HttpClientTestingModule,
    ],
    providers: [
      CarDataService,
      ToastService,
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

  it('should return the total price', () => {
    component.startDate = new NgbDate(2021, 1, 1);
    component.endDate = new NgbDate(2021, 1, 2);
    component.setCarById();
    spectator.detectChanges();
    expect(component.getTotalPrice()).toEqual(200);
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
    expect(component.createDateFromNgbDate(new NgbDate(2021, 1, 1))).toEqual(
      date
    );
  });

  it('should calculate the difference between two dates', () => {
    const date1 = new NgbDate(2021, 1, 1);
    const date2 = new NgbDate(2021, 1, 2);
    expect(component.calcDaysDiff(date1, date2)).toEqual(1);
  });

  describe('reserveCar', () => {
    let toastSpy: jest.SpyInstance;

    beforeEach(() => {
      toastService = spectator.inject(ToastService);
    });

    it('should show a error toast if the dates are not valid', () => {
      toastSpy = jest.spyOn(toastService, 'showDefaultErrorToast');
      component.startDate = null;
      getReserveBtn().click();
      expect(toastSpy).toHaveBeenCalledWith('Ups something went wrong!');
      expect(component.reservation).toEqual({});
    });

    //TODO: add expectation for backend call
    it('should set the reservation properties', () => {
      component.startDate = new NgbDate(2021, 1, 1);
      component.endDate = new NgbDate(2021, 1, 2);
      component.setCarById();
      getReserveBtn().click();
      expect(component.reservation).toEqual({
        carId: carMock1.carId,
        startDate: component.startDate,
        endDate: component.endDate,
        totalPrice: 200,
      });
    });
  });

  function getDatePicker(): DatePickerComponent {
    return spectator.query(DatePickerComponent) as DatePickerComponent;
  }

  function getReserveBtn(): HTMLButtonElement {
    return spectator.query(byTestId('reserve-btn')) as HTMLButtonElement;
  }
});
