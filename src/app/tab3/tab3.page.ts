import { Component } from '@angular/core';
import { IncidentData } from './../class/incident-data';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public dati: IncidentData[];
  constructor(private route: Router, private splashScreen: SplashScreen) {
    this.dati = IncidentData.getFakeDataArray2();
  }

  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    this.splashScreen.show();
  }

}
