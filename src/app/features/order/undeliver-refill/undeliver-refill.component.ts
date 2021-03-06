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
  selector: 'sa-undeliver-refill',
  templateUrl: './undeliver-refill.component.html',
  styleUrls: ['./undeliver-refill.component.css']
})
export class UndeliverRefillComponent implements OnInit {
  public cpInfo: any = {};

  public custData: any = {};
  public deliverrefill: any = { AllocatedUserCode: '' };
  public ProductArray: any = [];
  public loaderbtn: boolean = true;
  public reasonArrayData: any = [];

  constructor(private appService: AppService, private dataShare: DatashareService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {
      this.deliverrefill = data == null ? { IsActive: 'Y' } : data;
      this.deliverrefill.ReturnResionId = '';
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
    this.orderService.getReasonRemark().subscribe((respD: any) => {
      if (respD.StatusCode != 0)
        this.reasonArrayData = respD.Data;
    });
  }
  markUndeliverRefill() {
    if (this.deliverrefill.CashMemoRefNo != null) {
      this.loaderbtn = false;
      this.deliverrefill.CPCode = this.cpInfo.CPCode;
      this.deliverrefill.Lat = '';
      this.deliverrefill.Lon = '';
      this.deliverrefill.IsActive = 'Y'
      this.deliverrefill.UserCode = this.cpInfo.EmpId;
      this.deliverrefill.ImeiNo = '';
      this.deliverrefill.Apptype = "DI";
      this.deliverrefill.Status = 5;
      this.deliverrefill.BatteryLevel = '';
      this.orderService.postCashMemoUndeliverRefill(this.deliverrefill).subscribe((resData: any) => {
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
