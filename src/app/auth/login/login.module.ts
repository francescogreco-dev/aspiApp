import { ShowHidePasswordComponent } from './../../components/show-hide-password/show-hide-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ShowHidePasswordComponentModule } from 'src/app/components/show-hide-password/show-hide-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ShowHidePasswordComponentModule
  ], exports: [ShowHidePasswordComponentModule],
  declarations: [LoginPage]
})
export class LoginPageModule { }
