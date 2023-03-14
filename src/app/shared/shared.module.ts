import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [RouterLink, CommonModule, RouterLinkActive, NgbCollapse],
})
export class SharedModule {}
