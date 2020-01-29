import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-daily-stock-register',
  templateUrl: './daily-stock-register.component.html',
  styleUrls: ['./daily-stock-register.component.css']
})
export class DailyStockRegisterComponent implements OnInit {
  public defectiveData: any=[];
  public emptyData: any=[];
  public gridDefectiveOptions: IGridoption;
  public gridEmptyOptions: IGridoption;
  public gridOptions: IGridoption;
  public soundData: any=[];
  public state: any = {
    tabs: {
      demo1: 0,
      demo2: 'tab-r1',  
      demo5: 'iss1',
      demo6: 'l1',
      demo7: 'tab1',     
    },}
  constructor() { }
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
       { name: 'Date', displayName: 'Date', width: "120", cellTooltip: true },
       { name: 'OpeningBal', displayName: 'Opening Bal Empty',  width: "160", cellTooltip: true },
      { name: 'StockIn', displayName: 'Empty Qty', width: "100",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Empty Return', width: "130",  cellTooltip: true },
     // { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "180",  cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Empty +', width: "100",  cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Empty -', width: "100",  cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound',  width: "200", cellTooltip: true }
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
       { name: 'Date', displayName: 'Date',  width: "120", cellTooltip: true },
      { name: 'OpeningBal', displayName: 'Opening Balance Defective',  width: "170", cellTooltip: true },
      //{ name: 'StockIn', displayName: 'Inward Qty', width: "*",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Defective Return', width: "130",  cellTooltip: true },
      //{ name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "170",  cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Defective +', width: "120",  cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Defective -', width: "120",  cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound',  width: "200", cellTooltip: true }
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
       { name: 'Date', displayName: 'Date',  width: "120", cellTooltip: true },
       { name: 'OpeningBal', displayName: 'Opening Balance Sound',  width: "170", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', width: "120",  cellTooltip: true },
      { name: 'StockOut', displayName: 'Delivery Qty', width: "130",  cellTooltip: true },
      { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "170",  cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "170",  cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Sound +', width: "100",  cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Sound -', width: "100",  cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound',  width: "200", cellTooltip: true }
      ]
    this.gridOptions.columnDefs = columnDefs;
  
  }
 
  onLoad() {
    this.soundData = [{
   'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas' ,
   'Date':'02-01-2020',
   'OpeningBal': 755 ,
   'StockIn': 0 ,
   'StockOut': 0,
   'StockOutToUsers': 0 ,
   'StockInFromUsers': 0,
   'ImbalPlus': 0 ,
   'ImbalMinus': 0 ,
   'ClosingBal': 755
    },];

    this.emptyData=[{
      'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas' ,
      'Date':'11-01-2020',
      'OpeningBal': 755 ,
      'StockIn': 0 ,
      'StockOut': 0,
      'StockOutToUsers': 0 ,
      'StockInFromUsers': 0,
      'ImbalPlus': 0 ,
      'ImbalMinus': 0 ,
      'ClosingBal': 755
       },];
       this.defectiveData=[{
        'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas' ,
        'Date':'11-01-2020',
        'OpeningBal': 755 ,
        'StockIn': 0 ,
        'StockOut': 0,
        'StockOutToUsers': 0 ,
        'StockInFromUsers': 0,
        'ImbalPlus': 0 ,
        'ImbalMinus': 0 ,
        'ClosingBal': 755
         },];
    // this.masters.getVehicles().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
    // this.vehicleData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}