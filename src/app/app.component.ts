import { Component, OnDestroy } from '@angular/core';
import * as CryptoJs from '../../node_modules/crypto-js';
import { HttpHeaders } from '@angular/common/http';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { environment } from '@env/environment';
import { NotificationService } from './../app/core/services/notification.service';
import { OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet><ng-container *ngIf="loading">
  <img class="loader-center" src="assets/img/loader.gif">
</ng-container>
<sa-online-status
  [onlineStatusMessage]="connectionStatusMessage"
  [onlineStatus]="connectionStatus">
</sa-online-status>`,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sa';
  static BaseUrl;
  static BaseUrlDist;
  static headers: HttpHeaders;
  static httpOptions;
  static ImageUrl;
  static ImageUrlDist;
  static DeptId;
  static Router: Router;
  static secureKey;
  static SmartAlert: NotificationService;
  public loading: boolean = false;

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  constructor(public router: Router, public SmartAlert: NotificationService) {
    AppComponent.httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json', Authorization: 'Basic ' + btoa(environment.authKey)
      })
    };
    AppComponent.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });
    AppComponent.BaseUrl = environment.BaseUrl;
    AppComponent.BaseUrlDist = environment.BaseUrlDist;
    AppComponent.DeptId = environment.deptId;
    AppComponent.ImageUrl = environment.ImageUrl;
    AppComponent.ImageUrlDist=environment.ImageUrlDist;
    AppComponent.Router = router;
    AppComponent.SmartAlert = SmartAlert;
    AppComponent.secureKey = CryptoJs.enc.Utf8.parse(environment.secureKey);

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading = false;
        window.scrollTo(0, 0);
      }
    });
    
  }
  ngOnInit() {
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
        if (appData == undefined) {
          this.router.navigate(['/auth/login']);
          location.reload();
        }
      }
    }, false);

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost!  You are not connected to internet';
      this.connectionStatus = 'offline';
    }));

  }
  ngOnDestroy() {
    /**
    * Unsubscribe all subscriptions to avoid memory leak
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
