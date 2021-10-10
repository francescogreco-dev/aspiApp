import { IncidentData } from './../class/incident-data';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { AlertController, IonReorderGroup } from '@ionic/angular';
import { EventsService } from './../events.service';

import * as moment from 'moment';
import { DataIncidentsService } from '../data-incidents.service';
import { LoadingService } from '../loading-service.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  public dati: IncidentData[];
  public options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };
  public now: string;
  constructor(private route: Router, private splashScreen: SplashScreen, private events: EventsService,
    private dataService: DataIncidentsService,
    private loadingW: LoadingService, private datePicker: DatePicker, private alertController: AlertController,
    private callNumber: CallNumber, private launchNavigator: LaunchNavigator) {

  }

  goAddress(incident: IncidentData) {
    // let options: LaunchNavigatorOptions = {
    //   start: '',
    //   app: LaunchNavigator.APPS.UBER
    // }

    this.launchNavigator.navigate(incident.address)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  ionViewWillEnter() {
    this.buildData()
  }

  callCellular(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Chimata in corso!', res))
      .catch(err => console.log('Errore di chiamata', err));
  }

  buildData() {
    this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
    let incidents = localStorage.getItem('dataPlannedToday');
    this.dati = JSON.parse(incidents);
  }


  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    //this.splashScreen.show();
    this.loadingW.present();
  }

  doReorder(ev: Event) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    const value = (event as CustomEvent<ItemReorderEventDetail>).detail.complete();
    //console.log('Dragged from index', value.detail.from, 'to', value.detail.to);
    //console.log('prima di completare', this.dati);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    this.dati = value.detail.complete(this.dati);
    localStorage.setItem('dataPlannedToday', JSON.stringify(this.dati));
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
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
        this.saveIncident(incident);
      },
      err => console.log('Si è verificato il seguente errore: ', err)
    );
  }

  saveIncident(incident: IncidentData) {
    // this.dataService.save(incident);
    // this.dati = this.dataService.getDataAll();
    // this.getCount();
    //this.rebuildData(incident)
  }

  getCount() {
    let counts = this.dataService.getCounts();
    this.events.publishData({ countAssegnati: counts.countAssegnati, countPianificati: counts.countPianificati, countChiusi: counts.countChiusi });
  }
}
