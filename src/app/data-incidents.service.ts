import { IncidentData } from './class/incident-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataIncidentsService {

  public dataAll: IncidentData[] = [];
  public dataNoPlanned: IncidentData[] = [];
  public dataPlannedNoToday: IncidentData[] = [];
  public dataPlannedToday: IncidentData[] = [];
  public dataClosed: IncidentData[] = [];
  private now: string;
  public countAssegnati: number;
  public countPianificati: number;
  public countChiusi: number;
  private options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };

  constructor() {
    this.now = new Date().toLocaleDateString('it-IT', this.options).toString();
  }

  getDataNoPlanned() {
    let dataTemp = [];
    let appData: IncidentData[] = []
    let tmp = localStorage.getItem('dataNoPlanned');
    if (tmp) {
      dataTemp = JSON.parse(tmp);
      dataTemp.forEach((ele) => {
        let u = new IncidentData(ele);
        if (u.is_planned == false && u.getClosed() == false) {
          appData.push(u);
        }
      })
    } else {
      dataTemp = IncidentData.getFakeDataArray2();
      dataTemp.forEach((ele) => {
        if (ele.is_planned == false && ele.getClosed() == false) {
          appData.push(ele);
        }
      })
      localStorage.setItem('dataNoPlanned', JSON.stringify(appData));
    }
    this.dataNoPlanned = appData;
    return this.dataNoPlanned;
  }

  getDataPlannedNoToday() {
    let dataTemp = [];
    let appData: IncidentData[] = []
    let tmp = localStorage.getItem('dataPlannedNoToday');
    if (tmp) {
      dataTemp = JSON.parse(tmp);
      dataTemp.forEach((ele) => {
        let u = new IncidentData(ele);
        if (u.is_planned == true && u.planned_date != this.now && u.getClosed() == false) {
          appData.push(u);
        }
      })
    } else {
      dataTemp = IncidentData.getFakeDataArray2();
      dataTemp.forEach((ele) => {
        if (ele.is_planned == true && ele.planned_date != this.now && ele.getClosed() == false) {
          appData.push(ele);
        }
      })
      localStorage.setItem('dataPlannedNoToday', JSON.stringify(appData));
    }
    this.dataPlannedNoToday = appData;
    return this.dataPlannedNoToday;
  }

  getDataPlannedToday() {
    let dataTemp = [];
    let appData: IncidentData[] = []
    let tmp = localStorage.getItem('dataPlannedToday');
    if (tmp) {
      dataTemp = JSON.parse(tmp);
      dataTemp.forEach((ele) => {
        let u = new IncidentData(ele);
        if (u.is_planned == true && u.planned_date == this.now && u.getClosed() == false) {
          appData.push(u);
        }
      })
    } else {
      dataTemp = IncidentData.getFakeDataArray2();
      dataTemp.forEach((ele) => {
        if (ele.is_planned == true && ele.planned_date == this.now && ele.getClosed() == false) {
          appData.push(ele);
        }
      })
      localStorage.setItem('dataPlannedToday', JSON.stringify(appData));
    }
    this.dataPlannedToday = appData;
    return this.dataPlannedToday;
  }

  getDataClosed() {
    let dataTemp = [];
    let appData: IncidentData[] = []
    let tmp = localStorage.getItem('dataClosed');
    if (tmp) {
      dataTemp = JSON.parse(tmp);
    }
    if (dataTemp.length != 0) {
      dataTemp.forEach((ele) => {
        let u = new IncidentData(ele);
        if (u.getClosed() == true) {
          appData.push(u);
        }
      })
    } else {
      dataTemp = IncidentData.getFakeDataArray2();
      dataTemp.forEach((ele) => {
        if (ele.getClosed() == true) {
          appData.push(ele);
        }
      })
      localStorage.setItem('dataClosed', JSON.stringify(appData));
    }
    this.dataClosed = appData;
    return this.dataClosed;
  }

  getDataAll() {
    // let tmp = localStorage.getItem('dati');
    // if (tmp) {
    //   this.dataAll = JSON.parse(tmp);
    // } else {
    //   this.getDataNoPlanned();
    //   this.getDataPlannedNoToday();
    //   this.getDataPlannedToday();
    //   this.getDataClosed();
    //   this.dataAll = this.dataNoPlanned.concat(this.dataPlannedNoToday).concat(this.dataPlannedToday);
    // }
    // return this.dataAll;

    this.getDataNoPlanned();
    this.getDataPlannedNoToday();
    this.getDataPlannedToday();
    this.getDataClosed();
    this.dataAll = this.dataNoPlanned.concat(this.dataPlannedNoToday).concat(this.dataPlannedToday);
    return this.dataAll;
  }

  getCounts() {
    this.getDataClosed();
    this.getDataNoPlanned();
    this.getDataPlannedToday();
    this.getDataPlannedNoToday();
    console.log(this.dataNoPlanned.length, this.dataPlannedNoToday.length, this.dataPlannedToday.length)
    this.countAssegnati = (this.dataNoPlanned.length + this.dataPlannedNoToday.length + this.dataPlannedToday.length);
    this.countChiusi = this.dataClosed.length;
    this.countPianificati = this.dataPlannedToday.length;
    return { countAssegnati: this.countAssegnati, countChiusi: this.countChiusi, countPianificati: this.countPianificati }
  }

  save(incident: IncidentData) {
    let data = this.getDataAll();
    let copy: IncidentData[] = [];
    data.forEach((incidentActual) => {
      if (incidentActual.id_incident == incident.id_incident) {
        copy.push(incident);
      } else {
        copy.push(incidentActual);
      }
    })
    this.saveDataClosed(copy);
    this.saveDataNoPlanned(copy);
    this.saveDataPlannedToday(copy);
    this.saveDataPlannedNoToday(copy);
    this.saveDati(copy);
  }

  saveDataPlannedToday(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if (incident.planned_date == this.now && incident.getClosed() == false) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataPlannedToday', JSON.stringify(tmp));
    console.log('finito 1')
  }

  saveDataClosed(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if (incident.getClosed() == true) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataClosed', JSON.stringify(tmp));
    console.log('finito 2')
  }

  saveDataNoPlanned(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if ((incident.planned_date == '' || incident.planned_date == null) && incident.getClosed() == false) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataNoPlanned', JSON.stringify(tmp));
    console.log('finito 3')
  }

  saveDataPlannedNoToday(incidentArray: IncidentData[]) {
    let tmp: IncidentData[] = [];
    incidentArray.forEach((incident) => {
      if (incident.planned_date != this.now && incident.getClosed() == false) {
        tmp.push(incident);
      }
    })
    localStorage.setItem('dataPlannedNoToday', JSON.stringify(tmp));
    console.log('finito 4')
  }

  saveDati(incidentArray: IncidentData[]) {
    let all = this.getDataAll();
    localStorage.setItem('dati', JSON.stringify(all));
    console.log('finito 5')
  }

}
