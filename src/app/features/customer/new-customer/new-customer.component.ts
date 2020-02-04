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
  public addArray: any = [];
  public bulkAdd: any = {};
  public customer: any = { Salutation: '', CustTypeId: '', VolumeTypeId: '', ConsuptionTypeId: '', ServiceTypeId: '',FirmTypeId:'',ContractualId:'',RoutId:'',SubAreaId:'',CustCatId:'',StateCode:'',CityCode:'' };
  public CustTypeData: any = [];
  public ConsumptionData: any = [];
  public ContractData:any=[];
  public CityData:any=[];
  public cpInfo: any;
  public FirmData:any=[];
  public loaderbtn: boolean = true;
  public RouteData:any=[];
  public ServiceData:any=[];
  public StateData:any=[];
  public SubAreaData:any=[];
  public SubAreaArray:any=[];
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
    this.customerService.getCustomerType().subscribe((respCt) => {
      if (respCt.StatusCode != 0)
        this.CustTypeData = respCt.Data;
    });
    this.customerService.getVolumeType().subscribe((respV) => {
      if (respV.StatusCode != 0)
        this.VolumeData = respV.Data;
    });
    this.customerService.getConsumptionType().subscribe((respC) => {
      if (respC.StatusCode != 0)
        this.ConsumptionData = respC.Data;
    });
    this.customerService.getServiceType().subscribe((respS) => {
      if (respS.StatusCode != 0)
        this.ServiceData = respS.Data;
    });
    this.customerService.getFirmType().subscribe((respF) => {
      if (respF.StatusCode != 0)
        this.FirmData = respF.Data;
    });
    this.masterService.getRoutes(this.cpInfo.CPCode).subscribe((resR:any)=>{      
      if(resR.StatusCode!=0)
     this.RouteData=resR.Data;  
    }); 
    this.masterService.getSubArea(this.cpInfo.CPCode).subscribe((reSA:any)=>{      
      if(reSA.StatusCode!=0){
     this.SubAreaArray=reSA.Data;
    }     
    }); 
    this.masterService.getState().subscribe((resSt: any) => {
        if(resSt.StatusCode!=0)
        this.StateData = resSt.Data;
      });
      this.customerService.getContraType().subscribe((resCo) => {
        if (resCo.StatusCode != 0)
          this.ContractData = resCo.Data;
      });
  }
  getCityData() {
    this.masterService.getCity(this.customer.StateCode).subscribe((res) => {
      if (res.StatusCode != 0) { this.CityData = res.Data; } else { this.CityData = []; }
    });
  }
  getSubArea(){
    this.SubAreaData= this.masterService.filterData( this.SubAreaArray,this.customer.RoutId,'RouteId');
  }
  saveAddressDeatils() {
    //this.loaderbtn = false;
    this.addArray.push({
      "AddressId": "",
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
    this.bulkAdd.AddressType = 'H';
    this.bulkAdd.UserCode= this.cpInfo.EmpId;
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
    this.customer.CustCatId=null;
    this.customer.ConsNo=1;
    this.customer.ConsName=`${this.customer.FirstName} ${this.customer.LatName}`;
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
}
