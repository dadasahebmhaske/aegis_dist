import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'sa-deliver-refill',
  templateUrl: './deliver-refill.component.html',
  styleUrls: ['./deliver-refill.component.css']
})
export class DeliverRefillComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public custData: any = {};
  public deliverrefill: any = { AllocatedUserCode: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public delBoyData: any = [];
  public ProductArray: any = [];
  public loaderbtn: boolean = true;
  public Edeliverrefill: any = {};
  constructor(private appService: AppService, private dataShare: DatashareService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {

      this.deliverrefill = data == null ? { IsActive: 'Y' } : data;

      this.orderService.getCashMemoProducts(this.cpInfo.CPCode, this.deliverrefill.CashMemoRefNo).subscribe((resp: any) => {
        if (resp.StatusCode != 0) {
          this.ProductArray = resp.Data;
          this.deliverrefill = this.orderService.calculateQtyGTotalRefillDelivery(this.deliverrefill, this.ProductArray);
        }
      });
    });
    this.allOnLoad();
  }
  allOnLoad() {
    this.masterService.getEmpoyeeDelBoy(this.cpInfo.CPCode).subscribe((respD: any) => {
      if (respD.StatusCode != 0)
        this.delBoyData = respD.Data;
    });
  }
  calculatePending() {
    this.deliverrefill.PendingAmt = parseInt(this.deliverrefill.TotalAmtPayable) - (parseInt(this.deliverrefill.TotalReceivedAmount))
  }
  onEditProduct(data, index) {
    $('#qtyModal').modal('show');
    this.Edeliverrefill.ProdQty = data.ProdQty;
    this.Edeliverrefill.index = index;
  }
  onSubmitqty() {
    this.ProductArray[this.Edeliverrefill.index].ProdQty = this.Edeliverrefill.ProdQty;
    this.ProductArray[this.Edeliverrefill.index].TotalAmount = parseInt(this.ProductArray[this.Edeliverrefill.index].ProdRate) * parseInt(this.Edeliverrefill.ProdQty);
    this.ProductArray[this.Edeliverrefill.index].ReturnQty = this.Edeliverrefill.ReturnQty;
    this.deliverrefill = this.orderService.calculateQtyGTotalRefillDelivery(this.deliverrefill, this.ProductArray);
    this.Edeliverrefill = {};
    $('#qtyModal').modal('hide');
  }
  SavedeliverRefill() {
    if (this.deliverrefill.CashMemoRefNo != null) {
      this.loaderbtn = false;
      this.deliverrefill.CPCode = this.cpInfo.CPCode;
      this.deliverrefill.Lat = '';
      this.deliverrefill.Lon = '';
      this.deliverrefill.IsActive = 'Y'
      this.deliverrefill.UserCode = this.cpInfo.EmpId;
      this.deliverrefill.ImeiNo = '';
      this.deliverrefill.Apptype = "DI";
      this.deliverrefill.PayMode = "CA";
      this.deliverrefill.Status = 4;
      this.deliverrefill.TotalDiscount = this.deliverrefill.Discount;
      this.deliverrefill.TotalReturnQty = this.deliverrefill.ReturnQty;
      this.deliverrefill.TotalQty = this.deliverrefill.QtyTotal;
      this.deliverrefill.data = this.ProductArray;
      this.orderService.postCashMemoDeliverRefill(this.deliverrefill).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.ProductArray = [];
          AppComponent.Router.navigate(['/order/cash-memo-and-refill-delivery']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Cash memo not generated`);
    }
  }

  ngOnDestroy() {
    this.dataShare.updateShareData(null);
    this.appService.removeBackdrop();
  }
}


