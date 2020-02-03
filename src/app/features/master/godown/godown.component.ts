
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatashareService } from '../../../core/custom-services/datashare.service';
import { AppComponent } from '../../../app.component';
import { AppService } from '@app/core/custom-services/app.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { GodownService } from '@app/features/master/godown/godown.service';
import { MasterService } from '@app/core/custom-services/master.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'sa-godown',
  templateUrl: './godown.component.html',
  styleUrls: ['./godown.component.css'],
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
export class GodownComponent implements OnInit {
  public addArray: any = [];
  public bsValue = new Date();
  public bdata: any = [];
  public bulkDoc: any = {};
  public bulkAdd: any = {};
  public CityData: any = [];
  public cpInfo: any;
  public docTypeData: any = [];
  public DocFileName: string;
  public document: any = {DocTypId:''};
  public fd = new FormData();
  public filepreview: any;
  public godown: any = {};
  public GodownTypeData: any = [];
  public GodownType: string;
  public imgUrl:string;
  public loaderbtn: boolean = true;
  public removeDocUpdate:any=[];
  public StateData: any = [];
  public selectedFile: File = null;
  public datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private httpClient: HttpClient, private appService: AppService, private datashare: DatashareService, private godownService: GodownService, private masterService: MasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.imgUrl=`${AppComponent.ImageUrl}GodownDocs/`;
    this.datashare.GetSharedData.subscribe((data) => {
      this.godown = data == null ? { StateCode: '', DocTypId: '', GodownTypeId: '', CityCode: '' } : data
    });

