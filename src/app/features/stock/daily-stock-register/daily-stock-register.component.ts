import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { OrderService } from '@app/features/order/order.service';
import { StockService } from '../stock.service';
@Component({
  selector: 'sa-daily-stock-register',
  templateUrl: './daily-stock-register.component.html',
  styleUrls: ['./daily-stock-register.component.css']
})
export class DailyStockRegisterComponent implements OnInit {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public defectiveData: any = [];
  public emptyData: any = [];
  public flag: string = 'S';
  public gridDefectiveOptions: IGridoption;
  public gridEmptyOptions: IGridoption;
  public gridOptions: IGridoption;
  public stockFilter: any = { ProdSegId: '', ProdId: '' };
  public loaderbtn: boolean = true;
  public minDate: Date;
  public productDataSelected: any = [];
  public productSegmentData: any = [];
  public StartMindate: Date;
  public maxDate: Date = new Date();
  public soundData: any = [];
  public state: any = {
    tabs: {
      demo1: 0,
      demo2: 'tab-r1',
      demo5: 'iss1',
      demo6: 'l1',
      demo7: 'tab1',
    },
  }
  constructor(private appService: AppService, private customerService: CustomerService, private stockService: StockService, private masterService: MasterService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.showGrid('S');
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.stockFilter.StartDate = this.stockFilter.EndDate = new Date();
    this.configureSoundGrid();
    this.configureDefectiveGrid();
    this.configureEmptyGrid();
    this.onLoad();
    this.allLoad();
  }
  allLoad() {
    this.masterService.getProductSegmentDetails().subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data;
    });
  }
  configureEmptyGrid() {
    this.gridEmptyOptions = <IGridoption>{}
    this.gridEmptyOptions.exporterMenuPdf = false;
    this.gridEmptyOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Product Name', width: "*", cellTooltip: true },
      { name: 'Date', displayName: 'Date', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Bal Empty', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Empty Qty', width: "*", cellTooltip: true },
      { name: 'StockOut', displayName: 'Empty Return', width: "*", cellTooltip: true },
      // { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      // { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "180", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Empty +', width: "*", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Empty -', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Empty', width: "*", cellTooltip: true }
    ]
    this.gridEmptyOptions.columnDefs = columnDefs;

  }
  configureDefectiveGrid() {
    this.gridDefectiveOptions = <IGridoption>{}
    this.gridDefectiveOptions.exporterMenuPdf = false;
    this.gridDefectiveOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Product Name', width: "*", cellTooltip: true },
      { name: 'Date', displayName: 'Date', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Defective', width: "*", cellTooltip: true },
      //{ name: 'StockIn', displayName: 'Inward Qty', width: "*",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Defective Return', width: "*", cellTooltip: true },
      //{ name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      // { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Defective +', width: "*", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Defective -', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Defective', width: "*", cellTooltip: true }
    ]
    this.gridDefectiveOptions.columnDefs = columnDefs;

  }
  configureSoundGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Product Name', width: "*", cellTooltip: true },
      { name: 'Date', displayName: 'Date', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Filled', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', width: "*", cellTooltip: true },
      { name: 'StockOut', displayName: 'Delivery Qty', width: "*", cellTooltip: true },
      // { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "170", cellTooltip: true },
      // { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Filled +', width: "*", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Filled -', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Filled', width: "*", cellTooltip: true }
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onLoad() {
    this.loaderbtn = false;
    this.stockFilter.CPCode = this.cpInfo.CPCode;
    this.stockFilter.StartDate = this.appService.DateToString(this.stockFilter.StartDate);
    this.stockFilter.EndDate = this.appService.DateToString(this.stockFilter.EndDate);
    this.stockService.getDailyStockRegisterData(this.stockFilter).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.soundData = resData.Data.Table == null ? [{}] : resData.Data.Table;
        this.emptyData = resData.Data.Table1 == null ? [{}] : resData.Data.Table1;
        this.defectiveData = resData.Data.Table2 == null ? [{}] : resData.Data.Table2;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else {
        AppComponent.SmartAlert.Errmsg(resData.Message);
        this.soundData = this.emptyData = this.defectiveData = [{}];
      }
    });
  }
  onSelectProdSegment() {
    this.masterService.getProducts(this.stockFilter.ProdSegId).subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.productDataSelected = resPT.Data;
      } else { this.productDataSelected = []; }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.stockFilter.EndDate != null) {
      if ((new Date(this.stockFilter.EndDate).getTime()) < (new Date(val).getTime())) {
        this.stockFilter.EndDate = '';
      }
    }
  }
  showGrid(flag) {
    this.flag = flag;
  }
}