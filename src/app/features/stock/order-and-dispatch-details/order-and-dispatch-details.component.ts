import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-order-and-dispatch-details',
  templateUrl: './order-and-dispatch-details.component.html',
  styleUrls: ['./order-and-dispatch-details.component.css']
})
export class OrderAndDispatchDetailsComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public EndDate: any = '';
  public filepreview: any;
  public imgUrl: string;
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  public ProductArray: any = [];
  public StartDate: any = '';
  public order:any={};
  public stock: any = {};
  public stockOrdersData: any = [];
  public accvis:boolean;
  public dispvis:boolean;
  public rjvis:boolean;
  Status:any=[];
  plantId:any;
  constructor(private appService: AppService, private datashare: DatashareService,private masterService:MasterService,private stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.imgUrl = `${AppComponent.ImageUrl}StockOrderDocs/`;
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.order.OrderStage='PE';
    this.accvis=false;  
    this.dispvis=false;
    this.rjvis=false;  
    this.configureGrid();
    this.Status=[{OrderStage:'PE',OrderStageDesc:'Pending'},{OrderStage:'AC',OrderStageDesc:'Accepted'},{OrderStage:'DI',OrderStageDesc:'Dispatched'},{OrderStage:'RJ',OrderStageDesc:'Rejected'}];
    this.StartDate = this.EndDate = new Date();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'SF / SD Orders & Dispatch list.xlsx';
    let columnDefs = [];
    columnDefs = [

      { name: 'Process / View', displayName: '', headerCellTemplate: `<div style="margin:5px 5px; text-align:center;">Process / View</div>`,
      cellTemplate: `<button ng-if="row.entity.OrderStage=='PE'" class="btn-primary btn-xs"  style="margin-left:9px; margin-top:3px;"
      ng-click="grid.appScope.editEmployee(row.entity)" data-title="Process"> &nbsp;Process &nbsp;</button>
      <button ng-if="row.entity.OrderStage=='DI'||row.entity.OrderStage=='AC' ||row.entity.OrderStage=='RJ'" class="btn-primary btn-xs" style="margin-left:19px; margin-top:3px;"
      ng-click="grid.appScope.editEmployee(row.entity)" data-title="View">&nbsp;View &nbsp;</button>`,
      width: '90', exporterSuppressExport: true, enableFiltering: true, },
      {
        name: 'Select', displayName: 'Details', cellTemplate: `<button  style="margin-left:15px; margin-top:3px;" class="btn-warning btn-xs" ng-if="row.entity.OrderStage=='DI'"   ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;Invoice&nbsp;</button> `
        , width: "91", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Download</div>', enableFiltering: false
      },

    { name: 'OrderNo', displayName: 'Order No', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true,visible:false},
    { name: 'PlantName', displayName: 'Plant', width: '190', cellTooltip: true, filterCellFiltered: true,visible:false},
    { name: 'CPCode', displayName: 'CP Code', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'CPName', displayName: 'Channel Partner', width: '200', cellTooltip: true, filterCellFiltered: true},
    { name: 'Vehicle', displayName: 'Vehicle', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'OrderDt', displayName: 'Order Date', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'AcceptDt', displayName: 'Accept Date', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true, visible:this.accvis},
    { name: 'DispatchDt', displayName: 'Dispatch Date', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true, visible:this.dispvis},
    { name: 'RejectDt', displayName: 'Reject Date', cellClass: 'cell-center', width: '150', cellTooltip: true, filterCellFiltered: true, visible:this.rjvis},
    //{ name: 'ProdAmt', displayName: 'Product Amount',  width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'SubTotal', displayName: 'Sub Total', cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'DiscountAmt', displayName: 'Discount Amount',cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'TtlIgstAmt', displayName: 'IGST Amount',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'TtlCgstAmt', displayName: 'CGST Amount',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'TtlSgstAmt', displayName: 'SGST Amount',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'GrandTotal', displayName: 'Grand Total',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
    { name: 'PaidAmount', displayName: 'Paid Amount', width: "120", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
       { name: 'PayMode', displayName: 'Payment Mode', width: "140",  cellTooltip: true, filterCellFiltered: true },
      { name: 'PayTransNo', displayName: 'Transaction No.', width: "180", cellTooltip: true, filterCellFiltered: true },
      { name: 'ImageName', displayName: 'Payment Proof', width: "180", cellTooltip: true, filterCellFiltered: true,visible:false },
      {
        name: 'ImageName', displayName: 'Payment Proof', cellTemplate: `<button  style="margin:2px 0; width:100%;" class="btn-success btn-xs" ng-if="row.entity.IsActive=='Y'"   ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;View&nbsp;</button> `
        , width: "140", exporterSuppressExport: true,filterCellFiltered: true},
    { name: 'Remarks', displayName: 'Remarks', width: '250', cellTooltip: true, filterCellFiltered: true},
    { name: 'RejectRemark', displayName: 'Reject Remark', width: '150', cellTooltip: true, filterCellFiltered: true, visible:this.rjvis},
    { name: 'CreatedBy', displayName: 'Created By',  width: '190', cellTooltip: true, filterCellFiltered: true},
    { name: 'UpdatedBy', displayName: 'Updated By',  width: '190', cellTooltip: true, filterCellFiltered: true},
    
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
   
    //AppComponent.Router.navigate(['/stock/order-accepted-rejected']);

    $event.row.CEdit = 'UP';
  
    if($event.row.OrderStage=='DI'){
      $event.row.ShowRepo = 'Dispatched';
      AppComponent.Router.navigate(['/stock/order-accepted-rejected-dispatched']);
    } else if ($event.row.OrderStage=='AC'){
      $event.row.ShowRepo = 'Accepted';
      AppComponent.Router.navigate(['/stock/order-accepted-rejected-dispatched']);
    } else if( $event.row.OrderStage=='PE' && $event.row.IsDispatch=='Y') {  
      AppComponent.Router.navigate(['/stock/order-dispatch-details']); 
    } else if( $event.row.OrderStage=='PE' && $event.row.IsDispatch=='N') { 
      AppComponent.Router.navigate(['/stock/order-accepted-rejected']); 
    } else if($event.row.OrderStage=='RJ'){
      $event.row.ShowRepo = 'Rejected';
      AppComponent.Router.navigate(['/stock/order-accepted-rejected-dispatched']); 
    }
     this.datashare.updateShareData($event.row);
  }
  onDeleteFunction = ($event) => {
    // let svCustData = {
    //   "data":
    //     [
    //       { "SvNumber":event.row.SVNumber,
    //         "CPCode": this.deliverFilter.CPCode,
    //         "ConsId": event.row.ConsId,
    //         "IsActive": "Y"
    //       }
    //     ]
    // }
    // let para = JSON.stringify(svCustData.data);
    window.location.href = `${AppComponent.BaseUrlDist}Document/GetStockInvoice?StkOrdId=${$event.row.StkOrdId}&CPCode=&ConsId=`, '_blank';
    
  }
  // onDeleteFunction = ($event) => {
  //   this.stock = $event.row;
  //   this.masterService.getDocumentDetails('INV', this.stock.StkOrdId).subscribe((response: any) => {
  //     if (response.StatusCode != 0)
  //       if (response.Data.length > 0) { 
  //         this.filepreview=`${this.imgUrl}${response.Data[response.Data.length-1].DocFileName}`;
  //         //window.open(`${this.filepreview}`, '_blank');
  //         $('#paymentModal').modal('show');}
  //   });
  // }
  onLoad() {
    this.loaderbtn = false;
    //this.order.PlantId=4;
    this.order.PlantId = this.order.PlantId == 'null' || this.order.PlantId==undefined ? '' : this.order.PlantId;
    this.accvis = this.order.OrderStage == 'AC' ? true : false;
    this.dispvis = this.order.OrderStage == 'DI' ? true : false;
    this.rjvis = this.order.OrderStage == 'RJ' ? true : false;
    this.order.CPCode=this.order.CPCode==undefined?'':this.order.CPCode;
    this.order.ParentCPCode=this.cpInfo.ParentCPCode==null?this.cpInfo.CPCode:this.cpInfo.ParentCPCode;
    this.stockService.getSFSDStockOrderDetails(this.appService.DateToString(this.StartDate), this.appService.DateToString(this.EndDate), this.order).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.stockOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
        this.configureGrid();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.stockOrdersData = [{}] }
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