import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppService } from '@app/core/custom-services/app.service';
import { CustomerService } from '../customer.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { AppComponent } from '@app/app.component';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'sa-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
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
export class UpdateCustomerComponent implements OnInit, OnDestroy {
  public address: any = { AddressType: '', StateCode: '', CityCode: '' };
  public AccountTypeData: any = [];
  public addArray: any = [];
  public addressTypeData: any = [];
  public bank: any = { AccountType: '' };
  public bankArray: any = [];
  public bulkAdd: any = {};
  public bulkBank: any = {};
  public bulkProd: any = {};
  public bdata: any = [];
  public bulkDoc: any = {};
  public CatDiscountData: any = [];
  public customer: any = {};
  public CustTypeData: any = [];
  public ConsumptionData: any = [];
  public ContractData: any = [];
  public CityData: any = [];
  public cpInfo: any;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public DocFileName: string;
  public document: any = { DocTypId: '' };
  public docTypeData: any = [];
  public fd = new FormData();
  public filepreview: any;
  public FirmData: any = [];
  public firmAction:boolean=false;
  public imgUrl: string;
  public loaderbtn: boolean = true;
  public removeDocUpdate: any = [];
  public RouteData: any = [];
  public product: any = { ProdSegId: '', ProdId: '' };
  public productSegmentData: any = [];
  public prodArray: any = [];
  public productDataSelected: any = [];
  public removeProductUpdate: any = [];
  public removeAddressUpdate: any = [];
  public removeBankUpdate: any = [];
  public selectedFile: File = null;
  public ServiceData: any = [];
  public StateData: any = [];
  public SubAreaData: any = [];
  public SubAreaArray: any = [];
  public VolumeData: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private datashare: DatashareService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', maxDate: new Date(), dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.imgUrl = `${AppComponent.ImageUrl}CustDocs/`;
    this.datashare.GetSharedData.subscribe(data =>{ this.customer = data == null ? { IsActive: 'Y', Salutation: '', CustCatId: '', CustTypeId: '', VolumeTypeId: '', ConsuptionTypeId: '', ServiceTypeId: '', FirmTypeId: '', ContractualId: '', RoutId: '', SubAreaId: '', StateCode: '', CityCode: '' } : data;
    this.HideShowFirm();})
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.allOnloadMethods();
    this.customer.CustTypeId != null && this.customer.CustTypeId != '' ? this.onSelectCustomerType() : '';
  }
  public model = {
    email: '',
    firstname: '',
    lastname: '',
    country: '',
    city: '',
    postal: '',
    wphone: '',
    hphone: ''
  };
  public steps = [
    {
      key: 'step1',
      title: 'Customer Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step2',
      title: 'Customer Address Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    // {
    //   key: 'step3',
    //   title: 'Customer Product Details',
    //   valid: true,
    //   checked: false,
    //   submitted: false,
    // },
    {
      key: 'step3',
      title: 'Customer Document Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step4',
      title: 'Customer Bank Details',
      valid: true,
      checked: false,
      submitted: false,
    },
  ];

  public activeStep = this.steps[0];

  setActiveStep(steo) {
    // this.activeStep = steo
    switch (steo.key) {
      case 'step1':
        this.activeStep = steo;
        break;
      case 'step2':
        if (steo.key == "step2" && this.customer.ConsId != null) {
          this.activeStep = steo;
          this.getCustomerAddressDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add customer details first`)
        }
        break;
      // case 'step3':
      //   //this.activeStep = steo;this.getCustomerProductDetails();
      //   if (steo.key == "step3" && this.customer.ConsId != null && this.customer.AddressId != null) {
      //     this.activeStep = steo;
      //     this.getCustomerProductDetails();
      //   } else {
      //     AppComponent.SmartAlert.Errmsg(`Please add address details first`)
      //   }
      //   break;
      case 'step3':
        //this.activeStep = steo;  this.getCustomerDocumentDetails();
        if (steo.key == "step3" && this.customer.ConsId != null && this.customer.AddressId != null) {
          this.activeStep = steo;
          this.getCustomerDocumentDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add address details first`)
        }
        break;
      case 'step4':
        //this.activeStep = steo; this.getCustomerBankDetails();
        if (steo.key == "step4" && this.customer.ConsId != null && this.customer.DocId != null) {
          this.activeStep = steo;
          this.getCustomerBankDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add document details first`)
        }
        break;
    }
  }

  prevStep() {
    let idx = this.steps.indexOf(this.activeStep);
    if (idx > 0) {
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
      this.onWizardComplete(this.model)
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
  nextToAddress() {
    this.loaderbtn = false;
    this.customer.Flag = 'UP';
    this.customer.CPCode = this.cpInfo.CPCode;
    this.customer.UserCode = this.cpInfo.EmpId;
    let ciphertext = this.appService.getEncrypted(this.customer);
    this.customerService.postCustomerDetails(ciphertext).subscribe((resp: any) => {
      this.loaderbtn = true;
      if (resp.StatusCode != 0) {
        if (resp.Data.length != 0)
          this.customer.ConsId = resp.Data[0].ConsId;
        this.nextStep();
        this.getCustomerAddressDetails();
        AppComponent.SmartAlert.Success(resp.Message);
      } else {
        AppComponent.SmartAlert.Errmsg(resp.Message);
        this.loaderbtn = true;
      }
    });

  }
  nextToProductDeatils() {
    if (this.addArray.length > 0 || this.removeAddressUpdate.length > 0) {
      this.loaderbtn = false;
      this.bulkAdd.Flag = this.address.AddressId == null ? "IN" : "UP";
      this.bulkAdd.data = this.addArray;
      if (this.removeAddressUpdate.length > 0) {
        //this.addArray = this.addArray.concat(this.removeAddressUpdate);
        let  conArray=this.addArray;
        conArray=conArray.concat(this.removeAddressUpdate);
        this.bulkAdd.data = conArray;
      }
      this.bulkAdd.RefId = this.customer.ConsId;
      this.bulkAdd.FormFlag = 'CUSTM';
      //this.bulkAdd.AddressType = 'H';
      this.bulkAdd.UserCode = this.cpInfo.EmpId;
      this.masterService.postBulkAddress(this.bulkAdd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.address.AddressId = resData.Data[0].AddressId
          AppComponent.SmartAlert.Success(resData.Message);
          this.getCustomerDocumentDetails();
          this.addArray = [];
          this.nextStep();
          // this. this.getCustomerAddressDetails();();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one product.`);
    }
  }
  nextToDocumentDetails() {
    if (this.prodArray.length > 0 || this.removeProductUpdate.length > 0) {
      this.loaderbtn = false;
      this.bulkProd.Flag = "IN";
      if (this.removeProductUpdate.length > 0) {
        this.prodArray = this.prodArray.concat(this.removeProductUpdate);
      }
      this.bulkProd.data = this.prodArray;
      this.bulkProd.RefId = this.customer.ConsId;
      this.bulkProd.UserCode = this.cpInfo.EmpId;
      this.customerService.postBulkProduct(this.bulkProd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.prodArray = [];
          this.getCustomerDocumentDetails();
          this.nextStep();
          //this.getCustomerProductDetails();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one product.`);
    }
  }
  nextToBankDetails() {
    if (this.bdata.length > 0 || this.removeDocUpdate.length > 0) {
      this.loaderbtn = false;
      this.bulkDoc.flag = this.customer.DocId == null ? 'IN' : 'UP';
      this.bulkDoc.RefId = this.customer.ConsId;
      this.bulkDoc.FormFlag = 'CUSTM';
      this.bulkDoc.UserCode = this.cpInfo.EmpId;
      this.bulkDoc.bdata = this.bdata;
      if (this.removeDocUpdate.length > 0) {
       // this.bdata = this.bdata.concat(this.removeDocUpdate);
        let  docArray=this.bdata;
        docArray=docArray.concat(this.removeDocUpdate);
        this.bulkDoc.bdata = docArray;
      }
      let ciphertext = this.appService.getEncrypted(this.bulkDoc);
      this.fd.append('CipherText', ciphertext);
      this.masterService.postBulkDoc(this.fd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.bdata = []; this.removeDocUpdate = [];
          if (resData.Data.length != 0)
            this.customer.DocId = resData.Data[0].DocId;
          AppComponent.SmartAlert.Success(resData.Message);
          this.getCustomerBankDetails();
          this.nextStep();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one document.`);
    }

  }
  onSubmitBankDetails() {
    if (this.bankArray.length > 0 || this.removeBankUpdate.length > 0) {
      this.loaderbtn = false;
      this.bulkBank.Flag = "IN";
      this.bulkBank.data = this.bankArray;
      if (this.removeBankUpdate.length > 0) {
        //this.bankArray = this.bankArray.concat(this.removeBankUpdate);
        let  conArray=this.bankArray;
        conArray=conArray.concat(this.removeBankUpdate);
        this.bulkBank.data = conArray;
      }
      
      this.bulkBank.RefId = this.customer.ConsId;
      this.bulkBank.FormFlag = 'CUSTM';
      this.bulkBank.UserCode = this.cpInfo.EmpId;
      this.customerService.postBulkBank(this.bulkBank).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          //this.bank.AddressId = resData.Data[0].AddressId
          AppComponent.SmartAlert.Success(resData.Message);
          this.bankArray = [];
          AppComponent.Router.navigate(['/customer/customer-master']);
          this.nextStep();
          // this. this.getCustomerAddressDetails();();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one bank.`);
    }

  }

  onWizardComplete(data) {
    console.log('basic wizard complete', data)
  }
  allOnloadMethods() {
    this.customerService.getCustomerType().subscribe((respCt) => {
      if (respCt.StatusCode != 0)
        this.CustTypeData = respCt.Data;
        this.HideShowFirm();
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
        this.GetSubArea();
      }
    });
    this.masterService.getState().subscribe((resSt: any) => {
      if (resSt.StatusCode != 0)
        this.StateData = resSt.Data;
    });
    this.customerService.getContraType().subscribe((resCo) => {
      if (resCo.StatusCode != 0) {
        this.ContractData = resCo.Data;
      }
    });
    this.masterService.getDocumentType('CUSTM').subscribe(
      (resDoc: any) => {
        if (resDoc.StatusCode != 0)
          this.docTypeData = resDoc.Data;
      });
    this.customerService.getAddressType().subscribe((resAdd: any) => {
      if (resAdd.StatusCode != 0)
        this.addressTypeData = resAdd.Data;
    });
    this.customerService.getAccountType().subscribe((resACT: any) => {
      if (resACT.StatusCode != 0)
        this.AccountTypeData = resACT.Data;
    });
    this.masterService.getProductSegmentDetails().subscribe((resPS: any) => {
      if (resPS.StatusCode != 0)
        this.productSegmentData = resPS.Data;
    });
    this.masterService.getDiscountDetails(this.cpInfo.CPCode).subscribe((resCData: any) => {
      if (resCData.StatusCode != 0) {
        this.CatDiscountData = resCData.Data;
      }
    });

  }
  GetSubArea() {
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.customer.RoutId, 'RouteId');
  }
  //product
  onProductSubmit() {
    if (this.prodArray.some(obj => parseInt(obj.ProdId) === parseInt(this.product.ProdId))) {
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
          "ConsId": this.customer.ConsId,
          "IssueDate": this.product.IssueDate,
          "ProdId": this.product.ProdId,
          "ProdSegId": this.product.ProdSegId,
          "PurchaseQty": this.product.PurchaseQty,
          "DepositAmt": this.product.DepositAmt,
          "MonthlyConsumption": this.product.MonthlyConsumption,
          "IsActive": "Y",
          "RefundableAmt": 0,
          "TotalDepositAmt": 0,
          "TotalRefundableAmt": 0,
          "ProdSegName": ProdSegName,
          "Product": ProdName
        }
      );
      this.product = { ProdSegId: '', ProdId: '' };
    }
  }
  onRemoveProduct(data, index) {
    if (data.CustProdId != '' && data.CustProdId != null) {
      data.IsActive = 'N';
      this.removeProductUpdate.push(data);
    }
    this.prodArray.splice(index, 1);
  }
  getCustomerProductDetails() {
    this.customerService.getProductDetails(this.cpInfo.CPCode, 'CUSTM', this.customer.ConsId).subscribe((resprod: any) => {
      if (resprod.StatusCode != 0)
        this.prodArray = resprod.Data;
      if (this.prodArray.length > 0) {
        this.customer.CustProdId = this.prodArray[0].CustProdId;
      }
      for (let i = 0; i < this.prodArray.length; i++) {
        let docobj;
        docobj = this.masterService.filterData(this.productSegmentData, this.prodArray[i].ProdSegId, 'ProdSegId');
        this.prodArray[i].ProdSegName = docobj[0].ProdSeg;
        // docobj = this.masterService.filterData(this.productDataSelected, this.prodArray[i].ProdId, 'ProdId');
        // this.prodArray[i].ProdName = docobj[0].Product;    
      }
    });
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
  // bank
  onSubmitBankData() {
    if (this.bankArray.some(obj => parseInt(obj.AccountNo) === parseInt(this.bank.AccountNo))) {
      AppComponent.SmartAlert.Errmsg("Bank Account is already added in list.");
      this.bank = { AccountType: '' };
    } else {
      let docobj;
      docobj = this.masterService.filterData(this.AccountTypeData, this.bank.AccountType, 'MstFlag');
      let AccountTypeName = docobj[0].Name;
      this.bankArray.push({
        "BankId": '',
        "AccountNo": this.bank.AccountNo,
        "AccountType": this.bank.AccountType,
        "AccountHolderName": this.bank.AccountHolderName,
        "BankName": this.bank.BankName,
        "BranchName": this.bank.BranchName,
        "IFSCCode": this.bank.IFSCCode,
        "IsActive": "Y",
        "AccountTypeName": AccountTypeName
      });
      this.bank = { AccountType: '' };
    }
  }
  onRemoveBank(data, index) {
    if (data.BankId != '' && data.BankId != null) {
      data.IsActive = 'N';
      this.removeBankUpdate.push(data);
    }
    this.bankArray.splice(index, 1)
  }
  getCustomerBankDetails() {
    this.customerService.getBankDetails('CUSTM', this.customer.ConsId).subscribe((resp: any) => {
      if (resp.StatusCode != 0)
        this.bankArray = resp.Data;
      for (let i = 0; i < this.bankArray.length; i++) {
        let docobj;
        docobj = this.masterService.filterData(this.AccountTypeData, this.bankArray[i].AccountType, 'MstFlag');
        this.bankArray[i].AccountTypeName = docobj[0].Name;
      }
    });
  }
  //address
  onSubmitAddress() {
    let docobj;
    docobj = this.masterService.filterData(this.StateData, this.address.StateCode, 'StateCode');
    let StateName = docobj[0].StateDesc;
    docobj = this.masterService.filterData(this.CityData, this.address.CityCode, 'CityCode');
    let CityName = docobj[0].CityName;
    docobj = this.masterService.filterData(this.addressTypeData, this.address.AddressType, 'MstFlag');
    let AddressTypeName = docobj[0].Name;
    if (this.addArray.some(obj => obj.AddressType === docobj[0].MstFlag)) {
      AppComponent.SmartAlert.Errmsg("The Address is already added in list.");
      this.address = { AddressType: '', StateCode: '', CityCode: '' };
    } else {
      this.addArray.push({
        "AddressId": '',
        "AddressType": this.address.AddressType,
        "StateCode": this.address.StateCode,
        "CityCode": this.address.CityCode,
        "PinCode": this.address.PinCode,
        "AddressLineOne": this.address.AddressLineOne,
        "AddressLineTwo": this.address.AddressLineTwo,
        "AddressLineThree": this.address.AddressLineThree,
        "IsActive": "Y",
        "AddressTypeName": AddressTypeName,
        "StateName": StateName,
        "CityName": CityName
      });
      this.address = { AddressType: '', StateCode: '', CityCode: '' };
    }
  }
  onRemoveAddress(data, index) {
    if (data.AddressId != '' && data.AddressId != null) {
      data.IsActive = 'N';
      this.removeAddressUpdate.push(data);
    }
    this.addArray.splice(index - 1, 1)
  }
  getCustomerAddressDetails() {
    this.masterService.getAddressDetails('CUSTM', this.customer.ConsId).subscribe((resp: any) => {
      if (resp.StatusCode != 0)
        this.addArray = resp.Data;
      if (this.addArray.length > 0) {
        this.customer.AddressId = this.addArray[0].AddressId;
      }
      for (let i = 0; i < this.addArray.length; i++) {
        this.masterService.getCity(this.addArray[i].StateCode).subscribe((res) => {
          if (res.StatusCode != 0) {
            this.CityData = res.Data;
            let docobj;
            docobj = this.masterService.filterData(this.addressTypeData, this.addArray[i].AddressType, 'MstFlag');
            this.addArray[i].AddressTypeName = docobj[0].Name;
            docobj = this.masterService.filterData(this.StateData, this.addArray[i].StateCode, 'StateCode');
            this.addArray[i].StateName = docobj[0].StateDesc;
            docobj = this.masterService.filterData(this.CityData, this.addArray[i].CityCode, 'CityCode');
            this.addArray[i].CityName = docobj[0].CityName;
          } else { this.CityData = []; }
        });
      }
    });
  }
  getCityData() {
    this.masterService.getCity(this.address.StateCode).subscribe((res) => {
      if (res.StatusCode != 0) { this.CityData = res.Data; } else { this.CityData = []; }
    });
  }
  //document
  onFileSelected(event) {
    var reader = new FileReader();
    this.selectedFile = <File>event.target.files[0];
    this.DocFileName = event.target.files[0].name;
    //this.DocFileName = `${this.cpInfo.EmpId}_${this.DocFileName}`;
    reader.onload = (event: ProgressEvent) => {
      this.filepreview = (<FileReader>event.target).result;
      var f1 = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.'));
      f1 = f1.toString().toLowerCase();
      if (f1 == '.jpg' || f1 == '.png' || f1 == '.gif' || f1 == '.jpeg' || f1 == '.bmp' || f1 == '.txt' || f1 == '.excel' || f1 == '.xlsx' || f1 == '.pdf' || f1 == '.xps') {
      }
      else {
        $("#fileControl").val('');
        this.filepreview = 'assets/img/avatars/male.png'
        AppComponent.SmartAlert.Errmsg(`Choose only valid file `);
      }
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  onSubmitDoc() {
    let docobj;
    docobj = this.masterService.filterData(this.docTypeData, this.document.DocTypId, 'DocTypId');
    this.document.DocType = docobj[0].DocType;
    this.document.DocId = '';

    this.document.DocFileName = this.DocFileName;
    this.document.IsActive = "Y";
    this.document.filepreview = this.filepreview;
    if (this.bdata.some(obj => parseInt(obj.DocNo) === parseInt(this.document.DocNo))) {
      AppComponent.SmartAlert.Errmsg("The Document is already added in list.");
      $("#fileControl").val('');
      this.document = { DocTypId: '' };
    } else {
      this.bdata.push(this.document);
      this.fd.append(`image${this.bdata.length}`, this.selectedFile, this.DocFileName);
      $("#fileControl").val('');
      this.document = { DocTypId: '' };
    }
  }
  onRemoveDoc(data, index) {
    if (data.DocId != '' && data.DocId != null) {
      data.IsActive = 'N';
      this.removeDocUpdate.push(data);
    } else {
      this.fd.delete(`image${index}`);
    }
    this.bdata.splice(index - 1, 1)
  }
  viewDocument(base64URL) {
    var win = window.open();
    win.document.write(`<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  }
  getCustomerDocumentDetails() {
    this.masterService.getDocumentDetails('CUSTM', this.customer.ConsId).subscribe((response: any) => {
      if (response.StatusCode != 0)
        this.bdata = response.Data;
      if (this.bdata.length > 0) {
        this.customer.DocId = this.bdata[0].DocId;
      }
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
  HideShowFirm() {
    this.firmAction=this.customerService.HideShowFirm(this.CustTypeData, this.customer.CustTypeId);
  }
  private lastModel;
  //custom change detection
  ngDoCheck() {
    if (!this.lastModel) {
      // backup model to compare further with
      this.lastModel = Object.assign({}, this.model)
    } else {
      if (Object.keys(this.model).some(it => this.model[it] != this.lastModel[it])) {
        // change detected
        this.steps.find(it => it.key == 'step1').valid = !!(this.model.email && this.model.firstname && this.model.lastname);
        this.steps.find(it => it.key == 'step2').valid = !!(this.model.country && this.model.city && this.model.postal);
        this.lastModel = Object.assign({}, this.model)
      }
    }
  }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}
