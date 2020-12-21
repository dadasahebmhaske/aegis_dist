import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private httpClient: HttpClient) { }
  public getMonthsDiff(dt2, dt1) {
    if (dt2 != null && dt1 != null) {
      var diff = (new Date(dt2).getTime() - dt1.getTime()) / 1000;
      diff /= (60 * 60 * 24 * 7 * 4);
      return Math.abs(Math.round(diff));
    }
  }
  public getYearsDiff(d1, d2) {
    // if (d2 != null && d1 != null) {
    //   let date1 = new Date(d1);
    //   let date2 = new Date(d2);
    //   let yearsDiff = date2.getFullYear() - date1.getFullYear();
    //   return yearsDiff;
    // }
    if (d2 != null && d1 != null) {
      d2 = new Date(d2); d1 = new Date(d1);
      var diff = (d2.getTime() - d1.getTime()) / 1000;
      diff /= (60 * 60 * 24);
      var yr = Math.abs(diff / 365.25);
      var month = (diff % 365.25) / 30.30;
      yr = parseInt(`${yr}`);
      month = parseInt(`${month}`);
      if (month == 12) {
        return parseFloat(`${yr + 1}.0`);
      } else {
        return parseFloat(`${yr}.${month}`);
      }

    }
  }
  public filterData(data, DocTypId, para) {
    return data.filter(object => {
      return object[para] == DocTypId;
    });
  }
  getAddressDetails(formFlag, RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=ADD&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
  }
  getDocumentDetails(formFlag, RefId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=DOC&FormFlag=${formFlag}&RefId=${RefId}&IsActive=Y`);
  }
  public getDesignation(DeptId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=DGM&IsActive=Y&DeptId=${DeptId}`);
  }
  public getCustomer(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CUSTM&CPCode=${cpcode}&IsActive=Y`);
  }
  public getCity(statecode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CM&StateCode=${statecode}&IsActive=Y`);
  } public getDocumentType(flag) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=DTM&FormFlag=${flag}&IsActive=Y`);
  }
  public getEmpoyees(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=EMP&CPCode=${cpcode}&RoleCode=&IsActive=Y`);
  }
  public getEmpoyeeDelBoy(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=EMP&CPCode=${cpcode}&RoleCode=DELB&IsActive=Y`);
  }
  public getGodowns(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=GDWN&CPCode=${cpcode}&IsActive=Y`);
  }
  public getProductSegmentDetails(ChannelId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=PSM&IsActive=Y&ChannelId=${ChannelId}`);
  }
  public getNewProducts(cpcode, plantId, Pscode, Prodtype, flag) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Settings/GetAdminPriceAllocation?CPCode=${cpcode}&PlantId=${plantId}&ProdSegId=${Pscode}&ProdType=${Prodtype}&FormFlag=${flag}&IsActive=Y`);
  }
  public getProducts(Pscode, ProdType) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=PM&ProdSegId=${Pscode}&IsActive=Y&ProdType=${ProdType}`);
  }
  public getRoutes(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPRoute?RouteId=&CPCode=${cpcode}&IsActive=Y`, AppComponent.httpOptions);
  }
  public getState() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=SM&IsActive=Y`);
  }
  public getArea(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Operational/GetCPArea?CPAreaId=&CPCode=${cpcode}&IsActive=Y`, AppComponent.httpOptions);
  }
  public getSubArea(cpcode, AreaId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPA&AreaCode=${AreaId}&CPCode=${cpcode}&IsActive=Y`, AppComponent.httpOptions);
  }
  public getTransport() {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=VTM&IsActive=Y`);
  }
  public getVehicles(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=VM&CPCode=${cpcode}&RoleCode=&IsActive=Y`);
  }
  public getVehicaleProductDetails(cpcode, VehicleId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetVehicleCapacity?VehicleId=${VehicleId}&CPCode=${cpcode}`);
  }
  public postBulkDoc(fd: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageDocumentDtls`, fd);
  }
  public postBulkAddress(fd: any) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrl}Operational/ManageAddressDtls`, fd);
  }
  public getDiscountDetails(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=DISCT&CPCode=${cpcode}&IsActive=Y`);
  }
  public getSFSDPOS(pcpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Operational/GetChannelPartner?CPAreaId=&ParentCPCode=${pcpcode}&CPCode=&AreaId=&IsActive`, AppComponent.httpOptions);
  }
  public getRouteMapping(cpcode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPRoute?RouteId=&CPCode=${cpcode}&IsActive=Y`, AppComponent.httpOptions);
  }
  public getAreaAllocated(cpcode, RouteId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPSubAreaForMapping?CPCode=${cpcode}&RouteId=${RouteId}&IsActive=Y`, AppComponent.httpOptions);
  }
  public postRouteMapping(data: string) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Master/IUDCPRouteMapping`, { Data: data }, AppComponent.httpOptions);
  }
  // public getProductSegment() {
  //   return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=PSM&IsActive=Y`);
  // }
  public getNavMenu(RoleCode, RoleId, UserCode) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrl}Settings/GetMenuAllocated?AllocationId=&AppId=&DeptId=&RoleCode=${RoleCode}&RoleId=${RoleId}&UserCode=${UserCode}&IsActive=Y&Status=&AFlag=DI`, AppComponent.httpOptions);
  }

}
