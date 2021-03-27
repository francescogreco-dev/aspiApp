import { EventsService } from './../events.service';
import { Router } from '@angular/router';
import { IncidentData } from './../class/incident-data';
import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';
import { AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ModalController } from '@ionic/angular';
import { FiltersModalPage } from '../modals/filters-modal/filters-modal.page';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public dati: IncidentData[];
  public _dati: IncidentData[];
  public clients = [];
  public commons = [];
  public planned_dates = [];
  public provinces = [];
  public request_dates = [];
  public countAssegnati: number = 0;
  public countPianificati: number = 0;
  public countChiusi: number = 0;
  public options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  };
  public now: string;
  constructor(
    private route: Router,
    private loadingW: LoadingService,
    private alertController: AlertController,
    private events: EventsService,
    private splashScreen: SplashScreen,
    public modalController: ModalController,
  ) {

  }

  OnInit() {

  }

  ionViewWillEnter() {
    this.dati = IncidentData.getFakeDataArray2();
    this._dati = this.dati;
    this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
    this.getCount();
    this.buildFilters();
    // this.events.publishData({ countAssegnati: this.countAssegnati, countPianificati: this.countPianificati, countChiusi: this.countChiusi });
  }

  buildFilters() {
    let clients = [];
    let commons = [];
    let planned_dates = [];
    let provinces = [];
    let request_dates = [];
    this.dati.forEach((incident: IncidentData) => {
      if (incident.getClosed() == false) {
        if (clients.indexOf(incident.client) == -1) {
          clients.push(incident.client);
        }
        if (commons.indexOf(incident.common) == -1) {
          commons.push(incident.common);
        }
        if (planned_dates.indexOf(incident.planned_date) == -1) {
          planned_dates.push(incident.planned_date);
        }
        if (provinces.indexOf(incident.province) == -1) {
          provinces.push(incident.province);
        }
        if (request_dates.indexOf(incident.request_date) == -1) {
          request_dates.push(incident.request_date);
        }
      }
    });
    this.clients = clients;
    this.commons = commons;
    this.planned_dates = planned_dates;
    this.provinces = provinces;
    this.request_dates = request_dates;
    console.log(this.clients, this.commons, this.planned_dates, this.provinces, this.request_dates)
  }

  getCount() {
    let countPianificati = 0
    let countChiusi = 0;
    let countAssegnati = 0;
    this.dati.forEach(function (data) {
      if (data.is_planned == true && data.getClosed() == false) {
        let current = new Date();
        let plan = moment(data.planned_date, "DD-MM-YYYY").toDate();
        if (current.getDate() == plan.getDate()) {
          countPianificati++;
        }
      }
      if (data.getClosed() == true) {
        countChiusi += 1;
      }
      countAssegnati += 1;
    });
    this.countAssegnati = countAssegnati - countChiusi;
    this.countChiusi = countChiusi;
    this.countPianificati = countPianificati;
    this.events.publishData({ countAssegnati: this.countAssegnati, countPianificati: this.countPianificati, countChiusi: this.countChiusi });
  }

  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    this.splashScreen.show();
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

  async showFilter(type) {
    const modal = await this.modalController.create({
      component: FiltersModalPage,
      componentProps: {
        'filter': type,
        'clients': this.clients,
        'commons': this.commons,
        'provinces': this.provinces,
        'planned_dates': this.planned_dates,
        'request_dates': this.request_dates
      }
    });

    modal.onDidDismiss()
      .then((response) => {
        if (response.data.selected_value != undefined) {
          this.rebuildView(response.data.selected_value, response.data.field);
        } else {
          this.showErrorSelected();
        }

      });
    return await modal.present();
  }

  rebuildView(value, field) {
    const dati: IncidentData[] = [];
    this._dati.forEach((incident) => {
      if (incident[field] == value) {
        console.log(incident);
        dati.push(incident);
      }
    })
    this.dati = dati;
  }

  async showErrorSelected() {
    const alert = await this.alertController.create({
      header: 'Mancata selezione!',
      message: 'Non è stato selezionata alcuna voce dai filtri',
      buttons: [{
        text: 'Ok',
      }]
    });
    await alert.present();
  }

}
