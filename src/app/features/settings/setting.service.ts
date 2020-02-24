import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpClient: HttpClient) { }

  public getPriceAllocationDetails(cpcode,ProdSegId,ProdId) {
    return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPPriceAllocation?PriceCode=&CPCode=${cpcode}&IsActive=Y&EffectiveFromDate=&EffectiveToDate=&ProdSegId=${ProdSegId}&ProdId=${ProdId}`, AppComponent.httpOptions);
  }

  public postPriceAllocation(data: string) {
    return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Master/ManageCPPriceAllocation`, {data:data}, AppComponent.httpOptions);
}

public getDiscountDetails() {
  return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetMasterRecords?MasterCode=DISCT&IsActive=Y`);
}
public postDiscountData(data: any) {
  return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Settings/ManageDiscountCategory`,data, AppComponent.httpOptions);
}
}
