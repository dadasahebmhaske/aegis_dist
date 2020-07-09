import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterService } from '../../../core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '@app/features/customer/customer.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { StockService } from '../stock.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-imbalance',
  templateUrl: './imbalance.component.html',
  styleUrls: ['./imbalance.component.css']
})
export class ImbalanceComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public imbalance: any = {};
  public minDate: Date = new Date();
  public maxDate: Date = new Date();
  public loaderbtn: boolean = true;
  public productSegmentData: any = [];
  public productDataSelected: any = [];


  constructor(private appService: AppService, private customerService: CustomerService, private dataShare: DatashareService, private masterService: MasterService, private stockService: StockService) {

    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', minDate: this.minDate, maxDate: this.maxDate, showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.dataShare.GetSharedData.subscribe(data => {
      this.imbalance = data == null ? { ProdSegId: '', IsActive: 'Y', ProdId: '' } : data;
      this.onSelectProdSegment();
      //this.stock.OrderDt = new Date(this.stock.OrderDt);
    });
    this.allOnLoad();
  }
  allOnLoad() {
    this.masterService.getProductSegmentDetails(this.cpInfo.ChannelId).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data;
    });
  }
  onSelectProdSegment() {
    this.masterService.getProducts(this.imbalance.ProdSegId,'').subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.productDataSelected = resPT.Data;
      } else { this.productDataSelected = []; }
    });
  }
  onSubmitImabalance() {
    this.loaderbtn = false;
    this.imbalance.ImbalanceId = this.imbalance.ImbalanceId == null || this.imbalance.ImbalanceId == '' ? '' : this.imbalance.ImbalanceId;
    this.imbalance.CPCode = this.cpInfo.CPCode;
    this.imbalance.UserCode = this.cpInfo.EmpId;
    this.imbalance.Status = 'PE';
    this.imbalance.Flag = this.imbalance.ImbalanceId == null || this.imbalance.ImbalanceId == '' ? "IN" : "UP";
    this.stockService.postImabalance(this.imbalance).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/stock/add-imbalance']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  ngOnDestroy() {
    this.dataShare.updateShareData(null);
  }
}
