import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {MasterService} from '../../../core/custom-services/master.service';
import {SubareaService} from './subarea.service';
@Component({
  selector: 'sa-sub-area',
  templateUrl: './sub-area.component.html',
  styleUrls: ['./sub-area.component.css']
})
export class SubAreaComponent implements OnInit, OnDestroy { 
  private route:any=[];
  public subArea:any={};
  private slect:boolean=true;
    constructor(private datashare:DatashareService,private subarea:SubareaService,private masters:MasterService) { }
    ngOnInit() {
      this.getRoutes();
      this.datashare.GetSharedData.subscribe(data => this.subArea = data==null?{}:data);
    }
    private getRoutes(){
      this.route=this.masters.getRoutes();
      // this.masters.getRoutes().subscribe(resData:any=>{      
      //   if(resData.StatusCode!=0)
       // this.route=resData.Data;  
      // }); 
    }
    private onSubmit(){
      this.subArea.Flag=this.subArea.SubAreaId==null?'IN':'UP';
      this.subArea.IsActive = this.subArea.IsActive == false ? 'N' : 'Y';
      this.subarea.postSubArea(this.subArea).subscribe(resData=>{
        if(resData.StatusCode!=0){
          AppComponent.SmartAlert.Success(resData.Message);
        //  AppComponent.Router.navigate(['/master/sub-area-master']);
      }
        else{AppComponent.SmartAlert.Errmsg(resData.Message);}
      }); 
    }
    ngOnDestroy(){
      this.datashare.updateShareData(null);    
    }
  
  }
  