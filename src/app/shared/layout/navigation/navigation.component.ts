import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import { AppService } from '@app/core/custom-services/app.service';
import { MasterService } from '@app/core/custom-services/master.service';
declare var $: any;

@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public CPSD: any;
  public stockShow:boolean=true;
  constructor(private appService: AppService,private masterService:MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => {
      this.CPSD = data; 
 
      this.stockShow=(this.CPSD.ChannelTypeFlag=='DI'|| this.CPSD.ChannelTypeFlag=='DE') ?true:false;
      console.log(this.stockShow);
      this.getNavMenu();
    });
  }
getNavMenu(){
  let menu=this.CPSD.Menu;
  menu.forEach(element => {
    if($("[formflag="+ element +"]").length > 0){
      $("[formflag="+ element +"]").show();
    }else{
      $("[formflag="+ element +"]").hide();
    }
  });
  // this.masterService.getNavMenu(this.CPSD.RoleCode,this.CPSD.RoleId).subscribe((resData: any) => {
  //   if (resData.StatusCode != 0) {
  //     for(let i=0;i<resData.Data.length;i++){
  //       menu[i] = resData.Data[i].AllowdedMenu;
  //     }
  //     menu.forEach(element => {
  //       if($("[formflag="+ element +"]").length > 0){
  //         $("[formflag="+ element +"]").show();
  //       }else{
  //         $("[formflag="+ element +"]").hide();
  //       }
  //     });
  //   }
  // });
 
}
}
