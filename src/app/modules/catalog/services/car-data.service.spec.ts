import { CarDataService } from './car-data.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { carsMock } from '../../../utils/testing/mocks/car.mock';

describe('CarDataService', () => {
  let spectator: SpectatorService<CarDataService>;
  const createService = createServiceFactory({
    service: CarDataService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should fetch all cars', () => {
    spectator.service.fetchCars().subscribe((cars) => {
      expect(cars).toBe(carsMock);
    });
  });
});
