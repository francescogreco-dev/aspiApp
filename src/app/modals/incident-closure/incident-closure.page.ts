import { IncidentData } from './../../class/incident-data';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-incident-closure',
  templateUrl: './incident-closure.page.html',
  styleUrls: ['./incident-closure.page.scss'],
})
export class IncidentClosurePage implements OnInit {

  @Input() incident: IncidentData;
  //public incident_closure_note: string;
  public now = new Date;
  // public close_date = moment(this.now).format("DD/MM/YYYY").toString();
  // public time_arrived: string = moment(this.now).format("HH:mm").toString();
  // public time_finish: string = moment(this.now).format("HH:mm").toString();
  // public time_travel: string = '00:00';
  public type: string;
  public status: string;
  // public signatory: string;
  public types = [
    '01 Sostituzione',
    '02 Riparazione',
    '16 Non Eseguito',
    'Amm Note Amministrazione',
    'ASP.1 Gestione Operativa',
    'ASP.2 Manutenzione',
    'CELL CONTATTO TELEFONICO',
    'CTES Comunicazione a TESIS',
    'MAINT MANUTENZIONE',
    'OS ONSITE',
    'ROL ROLLOUT',
    'T.01 Intervento HW',
    'T.02 Intervento SW',
    'T.03 Assistenza Sistemistica',
    'T.04 Sopralluogo',
    'T.07 Consegna',
    'T.10 Mif',
    'T.11 Servizi Specialistici',
    'T.15 Manutenzione Programmata'
  ];
  public statment = [
    '03 Attesa Parti',
    '06 Evasa - Intervento Eseguito',
    '06CR Evasa con ribaltamento',
    '09 Differita',
    '12 evasa.Intervento non eseguito',
    '15 Intervento a preventivo',
    '16 Evasa - Richiesta Parte',
    '21 Per appuntamento',
    'SOSP Sospeso'
  ]

  constructor(private datePicker: DatePicker, private modalCtrl: ModalController, private platform: Platform) { }

  ngOnInit() {
    this.incident.close_date = moment(this.now).format("DD/MM/YYYY").toString();
    this.incident.time_arrived = moment(this.now).format("HH:mm").toString();
    this.incident.time_finish = moment(this.now).format("HH:mm").toString();
    this.incident.time_travel = '00:00';
  }

  showCalendar() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.platform.is('ios') == true ? this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK : this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(
      date => {
        this.incident.close_date = moment(date).format("DD/MM/YYYY").toString();
      },
      err => console.log('Si è verificato il seguente errore: ', err)
    );
  }

  showClock(fieldReference) {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      is24Hour: true,
      minuteInterval: 5,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(
      date => {
        if (fieldReference == 'arrived') {
          this.incident.time_arrived = moment(date).format("HH:mm").toString();
        } else if (fieldReference == 'finish') {
          this.incident.time_finish = moment(date).format("HH:mm").toString();
        } else if (fieldReference == 'travel') {
          this.incident.time_travel = moment(date).format("HH:mm").toString();
        }
      },
      err => console.log('Si è verificato il seguente errore: ', err)
    );
  }

  Getselected(selected) {

  }

  closeModal() {
    this.modalCtrl.dismiss({
      'close_date': this.incident.close_date,
      'time_arrived': this.incident.time_arrived,
      'time_finish': this.incident.time_finish,
      'time_travel': this.incident.time_travel,
      'type': this.incident.type,
      'status': this.incident.status,
      'signatory': this.incident.signatory,
      'incident_closure_note': this.incident.incident_closure_note
    });
  }

}
