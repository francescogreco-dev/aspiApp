import { IncidentData } from './../class/incident-data';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { AlertController, IonReorderGroup } from '@ionic/angular';
import { EventsService } from './../events.service';

import * as moment from 'moment';
import { DataIncidentsService } from '../data-incidents.service';
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
    private dataService: DataIncidentsService) {

  }

  ionViewWillEnter() {
    this.buildData()
  }

  buildData() {
    this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
    this.dati = this.dataService.getDataPlannedToday();
  }


  test(incident: IncidentData) {
    let pass = JSON.stringify(incident)
    this.route.navigate(['incident-detail', { pass }]);
    this.splashScreen.show();
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    //console.log('prima di completare', this.dati);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    this.dati = ev.detail.complete(this.dati);
    localStorage.setItem('dataPlannedToday', JSON.stringify(this.dati));
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }
}
