import { ComponentFixture } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookingComponent } from './booking.component';
import { BookingCardModule } from '../../components/booking-card/booking-card.module';
import {
  mockBooking2,
  mockBooking3,
  mockBookings,
} from '../../../../utils/testing/mocks/booking.mock';
import { BookingDataService } from '../../../../services/booking/booking-data.service';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookingComponent', () => {
  let spectator: Spectator<BookingComponent>;
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let httpTestingController: HttpTestingController;
  let toastService: ToastService;
  let toastSpy: jest.SpyInstance;
  let bookingDataService: BookingDataService;
  let bookingSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: BookingComponent,
    imports: [BookingCardModule, HttpClientTestingModule],
    providers: [BookingDataService, ToastService, BookingDataService],
  });

  beforeEach(() => {
    spectator = createComponent();
    httpTestingController = spectator.inject(HttpTestingController);
    component = spectator.component;
    fixture = spectator.fixture;

    toastService = spectator.inject(ToastService);
    bookingDataService = spectator.inject(BookingDataService);
  });

  beforeEach(() => {
    component.bookings = mockBookings;
    spectator.detectChanges();
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should set the bookings to the fetched bookings', () => {
    jest
      .spyOn(bookingDataService, 'fetchBookings')
      .mockReturnValue(of(mockBookings));
    spectator.detectChanges();
    expect(component.bookings).toEqual(mockBookings);
  });

  it('should filter the bookings according to their status', () => {
    component.bookings = mockBookings;
    expect(component.filterBookings('BOOKED')).toEqual([
      mockBooking2,
      mockBooking2,
    ]);
  });

  it('should cancel the booking', () => {
    bookingSpy = jest.spyOn(bookingDataService, 'cancelBooking');
    toastSpy = jest.spyOn(toastService, 'showDefaultSuccessToast');
    getBookingCardComponent().bookingCanceled.emit(mockBooking3);
    expect(bookingSpy).toHaveBeenCalledWith(mockBooking3);
    expect(toastSpy).toHaveBeenCalledWith(
      'Your Booking was successfully canceled'
    );
  });

  it('should display an error toast if the cancellation was not successfull', () => {
    bookingSpy = jest
      .spyOn(bookingDataService, 'cancelBooking')
      .mockReturnValue(
        throwError(() => new HttpErrorResponse({ error: 'error' }))
      );
    toastSpy = jest.spyOn(toastService, 'showDefaultErrorToast');
    getBookingCardComponent().bookingCanceled.emit(mockBooking3);
    expect(bookingSpy).toHaveBeenCalledWith(mockBooking3);
    expect(toastSpy).toHaveBeenCalledWith(
      new HttpErrorResponse({ error: 'error' })
    );
  });

  function getBookingCardComponent(): BookingCardComponent {
    return spectator.query(BookingCardComponent) as BookingCardComponent;
  }
});
