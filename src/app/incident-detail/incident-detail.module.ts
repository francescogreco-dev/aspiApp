import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentDetailPageRoutingModule } from './incident-detail-routing.module';

import { IncidentDetailPage } from './incident-detail.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentDetailPageRoutingModule
  ],
  declarations: [IncidentDetailPage], providers: [SplashScreen]
})
export class IncidentDetailPageModule { }
