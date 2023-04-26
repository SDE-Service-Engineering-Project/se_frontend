import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  constructor(private modal: NgbActiveModal) {}

  close(reason: string) {
    this.modal.close(reason);
  }

  dismiss(reason: string) {
    this.modal.dismiss(reason);
  }
}
