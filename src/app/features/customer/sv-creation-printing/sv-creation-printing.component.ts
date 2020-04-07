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
  public actionFlag: string;
  public bulkProd: any = {};
  public cpInfo: any = {};
  public cust: any = {};
  public custData: any = {};
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public loaderbtn: boolean = true;
  public prodArray: any = [];
  public product: any = { ProdSegId: '', ProdId: '' };
  public productSegmentData: any = [];
  public productDataSelected: any = [];
  public prodFlag: boolean = false;
  public removeProductUpdate: any = [];
  public svCustData: any = {};
  constructor(private appService: AppService, private datashare: DatashareService, private customerService: CustomerService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    // this.datashare.GetSharedData.subscribe(data => this.vehicle = data == null ? { IsActive: 'Y', VehicleTypeId: '' } : data);
    this.masterService.getProductSegmentDetails().subscribe((resPS: any) => {
      if (resPS.StatusCode != 0)
        this.productSegmentData = resPS.Data;
    });
  }
  onGetCustomer() {
    this.loaderbtn = false;
    this.cust = this.customerService.checkCustOrMobNo(this.cust);
    this.customerService.getCustomer(this.cpInfo.CPCode, '', this.cust.ConsNo, this.cust.MobileNo).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.custData = resData.Data[0];
        this.prodArray = null;
        this.getCustomerProductDetails();
      }
      else { this.custData = {}; AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  getCustomerProductDetails() {
    this.prodArray = [{}];
    this.customerService.getProductDetails(this.cpInfo.CPCode, 'CUSTM', this.custData.ConsId).subscribe((resprod: any) => {
      if (resprod.StatusCode != 0) {
        this.prodArray = resprod.Data;
        this.actionFlag = 'UP';
        AppComponent.SmartAlert.Success(resprod.Message);
      }
      else { this.prodArray = []; AppComponent.SmartAlert.Errmsg(resprod.Message); this.actionFlag = 'IN'; }
      for (let i = 0; i < this.prodArray.length; i++) {
        let docobj;
        //docobj = this.masterService.filterData(this.productSegmentData, this.prodArray[i].ProdSegId, 'ProdSegId');
        // this.prodArray[i].ProdSegName = docobj[0].ProdSeg;
        // docobj = this.masterService.filterData(this.productDataSelected, this.prodArray[i].ProdId, 'ProdId');
        // this.prodArray[i].ProdName = docobj[0].Product;    
      }
    });
  }

  onProductSubmit() {
    if (this.custData.ConsId == undefined) {
      AppComponent.SmartAlert.Errmsg("Please verify customer first.");
    }
    else if (this.prodArray.some(obj => parseInt(obj.ProdId) === parseInt(this.product.ProdId))) {
      AppComponent.SmartAlert.Errmsg("Product is already added in list.");
      this.product = { ProdSegId: '', ProdId: '' };
    } else {
      let docobj;
      docobj = this.masterService.filterData(this.productSegmentData, this.product.ProdSegId, 'ProdSegId');
      let ProdSegName = docobj[0].ProdSeg;
      docobj = this.masterService.filterData(this.productDataSelected, this.product.ProdId, 'ProdId');
      let ProdName = docobj[0].Product;
      this.prodArray.push(
        {
          "CustProdId": "",
          "CPCode": this.cpInfo.CPCode,
          "ConsId": this.custData.ConsId,
          "IssueDate": this.product.IssueDate,
          "ProdId": this.product.ProdId,
          "ProdSegId": this.product.ProdSegId,
          "PurchaseQty": this.product.PurchaseQty,
          "DepositAmt": this.product.DepositAmt,
          "MonthlyConsumption": this.product.MonthlyConsumption,
          "IsActive": "Y",
          "RefundableAmt": parseFloat(this.product.PurchaseQty) * parseFloat(docobj[0].RefundableAmount),
          "TotalDepositAmt": parseFloat(this.product.PurchaseQty) * parseFloat(docobj[0].DepositAmount),
          "TotalRefundableAmt": parseFloat(this.product.PurchaseQty) * parseFloat(docobj[0].RefundableAmount),
          "ProdSeg": ProdSegName,
          "Product": ProdName
        }
      );
      this.prodFlag = true;
      this.product = { ProdSegId: '', ProdId: '' };
    }
  }
  onRemoveProduct(data, index) {
    if (data.CustProdId != '' && data.CustProdId != null) {
      data.IsActive = 'N';
      this.removeProductUpdate.push(data);
    }
    this.prodArray.splice(index, 1);
    this.prodFlag = true;
  }

  onSelectProdSegment() {
    this.masterService.getProducts(this.product.ProdSegId,'E').subscribe((resPT: any) => {
      if (resPT.StatusCode != 0) {
        this.productDataSelected = resPT.Data;
      } else { this.productDataSelected = []; }
    });
  }
  onProductSelect() {
    let docobj;
    docobj = this.masterService.filterData(this.productDataSelected, this.product.ProdId, 'ProdId');
    this.product.DepositAmt = docobj[0].DepositAmount;
  }
  onCustomerProdSubmit() {
    if (this.prodArray.length > 0 || this.removeProductUpdate.length > 0) {
      this.loaderbtn = false;
      this.bulkProd.Flag = this.actionFlag;
      if (this.removeProductUpdate.length > 0) {
        this.prodArray = this.prodArray.concat(this.removeProductUpdate);
      }
      this.bulkProd.data = this.prodArray;
      this.bulkProd.RefId = this.custData.ConsId;
      this.bulkProd.UserCode = this.cpInfo.EmpId;
      this.bulkProd.CPCode = this.cpInfo.CPCode
      this.customerService.postBulkProduct(this.bulkProd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.prodArray = [];
          this.getCustomerProductDetails();
          this.prodFlag = false;
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one product.`);
    }
  }
  createSVDownload() {
    if (this.custData.ConsId == undefined) {
      AppComponent.SmartAlert.Errmsg("Please verify customer first.");
    } else {
      if (this.prodFlag == true) { AppComponent.SmartAlert.Errmsg(`Please submit product details first then download SV.`); }
      else {
        this.loaderbtn = false;
        this.svCustData = {
          "data":
            [
              {
                "CPCode": this.cpInfo.CPCode,
                "ConsId": this.custData.ConsId,
                "IsActive": "Y"
              }
            ]
        }
        let para = JSON.stringify(this.svCustData.data);
        window.location.href = `${AppComponent.BaseUrlDist}Operational/GetSV?data=${para}`, '_blank';
        this.loaderbtn = true;
      }
    }
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}
