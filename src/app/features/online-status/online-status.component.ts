
import { Component,Input, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'sa-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.css']
})
export class OnlineStatusComponent implements OnInit,AfterContentChecked {

  @Input() onlineStatusMessage: string;
  @Input() onlineStatus: string;
  public flag:string='O';
  constructor() { }
  ngAfterContentChecked(){
    if(this.onlineStatus ==='online'&& this.flag=='F')
    {this.flag='O';
    location.reload();}
    if(this.onlineStatus === 'offline')
    this.flag='F';
  }
  ngOnInit() {
  }

}