import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-daily-stock-register',
  templateUrl: './daily-stock-register.component.html',
  styleUrls: ['./daily-stock-register.component.css']
})
export class DailyStockRegisterComponent implements OnInit {
  public state: any = {
    tabs: {
      demo1: 0,
      demo2: 'tab-r1',
      demo3: 'hr1',
      demo4: 'AA',
      demo5: 'iss1',
      demo6: 'l1',
      demo7: 'tab1',
      demo8: 'hb1',
      demo9: 'A1',
      demo10: 'is1'
    },}
  constructor() { }

  ngOnInit() {
  }

}
