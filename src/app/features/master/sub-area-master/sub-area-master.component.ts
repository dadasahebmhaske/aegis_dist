import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {MasterService} from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-sub-area-master',
  templateUrl: './sub-area-master.component.html',
  styleUrls: ['./sub-area-master.component.css']
})
export class SubAreaMasterComponent implements OnInit {
  public cpInfo:any={};
  public gridOptions: IGridoption;
  public subAreaData:any;
  constructor(private appService:AppService,public datashare:DatashareService,public masters:MasterService) {
  }
  ngOnInit() { 
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });  
    this.configureGrid();     
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Sub Area Master list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
        , width: "48",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'RouteName', displayName: 'Route Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaId', displayName: 'Sub Area Id', width: "*", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/sub-area']);
  }
  onLoad() {
    this.masters.getSubArea(this.cpInfo.CPCode).subscribe((resData:any)=>{      
      if(resData.StatusCode!=0){
     this.subAreaData=resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
    }
      else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    }); 
  }

}
