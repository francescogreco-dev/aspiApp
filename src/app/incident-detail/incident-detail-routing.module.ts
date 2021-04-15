import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentDetailPage } from './incident-detail.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentDetailPage
  }, {
    path: 'incident-closure',
    loadChildren: '../incident-closure/incident-closure.module.ts#IncidentDetailPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentDetailPageRoutingModule { }
