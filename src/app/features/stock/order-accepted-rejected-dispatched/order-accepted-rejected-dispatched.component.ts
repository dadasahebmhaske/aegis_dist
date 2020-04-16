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
  public reportData: any = [];
  public gridOptions: IGridoption;
  constructor(private appService: AppService, private customerService: CustomerService, public dataShare: DatashareService, private stockService: StockService, private masterService: MasterService, private orderService: OrderService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {
      this.orderData = data;
      this.orderData.ShowRepo = this.orderData.ShowRepo == null ? '' : this.orderData.ShowRepo;
      if (this.orderData.ShowRepo != null )
        {this.configureGrid();}
     // console.log(this.orderData);
    });
  }
  configureGrid() {
    let action;
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = `${this.orderData.ShowRepo} Report.xlsx`;
    if (this.orderData.ShowRepo == 'Accepted') {
      this.gridOptions.columnDefs = this.acceptGridColumn();
      this.onLoad('AC');
    }
    if (this.orderData.ShowRepo == 'Rejected') {
      this.gridOptions.columnDefs = this.rejectGridColumn();
      this.onLoad('RJ');
    }
    if (this.orderData.ShowRepo == 'Dispatched') {
      this.gridOptions.columnDefs = this.dispatchGridColumn();
      this.onLoad('DI');
    }
  }
  acceptGridColumn() {
    let columnDefs = [];
    columnDefs = [
      { name: 'OrderTypeName', displayName: 'Order Type', width: '*', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdSeg', displayName: 'Product Segment', width: '*', cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product', width: '*', cellTooltip: true, filterCellFiltered: true },
      //{ name: 'ProdRate', displayName: 'Product Rate', width: '200', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdQty', displayName: 'Product Qty.', cellClass: 'cell-right', width: '*', cellTooltip: true, filterCellFiltered: true },
      
    ]
    return columnDefs;
  }
  rejectGridColumn() {
    let columnDefs = [];
    columnDefs = [
      { name: 'OrderTypeName', displayName: 'Order Type', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdSeg', displayName: 'Product Segment', width: '200', cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product', width: '200', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdRate', displayName: 'Product Rate', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdQty', displayName: 'Product Qty', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'SubTotal', displayName: 'Sub Total', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'CgstAmt', displayName: 'CGST Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'SgstAmt', displayName: 'SGST Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'IgstAmt', displayName: 'IGST Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      //{ name: 'TotalGst', displayName: 'Grand Total',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'DiscountAmt', displayName: 'Discount Amount ', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdAmt', displayName: 'Product Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true },
   
    ];
    return columnDefs;
  }
  dispatchGridColumn() {
    let columnDefs = [];
    columnDefs = [
      { name: 'OrderTypeName', displayName: 'Order Type', width: '150', cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdSeg', displayName: 'Product Segment', width: '200', cellTooltip: true, filterCellFiltered: true},
      { name: 'Product', displayName: 'Product', width: '200', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdRate', displayName: 'Product Rate', cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdQty', displayName: 'Product Qty', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},    
      { name: 'SubTotal', displayName: 'Sub Total', cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'CgstAmt', displayName: 'CGST Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'SgstAmt', displayName: 'SGST Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},    
      { name: 'IgstAmt', displayName: 'IGST Amount', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      //{ name: 'TotalGst', displayName: 'Grand Total',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'DiscountAmt', displayName: 'Discount Amount ', cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdAmt', displayName: 'Product Amount', cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
    ];
    return columnDefs;
  }
  onLoad(action) {
    this.stockService.getSFSDOrderReportAcRjDi(this.orderData.StkOrdId,action).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.reportData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.reportData = [{}]; }
    });
  }
}