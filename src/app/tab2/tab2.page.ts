import { Component } from '@angular/core';
import { IncidentData } from './../class/incident-data';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public dati: IncidentData[];
  public options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  };
  public now: string;
  constructor(private route: Router, private splashScreen: SplashScreen) {
    this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
    this.dati = IncidentData.getFakeDataArray2();
    console.log(this.now);
  }

  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    this.splashScreen.show();
  }

}
