import { ComponentFixture } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { carsMock } from '../../utils/testing/mocks/car.mock';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let spectator: Spectator<LandingPageComponent>;

  const createComponent = createComponentFactory({
    component: LandingPageComponent,
    imports: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    fixture = spectator.fixture;
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
