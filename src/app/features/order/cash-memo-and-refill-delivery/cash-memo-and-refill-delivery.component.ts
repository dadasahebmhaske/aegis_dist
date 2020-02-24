import { Component, OnInit } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';

@Component({
  selector: 'sa-cash-memo-and-refill-delivery',
  templateUrl: './cash-memo-and-refill-delivery.component.html',
  styleUrls: ['./cash-memo-and-refill-delivery.component.css']
})
export class CashMemoAndRefillDeliveryComponent implements OnInit {
  public AreaData=[];
  public cpInfo: any = {};
  public cashmemo: any = {areacode:''};
  public CashMemoData:any={};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public gridOptions: IGridoption;
  public loaderbtn: boolean = true;

  constructor(private appService: AppService, private datashare: DatashareService, private masterService: MasterService, private stockService: StockService,private orderService: OrderService) { }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    // this.onloadAll();
    this.onLoad();
    // this.onloadAll();
  }

  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Refill Booking Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Undeliver Refill', cellTemplate: `<button  style="margin:3px;" class="btn-danger btn-xs"  ng-click="grid.appScope.deleteEmployee(row.entity)"  ">&nbsp;Undeliver Refill&nbsp;</button> `
        , width: "118", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select2', displayName: 'Deliver Refill', cellTemplate: `<button  style="margin:3px;" class="btn-success btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Deliver Refill&nbsp;</button> `
        , width: "100", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select3', displayName: 'Print Cash Memo', cellTemplate: `<button  style="margin:3px;" class="btn-warning btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Print Cash Memo&nbsp;</button> `
        , width: "130", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      // {
      //   name: 'Select', displayName: 'Delete', cellTemplate: `<button  style="margin:3px;" class="btn-danger btn-xs" ng-click="grid.appScope.deleteEmployee(row.entity)">&nbsp;Delete&nbsp;</button> `
      //   , width: "71", exporterSuppressExport: true,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      // },
      { name: 'BookRefNo', displayName: 'Book Ref No.', width: "130", cellTooltip: true, filterCellFiltered: true },
      { name: 'TotalAmtPayable', displayName: 'Total Amount', width: "130", cellTooltip: true, filterCellFiltered: true },
      //{ name: 'PendingAmt', displayName: 'Pending Amount', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsNo', displayName: 'Consumer No', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'ConsName', displayName: 'Consumer name', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'BookStatus', displayName: 'Book Status', width: "200", cellTooltip: true, filterCellFiltered: true },
      { name: 'AllocatedUserCode', displayName: 'Allocated User Code', width: "100", cellTooltip: true, filterCellFiltered: true },
      { name: 'IsActive', displayName: 'Is Active', width: "110", cellTooltip: true, filterCellFiltered: true },
    
    ]
    this.gridOptions.columnDefs = columnDefs;
    // this.onLoad();
  }

 onLoad() {
    this.loaderbtn = false;
    this.orderService.getRefillBookingDetails(this.cpInfo.CPCode,'','').subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.CashMemoData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.CashMemoData = [{}] }
    });
  }


  onEditFunction = ($event) => {
    //console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/order/deliver-refill']);
  }
  onDeleteFunction = ($event) => {
    //console.log($event.row);
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/order/deliver-refill']);
  }

  // onloadAll() {
  //   this.masterService.getAreaDetails().subscribe((resA: any) => {
  //     if (resA.StatusCode != 0)
  //       this.AreaData = resA.Data;
  //   });
  // }

}
