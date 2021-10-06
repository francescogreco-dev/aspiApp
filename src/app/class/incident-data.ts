import { IncidentNote } from "./incident-note";

export class IncidentData {

  public id_incident: number;
  public id_technical: number;
  public client: string = '';
  public contact_name: string = '';
  public incident_number: string = '';
  public incident_number_internal: string = null;
  public destination: string = '';
  public common: string = '';
  public province: string = '';
  public request_date: string = '';
  public requested_time: string = '';
  public device: string = '';
  public event_type: string = '';
  //private status: string = 'Da pianificare';
  public symptom: string = '';
  public address: string = '';
  public phone_1: string = '';
  public phone_2: string = '';
  public note: string = '';
  public appointment: string = null;
  public planned_date: string = '';
  public incident_notes: IncidentNote[] = [];
  public incident_start_note: string = '';
  public is_close: boolean = false;
  public is_planned: boolean = false;
  public close_date: string = '';
  public time_arrived: string = '';
  public time_finish: string = '';
  public time_travel: string = '';
  public type: string = '';
  public status: string = '';
  public signatory: string = '';
  public incident_closure_note: string = '';

  constructor(dati: any) {
    this.id_incident = dati.eventoId;
    this.id_technical = dati.utenteInoltro
    this.incident_start_note = dati.noteEvento;
    this.incident_number = dati.apEventi.workorder;
    this.incident_number_internal = dati.apEventi.codchiE;
    this.is_close = (dati.esitoEvento == 0 ? false : true);
    this.is_planned = (dati.apEventi.dataPianifica != null && dati.apEventi.dataPianifica != '' ? true : false);
    this.note = dati.oggetto;
    this.phone_1 = dati.apEventi.telContatto;
    this.phone_2 = dati.apEventi.cellContatto;
    this.planned_date = dati.apEventi.dataPianifica;
    this.province = dati.apEventi.provinciaDestinazione;
    this.request_date = dati.apEventi.dataRichiestaCli;
    this.requested_time = dati.apEventi.oraRichiestaCli;
    this.status = dati.esitoEvento;
    this.symptom = dati.descrizioneEvento;
    this.address = dati.apEventi.aPEventiCfDestinazione != undefined ? (dati.apEventi.aPEventiCfDestinazione.desDestMerce + ' ' + (dati.apEventi.aPEventiCfDestinazione.desDestMerce.numDest != undefined ? dati.apEventi.aPEventiCfDestinazione.desDestMerce.numDest : '')) : "";
    //this.appointment = dati.appointment;
    this.client = dati.eventoCodCf.ragSocCf;
    this.common = dati.eventoCodCf.comuneCf;
    this.contact_name = dati.contatto;
    this.destination = dati.apEventi.comuneDestinazione;
    this.device = dati.apEventi.device;
    this.event_type = dati.COD_TIPO_EVENTO;
    console.log('io sono workorder', dati.apEventi.workorder)
  }

  setPlanned() {
    this.is_planned = true;
  }

  setClosed() {
    this.is_close = true;
  }

  public getPlanned() {
    return this.is_planned;
  }

  getClosed() {
    return this.is_close;
  }

  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setPlannedDate(data: string) {
    this.planned_date = data;
  }

  getPlannedDate() {
    return this.planned_date;
  }

}
