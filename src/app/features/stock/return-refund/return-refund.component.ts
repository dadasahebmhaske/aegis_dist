import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-return-refund',
  templateUrl: './return-refund.component.html',
  styleUrls: ['./return-refund.component.css']
})
export class ReturnRefundComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public chantype: any = [];
  public CPCode: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public EndDate: any = '';
  public loaderbtn: boolean = true;
  public minDate: Date;
  public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  public product: any = {PlantId:'',VehicleId:''};
  public ProductArray: any = [];
  public plantData:any=[];
  public StartDate: any = '';
  public stage: any = '';
  public stock: any = {};
  public stockOrdersData: any = [];
  public showcol: boolean = true;
  public vehicleData:any=[];
  public showPltVcle:boolean;
  constructor(private appService: AppService, public datashare: DatashareService, public stockService: StockService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data; this.CPCode = this.cpInfo.CPCode; this.onloadAll() });
    this.configureGrid();
    this.StartDate = this.EndDate = new Date();
    this.onLoad();
  }
  onloadAll() {
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
      this.chantype.unshift({ CPCode: this.cpInfo.CPCode, CPName: this.cpInfo.CPName });
      this.onsSelectSFSD();
    });
    this.stockService.getPlantDetails(this.cpInfo.CPCode).subscribe((resPl: any) => {
      if (resPl.StatusCode != 0) {
        this.plantData = resPl.Data;
      }
    });
    this.masterService.getVehicles(this.cpInfo.CPCode).subscribe((resV: any) => {
      if (resV.StatusCode != 0) {
        this.vehicleData = resV.Data;
      }
    });
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Stock Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      // {
      //   name: 'Select1', displayName: 'Edit', cellTemplate: `<button  style="margin:3px;" class="btn-primary btn-xs" ng-if="row.entity.OrderStage=='PE'"  ng-click="grid.appScope.editEmployee(row.entity)"  ">&nbsp;Edit&nbsp;</button> `
      //   , width: "48", exporterSuppressExport: true, visible: this.showcol,
      //   headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Edit</div>', enableFiltering: false
      // },
      {
        name: 'Select', displayName: 'Details', cellTemplate: `<a  style="margin:3px;" class="btn-warning btn-xs" ng-if="row.entity.IsActive=='Y'"   ng-click="grid.appScope.deleteEmployee(row.entity)"   >&nbsp;Add Return Qty&nbsp;</a> `
        , width: "117", exporterSuppressExport: true,
        headerCellTemplate: '<div style="text-align: center;margin-top: 30px;">Add Return Qty</div>', enableFiltering: false
      },
      { name: 'ProdSeg', displayName: 'Product Segment', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'Product', displayName: 'Product', width: "*", cellTooltip: true, filterCellFiltered: true },
      { name: 'OrderTypeName', displayName: 'Order Type', width: "150", cellTooltip: true, filterCellFiltered: true },
      { name: 'ProdQty', displayName: 'Order Qty', width: "120", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'RefundRate', displayName: 'Refund Rate', width: "150", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'ReturnQty', displayName: 'Return Qty', width: "150", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      { name: 'RefundAmt', displayName: 'Refund Amount', width: "150", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      //   { name: 'PaidAmount', displayName: 'Paid Amount', width: "120", cellClass: 'cell-right', cellTooltip: true, filterCellFiltered: true },
      //  { name: 'PayMode', displayName: 'Payment Mode', width: "140",  cellTooltip: true, filterCellFiltered: true },
      // { name: 'PayTransNo', displayName: 'Transaction No.', width: "180", cellTooltip: true, filterCellFiltered: true },
      //  { name: 'Remark', displayName: 'Remark', width: "200", cellTooltip: true, filterCellFiltered: true },
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onEditFunction = ($event) => {
    this.datashare.updateShareData($event.row);
    
  }
  onDeleteFunction = ($event) => {
    this.stock = Object.assign({},$event.row);
    let ind = this.stockOrdersData.findIndex(obj => obj.DispatchDtlsRefId==this.stock.DispatchDtlsRefId);
    this.stock.Index=ind;
    $('#productsModal').modal('show');
  }
  onEditReturnQty() {
    if(parseInt(this.stock.ReturnQty)<=parseInt(this.stock.ProdQty)){
this.stock.RefundAmt=parseFloat(this.stock.RefundRate==null || this.stock.RefundRate==''?0:this.stock.RefundRate) * parseFloat(this.stock.ReturnQty==null || this.stock.ReturnQty==''?0:this.stock.ReturnQty);
  }else{
    AppComponent.SmartAlert.Errmsg(`Return qty shoud be less than or  equal to ${this.stock.ProdQty}`);
    this.stock.ReturnQty='';
  }
}
  onSubmitReturnQty() {
this.stockOrdersData[this.stock.Index]=Object.assign({},this.stock);
$('#productsModal').modal('hide');
this.calculateTtlQty();
  }
  calculateTtlQty(){
    this.product.TtlReturnQty=0;
    this.product.TtlRefundAmt=0;
    for(let i=0;i<this.stockOrdersData.length;i++){
      if(parseInt(this.stockOrdersData[i].ReturnQty)>0)
      {
        this.product.TtlReturnQty=parseInt(this.product.TtlReturnQty) + parseInt(this.stockOrdersData[i].ReturnQty);
        this.product.TtlRefundAmt=parseInt(this.product.TtlRefundAmt) + parseInt(this.stockOrdersData[i].RefundAmt);
      }
      }
 
  }
  onLoad() {
    this.loaderbtn = false;
    let ParentCPCode;
    if(this.cpInfo.ChannelTypeFlag=='DI' || this.cpInfo.ChannelTypeFlag=='DE'){
      ParentCPCode=this.CPCode==this.cpInfo.CPCode?'':this.cpInfo.CPCode;
    }else{
    ParentCPCode=this.cpInfo.ParentCPCode;
    }
    
    this.stockService.getStockOrderDetailsForRefund(this.CPCode,ParentCPCode).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.stockOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.stockOrdersData = [{}] }
    });
  }
  onSubmitDispatchOrder() {
    if(parseInt(this.product.TtlReturnQty)>0){
    this.loaderbtn = false;
    this.product.StkReturnRefundId='';
    this.product.CPCode=this.CPCode
    this.product.ReturnStatus='PE';
    this.product.ApprovalRemark='';
    this.product.ImeiNo='';
    this.product.LatPos='';
    this.product.LanPos='';
    this.product.IsActive='Y';
    this.product.UserCode=this.cpInfo.EmpId;
    let ParentCPCode;
    if(this.cpInfo.ChannelTypeFlag=='DI' || this.cpInfo.ChannelTypeFlag=='DE'){
      ParentCPCode=this.CPCode==this.cpInfo.CPCode?'':this.cpInfo.CPCode;
    }else{
    ParentCPCode=this.cpInfo.ParentCPCode;
    }
    this.product.ParentCPCode=ParentCPCode;
    this.product.Flag='IN';
    let data=[];
    for(let i=0;i<this.stockOrdersData.length;i++){
      if(parseInt(this.stockOrdersData[i].ReturnQty)>0)
      data.push({
        "DispatchDtlsRefId":this.stockOrdersData[i].DispatchDtlsRefId ,
        "RefundRate": this.stockOrdersData[i].RefundRate,
        "ReturnQty": this.stockOrdersData[i].ReturnQty,
        "RefundAmt": this.stockOrdersData[i].RefundAmt
      });   }
 
    this.product.data=data;
    this.stockService.postReturnRefund(this.product).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
     AppComponent.Router.navigate(['/stock/return-refund-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  else { AppComponent.SmartAlert.Errmsg('Please add return qty'); 
  }
}
onsSelectSFSD(){
  if(this.cpInfo.ChannelTypeFlag=='DI'|| this.cpInfo.ChannelTypeFlag=='DE'){
    if(this.cpInfo.CPCode==this.CPCode){ this.showPltVcle=true;}else{this.showPltVcle=false;}
   } else{  this.showPltVcle=false;}
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