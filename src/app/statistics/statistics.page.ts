import { Component, OnInit } from '@angular/core';
import { DataIncidentsService } from '../data-incidents.service';
import * as moment from 'moment';
import { IncidentData } from '../class/incident-data';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  public percent: number = 0;
  public percentPianificate: number = 0;
  public percentPriority: number = 0;
  public dati: IncidentData[];
  public options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };
  public now: string;
  constructor(private dataService: DataIncidentsService) {
    this.now = new Date().toLocaleDateString('it-IT', this.options);
    this.dataService.getDataAll().subscribe((data) => {
      this.dati = data;
      this.getCount();
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {

  }

  getCount() {
    let counts = this.dataService.getCounts();
    this.percent = (counts.countChiusi / (counts.countAssegnati)) * 100;
    this.percentPianificate = (counts.countPianificati / (counts.countAssegnati - counts.countChiusi)) * 100;
    this.percentPriority = (counts.countPriority / (counts.countAssegnati - counts.countChiusi)) * 100;;
  }

}
