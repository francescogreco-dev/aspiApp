import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentClosurePageRoutingModule } from './incident-closure-routing.module';

import { IncidentClosurePage } from './incident-closure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentClosurePageRoutingModule
  ],
  declarations: [IncidentClosurePage]
})
export class IncidentClosurePageModule {}
