import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-refill-booking-list',
  templateUrl: './refill-booking-list.component.html',
  styleUrls: ['./refill-booking-list.component.css']
})
export class RefillBookingListComponent implements OnInit, OnDestroy {
  public bookOrder: any = { StartDate: '', EndDate: '', RoutId: '', SubAreaId: '' };
  public cpInfo: any = {};
  public chantype:any=[];
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  public ProductArray: any = [];
  public stock: any = {};
  public bookingOrdersData: any = [];
  constructor(private appService: AppService, private datashare: DatashareService, private masterService: MasterService, private stockService: StockService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data;
      this.bookOrder.CPCode= this.cpInfo.CPCode;});
    this.configureGrid();
    this.onloadAll();
    this.bookOrder.StartDate = this.bookOrder.EndDate = new Date();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Order Booking list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Cancel Booking', cellTemplate: `<button  style="margin:3px 5px;" class="btn-danger btn-xs" ng-if="row.entity.ConsNo!=null"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Cancel&nbsp;</button> `
        , width: "70", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Booking</div>', enableFiltering: false
      },

      { name: 'NewConsNo', displayName: 'Customer No', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsName', displayName: 'Customer Name', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'SubAreaName', displayName: 'Sub Area Name', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'BookNo', displayName: 'Book No.', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'BookDate', displayName: 'Book Date', cellClass: 'cell-center', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'BookStatusName', displayName: 'Book Status', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'TtlProdQty', displayName: 'Total Qty', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'RefillAmount', displayName: 'Refill Amount', cellClass: 'cell-right', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'Discount', displayName: 'Discount', cellClass: 'cell-right', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalAmtPayable', displayName: 'Amount Payable', cellClass: 'cell-right', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'AppName', displayName: 'App', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'AllocatedUserName', displayName: 'Delivery Boy', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Is Active', cellClass: 'cell-center', width: "110", cellTooltip: true, filterCellFiltered: true, visible: false },
    ]
    this.gridOptions.columnDefs = columnDefs;
    // this.onLoad();
  }
  onloadAll() {
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
        this.chantype.unshift(  {CPCode: this.cpInfo.CPCode,CPName: this.cpInfo.CPName});
    });
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/order/refill-booking']);
  }
  onDeleteFunction = ($event) => {
    this.stock = $event.row;
    this.stockService.getStockOrderProductDetails(this.cpInfo.CPCode, this.stock.StkOrdId, this.stock.OrderNo, this.bookOrder.StartDate, this.bookOrder.EndDate).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        this.ProductArray = resp.Data;
        this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
        $('#productsModal').modal('show');
      } else { AppComponent.SmartAlert.Errmsg(resp.Message); }
    });
  }
  onLoad() {

    this.loaderbtn = false;
    this.orderService.getRefillBookingDetails(this.bookOrder.CPCode, this.appService.DateToString(this.bookOrder.StartDate), this.appService.DateToString(this.bookOrder.EndDate)).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.bookingOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.bookingOrdersData = [{}] }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.bookOrder.EndDate != null) {
      if ((new Date(this.bookOrder.EndDate).getTime()) < (new Date(val).getTime())) {
        this.bookOrder.EndDate = '';
      }
    }
  }
  ngOnDestroy() {
    this.appService.removeBackdrop();
    // this.bookingOrdersData = [{}];
  }
}