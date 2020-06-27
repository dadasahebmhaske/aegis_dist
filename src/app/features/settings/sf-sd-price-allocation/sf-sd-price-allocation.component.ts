import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../../order/order.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { SettingService } from '../../settings/setting.service';
import { CustomerService } from '@app/features/customer/customer.service';

@Component({
  selector: 'sa-sf-sd-price-allocation',
  templateUrl: './sf-sd-price-allocation.component.html',
  styleUrls: ['./sf-sd-price-allocation.component.css']
})
export class SfSdPriceAllocationComponent implements OnInit {
  public cpInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public minDate: Date;
  public loaderbtn: boolean = true;
  public Pallocation: any = {};
  public productSegmentData: any = [];
  public productDataSelected: any = [];
public  chantype:any=[];
  constructor(private appService: AppService, private customerService: CustomerService, private datashare: DatashareService, private masterService: MasterService, private stockService: StockService, private settingService: SettingService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.datashare.GetSharedData.subscribe(data => this.Pallocation = data == null ? {CPCode:'', ProdSegId: '', ProdId: '', IsActive: 'Y' } : data);
    this.Pallocation.Flag = this.Pallocation.PriceCode == null ? 'IN' : 'UP';
    this.onSelectProdSegment();
    this.onloadAll();
  }

  onloadAll() {
    this.masterService.getProductSegmentDetails().subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.productSegmentData = resR.Data;
    });
    this.masterService.getSFSDPOS(this.cpInfo.CPCode).subscribe((resCP: any) => {
      if (resCP.StatusCode != 0)
        this.chantype = resCP.Data;
    })

  }

  onSelectProdSegment() {

    if (this.Pallocation.Flag != 'UP') {
      this.Pallocation.ProdId = "";
    }


    this.masterService.getProducts(this.Pallocation.ProdSegId,'F').subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.productDataSelected = resPT.Data;
      } else { this.productDataSelected = []; }
    });
  }


  SavePriceAllocation() {
    this.loaderbtn = false;
    this.Pallocation.PriceCode = this.Pallocation.PriceCode == undefined || this.Pallocation.PriceCode == null ? '' : this.Pallocation.PriceCode;
    this.Pallocation.Flag = this.Pallocation.PriceCode == null|| this.Pallocation.PriceCode == undefined ||this.Pallocation.PriceCode == '' ? 'IN' : 'UP';
    this.Pallocation.TtlPrice = this.Pallocation.TtlPrice == undefined || this.Pallocation.TtlPrice == null ? '' : this.Pallocation.TtlPrice;
    this.Pallocation.ParentCPCode = this.cpInfo.CPCode;
    this.Pallocation.PlantId='';
    this.Pallocation.UserCode = this.cpInfo.EmpId;
    this.Pallocation.EffectiveFromDate = this.appService.DateToString(this.Pallocation.EffectiveFromDate);
    this.Pallocation.EffectiveToDate = this.appService.DateToString(this.Pallocation.EffectiveToDate);
    let ciphertext = this.appService.getEncrypted(this.Pallocation);
    this.settingService.postSFSDPOSPriceAllocation(ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/settings/sf-sd-price-allocation-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  resetEndDate(val) {
    this.minDate = val;
    if (val != undefined && val != null && this.Pallocation.EffectiveToDate != null) {
      if ((new Date(this.Pallocation.EffectiveToDate).getTime()) < (new Date(val).getTime())) {
        this.Pallocation.EffectiveToDate = '';
      }
    }
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }


}
