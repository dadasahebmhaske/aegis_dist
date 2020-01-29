import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
@Component({
  selector: 'sa-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.css']
})
export class VehicleMasterComponent implements OnInit {
  public gridOptions: IGridoption;
  public vehicleData: any;
  constructor(public datashare: DatashareService, public masters: MasterService) {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Vehicle Master list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
        , width: "48",
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'VehicleID', displayName: 'Vehicle ID', width: "*", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'VehicleNo', displayName: 'Vehicle No', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'VehicleType', displayName: 'Vehicle Type', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'CylCapacity', displayName: 'Cylinder Capacity', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'LastFitnessDate', displayName: 'Last Fitness Date', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'Insurance', displayName: 'Insurance Done', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'InsuranceRenewalDate', displayName: 'Insurance Renewal Date', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/vehicle']);
  }
  onLoad() {
    this.vehicleData = this.masters.getVehicles();
    // this.masters.getVehicles().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
    // this.vehicleData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}


