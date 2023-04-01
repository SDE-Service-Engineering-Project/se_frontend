import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { StorageService } from './services/storage/storage.service';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storageService: StorageService;

  const createComponent = createComponentFactory({
    detectChanges: false,
    component: AppComponent,
    imports: [
      RouterTestingModule,
      MockComponent(HeaderComponent),
      MockComponent(ToastComponent),
    ],
    providers: [StorageService],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
    storageService = spectator.inject(StorageService);
  });

  it('should render the app', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it(`should display login page`, () => {
    expect(component.title).toEqual('CarRental');
  });

  describe('isLoggedIn', () => {
    it('should return false if no token', () => {
      expect(component.isLoggedIn()).toBeFalsy();
    });

    it('should return true if token', () => {
      jest.spyOn(storageService, 'getItem').mockReturnValue('access-token');
      expect(component.isLoggedIn()).toBeTruthy();
    });
  });
});
