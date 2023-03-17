import { Component } from '@angular/core';
import { CarDataService } from '../../services/car-data.service';
import { Observable } from 'rxjs';
import { Car } from '../../../../models/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
})
export class CatalogComponent {
  cars$: Observable<Car[]>;

  constructor(private carDataService: CarDataService, private router: Router) {
    this.cars$ = this.carDataService.fetchCars();
  }

  navigateToCarDetails(car: Car) {
    this.router.navigate(['catalog', car.id]);
  }
}
