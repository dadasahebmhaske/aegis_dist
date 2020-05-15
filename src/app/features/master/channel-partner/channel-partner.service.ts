import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class ChannelPartnerService {
  constructor(private httpClient:HttpClient) { }
//  public postEmployeeDetails(data:any) {
//   return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageEmployee`,{data:data},AppComponent.httpOptions);            
//   }
//   public getGodownDetails(){
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&IsActive='Y'`);
//   }
//   public getGodownType(){
//     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=GDWN&IsActive=Y`);
//   }
  public getChannelType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CHM&UserCode&IsActive=Y`);
  }
  public getChannelPartnerType(code){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CHT&ChannelId=${code}&IsActive=Y`);
  }
  public getROType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=ROT&StartDate=&EndDate&UserCode&IsActive=Y`);
  }

  public getPackType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=DITM&StartDate=&EndDate&IsActive=Y`);
  }
  
  public getFirmType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=FTM&StartDate=&EndDate&UserCode&IsActive=Y`);
  }

}
