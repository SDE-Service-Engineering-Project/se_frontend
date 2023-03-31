import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '../storage/storage.service';
import { LoginGuard } from './login.guard';
import { LandingPageModule } from '../../modules/landing-page/landing-page.module';

describe('LoginGuard', () => {
  let spectator: SpectatorService<LoginGuard>;
  let router: Router;
  let storageService: StorageService;
  let navigateSpy: jest.SpyInstance;

  const createService = createServiceFactory({
    service: LoginGuard,
    imports: [
      RouterTestingModule.withRoutes([
        { path: 'home', component: LandingPageModule },
      ]),
    ],
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
      expect(spectator.service.canActivate()).toBeTruthy();
      expect(navigateSpy).not.toHaveBeenCalledWith();
    });
  });

  describe('user signed in', () => {
    beforeEach(() => {
      jest.spyOn(storageService, 'getItem').mockReturnValue('access-token');
      navigateSpy = jest.spyOn(router, 'navigate');
    });
    it('should redirect to home page', () => {
      expect(spectator.service.canActivate()).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });
  });
});
