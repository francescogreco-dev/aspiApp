import { ModalController } from '@ionic/angular';
import { IncidentDetailPageRoutingModule } from './incident-detail-routing.module';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentData } from '../class/incident-data';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingService } from '../loading-service.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IncidentClosurePage } from '../modals/incident-closure/incident-closure.page';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.scss'],
})

export class IncidentDetailPage implements OnInit {
  incident: IncidentData;
  constructor(
    private route: ActivatedRoute,
    private callNumber: CallNumber,
    private loadingW: LoadingService,
    private splashScreen: SplashScreen,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.incident = JSON.parse(data.pass);
      //this.loadingW.dismiss();
      this.splashScreen.hide();
    })
  }

  callCellular(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Chimata in corso!', res))
      .catch(err => console.log('Errore di chiamata', err));
  }

  async closeIncident(incident) {
    const modal = await this.modalController.create({
      component: IncidentClosurePage,
      componentProps: {
        'incident': incident
      }
    });

    modal.onDidDismiss()
      .then((response) => {

      });
    return await modal.present();
  }

}
