import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'sa-area-wise-refill-order-summary',
  templateUrl: './area-wise-refill-order-summary.component.html',
  styleUrls: ['./area-wise-refill-order-summary.component.css']
})
export class AreaWiseRefillOrderSummaryComponent implements OnInit {
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
    this.gridOptions.exporterExcelFilename = 'Area Wise Refill Order Summary.xlsx';
    let columnDefs = [];
    columnDefs = [
      // {
      //   name: 'Select', displayName: 'Details', cellTemplate: '<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-toggle="modal" data-target="#productsModal">&nbsp;Product&nbsp;</button> '
      //   , width: "71",exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      // },
      //{ name: 'DManCode', displayName: 'Del. Man Code', width: "150", cellTooltip: true, filterCellFiltered: true,visible:false },
      { name: 'Area', displayName: 'Area', width: "190", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalDeliveredCount', displayName: 'Total Delivered Count', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'DACDeliveredCount', displayName: 'DAC Delivered Count', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'UnDeliveredCount', displayName: 'UnDelivered Count', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'PendingCashMemo', displayName: 'Pending Cash Memo', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'AppBookings', displayName: 'App Bookings', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'DigitalPayment', displayName: 'Digital Payment', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'CashPayment', displayName: 'Cash Payment', width: "150", cellTooltip: true, filterCellFiltered: true },
     { name: 'TotalPayment', displayName: 'Total Payment', width: "150", cellTooltip: true, filterCellFiltered: true },             
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
   'Area': 'Mumbai' ,
   'TotalDeliveredCount': 755 ,
   'DACDeliveredCount': 450 ,
   'UnDeliveredCount': 5,
   'PendingCashMemo': 2 ,
   'AppBookings': 7,
   'DigitalPayment': 1241 ,
   'CashPayment': 1241 ,
   'TotalPayment': 2482
    },{
   'Area': 'Pune' ,
   'TotalDeliveredCount': 655 ,
   'DACDeliveredCount': 450 ,
   'UnDeliveredCount': 5,
   'PendingCashMemo': 2 ,
   'AppBookings': 7,
   'DigitalPayment': 1000 ,
   'CashPayment': 1241 ,
   'TotalPayment': 3241
    },{     
   'Area': 'Kolhapur' ,
   'TotalDeliveredCount': 555 ,
   'DACDeliveredCount': 450 ,
   'UnDeliveredCount': 5,
   'PendingCashMemo': 2 ,
   'AppBookings': 7,
   'DigitalPayment': 1241 ,
   'CashPayment': 1241 ,
   'TotalPayment': 2482
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