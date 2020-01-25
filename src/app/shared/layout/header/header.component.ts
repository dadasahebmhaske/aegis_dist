import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store}from "@ngrx/store";
import {getUser,AuthState} from './../../../core/store/auth';
import {pipe} from 'rxjs';
import { AppService } from '@app/core/custom-services/app.service';


declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styles:[`#header>:first-child, aside {
    width: 77px;}
#logo {width: 77px;
  margin-top: 3px !important;
  margin-left: 9px;
}
#logo img {
  width: 44px;
  height: auto;
  padding-left: 3px;
}.toll {
  margin: 11px 0;
}.welcome{margin
:16px 0;}`]
})
export class HeaderComponent implements OnInit {
private cpInfo:any;
  constructor(private router: Router,private appService:AppService) {
  }

  ngOnInit() {
  //   this.userval=this.store.pipe(getUser);
  // alert(this.userval);
  this.appService.getAppData().subscribe(data=>{this.cpInfo=data});
  }


  searchMobileActive = false;

  toggleSearchMobile(){
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
  logout(){
    localStorage.clear();
    this.appService.setProperty(null,false);
    this.router.navigate(['/auth/login']);
   
  }
}
