import { Component } from '@angular/core';
import { CarDataService } from '../../services/car-data.service';
import { Observable } from 'rxjs';
import { Car } from '../../../../models/car';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
})
export class CatalogComponent {
  cars$: Observable<Car[]> | undefined;
  from: number | undefined;
  to: number | undefined;

  constructor(
    private carDataService: CarDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fetchCars();
  }

  navigateToCarDetails(car: Car) {
    this.router.navigate(['catalog', car.carId]);
  }

  private fetchCars() {
    this.route.queryParams.subscribe((params) => {
      this.from = Date.parse(params['from']);
      this.to = Date.parse(params['to']);
    });

    if (this.from && this.to) {
      this.cars$ = this.carDataService.fetchAvailableCars(this.from, this.to);
    } else {
      this.cars$ = this.carDataService.fetchCars();
    }
  }
}
