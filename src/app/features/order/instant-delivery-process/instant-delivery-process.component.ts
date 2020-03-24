import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { AppComponent } from '@app/app.component';
import { CustomerService } from '@app/features/customer/customer.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { StockService } from '@app/features/stock/stock.service';
import { OrderService } from '../order.service';
@Component({
  selector: 'sa-instant-delivery-process',
  templateUrl: './instant-delivery-process.component.html',
  styleUrls: ['./instant-delivery-process.component.css'],
  animations: [
    trigger('changePane', [
      state('out', style({
        height: 0,
      })),
      state('in', style({
        height: '*',
      })),
      transition('out => in', animate('250ms ease-out')),
      transition('in => out', animate('250ms 300ms ease-in'))
    ])
  ]
})
export class InstantDeliveryProcessComponent implements OnInit, OnDestroy {
  public bsValue = new Date();
  public datePickerConfig: Partial<BsDatepickerConfig>;

  public addArray: any = [];
  public bulkAdd: any = {};
  public CatDiscountData: any = [];
  public customer: any = { IsActive: 'Y', Salutation: '', CustTypeId: '', VolumeTypeId: '', ConsuptionTypeId: '', ServiceTypeId: '', FirmTypeId: '', ContractualId: '', RoutId: '', SubAreaId: '', CustCatId: '', StateCode: '', CityCode: '' };
  public CustTypeData: any = [];
  public ConsumptionData: any = [];
  public ContractData: any = [];
  public CityData: any = [];
  public cpInfo: any;
  public FirmData: any = [];
  public loaderbtn: boolean = true;
  public RouteData: any = [];
  public ServiceData: any = [];
  public StateData: any = [];
  public SubAreaData: any = [];
  public SubAreaArray: any = [];
  public VolumeData: any = [];

  public custData: any = {};
  public deliverrefill: any = { };
  public delBoyData: any = [];
  public ProductArray: any = [];
  public Edeliverrefill: any = {};
  constructor(private appService: AppService, private datashare: DatashareService, private customerService: CustomerService, private masterService: MasterService, private orderService: OrderService, private stockService: StockService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    //this.datashare.GetSharedData.subscribe(data => this.employee = data == null ? { IsActive: 'Y', RoleCode: '', Gender: '', MaritalStatus: '', BloodGrp: '', StateCode: '', CityCode: '' } : data);
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.allOnloadMethods();
    this.datashare.GetSharedData.subscribe(data => {
      this.deliverrefill = data == null ? {AllocatedUserCode: '' , IsActive: 'Y' } : data;
      this.customer.ConsName=this.deliverrefill.ConsName;
      this.customer.MobileNo=this.deliverrefill.MobileNo;
      this.customer.ConsId=this.deliverrefill.ConsId;
      if(this.customer.ConsId !=''&& this.customer.ConsId !=undefined && this.customer.ConsId !=null)
      this.nextStep();
      this.deliverrefill.AllocatedUserCode=this.deliverrefill.DelUserCode;
      this.deliverrefill.AllocatedUserName=this.deliverrefill.DelUserName;
      this.deliverrefill.TotalReceivedAmount=this.deliverrefill.PaidAmt;
      this.splittingName();
      this.getCustomerProductDetails();
    });
  }
  splittingName(){
    if(this.customer.ConsName!=undefined){
    let resString = this.customer.ConsName.split(" ");
    this.customer.FirstName=resString[0];
    this.customer.LatName=resString[1];
    if(resString.length>=3){
      this.customer.MiddleName=resString[1];
      this.customer.LatName=resString[2];
    }
  }
}

  // public model = {
  //   email: '',
  //   firstname: '',
  //   lastname: '',
  //   country: '',
  //   city: '',
  //   postal: '',
  //   wphone: '',
  //   hphone: ''
  // };

