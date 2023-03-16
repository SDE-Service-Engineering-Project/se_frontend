import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Car} from "../../../../models/car";

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.sass']
})
export class CarCardComponent {
  @Input() car: Car = {} as Car;
  @Output() carRented: EventEmitter<Car> = new EventEmitter<Car>()

  rentCar() {
    this.carRented.emit(this.car);
  }

}
