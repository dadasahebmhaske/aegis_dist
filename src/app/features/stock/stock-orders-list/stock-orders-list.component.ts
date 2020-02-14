import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-stock-orders-list',
  templateUrl: './stock-orders-list.component.html',
  styleUrls: ['./stock-orders-list.component.css']
})
export class StockOrdersListComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public EndDate: any = '';
  public minDate: Date;
  public gridOptions: IGridoption;
  public ProductArray: any = [];
  public StartDate: any = '';
  public stock: any = {};
  public stockOrdersData: any = [];
  constructor(private appService: AppService, public datashare: DatashareService, public stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Stock Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Edit', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.OrderStage=='PE'"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> `
        , width: "48", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;Product&nbsp;</button> '
        , width: "71", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      //{ name: 'OrderType', displayName: 'Order Type', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderNo', displayName: 'Order No.', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderDt', displayName: 'Order Date', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'PlantName', displayName: 'Plant Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'Vehicle', displayName: 'Vehicle', width: "200", cellTooltip: true, filterCellFiltered: true },
      // { name: 'RefillQty', displayName: 'Refill Qty', width: "100", cellTooltip: true, filterCellFiltered: true },
      // { name: 'EmptyQty', displayName: 'Empty Qty', width: "110", cellTooltip: true, filterCellFiltered: true },
      // { name: 'DefecQty', displayName: 'Defective Qty', width: "140", cellTooltip: true, filterCellFiltered: true },
      // { name: 'NewConn', displayName: 'New Connection', width: "145", cellTooltip: true, filterCellFiltered: true },
      { name: 'GrandTotal', displayName: 'Amount', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderStage', displayName: 'Order Status', width: "120", cellTooltip: true, filterCellFiltered: true },
      // { name: 'DocRefCode', displayName: 'Invoice No.', width: "150", cellTooltip: true, filterCellFiltered: true },

      { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    //console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/stock/stock-orders']);
  }
  onDeleteFunction = ($event) => {
    // console.log($event.row);
    this.stock = $event.row;
    this.stockService.getStockOrderProductDetails(this.cpInfo.CPCode, this.stock.StkOrdId, this.stock.OrderNo, this.StartDate, this.EndDate).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        this.ProductArray = resp.Data;
        this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
      }
    });
    $('#productsModal').modal('show');

    //AppComponent.Router.navigate(['/stock/stock-orders']);

  }

  onLoad() {
    console.log(this.StartDate); console.log(this.EndDate);
    this.stockService.getStockOrderDetails(this.cpInfo.CPCode, this.StartDate, this.EndDate).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.stockOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.EndDate != null) {
      if ((new Date(this.EndDate).getTime()) < (new Date(val).getTime())) {
        this.EndDate = '';
      }
    }

  }
  ngOnDestroy() {
    this.appService.removeBackdrop();
    this.stockOrdersData = [{}];
  }
}