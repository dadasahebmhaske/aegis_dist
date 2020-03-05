import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-godown-master',
  templateUrl: './godown-master.component.html',
  styleUrls: ['./godown-master.component.css']
})
export class GodownMasterComponent implements OnInit {
  public cpInfo: any;
  public gridOptions: IGridoption;
  public godownData: any;
  constructor(private appService: AppService, private datashare: DatashareService, private masters: MasterService) {

  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();

  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Godown list.xlsx';
    this.gridOptions.selectionRowHeaderWidth = 0;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.IsActive!=null"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> '
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      { name: 'GodownId', displayName: 'Godown ID', cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'GodownName', displayName: 'Godown', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'Capacity', displayName: 'Capacity', cellClass: 'cell-right', width: "90", cellTooltip: true, filterCellFiltered: true },
      { name: 'ContactName', displayName: 'Contact Name', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'ContactNo', displayName: 'Contact No.', cellClass: 'cell-center', width: "110", cellTooltip: true, filterCellFiltered: true },
      { name: 'LicNo', displayName: 'License No.', cellClass: 'cell-center', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'LicIssueDate', displayName: 'LicIssue Date', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'LicExpDate', displayName: 'LicExp Date', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'LastAuditDate', displayName: 'Last Audit Date', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'GodownTypeName', displayName: 'Godown Type', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'LeasePeriod', displayName: 'Lease Period', cellClass: 'cell-right', width: "110", cellTooltip: true, filterCellFiltered: true },
      { name: 'Startdate', displayName: 'Start Date', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'EndDate', displayName: 'End Date', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "80", cellTooltip: true, filterCellFiltered: true },



      // GodownTypeId: 1045



    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/godown']);
  }
  onLoad() {
    this.masters.getGodowns(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.godownData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.godownData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
}
