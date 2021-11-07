import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // currentPageTitle = 'Dashboard';

  appPages = [
    {
      title: 'Info App',
      url: 'contact',
      icon: 'information-circle'
    }, {
      title: 'Richiesta a magazzino',
      url: 'purchase-order',
      icon: 'mail'
    }, {
      title: 'Statistiche',
      url: 'statistics',
      icon: 'stats-chart'
    }
  ];

  constructor() { }
}
