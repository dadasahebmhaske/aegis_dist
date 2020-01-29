import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../../app.component';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private httpClient:HttpClient) { }
  public  filterData(data,DocTypId,para) {
    return data.filter(object => {
      return object[para] == DocTypId;
    });
  }
  public getCity(statecode) {                               
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CM&StateCode=${statecode}&IsActive=Y`);
  } public getDocumentType() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=DTM&IsActive=Y`);
  }

  public getGodowns() {
    return <any>[{
      "RouteID": 1,
      "RouteName": "Route 1",
      "IsActive": "Y"
    }, {
      "RouteID": 2,
      "RouteName": "Route 2",
      "IsActive": "Y"
    }, {
      "RouteID": 3,
      "RouteName": "Route 3",
      "IsActive": "N"
    }];
    // return this.httpClient.get<any>(`${AppComponent.BaseUrl}`);          
  }
  public getRoutes() { 
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}/Master/GetCPRoute?RouteId=&CPCode=&IsActive=Y`,AppComponent.httpOptions);          
  }
  public getState() {                                       
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=SM&IsActive=Y`);
  }
  public getSubArea() {
         return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPSubArea?SubAreaId=&CPCode=&IsActive=Y`,AppComponent.httpOptions);          
  }
  public getTransport() {
    return <any>[{
      "TransportID": 1,
      "TransportName": "Two Wheeler",
      "IsActive": "Y"
    }, {
      "TransportID": 2,
      "TransportName": "Four Wheeler",
      "IsActive": "Y"
    }, {
      "TransportID": 3,
      "TransportName": "Ship",
      "IsActive": "N"
    }, {
      "TransportID": 4,
      "TransportName": "Train",
      "IsActive": "N"
    }];
  }
    public getVehicles() {
      return <any>[{
        "VehicleID": 1,
        "VehicleNo": "MH12QL9337",
        "VehicleType":"4 Wheeler",
        "CylCapacity":112,
        "LastFitnessDate":"12-12-2019",
        "Insurance": "Y",
        "InsuranceRenewalDate":"11-11-2020",
        "IsActive": "Y"
      }, {
        "VehicleID": 2,
        "VehicleNo": "MH14JK1313",
        "VehicleType":"6 Wheeler",
        "CylCapacity":147,
        "LastFitnessDate":"10-10-2019",
        "Insurance": "Y",
        "InsuranceRenewalDate": "10-08-2020",
        "IsActive": "Y"
      }];
    // return this.httpClient.get<any>(`${AppComponent.BaseUrl}`);          
  }
  public postBulkDoc(fd:any){
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageDocumentDtls`,fd);          
  }
}
