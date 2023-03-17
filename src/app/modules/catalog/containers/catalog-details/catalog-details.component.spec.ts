import { ComponentFixture } from '@angular/core/testing';

import { CatalogDetailsComponent } from './catalog-details.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { carMock1 } from '../../../../utils/testing/mocks/car.mock';
import { CarDataService } from '../../services/car-data.service';

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;
  let spectator: Spectator<CatalogDetailsComponent>;
  let activatedRoute: ActivatedRoute;

  const createComponent = createComponentFactory({
    component: CatalogDetailsComponent,
    imports: [
      NgbInputDatepicker,
      SharedModule,
      RouterModule,
      HttpClientTestingModule,
    ],
    providers: [
      CarDataService,
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              carId: carMock1.carId,
            },
          },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
    activatedRoute = spectator.inject(ActivatedRoute);
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });
});
