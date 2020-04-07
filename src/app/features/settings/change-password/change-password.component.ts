import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public pass:any={};
  public loaderbtn:boolean=true;
  constructor() { }

  ngOnInit() {
  }

}
