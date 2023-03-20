import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCardComponent } from './booking-card.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BookingCardComponent],
  exports: [BookingCardComponent],
})
export class BookingCardModule {}
