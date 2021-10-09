import { DatePicker } from '@ionic-native/date-picker/ngx';
import { IncidentDetailPageRoutingModule } from './../incident-detail/incident-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { IncidentDetailPageModule } from '../incident-detail/incident-detail.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    IncidentDetailPageModule
  ],
  exports: [],
  providers: [SplashScreen, DatePicker, LaunchNavigator],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
