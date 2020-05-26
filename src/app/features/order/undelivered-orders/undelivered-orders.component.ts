import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { OrderService } from '../order.service';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
@Component({
  selector: 'sa-undelivered-orders',
  templateUrl: './undelivered-orders.component.html',
  styleUrls: ['./undelivered-orders.component.css']
})
export class UndeliveredOrdersComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public DeliveredOrderData: any = [];
  public deliverFilter: any = { DelUserCode: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public delBoyData: any = [];
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public ProductArray: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private datashare: DatashareService, private masterService: MasterService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.deliverFilter.StartDate = this.deliverFilter.EndDate = new Date();
    this.configureGrid();
    this.allOnLoad();
  }
  allOnLoad() {
    this.masterService.getEmpoyeeDelBoy(this.cpInfo.CPCode).subscribe((respD: any) => {
      if (respD.StatusCode != 0)
        this.delBoyData = respD.Data;
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Declined / Cancelled Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ConsNo !=null"  ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
        , width: "71", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      { name: 'ConsNo', displayName: 'Customer No.', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsName', displayName: 'Customer Name', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', cellClass: 'cell-center', width: "110", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area Name', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoNo', displayName: 'Cash Memo No.', cellClass: 'cell-center', width: "135", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoDate', displayName: 'Cash Memo Date', cellClass: 'cell-center', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'DelDate', displayName: 'Undelivery Date', cellClass: 'cell-center', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'AppName', displayName: 'App', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'DelUserName', displayName: 'Undelivered By', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'ReturnReason', displayName: 'Reason', width: "250", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = (event) => {
    console.log(event.row);
    this.orderService.getRefillDeliveryProductDetails(this.cpInfo.CPCode, event.row.DelRefNo).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.ProductArray = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
        $('#productsModal').modal('show');
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onLoad() {
    this.loaderbtn=false;
    this.deliverFilter = this.customerService.checkCustOrMobNo(this.deliverFilter);
    this.orderService.getRefillDeliveryDetails(this.cpInfo.CPCode, 5, this.deliverFilter, this.appService.DateToString(this.deliverFilter.StartDate), this.appService.DateToString(this.deliverFilter.EndDate)).subscribe((resData: any) => {
      this.loaderbtn=true;
      if (resData.StatusCode != 0) {
        this.DeliveredOrderData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.DeliveredOrderData = [{}]; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.deliverFilter.EndDate != null) {
      if ((new Date(this.deliverFilter.EndDate).getTime()) < (new Date(val).getTime())) {
        this.deliverFilter.EndDate = '';
      }
    }
  }
  ngOnDestroy() {
    this.appService.removeBackdrop();
  }

}