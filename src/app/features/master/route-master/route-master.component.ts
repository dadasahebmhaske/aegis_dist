import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-route-master',
  templateUrl: './route-master.component.html',
  styleUrls: ['./route-master.component.css']
})
export class RouteMasterComponent implements OnInit {
  public cpInfo: any = {};
  public gridOptions: IGridoption;
  public routeData: any;
  constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();

  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Route list.xlsx';
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.IsActive!=null"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'RouteId', displayName: 'Route ID', cellClass: 'cell-center', width: "*", cellTooltip: true,visible:false, filterCellFiltered: true },
      { name: 'RouteName', displayName: 'Route', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/route']);
  }
  onLoad() {
    this.masters.getRoutes(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.routeData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.routeData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

}
