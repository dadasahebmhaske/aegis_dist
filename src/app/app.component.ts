import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'sa';
  static BaseUrl;
  static headers:HttpHeaders;
  static ImagePath;  
  static Router:Router; 
  static secureKey;

  constructor(public router:Router){
    AppComponent.headers=new HttpHeaders({
      'content-Type':'application/json',Authorization:'Basic'+btoa(environment.authKey)
    });
    AppComponent.BaseUrl=environment.BaseUrl;  
    AppComponent.Router=router;
  }
}
