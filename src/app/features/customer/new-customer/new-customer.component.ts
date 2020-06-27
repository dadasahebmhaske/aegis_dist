import { Component, OnInit } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'sa-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  public AreaData:any =[];
  public addArray: any = [];
  public bulkAdd: any = {};
  public CatDiscountData: any = [];
  public customer: any = { IsActive: 'Y', Salutation: '', CustTypeId: '', VolumeTypeId: '', ConsuptionTypeId: '', ServiceTypeId: '', FirmTypeId: '', ContractualId: '',AreaId:'', RoutId: '', SubAreaId: '', CustCatId: '', StateCode: '', CityCode: '' };
  public CustTypeData: any = [];
  public ConsumptionData: any = [];
  public ContractData: any = [];
  public CityData: any = [];
  public cpInfo: any;
  public FirmData: any = [];
  public firmAction:boolean=false;
  public loaderbtn: boolean = true;
  public RouteData: any = [];
  public RouteArray: any = [];
  public ServiceData: any = [];
  public StateData: any = [];
  public SubAreaData: any = [];
  public SubAreaArray: any = [];
  public VolumeData: any = [];
  constructor(private appService: AppService, private customerService: CustomerService, private masterService: MasterService) {
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.cpInfo = data });
    this.allOnloadMethods();
    // this.employee.ReTypePassword=this.employee.Password;
    // this.employee.StateCode= this.employee.StateCode==null?'': this.employee.StateCode;
    // this.employee.CityCode= this.employee.CityCode==null?'': this.employee.CityCode;
  }
  allOnloadMethods() {
    this.customerService.getCustomerType(this.cpInfo.ChannelId).subscribe((respCt) => {
      if (respCt.StatusCode != 0)
        this.CustTypeData = respCt.Data;
    });

    this.customerService.getFirmType().subscribe((respF) => {
      if (respF.StatusCode != 0)
        this.FirmData = respF.Data;
    });
    this.masterService.getArea(this.cpInfo.CPCode).subscribe((resAR: any) => {
      if (resAR.StatusCode != 0)
        this.AreaData = resAR.Data;
    });
    this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA: any) => {
      if (reSA.StatusCode != 0) {
        this.SubAreaArray = reSA.Data;
      }
    });
    this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR: any) => {
      if (resR.StatusCode != 0)
        this.RouteArray = resR.Data;
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
    this.SubAreaData = this.masterService.filterData(this.SubAreaArray, this.customer.AreaId, 'AreaCode');
    let obj=this.masterService.filterData(this.AreaData, this.customer.AreaId, 'AreaId');
    this.customer.PinCode=obj[0].PinCode;
  }
  getRoute() {
    let obj=this.masterService.filterData(this.SubAreaArray, this.customer.SubAreaId, 'SubAreaId');
    this.RouteData = this.masterService.filterData(this.RouteArray, obj[0].RouteId, 'RouteId');
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
    //this.bulkAdd.AddressType = 'D';
    this.bulkAdd.UserCode = this.cpInfo.EmpId;
    //let ciphertext = this.appService.getEncrypted(this.bulkAdd);
    // this.fd.append('CipherText', ciphertext);
    this.masterService.postBulkAddress(this.bulkAdd).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        this.customer.AddressId = resData.Data[0].AddressId
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/customer/customer-master']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  onSubmit() {
    this.loaderbtn = false;
    this.customer.Flag = 'IN';
    this.customer.CPCode = this.cpInfo.CPCode;
    this.customer.UserCode = this.cpInfo.EmpId;
    this.customer.ConsId = '';
    this.customer.ConsNo = null;
    this.customer.ConsName = `${this.customer.FirstName} ${this.customer.LatName}`;
    let ciphertext = this.appService.getEncrypted(this.customer);
    this.customerService.postCustomerDetails(ciphertext).subscribe((resp: any) => {
      if (resp.StatusCode != 0) {
        if (resp.Data.length != 0)
          this.customer.ConsId = resp.Data[0].ConsId;
        this.saveAddressDeatils();
        //AppComponent.SmartAlert.Success(resp.Message);
      } else {
        AppComponent.SmartAlert.Errmsg(resp.Message);
        this.loaderbtn = true;
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
    this.customer.FirmName=this.firmAction==false?'':this.customer.FirmName;
  }
}
