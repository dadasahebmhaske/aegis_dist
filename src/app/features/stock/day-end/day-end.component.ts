import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-day-end',
  templateUrl: './day-end.component.html',
  styleUrls: ['./day-end.component.css']
})
export class DayEndComponent implements OnInit {
  private defectiveData: any=[];
  private emptyData: any=[];
  private gridDefectiveOptions: IGridoption;
  private gridEmptyOptions: IGridoption;
  private gridOptions: IGridoption;
  private soundData: any=[];
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
      { name: 'OpeningBal', displayName: 'Opening Balance Empty', cellClass: 'grid-align', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Empty Qty', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockOut', displayName: 'Empty Return', width: "*", cellClass: 'grid-align', cellTooltip: true },
     // { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Empty +', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Empty -', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', cellClass: 'grid-align', width: "*", cellTooltip: true }
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
      { name: 'OpeningBal', displayName: 'Opening Balance Defective', cellClass: 'grid-align', width: "*", cellTooltip: true },
      //{ name: 'StockIn', displayName: 'Inward Qty', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockOut', displayName: 'Defective Return', width: "*", cellClass: 'grid-align', cellTooltip: true },
      //{ name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Defective +', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Defective -', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', cellClass: 'grid-align', width: "*", cellTooltip: true }
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
      { name: 'OpeningBal', displayName: 'Opening Balance Sound', cellClass: 'grid-align', width: "*", cellTooltip: true },
      { name: 'StockIn', displayName: 'Inward Qty', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockOut', displayName: 'Delivery Qty', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockOutToUsers', displayName: 'Allocated to Retailer', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'StockInFromUsers', displayName: 'Return from Retailer', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ImbalPlus', displayName: 'Sound +', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ImbalMinus', displayName: 'Sound -', width: "*", cellClass: 'grid-align', cellTooltip: true },
      { name: 'ClosingBal', displayName: 'Closing Balance Sound', cellClass: 'grid-align', width: "*", cellTooltip: true }
      ]
    this.gridOptions.columnDefs = columnDefs;
  
  }
 
  onLoad() {
    this.soundData = [{
   'ProductName': 'Comm. LPG Cylinder 12 Kg - Go Gas' ,
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