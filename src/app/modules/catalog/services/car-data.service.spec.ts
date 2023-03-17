import { CarDataService } from './car-data.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { carsMock } from '../../../utils/testing/mocks/car.mock';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('CarDataService', () => {
  let spectator: SpectatorService<CarDataService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: CarDataService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject(HttpClient);
    httpTestingController = spectator.inject(HttpTestingController);
  });

  it('should fetch all cars', () => {
    spectator.service.fetchCars().subscribe((cars) => {
      expect(cars).toBe(carsMock);
    });
  });
});
