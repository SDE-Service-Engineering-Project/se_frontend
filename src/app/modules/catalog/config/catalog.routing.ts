import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from '../containers/catalog/catalog.component';
import { NgModule } from '@angular/core';
import { CatalogDetailsComponent } from '../containers/catalog-details/catalog-details.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
  },
  {
    path: ':id',
    component: CatalogDetailsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
