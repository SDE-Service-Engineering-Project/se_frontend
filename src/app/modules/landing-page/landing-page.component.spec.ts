import { ComponentFixture } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { carsMock } from '../../utils/testing/mocks/car.mock';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarCardModule } from './components/car-card/car-card.module';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let spectator: Spectator<LandingPageComponent>;

  const createComponent = createComponentFactory({
    component: LandingPageComponent,
    imports: [CarCardModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  beforeEach(() => {
    component.cars = carsMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
