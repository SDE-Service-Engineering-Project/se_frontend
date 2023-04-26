import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../../models/booking';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.sass'],
})
export class BookingCardComponent {
  @Input() booking: Booking = {} as Booking;
  @Output() bookingCanceled: EventEmitter<any> = new EventEmitter<any>();

  modalRef!: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  getTimeDuration(): number {
    if (this.booking.bookedFrom && this.booking.bookedUntil) {
      return (
        (new Date(this.booking.bookedUntil).getTime() -
          new Date(this.booking.bookedFrom).getTime()) /
        (1000 * 3600 * 24)
      );
    }
    return 0;
  }

  cancelBooking(booking: Booking) {
    this.modalRef = this.modalService.open(ModalComponent);
    this.modalRef.result
      .then((decision) => {
        if (decision === 'confirmed') {
          this.bookingCanceled.emit(booking);
        }
      })
      .catch((err) => {
        this.toastService.showDefaultErrorToast(
          'Your Booking was not canceled'
        );
      });
  }
}
