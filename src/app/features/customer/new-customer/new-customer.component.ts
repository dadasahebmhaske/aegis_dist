import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
public customer:any={};
  constructor() { }

  ngOnInit() {
  }

}
