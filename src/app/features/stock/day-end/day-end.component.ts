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
  public flag: string = 'S';
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date;
  public defectiveData: any = [];
  public emptyData: any = [];
  public newConnectionData:any=[];
  public gridDefectiveOptions: IGridoption;
  public gridnewConnectionOptions: IGridoption;
  public gridShow: string = 'S';
  public gridEmptyOptions: IGridoption;
  public gridOptions: IGridoption;
  public showCol:boolean=true;
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

    this.showGrid('S');
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureSoundGrid();
    this.configureDefectiveGrid();
    this.configureEmptyGrid();
    if( this.cpInfo.ChannelTypeFlag=='DI'|| this.cpInfo.ChannelTypeFlag=='DE'){
      this.showCol=true;
      this.configureNewConnectionGrid();
    }else{this.showCol=false;
      this.configureNewConnectionGrid();
    }
    this.onLoad();
  }
  configureEmptyGrid() {
    this.gridEmptyOptions = <IGridoption>{}
    this.gridEmptyOptions.exporterMenuPdf = false;
    this.gridEmptyOptions.exporterExcelFilename = 'Empty Day End Details.xlsx';
    this.gridEmptyOptions.enableVerticalScrollbar = 1;
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Empty Product Name', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Bal Empty', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Empty Qty', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'StockOut', displayName: 'Empty Return', cellClass: 'cell-right', width: "*", cellTooltip: true },
      // { name: 'StockOutToSD', displayName: 'Allocated to SD', cellClass: 'cell-right', width: "170", cellTooltip: true },
      // { name: 'StockInFromSD', displayName: 'Return from SD', cellClass: 'cell-right', width: "180", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Empty +', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Empty -', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Empty', cellClass: 'cell-right', width: "*", cellTooltip: true }
    ]
    this.gridEmptyOptions.columnDefs = columnDefs;

  }
  configureDefectiveGrid() {
    this.gridDefectiveOptions = <IGridoption>{}
    this.gridDefectiveOptions.exporterMenuPdf = false;
    this.gridDefectiveOptions.exporterExcelFilename = 'Defective Day End Details.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Defective Product Name', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Defective', cellClass: 'cell-right', width: "*", cellTooltip: true },
      //{ name: 'StockIn', displayName: 'Inward Qty', width: "*",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Defective Return', cellClass: 'cell-right', width: "*", cellTooltip: true },
      // { name: 'StockOutToSD', displayName: 'Allocated to SD', cellClass: 'cell-right', width: "170", cellTooltip: true },
      // { name: 'StockInFromSD', displayName: 'Return from SD', cellClass: 'cell-right', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Defective +', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Defective -', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Defective', cellClass: 'cell-right', width: "*", cellTooltip: true }
    ]
    this.gridDefectiveOptions.columnDefs = columnDefs;

  }
  configureSoundGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Filled Day End Details.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'Product', displayName: 'Product Name', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Filled', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'StockOut', displayName: 'Delivery Qty', cellClass: 'cell-right', width: "*", cellTooltip: true },
      // { name: 'StockOutToSD', displayName: 'Allocated to SD', cellClass: 'cell-right', width: "170", cellTooltip: true },
      // { name: 'StockInFromSD', displayName: 'Return from SD', cellClass: 'cell-right', width: "170", cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Filled +', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Filled -', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Filled', cellClass: 'cell-right', width: "*", cellTooltip: true }
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  configureNewConnectionGrid() {
    this.gridnewConnectionOptions = <IGridoption>{}
    this.gridnewConnectionOptions.exporterMenuPdf = false;
    this.gridnewConnectionOptions.exporterExcelFilename = 'New Connection Day End Details.xlsx';
    let columnDefs = [];
    columnDefs = [ 
      { name: 'ProdSeg', displayName: 'Product Segment', width: "*", cellTooltip: true },
      { name: 'Product', displayName: 'Product Name', width: "*", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening New Connection', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'StockOut', displayName: 'NC to Customer', cellClass: 'cell-right', width: "*", cellTooltip: true },
       { name: 'StockOutToSD', displayName: 'Allocated to SD', cellClass: 'cell-right', width: "150", cellTooltip: true,visible:this.showCol },
      { name: 'StockInFromSD', displayName: 'Return from SD', cellClass: 'cell-right', width: "150", cellTooltip: true,visible:this.showCol },
      //{ name: 'ImbalPlus', displayName: 'Filled +', cellClass: 'cell-right', width: "*", cellTooltip: true },
      //{ name: 'ImbalMinus', displayName: 'Filled -', cellClass: 'cell-right', width: "*", cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing New Connection', cellClass: 'cell-right', width: "*", cellTooltip: true }
    ]
    this.gridnewConnectionOptions.columnDefs = columnDefs;
  }
  onLoad() {
    this.loaderbtn = false;
    this.stockService.getLastDayEnd(this.cpInfo.CPCode).subscribe((resDay: any) => {
      if (resDay.StatusCode != 0) {
        this.dayEndFilt.lastDayEnd = resDay.Data[0].DayEndDate;
        this.resetEndDate();
        AppComponent.SmartAlert.Success(resDay.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resDay.Message); this.loaderbtn = true; }
    });
  }
  getStockData() {
    this.dayEndFilt.lastDayEnd = this.appService.DateToString(this.dayEndFilt.lastDayEnd);
    this.dayEndFilt.CurrentDate = this.appService.DateToString(this.dayEndFilt.CurrentDate);
    this.stockService.getDayEndData(this.cpInfo.CPCode, this.dayEndFilt).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.stock = resData.Data;
        this.soundData = resData.Data.Table == null ? [{}] : resData.Data.Table;
        this.emptyData = resData.Data.Table1 == null ? [{}] : resData.Data.Table1;
        this.defectiveData = resData.Data.Table2 == null ? [{}] : resData.Data.Table2;
        this.newConnectionData = resData.Data.Table3 == null ? [{}] : resData.Data.Table3;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
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
    this.stock.Date = this.dayEndFilt.CurrentDate;
    // this.stock.Type=''
    this.loaderbtn = false;
    this.stock.CPCode = this.cpInfo.CPCode;
    this.stock.UserCode = this.cpInfo.EmpId;
    this.stock.Flag = "IN";
    this.stock.DataSound = this.stock.Table;
    this.stock.DataEmpty = this.stock.Table1;
    this.stock.DataDefective = this.stock.Table2;
    this.stock.DataNewConnection = this.stock.Table3;
    this.stockService.postDayend(this.stock).subscribe((resD: any) => {
      this.loaderbtn = true;
      if (resD.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resD.Message);
        this.onLoad();
      }
      else { AppComponent.SmartAlert.Errmsg(resD.Message); }
    });
  }
  resetEndDate() {
    this.dayEndFilt.CurrentDate = new Date(this.dayEndFilt.lastDayEnd);
    this.dayEndFilt.CurrentDate = this.dayEndFilt.CurrentDate.setDate(this.dayEndFilt.CurrentDate.getDate() + 1);
    this.maxDate = this.minDate = new Date(this.dayEndFilt.CurrentDate);
    this.dayEndFilt.CurrentDate = this.appService.DateToString(this.dayEndFilt.CurrentDate);
    this.getStockData();
  }
  showGrid(flag) {
    this.flag = flag;
  }
}