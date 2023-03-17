import { ComponentFixture } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CarCardModule } from '../../components/car-card/car-card.module';
import { CarDataService } from '../../services/car-data.service';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { carMock1, carsMock } from '../../../../utils/testing/mocks/car.mock';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  template: '',
})
class RoutedTestComponent {}

describe('CatalogComponent', () => {
  let spectator: Spectator<CatalogComponent>;
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let navigateSpy: jest.SpyInstance;
  let router: Router;

  const createComponent = createComponentFactory({
    component: CatalogComponent,
    imports: [
      CarCardModule,
      RouterTestingModule.withRoutes([
        { path: '', component: RoutedTestComponent },
      ]),
    ],
    providers: [CarDataService],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
    router = spectator.inject(Router);
  });

  beforeEach(() => {
    component.cars$ = of(carsMock);
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should navigate to the catalog details page when a car selection is emitted', () => {
    navigateSpy = jest.spyOn(router, 'navigate').mockImplementation();
    getCarCardComponent().carSelected.emit(carMock1);
    expect(navigateSpy).toHaveBeenCalledWith(['catalog', carMock1.id]);
  });

  function getCarCardComponent(): CarCardComponent {
    return spectator.query(CarCardComponent) as CarCardComponent;
  }
});
