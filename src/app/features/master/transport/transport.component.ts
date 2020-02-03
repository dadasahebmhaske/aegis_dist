import { Component, OnInit } from '@angular/core';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {AppComponent} from '../../../app.component';
import {TransportService} from './transport.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  public cpInfo:any;
  public transport:any={};
  public loaderbtn:boolean=true;
  constructor(private appService:AppService,private datashare:DatashareService,private transportService:TransportService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.transport = data==null?{}:data);
    this.appService.getAppData().subscribe(data=>{this.cpInfo=data});
  }
  public onSubmit(){
    this.loaderbtn=false;
    this.transport.Flag=this.transport.VehicleTypeId==null?'IN':'UP';
    this.transport.CPCode=this.cpInfo.CPCode;
    this.transport.UserCode=this.cpInfo.EmpId;
    this.transport.VehicleTypeId=this.transport.VehicleTypeId==null?'':this.transport.VehicleTypeId;
    this.transport.TransChk=1;
    let ciphertext=this.appService.getEncrypted(this.transport);
    this.transportService.postTransport(ciphertext).subscribe((resData:any)=>{
      if(resData.StatusCode!=0){
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/master/transport-master']);
    }
      else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    }); 
  }
  ngOnDestroy(){
    this.datashare.updateShareData(null);    
  }

}
