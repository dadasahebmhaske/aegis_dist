import { Component, OnInit } from '@angular/core';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {AppComponent} from '../../../app.component';
import {TransportService} from './transport.service';
@Component({
  selector: 'sa-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  public transport:any={};
  constructor(public datashare:DatashareService,public transportService:TransportService) { }
  ngOnInit() {
    this.datashare.GetSharedData.subscribe(data => this.transport = data==null?{}:data);
  }
  public onSubmit(){
    this.transport.Flag=this.transport.TransportId==null?'IN':'UP';
    this.transport.IsActive = this.transport.IsActive == false ? 'N' : 'Y';
    this.transportService.postTransport(this.transport).subscribe(resData=>{
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
