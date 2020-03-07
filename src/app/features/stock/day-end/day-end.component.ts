import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'sa-day-end',
  templateUrl: './day-end.component.html',
  styleUrls: ['./day-end.component.css']
})
export class DayEndComponent implements OnInit {
  public dayEndFilt: any = { lastDayEnd: '', CurrentDate: '' };
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public datePickerConfig1: Partial<BsDatepickerConfig>;
  public dayEndData: any = [];
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date;
  public defectiveData: any = [];
  public emptyData: any = [];
  public gridDefectiveOptions: IGridoption;
  public gridEmptyOptions: IGridoption;
  public gridOptions: IGridoption;
  public soundData: any = [];
  public stock: any = {};
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
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
    this.datePickerConfig1 = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.dayEndFilt.lastDayEnd = new Date();
    this.configureSoundGrid();
    this.configureDefectiveGrid();
    this.configureEmptyGrid();
    this.onLoad();
  }
  configureEmptyGrid() {
    this.gridEmptyOptions = <IGridoption>{}
    this.gridEmptyOptions.exporterMenuPdf = false;
    this.gridEmptyOptions.exporterExcelFilename = 'Day End Details.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Empty Product Name', width: "300", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Bal Empty', cellClass: 'cell-right', width: "160", cellTooltip: true },
      { name: 'StockIn', displayName: 'Empty Qty', cellClass: 'cell-right', width: "120", cellTooltip: true },
      { name: 'StockOut', displayName: 'Empty Return', cellClass: 'cell-right', width: "130", cellTooltip: true },
      // { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', cellClass: 'cell-right', width: "180", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Empty +', cellClass: 'cell-right', width: "100", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Empty -', cellClass: 'cell-right', width: "100", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', cellClass: 'cell-right', width: "250", cellTooltip: true }
    ]
    this.gridEmptyOptions.columnDefs = columnDefs;

  }
  configureDefectiveGrid() {
    this.gridDefectiveOptions = <IGridoption>{}
    this.gridDefectiveOptions.exporterMenuPdf = false;
    this.gridDefectiveOptions.exporterExcelFilename = 'Day End Details.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ProductName', displayName: 'Defective Product Name', width: "300", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Defective', cellClass: 'cell-right', width: "200", cellTooltip: true },
      //{ name: 'StockIn', displayName: 'Inward Qty', width: "*",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Defective Return', cellClass: 'cell-right', width: "150", cellTooltip: true },
      //{ name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', cellClass: 'cell-right', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Defective +', cellClass: 'cell-right', width: "120", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Defective -', cellClass: 'cell-right', width: "120", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', cellClass: 'cell-right', width: "300", cellTooltip: true }
    ]
    this.gridDefectiveOptions.columnDefs = columnDefs;
  }
  configureSoundGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Day End Details.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ProductName', displayName: 'Product Name', width: "300", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Sound', cellClass: 'cell-right', width: "170", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', cellClass: 'cell-right', width: "120", cellTooltip: true },
      { name: 'StockOut', displayName: 'Delivery Qty', cellClass: 'cell-right', width: "130", cellTooltip: true },
      { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', cellClass: 'cell-right', width: "170", cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', cellClass: 'cell-right', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Sound +', cellClass: 'cell-right', width: "100", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Sound -', cellClass: 'cell-right', width: "100", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', cellClass: 'cell-right', width: "200", cellTooltip: true }
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
    // // this.stockService.getLastDayEnd(this.cpInfo.CPCode).subscribe((resDay: any) => {
    // //   this.loaderbtn = true;
    // //   if (resDay.StatusCode != 0) {
    // //     this.dayEndData = resDay.Data;
    // //     AppComponent.SmartAlert.Success(resDay.Message);
    // //   }
    // //   else { AppComponent.SmartAlert.Errmsg(resDay.Message); }
    // // });
    // this.dayEndFilt.lastDayEnd = this.appService.DateToString(this.dayEndFilt.lastDayEnd);
    // this.dayEndFilt.CurrentDate = this.appService.DateToString(this.dayEndFilt.CurrentDate);
    // this.stockService.getDayEndData(this.cpInfo.CPCode, this.dayEndFilt).subscribe((resData: any) => {
    //   this.loaderbtn = true;
    //   if (resData.StatusCode != 0) {
    //     this.stock = resData.Data;
    //     this.soundData = resData.Data.Table;
    //     this.emptyData = resData.Data.Table1;
    //     this.defectiveData = resData.Data.Table2;
    //     AppComponent.SmartAlert.Success(resData.Message);
    //   }
    //   else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    // });
    this.resetEndDate();
  }
  dayEndProcess() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Day End?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.postDayEnd();
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })
  }
  postDayEnd() {
    this.loaderbtn = false;
    this.stock.CPCode = this.cpInfo.CPCode;
    this.stock.UserCode = this.cpInfo.EmpId;
    this.stock.Flag = "IN";
    this.stockService.postDayend(this.stock).subscribe((resD: any) => {
      this.loaderbtn = true;
      if (resD.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resD.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resD.Message); }
    });
  }
  resetEndDate() {
    this.dayEndFilt.CurrentDate = new Date();
    this.dayEndFilt.CurrentDate = this.dayEndFilt.CurrentDate.setDate(this.dayEndFilt.CurrentDate.getDate() + 1);
    this.maxDate = this.minDate = new Date(this.dayEndFilt.CurrentDate);
    this.dayEndFilt.CurrentDate = this.appService.DateToString(this.dayEndFilt.CurrentDate);
  }

}