  import { Component, OnInit } from '@angular/core';
  import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
  import { AppComponent } from '../../../app.component';
  import { DatashareService } from '../../../core/custom-services/datashare.service';
  import { MasterService } from '../../../core/custom-services/master.service';
  import { AppService } from '@app/core/custom-services/app.service';
  @Component({
    selector: 'sa-route-mapping-master',
    templateUrl: './route-mapping-master.component.html',
    styleUrls: ['./route-mapping-master.component.css']
  })
  export class RouteMappingMasterComponent implements OnInit {
    public cpInfo: any = {};
    public chantype:any=[]; 
    public gridOptions: IGridoption;
    public loaderbtn: boolean = true;
    public mapFilter: any = {};
    public routeMappingData: any;
    constructor(private appService: AppService, public datashare: DatashareService, public masterService: MasterService) {
    }
    ngOnInit() {
      this.appService.getAppData().subscribe(data => { this.cpInfo = data;this.mapFilter.CPCode= this.cpInfo.CPCode; });
     this.allOnLoad();
      this.configureGrid();
    }
    allOnLoad() {
      this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
        if (resCP.StatusCode != 0)
          this.chantype = resCP.Data;
          this.chantype.unshift(  {CPCode: this.cpInfo.CPCode,CPName: this.cpInfo.CPName});
      });
    }
    configureGrid() {
      this.gridOptions = <IGridoption>{}
      this.gridOptions.exporterMenuPdf = false;
      this.gridOptions.exporterExcelFilename = 'Route Mapping Master list.xlsx';
      this.gridOptions.selectionRowHeaderWidth = 0;
      let columnDefs = [];
      columnDefs = [
        {
          name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.IsActive!=null" ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
          , width: "48", exporterSuppressExport: true,
          headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
        },
        { name: 'RouteName', displayName: 'Route Name', width: "*", cellTooltip: true, filterCellFiltered: true },
        { name: 'SubAreaName', displayName: 'Sub Area Name', width: "*", cellTooltip: true, filterCellFiltered: true },
        { name: 'CPName', displayName: 'Channel Partner Name', width: "*", cellTooltip: true, filterCellFiltered: true },
       { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true },
      ]
     this.gridOptions.columnDefs = columnDefs;
      this.onLoad();
    }
    onEditFunction = ($event) => {
      this.datashare.updateShareData($event.row);
      AppComponent.Router.navigate(['/master/route-mapping']);
    }
    onLoad() {
      this.loaderbtn=false;  
      this.masterService.getRouteMapping(this.mapFilter.CPCode).subscribe((resData: any) => {
        this.loaderbtn=true;  
        if (resData.StatusCode != 0) {
          this.routeMappingData = resData.Data;  
          AppComponent.SmartAlert.Success(resData.Message);
        }
        else { this.routeMappingData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
  
  }
  