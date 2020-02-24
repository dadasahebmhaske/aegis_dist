import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) { }

    // getProductDetails(cpcode, formFlag, ConsId) {
    //     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CPD&CPCode=${cpcode}&FormFlag=${formFlag}&ConsId=${ConsId}&IsActive=Y`);
    // }
    // public getCustomer(cpcode, SubAreaId, ConsNo, MobNo) {
    //     return this.httpClient.get<any>(`${AppComponent.BaseUrl}Master/GetRelyingData?MasterCode=CUSTM&CPCode=${cpcode}&SubAreaId=${SubAreaId}&ConsNo=${ConsNo}&MobileNo=${MobNo}&IsActive=Y`);
    // }

    public postRefillBooking(data: any) {
        return this.httpClient.post<any>(`${AppComponent.BaseUrlDist}Order/ProcessRefillBooking`, data, AppComponent.httpOptions);
    }

    public getCPPriceAllocation(cpcode, ProdSegId) {
        return this.httpClient.get<any>(`${AppComponent.BaseUrlDist}Master/GetCPProdPriceAllocation?PriceCode=&CPCode=${cpcode}&IsActive=Y&ProdSegId=${ProdSegId}&ProdId=`, AppComponent.httpOptions);
    }
}
