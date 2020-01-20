import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-stock-orders-list',
  templateUrl: './stock-orders-list.component.html',
  styleUrls: ['./stock-orders-list.component.css']
})
export class StockOrdersListComponent implements OnInit {
  private gridOptions: IGridoption;
  private stockOrdersData: any=[];
  constructor() {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Stock Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
       {
        name: 'Select1', displayName: 'Edit', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> '
        , width: "48",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"   data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
        , width: "71",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      { name: 'DocRefDate', displayName: 'Order Date', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'PlantName', displayName: 'Plant Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'SoundQty', displayName: 'Quantity', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'Amount', displayName: 'Amount', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderStatus', displayName: 'OrderStatus', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'DocRefCode', displayName: 'Invoice No.', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'VehicleNo', displayName: 'Vehicle No', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, filterCellFiltered: true },
     ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    AppComponent.Router.navigate(['/stock/stock-orders']);
  }
  onLoad() {
    this.stockOrdersData = [{
    'DocRefDate': '12-01-2020' ,
    'PlantName': 'Plant 1' ,
    'SoundQty': 4600 ,
    'Amount': 174000,
    'OrderStatus': 'Pending' ,
    'DocRefCode': 8123456,
    'VehicleNo': 'Mh12 KK2365' ,
    'Remark': 'Emergency Required'
    },{
      'DocRefDate': '15-01-2020' ,
      'PlantName': 'Plant 2' ,
      'SoundQty': 600 ,
      'Amount': 63000,
      'OrderStatus': 'Pending' ,
      'DocRefCode': 9874562,
      'VehicleNo': 'Mh12KP9859' ,
      'Remark': 'Delivered before 30 Jan'
      }];
    // this.masters.getVehicles().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
    // this.vehicleData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}