import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '@app/features/order/order.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'sa-cheque-and-dd-payment-status',
  templateUrl: './cheque-and-dd-payment-status.component.html',
  styleUrls: ['./cheque-and-dd-payment-status.component.css']
})
export class ChequeAndDdPaymentStatusComponent implements OnInit, OnDestroy {

    public cpInfo: any = {};
    public cust: any = { PayMode: '',PayStatus:'' };
    public datePickerConfig: Partial<BsDatepickerConfig>;
    public loaderbtn: boolean = true;
    public PayModeData: any = [];
    public PayStatusData:any=[];
    public minDate:Date;
    constructor(private appService: AppService, private dataShare: DatashareService,private financeService:FinanceService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
    }
    ngOnInit() {
      this.appService.getAppData().subscribe(data => { this.cpInfo = data });
      this.allOnLoad();
      this.dataShare.GetSharedData.subscribe(data => {
        this.cust = data == null ? {  PayMode: '',PayStatus:'' } : data;
        this.minDate=new Date(this.cust.ChequeDate);
        this.cust.PayStatus =  this.cust.PayStatus == null ? '':this.cust.PayStatus;
      });
    }
    allOnLoad() {
      this.financeService.getPayMode().subscribe((resR: any) => {
        if (resR.StatusCode != 0)
          this.PayModeData = resR.Data;
      });
      this.financeService.getPayStatus().subscribe((resPR: any) => {
        if (resPR.StatusCode != 0)
          this.PayStatusData = resPR.Data; 
      });
    }
    // onGetCustomer() {
    //   this.loaderbtn = false;
    //   this.cust = this.customerService.checkCustOrMobNo(this.cust);
    //   this.orderService.getCustVerify(this.cpInfo.CPCode, this.cust).subscribe((resData: any) => {
    //     this.loaderbtn = true;
    //     if (resData.StatusCode != 0) {
    //       this.cust = Object.assign(this.cust, resData.Data[0])
    //       AppComponent.SmartAlert.Success(resData.Message);
    //     }
    //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    //   });
    // }
    onSubmitPayment() {
      if (this.cust.ConsNo != null || this.cust.ConsNo != undefined) {
        this.loaderbtn = false;
        // this.cust.CPCode = this.cpInfo.CPCode;
        // this.cust.Lat = '';
        // this.cust.Lon = '';
        // this.cust.IsActive = 'Y'
        this.cust.UserCode = this.cpInfo.EmpId;
        // this.cust.Apptype = "DI";
        // this.cust.PayRefId = '';
        // let docobj;
        // docobj = this.masterService.filterData(this.PayModeData, this.cust.PayMode, 'PayMode');
        // this.cust.PayModeId = docobj[0].PayModeId;
        // this.cust.BookRefNo = '';
        // this.cust.DelRefNo = '';
        // this.cust.SalesAmount = '';
        // this.cust.ChequeNo = this.cust.ChequeNo == null ? '' : this.cust.ChequeNo;
        // this.cust.ChequeDate = this.cust.ChequeDate == null ? '' : this.cust.ChequeDate;
        this.financeService.postCustPaymentStatus(this.cust).subscribe((resData: any) => {
          this.loaderbtn = true;
          if (resData.StatusCode != 0) {
            AppComponent.SmartAlert.Success(resData.Message);
            AppComponent.Router.navigate(['/finance/cheque-and-dd-payment-status-list']);
          }
          else { AppComponent.SmartAlert.Errmsg(resData.Message); }
        });
      } else {
        AppComponent.SmartAlert.Errmsg(`Please Verify Customer First.`);
      }
    }
    ngOnDestroy() {
      this.dataShare.updateShareData(null);
    }
  }
  