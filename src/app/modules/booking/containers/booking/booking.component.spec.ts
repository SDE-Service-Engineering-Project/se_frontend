import { ComponentFixture } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookingComponent } from './booking.component';
import { BookingCardModule } from '../../components/booking-card.module';
import { mockBookings } from '../../../../utils/testing/mocks/booking.mock';
import { BookingDataService } from '../../../../services/booking/booking-data.service';

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
    component.bookings = mockBookings;
    spectator.detectChanges();
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
});
