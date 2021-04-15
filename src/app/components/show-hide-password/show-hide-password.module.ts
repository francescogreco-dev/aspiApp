import { ShowHidePasswordComponent } from './show-hide-password.component';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [ShowHidePasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ShowHidePasswordComponent]
})
export class ShowHidePasswordComponentModule { }
