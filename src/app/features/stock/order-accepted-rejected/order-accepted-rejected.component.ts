import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGridColumnDefs, IGridoption } from '../../../interface/igridoption';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'sa-order-accepted-rejected',
  templateUrl: './order-accepted-rejected.component.html',
  styleUrls: ['./order-accepted-rejected.component.css']
})
export class OrderAcceptedRejectedComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  //public datePickerConfig: Partial<BsDatepickerConfig>;
  //public EndDate: any = '';
  public loaderbtn: boolean = true;
  // public minDate: Date;
  // public maxDate: Date = new Date();
  public gridOptions: IGridoption;
  // public ProductArray: any = [];
  // public StartDate: any = '';
   public stage: any = '';
   //public stock: any = {};
   
  // public showcol: boolean = true;
  public stockOrdersData: any = [];
  public Order:any={};
  constructor(private appService: AppService, public dataShare: DatashareService, public stockService: StockService) {
    //this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {
      this.Order = data;
    });
    this.configureGrid();
    this.onLoad();
  }
  configureGrid() {
    this.gridOptions = <IGridoption>{}
    this.gridOptions.exporterMenuPdf = false;
    this.gridOptions.exporterExcelFilename = 'Sub Dealer Stock Orders list.xlsx';
    let columnDefs = [];
    columnDefs = [
      { name: 'ProdSeg', displayName: 'Product Segment', width: '*', cellTooltip: true, filterCellFiltered: true},
      { name: 'Product', displayName: 'Product', width: '*', cellTooltip: true, filterCellFiltered: true},
      { name: 'ProdQty', displayName: 'Product Qty.', cellClass: 'cell-right', width: '*', cellTooltip: true, filterCellFiltered: true},
      { name: 'OrderTypeName', displayName: 'Order Type', width: '*', cellTooltip: true, filterCellFiltered: true},
    ]
    this.gridOptions.columnDefs = columnDefs;
  }
  onLoad() {
    this.loaderbtn = false;
    this.stockService.getSFSDOrderDetails(this.Order.StkOrdId).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.stockOrdersData = resData.Data;
        AppComponent.SmartAlert.Success(resData.Message);
       // this.configureGrid();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); this.stockOrdersData = [{}];
      AppComponent.Router.navigate(['stock/order-and-dispatch-details']); }
    });
  }

  PostAcceptOrder()
  {  this.loaderbtn=false;
    this.Order.data=this.stockOrdersData,
    this.Order.Flag='UP';
    this.Order.OrderStage='AC';
    this.Order.ParentCPCode=this.cpInfo.ParentCPCode==null?'':this.cpInfo.ParentCPCode;
    this.stockService.acceptSDSFOrder(this.Order).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.Router.navigate(['/stock/order-dispatch-details']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); 
        this.dataShare.updateShareData(null);
        AppComponent.Router.navigate(['stock/order-and-dispatch-details']); }
    });  
  }

  PostRejectOrder(){
    this.loaderbtn=false;
    this.Order.data=this.stockOrdersData,
    this.Order.Flag='UP';
    this.Order.OrderStage='RJ';
    this.Order.RejectRemark="";
    this.Order.ParentCPCode=this.cpInfo.ParentCPCode==null?'':this.cpInfo.ParentCPCode;
    this.stockService.acceptSDSFOrder(this.Order).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.dataShare.updateShareData(null);
        AppComponent.Router.navigate(['stock/order-and-dispatch-details']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); 
         }
    });  
  }
  // DispatchOrder(action) {
  //   if (action == 'RJ' && this.stock.RejectRemark == null || this.stock.RejectRemark == '') {
  //     AppComponent.SmartAlert.Errmsg(`Please enter reject remark`);
  //   } else {
  //     let text = action == 'AC' ? `You want to accept this order!` : `You want to reject this order!`
  //     let subText = action == 'AC' ? 'accept' : 'reject';
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: `${text}`,
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: `Yes, ${subText} it!`,
  //       cancelButtonText: 'No, keep it'
  //     }).then((result) => {
  //       if (result.value) {
  //         this.stock.OrderStage = action == 'AC' ? 'CA' : 'RJ';
  //         this.onSubmitDispatchOrder();
  //       } else if (result.dismiss === Swal.DismissReason.cancel) { }
  //     })
  //   }
  // }
  // onSubmitDispatchOrder() {
  //   this.loaderbtn = false;
  //   this.stock.OrderCode
  //   this.stock.CPCode = this.cpInfo.CPCode;
  //   this.stock.OrderType = "WB";
  //   this.stock.UserCode = this.cpInfo.EmpId;
  //   this.stock.Flag = "UP";
  //  // this.stock.data = this.ProductArray;
  //   this.stockService.postBulkOrders(this.stock).subscribe((resData: any) => {
  //     this.loaderbtn = true;
  //     if (resData.StatusCode != 0) {
  //       AppComponent.SmartAlert.Success(resData.Message);
  //       this.onLoad();
  //       $('#productsModal').modal('hide');
  //     }
  //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
  //   });
  // }
  // resetEndDate(val) {
  //   this.minDate = val;
  //   if (val != undefined && val != null && this.EndDate != null) {
  //     if ((new Date(this.EndDate).getTime()) < (new Date(val).getTime())) {
  //       this.EndDate = '';
  //     }
  //   }
  // }
  ngOnDestroy() {
   // this.appService.removeBackdrop();
    //this.stockOrdersData = [{}];
  }
}