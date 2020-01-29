import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-cash-flow-register',
  templateUrl: './cash-flow-register.component.html',
  styleUrls: ['./cash-flow-register.component.css']
})
export class CashFlowRegisterComponent implements OnInit {
  public cashFlowData: any=[];
  public gridOptions: IGridoption;
  constructor() {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Cash Flow Register list.xlsx';
    let columnDefs = [];
    columnDefs = [
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
      //   , width: "71",exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      // },
      { name: 'CustNo', displayName: 'Customer No.', width: "125", cellTooltip: true, filterCellFiltered: true,visible:true },
      { name: 'CustName', displayName: 'Customer Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'Date', displayName: 'Payment Date', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'SalesAmount', displayName: 'Sales Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'ReceivedAmount', displayName: 'Received Amount', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'PendingAmount', displayName: 'Pending Amount', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'AdvancedAmount', displayName: 'Advanced Amount', width: "155", cellTooltip: true, filterCellFiltered: true },
      { name: 'PaymentMode', displayName: 'Payment Mode', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CheqNo', displayName: 'Cheque No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CheqDate', displayName: 'Cheque Date', width: "130", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
   // AppComponent.Router.navigate(['/master/vehicle']);
  }
  onLoad() {
    this.cashFlowData = [{
  'CustNo': 123456 ,
  'CustName': 'Funsuk Wangdu' ,  
  'MobileNo':9874563214,
  'Date': '10-01-2020', 
  'SalesAmount': 15000,
  'ReceivedAmount': 10000 ,                  
  'PendingAmount': 5000 ,
  'AdvancedAmount':null,
  'PaymentMode': 'Cash'  ,
  'CheqNo':null,
  'CheqDate':null
    },{
      'CustNo': 123456 ,
      'CustName': 'Funsuk Wangdu' ,  
      'MobileNo':9874563214,
      'Date': '18-01-2020', 
      'SalesAmount': 10000,
      'ReceivedAmount': 50000 ,                  
      'PendingAmount': null ,
      'AdvancedAmount':5000,
      'PaymentMode': 'Cheque',
      'CheqNo':98578545,  
      'CheqDate':'18-01-2020'
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