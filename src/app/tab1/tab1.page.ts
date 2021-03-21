import { IncidentDetailPageModule } from './../incident-detail/incident-detail.module';
import { Router } from '@angular/router';
import { IncidentData } from './../class/incident-data';
import { Component, OnInit } from '@angular/core';
import { IncidentDetailPage } from '../incident-detail/incident-detail.page';
import { LoadingService } from '../loading-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public dati: IncidentData[];
  constructor(private route: Router, private loadingW: LoadingService, private alertController: AlertController) {
    this.dati = IncidentData.getFakeDataArray();
  }

  async OnInit() {
    // this.loadingW.dismiss();
  }

  test(incident: IncidentData) {
    // this.route.navigateByUrl('/incident-detail');
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    this.loadingW.present();
  }

  async plannedIncident() {
    const alert = await this.alertController.create({
      header: 'Pianificazione intervento',
      message: 'Si vuole davvero pracedere?',
      buttons: [{
        text: 'Annulla',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Annullato');
        }
      }, {
        text: 'Procedi',
        handler: () => {
          console.log('Work in progress!');
        }
      }]
    });

    await alert.present();
  }

}
