import { Component } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
})
export class LandingPageComponent {
  startDate: NgbDate | null;
  endDate: NgbDate | null;

  constructor(
    private calendar: NgbCalendar,
    private router: Router,
    private toastService: ToastService
  ) {
    this.startDate = calendar.getToday();
    this.endDate = calendar.getNext(calendar.getToday(), 'd', 7);
  }

  onSearch() {
    if (!this.startDate || !this.endDate) {
      this.toastService.showDefaultErrorToast(
        'Please select a valid time range!'
      );
    }

    this.router.navigate(['/catalog'], {
      queryParams: {
        from: this.dateToString(this.startDate!!),
        to: this.dateToString(this.endDate!!),
      },
    });
  }

  private dateToString = (date: NgbDate) =>
    `${date.year}-${date.month}-${date.day}`;

  setStartDate(date: NgbDate): void {
    this.startDate = date;
  }

  setEndDate(date: NgbDate): void {
    this.endDate = date;
  }
}
