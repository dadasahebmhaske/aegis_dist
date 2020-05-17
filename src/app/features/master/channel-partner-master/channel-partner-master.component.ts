import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { ChannelPartnerService } from '../channel-partner/channel-partner.service';
@Component({
  selector: 'sa-channel-partner-master',
  templateUrl: './channel-partner-master.component.html',
  styleUrls: ['./channel-partner-master.component.css']
})
export class ChannelPartnerMasterComponent implements OnInit {

  public cpInfo: any;
  public gridOptions: IGridoption;
  public empData: any = {};
  constructor(private appService: AppService, private channelPartnerService: ChannelPartnerService, private datashare: DatashareService, private masterService: MasterService) {

  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Channel Partner list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">&nbsp;Edit&nbsp;</button> '
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      // { name: 'EmpId', displayName: 'Emp ID', cellClass: 'cell-center', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      // { name: 'FirstName', displayName: 'First Name', width: "180", cellTooltip: true, filterCellFiltered: true },
      // { name: 'LastName', displayName: 'Last Name', width: "180", cellTooltip: true, filterCellFiltered: true },
      // { name: 'RoleCode', displayName: 'Designation', width: "150", cellTooltip: true, filterCellFiltered: true },
      // { name: 'Salary', displayName: 'Salary', cellClass: 'cell-right', width: "130", cellTooltip: true, filterCellFiltered: true },
      // { name: 'Gender', displayName: 'Gender', width: "110", cellTooltip: true, filterCellFiltered: true, visible: false },
      // { name: 'DateOfBirth', displayName: 'Date Of Birth', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      // { name: 'EmailId', displayName: 'Email Id', width: "200", cellTooltip: true, filterCellFiltered: true },
      // { name: 'MobileNo', displayName: 'Mobile No.', cellClass: 'cell-center', width: "110", cellTooltip: true, filterCellFiltered: true },
      // { name: 'AltrMobileNo', displayName: 'Altr Mobile No.', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
      // { name: 'BloodGrp', displayName: 'Blood Group', width: "120", cellTooltip: true, filterCellFiltered: true },
      // { name: 'Qualification', displayName: 'Qualification', width: "130", cellTooltip: true, filterCellFiltered: true },
      // { name: 'IsActive', displayName: 'Active', cellClass: 'cell-center', width: "90", cellTooltip: true, filterCellFiltered: true },
    
      
      { name: 'CPCode', displayName: 'Channel Partner Code',cellClass: 'cell-center', width: '200', cellTooltip: true, filterCellFiltered: true, },
      { name: 'SAPId', displayName: 'SAP ID', width: '170', cellTooltip: true, filterCellFiltered: true },
      { name: 'CPName', displayName: 'Channel Partner Name', width: '350', cellTooltip: true, filterCellFiltered: true },
      { name: 'CPContactNo', displayName: 'Contact No.',cellClass: 'cell-center', width: '170', cellTooltip: true, filterCellFiltered: true },
      { name: 'Channel', displayName: 'Channel', width: '270', cellTooltip: true, filterCellFiltered: true },
      { name: 'CPType', displayName: 'Channel Partner Type', width: '270', cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'ROType', displayName: 'RO Type', width: '270', cellTooltip: true, filterCellFiltered: true },
      { name: 'PackType', displayName: 'Pack Type', width: '270', cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/master/channel-partner']);
  }

  onLoad() {
    this.channelPartnerService.getChannelPartner().subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.empData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.empData = [{}]; }
    });
  }

}