import { Component } from '@angular/core';
import * as CryptoJs from '../../node_modules/crypto-js';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import {NotificationService} from './../app/core/services/notification.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'sa';
  static BaseUrl;
  static BaseUrlDist;
  static headers:HttpHeaders;
  static httpOptions;
  static ImagePath;  
  static Router:Router; 
  static secureKey;
  static SmartAlert:NotificationService;
  constructor(public router:Router,public SmartAlert:NotificationService){
  AppComponent.httpOptions={headers:new HttpHeaders({
    'content-Type':'application/json',Authorization:'Basic '+btoa(environment.authKey)
  })};
    // AppComponent.headers=new HttpHeaders({
    //   'content-Type':'application/json',Authorization:'Basic '+btoa(environment.authKey)
    // });
    AppComponent.BaseUrl=environment.BaseUrl;  
    AppComponent.BaseUrlDist=environment.BaseUrlDist;
    AppComponent.Router=router;
    AppComponent.SmartAlert=SmartAlert;
    AppComponent.secureKey=CryptoJs.enc.Utf8.parse(environment.secureKey);
  }
}
