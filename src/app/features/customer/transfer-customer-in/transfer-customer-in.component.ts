import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import Swal from 'sweetalert2'
import { CustomerService } from '../customer.service';
import { AppService } from '@app/core/custom-services/app.service';
@Component({
  selector: 'sa-transfer-customer-in',
  templateUrl: './transfer-customer-in.component.html',
  styleUrls: ['./transfer-customer-in.component.css']
})
export class TransferCustomerInComponent implements OnInit {
  public acceptCustData: any = {};
  public acceptCust: any = [];
  public cpInfo: any;
  public customerInData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = false;
  public status: any = "PE";
  constructor(private appService: AppService, private customerService: CustomerService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer Transfer In list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Edit', cellTemplate: '<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Accept&nbsp;</button> '
        , width: "65", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Accept</div>', enableFiltering: false
      },
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-danger btn-xs" ng-click="grid.appScope.deleteEmployee(row.entity)"  >&nbsp;Reject&nbsp;</button> ' //data- toggle="modal" data - target="#productsModal"
        , width: "61", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Reject</div>', enableFiltering: false
      },

      { name: 'OldCPCode', displayName: 'CP Code', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'OldCP', displayName: 'Channel Partner Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsName', displayName: 'Customer Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "110", cellTooltip: true, filterCellFiltered: true },
      { name: 'TransReqDate', displayName: 'Transfer Out Date', width: "140", cellTooltip: true, filterCellFiltered: true },
      { name: 'TransferInDate', displayName: 'Transfer In Date', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ReqRemark', displayName: 'Reason', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to accept this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.acceptCust.push({ Id: '', ConsId: $event.row.TransferId, });
        this.acceptCustomer();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }
  acceptCustomer() {
    this.loaderbtn = false;
    this.acceptCustData.data = this.acceptCust;
    this.acceptCustData.NewCPCode = this.cpInfo.CPCode;
    this.acceptCustData.AcptRejBy = this.cpInfo.EmpName;
    this.acceptCustData.IsTransfer = 'AC';
    this.acceptCustData.IsActive = 'Y';
    this.acceptCustData.UserCode = this.cpInfo.EmpId;

    this.acceptCustData.OldCPCode = null;
    this.acceptCustData.RequestBy = null;
    this.acceptCustData.AdminRemrk = null;
    this.acceptCustData.ApproveBy = null;
    this.acceptCustData.NewConsNo = null;
    this.acceptCustData.RejectRemark = null;
    this.customerService.postCustomeTransfer(this.acceptCustData).subscribe((resp: any) => {
      this.loaderbtn = true;
      if (resp.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resp.Message);
        this.acceptCust = [];
        this.acceptCustData = {};
      } else {
        AppComponent.SmartAlert.Errmsg(resp.Message);
        this.acceptCust = [];
      }
    });
  }
  onDeleteFunction = ($event) => {
    // console.log($event.row);
    //AppComponent.Router.navigate(['/stock/stock-orders']);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to reject this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        $('#productsModal').modal('show');

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }
  onLoad() {
    this.loaderbtn = false;
    this.customerService.getCustomerIn(this.cpInfo.CPCode, 'AP').subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.customerInData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.customerInData = [{}]; }
    });
  }

}