import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '../storage.service';

describe('AuthGuard', () => {
  let spectator: SpectatorService<AuthGuard>;
  let router: Router;
  let storageService: StorageService;
  let navigateSpy: jest.SpyInstance;

  const createService = createServiceFactory({
    service: AuthGuard,
    imports: [RouterTestingModule],
    providers: [StorageService],
  });

  beforeEach(() => {
    spectator = createService();
    router = spectator.inject(Router);
    storageService = spectator.inject(StorageService);
  });

  describe('user not signed in', () => {
    beforeEach(() => {
      jest.spyOn(storageService, 'getItem').mockReturnValue(null);
      navigateSpy = jest.spyOn(router, 'navigate');
    });
    it('should redirect to login', () => {
      expect(spectator.service.canActivate()).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
  });

  describe('user signed in', () => {
    beforeEach(() => {
      jest.spyOn(storageService, 'getItem').mockReturnValue('access-token');
      navigateSpy = jest.spyOn(router, 'navigate');
    });
    it('should redirect to login', () => {
      expect(spectator.service.canActivate()).toBeTruthy();
      expect(navigateSpy).not.toHaveBeenCalledWith();
    });
  });
});
