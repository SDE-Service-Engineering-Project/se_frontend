import { NgModule } from '@angular/core';
import { CatalogComponent } from './containers/catalog/catalog.component';
import { CatalogDetailsComponent } from './containers/catalog-details/catalog-details.component';
import { CarCardModule } from './components/car-card/car-card.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './config/catalog.routing';

@NgModule({
  declarations: [CatalogComponent, CatalogDetailsComponent],
  imports: [CatalogRoutingModule, CarCardModule, AsyncPipe, CommonModule],
})
export class CatalogModule {}
