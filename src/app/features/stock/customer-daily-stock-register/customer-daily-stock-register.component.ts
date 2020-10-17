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
  selector: 'sa-customer-daily-stock-register',
  templateUrl: './customer-daily-stock-register.component.html',
  styleUrls: ['./customer-daily-stock-register.component.css']
})
export class CustomerDailyStockRegisterComponent implements OnInit {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public customerDailyStockData: any = [];
  public stockFilter: any = {};
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public StartMindate: Date;
  public maxDate: Date = new Date();
  constructor(private appService: AppService, private customerService: CustomerService, private stockService: StockService, private masterService: MasterService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.stockFilter.StartDate = this.stockFilter.EndDate = new Date();
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer Daily Stock Register.xlsx';
    let columnDefs = [];
    columnDefs = [

      { name: 'NewConsNo', displayName: 'Customer No.', cellClass: 'cell-center', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsName', displayName: 'Customer Name ', width: "280", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'Date', displayName: 'Date', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdSeg', displayName: 'Product Segment', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'OpeningBal', displayName: 'Opening Quantity', cellClass: 'cell-right', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'StockIn', displayName: 'Refill Qty ', width: "115", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'StockOut', displayName: 'Return Qty', width: "130", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'ClosingBal', displayName: 'Closing Quantity', cellClass: 'cell-right', width: "155", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }

  onLoad() {
    this.loaderbtn = false;
    this.stockFilter = this.customerService.checkCustOrMobNo(this.stockFilter);
    this.stockFilter.StartDate = this.appService.DateToString(this.stockFilter.StartDate);
    this.stockFilter.EndDate = this.appService.DateToString(this.stockFilter.EndDate);
    this.stockFilter.CPCode = this.cpInfo.CPCode;
    this.stockService.getCustomerDailyStockRegister(this.stockFilter).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.customerDailyStockData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.customerDailyStockData = [{}]; }
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
}