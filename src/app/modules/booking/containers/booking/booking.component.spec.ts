import { ComponentFixture } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookingComponent } from './booking.component';
import { BookingCardModule } from '../../components/booking-card.module';
import { mockBookings } from '../../../../utils/testing/mocks/booking.mock';
import { BookingDataService } from '../../service/booking-data.service';

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('BookingComponent', () => {
  let spectator: Spectator<BookingComponent>;
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let httpTestingController: HttpTestingController;

  const createComponent = createComponentFactory({
    component: BookingComponent,
    imports: [BookingCardModule, HttpClientTestingModule],
    providers: [BookingDataService],
  });

  beforeEach(() => {
    spectator = createComponent();
    httpTestingController = spectator.inject(HttpTestingController);
    component = spectator.component;
    fixture = spectator.fixture;
  });

  beforeEach(() => {
    component.bookings$ = of(mockBookings);
    spectator.detectChanges();
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
});
