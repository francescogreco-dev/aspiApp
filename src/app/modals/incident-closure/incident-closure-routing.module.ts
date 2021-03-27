import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentClosurePage } from './incident-closure.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentClosurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentClosurePageRoutingModule {}
