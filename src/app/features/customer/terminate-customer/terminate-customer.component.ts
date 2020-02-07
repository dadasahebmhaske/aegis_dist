import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'sa-terminate-customer',
  templateUrl: './terminate-customer.component.html',
  styleUrls: ['./terminate-customer.component.css']
})
export class TerminateCustomerComponent implements OnInit {
  public cpInfo: any;
  public ConsNo: number;
  public cust: any = { RoutId: '', SubAreaId: '' };
  public custTermiData: any = {};
  public designationData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public RouteData: any = [];
  public reason: string;
  public SubAreaArray: any = [];
  public SubAreaData: any = [];
  public terminateList: any = {};
  constructor(private appService: AppService, private customerService: CustomerService, private masterService: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.allOnLoad()
    this.custTermiData = [{}];
  }
  allOnLoad() {
    this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.RouteData = resR.Data;
    });
    this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA: any) => {
      if (reSA.StatusCode != 0) {
        this.SubAreaArray = reSA.Data;
      }
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer list.xlsx';
    let columnDefs = [];
    // this.gridOptions.multiSelect = true;
    // this.gridOptions.enableRowSelection = true;
    // this.gridOptions.enableSelectAll = true;
    // this.gridOptions.enableRowHeaderSelection = true;
    this.gridOptions.selectionRowHeaderWidth = 35;
    columnDefs = [
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ng-if="row.entity.IsActive!=null">Update</button> '
      //   , width: "63",exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Update</div>', enableFiltering: false
      // },
      { name: 'ConsId', displayName: 'ConsId', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'ConsNo', displayName: 'Customer No.', width: "*", cellTooltip: true, filterCellFiltered: true },
      // { name: 'Salutation', displayName: 'Salutation', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'LatName', displayName: 'Last Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    //this.onLoad();
  }
  onEditFunction = ($event) => {
    console.log($event.row);
    //this.datashare.updateShareData($event.row);
  }
  getSubArea() {
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.cust.RoutId, 'RouteId');
  }
  onSubmitArea() {
    this.loaderbtn = false;
    this.cust.CustNoMob = this.cust.CustNoMob == null ? '' : this.cust.CustNoMob;
    if (this.cust.CustNoMob == '') {
      this.cust.MobileNo = '';
      this.cust.ConsNo = '';
    } else if (this.cust.CustNoMob.length == 10) {
      this.cust.MobileNo = this.cust.CustNoMob;
      this.cust.ConsNo = '';
    } else {
      this.cust.ConsNo = this.cust.CustNoMob;
      this.cust.MobileNo = '';
    }
    this.customerService.getCustomer(this.cpInfo.CPCode, this.cust.SubAreaId, this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.custTermiData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.custTermiData = [{}]; }
    });
  }
  onTerminate() {
    this.loaderbtn = false;
    // this.terminateList.Flag = 'IN';
    let forData = [];
    if (sessionStorage.row != null) {
      let data = JSON.parse(sessionStorage.row);
      for (let i = 0; i < data.length; i++) {
        forData.push({ Id: '', ConsId: data[i].ConsId, AdminRemark: '' });
      }
      this.terminateList.data = forData;
      sessionStorage.row = null;
    }
    this.terminateList.CPCode = this.cpInfo.CPCode;
    this.terminateList.UserCode = this.cpInfo.EmpId;
    this.terminateList.IsActive = 'Y';
    this.terminateList.Status = 'P';
    this.customerService.postCustomeTerminate(this.terminateList).subscribe((resp: any) => {
      this.loaderbtn = true;
      if (resp.StatusCode != 0) {
        if (resp.Data.length != 0)
          AppComponent.SmartAlert.Success(resp.Message);
        this.custTermiData = [{}];
        this.terminateList.ReqRemark = {};
        this.cust = { RoutId: '', SubAreaId: '' };
      } else {
        AppComponent.SmartAlert.Errmsg(resp.Message);
        this.custTermiData = [{}];
      }
    });
  }
}