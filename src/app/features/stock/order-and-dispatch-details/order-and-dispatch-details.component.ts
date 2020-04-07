import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-order-and-dispatch-details',
  templateUrl: './order-and-dispatch-details.component.html',
  styleUrls: ['./order-and-dispatch-details.component.css']
})
export class OrderAndDispatchDetailsComponent implements OnInit {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public EndDate: any = '';
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  public ProductArray: any = [];
  public StartDate: any = '';
  public stage: any = '';
  public stock: any = {};
  public stockOrdersData: any = [];
  public showcol: boolean = true;
  constructor(private appService: AppService, public datashare: DatashareService, public stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.StartDate = this.EndDate = new Date();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'SF / SD Orders & Dispatched list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Process', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.OrderStage!='PE'"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Process&nbsp;</button> `
        , width: "72", exporterSuppressExport: true, visible: this.showcol,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Process</div>', enableFiltering: false
      },
      {
        name: 'Select', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.IsActive!='Y'"   ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;View&nbsp;</button> `
        , width: "55", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">View</div>', enableFiltering: false
      },
      { name: 'OrderNo', displayName: 'Order No.', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderDt', displayName: 'Order Date', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'PlantName', displayName: 'Plant Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'Vehicle', displayName: 'Vehicle', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'GrandTotal', displayName: 'Amount', width: "100", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'OrdStatus', displayName: 'Order Status', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/stock/order-accepted-rejected']);
  }
  onDeleteFunction = ($event) => {
    this.stock = $event.row;
    AppComponent.Router.navigate(['/stock/order-accepted-rejected-dispatched']);
    this.StartDate = this.appService.DateToString(this.StartDate);
    this.EndDate = this.appService.DateToString(this.EndDate);
    this.stockService.getStockOrderProductDetails(this.cpInfo.CPCode, this.stock.StkOrdId, this.stock.OrderNo, this.StartDate, this.EndDate).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        this.ProductArray = resp.Data;
        this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
      
      } else { AppComponent.SmartAlert.Errmsg(resp.Message); }
    });
  }
  onLoad() {
    this.loaderbtn = false;
    this.stockService.getStockOrderDetails(this.cpInfo.CPCode, this.appService.DateToString(this.StartDate), this.appService.DateToString(this.EndDate), this.stage).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.stockOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
        if (this.stage != 'PE' && this.stage != '') { this.showcol = false; } else { this.showcol = true; }
        this.configureGrid();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.stockOrdersData = [{}] }
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
    //this.stockOrdersData = [{}];
  }
}