  public steps = [
    {
      key: 'step1',
      title: 'Customer Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    // {
    //   key: 'step2',
    //   title: 'Address Details',
    //   valid: true,
    //   checked: false,
    //   submitted: false,
    // },
    {
      key: 'step2',
      title: 'Delivery Details',
      valid: false,
      checked: false,
      submitted: false,
    }
  ];

  public activeStep = this.steps[0];

  setActiveStep(steo) {
    switch (steo.key) {
      case 'step1':
        if (steo.key == "step1" && this.customer.ConsId==undefined) {
          this.activeStep = steo;
        }
        break;
      case 'step2':
        if (steo.key == "step2" && this.customer.ConsId!=undefined) {
          this.activeStep = steo;
          this.getCustomerProductDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Customer details first`)
        }
        break;
    }
  }
  prevStep() {
    let idx = this.steps.indexOf(this.activeStep);
    if (idx > 0) {
      if(this.customer.ConsId==undefined||this.customer.ConsId=='')
      this.activeStep = this.steps[idx - 1]
    }
  }
  nextStep() {
    this.activeStep.submitted = true;
    if (!this.activeStep.valid) {
      return;
    }
    this.activeStep.checked = true;
    if (this.steps.every(it => (it.valid && it.checked))) {
      // this.onWizardComplete(this.model)
    } else {
      let idx = this.steps.indexOf(this.activeStep);
      this.activeStep = null;
      while (!this.activeStep) {
        idx = idx == this.steps.length - 1 ? 0 : idx + 1;
        if (!this.steps[idx].valid || !this.steps[idx].checked) {
          this.activeStep = this.steps[idx]
        }
      }
    }
  }
  onSubmitCustomer() {
      this.loaderbtn = false;
      this.customer.Flag = (this.customer.ConsId !=''&& this.customer.ConsId !=undefined)?'UP':'IN';
      this.customer.CPCode = this.cpInfo.CPCode;
      this.customer.UserCode = this.cpInfo.EmpId;
      if(this.customer.ConsId==undefined)
      {this.customer.ConsId = '';
      this.customer.ConsNo = null;}
      this.customer.ConsName = `${this.customer.FirstName} ${this.customer.LatName}`;
      let ciphertext = this.appService.getEncrypted(this.customer);
      this.customerService.postInstantCustomerDetails(ciphertext).subscribe((resp: any) => {
        if (resp.StatusCode != 0) {
          if (resp.Data.length != 0)
            this.customer.ConsId = resp.Data[0].ConsId;
            this.customer = Object.assign(this.customer, resp.Data[0]);
            if(this.customer.Flag=='IN')
          this.saveAddressDeatils();
          //AppComponent.SmartAlert.Success(resp.Message);
        } else {
          AppComponent.SmartAlert.Errmsg(resp.Message);
          this.loaderbtn = true;
        }
      });
  }
  
  nextToSave() {
    if (this.deliverrefill.DelRefNo != null) {
      this.loaderbtn = false;
      this.deliverrefill.InstRefNo=this.deliverrefill.DelRefNo;
      this.deliverrefill.CPCode = this.cpInfo.CPCode;
      this.deliverrefill.Lat = '';
      this.deliverrefill.Lon = '';
      this.deliverrefill.IsActive = 'Y'
      this.deliverrefill.UserCode = this.cpInfo.EmpId;
      this.deliverrefill.ImeiNo = '';
      this.deliverrefill.Apptype = "DI";
      this.deliverrefill.PayMode = "CA";
      this.deliverrefill.Status = 4;
      this.deliverrefill.TotalDiscount = this.deliverrefill.Discount;
      this.deliverrefill.TotalReturnQty = this.deliverrefill.ReturnQty;
      this.deliverrefill.TotalQty = this.deliverrefill.QtyTotal;
      this.deliverrefill.ConsId=this.customer.ConsId;
      this.deliverrefill.data = this.ProductArray;
      this.orderService.postCashMemoDeliverRefill(this.deliverrefill).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.ProductArray = [];
          AppComponent.Router.navigate(['/order/instant-delivered-orders']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else { 
      AppComponent.SmartAlert.Errmsg(`Cash memo not generated`);
    }
  }
  onWizardComplete(data) {
    console.log('basic wizard complete', data)
  }
  allOnloadMethods() {
    this.masterService.getEmpoyeeDelBoy(this.cpInfo.CPCode).subscribe((respD: any) => {
      if (respD.StatusCode != 0)
        this.delBoyData = respD.Data;
    });
    this.customerService.getCustomerType().subscribe((respCt) => {
      if (respCt.StatusCode != 0)
        this.CustTypeData = respCt.Data;
    });

    this.customerService.getFirmType().subscribe((respF) => {
      if (respF.StatusCode != 0)
        this.FirmData = respF.Data;
    });
    this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.RouteData = resR.Data;
    });
    this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA: any) => {
      if (reSA.StatusCode != 0) {
        this.SubAreaArray = reSA.Data;
      }
    });
    this.masterService.getState().subscribe((resSt: any) => {
      if (resSt.StatusCode != 0)
        this.StateData = resSt.Data;
    });
    this.customerService.getContraType().subscribe((resCo) => {
      if (resCo.StatusCode != 0)
        this.ContractData = resCo.Data;
    });
    this.masterService.getDiscountDetails(this.cpInfo.CPCode).subscribe((resData: any) => {
      if (resData.StatusCode != 0) {
        this.CatDiscountData = resData.Data;
      }
    });
  }
  getCityData() {
    this.masterService.getCity(this.customer.StateCode).subscribe((res) => {
      if (res.StatusCode != 0) { this.CityData = res.Data; } else { this.CityData = []; }
    });
  }
  getSubArea() {
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.customer.RoutId, 'RouteId');
  }
  saveAddressDeatils() {
    //this.loaderbtn = false;
    this.addArray.push({
      "AddressId": "",
      "AddressType": 'D',
      "StateCode": this.customer.StateCode,
      "CityCode": this.customer.CityCode,
      "PinCode": this.customer.PinCode,
      "AddressLineOne": this.customer.AddressLineOne,
      "AddressLineTwo": this.customer.AddressLineTwo,
      "AddressLineThree": this.customer.AddressLineThree,
      "IsActive": "Y"
    });
    this.bulkAdd.Flag = "IN";
    this.bulkAdd.data = this.addArray;
    this.bulkAdd.RefId = this.customer.ConsId;
    this.bulkAdd.FormFlag = 'CUSTM';
    this.bulkAdd.UserCode = this.cpInfo.EmpId;
    this.masterService.postBulkAddress(this.bulkAdd).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        //this.customer.AddressId = resData.Data[0].AddressId
        this.nextStep();
        AppComponent.SmartAlert.Success(resData.Message);
        //AppComponent.Router.navigate(['/customer/customer-master']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }

  onSelectCustomerType() {
    this.customerService.getVolumeType(this.customer.CustTypeId).subscribe((respV) => {
      if (respV.StatusCode != 0) { this.VolumeData = respV.Data; } else {
        this.VolumeData = [];
      }
    });
    this.customerService.getConsumptionType(this.customer.CustTypeId).subscribe((respC) => {
      if (respC.StatusCode != 0) {
        this.ConsumptionData = respC.Data;
      } else {
        this.ConsumptionData = [];
      }
    });
    this.customerService.getServiceType(this.customer.CustTypeId).subscribe((respS) => {
      if (respS.StatusCode != 0) {
        this.ServiceData = respS.Data;
      } else {
        this.ServiceData = [];
      }
    });
  }
  getCustomerProductDetails(){
    this.orderService.getInstantDeliveryProductDetails(this.cpInfo.CPCode, this.deliverrefill.DelRefNo).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        this.ProductArray = resp.Data;
        let Discount=this.deliverrefill.Discount;
        this.ProductArray = this.orderService.assignEmptyToReturnQty(this.ProductArray);
        this.deliverrefill = this.orderService.calculateQtyGTotalRefillDelivery(this.deliverrefill, this.ProductArray);
        this.deliverrefill.Discount=Discount; 
      }
    });
  }
  
  //custom change detection
  // ngDoCheck() {
  //   if (!this.lastModel) {
  //     // backup model to compare further with
  //     this.lastModel = Object.assign({}, this.model)
  //   } else {
  //     if (Object.keys(this.model).some(it=>this.model[it] != this.lastModel[it])) {
  //       // change detected
  //       this.steps.find(it=>it.key == 'step1').valid = !!(this.model.email && this.model.firstname && this.model.lastname);
  //       this.steps.find(it=>it.key == 'step2').valid = !!(this.model.country && this.model.city && this.model.postal);
  //       this.lastModel = Object.assign({}, this.model)
  //     }
  //   }
  // }
  
  calculatePending() {
    this.deliverrefill.TotalAmtPayable = parseInt(this.deliverrefill.TotalRefillAmt) - parseInt(this.deliverrefill.Discount);
    this.deliverrefill.PendingAmt = parseInt(this.deliverrefill.TotalAmtPayable) - (parseInt(this.deliverrefill.TotalReceivedAmount == null ? 0 : this.deliverrefill.TotalReceivedAmount))
  }
  onEditProduct(data, index) {
    $('#qtyModal').modal('show');
    this.Edeliverrefill.ProdQty = data.ProdQty;
    this.Edeliverrefill.ReturnQty = data.ReturnQty;
    this.Edeliverrefill.index = index;
  }
  onSubmitqty() {
    this.ProductArray[this.Edeliverrefill.index].ProdQty = this.Edeliverrefill.ProdQty;
    this.ProductArray[this.Edeliverrefill.index].RefillAmount = parseInt(this.ProductArray[this.Edeliverrefill.index].ProdRate) * parseInt(this.Edeliverrefill.ProdQty);
    this.ProductArray[this.Edeliverrefill.index].Discount = parseInt(this.ProductArray[this.Edeliverrefill.index].RefillAmount) * parseInt(this.deliverrefill.DiscountPer) / 100;
    this.ProductArray[this.Edeliverrefill.index].TotalAmount = parseInt(this.ProductArray[this.Edeliverrefill.index].RefillAmount) - parseInt(this.ProductArray[this.Edeliverrefill.index].Discount);
    this.ProductArray[this.Edeliverrefill.index].ReturnQty = this.Edeliverrefill.ReturnQty;
    this.deliverrefill = this.orderService.calculateQtyGTotalRefillDelivery(this.deliverrefill, this.ProductArray);
    this.calculatePending();
    this.Edeliverrefill = {};
    $('#qtyModal').modal('hide');
  }
  
  ngOnDestroy() {
    this.datashare.updateShareData(null);
    this.appService.removeBackdrop();
  }
}
