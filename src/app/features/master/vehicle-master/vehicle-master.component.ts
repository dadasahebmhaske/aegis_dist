import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.css']
})
export class VehicleMasterComponent implements OnInit {
  public cpInfo: any = {};
  public gridOptions: IGridoption;
  public vehicleData: any;
  public ProductArray: any = [];
  constructor(private appService: AppService, public datashare: DatashareService, public masters: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.selectionRowHeaderWidth = 0;
    this.gridOptions.exporterExcelFilename = 'Vehicle Master list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)" ng-if="row.entity.IsActive!=null"  >&nbsp;Edit&nbsp;</button> '
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select1', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.IsActive=='Y'"   ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;Product&nbsp;</button> `
        , width: "71", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      //{ name: 'VehicleID', displayName: 'Vehicle ID', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'VehicleNo', displayName: 'Vehicle No', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'VehicleType', displayName: 'Vehicle Type', width: "*", cellTooltip: true, filterCellFiltered: true },
      // { name: 'CylCapacity', displayName: 'Cylinder Capacity', cellClass: 'cell-right', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'LastFitnessDate', displayName: 'Last Fitness Date', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsInsurance', displayName: 'Insurance Done', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'InsRenewalDate', displayName: 'Insurance Renewal Date', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/vehicle']);
  }
  onDeleteFunction = ($event) => {
    let vehInfo = $event.row;
    this.masters.getVehicaleProductDetails(this.cpInfo.CPCode, vehInfo.VehicleId).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        this.ProductArray = resp.Data;
        $('#productsModal').modal('show');
      } else { AppComponent.SmartAlert.Errmsg(resp.Message); }
    });
  }

  onLoad() {
    this.masters.getVehicles(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.vehicleData = resData.Data; console.log(this.vehicleData);
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.vehicleData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

}


