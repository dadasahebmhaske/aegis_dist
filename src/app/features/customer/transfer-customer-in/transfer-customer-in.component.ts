import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-transfer-customer-in',
  templateUrl: './transfer-customer-in.component.html',
  styleUrls: ['./transfer-customer-in.component.css']
})
export class TransferCustomerInComponent implements OnInit {
  private customerInData: any=[];
  private gridOptions: IGridoption;
    constructor() {
  }
  ngOnInit() {
    this.configureGrid();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Customer Transfer In list.xlsx';
    let columnDefs = [];
    columnDefs = [
       {
        name: 'Select1', displayName: 'Edit', cellTemplate: '<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Accept&nbsp;</button> '
        , width: "65",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Accept</div>', enableFiltering: false
      },
      {
        name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-danger btn-xs"   data-toggle="modal" data-target="#productsModal">&nbsp;Reject&nbsp;</button> '
        , width: "61",exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Reject</div>', enableFiltering: false
      },
    
      { name: 'DistCode', displayName: 'Distributor Code', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'DistName', displayName: 'Distributor Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'CustName', displayName: 'Customer Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'MobileNo', displayName: 'Mobile No.', width: "110", cellTooltip: true, filterCellFiltered: true },
    { name: 'TransferOutDate', displayName: 'Transfer Out Date', width: "140", cellTooltip: true, filterCellFiltered: true },
      { name: 'TransferInDate', displayName: 'Transfer In Date', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'Reason', displayName: 'Reason', width: "*", cellTooltip: true, filterCellFiltered: true },
     ]
    this.gridOptions.columnDefs = columnDefs;
    this.onLoad();
  }
  onEditFunction = ($event) => {
    // console.log($event.row);
    //AppComponent.Router.navigate(['/stock/stock-orders']);
  }
  onLoad() {
    this.customerInData = [{
    'DistCode': 'D32659812' ,
    'DistName': 'Antra Agency Belgavi' ,
    'CustName': "Chandreashekhar Naydu" ,
    'MobileNo': 9874563214,
    'TransferOutDate': '1-10-2019' ,
    'TransferInDate': '10-10-2019',
    'Reason': 'Relocated' 
    },{
      'DistCode': 'D985647895' ,
      'DistName': 'Bharti Gas Agency Aatni' ,
      'CustName': "Sharuk Ali khan" ,
      'MobileNo': 8884563214,
      'TransferOutDate': '1-1-2020' ,
      'TransferInDate': '10-1-2020',
      'Reason': 'Relocated' 
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