import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';

@Component({
  selector: 'sa-refill-booking',
  templateUrl: './refill-booking.component.html',
  styleUrls: ['./refill-booking.component.css']
})
export class RefillBookingComponent implements OnInit, OnDestroy {
  public cpInfo: any = {};
  public cust: any = {};
  public custData: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn: boolean = true;
  constructor(private appService: AppService, private datashare: DatashareService, private customerService: CustomerService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    // this.datashare.GetSharedData.subscribe(data => this.vehicle = data == null ? { IsActive: 'Y', VehicleTypeId: '' } : data);

  }
  onGetCustomer() {
    this.loaderbtn = false;
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.customerService.getCustomer(this.cpInfo.CPCode, '', this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.custData = resData.Data[0];
        AppComponent.SmartAlert.Success(resData.Message);
      }
      else { this.custData = {}; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}
