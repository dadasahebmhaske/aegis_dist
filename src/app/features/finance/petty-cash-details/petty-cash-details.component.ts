import { Component, OnInit } from '@angular/core';
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
  selector: 'sa-petty-cash-details-deposit',
  templateUrl: './petty-cash-details.component.html',
  styleUrls: ['./petty-cash-details.component.css']
})
export class PettyCashDetailsComponent implements OnInit {
    public cpInfo: any = {};
    public transfer: any ={ };
    public datePickerConfig: Partial<BsDatepickerConfig>;
    public loaderbtn: boolean = true;
    public PayModeData: any = [];
    constructor(private appService: AppService, private dataShare: DatashareService,private financeService:FinanceService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
      this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
    }
    ngOnInit() {
      this.appService.getAppData().subscribe(data => { this.cpInfo = data });
      this.allOnLoad();
    }
    allOnLoad() {
      this.financeService.getPayMode().subscribe((resR: any) => {
        if (resR.StatusCode != 0)
          this.PayModeData = resR.Data;
      });
    }
    onSubmitPayment() {
      if (this.transfer.CreditAmount != null || this.transfer.CreditAmount>0) {
        this.transfer.CPCode = this.cpInfo.CPCode;
        this.transfer.DebitAmount = 0;
         this.transfer.CrDbFlag = 'CR';
        this.transfer.TransferFlag = 'EX';
        this.transfer.IsActive = 'Y';
        this.transfer.UserCode = this.cpInfo.EmpId;
    //this.transfer.CreditAmount = CreditAmount;
          this.transfer.RefNos = '';
          this.transfer.data = [{RefNo:''}];
          let api = 'InsertPettyCashAccount';
          this.loaderbtn=false;
          this.financeService.postTransferToAccount(this.transfer,api).subscribe((resData: any) => {
            this.loaderbtn = true;
            if (resData.StatusCode != 0) {
              AppComponent.Router.navigate(['/finance/petty-cash-details-list']);
            }
            else { AppComponent.SmartAlert.Errmsg(resData.Message); }
          });
    
        } else {
          AppComponent.SmartAlert.Errmsg(`Please select atleast one record`);
        }
  }
  }
  