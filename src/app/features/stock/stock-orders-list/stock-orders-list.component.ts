import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'sa-stock-orders-list',
  templateUrl: './stock-orders-list.component.html',
  styleUrls: ['./stock-orders-list.component.css']
})
export class StockOrdersListComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public EndDate: any = '';
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  public ProductArray: any = [];
  public StartDate: any = '';
  public stage: any = ''; 
  public stock: any = {};
  public stockOrdersData: any = [];
  public showcol: boolean = true;
  constructor(private appService: AppService, public datashare: DatashareService, public stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.configureGrid();
    this.StartDate = this.EndDate = new Date();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Stock Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Select1', displayName: 'Edit', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.OrderStage=='PE'"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> `
        , width: "48", exporterSuppressExport: true, visible: this.showcol,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      },
      {
        name: 'Select', displayName: 'Details', cellTemplate: `<button  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.IsActive=='Y'"   ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;Product&nbsp;</button> `
        , width: "71", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Details</div>', enableFiltering: false
      },
      { name: 'OrderNo', displayName: 'Order No.', cellClass: 'cell-center', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderDt', displayName: 'Order Date', cellClass: 'cell-center', width: "120", cellTooltip: true, filterCellFiltered: true },
      { name: 'PlantName', displayName: 'Plant Name', width: "250", cellTooltip: true, filterCellFiltered: true },
      { name: 'Vehicle', displayName: 'Vehicle', width: "220", cellTooltip: true, filterCellFiltered: true },
      { name: 'GrandTotal', displayName: 'Amount', width: "100", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'OrdStatus', displayName: 'Order Status', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'Remark', displayName: 'Remark', width: "*", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    AppComponent.Router.navigate(['/stock/stock-orders']);
  }
  onDeleteFunction = ($event) => {
    this.stock = $event.row;
    this.StartDate = this.appService.DateToString(this.StartDate);
    this.EndDate = this.appService.DateToString(this.EndDate);
    this.stockService.getStockOrderProductDetails(this.cpInfo.CPCode, this.stock.StkOrdId, this.stock.OrderNo, this.StartDate, this.EndDate).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        this.ProductArray = resp.Data;
        this.stock = this.stockService.calculateQtyGTotal(this.stock, this.ProductArray);
        $('#productsModal').modal('show');
      } else { AppComponent.SmartAlert.Errmsg(resp.Message); }
    });
  }
  onLoad() {
    this.loaderbtn = false;
    this.stockService.getStockOrderDetails(this.cpInfo.CPCode, this.appService.DateToString(this.StartDate), this.appService.DateToString(this.EndDate), this.stage).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.stockOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
        if (this.stage != 'PE' && this.stage != '') { this.showcol = false; } else { this.showcol = true; }
        this.configureGrid();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.stockOrdersData = [{}] }
    });
  }
  DispatchOrder(action) {
    if (action == 'RJ' && this.stock.RejectRemark == null || this.stock.RejectRemark == '') {
      AppComponent.SmartAlert.Errmsg(`Please enter reject remark`);
    } else {
      let text = action == 'AC' ? `You want to accept this order!` : `You want to reject this order!`
      let subText = action == 'AC' ? 'accept' : 'reject';
      Swal.fire({
        title: 'Are you sure?',
        text: `${text}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Yes, ${subText} it!`,
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.stock.OrderStage = action == 'AC' ? 'CA' : 'RJ';
          this.onSubmitDispatchOrder();
        } else if (result.dismiss === Swal.DismissReason.cancel) { }
      })
    }
  }
  onSubmitDispatchOrder() {
    this.loaderbtn = false;
    this.stock.OrderCode
    this.stock.CPCode = this.cpInfo.CPCode;
    this.stock.OrderType = "WB";
    this.stock.UserCode = this.cpInfo.EmpId;
    this.stock.Flag = "UP";
    this.stock.data = this.ProductArray;
    this.stockService.postBulkOrders(this.stock).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        this.onLoad();
        $('#productsModal').modal('hide');
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.EndDate != null) {
      if ((new Date(this.EndDate).getTime()) < (new Date(val).getTime())) {
        this.EndDate = '';
      }
    }
  }
  ngOnDestroy() {
    this.appService.removeBackdrop();
    //this.stockOrdersData = [{}];
  }
}