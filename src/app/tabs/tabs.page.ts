import { EventsService } from './../events.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  public assegnati: number = 0;
  public pianificati: number = 0
  public chiusi: number = 0;

  constructor(private event: EventsService) {
    this.event.getObsevable().subscribe((data) => {
      console.log(data);
      this.assegnati = data.countAssegnati;
      this.pianificati = data.countPianificati;
      this.chiusi = data.countChiusi;
    });
  }



}
