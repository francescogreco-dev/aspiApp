import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-filter-modal',
  templateUrl: './filters-modal.page.html',
  styleUrls: ['./filters-modal.page.scss'],
})
export class FiltersModalPage implements OnInit {

  @Input() filter: string;
  @Input() clients: [];
  @Input() commons: [];
  @Input() provinces: [];
  @Input() request_dates: [];
  @Input() planned_dates: [];
  public title: string;
  public selected_value: string;
  public field: string;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
    switch (this.filter) {
      case 'province':
        this.title = 'Provincia';
        break;
      case 'client':
        this.title = 'Cliente';
        break;
      case 'request_date':
        this.title = 'data richiesta';
        break;
      case 'planned_date':
        this.title = 'data pianifica';
        break;
      case 'common':
        this.title = 'comune';
        break;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'selected_value': this.selected_value,
      'field': this.field
    });
  }

  Getselected(selected_value: string, field: string) {
    this.selected_value = selected_value;
    this.field = field;
  }

}
