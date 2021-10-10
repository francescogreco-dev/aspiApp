import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  providers: [SplashScreen, DatePicker, LaunchNavigator],
  declarations: [Tab2Page]
})
export class Tab2PageModule { }
