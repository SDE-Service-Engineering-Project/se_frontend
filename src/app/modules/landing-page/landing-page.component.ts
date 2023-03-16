import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {

  jsonCars = "";

  constructor(private http: HttpClient) {
  }

  testBackend() {
    this.jsonCars = "";
    this.http.get<[]>('http://localhost:8080/api/v1/cars').subscribe(value => this.jsonCars = JSON.stringify(value));
  }
}
