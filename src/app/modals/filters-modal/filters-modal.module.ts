import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersModalPageRoutingModule } from './filters-modal-routing.module';

import { FiltersModalPage } from './filters-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersModalPageRoutingModule
  ],
  declarations: [FiltersModalPage]
})
export class FiltersModalPageModule {}
