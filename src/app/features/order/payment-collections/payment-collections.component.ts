import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../order.service';
@Component({
  selector: 'sa-payment-collections',
  templateUrl: './payment-collections.component.html',
  styleUrls: ['./payment-collections.component.css']
})
export class PaymentCollectionsComponent implements OnInit {
  public cpInfo: any = {};
  public cust: any = { PayMode: '' };
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn: boolean = true;
  public PayModeData: any = [];
  constructor(private appService: AppService, private dataShare: DatashareService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.allOnLoad();
  }
  allOnLoad() {
    this.orderService.getPayMode().subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.PayModeData = resR.Data;
    });
  }
  onGetCustomer() {
    this.loaderbtn = false;
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.orderService.getCustVerify(this.cpInfo.CPCode, this.cust).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.cust = Object.assign(this.cust, resData.Data[0])
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onSubmitPayment() {
    if (this.cust.ConsNo != null || this.cust.ConsNo != undefined) {
      this.loaderbtn = false;
      this.cust.CPCode = this.cpInfo.CPCode;
      this.cust.Lat = '';
      this.cust.Lon = '';
      this.cust.IsActive = 'Y'
      this.cust.UserCode = this.cpInfo.EmpId;
      this.cust.Apptype = "DI";
      this.cust.PayRefId = '';
      let docobj;
      docobj = this.masterService.filterData(this.PayModeData, this.cust.PayMode, 'PayMode');
      this.cust.PayModeId = docobj[0].PayModeId;
      this.cust.BookRefNo = '';
      this.cust.DelRefNo = '';
      this.cust.SalesAmount = '';
      this.cust.ChequeNo = this.cust.ChequeNo == null ? '' : this.cust.ChequeNo;
      this.cust.ChequeDate = this.cust.ChequeDate == null ? '' : this.cust.ChequeDate;
      this.orderService.postCustPayment(this.cust).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/order/cash-flow-register']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please Verify Customer First.`);
    }
  }
}
