import { IncidentDetailPageRoutingModule } from './incident-detail-routing.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentData } from '../class/incident-data';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingService } from '../loading-service.service';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.scss'],
})
export class IncidentDetailPage implements OnInit {
  incident: IncidentData;
  constructor(private route: ActivatedRoute, private callNumber: CallNumber, private loadingW: LoadingService) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.incident = JSON.parse(data.pass);
      this.loadingW.dismiss();
    })
  }

  callCellular(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Chimata in corso!', res))
      .catch(err => console.log('Errore di chiamata', err));
  }

  closeIncident() {
    alert('Work in progress!');
  }

}
