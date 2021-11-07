import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrderPageRoutingModule } from './purchase-order-routing.module';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PurchaseOrderPage } from './purchase-order.page';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseOrderPageRoutingModule
  ],
  declarations: [PurchaseOrderPage],
  exports: [PDFGenerator]
})
export class PurchaseOrderPageModule { }
