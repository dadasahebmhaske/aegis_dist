import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class CustomerService {
  constructor(private httpClient: HttpClient) { }
  public postCustomerDetails(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}/Operational/ManageCustomer`, { data: data }, AppComponent.httpOptions);
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
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=ADDT&IsActive=Y`);
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
  getProductDetails(formFlag, RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPD&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
  }
  public getCustomer(cpcode, SubAreaId, ConsNo, MobNo) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CUSTM&CPCode=${cpcode}&SubAreaId=${SubAreaId}&ConsNo=${ConsNo}&MobileNo=${MobNo}&IsActive=Y`);
  }
  public postCustomeTerminate(data: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ProcessCustomerTermination`, { data: data });
  }

}
