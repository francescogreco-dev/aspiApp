import { not } from "@angular/compiler/src/output/output_ast";
import { Data } from "@angular/router";
import { IncidentNote } from "./incident-note";

export class IncidentData {

  public id: number;
  public id_technical: number;
  public client: string;
  public contact_name: string;
  public incident_number: string;
  public incident_number_internal: string = null;
  public destination: string;
  public common: string;
  public request_date: string;
  public requested_time: string;
  public device: string;
  public event_type: string;
  private status: string = 'Da pianificare';
  public symptom: string;
  public address: string;
  public phone_1: string;
  public phone_2: string;
  public note: string;
  public appointment: string = null;
  public planned_date: Date;
  public incident_notes: IncidentNote[] = [];
  private is_close: boolean = false;
  public is_planned: boolean = false;

  setPlanned() {
    this.is_planned = true;
  }

  setClosed() {
    this.is_close = true;
  }

  getPlanned() {
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

  setPlannedDate(data: Date) {
    this.planned_date = data;
  }

  getPlannedDate() {
    return this.planned_date;
  }

  static getFakeDataArray() {
    const _return = [];
    for (let i = 0; i <= 100; i++) {
      let tmp = new IncidentData();
      tmp.id = (i + 1);
      tmp.id_technical = 3;
      tmp.incident_number = "RITM000049185662" + (2321 + i);
      tmp.incident_number_internal = "SR - GIANLUCA LISCIANDRELLO";
      if (i % 2 == 0) {
        tmp.symptom = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
      } else {
        tmp.symptom = "Non accende";
      }
      tmp.phone_1 = "09237502233";
      tmp.phone_2 = "3487011917";
      tmp.request_date = new Date().getUTCDate.toString();
      tmp.requested_time = "11:00";
      // tmp.symptom = i % 2 != 0 ? "Non accende" : "Ventola rumorosa";
      tmp.address = "Viale della regione siciliana N. " + 2000 + i;
      tmp.client = "Atos / Wave " + (i + 1);
      tmp.common = i % 2 != 0 ? "Palermo" : "Trapani";
      tmp.contact_name = i % 2 != 0 ? "Francesco Greco" : "Salvo Dell'Utri";
      tmp.destination = tmp.common;
      tmp.device = i % 2 != 0 ? "Stampante" : "Server";
      tmp.event_type = "T.02-Intervento software";
      if (i % 2 != 0) {
        tmp.note = "MIUR  \n- MIUR C/O CSA DI MESSINA VIA SAN PAOLO SNC MESSINA   -     OKI 9475 ES 9475 ES    PRNSTDUSPME0002   LUTENTE RIFERISCE CHE LA STAMPANTE SEGNALA ERRORE F101 CON CHIAVE INGLESE CALL SERVICE   E NON PARTE PRNSTDUSPME0002 OKI ES9475 MFP MI15188 MAIL   GIOVANNI.FIUMANO@ISTRUZIONE.IT VIA SAN PAOLO 361 98122 MESSINA PRIMO PIANO CORRIDOIO TEL 338/7731180***HDD IN ARRIVO IL 04/02 AD SCS C/O ASPI CATANIA TRAKING M4610319620 - RESTITUIRE DISCHI BAD**CAVO HDD + FUSER GEAR IN ARRIVO PREVISTO IL 19/02 AD SCS C/O ASPI CATANIA TRAKING M4610446022**FUSER GEAR 6LJ58810000 IN ARRIVO PREVISTO IL 01/03 AD SCS C/O ASPI CATANIA TRAKING M4610518103 - SMALTIRE PARTE BAD**15/03 SOSTITUITO FUSER GEAR. RISCONTRATO CHE OCCORRE SOSTITUIRE FUSORE INTERO.**FUSER UNIT IN ARRIVO IL 19/03 AD SCS C/O ASPI CATANIA TRAKING M4610734968 - RESTITUIRE FUSER BAD A FINE INTERVENTO  FIUMANO 090/698248   ------------------------------------------------------  SLA INTERVENTO: NBD  OPERAZIONI DE ESEGUIRE SEMPRE:  1)PER IL RAPPORTINO TELEFONARE A DOMINO (NATASCIA) 023088574 ENTRO LE 13 O DOPO LE 14  2)MANDARE I RAPPORTINI A DOMINO APPENA FINITO L'INTERVENTO AL FAX 0266116577 O ALLA assistenza@dominosrl.it  3)EFFETTUARE SEMPRE LE STAMPE DEI CONSUMABILI. NON VALIDO SOLO IL RAPPORTINO.  4)Ordinare le parti di ricambio sempre con PART NUMBER  5)Se si riscontrano parti danneggiate, fare foto ed indicare i part number da sostituire  6) INVIARE RAPPORTINO VIA FOTO AD assistenza@dominosrl.it E nicola.messiga@scsitalia.net  7) Il rapportino e le stampe devono essere allegate entro il giorno successivo alla chiamata    SULLA 9475:  A)In fase di sostituzione del kit drum deve essere sostituita anche la vaschetta raccogli toner presente nel kit del cliente a prescindere che sia piena o meno.  B)Se già cambiata dall'utente, segnalare nel rapportino  C)Se si cambiano i consumabili (anche developer) seguire manuale da pag. 420 'adjustment' (Non invertire mai i consumabili)  D)effettuare SEMPRE AGGIORNAMENTO FIRMWARE su qualsiasi chiamata  E)in caso di cambio HHD/logica a fine intervento chiamare supporto MIUR per la riconfigurazione (0681153037)  F)Effettuare sempre controllo sulle impostazioni di rete per verificare che siano in DHCP. In caso avessero indirizzo IP statico, cambiare in DHCP.  -------------FINE TICKET-------------------------------";
      } else {
        tmp.note = "Questa è una nota test";
      }
      for (let j = 0; j <= 4; j++) {
        let note = new IncidentNote;
        let name_tech = ""
        let data_intert;
        let time_insert;
        let event = "";
        let status = "";
        let text = "Questo è un test di inserimento nota per vedere la visualizzazione in App, non fate caso a quello che c'è scritto, grazie, segue un contatore numerico ";
        note.id_technical = j;
        if (j == 0) {
          name_tech = "Salvo Dell' Utri";
          data_intert = '10/10/2020';
          time_insert = '10:12';
          event = 'CELL  CONTATTO TELEFONICO';
          status = "03 Attesa Parti";

        } else if (j == 1) {
          name_tech = "Francesco Greco";
          data_intert = '10/10/2020';
          time_insert = '13:20';
          event = 'AMM Note Amministrazione';
          status = "09 Differita";
        } else if (j == 2) {
          name_tech = "Mario Rossi";
          data_intert = '14/12/2020';
          time_insert = '09:15';
          event = 'CTES Comunicazione a Tesis';
          status = "21 Per appuntamento";
        } else if (j == 3) {
          name_tech = "Tizio Caio";
          data_intert = '5/01/2021';
          time_insert = '11:00';
          event = 'T.01 Intervento Hw';
          status = "SOSP Sospeso";
        } else if (j == 4) {
          name_tech = "Sempronio Aurelio";
          data_intert = '21/01/2021';
          time_insert = '17:00';
          event = 'T.02 Intervento Sw';
          status = "06 Evasa - Intervento Eseguito";
        }
        note.technical_name = name_tech;
        note.date_insert = data_intert;
        note.time_insert = time_insert;
        note.event_type = event;
        note.status = status;
        note.text = text + j;
        tmp.incident_notes.push(note);
      }
      _return.push(tmp);
    }
    return _return;
  }
}
