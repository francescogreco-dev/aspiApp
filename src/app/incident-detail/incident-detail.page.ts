import { ModalController } from '@ionic/angular';
import { IncidentDetailPageRoutingModule } from './incident-detail-routing.module';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentData } from '../class/incident-data';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingService } from '../loading-service.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IncidentClosurePage } from '../modals/incident-closure/incident-closure.page';
import { PopoverController } from '@ionic/angular';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page';
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
    private modalController: ModalController,
    public popover: PopoverController
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.incident = JSON.parse(data.pass);
      this.loadingW.dismiss();
      //this.splashScreen.hide();
    })
  }

  callCellular(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Chimata in corso!', res))
      .catch(err => console.log('Errore di chiamata', err));
  }

  async closeIncident() {
    const modal = await this.modalController.create({
      component: IncidentClosurePage,
      componentProps: {
        'incident': this.incident
      }
    });

    modal.onDidDismiss()
      .then((response) => {
        this.CreatePopover(response)
      });
    return await modal.present();
  }

  CreatePopover(response) {
    this.popover.create({
      component: PopovercomponentPage,
      showBackdrop: false,
      mode: 'ios',
      translucent: true,
      componentProps: {
        'close_date': response.data.close_date,
        'time_arrived': response.data.time_arrived,
        'time_finish': response.data.time_finish,
        'time_travel': response.data.time_travel,
        'type': response.data.type,
        'status': response.data.status,
        'signatory': response.data.signatory,
        'incident_closure_note': response.data.incident_closure_note
      }
    }).then((popoverElement) => {
      popoverElement.style.cssText = '--min-width: 300px; --max-width: 420px; top: -10%;'
      popoverElement.present();
      popoverElement.onDidDismiss().then(data => {
        if (data.data != undefined) {
          this.incident.close_date = data.data.close_date;
          this.incident.time_arrived = data.data.time_arrived;
          this.incident.time_finish = data.data.time_finish;
          this.incident.time_travel = data.data.time_travel;
          this.incident.type = data.data.type;
          this.incident.status = data.data.status;
          this.incident.signatory = data.data.signatory;
          this.incident.incident_closure_note = data.data.incident_closure_note;
          this.closeIncident();
        } else {
          alert('hai confermato... la chiusura è in fase di implementazione!');
        }
      })
    })

  }


}
