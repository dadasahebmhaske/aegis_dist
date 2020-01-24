import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-customer-daily-stock-register',
  templateUrl: './customer-daily-stock-register.component.html',
  styleUrls: ['./customer-daily-stock-register.component.css']
})
export class CustomerDailyStockRegisterComponent implements OnInit {
  private customerDailyStockData: any = [];
  private gridOptions: IGridoption;

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
      // {
      //   name: 'Select1', displayName: 'Edit', cellTemplate: '<button  style="margin:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> '
      //   , width: "48", exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      // },

      { name: 'CustNo', displayName: 'Customer No.', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'CustName', displayName: 'Customer Name ', width: "280", cellTooltip: true, filterCellFiltered: true },
      { name: 'Date', displayName: 'Date', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'OpeningBalance', displayName: 'Opening Quantity', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'SoundQty', displayName: 'Refill Qty ', width: "115", cellTooltip: true, filterCellFiltered: true },

      { name: 'ReturnQty', displayName: 'Return Qty', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'CloseingBalance', displayName: 'Closing Quantity', width: "*", cellTooltip: true, filterCellFiltered: true },
      ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  // onEditFunction = ($event) => {
  //   // console.log($event.row);
  //   AppComponent.Router.navigate(['/stock/imbalance']);
  // }
  onLoad() {
    this.customerDailyStockData = [{
      'CustNo': 999666,
      'CustName': 'Ajay Narayanurthy',
      'Date': '10-01-2020',
      'Product': 'Comm. Cylinder 19 KG',
      'OpeningBalance': 77,
      'SoundQty': 20,
      'ReturnQty':12,
      'CloseingBalance': 85,     }];
    // this.masters.getVehicles().subscribe(resData:any=>{      
    //   if(resData.StatusCode!=0){
    // this.vehicleData=resData.Data;
    //     AppComponent.SmartAlert.Success(resData.Message);
    // }
    //   else{AppComponent.SmartAlert.Errmsg(resData.Message);}
    // }); 
  }

}