import { ComponentFixture } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MapsComponent } from '../../shared/components/maps/maps.component';
import { MockModule } from 'ng-mocks';
import { GoogleMapsModule } from '@angular/google-maps';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let spectator: Spectator<LandingPageComponent>;

  const createComponent = createComponentFactory({
    component: LandingPageComponent,
    imports: [MockModule(GoogleMapsModule)],
    declarations: [MapsComponent],
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
