import { ComponentFixture } from '@angular/core/testing';
import { BookingCardComponent } from './booking-card.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { mockBooking } from '../../../utils/testing/mocks/booking.mock';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;
  let spectator: Spectator<BookingCardComponent>;

  const createComponent = createComponentFactory({
    component: BookingCardComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the component', () => {
    component.booking = mockBooking;
    spectator.detectChanges();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should return correct amount of days ', () => {
    component.booking = mockBooking;
    spectator.detectChanges();
    expect(component.getTimeDuration()).toEqual(4);
  });
  it('should return zero if booking not defined', () => {
    expect(component.getTimeDuration()).toEqual(0);
  });
});
