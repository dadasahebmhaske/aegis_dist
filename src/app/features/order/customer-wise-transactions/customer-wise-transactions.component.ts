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
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
      //   , width: "71",exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      // },
      //{ name: 'DManCode', displayName: 'Del. Man Code', width: "150", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'CustNo', displayName: 'Customer No', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'CustName', displayName: 'Customer Name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'CreditAmt', displayName: 'Credit Amount', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'DebitAmt', displayName: 'Debit Amunt', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'TransDate', displayName: 'Trans Date', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'AreaName', displayName: 'Area', width: "*", cellTooltip: true, filterCellFiltered: true },
     
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
      'CustNo': 321654 ,
      'CustName': 'Ankit Lokhande' ,
      'MobileNo': 9874563258,
      'CreditAmt': 780 ,
      'DebitAmt': 0 ,
      'TransDate': '10-01-2020' ,
      'AreaName': 'Pune' ,
    },{
      'CustNo': 321644 ,
      'CustName': 'Swapnil Joshi' ,
      'MobileNo': 8874563258,
      'CreditAmt': 0 ,
      'DebitAmt': 7680 ,
      'TransDate': '11-01-2020' ,
      'AreaName': 'Mumbai' ,
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