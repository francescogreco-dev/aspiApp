import { DataIncidentsService } from './../data-incidents.service';
import { IncidentNote } from './../class/incident-note';
import { EventsService } from './../events.service';
import { Router } from '@angular/router';
import { IncidentData } from './../class/incident-data';
import { Component, ViewChild } from '@angular/core';
import { LoadingService } from '../loading-service.service';
import { AlertController, IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ModalController } from '@ionic/angular';
import { FiltersModalPage } from '../modals/filters-modal/filters-modal.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  public dati: IncidentData[];
  public _dati: IncidentData[];
  public dataNoPlanned: IncidentData[];
  public dataPlannedNoToday: IncidentData[];
  public dataPlannedToday: IncidentData[];
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
    day: "2-digit"
  };
  public now: string;
  constructor(
    private route: Router,
    private loadingW: LoadingService,
    private alertController: AlertController,
    private events: EventsService,
    private splashScreen: SplashScreen,
    public modalController: ModalController,
    private datePicker: DatePicker,
    private dataService: DataIncidentsService
  ) {
    this.dataService.getDataAll().subscribe((data) => {
      this.dati = data;
      this.getCount();
    });
  }

  OnInit() {

  }

  doReorder(ev) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    //console.log('prima di completare', this.dati);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    this.dati = ev.detail.complete(this.dati);
    localStorage.setItem('dati', JSON.stringify(this.dati));
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  ionViewWillEnter() {
    //this.buildData()
    this.now = new Date().toLocaleDateString('it-IT', this.options);
    // this.getCount();
    // this.buildFilters();
  }

  // buildData() {
  //   let tmp = localStorage.getItem('dati');
  //   let dataTemp = [];
  //   let appData: IncidentData[] = []
  //   if (tmp) {
  //     dataTemp = JSON.parse(tmp);
  //     dataTemp.forEach((ele) => {
  //       let u = new IncidentData(ele);
  //       appData.push(u);
  //     })
  //     this.dati = appData;
  //   } else {
  //     this.dati = IncidentData.getFakeDataArray2();
  //     localStorage.setItem('dati', JSON.stringify(this.dati));
  //   }
  //   this._dati = this.dati;
  //   this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
  //   this.getCount();
  //   this.buildFilters();
  // }

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
    //console.log(this.clients, this.commons, this.planned_dates, this.provinces, this.request_dates)
  }

  getCount() {
    let counts = this.dataService.getCounts();
    console.log('io sono counts', counts)
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
    this.events.publishData({ countAssegnati: counts.countAssegnati, countPianificati: counts.countPianificati, countChiusi: counts.countChiusi });
  }

  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    //this.splashScreen.show();
    this.loadingW.present();
  }

  async plannedIncident(incident: IncidentData) {
    const alert = await this.alertController.create({
      header: 'Pianificazione intervento',
      message: 'Si vuole davvero pracedere?',
      buttons: [{
        text: 'Annulla',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          //console.log('Annullato');
        }
      }, {
        text: 'Procedi',
        handler: () => {
          this.showDateCalendar(incident);
        }
      }]
    });

    await alert.present();
  }

  showDateCalendar(incident: IncidentData) {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(
      date => {
        incident.planned_date = moment(date).format("DD/MM/YYYY").toString();
        incident.is_planned = true;
        // this.saveIncident(incident);
      },
      err => console.log('Si è verificato il seguente errore: ', err)
    );
  }

  // saveIncident(incident: IncidentData) {
  //   this.dataService.save(incident);
  //   this.dati = this.dataService.getDataAll();
  //   this.getCount();
  //   //this.rebuildData(incident)
  // }

  // rebuildData(incident: IncidentData) {
  //   let tmp: IncidentData[] = [];
  //   let variableSet = '';
  //   let variable;
  //   if (incident.planned_date == this.now) {
  //     variableSet = 'dataPlannedToday'
  //     variable = this.dataPlannedToday;
  //   } else {
  //     variableSet = 'dataPlannedNoToday'
  //     variable = this.dataPlannedNoToday;
  //   }
  //   variable.forEach(incidentEle => {
  //     if (incidentEle.id_incident == incident.id_incident) {
  //       tmp.push(incident);
  //     } else {
  //       tmp.push(incidentEle);
  //     }
  //     localStorage.setItem(variableSet, JSON.stringify(tmp));
  //     this.dati = this.dataService.getDataAll();
  //     this.getCount();
  //   })
  // }

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
        //console.log(incident);
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

  doRefresh(event) {
    console.log('Begin async operation', event);
    // this.buildData()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
