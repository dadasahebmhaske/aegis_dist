import { Component, OnInit,OnDestroy } from '@angular/core';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {AppComponent} from '../../../app.component';
import { RouteService } from './route.service';
@Component({
  selector: 'sa-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit, OnDestroy {
private route:any={};
  constructor(private datashare:DatashareService,private routeService:RouteService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.route = data==null?{}:data);
    //this.route==null?this.route={}:this.route;
    console.log(this.route);
  }
  private onSubmit(){
    this.route.Flag=this.route.RouteId==null?'IN':'UP';
    this.route.IsActive = this.route.IsActive == false ? 'N' : 'Y';
    this.routeService.postRoute(this.route).subscribe(resData=>{
      if(resData.StatusCode!=0){
        AppComponent.SmartAlert.Success(resData.Message);
      //  AppComponent.Router.navigate(['/master/bank-grid']);
    }
      else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    }); 
  }
  ngOnDestroy(){
    this.datashare.updateShareData(null);    
  }
}
