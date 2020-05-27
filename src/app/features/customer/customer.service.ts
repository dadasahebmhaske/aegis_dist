import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
import { MasterService } from '@app/core/custom-services/master.service';

@Injectable()
export class CustomerService {
  constructor(private httpClient: HttpClient,private masterService:MasterService) { }
  public postCustomerDetails(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}/Operational/ManageCustomer`, { data: data }, AppComponent.httpOptions);
  }
  public postInstantCustomerDetails(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}/Operational/ManageInstantCustomer`, { data: data }, AppComponent.httpOptions);
  }
  public getCustomerType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CTM&IsActive=Y`);
  }
  public getVolumeType(RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CBVLIST&FormFlag=CBV&RefId=${RefId}&IsActive=Y`);
  }
  public getConsumptionType(RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CCMLIST&FormFlag=CCM&RefId=${RefId}&IsActive=Y`);
  }
  public getServiceType(RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CSTMLIST&FormFlag=CSTM&RefId=${RefId}&IsActive=Y`);
  }
  public getFirmType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=FTM&IsActive=Y`);
  }
  public getContraType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CNCM&IsActive=Y`);
  }
  public getAddressType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CUADT&IsActive=Y`);
  }
  public getAccountType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=ACT&IsActive=Y`);
  }
  public postBulkBank(fd: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageBankAcDetails`, fd);
  }
  getBankDetails(formFlag, RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=BM&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
  }
  public postBulkProduct(fd: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageCustProd`, fd);
  }
  getProductDetails(cpcode, formFlag, ConsId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPD&CPCode=${cpcode}&FormFlag=${formFlag}&ConsId=${ConsId}&IsActive=Y`);
  }
  public getCustomer(cpcode, SubAreaId, ConsNo, MobNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CUSTM&CPCode=${cpcode}&SubAreaId=${SubAreaId}&ConsNo=${ConsNo}&MobileNo=${MobNo}&IsActive=Y`);
  }
  public getCustomerIn(cpcode, IsTransfer) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Operational/GetTransCust?TransferId=&CPCode=${cpcode}&ConsId=&IsTransfer=${IsTransfer}&IsActive=Y`);
  }
  public postCustomeTerminate(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ProcessCustomerTermination`, data);
  }
  public postCustomeTransfer(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ProcessTransCustomer`, data);
  }
  public checkCustOrMobNo(cust) {
    cust.CustNoMob = cust.CustNoMob == null ? '' : cust.CustNoMob;
    if (cust.CustNoMob == '') {
      cust.MobileNo = '';
      cust.ConsNo = '';
    } else if (cust.CustNoMob.length == 10) {
      cust.MobileNo = cust.CustNoMob;
      cust.ConsNo = '';
    } else {
      cust.ConsNo = cust.CustNoMob;
      cust.MobileNo = '';
    }
    return cust;
  }
    HideShowFirm(data,val) {
    let docobj;
    docobj = this.masterService.filterData(data, val, 'Id');
    if(docobj.length>0)
    if ((docobj[0].Name).toUpperCase() == 'COMMERCIAL') {
      return true;
    } else {
      return false;
    }
  }
}
