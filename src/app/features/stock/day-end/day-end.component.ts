import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-day-end',
  templateUrl: './day-end.component.html',
  styleUrls: ['./day-end.component.css']
})
export class DayEndComponent implements OnInit {
  public dayEndFilt: any = { StartDate: '', EndDate: '' };
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public dayEndData: any = [];
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public defectiveData: any = [];
  public emptyData: any = [];
  public gridDefectiveOptions: IGridoption;
  public gridEmptyOptions: IGridoption;
  public gridOptions: IGridoption;
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
  constructor(private appService: AppService, private masterService: MasterService, private stockService: StockService, private orderService: OrderService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.configureSoundGrid();
    this.configureDefectiveGrid();
    this.configureEmptyGrid();
    this.onLoad();
  }
  configureEmptyGrid() {
    this.gridEmptyOptions = <IGridoption>{}
    this.gridEmptyOptions.exporterMenuPdf = false;
    this.gridEmptyOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ProductName', displayName: 'Product Name', width: "300", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Bal Empty', width: "160", cellTooltip: true },
      { name: 'StockIn', displayName: 'Empty Qty', width: "100", cellTooltip: true },
      { name: 'StockOut', displayName: 'Empty Return', width: "130", cellTooltip: true },
      // { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "180", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Empty +', width: "100", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Empty -', width: "100", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', width: "250", cellTooltip: true }
    ]
    this.gridEmptyOptions.columnDefs = columnDefs;

  }
  configureDefectiveGrid() {
    this.gridDefectiveOptions = <IGridoption>{}
    this.gridDefectiveOptions.exporterMenuPdf = false;
    this.gridDefectiveOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ProductName', displayName: 'Product Name', width: "300", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Defective', width: "170", cellTooltip: true },
      //{ name: 'StockIn', displayName: 'Inward Qty', width: "*",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Defective Return', width: "130", cellTooltip: true },
      //{ name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Defective +', width: "120", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Defective -', width: "120", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', width: "300", cellTooltip: true }
    ]
    this.gridDefectiveOptions.columnDefs = columnDefs;

  }
  configureSoundGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ProductName', displayName: 'Product Name', width: "300", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Sound', width: "170", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', width: "120", cellTooltip: true },
      { name: 'StockOut', displayName: 'Delivery Qty', width: "130", cellTooltip: true },
      { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "170", cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Sound +', width: "100", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Sound -', width: "100", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', width: "200", cellTooltip: true }
    ]
    this.gridOptions.columnDefs = columnDefs;

  }

  onLoad() {
    this.soundData = [{
      'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas',
      'OpeningBal': 755,
      'StockIn': 0,
      'StockOut': 0,
      'StockOutToUsers': 0,
      'StockInFromUsers': 0,
      'ImbalPlus': 0,
      'ImbalMinus': 0,
      'ClosingBal': 755
    },];

    this.emptyData = [{
      'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas',
      'OpeningBal': 755,
      'StockIn': 0,
      'StockOut': 0,
      'StockOutToUsers': 0,
      'StockInFromUsers': 0,
      'ImbalPlus': 0,
      'ImbalMinus': 0,
      'ClosingBal': 755
    },];
    this.defectiveData = [{
      'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas',

      'OpeningBal': 755,
      'StockIn': 0,
      'StockOut': 0,
      'StockOutToUsers': 0,
      'StockInFromUsers': 0,
      'ImbalPlus': 0,
      'ImbalMinus': 0,
      'ClosingBal': 755
    },];
    // this.loaderbtn = false;
    // this.dayEndFilt.StartDate = this.appService.DateToString(this.dayEndFilt.StartDate);
    // this.dayEndFilt.EndDate = this.appService.DateToString(this.dayEndFilt.EndDate);
    // this.stockService.getDayEndData(this.cpInfo.CPCode).subscribe((resData: any) => {
    //   this.loaderbtn = true;
    //   if (resData.StatusCode != 0) {
    //     this.dayEndData = resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    //   }
    //   else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    // });
  }
  dayEndProcess() {
    this.loaderbtn = false;
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.dayEndFilt.EndDate != null) {
      if ((new Date(this.dayEndFilt.EndDate).getTime()) < (new Date(val).getTime())) {
        this.dayEndFilt.EndDate = '';
      }
    }
  }

}