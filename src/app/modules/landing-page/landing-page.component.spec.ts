import { ComponentFixture } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { MapsComponent } from '../../shared/components/maps/maps.component';
import { MockModule } from 'ng-mocks';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let spectator: Spectator<LandingPageComponent>;
  let router: Router;
  let navigateSpy: jest.SpyInstance;
  let toastService: ToastService;
  let toastSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: LandingPageComponent,
    imports: [
      NgbInputDatepicker,
      MockModule(GoogleMapsModule),
      RouterTestingModule.withRoutes([
        {
          path: 'catalog',
          component: RoutedTestComponent,
        },
      ]),
    ],
    providers: [ToastService],
    declarations: [MapsComponent, DatePickerComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
    router = spectator.inject(Router);
    toastService = spectator.inject(ToastService);
    // toastSpy = spectator.inject(ToastService);
  });

  beforeEach(() => {
    spectator.component.startDate = NgbDate.from({
      day: 1,
      year: 2002,
      month: 3,
    });
    spectator.component.endDate = NgbDate.from({
      day: 5,
      year: 2002,
      month: 3,
    });
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route to catalog with queryParams', () => {
    navigateSpy = jest.spyOn(router, 'navigate');

    getSearchButton().click();
    spectator.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/catalog'], {
      queryParams: { from: '2002-3-1', to: '2002-3-5' },
    });
  });

  it('should not route to catalog when date range is invalid', () => {
    toastSpy = jest.spyOn(toastService, 'showDefaultErrorToast');

    spectator.component.endDate = null;
    getSearchButton().click();
    spectator.detectChanges();

    expect(toastSpy).toHaveBeenCalledWith('Please select a valid time range!');
  });

  it('should check if the dates are valid', () => {
    component.startDate = null;
    expect(component.checkIfDatesAreValid()).toEqual(false);
    spectator.detectChanges();
    expect(getSearchButton().disabled).toEqual(true);
  });

  function getSearchButton(): HTMLButtonElement {
    return spectator.query(byTestId('search-btn')) as HTMLButtonElement;
  }
});
