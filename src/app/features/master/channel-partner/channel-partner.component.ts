import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { EmployeeService } from '@app/features/master/employee/employee.service';
import { AppComponent } from '@app/app.component';
import { ChannelPartnerService } from '@app/features/master/channel-partner/channel-partner.service';
import { CustomerService } from '@app/features/customer/customer.service';
@Component({
  selector: 'sa-channel-partner',
  templateUrl: './channel-partner.component.html',
  styleUrls: ['./channel-partner.component.css'],
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
export class ChannelPartnerComponent implements OnInit, OnDestroy {
  public addArray: any = [];
  public bsValue = new Date();
  public bdata: any = [];
  public bulkDoc: any = {};
  public bulkAdd: any = {};
  public CityData: any = [];
  public cpInfo: any;
  public docTypeData: any = [];
  public DocFileName: string;
  public document: any = { DocTypId: '' };
  public dept;
  public employee: any = { IsActive: 'Y', RoleCode: '', Gender: '', MaritalStatus: '', BloodGrp: '', StateCode: '', CityCode: '' };
  public fd = new FormData();
  public filepreview: any;
  public imgUrl: string;
  public loaderbtn: boolean = true;
  public removeDocUpdate: any = [];
  public StateData: any = [];
  public selectedFile: File = null;
  public designationData: any = [];
  public datePickerConfig: Partial<BsDatepickerConfig>;

  public channal: any = { ChannelId: '', CPTypeId: '', ROTypeId: '', PackTypeId: '', FirmTypeId: '', IsActive: 'Y' };
  public chantype: any = [];
  public CType: any = [];
  public ROType: any = [];
  public PackType: any = [];
  public firmtype: any = [];
  public hideRO: boolean;
  public own: any = { MatrixId: '', MRoleId: '', ManagerId: '', RRoleId: '' };
  public RepDesi: any = [];
  public RepEmp: any = [];
  public MatDesi: any = [];
  public MatEmp: any = [];
  public inputType1 = 'password';
  public className = 'glyphicon-eye-close';
  public address: any = { AddressType: '', StateCode: '', CityCode: '' };
  public AccountTypeData: any = [];
  public addressTypeData: any = [];
  public removeAddressUpdate: any = [];
  public AreaData: any = [];
  public AreaSubAreaData: any = [];
  public SelectedAreaSubAreaData:any=[];
  public removeAreaSubArea:any=[];
  public area: any = { StateCode: '', CityCode: '' };
  public i = 0;
  public bank: any = { AccountType: '' };
  public bankArray: any = [];
  public bulkBank: any = {};
  public removeBankUpdate: any = [];


  constructor(private appService: AppService, private channelPartnerService: ChannelPartnerService, private customerService: CustomerService, private datashare: DatashareService, private employeeService: EmployeeService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.allOnloadMethods();
    this.datashare.GetSharedData.subscribe(data => {
      this.channal = data == null ? { ChannelId: '', CPTypeId: '', ROTypeId: '', PackTypeId: '', FirmTypeId: '', IsActive: 'Y' } : data;
      if (this.channal != null && this.channal != undefined) { this.getChType(this.channal.ChannelId); }
      this.channal.ROTypeId = this.channal.ROTypeId == null ? '' : this.channal.ROTypeId;
      this.channal.PackTypeId = this.cpInfo.PackTypeId;
      this.channal.ChannelId = this.cpInfo.ChannelId;
    });
    //this.appService.getAppData().subscribe(data => { this.cpInfo = data });


    this.imgUrl = `${AppComponent.ImageUrl}CPDocs/`;
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
      title: 'Channel Partner Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step2',
      title: 'Owner Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step3',
      title: 'Address Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step4',
      title: 'Area Allocation Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step5',
      title: 'Bank Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step6',
      title: 'Document Details',
      valid: false,
      checked: false,
      submitted: false,
    }
  ];

  public activeStep = this.steps[0];

  setActiveStep(steo) {
    switch (steo.key) {
      case 'step1':
        this.activeStep = steo;
        break;
      case 'step2':
        if (steo.key == "step2" && this.channal.CPCode != null && this.channal.CPCode != undefined) {
          this.activeStep = steo;
          this.getOwnerDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Channel Partner details first`)
        }
        break;
      case 'step3':
        if (steo.key == "step3" && this.own.EmpId != null && this.own.EmpId != undefined) { //&& this.employee.EmpId != null
          this.activeStep = steo;
          this.getCPAddressDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Owner details first`)
        }
        break;
      case 'step4':
        if (steo.key == "step4" && this.addArray.length > 0 || this.removeAddressUpdate.length > 0) {
          this.activeStep = steo;
          this.getAreaAllocationDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Address details first`)
        }
        break;
      case 'step5':
        if (steo.key == "step5" && this.AreaData.length > 0) {
          this.activeStep = steo;
          this.getCPBankDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Area Allocation details first`)
        }
        break;
      case 'step6':
        if (steo.key == "step6" && this.bankArray.length > 0 || this.removeBankUpdate.length > 0) { //&& this.employee.EmpId != null && this.employee.AddressId != null
          this.activeStep = steo;
          this.getEmployeeDocumentDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Bank details first`)
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
  onsubmitCPDeatils() {
    this.loaderbtn = false;
    // this.employee.Flag = this.employee.EmpId == null || this.employee.EmpId == '' ? 'IN' : 'UP';
    // this.employee.EmpId = this.employee.EmpId == null ? '' : this.employee.EmpId;
    // this.employee.DeptId = null;
    // this.employee.CPCode = this.cpInfo.CPCode;
    // this.employee.UserCode = this.cpInfo.EmpId;
    // let ciphertext = this.appService.getEncrypted(this.employee);

    this.channal.UserCode = this.cpInfo.EmpId;
    this.channal.Flag = this.channal.CPCode == null || this.channal.CPCode == undefined || this.channal.CPCode == "" ? 'IN' : 'UP';
    this.channal.CPCode = this.channal.Flag == 'IN' ? '' : this.channal.CPCode;
    this.channal.ParentCPCode = this.cpInfo.CPCode;
    this.channal.data = '';
    this.channelPartnerService.postCPDetails(this.channal).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        if (resData.Data.length != 0) { this.channal.CPCode = resData.Data[0].CPCode; }
        this.nextStep();
        this.getOwnerDetails();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onSubmitOwnerDetails() {
    this.own.UserCode = this.cpInfo.EmpId;
    this.own.Flag = this.own.EmpId == null || this.own.EmpId == undefined || this.own.EmpId == "" ? 'IN' : 'UP';
    this.own.EmpId = this.own.Flag == 'IN' ? null : this.own.EmpId;
    this.own.RoleCode = 'OWNE';
    this.own.IsActive = 'D';
    this.own.CPCode = this.channal.CPCode;
    if (this.own.ManagerId === this.own.MatrixId) {
      AppComponent.SmartAlert.Errmsg('Reporting to Employee and Matrix Reporting to Employee Should Not Be Same!');
    } else {
      this.loaderbtn = false;
      let ciphertext = this.appService.getEncrypted(this.own);
      this.channelPartnerService.postOwnDetails(ciphertext).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.nextStep();
          this.getCPAddressDetails();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }
  }
  onSubmitAddressDeatils() {
    if (this.addArray.length > 0 || this.removeAddressUpdate.length > 0) {
      this.bulkAdd.AddressId = this.bulkAdd.AddressId == undefined ? null : this.bulkAdd.AddressId;
      this.loaderbtn = false;
      this.bulkAdd.Flag = this.address.AddressId == null ? "IN" : "UP";
      this.bulkAdd.data = this.addArray;
      if (this.removeAddressUpdate.length > 0) {
        //this.addArray = this.addArray.concat(this.removeAddressUpdate);
        let conArray = this.addArray;
        conArray = conArray.concat(this.removeAddressUpdate);
        this.bulkAdd.data = conArray;
      }
      this.bulkAdd.RefId = this.channal.CPCode;
      this.bulkAdd.FormFlag = 'CP';
      this.bulkAdd.UserCode = this.cpInfo.EmpId;
      this.masterService.postBulkAddress(this.bulkAdd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.address.AddressId = resData.Data[0].AddressId
          AppComponent.SmartAlert.Success(resData.Message);
          //          this.addArray = [];
          this.nextStep(); this.removeAddressUpdate = [];
          this.getCPAddressDetails();
          this.getAreaAllocationDetails();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one record.`);
    }
  }
  onSubmitArea() {
    if (this.SelectedAreaSubAreaData.length > 0) {
      this.loaderbtn = false;
      // let SelectedArray = [];
      // for (let i = 0; i < this.AreaData.length; i++) {
      //   if (this.AreaData[i].Check == true) {
      //     SelectedArray.push(this.AreaData[i]);
      //   }
      // }

      let SelectedAreaArray=[]
      SelectedAreaArray= this.SelectedAreaSubAreaData;
      if (this.removeAreaSubArea.length > 0) {
        let  areaArray=this.SelectedAreaSubAreaData;
        areaArray=areaArray.concat(this.removeAreaSubArea);
        SelectedAreaArray = areaArray;
      }
      this.area = { "data": JSON.stringify(SelectedAreaArray), "IsActive": 'Y', "Flag": 'IN', "UserCode": this.cpInfo.EmpId };
      this.channelPartnerService.postAreaDetails(this.area).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.nextStep();
          this.getCPBankDetails();
          this.getAreaAllocationDetails();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg("Please submit at least 1 Area");
    }
  }
  onSubmitBankDetails() {
    if (this.bankArray.length > 0 || this.removeBankUpdate.length > 0) {
      this.loaderbtn = false;
      this.bulkBank.Flag = "IN";
      this.bulkBank.data = this.bankArray;
      if (this.removeBankUpdate.length > 0) {
        //this.bankArray = this.bankArray.concat(this.removeBankUpdate);
        let conArray = this.bankArray;
        conArray = conArray.concat(this.removeBankUpdate);
        this.bulkBank.data = conArray;
      }
      this.bulkBank.RefId = this.channal.CPCode;
      this.bulkBank.FormFlag = 'CP';
      this.bulkBank.UserCode = this.cpInfo.EmpId;
      this.customerService.postBulkBank(this.bulkBank).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          AppComponent.SmartAlert.Success(resData.Message);
          this.removeBankUpdate = [];
          this.nextStep();
          this.getEmployeeDocumentDetails();
          this.getCPBankDetails();
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please add atleast one bank.`);
    }

  }
  nextToSave() {
    if (this.bdata.length > 0 || this.removeDocUpdate.length > 0) {
      this.bulkDoc.flag = this.employee.DocId == null ? 'IN' : 'UP';
      this.bulkDoc.RefId = this.channal.CPCode;
      this.bulkDoc.FormFlag = 'CP';
      this.bulkDoc.UserCode = this.cpInfo.EmpId;
      this.bulkDoc.bdata = this.bdata;
      if (this.removeDocUpdate.length > 0) {
        let docArray = this.bdata;
        docArray = docArray.concat(this.removeDocUpdate);
        this.bulkDoc.bdata = docArray;
        // this.bdata = this.bdata.concat(this.removeDocUpdate);
      }

      let ciphertext = this.appService.getEncrypted(this.bulkDoc);
      this.fd.append('CipherText', ciphertext);
      this.masterService.postBulkDoc(this.fd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.removeDocUpdate = [];
          if (resData.Data.length != 0)
            this.document.DocId = resData.Data[0].DocId;
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/master/channel-partner-master']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    } else {
      AppComponent.SmartAlert.Errmsg(`Please Add atleast one document.`);
    }

  }
  onWizardComplete(data) {
    console.log('basic wizard complete', data)
  }
  allOnloadMethods() {
    this.masterService.getState().subscribe(
      (res: any) => {
        this.StateData = res.Data;
      });
    this.masterService.getDocumentType('CP').subscribe(
      (resData: any) => {
        this.docTypeData = resData.Data;
      });
    this.channelPartnerService.getChannelType().subscribe(
      (resChData: any) => {
        this.chantype = resChData.Data;
      });
    this.channelPartnerService.getROType().subscribe(
      (resROData: any) => {
        this.ROType = resROData.Data;
      });
    this.channelPartnerService.getPackType().subscribe(
      (resPKData: any) => {
        this.PackType = resPKData.Data;
      });
    this.channelPartnerService.getFirmType().subscribe(
      (resFMData: any) => {
        this.firmtype = resFMData.Data;
      });
    this.channelPartnerService.getAddressType().subscribe(
      (resAddData: any) => {
        this.addressTypeData = resAddData.Data;
      });
    this.customerService.getAccountType().subscribe((resACT: any) => {
      if (resACT.StatusCode != 0)
        this.AccountTypeData = resACT.Data;
    });
    this.channelPartnerService.getRepotDesignation().subscribe((resRPDES: any) => {
      if (resRPDES.StatusCode != 0)
        this.RepDesi = resRPDES.Data;
      this.MatDesi = resRPDES.Data;
    });


  }
  getRepEmp(id) {
    //if((this.own.Flag == 'UP' && this.own.ManagerId == null) || (this.own.Flag == 'IN')){this.own.ManagerId = ''};
    if (id != '') {
      this.channelPartnerService.getRepotEMployee(id).subscribe(
        (resRPTEMPData: any) => {
          this.RepEmp = resRPTEMPData.Data;
        });
    } else {
      this.own.ManagerId = '';
    }
  }
  getMatEmp(id) {
    if (id != '') {
      this.channelPartnerService.getMatrixRepotEMployee(id).subscribe(
        (resRPTEMPData: any) => {
          this.MatEmp = resRPTEMPData.Data;
        });
    } else {
      this.own.MatrixId = '';
    }
  }
  getChType(code) {
    this.channelPartnerService.getChannelPartnerType(code).subscribe(
      (resChPData: any) => { 
        let CTArray= resChPData.Data;
        for(let i=0;i<CTArray.length;i++){
        if(CTArray[i].ChannelTypeFlag=='POS'|| CTArray[i].ChannelTypeFlag=='SF' || CTArray[i].ChannelTypeFlag=='SD')
        this.CType.push(CTArray[i]);
      }
        this.hideShow();
      });
    this.hideShow();
  }
  hideShow() {
    let docobj;
    docobj = this.masterService.filterData(this.chantype, this.channal.ChannelId, 'ChannelId');
    if (docobj.length > 0)
      if ((docobj[0].Channel).toUpperCase() == 'AUTOGAS') {
        this.hideRO = true;
      } else {
        this.hideRO = false;
      }
  }
  HideShowPassword1() {
    if (this.inputType1 === 'password') {
      this.inputType1 = 'text';
      this.className = 'glyphicon-eye-open';
    } else {
      this.inputType1 = 'password';
      this.className = 'glyphicon-eye-close';
    }
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
  getCPBankDetails() {
    this.customerService.getBankDetails('CP', this.channal.CPCode).subscribe((resp: any) => {
      if (resp.StatusCode != 0)
        this.bankArray = resp.Data;
      for (let i = 0; i < this.bankArray.length; i++) {
        let docobj;
        docobj = this.masterService.filterData(this.AccountTypeData, this.bankArray[i].AccountType, 'MstFlag');
        this.bankArray[i].AccountTypeName = docobj[0].Name;
      }
    });
  }

  //doc
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
  getEmployeeDocumentDetails() {
    this.channelPartnerService.getDocumentDetails('CP', this.channal.CPCode).subscribe((response: any) => {
      if (response.StatusCode != 0)
        if (response.Data != null)
          this.bdata = response.Data;
    });
  }
  // getEmployeeAddressDetails() {
  //   this.masterService.getAddressDetails('EMP', this.employee.EmpId).subscribe((resp: any) => {
  //     if (resp.StatusCode != 0)
  //       this.employee = Object.assign(this.employee, resp.Data[0]);
  //     this.getCityData(this.address.StateCode);
  //   });
  // }
  private lastModel;
  getCityData(stateCode) {
    this.masterService.getCity(stateCode).subscribe((res) => {
      if (res.StatusCode != 0) { this.CityData = res.Data; } else { this.CityData = []; }
    });
  }


  // getDesignation(dept) {
  //   this.dept = AppComponent.DeptId;
  //   this.masterService.getDesignation(this.dept).subscribe((res) => {
  //     if (res.StatusCode != 0) {
  //       this.designationData = res.Data;
  //     }
  //   });
  // }
  // checkingPassword() {
  //   if (this.employee.Password != this.employee.ReTypePassword && this.employee.ReTypePassword != null) {
  //     AppComponent.SmartAlert.Errmsg('Password and Re-enter Password must be same');
  //     this.employee.ReTypePassword = null;
  //   }
  // }
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
  getCPAddressDetails() {
    this.masterService.getAddressDetails('CP', this.channal.CPCode).subscribe((resp: any) => {
      if (resp.StatusCode != 0)
        this.addArray = resp.Data;
      // if (this.addArray.length > 0) {
      //   this.customer.AddressId = this.addArray[0].AddressId;
      // }
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
  getOwnerDetails() {
    this.channelPartnerService.getOwnerDetails(this.channal.CPCode).subscribe((res) => {
      if (res.StatusCode != 0) {
        this.own = res.Data[0];
        // this.samp=this.own.RoleCode;

        this.own.RRoleId = this.own.RRoleId == null ? '' : this.own.RRoleId;
        this.own.ManagerId = this.own.ManagerId == null ? '' : this.own.ManagerId;
        this.own.MRoleId = this.own.MRoleId == null ? '' : this.own.MRoleId;
        this.own.MatrixId = this.own.MatrixId == null ? '' : this.own.MatrixId;
        this.own.Flag = this.own.FirstName == null || this.own.FirstName == undefined ? 'IN' : 'UP';
        this.getRepEmp(this.own.RRoleId);
        this.getMatEmp(this.own.MRoleId);
      }
    });
  }
  getAreaAllocationDetails() {
    this.channelPartnerService.getAreaAllocationDetails(this.channal.CPCode).subscribe((res) => {
      if (res.StatusCode != 0) {
        this.AreaData = [];
        for (let i = 0; i < res.Data.length; i++) {
          this.AreaData.push({
            "AreaID": res.Data[i].AreaId,
            "AreaName": res.Data[i].AreaName,
            "SubAreaId": res.Data[i].SubAreaId,
            "SubAreaName": res.Data[i].SubAreaName,
            "CPCode": res.Data[i].CPCode,
            "PinCode": res.Data[i].PinCode,
            "CPAreaId": res.Data[i].CPAreaId,
            "IsActive": res.Data[i].IsActive,
            "Check": res.Data[i].IsActive == 'Y' ? true : false,
          });
          this.SelectedAreaSubAreaData=this.AreaData;
        }
      }

    });
  }
  getArea(city) {
    this.AreaData = [];
    this.channelPartnerService.getAreaData(city).subscribe((resAreaData: any) => {
      if (resAreaData.StatusCode != 0) {
        console.log(resAreaData.Data);
        for (let i = 0; i < resAreaData.Data.length; i++) {
          var AreatTData = [];
          AreatTData = this.AreaData.filter(abc => abc.AreaID == resAreaData.Data[i].AreaCode);
          if (AreatTData.length == 0) {
            this.AreaData.push({
              "AreaID": resAreaData.Data[i].AreaCode,
              "AreaName": resAreaData.Data[i].AreaName,
              "SubAreaId": resAreaData.Data[i].SubAreaId,
              "SubAreaName": resAreaData.Data[i].SubAreaName,
              "CPCode": this.channal.CPCode,
              "PinCode": resAreaData.Data[i].PinCode,
              "CPAreaId": null,
              "IsActive": "Y"
            });
            this.AreaSubAreaData = this.AreaData;
          }
        }
      }
      else { this.AreaData = []; }
    });

  }
  onAreaSubArea(data) {
    
    if (this.SelectedAreaSubAreaData.some(obj => parseInt(obj.SubAreaId) === parseInt(data.SubAreaId))) {
      AppComponent.SmartAlert.Errmsg("Area is already added in list.");
 
    } else {
      // let docobj;
      // docobj = this.masterService.filterData(this.productSegmentData, this.product.ProdSegId, 'ProdSegId');
      // let ProdSegName = docobj[0].ProdSeg;
      this.SelectedAreaSubAreaData.push(data);
     }
  }
  removeAreaSub(data, index) {
      data.IsActive = 'N';
      this.removeAreaSubArea.push(data);
    this.SelectedAreaSubAreaData.splice(index, 1);
  }
  // onBlur(e, idx, dat: any) {
  //   if (e.target.checked) {
  //     var Count = this.AreaData.filter(AreaData => AreaData.AreaID === dat.DocTypId);
  //     if (Count = 0) {
  //       // this.arr[idx] = dat;
  //       this.AreaData[this.i] = dat
  //     } else {
  //       this.AreaData[idx].IsActive = 'Y';
  //     }
  //   } else {
  //     this.AreaData[idx].IsActive = 'N';
  //     // this.area2[this.j] = dat
  //     // this.j++;
  //   }
  // }
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
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}
