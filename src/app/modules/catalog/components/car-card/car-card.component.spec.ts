import { ComponentFixture } from '@angular/core/testing';

import { CarCardComponent } from './car-card.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { carsMock } from '../../../../utils/testing/mocks/car.mock';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;
  let spectator: Spectator<CarCardComponent>;
  let emitSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: CarCardComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('should emit the car when select car is called', () => {
    emitSpy = jest.spyOn(component.carSelected, 'emit');
    component.car = carsMock[0];
    component.selectCar();
    expect(emitSpy).toHaveBeenCalledWith(carsMock[0]);
  });
});
