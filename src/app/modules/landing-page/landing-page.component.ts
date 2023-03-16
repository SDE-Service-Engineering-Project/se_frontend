import { Component } from '@angular/core';
import { carsMock } from '../../utils/testing/mocks/car.mock';
import { Car } from '../../models/car';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
})
export class LandingPageComponent {
  cars: Car[] = carsMock;

  rentCar(car: Car) {
    console.log(car);
  }
}
