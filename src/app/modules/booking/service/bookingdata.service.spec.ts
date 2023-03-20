import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BookingDataService } from './booking-data.service';
import { mockBookings } from '../../../utils/testing/mocks/booking.mock';

describe('BookingDataService', () => {
  let spectator: SpectatorService<BookingDataService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: BookingDataService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject(HttpClient);
    httpTestingController = spectator.inject(HttpTestingController);
  });

  it('should fetch all cars', () => {
    spectator.service.fetchBookings().subscribe((bookings) => {
      expect(bookings).toBe(mockBookings);
    });
  });
});