    this.allOnloadMethods();
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.godown.StateCode= this.godown.StateCode==null?'': this.godown.StateCode;
    this.godown.CityCode= this.godown.CityCode==null?'': this.godown.CityCode;
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
      title: 'Godown Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step2',
      title: 'Address Details',
      valid: true,
      checked: false,
      submitted: false,
    },
    {
      key: 'step3',
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
        if (steo.key == "step2" && this.godown.GodownId != null) {
          this.activeStep = steo;
          this.getGOdownAddressDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Godown details first`)
        }
        break;
      case 'step3':
        if (steo.key == "step3" && this.godown.GodownId != null && this.godown.AddressId != null) {
          this.activeStep = steo;
          this.getGodownDocumentDetails();
        } else {
          AppComponent.SmartAlert.Errmsg(`Please add Address details first`)
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
    this.godown.Flag = this.godown.GodownId == null ? 'IN' : 'UP';
    this.godown.GodownId = this.godown.GodownId == null || this.godown.GodownId == '' ? '' : this.godown.GodownId;
    this.godown.CPCode = this.cpInfo.CPCode;
    this.godown.UserCode = this.cpInfo.EmpId;
    let ciphertext = this.appService.getEncrypted(this.godown);
    this.godownService.postGodownDetails(ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        this.godown.GodownId = resData.Data[0].GodownId;
        this.nextStep();
        this.getGOdownAddressDetails();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
    //this.nextStep();
  }
  nextToDocumentDeatils() {
    this.loaderbtn = false;
    this.addArray.push({
      "AddressId": "",
      "StateCode": this.godown.StateCode,
      "CityCode": this.godown.CityCode,
      "PinCode": this.godown.PinCode,
      "AddressLineOne": this.godown.AddressLineOne,
      "AddressLineTwo": this.godown.AddressLineTwo,
      "AddressLineThree": this.godown.AddressLineThree,
      "IsActive": "Y"
    });
    this.bulkAdd.Flag = this.godown.AddressId == null ? "IN" : "UP";
    this.bulkAdd.data = this.addArray;
    this.bulkAdd.RefId = this.godown.GodownId;
    this.bulkAdd.FormFlag = 'GDWN';
    this.bulkAdd.AddressType = 'H';
    this.bulkAdd.UserId = this.cpInfo.EmpId;
    //let ciphertext = this.appService.getEncrypted(this.bulkAdd);
    // this.fd.append('CipherText', ciphertext);
    this.masterService.postBulkAddress(this.bulkAdd).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.godown.AddressId = resData.Data[0].AddressId
        AppComponent.SmartAlert.Success(resData.Message);
        this.nextStep();
        this.getGodownDocumentDetails();
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });


    //this.nextStep();
  }
  nextToSave() {
    if(this.bdata.length>0 || this.removeDocUpdate.length>0){
      this.bulkDoc.flag = this.godown.DocId == null ? 'IN' : 'UP';
      this.bulkDoc.RefId = this.godown.GodownId;   
      this.bulkDoc.FormFlag = 'GDWN';
      this.bulkDoc.UserCode = this.cpInfo.EmpId;
      if(this.removeDocUpdate.length>0){
        this.bdata=this.bdata.concat(this.removeDocUpdate); 
      }
      this.bulkDoc.bdata = this.bdata;
      let ciphertext = this.appService.getEncrypted(this.bulkDoc);
      this.fd.append('CipherText', ciphertext);
      this.masterService.postBulkDoc(this.fd).subscribe((resData: any) => {
        this.loaderbtn = true;
        if (resData.StatusCode != 0) {
          this.bdata=[];this.removeDocUpdate=[];
          if(resData.Data.length!=0)
          this.godown.DocId = resData.Data[0].DocId;
          AppComponent.SmartAlert.Success(resData.Message);
          AppComponent.Router.navigate(['/master/godown-master']);
        }
        else { AppComponent.SmartAlert.Errmsg(resData.Message); }
      });
    }else{
      AppComponent.SmartAlert.Errmsg(`Please Add atleast one document.`);
    }
  
    // this.nextStep();
  }
  onWizardComplete(data) {
    console.log('basic wizard complete', data)
  }
  allOnloadMethods() {
    this.masterService.getState().subscribe(
      (res: any) => {
        this.StateData = res.Data;
      });
    this.masterService.getDocumentType().subscribe(
      (resData: any) => {
        this.docTypeData = resData.Data;
      });
    this.godownService.getGodownType().subscribe((resD: any) => {
      if (resD.StatusCode != 0)
        this.GodownTypeData = resD.Data;
    });

  }
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
    this.document.DocType=docobj[0].DocType;
    this.document.DocId = '';

    this.document.DocFileName = this.DocFileName;
    this.document.IsActive = "Y";
    this.document.filepreview=this.filepreview;

    if (this.bdata.some(obj => obj.DocNo === this.document.DocNo)) {
      AppComponent.SmartAlert.Errmsg("The Document is already added in list.");
      $("#fileControl").val('');
      this.document ={DocTypId:''};
    } else {
      this.bdata.push(this.document);
      this.fd.append(`image${this.bdata.length}`, this.selectedFile, this.DocFileName);
      $("#fileControl").val('');
      this.document = {DocTypId:''};
    }
  }
  onRemoveDoc(data, index) {
    if(data.DocId!=''&& data.DocId!=null){
      data.IsActive='N';
      this.removeDocUpdate.push(data);
    }else{
      this.fd.delete(`image${index}`);
    }
    this.bdata.splice(index-1, 1)
  }
  viewDocument(base64URL) {
    var win = window.open();
    win.document.write(`<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  }

  getGodownDocumentDetails() {
    this.masterService.getDocumentDetails('GDWN', this.godown.GodownId).subscribe((response: any) => {
      if (response.StatusCode != 0)
        this.bdata = response.Data;
      console.log(response.Data[0]);
    });
  }
  getGOdownAddressDetails() {   
    this.masterService.getAddressDetails('GDWN', this.godown.GodownId).subscribe((resp: any) => {
      if (resp.StatusCode != 0)
        this.godown = Object.assign(this.godown, resp.Data[0]);
        this. getCityData();
    });
     }

  //godown
  CheckGodownType() {
    let docobj;
    docobj = this.masterService.filterData(this.GodownTypeData, this.godown.GodownTypeId, 'Id');
    this.GodownType = docobj[0].MstFlag;
  }
  calculateMonths(value) {
    if (this.godown.Startdate != undefined && value != undefined)
      this.godown.LeasePeriod = this.masterService.getDiffMonths(this.godown.Startdate, value);
  }
  resetEndDate(val, flag) {
    if (flag == 'LP' && this.godown.Startdate != undefined) {
      this.godown.EndDate = null;
      this.godown.LeasePeriod = null;
    }
    if (flag == 'LI') {
      this.godown.LicExpDate = null;
    }
  }
  getCityData() {
    this.masterService.getCity(this.godown.StateCode).subscribe((res) => {
      console.log(res);
      if (res.StatusCode != 0) { this.CityData = res.Data; } else { this.CityData = []; }
    });
  }
  // public onSubmit() {
  //   this.godown.Flag = this.godown.RouteId == null ? 'IN' : 'UP';
  //   this.godown.IsActive = this.godown.IsActive == false ? 'N' : 'Y';
  //   this.godownService.postGodown(this.godown).subscribe(resData => {
  //     if (resData.StatusCode != 0) {
  //       AppComponent.SmartAlert.Success(resData.Message);
  //       //  AppComponent.Router.navigate(['/master/bank-grid']);
  //     }
  //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
  //   });
  // }

  public lastModel;

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
