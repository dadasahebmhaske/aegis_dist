import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {MasterService} from '../../../core/custom-services/master.service';
import {SubareaService} from './subarea.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-sub-area',
  templateUrl: './sub-area.component.html',
  styleUrls: ['./sub-area.component.css']
})
export class SubAreaComponent implements OnInit, OnDestroy { 
  public cpInfo:any;
  public loaderbtn:boolean=true;
  private route:any=[];
  public subArea:any={RouteId:''};
  private setd:boolean=true;
    constructor(private appService:AppService,private datashare:DatashareService,private subarea:SubareaService,private masters:MasterService) { }
    ngOnInit() {
      this.getRoutes();
      this.datashare.GetSharedData.subscribe(data => this.subArea = data==null?{}:data);
      this.appService.getAppData().subscribe(data=>{this.cpInfo=data});
    }
    private getRoutes(){
      this.masters.getRoutes().subscribe((resData:any)=>{      
        if(resData.StatusCode!=0)
       this.route=resData.Data;  
      }); 
    }
    private onSubmit(){
      this.loaderbtn=false;
      this.subArea.Flag=this.subArea.SubAreaId==null?'IN':'UP';
      this.subArea.CPCode=this.cpInfo.CPCode;
      this.subArea.UserCode=this.cpInfo.EmpId;
      this.subArea.SubAreaId=this.subArea.SubAreaId==null?'':this.subArea.SubAreaId;
      let ciphertext=this.appService.getEncrypted(this.subArea);
      this.subarea.postSubArea(ciphertext).subscribe((resData:any)=>{
        this.loaderbtn=true;
        if(resData.StatusCode!=0){
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/master/sub-area-master']);
      }
        else{AppComponent.SmartAlert.Errmsg(resData.Message);}
      }); 
    }
    ngOnDestroy(){
      this.datashare.updateShareData(null);    
    }
  
  }
  