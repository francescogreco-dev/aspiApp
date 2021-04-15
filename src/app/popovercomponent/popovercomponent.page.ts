import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {
  @Input() status: string;
  @Input() close_date: string;
  @Input() time_arrived: string;
  @Input() time_finish: string;
  @Input() time_travel: string;
  @Input() type: string;
  @Input() signatory: string;
  @Input() incident_closure_note: string;

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }

  ClosePopover() {
    this.popover.dismiss();
  }

  ModifyPopover() {
    this.popover.dismiss({
      'status': this.status,
      'close_date': this.close_date,
      'time_arrived': this.time_arrived,
      'time_finish': this.time_finish,
      'time_travel': this.time_travel,
      'type': this.type,
      'signatory': this.signatory,
      'incident_closure_note': this.incident_closure_note
    });
  }

}
