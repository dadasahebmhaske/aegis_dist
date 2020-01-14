import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import {DatashareService} from '../../../core/custom-services/datashare.service';
import {MasterService} from '../../../core/custom-services/master.service';
@Component({
  selector: 'sa-sub-area-master',
  templateUrl: './sub-area-master.component.html',
  styleUrls: ['./sub-area-master.component.css']
})
export class SubAreaMasterComponent implements OnInit {
  private gridOptions: IGridoption;
  private subAreaData:any;
  constructor(private datashare:DatashareService,private masters:MasterService) {
  }
  ngOnInit() {   
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
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'RouteID', displayName: 'Route ID', width: "*", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'SubAreaName', displayName: 'Sub Area Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'RouteName', displayName: 'Route Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
   // console.log($event.row);
this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/sub-area']);
  }
  onLoad() {
    this.subAreaData=this.masters.getSubArea();
    AppComponent.SmartAlert.Success('2 records found successfully');
    // this.masters.getSubArea().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
     // this.subAreaData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}
