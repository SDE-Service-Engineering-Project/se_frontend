import { ComponentFixture } from '@angular/core/testing';

import { CatalogDetailsComponent } from './catalog-details.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;
  let spectator: Spectator<CatalogDetailsComponent>;

  const createComponent = createComponentFactory({
    component: CatalogDetailsComponent,
    imports: [NgbInputDatepicker, SharedModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
