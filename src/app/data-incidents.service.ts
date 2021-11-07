import { IncidentData } from './class/incident-data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IncidentNote } from './class/incident-note';

@Injectable({
  providedIn: 'root'
})
export class DataIncidentsService {

  public urlApi = 'http://francescogreco.ddns.net:3001/';
  public dataAll: IncidentData[] = [];
  public dataNoPlanned: IncidentData[] = [];
  public dataPlannedNoToday: IncidentData[] = [];
  public dataPlannedToday: IncidentData[] = [];
  public dataClosed: IncidentData[] = [];
  public dataPriority: IncidentData[] = [];
  private now: string;
  public countAssegnati: number;
  public countPianificati: number;
  public countChiusi: number;
  public countPriority: number;
  private options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };

  constructor(private http: HttpClient) {
    this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
  }

  getDataNoPlanned(dataTemp: IncidentData[]) {
    let appData: IncidentData[] = []
    dataTemp.forEach((ele) => {
      if (ele.is_planned == false && ele.getClosed() == false) {
        appData.push(ele);
      }
    })
    localStorage.setItem('dataNoPlanned', JSON.stringify(appData));
    this.dataNoPlanned = appData;
    return this.dataNoPlanned;
  }

  getDataPlannedNoToday(dataTemp: IncidentData[]) {
    let appData: IncidentData[] = []
    dataTemp.forEach((ele) => {
      let dataCompare = new Date(ele.planned_date).toLocaleDateString('it-IT', this.options);
      if (ele.is_planned == true && dataCompare != this.now && ele.getClosed() == false) {
        appData.push(ele);
      }
    })
    localStorage.setItem('dataPlannedNoToday', JSON.stringify(appData));
    this.dataPlannedNoToday = appData;
    return this.dataPlannedNoToday;
  }

  getDataPlannedToday(dataTemp: IncidentData[]) {
    let appData: IncidentData[] = []
    dataTemp.forEach((ele) => {
      let dataCompare = new Date(ele.planned_date).toLocaleDateString('it-IT', this.options);
      if (ele.is_planned == true && dataCompare === this.now && ele.getClosed() == false) {
        appData.push(ele);
      }
    })
    localStorage.setItem('dataPlannedToday', JSON.stringify(appData));
    this.dataPlannedToday = appData;
    return appData;
  }

  getDataClosed(dataTemp: IncidentData[]) {
    let appData: IncidentData[] = []
    dataTemp.forEach((ele) => {
      if (ele.getClosed() == true) {
        appData.push(ele);
      }
    })
    localStorage.setItem('dataClosed', JSON.stringify(appData));
    this.dataClosed = appData;
    return this.dataClosed;
  }

  getDataPriority(dataTemp: IncidentData[]) {
    let appData: IncidentData[] = []
    dataTemp.forEach((ele) => {
      if (ele.getClosed() == false && ele.dataMax != null) {
        appData.push(ele);
      }
    })
    localStorage.setItem('dataPriority', JSON.stringify(appData));
    this.dataPriority = appData;
    return this.dataPriority;
  }

  getDataAll(): Observable<IncidentData[]> {
    const username = localStorage.getItem('username');
    const endPoint = this.urlApi + 'evento/getTickets/' + username + '/' + 'open';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })
    };
    return this.http.get(endPoint, httpOptions).pipe(
      map((res: any) => res),
      map((res: [IncidentData]) => {
        let tmp = res.map(r => new IncidentData(r));
        this.getDataNoPlanned(tmp);
        this.getDataPlannedNoToday(tmp);
        this.getDataPlannedToday(tmp);
        this.getDataClosed(tmp);
        this.dataAll = this.dataNoPlanned.concat(this.dataPlannedNoToday).concat(this.dataPlannedToday);
        return this.dataAll;
      }),
      tap(res => {
        localStorage.setItem('dati', JSON.stringify(res));
      })
    );
  }

  getCounts() {
    this.getDataClosed(this.dataAll);
    this.getDataNoPlanned(this.dataAll);
    this.getDataPlannedToday(this.dataAll);
    this.getDataPlannedNoToday(this.dataAll);
    this.getDataPriority(this.dataAll);
    this.countAssegnati = (this.dataNoPlanned.length + this.dataPlannedNoToday.length + this.dataPlannedToday.length);
    this.countChiusi = this.dataClosed.length;
    this.countPianificati = this.dataPlannedToday.length;
    this.countPriority = this.dataPriority.length
    return { countAssegnati: this.countAssegnati, countChiusi: this.countChiusi, countPianificati: this.countPianificati, countPriority: this.countPriority }
  }

  // save(incident: IncidentData) {
  //   let data = this.getDataAll();
  //   let copy: IncidentData[] = [];
  //   data.forEach((incidentActual) => {
  //     if (incidentActual.id_incident == incident.id_incident) {
  //       copy.push(incident);
  //     } else {
  //       copy.push(incidentActual);
  //     }
  //   })
  //   this.saveDataClosed(copy);
  //   this.saveDataNoPlanned(copy);
  //   this.saveDataPlannedToday(copy);
  //   this.saveDataPlannedNoToday(copy);
  //   this.saveDati(copy);
  // }

  saveDataPlannedToday(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if (incident.planned_date == this.now && incident.getClosed() == false) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataPlannedToday', JSON.stringify(tmp));
  }

  saveDataClosed(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if (incident.getClosed() == true) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataClosed', JSON.stringify(tmp));
  }

  saveDataNoPlanned(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if ((incident.planned_date == '' || incident.planned_date == null) && incident.getClosed() == false) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataNoPlanned', JSON.stringify(tmp));
  }

  saveDataPlannedNoToday(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if (incident.planned_date != this.now && incident.getClosed() == false) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataPlannedNoToday', JSON.stringify(tmp));
  }

  saveDati(incidentArray: IncidentData[]) {
    let all = this.getDataAll();
    localStorage.setItem('dati', JSON.stringify(all));
  }

  getNotes(incident_id: string): Observable<IncidentNote[]> {
    const endPoint = this.urlApi + 'evento';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }),
      params: new HttpParams({ fromString: 'filter={"where":{"eventoIdRaggruppato":' + incident_id + '}}' })
    }
    return this.http.get(endPoint, httpOptions).pipe(
      map((res: any) => res),
      map((res: [IncidentNote]) => {
        let tmp = res.map(r => new IncidentNote(r));
        return tmp;
      })
    )
  }

  setPlanDate(event_id: number, date: Date): Observable<any> {
    const endPoint = this.urlApi + 'ap-eventi/' + event_id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })
    }
    return this.http.patch(endPoint, { dataPianifica: date });
  }

}
