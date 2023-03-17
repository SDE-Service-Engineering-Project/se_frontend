import { ComponentFixture } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './maps.component';
import { MockModule } from 'ng-mocks';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;
  let spectator: Spectator<MapsComponent>;

  const createComponent = createComponentFactory({
    component: MapsComponent,
    imports: [MockModule(GoogleMapsModule)],
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
