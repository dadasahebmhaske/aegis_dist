import { Component, OnInit,OnDestroy } from '@angular/core';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {AppComponent} from '../../../app.component';
import { RouteService } from './route.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit, OnDestroy {
public route:any={};
public cpInfo:any;
public loaderbtn:boolean=true;
  constructor(public appService:AppService,public datashare:DatashareService,public routeService:RouteService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.route = data==null?{IsActive:'Y'}:data);
    //this.route==null?this.route={}:this.route;
    console.log(this.route);
    this.appService.getAppData().subscribe(data=>{this.cpInfo=data});
  }
  public onSubmit(){  
    this.loaderbtn=false;
    this.route.Flag=this.route.RouteId==null?'IN':'UP';
    this.route.RouteId=this.route.RouteId==null?'':this.route.RouteId;
    this.route.CPCode=this.cpInfo.CPCode;
    this.route.UserCode=this.cpInfo.EmpId; 
    let ciphertext=this.appService.getEncrypted(this.route);
    this.routeService.postRoute(ciphertext).subscribe((resData:any)=>{
      this.loaderbtn=true;
      if(resData.StatusCode!=0){
        AppComponent.SmartAlert.Success(resData.Message);
      AppComponent.Router.navigate(['/master/route-master']);
    }
      else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    }); 
  }
  ngOnDestroy(){
    this.datashare.updateShareData(null);    
  }
}
