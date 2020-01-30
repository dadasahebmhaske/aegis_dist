import { Component } from '@angular/core';
import * as CryptoJs from '../../node_modules/crypto-js';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import {NotificationService} from './../app/core/services/notification.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
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
  ngOnInit(){
    window.addEventListener('storage', (event) => {
      // if(event.oldValue !=  event.newValue){
      //   AppComponent.SmartAlert.bigBox({
      //     title: `Something went wrong`,
      //     content: "Security reason please sign in!",
      //     color: "#C46A69",
      //     icon: "fa fa-thumbs-up animated bounce ",
      //     number: "1",
      //     timeout: 6000
      //   });
      //   localStorage.clear();
      //   AppComponent.Router.navigate(['/auth/login']);
      // }
      if (event.storageArea == localStorage) {
        let appData = localStorage.getItem('appData');
        if(appData == undefined) { 
            this.router.navigate(['/auth/login']);        
          location.reload();            
        }
      }
    }, false);
  }
}
