import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { CustomerService } from '@app/features/customer/customer.service';
import { OrderService } from '@app/features/order/order.service';
import { StockService } from '../stock.service';
@Component({
  selector: 'sa-order-accepted-rejected-dispatched',
  templateUrl: './order-accepted-rejected-dispatched.component.html',
  styleUrls: ['./order-accepted-rejected-dispatched.component.css']
})
export class OrderAcceptedRejectedDispatchedComponent implements OnInit {
public cpInfo: any = {};
public orderData: any = {};
public reportData:any=[];
public gridOptions: IGridoption;

constructor(private appService: AppService, private customerService: CustomerService, public dataShare: DatashareService, private stockService: StockService, private masterService: MasterService, private orderService: OrderService) {
  }
ngOnInit() {
  this.appService.getAppData().subscribe(data => { this.cpInfo = data });
  this.dataShare.GetSharedData.subscribe(data => {
    this.orderData = data;
    this.orderData.ShowRepo= this.orderData.ShowRepo==null ?'':this.orderData.ShowRepo;
    if(this.orderData.ShowRepo!=null)
    this.configureGrid();
    console.log('order order');
  });
  //ShowRepo
  
}
configureGrid() {
  this.gridOptions = <IGridoption>{}
  this.gridOptions.exporterMenuPdf = false;
  this.gridOptions.exporterExcelFilename = `${this.orderData.ShowRepo} Report.xlsx`;
  let columnDefs = [];
  columnDefs = [

    { name: 'ProdSeg', displayName: 'Product Segment', width: '*', cellTooltip: true, filterCellFiltered: true},
    { name: 'Product', displayName: 'Product', width: '*', cellTooltip: true, filterCellFiltered: true},
    //{ name: 'ProdRate', displayName: 'Product Rate', width: '200', cellTooltip: true, filterCellFiltered: true},
    { name: 'ProdQty', displayName: 'Product Qty.', cellClass: 'cell-right', width: '*', cellTooltip: true, filterCellFiltered: true},
    { name: 'OrderTypeName', displayName: 'Order Type', width: '*', cellTooltip: true, filterCellFiltered: true},
     ]
  this.gridOptions.columnDefs = columnDefs;
  this.onLoad();
}

onLoad() {
  this.stockService.getSFSDOrderReportAcRjDi(this.orderData.StkOrdID).subscribe((resData: any) => {
    if (resData.StatusCode != 0) {
      this.reportData = resData.Data;
      AppComponent.SmartAlert.Success(resData.Message);
    }
    else { AppComponent.SmartAlert.Errmsg(resData.Message); this.reportData = [{}]; }
  });
}
// resetEndDate(val) {
//   this.minDate = val;
//   if (val != undefined && val != null && this.stockFilter.EndDate != null) {
//     if ((new Date(this.stockFilter.EndDate).getTime()) < (new Date(val).getTime())) {
//       this.stockFilter.EndDate = '';
//     }
//   }
// }
}