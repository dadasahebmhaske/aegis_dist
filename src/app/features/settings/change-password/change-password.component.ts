import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/custom-services/app.service';

@Component({
  selector: 'sa-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public cpInfo:any={};
  public pass:any={};
  public loaderbtn:boolean=true;
  public errorMsg:boolean=false;
  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data; });
  }
  checkingCurrentPassword  () {
    this.errorMsg=this.pass.CurrentPassword != this.cpInfo.Password?true:false;
}

}
