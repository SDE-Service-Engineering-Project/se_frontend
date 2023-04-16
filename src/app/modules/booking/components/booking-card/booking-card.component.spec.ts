import {
  ComponentFixture,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { BookingCardComponent } from './booking-card.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import {
  mockBooking,
  mockBooking2,
  mockBooking3,
} from '../../../../utils/testing/mocks/booking.mock';
import { ToastService } from '../../../../services/toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;
  let spectator: Spectator<BookingCardComponent>;
  let toastService: ToastService;
  let modal: NgbModal;

  const createComponent = createComponentFactory({
    component: BookingCardComponent,
    declarations: [ModalComponent],
    providers: [ToastService, NgbModal],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
    toastService = spectator.inject(ToastService);
    modal = spectator.inject(NgbModal);
  });

  it('should render the component with an expired booking', () => {
    component.booking = mockBooking;
    spectator.detectChanges();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot(
      'expired booking'
    );
  });

  it('should render the component with an active booking', () => {
    component.booking = mockBooking2;
    spectator.detectChanges();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot(
      'active booking'
    );
  });

  it('should render the component with an pending booking', () => {
    component.booking = mockBooking3;
    spectator.detectChanges();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot(
      'pending booking'
    );
  });

  it('should return correct amount of days ', () => {
    component.booking = mockBooking;
    spectator.detectChanges();
    expect(component.booking.daysToRent).toEqual(1);
  });
  it('should return zero if booking not defined', () => {
    expect(component.getTimeDuration()).toEqual(0);
  });

  it('should open the modal', () => {
    const modalSpy: jest.SpyInstance = jest.spyOn(modal, 'open');

    getCancelBtn().click();
    spectator.detectChanges();
    expect(modalSpy).toHaveBeenCalledWith(ModalComponent);
    expect(modal.hasOpenModals()).toEqual(true);
  });

  it('should emit the booking on confirmation', fakeAsync(() => {
    const emitSpy: jest.SpyInstance = jest.spyOn(
      component.bookingCanceled,
      'emit'
    );
    component.booking = mockBooking3;
    getCancelBtn().click();
    component.modalRef.close('confirmed');
    tick();
    expect(emitSpy).toHaveBeenCalledWith(mockBooking3);
  }));

  it('should show an error toast if the modal was canceled', fakeAsync(() => {
    const toastSpy: jest.SpyInstance = jest.spyOn(
      toastService,
      'showDefaultErrorToast'
    );
    getCancelBtn().click();
    component.modalRef.dismiss('cancel');
    tick();
    expect(toastSpy).toHaveBeenCalledWith('Your Booking was not canceled');
  }));

  function getCancelBtn(): HTMLButtonElement {
    return spectator.query(byTestId('cancel-booking-btn')) as HTMLButtonElement;
  }
});
