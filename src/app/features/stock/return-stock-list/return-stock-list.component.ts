import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-return-stock-list',
  templateUrl: './return-stock-list.component.html',
  styleUrls: ['./return-stock-list.component.css']
})
export class ReturnStockListComponent implements OnInit {
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
    this.gridOptions.exporterExcelFilename = 'Delivered Orders list.xlsx';
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
      { name: 'DocRefNo', displayName: 'Return Ref No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'DocRefDate', displayName: 'Return Date', width: "120", cellTooltip: true, filterCellFiltered: true},
      { name: 'PlantName', displayName: 'Plant Name', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmptyQty', displayName: 'Empty Quantity', width: "140", cellTooltip: true, filterCellFiltered: true },
      { name: 'DeffectiveQty', displayName: 'Deffective Qty', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ReturnStatus', displayName: 'OrderStatus', width: "120", cellTooltip: true, filterCellFiltered: true },
     
      { name: 'VehicleNo', displayName: 'Vehicle No', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, filterCellFiltered: true },
     ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    AppComponent.Router.navigate(['/stock/return-stock']);
  }
  onLoad() {
    this.stockOrdersData = [{
      'DocRefNo': 'RE15012020' ,
      'DocRefDate': '15-01-2020' ,
      'PlantName': 'Plant 1' ,
      'EmptyQty': 46 ,
      'DeffectiveQty': 3,
      'ReturnStatus': 'Pending' ,
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