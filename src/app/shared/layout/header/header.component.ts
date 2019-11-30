import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  searchMobileActive = false;

  toggleSearchMobile(){
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
}
