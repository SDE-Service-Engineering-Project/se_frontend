import { ComponentFixture } from '@angular/core/testing';

import { CarCardComponent } from './car-card.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { carsMock } from '../../../../utils/testing/mocks/car.mock';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;
  let spectator: Spectator<CarCardComponent>;

  const createComponent = createComponentFactory({
    component: CarCardComponent,
  });

  beforeEach(async () => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
});
