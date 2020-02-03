import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../app.component';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private httpClient:HttpClient) { }
  public getDiffMonths(dt2, dt1) 
  {   if(dt2!=null && dt1!=null){
     var diff =(dt2.getTime() - dt1.getTime()) / 1000;
     diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));   }
  }
  public  filterData(data,DocTypId,para) {
     return data.filter(object => {
      return object[para] == DocTypId;
    });
  }
  getAddressDetails(formFlag,RefId){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=ADD&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
  }
  getDocumentDetails(formFlag,RefId){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=DOC&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
  }
  public getDesignation() {                               
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=DGM&IsActive=Y`);
  }
  public getCity(statecode) {                               
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CM&StateCode=${statecode}&IsActive=Y`);
  } public getDocumentType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=DTM&IsActive=Y`);
  }
  public getEmpoyees(cpcode) { 
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=EMP&CPCode=${cpcode}&RoleCode=&IsActive=Y`);     
  }
  public getGodowns(cpcode) { 
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&CPCode=${cpcode}&IsActive=Y`);     
  }
  public getRoutes(cpcode) { 
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Master/GetCPRoute?RouteId=&CPCode=${cpcode}&IsActive=Y`,AppComponent.httpOptions);          
  }
  public getState() {                                       
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=SM&IsActive=Y`);
  }
  public getSubArea(cpcode) {
         return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPSubArea?SubAreaId=&CPCode=${cpcode}&IsActive=Y`,AppComponent.httpOptions);          
  }
  public getTransport(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=VTM&CPCode=${cpcode}&RoleCode=&IsActive=Y`);     
  }
    public getVehicles(cpcode) {
     
      return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=VM&CPCode=${cpcode}&RoleCode=&IsActive=Y`);         
  }
  public postBulkDoc(fd:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageDocumentDtls`,fd);          
  }
  public postBulkAddress(fd:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageAddressDtls`,fd);          
  }
}
