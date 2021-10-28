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
    }
  ];

  constructor() { }
}
