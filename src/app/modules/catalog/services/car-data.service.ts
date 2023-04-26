import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../../models/car';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const CAR_API = `${environment.baseUrl}cars/`;

@Injectable({
  providedIn: 'root',
})
export class CarDataService {
  constructor(private http: HttpClient) {}

  fetchCars(): Observable<Car[]> {
    return this.http.get<Car[]>(CAR_API);
  }

  fetchAvailableCars(from: number, to: number): Observable<Car[]> {
    return this.http.get<Car[]>(
      `${CAR_API}available?neededFrom=${from}&neededTo=${to}`
    );
  }

  fetchCarById(carId: string): Observable<Car> {
    return this.http.get<Car>(CAR_API + carId);
  }
}
