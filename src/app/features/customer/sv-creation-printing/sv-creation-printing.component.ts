import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CustomerService } from '@app/features/customer/customer.service';

@Component({
  selector: 'sa-sv-creation-printing',
  templateUrl: './sv-creation-printing.component.html',
  styleUrls: ['./sv-creation-printing.component.css']
})
export class SvCreationPrintingComponent implements OnInit {
  public cpInfo: any = {};
  public cust: any = {};
  public custData: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn: boolean = true;
  public prodArray: any = [];
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
        this.getCustomerProductDetails();
      }
      else { this.custData = {}; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  getCustomerProductDetails() {
    this.customerService.getProductDetails(this.cpInfo.CPCode, 'CUSTM', this.custData.ConsId).subscribe((resprod: any) => {
      if (resprod.StatusCode != 0)
        this.prodArray = resprod.Data;
      if (this.prodArray.length > 0) {
        //this.customer.CustProdId = this.prodArray[0].CustProdId;
      }
      for (let i = 0; i < this.prodArray.length; i++) {
        let docobj;
        //docobj = this.masterService.filterData(this.productSegmentData, this.prodArray[i].ProdSegId, 'ProdSegId');
        // this.prodArray[i].ProdSegName = docobj[0].ProdSeg;
        // docobj = this.masterService.filterData(this.productDataSelected, this.prodArray[i].ProdId, 'ProdId');
        // this.prodArray[i].ProdName = docobj[0].Product;    
      }
    });
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}
