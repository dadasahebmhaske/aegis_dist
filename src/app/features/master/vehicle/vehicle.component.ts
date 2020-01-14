import { Component, OnInit } from '@angular/core';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {AppComponent} from '../../../app.component';
import {VehicleService} from './vehicle.service';
@Component({
  selector: 'sa-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
private vehicle:any={};
constructor(private datashare:DatashareService,private vehicleService:VehicleService) { }
ngOnInit() {
  this.datashare.GetSharedData.subscribe(data => this.vehicle = data==null?{}:data);
}
private onSubmit(){
  alert('vehicle');
  this.vehicle.Flag=this.vehicle.VehicleId==null?'IN':'UP';
  this.vehicle.IsActive = this.vehicle.IsActive == false ? 'N' : 'Y';
  this.vehicleService.postVehicle(this.vehicle).subscribe(resData=>{
    if(resData.StatusCode!=0){
      AppComponent.SmartAlert.Success(resData.Message);
    //  AppComponent.Router.navigate(['/master/bank-grid']);
  }
    else{AppComponent.SmartAlert.Errmsg(resData.Message);}
  }); 
}
private onSubmitDocs(){
  alert('docs');
}
ngOnDestroy(){
  this.datashare.updateShareData(null);    
}

}
