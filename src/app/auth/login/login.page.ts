import { TabsPage } from './../../tabs/tabs.page';
import { Tab1Page } from './../../tab1/tab1.page';
import { TabsPageModule } from './../../tabs/tabs.module';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { LoadingService } from 'src/app/loading-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private loadingW: LoadingService) { }

  ngOnInit() {

  }

  login(form) {
    this.loadingW.present();
    this.authService.login(form.value).subscribe((res) => {
      localStorage.setItem('token', res.id);
      this.loadingW.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true })
    },
      (err) => {
        this.loadingW.dismiss();
        alert('Login fallito, Riprovare!')
      });
  }

}
