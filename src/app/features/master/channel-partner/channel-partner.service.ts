import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class ChannelPartnerService {
  constructor(private httpClient:HttpClient) { }
//  public postEmployeeDetails(data:any) {
//   return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageEmployee`,{data:data},AppComponent.httpOptions);            
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
   public postCPDetails(data:any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageChannelPartner`,data,AppComponent.httpOptions);            
  }
  public getRepotDesignation(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/getdesighierarchy?RoleId=&flag=1&ChannelId=`);
  }
  public getRepotEMployee(id){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Operational/GetEmpDetails?UserId=&IsActive=Y&RoleCode&RoleId=${id}`);
  }
  public getMatrixRepotEMployee(id){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Operational/GetEmpDetails?UserId=&IsActive=Y&RoleCode&RoleId=${id}`);
  }
 public postOwnDetails(data:any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageEmployee`,{data:data},AppComponent.httpOptions);            
  }
  public getAddressType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=CPADT&StartDate=&EndDate&UserCode&IsActive=Y`);
  }
  public getAreaData(city) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=SUBAM&StateCode&CityCode=${city}&UserCode&IsActive=Y`);
  }
  public postAreaDetails(data:any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageCPArea`,data,AppComponent.httpOptions);            
    }
    public getChannelPartner(cpcode) {
      return this.httpClient.get<any>(`${AppComponent.BaseUrl}Operational/GetChannelPartner?CPAreaId=&CPCode=&AreaId=&ParentCPCode=${cpcode}&IsActive`);
    }
    
    public getOwnerDetails(cpcode) {
      return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=EMP&CPCode=${cpcode}&UserCode&IsActive=D&RoleCode=OWNE`);
    }
    public getAreaAllocationDetails(cpcode){
      return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPA&CPCode=${cpcode}&UserCode&IsActive=Y`);
    }
    getDocumentDetails(formFlag, RefId) {
      return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=DOC&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
    } //MasterCode=DTM

  
}

