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
  selector: 'sa-category-wise-discount-allocation',
  templateUrl: './category-wise-discount-allocation.component.html',
  styleUrls: ['./category-wise-discount-allocation.component.css']
})
export class CategoryWiseDiscountAllocationComponent implements OnInit, OnDestroy {
  public cpInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public minDate: Date;
  public loaderbtn: boolean = true;
  public discount: any = {};

  constructor(private appService: AppService, private customerService: CustomerService, private datashare: DatashareService, private masterService: MasterService, private stockService: StockService, private settingService: SettingService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }

  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.datashare.GetSharedData.subscribe(data => this.discount = data == null ? { IsActive: 'Y' } : data);
    // this.datashare.GetSharedData.subscribe(data => this.Pallocation = data==null?{IsActive:'Y'}:data);

    // this.onloadAll();
  }



  // onloadAll() {
  //   this.masterService.getProductSegmentDetails().subscribe((resR: any) => {
  //     if (resR.StatusCode != 0)
  //       this.productSegmentData = resR.Data;
  //   });
  // }




  SaveCatDiscount() {
    this.loaderbtn = false;
    this.discount.Flag = this.discount.CategoryId == null ? 'IN' : 'UP';
    this.discount.CPCode = this.cpInfo.CPCode;
    this.discount.UserCode = this.cpInfo.EmpId;
    this.settingService.postDiscountData(this.discount).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/settings/category-wise-discount-allocation-list']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }

}
