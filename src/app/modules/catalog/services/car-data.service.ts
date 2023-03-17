import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../../models/car';
import { HttpClient } from '@angular/common/http';

export const CAR_API = 'http://localhost:8080/api/v1/cars/';

@Injectable({
  providedIn: 'root',
})
export class CarDataService {
  constructor(private http: HttpClient) {}

  fetchCars(): Observable<Car[]> {
    return this.http.get<Car[]>(CAR_API);
  }
}
