import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'incident-detail',
    loadChildren: () => import('./incident-detail/incident-detail.module').then(m => m.IncidentDetailPageModule)
  },
  {
    path: 'filters-modal',
    loadChildren: () => import('./modals/filters-modal/filters-modal.module').then(m => m.FiltersModalPageModule)
  },
  {
    path: 'incident-closure',
    loadChildren: () => import('./modals/incident-closure/incident-closure.module').then(m => m.IncidentClosurePageModule)
  },
  {
    path: 'popovercomponent',
    loadChildren: () => import('./popovercomponent/popovercomponent.module').then(m => m.PopovercomponentPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)

  },  {
    path: 'purchase-order',
    loadChildren: () => import('./purchase-order/purchase-order.module').then( m => m.PurchaseOrderPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
