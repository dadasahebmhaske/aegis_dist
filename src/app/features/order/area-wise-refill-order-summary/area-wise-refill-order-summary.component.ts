import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { CustomerService } from '@app/features/customer/customer.service';
@Component({
  selector: 'sa-area-wise-refill-order-summary',
  templateUrl: './area-wise-refill-order-summary.component.html',
  styleUrls: ['./area-wise-refill-order-summary.component.css']
})
export class AreaWiseRefillOrderSummaryComponent implements OnInit {
  public areaOrderData: any = [];
  public AreaData = [];
  public cpInfo: any = {};
  public cmCustData: any = {};
  public cashmemo: any = { areacode: '' };
  public CashMemoData: any = {};
  public cust: any = {AreaId:'', RoutId: '', SubAreaId: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public RouteData: any = [];
  public SubAreaArray: any = [];
  public SubAreaData: any = [];
  public RouteArray: any = [];

  constructor(private appService: AppService, private customerService: CustomerService, private masterService: MasterService, private stockService: StockService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.cust.StartDate = this.cust.EndDate = new Date();
    this.configureGrid();
    this.onloadAll();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'RouteName', displayName: 'Route', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Area', width: "190", cellTooltip: true, filterCellFiltered: true },
      { name: 'DeliveryCount', displayName: 'Delivered Count', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'UnDeliveryCount', displayName: 'Undelivered Count', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalProdDelivered', displayName: 'Product Delivered Count', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalRefillAmount', displayName: 'Refill Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalDiscount', displayName: 'Discount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalSalesAmt', displayName: 'Sales Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalPaymentCollected', displayName: 'Payment Collected', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalPendingAmt', displayName: 'Pending Amount', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalEmptyReturn', displayName: 'Empty Return', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'DelDate', displayName: 'Delivery Date', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    // AppComponent.Router.navigate(['/master/vehicle']);
  }
  onLoad() {
    this.loaderbtn = false;
    this.cust.RouteId = this.cust.RouteId == null ? '' : this.cust.RouteId;
    this.cust.SubAreaId = this.cust.SubAreaId == null ? '' : this.cust.SubAreaId;
    this.cust.StartDate = this.appService.DateToString(this.cust.StartDate);
    this.cust.EndDate = this.appService.DateToString(this.cust.EndDate);
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.orderService.getAreaWiseOrderData(this.cpInfo.CPCode, this.cust).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.areaOrderData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onloadAll() {
    this.masterService.getArea(this.cpInfo.CPCode).subscribe((resAR: any) => {
      if (resAR.StatusCode != 0)
        this.AreaData = resAR.Data;
    });
   this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.RouteArray = resR.Data;
    });
    this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA: any) => {
      if (reSA.StatusCode != 0) {
        this.SubAreaArray = reSA.Data;
      }
    });
  }

  getSubArea() {
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.cust.AreaId, 'AreaCode');
  }
  getRoute() {
    let obj=this.masterService.filterData(this.SubAreaArray, this.cust.SubAreaId, 'SubAreaId');
    this.RouteData = this.masterService.filterData(this.RouteArray, obj[0].RouteId, 'RouteId');
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.cust.EndDate != null) {
      if ((new Date(this.cust.EndDate).getTime()) < (new Date(val).getTime())) {
        this.cust.EndDate = '';
      }
    }
  }
}