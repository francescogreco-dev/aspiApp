import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersModalPage } from './filters-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FiltersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersModalPageRoutingModule {}
