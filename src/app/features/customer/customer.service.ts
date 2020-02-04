import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class CustomerService {
  constructor(private httpClient:HttpClient) { }
 public postCustomerDetails(data:any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}/Operational/ManageCustomer`,{data:data},AppComponent.httpOptions);            
  }
  public getCustomerType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CTM&IsActive=Y`);
  }
  public getVolumeType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CBV&IsActive=Y`);
  }
  public getConsumptionType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CCM&IsActive=Y`);
  }
  public getServiceType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CSTM&IsActive=Y`);
  }
  public getFirmType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=FTM&IsActive=Y`);
  }
  public getContraType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CNCM&IsActive=Y`);
  }
}
