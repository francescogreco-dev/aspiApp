export class IncidentNote {
  public id_technical: number;
  public technical_name: string;
  public date_insert: string;
  public time_insert: string;
  public event_type: string;
  public status: string;
  public text: string;


  getDateNote() {
    return this.date_insert + ' ' + this.time_insert;
  }
}
