import { Component } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.sass'],
})
export class CatalogDetailsComponent {
  getStartDate(date: NgbDate): void {
    console.log(date);
  }
  getEndDate(date: NgbDate): void {
    console.log(date);
  }
}
