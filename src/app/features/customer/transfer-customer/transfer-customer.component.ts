import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'sa-transfer-customer',
  templateUrl: './transfer-customer.component.html',
  styleUrls: ['./transfer-customer.component.css']
})
export class TransferCustomerComponent implements OnInit {
  public cpInfo: any;
  public ConsNo: number;
  public cust: any = { RoutId: '', SubAreaId: '' };
  public custOutData: any = {};
  public designationData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public RouteData: any = [];
  public reason: string;
  public selectedRows: any = [];
  public SubAreaArray: any = [];
  public SubAreaData: any = [];
  public custOutList: any = {};
  constructor(private appService: AppService, private customerService: CustomerService, private masterService: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.allOnLoad()
    this.custOutData = [{}];
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
      { name: 'ConsId', displayName: 'ConsId', width: "*", cellTooltip: true, filterCellFiltered: true, visible: false },
      { name: 'ConsNo', displayName: 'Customer No.', width: "*", cellTooltip: true, filterCellFiltered: true },
      // { name: 'Salutation', displayName: 'Salutation', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'FirstName', displayName: 'First Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'LatName', displayName: 'Last Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;

  }
  onEditFunction = ($event) => {
    //this.datashare.updateShareData($event.row);
  }
  onSelectFunction = ($event) => {
    this.selectedRows = $event.row;
    //this.datashare.updateShareData($event.row);
  }
  getSubArea() {
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.cust.RoutId, 'RouteId');
  }
  onSubmitArea() {
    this.loaderbtn = false;
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.customerService.getCustomer(this.cpInfo.CPCode, this.cust.SubAreaId, this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.custOutData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.custOutData = [{}]; }
    });
  }
  onTransfer() {
    if (this.selectedRows.length > 0 && Object.keys(this.selectedRows[0]).length > 1) {
      this.loaderbtn = false;
      // this.terminateList.Flag = 'IN';
      let forData = [];
      if (this.selectedRows != null) {
        for (let i = 0; i < this.selectedRows.length; i++) {
          forData.push({ Id: '', ConsId: String(this.selectedRows[i].ConsId), ConsNo: this.selectedRows[i].ConsNo });
        }
        this.custOutList.data = forData;
        this.selectedRows = [];
      }
      this.custOutList.OldCPCode = this.cpInfo.CPCode;
      this.custOutList.UserCode = this.cpInfo.EmpId;
      this.custOutList.RequestBy = this.cpInfo.EmpName;
      this.custOutList.IsActive = 'Y';
      this.custOutList.IsTransfer = 'PE';
      this.custOutList.AdminRemrk = null;
      this.custOutList.ApproveBy = null;
      this.custOutList.NewConsNo = null;
      this.custOutList.NewCPCode = null;
      this.custOutList.RejectRemark = null;
      this.custOutList.AcptRejBy = null;
      this.customerService.postCustomeTransfer(this.custOutList).subscribe((resp: any) => {
        this.loaderbtn = true;
        if (resp.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resp.Message);
          this.custOutData = [{}];
          this.custOutList.ReqRemark = '';
          this.cust = { RoutId: '', SubAreaId: '' };
        } else {
          AppComponent.SmartAlert.Errmsg(resp.Message);
          this.custOutData = [{}];
        }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please select atleast one customer`);
    }
  }
}