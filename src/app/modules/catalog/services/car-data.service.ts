import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { carsMock } from '../../../utils/testing/mocks/car.mock';
import { Car } from '../../../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarDataService {
  fetchCars(): Observable<Car[]> {
    return of(carsMock);
  }
}
