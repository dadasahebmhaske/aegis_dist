import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { CustomerService } from '@app/features/customer/customer.service';

@Component({
  selector: 'sa-cash-memo-and-refill-delivery',
  templateUrl: './cash-memo-and-refill-delivery.component.html',
  styleUrls: ['./cash-memo-and-refill-delivery.component.css']
})
export class CashMemoAndRefillDeliveryComponent implements OnInit {
  public AreaData = [];
  public cpInfo: any = {};
  public cmCustData: any = {};
  public cashmemo: any = { areacode: '' };
  public CashMemoData: any = {};
  public cust: any = { RoutId: '', SubAreaId: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public RouteData: any = [];
  public SubAreaArray: any = [];
  public SubAreaData: any = [];

  constructor(private appService: AppService, private customerService: CustomerService, private datashare: DatashareService, private masterService: MasterService, private stockService: StockService, private orderService: OrderService) { }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.onloadAll();
  }

  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Cash Memo Generated Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select2', displayName: 'Deliver Refill', cellTemplate: `<button  style="margin:3px;" class="btn-success btn-xs" ng-if="row.entity.ConsNo!=null"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Deliver &nbsp;</button> `
        , width: "71", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Deliver</div>', enableFiltering: false
      },
      {
        name: 'Select1', displayName: 'Undeliver Refill', cellTemplate: `<button  style="margin:3px;" class="btn-danger btn-xs" ng-if="row.entity.ConsNo!=null"  ng-click="grid.appScope.deleteEmployee(row.entity)"  ">&nbsp;Undeliver &nbsp;</button> `
        , width: "85", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Undeliver</div>', enableFiltering: false
      },

      {
        name: 'Select3', displayName: 'Print Cash Memo', cellTemplate: `<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.ConsNo!=null"  ng-click="grid.appScope.selectedEmployee(row.entity)"  ">&nbsp;Cash Memo&nbsp;</button> `
        , width: "95", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Print</div>', enableFiltering: false
      },
      { name: 'ConsNo', displayName: 'Costumer No', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsName', displayName: 'Costumer Name', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area Name', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoNo', displayName: 'Cash Memo No.', width: "135", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoDate', displayName: 'Cash Memo Date', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoStatusName', displayName: 'Cash Memo Status', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'TtlProdQty', displayName: 'Total Qty', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'RefillAmount', displayName: 'Refill Amount', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'Discount', displayName: 'Discount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalAmtPayable', displayName: 'Amount Payable', width: "180", cellTooltip: true, filterCellFiltered: true },

    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }

  onLoad() {
    this.loaderbtn = false;
    this.cust.SubAreaId = this.cust.SubAreaId == null ? '' : this.cust.SubAreaId;
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.orderService.getCashMemoDetails(this.cpInfo.CPCode, this.cust.SubAreaId, this.cust.ConsNo, this.cust.MobileNo, '', '').subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.CashMemoData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.CashMemoData = [{}] }
    });
  }


  onEditFunction = ($event) => {
    //console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/order/deliver-refill']);
  }
  onDeleteFunction = ($event) => {
    //console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/order/undeliver-refill']);
  }
  onSelectedFunction = (event) => {
    window.location.href = `${AppComponent.BaseUrlDist}Document/GetCashmemoPrint?CPCode=${this.cpInfo.CPCode}&CashMemoRefNo=${event.row.CashMemoRefNo}&ConsId=${event.row.ConsId}&IsActive=Y`, '_blank';
  }

  onloadAll() {
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
  getSubArea() {
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.cust.RoutId, 'RouteId');
  }

}
