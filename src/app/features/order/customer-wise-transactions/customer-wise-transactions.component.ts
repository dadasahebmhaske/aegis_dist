import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-customer-wise-transactions',
  templateUrl: './customer-wise-transactions.component.html',
  styleUrls: ['./customer-wise-transactions.component.css']
})
export class CustomerWiseTransactionsComponent implements OnInit {
  private areaOrderData: any=[];
  private gridOptions: IGridoption;
  constructor() {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer Wise Transactions.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
        , width: "71",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      { name: 'CustNo', displayName: 'Customer No.', width: "120", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'CustName', displayName: 'Customer Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'DeliveryDate', displayName: 'Delivery Date', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'RefillQuantity', displayName: 'Refill Quantity', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'Discount', displayName: 'Discount', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'PreviousAmount', displayName: 'Previous Amount', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'AdvanceAmount', displayName: 'Advance Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'RefillAmount', displayName: 'Refill Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'PaidAmount', displayName: 'Paid Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'PendingAmount', displayName: 'Pending Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoNo', displayName: 'Cash Memo No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashMemoDate', displayName: 'Cash Memo Date', width: "160", cellTooltip: true, filterCellFiltered: true },
      { name: 'EmptyQuantity', displayName: 'Empty Quantity', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'PayMode', displayName: 'Pay Mode', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'Merchant', displayName: 'Merchant', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'ChequeNo', displayName: 'Cheque No', width: "120", cellTooltip: true, filterCellFiltered: true },
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
    this.areaOrderData = [{
      'CustNo': 123456 ,
      'CustName': 'Funsuk Wangdu' ,  
      'DeliveryDate': '10-01-2020', 
      'RefillQuantity': 5,
      'Discount': 100 ,                  
      'PreviousAmount': 2100 ,
      'AdvanceAmount':0,
      'RefillAmount': 4000 ,
      'PaidAmount': 6000 ,
      'PendingAmount': 0 ,
      'CashMemoNo': 'JAN/0120157' ,                            
      'CashMemoDate': '07-01-2020' ,
      'EmptyQuantity': 5 ,     
      'PayMode': 'Digital' ,
      'Merchant': 'Citrus' ,
      'ChequeNo': null ,                  
      'DManName': 'Amir Khan' 
        },{
          'CustNo': 123666 ,
          'CustName': 'Chetan Bhagat' ,  
          'DeliveryDate': '10-01-2020', 
          'RefillQuantity': 5,
          'Discount': 100 ,                  
          'PreviousAmount': 2100 ,
          'AdvanceAmount':400,
          'RefillAmount': 4000 ,
          'PaidAmount': 5600 ,
          'PendingAmount': 0 ,
          'CashMemoNo': 'JAN/0120157' ,                            
          'CashMemoDate': '07-01-2020' ,
          'EmptyQuantity': 5 ,     
          'PayMode': 'Digital' ,
          'Merchant': 'Citrus' ,
          'ChequeNo': null ,                  
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