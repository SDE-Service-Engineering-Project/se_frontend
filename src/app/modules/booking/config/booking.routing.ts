import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookingComponent } from '../containers/booking/booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
