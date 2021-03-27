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
    loadChildren: () => import('./modals/filters-modal/filters-modal.module').then( m => m.FiltersModalPageModule)
  },
  {
    path: 'incident-closure',
    loadChildren: () => import('./modals/incident-closure/incident-closure.module').then( m => m.IncidentClosurePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
