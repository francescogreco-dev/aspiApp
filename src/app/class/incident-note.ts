export class IncidentNote {
  public technical_name: string;
  public date_insert: string;
  public time_insert: string;
  public event_type: string;
  public status: string;
  public text: string;

  constructor(dati?: any) {
    this.technical_name = dati.utente || '0';
    this.date_insert = dati.dataIns || '--ND--';
    this.time_insert = dati.oraIns || '--ND--';
    this.event_type = dati.COD_TIPO_EVENTO || '--ND--';
    this.status = dati.stato || '--ND--';
    this.text = dati.descrizioneEvento || '--ND--';
  }
  getDateNote() {
    return this.date_insert + ' ' + this.time_insert;
  }
}
