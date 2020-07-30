import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';

import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import * as angular from 'angular';
import { Config } from 'protractor'; 
import { MasterService } from '@app/core/custom-services/master.service';
@Component({
  selector: 'sa-order-dispatch-details',
  templateUrl: './order-dispatch-details.component.html',
  styleUrls: ['./order-dispatch-details.component.css']
})
export class OrderDispatchDetailsComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  gridOptions: IGridoption;
  public loaderbtn:boolean = true;
  prodtype:any={};
  Order:any={};
  olddata:any={};
  public actionData: any = {};
  public gridhide: boolean;
  RowData:any={};
  OrderTdata:any=[];
  ProdSegdata:any=[];
  ProductData:any=[];
  rowIndex:number;
  DispatchRemark:string;
  constructor(private http: HttpClient,private appService: AppService, public dataShare: DatashareService,public masterService:MasterService, public stockService: StockService) { }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.stockService.getProductSegmentDetails(this.cpInfo.ChannelId).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.ProdSegdata = resR.Data;
    });
    this.stockService.getOrderType().subscribe((resOD: any) => {
      if (resOD.StatusCode != 0) {
        this.OrderTdata = resOD.Data;
      }
    });
    // this.http.get(AppComponent.BaseUrl +'Master/GetMasterRecords?MasterCode=ORDT&StartDate=&EndDate&UserCode&IsActive=Y&PriCode&Name=&TwoFlag&ISHome=',{headers:AppComponent.headers}).subscribe((res:Config)=>{
    //   if (res.StatusCode != 0){
    //     this.OrderTdata=res.Data;
    //   }
    // });
    this.dataShare.GetSharedData.subscribe(data => {
      this.Order = this.olddata = data;
      this.getOderDetails(this.Order.StkOrdId);
     // console.log(this.Order);
    });
    // if(sessionStorage.actionData!=null){
    //   this.gridhide= false;
    //   this.Order = angular.fromJson(sessionStorage.actionData);
    //   this.getOderDetails(this.Order.StkOrdId);
    //   this.olddata = angular.fromJson(sessionStorage.BOrder);
    // }   

  }

  getOderDetails(OrdId)
  {
    this.stockService.getSFSDAcceptedOrders(OrdId).subscribe((res: any) => {
      if (res.StatusCode != 0) {
        this.OrderTdata = res.Data;
        this.actionData=res.Data;
        this.configureGrid();
      }else {
        this.actionData = [{}];
        AppComponent.SmartAlert.Errmsg(res.Message);	
        AppComponent.Router.navigate(['stock/order-and-dispatch-details']);  
      }
    });
    // this.http.get(AppComponent.BaseUrl+'Stock/GetStockOrderDtls?StkOrdId='+par+'&OrderNo=&OrderType=&CPCode=&PlantId=&VehicleId=&OrderStage=PE&IsActive=Y&OrderCode=&Flag=DI',{headers:AppComponent.headers}).subscribe((res:Config)=>{
    //   if (res.StatusCode != 0) {
    //     this.gridhide= false;
    //     this.actionData=res.Data;
    //     this.configureGrid();
    //   } else {
    //     this.actionData = [{}];
    //     this.gridhide =  true;
    //     AppComponent.SmartAlert.Errmsg(res.Message);	
    //     AppComponent.Router.navigate(['stock/order-and-dispatch-details']);  
    //   }
    // });
  }

  getProduct(Id){
    if(this.Order.OrderType=='RO'||this.Order.OrderType=='DR'){
      this.prodtype='F';
    } else { 
      this.prodtype='E';
    }
    this.Order.CPCode = this.Order.CPCode == undefined || this.Order.CPCode == null ? '' : this.Order.CPCode;
    this.Order.PlantId = this.Order.PlantId == undefined || this.Order.PlantId == null ? '' : this.Order.PlantId;

    this.masterService.getNewProducts(this.Order.CPCode, this.Order.PlantId, Id, this.prodtype,'STSPA').subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.ProductData = resPT.Data;
      } else { this.ProductData = [];this.Order.ProdId=''; }
    });
    // this.http.get(AppComponent.BaseUrl +'Settings/GetAdminPriceAllocation?CPCode='+this.Order.CPCode+'&PlantId='+this.Order.PlantId+'&ProdSegId='+Id+'&ProdType='+this.prodtype+'&IsActive=Y',{headers:AppComponent.headers}).subscribe((res:Config)=>{
    //   if (res.StatusCode != 0){
    //      this.ProductData=res.Data;
    //      this.getPrice();
    //   } else {
    //     this.ProductData=[];
    //     this.Order.ProdId='';
    //   }
    // });
  }

  getPrice(){
    var Count= this.ProductData.filter(abc => abc.ProdId == this.Order.ProdId);
    this.Order.ProdRate=Count[0].ProdPrice;
    this.Order.CgstAmt=Count[0].CgstPer;
    this.Order.SgstAmt=Count[0].SgstPer;
    this.Order.IgstAmt=Count[0].IgstPer;
    this.Order.ProdId=Count[0].ProdId;
    this.getGTotal();
  }
  
  getGTotal(){
    var Sub = this.Order.ProdRate * this.Order.ProdQty;
    this.Order.SubTotal = Sub;
    var tax = this.Order.IsHomeState == 'Y' ? (this.Order.CgstAmt + this.Order.SgstAmt) : this.Order.IgstAmt;
    this.Order.ProdAmt = Sub+ ((Sub * tax )/ 100);
  }

  onEditFunction = ($event) => {
    let cpcode=this.Order.CPCode;
    this.Order = {};
    this.RowData = JSON.stringify($event.row);
    this.Order = angular.fromJson(this.RowData);
    this.Order.CPCode=cpcode;
    this.getProduct(this.Order.ProdSegId);
    $("#myModal").modal('show');
  }

  // onDeleteFunction = ($event) => {
  //   this.Order = $event.row; 
  // }

  configureGrid() {
    this.gridOptions = <IGridoption> {};
    this.gridOptions.enableGridMenu = false;
    this.gridOptions.exporterMenuPdf = false;
     this.gridOptions.exporterExcelFilename = 'Sub Dealer Dispatch Order .xlsx';
    // this.gridOptions.exporterSuppressColumns = ['Edit', 'Activate / Delete'];
    // this.gridOptions.exporterColumnScaleFactor = 5;
    let columnDefs = [];
    columnDefs = [
      {
        name: 'Edit', displayName: 'Edit', cellTemplate: '<button  style="margin-left:10px; margin-top:3px;" class="btn-primary btn-xs"  ng-click="grid.appScope.editEmployee(row.entity)"  data-title="Close" ">&nbsp;Edit&nbsp;</button> ',
        width: '60', headerCellTemplate: '<div style="text-align: center;margin-top: 22px;">Edit</div>', enableFiltering: false },

      { name: 'ProdSeg', displayName: 'Product Segment', width: '200', cellTooltip: true, filterCellFiltered: true},
      { name: 'Product', displayName: 'Product', width: '200', cellTooltip: true, filterCellFiltered: true},
      { name: 'OrderTypeName', displayName: 'Order Type', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdRate', displayName: 'Product Rate',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdQty', displayName: 'Product Qty',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'SubTotal', displayName: 'Product Subtotal',cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'CgstAmt', displayName: 'CGST Amount',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},    
      { name: 'SgstAmt', displayName: 'SGST Amount',cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'IgstAmt', displayName: 'IGST Amount',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'DiscountAmt', displayName: 'Discount Amount',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},    
      // { name: 'PlantId', displayName: 'PlantId', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdAmt', displayName: 'Grand Total',cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'RefundRate', displayName: 'Refund Rate',cellClass: 'cell-right', width: '150', cellTooltip: true, filterCellFiltered: true},
      { name: 'RefundAmt', displayName: 'Refund Amount',cellClass: 'cell-right',  width: '150', cellTooltip: true, filterCellFiltered: true},     
      
    ];
    this.gridOptions.columnDefs = columnDefs;
  }

  PostDispatchOrder(fl){
    this.loaderbtn = false;
    let TtlQty=0;
    let DiscountAmt=0;
    let SubTotal=0;
    let TtlIgstAmt=0;
    let TtlCgstAmt=0;
    let TtlSgstAmt=0;
    let GrandTotal=0;
    let TtlRefundAmt=0;
    let val = fl == 0 ? 'DI' : 'RJ';
    for (let i=0; i<this.actionData.length; i++){
      TtlQty=TtlQty +this.actionData[i].ProdQty;
      DiscountAmt=DiscountAmt + this.actionData[i].DiscountAmt;
      SubTotal=SubTotal + this.actionData[i].SubTotal ;
      TtlIgstAmt=TtlIgstAmt + this.actionData[i].IgstAmt ;
      TtlCgstAmt=TtlCgstAmt + this.actionData[i].CgstAmt ;
      TtlSgstAmt=TtlSgstAmt + this.actionData[i].SgstAmt ;
      GrandTotal=GrandTotal + this.actionData[i].ProdAmt ;
      TtlRefundAmt= TtlRefundAmt + this.actionData[i].RefundAmt ;
    }
    let SendData={
      "data":angular.toJson(this.actionData),
      StkOrdId: this.olddata.StkOrdId,
      StkDispatchId:'',
      OrderNo:this.olddata.OrderNo,
      CPCode:this.olddata.CPCode,
      PlantId:this.olddata.PlantId,
      VehicleId:this.olddata.VehicleId,
      OrderStage: val,
      TtlQty:TtlQty,
      DiscountAmt:DiscountAmt,
      SubTotal:SubTotal,
      TtlIgstAmt:TtlIgstAmt,
      TtlCgstAmt:TtlCgstAmt,
      TtlSgstAmt:TtlSgstAmt,
      GrandTotal:GrandTotal,
      TtlRefundAmt:TtlRefundAmt,
      DispatchRemark:this.DispatchRemark,
      AccepRemark:"",
      InvoiceNo:"",
      ImeiNo:"",
      LatPos:"",
      LanPos:"",
      IsActive:"Y",
      UserCode: this.cpInfo.EmpId,
      Flag:"IN",
      ParentCPCode:this.cpInfo.ParentCPCode==null?'':this.cpInfo.ParentCPCode,
      
    }
    this.stockService.postDispatchOrders(SendData).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        window.location.href = `${AppComponent.BaseUrlDist}Document/GetStockInvoice?StkOrdId=${this.olddata.StkOrdId}&CPCode=&ConsId=`, '_blank';
    
        AppComponent.Router.navigate(['stock/order-and-dispatch-details']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
    // this.http.post(AppComponent.BaseUrl +'Stock/ProcessOrderDispatch',SendData,{headers:AppComponent.headers}).subscribe((res:Config)=>{
    //   if (res.StatusCode != 0){      
    //     AppComponent.Router.navigate(['stock/order-and-dispatch-details']);
    //   } else {
    //     AppComponent.SmartAlert.Errmsg(res.Message);
    //   }
    // });

  }

  //Check this.
  PostRejectOrder(){
    // let searchQty = this.Order.OrderCode
    // let newdata = this.actionData.findIndex(this.actionData.StkOrdId == this.Order.StkOrdId)
    let index = this.actionData.findIndex(abc => abc.OrderCode == this.Order.OrderCode)
    this.actionData[index] = this.Order;
    // this.actionData[index].CgstAmt = this.Order.CgstPer;
    // this.actionData[index].SgstAmt = this.Order.SgstPer;
    // this.actionData[index].IgstAmt = this.Order.IgstPer;
    // this.actionData[index].ProdSubTtl = this.Order.ProdSubTtlnew;
    // this.actionData[index].GrandTotal = this.Order.GrandTotalnew;

    if( this.actionData!=null){
      sessionStorage.AOrderData = JSON.stringify( this.actionData );
    }  
    $("#myModal").modal('hide');
  }
  ngOnDestroy() {
   this.appService.removeBackdrop();
    this.dataShare.updateShareData(null);
   }
}


