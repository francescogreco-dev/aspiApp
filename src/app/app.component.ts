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
      title: 'Contatti',
      url: 'contact',
      icon: 'call'
    }
  ];

  constructor() { }
}
