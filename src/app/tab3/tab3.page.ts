import { Component } from '@angular/core';
import { IncidentData } from './../class/incident-data';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { DataIncidentsService } from '../data-incidents.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public dati: IncidentData[];
  constructor(private route: Router, private splashScreen: SplashScreen,
    private dataService: DataIncidentsService) {
    // let tmp = localStorage.getItem('dati');
    // let dataTemp = [];
    // let appData: IncidentData[] = []
    // if (tmp) {
    //   dataTemp = JSON.parse(tmp);
    //   dataTemp.forEach((ele) => {
    //     appData.push(new IncidentData(ele))

    //   })
    //   this.dati = appData;
    // } else {
    //   this.dati = IncidentData.getFakeDataArray2();
    //   localStorage.setItem('dati', JSON.stringify(this.dati));
    // }
  }

  ionViewWillEnter() {
    this.dati = this.dataService.getDataClosed();
    // let tmp = localStorage.getItem('dati');
    // let dataTemp = [];
    // let appData: IncidentData[] = []
    // if (tmp) {
    //   dataTemp = JSON.parse(tmp);
    //   dataTemp.forEach((ele) => {
    //     appData.push(new IncidentData(ele))

    //   })
    //   this.dati = appData;
    // } else {
    //   this.dati = IncidentData.getFakeDataArray2();
    //   localStorage.setItem('dati', JSON.stringify(this.dati));
    // }
  }


  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    this.splashScreen.show();
  }

}
