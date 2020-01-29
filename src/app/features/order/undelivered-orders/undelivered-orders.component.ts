import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-undelivered-orders',
  templateUrl: './undelivered-orders.component.html',
  styleUrls: ['./undelivered-orders.component.css']
})
export class UndeliveredOrdersComponent implements OnInit {
  public unDeliveredOrderData: any=[];
  public gridOptions: IGridoption;
  constructor() {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Undelivered Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
        , width: "71",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      { name: 'CustNo', displayName: 'Customer No.', width: "120", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'CustName', displayName: 'Customer Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'UnDeliveredDate', displayName: 'Undelivery Date', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'RefillQuantity', displayName: 'Refill Quantity', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'RefillAmount', displayName: 'Refill Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'unDelAttempts', displayName: 'Undelivery Attempts', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'Reason', displayName: 'Reason', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoNo', displayName: 'Cash Memo No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoDate', displayName: 'Cash Memo Date', width: "160", cellTooltip: true, filterCellFiltered: true },
     { name: 'DManName', displayName: 'Delivery Man ', width: "160", cellTooltip: true, filterCellFiltered: true },             
   ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
   // AppComponent.Router.navigate(['/master/vehicle']);
  }
  onLoad() {
    this.unDeliveredOrderData = [{
  'CustNo': 123456 ,
  'CustName': 'Sanjay Kumar' ,  
  'UnDeliveredDate': '10-01-2020', 
  'RefillQuantity': 5,   
  'RefillAmount': 4000 ,
  'unDelAttempts': 1 ,
  'Reason': "Home Locked" ,
  'CashMemoNo': 'JAN/0120157' ,                            
  'CashMemoDate': '07-01-2020' ,                   
  'DManName': 'Amir Khan' 
    },{
      'CustNo': 123456 ,
      'CustName': 'Vijay CHauhan' ,  
      'UnDeliveredDate': '10-01-2020', 
      'RefillQuantity': 5,   
      'RefillAmount': 4000 ,
      'unDelAttempts': 1 ,
      'Reason': "Home Locked" ,
      'CashMemoNo': 'JAN/0120157' ,                            
      'CashMemoDate': '07-01-2020' ,                   
      'DManName': 'Amir Khan' 
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