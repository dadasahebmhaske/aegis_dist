import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../../app.component';
@Injectable()
export class GodownService {
  constructor(private httpClient:HttpClient) { }
 public postGodownDetails(data:any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Master/ManageGodown`,{data:data},AppComponent.httpOptions);            
  }
  public getGodownDetails(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&IsActive='Y'`);
  }
  public getGodownType(){
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=GDWNT&IsActive=Y`);
  }
}
