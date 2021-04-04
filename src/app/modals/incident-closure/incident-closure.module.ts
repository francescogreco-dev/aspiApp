import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentClosurePageRoutingModule } from './incident-closure-routing.module';

import { IncidentClosurePage } from './incident-closure.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentClosurePageRoutingModule
  ],
  declarations: [IncidentClosurePage],
  providers: [DatePicker],
})
export class IncidentClosurePageModule { }
